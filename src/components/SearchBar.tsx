import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X, RotateCcw } from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import Fuse from 'fuse.js';
import type { Card } from '@/types/card';

interface SearchBarProps {
  cards: Card[];
  onSearchResults: (results: Card[]) => void;
}

export function SearchBar({ cards, onSearchResults }: SearchBarProps) {
  const { currentLanguage } = useProgressStore();
  const [query, setQuery] = useState('');
  const isArabic = currentLanguage === 'ar';

  const fuse = new Fuse(cards, {
    keys: [
      'title',
      'titleAr',
      'tags',
      'definition.summary',
      'definition.detailed',
      'definition.codeExample.code',
      'companyTags',
    ],
    threshold: 0.3,
    includeScore: true,
  });

  const [history, setHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('flutter-search-history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const addToHistory = (q: string) => {
    if (!q.trim()) return;
    const newHistory = [q, ...history.filter((h) => h !== q)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('flutter-search-history', JSON.stringify(newHistory));
  };

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      onSearchResults(cards);
      return;
    }

    const results = fuse.search(searchQuery);
    onSearchResults(results.map((result) => result.item));
    if (searchQuery.length > 2) addToHistory(searchQuery);
  }, [cards, fuse, onSearchResults, history]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const clearSearch = () => {
    setQuery('');
    onSearchResults(cards);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={isArabic ? 'البحث في الكروت...' : 'Search cards...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 pr-10 w-full"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showSuggestions && (history.length > 0 || (query && fuse.search(query).length > 0)) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-[60] overflow-hidden">
          {query && (
            <div className="p-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Suggestions</p>
              {fuse.search(query).slice(0, 3).map((res) => (
                <button
                  key={res.item.id}
                  onClick={() => {
                    setQuery(res.item.title);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors truncate"
                >
                  {res.item.title}
                </button>
              ))}
            </div>
          )}

          {history.length > 0 && (
            <div className="p-2 border-t border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Recent Searches</p>
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(h);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-3 h-3 text-slate-400" />
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {showSuggestions && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}
