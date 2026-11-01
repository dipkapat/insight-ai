import { DatasetProfile, BusinessColumnMapping } from "@/types/dataset";

const columnPatterns: Record<keyof BusinessColumnMapping, string[]> = {
	date: ["order date", "transaction date", "purchase date", "date"],

	revenue: ["sales", "revenue", "total amount", "amount", "total sales"],

	profit: ["profit", "gross profit", "net profit"],

	customer: ["customer id", "customer", "client id"],

	product: ["product name", "product", "item"],

	category: ["category", "product category"],

	region: ["region", "location", "territory"],

	orderId: ["order id", "transaction id", "invoice id"],
};

export function detectBusinessColumns(
	dataset: DatasetProfile,
): BusinessColumnMapping {
	const mapping: BusinessColumnMapping = {};

	for (const [field, patterns] of Object.entries(columnPatterns)) {
		const match = dataset.columns.find((column) => {
			const normalized = column.name
				.toLowerCase()
				.trim()
				.replace(/[_-]+/g, " ")
				.replace(/\s+/g, " ");

			return patterns.includes(normalized);
		});

		if (match) {
			mapping[field as keyof BusinessColumnMapping] = match.name;
		}
	}

	return mapping;
}
