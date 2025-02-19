<script setup lang="ts">
import { ListChecksIcon, ListTodoIcon } from 'lucide-vue-next';

import { useTasksStore } from '@/stores/tasks-store';

const tasksStore = useTasksStore();
</script>

<template>
  <section
    class="grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4"
  >
    <div
      class="bg-background before:bg-primary/10 relative aspect-video w-full overflow-hidden rounded-md border before:absolute before:-top-1/2 before:-left-1/2 before:z-10 before:size-full before:rounded-full before:blur-[80px] before:content-['']"
    >
      <div
        class="flex size-full flex-col items-center justify-center text-center"
      >
        <ListTodoIcon class="size-10" />
        <p class="mt-1 text-xl md:text-2xl">All Todos</p>
        <p class="mt-4 text-4xl font-medium md:text-6xl md:font-semibold">
          {{ tasksStore.totalTasks }}
        </p>
      </div>
    </div>
    <div
      class="bg-background before:bg-primary/10 relative aspect-video w-full overflow-hidden rounded-md border before:absolute before:-top-1/2 before:-left-1/2 before:z-10 before:size-full before:rounded-full before:blur-[80px] before:content-['']"
    >
      <div
        class="flex size-full flex-col items-center justify-center text-center"
      >
        <ListChecksIcon class="size-10" />
        <p class="mt-1 text-xl md:text-2xl">Completed Todos</p>
        <p class="mt-4 text-4xl font-medium md:text-6xl md:font-semibold">
          {{ tasksStore.totalCompletedTasks }}
        </p>
      </div>
    </div>
  </section>
</template>
