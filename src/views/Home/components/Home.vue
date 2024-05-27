<template>
	<div class="flex flex-wrap pb-32">
		<ThumbnailCard :recommendedVideos="recommendedVideos" />
		<div class="w-full h-20" ref="targetRef"></div>
	</div>
</template>

<script setup>
// components
import ThumbnailCard from "./ThumbnailCard.vue";
import { useIntersectionObserver } from "@vueuse/core";
import { ref, onMounted } from "vue";
import api from "@/api/api.js";

// variables
const recommendedVideos = ref([]);
const nextPageToken = ref(null);
const targetRef = ref(null);

const fetchToBackend = async (pageToken) => {
	const response = await api.get("/api/youtube/mostpopular", {
		params: {
			pageToken: pageToken,
		},
	});
	const data = response.data;
	// console.log(data);

	// console.log(data.nextPageToken);
	nextPageToken.value = data.nextPageToken;
	recommendedVideos.value = data.items;
};

const { stop } = useIntersectionObserver(
	// Target element
	targetRef,
	([{ isIntersecting }], observerElement) => {
		if (isIntersecting) {
			if (nextPageToken.value) {
				fetchToBackend(nextPageToken.value);
			}
		}
	},
	{
		// Options
		threshold: 0.5,
		rootMargin: "0px 0px 500px 0px",
		root: null,
	},
);

onMounted(() => {
	fetchToBackend();
});
</script>
