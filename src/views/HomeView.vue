<script setup lang="ts">
import { useId } from 'vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';

import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { useAuthStore } from '@/stores/auth-store';

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
const route = useRoute();

const onSubmit = handleSubmit((values) => {
  authStore.login(values.username);

  const goTo = route.query.redirect?.toString() || '/dashboard';
  router.push(goTo);
});
</script>

<template>
  <section class="grid min-h-dvh md:grid-cols-2">
    <div
      class="before:bg-primary/5 relative before:absolute before:top-[-300px] before:left-[-400px] before:z-10 before:h-[800px] before:w-[800px] before:rounded-full before:blur-[80px] before:content-[''] max-md:hidden"
    >
      <div
        class="container flex size-full flex-col items-center justify-center text-center"
      >
        <RouterLink to="/">
          <img src="/logo.png" alt="DashyVue Logo" class="size-44 lg:size-64" />
        </RouterLink>
        <h1
          class="from-foreground to-muted-foreground mt-8 w-fit bg-linear-to-r bg-clip-text text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl"
        >
          DashyVue
        </h1>
        <p class="text-muted-foreground mt-2">
          A simple tool to keep tasks organized.
        </p>
      </div>
    </div>
    <div
      class="container flex flex-col items-center justify-center md:bg-zinc-900/5 md:dark:bg-zinc-900/60"
    >
      <h2 class="text-3xl font-semibold tracking-tight">Welcome to DashyVue</h2>

      <div v-if="authStore.isLoggedIn" class="mt-12 space-y-4">
        <p class="text-muted-foreground text-center">
          Logged in as
          <span class="text-foreground font-semibold">{{
            authStore.username
          }}</span>
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
        class="mx-auto mt-12 w-full max-w-72 space-y-8"
      >
        <div class="space-y-2">
          <Input
            placeholder="Enter your name"
            class="mx-auto"
            type="text"
            :id="id + '-username'"
            v-model="username"
            v-bind="usernameAttrs"
          />
          <p class="text-sm text-red-600 dark:text-red-400">
            {{ errors.username }}
          </p>
        </div>
        <Button type="submit" class="w-full" :disabled="isSubmitting"
          >Login</Button
        >
      </form>
    </div>
  </section>
</template>
