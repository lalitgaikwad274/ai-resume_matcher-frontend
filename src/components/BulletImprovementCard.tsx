import { Copy, ArrowRight } from 'lucide-react';

interface Props {
  original: string;
  improved: string;
}

export default function BulletImprovementCard({
  original,
  improved,
}: Props) {
  const copyImproved = async () => {
    await navigator.clipboard.writeText(improved);
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

      <button
        className="copy-button"
        onClick={copyImproved}
      >
        <Copy size={16} />
        Copy suggestion
      </button>
    </div>
  );
}