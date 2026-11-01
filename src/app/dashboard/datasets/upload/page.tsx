"use client";

import { useState } from "react";

import { CsvUpload } from "@/components/datasets/csv-upload";
import { DatasetPreview } from "@/components/datasets/dataset-preview";
import { DynamicDashboard } from "@/components/dashboard/dynamic-dashboard";

import { DatasetProfile } from "@/types/dataset";

import { Button } from "@/components/ui/button";

export default function UploadDatasetPage() {
	const [dataset, setDataset] = useState<DatasetProfile | null>(null);

	const [showDashboard, setShowDashboard] = useState(false);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Smart Dataset Analysis
				</h1>

				<p className="mt-2 text-muted-foreground">
					Upload your dataset and automatically generate a business
					intelligence dashboard.
				</p>
			</div>

			<CsvUpload
				onDatasetLoaded={(data) => {
					setDataset(data);
					setShowDashboard(false);
				}}
			/>

			{dataset && (
				<>
					<DatasetPreview dataset={dataset} />

					<Button
						onClick={() => setShowDashboard(true)}
						className="bg-indigo-600 hover:bg-indigo-700"
					>
						Generate Dashboard
					</Button>
				</>
			)}

			{dataset && showDashboard && <DynamicDashboard dataset={dataset} />}
		</div>
	);
}
