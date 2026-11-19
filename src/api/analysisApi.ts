import axios from 'axios';
import type { AnalysisResult } from '../types/analysis';
const isProd = true
const api = axios.create({
  baseURL: isProd ? "https://ai-resume-job-macher.onrender.com/" : import.meta.env.VITE_API_BASE_URL,
  timeout: 120000,
});

export const analyzeResume = async (
  file: File,
  jobTitle: string,
  jobDescription: string,
  includeAI = true,
): Promise<AnalysisResult> => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('job_title', jobTitle);
  formData.append('job_description', jobDescription);
  formData.append('include_ai', String(includeAI));

  const response = await api.post<AnalysisResult>(
    '/analysis/full',
    formData,
  );

  return response.data;
};
