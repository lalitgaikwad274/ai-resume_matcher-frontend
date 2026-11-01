import {
  Sparkles,
  Target,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';

import type {
  AIRecommendations,
} from '../types/recommendation';

import RecommendationCard from './RecommendationCard';
import BulletImprovementCard from './BulletImprovementCard';

interface Props {
  recommendations: AIRecommendations;
}
export default function AIRecommendations({
  recommendations,
}: Props) {
  return (
    <section className="ai-section">

      <div className="section-heading">
        <Sparkles />
        <div>
          <h2>AI Resume Recommendations</h2>
          <p>Suggestions to improve your job match.</p>
        </div>
      </div>

      <div className="recommendation-section">
        <h3>
          <Target size={19} />
          Your strengths
        </h3>

        {recommendations.strengths.map((item, index) => (
          <RecommendationCard
            key={index}
            title={item.title}
            description={item.explanation}
            type="success"
          />
        ))}
      </div>

      <div className="recommendation-section">
        <h3>
          <AlertTriangle size={19} />
          Areas to improve
        </h3>

        {recommendations.weaknesses.map((item, index) => (
          <RecommendationCard
            key={index}
            title={item.title}
            description={item.explanation}
            type="warning"
          />
        ))}
      </div>

      <div className="recommendation-section">
        <h3>
          <Sparkles size={19} />
          Improve your resume bullet points
        </h3>

        {recommendations.bullet_improvements.map(
          (item, index) => (
            <BulletImprovementCard
              key={index}
              original={item.original}
              improved={item.improved}
            />
          ),
        )}
      </div>

      <div className="recommendation-section">
        <h3>
          <BookOpen size={19} />
          Recommended skills to learn
        </h3>

        {recommendations.missing_skills.map(
          (item, index) => (
            <RecommendationCard
              key={index}
              title={item.skill}
              description={item.reason}
              type="info"
            />
          ),
        )}
      </div>

    </section>
  );
}