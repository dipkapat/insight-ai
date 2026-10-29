"use client";

import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	BarChart,
	Bar,
} from "recharts";

const revenueData = [
	{ month: "Jan", revenue: 12000 },
	{ month: "Feb", revenue: 19000 },
	{ month: "Mar", revenue: 15000 },
	{ month: "Apr", revenue: 25000 },
	{ month: "May", revenue: 22000 },
	{ month: "Jun", revenue: 30000 },
];

const categoryData = [
	{ category: "Electronics", sales: 45000 },
	{ category: "Furniture", sales: 28000 },
	{ category: "Clothing", sales: 19000 },
	{ category: "Accessories", sales: 12000 },
];

const metrics = [
	{
		title: "Total Revenue",
		value: "$123,000",
		icon: DollarSign,
	},
	{
		title: "Total Orders",
		value: "1,245",
		icon: ShoppingCart,
	},
	{
		title: "Total Customers",
		value: "845",
		icon: Users,
	},
	{
		title: "Revenue Growth",
		value: "+12.5%",
		icon: TrendingUp,
	},
];

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Dashboard Overview
				</h1>

				<p className="text-muted-foreground mt-2">
					Monitor your business performance and insights.
				</p>
			</div>

			{/* KPI Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{metrics.map((metric) => {
					const Icon = metric.icon;

					return (
						<Card key={metric.title}>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									{metric.title}
								</CardTitle>

								<Icon className="h-5 w-5 text-muted-foreground" />
							</CardHeader>

							<CardContent>
								<div className="text-2xl font-bold">
									{metric.value}
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Charts */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Revenue Chart */}
				<Card>
					<CardHeader>
						<CardTitle>Revenue Performance</CardTitle>
					</CardHeader>

					<CardContent>
						<div className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={revenueData}>
									<CartesianGrid strokeDasharray="3 3" />

									<XAxis dataKey="month" />

									<YAxis />

									<Tooltip />

									<Line
										type="monotone"
										dataKey="revenue"
										stroke="#6366f1"
										strokeWidth={3}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				{/* Category Chart */}
				<Card>
					<CardHeader>
						<CardTitle>Sales by Category</CardTitle>
					</CardHeader>

					<CardContent>
						<div className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={categoryData}>
									<CartesianGrid strokeDasharray="3 3" />

									<XAxis dataKey="category" />

									<YAxis />

									<Tooltip />

									<Bar
										dataKey="sales"
										fill="#6366f1"
										radius={[6, 6, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* AI Insights */}
			<Card>
				<CardHeader>
					<CardTitle>✨ AI Business Insights</CardTitle>
				</CardHeader>

				<CardContent>
					<p className="text-muted-foreground">
						AI-generated insights will appear here after you upload
						and analyze a dataset.
					</p>
				</CardContent>
			</Card>

			<p className="text-xs text-muted-foreground">
				Demo dashboard — all displayed metrics and chart values are
				sample data.
			</p>
		</div>
	);
}
