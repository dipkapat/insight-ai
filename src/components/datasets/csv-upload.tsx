"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Upload, FileSpreadsheet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DatasetProfile } from "@/types/dataset";
import { analyzeDataset } from "@/lib/datasets/analyzer";

interface CsvUploadProps {
	onDatasetLoaded: (dataset: DatasetProfile) => void;
}

export function CsvUpload({ onDatasetLoaded }: CsvUploadProps) {
	const [loading, setLoading] = useState(false);
	const [fileName, setFileName] = useState("");

	function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (!file) return;

		if (!file.name.toLowerCase().endsWith(".csv")) {
			alert("Please upload a CSV file.");
			return;
		}

		// Limit browser parsing to 10 MB for this MVP.
		if (file.size > 10 * 1024 * 1024) {
			alert("File size must not exceed 10 MB.");
			return;
		}

		setLoading(true);
		setFileName(file.name);

		Papa.parse<Record<string, string>>(file, {
			header: true,
			skipEmptyLines: true,

			complete: (results) => {
				setLoading(false);

				if (results.errors.length > 0) {
					alert(`CSV parsing failed: ${results.errors[0].message}`);
					return;
				}

				const rows = results.data;
				const headers = results.meta.fields ?? [];

				if (rows.length === 0 || headers.length === 0) {
					alert("The CSV file is empty or invalid.");
					return;
				}

				const profile = analyzeDataset(file.name, rows, headers);

				onDatasetLoaded(profile);
			},

			error: (error) => {
				setLoading(false);
				alert(error.message);
			},
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Upload Business Dataset</CardTitle>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="rounded-xl border-2 border-dashed p-10 text-center">
					<FileSpreadsheet className="mx-auto mb-4 h-12 w-12 text-indigo-600" />

					<h3 className="text-lg font-semibold">
						Upload your CSV dataset
					</h3>

					<p className="mt-2 text-sm text-muted-foreground">
						Select a CSV file containing your business data. Maximum
						file size: 10 MB.
					</p>

					<label className="mt-6 inline-block cursor-pointer">
						<input
							type="file"
							accept=".csv,text/csv"
							className="hidden"
							onChange={handleFileUpload}
							disabled={loading}
						/>

						<span className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
							<Upload className="h-4 w-4" />
							Choose CSV File
						</span>
					</label>

					{fileName && (
						<p className="mt-4 text-sm">
							Selected file: {fileName}
						</p>
					)}

					{loading && (
						<p className="mt-3 text-sm text-indigo-600">
							Analyzing dataset...
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
