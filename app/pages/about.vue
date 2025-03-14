<script lang="ts" setup>
const store = useTasksStore();
const { addTask: storeAddTask, deleteTask, editTask, tasks } = store;
const newTask = ref({
  title: "",
  description: "",
  completed: false,
});

const editingTask = ref<Task | null>(null);

const addTask = async () => {
  await storeAddTask(newTask.value);
  newTask.value = { title: "", description: "", completed: false };
};

const toggleComplete = (task: Task) => {
  task.completed = !task.completed;
};
const startEdit = (task: Task) => {
  editingTask.value = { ...task };
};
const updateTask = async () => {
  if (editingTask.value) {
    store.editTask(editingTask.value);
    editingTask.value = null;
  }
};
</script>

<template>
  <Page actionBarHidden="true">
    <ScrollView>
      <StackLayout class="p-4">
        <Button @tap="$navigateBack" class="bg-black text-white"
          >bhdbfhsbfhsdbjfsh</Button
        >
        <Button
          @tap="$navigateBack"
          class="bg-transparent text-black text-lg material-icons"
          text="&#xe5c4;"
        />
        <Label text="Task Management" class="text-2xl font-bold mb-4" />

        <!-- Add Task Form -->
        <StackLayout class="mb-4 p-3 border rounded">
          <Label text="Add New Task" class="font-bold mb-2" />
          <TextField
            v-model="newTask.title"
            hint="Task title"
            class="mb-2 p-2 border rounded"
          />
          <TextField
            v-model="newTask.description"
            hint="Description"
            class="mb-2 p-2 border rounded"
          />
          <Button
            text="Add Task"
            @tap="addTask"
            class="bg-blue-500 text-white p-2 rounded"
          />
        </StackLayout>

        <!-- Tasks List -->
        <StackLayout class="mb-4">
          <GridLayout columns="*, auto" class="mb-2">
            <Label text="Tasks List" class="font-bold" col="0" />
          </GridLayout>

          <StackLayout
            v-for="task in tasks"
            :key="task.id"
            class="mb-2 p-3 border rounded"
          >
            <template v-if="editingTask && editingTask.id === task.id">
              <!-- Edit Form -->
              <TextField
                v-model="editingTask.title"
                class="mb-2 p-2 border rounded"
              />
              <TextField
                v-model="editingTask.description"
                class="mb-2 p-2 border rounded"
              />
              <Button
                text="Save"
                @tap="updateTask"
                class="bg-green-500 text-white p-2 rounded mb-1"
              />
              <Button
                text="Cancel"
                @tap="editingTask = null"
                class="bg-gray-500 text-white p-2 rounded"
              />
            </template>
            <template v-else>
              <!-- Task Display -->
              <GridLayout
                rows="auto, auto"
                columns="*, auto, auto"
                class="mb-1"
              >
                <StackLayout col="0" rowSpan="2">
                  <Label :text="task.title" class="font-bold" />
                  <Label :text="task.description" class="text-gray-600" />
                  <Label class="fa" text="l"></Label>
                  <Label
                    :text="task.isSynced ? 'Synced' : 'Not synced'"
                    class="text-xs text-gray-400"
                  />
                </StackLayout>
                <Button
                  :text="task.completed ? '✓' : ''"
                  @tap="toggleComplete(task)"
                  :class="task.completed ? 'bg-green-500' : 'bg-gray-300'"
                  class="text-white p-2 rounded mr-1"
                  col="1"
                  row="0"
                />
                <Button
                  text="Edit"
                  @tap="startEdit(task)"
                  class="bg-yellow-500 text-white p-2 rounded mr-1"
                  col="1"
                  row="1"
                />
                <Button
                  text="Delete"
                  @tap="store.deleteTask(task.id)"
                  class="bg-red-500 text-white p-2 rounded"
                  col="2"
                  rowSpan="2"
                />
              </GridLayout>
            </template>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
