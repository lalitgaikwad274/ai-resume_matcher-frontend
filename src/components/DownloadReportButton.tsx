import { Download } from 'lucide-react';

import type { AnalysisResult } from '../types/analysis';

import { generateAnalysisPDF } from '../services/pdfReportService';

interface Props {
  result: AnalysisResult;
}

export default function DownloadReportButton({
  result,
}: Props) {
  const handleDownload = () => {
    generateAnalysisPDF(result);
  };

  return (
    <button
      className="download-report-button"
      onClick={handleDownload}
    >
      <Download size={18} />
      Download PDF Report
    </button>
  );
}