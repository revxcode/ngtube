<template>
  <button class="mx-4" @click="toggleColorMode">
    <Icon
      icon="radix-icons:moon"
      v-show="isDark"
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
    />
    <Icon
      icon="radix-icons:sun"
      v-show="!isDark"
      class="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all"
    />
    <span class="sr-only">Toggle theme</span>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useColorMode } from "@vueuse/core";
import { Icon } from "@iconify/vue";

const mode = useColorMode();

const toggleColorMode = () => {
  mode.value = mode.value === "light" ? "dark" : "light";
};

const isDark = computed(() => mode.value === "dark");
</script>
