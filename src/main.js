import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import AmplifyVue from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
Amplify.configure(awsconfig);

const app = createApp(App)
app.config.productionTip = false;
app.use(ElementPlus);
app.use(router);
app.use(AmplifyVue);
app.mount('#app')
