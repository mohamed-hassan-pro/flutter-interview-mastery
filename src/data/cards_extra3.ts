// @ts-nocheck
import type { Card } from '@/types/card';

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
  linkedCards: { prerequisites: prereq, nextSteps: [{ id: nextId, title: nextTitle }], related },
  commonPitfalls: [{
    mistake: pitfall, whyWrong: 'أخطأ شائع', correctApproach: pitfallFix
  }],
  answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة', 'تطبيق'], timeAllocation: { junior: '2-3 دق', mid: '3-4 دق', senior: '5 دق' }, keyPhrases: [id] },
  quickRevision: { bulletPoints: keyPoints.slice(0, 4), memoryHook: memHook, cheatSheet }
});

const q = (type: string, question: string, questionAr: string, difficulty: number, points: string[], time: string = '2-3 minutes') => ({
  type: type as any, question, questionAr, difficulty, expectedAnswer: { points, timeToAnswer: time }
});

export const cardsExtra3: Card[] = [
  mk('keys-flutter', 66, 'Keys in Flutter', 'الـ Keys في Flutter',
    'Mid', 'Common', ['Flutter', 'Widgets'],
    'ValueKey, ObjectKey, UniqueKey, GlobalKey — when and why to use',
    'Keys preserve widget state when items reorder. Without keys, Flutter matches by type and position: wrong state gets attached to wrong item.',
    'Keys = nametags at a party. Without nametags, swapping people\'s seats confuses Flutter about who is who.',
    ['ValueKey(id): stable identity from data', 'UniqueKey(): always new, no state preservation', 'GlobalKey: cross-tree access + animations', 'Keys only needed for same-type siblings', 'AnimatedList + keys for smooth reorder', 'PageStorageKey for scroll position'],
    `// Without key — bug on reorder!
children: items.map((item) => ItemWidget(item)).toList()

// ✅ With ValueKey — state preserved
children: items.map((item) =>
  ItemWidget(key: ValueKey(item.id), item: item)
).toList()

// GlobalKey — access widget across tree
final key = GlobalKey<FormState>();
Form(key: key, child: ...);
key.currentState?.validate();

// UniqueKey — force rebuild always
Container(key: UniqueKey(), color: color)`,
    [
      q('Theoretical', 'When do you need to use keys in Flutter?', 'متى تحتاج استخدام keys في Flutter؟', 3, ['Same-type widgets at same level', 'Reorderable lists', 'Preserving state on reorder']),
      q('Practical', 'Fix a todo list where checkboxes get wrong state on delete', 'صلّح قائمة todo حيث checkboxes تأخذ state خاطئة عند الحذف', 3, ['Add Key(item.id) to each tile', 'ValueKey based on stable ID']),
      q('Deep Dive', 'How does Flutter use keys to match old and new element trees?', 'كيف تستخدم Flutter keys لمطابقة شجرة العناصر؟', 4, ['Element tree reconciliation', 'Key match: reuse element + state', 'No key: match by type+position']),
      q('Critical Thinking', 'When would UniqueKey cause a bug?', 'متى يسبب UniqueKey مشكلة؟', 3, ['Every rebuild = new key = new state', 'Animations reset', 'Should use ValueKey for stable state']),
      q('Practical', 'Use PageStorageKey to preserve scroll position in a tab', 'استخدم PageStorageKey للحفاظ على موضع التمرير في تبويب', 2, ['ListView(key: PageStorageKey("tab1"))', 'Tab switch preserves position'])
    ],
    ['يفهم widget reconciliation', 'يعرف متى يستخدم keys'], ['يقول "مش محتاج keys"', 'يستخدم UniqueKey دايماً'], ['يشرح element tree matching', 'يذكر PageStorageKey'],
    ['build-context'], 'inherited-widget', 'InheritedWidget', [],
    'عدم استخدام keys في reorderable list', 'دايماً ValueKey(item.id) في أي list تتغير ترتيبها',
    'Keys = nametags for widgets', 'ValueKey(id) | UniqueKey | GlobalKey | PageStorageKey'),

  mk('inherited-widget', 67, 'InheritedWidget & InheritedModel', 'InheritedWidget والـ InheritedModel',
    'Senior', 'Common', ['Flutter', 'State Management'],
    'InheritedWidget for efficient state propagation without rebuilding whole tree',
    'InheritedWidget is Flutter\'s built-in mechanism for providing state down the widget tree. Provider/Riverpod are built on top of it.',
    'InheritedWidget = TV broadcast. One signal from the top; any TV (widget) that is tuned in (subscribed) receives updates.',
    ['updateShouldNotify: control rebuild', 'context.dependOnInheritedWidgetOfExactType', 'MyWidget.of(context) pattern', 'InheritedModel for partial updates', 'Base of Provider package', 'No listeners — push model'],
    `class AuthState extends InheritedWidget {
  final User? user;
  final VoidCallback logout;

  const AuthState({
    required this.user,
    required this.logout,
    required super.child,
    super.key
  });

  static AuthState of(BuildContext context) {
    final result = context.dependOnInheritedWidgetOfExactType<AuthState>();
    assert(result != null, 'No AuthState in tree');
    return result!;
  }

  @override
  bool updateShouldNotify(AuthState old) => old.user != user;
}

// Usage
final user = AuthState.of(context).user;`,
    [
      q('Theoretical', 'How does InheritedWidget prevent unnecessary rebuilds?', 'كيف يمنع InheritedWidget إعادة البناء غير الضرورية؟', 4, ['updateShouldNotify returns false → no rebuild', 'Only registered dependents rebuild', 'Non-dependent widgets skip']),
      q('Practical', 'Implement a Theme provider using InheritedWidget', 'نفذ Theme provider باستخدام InheritedWidget', 4, ['Extend InheritedWidget', 'Store ThemeData', 'static of(context) factory method']),
      q('Deep Dive', 'What is the difference between InheritedWidget and InheritedModel?', 'ما الفرق بين InheritedWidget و InheritedModel؟', 5, ['InheritedWidget: all-or-nothing rebuild', 'InheritedModel: partial aspect-based rebuild', 'InheritedModel better for large state']),
      q('System Design', 'Design a localization system using InheritedWidget', 'صمم نظام localization باستخدام InheritedWidget', 4, ['Store locale + translations', 'Rebuild only language-dependent widgets', 'Flutter built-in Localizations uses this']),
      q('Critical Thinking', 'Why do most developers use Provider instead of raw InheritedWidget?', 'لماذا يستخدم معظم المطورين Provider بدلاً من InheritedWidget مباشرة؟', 3, ['Boilerplate reduction', 'ChangeNotifier integration', 'Easier testing'])
    ],
    ['يفهم updateShouldNotify', 'يعرف الـ base mechanism'], ['لا يعرف InheritedWidget', 'يعتقد Provider magic من الفراغ'], ['يشرح dependOnInheritedWidget', 'يذكر InheritedModel'],
    ['keys-flutter'], 'media-query', 'MediaQuery & Layout', [],
    'نسيان تعريف static of(context)', 'دايماً عرّف static of() للـ convenience access',
    'InheritedWidget = tree-wide broadcast signal', 'extends InheritedWidget | updateShouldNotify | static of(ctx)'),

  mk('media-query', 68, 'MediaQuery & Responsive Layout', 'MediaQuery والتصميم المتجاوب',
    'Junior', 'Very Common', ['Flutter', 'UI', 'Responsive'],
    'MediaQuery for screen info, LayoutBuilder for constraints, responsive patterns',
    'MediaQuery provides screen size, orientation, text scale, notch info. LayoutBuilder gives parent constraints. Together for responsive UI.',
    'MediaQuery = measuring tape for the screen. LayoutBuilder = measuring the available space inside a room.',
    ['MediaQuery.sizeOf(context): screen size', 'LayoutBuilder for widget-level constraints', 'OrientationBuilder for orientation', 'Breakpoints: <600 mobile, 600-1200 tablet, >1200 desktop', 'SafeArea for notch/home indicator', 'textScaleFactor for accessibility'],
    `// Screen dimensions
final size = MediaQuery.sizeOf(context);
final isTablet = size.width >= 600;

// LayoutBuilder — responds to parent
LayoutBuilder(builder: (ctx, constraints) {
  if (constraints.maxWidth > 600) {
    return DesktopLayout();
  }
  return MobileLayout();
})

// SafeArea
SafeArea(child: Scaffold(...))

// Orientation
OrientationBuilder(builder: (ctx, orientation) {
  final cols = orientation == Orientation.portrait ? 2 : 4;
  return GridView.builder(gridDelegate:
    SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: cols));
})`,
    [
      q('Theoretical', 'What is the difference between MediaQuery.size and LayoutBuilder constraints?', 'ما الفرق بين MediaQuery.size و LayoutBuilder constraints؟', 2, ['MediaQuery = screen size', 'LayoutBuilder = available space from parent']),
      q('Practical', 'Build a responsive grid: 1 column on mobile, 3 on desktop', 'ابنِ grid متجاوبة: عمود واحد على الجوال، 3 على سطح المكتب', 3, ['LayoutBuilder + crossAxisCount', 'Breakpoints at 600/1200', 'SliverGridDelegate']),
      q('Practical', 'Handle text overflow on small screens gracefully', 'تعامل مع text overflow على الشاشات الصغيرة بشكل أنيق', 2, ['Text overflow: TextOverflow.ellipsis', 'Flexible + Text', 'FittedBox']),
      q('Deep Dive', 'How does MediaQuery.textScaleFactor affect accessibility?', 'كيف يؤثر MediaQuery.textScaleFactor على إمكانية الوصول؟', 3, ['Users can increase system font size', 'Text grows accordingly', 'Design must accommodate large text']),
      q('System Design', 'Design an adaptive layout for phone, tablet, and desktop', 'صمم layout متكيف لهاتف وتابلت وسطح مكتب', 4, ['Mobile: bottom nav', 'Tablet: side rail', 'Desktop: drawer + wide content'])
    ],
    ['يعرف responsive design', 'يستخدم LayoutBuilder'], ['يستخدم MediaQuery فقط', 'يكتب hardcoded sizes'], ['يذكر textScaleFactor', 'يشرح adaptive layout'],
    ['inherited-widget'], 'accessibility', 'Accessibility', [],
    'استخدام hardcoded pixel values', 'استخدم MediaQuery و LayoutBuilder للـ responsive values',
    'MediaQuery = screen facts, LayoutBuilder = available space', 'MediaQuery.sizeOf | LayoutBuilder | SafeArea | OrientationBuilder'),

  mk('accessibility', 69, 'Accessibility in Flutter', 'إمكانية الوصول في Flutter',
    'Mid', 'Common', ['Flutter', 'Accessibility', 'UI'],
    'Semantics widget, screen readers, contrast, touch targets, TalkBack/VoiceOver',
    'Accessibility ensures app is usable by everyone. Flutter provides Semantics widget for screen readers. WCAG guidelines for contrast and sizing.',
    'Accessibility = building ramp for wheelchair users. Semantics = labels on braille buttons. Everyone benefits when design is inclusive.',
    ['Semantics widget: label, hint, button', 'MergeSemantics for grouped elements', 'ExcludeSemantics for decorative elements', 'Minimum touch target: 48x48dp', 'Color contrast ratio: 4.5:1', 'Scale text with textScaleFactor'],
    `// Basic semantics
Semantics(
  label: 'Profile picture of Ali Ahmed',
  child: CircleAvatar(backgroundImage: NetworkImage(url)),
)

// Button with custom hint
Semantics(
  button: true,
  label: 'Add to cart',
  hint: 'Double tap to add item to shopping cart',
  child: IconButton(icon: Icon(Icons.add_shopping_cart), onPressed: addToCart),
)

// Merge child semantics
MergeSemantics(
  child: Row(children: [Icon(Icons.star), Text('4.5 stars, 120 reviews')]),
)

// Exclude decorative elements
ExcludeSemantics(child: Icon(Icons.decorative, color: Colors.grey))`,
    [
      q('Theoretical', 'What is the Semantics widget and why is it important?', 'ما هو Semantics widget ولماذا هو مهم؟', 2, ['Provides screen reader info', 'TalkBack/VoiceOver uses it', 'Required for accessibility compliance']),
      q('Practical', 'Make a custom button accessible with proper semantics', 'اجعل custom button قابلاً للوصول مع semantics صحيحة', 2, ['Semantics(button: true, label: "...", onTap: ...)']),
      q('Practical', 'Test your app\'s accessibility using Flutter DevTools', 'اختبر إمكانية الوصول في تطبيقك باستخدام Flutter DevTools', 3, ['Enable accessibility inspector', 'Check contrast ratios', 'Test with TalkBack/VoiceOver']),
      q('Deep Dive', 'How does Flutter communicate with TalkBack/VoiceOver?', 'كيف تتواصل Flutter مع TalkBack/VoiceOver؟', 4, ['Semantics tree separate from widget tree', 'SemanticsOwner sends to platform', 'Platform sends to accessibility service']),
      q('Critical Thinking', 'A product manager says accessibility is not a priority. How do you respond?', 'مدير المنتج يقول الـ accessibility مش أولوية. كيف ترد؟', 3, ['Legal requirement in some countries', 'Improves UX for all users', 'SEO benefits from semantic structure'])
    ],
    ['يعرف Semantics widget', 'يفكر في accessibility من الأول'], ['لا يعرف TalkBack/VoiceOver', 'يقول "مش مهم"'], ['يذكر WCAG', 'يشرح semantics tree'],
    ['media-query'], 'dio-http', 'Dio & HTTP Client', [],
    'تجاهل الـ accessibility في الـ design', 'دايماً أضف Semantics للـ custom widgets والـ important images',
    'Accessibility = ramp for everyone', 'Semantics | MergeSemantics | ExcludeSemantics | 48dp target'),

  mk('dio-http', 70, 'Dio & HTTP Client', 'مكتبة Dio والـ HTTP',
    'Junior', 'Critical', ['Flutter', 'Networking', 'Backend'],
    'Dio vs http package, interceptors, retry, timeout, FormData',
    'Dio is the most popular HTTP client for Flutter. Supports interceptors, custom adapters, file upload, timeout, retry.',
    'Dio = Swiss army knife for networking. http package = basic pocket knife. Dio has interceptors (middleware), retry, FormData built-in.',
    ['Dio: interceptors for auth/logging', 'BaseOptions: baseUrl, timeout, headers', 'Interceptor: request/response/error', 'FormData + MultipartFile for uploads', 'DioException types', 'http package: simple, lightweight'],
    `final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  connectTimeout: Duration(seconds: 10),
  receiveTimeout: Duration(seconds: 15),
  headers: {'Accept': 'application/json'},
));

// Auth interceptor
dio.interceptors.add(InterceptorsWrapper(
  onRequest: (options, handler) {
    options.headers['Authorization'] = 'Bearer \$token';
    handler.next(options);
  },
  onError: (error, handler) async {
    if (error.response?.statusCode == 401) {
      await refreshToken();
      handler.resolve(await dio.fetch(error.requestOptions));
    } else {
      handler.next(error);
    }
  },
));

// Upload file
final formData = FormData.fromMap({
  'file': await MultipartFile.fromFile(path, filename: 'photo.jpg')
  });
await dio.post('/upload', data: formData);`,
    [
      q('Practical', 'Implement a Dio interceptor that adds Bearer token to every request', 'نفذ Dio interceptor يضيف Bearer token لكل طلب', 2, ['onRequest add Authorization header', 'handler.next(options)']),
      q('Practical', 'Handle 401 unauthorized with automatic token refresh', 'تعامل مع 401 مع تحديث تلقائي للـ token', 4, ['onError check 401', 'refreshToken()', 'retry original request']),
      q('Theoretical', 'What is the difference between Dio and the http package?', 'ما الفرق بين Dio وـ http package؟', 2, ['Dio: interceptors, FormData, retry', 'http: simple, no interceptors', 'Dio preferred for complex apps']),
      q('System Design', 'Design a network layer with caching and retry', 'صمم network layer مع caching و retry', 4, ['Dio + retry interceptor', 'LRU cache for GET', 'Exponential backoff']),
      q('Deep Dive', 'What is a DioException and how do you handle different types?', 'ما هو DioException وكيف تتعامل مع أنواعه المختلفة؟', 3, ['connectionTimeout', 'response (server error)', 'cancel', 'badResponse'])
    ],
    ['يعرف Interceptors', 'يتعامل مع errors صح'], ['لا يعرف Interceptors', 'ما يعرفش الفرق مع http'], ['يذكر retry interceptor', 'يشرح 401 refresh pattern'],
    ['accessibility'], 'rest-api', 'REST API Integration', [],
    'عدم إضافة timeout للـ Dio', 'دايماً set connectTimeout وـ receiveTimeout',
    'Interceptors = passport control for requests/responses', 'BaseOptions | Interceptor | FormData | DioException'),

  mk('rest-api', 71, 'REST API Integration', 'تكامل REST API',
    'Junior', 'Critical', ['Flutter', 'Networking', 'Backend'],
    'HTTP methods, serialization, fromJson/toJson, error handling, repository pattern',
    'REST APIs use HTTP verbs. Flutter converts JSON to Dart objects with fromJson. Freezed/json_serializable for codegen.',
    'REST API = restaurant menu. GET = read, POST = order new, PUT = change order, DELETE = cancel. JSON = the order slip.',
    ['GET/POST/PUT/PATCH/DELETE verbs', 'jsonDecode/jsonEncode', 'fromJson factory constructor', 'json_serializable + freezed codegen', 'Repository pattern for abstraction', 'Status codes: 200/201/400/401/404/500'],
    `// Model with manual JSON
class Product {
  final int id;
  final String name;
  final double price;

  Product({required this.id, required this.name, required this.price});

  factory Product.fromJson(Map<String, dynamic> json) => Product(
    id: json['id'],
    name: json['name'],
    price: (json['price'] as num).toDouble(),
  );

  Map<String, dynamic> toJson() => {'id': id, 'name': name, 'price': price};
}

// Repository
abstract class ProductRepo {
  Future<List<Product>> getProducts();
  Future<Product> createProduct(Product p);
}

class ProductRepoImpl implements ProductRepo {
  ProductRepoImpl(this.dio);
  final Dio dio;

  @override
  Future<List<Product>> getProducts() async {
    final resp = await dio.get('/products');
    return (resp.data as List).map((j) => Product.fromJson(j)).toList();
  }
}`,
    [
      q('Practical', 'Write a fromJson factory for a nested JSON response', 'اكتب factory fromJson لـ JSON متداخل', 2, ['Handle nested maps', 'Cast types carefully', 'json[\'key\'] as Type']),
      q('Theoretical', 'What is the difference between PUT and PATCH?', 'ما الفرق بين PUT و PATCH؟', 2, ['PUT: replace entire resource', 'PATCH: partial update']),
      q('Practical', 'Implement a repository pattern for user data', 'نفذ repository pattern لبيانات المستخدم', 3, ['Abstract class + implementation', 'Dio injected in constructor', 'Error → exception or Result type']),
      q('System Design', 'Design offline-first data sync', 'صمم sync بيانات offline-first', 5, ['Local DB (Hive/SQLite)', 'Sync queue on reconnect', 'Conflict resolution strategy']),
      q('Deep Dive', 'How does json_serializable work under the hood?', 'كيف يعمل json_serializable تحت الغطاء؟', 4, ['build_runner generates .g.dart', 'Uses annotations @JsonSerializable', 'fromJson/toJson auto-generated'])
    ],
    ['يكتب صح fromJson/toJson', 'يستخدم repository pattern'], ['يكتب parsing في UI layer', 'ما يعرفش codegen'], ['يذكر json_serializable', 'يشرح status codes'],
    ['dio-http'], 'graphql-dart', 'GraphQL in Flutter', [],
    'كتابة JSON parsing في الـ UI layer', 'افصل في repository + model layer',
    'fromJson = JSON→Dart, toJson = Dart→JSON', 'fromJson factory | toJson() | repository | json_serializable'),

  mk('graphql-dart', 72, 'GraphQL in Flutter', 'GraphQL في Flutter',
    'Mid', 'Rare', ['Flutter', 'Networking', 'GraphQL'],
    'graphql_flutter package, queries, mutations, subscriptions, Apollo concepts',
    'GraphQL lets clients request exactly the data they need. Unlike REST, one endpoint. Used by Shopify, GitHub, some Egyptian startups.',
    'GraphQL = custom sandwich order. REST = fixed menu item. With GraphQL, you say exactly what ingredients (fields) you want.',
    ['One endpoint vs multiple REST endpoints', 'Query: read data', 'Mutation: write data', 'Subscription: real-time', 'graphql_flutter: GraphQLClient, Query widget', 'Fragments for reusable fields'],
    `// graphql_flutter
final client = GraphQLClient(
  link: HttpLink('https://api.example.com/graphql'),
  cache: GraphQLCache(),
);

// Query
const query = r'''
  query GetUser(\$id: ID!) {
    user(id: \$id) { id name email posts { title } }
  }
''';

final result = await client.query(QueryOptions(
  document: gql(query),
  variables: {'id': '123'},
));

// Mutation
final result = await client.mutate(MutationOptions(
  document: gql(r'mutation CreateUser(\$name: String!) { createUser(name: \$name) { id } }'),
  variables: {'name': 'Ali'},
));`,
    [
      q('Theoretical', 'What are the advantages of GraphQL over REST?', 'ما مزايا GraphQL على REST؟', 3, ['No over/under-fetching', 'Single endpoint', 'Strong typing with schema']),
      q('Practical', 'Write a GraphQL query to fetch product with nested category', 'اكتب GraphQL query لجلب منتج مع category متداخلة', 3, ['query GetProduct { product(id:1) { name category { name } } }']),
      q('Theoretical', 'What is a GraphQL mutation vs query?', 'ما الفرق بين GraphQL mutation وـ query؟', 2, ['Query = read (safe)', 'Mutation = write/modify']),
      q('System Design', 'When would you choose GraphQL over REST?', 'متى تختار GraphQL على REST؟', 4, ['Multiple clients with different needs', 'Complex nested data', 'Rapid schema evolution']),
      q('Deep Dive', 'How do GraphQL subscriptions work for real-time data?', 'كيف تعمل GraphQL subscriptions للبيانات الـ real-time؟', 4, ['WebSocket underlying', 'Server pushes on events', 'Subscription widget in graphql_flutter'])
    ],
    ['يعرف الفرق GraphQL vs REST', 'يكتب queries صح'], ['ما يعرفش GraphQL أصلاً', 'يخلط query مع mutation'], ['يذكر subscriptions', 'يشرح schema typing'],
    ['rest-api'], 'websockets-dart', 'WebSockets in Flutter', [],
    'استخدام GraphQL في simple CRUD app', 'استخدم REST للـ simple apps وGraphQL للـ complex',
    'GraphQL = order exactly what you want', 'query | mutation | subscription | gql() | GraphQLClient'),

  mk('websockets-dart', 73, 'WebSockets & Real-time', 'WebSockets والـ Real-time',
    'Mid', 'Common', ['Flutter', 'Networking', 'Backend'],
    'WebSocket, web_socket_channel, real-time chat, live tracking',
    'WebSockets provide bidirectional real-time communication. Unlike HTTP (request/response), server can push data anytime. Used in chat, live tracking, notifications.',
    'WebSocket = phone call (bidirectional, always connected). HTTP = SMS (one message at a time).',
    ['WebSocket: ws:// or wss://', 'web_socket_channel package', 'StreamBuilder for UI updates', 'Reconnection strategy', 'Ping/pong heartbeat', 'Flutter + Socket.io via socket_io_client'],
    `import 'package:web_socket_channel/web_socket_channel.dart';

class ChatService {
  late WebSocketChannel _channel;

  void connect(String userId) {
    _channel = WebSocketChannel.connect(
      Uri.parse('wss://chat.example.com/ws?userId=\$userId'),
    );
  }

  Stream<String> get messages => _channel.stream.map((m) => m as String);
  void send(String message) => _channel.sink.add(message);
  void disconnect() => _channel.sink.close();
}

// UI
StreamBuilder<String>(
  stream: chatService.messages,
  builder: (ctx, snap) {
    if (!snap.hasData) return Loading();
    return MessageBubble(snap.data!);
  },
)`,
    [
      q('Theoretical', 'When do you use WebSockets vs HTTP polling vs SSE?', 'متى تستخدم WebSockets مقابل HTTP polling مقابل SSE؟', 3, ['WS: bidirectional real-time', 'SSE: server-push only', 'Polling: simplest but inefficient']),
      q('Practical', 'Implement a reconnecting WebSocket with exponential backoff', 'نفذ WebSocket مع إعادة اتصال بـ exponential backoff', 4, ['Try reconnect on error', 'Delay = 2^attempt seconds', 'Max retry limit']),
      q('Practical', 'Build a simple real-time chat UI with WebSocket', 'ابنِ واجهة دردشة real-time بـ WebSocket', 3, ['WebSocketChannel + StreamBuilder', 'Messages list + input field', 'Send via sink.add()']),
      q('System Design', 'Design the backend for live bus tracking', 'صمم backend لـ تتبع الحافلات المباشر', 5, ['WS for driver→server', 'Server broadcast to passengers', 'Passenger WS subscription by route']),
      q('Deep Dive', 'How do you handle WebSocket disconnection in production?', 'كيف تتعامل مع انقطاع WebSocket في production؟', 4, ['Listen to onDone/onError', 'Reconnect with backoff', 'Show offline indicator'])
    ],
    ['يعرف web_socket_channel', 'يبني StreamBuilder correctly'], ['يخلط WS مع HTTP', 'ينسى disconnect()'], ['يذكر reconnection strategy', 'يفكر في offline handling'],
    ['graphql-dart'], 'local-storage', 'Local Storage', [],
    'نسيان close الـ WebSocket channel', 'دايماً close channel في dispose()',
    'WebSocket = always-open phone line', 'WebSocketChannel | sink.add() | stream | StreamBuilder'),

  mk('local-storage', 74, 'Local Storage: Hive & SharedPreferences', 'التخزين المحلي: Hive و SharedPreferences',
    'Junior', 'Very Common', ['Flutter', 'Storage', 'Backend'],
    'SharedPreferences for simple K/V, Hive for complex objects, SQLite for relational',
    'SharedPreferences: simple key-value, async. Hive: NoSQL fast binary storage. SQLite: relational queries. Choose based on data complexity.',
    'SharedPreferences = sticky note on fridge (simple). Hive = filing cabinet (organized). SQLite = full database (complex queries).',
    ['SharedPreferences: String, int, bool, List<String>', 'Hive: type adapters, boxes, HiveObject', 'Hive.openBox() async', 'SQLite via sqflite + drift', 'Isar: modern alternative to Hive', 'Encryption: hive_flutter with encrypt'],
    `// SharedPreferences
final prefs = await SharedPreferences.getInstance();
await prefs.setString('token', jwtToken);
final token = prefs.getString('token');

// Hive
@HiveType(typeId: 0)
class UserModel extends HiveObject {
  @HiveField(0) late String name;
  @HiveField(1) late String email;
}

// Register adapter (generated)
Hive.registerAdapter(UserModelAdapter());
final box = await Hive.openBox<UserModel>('users');
box.put('user1', UserModel()..name = 'Ali'..email = 'ali@e.com');
final user = box.get('user1');`,
    [
      q('Theoretical', 'What is the difference between SharedPreferences, Hive, and SQLite?', 'ما الفرق بين SharedPreferences و Hive و SQLite؟', 2, ['SP: simple K/V', 'Hive: NoSQL objects fast', 'SQLite: relational complex queries']),
      q('Practical', 'Store and retrieve a user token using SharedPreferences', 'خزّن واسترجع token مستخدم بـ SharedPreferences', 1, ['getInstance()', 'setString(key, value)', 'getString(key)']),
      q('Practical', 'Create a Hive model for a Product with type adapter', 'أنشئ Hive model لـ Product مع type adapter', 3, ['@HiveType annotation', '@HiveField on each field', 'run build_runner']),
      q('System Design', 'Design offline cache for dress rental history', 'صمم offline cache لتاريخ استئجار الفساتين', 4, ['Hive box for rental objects', 'Sync with Supabase on connect', 'Timestamp-based conflict resolution']),
      q('Critical Thinking', 'When would you choose Isar over Hive?', 'متى تختار Isar على Hive؟', 3, ['Isar: full-text search', 'Better queries than Hive', 'Larger datasets'])
    ],
    ['يعرف متى يستخدم كل library', 'يكتب Hive adapters'], ['يستخدم SharedPreferences للكل', 'لا يعرف Hive adapters'], ['يذكر Isar', 'يفكر في encryption'],
    ['websockets-dart'], 'firebase-flutter', 'Firebase Integration', [],
    'تخزين data sensitive (passwords) في SharedPreferences', 'استخدم flutter_secure_storage للـ sensitive data',
    'SP=sticky note, Hive=cabinet, SQLite=database', 'SharedPreferences | Hive.openBox | @HiveType | @HiveField'),

  mk('firebase-flutter', 75, 'Firebase Integration', 'تكامل Firebase',
    'Mid', 'Very Common', ['Flutter', 'Firebase', 'Backend'],
    'Firestore, Auth, Storage, FCM, Crashlytics — FlutterFire packages',
    'Firebase provides BaaS. Firestore for NoSQL real-time DB. Auth for authentication. FCM for push notifications. Crashlytics for crash reporting.',
    'Firebase = all-in-one restaurant supply. Firestore=storage, Auth=ID check, FCM=delivery notifications, Crashlytics=quality control.',
    ['FlutterFire CLI for setup', 'Firestore: collection → document → data', 'StreamBuilder for real-time', 'Auth: signIn, signOut, currentUser', 'Storage: uploadFile, getDownloadURL', 'FCM: background + foreground handling'],
    `// Firestore CRUD
final db = FirebaseFirestore.instance;

// Create
await db.collection('rentals').add({
  'dressId': '123', 'customerId': 'u456', 'date': Timestamp.now()
});

// Real-time stream
StreamBuilder<QuerySnapshot>(
  stream: db.collection('rentals')
    .where('customerId', isEqualTo: userId)
    .orderBy('date', descending: true)
    .snapshots(),
  builder: (ctx, snap) {
    final rentals = snap.data?.docs.map(
      (d) => Rental.fromJson(d.data() as Map)
    ).toList() ?? [];
    return RentalList(rentals);
  },
)`,
    [
      q('Practical', 'How do you set up Firebase in a Flutter project?', 'كيف تعمل setup لـ Firebase في مشروع Flutter؟', 1, ['FlutterFire CLI: flutterfire configure', 'firebase_options.dart generated', 'Firebase.initializeApp in main()']),
      q('Practical', 'Implementation: listen to Firestore collection in real-time', 'نفذ: استمع لـ Firestore collection بشكل real-time', 2, ['collection().snapshots() → Stream', 'StreamBuilder in UI']),
      q('System Design', 'Design Firestore structure for a rental app with access control', 'صمم Firestore structure لتطبيق إيجار مع التحكم بالوصول', 4, ['rentals/{id} with ownerId field', 'Security rules: allow read if ownerId == auth.uid']),
      q('Theoretical', 'What are Firebase Security Rules and how do they work?', 'ما هي Firebase Security Rules وكيف تعمل؟', 3, ['Server-side access control', 'allow read/write if condition', 'Runs before data is returned']),
      q('Deep Dive', 'How does Firestore ensure real-time sync across devices?', 'كيف يضمن Firestore المزامنة الفورية بين الأجهزة؟', 5, ['Long-polling over HTTP/2', 'Offline cache with pending writes', 'Server timestamp resolution'])
    ],
    ['يعرف FlutterFire packages', 'يبني real-time queries'], ['ما يعرفش Security Rules', 'يستخدم Firebase بدون auth'], ['يذكر Security Rules', 'يشرح offline caching'],
    ['local-storage'], 'push-notifications', 'Push Notifications', [],
    'كتابة Security Rules غلط تتيح access لكل البيانات', 'دايماً test Security Rules قبل deploy',
    'Firebase = complete backend in a box', 'FlutterFire | collection().snapshots() | Security Rules | FCM'),
];
