<template>
    <div>
        <div class="title">
            <h2>Chat app</h2>
        </div>
        <div class="main-contents">
            <div class="message_base">
                <div v-for="message in messages" :key="message.id">
                    <div v-bind:class="[message.owner === username ? 'message' : 'message_opponent']">
                        {{ message.content }}
                    </div>
                    <div v-bind:class="[message.owner === username ? 'username' : 'username_opponent']">
                        {{ message.owner }}
                    </div>
                </div>
            </div>
            <el-input placeholder="Enter a message (send with Enter)" v-model="content" @keydown.enter="sendMessage">
            </el-input>
        </div>
    </div>
</template>
  
<script>
import API from '@aws-amplify/api';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { createMessage } from '../graphql/mutations';
import { listMessages } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

export default {
    data() {
        return {
            messages: [],
            username: '',
            content: '',
            subscription: {},
            error: ''
        };
    },
    async created() {
        this.username = (await useAuthenticator()).user.username;
        this.fetch();
        this.subscribe();
    },
    methods: {
        // TODO(1) GraphQL エンドポイントに Mutation を発行し、メッセージを登録する
        async sendMessage() {
            if (event.keyCode !== 13 || !this.content) return
            const message = {
                id: new Date().getTime() + this.username,
                content: this.content,
            }
            API.graphql({
                query: createMessage,
                variables: { input: message }
            }).catch(error => this.error = JSON.stringify(error))
            this.content = ""
        },
        // TODO(2) GraphQL エンドポイントに Query を発行し、メッセージ一覧を取得する
        async fetch() {
            API.graphql({
                query: listMessages,
                variables: { limit: 100 }
            })
                .then(messages => this.messages = messages.data.listMessages.items.sort((a, b) => a.id > b.id ? 1 : -1))
                .catch(error => this.error = JSON.stringify(error))
        },
        // TODO(3-1) GraphQL エンドポイントに Subscription を発行し、Mutation を監視する
        async subscribe() {
            this.subscription = API.graphql({ query: onCreateMessage })
                .subscribe({
                    next: (eventData) => {
                        const message = eventData.value.data.onCreateMessage;
                        this.messages = [...this.messages, message];
                    }
                })
        },
        scrollBottom() {
            const container = this.$el.querySelector('.message_base');
            container.scrollTop = container.scrollHeight;
        }
    },
    // TODO(3-2) チャット画面から離れる際に、UnSubscribe する
    beforeUnmount() {
        this.subscription.unsubscribe();
    },
    updated() {
        this.scrollBottom();
    }
};
</script>
  
<style src="../assets/chat.css">

</style>
  