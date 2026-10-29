"use client";

import { Bell, Search, UserCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
	return (
		<header className="h-16 border-b bg-background flex items-center justify-between px-6">
			<div>
				<h2 className="font-semibold text-lg">Business Intelligence</h2>
			</div>

			<div className="flex items-center gap-4">
				{/* Search */}
				<div className="hidden md:flex items-center relative">
					<Search className="absolute left-3 h-4 w-4 text-muted-foreground" />

					<Input placeholder="Search..." className="pl-9 w-64" />
				</div>

				{/* Notifications */}
				<Button variant="ghost" size="icon" aria-label="Notifications">
					<Bell className="h-5 w-5" />
				</Button>

				{/* Profile */}
				<Button variant="ghost" size="icon" aria-label="Profile">
					<UserCircle className="h-6 w-6" />
				</Button>
			</div>
		</header>
	);
}
