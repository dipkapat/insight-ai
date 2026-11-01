"use client";

import {
	ResponsiveContainer,
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartDataPoint } from "@/lib/analytics/chart-generator";

interface DynamicChartProps {
	title: string;
	type: "line" | "bar";
	data: ChartDataPoint[];
}

export function DynamicChart({ title, type, data }: DynamicChartProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="h-[320px]">
					<ResponsiveContainer width="100%" height="100%">
						{type === "line" ? (
							<LineChart data={data}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />

								<Line
									type="monotone"
									dataKey="value"
									stroke="#6366f1"
									strokeWidth={3}
								/>
							</LineChart>
						) : (
							<BarChart data={data}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />

								<Bar
									dataKey="value"
									fill="#6366f1"
									radius={[6, 6, 0, 0]}
								/>
							</BarChart>
						)}
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
