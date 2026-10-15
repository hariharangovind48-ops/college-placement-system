import React, { useState, useEffect } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { AptitudeTest, AptitudeQuestion, TestAttemptResult } from '../types';
import { APTITUDE_TESTS } from '../data/mockData';
import { 
  BrainCircuit, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Bookmark, 
  Award, 
  Check, 
  AlertCircle,
  Play,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const AptitudeHub: React.FC = () => {
  const { testResults, recordTestResult } = usePlacement();
  
  // Active test state
  const [activeTest, setActiveTest] = useState<AptitudeTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<TestAttemptResult | null>(null);

  // Timer effect
  useEffect(() => {
    if (!activeTest || isTestCompleted) return;

    if (secondsRemaining <= 0) {
      handleAutoSubmit();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTest, secondsRemaining, isTestCompleted]);

  const startTest = (test: AptitudeTest) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setSecondsRemaining(test.durationMinutes * 60);
    setIsTestCompleted(false);
    setCurrentResult(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleClearOption = (questionId: string) => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const toggleMarkForReview = (questionId: string) => {
    setMarkedForReview(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;

    let score = 0;
    activeTest.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const total = activeTest.questions.length;
    const percentage = Math.round((score / total) * 100);

    const resultData: TestAttemptResult = {
      testId: activeTest.id,
      testTitle: activeTest.title,
      score,
      total,
      percentage,
      completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      answers: selectedAnswers
    };

    recordTestResult(resultData);
    setCurrentResult(resultData);
    setIsTestCompleted(true);
  };

  const handleAutoSubmit = () => {
    handleSubmitTest();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // If in the middle of a test
  if (activeTest && !isTestCompleted) {
    const q = activeTest.questions[currentQuestionIndex];
    const isAnswered = selectedAnswers[q.id] !== undefined;
    const isMarked = !!markedForReview[q.id];

    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        
        {/* Test Header Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">{activeTest.title}</h2>
            <div className="text-xs text-slate-500 font-mono">
              Question {currentQuestionIndex + 1} of {activeTest.questions.length} · Topic: {q.topic} ({q.subtopic})
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Countdown timer */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm tabular-nums ${
              secondsRemaining < 120 
                ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' 
                : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}>
              <Timer className="w-4 h-4 text-blue-700" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
            >
              Submit Assessment
            </button>
          </div>
        </div>

        {/* Question Area & Palette Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Question Box */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Question #{currentQuestionIndex + 1}</span>
              <span className="font-mono">Difficulty: {q.difficulty}</span>
            </div>

            {/* Question Text */}
            <div className="text-sm font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
              {q.question}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(q.id, idx)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-colors flex items-center gap-3 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-medium'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 border border-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleMarkForReview(q.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    isMarked
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isMarked ? '★ Marked for Review' : '☆ Mark for Review'}
                </button>
                {isAnswered && (
                  <button
                    onClick={() => handleClearOption(q.id)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={currentQuestionIndex === activeTest.questions.length - 1}
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

          </div>

          {/* Right Question Palette */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Question Navigator
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {activeTest.questions.map((quest, idx) => {
                const ans = selectedAnswers[quest.id] !== undefined;
                const marked = !!markedForReview[quest.id];
                const isCurrent = currentQuestionIndex === idx;

                return (
                  <button
                    key={quest.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-lg font-mono text-xs font-bold transition-all border ${
                      isCurrent 
                        ? 'ring-2 ring-blue-600 border-blue-600' 
                        : ''
                    } ${
                      ans 
                        ? 'bg-blue-700 text-white border-blue-700' 
                        : marked 
                        ? 'bg-amber-100 text-amber-800 border-amber-300' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-1.5 text-[11px] text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-700"></span>
                <span>Answered ({Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></span>
                <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200"></span>
                <span>Unvisited ({activeTest.questions.length - Object.keys(selectedAnswers).length})</span>
              </div>
            </div>

            <button
              onClick={handleSubmitTest}
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
            >
              Finish & View Analysis
            </button>

          </div>

        </div>

      </div>
    );
  }

  // If viewing completed test result
  if (activeTest && isTestCompleted && currentResult) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Results Banner */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs text-slate-500 font-medium">Assessment Analysis & Solutions</div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{activeTest.title}</h2>
              <div className="text-xs text-slate-500 font-mono">Completed on {currentResult.completedAt}</div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-extrabold text-blue-700 font-mono tabular-nums">
                {currentResult.score} / {currentResult.total}
              </div>
              <div className="text-xs font-semibold text-slate-600 font-mono">
                {currentResult.percentage}% Accuracy
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
              <div className="text-xs text-emerald-700 font-medium">Correct</div>
              <div className="text-xl font-bold text-emerald-900 font-mono tabular-nums">
                {currentResult.score}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-red-50 border border-red-100">
              <div className="text-xs text-red-700 font-medium">Incorrect</div>
              <div className="text-xl font-bold text-red-900 font-mono tabular-nums">
                {currentResult.total - currentResult.score}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-xs text-slate-600 font-medium">Attempted</div>
              <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                {Object.keys(currentResult.answers).length} / {currentResult.total}
              </div>
            </div>
          </div>

          {/* Question by question solution review */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Comprehensive Solutions & Explanations</h3>

            <div className="space-y-6">
              {activeTest.questions.map((quest, idx) => {
                const userAns = currentResult.answers[quest.id];
                const isCorrect = userAns === quest.correctAnswer;
                const isSkipped = userAns === undefined;

                return (
                  <div key={quest.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900">
                        {idx + 1}. {quest.question}
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0 text-xs">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : isSkipped ? (
                        <span className="text-slate-500 font-medium shrink-0 text-xs">
                          Skipped
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold flex items-center gap-1 shrink-0 text-xs">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>

                    {/* Options list */}
                    <div className="space-y-1.5 pl-2 text-xs">
                      {quest.options.map((opt, oIdx) => {
                        const isUserChoice = userAns === oIdx;
                        const isRightChoice = quest.correctAnswer === oIdx;

                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded flex items-center justify-between ${
                              isRightChoice
                                ? 'bg-emerald-100/70 text-emerald-900 font-semibold border border-emerald-300'
                                : isUserChoice
                                ? 'bg-red-100/70 text-red-900 font-medium border border-red-300'
                                : 'text-slate-600'
                            }`}
                          >
                            <span>
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </span>
                            {isRightChoice && <span className="text-[11px] text-emerald-800 font-bold">✓ Correct Answer</span>}
                            {isUserChoice && !isRightChoice && <span className="text-[11px] text-red-700 font-bold">Your Response</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Deep explanation box */}
                    <div className="p-3 bg-white rounded border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1">
                      <span className="font-bold text-slate-900">Explanation & Derivation:</span>
                      <p className="whitespace-pre-line text-slate-600">{quest.explanation}</p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => startTest(activeTest)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake This Test</span>
            </button>

            <button
              onClick={() => setActiveTest(null)}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
            >
              Back to Assessment Library
            </button>
          </div>

        </div>

      </div>
    );
  }

  // Test Selection Library
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Campus Recruitment Diagnostic Assessments</span>
          <span aria-hidden="true">·</span>
          <span>Curated Question Bank</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Aptitude & Technical Assessment Hub
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Master quantitative problem solving, logical reasoning puzzles, core CS theory, and company-specific formats (TCS NQT, Zoho, Infosys) under real exam timer constraints.
        </p>
      </div>

      {/* Available Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {APTITUDE_TESTS.map((test) => {
          const pastAttempts = testResults.filter(r => r.testId === test.id);
          const bestScore = pastAttempts.length > 0 
            ? Math.max(...pastAttempts.map(p => p.percentage)) 
            : null;

          return (
            <div
              key={test.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="font-semibold text-blue-700">{test.category}</span>
                  <span className="font-mono tabular-nums">{test.durationMinutes} Minutes</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{test.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{test.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>{test.questions.length} Questions</span>
                  <span aria-hidden="true">·</span>
                  <span>Instant Detailed Derivations</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {bestScore !== null ? (
                    <div className="text-xs">
                      <span className="text-slate-500">Best Score: </span>
                      <span className="font-bold text-emerald-700 font-mono tabular-nums">{bestScore}%</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Not yet attempted</span>
                  )}
                </div>

                <button
                  onClick={() => startTest(test)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Assessment</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Past Test History Table */}
      {testResults.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Your Recent Test Attempts</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium">
                  <th className="py-2.5 pr-4">Test Title</th>
                  <th className="py-2.5 px-4">Completed Date</th>
                  <th className="py-2.5 px-4 text-right">Score</th>
                  <th className="py-2.5 pl-4 text-right">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testResults.slice(0, 5).map((res, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 pr-4 font-semibold text-slate-800">{res.testTitle}</td>
                    <td className="py-2.5 px-4 font-mono text-slate-500">{res.completedAt}</td>
                    <td className="py-2.5 px-4 font-mono text-right text-slate-800">{res.score} / {res.total}</td>
                    <td className="py-2.5 pl-4 font-mono font-bold text-right text-blue-700">{res.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
