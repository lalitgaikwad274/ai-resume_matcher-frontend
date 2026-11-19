import React from 'react';
import {
  GraduationCap,
  Target,
  ArrowRight,
  Check,
  Layers,
  Code2,
  Server,
  Smartphone,
  Database,
  Cloud,
  Cpu,
  Zap,
  BarChart2,
  BookOpen,
  Clock,
} from 'lucide-react';
import skillsImg from '../../assets/Skills.png';

interface SkillsAlignmentSectionProps {
  matchedSkills?: string[];
  missingSkills?: string[];
  skillsByCategory?: Record<string, string[]>;
  onNavigateToLearning: () => void;
}

export const SkillsAlignmentSection: React.FC<SkillsAlignmentSectionProps> = ({
  matchedSkills,
  missingSkills,
  skillsByCategory,
  onNavigateToLearning,
}) => {
  const getCategoryIcon = (categoryKey: string) => {
    const key = categoryKey.toLowerCase();
    if (key.includes('programming') || key.includes('language')) {
      return <Code2 size={15} />;
    }
    if (key.includes('backend')) {
      return <Server size={15} />;
    }
    if (key.includes('frontend') || key.includes('mobile')) {
      return <Smartphone size={15} />;
    }
    if (key.includes('database')) {
      return <Database size={15} />;
    }
    if (key.includes('cloud') || key.includes('devops')) {
      return <Cloud size={15} />;
    }
    if (key.includes('ai') || key.includes('ml')) {
      return <Cpu size={15} />;
    }
    return <Code2 size={15} />;
  };

  const matchedList =
    matchedSkills && matchedSkills.length > 0
      ? matchedSkills
      : ['fastapi', 'git', 'llm', 'postgresql', 'python'];

  const missingList =
    missingSkills && missingSkills.length > 0
      ? missingSkills
      : ['django', 'sql'];

  return (
    <div className="view-container view-skills-alignment">
      {/* Header: Skills Profile + Level up your career */}
      <div className="skills-page-header-row">
        <div className="skills-header-left">
          <div className="skills-kicker-row">
            <div className="skills-cap-icon-box">
              <GraduationCap size={16} />
            </div>
            <span className="skills-kicker-text">SKILLS PROFILE</span>
          </div>
          <h1 className="skills-main-heading">Skills alignment &amp; gaps</h1>
          <p className="skills-sub-text">
            Discover the skills you have, what&apos;s missing, and get personalized learning recommendations.
          </p>
        </div>

        <div
          className="skills-levelup-banner"
          onClick={onNavigateToLearning}
          role="button"
          tabIndex={0}
        >
          <div className="levelup-target-circle">
            <Target size={18} />
          </div>
          <div className="levelup-texts">
            <strong>Level up your career!</strong>
            <span>Bridge the skill gaps and unlock more opportunities.</span>
          </div>
          <div className="levelup-arrow-circle">
            <ArrowRight size={15} />
          </div>
        </div>
      </div>

      {/* Upper Section: Illustration on Left + Matched/Missing & Categories on Right */}
      <div className="skills-breakdown-section">
        {/* Left Column: Character Illustration */}
        <div className="skills-illustration-col">
          <img
            className="skills-content-img"
            src={skillsImg}
            alt="Skills Analysis Character Illustration"
          />
        </div>

        {/* Right Column: Top Stats + Category Grid */}
        <div className="skills-content-col">
          {/* Matched Required Skills & Missing Required Skills */}
          <div className="matched-missing-stat-grid">
            {/* Matched Card (Mint Green) */}
            <div className="skill-stat-card card-matched">
              <div className="stat-card-header">
                <div className="stat-circle-icon icon-green">
                  <Check size={16} strokeWidth={3} />
                </div>
                <div className="stat-card-titles">
                  <span className="stat-card-label">Matched Required Skills</span>
                  <strong className="stat-card-bignum">
                    {matchedList.length} / {matchedList.length}
                  </strong>
                </div>
              </div>
              <div className="stat-chips-wrap">
                {matchedList.map((skill) => (
                  <span key={skill} className="skill-pill-tag tag-matched">
                    <Check size={12} strokeWidth={3} />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Card (Soft Pink) */}
            <div className="skill-stat-card card-missing">
              <div className="stat-card-header">
                <div className="stat-circle-icon icon-pink">
                  <span>!</span>
                </div>
                <div className="stat-card-titles">
                  <span className="stat-card-label">Missing Required Skills</span>
                  <strong className="stat-card-bignum">{missingList.length}</strong>
                </div>
              </div>
              <div className="stat-chips-wrap">
                {missingList.map((skill) => (
                  <span key={skill} className="skill-pill-tag tag-missing">
                    <span className="tag-dot">•</span>
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detected Skills by Category */}
          <div className="detected-categories-box">
            <div className="detected-box-title">
              <Layers size={17} />
              <h3>Detected Skills by Category</h3>
            </div>

            <div className="categories-badge-grid">
              {skillsByCategory && Object.keys(skillsByCategory).length > 0 ? (
                Object.entries(skillsByCategory).map(([catKey, skillsList]) => {
                  if (!skillsList || skillsList.length === 0) return null;
                  const formattedCat = catKey
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <div key={catKey} className="category-micro-card">
                      <div className="cat-micro-header">
                        <span className="cat-micro-icon">
                          {getCategoryIcon(catKey)}
                        </span>
                        <span className="cat-micro-title">{formattedCat}</span>
                      </div>
                      <div className="cat-micro-chips">
                        {skillsList.map((skill) => (
                          <span key={skill} className="cat-micro-pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="category-micro-card">
                    <div className="cat-micro-header">
                      <span className="cat-micro-icon"><Code2 size={15} /></span>
                      <span className="cat-micro-title">Programming Languages</span>
                    </div>
                    <div className="cat-micro-chips">
                      <span className="cat-micro-pill">python</span>
                      <span className="cat-micro-pill">typescript</span>
                    </div>
                  </div>
                  <div className="category-micro-card">
                    <div className="cat-micro-header">
                      <span className="cat-micro-icon"><Server size={15} /></span>
                      <span className="cat-micro-title">Backend</span>
                    </div>
                    <div className="cat-micro-chips">
                      <span className="cat-micro-pill">fastapi</span>
                      <span className="cat-micro-pill">node.js</span>
                      <span className="cat-micro-pill">express</span>
                      <span className="cat-micro-pill">rest api</span>
                    </div>
                  </div>
                  <div className="category-micro-card">
                    <div className="cat-micro-header">
                      <span className="cat-micro-icon"><Smartphone size={15} /></span>
                      <span className="cat-micro-title">Frontend Mobile</span>
                    </div>
                    <div className="cat-micro-chips">
                      <span className="cat-micro-pill">react</span>
                      <span className="cat-micro-pill">react native</span>
                      <span className="cat-micro-pill">redux</span>
                    </div>
                  </div>
                  <div className="category-micro-card">
                    <div className="cat-micro-header">
                      <span className="cat-micro-icon"><Database size={15} /></span>
                      <span className="cat-micro-title">Database</span>
                    </div>
                    <div className="cat-micro-chips">
                      <span className="cat-micro-pill">postgresql</span>
                      <span className="cat-micro-pill">mongodb</span>
                    </div>
                  </div>
                  <div className="category-micro-card">
                    <div className="cat-micro-header">
                      <span className="cat-micro-icon"><Cloud size={15} /></span>
                      <span className="cat-micro-title">Cloud DevOps</span>
                    </div>
                    <div className="cat-micro-chips">
                      <span className="cat-micro-pill">docker</span>
                      <span className="cat-micro-pill">git</span>
                      <span className="cat-micro-pill">github</span>
                      <span className="cat-micro-pill">ci/cd</span>
                    </div>
                  </div>
                  <div className="category-micro-card">
                    <div className="cat-micro-header">
                      <span className="cat-micro-icon"><Cpu size={15} /></span>
                      <span className="cat-micro-title">AI / ML</span>
                    </div>
                    <div className="cat-micro-chips">
                      <span className="cat-micro-pill">openai</span>
                      <span className="cat-micro-pill">llm</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Skills to Learn Section */}
      <div className="recommended-skills-section">
        <div className="rec-skills-heading-row">
          <span className="star-icon">⭐</span>
          <h2>Recommended Skills to Learn</h2>
        </div>

        <div className="rec-skills-cards-row">
          {/* Card 1: Django */}
          <div className="rec-skill-card variant-pink">
            <div className="rec-card-top">
              <div className="rec-brand-icon">
                <span className="brand-logo-dj">dj</span>
              </div>
              <h4 className="rec-skill-title">Django</h4>
              <span className="priority-badge-pill pill-high">HIGH PRIORITY</span>
            </div>
            <p className="rec-skill-reason">
              The job description explicitly lists Django as an added advantage, but it is not present in the candidate&apos;s skills or experience.
            </p>
            <div className="rec-card-footer">
              <div className="rec-meta-info">
                <span className="rec-guide">
                  <BookOpen size={13} />
                  <span>Learn Django</span>
                </span>
                <span className="rec-divider">|</span>
                <span className="rec-duration">
                  <Clock size={13} />
                  <span>6–8 weeks</span>
                </span>
              </div>
              <a
                href="https://docs.djangoproject.com/en/stable/intro/tutorial01/"
                target="_blank"
                rel="noopener noreferrer"
                className="rec-action-btn"
              >
                <span>Start Learning</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 2: Scalable Backend */}
          <div className="rec-skill-card variant-purple">
            <div className="rec-card-top">
              <div className="rec-brand-icon">
                <span className="brand-icon-sq purple-sq"><Zap size={18} /></span>
              </div>
              <h4 className="rec-skill-title">
                Developing, Testing, and Maintaining Scalable Backend Applications
              </h4>
              <span className="priority-badge-pill pill-high">HIGH PRIORITY</span>
            </div>
            <p className="rec-skill-reason">
              This is a core requirement in the job description, and while &apos;scalable backend architecture&apos; is mentioned in a project, the resume&apos;s primary focus is on mobile development, with less emphasis on backend systems.
            </p>
            <div className="rec-card-footer">
              <div className="rec-meta-info">
                <span className="rec-guide">
                  <BookOpen size={13} />
                  <span>Learn Backend Skills</span>
                </span>
                <span className="rec-divider">|</span>
                <span className="rec-duration">
                  <Clock size={13} />
                  <span>8–10 weeks</span>
                </span>
              </div>
              <a
                href="https://roadmap.sh/backend"
                target="_blank"
                rel="noopener noreferrer"
                className="rec-action-btn"
              >
                <span>Start Learning</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 3: Strong Problem-Solving */}
          <div className="rec-skill-card variant-amber">
            <div className="rec-card-top">
              <div className="rec-brand-icon">
                <span className="brand-icon-sq amber-sq"><BarChart2 size={18} /></span>
              </div>
              <h4 className="rec-skill-title">
                Strong Problem-Solving Skills (Backend-specific)
              </h4>
              <span className="priority-badge-pill pill-medium">MEDIUM PRIORITY</span>
            </div>
            <p className="rec-skill-reason">
              The job description explicitly asks for &apos;strong problem-solving skills&apos;. While mobile app debugging and DSA problems, it&apos;s not explicitly demonstrated with backend-specific examples.
            </p>
            <div className="rec-card-footer">
              <div className="rec-meta-info">
                <span className="rec-guide">
                  <BookOpen size={13} />
                  <span>Practice DSA</span>
                </span>
                <span className="rec-divider">|</span>
                <span className="rec-duration">
                  <Clock size={13} />
                  <span>4–6 weeks</span>
                </span>
              </div>
              <a
                href="https://leetcode.com/problemset/all/"
                target="_blank"
                rel="noopener noreferrer"
                className="rec-action-btn"
              >
                <span>Start Practicing</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAlignmentSection;

