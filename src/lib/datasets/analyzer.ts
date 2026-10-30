import { DatasetColumn, DatasetProfile, ColumnType } from "@/types/dataset";

function detectColumnType(values: unknown[]): ColumnType {
	const validValues = values.filter(
		(value) =>
			value !== null &&
			value !== undefined &&
			String(value).trim() !== "",
	);

	if (validValues.length === 0) {
		return "string";
	}

	const isNumber = validValues.every((value) => !isNaN(Number(value)));

	if (isNumber) {
		return "number";
	}

	const isBoolean = validValues.every((value) =>
		["true", "false"].includes(String(value).toLowerCase()),
	);

	if (isBoolean) {
		return "boolean";
	}

	const isDate = validValues.every(
		(value) => !isNaN(Date.parse(String(value))),
	);

	if (isDate) {
		return "date";
	}

	return "string";
}

export function analyzeDataset(
	name: string,
	rows: Record<string, unknown>[],
	headers: string[],
): DatasetProfile {
	const columns: DatasetColumn[] = headers.map((header) => {
		const values = rows.map((row) => row[header]);

		const missingValues = values.filter(
			(value) =>
				value === null ||
				value === undefined ||
				String(value).trim() === "",
		).length;

		const uniqueValues = new Set(values.map((value) => String(value))).size;

		return {
			name: header,
			type: detectColumnType(values),
			missingValues,
			uniqueValues,
		};
	});

	return {
		name,
		rowCount: rows.length,
		columnCount: headers.length,
		columns,
		preview: rows.slice(0, 10),
	};
}
