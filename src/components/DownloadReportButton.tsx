import { Download } from 'lucide-react';
import type { AnalysisResult } from '../types/analysis';
import { generateAnalysisPDF } from '../services/pdfReportService';

interface Props {
  result: AnalysisResult;
}

export default function DownloadReportButton({ result }: Props) {
  const handleDownload = () => {
    generateAnalysisPDF(result);
  };

  return (
    <button
      className="btn-download-report"
      onClick={handleDownload}
      type="button"
    >
      <Download size={15} />
      <span>Download report</span>
    </button>
  );
}
