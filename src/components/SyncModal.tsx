import { useState } from 'react';
import { useProgressStore } from '@/store/useProgressStore';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Cloud, Copy, Upload, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function SyncModal() {
    const { currentLanguage } = useProgressStore();
    const isArabic = currentLanguage === 'ar';

    const [importCode, setImportCode] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleExport = () => {
        try {
            // The actual key used for progress storage is 'flutter-interview-mastery-progress'
            const data = localStorage.getItem('flutter-interview-mastery-progress');
            if (!data) throw new Error('No data found');

            const encoded = btoa(encodeURIComponent(data));
            navigator.clipboard.writeText(encoded);

            setIsCopied(true);
            toast.success(isArabic ? 'تم نسخ كود التقدم بنجاح!' : 'Progress code copied successfully!');
            setTimeout(() => setIsCopied(false), 3000);
        } catch {
            toast.error(isArabic ? 'حدث خطأ أثناء نسخ التقدم' : 'Error exporting progress');
        }
    };

    const handleImport = () => {
        try {
            if (!importCode.trim()) return;
            const decoded = decodeURIComponent(atob(importCode.trim()));

            // Basic validation
            const parsed = JSON.parse(decoded);
            if (parsed && parsed.state && parsed.state.studiedCards) {
                localStorage.setItem('flutter-interview-mastery-progress', decoded);
                toast.success(isArabic ? 'تم استعادة التقدم بنجاح! جاري التحديث...' : 'Progress restored! Reloading...');
                setTimeout(() => window.location.reload(), 1500);
            } else {
                throw new Error('Invalid format');
            }
        } catch {
            toast.error(isArabic ? 'الكود غير صحيح أومعطوب' : 'Invalid or corrupted progress code');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="group">
                    <Cloud className="w-5 h-5 text-slate-500 group-hover:text-cyan-500 transition-colors" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Cloud className="w-5 h-5 text-cyan-500" />
                        <span className={isArabic ? 'arabic-text' : ''}>
                            {isArabic ? 'مزامنة التقدم عبر الأجهزة' : 'Sync Progress Across Devices'}
                        </span>
                    </DialogTitle>
                    <DialogDescription className={`text-sm text-slate-500 ${isArabic ? 'arabic-text text-right' : 'text-left'}`}>
                        {isArabic
                            ? 'بما أن التطبيق لا يحتاج تسجيل دخول، يمكنك نسخ كود التقدم الخاص بك واستعادته على أي جهاز آخر.'
                            : 'Since there is no backend login, you can copy your progress code and import it on any other device.'}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Export Section */}
                    <div className="space-y-3">
                        <h4 className={`text-sm font-semibold ${isArabic ? 'arabic-text text-right' : 'text-left'}`}>
                            {isArabic ? '1. استخراج التقدم (لنسخه لجهاز آخر)' : '1. Export Progress'}
                        </h4>
                        <Button
                            onClick={handleExport}
                            variant={isCopied ? "default" : "secondary"}
                            className={`w-full justify-center gap-2 ${isCopied ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                        >
                            {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            <span className={isArabic ? 'arabic-text' : ''}>
                                {isCopied
                                    ? (isArabic ? 'تم النسخ!' : 'Copied!')
                                    : (isArabic ? 'نسخ كود التقدم الخاص بي' : 'Copy My Progress Code')}
                            </span>
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">
                                {isArabic ? 'أو' : 'OR'}
                            </span>
                        </div>
                    </div>

                    {/* Import Section */}
                    <div className="space-y-3">
                        <h4 className={`text-sm font-semibold ${isArabic ? 'arabic-text text-right' : 'text-left'}`}>
                            {isArabic ? '2. استعادة التقدم (من جهاز آخر)' : '2. Import Progress'}
                        </h4>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={isArabic ? 'ألصق كود التقدم هنا...' : 'Paste progress code here...'}
                                className={`flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:text-slate-50 ${isArabic ? 'text-right' : 'text-left'}`}
                                value={importCode}
                                onChange={(e) => setImportCode(e.target.value)}
                            />
                            <Button onClick={handleImport} disabled={!importCode.trim()}>
                                <Upload className="w-4 h-4 sm:mr-2" />
                                <span className={`hidden sm:inline ${isArabic ? 'arabic-text' : ''}`}>
                                    {isArabic ? 'استعادة' : 'Import'}
                                </span>
                            </Button>
                        </div>
                        <p className={`text-xs text-amber-600 dark:text-amber-400 mt-1 ${isArabic ? 'arabic-text text-right' : 'text-left'}`}>
                            {isArabic ? '⚠️ تنبيه: استعادة التقدم ستستبدل التقدم الحالي على هذا الجهاز.' : '⚠️ Warning: Importing will overwrite your current progress on this device.'}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
