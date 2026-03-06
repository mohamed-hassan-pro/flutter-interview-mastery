// @ts-nocheck
import type { Card } from '@/types/card';
const mk = (id: string, num: number, title: string, titleAr: string, level: string, freq: string, tags: string[], summary: string, kp: string[], code: string, qs: any[], pre: string[], nid: string, nt: string, hook: string, cheat: string, cos: string[], pop: string, sal: string): Card => ({ id, number: num, title, titleAr, level: level as any, frequency: freq as any, tags, definition: { summary, detailed: summary, analogy: '', keyPoints: kp, codeExample: { language: 'dart', code } }, questions: qs, interviewerMind: { whatTheyWant: kp.slice(0, 2), redFlags: ['لا يعرف ' + id], greenFlags: ['يشرح بعمق'] }, linkedCards: { prerequisites: pre, nextSteps: [{ id: nid, title: nt }], related: [] }, commonPitfalls: [{ mistake: 'تجاهل ' + title, whyWrong: 'ضروري', correctApproach: 'تعلّم ' + title, egyptianContext: 'مهم' }], answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة'], timeAllocation: { junior: '2 دق', mid: '3 دق', senior: '5 دق' }, keyPhrases: [id] }, quickRevision: { bulletPoints: kp.slice(0, 4), memoryHook: hook, cheatSheet: cheat }, companyTags: cos, egyptianMarket: { popularity: pop, salaryImpact: sal } });
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
        'ListView.builder = lazy chef, only cooks what you see', 'builder | itemExtent | cacheExtent | addAutomaticKeepAlives:false',
        ['All Companies'], 'Very High', 'Major'),

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
            q('System Design', 'Design the provider graph for a rental app with user, dresses, rentals', 'صمم provider graph لتطبيق إيجار مع مستخدم وفساتين وإيجارات', 4, ['userProvider', 'dressesProvider watches userProvider', 'rentalsProvider family by dress ID'])
        ],
        ['list-view-optimization'], 'freezed-package', 'Freezed & Code Generation',
        'Riverpod = Provider++ with auto-dispose and codegen', 'ref.watch|read|listen | FutureProvider | StreamProvider | @riverpod',
        ['All Companies'], 'Very High', 'Critical'),

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
    @Default(false) bool isFavorite,
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
        'Freezed = auto-magic immutable class generator', '@freezed | copyWith | union types | when() | build_runner',
        ['All Companies'], 'High', 'Major'),

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
            q('System Design', 'Design user-friendly error messages for Egyptian users', 'صمم رسائل خطأ سهلة الفهم للمستخدمين المصريين', 3, ['Arabic messages by default', 'Actionable: "تحقق من الاتصال"', 'Retry button for network errors']),
            q('Deep Dive', 'What is the difference between Error and Exception in Dart?', 'ما الفرق بين Error و Exception في Dart؟', 4, ['Error: programming error, don\'t catch', 'Exception: expected condition to handle', 'OutOfMemoryError vs NetworkException'])
        ],
        ['freezed-package'], 'sliver-custom-scroll', 'Sliver & CustomScrollView',
        'Either<Failure, T> = make errors impossible to ignore', 'Either | fold() | Failure hierarchy | FlutterError.onError',
        ['All Companies'], 'High', 'Critical'),

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
        'Slivers = Lego bricks for complex scroll UIs', 'SliverAppBar | SliverPersistentHeader | SliverGrid | CustomScrollView',
        ['MaxAB', 'Swvl', 'ITWorx'], 'High', 'Major'),

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
    _ => Switch(value: val, onChanged: onChanged),
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
        'kIsWeb first, then Platform check — never the other way', 'kIsWeb | Platform.isAndroid | defaultTargetPlatform | adaptive widgets',
        ['All Companies'], 'High', 'Moderate'),

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
        'Supabase = open-source Firebase with Postgres power', 'from(table).select().eq().order() | stream() | RLS',
        ['All Companies'], 'Very High', 'Critical'),

    mk('dart3-features', 123, 'Dart 3 & Flutter 3.x New Features', 'مميزات Dart 3 و Flutter 3.x',
        'Mid', 'Very Common', ['Dart', 'Flutter'],
        'Dart 3: records, patterns, class modifiers. Flutter 3.x: Impeller, Material 3, adaptive',
        ['Dart 3: records, patterns, sealed classes', 'class modifiers: base, final, interface, sealed', 'switch expressions (not statements)', 'if-case pattern matching', 'Flutter: Material 3 design tokens', 'Flutter: adaptive scaffold'],
        `// Dart 3: switch expression
final area = switch (shape) {
  Circle(:var r) => pi * r * r,
  Rectangle(:var w, :var h) => w * h,
  _ => throw ArgumentError('Unknown'),
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
        'Dart 3 = records+patterns+sealed+switch expression', 'switch expression | sealed class | records | class modifiers | Material 3',
        ['All Companies'], 'Very High', 'Critical'),

    mk('interview-questions-arabic', 124, 'Arabic Interview Context', 'سياق المقابلة بالعربية',
        'Junior', 'Critical', ['Interview Skills', 'Egyptian Market'],
        'How to handle Arabic/Bilingual interviews in Egyptian companies, technical terms in Arabic',
        ['Some interviews are 100% Arabic', 'Know Flutter terms in Arabic', 'Mix Arabic/English naturally', 'Don\'t overcorrect to pure English', 'Practice explaining State Management in Arabic', 'Egyptian companies value Arabic communication'],
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
// "Null Safety هي ميزة في Dart بتمنع الـ crashes اللي بتحصل من
//  القيم الفارغة. كل متغير لازم تحدد إذا كان ممكن يكون فاضي
//  (nullable ?) أو لا (non-nullable)"`,
        [
            q('Practical', 'Explain the BLoC pattern in Arabic in under 2 minutes', 'اشرح BLoC pattern بالعربية في أقل من دقيقتين', 3, ['Events → BLoC → States', 'BLoC = business logic separator', 'مثال: search query → results']),
            q('Theoretical', 'Which Egyptian companies conduct interviews fully in Arabic?', 'ما الشركات المصرية التي تجري مقابلاتها بالكامل بالعربية؟', 2, ['MaxAB: mostly Arabic', 'Fawry: mix Arabic/English', 'Startups vary']),
            q('Practical', 'Explain Clean Architecture in Arabic without using English terms', 'اشرح Clean Architecture بالعربية بدون مصطلحات إنجليزية', 4, ['طبقة العرض (Presentation) - UI', 'طبقة الأعمال (Domain) - المنطق', 'طبقة البيانات (Data) - قواعد البيانات']),
            q('Critical Thinking', 'Should you answer in Arabic if the interviewer asks in Arabic?', 'هل تجيب بالعربية لو الـ interviewer سألك بالعربية؟', 1, ['Yes — match their language', 'Shows communication adaptability', 'Mix in English technical terms naturally']),
            q('Practical', 'Practice: Explain Flutter\'s Navigator in Egyptian Arabic', 'تمرين: اشرح Flutter Navigator بالعربية المصرية', 2, ['النيفيجيتور بيشتغل زي مكدس صفحات', 'push = بيضيف صفحة', 'pop = بيرجع للصفحة اللي قبلها'])
        ],
        ['dart3-features'], 'remote-work-tips', 'Remote Work for Flutter Devs',
        'Arabic interviews: match language, mix tech terms naturally', 'Match language | technical Arabic | Egyptian context | adaptability',
        ['MaxAB', 'Fawry', 'Paymob'], 'Very High', 'Critical'),

    mk('remote-work-tips', 125, 'Remote Work for Flutter Devs', 'العمل عن بُعد لمطوري Flutter',
        'Junior', 'Critical', ['Career', 'Interview Skills'],
        'Egyptian Flutter devs working remotely: upwork, toptal, global companies, timezone management',
        ['Upwork: profile optimization for Flutter', 'Toptal: rigorous vetting but premium pay', 'Remote global: $2,000-6,000/month', 'Timezone: Egypt (EET) easy for European clients', 'English proficiency critical', 'Portfolio: GitHub + production apps'],
        `// Remote work portfolio checklist:
// ✅ GitHub profile with pinned Flutter repos
// ✅ LinkedIn: open to remote, Flutter developer
// ✅ Upwork: 100% completion rate targets
// ✅ English communication: Grammarly for proposals
// ✅ Video interviews: good lighting, quiet room
// ✅ Time zone: UTC+2 (EET) works for EU/US East

// Remote interview extras:
// - Test your internet (min 10 Mbps)
// - Backup mobile hotspot
// - Professional background (physical or virtual)
// - Camera at eye level`,
        [
            q('Practical', 'How do you build a Upwork profile that attracts Flutter projects?', 'كيف تبني Upwork profile يجذب مشاريع Flutter؟', 2, ['Niche: Flutter developer not generic', 'Portfolio: screenshots + links', 'Competitive initial rate to build JSS']),
            q('Theoretical', 'What is the typical remote salary for a senior Flutter developer from Egypt?', 'ما الراتب المعتاد remotely لمطور Flutter senior من مصر؟', 2, ['$3,000-6,000/month for senior', '$1,500-3,000 for mid', 'Depends on client location']),
            q('Critical Thinking', 'What are the biggest challenges of remote work for Egyptian developers?', 'ما أكبر تحديات العمل عن بُعد للمطورين المصريين؟', 2, ['English communication', 'Time zone management', 'Proving reliability without face-to-face']),
            q('Practical', 'How do you handle a time zone difference of 8 hours with a US client?', 'كيف تتعامل مع فارق توقيت 8 ساعات مع عميل أمريكي؟', 3, ['Overlap hours agreement (e.g. 3-6pm EET = 8-11am US)', 'Async communication in off-hours', 'Daily written status updates']),
            q('System Design', 'Design your remote work setup as a Flutter developer', 'صمم setup العمل عن بُعد كمطور Flutter', 2, ['Fast internet + backup hotspot', 'External display + full keyboard', 'Noise-canceling headphones'])
        ],
        ['interview-questions-arabic'], 'sql-advanced', 'Advanced SQL for Flutter Devs',
        'Remote = $2000-6000/month: profile+github+english', 'Upwork profile | GitHub | English | timezone EET | portfolio',
        ['All Companies'], 'Very High', 'Critical'),

    mk('sql-advanced', 126, 'Advanced SQL for Flutter Developers', 'SQL المتقدم لمطوري Flutter',
        'Mid', 'Common', ['Backend', 'Database', 'Supabase'],
        'JOINs, indexes, PostgreSQL functions, RLS policies, full-text search',
        ['INNER JOIN vs LEFT JOIN', 'Index on frequently queried columns', 'GIN index for full-text search', 'Row Level Security policies', 'Supabase Edge Functions = serverless SQL', 'Database views for complex queries'],
        `-- Supabase / PostgreSQL examples:

-- JOIN rentals with customer and dress data
SELECT r.id, c.name AS customer, d.name AS dress, r.start_date
FROM rentals r
INNER JOIN customers c ON r.customer_id = c.id
INNER JOIN dresses d ON r.dress_id = d.id
WHERE r.return_date IS NULL;

-- Index for performance
CREATE INDEX idx_rentals_customer ON rentals(customer_id);
CREATE INDEX idx_rentals_status ON rentals(status, created_at DESC);

-- RLS Policy
CREATE POLICY "customers_own_rentals"
ON rentals FOR ALL
USING (auth.uid() = customer_id);

-- Full-text search
SELECT * FROM dresses
WHERE to_tsvector('arabic', name || ' ' || description)
  @@ plainto_tsquery('arabic', 'حفل زفاف');`,
        [
            q('Practical', 'Write a SQL query joining three tables for rental history', 'اكتب SQL query لربط 3 جداول لتاريخ الإيجار', 3, ['JOIN rentals, customers, dresses', 'Filter active rentals', 'Order by date']),
            q('Theoretical', 'When do you add a database index?', 'متى تضيف database index؟', 3, ['Frequent WHERE queries on column', 'JOIN conditions', 'ORDER BY columns']),
            q('Practical', 'Write a Supabase RLS policy for customer data isolation', 'اكتب Supabase RLS policy لعزل بيانات العملاء', 3, ['auth.uid() = customer_id', 'USING clause', 'FOR ALL or specific operations']),
            q('System Design', 'Design database indexes for a rental app with 100K records', 'صمم database indexes لتطبيق إيجار بـ 100K سجل', 4, ['customer_id index for queries', 'status + date composite', 'Partial index for active only']),
            q('Deep Dive', 'What is the difference between GIN and GiST indexes in PostgreSQL?', 'ما الفرق بين GIN و GiST indexes في PostgreSQL؟', 5, ['GIN: multi-value columns, full-text', 'GiST: geometric, neighbor search', 'GIN faster for lookup, GiST for range'])
        ],
        ['remote-work-tips'], 'http-advanced', 'HTTP Advanced Topics',
        'SQL indexes = book index: skip to the right page', 'JOIN | INDEX | RLS auth.uid() | GIN full-text | USING clause',
        ['All Companies'], 'High', 'Major'),

    mk('http-advanced', 127, 'HTTP Advanced: Caching, Auth, CORS', 'HTTP المتقدم: Caching وـ Auth وـ CORS',
        'Mid', 'Common', ['Networking', 'Flutter', 'Backend'],
        'HTTP caching headers, JWT vs session, CORS for Flutter web, OAuth2 flow',
        ['Cache-Control headers: max-age, no-cache', 'If-None-Match: ETag for conditional requests', 'JWT: stateless, self-contained', 'Refresh token rotation', 'CORS: Flutter web needs backend config', 'OAuth2: Google/Apple sign-in flow'],
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

// JWT refresh interceptor
onError: (e, handler) async {
  if (e.response?.statusCode == 401) {
    final newToken = await refreshJwt(storedRefreshToken);
    e.requestOptions.headers['Authorization'] = 'Bearer \$newToken';
    return handler.resolve(await dio.fetch(e.requestOptions));
  }
  handler.next(e);
}`,
        [
            q('Theoretical', 'What is the difference between JWT and session-based authentication?', 'ما الفرق بين JWT و session-based authentication؟', 3, ['JWT: stateless, self-contained token', 'Session: server stores state', 'JWT: good for mobile/microservices']),
            q('Practical', 'Implement JWT auto-refresh in a Dio interceptor', 'نفذ JWT auto-refresh في Dio interceptor', 3, ['onError: check 401', 'refreshToken() call', 'Retry original request with new token']),
            q('Practical', 'Handle CORS errors in Flutter Web testing', 'تعامل مع CORS errors في Flutter Web testing', 3, ['Backend must allow origin', 'Development: chrome --disable-web-security', 'Production: proper CORS headers']),
            q('System Design', 'Design auth flow with OAuth2 Google Sign-In', 'صمم auth flow مع OAuth2 Google Sign-In', 3, ['google_sign_in package', 'Get idToken', 'Send to Supabase/backend']),
            q('Deep Dive', 'What is refresh token rotation and why is it important?', 'ما هو refresh token rotation ولماذا هو مهم؟', 4, ['Issue new refresh token on each use', 'Old token invalidated immediately', 'Prevents refresh token theft replay'])
        ],
        ['sql-advanced'], 'testing-advanced', 'Advanced Testing',
        'HTTP caching = memory for network results', 'ETag | JWT | refresh token | CORS | OAuth2',
        ['All Companies'], 'High', 'Major'),

    mk('testing-advanced', 128, 'Advanced Testing: Mocks, Fakes, Stubs', 'الاختبار المتقدم',
        'Senior', 'Common', ['Flutter', 'Testing', 'Quality'],
        'Mockito vs Mocktail, fake implementations, integration testing, patrol',
        ['Mockito: annotation-based code-gen mocks', 'Mocktail: no codegen, simpler API', 'Fake: real implementation for testing', 'Stub: static hardcoded responses', 'patrol: end-to-end with native interaction', 'test coverage: flutter test --coverage'],
        `// Mocktail (no code generation needed)
class MockRentalRepo extends Mock implements RentalRepository {}

void main() {
  late RentalBloc bloc;
  late MockRentalRepo repo;

  setUp(() {
    repo = MockRentalRepo();
    bloc = RentalBloc(repo);
  });

  blocTest<RentalBloc, RentalState>(
    'emits [loading, success] on LoadRentals',
    build: () {
      when(() => repo.getRentals()).thenAnswer(
        (_) async => [Rental.fixture()]);
      return bloc;
    },
    act: (b) => b.add(LoadRentals()),
    expect: () => [RentalLoading(), RentalSuccess([Rental.fixture()])],
    verify: (_) => verify(() => repo.getRentals()).called(1),
  );
}`,
        [
            q('Practical', 'Write a BLoC test using Mocktail', 'اكتب BLoC test بـ Mocktail', 3, ['Mock implements interface', 'when(() => mock.method())', 'blocTest with expect and verify']),
            q('Theoretical', 'What is the difference between a Mock, Fake, and Stub?', 'ما الفرق بين Mock و Fake و Stub؟', 3, ['Mock: verify interactions', 'Fake: lightweight real implementation', 'Stub: hardcoded response, no verification']),
            q('Practical', 'Create a test fixture for Rental model', 'أنشئ test fixture لـ Rental model', 2, ['Rental.fixture() factory', 'Hardcoded test data', 'Reusable across tests']),
            q('System Design', 'Design a testing strategy for 100% BLoC coverage', 'صمم testing strategy لـ 100% BLoC coverage', 4, ['Test every event', 'Test error paths', 'Test loading states', 'Integration test for E2E']),
            q('Deep Dive', 'How do you run integration tests on real devices in CI?', 'كيف تشغّل integration tests على أجهزة حقيقية في CI؟', 4, ['firebase test lab', 'AWS Device Farm', 'patrol for native interactions'])
        ],
        ['http-advanced'], 'hackathon-tips', 'Hackathon & Competition Tips',
        'Mocktail > Mockito: no codegen, simpler Mock API', 'Mocktail | blocTest | when().thenAnswer | verify().called | fixture',
        ['All Companies'], 'High', 'Major'),

    mk('hackathon-tips', 129, 'Hackathon & Competition Tips', 'نصائح Hackathon والمنافسات',
        'Junior', 'Common', ['Career', 'Interview Skills'],
        'Winning Flutter hackathons: speed, MVP focus, impressive demo over completeness',
        ['Pre-built UI components ready', 'Authentication in 30 minutes', 'Focus on demo-ready core loop', 'Use Firebase/Supabase for instant backend', 'Animations impress judges', 'Arabic support = differentiator in Egypt'],
        `// Hackathon starter checklist (48h):
// Hour 1-2: Setup + architecture decision
// Hour 3-4: Auth (Firebase/Supabase)
// Hour 5-10: Core features (MVP only)
// Hour 11-15: UI polish + animations
// Hour 16: Testing critical paths
// Hour 17-18: Recording demo video
// Hour 19-20: Pitch deck

// Pre-built templates to have ready:
// - Clean architecture folder structure
// - BLoC boilerplate
// - Dio setup with auth interceptor
// - Dark/Light theme switching
// - Firebase initialization`,
        [
            q('Practical', 'What\'s the first thing you set up when starting a hackathon Flutter project?', 'ما أول حاجة تعملها في hackathon Flutter project؟', 1, ['Project structure', 'Auth setup', 'Core data models']),
            q('Critical Thinking', 'Should you prioritize code quality or speed in a hackathon?', 'هل تُعطي الأولوية لجودة الكود أم السرعة في hackathon؟', 2, ['Demo-ready > clean code', 'MVP first', 'Polish the demo path heavily']),
            q('Practical', 'How do you make a Flutter app demo impressive to non-technical judges?', 'كيف تجعل Flutter app demo مثيرًا للانطباع لمحكّمين غير تقنيين؟', 2, ['Smooth animations', 'Real data (not Lorem Ipsum)', 'Arabic UI if relevant', 'Clean visual design']),
            q('System Design', 'Design a 24-hour food waste reduction app idea for hackathon', 'صمم فكرة تطبيق تقليل هدر الطعام لـ hackathon في 24 ساعة', 3, ['Map nearby restaurants with surplus', 'Real-time discounts', 'Simple checkout with Paymob']),
            q('Critical Thinking', 'What Egyptian hackathons should Flutter developers participate in?', 'ما الـ hackathons المصرية التي يجب مطوري Flutter المشاركة فيها؟', 1, ['Flat6Labs hackathons', 'ITIDA challenges', 'GrizzHacks Egypt'])
        ],
        ['testing-advanced'], 'open-source-contribute', 'Open Source Contribution',
        'Hackathon: MVP + animations + demo-ready = win', 'Auth first | MVP core | polish demo path | animations impress judges',
        ['All Companies'], 'Medium', 'Major'),

    mk('open-source-contribute', 130, 'Open Source Flutter Contributions', 'مساهمات Open Source في Flutter',
        'Mid', 'Common', ['Career', 'Community'],
        'Contributing to Flutter, pub.dev packages, and Egyptian tech community',
        ['Flutter GitHub: good-first-issue label', 'pub.dev: publish your own package', 'Arabic documentation contribution', 'Create reusable Egyptian payment widgets', 'Join Flutter Egypt community', 'GitHub stars boost portfolio'],
        `// Steps to create and publish a pub.dev package:
// 1. flutter create --template=package my_package
// 2. Implement in lib/my_package.dart
// 3. Write tests in test/
// 4. Update pubspec.yaml (name, description, version)
// 5. dart pub publish --dry-run (check)
// 6. dart pub publish ✅

// Good package ideas for Egyptian market:
// - egyptian_phone_validator
// - nid_validator (National ID)
// - paymob_flutter (simplified SDK)
// - arabic_text_utils`,
        [
            q('Practical', 'How do you find good-first issues in the Flutter repository?', 'كيف تجد good-first issues في Flutter repository؟', 1, ['GitHub label: good first issue', 'Search: flutter/flutter labels', 'Start with docs or tests']),
            q('Practical', 'Create a simple pub.dev package for Egyptian phone validation', 'أنشئ pub.dev package بسيط للتحقق من الأرقام المصرية', 3, ['flutter create --template=package', 'Implement validator with regex', 'Write tests', 'dart pub publish']),
            q('Critical Thinking', 'Does open source contribution really help in Egyptian job search?', 'هل المساهمة في open source تساعد حقاً في البحث عن وظيفة في مصر؟', 2, ['Swvl/Thndr: yes, they look at GitHub', 'Traditional companies: less impact', 'International remote: very important']),
            q('Theoretical', 'What makes a good Flutter package for Egyptian developers?', 'ما الذي يجعل Flutter package جيدًا لمطوري مصر؟', 2, ['Arabic text support', 'Egyptian payment integration', 'RTL layout helpers']),
            q('Practical', 'How do you write good documentation for a Flutter package?', 'كيف تكتب documentation جيد لـ Flutter package؟', 2, ['dartdoc comments ///', 'README with examples', 'pub.dev compatible markdown'])
        ],
        ['hackathon-tips'], 'career-growth', 'Career Growth Path',
        'Open source = prove skills publicly, build reputation', 'good-first-issue | dart pub publish | Egyptian market packages | README',
        ['All Companies'], 'Medium', 'Major'),

    mk('career-growth', 131, 'Flutter Developer Career Path', 'مسار مهنة مطور Flutter',
        'Junior', 'Critical', ['Career', 'Interview Skills'],
        'Junior → Mid → Senior progression, skills ladder, salary expectations, leadership path',
        ['Junior (0-2 yr): widgets, state, API integration', 'Mid (2-4 yr): architecture, testing, performance', 'Senior (4+ yr): system design, mentoring, CI/CD', 'Tech Lead: architecture decisions, team delivery', 'Specialist paths: mobile, embedded, Flutter Web', 'Egyptian salaries up 3-5x from Junior to Senior'],
        `// Skills progression:

// JUNIOR (Year 1-2):
// - Flutter basics, stateful/stateless
// - Provider/GetX for state
// - REST API integration
// - Git, basic CI

// MID (Year 2-4):
// - BLoC or Riverpod mastery
// - Clean Architecture
// - Testing (unit + widget)
// - Performance optimization
// - Firebase/Supabase

// SENIOR (Year 4+):
// - System design
// - Mentoring juniors
// - CI/CD pipelines
// - Custom platform channels
// - Team delivery ownership

// PRINCIPAL/TECH LEAD (Year 6+):
// - Architecture decisions
// - Hiring and interviews
// - Cross-team collaboration`,
        [
            q('Theoretical', 'What skills separate a Junior from a Mid Flutter developer?', 'ما المهارات التي تفصل Junior عن Mid Flutter developer؟', 2, ['Architecture: Clean Arch knowledge', 'Testing: writes tests', 'Performance: can profile and optimize']),
            q('Practical', 'Create a 12-month learning plan to go from Junior to Mid', 'أنشئ خطة تعلم 12 شهراً للانتقال من Junior لـ Mid', 3, ['Month 1-3: BLoC mastery', 'Month 4-6: Clean Architecture', 'Month 7-9: Testing', 'Month 10-12: Performance + side project']),
            q('Critical Thinking', 'Should you stay at one company or switch frequently early in career?', 'هل تبقى في شركة واحدة أم تتنقل كثيراً في بداية مسيرتك؟', 2, ['Switch every 2 years for 20-30% salary jump', 'Stay if exceptional learning', 'Never 1+ year with no growth']),
            q('Theoretical', 'What technical skills are most valued for Egyptian Flutter seniors?', 'ما المهارات التقنية الأعلى قيمة للسينيور Flutter في مصر؟', 2, ['System design', 'Mentoring', 'CI/CD pipeline ownership', 'Cross-platform (Web + Mobile)']),
            q('Critical Thinking', 'When should a Flutter developer start considering going freelance?', 'متى يفكر مطور Flutter في التحول للعمل الحر؟', 2, ['2+ years experience', 'Strong portfolio', 'Emergency fund for 6 months'])
        ],
        ['open-source-contribute'], 'git-advanced', 'Advanced Git for Teams',
        'Junior→Mid→Senior = widgets→architecture→system design', 'Junior:2yr | Mid:4yr | Senior:4+ | salary 3-5x jump',
        ['All Companies'], 'Very High', 'Critical'),

    mk('git-advanced', 132, 'Advanced Git for Flutter Teams', 'Git المتقدم لفرق Flutter',
        'Mid', 'Common', ['DevOps', 'Team', 'Tools'],
        'Git flow, conventional commits, squash merge, interactive rebase, conflict resolution',
        ['Git flow: main+develop+feature branches', 'Conventional commits: feat/fix/chore/docs', 'Squash merge vs merge commit', 'Interactive rebase: git rebase -i', 'Cherry-pick for hotfixes', '.gitattributes for Flutter conflicts'],
        `# Flutter-specific .gitignore:
# /.dart_tool/
# /.flutter-plugins*
# /build/

# .gitattributes — auto-merge Flutter lock files
pubspec.lock merge=theirs
*.g.dart merge=theirs

# Conventional commits
# feat: add dress filter by color
# fix: resolve null crash on empty rental list
# chore: update dependencies
# docs: add API documentation

# Interactive rebase: clean up before PR
git rebase -i HEAD~5  # squash last 5 commits
git rebase main       # update your branch

# Cherry-pick a fix to main without full merge
git cherry-pick abc123f`,
        [
            q('Practical', 'Set up a git branch strategy for a Flutter team of 5', 'أعدّ git branch strategy لفريق Flutter من 5', 3, ['main: production only', 'develop: integration', 'feature/*: per task']),
            q('Practical', 'Write a conventional commit message for adding dark mode', 'اكتب conventional commit message لإضافة dark mode', 1, ['feat: add dark mode support', 'feat(theme): implement dark mode toggle']),
            q('Practical', 'Resolve a pubspec.lock merge conflict', 'حلّ merge conflict في pubspec.lock', 2, ['Accept either version', 'Run flutter pub get', '.gitattributes: merge=theirs']),
            q('Deep Dive', 'When should you use squash merge vs regular merge?', 'متى تستخدم squash merge مقابل regular merge؟', 3, ['Squash: feature branches = one clean commit', 'Merge: preserve full history', 'Rebase: linear history']),
            q('Critical Thinking', 'Why is interactive rebase dangerous on shared branches?', 'لماذا interactive rebase خطير على الـ branches المشتركة؟', 3, ['Rewrites commit history', 'Force push needed', 'Others\' commits diverge'])
        ],
        ['career-growth'], 'flutter-internals', 'Flutter Internals Deep Dive',
        'Git flow = highway system for team collaboration', 'feat/fix/chore | git rebase -i | cherry-pick | .gitattributes',
        ['All Companies'], 'High', 'Moderate'),

    mk('flutter-internals', 133, 'Flutter Internals Deep Dive', 'داخليات Flutter بعمق',
        'Senior', 'Rare', ['Flutter', 'Performance', 'Dart'],
        'Element tree, RenderObject tree, layout protocol, compositor, GPU pipeline',
        ['3 trees: Widget, Element, RenderObject', 'Widget: configuration (immutable)', 'Element: instantiation (mutable)', 'RenderObject: layout + paint', 'Compositor sends layers to GPU', 'Layout: constraints down, sizes up, positions up'],
        `// Understanding rebuild scope:
// Widget.build() → new Widget tree
// Elements reconcile (match old/new)
// Only changed RenderObjects repaint

// Layout protocol:
// Parent sends BoxConstraints (min/max width, height)
// Child returns Size within constraints
// Parent then positions child

// Example: how padding works
// Padding → RenderPadding (RenderObject)
// adds to child's constraints: shrinks them
// child lays out within smaller constraints
// padding renders border region

// Performance: avoid deep trees, use const
// const widget → same element reused → no repaint`,
        [
            q('Deep Dive', 'Explain Flutter\'s three-tree architecture', 'اشرح معمارية الشجرة الثلاثية في Flutter', 5, ['Widget: config', 'Element: instance + state', 'RenderObject: layout + paint']),
            q('Theoretical', 'How does Flutter\'s layout protocol work?', 'كيف يعمل layout protocol في Flutter؟', 4, ['Constraints flow down', 'Sizes flow up', 'Positions set by parent']),
            q('Deep Dive', 'Why does Flutter need reconciliation between Element trees?', 'لماذا تحتاج Flutter لـ reconciliation بين Element trees؟', 4, ['Match old/new widgets efficiently', 'Reuse elements where possible', 'Keys help correct matching']),
            q('System Design', 'How would you debug a performance issue caused by the render tree?', 'كيف تُصحّح مشكلة أداء ناتجة عن render tree؟', 5, ['DevTools: layer repaint', 'RepaintBoundary to isolate', 'ProfileMode frame timing']),
            q('Deep Dive', 'What happens during a setState call?', 'ما الذي يحدث عند استدعاء setState؟', 4, ['Marks element dirty', 'Build is scheduled next frame', 'Widget.build calls → diff → update elements'])
        ],
        ['git-advanced'], 'localization-i18n', 'Localization & i18n',
        '3 trees: Widget=blueprint, Element=instance, RenderObject=paints', 'Widget→Element→RenderObject | constraints down | sizes up',
        ['Valeo', 'International', 'Swvl'], 'Low', 'Critical for Senior'),

    mk('localization-i18n', 134, 'Localization & i18n', 'الترجمة وتعدد اللغات',
        'Mid', 'Common', ['Flutter', 'UI', 'Arabic'],
        'flutter_localizations, ARB files, intl package, RTL support, Arabic plurals',
        ['l10n.yaml config', 'ARB files: app_en.arb, app_ar.arb', 'flutter gen-l10n generates classes', 'AppLocalizations.of(context)!.title', 'Intl: DateFormat, NumberFormat for Arabic', 'RTL: Directionality auto with locale'],
        `// l10n.yaml
// arb-dir: lib/l10n
// template-arb-file: app_en.arb
// output-localization-file: app_localizations.dart

// app_ar.arb
{
  "@@locale": "ar",
  "greeting": "أهلاً {name}",
  "@greeting": { "placeholders": { "name": {} } },
  "dressCount": "{count, plural, =0{لا فساتين} =1{فستان واحد} other{{count} فستان}}",
  "@dressCount": { "placeholders": { "count": {"type": "int"} } }
}

// Usage
Text(AppLocalizations.of(context)!.greeting(userName))
Text(AppLocalizations.of(context)!.dressCount(5)) // "5 فستان"

// In MaterialApp
MaterialApp(
  locale: const Locale('ar', 'EG'),
  supportedLocales: const [Locale('en'), Locale('ar', 'EG')],
  localizationsDelegates: AppLocalizations.localizationsDelegates,
)`,
        [
            q('Practical', 'Set up Arabic localization for a Flutter app', 'أعدّ Arabic localization لتطبيق Flutter', 2, ['l10n.yaml', 'app_ar.arb with strings', 'flutter gen-l10n', 'AppLocalizations.of(context)']),
            q('Practical', 'Handle Arabic plurals (1 item vs 2 vs 5+)', 'تعامل مع plurals العربية (1 عنصر مقابل 2 مقابل 5+)', 3, ['{count, plural, =0{} =1{} =2{} other{}}', 'ARB format for plural', 'Arabic has 6 plural forms']),
            q('Theoretical', 'How does Flutter handle RTL direction with localization?', 'كيف تتعامل Flutter مع RTL direction مع الـ localization؟', 2, ['Directionality set automatically by locale', 'TextDirection.rtl for Arabic', 'Icons and layout mirror']),
            q('System Design', 'Design L10n strategy for an app with 5 languages', 'صمم L10n strategy لتطبيق بـ 5 لغات', 3, ['ARB file per language', 'CI: check no missing keys', 'Arabic + English minimum for Egyptian market']),
            q('Practical', 'Format a price as Egyptian Pounds with Arabic numerals', 'نسّق سعراً كجنيهات مصرية مع أرقام عربية', 2, ['NumberFormat.currency(locale:\'ar\', symbol:\'ج.م\')', 'Intl package', 'Arabic numerals: ١٢٣'])
        ],
        ['flutter-internals'], 'security-flutter', 'Flutter App Security',
        'l10n: ARB files + flutter gen-l10n + AppLocalizations.of(ctx)', 'l10n.yaml | ARB | flutter gen-l10n | plural | RTL auto',
        ['MaxAB', 'Fawry', 'Paymob', 'ITWorx'], 'High', 'Moderate'),

    mk('security-flutter', 135, 'Flutter App Security', 'أمان تطبيق Flutter',
        'Senior', 'Common', ['Flutter', 'Security', 'Backend'],
        'Secure storage, certificate pinning, obfuscation, root detection, anti-tampering',
        ['flutter_secure_storage: hardware-backed encryption', 'Certificate pinning: prevent MITM', 'Code obfuscation: flutter build --obfuscate', 'Root/jailbreak detection', 'Anti-screenshot for sensitive screens', 'SafetyNet/DeviceCheck attestation'],
        `// Secure storage
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
final storage = FlutterSecureStorage();
await storage.write(key: 'jwt', value: token);
final jwt = await storage.read(key: 'jwt');

// Certificate pinning with Dio
dio.httpClientAdapter = IOHttpClientAdapter(
  onHttpClientCreate: (client) {
    final ctx = SecurityContext();
    ctx.setTrustedCertificatesBytes(await rootBundle.load('assets/cert.pem').then((d) => d.buffer.asUint8List()));
    return HttpClient(context: ctx);
  }
);

// Obfuscation in release
// flutter build apk --obfuscate --split-debug-info=debug_info/

// Prevent screenshots
import 'package:screen_protector/screen_protector.dart';
await ScreenProtector.preventScreenshotOn();`,
        [
            q('Practical', 'Store a JWT token securely on mobile', 'خزّن JWT token بأمان على الجوال', 2, ['flutter_secure_storage', 'Hardware-backed keychain/keystore', 'Never in SharedPreferences']),
            q('Theoretical', 'What is certificate pinning and when do you need it?', 'ما هو certificate pinning ومتى تحتاجه؟', 3, ['Pin expected server certificate', 'Prevent MITM attacks', 'Required for financial apps']),
            q('Practical', 'Set up code obfuscation for release builds', 'أعدّ code obfuscation للـ release builds', 2, ['--obfuscate flag', '--split-debug-info', 'Keep debug symbols separately']),
            q('System Design', 'Design security checklist for a payment Flutter app', 'صمم security checklist لتطبيق Flutter للمدفوعات', 5, ['Secure storage for tokens', 'Certificate pinning', 'Obfuscation', 'Root detection', 'No sensitive data in logs']),
            q('Critical Thinking', 'Should you always implement root detection?', 'هل يجب دائماً تطبيق root detection؟', 3, ['Financial apps: yes', 'Banking/payments: mandatory', 'General apps: optional overhead'])
        ],
        ['localization-i18n'], 'interview-study-plan', '30-Day Study Plan',
        'Security: SecureStorage+Pinning+Obfuscation=Defense layers', 'flutter_secure_storage | --obfuscate | cert pinning | root detection',
        ['Fawry', 'Paymob', 'Thndr', 'International'], 'High', 'Critical'),
];
