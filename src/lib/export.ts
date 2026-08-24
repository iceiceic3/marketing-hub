/**
 * Export/Download utility functions for the marketing tools platform.
 */

/**
 * Export an array of objects as a CSV file download.
 * Uses the first row's keys as column headers.
 */
export function exportToCSV(
  data: Record<string, unknown>[],
  filename: string
): void {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows: string[] = [];

  // Header row
  csvRows.push(headers.map(escapeCSVField).join(","));

  // Data rows
  for (const row of data) {
    const values = headers.map((h) => {
      const val = row[h];
      return escapeCSVField(String(val ?? ""));
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  downloadTextFile(csvString, filename.endsWith(".csv") ? filename : `${filename}.csv`);
}

/**
 * Export any data as a JSON file download.
 */
export function exportToJSON(data: unknown, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  downloadTextFile(json, filename.endsWith(".json") ? filename : `${filename}.json`);
}

/**
 * Copy text to the clipboard and return whether it succeeded.
 */
export async function copyToClipboardWithFeedback(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / non-secure contexts
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }
}

/**
 * Download a plain text string as a file.
 */
export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ---------- internal helpers ----------

function escapeCSVField(field: string): string {
  const val = String(field);
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}
