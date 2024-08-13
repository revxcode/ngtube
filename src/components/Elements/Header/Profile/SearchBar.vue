<template>
	<div class="relative w-full max-w-sm items-center mx-4">
		<Input
			id="search"
			type="text"
			placeholder="Search..."
			class="h-8 pl-10 rounded-3xl outline-custom-tifany-blue dark:outline-custom-persian-green"
			@keydown="search"
			autocomplete="off"
		/>
		<span
			class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
		>
			<RiSearchLine class="size-6 text-muted-foreground" />
		</span>
	</div>
</template>
<script setup>
import { RiSearchLine } from "@remixicon/vue";
import { Input } from "@/components/ui/input";
import { useQuerySearch } from "@/stores/querySearch";

const querySearch = useQuerySearch();

const search = (event) => {
	if (event.key === "Enter") {
		querySearch.setQuery(event.target.value);
	}
};
</script>
