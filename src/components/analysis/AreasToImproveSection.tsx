import React from 'react';
import {
  AlertTriangle,
  Info,
  Target,
  ArrowRight,
  Lightbulb,
  ChevronUp,
  ChevronDown,
  GraduationCap,
  Check,
  TrendingUp,
} from 'lucide-react';
import skillsImg from '../../assets/Skills.png';
import {
  MobileReactGraphic,
  LaptopPythonGraphic,
  DatabaseGearGraphic,
} from '../CardVisualGraphics';

interface AreasToImproveSectionProps {
  careerGoal: string;
  onOpenGoalModal: () => void;
  weaknesses?: { title: string; explanation: string; improvement?: string }[];
  expandedCards: Record<number, boolean>;
  onToggleCard: (index: number) => void;
  matchScore: number;
  matchedSkillsCount: number;
  missingSkillsCount: number;
  onNavigateToSkills: () => void;
  onNavigateToLearning: () => void;
}

export const AreasToImproveSection: React.FC<AreasToImproveSectionProps> = ({
  careerGoal,
  onOpenGoalModal,
  weaknesses,
  expandedCards,
  onToggleCard,
  matchScore,
  matchedSkillsCount,
  missingSkillsCount,
  onNavigateToSkills,
  onNavigateToLearning,
}) => {
  const scoreVal = Math.min(100, Math.max(0, Math.round(matchScore)));

  const getCardGraphic = (title: string, index: number) => {
    const lower = title.toLowerCase();
    if (
      lower.includes('mobile') ||
      lower.includes('react') ||
      lower.includes('native') ||
      index === 0
    ) {
      return <MobileReactGraphic />;
    }
    if (
      lower.includes('django') ||
      lower.includes('python') ||
      lower.includes('framework') ||
      index === 1
    ) {
      return <LaptopPythonGraphic />;
    }
    return <DatabaseGearGraphic />;
  };

  return (
    <div className="view-container view-areas-to-improve">
      {/* Header: Needs Attention + Your Career Goal Banner + Illustration */}
      <header className="areas-header-section">
        <div className="areas-header-left">
          <div className="attention-kicker-row">
            <div className="attention-icon-box">
              <AlertTriangle size={18} />
            </div>
            <span className="attention-kicker-text">NEEDS ATTENTION</span>
          </div>

          <div className="areas-title-row">
            <h1>Areas to Improve</h1>
            <span
              className="info-circle-tooltip"
              title="Targeted recommendations to close skill gaps"
            >
              <Info size={16} />
            </span>
          </div>

          <p className="areas-subtitle">
            Focus on these areas to strengthen your skills and boost your job match.
          </p>
        </div>

        {/* Right Side: Career Goal Card & Character Illustration */}
        <div className="areas-header-right">
          <div className="career-goal-pill-card">
            <div className="goal-target-icon">
              <Target size={18} />
            </div>
            <div className="goal-text-content">
              <span className="goal-kicker">Your Career Goal</span>
              <strong className="goal-title">{careerGoal}</strong>
            </div>
            <button
              type="button"
              className="btn-update-goal"
              onClick={onOpenGoalModal}
            >
              <span>Update Goal</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="header-illustration-mini">
            <img
              className="skills-content-img"
              src={skillsImg}
              alt="Career Goal Illustration"
            />
          </div>
        </div>
      </header>

      {/* The 3 Detailed Improvement Cards (01, 02, 03) */}
      <section className="improvement-cards-list">
        {weaknesses &&
          weaknesses.map((item, index) => {
            const itemNum = String(index + 1).padStart(2, '0');
            const isExpanded = expandedCards[index] ?? true;
            const isHigh = index === 0;

            return (
              <div key={index} className="improvement-card">
                <div className="improvement-card-main-row">
                  {/* Left: Number + Vector Graphic */}
                  <div className="card-identity-col">
                    <span className="card-number-label">{itemNum}</span>
                    {/* <div className="card-illustration-wrap">
                      {getCardGraphic(item.title, index)}
                    </div> */}
                  </div>

                  {/* Middle: Content */}
                  <div className="card-content-col">
                    <div className="card-title-row">
                      <h3>{item.title}</h3>
                    </div>

                    <p className="card-explanation-text">{item.explanation}</p>

                    {/* Action To Take Mint Pill Box */}
                    {item.improvement && isExpanded && (
                      <div className="action-to-take-box">
                        <div className="action-lightbulb-icon">
                          <Lightbulb size={16} />
                        </div>
                        <div className="action-text-content">
                          <strong>Action to take:</strong>{' '}
                          <span>{item.improvement}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Priority Pill & Expand Toggle */}
                  <div className="card-actions-col">
                    <span
                      className={`priority-tag-pill ${isHigh ? 'pill-high' : 'pill-medium'}`}
                    >
                      <span className="priority-symbol">!</span>
                      <span>{isHigh ? 'High Priority' : 'Medium Priority'}</span>
                    </span>

                    <button
                      type="button"
                      className="btn-expand-circle"
                      onClick={() => onToggleCard(index)}
                      aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </section>

      {/* Bottom Mini-Dashboard Row: Skills Profile + Level Up Career */}
      <div className="bottom-summary-cards-row">
        {/* Left: Skills Profile Mini Card */}
        <div
          className="mini-skills-profile-card"
          onClick={onNavigateToSkills}
          role="button"
          tabIndex={0}
        >
          <div className="mini-card-top-header">
            <div className="mini-card-icon-sq">
              <GraduationCap size={16} />
            </div>
            <div className="mini-card-titles">
              <span className="mini-card-kicker">Skills Profile</span>
              <h4>Skills alignment &amp; gaps</h4>
            </div>
          </div>

          <div className="mini-progress-section">
            <div className="mini-bar-track">
              <div
                className="mini-bar-fill"
                style={{ width: `${scoreVal}%` }}
              />
            </div>
            <span className="mini-bar-percentage">{scoreVal}%</span>
          </div>

          <div className="mini-stats-badges-row">
            <div className="mini-status-chip chip-green">
              <Check size={13} strokeWidth={3} />
              <span>Matched Skills</span>
              <strong>
                {matchedSkillsCount} / {matchedSkillsCount}
              </strong>
            </div>

            <div className="mini-status-chip chip-red">
              <AlertTriangle size={13} />
              <span>Missing Skills</span>
              <strong>{missingSkillsCount}</strong>
            </div>
          </div>
        </div>

        {/* Right: Level Up Career Mini Card */}
        <div className="mini-levelup-card">
          <div className="levelup-left-wrap">
            <div className="levelup-trending-icon">
              <TrendingUp size={20} />
            </div>
            <div className="levelup-labels">
              <h4>Level up your career!</h4>
              <p>Bridge the skill gaps and unlock more opportunities.</p>
            </div>
          </div>

          <button
            type="button"
            className="btn-view-learning-plan"
            onClick={onNavigateToLearning}
          >
            <span>View Learning Plan</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreasToImproveSection;

