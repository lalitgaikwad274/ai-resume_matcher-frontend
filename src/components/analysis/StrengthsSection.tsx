import React from 'react';
import { Check } from 'lucide-react';

interface StrengthsSectionProps {
  strengths?: { title: string; explanation: string }[];
}

export const StrengthsSection: React.FC<StrengthsSectionProps> = ({ strengths }) => {
  return (
    <div className="view-container view-strengths">
      <div className="section-title-simple">
        <h2>Key Candidate Strengths</h2>
        <p>Core competencies and high-impact skills that align with the role requirements.</p>
      </div>

      <div className="strengths-expanded-list">
        {strengths && strengths.length > 0 ? (
          strengths.map((item, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <div key={idx} className="strength-card-expanded">
                <div className="strength-card-expanded-header">
                  <div className="strength-badge-num">{num}</div>
                  <h3>{item.title}</h3>
                  <div className="strength-confirmed-pill">
                    <Check size={13} strokeWidth={3} />
                    <span>Verified in Resume</span>
                  </div>
                </div>
                <p className="strength-card-expanded-desc">{item.explanation}</p>
              </div>
            );
          })
        ) : (
          <p>No verified strengths recorded.</p>
        )}
      </div>
    </div>
  );
};

export default StrengthsSection;

