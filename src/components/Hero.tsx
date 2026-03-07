import { motion } from 'framer-motion';
import { Target, Trophy, Github, Monitor, Map, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { useProgressStore } from '@/store/useProgressStore';

interface HeroProps {
    onStart: () => void;
    onQuiz: () => void;
}

export function Hero({ onStart, onQuiz }: HeroProps) {
    const { currentLanguage } = useProgressStore();
    const isArabic = currentLanguage === 'ar';

    return (
        <div className="relative overflow-hidden bg-slate-900 text-slate-50 py-20 px-4">
            {/* Background gradients */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-48 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 text-sm font-medium mb-8"
                >
                    🎁 <span className={isArabic ? 'arabic-text' : ''}>{isArabic ? 'هدية للمطورين العرب' : 'Gift for Developers'}</span>
                </motion.div>

                {/* Huge Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
                >
                    Flutter Mastery
                </motion.h1>

                {/* Subtitle with Rocket */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-4 text-4xl md:text-5xl font-bold mb-8"
                >
                    <span className="text-4xl text-rose-500">🚀</span>
                    <span className="text-white">Deep Dive</span>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12 ${isArabic ? 'arabic-text' : ''}`}
                >
                    {isArabic
                        ? 'دليل شامل ومُبسط لاجتياز مقابلات Flutter باللغة العربية. من الأساسيات لحـد الاحتراف — مع أمثلة عملية، تحديات تفاعلية، وتحضير كامل للمقابلات التقنية.'
                        : 'A comprehensive guide to ace Flutter interviews. From basics to advanced concepts — with practical examples, interactive quizzes, and full technical interview prep.'}
                </motion.p>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-12"
                >
                    <div className="flex flex-col items-center">
                        <Github className="w-8 h-8 text-slate-400 mb-2" />
                        <span className="text-slate-400 text-sm">{isArabic ? 'مفتوح المصدر' : 'Open Source'}</span>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-cyan-400 text-xs mt-1 hover:underline">
                            {isArabic ? 'شارك في التطوير →' : 'Contribute →'}
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">+150</span>
                        <span className="text-slate-400 text-sm">{isArabic ? 'موضوع / كارد' : 'Topics / Cards'}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">10</span>
                        <span className="text-slate-400 text-sm">{isArabic ? 'مستويات رئيسية' : 'Core Levels'}</span>
                    </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8 h-14" onClick={onStart}>
                        <Map className="w-5 h-5 mr-2" />
                        <span className={`text-lg font-bold ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'ابدأ التعلم' : 'Start Learning'}</span>
                    </Button>
                    <Button size="lg" variant="outline" className="border-cyan-800 bg-slate-800 text-white hover:bg-slate-700 rounded-full px-8 h-14" onClick={onQuiz}>
                        <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                        <span className={`text-lg font-bold ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'اختبر نفسك' : 'Test Yourself'}</span>
                    </Button>
                    <Button size="lg" variant="outline" className="border-cyan-800 bg-slate-800 text-white hover:bg-slate-700 rounded-full px-8 h-14" onClick={onStart}>
                        <Target className="w-5 h-5 mr-2 text-rose-400" />
                        <span className={`text-lg font-bold ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'خريطة الطريق' : 'Roadmap'}</span>
                    </Button>
                </motion.div>

                {/* Info Cards (Bottom) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid md:grid-cols-3 gap-6 text-left"
                >
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-800 transition-colors">
                        <div className="w-12 h-12 mx-auto bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                            <Monitor className="w-6 h-6 text-green-400" />
                        </div>
                        <p className={`text-slate-300 leading-relaxed font-medium ${isArabic ? 'arabic-text' : ''}`}>
                            {isArabic ? 'لو لسه بتبدأ طريقك في Flutter والمقابلات' : 'If you are just starting with Flutter interviews'}
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-800 transition-colors">
                        <div className="w-12 h-12 mx-auto bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                            <Target className="w-6 h-6 text-rose-400" />
                        </div>
                        <p className={`text-slate-300 leading-relaxed font-medium ${isArabic ? 'arabic-text' : ''}`}>
                            {isArabic ? 'لو بتراجع وتجهز لـ Technical Interviews' : 'If you are preparing for technical interviews'}
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-800 transition-colors">
                        <div className="w-12 h-12 mx-auto bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-yellow-400" />
                        </div>
                        <p className={`text-slate-300 leading-relaxed font-medium ${isArabic ? 'arabic-text' : ''}`}>
                            {isArabic ? 'لو عايز تعمق فهمك وتبني Architecture قوية' : 'If you want to deepen understanding and build solid Architecture'}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
