import React from 'react';
import { Check, Copy } from 'lucide-react';

interface BulletRewritesSectionProps {
  bulletImprovements?: { original: string; improved: string; explanation?: string }[];
  copiedIndex: number | null;
  onCopyBullet: (text: string, index: number) => void;
}

export const BulletRewritesSection: React.FC<BulletRewritesSectionProps> = ({
  bulletImprovements,
  copiedIndex,
  onCopyBullet,
}) => {
  return (
    <div className="view-container view-career-tips">
      <div className="section-title-simple">
        <h2>Resume Bullet Point Improvements</h2>
        <p>Action-driven rewrites to emphasize backend architecture and technical impact.</p>
      </div>

      <div className="bullet-rewrite-list">
        {bulletImprovements &&
          bulletImprovements.map((item, index) => {
            const isCopied = copiedIndex === index;
            return (
              <div key={index} className="bullet-rewrite-card">
                <div className="bullet-rewrite-grid">
                  <div className="bullet-box original-box">
                    <span className="pill-badge pill-red">ORIGINAL</span>
                    <p>{item.original}</p>
                  </div>

                  <div className="bullet-box improved-box">
                    <div className="improved-header-row">
                      <span className="pill-badge pill-green">AI IMPROVED</span>
                      <button
                        type="button"
                        className="btn-copy-chip"
                        onClick={() => onCopyBullet(item.improved, index)}
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p>{item.improved}</p>
                  </div>
                </div>

                {item.explanation && (
                  <div className="bullet-why-note">
                    <strong>Why this works: </strong>
                    <span>{item.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BulletRewritesSection;

