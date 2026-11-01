import ScoreCard from '../components/ScoreCard';
import SkillsCard from '../components/SkillsCard';
import type { AnalysisResult } from '../types/analysis';
import AIRecommendations from '../components/AIRecommendations';
import DownloadReportButton from '../components/DownloadReportButton';

interface Props {
  result: AnalysisResult;
  onAnalyzeAnother: () => void;
}

export default function AnalysisPage({ result, onAnalyzeAnother }: Props) {
  const match = result.match_analysis;
  const resume = result.resume_analysis;

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Resume Analysis</h1>
          <p>{resume.filename}</p>
        </div>
        <div className="section-headings">
          <DownloadReportButton result={result} />
          <button
            className="secondary-button"
            onClick={onAnalyzeAnother}
          >
            Analyze Another Resume
          </button>
        </div>
      </header>
      {result.ai_recommendations && (
        <AIRecommendations
          recommendations={result.ai_recommendations}
        />
      )}
      <section className="overview-grid">
        <ScoreCard
          score={match.match_score}
          title="Job Match Score"
        />

        <div className="stat-card">
          <h2>{resume.total_skills}</h2>
          <p>Total Skills Found</p>
        </div>

        <div className="stat-card">
          <h2>{result.text_similarity}%</h2>
          <p>Text Similarity</p>
        </div>
      </section>

      <section className="analysis-section">
        <h2>Required Skills</h2>

        <div className="skills-grid">
          <SkillsCard
            title="Matched Skills"
            skills={match.matched_required}
            type="matched"
          />

          <SkillsCard
            title="Missing Skills"
            skills={match.missing_required}
            type="missing"
          />
        </div>
      </section>

      <section className="analysis-section">
        <h2>Preferred Skills</h2>

        <div className="skills-grid">
          <SkillsCard
            title="Matched Skills"
            skills={match.matched_preferred}
            type="matched"
          />

          <SkillsCard
            title="Missing Skills"
            skills={match.missing_preferred}
            type="missing"
          />
        </div>
      </section>

      <section className="analysis-section">
        <h2>Resume Information</h2>

        <div className="stat-card">
          <h3>Experience</h3>
          {resume.experience_mentions.map((item, index) => (
            <p key={index}>{item}</p>
          ))}

          <h3>Education</h3>
          {resume.education.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </section>
    </main>
  );
}