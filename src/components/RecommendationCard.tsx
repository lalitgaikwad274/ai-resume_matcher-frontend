import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
}

export default function RecommendationCard({
  title,
  description,
  type,
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

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}