<script setup lang="ts">
import { Drawer, DrawerContent } from "@progress/kendo-vue-layout";
import { Button, DropDownButton } from "@progress/kendo-vue-buttons";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-vue-notification";
import { useAlerts } from "@/stores/Alerts";

import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
const router = useRouter();
const expanded = useLocalStorage("expanded", false);
const selectedId = ref(0);
const expandedIcon = computed(() =>
  expanded.value ? "k-i-arrow-chevron-left" : "k-i-arrow-chevron-right"
);
const items = computed(() => [
  {
    text: "Boards",
    icon: "k-i-set-column-position",
    selected: true,
    data: {
      path: "/boards",
    },
  },
  {
    text: "Templates",
    icon: "k-i-border-left",
    data: {
      path: "/templates",
    },
  },
  {
    text: "Settings",
    icon: "k-i-gear",
    data: {
      path: "/settings",
    },
  },
  {
    text: "Upload",
    icon: "k-i-upload",
    data: {
      path: "/upload",
    },
  },
  {
    text: "Collapse",
    icon: expandedIcon.value,
    data: {
      action: () => (expanded.value = !expanded.value),
    },
  },
]);
const teams = computed(() => [
  {
    text: "Team 1",
  },
  {
    text: "Team 2",
  },
]);
const alertsStore = useAlerts();
const { alerts } = storeToRefs(alertsStore);

function onSelect({ itemIndex }: { itemIndex: number }) {
  const item = items.value[itemIndex];
  if (item.data.path) {
    router.push(item.data.path);
    selectedId.value = itemIndex;
  }
  if (typeof item.data.action === "function") item.data.action();
}
</script>
<template>
  <div class="p-2 flex justify-between shadow">
    <div
      :style="{
        width: !expanded ? '30px' : 'auto',
      }"
      class="w-[150px] k-drawer overflow-hidden"
    >
      <img
        src="https://vuejsforge.com/images/logo.svg"
        width="150"
        class="max-w-none"
        alt="Vue.js Forge"
      />
    </div>
    <div class="flex gap-2">
      <DropDownButton
        class="text-[#FF5323]"
        :icon="'tell-a-friend'"
        :text="'My Team'"
        :items="teams"
        :fill-mode="'flat'"
      />
      <Button :theme-color="'inverse'">Logout</Button>
    </div>
  </div>
  <Drawer
    class="h-[90vh]"
    :expanded="expanded"
    position="start"
    mode="push"
    :mini="true"
    :items="
      items.map((item, index) => ({
        ...item,
        selected: index === selectedId,
      }))
    "
    @select="onSelect"
  >
    <DrawerContent>
      <div class="px-5">
        <router-view />
      </div>
    </DrawerContent>
  </Drawer>
  <NotificationGroup
    :style="{
      right: 0,
      bottom: 0,
      alignItems: 'flex-start',
      flexWrap: 'wrap-reverse',
    }"
  >
    <Notification
      v-for="(alert, index) in alerts"
      :key="index"
      :type="{ style: `${alert.type}`, icon: true }"
      :closable="true"
      @close="alertsStore.cancel(index)"
      :style="{
        overflow: 'visible',
      }"
    >
      <span>{{ alert.text }}</span>
    </Notification>
  </NotificationGroup>
</template>
<style>
html,
body,
#app,
.drawer-wrapper {
  height: 100%;
}
</style>
