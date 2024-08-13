<template>
	<header class="w-full h-20 bg-custom-snow dark:bg-zinc-950">
		<!-- navigation bar  -->
		<nav class="flex h-full items-center justify-end px-8">
			<!-- search bar  -->
			<SearchBar />
			<!-- auth & profile  -->
			<div class="flex h-full items-center gap-2">
				<!-- darkmode toggle  -->
				<ToggleMode />
				<!-- profile -->
				<Profile />
			</div>
		</nav>
	</header>
</template>

<script setup>
import ToggleMode from "@/components/Elements/Darkmode/ToggleMode.vue";
import Profile from "./Profile/Profile.vue";
import SearchBar from "./Profile/SearchBar.vue";
</script>
