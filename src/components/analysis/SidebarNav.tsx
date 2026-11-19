import React from 'react';
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
  X,
} from 'lucide-react';

interface SidebarNavProps {
  activeNav: string;
  onSelectNav: (tab: string) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeNav,
  onSelectNav,
  mobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const handleNavClick = (tab: string) => {
    onSelectNav(tab);
    onCloseMobileMenu();
  };

  return (
    <>
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
            onClick={onCloseMobileMenu}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="sidebar-nav-menu">
          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'dashboard' || activeNav === 'overview' ? 'active' : ''}`}
            onClick={() => handleNavClick('overview')}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'skills' ? 'active' : ''}`}
            onClick={() => handleNavClick('skills')}
          >
            <BarChart2 size={18} />
            <span>Skills Analysis</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'job-match' ? 'active' : ''}`}
            onClick={() => handleNavClick('job-match')}
          >
            <Briefcase size={18} />
            <span>Job Match</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'areas-to-improve' ? 'active' : ''}`}
            onClick={() => handleNavClick('areas-to-improve')}
          >
            <Lightbulb size={18} />
            <span>Areas to Improve</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'learning' ? 'active' : ''}`}
            onClick={() => handleNavClick('learning')}
          >
            <BookOpen size={18} />
            <span>Learning Plan</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeNav === 'career-tips' || activeNav === 'bullet-rewrites' ? 'active' : ''}`}
            onClick={() => handleNavClick('bullet-rewrites')}
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
              onClick={() => handleNavClick('learning')}
              title="Go to Learning Plan"
            >
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div className="sidebar-backdrop" onClick={onCloseMobileMenu} />
      )}
    </>
  );
};

export default SidebarNav;

