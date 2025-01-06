import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
}

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks: Ref<Task[]> = ref([]);

    const totalTasks = computed(() => tasks.value.length);
    const totalCompletedTasks = computed(() => {
      const completedTasks = tasks.value.filter((task) => task.isCompleted);
      return completedTasks.length;
    });

    function addTask(title: string, description?: string) {
      tasks.value.push({
        id: uuidv4(),
        title,
        description,
        isCompleted: false,
      });
    }

    function toggleCompleted(id: string) {
      const task = tasks.value.find((task) => task.id === id);
      if (!task) return;
      task.isCompleted = !task.isCompleted;
    }

    function deleteTask(id: string) {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    }

    return {
      tasks,
      totalTasks,
      totalCompletedTasks,
      addTask,
      toggleCompleted,
      deleteTask,
    };
  },
  {
    persist: true,
  },
);
