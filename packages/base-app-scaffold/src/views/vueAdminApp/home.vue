<template>
  <MicroAppContainer :options="options" />
</template>
<script setup lang="ts">
import { $t } from "$locale";
import MicroAppContainer from "@/components/MicroAppContainer/index.vue";
import { subAppConfigs } from "@/plugins/micro-app/appConfigs";
const options = subAppConfigs["vue-admin-app"];
console.log("🚀 ~vue-admin-app options:", options);
</script>
<style scoped></style>
