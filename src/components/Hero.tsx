import { motion } from 'framer-motion';
import { Target, Trophy, Monitor, Map, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { ComingSoonModal } from './ComingSoonModal';

interface HeroProps {
    onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
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
                    🎁 <span className="arabic-text">
                        هدية للمطورين من <a href="https://www.linkedin.com/in/mohamed-hassan-pro/" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-cyan-400">
                            محمد حسن
                        </a>
                    </span>
                </motion.div>

                {/* Huge Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
                >
                    Flutter Interview Mastery
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

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12 arabic-text"
                >
                    وجهتك الأولى لإتقان مقابلات فلاتر البرمجية. نرافقك في رحلة تبدأ من المفاهيم الأساسية وتصل بك لدرجة الاحتراف في هندسة البرمجيات المتقدمة، مع تغطية أكثر من 150 موضوعاً تخصصياً وأمثلة تطبيقية شاملة.
                </motion.p>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center gap-16 max-w-2xl mx-auto mb-16"
                >
                    <div className="flex flex-col items-center relative">
                        <span className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">+150</span>
                        <span className="text-slate-400 text-sm">موضوع / كارد</span>
                    </div>
                    <div className="flex flex-col items-center relative mt-8 md:mt-0">
                        <span className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">10</span>
                        <span className="text-slate-400 text-sm">مستويات رئيسية</span>
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
                        <span className="text-lg font-bold arabic-text">ابدأ التعلم</span>
                    </Button>

                    <ComingSoonModal>
                        <Button size="lg" variant="outline" className="border-cyan-800 bg-slate-800 text-white hover:bg-slate-700 rounded-full px-8 h-14 relative overflow-hidden">
                            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                            <span className="text-lg font-bold arabic-text">محاكاة المقابلات</span>
                        </Button>
                    </ComingSoonModal>
                    <Button size="lg" variant="outline" className="border-cyan-800 bg-slate-800 text-white hover:bg-slate-700 rounded-full px-8 h-14" onClick={onStart}>
                        <Target className="w-5 h-5 mr-2 text-rose-400" />
                        <span className="text-lg font-bold arabic-text">خريطة الطريق</span>
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
                        <p className="text-slate-300 leading-relaxed font-medium arabic-text">
                            لو كنت في بداية رحلتك مع فلاتر وتستعد لأولى مقابلاتك التقنية
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-800 transition-colors">
                        <div className="w-12 h-12 mx-auto bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                            <Target className="w-6 h-6 text-rose-400" />
                        </div>
                        <p className="text-slate-300 leading-relaxed font-medium arabic-text">
                            لو هدفك مراجعة المفاهيم البرمجية والتحضير للمقابلات باحترافية
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-800 transition-colors">
                        <div className="w-12 h-12 mx-auto bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-yellow-400" />
                        </div>
                        <p className="text-slate-300 leading-relaxed font-medium arabic-text">
                            لو تسعى لتعميق معرفتك التقنية وبناء مشاريع بهندسة برمجية متينة
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
