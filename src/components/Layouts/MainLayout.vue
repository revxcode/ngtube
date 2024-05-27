<script setup>
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ToggleMode from "@/components/Elements/Darkmode/ToggleMode.vue";
import {
	RiSearchLine,
	RiHome6Line,
	RiDownloadLine,
	RiLineChartLine,
	RiHistoryLine,
} from "@remixicon/vue";

import SidebarLink from "@/components/Elements/Sidebar/SidebarLink.vue";
import Profile from "@/components/Elements/Header/Profile/Profile.vue";

const pathname = ref(window.location.pathname);
</script>

<template>
	<!-- parent container -->
	<div
		class="flex w-full h-screen flex-row bg-custom-snow dark:bg-zinc-950 overflow-hidden"
	>
		<!-- sidebar  -->
		<aside
			class="flex flex-col w-1/5 h-full bg-custom-snow dark:bg-zinc-950"
		>
			<!-- sidebar header  -->
			<div class="flex justify-center items-center h-20">
				<!-- icon/logo  -->

				<h1
					class="tracking-wider text-custom-persian-green font-bold text-3xl font-russo-one"
				>
					NG<span
						class="text-zinc-800 dark:text-zinc-200 font-orbitron text-2xl"
						>tube.</span
					>
				</h1>
			</div>
			<!-- sidebar content -->
			<div class="flex justify-start w-full px-4">
				<!-- sidebar list -->
				<ul class="flex w-full flex-col font-monserrat my-4 gap-2">
					<li>
						<SidebarLink href="/" title="Home">
							<RiHome6Line class="w-6 h-6" />
						</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/tranding" title="Tranding">
							<RiLineChartLine class="w-6 h-6" />
						</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/download" title="Download">
							<RiDownloadLine class="w-6 h-6" />
						</SidebarLink>
					</li>
					<li>
						<SidebarLink href="/history" title="History">
							<RiHistoryLine class="w-6 h-6" />
						</SidebarLink>
					</li>
					<Separator class="my-4" />
				</ul>
			</div>
		</aside>
		<!-- content container  -->
		<div class="w-full max-w-full h-full">
			<!-- header element  -->
			<header class="w-full h-20 bg-custom-snow dark:bg-zinc-950">
				<!-- navigation bar  -->
				<nav class="flex h-full items-center justify-end px-8">
					<!-- search bar  -->
					<div class="relative w-full max-w-sm items-center mx-4">
						<Input
							id="search"
							type="text"
							placeholder="Search..."
							class="h-8 pl-10 rounded-3xl outline-custom-tifany-blue dark:outline-custom-persian-green"
						/>
						<span
							class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
						>
							<RiSearchLine
								class="size-6 text-muted-foreground"
							/>
						</span>
					</div>
					<!-- auth & profile  -->
					<div class="flex h-full items-center gap-2">
						<!-- darkmode toggle  -->
						<ToggleMode />
						<!-- profile -->
						<Profile />
					</div>
				</nav>
			</header>
			<main class="w-full h-full mx-10">
				<!-- navigate list  -->
				<div class="w-full h-14 pt-2">
					<ul
						class="flex h-full items-center flex-row gap-2 text-sm font-poppins z-10"
					>
						<li>
							<a
								href=""
								title=""
								class="bg-zinc-100 dark:bg-zinc-900 py-1 px-6 rounded-3xl"
								>All</a
							>
						</li>
						<li>
							<a
								href=""
								title=""
								class="bg-zinc-100 dark:bg-zinc-900 py-1 px-6 rounded-3xl"
								>Popular</a
							>
						</li>
						<li>
							<a
								href=""
								title=""
								class="bg-zinc-100 dark:bg-zinc-900 py-1 px-6 rounded-3xl"
								>Movies</a
							>
						</li>
						<li>
							<a
								href=""
								title=""
								class="bg-zinc-100 dark:bg-zinc-900 py-1 px-6 rounded-3xl"
								>Series</a
							>
						</li>
					</ul>
				</div>
				<!-- container video  -->
				<div class="w-full h-full overflow-y-auto">
					<slot />
				</div>
			</main>
		</div>
	</div>
</template>
