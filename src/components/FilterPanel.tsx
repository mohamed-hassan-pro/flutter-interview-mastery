import { useState } from 'react';
import type { Card, Level, Frequency } from '@/types/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Filter, RotateCcw } from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { getAllTags, getAllCompanies } from '@/data/allCards';

interface FilterPanelProps {
  cards: Card[];
  onFilterChange: (filteredCards: Card[]) => void;
}

interface FilterState {
  level: Level | 'All';
  company: string | 'All';
  tags: string[];
  frequency: Frequency | 'All';
  showStudied: boolean | 'all';
  showWeakOnly: boolean;
  showDueOnly: boolean;
}

export function FilterPanel({ cards, onFilterChange }: FilterPanelProps) {
  const { currentLanguage, studiedCards, getWeakCards, getDueCards } = useProgressStore();
  const isArabic = currentLanguage === 'ar';
  const allTags = getAllTags();
  const allCompanies = getAllCompanies();
  const weakCards = getWeakCards();
  const dueCards = getDueCards();

  const [filters, setFilters] = useState<FilterState>({
    level: 'All',
    company: 'All',
    tags: [],
    frequency: 'All',
    showStudied: 'all',
    showWeakOnly: false,
    showDueOnly: false,
  });

  const applyFilters = (newFilters: FilterState) => {
    let filtered = [...cards];

    if (newFilters.level !== 'All') {
      filtered = filtered.filter((card) => card.level === newFilters.level);
    }

    if (newFilters.company !== 'All') {
      filtered = filtered.filter((card) =>
        card.companyTags.includes(newFilters.company)
      );
    }

    if (newFilters.tags.length > 0) {
      filtered = filtered.filter((card) =>
        newFilters.tags.some((tag) => card.tags.includes(tag))
      );
    }

    if (newFilters.frequency !== 'All') {
      filtered = filtered.filter((card) => card.frequency === newFilters.frequency);
    }

    if (newFilters.showStudied !== 'all') {
      filtered = filtered.filter((card) =>
        newFilters.showStudied
          ? studiedCards.includes(card.id)
          : !studiedCards.includes(card.id)
      );
    }

    if (newFilters.showWeakOnly) {
      filtered = filtered.filter((card) => weakCards.includes(card.id));
    }

    if (newFilters.showDueOnly) {
      filtered = filtered.filter((card) => dueCards.includes(card.id));
    }

    onFilterChange(filtered);
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    updateFilter('tags', newTags);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      level: 'All',
      company: 'All',
      tags: [],
      frequency: 'All',
      showStudied: 'all',
      showWeakOnly: false,
      showDueOnly: false,
    };
    setFilters(defaultFilters);
    onFilterChange(cards);
  };

  const hasActiveFilters =
    filters.level !== 'All' ||
    filters.company !== 'All' ||
    filters.tags.length > 0 ||
    filters.frequency !== 'All' ||
    filters.showStudied !== 'all' ||
    filters.showWeakOnly ||
    filters.showDueOnly;

  return (
    <Accordion type="single" collapsible defaultValue="filters">
      <AccordionItem value="filters" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className={`font-semibold ${isArabic ? 'arabic-text' : ''}`}>{isArabic ? 'عوامل التصفية' : 'Filters'}</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className={`ml-2 ${isArabic ? 'arabic-text' : ''}`}>
                {isArabic ? 'نشط' : 'Active'}
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          {/* Level Filter */}
          <div>
            <label className={`text-sm font-bold mb-2 block text-slate-900 dark:text-slate-100 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'المستوى' : 'Level'}
            </label>
            <Select
              value={filters.level}
              onValueChange={(value) => updateFilter('level', value as Level | 'All')}
            >
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? 'اختر المستوى' : 'Select level'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className={isArabic ? 'arabic-text' : ''}>{isArabic ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Company Filter */}
          <div>
            <label className={`text-sm font-bold mb-2 block text-slate-900 dark:text-slate-100 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'الشركة' : 'Company'}
            </label>
            <Select
              value={filters.company}
              onValueChange={(value) => updateFilter('company', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? 'اختر الشركة' : 'Select company'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className={isArabic ? 'arabic-text' : ''}>{isArabic ? 'الكل' : 'All'}</SelectItem>
                {allCompanies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Frequency Filter */}
          <div>
            <label className={`text-sm font-bold mb-2 block text-slate-900 dark:text-slate-100 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'التكرار' : 'Frequency'}
            </label>
            <Select
              value={filters.frequency}
              onValueChange={(value) => updateFilter('frequency', value as Frequency | 'All')}
            >
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? 'اختر التكرار' : 'Select frequency'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className={isArabic ? 'arabic-text' : ''}>{isArabic ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="Rare">Rare</SelectItem>
                <SelectItem value="Common">Common</SelectItem>
                <SelectItem value="Very Common">Very Common</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags Filter */}
          <div>
            <label className={`text-sm font-bold mb-2 block text-slate-900 dark:text-slate-100 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'الوسوم' : 'Tags'}
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 10).map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Study Status */}
          <div>
            <label className={`text-sm font-bold mb-2 block text-slate-900 dark:text-slate-100 ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'حالة الدراسة' : 'Study Status'}
            </label>
            <Select
              value={filters.showStudied.toString()}
              onValueChange={(value) =>
                updateFilter('showStudied', value === 'all' ? 'all' : value === 'true')
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? 'اختر الحالة' : 'Select status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className={isArabic ? 'arabic-text' : ''}>{isArabic ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="true" className={isArabic ? 'arabic-text' : ''}>{isArabic ? 'تمت الدراسة' : 'Studied'}</SelectItem>
                <SelectItem value="false" className={isArabic ? 'arabic-text' : ''}>{isArabic ? 'لم تُدرَّس' : 'Not Studied'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Weak Areas */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="weakOnly"
              checked={filters.showWeakOnly}
              onChange={(e) => updateFilter('showWeakOnly', e.target.checked)}
              className="rounded border-slate-300"
            />
            <label htmlFor="weakOnly" className={`text-sm font-medium cursor-pointer ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'المناطق الضعيفة فقط' : 'Weak areas only'}
            </label>
          </div>

          {/* Due for Review */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="dueOnly"
              checked={filters.showDueOnly}
              onChange={(e) => updateFilter('showDueOnly', e.target.checked)}
              className="rounded border-slate-300"
            />
            <label htmlFor="dueOnly" className={`text-sm font-medium cursor-pointer ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'للمراجعة اليوم' : 'Due for review'}
            </label>
            {dueCards.length > 0 && (
              <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-[10px]">
                {dueCards.length}
              </Badge>
            )}
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className={`w-full ${isArabic ? 'arabic-text' : ''}`}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isArabic ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
