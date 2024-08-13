<template>
	<div class="flex flex-wrap pb-32">
		<ThumbnailCard :recommendedVideos="recommendedVideos" />
		<div class="w-full h-20 pb-32" ref="targetRef"></div>
	</div>
</template>

<script setup>
// components
import ThumbnailCard from "./ThumbnailCard.vue";
import { useIntersectionObserver } from "@vueuse/core";
import { ref, onMounted, watchEffect } from "vue";
import api from "@/api/api.js";
import { useQuerySearch } from "@/stores/querySearch";

// variables
const querySearch = useQuerySearch();
const keyword = ref("");
const recommendedVideos = ref([]);
const nextPageToken = ref(null);
const targetRef = ref(null);

watchEffect(() => {
	// methods
	if (querySearch.query !== "") {
		keyword.value = querySearch.query;
		fetchSearchQuery(keyword.value);
		console.log("search query");
	}

	const { stop } = useIntersectionObserver(
		// Target element
		targetRef,
		([{ isIntersecting }], observerElement) => {
			if (isIntersecting) {
				setTimeout(() => {
					if (querySearch.query !== "") {
						keyword.value = querySearch.query;
						fetchSearchQuery(keyword.value, nextPageToken?.value);
						console.log("search query scroll");
					} else {
						if (nextPageToken.value) {
							fetchToBackend(nextPageToken.value);
							console.log("most popular scroll");
						}
					}
				}, 1000);
			}
		},
		{
			// Options
			threshold: 0.5,
			rootMargin: "0px 0px 500px 0px",
			root: null,
		},
	);
});

async function fetchSearchQuery(keyword, pageToken) {
	const response = await api.get("/api/youtube/search", {
		params: {
			keyword: keyword,
			pageToken: pageToken,
		},
	});
	const data = response.data;

	recommendedVideos.value = data.items;
	nextPageToken.value = data.nextPageToken;
}

const fetchToBackend = async (pageToken) => {
	const response = await api.get("/api/youtube/mostpopular", {
		params: {
			pageToken: pageToken,
		},
	});
	const data = response.data;

	recommendedVideos.value = data.items;
	nextPageToken.value = data.nextPageToken;
};

onMounted(() => {
	fetchToBackend();
});
</script>
