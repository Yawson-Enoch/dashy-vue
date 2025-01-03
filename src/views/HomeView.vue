<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { useAuthStore } from '@/stores/auth';
import { useId } from 'vue';
import { useRouter } from 'vue-router';

const id = useId();

const { defineField, handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      username: z
        .string({
          required_error: 'Name is required',
          invalid_type_error: 'Name must be a string',
        })
        .trim()
        .min(2, { message: 'Name must be at least 2 characters long' }),
    }),
  ),
});
const [username, usernameAttrs] = defineField('username');

const authStore = useAuthStore();

const router = useRouter();

const onSubmit = handleSubmit((values) => {
  authStore.login(values.username);
  router.push('/dashboard');
});
</script>

<template>
  <section class="grid min-h-dvh md:grid-cols-2">
    <div
      class="relative before:absolute before:left-[-400px] before:top-[-300px] before:z-10 before:h-[800px] before:w-[800px] before:rounded-full before:bg-primary/5 before:blur-[80px] before:content-[''] max-md:hidden"
    >
      <div class="container flex size-full flex-col items-center justify-center text-center">
        <img src="/logo.png" alt="DashyVue Logo" class="size-44 lg:size-64" />
        <h1
          class="mt-8 w-fit bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl"
        >
          DashyVue
        </h1>
        <p class="mt-2 text-muted-foreground">A simple tool to keep tasks organized.</p>
      </div>
    </div>
    <div
      class="container flex flex-col items-center justify-center md:bg-zinc-900/5 md:dark:bg-zinc-900/40"
    >
      <h2 class="text-3xl font-semibold tracking-tight">Welcome to DashyVue</h2>

      <div v-if="authStore.isLoggedIn" class="mt-12 space-y-4">
        <p class="text-center text-muted-foreground">
          Logged in as <span class="font-semibold text-foreground">{{ authStore.username }}</span>
        </p>

        <div class="mx-auto grid w-full grid-cols-2 gap-x-4">
          <Button variant="secondary" @click="authStore.logout">Logout</Button>
          <Button as-child>
            <RouterLink to="/dashboard">Go to dashboard</RouterLink>
          </Button>
        </div>
      </div>

      <form
        v-else
        novalidate
        @submit.prevent="onSubmit"
        class="mx-auto mt-12 w-full max-w-72 space-y-2"
      >
        <div class="grid grid-rows-2 space-y-2">
          <Input
            placeholder="Enter your name"
            class="mx-auto"
            type="text"
            :id="id + '-username'"
            v-model="username"
            v-bind="usernameAttrs"
          />
          <p class="text-sm text-red-600 dark:text-red-400">{{ errors.username }}</p>
        </div>
        <Button type="submit" class="w-full" :disabled="isSubmitting">Login</Button>
      </form>
    </div>
  </section>
</template>
