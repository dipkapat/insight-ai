import { BusinessColumnMapping } from "@/types/dataset";

export interface BusinessKPIs {
	totalRevenue?: number;
	totalProfit?: number;
	profitMargin?: number;
	totalOrders?: number;
	totalCustomers?: number;
	averageOrderValue?: number;
}

export function calculateKPIs(
	rows: Record<string, unknown>[],
	mapping: BusinessColumnMapping,
): BusinessKPIs {
	const kpis: BusinessKPIs = {};

	if (mapping.revenue) {
		kpis.totalRevenue = rows.reduce(
			(sum, row) => sum + Number(row[mapping.revenue!] || 0),
			0,
		);
	}

	if (mapping.profit) {
		kpis.totalProfit = rows.reduce(
			(sum, row) => sum + Number(row[mapping.profit!] || 0),
			0,
		);
	}

	if (
		kpis.totalRevenue !== undefined &&
		kpis.totalProfit !== undefined &&
		kpis.totalRevenue !== 0
	) {
		kpis.profitMargin = (kpis.totalProfit / kpis.totalRevenue) * 100;
	}

	if (mapping.orderId) {
		kpis.totalOrders = new Set(
			rows.map((row) => row[mapping.orderId!]),
		).size;
	}

	if (mapping.customer) {
		kpis.totalCustomers = new Set(
			rows.map((row) => row[mapping.customer!]),
		).size;
	}

	if (
		kpis.totalRevenue !== undefined &&
		kpis.totalOrders !== undefined &&
		kpis.totalOrders > 0
	) {
		kpis.averageOrderValue = kpis.totalRevenue / kpis.totalOrders;
	}

	return kpis;
}
