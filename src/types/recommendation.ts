export interface ResumeStrength {
  title: string;
  explanation: string;
}

export interface ResumeWeakness {
  title: string;
  explanation: string;
}

export interface BulletImprovement {
  original: string;
  improved: string;
}

export interface SkillRecommendation {
  skill: string;
  reason: string;
}

export interface AIRecommendations {
  strengths: ResumeStrength[];
  weaknesses: ResumeWeakness[];
  bullet_improvements: BulletImprovement[];
  missing_skills: SkillRecommendation[];
}