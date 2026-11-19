import { useState } from 'react';
import { Copy, ArrowRight, Check } from 'lucide-react';

interface Props {
  original: string;
  improved: string;
  explanation?: string;
}

export default function BulletImprovementCard({
  original,
  improved,
  explanation,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copyImproved = async () => {
    await navigator.clipboard.writeText(improved);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bullet-card">
      <div className="bullet-content">
        <div>
          <span className="bullet-label original-label">
            Original
          </span>
          <p>{original}</p>
        </div>

        <div className="bullet-arrow">
          <ArrowRight />
        </div>

        <div>
          <span className="bullet-label improved-label">
            AI Improved
          </span>
          <p>{improved}</p>
        </div>
      </div>

      {explanation && (
        <div className="bullet-explanation">
          <strong>Why this helps:</strong> {explanation}
        </div>
      )}

      <button
        className="copy-button"
        onClick={copyImproved}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy suggestion'}
      </button>
    </div>
  );
}
