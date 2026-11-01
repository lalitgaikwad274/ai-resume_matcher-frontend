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
      
      setResult(response as AnalysisResult);

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

  if (!result) {
    let result =  {
        "job_title": "python developer",
        "resume_analysis": {
          "filename": "Lalit_Gaikwad_Python_AI_Resume.pdf",
          "word_count": 416,
          "character_count": 2874,
          "skills": {
            "programming_languages": [
              "python",
              "javascript",
              "typescript",
              "c++"
            ],
            "backend": [
              "fastapi",
              "node.js"
            ],
            "frontend_mobile": [
              "react",
              "react native"
            ],
            "database": [
              "postgresql",
              "mysql"
            ],
            "cloud_devops": [
              "docker",
              "git",
              "github"
            ],
            "ai_ml": [
              "langchain",
              "openai",
              "llm",
              "rag"
            ]
          },
          "total_skills": 17,
          "experience_mentions": [],
          "education": []
        },
        "job_analysis": {
          "required_skills": {
            "programming_languages": [
              "python"
            ]
          },
          "preferred_skills": {},
          "experience_years": null,
          "total_required_skills": 1,
          "total_preferred_skills": 0
        },
        "match_analysis": {
          "match_score": 100,
          "required_coverage": 100,
          "preferred_coverage": 0,
          "matched_required": [
            "python"
          ],
          "missing_required": [],
          "matched_preferred": [],
          "missing_preferred": [],
          "required_total": 1,
          "preferred_total": 0
        },
        "text_similarity": 10.86,
        "ai_recommendations": {
          "overall_feedback": "The candidate is a strong fit for this role, as their core backend experience is built around Python and FastAPI in both professional production environments and personal projects.",
          "strengths": [
            {
              "title": "Direct FastAPI Experience",
              "explanation": "The candidate has demonstrated hands-on experience designing and building REST APIs and services with FastAPI at iProgrammer Solutions and across multiple projects."
            },
            {
              "title": "Strong Python Backend Foundation",
              "explanation": "The candidate has over 4 years of software engineering experience utilizing Python for production integrations, WebSockets, database operations, and AI service orchestration."
            }
          ],
          "weaknesses": [
            {
              "title": "Lack of Explicit FastAPI Framework Details",
              "explanation": "While FastAPI is mentioned frequently, key ecosystem components such as Pydantic data validation, async/await concurrency, and dependency injection are not explicitly detailed in the project descriptions.",
              "improvement": "Mention specific FastAPI concepts utilized, such as Pydantic schemas, dependency injection, and asynchronous request handling in bullet points."
            },
            {
              "title": "Missing Python Testing Frameworks",
              "explanation": "The resume lists Jest (a JavaScript testing tool) under tools, but does not list standard Python testing frameworks such as Pytest or Unittest.",
              "improvement": "If experienced with Pytest or Python unit testing, explicitly include it to demonstrate automated backend testing proficiency."
            }
          ],
          "missing_skills": [
            {
              "skill": "Pytest / Automated Testing for Python",
              "reason": "Production Python developers are expected to write automated unit and integration tests; only Jest is listed under tools.",
              "priority": "Medium"
            },
            {
              "skill": "Asynchronous Programming (asyncio)",
              "reason": "FastAPI relies heavily on asynchronous event loops and coroutines, which are not explicitly highlighted in the descriptions.",
              "priority": "Low"
            }
          ],
          "bullet_improvements": [
            {
              "original": "Built an AI assistant that helps users find and complete recharges, powered by GPT-4o and a FastAPI backend.",
              "improved": "Developed an AI recharge assistant by building a FastAPI backend to handle API routing, business logic, and GPT-4o integration.",
              "explanation": "Focuses the action on the backend architecture and FastAPI implementation without adding unverified metrics."
            },
            {
              "original": "Develop AI features and backend integrations for the Vodafone Idea app, working with Python, FastAPI and OpenAI models.",
              "improved": "Design and implement production backend integrations and AI features for the Vodafone Idea app using Python, FastAPI, and OpenAI models.",
              "explanation": "Uses stronger action verbs highlighting design and implementation of FastAPI services."
            }
          ],
          "ats_recommendations": [
            "Ensure 'FastAPI' is consistently capitalized across all sections of the resume.",
            "Add 'Python 3', 'RESTful API Design', and 'Pydantic' to the technical skills list if applicable.",
            "Include 'Pytest' or 'Unit Testing' alongside backend development tools to match standard Python developer ATS scans.",
            "Highlight asynchronous backend patterns (e.g., 'Asyncio', 'Uvicorn') in the FastAPI project descriptions."
          ]
        },
        "status": "success"
      }
    return (
      <AnalysisPage
        result={result}
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