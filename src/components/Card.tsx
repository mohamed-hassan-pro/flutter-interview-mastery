import { motion } from 'framer-motion';
import type { Card as CardType } from '@/types/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Code,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Star,
  Building2,
  TrendingUp,
  ArrowRight,
  Clock
} from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { Link } from 'react-router-dom';

interface CardProps {
  card: CardType;
  compact?: boolean;
}

export function Card({ card, compact = false }: CardProps) {
  const { currentLanguage, studiedCards, confidenceLevels, addStudied } = useProgressStore();
  const isStudied = studiedCards.includes(card.id);
  const confidence = confidenceLevels[card.id] || 0;
  const isArabic = currentLanguage === 'ar';

  const levelColors = {
    Junior: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Mid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Senior: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const frequencyColors = {
    Rare: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    Common: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Very Common': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Critical: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
      >
        <Link to={`/card/${card.id}`} className="block">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">#{card.number}</span>
              <h3 className={`font-bold text-slate-900 dark:text-white line-clamp-1 ${isArabic ? 'arabic-text' : ''}`}>
                {isArabic && card.titleAr ? card.titleAr : card.title}
              </h3>
            </div>
            <div className="flex gap-1">
              {isStudied && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              {confidence > 0 && (
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < confidence ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge variant="secondary" className={levelColors[card.level]}>
              {card.level}
            </Badge>
            <Badge variant="secondary" className={frequencyColors[card.frequency]}>
              {card.frequency}
            </Badge>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono text-slate-500 dark:text-slate-400">#{card.number}</span>
              {isStudied && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {isArabic ? 'تمت الدراسة' : 'Studied'}
                </Badge>
              )}
            </div>
            <h2 className={`text-2xl font-bold text-slate-900 dark:text-white ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic && card.titleAr ? card.titleAr : card.title}
            </h2>
            {card.titleAr && !isArabic && (
              <p className="text-readable-muted text-sm mt-1 arabic-text">{card.titleAr}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={levelColors[card.level]}>
              {card.level}
            </Badge>
            <Badge className={frequencyColors[card.frequency]}>
              {card.frequency}
            </Badge>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Confidence Rating */}
        {confidence > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {isArabic ? 'مستوى الثقة:' : 'Confidence:'}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < confidence ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                    }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Definition Section */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <h3 className={`text-lg font-semibold text-slate-900 dark:text-white ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic ? 'التعريف' : 'Definition'}
          </h3>
        </div>
        <p className={`text-readable mb-3 ${isArabic ? 'arabic-text font-medium' : ''}`}>{card.definition.summary}</p>
        <p className={`text-readable-muted text-sm mb-4 ${isArabic ? 'arabic-text' : ''}`}>{card.definition.detailed}</p>

        {card.definition.analogy && (
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-r-4 border-purple-500">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              <span className={`font-bold text-purple-900 dark:text-purple-200 ${isArabic ? 'arabic-text' : ''}`}>
                {isArabic ? 'مثال توضيحي (Analogy)' : 'Analogy'}
              </span>
            </div>
            <p className={`text-sm text-purple-800 dark:text-purple-100 font-medium ${isArabic ? 'arabic-text' : ''}`}>{card.definition.analogy}</p>
          </div>
        )}

        {/* Key Points */}
        <div className="mt-4 text-readable">
          <h4 className={`font-bold text-slate-900 dark:text-white mb-2 ${isArabic ? 'arabic-text border-r-2 border-purple-400 pr-2' : ''}`}>
            {isArabic ? 'نقاط رئيسية:' : 'Key Points:'}
          </h4>
          <ul className={`list-disc list-inside space-y-1.5 ${isArabic ? 'arabic-text mr-4' : ''}`}>
            {card.definition.keyPoints.map((point, idx) => (
              <li key={idx} className="text-sm">{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code Example */}
      {card.definition.codeExample && (
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {isArabic ? 'مثال برمجي' : 'Code Example'}
            </h3>
          </div>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{card.definition.codeExample.code}</code>
          </pre>
        </div>
      )}

      {/* Questions */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold">?</div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {isArabic ? 'أسئلة المقابلة' : 'Interview Questions'}
          </h3>
        </div>
        <div className="space-y-3">
          {card.questions.map((q, idx) => (
            <div key={idx} className="border dark:border-slate-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
              <div className="flex justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {q.type}
                </Badge>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isArabic ? 'الصعوبة:' : 'Difficulty:'} {q.difficulty}/5
                </span>
              </div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {isArabic && q.questionAr ? q.questionAr : q.question}
              </p>
              {q.expectedAnswer?.timeToAnswer && (
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3 h-3" />
                  {q.expectedAnswer.timeToAnswer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Common Pitfalls */}
      {card.commonPitfalls && card.commonPitfalls.length > 0 && (
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {isArabic ? 'أخطاء شائعة' : 'Common Pitfalls'}
            </h3>
          </div>
          <div className="space-y-3">
            {card.commonPitfalls.map((pitfall, idx) => (
              <div key={idx} className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <p className="font-medium text-amber-800 dark:text-amber-300 text-sm">{pitfall.mistake}</p>
                <p className="text-amber-700 dark:text-amber-400 text-xs mt-1">{pitfall.whyWrong}</p>
                <p className="text-green-700 dark:text-green-400 text-xs mt-1">
                  <span className="font-medium">{isArabic ? 'الصح:' : 'Correct:'}</span> {pitfall.correctApproach}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Revision */}
      {card.quickRevision && (
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-yellow-50 dark:bg-yellow-900/10">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {isArabic ? 'مراجعة سريعة' : 'Quick Revision'}
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-1 mb-3">
            {card.quickRevision.bulletPoints?.map((point, idx) => (
              <li key={idx} className="text-sm text-slate-700 dark:text-slate-300">{point}</li>
            ))}
          </ul>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
              <span className="mr-1">🧠</span>
              {card.quickRevision.memoryHook}
            </p>
          </div>
          {card.quickRevision.cheatSheet && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
              {card.quickRevision.cheatSheet}
            </p>
          )}
        </div>
      )}

      {/* Company Tags */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {isArabic ? 'الشركات' : 'Companies'}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {card.companyTags.map((company) => (
            <Badge key={company} variant="outline" className="text-xs">
              {company}
            </Badge>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-slate-600 dark:text-slate-400">
              {isArabic ? 'الشعبية:' : 'Popularity:'} {card.egyptianMarket.popularity}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-slate-600 dark:text-slate-400">
              {isArabic ? 'تأثير الراتب:' : 'Salary Impact:'} {card.egyptianMarket.salaryImpact}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex gap-3">
          {!isStudied && (
            <Button
              onClick={() => addStudied(card.id)}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {isArabic ? 'تحديد كمُدرَّس' : 'Mark as Studied'}
            </Button>
          )}
          <Link to={`/card/${card.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              {isArabic ? 'عرض التفاصيل' : 'View Details'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
