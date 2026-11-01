export type ColumnType = "string" | "number" | "date" | "boolean";

export interface DatasetColumn {
	name: string;
	type: ColumnType;
	missingValues: number;
	uniqueValues: number;
}

export interface DatasetProfile {
	name: string;
	rowCount: number;
	columnCount: number;
	columns: DatasetColumn[];
	preview: Record<string, unknown>[];
	rows?: Record<string, unknown>[];
}

export interface BusinessColumnMapping {
	date?: string;
	revenue?: string;
	profit?: string;
	customer?: string;
	product?: string;
	category?: string;
	region?: string;
	orderId?: string;
}
