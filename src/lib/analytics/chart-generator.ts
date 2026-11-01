import { BusinessColumnMapping } from "@/types/dataset";

export interface ChartDataPoint {
	name: string;
	value: number;
}

function aggregateByColumn(
	rows: Record<string, unknown>[],
	groupColumn: string,
	valueColumn: string,
): ChartDataPoint[] {
	const totals = new Map<string, number>();

	rows.forEach((row) => {
		const group = String(row[groupColumn] ?? "Unknown");
		const value = Number(row[valueColumn] ?? 0);

		if (!Number.isFinite(value)) return;

		totals.set(group, (totals.get(group) ?? 0) + value);
	});

	return Array.from(totals.entries()).map(([name, value]) => ({
		name,
		value,
	}));
}

export function generateCharts(
	rows: Record<string, unknown>[],
	mapping: BusinessColumnMapping,
) {
	const charts: {
		title: string;
		type: "line" | "bar";
		data: ChartDataPoint[];
	}[] = [];

	if (mapping.date && mapping.revenue) {
		const data = aggregateByColumn(
			rows,
			mapping.date,
			mapping.revenue,
		).sort((a, b) => a.name.localeCompare(b.name));

		charts.push({
			title: "Revenue Over Time",
			type: "line",
			data,
		});
	}

	if (mapping.category && mapping.revenue) {
		charts.push({
			title: "Revenue by Category",
			type: "bar",
			data: aggregateByColumn(rows, mapping.category, mapping.revenue),
		});
	}

	if (mapping.product && mapping.revenue) {
		charts.push({
			title: "Revenue by Product",
			type: "bar",
			data: aggregateByColumn(rows, mapping.product, mapping.revenue),
		});
	}

	if (mapping.region && mapping.revenue) {
		charts.push({
			title: "Revenue by Region",
			type: "bar",
			data: aggregateByColumn(rows, mapping.region, mapping.revenue),
		});
	}

	return charts;
}
