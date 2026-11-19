import { useState } from 'react';
import type { AnalysisResult } from '../types/analysis';
import { generateAnalysisPDF } from '../services/pdfReportService';

import {
  SidebarNav,
  ReportTopHeader,
  OverviewSection,
  SkillsAlignmentSection,
  AreasToImproveSection,
  StrengthsSection,
  LearningPlanSection,
  BulletRewritesSection,
  CareerGoalModal,
} from '../components/analysis';

interface Props {
  result: AnalysisResult;
  onAnalyzeAnother: () => void;
}

export default function AnalysisPage({ result, onAnalyzeAnother }: Props) {
  const match = result.match_analysis;
  const resume = result.resume_analysis;
  const recs = result.ai_recommendations;

  // Active navigation tab (Default to 'areas-to-improve' to showcase the core report view)
  const [activeNav, setActiveNav] = useState<string>('areas-to-improve');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Career Goal State
  const defaultGoalTitle = result.job_title
    ? `Become a ${result.job_title.charAt(0).toUpperCase() + result.job_title.slice(1)}`
    : 'Become a Backend Developer';
  const [careerGoal, setCareerGoal] = useState<string>(defaultGoalTitle);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [tempGoal, setTempGoal] = useState(careerGoal);

  // Accordion state for improvement cards
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  // Accordion state for strengths
  const [expandedStrengths, setExpandedStrengths] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
  });

  // Copied bullet state
  const [copiedBulletIndex, setCopiedBulletIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStrength = (index: number) => {
    setExpandedStrengths((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCopyBullet = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedBulletIndex(index);
    setTimeout(() => setCopiedBulletIndex(null), 2000);
  };

  const handleSaveGoal = () => {
    if (tempGoal.trim()) {
      setCareerGoal(tempGoal.trim());
    }
    setGoalModalOpen(false);
  };

  // Helper to parse candidate label
  const getCandidateMeta = () => {
    const filename = resume.filename || '';
    if (filename.toLowerCase().includes('lalit') && filename.toLowerCase().includes('gaikwad')) {
      return 'Lalit Gaikwad / React Native Developer';
    }
    const clean = filename
      .replace(/\.pdf.*$/i, '')
      .replace(/\s*\(\d+\)/g, '')
      .replace(/_/g, ' ');
    return clean || 'Lalit Gaikwad / React Native Developer';
  };

  return (
    <div className="analyzer-app-shell">
      {/* Sidebar Navigation */}
      <SidebarNav
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Viewport */}
      <main className="app-main-viewport">
        {/* Report Top Header */}
        <ReportTopHeader
          candidateLabel={getCandidateMeta()}
          jobTitle={result.job_title || 'Python developer'}
          activeNav={activeNav}
          onSelectNav={setActiveNav}
          onDownloadReport={() => generateAnalysisPDF(result)}
          onAnalyzeAnother={onAnalyzeAnother}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* SECTION: Overview / Dashboard (Screenshot 1) */}
        {(activeNav === 'overview' || activeNav === 'dashboard') && (
          <OverviewSection
            matchScore={match.match_score}
            requiredCoverage={match.required_coverage}
            totalSkillsFound={resume.total_skills}
            textSimilarity={result.text_similarity}
            overallFeedback={recs?.overall_feedback}
            strengths={recs?.strengths}
            expandedStrengths={expandedStrengths}
            onToggleStrength={toggleStrength}
          />
        )}

        {/* SECTION: Skills Alignment & Gaps (Screenshot 2) */}
        {(activeNav === 'skills' || activeNav === 'job-match') && (
          <SkillsAlignmentSection
            matchedSkills={match.matched_required}
            missingSkills={match.missing_required}
            skillsByCategory={resume.skills}
            onNavigateToLearning={() => setActiveNav('learning')}
          />
        )}

        {/* SECTION: Areas to Improve (Screenshot 3) */}
        {activeNav === 'areas-to-improve' && (
          <AreasToImproveSection
            careerGoal={careerGoal}
            onOpenGoalModal={() => {
              setTempGoal(careerGoal);
              setGoalModalOpen(true);
            }}
            weaknesses={recs?.weaknesses}
            expandedCards={expandedCards}
            onToggleCard={toggleCard}
            matchScore={match.match_score}
            matchedSkillsCount={match.matched_required?.length || 5}
            missingSkillsCount={match.missing_required?.length || 2}
            onNavigateToSkills={() => setActiveNav('skills')}
            onNavigateToLearning={() => setActiveNav('learning')}
          />
        )}

        {/* SECTION: Key Strengths Deep Dive */}
        {activeNav === 'strengths' && (
          <StrengthsSection strengths={recs?.strengths} />
        )}

        {/* SECTION: Personalized Learning Plan */}
        {activeNav === 'learning' && (
          <LearningPlanSection missingSkills={recs?.missing_skills} />
        )}

        {/* SECTION: Bullet Rewrites / Career Tips */}
        {(activeNav === 'bullet-rewrites' || activeNav === 'career-tips') && (
          <BulletRewritesSection
            bulletImprovements={recs?.bullet_improvements}
            copiedIndex={copiedBulletIndex}
            onCopyBullet={handleCopyBullet}
          />
        )}

        {/* Modal: Update Career Goal */}
        <CareerGoalModal
          isOpen={goalModalOpen}
          tempGoal={tempGoal}
          onChangeTempGoal={setTempGoal}
          onSaveGoal={handleSaveGoal}
          onClose={() => setGoalModalOpen(false)}
        />
      </main>
    </div>
  );
}
