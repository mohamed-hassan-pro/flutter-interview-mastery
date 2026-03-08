// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { allCards as cards } from '@/data/allCards';
import { useProgressStore } from '@/store/useProgressStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Brain,
  Target,
  ChevronRight
} from 'lucide-react';

interface QuizQuestion {
  cardId: string;
  question: string;
  questionAr?: string;
  type: string;
  difficulty: number;
  answer: string[];
}

export function QuizMode() {
  const { currentLanguage } = useProgressStore();
  const isArabic = currentLanguage === 'ar';

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<QuizQuestion[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Junior' | 'Mid' | 'Senior'>('all');
  const [questionCount, setQuestionCount] = useState(10);

  const generateQuiz = () => {
    let filteredCards = cards.filter(c => c.questions && c.questions.length > 0);
    if (selectedDifficulty !== 'all') {
      filteredCards = filteredCards.filter(c => c.level === selectedDifficulty);
    }

    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    const questions: QuizQuestion[] = selected.map(card => {
      const question = card.questions[0];
      return {
        cardId: card.id,
        question: question.question,
        questionAr: question.questionAr,
        type: question.type,
        difficulty: question.difficulty,
        answer: question.expectedAnswer?.points || ['See card for detailed answer'],
      };
    });

    setQuizQuestions(questions);
    setCurrentIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setQuizComplete(false);
    setQuizStarted(true);
    setShowAnswer(false);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    } else {
      setWrongAnswers([...wrongAnswers, quizQuestions[currentIndex]]);
    }

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setQuizComplete(true);
    }
  };

  const currentQuestion = quizQuestions[currentIndex];
  const progress = quizStarted ? ((currentIndex + 1) / quizQuestions.length) * 100 : 0;

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isArabic ? 'رجوع' : 'Back'}
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'وضع الاختبار' : 'Quiz Mode'}
            </h1>
            <p className={`text-readable-muted ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'اختبر معرفتك بأسئلة عشوائية' : 'Test your knowledge with random questions'}
            </p>
          </motion.div>

          <Card className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {isArabic ? 'المستوى:' : 'Difficulty:'}
              </label>
              <div className="flex gap-2 flex-wrap">
                {['all', 'Junior', 'Mid', 'Senior'].map((level) => (
                  <Button
                    key={level}
                    variant={selectedDifficulty === level ? 'default' : 'outline'}
                    onClick={() => setSelectedDifficulty(level as any)}
                  >
                    {level === 'all' ? (isArabic ? 'الكل' : 'All') : level}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isArabic ? 'عدد الأسئلة:' : 'Number of Questions:'}
              </label>
              <div className="flex gap-2 flex-wrap">
                {[5, 10, 15, 20].map((count) => (
                  <Button
                    key={count}
                    variant={questionCount === count ? 'default' : 'outline'}
                    onClick={() => setQuestionCount(count)}
                  >
                    {count}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={generateQuiz} className="w-full" size="lg">
              <Target className="w-5 h-5 mr-2" />
              {isArabic ? 'ابدأ الاختبار' : 'Start Quiz'}
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isArabic ? 'رجوع' : 'Back'}
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold mb-2">
              {isArabic ? 'اكتمل الاختبار!' : 'Quiz Complete!'}
            </h1>

            <div className="text-6xl font-bold text-purple-600 mb-2">
              {percentage}%
            </div>

            <p className={`text-xl text-readable-muted mb-8 ${isArabic ? 'arabic-text' : ''}`}>
              {score} / {quizQuestions.length} {isArabic ? 'إجابات صحيحة' : 'correct answers'}
            </p>

            {wrongAnswers.length > 0 && (
              <Card className="p-6 mb-6 text-left">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  {isArabic ? 'أسئلة تحتاج مراجعة:' : 'Questions to Review:'}
                </h2>
                <div className="space-y-3">
                  {wrongAnswers.map((q, idx) => (
                    <div key={idx} className="border dark:border-slate-700 rounded-lg p-3">
                      <p className={`font-bold text-readable ${isArabic ? 'arabic-text' : ''}`}>{isArabic && q.questionAr ? q.questionAr : q.question}</p>
                      <Link to={`/card/${q.cardId}`}>
                        <Button variant="link" size="sm">
                          {isArabic ? 'عرض الكارد' : 'View Card'}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={generateQuiz} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                {isArabic ? 'اختبار جديد' : 'New Quiz'}
              </Button>
              <Link to="/">
                <Button>
                  {isArabic ? 'العودة للرئيسية' : 'Back to Dashboard'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isArabic ? 'خروج' : 'Exit'}
              </Button>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">{score}</span>
              </div>
              <span className="text-sm text-slate-500">
                {currentIndex + 1} / {quizQuestions.length}
              </span>
            </div>
          </div>

          <Progress value={progress} className="mt-4" />
        </div>
      </header>

      {/* Question */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8"
          >
            <div className="flex justify-between items-start mb-6">
              <Badge variant="secondary">{currentQuestion.type}</Badge>
              <div className="flex items-center gap-1 text-slate-500">
                <Target className="w-4 h-4" />
                <span className="text-sm">Difficulty: {currentQuestion.difficulty}/5</span>
              </div>
            </div>

            <h2 className={`text-2xl font-bold mb-8 leading-relaxed ${isArabic ? 'arabic-text text-slate-900 dark:text-white' : ''}`}>
              {isArabic && currentQuestion.questionAr
                ? currentQuestion.questionAr
                : currentQuestion.question}
            </h2>

            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)} size="lg" className="w-full">
                {isArabic ? 'عرض الإجابة' : 'Show Answer'}
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6"
              >
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3">
                    {isArabic ? 'الإجابة:' : 'Answer:'}
                  </h3>
                  <ul className={`list-disc list-inside space-y-3 text-right ${isArabic ? 'arabic-text mr-4' : ''}`}>
                    {currentQuestion.answer.map((point, idx) => (
                      <li key={idx} className="text-green-800 dark:text-green-200 font-medium leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isArabic ? 'إجابة صحيحة' : 'Got it Right'}
                  </Button>
                  <Button
                    onClick={() => handleAnswer(false)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {isArabic ? 'إجابة خاطئة' : 'Got it Wrong'}
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
