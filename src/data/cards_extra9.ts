// @ts-nocheck
import type { Card } from '@/types/card';
const mk = (id: string, num: number, title: string, titleAr: string, level: string, freq: string, tags: string[], summary: string, kp: string[], code: string, qs: any[], pre: string[], nid: string, nt: string, hook: string, cheat: string): Card => ({
  id, number: num, title, titleAr, level: level as any, frequency: freq as any, tags, definition: { summary, detailed: summary, analogy: '', keyPoints: kp, codeExample: { language: 'dart', code } }, questions: qs, interviewerMind: { whatTheyWant: kp.slice(0, 2), redFlags: ['لا يعرف ' + id], greenFlags: ['يشرح بعمق'] }, linkedCards: { prerequisites: pre, nextSteps: [{ id: nid, title: nt }], related: [] }, commonPitfalls: [{
    mistake: 'تجاهل ' + title, whyWrong: 'ضروري', correctApproach: 'تعلّم ' + title
  }], answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة'], timeAllocation: { junior: '2 دق', mid: '3 دق', senior: '5 دق' }, keyPhrases: [id] }, quickRevision: { bulletPoints: kp.slice(0, 4), memoryHook: hook, cheatSheet: cheat }
});
const q = (t: string, q: string, qa: string, d: number, p: string[]) => ({ type: t as any, question: q, questionAr: qa, difficulty: d, expectedAnswer: { points: p, timeToAnswer: '2-3 minutes' } });

// ===== FINAL 35 CARDS (116-150) =====
export const cardsExtra9: Card[] = [
  mk('list-view-optimization', 116, 'ListView & Scroll Optimization', 'تحسين ListView والتمرير',
    'Junior', 'Very Common', ['Flutter', 'Performance', 'UI'],
    'ListView.builder vs .separated vs .custom, itemExtent, cacheExtent, addAutomaticKeepAlives',
    ['ListView.builder: lazy, O(1) memory', 'itemExtent: skip layout calc = faster', 'cacheExtent: preload offscreen items', 'addAutomaticKeepAlives: false for dense lists', 'SliverList for custom scroll effects', 'PageView for horizontal card swipe'],
    `// Optimized list
ListView.builder(
  itemCount: items.length,
  itemExtent: 80.0, // ✅ fixed height = no layout calc
  cacheExtent: 500, // preload 500px offscreen
  addAutomaticKeepAlives: false,
  addRepaintBoundaries: true,
  itemBuilder: (ctx, i) => ItemTile(key: ValueKey(items[i].id), item: items[i]),
)

// With separator
ListView.separated(
  itemCount: items.length,
  separatorBuilder: (_, __) => const Divider(height: 1),
  itemBuilder: (ctx, i) => ItemTile(items[i]),
)`,
    [
      q('Theoretical', 'Why is ListView.builder more efficient than ListView?', 'لماذا ListView.builder أكفأ من ListView؟', 2, ['Lazy: builds only visible items', 'ListView builds all at once', 'O(1) vs O(n) memory']),
      q('Practical', 'Optimize a list of 10,000 contacts for smooth scrolling', 'حسّن قائمة 10,000 جهة اتصال للتمرير السلس', 3, ['ListView.builder', 'itemExtent = fixed height', 'addAutomaticKeepAlives: false']),
      q('Practical', 'Implement infinite scroll pagination with ListView.builder', 'نفذ Infinite scroll pagination بـ ListView.builder', 3, ['Listen to scroll controller', 'Load more at 80% scroll', 'Append to items list']),
      q('Deep Dive', 'What is cacheExtent in ListView and how does it help?', 'ما هو cacheExtent في ListView وكيف يساعد؟', 3, ['Pixels to keep rendered off-screen', 'Reduces build during fast scroll', 'Default: 250px']),
      q('Critical Thinking', 'When would you use a SliverList instead of ListView?', 'متى تستخدم SliverList بدلاً من ListView؟', 3, ['Mixed scroll content (appbar+list+footer)', 'CustomScrollView with multiple slivers', 'Complex scroll effects'])
    ],
    ['interview-final-prep'], 'provider-riverpod', 'Provider & Riverpod Deep',
    'ListView.builder = lazy chef, only cooks what you see', 'builder | itemExtent | cacheExtent | addAutomaticKeepAlives:false'),

  mk('provider-riverpod', 117, 'Provider & Riverpod Deep Dive', 'Provider و Riverpod بعمق',
    'Mid', 'Critical', ['Flutter', 'State Management'],
    'ChangeNotifier vs StateNotifier, providers composition, ref.watch/read/listen, code generation',
    ['ChangeNotifierProvider: mutable, simple', 'StateNotifierProvider: immutable state', 'Provider: computed derived state', 'FutureProvider: async data', 'StreamProvider: real-time', '@riverpod codegen: annotation-based'],
    `// Riverpod — modern approach
@riverpod
Future<List<Product>> products(ProductsRef ref) =>
  ref.watch(productRepositoryProvider).getProducts();

// With family (parameterized)
@riverpod
Future<Product> product(ProductRef ref, String id) =>
  ref.watch(productRepositoryProvider).getById(id);

// In UI
class ProductsScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final products = ref.watch(productsProvider);
    return products.when(
      data: (list) => ProductList(list),
      loading: () => const CircularProgressIndicator(),
      error: (e, _) => ErrorWidget(e.toString()),
    );
  }
}`,
    [
      q('Practical', 'Migrate a ChangeNotifier counter to Riverpod StateNotifier', 'انقل counter بـ ChangeNotifier لـ Riverpod StateNotifier', 3, ['StateNotifier<CounterState>', 'StateNotifierProvider', 'ref.read(counterProvider.notifier).increment()']),
      q('Theoretical', 'What is the difference between ref.watch and ref.read?', 'ما الفرق بين ref.watch و ref.read؟', 2, ['watch: subscribe + rebuild on change', 'read: one-time access, no rebuild']),
      q('Deep Dive', 'How does Riverpod handle provider disposal differently from Provider?', 'كيف يتعامل Riverpod مع Provider disposal بشكل مختلف؟', 4, ['Riverpod: auto-dispose when no listeners', 'Provider: tied to widget tree', 'More memory efficient']),
      q('Practical', 'Create a FutureProvider that fetches user profile', 'أنشئ FutureProvider يجلب ملف المستخدم الشخصي', 2, ['@riverpod Future<User> userProfile(ref)', 'ref.watch(userProfileProvider).when()']),
      q('System Design', 'Design the provider graph for a rental app with user, dresses, rentals', 'صمم provider graph لتطبق إيجار مع مستخدم وفساتين وإيجارات', 4, ['userProvider', 'dressesProvider watches userProvider', 'rentalsProvider family by dress ID'])
    ],
    ['list-view-optimization'], 'freezed-package', 'Freezed & Code Generation',
    'Riverpod = Provider++ with auto-dispose and codegen', 'ref.watch|read|listen | FutureProvider | StreamProvider | @riverpod'),

  mk('freezed-package', 118, 'Freezed & Code Generation', 'مكتبة Freezed وتوليد الكود',
    'Mid', 'Common', ['Flutter', 'Dart', 'Architecture'],
    'Freezed for immutable data classes, union types, copyWith, json_serializable integration',
    ['@freezed annotation', 'Immutable data classes', 'copyWith() generated', '==, hashCode, toString generated', 'Union types (sealed class alternative)', 'Integrates with json_serializable'],
    `@freezed
class Product with _\$Product {
  const factory Product({
    required String id,
    required String name,
    required double price,
    @Default(false) bool isFavorite
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) =>
    _\$ProductFromJson(json);
}

// Union type for states
@freezed
class RentalState with _\$RentalState {
  const factory RentalState.initial() = RentalInitial;
  const factory RentalState.loading() = RentalLoading;
  const factory RentalState.success(List<Rental> rentals) = RentalSuccess;
  const factory RentalState.error(String message) = RentalError;
}

// Usage with pattern matching
state.when(
  initial: () => EmptyWidget(),
  loading: () => CircularProgressIndicator(),
  success: (rentals) => RentalList(rentals),
  error: (msg) => ErrorWidget(msg),
)`,
    [
      q('Practical', 'Create a Freezed model for a Rental with copyWith', 'أنشئ Freezed model لـ Rental مع copyWith', 2, ['@freezed annotation', 'const factory constructor', 'run build_runner']),
      q('Theoretical', 'Why is Freezed preferred over manual data classes?', 'لماذا يُفضَّل Freezed على data classes اليدوية؟', 2, ['Auto-generates ==, hashCode, copyWith', 'Less boilerplate', 'Union types support']),
      q('Practical', 'Use Freezed union types for BLoC state', 'استخدم Freezed union types لـ BLoC state', 3, ['@freezed class AppState', 'factory AppState.loading()', 'state.when() for exhaustive handling']),
      q('Deep Dive', 'How does Freezed generate code with build_runner?', 'كيف يولّد Freezed الكود بـ build_runner؟', 3, ['Reads @freezed annotations', 'Generates *.freezed.dart files', 'Generates *.g.dart for JSON']),
      q('System Design', 'Design all data models for a rental app using Freezed', 'صمم جميع data models لتطبيق إيجار بـ Freezed', 4, ['Customer, Dress, Rental, Payment', 'Union states per feature', 'JSON serialization included'])
    ],
    ['provider-riverpod'], 'error-handling-patterns', 'Error Handling Patterns',
    'Freezed = auto-magic immutable class generator', '@freezed | copyWith | union types | when() | build_runner'),

  mk('error-handling-patterns', 119, 'Error Handling Patterns', 'أنماط معالجة الأخطاء',
    'Mid', 'Critical', ['Flutter', 'Architecture', 'Dart'],
    'Either, Result, Failure hierarchy, global error handling, user-friendly messages',
    ['Either<Failure, T> from dartz/fpdart', 'Failure hierarchy: NetworkFailure, ServerFailure', 'map(), fold() on Either', 'FlutterError.onError for global catch', 'Zone.runGuarded for async errors', 'User-friendly error messages'],
    `// Failure hierarchy
abstract class Failure {
  final String message;
  const Failure(this.message);
}

class NetworkFailure extends Failure {
  const NetworkFailure() : super('تحقق من اتصالك بالإنترنت');
}

class ServerFailure extends Failure {
  const ServerFailure([String msg = 'خطأ في الخادم']) : super(msg);
}

// Repository with Either
Future<Either<Failure, List<Rental>>> getRentals() async {
  try {
    final data = await dio.get('/rentals');
    return Right(data.data.map(Rental.fromJson).toList());
  } on DioException catch (e) {
    if (e.type == DioExceptionType.connectionError) {
      return Left(NetworkFailure());
    }
    return Left(ServerFailure(e.message ?? 'خطأ'));
  }
}

// BLoC handling
final result = await useCase();
result.fold(
  (failure) => emit(state.copyWith(error: failure.message)),
  (rentals) => emit(state.copyWith(rentals: rentals)),
)`,
    [
      q('Practical', 'Implement Either type for an API call', 'نفذ Either type لـ API call', 3, ['Return Either<Failure, Data>', 'try/catch in repository', 'fold() in BLoC']),
      q('Theoretical', 'Why is Either<Failure, T> better than throw/catch for business logic?', 'لماذا Either<Failure, T> أفضل من throw/catch في business logic؟', 3, ['Explicit in function signature', 'Compiler forces handling', 'No hidden exceptions']),
      q('Practical', 'Set up global error handling in Flutter', 'أعدّ global error handling في Flutter', 3, ['FlutterError.onError', 'PlatformDispatcher.instance.onError', 'Crashlytics integration']),
      q('System Design', 'Design user-friendly error messages', 'صمم رسائل خطأ سهلة الفهم', 3, ['Arabic messages by default', 'Actionable: "تحقق من الاتصال"', 'Retry button for network errors']),
      q('Deep Dive', 'What is the difference between Error and Exception in Dart?', 'ما الفرق بين Error و Exception في Dart؟', 4, ['Error: programming error, don\'t catch', 'Exception: expected condition to handle', 'OutOfMemoryError vs NetworkException'])
    ],
    ['freezed-package'], 'sliver-custom-scroll', 'Sliver & CustomScrollView',
    'Either<Failure, T> = make errors impossible to ignore', 'Either | fold() | Failure hierarchy | FlutterError.onError'),

  mk('sliver-custom-scroll', 120, 'Sliver & CustomScrollView', 'Sliver و CustomScrollView',
    'Senior', 'Common', ['Flutter', 'UI', 'Performance'],
    'SliverAppBar, SliverList, SliverGrid, SliverToBoxAdapter for complex scrollable UIs',
    ['CustomScrollView: compose scroll effects', 'SliverAppBar: collapsible headers', 'SliverList: lazy list in sliver', 'SliverGrid: lazy grid in sliver', 'SliverToBoxAdapter: box widget in scroll', 'SliverPersistentHeader: sticky headers'],
    `CustomScrollView(
  slivers: [
    // Collapsing app bar with gradient
    SliverAppBar(
      expandedHeight: 250,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        title: Text('Dresses'),
        background: NetworkImage(collectionImage),
      ),
    ),
    // Sticky filter row
    SliverPersistentHeader(
      pinned: true,
      delegate: _FilterDelegate(),
    ),
    // Lazy grid
    SliverGrid(
      delegate: SliverChildBuilderDelegate(
        (ctx, i) => DressCard(dresses[i]),
        childCount: dresses.length,
      ),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2, childAspectRatio: 0.75,
      ),
    ),
    // Load more indicator
    SliverToBoxAdapter(child: LoadMoreWidget()),
  ],
)`,
    [
      q('Practical', 'Build a collapsing header with a sticky filter row above a product grid', 'ابنِ header قابل للطي مع filter row ثابت فوق grid منتجات', 4, ['SliverAppBar', 'SliverPersistentHeader', 'SliverGrid']),
      q('Theoretical', 'What is the difference between SliverList and ListView.builder?', 'ما الفرق بين SliverList و ListView.builder؟', 3, ['SliverList: must be inside CustomScrollView', 'ListView.builder: standalone', 'SliverList for composing with other slivers']),
      q('Practical', 'Add a sticky header divider between sections in a scroll view', 'أضف header ثابت بين أقسام في scroll view', 3, ['SliverPersistentHeader', 'Custom delegate', 'pinned: true']),
      q('Deep Dive', 'How does Flutter handle layout for Slivers differently from box widgets?', 'كيف تتعامل Flutter مع layout الـ Slivers بشكل مختلف عن box widgets؟', 5, ['Slivers use SliverConstraints', 'Overlap allowed for pinned headers', 'paintOrigin vs layoutOffset']),
      q('System Design', 'Design a product browsing screen with collapsing header, filters, and infinite scroll', 'صمم شاشة تصفح منتجات مع header، فلاتر، وتمرير لانهائي', 4, ['SliverAppBar + SliverPersistentHeader', 'SliverGrid with lazy loading', 'SliverToBoxAdapter for loader'])
    ],
    ['error-handling-patterns'], 'platform-specific-code', 'Platform Specific Code',
    'Slivers = Lego bricks for complex scroll UIs', 'SliverAppBar | SliverPersistentHeader | SliverGrid | CustomScrollView'),

  mk('platform-specific-code', 121, 'Platform Specific Code', 'الكود الخاص بالمنصة',
    'Mid', 'Common', ['Flutter', 'Platform', 'Native'],
    'dart:io Platform checks, conditional imports, plugin development basics',
    ['Platform.isAndroid/isIOS/isMacOS', 'kIsWeb for web check', 'defaultTargetPlatform', 'Conditional imports (stub files)', 'Platform-specific UI patterns', 'Multi-platform: Android/iOS/Web/Desktop'],
    `import 'package:flutter/foundation.dart';
import 'dart:io';

// Platform detection
if (Platform.isAndroid) {
  // Android-specific
} else if (Platform.isIOS) {
  // iOS-specific
}

// Web-safe check (Platform throws on web)
if (kIsWeb) {
  // Web
} else if (Platform.isAndroid) {
  // Android
}

// Adaptive widgets
Widget buildSwitch() {
  return switch (defaultTargetPlatform) {
    TargetPlatform.iOS || TargetPlatform.macOS =>
      CupertinoSwitch(value: val, onChanged: onChanged),
    _ => Switch(value: val, onChanged: onChanged)
  };
}`,
    [
      q('Theoretical', 'Why should you check kIsWeb before Platform.isAndroid?', 'لماذا تتحقق من kIsWeb قبل Platform.isAndroid؟', 3, ['Platform throws on web', 'kIsWeb is always safe', 'Check web first, then platform']),
      q('Practical', 'Build a platform-specific date picker', 'ابنِ date picker خاص بكل منصة', 2, ['showDatePicker for Android', 'CupertinoDatePicker for iOS', 'Platform check to switch']),
      q('Practical', 'Create a plugin that uses native code on both platforms', 'أنشئ plugin يستخدم native code على كلا المنصتين', 4, ['MethodChannel with platform handlers', 'Kotlin for Android (android/ dir)', 'Swift for iOS (ios/ dir)']),
      q('System Design', 'Design a feature that works differently on iOS and Android', 'صمم feature يعمل بشكل مختلف على iOS و Android', 3, ['Abstract platform interface', 'Platform-specific implementations', 'Factory to select implementation']),
      q('Deep Dive', 'What is defaultTargetPlatform vs Platform.isX?', 'ما الفرق بين defaultTargetPlatform و Platform.isX؟', 3, ['defaultTargetPlatform: safe on web', 'Platform.isX: throws on web', 'Use defaultTargetPlatform for UI decisions'])
    ],
    ['sliver-custom-scroll'], 'supabase-flutter', 'Supabase in Flutter',
    'kIsWeb first, then Platform check — never the other way', 'kIsWeb | Platform.isAndroid | defaultTargetPlatform | adaptive widgets'),

  mk('supabase-flutter', 122, 'Supabase in Flutter', 'Supabase في Flutter',
    'Mid', 'Very Common', ['Flutter', 'Backend', 'Database'],
    'Supabase as Firebase alternative: auth, Postgres queries, realtime, storage, edge functions',
    ['supabase_flutter package', 'Auth: signInWithPassword, signUp, signOut', 'PostgreSQL queries: .select().eq().order()', 'Realtime subscriptions per table', 'Storage: uploadBinary, getPublicUrl', 'Row Level Security (RLS)'],
    `final supabase = Supabase.instance.client;

// Auth
await supabase.auth.signInWithPassword(email: e, password: p);
final user = supabase.auth.currentUser;

// CRUD
final rentals = await supabase
  .from('rentals')
  .select('*, dresses(name, image_url)')
  .eq('customer_id', userId)
  .order('created_at', ascending: false);

// Realtime
supabase.from('rentals')
  .stream(primaryKey: ['id'])
  .eq('customer_id', userId)
  .listen((data) => setState(() => _rentals = data));

// Storage
await supabase.storage.from('dress-images')
  .uploadBinary('dress/\$id.jpg', bytes);
final url = supabase.storage.from('dress-images').getPublicUrl('dress/\$id.jpg');`,
    [
      q('Practical', 'Query rentals with joined dress data in Supabase', 'استعلم عن الإيجارات مع بيانات الفستان مرتبطة في Supabase', 2, ['.select(\'*, dresses(name)\')', 'Foreign key select', 'Filter with .eq()']),
      q('Practical', 'Implement real-time updates for rental status changes', 'نفذ تحديثات real-time لتغييرات حالة الإيجار', 3, ['.stream(primaryKey: [\'id\'])', 'Listen for changes', 'Update UI on new data']),
      q('Theoretical', 'What is Row Level Security in Supabase?', 'ما هو Row Level Security في Supabase؟', 3, ['Postgres RLS policies', 'Server-side access control', 'e.g. auth.uid() = customer_id']),
      q('System Design', 'Design the Supabase schema for a dress rental app', 'صمم Supabase schema لتطبيق إيجار فساتين', 4, ['Tables: customers, dresses, rentals', 'RLS: each customer sees own data', 'Storage: dress images bucket']),
      q('Deep Dive', 'How does Supabase realtime work under the hood?', 'كيف يعمل Supabase realtime تحت الغطاء؟', 4, ['PostgreSQL logical replication', 'Websocket connection to realtime server', 'Track insert/update/delete events'])
    ],
    ['platform-specific-code'], 'dart3-features', 'Dart 3 New Features',
    'Supabase = open-source Firebase with Postgres power', 'from(table).select().eq().order() | stream() | RLS'),

  mk('dart3-features', 123, 'Dart 3 & Flutter 3.x New Features', 'مميزات Dart 3 و Flutter 3.x',
    'Mid', 'Very Common', ['Dart', 'Flutter'],
    'Dart 3: records, patterns, class modifiers. Flutter 3.x: Impeller, Material 3, adaptive',
    ['Dart 3: records, patterns, sealed classes', 'class modifiers: base, final, interface, sealed', 'switch expressions (not statements)', 'if-case pattern matching', 'Flutter: Material 3 design tokens', 'Flutter: adaptive scaffold'],
    `// Dart 3: switch expression
final area = switch (shape) {
  Circle(:var r) => pi * r * r,
  Rectangle(:var w, :var h) => w * h,
  _ => throw ArgumentError('Unknown')
  };

// if-case pattern
if (response case {'status': 'success', 'data': final data}) {
  handleSuccess(data);
}

// class modifiers
base class Animal {} // can extend, can't implement
final class Counter {} // can't extend or implement
interface class Logger {} // can implement only, not extend

// Material 3
MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: Color(0xFF6B21A8)),
  ),
)`,
    [
      q('Practical', 'Refactor a long if-else chain to use Dart 3 switch expression', 'أعد هيكلة if-else طويل لاستخدام Dart 3 switch expression', 2, ['switch(value) { case X => result }', 'Returns value directly', 'Exhaustive with _']),
      q('Theoretical', 'What are Dart 3 class modifiers (base, final, interface, sealed)?', 'ما هي class modifiers في Dart 3؟', 3, ['base: can extend not implement', 'final: can\'t extend or implement', 'interface: can implement not extend', 'sealed: exhaustive switch']),
      q('Practical', 'Enable Material 3 and use ColorScheme.fromSeed', 'فعّل Material 3 واستخدم ColorScheme.fromSeed', 2, ['useMaterial3: true', 'ColorScheme.fromSeed(seedColor: primaryColor)', 'NavigationBar instead of BottomNavigationBar']),
      q('System Design', 'Migrate an existing Flutter 2 app to Flutter 3.x/Dart 3', 'انقل تطبيق Flutter 2 موجود لـ Flutter 3.x/Dart 3', 4, ['Null safety (already done)', 'Dart 3 breaking changes', 'class modifier conflicts']),
      q('Deep Dive', 'What breaking changes came with Dart 3?', 'ما التغييرات التي سببت كسراً في Dart 3؟', 4, ['No mixin class without mixin keyword', 'Enum members must have semicolon', 'Ambiguous switches resolved differently'])
    ],
    ['supabase-flutter'], 'interview-questions-arabic', 'Arabic Interview Context',
    'Dart 3 = records+patterns+sealed+switch expression', 'switch expression | sealed class | records | class modifiers | Material 3'),

  mk('interview-questions-arabic', 124, 'Arabic Interview Context', 'سياق المقابلة بالعربية',
    'Junior', 'Critical', ['Interview Skills'],
    'How to handle Arabic/Bilingual interviews, technical terms in Arabic',
    ['Some interviews are 100% Arabic', 'Know Flutter terms in Arabic', 'Mix Arabic/English naturally', 'Don\'t overcorrect to pure English', 'Practice explaining State Management in Arabic', 'Communication skills in native language'],
    `// Common technical terms in Arabic:
// Widget = مكوّن / ويدجت
// State = الحالة
// Repository = مستودع البيانات
// Build = البناء / الـ Build
// Performance = الأداء
// API = واجهة برمجية
// Database = قاعدة بيانات
// Architecture = معمارية / هيكل البرنامج
// Testing = الاختبار
// Deployment = النشر

// How to explain Null Safety in Arabic:
// "Null Safety هي ميزة في Dart بتمنع الـ crashes اللي بتحدث من
//  القيم الفارغة. كل متغير لازم تحدد إذا كان ممكن يكون فاضي
//  (nullable ?) أو لا (non-nullable)"`,
    [
      q('Practical', 'Explain the BLoC pattern in Arabic in under 2 minutes', 'اشرح BLoC pattern بالعربية في أقل من دقيقتين', 3, ['Events → BLoC → States', 'BLoC = business logic separator', 'مثال: search query → results']),
      q('Theoretical', 'How to handle interviews in Arabic/English mix?', 'كيف تتعامل مع المقابلات التي تمزج بين العربية والإنجليزية؟', 2, ['Match the interviewer language', 'Use English for technical terms', 'Arabic for context and explanation']),
      q('Practical', 'Explain Clean Architecture in Arabic without using English terms', 'اشرح Clean Architecture بالعربية بدون مصطلحات إنجليزية', 4, ['طبقة العرض (Presentation) - UI', 'طبقة الأعمال (Domain) - المنطق', 'طبقة البيانات (Data) - قواعد البيانات']),
      q('Critical Thinking', 'Should you answer in Arabic if the interviewer asks in Arabic?', 'هل تجيب بالعربية لو الـ interviewer سألك بالعربية؟', 1, ['Yes — match their language', 'Shows communication adaptability', 'Mix in English technical terms naturally']),
      q('Practical', 'Practice: Explain Flutter\'s Navigator in Arabic', 'تمرين: اشرح Flutter Navigator بالعربية', 2, ['النيفيجيتور يعمل مثل مكدس صفحات', 'push = يضيف صفحة', 'pop = يعود للصفحة التي قبلها'])
    ],
    ['dart3-features'], 'remote-work-tips', 'Remote Work for Flutter Devs',
    'Arabic interviews: match language, mix tech terms naturally', 'Match language | technical Arabic | adaptability'),

  mk('remote-work-tips', 125, 'Remote Work for Flutter Devs', 'العمل عن بُعد لمطوري Flutter',
    'Junior', 'Critical', ['Career', 'Interview Skills'],
    'Remote Flutter devs: freelance platforms, global companies, timezone management',
    ['Upwork/Freelancer: profile optimization for Flutter', 'Toptal: rigorous vetting but premium pay', 'Remote global: high compensation possibilities', 'Timezone: managing overlaps with clients', 'English proficiency critical', 'Portfolio: GitHub + production apps'],
    `// Remote work portfolio checklist:
// ✅ GitHub profile with pinned Flutter repos
// ✅ LinkedIn: open to remote, Flutter developer
// ✅ Upwork: profile completion
// ✅ English communication skills
// ✅ Video interviews: good lighting, quiet room
// ✅ Time zone: management of availability

// Remote interview extras:
// - Test your internet connection
// - Backup connectivity options
// - Professional background
// - Camera at eye level`,
    [
      q('Practical', 'How do you build a freelance profile that attracts Flutter projects?', 'كيف تبني freelance profile يجذب مشاريع Flutter؟', 2, ['Niche: Flutter developer skills', 'Portfolio: screenshots + links', 'Professional overview']),
      q('Theoretical', 'What is the typical remote compensation for Flutter developers?', 'ما التعويض المعتاد remotely لمطوري Flutter؟', 2, ['Varies by experience and client location', 'Senior roles offer global rates', 'High leverage for specialized skills']),
      q('Critical Thinking', 'What are the biggest challenges of remote work?', 'ما أكبر تحديات العمل عن بُعد؟', 2, ['Communication hurdles', 'Time zone management', 'Proving reliability remotely']),
      q('Practical', 'How do you handle a significant time zone difference?', 'كيف تتعامل مع فارق توقيت كبير؟', 3, ['Overlap hours agreement', 'Async communication strategies', 'Strict status reporting']),
      q('System Design', 'Design your remote work setup as a Flutter developer', 'صمم setup العمل عن بُعد كمطور Flutter', 2, ['Stable internet + backup', 'Ergonomic workspace', 'Communication tools ready'])
    ],
    ['interview-questions-arabic'], 'sql-advanced', 'Advanced SQL for Flutter Devs',
    'Remote: profile+github+english = global opportunities', 'Freelance profile | GitHub | English | timezone management | portfolio'),

  mk('sql-advanced', 126, 'Advanced SQL for Flutter Developers', 'SQL المتقدم لمطوري Flutter',
    'Mid', 'Common', ['Backend', 'Database', 'Supabase'],
    'JOINs, indexes, PostgreSQL functions, RLS policies, full-text search',
    ['INNER JOIN vs LEFT JOIN', 'Index on frequently queried columns', 'GIN index for full-text search', 'Row Level Security policies', 'Database functions and triggers', 'Database views for complex queries'],
    `-- SQL examples:

-- JOIN rentals with customer and dress data
SELECT r.id, c.name AS customer, d.name AS dress, r.start_date
FROM rentals r
INNER JOIN customers c ON r.customer_id = c.id
INNER JOIN dresses d ON r.dress_id = d.id
WHERE r.return_date IS NULL;

-- Index for performance
CREATE INDEX idx_rentals_customer ON rentals(customer_id);
CREATE INDEX idx_rentals_status ON rentals(status, created_at DESC);

-- RLS Policy Example
CREATE POLICY "users_own_data"
ON items FOR ALL
USING (auth.uid() = user_id);

-- Full-text search
SELECT * FROM items
WHERE to_tsvector('english', name || ' ' || description)
  @@ plainto_tsquery('english', 'keyword');`,
    [
      q('Practical', 'Write a SQL query joining three tables for history', 'اكتب SQL query لربط 3 جداول للتاريخ', 3, ['JOIN multiple tables', 'Filter with WHERE', 'Order results']),
      q('Theoretical', 'When do you add a database index?', 'متى تضيف database index؟', 3, ['Frequent filters on column', 'JOIN performance', 'Ordering optimization']),
      q('Practical', 'Write a database security policy for data isolation', 'اكتب database security policy لعزل البيانات', 3, ['User ID check', 'USING clause', 'Control access per user']),
      q('System Design', 'Design database indexes for an app with large scale data', 'صمم database indexes لتطبيق ببيانات ضخمة', 4, ['Primary identifiers', 'Status and date composites', 'Partial indexes']),
      q('Deep Dive', 'What is the purpose of full-text search in relational DBs?', 'ما الغرض من full-text search في قواعد البيانات العلاقية؟', 4, ['Efficient text searching', 'Index complex text fields', 'Natural language search capabilities'])
    ],
    ['remote-work-tips'], 'http-advanced', 'HTTP Advanced Topics',
    'SQL indexes = book index: skip to the right page', 'JOIN | INDEX | RLS | full-text | optimization'),

  mk('http-advanced', 127, 'HTTP Advanced: Caching, Auth, CORS', 'HTTP المتقدم: Caching وـ Auth وـ CORS',
    'Mid', 'Common', ['Networking', 'Flutter', 'Backend'],
    'HTTP caching headers, JWT vs session, CORS for Flutter web, OAuth2 flow',
    ['Cache-Control headers: max-age, no-cache', 'If-None-Match: ETag for conditional requests', 'JWT: stateless, self-contained', 'Refresh token rotation', 'CORS: cross-origin resource sharing', 'OAuth2: standard auth flow'],
    `// Dio caching with ETag
dio.interceptors.add(InterceptorsWrapper(
  onResponse: (response, handler) {
    final etag = response.headers['etag']?.first;
    if (etag != null) cache[response.realUri.path] = (etag, response.data);
    handler.next(response);
  },
  onRequest: (options, handler) {
    final cached = cache[options.path];
    if (cached != null) options.headers['if-none-match'] = cached.$1;
    handler.next(options);
  },
));

// JWT refresh logic
onError: (e, handler) async {
  if (e.response?.statusCode == 401) {
    final newToken = await refreshToken();
    e.requestOptions.headers['Authorization'] = 'Bearer \$newToken';
    return handler.resolve(await dio.fetch(e.requestOptions));
  }
  handler.next(e);
}`,
    [
      q('Theoretical', 'What is the difference between JWT and session-based authentication?', 'ما الفرق بين JWT و session-based authentication؟', 3, ['JWT: stateless token', 'Session: server-side state', 'JWT: preferred for modern mobile apps']),
      q('Practical', 'Implement JWT auto-refresh in a networking interceptor', 'نفذ JWT auto-refresh في networking interceptor', 3, ['Catch 401 error', 'Call refresh service', 'Retry original request']),
      q('Practical', 'Handle CORS errors in web development', 'تعامل مع CORS errors في تطوير الويب', 3, ['Backend headers configuration', 'Origin allowance', 'Pre-flight requests']),
      q('System Design', 'Design an auth flow using token-based security', 'صمم auth flow باستخدام أمان التوكن', 3, ['Login → Token issue', 'Bearer header for requests', 'Token expiry and refresh']),
      q('Deep Dive', 'What is the importance of ETag in HTTP caching?', 'ما أهمية ETag في HTTP caching؟', 4, ['Resource versioning', 'Conditional requests', 'Saves bandwidth by avoiding re-downloading unchanged data'])
    ],
    ['sql-advanced'], 'testing-advanced', 'Advanced Testing',
    'HTTP caching = memory for network results', 'ETag | JWT | refresh token | CORS | OAuth2'),

  mk('testing-advanced', 128, 'Advanced Testing: Mocks, Fakes, Stubs', 'الاختبار المتقدم',
    'Senior', 'Common', ['Flutter', 'Testing', 'Quality'],
    'Mockito vs Mocktail, fake implementations, integration testing, patrol',
    ['Mockito: code-gen mocks', 'Mocktail: no code-gen, simpler', 'Fake: partial implementation for testing', 'Stub: static responses', 'End-to-end testing strategies', 'Test coverage analysis'],
    `// Mocktail example
class MockRepo extends Mock implements Repository {}

void main() {
  late Bloc bloc;
  late MockRepo repo;

  setUp(() {
    repo = MockRepo();
    bloc = Bloc(repo);
  });

  blocTest<Bloc, State>(
    'emits [loading, success] on Action',
    build: () {
      when(() => repo.getData()).thenAnswer(
        (_) async => [Data.fixture()]);
      return bloc;
    },
    act: (b) => b.add(Action()),
    expect: () => [Loading(), Success([Data.fixture()])],
  );
}`,
    [
      q('Practical', 'Write an asynchronous test for a repository', 'اكتب اختبار غير متزامن لـ repository', 3, ['Mock dependencies', 'Async expectations', 'Verify calls']),
      q('Theoretical', 'What is the difference between a Mock, Fake, and Stub?', 'ما الفرق بين Mock و Fake و Stub؟', 3, ['Mock: interaction checks', 'Fake: working implementation', 'Stub: pre-defined output']),
      q('Practical', 'Implement test fixtures for reproducible data', 'نفذ test fixtures لبيانات قابلة للتكرار', 2, ['Standardized test data', 'Fixture factory methods', 'Clean test environment']),
      q('System Design', 'Design a scalable testing strategy for a complex app', 'صمم testing strategy قابلة للتوسع تطبيق معقد', 4, ['Unit test core logic', 'Feature-level widget tests', 'Critical path integration tests']),
      q('Deep Dive', 'How do you measure testing effectiveness?', 'كيف تقيس فعالية الاختبار؟', 4, ['Code coverage reports', 'Bug regression tracking', 'Quality assurance metrics'])
    ],
    ['http-advanced'], 'hackathon-tips', 'Hackathon & Competition Tips',
    'Testing advanced: maintainable and reliable test suites', 'Mocktail | BLoC testing | fixture | coverage'),

  mk('hackathon-tips', 129, 'Hackathon & Competition Tips', 'نصائح Hackathon والمنافسات',
    'Junior', 'Common', ['Career', 'Interview Skills'],
    'Winning Flutter hackathons: speed, MVP focus, impressive demo',
    ['Pre-built components library', 'Rapid backend setup', 'Focus on unique value proposition', 'Smooth animations for UI impact', 'Effective presentation skills', 'Team collaboration tips'],
    `// Hackathon timeline (summary):
// Early: Requirements + Design + Auth
// Mid: Core functionality (MVP)
// Late: UI Polish + Demo Video preparation
// Final: Pitch and presentation

// Success keys:
// - Don't build everything: finish 1 path perfectly
// - Use familiar tools to move fast
// - Focus on the WOW factor in UI`,
    [
      q('Practical', 'How to manage time in a 48H hackathon?', 'كيف تدير الوقت في 24-48 ساعة؟', 1, ['Strict MVP scope', 'Dividing tasks by specialty', 'Prioritizing core features']),
      q('Critical Thinking', 'Speed vs Quality in competitive coding?', 'السرعة مقابل الجودة في المنافسات؟', 2, ['Functional demo takes precedence', 'Clean enough to not crash', 'Heavy polish on the demo flow']),
      q('Practical', 'What makes a hackathon presentation stand out?', 'ما الذي يجعل العرض التقديمي متميزًا؟', 2, ['Live demo showing value', 'Professional deck', 'Explaining problem vs solution']),
      q('System Design', 'Design a quick MVP for a social impact app', 'صمم MVP سريع لتطبيق أثر اجتماعي', 3, ['Scale only core features', 'Simplified auth', 'Direct user value flow']),
      q('Critical Thinking', 'How to handle pressure in a competition?', 'كيف تتعامل مع الضغط في المنافسة؟', 1, ['Keep focus on MVP', 'Take short breaks', 'Collaborate don\'t block'])
    ],
    ['testing-advanced'], 'open-source-contribute', 'Open Source Contribution',
    'Hackathon: MVP + animations + demo-ready = success', 'Auth first | MVP focus | UI polish | pitch skills'),

  mk('open-source-contribute', 130, 'Open Source Flutter Contributions', 'مساهمات Open Source في Flutter',
    'Mid', 'Common', ['Career', 'Community'],
    'Contributing to Flutter, pub.dev packages, and the developer community',
    ['Finding issues to solve on GitHub', 'Creating and maintaining pub.dev packages', 'Improving documentation', 'Developing reusable cross-platform widgets', 'Participation in technical communities', 'GitHub reputation impact'],
    `// Publishing to pub.dev:
// 1. Init package template
// 2. Implement logic + documentation
// 3. Write tests
// 4. Verify checklist (license, README, pubspec)
// 5. Publish to community

// Valuable contribution paths:
// - Fixing bugs in core packages
// - Localization for Arabic language
// - Creating utility libraries for common tasks`,
    [
      q('Practical', 'Analyze a "good first issue" in an OS project', 'حلل "good first issue" في مشروع مفتوح المصدر', 1, ['Understand requirements', 'Identify where code lives', 'Submit PR with explanation']),
      q('Practical', 'Create a reusable package for common UI patterns', 'أنشئ package لمكونات UI متكررة', 3, ['Modular code', 'Clear API', 'Publish to pub.dev']),
      q('Critical Thinking', 'How does OS contribution affect your professional growth?', 'كيف تؤثر المساهمة في OS على نموك المهني؟', 2, ['Exposure to best practices', 'Builds public portfolio', 'Networking with top developers']),
      q('Theoretical', 'What defines a high-quality community package?', 'ما الذي يحدد جودة package مجتمعي؟', 2, ['Documentation', 'Test coverage', 'Active maintenance']),
      q('Practical', 'Write an effective pull request description', 'اكتب وصف PR فعال', 2, ['What was changed', 'Why it was changed', 'How it was tested'])
    ],
    ['hackathon-tips'], 'career-growth', 'Career Growth Path',
    'Open source: build in public, contribute to the world', 'GitHub contribution | NPM/Pub.dev | Documentation | Community'),

  mk('career-growth', 131, 'Flutter Developer Career Path', 'مسار مهنة مطور Flutter',
    'Junior', 'Critical', ['Career', 'Interview Skills'],
    'Junior to Lead progression: skills, responsibilities, and growth strategies',
    ['Junior focus: implementation and learning', 'Mid focus: architecture and reliability', 'Senior focus: system design and mentorship', 'Transitioning to leadership or specialist roles', 'Continuous learning in a fast-paced ecosystem', 'Professional networking and personal brand'],
    `// Skills growth ladder:
// Level 1: Building screens and states
// Level 2: Clean Arch, BLoC, and Unit Tests
// Level 3: DevOps, Performance, and CI/CD
// Level 4: Architecture decisions and Team Lead

// Keys to promotion:
// - Take ownership of features
// - Improve team efficiency (tools/docs)
// - Mentor those around you`,
    [
      q('Theoretical', 'What defines a Senior Flutter Developer?', 'ما الذي يحدد السينيور Flutter developer؟', 2, ['Architectural foresight', 'Problem-solving depth', 'Ability to mentor and lead']),
      q('Practical', 'Create a 6-month growth roadmap for a Junior developer', 'أنشئ خارطة طريق نمو لـ Junior في 6 أشهر', 3, ['State management mastery', 'Adding testing suites', 'Learning CI/CD'],),
      q('Critical Thinking', 'Specialist vs Generalist in mobile development?', 'التخصص مقابل التعميم في تطوير الموبايل؟', 2, ['Specialist: high depth in one area', 'Generalist: broad versatility', 'Balance depends on career goals']),
      q('Theoretical', 'How to stay updated with Flutter changes?', 'كيف تتابع تحديثات Flutter؟', 2, ['Flutter release notes', 'Technical blogs', 'Community conferences']),
      q('Critical Thinking', 'When to move from your current role?', 'متى تنتقل من وظيفتك الحالية؟', 2, ['When learning plateaus', 'Lack of growth opportunities', 'Mismatch with career vision'])
    ],
    ['open-source-contribute'], 'git-advanced', 'Advanced Git for Teams',
    'Growth: from builder to architect to leader', 'Skills ladder | Mentorship | Architecture | Leadership'),

  mk('git-advanced', 132, 'Advanced Git for Teams', 'Git المتقدم للفرق',
    'Mid', 'Common', ['DevOps', 'Team', 'Tools'],
    'Efficient team workflows, conflict management, and repository maintenance',
    ['Git flow and trunk-based development', 'Standardized commit conventions', 'Effective pull request reviews', 'Rebasing vs merging strategies', 'Handling difficult merge conflicts', 'CI integration with Git hooks'],
    `# Git best practices:
# - Commit early, commit often (small commits)
# - Use clear, descriptive messages
# - Sync with upstream branches frequently
# - Use .gitattributes for line-ending consistency

# Advanced commands:
# git stash pop
# git reset --hard / --soft
# git bisect (debugging tool)`,
    [
      q('Practical', 'Design a Git workflow for a medium-sized team', 'صمم Git workflow لفريق متوسط الحجم', 3, ['Branching strategy', 'PR review policy', 'Integration pipeline']),
      q('Practical', 'Write a commit message following conventions', 'اكتب commit message حسب المعايير', 1, ['type(scope): description', 'Example: feat(auth): add google sign-in']),
      q('Practical', 'Walkthrough resolving a complex merge conflict', 'اشرح خطوات حل conflict معقد', 2, ['Identify changes', 'Select correct logic', 'Re-test after resolution']),
      q('Deep Dive', 'What is the utility of git rebase interactive?', 'ما فائدة git rebase interactive؟', 3, ['Clean up local history', 'Squash commits', 'Edit commit messages']),
      q('Critical Thinking', 'How to prevent large PRs?', 'كيف تمنع الـ PRs الضخمة؟', 3, ['Break tasks into sub-tasks', 'Feature branching per small feature', 'Early reviews'])
    ],
    ['career-growth'], 'flutter-internals', 'Flutter Internals Deep Dive',
    'Git: the foundation of collaborative development', 'Branching | Rebasing | Conventional Commits | CI/CD hooks'),

  mk('flutter-internals', 133, 'Flutter Internals Deep Dive', 'داخليات Flutter بعمق',
    'Senior', 'Rare', ['Flutter', 'Performance', 'Dart'],
    'In-depth look at Flutter rendering, layout, and orchestration',
    ['Understanding the three trees mechanism', 'The layout and painting process', 'How the engine interacts with the GPU', 'Performance profiling and identifying bottlenecks', 'Optimization of rebuilds and paint boundaries', 'Advanced use of keys in state management'],
    `// Internal concepts:
// - Layer of abstraction (Engines vs Framework)
// - Platform channels communication
// - Memory management and garbage collection

// Optimization tip:
// Use RepaintBoundary to isolate segments
// Use const constructors to minimize rebuilds`,
    [
      q('Deep Dive', 'How does Flutter render a frame?', 'كيف ترسم Flutter إطاراً (frame)؟', 5, ['Layout → Paint → Compositing → GPU']),
      q('Theoretical', 'What is the role of the Element tree?', 'ما دور الـ Element tree؟', 4, ['Link between Widget and RenderObject', 'Manages state lifecycle']),
      q('Deep Dive', 'Why are const widgets important for performance?', 'لماذا الـ const widgets مهمة للأداء؟', 4, ['Reuse elements', 'Skip rebuild of children', 'Compile-time constant']),
      q('System Design', 'Diagnose a 30 FPS drop in a complex list', 'شخّص هبوط 30 FPS في قائمة معقدة', 5, ['CPU/GPU profiling', 'Identified overkill builders', 'Repaint issues']),
      q('Deep Dive', 'Explain the lifecycle of a Widget in the framework', 'اشرح دورة حياة اليدجت في الـ framework', 4, ['Creation → Rebuild → Update → Disposal'])
    ],
    ['git-advanced'], 'localization-i18n', 'Localization & i18n',
    'Internals: master the platform beyond the surface', '3 Trees | Rendering Pipeline | Performance | Frame management'),

  mk('localization-i18n', 134, 'Localization & i18n', 'الترجمة وتعدد اللغات',
    'Mid', 'Common', ['Flutter', 'UI'],
    'Implementing multi-language support and RTL layout handling',
    ['Standard localization delegates', 'ARB files for translation management', 'Auto-generation of localization classes', 'Handling plurals and date formatting', 'RTL support and mirrored UI elements', 'Localization for dynamic server content'],
    `// Localization setup:
// - Enable flutter_localizations
// - Define supported locales
// - Access strings via context`,
    [
      q('Practical', 'Add a second language to a production app', 'أضف لغة ثانية لتطبيق في مرحلة الإنتاج', 2, ['Key mapping', 'Translate ARB', 'Update config']),
      q('Practical', 'Fix an RTL layout issue in a custom widget', 'أصلح مشكلة RTL في ويدجت مخصصة', 3, ['Use AlignmentDirectional', 'Check Directionality.of()', 'Safe mirroring']),
      q('Theoretical', 'Why use ARB files over hardcoded maps?', 'لماذا نستخدم ARB بدل الـ maps اليدوية؟', 2, ['Standard format', 'External translator friendly', 'Type-safe generation']),
      q('System Design', 'Design a dynamic localization system from a CMS', 'صمم نظام ترجمة ديناميكي من CMS', 3, ['API for translations', 'Local storage cache', 'Fallback to default ARB']),
      q('Practical', 'Format dates and numbers based on locale', 'نسق التواريخ والأرقام حسب الـ locale', 2, ['Intl package usage', 'DateFormat/NumberFormat', 'Locale-aware UI'])
    ],
    ['flutter-internals'], 'security-flutter', 'Flutter App Security',
    'Localization: speak the user\'s language perfectly', 'ARB | RTL | Plurals | Internationalization'),

  mk('security-flutter', 135, 'Flutter App Security', 'أمان تطبيق Flutter',
    'Senior', 'Common', ['Flutter', 'Security'],
    'Best practices for protecting user data and preventing common attacks',
    ['Securing sensitive data storage', 'Implementing certificate pinning', 'Minimizing app footprint and obfuscation', 'Sanitizing user inputs and managing API keys', 'Handling secure authentication flows', 'Regular security audits and tools'],
    `// Security measures:
// - Use Secure Storage for tokens
// - Obfuscate release builds
// - Never log sensitive info
// - Protect against MITM with pinning`,
    [
      q('Practical', 'Securely manage JWT tokens in Flutter', 'أرِنا كيفية إدارة JWT tokens بأمان', 2, ['Hardened storage', 'In-memory transient state', 'Auto-logout on expiry']),
      q('Theoretical', 'What is app obfuscation and how to enable it?', 'ما هو الـ obfuscation وكيف نفعّله؟', 3, ['Rename symbols to prevent RE', 'flutter build --obfuscate flag']),
      q('Practical', 'Implement a simple protection against screenshots', 'نفذ حماية بسيطة ضد لقطات الشاشة', 2, ['Native platform flag', 'Plugin integration', 'Screen overlay']),
      q('System Design', 'Design an end-to-end secure feature (e.g., login)', 'صمم ميزة مؤمنة بالكامل (مثل تسجيل الدخول)', 5, ['HTTPS only', 'Encrypted local storage', 'CSRF protection', 'Secure token handling']),
      q('Critical Thinking', 'When is local security overkill?', 'متى يكون الأمان المحلي مبالغاً فيه؟', 3, ['Non-sensitive data', 'Increased complexity without ROI', 'Public content only'])
    ],
    ['localization-i18n'], 'interview-study-plan', '30-Day Study Plan',
    'Security: trust but verify, and protect by default', 'Secure Storage | Obfuscation | Input Sanitization | Networking security'),
];
