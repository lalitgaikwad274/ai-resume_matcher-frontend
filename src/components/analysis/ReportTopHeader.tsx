import React from 'react';
import {
  FileText,
  Target,
  Download,
  RotateCcw,
  Menu,
  GraduationCap,
} from 'lucide-react';

interface ReportTopHeaderProps {
  candidateLabel: string;
  jobTitle: string;
  onDownloadReport: () => void;
  onAnalyzeAnother: () => void;
  onOpenMobileMenu: () => void;
}

export const ReportTopHeader: React.FC<ReportTopHeaderProps> = ({
  candidateLabel,
  jobTitle,
  onDownloadReport,
  onAnalyzeAnother,
  onOpenMobileMenu,
}) => {
  return (
    <>
      {/* Mobile Top Bar */}
      <div className="mobile-header-bar">
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="mobile-header-brand">
          <GraduationCap size={20} color="#10b981" />
          <span>Resume Analyzer</span>
        </div>
        <button
          type="button"
          className="mobile-download-btn"
          onClick={onDownloadReport}
          title="Download PDF Report"
        >
          <Download size={18} />
        </button>
      </div>

      {/* Main Report Top Header */}
      <header className="report-top-header">
        <div className="report-header-meta-row">
          <div className="report-title-block">
            <span className="report-kicker-tag">YOUR CAREER SNAPSHOT • REPORT 01</span>
            <h1 className="report-main-title">Resume analysis</h1>

            <div className="report-pills-row">
              <span className="report-pill pill-candidate">
                <FileText size={14} />
                <span>{candidateLabel}</span>
              </span>
              <span className="report-pill pill-target-job">
                <Target size={14} />
                <span>
                  {jobTitle
                    ? jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1)
                    : 'Python developer'}
                </span>
              </span>
            </div>
          </div>

          <div className="report-actions-block">
            <button
              type="button"
              className="btn-navy-download"
              onClick={onDownloadReport}
            >
              <Download size={15} />
              <span>Download report</span>
            </button>
            <button
              type="button"
              className="btn-pill-reanalyze"
              onClick={onAnalyzeAnother}
              title="Upload another resume"
            >
              <RotateCcw size={14} />
              <span>Analyze another</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default ReportTopHeader;

