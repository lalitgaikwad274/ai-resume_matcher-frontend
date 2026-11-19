import {
  Sparkles,
  Target,
  AlertTriangle,
  BookOpen,
  Tag,
  Award,
} from 'lucide-react';

import type { AIRecommendations as AIRecommendationsType } from '../types/recommendation';
import RecommendationCard from './RecommendationCard';
import BulletImprovementCard from './BulletImprovementCard';

interface Props {
  recommendations: AIRecommendationsType;
}

export default function AIRecommendations({ recommendations }: Props) {
  return (
    <section className="ai-section">
      <div className="section-heading">
        <Sparkles size={24} />
        <div>
          <h2>AI Resume Recommendations</h2>
          <p>Personalized suggestions and optimizations to maximize your job match.</p>
        </div>
      </div>

      {recommendations.overall_feedback && (
        <div className="overall-feedback-box">
          <div className="overall-feedback-header">
            <Award size={18} />
            <span>Overall Evaluation & Executive Summary</span>
          </div>
          <p>{recommendations.overall_feedback}</p>
        </div>
      )}

      {recommendations.strengths && recommendations.strengths.length > 0 && (
        <div className="recommendation-section">
          <h3>
            <Target size={19} />
            Your Strengths ({recommendations.strengths.length})
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
      )}

      {recommendations.weaknesses && recommendations.weaknesses.length > 0 && (
        <div className="recommendation-section">
          <h3>
            <AlertTriangle size={19} />
            Areas to Improve ({recommendations.weaknesses.length})
          </h3>

          {recommendations.weaknesses.map((item, index) => (
            <RecommendationCard
              key={index}
              title={item.title}
              description={item.explanation}
              actionable={item.improvement}
              type="warning"
            />
          ))}
        </div>
      )}

      {recommendations.bullet_improvements &&
        recommendations.bullet_improvements.length > 0 && (
          <div className="recommendation-section">
            <h3>
              <Sparkles size={19} />
              Improve Your Resume Bullet Points (
              {recommendations.bullet_improvements.length})
            </h3>

            {recommendations.bullet_improvements.map((item, index) => (
              <BulletImprovementCard
                key={index}
                original={item.original}
                improved={item.improved}
                explanation={item.explanation}
              />
            ))}
          </div>
        )}

      {recommendations.missing_skills &&
        recommendations.missing_skills.length > 0 && (
          <div className="recommendation-section">
            <h3>
              <BookOpen size={19} />
              Recommended Skills to Learn ({recommendations.missing_skills.length})
            </h3>

            {recommendations.missing_skills.map((item, index) => (
              <RecommendationCard
                key={index}
                title={item.skill}
                description={item.reason}
                badge={item.priority}
                type="info"
              />
            ))}
          </div>
        )}

      {recommendations.ats_recommendations &&
        recommendations.ats_recommendations.length > 0 && (
          <div className="recommendation-section">
            <h3>
              <Tag size={19} />
              Recommended ATS Keywords ({recommendations.ats_recommendations.length})
            </h3>
            <p className="section-description">
              Include these high-impact keywords across your resume summary, project descriptions, and experience.
            </p>

            <div className="ats-keywords-grid">
              {recommendations.ats_recommendations.map((keyword, index) => (
                <span key={index} className="ats-keyword-chip">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
    </section>
  );
}
