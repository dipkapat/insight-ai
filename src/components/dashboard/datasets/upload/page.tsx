"use client";

import { useState } from "react";

import { CsvUpload } from "@/components/datasets/csv-upload";
import { DatasetPreview } from "@/components/datasets/dataset-preview";

import { DatasetProfile } from "@/types/dataset";

export default function UploadDatasetPage() {
	const [dataset, setDataset] = useState<DatasetProfile | null>(null);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Upload Dataset
				</h1>

				<p className="mt-2 text-muted-foreground">
					Upload your business data and let InsightAI analyze its
					structure.
				</p>
			</div>

			<CsvUpload onDatasetLoaded={setDataset} />

			{dataset && <DatasetPreview dataset={dataset} />}
		</div>
	);
}
