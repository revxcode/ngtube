<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
	title: String,
	href: String,
});

const pathname = ref(window.location.pathname);
</script>

<template>
	<RouterLink
		:to="href"
		:class="
			'flex h-full items-center gap-6 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 py-2 pl-4 rounded-md duration-100 cursor-pointer ' +
			(href === pathname ? 'bg-zinc-200 dark:bg-zinc-800' : '')
		"
	>
		<slot />
		<span
			:class="'text-sm ' + (href === pathname ? 'font-semibold' : '')"
			>{{ title ?? "..." }}</span
		>
	</RouterLink>
</template>
