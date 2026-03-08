// @ts-nocheck
import type { Card } from '@/types/card';

// Helper to build a full card quickly
const mk = (
  id: string, num: number, title: string, titleAr: string,
  level: string, freq: string, tags: string[],
  summary: string, detailed: string, analogy: string,
  keyPoints: string[], code: string,
  qs: any[], whatTheyWant: string[], redFlags: string[], greenFlags: string[],
  prereq: string[], nextId: string, nextTitle: string, related: any[],
  pitfall: string, pitfallFix: string, memHook: string, cheatSheet: string
): Card => ({
  id, number: num, title, titleAr,
  level: level as any, frequency: freq as any, tags,
  definition: { summary, detailed, analogy, keyPoints, codeExample: { language: 'dart', code } },
  questions: qs,
  interviewerMind: { whatTheyWant, redFlags, greenFlags },
  linkedCards: {
    prerequisites: prereq,
    nextSteps: [{ id: nextId, title: nextTitle }],
    related
  },
  commonPitfalls: [{
    mistake: pitfall, whyWrong: 'أخطأ شائع', correctApproach: pitfallFix
  }],
  answerStrategy: {
    structure: ['تعريف', 'مثال', 'تطبيق على Flutter', 'مقارنة'],
    timeAllocation: { junior: '2-3 دق', mid: '3-4 دق', senior: '5 دق' },
    keyPhrases: [id, ...tags.slice(0, 2)]
  },
  quickRevision: { bulletPoints: keyPoints.slice(0, 4), memoryHook: memHook, cheatSheet }
});

const q = (type: string, question: string, questionAr: string, difficulty: number, points: string[], time: string = '2-3 minutes') => ({
  type: type as any, question, questionAr, difficulty,
  expectedAnswer: { points, timeToAnswer: time }
});

export const cardsExtra2: Card[] = [
  mk('widget-lifecycle', 56, 'Widget Lifecycle', 'دورة حياة الـ Widget',
    'Junior', 'Critical', ['Flutter', 'Widgets'],
    'StatelessWidget vs StatefulWidget lifecycle methods',
    'StatelessWidget has only build(). StatefulWidget has createState, initState, didChangeDependencies, build, didUpdateWidget, deactivate, dispose.',
    'Widget lifecycle = plant lifecycle: seed(initState) → grow(build) → change(didUpdateWidget) → wither(dispose)',
    ['initState: called once on creation', 'didChangeDependencies: when InheritedWidget changes', 'build: called every rebuild', 'didUpdateWidget: parent passes new config', 'deactivate: removed from tree', 'dispose: permanent removal + cleanup'],
    `class _MyState extends State<MyWidget> {
  late Timer _timer;

  @override
  void initState() {
    super.initState(); // always call super first
    _timer = Timer.periodic(Duration(seconds: 1), (_) => setState(() {}));
  }

  @override
  void didUpdateWidget(MyWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.id != widget.id) _reload();
  }

  @override
  void dispose() {
    _timer.cancel(); // always cleanup!
    super.dispose();
  }
}`,
    [
      q('Theoretical', 'What is the difference between initState and didChangeDependencies?', 'ما الفرق بين initState و didChangeDependencies؟', 2, ['initState: once', 'didChangeDependencies: each time InheritedWidget changes']),
      q('Practical', 'Where do you initialize a StreamSubscription and where do you dispose it?', 'أين تعمل initialize لـ StreamSubscription وأين تعمل dispose؟', 2, ['initState for init', 'dispose for cancel']),
      q('Critical Thinking', 'Why must you call super.dispose() at the end not the beginning?', 'لماذا يجب استدعاء super.dispose() في النهاية لا البداية؟', 3, ['Superclass cleanup after yours', 'Prevents using disposed resources']),
      q('Practical', 'When does didUpdateWidget get called?', 'متى يُستدعى didUpdateWidget؟', 3, ['When parent rebuilds with new props', 'widget property has new values']),
      q('Deep Dive', 'Explain the relationship between Widget, Element and RenderObject', 'اشرح العلاقة بين Widget و Element و RenderObject', 5, ['Widget = blueprint', 'Element = mutable instance', 'RenderObject = layout/paint'])
    ],
    ['يفهم lifecycle', 'يعرف cleanup'], ['ينسى dispose', 'ينسى super.initState()'], ['يذكر Element tree', 'يشرح dispose pattern'],
    ['dart-patterns'], 'state-management-overview', 'State Management Overview', [],
    'ينسى cancel stream في dispose', 'دايماً cancel في dispose + call super',
    'initState=born, dispose=dead, build=living', 'initState → build → didUpdateWidget → dispose'),

  mk('state-management-overview', 57, 'State Management Overview', 'نظرة عامة على إدارة الحالة',
    'Junior', 'Critical', ['Flutter', 'State Management'],
    'setState, InheritedWidget, Provider, Riverpod, BLoC, GetX comparison',
    'Local state: setState. Shared simple: Provider. Complex: BLoC/Riverpod. Reactive: GetX. Choose based on team size and complexity.',
    'State management = water distribution in a building. setState = personal water bottle. Provider = floor water cooler. BLoC = central water plant.',
    ['setState: simple local state', 'Provider: simple sharing', 'Riverpod: Provider++ compile-safe', 'BLoC: event-driven enterprise', 'GetX: all-in-one reactive', 'Cubit: BLoC without events'],
    `// setState — simple
setState(() { count++; });

// Provider
context.watch<CounterNotifier>().count;
context.read<CounterNotifier>().increment();

// Riverpod
final counterProvider = StateNotifierProvider<CounterNotifier, int>(...);
ref.watch(counterProvider);

// BLoC
BlocBuilder<CounterBloc, CounterState>(
  builder: (ctx, state) => Text('\${state.count}'),
)`,
    [
      q('Theoretical', 'How do you decide which state management to use?', 'كيف تقرر أي state management تستخدم؟', 3, ['setState for local UI', 'Provider for simple shared', 'BLoC for large team/complex']),
      q('Practical', 'Convert a setState counter to Provider', 'حوّل counter بـ setState لـ Provider', 3, ['ChangeNotifier class', 'ChangeNotifierProvider', 'context.watch/read']),
      q('Critical Thinking', 'What are the downsides of GetX?', 'ما عيوب GetX؟', 3, ['Hides Flutter patterns', 'Anti-patterns encouraged', 'Hard to test']),
      q('System Design', 'Design state for an e-commerce app', 'صمم state لتطبيق تجارة إلكترونية', 4, ['Cart: Riverpod', 'Auth: BLoC', 'UI: setState']),
      q('Deep Dive', 'Explain how Provider uses InheritedWidget internally', 'اشرح كيف يستخدم Provider InheritedWidget داخلياً', 5, ['Provider wraps InheritedWidget', 'context.watch registers dependency', 'Rebuild on notifyListeners()'])
    ],
    ['يعرف يختار الـ solution المناسبة', 'يعرف أكتر من solution'], ['يعرف GetX بس', 'يقول setState لكل حاجة'], ['يشرح trade-offs', 'يذكر testability'],
    ['widget-lifecycle'], 'bloc-pattern', 'BLoC Pattern', [{ id: 'provider-riverpod', title: 'Provider & Riverpod' }],
    'استخدام GetX في مشروع enterprise', 'استخدم BLoC أو Riverpod للـ large apps',
    'setState=small, Provider=medium, BLoC=large', 'setState|Provider|Riverpod|BLoC|GetX'),

  mk('navigation-routing', 58, 'Navigation & Routing', 'التنقل والـ Routing',
    'Junior', 'Critical', ['Flutter', 'Navigation'],
    'Navigator 1.0 vs 2.0, named routes, GoRouter, deep linking',
    'Navigator 1.0: imperative push/pop. Navigator 2.0: declarative with pages list. GoRouter: recommended package for routing with deep links.',
    'Navigation = GPS. Navigator 1.0 = old GPS (press go). Navigator 2.0 = modern GPS (set destination, auto-route). GoRouter = Waze (smart routing).',
    ['Navigator.push/pop: imperative', 'Named routes: pushNamed("/home")', 'GoRouter: declarative, deep links', 'ShellRoute: persistent bottom nav', 'Route guards: redirect()', 'Deep linking: platform setup required'],
    `// Named routes
Navigator.pushNamed(context, '/detail', arguments: id);

// GoRouter
final router = GoRouter(routes: [
  GoRoute(path: '/', builder: (_, __) => HomeScreen()),
  GoRoute(
    path: '/user/:id',
    builder: (ctx, state) {
      final id = state.pathParameters['id']!;
      return UserScreen(id: id);
    },
  ),
  ShellRoute(
    builder: (_, __, child) => ScaffoldWithNav(child: child),
    routes: [/* tabs */],
  ),
]);`,
    [
      q('Theoretical', 'What is the difference between Navigator 1.0 and 2.0?', 'ما الفرق بين Navigator 1.0 و 2.0؟', 2, ['1.0 = imperative stack', '2.0 = declarative pages list', 'GoRouter wraps 2.0']),
      q('Practical', 'Implement deep linking for a product detail page', 'نفذ deep linking لصفحة تفاصيل منتج', 3, ['GoRoute with :id parameter', 'AndroidManifest intent-filter', 'Info.plist for iOS']),
      q('Practical', 'Add a route guard to redirect unauthenticated users', 'أضف route guard لتحويل المستخدمين غير الموثقين', 3, ['redirect() in GoRouter', 'Check auth state', 'Return /login path']),
      q('System Design', 'Design navigation for a food delivery app', 'صمم navigation لتطبيق توصيل طعام', 4, ['ShellRoute for bottom nav', 'Nested routes', 'Order tracking deep link']),
      q('Deep Dive', 'How does GoRouter handle back button on Android?', 'كيف يتعامل GoRouter مع زر الرجوع على Android؟', 4, ['PopScope widget', 'canPop() check', 'Custom back behavior'])
    ],
    ['يعرف GoRouter', 'يفهم deep linking'], ['يستخدم Navigator 1.0 فقط', 'لا يعرف ShellRoute'], ['يشرح declarative routing', 'يذكر GoRouter + redirect'],
    ['state-management-overview'], 'forms-validation', 'Forms & Validation', [],
    'استخدام pushNamed بدون GoRouter في مشروع كبير', 'استخدم GoRouter دايماً مع routes معرّفة',
    'GoRouter = smart GPS for Flutter', 'GoRouter | GoRoute(:id) | ShellRoute | redirect()'),

  mk('forms-validation', 59, 'Forms & Validation', 'النماذج والتحقق',
    'Junior', 'Very Common', ['Flutter', 'UI'],
    'Form, GlobalKey<FormState>, TextFormField, validator, autovalidateMode',
    'Form widget wraps fields. GlobalKey<FormState> for programmatic access. TextFormField with validator. Validate on submit or on change.',
    'Form validation = airport security check. Each field is a checkpoint. FormState.validate() is the final clearance.',
    ['Form + GlobalKey<FormState>', 'TextFormField + validator', 'formKey.currentState!.validate()', 'formKey.currentState!.save()', 'AutovalidateMode.onUserInteraction', 'Custom validators for email/phone'],
    `final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  autovalidateMode: AutovalidateMode.onUserInteraction,
  child: Column(children: [
    TextFormField(
      decoration: InputDecoration(labelText: 'Email'),
      validator: (v) {
        if (v == null || v.isEmpty) return 'Required';
        if (!v.contains('@')) return 'Invalid email';
        return null; // valid
      },
    ),
    ElevatedButton(
      onPressed: () {
        if (_formKey.currentState!.validate()) {
          _formKey.currentState!.save();
          submitForm();
        }
      },
      child: Text('Submit'),
    ),
  ]),
)`,
    [
      q('Practical', 'Build a login form with email and password validation', 'ابنِ نموذج تسجيل دخول بالتحقق من البريد وكلمة السر', 2, ['GlobalKey<FormState>', 'validator for each field', 'validate() on submit']),
      q('Theoretical', 'What is AutovalidateMode and when to use each option?', 'ما هو AutovalidateMode ومتى تستخدم كل خيار؟', 2, ['disabled: only on submit', 'onUserInteraction: after first touch', 'always: every rebuild']),
      q('Practical', 'Create a custom phone number validator for Egyptian numbers', 'أنشئ validator مخصص لأرقام هواتف مصرية', 3, ['Regex: ^01[0125][0-9]{8}$', 'Return error string or null']),
      q('Critical Thinking', 'When would you use TextEditingController vs form save?', 'متى تستخدم TextEditingController مقابل form save؟', 3, ['Controller: reactive access anytime', 'save(): batch collect on submit']),
      q('System Design', 'Design a multi-step form with validation at each step', 'صمم نموذج متعدد الخطوات مع التحقق في كل خطوة', 4, ['PageView or Stepper', 'Separate GlobalKey per step', 'Validate before next step'])
    ],
    ['يعرف GlobalKey<FormState>', 'يكتب validators صحيحة'], ['ينسى validator return null', 'يستخدم setState للـ validation'], ['يذكر AutovalidateMode', 'يكتب Egyptian phone validator'],
    ['navigation-routing'], 'animations-flutter', 'Animations in Flutter', [],
    'ينسى إرجاع null من validator عند الـ valid input', 'validator: returns null=valid, String=error',
    'GlobalKey = form remote control', 'GlobalKey<FormState> | validator: (v) => v!.isEmpty ? "err" : null'),

  mk('animations-flutter', 60, 'Animations in Flutter', 'الـ Animations في Flutter',
    'Mid', 'Common', ['Flutter', 'UI', 'Animations'],
    'AnimationController, Tween, AnimatedBuilder, implicit vs explicit animations',
    'Implicit: Flutter handles the animation (AnimatedContainer). Explicit: you control via AnimationController + Tween. Hero for shared elements.',
    'Animations = cooking. Implicit = microwave (auto). Explicit = chef (full control). Hero = teleportation between screens.',
    ['Implicit: AnimatedContainer, AnimatedOpacity, TweenAnimationBuilder', 'Explicit: AnimationController + Tween + AnimatedBuilder', 'vsync: TickerProviderStateMixin', 'Curves: Curves.easeInOut', 'Hero: shared element transition', 'Staggered: sequenced animations'],
    `// Implicit — simplest
AnimatedContainer(
  duration: Duration(milliseconds: 300),
  color: isActive ? Colors.blue : Colors.grey,
  curve: Curves.easeInOut,
)

// Explicit — full control
class _MyState extends State<W> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: Duration(seconds: 1));
    _anim = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _ctrl, curve: Curves.easeOut));
    _ctrl.forward();
  }

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }
}`,
    [
      q('Theoretical', 'When do you use implicit vs explicit animations?', 'متى تستخدم implicit مقابل explicit animations؟', 2, ['Implicit: simple value changes', 'Explicit: sequences/loops/physics']),
      q('Practical', 'Build a pulsing button animation', 'ابنِ animation لزر ينبض', 3, ['AnimationController + repeat', 'ScaleTransition', 'SingleTickerProviderStateMixin']),
      q('Practical', 'Implement Hero animation between list and detail', 'نفذ Hero animation بين الـ list والـ detail', 2, ['Hero + matching tag', 'Same tag in both screens']),
      q('Deep Dive', 'What is vsync and why is it needed?', 'ما هو vsync ولماذا هو ضروري؟', 4, ['Syncs animation with screen refresh', 'Prevents off-screen animation waste', 'TickerProviderStateMixin provides it']),
      q('System Design', 'Design a staggered list entrance animation', 'صمم staggered animation لدخول عناصر القائمة', 4, ['Interval curves for each item', 'index * offset delay', 'AnimationController.forward()']),
    ],
    ['يعرف الفرق بين implicit و explicit', 'يعرف يعمل Hero'], ['ينسى dispose للـ controller', 'لا يعرف vsync'], ['يذكر Curves', 'يشرح FPS sync'],
    ['forms-validation'], 'custom-painters', 'Custom Painters', [],
    'ننسى dispose() للـ AnimationController', 'dispose: _ctrl.dispose(); super.dispose();',
    'Implicit=microwave, Explicit=chef', 'AnimatedContainer | AnimationController+Tween | Hero'),

  mk('custom-painters', 61, 'Custom Painters', 'الرسم المخصص',
    'Senior', 'Rare', ['Flutter', 'Canvas', 'UI'],
    'CustomPainter, Canvas API, shouldRepaint, performance considerations',
    'CustomPainter gives direct Canvas access for custom graphics: charts, gauges, signature pads. Use RepaintBoundary to isolate repaints.',
    'CustomPainter = artist with a blank canvas. You control every pixel. RepaintBoundary = separate canvas for each painting.',
    ['CustomPainter: paint() and shouldRepaint()', 'Canvas: drawRect, drawCircle, drawPath, drawText', 'Paint object: color, strokeWidth, style', 'shouldRepaint: return true only when needed', 'RepaintBoundary: isolates repaint area', 'ClipPath for custom shapes'],
    `class GaugePainter extends CustomPainter {
  final double progress; // 0.0 to 1.0
  GaugePainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..strokeWidth = 8
      ..style = PaintingStyle.stroke;

    final rect = Rect.fromLTWH(0, 0, size.width, size.height);
    canvas.drawArc(rect, -pi, pi * progress, false, paint);
  }

  @override
  bool shouldRepaint(GaugePainter old) => old.progress != progress;
}

// Usage
CustomPaint(painter: GaugePainter(0.75), size: Size(200, 200))`,
    [
      q('Theoretical', 'What is shouldRepaint and when should it return true?', 'ما هو shouldRepaint ومتى يُرجع true؟', 3, ['Returns true when painting depends on changed data', 'Avoid always returning true (performance)']),
      q('Practical', 'Build a circular progress indicator using CustomPainter', 'ابنِ circular progress indicator بـ CustomPainter', 4, ['drawArc for progress', 'drawArc for background', 'Paint stroke style']),
      q('Deep Dive', 'How does RepaintBoundary improve performance?', 'كيف يحسّن RepaintBoundary الأداء؟', 4, ['Creates separate layer', 'Child repaints don\'t trigger parent repaint', 'GPU compositing']),
      q('System Design', 'Design a real-time stock chart using CustomPainter', 'صمم مخطط أسهم real-time بـ CustomPainter', 5, ['Path for line chart', 'AnimationController for live updates', 'Clip to visible bounds']),
      q('Critical Thinking', 'When would you NOT use CustomPainter?', 'متى لا تستخدم CustomPainter؟', 3, ['Simple UI — use widgets', 'Static images — use assets', 'High-level charts — use fl_chart'])
    ],
    ['يعرف Canvas API', 'يستخدم shouldRepaint صح'], ['يرجع true دايماً من shouldRepaint', 'ينسى RepaintBoundary'], ['يذكر RepaintBoundary', 'يشرح layering'],
    ['animations-flutter'], 'platform-channels', 'Platform Channels', [],
    'إرجاع true دايماً من shouldRepaint', 'قارن old state مع current قبل الإرجاع',
    'CustomPainter = art with code', 'CustomPainter | Canvas.drawArc | shouldRepaint | RepaintBoundary'),

  mk('platform-channels', 62, 'Platform Channels', 'قنوات المنصة',
    'Senior', 'Rare', ['Flutter', 'Native', 'Platform'],
    'MethodChannel, EventChannel, BasicMessageChannel, Pigeon',
    'Platform channels allow Flutter to call native Android/iOS code. MethodChannel for one-time calls, EventChannel for streams, Pigeon for type-safe generation.',
    'Platform channels = embassy interpreter. Flutter speaks Dart, native speaks Java/Swift, channels are the translator.',
    ['MethodChannel: single method call', 'EventChannel: continuous stream from native', 'BasicMessageChannel: bidirectional messaging', 'Pigeon: type-safe codegen', 'invokeMethod returns Future', 'Handle platform exceptions'],
    `// Flutter side
const channel = MethodChannel('com.example/battery');

Future<int> getBatteryLevel() async {
  try {
    final level = await channel.invokeMethod<int>('getBatteryLevel');
    return level ?? -1;
  } on PlatformException catch (e) {
    return -1;
  }
}

// Android side (Kotlin)
// MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "com.example/battery")
//   .setMethodCallHandler { call, result ->
//       if (call.method == "getBatteryLevel") result.success(getBatteryLevel())
//       else result.notImplemented()
//   }`,
    [
      q('Theoretical', 'What is the difference between MethodChannel and EventChannel?', 'ما الفرق بين MethodChannel و EventChannel؟', 3, ['MethodChannel: one-time call/response', 'EventChannel: continuous stream (sensors, location)']),
      q('Practical', 'Call a native function to get the device battery level', 'استدعِ دالة native للحصول على مستوى البطارية', 3, ['MethodChannel setup', 'invokeMethod in Flutter', 'Native handler in Kotlin/Swift']),
      q('Deep Dive', 'What is Pigeon and why is it preferred over raw MethodChannel?', 'ما هو Pigeon ولماذا يُفضَّل على MethodChannel العادي؟', 4, ['Type-safe generated code', 'No string-based method names', 'Compile-time verification']),
      q('System Design', 'Design integration with a device fingerprint scanner', 'صمم تكامل مع ماسح البصمة في الجهاز', 5, ['MethodChannel for result', 'EventChannel for status stream', 'PlatformException handling']),
      q('Critical Thinking', 'When would you prefer a plugin over writing a custom MethodChannel?', 'متى تفضل plugin على كتابة MethodChannel مخصص؟', 3, ['Plugin already exists', 'Community maintained', 'No custom native logic needed'])
    ],
    ['يعرف platform channels', 'يعرف exception handling'], ['ينسى PlatformException', 'ما يعرفش الفرق بين MethodChannel/EventChannel'], ['يذكر Pigeon', 'يشرح type safety'],
    ['custom-painters'], 'performance-flutter', 'Flutter Performance', [],
    'استخدام string method names بدون Pigeon', 'استخدم Pigeon للـ type safety',
    'MethodChannel = embassy hotline', 'MethodChannel | invokeMethod | EventChannel | Pigeon'),

  mk('performance-flutter', 63, 'Flutter Performance Optimization', 'تحسين أداء Flutter',
    'Senior', 'Very Common', ['Flutter', 'Performance'],
    'const widgets, RepaintBoundary, ListView.builder, avoid setState at root, DevTools',
    'Performance = app speed and smoothness. Key: minimize rebuilds, use const, lazy loading, avoid heavy operations on main thread.',
    'Performance optimization = tuning a car engine. const = turn off unused cylinders. ListView.builder = load fuel only when needed.',
    ['const eliminates rebuilds', 'ListView.builder: lazy load', 'RepaintBoundary: isolate repaints', 'Image.network with cacheWidth', 'compute() for heavy work', 'DevTools: Performance overlay, Timeline'],
    `// ❌ Rebuilds everything
Widget build(context) => Column(children: [
  Text('Header'), // rebuilds each time
  ExpensiveWidget(),
]);

// ✅ Use const
Widget build(context) => Column(children: [
  const Text('Header'), // never rebuilds
  const ExpensiveWidget(), // compile-time constant
]);

// ✅ Lazy list
ListView.builder(
  itemCount: items.length,
  itemBuilder: (ctx, i) => ItemTile(items[i]),
)

// ✅ Heavy work off main thread
final result = await compute(parseJson, jsonString);`,
    [
      q('Practical', 'How do you identify jank in a Flutter app?', 'كيف تتعرّف على الـ jank في تطبيق Flutter؟', 2, ['Performance overlay: red/yellow frames', 'DevTools Timeline', 'flutter run --profile']),
      q('Practical', 'Explain how const widgets improve performance', 'اشرح كيف تحسّن const widgets الأداء', 2, ['Skips rebuild entirely', 'Compile-time constant', 'Same instance reused']),
      q('System Design', 'Optimize a contacts list with 10,000 entries', 'حسّن قائمة جهات اتصال بـ 10,000 عنصر', 3, ['ListView.builder', 'Isolate for filtering', 'Indexed search with Map']),
      q('Deep Dive', 'What is the RasterThread and UIThread in Flutter?', 'ما هو RasterThread و UIThread في Flutter؟', 5, ['UIThread: Dart code + widget building', 'RasterThread: GPU commands', 'Both must finish in 16ms for 60fps']),
      q('Critical Thinking', 'When should you NOT use const?', 'متى لا تستخدم const؟', 3, ['When values are dynamic', 'When widget depends on runtime data', 'External data from API/DB'])
    ],
    ['يعرف DevTools', 'يستخدم const و ListView.builder'], ['تمامًا مش عارف DevTools', 'يستخدم ListView بدل builder'], ['يذكر compute()', 'يشرح 60fps و rasterThread'],
    ['platform-channels'], 'memory-management', 'Memory Management', [],
    'استخدام ListView بدل ListView.builder', 'دايماً استخدم ListView.builder مع قوائم طويلة',
    'const = frozen widget = zero rebuild cost', 'const | ListView.builder | RepaintBoundary | compute()'),

  mk('memory-management', 64, 'Memory Management in Flutter', 'إدارة الذاكرة في Flutter',
    'Senior', 'Common', ['Flutter', 'Performance', 'Dart'],
    'Memory leaks, StreamSubscription disposal, WeakReference, DevTools Memory tab',
    'Memory leaks = app uses more RAM over time → slowdown → crash. Most common: forgotten StreamSubscriptions, timers, animations not disposed.',
    'Memory leak = leaving a tap running. Each undisposed subscription = water drop. Eventually the bucket overflows.',
    ['dispose() is critical', 'Cancel StreamSubscriptions', 'AnimationController.dispose()', 'WeakReference<T> for cache', 'DevTools Memory profiler', 'Image cache: ImageCache.maximumSize'],
    `class _MyState extends State<Widget> {
  StreamSubscription? _sub;
  AnimationController? _ctrl;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _sub = stream.listen((_) {});
    _ctrl = AnimationController(vsync: this, duration: Duration(seconds: 1));
    _timer = Timer.periodic(Duration(seconds: 5), (_) => refresh());
  }

  @override
  void dispose() {
    _sub?.cancel();   // ✅ cancel stream
    _ctrl?.dispose(); // ✅ dispose controller
    _timer?.cancel(); // ✅ cancel timer
    super.dispose();
  }
}`,
    [
      q('Theoretical', 'What are the most common causes of memory leaks in Flutter?', 'ما أبرز أسباب تسرب الذاكرة في Flutter؟', 3, ['Uncanceled StreamSubscriptions', 'Undisposed AnimationControllers', 'Global Singletons holding contexts']),
      q('Practical', 'How do you detect a memory leak using DevTools?', 'كيف تكتشف تسرب ذاكرة باستخدام DevTools؟', 3, ['Memory tab → snapshot', 'Compare before/after navigation', 'Look for growing retained size']),
      q('Deep Dive', 'What is WeakReference in Dart and when to use it?', 'ما هو WeakReference في Dart ومتى تستخدمه؟', 4, ['Allows GC to collect referenced object', 'Use for caches without preventing GC', 'WeakReference<T>(object)']),
      q('System Design', 'Design an image caching system that doesn\'t leak memory', 'صمم نظام image caching لا يسرب ذاكرة', 4, ['LRU cache with max size', 'WeakReference for values', 'ImageCache.maximumSizeBytes']),
      q('Critical Thinking', 'Should you always call setState in dispose? Why?', 'هل تستدعي setState في dispose دايماً؟ لماذا؟', 3, ['No — widget is unmounted', 'Causes "setState on unmounted widget" error', 'Check mounted before setState'])
    ],
    ['يعرف يتبع leaks', 'يعرف dispose pattern'], ['ينسى cancel streams', 'لا يعرف DevTools Memory'], ['يذكر WeakReference', 'يشرح GC generational'],
    ['performance-flutter'], 'build-context', 'BuildContext Deep Dive', [],
    'نسيان cancel الـ StreamSubscription في dispose', 'دايماً cancel في dispose مع ?. للـ null safety',
    'dispose = close all open taps', '_sub?.cancel(); _ctrl?.dispose(); _timer?.cancel();'),

  mk('build-context', 65, 'BuildContext Deep Dive', 'فهم BuildContext بعمق',
    'Mid', 'Common', ['Flutter', 'Widgets'],
    'BuildContext as tree pointer, InheritedWidget lookup, mounted check, context.read vs watch',
    'BuildContext is a handle to the widget\'s position in the element tree. Used to find ancestor widgets, navigate, show dialogs.',
    'BuildContext = your address in a building. context.watch() = checking your mailbox. context.read() = making a one-time request.',
    ['BuildContext = element tree pointer', 'context.findAncestorWidgetOfType', 'Theme.of(context)', 'Navigator.of(context)', 'Avoid using context after async gap → check mounted', 'context.read vs context.watch'],
    `// ❌ Using context after async gap
Future<void> save() async {
  await api.save(data);
  // Widget might be disposed by now!
  Navigator.of(context).pop(); // unsafe!
}

// ✅ Check mounted
Future<void> save() async {
  await api.save(data);
  if (!mounted) return; // check first!
  if (context.mounted) Navigator.of(context).pop();
}

// context.watch = rebuild on change
final user = context.watch<UserProvider>().user;

// context.read = one-time, no rebuild
context.read<UserProvider>().logout();`,
    [
      q('Theoretical', 'Why should you check mounted before using context after an async operation?', 'لماذا تتحقق من mounted قبل استخدام context بعد async؟', 3, ['Widget may be unmounted', 'Context would be invalid', 'Use ?context.mounted check']),
      q('Practical', 'What is the difference between context.watch and context.read?', 'ما الفرق بين context.watch و context.read؟', 2, ['watch: subscribe + rebuild', 'read: one-time access, no rebuild']),
      q('Deep Dive', 'How does Theme.of(context) work internally?', 'كيف يعمل Theme.of(context) داخلياً؟', 4, ['Walks up element tree', 'Finds nearest InheritedWidget of type', 'Registers rebuild dependency']),
      q('Critical Thinking', 'Why can you NOT store BuildContext in a class field?', 'لماذا لا تخزن BuildContext في field في الـ class؟', 3, ['Tree position can change', 'Context may become invalid', 'Leads to hard-to-trace bugs']),
      q('Practical', 'Show a SnackBar after an async operation safely', 'أظهر SnackBar بعد async operation بأمان', 2, ['Check mounted', 'Use ScaffoldMessenger stored before async', 'Or use mounted check'])
    ],
    ['يفهم element tree', 'يعرف mounted check'], ['يستخدم context بعد async بدون check', 'يخزن context في field'], ['يشرح InheritedWidget lookup', 'يذكر context.mounted'],
    ['memory-management'], 'keys-flutter', 'Keys in Flutter', [],
    'استخدام context بعد async بدون mounted check', 'if (!mounted) return; قبل أي context usage',
    'BuildContext = your address in widget tree', 'mounted check | context.watch | context.read'),
];
