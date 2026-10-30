import { DatasetProfile } from "@/types/dataset";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DatasetPreviewProps {
	dataset: DatasetProfile;
}

export function DatasetPreview({ dataset }: DatasetPreviewProps) {
	return (
		<div className="space-y-6">
			{/* Dataset Summary */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm">Dataset Name</CardTitle>
					</CardHeader>

					<CardContent>
						<p className="font-semibold break-all">
							{dataset.name}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm">Total Rows</CardTitle>
					</CardHeader>

					<CardContent>
						<p className="text-2xl font-bold">
							{dataset.rowCount.toLocaleString()}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm">Total Columns</CardTitle>
					</CardHeader>

					<CardContent>
						<p className="text-2xl font-bold">
							{dataset.columnCount}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Column Analysis */}
			<Card>
				<CardHeader>
					<CardTitle>Column Analysis</CardTitle>
				</CardHeader>

				<CardContent className="overflow-x-auto">
					<table className="w-full caption-bottom text-sm">
						<thead>
							<tr className="border-b">
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Column</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data Type</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Missing Values</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Unique Values</th>
							</tr>
						</thead>

						<tbody>
							{dataset.columns.map((column) => (
								<tr key={column.name} className="border-b transition-colors hover:bg-muted/50">
									<td className="p-4 align-middle">{column.name}</td>
									<td className="p-4 align-middle">{column.type}</td>
									<td className="p-4 align-middle">
										{column.missingValues}
									</td>
									<td className="p-4 align-middle">{column.uniqueValues}</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardContent>
			</Card>

			{/* Data Preview */}
			<Card>
				<CardHeader>
					<CardTitle>Dataset Preview</CardTitle>
				</CardHeader>

				<CardContent className="overflow-x-auto">
					<table className="w-full caption-bottom text-sm">
						<thead>
							<tr className="border-b">
								{dataset.columns.map((column) => (
									<th key={column.name} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
										{column.name}
									</th>
								))}
							</tr>
						</thead>

						<tbody>
							{dataset.preview.map((row, index) => (
								<tr key={index} className="border-b transition-colors hover:bg-muted/50">
									{dataset.columns.map((column) => (
										<td key={column.name} className="p-4 align-middle">
											{String(row[column.name] ?? "")}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</CardContent>
			</Card>
		</div>
	);
}
