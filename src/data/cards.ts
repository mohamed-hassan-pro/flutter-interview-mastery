// @ts-nocheck
import type { Card } from '@/types/card';

export const cards: Card[] = [
  // ==================== LEVEL 1: DART FOUNDATION (1-15) ====================

  // CARD 1
  {
    id: "null-safety-master",
    number: 1,
    title: "Null Safety Master",
    titleAr: "إتقان Null Safety",
    level: "Junior",
    frequency: "Critical",
    tags: ["Dart", "Flutter", "OOP"],
    definition: {
      summary: "Null Safety في Dart هو نظام نوع يمنع الأخطاء الناتجة عن القيم الفارغة في وقت التشغيل",
      detailed: "Null Safety يعني أن المتغيرات لا يمكن أن تكون null إلا إذا سمحت بذلك صراحة باستخدام علامة الاستفهام (?). هذا يمنع crashes الناتجة عن null pointer exceptions ويحسن الأداء.",
      analogy: "تخيل أنك في مطعم: الطبق (المتغير) إما يحتوي على أكل (قيمة) أو يكون فارغ (null). Null Safety بتقولك: 'لو الطبق ممكن يكون فارغ، قولي من الأول عشان أحط علامة عليه'",
      keyPoints: [
        "? تعني nullable (ممكن يكون null)",
        "! تعني non-null assertion (أنا متأكد مش null)",
        "late للتأخير في التهيئة",
        "required للباراميترات المطلوبة في constructors",
        "?? للقيم الافتراضية",
        "?. للوصول الآمن للخصائص"
      ],
      codeExample: {
        language: "dart",
        code: `// ❌ Before Null Safety
String name = null; // Error!
int length = name.length; // Crash!

// ✅ After Null Safety
String? name = null; // Nullable
String name2 = 'Ali'; // Non-nullable

// Safe access
print(name?.length ?? 0); // 0 if null

// Late initialization
late String config;
void init() {
  config = loadConfig();
}

// Required parameter
class User {
  final String name;
  User({required this.name});
}`
      }
    },
    architectureLinks: { solid: ["D"], patterns: [], principles: ["Defensive Programming"] },
    questions: [
      {
        type: "Theoretical",
        question: "What is Null Safety and why was it introduced in Dart 2.12?",
        questionAr: "ما هو Null Safety ولماذا تم تقديمه في Dart 2.12؟",
        difficulty: 2,
        expectedAnswer: {
          points: ["نظام نوع يمنع null errors في compile time", "يحسن الأداء", "يقلل crashes بنسبة 80%"],
          timeToAnswer: "1-2 minutes"
        }
      },
      {
        type: "Practical",
        question: "Convert this pre-null-safety code to null-safe Dart",
        difficulty: 3,
        expectedAnswer: {
          codeExample: {
            before: `class User {
  String name;
  int age;
  User({this.name, this.age});
}`,
            after: `class User {
  final String? name;
  final int? age;
  User({this.name, this.age});
}`
          }
        }
      },
      {
        type: "System Design",
        question: "Design a UserProfile system that handles optional fields",
        difficulty: 4
      },
      {
        type: "Critical Thinking",
        question: "When should you use 'late' vs nullable with '?'?",
        difficulty: 3
      },
      {
        type: "Deep Dive",
        question: "How does Dart's null safety work at the VM level?",
        difficulty: 5
      }
    ],
    interviewerMind: {
      whatTheyWant: ["يفهم compile time vs runtime", "يعرف يستخدم ?, !, late, required"],
      redFlags: ["يستخدم ! بكثرة", "يخلط بين late و nullable"],
      greenFlags: ["يشرح migration strategy", "يذكر sound null safety"]
    },
    linkedCards: {
      prerequisites: [],
      nextSteps: [{ id: "variables-deep-dive", title: "Variables Deep Dive" }],
      related: [{ id: "error-handling", title: "Error Handling" }]
    },
    commonPitfalls: [
      {
        mistake: "استخدام ! في كل مكان",
        whyWrong: "بيرجعنا لعصر ما قبل null safety",
        correctApproach: "استخدم ?. و ??",
        egyptianContext: "شائع في شركات Enterprise زي ITWorx"
      }
    ],
    answerStrategy: {
      structure: ["تعريف", "فوائد", "أمثلة", "trade-offs"],
      timeAllocation: { junior: "2-3 دق", mid: "3-4 دق", senior: "5 دق" },
      keyPhrases: ["sound null safety", "compile-time guarantee"]
    },
    quickRevision: {
      bulletPoints: ["? = nullable", "! = assertion", "late = init later", "required = must provide"],
      memoryHook: "علامة الاستفهام = 'ممكن'، العلامة العجب = 'متأكد!'",
      cheatSheet: "String? = nullable | String = non-null | late = init later"
    },
    companyTags: ["Swvl", "MaxAB", "ITWorx", "Valeo", "Thndr"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 2
  {
    id: "variables-deep-dive",
    number: 2,
    title: "Variables Deep Dive",
    titleAr: "المتغيرات بعمق",
    level: "Junior",
    frequency: "Very Common",
    tags: ["Dart", "OOP"],
    definition: {
      summary: "فهم الفروق بين final, const, var, dynamic, Object?",
      detailed: "final للقيم الثابتة في runtime، const للـ compile-time constants، var للـ type inference، dynamic للـ dynamic typing (avoid)، Object? لأي نوع.",
      analogy: "final = صندوق مقفل | const = صندوق محفور في الحجر | var = صندوق بيتغير شكله",
      keyPoints: ["final: runtime constant", "const: compile-time, canonicalized", "var: type inference", "dynamic: runtime checking (avoid)", "Object?: any type + nullable"],
      codeExample: {
        language: "dart",
        code: `final now = DateTime.now(); // OK
const pi = 3.14; // OK
// const now = DateTime.now(); // Error!

var name = 'Ali'; // inferred String
dynamic x = 42;
x = 'string'; // OK, but risky`
      }
    },
    questions: [
      { type: "Theoretical", question: "Difference between final and const?", difficulty: 2 },
      { type: "Practical", question: "When to use var vs explicit type?", difficulty: 2 },
      { type: "Deep Dive", question: "How does const affect memory?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم final vs const"], redFlags: ["يستخدم dynamic بكثرة"], greenFlags: ["يشرح canonicalization"] },
    linkedCards: { prerequisites: ["null-safety-master"], nextSteps: [{ id: "functions-advanced", title: "Functions Advanced" }], related: [] },
    commonPitfalls: [{ mistake: "استخدام const مع DateTime.now()", whyWrong: "const لازم compile-time value", correctApproach: "استخدم final", egyptianContext: "شائع في المقابلات" }],
    quickRevision: { bulletPoints: ["final = runtime", "const = compile", "var = inferred", "dynamic = avoid"], memoryHook: "const = cement, final = locked", cheatSheet: "Quick reference" },
    companyTags: ["Swvl", "MaxAB"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 3
  {
    id: "functions-advanced",
    number: 3,
    title: "Functions Advanced",
    titleAr: "الدوال المتقدمة",
    level: "Junior",
    frequency: "Very Common",
    tags: ["Dart", "Functional Programming"],
    definition: {
      summary: "Higher-order functions, closures, arrow functions, optional parameters",
      detailed: "Functions are first-class citizens in Dart. Can be assigned to variables, passed as arguments, returned from functions.",
      keyPoints: ["Arrow functions: =>", "Higher-order: accepts/returns functions", "Closures: remember scope", "Optional: positional [] and named {}", "Required named: required"],
      codeExample: {
        language: "dart",
        code: `// Arrow function
int add(int a, int b) => a + b;

// Higher-order
void process(List<int> items, int Function(int) operation) {
  for (var item in items) print(operation(item));
}

// Closure
Function makeMultiplier(int factor) {
  return (int x) => x * factor; // remembers factor
}

// Optional parameters
void greet(String name, [String? greeting]) { ... }
void createUser({required String name, int? age}) { ... }`
      }
    },
    questions: [
      { type: "Practical", question: "Write a higher-order function that filters a list", difficulty: 3 },
      { type: "Deep Dive", question: "How do closures work in Dart's memory?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم first-class functions"], redFlags: ["لا يعرف الفرق بين positional و named"], greenFlags: ["يستخدم closures بفعالية"] },
    linkedCards: { prerequisites: ["variables-deep-dive"], nextSteps: [{ id: "collections-generics", title: "Collections & Generics" }], related: [] },
    quickRevision: { bulletPoints: ["=> arrow", "Higher-order = function input/output", "Closures capture scope"], memoryHook: "Functions are objects in Dart", cheatSheet: "Quick reference" },
    companyTags: ["MaxAB", "Swvl"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 4
  {
    id: "collections-generics",
    number: 4,
    title: "Collections & Generics",
    titleAr: "المجموعات والأنواع العامة",
    level: "Junior",
    frequency: "Critical",
    tags: ["Dart", "Data Structures"],
    definition: {
      summary: "List, Map, Set, spread operator, collection if/for, generics",
      detailed: "Collections are generic in Dart. Spread (...) for combining, collection if/for for conditional and generated elements.",
      keyPoints: ["List<E>: ordered, duplicates allowed", "Map<K,V>: key-value pairs", "Set<E>: unique elements", "Spread: ...list", "Collection if: if (x) ...[]", "Collection for: for (var x in list) ...[]"],
      codeExample: {
        language: "dart",
        code: `var list = [1, 2, 3];
var map = {'name': 'Ali', 'age': 25};
var set = {1, 2, 3};

// Spread
var combined = [0, ...list, 4];

// Collection if
var displayItems = [
  ...baseItems,
  if (isAdmin) adminItem,
  if (isPremium) ...premiumItems
];

// Collection for
var doubled = [for (var x in list) x * 2];`
      }
    },
    questions: [
      { type: "Practical", question: "Use collection for to transform a list", difficulty: 3 },
      { type: "System Design", question: "Design a type-safe cache using generics", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يعرف الفرق بين List/Map/Set", "يستخدم spread operator"], redFlags: ["يستخدم dynamic مع collections"], greenFlags: ["يستخدم collection if/for"] },
    linkedCards: { prerequisites: ["functions-advanced"], nextSteps: [{ id: "oop-basics", title: "OOP Basics" }], related: [] },
    quickRevision: { bulletPoints: ["List = ordered", "Map = key-value", "Set = unique", "... = spread"], memoryHook: "Spread like butter on bread", cheatSheet: "Quick reference" },
    companyTags: ["Swvl", "Trella"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 5
  {
    id: "oop-basics",
    number: 5,
    title: "OOP Basics",
    titleAr: "أساسيات البرمجة كائنية",
    level: "Junior",
    frequency: "Critical",
    tags: ["Dart", "OOP"],
    definition: {
      summary: "Classes, constructors, this, initializer lists, static",
      detailed: "Dart is object-oriented. Classes define objects. Constructors initialize them. Initializer lists set final fields before body.",
      keyPoints: ["Class: blueprint", "Constructor: initializer", "this: current instance", "Initializer list: : field = value", "Static: class-level", "Factory: custom constructor logic"],
      codeExample: {
        language: "dart",
        code: `class User {
  final String name;
  final int age;
  
  // Initializer list
  User(String name, int age) 
    : name = name,
      age = age;
  
  // Named constructor
  User.guest() : name = 'Guest', age = 0;
  
  // Factory
  factory User.fromJson(Map json) {
    return User(json['name'], json['age']);
  }
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "Difference between factory and regular constructor?", difficulty: 3 },
      { type: "Practical", question: "Implement a class with initializer list validation", difficulty: 3 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم OOP principles"], redFlags: ["يخلط بين static و instance"], greenFlags: ["يستخدم initializer lists"] },
    linkedCards: { prerequisites: ["collections-generics"], nextSteps: [{ id: "inheritance-composition", title: "Inheritance vs Composition" }], related: [] },
    quickRevision: { bulletPoints: ["class = blueprint", "constructor = init", "static = class-level"], memoryHook: "Factory = custom builder", cheatSheet: "Quick reference" },
    companyTags: ["ITWorx", "Valeo"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 6
  {
    id: "inheritance-composition",
    number: 6,
    title: "Inheritance vs Composition",
    titleAr: "الوراثة مقابل التركيب",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "OOP", "Design Patterns"],
    definition: {
      summary: "extends vs with vs implements. Favor composition over inheritance.",
      detailed: "Inheritance (extends) is 'is-a'. Composition is 'has-a'. Mixins (with) share code. Implements enforces contract.",
      keyPoints: ["extends: one only, inherits implementation", "implements: contract, no implementation", "with: mixin, share code", "Composition: more flexible", "Liskov Substitution: derived classes must be substitutable"],
      codeExample: {
        language: "dart",
        code: `// Inheritance (is-a)
class Animal { void move() {} }
class Bird extends Animal { void fly() {} }

// Composition (has-a)
class Engine { void start() {} }
class Car {
  final Engine engine; // composed
  Car(this.engine);
}

// Mixin
mixin Flyable { void fly() {} }
class Bat extends Animal with Flyable {}`
      }
    },
    questions: [
      { type: "Critical Thinking", question: "When to use composition over inheritance?", difficulty: 4 },
      { type: "System Design", question: "Design a notification system using composition", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم SOLID principles"], redFlags: ["deep inheritance hierarchies"], greenFlags: ["prefers composition"] },
    linkedCards: { prerequisites: ["oop-basics"], nextSteps: [{ id: "mixins-power", title: "Mixins Power" }], related: [] },
    quickRevision: { bulletPoints: ["extends = is-a", "implements = contract", "with = mixin"], memoryHook: "Composition > Inheritance", cheatSheet: "Quick reference" },
    companyTags: ["Valeo", "Thndr"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 7
  {
    id: "mixins-power",
    number: 7,
    title: "Mixins Power",
    titleAr: "قوة الـ Mixins",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "OOP"],
    definition: {
      summary: "Multiple inheritance through mixins. Reuse code across classes.",
      detailed: "Mixins allow sharing code between classes without inheritance hierarchy. Use with keyword.",
      keyPoints: ["mixin: no constructor", "on: restrict mixin usage", "super.mixin: call other mixins", "Multiple mixins allowed", "Order matters"],
      codeExample: {
        language: "dart",
        code: `mixin Logger {
  void log(String msg) => print('[LOG] $msg');
}

mixin Validator on FormController {
  bool validate() => formKey.currentState?.validate() ?? false;
}

class LoginController extends Controller with Logger, Validator {
  // Has both log() and validate()
}`
      }
    },
    questions: [
      { type: "Practical", question: "Create a mixin for caching API responses", difficulty: 3 },
      { type: "Deep Dive", question: "How are mixins implemented in Dart VM?", difficulty: 5 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم mixin vs inheritance"], redFlags: ["overuses mixins"], greenFlags: ["uses 'on' keyword properly"] },
    linkedCards: { prerequisites: ["inheritance-composition"], nextSteps: [{ id: "abstract-interfaces", title: "Abstract & Interfaces" }], related: [] },
    quickRevision: { bulletPoints: ["mixin = shared code", "on = restriction", "order matters"], memoryHook: "Mixins = code sharing without inheritance", cheatSheet: "Quick reference" },
    companyTags: ["MaxAB", "Swvl"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Moderate" }
  },

  // CARD 8
  {
    id: "abstract-interfaces",
    number: 8,
    title: "Abstract & Interfaces",
    titleAr: "الأنواع المجردة والواجهات",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "OOP"],
    definition: {
      summary: "abstract class, interface (implicit), sealed (Dart 3)",
      detailed: "Abstract classes can't be instantiated. All classes are implicit interfaces. Sealed classes for exhaustive switching.",
      keyPoints: ["abstract: partial implementation", "interface: all classes are interfaces", "implements: must implement all", "sealed: restricted inheritance (Dart 3)", "base: must be extended", "final: can't be extended"],
      codeExample: {
        language: "dart",
        code: `abstract class Repository {
  Future<List> getAll();
  Future<void> save(dynamic item);
}

// Implicit interface
class UserRepository implements Repository {
  @override
  Future<List> getAll() async => [];
  
  @override
  Future<void> save(item) async {}
}

// Sealed (Dart 3)
sealed class AuthState {}
class AuthInitial extends AuthState {}
class AuthLoading extends AuthState {}
class AuthSuccess extends AuthState {}
class AuthError extends AuthState {}`
      }
    },
    questions: [
      { type: "Theoretical", question: "Difference between abstract class and interface in Dart?", difficulty: 3 },
      { type: "System Design", question: "Design a repository layer using interfaces", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم abstraction"], redFlags: ["confuses abstract with interface"], greenFlags: ["mentions sealed classes"] },
    linkedCards: { prerequisites: ["mixins-power"], nextSteps: [{ id: "factory-singleton", title: "Factory & Singleton Patterns" }], related: [] },
    quickRevision: { bulletPoints: ["abstract = partial", "interface = contract", "sealed = exhaustive"], memoryHook: "All classes are interfaces in Dart", cheatSheet: "Quick reference" },
    companyTags: ["Thndr", "Paymob"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 9
  {
    id: "factory-singleton",
    number: 9,
    title: "Factory & Singleton Patterns",
    titleAr: "أنماط Factory و Singleton",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "Design Patterns"],
    definition: {
      summary: "Factory constructors and Singleton pattern implementation",
      detailed: "Factory constructors allow custom object creation. Singleton ensures one instance.",
      keyPoints: ["Factory: return existing or new instance", "Singleton: private constructor + static instance", "Lazy initialization", "Thread safety in Dart (isolates)"],
      codeExample: {
        language: "dart",
        code: `// Singleton
class Database {
  static final Database _instance = Database._internal();
  factory Database() => _instance;
  Database._internal();
  
  void query() {}
}

// Factory with caching
class ImageCache {
  static final Map<String, Image> _cache = {};
  
  factory ImageCache(String url) {
    return _cache.putIfAbsent(url, () => Image._load(url));
  }
}`
      }
    },
    questions: [
      { type: "Practical", question: "Implement thread-safe singleton", difficulty: 3 },
      { type: "Critical Thinking", question: "When NOT to use singleton?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم creational patterns"], redFlags: ["overuses singleton"], greenFlags: ["mentions testing issues"] },
    linkedCards: { prerequisites: ["abstract-interfaces"], nextSteps: [{ id: "extension-methods", title: "Extension Methods" }], related: [] },
    quickRevision: { bulletPoints: ["Singleton = one instance", "Factory = custom creation"], memoryHook: "Singleton = global state", cheatSheet: "Quick reference" },
    companyTags: ["ITWorx", "Valeo"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 10
  {
    id: "extension-methods",
    number: 10,
    title: "Extension Methods",
    titleAr: "دوال التوسعة",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart"],
    definition: {
      summary: "Add functionality to existing classes without inheritance",
      detailed: "Extensions add methods to existing types. Extension types (Dart 3) for zero-cost wrappers.",
      keyPoints: ["extension on Type", "Extension methods are static", "Extension types (Dart 3)", "API ergonomics"],
      codeExample: {
        language: "dart",
        code: `extension StringUtils on String {
  String capitalize() => 
    isEmpty ? this : '\${this[0].toUpperCase()}\${this.substring(1)}';
  
  bool get isValidEmail => 
    contains('@') && contains('.');
}

// Usage
'ali'.capitalize(); // 'Ali'
'ali@email.com'.isValidEmail; // true

// Extension type (Dart 3)
extension type UserId(int id) implements int {
  bool get isValid => id > 0;
}`
      }
    },
    questions: [
      { type: "Practical", question: "Create extension for Date formatting", difficulty: 2 },
      { type: "Deep Dive", question: "How do extension methods work at compile time?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يعرف يكتب extensions"], redFlags: ["overuses extensions"], greenFlags: ["mentions extension types"] },
    linkedCards: { prerequisites: ["factory-singleton"], nextSteps: [{ id: "async-future", title: "Async Future" }], related: [] },
    quickRevision: { bulletPoints: ["extension = add methods", "static dispatch", "Dart 3 = extension types"], memoryHook: "Extend without inheritance", cheatSheet: "Quick reference" },
    companyTags: ["Swvl", "MaxAB"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Minor" }
  },

  // CARD 11
  {
    id: "async-future",
    number: 11,
    title: "Async Future",
    titleAr: "البرمجة غير المتزامنة - Future",
    level: "Junior",
    frequency: "Critical",
    tags: ["Dart", "Async"],
    definition: {
      summary: "Event loop, microtasks, Future, async/await",
      detailed: "Dart is single-threaded with event loop. async/await for asynchronous code. Futures represent potential values.",
      keyPoints: ["Event loop: microtask queue + event queue", "Future: async operation", "async/await: syntactic sugar", "then/catchError: callback style", "Future.delayed, Future.value", "Microtask vs Event queue priority"],
      codeExample: {
        language: "dart",
        code: `Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 1));
  return 'Data';
}

// Equivalent to:
Future<String> fetchData() {
  return Future.delayed(Duration(seconds: 1))
    .then((_) => 'Data');
}

// Error handling
try {
  final data = await fetchData();
} catch (e) {
  print('Error: $e');
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "Explain Dart's event loop", difficulty: 3 },
      { type: "Practical", question: "Handle multiple futures with Future.wait", difficulty: 3 },
      { type: "Deep Dive", question: "Difference between microtask and event queue?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم async programming"], redFlags: ["confuses async with parallel"], greenFlags: ["explains event loop"] },
    linkedCards: { prerequisites: ["extension-methods"], nextSteps: [{ id: "streams-deep", title: "Streams Deep" }], related: [] },
    quickRevision: { bulletPoints: ["async/await = syntactic sugar", "Future = potential value", "Event loop = single-threaded"], memoryHook: "Future = promise of value", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Critical" }
  },

  // CARD 12
  {
    id: "streams-deep",
    number: 12,
    title: "Streams Deep",
    titleAr: "الـ Streams بعمق",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Dart", "Async", "Reactive"],
    definition: {
      summary: "Broadcast vs single subscription, controllers, transformers",
      detailed: "Streams are async sequences. Single subscription (one listener) vs broadcast (multiple). Controllers create streams.",
      keyPoints: ["Stream: async sequence", "Single subscription: one listener only", "Broadcast: multiple listeners", "StreamController: create streams", "StreamBuilder (Flutter)", "async* / yield: generate streams"],
      codeExample: {
        language: "dart",
        code: `// Single subscription
final stream = Stream.fromIterable([1, 2, 3]);
stream.listen(print); // OK
// stream.listen(print); // Error!

// Broadcast
final controller = StreamController<int>.broadcast();
controller.stream.listen(print);
controller.stream.listen(print); // OK!
controller.add(1);

// Async generator
Stream<int> countStream(int to) async* {
  for (int i = 1; i <= to; i++) {
    yield i;
    await Future.delayed(Duration(seconds: 1));
  }
}`
      }
    },
    questions: [
      { type: "Practical", question: "Create a stream that emits every second", difficulty: 3 },
      { type: "System Design", question: "Design real-time chat using streams", difficulty: 4 },
      { type: "Deep Dive", question: "How does Stream.listen work internally?", difficulty: 5 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم reactive programming"], redFlags: ["forgets to close streams"], greenFlags: ["uses broadcast streams properly"] },
    linkedCards: { prerequisites: ["async-future"], nextSteps: [{ id: "isolates-concurrency", title: "Isolates & Concurrency" }], related: [] },
    quickRevision: { bulletPoints: ["Stream = async sequence", "Broadcast = multi-listener", "async* = generator"], memoryHook: "Stream = async Iterable", cheatSheet: "Quick reference" },
    companyTags: ["Swvl", "MaxAB", "Trella"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 13
  {
    id: "isolates-concurrency",
    number: 13,
    title: "Isolates & Concurrency",
    titleAr: "الـ Isolates والتزامن",
    level: "Senior",
    frequency: "Rare",
    tags: ["Dart", "Performance"],
    definition: {
      summary: "compute(), Isolate.spawn, ports, message passing",
      detailed: "Isolates are separate memory threads. No shared memory. Communication via ports.",
      keyPoints: ["Isolate: separate memory heap", "No shared memory", "SendPort/ReceivePort: communication", "compute(): easy isolate for functions", "Spawn: create new isolate", "Message passing only"],
      codeExample: {
        language: "dart",
        code: `// Easy way
final result = await compute(heavyCalculation, data);

// Manual isolate
void main() async {
  final receivePort = ReceivePort();
  await Isolate.spawn(isolateFunction, receivePort.sendPort);
  
  final sendPort = await receivePort.first;
  sendPort.send('Hello from main');
}

void isolateFunction(SendPort mainSendPort) {
  final port = ReceivePort();
  mainSendPort.send(port.sendPort);
  
  port.listen((msg) {
    print('Isolate got: $msg');
  });
}`
      }
    },
    questions: [
      { type: "Practical", question: "Process image in background using isolates", difficulty: 4 },
      { type: "Deep Dive", question: "Why no shared memory between isolates?", difficulty: 5 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم parallelism"], redFlags: ["thinks isolates = threads"], greenFlags: ["mentions message passing"] },
    linkedCards: { prerequisites: ["streams-deep"], nextSteps: [{ id: "error-handling", title: "Error Handling" }], related: [] },
    quickRevision: { bulletPoints: ["Isolate = no shared memory", "compute() = easy way", "Ports = communication"], memoryHook: "Isolates = separate processes", cheatSheet: "Quick reference" },
    companyTags: ["Valeo", "Thndr"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Major" }
  },

  // CARD 14
  {
    id: "error-handling",
    number: 14,
    title: "Error Handling",
    titleAr: "معالجة الأخطاء",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Dart", "Architecture"],
    definition: {
      summary: "Exceptions, Failures, Either, Result types",
      detailed: "Try-catch for exceptions. Result/Either types for functional error handling. Don't use exceptions for control flow.",
      keyPoints: ["try/catch/finally", "on SpecificException", "rethrow", "Result<T,E> type", "Either<L,R> (fpdart)", "Don't catch all exceptions blindly"],
      codeExample: {
        language: "dart",
        code: `// Classic
try {
  riskyOperation();
} on NetworkException catch (e) {
  handleNetworkError(e);
} catch (e) {
  rethrow;
} finally {
  cleanup();
}

// Result type (functional)
Result<Data, AppError> fetchData() {
  try {
    return Result.success(api.get());
  } on Exception catch (e) {
    return Result.failure(AppError.network(e));
  }
}

// Usage
final result = fetchData();
result.when(
  success: (data) => print(data),
  failure: (error) => handleError(error),
);`
      }
    },
    questions: [
      { type: "Practical", question: "Implement Result type for API calls", difficulty: 3 },
      { type: "Critical Thinking", question: "When to use exceptions vs Result types?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم error handling patterns"], redFlags: ["catches all exceptions"], greenFlags: ["uses Result types"] },
    linkedCards: { prerequisites: ["isolates-concurrency"], nextSteps: [{ id: "dart-internals", title: "Dart Internals" }], related: [] },
    quickRevision: { bulletPoints: ["try/catch = exceptions", "Result = functional", "rethrow = propagate"], memoryHook: "Exceptions = exceptional cases", cheatSheet: "Quick reference" },
    companyTags: ["Thndr", "Paymob", "Fawry"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 15
  {
    id: "dart-internals",
    number: 15,
    title: "Dart Internals",
    titleAr: "داخليات Dart",
    level: "Senior",
    frequency: "Rare",
    tags: ["Dart", "Performance"],
    definition: {
      summary: "VM, AOT, JIT, garbage collection, tree shaking",
      detailed: "Dart runs on VM (JIT for dev, AOT for release). Generational GC. Tree shaking removes unused code.",
      keyPoints: ["VM: runtime environment", "JIT: Just In Time (dev)", "AOT: Ahead Of Time (release)", "Generational GC: young/old objects", "Tree shaking: dead code elimination", "Platform channels (Flutter)"],
      codeExample: {
        language: "dart",
        code: `// No specific code, concepts only
// Development: JIT with hot reload
// Production: AOT compiled to machine code

// GC optimization
void gcExample() {
  // Short-lived objects (young generation)
  final temp = calculate();
  
  // Long-lived (old generation)
  final cache = loadCache();
}`
      }
    },
    questions: [
      { type: "Deep Dive", question: "How does Dart's GC work?", difficulty: 5 },
      { type: "System Design", question: "Optimize app for AOT compilation", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["deep understanding of Dart"], redFlags: ["no knowledge of VM"], greenFlags: ["explains JIT vs AOT"] },
    linkedCards: { prerequisites: ["error-handling"], nextSteps: [{ id: "solid-principles", title: "SOLID Principles" }], related: [] },
    quickRevision: { bulletPoints: ["JIT = dev", "AOT = release", "GC = generational"], memoryHook: "JIT = fast dev, AOT = fast prod", cheatSheet: "Quick reference" },
    companyTags: ["Valeo", "International"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Critical for Senior" }
  },

  // ==================== LEVEL 2: SOFTWARE DESIGN (16-35) ====================

  // CARD 16
  {
    id: "solid-principles",
    number: 16,
    title: "SOLID Principles",
    titleAr: "مبادئ SOLID",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "OOP", "Design"],
    definition: {
      summary: "S: Single Responsibility, O: Open/Closed, L: Liskov Substitution, I: Interface Segregation, D: Dependency Inversion",
      detailed: "SOLID principles guide object-oriented design for maintainable and scalable code. Each principle addresses specific design concerns.",
      keyPoints: ["SRP: One reason to change", "OCP: Open for extension, closed for modification", "LSP: Substitutability", "ISP: Client-specific interfaces", "DIP: Depend on abstractions"],
      codeExample: {
        language: "dart",
        code: `// SRP: Separate concerns
class UserRepository {
  Future<User> getUser(String id) async { ... }
}

class UserNotifier {
  void notifyUser(User user) { ... }
}

// OCP: Extend without modifying
abstract class PaymentProcessor {
  void process(double amount);
}

class StripeProcessor implements PaymentProcessor { ... }
class PaymobProcessor implements PaymentProcessor { ... }`
      }
    },
    questions: [
      { type: "Theoretical", question: "Explain each SOLID principle with examples", difficulty: 3 },
      { type: "Practical", question: "Refactor violating code to follow SRP", difficulty: 3 },
      { type: "System Design", question: "Design a system following all SOLID principles", difficulty: 5 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم كل principle"], redFlags: ["can't explain with examples"], greenFlags: ["applies principles to real code"] },
    linkedCards: { prerequisites: ["dart-internals"], nextSteps: [{ id: "dry-kiss-yagni", title: "DRY KISS YAGNI" }], related: [] },
    quickRevision: { bulletPoints: ["S = Single Responsibility", "O = Open/Closed", "L = Liskov", "I = Interface Seg", "D = Dependency Inv"], memoryHook: "SOLID = maintainable code", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 17
  {
    id: "dry-kiss-yagni",
    number: 17,
    title: "DRY KISS YAGNI",
    titleAr: "مبادئ التطوير",
    level: "Junior",
    frequency: "Common",
    tags: ["Architecture", "Best Practices"],
    definition: {
      summary: "DRY: Don't Repeat Yourself, KISS: Keep It Simple Stupid, YAGNI: You Aren't Gonna Need It",
      detailed: "These principles promote clean, maintainable code. DRY eliminates duplication, KISS favors simplicity, YAGNI avoids premature optimization.",
      keyPoints: ["DRY: One source of truth", "KISS: Simple solutions first", "YAGNI: Don't over-engineer", "Balance: Don't over-apply DRY"],
      codeExample: {
        language: "dart",
        code: `// DRY: Extract common logic
String formatCurrency(double amt) => '\$\${amt.toStringAsFixed(2)}';

// KISS: Simple over complex
// ❌ Over-engineered
abstract class DataFetcher<T> { ... }

// ✅ Simple
Future<List<User>> fetchUsers() => http.get('/users');

// YAGNI: Don't add features you don't need yet`
      }
    },
    questions: [
      { type: "Theoretical", question: "When should you break DRY?", difficulty: 3 },
      { type: "Critical Thinking", question: "Balance between KISS and future-proofing", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم trade-offs"], redFlags: ["applies blindly"], greenFlags: ["knows when to break rules"] },
    linkedCards: { prerequisites: ["solid-principles"], nextSteps: [{ id: "design-patterns-creational", title: "Creational Patterns" }], related: [] },
    quickRevision: { bulletPoints: ["DRY = no duplication", "KISS = simple", "YAGNI = don't over-engineer"], memoryHook: "Simple is better", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 18
  {
    id: "design-patterns-creational",
    number: 18,
    title: "Creational Patterns",
    titleAr: "أنماط الإنشاء",
    level: "Mid",
    frequency: "Common",
    tags: ["Design Patterns", "Architecture"],
    definition: {
      summary: "Factory, Builder, Singleton, Prototype patterns for object creation",
      detailed: "Creational patterns abstract the instantiation process, making systems independent of how objects are created.",
      keyPoints: ["Factory: Delegate creation", "Builder: Step-by-step construction", "Singleton: One instance", "Prototype: Clone objects"],
      codeExample: {
        language: "dart",
        code: `// Builder Pattern
class UserBuilder {
  String? name;
  int? age;
  
  UserBuilder setName(String name) {
    this.name = name;
    return this;
  }
  
  User build() => User(name: name!, age: age);
}

// Usage
final user = UserBuilder()
  .setName('Ali')
  .setAge(25)
  .build();`
      }
    },
    questions: [
      { type: "Practical", question: "Implement Builder pattern for complex object", difficulty: 3 },
      { type: "Critical Thinking", question: "Factory vs Builder - when to use each?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يعرف patterns العملية"], redFlags: ["uses patterns unnecessarily"], greenFlags: ["chooses right pattern for problem"] },
    linkedCards: { prerequisites: ["dry-kiss-yagni"], nextSteps: [{ id: "design-patterns-structural", title: "Structural Patterns" }], related: [] },
    quickRevision: { bulletPoints: ["Factory = delegate", "Builder = step-by-step", "Singleton = one instance"], memoryHook: "Creation = controlled instantiation", cheatSheet: "Quick reference" },
    companyTags: ["ITWorx", "Valeo"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 19
  {
    id: "design-patterns-structural",
    number: 19,
    title: "Structural Patterns",
    titleAr: "أنماط الهيكلية",
    level: "Mid",
    frequency: "Common",
    tags: ["Design Patterns", "Architecture"],
    definition: {
      summary: "Adapter, Decorator, Facade, Proxy patterns for class composition",
      detailed: "Structural patterns deal with how classes and objects are composed to form larger structures.",
      keyPoints: ["Adapter: Interface conversion", "Decorator: Add responsibilities", "Facade: Simplified interface", "Proxy: Control access"],
      codeExample: {
        language: "dart",
        code: `// Adapter Pattern
class OldApi {
  String fetchData() => 'old data';
}

class NewApiAdapter implements ModernApi {
  final OldApi oldApi;
  NewApiAdapter(this.oldApi);
  
  @override
  Future<Json> fetchModern() async {
    return parse(oldApi.fetchData());
  }
}`
      }
    },
    questions: [
      { type: "Practical", question: "Implement Adapter for legacy API", difficulty: 3 },
      { type: "System Design", question: "Design caching layer using Proxy pattern", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم composition"], redFlags: ["confuses patterns"], greenFlags: ["uses Decorator for extensibility"] },
    linkedCards: { prerequisites: ["design-patterns-creational"], nextSteps: [{ id: "design-patterns-behavioral", title: "Behavioral Patterns" }], related: [] },
    quickRevision: { bulletPoints: ["Adapter = convert", "Decorator = wrap", "Facade = simplify"], memoryHook: "Structure = composition", cheatSheet: "Quick reference" },
    companyTags: ["Valeo", "Thndr"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Major" }
  },

  // CARD 20
  {
    id: "design-patterns-behavioral",
    number: 20,
    title: "Behavioral Patterns",
    titleAr: "أنماط السلوكية",
    level: "Mid",
    frequency: "Common",
    tags: ["Design Patterns", "Architecture"],
    definition: {
      summary: "Observer, Strategy, Command, State patterns for communication",
      detailed: "Behavioral patterns focus on communication between objects, defining how they interact and distribute responsibility.",
      keyPoints: ["Observer: Subscribe/notify", "Strategy: Interchangeable algorithms", "Command: Encapsulate requests", "State: Behavior based on state"],
      codeExample: {
        language: "dart",
        code: `// Observer Pattern
abstract class Observer {
  void update(String state);
}

class Subject {
  final List<Observer> _observers = [];
  
  void attach(Observer o) => _observers.add(o);
  void notify(String state) {
    for (var o in _observers) o.update(state);
  }
}

// Strategy Pattern
abstract class PaymentStrategy {
  void pay(double amount);
}

class CashPayment implements PaymentStrategy { ... }
class CardPayment implements PaymentStrategy { ... }`
      }
    },
    questions: [
      { type: "Practical", question: "Implement Observer for state management", difficulty: 3 },
      { type: "System Design", question: "Design undo/redo with Command pattern", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم communication patterns"], redFlags: ["creates memory leaks in Observer"], greenFlags: ["properly disposes observers"] },
    linkedCards: { prerequisites: ["design-patterns-structural"], nextSteps: [{ id: "dependency-injection", title: "Dependency Injection" }], related: [] },
    quickRevision: { bulletPoints: ["Observer = pub/sub", "Strategy = interchangeable", "Command = encapsulate"], memoryHook: "Behavior = communication", cheatSheet: "Quick reference" },
    companyTags: ["MaxAB", "Swvl"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 21
  {
    id: "dependency-injection",
    number: 21,
    title: "Dependency Injection",
    titleAr: "حقن التبعيات",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "DI", "Testing"],
    definition: {
      summary: "Constructor injection, Provider pattern, GetIt, injectable",
      detailed: "DI provides objects with their dependencies from external sources rather than creating them internally, enabling testability and loose coupling.",
      keyPoints: ["Constructor injection: preferred", "Service locator: GetIt", "Provider: Flutter DI", "Injectable: code generation"],
      codeExample: {
        language: "dart",
        code: `// Constructor Injection
class UserService {
  final UserRepository _repo;
  final Logger _logger;
  
  UserService(this._repo, this._logger);
}

// GetIt
final getIt = GetIt.instance;
void setup() {
  getIt.registerSingleton<ApiClient>(ApiClient());
  getIt.registerFactory<UserService>(() => UserService(
    getIt(), getIt()
  ));
}

// Usage
final service = getIt<UserService>();`
      }
    },
    questions: [
      { type: "Practical", question: "Set up GetIt for a Flutter app", difficulty: 3 },
      { type: "Critical Thinking", question: "DI vs Service Locator - pros and cons", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم فوائد DI"], redFlags: ["uses global instances"], greenFlags: ["uses constructor injection"] },
    linkedCards: { prerequisites: ["design-patterns-behavioral"], nextSteps: [{ id: "repository-pattern", title: "Repository Pattern" }], related: [] },
    quickRevision: { bulletPoints: ["DI = external dependencies", "Constructor = preferred", "GetIt = service locator"], memoryHook: "Don't create, receive", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 22
  {
    id: "repository-pattern",
    number: 22,
    title: "Repository Pattern",
    titleAr: "نمط المستودع",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "Data Layer"],
    definition: {
      summary: "Abstract data access, domain-driven design, clean separation",
      detailed: "Repository pattern abstracts data access logic, providing a clean API for domain layer while hiding data source implementation details.",
      keyPoints: ["Abstract data operations", "Hide data source details", "Enable testing with mocks", "Support multiple data sources"],
      codeExample: {
        language: "dart",
        code: `abstract class UserRepository {
  Future<User> getById(String id);
  Future<List<User>> getAll();
  Future<void> save(User user);
}

class UserRepositoryImpl implements UserRepository {
  final ApiClient _api;
  final Cache _cache;
  
  UserRepositoryImpl(this._api, this._cache);
  
  @override
  Future<User> getById(String id) async {
    final cached = await _cache.get(id);
    if (cached != null) return cached;
    
    final user = await _api.getUser(id);
    await _cache.set(id, user);
    return user;
  }
}`
      }
    },
    questions: [
      { type: "Practical", question: "Implement Repository with caching", difficulty: 3 },
      { type: "System Design", question: "Design multi-source repository (API + local)", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفصل data layer"], redFlags: ["direct API calls from UI"], greenFlags: ["uses abstraction properly"] },
    linkedCards: { prerequisites: ["dependency-injection"], nextSteps: [{ id: "unit-of-work", title: "Unit of Work" }], related: [] },
    quickRevision: { bulletPoints: ["Repository = data abstraction", "Hide implementation", "Enable testing"], memoryHook: "Repository = data gateway", cheatSheet: "Quick reference" },
    companyTags: ["Thndr", "Paymob", "MaxAB"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 23
  {
    id: "unit-of-work",
    number: 23,
    title: "Unit of Work",
    titleAr: "وحدة العمل",
    level: "Senior",
    frequency: "Rare",
    tags: ["Architecture", "Data Layer"],
    definition: {
      summary: "Track changes, coordinate transactions, batch operations",
      detailed: "Unit of Work maintains a list of objects affected by a business transaction and coordinates writing out changes.",
      keyPoints: ["Track entity changes", "Coordinate commits", "Ensure consistency", "Batch operations"],
      codeExample: {
        language: "dart",
        code: `class UnitOfWork {
  final List<Entity> _new = [];
  final List<Entity> _dirty = [];
  final List<Entity> _deleted = [];
  
  void registerNew(Entity e) => _new.add(e);
  void registerDirty(Entity e) => _dirty.add(e);
  void registerDeleted(Entity e) => _deleted.add(e);
  
  Future<void> commit() async {
    await _insert(_new);
    await _update(_dirty);
    await _delete(_deleted);
    clear();
  }
}`
      }
    },
    questions: [
      { type: "System Design", question: "Design transaction management for multiple repos", difficulty: 5 },
      { type: "Deep Dive", question: "UoW vs direct repository calls", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم transactions"], redFlags: ["no transaction awareness"], greenFlags: ["mentions consistency"] },
    linkedCards: { prerequisites: ["repository-pattern"], nextSteps: [{ id: "cqrs-pattern", title: "CQRS Pattern" }], related: [] },
    quickRevision: { bulletPoints: ["UoW = track changes", "Batch commits", "Ensure consistency"], memoryHook: "UoW = transaction coordinator", cheatSheet: "Quick reference" },
    companyTags: ["Fawry", "Paymob"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Major for Senior" }
  },

  // CARD 24
  {
    id: "cqrs-pattern",
    number: 24,
    title: "CQRS Pattern",
    titleAr: "فصل القراءة عن الكتابة",
    level: "Senior",
    frequency: "Rare",
    tags: ["Architecture", "System Design"],
    definition: {
      summary: "Command Query Responsibility Segregation - separate read and write models",
      detailed: "CQRS separates read and write operations into different models, optimizing each for their specific use case.",
      keyPoints: ["Commands: modify state", "Queries: read state", "Different models", "Event sourcing often paired"],
      codeExample: {
        language: "dart",
        code: `// Command
class CreateOrderCommand {
  final String userId;
  final List<Item> items;
}

// Query
class OrderSummaryQuery {
  final String orderId;
}

// Separate handlers
class CreateOrderHandler { ... }
class OrderSummaryHandler { ... }`
      }
    },
    questions: [
      { type: "System Design", question: "When to use CQRS vs simple CRUD?", difficulty: 4 },
      { type: "Critical Thinking", question: "CQRS complexity trade-offs", difficulty: 5 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم distributed systems"], redFlags: ["uses CQRS unnecessarily"], greenFlags: ["knows when NOT to use"] },
    linkedCards: { prerequisites: ["unit-of-work"], nextSteps: [{ id: "event-sourcing", title: "Event Sourcing" }], related: [] },
    quickRevision: { bulletPoints: ["Commands = write", "Queries = read", "Separate models"], memoryHook: "CQRS = split responsibilities", cheatSheet: "Quick reference" },
    companyTags: ["International", "Thndr"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Critical for Senior" }
  },

  // CARD 25
  {
    id: "event-sourcing",
    number: 25,
    title: "Event Sourcing",
    titleAr: "تخزين الأحداث",
    level: "Senior",
    frequency: "Rare",
    tags: ["Architecture", "System Design"],
    definition: {
      summary: "Store events instead of state, reconstruct state from events",
      detailed: "Event Sourcing persists the state of a business entity as a sequence of state-changing events.",
      keyPoints: ["Events as source of truth", "Immutable event log", "State reconstruction", "Event replay"],
      codeExample: {
        language: "dart",
        code: `abstract class DomainEvent {
  final DateTime occurredOn;
  DomainEvent() : occurredOn = DateTime.now();
}

class OrderCreated extends DomainEvent {
  final String orderId;
  final String userId;
  OrderCreated(this.orderId, this.userId);
}

class EventStore {
  final List<DomainEvent> _events = [];
  
  void append(DomainEvent event) => _events.add(event);
  
  Order rebuildOrder(String id) {
    var order = Order(id);
    for (var e in _events.where((e) => e.orderId == id)) {
      order.apply(e);
    }
    return order;
  }
}`
      }
    },
    questions: [
      { type: "System Design", question: "Design event-sourced e-commerce system", difficulty: 5 },
      { type: "Deep Dive", question: "Event versioning strategies", difficulty: 5 }
    ],
    interviewerMind: { whatTheyWant: ["deep distributed systems knowledge"], redFlags: ["no understanding of complexity"], greenFlags: ["mentions snapshotting"] },
    linkedCards: { prerequisites: ["cqrs-pattern"], nextSteps: [{ id: "domain-driven-design", title: "Domain Driven Design" }], related: [] },
    quickRevision: { bulletPoints: ["Events = source of truth", "Immutable log", "Replay to rebuild"], memoryHook: "Git for business data", cheatSheet: "Quick reference" },
    companyTags: ["International"],
    egyptianMarket: { popularity: "Very Low", salaryImpact: "Critical for Senior" }
  },

  // CARD 26
  {
    id: "domain-driven-design",
    number: 26,
    title: "Domain Driven Design",
    titleAr: "التصميم الموجه بالمجال",
    level: "Senior",
    frequency: "Rare",
    tags: ["Architecture", "DDD"],
    definition: {
      summary: "Ubiquitous language, bounded contexts, aggregates, entities, value objects",
      detailed: "DDD focuses on modeling software to match the domain. Uses ubiquitous language shared by developers and domain experts.",
      keyPoints: ["Ubiquitous language", "Bounded contexts", "Aggregates", "Entities vs Value Objects", "Domain Services"],
      codeExample: {
        language: "dart",
        code: `// Value Object
class Money {
  final double amount;
  final Currency currency;
  
  Money(this.amount, this.currency);
  
  Money add(Money other) {
    if (currency != other.currency) throw Exception();
    return Money(amount + other.amount, currency);
  }
}

// Entity
class Order {
  final OrderId id;
  final List<OrderItem> items;
  
  void addItem(Product p, int qty) {
    items.add(OrderItem(p, qty));
  }
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "Entity vs Value Object - differences?", difficulty: 3 },
      { type: "System Design", question: "Design bounded contexts for marketplace", difficulty: 5 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم business modeling"], redFlags: ["confuses entities with DTOs"], greenFlags: ["uses ubiquitous language"] },
    linkedCards: { prerequisites: ["event-sourcing"], nextSteps: [{ id: "microservices-basics", title: "Microservices Basics" }], related: [] },
    quickRevision: { bulletPoints: ["DDD = model the domain", "Ubiquitous language", "Bounded contexts"], memoryHook: "Code speaks business language", cheatSheet: "Quick reference" },
    companyTags: ["International", "Thndr"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Major for Senior" }
  },

  // CARD 27
  {
    id: "microservices-basics",
    number: 27,
    title: "Microservices Basics",
    titleAr: "أساسيات الميكروسيرفيس",
    level: "Senior",
    frequency: "Common",
    tags: ["Architecture", "System Design"],
    definition: {
      summary: "Service boundaries, inter-service communication, service discovery",
      detailed: "Microservices architecture structures application as loosely coupled services. Each service is independently deployable.",
      keyPoints: ["Single responsibility per service", "Independent deployment", "Inter-service communication", "Service discovery", "Circuit breakers"],
      codeExample: {
        language: "dart",
        code: `// API Gateway pattern
class ApiGateway {
  final UserServiceClient _users;
  final OrderServiceClient _orders;
  
  Future<UserProfile> getProfile(String id) async {
    final user = await _users.get(id);
    final orders = await _orders.getForUser(id);
    return UserProfile(user, orders);
  }
}

// Circuit Breaker
class CircuitBreaker {
  int _failures = 0;
  bool _open = false;
  
  Future<T> execute<T>(Future<T> Function() action) async {
    if (_open) throw CircuitOpenException();
    try {
      final result = await action();
      _failures = 0;
      return result;
    } catch (e) {
      if (++_failures >= 3) _open = true;
      rethrow;
    }
  }
}`
      }
    },
    questions: [
      { type: "System Design", question: "Design microservices for e-commerce", difficulty: 5 },
      { type: "Critical Thinking", question: "Monolith vs Microservices - when to choose?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم distributed systems"], redFlags: ["thinks microservices = magic"], greenFlags: ["knows trade-offs"] },
    linkedCards: { prerequisites: ["domain-driven-design"], nextSteps: [{ id: "api-design", title: "API Design" }], related: [] },
    quickRevision: { bulletPoints: ["Services = loosely coupled", "Independent deploy", "API Gateway"], memoryHook: "Small services, big system", cheatSheet: "Quick reference" },
    companyTags: ["Swvl", "MaxAB"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major for Senior" }
  },

  // CARD 28
  {
    id: "api-design",
    number: 28,
    title: "API Design",
    titleAr: "تصميم واجهات البرمجة",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "API"],
    definition: {
      summary: "REST principles, versioning, pagination, rate limiting",
      detailed: "Good API design follows REST principles, uses proper HTTP methods, implements versioning and pagination.",
      keyPoints: ["REST principles", "Proper HTTP methods", "Status codes", "Versioning strategies", "Pagination patterns"],
      codeExample: {
        language: "dart",
        code: `// RESTful API Design
// GET /api/v1/users - List users
// GET /api/v1/users/{id} - Get user
// POST /api/v1/users - Create user
// PUT /api/v1/users/{id} - Update user
// DELETE /api/v1/users/{id} - Delete user

// Pagination
class PaginatedResponse<T> {
  final List<T> data;
  final int page;
  final int perPage;
  final int total;
  final String? nextCursor;
  
  bool get hasMore => data.length == perPage;
}`
      }
    },
    questions: [
      { type: "Practical", question: "Design REST API for blog platform", difficulty: 3 },
      { type: "Critical Thinking", question: "REST vs GraphQL - when to use each?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم REST principles"], redFlags: ["wrong HTTP methods"], greenFlags: ["mentions idempotency"] },
    linkedCards: { prerequisites: ["microservices-basics"], nextSteps: [{ id: "authentication-jwt", title: "Authentication & JWT" }], related: [] },
    quickRevision: { bulletPoints: ["REST = resource-based", "HTTP methods matter", "Version your API"], memoryHook: "Good API = happy developers", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 29
  {
    id: "authentication-jwt",
    number: 29,
    title: "Authentication & JWT",
    titleAr: "المصادقة و JWT",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Security", "Auth"],
    definition: {
      summary: "JWT structure, refresh tokens, secure storage, OAuth2",
      detailed: "JWT (JSON Web Tokens) are compact, URL-safe tokens for claims. Used for stateless authentication.",
      keyPoints: ["JWT structure: header.payload.signature", "Access vs Refresh tokens", "Token expiration", "Secure storage", "OAuth2 flow"],
      codeExample: {
        language: "dart",
        code: `// JWT Structure
// eyJhbGciOiJIUzI1NiJ9.  // Header
// eyJ1c2VyX2lkIjoxMjN9.   // Payload
// SflKxwRJSMeKKF2QT4fwpMe... // Signature

class AuthService {
  Future<String> login(String email, String pass) async {
    final response = await http.post('/auth/login', body: {
      'email': email,
      'password': pass,
    });
    
    final tokens = jsonDecode(response.body);
    await _secureStorage.write('access_token', tokens['access']);
    await _secureStorage.write('refresh_token', tokens['refresh']);
    return tokens['access'];
  }
  
  Future<String> refreshToken() async {
    final refresh = await _secureStorage.read('refresh_token');
    final response = await http.post('/auth/refresh', body: {
      'refresh': refresh,
    });
    return jsonDecode(response.body)['access'];
  }
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "JWT vs Session-based auth - pros/cons?", difficulty: 3 },
      { type: "Practical", question: "Implement secure token refresh mechanism", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم security basics"], redFlags: ["stores tokens in plain text"], greenFlags: ["mentions secure storage"] },
    linkedCards: { prerequisites: ["api-design"], nextSteps: [{ id: "authorization-rbac", title: "Authorization & RBAC" }], related: [] },
    quickRevision: { bulletPoints: ["JWT = stateless", "Access + Refresh tokens", "Secure storage"], memoryHook: "JWT = signed claims", cheatSheet: "Quick reference" },
    companyTags: ["Fawry", "Paymob", "Thndr"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 30
  {
    id: "authorization-rbac",
    number: 30,
    title: "Authorization & RBAC",
    titleAr: "التراخيص والأدوار",
    level: "Mid",
    frequency: "Common",
    tags: ["Security", "Auth"],
    definition: {
      summary: "Role-Based Access Control, permissions, claims, policies",
      detailed: "RBAC restricts system access based on user roles. Each role has specific permissions.",
      keyPoints: ["Roles vs Permissions", "Claims-based auth", "Policy-based authorization", "Resource-based access"],
      codeExample: {
        language: "dart",
        code: `enum Role { admin, user, moderator }

class User {
  final String id;
  final List<Role> roles;
  final List<String> permissions;
  
  bool can(String permission) => permissions.contains(permission);
  bool hasRole(Role role) => roles.contains(role);
}

// Policy-based
class AuthorizationService {
  bool canEditPost(User user, Post post) {
    return user.can('post:edit') || 
           (user.hasRole(Role.moderator) && post.authorId != user.id);
  }
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "RBAC vs ABAC - differences?", difficulty: 3 },
      { type: "System Design", question: "Design permission system for multi-tenant app", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم authorization"], redFlags: ["confuses authn with authz"], greenFlags: ["mentions principle of least privilege"] },
    linkedCards: { prerequisites: ["authentication-jwt"], nextSteps: [{ id: "testing-unit", title: "Unit Testing" }], related: [] },
    quickRevision: { bulletPoints: ["RBAC = role-based", "Claims = attributes", "Policy = rules"], memoryHook: "AuthN = who, AuthZ = what", cheatSheet: "Quick reference" },
    companyTags: ["Fawry", "Paymob"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 31
  {
    id: "testing-unit",
    number: 31,
    title: "Unit Testing",
    titleAr: "اختبارات الوحدات",
    level: "Junior",
    frequency: "Critical",
    tags: ["Testing", "TDD"],
    definition: {
      summary: "Test small units in isolation, mocking dependencies",
      detailed: "Unit tests verify individual units of code work correctly. Fast, isolated, repeatable.",
      keyPoints: ["AAA pattern: Arrange, Act, Assert", "Mock dependencies", "Test one thing", "Fast execution"],
      codeExample: {
        language: "dart",
        code: `import 'package:test/test.dart';
import 'package:mockito/mockito.dart';

class MockRepository extends Mock implements UserRepository {}

void main() {
  group('UserService', () {
    late UserService service;
    late MockRepository repo;
    
    setUp(() {
      repo = MockRepository();
      service = UserService(repo);
    });
    
    test('getUser returns user from repository', () async {
      // Arrange
      final user = User(id: '1', name: 'Ali');
      when(repo.getById('1')).thenAnswer((_) async => user);
      
      // Act
      final result = await service.getUser('1');
      
      // Assert
      expect(result, equals(user));
      verify(repo.getById('1')).called(1);
    });
  });
}`
      }
    },
    questions: [
      { type: "Practical", question: "Write unit test for calculator class", difficulty: 2 },
      { type: "Critical Thinking", question: "What makes a good unit test?", difficulty: 3 }
    ],
    interviewerMind: { whatTheyWant: ["يكتب tests جيدة"], redFlags: ["no mocking"], greenFlags: ["uses AAA pattern"] },
    linkedCards: { prerequisites: ["authorization-rbac"], nextSteps: [{ id: "testing-widget", title: "Widget Testing" }], related: [] },
    quickRevision: { bulletPoints: ["AAA pattern", "Mock deps", "One assertion"], memoryHook: "Unit = isolated", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 32
  {
    id: "testing-widget",
    number: 32,
    title: "Widget Testing",
    titleAr: "اختبارات الواجهات",
    level: "Junior",
    frequency: "Very Common",
    tags: ["Testing", "Flutter"],
    definition: {
      summary: "Test Flutter widgets in isolated environment",
      detailed: "Widget tests verify UI components render correctly and respond to interactions.",
      keyPoints: ["testWidgets function", "Finder patterns", "WidgetTester", "pump and pumpAndSettle", "Golden tests"],
      codeExample: {
        language: "dart",
        code: `import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Counter increments', (tester) async {
    // Build widget
    await tester.pumpWidget(MyApp());
    
    // Find widget
    expect(find.text('0'), findsOneWidget);
    
    // Interact
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();
    
    // Verify
    expect(find.text('1'), findsOneWidget);
  });
  
  testWidgets('Form validation', (tester) async {
    await tester.pumpWidget(LoginForm());
    
    await tester.enterText(find.byType(TextField).first, 'test@email.com');
    await tester.tap(find.byType(ElevatedButton));
    await tester.pump();
    
    expect(find.text('Invalid email'), findsNothing);
  });
}`
      }
    },
    questions: [
      { type: "Practical", question: "Test a login form widget", difficulty: 3 },
      { type: "Deep Dive", question: "Widget test vs Integration test", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يكتب widget tests"], redFlags: ["no widget tests at all"], greenFlags: ["tests user interactions"] },
    linkedCards: { prerequisites: ["testing-unit"], nextSteps: [{ id: "testing-integration", title: "Integration Testing" }], related: [] },
    quickRevision: { bulletPoints: ["testWidgets = entry", "pump = rebuild", "find.byType"], memoryHook: "Widget = UI testing", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 33
  {
    id: "testing-integration",
    number: 33,
    title: "Integration Testing",
    titleAr: "اختبارات التكامل",
    level: "Mid",
    frequency: "Common",
    tags: ["Testing", "Flutter"],
    definition: {
      summary: "Test complete app flows, end-to-end testing",
      detailed: "Integration tests verify complete user flows work correctly across multiple components.",
      keyPoints: ["integration_test package", "End-to-end flows", "Real services or mocks", "Slower than widget tests"],
      codeExample: {
        language: "dart",
        code: `import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('end-to-end test', () {
    testWidgets('full login flow', (tester) async {
      app.main();
      await tester.pumpAndSettle();
      
      // Login
      await tester.enterText(
        find.byKey(Key('email_field')), 
        'user@test.com'
      );
      await tester.enterText(
        find.byKey(Key('password_field')), 
        'password123'
      );
      await tester.tap(find.byKey(Key('login_button')));
      await tester.pumpAndSettle();
      
      // Verify home screen
      expect(find.text('Welcome'), findsOneWidget);
    });
  });
}`
      }
    },
    questions: [
      { type: "Practical", question: "Write integration test for checkout flow", difficulty: 4 },
      { type: "Critical Thinking", question: "How many integration tests vs unit tests?", difficulty: 3 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم test pyramid"], redFlags: ["only integration tests"], greenFlags: ["balanced test strategy"] },
    linkedCards: { prerequisites: ["testing-widget"], nextSteps: [{ id: "testing-mocking", title: "Mocking & Stubbing" }], related: [] },
    quickRevision: { bulletPoints: ["E2E = full flow", "Slower", "integration_test pkg"], memoryHook: "Integration = real app", cheatSheet: "Quick reference" },
    companyTags: ["Swvl", "MaxAB"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 34
  {
    id: "testing-mocking",
    number: 34,
    title: "Mocking & Stubbing",
    titleAr: "المحاكاة والتزييف",
    level: "Mid",
    frequency: "Common",
    tags: ["Testing", "Mockito"],
    definition: {
      summary: "Mock dependencies, stub responses, verify interactions",
      detailed: "Mocking creates fake implementations of dependencies for isolated testing.",
      keyPoints: ["Mockito package", "when/thenAnswer", "verify interactions", "Argument matchers"],
      codeExample: {
        language: "dart",
        code: `import 'package:mockito/mockito.dart';

class MockApi extends Mock implements ApiClient {}

void main() {
  test('fetch with mock', () async {
    final mockApi = MockApi();
    
    // Stub
    when(mockApi.get('/users'))
      .thenAnswer((_) async => [User('1', 'Ali')]);
    
    // Use
    final service = UserService(mockApi);
    final users = await service.getUsers();
    
    // Verify
    expect(users.length, 1);
    verify(mockApi.get('/users')).called(1);
  });
  
  test('argument matchers', () async {
    when(mockApi.get(any)).thenAnswer((_) async => []);
    when(mockApi.get(argThat(startsWith('/users'))))
      .thenAnswer((_) async => [User('1', 'Ali')]);
  });
}`
      }
    },
    questions: [
      { type: "Practical", question: "Mock HTTP client for testing", difficulty: 3 },
      { type: "Deep Dive", "question": "Mock vs Stub vs Fake - differences?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يعرف يستخدم Mockito"], redFlags: ["no mocking in tests"], greenFlags: ["proper verify usage"] },
    linkedCards: { prerequisites: ["testing-integration"], nextSteps: [{ id: "testing-tdd", title: "TDD Principles" }], related: [] },
    quickRevision: { bulletPoints: ["Mock = fake object", "Stub = fake response", "Verify = check calls"], memoryHook: "Mock = controlled dependency", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 35
  {
    id: "testing-tdd",
    number: 35,
    title: "TDD Principles",
    titleAr: "مبادئ التطوير الموجه بالاختبارات",
    level: "Mid",
    frequency: "Common",
    tags: ["Testing", "TDD", "Methodology"],
    definition: {
      summary: "Red-Green-Refactor cycle, test-first development",
      detailed: "TDD writes tests before implementation. Red (failing test), Green (passing), Refactor (improve).",
      keyPoints: ["Red-Green-Refactor", "Test first", "Minimal implementation", "Refactor with confidence"],
      codeExample: {
        language: "dart",
        code: `// TDD Cycle:
// 1. RED: Write failing test
// 2. GREEN: Make it pass
// 3. REFACTOR: Improve code

// Step 1: RED
void main() {
  test('calculator adds numbers', () {
    final calc = Calculator();
    expect(calc.add(2, 3), 5); // FAILS
  });
}

// Step 2: GREEN
class Calculator {
  int add(int a, int b) => a + b; // PASS
}

// Step 3: REFACTOR
// Extract method, improve naming, etc.`
      }
    },
    questions: [
      { type: "Theoretical", question: "Benefits and challenges of TDD?", difficulty: 3 },
      { type: "Practical", question: "Practice TDD on FizzBuzz", difficulty: 3 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم TDD cycle"], redFlags: ["writes tests after code"], greenFlags: ["practices red-green-refactor"] },
    linkedCards: { prerequisites: ["testing-mocking"], nextSteps: [{ id: "clean-architecture-intro", title: "Clean Architecture Intro" }], related: [] },
    quickRevision: { bulletPoints: ["Red = failing", "Green = passing", "Refactor = improve"], memoryHook: "TDD = test first", cheatSheet: "Quick reference" },
    companyTags: ["International", "Valeo"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Major" }
  },

  // ==================== LEVEL 3: CLEAN ARCHITECTURE (36-45) ====================

  // CARD 36
  {
    id: "clean-architecture-intro",
    number: 36,
    title: "Clean Architecture Intro",
    titleAr: "مقدمة في الهندسة النظيفة",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "Clean Architecture"],
    definition: {
      summary: "Layers, dependency rule, separation of concerns",
      detailed: "Clean Architecture separates code into layers with dependencies pointing inward. Domain at center, frameworks at edges.",
      keyPoints: ["Domain layer (center)", "Use cases layer", "Interface adapters", "Frameworks layer", "Dependency rule"],
      codeExample: {
        language: "dart",
        code: `// Layer Structure:
// lib/
// ├── domain/          # Entities, repositories (abstract)
// ├── usecases/        # Business logic
// ├── data/            # Repositories (impl), models
// └── presentation/    # UI, controllers

// Domain (no dependencies)
abstract class UserRepository {
  Future<User> getUser(String id);
}

// Data (depends on domain)
class UserRepositoryImpl implements UserRepository {
  final ApiClient _api;
  UserRepositoryImpl(this._api);
  
  @override
  Future<User> getUser(String id) => _api.get('/users/$id');
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "Explain Clean Architecture layers", difficulty: 3 },
      { type: "System Design", question: "Apply Clean Architecture to Flutter app", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم separation of concerns"], redFlags: ["mixes UI with business logic"], greenFlags: ["follows dependency rule"] },
    linkedCards: { prerequisites: ["testing-tdd"], nextSteps: [{ id: "layered-architecture", title: "Layered Architecture" }], related: [] },
    quickRevision: { bulletPoints: ["Domain = center", "Dependencies inward", "Frameworks outer"], memoryHook: "Onion architecture", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 37
  {
    id: "layered-architecture",
    number: 37,
    title: "Layered Architecture",
    titleAr: "الهندسة الطبقية",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "Clean Architecture"],
    definition: {
      summary: "Presentation, Domain, Data layers with clear boundaries",
      detailed: "Three-layer architecture: Presentation (UI), Domain (business logic), Data (persistence).",
      keyPoints: ["Presentation layer", "Domain layer", "Data layer", "Clear boundaries", "Layer communication"],
      codeExample: {
        language: "dart",
        code: `// Presentation Layer
class UserController extends ChangeNotifier {
  final GetUserUseCase _getUser;
  
  UserController(this._getUser);
  
  Future<void> loadUser(String id) async {
    final user = await _getUser(id);
    // Update UI
  }
}

// Domain Layer
class GetUserUseCase {
  final UserRepository _repo;
  GetUserUseCase(this._repo);
  
  Future<User> call(String id) => _repo.getById(id);
}

// Data Layer
class UserRepositoryImpl implements UserRepository {
  final ApiClient _api;
  UserRepositoryImpl(this._api);
  
  @override
  Future<User> getById(String id) async {
    final response = await _api.get('/users/$id');
    return UserModel.fromJson(response);
  }
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "Responsibilities of each layer?", difficulty: 3 },
      { type: "Practical", question: "Refactor messy code into layers", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفصل concerns"], redFlags: ["business logic in UI"], greenFlags: ["clear layer boundaries"] },
    linkedCards: { prerequisites: ["clean-architecture-intro"], nextSteps: [{ id: "feature-based-structure", title: "Feature-Based Structure" }], related: [] },
    quickRevision: { bulletPoints: ["Presentation = UI", "Domain = logic", "Data = persistence"], memoryHook: "3 layers = clean code", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 38
  {
    id: "feature-based-structure",
    number: 38,
    title: "Feature-Based Structure",
    titleAr: "هيكل قائم على الميزات",
    level: "Mid",
    frequency: "Common",
    tags: ["Architecture", "Project Structure"],
    definition: {
      summary: "Organize by feature not layer, co-locate related files",
      detailed: "Feature-based structure groups related files by feature rather than technical layer, improving cohesion.",
      keyPoints: ["Feature folders", "Co-located files", "Feature independence", "Shared resources", "Scalable structure"],
      codeExample: {
        language: "dart",
        code: `// lib/
// ├── features/
// │   ├── auth/
// │   │   ├── data/
// │   │   │   ├── auth_repository.dart
// │   │   │   └── models/
// │   │   ├── domain/
// │   │   │   └── auth_usecases.dart
// │   │   └── presentation/
// │   │       ├── login_screen.dart
// │   │       └── auth_controller.dart
// │   └── profile/
// │       └── ...
// └── core/
//     ├── utils/
//     └── widgets/

// Feature module
class AuthFeature {
  static List<Provider> providers = [
    Provider(create: (_) => AuthRepository()),
    Provider(create: (c) => LoginUseCase(c.read())),
  ];
}`
      }
    },
    questions: [
      { type: "Critical Thinking", question: "Feature-based vs Layer-based - pros/cons?", difficulty: 3 },
      { type: "System Design", question: "Structure large Flutter app by features", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم scalability"], redFlags: ["giant lib folder"], greenFlags: ["clear feature boundaries"] },
    linkedCards: { prerequisites: ["layered-architecture"], nextSteps: [{ id: "usecase-pattern", title: "UseCase Pattern" }], related: [] },
    quickRevision: { bulletPoints: ["Feature = cohesion", "Co-locate files", "Scale better"], memoryHook: "Feature = mini-app", cheatSheet: "Quick reference" },
    companyTags: ["Swvl", "MaxAB"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 39
  {
    id: "usecase-pattern",
    number: 39,
    title: "UseCase Pattern",
    titleAr: "نمط حالة الاستخدام",
    level: "Mid",
    frequency: "Common",
    tags: ["Architecture", "Clean Architecture"],
    definition: {
      summary: "Encapsulate single business operation in use case class",
      detailed: "Each use case represents one business operation, making business logic testable and reusable.",
      keyPoints: ["Single responsibility", "Callable classes", "Input/Output DTOs", "Reusable business logic"],
      codeExample: {
        language: "dart",
        code: `// UseCase base class
abstract class UseCase<Type, Params> {
  Future<Type> call(Params params);
}

class LoginParams {
  final String email;
  final String password;
  LoginParams(this.email, this.password);
}

class LoginUseCase implements UseCase<User, LoginParams> {
  final AuthRepository _repo;
  LoginUseCase(this._repo);
  
  @override
  Future<User> call(LoginParams params) async {
    if (!EmailValidator.isValid(params.email)) {
      throw ValidationException('Invalid email');
    }
    return _repo.login(params.email, params.password);
  }
}`
      }
    },
    questions: [
      { type: "Practical", question: "Implement use case for user registration", difficulty: 3 },
      { type: "Critical Thinking", question: "When to use use cases vs direct repo calls?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم business logic separation"], redFlags: ["no use cases"], greenFlags: ["proper use case granularity"] },
    linkedCards: { prerequisites: ["feature-based-structure"], nextSteps: [{ id: "bloc-pattern", title: "BLoC Pattern" }], related: [] },
    quickRevision: { bulletPoints: ["UseCase = one operation", "Callable class", "Testable"], memoryHook: "UseCase = single action", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 40
  {
    id: "bloc-pattern",
    number: 40,
    title: "BLoC Pattern",
    titleAr: "نمط BLoC",
    level: "Mid",
    frequency: "Critical",
    tags: ["State Management", "Flutter", "Architecture"],
    definition: {
      summary: "Business Logic Component - separate UI from business logic",
      detailed: "BLoC pattern separates presentation from business logic using Streams. Events in, States out.",
      keyPoints: ["Events trigger changes", "States represent UI", "Business logic in BLoC", "Stream-based", "Testable"],
      codeExample: {
        language: "dart",
        code: `// Events
abstract class CounterEvent {}
class Increment extends CounterEvent {}
class Decrement extends CounterEvent {}

// States
class CounterState {
  final int count;
  CounterState(this.count);
}

// BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<Increment>((event, emit) => emit(CounterState(state.count + 1)));
    on<Decrement>((event, emit) => emit(CounterState(state.count - 1)));
  }
}

// UI
BlocBuilder<CounterBloc, CounterState>(
  builder: (context, state) {
    return Text('\${state.count}');
  },
)`
      }
    },
    questions: [
      { type: "Practical", question: "Implement BLoC for login flow", difficulty: 3 },
      { type: "System Design", question: "BLoC vs Provider - when to use each?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم BLoC pattern"], redFlags: ["business logic in UI"], greenFlags: ["proper event/state separation"] },
    linkedCards: { prerequisites: ["usecase-pattern"], nextSteps: [{ id: "provider-pattern", title: "Provider Pattern" }], related: [] },
    quickRevision: { bulletPoints: ["Events in", "States out", "BLoC = logic"], memoryHook: "BLoC = Stream controller", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Critical" }
  },

  // CARD 41
  {
    id: "provider-pattern",
    number: 41,
    title: "Provider Pattern",
    titleAr: "نمط Provider",
    level: "Junior",
    frequency: "Critical",
    tags: ["State Management", "Flutter"],
    definition: {
      summary: "InheritedWidget wrapper for dependency injection and state management",
      detailed: "Provider is a wrapper around InheritedWidget for easy DI and state management. Recommended by Flutter team.",
      keyPoints: ["ChangeNotifierProvider", "Consumer widget", "context.watch/read", "MultiProvider", "Dependency injection"],
      codeExample: {
        language: "dart",
        code: `// Define model
class Counter extends ChangeNotifier {
  int _count = 0;
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
}

// Provide
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => Counter(),
      child: MyApp(),
    ),
  );
}

// Consume
class CounterDisplay extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = context.watch<Counter>();
    return Text('\${counter.count}');
  }
}`
      }
    },
    questions: [
      { type: "Practical", question: "Set up Provider for user authentication", difficulty: 2 },
      { type: "Deep Dive", question: "Provider vs InheritedWidget", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يعرف Provider"], redFlags: ["setState for global state"], greenFlags: ["proper provider usage"] },
    linkedCards: { prerequisites: ["bloc-pattern"], nextSteps: [{ id: "riverpod-intro", title: "Riverpod Intro" }], related: [] },
    quickRevision: { bulletPoints: ["Provider = DI + State", "ChangeNotifier", "context.watch"], memoryHook: "Provider = Flutter's Redux", cheatSheet: "Quick reference" },
    companyTags: ["All Companies"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Critical" }
  },

  // CARD 42
  {
    id: "riverpod-intro",
    number: 42,
    title: "Riverpod Intro",
    titleAr: "مقدمة في Riverpod",
    level: "Mid",
    frequency: "Common",
    tags: ["State Management", "Flutter"],
    definition: {
      summary: "Compile-safe, testable, scalable state management",
      detailed: "Riverpod is Provider's successor. Compile-safe, doesn't depend on Flutter, supports multiple providers.",
      keyPoints: ["Compile-safe", "No BuildContext needed", "AutoDispose", "Family providers", "Future/Stream providers"],
      codeExample: {
        language: "dart",
        code: `// Simple provider
final counterProvider = StateProvider<int>((ref) => 0);

// Future provider
final userProvider = FutureProvider<User>((ref) async {
  final repo = ref.watch(userRepositoryProvider);
  return repo.getCurrentUser();
});

// Notifier
class Counter extends StateNotifier<int> {
  Counter() : super(0);
  void increment() => state++;
}

final counterNotifierProvider = StateNotifierProvider<Counter, int>((ref) {
  return Counter();
});

// Usage
Consumer(builder: (context, ref, child) {
  final count = ref.watch(counterProvider);
  return Text('$count');
})`
      }
    },
    questions: [
      { type: "Practical", question: "Migrate from Provider to Riverpod", difficulty: 3 },
      { type: "Critical Thinking", question: "Riverpod vs BLoC - when to choose?", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم modern state management"], redFlags: ["only knows setState"], greenFlags: ["mentions compile safety"] },
    linkedCards: { prerequisites: ["provider-pattern"], nextSteps: [{ id: "getx-pattern", title: "GetX Pattern" }], related: [] },
    quickRevision: { bulletPoints: ["Compile-safe", "No context", "AutoDispose"], memoryHook: "Riverpod = Provider 2.0", cheatSheet: "Quick reference" },
    companyTags: ["Swvl", "MaxAB"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 43
  {
    id: "getx-pattern",
    number: 43,
    title: "GetX Pattern",
    titleAr: "نمط GetX",
    level: "Junior",
    frequency: "Common",
    tags: ["State Management", "Flutter"],
    definition: {
      summary: "Lightweight, high-performance state management and routing",
      detailed: "GetX is a micro-framework combining state management, dependency injection, and route management.",
      keyPoints: ["Reactive state", "Simple syntax", "Route management", "Dependency injection", "Lightweight"],
      codeExample: {
        language: "dart",
        code: `// Controller
class CounterController extends GetxController {
  final count = 0.obs;
  
  void increment() => count.value++;
}

// Bind controller
class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => CounterController());
  }
}

// UI
class HomePage extends StatelessWidget {
  final controller = Get.find<CounterController>();
  
  @override
  Widget build(BuildContext context) {
    return Obx(() => Text('\${controller.count}'));
  }
}

// Routing
Get.to(() => DetailPage());
Get.back();`
      }
    },
    questions: [
      { type: "Practical", question: "Set up GetX for navigation and state", difficulty: 2 },
      { type: "Critical Thinking", question: "GetX pros/cons vs other solutions", difficulty: 3 }
    ],
    interviewerMind: { whatTheyWant: ["يعرف GetX basics"], redFlags: ["uses GetX for everything"], greenFlags: ["understands trade-offs"] },
    linkedCards: { prerequisites: ["riverpod-intro"], nextSteps: [{ id: "mobx-pattern", title: "MobX Pattern" }], related: [] },
    quickRevision: { bulletPoints: [".obs = reactive", "Get.find = DI", "Get.to = routing"], memoryHook: "GetX = all-in-one", cheatSheet: "Quick reference" },
    companyTags: ["Freelance", "Startups"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 44
  {
    id: "mobx-pattern",
    number: 44,
    title: "MobX Pattern",
    titleAr: "نمط MobX",
    level: "Mid",
    frequency: "Rare",
    tags: ["State Management", "Flutter", "Reactive"],
    definition: {
      summary: "Observable state, actions, reactions - transparent reactive programming",
      detailed: "MobX uses observables that automatically trigger reactions when changed. Transparent functional reactive programming.",
      keyPoints: ["@observable", "@action", "@computed", "Observer widget", "Reactions"],
      codeExample: {
        language: "dart",
        code: `import 'package:mobx/mobx.dart';

part 'counter.g.dart';

class Counter = _Counter with _$Counter;

abstract class _Counter with Store {
  @observable
  int count = 0;
  
  @computed
  bool get isEven => count % 2 == 0;
  
  @action
  void increment() {
    count++;
  }
}

// UI
Observer(builder: (_) {
  return Text('\${counter.count}');
})`
      }
    },
    questions: [
      { type: "Practical", question: "Implement MobX store for todo list", difficulty: 3 },
      { type: "Deep Dive", question: "MobX reactivity mechanism", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم reactive programming"], redFlags: ["mutates state outside actions"], greenFlags: ["proper action usage"] },
    linkedCards: { prerequisites: ["getx-pattern"], nextSteps: [{ id: "redux-pattern", title: "Redux Pattern" }], related: [] },
    quickRevision: { bulletPoints: ["@observable = state", "@action = modify", "Observer = react"], memoryHook: "MobX = transparent reactivity", cheatSheet: "Quick reference" },
    companyTags: ["International"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Moderate" }
  },

  // CARD 45
  {
    id: "redux-pattern",
    number: 45,
    title: "Redux Pattern",
    titleAr: "نمط Redux",
    level: "Mid",
    frequency: "Rare",
    tags: ["State Management", "Flutter"],
    definition: {
      summary: "Single source of truth, actions, reducers, unidirectional data flow",
      detailed: "Redux centralizes state in a single store. State changes through actions processed by reducers.",
      keyPoints: ["Single store", "Actions describe changes", "Reducers process actions", "Unidirectional flow", "Middleware for side effects"],
      codeExample: {
        language: "dart",
        code: `// State
class AppState {
  final int counter;
  AppState({this.counter = 0});
}

// Action
class IncrementAction {}

// Reducer
AppState reducer(AppState state, dynamic action) {
  if (action is IncrementAction) {
    return AppState(counter: state.counter + 1);
  }
  return state;
}

// Store
final store = Store<AppState>(
  reducer,
  initialState: AppState(),
);

// UI
StoreConnector<AppState, int>(
  converter: (store) => store.state.counter,
  builder: (context, count) {
    return Text('$count');
  },
)`
      }
    },
    questions: [
      { type: "Theoretical", question: "Redux vs other state management - when to use?", difficulty: 3 },
      { type: "System Design", question: "Scale Redux for large application", difficulty: 4 }
    ],
    interviewerMind: { whatTheyWant: ["يفهم unidirectional flow"], redFlags: ["over-engineers small apps"], greenFlags: ["knows when to use"] },
    linkedCards: { prerequisites: ["mobx-pattern"], nextSteps: [{ id: "list-view-optimization", title: "ListView Optimization" }], related: [] },
    quickRevision: { bulletPoints: ["Store = single source", "Actions = intent", "Reducers = pure functions"], memoryHook: "Redux = predictable state", cheatSheet: "Quick reference" },
    companyTags: ["International"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Moderate" }
  }
];

export const getCardById = (id: string): Card | undefined => {
  return cards.find(card => card.id === id);
};

export const getCardsByLevel = (level: string): Card[] => {
  return cards.filter(card => card.level === level);
};

export const getCardsByTag = (tag: string): Card[] => {
  return cards.filter(card => card.tags.includes(tag));
};

export const getCardsByCompany = (company: string): Card[] => {
  return cards.filter(card => card.companyTags.includes(company));
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  cards.forEach(card => card.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
};

export const getAllCompanies = (): string[] => {
  const companies = new Set<string>();
  cards.forEach(card => card.companyTags.forEach(company => companies.add(company)));
  return Array.from(companies).sort();
};

export const getPrerequisites = (cardId: string): Card[] => {
  const card = getCardById(cardId);
  if (!card) return [];
  return cards.filter(c => card.linkedCards.prerequisites.includes(c.id));
};

export const getNextSteps = (cardId: string): Card[] => {
  const card = getCardById(cardId);
  if (!card) return [];
  return cards.filter(c => card.linkedCards.nextSteps.some(ns => ns.id === c.id));
};
