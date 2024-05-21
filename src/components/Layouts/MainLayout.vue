<script setup>
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToggleMode from "@/components/Elements/Darkmode/ToggleMode.vue";
import {
	RiSearchLine,
	RiHome6Line,
	RiDownloadLine,
	RiLineChartLine,
	RiHistoryLine,
} from "@remixicon/vue";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SidebarLink from "@/components/Elements/Sidebar/SidebarLink.vue";

const imageUrl = ref("https://vuejs.org/logo.svg");

const pathname = ref(window.location.pathname);
</script>

<template>
	<!-- parent container -->
	<div class="flex w-full h-screen flex-row bg-zinc-100 dark:bg-zinc-950">
		<!-- sidebar  -->
		<aside
			class="flex flex-col w-1/5 h-full bg-custom-snow dark:bg-custom-night"
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
				<ul class="flex w-full flex-col font-monserrat my-2 gap-2">
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
			<header class="w-full h-20 bg-custom-snow dark:bg-custom-night">
				<!-- navigation bar  -->
				<nav class="flex h-full items-center justify-between px-8">
					<!-- navigate list  -->
					<ul class="flex flex-row gap-10 text-sm">
						<li><a href="" title="">All</a></li>
						<li><a href="" title="">Popular</a></li>
						<li><a href="" title="">Movies</a></li>
						<li><a href="" title="">Series</a></li>
					</ul>
					<!-- auth & profile  -->
					<div class="flex h-full items-center gap-2">
						<!-- search bar  -->
						<div class="relative w-full max-w-sm items-center">
							<Input
								id="search"
								type="text"
								placeholder="Search..."
								class="pl-10 rounded-full outline-custom-tifany-blue dark:outline-custom-persian-green"
							/>
							<span
								class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
							>
								<RiSearchLine
									class="size-6 text-muted-foreground"
								/>
							</span>
						</div>
						<!-- darkmode toggle  -->
						<ToggleMode />
						<!-- profile -->
						<div class="w-12 h-12 rounded-full">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<!-- avatar -->
									<Avatar>
										<AvatarImage
											:src="imageUrl"
											alt="@radix-vue"
										/>
										<AvatarFallback> CN </AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent class="max-w-40 mx-2">
									<DropdownMenuLabel
										class="text-nowrap truncate"
									>
										My Account
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										Profile
									</DropdownMenuItem>
									<DropdownMenuItem>
										Billing
									</DropdownMenuItem>
									<DropdownMenuItem> Team </DropdownMenuItem>
									<DropdownMenuItem>
										Subscription
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</nav>
			</header>
			<main class="w-full overflow-y-auto hidden-scrollbar">
				<slot />
			</main>
		</div>
	</div>
</template>
