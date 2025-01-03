/* supports weights 100-900 */
import '@fontsource-variable/hanken-grotesk';
import './assets/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';
import { useColorMode } from '@vueuse/core';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(useColorMode);

app.mount('#app');
