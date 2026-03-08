// @ts-nocheck
import type { Card } from '@/types/card';

const mk = (id: string, num: number, title: string, titleAr: string, level: string, freq: string, tags: string[], summary: string, detailed: string, analogy: string, keyPoints: string[], code: string, qs: any[], want: string[], red: string[], green: string[], prereq: string[], nid: string, ntitle: string, rel: any[], pitfall: string, fix: string, hook: string, cheat: string): Card => ({
  id, number: num, title, titleAr, level: level as any, frequency: freq as any, tags,
  definition: { summary, detailed, analogy, keyPoints, codeExample: { language: 'dart', code } },
  questions: qs,
  interviewerMind: { whatTheyWant: want, redFlags: red, greenFlags: green },
  linkedCards: { prerequisites: prereq, nextSteps: [{ id: nid, title: ntitle }], related: rel },
  commonPitfalls: [{ mistake: pitfall, whyWrong: 'أخطأ شائع', correctApproach: fix }],
  answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة'], timeAllocation: { junior: '2-3 دق', mid: '3-4 دق', senior: '5 دق' }, keyPhrases: [id] },
  quickRevision: { bulletPoints: keyPoints.slice(0, 4), memoryHook: hook, cheatSheet: cheat }
});

const q = (type: string, question: string, questionAr: string, difficulty: number, points: string[], time: string = '2-3 minutes') => ({
  type: type as any, question, questionAr, difficulty, expectedAnswer: { points, timeToAnswer: time }
});

export const cardsExtra4: Card[] = [
  mk('push-notifications', 76, 'Push Notifications', 'إشعارات Push',
    'Mid', 'Very Common', ['Flutter', 'Firebase', 'Backend'],
    'FCM, flutter_local_notifications, background handlers, notification channels',
    'FCM delivers messages to devices. flutter_local_notifications shows local alerts. Handle foreground, background, and terminated states differently.',
    'Push notifications = postal service. FCM = postal HQ routing. flutter_local_notifications = the mailbox display.',
    ['FCM: Firebase Cloud Messaging', 'flutter_local_notifications: local display', 'FirebaseMessaging.onMessage: foreground', 'onMessageOpenedApp: background tap', 'getInitialMessage: terminated state', 'Notification channels (Android 8+)'],
    `// Setup in main.dart
await Firebase.initializeApp();
FirebaseMessaging.onBackgroundMessage(_bgHandler);

@pragma('vm:entry-point')
Future<void> _bgHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print('Background: \${message.notification?.title}');
}

// Foreground
FirebaseMessaging.onMessage.listen((message) {
  showLocalNotification(message.notification!);
});

// Notification channel (Android)
const channel = AndroidNotificationChannel(
  'high_importance', 'High Importance',
  importance: Importance.high,
);`,
    [
      q('Practical', 'How do you handle push notifications in all three app states?', 'كيف تتعامل مع Push Notifications في الحالات الثلاث للتطبيق؟', 3, ['Foreground: onMessage', 'Background: onMessageOpenedApp', 'Terminated: getInitialMessage()']),
      q('Theoretical', 'What is the difference between data messages and notification messages in FCM?', 'ما الفرق بين data messages و notification messages في FCM؟', 3, ['Notification: shown automatically by OS', 'Data: handled by app code', 'Both together: notification shows, data in extras']),
      q('Practical', 'Add deep link from a notification tap to a specific screen', 'أضف deep link من الـ notification لشاشة معينة', 3, ['Store route in data payload', 'Handle in onMessageOpenedApp', 'Navigate to route']),
      q('System Design', 'Design a notification system for rental due dates', 'صمم نظام إشعارات لمواعيد الإيجار المستحقة', 4, ['Cloud Functions scheduler', 'FCM send to specific device token', 'Local notification as fallback']),
      q('Deep Dive', 'Why must background message handler be a top-level function?', 'لماذا يجب أن يكون background handler دالة top-level؟', 4, ['@pragma vm:entry-point', 'Separate isolate runs it', 'No access to app state'])
    ],
    ['يعرف الحالات الثلاث', 'يعرف notification channels'], ['يتجاهل terminated state', 'لا يعرف background handler isolate'], ['يذكر @pragma vm:entry-point', 'يشرح notification channels'],
    ['firebase-flutter'], 'background-tasks', 'Background Tasks', [],
    'نسيان @pragma vm:entry-point على background handler', 'دايماً أضف @pragma للـ top-level background handler',
    'FCM=postal HQ, local_notif=mailbox display', 'onMessage|onMessageOpenedApp|getInitialMessage|channels'),

  mk('background-tasks', 77, 'Background Tasks in Flutter', 'المهام الخلفية في Flutter',
    'Senior', 'Common', ['Flutter', 'Performance', 'Backend'],
    'workmanager, flutter_background_service, isolates for long-running tasks',
    'Flutter apps can run background tasks for sync, uploads, periodic refresh. workmanager for scheduled tasks, flutter_background_service for long-running.',
    'Background tasks = kitchen prep staff working overnight. App is closed but work continues.',
    ['workmanager: periodic/one-off tasks', 'flutter_background_service: long-running foreground service', 'Constraints: network, charging, battery-not-low', 'Isolates for computation', 'Android: WorkManager, iOS: BGAppRefreshTask', 'Foreground service for critical tasks'],
    `// workmanager setup
void callbackDispatcher() {
  Workmanager().executeTask((task, data) async {
    if (task == 'syncRentals') await syncWithServer();
    return Future.value(true);
  });
}

void main() async {
  await Workmanager().initialize(callbackDispatcher, isInDebugMode: false);
  await Workmanager().registerPeriodicTask(
    'syncTask', 'syncRentals',
    frequency: Duration(hours: 12),
    constraints: Constraints(networkType: NetworkType.connected),
  );
}`,
    [
      q('Practical', 'Schedule a periodic sync task with workmanager', 'جدول مهمة sync دورية بـ workmanager', 3, ['registerPeriodicTask', 'callbackDispatcher top-level', 'Network constraint']),
      q('Theoretical', 'What are the differences between background tasks on iOS vs Android?', 'ما الفروق في background tasks بين iOS و Android؟', 4, ['iOS: stricter BGAppRefreshTask', 'Android: WorkManager more flexible', 'iOS: max 30s background time']),
      q('System Design', 'Design a reliable offline sync that works in the background', 'صمم offline sync موثوق يعمل في الخلفية', 5, ['workmanager periodic task', 'Local queue of pending operations', 'Retry on failure']),
      q('Deep Dive', 'How does workmanager communicate with the Flutter engine?', 'كيف يتواصل workmanager مع Flutter engine؟', 4, ['callbackDispatcher spawns new isolate', 'New Flutter engine instance', 'dart:ui headless']),
      q('Critical Thinking', 'When should you use a foreground service vs background task?', 'متى تستخدم foreground service مقابل background task؟', 3, ['Foreground: music, tracking, calls (user-visible)', 'Background: sync, cleanup (hidden)'])
    ],
    ['يعرف workmanager', 'يفهم iOS vs Android constraints'], ['يظن background tasks مجانية', 'لا يعرف iOS restrictions'], ['يذكر constraints', 'يشرح isolate spawning'],
    ['push-notifications'], 'image-caching', 'Image Caching', [],
    'تشغيل heavy work في background بدون constraints', 'دايماً حدد NetworkType و battery constraints',
    'Background = kitchen at night, app = closed restaurant', 'workmanager.registerPeriodicTask | Constraints | callbackDispatcher'),

  mk('image-caching', 78, 'Image Caching in Flutter', 'تخزين الصور في Flutter',
    'Junior', 'Common', ['Flutter', 'Performance', 'UI'],
    'cached_network_image, ImageCache, cacheWidth/cacheHeight, precacheImage',
    'Image caching prevents re-downloading images. cached_network_image adds disk cache. ImageCache controls memory cache. cacheWidth reduces memory.',
    'Image caching = keeping your favorite magazine in a drawer instead of buying it every time.',
    ['cached_network_image: disk + memory', 'CachedNetworkImage with placeholder/error', 'imageCache.maximumSizeBytes: 100MB default', 'cacheWidth/cacheHeight: resize in memory', 'precacheImage() for preloading', 'Image.network with error builder'],
    `// cached_network_image
CachedNetworkImage(
  imageUrl: product.imageUrl,
  placeholder: (ctx, url) => ShimmerPlaceholder(),
  errorWidget: (ctx, url, e) => Icon(Icons.broken_image),
  cacheKey: '\${product.id}_v\${product.version}',
  memCacheWidth: 300, // resize in memory
)

// Configure cache size
PaintingBinding.instance.imageCache
  ..maximumSize = 200 // 200 items
  ..maximumSizeBytes = 200 * 1024 * 1024; // 200 MB

// Preload
await precacheImage(NetworkImage(url), context);`,
    [
      q('Practical', 'Add a shimmer placeholder to a product image', 'أضف shimmer placeholder لصورة منتج', 2, ['CachedNetworkImage + placeholder builder', 'shimmer package or custom shimmer']),
      q('Theoretical', 'What is the difference between memory cache and disk cache for images?', 'ما الفرق بين memory cache و disk cache للصور؟', 2, ['Memory: fast, lost on app kill', 'Disk: slower, persists across sessions']),
      q('Practical', 'Reduce memory usage for a grid of 100 high-res images', 'قلّل استخدام الذاكرة لشبكة من 100 صورة عالية الدقة', 3, ['cacheWidth: screen pixel size', 'ListView.builder: only render visible', 'Evict offscreen']),
      q('System Design', 'Design a product gallery that loads 1000 images efficiently', 'صمم معرض منتجات يحمّل 1000 صورة بكفاءة', 4, ['ListView.builder', 'CachedNetworkImage with cacheKey', 'Thumbnail vs full-res by route']),
      q('Deep Dive', 'How does Flutter\'s ImageCache eviction work?', 'كيف يعمل eviction في Flutter\'s ImageCache؟', 4, ['LRU eviction when max size hit', 'maximumSize items OR maximumSizeBytes', 'Live images not evicted (in use)'])
    ],
    ['يستخدم cached_network_image', 'يعرف cacheWidth trick'], ['يستخدم Image.network مجردة', 'لا يعرف آلية الـ eviction'], ['يذكر cacheWidth', 'يفكر في LRU eviction'],
    ['background-tasks'], 'mlkit-flutter', 'ML Kit Integration', [],
    'إهمال cacheWidth مع صور عالية الدقة', 'دايماً حدد memCacheWidth/Height لتوفير الذاكرة',
    'Image cache = magazine drawer, not buying twice', 'CachedNetworkImage | cacheWidth | precacheImage | maximumSizeBytes'),

  mk('mlkit-flutter', 79, 'ML Kit Integration', 'تكامل ML Kit',
    'Senior', 'Rare', ['Flutter', 'AI/ML', 'Mobile'],
    'google_mlkit_* packages: text recognition, face detection, barcode scanning',
    'ML Kit provides on-device ML. Flutter has google_mlkit_* packages for text recognition, barcode scanning, face detection, pose estimation.',
    'ML Kit = smartphone brain. On-device = private detective who works locally, not sending data to HQ.',
    ['On-device: private, fast, offline', 'Text recognition: receipt scanning', 'Barcode: QR codes', 'Face detection: attendance systems', 'Pose estimation: fitness apps', 'No internet required'],
    `import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';

final textRecognizer = TextRecognizer(script: TextRecognitionScript.latin);

Future<String> recognizeText(String imagePath) async {
  final inputImage = InputImage.fromFilePath(imagePath);
  final recognized = await textRecognizer.processImage(inputImage);
  textRecognizer.close(); // important!
  return recognized.text;
}

// Barcode scanning
final barcodeScanner = BarcodeScanner();
Future<List<String>> scanBarcodes(InputImage image) async {
  final barcodes = await barcodeScanner.processImage(image);
  return barcodes.map((b) => b.displayValue ?? '').toList();
}`,
    [
      q('Practical', 'Implement receipt text scanning using ML Kit', 'نفذ مسح نصوص الفواتير بـ ML Kit', 3, ['TextRecognizer', 'InputImage.fromFilePath', 'recognized.text']),
      q('Theoretical', 'What are the advantages of on-device ML over server-side?', 'ما مزايا on-device ML على ML في السيرفر؟', 2, ['Privacy: no data uploaded', 'Works offline', 'Faster: no network latency']),
      q('Practical', 'Build a QR code scanner for product lookup', 'ابنِ QR code scanner لعمليات البحث عن المنتجات', 3, ['BarcodeScanner', 'camera package for live scan', 'Navigate on success']),
      q('System Design', 'Design an attendance system using face detection', 'صمم نظام حضور بـ face detection', 5, ['ML Kit face detection', 'Compare with stored embeddings', 'Local first, sync later']),
      q('Deep Dive', 'How does ML Kit run models on the device?', 'كيف يشغّل ML Kit النماذج على الجهاز؟', 5, ['TFLite or custom models', 'GPU delegation for acceleration', 'Model bundled in app or downloaded'])
    ],
    ['يعرف google_mlkit packages', 'يستخدم on-device بشكل صحيح'], ['لا يعرف ML Kit أصلاً', 'ينسى close() على recognizer'], ['يذكر on-device advantages', 'يشرح GPU delegation'],
    ['image-caching'], 'tensorflow-lite', 'TensorFlow Lite', [],
    'نسيان close() على ML Kit recognizer', 'دايماً close() بعد الاستخدام لتحرير resources',
    'ML Kit = on-device AI assistant', 'TextRecognizer | BarcodeScanner | InputImage | close()'),

  mk('tensorflow-lite', 80, 'TensorFlow Lite in Flutter', 'TensorFlow Lite في Flutter',
    'Senior', 'Rare', ['Flutter', 'AI/ML', 'Performance'],
    'tflite_flutter package, model loading, interpreter, input/output tensors',
    'TFLite runs custom ML models on-device. tflite_flutter package for Dart. Models from TF Hub or custom trained.',
    'TFLite = bringing your own chef to cook locally. The chef (model) works offline using your kitchen (device GPU/CPU).',
    ['tflite_flutter: Dart binding', 'Interpreter: loads .tflite model', 'Input/output tensors', 'GPU delegate for acceleration', 'Model quantization for size/speed', 'tensorflow_serving for server-side'],
    `import 'package:tflite_flutter/tflite_flutter.dart';

class ObjectClassifier {
  late Interpreter _interpreter;

  Future<void> load() async {
    _interpreter = await Interpreter.fromAsset('model.tflite');
  }

  List<dynamic> classify(List<List<List<double>>> input) {
    final output = List.filled(1 * 1001, 0).reshape([1, 1001]);
    _interpreter.run(input, output);
    return output;
  }

  void dispose() => _interpreter.close();
}`,
    [
      q('Practical', 'Load and run a TFLite image classification model', 'حمّل وشغّل TFLite model للتصنيف', 4, ['Interpreter.fromAsset', 'Preprocess image to tensor', 'Run and parse output']),
      q('Theoretical', 'What is model quantization and why is it important for mobile?', 'ما هو model quantization ولماذا هو مهم للجوال؟', 4, ['Reduce model size: float32→int8', 'Faster inference', 'Slight accuracy trade-off']),
      q('System Design', 'Design a plant disease detection app using TFLite', 'صمم تطبيق كشف أمراض النباتات بـ TFLite', 5, ['Custom TFLite model', 'Camera for input', 'Inference in isolate', 'Display confidence score']),
      q('Deep Dive', 'What is GPU delegation in TFLite and when does it help?', 'ما هو GPU delegation في TFLite ومتى يفيد؟', 5, ['GpuDelegate: runs on GPU', '3-5x faster for image models', 'Not all ops supported on GPU']),
      q('Critical Thinking', 'When to use TFLite vs ML Kit vs server-side ML?', 'متى تستخدم TFLite مقابل ML Kit مقابل server-side ML؟', 4, ['TFLite: custom models offline', 'ML Kit: standard tasks easy', 'Server: large models, high accuracy needed'])
    ],
    ['يعرف كيف يدير نموذج TFLite', 'يستخدم GPU delegate'], ['لا يعرف TFLite أصلاً', 'ينسى interpreter.close()'], ['يذكر quantization', 'يشرح GPU delegation'],
    ['mlkit-flutter'], 'ci-cd-flutter', 'CI/CD for Flutter', [],
    'تشغيل inference على الـ main thread', 'دايماً استخدم compute() أو isolate للـ inference',
    'TFLite = your own AI chef on-device', 'Interpreter.fromAsset | input tensor | GpuDelegate | close()'),
];
