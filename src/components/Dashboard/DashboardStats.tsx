
import { useState, useEffect } from 'react';
import { TestSession, TestPreparation } from '../../types/dashboard';

interface DashboardStatsReturn {
  totalTests: number;
  avgScore: number;
  subjectPerformance: {
    subject: string;
    score: number;
    count: number;
  }[];
  ritualImpact: {
    ritual: string;
    avgScore: number;
    count: number;
  }[];
  moodImpact: {
    mood: string;
    avgScore: number;
    count: number;
  }[];
}

export const useDashboardStats = (
  sessions: TestSession[],
  preparations: Record<string, TestPreparation>
): DashboardStatsReturn => {
  const [totalTests, setTotalTests] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [subjectPerformance, setSubjectPerformance] = useState<any[]>([]);
  const [ritualImpact, setRitualImpact] = useState<any[]>([]);
  const [moodImpact, setMoodImpact] = useState<any[]>([]);

  useEffect(() => {
    calculateStats(sessions, preparations);
  }, [sessions, preparations]);

  const calculateStats = (
    sessions: TestSession[],
    preparations: Record<string, TestPreparation>
  ) => {
    if (sessions.length === 0) {
      setTotalTests(0);
      setAvgScore(0);
      setSubjectPerformance([]);
      setRitualImpact([]);
      setMoodImpact([]);
      return;
    }

    // Total tests
    setTotalTests(sessions.length);

    // Average score
    const totalScore = sessions.reduce((sum, session) => {
      const scorePercent = session.total_questions > 0
        ? (session.score / session.total_questions) * 100
        : 0;
      return sum + scorePercent;
    }, 0);
    setAvgScore(totalScore / sessions.length);

    // Subject performance
    const subjectMap: Record<string, { score: number, count: number }> = {};
    sessions.forEach(session => {
      const subj = session.subject;
      const scorePercent = session.total_questions > 0
        ? (session.score / session.total_questions) * 100
        : 0;

      if (!subjectMap[subj]) {
        subjectMap[subj] = { score: scorePercent, count: 1 };
      } else {
        subjectMap[subj].score += scorePercent;
        subjectMap[subj].count += 1;
      }
    });

    const subjectStats = Object.entries(subjectMap).map(([subject, data]) => ({
      subject,
      score: data.score / data.count,
      count: data.count
    }));
    setSubjectPerformance(subjectStats.sort((a, b) => b.count - a.count));

    // Ritual impact
    const ritualMap: Record<string, { score: number, count: number }> = {};
    sessions.forEach(session => {
      const prep = preparations[session.id];
      if (!prep) return;

      const ritual = prep.ritual || 'none';
      const scorePercent = session.total_questions > 0
        ? (session.score / session.total_questions) * 100
        : 0;

      if (!ritualMap[ritual]) {
        ritualMap[ritual] = { score: scorePercent, count: 1 };
      } else {
        ritualMap[ritual].score += scorePercent;
        ritualMap[ritual].count += 1;
      }
    });

    const ritualStats = Object.entries(ritualMap).map(([ritual, data]) => ({
      ritual,
      avgScore: data.score / data.count,
      count: data.count
    }));
    setRitualImpact(ritualStats.sort((a, b) => b.avgScore - a.avgScore));

    // Mood impact
    const moodMap: Record<string, { score: number, count: number }> = {};
    sessions.forEach(session => {
      const prep = preparations[session.id];
      if (!prep) return;

      const mood = prep.mood || 'unknown';
      const scorePercent = session.total_questions > 0
        ? (session.score / session.total_questions) * 100
        : 0;

      if (!moodMap[mood]) {
        moodMap[mood] = { score: scorePercent, count: 1 };
      } else {
        moodMap[mood].score += scorePercent;
        moodMap[mood].count += 1;
      }
    });

    const moodStats = Object.entries(moodMap).map(([mood, data]) => ({
      mood,
      avgScore: data.score / data.count,
      count: data.count
    }));
    setMoodImpact(moodStats.sort((a, b) => b.avgScore - a.avgScore));
  };

  return {
    totalTests,
    avgScore,
    subjectPerformance,
    ritualImpact,
    moodImpact
  };
};
