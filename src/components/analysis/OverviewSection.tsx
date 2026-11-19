import React from 'react';
import { Sparkles, CheckCircle2, Check } from 'lucide-react';

interface OverviewSectionProps {
  matchScore: number;
  requiredCoverage?: number | null;
  totalSkillsFound: number;
  textSimilarity: number;
  overallFeedback?: string;
  strengths?: { title: string; explanation: string }[];
  expandedStrengths: Record<number, boolean>;
  onToggleStrength: (index: number) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  matchScore,
  requiredCoverage,
  totalSkillsFound,
  textSimilarity,
  overallFeedback,
  strengths,
  expandedStrengths,
  onToggleStrength,
}) => {
  const scoreVal = Math.min(100, Math.max(0, Math.round(matchScore)));
  const gaugeSize = 132;
  const strokeWidth = 9;
  const radius = (gaugeSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreVal / 100) * circumference;

  return (
    <div className="view-container view-overview">
      {/* Hero Split: Dark Navy Card + 3 Stats Card */}
      <div className="hero-grid-split">
        {/* Dark Navy Card */}
        <div className="hero-dark-card">
          <div className="dark-card-content">
            <span className="dark-card-kicker">ROLE MATCH</span>
            <h2 className="dark-card-heading">
              Good foundations.<br />
              A clearer story will help.
            </h2>
            <p className="dark-card-desc">
              Your experience covers several key requirements. Bring your backend work forward to make the fit easier to see.
            </p>
          </div>

          <div className="hero-gauge-wrapper">
            <svg
              width={gaugeSize}
              height={gaugeSize}
              viewBox={`0 0 ${gaugeSize} ${gaugeSize}`}
              className="hero-gauge-svg"
            >
              <circle
                cx={gaugeSize / 2}
                cy={gaugeSize / 2}
                r={radius}
                fill="none"
                stroke="#2a324b"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={gaugeSize / 2}
                cy={gaugeSize / 2}
                r={radius}
                fill="none"
                stroke="#10b981"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${gaugeSize / 2} ${gaugeSize / 2})`}
              />
            </svg>
            <div className="gauge-text-overlay">
              <span className="gauge-number">{scoreVal}%</span>
              <span className="gauge-sublabel">job match</span>
            </div>
          </div>
        </div>

        {/* 3 White Stats Cards */}
        <div className="hero-stats-card">
          <div className="hero-stat-col">
            <div className="stat-number color-emerald">
              {requiredCoverage != null ? `${requiredCoverage}%` : `${scoreVal}%`}
            </div>
            <div className="stat-label">Required skills matched</div>
          </div>

          <div className="hero-stat-col">
            <div className="stat-number color-dark">{totalSkillsFound}</div>
            <div className="stat-label">Skills found in resume</div>
          </div>

          <div className="hero-stat-col">
            <div className="stat-number color-dark">{textSimilarity}%</div>
            <div className="stat-label">Text similarity</div>
          </div>
        </div>
      </div>

      {/* THE SHORT VERSION Card */}
      <div className="short-version-banner">
        <div className="short-version-badge">
          <Sparkles size={14} />
          <span>THE SHORT VERSION</span>
        </div>
        <h3 className="short-version-heading">
          A strong mobile developer with promising backend experience.
        </h3>
        <p className="short-version-text">
          {overallFeedback ||
            'Your FastAPI, Python, PostgreSQL, and AI integration work supports this application. The main opportunity is to make those skills more prominent alongside your mobile experience.'}
        </p>
      </div>

      {/* WHAT'S WORKING / Strengths Section */}
      <div className="whats-working-section">
        <div className="whats-working-badge-row">
          <div className="whats-working-kicker">
            <CheckCircle2 size={15} />
            <span>WHAT&apos;S WORKING</span>
          </div>
          <div className="strengths-title-row">
            <h2>Your strengths</h2>
            <span className="strengths-count-badge">
              {String(strengths?.length || 3).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="strengths-items-list">
          {strengths && strengths.length > 0 ? (
            strengths.map((item, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const isExpanded = expandedStrengths[idx] ?? false;
              return (
                <div
                  key={idx}
                  className={`strength-line-card ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => onToggleStrength(idx)}
                >
                  <div className="strength-summary-row">
                    <span className="strength-item-num">{num}</span>
                    <span className="strength-item-title">{item.title}</span>
                    <div className="strength-check-circle">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="strength-expanded-content">
                      <p>{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <>
              <div className="strength-line-card">
                <div className="strength-summary-row">
                  <span className="strength-item-num">01</span>
                  <span className="strength-item-title">Python &amp; FastAPI experience</span>
                  <div className="strength-check-circle">
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>
              <div className="strength-line-card">
                <div className="strength-summary-row">
                  <span className="strength-item-num">02</span>
                  <span className="strength-item-title">AI / LLM Integration Proficiency</span>
                  <div className="strength-check-circle">
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>
              <div className="strength-line-card">
                <div className="strength-summary-row">
                  <span className="strength-item-num">03</span>
                  <span className="strength-item-title">SQL Database Expertise</span>
                  <div className="strength-check-circle">
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;

