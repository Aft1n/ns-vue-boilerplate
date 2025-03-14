import { Application } from "@nativescript/core";
import { onMounted, onUnmounted } from "vue";
import { useTasksStore } from "../store/tasks";

export function useAppLifecycleSync() {
  console.log("useAppLifecycleSync!!!!!!!!!!!!!!!!!!");
  const tasksStore = useTasksStore();

  const handleResume = () => {
    tasksStore.syncTasks();
  };

  const handleSuspend = () => {
    tasksStore.syncTasks();
  };

  onMounted(() => {
    // Initial sync when the app starts
    tasksStore.syncTasks();

    // Add lifecycle event listeners
    Application.on(Application.resumeEvent, handleResume);
    Application.on(Application.suspendEvent, handleSuspend);
  });

  onUnmounted(() => {
    // Remove lifecycle event listeners
    Application.off(Application.resumeEvent, handleResume);
    Application.off(Application.suspendEvent, handleSuspend);
  });
}
