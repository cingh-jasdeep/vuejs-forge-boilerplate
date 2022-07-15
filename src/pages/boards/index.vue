<script setup lang="ts">
import type { Board } from "@/types/index";
import { ref, type Ref } from "vue";
import { useAlerts } from "@/stores/Alerts";
const alertsStore = useAlerts();

const mockBoards: Ref<Board[]> = ref([
  {
    id: "1",
    title: "My First Board",
    order: "[]",
    image: { downloadUrl: "https://picsum.photos/300/150?random=1" },
  },
  {
    id: "2",
    title: "My Second Board",
    order: "[]",
    image: { downloadUrl: "https://picsum.photos/300/150?random=2" },
  },
  {
    id: "3",
    title: "My Third Board",
    order: "[]",
  },
]);

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function createBoard() {
  alertsStore.success("Board created!");
}
</script>

<template>
  <div style="padding: 16px">
    <div style="margin-top: 16px; margin-bottom: 16px">Boards</div>
    <div style="padding: 16px; display: flex; flex-direction: row; gap: 16px">
      <div class="cursor-pointer" v-for="board in mockBoards" :key="board.id">
        <img
          v-if="board.image"
          width="300"
          :src="board.image?.downloadUrl"
          class="aspect-video"
          alt=""
        />
        <div
          v-else
          class="aspect-video w-[300px]"
          :style="{ backgroundColor: getRandomColor() }"
        />
        <div>{{ board.title }}</div>
      </div>
      <div class="cursor-pointer self-center" @click="createBoard()">
        New Board +
      </div>
    </div>
  </div>
</template>

<style scoped></style>
