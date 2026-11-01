import type { AIRecommendations } from "./recommendation";

export interface SkillGroup {
  [category: string]: string[];
}

export interface ResumeAnalysis {
  filename: string;
  word_count?: number;
  character_count?: number;
  skills: SkillGroup;
  total_skills: number;
  experience_mentions: string[];
  education: string[];
}

export interface MatchAnalysis {
  match_score: number;
  required_coverage?: number;
  preferred_coverage?: number;
  matched_required: string[];
  missing_required: string[];
  matched_preferred: string[];
  missing_preferred: string[];
  required_total: number;
  preferred_total: number;
}


export interface JobAnalysis {
  required_skills?: SkillGroup;
  preferred_skills?: SkillGroup;
  experience_years?: number | null;
  total_required_skills?: number;
  total_preferred_skills?: number;
}

export interface AnalysisResult {
  job_title?: string;
  resume_analysis: ResumeAnalysis;
  job_analysis?: JobAnalysis;
  match_analysis: MatchAnalysis;
  text_similarity: number;
  ai_recommendations?: AIRecommendations;
  status?: string;
}