
// @ts-nocheck
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allCards as cards, getPrerequisites, getNextSteps } from '@/data/allCards';
import { useProgressStore } from '@/store/useProgressStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  BookOpen,
  Code,
  AlertTriangle,
  Lightbulb,
  Building2,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage, studiedCards, confidenceLevels, addStudied, setConfidence } = useProgressStore();
  const isArabic = currentLanguage === 'ar';

  const card = cards.find((c) => c.id === id);
  const currentIndex = cards.findIndex((c) => c.id === id);
  const prevCard = currentIndex > 0 ? cards[currentIndex - 1] : null;
  const nextCard = currentIndex < cards.length - 1 ? cards[currentIndex + 1] : null;

  const [showAnswer, setShowAnswer] = useState<number | null>(null);

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Card not found</h1>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isStudied = studiedCards.includes(card.id);
  const confidence = confidenceLevels[card.id] || 0;
  const prerequisites = getPrerequisites(card.id);
  const nextSteps = getNextSteps(card.id);

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isArabic ? 'رجوع' : 'Back'}
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">
                {currentIndex + 1} / {cards.length}
              </span>
            </div>

            <div className="flex gap-2">
              {prevCard && (
                <Button variant="outline" size="icon" onClick={() => navigate(`/card/${prevCard.id}`)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              {nextCard && (
                <Button variant="outline" size="icon" onClick={() => navigate(`/card/${nextCard.id}`)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
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
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {card.title}
                </h1>
                {card.titleAr && (
                  <p className="text-readable-muted mt-1 arabic-text">{card.titleAr}</p>
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
              {card.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Definition */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <h2 className={`text-xl font-semibold ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'التعريف' : 'Definition'}</h2>
            </div>
            <p className={`text-lg text-readable mb-4 ${isArabic ? 'arabic-text' : ''}`}>{card.definition.summary}</p>
            <p className={`text-readable-muted mb-4 ${isArabic ? 'arabic-text' : ''}`}>{card.definition.detailed}</p>

            {card.definition.analogy && (
              <div className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-xl border-r-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                  <span className={`font-bold text-purple-900 dark:text-purple-200 ${isArabic ? 'arabic-text' : ''}`}>
                    {isArabic ? 'مثال توضيحي (Analogy)' : 'Analogy'}
                  </span>
                </div>
                <p className={`text-purple-800 dark:text-purple-100 leading-relaxed font-medium ${isArabic ? 'arabic-text' : ''}`}>{card.definition.analogy}</p>
              </div>
            )}

            <div className="mt-6">
              <h3 className={`font-bold text-lg mb-3 border-r-2 border-purple-400 pr-2 ${isArabic ? 'arabic-text' : ''}`}>
                {isArabic ? 'نقاط رئيسية:' : 'Key Points:'}
              </h3>
              <ul className={`list-disc list-inside space-y-3 ${isArabic ? 'arabic-text mr-4' : ''}`}>
                {card.definition.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-readable">{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code Example */}
          {card.definition.codeExample && (
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">{isArabic ? 'مثال برمجي' : 'Code Example'}</h2>
              </div>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{card.definition.codeExample.code}</code>
              </pre>
            </div>
          )}

          {/* Questions */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">?</div>
              <h2 className={`text-xl font-semibold ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'أسئلة المقابلة' : 'Interview Questions'}</h2>
            </div>
            <div className="space-y-4">
              {card.questions?.map((q, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary">{q.type}</Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">
                        {isArabic ? 'الصعوبة:' : 'Difficulty:'} {q.difficulty}/5
                      </span>
                      {q.expectedAnswer?.timeToAnswer && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {q.expectedAnswer.timeToAnswer}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`font-bold text-lg mb-3 ${isArabic ? 'arabic-text' : ''}`}>
                    {isArabic && q.questionAr ? q.questionAr : q.question}
                  </p>

                  {q.expectedAnswer && (
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAnswer(showAnswer === idx ? null : idx)}
                      >
                        {showAnswer === idx
                          ? (isArabic ? 'إخفاء الإجابة' : 'Hide Answer')
                          : (isArabic ? 'عرض الإجابة' : 'Show Answer')
                        }
                      </Button>

                      {showAnswer === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                        >
                          {q.expectedAnswer.points && (
                            <ul className="list-disc list-inside space-y-2 text-right">
                              {q.expectedAnswer.points.map((point, pidx) => (
                                <li key={pidx} className="text-green-800 dark:text-green-300 arabic-text leading-relaxed">{point}</li>
                              ))}
                            </ul>
                          )}
                          {q.expectedAnswer.codeExample && (
                            <pre className="mt-3 bg-slate-900 text-slate-50 p-3 rounded text-sm">
                              <code>{q.expectedAnswer.codeExample.after || q.expectedAnswer.codeExample.code}</code>
                            </pre>
                          )}
                        </motion.div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Interviewer Mind */}
          {card.interviewerMind && (
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className={`text-xl font-semibold mb-4 ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'ما يريده المحاور' : 'What Interviewers Want'}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    {isArabic ? 'إشارات إيجابية' : 'Green Flags'}
                  </h3>
                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${isArabic ? 'arabic-text mr-2' : ''}`}>
                    {card.interviewerMind.greenFlags?.map((flag, idx) => (
                      <li key={idx} className="text-green-800 dark:text-green-200">{flag}</li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-4 bg-red-50 dark:bg-red-900/20">
                  <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                    {isArabic ? 'إشارات سلبية' : 'Red Flags'}
                  </h3>
                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${isArabic ? 'arabic-text mr-2' : ''}`}>
                    {card.interviewerMind.redFlags?.map((flag, idx) => (
                      <li key={idx} className="text-red-800 dark:text-red-200">{flag}</li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    {isArabic ? 'ما يبحثون عنه' : 'What They Want'}
                  </h3>
                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${isArabic ? 'arabic-text mr-2' : ''}`}>
                    {card.interviewerMind.whatTheyWant?.map((want, idx) => (
                      <li key={idx} className="text-blue-800 dark:text-blue-200">{want}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          )}

          {/* Pitfalls */}
          {card.commonPitfalls && card.commonPitfalls.length > 0 && (
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className={`text-xl font-semibold ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'أخطاء شائعة' : 'Common Pitfalls'}</h2>
              </div>
              <div className="space-y-4">
                {card.commonPitfalls.map((pitfall, idx) => (
                  <Card key={idx} className="p-4 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
                    <p className={`font-bold text-amber-900 dark:text-amber-200 ${isArabic ? 'arabic-text' : ''}`}>{pitfall.mistake}</p>
                    <p className={`text-amber-800 dark:text-amber-300 text-sm mt-1.5 leading-relaxed ${isArabic ? 'arabic-text' : ''}`}>{pitfall.whyWrong}</p>
                    <p className={`text-green-800 dark:text-green-300 text-sm mt-3 font-medium ${isArabic ? 'arabic-text' : ''}`}>
                      <span className="font-bold underline decoration-green-500/30">{isArabic ? 'الصح:' : 'Correct:'}</span> {pitfall.correctApproach}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quick Revision */}
          {card.quickRevision && (
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-yellow-50 dark:bg-yellow-900/10">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h2 className={`text-xl font-semibold ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'مراجعة سريعة' : 'Quick Revision'}</h2>
              </div>
              <ul className={`list-disc list-inside space-y-3 mb-4 ${isArabic ? 'arabic-text mr-4' : ''}`}>
                {card.quickRevision.bulletPoints?.map((point, idx) => (
                  <li key={idx} className="text-readable">{point}</li>
                ))}
              </ul>
              {card.quickRevision.memoryHook && (
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800 shadow-sm">
                  <p className={`font-bold text-lg text-purple-700 dark:text-purple-300 ${isArabic ? 'arabic-text' : ''}`}>
                    🧠 {card.quickRevision.memoryHook}
                  </p>
                </div>
              )}
              {card.quickRevision.cheatSheet && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 font-mono">
                  {card.quickRevision.cheatSheet}
                </p>
              )}
            </div>
          )}

          {/* Company Tags */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">{isArabic ? 'الشركات' : 'Companies'}</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {card.companyTags?.map((company) => (
                <Badge key={company} variant="outline">{company}</Badge>
              ))}
            </div>
            {card.egyptianMarket && (
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {isArabic ? 'الشعبية:' : 'Popularity:'} {card.egyptianMarket.popularity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {isArabic ? 'تأثير الراتب:' : 'Salary Impact:'} {card.egyptianMarket.salaryImpact}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Linked Cards */}
          {(prerequisites.length > 0 || nextSteps.length > 0) && (
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4">{isArabic ? 'كروت مرتبطة' : 'Linked Cards'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {prerequisites.length > 0 && (
                  <div>
                    <h3 className="font-medium text-slate-600 dark:text-slate-400 mb-2">
                      {isArabic ? 'متطلبات سابقة:' : 'Prerequisites:'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {prerequisites.map((prereq) => (
                        <Link key={prereq.id} to={`/card/${prereq.id}`}>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                            {prereq.number}. {isArabic && prereq.titleAr ? prereq.titleAr : prereq.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {nextSteps.length > 0 && (
                  <div>
                    <h3 className="font-medium text-slate-600 dark:text-slate-400 mb-2">
                      {isArabic ? 'الخطوات التالية:' : 'Next Steps:'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {nextSteps.map((next) => (
                        <Link key={next.id} to={`/card/${next.id}`}>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                            {next.number}. {isArabic && next.titleAr ? next.titleAr : next.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex flex-col sm:flex-row gap-4">
              {!isStudied && (
                <Button onClick={() => addStudied(card.id)} className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isArabic ? 'تحديد كمُدرَّس' : 'Mark as Studied'}
                </Button>
              )}

              <div className="flex gap-2 flex-1">
                <span className="text-sm text-slate-600 dark:text-slate-400 self-center">
                  {isArabic ? 'مستوى الثقة:' : 'Confidence:'}
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Button
                      key={level}
                      variant={confidence >= level ? 'default' : 'outline'}
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => setConfidence(card.id, level)}
                    >
                      <Star className={`w-4 h-4 ${confidence >= level ? 'fill-white' : ''}`} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {prevCard ? (
            <Link to={`/card/${prevCard.id}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isArabic ? 'السابق' : 'Previous'}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextCard ? (
            <Link to={`/card/${nextCard.id}`}>
              <Button variant="outline">
                {isArabic ? 'التالي' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}
