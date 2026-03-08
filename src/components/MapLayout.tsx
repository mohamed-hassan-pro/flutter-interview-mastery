import { Link } from 'react-router-dom';
import type { Card as CardType } from '@/types/card';
import { useProgressStore } from '@/store/useProgressStore';
import { Badge } from './ui/badge';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface MapLayoutProps {
    cards: CardType[];
}

export function MapLayout({ cards }: MapLayoutProps) {
    const { currentLanguage, studiedCards } = useProgressStore();
    const isArabic = currentLanguage === 'ar';

    // The cards are ordered 1 to 150. Group them into chunks of 15 representing the 10 levels.
    const levels = [];
    for (let i = 0; i < 150; i += 15) {
        const chunk = cards.slice(i, i + 15);
        if (chunk.length > 0) {
            levels.push({
                id: `level-${(i / 15) + 1}`,
                titleEn: `Level ${(i / 15) + 1}`,
                titleAr: `المستوى ${(i / 15) + 1}`,
                cards: chunk,
            });
        }
    }

    // To support search filtering, if cards length is not exactly 150, we might just show them directly or group them differently.
    // We'll calculate groups based on the filtered cards provided to this component.
    // If the total cards is < 150 (due to filtering), we can just show them in one group, or keep the 15-chunk logic.
    // Actually, grouping by card.number is safer.
    const groupedLevels = [];
    for (let levelIndex = 0; levelIndex < 10; levelIndex++) {
        const minId = levelIndex * 15 + 1;
        const maxId = (levelIndex + 1) * 15;
        const levelCards = cards.filter(c => c.number >= minId && c.number <= maxId);

        // Add custom titles based on topics (approximate)
        const titlesAr = [
            'أساسيات لغة Dart',
            'البرمجة كائنية التوجه OOP',
            'أساسيات Flutter (الجزء الأول)',
            'الـ State Management والتنقل',
            'الـ Architecture والتصميم النظيف',
            'تعاملات الشبكة (Networking & API)',
            'التخزين المحلي (Local Storage)',
            'رسوميات متقدمة وحركات (Animations)',
            'الأداء (Performance & Native)',
            'المواضيع المتقدمة والتسليم (Advanced & Deploy)'
        ];

        const titlesEn = [
            'Dart Fundamentals',
            'Object Oriented Programming',
            'Flutter Basics (Part 1)',
            'State Management & Navigation',
            'Clean Architecture & Design',
            'Networking & API Integration',
            'Local Storage & Databases',
            'Advanced UI & Animations',
            'Performance & Native Channels',
            'Advanced Topics & Deployment'
        ];

        if (levelCards.length > 0) {
            groupedLevels.push({
                id: `level-${levelIndex + 1}`,
                titleEn: `${titlesEn[levelIndex]} (Level ${levelIndex + 1})`,
                titleAr: `${titlesAr[levelIndex]} (المستوى ${levelIndex + 1})`,
                cards: levelCards,
            });
        }
    }

    // If no cards match standard grouping (e.g. completely custom filter), fallback
    const displayGroups = groupedLevels.length > 0 ? groupedLevels : [{
        id: 'filtered',
        titleEn: 'Search Results',
        titleAr: 'نتائج البحث',
        cards: cards
    }];

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Junior': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'Mid': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'Senior': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
        }
    };

    return (
        <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={displayGroups[0]?.id}>
                {displayGroups.map((group) => (
                    <AccordionItem
                        key={group.id}
                        value={group.id}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 overflow-hidden shadow-sm"
                    >
                        <AccordionTrigger className={`text-xl font-bold hover:no-underline py-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center gap-3 w-full ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-lg shadow-sm">
                                    {group.id.replace('level-', '')}
                                </div>
                                <span className={isArabic ? 'arabic-text' : ''}>
                                    {isArabic ? group.titleAr : group.titleEn}
                                </span>
                                <Badge variant="secondary" className="ml-auto mr-auto px-2 opacity-70">
                                    {group.cards.length} {isArabic ? 'توبيك' : 'topics'}
                                </Badge>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="pt-2 pb-6">
                            <div className="grid gap-3">
                                {group.cards.map((card) => {
                                    const isStudied = studiedCards.includes(card.id);
                                    return (
                                        <Link
                                            key={card.id}
                                            to={`/card/${card.id}`}
                                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition-all shadow-sm hover:shadow"
                                        >
                                            <div className={`flex items-start gap-3 sm:items-center ${isArabic ? 'flex-row-reverse sm:text-right' : ''}`}>
                                                <div className="text-sm font-mono text-slate-400 dark:text-slate-500 w-10 text-center shrink-0">
                                                    #{card.number}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className={`font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors ${isArabic ? 'arabic-text' : ''}`}>
                                                        {isArabic && card.titleAr ? card.titleAr : card.title}
                                                    </span>
                                                    <div className={`flex flex-wrap gap-2 mt-1 ${isArabic ? 'justify-end' : ''}`}>
                                                        <Badge className={`${getLevelColor(card.level)} text-[10px] px-1.5 py-0`}>
                                                            {card.level}
                                                        </Badge>
                                                        {card.tags && Array.isArray(card.tags) && card.tags.slice(0, 2).map(tag => (
                                                            <span key={tag} className="text-[10px] text-slate-500 bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`mt-3 sm:mt-0 flex items-center gap-3 shrink-0 ${isArabic ? 'flex-row-reverse sm:ml-0 sm:mr-4 justify-start' : 'sm:mr-0 sm:ml-4 justify-end'}`}>
                                                {isStudied && (
                                                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                                                        <CheckCircle className="w-4 h-4 mr-1 ml-1" />
                                                        <span className={isArabic ? 'arabic-text' : ''}>{isArabic ? 'تم' : 'Done'}</span>
                                                    </div>
                                                )}
                                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-slate-200 dark:border-slate-800 shadow-sm">
                                                    {isArabic ? <ArrowLeft className="w-4 h-4 text-cyan-600" /> : <ArrowRight className="w-4 h-4 text-cyan-600" />}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
