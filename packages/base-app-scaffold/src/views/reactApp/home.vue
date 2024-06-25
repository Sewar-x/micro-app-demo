<template>
  <MicroAppContainer :options="options" />
</template>
<script setup lang="ts">
import { $t } from "$locale";
import MicroAppContainer from "@/components/MicroAppContainer/index.vue";
import { subAppConfigs } from "@/plugins/micro-app/appConfigs";
const options = subAppConfigs["react-app"];
console.log("🚀 ~react-app options:", options);
</script>
<style scoped></style>
