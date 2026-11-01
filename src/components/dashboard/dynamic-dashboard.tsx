"use client";

import { DatasetProfile } from "@/types/dataset";

import { detectBusinessColumns } from "@/lib/analytics/column-detector";
import { calculateKPIs } from "@/lib/analytics/kpi-calculator";
import { generateCharts } from "@/lib/analytics/chart-generator";

import { DynamicChart } from "@/components/charts/dynamic-chart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DynamicDashboardProps {
	dataset: DatasetProfile;
}

export function DynamicDashboard({ dataset }: DynamicDashboardProps) {
	const rows = dataset.rows ?? [];

	const mapping = detectBusinessColumns(dataset);

	const kpis = calculateKPIs(rows, mapping);

	const charts = generateCharts(rows, mapping);

	const metricCards = [
		{
			title: "Total Revenue",
			value:
				kpis.totalRevenue !== undefined
					? kpis.totalRevenue.toLocaleString()
					: null,
		},
		{
			title: "Total Profit",
			value:
				kpis.totalProfit !== undefined
					? kpis.totalProfit.toLocaleString()
					: null,
		},
		{
			title: "Profit Margin",
			value:
				kpis.profitMargin !== undefined
					? `${kpis.profitMargin.toFixed(2)}%`
					: null,
		},
		{
			title: "Total Orders",
			value:
				kpis.totalOrders !== undefined
					? kpis.totalOrders.toLocaleString()
					: null,
		},
		{
			title: "Total Customers",
			value:
				kpis.totalCustomers !== undefined
					? kpis.totalCustomers.toLocaleString()
					: null,
		},
		{
			title: "Average Order Value",
			value:
				kpis.averageOrderValue !== undefined
					? kpis.averageOrderValue.toFixed(2)
					: null,
		},
	].filter((metric) => metric.value !== null);

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold">
					Generated Business Dashboard
				</h2>

				<p className="text-muted-foreground">
					Analytics generated from {dataset.name}
				</p>
			</div>

			{/* KPIs */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{metricCards.map((metric) => (
					<Card key={metric.title}>
						<CardHeader>
							<CardTitle className="text-sm">
								{metric.title}
							</CardTitle>
						</CardHeader>

						<CardContent>
							<p className="text-2xl font-bold">{metric.value}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Charts */}
			<div className="grid gap-6 lg:grid-cols-2">
				{charts.map((chart) => (
					<DynamicChart
						key={chart.title}
						title={chart.title}
						type={chart.type}
						data={chart.data}
					/>
				))}
			</div>

			{metricCards.length === 0 && charts.length === 0 && (
				<Card>
					<CardContent className="py-8 text-muted-foreground">
						No supported business metrics were detected. Try
						uploading a dataset with sales, revenue, profit,
						customer, or product columns.
					</CardContent>
				</Card>
			)}
		</div>
	);
}
