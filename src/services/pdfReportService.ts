import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import type { AnalysisResult } from '../types/analysis';
import type { ResumeRecommendation } from '../types/recommendation';

export function generateAnalysisPDF(
  result: AnalysisResult,
) {
  const pdf = new jsPDF();

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;

  const recommendations =
    result.ai_recommendations as
      | ResumeRecommendation
      | undefined;

  let y = 20;

  const addHeading = (title: string) => {
    if (y > 260) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(15);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin, y);

    y += 10;
  };

  const addText = (text: string) => {
    const lines = pdf.splitTextToSize(
      text || 'Not available',
      pageWidth - margin * 2,
    );

    if (y + lines.length * 6 > 275) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(lines, margin, y);

    y += lines.length * 6 + 3;
  };

  // Header
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.text('AI Resume Analysis Report', margin, y);

  y += 12;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  pdf.text(
    `Resume: ${result.filename}`,
    margin,
    y,
  );

  y += 15;

  // Match score
  addHeading('1. Job Match Overview');

  pdf.setFontSize(30);
  pdf.setFont('helvetica', 'bold');

  pdf.text(
    `${result.match_analysis.match_score}%`,
    margin,
    y,
  );

  y += 12;

  addText(
    `Text similarity: ${result.text_similarity}%`,
  );

  // Required skills
  addHeading('2. Required Skills');

  const comparison =
    result.match_analysis.comparison;

  autoTable(pdf, {
    startY: y,
    head: [['Matched Skills', 'Missing Skills']],
    body: [[
      comparison.matched_required.join(', ') || 'None',
      comparison.missing_required.join(', ') || 'None',
    ]],
    theme: 'grid',
  });

  y = (pdf as any).lastAutoTable.finalY + 12;

  // Preferred skills
  addHeading('3. Preferred Skills');

  autoTable(pdf, {
    startY: y,
    head: [['Matched Skills', 'Missing Skills']],
    body: [[
      comparison.matched_preferred.join(', ') || 'None',
      comparison.missing_preferred.join(', ') || 'None',
    ]],
    theme: 'grid',
  });

  y = (pdf as any).lastAutoTable.finalY + 12;

  // Resume information
  addHeading('4. Resume Information');

  addText(
    `Skills identified: ${result.resume_analysis.skills
      ? Object.values(result.resume_analysis.skills)
          .flat()
          .join(', ')
      : 'Not available'}`,
  );

  addText(
    `Experience: ${result.resume_analysis.experience_mentions.join(', ')}`,
  );

  addText(
    `Education: ${result.resume_analysis.education.join(', ')}`,
  );

  // AI recommendations
  if (recommendations) {
    addHeading('5. AI Strengths');

    recommendations.strengths.forEach((item) => {
      addText(`${item.title}: ${item.description}`);
    });

    addHeading('6. Areas to Improve');

    recommendations.weaknesses.forEach((item) => {
      addText(`${item.title}: ${item.description}`);
    });

    addHeading('7. Improved Resume Bullet Points');

    recommendations.bullet_improvements.forEach((item) => {
      addText(`Original: ${item.original}`);
      addText(`Suggested: ${item.improved}`);
    });

    addHeading('8. Recommended Skills');

    recommendations.skill_recommendations.forEach((item) => {
      addText(`${item.skill}: ${item.reason}`);
    });
  }

  // Footer
  const pageCount = pdf.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {
    pdf.setPage(page);

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');

    pdf.text(
      `AI Resume Analyzer | Page ${page} of ${pageCount}`,
      pageWidth / 2,
      290,
      { align: 'center' },
    );
  }

  const filename = result.filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9_-]/gi, '_');

  pdf.save(`${filename}_analysis_report.pdf`);
}