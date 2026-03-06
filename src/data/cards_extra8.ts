// @ts-nocheck
import type { Card } from '@/types/card';
const mk = (id: string, num: number, title: string, titleAr: string, level: string, freq: string, tags: string[], summary: string, kp: string[], code: string, qs: any[], pre: string[], nid: string, nt: string, hook: string, cheat: string, cos: string[], pop: string, sal: string): Card => ({ id, number: num, title, titleAr, level: level as any, frequency: freq as any, tags, definition: { summary, detailed: summary, analogy: '', keyPoints: kp, codeExample: { language: 'dart', code } }, questions: qs, interviewerMind: { whatTheyWant: kp.slice(0, 2), redFlags: ['لا يعرف ' + id], greenFlags: ['يشرح بعمق'] }, linkedCards: { prerequisites: pre, nextSteps: [{ id: nid, title: nt }], related: [] }, commonPitfalls: [{ mistake: 'تجاهل ' + title, whyWrong: 'ضروري', correctApproach: 'تعلّم ' + title, egyptianContext: 'مهم' }], answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة'], timeAllocation: { junior: '2 دق', mid: '3 دق', senior: '5 دق' }, keyPhrases: [id] }, quickRevision: { bulletPoints: kp.slice(0, 4), memoryHook: hook, cheatSheet: cheat }, companyTags: cos, egyptianMarket: { popularity: pop, salaryImpact: sal } });
const q = (t: string, q: string, qa: string, d: number, p: string[]) => ({ type: t as any, question: q, questionAr: qa, difficulty: d, expectedAnswer: { points: p, timeToAnswer: '2-3 minutes' } });

export const cardsExtra8: Card[] = [
    mk('flutter-web', 106, 'Flutter Web', 'Flutter للويب',
        'Mid', 'Common', ['Flutter', 'Web'],
        'Flutter Web: CanvasKit vs HTML renderer, SEO limitations, responsive design, PWA',
        ['CanvasKit: pixel-perfect but heavier', 'HTML renderer: lighter, better SEO', 'SEO limited: Google renders but slower', 'PWA support: service workers', 'flutter build web --web-renderer canvaskit', 'wasm (WebAssembly) support in Flutter 3.22+'],
        `// Flutter Web build
// flutter build web --release --web-renderer canvaskit
// flutter build web --release --web-renderer html

// Check if running on web
import 'package:flutter/foundation.dart';
if (kIsWeb) {
  // Web-specific behavior
  html.window.history.pushState({}, '', '/product/\$id');
}

// PWA manifest in web/manifest.json
// {
//   "name": "My Flutter App",
//   "start_url": "/",
//   "display": "standalone",
//   "theme_color": "#6B21A8",
//   "icons": [...]
// }`,
        [
            q('Theoretical', 'What is the difference between CanvasKit and HTML renderer?', 'ما الفرق بين CanvasKit و HTML renderer؟', 3, ['CanvasKit: pixel-perfect, heavier 2MB', 'HTML: lighter, better text selection/SEO', 'Choose based on use case']),
            q('Practical', 'How do you make a Flutter web app a PWA?', 'كيف تجعل Flutter web app بمثابة PWA؟', 3, ['flutter create adds PWA by default', 'Customize web/manifest.json', 'Service worker in web/flutter_service_worker.js']),
            q('Critical Thinking', 'What are the SEO limitations of Flutter Web?', 'ما حدود الـ SEO في Flutter Web؟', 3, ['Rendered as canvas, not DOM', 'Google crawls but slower than HTML', 'Use server-side rendering workarounds']),
            q('System Design', 'When would you choose Flutter Web over React/Next.js?', 'متى تختار Flutter Web على React/Next.js؟', 4, ['Existing Flutter codebase to share', 'Pixel-perfect cross-platform UI', 'Internal tools where SEO not needed']),
            q('Practical', 'Handle URL routing in Flutter web app', 'تعامل مع URL routing في Flutter web app', 3, ['GoRouter handles URL natively on web', 'Browser back/forward works', 'URL params in GoRoute'])
        ],
        ['testing-flutter'], 'state-restoration', 'State Restoration',
        'CanvasKit=pixel-perfect, HTML=lighter+SEO', 'flutter build web --web-renderer canvaskit|html | kIsWeb | PWA',
        ['International', 'ITWorx'], 'Growing', 'Major'),

    mk('state-restoration', 107, 'State Restoration', 'استعادة الحالة',
        'Senior', 'Rare', ['Flutter', 'State Management'],
        'RestorationMixin, RestorableInt, Android back stack, iOS state preservation',
        ['RestorationMixin on State', 'RestorableInt, RestorableString, etc.', 'registerForRestoration in initState', 'RestorationScope widget', 'Android: system kills background apps', 'iOS: preserveState on Navigator'],
        `class _CounterState extends State<CounterPage>
    with RestorationMixin {
  final _count = RestorableInt(0);

  @override
  String get restorationId => 'counter';

  @override
  void restoreState(RestorationBucket? old, bool initial) {
    registerForRestoration(_count, 'count');
  }

  @override
  void dispose() { _count.dispose(); super.dispose(); }
}`,
        [
            q('Theoretical', 'Why does Android kill background apps and how does Flutter handle it?', 'لماذا تقتل Android التطبيقات الموجودة في الخلفية؟', 3, ['Memory pressure kills processes', 'State restoration rebuilds from saved state', 'Flutter: RestorationMixin']),
            q('Practical', 'Implement state restoration for a form with multiple fields', 'نفذ state restoration لنموذج بحقول متعددة', 4, ['RestorableTextEditingController per field', 'Register each in restoreState()']),
            q('Deep Dive', 'What triggers state restoration in Flutter?', 'ما الذي يُشغّل state restoration في Flutter؟', 4, ['App killed by OS', 'cold restart after kill', 'WidgetsBinding.instance.restorationManager']),
            q('System Design', 'Design a multi-step wizard that survives process death', 'صمم wizard متعدد الخطوات يصمد عند موت العملية', 4, ['Each step has restorationId', 'Store current step as RestorableInt', 'Restore all field values']),
            q('Critical Thinking', 'Is state restoration always necessary?', 'هل state restoration ضرورية دائماً؟', 2, ['No — depends on app criticality', 'Forms and progress: yes', 'Simple apps: maybe not'])
        ],
        ['flutter-web'], 'dependency-injection', 'Dependency Injection',
        'State restoration = survive Android process death', 'RestorationMixin | RestorableInt | registerForRestoration | restorationId',
        ['ITWorx', 'Valeo'], 'Low', 'Major'),

    mk('dependency-injection', 108, 'Dependency Injection in Flutter', 'حقن التبعيات في Flutter',
        'Mid', 'Common', ['Flutter', 'Architecture', 'Design Patterns'],
        'get_it service locator, injectable codegen, manual DI, testing benefits',
        ['get_it: service locator pattern', 'injectable: codegen for get_it', 'RegisterSingleton vs RegisterFactory', 'Lazy singletons: only create when needed', 'DI enables testability', 'Contrast with singletons'],
        `// Using get_it
final getIt = GetIt.instance;

void setupDi() {
  // Singletons
  getIt.registerLazySingleton<Dio>(() => Dio(BaseOptions(baseUrl: Env.apiBase)));
  getIt.registerLazySingleton<AppDatabase>(() => AppDatabase());

  // Factories (new instance each time)
  getIt.registerFactory<HomeBloc>(() => HomeBloc(getIt<ProductUseCase>()));

  // Use cases
  getIt.registerLazySingleton<ProductUseCase>(
    () => ProductUseCase(getIt<ProductRepository>()));
  getIt.registerLazySingleton<ProductRepository>(
    () => ProductRepositoryImpl(getIt<Dio>(), getIt<AppDatabase>()));
}

// Usage
final bloc = getIt<HomeBloc>();`,
        [
            q('Theoretical', 'What is the difference between service locator and DI framework?', 'ما الفرق بين service locator وـ DI framework؟', 3, ['Service locator: pull dependencies', 'DI framework: inject at construction', 'get_it = service locator']),
            q('Practical', 'Set up get_it for a Flutter app with Repository and BLoC', 'أعدّ get_it لتطبيق Flutter مع Repository و BLoC', 3, ['Register Dio first', 'Register Repo depends on Dio', 'Register BLoC depends on UseCase']),
            q('Critical Thinking', 'How does DI improve testability compared to singletons?', 'كيف يحسّن DI الاختبارية مقارنة بـ singletons؟', 3, ['Pass mock implementation in tests', 'No global state to reset', 'Isolate unit under test']),
            q('Practical', 'Use injectable package to auto-generate DI setup', 'استخدم injectable package لتوليد DI setup تلقائياً', 4, ['@injectable annotation', '@module for external dependencies', 'build_runner generates code']),
            q('System Design', 'Design DI structure for a large Flutter app with 30+ features', 'صمم DI structure لتطبيق Flutter كبير بـ 30+ feature', 4, ['Feature modules', 'Lazy registration', 'Scope: app-scoped vs feature-scoped'])
        ],
        ['state-restoration'], 'design-patterns-flutter', 'Design Patterns in Flutter',
        'DI = inject dependencies, not create them inside', 'get_it | registerLazySingleton | registerFactory | injectable',
        ['All Companies'], 'High', 'Critical'),

    mk('design-patterns-flutter', 109, 'Design Patterns in Flutter', 'Design Patterns في Flutter',
        'Senior', 'Common', ['Flutter', 'Architecture', 'Design Patterns'],
        'Observer, Strategy, Command, Decorator, Proxy patterns in Flutter context',
        ['Observer: streams, setState, BLoC/streams', 'Strategy: different payment processors', 'Command: undo/redo actions', 'Decorator: widget composition', 'Proxy: logging, caching repository', 'Repository = proxy for data source'],
        `// Strategy Pattern — payment processors
abstract class PaymentStrategy {
  Future<bool> pay(double amount);
}

class PaymobStrategy implements PaymentStrategy {
  @override Future<bool> pay(double amount) async { /* Paymob API */ return true; }
}

class FawryStrategy implements PaymentStrategy {
  @override Future<bool> pay(double amount) async { /* Fawry API */ return true; }
}

class PaymentService {
  PaymentStrategy _strategy;
  PaymentService(this._strategy);

  void setStrategy(PaymentStrategy s) => _strategy = s;
  Future<bool> processPayment(double amount) => _strategy.pay(amount);
}

// Command Pattern — undo/redo
abstract class Command { void execute(); void undo(); }
class AddRentalCommand implements Command {
  final Rental rental;
  final RentalRepo repo;
  AddRentalCommand(this.rental, this.repo);
  @override void execute() => repo.add(rental);
  @override void undo() => repo.delete(rental.id);
}`,
        [
            q('Practical', 'Implement Strategy pattern for multiple payment providers', 'نفذ Strategy pattern لمزودي دفع متعددين', 3, ['Abstract PaymentStrategy', 'Paymob/Fawry implementations', 'Switch strategy at runtime']),
            q('Theoretical', 'How does Flutter\'s widget composition relate to Decorator pattern?', 'كيف يرتبط widget composition في Flutter بـ Decorator pattern؟', 3, ['Each widget wraps another', 'Adds behavior: Padding, Opacity, Clip', 'Non-intrusive decoration']),
            q('Practical', 'Implement Command pattern for undo/redo in a drawing app', 'نفذ Command pattern للـ undo/redo في drawing app', 4, ['Command interface with execute/undo', 'Stack of commands for history', 'Pop from undo, push to redo']),
            q('System Design', 'Identify design patterns in Flutter\'s framework itself', 'حدد design patterns في Flutter framework نفسه', 4, ['Observer: streams', 'Composite: widget tree', 'Builder: BuildContext', 'Strategy: text rendering']),
            q('Critical Thinking', 'When does using a design pattern hurt more than help?', 'متى يضر design pattern أكثر مما يفيد؟', 3, ['Overengineering simple problems', 'Pattern for pattern\'s sake', 'Adds complexity without benefit'])
        ],
        ['dependency-injection'], 'rx-dart', 'RxDart & Reactive Programming',
        'Patterns = proven solutions to common problems', 'Strategy | Observer(BLoC) | Command(undo) | Decorator(widgets)',
        ['ITWorx', 'Valeo', 'Swvl'], 'High', 'Major'),

    mk('rx-dart', 110, 'RxDart & Reactive Programming', 'RxDart والبرمجة التفاعلية',
        'Senior', 'Common', ['Flutter', 'Reactive', 'Streams'],
        'BehaviorSubject, PublishSubject, combineLatest, debounceTime, switchMap',
        ['BehaviorSubject: replays latest value', 'PublishSubject: no replay', 'switchMap: cancel previous, new subscription', 'combineLatest: merge multiple streams', 'debounceTime: wait for quiet period', 'throttleTime: rate limit events'],
        `import 'package:rxdart/rxdart.dart';

// BehaviorSubject — state stream
final _query$ = BehaviorSubject<String>.seeded('');
final _results$ = _query$
  .debounceTime(Duration(milliseconds: 300))
  .distinct()
  .switchMap((query) => searchApi(query).asStream())
  .shareReplay(maxSize: 1);

// In UI
StreamBuilder<List<Product>>(stream: _results$, builder: (ctx, snap) => ...)

// combineLatest: combine user + products
Rx.combineLatest2(user$, products$, (user, products) =>
  products.where((p) => p.isAvailableFor(user.tier)).toList()
)`,
        [
            q('Practical', 'Implement a search with debounce using RxDart', 'نفذ بحث مع debounce بـ RxDart', 3, ['BehaviorSubject for input', 'debounceTime(300ms)', 'switchMap to cancel old requests']),
            q('Theoretical', 'What is the difference between BehaviorSubject and PublishSubject?', 'ما الفرق بين BehaviorSubject و PublishSubject؟', 3, ['Behavior: replays last value to new subscribers', 'Publish: no replay, only new events']),
            q('Practical', 'Use combineLatest to merge user profile and product streams', 'استخدم combineLatest لدمج stream الملف الشخصي والمنتجات', 3, ['Rx.combineLatest2', 'Emits when any source emits', 'Both must emit at least once']),
            q('Deep Dive', 'What does switchMap do compared to flatMap?', 'ماذا يفعل switchMap مقارنة بـ flatMap؟', 4, ['switchMap: cancels previous inner stream', 'flatMap (mergeMap): keeps all ongoing', 'switchMap = search (cancel old results)']),
            q('Critical Thinking', 'When would you use RxDart over plain Dart streams?', 'متى تستخدم RxDart على Dart streams العادية؟', 3, ['Complex stream transformations', 'Multiple source combination', 'Replay and caching needs'])
        ],
        ['design-patterns-flutter'], 'flutter-impeller', 'Flutter Impeller & Rendering',
        'RxDart = superpowers for Dart streams', 'BehaviorSubject | debounceTime | switchMap | combineLatest | shareReplay',
        ['Swvl', 'Thndr', 'MaxAB'], 'Medium', 'Major'),

    mk('flutter-impeller', 111, 'Flutter Impeller Renderer', 'محرك Impeller في Flutter',
        'Senior', 'Common', ['Flutter', 'Performance', 'Rendering'],
        'Impeller replaces Skia: no shader compilation jank, predictable GPU performance',
        ['Impeller: pre-compiled shaders', 'No compilation jank on first frame', 'Default on iOS since Flutter 3.10', 'Android: opt-in flutter 3.16+', 'Metal on iOS, Vulkan on Android', 'Slower first build but smooth runtime'],
        `# Enable Impeller on Android
# AndroidManifest.xml
# <meta-data android:name="io.flutter.embedding.android.EnableImpeller"
#            android:value="true" />

# Or via command line
# flutter run --enable-impeller

# Check in code
import 'dart:io';
final usingImpeller = Platform.isIOS; // default on iOS

// Profile rendering
# flutter run --profile --trace-skia`,
        [
            q('Theoretical', 'What problem does Impeller solve that Skia had?', 'ما المشكلة التي يحلها Impeller كانت موجودة في Skia؟', 3, ['Skia: shader compilation at runtime = jank', 'Impeller: pre-compiled at build time', 'Smooth, predictable animations']),
            q('Practical', 'How do you enable Impeller on Android?', 'كيف تفعّل Impeller على Android؟', 2, ['AndroidManifest meta-data', 'flutter run --enable-impeller', 'Will be default in future versions']),
            q('Deep Dive', 'What is shader compilation jank and why does it happen?', 'ما هو shader compilation jank ولماذا يحدث؟', 4, ['GPU needs to compile shader programs', 'First time: compilation delay = frame drop', 'Impeller: pre-compiles all shaders at build']),
            q('Critical Thinking', 'Are there any downsides to Impeller vs Skia?', 'هل هناك عيوب لـ Impeller مقابل Skia؟', 3, ['Some advanced Skia features missing', 'Larger app binary size', 'Still maturing ecosystem']),
            q('System Design', 'How do you measure rendering performance with Impeller?', 'كيف تقيس rendering performance مع Impeller؟', 3, ['flutter run --profile', 'DevTools Performance tab', 'Frame rendering time histogram'])
        ],
        ['rx-dart'], 'responsive-adaptive', 'Responsive vs Adaptive',
        'Impeller = pre-cooked GPU meals, no waiting to cook', 'Impeller | pre-compiled shaders | no jank | Metal/Vulkan',
        ['Valeo', 'International', 'Swvl'], 'Medium', 'Major'),

    mk('responsive-adaptive', 112, 'Responsive vs Adaptive Design', 'التصميم المتجاوب مقابل التكيفي',
        'Mid', 'Common', ['Flutter', 'UI', 'Design'],
        'Responsive: same UI adapts. Adaptive: different UI per platform. Both needed for Flutter.',
        ['Responsive: fluid layouts, LayoutBuilder', 'Adaptive: platform-specific components', 'flutter.dev/docs: adaptive uses native components', 'CupertinoSwitch on iOS, Switch on Android', 'Go_router + ShellRoute for adaptive navigation', 'flutter_adaptive_scaffold package'],
        `// Responsive layout
Widget build(BuildContext context) {
  return LayoutBuilder(builder: (ctx, constraints) {
    if (constraints.maxWidth < 600) {
      return MobileLayout();
    } else if (constraints.maxWidth < 1200) {
      return TabletLayout();
    } else {
      return DesktopLayout();
    }
  });
}

// Adaptive: platform-specific widget
Widget buildSwitch(bool value, ValueChanged<bool> onChanged) {
  return Platform.isIOS
    ? CupertinoSwitch(value: value, onChanged: onChanged)
    : Switch(value: value, onChanged: onChanged);
}`,
        [
            q('Theoretical', 'What is the difference between responsive and adaptive?', 'ما الفرق بين responsive و adaptive؟', 2, ['Responsive: same UI scales', 'Adaptive: different UI per platform', 'Both important for premium apps']),
            q('Practical', 'Build an adaptive navigation: bottom bar on mobile, rail on desktop', 'ابنِ adaptive navigation: bottom bar على الجوال، rail على سطح المكتب', 3, ['LayoutBuilder breakpoints', 'NavigationBar mobile', 'NavigationRail tablet/desktop']),
            q('Practical', 'Use adaptive widgets for platform-native feel', 'استخدم adaptive widgets للحصول على طابع المنصة الأصلي', 2, ['Switch.adaptive()', 'Slider.adaptive()', 'Platform.isIOS check']),
            q('System Design', 'Design a cross-platform dashboard for phone, tablet, desktop', 'صمم cross-platform dashboard للهاتف والتابلت وسطح المكتب', 4, ['3 breakpoints', 'Different navigation patterns', 'Same data, different layout']),
            q('Critical Thinking', 'When is it better to build separate apps vs one adaptive app?', 'متى يكون بناء apps منفصلة أفضل من app تكيفي واحد؟', 3, ['Separate: very different UX needs', 'Adaptive: same feature set, different layout', 'Netflix: same app with adaptive layout'])
        ],
        ['flutter-impeller'], 'multi-module-arch', 'Multi-Module Architecture',
        'Responsive=fluid, Adaptive=platform-native', 'LayoutBuilder | breakpoints | Switch.adaptive() | Platform.isIOS',
        ['ITWorx', 'Valeo', 'International'], 'High', 'Major'),

    mk('multi-module-arch', 113, 'Multi-Module Architecture', 'معمارية متعددة الوحدات',
        'Senior', 'Rare', ['Flutter', 'Architecture', 'DevOps'],
        'Feature-based modules, shared packages, melos for monorepo, reducing build times',
        ['melos: monorepo management', 'flutter create --template=package for modules', 'Shared: core, design_system, analytics', 'Feature: auth, home, profile as packages', 'Faster builds: only changed modules rebuilt', 'Independent versioning'],
        `# Monorepo structure with melos:
# packages/
# ├── core/          (shared utilities)
# ├── design_system/ (UI components)
# ├── feature_auth/  (auth feature)
# ├── feature_home/  (home feature)
# └── app/           (main app: imports features)

# melos.yaml
name: my_app
packages:
  - packages/**

scripts:
  test:all:
    run: melos exec -- flutter test
  build:
    run: melos exec -- flutter build apk`,
        [
            q('System Design', 'Design a monorepo structure for a large Flutter app with 10 teams', 'صمم monorepo structure لتطبيق Flutter كبير بـ 10 فرق', 5, ['melos for workspace', 'Separate package per feature', 'Shared design_system package']),
            q('Theoretical', 'What are the advantages of module-based architecture?', 'ما مزايا module-based architecture؟', 3, ['Independent development', 'Faster builds', 'Clear ownership', 'Reusable packages']),
            q('Practical', 'Set up melos for a Flutter monorepo', 'أعدّ melos لـ Flutter monorepo', 4, ['Install melos', 'melos.yaml config', 'melos bootstrap to link']),
            q('Critical Thinking', 'When is multi-module overkill?', 'متى تكون multi-module مبالغة؟', 3, ['Small team < 5 developers', 'Early-stage app', 'When overhead > benefit']),
            q('Deep Dive', 'How does melos link local packages?', 'كيف يربط melos الـ packages المحلية؟', 4, ['Modifies pubspec.yaml path dependencies', 'melos bootstrap', 'Similar to npm link'])
        ],
        ['responsive-adaptive'], 'code-review-practices', 'Code Review Best Practices',
        'Multi-module = a city with separate districts', 'melos | feature packages | shared core | independent builds',
        ['Swvl', 'International', 'Valeo'], 'Low', 'Critical for Senior'),

    mk('code-review-practices', 114, 'Code Review Best Practices', 'أفضل ممارسات Code Review',
        'Mid', 'Common', ['Architecture', 'Team', 'Quality'],
        'What to look for in Flutter code reviews: correctness, performance, maintainability',
        ['Check: null safety violations', 'Check: memory leaks (dispose pattern)', 'Check: setState at wrong level', 'Check: hardcoded strings for i18n', 'Check: missing error handling', 'Praise good code, not just critique'],
        `// Red flags to catch in code review:

// ❌ 1. Missing dispose
class _State extends State<W> {
  StreamSubscription? _sub;
  // BUG: no dispose(){_sub?.cancel()}
}

// ❌ 2. setState on mounted widget after async
void save() async {
  await api.save();
  setState(() {}); // might be unmounted!
}

// ❌ 3. Business logic in UI
Widget build(ctx) {
  final tax = price * 0.14; // belongs in model
}

// ❌ 4. No error handling
final data = await api.get(); // what if throws?`,
        [
            q('Practical', 'What are the 5 most critical things to check in a Flutter code review?', 'ما أهم 5 أشياء تتحقق منها في Flutter code review؟', 3, ['dispose pattern', 'mounted check after async', 'Business logic in UI', 'Missing error handling', 'No tests for BLoC']),
            q('Theoretical', 'How do you give constructive code review feedback?', 'كيف تعطي feedback بناء في code review؟', 2, ['Ask questions vs statements', 'Suggest don\'t command', 'Praise good patterns']),
            q('Critical Thinking', 'What should never be merged without code review?', 'ما الذي يجب ألا يُدمج بدون code review؟', 2, ['Security-sensitive code', 'Payment flow changes', 'Database migrations']),
            q('Practical', 'Write a code review checklist for a Flutter developer', 'اكتب قائمة تحقق code review لمطور Flutter', 3, ['dispose pattern', 'error handling', 'Tests', 'Performance: const/builder']),
            q('System Design', 'Design a code review process for a team of 10', 'صمم code review process لفريق من 10', 4, ['PR template checklist', 'Required 2 approvals', 'Auto-lint via GitHub Actions'])
        ],
        ['multi-module-arch'], 'interview-final-prep', 'Final Interview Preparation',
        'Code review = team quality gate', 'dispose|mounted|error handling|business logic out of UI|tests',
        ['All Companies'], 'High', 'Major'),

    mk('interview-final-prep', 115, 'Final Interview Preparation', 'التحضير النهائي للمقابلة',
        'Junior', 'Critical', ['Interview Skills', 'Career'],
        'Day-before prep, morning routine, what to bring, follow-up after interview',
        ['Research the company thoroughly', 'Prepare 3 good questions to ask', 'Sleep 8 hours before', 'Arrive 10 minutes early', 'Bring printed CV (Egypt traditional)', 'Follow-up email within 24 hours'],
        `// Questions TO ASK the interviewer:
// 1. "What does the typical day look like for a Flutter developer here?"
// 2. "What is the tech stack and architecture for your Flutter app?"
// 3. "What are the biggest technical challenges your team is facing?"
// 4. "How does the team handle code reviews and technical debt?"
// 5. "What is the growth path for a Flutter developer?"

// Questions to AVOID:
// - "How much is the salary?" (ask after they show interest)
// - "What does the company do?" (research beforehand!)
// - "How many vacation days?" (timing is wrong)`,
        [
            q('Practical', 'What 3 questions should you always ask at the end of an interview?', 'ما 3 أسئلة يجب أن تطرحها دائماً في نهاية المقابلة؟', 1, ['Tech stack question', 'Day in the life question', 'Growth opportunity question']),
            q('Practical', 'How do you write a follow-up email after a Flutter job interview?', 'كيف تكتب follow-up email بعد مقابلة Flutter؟', 1, ['Within 24 hours', 'Thank interviewer by name', 'Reiterate interest + one key point']),
            q('Critical Thinking', 'You are asked a question you don\'t know. What do you do?', 'سُئلت سؤالاً لا تعرفه. ماذا تفعل؟', 2, ['Be honest: "I\'m not sure, but..."', 'Reason through what you know', 'Show learning mindset']),
            q('Theoretical', 'How long should you spend researching a company before an interview?', 'كم من الوقت تقضي في البحث عن شركة قبل المقابلة؟', 1, ['1-2 hours minimum', 'Products, tech stack, culture', 'Recent news and achievements']),
            q('Practical', 'What should you wear to a Flutter developer interview in an Egyptian company?', 'ماذا ترتدي في مقابلة Flutter في شركة مصرية؟', 1, ['Smart casual (jeans + button shirt)', 'Research company culture on LinkedIn', 'For corporate (ITWorx/Valeo): more formal'])
        ],
        ['code-review-practices'], 'list-view-optimization', 'ListView & Widget Optimization',
        'Prepare = research + questions + sleep + arrive early', 'Research company | 3 questions ready | follow-up 24h | STAR stories',
        ['All Companies'], 'Very High', 'Critical'),
];
