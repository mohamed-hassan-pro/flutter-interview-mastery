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
  const { currentLanguage, darkMode, toggleDarkMode, studiedCards } = useProgressStore();
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors" dir="rtl">
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
              {/* Language toggle removed - App standardized to Arabic */}
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
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-3xl">💙</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-200 mb-8 arabic-text">
              صُنع بحب بواسطة محمد حسن مبدع
            </h3>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://www.linkedin.com/in/mohamed-hassan-pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full transition-all shadow-lg shadow-cyan-900/20 font-bold"
              >
                <Linkedin className="w-5 h-5" />
                <span className="arabic-text">تواصل معي على LinkedIn</span>
              </a>

              <a
                href="https://github.com/mohamed-hassan-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all border border-slate-700 font-bold"
              >
                <Github className="w-5 h-5" />
                <span className="arabic-text">شارك في التطوير</span>
              </a>
            </div>

            <div className="flex justify-center mb-12">
              <a
                href="mailto:mohamedhassankamel9@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-full transition-all border border-rose-500/30 font-bold"
              >
                <Mail className="w-5 h-5" />
                <span className="arabic-text">تواصل عبر الإيميل</span>
              </a>
            </div>
          </div>

          {/* Social Message Card */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 mb-12">
            <h4 className="text-xl font-bold text-white mb-4 arabic-text">🚀 الرحلة لسه في البداية!</h4>
            <p className="text-slate-400 mb-6 leading-relaxed arabic-text">
              بجهز محتوى أكثر عن SOLID, GOOD (Object-Oriented Design), Design Patterns, Principles — عشان الدليل دا يبقى مرجعك الكامل.
            </p>
            <div className="pt-6 border-t border-slate-700/50">
              <p className="text-slate-300 font-medium arabic-text">
                🙏 زكاة العلم نشره — لو الدليل فادك، شاركه مع زمايلك. يمكن تكون سبب في فتح باب خير لحد غيرك ❤️
              </p>
            </div>
          </div>

          <div className="text-slate-500 text-xs font-mono">
            <p>.Flutter Interview Mastery 2026 ©</p>
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
