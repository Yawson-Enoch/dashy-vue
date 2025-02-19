<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { Button } from '@/components/ui/button';
</script>

<template>
  <div
    class="container grid min-h-dvh place-content-center place-items-center gap-y-4 py-12 text-center md:gap-y-8 md:py-24"
  >
    <div class="flex flex-col items-center justify-center space-y-2">
      <p class="text-3xl font-semibold">Page Not Found</p>
      <p>This page could not be found. Check the URL or go to the homepage.</p>
    </div>
    <Button as-child>
      <RouterLink to="/">Go Home</RouterLink>
    </Button>
  </div>
</template>
