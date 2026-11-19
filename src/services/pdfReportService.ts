import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import type { AnalysisResult, Education } from '../types/analysis';
import type { AIRecommendations } from '../types/recommendation';

export function generateAnalysisPDF(result: AnalysisResult) {
  const pdf = new jsPDF();

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;

  const recommendations = result.ai_recommendations as
    | AIRecommendations
    | undefined;

  let y = 20;

  const addHeading = (title: string) => {
    if (y > 255) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin, y);

    y += 9;
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

    y += lines.length * 5.5 + 3;
  };

  const formatEducation = (edu: Education) => {
    if (typeof edu === 'string') return edu;
    return [edu.degree, edu.institution, edu.dates].filter(Boolean).join(' • ');
  };

  // Header
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.text('AI Resume Analysis Report', margin, y);

  y += 11;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const resumeName =
    result.resume_analysis?.filename || result.filename || 'Resume';
  pdf.text(`Resume: ${resumeName}`, margin, y);

  if (result.job_title) {
    y += 6;
    pdf.text(`Target Job Title: ${result.job_title}`, margin, y);
  }

  y += 12;

  // Match score
  addHeading('1. Job Match Overview');

  pdf.setFontSize(26);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${result.match_analysis.match_score}%`, margin, y);

  y += 10;

  if (result.match_analysis.required_coverage != null) {
    addText(
      `Required Skills Match: ${result.match_analysis.required_coverage}%`,
    );
  }

  addText(`Text Similarity: ${result.text_similarity}%`);

  // Overall feedback
  if (recommendations?.overall_feedback) {
    addHeading('2. Executive Summary');
    addText(recommendations.overall_feedback);
  }

  // Required skills
  addHeading('3. Required Skills');

  const matchedRequired = result.match_analysis.matched_required || [];
  const missingRequired = result.match_analysis.missing_required || [];

  autoTable(pdf, {
    startY: y,
    head: [['Matched Required Skills', 'Missing Required Skills']],
    body: [
      [
        matchedRequired.join(', ') || 'None',
        missingRequired.join(', ') || 'None',
      ],
    ],
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [99, 91, 219] },
  });

  y = (pdf as any).lastAutoTable.finalY + 10;

  // Preferred skills
  const matchedPreferred = result.match_analysis.matched_preferred || [];
  const missingPreferred = result.match_analysis.missing_preferred || [];

  if (
    matchedPreferred.length > 0 ||
    missingPreferred.length > 0 ||
    result.match_analysis.preferred_total > 0
  ) {
    addHeading('4. Preferred Skills');

    autoTable(pdf, {
      startY: y,
      head: [['Matched Preferred Skills', 'Missing Preferred Skills']],
      body: [
        [
          matchedPreferred.join(', ') || 'None',
          missingPreferred.join(', ') || 'None',
        ],
      ],
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [100, 116, 139] },
    });

    y = (pdf as any).lastAutoTable.finalY + 10;
  }

  // Resume information
  addHeading('5. Resume Background');

  if (result.resume_analysis?.skills) {
    const allSkills = Object.values(result.resume_analysis.skills)
      .flat()
      .join(', ');
    addText(`Skills Identified (${result.resume_analysis.total_skills}): ${allSkills || 'None'}`);
  }

  if (
    result.resume_analysis?.experience_mentions &&
    result.resume_analysis.experience_mentions.length > 0
  ) {
    addText(
      `Experience: ${result.resume_analysis.experience_mentions
        .map((item) => (!isNaN(Number(item)) ? `${item} years` : item))
        .join(', ')}`,
    );
  }

  if (
    result.resume_analysis?.education &&
    result.resume_analysis.education.length > 0
  ) {
    addText(
      `Education: ${result.resume_analysis.education
        .map(formatEducation)
        .join(', ')}`,
    );
  }

  // AI recommendations
  if (recommendations) {
    if (recommendations.strengths && recommendations.strengths.length > 0) {
      addHeading('6. Candidate Strengths');
      recommendations.strengths.forEach((item) => {
        addText(`• ${item.title}: ${item.explanation}`);
      });
    }

    if (recommendations.weaknesses && recommendations.weaknesses.length > 0) {
      addHeading('7. Areas to Improve');
      recommendations.weaknesses.forEach((item) => {
        let text = `• ${item.title}: ${item.explanation}`;
        if (item.improvement) {
          text += `\n  Improvement: ${item.improvement}`;
        }
        addText(text);
      });
    }

    if (
      recommendations.bullet_improvements &&
      recommendations.bullet_improvements.length > 0
    ) {
      addHeading('8. Resume Bullet Improvements');
      recommendations.bullet_improvements.forEach((item) => {
        addText(`Original: "${item.original}"`);
        addText(`Suggested: "${item.improved}"`);
        if (item.explanation) {
          addText(`Why: ${item.explanation}`);
        }
        y += 2;
      });
    }

    if (
      recommendations.missing_skills &&
      recommendations.missing_skills.length > 0
    ) {
      addHeading('9. Recommended Skills to Learn');
      recommendations.missing_skills.forEach((item) => {
        const priority = item.priority ? ` [${item.priority} Priority]` : '';
        addText(`• ${item.skill}${priority}: ${item.reason}`);
      });
    }

    if (
      recommendations.ats_recommendations &&
      recommendations.ats_recommendations.length > 0
    ) {
      addHeading('10. Recommended ATS Keywords');
      addText(recommendations.ats_recommendations.join(', '));
    }
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

  const cleanFilename = resumeName
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9_-]/gi, '_');

  pdf.save(`${cleanFilename}_analysis_report.pdf`);
}
