export interface ResumeStrength {
  title: string;
  explanation: string;
}

export interface ResumeWeakness {
  title: string;
  explanation: string;
  improvement?: string;
}

export interface BulletImprovement {
  original: string;
  improved: string;
  explanation?: string;
}

export interface SkillRecommendation {
  skill: string;
  reason: string;
  priority?: 'High' | 'Medium' | 'Low' | string;
}

export interface AIRecommendations {
  overall_feedback?: string;
  strengths: ResumeStrength[];
  weaknesses: ResumeWeakness[];
  bullet_improvements: BulletImprovement[];
  missing_skills: SkillRecommendation[];
  ats_recommendations?: string[];
}

// Backward compatibility alias
export type ResumeRecommendation = AIRecommendations;
