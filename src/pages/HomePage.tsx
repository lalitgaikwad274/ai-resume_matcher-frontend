import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

import { analyzeResume } from '../api/analysisApi';
import ResumeUploader from '../components/ResumeUploader';
import AnalysisPage from './AnalysisPage';

import type { AnalysisResult } from '../types/analysis';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setError('');

    if (!file) {
      setError('Please upload your resume.');
      return;
    }

    if (!jobTitle.trim()) {
      setError('Please enter a job title.');
      return;
    }

    if (jobDescription.trim().length < 30) {
      setError('Please enter a job description with at least 30 characters.');
      return;
    }

    if (jobDescription.length > 20000) {
      setError('Job description cannot exceed 20,000 characters.');
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeResume(
        file,
        jobTitle.trim(),
        jobDescription.trim(),
        true,
      );
      setResult(response);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;

        setError(
          typeof detail === 'string'
            ? detail
            : 'Analysis failed. Please check your input and try again.',
        );
      } else {
        setError('Something went wrong. Please try again.');
      }

    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setFile(null);
    setJobTitle('');
    setJobDescription('');
    setError('');
  };

  const activeResult: AnalysisResult | null = result ;

  if (activeResult) {
    return (
      <AnalysisPage
        result={activeResult}
        onAnalyzeAnother={resetAnalysis}
      />
    );
  }

  return (
    <main className="page">
      <div className="container">

        <div className="hero-section">
          <div className="hero-icon">
            <Sparkles size={25} />
          </div>

          <h1>AI Resume Analyzer</h1>

          <p>
            Discover how well your resume matches a job.
            Get actionable AI recommendations to improve it.
          </p>
        </div>

        <section className="form-card">

          <h2>Analyze your resume</h2>

          <label>Upload your resume</label>

          <ResumeUploader
            file={file}
            onFileSelect={setFile}
            error={error}
          />

          <label>Target Job Title</label>

          <input
            type="text"
            placeholder="e.g. Python Backend Developer"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            disabled={loading}
          />

          <label>Job Description</label>

          <textarea
            rows={9}
            placeholder="Paste the complete job description here..."
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            disabled={loading}
          />

          <div className="character-count">
            {jobDescription.length}/20,000 characters
          </div>

          {error && (
            <p className="error">{error}</p>
          )}

          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing your resume...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Analyze Resume
              </>
            )}
          </button>

          <p className="privacy-note">
            Your resume is processed for analysis and is not
            saved to an account or database.
          </p>

        </section>
      </div>
    </main>
  );
}