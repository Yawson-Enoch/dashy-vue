import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import { useTheme } from './composables/theme';
import router from './router';

import '@fontsource-variable/hanken-grotesk';
import './assets/index.css';

const app = createApp(App);

app.use(useTheme);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(router);

app.mount('#app');
