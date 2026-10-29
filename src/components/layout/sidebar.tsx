"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	LayoutDashboard,
	Database,
	BarChart3,
	BrainCircuit,
	MessageSquare,
	Settings,
	Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navigation = [
	{
		name: "Overview",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Datasets",
		href: "/dashboard/datasets",
		icon: Database,
	},
	{
		name: "Analytics",
		href: "/dashboard/analytics",
		icon: BarChart3,
	},
	{
		name: "AI Insights",
		href: "/dashboard/insights",
		icon: BrainCircuit,
	},
	{
		name: "AI Assistant",
		href: "/dashboard/assistant",
		icon: MessageSquare,
	},
	{
		name: "Settings",
		href: "/dashboard/settings",
		icon: Settings,
	},
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden md:flex w-64 flex-col border-r bg-background min-h-screen">
			{/* Logo */}
			<div className="h-16 flex items-center px-6 border-b">
				<h1 className="text-xl font-bold text-indigo-600">InsightAI</h1>
			</div>

			{/* Navigation */}
			<nav className="flex-1 space-y-2 p-4">
				{navigation.map((item) => {
					const Icon = item.icon;

					const active =
						item.href === "/dashboard"
							? pathname === item.href
							: pathname === item.href ||
								pathname.startsWith(`${item.href}/`);

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`
								flex items-center gap-3 rounded-lg px-4 py-3
								text-sm font-medium transition-colors
								${
									active
										? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
										: "text-muted-foreground hover:bg-muted"
								}
								`}
						>
							<Icon className="h-5 w-5" />

							{item.name}
						</Link>
					);
				})}
			</nav>

			{/* Upload Button */}
			<div className="p-4 border-t">
				<Button className="w-full">
					<Link href="/dashboard/datasets/upload">
						<Upload className="mr-2 h-4 w-4" />
						Upload Dataset
					</Link>
				</Button>
			</div>
		</aside>
	);
}
