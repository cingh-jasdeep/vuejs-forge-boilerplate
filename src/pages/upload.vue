<script setup lang="ts">
import { ref } from "vue";

import { useDropZone } from "@vueuse/core";
import { useFileDialog } from "@vueuse/core";
const { files, open, reset } = useFileDialog({
  multiple: false,
});

const dropZoneRef = ref(null);

function onDrop(dropZoneRef, files: File[] | null) {
  // Trigger an event when file(s) is drop on zone
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>

<template>
  <div class="p-4">
    <div
      ref="dropZoneRef"
      @click="open"
      class="cursor-pointer my-4 aspect-video w-[300px] flex items-center justify-center rounded-md border-slate-500 border-2 bg-slate-100"
      :class="{ '!bg-slate-300': isOverDropZone }"
    >
      Click or drop to upload image
    </div>
  </div>
</template>

<style scoped></style>
