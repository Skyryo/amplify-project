import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../views/ChatView.vue';
import AI from '../views/AIView.vue';
import Analytics from '../views/AnalyticsView.vue';
import WebPush from '../views/WebPushView.vue';

const routes = [
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/ai',
      name: 'ai',
      component: AI
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics
    },
    {
      path: '/webpush',
      name: 'webpush',
      component: WebPush
    }
  ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
