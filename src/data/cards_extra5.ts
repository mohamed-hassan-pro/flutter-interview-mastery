// @ts-nocheck
import type { Card } from '@/types/card';

const mk = (id: string, num: number, title: string, titleAr: string, level: string, freq: string, tags: string[], summary: string, detailed: string, analogy: string, kp: string[], code: string, qs: any[], want: string[], red: string[], green: string[], pre: string[], nid: string, nt: string, rel: any[], pit: string, fix: string, hook: string, cheat: string): Card => ({
  id, number: num, title, titleAr, level: level as any, frequency: freq as any, tags,
  definition: { summary, detailed, analogy, keyPoints: kp, codeExample: { language: 'dart', code } },
  questions: qs,
  interviewerMind: { whatTheyWant: want, redFlags: red, greenFlags: green },
  linkedCards: { prerequisites: pre, nextSteps: [{ id: nid, title: nt }], related: rel },
  commonPitfalls: [{ mistake: pit, whyWrong: 'شائع', correctApproach: fix }],
  answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة'], timeAllocation: { junior: '2 دق', mid: '3 دق', senior: '5 دق' }, keyPhrases: [id] },
  quickRevision: { bulletPoints: kp.slice(0, 4), memoryHook: hook, cheatSheet: cheat }
});

const q = (t: string, q: string, qa: string, d: number, p: string[], time = '2-3 دق') => ({
  type: t as any, question: q, questionAr: qa, difficulty: d, expectedAnswer: { points: p, timeToAnswer: time }
});

export const cardsExtra5: Card[] = [
  mk('ci-cd-flutter', 81, 'CI/CD for Flutter', 'CI/CD لـ Flutter',
    'Senior', 'Common', ['Flutter', 'DevOps', 'CI/CD'],
    'Codemagic, GitHub Actions, automated build/test/deploy pipeline',
    'CI/CD automates testing and deployment. Every push triggers tests. Main branch triggers store deployment. Codemagic specializes in Flutter.',
    'CI/CD = factory conveyor belt. Every commit enters: tests → build → sign → deploy. Humans approve final step.',
    ['Codemagic: Flutter-specialized CI', 'GitHub Actions: .github/workflows/', 'Steps: test → build → sign → deploy', 'YAML-based pipeline configuration', 'Secrets management for signing keys', 'Artifact storage for APK/IPA'],
    `# .github/workflows/flutter.yml
name: Flutter CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with: { flutter-version: '3.x' }
      - run: flutter pub get
      - run: flutter test
      - run: flutter analyze

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: flutter build apk --release --split-per-abi
      - uses: actions/upload-artifact@v3
        with: { name: apk, path: build/app/outputs/flutter-apk/ }`,
    [
      q('Practical', 'Write a GitHub Actions workflow for Flutter test + build', 'اكتب GitHub Actions workflow لـ Flutter test + build', 3, ['subosito/flutter-action', 'flutter test', 'flutter build apk --release']),
      q('Theoretical', 'What is the difference between CI and CD?', 'ما الفرق بين CI وـ CD؟', 2, ['CI = auto test on push', 'CD = auto deploy on success']),
      q('System Design', 'Design a multi-environment pipeline (dev/staging/prod)', 'صمم pipeline متعدد البيئات', 4, ['Different signing per env', 'Flavor-based builds', 'Manual gate for prod']),
      q('Practical', 'How do you securely store signing keys in CI?', 'كيف تخزن signing keys بأمان في CI؟', 3, ['GitHub Secrets', 'Base64 encoded keystore', 'Decode at build time']),
      q('Deep Dive', 'How does Codemagic handle iOS code signing automatically?', 'كيف يتعامل Codemagic مع iOS code signing تلقائياً؟', 5, ['Automatic code signing', 'Team ID + Bundle ID', 'Certificates from Apple'])
    ],
    ['يعرف يكتب CI/CD pipeline', 'يعرف secrets management'], ['لا يعرف CI/CD أصلاً', 'يخزن signing keys في code'], ['يشرح multi-environment', 'يذكر Codemagic'],
    ['tensorflow-lite'], 'fastlane-deploy', 'Fastlane Deployment', [],
    'تخزين signing keys مباشرة في الـ repository', 'استخدم GitHub Secrets أو Codemagic environment variables',
    'CI/CD = automated factory for your app', 'GitHub Actions | Codemagic | flutter test | build apk --release'),

  mk('fastlane-deploy', 82, 'Fastlane for Flutter', 'Fastlane في Flutter',
    'Senior', 'Rare', ['Flutter', 'DevOps', 'Deployment'],
    'Fastlane lanes, gym, deliver, match, supply — automating store submissions',
    'Fastlane automates iOS/Android store submissions, code signing, screenshots. Match manages certificates. Supply for Play Store, deliver for App Store.',
    'Fastlane = robot that fills out all your store submission forms. You define the recipe once; robot does the work every time.',
    ['Fastfile: define lanes', 'gym: build iOS IPA', 'deliver: App Store submission', 'supply: Play Store upload', 'match: certificate management', 'pilot: TestFlight upload'],
    `# Fastfile
lane :deploy_android do
  gradle(task: 'bundle', build_type: 'Release',
         project_dir: 'android/')
  supply(
    track: 'internal',
    aab: 'build/app/outputs/bundle/release/app-release.aab',
    json_key: 'play-store-key.json'
  )
end

lane :deploy_ios do
  match(type: 'appstore')
  gym(workspace: 'ios/Runner.xcworkspace', scheme: 'Runner')
  deliver(submit_for_review: false, force: true)
end`,
    [
      q('Practical', 'Create a Fastlane lane that builds and uploads to Play Store internal track', 'أنشئ Fastlane lane للبناء والرفع لـ Play Store internal track', 4, ['gradle task bundle', 'supply with track: internal', 'Service account JSON key']),
      q('Theoretical', 'What does Fastlane match do?', 'ماذا يفعل Fastlane match؟', 3, ['Manages iOS certificates in git repo', 'Team sharing of certificates', 'Encryption with passphrase']),
      q('System Design', 'Design a release pipeline: branch → test → beta → production', 'صمم release pipeline: branch → test → beta → production', 4, ['beta lane for TestFlight/internal', 'production: manual trigger', 'Jira ticket auto-close']),
      q('Deep Dive', 'How does Fastlane supply authenticate with Google Play?', 'كيف يتحقق Fastlane supply من صحة Google Play؟', 4, ['Service account JSON key', 'Google Play Android Developer API', 'OAuth2 service account']),
      q('Critical Thinking', 'When would you use Fastlane vs Codemagic?', 'متى تستخدم Fastlane مقابل Codemagic؟', 3, ['Fastlane: existing iOS/Android expertise', 'Codemagic: Flutter-first, visual UI', 'Team preference and budget'])
    ],
    ['يعرف Fastlane lanes', 'يعرف match و supply'], ['لا يعرف Fastlane', 'يرفع manually للـ store'], ['يشرح match certificates', 'يذكر service account'],
    ['ci-cd-flutter'], 'app-flavors', 'App Flavors & Environments', [],
    'تخزين Play Store key في repo', 'استخدم Fastlane environment variables أو CI secrets',
    'Fastlane = robot store submission', 'lane | gym | deliver | supply | match'),

  mk('app-flavors', 83, 'App Flavors & Environments', 'App Flavors والبيئات',
    'Senior', 'Common', ['Flutter', 'DevOps', 'Architecture'],
    'Flutter flavors for dev/staging/prod, dart-define, environment config',
    'Flavors create different app variants from same codebase. Dev uses mock data, staging uses test API, production uses real servers.',
    'Flavors = the same pizza dough but different toppings. Dev=margherita, Staging=pepperoni, Prod=special.',
    ['flutter run --flavor dev', 'dart-define for config values', 'Separate firebase_options per flavor', 'Different app icons per flavor', 'Build configs: debug/release/profile', 'flavorizr package to automate'],
    `// dart-define approach
// flutter run --dart-define=API_URL=https://dev.api.com

const apiUrl = String.fromEnvironment('API_URL',
  defaultValue: 'https://dev.api.com');

// Flavor config class
class AppConfig {
  static const flavor = String.fromEnvironment('FLAVOR', defaultValue: 'dev');
  static bool get isDev => flavor == 'dev';
  static bool get isProd => flavor == 'prod';
  static String get apiBase => isDev
    ? 'https://dev.api.example.com'
    : 'https://api.example.com';
}`,
    [
      q('Practical', 'Set up three flavors: dev, staging, and production', 'أعدّ ثلاث flavors: dev و staging و production', 4, ['flavorizr or manual setup', 'Separate main.dart per flavor', 'Android: productFlavors, iOS: schemes']),
      q('Theoretical', 'What is the difference between dart-define and flavors?', 'ما الفرق بين dart-define و flavors؟', 3, ['dart-define: pass any value', 'Flavors: native iOS/Android variants', 'Flavors needed for different app IDs/icons']),
      q('Practical', 'Use different Firebase projects for dev and prod', 'استخدم Firebase projects مختلفة لـ dev و prod', 3, ['google-services.json per flavor', 'flutterfire configure --flavor dev']),
      q('System Design', 'Design an architecture that works across all environments', 'صمم architecture تعمل عبر جميع البيئات', 4, ['AppConfig singleton from dart-define', 'Repository pattern abstracts data source', 'Feature flags per environment']),
      q('Critical Thinking', 'Why would you NOT use #if preprocessor for environments in Flutter?', 'لماذا لا تستخدم #if preprocessor للـ environments في Flutter؟', 3, ['Dart has no preprocessor', 'dart-define is the equivalent', 'const String.fromEnvironment evaluated at compile-time'])
    ],
    ['يعرف يعمل flavors', 'يفهم dart-define'], ['يكتب hardcoded URLs', 'لا يعرف flavors'], ['يذكر String.fromEnvironment', 'يشرح different Firebase per flavor'],
    ['fastlane-deploy'], 'app-signing', 'App Signing', [],
    'استخدام URLs hardcoded بدون dart-define', 'استخدم String.fromEnvironment للـ config values دايماً',
    'Flavors = same code, different toppings', '--dart-define=FLAVOR=prod | String.fromEnvironment | AppConfig'),

  mk('app-signing', 84, 'App Signing & Security', 'توقيع التطبيق والأمان',
    'Senior', 'Common', ['Flutter', 'DevOps', 'Security'],
    'Android keystore, iOS certificates, signing configs, Play App Signing',
    'Apps must be signed before distribution. Android uses keystore, iOS uses certificates. Play App Signing stores your key on Google servers.',
    'App signing = official seal on a document. Without the right seal (key), stores reject the app.',
    ['Android: keytool + keystore', 'release signingConfig in build.gradle', 'Play App Signing: Google holds upload key', 'iOS: .p12 + provisioning profile', 'Certificate Signing Request (CSR)', 'Never commit keystore to git'],
    `# Generate Android keystore
# keytool -genkey -v -keystore release.jks -alias release -keyalg RSA -keysize 2048 -validity 10000

# android/app/build.gradle
android {
  signingConfigs {
    release {
      keyAlias keystoreProperties['keyAlias']
      keyPassword keystoreProperties['keyPassword']
      storeFile file(keystoreProperties['storeFile'])
      storePassword keystoreProperties['storePassword']
    }
  }
  buildTypes {
    release { signingConfig signingConfigs.release }
  }
}`,
    [
      q('Practical', 'Create a signing config for Android release build', 'أنشئ signing config لـ Android release build', 3, ['keytool generate keystore', 'key.properties file', 'signingConfigs in build.gradle']),
      q('Theoretical', 'What is Play App Signing and why should you use it?', 'ما هو Play App Signing ولماذا تستخدمه؟', 3, ['Google holds app signing key', 'Upload key separate from app key', 'Protects against lost keystore']),
      q('Practical', 'How do you secure your keystore in a CI/CD environment?', 'كيف تؤمّن keystore في بيئة CI/CD؟', 3, ['Base64 encode keystore', 'Store in CI secrets', 'Decode at build time']),
      q('System Design', 'Design a signing workflow for a team of 5 developers', 'صمم workflow للتوقيع لفريق من 5 مطورين', 4, ['Only CI signs release', 'Dev machines use debug key', 'Fastlane match for iOS']),
      q('Deep Dive', 'What happens if you lose your Android keystore?', 'ماذا يحدث لو فقدت Android keystore؟', 3, ['Cannot update app on Play Store', 'Must publish new app with new package name', 'Play App Signing mitigates this'])
    ],
    ['يعرف keystore setup', 'يعرف Play App Signing'], ['يكتب keystore في git', 'لا يعرف Play App Signing'], ['يشرح إيه يحصل لو اتفقدت الـ key', 'يذكر key.properties'],
    ['app-flavors'], 'analytics-crashlytics', 'Analytics & Crashlytics', [],
    'commit keystore في git repo', 'خزّن في key.properties خارج git + استخدم CI secrets',
    'Keystore = digital wax seal for your app', 'keytool | key.properties | signingConfig | Play App Signing'),

  mk('analytics-crashlytics', 85, 'Analytics & Crashlytics', 'التحليلات وـ Crashlytics',
    'Mid', 'Common', ['Flutter', 'DevOps', 'Analytics'],
    'Firebase Analytics, Crashlytics, custom events, crash reports, BigQuery export',
    'Analytics tracks user behavior. Crashlytics catches crashes and errors. Together they give full picture of app quality.',
    'Analytics = security cameras in a store. Crashlytics = fire alarm. Analytics shows behavior, Crashlytics alerts on problems.',
    ['Firebase Analytics: automatic + custom events', 'Crashlytics: real-time crash reporting', 'logEvent() for custom events', 'setUserProperties() for segmentation', 'Non-fatal errors: recordError()', 'BigQuery export for advanced analysis'],
    `// Analytics
import 'package:firebase_analytics/firebase_analytics.dart';

final analytics = FirebaseAnalytics.instance;

await analytics.logEvent(
  name: 'dress_rented',
  parameters: {'dress_id': dress.id, 'price': dress.price, 'city': 'Cairo'},
);

await analytics.setUserProperty(name: 'user_tier', value: 'premium');

// Crashlytics
import 'package:firebase_crashlytics/firebase_crashlytics.dart';

FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;

// Non-fatal
try { await riskyOperation(); }
catch (e, stack) {
  FirebaseCrashlytics.instance.recordError(e, stack, fatal: false);
}`,
    [
      q('Practical', 'Set up Crashlytics to catch all Flutter errors', 'أعدّ Crashlytics لالتقاط جميع أخطاء Flutter', 2, ['FlutterError.onError = Crashlytics.recordFlutterFatalError', 'PlatformDispatcher.onError for async']),
      q('Practical', 'Track a conversion event when user completes rental', 'تتبّع conversion event عند إتمام الإيجار', 2, ['analytics.logEvent name: rental_completed', 'Add relevant parameters']),
      q('Theoretical', 'What is the difference between a fatal and non-fatal error in Crashlytics?', 'ما الفرق بين fatal و non-fatal error في Crashlytics؟', 2, ['Fatal: app crash', 'Non-fatal: caught exception, app continues']),
      q('System Design', 'Design analytics plan for a dress rental app', 'صمم خطة analytics لتطبيق إيجار فساتين', 4, ['Key events: register, browse, rent, return', 'Funnels: browse→detail→book', 'Retention: D1, D7, D30']),
      q('Deep Dive', 'How does Crashlytics symbolicate stack traces?', 'كيف يفك Crashlytics تشفير stack traces؟', 4, ['dSYM files for iOS', 'Proguard/R8 mapping for Android', 'Upload symbols in CI pipeline'])
    ],
    ['يعرف Firebase Analytics + Crashlytics', 'يكتب meaningful events'], ['لا يضيف custom events', 'يعتمد فقط على auto-events'], ['يشرح fatal vs non-fatal', 'يذكر BigQuery export'],
    ['app-signing'], 'sqlite-drift', 'SQLite & Drift', [],
    'إهمال non-fatal errors', 'دايماً log non-fatal errors في catch blocks',
    'Analytics=cameras, Crashlytics=fire alarm', 'logEvent | recordError | FlutterError.onError | setUserProperty'),

  mk('sqlite-drift', 86, 'SQLite & Drift ORM', 'SQLite و Drift ORM',
    'Mid', 'Common', ['Flutter', 'Storage', 'Backend'],
    'sqflite for raw SQL, Drift for type-safe ORM with migrations',
    'SQLite for complex relational data. Drift provides type-safe queries, migrations, and streams. Better than Hive for relational data.',
    'SQLite = Excel spreadsheet locally. Drift = Excel with autocomplete and formula checking.',
    ['sqflite: raw SQL dart package', 'Drift: type-safe ORM for SQLite', '@DriftDatabase annotation', 'Tables and DataClasses generated', 'Migrations: MigrationStrategy', 'Stream queries for real-time'],
    `// Drift ORM
@DriftDatabase(tables: [Dresses, Customers, Rentals])
class AppDatabase extends _\$AppDatabase {
  AppDatabase() : super(NativeDatabase.createInBackground(File(dbPath)));

  @override
  int get schemaVersion => 2;

  @override
  MigrationStrategy get migration => MigrationStrategy(
    onUpgrade: (m, from, to) async {
      if (from < 2) await m.addColumn(rentals, rentals.notes);
    }
  );

  Future<List<Rental>> getActiveRentals() =>
    (select(rentals)..where((r) => r.returnDate.isNull())).get();

  Stream<List<Dress>> watchAvailableDresses() =>
    (select(dresses)..where((d) => d.available.equals(true))).watch();
}`,
    [
      q('Practical', 'Create a Drift table for rental records with foreign keys', 'أنشئ Drift table لسجلات الإيجار مع foreign keys', 4, ['@DataClassName annotation', 'IntColumn().references(Customers, #id)', 'Generated DataClass']),
      q('Theoretical', 'What is the difference between sqflite and Drift?', 'ما الفرق بين sqflite و Drift؟', 2, ['sqflite: raw SQL, manual parsing', 'Drift: type-safe, ORM, streams, migrations']),
      q('Practical', 'Write a migration that adds a column to an existing table', 'اكتب migration يضيف column لـ table موجود', 3, ['schemaVersion++', 'MigrationStrategy onUpgrade', 'm.addColumn(table, column)']),
      q('System Design', 'Design local DB schema for offline rental management app', 'صمم local DB schema لتطبيق إيجار offline', 4, ['Tables: Customers, Dresses, Rentals', 'Foreign keys with cascade', 'Indexed columns for frequent queries']),
      q('Deep Dive', 'How does Drift provide type-safe query results?', 'كيف يوفر Drift نتائج queries آمنة من حيث الأنواع؟', 4, ['build_runner generates typed classes', 'Compile-time column verification', 'No raw maps in result'])
    ],
    ['يعرف Drift ORM', 'يكتب migrations صح'], ['يستخدم raw sqflite بدون Drift', 'ينسى schemaVersion++'], ['يشرح generated code', 'يذكر stream queries'],
    ['analytics-crashlytics'], 'play-store-deploy', 'Play Store & App Store', [],
    'نسيان زيادة schemaVersion مع كل migration', 'schemaVersion++ مع كل تعديل على الـ schema',
    'Drift = type-safe SQLite with migrations', '@DriftDatabase | MigrationStrategy | watch() | schemaVersion'),

  mk('play-store-deploy', 87, 'Play Store & App Store Deployment', 'النشر على المتاجر',
    'Mid', 'Common', ['Flutter', 'DevOps', 'Deployment'],
    'Release tracks, app bundles, age ratings, store listing, review process',
    'Play Store uses tracks (internal→alpha→beta→production). App Store uses TestFlight→Review→Production. Always use AAB for Play Store.',
    'Store deployment = publishing a book. Internal = your desk. Alpha/Beta = friends review. Production = bookstore shelf.',
    ['AAB: Android App Bundle (not APK for production)', 'Internal → Closed Testing → Open Testing → Production', 'App Store Connect + TestFlight', 'Age rating questionnaire', 'Store listing: screenshots, description, keywords', 'Review time: iOS 1-2 days, Android hours'],
    `# Build for Play Store
flutter build appbundle --release

# Build APK for testing
flutter build apk --split-per-abi --release

# iOS App Store
flutter build ipa --release

# Version management in pubspec.yaml
version: 1.2.0+5  # versionName+versionCode`,
    [
      q('Theoretical', 'Why does Google recommend AAB over APK for production?', 'لماذا توصي Google بـ AAB بدل APK للـ production؟', 2, ['Smaller download size per device', 'Google optimizes per device config', 'Split APKs generated dynamically']),
      q('Practical', 'What is the correct track progression for a new release?', 'ما التسلسل الصحيح للـ tracks في إصدار جديد؟', 2, ['Internal → Closed Testing → Open Testing → Production']),
      q('Practical', 'How do you bump the version code for a hotfix release?', 'كيف ترفع version code لإصدار hotfix؟', 2, ['Increment versionCode: +5 → +6', 'Keep versionName same or patch bump', 'pubspec.yaml: 1.0.1+6']),
      q('System Design', 'Design a release process for a teammanaged Flutter app', 'صمم release process لتطبيق Flutter يديره فريق', 4, ['Git tags for releases', 'Changelogs per version', 'Staged rollout percentages']),
      q('Critical Thinking', 'How do you handle a critical bug found after production release?', 'كيف تتعامل مع bug حرج اُكتشف بعد إصدار production؟', 3, ['Halt rollout if staged', 'Create hotfix branch', 'Fast-track review for critical bugs'])
    ],
    ['يعرف AAB vs APK', 'يعرف الـ track system'], ['يرفع APK للـ Play Store', 'لا يعرف TestFlight'], ['يشرح staged rollout', 'يذكر version code المنفصل'],
    ['sqlite-drift'], 'behavioral-questions', 'Behavioral Interview Questions', [],
    'رفع APK بدل AAB للـ Play Store', 'دايماً استخدم flutter build appbundle للـ production',
    'AAB=right way, APK=testing only', 'flutter build appbundle | flutter build ipa | version: x.x.x+n'),
];
