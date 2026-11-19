import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
  actionable?: string;
  badge?: string;
}

export default function RecommendationCard({
  title,
  description,
  type,
  actionable,
  badge,
}: Props) {
  const icons = {
    success: <CheckCircle2 />,
    warning: <AlertCircle />,
    info: <Lightbulb />,
  };

  return (
    <div className={`recommendation-card ${type}`}>
      <div className="recommendation-icon">
        {icons[type]}
      </div>

      <div className="recommendation-body">
        <div className="recommendation-header-row">
          <h3>{title}</h3>
          {badge && (
            <span className={`priority-badge priority-${badge.toLowerCase()}`}>
              {badge} Priority
            </span>
          )}
        </div>
        <p>{description}</p>
        {actionable && (
          <div className="recommendation-actionable">
            <strong>How to improve:</strong> {actionable}
          </div>
        )}
      </div>
    </div>
  );
}
