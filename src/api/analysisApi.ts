import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 120000,
});

export const analyzeResume = async (
  file: File,
  jobTitle: string,
  jobDescription: string,
  includeAI = true,
) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('job_title', jobTitle);
  formData.append('job_description', jobDescription);
  formData.append('include_ai', String(includeAI));

  const response = await api.post(
    '/analysis/full',
    formData,
  );

  return response.data;
};