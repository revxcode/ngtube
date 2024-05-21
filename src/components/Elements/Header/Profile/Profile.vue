<script setup>
import { defineProps, ref } from "vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	RiLoginCircleLine,
	RiLogoutCircleLine,
	RiSettings3Line,
	RiUserLine,
} from "@remixicon/vue";

const props = defineProps({
	name: String,
	image: String,
});
const image = ref(props.image || "https://vuejs.org/logo.svg");
</script>

<template>
	<!-- Profile  -->
	<div class="w-12 h-12 rounded-full">
		<DropdownMenu>
			<DropdownMenuTrigger>
				<!-- avatar -->
				<Avatar>
					<AvatarImage :src="image" alt="@radix-vue" />
					<AvatarFallback> CN </AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="max-w-40 mx-2">
				<DropdownMenuLabel class="text-nowrap truncate">
					{{ name || "My Account" }}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem class="my-2">
					<RiUserLine class="mr-2 w-5 h-5" /> Profile
				</DropdownMenuItem>
				<DropdownMenuItem class="my-2">
					<RiSettings3Line class="mr-2 w-5 h-5" />
					Settings
				</DropdownMenuItem>
				<DropdownMenuItem class="my-2">
					<RiLoginCircleLine v-show="!name" class="mr-2 w-5 h-5" />
					<RiLogoutCircleLine
						v-show="name"
						class="mr-2 w-5 h-5 text-red-500"
					/>
					<span :class="name ? 'text-red-500 font-semibold' : ''">
						{{ name ? "Logout" : "Login" }}
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>
