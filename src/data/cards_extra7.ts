// @ts-nocheck
import type { Card } from '@/types/card';
const mk = (id: string, num: number, title: string, titleAr: string, level: string, freq: string, tags: string[], summary: string, kp: string[], code: string, qs: any[], pre: string[], nid: string, nt: string, hook: string, cheat: string): Card => ({
  id, number: num, title, titleAr, level: level as any, frequency: freq as any, tags,
  definition: { summary, detailed: summary, analogy: '', keyPoints: kp, codeExample: { language: 'dart', code } },
  questions: qs,
  interviewerMind: { whatTheyWant: kp.slice(0, 2), redFlags: ['لا يعرف ' + id], greenFlags: ['يشرح بعمق'] },
  linkedCards: { prerequisites: pre, nextSteps: [{ id: nid, title: nt }], related: [] },
  commonPitfalls: [{ mistake: 'تجنب ' + title, whyWrong: 'ضروري', correctApproach: 'تعلّم ' + title }],
  answerStrategy: { structure: ['تعريف', 'مثال', 'مقارنة'], timeAllocation: { junior: '2 دق', mid: '3 دق', senior: '5 دق' }, keyPhrases: [id] },
  quickRevision: { bulletPoints: kp.slice(0, 4), memoryHook: hook, cheatSheet: cheat }
});

const q = (t: string, q: string, qa: string, d: number, p: string[]) => ({
  type: t as any, question: q, questionAr: qa, difficulty: d, expectedAnswer: { points: p, timeToAnswer: '2-3 minutes' }
});

export const cardsExtra7: Card[] = [
  mk('behavioral-questions', 96, 'Behavioral Interview Questions', 'أسئلة المقابلة السلوكية',
    'Junior', 'Critical', ['Interview Skills', 'Soft Skills'],
    'STAR method for behavioral questions: Situation, Task, Action, Result',
    ['STAR: Situation Task Action Result', 'Common: conflict, failure, success, teamwork', '"Tell me about yourself" = 90-second pitch', 'Growth mindset answers', 'Specific numbers in results', 'Specific hierarchy awareness'],
    `// Structure your answer:
// S: "In my last job at X company..."
// T: "I was responsible for..."
// A: "I decided to / I did..."
// R: "The result was... (with numbers if possible)"

// Common questions:
// - "Tell me about a conflict with a senior developer"
// - "Describe a time you missed a deadline"
// - "What's your biggest technical achievement?"
// - "Why do you want to leave your current job?"`,
    [
      q('Practical', 'Answer: "Tell me about yourself" in 90 seconds', 'أجب: "حدثني عن نفسك" في 90 ثانية', 1, ['Current role + years', 'Key achievement', 'What you want next']),
      q('Practical', 'Answer: "Describe a time you failed"', 'أجب: "اصف وقتاً فشلت فيه"', 2, ['STAR format', 'Take responsibility', 'Lesson learned + how changed']),
      q('Critical Thinking', 'How do you answer "Why are you leaving your current job?"', 'كيف تجيب: "لماذا تترك وظيفتك الحالية؟"', 2, ['Never badmouth employer', 'Growth opportunity focus', 'New challenges framing']),
      q('Practical', 'Answer: "What is your biggest weakness?"', 'أجب: "ما أكبر نقاط ضعفك؟"', 2, ['Real weakness, not "I work too hard"', 'Mitigation strategy', 'Growth progress']),
      q('Theoretical', 'What is the STAR method and why is it effective?', 'ما هو STAR method ولماذا هو فعّال؟', 1, ['Structured storytelling', 'Interviewer understands impact', 'Specific > generic answers'])
    ],
    ['play-store-deploy'], 'salary-negotiation', 'Salary Negotiation',
    'STAR = Story that shows your value', 'Situation→Task→Action→Result | specific numbers | no badmouthing'),

  mk('salary-negotiation', 97, 'Salary Negotiation', 'التفاوض على الراتب',
    'Junior', 'Critical', ['Interview Skills', 'Career'],
    'Salary ranges, negotiation tactics, competing offers, timing',
    ['Junior Flutter: 8,000–15,000 EGP', 'Mid Flutter: 15,000–30,000 EGP', 'Senior Flutter: 30,000–60,000 EGP', 'Remote Global: $2,000–6,000/month', 'Never accept first offer', 'Counter with 20% above desired'],
    `// Negotiation phrases:
// "Based on my research and experience, I was expecting X range"
// "Do you have flexibility in that number?"
// "I have another offer for X, can you match or exceed?"
// "What does the total package include?" (benefits, equity, remote)
// "I need 48 hours to review the offer"

// Market leverage:
// - Mention any international exposure
// - Remote work = significant leverage
// - Ask about annual bonus + transportation
// - Private health insurance value`,
    [
      q('Practical', 'You received 20,000 EGP offer but expected 28,000. How do you negotiate?', 'استلمت عرض 20,000 EGP لكن كنت تتوقع 28,000. كيف تتفاوض؟', 2, ['Counter at 30,000', 'Explain market research', 'Ask about total package']),
      q('Critical Thinking', 'When is the right time to discuss salary?', 'متى الوقت المناسب لمناقشة الراتب؟', 2, ['After they show interest/offer', 'Not in first interview', 'Let them make first offer']),
      q('Practical', 'How do you leverage a competing offer?', 'كيف تستخدم عرض منافس كورقة ضغط؟', 3, ['Be honest about the offer', 'Give deadline to decide', 'Don\'t bluff — be prepared to accept other']),
      q('Theoretical', 'What benefits should you negotiate besides base salary?', 'ما المزايا التي يجب التفاوض عليها بجانب الراتب الأساسي؟', 2, ['Health insurance', 'Annual bonus structure', 'Remote work days', 'Training budget']),
      q('Critical Thinking', 'Should you disclose your current salary?', 'هل تكشف عن راتبك الحالي؟', 2, ['Avoid disclosing', '"I\'m targeting X range based on value"', 'Some companies require it legally'])
    ],
    ['behavioral-questions'], 'portfolio-tips', 'Portfolio Tips',
    'Know your worth, counter high, total package matters', 'Counter +20% | Ask total package | leverage competing offers'),

  mk('portfolio-tips', 98, 'Portfolio & GitHub Tips', 'نصائح البورتفوليو و GitHub',
    'Junior', 'Critical', ['Interview Skills', 'Career'],
    'Building impressive GitHub profile and portfolio for Flutter market',
    ['Pinned repos: 3-5 best projects', 'README with GIFs and features list', 'Clean code with proper architecture', 'Open source contributions', 'Flutter pub.dev packages', 'Technical blog'],
    `// Good README structure:
// # App Name
// > One-line description
// ## Features
// - ✅ Feature 1
// - ✅ Feature 2
// ## Screenshots
// [GIF of main flow]
// ## Tech Stack
// - Flutter 3.x | BLoC | Clean Architecture
// - Supabase | Firebase | Dio
// ## Installation
// ## Architecture
// [Clean Architecture diagram]

// GitHub profile README includes:
// - Current role
// - Tech stack badges
// - GitHub stats`,
    [
      q('Practical', 'What should your top 3 pinned GitHub repos demonstrate?', 'ماذا يجب أن تُظهر أفضل 3 repos مثبتة على GitHub؟', 2, ['Real-world app, not counter/todo', 'Clean architecture', 'Tests and CI/CD badge']),
      q('Practical', 'How do you add a demo GIF to a Flutter project README?', 'كيف تضيف demo GIF لـ README لمشروع Flutter؟', 1, ['flutter screenshot', 'LiceCap/Gifox for recording', 'Host in repo /docs folder']),
      q('Critical Thinking', 'What makes a Flutter portfolio project stand out?', 'ما الذي يجعل portfolio project Flutter متميزًا؟', 3, ['RTL support', 'Payment integration', 'Real problem solved']),
      q('Practical', 'Create a contribution to a popular Flutter package', 'أنشئ contribution لـ Flutter package مشهور', 4, ['Find good-first-issue', 'Fix bug or add test', 'PRs show collaboration skills']),
      q('Theoretical', 'How important is a technical blog for a Flutter developer?', 'ما أهمية المدونة التقنية لمطور Flutter؟', 2, ['Demonstrates expertise', 'Blog is huge differentiator', 'Medium or personal blog'])
    ],
    ['salary-negotiation'], 'resume-writing', 'Resume Writing',
    'Portfolio = proof of work > claims', 'Pinned repos | README+GIF | Architecture'),

  mk('resume-writing', 99, 'Resume Writing for Flutter Devs', 'كتابة السيرة الذاتية لمطوري Flutter',
    'Junior', 'Critical', ['Interview Skills', 'Career'],
    'CV tips, ATS optimization, Flutter-specific skills to highlight',
    ['One page for < 5 years experience', 'ATS: keywords must match job description', 'Impact metrics: "Reduced load time by 60%"', 'Flutter version: always mention', 'Architecture used: Clean/BLoC/Riverpod', 'Companies look for: Arabic, payment integration'],
    `// Resume bullet point formula:
// [Action verb] + [What you did] + [Impact with numbers]

// ❌ Bad: "Worked on mobile app"
// ✅ Good: "Engineered Flutter e-commerce app serving 50K users,
//           reducing crash rate by 85% through Crashlytics optimization"

// ❌ Bad: "Used Flutter and Dart"
// ✅ Good: "Built 5 production apps using Flutter + BLoC + Clean Architecture
//           with 4.7★ average Play Store rating"

// Key sections:
// 1. Contact (LinkedIn + GitHub required)
// 2. Summary (3 lines max, Flutter-focused)
// 3. Experience (reverse chronological, bullets with impact)
// 4. Projects (2-3 with links + tech stack)
// 5. Skills (Flutter, Dart, BLoC, Riverpod, Firebase, CI/CD)`,
    [
      q('Practical', 'Rewrite this weak bullet: "Made the app faster"', 'أعد كتابة هذه النقطة الضعيفة: "جعلت التطبيق أسرع"', 2, ['Add metric: 40% faster load time', 'Add tech: caching + compute()', 'Add scope: 20K users affected']),
      q('Theoretical', 'What Flutter-specific keywords should appear in your CV for ATS?', 'ما الكلمات المفتاحية الخاصة بـ Flutter التي يجب أن تظهر في CV للـ ATS؟', 2, ['Flutter, Dart, BLoC, Riverpod, Provider', 'Firebase, Supabase, REST API, Dio', 'Clean Architecture, SOLID, CI/CD']),
      q('Critical Thinking', 'Should you list every Flutter project on your CV?', 'هل تدرج كل مشاريع Flutter في CV؟', 2, ['No — only 2-3 best ones', 'Tailor to job description', 'Side projects if impressive']),
      q('Practical', 'How many pages should a 3-year Flutter developer\'s CV be?', 'كم صفحة يجب أن تكون CV مطور Flutter بـ 3 سنوات خبرة؟', 1, ['One page maximum', 'Two only for 7+ years', 'Recruiters spend 6-10 seconds on first scan']),
      q('Critical Thinking', 'How do you explain a 6-month employment gap?', 'كيف تشرح فترة توقف 6 أشهر؟', 2, ['Honest and brief', 'Freelance/upskilling/personal', 'Don\'t over-explain or apologize'])
    ],
    ['portfolio-tips'], 'system-design-interview', 'System Design Interview',
    'CV = your first Flutter app — make it impressive', 'Impact bullets: [verb]+[what]+[number] | 1 page | ATS keywords'),

  mk('system-design-interview', 100, 'System Design Interview', 'مقابلة System Design',
    'Senior', 'Very Common', ['Interview Skills', 'Architecture'],
    'How to approach system design: requirements → estimation → design → deep dive',
    ['Clarify requirements first (5 min)', 'Back-of-envelope estimation', 'High-level design: boxes + arrows', 'Deep dive on critical components', 'Trade-offs: SQL vs NoSQL, WS vs polling', 'CAP theorem awareness'],
    `// System design framework:
// 1. CLARIFY (5 min)
//    Ask: Scale? Consistency? Availability?
//    "How many users? Daily active users?"
//    "Is real-time required?"

// 2. ESTIMATE (3 min)
//    Users: 1M, DAU 100K
//    Requests/sec: 100K/86400 = ~1.2 rps avg, 10x peak = 12 rps
//    Storage: 100K events/day × 1KB = 100GB/year

// 3. DESIGN (20 min)
//    Mobile → API Gateway → Services → DB → Cache

// 4. DEEP DIVE (15 min)
//    Focus on bottlenecks
//    How does real-time work?
//    How do you scale the DB?`,
    [
      q('System Design', 'Design a food delivery app backend', 'صمم backend لتطبيق توصيل الطعام', 5, ['Order Service', 'Rider matching', 'Real-time tracking WS', 'Payment integration']),
      q('Practical', 'How do you estimate server capacity for 1M users?', 'كيف تحسب capacity لـ 1M مستخدم؟', 4, ['DAU: 10% = 100K', 'Requests per user per day', 'Peak = 3x average']),
      q('Theoretical', 'What is the CAP theorem?', 'ما هو CAP theorem؟', 4, ['Consistency, Availability, Partition Tolerance', 'Can only guarantee 2 of 3', 'NoSQL often AP, SQL often CP']),
      q('Critical Thinking', 'SQL vs NoSQL for a rental app?', 'SQL مقابل NoSQL لتطبيق إيجار؟', 3, ['SQL: relational, ACID, queries', 'NoSQL: flexible schema, scale', 'Rental = SQL (Supabase/Postgres)']),
      q('System Design', 'Design WhatsApp message delivery system', 'صمم نظام تسليم رسائل مثل WhatsApp', 5, ['WS for real-time', 'Message queue for delivery', 'ACK: sent/delivered/read'])
    ],
    ['resume-writing'], 'coding-tips', 'Coding Interview Tips',
    'System Design = Requirements→Estimate→Design→DeepDive', 'Clarify 5min | Estimate | HLD | Deep Dive | Trade-offs'),

  mk('coding-tips', 101, 'Coding Interview Tips', 'نصائح مقابلة الكود',
    'Junior', 'Critical', ['Interview Skills', 'Algorithms'],
    'LeetCode patterns, thinking aloud, Flutter-specific coding questions',
    ['Think out loud before coding', 'Start with brute force, then optimize', 'Edge cases: empty, negative, overflow', 'Flutter: always mention cleanup in dispose()', 'Pattern recognition: sliding window, two pointers, BFS/DFS', 'Use meaningful variable names even in interview'],
    `// Common Flutter coding patterns in interviews:
// 1. Implement debounce
Timer? _debounce;
void onSearch(String q) {
  _debounce?.cancel();
  _debounce = Timer(Duration(milliseconds: 300), () => search(q));
}

// 2. Implement LRU Cache
class LRUCache {
  final int capacity;
  final _map = LinkedHashMap<int, int>();
  LRUCache(this.capacity);
  int get(int key) { /* move to end on access */ }
  void put(int key, int value) { /* evict if full */ }
}

// 3. Two-pointer for sorted array pairs
List<List<int>> twoPairs(List<int> sorted, int target) {
  int lo = 0, hi = sorted.length - 1;
  final results = <List<int>>[];
  while (lo < hi) {
    final sum = sorted[lo] + sorted[hi];
    if (sum == target) { results.add([lo, hi]); lo++; hi--; }
    else if (sum < target) lo++;
    else hi--;
  }
  return results;
}`,
    [
      q('Practical', 'Implement debounce in Flutter without external packages', 'نفذ debounce في Flutter بدون packages خارجية', 3, ['Timer.cancel() + new Timer', 'Store Timer as class field', 'Cancel in dispose()']),
      q('Practical', 'Write a function to flatten a nested list in Dart', 'اكتب دالة لتسوية قائمة متداخلة في Dart', 3, ['Recursive approach', 'expand() iterative', 'Handle arbitrary depth']),
      q('Theoretical', 'How do you approach a problem you don\'t know how to solve?', 'كيف تتعامل مع مشكلة لا تعرف حلها؟', 2, ['Think aloud', 'Start with brute force', 'Identify pattern, ask clarifying questions']),
      q('Practical', 'Implement a rate limiter that allows 5 requests per minute', 'نفذ rate limiter يسمح بـ 5 طلبات في الدقيقة', 4, ['Queue with timestamps', 'Remove expired timestamps', 'Check count before allowing']),
      q('Critical Thinking', 'Why do companies ask LeetCode questions for Flutter positions?', 'لماذا تسأل الشركات LeetCode لوظائف Flutter؟', 2, ['Proxy for problem-solving ability', 'Tests CS fundamentals', 'Screening at scale'])
    ],
    ['system-design-interview'], 'whiteboard-tips', 'Whiteboard Sessions',
    'Think aloud > silent struggle', 'Brute force first | Edge cases | Optimize step by step | Explain'),

  mk('whiteboard-tips', 102, 'Whiteboard Interview Tips', 'نصائح جلسات Whiteboard',
    'Junior', 'Common', ['Interview Skills'],
    'Communicating design on whiteboard, drawing system diagrams, UML basics',
    ['Start with requirements', 'Draw boxes and arrows clearly', 'Label all connections', 'Think aloud throughout', 'It\'s about communication not perfection', 'Ask if you can use abbreviations'],
    `// Whiteboard tips for Flutter system design:
// ┌─────────────────────────────────────────┐
// │  Flutter App                             │
// │  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
// │  │ BLoC    │  │ Repo    │  │ Model   │ │
// │  └────┬────┘  └───┬─────┘  └─────────┘ │
// └───────┼───────────┼─────────────────────┘
//         │ events    │ data
//         ▼           ▼
//    API Gateway  ──► Firebase/Supabase

// Drawing tips:
// - Circles for services
// - Rectangles for data stores  
// - Arrows labeled with protocol (HTTP, WS, gRPC)
// - User at the left, DB at right`,
    [
      q('Practical', 'Draw the architecture of a Flutter app using Clean Architecture on whiteboard', 'ارسم architecture لتطبيق Flutter بـ Clean Architecture على السبورة', 3, ['3 layers: Presentation/Domain/Data', 'Arrows showing dependency direction', 'UI → BLoC → UseCase → Repo → API']),
      q('Practical', 'Sketch a system design for a ride-sharing app in 10 minutes', 'ارسم system design لتطبيق ride-sharing في 10 دقائق', 4, ['User ↔ API ↔ Driver matching', 'WS for tracking', 'DB for rides']),
      q('Critical Thinking', 'What should you do if you don\'t know how to draw something?', 'ماذا تفعل لو ما عرفتش ترسم حاجة معينة؟', 2, ['Ask clarifying question', 'Say "I\'d represent X as..."', 'Draw abstracted box with label']),
      q('Theoretical', 'What are the key components to always include in a system diagram?', 'ما المكونات الأساسية دايماً في system diagram؟', 2, ['Client', 'API/Gateway', 'Database', 'Cache/Queue (if needed)']),
      q('Practical', 'How do you estimate and communicate when uncertain?', 'كيف تقدّر وتتواصل عند عدم اليقين؟', 2, ['Say "approximately" or rough estimate', 'Explain assumptions', 'Order of magnitude reasoning'])
    ],
    ['coding-tips'], 'take-home-assignments', 'Take-Home Assignments',
    'Whiteboard = communication, not perfection', 'Draw boxes+arrows | Label protocols | Think aloud | Ask questions'),

  mk('take-home-assignments', 103, 'Take-Home Assignments', 'المشاريع المنزلية',
    'Junior', 'Common', ['Interview Skills'],
    'How to ace Flutter take-home projects: architecture, tests, clean code, README',
    ['Use Clean Architecture always', 'Write at least unit tests for business logic', 'Comprehensive README with setup steps', 'Error handling — never let it crash', '1 extra feature beyond requirements = bonus', 'Submit before deadline, even if incomplete'],
    `// Take-home project structure:
// lib/
// ├── core/
// │   ├── error/failures.dart
// │   └── network/dio_client.dart
// ├── features/
// │   └── products/
// │       ├── data/
// │       │   ├── models/product_model.dart
// │       │   └── repositories/product_repo_impl.dart
// │       ├── domain/
// │       │   ├── entities/product.dart
// │       │   ├── repositories/product_repo.dart
// │       │   └── usecases/get_products.dart
// │       └── presentation/
// │           ├── bloc/products_bloc.dart
// │           └── pages/products_page.dart
// test/
// ├── unit/ (bloc tests, usecase tests)
// └── widget/ (UI tests)`,
    [
      q('Practical', 'What architecture should you use for a take-home Flutter project?', 'ما architecture يجب أن تستخدم في مشروع Flutter منزلي؟', 2, ['Clean Architecture', 'BLoC or Riverpod', 'Repository pattern']),
      q('Practical', 'What tests must you include in a take-home project?', 'ما الاختبارات الضرورية في المشروع المنزلي؟', 2, ['BLoC/Cubit unit tests', 'UseCase unit tests', 'Widget test for main screen']),
      q('Critical Thinking', 'The take-home asks for basic features but you have extra time. What do you add?', 'المشروع يطلب features أساسية لكن عندك وقت إضافي. ماذا تضيف؟', 3, ['Dark mode', 'Offline caching', 'Accessibility', 'Animations']),
      q('Practical', 'How do you write a great README for a take-home project?', 'كيف تكتب README ممتاز للمشروع المنزلي؟', 2, ['Setup steps', 'Architecture explanation', 'GIF demo', 'Known limitations']),
      q('Critical Thinking', 'How do you handle a deadline you cannot meet?', 'كيف تتعامل مع deadline لا تستطيع إكماله؟', 2, ['Submit unfinished with explanation', 'Prioritize working > complete', 'Note what you\'d add with more time'])
    ],
    ['whiteboard-tips'], 'clean-architecture', 'Clean Architecture Advanced',
    'Take-home = your best code ever, not fastest', 'CleanArch+BLoC+Tests+README+ErrorHandling'),

  mk('clean-architecture', 104, 'Clean Architecture Advanced', 'Clean Architecture المتقدم',
    'Senior', 'Very Common', ['Architecture', 'Flutter', 'Design Patterns'],
    'Domain-driven design, dependency rule, entities vs models, use case orchestration',
    ['Dependency rule: inner layers ignorant of outer', 'Domain: entities + use cases = business rules', 'Data: models implementing domain contracts', 'Presentation: UI + state management', 'UseCase = single use case per class (SRP)', 'DTOs at layer boundaries'],
    `// Domain layer — pure Dart, no Flutter imports
class Rental {
  final String id;
  final DateTime startDate;
  final DateTime endDate;
  final double price;
  Rental({required this.id, required this.startDate,
          required this.endDate, required this.price});

  bool get isOverdue => DateTime.now().isAfter(endDate);
  Duration get duration => endDate.difference(startDate);
}

// UseCase
class CreateRentalUseCase {
  final RentalRepository _repo;
  final NotificationService _notif;
  CreateRentalUseCase(this._repo, this._notif);

  Future<Either<Failure, Rental>> call(CreateRentalParams p) async {
    final rental = await _repo.create(p);
    await _notif.scheduleReturnReminder(rental);
    return rental;
  }
}`,
    [
      q('Theoretical', 'What is the dependency rule in Clean Architecture?', 'ما هي dependency rule في Clean Architecture؟', 3, ['Dependencies point inward', 'Domain has no knowledge of Data layer', 'Presentation depends on Domain, not vice versa']),
      q('Practical', 'Create a UseCase that creates rental and sends notification', 'أنشئ UseCase يُنشئ إيجاراً ويرسل إشعاراً', 4, ['Single responsibility', 'Call repo + notification service', 'Return Either<Failure, Rental>']),
      q('System Design', 'How do you test Clean Architecture layers independently?', 'كيف تختبر طبقات Clean Architecture بشكل مستقل؟', 4, ['Mock all dependencies', 'UseCase: mock repo, test logic', 'Bloc: mock usecase, test states']),
      q('Critical Thinking', 'Is Clean Architecture overkill for a small app?', 'هل Clean Architecture مبالغة في تطبيق صغير؟', 3, ['Yes for simple apps', 'Overhead in files/classes', 'Scales well as app grows']),
      q('Deep Dive', 'What is the difference between an Entity and a Model?', 'ما الفرق بين Entity وـ Model؟', 3, ['Entity: domain object, no serialization', 'Model: data layer, has fromJson/toJson', 'Model implements entity interface'])
    ],
    ['take-home-assignments'], 'testing-flutter', 'Testing in Flutter',
    'CleanArch: dependencies point inward → Domain is king', 'Domain(Entity+UseCase) | Data(Model+RepoImpl) | Presentation(BLoC)'),

  mk('testing-flutter', 105, 'Testing in Flutter', 'الاختبار في Flutter',
    'Mid', 'Very Common', ['Flutter', 'Testing', 'Quality'],
    'Unit tests, widget tests, integration tests, mockito, golden tests',
    ['Unit: pure Dart logic', 'Widget: renders and interactions', 'Integration: full app flows', 'Mockito for mocking', 'flutter_test for widget testing', 'Golden tests for visual regression'],
    `// Unit test
test('Rental is overdue if endDate passed', () {
  final rental = Rental(
    id: '1',
    startDate: DateTime(2024, 1, 1),
    endDate: DateTime(2024, 1, 7),
    price: 200,
  );
  expect(rental.isOverdue, isTrue);
});

// BLoC test
blocTest<CounterBloc, CounterState>(
  'emits [1] when IncrementEvent added',
  build: () => CounterBloc(),
  act: (bloc) => bloc.add(IncrementEvent()),
  expect: () => [CounterState(count: 1)],
);

// Widget test
testWidgets('shows loading then data', (tester) async {
  await tester.pumpWidget(MyApp());
  expect(find.byType(CircularProgressIndicator), findsOneWidget);
  await tester.pumpAndSettle();
  expect(find.text('Product Name'), findsOneWidget);
});`,
    [
      q('Practical', 'Write a unit test for a BLoC with mocked repository', 'اكتب unit test لـ BLoC مع mocked repository', 3, ['blocTest from bloc_test', 'MockRepository with mockito', 'Test each state transition']),
      q('Theoretical', 'What is the test pyramid and how does it apply to Flutter?', 'ما هو test pyramid وكيف يُطبَّق في Flutter؟', 2, ['Many unit, some widget, few integration', 'Unit cheapest, integration expensive', 'Flutter has all 3 levels']),
      q('Practical', 'How do you mock a Dio HTTP request in tests?', 'كيف تعمل mock لـ Dio HTTP request في الاختبارات؟', 3, ['DioMockAdapter', 'http_mock_adapter package', 'Intercept requests, return fixtures']),
      q('System Design', 'Design a testing strategy for a 10-screen Flutter app', 'صمم testing strategy لتطبيق Flutter بـ 10 شاشات', 4, ['Unit: all business logic', 'Widget: main user flows', 'Integration: critical paths (register, checkout)']),
      q('Deep Dive', 'What is a golden test and when would you use it?', 'ما هو golden test ومتى تستخدمه؟', 4, ['Compares widget renders to reference image', 'Catches unintended UI changes', 'Run with --update-goldens to refresh'])
    ],
    ['clean-architecture'], 'flutter-web', 'Flutter Web',
    'Test pyramid: many unit, some widget, few integration', 'blocTest | testWidgets | pumpAndSettle | mockito | golden'),
];
