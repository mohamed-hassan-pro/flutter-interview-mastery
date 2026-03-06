// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { allCards as cards } from '@/data/allCards';
import { useProgressStore } from '@/store/useProgressStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  CheckCircle,
  Star,
  BookOpen,
  Code,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';

export function StudyMode() {
  const navigate = useNavigate();
  const { currentLanguage, studiedCards, confidenceLevels, addStudied, setConfidence } = useProgressStore();
  const isArabic = currentLanguage === 'ar';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const currentCard = shuffledCards[currentIndex];
  const isStudied = studiedCards.includes(currentCard.id);
  const confidence = confidenceLevels[currentCard.id] || 0;
  const progress = ((currentIndex + 1) / shuffledCards.length) * 100;

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setIsShuffled(true);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const resetOrder = () => {
    setShuffledCards(cards);
    setIsShuffled(false);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === ' ') setShowAnswer(!showAnswer);
    if (e.key >= '1' && e.key <= '5') {
      setConfidence(currentCard.id, parseInt(e.key));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showAnswer, currentCard]);

  const levelColors = {
    Junior: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Mid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Senior: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isArabic ? 'رجوع' : 'Back'}
              </Button>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                {currentIndex + 1} / {shuffledCards.length}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isShuffled ? resetOrder : shuffleCards}
                  title={isShuffled ? 'Reset order' : 'Shuffle'}
                >
                  {isShuffled ? <RotateCcw className="w-4 h-4" /> : <Shuffle className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Progress value={progress} className="mt-4" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-slate-500">#{currentCard.number}</span>
                    {isStudied && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {isArabic ? 'تمت الدراسة' : 'Studied'}
                      </Badge>
                    )}
                  </div>
                  <h1 className={`text-2xl font-bold text-slate-900 dark:text-white ${isArabic ? 'arabic-text' : ''}`}>
                    {isArabic && currentCard.titleAr ? currentCard.titleAr : currentCard.title}
                  </h1>
                </div>
                <Badge className={levelColors[currentCard.level]}>
                  {currentCard.level}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentCard.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>

            {/* Definition */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h2 className={`font-semibold text-lg ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'التعريف' : 'Definition'}</h2>
              </div>
              <p className={`text-readable mb-3 ${isArabic ? 'arabic-text font-medium' : ''}`}>{currentCard.definition.summary}</p>

              {currentCard.definition.analogy && (
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl border-r-4 border-purple-500 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-4 h-4 text-purple-600" />
                    <span className={`text-sm font-bold text-purple-900 dark:text-purple-200 ${isArabic ? 'arabic-text' : ''}`}>
                      {isArabic ? 'مثال توضيحي (Analogy)' : 'Analogy'}
                    </span>
                  </div>
                  <p className={`text-sm text-purple-800 dark:text-purple-100 font-medium leading-relaxed ${isArabic ? 'arabic-text' : ''}`}>{currentCard.definition.analogy}</p>
                </div>
              )}
            </div>

            {/* Code Example */}
            {showCode && currentCard.definition.codeExample && (
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    <h2 className="font-semibold">{isArabic ? 'مثال برمجي' : 'Code Example'}</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowCode(false)}>
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{currentCard.definition.codeExample.code}</code>
                </pre>
              </div>
            )}

            {!showCode && (
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <Button variant="outline" onClick={() => setShowCode(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  {isArabic ? 'إظهار الكود' : 'Show Code'}
                </Button>
              </div>
            )}

            {/* Questions */}
            {currentCard.questions && currentCard.questions.length > 0 && (
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className={`font-bold text-lg mb-4 border-r-2 border-purple-400 pr-2 ${isArabic ? 'arabic-text' : ''}`}>
                  {isArabic ? 'أسئلة المقابلة' : 'Interview Questions'}
                </h2>
                <div className="space-y-4">
                  {currentCard.questions.slice(0, 2).map((q, idx) => (
                    <div key={idx} className="border dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/20">
                      <div className="flex justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">{q.type}</Badge>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Difficulty: {q.difficulty}/5</span>
                      </div>
                      <p className={`text-readable font-bold ${isArabic ? 'arabic-text' : ''}`}>
                        {isArabic && q.questionAr ? q.questionAr : q.question}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Revision */}
            {currentCard.quickRevision && (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10">
                <h2 className={`font-bold text-lg mb-4 border-r-2 border-yellow-400 pr-2 ${isArabic ? 'arabic-text' : ''}`}>
                  {isArabic ? 'مراجعة سريعة' : 'Quick Revision'}
                </h2>
                <ul className={`list-disc list-inside space-y-3 mb-5 ${isArabic ? 'arabic-text mr-4' : ''}`}>
                  {currentCard.quickRevision.bulletPoints?.map((point, idx) => (
                    <li key={idx} className="text-readable">{point}</li>
                  ))}
                </ul>
                {currentCard.quickRevision.memoryHook && (
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 shadow-sm">
                    <p className={`font-bold text-purple-700 dark:text-purple-300 ${isArabic ? 'arabic-text' : ''}`}>
                      🧠 {currentCard.quickRevision.memoryHook}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {!isStudied && (
                  <Button onClick={() => addStudied(currentCard.id)} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isArabic ? 'تحديد كمُدرَّس' : 'Mark as Studied'}
                  </Button>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">{isArabic ? 'الثقة:' : 'Confidence:'}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <Button
                        key={level}
                        variant={confidence >= level ? 'default' : 'outline'}
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => setConfidence(currentCard.id, level)}
                      >
                        <Star className={`w-4 h-4 ${confidence >= level ? 'fill-white' : ''}`} />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-slate-400">
                {isArabic
                  ? 'اختصارات: ← → للتنقل | مسافة لإظهار الإجابة | 1-5 للثقة'
                  : 'Shortcuts: ← → to navigate | Space for answer | 1-5 for confidence'
                }
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevCard}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {isArabic ? 'السابق' : 'Previous'}
          </Button>

          <Button
            variant="outline"
            onClick={nextCard}
            disabled={currentIndex === shuffledCards.length - 1}
          >
            {isArabic ? 'التالي' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
