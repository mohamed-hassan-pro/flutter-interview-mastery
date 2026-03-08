import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { allCards as cards } from '@/data/allCards';
import type { Card } from '@/types/card';
import { CardGrid } from '@/components/CardGrid';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { ProgressTracker } from '@/components/ProgressTracker';
import { Hero } from '@/components/Hero';
import { MapLayout } from '@/components/MapLayout';
import { SyncModal } from '@/components/SyncModal';
import { useProgressStore } from '@/store/useProgressStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Search,
  GraduationCap,
  Brain,
  Moon,
  Globe,
  Github,
  Linkedin,
  Mail,
  Sun
} from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
import { CardDetail } from '@/pages/CardDetail';
import { StudyMode } from '@/pages/StudyMode';
import { QuizMode } from '@/pages/QuizMode';
import { ComingSoonModal } from '@/components/ComingSoonModal';

function Dashboard() {
  const [filteredCards, setFilteredCards] = useState<Card[]>(cards);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('map');
  const { currentLanguage, darkMode, toggleLanguage, toggleDarkMode, studiedCards } = useProgressStore();
  const isArabic = currentLanguage === 'ar';

  useEffect(() => {
    console.log("App mounted - Flutter Interview Mastery");
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header - Made smaller and sticky */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold text-slate-900 dark:text-white ${isArabic ? 'arabic-text' : ''}`}>
                  {isArabic ? 'إتقان مقابلات Flutter' : 'Flutter Interview Mastery'}
                </h1>
                <p className={`text-xs text-readable-muted ${isArabic ? 'arabic-text mt-0.5' : ''}`}>
                  {isArabic ? '150+ أفضل توبيك' : '150+ Best Topics'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="hidden sm:flex"
              >
                <Globe className="w-4 h-4 mr-2" />
                {isArabic ? 'EN' : 'AR'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              <SyncModal />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <Link to="/">
              <Button variant="secondary" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                {isArabic ? 'الرئيسية' : 'Dashboard'}
              </Button>
            </Link>
            <Link to="/study">
              <Button variant="outline" size="sm">
                <GraduationCap className="w-4 h-4 mr-2" />
                {isArabic ? 'وضع الدراسة' : 'Study Mode'}
              </Button>
            </Link>
            {/* <Link to="/quiz">
              <Button variant="outline" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                {isArabic ? 'محاكاة المقابلات' : 'Interview Simulation'}
              </Button>
            </Link> */}
            <ComingSoonModal>
              <Button variant="outline" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                {isArabic ? 'محاكاة المقابلات' : 'Interview Simulation'}
              </Button>
            </ComingSoonModal>
          </nav>
        </div>
      </header>

      {/* Hero moves BELOW header and adjusts padding */}
      <div className="mt-0">
        <Hero
          onStart={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Search */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5 text-slate-500" />
                <span className="font-semibold">{isArabic ? 'البحث' : 'Search'}</span>
              </div>
              <SearchBar cards={cards} onSearchResults={setFilteredCards} />
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <FilterPanel cards={cards} onFilterChange={setFilteredCards} />
            </div>

            {/* Progress */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <ProgressTracker totalCards={cards.length} />
            </div>
          </aside>

          {/* Cards Grid */}
          <div className="lg:col-span-3">
            {/* Stats Bar */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {filteredCards.length}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">
                      {isArabic ? 'كارد' : 'cards'}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      {studiedCards.length}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">
                      {isArabic ? 'تمت الدراسة' : 'studied'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={viewMode === 'map' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setViewMode('map')}>
                    {isArabic ? 'خريطة المواضيع' : 'Map'}
                  </Badge>
                  <Badge variant={viewMode === 'grid' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setViewMode('grid')}>
                    {isArabic ? 'شبكة' : 'Grid'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Cards */}
            {viewMode === 'map' ? (
              <MapLayout cards={filteredCards} />
            ) : (
              <CardGrid cards={filteredCards} compact={true} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-8 py-8 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-6 text-center md:text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-base">Flutter Interview Mastery</h3>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">{isArabic ? 'تواصل معي' : 'Connect with me'}</h4>
              <div className="flex gap-3 justify-center md:justify-start">
                <a
                  href="https://github.com/mohamed-hassan-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamed-hassan-pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:mohamedhassankamel9@gmail.com"
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 py-1 px-3 rounded-full text-xs">
                🎁 {isArabic ? 'هدية بمناسبة إتمامي 20 عاماً' : 'Gift for turning 20 years old'}
              </Badge>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {isArabic ? 'صُنع بحب بواسطة محمد حسن' : 'Created with love by Mohamed Hassan'}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 Flutter Interview Mastery.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-purple-500 transition-colors">{isArabic ? 'عن المشروع' : 'About'}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mount Indicator - Debug ONLY */}
      <div className="fixed bottom-0 right-0 p-1 text-[8px] text-slate-400 pointer-events-none opacity-20">
        v1.0.1-mounted
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/card/:id" element={<CardDetail />} />
      <Route path="/study" element={<StudyMode />} />
      <Route path="/quiz" element={<QuizMode />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
