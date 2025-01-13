import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description?: string;
  isEditing: boolean;
  isCompleted: boolean;
}

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks: Ref<Task[]> = ref([]);

    const editDetails = computed(() => tasks.value.find((task) => task.isEditing));

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
        isEditing: false,
        isCompleted: false,
      });
    }

    function updateTask(id: string, title: string, description?: string) {
      const task = tasks.value.find((task) => task.id === id);
      if (!task) return;
      task.title = title;
      task.description = description;
      task.isEditing = false;
    }

    function toggleCompleted(id: string) {
      const task = tasks.value.find((task) => task.id === id);
      if (!task) return;
      task.isCompleted = !task.isCompleted;
    }

    function editTask(id: string) {
      const task = tasks.value.find((task) => task.id === id);
      if (!task) return;
      task.isEditing = true;
    }

    function resetEditState() {
      tasks.value = tasks.value.map((task) => ({ ...task, isEditing: false }));
    }

    function deleteTask(id: string) {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    }

    return {
      tasks,
      editDetails,
      totalTasks,
      totalCompletedTasks,
      addTask,
      updateTask,
      toggleCompleted,
      editTask,
      deleteTask,
      resetEditState,
    };
  },
  {
    persist: true,
  },
);
