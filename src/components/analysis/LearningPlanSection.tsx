import React from 'react';
import { BookOpen, Clock, ArrowRight, Zap, BarChart2 } from 'lucide-react';

interface LearningPlanSectionProps {
  missingSkills?: { skill: string; reason: string; priority?: string }[];
}

export const LearningPlanSection: React.FC<LearningPlanSectionProps> = ({
  missingSkills,
}) => {
  return (
    <div className="view-container view-learning">
      <div className="section-title-simple">
        <h2>Personalized Learning Plan</h2>
        <p>Recommended curriculum and high-impact skills to close role gaps.</p>
      </div>

      <div className="rec-skills-cards-row">
        {missingSkills &&
          missingSkills.map((item, idx) => {
            const isHigh = idx < 2;
            return (
              <div
                key={idx}
                className={`rec-skill-card ${isHigh ? 'variant-pink' : 'variant-amber'}`}
              >
                <div className="rec-card-top">
                  <div className="rec-brand-icon">
                    {idx === 0 ? (
                      <span className="brand-logo-dj">dj</span>
                    ) : idx === 1 ? (
                      <span className="brand-icon-sq purple-sq">
                        <Zap size={18} />
                      </span>
                    ) : (
                      <span className="brand-icon-sq amber-sq">
                        <BarChart2 size={18} />
                      </span>
                    )}
                  </div>
                  <h4 className="rec-skill-title">{item.skill}</h4>
                  <span
                    className={`priority-badge-pill ${isHigh ? 'pill-high' : 'pill-medium'}`}
                  >
                    {isHigh ? 'HIGH PRIORITY' : 'MEDIUM PRIORITY'}
                  </span>
                </div>

                <p className="rec-skill-reason">{item.reason}</p>

                <div className="rec-card-footer">
                  <div className="rec-meta-info">
                    <span className="rec-guide">
                      <BookOpen size={13} />
                      <span>Learn {item.skill.split(' ')[0]}</span>
                    </span>
                    <span className="rec-divider">|</span>
                    <span className="rec-duration">
                      <Clock size={13} />
                      <span>
                        {idx === 0
                          ? '6–8 weeks'
                          : idx === 1
                            ? '8–10 weeks'
                            : '4–6 weeks'}
                      </span>
                    </span>
                  </div>

                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      item.skill + ' tutorial roadmap'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rec-action-btn"
                  >
                    <span>Start Learning</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LearningPlanSection;

