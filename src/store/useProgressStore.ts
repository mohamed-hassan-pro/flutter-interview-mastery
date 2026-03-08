// @ts-nocheck
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StudyProgress } from '@/types/card';

interface ProgressState {
  studiedCards: string[];
  confidenceLevels: Record<string, number>;
  studyProgress: StudyProgress[];
  currentLanguage: 'en' | 'ar';
  darkMode: boolean;

  // Actions
  addStudied: (cardId: string) => void;
  setConfidence: (cardId: string, level: number) => void;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  getCardProgress: (cardId: string) => StudyProgress | undefined;
  getWeakCards: () => string[];
  getStrongCards: () => string[];
  getStudyStats: () => {
    totalStudied: number;
    averageConfidence: number;
    weakAreas: string[];
    strongAreas: string[];
    dueCount: number;
  };
  getDueCards: () => string[];
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      studiedCards: [],
      confidenceLevels: {},
      studyProgress: [],
      currentLanguage: 'ar',
      darkMode: false,

      addStudied: (cardId: string) => {
        set((state) => {
          if (state.studiedCards.includes(cardId)) {
            return state;
          }

          const newProgress: StudyProgress = {
            cardId,
            studiedAt: new Date().toISOString(),
            confidenceLevel: state.confidenceLevels[cardId] || 0,
            reviewCount: 1,
          };

          return {
            studiedCards: [...state.studiedCards, cardId],
            studyProgress: [...state.studyProgress, newProgress],
          };
        });
      },

      setConfidence: (cardId: string, level: number) => {
        set((state) => {
          const now = new Date();
          const existingProgressIndex = state.studyProgress.findIndex(
            (p) => p.cardId === cardId
          );

          let newProgress: StudyProgress;
          let newStudyProgress = [...state.studyProgress];

          if (existingProgressIndex >= 0) {
            const current = state.studyProgress[existingProgressIndex];

            // SM-2 Algorithm Implementation
            let { repetition, interval, efactor } = current;
            const quality = level; // quality is 0-5

            if (quality >= 3) {
              if (repetition === 0) {
                interval = 1;
              } else if (repetition === 1) {
                interval = 6;
              } else {
                interval = Math.ceil(interval * efactor);
              }
              repetition += 1;
              efactor = efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
            } else {
              repetition = 0;
              interval = 1;
              efactor = Math.max(1.3, efactor - 0.2);
            }

            if (efactor < 1.3) efactor = 1.3;

            const nextReview = new Date();
            nextReview.setDate(now.getDate() + interval);

            newProgress = {
              ...current,
              confidenceLevel: level,
              reviewCount: current.reviewCount + 1,
              repetition,
              interval,
              efactor,
              lastReviewedDate: now.toISOString(),
              nextReviewDate: nextReview.toISOString(),
            };
            newStudyProgress[existingProgressIndex] = newProgress;
          } else {
            // Initial study session for this card
            const nextReview = new Date();
            nextReview.setDate(now.getDate() + 1);

            newProgress = {
              cardId,
              studiedAt: now.toISOString(),
              lastReviewedDate: now.toISOString(),
              nextReviewDate: nextReview.toISOString(),
              confidenceLevel: level,
              reviewCount: 1,
              repetition: 1,
              interval: 1,
              efactor: 2.5,
            };
            newStudyProgress.push(newProgress);
          }

          return {
            studiedCards: state.studiedCards.includes(cardId)
              ? state.studiedCards
              : [...state.studiedCards, cardId],
            confidenceLevels: { ...state.confidenceLevels, [cardId]: level },
            studyProgress: newStudyProgress,
          };
        });
      },

      toggleLanguage: () => {
        // Language is hardcoded to Arabic to resolve RTL alignment issues
        set({ currentLanguage: 'ar' });
      },

      toggleDarkMode: () => {
        set((state) => ({
          darkMode: !state.darkMode,
        }));
      },

      getCardProgress: (cardId: string) => {
        return get().studyProgress.find((p) => p.cardId === cardId);
      },

      getWeakCards: () => {
        const { confidenceLevels } = get();
        return Object.entries(confidenceLevels)
          .filter(([_, level]) => level < 3)
          .map(([cardId, _]) => cardId);
      },

      getStrongCards: () => {
        const { confidenceLevels } = get();
        return Object.entries(confidenceLevels)
          .filter(([_, level]) => level >= 4)
          .map(([cardId, _]) => cardId);
      },

      getDueCards: () => {
        const { studyProgress } = get();
        const now = new Date();
        return studyProgress
          .filter((p) => p.nextReviewDate && new Date(p.nextReviewDate) <= now)
          .map((p) => p.cardId);
      },

      getStudyStats: () => {
        const { studiedCards, confidenceLevels, studyProgress } = get();
        const now = new Date();

        const confidenceValues = Object.values(confidenceLevels);
        const averageConfidence = confidenceValues.length > 0
          ? confidenceValues.reduce((a, b) => a + b, 0) / confidenceValues.length
          : 0;

        const weakAreas = Object.entries(confidenceLevels)
          .filter(([_, level]) => level < 3)
          .map(([cardId, _]) => cardId);

        const strongAreas = Object.entries(confidenceLevels)
          .filter(([_, level]) => level >= 4)
          .map(([cardId, _]) => cardId);

        const dueCount = studyProgress.filter(
          (p) => p.nextReviewDate && new Date(p.nextReviewDate) <= now
        ).length;

        return {
          totalStudied: studiedCards.length,
          averageConfidence: Math.round(averageConfidence * 10) / 10,
          weakAreas,
          strongAreas,
          dueCount,
        };
      },

      resetProgress: () => {
        set({
          studiedCards: [],
          confidenceLevels: {},
          studyProgress: [],
        });
      },
    }),
    {
      name: 'flutter-interview-mastery-progress',
    }
  )
);
