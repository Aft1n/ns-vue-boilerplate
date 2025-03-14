import { defineStore } from "pinia";

const API_URL = "http://your-api-endpoint.com/api";

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const tasks = ref<Task[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const findTaskIndex = computed(
      () => (id: string) =>
        tasks.value.findIndex((task: Task) => task.id === id)
    );

    const addTask = (taskData: Partial<Task>) => {
      const task: Task = {
        id: Date.now().toString(),
        title: taskData.title || "",
        description: taskData.description || "",
        completed: taskData.completed || false,
        updatedAt: new Date().toISOString(),
        isSynced: false,
      };
      tasks.value.push(task);
    };

    const editTask = (taskData: Partial<Task>) => {
      const index = findTaskIndex.value(taskData.id!);
      if (index === -1) return;

      tasks.value[index] = {
        ...tasks.value[index],
        ...taskData,
        updatedAt: new Date().toISOString(),
        isSynced: false,
      };
    };

    const deleteTask = (taskId: string) => {
      const index = findTaskIndex.value(taskId);
      if (index !== -1) {
        tasks.value.splice(index, 1);
      }
    };

    const syncTasks = async () => {
      isLoading.value = true;
      error.value = null;

      try {
        const unsyncedTasks = tasks.value.filter(
          (task: Task) => !task.isSynced
        );
        if (unsyncedTasks.length === 0) return;

        const response = await betterFetch(`${API_URL}/api/tasks/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(unsyncedTasks),
        });

        if (!response.data) throw new Error("Sync failed");

        // Mark synced tasks
        tasks.value = tasks.value.map((task: Task) =>
          unsyncedTasks.some((ut: Task) => ut.id === task.id)
            ? { ...task, isSynced: true }
            : task
        );
      } catch (err) {
        error.value = "Failed to sync tasks";
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    const getTaskById = computed(
      () => (id: string) => tasks.value.find((task: Task) => task.id === id)
    );

    return {
      tasks,
      isLoading,
      error,
      addTask,
      editTask,
      deleteTask,
      syncTasks,
      getTaskById,
    };
  },
  {
    persist: true, // Simple persistence, no custom serializer needed
  }
);
