import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Sparkles, Brain, Clock } from 'lucide-react';

interface ComingSoonModalProps {
    children: React.ReactNode;
}

export function ComingSoonModal({ children }: ComingSoonModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-cyan-500/20 bg-slate-900/95 backdrop-blur-xl">
                <DialogHeader className="items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 border border-cyan-500/30 animate-pulse">
                        <Brain className="w-8 h-8 text-cyan-400" />
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 arabic-text">
                        قريباً جداً!
                    </DialogTitle>
                    <DialogDescription className="text-slate-300 text-lg leading-relaxed arabic-text">
                        نحن نعمل حالياً على تطوير محاكاة ذكية للمقابلات باستخدام الذكاء الاصطناعي لمساعدتك في التدريب بشكل واقعي.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white arabic-text">
                            كن مستعداً!
                        </p>
                        <p className="text-xs text-slate-400 arabic-text">
                            سيتم إطلاق هذه الميزة في التحديث القادم.
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <Button
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 py-6 text-lg font-bold rounded-xl shadow-lg shadow-cyan-900/20"
                        onClick={() => {
                            // Close dialog manually if needed, but DialogTrigger handles toggle
                        }}
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        <span className="arabic-text">
                            انتظرونا
                        </span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
