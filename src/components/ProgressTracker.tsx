import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Target,
  TrendingUp,
  AlertTriangle,
  Star,
  Award,
  Zap,
  RotateCcw
} from 'lucide-react';

interface ProgressTrackerProps {
  totalCards: number;
}

export function ProgressTracker({ totalCards }: ProgressTrackerProps) {
  const {
    studiedCards,
    confidenceLevels,
    getWeakCards,
    getStrongCards,
    getStudyStats,
    currentLanguage
  } = useProgressStore();

  const isArabic = currentLanguage === 'ar';
  const stats = getStudyStats();
  const weakCards = getWeakCards();
  const strongCards = getStrongCards();
  const progressPercentage = Math.round((studiedCards.length / totalCards) * 100);

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span className={`font-bold text-slate-900 dark:text-white ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'التقدم الإجمالي' : 'Overall Progress'}
            </span>
          </div>
          <Badge variant="secondary" className={`bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 ${isArabic ? 'arabic-text' : ''}`}>
            {progressPercentage}%
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-2.5 bg-slate-100 dark:bg-slate-700" />
        <p className={`text-sm text-readable-muted mt-2 font-medium ${isArabic ? 'arabic-text' : ''}`}>
          {isArabic
            ? `تمت مذاكرة ${studiedCards.length} من أصل ${totalCards} كارد`
            : `${studiedCards.length} of ${totalCards} cards studied`
          }
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Average Confidence */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className={`text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'متوسط الثقة' : 'Avg Confidence'}
            </span>
          </div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-slate-900 dark:text-white"
          >
            {stats.averageConfidence.toFixed(1)}
            <span className="text-sm text-slate-400 font-medium ml-1">/5</span>
          </motion.p>
        </Card>

        {/* Strong Areas */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-green-500" />
            <span className={`text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'نقاط القوة' : 'Strong Areas'}
            </span>
          </div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-green-600"
          >
            {strongCards.length}
          </motion.p>
        </Card>

        {/* Weak Areas */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className={`text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'نقاط الضعف' : 'Weak Areas'}
            </span>
          </div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-amber-600"
          >
            {weakCards.length}
          </motion.p>
        </Card>

        {/* Due for Review */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <RotateCcw className="w-4 h-4 text-rose-500" />
            <span className={`text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'للمراجعة اليوم' : 'Due for Review'}
            </span>
          </div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-rose-600"
          >
            {stats.dueCount}
          </motion.p>
        </Card>

        {/* Study Streak */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-purple-500" />
            <span className={`text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'تمت مذاكرتها' : 'Cards Studied'}
            </span>
          </div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-purple-600"
          >
            {stats.totalStudied}
          </motion.p>
        </Card>
      </div>

      {/* Confidence Distribution */}
      {Object.keys(confidenceLevels).length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <span className={`font-bold text-slate-900 dark:text-white ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'توزيع مستويات الثقة' : 'Confidence Distribution'}
            </span>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((level) => {
              const count = Object.values(confidenceLevels).filter(
                (c) => c === level
              ).length;
              const percentage =
                Object.keys(confidenceLevels).length > 0
                  ? Math.round((count / Object.keys(confidenceLevels).length) * 100)
                  : 0;

              return (
                <div key={level} className="flex items-center gap-2">
                  <div className="flex w-16">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < level ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'
                          }`}
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className="h-full bg-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {weakCards.length > 0 && (
        <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span className={`font-bold text-amber-900 dark:text-amber-200 ${isArabic ? 'arabic-text text-lg' : ''}`}>
              {isArabic ? 'المواضيع المقترحة للتركيز عليها' : 'Focus Areas'}
            </span>
          </div>
          <p className={`text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic
              ? `لديك ${weakCards.length} كروت بمستوى ثقة منخفض. ركز على هذه المواضيع لتعزيز جاهزيتك للمقابلات.`
              : `You have ${weakCards.length} cards with low confidence. Focus on these areas to improve your interview readiness.`
            }
          </p>
        </Card>
      )}
    </div>
  );
}
