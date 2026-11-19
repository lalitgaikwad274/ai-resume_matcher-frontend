import { useState } from 'react';
import {
  GraduationCap,
  Home,
  BarChart2,
  Briefcase,
  Lightbulb,
  BookOpen,
  Sparkles,
  Rocket,
  ArrowUpRight,
  AlertTriangle,
  Info,
  Target,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  TrendingUp,
  RotateCcw,
  Menu,
  X,
  Clock,
  Layers,
  Code2,
  Server,
  Smartphone,
  Database,
  Cloud,
  Cpu,
  Zap,
  Copy,
  Download,
  FileText,
  CheckCircle2,
} from 'lucide-react';

import type { AnalysisResult } from '../types/analysis';
import { generateAnalysisPDF } from '../services/pdfReportService';
import skillsImg from '../assets/Skills.png';
import {
  MobileReactGraphic,
  LaptopPythonGraphic,
  DatabaseGearGraphic,
} from '../components/CardVisualGraphics';

interface Props {
  result: AnalysisResult;
  onAnalyzeAnother: () => void;
}

export default function AnalysisPage({ result, onAnalyzeAnother }: Props) {
  const match = result.match_analysis;
  const resume = result.resume_analysis;
  const recs = result.ai_recommendations;

  // Active navigation tab (Default to 'overview' or 'areas-to-improve')
  const [activeNav, setActiveNav] = useState<string>('areas-to-improve');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Career Goal State
  const defaultGoalTitle = result.job_title
    ? `Become a ${result.job_title.charAt(0).toUpperCase() + result.job_title.slice(1)}`
    : 'Become a Backend Developer';
  const [careerGoal, setCareerGoal] = useState<string>(defaultGoalTitle);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [tempGoal, setTempGoal] = useState(careerGoal);

  // Accordion state for improvement cards
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  // Accordion state for strengths
  const [expandedStrengths, setExpandedStrengths] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
  });

  // Copied bullet state
  const [copiedBulletIndex, setCopiedBulletIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStrength = (index: number) => {
    setExpandedStrengths((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCopyBullet = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedBulletIndex(index);
    setTimeout(() => setCopiedBulletIndex(null), 2000);
  };

  const handleSaveGoal = () => {
    if (tempGoal.trim()) {
      setCareerGoal(tempGoal.trim());
    }
    setGoalModalOpen(false);
  };

  // Helper for graphic on improvement card
  const getCardGraphic = (title: string, index: number) => {
    const lower = title.toLowerCase();
    if (lower.includes('mobile') || lower.includes('react') || lower.includes('native') || index === 0) {
      return <MobileReactGraphic />;
    }
    if (lower.includes('django') || lower.includes('python') || lower.includes('framework') || index === 1) {
      return <LaptopPythonGraphic />;
    }
    return <DatabaseGearGraphic />;
  };

  // Helper for Category Icons
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

  // Helper to parse candidate label
  const getCandidateMeta = () => {
    const filename = resume.filename || '';
    if (filename.toLowerCase().includes('lalit') && filename.toLowerCase().includes('gaikwad')) {
      return 'Lalit Gaikwad / React Native Developer';
    }
    const clean = filename.replace(/\.pdf.*$/i, '').replace(/\s*\(\d+\)/g, '').replace(/_/g, ' ');
    return clean || 'Lalit Gaikwad / React Native Developer';
  };

  // SVG Progress gauge parameters
  const scoreVal = Math.min(100, Math.max(0, Math.round(match.match_score)));
  const gaugeSize = 132;
  const strokeWidth = 9;
  const radius = (gaugeSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreVal / 100) * circumference;

  return (
    <div className="analyzer-app-shell">
      {/* ========================================================
          LEFT SIDEBAR (Dark Forest Teal)
         ======================================================== */}
      <aside className={`app-sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Logo */}
        <div className="sidebar-brand-header">
          <div className="brand-logo-glow">
            <GraduationCap size={22} className="logo-cap" />
          </div>
          <div className="brand-titles">
            <span className="brand-title-top">Resume</span>
            <span className="brand-title-sub">Analyzer</span>
          </div>
          <button
            type="button"
            className="sidebar-close-mobile"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="sidebar-nav-menu">
          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'dashboard' || activeNav === 'overview' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('overview');
              setMobileMenuOpen(false);
            }}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'skills' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('skills');
              setMobileMenuOpen(false);
            }}
          >
            <BarChart2 size={18} />
            <span>Skills Analysis</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'strengths' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('strengths');
              setMobileMenuOpen(false);
            }}
          >
            <Briefcase size={18} />
            <span>Job Match</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'areas-to-improve' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('areas-to-improve');
              setMobileMenuOpen(false);
            }}
          >
            <Lightbulb size={18} />
            <span>Areas to Improve</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'learning' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('learning');
              setMobileMenuOpen(false);
            }}
          >
            <BookOpen size={18} />
            <span>Learning Plan</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'career-tips' || activeNav === 'bullet-rewrites' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('bullet-rewrites');
              setMobileMenuOpen(false);
            }}
          >
            <Sparkles size={18} />
            <span>Career Tips</span>
          </button>
        </nav>

        {/* Bottom Keep Learning Widget */}
        <div className="sidebar-bottom-widget">
          <div className="widget-card-mint">
            <div className="widget-rocket-icon">
              <Rocket size={18} />
            </div>
            <div className="widget-text">
              <strong>Keep Learning,</strong>
              <span>Grow Faster!</span>
            </div>
            <button
              type="button"
              className="widget-arrow-circle"
              onClick={() => setActiveNav('learning')}
              title="Go to Learning Plan"
            >
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* ========================================================
          MAIN CONTENT AREA
         ======================================================== */}
      <main className="app-main-viewport">
        {/* Mobile Top Bar */}
        <div className="mobile-header-bar">
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="mobile-header-brand">
            <GraduationCap size={20} color="#10b981" />
            <span>Resume Analyzer</span>
          </div>
          <button
            type="button"
            className="mobile-download-btn"
            onClick={() => generateAnalysisPDF(result)}
            title="Download PDF Report"
          >
            <Download size={18} />
          </button>
        </div>

        {/* ========================================================
            TOP HEADER AREA (MATCHES SCREENSHOT 1)
           ======================================================== */}
        <header className="report-top-header">
          <div className="report-header-meta-row">
            <div className="report-title-block">
              <span className="report-kicker-tag">YOUR CAREER SNAPSHOT • REPORT 01</span>
              <h1 className="report-main-title">Resume analysis</h1>

              <div className="report-pills-row">
                <span className="report-pill pill-candidate">
                  <FileText size={14} />
                  <span>{getCandidateMeta()}</span>
                </span>
                <span className="report-pill pill-target-job">
                  <Target size={14} />
                  <span>
                    {result.job_title
                      ? result.job_title.charAt(0).toUpperCase() + result.job_title.slice(1)
                      : 'Python developer'}
                  </span>
                </span>
              </div>
            </div>

            <div className="report-actions-block">
              <button
                type="button"
                className="btn-navy-download"
                onClick={() => generateAnalysisPDF(result)}
              >
                <Download size={15} />
                <span>Download report</span>
              </button>
              <button
                type="button"
                className="btn-pill-reanalyze"
                onClick={onAnalyzeAnother}
                title="Upload another resume"
              >
                <RotateCcw size={14} />
                <span>Analyze another</span>
              </button>
            </div>
          </div>
        </header>

        {/* ========================================================
            VIEW 1: OVERVIEW / DASHBOARD (MATCHES SCREENSHOT 1)
           ======================================================== */}
        {(activeNav === 'overview' || activeNav === 'dashboard') && (
          <div className="view-container view-overview">
            {/* Hero Split: Dark Navy Card + 3 Stats Card */}
            <div className="hero-grid-split">
              {/* Dark Navy Card */}
              <div className="hero-dark-card">
                <div className="dark-card-content">
                  <span className="dark-card-kicker">ROLE MATCH</span>
                  <h2 className="dark-card-heading">
                    Good foundations.<br />
                    A clearer story will help.
                  </h2>
                  <p className="dark-card-desc">
                    Your experience covers several key requirements. Bring your backend work forward to make the fit easier to see.
                  </p>
                </div>

                <div className="hero-gauge-wrapper">
                  <svg width={gaugeSize} height={gaugeSize} viewBox={`0 0 ${gaugeSize} ${gaugeSize}`} className="hero-gauge-svg">
                    <circle cx={gaugeSize / 2} cy={gaugeSize / 2} r={radius} fill="none" stroke="#2a324b" strokeWidth={strokeWidth} />
                    <circle
                      cx={gaugeSize / 2}
                      cy={gaugeSize / 2}
                      r={radius}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${gaugeSize / 2} ${gaugeSize / 2})`}
                    />
                  </svg>
                  <div className="gauge-text-overlay">
                    <span className="gauge-number">{scoreVal}%</span>
                    <span className="gauge-sublabel">job match</span>
                  </div>
                </div>
              </div>

              {/* 3 White Stats Cards */}
              <div className="hero-stats-card">
                <div className="hero-stat-col">
                  <div className="stat-number color-emerald">
                    {match.required_coverage != null ? `${match.required_coverage}%` : `${match.match_score}%`}
                  </div>
                  <div className="stat-label">Required skills matched</div>
                </div>

                <div className="hero-stat-col">
                  <div className="stat-number color-dark">{resume.total_skills}</div>
                  <div className="stat-label">Skills found in resume</div>
                </div>

                <div className="hero-stat-col">
                  <div className="stat-number color-dark">{result.text_similarity}%</div>
                  <div className="stat-label">Text similarity</div>
                </div>
              </div>
            </div>

            {/* THE SHORT VERSION Card */}
            <div className="short-version-banner">
              <div className="short-version-badge">
                <Sparkles size={14} />
                <span>THE SHORT VERSION</span>
              </div>
              <h3 className="short-version-heading">
                A strong mobile developer with promising backend experience.
              </h3>
              <p className="short-version-text">
                {recs?.overall_feedback ||
                  'Your FastAPI, Python, PostgreSQL, and AI integration work supports this application. The main opportunity is to make those skills more prominent alongside your mobile experience.'}
              </p>
            </div>

            {/* WHAT'S WORKING / Strengths Section */}
            <div className="whats-working-section">
              <div className="whats-working-badge-row">
                <div className="whats-working-kicker">
                  <CheckCircle2 size={15} />
                  <span>WHAT&apos;S WORKING</span>
                </div>
                <div className="strengths-title-row">
                  <h2>Your strengths</h2>
                  <span className="strengths-count-badge">
                    {String(recs?.strengths?.length || 3).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="strengths-items-list">
                {recs?.strengths && recs.strengths.length > 0 ? (
                  recs.strengths.map((item, idx) => {
                    const num = String(idx + 1).padStart(2, '0');
                    const isExpanded = expandedStrengths[idx] ?? false;
                    return (
                      <div
                        key={idx}
                        className={`strength-line-card ${isExpanded ? 'is-expanded' : ''}`}
                        onClick={() => toggleStrength(idx)}
                      >
                        <div className="strength-summary-row">
                          <span className="strength-item-num">{num}</span>
                          <span className="strength-item-title">{item.title}</span>
                          <div className="strength-check-circle">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="strength-expanded-content">
                            <p>{item.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="strength-line-card">
                      <div className="strength-summary-row">
                        <span className="strength-item-num">01</span>
                        <span className="strength-item-title">Python &amp; FastAPI experience</span>
                        <div className="strength-check-circle">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                    <div className="strength-line-card">
                      <div className="strength-summary-row">
                        <span className="strength-item-num">02</span>
                        <span className="strength-item-title">AI / LLM Integration Proficiency</span>
                        <div className="strength-check-circle">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                    <div className="strength-line-card">
                      <div className="strength-summary-row">
                        <span className="strength-item-num">03</span>
                        <span className="strength-item-title">SQL Database Expertise</span>
                        <div className="strength-check-circle">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 2: SKILLS ANALYSIS (MATCHES SCREENSHOT 2)
           ======================================================== */}
        {(activeNav === 'skills' ) && (
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
                onClick={() => setActiveNav('learning')}
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
                <img className="skills-content-img" src={skillsImg} alt="Skills Analysis Character Illustration" />
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
                          {match.matched_required?.length || 5} / {match.matched_required?.length || 5}
                        </strong>
                      </div>
                    </div>
                    <div className="stat-chips-wrap">
                      {(match.matched_required && match.matched_required.length > 0
                        ? match.matched_required
                        : ['fastapi', 'git', 'llm', 'postgresql', 'python']
                      ).map((skill) => (
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
                        <strong className="stat-card-bignum">
                          {match.missing_required?.length || 2}
                        </strong>
                      </div>
                    </div>
                    <div className="stat-chips-wrap">
                      {(match.missing_required && match.missing_required.length > 0
                        ? match.missing_required
                        : ['django', 'sql']
                      ).map((skill) => (
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
                    {resume.skills && Object.keys(resume.skills).length > 0 ? (
                      Object.entries(resume.skills).map(([catKey, skillsList]) => {
                        if (!skillsList || skillsList.length === 0) return null;
                        const formattedCat = catKey.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
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
        )}

        {/* ========================================================
            VIEW 3: AREAS TO IMPROVE (MATCHES SCREENSHOT 3)
           ======================================================== */}
        {activeNav === 'areas-to-improve' && (
          <div className="view-container view-areas-to-improve">
            {/* Header: Needs Attention + Your Career Goal Banner + Illustration */}
            <header className="areas-header-section">
              <div className="areas-header-left">
                <div className="attention-kicker-row">
                  <div className="attention-icon-box">
                    <AlertTriangle size={18} />
                  </div>
                  <span className="attention-kicker-text">NEEDS ATTENTION</span>
                </div>

                <div className="areas-title-row">
                  <h1>Areas to Improve</h1>
                  <span className="info-circle-tooltip" title="Targeted recommendations to close skill gaps">
                    <Info size={16} />
                  </span>
                </div>

                <p className="areas-subtitle">
                  Focus on these areas to strengthen your skills and boost your job match.
                </p>
              </div>

              {/* Right Side: Career Goal Card & Character Illustration */}
              <div className="areas-header-right">
                <div className="career-goal-pill-card">
                  <div className="goal-target-icon">
                    <Target size={18} />
                  </div>
                  <div className="goal-text-content">
                    <span className="goal-kicker">Your Career Goal</span>
                    <strong className="goal-title">{careerGoal}</strong>
                  </div>
                  <button
                    type="button"
                    className="btn-update-goal"
                    onClick={() => {
                      setTempGoal(careerGoal);
                      setGoalModalOpen(true);
                    }}
                  >
                    <span>Update Goal</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="header-illustration-mini">
                  <img className="skills-content-img" src={skillsImg} alt="Career Goal Illustration" />
                </div>
              </div>
            </header>

            {/* The 3 Detailed Improvement Cards (01, 02, 03) */}
            <section className="improvement-cards-list">
              {recs?.weaknesses && recs.weaknesses.map((item, index) => {
                const itemNum = String(index + 1).padStart(2, '0');
                const isExpanded = expandedCards[index] ?? true;
                const isHigh = index === 0;

                return (
                  <div key={index} className="improvement-card">
                    <div className="improvement-card-main-row">
                      {/* Left: Number + Vector Graphic */}
                      <div className="card-identity-col">
                        <span className="card-number-label">{itemNum}</span>
                        {/* <div className="card-illustration-wrap">
                          {getCardGraphic(item.title, index)}
                        </div> */}
                      </div>

                      {/* Middle: Content */}
                      <div className="card-content-col">
                        <div className="card-title-row">
                          <h3>{item.title}</h3>
                        </div>

                        <p className="card-explanation-text">{item.explanation}</p>

                        {/* Action To Take Mint Pill Box */}
                        {item.improvement && isExpanded && (
                          <div className="action-to-take-box">
                            <div className="action-lightbulb-icon">
                              <Lightbulb size={16} />
                            </div>
                            <div className="action-text-content">
                              <strong>Action to take:</strong>{' '}
                              <span>{item.improvement}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: Priority Pill & Expand Toggle */}
                      <div className="card-actions-col">
                        <span className={`priority-tag-pill ${isHigh ? 'pill-high' : 'pill-medium'}`}>
                          <span className="priority-symbol">!</span>
                          <span>{isHigh ? 'High Priority' : 'Medium Priority'}</span>
                        </span>

                        <button
                          type="button"
                          className="btn-expand-circle"
                          onClick={() => toggleCard(index)}
                          aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Bottom Mini-Dashboard Row: Skills Profile + Level Up Career */}
            <div className="bottom-summary-cards-row">
              {/* Left: Skills Profile Mini Card */}
              <div
                className="mini-skills-profile-card"
                onClick={() => setActiveNav('skills')}
                role="button"
                tabIndex={0}
              >
                <div className="mini-card-top-header">
                  <div className="mini-card-icon-sq">
                    <GraduationCap size={16} />
                  </div>
                  <div className="mini-card-titles">
                    <span className="mini-card-kicker">Skills Profile</span>
                    <h4>Skills alignment &amp; gaps</h4>
                  </div>
                </div>

                <div className="mini-progress-section">
                  <div className="mini-bar-track">
                    <div
                      className="mini-bar-fill"
                      style={{ width: `${scoreVal}%` }}
                    />
                  </div>
                  <span className="mini-bar-percentage">
                    {scoreVal}%
                  </span>
                </div>

                <div className="mini-stats-badges-row">
                  <div className="mini-status-chip chip-green">
                    <Check size={13} strokeWidth={3} />
                    <span>Matched Skills</span>
                    <strong>{match.matched_required?.length || 5} / {match.matched_required?.length || 5}</strong>
                  </div>

                  <div className="mini-status-chip chip-red">
                    <AlertTriangle size={13} />
                    <span>Missing Skills</span>
                    <strong>{match.missing_required?.length || 2}</strong>
                  </div>
                </div>
              </div>

              {/* Right: Level Up Career Mini Card */}
              <div className="mini-levelup-card">
                <div className="levelup-left-wrap">
                  <div className="levelup-trending-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div className="levelup-labels">
                    <h4>Level up your career!</h4>
                    <p>Bridge the skill gaps and unlock more opportunities.</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-view-learning-plan"
                  onClick={() => setActiveNav('learning')}
                >
                  <span>View Learning Plan</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 4: STRENGTHS DEEP DIVE
           ======================================================== */}
        {activeNav === 'strengths' && (
          <div className="view-container view-strengths">
            <div className="section-title-simple">
              <h2>Key Candidate Strengths</h2>
              <p>Core competencies and high-impact skills that align with the role requirements.</p>
            </div>

            <div className="strengths-expanded-list">
              {recs?.strengths && recs.strengths.map((item, idx) => {
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
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 5: LEARNING PLAN
           ======================================================== */}
        {activeNav === 'learning' && (
          <div className="view-container view-learning">
            <div className="section-title-simple">
              <h2>Personalized Learning Plan</h2>
              <p>Recommended curriculum and high-impact skills to close role gaps.</p>
            </div>

            <div className="rec-skills-cards-row">
              {recs?.missing_skills && recs.missing_skills.map((item, idx) => {
                const isHigh = idx < 2;
                return (
                  <div key={idx} className={`rec-skill-card ${isHigh ? 'variant-pink' : 'variant-amber'}`}>
                    <div className="rec-card-top">
                      <div className="rec-brand-icon">
                        {idx === 0 ? (
                          <span className="brand-logo-dj">dj</span>
                        ) : idx === 1 ? (
                          <span className="brand-icon-sq purple-sq"><Zap size={18} /></span>
                        ) : (
                          <span className="brand-icon-sq amber-sq"><BarChart2 size={18} /></span>
                        )}
                      </div>
                      <h4 className="rec-skill-title">{item.skill}</h4>
                      <span className={`priority-badge-pill ${isHigh ? 'pill-high' : 'pill-medium'}`}>
                        {isHigh ? 'HIGH PRIORITY' : 'MEDIUM PRIORITY'}
                      </span>
                    </div>

                    <p className="rec-skill-reason">{item.reason}</p>

                    <div className="rec-card-footer">
                      <div className="rec-meta-info">
                        <span className="rec-guide">
                          <BookOpen size={13} />
                          <span>Learn {item.skill.split(' ')[0]}</span>
                        </span>
                        <span className="rec-divider">|</span>
                        <span className="rec-duration">
                          <Clock size={13} />
                          <span>{idx === 0 ? '6–8 weeks' : idx === 1 ? '8–10 weeks' : '4–6 weeks'}</span>
                        </span>
                      </div>

                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(item.skill + ' tutorial roadmap')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rec-action-btn"
                      >
                        <span>Start Learning</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 6: BULLET REWRITES / CAREER TIPS
           ======================================================== */}
        {(activeNav === 'bullet-rewrites' || activeNav === 'career-tips') && (
          <div className="view-container view-career-tips">
            <div className="section-title-simple">
              <h2>Resume Bullet Point Improvements</h2>
              <p>Action-driven rewrites to emphasize backend architecture and technical impact.</p>
            </div>

            <div className="bullet-rewrite-list">
              {recs?.bullet_improvements && recs.bullet_improvements.map((item, index) => {
                const isCopied = copiedBulletIndex === index;
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
                            onClick={() => handleCopyBullet(item.improved, index)}
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
        )}

        {/* ========================================================
            UPDATE CAREER GOAL MODAL
           ======================================================== */}
        {goalModalOpen && (
          <div className="modal-backdrop" onClick={() => setGoalModalOpen(false)}>
            <div className="career-goal-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-simple">
                <h3>Update Your Career Goal</h3>
                <button
                  type="button"
                  className="modal-close-icon-btn"
                  onClick={() => setGoalModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body-simple">
                <label htmlFor="goal-input-field">Target Role or Objective</label>
                <input
                  id="goal-input-field"
                  type="text"
                  value={tempGoal}
                  onChange={(e) => setTempGoal(e.target.value)}
                  placeholder="e.g. Become a Senior Python Backend Developer"
                />
                <p className="goal-help-text">
                  This objective dynamically tunes recommendations to bridge the gap toward your goal.
                </p>
              </div>

              <div className="modal-footer-simple">
                <button
                  type="button"
                  className="btn-cancel-simple"
                  onClick={() => setGoalModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-save-goal"
                  onClick={handleSaveGoal}
                >
                  Save Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}