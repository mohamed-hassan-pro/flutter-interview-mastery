// @ts-nocheck
import type { Card } from '@/types/card';
const mk = (id: string, num: number, title: string, titleAr: string, level: string, freq: string, tags: string[], summary: string, kp: string[], code: string, qs: any[], pre: string[], nid: string, nt: string, hook: string, cheat: string, cos: string[], pop: string, sal: string): Card => ({ id, number: num, title, titleAr, level: level as any, frequency: freq as any, tags, definition: { summary, detailed: summary, analogy: '', keyPoints: kp, codeExample: { language: 'dart', code } }, questions: qs, interviewerMind: { whatTheyWant: kp.slice(0, 2), redFlags: ['لا يعرف ' + id], greenFlags: ['يشرح ' + id + ' بعمق'] }, linkedCards: { prerequisites: pre, nextSteps: [{ id: nid, title: nt }], related: [] }, commonPitfalls: [{ mistake: 'تجنب ' + id + ' كلياً', whyWrong: 'ضروري للمقابلات', correctApproach: 'تعلّم ' + id, egyptianContext: 'مهم في السوق المصري' }], answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة'], timeAllocation: { junior: '2 دق', mid: '3 دق', senior: '5 دق' }, keyPhrases: [id] }, quickRevision: { bulletPoints: kp.slice(0, 4), memoryHook: hook, cheatSheet: cheat }, companyTags: cos, egyptianMarket: { popularity: pop, salaryImpact: sal } });
const q = (t: string, q: string, qa: string, d: number, p: string[]) => ({ type: t as any, question: q, questionAr: qa, difficulty: d, expectedAnswer: { points: p, timeToAnswer: '2-3 minutes' } });

export const cardsExtra6: Card[] = [
    mk('swvl-questions', 88, 'Swvl Interview Questions', 'أسئلة مقابلة Swvl',
        'Senior', 'Critical', ['Company-Specific', 'Flutter', 'System Design'],
        'Swvl focuses on real-time tracking, large-scale Flutter apps, system design for transport',
        ['Real-time tracking with WebSockets', 'Large-scale map integration', 'Offline-first for poor connectivity', 'BLoC for complex state', 'Performance: 60fps with live maps', 'Clean architecture mandatory'],
        `// Swvl-style live tracking widget
class BusTracker extends StatelessWidget {
  const BusTracker({super.key, required this.route});
  final String route;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<TrackingBloc, TrackingState>(
      builder: (ctx, state) => switch (state) {
        TrackingLoading() => const CircularProgressIndicator(),
        TrackingActive(:var buses) => LiveMapWidget(buses: buses),
        TrackingError(:var msg) => ErrorWidget(msg),
      },
    );
  }
}`,
        [
            q('System Design', 'Design a real-time bus tracking system for 10,000 concurrent users', 'صمم نظام تتبع حافلات real-time لـ 10,000 مستخدم متزامن', 5, ['WebSocket per bus route', 'Load-balanced WS servers', 'Client reconnect with backoff', 'Show last known position on reconnect']),
            q('System Design', 'How would you implement offline mode for Swvl-like app?', 'كيف تنفذ offline mode لتطبيق مثل Swvl؟', 5, ['Cache routes in Hive/SQLite', 'Queue bookings for sync', 'Show cached data with timestamp']),
            q('Critical Thinking', 'How do you optimize Google Maps performance in Flutter?', 'كيف تحسّن أداء Google Maps في Flutter؟', 4, ['RepaintBoundary around map', 'Cluster markers when zoomed out', 'Lazy load station details']),
            q('Practical', 'Implement BLoC for booking flow with 5 states', 'نفذ BLoC لـ booking flow بـ 5 حالات', 4, ['sealed class BookingState', 'Separate events per step', 'Error recovery per step']),
            q('Theoretical', 'What architecture patterns does Swvl likely use?', 'ما أنماط architecture التي يستخدمها Swvl على الأرجح؟', 3, ['Clean Architecture', 'BLoC pattern', 'Repository + UseCase layers'])
        ],
        ['play-store-deploy'], 'maxab-questions', 'MaxAB Interview Questions',
        'Swvl = WebSocket + BLoC + Clean = Transport Scale', 'WebSocket+BLoC+Clean+Maps+Offline',
        ['Swvl'], 'Very High', 'Critical'),

    mk('maxab-questions', 89, 'MaxAB Interview Questions', 'أسئلة مقابلة MaxAB',
        'Mid', 'Critical', ['Company-Specific', 'Flutter', 'Backend'],
        'MaxAB focuses on inventory, ordering, delivery — offline-first, Arabic RTL, driver apps',
        ['Offline-first for drivers with poor signal', 'RTL Arabic UI required', 'Complex inventory state', 'Barcode scanning for deliveries', 'Real-time order updates', 'Large product catalogs'],
        `// MaxAB-style Arabic RTL product list
Directionality(
  textDirection: TextDirection.rtl,
  child: ListView.builder(
    itemCount: products.length,
    itemBuilder: (ctx, i) => ProductCard(
      product: products[i],
      onScan: () => scanBarcode(products[i].sku),
    ),
  ),
)`,
        [
            q('System Design', 'Design an inventory management system for 50,000 SKUs', 'صمم نظام إدارة مخزون لـ 50,000 SKU', 5, ['Local SQLite with Drift', 'Sync delta changes only', 'Barcode indexing']),
            q('Critical Thinking', 'How do you handle RTL Arabic text in a complex Flutter app?', 'كيف تتعامل مع RTL Arabic في Flutter app معقد؟', 3, ['textDirection: TextDirection.rtl', 'Directionality widget', 'locale-based switching']),
            q('Practical', 'Implement barcode scanning for product lookup', 'نفذ barcode scanning للبحث عن المنتجات', 3, ['ML Kit BarcodeScanner', 'camera package for live preview', 'Navigate on scan complete']),
            q('System Design', 'Design order sync for drivers with 2G connectivity', 'صمم sync للطلبات للسائقين بـ 2G', 4, ['Compress payloads', 'Queue updates locally', 'Binary protocol vs JSON']),
            q('Theoretical', 'How would you optimize a 50,000 item product list?', 'كيف تحسّن قائمة من 50,000 منتج؟', 4, ['Virtual scroll with SliverList', 'Deferred loading', 'Text search with Fuse or trie'])
        ],
        ['swvl-questions'], 'fawry-questions', 'Fawry Interview Questions',
        'MaxAB = Offline+Arabic+Inventory+B2B', 'Offline-first+RTL+Barcode+Drift+Delta-sync',
        ['MaxAB'], 'High', 'Critical'),

    mk('fawry-questions', 90, 'Fawry Interview Questions', 'أسئلة مقابلة Fawry',
        'Mid', 'Common', ['Company-Specific', 'Flutter', 'FinTech'],
        'Fawry focuses on payment integration, security, transaction reliability, PCI compliance',
        ['Payment flows and security', 'PCI-DSS compliance in mobile', 'Encryption of payment data', 'Transaction state management', 'Retry mechanisms for payments', 'Deep link from SMS OTP'],
        `// Fawry-style payment flow with retry
class PaymentBloc extends Bloc<PaymentEvent, PaymentState> {
  Future<void> _onPay(PayEvent e, emit) async {
    emit(PaymentProcessing());
    for (int attempt = 1; attempt <= 3; attempt++) {
      try {
        final txn = await paymentService.charge(e.amount, e.card);
        return emit(PaymentSuccess(txn));
      } on PaymentException catch (err) {
        if (attempt == 3) return emit(PaymentFailed(err.message));
        await Future.delayed(Duration(seconds: attempt * 2));
      }
    }
  }
}`,
        [
            q('System Design', 'Design a payment flow that handles network interruptions', 'صمم payment flow يتعامل مع انقطاع الشبكة', 5, ['Idempotency key', 'Poll for status', 'Exactly-once semantics']),
            q('Theoretical', 'What is PCI-DSS and how does it affect mobile development?', 'ما هو PCI-DSS وكيف يؤثر على تطوير الجوال؟', 4, ['No card data in logs', 'No card data in local storage', 'Use tokenized payments']),
            q('Practical', 'Implement OTP verification with deep link auto-fill', 'نفذ OTP verification مع deep link auto-fill', 3, ['Android: SMS Retriever API', 'iOS: OneTimeCode text content type', 'Deep link from SMS']),
            q('Critical Thinking', 'How do you prevent double-charging on retry?', 'كيف تمنع الـ double charge عند الـ retry؟', 5, ['Idempotency key per attempt', 'Backend deduplicates by key', 'Show pending state, poll result']),
            q('Deep Dive', 'What is tokenization in payment systems?', 'ما هو التوكينج في أنظمة المدفوعات؟', 4, ['Replace card data with token', 'Token useless if stolen', 'PCI scope reduction'])
        ],
        ['maxab-questions'], 'thndr-questions', 'Thndr Interview Questions',
        'Fawry = Payment+Security+Retry+Idempotency', 'Idempotency+PCI+Tokenization+OTP',
        ['Fawry'], 'High', 'Critical'),

    mk('thndr-questions', 91, 'Thndr Interview Questions', 'أسئلة مقابلة Thndr',
        'Senior', 'Common', ['Company-Specific', 'Flutter', 'FinTech'],
        'Thndr is a stock trading app: real-time prices, complex state, charts, financial data',
        ['Real-time stock prices via WebSocket', 'Complex chart widgets', 'Financial calculations precision', 'BLoC for trading state', 'Performance: 60fps with live data', 'Dark mode with financial color coding'],
        `// Thndr-style real-time stock ticker
class StockTicker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<StockBloc, StockState>(
      builder: (ctx, state) {
        final stock = state.stocks[symbol];
        final isUp = stock.change >= 0;
        return AnimatedDefaultTextStyle(
          duration: Duration(milliseconds: 300),
          style: TextStyle(
            color: isUp ? Colors.green : Colors.red,
            fontWeight: FontWeight.bold,
          ),
          child: Text('\${stock.price.toStringAsFixed(2)}'),
        );
      },
    );
  }
}`,
        [
            q('System Design', 'Design a real-time stock watchlist for 100 stocks', 'صمم watchlist real-time لـ 100 سهم', 5, ['WS stream for price updates', 'BLoC to manage stock state', 'Debounce UI updates to 60fps']),
            q('Practical', 'Handle floating point precision for financial calculations', 'تعامل مع دقة الأرقام العشرية في الحسابات المالية', 4, ['Never use double for money', 'Use Decimal package or BigInt', 'Round only for display']),
            q('Critical Thinking', 'How do you show price change animations efficiently?', 'كيف تعرض price change animations بكفاءة؟', 3, ['AnimatedDefaultTextStyle for color', 'const widgets around non-changing parts', 'RepaintBoundary per ticker']),
            q('System Design', 'Design a portfolio profit/loss calculation engine', 'صمم محرك حساب الأرباح/الخسائر للمحفظة', 5, ['Decimal arithmetic', 'Realized vs unrealized gains', 'Historical price cache']),
            q('Deep Dive', 'Why is WebSocket preferred over polling for stock prices?', 'لماذا يُفضَّل WebSocket على polling لأسعار الأسهم؟', 3, ['Lower latency', 'No wasted requests', 'Server-push for instant update'])
        ],
        ['fawry-questions'], 'paymob-questions', 'Paymob Interview Questions',
        'Thndr = RealTime+Charts+Decimal+BLoC+Performance', 'WS+BLoC+Decimal+AnimatedText+RepaintBoundary',
        ['Thndr'], 'High', 'Critical'),

    mk('paymob-questions', 92, 'Paymob Interview Questions', 'أسئلة مقابلة Paymob',
        'Mid', 'Common', ['Company-Specific', 'Flutter', 'FinTech'],
        'Paymob is payment gateway: SDK integration, webhook handling, checkout flows',
        ['Paymob SDK integration', 'Custom checkout UI', '3DS authentication flows', 'Webhook response handling', 'Multiple payment methods', 'Merchant dashboard integration'],
        `// Paymob-style payment integration
class PaymobService {
  final Dio _dio;

  Future<String> getAuthToken() async {
    final resp = await _dio.post('/auth/tokens',
      data: {'api_key': Env.paymobApiKey});
    return resp.data['token'];
  }

  Future<String> orderRegistration(String token, int amountCents) async {
    final resp = await _dio.post('/ecommerce/orders',
      options: Options(headers: {'Authorization': 'Bearer \$token'}),
      data: {'amount_cents': amountCents, 'currency': 'EGP'});
    return resp.data['id'].toString();
  }
}`,
        [
            q('Practical', 'Implement Paymob 3-step integration: token → order → payment key', 'نفذ Paymob 3-step: token → order → payment key', 4, ['Step 1: auth token', 'Step 2: order registration', 'Step 3: payment key → WebView or iframe']),
            q('Theoretical', 'What is 3DS authentication and why is it required?', 'ما هو 3DS authentication ولماذا هو مطلوب؟', 3, ['3D Secure: extra bank verification', 'Shift liability to bank', 'Required for most Egyptian cards']),
            q('System Design', 'Design retry and failure recovery for payment checkout', 'صمم retry وفشل recovery لـ checkout', 4, ['Idempotency key', 'Poll order status', 'Show retry option with same intent ID']),
            q('Critical Thinking', 'How do you test payment flows without real charges?', 'كيف تختبر payment flows بدون رسوم حقيقية؟', 3, ['Paymob test API key', 'Test card numbers', 'Mock payment service in tests']),
            q('Practical', 'Handle WebView iframe for 3DS in Flutter', 'تعامل مع WebView iframe لـ 3DS في Flutter', 3, ['webview_flutter package', 'Navigate to payment URL', 'Listen for redirect success URL'])
        ],
        ['thndr-questions'], 'itworx-questions', 'ITWorx Interview Questions',
        'Paymob = Auth→Order→PayKey→WebView→Result', '3-step: token+order+paymentKey → WebView',
        ['Paymob'], 'High', 'Critical'),

    mk('itworx-questions', 93, 'ITWorx Interview Questions', 'أسئلة مقابلة ITWorx',
        'Mid', 'Common', ['Company-Specific', 'Flutter', 'Enterprise'],
        'ITWorx is enterprise software: SOLID principles, clean code, testing, documentation',
        ['Clean Architecture mandatory', 'SOLID principles deep knowledge', 'Unit test coverage required', 'REST API + SharePoint integration', 'Enterprise security requirements', 'Agile/Scrum process'],
        `// ITWorx-style clean architecture
// lib/features/employees/
// ├── data/
// │   ├── models/employee_model.dart
// │   └── repositories/employee_repo_impl.dart
// ├── domain/
// │   ├── entities/employee.dart
// │   ├── repositories/employee_repo.dart
// │   └── usecases/get_employees_usecase.dart
// └── presentation/
//     ├── bloc/employees_bloc.dart
//     └── pages/employees_page.dart

class GetEmployeesUseCase {
  final EmployeeRepository _repo;
  GetEmployeesUseCase(this._repo);
  Future<List<Employee>> call() => _repo.getEmployees();
}`,
        [
            q('Theoretical', 'What are the layers of Clean Architecture?', 'ما هي طبقات Clean Architecture؟', 3, ['Presentation → Domain → Data', 'Domain: entities + usecases', 'Data: repositories + models']),
            q('Practical', 'Implement a UseCase for getting employee list', 'نفذ UseCase للحصول على قائمة الموظفين', 3, ['Domain layer', 'Calls repository interface', 'Returns domain entity not model']),
            q('Critical Thinking', 'How do you enforce SOLID in a team of 10 developers?', 'كيف تُطبّق SOLID في فريق من 10 مطورين؟', 4, ['Code review checklist', 'PR template with SOLID checks', 'Pair programming']),
            q('System Design', 'Design enterprise employee management system', 'صمم نظام إدارة موظفين enterprise', 5, ['Role-based access control', 'Audit logging', 'Offline capability']),
            q('Practical', 'Write a unit test for a UseCase with mocked repository', 'اكتب unit test لـ UseCase مع mocked repository', 3, ['Mockito mock repository', 'verify method called', 'Test both success and error'])
        ],
        ['paymob-questions'], 'valeo-questions', 'Valeo Interview Questions',
        'ITWorx = CleanArch+SOLID+Tests+Enterprise', 'CleanArch: Presentation→Domain→Data | UseCase | Unit Tests',
        ['ITWorx'], 'High', 'Critical'),

    mk('valeo-questions', 94, 'Valeo Interview Questions', 'أسئلة مقابلة Valeo',
        'Senior', 'Common', ['Company-Specific', 'Flutter', 'Embedded'],
        'Valeo is automotive tech: Flutter for dashboards, embedded, performance, platform channels',
        ['Automotive HMI requirements', '60fps mandatory for safety', 'Platform channels for CAN bus', 'Embedded Linux Flutter', 'Custom painters for dashboards', 'Safety-critical code standards'],
        `// Valeo-style automotive dashboard widget
class SpeedometerWidget extends StatelessWidget {
  final double speedKmh;
  const SpeedometerWidget({required this.speedKmh, super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: CustomPaint(
        painter: SpeedometerPainter(speedKmh),
        size: Size(300, 300),
      ),
    );
  }
}`,
        [
            q('System Design', 'Design a Flutter dashboard for an EV car display', 'صمم Flutter dashboard لشاشة سيارة كهربائية', 5, ['60fps strict requirement', 'Platform channels for vehicle data', 'Minimal GC pauses for safety']),
            q('Practical', 'Implement a platform channel to read engine RPM from native C++', 'نفذ platform channel لقراءة RPM من native C++', '5', ['MethodChannel Dart side', 'FFI or JNI on native', 'EventChannel for continuous stream']),
            q('Deep Dive', 'How do you achieve consistent 60fps in Flutter on embedded Linux?', 'كيف تحقق 60fps ثابت في Flutter على embedded Linux؟', 5, ['AOT compilation', 'Minimal widget rebuilds', 'RepaintBoundary everywhere', 'Constant canvas operations']),
            q('Critical Thinking', 'What are the safety implications of crashes in automotive Flutter apps?', 'ما التداعيات الأمنية لـ crashes في automotive Flutter apps؟', 5, ['Safety-critical = no crashes allowed', 'Extensive testing required', 'Fallback to hardware controls']),
            q('Theoretical', 'What is Flutter\'s Impeller renderer and how does it help?', 'ما هو Impeller renderer في Flutter وكيف يساعد؟', 4, ['New renderer vs Skia', 'Predictable GPU use', 'No shader compilation jank'])
        ],
        ['itworx-questions'], 'trella-questions', 'Trella Interview Questions',
        'Valeo = AutomotiveHMI+60fps+PlatformChannels+Safety', 'RepaintBoundary+CustomPainter+MethodChannel+60fps',
        ['Valeo'], 'Medium', 'Critical'),

    mk('trella-questions', 95, 'Trella Interview Questions', 'أسئلة مقابلة Trella',
        'Mid', 'Common', ['Company-Specific', 'Flutter', 'Logistics'],
        'Trella is freight logistics: driver app, real-time tracking, document scanning, Arabic',
        ['Driver app with offline capability', 'Document/invoice scanning', 'Real-time freight tracking', 'Arabic first', 'Complex form workflows', 'Integration with ERP systems'],
        `// Trella-style document scanner
class InvoiceScanner extends StatefulWidget {
  @override
  _InvoiceScannerState createState() => _InvoiceScannerState();
}

class _InvoiceScannerState extends State<InvoiceScanner> {
  String? _scannedText;

  Future<void> _scanDocument() async {
    final image = await ImagePicker().pickImage(source: ImageSource.camera);
    if (image == null) return;
    final recognized = await TextRecognizer()
      .processImage(InputImage.fromFilePath(image.path));
    setState(() => _scannedText = recognized.text);
  }
}`,
        [
            q('System Design', 'Design a real-time shipment tracking system', 'صمم نظام تتبع شحنات real-time', 4, ['WebSocket for location', 'Driver pushes location every 30s', 'Customer sees live on map']),
            q('Practical', 'Implement document scanning with ML Kit for invoice OCR', 'نفذ document scanning بـ ML Kit لـ OCR الفواتير', 3, ['TextRecognizer', 'Parse extracted text for amounts', 'Validate Egyptian invoice format']),
            q('Critical Thinking', 'How do you handle poor network for truck drivers in rural areas?', 'كيف تتعامل مع شبكة ضعيفة لسائقي الشاحنات في المناطق النائية؟', 4, ['Offline queue for location', 'Compress location payload', 'Batch sync on reconnect']),
            q('System Design', 'Design the state machine for shipment lifecycle', 'صمم state machine لدورة حياة الشحنة', 4, ['States: Created→PickedUp→InTransit→Delivered', 'Valid transitions only', 'Event sourcing for history']),
            q('Practical', 'Build a multi-document upload with progress tracking', 'ابنِ رفع متعدد الوثائق مع تتبع التقدم', 3, ['FormData.fromMap with MultipartFile', 'Upload each sequentially', 'Progress callback per file'])
        ],
        ['valeo-questions'], 'behavioral-questions', 'Behavioral Questions',
        'Trella = Logistics+Offline+OCR+Arabic+Tracking', 'WebSocket+MLKit+OfflineQueue+BatchSync',
        ['Trella'], 'Medium', 'Critical'),
];
