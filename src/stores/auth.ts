import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const username = ref('');

    const isLoggedIn = computed(() => username.value !== '');

    function login(name: string) {
      username.value = name;
    }

    function logout() {
      username.value = '';
    }

    return { username, isLoggedIn, login, logout };
  },
  {
    persist: true, // persists all refs
  },
);
