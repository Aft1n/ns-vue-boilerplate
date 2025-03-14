<script lang="ts" setup>
import { useRouter } from "router-vue-native";
import { useAppLifecycleSync } from "./composables/useAppLifecycleSync";

useAppLifecycleSync();
import index from "./pages/index.vue";
</script>

<template>
  <Frame>
    <index />
  </Frame>
</template>
