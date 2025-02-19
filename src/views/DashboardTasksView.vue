<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { toTypedSchema } from '@vee-validate/zod';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth-store';
import { useTasksStore } from '@/stores/tasks-store';

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const id = useId();

const open = ref(false);

const isEditing = computed(() => !!tasksStore.editDetails);

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

function handleEdit(id: string) {
  tasksStore.resetEditState();
  tasksStore.editTask(id);
  open.value = true;
  resetForm({
    values: {
      title: tasksStore.editDetails?.title,
      description: tasksStore.editDetails?.description,
    },
  });
}

function handleAdd() {
  tasksStore.resetEditState();
  open.value = true;
  resetForm({
    values: {
      title: tasksStore.editDetails?.title,
      description: tasksStore.editDetails?.description,
    },
  });
}

const onSubmit = handleSubmit((values) => {
  if (isEditing.value && tasksStore.editDetails) {
    tasksStore.updateTask(
      tasksStore.editDetails.id,
      values.title,
      values.description,
    );
  } else {
    tasksStore.addTask(values.title, values.description);
    resetForm();
  }
  open.value = false;
});
</script>

<template>
  <section class="relative container">
    <p class="text-xl capitalize md:text-2xl">Hey, {{ authStore.username }}</p>

    <p
      v-if="tasksStore.totalTasks === 0"
      class="mt-4 max-w-(--breakpoint-md) md:mt-8"
    >
      You are free today!
    </p>
    <ul v-else class="mt-4 max-w-(--breakpoint-md) space-y-4 md:mt-8">
      <li
        v-for="{ title, id, isCompleted } of tasksStore.tasks"
        :key="id"
        class="bg-secondary grid grid-cols-[auto_1fr_auto] items-center gap-x-4 rounded-md p-4"
      >
        <Checkbox
          :checked="isCompleted"
          @update:checked="tasksStore.toggleCompleted(id)"
        />
        <p :class="['truncate', isCompleted ? 'line-through' : '']">
          {{ title }}
        </p>
        <div class="group flex items-center gap-x-4 [&_svg]:size-4">
          <button
            class="flex items-center justify-center"
            @click="tasksStore.deleteTask(id)"
          >
            <TrashIcon />
          </button>

          <button
            :class="[
              'flex items-center justify-center',
              isCompleted ? 'hidden' : '',
            ]"
            @click="handleEdit(id)"
          >
            <PencilIcon />
          </button>
        </div>
      </li>
    </ul>

    <!-- add todo button -->
    <Dialog v-model:open="open">
      <Button
        size="icon"
        class="fixed right-4 bottom-[20vh] size-10 lg:right-[17vw]"
        @click="handleAdd()"
      >
        <PlusIcon />
      </Button>
      <DialogContent
        class="sm:max-w-[425px]"
        :key="tasksStore.editDetails?.id"
        @pointer-down-outside.prevent
      >
        <DialogHeader>
          <DialogTitle>{{
            isEditing ? 'Edit task' : 'Add new task'
          }}</DialogTitle>
          <DialogDescription>{{
            isEditing
              ? 'Edit your task'
              : 'Add a task and optionally, a description.'
          }}</DialogDescription>
        </DialogHeader>
        <form class="grid gap-6 py-4" novalidate @submit.prevent="onSubmit">
          <div class="space-y-2">
            <Input
              placeholder="Enter title"
              type="text"
              :id="id + '-title'"
              v-model="title"
              v-bind="titleAttrs"
            />
            <p class="text-sm text-red-600 dark:text-red-400">
              {{ errors.title }}
            </p>
          </div>
          <div class="space-y-2">
            <Input
              placeholder="Enter description"
              type="text"
              :id="id + '-description'"
              v-model="description"
              v-bind="descriptionAttrs"
            />
            <p class="text-sm text-red-600 dark:text-red-400">
              {{ errors.description }}
            </p>
          </div>
          <DialogFooter>
            <Button type="submit" :disabled="isSubmitting">{{
              isEditing ? 'Edit Task' : 'Add Task'
            }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </section>
</template>
