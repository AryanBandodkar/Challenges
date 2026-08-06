import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const REQUEST_TIMEOUT_MS = 20000;
const COURSE_PAGE_LIMIT = 20;
const CHALLENGE_PAGE_LIMIT = 50;
const REVIEW_POLL_INTERVAL_MS = 2500;
const REVIEW_POLL_TIMEOUT_MS = 180000;

const LAYER_LABELS = {
  functionalTests: 'Functional Tests',
  codeQuality: 'Code Quality',
  architecture: 'Architecture',
  bestPractices: 'Best Practices',
  e2eTests: 'E2E / API Behavior',
  aiReview: 'AI Review'
};

function normalizeScore(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) return null;
  return Math.max(0, Math.min(100, score));
}

function toPercent(score) {
  const normalized = normalizeScore(score);
  if (normalized == null) return '-';
  return `${Math.round(normalized)}%`;
}

function formatDate(value) {
  if (!value) return 'Not run';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not run';
  return date.toLocaleString();
}

function createTimeoutController(signal, timeoutMs = REQUEST_TIMEOUT_MS) {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);
  const abortFromSignal = () => timeoutController.abort();

  if (signal) {
    if (signal.aborted) timeoutController.abort();
    signal.addEventListener('abort', abortFromSignal, { once: true });
  }

  return {
    signal: timeoutController.signal,
    cleanup: () => {
      clearTimeout(timeoutId);
      if (signal) signal.removeEventListener('abort', abortFromSignal);
    }
  };
}

async function fetchJson(path, options = {}) {
  const { signal, timeoutMs, ...fetchOptions } = options;
  const wrapped = createTimeoutController(signal, timeoutMs);

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...fetchOptions,
      signal: wrapped.signal
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.error || `Request failed (${response.status})`;
      throw new Error(message);
    }
    return data;
  } finally {
    wrapped.cleanup();
  }
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === 'passed') return <span className="badge badge-passed">Passed</span>;
  if (status === 'not-passed') return <span className="badge badge-failed">Not Passed</span>;
  return <span className="badge badge-pending">Not Run</span>;
}

function ScoreBar({ score }) {
  const normalized = normalizeScore(score);
  const barClass =
    normalized == null ? 'score-pending' : normalized >= 80 ? 'score-good' : normalized >= 50 ? 'score-mid' : 'score-low';

  return (
    <div className={`score-track ${barClass}`}>
      <div className="score-fill" style={{ width: `${normalized || 0}%` }} />
    </div>
  );
}

function LayerCard({ layerKey, layerValue }) {
  const label = LAYER_LABELS[layerKey] || layerKey;
  const score = normalizeScore(layerValue?.score);

  return (
    <details className="layer-card">
      <summary>
        <span>{label}</span>
        <strong>{toPercent(score)}</strong>
      </summary>
      <div className="layer-body">
        {layerKey === 'functionalTests' && (
          <>
            <p>
              Checks: {layerValue?.passedChecks ?? 0} / {layerValue?.totalChecks ?? 0}
            </p>
            {Array.isArray(layerValue?.failedFiles) && layerValue.failedFiles.length > 0 && (
              <ul>
                {layerValue.failedFiles.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
            )}
          </>
        )}

        {layerKey === 'codeQuality' && (
          <>
            <p>
              Errors: {layerValue?.errors ?? 0}, Warnings: {layerValue?.warnings ?? 0}
            </p>
            {Array.isArray(layerValue?.details) && layerValue.details.length > 0 && (
              <pre>{JSON.stringify(layerValue.details, null, 2)}</pre>
            )}
          </>
        )}

        {layerKey === 'architecture' && (
          <>
            {Array.isArray(layerValue?.required) && (
              <p>Required: {layerValue.required.join(', ') || 'None'}</p>
            )}
            {Array.isArray(layerValue?.missing) && layerValue.missing.length > 0 && (
              <p className="text-danger">Missing: {layerValue.missing.join(', ')}</p>
            )}
            {Array.isArray(layerValue?.found) && layerValue.found.length > 0 && (
              <p>Found: {layerValue.found.join(', ')}</p>
            )}
          </>
        )}

        {layerKey === 'bestPractices' && (
          <>
            <p>Issue count: {layerValue?.issueCount ?? 0}</p>
            {Array.isArray(layerValue?.issues) && layerValue.issues.length > 0 && (
              <ul>
                {layerValue.issues.map((issue, index) => (
                  <li key={`${index}-${String(issue)}`}>{String(issue)}</li>
                ))}
              </ul>
            )}
          </>
        )}

        {layerKey === 'e2eTests' && (
          <>
            <p>Mode: {layerValue?.mode || 'unknown'}</p>
            {layerValue?.note ? <p>{layerValue.note}</p> : null}
            {typeof layerValue?.hasUnit === 'boolean' && (
              <p>Unit tests present: {layerValue.hasUnit ? 'Yes' : 'No'}</p>
            )}
            {typeof layerValue?.hasE2E === 'boolean' && (
              <p>E2E tests present: {layerValue.hasE2E ? 'Yes' : 'No'}</p>
            )}
          </>
        )}

        {layerKey === 'aiReview' && (
          <>
            <p>Mode: {layerValue?.mode || 'unknown'}</p>
            {Array.isArray(layerValue?.strengths) && layerValue.strengths.length > 0 && (
              <>
                <p>Strengths:</p>
                <ul>
                  {layerValue.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            {Array.isArray(layerValue?.improvements) && layerValue.improvements.length > 0 && (
              <>
                <p>Improvements:</p>
                <ul>
                  {layerValue.improvements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {!Object.keys(LAYER_LABELS).includes(layerKey) && (
          <pre>{JSON.stringify(layerValue, null, 2)}</pre>
        )}
      </div>
    </details>
  );
}

export default function App() {
  const [view, setView] = useState('courses');
  const [error, setError] = useState('');

  const [progress, setProgress] = useState(null);
  const [courses, setCourses] = useState([]);
  const [coursesPage, setCoursesPage] = useState(1);
  const [coursesTotalPages, setCoursesTotalPages] = useState(1);
  const [courseSearch, setCourseSearch] = useState('');

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [courseDetail, setCourseDetail] = useState(null);

  const [challenges, setChallenges] = useState([]);
  const [challengesPage, setChallengesPage] = useState(1);
  const [challengesTotalPages, setChallengesTotalPages] = useState(1);
  const [challengeSearch, setChallengeSearch] = useState('');
  const [challengeFilter, setChallengeFilter] = useState('all');
  const [selectedChallengeId, setSelectedChallengeId] = useState('');
  const [challengeDetail, setChallengeDetail] = useState(null);
  const [instructionsOpen, setInstructionsOpen] = useState(true);

  const [loadingProgress, setLoadingProgress] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingChallenges, setLoadingChallenges] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [runningReview, setRunningReview] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('course') || '';
    const challengeId = params.get('challenge') || '';
    if (courseId && challengeId) {
      setSelectedCourseId(courseId);
      setSelectedChallengeId(challengeId);
      setView('detail');
      return;
    }
    if (courseId) {
      setSelectedCourseId(courseId);
      setView('challenges');
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCourseId) params.set('course', selectedCourseId);
    if (selectedChallengeId) params.set('challenge', selectedChallengeId);

    const query = params.toString();
    const nextUrl = query ? `?${query}` : window.location.pathname;
    const current = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== current) {
      window.history.replaceState({}, '', nextUrl);
    }
  }, [selectedCourseId, selectedChallengeId]);

  const loadProgress = useCallback(async (signal) => {
    setLoadingProgress(true);
    try {
      const data = await fetchJson('/progress', { signal });
      setProgress(data);
      setError('');
    } catch (err) {
      if (err?.name === 'AbortError') return;
      setError(err.message || 'Unable to load progress.');
    } finally {
      setLoadingProgress(false);
    }
  }, []);

  const loadCourses = useCallback(
    async (signal) => {
      setLoadingCourses(true);
      try {
        const query = new URLSearchParams({
          page: String(coursesPage),
          limit: String(COURSE_PAGE_LIMIT)
        });
        if (courseSearch.trim()) query.set('q', courseSearch.trim());

        const data = await fetchJson(`/courses?${query.toString()}`, { signal });
        setCourses(Array.isArray(data.courses) ? data.courses : []);
        setCoursesTotalPages(data.totalPages || 1);
        setError('');
      } catch (err) {
        if (err?.name === 'AbortError') return;
        setError(err.message || 'Unable to load courses.');
      } finally {
        setLoadingCourses(false);
      }
    },
    [coursesPage, courseSearch]
  );

  const loadCourseDetail = useCallback(async (courseId, signal) => {
    try {
      const data = await fetchJson(`/courses/${courseId}`, { signal });
      setCourseDetail(data);
      setError('');
    } catch (err) {
      if (err?.name === 'AbortError') return;
      setError(err.message || 'Unable to load course details.');
    }
  }, []);

  const loadChallenges = useCallback(
    async (courseId, signal) => {
      setLoadingChallenges(true);
      try {
        const query = new URLSearchParams({
          page: String(challengesPage),
          limit: String(CHALLENGE_PAGE_LIMIT),
          status: challengeFilter
        });
        if (challengeSearch.trim()) query.set('q', challengeSearch.trim());

        const data = await fetchJson(
          `/courses/${courseId}/challenges?${query.toString()}`,
          { signal }
        );
        setChallenges(Array.isArray(data.challenges) ? data.challenges : []);
        setChallengesTotalPages(data.totalPages || 1);
        setError('');
      } catch (err) {
        if (err?.name === 'AbortError') return;
        setError(err.message || 'Unable to load challenges.');
      } finally {
        setLoadingChallenges(false);
      }
    },
    [challengeFilter, challengeSearch, challengesPage]
  );

  const loadChallengeDetail = useCallback(async (courseId, challengeId, signal) => {
    setLoadingDetail(true);
    try {
      const data = await fetchJson(`/courses/${courseId}/challenges/${challengeId}`, {
        signal
      });
      setChallengeDetail(data);
      setError('');
    } catch (err) {
      if (err?.name === 'AbortError') return;
      setError(err.message || 'Unable to load challenge detail.');
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadProgress(controller.signal);
    return () => controller.abort();
  }, [loadProgress]);

  useEffect(() => {
    if (view !== 'courses') return undefined;
    const controller = new AbortController();
    loadCourses(controller.signal);
    return () => controller.abort();
  }, [view, loadCourses]);

  useEffect(() => {
    if (!selectedCourseId) return undefined;
    const controller = new AbortController();
    loadCourseDetail(selectedCourseId, controller.signal);
    return () => controller.abort();
  }, [selectedCourseId, loadCourseDetail]);

  useEffect(() => {
    if (view !== 'challenges' || !selectedCourseId) return undefined;
    const controller = new AbortController();
    loadChallenges(selectedCourseId, controller.signal);
    return () => controller.abort();
  }, [view, selectedCourseId, loadChallenges]);

  useEffect(() => {
    if (view !== 'detail' || !selectedCourseId || !selectedChallengeId) return undefined;
    const controller = new AbortController();
    loadChallengeDetail(selectedCourseId, selectedChallengeId, controller.signal);
    return () => controller.abort();
  }, [view, selectedCourseId, selectedChallengeId, loadChallengeDetail]);

  const openCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedChallengeId('');
    setChallengeSearch('');
    setChallengeFilter('all');
    setChallengesPage(1);
    setView('challenges');
  };

  const openChallenge = (challengeId) => {
    setSelectedChallengeId(challengeId);
    setInstructionsOpen(true);
    setView('detail');
  };

  const goToCourses = () => {
    setSelectedCourseId('');
    setSelectedChallengeId('');
    setCourseDetail(null);
    setChallengeDetail(null);
    setView('courses');
  };

  const goToChallenges = () => {
    setSelectedChallengeId('');
    setChallengeDetail(null);
    setView('challenges');
  };

  const runReview = async () => {
    if (!selectedCourseId || !selectedChallengeId || runningReview) return;

    setRunningReview(true);
    setError('');
    try {
      const initialLastRun = challengeDetail?.lastRun || null;
      const response = await fetchJson('/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourseId,
          challengeId: selectedChallengeId
        }),
        timeoutMs: REVIEW_POLL_TIMEOUT_MS
      });

      if (response?.result) {
        if (response?.progress) {
          setProgress(response.progress);
        }
        await Promise.all([
          loadCourseDetail(selectedCourseId),
          loadChallenges(selectedCourseId),
          loadChallengeDetail(selectedCourseId, selectedChallengeId)
        ]);
        return;
      }

      if (!response?.started && !response?.alreadyRunning) {
        throw new Error('Review did not start.');
      }

      if (response?.progress) {
        setProgress(response.progress);
      }

      const startedAt = Date.now();
      while (Date.now() - startedAt < REVIEW_POLL_TIMEOUT_MS) {
        await new Promise((resolve) => setTimeout(resolve, REVIEW_POLL_INTERVAL_MS));
        const latest = await fetchJson(
          `/courses/${selectedCourseId}/challenges/${selectedChallengeId}`
        );
        const latestLastRun = latest?.lastRun || null;
        const changed =
          initialLastRun == null ? latestLastRun != null : latestLastRun !== initialLastRun;

        if (changed) {
          setChallengeDetail(latest);
          const progressData = await fetchJson('/progress');
          setProgress(progressData);
          await Promise.all([
            loadCourseDetail(selectedCourseId),
            loadChallenges(selectedCourseId)
          ]);
          return;
        }
      }

      setError('Review started, but no update was detected within 3 minutes.');
    } catch (err) {
      setError(err.message || 'Unable to run review.');
    } finally {
      setRunningReview(false);
    }
  };

  const pathwayComplete =
    progress?.totalChallenges > 0 &&
    progress?.completedChallenges >= progress?.totalChallenges;

  const courseComplete =
    courseDetail?.totalChallenges > 0 &&
    courseDetail?.completedChallenges >= courseDetail?.totalChallenges;

  const selectedCourseName = useMemo(() => {
    if (courseDetail?.courseName) return courseDetail.courseName;
    return courses.find((item) => item.id === selectedCourseId)?.name || selectedCourseId;
  }, [courseDetail, courses, selectedCourseId]);

  return (
    <div className="shell">
      <header className="hero">
        <p className="eyebrow">Learner Command Center</p>
        <h1>Challenge Engine Dashboard</h1>
        <p className="subtitle">
          Track progress, inspect challenge instructions, run reviews, and validate every layer.
        </p>
      </header>

      {error ? <div className="alert-error">{error}</div> : null}

      {view === 'courses' && (
        <section className="view">
          <div className="summary-grid">
            <article className="metric">
              <span>Pathway</span>
              <strong>{progress?.pathwayName || 'Node.js Backend Engineer'}</strong>
            </article>
            <article className="metric">
              <span>Overall score</span>
              <strong>{toPercent(progress?.overallScore)}</strong>
            </article>
            <article className="metric">
              <span>Completion</span>
              <strong>{toPercent(progress?.completionPercentage)}</strong>
            </article>
            <article className="metric">
              <span>Challenges</span>
              <strong>
                {progress?.completedChallenges || 0}/{progress?.totalChallenges || 0}
              </strong>
            </article>
            <article className="metric">
              <span>Last updated</span>
              <strong>{formatDate(progress?.lastUpdated)}</strong>
            </article>
          </div>

          <div className="progress-section">
            <div className="progress-head">
              <h2>Pathway Progress</h2>
              {pathwayComplete ? <span className="success-chip">Pathway Complete</span> : null}
            </div>
            <ScoreBar score={progress?.completionPercentage || 0} />
          </div>

          <div className="toolbar">
            <input
              type="text"
              placeholder="Search courses by name or id"
              value={courseSearch}
              onChange={(event) => {
                setCourseSearch(event.target.value);
                setCoursesPage(1);
              }}
            />
          </div>

          {loadingProgress || loadingCourses ? <div className="loading">Loading courses...</div> : null}

          <div className="card-grid">
            {courses.map((course) => (
              <article key={course.id} className="card">
                <h3>{course.name}</h3>
                <p className="muted">{course.id}</p>
                <div className="stats">
                  <span>Score: {toPercent(course.averageScore)}</span>
                  <span>Completion: {toPercent(course.completionPercentage)}</span>
                  <span>
                    Passed: {course.completedChallenges || 0}/{course.totalChallenges || 0}
                  </span>
                </div>
                <div className="scorebar-wrapper">
                  <ScoreBar score={course.completionPercentage || 0} />
                </div>
                <button type="button" onClick={() => openCourse(course.id)}>
                  View Challenges
                </button>
              </article>
            ))}
          </div>

          <Pagination
            page={coursesPage}
            totalPages={coursesTotalPages}
            onChange={(nextPage) => setCoursesPage(nextPage)}
          />
        </section>
      )}

      {view === 'challenges' && (
        <section className="view">
          <nav className="breadcrumb">
            <button type="button" onClick={goToCourses}>
              Courses
            </button>
            <span>/</span>
            <span>{selectedCourseName}</span>
          </nav>

          <div className="progress-section">
            <div className="progress-head">
              <h2>{selectedCourseName}</h2>
              {courseComplete ? <span className="success-chip">Course Complete</span> : null}
            </div>
            <p className="muted">
              Score {toPercent(courseDetail?.averageScore)} | Completion{' '}
              {toPercent(courseDetail?.completionPercentage)} | Passed{' '}
              {courseDetail?.completedChallenges || 0}/{courseDetail?.totalChallenges || 0}
            </p>
            <ScoreBar score={courseDetail?.completionPercentage || 0} />
          </div>

          <div className="toolbar split">
            <div className="tabs">
              <button
                type="button"
                className={challengeFilter === 'all' ? 'active' : ''}
                onClick={() => {
                  setChallengeFilter('all');
                  setChallengesPage(1);
                }}
              >
                All
              </button>
              <button
                type="button"
                className={challengeFilter === 'passed' ? 'active' : ''}
                onClick={() => {
                  setChallengeFilter('passed');
                  setChallengesPage(1);
                }}
              >
                Passed
              </button>
              <button
                type="button"
                className={challengeFilter === 'not-passed' ? 'active' : ''}
                onClick={() => {
                  setChallengeFilter('not-passed');
                  setChallengesPage(1);
                }}
              >
                Not Passed
              </button>
            </div>
            <input
              type="text"
              placeholder="Search challenges"
              value={challengeSearch}
              onChange={(event) => {
                setChallengeSearch(event.target.value);
                setChallengesPage(1);
              }}
            />
          </div>

          {loadingChallenges ? <div className="loading">Loading challenges...</div> : null}

          <div className="card-grid">
            {challenges.map((challenge) => (
              <article key={challenge.id} className="card">
                <h3>{challenge.name}</h3>
                <p className="muted">{challenge.id}</p>
                <div className="stats">
                  <StatusBadge status={challenge.status} />
                  <span>Score: {toPercent(challenge.score)}</span>
                  <span>Last run: {formatDate(challenge.lastRun)}</span>
                </div>
                <div className="scorebar-wrapper">
                  <ScoreBar score={challenge.score || 0} />
                </div>
                <button type="button" onClick={() => openChallenge(challenge.id)}>
                  Details
                </button>
              </article>
            ))}
          </div>

          <Pagination
            page={challengesPage}
            totalPages={challengesTotalPages}
            onChange={(nextPage) => setChallengesPage(nextPage)}
          />
        </section>
      )}

      {view === 'detail' && (
        <section className="view detail-view">
          <nav className="breadcrumb">
            <button type="button" onClick={goToCourses}>
              Courses
            </button>
            <span>/</span>
            <button type="button" onClick={goToChallenges}>
              {selectedCourseName}
            </button>
            <span>/</span>
            <span>{challengeDetail?.name || selectedChallengeId}</span>
          </nav>

          {loadingDetail && !challengeDetail ? <div className="loading">Loading challenge...</div> : null}

          {challengeDetail && (
            <>
              <header className="challenge-head">
                <div>
                  <h2>{challengeDetail.name}</h2>
                  <p className="muted">{challengeDetail.id}</p>
                  <div className="stats">
                    <StatusBadge status={challengeDetail.status} />
                    <span>Score: {toPercent(challengeDetail.score)}</span>
                    <span>Last run: {formatDate(challengeDetail.lastRun)}</span>
                  </div>
                </div>
                <button type="button" className="primary" onClick={runReview} disabled={runningReview}>
                  {runningReview ? 'Running Review...' : 'Run Review'}
                </button>
              </header>

              {challengeDetail.status === 'passed' ? (
                <p className="pass-banner">Challenge passed. You can still rerun review after changes.</p>
              ) : null}

              {Array.isArray(challengeDetail.skills) && challengeDetail.skills.length > 0 && (
                <div className="chips">
                  {challengeDetail.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              )}

              <section className="panel">
                <button
                  type="button"
                  className="collapse-trigger"
                  onClick={() => setInstructionsOpen((prev) => !prev)}
                >
                  {instructionsOpen ? 'Hide Instructions' : 'Show Instructions'}
                </button>
                {instructionsOpen ? (
                  <div className="markdown">
                    <ReactMarkdown>{challengeDetail.instructions || '_No instructions found._'}</ReactMarkdown>
                  </div>
                ) : null}
              </section>

              <section className="panel">
                <h3>Review Results</h3>
                {challengeDetail.result ? (
                  <>
                    <div className="result-summary">
                      <div>
                        <span>Total score</span>
                        <strong>{toPercent(challengeDetail.result.score)}</strong>
                      </div>
                      <div>
                        <span>Passed</span>
                        <strong>{challengeDetail.result.passed ? 'Yes' : 'No'}</strong>
                      </div>
                    </div>
                    <div className="layers">
                      {Object.entries(challengeDetail.result.layers || {}).map(([key, value]) => (
                        <LayerCard key={key} layerKey={key} layerValue={value} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="muted">No review result yet. Run review to generate results.</p>
                )}
              </section>
            </>
          )}
        </section>
      )}
    </div>
  );
}
