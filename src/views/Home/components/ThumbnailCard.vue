<template>
	<div
		class="w-full max-w-xs h-64 p-4"
		v-for="video in recommendedVideos"
		:key="video.id"
	>
		<a :href="'https://www.youtube.com/watch?v=' + video.id" title="">
			<div class="w-full h-40 rounded-md">
				<img
					:src="video.videoThumbnail"
					:alt="video.videoTitle"
					class="w-full h-full object-cover rounded-md"
				/>
			</div>
			<div class="flex flex-col">
				<div class="flex flex-row p-2 gap-2">
					<div class="w-10 h-full pt-1">
						<img
							class="aspect-square object-cover rounded-full"
							:src="video.channelProfile"
							alt=""
						/>
					</div>
					<div class="w-full h-full">
						<span
							class="text-sm font-montserrat tracking-tight font-semibold text-wrap line-clamp-2 truncate"
							>{{ video.videoTitle }}</span
						>
						<span
							class="text-xs font-poppins text-zinc-500 line-clamp-1 text-nowrap truncate pt-1"
							>{{ video.channelName }}</span
						>
						<!-- view, like and comment -->
						<div
							class="flex w-fit items-center justify-between h-5 text-zinc-500 gap-4"
						>
							<div class="inline-flex items-center gap-0.5">
								<RiEyeFill class="w-3 h-3" /><span
									class="font-semibold text-[10px] font-poppins"
									>{{
										formatNumber(
											video.videoStatistics?.viewCount,
										)
									}}</span
								>
							</div>
							<div class="inline-flex items-center gap-0.5">
								<RiThumbUpFill class="w-3 h-3" /><span
									class="font-semibold text-[10px] font-poppins"
									>{{
										formatNumber(
											video.videoStatistics?.likeCount,
										)
									}}</span
								>
							</div>
							<div class="inline-flex items-center gap-0.5">
								<RiMessage3Fill class="w-3 h-3" /><span
									class="font-semibold text-[10px] font-poppins"
									>{{
										formatNumber(
											video.videoStatistics?.commentCount,
										)
									}}</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</a>
	</div>
</template>

<script setup>
import { defineProps } from "vue";
import { RiEyeFill, RiThumbUpFill, RiMessage3Fill } from "@remixicon/vue";

// formatting number
function formatNumber(value) {
	if (value < 1000) {
		return value.toLocaleString();
	} else if (value < 1000000) {
		return `${(value / 1000).toFixed(1)}k`;
	} else if (value < 1000000000) {
		return `${(value / 1000000).toFixed(1)}m`;
	} else {
		return `${(value / 1000000000).toFixed(1)}b`;
	}
}

const props = defineProps({
	recommendedVideos: {},
});
</script>
