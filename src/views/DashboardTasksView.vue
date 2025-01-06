<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth';
import { useTasksStore } from '@/stores/tasks';
import { toTypedSchema } from '@vee-validate/zod';
import { PlusIcon, TrashIcon } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { useId } from 'vue';
import * as z from 'zod';

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const id = useId();

const { defineField, handleSubmit, isSubmitting, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      title: z
        .string({
          required_error: 'Title is required',
          invalid_type_error: 'Title must be a string',
        })
        .trim(),
      description: z
        .string({
          required_error: 'Description is required',
          invalid_type_error: 'Description must be a string',
        })
        .trim()
        .optional(),
    }),
  ),
});

const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');

const onSubmit = handleSubmit((values) => {
  tasksStore.addTask(values.title, values.description);
  resetForm();
});
</script>

<template>
  <section class="container relative">
    <p class="text-xl capitalize md:text-2xl">Hey, {{ authStore.username }}</p>

    <p v-if="tasksStore.totalTasks === 0" class="mt-4 max-w-screen-md md:mt-8">
      You are free today!
    </p>
    <ul v-else class="mt-4 max-w-screen-md space-y-4 md:mt-8">
      <li
        v-for="{ title, id, isCompleted } of tasksStore.tasks"
        :key="id"
        class="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 rounded-md bg-secondary p-4"
      >
        <Checkbox :checked="isCompleted" @update:checked="tasksStore.toggleCompleted(id)" />
        <p :class="['truncate', isCompleted ? 'line-through' : '']">{{ title }}</p>
        <div class="group flex items-center gap-x-4 [&_svg]:size-4">
          <button class="flex items-center justify-center" @click="tasksStore.deleteTask(id)">
            <TrashIcon />
          </button>
        </div>
      </li>
    </ul>

    <!-- add todo button -->
    <Dialog>
      <DialogTrigger as-child>
        <Button size="icon" class="fixed bottom-[20vh] right-4 size-10 lg:right-[17vw]">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription>Add a task and optionally, a description.</DialogDescription>
        </DialogHeader>
        <form class="grid gap-2 py-4" novalidate @submit.prevent="onSubmit">
          <div class="grid grid-rows-2 space-y-2">
            <Input
              placeholder="Enter title"
              type="text"
              :id="id + '-title'"
              v-model="title"
              v-bind="titleAttrs"
            />
            <p class="text-sm text-red-600 dark:text-red-400">{{ errors.title }}</p>
          </div>
          <div class="grid grid-rows-2 space-y-2">
            <Input
              placeholder="Enter description"
              type="text"
              :id="id + '-description'"
              v-model="description"
              v-bind="descriptionAttrs"
            />
            <p class="text-sm text-red-600 dark:text-red-400">{{ errors.description }}</p>
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button type="submit" :disabled="isSubmitting"> Add Task </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </section>
</template>
