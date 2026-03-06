import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { allCards as cards } from '@/data/allCards';
import type { Card } from '@/types/card';
import { CardGrid } from '@/components/CardGrid';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useProgressStore } from '@/store/useProgressStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Search,
  GraduationCap,
  Brain,
  Moon,
  Sun,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardDetail } from '@/pages/CardDetail';
import { StudyMode } from '@/pages/StudyMode';
import { QuizMode } from '@/pages/QuizMode';

function Dashboard() {
  const [filteredCards, setFilteredCards] = useState<Card[]>(cards);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { currentLanguage, darkMode, toggleLanguage, toggleDarkMode, studiedCards } = useProgressStore();
  const isArabic = currentLanguage === 'ar';

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
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
                  {isArabic ? '150+ كارد للسوق المصري' : '150+ cards for Egyptian market'}
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
            <Link to="/quiz">
              <Button variant="outline" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                {isArabic ? 'وضع الاختبار' : 'Quiz Mode'}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

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
                  <Badge variant="outline" className="cursor-pointer" onClick={() => setViewMode('grid')}>
                    {isArabic ? 'شبكة' : 'Grid'}
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer" onClick={() => setViewMode('list')}>
                    {isArabic ? 'قائمة' : 'List'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Cards */}
            <CardGrid cards={filteredCards} compact={viewMode === 'grid'} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8 text-center md:text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg">Flutter Mastery</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto md:mx-0">
                {isArabic
                  ? "مرجع شامل ومبسط للمطورين العرب. زكاة العلم نشره — شاركه مع زمايلك ❤️"
                  : "Comprehensive and simplified reference for developers. The best way to learn is by sharing ❤️"}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">{isArabic ? 'تواصل معي' : 'Connect with me'}</h4>
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://github.com/mohamed-hassan-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamed-hassan-pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:mohamedhassankamel9@gmail.com"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 py-1.5 px-4 rounded-full">
                🎁 {isArabic ? 'هدية رمضان 2026' : 'Ramadan 2026 Gift'}
              </Badge>
              <p className="text-xs text-slate-400 italic">
                {isArabic ? 'صُنع بحب بواسطة محمد حسن مبدع' : 'Created with love by Mohamed Hassan'}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 Flutter Interview Mastery. {isArabic ? 'للمجتمع العربي' : 'For the community'}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-purple-500 transition-colors">{isArabic ? 'عن المشروع' : 'About'}</a>
              <a href="#" className="hover:text-purple-500 transition-colors">{isArabic ? 'المساهمة' : 'Contribute'}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Dashboard />
          </motion.div>
        } />
        <Route path="/card/:id" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CardDetail />
          </motion.div>
        } />
        <Route path="/study" element={
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <StudyMode />
          </motion.div>
        } />
        <Route path="/quiz" element={
          <motion.div
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.2 }}
          >
            <QuizMode />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
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
