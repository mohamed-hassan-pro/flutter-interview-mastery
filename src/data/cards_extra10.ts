// @ts-nocheck
import type { Card } from '@/types/card';
const mk = (id: string, num: number, title: string, titleAr: string, level: string, freq: string, tags: string[], summary: string, kp: string[], code: string, qs: any[], pre: string[], nid: string, nt: string, hook: string, cheat: string): Card => ({
  id, number: num, title, titleAr, level: level as any, frequency: freq as any, tags, definition: { summary, detailed: summary, analogy: '', keyPoints: kp, codeExample: { language: 'dart', code } }, questions: qs, interviewerMind: { whatTheyWant: kp.slice(0, 2), redFlags: ['لا يعرف ' + id], greenFlags: ['يشرح بعمق'] }, linkedCards: { prerequisites: pre, nextSteps: [{ id: nid, title: nt }], related: [] }, commonPitfalls: [{
    mistake: 'تجاهل ' + title, whyWrong: 'ضروري', correctApproach: 'تعلّم ' + title
  }], answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة'], timeAllocation: { junior: '2 دق', mid: '3 دق', senior: '5 دق' }, keyPhrases: [id] }, quickRevision: { bulletPoints: kp.slice(0, 4), memoryHook: hook, cheatSheet: cheat }
});
const q = (t: string, q: string, qa: string, d: number, p: string[]) => ({ type: t as any, question: q, questionAr: qa, difficulty: d, expectedAnswer: { points: p, timeToAnswer: '2-3 minutes' } });

export const cardsExtra10: Card[] = [
  mk('interview-study-plan', 136, '30-Day Flutter Interview Study Plan', 'خطة دراسة 30 يوماً للمقابلات',
    'Junior', 'Critical', ['Interview Skills', 'Career'],
    'A structured 30-day plan to prepare for Flutter interviews at global lead companies',
    ['Week 1: Flutter fundamentals (cards 1-30)', 'Week 2: Architecture + State management (31-70)', 'Week 3: Backend + DevOps (71-105)', 'Week 4: Mock interviews + review', 'Daily: 2 hours study + 1 hour coding', 'Daily LeetCode: 1 easy or 1 medium'],
    `// 30-Day Study Plan:

// WEEK 1 (Days 1-7): Flutter Fundamentals
// Day 1: Widget lifecycle, BuildContext
// Day 2: State Management (setState, Provider, BLoC)
// Day 3: Navigation (GoRouter, deep links)
// Day 4: Animations + Custom Painters
// Day 5: Performance optimization
// Day 6: Forms, validation, keys
// Day 7: Review + mock questions

// WEEK 2 (Days 8-14): Architecture
// Day 8: Clean Architecture
// Day 9: BLoC pattern deep dive
// Day 10: Riverpod
// Day 11: Dependency Injection
// Day 12: Freezed + code generation
// Day 13: Testing (unit + widget + integration)
// Day 14: Review + build project

// WEEK 3 (Days 15-21): Backend/DevOps
// Day 15: Dio + REST + GraphQL
// Day 16: Firebase + Supabase
// Day 17: Local storage (Hive, Drift)
// Day 18: CI/CD + deployment
// Day 19: Security + performance
// Day 20: Platform channels + plugins
// Day 21: Review + portfolio update

// WEEK 4 (Days 22-30): Mock + Review
// Days 22-25: Mock technical interviews (different domains)
// Days 26-28: Deep review of previous weeks
// Days 29-30: Behavioral + salary negotiation`,
    [
      q('Practical', 'What should you do on the day before a Flutter interview?', 'ماذا تفعل في اليوم السابق لمقابلة Flutter؟', 1, ['Light review only', 'Prepare questions to ask', 'Sleep 8 hours', 'Prepare transport route']),
      q('Practical', 'How do you stay consistent with a 30-day study plan?', 'كيف تحافظ على الالتزام بخطة دراسة 30 يوماً؟', 2, ['Same time every day', 'Study buddy accountability', 'Mark progress visually', 'Rest days are allowed']),
      q('Critical Thinking', 'Should you apply for jobs while studying or after finishing?', 'هل تتقدم للوظائف أثناء الدراسة أم بعد الانتهاء؟', 2, ['Apply during — interview practice', 'Failed interviews teach more than study', 'Worst company first for practice']),
      q('Practical', 'How do you practice system design without a study partner?', 'كيف تتدرب على system design بدون شريك دراسة؟', 2, ['YouTube + draw solo', 'Record yourself explaining', 'Join global Flutter communities']),
      q('Theoretical', 'What is the most important thing to master first for Flutter interviews?', 'ما أهم شيء تتقنه أولاً لمقابلات Flutter؟', 1, ['State management', 'BLoC or Riverpod', 'This is asked 90% of the time'])
    ],
    ['security-flutter'], 'bloc-pattern', 'BLoC Pattern Deep Dive',
    '30 days = Fundamentals→Architecture→Backend→MockInterviews', 'Week1:Widgets|Week2:Arch|Week3:Backend|Week4:Mock'),

  mk('bloc-pattern', 137, 'BLoC Pattern Deep Dive', 'BLoC Pattern بعمق',
    'Mid', 'Critical', ['Flutter', 'State Management', 'Architecture'],
    'BLoC: Business Logic Component. Events → BLoC processes → emits States. Pure functions, testable.',
    ['Bloc extends Bloc<Event, State>', 'Cubit: simplified no-events version', 'on<Event>(): event handlers', 'emit(): new state', 'bloc_test for testing', 'Sealed classes for events/states'],
    `// Full BLoC example
sealed class SearchEvent {}
class SearchQueryChanged extends SearchEvent {
  SearchQueryChanged(this.query);
  final String query;
}

sealed class SearchState {}
class SearchInitial extends SearchState {}
class SearchLoading extends SearchState {}
class SearchSuccess extends SearchState {
  SearchSuccess(this.results);
  final List<Product> results;
}
class SearchError extends SearchState {
  SearchError(this.message);
  final String message;
}

class SearchBloc extends Bloc<SearchEvent, SearchState> {
  final ProductRepository _repo;
  SearchBloc(this._repo) : super(SearchInitial()) {
    on<SearchQueryChanged>(_onSearch,
      transformer: debounce(Duration(milliseconds: 300)));
  }

  Future<void> _onSearch(SearchQueryChanged e, Emitter<SearchState> emit) async {
    if (e.query.isEmpty) return emit(SearchInitial());
    emit(SearchLoading());
    try {
      final results = await _repo.search(e.query);
      emit(SearchSuccess(results));
    } catch (err) {
      emit(SearchError(err.toString()));
    }
  }
}`,
    [
      q('Practical', 'Implement a search BLoC with debounce', 'نفذ search BLoC مع debounce', 4, ['on<Event> transformer: debounce()', 'SearchQueryChanged event', 'Loading/Success/Error states']),
      q('Theoretical', 'What is the difference between BLoC and Cubit?', 'ما الفرق بين BLoC و Cubit؟', 2, ['Cubit: direct method calls, no events', 'BLoC: events dispatch, more testable audit trail', 'Cubit for simple state, BLoC for complex']),
      q('Practical', 'Write a BLoC test for a search with loading and success states', 'اكتب BLoC test لبحث مع loading و success states', 3, ['blocTest with act', 'expect: [SearchLoading(), SearchSuccess(...)]', 'Mock repository']),
      q('System Design', 'Design BLoC structure for a multi-step checkout flow', 'صمم BLoC structure لـ checkout flow متعدد الخطوات', 4, ['Single CheckoutBloc with step state', 'Or separate BLoC per step (CartBloc, PaymentBloc)', 'Shared cart state via provider']),
      q('Deep Dive', 'How does the debounce transformer in BLoC work?', 'كيف يعمل debounce transformer في BLoC؟', 4, ['Wraps event stream with Debounce', 'Cancels pending event on new one', 'Uses rx_dart debounce internally'])
    ],
    ['interview-study-plan'], 'cubit-pattern', 'Cubit Pattern',
    'BLoC = Event→Process→State | pure, testable, predictable', 'Bloc<Event,State> | on<E>() | emit() | sealed class | debounce'),

  mk('cubit-pattern', 138, 'Cubit Pattern & When to Use It', 'Cubit Pattern ومتى تستخدمه',
    'Junior', 'Very Common', ['Flutter', 'State Management'],
    'Cubit: lightweight BLoC without events. Direct method calls, simpler code.',
    ['Cubit extends Cubit<State>', 'Methods call emit() directly', 'No event classes needed', 'Simpler than BLoC, perfect for UI state', 'BlocBuilder/BlocListener same as BLoC', 'When to use: simple state, one-level logic'],
    `class CartCubit extends Cubit<CartState> {
  CartCubit() : super(CartState.empty());

  void addItem(CartItem item) {
    emit(state.copyWith(items: [...state.items, item]));
  }

  void removeItem(String id) {
    emit(state.copyWith(items: state.items.where((i) => i.id != id).toList()));
  }

  double get total => state.items.fold(0, (sum, i) => sum + i.price);
}

// In UI
BlocBuilder<CartCubit, CartState>(
  builder: (ctx, state) => CartSummary(
    items: state.items,
    total: context.read<CartCubit>().total,
    onRemove: (id) => context.read<CartCubit>().removeItem(id),
  ),
)`,
    [
      q('Practical', 'Implement a counter with Cubit', 'نفذ counter بـ Cubit', 1, ['extends Cubit<int>', 'increment() → emit(state + 1)', 'BlocBuilder in UI']),
      q('Theoretical', 'When do you choose Cubit over BLoC?', 'متى تختار Cubit على BLoC؟', 2, ['Cubit: simple UI state, counter, toggle', 'BLoC: complex flows, event history important', 'Team decides on consistency']),
      q('Practical', 'Build a cart Cubit with add/remove items', 'ابنِ cart Cubit مع إضافة وإزالة عناصر', 3, ['CartState with List<CartItem>', 'addItem/removeItem methods', 'state.copyWith pattern']),
      q('Critical Thinking', 'Is it bad to mix Cubit and BLoC in the same app?', 'هل يُعدّ خلط Cubit وـ BLoC في نفس التطبيق سيئاً؟', 2, ['Not bad if consistent pattern', 'Cubit for simple, BLoC for complex domains', 'Team agreement matters']),
      q('Deep Dive', 'How does Cubit emit differ from BLoC emit?', 'كيف يختلف emit في Cubit عن BLoC؟', 2, ['Same mechanism internally', 'Cubit: called in methods directly', 'BLoC: called in event handler functions'])
    ],
    ['bloc-pattern'], 'isolates-dart', 'Dart Isolates',
    'Cubit = BLoC without event boilerplate', 'extends Cubit<State> | emit(newState) | BlocBuilder | state.copyWith'),

  mk('isolates-dart', 139, 'Dart Isolates & Concurrency', 'Isolates و Concurrency في Dart',
    'Senior', 'Common', ['Dart', 'Performance', 'Flutter'],
    'Dart is single-threaded. Isolates = separate threads. compute() for simple, Isolate.spawn for complex.',
    ['Dart: one isolate by default (main)', 'compute(): runs in separate isolate', 'Isolate.spawn: full control', 'SendPort/ReceivePort for communication', 'No shared memory between isolates', 'Heavy parsing, image processing → isolate'],
    `// compute() — simple case
Future<List<Product>> parseProductsIsolate(String json) =>
  compute(_parseProducts, json);

List<Product> _parseProducts(String json) {
  final list = jsonDecode(json) as List;
  return list.map((j) => Product.fromJson(j)).toList();
}

// Full Isolate — for long-running tasks
Future<void> startWorker() async {
  final receivePort = ReceivePort();
  await Isolate.spawn(_workerIsolate, receivePort.sendPort);
  final sendPort = await receivePort.first as SendPort;
  sendPort.send({'type': 'process', 'data': bigData});
  await for (final result in receivePort) {
    if (result is ProcessResult) handleResult(result);
  }
}

void _workerIsolate(SendPort port) {
  port.send('ready');
  // process messages...
}`,
    [
      q('Theoretical', 'Why does Dart use isolates instead of threads?', 'لماذا تستخدم Dart isolates بدلاً من threads؟', 4, ['No shared memory = no race conditions', 'MessagePassing for safety', 'GC per isolate independently']),
      q('Practical', 'Use compute() to parse a large JSON response', 'استخدم compute() لتحليل JSON response كبير', 2, ['compute(_parseFunction, jsonString)', 'Top-level or static function required', 'Returns Future of result']),
      q('Deep Dive', 'What are the limitations of compute() compared to Isolate.spawn?', 'ما حدود compute() مقارنة بـ Isolate.spawn؟', 4, ['compute: one send/receive', 'Isolate.spawn: bidirectional streaming', 'compute: function must be top-level']),
      q('System Design', 'Design a background image compression pipeline using isolates', 'صمم pipeline ضغط صور في الخلفية باستخدام isolates', 4, ['Isolate pool or single worker', 'Send image bytes via SendPort', 'Return compressed bytes']),
      q('Practical', 'Identify whether this code should use compute()', 3, ['Heavy synchronous computation → yes', 'Quick async IO → no, just await', 'Flutter.compute wraps Isolate.run'], 'هل هذا الكود يحتاج compute()؟', ['Heavy computation', 'Isolate.run()', 'await is for IO not CPU'])
    ],
    ['cubit-pattern'], 'null-safety-advanced', 'Null Safety Advanced',
    'Isolate = its own thread with no shared memory', 'compute() | Isolate.spawn | SendPort/ReceivePort | top-level fn'),

  mk('null-safety-advanced', 140, 'Null Safety Advanced', 'Null Safety المتقدم',
    'Junior', 'Very Common', ['Dart', 'Flutter'],
    'Null safety guarantees, late, nullable operators, type promotion, required named params',
    ['? = nullable type', '! = null assertion (throws if null)', '?? = null coalescing', '?. = null-aware member access', 'late = initialized later, not null', 'required = must-pass named param', 'Type promotion: if (x != null) x.method()'],
    `// Nullable basics
String? name; // can be null
String nonNull = 'hello'; // never null

// Null coalescing
final display = name ?? 'Anonymous';

// Null-aware method
final length = name?.length; // int? not int

// Null assertion (use carefully!)
final definitelyName = name!; // throws if null

// Late
late final Database _db;
void init() => _db = Database(); // safe after init

// Type promotion
void greet(String? name) {
  if (name != null) {
    print(name.toUpperCase()); // String, not String?
  }
}

// Required named params
void createRental({required String dressId, required String customerId}) {}`,
    [
      q('Practical', 'Explain the difference between String? and String', 'اشرح الفرق بين String? وـ String', 1, ['String? = nullable, can be null', 'String = non-null guaranteed', '? means possible absence']),
      q('Practical', 'When should you use late vs nullable?', 'متى تستخدم late مقابل nullable؟', 2, ['late: definitely initialized before use', 'nullable: genuinely may not have value', 'late + final: initialized once lazily']),
      q('Theoretical', 'What is type promotion in Dart null safety?', 'ما هو type promotion في Dart null safety؟', 3, ['Compiler promotes after null check', 'if (x != null) { x is non-null here }', 'Doesn\'t work through closures']),
      q('Deep Dive', 'Why should you avoid using ! (bang operator) excessively?', 'لماذا يجب تجنب استخدام ! بشكل مفرط؟', 3, ['Throws Null pointer equivalent on null', 'Defeats null safety purpose', 'Use ?? or conditional access instead']),
      q('Practical', 'Fix this crash: "Null check operator used on a null value"', 'صلّح هذا الـ crash', 2, ['Find the ! usage', 'Replace with ?? or if-null check', 'Add late or initialize properly'])
    ],
    ['isolates-dart'], 'generics-dart', 'Generics in Dart',
    'Null safety = types tell you about null possibility', '? nullable | ?? coalescing | ?. aware | ! assertion | late | required'),

  mk('generics-dart', 141, 'Generics in Dart', 'الـ Generics في Dart',
    'Mid', 'Common', ['Dart', 'Architecture'],
    'Generic classes, methods, bounds, covariance — writing reusable Flutter components',
    ['T = type parameter', 'class Box<T> { T value; }', '<T extends Widget> for bounded', 'List<T> is covariant', 'Generic methods', 'UseCase<Params, Return> pattern'],
    `// Generic Result wrapper
class Result<T> {
  final T? data;
  final String? error;
  const Result._({this.data, this.error});

  factory Result.success(T data) => Result._(data: data);
  factory Result.failure(String error) => Result._(error: error);

  bool get isSuccess => error == null;

  void fold({required Function(T) onSuccess, required Function(String) onError}) {
    if (isSuccess) onSuccess(data as T);
    else onError(error!);
  }
}

// Generic UseCase
abstract class UseCase<Type, Params> {
  Future<Result<Type>> call(Params params);
}

class GetRentalsUseCase extends UseCase<List<Rental>, String> {
  @override
  Future<Result<List<Rental>>> call(String customerId) async {
    return repo.getRentals(customerId);
  }
}`,
    [
      q('Practical', 'Create a generic Either<L, R> wrapper for error handling', 'أنشئ generic Either<L, R> wrapper لمعالجة الأخطاء', 4, ['class Either<L, R>', 'factory Either.left/right', 'fold() method for both cases']),
      q('Theoretical', 'What is the difference between extends and super in generic bounds?', 'ما الفرق بين extends و super في generic bounds؟', 4, ['T extends X: upper bound, T is X or subtype', 'T super X: lower bound', 'Dart doesn\'t have super bounds like Java']),
      q('Practical', 'Write a generic repository interface', 'اكتب generic repository interface', 3, ['abstract class Repository<T>', 'Future<List<T>> getAll()', 'Future<T> getById(String id)']),
      q('Deep Dive', 'How does Dart handle generic type erasure at runtime?', 'كيف تتعامل Dart مع generic type erasure في وقت التشغيل؟', 5, ['Dart has reified generics (unlike Java)', 'List<String> != List<dynamic> at runtime', 'is List<String> check works correctly']),
      q('System Design', 'Design a generic cache class that works for any type', 'صمم generic cache class تعمل مع أي type', 3, ['class Cache<T>', 'Map<String, T> _store', 'get/put/invalidate methods'])
    ],
    ['null-safety-advanced'], 'mixins-dart', 'Mixins & Extensions',
    'Generics = one class, infinite types', 'class Box<T> | extends UseCase<Type,Params> | reified at runtime'),

  mk('mixins-dart', 142, 'Mixins & Extensions in Dart', 'Mixins وـ Extensions في Dart',
    'Mid', 'Common', ['Dart', 'Flutter'],
    'mixin for reusable behavior without inheritance, extension methods for existing classes',
    ['mixin: add behavior without full inheritance', 'with keyword to use mixin', 'on: restrict mixin usage', 'extension: add methods to existing types', 'Extension methods on String, List, Widget', 'No state in extensions (only methods)'],
    `// Mixin
mixin Loggable {
  void log(String message) => print('[\${runtimeType}] \$message');
  void logError(Object e) => print('ERROR [\${runtimeType}]: \$e');
}

class RentalRepository with Loggable {
  Future<List<Rental>> getRentals() async {
    log('Fetching rentals...');
    // ...
  }
}

// Extension
extension StringX on String {
  bool get isValidPhone => RegExp(r'^[0-9]{10,15}\$').hasMatch(this);
  String get toNativeNumerals =>
    replaceAllMapped(RegExp(r'[0-9]'), (m) => '۰۱۲۳٤٥٦۷۸۹'[int.parse(m[0]!)]);
}

// Widget extensions
extension WidgetX on Widget {
  Widget padded([EdgeInsets p = const EdgeInsets.all(16)]) => Padding(padding: p, child: this);
  Widget centered() => Center(child: this);
}

// Usage
'01012345678'.isValidPhone // true
Text('Hello').centered().padded()`,
    [
      q('Practical', 'Create a mixin for analytics event logging', 'أنشئ mixin لـ analytics event logging', 3, ['mixin AnalyticsMixin', 'logEvent(name, params) method', 'Use in BLoC classes: with AnalyticsMixin']),
      q('Practical', 'Write extension methods on String for phone validation', 'اكتب extension methods على String للتحقق من الهاتف', 2, ['extension PhoneX on String', 'isValidPhone getter', 'Regex validation']),
      q('Theoretical', 'What is the difference between mixin and abstract class?', 'ما الفرق بين mixin وـ abstract class؟', 3, ['Mixin: no constructor, multiple usage', 'Abstract: single inheritance', 'Mixin: with, Abstract: extends']),
      q('Deep Dive', 'What does "on" constraint do in a mixin?', 'ماذا يفعل on constraint في mixin؟', 4, ['Restricts mixin to certain classes', 'mixin X on State<...>', 'Gives access to parent methods']),
      q('Practical', 'Add a .loading() extension to Widget that wraps it with conditional loading', 'أضف .loading() extension على Widget', 3, ['extension on Widget', 'Returns Stack with CircularProgressIndicator if loading', 'Conditional show/hide overlay'])
    ],
    ['generics-dart'], 'dart-async-advanced', 'Async Advanced',
    'Mixin = plug-in behavior | Extension = add methods to any type', 'mixin with | extension on | on constraint | no state in extensions'),

  mk('dart-async-advanced', 143, 'Dart Async: Streams & Futures Advanced', 'Async المتقدم: Streams و Futures',
    'Mid', 'Critical', ['Dart', 'Flutter'],
    'Future chaining, async*, yield, StreamController, broadcast vs single-subscription',
    ['Future.wait(): parallel futures', 'Future.any(): first completes', 'async*: generator function', 'yield: adds item to stream', 'StreamController: create custom streams', 'Broadcast: multiple listeners'],
    `// Future.wait — parallel
Future<void> loadDashboard() async {
  final [rentals, dresses, stats] = await Future.wait([
    rentalRepo.getActive(),
    dressRepo.getAvailable(),
    analyticsRepo.getStats(),
  ]);
}

// Stream generator
Stream<int> countdown(int from) async* {
  for (int i = from; i >= 0; i--) {
    yield i;
    await Future.delayed(Duration(seconds: 1));
  }
}

// StreamController — manual stream
final _controller = StreamController<String>.broadcast();
Stream<String> get messages => _controller.stream;
void addMessage(String msg) => _controller.sink.add(msg);
void dispose() => _controller.close();

// Transform streams
final upperStream = messages.map((m) => m.toUpperCase());
final filteredStream = messages.where((m) => m.isNotEmpty);`,
    [
      q('Practical', 'Run 3 API calls in parallel and wait for all', 'نفِّذ 3 API calls بالتوازي وانتظر جميعها', 2, ['Future.wait([f1, f2, f3])', 'Returns List of results', 'Throws if any fails']),
      q('Practical', 'Create a countdown timer using Stream generator', 'أنشئ countdown timer باستخدام Stream generator', 3, ['async* function', 'yield i with delay', 'StreamBuilder in UI']),
      q('Theoretical', 'What is the difference between broadcast and single-subscription streams?', 'ما الفرق بين broadcast و single-subscription streams؟', 3, ['Single: only one listener at a time', 'Broadcast: multiple listeners allowed', 'StreamController.broadcast() for multi']),
      q('Deep Dive', 'What happens if you forget to close a StreamController?', 'ماذا يحدث لو نسيت close StreamController؟', 3, ['Memory leak', 'Stream never completes', 'Listeners receive no done event']),
      q('Practical', 'Create a stream that emits rental updates every 30 seconds', 'أنشئ stream يُصدر تحديثات الإيجار كل 30 ثانية', 3, ['Stream.periodic(Duration(seconds:30), (_) => fetchRentals())', 'flatMap or asyncExpand', 'Dispose subscription in dispose()'])
    ],
    ['mixins-dart'], 'dart-collections', 'Dart Collections Advanced',
    'Future.wait = parallel lanes | async* = stream factory', 'Future.wait|any|timeout | async* yield | StreamController.broadcast'),

  mk('dart-collections', 144, 'Dart Collections Advanced', 'مجموعات Dart المتقدمة',
    'Mid', 'Common', ['Dart', 'Data Structures'],
    'Map, Set, List operations, spread operators, collection-if, collection-for, sorted, groupBy',
    ['whereType<T>(): filter + cast', 'groupBy from package:collection', 'sorted() + sortedBy(key)', 'expand() for flatten', 'indexed() for (index, value) pairs', 'Collection-if and collection-for in literals'],
    `import 'package:collection/collection.dart';

final rentals = [/* List<Rental> */];

// Group by dress category
final byCategory = rentals.groupBy((r) => r.dress.category);
// {Evening: [...], Casual: [...]}

// Sort by date
final sorted = rentals.sortedBy((r) => r.startDate);

// Filter + cast
final actives = rentals.whereType<ActiveRental>().toList();

// Collection-if
final items = [
  Title('Rentals'),
  if (isAdmin) AdminPanel(),
  ...userRentals.map(RentalTile.new),
  if (hasMore) LoadMoreButton(),
];

// Flatten nested lists
final allDressColors = dresses.expand((d) => d.availableColors).toSet();

// groupBy for map
final Map<String, int> countByStatus =
  rentals.fold({}, (map, r) {
    map[r.status] = (map[r.status] ?? 0) + 1;
    return map;
  });`,
    [
      q('Practical', 'Group a list of rentals by month using Dart', 'صنّف قائمة إيجارات حسب الشهر بـ Dart', 3, ['groupBy from collection package', 'Key: DateFormat(\'MMM\').format(date)', 'Value: List<Rental>']),
      q('Practical', 'Use collection-if to conditionally add items to a widget list', 'استخدم collection-if لإضافة عناصر بشكل شرطي لقائمة widgets', 2, ['[Text(\'always\'), if (condition) ExtraWidget()]', 'Eliminates conditional ternaries', 'Cleaner build methods']),
      q('Theoretical', 'What is the difference between map() and expand() on a List?', 'ما الفرق بين map() و expand() على List؟', 2, ['map: 1-to-1 transform', 'expand: 1-to-many (flatten)', 'expand([a,b],[c]) → [a,b,c]']),
      q('Deep Dive', 'How does Dart\'s ListEquality differ from == operator?', 'كيف يختلف ListEquality في Dart عن عامل ==؟', 3, ['== on List: reference equality', 'ListEquality.equals(): element-by-element', 'Use from collection package']),
      q('Practical', 'Find the most expensive rented dress from a List<Rental>', 'أوجد أغلى فستان مؤجر من List<Rental>', 2, ['rentals.map((r) => r.dress).maxBy((d) => d.price)', 'Or reduce/fold', 'sortedByDescending then first'])
    ],
    ['dart-async-advanced'], 'payment-integration', 'Payment Integration Deep',
    'Collections: group+sort+expand = powerful data transformations', 'groupBy | sortedBy | whereType | expand | collection-if/for'),

  mk('payment-integration', 145, 'Payment Integration Deep Dive', 'تكامل المدفوعات بعمق',
    'Senior', 'Critical', ['Flutter', 'FinTech', 'Backend'],
    'Integration of modern payment gateways: Stripe, PayPal, and regional providers',
    ['Gateway API flow (token→order→charge)', 'Reference number payment flows', 'Apple Pay & Google Pay integration', 'Webhook handling for async payments', 'Security: never store card data locally', 'PCI-DSS compliance basics'],
    `// Payment integration example
class PaymentService {
  // Step 1: Create payment intent on backend
  Future<String> createIntent(double amount) async { /* call backend */ }

  // Step 2: Confirm payment with gateway SDK
  Future<void> processPayment(BuildContext context, double amount) async {
    final clientSecret = await createIntent(amount);
    // Use Gateway SDK (e.g. Stripe.instance.confirmPayment)
  }

  // Handle results via webhooks for reliability
}`,
    [
      q('Practical', 'Implement a payment flow in Flutter', 'نفذ تدفق مدفوعات في Flutter', 4, ['Backend intent creation', 'Gateway SDK integration', 'Result handling']),
      q('Theoretical', 'How do reference-based payments work?', 'كيف تعمل المدفوعات المبنية على رقم المرجعي؟', 3, ['Generate reference number', 'User pays externally', 'Webhook notification to backend']),
      q('System Design', 'Design a payment abstraction layer supporting multiple gateways', 'صمم payment abstraction layer يدعم بوابات دفع متعددة', 4, ['Abstract Gateway interface', 'Strategy pattern per provider', 'Config-driven selection']),
      q('Critical Thinking', 'What security requirements affect payment apps?', 'ما متطلبات الأمان التي تؤثر على تطبيقات الدفع؟', 4, ['Never log/store card data', 'Use tokenization', 'Secure storage for tokens', 'HTTPS only']),
      q('Practical', 'Handle payment timeout', 'تعامل مع انتهاء وقت الدفع', 3, ['Polling status', 'Show user check button', 'Clear local state on failure'])
    ],
    ['dart-collections'], 'supabase-realtime', 'Supabase Realtime Advanced',
    'Payments: Tokenization | SDK integration | Webhooks | PCI compliance', 'Intent → Charge → Webhook | PCI safe'),

  mk('supabase-realtime', 146, 'Supabase Realtime & Edge Functions', 'Supabase Realtime وـ Edge Functions',
    'Senior', 'Common', ['Flutter', 'Backend', 'Supabase'],
    'Supabase realtime channels, presence, Edge Functions (Deno TypeScript), webhooks',
    ['Realtime channels vs table streams', 'Presence: who is online', 'Broadcast: send custom events', 'Edge Functions: Deno TypeScript', 'supabase invoke() from Flutter', 'Webhooks for third-party events'],
    `// Supabase Realtime channels
final channel = supabase
  .channel('rental-updates:\$userId')
  .onPostgresChanges(
    event: PostgresChangeEvent.all,
    schema: 'public',
    table: 'rentals',
    filter: PostgresChangeFilter(type: FilterType.eq, column: 'customer_id', value: userId),
    callback: (payload) => handleChange(payload),
  )
  .subscribe();

// Presence (online users)
channel.onPresenceSync((payload) {
  final online = channel.presenceState();
  setState(() => _onlineUsers = online.length);
});
await channel.track({'user_id': userId, 'name': userName});

// Edge Function call
final response = await supabase.functions.invoke('send-reminder',
  body: {'rental_id': rentalId});`,
    [
      q('Practical', 'Set up Supabase realtime for status changes on a specific user', 'أعدّ Supabase realtime لتغييرات الحالة لمستخدم معين', 3, ['channel().onPostgresChanges', 'Filter by owner_id', '.subscribe()']),
      q('Theoretical', 'What is the difference between Supabase table streams and realtime channels?', 'ما الفرق بين Supabase table streams وـ realtime channels؟', 3, ['stream(): simpler query-like API', 'channel(): full realtime control, presence', 'channel: custom events via broadcast']),
      q('Practical', 'Write a Supabase Edge Function to send notifications', 'اكتب Supabase Edge Function لإرسال إشعارات', 4, ['Deno TypeScript function', 'Webhook trigger', 'Call notification service']),
      q('System Design', 'Design a notification system using Supabase Edge Functions + FCM', 'صمم نظام إشعارات باستخدام Supabase Edge Functions + FCM', 4, ['Edge Function as webhook', 'Query target users', 'Send via FCM SDK']),
      q('Deep Dive', 'How does Supabase presence work under the hood?', 'كيف يعمل Supabase presence تحت الغطاء؟', 5, ['Phoenix channels (Elixir)', 'Heartbeat to maintain presence', 'Distributed state across nodes'])
    ],
    ['payment-integration'], 'code-quality-tools', 'Code Quality Tools',
    'Supabase channels = realtime + presence + broadcast', 'channel().onPostgresChanges | .track(presence) | functions.invoke'),

  mk('code-quality-tools', 147, 'Code Quality Tools: Lint, Format, Analyze', 'أدوات جودة الكود',
    'Junior', 'Very Common', ['Flutter', 'DevOps', 'Quality'],
    'dart analyze, dart format, flutter_lints, custom_lint, very_good_analysis',
    ['dart format: auto-format on save', 'dart analyze: static analysis', 'flutter_lints: official lint rules', 'very_good_analysis: stricter rules', 'custom_lint: write your own rules', 'Pre-commit hooks via lefthook/husky'],
    `# analysis_options.yaml
include: package:very_good_analysis/analysis_options.yaml

analyzer:
  errors:
    missing_required_param: error
    dead_code: warning

linter:
  rules:
    always_declare_return_types: true
    avoid_dynamic_calls: true
    prefer_const_constructors: true
    avoid_print: true
    unawaited_futures: error

# Pre-commit hook (lefthook.yaml)
pre-commit:
  commands:
    analyze:
      run: dart analyze
    format:
      run: dart format --set-exit-if-changed .
    test:
      run: flutter test`,
    [
      q('Practical', 'Set up strict lint rules in a Flutter project', 'أعدّ strict lint rules في مشروع Flutter', 2, ['Add to pubspec.yaml dev_dependencies', 'analysis_options.yaml include', 'Fix all analyzer warnings']),
      q('Practical', 'Configure pre-commit hooks to auto-lint before every commit', 'أعدّ pre-commit hooks للـ lint التلقائي', 3, ['lefthook.yaml config', 'Commands: analyze + format + test', 'Fail commit on lint error']),
      q('Theoretical', 'What does "avoid_print" lint rule enforce?', 'ما الذي يُفرضه avoid_print lint rule؟', 2, ['print() in production code is bad', 'Use a proper logger package', 'debugPrint() is slightly better']),
      q('System Design', 'Design a code quality pipeline from editor to CI', 'صمم code quality pipeline من المحرر للـ CI', 3, ['IDE: auto format on save', 'Pre-commit: lint check', 'CI: analyze + test gate']),
      q('Deep Dive', 'What is custom_lint and when would you write custom rules?', 'ما هو custom_lint ومتى تكتب قواعد مخصصة؟', 4, ['Enforce team-specific patterns', 'Ban certain APIs in your codebase', 'Automate common code review comments'])
    ],
    ['supabase-realtime'], 'profiling-flutter', 'Flutter Profiling',
    'Lint = automated code reviewer that never gets tired', 'dart format | dart analyze | flutter_lints | very_good_analysis | lefthook'),

  mk('profiling-flutter', 148, 'Flutter Profiling & DevTools', 'Flutter Profiling وـ DevTools',
    'Senior', 'Common', ['Flutter', 'Performance'],
    'DevTools: Timeline, Memory, Network, Widget Inspector, CPU Profiler',
    ['Profile mode: flutter run --profile', 'Timeline: frame rendering + jank', 'Memory: heap snapshots, growth', 'Widget Inspector: layout debugging', 'Network: API call inspection', 'CPU Profiler: hotspot functions'],
    `// Enable performance overlay in code
import 'package:flutter/rendering.dart';
debugPaintSizeEnabled = true; // layout debugging
debugRepaintRainbowEnabled = true; // repaint tracking

// Profile in terminal:
// flutter run --profile
// Go to DevTools → Performance

// Read performance overlay:
// Upper graph: RasterThread (GPU)
// Lower graph: UIThread (Dart)
// Green bars = good (<16ms for 60fps)
// Red bars = jank (>16ms)

// Memory snapshot steps:
// 1. DevTools → Memory
// 2. Take snapshot before action
// 3. Perform action (navigate, load data)
// 4. Take snapshot after
// 5. Compare: what grew?`,
    [
      q('Practical', 'Use DevTools to find and fix a jank in a list scroll', 'استخدم DevTools للعثور على jank وإصلاحه في تمرير قائمة', 4, ['flutter run --profile', 'DevTools Timeline: find slow frames', 'Identify: build/layout/paint time', 'Fix: const, builder, RepaintBoundary']),
      q('Practical', 'Take memory snapshots to find a leak', 'التقط memory snapshots للعثور على تسرب', 3, ['Before navigation: snapshot', 'Navigate: perform action', 'After navigation: snapshot', 'Compare retained objects']),
      q('Theoretical', 'What is the difference between UIThread and RasterThread in profiling?', 'ما الفرق بين UIThread وـ RasterThread في الـ profiling؟', 4, ['UIThread: Dart code, widget build', 'RasterThread: GPU/Impeller drawing', 'Both must finish < 16ms for 60fps']),
      q('Deep Dive', 'What does debugRepaintRainbowEnabled do?', 'ماذا يفعل debugRepaintRainbowEnabled؟', 3, ['Shows widgets that repaint', 'Each repaint = different color', 'Too many = RepaintBoundary needed']),
      q('System Design', 'Design a performance monitoring strategy for a production Flutter app', 'صمم استراتيجية monitoring الأداء لـ Flutter app في production', 4, ['Crashlytics for crashes', 'Firebase Performance for network', 'Custom metrics via Analytics', 'Regular profiling before releases'])
    ],
    ['code-quality-tools'], 'flutter-3-navigation', 'Flutter 3 Navigation Improvements',
    'DevTools = MRI for your Flutter app performance', '--profile | Timeline | UIThread/RasterThread | Memory snapshots'),

  mk('flutter-3-navigation', 149, 'Flutter 3 Navigation & ShellRoute', 'Navigation في Flutter 3 و ShellRoute',
    'Mid', 'Very Common', ['Flutter', 'Navigation'],
    'GoRouter ShellRoute for persistent bottom navigation, StatefulShellRoute for state preservation',
    ['ShellRoute: shared scaffold across routes', 'StatefulShellRoute: preserves state per branch', 'Each branch has its own navigator', 'StatefulNavigationShell: branch switching', 'IndexedStack equivalent via routing', 'Deep links work within shell routes'],
    `// StatefulShellRoute for persistent bottom nav
final router = GoRouter(routes: [
  StatefulShellRoute.indexedStack(
    builder: (ctx, state, shell) =>
      ScaffoldWithBottomNav(child: shell),
    branches: [
      StatefulShellBranch(routes: [
        GoRoute(path: '/home', builder: (_, __) => HomeScreen()),
      ]),
      StatefulShellBranch(routes: [
        GoRoute(path: '/rentals', builder: (_, __) => RentalsScreen()),
      ]),
      StatefulShellBranch(routes: [
        GoRoute(path: '/profile', builder: (_, __) => ProfileScreen()),
      ]),
    ],
  ),
]);

// Scaffold with bottom nav
class ScaffoldWithBottomNav extends StatelessWidget {
  Widget build(ctx) => Scaffold(
    body: child,
    bottomNavigationBar: NavigationBar(
      selectedIndex: shell.currentIndex,
      onDestinationSelected: shell.goBranch,
    ),
  );
}`,
    [
      q('Practical', 'Implement a 3-tab bottom nav that preserves state on tab switch', 'نفذ bottom nav بـ 3 تبويبات تحافظ على الحالة عند التبديل', 3, ['StatefulShellRoute.indexedStack', 'One StatefulShellBranch per tab', 'State preserved via IndexedStack']),
      q('Theoretical', 'What is the difference between ShellRoute and StatefulShellRoute?', 'ما الفرق بين ShellRoute وـ StatefulShellRoute؟', 3, ['ShellRoute: shared layout, no state preservation', 'StatefulShellRoute: each branch keeps its own navigator/state', 'StatefulShellRoute for productionbottom nav']),
      q('Practical', 'Add deep link support within a tab in StatefulShellRoute', 'أضف deep link support داخل tab في StatefulShellRoute', 3, ['Add nested GoRoute in branch', 'Deep link navigates to branch + shows sub-route', 'GoRouter handles URL matching']),
      q('System Design', 'Design navigation for an app with 5 tabs and nested routes', 'صمم navigation لتطبيق بـ 5 تبويبات ومسارات متداخلة', 4, ['StatefulShellRoute with 5 branches', 'Each branch: GoRoute for list + detail', 'Deep link: /tab/detail/:id']),
      q('Critical Thinking', 'Why is StatefulShellRoute better than IndexedStack manually?', 'لماذا StatefulShellRoute أفضل من IndexedStack يدوياً؟', 3, ['URL reflects current tab', 'Deep linking works', 'Back button handles correctly', 'GoRouter manages tab history'])
    ],
    ['profiling-flutter'], 'final-card', 'The Complete Flutter Developer',
    'StatefulShellRoute = persistent bottom nav + state preservation', 'StatefulShellRoute.indexedStack | branches | goBranch | deep links'),

  mk('final-card', 150, 'The Complete Flutter Developer', 'مطور Flutter المكتمل',
    'Senior', 'Critical', ['Career', 'Flutter', 'Interview Skills'],
    'What separates good Flutter devs from great ones in the global tech market',
    ['Technically: Clean Architecture + State Management + Testing', 'Soft skills: communication, language proficiency', 'Business: understands the product and user needs', 'Market expertise: RTL support, accessibility, localization', 'Portfolio: real apps, open source, blog', 'Growth: constantly learning, Flutter evolves fast'],
    `// The great Flutter developer checklist:

// TECHNICAL EXCELLENCE
// ✅ Clean Architecture (Domain → Data → Presentation)
// ✅ State: BLoC + Riverpod
// ✅ Testing: Unit + Widget + Integration
// ✅ Performance: DevTools profiling
// ✅ CI/CD pipeline ownership
// ✅ Platform channels for native needs

// PRODUCT MINDSET
// ✅ Understands user needs, not just tickets
// ✅ Considers performance impact of choices
// ✅ Thinks about accessibility
// ✅ Contributes to architecture decisions

// MARKET EXPERTISE
// ✅ Multi-language / RTL support
// ✅ Modern payment integration
// ✅ Low connectivity optimization
// ✅ High accessibility standards

// COMMUNITY & GROWTH
// ✅ GitHub: active contributions
// ✅ pub.dev: published packages
// ✅ Blog: shares knowledge
// ✅ Mentors junior developers`,
    [
      q('Critical Thinking', 'What separates a senior Flutter developer from a mid-level?', 'ما الذي يُفرّق Senior Flutter developer عن Mid؟', 3, ['System design capability', 'Mentoring others', 'CI/CD ownership', 'Proactive problem solving']),
      q('Theoretical', 'What are the most important Flutter skills to master in 2025?', 'ما أهم Flutter skills للإتقان في 2025؟', 2, ['Riverpod codegen', 'Impeller renderer knowledge', 'Flutter Web growing', 'Multi-platform desktop']),
      q('Critical Thinking', 'How do you stay current with Flutter\'s rapid evolution?', 'كيف تبقى محدثاً مع تطور Flutter السريع؟', 2, ['Flutter official blog', 'FlutterDev on YouTube', 'Flutter Weekly newsletter', 'Technical communities']),
      q('Practical', 'What would you build as your ultimate portfolio project?', 'ما الذي ستبنيه كمشروع portfolio نهائي؟', 3, ['Real problem solved', 'Localization first', 'Payment integration', 'Clean Architecture + tests + CI']),
      q('Critical Thinking', 'If you could only keep 5 Flutter skills, which would they be?', 'لو كان بإمكانك الاحتفاظ بـ 5 Flutter skills فقط، ما هي؟', 3, ['Clean Architecture', 'State Management', 'Testing', 'Performance optimization', 'Platform channels'])
    ],
    ['flutter-3-navigation'], 'widget-lifecycle', 'Widget Lifecycle (Card 1)',
    '150 cards = Complete Flutter developer = hired!', 'Tech+Product+Market+Community = Complete Flutter Dev'),
];
