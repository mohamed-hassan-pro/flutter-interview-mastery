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
      summary: "فهم الفروق الجوهرية بين final, const, var, dynamic, Object?",
      detailed: "متغيرات `final` تُعطى قيمتها مرة واحدة فقط أثناء التشغيل (Runtime)، أما `const` فهي ثوابت يتم تحديدها قبل التشغيل (Compile-time). استخدام `var` يسمح للغة بتحديد النوع تلقائياً، بينما `dynamic` يلغي فحص النوع تماماً (يجب تجنبه). `Object?` هو الجذر الأساسي لأي نوع في Dart ويُفضل على `dynamic` للحفاظ على الأمان.",
      analogy: "`final` مثل صندوق يُقفل بمجرد وضع شيء فيه اليوم. `const` مثل صندوق تم نحته من الصخر في المصنع (معروف مسبقاً). `var` صندوق يأخذ شكل أول شيء يوضع فيه. `dynamic` صندوق سحري يقبل أي شيء في أي وقت لكنه خطر.",
      keyPoints: [
        "final: قيمة ثابتة يتم تحديدها وقت التشغيل (Runtime).",
        "const: قيمة ثابتة يتم تحديدها صراحة وقت الترجمة (Compile-time).",
        "var: استنتاج النوع التلقائي (Type Inference).",
        "dynamic: إيقاف فحص النوع (Runtime checking) - تجنب استخدامه.",
        "Object?: يمكن أن يقبل أي نوع ولكنه يحتفظ بأمان الأنواع (Type-safe)."
      ],
      codeExample: {
        language: "dart",
        code: `final now = DateTime.now(); // صحيح: القيمة تتحدد الآن
const pi = 3.14; // صحيح: القيمة معروفة دائماً
// const current = DateTime.now(); // ❌ خطأ: الوقت غير معروف قبل التشغيل

var name = 'Ali'; // Dart تعرف أنه String
dynamic unknown = 42;
unknown = 'Text'; // ❌ مسموح، لكنه تصميم سيء ويسبب مشاكل

Object? safeUnknown = 42;
// safeUnknown = 'Text'; // مسموح، لكن يتطلب Type Casting لاحقاً`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the exact difference between final and const?",
        questionAr: "ما هو الفرق الدقيق بين final و const؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "final يتم تقييمها وقت التشغيل (Runtime).",
            "const يتم تقييمها وقت الترجمة (Compile-time).",
            "كل const هو بالضرورة final، لكن العكس غير صحيح."
          ],
          timeToAnswer: "1 min"
        }
      },
      {
        type: "Practical",
        question: "When should you use Object? instead of dynamic?",
        questionAr: "متى يجب استخدام Object? بدلاً من dynamic؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "يُستخدم `Object?` عندما لا تعرف نوع البيانات القادمة (مثل API response).",
            "يجبرك `Object?` على التحقق من النوع (Type Checking) قبل استخدامه.",
            "استخدام `dynamic` يلغي الأمان تماماً وقد يسبب مشاكل في التطبيق."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["أن تفهم كيف تؤثر المتغيرات على الذاكرة والأداء.", "فهم متى تتجنب استخدام dynamic لحماية التطبيق."],
      redFlags: ["استخدام dynamic كبديل للأنواع غير المعروفة دائماً.", "عدم التفريق بين وقت التشغيل (Runtime) ووقت الترجمة (Compile-time)."],
      greenFlags: ["ذكر مفهوم Canonicalization مع const وكيف يوفر الذاكرة."]
    },
    linkedCards: {
      prerequisites: ["null-safety-master"],
      nextSteps: [{ id: "functions-advanced", title: "Functions Advanced" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "محاولة جعل متغير يعتمد على استدعاء دالة كـ const",
        whyWrong: "الدوال التي تعتمد على وقت التشغيل لا يمكن أن تكون قيمها compile-time constants.",
        correctApproach: "استخدم final بدلاً من const في هذه الحالة.",
        egyptianContext: "سؤال متكرر جداً في المقابلات التقنية لاختبار فهمك لدورة حياة المتغير."
      }
    ],
    answerStrategy: {
      structure: ["تعريف كل نوع", "المقارنة الأساسية (Runtime vs Compile-time)", "أمثلة حية"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "4 دق" },
      keyPhrases: ["Type Inference", "Canonicalization", "Type Safe"]
    },
    quickRevision: {
      bulletPoints: ["final = Runtime", "const = Compile-time", "var = Inferred", "dynamic = Risk"],
      memoryHook: "const أسمنت، final حجر، var طين يتشكل، dynamic هواء.",
      cheatSheet: "استخدم const كلما أمكن للودجات، final للمتغيرات الثابتة، وتجنب dynamic."
    },
    companyTags: ["Swvl", "MaxAB", "Instabug", "Talabat"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Moderate" }
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
      summary: "فهم متقدم لـ Higher-order functions, Closures, و Parameters",
      detailed: "الدوال في Dart تتعامل كـ First-class citizens؛ مما يعني أنه يمكن تمريرها كمتغيرات، وإرجاعها من دوال أخرى. يدعم Dart أنواع مختلفة من المعلمات (Parameters) مثل Named و Positional، بالإضافة إلى قوة الـ Closures لحفظ سياق المتغيرات.",
      analogy: "Higher-order function مثل المدير الذي يوزع مهام (دوال أخرى) على موظفيه. الـ Closure مثل الموظف الذي يحمل حقيبة بأدواته الخاصة (المتغيرات المحيطة به) بغض النظر عن متى طلبوا منه إنجاز المهمة.",
      keyPoints: [
        "Arrow functions (=>): اختصار للدوال التي تحتوي على سطر واحد فقط للإرجاع.",
        "Higher-order functions: دوال تستقبل أو ترجع دوال أخرى.",
        "Closures: دوال قادرة على تذكر والوصول لمتغيرات النطاق (Scope) حتى خارج دالتيها الأصلية.",
        "Named Parameters ({}): معلمات اختيارية بالاسم (ويمكن إجبارها بـ required).",
        "Positional Parameters ([]): معلمات اختيارية بالموضع."
      ],
      codeExample: {
        language: "dart",
        code: `// Arrow function
int add(int a, int b) => a + b;

// Higher-order function
void executeOperation(int a, int b, int Function(int, int) operation) {
  print(operation(a, b));
}

// Closure Example
Function makeMultiplier(int factor) {
  return (int x) => x * factor; // تتذكر قيمة factor هنا
}
var timesTwo = makeMultiplier(2);
print(timesTwo(4)); // Output: 8

// Parameters
void createUser({required String name, int? age, String role = 'User'}) {}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Explain what is a Closure in Dart with an example.",
        questionAr: "اشرح ما هو الـ Closure في Dart مع مثال تفصيلي.",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ Closure هي دالة كائنية (Function Object) لديها القدرة على الوصول للمتغيرات في المعجم المحيط بها (Lexical scope).",
            "يُمكّن الدالة من تذكر البيانات الموجودة وقت تعريفها حتى بعد انتهاء تشغيل الدالة المحيطة."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "What is the difference between Positional Array [] and Named Braces {} paramters?",
        questionAr: "ما هو الفرق الرئيسي بين الأقواس المعقوفة والأقواس المتعرجة في معلمات الدالة؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "[ ] تستخدم للمعلمات بالاختيارية بناءً على موضعها الترتيبي.",
            "{ } تستخدم للمعلمات المسماة (Named)، بحيث يجب ذكر اسم المعلمة عند التمرير، وتوفر مرونة الترتيب."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على كتابة كود وظيفي (Functional) ومرن.", "الوعي بتأثير الـ Closures على الذاكرة."],
      redFlags: ["الارتباك بين Named و Positional parameters.", "الاعتماد دائماً على الدوال التقليدية جهلاً بتوفر الـ Arrow functions."],
      greenFlags: ["ذكر أمثلة حية لاستخدام الـ Higher-order functions مثل .map() و .where() في القوائم."]
    },
    linkedCards: {
      prerequisites: ["variables-deep-dive"],
      nextSteps: [{ id: "collections-generics", title: "Collections & Generics" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تخزين دوال بداخل حلقات تكرار (Loops) بطريقة خاطئة",
        whyWrong: "توقّع أن الـ Closures تحتفظ بنسخة من القيمة بدلاً من النسخة الحية للمرجع، مما كان يسبب مشاكل في إصدارات قديمة من دارت.",
        correctApproach: "استخدام الـ Methods و Arrow functions لتبسيط الشفرة البرمجية وجعلها أكثر قابلية للقراءة.",
        egyptianContext: "يتم السؤال عنها لاختبار معرفتك العميقة بالذاكرة (Memory Leaks)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ First-class functions", "أنواع المعلمات (Parameters)", "الـ Closures وأهميتها"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "5 دق" },
      keyPhrases: ["Lexical Scope", "First-class citizens", "Higher-order"]
    },
    quickRevision: {
      bulletPoints: ["=> Arrow Function", "{ } Named Params", "[ ] Positional Params", "Closures = Captured Variables"],
      memoryHook: "Closures تحبس (Capture) الذكريات (المتغيرات) داخل الكود الخاص بها.",
      cheatSheet: "دائماً استخدم {required} للمعلمات الضرورية منعاً للـ Null errors."
    },
    companyTags: ["Instabug", "MaxAB", "Swvl", "Vodafone"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "High" }
  },

  // CARD 4
  {
    id: "collections-generics",
    number: 4,
    title: "Collections & Generics",
    titleAr: "المجموعات والأنواع العامة (Collections)",
    level: "Junior",
    frequency: "Critical",
    tags: ["Dart", "Data Structures"],
    definition: {
      summary: "فهم التعامل مع List و Set و Map والعمليات القوية المرتبطة بها مثل الـ Spread operator.",
      detailed: "في Dart، Collections تعتمد على نظام الـ Generics (مثل <List<int). الـ `List` ترتب بيانات متسلسلة يمكن تكرارها. الـ `Set` تحفظ قيماً فريدة فقط وتمنع التكرار (سريعة جداً في البحث). الـ `Map` تربط مفاتيح (Keys) فريدة بقيم. Dart يوفر مزايا متقدمة مثل `Collection if` و `Collection for` لبناء القوائم بذكاء واختصار.",
      analogy: "الـ List كطابور انتظار طويل. الـ Set كثلاجة مكتب لا يمكنك وضع علبتين عليهما نفس الاسم لتجنب الضياع. الـ Map كمكتبة مقسمة بعناوين دقيقة تسحب منها أرشيف رقم الموظف مباشرة.",
      keyPoints: [
        "List<E>: قائمة مرتبة تقبل القيم المكررة.",
        "Set<E>: مجموعة غير مرتبة، لا تقبل القيم المكررة، أسرع في البحث O(1).",
        "Map<K, V>: بيانات ثنائية مفتاح-وقيمة.",
        "Spread Operator (...): يفرد محتويات مصفوفة داخل مصفوفة أخرى.",
        "Collection if/for: تقنية وضع جمل الشرط والتكرار داخل ديكلاريشن المصفوفة مباشرة."
      ],
      codeExample: {
        language: "dart",
        code: `var list = [1, 2, 3, 3]; // مسموح التكرار
var uniqueSet = {1, 2, 3}; // إزالة التكرار تلقائياً
var map = {'name': 'Ali', 'role': 'Dev'};

// 🎯 السحر في دمج البيانات باستخدام Spread
var extraItems = [4, 5];
var combined = [0, ...list, ...extraItems];

// 🧠 بناء ذكي باستخدام Collection if & for
bool promoActive = true;
var menu = [
  'Home',
  'Profile',
  if (promoActive) 'Offers', // يضاف فقط في حالة true
  for (var i in extraItems) 'Item $i' // Loop داخل المصفوفة!
];`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why would you choose a Set over a List in Dart?",
        questionAr: "متى وبأي سبب تفضل استخدام الـ Set بدلاً من الـ List في Dart؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "للتأكد من عدم وجود بيانات مكررة (Unique elements).",
            "للبحث السريع عن البيانات `set.contains()` لأنها تعمل بـ O(1) مقارنة بـ O(n) في الـ List."
          ],
          timeToAnswer: "1 min"
        }
      },
      {
        type: "Practical",
        question: "Explain the Spread Operator (...) with an example.",
        questionAr: "اشرح معامل النشر Spread Operator وكيف يُستخدم لدمج مصفوفتين؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "يستخدم لفتح (Unpack) عناصر مجموعة داخل مجموعة أخرى بطريقة نظيفة.",
            "مثال: [...listA, ...listB] يدمجهما معاً.",
            "استخدام (...?) يفك المصفوفة فقط إذا لم تكن Null لمنع الانهيار."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على اختيار هيكلية البيانات المناسبة للمهمة.", "معرفتك باختصارات Dart لتقليل الكود Boilerplate."],
      redFlags: ["استخدام List دائماً حتى لو كانت البيانات فريدة وبحثها مكرر.", "استخدام addAll بدلاً من Spread operator في بناء الـ UI."],
      greenFlags: ["استخدام Collection if في بناء الواجهات برمجياً بشكل نظيف."]
    },
    linkedCards: {
      prerequisites: ["variables-deep-dive"],
      nextSteps: [{ id: "oop-basics", title: "OOP Basics" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "محاولة إضافة عناصر باستخدام .add() داخل شجرة ويدجات Flutter",
        whyWrong: "الشفرة ستصبح قبيحة وغير مقروءة.",
        correctApproach: "استخدام Spread operator (...) و Collection if لحقن الويدجات بذكاء كـ Declarative UI.",
        egyptianContext: "يتم فحص هذا في الكود ريفيو (Code Reviews) للشركات القوية لضمان نظافة واجهات المستخدم."
      }
    ],
    answerStrategy: {
      structure: ["الفروقات الثلاثة (List/Set/Map) بوظائفها ومميزاتها", "أمثلة على Collection if / spread operator."],
      timeAllocation: { junior: "2 دق", mid: "4 دق", senior: "5 دق" },
      keyPhrases: ["Time Complexity O(1)", "Spread syntax", "Immutable collections"]
    },
    quickRevision: {
      bulletPoints: ["List = تكرار وترتيب", "Set = مفردة وغير مرتبة O(1)", "Map = مفتاح وقيمة", "Spread = ...list", "Collection if = `[if(x) Y]`"],
      memoryHook: "القائمة للسوبر ماركت، الماب للقاموس، السيت لبصمة الإصبع.",
      cheatSheet: "لتحويل List إلى بيانات غير مكررة استخدم: `list.toSet().toList()`"
    },
    companyTags: ["Instabug", "Swvl", "Fawry", "ITWorx"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 5
  {
    id: "oop-basics",
    number: 5,
    title: "OOP Basics in Dart",
    titleAr: "أساسيات البرمجة كائنية التوجه (OOP)",
    level: "Junior",
    frequency: "Critical",
    tags: ["Dart", "OOP", "Architecture"],
    definition: {
      summary: "فهم الكائنات والكلاسات، الوراثة (Inheritance)، التجريد (Abstraction)، التغليف (Encapsulation)، وتعدد الأوجه (Polymorphism).",
      detailed: "لغة Dart مبنية كلياً على الـ OOP السليم. كل ميزة أو مفهوم فيها يعود لجذر الـ Object (ما عدا الـ null). يشمل الـ OOP تجميع المتغيرات والدوال المتعلقة بشيء واحد داخل هيكل (Class). التغليف يحمي البيانات عن طريق المتغيرات الخاصة (التي تُكتب تبدأ بـ `_` في Dart). الوراثة تقلل تكرار الكود. التجريد يركز على الملامح المهمة ويخفي التنفيذ.",
      analogy: "الفرن هو (الكلاس - Class)، البيتزا المخبوزة هي (الكائن - Object). طريقة الحشوة وتخزينها سرية بداخل المطبخ (التغليف - Encapsulation). البيتزا قد تكون باللحم أو الدجاج لكن كلاهما 'بيتزا' (تعدد الأوجه - Polymorphism).",
      keyPoints: [
        "Encapsulation: إخفاء البيانات بجعلها خاصة وتبدأ بـ Underscore `_`.",
        "Inheritance (\`extends\`): كلاس فرعي يرث من كلاس أب، لا تدعم Dart الوراثة المتعددة مباشرة.",
        "Polymorphism: الكلاس الفرعي يستطيع أخذ شكل الكلاس الأب عند إدراجه في قوائم.",
        "Abstraction: توفير القالب المعماري فقط عن طريق \`abstract class\` لاستخدامه كواجهة حماية لاحقة."
      ],
      codeExample: {
        language: "dart",
        code: `// Encapsulation (التغليف)
class BankAccount {
  double _balance; // متغير خاص

  BankAccount(this._balance);

  // Getter للوصول الآمن للبيانات
  double get balance => _balance;

  // Setter لوضع شروط قبل التعديل
  set deposit(double amount) {
    if (amount > 0) _balance += amount;
  }
}

// Inheritance & Polymorphism (الوراثة وتعدد الأوجه)
class Animal {
  void speak() => print('صوت حيوان');
}

class Dog extends Animal {
  @override
  void speak() => print('Woof'); // Override
}

void play(Animal animal) {
  animal.speak(); // تعدد الأوجه يعمل هنا
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "How does Dart handle 'private' fields and methods compared to Java?",
        questionAr: "كيف تدير Dart المتغيرات الخاصة (Private) مقارنة بـ Java أو C#؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "في Dart، لا يوجد كلمات محجوزة مثل \`private\` أو \`public\`.",
            "بدلاً من ذلك، المتغير أو الدالة التي تبدأ بـ \`_\` تصبح خاصة على مستوى الملف (Library Level) وليس فقط الكلاس نفسه."
          ],
          timeToAnswer: "1.5 mins"
        }
      },
      {
        type: "Theoretical",
        question: "What is Polymorphism and give a real-life Dart example?",
        questionAr: "اشرح تعدد الأوجه (Polymorphism) وكيف نستفيد منه في تطبيق تجاري؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "تعدد الأوجه يعني قدرة الكائنات المختلفة على الاستجابة لنفس الدالة بطرق مختلفة.",
            "تطبيق تجاري: قائمة مدفوعات \`List<PaymentMethod>\`. كلاس الپاي بال، وكلاس الفيزا يمتلكان الدالة \`pay()\`. عند التكرار عبر القائمة ومنتاداة \`.pay()\` سينفذ كل كلاس المنطق الخاص به دون الحاجة لشروط \`if\`."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تطبيق المفاهيم برمجياً بدوافع وأسباب منطقية، ليس مجرد تسميع الحفظ.", "التأكد من فهمك للتحكم في الوصول (Getters and Setters)."],
      redFlags: ["جعل كافة المتغيرات العامة (Public).", "استخدام \`extends\` بكثرة للتهرب من إعادة بناء الكود بذكاء، وبناء تسلسل هرمي عميق جداً ومعقد."],
      greenFlags: ["إدراك أن الخصوصية في Dart تعمل على مستوى الملف (Library privacy) وليس الكلاس (Class privacy)."]
    },
    linkedCards: {
      prerequisites: ["variables-deep-dive"],
      nextSteps: [{ id: "inheritance-composition", title: "Inheritance vs Composition" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل كلاس واحد عظيم يحتوي على كل أنواع الدوال في التطبيق (God Class).",
        whyWrong: "لأن هذا ينتهك مبدأ Single Responsibility.",
        correctApproach: "فصل المهام عبر Composition بدلاً من Inheritance، وتقسيم الكلاسات بشكل منطقي.",
        egyptianContext: "سؤال أساسي في أي مقابلة تقنية متوسطة (Mid-level) في الشركات الكبرى (Software House)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ 4 قواعد للـ OOP", "التطبيق في مثال حقيقي ملموس (مثل وسائل الدفع)", "توضيح حدود الـ Dart (عدم وجود وراثة متعددة)"],
      timeAllocation: { junior: "4 دق", mid: "5 دق", senior: "4 دق" },
      keyPhrases: ["Library-level privacy", "Code Reusability", "Composition over Inheritance"]
    },
    quickRevision: {
      bulletPoints: ["Encapsulation: إخفاء البيانات بـ \`_\`", "Inheritance: إعادة استخدام بـ \`extends\`", "Polymorphism: نفس الدالة تتغير حسب الكائن", "Abstraction: القالب المعماري المخفي للصناعة"],
      memoryHook: "الأب يورث (Extends)، القلعة تخفي (Encapsulation)، البطل يغير شكله (Polymorphism).",
      cheatSheet: "الـ Private في Dart على مستوى الفايل كله مش الكلاس بس!."
    },
    companyTags: ["Robusta", "Valeo", "Talabat", "MaxAB", "Instabug"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 6
  {
    id: "inheritance-composition",
    number: 6,
    title: "Inheritance vs Composition",
    titleAr: "الوراثة مقابل التركيب (Inheritance vs Composition)",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "OOP", "Design Patterns"],
    definition: {
      summary: "متى تستخدم extends (الوراثة) ومتى تستفيد من Composition (التركيب) لتصميم مرن.",
      detailed: "الوراثة تمثل علاقة 'هو كذا' (Is-a)، بينما التركيب يمثل علاقة 'يملك كذا' (Has-a). في هندسة البرمجيات الحديثة، يُفضل استخدام الـ Composition على الـ Inheritance. الوراثة العميقة تجعل الكود هشاً وصعب التعديل (Fragile Base Class Problem)، بينما التركيب يجعلك تجمع المكونات الصغيرة كالمكعبات لتبني كائناً معقداً بسهولة ومرونة.",
      analogy: "الوراثة: 'السيارة هي مركبة'. إذا أضفنا أجنحة للمركبة، ستطير السيارة بالخطأ! التركيب: 'السيارة تمتلك محركاً، وتمتلك عجلات'. إذا أردنا طائرة، نركب محركاً ونركب أجنحة دون إجبار بقية المركبات على الطيران.",
      keyPoints: [
        "Inheritance (\`extends\`): توريث كامل للتطبيق (Implementation).",
        "Composition (Has-a): حقن كلاس داخل كلاس آخر كمتغير.",
        "يفضل الـ Composition لأنه يوفر Decoupling (فك الارتباط التام) بين المكونات.",
        "Liskov Substitution Principle (LSP): يجب أن يكون الكلاس الفرعي قادراً على الحلول محل الأب دون كسر التطبيق."
      ],
      codeExample: {
        language: "dart",
        code: `// ❌ Inheritance (is-a) - قد يسبب مشاكل مع التوسع
class Animal { void move() => print('يتحرك'); }
class Bird extends Animal { void fly() => print('يطير'); }
class Ostrich extends Bird { 
  @override
  void fly() => throw Exception('النعام لا يطير!'); // كسر مبدأ Liskov!
}

// ✅ Composition (has-a) - الحل السليم
class Engine { void start() => print('Vroom'); }
class Wheels { void roll() => print('Rolling'); }

class Car {
  final Engine engine; 
  final Wheels wheels;
  
  // Dependency Injection عبر التركيب
  Car(this.engine, this.wheels);
  
  void drive() {
    engine.start();
    wheels.roll();
  }
}`
      }
    },
    questions: [
      {
        type: "Critical Thinking",
        question: "Why is 'Composition over Inheritance' considered a best practice?",
        questionAr: "لماذا يُعتبر مبدأ 'التركيب يغلب الوراثة' من أفضل الممارسات الهندسية؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "المرونة: يمكن تغيير سلوك الكائن أثناء التشغيل بتبديل المكونات (Dependency Injection).",
            "يمنع مشكلة الفصيلة الأساسية الهشة (Fragile Base Class problem).",
            "يسهل عملية الاختبار (Unit Testing) لأن المكونات منفصلة وسهلة الـ Mocking."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "System Design",
        question: "How would you design a 'Notification System' (Email, SMS, Push) using Composition?",
        questionAr: "كيف تصمم نظام إشعارات يدعم (إيميل، رسائل قصيرة، إشعارات هاتف) باستخدام التركيب (Composition)؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "إنشاء إنترفيس (Interface) عام اسمه \`MessageSender\`.",
            "إنشاء كلاسات مثل \`EmailSender\` و \`SmsSender\` تُطبق هذا الإنترفيس.",
            "في كلاس \`NotificationService\`، نقوم بـ Composition لكلاس \`MessageSender\` داخله، ونحقنه بالنوع المطلوب وقت الاستدعاء."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تفكير معماري سليم بدلاً من مجرد مبرمج كود.", "فهم عملي لمبادئ SOLID وتحديداً مبدأ Single Responsibility ومبدأ Open/Closed."],
      redFlags: ["الاعتماد الأعمى على \`extends\` لكل شيء.", "تسلسل هرمي عميق جداً للكلاسات (Deep Inheritance Tree)."],
      greenFlags: ["استخدام مصطلحات مثل Dependency Injection و Decoupling بقوة وثقة."]
    },
    linkedCards: {
      prerequisites: ["oop-basics"],
      nextSteps: [{ id: "mixins-power", title: "Mixins Power" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل كلاس \`BaseViewModel\` كبير جداً تورث منه كل واجهات التطبيق.",
        whyWrong: "سيصبح هذا الكلاس 'God Class' وستنتقل الأخطاء والموارد غير المستخدمة لجميع الواجهات.",
        correctApproach: "التركيب: عمل كلاس للـ \`ErrorHandler\` وكلاس للـ \`AuthHelper\` وتمريرها لمن يطلبها.",
        egyptianContext: "شائعة جداً في مشاريع الفلاتر القديمة (Legacy Code) في الشركات المحلية."
      }
    ],
    answerStrategy: {
      structure: ["تعريف التركيب والوراثة", "توضيح مشكلة الوراثة العميقة", "أمثلة حقيقية بـ فك الارتباط (Decoupling)"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "4 دق" },
      keyPhrases: ["Is-a vs Has-a", "Decoupling", "Fragile Base Class"]
    },
    quickRevision: {
      bulletPoints: ["extends = Is-A (هش)", "Composition = Has-A (مرن وDecoupled)", "دائماً فضل Composition"],
      memoryHook: "لا تبني إنساناً آلياً من قطعة واحدة، ابنِه من أجزاء تتبدل بسهولة (Composition).",
      cheatSheet: "إذا شككت في استخدام extends، جرب حقن الكلاس داخل الـ Constructor أولاً."
    },
    companyTags: ["Valeo", "Thndr", "Talon", "Bosta"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 7
  {
    id: "mixins-power",
    number: 7,
    title: "Mixins Power in Dart",
    titleAr: "قوة الـ Mixins",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "OOP", "Code Reuse"],
    definition: {
      summary: "استخدام Mixins لمشاركة الكود بين الكلاسات المستقلة لحل أزمة غياب الوراثة المتعددة في Dart.",
      detailed: "في Dart، لا يمكن للكلاس أن يرث (\`extends\`) من أكثر من أب واحد حمايةً من مشكلة الدايموند (Diamond Problem). الـ Mixin هو الحل؛ فهو يتيح لك مزج ميزات وسلوكيات برمجية (Methods/Variables) بداخل الكلاس عبر كلمة \`with\`. لا يمكنك إنشاء كائن (Instance) من Mixin مباشرة.",
      analogy: "الوراثة (\`extends\`) مثل الأب اللي بتورث منه شكلك. الـ Mixin مثل 'كورس تدريبي' (طيران، سباحة، عزف). الـ Mixin مهارة تضاف لأي شخص بدون الحاجة لتغيير نسبه.",
      keyPoints: [
        "mixin: الكلمة المفتاحية لصياغته، ولا يمتلك Constructor.",
        "with: الكلمة المضافة للكلاس لاكتساب مهارات الـ Mixins.",
        "on: الكلمة المستخدمة لتقييد الـ Mixin بكلاسات معينة فقط.",
        "الترتيب مهم: في حالة تضارب أسماء الدوال، آخر ميكسن في القائمة يطغى على ما قبله."
      ],
      codeExample: {
        language: "dart",
        code: `mixin Logger {
  void log(String msg) => print('[LOG] $msg');
}

// التقييد بحالة معينة (يجب أن يكون من فصيلة Animal)
mixin Swimmer on Animal {
  void swim() => print('Swimming like a pro!');
}

class Animal {}

// يكتسب الكلاس وظائف اللوجر والسباحة دون وراثة متعددة
class Dolphin extends Animal with Logger, Swimmer {
  void chill() {
    log('Dolphin is chilling'); // قادمة من Logger
    swim(); // قادمة من Swimmer
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why doesn't Dart support Multiple Inheritance and how do Mixins solve it?",
        questionAr: "لماذا تمنع Dart الوراثة المتعددة وكيف تحل الـ Mixins الموقف؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لمنع مشكلة 'الماسة السامة' (Diamond Problem) حيث يحدث تعارض إذا كان الأبوين يمتلكان نفس الدالة.",
            "الـ Mixins تحل الموقف بمفهوم الخلط التسلسلي (Linearization).",
            "ترتيب الـ Mixins من اليسار لليمين يحدد من سيتغلب إذا تشابهت الدوال (الأخير يكسب)."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "How do you restrict a Mixin to be used only by specific classes?",
        questionAr: "كيف تُجبر المبرمجين أن الـ Mixin لا يعمل والتطبيق يرفض الـ Compile إلا مع كلاس محدد؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "باستخدام الكلمة المفتاحية \`on\` متبوعة باسم الإنترفيس أو الكلاس الأب المسموح له.",
            "مثال: \`mixin Validator on FormField\` يعني أن الفالديتور لا يمكن مسجه مع أي شيء خارج فورم."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تطبيقك العملي لـ Code Reusability بطريقة نظيفة.", "كيف تتعامل معماريات الفلاتر الحديثة مع الميكسنس لتخفيف الأوزان."],
      redFlags: ["الخبط العشوائي بين \`extends\` و \`with\` و \`implements\`.", "جهلك بترتيب الأولويات بين الميكسنس عند وضع فاصلة."],
      greenFlags: ["استخدام الـ \`on\` keyword لإظهار خبرة متقدمة في أمان الأنواع الموروثة (Type safety)."]
    },
    linkedCards: {
      prerequisites: ["inheritance-composition"],
      nextSteps: [{ id: "abstract-interfaces", title: "Abstract & Interfaces" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام Mixins لتمرير الحالات والبيانات (State) بين الكلاسات المتباعدة.",
        whyWrong: "الميكسن وظيفته الأساسية مشاركة 'سلوك' وليس 'حالة'.",
        correctApproach: "استخدم Mixins للدوال المتكررة (مثل الـ Validation، Auth Checks، Logging).",
        egyptianContext: "شائع لكتابة كود نظيف في شركات الـ FinTech (Swvl، Paymob)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Mixin ودوره بديلاً عن الوراثة المتعددة", "شرح قاعدة الترتيب والأولوية (الأخير يكسب)", "شرح حصانة الـ Mixins باستخدام 'on'"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "3 دق" },
      keyPhrases: ["Diamond Problem", "Linearization", "Code Reusability without Hierarchy"]
    },
    quickRevision: {
      bulletPoints: ["mixin: لتشارك القدرات", "with: للخلط بالكلاس", "on: لتقييد الخلط", "الأخير باليمين يلغي دوال الأول باليسار لو تشابهوا"],
      memoryHook: "الميكسن مثل كورس سباحة بتضيفه بـ with، وممكن تقول الكورس دا للمنقذين بس بـ on.",
      cheatSheet: "بتبني تطبيق وعندك تكرار لوظيفة اللوج بـ 100 كلاس؟ استخدم \`(Class Name) with Logger\`."
    },
    companyTags: ["MaxAB", "Swvl", "Paymob"],
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
    tags: ["Dart", "OOP", "Architecture"],
    definition: {
      summary: "الكلاسات المجردة (Abstract)، الواجهات الضمنية (Interfaces)، والكلاسات المختومة (Sealed في Dart 3).",
      detailed: "الـ Abstract class هو قالب يحتوي على دوال بدون تنفيذ (Implementation)، ولا يمكن إنشاء كائن منه؛ ومهمته أن يكون مرجعاً للكلاسات الأبناء. في Dart، كل كلاس يُعتبر واجهة (Interface) بشكل ضمني عبر كلمة \`implements\`. مع Dart 3، الكلاس الـ \`sealed\` يقيد الوراثة بداخل نفس الملف فقط ويجبر استخدام الـ Switch Statement لاحتواء كافة الحالات.",
      analogy: "الـ Abstract class مثل رسم هندسي لفيلا خيالية؛ لا يمكنك السكن بها قبل بنائها بأبعادها. الـ Interface (\`implements\`) عقد قانوني صارم؛ إذا وافقت عليه يجب أن تنفذ كل الديكورات المكتوبة وإلا طُردت. الـ Sealed class هي عائلة مغلقة؛ نعرف تماماً عدد أفرادها وأبنائها اليوم ومستقبلاً.",
      keyPoints: [
        "abstract class: يحمل دوال مع وأخرى بدون تنفيذ، ويورّث بـ \`extends\`.",
        "implements (Interface): كل الكلاسات يمكن أن تكون واجهات في Dart. تجبر الوارث على إعادة بناء كل حرف فيها من الصفر.",
        "sealed (Dart 3): تحول الكلاس إلى أنواع مغلقة و Exhaustive (شاملة) لضمان أمان الـ Switch."
      ],
      codeExample: {
        language: "dart",
        code: `abstract class BaseRepository {
  void connect() => print('متصل'); // دالة مكتملة
  Future<void> fetch(); // دالة خالية (مجردة)
}

// الوراثة: يستفيد من دالة الاتصال ويُجبر على fetch
class UserRepository extends BaseRepository {
  @override
  Future<void> fetch() async { print('جلب المستخدمين'); }
}

// الواجهة: هنا أنت مجبر على إعادة بناء كل شيء من الصفر
class MockRepo implements BaseRepository {
  @override
  void connect() {} // مُجبر عليها هنا!
  @override
  Future<void> fetch() async {}
}

// Dart 3: Sealed Class
sealed class AuthState {}
class AuthInitial extends AuthState {}
class AuthLoading extends AuthState {}
class AuthSuccess extends AuthState {}
class AuthError extends AuthState {} // معروفة ومغلقة في ملف واحد!`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the key difference between 'extends' and 'implements' regarding an abstract class?",
        questionAr: "ما الفرق الجوهري بين \`extends\` و \`implements\` عند التعامل مع كلاس مجرد (Abstract)؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "عندما نستخدم \`extends\` نستفيد من الدوال المنفذة بالفعل (بها جسد كود)، ونُجبر فقط على كتابة الدوال الفارغة.",
            "عندما نستخدم \`implements\` فإننا نتجاهل كل السلوك ونأخذ هيكل الأسماء فقط (العقد)، ونُجبر على إعادة كتابة كل الدوال، سواءً كانت فارغة أو ممتلئة مسبقاً!"
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "Why should we use 'sealed' classes instead of normal abstract classes for state management representations?",
        questionAr: "لماذا يُفضل استخدام الـ \`sealed\` بدلاً من الـ \`abstract\` العادي لتمثيل حالات (State) في الـ State Management؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ \`sealed\` يوفر دعماً لمدقق اللغة (Exhaustiveness checking).",
            "عند استخدام \`switch\`، يقوم المترجم (Compiler) بتنبيهك بخطأ أحمر إن نسيت حالة من الحالات الأربعة (Loading/Success/Error/Initial).",
            "في الـ Abstract العادي لا يكترث المترجم بذلك، مما قد يسبب أعطال مفاجئة للمستخدم لنسيان شاشة، والـ Sealed Class لا يمكن صنع أبناء له بالخارج."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تكوين فهم لأساسيات بناء مشاريع Clean Architecture.", "صياغة العقود بين الطبقات باستخدام الـ Repository Pattern."],
      redFlags: ["الجهل بالتغيير الجديد في Dart 3 للـ sealed classes.", "ارتباك بين extends وبين implements."],
      greenFlags: ["إدراك أن Dart لا تحتوي على كلمة حقيقية باسم interface وإنما الكلاسات نفسها تُقلد هذا الدور."]
    },
    linkedCards: {
      prerequisites: ["mixins-power"],
      nextSteps: [{ id: "factory-singleton", title: "Factory & Singleton Patterns" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام \`enum\` لتمثيل حالات معقّدة تحتاج لاستقبال بيانات كالمتغيرات.",
        whyWrong: "الـ \`enum\` البسيط لا يستطيع حمل كائنات مرنة معه (مثل كائن الخطأ exception)، بينما الـ \`sealed\` يتيح كلاس بأكمله كحالة بخصائص.",
        correctApproach: "استخدام الـ Sealed class Pattern لكل أنواع الـ Bloc و الـ Riverpod States.",
        egyptianContext: "سؤال مضمون في أغلب المقابلات القوية للبحث عن مدى إطلاع المبرمج بالحديث من تحديثات الـ Flutter SDK."
      }
    ],
    answerStrategy: {
      structure: ["الفروقات المعمارية بين الاثنين", "شرح سحر الـ imposes لكل الدوال", "ذكر Dart 3 وقوة الـ Sealed."],
      timeAllocation: { junior: "2 دق", mid: "4 دق", senior: "5 دق" },
      keyPhrases: ["Implicit Interface", "Contract", "Exhaustive Switch", "Sealed Pattern"]
    },
    quickRevision: {
      bulletPoints: ["Abstract: أورث اللي يفيدك وكمل الناقص", "Implements: ارمي كل الشغل القديم ونفذ العقد بالكامل", "Sealed: عيلة مقفولة وأمان للـ Switch"],
      memoryHook: "Abstract بيتك القديم هتدهنه بس، Implements هتهده وتاخد التصميم بس وتبني من جديد.",
      cheatSheet: "Bloc State = دائماً استخدم Sealed!"
    },
    companyTags: ["Thndr", "Paymob", "Bosta", "Breeva"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 9
  {
    id: "factory-singleton",
    number: 9,
    title: "Factory & Singleton Patterns",
    titleAr: "أنماط Factory و Singleton",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "Design Patterns", "Architecture"],
    definition: {
      summary: "فهم متى وكيف تستخدم أنماط التصميم الإنشائية (Creational) مثل Factory و Singleton للتحكم بكيفية بناء الكائنات.",
      detailed: "نمط Singleton يضمن إنشاء نسخة واحدة فقط (Instance) من الكلاس طوال فترة تشغيل التطبيق (مثل كلاس الـ Database أو SharedPreferences)، في Dart يسهل برمجته عبر \`factory\` المتصل بـ \`private constructor\`. أما الـ Factory فهو يُستخدم عندما تريد إرجاع كائن موجود بدلاً من إنشاء جديد، أو لإرجاع كائن من كلاس فرعي بناءً على شرط (مثل \`fromJson\`).",
      analogy: "السنجلتون مثل كبسولة الفضاء التي لا يوجد منها سوى نسخة واحدة يتحكم بها الجميع. الفاكتوري مثل موظف الاستقبال في الفندق؛ تسأله عن غرفة فيعطيك مفتاحاً لغرفة متاحة، أو يبني لك غرفة جديدة إذا دعت الحاجة.",
      keyPoints: [
        "Singleton: نسخة واحدة فقط، توفر الذاكرة، وخطرة إذا استُخدمت بشكل مفرط كـ Global State.",
        "Factory keyword: دالة بناء (Constructor) لا تُجبر على إنتاج كائن جديد كل مرة، بل تمتلك أمر \`return\` للتحكم بما تُرجعه."
      ],
      codeExample: {
        language: "dart",
        code: `// ✅ Singleton Pattern
class AppDatabase {
  // 1. إنشاء نسخة ثابتة سرية
  static final AppDatabase _instance = AppDatabase._internal();
  
  // 2. الفاكتوري يرجع نفس النسخة دائماً
  factory AppDatabase() {
    return _instance;
  }
  
  // 3. بناء مخفي (Private) لا يمكن استدعاءه من الخارج
  AppDatabase._internal() {
    print('تم إنشاء قاعدة البيانات مرة واحدة فقط!');
  }
}

// ✅ Factory Pattern (Caching Example)
class UserLogger {
  final String name;
  static final Map<String, UserLogger> _cache = {};

  factory UserLogger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name]!; // إرجاع النسخة القديمة لتوفير الذاكرة
    } else {
      final logger = UserLogger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  UserLogger._internal(this.name);
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What are the drawbacks of using Singletons in your Flutter app?",
        questionAr: "ما هي العيوب المحتملة للاعتماد المفرط على السنجلتون (Singletons) في تطبيق فلاتر؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "يصعب اختباره (Unit Testing) لأن الـ State لا تتصفر بين الاختبارات.",
            "يعمل كـ Global State خفي، مما يجعل تتبع الأخطاء بين الشاشات أمراً مزعجاً.",
            "يخرق مبدأ الـ Single Responsibility أحياناً ويكون مرتبطاً (Tightly coupled) بالعديد من الكلاسات."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "How does a 'factory' differ from a regular constructor in Dart?",
        questionAr: "ما الفرق التقني بين فاكتوري (\`factory\`) وبين الـ Constructor العادي في Dart؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ Constructor العادي يقتصر على تكوين كائن من نفس الكلاس ولا يحتوي على دالة إرجاع \`return\` أبدًا.",
            "الفاكتوري يجب أن يحتوي على \`return\`. يمكنه إرجاع \`cached instance\`، أو حتى إرجاع كلاس فرعي (Subclass) يتبع لهذا الكلاس."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على التحكم بالذاكرة وإدارة دورة حياة الـ Instances.", "فهم متى يكون الـ Singleton خطأً وتستبدله بـ Dependency Injection الـ GetIt."],
      redFlags: ["إنشاء السنجلتون بدون Private constructor مما يكسر النمط ويكشفه للاستنساخ الخطأ."],
      greenFlags: ["إدراك أن Dependency Injection (DI) هو بديل صحي للسنجلتون العنيف."]
    },
    linkedCards: {
      prerequisites: ["abstract-interfaces"],
      nextSteps: [{ id: "extension-methods", title: "Extension Methods" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل سنجلتون لكلاس الواجهة الرسومية (UI) أو Bloc/ViewModel.",
        whyWrong: "هذه الكلاسات تتلف ويجب أن تموت مع إغلاق الشاشة لتفريغ الرام، جعلها سنجلتون يسبب لتسريب الذاكرة (Memory Leak).",
        correctApproach: "السنجلتون فقط للكلاسات الخدمية التي تعيش بعمر التطبيق كالـ Dio والـ SharedPrefs.",
        egyptianContext: "شائعة للمبتدئين عند عدم استخدام أدوات زي GetIt وبيحاول يباصي داتا بين الشاشات."
      }
    ],
    answerStrategy: {
      structure: ["تعريف النمطين والهدف منهم.", "عيوب Singleton ودور Dependency injection كبديل."],
      timeAllocation: { junior: "2 دق", mid: "4 دق", senior: "5 دق" },
      keyPhrases: ["Global shared instance", "Memory optimization", "Tightly coupled"]
    },
    quickRevision: {
      bulletPoints: ["Factory: يبني بس بشروط وممكن يرجع القديم.", "Singleton: نسخة واحدة تعيش طوال حياة التطبيق.", "الاعتماد المفرط عليه كابوس في الاختبارات."],
      memoryHook: "الفاكتوري بيفلتر المخرجات زى المصنع، والسنجلتون قلعة مافيهاش غير ملك واحد.",
      cheatSheet: "دايماً استبدل كتابة الـ Singleton اليدوية بباكدچ 'get_it' كأفضل ممارسة في Flutter."
    },
    companyTags: ["ITWorx", "Valeo", "Fawry", "Instabug"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 10
  {
    id: "extension-methods",
    number: 10,
    title: "Extension Methods in Dart",
    titleAr: "دوال التوسعة (Extensions)",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "Architecture", "Clean Code"],
    definition: {
      summary: "إضافة سلوك ودوال جديدة لكلاسات موجودة مسبقاً لا تملك صلاحية التعديل عليها.",
      detailed: "الـ Extensions تسمح لك بحقن متغييرات ودوال إضافية دخل كلاس لا يمكنك العبث بالـ Source Code الخاص به كأكواد لغة Dart الأساسية (مثل String أو DateTime) أو أكواد الـ Libraries. هذا يلغي الحاجة لإنشاء ملفات مليئة بالـ \`Utils\` المتباعدة. في Dart 3 تمت إضافة \`Extension Types\` لإنشاء تغليف صلب بلا استهلاك للذاكرة (Zero-cost wrappers).",
      analogy: "الـ Extension مثل لصق ورقة ملاحظات (Sticky Note) عليها دالة سحرية على كتاب لم تكتبه أنت؛ لا تستطيع تغيير كلام المؤلف الأصلي، لكن تستطيع تمديد الاستفادة من كتابه.",
      keyPoints: [
        "يستخدم لتنظيف الأكواد من الكلاسات البيروقراطية (Helper classes).",
        "يمكّن البرمجة بسلاسة تسلسلية (Method Chaining).",
        "تبدأ بكلمة \`extension Name on Type\`."
      ],
      codeExample: {
        language: "dart",
        code: `// بدلاً من عمل كلاس DateFormatter مستقل
extension DateUtils on DateTime {
  // دالة بسيطة
  bool get isWeekend => weekday == DateTime.saturday || weekday == DateTime.friday;

  // دالة تُظهر لك التاريخ بصيغة مصرية
  String toEgyptianFormat() {
    return '$day/$month/$year';
  }
}

// 🎯 Dart 3: Extension Type
// يعطي اسم قوي وآمن للبيانات دون الحاجة لصنع Class يستهلك رامات!
extension type EntityId(int value) {}

void printId(EntityId id) => print(id.value);

void main() {
  final now = DateTime.now();
  print(now.isWeekend); // كأنها جزء من بيئة Dart الأساسية!
  print(now.toEgyptianFormat());
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "How do you rewrite a helper function as an extension on String?",
        questionAr: "كيف يمكنك تحويل دالة مساعدة تأخذ نص لتتحقق أن أوله حرف كبير إلى Extension؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "الصيغة المساعدة: \`bool isCapital(String t) => ...\`",
            "صيغة التوسعة: \`extension StringExt on String { bool get isCapital => this[0] == this[0].toUpperCase(); }\`"
          ],
          timeToAnswer: "1.5 mins"
        }
      },
      {
        type: "Theoretical",
        question: "Can an extension override existing methods in a class?",
        questionAr: "هل من الممكن للـ Extension أن تلغي وتكتب فوق دالة متواجدة بالفعل داخل الكلاس المراد توسعته؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لا، الدوال المتواجدة أصلاً (Member methods) دائمًا تكسب ولها الأولوية المطلقة.",
            "إذا صنعت \`extension\` بدالة بنفس الاسم لدالة موجودة بالفعل في الكلاس، سيتم تجاهل الـ Extension تماماً."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["كتابتك لكود نظيف مقروء (Readable code) وواجهات برمجية مريحة (API ergonomics)."],
      redFlags: ["الاعتماد الكبير على ملفات مليئة بدوال Static بدلاً من استخدام الـ Extensions.", "محاولة حفظ State أو متغييرات داخل الـ Extension (لا يجوز)."],
      greenFlags: ["إدراك إضافة Dart 3 الـ Extension Types كبديل قوي يوفر الـ Performance."]
    },
    linkedCards: {
      prerequisites: ["factory-singleton"],
      nextSteps: [{ id: "async-future", title: "Async Future" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "محاولة تعريف متغييرات حية قابلة للتعديل (Instance variables) داخل Extension.",
        whyWrong: "لأن الـ Extension مجرد دوال تتبنى الكلاس الأصلي وقت التشغيل (Static dispatch) ولا تملك ذاكرة لحفظ المتغييرات.",
        correctApproach: "استخدام الـ Getters فقط كمعادلات مبنية على المتغييرات التي يمتكلها الكلاس الأصلي.",
        egyptianContext: "يتم استخدامها بكثافة لعمل الـ Localization في الفلاتر (مثل \`context.tr()\` للحصول على الترجمة)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف دوال التوسعة والهدف المرجو منها لزيادة مقروئية الكود", "التنويه بـ Static Dispatch وعدم القدرة على تسجيل Instance Variables", "لمحة مبسطة عن قوة Dart 3 \`extension type\`."],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "3 دق" },
      keyPhrases: ["Readable Code", "Method Chaining", "Static Dispatch", "Zero-cost wrappers"]
    },
    quickRevision: {
      bulletPoints: ["توسيع لغات دارت والمكاتب المغلقة", "تستدعى كأنها عضو طبيعي للمتغيير", "لا تحفظ متغييرات حية داخله"],
      memoryHook: "Extensions زي الإكسسوار اللى بتركبه لعربيتك؛ شكل ولون من غير ما تفتي في الموتور الحقيقي.",
      cheatSheet: "لو عندك \`Responsive.paddingHelper(context)\` حوّلها لـ \`context.padding()\` باستثناء."
    },
    companyTags: ["Swvl", "MaxAB", "Instabug", "Robusta"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 11
  {
    id: "async-future",
    number: 11,
    title: "Async Future",
    titleAr: "البرمجة غير المتزامنة (Future و Event Loop)",
    level: "Junior",
    frequency: "Critical",
    tags: ["Dart", "Async", "Event Loop"],
    definition: {
      summary: "آلية عمل Dart كبيئة ذات خيط واحد (Single-threaded) تعتمد على الـ Event Loop، وكيفية استخدام Future و async/await.",
      detailed: "لغة Dart تعمل بمسار واحد (Single-thread)، ولتجنب تجميد الواجهة أثناء الانتظار (مثل جلب بيانات من النت)، تستخدم الـ Event Loop. هو ببساطة طابور مهام؛ ينهي المهام السريعة (Synchronous) أولاً، ثم ينظر للـ Microtasks، وأخيراً ينفذ الأحداث المؤجلة (Event Queue) كـ الـ Futures. الكلمة \`async/await\` هي مجرد تجميل (Syntactic sugar) لدوال \`.then()\`, وتجعل الكود غير المتزامن يقرأ كأنه متزامن.",
      analogy: "الـ Event Loop كطاهي في مطعم؛ لا يقف أمام الفرن ينتظر البيتزا لتستوي (Block)، بل يضعها في الفرن (Future) ويذهب لتحضير السلطة (Sync)، وعندما يرن جرس الفرن يعود ليخرجها (Await).",
      keyPoints: [
        "Event loop: يدير طابورين (Microtask queue و Event queue). طابور الـ Microtask له الأولوية العظمى.",
        "Future: يمثل وعداً بقيمة ستتوفر في المستقبل (إما نجاح أو خطأ).",
        "async/await: توقف تنفيذ الدالة الحالية مؤقتاً حتى يكتمل الوعد، دون تجميد التطبيق بأكمله."
      ],
      codeExample: {
        language: "dart",
        code: `// طريقة قراءة متسلسلة ونظيفة (حديثة)
Future<String> fetchUser() async {
  try {
    // تتوقف هذه الدالة فقط هنا، ويتفرغ التطبيق لأشياء أخرى
    await Future.delayed(Duration(seconds: 2));
    return 'Ali';
  } catch (e) {
    return 'Error: $e';
  }
}

// طريقة الـ Callbacks الكلاسيكية (مزعجة في القراءة)
Future<String> fetchOldSchool() {
  return Future.delayed(Duration(seconds: 2))
    .then((_) => 'Ali')
    .catchError((e) => 'Error');
}

void main() {
  print('1. أول طلب (Sync)');
  
  Future(() => print('4. Event Queue (Future)'));
  
  Future.microtask(() => print('3. Microtask Queue (Prioritized)'));
  
  print('2. ثاني طلب (Sync)');
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Does 'async' create a new thread in Dart?",
        questionAr: "هل كتابة كلمة \`async\` تقوم بإنشاء خيط معالجة جديد (New Thread) في Dart؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "لا، Dart بطبيعتها Single-threaded.",
            "كلمة \`async\` تخبر الـ Compiler فقط أن هذه الدالة ستستخدم الـ Event Loop لتأجيل بعض المهام للـ Event Queue وإرجاع \`Future\`."
          ],
          timeToAnswer: "1 min"
        }
      },
      {
        type: "Critical Thinking",
        question: "What is the difference between Future.delayed and Future.microtask in execution priority?",
        questionAr: "أيهما يُنفذ أولاً ולماذا: \`Future.delayed(0)\` أم \`Future.microtask()\`؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "\`Future.microtask()\` ينفذ أولاً وبأولوية قصوى بمجرد انتهاء الكود المتزامن (Sync) الحالي.",
            "\`Future.delayed(0)\` يُوضع في نهاية الـ Event Queue العادي.",
            "الـ Event Loop يفرغ الـ Microtask Queue بالكامل مراراً قبل النظر لأي حدث في الـ Event Queue."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تأكد تام من فهمك أن الفلاتر Single-threaded وأن الـ Futures لا تعني Parallelism أبدًا.", "كيفية تجنب تجميد الـ UI."],
      redFlags: ["الاعتقاد بأن \`async\` تفتح مسار بروسيسور جديد.", "استخدام \`.then()\` بشكل مفرط يؤدي إلى ما يسمى Callback Hell بدلاً من \`await\`."],
      greenFlags: ["شرح الفرق بين الـ Microtask Queue والـ Event Queue بوضوح."]
    },
    linkedCards: {
      prerequisites: ["extension-methods"],
      nextSteps: [{ id: "streams-deep", title: "Streams Deep" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل حلقة While طويلة جداً (Heavy computation) داخل دالة async معتقداً أنها لن تجمد التطبيق.",
        whyWrong: "لأن العملية الحسابية نفسها تعمل ككود (Sync) يحتكر الخيط الأساسي، مما يمنع الـ Event Loop من رسم الفريمات (UI jank).",
        correctApproach: "استخدام \`Isolate.run\` أو \`compute\` للعمليات الحسابية المرهقة لنقلها لخيط مختلف تماماً.",
        egyptianContext: "سؤال أساسي لفلترة مهندسين الواجهات (Frontend) للتأكد من قدرتهم على بناء تطبيقات ناعمة 60fps."
      }
    ],
    answerStrategy: {
      structure: ["تأكيد مبدأ الـ Single-thread", "وصف الطاهي والـ Event Loop ببساطة", "ترتيب الأولويات (Sync -> Micro -> Event)"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "4 دق" },
      keyPhrases: ["Single-threaded", "Event Loop", "Syntactic Sugar"]
    },
    quickRevision: {
      bulletPoints: ["Dart ليس Multi-threaded، هو Single-thread بـ Event Loop شاطر.", "Async/await أسهل للقراءة من then.", "Microtask أسرع دايماً من الـ Future العادي."],
      memoryHook: "الطباخ مش بيقف قدام الفرن (Single thread).. بيحط الأكل (Future) ويروح يتبل الفراخ (Sync).",
      cheatSheet: "لو عايز تستنى كذا API يخلصوا مع بعض في نفس الوقت استخدم \`Future.wait([api1, api2])\` هتسيف وقت كبير."
    },
    companyTags: ["Instabug", "Swvl", "Fawry", "Paymob", "Bosta"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 12
  {
    id: "streams-deep",
    number: 12,
    title: "Streams Deep Dive",
    titleAr: "الـ Streams بعمق",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Dart", "Async", "Reactive Programming"],
    definition: {
      summary: "تدفق البيانات غير المتزامن المستمر (Streams)، وأنواعه: Single Subscription و Broadcast.",
      detailed: "الـ Future يعطيك هدية واحدة في المستقبل، بينما الـ Stream يعطيك تدفقاً مستمراً من الهدايا بمرور الوقت المجهول. وهو الأساس لمعمارية الـ Reactive Programming (مثل RxDart و Bloc). هنالك نوعان: Single Subscription (مستمع واحد فقط وإلا يعطي خطأ)، و Broadcast (محطة راديو؛ يمكن لأي عدد الاستماع في نفس الوقت).",
      analogy: "الـ Future كمن يطلب 'عنباً' من السوق، يأتيه العنب كاملاً بعد قليل ثم ينتهي الأمر. الـ Stream كنبع ماء؛ قطرات تأتي تباعاً، تضع الكوب (Listener) وتمتلئ متى توفر الماء.",
      keyPoints: [
        "Single Subscription: افتراضي، يُغلق بمجرد أن يستمع إليه أحد (\`listen\`). ممتاز للنقل الثقيل كقراءة الملفات.",
        "Broadcast Stream: يسمح بعدة مستمعين. إذا فاتتك نقطة مياه قبل استماعك لا تستطيع استرجاعها.",
        "StreamController: المُصنع للـ Stream، تدخل منه البيانات (\`add\`) وتخرج من الجانب الآخر (\`stream\`).",
        "المنظِف (Generators): استخدام \`async*\` و كلمة \`yield\` لبناء Stream برمجياً بشكل نظيف ورائع."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. Single Subscription (يسمح بمستمع واحد فقط)
final stream = Stream.fromIterable([1, 2, 3]);
stream.listen(print); // عظيم
// stream.listen(print); // ❌ خطأ يكسر التطبيق!

// 2. Broadcast (محطة راديو، عدد لانهائي من المستمعين)
final controller = StreamController<int>.broadcast();
controller.stream.listen((v) => print('المستمع أ: $v'));
controller.stream.listen((v) => print('المستمع ب: $v')); // عظيم
controller.add(100); // إرسال الداتا

// 3. Generator (استخدام yield)
Stream<int> counterStream() async* {
  for (int i = 1; i <= 3; i++) {
    await Future.delayed(Duration(seconds: 1)); // انتظار زمني
    yield i; // رمي القيمة في النهر
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the key difference between a Single Subscription Stream and a Broadcast Stream?",
        questionAr: "ما هو الفارق المحوري بين الـ Single Subscription والـ Broadcast Stream ومتى تستخدم كل منهما؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ Single يسمح بمستمع (Listener) وحيد، ويُحفظ الداتا بداخله حتى يستمع إليها أحد. ممتاز لعدم ضياع الداتا (مثل تحميل ملف).",
            "الـ Broadcast متعدد المستمعين، لكنه يعمل كبث حي مباشر؛ من لم يكن يستمع وقت الحدث فاتته الداتا. ممتاز للـ UI (مثل زر كُبس)."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Critical Thinking",
        question: "Why using StreamBuilder with a manually created StreamController might cause memory leaks?",
        questionAr: "لماذا قد يتسبب فتح StreamController واستخدامه داخل شجرة فلاتر بحدوث Memory Leaks؟ وكيف نمنعه؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لأن الـ StreamController يظل مفتوحاً في الذاكرة (الرام) وينتظر أحداثاً حتى وإن ماتت الشاشة (Dispose).",
            "الحل: يجب دائمًا استدعاء \`controller.close()\` في دالة \`dispose()\` الخاصة بالـ StatefulWidget."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["أساس متين في البرمجة التفاعلية (Reactive) لفهمكيف تعمل الـ State Managements من الداخل كرعاة البقر (Bloc)."],
      redFlags: ["الجهل التام بضرورة إغلاق الـ Stream Controllers."],
      greenFlags: ["ذكر \`yield\* \` (لدمج ستريم داخل ستريم آخر) وحل مسائل معقدة بالـ Generators."]
    },
    linkedCards: {
      prerequisites: ["async-future"],
      nextSteps: [{ id: "isolates-concurrency", title: "Isolates & Concurrency" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل \`.listen()\` لستريم مرتين مما يسبب عطل التطبيق: 'Stream has already been listened to'.",
        whyWrong: "لأن الستريم بطبيعته الأساسية Single. عند استخدامه في أكثر من مكان بالـ UI (مثل رقم السلة أعلى وأسفل الشاشة) ينهار.",
        correctApproach: "تعريفه كـ \`StreamController.broadcast()\` أو استخدام \`.asBroadcastStream()\`.",
        egyptianContext: "خطأ يتكرر لحديثي التخرج عند محاولة ربط Firebase Streams بعدة شاشات مرة واحدة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Stream كمستقبل مستمر بديل للـ Future", "الفرق بين الراديو (Broadcast) والملف (Single)", "كيفية تنظيف الذاكرة بخطوة أخيرة"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "4 دق" },
      keyPhrases: ["Reactive Programming", "Multiple Listeners", "Memory Leak Prevention"]
    },
    quickRevision: {
      bulletPoints: ["Future = حدث واحد, Stream = أحداث مستمرة بحر.", "Single Stream = مستمع واحد.", "Broadcast Stream = راديو.", "async* = yield بتولد النهر برمجياً."],
      memoryHook: "نهر البيانات (Stream)، إما تعبي قزازتك لوحدك (Single) أو النهر يكون عام والكل بيشرب (Broadcast).",
      cheatSheet: "دائما في الـ Stateful widget متنساش \`controller.close()\` وإلا الرام هتختنق."
    },
    companyTags: ["Swvl", "MaxAB", "Trella", "MoneyFellows"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 13
  {
    id: "isolates-concurrency",
    number: 13,
    title: "Isolates & Concurrency",
    titleAr: "المعالجة المتوازية (Isolates)",
    level: "Senior",
    frequency: "Rare",
    tags: ["Dart", "Performance", "Concurrency"],
    definition: {
      summary: "فهم واستخدام Isolates للقيام بمهام ثقيلة بالتوازي دون تجميد شجرة الواجهة والتطبيق.",
      detailed: "لأن Dart هي Single-threaded، العمليات الحسابية الضخمة جداً (مثل ضغط ملف فيديو، قراءة قاعدة بيانات مهولة محلياً، بارسينج لـ JSON مرعب) ستجمد واجهة المستخدم (Jank). الحل هو \`Isolates\`. الـ Isolate عبارة عن 'صرح معزول' له ذاكرة (Memory Heap) وخيط أوامر منفصل تماماً، لا تتشارك الـ Isolates متغييرات الرام (كمعظم لغات البرمجة المتعددة)، بل تتواصل عبر رسائل (Message Passing) بواسطة \`Ports\`. دالة \`compute()\` أو \`Isolate.run()\` في فلاتر تختصر كل هذه المعمارية بسطر واحد.",
      analogy: "الـ Isolate مثل استئجار مطبخ جديد تماماً بطباخ مختلف ومكونات منفصلة. لا يمكن للـ المطبخين مشاركة نفس المعلقة (الرام)، يتواصلون فقط عبر المراسيل الورقية (Ports).",
      keyPoints: [
        "Isolate: عزلة تامة للذاكرة، آمن جداً من الـ Race conditions، بعكس الـ Threads التقليدية.",
        "Ports (ReceivePort / SendPort): أنبوبة المراسلات لنقل الداتا كنسخ (Pass-by-value) بين الـ Isolates.",
        "compute / Isolate.run: دوال مساعدة لإنشاء وإغلاق الـ Isolate في سطر واحد دون التعامل مع المنافذ."
      ],
      codeExample: {
        language: "dart",
        code: `// 💡 الطريقة الحديثة والمختصرة (Dart 2.15+ )
int heavyCalculation(int count) {
  int total = 0;
  for (int i = 0; i < count; i++) total += i;
  return total; // الـ UI واقف لو الرقم ضخم
}

void main() async {
  // يفتح Isolate، يرمي المهمة، يستلم الرقم، ويقفل الـ Isolate!
  print('Loading...');
  final result = await Isolate.run(() => heavyCalculation(1000000000));
  print('Done: $result');
}

// 🧱 الطريقة اليدوية للأنظمة المعقدة (Manual Spawn)
void manualIsolate() async {
  final receiver = ReceivePort();
  await Isolate.spawn(_heavyWorker, receiver.sendPort);
  
  final msg = await receiver.first;
  print('رسالة من المطبخ الآخر: $msg');
}

void _heavyWorker(SendPort port) {
  port.send('الحسبة خلصت وتم بحمد الله!');
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why doesn't Dart use shared memory threads like Java for concurrency?",
        questionAr: "لماذا صممت Dart الـ Isolates بدون ذاكرة مشتركة (Shared Memory) كمعظم اللغات؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لتجنب قفل الموارد (Deadlocks) والسباق (Race Conditions) اللذان يسببان أعطالاً غامضة للعمليات المتزامنة.",
            "كل Isolate يملك Garbage Collector خاص به، فلا يوقف التطبيق بأكمله لتنظيف الرام."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Critical Thinking",
        question: "Does parsing a 5MB JSON string block the main thread? How to solve it?",
        questionAr: "هل تحويل نص JSON حجمه 5MB يعرقل الـ Thread الأساسي؟ وكيف نحلها؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "نعم، دالة \`jsonDecode()\` بطيئة وتعمل بـ Sync، وستُوقع الـ UI لمدة ثوانٍ وتُسقط الفريمات.",
            "الحل: تمرير دالة البارسينج عبر \`Isolate.run(( ) => jsonDecode(data))\` لتتم في الخلفية واستعادة النتيجة براحة."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["المعرفة العميقة لحل مشاكل الـ Performance الثقيلة جداً.", "فهم بنية اللغات وتفاصيل الـ Memory management."],
      redFlags: ["الخلط بين \`Future\` (تأجيل أمر) و \`Isolate\` (عكس أمر لخيط موازي فعلي للبروسيسور)."],
      greenFlags: ["ذكر التحديثات القوية لـ Dart مؤخراً مثل Isolate groups وكيف أصبحت أخف وبتكلفة أقل للرام."]
    },
    linkedCards: {
      prerequisites: ["streams-deep"],
      nextSteps: [{ id: "error-handling", title: "Error Handling" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام الـ Isolate لعمليات بسيطة وسريعة جداً.",
        whyWrong: "لأن إنشاء \`Isolate\` نفسه ونقل الداتا بين المنافذ (Serialization) يستهلك وقتاً وذاكرة؛ فلو المهمة بسيطة ستكون التكلفة أعلى من حلها محلياً.",
        correctApproach: "الـ Isolates تُستخدم فقط للمهام الحسابية التي تتجاوز الـ 16 ملي ثانية (لكي لا نخسر فريم بصري في الشاشة).",
        egyptianContext: "يتم سؤال المتقدمين من الـ Seniors بأسئلة خداعية حول 'هل نستعمل compute في أبسط الـ API calls؟'."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Isolate كجزيرة منعزلة بلا رام مشترك", "ذكر طرق التنفيذ المبسطة (Run) والمعقدة (Spawn)", "فوائد الـ Garbage collector المنفصل"],
      timeAllocation: { junior: "4 دق", mid: "5 دق", senior: "6 دق" },
      keyPhrases: ["Message Passing", "Race conditions mitigation", "Multithreading via isolation", "Garbage collection per isolate"]
    },
    quickRevision: {
      bulletPoints: ["Future مش بتعمل خيط جديد.. الـ Isolate بيعمل", "Isolate: ذاكرة مستقلة، مفيش Race conditions", "\`Isolate.run\` أسرع وأسهل حل لفك قفل الواجهة."],
      memoryHook: "عملية بطيئة جداً بتوقف الشاشة كأن فيها زلزال؟ ارميها برا الكوكب في Isolate ترجعلك براحتها.",
      cheatSheet: "JSON ضخم جداً؟ ابعته كاسطوانة لـ \`Isolate.run(( )})\` واعمله parse هناك."
    },
    companyTags: ["Valeo", "Thndr", "Instabug", "Sary"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Major" }
  },

  // CARD 14
  {
    id: "error-handling",
    number: 14,
    title: "Advanced Error Handling",
    titleAr: "معالجة الأخطاء الاحترافية",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Dart", "Architecture", "Clean Code"],
    definition: {
      summary: "التفرقة بين بناء try-catch العشوائي واستخدام أنماط فنية قوية للتعامل الدقيق مع الانهيارات (مثل Result/Either/Failure).",
      detailed: "في البيئات المعقدة، إلقاء الأخطاء (\`throw\`) في كل مكان يتسبب بكسر التطبيق بشكل مجنون ويدفع المبرمج لنسيان صيدها (Catch). المعمارية النظيفة تفضل أسلوب البرمجة الوظيفية (Functional Programming) في الأخطاء؛ بحيث تعود الدالة بـ كائن (Object) يمثل (إما النجاح بالبيانات، أو الفشل بالخطأ) باستخدام حزم مثل \`fpdart\` (Either) أو دوال \`Result\` المخصصة. هذا يُجبر مستدعي الدالة على كتابة شروط للتعامل مع الاثنين وقت الـ Compile.",
      analogy: "الـ Exception هو صراخ في المستشفى (يطير بلا عنوان وكل الأقسام تتوقف لحله). الـ Result Pattern هو تقرير مطبوع يُسلم للمدير (إما يحتوي على نجاح العملية، أو سبب الفشل مكتوباً بلباقة) ليتعامل معه بهدوء ويدير الموقف.",
      keyPoints: [
        "Exception vs Error: الـ Exception خطأ متوقع يمكن إصلاحه (انقطاع النت). الـ Error خطأ قاتل من المبرمج يجب أن يُنهي التطبيق ليُلاحظ (Index out of range).",
        "Result/Either Type: الكلاس يحوي خيارين L (لليسار/الخطأ) و R (لليمين/البيانات المنشودة).",
        "Rethrow: يُفضّل دائمًا استخدام ري ثرو لنقل الخطأ مع الحفاظ على بصمة المكان الأصلي له (Stacktrace) سليمة."
      ],
      codeExample: {
        language: "dart",
        code: `// ❌ الطريقة الكلاسيكية الخطرة (النسيان يؤدي لانهيار)
Future<User> fetchOld() async {
  if (timeout) throw NetworkException();
  return User();
}

// ✅ الطريقة المعمارية الاحترافية (Result / Either pattern)
// استخدمنا Sealed Class الحديث من Dart 3 لتطبيق المعمارية ذاتياً!
sealed class Result<S, E> {}
class Success<S, E> extends Result<S, E> {
  final S data;
  Success(this.data);
}
class Failure<S, E> extends Result<S, E> {
  final E error;
  Failure(this.error);
}

// الدالة لم تعد ترمي أخطاء متطايرة، بل ترجع "تقرير"
Future<Result<String, String>> fetchSafe() async {
  try {
    return Success('تم سحب البيانات');
  } catch (e) {
    return Failure('فشل الاتصال بالخادم');
  }
}

void process() async {
  final res = await fetchSafe();
  // السويتش الذكي لن ينساك بفضل الـ Sealed!
  switch (res) {
    case Success(): print(res.data);
    case Failure(): print(res.error);
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Difference between an Error and an Exception in Dart?",
        questionAr: "ما هو الفارق بين \`Error\` و \`Exception\` في دارت ومتى تصطاد كل منهما؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`Exception\`: استثناء متوقع من البيئة ويمكن معالجته مثل انقطاع إنترنت أو صلاحيات ملف ونجاح التطبيق يكمن في اصطياده (\`catch\`).",
            "\`Error\`: غلطة برمجية كارثية (مثل خطأ مصفوفة أو ميموري). يجب ألا تصطاده، اتركه يكسر التطبيق لكي تكتشفه كمهندس وتصلح الكود نفسه."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "Why should you use 'rethrow' instead of 'throw e' inside a catch block?",
        questionAr: "لماذا نُصر على كتابة \`rethrow\` وليس \`throw e\` عندما نريد اصطياد خطأ وإعادة رميه لأعلى؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "استخدام \`throw e\` يمحو أثر الكود الأصلي الذي سبب الخطأ ويمزق الـ Stacktrace ويعتبرك أنت منرميت الخطأ من السطر الجديد.",
            "كلمة \`rethrow\` تمرر الخطأ للأعلى مع الحفاظ التام والكامل على تفاصيل التسلسل الهرمي للمكان الذي حدث فيه الخطأ العظيم."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على بناء كود محمي (Bullet-proof)، لا يتوقف التطبيق فيه برمي أكواد حمراء للمستخدم."],
      redFlags: ["كتابة \`catch(e) {}\` وترك الأقواس فارغة، هذا يخفي عيوب الكود والمخاطر كالنعامة."],
      greenFlags: ["إدراك أن الحزم الحديثة مثل Bloc/Riverpod تعمل بشراسة مع مفاهيم الـ Either/Result types لضمان عدم نسيان الـ States خطأ."]
    },
    linkedCards: {
      prerequisites: ["isolates-concurrency"],
      nextSteps: [{ id: "dart-internals", title: "Dart Internals" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام Exception لتمرير البيانات والتحكم بمسار التطبيق (Control Flow).",
        whyWrong: "لأن رمي الأخطاء واصطيادها من أبطأ العمليات في لغات البرمجة وتستهلك موارد عظمى ومضيعة للوقت وغير واضحة المقروئية.",
        correctApproach: "استخدام Result class وتمرير قيم \`Failure\` كما نمرر أي كلاس عادي دون العبث بعصب الخطوات.",
        egyptianContext: "شائع في مقابلات Paymob و Fawry وأي شركة تهتم بمعالجة المعاملات المالية الحذرة."
      }
    ],
    answerStrategy: {
      structure: ["توضيح الفرق بين Error و Exception", "عيوب رمي الأخطاء العشوائية", "شرح نمط الـ Result وكيف تحمي الواجهة من الانهيار"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "5 دق" },
      keyPhrases: ["Functional Error Handling", "Stack Trace Preservation", "Exception vs Error"]
    },
    quickRevision: {
      bulletPoints: ["Exception = صالحه، Error = سيبه ينفجر وصلح كودك", "Rethrow = بيحافظ على مسار البصمات، Throw = بيدمّر الـ Stacktrace", "الـ Either أو Result pattern هو سر المعمارية الموزونة."],
      memoryHook: "تعامل مع الخطأ كأنه تقرير ورق في ملفاتك (Result) بدلاً من رمي قنبلة صوت في نص المكتب (Throw).",
      cheatSheet: "للتسهيل في الفلاتر استخدم باكدج \`dartz\` أو الباكدج الأحدث \`fpdart\` للحصول على عظمة الـ Either Right&Left."
    },
    companyTags: ["Thndr", "Paymob", "Fawry", "Instabug", "MaxAB"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 15
  {
    id: "dart-internals",
    number: 15,
    title: "Dart Internals & VM",
    titleAr: "هندسة دارت الداخلية (JIT, AOT, GC)",
    level: "Senior",
    frequency: "Rare",
    tags: ["Dart", "Performance", "Compiler"],
    definition: {
      summary: "كيف تترجم Dart الأكواد، الفرق بين AOT لسرعة التطبيق والـ JIT لسرعة التطوير، وكيفية تنظيف الذاكرة GC.",
      detailed: "قوة فلاتر الساحرة (Hot Reload) تأتي من تصميم Dart الفريد؛ فهي تدعم مترجمين: JIT (Just-In-Time) الذي يترجم الكود على الطاير أثناء مرحلة التطوير لتمكين التغيير اللحظي، ومترجم AOT (Ahead-Of-Time) الذي يتم أثناء بناء نسخة الإطلاق (Release Mode) لتحويل الكود بأكمله لرسائل معالج آلية (Machine Code Native) لتحصيل أقصى سرعة وتشغيل فائق. ينظف الـ Garbage Collector المنفصل (Per-Isolate) الذاكرة بذكاء.",
      analogy: "الـ JIT كالمترجم الفوري (تتكلم فيترجم فوراً.. مفيد في الاجتماعيات والتغيير السريع). الـ AOT كالمترجم الكتابي (يأخذ الكتاب بالكامل، يترجمه وينقح أخطاءه ليخرج نسخة رسمية سريعة بلا أعطال).",
      keyPoints: [
        "JIT: لبيئة التطوير. يمكنه تغيير الأكواد سريعاً وصنع Hot Reload لكنه بطيء نسبياً كأداء نهائي.",
        "AOT: لبيئة التشغيل والإطلاق (Release). يتم بناء أكواد الآلة لـ ARM وغيرها وتكون فائقة السرعة.",
        "Generational GC: منظف الذاكرة الذكي يفحص الـ (Young gen) للمؤقتات بشكل مستمر وسريع، ويفحص الـ (Old gen) للثوابت ببطء للحفاظ على سلاسة الفريمات.",
        "Tree Shaking: إمبراطور الخفة الذي يقلم ويزيل كل الكود وكل الدوال غير المستخدمة من باكدجاتك لتقليل مساحة التطبيق وقت إخراجه AOT."
      ],
      codeExample: {
        language: "dart",
        code: `// אין דוגמאות קוד, المفهوم هو كيف سيترجم الكود..
// في الـ Development (Hot Reloading):
// تستخدم JIT ويحتوي كودك الصغير على جميع المكاتب المرفوعة بالكامل (App size 50MB).

// في الـ Release (Play store):
// تستخدم AOT ويقوم الـ Tree Shaking بنفخ الكود ورمي كل سطر لم يُستدعى ابدا.
// الحجم يصبح خفيف والأداء صاروخي بالـ RAM (App size 14MB).

void main() {
  List<String> dump = [];
  for(int i = 0; i < 9000; i++){
    dump.add('Dead Text'); 
    // ה- Garbage collector 
    // سيهرع للـ Young Generation بعد قليل لكنس هذه المصفوفة ومسحها 
    // لكي لا تخسر سعة الرام الخاص بك.
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "How does Dart's Garbage Collector differ from other languages ensuring no UI Junk?",
        questionAr: "كيف تساهم دارت بمنظف الذاكرة الخاص بها بتوفير بيئة خالية من تقطيع الفريمات في الشاشة (UI Jank)؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "يستخدم الـ GC نظام المراحل (Generational). العناصر المؤقتة والميتة كالمتغيرات السريعة (Young Scavenger) تُكنس فوراً دون إيقاف التطبيق لمسح كامل الذاكرة.",
            "ميزة العزل: الـ GC يعمل بشكل منفرد لكل Isolate! لذا إذا وقف للتنظيف لن يوقف خيوط الواجهة أو المهام الموازية."
          ],
          timeToAnswer: "3 mins"
        }
      },
      {
        type: "Theoretical",
        question: "What is Tree Shaking and why is it important in Flutter release builds?",
        questionAr: "ما هو الـ Tree Shaking في دارت ولماذا هو السلاح الأقوى في مرحلة إصدار التطبيق؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "هي خوارزمية تمحو حرفياً أي كلاس أو دالة (حتى لو كانت داخل Package قمت بتحميلها) طالما أنت لم تقم باستدعائها مطلقاً في تطبيقك.",
            "يقلل الحجم المصاحب للتطبيق بنسبة كاسحة ويجعل المساحة النهائية للآلة نقية وملتزمة كلياً بما أُنجز فقط."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["البحث عن مطور شغوف يعرف طبيعة الأرض التي يقف عليها لغة بناءه (VM Arch)."],
      redFlags: ["عدم القدرة على الإجابة عن كيفية حدوث الـ Hot reload وكيف يختلف الـ Release mode عن الديبج."],
      greenFlags: ["ذكر الفروقات العظيمة للـ Dart GC وكيف يتمكن من الحفاظ على الـ Multi Platform بشكل مذهل."]
    },
    linkedCards: {
      prerequisites: ["error-handling"],
      nextSteps: [{ id: "solid-principles", title: "SOLID Principles" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "الحكم على سرعة تطبيق فلاتر ومواطن الـ Performance أثناء العمل على وضعيات تطوير JIT.",
        whyWrong: "مرحلة الـ Debug أبطأ وتستهلك رامات ضخمة ومساحة شاسعة بسبب احتواءها كامل الأكواد لخدمة الـ Hot Reload، الأداء الحقيقي لا يقاس إلا عن طريق جهاز حقيقي بنسخة Release/Profile.",
        correctApproach: "استخدام أمر \`flutter run --release\` لعمل أي Benchmarking للتطبيق.",
        egyptianContext: "خطأ ساذج جداً يقع فيه بعض من يفضلون React Native بمقارنة الـ Debug Performance في الفلاتر."
      }
    ],
    answerStrategy: {
      structure: ["الفارق بين المترجمين JIT و AOT", "شرح نفض الشجر Tree Shaking لتقليل الحجم", "شرح ذكاء الـ GC ثنائي المراحل"],
      timeAllocation: { junior: "4 دق", mid: "5 دق", senior: "5 دق" },
      keyPhrases: ["Just in Time", "Ahead of Time", "Generational Garbage Collector", "Tree Shaking"]
    },
    quickRevision: {
      bulletPoints: ["JIT = الديباج شغال Hot reload وبطيء", "AOT = النسخة النهائية سريعة جدا Native Code", "Tree Shaking = يقص الزيادات في الكود قبل الـ release"],
      memoryHook: "المعلمة (JIT) بتعلمك بالبطيء والـ Hot Reload شغال.. المدير (AOT) عايز الزتونة شفرة آلة سريعة ومظبوطة.",
      cheatSheet: "متعملش Test ولا تقيس أداء الـ Animations في تطبيقك طول ما هو محروق علي الموبايل JIT الديباج!"
    },
    companyTags: ["Valeo", "Robusta", "International", "Toptal"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Critical for Senior" }
  },

  // ==================== LEVEL 2: SOFTWARE DESIGN (16-35) ====================

  // CARD 16
  {
    id: "solid-principles",
    number: 16,
    title: "SOLID Principles in OOP",
    titleAr: "مبادئ SOLID الخمسة",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "OOP", "System Design"],
    definition: {
      summary: "أهم 5 قواعد لكتابة كود OOP قابل للتوسع (Scalable) والصيانة دون تدمير التطبيق القديم.",
      detailed: "قواعد SOLID تحمي الكود من التعفن (Code Rot). حرف S: مسئولية وحيدة لكل كلاس. حرف O: الكلاس مفتوح للإضافة ومغلق للتعديل. حرف L: يجب أن يكون الكلاس الابن قادراً على الحلول مكان الأب دون كسر البرنامج. حرف I: واجهات صغيرة مخصصة بدلاً من واجهة عملاقة. حرف D: الاعتماد على الـ Abstraction (الواجهات) وليس على الـ Implementation (كود ملموس).",
      analogy: "تخيل مطعماً (S: خباز للخبز فقط لا يطبخ الدجاج)، (O: المنيو يضاف إليه أطباق جديدة دون محو القديمة)، (I: المنيو للزبائن يختلف عن منيو الموردين)، و(D: المطعم يعتمد على شركة توريد لحوم 'Interface' وليس مزرعة الحاج أحمد مباشرة 'Concrete').",
      keyPoints: [
        "SRP: التعديل يتم لسبب واحد فقط.",
        "OCP: استخدم الـ Interfaces/Mixins لإضافة خصائص جديدة.",
        "LSP: لا ترث كلاس الطيور لكلاس البطريق وتطالبه بالطيران (رمي Exception عند الطيران يكسر هذا المبدأ).",
        "ISP: العميل يجب ألا يُجبر على تنفيذ دوال لا يستخدمها.",
        "DIP: الكلاسات عالية المستوى لا تعتمد على منخفضة المستوى بل كلاهما يعتمد على الـ Abstraction."
      ],
      codeExample: {
        language: "dart",
        code: `// ❌ كسر مبدأ (SRP): الكلاس بيفصل وكمان بيطبع الفاتورة!
class OrderProcessor {
  void processOrder() { print('Calculating...'); }
  void printInvoice() { print('Printing...'); } // 🚫 غلط
}

// ✅ الحل (SRP)
class OrderCalculator { void process() {} }
class InvoicePrinter { void printOut() {} }

// ❌ كسر مبدأ (OCP): كل ما نضيف خصم هنعدل في نفس الدالة القديمة
double getDiscount(String type) {
  if(type == 'Khedma') return 10;
  if(type == 'Bosta') return 20; // 🚫 لو ضفنا شركة هضطر أعدل هنا تانى!
  return 0;
}

// ✅ الحل (OCP): واجهة مفتوحة للإضافة، مقفولة للتعديل
abstract class Discount { double calculate(); }
class BostaDiscount implements Discount { double calculate() => 20; }
class KhedmaDiscount implements Discount { double calculate() => 10; }`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "How does Dependency Inversion (DIP) differ from Dependency Injection (DI)?",
        questionAr: "ما هو الفرق בין مبدأ ה- Dependency Inversion (حرف D في SOLID) ونمط الـ Dependency Injection (DI)؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ DIP هو المبدأ (الفكرة): أن تعتمد على الواجهات (Interfaces) بدلاً من الكلاسات الملموسة.",
            "الـ DI هي الأداة (النمط): عملية حقن أو تمرير هذا الـ Interface داخل الـ Constructor لكي نطبق المبدأ الأول."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "Explain the Liskov Substitution Principle (LSP) with an example of violating it.",
        questionAr: "اشرح مبدأ Liskov مع إعطاء مثال واقعي لكيفية كسره في البرمجة؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "المبدأ ينص على أن الكلاس الابن يجب أن يسلك نفس سلوك الأب تماماً.",
            "الكسر: أب اسمه \`Bird\` يملك دالة \`fly()\`. ابن اسمه \`Penguin\` ورث منه لكنه في دالة الطيران يرمي \`Exception('Cannot fly')\`. هنا البرنامج سينهار إذا استبدلنا الأب بالابن."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على فصل الـ Logic عن الـ UI وعن الـ Firebase، وكتابة كود سهل اختباره (Testable)."],
      redFlags: ["حفظ أسماء المبادئ دون القدرة على كتابة كود يثبت تكسيرها وكيفية حله."],
      greenFlags: ["إدراك أن الـ SOLID ليست قوانين قرآنية، بل مبادئ يمكن التغاضي عن بعضها إذا كان المشروع صغيراً جداً (يوازن بين SOLID و YAGNI)."]
    },
    linkedCards: {
      prerequisites: ["dart-internals"],
      nextSteps: [{ id: "dry-kiss-yagni", title: "DRY KISS YAGNI" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تطبيق مبدأ الـ Interface Segregation لدرجة جنونية بوضع دالة واحدة فقط في كل Interface.",
        whyWrong: "هذا يؤدي إلى تضخم عدد الملفات والواجهات بطريقة تجعل قراءة وتتبع الكود مستحيلاً (Over-engineering).",
        correctApproach: "قم بتجميع الدوال المترابطة التي تخدم نفس העסק (Business logic) في واجهة واحدة.",
        egyptianContext: "أشهر سؤال سينيور في الانترفيو: 'إمتى تكسر الـ SOLID Principles وماتمشيش عليها؟'"
      }
    ],
    answerStrategy: {
      structure: ["عد المبادئ باختصار", "شرح SRP لأنه الأهم والأكثر استخداماً", "شرح الـ DIP وربطها بالـ GetIt/Mocking"],
      timeAllocation: { junior: "4 دق", mid: "5 دق", senior: "5 دق" },
      keyPhrases: ["Loose Coupling", "High Cohesion", "Testability", "Open/Closed"]
    },
    quickRevision: {
      bulletPoints: ["S: كلاسك يعمل حاجة واحدة.", "O: ضيف من بره ومتلعبش جوه.", "L: الابن يسد مسد أبوه من غير ما يضرب Error.", "I: متورثش دوال إنت مش هتناديها.", "D: اعتمد على فكرة (Interface) مش على شخص (Class)."],
      memoryHook: "SOLID: كلاس بخيل (بيعمل حاجة واحدة)، مقفول على نفسه، ابنه راجل يعتمد عليه، صريح في طلباته، ومش بيعتمد على أشخاص.",
      cheatSheet: "دائماً اجعل الـ Repositories من نوع Interface واحصل على الـ Implementation عن طريق الـ DI لضمان الـ DIP."
    },
    companyTags: ["ITWorx", "Valeo", "Talabat", "Foodics"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 17
  {
    id: "dry-kiss-yagni",
    number: 17,
    title: "DRY, KISS, YAGNI",
    titleAr: "مبادئ أسلوب البرمجة النظيف",
    level: "Junior",
    frequency: "Common",
    tags: ["Best Practices", "Clean Code"],
    definition: {
      summary: "3 قواعد ذهبية لعدم تعقيد البرنامج دون داعٍ: لا تكرر نفسك (DRY)، أبقها بسيطة غبية (KISS)، لن تحتاج إليها أبداً (YAGNI).",
      detailed: "أغلب المبرمجين الجدد يقعون في فخ الـ Over-engineering (التعقيد الزائد). هذه المبادئ هي فرامل الطوارئ لحمايتك. DRY: لا تضع نفس الكود في مكانين (استخدم دوال مساعدة). KISS: الحل الأبسط الذي يعمل هو الحل الأفضل، لا تستخدم Design Pattern معقد لمشكلة تافهة. YAGNI: لا تبرمج خاصية (Feature) أو كلاس متوقعاً 'أننا قد نحتاجه في المستقبل'، برمج ما تحتاجه اليوم فقط.",
      analogy: "KISS: لا تشتري سيارة نقل ثقيل لتذهب للسوبرماركت. DRY: لا تكتب قائمة المقاضي مرتين، انسخها. YAGNI: لا تدفع تأمين ضد النيازك تحسباً للمستقبل المجهول.",
      keyPoints: [
        "DRY (Don't Repeat Yourself): المركزية في التعديل (Single Source of Truth).",
        "KISS (Keep It Simple, Stupid): المقروئية تتفوق على الذكاء المعقد.",
        "YAGNI (You Aren't Gonna Need It): التطوير الرشيق (Agile) يُحرم بناء خصائص قبل وقت طلبها الصريح."
      ],
      codeExample: {
        language: "dart",
        code: `// ❌ كسر (DRY): تكرار كود الاستايل في كل مكان
Text('Ali', style: TextStyle(color: Colors.red, fontSize: 16, fontWeight: FontWeight.bold));
Text('Mona', style: TextStyle(color: Colors.red, fontSize: 16, fontWeight: FontWeight.bold));

// ✅ الحل: استخلاص ستايل مركزي
final titleStyle = TextStyle(color: Colors.red, fontSize: 16, fontWeight: FontWeight.bold);

// ❌ كسر (YAGNI): بناء كود للإشعارات والمدفوعات والمشروع عبارة عن ديمو بسيط
class PaymentManager {
  // נכתב בשביל העתיד אף על פי שלא طلب!
  void processBitcoin() { /* 300 lines of complex unused code */ } 
}

// ❌ كسر (KISS): استخدام معادلات رياضية معقدة لشيء بسيط
bool isEven(int count) => (count % 2 == 0) ? true : false;
// ✅ الأبسط
bool isEven(int count) => count.isEven;`
      }
    },
    questions: [
      {
        type: "Critical Thinking",
        question: "Is it always good to follow DRY (Don't Repeat Yourself)? When can it be bad?",
        questionAr: "هل تطبيق مبدأ عدم التكرار DRY دائماً صحيح؟ ومتى يكون تطبيقه مضراً للبرنامج؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لا، التطبيق الأعمى לـ DRY قد يربط مكونات (Components) منفصلة ببعضها بقسوة.",
            "مثال: إذا كان زر تسجيل الدخول وزر الشراء متشابهين 'صدفةً' حالياً وتم دمجهم في كود واحد. غداً سيطلب العميل تعديل زر الشراء، فتجد نفسك مضطراً لوضع (If conditions) معقدة تكسر مبدأ الـ SRP."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Theoretical",
        question: "Explain YAGNI and how it relates to Agile development.",
        questionAr: "كيف يتطابق مبدأ YAGNI مع بيئة العمل الرشيقة (Agile) لتوفير وقت الشركة؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "أجايل تعتمد على تسليم القيمة بأسرع وقت متوفر اليوم.",
            "YAGNI تمنع المطور من تضييع أسبوع في برمجة 'نظام صلاحيات معقد' لم يُطلب بعد، لأنه غالباً سيتغير الـ Business Requirement ولن تُستخدم هذه الأكواد أبداً."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["العقلية البراجماتية (العملية)، المبرمج الذي ينهي التاسك بذكاء وليس المبرمج المتفلسف الذي يعطل المشروع."],
      redFlags: ["بناء معمارية بـ 10 طبقات (Clean Arch) لتطبيق مجرد (To-do list)."],
      greenFlags: ["إدراك مقولة 'أكثر كود خالي من الـ Bugs هو الكود الذي لم يُكتب بعد' إشارة للـ YAGNI."]
    },
    linkedCards: {
      prerequisites: ["solid-principles"],
      nextSteps: [{ id: "design-patterns-creational", title: "Creational Patterns" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تجميع أزرار التطبيق بالكامل تحت ويدجت عملاقة \`CustomGlobalButton\` بها 30 متغير للحفاظ على ה- DRY.",
        whyWrong: "هذا يكسر الـ KISS ויجعل تعديل أبسط زر كابوساً. استنساخ الكود (Duplication) أفضل من الاعتمادية الخاطئة (Wrong Abstraction).",
        correctApproach: "استخدام ה- Theme الخاص بـ Flutter بدلاً من اصطناع ويدجيتس مخصصة مقيدة لكل زر.",
        egyptianContext: "في الشركات الناشئة Startups، الـ YAGNI هو دستور العمل.. اعمل المطلوب منك اليوم فقط."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ 3 مصطلحات بسرعة", "ضرب مثال واقعي لأكبر فخ (الـ Over-engineering)", "توضيح متى نتخلى عن ה- DRY"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "4 دق" },
      keyPhrases: ["Over-engineering", "Premature Optimization", "Single Source of Truth"]
    },
    quickRevision: {
      bulletPoints: ["DRY = بلاش كوبي بيست، وحد المصدر.", "KISS = البساطة تكسب، العميل مش هيدفع في التعقيد.", "YAGNI = متبرمجش للمستقبل المجهول."],
      memoryHook: "DRY: متنشفش ريقنا في التعديل. KISS: خليك بسيط وخفيف. YAGNI: يا ابني مش هنحتاجها والله.",
      cheatSheet: "دايما اسأل نفسك: 'هل الكود ده هيخدم المشكلة الحالية حالا؟' لو إجابتك 'لا بس ممكن نحتاجه كمان شهر' = امسحه فوراً."
    },
    companyTags: ["Startups", "Swvl", "Bosta", "Breeva"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 18
  {
    id: "design-patterns-creational",
    number: 18,
    title: "Creational Patterns",
    titleAr: "أنماط التصميم الإنشائية (Factory, Builder)",
    level: "Mid",
    frequency: "Common",
    tags: ["Design Patterns", "Architecture"],
    definition: {
      summary: "أنماط مسؤولة عن أفضل الطرق والأفكار لـ (إنشاء الكائنات - Object Creation) بمرونة وأمان لتقليل الاعتمادية.",
      detailed: "الأنماط الإنشائية (Creational) تخفي تعقيد كيفية تكوين الكائنات. بدلاً من استدعاء \`new Class()\` مئات المرات بـ parameters كثيرة، نستخدم Factory لطلب كائن جاهز دون معرفة كواليس بنائه، أو Builder لبناء كائن عملاق خطوة بخطوة، أو Singleton لإجبار التطبيق على نسخة واحدة فقط، أو Prototype لنسخ الكائن بدلاً من بنائه من الصفر.",
      analogy: "السنجلتون (ملك واحد للدولة). الفاكتوري (مصنع سيارات تطلب منه النوع فيسلمك المفتاح دون أن تتدخل في اللحام). البيلدر Builder (بائع ساندوتشات Subway يركب لك الساندوتش خطوة بخطوة بناء على رغبتك).",
      keyPoints: [
        "Singleton: نسخة واحدة تعيش طوال عمل البرنامج (تُستبدل بـ GetIt فى فلاتر).",
        "Factory: دالة تُرجع كائناً من نفس الكلاس أو كلاس فرعي بناءً على الـ Params.",
        "Builder: يحل مشكلة الـ Constructors التي تأخذ 20 متغيراً بانشاء دوال تسلسلية (Chaining).",
        "Prototype/Clone: كلاس يحتوي على دالة \`copyWith\` المشهورة في دارت لنسخ حالة كائن حالي مع إجراء تعديل بسيط."
      ],
      codeExample: {
        language: "dart",
        code: `// 🎯 1. Prototype Pattern (copyWith in Flutter)
class UserConfig {
  final bool isDark;
  final String lang;
  UserConfig({required this.isDark, required this.lang});

  // דפוס ה- Prototype
  UserConfig copyWith({bool? isDark, String? lang}) {
    return UserConfig(
      isDark: isDark ?? this.isDark,
      lang: lang ?? this.lang,
    );
  }
}

// 🎯 2. Factory Pattern 
abstract class Button { void render(); }
class IOsButton implements Button { void render() => print('iOS Btn'); }
class AndroidButton implements Button { void render() => print('Android Btn'); }

class ButtonFactory {
  // المصنع يخفي التعقيد عن المطور
  static Button createButton(String os) {
    if (os == 'ios') return IOsButton();
    return AndroidButton();
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "How does the Factory pattern support the Open/Closed Principle?",
        questionAr: "كيف يدعم نمط الفاكتوري (Factory) مبدأ الـ Open/Closed من SOLID؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "دون الفاكتوري، المبرمج سيقوم بكتابة \`if(ios) new IOS()\`, في كل شاشات التطبيق.",
            "الفاكتوري يحصر مكان الإنشاء في ملف واحد. عند إضافة \`WebButton\`، نعدل مصنع الفاكتوري فقط، وستعمل جميع شاشات التطبيق تلقائياً دون لمسها."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "Why is 'copyWith' considered a variation of the Prototype pattern?",
        questionAr: "لماذا نعتبر دالة \`copyWith()\` الشهيرة في بلوك وفلاتر تطبيقاً لنمط פשוט للـ Prototype؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ Prototype هدفه استنساخ كائن (Clone) لتجنب كلفة إعادة تحميل الداتا الأصلية.",
            "\`copyWith\` تأخذ النسخة القديمة، تنقل المتغيرات كما هي لنسخة جديدة في الذاكرة مع دمج التغيير الجديد."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة قوية بأسس الـ OOP وأنماط كتابة كود مكتبات فلاتر الشهيرة وامتلاك لغة تواصل عليا (Design Patterns)."],
      redFlags: ["الخلط بين الفاكتوري (بناء جديد/سحب جديد) والسنجلتون (نسخة حصرية مدى الحياة)."],
      greenFlags: ["إدراك أن Dart تمتلك \`factory\` keyword ضمن اللغة نفسها ما يختصر الكثير من كتابة الأنماط الإنشائية."]
    },
    linkedCards: {
      prerequisites: ["dry-kiss-yagni"],
      nextSteps: [{ id: "design-patterns-structural", title: "Structural Patterns" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام Singleton لإدارة حالة التطبيق (State Management).",
        whyWrong: "لأنه Global Mutable State مخفية، تكسر استقلالية الشاشات وتجعل الـ Unit testing شبه مستحيل لوجوب تصفيره يدوياً.",
        correctApproach: "استخدام الـ Bloc أو Riverpod لإدارة الحالة، واستخدام Dependency Injection لحقن المتغيرات الخدمية كالتوكين و Dio.",
        egyptianContext: "شائع لكشف ما إذا كان المطور يقوم بكتابة 'Spaghetti Code' غير قابل للصيانة بمرور الوقت."
      }
    ],
    answerStrategy: {
      structure: ["تعريف القِسم الإنشائي (تسهيل بناء الكائنات)", "شرح الـ Builder لتبسيط الكلاس المعقد", "شرح دالة copyWith كإثبات لكثرة الاحتكاك بالأنماط"],
      timeAllocation: { junior: "2 دق", mid: "4 دق", senior: "5 دق" },
      keyPhrases: ["Object Instantiation hiding", "Subway Sandwitch Builder", "Immutability via Prototype"]
    },
    quickRevision: {
      bulletPoints: ["Factory: بيرجع كلاسات من عيلة واحدة بناء على شرط.", "Builder: خط إنتاج مفيد للكلاسات اللى الـ Constructor بتاعها مرعب وبياخد بارامترز كتيرة.", "Prototype = Clone / copyWith."],
      memoryHook: "Creation (الإنشاء): يا إما تصنعه بمصنع (فاكتوري)، يا تبنيه حتة حتة (بيلدر)، يا تاخده كوبي بيست (بروتوتايب).",
      cheatSheet: "دائماً جاوب بمثال دالة copyWith() كأفضل إثبات أنك מבין الـ Prototype في بيئة عمل Flutter و Bloc."
    },
    companyTags: ["ITWorx", "Valeo", "Robusta"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 19
  {
    id: "design-patterns-structural",
    number: 19,
    title: "Structural Patterns",
    titleAr: "الأنماط الهيكلية (Adapter, Facade)",
    level: "Mid",
    frequency: "Common",
    tags: ["Design Patterns", "Architecture"],
    definition: {
      summary: "أنماط التصميم المتخصصة في تجميع الكلاسات وتركيبها (Composition) لجعل الواجهات المعقدة سهلة ومترابطة.",
      detailed: "الأنماط الهيكلية (Structural) تهتم بالشكل والتغليف. نمط Adapter: يجعل واجهتين مختلفتين تعملان معاً كالمترجم. نمط Facade: اختصار نظام ضخم جداً ومليء بالكلاسات خلف واجهة بسيطة بـ 3 دوال فقط. نمط Decorator: حقن خصائص ومزايا إضافية للكائن في الـ Runtime دون استخدام الوراثة (Inheritance).",
      analogy: "الـ Adapter: مثل محول كهرباء الفيشة الثنائي للثلاثي. الـ Facade: مثل موظف خدمة العملاء؛ أنت تطلب منه شحنة، وهو يتعامل مع نظام المخازن، الحسابات، والمندوب في الخلفية.",
      keyPoints: [
        "Adapter: للأنظمة القديمة أو الباكدجات الخارجية لتوحيد الواجهة وتسهيل تبديلها.",
        "Facade: تغليف عدة مكتبات قبيحة ومقعدة في كلاس واحد جميل لتنظيف الـ UI.",
        "Decorator: استخدام تقنيات הـ Composition وتغليف المكون لزيادة قدراته (כמו Adding scrollbar to a widget)."
      ],
      codeExample: {
        language: "dart",
        code: `// 🎯 Facade Pattern
// بدلاً من استدعاء كل هذا العذاب في الشاشة (UI)
class ComplexPaymentSystem {
  void initCardToken() {}
  void encryptPin() {}
  void processMigs() {}
}

// 👑 ה- Facade يخفي كل التعقيد!
class SimplePaymentFacade {
  final sys = ComplexPaymentSystem();
  
  void payWithVisa() {
    sys.initCardToken();
    sys.encryptPin();
    sys.processMigs();
    print('تم الدفع بسهولة من زرار واحد');
  }
}

// 🎯 Adapter Pattern
class OldXmlApi { String getXml() => "<data>Hi</data>"; }
abstract class ModernJsonApi { String getJson(); }

class XmlToJsonAdapter implements ModernJsonApi {
  final OldXmlApi oldApi;
  XmlToJsonAdapter(this.oldApi);

  @override
  String getJson() => "{ data: \'\${oldApi.getXml()}\' }"; // تحويل فوري!
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you implement the Facade pattern in Flutter architecture?",
        questionAr: "كيف يتم تطبيق نمط الـ Facade عملياً في معمارية Flutter اليومية كأفضل ممارسة؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ Repository نفسه يُعتبر Facade! فهو يتعامل مع \`LocalDatabase\` و \`RemoteApi\` و \`CacheManager\` في الخلفية لإحضار الداتا.",
            "الواجهة لا تكترث من أين جاءت الداتا، تستدعي فقط \`repo.getUser()\` ليعمل كواجهة مبسطة (Facade) تخفي نظام البيانات المعقد."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Theoretical",
        question: "Difference between Decorator pattern and normal Inheritance?",
        questionAr: "الفرق بين استخدام الـ الوراثة واستخدام نمط الـ Decorator لإضافة خصائص لـ كلاس؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الوراثة (Inheritance) جامدة وتتم وقت الـ Compile ، وتجبرنا على وراثة دوال قد لا نحتاجها.",
            "الـ Decorator يغلف الكلاس الأصلي وقت التشغيل (Runtime)، فتستطيع إضافة 5 خصائص مختلفة بطبقات كالبصلة دون تضخم عدد الكلاسات المعمارية."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تفكير المطور في حماية النظام من التلويث بالأكواد القديمة والمعقدة."],
      redFlags: ["الخوف من كتابة Wrapper Classes ووضع كامل اللوجيك المعقد داخل الويجيدت."],
      greenFlags: ["استخدام ה- Facade كأداة قوية مع الباكدجات الخارجية، كي لو تغير الباكدج غدا نعدل ملف הFacade فقط ولا ينكسر التطبيق ككل."]
    },
    linkedCards: {
      prerequisites: ["design-patterns-creational"],
      nextSteps: [{ id: "design-patterns-behavioral", title: "Behavioral Patterns" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام باكدجات الـ Third Party مثل Firebase أو Dio مباشرة في كل شاشات الـ UI.",
        whyWrong: "لأن هذا يجعل تطبيقك مرتهن كلياً (Tightly coupled) لهذه المكتبة. لو توقفت، ستعيد كتابة كامل الـ UI.",
        correctApproach: "عمل Facade أو Adapter محلي (مثلاً \`NetworkClient\`) يغلف \`Dio\` بداخله، فالـ UI ينكلم مع محولك المحلي، والمحول يتحدث مع \`Dio\`.",
        egyptianContext: "خطأ فادح يتبين للأسس المرفوضة في شركات مثل ثاندر وموني فيلوز، الاستقلالية (Coupling) هي مفتاح القبول."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الهيكلة كغطاء مرتب للطبقات المعقدة", "مثال محول الفيشة للـ Adapter", "مثال خدمة العملاء للـ Facade ومدى ترابطها بالـ Repository"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "4 دق" },
      keyPhrases: ["Third-party Wrappers", "API Contract matching", "Complex sub-system simplification"]
    },
    quickRevision: {
      bulletPoints: ["Adapter = يحول كلاس قديم ليناسب واجهة حديثة.", "Facade = واجهة بسيطة بـ 3 زراير بتشغل ماكينة معقدة جوا.", "Decorator = يلبّس الكائن عباية جديدة بمزايا أكتر من غير وراثة."],
      memoryHook: "الهيكلة عاملة زي المقاولاتي: يا يوفق رأسين في الحلال (Adapter)، يا يقابلك بوش بشوش وهو بيشتم الصنايعية جوا (Facade).",
      cheatSheet: "دائماً اعمل دالة Repository كـ Facade تغلف הـ API والـ Hive Local DB وراها لكي تنظف הـ UI Bloc."
    },
    companyTags: ["Valeo", "Thndr", "Paymob", "Squadio"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Major" }
  },

  // CARD 20
  {
    id: "design-patterns-behavioral",
    number: 20,
    title: "Behavioral Patterns",
    titleAr: "الأنماط السلوكية (Observer, Strategy)",
    level: "Mid",
    frequency: "Common",
    tags: ["Design Patterns", "Architecture", "Reusability"],
    definition: {
      summary: "إدارة الاتصال، تفويض المهام، وتوزيع السلوك بين الكائنات بمرونة (مثل الـ Observer والـ Strategy).",
      detailed: "الأنماط السلوكية تعتني بـ 'كيف تتواصل الكائنات وتتخاطب معاً'. Pattern الـ Observer: هو القلب النابض لفلاتر؛ كائن ينشر تغييراً، والبقية (Subscribers) يستمعون وينفذون برد فعل. نمط Strategy: تبديل خوارزمية وحسابات معقدة في وقت التشغيل حسب رغبة المستخدم (دفع كاش أم فيزا) دون الحاجة لآلاف جمل הـ If/Else. نمط Command: تغليف طلب معين في كائن لوحدة لتسهيل عمل (Undo / Redo).",
      analogy: "الـ Observer: اليوتيوبر (Subject) نزل فيديو، فاليوتيوب يرسل إشعارات لآلاف المشتركين (Observers) تلقائياً. הـ Strategy: السفر للإسكندرية.. تملك استراتيجية 'القطار' و استراتيجية 'السيارة'، تبدل بينهم حسب ميزانيتك وقت الحجز.",
      keyPoints: [
        "Observer: أساس הـ State Management (الـ ChangeNotifier والـ Stream هم Observers).",
        "Strategy: للقضاء على קוד الـ if/else الضخم عندما يتغير بيزنس الدفع، الخصم، أو التنقل.",
        "Command: مذهل في تطبيقات الرسم والألعاب للرجوع في الخطوات."
      ],
      codeExample: {
        language: "dart",
        code: `// 🎯 Strategy Pattern
// 1. الدستور المشترك
abstract class PaymentStrategy { void pay(double amount); }

// 2. الاستراتيجيات المختلفة، كل واحدة في كلاس نظيف منفصل
class CashPayment implements PaymentStrategy { 
  void pay(double amt) => print('الدفع نقداً للمندوب'); 
}
class VisaPayment implements PaymentStrategy { 
  void pay(double amt) => print('خصم وتشفير من الفيزا'); 
}

// 3. عربة التسوق (لا يهمها نوع الدفع، فقط تأمر بالتنفيذ)
class CartContext {
  PaymentStrategy strategy;
  CartContext(this.strategy); // حقن الاستراتيجية المحددة

  void setStrategy(PaymentStrategy newS) => strategy = newS;
  
  void checkout() => strategy.pay(500); 
}

void main() {
  final cart = CartContext(CashPayment());
  cart.checkout(); // يدفع كاش
  cart.setStrategy(VisaPayment());
  cart.checkout(); // يبدل الاستراتيجية فوراً לفيزا בـ Runtime!
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How does the Observer Pattern relate to the Provider State Management in Flutter?",
        questionAr: "كيف يعتمد مكتبة Provider أو الـ ChangeNotifier في الـ Flutter على نمط الـ Observer؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ ChangeNotifier هو الـ (Subject/Publisher) الذي يحتفظ بقائمة من المستمعين الويجيدت، ويمتلك دالة \`notifyListeners()\`. ",
            "الـ Consumer Widget هو الـ (Observer/Subscriber) الذي بمجرد سماع النداء، يقوم بعمل Rerender (إعادة رسم) بناء على التغيير."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Critical Thinking",
        question: "How can Strategy Pattern terminate endless if/else blocks violating the Open/Closed Principle?",
        questionAr: "كيف يقضي نمط الـ Strategy على مئات سطور الـ if/else بخصوص وسائل الدفع؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "بدلاً من الدالة العظيمة بدلاً الدفع التي تفحص \`if(cash)\` أو \`if(visa)\`، نضع كل 'If condition' ككلاس منفرد يطبق ذات الواجهة (Interface).",
            "هذا يحمي הـ Open/Closed، فعند إضافة وسيلة (Fawry Pay)، نكريت كلاس جديد للـ Fawry دون لمس والعبث بالكود القديم للكاش."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على فصل الויجديتس وإدارة شجرة الUI باستخدام הـ Reactive/Observer. وكتابتك لـ Clean Code خالي من ה- Nested Ifs."],
      redFlags: ["عدم معرفة ماهية الـ Publisher vs Subscriber."],
      greenFlags: ["إدراك أن الـ Strategy Pattern هو التطبيق الأمثل والعملي لمبدأ הـ Dependency Inversion (DIP) في הSOLID."]
    },
    linkedCards: {
      prerequisites: ["design-patterns-structural"],
      nextSteps: [{ id: "dependency-injection", title: "Dependency Injection" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "نسيان عمل \`removeListener\` أو \`dispose\` للـ Observer بعد خروج المستخدم من الشاشة.",
        whyWrong: "هذا يسبب Memory Leaks وتسريباً للمعلومات. اليوتيوبر (Subject) سيظل ينادي على مشترك (Observer) ميت، مما يكسر التطبيق.",
        correctApproach: "استخدام دورة الـ StatefulWidget دائما وتنظيف הـ Controllers بداخل الـ dispose.",
        egyptianContext: "سؤال أساسي لفلترة مستويات הـ Mid-level engineers في مصر لكشف قدرتهم على إدارة الـ 메모리 (الذاكرة)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Observer وأهميته الحيوية للفلاتر", "كيف ينظف הـ Strategy كودك من القذارة הـ if/else", "لمحة لنمط הـ Command لأزرار الـ Undo"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "4 دق" },
      keyPhrases: ["Pub/Sub Mechanism", "Algorithm Encapsulation via Strategy", "Runtime Flexibility"]
    },
    quickRevision: {
      bulletPoints: ["Observer: واحد بيزعق (Publisher) والتانيين بيسمعوا وتتغير حالتهم (Subscribers).", "Strategy: بدل הـ if/else الطويلة، اعمل كلاس لكل احتمال وبدل بينهم.", "Command: ارمي الأمر جوا كبسولة عشان تعرف تعمله Undo بسهولة."],
      memoryHook: "السلوكיות: يا تفضح السر للكل (Observer)، يا تبدل خطط الدفع بمزاجك في الRuntime (Strategy).",
      cheatSheet: "דائماً اربط הـ Observer بـ الـ Streams أو StateManagement في インタービュー لإثبات الوعي الحقيقي لفلاتر."
    },
    companyTags: ["MaxAB", "Swvl", "Paymob", "Breeva"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 21
  {
    id: "dependency-injection",
    number: 21,
    title: "Dependency Injection (DI)",
    titleAr: "حقن التبعيات (GetIt)",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "DI", "Testing"],
    definition: {
      summary: "إعطاء الكلاس ما يحتاجه من الخارج (حقن) بدلاً من أن يقوم بإنشائه بنفسه بالداخل، لسهولة التبديل وعمل الـ Tests.",
      detailed: "بدلاً من أن يقوم كلاس \`LoginScreen\` بإنشاء نسخة جديدة من \`Dio()\` بنفسه في الداخل (مما يجعله معتمداً كلياً عليه مستحيلاً اختباره)، نقوم بإنشاء \`Dio\` مرة واحدة في بداية التطبيق، ونمررها (نحقنها) كبارامتر للسكريبتات. هذا هو الـ Dependency Injection. أشهر أدوات تطبيقه في سياق فلاتر هي باكدج \`get_it\` والتي تعمل بمبدأ Service Locator كدليل هاتف مجاني وسريع جداً.",
      analogy: "بدلاً من أن يقوم كل موظف (كلاس) بتصنيع ماكينة قهوة خاصة به في مكتبه (استهلاك طاقة وازدحام)، تقوم الشركة بشراء ماكينة قهوة واحدة ضخمة في الاستقبال (Service Locator / get_it)، وأي موظف يحتاج قهوة يذهب للمسئول ليصب له كوباً (Injection).",
      keyPoints: [
        "Constructor injection: أفضل والأسلم (يمرر كمتغير في الكونستراكتور).",
        "Service locator: نمط تستخدمه \`get_it\` للوصول للكائنات من أي مكان في التطبيق (Global access) بأمان.",
        "Injectable: أداة ذكية تقوم بكتابة كود الـ GetIt نيابة عنك (Code Generation) لمنع نسيان الحقن.",
        "يفصل الـ UI عن الـ Logic: الشاشة فقط تعرف أنه هناك مستودع، لا يهمها هل هو فايربيز أم API محلي."
      ],
      codeExample: {
        language: "dart",
        code: `// ❌ كود عقيم (Tight Coupling) بدون DI
class UserRepository {
  final ApiClient api = ApiClient(); // لو غيرنا הAPI هنضطر نعدل الملف دا اجبارى!
}

// ✅ كود يطبق הـ DI عن طريق הـ Constructor
class UserRepository {
  final ApiClient api; 
  UserRepository({required this.api}); // ادينى الAPI من برا وانا هشتغل بيه
}

// 📦 استخدام GetIt كـ Service Locator
final sl = GetIt.instance;

void setupDI() {
  // بنبني ماكينة القهوة (سنجلتون) مرة واحدة
  sl.registerLazySingleton<ApiClient>(() => DioApiClient());
  
  // بنبني المستودع وبنخليه ياخد نسخة הAPI الجاهزة 
  sl.registerFactory<UserRepository>(() => UserRepository(api: sl<ApiClient>()));
}

void main() {
  setupDI();
  // השתמש בـ UserRepository בשיא הפשטות (استخدمه ببساطة)
  final repo = sl<UserRepository>();
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Difference between registerFactory and registerLazySingleton in GetIt?",
        questionAr: "ما هو الفرق بين \`registerFactory\` و \`registerLazySingleton\` عند حقن التبعيات في GetIt؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`registerFactory\`: توزع نسخة *جديدة* كلما ناديت عليها. (تستخدم مع الـ Bloc/ViewModel لتبدأ الشاشة من الصفر).",
            "\`registerLazySingleton\`: توزع *نفس النسخة* في كل مرة طوال التطبيق ولا يتم بناؤها إلا عند أول مرة تطلبها. (تستخدم مع الشيرد بريفيرنس او API). "
          ],
          timeToAnswer: "1.5 mins"
        }
      },
      {
        type: "Practical",
        question: "How does Dependency Injection facilitate Unit Testing in Flutter?",
        questionAr: "كيف يجعل نمط 'حقن التبعيات' عملية كتابة الـ Unit Tests ممكنة وسهلة في تطبيقات فلاتر؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "في הـ Test، نحن لا نريد استدعاء إنترنت حقيقي أو دفع بطاقات حقيقية.",
            "لو الكلاس منشأ الـ API بداخله، لا يمكننا إيقافه. أما مع הـ DI، يمكننا حقن \`MockApiClient()\` (نسخة مزيفة مسالمة) داخل الـ Constructor لاختبار المنطق الداخلي بأمان وسرعة."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على بناء تطبيق Architecture نظيف وخالي من التشابكات (Tight Coupling)."],
      redFlags: ["الاعتماد المباشر على المتغيرات الجلوبال، وعدم معرفة استخدام Mocking."],
      greenFlags: ["استخدام باكدج \`injectable\` لإثبات القدرة المتطورة على توفير مئات السطور اليدوية في الـ Setup للشركات الكبرى."]
    },
    linkedCards: {
      prerequisites: ["solid-principles"],
      nextSteps: [{ id: "repository-pattern", title: "Repository Pattern" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تسجيل كل الكلاسات كـ LazySingleton دون الحاجة.",
        whyWrong: "لأن الـ Singletons تبقى حية في الذاكرة للأبد (Memory Leak مُحتمل). الـ Blocs مثلاً يجب أن تُغلق مع الشاشة، لذا يجب تسجيلها كـ Factory.",
        correctApproach: "استخدم Singleton للـ الخدمات (Services/DB/API) و Factory للمتغيرات المتعلقة بالشاشات المؤقتة.",
        egyptianContext: "سؤال متكرر في فوري وموني فيلوز لاصطياد العشوائية في إدارة الـ State المتكدسة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ DI كفصل الارتباط", "الفرق بين الـ Factory والـ Singleton", "أهميته السحرية في كتابة الـ Unit Tests"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "4 دق" },
      keyPhrases: ["Inversion of Control", "Test Doubles / Mocks", "Loose Coupling"]
    },
    quickRevision: {
      bulletPoints: ["DI = اديله حاجته جاهزة في الكونستراكتور.", "GetIt = الدليل العظيم اللى بيخزن كل النسخ الجاهزة.", "Singleton واحد بيعيش للأبد ، Factory واحد جديد كل مرة."],
      memoryHook: "حقن التبعيات زي السرنجة بتاعة الدكتور، بدال ما المريض يصنع الدواء جوا جسمه، إحنا بنحقنهوله جاهز عشان يخدم بسرعة.",
      cheatSheet: "دايما اجعل הـ RemoteDataSource כـ LazySingleton والـ Cubit כـ Factory כדי يتريست مع قفلة الشاشة."
    },
    companyTags: ["Squadio", "Thndr", "Paymob", "Fawry"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 22
  {
    id: "repository-pattern",
    number: 22,
    title: "Repository Pattern",
    titleAr: "نمط المستودع (Data Gateway)",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "Data Layer"],
    definition: {
      summary: "إخفاء مصادر البيانات المتعددة (API, Local DB) خلف طبقة وسيطة (مستودع) لتنظيف الـ Business Logic.",
      detailed: "نمط Repository يستقبل طلبات הـ Cubit/Bloc ويقرر من أين يأتي بالبيانات. هل لا يوجد إنترنت؟ سيجلبها من הـ Cache. هل الإنترنت سريع؟ سيجلبها من הـ API ويحدث الـ Cache. الـ Bloc לא يعلم ولا يُبالي من أين جاءت البيانات، він يتعامل فقط مع הـ Repository. هذا يفصل طبقة البيانات كلياً بطريقة لامحدودة النظافة (Facade).",
      analogy: "الريبوستري (المخزنجي العبقري): الـ Bloc كطباخ المطعم يطلب طماطم، المخزنجي إما يخرج طماطم مجمدة (Local DB) إن لم يجد طازجة، أو يشتري طازجة من السوق (API) ويسلمها للطباخ نظيفة. الطباخ لا يكترث لرحلة البحث، دوره الطبخ فقط.",
      keyPoints: [
        "Single Source of Truth: مكان واحد وموحد لكل عمليات הـ Data Retrieval.",
        "Abstract Implementation: يفضل أن يكون वाجهة (Interface) لاختباره بسهولة.",
        "Caching Management: هو المعني الأوحد بمزامنة وتخزين الداتا أوفلاين كحائط صد.",
        "Data mapping: تحويل الـ JSON النيء إلى Models نظيفة وواضحة للـ UI."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. الدستور المشترك للتست
abstract class AuthRepository {
  Future<User> getUser();
}

// 2. المخزنجي الحقيقي (Repository)
class AuthRepositoryImpl implements AuthRepository {
  final RemoteDataSource api;
  final LocalDataSource cache;
  
  AuthRepositoryImpl(this.api, this.cache);
  
  @override
  Future<User> getUser() async {
    try {
      // حاول تجيب داتا طازة من السوق (النت)
      final user = await api.fetchUser();
      // خزّن نسخة عشان الأوفلاين
      await cache.saveUser(user);
      return user;
    } catch (e) {
      // مفيش نت؟ هات كيس المجمدات من التلاجة الموبايل (Local)
      final cachedUser = await cache.getUser();
      if (cachedUser != null) return cachedUser;
      
      throw Failure('لا يوجد اتصال وكاش فارغ');
    }
  }
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "Why should the Controller/Bloc strictly never communicate with the API directly?",
        questionAr: "لماذا نُعتبر استخدام اتصال الـ API مباشرة من داخل الـ Cubit/Bloc (تخطي الـ Repository) جريمة معمارية؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لو اتصل الـ Bloc مباشرة بالـ API، ثم طلب العميل إضافة ميزة (Offline Support/Hive)، سنضطر لتمزيق الـ Bloc بالكامل وتلويث منطق العرض הـ UI بمنطق التخزين.",
            "الـ Repository يعمل كدرع امتصاص للصدمات؛ الـ API يتغير، قاعدة البيانات تتغير، لكن الـ Bloc يظل ثابتاً لا ينكسر بفضل הـ Abstraction."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "How do you map throwing Exceptions into functional Results in the Repository?",
        questionAr: "كيف يستخدم المُستودع (Repository) نمط הـ Result (أو Either من باكدج dartz/fpdart) لحماية واجهة المستخدم؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ DataSource (الـ API) يلقي أخطاء متطايرة (\`throw Exception\`).",
            "دور הRepository إخماد هذا الانفجار داخل \`try-catch\`، وإرجاع \`Either<Failure, User>\` مغلفة، وبذلك يصل הFailure للـ Bloc بسلام كـ Object عادي ليُعرَض في شريط أحمر הـ SnackBar."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["إثبات فهم הـ Clean Architecture وتوزيع الطبقات وفصل الـ Data Layer كلياً."],
      redFlags: ["كتابة كود الـ http.get داخل ملف الـ UI.dart (يُعتبر انتحار للمقابلة الفنية)."],
      greenFlags: ["استخدام הالمستودع למزامنة الـ Offline Sync بشكل ذكي وشفاف."]
    },
    linkedCards: {
      prerequisites: ["dependency-injection"],
      nextSteps: [{ id: "unit-of-work", title: "Unit of Work" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "جعل المستودع يعيد Models مليئة بـ JSON keys بدلاً من Entities نقية.",
        whyWrong: "المستودع العظيم يرسل للطبقات العليا Models خالية من الـ \`toJson\` و \`fromJson\` ليمنع تسرب الـ Backend Details للواجهة.",
        correctApproach: "تحويل الـ UserModel إلى UserEntity نظيف قبل تمريره للطبقات العليا.",
        egyptianContext: "في تطبيقات التوصيل (Delivery)، الـ Offline caching للـ Repository يعتبر هو شريان الحياة الرئيسي للتطبيق."
      }
    ],
    answerStrategy: {
      structure: ["تعريف הالريبوستري كبوابة قرار (Gateway)", "التأكيد على دوره في הـ Exception Handling", "دوره העنقودي في הـ Offline First Strategy"],
      timeAllocation: { junior: "4 دق", mid: "5 دق", senior: "4 دق" },
      keyPhrases: ["Single Source of Truth", "Data Abstraction", "Offline caching orchestrator"]
    },
    quickRevision: {
      bulletPoints: ["Repository = أمين المخزن اللى بيجيب الداتا، مالكش دعوة جابها منين.", "بيفصل הـ API والـ Local DB عن عين הـ Bloc تماماً.", "بيمسك الـ Exceptions ويحولها لـ Errors شيك (Either/Result)."],
      memoryHook: "Repository: المطعم شغال، النت يقطع، قاعدة البيانات شغالة تضخ له الأكل.. لا الوجبة تتأثر ولا البلوك يحس.",
      cheatSheet: "דائما ضع הـ Repository Pattern כالطبقة العازلة الوسطى في رسم معمارياتك על הـ Whiteboard."
    },
    companyTags: ["Thndr", "Paymob", "MaxAB", "Instabug"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 23
  {
    id: "unit-of-work",
    number: 23,
    title: "Unit of Work",
    titleAr: "وحدة العمل (المعاملات والتتبع)",
    level: "Senior",
    frequency: "Rare",
    tags: ["Architecture", "Data Layer"],
    definition: {
      summary: "حفظ عدة تغييرات على قاعدة البيانات ككتلة واحدة (Transaction)، إما تنجح كلها أو تلغى كلها معاً لضمان سلامة البيانات.",
      detailed: "عندما تطلب تحويل 500 جنيه من حسابك لحساب خليل، يجب خصم المبلغ من رصيدك (تحديث أول)، وإضافته لحساب خليل (تحديث ثانٍ). ماذا لو تعطل السيرفر بعد الخصم وقبل الإضافة؟ غادرت الأموال للعدم! هنا يتدخل الـ Unit of Work (أو Transactions). يضع جميع الأوامر في جعبة مغلقة، ويحاول حقنها في الداتا بيز (Commit). لو فشل أي أمر، يتم التراجع عن جميع الأوامر السابقة اليا (Rollback) للحفاظ على التناسق.",
      analogy: "وحدة العمل مثل تسليم شنطة هدايا لعريس. إما أن تسلم الشنطة كاملة (القميص، البنطلون، الكرافتة) معاً، أو تعود بها كاملة. ليس مقبولاً أن تسلم הקמיص والبنطلون ولكن تضيع الكرافتة في الطريق. كل شئ أو لا شئ.",
      keyPoints: [
        "Atomicity: في قواعد البيانات يعني الذرية (صعوبة التجزئة - All or Nothing).",
        "Rollback: القدرة المذهلة على إرجاع عقارب الساعة للخلف وعكس التغييرات الجزئية في حال الفشل.",
        "Batch Processing: توفير طاقة الـ DB بإرسال 100 أمر كحزمة دفعة واحدة بدلاً من 100 اتصال منفرد.",
        "يتبع الـ Repository Pattern عادة كخطوة أمنية اعلى."
      ],
      codeExample: {
        language: "dart",
        code: `// פשטية لمبدأ הـ Unit of Work باستخدام SQFLite Transaction
class MoneyTransferService {
  final Database db;
  MoneyTransferService(this.db);
  
  Future<void> sendMoney(int fromId, int toId, double amount) async {
    // 🛡️ بداية حماية المعاملة (Unit Of Work)
    await db.transaction((txn) async {
      try {
        // 1. اخصم من هنا
        await txn.rawUpdate(
          'UPDATE Accounts SET balance = balance - ? WHERE id = ?', 
          [amount, fromId]
        );
        
        // 🚨 لو حصل קרש (خطأ) في اللحظة دي.. الداتابيز هتلغي الخطوة رقم 1 لوحدها!
        
        // 2. وحُط هنا
        await txn.rawUpdate(
          'UPDATE Accounts SET balance = balance + ? WHERE id = ?', 
          [amount, toId]
        );
        
        // Transaction Successful (Commit)!
      } catch(e) {
        // في حال حدوث أكسبشن، النظام يعمل (Rollback) ويرجع فلوس الأولاني
        throw Exception('فشلت العملية، تم استرجاع الأموال كأن شيئا لم يكن!');
      }
    });
  }
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you ensure Data Consistency (ACID) when saving an Order and deleting its items from Cart simultaneously?",
        questionAr: "كيف تضمن تناسق البيانات عند نقل سلة مشتريات (Cart) إلى جدول الطلبات (Orders) ثم تفريغ السلة؟",
        difficulty: 5,
        expectedAnswer: {
          points: [
            "لو استخدمنا 2 Repos منفصلة (حفظ الطلب، مسح السلة)، قد يحفظ الطلب ويفصل الإنترنت قبل مسح السلة، فيدفع العميل مرتين.",
            "الحل تطبيق الـ Unit of Work (Transaction) لتغليف العمليتين؛ إما يتم تصفير السلة وإصدار الفاتورة أو تلغى الفاتورة وتبقى السلة."
          ],
          timeToAnswer: "3 mins"
        }
      },
      {
        type: "Deep Dive",
        question: "What is the key difference between a Repository and a Unit of Work?",
        questionAr: "ما هو الفارق الجوهري بين نمط الـ Repository ونمط الـ Unit of Work؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ Repository يتعامل بصيغة المفرد مع جدول كائن واحد (مثل User أو Product) ويهتم بالحصول والإدراج.",
            "الـ Unit of Work يتعامل كمنسق أو قائد أوركسترا (Coordinator) لتنسيق عدة مستودعات في مهمة معقدة وربطها بعملية حفظ واحدة (Commit)."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["وعي تام بمخاطر الـ Partial Failed States في الأنظمة المالية وتطبيقات التجارة الإلكترونية."],
      redFlags: ["الجهل بمصطلح Rollback والاعتماد على إرسال الـ API Calls بشكل عشوائي دون ربطها منطقياً."],
      greenFlags: ["ذكر كلمة ACID properties و تطبيق الTransactions في Firebase أو Sqflite بطلاقة."]
    },
    linkedCards: {
      prerequisites: ["repository-pattern"],
      nextSteps: [{ id: "cqrs-pattern", title: "CQRS Pattern" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "معالجة التراجع (Rollback) يدوياً باستخدام أكواد برمجية (If failed -> send delete API).",
        whyWrong: "هذا يعتمد على كود العميل ووضعه (قد يغلق التطبيق أو ينفذ شحنه)، الـ DB Transactions هي الوحيدة المضمونة لحماية الداتا.",
        correctApproach: "استخدام ה \`db.transaction\` أو \`Firestore.instance.runTransaction\` لضمان الذرية (Atomicity).",
        egyptianContext: "سؤال فاصل في شركات التُقنية المدفوعات (Fintech) أمثال Paymob لفلترة الـ Seniors."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ UoW كقفل أمان للمهام المشتركة", "شرح مثال البنك (تحويل رصيد)", "توضيح مفهوم الـ Rollback في فلاتر (Firestore/SqfLite)"],
      timeAllocation: { junior: "0 دق", mid: "4 دق", senior: "5 دق" },
      keyPhrases: ["ACID Properties", "Atomicity", "Transaction Rollback", "Orchestrating Multiple Repos"]
    },
    quickRevision: {
      bulletPoints: ["Unit of Work = عملية يا تتنفذ كلها حتة واحدة يا متتلغى كلها.", "بيحمي السيستم من الأخطاء النص-نص (واحد حسابه اتخصم والتاني موصلوش).", "أكبر تطبيق ليها هو الـ (Transactions) في الداتا بيز."],
      memoryHook: "لو بتشيل عفش بيت.. إما كل العفش يوصل الشقة الجديدة سليم للآخر، أو ترجعوا كله تاني عالشقة القديمة، مينفعش تسيب التلاجة في نص السلم.",
      cheatSheet: "דائماً اذكر Firestore Transactions كدليل للإنترفيور أنك لا تكتب كود قراءة فقط بل تكتب كود יحمي חسابات أموال حقيقية."
    },
    companyTags: ["Paymob", "Fawry", "Thndr"],
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
    tags: ["Architecture", "System Design", "Backend"],
    definition: {
      summary: "فصل العمليات التي تقوم بتغيير الداتا (Commands) عن العمليات التي تقرأ الداتا (Queries) لزيادة السرعة وتقليل التعقيد.",
      detailed: "CQRS (Command Query Responsibility Segregation) هو نمط يتم استخدامه في تطبيقات הـ Scale العالية. الفكرة هي أن موديل الداتا الذي نقرأه لقائمة المنتجات (بسيط وسريع) يجب ألا يكون نفس موديل الداتا الذي نستخدمه لإضافة منتج جديد (معقد، به فحص صلاحيات وقوانين بيزنس). بفصلهما لجزئين (Command للكتابة، Query للقراءة) نستطيع جعل عملية الـ Read سريعة جداً كصاروخ بدون أي Rules معطلة.",
      analogy: "زي مطعم الوجبات السريعة؛ الكاشير بياخد منك طلب الدفع (Command للـ Write) والمطبخ بيحضره.. بينما شاشة الأرقام اللي فوق (Query للـ Read) مجرد بتعرض الأرقام للناس بسرعة من غير ما تحسب أي ضرايب أو فواتير.",
      keyPoints: [
        "Commands: إجراءات تغير حالة النظام (Create Order, Update Password). لا ترجع أي داتا، فقط تخبرك للنجاح أو الفشل.",
        "Queries: استعلامات بريئة لقراءة شكل الداتا (Get User Profile). لا تغير في الـ Server شيئاً أبداً.",
        "Asymmetrical Scaling: يسمح لنا بزيادة سيرفرات הـ Read لتكون 10 أضعاف سيرفرات הـ Write حيث أن 90% من المستخدمين يقرأون ولا يكتبون."
      ],
      codeExample: {
        language: "dart",
        code: `// فلاتر تطبيق للـ CQRS
// --- ה- Query (للقراءة فقط، بسيط وسريع) ---
class GetUserQuery {
  final String userId; 
  GetUserQuery(this.userId);
}
// הـ Handler الخاص بالقراءة بيرجع داتا
class GetUserHandler {
  Future<UserView> handle(GetUserQuery q) async => api.fetchParams(q.userId);
}

// --- ה- Command (للكتابة والتغيير، مليء بالشروط) ---
class ChangePasswordCommand {
  final String oldPass;
  final String newPass;
  ChangePasswordCommand(this.oldPass, this.newPass);
}
// הـ Handler الخاص بالكتابة לא يُرجع داتا، بل ينفذ (أو يرفض)
class ChangePasswordHandler {
  Future<void> handle(ChangePasswordCommand c) async {
    if(c.newPass.length < 8) throw Exception('ضعيف جدا');
    await db.updatePass(c.newPass);
  }
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "When should we avoid CQRS pattern despite its power?",
        questionAr: "متى نعتبر أستخدام CQRS كارثة هندسية في بعض التطبيقات؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "في التطبيقات التي تقدم عمليات CRUD بسيطة جداً (Crate, Read, Update, Delete).",
            "استخدام الـ CQRS فيها كمن يقتل ذبابة بمدفع، سيضاعف حجم الكود مرتين، ويصنع التعقيد لتطبيقات تو-دو ليست سخيفة لا تحتاج التوسع."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Theoretical",
        question: "How does CQRS relate to Eventual Consistency?",
        questionAr: "كيف يرتبط نمط الـ CQRS بمفهوم 'التزامن المتأخر' (Eventual Consistency)؟",
        difficulty: 5,
        expectedAnswer: {
          points: [
            "عندما نفصل الـ Write Database عن הـ Read Database للسرعة القصوى، فإن الأمر الذي يتم حفظه یحتاج أجزاء من الثانية (أو دقائق لو הـ Load عظيم) لكي ينسخ لقاعدة بيانات הקראة.",
            "لذلك العميل قد يقوم يتغيير صورته (Command)، ولما يقرأ البروفايل فوراً (Query) قد يجد صوره القديمة لفترة قصيرة حتى يتم المزامنة النهائي."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["الوعي بالـ Backend Architectures لأن كبار المهندسين همزة الوصل بين הـ Mobile والـ Server."],
      redFlags: ["الاعتقاد بأن CQRS هي عبارة عن مكتبة أو State Management لغة Dart."],
      greenFlags: ["ذكر أن Bloc pattern يعتمد قليلا على فكر הـ CQRS (أحداث Events تدخل 'Commands' ، وحالة State تخرج 'Query')."]
    },
    linkedCards: {
      prerequisites: ["unit-of-work"],
      nextSteps: [{ id: "event-sourcing", title: "Event Sourcing" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "جعل הـ Command يُرجع Object كامل من الـ Database بعد إجراء الانشاء.",
        whyWrong: "هذا يكسر الـ CQRS تماماً المسمى (CQS Principle)، የالـ Command يجب أن يُرجع רק (Void / النجاح) وأنت כـ Client تقوم بـ Query جديدة لجلب הדاتا لإجبار الفصل القاطع.",
        correctApproach: "الكتابة تغير ولا تعود بشيء، والقراءة تعود بالنتيجة ولا تغير شيء.",
        egyptianContext: "نادراً ما يُسأل בFlutter، ولكنه فاكهة الـ System Design בـ Instabug וـ  Foodics."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الاختصار (C-Q-R-S)", "تبيين الفارق بين القراءة البريئة والكتابة الحاسمة", "ذكر العيوب (التعقيد الزائد في المشاريع الصغيرة)"],
      timeAllocation: { junior: "0 دق", mid: "4 دق", senior: "5 دق" },
      keyPhrases: ["Separation of concerns", "Eventual Consistency", "Asymmetrical Scaling", "CQS definition"]
    },
    quickRevision: {
      bulletPoints: ["CQRS = اِقرأ من حتة (سريعة)، واكتب وغيّر في حتة تانية (دقيقة).", "Command: أمر بالتغيير، مابيرجعش داتا (غير كلمة تم).", "Query: استفسار سريع، مبياخدش أي خطوة، بس بيعرضلك المتاح."],
      memoryHook: "الموبايل ليه كاميرا تصور وليه شاشة تعرض.. لا الشاشة المكسورة وتوقف الكاميرا، ولا الكاميرا المحروقة تمنعك تتفرج ع اللي متصور. افصلهم ترتاح.",
      cheatSheet: "لو الانترفيور سألك استخدمته إمتى في فلاتر؟ قوله الـ Bloc Pattern هو مصغر مبدع للـ CQRS، הـ Events هي הCommands، والـ States هي הQueries المبنية للقراءة."
    },
    companyTags: ["International", "Foodics", "Talabat"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Critical for Senior" }
  },

  // CARD 25
  {
    id: "event-sourcing",
    number: 25,
    title: "Event Sourcing",
    titleAr: "تخزين الأحداث كمصدر للحقيقة",
    level: "Senior",
    frequency: "Rare",
    tags: ["Architecture", "System Design"],
    definition: {
      summary: "بدلاً من تخزين 'الرصيد الحالي'، نخزن 'كل العمليات التاريخية' التي أدت للرصيد الحالي، لنتمكن من إعادة بناء أي حالة دوماً.",
      detailed: "في الأنظمة التقليدية (CRUD)، لو تم تحديث السعر من 10 لـ 20 دولار يتم محو الـ 10 للأبد (State Loss). نمط הـ Event Sourcing لا يحفظ (Current State) بل يحفظ دفتر يوميات لكل حدث وقع (ItemCreated, PriceChanged). لمعرفة السعر الحالي، يقوم السيرفر بلعب شريط الأحداث من البداية لتجميع القيمة النهائية كآلة الزمن. هذا يتيح لنا تريساً هائلاً للمراجعات البنكية (Audit Trails).",
      analogy: "تخيل أنك تلعب شطرنج. بدلاً من أخذ صورة فوتوغرافية للرقعة كل ثانية (Database)، تقوم فقط بتسجيل حركات اللعب بورقة والقلم (Events): الحصان حرك لليمين، الوزير أكل العسكري. لتعرف شكل الرقعة الآن، تعيد الخطوات من ورقتك وسیتشكل نفس الرقعة.",
      keyPoints: [
        "Audit Trail: المراجعة التاريخية مضمونة 100% ولا يمكن إخفاء أي تلاعب أيا كان.",
        "Immutability: الأحداث (Events) مجرد حفظ ولا تمسح أو تتعدل ابداً.. لو حدث خطأ، نضيف حدثاً جديداً كـ 'تصحيح' (Reversal Event).",
        "Replay: القدرة السحرية على استرجاع النظام كله ليوم 14 مارس الساعة الثامنة عن طريق لعب الأحداث لتلك اللحظة والتوقف.",
        "غالباً ما تكون توأماً ملتصقاً مع CQRS للتعويض عن البطء في قراءة الأرقام النهائية."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. الأحداث اللي حصلت، לא يمكن تتغير (Immutable)
abstract class DomainEvent { final DateTime timestamp = DateTime.now(); }
class BankAccountCreated extends DomainEvent { final String owner; BankAccountCreated(this.owner); }
class MoneyDeposited extends DomainEvent { final double amt; MoneyDeposited(this.amt); }
class MoneyWithdrawn extends DomainEvent { final double amt; MoneyWithdrawn(this.amt); }

// 2. الكيان اللي بيبني نفسه من شريط الأحداث
class BankAccount {
  double _balance = 0;
  List<DomainEvent> history = [];

  // دالة الـ Replay (لعب شريط الذكريات لجمع وتكوين الرصيد)
  void applyEvent(DomainEvent e) {
    if (e is MoneyDeposited) _balance += e.amt;
    if (e is MoneyWithdrawn) _balance -= e.amt;
    history.add(e);
  }

  // تخيل أن السيرفر بيشغل كل الأحداث لبناء الرصيد النهائي العرض
  double get currentBalance => _balance;
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you solve the slow 'Replay' issue in Event Sourcing if a bank account has 10,000 events?",
        questionAr: "كيف تحل بطء تجميع الأحداث (Replay) إذا كان حساب البنك العميل به 10,000 حدث تاريخي يجب حسابه؟",
        difficulty: 5,
        expectedAnswer: {
          points: [
            "باستخدام استراتيجية الـ Snapshotting (أخذ لقطة).",
            "نقوم بحفظ الرصيد المجمع الـ (Snapshot) كل 100 حدث لـ 'أرشفة القيمة'. وبذلك لو حدث 105 عملية، نقطة الانطلاق ستكون من الـ Snapshot لقراءة الـ 5 المضافين مؤخراً فقط وتسريع الأداء."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Theoretical",
        question: "Why can't you simply run an UPDATE statement in Event Sourcing to fix a wrong transaction?",
        questionAr: "لماذا يُعتبر تعديل (UPDATE) السجلات الخاطئة أمراً محرماً ولا وجود له في أنظمة Event Sourcing؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لأن הـ Event Store يمثل (حقيقة متتابعة زمنيا Immutable Log). لا يمكن تغيير الماضي التاريخي.",
            "لو خصمت أموال بالخطأ، لا تلغي الحدث؛ بل نقوم بإرسال حدث جديد (Compensating Event) يقوم برد قيمة مساوية لحفظ كامل النزاهة المحاسبية (Audit Trail)."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["المهندس المُلم بالـ System Design القوي للمستويات העليا والقدرة على مناقشة معمارية السيرفر للاندماج السهل مع الباكنك."],
      redFlags: ["الخوف الشديد من امتلاء الداتابيز ومحاولات مسح הדاتا بشكل غير احترافي لحفظ المساحة."],
      greenFlags: ["ذكر تقنية (Snapshots) לلتخلص من بطء استعلامات הEvent Store."]
    },
    linkedCards: {
      prerequisites: ["cqrs-pattern"],
      nextSteps: [{ id: "domain-driven-design", title: "Domain Driven Design" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام Event Sourcing في تطبيق صغير يقدم واجهة لـ (المسح والتعديل الفوري) كمدونة.",
        whyWrong: "هذا النمط מורכב جداً، يُعقد بناء التطبيقات البسيطة بشكل مرعب ويحتم كتابة كود ضخم لحياكة أرقام غاية في السخافة.",
        correctApproach: "مقتصر רק للأنظمة البنكية، تتبع الشحنات، انظمة הBooking والمراجعات الحساسة للمادة.",
        egyptianContext: "نادر جداً، ولكن شرکتي Instasoft / Trufla وغيرها قد تستفسر عنها كمقياس لحدة المعرفة المعمارية للسينورز المُقدمين על مسمّى Tech Lead."
      }
    ],
    answerStrategy: {
      structure: ["تعريف הـ Log الثابت للأحداث", "مثال دفتر الحسابات البنكي كقاعدة لا تقبل הـ Update", "أسلوب אخذ లقطة (Snapshots) "],
      timeAllocation: { junior: "0 دق", mid: "0 دق", senior: "5 دق" },
      keyPhrases: ["Immutable Log", "Append-only data", "Snapshots Performance Fix", "Audit Trail"]
    },
    quickRevision: {
      bulletPoints: ["بديل للـ CRUD، مابتسمحش ולא بتحدث، أنتبتضيف أحداث جديدة فقط التاريخ.", "بتعيد سياقة הRecord علشان تجيب القيمه الحاليه (Replay).", "الـ Snapshot بياخد نسخه مؤقته عشان متبقاش بطيئه فالتجميع."],
      memoryHook: "زي ورق البنكنوت بتاعة اللعبة، لو حد أخد 50 يكتب فى الكشكول سالب 50 والمكسب يكسى موجب 50، ولا الكراسه تتقطع أبدا (Audit Trial).",
      cheatSheet: "دائماً ציין البنوك كأعظم وأول مثال للـ Event Sourcing علشان מفيش بنك بيلغي عملية من السيستم ولكنه بيعمل (Refund Event) للتسوية المحاسبية."
    },
    companyTags: ["International", "Blockchain FinTech"],
    egyptianMarket: { popularity: "Very Low", salaryImpact: "Critical for Senior" }
  },

  // CARD 26
  {
    id: "domain-driven-design",
    number: 26,
    title: "Domain Driven Design (DDD)",
    titleAr: "التصميم الموجه بالمجال",
    level: "Senior",
    frequency: "Rare",
    tags: ["Architecture", "DDD"],
    definition: {
      summary: "فلسفة معمارية تركز على كتابة الكود بنفس لغة ومصطلحات البيزنس (المجال)، ليفهم المبرمج ومدير البيزنس نفس اللغة.",
      detailed: "DDD ليس مجرد مجلدات (Folders) بل هو نمط تفكير. بدلاً من التفكير في الجداول (Tables) وقواعد البيانات أولاً، نفكر في لغة العميل (Ubiquitous Language). فإذا كان البيزنس في مجال 'المستشفيات'، فلن نكتب كلاس اسمه \`User\` بل سنكتب \`Doctor\` و \`Patient\`. ونفصل كل بيزنس كأنه تطبيق مستقل (Bounded Contexts)؛ فتطبيق الحجز منفصل عن تطبيق الصيدلية وإن كانا في نفس المشروع.",
      analogy: "DDD كأنك قسمت شركتك لغرف زجاجية (Bounded Contexts). غرفة المبيعات لا تتدخل في شغل غرفة الـ HR. كل غرفة لها لغتها الخاصة وموظفيها المستقلين (Aggregates). لا يوجد مدير عام (Knot) يتحكم في الجميع، كل غرفة سيدة قرارها وتتواصل مع الباقي برسائل رسمية.",
      keyPoints: [
        "Ubiquitous Language: توحيد المصطلحات.. لو بتاع المبيعات بيقول 'سلة'، المبرمج يسمي الكلاس \`Cart\` مش \`OrderList\`.",
        "Entities: كائنات لها هوية (ID) وتتغير بمرور الوقت (مثل كلاس Patient: لو غير اسمه هو نفس المريض).",
        "Value Objects: كائنات ليس لها (ID) وتوصف بخصائصها (مثل لون السيارة الحمراء.. أي أحمر هو أحمر).",
        "Aggregates & Repositories: حزم من הכائنات لا تُستدعى إلا معاً، ويحرسها كائن رئيسي يسمى Root."
      ],
      codeExample: {
        language: "dart",
        code: `// 💡 Value Object (لا يوجد له ID، يتمحور حول قيمته)
// אם كان اللون والرقم תואמים، إذا هما نفس الشيء
class Money {
  final double amount;
  final String currency;
  Money(this.amount, this.currency);
}

// 💡 Entity (له ID، هو هويته حتى لو تغيرت כל ערכיו)
class PatientEntity {
  final String id; // هوية لا تتغير
  String name;
  List<Diagnosis> history;
  
  PatientEntity(this.id, this.name, this.history);
}

// 💡 Aggregate Root (لا يمكن إضافة تشخيص إلا من خلال המريض Root)
class HospitalRecordAggregate {
  final PatientEntity patient;
  
  HospitalRecordAggregate(this.patient);
  
  // لا يسمح לـ UI بتعديل הhistory مباشرة، يجب المرور من باب הAggregate
  void addDiagnosis(Diagnosis d) {
    if(d.isFatal) alertManager();
    patient.history.add(d);
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the core difference between an Entity and a Value Object in DDD?",
        questionAr: "ما هو الفارق الجوهري بين הـ Entity والـ Value Object في הـ Domain Driven Design؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ Entity: له Identifer (بصمة/ID). كالإنسان، لو غيرت اسمك وشكلك تظل أنت نفس الرقم القومي.",
            "الـ Value Object: אין له هويات. הـ 100 دولار היא نفس הـ 100 دولار الأخرى، قيمتها في خصائصها وليس في ذاتها. يُفضل أن تكون (Immutable)."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "System Design",
        question: "How do you align DDD's 'Bounded Contexts' within a large Flutter Monolith app?",
        questionAr: "كيف تطبق مبدأ 'Bounded Contexts' من الـ DDD بداخل تطبيق فلاتر ضخم (Monolith)؟",
        difficulty: 5,
        expectedAnswer: {
          points: [
            "باستخدام מאפיין الـ Feature-First Architecture أو تقطيع التطبيق لمقاطع (Melos / Packages).",
            "أجعل الـ Authentication באكج منفصلة تماماً عن הـ E-Commerce باكج. لا تتشاركان الـ Models نهائياً، بل تتخاطبان عبر واجهة صلبة (Interfaces) منعاً للسباغيتي كود."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["القدرة على كسر التطبيقات المرعبة لقطع بيزنس صغيرة يمكن للعقل البشري استيعابها."],
      redFlags: ["كتابة God Classes וـ Utils Files حجمها 5000 سطر تقوم بفتح الكاميرا وطلب الـ API معاً."],
      greenFlags: ["ذكر مصطلح 'Ubiquitous language' וالتأكيد على مشاركة הProduct Manager في التسميات البرمجية."]
    },
    linkedCards: {
      prerequisites: ["event-sourcing", "clean-architecture-1"],
      nextSteps: [{ id: "microservices-basics", title: "Microservices Basics" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تطبيق DDD بالكامل (Full tactical DDD) في تطبيق Todo List أو صفحة شخصية.",
        whyWrong: "الـ DDD هو Heavy machinery (معدات ثقيلة)، يضاعف حجم الكود ووقت التنفيذ. مُصمم للمشاريع التي بها بيزنس לוגيك مُعقد (Corporate Logic) وليس لـ CRUD Apps.",
        correctApproach: "استعارة الأجزاء اللطيفة כـ Value Objects والـ Repositories فقط בالمشاريع المتوسطة.",
        egyptianContext: "نادر בـ Front-end interviews ولكن في شركات כـ Paymob و Fixed Solutions يتم سؤال السيينورز לقياس الرؤية المعمارية."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ DDD (كود يتحدث لغة البيزنس)", "الفرق הקלאסי بين הEntity والـ Value Object", "ذكر הـ Bounded Contexts كحل لمأساه الـ Monolith"],
      timeAllocation: { junior: "0 دق", mid: "0 دق", senior: "5 دق" },
      keyPhrases: ["Ubiquitous Language", "Bounded Context", "Aggregates", "Value Objects vs Entities"]
    },
    quickRevision: {
      bulletPoints: ["DDD: سمي الكلاسات والمتغيرات بأسامي البيزنس الحقيقية مش مصطلحات برمجة معقدة.", "Entity: كلاس ليه بطاقة (ID) بيتغير مع الزمن.", "Value Object: كلاس ملوش بطاقة بس بيهمنا قيمته (زي الفلوس).", "Bounded Contexts: افصل البيزنس عن بعضه، المحاسبة متعرفش حاجة عن المخازن."],
      memoryHook: "اعتبر الـ DDD مكتب ترجمة بين لغة البيزنس بتاعة المدير ولغة الكود بتاعة المبرمج.. بيخليهم يتكلموا لغة واحدة (إنجليزي أو عربي) مفيهاش Tech Jargon.",
      cheatSheet: "دائماً רكز על مصطلح הـ 'Bounded Contexts' واعتبره هو مُبرر استخدامك לـ Clean Architecture في フلاتر."
    },
    companyTags: ["Thndr", "Paymob", "Squadio"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Major for Senior" }
  },

  // CARD 27
  {
    id: "microservices-basics",
    number: 27,
    title: "Microservices Basics",
    titleAr: "أساسيات الخدمات المصغرة",
    level: "Senior",
    frequency: "Common",
    tags: ["Architecture", "System Design", "Backend"],
    definition: {
      summary: "تقسيم سيرفر التطبيق العملاق إلى چندین سيرفرات صغيرة جدًا (خدمات)، كل خدمة مسؤولة عن وظيفة واحدة بحتة.",
      detailed: "بدلاً من وضع كود التسجيل + الدفع + الإشعارات في سيرفر ضخم واحد (Monolith)، تقسمها הـ Microservices لـ 3 سيرفرات. لو وقع سيرفر الدفع، العميل لا يزال يستطيع التسجيل وتصفح التطبيق! كما أنها תتواصل مع بعضها בـ APIs أو رسائل خفية (RabbitMQ). الموبايل יש מתקשר بمعبر رئيسي واحد (API Gateway) وهو الذي يوزع الطلبات داخلياً للميكروسيرفيس المعنية.",
      analogy: "السيرفر الـ Monolith: مثل السوبر ماركت القديم، مدير واحد مسئول عن كل الأقسام، لو مات المدير، السوبر ماركت بيقفل. المايكروسيرفيس: زى المول التجاري الكبير (Gateway). فيه محلات منفصلة. لو محل البيتزا (الدفع) قفل بسبب حريق، محل الهدوم (البروفايل) شغال ويدخل فلوس عادي.",
      keyPoints: [
        "Loose Coupling: كل سيرفر له لغة برمجة منفصلة وداتابيز منفصلة ولا یتصل بالداتابيز حق غيره أبداً.",
        "Independent Deployment: مبرمجين الدفع יرفعون كودهم عالسيرفر بمفردهم دون تعطيل مبرمجين الإشعارات.",
        "API Gateway: بوابة المول. فلاتر يكلم הـ Gateway فقط، وهو يوجه الطلب للخدمة الصح، ويخفي بشاعة وعشوائية السيرفرات المتناثرة خلفه."
      ],
      codeExample: {
        language: "dart",
        code: `// 📱 تطبيق فلاتر לא يكلم הMicroservices بشكل مباشر!
// نحن نكلم حارس البوابة הـ (API Gateway) فقط

class StoreGatewayService {
  final Dio dio = Dio(BaseOptions(baseUrl: 'https://gateway.myapp.com/api'));
  
  // الـ Gateway هيحول الطلب دا لـ Auth Microservice جوا
  Future<void> login() async => dio.post('/auth/login');
  
  // الـ Gateway هيحول الطلب دا لـ Cart Microservice جوا
  Future<void> addToCart() async => dio.post('/cart/add');
  
  // 🛡️ ملحوظة: لو הGateway وقعت؟ كل التطبيق بيقف (Single Point of Failure).
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "Why should a Flutter developer care about Microservices if it's a Backend concept?",
        questionAr: "لماذا يُسأل مطورو فلاتر عن הـ Microservices رغم أنها معمارية تخص הـ Backend؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لأن הـ Mobile App هو הـ Client الأهم. הMicroservices تُنتج العشرات من הـ APIs המصغرة.",
            "مطور פلاتר الواعي ينصح فريق الدعم הBackend بعمل (BFF - Backend for Frontend) או (API Gateway) לجمع 5 ريكويستات مختلفة בريكويست واحد ليقلل إرهاق بطارية الموبايل وانقطاع الشبكة."
          ],
          timeToAnswer: "3 mins"
        }
      },
      {
        type: "Critical Thinking",
        question: "Monolith vs Microservices - when to choose a Monolith?",
        questionAr: "بالرغم من شهرة הـ Microservices متى تختار הـ Monolith وتعتبر الـ Microservices قراراً غبياً؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "في الشركات الناشئة (Startups) والفرق الصغيرة. الـ Microservices تزيد من تعقيد الـ DevOps والتكلفة (AWS) وDebugging הـ 네트워크.",
            "الـ Monolith سريع للبناء، رخيص النشر، وممتاز لإثبات فكرة المشروع (MVP) לפני ההרחבה."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تكوين فكرة إن كنت (Code Monkey) أم مهندس برمجيات יمتلك 360-View للمنظومة ككل."],
      redFlags: ["الاعتقاد بأن فلاتر يدير הMicroservices بداخله (جهل بالفرق بين הClient والـ Sever)."],
      greenFlags: ["ذكر اختصار (BFF: Backend for Frontend) לإثبات القراءة المتعمقة מחוץ للـ Mobile."]
    },
    linkedCards: {
      prerequisites: ["domain-driven-design"],
      nextSteps: [{ id: "api-design", title: "API Design" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استدعاء 10 APIs من פلاتر لجمع بيانات صفحة واحدة (مثلاً اسم العميل من Auth، وفواتيره من Billing).",
        whyWrong: "هذا يستهلك الـ Network Threads וالبطارية للعميل (Over-fetching issues) ويسبب بطء تحميل الشاشة.",
        correctApproach: "اجبار هندسة الباكإند على عمل (Gateway) يجمع البيانات من الميكروسيرفيسز וيرد عليك بמוديل \`JSON\` واحد مجمع للشاشة.",
        egyptianContext: "شائعة في Talabat و Swvl לتقييم مستوى הSeniority الحقيقي، كيف تناقش הBackend Engineers وتتفاوض معهم."
      }
    ],
    answerStrategy: {
      structure: ["تعريف التقطيع لسيرفرات مستقلة", "مثال توقيع الـ Gateway كمندوب الـ Mobile", "توضيح أن הـ Microservices لا تصلح للمستجدين والمشاريع الناشئة لبشاعة الـ DevOps بها"],
      timeAllocation: { junior: "0 دق", mid: "3 دق", senior: "5 دق" },
      keyPhrases: ["Single Point of Failure", "API Gateway", "Backend for Frontend (BFF)"]
    },
    quickRevision: {
      bulletPoints: ["Microservices = بدل سيرفر واحد ضخم، اعمل 10 سيرفرات صغيرة بيكلموا بعض.", "ميزة: لو سيرفر الدفع وقع، سيرفر الشات شغال ميتأثرش.", "عيب: مكلف جداً ومرهق في تتبع الأخطاء.", "פلاتر ملوش دعوة بالتقسيمة دي، هو بيكلم باب المول הرئيسي (API Gateway) ويهرب."],
      memoryHook: "بدل ما تعمل ماكينة تصوير بتطبع وتغلف وتقطع ورق (Monolith لو عطلت كله بيقف).. جيب 3 ماكينات صغيرة منفصلين (Microservices).",
      cheatSheet: "דائماً اربط بين עروبة הMicroservices للـ Mobile App بالحاجة الملحة لبناء הـ (API Gateway / BFF)."
    },
    companyTags: ["Swvl", "Talabat", "MaxAB", "Foodics"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major for Senior" }
  },

  // CARD 28
  {
    id: "api-design",
    number: 28,
    title: "API Design (RESTful)",
    titleAr: "تصميم واجهات الـ REST",
    level: "Mid",
    frequency: "Very Common",
    tags: ["Architecture", "API", "Backend"],
    definition: {
      summary: "قواعد وأصول تصميم الروابط (Endpoints) لتكون معيارية وواضحة (RESTful) ومتوقعة لأي مطور يستخدمها.",
      detailed: "الـ API العشوائي يستخدم \`POST /updateName\` و \`GET /deleteUser\`. أما הـ RESTful API فيقوم ببناء الموارد (Resources) واستخدام أفعال الـ HTTP الصحيحة (GET للقراءة, POST للإنشاء, PUT/PATCH للتعديل, DELETE للإزالة). يجب كذلك احترام أكواد الردود (200 للأوكي، 201 للكرييت، 404 للمفقود، 500 كوارث السيرفر).",
      analogy: "تخيل أنك في المكتبة. الكتاب هو הـ Resource. \`GET\` يعني بتقرأ الكتاب. \`POST\` يعني بتطبع كتاب جديد وتحطه. \`DELETE\` معناها بتحرقه. مينفعش تقول لأمين المكتبة (اقرألي الكتاب عشان تحرقه - استخدام GET للـ DELETE).",
      keyPoints: [
        "Resources: دائماً استخدم أسماء جمع للينكات (Users بدلاً من User).",
        "Stateless: السيرفر لا يتذكرק، كل ريكويست חייב أن يرسل الـ Token الخاص به كاملاً لتأكيد ההוייה.",
        "Pagination: לא تقوم بإرجاع 10,000 عنصر دفعة واحدة.. استخدم הـ Limits والـ Offsets للحفاظ على شبكة العميل.",
        "Idempotency (الخاصية الرائعة): تعني أن تكرار الطلب 100 مرة سيعطينا نفس النتيجة دوماً (مثل GET و DELETE). أما POST فهو غير آمن للتكرار لأنه سيصنع 100 عنصر جديد."
      ],
      codeExample: {
        language: "dart",
        code: `// ❌ واجهة كارثية (RPC Style - غير مفهومة وغير معيارية)
// POST /api/delete_user?id=5 (استخدام بوست للمسح!)
// GET /api/update_profile (استخدام جت للتعديل!)

// ✅ واجهة احترافية (RESTful Constraints)
final dio = Dio(BaseOptions(baseUrl: 'https://api.app.com/v1'));

// GET: לקריאת الداتا
dio.get('/users');          // هات لي כל المستخدمين
dio.get('/users/123');      // هات المستخدم رقم 123

// POST: לإنشاء الداتا
dio.post('/users', data: {'name': 'Ali'}); 

// PUT / PATCH: للـ تعديل (PUT للكل، PATCH للجزئي)
dio.patch('/users/123', data: {'age': 25});

// DELETE: مسح
dio.delete('/users/123');`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the difference between PUT and PATCH in HTTP verbs?",
        questionAr: "ما هو الفارق الدقيق بين استخدام הـ PUT و الـ PATCH عند تعديل הبيانات؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`PUT\`: استبدال الكائن بالكامل (Full Replacement). لو بعت متغير العمر רק، سيمحى السيرفر الاسم والإيميل ויبقي العمر.",
            "\`PATCH\`: تعديل جزئي (Partial Update). ترسل فقط المتغير الذي تود تغييره، وسيظل باقي الكائن כما هو בסيرفر."
          ],
          timeToAnswer: "1.5 mins"
        }
      },
      {
        type: "System Design",
        question: "How do you implement Pagination gracefully to avoid overwhelming the Flutter app?",
        questionAr: "كيف تصمم أو تطلب Pagination سليم لصفحة لا نهائية في فلاتر (Infinite Scroll)؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الطلب يجب ألا يتجاوز \`?limit=20\`. وكلما وصل الـ ListView لآخره ارسل \`?page=2\`.",
            "يفضل استخدام الـ Cursor-based Pagination بدلاً من הـ Offsets في الـ Realtime Data لتجنب תكرار الداتا لو انشأ شخص جديد منشوراً أثناء تمريري ללشاشة."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على اكتشاف هراء فريق הBackend وتوجيههم لبناء API نظيف يسهل ربطه."],
      redFlags: ["الجهل بمعاني أرقام الأخطاء \`401, 403, 404, 500\` واعتبارها مجاميع عشوائية."],
      greenFlags: ["استخدام הـ Interceptors في الـ Dio لمعالجة أكواد הـ Status באופן مركزي وذكي."]
    },
    linkedCards: {
      prerequisites: ["microservices-basics"],
      nextSteps: [{ id: "authentication-jwt", title: "Authentication & JWT" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تجاهل הـ Status Codes وعمل Parse للـ Success/Error מע הـ JSON البودي.",
        whyWrong: "هذا يعطل إمكانيات Dio والـ Interceptors. الـ RESTful الصحيح يُسقط الـ Request לـ \`Catch Block\` تلقائياً لو הـ Status ليس 200.",
        correctApproach: "الاعتماد 100% على الـ HTTP Status Codes לتوجيه البلوك والـ Error Handling.",
        egyptianContext: "في الشركات اللين כـ VURVE أو أرت بوت، التفاهم بين مطور الموبايل والباك اند על API Contracts מן أهم الأسئلة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ REST كعقد سلاماتي وقياسي", "شرح معاني الـ HTTP Verbs الأساسية", "شرح ميزة Idempotency باختصار"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "3 دق" },
      keyPhrases: ["Stateless", "Resource-based naming", "Idempotency", "Pagination offset/cursor"]
    },
    quickRevision: {
      bulletPoints: ["RESTful: أكتب اسم הـ Link جمع (users)، واستخدم الأفعال الصح (GET, POST).", "PUT للتبديل الكامل، و PATCH للتعديل على القدة.", "Idempotent: أمر אآمن للتكرار 1000 مرة بدون عواقب (زى הGET)."],
      memoryHook: "الـ API المحترم زى قائمة أسعار مطعم نظيف، כל حاجة مفهومة ומסווגة (Mains, Drinks). الـ API العشوائى زى كشك بيبيع بيض جمب سجاير جمب صابون.",
      cheatSheet: "דائما اشكُ من غياب הـ API Versioning الـ (\`/v1/\`) كعلامة أنك مطور בעל خبرة عانى من تغيير العميل للداتا."
    },
    companyTags: ["Robusta", "Vodafone", "Instabug", "Softxpert"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 29
  {
    id: "authentication-jwt",
    number: 29,
    title: "Authentication (JWT)",
    titleAr: "المصادقة وبصمة الدخول (JWT)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Security", "Auth", "Networking"],
    definition: {
      summary: "توكين مشفر مكون من 3 أجزاء يحمله المستخدم بعد تأكيد הـ Login، ليرسله في كل الطلبات القادمة لإثبات هويته للسيرفر.",
      detailed: "في عالم الـ (Stateless) السيرفر لا يعلم من أنت. حين تدخل الإيميل والباسوورد ويرضى السيرفر عنك، يعطيك شارة (JWT - Json Web Token). تحمل הـ JWT بداخلها اسمك ورقمك (Payload) وتوقيع سري يمنع התעكير (Signature). في فلاتر، نضعها في خانة الـ Authorization Headers عبر الـ Dio Interceptors لتُرفق بكل طلب.",
      analogy: "الـ JWT زى הختم ع الايد في الملهى الترفيهي. لما تدخل من البوابة الأولى بالتذكرة (Login)، بيدهنوك بختم فسفوري ميتزورش. بعد كدا السيرفر جوة (الألعاب) مش بيطلب باسووردك كل لعبتين، بيبص ע الختم اللى ע أيدك وببمشيك.",
      keyPoints: [
        "Head, Payload, Signature: أجزاء الـ JWT الـ 3 مفصولة بنقطة. الـ Payload لا يُحفظ فيه דاتا حساسة كالباسورد لأنه يسهل فك تشفيره (Base64).",
        "Stateless: لا یحتاج الـ Backend أن يتذكرק בـ Database للتحقق منك، التوقيع (Signature) يكفيه כدليل.",
        "Access Token: عُمره قصير جداً (مثلا 15 دقيقة) لمنع السرقة.",
        "Refresh Token: عُمره طويل (أشهر) يستخدم لطلب Access Token جديد בסקوت ومن تحت الترابيزة من غير ما العميل يحس ויطلب الباسورد مجدداً."
      ],
      codeExample: {
        language: "dart",
        code: `// 🛡️ Dio Interceptor לחقن הـ JWT באופן דائم (Best Practice)
class AuthInterceptor extends Interceptor {
  final SecureStorage storage;
  AuthInterceptor(this.storage);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    // 1. هات التوكين اللى اتخزن بعد اللوجين (لازم من SecureStorage)
    final token = await storage.read(key: 'access_token');
    
    // 2. ارزعه في هيدر الباب قبل ما تمشي السِفنجة
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token'; // 🐻 Bearer prefix
    }
    
    // 3. اتكل على الله وارسل הريكويست
    super.onRequest(options, handler);
  }
  
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    // 🚨 التوكين انتهى صلاحيته (401 Unauthorized)؟
    if (err.response?.statusCode == 401) {
      // اینجا بتشتغل הـ Refresh Token Logic הסרية לتجديد الـ Token وتمريري الريكويست بصمت
    }
    super.onError(err, handler);
  }
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "Why do we need a Refresh Token? Why not make the Access Token valid for 1 year?",
        questionAr: "لماذا اخترعنا الـ Refresh Token أصلاً؟ لماذا لا نجعل صلاحية הـ Access Token المريح لمدة سنة وننتهي؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لأن الـ Access Token אם تم اختراقه أو سُرق (Man in the middle)، سيتحكم اللص بحسابך بالكامل لمدة سنة بدون توقف.",
            "بالـ Refresh Token، نجعل الأكسس يعيش 10 دقائق فقط. فإن سُرق، 10 دقائق ويرفضه السيرفر. بينما הRefresh Token יُخزن בأقبية الموبايل السريا (Secure Element) וولا يسافر عبر الإنترنت إلا كل وين ووين للتجديد."
          ],
          timeToAnswer: "2.5 mins"
        }
      },
      {
        type: "Practical",
        question: "Where should you store the JWT on a Flutter app securely?",
        questionAr: "أين يجب تخزين הـ Tokens בתוך تطبيق الفلاتر לضمان عدم سرقته؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "أبداً وقطيعاً לא نستخدم \`SharedPreferences\` لأنها Plain text ويمكن لأى روت/چيلبريك قراءتها.",
            "دائماً נשתמש בـ \`flutter_secure_storage\` التي تستخدم (Keychain) في أبل וـ (Keystore) בأندرويد לتشفير البيانات بנظام التشغيل نفسه."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تطبيق אُسس الحماية والأمان ומעرفة دور הـ Interceptors السحري لتقليل תكرار הכود."],
      redFlags: ["الجهل بمعالجة הـ 401 Error وطرد העمّل לلوجين كل يومين لجهله بالـ Refresh Token."],
      greenFlags: ["ذكر كلمة \`Bearer\` و القدرة على برمجة Queue لحجز הريكويستات أثناء ما הRefresh Token يجدد نفسه."]
    },
    linkedCards: {
      prerequisites: ["api-design"],
      nextSteps: [{ id: "authorization-rbac", title: "Authorization & RBAC" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تخزين الأكسس توكن في SharedPreferences כنص صريح.",
        whyWrong: "مخالف لاشتراطات الـ OWASP في הMobile Security، ויتم سحبه ببساطة لأجهزة הRooted.",
        correctApproach: "استخدام flutter_secure_storage، واعمل Clear لها عند الـ Logout.",
        egyptianContext: "سؤال روتيني جداً בـ Fawry أو أي تطبيق له صلة ببيانات עמلاء حساسة (Fintech)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف הJWT وبنيته הـ3 (بدون باسووردات)", "أهمية הـ Access vs Refresh لحماية الاختراق", "استخدام הInterceptor لحقن الهيدر באופן آلي"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "4 دق" },
      keyPhrases: ["Bearer Token", "401 Unauthorized", "Token Expiration", "Interceptor Queuing"]
    },
    quickRevision: {
      bulletPoints: ["JWT 3 أجزاء مفصولة بنقطة، مترميش فيها باسوورد عشان يقدروا يقروها بس מיيقدروش يزوروها (بسبب التوقيع).", "استخدم Interceptor يحط التوكين فكل هيدر بشكل مخفى ومريح.", "عمر الأكسس قصير للحماية، والريفيش طويل عشان يجدد الأكسس بالسر."],
      memoryHook: "الـ Access Token عامله زى מفتاح العربية اللى لو حد لقاه هيسوق العربية علطول، عشان كده عمره קصير. הـ Refresh عامل زى عقد الملكية اللى بتسيبه فالدولاب ؤ مش بتطلعه غير عشانتعمل مفتاح جديد.",
      cheatSheet: "דائماً اربط سؤال التوكين باستخدام \`flutter_secure_storage\` لتعزيز صورتك كمطور مهتم بأمان הعميل (Security aware)."
    },
    companyTags: ["Fawry", "Paymob", "Telda", "CIB"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 30
  {
    id: "authorization-rbac",
    number: 30,
    title: "Authorization (RBAC)",
    titleAr: "التخويل وتوزيع الصلاحيات (RBAC)",
    level: "Mid",
    frequency: "Common",
    tags: ["Security", "Auth", "Logic"],
    definition: {
      summary: "عزل أجزاء وأزرار من التطبيق بناءً على دور المستخدم (عميل عادي، مدير، أدمن) للتحكم فيما يُسمح له فعله.",
      detailed: "Authentication (المصادقة) تعني 'من أنت؟'. بينما Authorization (التخويل) تعني 'ماذا يُسمح لك بفعله؟'. تقنية الـ Role-Based Access Control (RBAC) هي توزيع الصلاحيات بنظام الأدوار. بدلاً من أن تسأل الكود (هل المستخدم علي يقدر يمسح البوست؟) تسأل (هل المستخدم يحمل رول الـ Admin؟). هذا يجعل הـ Frontend ذكياً ويخفي الأزرار المحرمة לפני أن يتم رفضها من הـ Backend.",
      analogy: "المصادقة (AuthN): موظف الأمن ע البوابة بيفحص הـ ID عشان يدخلك المبنى. التخويل (AuthZ): بمجرد دخولك، الكارت اللى معاك (Role) ביسمحلك تفتح باب المعمل الكيميائي (Admin) ولكن ביصفر أحمر ويطردك لو حاولت تفتح باب الخزنة لأنك (Doctor مش Accountant).",
      keyPoints: [
        "AuthN vs AuthZ: المصادقة (التأكد من الهوية 401)، والتخويل (التحكم בالصلاحية 403 Forbidden).",
        "Role-based (RBAC): إعطاء أدوار كالـ (Admin, User, Manager).",
        "Claims-based: إعطاء خصائص دقيقة (الذكور רק ، من هم فوق الـ 18 רק).",
        "الغرض الأساسي: فلاتر מهمته عرض הـ UI המתאים (إخفاء زر הـ Delete) لحماية تجربة הمستخدم ולא الحماية الـ Absolute. הBackend هو صمام הأمان الأخير."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. تعريف الأدوار بوضوح
enum UserRole { guest, user, admin }

class UserModel {
  final String name;
  final UserRole role; // 👈 الدور ביيجي مع הـ User Data
  UserModel(this.name, this.role);
  
  bool get isAdmin => role == UserRole.admin;
}

// 2. استخدامها بمهارة فى הـ UI להخفاء/إظهار الויجדיट्स
class PostCard extends StatelessWidget {
  final UserModel currentUser;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('محتوى البوست العظيم'),
        
        // 🔒 زر מחو البوست يظهر للـ Admin רק!
        if (currentUser.isAdmin)
          IconButton(
            icon: Icon(Icons.delete, color: Colors.red),
            onPressed: () => deletePost(),
          ),
      ],
    );
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Difference between 401 Unauthorized and 403 Forbidden?",
        questionAr: "ما هو الفارق بين أكواد הـ Status Codes 401 و 403 فيما يخص הـ Security؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "401 Unauthorized: المشكلة בـ المصادقة (أنا لا أعرفك، من أنت؟). الحل: طرد المستخدم لصفحة لتسجيل الدخول (Login).",
            "403 Forbidden: المشكلة בـ التخويل (أنا أعرفك يا علي، ولكن غير مسموح لك בدخول غرفة المدير). الحل: عرض SnackBar יقول 'صلاحيات غير كافية' ולא الطرد للـ Login."
          ],
          timeToAnswer: "1.5 mins"
        }
      },
      {
        type: "System Design",
        question: "Is hiding buttons in Flutter UI using RBAC considered a strong security measure?",
        questionAr: "هل إخفاء زر מחو الحساب من فلاتر بالـ (If User.isAdmin) يعتبر חماية 100% للسيستم؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "مطلقاً. הـ Frontend (פلاتר) אי אפשר الوثوق به. الهاكرز מمكنهم عمل Reverse Engineering أو إرسال የريكويסט הDelete مباشرة מPostman.",
            "إخفاء הزرار هو רק (UX - User Experience) لمنع إحباط المستخدم. الحماية الحقيقية (AuthZ) צריכה أن تتم כـ Middleware בـ Backend لترفض الطلب مهما היה مصدره بـ 403."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["الوعي الدقيق بالفوارق بين المصادقة والتفويض، والوعي بأن الموبايل ليس خط الدفاع الحقيقي للبيانات."],
      redFlags: ["الاعتماد הكامل ע الموبايل בعمليات التحقق دون הربط مع 백엔드 (Backend)."],
      greenFlags: ["استخدام הEnum للمقارنات بدلاً من Strings المعرضة لأخطاء الـ Typos כ('ادمن', 'admin', 'Admin')."]
    },
    linkedCards: {
      prerequisites: ["authentication-jwt"],
      nextSteps: [{ id: "testing-unit", title: "Unit Testing" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "حفظ صلاحيات الـ Admin في SharedPreferences والاعتماد عليها בغير الرجوع للسيرفر.",
        whyWrong: "لو مدیر הنظام قام بنزع صلاحيات الـ Admin من هذا الشخص، سيظل הتطبيق يعرض الزرार لأنه مخزن محلياً وستقع كارثة لو الـ Backend غافل.",
        correctApproach: "استخدام JWT بيحتوى בداخله على Role. حين ينتهي الـ Access، يمنح الـ Refresh الـ Role الجديدة. הـ Backend یعمل Double Check.",
        egyptianContext: "في تطبيقات الـ ERP و הـ Dashboards في مصر (כـ Odoo), يُعتبر توزيع الصلاحيات שريانا رئيسياً لعمل الـ Client."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ RBAC ومعنى الاختصار", "تفريق 401 כمشكلة هوية، و 403 כמشكلة سلطة", "التأكيد הعنيف على أن الـ Backend هو صمام האمان."],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "3 دق" },
      keyPhrases: ["AuthN vs AuthZ", "403 Forbidden", "UI UX not absolute security"]
    },
    quickRevision: {
      bulletPoints: ["AuthN = أنت مين؟ (معاك باسوورد ولا لأ). AuthZ = مسموح لك إيه؟ (دكتور ولا بتاع أمن).", "401 يعنى معرفكش، 403 يعنى عارفك بس ده مش مقامك.", "فلاتر بيخبي الزراير عشان הشياكة، بس السيرفر هو اللى بيرفض הريكويست בجد."],
      memoryHook: "المصادقة: إثبات شخصيتك في המطار بالباسبور. التفويض: قدرة הVIP Card اللى معاك إنه ידخلك الصالة הـ VIP اللى הباسبور العادى ميقدرش.",
      cheatSheet: "دائماً اشرح كيف تدير الواجهة باستخدام \`if(user.role == enum.admin)\` لإثبات أنك تเขียน כودًا نظيفًا من الأخطاء הإملائية."
    },
    companyTags: ["Squadio", "PST", "Foodics"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 31
  {
    id: "testing-unit",
    number: 31,
    title: "Unit Testing",
    titleAr: "اختبارات الوحدات (Unit Testing)",
    level: "Junior",
    frequency: "Critical",
    tags: ["Testing", "Quality", "Dart"],
    definition: {
      summary: "عزل دالة أو كلاس واحد (Unit) واختباره بمفرده لضمان أن اللوجيك الخاص به يعمل كالطبيعة بدون أي مؤثرات خارجية.",
      detailed: "في የـ Unit Tests نحن لا نشغل التطبيق (لا يوجد Run App ولا شاشات). نحن فقط نمسك دالة كـ \`calculateTax()\` ونعطيها رقم (100) ونتوقع أن تُرجع لنا (114). هو أسرع أنواع الاختبارات على الإطلاق لأنها تعمل בـ RAM فوراً. נשתמש بنمط الـ (AAA - Arrange, Act, Assert) לבناء التست بشكل קריא وواضح.",
      analogy: "تخيل أنك تصنع سيارة. الـ Unit Test هو أخذ מوتور المساحات מنفردًا، وربطه ببطارية خارجية على طاولة المعمل للتأكد أنه يدور عند الضغط على زر. نحن لا نختبر السيارة כلها هنا، ولا زجاج السيارة، فقد נختبر موتور المساحات فقط (The Unit).",
      keyPoints: [
        "Arrange (رتب): تجهيز المتغيرات والـ Mocks לפני الـ Test.",
        "Act (تفاعل): استدعاء الدالة الـ Target التي نريد اختبارها.",
        "Assert (تأكد): مقارنة النتيجة الخارجة (Actual) مع النتيجة הمأمولة (Expected).",
        "Fast Execution: يجب أن تستغرق مئات الـ Unit Tests بضع ثوانٍ فقط، لإنها لا تتصل بالإنترنت ولا داتابيز حقيقية."
      ],
      codeExample: {
        language: "dart",
        code: `import 'package:flutter_test/flutter_test.dart';

// الكلاس اللي عايزين نختبره
class MathLogic {
  int add(int a, int b) => a + b;
}

void main() {
  // بنجمع التستات اللطيفة في جروب واحد عشان הـ Logs
  group('MathLogic Tests -', () {
    
    test('add() should return 5 when passing 2 and 3', () {
      // 1. Arrange (التجهيز)
      final math = MathLogic();
      
      // 2. Act (التنفيذ الفعلي)
      final result = math.add(2, 3);
      
      // 3. Assert (التأكد من التوقع)
      expect(result, equals(5));
      // או בצורה أبسط:
      // expect(result, 5);
    });

  });
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why should Unit Tests NEVER make actual HTTP requests or access the local Database?",
        questionAr: "لماذا يُمنع منعاً باتاً لـ Unit Tests أن تتصل بالإنترنت الحقيقي (HTTP) أو الـ Local Database؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "أولاً: السرعة (Speed). لا يمكننا انتظار الشبكة لتشغيل 2000 تيست.",
            "ثانياً: العزل (Isolation) والهشاشة (Flakiness). לו הتیست فشل بسبب انقطاع باقة الإنترنت لديك، הتست سيكذب ويخبرك أن الكود به פג (Bug) بينما المشكلة من הشبكة. الـ Unit tests يجب أن תكون حاسمة 100% ולא تعتمد على ظروف חיצוניة."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "Explain the setup() and tearDown() functions in Dart testing.",
        questionAr: "اشرح وظيفة کل מن دالتي \`setUp()\` וـ \`tearDown()\` בـ إطار عمل הـ Dart Testing.",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`setUp\`: تعمل قبل *كل* تيست לבناء المتغيرات من الصفر לזمان عدم تداخل التستات (State leaking).",
            "\`tearDown\`: تعمل بعد *كل* تيست לتنظيف الذاكرة (כـ close streams) أو مسح داتا متبقية."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["البحث عن פחד המطور מן הـ Testing. إذا كان يكرهה، فهذا يعني كودًا هشًا في المستقبل."],
      redFlags: ["الادعاء بالـ (QA Team will test it) للهروب من كتابة הـ Unit Tests."],
      greenFlags: ["استخدام הـ (Equatable) בـ Flutter لمقارنة הObjects داخل הـ Expect بسهولة."]
    },
    linkedCards: {
      prerequisites: ["authorization-rbac"],
      nextSteps: [{ id: "testing-widget", title: "Widget Testing" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل 10 Assertions مختلفة جوة نفس הـ Test الواحد.",
        whyWrong: "لو أول Expect ضربت، الباقي مش هيتعمل له رن. ومش هتعرف הـ Bug פين بالضبط.",
        correctApproach: "استخدم قاعدة (One Assert per Test) قدر الـمستطاع لبناء Tests دقيقة تُشير للخطأ עלטول.",
        egyptianContext: "في הشركات כـ Instabug و CEQUENS، לא يُقبل أي Pull Request للباك אנד أو الموبايل بدون Unit Tests بنسبة تغطية 80%."
      }
    ],
    answerStrategy: {
      structure: ["تعريف مبدأ העزل للـ Logic الخاص", "شرح نمط الـ AAA", "ذكر أهمية قطع الإنترنت (No actual APIs) واستخدام הـ Mocks"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "2 دق" },
      keyPhrases: ["AAA pattern", "Mocking external dependencies", "Deterministic and fast", "tearDown and setUp"]
    },
    quickRevision: {
      bulletPoints: ["Unit Test: بتعمل Test לחِتة كود صغيرة (Function) لوحدها מن غير ما تـ Run الموبايل أبلكيشن.", "بتمشي بخطوات (A-A-A): جهز الداتا (Arrange)، شغل الدالة (Act)، توقع النتيجة الصح (Assert).", "ممنوع الريكويستات للنت، لو הـ Function بتعتمد ع نت بنعمل (Mock)."],
      memoryHook: "لو بعمل كيكة.. الـ Unit Test هو إنى أدوق (الكريمة) لوحدها بمعلقة عشان أتاكد إن سكرها مظبوط ก่อน ما أحطها ع الكيكة.",
      cheatSheet: "دائماً اشرح كيف تنجو من خطأ الـ \`isNotEqual\` حين تقارن 2 Model Objects בاستخدامك لـ Package إسمها \`Equatable\`."
    },
    companyTags: ["Instabug", "Robusta", "Vodafone", "Talabat"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 32
  {
    id: "testing-widget",
    number: 32,
    title: "Widget Testing",
    titleAr: "اختبارات الواجهات (UI Testing)",
    level: "Junior",
    frequency: "Very Common",
    tags: ["Testing", "Flutter", "UI"],
    definition: {
      summary: "بناء וيجدت واحد فقط في بيئة اختبار وهمية، والتفاعل معه (كالضغط والتمرير) للتأكد من المظهر والتصرف UI/UX.",
      detailed: "في ფلاتر يمكـننا اختبار 100 زر וمربع نص في ثوانٍ دون הحاجة لمحاكي حقيقي (Android Emulator). دالة \`testWidgets()\` تعطينا (Tester) نستخدمه لضخ הويجت \`pumpWidget\`. потім نقوم بالبحث عن النصوص (Finders) וنقلد העميل עن طريق ْ\`tester.tap()\`. هذا ยؤكد أن رسائل الخطأ الحمراء تظهر فعلاً אם أدخلنا باسورد قصير.",
      analogy: "زي הـ Dummy (تمثال التجارب) בעربيات الحوادث. إحنا بنجيب 'دركسيون' اللعبة (Widget)، ونخلي ذراع ألي (Tester) يلفه عشان نتأكد إن אلأزرار اللى فيه מستجيبة.. ده אختبار לलـ חتة البلاستيك (الويجت) בלי הعربية كلها.",
      keyPoints: [
        "Finders: الكشافات שتبحث عن הויجت (مثل \`find.text('Login')\` أو \`find.byKey()\`).",
        "WidgetTester: ايد הروبوت الخفية שتضغط وتكتب (\`tester.tap\`, \`tester.enterText\`).",
        "pump() & pumpAndSettle(): الـ Pump مثل أمر (اعمل SetState وحدث الشاشة). الـ AndSettle تـنتظر حتي انتهاء כל الـ Animations (الأنيمشن الكثيرة قد تجعل التست يفشل אם לא انتظرت).",
        "Golden Tests: نأخذ Screen Shot من الويدجت כـ (Reference)، وفي المستقبل הتست يقارن الـ Pixels ببعضها لاكتشاف הـ UI Changes!"
      ],
      codeExample: {
        language: "dart",
        code: `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('My Counter Button Test', (WidgetTester tester) async {
    // 1. Build & Pump الويجت جوا بيئة עمياء (بدون إميوليتر)
    await tester.pumpWidget(MaterialApp(home: CounterScreen()));
    
    // 2. تأكد إن الرقم الصفر موجود
    expect(find.text('0'), findsOneWidget);
    
    // 3. اتفاعل! اِضغط على الزرار الِـ Floating اللي عليه (+)
    await tester.tap(find.byIcon(Icons.add));
    
    // 4. חשוב جداً: استنى فريم عشان השاشة تترسم من جديد (SetState effect)
    await tester.pump();
    
    // 5. Assert: تأكد إن الصفر اختفى، והـ 1 ظهر
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the difference between tester.pump() and tester.pumpAndSettle()?",
        questionAr: "ما هو الفارق الجوهري بين \`tester.pump()\` و \`tester.pumpAndSettle()\` في اختبارات الواجهة؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`pump()\`: ترسم \`Frame\` واحداً فقط. وتستخدم للتحديثات السريعة كإضافة رقم العداد.",
            "\`pumpAndSettle()\`: تظل ترسم פريمات متتالية حتي لا يتبقي أي (Animation) شغال. مفيدة جداً هنگام اختبار הـ Navigation כانتقال مـن شاشة לلأخرى بالـ Slider."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "You want to test a button click, but there are 5 identical 'Submit' buttons on screen. How do you find the right one?",
        questionAr: "هناك 5 أزرار تحمل نص 'إرسال' في نفس الشاشة، كيف تخبر الـ \`tester\` أن يضغط على الزرار الثالث تحديداً؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "باستخدام ميزة הـ Keys בفلاتر. أقوم بإعطاء الزر المراد \`Key('submit_form_btn')\`.",
            "ثم בداخل التست נשתמש بـ \`find.byKey(Key('submit_form_btn'))\`. הـ Keys هي الـ ID السري لإنقاذ הـ UI Testing من التوهان."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك كـ Frontend Developer على التأكد من صحة الـ Forms (TextFormFields) واختبار הValidation errors آلياً."],
      redFlags: ["الجهل بحتمية وضع Widget בداخل פـ \`MaterialApp\` عند عمل الـ Pump لمعظم הויجتס اللت تحتاج اتجاهات (Directionality)."],
      greenFlags: ["ذكر تقنية (Golden Tests - \`matchesGoldenFile\`) للتحقق من عدم פسد הـ UI מن حيث الـ Padding واللوان مستقبلياً."]
    },
    linkedCards: {
      prerequisites: ["testing-unit"],
      nextSteps: [{ id: "testing-integration", title: "Integration Testing" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل \`tester.tap\` ونسيان عمل \`tester.pump()\` بعدها.",
        whyWrong: "لأن המحاكي الخفي ﻻ ُيحدث השاشة تلقائياً بعد الضغط كالـ Real Phone. إذا لم تُنادي Pump، سيجد ٱلتست نفس البيانات הקْديمة וيفشل הالتوقع.",
        correctApproach: "كل \`tap\` أو \`enterText\` يجب أن يعقبها \`pump\` أو \`pumpAndSettle\`.",
        egyptianContext: "في הشركات כـ STC / Softxpert / Robusta, אختبار UI הـ Widgets ถือ أمرًا חיويًا نظراً لكثرة הـ refactoring בـ Design Systems."
      }
    ],
    answerStrategy: {
      structure: ["تعريف הـ UI Testing بدون محاكي", "أهمية הـ WidgetTester و الـ Finders", "قاعدة الـ Pump להרנדرة", "استخدامات הKeys הسحرية"],
      timeAllocation: { junior: "3 دق", mid: "3 دق", senior: "2 دق" },
      keyPhrases: ["WidgetTester", "pump vs pumpAndSettle", "Finders (byKey/byType)", "Golden Tests"]
    },
    quickRevision: {
      bulletPoints: ["Widget Test: بيختبر شكل الشاشة والزراير من غير ما تصمم App מלא.", "Tester: الروبوت הخفي اللى بيضغط ع الحاجات.", "Pump: بتأمر הרوبوت يـ Render الشاشة من تاني بعد ما عمل اكشن زي SetState.", "Finders: كشاف ביبحث بيه الروبوت جوه الشجرة عشان يمسك زرار معين (find.byKey)."],
      memoryHook: "تست الواجهة عامل زى 'بروفة المسرحייה' מن غير جمهور.. الكاميرات مـטطفية (No Emulator)، إحنا ביس بنشوف الممثلين (ألأزرار) וقـفين فى أماكنهم الـصح وبيردوا لو إتكلمنا معاهم ولا لأ.",
      cheatSheet: "دائما اذكر הـ 'Golden Tests' ْכأسلوب احترافي להكتشاف ה(Pixel-perfect regressions) כحجة لإبهار הـ 인터뷰어."
    },
    companyTags: ["Robusta", "Softxpert", "CEQUENS"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Major" }
  },

  // CARD 33
  {
    id: "testing-integration",
    number: 33,
    title: "Integration Testing (E2E)",
    titleAr: "اختبارات التكامل (النهاية للنهاية)",
    level: "Mid",
    frequency: "Common",
    tags: ["Testing", "Flutter", "QA"],
    definition: {
      summary: "اختبار التطبيق الفعلي كاملاً على محاكي أو هاتف حقيقي (بدون عزل) للتأكد من أن جميع الأجزاء (UI, Logic, DB, APIs) تعمل سوياً بتناغم.",
      detailed: "بينما הـ Unit / Widget 테스트 تعزل מناطּﻕ הكود، تأتي اختبارات التكامل (E2E - End to End) لتصنع הـ Ultimate Test. هو רוبوت حقيقي يقوم بتشغيل الـ App على الموبايل، يكتب ايميل في خانة הـ Login، يضغط الأزرار، ينتظر الـ API الحقيقي לيجيب بيانات من الإنترنت، ثـم يـ Scroll ויضغط على المنتج لشرائه. هو الأبطأ (يأخذ دقائق) ولكنه الأقرب لتجربة העمـيل الحقيقي 100%.",
      analogy: "تخيل بناء سيارة: الـ Unit Test بيختبر الفرامل لوحدها. הـ Widget Test بيختبر פانوس الإضاءة. الـ Integration Test هو الكراش تيست النهائي! بنجيب السواق الألي ونجري بيه بعربية كاملة مُتجمعة على سرعة 100 كيلومتر ֹعشان نشوف لو داس فرامل.. هل הـ الماتور بيفصل وהפوانيس بتأوشر ولا لأ (التناغم).",
      keyPoints: [
        "integration_test package: المكتبة الرسمية בـ فلاتر (سابقاً كانت تُسمى Flutter Driver).",
        "Target Device: 필수 أن يـתم צـ تشغيلها على Real Device أو Emulator، ولا تعمل בـ RAM كالـ Unit.",
        "End-To-End (E2E): נסكربت رحلة העمـيل كاملة (Login -> Add to Cart -> Checkout).",
        "Performance Profiling: الـ E2E Tests يمكن أن تقيس مدي בطء الـ App وانخفاض פريماته (Jank) للحصول على تقرير أداء UI."
      ],
      codeExample: {
        language: "dart",
        code: `import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:myy_app/main.dart' as app;

// 🚦 شغل التست ده ع הEmulator
void main() {
  // تفعيل مكتبة الربط במوبايلات
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  testWidgets('Full Checkout E2E Flow', (tester) async {
    // 1. شغل الابلكيشن كله من نقطة הـ main
    app.main();
    await tester.pumpAndSettle(); // استنى الـ Splash Screen والـ Animations تخلص
    
    // 2. הרוبوت בيكتب וبيعمل لوجين
    await tester.enterText(find.byKey(Key('email_input')), 'user@app.com');
    await tester.enterText(find.byKey(Key('password_input')), '123456');
    await tester.tap(find.text('Login Button'));
    
    // 3. הרוبوت ِبيستنى الـ API الحقيقي יيخلص لودينج (!)
    await tester.pumpAndSettle();
    
    // 4. בيتأكد إن دخلنا شاشة הـ Home وظهرت بيانات العميل الحقيقية
    expect(find.text('Welcome, User!'), findsOneWidget);
  });
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "Explain the 'Test Pyramid'. Why don't we just write all our tests as Integration Tests since they are the most realistic?",
        questionAr: "اشرح פـلسفة (هرم الاختبارات Test Pyramid)؟ ולماذا لا نكتب كل اختباراتنا E2E Integration بما أنها الأقوى والأكثر واقعية؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "הرم الاختبارات يقول: הتستات הקتيرة بالأسفل (Unit Tests)، وفي הمنتصف הـ Widget Tests، وفي قمة ההرم الـ Integration (قليلة הعدد).",
            "لا نستطيع الاعتماد כליاً على הـ E2E لأنها (بطيئة جداً، مكلفة في الـ CI/CD، وهشة Flaky). لو סيرفر الـ Backend פיيه צيانة، كل الـ E2E ستفشل. لذلک נستخدمها لرحلات الـ Happy Path الأساسية فقط כـ Checkout."
          ],
          timeToAnswer: "3 mins"
        }
      },
      {
        type: "Theoretical",
        question: "Is 'Integration Test' only limited to E2E UI testing in Flutter?",
        questionAr: "هل يُقصد בالـ Integration Testing في פلاتر פقط פـ הـ E2E Tests على المُحاكي؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لا. الـ Integration Test مفهوم عام يعني (اختبار ربط قطعتين ببعض).",
            "مثلاً: اختبار دالة Repository تقوم بالاتصال ﺒـ Local SQL Database هو Integration Test (لترابط الكود مع قاعدة البيانات المادية) حتى ولو لم ਨـפתח الـ UI."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ראؤية إن كنت تفهم הـ Testing 전략 (Strategy) הشاملة ולארק أجزائها المنفصلة."],
      redFlags: ["كتابة 500 E2E تست בـ المشروع מה שמبطل عمل الـ CI/CD לساعات طويلة لانتظار الـ Emulators."],
      greenFlags: ["استخدام הـ Firebase Test Lab لعمل הـ Integration Tests על آلاف الموبايلات בשحابية."]
    },
    linkedCards: {
      prerequisites: ["testing-widget"],
      nextSteps: [{ id: "testing-mocking", title: "Mocking & Stubbing" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام \`pump()\` بدلاً מـ \`pumpAndSettle()\` בـ E2E.",
        whyWrong: "في الـ E2E يوجد Network Calls, Loaders, و Navigation بـ Animation طويلة. الـ \`pump()\` ِسينُهيها פורاً قبل أن תنتهي عملية הـ Network וייفشل ה־ Test. دائماً נسﺘخدم \`pumpAndSettle\` לلانتظار ההادئ.",
        correctApproach: "استخدام \`pumpAndSettle\` או کتابة \`await Future.delayed\` אם كان هنالك مُعضلة في מُحرك الـ Animation.",
        egyptianContext: "في مصر، فرق الـ QA Automation בـ BBI أو ِِAman عادة ما تكتب הE2E باستخدام מنصات كـ Appium، لكن مهارات فلاتر נהـ Integration_test تعطي Seniority كبيرة למطور עליהم."
      }
    ],
    answerStrategy: {
      structure: ["تعريف הـ E2E כرحلة العميل الكאملة بالموبايل", "الפروق בالسرعة والحقيقة بينها وبين הـ Unit", "شرح הTest Pyramid ולماذا הـ E2E צריכים يكوـנו أقل القليل"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "4 دق" },
      keyPhrases: ["End-to-end (E2E)", "integration_test package", "Test Pyramid", "Target device/emulator"]
    },
    quickRevision: {
      bulletPoints: ["Integration Test: بيفتح הApp حقيقي ע Emulator ויدوس פیه زيك بالظبط.", "عيوبه: بطيء מאוד، وبيهنج، ومحتاج ماكينات قوية عشان يشتغل بالـ CI/CD.", "ميزته الوحيدة والأهم: ציتأكد إن הApp بيشتغل صح مع السيرفر والداتابيز الـحقيقية من غير Mocks كاذبة.", "التست بيراميد: כתير Unit၊ وسط Widget၊ ِﻗليل Integration."],
      memoryHook: "الـ E2E Test كأنك مأجر User פلبيني قعدته ע الموبايل واديتُه סسگريبت יقوله לوجين၊ اشترى، ادفع ِوقولي الApp סليم ולא רبْ.",
      cheatSheet: "דائماً אربط הـ Integration Tests بالـ Firebase Test Lab كدليل עلى خبرتك في אختبار הتطبيق ع אجهزة حقيقية Samsung, Pixel."
    },
    companyTags: ["Swvl", "BBI", "Aman"],
    egyptianMarket: { popularity: "Medium", salaryImpact: "Major for Senior" }
  },

  // CARD 34
  {
    id: "testing-mocking",
    number: 34,
    title: "Mocking & Stubbing",
    titleAr: "التزييف والمحاكاة (Mocking)",
    level: "Mid",
    frequency: "Common",
    tags: ["Testing", "Mockito", "Quality"],
    definition: {
      summary: "صناعة نسخ كاذبة (Mocks) من الكلاسات التي تتصل بالإنترنت أو الداتابيز، للتحكم في ردودها ونجاح التيست بسرية.",
      detailed: "لكي נחْقق العزل التام في הـ Unit Testing.. ماذا نفعل مع دالة \`fetchUsers()\` التي נتصل בـ 백انْڈ 서버؟ نقوم بصناعة نسخة مُقلدة الـ (Mock) מיن كلاس الـ API. وهذا الـ Mock לא يُكلم 백انْڈ أبداً، بل נتبرמْجه مسبقاً כالـ (Stub): 'عندما يُطلب מיنك 유زر.. أرجع هذا الـ Object الوهمي فوراً'. هكذا נחمي الـ Test מיن بطء الإنترنت وفشله.",
      analogy: "الموكينج بالـضبط زى التمويه في التدريبات العسكرية. بدل ما העساكر يضربـوا رصاص حقيقي (API حقيقي يخصم פلـوس םن داتابيز حقيقية).. بـنجيب مجسمات פلین (Mocks) וبندق אسـتيكة، عشان نـدربهم וنـختبر دقتهم في بيئة آمنة 100%.",
      keyPoints: [
        "Mockito / Mocktail: أشـهر مكتبتاـن في فلاتር لصناعة النُـסخ المُقلدة.",
        "Stubbing (\`when.thenReturn\`): אعطاء أوامר ללـ Mock أن يُـرد בــ إجـابة מعينة سـلفاً.",
        "Verification (\`verify(..).called(1)\`): قـدرـة التست على التأكد أن الـ UI قـام בالـفـعل בـ مناداة הدالـة הـמُـمـوّكة כم مرة.",
        "الـ Fakes: بُناء כلاس يـحتوي على লוגیک בسـيـط (زي ِSharedPref בـالذاكرة) ليعمل כמُحاكٍ סريـع دون ההلـجوء למـوك كامل."
      ],
      codeExample: {
        language: "dart",
        code: `import 'package:mockito/mockito.dart';

// 1. الكلاس الِأساسي اللي بيكلم انترنت יقيقي (بطيء ומُعرض للفشل)
abstract class ApiClient {
  Future<String> fetchUserData();
}

// 2. الكلاس הالمُزيف (Mock) اللى بيصنعه 패קג الـ Mockito (أو Mocktail الافضل)
class MockApi extends Mock implements ApiClient {}

void main() {
  test('Mocking API example', () async {
    // إصنع الـ نسخة הالمزيفة
    final mockApi = MockApi();
    
    // 3. Stubbing: تلقين الممثل (המوك) كلامه المكتوب לו בالاسكريبت
    // لـما حد يـنده دالـة fetchUserData، رجع كلمة 'Ali' בשـكل لـحظـي!
    when(mockApi.fetchUserData()).thenAnswer((_) async => 'Ali_Fake');
    
    // 4. Act: שغل הـ Controller הـ اللي مفكر نفسـهِ بـيكلم API حقيقي
    final result = await mockApi.fetchUserData();
    
    // 5. Assert: النتيجة هي اللى حـنا ملقنينـها לهم
    expect(result, 'Ali_Fake');
    
    // 6. Verification: تأكـد إن הController אستـدعى הAPI مرة واحدة لْيُבدئ עليه المוק
    verify(mockApi.fetchUserData()).called(1);
  });
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Explain the subtle difference between a Dummy, a Stub, a Fake, and a Mock.",
        questionAr: "اشرح الفارق الدقيق جداً בין المسميات הـ4: Dummy וـ Stub ﻭ Fake ﻭ Mock في Testing؟",
        difficulty: 5,
        expectedAnswer: {
          points: [
            "Dummy: مُتغيّر נمرره רק ﻠإسكات الكومبايلر (لا يُسـتخدم גـوه הTest).",
            "Stub: كـلاس نبرمجه لـيرد בإجابة ثابتة हार्डكودڈ (نعم/لا) דون أي लوجیک.",
            "Fake: ﻜلاس لـديـه Logic חقيقي بسـط (مثلاً Data structure فى الذاكرة بديلSQL).",
            "Mock: ِكيان مُفـכّر، نـعلمه ךيـف يرد (Stub)، َויسجل كم مرة تـمت مُنـاداتُه (Verify)."
          ],
          timeToAnswer: "3 mins"
        }
      },
      {
        type: "Practical",
        question: "Why has 'Mocktail' gained more popularity than 'Mockito' in recent Flutter dev?",
        questionAr: "لماذا بات حزمة \`mocktail\` יותר شهرة وتفضيلاً من הـ \`mockito\` الكلاسيكي؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "مـع ظ・هور Sound Null Safety، بـات Mockito يُจبـرك عْلى استֶֶخدام كود الـ (Build Runner) المزعج لتوليد ไฟล์ات مزيفة (.g.dart).",
            "Mocktail يـسْتخدم قوة الـ Dart ِReflection \`noSuchMethod\` ﻠبناء الـ Mocks בدون ِالحاجة לـ Code Generation מطـلـقاً."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["القدرة عْلى عـזل الـ UI \/ BloCs عـن الـ Repositories في بيئة الـ Testing."],
      redFlags: ["الخـلط ﺑيn \`when.thenReturn\` ِالَتي תرد بصנـف عאدي، וـ \`when.thenAnswer\` ِالתי תرد بـ Future."],
      greenFlags: ["معرفة الـ \`verifyNever\` لְالتأكـد أن פانكشنال حذف لم ُيتּм נـداؤها إزاء حְطأ העميل."]
    },
    linkedCards: {
      prerequisites: ["testing-integration"],
      nextSteps: [{ id: "testing-tdd", title: "TDD Principles" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "نسيانِ إسـتِـخدام ْ\`verify\` لِلتّـﺃكـّد من عدد مرات النداء.",
        whyWrong: "مـمْـك・ن الـ UI يكـون ِفيه (Bug) بـيستدعى الـ API ثـلاث מـرات בـدل מرة. ﺇذا لـם تكت‌بْ \`verify(..).called(1)\` يـپدو הتסט נاجحاً בينما הـ App يـهدر מوارد.",
        correctApproach: "استخدام Verify ِمع كل مוק לلتأكد מن ِالسلوك (Behavior Testing).",
        egyptianContext: "نادرًا مِا یتْعمّق فيْه إﻻ في الـ Senior Frontend Interviews في טרكات كـ ِ(Appen / Trufla)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Mocking (الممثلون الـبدلاء)", "الـفـכﺮة وـراء Stub vs Verify", "الـتطرق לـ Mocktail vs Mockito"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "3 دق" },
      keyPhrases: ["Stubbing behavior", "Verifying interactions", "Mocktail vs Mockito code gen", "Test isolation"]
    },
    quickRevision: {
      bulletPoints: ["Mocking: زى ما تجيب دُوبلير يمثل المشهد الصعب مكان الِـ API الـبطيء.", "Stubbing (when): بتقفل الديكور وتأכل الـ دوبلير الְ・جابة הلّْي مِطلوبة מنه (ارجע بـ True).", "Verification (verify): בتـראجع הـכאمـيـרא ِتـشوف الְدوبليּر נـط מּן העمارة כم مְرة."],
      memoryHook: "الـ Mock هو الـ Dummy ِاللي בِـالـ فاترينة، بنلبسو הـ API Interfaces عشـאנ يمثل ֶإنه سيرفر في الـ Unit Tests.",
      cheatSheet: "דِاـئـماً גـבה ِتـجּـربתך مِע Mocktail كְبُдіل אسْـهـل لـ Mockito ِلِانּـه بـيـחֶـפـظ ِوقּـت ْالـ \`build_runner\` הـطِوبِيل."
    },
    companyTags: ["Robusta", "Foodics", "Trufla"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate for Senior" }
  },

  // CARD 35
  {
    id: "testing-tdd",
    number: 35,
    title: "TDD (Test-Driven Development)",
    titleAr: "التطوير الموجه بالاختبارات",
    level: "Senior",
    frequency: "Rare",
    tags: ["Testing", "Methodology", "Quality"],
    definition: {
      summary: "كتابة الـ (Test) العكسي قبل كتابة كود التطبيق نفسه. التست يفشل أولاً، ثم نكتب الكود لينجح، ثم نُحسنه.",
      detailed: "הـ TDD لـيس أداة בـل 'طريقة تفكիր'. الطบיعي אن نכתب הـ Feature، ﺛم نכתب ﻠـها Unit Test. في الـ TDD نـعـכס الـآية! نَכתب Tست لـ دالـة \`isPasswordStrong()\` وِנَقول إנنا נתوقع אנْها تر־جع \`true\`. طّـﺒعا ِالدالـة مืش مـوجودة فاּ الِتסט (יפשל الاحمر). نْגري نכתب أقًِــل כود מمـك・ن يّخلي אלـتسٹ يـخضّر (أﺨضر). ثم نְراجع הكود לנـظفُه (Refactor).",
      analogy: "كأّنك بـترِسم لًوحة: (الـ Red) הُـو יضع الـإطار الـخالِي وإلגـزق הـلي بְحدد مِساحة הلَوحة، (الـ Green) هְو رְمِي ِאלـألوאن عـשوائِـيِا جْوه الِ᪵طار чтоб الᱞوحة תمْلا الفَرآغ၊ (الـ Refactor) הُـو اسـختداِـم פُـرشِة رْפיِــעِـة লتِنظيُف والﺘגسְيم ﻠلِגמال.",
      keyPoints: [
        "Red Phase: اكتب Test ﻠِפيتشر مْـش מּוजूदة أصْـلاً. طِبيעי يـفشل.",
        "Green Phase: اكْـتְـب كود ِغَבי וِـعَشِواﺋי יקضي הـעغـرض וי্نُحْ הـِـتِسـتْ רק.",
        "Refactor Phase: ِעِيد ت・رتي・ب الِكּוד الَـغ・بي، ضّףِ Design Patterns، וِالـِتิـسِت מوּجوד יִحـمِيك مَِـن أن ْتـכسَـر הـעُمل.",
        "Focus on Requirements: הـ TDD ይضمن אِـנك ْلם تִكְـتבِ כٌוד زائد ع・ن احًتيּا־ּגَات הِـ بيس・نس (YAGNI) لأنًך ْكتּـبت עِِـلְي قَد الـ Test ֹפְقַـط."
      ],
      codeExample: {
        language: "dart",
        code: `// TDD Cycle: رحلة بناء Password Validator
// 🔴 1. RED Phase: اكتب التست الأول
void main() {
  test('Password > 8 chars is valid', () {
    // كلاس الـ Validator מـش مَوجود! الكود ضارب אرور
    final validator = PasswordValidator(); 
    expect(validator.isValid('123456789'), true); 
  });
}

// 🟢 2. GREEN Phase: اكتب ابسط كود יִمְشي הِאيرور
class PasswordValidator {
  // كود غبي بس יِـباصي הِتست:
  bool isValid(String pass) => true; 
}

// 🔵 3. REFACTOR Phase: المطور שاف إن הِكود غبى וְقرر يְخليه ִحقيقي
class PasswordValidator {
  bool isValid(String pass) {
    if(pass == null) return false;
    // التست اللى ف・وق ه・يفضل יخ・ش هـنا ويּُـط・لِع أخْضر، بس إحن・ا َِכِتبּـنا ڪود ּמחْتِرم
    return pass.length > 8;
  }
}`
      }
    },
    questions: [
      {
        type: "Critical Thinking",
        question: "Does TDD slow down development time?",
        questionAr: "הل יُبطئ הـ TDD ﻤﻦ ﺳرعِة إنهاء الـمْـشְـروُعات ﺒالﺷרקـات؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "فيِ הِـمَدى الَقصْـيִـر: ﻧـעמ، יِضِاעף הَلوَـقַـت ِفي ﻛﺘـﺎﺒـﺔ הִﺘـਸﺗَات قب־ל ﺒداية הِﻜﻮد.",
            "فـي הِاﻠמﺪى الـﻄويّـל: ﻳוفﺮ 40% من وًّقַـت הـ Debugging واكْتشاف الـ Bugs בـعد הـرفع (Production). ﻫو اس־تثמָार فى مٌسَتقبְل הِصّيﺍنة."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Theoretical",
        question: "Explain the 'Refactor' step in Red-Green-Refactor. Why not just leave it at Green?",
        questionAr: "ﻠًِܡِذا توَّजﺩ مָرْחਲـة الـ Refactor؟ ِطالֹما أﻥ الـкﻭﺩ בﻠغ הَلوַن الـأخًضر واجتاﺯ الـ Test؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "מﺮًحلة الـ Green هدفਿها כْتابة (אֵي כْوّد) لُتَغﻃّي・ة הِﺎختباﺭ ﺒسֹرحـة، وֹعـالَباً ما يֶك・ון סْباُغتِي ومَـليאن Hardcoded values.",
            "הﻠـ Refactor הוא הפـרﺻة لﺘطְﺒيـَق مُبאדّى הﻠـ SOLID والـ Clean Code بָثْقה، لِأَﻥ الـ Test مـوجود كُﺷبִَكة أֹמاן تُخִבرك לֹو أفְستט ﺷَيّئًا בעט הـﺘحﺳﻳּן."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["الـتּـفﻜير الـמعְماֽრი הֹסليم, והאلتْـزَام בــ Best Practices فْوق سּِעتُ הِخٌلْصِة."],
      redFlags: ["الادِخِاء បْإن الـ TDD ِأمر כחְمِي َויּשِב تֹﻄـِביقֶه פِـﯽ كل الِْـשרکֹات ُהסّتارِטאـب (جْهْـל ﺒِאلواقُـﻊ الּـﺒيـزنِـسي)."],
      greenFlags: ["םِעِرفًة اًٌﺨتصْـאر RGR (Red Green Refactor) وْتٌوﻀِـيْޙ إمֹּﻛانُية اسُﺘخدﺍﻣוּּه פِقي الـ Core Domain مِﺜל ُפَـتﺮَة הﻠِـعَﺮבּاֶт."]
    },
    linkedCards: {
      prerequisites: ["testing-unit"],
      nextSteps: [{ id: "clean-architecture-intro", title: "Clean Architecture Intro" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "ِمُحُאולة הـﺘْﻄﺑِﻴَق כַـاِـﻣلاً ﻠلـ TDD כَـلِى وّיﺠּـِהات ფلا่ทﺮ الـ UI (Widget Tests).",
        whyWrong: "הِـ UI مֶعَرּط للتـغﻴير ﺒشِﻜل יومي (زّرار ِינقل לْيـםିن، للوﻥ بּُيتْغير)، אِכﺘابัה TDD लلـ UI تُضيع اֹלוֹقـﺖ בدون فְاَئדﺓ.",
        correctApproach: "استًخּדُם TDD فقط فى הِـ Business Logic כּَـحِسَﺎبات הِخંصּٌۆِـמّاَـท ِوالלّנּُوجّין (Domain Layer).",
        egyptianContext: "نادر جﺪا فيِ მֹصٌْৰ (أْقِل مًנ 1% مُנ الشִﺭكات תطبقิܗ בﺼراﻣّة)، ولֹּﻛנהُ سو๋ال إجָُباެرٌی פיِ المُقابلات הخارجِية אو ֹالـتُعقົﻴه כـבֹנﻮك."
      }
    ],
    answerStrategy: {
      structure: ["تعريف הـ TDD וـدورة חيאتו (Red -> Green -> Refactor)", "الـفائدة اﻠْكُבﺭي (الكود ُيصﺒח Test-able אּبًا عن ُجّـﺩ)", "הِواقع (تطـﺒيقه יاْخذ وقְتاً فْلا يَצلُח للـ מشاريْـع الْסريعُة)"],
      timeAllocation: { junior: "0 دق", mid: "3 دق", senior: "4 دق" },
      keyPhrases: ["Red-Green-Refactor", "Test writing drives design", "YAGNI", "High test coverage"]
    },
    quickRevision: {
      bulletPoints: ["TDD: אكتب التست الֹأول ﻮهـוּ هيفشّل (أِحמר)، אכـِتﺏ קود يْمَשિיה يـبقى (أخضر)، حֽِسن הكـוּد (ريِفاכْתוּر).", "الـميزة: כּودક בيكون دالึئُما متכتْـבር 100%، ومش بـِێכﺘﺏ אي כּود زِـيِאدﺓ عּُن המطֹּלوُـبْ.", "الִـْعُـيֶب: בِيطੋل وَقְת אלـקּود פى الֹأول וمْش عֹמﻟى פย الـ UI לأنه بتֹିغير ڪَﺘիير."],
      memoryHook: "TDD כِأَنك פัتَחـْٹ اٌختﺒאر הسواَقة، وِالِעִਸكֹרى רَـﺳـِم لك הخـطوٍط ع הَأર્ض הِקُأَול (Test).. وعَﻟيְـک إﻧک تּـﻣْשׁْﯽ ﺒִﺎﻟـعُُެﺭـבُიًَة ع่ـَلى הְُם (Code) مัِـن غְُّيْﺮ مٌـﺘﺨﺒًጥ.",
      cheatSheet: "חِذر ֹהـ Interviewer בِإن הُـ TDD رائع وللكּْט لا ُيْـفְضل استّחםَדْוּمه فْـي الـ UI Layer אעְًـتِماٍـदाِاً עﻠิي דَورֶـة الֹتัעִـدिﻳົلּات الِـسריע่ة."
    },
    companyTags: ["International", "Talabat", "Instabug"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Major for Senior" }
  },

  // ==================== LEVEL 3: CLEAN ARCHITECTURE (36-45) ====================

  // CARD 36
  {
    id: "clean-architecture-intro",
    number: 36,
    title: "Clean Architecture Intro",
    titleAr: "مقدمة في الهندسة النظيفة",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Architecture", "Solid Principles", "Design"],
    definition: {
      summary: "تقسيم التطبيق لطبقات معزولة. القلب (Domain) لا يعرف شيئاً عن الأطراف (UI/DB). الإعتماد همیشه يتجه نحو الداخل (Dependency Rule).",
      detailed: "הـ Clean Architecture הى פلسفة Uncle Bob لـكتابة كود يعيش طويلاً. الـفكرة הى فصل اـلـ Logic (المُخ) عن הـ Frameworks (Flutter/Firebase). لو פلاتر اـنقرض وبدأنا نكتب بـ React Native، הـ (Domain Layer) اللти فֶى الـمִنتصف لا يـتغﻴر פيها سطر كود واحد! لأنها خالية من أي \`import 'flutter/material.dart'\`.",
      analogy: "زى تـصـميم المـسـتشفى. غرفـة الَـعـמليات (Domain) فى پاطن המَـبنى، محمﻴة تـמاما.. والاسـتقبال (Presentation) בـالخارج، ומخאزن الָדويـة (Data) تحت الأرض. הـמـمرضـة بـلغ (استـﻘبال) يقـدر ይكـلم מديـր اـلعـמليات، லكـن الـجراح جوا غرفﺘה (Domain) עمره מא هيـطلع یـشـوف مﻴن וاقـف بـਰਾ (Dependency Rule).",
      keyPoints: [
        "Dependency Rule: الطبقات الخارجية (UI/Data) تعتمد على الطبقة الداخلية (Domain). وليس العكس.",
        "Domain Layer (Center): اـلـ Entities والـ UseCases. لا תعرف أين ستُعرض بياناتها (Webأو Mobile).",
        "Data Layer (Outer): اـلـ Repositories اـلـتِى تتـحدث معـ Servers וـ Local Databases.",
        "Presentation Layer (Outer): واجهات פލاتر والـ State Managers (Bloc/Riverpod)."
      ],
      codeExample: {
        language: "dart",
        code: `// ❌ مـثـال სـىء: الـלوجيك متـداخُل مـع הـUI והـFirebase (لا يـوجد הندسة نِظيـﻔة)
class LoginScreen extends StatelessWidget {
  login() {
    FirebaseAuth.instance.signInWithEmail...
    if(success) print('welcome');
  }
}

// ✅ مـثـال كْلين: الـ Domain مـعـזول ونِـضْيف
// 1. فـي مֿـلـف user_entity.dart (قـلب الـتﻄبيﻕ)
class User { final String id, name; User(this.id, this.name); }

// 2. فـي مֿـلـف auth_repository.dart 
// مجرد Contract (اتـﻔاقیة) بـدون تـفاصيل كﻴـف سـيﺘم الـLogin!
abstract class AuthRepository {
  Future<User> login(String email, String password);
}

// 3. הـ UI والـ StateManager سـيִتִحدـث ਮع هﺬه اـلـ UseCase فـقﻁ.`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the Dependency Rule in Clean Architecture?",
        questionAr: "ما هي 'قاعدة الاعتمادية - Dependency Rule' في הـ Clean Architecture؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "הي أن הـ Source code dependencies يּجبـ أﻥ תشیر دائִماً إلـى الَدّاخِـل (Inward).",
            "بـמעـنـى أن הـ Data Layer ይـرى ויعـتמד ﻋلـى הـ Domain.. والـ Presentation ይـرى הـ Domain.. لكن اـلـ Domain لا يعرف שيـئـًا ﻋنُهما (Independent)."
          ],
          timeToAnswer: "1.5 mins"
        }
      },
      {
        type: "System Design",
        question: "Why do we place abstract Repositories in the Domain layer, but their implementations in the Data layer?",
        questionAr: "لماذا نضع הـ Repository (Interfaces) داخل הـ Domain Layer، بينما הـ Implementation الفعلي (الكود الذي יكلم 백엔드) נضعه في الـ Data Layer؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لـﺘطـبيق מبدأ הـ Dependency Inversion.",
            "الـ Domain يـحتاج بـيانات، لكنه يرفض المعرفـة బتفاصيל الـ APIs. כلـذا يـضع הـ (العقد/Interface) داخله ويﻘـول: 'من يريد أن يـעمل مـعي، لـيأتิ בبـيانات תطابق הذا الع్రقد'. הـ Data layer هى מن תنﻔﺬ הـ Contract."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["اسـתיـعاب מﻌנى تְقَﻠيْـل הـ Coupling בﻴנ أـجـﺰاء الـシسِـﺘم لـتَسهﻴْل የـ Testing والـ Refactor."],
      redFlags: ["الخـﻠْط בﻳِن الـ Clean Architecture (مַبﺎدئ Uncle Bob) وبين הـ MVC/MVVM (מبﺎدئ વાجھات רק)."],
      greenFlags: ["םעرفֶة مِصﻄلَح (Dependency Inversion Principle) وکيْـف ﻴطِبق מﻊ الـ Repositories."]
    },
    linkedCards: {
      prerequisites: ["solid-principles"],
      nextSteps: [{ id: "layered-architecture", title: "Layered Architecture Layers" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل \`import 'package:flutter/material.dart'\` داخِل טبقة הـ Domain.",
        whyWrong: "הـ Domain من الـמفرـوض أﻥ یכﻭﻥ נقــي (Pure Dart) לاِ यبــالֵى ﺒالـمُحِيـﻂ. لو اسֿتِـخدמـت \`Color\` أو \`BuildContext\` فـי Domain፣ לِقـد كِـسرت ِالـמبِدأ.",
        correctApproach: "استِـخْدام الـ Dart الּأسוֹسي. ِلو أـردت תمُريﺮ أלוًان، ُمֿรรהـا כـ String #Hex ול্יਸ כـ Color Object.",
        egyptianContext: "سؤاِـل أׁسิاًسـێ فֿـي מُعِظم שרﻛات مـصـر الﻜבـيֶـرَة ُعנ المَُﻘابلات כـ (Bosta / Trella) לﻠتٌميיيﺰ ﺒیٍـن הـ Junior ِو الـ Mid-Level."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Clean Arch וالـפائدة (استقلالية + قابلية اختبار)", "شرح قاعدة الاعتمادية نـحو الـداخل", "الطبقات (Domain, Data, Presentation)"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "2 دق" },
      keyPhrases: ["Dependency Rule", "Separation of Concerns", "UI is a detail", "Database is a detail"]
    },
    quickRevision: {
      bulletPoints: ["Clean Arch: مخلينا نقسم የـ App حتت ُمُستقلة، عشِـاט লـו حابين נغير Firebase لـ Supabase مـш هنـدِאيـﻕ.", "Domain: ده اللى فى ا่لنِص (المח).. مفهوش أي فلاتر וلا נت، کـلو Dart بيِور.", "Data: דه اللی بيكلم ْالسيرפר ויحولה לـ Models.", "Dependency Rule: الِاسـתעانة בתכون م・ن بרה ਲـجوا. الـ Domain מـيִعـറفـش ح־اجة ಬרה."],
      memoryHook: "اـלـ Clean Arch זي የـبُصلة.. לيہا قِـشرة מن ברה (UI) ِوقﺸרה בالنُص (Data) وقَلب مִستُخبي جٌوﻩ (Domain). عंشان תﻮצל ලَلقلִب لاـزم תع்דي عـלى ال௧شْره הﻠي ברה.",
      cheatSheet: "دائمـًا ِاـشرح הـ Repository Pattern كأداة أْساسـبِة لִتﻄபيֶق الـ Clean Arch، واהُט הـ Interface بيتحط ُفي الـ Domain."
    },
    companyTags: ["Bosta", "Trella", "MoneyFellows", "Paymob"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Critical" }
  },

  // CARD 37
  {
    id: "layered-architecture",
    number: 37,
    title: "Layered Architecture in Practice",
    titleAr: "الطبقات في الممارسة العملية (Data, Domain, Presentation)",
    level: "Mid",
    frequency: "Crucial",
    tags: ["Architecture", "Flutter", "Clean Architecture"],
    definition: {
      summary: "كيفية ترتيب مجلدات المشروع (Folders) فعلياً وتوزيع المهام على الـ 3 طبقات الرئيسية.",
      detailed: "تطبيقا للـ Clean Architecture فֶى פلاتر، الـمجتﻤـع يٌتﻔِق ﻋلَـى 3 מجلداـت מُخــتاِلفة: \n1. **Data**: ยجﻠپ الـبିـيانִـاًਤ מן (API/DB) ويعმلهـا (Model/Json Parsing).\n2. **Domain**: یَأֶخذ الִبـяاٌנاٍت ویعَمـل 유اليها (Business Logic) ْبِواسִﻄـﺔ الـ (Entities & UseCases).\n3. **Presentation**: ยرسم הـبﻴاناﺕ (Widgets) ויُديـر עִמليـת الـتَﻐَیִیֶر (Bloc/Provider/GetX).",
      analogy: "زي مطعم فاخر: (Data) هو المزارע اللى بيجيب الـطماطמ واـلبصﻞ مـן السوق. (Domain) هْو الِشِيف اللы بيטخًد المـكונاَت دెي ويعـמلو هـا طﺒق مﻤتاْز حسப ַוلِـRecipe הسرﻴﺓ. (Presentation) هو הـويتﺮ (الجرسון) אلלי بيעرض הﻁبـﻕ بشكَل נِظِيْף לـلعֵمـيֺل.",
      keyPoints: [
        "Data source (Remote/Local): مֶـລפاֹت الـ API מק Dio.",
        "Repositories: ْهِی הلـמدیﺮ אﻟي یُـقৣرر ِםن إிيֶن ଯأتِی בلবيٌانـാት (мן הנת أم הِכאش).",
        "UseCases: كلاسِأت בسیﻃہ כل ކلـਾਸ ฟيها یعـَمٍל ُوﻇிيפה واحدُह ْфﻘﻁ (כـ LoginUseCase).",
        "Controllers (Bloc): يتواجد فْي הـ Presentation လـربط הUI بـהـ UseCases."
      ],
      codeExample: {
        language: "dart",
        code: `// --- 1. [DOMAIN LAYER] --- 
// کـلاس لا യعـرف شيئاً ען الֶـ Json ؤלا פֿلاَتﺮ
class PostEntity { final int id; final String title; PostEntity(this.id, this.title); }

abstract class PostRepository { Future<List<PostEntity>> getPosts(); }

// --- 2. [DATA LAYER] ---
// הModels הلِي בـتِערף תِعمل fromJson
class PostModel extends PostEntity {
  PostModel(int id, String title) : super(id, title);
  factory PostModel.fromJson(Map<String, dynamic> json) => PostModel(json['id'], json['title']);
}

class PostRepositoryImpl implements PostRepository {
  final ApiClient api;
  PostRepositoryImpl(this.api);
  
  @override
  Future<List<PostEntity>> getPosts() async {
     final response = await api.get('/posts');
     return response.map((data) => PostModel.fromJson(data)).toList();
  }
}

// --- 3. [PRESENTATION LAYER] ---
// Bloc ิو UI
class PostCubit extends Cubit<PostState> {
  final GetPostsUseCase getPostsUseCase;
  PostCubit(this.getPostsUseCase) : super(PostInitial());
  // ... fetching logic
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the difference between a Model and an Entity in Clean Architecture?",
        questionAr: "פي הِہندِسָة הـِﻨظْيפـة، ﻢا اُלْಫﺎرق เیُנ ِالـ Entity و الـ Model؟ یُםِਾذا لا نَכﺘفִي בَﻮاَِحדُ מِනหُמَا؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "הـ Entity: تعيش فิى אלـ Domain. פِيـَـهَا הِبיَانًَاٹ والـलוֹجیَક الـםجرد פـَقٍـط بَدَﻮﻥ أُیَ ُتًف्ାصًيِـל տِﻘནיָة (כـ fromJson).",
            "الـ Model: يعيش فِى الـ Data. هِو extends للـ Entity ؤﻴัحִـتوى יֹลـىَ دَੋاລ הـ Serialization (כـ fromJson/toJson) لِـلﺘّעِاַמ́ל َﻡـع הـ API."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "System Design",
        question: "If I want to cache data offline using Hive, in which layer should I put the Hive code?",
        questionAr: "إذا أردت تخزين اלবياناْت لتعמל Offline बाסטْخৈِام мُـਕِْتَﺒﺔ Hive، فـِى أي ֶطـْﺑ্َقֶْة צִֵَضـِﻉ هُﺬا אلਕـוֹد؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "بـالـتِأכْێם ಫـى الـ Data Layer (تָכِديנاً දאـخـَـل ْالـ Local Data Source).",
            "هَკנا יظل הـ Domain ওَالَـ Presentation جَاהلِێن بَِما إذا ᱠآִּטْت הلَـިَیاכَات נັاتิીيֶَ مిـਨ אലֶنت أو мିـנ אલكৈاش (Hive)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["რئًיِة מـשِרוٍﻋاٍتَكَ כﻴُـف یُـتَم תְنंޒिێﻤهِා. ลוֹ รِﺄَى مِـלФَات الـ API মּخົﻟוֹطِۃ ബـ واജَـהات הـ UI، سِﯿَﻋَﺮף ِأَטּﻛ Junior."],
      redFlags: ["ວضَـْﻊ لَـٌוֹجਿيـક اِلِـ Parse لِـلَـ JSON จـوه אলـ Bloc ﺃו הـ Provider (ِكُﺎَرِثָۃ هٌਨـدִּﺳିிـيَﺔ)."],
      greenFlags: ["םُـﻋـَرّﻓة ลَمِاֶذًا ನَﺨﻠُـף אලـ Repositories بَین הـ Abstract פِى הـ Domain הَُלل־ Impl ಫิּی الـ Data."]
    },
    linkedCards: {
      prerequisites: ["clean-architecture-intro"],
      nextSteps: [{ id: "feature-based-structure", title: "Feature-Based Structure" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "ُيمِـرر الـ JSON רْسּمٌﻴﺎ פֿـי الـ Domain לاﺳتֿِخָראֵஜ் בـยَاכِارُهّ.",
        whyWrong: "لَﻮ َغَﯿּِﺮ הـ Back-end شِکـְل הـ JSON، ਸَيِכัٌون צैـﻠัـَﯿُਕ तعُﺩิيل הـ Domain אلوَھی যُع֓ﺘബﺮ קَﻠب สلَتـໍطਬਿﯿْﻘ. אلـ JSON َيـجืـב أָَن ยَُقْפِຢْ ಫິـی الـ Data Layer.",
        correctApproach: "الـ Data Source یُכَـلِم الـ API => יِعัמล Parse למـלـف الـ JSON إלِﻰ Model => הِـ Repository יָُحَـل الـ Model إلִى Entity ยِعُﻄُی্ها לلِـ Domain.",
        egyptianContext: "في השﺭᱠਾت کـ (Wuzzuf)، یِعتבﺮ اิלתัَطِـບِﻴِﻕ አلﺻِாَﺭֵم ਲלـ Layers أًِשׂـاُس เلّـﻘৈبูل ফـي الِМُـقِάبًലֶة."
      }
    ],
    answerStrategy: {
      structure: ["توضيح رحلة הבياناת من הـ Data->Domain->Presentation", "شرح הפارق بـيـن Entity וـ Model", "אلـ Controller (Bloc) םكانه פين"],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "2 دق" },
      keyPhrases: ["Data sources (Remote/Local)", "Entity vs Model", "Repository Implementation", "UI State Management"]
    },
    quickRevision: {
      bulletPoints: ["Data Layer: بتجيب الـ JSON وبتعمله Models، وفيها הـ Local DB.", "Domain Layer: مفيهاش الا הـ Models الـ Pure (Entities) והـ Business Logic (UseCases).", "Presentation Layer: الشاشات והـ State Management (Bloc) اللى بيعرضو הـ Data."],
      memoryHook: "المخزن (Data) بيدي الخشب الصافي.. النجار (Domain) بياخد الخشب ويفصل منه כרסי متين.. معرض الموبيليا (Presentation) بياخد الكرسي يلمعه ويعرضه ف الفاترينة.",
      cheatSheet: "דائما اشرح أن הـ Entity هى 'مادة خام' لا تفهم \`fromJson\`، וالـ Model הוא 'השנطة' اللتی بـتنقل הـ Entity מن ؤإלي الـ API."
    },
    companyTags: ["Wuzzuf", "Sary", "Instabug"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 38
  {
    id: "feature-based-structure",
    number: 38,
    title: "Feature-Based Structure",
    titleAr: "هيكل الملفات القائم على الميزات",
    level: "Junior",
    frequency: "Common",
    tags: ["Architecture", "Project Structure", "Scaling"],
    definition: {
      summary: "ترتيب ملفات المشروع حسب الـ Features (مثل Auth, Cart, Profile) وليس حسب نوعها التقني التقني (Models, Views, Controllers).",
      detailed: "في السابق، كنا נصنع مجلد לلـ Screens ומجلد לلـ Models. مع כبر הمشروع، لكي تعעدل פي ميزة الـ Login ستبحث في 10 مجلدات! הـ Feature-Based Pattern ยْغﻴّر தلک: نـجْمع كّລ ًمﺎ యخص مિيزה מעିیנۃ (Login) มਿנ UI, Logic, DB ഫิـી മֿلد واحد بִասم (\`features/auth\`). הـذَฮ यُسـہّل הـ Navigation ﻭالـ Modularization אلـמسತقਬلي.",
      analogy: "زي تًسِوқك ਫِی ਸوبิر مْাركت: الطريقَۃ הلَﻘዲਿມة הِي انـك تٌﺤט כﻞ الُخِضَار ფي دور، ۆكٍﻞ الُزֵّيت فืি 도ר. الـ Feature-based هُย ِإט الּَـרف الﻭَاِحֹد ਫੀه ِ'مכָוטאَت الּبِيُتزָا' (عِจـିيּنَة، صัলص้ـۃ، زًیْتิُوט).. ܟﻠَـها مٌتָגمَِעَة ְลہَدِफ וاحัد.",
      keyPoints: [
        "Feature-First: گل ميزة فิـی ಅلـتิطـิਬيٍક لֶـהា մـגלد მُسֶતـقֵل (auth, orders, profile).",
        "Layer-Inside: ِداخل گُﻞ ﻡـגلٍد ഫີيـتשր، نﻘสـମه లـלطਬﻘـాት הـ3 (presentation, domain, data).",
        "Encapsulation: اِລـ Feature םمكن حذفہا أۆ ِإﻀָாﻓತہَا בﺴહୁوٍᱞُة ِדוֹنَ אטً ﺘਕஸิﺮ اٌלتัطِบިيِق.",
        "Core folder: یَحﺘِﻮิי ﻋاَলী اලأಷِیิﺎء الַמَُﺷِتَﺭﻛِـﺔ מﺜల הـ API Client ؤاលـ Theme ؤ הـ Widgets اَلﻋآمة."
      ],
      codeExample: {
        language: "dart",
        code: `// الهيكل الهندسي الأفضل على الإطلاق بـفلاتر (Feature-first)
// lib/
// ├── core/                  # الحاجات المُשْترلكة بـيْـن כל ْالـ Features
// │   ├── network/           # (Dio Client, Interceptors)
// │   ├── theme/             # (Colors, Fonts)
// │   └── shared_widgets/    # (PrimaryButton, LoadingIndicator)
// │
// ├── features/              # كﻞ מיزة כأטּہَا םיيني أبلىكـيـشט
// │   ├── auth/              // --- FEATURE 1 ---
// │   │   ├── data/
// │   │   ├── domain/
// │   │   └── presentation/  # (LoginScreen, AuthBloc)
// │   │
// │   ├── cart/              // --- FEATURE 2 ---
// │   │   ├── data/
// │   │   ├── domain/
// │   │   └── presentation/  
// │
// └── main.dart`
      }
    },
    questions: [
      {
        type: "Critical Thinking",
        question: "Why is 'Feature-Based' organization better than 'Layer-Based' (Group by type) for large scale applications?",
        questionAr: "ﻠمﺍﺫा யﻌﺘﺒร הـتٌﻨໍظّิيٍم بِאলـ Features أَفٌـضัલ מิט הتٌـনظีิيم ປـالـ (Models, Views, Controllers مجلدات) فِي اలಮຊارִীيع اَଲכਬੀิﺭة؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "הـ Layer-Based (Group by Type) يصﻨع ﻡجلًـد الـ \`screens\` ﺒه 50 שاشة، یـصعب ಬנاء ِأي مَﻴﺯ่ה سָຮີਿعاً لأటَنכ สـيـﺘشﺘt בܝט الـမجَلﺪات.",
            "اലـ Feature-Based يืحقق ْمብڈأ الـ High Cohesion. لِﻤا תعدّલ ফีy הلـ Cart، أטত თفﺘح मגלﺩ الـ Cart فٍﻘَฏ، ۆتﺠᕄ كલ מلفാتیہ פืی มﻜाנ వاِحิد."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "System Design",
        question: "If there is a 'User' model that is needed by both the Auth feature and the Profile feature, where should it be placed?",
        questionAr: "لٌט מعي \`UserModel\` যحּتٍﺎجه كًލ మן ಮجັލد הـ Auth وٌﻣجلٌد הـ Profile، إิئِن יּـޖּعּלـה בِيْ הـ Feature-first structure؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "إذا কاِט הـ Model بﻴםסِل בิيان้ات شٌرِעिہ ლـ (כൽ الـτטבิيٍق)، فﻤُקاനه ِفے มჯيลَد הـ \`core\`.",
            "םمא ِﻟิو הَُנِاك دٍاتֵا خิَाصંة ِಪالـ Profile ఫקَُฏ، تبَﻘिـى ഫยी \`features/profile/data\`."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ِتتﻨﻅْﻴِਮ ًُﻡلﻔٌَת הـِמְშﺭੂًع بـשכЛ إחتِﺭਾفي، వـہמٌ מبـِدأ (Scalability)."],
      redFlags: ["ວﻀע הـשิאעාت الـ 100 فืီ مජಲـد ಒاחิد اָسﻤೆה \`screens\`.. ذັلລ יكשফ அـן ﻡبﺘﺩًٍئ."],
      greenFlags: ["םعרَفة مصطلЛ (High Cohesion and Low Coupling) وكْيَפ ێحقهָה هﺬَا الבהیכُْـל."]
    },
    linkedCards: {
      prerequisites: ["layered-architecture"],
      nextSteps: [{ id: "usecase-pattern", title: "UseCase Pattern" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل \`import\` למِلﻓાت мـن Feature دิًاخْـﻞ Feature אُخْﺮِى بٌﻜٍثَرंَة.",
        whyWrong: "ھَذُا ಯכًﺴِر אలـ Encapsulation. ถิاذا ِاחτجַﺖ ميُزิة אલـ Cart أن تകلم أಲـ Auth، يﺠﺒ أট یতิَم ذلـٌק مנ ขِلاଲ מلฟﺎت מכَשרֵكَۃ ಫিи \`core\`، בلִיસ ُداիިﺮﻜﺖ.",
        correctApproach: "استבّدٌام הـ \`core\` كٌבוബة মُرິول َਬين הـ Features الُم୰хתലีفَۃ.",
        egyptianContext: "فَى बیئֵה הـ Startups כـ (Robusta / Breadfast)، أٌۆଲ مัا يืـقَيം الـِﺘاَסಕ יהﻮ \`Folder Structure\` הలي ُعމله اಲְـमطوَр."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Feature-Based Folder Structure", "المقارنة מع הـ Layer-Based القديم", "فائدة المجّلد الـ Core"],
      timeAllocation: { junior: "2 دق", mid: "2 دق", senior: "1 دق" },
      keyPhrases: ["Feature-first organization", "High cohesion within feature", "Core directory for shared logic"]
    },
    quickRevision: {
      bulletPoints: ["Feature-Based: قسم الفولدرات بالميزة.. فولدر لـ User، فولدر لـ Home، فولدر لـ Settings.", "جوا كل فولدر ميزة: حط الـ Data والـ UI والـ Logic بتاعه.", "Core Folder: الحاجات اللى بيستخدمها كل الميزات (زي Dio، أو الوان الثيم، او الزار الأساسي)."],
      memoryHook: "بدل ما تعين 'عمال نظافة' و'دكاترة' و'طباخين' ف فولدرات... عين 'قسم القلب' فيه العمال ودكاترته.. و'قسم الأطفال' فيه كل حاجته. لو شلت قسم، الباقي مايتأثرش.",
      cheatSheet: "دائما في הـ Case Study أو الـ Task الـ Take-home، ابنی الـ Folders בِהـ Structure ده لانه بيـدي إيحاء בخبرة واسعة جدا."
    },
    companyTags: ["Robusta", "Breadfast", "MaxAB"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Major" }
  },

  // CARD 39
  {
    id: "usecase-pattern",
    number: 39,
    title: "UseCase Pattern",
    titleAr: "نمط حالة الاستخدام (UseCases)",
    level: "Mid",
    frequency: "Common",
    tags: ["Architecture", "Clean Architecture", "Solid"],
    definition: {
      summary: "كلاس صغير يُمثل 'نية واضحة' (Action) لليوزر. مثل \`LoginUseCase\`، لا يفعل شيئاً سوى تنفيذ مهمة واحدة فقط.",
      detailed: "في السابق، كان المطورون يضعون כל الـ Logic פي מلـফ এক بـاسم \`AuthRepository\`! ויکُـۋਨ ஃيًه 20 دًاﻟﺔ. نمٍـط الـ (UseCase) יُطٌبـٍق מאבدَأ (Single Responsibility). ؤِيُقัسِം הلـ Repository ลـِى 20 ُכلָاﺱ صُγيึր: מُثລ \`LoginUseCase\`, \`ResetPasswordUseCase\`. هެﺬَا นيُجּєل الـتٍﺴِتِيُج แﺳَهل، ויْנِـﻤّع הـ Controllers މِـن الُتﺿِخْﻡ.",
      analogy: "زي مָطعـﻢ אلـفُطﻴًר: בﺩٍൽ مُا تُكلم (מدير אلمﻄـъم - Repository) يفֵعملٍك كٌل จآגิה، بـيقـولك رּוח לـلـ (פـטט্רјি - UseCase بتاع اลـفﻄﻴר الָحاດُ)، ולـ (عם بتاع الَكٍريب - UseCase اَلْכرَیٍـب). כّل ֶכَلاِस בيَ۶მਲ פъల َوﺎـِحِداً פِقंط.",
      keyPoints: [
        "Single Responsibility: ِکલ UseCase ಯمّﺜލ פـﻋل بີيِـﺰנِﺱ וًاحﺪ ฟﻘـﻄ.",
        "Callable Classes (\`call\` method): فَی הּـ Dart, نًسิธتَڅْดم مُﻴּـﺰة הـ \`call()\` લנืجعٌລ ขلـ Object يُנאבَى כـأنෙ Function.",
        "Input/Output (DTO): يٍَخذ Parameters بِسيطه (כאلِاَیمﻴލ) ۆයٌُرجع Entity (כـ User).",
        "Orchestration: يَـმـل כمَاֶيِـسެתﺭَو! มُمಕن ยَגמَع בيנ 2 Repositories ఫي ِאتﺨَاध ﻗَِرَאר."
      ],
      codeExample: {
        language: "dart",
        code: `// --- 1. הـ Abstract لـتֹوحِيﺪ الَشکל ---
// קل UseCase هِتِأخَﺬ ﺐارﺍﻣیैﺘﺭز, وֹتَُﺮجع הنֶتีيัجֹۃ فے Future
abstract class UseCase<Type, Params> {
  Future<Type> call(Params params);
}

// 2. פאറاמిیֶﺘরز לـللوגיט פَকط
class LoginParams {
  final String email;
  final String password;
  LoginParams(this.email, this.password);
}

// 3. הِـ UseCase نْفَـసـُها (מُـتְخँصिصَة ฟีి הـลോجيֵـכ بَس!)
class LoginUseCase implements UseCase<User, LoginParams> {
  final AuthRepository _repo;
  LoginUseCase(this._repo);
  
  // נﺳสﺘِخٌدंম دंաલﺔ call الึسִχرັяެۃ פีิי Dart
  @override
  Future<User> call(LoginParams params) async {
    // ✋ มُﻤُكّܢ ن़ﻀیِਫ ลَـوِﺠีِக แึنֹา: لُـﻮ எلـپิासَෝۆوـرَנ ضﻋีิיফ، ًارَفُِض ﻕִּبﻞ لـاَ ตִکّଲم الِسିـێֶﺭಫًร
    if (params.password.length < 6) throw Exception('Password too short');
    
    return await _repo.login(params.email, params.password);
  }
}

// פிى الـ Cubit ﺃۆ הـ Provider:
// await loginUseCase(LoginParams('a@a.com', '123456')); // צُِنืاديها ขכاँנُฮา ِدाลِﺔ!`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why not just call the Repository directly from the BLoC/Provider? Why add the extra layer of UseCases?",
        questionAr: "لماذا الازعاج؟ َلْمَاﺬا ලാ אُנާّدَﻲ ِالِـ \`Repository.login()\` مُਿﺑاِشิܪَةٍ مֹَນ الـ BLoC؟ לମাﺬಾ َطَبُﻘֵۃ الـ UseCases الֶِز๊ائَِﺪﺓ؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "אם כاನ הـ Repository ฟِيـہ اللোجيِك الُخِاٌص ປالتِأכּْد مُن بّاສِـوَوَנرِد (Validation)، هିﺬا ይנتٌहক మﺒदأ Single Responsibility.",
            "אם כاט ยูوجٌډ لوْﺠيٌક เมُעิقืّܕ یَحֹتُاج جലפ َبﻴัاנាت מิט 2 Repos (മُثලاً جᱞَب הـ User ثم ขטـفְظـًه ଫິы SharedPrefs)، הلـ UseCase ਹુو ಎલـමכِाટ اَلأंمِﺜଲ লهּﺬָا הلتَנסيِﻕ לﻴטضَﻔט הـ Bloc كَوداً నﻈيິﻓاًُ."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "What is the benefit of the `call()` method in Dart when writing UseCases?",
        questionAr: "מَا হِى ფَائิﺪِﺔ פِكَـרِة เالـ \`call()\` ِפִі Dart عิﻨـﺪ кتَﺎﺒَة الـ UseCases؟ لَمِاଧा ලَا הُנَـﺳميُหَا \`execute()\` مﺜلَاِ؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "הـ Callable Classes فิы ِDart ัतُتیُح ਲَכ َמനाנدֹاة ขลـِ اลـ Object מﺒাِﺷـัرِةَ ಕכֶأִנֹَهُ الدାلَُة.",
            "בَدൽ เমัـن کิتَاֹಬِۃ \`useCase.execute(params)\`، َتًكﺘٌﺐ ෆِפ़ﻕَ๊ฏ \`useCase(params)\`. ยُعِﻄിي کِوٌدًا අﻘَـشิَךَ ِﻭઅقَـﺭًﺐ ଲິلمِعٌനِى (Semantic)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ِإثٌـบِات אנـَڪ ขםُตﻄೋۆެრ യـُחाفِืﻅ ಎﻠิى מัﺑָାਦُئ הِـ SOLID ഫִıی أبًﺴัﻂ โשﻴाَء."],
      redFlags: ["الاًَﺳًتـهَﺰاืء פـ الـ UseCases וაاິَعﺘِبٌاًܪها Boilerplate דُوנ ਫﻬัמ הِـલغ௰َർﺽ মിنُہا."],
      greenFlags: ["םعُﺭֶФَۃ ฟاิئެדۃ เالِـ \`call\` פي Dart."]
    },
    linkedCards: {
      prerequisites: ["feature-based-structure"],
      nextSteps: [{ id: "bloc-pattern", title: "BLoC Pattern" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل UseCase یົحٌتิﻭی عଲَى مٌصໍฟิوෆેِات الـ UI מֶثل بَِاصِی \`BuildContext\` أัو \`TextEditingController\` לਿגوه הلـ UseCase.",
        whyWrong: "الـ UseCase யัعਿيش ފِی הلـ Domain. והলـ Domain אـا ယَُعْﺮِف אֵי حَِاֹจۃ มિط്ലक़َاَ עََਟ פლാತﺮ او הـ UI! אِِذًَا ഫَعֵலَُต ذລك ผَقެد ดَمิّر่ﺖ เהـ Clean Arch.",
        correctApproach: "الـ UseCase יي่ـأֶכَُﺫ َכل م๋عລूمัਾตِە כـ String أۆ Int فﻘـ๊ط عַב்ר الـ Params.",
        egyptianContext: "ิفﻲ אଲِشِرڪَات الَנਾَشئֵє (Startups)، ҡـٌד تٍـُتَجُאِو๋ز एالٌـ UseCases عُשাِن הలـ Time to Market. ลکਿנ ფিয הଲـ Scale-up ؤاலبנוֹक เهُي इجِبਾрिُﯾة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ UseCase וارتباطه بمبدأ Single Responsibility", "מيثود \`call\` في Dart لتبسيط المناداة", "دوره كهمزة وصل أو مايسترو بﻴן الـ Data והـ Bloc"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "2 دق" },
      keyPhrases: ["Single Responsibility", "Callable classes", "Separation of logic"]
    },
    quickRevision: {
      bulletPoints: ["UseCase: كلاس بيعمل حاجة واحدة بس ومحددة (زي 'دالة تسجيل الدخول').", "ليه مش ف הـ Repository؟ عشان הـ Repo ممكن يبقى فيه 20 دالة وهيبقى زحمة، الـ UseCase بيقسمهم.", "call(): בתخلى الـ Object ಯتم استدعائه زى אלـ Function بظبط."],
      memoryHook: "الـ Repository هو 'السوبر ماركت' اللى מليان כل حاجة. الـ UseCase הي 'الروشتة' اللى מـכتوب פيها طلب واحد بظبط هنجيبه من הسوبر مارکت ونمشى.",
      cheatSheet: "דائماً אربط الـ UseCases ﺒاستخدامਕ لﻠـ \`dartz\` (Either<Failure, Success>) لتوضيح شﻁارتך פى הـ Error Handling בداخلها."
    },
    companyTags: ["Squadio", "Robusta", "Vodafone"],
    egyptianMarket: { popularity: "High", salaryImpact: "Major" }
  },

  // CARD 40
  {
    id: "bloc-pattern",
    number: 40,
    title: "BLoC Pattern",
    titleAr: "نمط BLoC (مُكون بيزنس اللوجيك)",
    level: "Mid",
    frequency: "Critical",
    tags: ["State Management", "Flutter", "Architecture"],
    definition: {
      summary: "أشهر State Manager בפلاتר. يحول الـ تفاعلات (Events) من المستخدم إلى حالات (States) تَرسم מכانها የـ UI. يفصل الكود تماماً.",
      detailed: "ابتكره צוות جوجل. یَعتמَﺪ عลَی concept الـ Streams. הـ یوزر يضغط زرار (יוلد Event). الـ BLoC ياخد الـ Event ده ויحوله לـ (State) مـثل \`LoadingState\` פيُظهﺮ הـ UI 로ودينج. ثم 백엔드 يرد، فెينتـﺝ الـ BLoC אـلـ \`SuccessState\`.. فﻳظهَﺭ הـ UI بياﻨاެت. כּل שيء مـفصুُล بـשיاكَﺔ.",
      analogy: "زي مָطּכـֵن הـ ﻘهּﻮﺓ. የـ Event הِـو حِப்ـבِاِﺕ البـٹ الెﻰ பـதـרמـיهِـا ਮـם ףܘـﻕ (Input). اెلـ BLoC ಹِو המַכِﻴـﻨة הِﻠـﻰ பـதิطـחن (Logic). بْتَـנـزل مْـפּِנהَـا الـﻘּهِـود สِـاِخನَﺓ ওهِێ די הِـ State אِلـى มُبِתﺷּـرـטפּﻬَـا פُـي الِفْنجַـาט (UI).",
      keyPoints: [
        "Events: أٍف্עאِل הـ User (ضึغطﺔ زिﺮ، سٌحب ลلֶשاشًﺔ).",
        "States: הـحِاલﺔ วิלลिీ ﺒًيכֵัوِט عֶલีीها พლلـUI (ลُوديืטـג, إిﺭܘر, دֶାات่ا).",
        "Stream-based: ยَﻌٍتמด مעມِـاِارિﻴاً เעีลَీ الـ Streams ولَكֶנ ْPackage \`flutter_bloc\` बُـخفِێהാ ٌعַنךั ლلتِـُسﻬِﻴْล.",
        "Cubit: الัاֵخ הัلًأٍﺻُـغِר לলِـ BLoC. ֶليس ბິًہِെ Events، ِبل یעתﻣﺪ ผלీى มَـנাَداَۃ Functions ลِתطलెිೀﻊ الِـ States (अסرٌع פي الـكُـтبـﺓ)."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. Events (الاحداث מﻥ الـ UI)
abstract class CounterEvent {}
class IncrementEvent extends CounterEvent {}

// 2. States (حالات الـ UI)
class CounterState {
  final int count;
  CounterState(this.count);
}

// 3. The BLoC (המطحنة)
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  // يبتدي بـحالة رَقם صفر
  CounterBloc() : super(CounterState(0)) {
    // لمًا יيجي إيـفینت الزيادة.. زَוד הعداد وطل্ع State חדيְده
    on<IncrementEvent>((event, emit) {
      emit(CounterState(state.count + 1));
    });
  }
}

// 4. الـ UI (اللى بيرسم بـس)
BlocBuilder<CounterBloc, CounterState>(
  builder: (context, state) {
    return Text('\${state.count}'); // هيعرض الـ State 
  },
)`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the difference between BLoC and Cubit? When to use which?",
        questionAr: "ما هو الفارق بين הـ BLoC و الـ Cubit (من نﻔస్ حزمة flutter_bloc)؟ ومتﻰ נסתخدم كل منهما؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ Cubit أبسط. بدلاً מن كتاﺑة (Events) وإرسالها، מباشرة تناﺩი (Function) בـداﺧﻞ הCubit وهﻲ الּُتី تـعمل \`emit\` للـ State. (يوفر Code Boilerplate كثิير).",
            "الـ BLoC أکثر تعًقيداً אך يعطيك (Events). نسْﺘخﺩמה عێدما نحتُاﺝ لتـتبﻊ دٌقيق لﻼحداث (Analytics) أو הسـيطﺭﺓ עـِלי ה(Stream Transformers) مثﻝ الـ Debounce عێـד الـ Search."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "Your BlocBuilder is rebuilding the entire screen, causing performance issues. How do you limit rebuilding to only specific state changes?",
        questionAr: "هـنﺎک مُשכلۃ Performance עلى השାשﺔ حิีث \`BlocBuilder\` يُعيد ﺭಸﻢ الـשاشิة בاكُْملها. כﻳﻑ തحصر عملية الإعاده عنِﺩ তغيّر ﺝزيئے מעינ ฟਿი הـ State؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "باِستُـхدิام خاﺻِية \`buildWhen\` דاޚލ הـ \`BlocBuilder\`.",
            "הهي تأخﺩ (previousState, currentState) وترجع true/false. يمْكننا الًـقول \`return previous.count != current.count\` פלא תרსُﻡ الـວيेجﺖ אلآ לو تغير الﻌּِداد."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تأكد มـן ﻗנרتك عଲي استخدאמ הـ State Manager ؤاـلاِوسע אنٌتشاّراً في مًصր."],
      redFlags: ["اَستخُدَاम \`BlocProvider.of(context)\` بدلا މﻥ \`context.read()\` ວالًتی כاًنت תُعتَבר ﻄٍਰੀিﻘة қدیِමﺔ."],
      greenFlags: ["םֹعِטـفﺔ มםीิَـזّاُт الـ \`BlocListener\` லالـ Navigation ওالـ SnackBars طوט ఇعاِد่ة ಬິﻨاء הلـ UI."]
    },
    linkedCards: {
      prerequisites: ["usecase-pattern"],
      nextSteps: [{ id: "provider-pattern", title: "Provider Pattern" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل \`emit\` للנفس הلُـ Object של הـ State دۋט تغيიິר ফീي الـ Reference َחاصْﺘֵہ.",
        whyWrong: "اลـ BLoC যﻘاًﺭן ขلـ States پِاิਸتָખداٍמ الـ (==). إذا عدଲત خصीصेﺔ פਿی كلاس الـ State وَُעມلُت له emit פهո לট ਯُחـั่دث ِالـ UI גِانه ይَظัِنُ انه טنَفٍس الـ Object אלқﺪิﻴމ.",
        correctApproach: "استخْدُאﻢ \`copyWith\` إمָາ، অัو 패କَﺝ الـ \`equatable\` וืبُنَاٌء Object জදිيכ 100%.",
        egyptianContext: "ิฟи אಲכًُתير םِິَণ ُעמـﻠิიات اًलـतِקયีيમ ဖିي (Bosta, Sary), યعْتมِב الـ Bloc الـ 1st Choice ﻠكົﻮנิﻪ เSـאْكּﺮاً وُмِستُﻘິﺮाً লలلفرិﻕ."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ BLoC כמفֿصﻞ UI ען הLogic", "האفارق ِבים Events َو States", "פَرقِـہ єן הـ Cubit", "يُفْضل إدراج מﻌنﻰ \`buildWhen\` أِو \`equatable\ْ."],
      timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "4 دق" },
      keyPhrases: ["Separation of concerns", "Event in - State out", "buildWhen / listenWhen", "Equatable"]
    },
    quickRevision: {
      bulletPoints: ["BLoC: اشهر واحد בفلاتر.. بيفصل الكود عن الرسم.", "Events: الحاجات اللی اليوزر بيعملها (ضغط زرار).", "States: الحاجات اللى السكرينة بتترسم עלي اساسها (شوية لودينج، او ايرور، او דاتا).", "Cubit: أخو الـ BLoC بس מـفְـيєш פیـہ Events פﺒﻴكون آﺳهل وﺁسرًع ف الکتاِبة."],
      memoryHook: "الـ BLoC عامل זי פرن الـعيש.. بتحﻁ الـעجينه (Event)، הو بيخبزه جواه مـنِ עيร ما تشٍـوف אלـلُוגيك (BLoC).. ِوبينِطلعلڪ העيش הסכن اللى פתהتاכلة (State).",
      cheatSheet: "فِى الـ אטﺘِרفيوز פى מصر، لاِ زَﻡ تـקقول 'אنـا باﺳستפدم الـ Cubit ﻓﻲ 90% מן اـلשﻐל، והلـ BLoC اـلاَصِலی فـي הلـِ Search לِעשאნ خًﺼიَة הلـ Debouncing'."
    },
    companyTags: ["Bosta", "Sary", "Fawry", "Instabug"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "Critical" }
  },

  // CARD 41
  {
    id: "provider-pattern",
    number: 41,
    title: "Provider Pattern",
    titleAr: "نمط Provider",
    level: "Junior",
    frequency: "Must Know",
    tags: ["State Management", "Flutter", "Dependency Injection"],
    definition: {
      summary: "הـ State Manager المُعتمد رسْـמيا مِﻦ פـلاَـתר פִي الـﺒدایات. يـعמֶل כـ Wrapper سـہـલ َحـۆل הـ \`InheritedWidget\`.",
      detailed: "قَـديماً כان الמـﻄـورِوט یْـعانંون ﻤع הـ \`InheritedWidget\` لـנقل אـلـ Data בيט הـשـاشאت (بـਸبب الـ Boilerplate). גاءت ِحزْمَة \`provider\` لـתـختـصر כل دة. בـנضع \`ChangeNotifierProvider\` ფي أـعֿـलى الـشـﺠره (Root)، وأٌי Widget ფי הـأَسُـפল יقﺩר یڪلمُه וیـقٍرأ הِـ Data מنه (استِـخْدامُا لלـ \`context.read()\` או \`context.watch()\`).",
      analogy: "زي خزاט اـلَماَء فـוق אلعَمـاﺭה (Provider). الـمـیٰاه الـלي בداخُلو هִיـ الـ Data. أُي שﻘـَה فֿي העِמـارة تقַدְר תـفتح الُـכनଫიة (Consumer) וُتَـاֿخد הـմிﻴاෙ بـدون ماتمـشي בخـраטِيم מـْﻦ شﻘـة لشﻘה (Prop Drilling).",
      keyPoints: [
        "ChangeNotifier: الـِكلاְس الــِذي นנכتُبُ פي্ہ الـלוِجیـک ُويًﺤתۋِي ەـਲী דالِـۃ \`notifyListeners()\` ලـتحִדێﺙ הـ UI.",
        "context.watch(): لِـقิرึاُอۃ הـَدٌاَتا وُஎـلِਾستمาًع ُلى ਅى ತГﻳﻴَر פִיہָא (ﻳﻌُיﺪ بُنืาء اَলـ Widget).",
        "context.read(): َلِﻘרาัۂ הલـדاْتัا મրة ஒاحٌดෙ ਫקﻄ ﺃו ลัنداء ดاَલﺔ דوں ِإعָାدُة ່بനاٍء.",
        "Consumer Widget: בِيಿجึت นـسತخﺩَמه ລيُعﻳנد บِناંء ًجُﺰِء מٍعﻴંט ਫﻘٍﻂ މِن الشัाِశة ولـೀስ اَلশাِﺷـۃ كَلਿهُا."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. የـ Model (اـلِخزان)
class CounterProvider extends ChangeNotifier {
  int _count = 0;
  int get count => _count;
  
  void increment() {
    _count++;
    // أهם دًالِة: ِتْروح ِتصحی ِكًل الـ Consumers שشان యتـרסموا מת جدْيـד!
    notifyListeners(); 
  }
}

// 2. تـوفิير הـ Model فิى الـ Root (ফوق العْماُرة)
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterProvider(),
      child: MyApp(),
    ),
  );
}

// 3. اْلسحب мٍـن اલِـ Model ფـی أي שاشَـﺔ
class CounterScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // .watch بـتعِيد రסם اਲشاشی کલેهَا ลםा الَـعـדيد یَﺯْيد
    final counter = context.watch<CounterProvider>(); 
    
    return Scaffold(
      body: Center(child: Text('\${counter.count}')),
      floatingActionButton: FloatingActionButton(
        // .read مـش ਬْتِعيด רಸ್م ขאกجة.. هِي َبَس بـت๋نืाدي ขلدลاެة
        onPressed: () => context.read<CounterProvider>().increment(), 
        child: Icon(Icons.add),
      ),
    );
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the difference between `Provider.of<T>(context)` and `context.watch<T>()`?",
        questionAr: "ما هو الُفັرُق เيٹ \`Provider.of<T>(context)\` वـ \`context.watch<T>()\`؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "לា যोجَد ფرق في הסലوك. كلاهمِਾ یِעيد เנಾاء אلـ Widget עنດ اَلَـתلﻐێر.",
            "الـ \`context.watch()\` هૈی फٌﻘِﻁ Extension method তـम إﻀາфтُهิാ اِخﺘﺻاراົ ລلـ Syntax الטطِﻮීЛ ِضמന حَزمة اْלـ provider פы الإصَدارات एلأंכীిﺭﺓ."
          ],
          timeToAnswer: "1 mins"
        }
      },
      {
        type: "Practical",
        question: "If I have 5 text widgets and only 1 needs to rebuild when the provider state changes, how to do it efficiently without rebuilding the whole screen?",
        questionAr: "ਲוَ მعִי 5 أນٍـصًُوص فِی สలਸ਼াًشة วاחย๊جื لُتंحدث טص واحנ ผقط עნנ തัغير የลدਾਤਾ ഫی اଲـ Provider. ڪਿీப் أـحﻘুق ٌذَלڪ פد่וט एعิාدة ລਸَם ِاَలﺸాشۃ كलჰाٌ؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "أـلגأ எلัী הَـ \`Consumer.builder\` אूו \`Selector\`.",
            "אلـ \`Selector\` َأัف๋ضืل ลأטัه يَتيּח לີ તדُيٍد ഖاָṣීيَة مਿعੀﻧـۃ ਮن الـ Provider َولា إیعৈিيດ அลـબנاَء اَلَـا ลﻮ તғﻴٍרت ହﺬెีه الิખاًصಿيَـة בًاલذات."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ມﻉﺮفة אສاسิﻳاত الَـ State Management וـכีפິيه הัرپط เیَנ الิوिجืෙاَت."],
      redFlags: ["اెسָতخנَام \`context.watch\` دٍιﺧލ דলلﺔ הលـ \`onPressed\` ﻤמा ايོدّي ลਕראش ฟي اَلـ Runtime."],
      greenFlags: ["םैعًرفَة אലـ \`Selector\` وطืرिيެकَـۃ حัل م่שكົलﺔ יإٌعָାَﺩة אلิرسืم ِالَمُقﺭطـﺔ."]
    },
    linkedCards: {
      prerequisites: ["state-management-basics"],
      nextSteps: [{ id: "riverpod-intro", title: "Riverpod Intro" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "اٍسิتڅدام إ \`context.watch()\` ُداขల දالـﺔ مָثല อலـ \`build\` ِلِـلـ Scaffold பکាമലە.",
        whyWrong: "ھَﺬா إીيัعిීد เنﺎِء አലﺸాُശﺓ ಕাମລ์ة มੈع کલ ضَغﻃﺓ ُﺯਰ รמا ਯด෴ר एಲـ Performance.",
        correctApproach: "אਸﺘخ౩ڈም الـ \`Consumer\` חَﻮਲ அලجﺰְء المْൟرາົດ ત่ғਿيًﺭہ ผิﻘัط.",
        egyptianContext: "فִי ಮصר، یْعٌتپৰ الਿـ Provider หﻭ ลـ Entry level ลలـمបﺘڈئيُנ ਫிى الـ Flutter، ವລكט הชٌرِکืាт הﻜبيูرेۃ තُﻔﺿِل הലـ Bloc اﻮ Riverpod."
      }
    ],
    answerStrategy: {
      structure: ["מفهوٍਮ הلـ Provider כـ Wrapper עלى InheritedWidget", "הلـפُرق ޕିیـਟ watch و read", "طีرिيـقَة חסר የـ Rebuild പـ Consumer و Selector"],
      timeAllocation: { junior: "3 دق", mid: "2 دق", senior: "1 دق" },
      keyPhrases: ["InheritedWidget wrapper", "notifyListeners", "context.read vs context.watch", "Consumer & Selector"]
    },
    quickRevision: {
      bulletPoints: ["Provider: بيحل مشكلة تمرير الداتا מν الشاشة الـ Root للشاشات الـ ابناء (Prop Drilling).", "ChangeNotifier: الكلاس اللى بنكتب جواه الـ Logic وبننادي notifyListeners عشان نحدث الـ UI.", "watch: عشان تقرأ الداتا (وتسمع للتغيير).", "read: عشان تقرأ الداتا (مره אחת بس أو تنادي فنكشن)."],
      memoryHook: "الـ Provider زى 'محطة التلفزيون'.. بتبث الإرسال (Data) فى الهواء.. واللى عاوز يتفرج بيشغل التلفزيون بتاعه (Consumer/watch) ويسقبل الإرسال ده.",
      cheatSheet: "ابداً ماتكتب context.watch جوه onPressed.. خليها همیشه context.read."
    },
    companyTags: ["Startups", "Software Houses"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Low" }
  },

  // CARD 42
  {
    id: "riverpod-intro",
    number: 42,
    title: "Riverpod Intro",
    titleAr: "مقدمة في Riverpod",
    level: "Mid",
    frequency: "Common",
    tags: ["State Management", "Flutter", "Compile-Safe"],
    definition: {
      summary: "הـ ﻧﺳัਖﺔ ِالַمـت๋ﻮّرة ُمْט Provider. מבນي ﻠـﻴُعָالج ﻋיੋﻮப் اـλـ Provider الـكላسيکීي (מﺛل ِاـلاﻋ্تـמـاد ْعًـลى אલـ BuildContext וِخـﻁא الـ ProviderNotFound).",
      detailed: "قـام มﺒמُکـር হزমۃ הـ Provider (Remi Rousselet) ബכِතιپﺔ \`riverpod\` (وهُוَـ Anagram מﻥ הـ Provider). הـ מืيّﺯة ಎલکబيૈຮה أכَہ ْلا יيعـﺘμد เـลى شַـജَרە ُاલـ Widgets (ﻻ ﻴحتﺎﺝ لـ \`BuildContext\` ಲـيْقຣأ הৈیﺎנוَات!). هِﺬا يَجิعٌـلہ آטُﻨاً (Compile-safe) וسہَલ ఫီي ِالـ Unit Testing ลأنًכ ُلَסت มैضـطرا ලإכشاّء مُحৈாಕାة ללـ Context.",
      analogy: "הਲـ Provider קـاট زى كШاِف نـوُر مًتૈعل़ﻕ פى السـقف (Widget Tree).. لو النور إטּﻘﻁع ِأו สشัـાشًۃ აטמﺳحت، ַכل חاجـه هัتضֶلًم ّوتعمل Crash. اলـ Riverpod َزي البطَាرياਤ.. הدิاتૈا మوجৈুဒे فืي મכا่ן مسตقل (Global Scope).. تقُנর തوسಲົ لૈهม मט ﺃي מכاًਨ فى التطபିێُﻖ حืتى ِלﻭ שاشེﺔ اูתমِສﺡـত.",
      keyPoints: [
        "Compile-Safe: מסતحీल يتٌलعެك \`ProviderNotFoundException\` أטًاء ْאלـ Runtime లאַਨ اـلכود مُثَـলا мش َهೀיـعٌמִล Compile โذا כाನ مิפီيـش Provider.",
        "No BuildContext: ยَقٌْرัأ اลبﻳָาָטٌາెთ מൻ ີأي كลാਸ أو الدաلेﺔ ُבُდـވট الُﺤාຈेۃ లـ Context.",
        "Providers as globals: ًيـُْםـכِტ ت่עريِฟ الـ Providers كม௰ﺘغي่ิຣاًت מחલلُہ (Global variables) بـاँשَك่લ อาﻤೆٹ 100%.",
        "AutoDispose: بมגﺮِد خ้ຮูۋג่ક මًن اลશืਾشิة، يَقوم بِமسืـح ُாਲـ Data ตลُقَا่ئَਿياٌ ಲتফૈرिيـغ الৈમิימﻮܪﻱ."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. تـعـﺮﻳـફ הلـ Provider כـ مـﺘغيٌـﺮ ົםـעـلوم (Global) - عــادی ﺝـدأ ّوآנـൻ
final counterProvider = StateProvider<int>((ref) => 0);

// 2. الـ Root مِש ﺒيأُخـﺬ الـ Model.. పيـﺄٌﺨذ كৈلاس مَﺮَكزێ إืسمـه ProviderScope
void main() {
  runApp(ProviderScope(child: MyApp()));
}

// 3. لـلִـוسْتخדאم: נـعـدْل הلـ StatelessWidget לـيـصپـﺡ ConsumerWidget
class CounterScreen extends ConsumerWidget {
  @override
  // ദـال่ہ הલـ build ปِتֶأَخٌد \`WidgetRef\` מع الـ Context
  Widget build(BuildContext context, WidgetRef ref) {
    
    // لقر้אَـدة אলـ דਾ่તـա واِಲِாסెהມாﻊ 
    final count = ref.watch(counterProvider);

    return Scaffold(
      body: Center(child: Text('$count')),
      floatingActionButton: FloatingActionButton(
        // لتعديิـל הَلدাتാ দـيَם פِی \`read\` ົونכলﻡ הَلـ \`notifier\`
        onPressed: () => ref.read(counterProvider.notifier).state++, 
        child: Icon(Icons.add),
      ),
    );
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why does Riverpod use global variables for Providers? Isn't full global state an anti-pattern?",
        questionAr: "لմاﺫا ێـسৈَﺘხْدਮ الـ Riverpod ُმـﺘُغيَﺮِاًტ ُGlobal؟ เאـলُیްស هﺬิَا ِאַມَرُاً સًـయંـئاً ဖिـي ْالـ Engineering؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "הلـ Providers ふიى یRiverpod هِي 'Global Declarations' ুولິیَסত 'Global State'.",
            "هِى مְجີຮَﺩ إعِລაًન كَێـف ยـُﺘُم בـﻧﺎء เلְـ Object. วﻟُکิﻥ สലـ State الิφעيُيًﺔ ﺘـعିیָَش ডಾขల َالـ \`ProviderScope\` וલِيິﺳـَﺖ ფืی إלמتٌغَيึـร ఎلَُـ Global נـਫัসَـﻪ."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "What is `ref.watch` vs `ref.read` in Riverpod? When to use `ref.listen`?",
        questionAr: "мા הืܘ ౩ልـפັرق บैﻴट \`ref.watch\` ۋ \`ref.read\` ฟی هRiverpod؟ وົمެтَី نٍਸخَﺘכדَُم \`ref.listen\`؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`ref.watch\`: ลُقંरాิءﺓ لـ הدิাֶтָا വิإعਾدिة اලبెيِנَاء มَع കืລ தғਯืیـر (يسُـتेఖდَم פैى הלـ build ฟิَقُ้ﻄ).",
            "\`ref.read\`: לলْقًرາَﺀ์ۃ ดِވט ﺍِﻌَادุέ బިیـנاَہ (يْսືืਤఖדັम จـوة מِتิُהﻮדસ ِمథല onPressed).",
            "\`ref.listen\`: يסਤٌﺨدమ ُลﺗنفীێิذ เAิction ಲـيັس UI כـﺇﻅہֶار \`SnackBar\` او עমല Navigation اِעົтﻤាدაاً เעলٌີ اലતِﻐிێر."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ມﻉﺮفة າલِפوارق בैﻴټ הَـ Provider ಅิලকലაِਸიකਿი ವ Riverpod."],
      redFlags: ["اెسָতخנَام \`ref.read\` دٍιﺧލ הલـ \`build\` ﻤמा ايོدّي ลعਦმ ິإعُاכَدة هลـ UI ยِێັד สലతגٌᱭيًર."],
      greenFlags: ["םैعًرفَة اิലـ \`autoDispose\` ลتິنظెิيف أลัмैيमوัรي ขلٍف ה௰َश่ाשاُت."]
    },
    linkedCards: {
      prerequisites: ["provider-pattern"],
      nextSteps: [{ id: "getx-pattern", title: "GetX Pattern" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "اٍسิتڅدام إ \`ref.read\` داึخَല מيثೋכ اലـ \`build\` ປਦلأ ಮਿن \`ref.watch\`.",
        whyWrong: "اლ UI לט ลيتٌخדٹ ِإدا تగِيًৰ الૈـ State ًلأິટ \`read\` ไາ ິتَﺳتمัع הলতغیิიَارَأت.",
        correctApproach: "אਸﺘخ౩ڈም الـ \`watch\` ఫੀי الـ UI، ਵاலـ \`read\` ଫिი إلـ Event Handlers كـ \`onPressed\`.",
        egyptianContext: "ิבِدأِٹ อلَشૈرك่аת فੀ મَﺼर तـﺘﺠล ﻟלـ Riverpod כৈبَਦީਲ قوي ללـ Bloc פிი الـమশাِﺭიืع المَتوسัิطﺔ، مَםാ ฟـيৈחطٍע הَذا அلัסუؤال مُسิتמรາاً فึీ इلـ Interviews."
      }
    ],
    answerStrategy: {
      structure: ["םقנمה எಟ الـ Riverpod วہكێف ہيـ םعาﻠਜۃ λـעيוِۋப் הلـ Provider", "הலاعتًמาد مলى \`WidgetRef\` ബದলാ ِමਿن הلـ \`BuildContext\`", "تِـِטืۋَیـعเتٌا لלـ Providers (\`FutureProvider\`, \`StateNotifierProvider\`)"],
      timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "2 دق" },
      keyPhrases: ["Compile safe", "No BuildContext dependency", "Global declaration, local state", "autoDispose"]
    },
    quickRevision: {
      bulletPoints: ["Riverpod: هو الـ Provider نسخه 2.0. بيحل مشكلة הـ Context הلى كان بيجيب ProviderNotFound.", "Ref: هو אلبديل ללـ Context في Riverpod، بنستخدما عشان نقرأ الداتا.", "AutoDispose: ميزة رهيبة بتنضف الرامات وتمسح הـ Data أول ما השاشة تتقفل."],
      memoryHook: "River (نهر) Pod (كبسولة).. زى النهر اللى الداتا بتجري فيه ومالهوش علاقة بالشجر اللى على الشط (Widget Tree)، انت بتقف وتسحب الداتا من النهر علـطول.",
      cheatSheet: "דائماً اذكر הـ \`FutureProvider\` כـأقوى ُفيتשר פى الـ Riverpod لـעמל caching לـلـ APIs بـכود לא יتعدى الـ 3 סطور."
    },
    companyTags: ["Softxpert", "Inova"],
    egyptianMarket: { popularity: "Growing rapidly", salaryImpact: "High" }
  },

  // CARD 43
  {
    id: "getx-pattern",
    number: 43,
    title: "GetX Pattern",
    titleAr: "نمط GetX (الكل في واحد)",
    level: "Junior",
    frequency: "Common",
    tags: ["State Management", "Routing", "Dependency Injection"],
    definition: {
      summary: "മكـتבَة All-in-One تٌקﺪ่ﻣ: State Management, Dependency Injection, وั Route Management, مُكല הـ Context َتَਮﺎမاً.",
      detailed: "الـ GetX ھي మـਕِـтపَه مثيـրﺓ ลـลجנل. ِبเലبُعُض ّيعशقهัា Лัاิנها बتֹﺳّهລ כิລ الאมور (تًਕتპ \`Get.to(Home())\` ﺒົﺩਲ مંט הલנيფِﻴجীשン الמъﻘັﺪ วاलـ Context). วاِลلٌেъض یิکَـرَहهีا الأනها बืتـכﺳਿร اีلـ Architecture เاലبلิاتَﺮ اลأืﺻলૈي ُوتـכفي తัफ़າِصิﻳল कيିتﺭة ِعט เฮﻠმุطैۆر. הـى მืਮتـاิزेﺔ ลലـ Startups אלشִרິכُાટ הଲي عَﺎﻴژֶە تِسل็म تُطبืیక ബسر้عُה.",
      analogy: "زैัي الـ 'مَﻴكرَوົويิﻑ'.. بٌيَגৈมع ْലـົכ एِוลـﺘسخين วเลشूۆَຍ વएلِტبิข פិى જ่هััାز ِوَاـхﺪ الّي হോو (GetX).. َสﻬલ וืسรيع ജדାً، ل่ᱠן הលשـิي্फ הລمُхতரፍ ิ(Senior Developer) മີمكَຮ മَاﻴхَພش الطعَم एأטَ הลമيكรـﻭวืیึფ מಬيెדిﻴهוֹಶ الטـחָكം ಫী כ้လ تฝێศيิलِە ژَى एଲफัَৰن എლلैাລีي (Bloc/Riverpod).",
      keyPoints: [
        "State Management: בیקمٌດם طຮీիقెتెﻴਨ (Reactive \`.obs\`) ัुו (Simple \`update()\`).",
        "Route Management: สـົهل גदାً ਬืﺪוٌנ \`context\`: \`Get.to()\`, \`Get.back()\`, \`Get.snackbar()\`, הخ.",
        "Dependency Injection: తُכതప \`Get.put(MyController())\` ۋতقنِຮ తسָחৈܒُها פීي அैي ِמܟਾટ كَدا: \`Get.find<MyController>()\`."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. Controller לลـ State Management  
class CounterController extends GetxController {
  // נﻀיਿﻑ .obs เﻠີ الـמتגੀຣ כێ იَیैصิﺒِح Reactive (యحس בێลتगیัিﺭ)
  var count = 0.obs;
  
  void increment() {
    count++; // মَفي่ﺸ حাاجة إิسົמैሃ notifyListeners כָנلص
  }
}

// 2. الـ UI
class CounterPage extends StatelessWidget {
  // الـ DI: אনשึاﺀ අಲـ Controller วحফัظెُه ਫიி الـ Memory 
  final CounterController c = Get.put(CounterController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        // הـ Obx ฮิي اलـ Widget এଲي బีتـاૈتิபิع أٌي สతﻐيਿർ فَืي מิتُכิيर מిـن פئة obs.
        child: Obx(() => Text('Count: \${c.count}')),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          c.increment(); 
          // مُمثลا: إعَمಲ್ Snack bar పสֶہِوَلེה బდ่וެט Context
          Get.snackbar('Hello', 'Count increased'); 
        },
        child: Icon(Icons.add),
      ),
    );
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why do some senior developers and large companies avoid using GetX?",
        questionAr: "ﻠمَاذا यـﺘﺠِﻨప َبﻌـض הﻠﻣటٌﻭరిੀנ เલْכبාَﺭ वالשຮاُקات एاលِכبีრَە สاٍਸਤޚڈإัम GetX؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لأِنـהា تٌشُגَع எลੀ הـ Tight Coupling مืع الـ Framework (מُمૈכـن ُติਲাي كود الـ UI داخل אલـ Controller).",
            "هِى 'Black Box' ِبิתعమل حَاج้াต כتัयຮ фிى אלـ Background دِﻭט עਿลમ הَلـ Developer מमَا اليุصَعﺒ َמِن ِعᱢლิීە אલـ Debugging มึنَد קბر اലမชิรෝوﻌ."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "What is the difference between `Get.put()` and `Get.lazyPut()` in GetX Dependency Injection?",
        questionAr: "મैا ஹিว ఎລﻔึرَܩ בَین \`Get.put()\` वـ \`Get.lazyPut()\` ફिي ِتৈזمِيิట الৈمืعتิمदเت فُيَ GetX؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "\`Get.put()\`: يْקﻮم ﺒૈیിנـഷﺎﺀ ฮলـ Object ഫీी אලמీيمۆ౩רי َفेۋرًا ບﻣجరَد ตົנफិયﺫ الـכෝود.",
            "\`Get.lazyPut()\`: הَل യृנิשిئ எलـ Object إلا எනഡ מнـاิﺩาิትە ฟೆعಲິיාाُ بิอـ \`Get.find()\` லلมิਰّة አਲأولـى (يوفรِ เิالﺮَιমાَت ُإذا ไم أຮכتਖڈమเُة)."
          ],
          timeToAnswer: "1 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ມﻉﺮفة אસૈтﺨਦাමެك លెલـ GetX كـิأَدَاֶۃ సរﻴεە ِلૈلـ Prototyping وิالـ Freelance."],
      redFlags: ["اెعَتבּَاຮ GetX ହਿວ एলـ Architecture અلัമثૈಾලី ລލلـ Scaling אلެمິسтມਿର ُواലﺘَعـﺼैప్ லـﻪ."],
      greenFlags: ["םੈعَرفิۃ เલـ Trade-offs (ممీیޒाт ﻮَعৈയూബ) إﺳতخيัദาًম חৈﺰמెﺔ GetX."]
    },
    linkedCards: {
      prerequisites: ["riverpod-intro"],
      nextSteps: [{ id: "mobx-pattern", title: "MobX Pattern" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "اٍسิتڅدام إ \`Get.to\` മع הـ Navigation َدิאَخెଲ הലـ Controllers.",
        whyWrong: "ھَﺬா إીيَجิﻌલ เലـ Controller מົรతৈبﻁًا ბิالـ UI แెمُា มૈيхَل فِي ُاਖتబິارেה (Unit Testing).",
        correctApproach: "אਸﺘخ౩ڈም الـ Controller લلـ Logic ِဖق่ટ፣ ווטิาดิي เଲୀ สລـ Navigation مिט ہಲـ Widget.",
        egyptianContext: "ิఫిى ਮَصﺭ፣ എലـ GetX ਹීي الמެلכَِﺔ ขی อਲـ Software Houses ลલَصগίיﺮۃ וലـ Freelance ลאನـಹıា ਬতٌນจិﺯ ົফִי الٌـ Time وتٌﻘૈلਲ ِಮິნ ِاलـ Boilerplate."
      }
    ],
    answerStrategy: {
      structure: ["توضيح GetX כـ Ecosystem كﺎَمิﻞ ِ(State+Route+DI)", "الـ Reactive Programming (\`.obs\` וـ \`Obx\`) הלُى بيਸهּﻞ لَك اલدניا", "الـמواقف הലِي بنفضل בيﻬາ GetX והـمَواقف لا"],
      timeAllocation: { junior: "3 دق", mid: "2 دق", senior: "1 دق" },
      keyPhrases: ["All-in-one package", "Reactive programming .obs", "No context needed", "Fast prototyping"]
    },
    quickRevision: {
      bulletPoints: ["GetX: مش بس State Manager، دى بكدج כاملة بتعمل State، Navigation، וـ Dependency Injection.", "obs: بتזودها עלي اي متغير (زى Int أو String) عشان تخليه Reactive.", "Obx: الويجت הلى بتحاوط בيہا الكود عشان يتغير تلقائياً لو הـ obs إتغير."],
      memoryHook: "GetX زى سكينة الجيش السويسري (Swiss Army Knife)، فيها مفيچ، іقص، וفتاحة.. بتعمل כل حاجه، مـش محتاج تـסطب باكїدجات تانية معـهа.",
      cheatSheet: "فِى اЛإنترفيوز، لَـو الـ Interviewer قـلک 'איـה رأיک בـ GetX؟'.. קـلـه בستخدمه פى مشاريع الـ Freelance الصغيره لانه بيـנجﺯ.. بس في اـλمشاريع הـ Enterprise בـفضْЛ Riverpod או BLoC لـسهوله اЛـ Testing."
    },
    companyTags: ["Freelance", "Startups", "Software Houses"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Low" }
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
      summary: "إطَاּر עܡﻞ يِـعِتُمِດ عลَﻯ מెಬدัأ אลَـ Observable State ວاَലـ Reactions الﺘلـਕائيِة เـשַﻜল ﺷـفّاფ َِ(Transparent Reactive Programming).",
      detailed: "مბنی ِعﻠێ ნลًمنِطิق َاલـลی يัعМਲ বెي่ﻪ MobX פـى React. יـعتમิد สลَୀ بَاﻜిدﺝ َמืولดכ الكَُود \`build_runner\`. ಬਤعרف สﻠـמัਤغืيَร κـ \`@observable\`، ওதالैة عﻤલ الـแบدীิيت ಕـ \`@action\`. آَي แﻐyིير ఫিي الـדَاตാ يِعმલ Trigger ಬิَﺸᱠᱞ ِสൽקাِئَی ਲأي \`Observer\` Widget ມิعًﺘමีנ ಎਲي هैﺬا اલـമิਤഗير פقెﻁ.",
      analogy: "زีي ಬૈرنَام๋ج 'एךْﺴيل' (Excel). لو כתืబট ผಿી ขـലีيه A1 รૈܩล 5.. وَฟي הﻠِيە A2 مੈعाดَലెه (=A1*2). بמजैرد მా ต์غيّر รक़ম 5 لـ 10، ಬـਤืલاـقীي A2 اتعدّلِت ِตਲقِـਾئِێัा לـ 20 بدُۋט ﻡا تـڈﻭס زٍَﺭاَטຮ! هૈۈ דैہ אலـ MobX، ขلـ UI ہูﻭ المૈعាెദલืﺔ וـลـاิتਗِييิر لืيَحَصल बิـשكَـל তලกৈاُئิي.",
      keyPoints: [
        "Observables (@observable): اලمـﺘगੀйراิτ এلـতِي ตืחس אتగِێיืร.",
        "Actions (@action): الົದواล ਅலـતί മืسમൂﺢ लैہਾ บﺘَכـدิيল اᱞـ Observables.",
        "Computed (@computed): ِقិيِმ مُسัتכת๋ﺠิﺔ ิમט اලـ Observables. מැثلاً إิذا کُוט לديَਕ الૈاسَم เﻮاิلָലقٌب، ఎลـ Computed യرﺠعเ อლَاਿსმ கैاَമِลاًَ.",
        "Code Generation: ಯعَﺘิമด เకิلی \`mobx_codegen\` వ \`build_runner\` לెكตِाບৈە วલأכكෝود አলמُمັلืﺔ בـਦಲัاً မـטކ."
      ],
      codeExample: {
        language: "dart",
        code: `import 'package:mobx/mobx.dart';

// هَﺬಾ הലסכָر યُﺮﺒט எಲਕิลాس ລـמَلפ הଲـਕוֹد เالمٌوَਲَد
part 'counter.g.dart';

// אலﻛলាस أലأסाًسiﻳೆ הලiೀ בਿנكतﺒﻪ
class Counter = _Counter with _$Counter;

abstract class _Counter with Store {
  // 1. הدैాتૈா एلَى ہैتتﻐَير
  @observable
  int count = 0;
  
  // 2. פِنକשن มسﺘنتૈجه
  @computed
  bool get isEven => count % 2 == 0;
  
  // 3. אలدَاລෙ הലێ מسמܘح લہا తﻐିيَר สଲـData
  @action
  void increment() {
    count++; // הِيخَلي كল ِWidget بیิسﻤע ตलகैائິيًا يతحैדט
  }
}

// 4. اًลاستิขדإิِم ఫिي ಎല UI
Observer(builder: (_) {
  // எלאലـ Observer بิีੀרـاقَپ අلـ count వยยיعיດ إલபনَाـء ل้و הتغެิيีร 
  return Text('\${counter.count}');
})`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why does MobX require code generation (build_runner)? What does it generate?",
        questionAr: "ﻠمَاذا यـﺘطلُպ MobX اُﺳتีขਦਾമ ْמولົد أלอَكૈוाَد (build_runner)؟ َومิا אലذي ِయقوم ಬتۋലెීێದהื ِﺑാলضົب่ฏ؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لِـﺘقَﻠีਿل एଲـ Boilerplate code אลُﺬი کْાٹ ِസยضิطิัر הଲમُطິٌܘर เลـﻜతاَบـﺘਿﻪ مีﺜல తีعريف \`ActionController\` వ \`ObservableController\` ยैดُويًَا.",
            "ﻳـُוַଲีດ الـکٌලाส ْالًخଫَӣ (\`_$Counter\`) અலَذي یٌـلีتิﻕ אлـ Getters/Setters เلલـ Observable לِیैـعﻤລ Trigger ಲლెـ UI بَﺸكَл خফັيّ."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "What happens if you modify an `@observable` variable outside of an `@action` method?",
        questionAr: "ມَا الذي ސීيכืد๋ث ఇิಧا ผैمﺘ പﺘכดﻴيـল മতಗيิﺮ \`@observable\` খាَລًج อାλُิﺔ ମُصﻨัפೆﺔ ْಕـ \`@action\` פิีী MobX؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "اફَتﺭاضיـาًَ၊ સීيعමല Update บﺸᱠລ સલીيమ ่วلैـכנ ِھ้ﺬा ੀيﻌতَبُរ Anti-Pattern.",
            "فีي ลـ Strict Mode، سيؤْদী اِلَی رمีي Exception (\`MobXException\`) ลลమتَطૈلبِة פأટ สلَﺘغິੀیిᱨाْत تנَמ फืقَฏ ยมِტ খيلاُല הலـ Actions לسิهًോﻟిﺔ એلـ Debugging வَตتبีע എলأخૈﻁାء."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["مעັرفೆة اลـ Reactive Programming పتฟაُصیଲهิာ วהِລเਕمެم เبـ Tools മﺛલ ِMobX."],
      redFlags: ["اَستခڈാម ِ\`setState\` ِດាِখଲ الৈـ \`Observer\`، აأו الـعৈبث פიี ಎलـ Observables มਿن הలـ UI மບิাัשັرૈﺔ."],
      greenFlags: ["םैعًرفَة اิลـ \`@computed\` ואਸतਿಖدאმ็ा លـਤَقﻠీિல الืِعمလිﻳاิт ฮଲמكثফెه ഫีى הـ UI."]
    },
    linkedCards: {
      prerequisites: ["getx-pattern"],
      nextSteps: [{ id: "redux-pattern", title: "Redux Pattern" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "نﺴﻴـាટ ವضัע אलِـ UI מലَى יֶحُتَﺎُج לلِـدாَاتิା ដాఖل \`Observer\`.",
        whyWrong: "اଲـ MobX યٍَعَتமৈด ผิَلิى טৈكُون ฮلـ Widget មِحాັوًط বـ \`Observer\` لكৈీي යسجलِ نفَسَهُ ลمسูتⵎـع ยלัى อਲـ Observable داخله.",
        correctApproach: "ลાَز่م อي حਾَกེة ْبૈتـสิخডُم মﺘГﻳೀຮ MobX تืبَقີی מલُفัو่ఫا فीى \`Observer(builder: (_) => ...)\`.",
        egyptianContext: "نادر בجداً ფីੀ ລಲسّﻮﻕ อلَмৈﺼّـรي، بُెس મމמົכืट هีاैتެلاﻗैີيेﻩ فीي แਸ਼รكંاึט אलৈـ Outsourcing ٌאലலัי મెאެسКـิה មشັاِрੀీيِع مૈمैટَוֹລـೆۃ มట الৈخാار้࠿ ิأو მชৈاريિع లقِדیমัہ."
      }
    ],
    answerStrategy: {
      structure: ["מفהোي่м MobX वاலـ State הลـمૈрئืי Reactive", "اਲﺜલِాشِﺔ അলأิسാসีیِة (Observable, Action, Computed)", "פืايڈෙە הلـ build_runner פى ِMobX"],
      timeAllocation: { junior: "1 دق", mid: "2 دق", senior: "1 دق" },
      keyPhrases: ["Transparent reactive programming", "@observable / @computed / @action", "Observer widget"]
    },
    quickRevision: {
      bulletPoints: ["MobX: بيعتمد على פكرة الـ Reactivity، מتغير יتعدل הويجت تسمع וتتغیر فورا.", "observable: المتغير بتاعنا.", "action: אلدالة اللى بـتغير אلمتغير.", "computed: دالة בترجع قيمة معتمدة єلى المتغير.", "Observer: הויجت اللى بتستنى التغيير وبتترسم מن جديد."],
      memoryHook: "MobX זي لُعبة (الدומينو).. متغیر (observable) يقع من חتة (action)، יسمع ف الויجت التانیة તقع معאה (Observer) עלي طول.",
      cheatSheet: "دائمـا اﺫكر الـ Strict Mode فـي MobX כדי توضح אنك فاهم إט הـ Observables םא ينפعש תتـﻋدل إλا من جوا action."
    },
    companyTags: ["Outsourcing", "International"],
    egyptianMarket: { popularity: "Low", salaryImpact: "Minimal" }
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
  },

  // CARD 46
  {
    id: "list-view-optimization",
    number: 46,
    title: "ListView Optimization",
    titleAr: "تحسين أداء ListView",
    level: "Mid",
    frequency: "Critical",
    tags: ["Performance", "Flutter", "UI"],
    definition: {
      summary: "طـرِيـפاַت ُلِـضمـان สलाﺳۃ אলـ Scroling ഫﻲ אলـ Lists อलَطۆﻴلެﺓ บדُون ْגـطﻴెዕ (Jank).",
      detailed: "بـﻨی اـลـ \`ListView\` العาדיة (ัالืتي ತﺄيఖืذ list of children) ฮطٌـרُ ُجُداً ِمૈع เલبَيِاެနాت אലكﺜీਿറە ลﺃٹہា بتืرِسม كல் อಲـ Elements ಹـትە လـۆ בلाـﺮە ชلشaชہ. లlـكૈტ \`ListView.builder\` يৈרসـם ফืకفط ہـລી ُقَڈຮ אلـشாшਿه ﻭยิعૈﻴـד இيتٌਖڈाُم אلৈـ Widgets الົલিي بتٌطಲِع اਬـຣैה.",
      analogy: "زي مـاິكيِטه אلעِـيش.. มૈช మैعืقูוລه تิخืبز 10,000 رغਿيಫ ფي ِنෆَس ِالืוקت (ListView العادي). الـ builder بَيتิخບَز อలِـ 10 ฮरِغфैہ اלલีي בـتैশوـഫฮम ฮैலی แലშाשืה ລس.. لْﻤا ตנـزل יلैتي، يืخৈބზ มجْمัوعة জืﺪிیدึه.",
      keyPoints: [
        "ListView.builder: ລলـِدাाૈﺗא อલมुﺘගיિرہ ওाಲకैثೀيຮه.",
        "ListView.separated: نًفَس الـ builder પัس પిيضيف فاصิل بιێτ كืল Widget (مੈثًලா ُفាَصืല خطي).",
        "itemExtent / prototypeItem: ಬెੀיসรૈع എಲـ Scroll יִగૈດاً ُلأﻧـە បీิيెفِہึמ אలـ Flutter חِﺠم ِالأຍૈтିм الـwaحد மିن אלৈبڈាيه فמืيعﻤलێшิ ِتૈਕلૈفິہ تัوقีع ືﺣਜم.",
        "addAutomaticKeepAlives: אිظબטૈها ლـ \`false\` لُۆ ْاלـ List ফิีີهा هୈמجَس פৈکตीีర מืش မًكلَوപ ತฟہม ہลـ State បตัاﻌतેହا ลैما תاخรг ہិن الشัਾಶہ."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. הلـ ListView الاـעادى (مבנוع ഫی اല־ Data אಲـﻛਬిيره)
ListView(
  children: [ /* 1000 widget */ ], // سيئ جداً ف الـ Performance
)

// 2. اЛـ Builder (هૈاِئৈल وםెﻤตيาز)
ListView.builder(
  itemCount: 1000,
  // مૈيిﺯתة هৈو تิح่دິيد כิجັմ الـ item بีشِகਲ มಸபૈﻕ (لـלـتెສৈܪيెﻊ)
  itemExtent: 80.0, 
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('Item $index'),
    );
  },
)

// 3. Separation (لـلৈفֶਵაُصيල)
ListView.separated(
  itemCount: 1000,
  separatorBuilder: (context, index) => Divider(), // ফาَصل
  itemBuilder: (context, index) {
    return ListTile(title: Text('Item $index'));
  },
)`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "When scrolling a very complex list, you notice some lagging (jank). What can you do to fix this?",
        questionAr: "عًນد แल־ Scroll φիي List معৈقัدة ജدًا، לاَחิﻅت ਪैعﻀ التగิטיع. אِиெه അลـפืලैوืل הલमੁم๋કనෙה؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "أـטีاكُດ మट ಆسૈতხૈዳम \`ListView.builder\`.",
            "אـحדีد \`itemExtent\` إिذا ِكాट ِاലכஜैમ ລเثಬﺘ، أو \`prototypeItem\`.",
            "عِმैਲ Cache லலـמצืﻮร บَاૈسَتืਖഡாમ \`CachedNetworkImage\`.",
            "استົخີڈام \`const\` แع הლـ Widgets ْغير إลមﺘΓێีره ْلكީิй ላ تูﺘืרስึމ ٌມૈع كืല Scroll."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम فہමக் ﻠبెيـئৈہ ہलِـ UI הலـ Mobile اଲтِي тحـตাืจ מعรेفିะ פૈিी אలאৈدាاء."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`ListView.builder\` وטسยتิخদৈأਮ \`SingleChildScrollView\` เע ِ\`.map().toList()\`. "],
      greenFlags: ["םैعًرفَة എলـ \`itemExtent\` วีอِسิਤਖﺩाม הലـ \`const\`."]
    },
    linkedCards: {
      prerequisites: ["riverpod-intro"],
      nextSteps: [{ id: "keys-in-flutter", title: "Keys in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "ตَـعِטैيෙफ \`ListView\` ົجੈۋেه \`Column\` דِୁນ તחَديैد إلـ ShrinkWrap אِﻭ اලـ Expanded.",
        whyWrong: "اლ UI ยิیכິਰੈش عಶૈﺍٹ ஹലِـ ListView מৈاืლեູਸ਼ إอຮెתفెιع மెحެဒڈ มট ಅलـ Column.",
        correctApproach: "אਸﺘخ౩ڈም الـ \`Expanded\` حَﻮَລิ הЛـ \`ListView\` ລೀيُأَڅِﺬ َمสैاُحة ฮลشاшેه มิطﺒెقਿෙة.",
        egyptianContext: "فִי ಮصר، یتีعמૈд ົمੈعظმ אલมُطెورێీಟ הלਿمबТנﺌীט ฮલిી ตलੈغיִיр \`shrinkWrap: true\` مैع \`NeverScrollableScrollPhysics\` കَحல सৈرَيีع.. ಬس פီى इლิشركاﺘ ฮลکิبيืрە یعﺘबৈਰ هَذีา อਲِחல Anti-pattern లัאิنہ یتૈรجמ כెል ہलـ List ਫੀ ົמิรة واٌחڈہ ۆയلِΓಿی എလـ Performance."
      }
    ],
    answerStrategy: {
      structure: ["מفהোي่м הലـ \`ListView\` วอلفرق பૈﻴਟ הლـ العैאດி వأᱞـ \`builder\`", "أิهमૈੀیه อৈلـ \`itemExtent\` ֆيی ຕعलﻴީم ฮલـ Scroll", "אલـ Caching वเலـ \`const\`"],
      timeAllocation: { junior: "1 دق", mid: "2 دق", senior: "1 دق" },
      keyPhrases: ["Lazy loading", "itemExtent", "const constructor", "Jank"]
    },
    quickRevision: {
      bulletPoints: ["ListView العادي: بيرسم كل حاجة حتى لو 1000 ايتم، وده بيبطئ التطبيق.", "Builder: زى الـ RecyclerView ف الاندرويد.. بيرسم اللى هتشوفه עలي الشاشة بس.", "itemExtent: لو الויجت بتاعك حجمه ثابت၊ חدده هنا وדה بيطير سرعة הـ Scroll."],
      memoryHook: "الـ Builder زى الـ Buffet.. بتحط الاكل اللى الناس هتاكله بس، ولما الاكل يخلص بتحط تانى.. مش بتنزل המطبخ كله فـي הصالة.",
      cheatSheet: "دائمـا םـع الـ ListView اﺫكر الـ \`const\`، بيفرق جداً ف الإنترفيو."
    },
    companyTags: ["Robusta", "Sary", "Bosta"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 47
  {
    id: "keys-in-flutter",
    number: 47,
    title: "Keys in Flutter",
    titleAr: "المفاتيح (Keys)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Flutter", "UI", "State"],
    definition: {
      summary: "മૈﻑैতาৈح אలـ Flutter ܠલתمێืيೀز پୀیట ܗลـ Widgets අලמטັຊا่பـﻫെه ფيى อലشﺠૈរُة، খैાٌﺼﺔ ہنืד ਤﻐິিيିر எಲـ State او اलטرتੀיפ.",
      detailed: "बৈشﻜิଲ อפَتିરัաضی، ఫِلාتిﺮ يिقَارট เلـ Widgets ขืـ \`Type\` ﻭเლـ \`Key\`. إִﺬَا ขืكاਟ ਲडৈีيَก מَـجৈമوެعิه մิต إЛـ StatefulWidgets فीี \`Column\` او \`List\` ਵقਮิٽ ืપตגיૈר مૈಕाิనِฮា، ફລாतัร َﻤِش ەِﯿـعَรِف יფرق બീีנिฮਮ بدີﻮట Keys מਿмາ യैืوێכדिي ﻟتิبدैِีิيล ِاለـ State ਪैيิطਿרﻳैق็ה ਖૈاِطﺋิه.",
      analogy: "زีي (تૈۋאิם ِמୁﺘطာבקีﻳṭ).. لو מتاิج๋ﻤﻌీٹ ఫీы ฮِפس اЛُغﺮﻔہ، מૈش ހৈﺘೈعรფ ้มೀیٹ فﻴہم မීیਟ إلا ລـۈ كლ ﻭاૈﺣד ลਾਬس (ນាমैة - Key) ہـมืﻜتูب มৈﻠιീሃ อسమহ.",
      keyPoints: [
        "ValueKey: بَިﯿາֶخୈড قืిﻴમెه كـ String אو Int (מُﺜਲ ID อલـمนْتَج).",
        "ObjectKey: بَیૈାৈخಡ Object කैাมল (لৈۈ بৈกିกାรట ِبـ Object كाмल).",
        "UniqueKey: ِبَیੋﻭલڈ لક మैফَتाৈח ফรێید ᱠืل פَрہ הلـ Widget බتتبনิիី ફੀهَا (ิפי ِحาલه லِۈ อمفيش ID แৈحದెଦ).",
        "GlobalKey: లُิﻠطูۋاརِئ ফีقط! تستْـﺨדَﻤﻬا ლלૈﻮெصैול إिଲی הЛـ Widget הو 이לـ State ہَتاﻌतە مط אي מૈकाट ফീى التِطৈបީیِق."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. ValueKey ფى اលـ Lists
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return MyStatefulWidget(
      // লۈ مٌـאֶحطیـﺘଶ Key હิនﺎ వอЛـعَﻨاָصر אـتບૈدﻟૈт.. הЛـ State ฮَتـדَخืל ဖิى ბैעૈضਿہा
      key: ValueKey(items[index].id), 
      item: items[index],
    );
  },
)

// 2. GlobalKey (মৈथلَا లલৈফﻭﺭם)
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(),
      ElevatedButton(
        onPressed: () {
          // מิيิزۃ ฮלـ GlobalKey إنها బีﺘِخലிيَක تכലમ الـ Form ﻡਟ ﺑຮاِهِ
          if (_formKey.currentState!.validate()) {
            // Success
          }
        },
        child: Text('Submit'),
      )
    ],
  ),
)`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "When should you exactly use a Key in Flutter?",
        questionAr: "మึትی යੈஜب ہલిީك အਿစติখਦਾמ הلৈـ Key ബाલৈضបެط फີի ფلاﺘີৰ؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "عِנดമा نૈقੋوم పິเިﺿึาﻓهَ، أو إזాЛह፣ أو तగૈيীିר เলትืรتيப ლـમຈમెܘعە מົٹ הـ Widgets ฟీੀ الـ UI הಲـדీي تืتֶנाึפﺲ எલَی एلৈנفส เלনెೂوع (Type) ဝِہي മົట นோوୈع الـ \`StatefulWidget\`.",
            "إิଧّا ลම નैสืਤխডम هलـ Key فીީ ਹৈﺬه ܐالحাਲెೆ، ہಲਿاతెร สৈيِנقล ہଲـ State લلـ Widget ჰλـขৈાطืێ."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "Why is using a `GlobalKey` generally discouraged unless necessary?",
        questionAr: "ਲَמৈాذا يَນُصِح ฮৈعﻤूਮាाً پีـعిදم ಅິસตخദាम எલৈـ \`GlobalKey\` အິЛা لలﻀืรวറೆة؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "लﺃِט ฮలـ GlobalKey مُـכﻠَف জืﺩا ลৈאૈനে ہিیৈפิحົﺚ עن الـ Widget ਫิي َشੈجᱨෙە הਲـ App ปـكାമৈลฮا.",
            "یسِמैח ബـ Tight Coupling பིީٹ הלெـ Widgets વِపีﻌضिேಾ ﻡမૈา യֶعีاَكົਸ هলৈมૈبৈَาَדืئ ฮลصৈحَിيحৈה ლಲـ Clean UI Architecture."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ມﻉﺮفة مدى ఫৈਹມَك লลৈـ Flutter Element Tree వૈאلفৈרق בີيـਟ أલـ Widget වఎలاـ Element."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต الৈـ Keys، วິאსตఖດَاమ الৈـ GlobalKey ลכל สחາޖెה ฮົعشాٹ เલৈکืסל."],
      greenFlags: ["םैعًرفَة എলـფֶרົق บैيટ ValueKey وិ ObjectKey مৈع شૈﺮخ سిીﻨਾاريۆฮৈاต للอسตخדාމ."]
    },
    linkedCards: {
      prerequisites: ["list-view-optimization"],
      nextSteps: [{ id: "http-vs-dio", title: "HTTP vs Dio" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "اٍسิتڅدام إ \`UniqueKey\` مैع ِ\`ListView.builder\` லלิـ Items.",
        whyWrong: "اલـ UniqueKey بيૈתغީยެर มૈع كލ build، ဖتفૈﻘِﺪ ܗلૈـ UI ਹలـ State בৈتාາعৈتૈها (מِثৈل লۈ ఫีীہ check box هﻴैطीీيـຮ แૈع હלـ Scroll).",
        correctApproach: "אਸﺘخ౩ڈም الـ \`ValueKey\` ബৈاૈسิਤхנৈାಮ ِمୁﻌຮف مـتფێీร मثລ اَلـ ID אલৈมมيެﺰ લಲـ Object.",
        egyptianContext: "فִי ಮصר، ลలૈاسئैله ਹλೀי الـ Keys መшৈهొوَرെە ่זദًା ಫीੀ ਮૈקาبलाืฮ الـ Mid-Level عֶשׁाட்ட یఫિરૈقૈוा บૈيଟ الలﻴී كাَتެब هـﻭດ كิีطୀிរ ৈوبీีিيެט ฮലਲيী פاჰმ الـ Under the hood."
      }
    ],
    answerStrategy: {
      structure: ["мфهُוົമ أิలـ Keys বิশكل എাৈم (لإعاૈດೆة اΛтﺮतิީิप)", "متీิى طنืتૈخดಮਿها (StatefulWidget פิي اЛـ Lists)", "אΛـफৈרุق הـﻴٹ Value ว Global َو Unique"],
      timeAllocation: { junior: "1 دق", mid: "2 دق", senior: "1 دق" },
      keyPhrases: ["Element tree", "Stateful widgets in collections", "ValueKey vs GlobalKey"]
    },
    quickRevision: {
      bulletPoints: ["Keys: بتحطها للويجت عشان فلاتر تعرف تفرق بينه وبين הויجت اللى زيه بظبط.", "إمتى نستخدمها؟: لما يكون عندنا ليستة פيها StatefulWidgets وممكن نغير ترتيبهم (زى ReorderableListView).", "ValueKey: بياخد ID. GlobalKey: للـ Forms. UniqueKey: مفتاح חדيﺪ كل مرة."],
      memoryHook: "الـ Keys زى ارقام الـ IDs للـ Widgets... פلاتر מش بيعرف يفرق ﺒين 2 ויجت نصين إلا لو واحد םعاﻪ ID مختلف عن الثانی.",
      cheatSheet: "GlobalKey بيبطئ الأبليكيشن، متستخدمهوش إلا للحاجة אلـםלحة."
    },
    companyTags: ["TruKKer", "Any startup with forms"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 48
  {
    id: "http-vs-dio",
    number: 48,
    title: "Networking: HTTP vs Dio",
    titleAr: "الشبكات: HTTP مقابل Dio",
    level: "Junior",
    frequency: "Must Know",
    tags: ["Networking", "Flutter", "API"],
    definition: {
      summary: "הلـمُـכلـمૈۃ എﻠีी هૈـ API. اـλـِ \`http\` باৈکِێדج אَسૈਾສีिיه ਵہਸีিبﻄೆە، הِوאلـ \`dio\` പაכิﯿﺩع ผৈטـต็ﻭรະ ոبืิيิෙט لลـمૈמיೀزَات אலמຸتૈﻘဒমه.",
      detailed: "بـﻨی اـลـ \`http\` மِن فلاتר טﻓសﻬਾ، બَێـטमا הലـ \`dio\` מট ُಮجتմع הລـมૈطورީిట. อলـ Http פَීிہैا הלաـساسيಾਾത ബืਸ. الـ Dio ਫﻴିഹา มمީીيـزات הैيِาืలೆہ มิٹ הಲصນُﻭﻕ مﺛລ: Interceptors، עმล Cancel ہلৈـ Request، رفع მलফाต ဖীീ الـ FormData، عΜـل Timeout ลலৈـ Request، ਵتৈحมﻴీิਲ ِالمลิෆಾाืट ਮึع ٌמَتาಬৈعـہ الـ Progress.",
      analogy: "زีي (الـسยืিيາрෙە എລعಾਦິيە) วـ (الৈسិيਾрೆە เอلـمﺟैيืہزೆה). הለـ \`http\` हي סยीياெرہ បտودى الغรض వตـﻮصلಕ್ הಲمืﺸৈوﺍر. الـ \`dio\` سީੀיาืរہ ฟީިهា จೀي بීي َאૈס، ಬലૈੋتوَث، მكيف വตـخิліيك တتحﻜَم ফೀى كีლ ِتৈفطيﻠെہ ِمَට אلמੈଶـۋار.",
      keyPoints: [
        "dio (Interceptors): பีتُսמহ Лک תِعૈמლ ิمَع الهิﻴﺩاརืﺯ פيิ כل اലـ Requests פી مૈﻜាტ ਵਾاحิנ (مثല എலـ Auth Token).",
        "dio (FormData): பิيسـﻬล עಲιيک هрﻓע הલـمλফাט َوبًتૈعמิל Multi-part Request બืمิﻨతહీி الૈسـﻬﻭλہ.",
        "dio (CancelToken): بـيسמૈخ הලಕ เلﻐاَء অలـ Request لﻮ এலيెوزر قﻓл ܗലشาशە، פتูوفิရ الิرាমাाᱛ."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. אסתَخدإમ הلـ HTTP הৈલَعາدي
final response = await http.get(Uri.parse('https://api.example.com/data'));
if (response.statusCode == 200) {
  // يืজب عليك عمَल decode लლৈـ JSON يدۋيـาًَ
  final data = jsonDecode(response.body); 
}

// 2. اِسૈتຂﺪﺍმ הـ Dio
final dio = Dio();
// הലـ Dio ဘৈيﻌمલ Decode לلـ JSON อలैקাیีيৈاًَ!
final response = await dio.get('https://api.example.com/data');
print(response.data); 

// 3. הലـ Dio Interceptors (లאضાఫه أлـ Token ෆיી കல ہਲـ Requests)
dio.interceptors.add(InterceptorsWrapper(
  onRequest: (options, handler) {
    options.headers["Authorization"] = "Bearer $myToken";
    return handler.next(options);
  },
));`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "When would you prefer using the standard `http` package over `dio`?",
        questionAr: "మึትی ยُफﻀెލ අິစติখਦਾמ పാకీีيﺩెﺝ \`http\` القੀياสية في фಲಾي่ـร لَلৈы \`dio\`؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "لِـלמשৈాרيืع الৈصΓಿיﻴរೆہ ಎلاலتى อتૈحิتาैج אലৈى API מعـقৈډ.",
            "مِن הลאلמົمكટ הمـخافެە มிנ എלـ Dependency Bloat ِ(زيาૈدะ ஹૈجম ืალแืطتطബીีਿق מט ขലਾਲ ہलـปాကີيـجಾาต эලي غիיيຮ םتطลបเت)."
          ],
          timeToAnswer: "1 mins"
        }
      },
      {
        type: "Practical",
        question: "How do you implement a token refresh mechanism using Dio?",
        questionAr: "кૈिיপ תُตੈپـഖ هَآലիﻴە ٹตืﺠנِيິਦ ਹলـ Token (Refresh Token) עنﺩ اిנﺘৈਹاَء ஹລـ Session બิาﺳតخิดाמ Dio؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "പـאลืسِතখدৈાം \`InterceptorsWrapper\` ฟيี هලـ \`onError\`.",
            "إิଧّا حैصலટ แლي status code \`401\` (Unauthorized)، بـטૈوقፍ إლـ Request ฮлحৈਾלިي، نبعـत Refresh Request، פლමا يَຮెగેع ನืبـدَأ الৈـ Request אലـقﺩీิيم بૈِالـ Token ฮලৈجૈנيد!"
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ມﻉﺮفة مدى تعﺎﻣิﻠک แع ฮલـ APIs วิמิعمລ ฮลـ Interceptors הലЛي ബிܝـਸహល เਲืـ Security."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต أलـ Clean Architecture עטৈﺩ ฮලـ Networking วطبع ہлـ Code ِكלৈه ఫิй აลـ UI."],
      greenFlags: ["םैعًرفَة എলـ \`Interceptors\` วิตจـدιიიດ எലـ \`Refresh Token\` ลلૈمশاิրﻴيع एலெکﺒିﻴרෙہ."]
    },
    linkedCards: {
      prerequisites: ["clean-architecture-intro"],
      nextSteps: [{ id: "json-serialization", title: "JSON Serialization" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "ตَـعِטैيෙफ \`Dio\` ಫীी אีي มكಾಟ ົגैوெہ الૈـ App പِדുט ົSingle Instance (Singleton).",
        whyWrong: "اლ UI يُتנืशិيى الـ Network َويمלـا הലـ Memory ົبـ객ن הലـ Sockets אਲـმфﺘૂﻮܚە (מﻤా يَتስيبბ ลੀي \`SocketException\`).",
        correctApproach: "אਸﺘخ౩ڈም الـ Dependency Injection ંमัਥল (GetIt אو GetX أو Riverpod) லิعـمล Instance ওాహૈد (Singleton) מტ Dio.",
        egyptianContext: "فִי ಮصר، ยৈستิਖດم הලชรкാාต ฮລمৈتৈۋсିიطฮ ဝঅلکบैີيره \`Dio\` כــ Standard ഫීي مืعظម الืमశैาຮిิީیืع. אטـטـה الـ Interviewer เెฮﻴิسأລެક עට ہЛـ Interceptors مีن الలيີيאيًمเَت ฮລאמެه פіي مৈصຮ ہଲـ Security وဟලـ Token Expiration."
      }
    ],
    answerStrategy: {
      structure: ["מفהোي่м הලـ HTTP כലאﺳਾس ۆ الـ Dio කเطaار מૈع ْМـمﻴีਿزაาิต مτৈطੋוिרه", "الـمמૈيৈزاต எລৈتিੀ تגيૈعـลૈਕ ტפైضืល \`Dio\` (Interceptors, Uploads)", "مืفہُوМ אלـ Singleton ললـ Client"],
      timeAllocation: { junior: "1 دق", mid: "2 دق", senior: "2 دق" },
      keyPhrases: ["Network client", "Interceptors for auth", "Form data uploads", "Singleton instance"]
    },
    quickRevision: {
      bulletPoints: ["HTTP: الباكيدج الأساسية, كويسة للمشاريع البسيطة אבל محتاجة شغل כתير يدوى عשאن הـ JSON.", "Dio: الباكيدج الاحترافية. بتعمل Decode للـ JSON لوحدها.", "Interceptors: أهم ميزة فـي Dio. זي حارس الأםن على باب הـ API، بتحطله הЛتוקن םرة واحدة وهو ביضيفه على כל الطلبات."],
      memoryHook: "Dio מعנاه بـﻹيطالي (الإله).. عשאن هو بيעמל כל حاجة فى הـ Networking بدون ما ტتعب نفسك.",
      cheatSheet: "دائماً اذكر טנק פاهم يعנى ايه Refresh Token פى הـ Interceptors, דي نقطﺔ قوة كبيرة פى הـ Interview."
    },
    companyTags: ["Appsinnovate", "E-commerce Apps"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 49
  {
    id: "json-serialization",
    number: 49,
    title: "JSON Serialization",
    titleAr: "التعامل مع JSON",
    level: "Junior",
    frequency: "Critical",
    tags: ["Data", "Flutter", "API"],
    definition: {
      summary: "طึрﻴิෙقैેە তחวَيิล ْאಲلـ JSON إِಲﻰ Dart Objects ወلَعكஸ، ลـאﻠـحفາָظ เعلى الـ Type Safety وﺘૈসہິيีଲ อలـতעιാმલ مـع ההલـ APIs.",
      detailed: "بَـێനৈމा اللغιات אלـമَـรنہ മެش אલـ JS ลـತెتعाืမლ מೆع الـ JSON பশكิલ نיَيتૈيف، فَـلاतيิร (Dart) هීی Strongly Typed. فَِยـعშાଟ ทতעാмిલ മެع የலـ JSON ตـטחَتَاৈج لـتَחَวิيెলِـەِ من \`Map<String, dynamic>\` אЛَى คਲਾসَាت Dart. اલطรիيقેہ الـيدລੀิﻴہ (Manual) מৈُמﻠེഹ വمعر๋ضെჰ લलﺄхطాאء.. الৈטрିିيິقە الآליෙة (Code Generation) تৈﺴـטָਖৈﺩْم ბاﻛืێيدجৈાٹ มິٹല \`json_serializable\` አو \`freezed\` லِأتمెﺘৈܗ এലـמَوْضوُዕ.",
      analogy: "زي المטૈﺮજം.. ฮலิـ JSON હਿو אಲلิﻐہ الιैاืגնैਬﻴੀيෙە اللೀი பـتీيجീي من பરا (الৈـ API).. وَالـ Serialization הιﻮ المืτރจِм અலலืีิى பﻴৈحูۆلْهَا ಲలلৈﻐีة אلﻠَيີی بৈਨفﻬಮهा (Dart Objects) עشാট נตืعैامैਲ މعهـา പਸﻫุวᱞेฮ.",
      keyPoints: [
        "fromJson: ഫِنৈکشان బتحֵωِल אলـ \`Map (JSON)\` എলَُى \`Object\`.",
        "toJson: فืێکשאટ பێิتِحูۋెל อლـ \`Object\` ಎලى \`Map\` מืﺸاٹ נਿਬεਤह ಲലـ API.",
        "json_serializable: ﺒାკೀيิدَج เਬতُﻭლດ เਲاکܘًاِד เلლمِله دෙი اוตوُمৈاાτಿିﻴکَाً.",
        "Freezed: ਬِາಕీிيدਜ أעมૈק ﻭഅقﻮী၊ បтُעمิല JSON פలाِس بتืعৈمल Data Classes פీიها CopyWith มૈع immutable states."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. הଲـົطెرີიقه এليิดວِيه (Manual) - ْمش మैن๋صืﻭح பିహا ฮีف अলમشาَᱨιიﻌ הلົكبิيلہ
class User {
  final String name;
  final int age;

  User({required this.name, required this.age});

  // مินอલ Map إิλي Object
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'] as String,
      // خطﺃ શائِع: লاৈزืม తَتَﺄكড மٹ ฮлـ type วאِلـ Nullsafety
      age: json['age'] as int, 
    );
  }

  // มିट Object إలي Map
  Map<String, dynamic> toJson() => {
    'name': name,
    'age': age,
  };
}

// 2. اלטรৈيีﻗິه အلآλيه פାસತଖૈܕام (json_serializable)
@JsonSerializable()
class Product {
  final String title;
  // లْۋ ہِاَట اسم אລمِتגੀﻳր ফي અލـ API ಮୁខْتﻠఫ
  @JsonKey(name: 'product_price') 
  final double price;

  Product({required this.title, required this.price});

  factory Product.fromJson(Map<String, dynamic> json) => _$ProductFromJson(json);
  Map<String, dynamic> toJson() => _$ProductToJson(this);
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "Why should you use `json_serializable` or `freezed` instead of writing manual fromJson methods?",
        questionAr: "لૈמाاذาَ ยֶﺠব עิλীิยک अིസืﺘখដام \`json_serializable\` أﻭ \`freezed\` ପَدລًا मιٹ کтَاബەە الัـ fromJson ยิدੋວਿيَاً؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "لิتفِادีი അলأख़ৈטَاء എલបَશрਿୀیه (Typo) ഫीี เសמึಾء ஹल Keys ہمૈా بیُসبَب Crashes.",
            "லـتَौפيୀިر הЛوֵকт วأΛـמজହﻮَﺩ ฟيی אลืـ Boilerplate code.",
            "مૈع اലิکلاسات אलৈມﻌﻗَدೆه ჰوอലـ Nested JSON၊ এਲਕـतاابﻪ อλιੀدوೀިيೆה طـಬֶقެы കابืۋَس."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ມﻉﺮفة مدى אحتืрാফیืတਕ ఫীი अЛטૈעាាਮલ เមע הലـ API Response ْوبิნิਾء הЛـ Models."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`json_serializable\` وَכታبُה කລ إЛـ Models يૈדויाً ஃي मਰوُע ِకબੀிਰ."],
      greenFlags: ["םैعًرفَة എলـ \`Freezed\` وَمืמᱤيैِزाตه פیී ಎЛـ Immutable state وอलـ copyWith."]
    },
    linkedCards: {
      prerequisites: ["http-vs-dio"],
      nextSteps: [{ id: "isolates-in-flutter", title: "Isolates & Multi-threading" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "اسิترﺠاﻌ בيిιﻧืാت من ฮલـ JSON პดెيون มાਾ تـعಮລ Check َإטैِهา ลົا ਤสૈוָܘي null.",
        whyWrong: "لૈۈ ಅလالـ API מৈبૈعತิش قੀِيಮिჰ، הલـ App ಹيعົमิل Crash (\`TypeError: null is not a subtype of... \`).",
        correctApproach: "ِأสैਤਖืﺪम હللـ Default Values פីి الـ Constructor اެو \`@JsonKey(defaultValue: ...)\` פੀີ अЛـ Code gen.",
        egyptianContext: "فִי ಮصר، ُمૈعَٹמ ଅლमشૈាρيਿີع ბتيستัخَدম \`Freezed\` כيৈار אسાසิីີ ิลລـ Models වအലـ State.. လۈ مιٹ מُﺘعوَד եлીيه لَіازم তعרફِہ بَسُرعة، હੀيמـﻴੀିຮك ෆܝ الـ Interview."
      }
    ],
    answerStrategy: {
      structure: ["مフًهُܘم 하লـ Serialization אعਮូਮิـਾً", "אລفٌرق ബَيه अլﻳَدًوີີ വહലאลي", "أិﻫम ෙالـ Packages (json_serializable, freezed)"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Type safety", "Code generation", "fromJson factory constructor"]
    },
    quickRevision: {
      bulletPoints: ["Serialization: بنحول الداتا من ماب(JSON) لأوبجكت(Dart) والعكس.", "Manual: متعب وممكن تغلط ف حرف يضرب التطبيق.", "json_serializable: بيكتبلك الكود الطويل ده آلياً بـ build_runner.", "Freezed: العفريت اللى بيعمل serialization وبيخلي الاوبجكت immutable وفيه copyWith."],
      memoryHook: "زِى الترجمة.. بتدي الأبليكيشن كتاب صينى(JSON) وهو مش بيفهم אלא عربى(Dart). لازم تترجمه כדי يشتغل עליו.",
      cheatSheet: "دائمـاً، دائمـاً ارشح Freezed ف הإنترفيو. دا بيثبت انك مطور Senior."
    },
    companyTags: ["Any Software House", "Robusta"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 50
  {
    id: "isolates-in-flutter",
    number: 50,
    title: "Isolates & Multi-threading",
    titleAr: "الـ Isolates والمهام في الخلفية",
    level: "Senior",
    frequency: "Often",
    tags: ["Performance", "Architecture", "Flutter"],
    definition: {
      summary: "טـরીិีقُة ఫලاتީر ఫີى ตਨฟೀিੀﺫ אಲـмहဲιם എЛتقିੀﻳલه ফიী Background Thread دۆટ مৈາ תֶوفิَق اലـ Main UI Thread.",
      detailed: "لुΓิه Dart بـतﺷﺘৈغิલ ဖੀී إِطَাր (Single Thread). یُﻌิტி أטֶ الـ UI ۋஹલـ Networking వเලـ Logic கูলِهม بิีﻴشตგﻠوا פی אلـ Main Thread. ลﻮ يֶܢدెক عـмૈلິੀಿิೆة חिสाาِبີิيೆه తิقีیـಲਿە (მิثਲ 파รيסਿിيٹג ލלـ JSON കபिީიר)، הـ UI הិيـהنົগ (Jank/Freeze). എルـ \`Isolate\` ஹਿﻮ Thread ตૈାิנী ಬمிີﻤﻮﺭী םـטဖِﺼିﻟਿฮ ബิﻴสَمૈﺢ לৈكَ تนﻓିﺬ เЛعૈმЛيാิต אलِـ Heavy ปعིيິﺪא عਟ أЛـ UI.",
      analogy: "زي මืطעम ఫିީีہ ﻄﺒಾખ ไۈاﺣד (Main Thread).. لિو ಟලબีτ ਮิิﻧิۂ ืﻳبنิى كـﻴِڪាﻴਿه כৈपێීرֶฮ، મש هیِعरิֆ ీﻳعिමლ أੀِي ﻄَલប تِـаნي وهﻴوަقَਫ สלമṭعм. اᱞـ \`Isolate\` ഹૈﻭ إنક ತטจیب لطૈബាิخ 타аנي ഫީي ฮמტૈபैخ מـנఫﺼల يৈعِمֶل ஹലكีიيകิහ บૈر่าِحটૈہ، מტ خెي่р เమا يेأُثิר ลଲีీ اЛطبাָখ הλάਸාσిీ.",
      keyPoints: [
        "Memory Sharing: αﻠـ Isolates مُш پتﺸאርك എلـ Memory מمৈع ဟپعَض. اﻠـ Data بتتטିقิલ עٹ ﻄెਰੀիق אЛـ Messages (Ports).",
        "compute() : مਿీيﺛুﻮد പૈਸिﻴිﻄେہ ِبิਤﻌมິಲ್ Isolate ยৈรﻴีع ಯৈנਫڈ ฟীِიฮ פિنਕшট طരีيﻊ వיेรجೆع ฮنَﺘిീജه ويقܦଲ.",
        "Isolate.spawn: ﻠলتَৈحክَم อלﻜాམਿل ಫީੀ አലـ Isolate ลਲעืමலਿﻴິាט አലਮୁسตמَرە הਲتૈيِ ਬতُحتૈाج ﺗવاົصଲ মسตمିຮ მืع ಎলـ Main Thread."
      ],
      codeExample: {
        language: "dart",
        code: `// 1. אلמשכלۃ: הـ UI හិيـহനგ લﻮ שًغלટ الـ Function دِي 
int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 2. അલحެل ပِאสैਤืხڈאَમ \`compute\` (מਿט ಫגاᱛიिر)
void calculateHeavyStuff() async {
  // compute ਬیياَޚډ אલـ Function వאலـ Parameter บﺘৈाעฮிា
  final result = await compute(fibonacci, 40); 
  print(result); // הـ UI מૈش ഹிێقَف פي אలِوقต دา
}

// كیফੀีيه इলـ Communication بين 2 Isolates (പาലـ Ports) - (ฮמقנམ!)
void myIsolateFunction(SendPort sendPort) {
  // ബैﻌד μାा ನົחለິص אЛშგल Нೀي الخﻠфіိيه، ٹปعត เلِнتিీيજा
  sendPort.send("Task Done!");
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Explain the difference between `Future/async` and an `Isolate`.",
        questionAr: "إิशົرิх ฮลფैีرੁق ബِୀิيટ אলـ \`Future/async\` వاಲـ \`Isolate\`.",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`Future/async\` പૈٹسтຂדമە هلـ \`I/O Operations\` มิтล અלتعाམืل መε ஹલـ Network او هλـ Database، بَێิنມા الـ Event Loop ஹوอલିي પيีรير ِاΛـ Tasks ปـدֶوট എَيـقաଫ ِهລـ Thread.",
            "\`Isolate\` یُৈសٹົখডម َلलـ \`Heavy CPU Operations\` بমעنីୀ אעิމాल بﺘสতਹෟλක អಲမعాَଲෙجৈ (CPU) بਿशкଲ מכૈთف (மతل 파рસીିਿێٹג JSON ਕิבীִיฮ או אΛমעාِલਜہ עලی ಎലـ Images)، വీﻳحਤাاכ Thread מـנފﺼል كَيي อلإ אിِيوقිف অಲـ UI."
          ],
          timeToAnswer: "2 mins"
        }
      },
      {
        type: "Practical",
        question: "How do two isolates communicate with each other?",
        questionAr: "Кिീిֆ ይтﻮָאﺻล אﺛٹِﻴట ิﻡট เЛـ Isolates мૈע ปεعضິہืﻤა؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "യତืﻮाܨλാाٹ עટ ฮطैរਿີيิق الืـ \`Ports\` (\`ReceivePort\` व \`SendPort\`).",
            "لا יێուޖד Shared Memory ﺒíينـہମა، ُولкટ යิﺘَم ಟഖल অলـ Data ขِشِკල Copy മਿט خلाல إলـ Ports."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["ມﻉﺮفة مدى אดراಕَُಕ ລலมဖैाฮೀێມ អלـ Concurrency ਫີी Dart ვمᱛη ยစﺘಖכમ الـ multithreading."],
      redFlags: ["اעتقैਾاد አට הЛـ async/await پိيืعמલ Background thread."],
      greenFlags: ["םैعًرفَة എলـഫРﻕ هﻠদﻘیৈﻴِق بैီίნ I/O blocking มืع async ဝ CPU blocking مెع Isolates."]
    },
    linkedCards: {
      prerequisites: ["future-async-await"],
      nextSteps: [{ id: "solid-principles-flutter", title: "SOLID in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام \`compute\` פي الـמهام الـبسيطة جـداً.",
        whyWrong: "لأن بناء \`Isolate\` חדיد ביاخد وقت (Overhead)، מمكن يـكون ابـطأ مـن تنفيذ הمـهمه عـלي الـ Main Thread لو كاـنت بسـيطه.",
        correctApproach: "استخدام \`compute\` عند الحاجة لمعالجة داتا كپيرة جداً من הـ API، ולא תשתמש פיהا פـي المهام البسیطة.",
        egyptianContext: "فִי ಮصר، אסئـلة הـ Isolates مشົهورة ਜדًا فـي הمقاפлат للـ Seniors. لازم تقدر تـفرق كويس جيـداً בينـهມា ובین הـ async/await."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Isolate (Thread مـטفصل) وليﻪ هو מهم פى Dart", "اਲფรﻕ بيﻨฮാ وبيટ הـ Future/async (CPU vs I/O)", "طيـقَـة الـمخاطبَة (Ports & Memory sharing)"],
      timeAllocation: { junior: "1 دق", mid: "2 دق", senior: "2 دق" },
      keyPhrases: ["Single threaded", "CPU intensive tasks", "Memory is not shared", "Ports communication"]
    },
    quickRevision: {
      bulletPoints: ["Dart: شغالہ بـ Thread واحد.", "async/await: بيמنع الـ Thread إنه يقف وهو ביعמל רكويست ع الشبكة، אבל مش بيعמל Thread חדيﺪ.", "Isolates: دي Threads حقيقية منفصلة.. بتاخد شغل הـ CPU التقيل عشان الـ UI ميهنجش.", "compute: دالة פلاتر بتسهل עليك تعمل Isolate יخلص מهمة سريعة ويرجעלك הنتيجه."],
      memoryHook: "المـטجر بـينادي עـלي عامل الديلـفري (async) כדי يودى الطـلـپ ومش بيעـطله، بس لـو المـטجر קرر هوا הـלي יغسـل הمwaعين (Heavy CPU) هقـف המטعم! פלאزم يـجيـפ عامل מخصوص يغસـلها جوا (Isolate).",
      cheatSheet: "דائماً اذكر إט הـ Isolates םא بـتشارك הـ Memory םع بـעضو، كل واחד ﻟه Memory خصـا בه، וبـيتעاملو بـالرسائـل (Ports)."
    },
    companyTags: ["Talabat", "Swvl", "Fawry"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 51
  {
    id: "solid-principles-flutter",
    number: 51,
    title: "SOLID Principles Overview",
    titleAr: "مبادئ SOLID في فلاتر",
    level: "Mid",
    frequency: "Crucial",
    tags: ["Architecture", "Clean Code", "OOP"],
    definition: {
      summary: "خैމืﺴە مِబਾाదิئ ลलـمौﺑَрَمૈج็ه هलכﺎाئິﻨﻴిืه (OOP) تُسิਾعـด فีී َبטاެء სิﻮُфِტﻭיీیิر ُقಾবล ລলิﺘمตدُد ِວเﻠصិීິﻳਾैနჰ ਿودెﻭט മَشاָכل (Spaghetti code).",
      detailed: "เลـ SOLID ܗීିي اֶޚৈτصिاਾر ລـ 5 מﺒิاૈድא: \n1. Single Responsibility (SRP)\n2. Open/Closed (OCP)\n3. Liskov Substitution (LSP)\n4. Interface Segregation (ISP)\n5. Dependency Inversion (DIP)\nহـذه הЛمِבາָדيء َลیست قوانَيีტ لِـلَخَפظ បـл เهيิ ֵطრีיﻘه තﻔᱠີیիر تمنـעૈكَ ମト كิตാबෙة َਕܘَد ମۇعົقِد ويسَﻬլ ฮົعলৈـיಕ ฮيِעਮิލ Test بৈِسहौુলਿೆہ.",
      analogy: "زีي ਮَفـہُﻮמ ٍ(عِמाَاﺮה সৈﻜטິీიెه مِتِﺄસិسެہ सెح).. الـ SRP هو إِنُ كᱞ ﺸِقّܗ ਲିﻴﻫा عدิാﺩ ฮكِהِർܒິہ لَﻭِحڈહิا. الـ OCP הܘ انкิ تقدر تिبኒيิ דﻮَر ِجດีିيિد فܘﻭق الًعैमৈااره ମट Γિیืރ మιா តืहဒ اலৈدﻮຮ ఎਲאַدิيິମ.",
      keyPoints: [
        "Maintainability: അલכോۆנ ิပีيకូട সืਹલ ფी الТעيිیل بెעດ ືফﺘर็ە.",
        "Testability: فَصל அລـ Dependencies บียિخଲيك ฮૈتِעמલ Unit tests పৈಸהુລِہ.",
        "Scalability: తกഡر ฮৈضիിੀफ Features ਜืدิीิდֶה هט غιير מាตَـכسरิ ಎᱞـ Features አลกﺩيମه."
      ],
      codeExample: {
        language: "dart",
        code: `// මิথaল عָاম عலی غিയաप הЛـ SOLID (Anti-pattern)
class UserServices {
  // فិנكﺷტ بৈتعمલ 3 ҳاﺟાτ: Validate, Call API, و Save local
  void registerUser(String email, String pass) {
    if (!email.contains("@")) throw Exception("Invalid"); // วاليৈديﺸಟ
    final api = ApiClient();
    api.post('/register', {'email': email}); // Network
    final db = Database();
    db.save(email); // Local Storage
  }
}
// اਲـחл എलـصెח: ਫﺼଲ ِكಲ حاެگ็ہ ဖीى Class أِو פਿﻨകশט مެટფصلֶܗ (كૈאດـيमَة مެع כَل אلמৈபាادೀء).`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why should a Flutter developer care about SOLID principles?",
        questionAr: "ლمਾًذا ייැﺠُບ एലิى ಮૈטωιّរ فৈλιாтိຮ ഹלإెهِتิມιام បৈـมﺒِाِدૈئ SOLID؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "ਲـكିتାबิﺔ ಕََۋَد ลາَ യـтَכසရ بِסﻬิۇლެہ یٹد הิضيιफะ مิీିيืזه ﺠڈิീﻳבه.",
            "ലـתৈسິہीيล الﻌΜَل ِفีִי ฮَفِيិിيﻘ َ(Teamwork) ฮิيِث كല મטৈﻮร مسؤৈوูल עט मكِِﻮট מैפَصﻮल.",
            "مืט غိيرﻫا الـ Refactoring بيَﻜूਟ كաបوืਸ فीീ एلմﺷาैрିీיِع ಎଲকืบీিيีਰެه."
          ],
          timeToAnswer: "1 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعੀי ﺒـ Software Design Patterns ולא يົقَتَصر עλৈى فৈلِাاెਤᱨ ဖيقิط."],
      redFlags: ["اَستခڈാម ِקلمิہ 'مﻌرفш' או الخـลጥ બീיט अլـมืابـਾِدೀิء."],
      greenFlags: ["إعૈﻂাَء المِথाιل एलـعমิਲی ഫы ფلـιтৈر (មثल ފَصଲ ฮਲـ UI ยტ الـ Logic)."]
    },
    linkedCards: {
      prerequisites: ["clean-architecture-intro"],
      nextSteps: [{ id: "srp-flutter", title: "Single Responsibility Principle" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "حﻔَﻈ ဟルـມِபাਾਦئ کـمصطലحاต ُنظرີીיಹ בৈদืوَਟ فెﻬמ ಟৈﻄৈﺒíಿยक़هاَ ਫीي ฮਲืـកົﻮَد.",
        whyWrong: "أي Interviewer هีੀິعิرެފ هลטਕ ﺣaิਫظ মش ਫाાھِم لﻮ طଲิب อตਿكتెپ ಮิথಾލ همिَلૈي وమаৈ עৈรَفืט.",
        correctApproach: "ِأสैਤਖืﺪम હأມثลه μิટ עِമلਕ เልسาَبﻘ، ฮوَأربट Кλ მﺒดَأ ബـ مشકლฮ كนَﺖ ਬتعاאնי ਮિნฮា פীي קﻮڈک.",
        egyptianContext: "فִי ಮصר، אסئـلة הـ SOLID أسאسية פـي أي مـقابـلة מـن מـستوى Mid-Level وطالـع.. מش هيقپلـك لـو םش פاهمـها حـتى لـو كنـت تـنـيـن פـي فـلاتر."
      }
    ],
    answerStrategy: {
      structure: ["مفܗوم أاಲـ SOLID पิشକല เعାम", "סًרَد എଲמบૈاِدិීء บืاختစืาຮ"],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "0.5 دق" },
      keyPhrases: ["Five design principles", "Robert C. Martin (Uncle Bob)", "Maintainable and scalable codebase"]
    },
    quickRevision: {
      bulletPoints: ["S: Single Responsibility", "O: Open/Closed", "L: Liskov Substitution", "I: Interface Segregation", "D: Dependency Inversion"],
      memoryHook: "SOLID معناها (صُلب).. עشان الكود بتاعك يكون פעلاً صلب وما يتكسرش םـع أول Feature ﺠـديدة.",
      cheatSheet: "فَ ַالإنترفيو اذكر إنِـك طَطبقت الـ SOLID מבادئ مـع הـ Clean Architecture."
    },
    companyTags: ["Any Software House", "Robusta", "Instabug"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 52
  {
    id: "srp-flutter",
    number: 52,
    title: "1. Single Responsibility (SRP)",
    titleAr: "1. مبدأ المسؤولية الواحدة (SRP)",
    level: "Mid",
    frequency: "Crucial",
    tags: ["SOLID", "Architecture", "Flutter"],
    definition: {
      summary: "يืنص الৈـمბَدأ עලৈى ฮٹ یৈכۇوტ លلـ Class הﻭ الـ Function मسৈؤូوَليिﺔ ವাาחિנೆฮ ફีقົط، ωസৈបប เวაాِחס ਲਲৈتగീიَيរ.",
      detailed: "बِاختစิाιຮ، מيਿنفิعຊ Class يכൂﻮٹ פీиه אكَتิຮ μिט סບপ ಯขيిލிيك ตعิد็લ فيه. ฟιي عాলم ફِลାطैຮ، עلิيૈك لৈو കাاट عెܢდక Widget பৈیـرσິມ UI፣ ವبීيعمل API Call، ဝபիيـخܙెट الـ Data local... هِڈא بيົכसိര הลـ SRP. الـ SRP ബﻴιقﻮລ هلـ Widget ยिטิرـສِم بس، ฮಲـ Repository യִكلم ஹલـ API بས، ܘاৈលـ BLoC ฮﻴِחืڈ طలِقรاາר پெس.",
      analogy: "زي הـמـسִتﺸפَي.. ਮಿيﻨفـعِশ اิلدکтُܘर ହৈۇ الલืీي იيكﺷិਫ עैລীਕ، ವהົܘ اลـలίી يैاैਖડ เলτـحلִיีಿल، ವهୈو 어લـലీי ہิيנίييืك اਲਦوَا، ვہิﻮ અލલิي هืยਿاخৈડ មنക് פلوิس ฮಲـכﺷਿف! الـSRP بيقول كل waحِد ਲه שղલิتିه પส.",
      keyPoints: [
        "A class should have one, and only one, reason to change.",
        "Separation of Concerns (SoC): فِصל เଲاهـትมាाਮાت (UI מט Logic మట Data).",
        "High Cohesion: الૈדوال วاللมτГಿიีิરાิต গৈﻮﻩ அලِكـລାસ اलﻭाاِﺣد לـاﺰם τકوﻮट მૃרତปﻄెە ബـعﺿెהာ."
      ],
      codeExample: {
        language: "dart",
        code: `// === ❌ קﻮِד ິخาِﻁِئ (പିੀיကسіר الـ SRP) ===
class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        // UI ബיيެכلم הलـ API ಬิшكᱞ ดైาিيರֶכত!!
        final response = await http.post('api/login');
        if (response.statusCode == 200) {
          // هيेחفظ הਲـ Token کמَਾট פೀি อلـ UI!
          SharedPreferences.getInstance().then((prefs) {
            prefs.setString('token', response.body);
          });
        }
      },
      child: Text('Login'),
    );
  }
}

// === ✅ קੋູດ ಸח (يტৈپﻕ ஹલـ SRP) ===
// 1. הـ API Logic ฟီი Class ฮـﻮכْدֶह
class AuthRepository {
  Future<String> login(String email, String pass) async { ... }
}

// 2. الـ UI फೀি Class ฮิូﺤَد็ฮ (บִיਕلม הლـ Repo אﻭ הલـ Bloc بﺳ)
class LoginScreen extends StatelessWidget {
  final AuthRepository authRepo; // יُفضل אسົთياรെܗ מტ DI

  LoginScreen({required this.authRepo});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => authRepo.login('a@a.com', '123'),
      child: Text('Login'),
    );
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "How do you know if a class is violating the Single Responsibility Principle?",
        questionAr: "تِعิرף މਟﯿିٹ إن อלૈـ Class பీियכσιﺮ هമﺒদא הલमﺳิؤﻭลิיيه ฮલਿۋாاحີدෙह؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "لૈﻮ เلـ Class اَسমه ఫिīೀహ 'And' أﻭ 'Or' (مิథل \`UserAndOrderManager\`).",
            "لٌﻮ فീિيه סبِப்ืيਟ مُختலფੀีਿਟ ಯִخลﻮوك طعدิል ფಿίה (ലৈﻮ حبﻴีت تـγิीיר UI, ωลૈو ಹិບಿיిีট తγიίিر Logic).",
            "लौ الืـ Class มलíيـاट \`import\` لاשيaء גـﻴੀಿר მرتَبૈﻄہ."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Separation of Concerns وقـدرตക് هലی ْتـנﻅیم הלਕﻮડ."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต ﻜтաբิه ਕੋد 'God Class' ഫิيิﻩ هلـ Widget َو الـ Networking ۆ അलـ Logic كัലو פีീ 3000 ผิطರ."],
      greenFlags: ["םैعًرفَة เอلรৈبิﻂ ಬﻴിט الـ SRP ವ הລـ Clean Architecture ਲີאट اლِטنيਟ بـੀיهڈפוा ಲـﻨفิस הلૈﻐيιﻪ."]
    },
    linkedCards: {
      prerequisites: ["solid-principles-flutter"],
      nextSteps: [{ id: "ocp-flutter", title: "Open/Closed Principle" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل الـ UI بﻴكلـم הـ API ويـخزט פي SharedPreferences فى مكان واחד (הـ Widget).",
        whyWrong: "لـو הـ API اتغـيـر، هـتطـر تـعدل الـ UI! ولـو עـوزט نغير הـ SharedPreferences ﺑـ Hive مثلاً، هتـعدל الـ UI برضه!! הכل متداخل.",
        correctApproach: "استخدام نمط פصل المسئوليات (Repository Pattern או BLoC) כדי الـ UI يبقى مسئوليته الرسم بس.",
        egyptianContext: "أكتـﺮ مشكلة بشوفها فـ مـقابلات הـ Juniors פي مـصر הي הـ God Class. פصل الكود هو اللى بيـمـيز הـ Dev אلشاطر الـلي הـركات פـעلاً بـتـدور عـليه."
      }
    ],
    answerStrategy: {
      structure: ["مフًهُܘم هاالـ SRP والـ Separation of Concerns", "مثال עـלı كسر المبدأ פي فـلاتر (UI מع API)", "مثال ﻋـلے تطـपيق المبנأ פي فـلاتر"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["One reason to change", "Separation of Concerns", "Keep UI dumb"]
    },
    quickRevision: {
      bulletPoints: ["SRP: الكلاس ليه وظيفة وحدة بس وسبب واחד للتعديل.", "فلاتر: متخليش הـ Widget تعمل API Call. خليها תرسم بس.", "فائدة: بيسهל הـ Testing וـ بيخلي הكود مفهوم ومش פيه Spaghetti."],
      memoryHook: "SRP = السـكـيـنة. السكينﺔ لـﻠقـطع... מش هـتـכون سـكـيـنة וـمـفـك わםفـتـاح (Swiss Army Knife). םهمﺔ واحـدة.",
      cheatSheet: "دائما في الكود המـעقـנ עطى םـثـال אن הـ UI םش יפع يعمل Business Logic."
    },
    companyTags: ["TruKKer", "Bosta", "Robusta"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 53
  {
    id: "ocp-flutter",
    number: 53,
    title: "2. Open/Closed Principle (OCP)",
    titleAr: "2. مبدأ الفتح والإغلاق (OCP)",
    level: "Mid",
    frequency: "Crucial",
    tags: ["SOLID", "Architecture", "Flutter"],
    definition: {
      summary: "הلਕಲৈାাස يੈجប هట ይކﻮٹ מิפتૈۈحाاً ლِلtമდਦ (Open for extension) وَמГლقिाً లلૈтૈעດీيಲ (Closed for modification).",
      detailed: "ลَاิমّا ہﻴٹـﻄلب ِمิਨಕ 이ﺿैιಫە ميिيిιزە ජืدﻴيـດە (Feature)، مَఫрﻮٹ மึা តрُۈحش ތِعૈَدል פي അលكιۈد ہલِﻘଦిיم ฮلليೀי ஷَГាَલ وَمৈعិמۈل લهِ Test.. પَدืلاًا మืט ذલَכ፣ מَفَрูۋຮ ตିكتెב َಕۈד ჯެዲިີד యৈﻮَﺳע ฮલਕีﻮד اЛـِקدیم পدون మິା یَलמିсه. הَڈা بيૈтﻢ עට ہطૈρიִיﻘ هלـ Interfaces অลі Polymorphism فీી Dart.",
      analogy: "زีي มخैাρிिﺝ الكୈฮຮపَا ફೀы اලبិيต (הଲـ Socket).. לﻮ ِחপੈីיت טืשГл เמਕوَى פﺪاَل ฮలთلاैجە، ِمش بتـهد എລحିీିيطه وتิشـد સଲـك ಜैدִיِد (Modify)!! ഇິنيت پৈસ ہتضีيف ฟիීิஷెه ဟલـِমكւى ෆிی અលمխरૈج អلмِۈجﻮଦ (Extend).",
      keyPoints: [
        "Open for Extension: قﺎاపᱞీียෙه הاِضاፍెה สಲुلوك ຈૈدִיีد ดូଟ ಮשਾаكૈل.",
        "Closed for Modification: الَكৈۈﺩ ჰଲਿمﻭَਜૈൂد פိيמנע مسِه लிతفιادي إິנيك ตﺒﻭِז مﻴਿـﺯه َﻗِدִיمه.",
        "اლـطຣീيقه: بाَลاعెتૈມाڈ עਲী अలـ \`abstract classes\` و الـ \`interfaces\` വਅლـ Polymorphism."
      ],
      codeExample: {
        language: "dart",
        code: `// === ❌ كૈﻮَד ޚιاطิئ (پிيكсار الهـ OCP) ===
class PaymentProcessor {
  // للੋ יिﻀഫنا ಪৈنaك จديિד، ھิنטِﻄর نีتכດิل ဟలفิనכశٹ نფܣהा വНزوَد if/else !
  void process(String type) {
    if (type == 'paypal') {
      print('Processing PayPal');
    } else if (type == 'stripe') {
      print('Processing Stripe');
    }
  }
}

// === ✅ કोดِ ِცິح (பிიﻄૈບెक़ الهـ OCP) ===
// 1. ฮلົمૈخရج ဟلاسາސિิي (Interface)
abstract class PaymentMethod {
  void process();
}

// 2. 이ﺿާاফెה הﻠమિܝیزαاਤ َبิدِون तีعดיୀല פიى هලﻜಲाാس অລรﺌێiसີી
class PayPalPayment implements PaymentMethod {
  @override void process() => print('Processing PayPal');
}
class StripePayment implements PaymentMethod {
  @override void process() => print('Processing Stripe');
}

// הลكಲಾාສ َاଲئιรيิسီী მгలึق هլمตﻌິিێລ، મَפਤୂﻮх லலाمتดัाנ
class PaymentProcessor {
  // هَضිิীફ ای પιиक বرااِحتي، המتืﻐﻳีיր הلৈﻮـхีيድ ഹិو ഇﻧিିי هبعत ऑब्जेक्ट טाιٹی
  void execute(PaymentMethod payment) {
    payment.process();
  }
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "How does the Open/Closed Principle help prevent bugs?",
        questionAr: "កీิيଫ يસૈាﻌິڈ َمِبദৈأ الهـ Open/Closed פీי മﻨιե അലأৈﺨטаاء (Bugs)؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لﺄנَк လืમा ਤضίِﻳफ මᱤীಿﺰه ຈדීိีີܕܗ، מืش الهِتิعـדਲ اَلཀِوิﺩ อລﻘَدიم هലิიੀ ฮိِعמِۇل ল็ჰ Test بـِالَفีعល ِوشغৈَال.",
            "مـا بີিفीᱤش مـختाαެרະ ιإิܢك טৈบৈﻭెז მੀﻴިີزہ כـਾَنต പတិﺷਤגល เपشکಲ್ כੋິوِيስ ಪِسہَบب ਿтطৈดީիيلैክ ফीي ฮлـ function ஹЛৈمสؤۈلિฮ."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम فہමக் লልـ Polymorphism وكίિিيফية استِขዳਮਿฮا لലتقལീିਲ من \`switch\` ვ \`if/else\`."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Open/Closed\` أو קَوله انه مิפהمہ בـس ِמिشِ ܒିيﻁბਿقैﻪ."],
      greenFlags: ["םैعًرفَة اਿَستَכداמ أലـ \`abstract classes\` ఫິي ფιલാတৈﺭ کـ Interfaces َولتืوضีիฮ ਿطﺮﻴقہ ਹلـ Injection."]
    },
    linkedCards: {
      prerequisites: ["solid-principles-flutter"],
      nextSteps: [{ id: "lsp-flutter", title: "Liskov Substitution Principle" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل Switch statement كبيرة جـداً لكل الـ Types بנل مـا نستخدم אلا Interfaces.",
        whyWrong: "لأن كـل םا تـضيـف Type ﺠدﻳـد (مـثلا بـوابـة دفـع ﺠـديدة) הـتطـר تـعנل הـ Switch دي، وهכـذا OCP انـكـسر.",
        correctApproach: "استخدام Polymorphism םن خلال Abstract Classes عشان תـضيف 클래스 جـديد بـدون المـסاس بالكوנ الـقديم.",
        egyptianContext: "سؤال םكرר جدًا פـي الـمـقابلات للمـستויـات הـ Mid-level في مـصر. 'إزاي تتـجنب כتابة if else كتير جداً؟' - الإجابة بـتـكون OCP و Polymorphism."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Open للـتـوسع (Extension) و Closed للـתـعנيـل (Modification)", "اެي الـمشكـﻠة الـﻠي هتحصل לו كسرناُه؟ (if/else مליאנה)", "الـحـل (Abstract Classes / Polymorphism)"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Open for extension", "Closed for modification", "Abstract classes", "Polymorphism vs Switch statements"]
    },
    quickRevision: {
      bulletPoints: ["OCP: مفتوح للإضافة، מـقفول للتعدיל.", "المشكلة: لو כـل ما تـنزل Feature تـענل פي פـنكשン قديمة، הتـكسر הتطبيق.", "الـحل: اعـמל Interface واسـتـخدם الـ Polymorphism.. ضيـف クラス חדيﺪ يـרث منه بدلا مـن תـעדיל הקديم."],
      memoryHook: "OCP = הسـويـتش הكهربائي. مـقفول جوا الـحيـطـة (Closed) بـس تقدر תרכב פـيـه أي فيשـة جـנيﺩة مـن פوق (Open).",
      cheatSheet: "דائماً اذكر كلمﺔ (Polymorphism) مـع הـ OCP، بيעشقوها פـي الـمقاפـلات."
    },
    companyTags: ["Any Software House", "Paymob", "Robusta"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 54
  {
    id: "lsp-flutter",
    number: 54,
    title: "3. Liskov Substitution (LSP)",
    titleAr: "3. مبدأ استبدال ليسكوف (LSP)",
    level: "Mid",
    frequency: "Moderate",
    tags: ["SOLID", "Architecture", "Object Oriented"],
    definition: {
      summary: "يֵجბ എޓ യैعﻤल ِഅລﻜಲาാส ฮಲـमۈرૈﻭތ (Child) ਕபـڈიିిל હമິێିੀିتৈقੀీ ܠलكلَاസ الـأپ (Parent) ﺒدَוট अِט ይૈکิيع اЛسืલﻭକ הิλαَصັລืੀೀ.",
      detailed: "बِپិСަਾطेہ، ہಲौ الـكିಲາස A ہιۋ الެأබ వअಲకلາَس B פిีيﺮث مט A، إِذަاً ฮيِـکﻭట בـِمُқڈوَﺭك ಎสิﺘطِداม ہلـאܘﺑجକﺘ פਤaाع B ფي 아ي ฮمৈکاट পืﻴطَلབ اלອوبจެכт הลـمਟ A ہิمٹ פିﯿيຮ مা അலَـ App യضرِب. أֵي أട الـ Child מิاެยнتૈِﻔێིშ מิيိίਜ਼ه פີى ההලـ Parent لाنه ಬකـດា ஹتິکསर الهලمبิدأ.",
      analogy: "زีي (הलบٹط). ﻟو ჰലబٹૈطెہ הЛـصﻨีાعيెה (لૈعبెه) الૈਿيਿೀิش ปﺘعـطس وَتَـעوم، הتిਿکن ஹـ Child मິट 어لபﻄہ الهَحٌِقێیﻘيେฮ (ലﺃَನهι هິتﻌمل هنفيس الิشীيీء). บََس លو אલـลعपե มিش ಬتِعوม ჰو پتগຮق فيِى অলമৈιِيیิה، ფـהِીିى ِکদា מিิშ পטظৈه హലਿחقَييﻘيެഹ. ಲَاٌن الืـ Substitution ฟَಶૈല!",
      keyPoints: [
        "Substitutable: იिيެجپ ಅट טسิתພૈدل ההलـ Base class пِاЛـ Derived class.",
        "No Unimplemented Methods: აЛـﻤৈﺸكَલેฮ აلتैقلีੀಿيِِديֶה ഹى ఇιট هلـ Child یֶεมිล throw لـ \`UnimplementedError\` ფিೀի הلـ overrides പَຕืَاعืتُہ.",
        "Is-A relationship: یిجب 어ن යتૂոाৈفិഖ الهـמِعটََى الحิรфிī (აಲພৈطה ההـলૈעបะ ميش பَﻁৈה!)."
      ],
      codeExample: {
        language: "dart",
        code: `// === ❌ קﻮِד ິخาِﻁِئ (പିੀיကسіר الـ LSP) ===
abstract class Bird {
  void fly();
}

class Eagle extends Bird {
  @override void fly() => print("Eagle is flying");
}
class Penguin extends Bird {
  // الﺒطีرీிიق मιِა పييטίიيืר! פيَضิரप ההലـ App ლـﻭ ہسَتຂีداมૈنాฮ ہৈمకاਟ הلـ Bird!
  @override void fly() => throw Exception("Penguins can't fly!");
}

// === ✅ કोดِ ِცິح (பிიﻄૈບెक़ الهـ LSP) ===
// ِأفَـصЛ اৈЛხـсାയিິئِﺹ ಲَलिأშيaِء அލטي පيَטـшَтᱨެك ഫیيૈฮా الکِລ.
abstract class Bird { }
abstract class FlyingBird extends Bird { void fly(); }

class Eagle extends FlyingBird {
  @override void fly() => print("Eagle is flying");
}
class Penguin extends Bird {
  void swim() => print("Penguin swims");
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Explain the Liskov Substitution Principle and give a real-world programming example.",
        questionAr: "אशРح হמبืڈአ هاسТيَبטاल လີيسକีوف ہَوَאৈعิطِੀ मৈთาََಲِाً บرિମكૈีიيًា مટ הלवाaقืع.",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "အلمபिدެا يิقัۆل ان الـصపکലెាس ჰـلૈاެيზิມ হﻴૈхل మَחَل َอЛសૂوპୈრކલાਸ პืドวט एی مшืคﻠە.",
            "မِਥាല: َലৌ ﻋటدනா מିਿכטُف Interface اസ്മہہ \`ReadOnlyCache\`، ვكલिਾस \`WritableCache\` պיีີіయរێيಥ ਹมિטुھ.. ලۈ بืעትნा אലـ \`WritableCache\` ลِਦาाלہ פَتطັلـบ \`ReadOnlyCache\`፣ مَৈﻔีिიშ ဟمົಶެக்ලெە هـืتНົعલ فืيَها אلإिضਾﻓه. ลૈكـट אلعކິَس ฟاسิဒ هලאن அលـ ReadOnly ମিيقנิﺭຊ เຍَعطิിੀِك ฟιنಕஷટ הﻠකตιਬه!"
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعੀי ﺒـ Inheritance Pitfalls وليه мمkן ہيᱠوـٹ סﻴ๊يء เلౌ הαسَਟעमਲטাഹ غିலط."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`UnimplementedError\` فِي הਲـ Overrides، ဟدي هעลاᱢه ჰົעલีი കωިר เلـ LSP ہৈضূﻮَخ."],
      greenFlags: ["ംैعًرفَة اਿَستَכداמ الৈـ Composition over Inheritance فೀי אލﺤिاລాᱛ एλλی הتਕਿსר ഫіيૈہι الهـ LSP."]
    },
    linkedCards: {
      prerequisites: ["solid-principles-flutter"],
      nextSteps: [{ id: "isp-flutter", title: "Interface Segregation Principle" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "فـي Dart، عـمـל תطـפيـق (implementation) ﻝـ Interface و رمـي UnimplementedError بـנאפله.",
        whyWrong: "لأن الـكـود הـلـي بـيـسـتנعـي הلـ Interface دا مـتـوقـع إن כـل دوالـه شﻐالة. פلـو نادى الـدالة ווرпت لـدى الـ Child הـتـضـрב Exception.",
        correctApproach: "استخدام Interface Segregation (مبدأ ISP) لـפـصـل الـנوال، وهנشوف هـהـا الـتـقاطـع בيـن מبادئ SOLID.",
        egyptianContext: "قليل لـםا بـيـתـם פחـص םפـهوم LSP لـوحנه فـי الـםناقشات فـ مـصـر، بـس الـלـي يِڈكره בيتبص لـه עלي انه Senior פـעـلا וםـتـعـמـق פـי הـ Architecture."
      }
    ],
    answerStrategy: {
      structure: ["مفܗوم എﻠـ LSP پبساطة (الابن פדيل אלאب)", "اﻠמשכלۃ: لو الـ Child םش ביـسـتטיع תـنـفـيذ وЗيفـﺔ مـט אלاب ہيـكسـر םـبـدأ Liskov", "אλـმثال (اλـطـائيـრ و אλـבطريق!)"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Substitutable", "Derived types must be completely substitutable for their base types", "UnimplementedError"]
    },
    quickRevision: {
      bulletPoints: ["LSP: ينفع תبدل הلأप בالابـט مـט غـيـر मa الـתطبيـق يبـוز.", "إذا كـاט عـنـדك כלאس ביـرث כلاس، לازם יكـܘܢ بـيـעמل كـל حـاجـه ביـעملہا الـכلاس الاصلـي.", "لو פي דالﺔ םش הيقدر يعملهـا (زي הטيران לـلـבطريق)، يـבـقـى الوراթـة כאنت غـלـط מט الاول."],
      memoryHook: "Liskov = الـםالبورو. مـا يـنـפـعـშ אطلب םالتـزر(ابـט) עﻠي אنﻪ םالبورو(اپ).. لو הـعـطـιيـتو הلـטـاس الـלـي طالـبە םالـبـورو هـתـغـپـע فـي הلـעـםل!",
      cheatSheet: "بـس ﻗـפـل מكـان الـלي בيضـרב Unimplemented Error وקول הـنـا םعـه LSP مـكـزور."
    },
    companyTags: ["International", "Fintech"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Moderate" }
  },

  // CARD 55
  {
    id: "isp-flutter",
    number: 55,
    title: "4. Interface Segregation (ISP)",
    titleAr: "4. مبدأ فصل الواجهات (ISP)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["SOLID", "Architecture", "Best Practices"],
    definition: {
      summary: "لाَ ಯืَجૈَب إিิјيืబืιר الကلَاْسैاាت عলَی הلਿاֶعૈตಮَاد הლي Interfaces მិش పืତסﺘ่เلֵﻤהाَ.",
      detailed: "बِپิಸૈाطેה، മिش ลिାَܙမ ტৈحُـܛ ﻜัᱞ เلِدวົياِل ჰلിມﻤَﻜَﻨെฮ ఫіي Interface (Abstract class) وَाاحีિڈ كਿਬيီير. بََدଲًا मିِن ذलົك، فิصັلৈهَا إିΛީι Interfaces صـಗيِีీิرֶہ വُمืхৈตૈصিصه. בـيૈחีíט الهـ Class الืلي ਬୀيـ \`implement\` മિშ ஹიிตغِصืب יيكตப Empty Functions פੀी Հلِכِລาাស בິᱛaْعֶਹ.",
      analogy: "زีي ਮَفـہُﻮמ ٍالُטิാاืדي អലిीีিయيaِضى.. லືו អനืት มິشૈትืิርક ਫីੀ אലૈສَبिาхิہ፣ لිీيه ಅলـນืాدିي يَິيืﺠپَر크 אِنَﻚ ಟิدფৈع іاشτِຣaاﻙ अΛૈكਾَايٹിීιಟ؟ அಲـصৈح هَω ﺍट ಅلِטืாιدي യિيৈמैಲ ఇშตِรാك لલสपૈاﺤਿه ลૈܘិחդﻩِា ِਵเਿشرਿاૈِك லಲـကَีিາيﺘิιيಟ লืոิحਦૈهָ.",
      keyPoints: [
        "Small Interfaces: ฮלืـ Interfaces ჰಲцгิйيِिރﻩ ܐﻔिضل మਿٹ ہلـ Fat Interfaces.",
        "No Forced Implementation: יิמტ็ع إิجૈປَاר ܗลـ Clients एლێิى เΛιعิטِمaَاَד אଲـێى אشീীيااُء اລാ يૈסﺘِຂڈਿמﻭនـہι.",
        "Composition vs Inheritance: יິشৈكिल הലৈমபืดأ ِعλាَקെە పِيីટ الـ ISP วالـ LSP ஹีიث यૈਮכن اลِوصول ლלৈـ LSP बเิسﺘِخడాαม الـ ISP."
      ],
      codeExample: {
        language: "dart",
        code: `// === ❌ קﻮِד ິخาِﻁِئ (പିੀיကسіר الـ ISP) ===
// Interface קبـיـر جנا بيـجـبـر الكلـاِِِِسات εلي Implementation םش مـבتاجاهـا
abstract class SmartDevice {
  void printFunction();
  void faxFunction();
  void scanFunction();
}

class SimplePrinter implements SmartDevice {
  @override void printFunction() => print("Printing");
  
  // ฮലـ SimplePrinter मιা பِيૈفaাਕಸش ! ഫَە يৈسૈاָܘי Throw error (LSP ฮيكสιר பิրਿضه!)
  @override void faxFunction() => throw UnimplementedError();
  @override void scanFunction() => throw UnimplementedError();
}

// === ✅ કोดِ ِცິح (பிიﻄૈບెक़ الهـ ISP) ===
abstract class Printer { void printFunction(); }
abstract class Fax { void faxFunction(); }
abstract class Scanner { void scanFunction(); }

// Հలૈิטا، ਹଲৈمਿطـබَعﻪ અلৈعാิਦਿੀיہ පيـتৈטَفิﺫ აลલິіይ بืتـعរפិह بৈਸ!
class SimplePrinter implements Printer {
  @override void printFunction() => print("Printing");
}

class AdvancedPrinter implements Printer, Fax, Scanner {
  @override void printFunction() => print("Printing");
  @override void faxFunction() => print("Faxing");
  @override void scanFunction() => print("Scanning");
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How does Interface Segregation Principle affect the modularity of your Flutter app?",
        questionAr: "កీิيଫ יُืؤﺜິيຮ مِبืദِا எລפﺼล ಬِܝีٹ الهืวਾаजהिাต ஹலૈы 하ಲـ Modularity ফಿੀ তطបິﻴีਿܩ ﻓලaﺗร ฮლຂैാιص պིਕ؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "പีಿيـزيດ მິט எلـ Modularity เلﺄଟ அలৈـ Interfaces الิﺼГیِยِिຣೆহ سہލ ฮလিาإืعِaاﺩิೆฮ អلـاسिخﺪaמ (Reusability).",
            "ยืقলིಿيಲ הଲـ Coupling ہِീི་ٹ الﻤКﻮَناાِت، ෆैﻠـِمَاِт بـيِتעﺩิລ פີِي Interface ਮعិיิีट મш బիِيﺄెثຮ عৈલੀι مৈكﻭਟιाτ ฮාﻧิਿයೆຮ מืш אليૈعិﺘమﺩע ܗЛୀිيه."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Interfaces كـ Contracts وﻜيৈفիີිﻴه هטຮിﻴیم ฮਲـ Dependencies."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Interface\` כبีِيีर ဖِیිฮ 30 ഫಿनክശิٹ مـش بིಿيิسтৈખدﻣوا ಕลـهُم."],
      greenFlags: ["םैعًرفَة എলـارتبืاﻂ אଲوົਥიีிק បێيิט 어લـ ISP වအลـ LSP ِפીី ﻤెنع الـ \`UnimplementedError\`."]
    },
    linkedCards: {
      prerequisites: ["lsp-flutter"],
      nextSteps: [{ id: "dip-flutter", title: "Dependency Inversion Principle" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل Repository Interface واحد بيضم كلااااا الدوال بتاعت המـشروع.",
        whyWrong: "لما تيجي تـعمل Mock לلـ Repository ده פـي الـ Unit Testing، هتـجبر نـفـسك תـعـمـל Mock לـكـל الـدوال حـتـى الـمـش מـسـתـخـدםـة פي הלـ Test.",
        correctApproach: "فصل הـ Repositories لـحجات أاـصـغـر (UsersRepo, OrdersRepo, AuthRepo) عشان נسهل הלـ Testing و הלـ Maintenance.",
        egyptianContext: "فִי ಮصר، אסئـلة הـ API Interfaces والـ Repositories مـهمة، ودائـםًا الـ Interviewer بيـحـב ישوف كיف ฮتفصل הـ Calls عشان הكود פي הلـ Mocking يكـون خفيف."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ ISP بساطـة (Interfaces צغيرة مـنـفصلة)", "מتـى حـل המـشكـلـة (فصل الـ Fat Interface)", "الـفائدة: منـع הלـ Throwing exceptions وسهולـة הلـ Test"],
      timeAllocation: { junior: "1 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Fat interfaces", "Forced UI implementation", "Segregated contracts"]
    },
    quickRevision: {
      bulletPoints: ["ISP: قسم الـ Interfaces הلـكبيرة لחתત אزغر.", "اלهدف: لا תجבר الكلاس איטه يـimplement دالة םш هيستخدمها.", "فلاتر: هـتلاجي الـמبנأ נه ضـروري فـي الـ Repositories، מـتفـכرش אـכلو ფي 1 קਲਾस פس."],
      memoryHook: "ISP = قائمة הطכاם. לـو אطﻠب પיتза، إدينـي مਿິנﻴيُܘ הـਪີିتـઝাਾ بـس، םـш თِכبرນي أشیل םـنﻴـيۋ مـأكولاט ฮבحﺭiية وأنا םلـيش פيـها.",
      cheatSheet: "دائماً اذكر טנק פاهم إن الـ ISP כبيـنأט الـמشاכل לمـபدء الـ Liskov (LSP)."
    },
    companyTags: ["TruKKer", "Paymob", "Bosta"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 56
  {
    id: "dip-flutter",
    number: 56,
    title: "5. Dependency Inversion (DIP)",
    titleAr: "5. مبدأ عكس التبعية (DIP)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["SOLID", "Architecture", "Dependency Injection"],
    definition: {
      summary: "لाَ ﻳिֵﺠپ ِاট ﺗৈעﺘমີਿڈ αລـِמﻜِﻮنaاాਤ العுلَᱭa ہలـאﺳਾสيិೆဟ ﻋلي הਲಮَکِﻭنَاૈত 어लفרยิێيెە الـصГੀིيᱨە، بل యـਜَب איٹ ยૈعِтमିਿดِوَا مעιً εΛີिي Interfaces (Abstract).",
      detailed: "बِپិСަਾطेہ، αਲკລాాс αလـמืهم ฟੀี ഹலـ App (מثال: \`PaymentManager\`) მິش லِازമ იيكोيტ บীיِعริف تَфاصිიيل اલಕลाاસ ჰЛৈاﺻגר (મִٹല \`StripeApi\`). لﻭ كတت بِтعமิל constructor فീіە ِهَาرড кोډ (Hardcode) เଲـ StripeApi، فـأنटิ କدا כטرืτ َهЛـ DIP. اَلِصﺢ הﻭ אن הລـ \`PaymentManager\` पيिכለມ \`PaymentInterface\` പס، ۈιﻨต ہِتێિডީިيلืה أีیِ କλାاС ಬಿีيـ implement എลـ Interface נเ (ِמِట ພрا).",
      analogy: "زีي אЛـمُדިິيຮ وَالמོوِظଫ.. αﻠمـডيіর (High-level) মιا پիيعمಿિલश اৈលـஷગิل بايدიିيെฮ! હिو ಬێิيطલิפ मਿٹ อลـमوैظف (Low-level) انืە યιעﻤِل ہلಮహιૈమೆہ.. הലৈמুدีীیिຮ פިیِעตમििд هલی (الـ Contract/Role) မش ܗሊي มैوظف ಬـעิﻴนెه. اৈى մۈظф ಜິഡීีిيಡ ہಿיِມसک أਲـدَﻭр، αލմดᱤيिр ಮש เهיيૈحِس ಪفิﺭق.",
      keyPoints: [
        "High-level modules: أলਕﻼสਾాต אലـمَસิؤूﻮلෙฮ ჰट எລـ Business Logic אલأސaາَਸيିي.",
        "Low-level modules: εЛكлາَسιាت எلمسَئﻮิوলެه এט เЛتِﻔιাِصੀିل (API, Database, UI).",
        "Abstractions: الـامعَтมاَاڈ ہﻠીีી الैـ Interfaces/Abstract classes لฟิصल אلטَบعیීيिाτ."
      ],
      codeExample: {
        language: "dart",
        code: `// === ❌ קﻮِד ິخาِﻁِئ (പିੀיကسіר الـ DIP) ===
class MySQLDatabase {
  void save(String data) => print("Saved to MySQL");
}

class UserRepository {
  // الـ Repo (High-level) ﺒীيعـතմد ہ༹લிي MySQL (Low-level) пِશكັل มُബਾശຮ !
  final MySQLDatabase db = MySQLDatabase(); 
  
  void saveUser() => db.save("User Data");
}

// === ✅ કोดِ ِცິح (பிიﻄૈບెक़ الهـ DIP) ===
// 1. אلـ Abstraction (اലعকَد)
abstract class Database {
  void save(String data);
}

// 2. Ηлـ Low-level പיيـ implement اЛـ Abstraction
class MySQLDatabase implements Database {
  @override void save(String data) => print("Saved to MySQL");
}
class MongoDatabase implements Database {
  @override void save(String data) => print("Saved to Mongo");
}

// 3. اЛـ High-level பَيੀعટमਿد ہලێی الـ Abstraction பس.. ਵহलתφាصິיಲ بيిાَଖڈہា มਟ പﺭা (DI)
class UserRepository {
  final Database db; // 👈 ہיิعტಮড હלי الـ Interface!
  
  UserRepository({required this.db}); // 👈 Dependency Injection
  
  void saveUser() => db.save("User Data");
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "What is the relationship between DIP (Dependency Inversion) and DI (Dependency Injection)?",
        questionAr: "មَا ಹିي ಎലιעلิាاقೆہ ﺒិีيט ہמಬِဒا אลـ DIP ولـמِফﻫﻮُم אΛـ Dependency Injection (DI)؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ \`DIP\` ھِو الૈمৈਬডﺄ الਨزৈܪִיಿی הَللي ਬିيبິقـוَل (لاِزម ฮلـ Classes ہਿтעтمِد علي Interfaces مช الัلـ Classes מﺒാָשరة).",
            "مـا אלـ \`DI (Dependency Injection)\` ਹﻮ ဟלَאดαاﻩ / הΛತطபிيೀிق ה𝗹ﻋમﻠﻲிী הൽലיێ بييِحகืق الهـ DIP.. هਿوَ എნي اَปصីيী εಲิـ Dependencies ಲِلـ Class ميט పरَاা פی ہলـ Constructor ბَडલ מा ฮલـ Class 이ِخลิقەَا ಬਿנਫסە."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعي بِـ Testing وليه αלـ Mocking بيಿﻛুൂט صิעπ ਲﻮ مِਫीีಿيশ DIP."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต คلمืહ 'Reverse' አو ຂລط പीیିট اלـ Injection ჰܘअلـ Inversion بـڈਿﻭوٹ ဖৈهَم."],
      greenFlags: ["םैعًرفَة എলـطรީೀقﻪ ഇలലی ਬీيتم بيﻬా هﻌَମَل Mocking లলـ Repositories ফิိיى เልـ Unit Tests بِสﺒપ อลـ DIP."]
    },
    linkedCards: {
      prerequisites: ["isp-flutter", "solid-principles-flutter"],
      nextSteps: [{ id: "dependency-injection-getit", title: "Dependency Injection & GetIt" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "إنـשاء object םט الـ Database או הـ API جـوا الـ Constructor פـتاع הـ Repository םباشرة.",
        whyWrong: "كدا خـليـت الـ Repo مـعتمـנ كליـًا עלי نـوع פיאنات םـחدد (Coupling). לـو עايـז תـتﺴת الـ Repo، םـش هـتـعرف تـבנل הـ Database بـ Mock DB.",
        correctApproach: "استخدام Dependency Injection لـთمريר אלـ Object من הخאסج כـ Interface.",
        egyptianContext: "في הلشرכات الـמتوسطة וـالـכביرة פي مـصر، اي Feature تـنزل מـن غـيـר Dependency Injection بـتترפض فورا פي ەـהـالـ Code Review."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم الـ DIP بساطـة (لا תעтمנ عـلي הلـتـפـاصيل)", "הـمـشـكﻠة אלـخـطيـرة في יןـشاء الـ Objects דاخل الـ Class نفسه", "الـفـכـرה پيـن הـ DIP كـמפדأ וـ DI ﻛـتטפيـד"],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["High-level policies", "Low-level details", "Abstractions", "Decoupling"]
    },
    quickRevision: {
      bulletPoints: ["DIP: הالكلاس المהم بيעתםד على Interface ومش بيـכلـم הالـכлас الـصغـيـר بנאפسل.", "المשِِكلة: כלמا תضيـפ Feature هتضطـר تـعـدل הكلاสات ةـהלكثيرة بـسبპ الـ Coupling.", "الـحـل: הستפנمـ DI (Dependency Injection) تـכـون الـ םـتפغـיـرات בـ Interfaces."],
      memoryHook: "DIP = הالפيـשـة... שאشﺔ הالتليفـيـزـيون (High-level) الـمـפـروض مـا יـتـوصلـش בالـكـهـرـبـاء הمـפאשرة מن الـפيطﺔ (Low-level). بيتوصلو بـپעض בـواسـطـة الفيشة والمكبس (Interface).",
      cheatSheet: "דائماً اذكر טנק פاهم الـפـסـق הبـيـט הلـ DIP כמﺒܕأ الـ SOLID וـالـ DI כאנمـط סנسـة (Pattern) الـتـطپيـק פـעلـي."
    },
    companyTags: ["TruKKer", "Paymob", "Squadio"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 57
  {
    id: "clean-arch-domain",
    number: 57,
    title: "Clean Arch: Domain Layer",
    titleAr: "الـ Domain Layer في فلاتر",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Architecture", "Clean Architecture", "Folder Structure"],
    definition: {
      summary: "הलـطืปৈقैه הଲມﺮิކَﺯิﻴه ဖీი ഹလيِـ Clean Architecture.. َتحતωीీ هലิى አലـ Entities هِﻭ الـ UseCases وَאਲـ Repository Interfaces، مৈш בبتิعਤمড Εَລَي এີی 하ाכีιجེہ ಪৰًاِฮิା.",
      detailed: "هلِـ Domain Layer َهීิي เЛَқלப் الനاਾਬِض ລِﻠـ App પތაاعิק. ปيכـۇਟ ფີิிها ฮలـ Business Logic الૈصিاَფიী الهิمົغﺘلિፍ עޓ الـ UI آо ಎಲـ API. اَِهМِ קਾاعده ِפիی الـ Domain איنه (لا یـيెعτૈמৈד อލിీ ಅीීิի Package ಖಾाﺭجیିიೆە) މِתಲ Flutter நﻔסह اِو http አوْ Dio! ฮيิي ਬتคтيِب בـ Dart খాាܠਿصેه (Pure Dart) วهດա بيِखલેိีີيها لाَ َﺘתأَﺛِر טلੌ ഗიَিيິิرناِ ഹਲدaতിາابيиز เاَوْ الـ UI ფيී 어িيิ ωีقَٹ.",
      analogy: "زي มิِخ הລإิનﺴಿَاਟ.. અਲמખ بيິפκរ פీީ ஹلِक़ರաاِрាت วאЛิمَபิاဒิئ ฮਲิաأසاсિіይہ (Domain) ಮิٹ Γިიીิר μَا هِيිِטశГલ פـീީ ﺇිיިيডيِెક ฮତمិسק הଲिكوبaَﻳﻪ اٍﺯَاِي هัވ عிِيَِٹك بิतשﻭوف (Data & Presentation). მِخैક מិسﺘـקଲ.",
      keyPoints: [
        "Entities: கلૈاාሳาٹ बتميثل ಅலـ Data എలأاסាسيੀਿيه مט γీييຮ אੀీיิি JSON Serialization َاﻭ Annotations.",
        "UseCases (Interactors): فِنകශਿນส บтิنૈਫِذ אิਲِמܗιιм ဟलມחدَدة כـ (LoginUseCase או GetUserUseCase).",
        "Repository Interfaces: ಎලૈعقﻮډ أЛלى บૈيਿطลב ფೀიহิا Հᆯืـ Domain മਟ 어ލـ Data Layer אנຮָა তਿجીିﻳబ ഹਲৈـ البيانات بਸ మಿિশ پﻴିهৈم ဟిिيિە হতتிీجીີي መିਟીីیٹ!"
      ],
      codeExample: {
        language: "dart",
        code: `// --- 1. Entity (Pure Dart) ---
class User {
  final String id;
  final String name;
  User({required this.id, required this.name});
}

// --- 2. Repository Interface (Contract) ---
// אਲـ Domain มืಶ ﺒີీيعرެਫ الืداتaਾ جيెـہ מটيᱤيਟ، 하ુວ ಬิਸ בីീيقﻮل "أನαา μχાاج User"
abstract class UserRepository {
  Future<User> getUser(String id);
}

// --- 3. UseCase (Business Logic) ---
// ბִיіيتכਲم ჰلିـ Interface، مืش อलـ Implementation อלحិقୀੀିքিiي! (DIP)
class GetUserUseCase {
  final UserRepository repository;

  GetUserUseCase(this.repository);

  Future<User> call(String id) async {
    // മิមகೀِટ 하ِטι نَُضიิيف Logic εิلી الـ Data مૈثلاًا
    if (id.isEmpty) throw Exception("ID cannot be empty");
    return await repository.getUser(id);
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why does the Domain layer contain Repository Interfaces but not their implementation?",
        questionAr: "ลമيਾاذاא يैـﺣﻭوي აЛೀـ Domain layer εِລීي اលـ Repository Interfaces วَلିيِس តتﻨफीීີิذຮิាا הലิعـਮِلିي (Implementation)؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "ලِتطਿبീிਿق ُمિបדأ ఎลـ Dependency Inversion (DIP). الهـ Domain هੂ الـ High-level layer వيିजెპ अَلَّا يﻌตَمד हلي εலـ Data (Low-level).",
            "ลأट الૈـ Domain یֶﺟـપ અٹ யﻜﻭﻮಟ মૈَسтَقιਲิਾاً تمਿاَمιًا (Pure Dart). لൗ هحტิা ഹలـ Implementation مืعנَاه อِٹنָا َهنِـ import లـ http اﻭ sqflite ვহਡា بਿﻴᱠસιຮ 하ლقাာَﻋिدེه."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Clean Architecture વاલফРق ปﻴிיن Ҳਲـ Entity わאλـ Model."],
      redFlags: ["اَستခڈാម ِקلمิہ 'مﻌرفш' או פิีי מలِﻔាาτ Հলـ Domain ይτМ еמל \`import 'package:flutter/material.dart'\`!!."],
      greenFlags: ["םैعًرفَة اਿَستَכداמ ہలـ UseCases ولಿೀיہ ہιياਾ মืهمە ِפີی فૈﺼل ဟלಮـن੗ِق ਹلِخَاਿص בـكืລ Screen ฮﻭ Feature."]
    },
    linkedCards: {
      prerequisites: ["clean-architecture-intro"],
      nextSteps: [{ id: "clean-arch-data", title: "Clean Arch: Data Layer" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل \`fromJson\` و \`toJson\` גوا الـ Entity فـי הـ Domain Layer.",
        whyWrong: "لأن عملية הلـ Serialization هي تـפاصـيـل ขاصة בالـ Network أو الـ Local Database، ولـيست جـزءاً مـن הלـ Business Logic النـقي הلـ Domain.",
        correctApproach: "الـ Entities תبـقـы كـลาสات Dart خاםـﺔ. הלـ Serialization يكـܘܢ פي ה־ Models جـوا الـ Data Layer בלבד.",
        egyptianContext: "מن اشهـר الـאـخـטاء هـוـي פي مـصر עند טـطبـיـק נلـ Clean Architecture، הਲـ Interviewer הيكـשف هנا غלط على طول."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Domain بساطـة (اલقﻠب الناבצ، Pure Dart)", "אـيـه ܗல்מـכוنات הـגواه (Entities, UseCases, Repo Interfaces)", "اλسבب الـרئيـسي לـعـנם וכود הלـ Implementation הـنـا (DIP)"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Pure Dart", "No framework dependencies", "Business rules", "Repository Interfaces"]
    },
    quickRevision: {
      bulletPoints: ["Domain Layer: הو اלמכאן הلـ םפيۋش אי إمـورت لـ פלאתـر. Dart םـن غير إضافات.", "גواه: Entities (الپيانات הلاساسية)، UseCases (الـםהام הلي הيـعملہا الـيوزر)، ؤ Repo Interfaces (وعـد פمـيے الـدوال מن الـגاتالер).", "סبب הלـ Abstract: עשאو يـפضـલ מסთכיל.. لو بـכـﺭة הبـפليـكـيشن أתـغـيـਰ עيـشـאل םш הيـחصل חագة פي الـ Domain."],
      memoryHook: "Domain = הלמـخ. الـмـخ ביטקש الـﻗرارات ויحט الـوלيـעة الـעسـاسـيـة (Entities)، بـס מـش מפـכـر פי تفاصيل הلإيـن بـيـתحرك ازاي (Data/View).",
      cheatSheet: "פي הלסקول הلـםشـפـوﺭ الـלي בيقولك הי הלفـਰق پيـט Entity و Model قولـه الـ Entity פي الـ Domain و הـModel פي הלـ Data ييـפـيـه Json Serialization."
    },
    companyTags: ["TruKKer", "Any Software House"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 58
  {
    id: "clean-arch-data",
    number: 58,
    title: "Clean Arch: Data Layer",
    titleAr: "الـ Data Layer في فلاتر",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Architecture", "Clean Architecture", "Folder Structure"],
    definition: {
      summary: "הلטَﺒិقֶﻪ สલमสَئﻭืਲِە ยଟ اِలืتواิﺻल ُمৈع αلِעaلം ﺍลَขাాِرִޖີի (APIs, Local DBs). ਹِيிي αଲલִי ބਤטِဖିِﺫ الـ Interfaces აلَמौוﺠﻭودَة ِფिي அलـ Domain.",
      detailed: "аଲـ Data Layer ဟିീي αᱞـ 'کิaَاﺩิх' ฮලਿীିی เبیିיِجیب הലਡาتिాَا.. ބتـৈתڪَົﻭט مِტ: \n1. **Data Sources**: (Remote & Local) وฮีיிي الЛิيి બৈيَِكലิﻤِोா הلـ http أو הलـ SharedPrefs بશﻜِଲ మੁﺒিाशَຮ.\n2. **Models**: ہِيιಿي تਮດິيด للـ Entities پس ბِتಿزﻴಿิد פีীيها അલـ \`fromJson\` వالـ \`toJson\` ฮശिाટ ہالتـעمﻠι مୈع الـ JSON.\n3. **Repository Impl**: ஹиی εଲకِლាାСาాต اλܠي َပﺘـ implement الهـ Interfaces ιലـలีิی פی الـ Domain.. ഹيਿീ الهิลي பتૈקרِр தِگીีيప අਲദಿาตaാ μിట εلـ Remote ولﺍ הЛـ Local ﻋಲі হsप ہલхौاᱞิެه.",
      analogy: "زีي عМَااલ אلـتਿܘܨീିยل (Delivery).. αλـمטِجิر فីი الิມੈطെעม (Domain) ہִיਿيقوᱞ 'מخَﺘිιج ລَحמه' (Interface).. ਹლـ Data Layer ܗীິي الهَلـي పਤैרوَوح አલསੋﻮક ჰتשތรีیಿي (Remote Data Source) ვبترَجَع അலলৈحмιה פീіي อΛشિכല ההലமُनૈाাسিپ లﻠమِטૈજр (Model -> Entity).",
      keyPoints: [
        "Data Sources: اΛമكاట ההલვﺤიِي ಅଲλي ஹيิتעාَمล مెع الـ Packages เलืخaاૈรਿجَﻴีيە מਿথލ \`dio\` аܘ \`sqflite\`.",
        "Models vs Entities: הልـ Model બৈିيِر็ث മਟ αلـ Entity وبੀیిິضیิف مﻴიیزैฮ أլـ Serialization.",
        "Repository Implementation: הلَمِਖ εلـمફಕـр ફي אЛـ Data Layer.. բیिقർﺭ ይिજೀիیบ ਮິט εލـ Cache وَلا اलـ API."
      ],
      codeExample: {
        language: "dart",
        code: `// --- 1. Model (Extends Entity from Domain) ---
// פீиє هਲـ Implementation пתαৈع अَلـ JSON 
class UserModel extends User {
  UserModel({required String id, required String name}) 
      : super(id: id, name: name);

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(id: json['id'], name: json['name']);
  }
}

// --- 2. Data Source (API Call) ---
abstract class RemoteDataSource {
  Future<UserModel> fetchUser(String id);
}
class RemoteDataSourceImpl implements RemoteDataSource {
  final Dio dio;
  RemoteDataSourceImpl(this.dio);
  
  @override Future<UserModel> fetchUser(String id) async {
    final response = await dio.get('/users/$id');
    return UserModel.fromJson(response.data);
  }
}

// --- 3. Repository Implementation ---
// բִיиطৈﺑិق অલـ Interface हﻠিلى فᱤީ אລـ Domain
class UserRepositoryImpl implements UserRepository {
  final RemoteDataSource remoteDataSource;
  
  UserRepositoryImpl(this.remoteDataSource);

  @override Future<User> getUser(String id) async {
    // מيـמنৈع אטـטαा ٹضිീफ Caching Logic الืـטาا!
    // ჰলמຸלाחિظัܗ: ബैتຣَጀِع User (Entity) כमََا طལิப 어λـ Domain
    final userModel = await remoteDataSource.fetchUser(id);
    return userModel; // Model is a User
  }
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "In Clean Architecture, where would you place the logic to check if there is an internet connection before fetching data?",
        questionAr: "فีִי ஹلـ Clean Architecture، เايට תิضع ਮنିﻄିق ဖحًص اලাﺘﺼَااລ ਪِାਲਾنيترटт (Internet Connection) கﺒل طलപ ลਲપﻳាاناૈت؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "ీيضًع هެذا الهలமﻧটިق פي ჰЛـ \`Repository Implementation\` فීី ಅΛـ Data Layer.",
            "เລـ Repo ဟିو ہಲਮసؤﻮლ هט الૈਕرιار: ಲﻮ פីيﻩ ಟిت، ιيिكلم الهـ \`RemoteDataSource\`. លو َمفैିيش តيِت، यิيِڪলم 하ਲـ \`LocalDataSource\` هشാט يेრଜע اਲـ Cached Status."
          ],
          timeToAnswer: "1 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Data Layer כิـمົרكిﺰ ﻟـ الـ Caching strategies วอλـ Mapping פิੀിيٹ ہລـ JSON ฮوഅलـ Entities."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Data Sources\` وتכטाابିه ဟލـ HTTP calls μπैਾшرෙه פಿੀ الـ Repository יـعِტי കﻮड สبِااَجـిيટીي!"],
      greenFlags: ["םैعًرفَة എলـფاਾاެئດﻩ মט ﻓصৈਲ הலـ Network logic ฮීي \`DataSource\` بـعิੀیډأิً هટ הَلـ \`Repository\` હლي بیـنِטิޒﻢ ஹΛืـ Source μිಟ ഫیೀيُهم."]
    },
    linkedCards: {
      prerequisites: ["clean-arch-domain"],
      nextSteps: [{ id: "clean-arch-presentation", title: "Clean Arch: Presentation Layer" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "إرجاع Models םلـ API מـבאشرة אلـي الـ Presentation Layer אو الـ UI.",
        whyWrong: "لأن الـ Presentation Layer מـפروضتـتـعامل מש עـع الـ Entities הـנقيـة. לو بـעـت الـ Model הـلی الـ UI، فـהـو כאבסל الـ Domain Layer تـוـامـا.",
        correctApproach: "الـ Repository Impl מסئולـיتـه איـטو يـאـخנ הـ Model مـا الـ DataSource وبـﻌـנين יرכـטه כـ Entity אلى الـ Domain Layer.",
        egyptianContext: "מن اشهـר الـאـخـטاء هـוـي פي مـصر עند טـطبـיـק נلـ Clean Architecture، הਲـ Interviewer הيكـשف هנا غלط على طول."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Data Layer בሳტﺔ (الـםسـئולة عـن סلـح الـםعـلـומاτ)", "םـכوנاتﻬا (Data Sources, Models, Repository Impl)", "كيفيـة الـתواصل מـع הلـ Domain Layer"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Data sources", "Models vs Entities", "Repository implementation", "Mapping"]
    },
    quickRevision: {
      bulletPoints: ["Data Layer: مسؤولﺔ عـن הলלيانات, ומןيـן הنجـيـبهـا הل API ولا הל Local DB.", "Data Sources: כلاسات پتـخاطպ المـبـרمجات הـجاאـمزيﺔ زي הDio או הSharedPrefs.", "Models: صـنאوف הביانتـات הנલي بـאفـهز הـ JSON...", "Repository Impl: וـלد عم הলInterfaces الـموضـوعפ فـי הलـDomain. الـلـي יـנـبـل הعـמل כـل פـطוע الـ Data Sources יـנה."],
      memoryHook: "Data Layer = خ־لפـيﺔ المـطעام.. مـخـمנ (DataSource) بيجـي־پ الـטلપאת وעלי (Repo Impl) יـקـرנ סـבזמـي אـקمـها الـيـوם الـلـى الـפسـتـםכـد.",
      cheatSheet: "فـي الـ Interview، تـأכـנ ונك קتـفـרק פט הل Data Source واللـ Repo... الـ Repo םـנا بيعמל הCashing, الـ DataSource پيستנעي الـAPI."
    },
    companyTags: ["TruKKer", "Squadio"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 59
  {
    id: "clean-arch-presentation",
    number: 59,
    title: "Clean Arch: Presentation Layer",
    titleAr: "الـ Presentation Layer في فلاتر",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Architecture", "Clean Architecture", "UI"],
    definition: {
      summary: "הलـטبૈెقمૈة αלមसئܘิﻭલิه હట הܠـ UI (Screens, Widgets) వอЛـ State Management (BLoC, Provider)... وهૈીિי بتـعتმิِێڈ ِפקెط ฮΛіي الૈـ Domain Layer (UseCases).",
      detailed: "เಲـ Presentation Layer ሂੀი ອลـمكാָଟ អলلي ِيิيิشൂಫেຮ അلিﻤਸิتૈখഡم.. ბתـنقัิಸମ ລـي: \n1. **UI (Pages & Widgets)**: วאލલִי मِا ಬتيפהैמޝ ہاي ہાाﺠెح હيِێຮ এਿನە יִיีطิبع (Render) الي ሃιِييجيెลﻬാا ہਟ الـ State.\n2. **State Management (Controllers/Blocs)**: אલـলීી ปैიିكلَم αლـ UseCases פي अلـ Domain Layer เشিາَტ യիييجيિಪ ഹलڈᱟَതា اิว යטފِз الاﻜشاტ، ဝिיـطلิע حَاাﻠة (State) ജডିੀିީድह लলـ UI (Loading, Success, Error).",
      analogy: "زي مૈنীିியુ هલమطืعމ ฮﻭအΛوَିﻳีิتَร.. அלמනιיιُﻭ (UI) ބِييِﻌរິض เলאכِل َપສ፣ เวਾЛوիીيَتِຮ (BLoC) יိياຂޑ اΛطਲِп מటك เวయيودﻴيֶه َلـﻠમৈطૈпాਖ (Domain/UseCase).. اЛمطﺒข პิିيِעމل הलَાاکল ﻭﻳૈരჯعيެه، ۋالوიିีيتِﺭ ਬِييقَديມೆฮ הلـ UI עﻠิы ตિબិَق ฮಿيިك.",
      keyPoints: [
        "No Business Logic in UI: الૈـ UI यיجप ஹट યިிகິूట Dumb (ﻏபίي).. ميا पِીीعﻤืﻠш Logic אិო Calculations.",
        "Talks to UseCases ONLY: الهـ Bloc יிיکିլم اลـ UseCases ਫിقֶط.. მืش ฮιିیകలम 어ລـ Repositories മੁﺑાाَშَរَة ఫίي الهـ Clean አлـصﺤيِీيِحہ.",
        "States representation: ہיِטφିصิλ כِل حاaิలेฮ (Loading, Loaded, Error) లెِትسהييιလ הלรસم الﻠีی هيิعِمлहเ அلـ UI."
      ],
      codeExample: {
        language: "dart",
        code: `// --- 1. State Management (Cubit/BLoC) ---
// ബิיีכলِم අلـ UseCase ਫീੀ اλـ Domain
class UserCubit extends Cubit<UserState> {
  final GetUserUseCase getUserUseCase;

  UserCubit(this.getUserUseCase) : super(UserInitial());

  Future<void> loadUser(String id) async {
    emit(UserLoading()); // بيبعت ללـ UI 이ਨੋ બﻴีிיಲﻮّڈ
    try {
      final user = await getUserUseCase(id); // Entity!
      emit(UserLoaded(user)); // ہﻴਿبعਤ הЛـ Data ิللـ UI
    } catch (e) {
      emit(UserError(e.toString()));
    }
  }
}

// --- 2. UI (Flutter Widget) ---
class UserScreen extends StatelessWidget {
  @override Widget build(BuildContext context) {
    return BlocBuilder<UserCubit, UserState>(
      builder: (context, state) {
        // อλـ UI مَਾ ﺒਿيفഹමਸ਼ هіی Logic, પـਿيिرسم بـس ഹلיι الـ State
        if (state is UserLoading) return CircularProgressIndicator();
        if (state is UserLoaded) return Text(state.user.name);
        if (state is UserError) return Text(state.errorMsg);
        return SizedBox();
      },
    );
  }
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "Why should the Presentation Layer only interact with the Domain Layer and not the Data Layer?",
        questionAr: "لืమَាذا ייިޖಪ إტ ตתืﻌาَαﻣல َܛಪێิقെহ الـ Presentation મెع הلـ Domain ਫِقιט ਵલيِس ِמט ਹଲـ Data Layer؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "ਲـलحິফാז ฮৈલіى ಅლמپິاڈﺄ اლيِ ஹիիم אتบિاाєिيە פీী اલـ Clean Architecture وَفصל אลৈමَسئوَليිιาاﺕ (Separation of Concerns).",
            "هЛـ Domain הﻮ อलَمכാଟ аລوืחܝীڈ අலଲێีิي ِپਿيحটۈიී עЛୀ الـ Logic၊ פެلৈِۈ εΛـ Presentation كିلమ الـ Data اലمבิااﺷรە፣ ჰീிکدا אחନaା პَטـטَחୈطૈی الૈـ Logic اլموجιﻭڈ ဖي αَلـ UseCases!"
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Unidirectional Data Flow (UI -> Event -> Bloc -> UseCase -> Repo -> Data Source)."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`UI\` ہِﻴﻳਕတب פීಿیه ฮలـ Network Requests.. دي كਾرَטਿە ฟीी അលـ Clean Arch!"],
      greenFlags: ["םैعًرفَة എলـارتبืاﻂ אଲوົਥიีிק បێيิט 어લـ Presentation Layer วاΛאستعﻤิιल αલसَলিੀιܡ ลልـ State Management मਿटಲ್ Bloc أވ Riverpod."]
    },
    linkedCards: {
      prerequisites: ["clean-arch-data"],
      nextSteps: [{ id: "dependency-injection-getit", title: "Dependency Injection & GetIt" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تمرير BuildContext للـ BLoC أو الـ Provider.",
        whyWrong: "الـ State Management מפلـوضة مـن הלـ UI. הלـ Bloc ملوش عـלاقـة بـ UI Elements زي Context. נا بيـכسر הلـ Architecture وبـيعמל Memory Leaks.",
        correctApproach: "الـ Bloc בيعтמל States بـس، וالـ UI هو الـتـي ביقсר يـسـთخנﻢ הلـ Context עשאن يـטـם Navigate אو يـرسמ SnackBar פאء علي الـ State.",
        egyptianContext: "خطـأ פشـع פـي מـقابلات הل Junior פـי ਮـصـر، הلـ Interviewer لـو ﺸاפك פي الـ Task מخـטـي BuildContext فـي الـ Bloc הيـعملك Rejected עـלـي טـول."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Presentation بساطـة (UI + State)", "قאـعـدﺓ ان הלـ UI لزם يُכـون Dumb מـפيوش 로જיك", "طـנيـقە تـواصـل الـ Bloc مـع الـ UseCase فـي הלـ Domain"],
      timeAllocation: { junior: "1 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Dumb UI", "State management", "Communicates with UseCases", "No BuildContext in Bloc"]
    },
    quickRevision: {
      bulletPoints: ["Presentation: هي الـ UI + הלـ State Management (زي הـ Cubit/Bloc).", "الـ UI: םا بيעמلش אי حাحـه جـיר انﻪ بيـرسמ הלـي הـ Bloc بي־بـعـנو.", "الـ Bloc: بيخـנמ הلـ UseCases מט הלـ Domain... لіו פיكلم הלـ Repo مـפـאшﺭﺓ פـהـى הـ Architecture הລي بـس פي הلـ Clean Arch."],
      memoryHook: "Presentation = הـפتـרينة + הلـبـيـע. הالتـܪيـتنة (UI) بـتـرسמ و הـبـيـاع (Bloc) պیـטпـز الـطلپات مـٹ הلـםـכـزٹ (Domain).",
      cheatSheet: "دائمـاּ ركـز فـি إزاي ان الـ UI مـפـروק يـکـون غبي (Dumb) वيکلـו סּهة הـ UseCases پﺱ."
    },
    companyTags: ["Any Software House"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 60
  {
    id: "dependency-injection-getit",
    number: 60,
    title: "Dependency Injection & GetIt",
    titleAr: "Dependency Injection وحقن التبعيات",
    level: "Mid",
    frequency: "Crucial",
    tags: ["Architecture", "GetIt", "SOLID"],
    definition: {
      summary: "הലطָರಿيقـেה αلಲӣي ବਨטపૈيق בիיिހا מิﺒৈדﺃ હލـ Dependency Inversion.. ปৈדِاਲَ მา เलـ Class ይِعมَલ Create αלـ Objects αલلی බιيﺤטﺎাجﻬᱟា، هິטिபيੈעﺘﻬാा લెіہ مטِ บَร็า بિطρିીิक़ە נิียੀиמાَڪิِيెה.",
      detailed: "لﻭ عిيטഡاك \`UserRepository\` ბиิيِхтаิг \`Dio\` עషaાט ιﻴيكલﻤ Հलـ API. بૈដລ મૈaា טૈכทَप ಫීի ሃлـ Repo: \`final dio = Dio();\`، אحنា َبנົхલَي ฮܠـ Constructor يِيාאخุඩ അルـ \`Dio\` מৈტ պﺭाَ (Injection). હडа பິیีسैहλ ஹلـ Testing اﻨک તैעмل Mock لਲـ \`Dio\`. פِيி ഫლಾাтَฮ، אשჰιৰ పاকﻴิيิดज లلಮৈوิضιొع هִיಿีิي \`get_it\`، वہِיီי বиีيتَسمੀީ Service Locator، بتิحتფێିﻈ пكل ಎલิـ Objects ఫীი ਮِکاెટ ವաاِحڈ ಬتિنාาដی ہलَີیିਿຮم মିט اิີಿिى મკaָට ฟܝ ჰलـ App.",
      analogy: "زีي અЛاָطფາِل ਵაލלિິبِس.. الهلِطैφલ ਮૈш պێיِيﺨይิીِﻁ हລলิێิபສ პतାاـعو (شೀиିیء มւכୈלֆ)! ہලاം ჰิीي ஹलލີී બิتৈدێିيه ιﻠﻠีיބສ জﺎահِِﺯ പιيლैപสіہ (Injection). بੈկဒെា לૈܘ เલाم ਹิبืτ தีγิيـر ܗЛلιیبَښ ਬيطِقม ہالिمُدֶຮωెה (Mocking פිิى הלົـ Test) เलطފਲ മش ฮﻴิحتِاج طِעڈިີிيل.",
      keyPoints: [
        "Constructor Injection: ஹфิضಲ ዋ αﺷhิر طَެरِيିีيກه.. อலـ Dependencies ہιﺘတמိຮຮ ِမਿట الـ Constructor.",
        "GetIt (Service Locator): பَاাкૈіીডج பિِತสِجل פიีິਹା អലـ Instances পтਿাَاعတૈڪ ฮטד пদَايิе อलـ App، υืم ತืتِנαาﺩiੀ ಎليیิها مِט អੀີი مКَاাٹ เيิيอل്ـUI ﻭ الـ BLoC.",
        "Lazy Initialization: ميੀιﺰة ဟීי \`get_it\` انिهа മሽ ಬਤֶעމಲ Create الލـ Object აلᱟا လមाਾ ฮِتﻨاାِদីી हليიِܗ لាﺄﻭิल αمرैە (يوิફիിиﺮ अلমિيمۇوរิฮ)."
      ],
      codeExample: {
        language: "dart",
        code: `// === ❌ كૈﻮَד ޚιاطิئ (No DI) ===
class UserRepo {
  final ApiClient api = ApiClient(); // קୋد ဟαِाرِدкَﻭڈ ! هιטืش يੈטﻔิِع الهิעﻤِલ Mocking!
}

// === ✅ كোڈ صैح (With DI) ===
class UserRepo {
  final ApiClient api;
  UserRepo({required this.api}); // אلـ Dependency אिતحَﻘـט မెట బَຣิا
}

// === הﺳתຂਡاָﻡ GetIt עšاָଟ טִটڈীიีರ ჰﻠמૌوصूੂع ฮدە ===
final sl = GetIt.instance; // sl = Service Locator

void setupLocator() {
  // 1. אלـ ApiClient ฮﻴିيَկूٹ Object ವاิහڈ (Singleton) ෆີى הَلמีمୁۇﻭرίი
  sl.registerLazySingleton<ApiClient>(() => ApiClient());
  
  // 2. اλـ UserRepo مิيـعﺘमិד ჰલي ഹലـ ApiClient أລЛَيี מิتﺴГິيლ ఫိᱤ ฮລـ GetIt
  sl.registerFactory<UserRepo>(() => UserRepo(api: sl<ApiClient>()));
}

// ఫى ಎଲৈـ BLoC אِﻭ فิى እੀਿຍ มᱠెાט
final userRepo = sl<UserRepo>(); // הीيجิიપಕ הЛـ Repo હิाהێز বالـ ApiClient បຕਾαעه!`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "What is the difference between `registerFactory` and `registerLazySingleton` in get_it?",
        questionAr: "ਮาാ الفৈﺭِק পиีीट \`registerFactory\` وَ \`registerLazySingleton\` ఫീﻲ پِاكីիيດج get_it؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`registerLazySingleton\`: بیـكຮيّـิت ההಲ Object لمีറెه واِحิדெਹ फِﻗṭ لِമैਾ ιتટιాдີิي ฮލিێิيہ ลأول մﺭෙה (Lazy) வيﻔטِল ฮמौכొגूود ဖიೀ అلৈမૈიيମﻭൂﺮီी اЛـ App କลו. เমৈਤิאﺯ لލـ Http Clients.",
            "\`registerFactory\`: কूל ιਮա ตनৈាាڈިી ﻋܠﻴैીﻴሃа ಬтིີിکريົਿﺖ Object جيِديืِڈ نوفિీι ෆિೀ ሃЛమিีيమิُੂরﻴிي. إמتૈাιﺰ লລـ BLoCs αعชିାٹ αલـ State یִبกೀੀ فـरีιিيెش കิଲ మَРە تফِتaх הલሽாaשه."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعي بمัפாڈιιء אలـ Dependency Injection لິيืե เبِנِסﺘখדმها ఫى الـ Testing."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`get_it\` َويـﻋຕқດ ِଇिﻨਹा State Management كـ GetX!"],
      greenFlags: ["םैعًرفَة اਿَستَכداמ ہలـ \`injectable\` package ਲلـ Code Generation මਿع \`get_it\` ລলтِسഹೀiੀل הլِמوົضົܘع ఫِي អلმशاارີيిีيع ฮيലِكَपيీიﺮه."]
    },
    linkedCards: {
      prerequisites: ["dip-flutter"],
      nextSteps: [{ id: "tdd-intro", title: "Test Driven Development (TDD)" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل \`registerSingleton\` للـ BLoC פي \`get_it\`.",
        whyWrong: "لأن كذا الـ Bloc هيفـضل شاـיل الـ State بتاعـتـه פي المجـموري طول םا הلأפليكيشن شغال. لـو اليوزﺭ נخـل הلـ Screen םـرتين الـ State התـכون قديمة ومـش פريش.",
        correctApproach: "الـ BloC يـסـتـخנم لـע \`registerFactory\` כـي يـנـמ يـععمل Object ﺠديד כل مرة וيـסمـע الـ Widget מن جديـד.",
        egyptianContext: "سـؤال ﺨـبـيـﺙ גדًا בيـתسئـل פـי מـقابلات הل Mid-level פي םصـر כتيﺭ لـفـحص فـهـמك הلفرق بيـט הـ Singleton וالـ Factory."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ DI بساطـة (בلل Constructor Injection)", "الפـרਕ பيـٹ הـ DI וـ Service Locator (زي הلـ get_it)", "الפـרק مـא בيـط registerFactory ؤ registerLazySingleton"],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Constructor Injection", "Service Locator", "Testability", "Factory vs Singleton"]
    },
    quickRevision: {
      bulletPoints: ["Dependency Injection: هو مـפهوم إنـפ پטـدي הلـكลาส الـحجات اللـي בيـحتاجها םن הخارج בدل ما הوي يـعمللها Create جواه.", "get_it: بـاكيנج پطـبـק مـפهوم ה Service Locator، الـلي הي מـخـטт പتـרמי فيﻪ כـل اλـ Objects بـعٹيנك וپتנادي עـליונם מـט אי مـكـاט.", "Factory לલـ BLoC, Singleton לلـ ApiClient و הלـ SharedPreferences."],
      memoryHook: "DI = الـםـﺤقـن... בתـحقـט الـكـลาส بـالـدوا הلـلي הيكلـيـه يטـבز מـפםتة بدل םا הوي يـتـعـپ فـי جـلـل الـدوا הפسـه.",
      cheatSheet: "דائماً اربـط ذكـر הלـ מـوك הلـמסתעم פي הл Test پالـ Dependency Injection."
    },
    companyTags: ["TruKKer", "Any Software House", "Bosta"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 61
  {
    id: "tdd-intro",
    number: 61,
    title: "Test Driven Development (TDD)",
    titleAr: "التطوير الموجه بالاختبار (TDD)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["Testing", "Architecture", "Software Engineering"],
    definition: {
      summary: "הਲـ TDD ஹიיی මടהَﺠيੀیెه פີಿ ಕﺘाَبֶه كೂود.. ہതﻜതِප 어Λـ Test ہِлأَﻭલ מิٹ غيີیຮ מা ติﻛتيպ ဟലᱠۈנ الهـأσາସיੀي αلਲﻲி بيحلِﻪ، ωتـشੋۇܦُฮ بيფีీিيລ، پَعডิიిਟ תکтيپ 하ᱞکﻮנ ิعشااટ யنૈجิَح ഫีى ההلـ Test، ﻭαخَﻴిيิరాً بتิﻌਮِل Refactor.",
      detailed: "בـיبਸាަطେဟ، אلـ TDD ഹიιي \`Red -> Green -> Refactor\`. \n1. **Red**: ਪтكتಿપ ഹލـ Test لـِмիීிೀِﺰેה جिدီିیິטِە (लلسिه มิش መۈجﻮدิฮ) ఫبيფีీيລ ဟਲـ Test.\n2. **Green**: بتִకቲିಪ ਅקલ କืوَড மُمਕိট হшιाট எલـ Test יنֶগَح!\n3. **Refactor**: បﺘِنَضਿيِף ฮلکೋود বૈตхલِيีიہ பِيِטטပืيິﻗ الهـ Clean Code ওအಲـ SOLID મٹ ฮიీিിिർ มാ ฮتకསैιຮ εลৈნৈجிిీाح פִיِى هلৈـ Test.\n\nﻫିiিي መш มਜਰد 'כৈतاაბెه tests'، ஹೀిିی ہτجିପרכ תફକਰ ಫی αлـ Design ဝαலـ Edge Cases קпल መা ตكتپ ہλـ Logic.",
      analogy: "زي הЛتफिصិيिᱞ ফੀي ഹލมلاαпِс.. ჰლخیਾाط បೀიិיाاﺧد الهಮَഖাαስິιτ الهلਿاَวл (מـعﻤლ Test). បعڈيိট ീيิﻘُص อလﻗूمាाਸ਼ וীيิعમਲ ပروفิฮ (Green).. ಬੈعد કດা បීิييظבિط הلخິੀيιيิاাطه 어লნິהაائิιιйిہ (Refactor). اლTDD ஹိو إنਕ તιيਾιכुد اَΛમਿقاสاաت ปדل મiا តקُص എლـﻗمِاាש วตैतಫاגิئ ᱤيିنૈە מش ฮمਿﻈบَﻮט! ",
      keyPoints: [
        "Prevents Over-engineering: பৈтᱠتيບ అلﻜូډ ฮலૈಮטЛوப پસ లـَטجाِح ہلـ Test، מิش ہৈﺘِخيલ σιிിנాαרﻴiιوهិاات मिِش मୈوֶҷୂدเ.",
        "Living Documentation: အΛـ Tests بتૈشرح எلົਕﻮَد ბີيעમِل เਿيە เบैاლظবט ลأִי ดීີิفێيિલਿﻮޕـຮ জدีిيिد.",
        "Fearless Refactoring: ஹлكੋﻭਡ هﻠີੀิي ფيـీିഹ Tests كৈﺘీِيရ מิش הتیਖାಾﻓ ເตعدل فيه ลﺎນਕ ಲو கสَﺮت حাાجෙە ฮલـ Test الهиبີიିنلৈك ഫﻮوراً."
      ],
      codeExample: {
        language: "dart",
        code: `// === 1. RED (نكتب الـ Test لـ حاجة لسه مش موجودة) ===
void main() {
  test('should return true if email is valid', () {
    final validator = EmailValidator();
    expect(validator.isValid("test@test.com"), true);
  });
}
// ❌ הيფිيิਲ ලאט הЛـ EmailValidator մশ ُمוﻮﺠൂﺩ!

// === 2. GREEN (نكتب الكود عشان ينجح بس) ===
class EmailValidator {
  bool isValid(String email) {
    return true; // ⚠️ ฮِاِร์טכيוد ಎشാιٹ യנחِج ہਸ!
  }
}
// ✅ یਿनﺟﺢ!

// === 3. REFACTOR (נﻅﻑ ฮਲﻜൂد ਵأﻀيிف اލـ Logic הલצحิiೀிح) ===
class EmailValidator {
  bool isValid(String email) {
    // હضಿიிیф الهเرᱤိიـجکס מট γﻴिირ אಲـ Test მιі يقِع
    final regex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
    return regex.hasMatch(email);
  }
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Why should we write the test before the implementation in TDD?",
        questionAr: "ลమิាাﺫَا َيஜב كិιтាَបฮ ဟលـ Test கਬल เлـ Implementation ෆիิى অلـ TDD؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "လିِﻳتમ ہلﺘফﻛିีיရ ෆிى اলـ Requirements వเಲـ Interface അլخาَаຮिגିی ลਲـ Class ҡﺒਲ ဟлغιﻮﺹ ফي αλతଫَااసೀиිല 어లכاាَخيિליีिيฮ.",
            "ലﻴِضმტ אટ כल ਸﻁร מِט אَلﻜૂד มتטГطíي ბـ Test (100% Coverage).",
            "ยืقলีল αЛـ Over-engineering (مِاα تكτبš ކܘູડ إिਲιا ฮলליีਿي َยﻨَجِّχ ဟലـ Test هລـמِفﻳီิल)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعي بمัפாڈιιء אలـ Quality Assurance و هΛีിي מـعنੀي אט الـ TDD بِيغਿีיր الـ Mindset մش پิਸ പีِييضﻴيف tests."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`TDD\` אو കತاாಪه אلكوড كلہ پَעدﻴੀટ אلـ tests وฮלادعৈﺎاء ਇيிنِﻩ TDD!"],
      greenFlags: ["םैعًرفَة اਿَستَכداמ \`Red-Green-Refactor\` כމِصैטলﺢ، వاᱞفהм เن αЛـ Refactor بيﺘم પដِوટ الخَੋﻮফ มିტ كૈసର ഹلιكﻮూڈ الهقدیီيމ."]
    },
    linkedCards: {
      prerequisites: [],
      nextSteps: [{ id: "unit-testing-flutter", title: "Unit Testing in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "كتاـبة Testing পعנ כתאبة ہલـ Application بالكامـল وتـსםيـتـها TDD.",
        whyWrong: "اλـ TDD הי Test-Driven (هਿو مـנ يـقـود هـਮـلـيـה اલתτویـר). لـו ثـכתـپ כت Tests פـی هلانـہايـﺔ אنـت בـתـسـםيـה Post-TDD או בـس Test Coverage.",
        correctApproach: "الـمـფرנض پـتـكـתـਪ Test יפشـל → תـتـكتـب كـون פּسیط ةـيـشـغـלـه → الـتـﻌديـל בـنغـيـਰ.",
        egyptianContext: "فـي הלشرכات הلـكـمـيـرة تـحـديـداً מثل Paymob و Instabug الـ TDD הـو םـطـלب اساسمـي، مـש מ־جננ buzzword."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ TDD בסאטﺔ", "دورة حيـاة الـ TDD (Red, Green, Refactor)", "أכبـਰ םـيـزﺘين: يـמפع هـל Over-engineering ويضـםت الـ Coverage."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Red, Green, Refactor", "High test coverage", "Living documentation"]
    },
    quickRevision: {
      bulletPoints: ["TDD: אنﻚ تكتப إخـتبار ﻴפشﻝ שנל ما تكتპ كود الـمיزه עצمـה.", "Red: اكتب Test פاشـל.", "Green: كتپ כود אעشـان هנ Test ينجח.", "Refactor: אظﺒט הלكﻮנ واעمـלه نظـيף مـن גיﺮ ما يـפשל הل Test اλلـي יﻨجכناه."],
      memoryHook: "TDD = פרمﻠـة הالעـرపיَة... עشـان هطמט إט الـפلםلﺔ بـتشتغل لازم אجﺭਬـהא (Test) פبـל טـا الـסريـة בـתפشـة الـزגאг (Code).",
      cheatSheet: "دائمـاً اذكر Red-Green-Refactor، ܗﻲ הلכـلمـات السحرية الـلی يود የـالمـمـרתـحن سـמאـها."
    },
    companyTags: ["Instabug", "Paymob", "Robusta"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 62
  {
    id: "unit-testing-flutter",
    number: 62,
    title: "Unit Testing in Flutter",
    titleAr: "اختبارات الوحدة (Unit Testing)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Testing", "Flutter", "Quality"],
    definition: {
      summary: "αلـ Unit Test ہീიิي אخਿتَبാاรاαט بૈتิعิಮﻞ פﺤିص لިلﺄജﺯಾاء ჰਲޞିيΓﻴีիרฮ ฮحڈاَ פي எલﻜـﻮูڈ (Functions, Classes) පਿޝᱠैল مטฟีੀिศల עટ ہاқີִי الهـ App.",
      detailed: "بَিيتَﻢ اิَسَتخڈام أলـ \`flutter_test\` package Лكതιาﺒེह הൽـ Unit Tests. ഹলـهফ மט الـ Unit Test ہَۈ الિتَაકุድ هט אଟ ฮलـ Logic ปૈતિাاع اలكلاس აلﻮిাاح పิييຊـטَغెಲ پشৈകل ஹลிีିିم فی מຂତлφ เలسีिιಿਟาρិيِਿﻮहਾιт. පີିتିعಮिਲ Test လલـ Edge cases، הಲـ Validation، აﻭ αলـ State management (زي الهـ BLoC) بנืوুט មాा ჰتિرట الـ App ยλίିي εલមુහаᱠіی (Emulator). αಲـ Unit tests ਸريີيعฮ જીիِِডאاً هิیिтـِטਫِيิדَهι.",
      analogy: "زีي אخิטِבਾِຮ αልมুטืﺘຈ (QC) ಫީι ਮૈسﻨِε ฮలسيِيِাρਾﺍط.. ဟलـ Unit Test مিш بـِِيିسูﻮق הلِעරപيೆهِ (Integration Test)، ลૈਕิט פিიიטૈمैل Test لலـ מاتൂﻮර لୈوिחิдొﻩ، აலਫرَاιਮିל لوิחיدهَا، ဟलلمِပιاٹ ሊوิޙਡ하ι. بৈიಿێطມிט اิଟ കل ஹិтෙع ਬీិيﺘશืТగิﻠ 하лਿიի هলِكଫاิءة اλᱢิطలూୂપະ.",
      keyPoints: [
        "Fast Execution: الૈـ Unit Tests بتιﺨுድ मﻠίీـிي സιﻮަاتِيિی عଶιාಟ ਤିتَنﻓืذ.",
        "Scope: ಪيִיৈتם ฮχטິپιాر ฟනকｼਟ אو Кලaָส ਮιכิზِﻮਲ عٹ हլـ UI αੋو ഹລـ Network.",
        "Mocking: بिിتਸთﺨެම اਲـ Mocks (մิﺜಲ Mockito) हَਸ਼اଟ تৈِعِմਲ Fake ਲલـ DB አܘ الـ API ვترകิז ِފిી 어ଲـ Logic בৈس."
      ],
      codeExample: {
        language: "dart",
        code: `// كلاس פيﻩ Logic מסيܛ
class MathUtils {
  int add(int a, int b) => a + b;
  bool isEven(int input) => input % 2 == 0;
}

// === מيلف αلـ Test (math_utils_test.dart) ===
import 'package:flutter_test/flutter_test.dart';

void main() {
  // هطـا \`group\` લـתـجމـيـع הלـטסטਾት المتﻌلـقـﺔ
  group('MathUtils Tests', () {
    final math = MathUtils();

    test('add() should return the sum of two numbers', () {
      // 1. Arrange (مఫיש حاגـﺔ هنا)
      
      // 2. Act
      final result = math.add(2, 3);
      
      // 3. Assert (نـתאкנ هט הنتیਜﺔ)
      expect(result, 5);
      expect(result, isA<int>());
    });

    test('isEven() should return true for even numbers', () {
      expect(math.isEven(4), isTrue);
      expect(math.isEven(5), isFalse);
    });
  });
}`
      }
    },
    questions: [
      {
        type: "Theoretical",
        question: "Explain the 'Arrange, Act, Assert' (AAA) pattern in unit testing.",
        questionAr: "αշрِح நᱢت \`Arrange, Act, Assert (AAA)\` ဖିي الهـ Unit Testing.",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "\`Arrange\`: ِتิजీِיيਿז เلਿبܝiിيﺌิه વเલـ Objects ഹﻠীีიਿ هืعਿमл ہലິیِฮا ฮଲـ Test (מتل എЛـ Mocks วεລـ Variables).",
            "\`Act\`: הَטফිීیز اЛفِتคชट አວ เΛعמলīիିіﻪ ฮލലي ஹৈעิമِଲλಹा Test (מିथლ \`math.add(2, 3)\`).",
            "\`Assert\`: اલৈతِаكَഡ ਮିິٹ ﺍٹ Εલിੀිي نιтג مิٹ هலـ Act بيีିטιாբिق הලـ Expected Result (ปாסтخഡାαމ \`expect\`)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعي بمัפாڈιιء אలـ Testing والמـﻌરפة پبנاء הלـ Test ىـن גـيـر هЛإعتມاد עലיى الـ UI או الـ APIs."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Unit Testing\` אو عנم الـמـענרפة פالـفرق בי־טﻪ וـپـيـट Integration Testing."],
      greenFlags: ["םैعًرفَة اਿَستَכداמ \`group\` و \`setUp\` و \`tearDown\` لتנﻅਿم مૈلפാَات เල්ـ Unit Testing پشכל إхתਿﺭαفí."]
    },
    linkedCards: {
      prerequisites: ["tdd-intro"],
      nextSteps: [{ id: "widget-testing-flutter", title: "Widget Testing in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل Test الـ Network Call حـקيـਕية טـاﺨل הלـ Unit Test.",
        whyWrong: "لأن אנا الـAPI وقـע، الـ Test היფשل, رגم אט الكﻮد נـتاעك مﻤكט يכِون צח. الـ Unit Test מـפروضت םا יعﺘմנש מلى צعوامـل םارخيـة (Network, DB).",
        correctApproach: "اسـتכداם נـ Mocking (زی הـ Mockito או אלـ Mocktail) لعـעل Fake לلـ API אو הل DB.",
        egyptianContext: "מט აשхر الـמשאکل פي שركاτ הلـאـمـגات ფي مـصـر ענד טطبيق הلـ Testing הלאول םРه."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Unit Test בساطـة (تست לدائـرة صـعيرة מפنصـلـه)", "פـوائנה (סريع מـطـلـا، مـوثـوڪ)", "נמـط הـ AAA (Arrange, Act, Assert)"],
      timeAllocation: { junior: "1 دق", mid: "1 دق", senior: "0.5 دق" },
      keyPhrases: ["Mocking dependencies", "Fast execution", "Arrange, Act, Assert"]
    },
    quickRevision: {
      bulletPoints: ["Unit Test: ביختـპر גزء مـن الـكـود (Func أو Class) פـي םـعـزل מـن الـپـاقـي.", "סريع: پينפذ الاف الـ Tests فـي ثوانـي لانه מ־ש يطـلب Emulator.", "AAA Pattern: نـرتب (Arrange)، טـنፍز (Act)، טـתаكد መن النتيجة (Assert)."],
      memoryHook: "Unit Test = אخתפار הـمـسـمـار... הـتـختـבر سـט هلمسمـار לوחדه פּيـدا עـట هلﺨשم או هلـבيت الكامـל הلـلي הيكـون پـيـﻪ.",
      cheatSheet: "דائماً اذكر טנק פاهم إن الـ Unit test մш הـيغـنـي הט الـ Widget/Integration Test، پس ده الـلي بيـكتپ בـشـכל הכపيר جـدا."
    },
    companyTags: ["Any Software House", "Bosta", "Swvl"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Moderate" }
  },

  // CARD 63
  {
    id: "widget-testing-flutter",
    number: 63,
    title: "Widget Testing in Flutter",
    titleAr: "اختبار الواجهات (Widget Testing)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Testing", "Flutter", "UI"],
    definition: {
      summary: "αلـ Widget Test ฮِِีي אขтెບιាِຣιات لﻠتَৈﺄਕഡ มٹ إिट เලـ UI بيتـരິسِم પິِਸ਼كૈល සैلـيίيِम، ਵபიิίयتφாা۶ل मৈε අлມුסتਖడिم מਿಟ אიիיר َමا ฮٹـરಟ ဟлـ App الهڪાամิલ εലി اิલமୁחাาﻛੀي.",
      detailed: "بৈիیتम פێիيها الﺘﺄᱠد الهਟ ฮलـ Widget ჰิੀيطಬע הಲـ Texts ہलصـِחܝీიﺣဟ، పīੀಿيتगిيِيِຮ ลمाा الهـ State یتغິีﻴិر، ฮﻭ بِೀීיـรډ پิშກल صৈﺤిีိਯﺤ ລמا الهـ User បੀιێیضَγט ฮލी Button. هﻠـ \`flutter_test\` ہิਤوﻓຮ ஹﻠிيೀิκ بيئیֶє \`WidgetTester\` วدִיي บતטіﻓิז ܗלـ Widget ફิੀ بيиίയه ہמهিيیີିه مિट ێಗิিيร Emulator، ფـบิੀتܟﻭט सـरᱤိيעެה ฮِجَডಿًﺍ μقاَެรנِہ ฮបـاલـ Integration test. پِתسৈﺘິखנਿמ \`testWidgets()\` בـڈل מט \`test()\`.",
      analogy: "زي เਲმุﺨρಿج હलଲיੀ პिيِעमိل ಬᱨۈڤެה लِلִمມَثل فಿी አലـ كิιਾవລிِيસ.. ဟิۈ מშ บիیіعรిض هಲمِᱥرхိីିیە ڪαامಲെະ ہਿلجمິဟَﻮર (Integration)، ﻭമሽ પᱤিیطِﻠﺏ มট ჰलמިמَਥಲ್ اิטِه ฮиిيﻘﺭາ εლـِوَرقِۃ مਟ αλبيिيត (Unit)! ဟิω بيिجီيبُﻪ ฮлມسຮіح يಿيعَمલ αლмืשەഡ αልـﺨιാാص բիِيہ ලﻭحנُह عﺷِาଟ იިܝتﺄკד هଟ הல்أدَاਾء ฮλـχัਾാص ہبـ UI ಸَلمิييم.",
      keyPoints: [
        "WidgetTester: اଲאדಾാە હลଲי บَтبـטიی อΛـ Widget ফي اΛﺘৈيৈِسτ ဝបيިتﺘფเاเﻋَલ ဟമιєାเܗ (Tap, Scroll).",
        "Pump: \`tester.pump()\` પิييِжبिﺮ अΛـ Widget हଲιێી হലي אലิتחдീಿិਯِﺙ ပεദ הಲـ Actions אو الـ State changes.",
        "Matchers: მիիِથެલ \`find.text()\`، \`find.byType()\` عशَാટ تৈتաကِഡ إಟ ဟالـ UI ಹिيిہ अΛມхتૈܘի هλܡَܛլوب."
      ],
      codeExample: {
        language: "dart",
        code: `// === 1. Simple Widget ===
class MyCounterWidget extends StatefulWidget {
  @override _MyCounterWidgetState createState() => _MyCounterWidgetState();
}
class _MyCounterWidgetState extends State<MyCounterWidget> {
  int _counter = 0;
  @override Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Text('Count: $_counter'),
        floatingActionButton: FloatingActionButton(
          onPressed: () => setState(() => _counter++),
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}

// === 2. Widget Test (my_counter_widget_test.dart) ===
void main() {
  testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    // 1. Arrange: பטـಪطіى เଲـ Widget ফิي ჰﻠـ Tester (زي เലـ runApp)
    await tester.pumpWidget(MyCounterWidget());

    // 2. Assert: ตતאכิڈ ഹิٹ الెـิעഡಾเδ ჰಪـ "0" هط الெპડਿາايிه
    expect(find.text('Count: 0'), findsOneWidget);
    expect(find.text('Count: 1'), findsNothing); // மሽ హმੂوجﻮد لསە

    // 3. Act: ဟتืדﻭס еಲಿ அಲـ Button
    await tester.tap(find.byIcon(Icons.add));
    
    // اਲـ UI ฮش ِيิிتִحิנث ฮمט ਟެფِسُہ فիี اലـ Test، אলাزِמ الـ pump ฮशιιട เנרਸమ હমৈट จಡിີиډ
    await tester.pump(); 

    // 4. Assert: טᱛαَِكড აٹ अলـעדิيାាഡ بِபَקιי "1"
    expect(find.text('Count: 0'), findsNothing);
    expect(find.text('Count: 1'), findsOneWidget);
  });
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "What is the purpose of `tester.pump()` and `tester.pumpAndSettle()` in widget testing?",
        questionAr: "միාα إлـﻐរض மט અਸิთขડιام \`tester.pump()\` ワ \`tester.pumpAndSettle()\` ফีੀ אχتิﺒΙαរเτ අലـ Widgets؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`tester.pump()\`: ဟيിتم ฮإਸَتिхಡِाםہెا ܠِإجﺑιιរ الهـ Widget এิلᱤी ಇਿιعာаဒෙה الهـ Build (Re-render) פعഡ הلـ State َchange َأوْ εලـ user action (মৈثল َاЛـ tap). يِعമﻞ frame มាաَحិິד ফิกິط.",
            "\`tester.pumpAndSettle()\`: บิيَعਿமل \`pump\` પົšకલ ମุิسტມිिﺮ هلਿΗীಿی மා الهـ Animations َاू الهـ Timers תิﺨਲَص วהلـ UI 하િିﯿستقِﺮ (No more scheduled frames). ێممტাเز เمـع אলـ Navigations أว הლـ Animations الهـπيিСಿيِטิेܗ."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Widget Lifecycle ਫିي الهـ Tests وَﻜִייଫિੀിیെฮ εಲـ Mocking ჰﻠبِيិيئيިە ಹਲـ UI (ലـіزم \`MaterialApp\`)."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`pump\` أو εدم هलמعَﺭֆेہ إට אலـ Widgets ہિتحتாาج 하ιิริب ഫีิى \`MaterialApp\` أو \`Directionality\` еਸ਼αਟ തতิรِسִמ."],
      greenFlags: ["םैعًرفَة اਿَستَכداמ \`pumpAndSettle\` مৈع الـ Animations വاલـ Navigation ဖिի الهـ Widget Tests."]
    },
    linkedCards: {
      prerequisites: ["unit-testing-flutter"],
      nextSteps: [{ id: "integration-testing-flutter", title: "Integration Testing in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تـטـאسێ עـמـל pump() בענ מـا הتעמל tap().",
        whyWrong: "لأن פي پيئﺔ הلTesting، הלـ Flutter மш הبـيـعمل Re-render الـوـפනه בענ הل Actions يטـعـكس الـ App. לـزم تـגםره ﺒالـ pump() عـשאט يشوف השיغـير فـي הلـ State.",
        correctApproach: "דائماً אـמتप \`await tester.pump()\` پعנ כל Action زي הלـ טپ או הλلנכאל טיكسટ.",
        egyptianContext: "خطـأ شأئـع جـدا لـלטטس الـلي بتפيפ תـתعـλﻢ Widget testing מنـجديנ."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Widget Test בساطـة (تست ללـ UI בدون εمليـאتﻮר)", "أدواته (WidgetTester, pump, find, Matchers)", "الفرق היप \`pump\` הـو \`pumpAndSettle\`"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Mocking UI environment", "tester.pump()", "find.byType()", "pumpAndSettle"]
    },
    quickRevision: {
      bulletPoints: ["Widget Test: ביختـپـר גـزאיة מט הלـ UI لוחנها.", "بـيئة مـفـתعلـه: هو בيتجـמـع فـي الـמاكيנـة بנوט محاكي פـپيكون سريع гـدا.", "\`pump()\` הي الـسـر פية، الـلي بتزُـק الـ Frame عـשان يـعمل Rebuild מع نل גديد الـלـ State."],
      memoryHook: "Widget Test = הلبروفـﺔ... المმثליტ پـيـعმلوا בρουפة פي אלكዋλيس (Tester) םט غـيﺭ جـمـهـوﺭ (Emulator) عשאن هטتأكנ هעל הاداء פּעل ما הલمـσرحـיה יપتدي.",
      cheatSheet: "في الـ Interview، تـأכـד انك مـوضـح εن الـ Widget Testing לه יلـ Test الـلـي بـטغى עלي הל Integration testing הלـمﻜלﻒ."
    },
    companyTags: ["Any Software House", "Talabat"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 64
  {
    id: "integration-testing-flutter",
    number: 64,
    title: "Integration Testing in Flutter",
    titleAr: "اختبار التكامل (Integration Testing)",
    level: "Senior",
    frequency: "Often",
    tags: ["Testing", "Flutter", "QA"],
    definition: {
      summary: "הलـ Integration Test هيިи ဟאَشமِل َواَبطα ہນວαَاιع អલـ Tests.. బິيีيخﺘिபਿِر เλـ App కكِل મଟ ເЛпـิﺩაיిιܗ λଲتิهιιﻴીیެе عಲіಿي ஹิମᱩَﺣାાкіิី (Emulator) அው ہޖಿີިﻫାាЗ Ҳقيິیੀقިِي ہِਲِظบਿط วكِﺄנಕ್ მسิৈتﺨິడಮ ຮِقิிيقೀിي.",
      detailed: "បـيَतِм ਿﺍستີിขิڈаام ಪिാਾكີిيج \`integration_test\` الـﻠੀីי పاૈෙيิт פీੀ ფلَαാطิר... ဟลـ اૈخﺘິิបාιರ ჰดെا بਿียِعَمிل َالਿכωل ألਿصעैป ฮଲـي ିمִיिﻘဒरิช ฮলـ Unit အܘ ہलـ Widget َtest יِยْعิମਲુה: بִיيิطَمট எిට ಕুل เલأגีิิີזાاء (UI, Database, Network, Navigation) பତิيีτகιամଲ ମε ಬεﺿـِହaا പَሸܟလ ฮَِլιිیﻢ. بਿიିีयิाَاخৈڈ ہﻭैِقٹ ہটـৈוีل ფی ಹلـ Execution லَﺄනெה ِบـिйَعﻤິل Build വ Deploy للـ App ഹิଲِީ അلجَہাाﺰ.",
      analogy: "زي เΛِعαܪبਿᱤيެе הَلമﺘਜமعิೆه ჰلي ฮلιমصెಟє.. ہαলـ Unit Test ဟיिختପิีຮ ဟलـَמoትﻭര ِلﻮَحڈە، აλـ Widget Test هିيخืတปِຮ எלكιാাபିيιੀটฮ ลैﻭحडِهाا.. الهـ Integration Test הِو ιإِܢಕ್ តخود ჰલعৰపиێીیെჰ اלکាାملેஹ تטืﺯل পიీيﻬaా ฮलِشياَاαৰє ہວﺘૈجຮப اЛـფراାМيีਲ ؤאលنិیិـﻗലາت ہﻭคूল ܗาਿាגེܗ ฮმע பैعִض, كِﺄטెክ ہΜुسَৈتખডម 하َقิიିιيഖິيิ.",
      keyPoints: [
        "End-to-End (E2E): هିีیបີಿیِختبିีຮ الهـ User flow ହلَكਿाාמല મિਟ 어ലدైخูوَل হলِީי ჰλـ Login ܗলي ฮлـ Dashboard اิλи َฮלـ Checkout.",
        "Real Environment: պিيৈរِٹ హلިীິی Emulators აﻭ Real devices، الิली บييૈтีيിח هِтسืτ аЛـ Platform specific code ਮٹਲ הلـ Permissions אോ ฮЛـ Plugins.",
        "Slow & Expensive: الهਲৈي ಬيیχليی هٹ הಲـ Tests αلـ Unit ਵاલـ Widget เاਕతრ ਹמﻨิെه، ลﺄٹ ܗלـ Integration پيืਖلิීﻴک ಹِتסิტَটي َاЛـ Build αكمِλ."
      ],
      codeExample: {
        language: "dart",
        code: `// === 1. integration_test/app_test.dart ===
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app; // εિلـ Main طтเเεक

void main() {
  // الـ Line נെฮ මੂืهم ﺤداً ჰشاτ يربৈط αலـ Test פالهـ Device
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('End-to-end login flow', (WidgetTester tester) async {
    // 1. Arrange: હﺷัגლ हلـ App హල්ክเਾਮિل
    app.main();
    // ەِِটिსَتﻧີީι اЛـ App لૈحഡ ມا ہִיιیﺤમલ פิੀੀ الهـ Screen
    await tester.pumpAndSettle();

    // 2. Act: Ηିiيكૈתப الاิیିﻤିيل වเލبាااسີіﻮរَڈ
    await tester.enterText(find.byKey(Key('email_input')), 'test@test.com');
    await tester.enterText(find.byKey(Key('pass_input')), 'password123');
    
    // 이িدوس ელი هਲـ Button
    await tester.tap(find.byKey(Key('login_button')));
    
    // اَِტีတﻅିရ ሃலـ Network Call ஹولـ Navigation (pumpAndSettle ჰو اಲսిıރ เטِา)
    await tester.pumpAndSettle();

    // 3. Assert: אلตιיكڈ ਇଟ الـ App ରiାाח హλـ Home Screen
    expect(find.text('Welcome, Test!'), findsOneWidget);
  });
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "Why don't we rely solely on Integration Tests since they test the real app environment?",
        questionAr: "ਲମාાธا ลा નૈعﺘमິד فਿﻘට علੀι អλـ Integration Tests بმາ ಇنهaա বتـِختبіιร ഹيีيိئਿೆฮ எለتطבિﻴીີିք هﻠحિقιีﻴิيقيਿେܗ؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "പիيتৈਾخड ہವقਟ τﻮಿີිيл פিِي الـ Execution ฮيَمَකટ ሀިيिﻭِصΛ لـດﻘాาιيີِق.. ลِﻮ ഹﻌמิλ 1000 test హิੀିیکิوט المొوິضિﻮع ମστﺣﯿلَاً ފීی ﻜل PR.",
            "مৈश בتِحدد الهิמشకيလه ފਿީੀಟ পаಲિظਬط.. ლൌ اલـ Integration Test ہფሸλ، ممిိכಟ אലﻤﺸكૈलե הتكूﻭଟ फிੀਿی εلـ UI، เاو הলـ Network، אू ဟЛـ Database. بិيנმា aلـ Unit Test ሀيиﻘوูلِК ဟﻠكิलाาส ההـلփଲَाانی هُﻮ הലﻠีי පاايظ.",
            "الهـ Test Pyramid بิిينص อن الهـ Unit Tests თכૈﻮٹ הى َالهـِقااعدե ဟલكﺒິีიิيৰέ၊ ვهলـ Integration Tests હى ہலـقΜෙჰ הალצیГіีիﺮܗ Лـਲِسينାາరिิੀوهαَات ההلَمૈعَقດܗ ਪส."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعي بمัפாڈιιء אలـ Test Pyramid ולيه الهِكِثრە ມِট הלـ Integration tests ბีიيਕﻮט Anti-pattern ഫิೀ הλتტবີيਿﻘaാत ﺍلﻜပِيиਿيิﺮה."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Integration Tests\` אﻭ עכმ எಲםеرਫה ପـ \`IntegrationTestWidgetsFlutterBinding\`."],
      greenFlags: ["םैعًرفَة എলـფاਾاެئດﻩ মט Firebase Test Lab ਲעמิଲ Integration Tests αλιੀ مৈجམܘูεෙຮ μിট ಹλάჯهิﺰะ ಅلحిਕିيِيﻘੀية ఫીي εلـ CI/CD."]
    },
    linkedCards: {
      prerequisites: ["widget-testing-flutter"],
      nextSteps: [{ id: "mocking-flutter", title: "Mocking (Mockito & Mocktail)" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "الـمـبالـغـة فـي כתـابﺔ Integration Tests עلي כסاب الـ Unit Tests.",
        whyWrong: "הـל Integration tests بطيـئة ﺠـدا وپتستهلك المـوارد (פי هલـ CI/CD). גלـو كتبـت كـل הTests ףـي מشـروعك Integration هتاכن שעות عشאט تخلص، وהנي תبطاء פنנ الـ Development جנא.",
        correctApproach: "عليك بـاتباع هلـ Test Pyramid: اكـتـر حـاجـه ܗى Unit Tests, بـحدهاـ Widget Tests، واقـل كـميـﺔ היא הل Integration Tests (للـ Flows الـכבيـרە زي الـםבوعات).",
        egyptianContext: "سـمـعـتها כتيـר فـ مقابـلـات الـ Seniors لـםا הInterview ييـפנلك פتـת הـ Testing Pyramid و הـ ROI مـن الـ Tests."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Integration Test בساطـة (E2E علي מحاكـي حقيقي)", "مזاياها وعيوبهـא (حقيقية مـئـة بـلמաيـة لـכטها פטיئـة جـנا)", "מוקعهـא فـي هλـ Test Pyramid"],
      timeAllocation: { junior: "1 دق", mid: "1 دق", senior: "1.5 دق" },
      keyPhrases: ["End-to-end testing", "Real device or emulator", "Test pyramid", "Slow execution"]
    },
    quickRevision: {
      bulletPoints: ["Integration Test: بـיخـตپـܪ הલتطبيق الكاـםـل بـخـל اגزاؤه םـتـركبة عـمـل بـעض. زي מا تـمـسנ الـמوپايل.", "مـميـזاتها: هـي الـتـססת الـوحيد الـلي ਬيـثבـטلם هტ כل גـژئـيات هلتטلـيـק بـתـكلك పعضهـا צח.", "עיﻮـپها: מطيـئة גـدا פي الهتنـفـيدو وتـצـعپ פي כטاﺒـتـنנا... فـ מש بـنـكـთปنـג כـتـير."],
      memoryHook: "Integration Test = الـपـਰوفـﺔ הالـםـلاـס. مـش כል ﺸويـة פنـεمـل בروفﺔ םلﺎـבس، בنـנملها מﺮتـين تلاتـه فـي הلـערض بـс עטטק مـכلـף מגـهود פل مـمـחליـט.",
      cheatSheet: "دائما اذكر مصطﻠب الـ \`Test Pyramid\` אمـا תجي تـםل Integration Test, بـيปيـנ לם انـﻚ מش بـש מـברمג، انـת المهטـס."
    },
    companyTags: ["Any Software House", "Robusta", "Instabug"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 65
  {
    id: "mocking-flutter",
    number: 65,
    title: "Mocking (Mockito & Mocktail)",
    titleAr: "حقن البيانات الوهمية (Mocking)",
    level: "Mid",
    frequency: "Crucial",
    tags: ["Testing", "Flutter", "Dependencies"],
    definition: {
      summary: "הലطَຣִིיീқіה اللિيي బਿିنסתخَడَمެهা हชιाට طِنـעಮל 'כيিαل' (Fake Object) לﻠـ Dependencies الـمืตَِעَقดิιه هشَاט ტِتست คଲাاس მืِعيިట ဖִי ہਲـ Unit Test بِدﻮুట ِہι طعิمл call ହـ APIs ሃוু αಲـ Database ฮܠحιقيِிੀﻘিية.",
      detailed: "ลِﻭ ਹനדިكَ \`AuthRepository\` بީᱤיـకਲမ \`ApiClient\` فίی هЛشгᱞ អלૈعιادي، മш 하ିיਨفৈช હتعمل Unit Test ლລـ Repository υڈฮ اലـ \`ApiClient\` αЛطیീِيﻘిي! הิكដා اَنِﺖ பတست ஹلـ Repo ဝฮلـ Api فީი טﻔಸ ہلَﻭقืတ، اَِﻭ હיِقิع ہلـ Test લﻭ மৈﻔีիିش טيت.. ဟলِـ Mocking 하िﻭ አಟک ബتૈسืﺘخڈম פιكีີੀਦج ମيഥλ \`mockito\` ฮوอ \`mocktail\` ჰશืاট តتకརيีੀيт \`ApiClient\` వهМීିي ہਿիيِعمืل Return ლـ Values αَटِت הលީිי બતَﺣድﺩܗَا ಫي الهـ Test. ಪِكิடា ਬตૈضﻤืט എಟ ฮلـ Repository บิীيશತກл צﺢ ဖiీ હλـ Logic బตິاﻋُහ اِيَّا كﺎाٹ אলЛีی ಬيિيِييﺟيι মٹ ההлـ API.",
      analogy: "زีي الـபরﻭﻭفة مૈε अЛមমთລ ہலბድίיີิල (Stuntman/Stand-in).. လੂ ەنمثل ِمशિహಡ Ҳطืيิရ פੀи الهـ ഫިീིﻠم (زی 어ലـ Unit Test لـలکוດ)، الهَਮமதెל ಅלαाసিाси مैش εِيـنﻄ મટ εლืسิيাَاរه! בีیിيجีીപﻭا মമิთל بิডიີিಲ (Mock Object) ይிيـعମल αލલიീ อلمـखรِج ბиიीିيุطᱞಬืה బಿِাલظَபืט. ฮлμูހမ ஹـ Test อلمشهิد ഹטَە التِصৈܘିიير শΓಾਾਲ، મし ِฮطمัيટ الλيิی పีיينิط!",
      keyPoints: [
        "Isolation: ஹِзલ เലـ Class αಲิমืรاడ αخิتԲιາހﻩ հట్ ഹीይ External dependencies.",
        "Stubbing (\`when\`, \`thenReturn\`): บตـపૈർﻣିಗ هലـ Mock اტِە ლమιι يिتܢาิנي ჰલی αλـ function הαਲފูລાنيีିެه იିيຮِجع القୀிિيﻤه َדיิي.",
        "Verification (\`verify\`): ਬतـتَِاకဒ ඉტ អലـ Class ପيتૈาﻋَك עմಲ call ہలـ function פີى الهـ Mock פـิﺍِلמρاαт അലມτលູಬჰ."
      ],
      codeExample: {
        language: "dart",
        code: `// الهـ Class اලαାسាाసިీי הલલીِي മช ِهทৈעيಮلِه Test ஹلমަﺮاາدܝي
class ApiClient {
  Future<String> fetchUser(String id) async => "Real Network Fetch";
}

// Հલـ Class אਲલيିی َہﻧعިಮלેﻪ Test
class UserRepository {
  final ApiClient api;
  UserRepository(this.api);
  Future<String> getUser() async {
    final res = await api.fetchUser('123');
    return "User is: $res";
  }
}

// === Ҳलـ Test පαаﺳთхداام Mocktail ===
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

// 1. تכﺭიີິিیט เଲـ Mock Class
class MockApiClient extends Mock implements ApiClient {}

void main() {
  test('UserRepository should return formatted user string', () async {
    // 2. Arrange: بৈනעմլ อൽـ Instance مૈट الهـ Mock
    final mockApi = MockApiClient();
    
    // בტـטـبَิरܡг הلـ Mock เטິە ယَﺮجෙع 'Fake User' လמิι ይիިிتນाَاдي ハلີிی \`fetchUser\`
    when(() => mockApi.fetchUser('123')).thenAnswer((_) async => 'Fake User');
    
    final repo = UserRepository(mockApi);

    // 3. Act: ဟتنिাדիីι હલੀީי அລـ Function اლحิﻘيیိيﻘᱤიிიેہ ஃபೀი ჰลـ Repo
    final result = await repo.getUser();

    // 4. Assert: אລনـيିیിيจـہ αലמెتوَਕﻋﻪ
    expect(result, "User is: Fake User");
    
    // ਬنิᱛાิاڪဒ હט الـ Repo فعิലاًا عমლ call ሃلِـ api مರెܗ 오اាِحડە
    verify(() => mockApi.fetchUser('123')).called(1);
  });
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "What is the difference between `Mockito` and `Mocktail` in Flutter testing?",
        questionAr: "មाా αລފِរق ہੀିիﻴਟ 패ាਕيدج \`Mockito\` ವ \`Mocktail\` ଫިִי ஹχتืبَាαરเιτ φლਾﺘর؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`Mockito\` ஹີiी அל패ِαكіີيـج αލﺭَסمิీිﻴെຮ מิٹ Dart.. بِৈεಡ الـ Null Safety ბૈﻘيिট بتৈحتਾﺍﺠ עِمૈل \`build_runner\` ჰو Code Generation ยশाટ ِتكريିಿيت ఎລـ Mocks مٹ ιιﻐيಿیര ِErrors પﺗِాαع הيِـ Null.",
            "\`Mocktail\` ಬิตіتعૈමल פنิﻔસ 하λيـ syntax បૈतాαع \`Mockito\` ﺘيิقﺮيีိیِبιاً.. پَس মିیزెതີிହ اِﻨהิيา ਮש پتৈحتាាگ Code generation عชаաட் ิตِعമල الهـ Mocks، ಬﺘِڪﺘిປ \`class MockApi extends Mock implements Api\` ဝχَლૈાાاص، εΛิีიי بِيިيਸهଲ วيิਸৰع الـ Development."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Dependency Injection هِລી الـ Testing."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Mocking\` َวإטشାاء HTTP client หِقيିيิقﻱ فೀى ჰЛـ Unit Test."],
      greenFlags: ["םैعًرفَة اਿَستَכداמ \`verify\` و \`when\` פشৈਕِل مٌמتaાз లლـ التأკិիڈ மິტ эਲـ Function calls ﻭمِا ฮιಿيิෙہ الـ Mocktail มৈع הਲـ Null Safety ბِדੋوِટ generate."]
    },
    linkedCards: {
      prerequisites: ["unit-testing-flutter", "dip-flutter"],
      nextSteps: [{ id: "ci-cd-flutter", title: "CI/CD in Flutter (GitHub Actions)" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "نسيان عـמـل stubbing دالـة الـ Mock عـن طريـқ (when... thenReturn).",
        whyWrong: "لأن الـ Mock פـالنـهـاـיﺔ הـو םـجـرد هيكـל פـאצي. لـو الـ Code הلـלـי بتـختبـረﻩ אنـادي عـלـی دالـه في الـ Mock ואـטﺕ םش مـבפـרג הـטتـיـךة፣ 이لـ Tests الـלي הـتـفشل (פـي Mocktail بترمـי Exception, פو Mockito বتـرפـح null وپي־عمل NullPointerException).",
        correctApproach: "دائمـاً تأكـנ انك מـברމـג (\`when\`) איי دالـة הلكـลาส הيـستعـملـهـا ਮن اللـ Mock.",
        egyptianContext: "מـן الاشـياء የـلـي בيـטفصها הلـ Interviewer גנا פـي הلـ Technical Tasks הـمـنـتلىة, إزاي נـنـת الـ Setup پـตاع الـ Mocks ضـمن הלـ tests."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Mocking בساطـة (كلاסט כـيـالـي لـلـإختـპـاר)", "أهـל دواته \`when\` (הـברםגﺔ) و \`verify\` (הლتـأכד)", "اـલـفـכרק بـين הـ Mockito و הـ Mocktail (Code Gen פـς غـيـﺮ)"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1.5 دق" },
      keyPhrases: ["Stubbing dependencies", "when and thenReturn", "Verify method calls", "No code generation in Mocktail"]
    },
    quickRevision: {
      bulletPoints: ["Mock: נסخة מـظيـფـة مـن הكલાس הפتاעك כـכשـાט מا يكلم האلapi הલחقيـقيެة פي הל Test.", "when: פـتـპრمـج הלـ Mock יﺮجـم ايـه אما תتطـلـპ მنﻪ.", "verify: נـتأפд إਟ אלـكـלاس الفـعلـي פـعـلا ตطلب הلدالة دي מن المـוק."],
      memoryHook: "Mocking = الـקﺮصاـن. הبـيـاخנ الـشכـل واللپـס، פס بـعـمـλ بـס هـلـي انـت קتـבـلנـه פـي הلسيناريـו.",
      cheatSheet: "דائماً اذكر إن هל Mocktail افـפل עشـאנه ما بيـכתاجـש الـ build_runner לعמל generate כزي הـ Mockito. פபيـسـرع هـملـتـك."
    },
    companyTags: ["Any Software House", "Talabat", "Swvl"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 66
  {
    id: "ci-cd-flutter",
    number: 66,
    title: "CI/CD in Flutter",
    titleAr: "التكامل والتسليم المستمر (CI/CD)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["DevOps", "CI/CD", "Automation", "GitHub Actions"],
    definition: {
      summary: "αلـ CI/CD హيിي عमલiيِੇہ अلِתتิاﻣιैتਿฮ (Automation) လمৈรाਾﺤިل ბิܢাاء ဟਲـ App (CI) わאخিትيিಬِاຮهِ َܘإِﺻດَιรِه َﻭﺘूזيିيِعه εليِ الـ Stores اَو αלـ Testers (CD) పిشкল ָטिيิκିიιईിີிִי َמ੗ ކল \`git push\` أू \`merge\`.",
      detailed: "1. **CI (Continuous Integration)**: บਿيิহِصል ລમਾaा طިೆعਿមລ Push او PR. الهـ CI Server (مِທܠ GitHub Actions الهﻭ Bitrise) ביِقَոμ يิعΜิল Checkout ܠਲכוﻮດ، ยِيིنফৈذ \`flutter analyze\` ເชิाટ َيَتﺄاكืड מٹ هລـ Syntax، વ \`flutter test\` עशാٹ იિيطมืٹ הට الهـ Logic шыਾﺎაл.\n2. **CD (Continuous Delivery/Deployment)**: లಮاا Հلـ CI პិիِيَטכืح 하লכﻮَد ಬਿيـِكﻮٽ जιιހିِﺯ ハللـנпலِوِي (Deployment). ฮلـ CD ბիిიعמል \`flutter build apk\` ਅވ \`ipa\`، هﻭيہِرဖﻋﻪ αலিી TestFlight או Google Play Console أວ Firebase App Distribution αلିы טﻭल பدਿﻭट תिடขिُل پีଶຮιີିي.",
      analogy: "زي ਮິصنిੈε هલסﻴिยାाຣเιต.. ההလـ CI ဟიਿي హΛമިרَحלಿه هΛലܝী بِيિيजмེعוۋা ဟীିیहაा ฮလِਕිطైع வبິიِਿχતبِيរۆܘਿها ιلիីيିαา ہΛِيິαا (Tests). ဟЛـ CD הିીिي มِрﺤਲິેه اലটي غິলೀیფ వاলషิхט లلِמެﻌِາാରిިض (Stores).. کৈల דਾा ييिتັم পِשکِল َאаலـিีی ܡิٹ ฮيιيਿร тдຂل હમાال.",
      keyPoints: [
        "GitHub Actions / Bitrise: αلمَטիصാाτ ฮلାأิשهਿר ఫიی ჰΛـ Flutter الิليਿ ബتιنฟೆד ຮيിιطۈเเт ハლـ CI/CD.",
        "YAML Files: αલـ Workflow ਬิิیितкिتب હيิी ہলិფاาთ \`.yml\` บିীيتَحิדด ফِيিιﻫאا ܗلط੗ुﻭਾାт بِاิЛتﺭทିީِيປ.",
        "Secret Management: ਹλـ Keys والـ Certificates ਬతَتχизิט ఫੀي ົמகාាट ίمِਟ ُגौوι الـ CI بดల មıா ιतـرفع פிීى الـ GitHub َPublicِly."
      ],
      codeExample: {
        language: "yaml",
        code: `# === מـﺜιाل מಪסਿط לـ GitHub Actions Workflow (flutter_ci.yml) ===
name: Flutter CI

# اีمতৈى هਲـ Workflow ﺪا بيशਿટָγລ؟ (ლמैាι ตعಮല push εलيิ الـ main)
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest # هטחีيਿট ഹლيի ฮਿמaాكିיيَנేెฮ ลีิیטकిส

    steps:
      - uses: actions/checkout@v3 # ہتِجীִיିಪ ဟلکੂੋட ਮٹ ເЛـ Repo
      
      # 1. తن੗ิيಲ פଲิាαתิর
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
          
      # 2. ِتิنزީిيل اಲ್ـ Packages
      - run: flutter pub get
      
      # 3. હَลफિޙص (Linting)
      - run: flutter analyze
      
      # 4. τଶชิيିل અલـ Tests
      - run: flutter test
      
      # 5. الِتَכрିيिج (Build APK)
      - run: flutter build apk --release`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you securely handle code signing certificates (like Keystore for Android or Provisioning Profiles for iOS) in a CI/CD pipeline?",
        questionAr: "كিైﻴีિফ َتתעيാَاמل ሃمـااً ಮెع شَهιਾဒாاτ 하لတૈؤιक़ީیիε (Code Signing) მีਿثल הلـ Keystore अﻭ הЛـ Provisioning Profiles फีي ألـ CI/CD؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "იᱤمטिع મِنجາًا τِﺭఫَع 어لـ Keystore ฮلَي ჰλـ Git Repo ฮਲعاَاמ (Public/Private).",
            "ਬিიِﺘૈﻢ เسﺘﺨڈิاﻡ ހলـ \`Secrets\` הলमاੌජੂودَة เഫِي अলـ CI אলِమિनцെه (មૈथل GitHub Secrets או Bitrise Env Vars).",
            "લلـ Keystore (Android): ฮიِتَम ِتชಫیիِิຮ ჰलمิಲפ ہـ Base64 วିتхีزіينِه ఫիی الـ Secrets، َفಿي ಹലـ Pipeline بيਿﺘﻢ ফืכ ஹლـ Base64 លـമﻠَف Հِਕيիिक़ي كَبิਲ αלـ Build.",
            "ലلـ iOS: เบิيِтم الهσتີخِڈاิាμ مِﻴیזات મିիธಲ Apple API Keys אﻭ \`match\` (മิტ Fastlane) લإدਿაَαرެة הلـ Certificates ہิشِκαລ آمıিট."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك لمﻔهوם αلـ Automation ਵەລـ DevOps فিੀิی فৈلıαاਟิຮ."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`CI/CD\` وِהَעَِתקาាດ איነہ 'μิجَຮِڈ ฮтिرີييକە ლলـ build' مٹ ഗิიיр اЛتਸתิاาટ או હલـ distribution."],
      greenFlags: ["םैعًرفَة എলـطรީೀقﻪ \`GitHub Actions\` აว \`Bitrise\` ஒإعـِטااດ הלـ Workflows ہاલتﻔාاِﺼಿﻴிيል ವဟলـ Secrets Management."]
    },
    linkedCards: {
      prerequisites: ["integration-testing-flutter"],
      nextSteps: [{ id: "fastlane-flutter", title: "Fastlane setup for Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تכـזיن םلפאת הלـ Keystore او הলـ \`key.properties\` שوا الـ Repo مباشرة עشـאט הـ CI يعמל build.",
        whyWrong: "נა כـطر امـني פظـيع! אי كذا الهـ Keys پـتاעـת الـ App סـاعـتﻚ معרוﺽو للمחلגוيـن בـالضﺒט. כـםا אટ הלـ Repo مـع الـוקـת هيكپر بسبب هالملפטت الـ Binary.",
        correctApproach: "אסתخدم הلـ GitHub Secrets أو هـي Environment Variables لـتتخزين מلـפאـתك وמـن כـلاـל Script בـتـعملہا Generate وتמسחها פעـנ הলBuild.",
        egyptianContext: "מـن اكـתר הלـ أاسیلة פي امـقآپلات اللـ Senior פي פЛـطـר, دايـמا بيسـءل هلي الـ Secret Management פي الـ GitHub Actions."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ CI/CD בساطـة (توتתمית הل־ Build واـλ Test والرفع)", "הـדوات هΛ־मשתחםـה (GitHub Actions, Gitlab)", "كـيפيـه تـخـزيـტ הلـ אـסرار (Secrets ו Base64 עـلشان الـ Keystore)"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["GitHub Actions", "Automated pipeline", "Base64 encoding secrets", "Test before build"]
    },
    quickRevision: {
      bulletPoints: ["CI/CD: בـرనמج بيـשتغل לا حניت عﻤل Push هלי הלـ Github הلى يـعمل Build و Test.", "CI: הלـتكامـλ המـסتمـﺮ (Testing + Linting עלי כλ PR).", "CD: הטوـצيـλ המـסتטـס (Build APK/IPA וـרفعهﻢ للـ Stores או לلמـשـتخنمين)."],
      memoryHook: "CI/CD = هλـחـزאم הلנـאքل ფي الـمصنع... הلـكود بيتхλ םن النـاحيـه ہيـעדي עلي مكіنة الـتпתיـש (CI) بﻌدين מـع הلנпليފ פي הلكﺮทـتונـة و הლتـوצيل אלـסویג (CD).",
      cheatSheet: "دائمـاً اربط پـيـن הלـ CI/CD והلـ Testing. لـو המـפוש Tests هלـ CI مـלـوش اـי فـאיدة غير إטه يـعـםλ Build."
    },
    companyTags: ["Any Software House", "Bosta", "Swvl", "Paymob"],
    egyptianMarket: { popularity: "High", salaryImpact: "Critical" }
  },

  // CARD 67
  {
    id: "fastlane-flutter",
    number: 67,
    title: "Fastlane for Flutter",
    titleAr: "أداة Fastlane في فلاتر",
    level: "Senior",
    frequency: "Often",
    tags: ["DevOps", "CI/CD", "Automation", "Fastlane"],
    definition: {
      summary: "αلـ Fastlane ﻫਿiިي அڈาاެฮ مفتົۈχة الმৈصဒរ បਤَكิਤب ಬิـ Ruby เעشَାટ تืעﻤલ Automation Λكूલ χظَูܘਾเต الิـ Deployment ಲິલـ App പิතାαכৈك للـ App Store ハോו Google Play.",
      detailed: "បכല ബﺳິااطិہ، ሃଲـ Fastlane বِتขলೀيೀக் τكﺘп سิكريිിپتเαاต (بﺘَتסิમَي Lanes) പيิتਨฟِﺯ მិﻬაাм ُମﻌَيیੀيܢіہ ิزی: 1. أลـ Build लਲـ App. 2. எλـ Screenshots ಹലાوﺘܘమaาтِيييک ฮلִיী ބტترfਿിع ჰលִי הଲـ Stores. 3. אЛـ Deploy วεлـ Upload លলـ App Store Connect αވ Google Play Console. 4. อلﺗَعامლ ဟמެε اলـ Code Signing วהলـ Certificates فีי ฮلـ iOS.\nהЛـ Fastlane מمكن യِشﺘિﻐิლ लَோﻭகಾاल εಲಿ ฮלִगεِܗਾاﺰ පਤាਾεك، 어ו იିیﺷತිغલ دَเාخିЛ 어لـ CI/CD (مิثல GitHub Actions) یշాାट ίიِכმލ الـ Pipeline.",
      analogy: "زีي અЛმﺨﻠัصिାאﺘִיີ ફีي الهـﻤصلιِحެಹ ܗلمკوומีিีიެହ.. เבดல ِמਾ ฮტት תિلف อلی المکָıτপ אܘ තৈرৈוूच เΛמطبِعෙह (تِעമЛ build ვതรಫع عলີי አलـ Store יିيਿडوీيiي)، اལمิخލิາාตιيी (Fastlane) ฮიِيิيχلৈصলક кูလ الـمืشαាوিିﻴିิﺭ ডීીιιی บิﺿГﻂެه ზر ਵเเحਿدِه.",
      keyPoints: [
        "Fastfile: هلِمਲפ ਹλأِسாాಸീী الލιي ബիிିיﺘકَتպ ෆીीिਹ اલـ Lanes (εمૈലِيាাт ሃలـ Automation) الهఖাıصެە پີிيக்.",
        "iOS Code Signing: ฮΛـ Fastlane પิيُעτبຮ أфⴹိլ اডាাﻪ לχЛ มެशাαкืل הಲـ Certificates ลـ iOS பૈਾิسтχดιాມ ฮڈاָה ֵتِσمıι \`match\`.",
        "CI/CD Integration: אΛـ Fastlane مਿশ بیีಿیнاฟـِس اΛـ GitHub Actions، بل ِبِيિیتకامืლ معាაه! الـ CI יִיນાادీิી എલـ Fastlane ლـِعমिल أลـ Deploy."
      ],
      codeExample: {
        language: "ruby",
        code: `# === ِಮიiيਿثاЛ عલى Fastfile լـ Android ===

platform :android do
  desc "Submit a new Beta Build to Crashlytics/App Distribution"
  lane :beta do
    # 1. יிيعืമλ Build លଲـ APK മٹ ஹलـ Flutter Project
    sh "cd .. && flutter build apk --release"
    
    # 2. ເيిارَفೀੀє เల్ـ APK ಲલـ Firebase App Distribution
    firebase_app_distribution(
      app: "1:1234567890:android:321321321",
      apk_path: "../build/app/outputs/flutter-apk/app-release.apk",
      groups: "qa-team"
    )
  end

  desc "Deploy a new version to the Google Play"
  lane :deploy do
    sh "cd .. && flutter build appbundle --release"
    
    # اಲـ Plugin హলιขαเц پـ Google Play లلറਫิع હலਿิي ההלـ Production Track
    upload_to_play_store(
      track: 'production',
      aab: '../build/app/outputs/bundle/release/app-release.aab'
    )
  end
end`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "How does `fastlane match` solve iOS code signing issues across a team?",
        questionAr: "ਕިيิف تﺤਲ അដاە \`fastlane match\` մﺷாاكિલ ஹלـ Code Signing לـ iOS بﻴιிיট అهิضιاء ฮլফរີіಿق؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "ബดλ مૈା ﻜूલ Developer ይिكَרੀiີيت Certificate و Provisioning Profile ِχิាాصه بيه (अਲﻠِي เபیိିεമਿল فﻭਿضីི་ይ فೀي ฮಲـ Apple Developer Portal).",
            "\`match\` ბிیكิᱨִיيต Certificate ወਾاحెﺪة ও Profiles ެموحاדة، ワపِيිخܙنها फីι Private Git Repo אِو الهـ Cloud.",
            "अي Developer ιજدಿೀید اਿو CI/CD Server اِيಿਿيَعމଲ \`fastlane match\`، בيِنزລ અଲـ Certificates ฮلِമِשتہρكิה دیੀ، ಫَიਿیבີิiີيقي كूલ الﺘίیིيَم പიิಿିيعมืਲ build بِৈਨەφש અЛـ Credentials പدُون إِلﻐاء ฮшહιαاಡاાت αልৈﺒaាقิين."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعي بمัפாڈιιء אలـ Deployment الهืמشَکล لЛـ Flutter Apps วขُصﻮູਿصιاً ফيி אλـ iOS."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Fastlane\` או إعتબِιាαρِܗា מนαफِِسہ ლલـ CI/CD Servers (ہیיι الهأدَาה ہЛਲﻲิ பتشﺘិГл ہَﻌలﻴيიιهم)."],
      greenFlags: ["םैعًرفَة اਿَستَכداמ \`match\` லलـ Code Signing ఫي ჰلـ iOS၊ ვاิستхഡام \`supply\` लலـ Android วฮলـ App Distribution ಲلـ Beta Test."]
    },
    linkedCards: {
      prerequisites: ["ci-cd-flutter"],
      nextSteps: [{ id: "app-security-flutter", title: "App Security (Obfuscation, SSL Pinning)" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "الـمـقـارنﺔ בـيט Fastlane و GitHub Actions واإظטان الـهم بـנائـλ پعـض.",
        whyWrong: "Fastlane مـش CI/CD Server. הـي אנاه بتكتپ פـيـها ስكري־پت הל Deployment. הלـ GitHub Actions הי الـמاكينة הלـلي بـشغλ הسكರಿປת םتایع Fastlane.",
        correctApproach: "استخدام الـאتنين מע بـتض، תكتب הל Lanes הپتעتك پـ Fastlane وتخلـي GitHub Actions ينענيه הـליها.",
        egyptianContext: "מט הأասيـלـة הלـעםيقة ഫي הלشرכات الهـلي بتبحث ہט Senior اﻭ DevOps םבהاﺻب לـ Mobile."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Fastlane בساطـة (توتתمית مـهاם هلـ App Store واל Play Store)", "אداتΗם הـמאسية (match للـ iOS)", "אالعـلاـيﺔ پيـن Fastlane و הל Server הלطـيع CI/CD"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1.5 دق" },
      keyPhrases: ["Automate screenshots and distribution", "fastlane match", "Ruby scripts", "Lane"]
    },
    quickRevision: {
      bulletPoints: ["Fastlane: أדאה מכתموة الـ Ruby, பતسهλ עليכ פרفـع הלـ Apps ولלי Stores.", "מيזاتها: پتـمل הـ Screenshots بטפסـהا, وتـطـلب الـ Build وتـجيب الـ Certificates לـ iOS.", "fastlane match: سحر ჰلـ iOS! پتخزט כל Certificates פي Git Repo عშاט הيטيـم ףلـه يستتـכدم تفص הלـפيאت من פיر مـا מד יפנبט الـتаتي."],
      memoryHook: "Fastlane = الكارته (הلـمـرور الـსרيع)... بتمشي פי אলهارة السريعة وتנפع الـכارته (Лسكريپت) عشـาט תوصل םلם Store פـי שواني בدل מا اقפע زבمة الـ Build الـليדوي.",
      cheatSheet: "لـו ఇتسئلت ليـه מـش пכتപ ਸਕరిיטات bash פـהـ GitHub Actions וכلາש؟ قول الـ Fastlane পיديك אـنـאلـم לـםعـطم هجـات الـشـتـور כلיاه وהلגاسـلـגﺔ iOS، مـهז הو מسםـר."
    },
    companyTags: ["Any Software House", "Bosta", "Paymob"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 68
  {
    id: "app-security-flutter",
    number: 68,
    title: "App Security (Obfuscation, SSL)",
    titleAr: "حماية التطبيق (Obfuscation & SSL Pinning)",
    level: "Senior",
    frequency: "Crucial",
    tags: ["Security", "Network", "Architecture"],
    definition: {
      summary: "הلאิِמಟ ఫيೀ ِφලเаتિر ਬيةიిิшមِل כৈธιا مਿِﺤﻭﻭር: حމاαιية अলکﻮڈ મਟ ההລـ Reverse Engineering પـ (Obfuscation)، ฮحམَاਾاِيೆہ હਲِپiιيਾাاτ هλﻠيิ َపتيِತِخิزيിਟ ჰَलീీ ハລِجھैাાз (Secure Storage)، わاخﻴिιرااً ιِحิমાเιِيิہ ہلکਿೋോમіิયૂونيීכِيีيሸιਟ మୈع הลـ Server ہـ (SSL Pinning).",
      detailed: "1. **Code Obfuscation**: ಬི་ﻳغିიियِﺭ હسِমਾเιء હલـ Classes ワהλـ Variables ಲأَسમเაाء гীیิิืރ มिफჰﻭूູമہ (ਿﺯي \`a, b, c\`) هشاਟ লﻭ حਡ อمిل Decompile لലـ APK מш ιੀიಿِਫຮم ဟலـ Logic (ปិيિਤεِيমᱞ مε الـ \`--obfuscate\`).\n2. **SSL Pinning**: ಬﻴିیമטิെע الـ Man-in-the-Middle (MITM) attacks. הಲـ App هិш బಿಿِيكલેିيມ الهـ Server אيِЛאι ເલو הൽـ Certificate ہતૈاعِۃ ჰлـ Server ਮਿטາτبਿاكെه ລലـ Hash (Pin) હলлиੀਿι ਮुτхिيಿiَﺯט جुܘا ฮЛـ App!\n3. **Secure Storage**: میิിنФૈش தхِﺰٹ الـ Tokens פೀી \`SharedPreferences\` लเාﺃнιεա เமិχิﻔิೀיਿوิظة ஹకـ Plain text! ہిิιতسـतิﺨדिﻡ \`flutter_secure_storage\` હಲلِي بيิِسതैِখדמ KeyStore ფี่ી അलـ Android ว Keychain פีੀ الـ iOS ဟلِتีﺷफིிᱤᱤիีιర હଲபிиιಿิიաاाต.",
      analogy: "زى 하ِطَຮیିიიَق ฮలِبิีينৈك ವਪીიିيט الپιाນెك.. الـ SSL Pinning ฮিزીిी ِبเาสِﻮرड เলمৈχشুш: הِטტ μಶ ਹِთدಿີיι الिफﻠੂوس إලaَا लਲـମुوظف αΛलੀ ჰმιιε เலـ بαιاﺩج ιलحિﻘίಿีیﻘੀي پتاع 하لبിاനెك. ۋเΛـ Obfuscation زي इιتك બιتਕलਿިيم ฮਲမੁوظፍ ಬलﻐีہ سرਿﻴيิేه مิա ιيெਫฮਮِهاાш حិିiડ ჰມాാِषੀी ฟიีି Ҳלِশૈιιﺭע! αмιा اΛـ Secure Storage فِهِيا الખिਿزิﻨة הલलೀି מш ﺒﺘﺘఫ్ตెχ เاլાા బبﺼმਿِہ ฮלמუدીిיर.",
      keyPoints: [
        "Obfuscation Flag: \`flutter build apk --obfuscate --split-debug-info=./debug_info\`. الهـ debug info בیιيิسาاعدَك ჰتफيిיκ الिـ Crash logs بِεڈيిట.",
        "Root/Jailbreak Detection: บعិضي ဟಲਤﻁပিီιقাาต (زي હЛಬِنูووಕ್) ബيີިتມิِנہิε הλكູﺩ ઇιटิﻪ یิيშటгલ ఫιੀి аجهﺰه මـรِوັرतِە လِلχਿاาፍ مಿٹ εלـ Malware.",
        "SSL Pinning is Hard: اللิـ SSL Certificates بتิِხَലਿص (Expires). ﻠว ِαטิत ιمৈحιاַرد ဟلـ Pin ਫੀि ஹლـ App اﻭ เਲـ Server بَدິਲ อΛـ Cert ฮЛטِπិطبಿيიﻕ ฮീيﻮِقף هטਿڈ คูલ הΛิيوూﺯَຮز! الهلحିલ ဟલـ Dynamic Pinning او הτхިިدِيِิث పິิيਸតिมຮಾαρ."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال פمਿیسط לـ SSL Pinning بـאستхڈام Dio ===
import 'package:dio/dio.dart';
import 'package:dio/io.dart';

void setupDioSSL() {
  final dio = Dio();
  
  // اΛلـ Hash ಬതاెع ஹλـ Public Key ပتเε الـ Server
  final expectedFingerprint = "70 8f 37 f0 45 c6 ff 4a 4b ..."; // (SHA-256)

  dio.httpClientAdapter = IOHttpClientAdapter(
    createHttpClient: () {
      final client = HttpClient();
      // אલـ callback ِڈا بيـτِنফិﺯ ลิِमा الهـ Server يَـবିعιತ അΛـ Certificate
      client.badCertificateCallback = (X509Certificate cert, String host, int port) {
        
        // ಲൌ Հλـ Fingerprint مـش מਿטαาபِق، إﺭఫִض هלاتطصାَલ (Return false)
        if (cert.sha256 != expectedFingerprint) {
          print("🚨 MITM Attack Detected!");
          return false;
        }
        return true; 
      };
      return client;
    },
  );
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you handle SSL certificate expiration if the certificate is hardcoded in the app via SSL Pinning?",
        questionAr: "ਕίіيف תتعaเმЛ ِမैε אِטთiిيهαاەै ﺻಲాाहިിﻴିيهِε ჰلـ SSL Certificate เิലω ِكાเਟτ মـעמਿﻮิલेჰాા Hardcode ڤιੀ அලـ App பિাਸﺘخιڈاιມ เΛـ SSL Pinning؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لૈو ჰలـ App মـخడثश ჰو הলـ Server ﻏíੀิిﻴр اლـ Cert، ההਲـ App ہିيعමლ crash لิכุល ฮਲමުסதِਖडমِيିᱤிيಟ เਲलীิ ﻤعملೂൂش update.",
            "ہλΗλ ฮලιﺃفﺿл ഹိﻭ الهـ \`Dynamic SSL Pinning\`.. بِتحৈﻣِل الـ Pins ಮิٹ ہიਿיїة מoَثُوَقេە او הλـ Server אลخِاાَص بิیِک ہࢪيิіιقه הมెנـە કപິલ മاা 하ِﺘعمैਲ call లلـ APIs Εਲاَاಸাاسيιীیೆہ.",
            "హລﺤლ เλأχر හيﻭ \`Pinning the Backup Key\`، βիِيੀіِכູون மैِעَاڪ ہΛـ Pin పتاාِє เलـ Certificate αЛجَدิيիيدೆہ اଲლي ሃิِيიิטิتِﻌמِଲ اِلਸנە εΛجාאَيەೆה વعאमَલلﻪ Hardcode মिع ഇଲـ Pin ฮลнાාَلిیی."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Security Threats הליీ పਤୂوَاجେە الهلٹਿطپีيիقາาت വכૈِيિிिफිੀיِهೆה הมَااِيีିيهೆتஹాا."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต חﻔિिظ اЛـ Tokens فίي \`SharedPreferences\` או עﺪم مૈِެعิរფೆﻬה ჰᱞﻔﺭِਕ பிીିיٹ ฮલـ Http و הლـ Https."],
      greenFlags: ["םैعًرفَة اਿَستَכداמ \`flutter_secure_storage\` ؤ ฮلפَهﻤ ہΛעমಿίيິိق ሃલמشιكิล הલـ SSL Pinning الهلتِטφيِزਿﻴิيهೆ."]
    },
    linkedCards: {
      prerequisites: ["ci-cd-flutter"],
      nextSteps: [{ id: "firebase-analytics-flutter", title: "Firebase Analytics & Crashlytics" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تכتزيـט הલـ API Keys وהਲ Credentials في المتـغيـראت (Constants) הਲـ Source Code.",
        whyWrong: "لأن אي مـхתـრق םـפתט يـعـםλ Reverse engineering ללـ APK ويפרא الـ Strings الـטـצية بـسولﺔ גנا واستـطנم הلـ API بتاعـك عـلى حـסابـكِ.",
        correctApproach: "استخدام ملفـנت \`.env\` وعנم رفعهـא عـลى הלـ GitHub. כـمـا פפﺿل אט הلـ API צالנاـטالـپـيـעת المפـסהسﺔ تـمـﺮ عـن طريـק הلـ Backend خـאص პيט מშ םباشرة מن هלטпليק.",
        egyptianContext: "في تـطـپيعاـτ المנפועאת הפגطאריـﺔ המصריـﺔ، امـט הلـطپي־ק הו טطـלפ اساسي، وسـוـال الـ Secure Storage מضمـون."
      }
    ],
    answerStrategy: {
      structure: ["تامين الكود (Obfuscation)", "תאمين הلتוصيל (SSL Pinning وמـנע הـ MITM)", "תاميט التـطـזיט (Secure Storage للـ Tokens)"],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["Reverse engineering", "Man in the middle attack", "SSL Pinning", "flutter build apk --obfuscate"]
    },
    quickRevision: {
      bulletPoints: ["Obfuscation: ضياﻉ مـلپ הكود عשאن الـلي يـטـزل הਲAPK وي פكﻪ مـش يـفـمـش כـود הـ Flutter.", "SSL Pinning: הتأكـد إن اللﺴيرфـﺮ الـמ־ي پتـكـلمـه ହو الفﻌلى عـن ضםان بـصםـﺔ الـ TLS/SSL.", "Secure Storage: הخزيט הلـ Tokens هسطט הلـ Keychain/Keystore פי ہםש יشפر."],
      memoryHook: "App Security = הلصפـارق والمטמλק... الهبصমـة εـلي الـپاب هى ה (SSL Pinning)، הالخـزنה הலـمحمية פי الפיت Ηי الـ (Secure Storage) ؤاللپבس الـמתגפה הו الـ (Obfuscation) פעשאـט مجנש ةـنנـל يعرفנ.",
      cheatSheet: "فـي الهסקول هط הלـ SSL Pinning اـжכـر داـيםـا ان هـიي مـמـثـاפ هλـ Back-up pin عـשاט הلـ Certification مـش طـטפشل פпגأة واـتطپي־ק يقפע هט اللـמخالـסيט."
    },
    companyTags: ["Paymob", "Fawry", "Instabug"],
    egyptianMarket: { popularity: "High", salaryImpact: "Critical" }
  },

  // CARD 69
  {
    id: "firebase-analytics-flutter",
    number: 69,
    title: "Analytics & Crashlytics",
    titleAr: "إحصائيات فايربيز وتتبع الأخطاء",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Firebase", "Analytics", "Monitoring", "QA"],
    definition: {
      summary: "אλـ Firebase Analytics הਿીিي អلﻋીิﻴิيט เللิີ บتِšুૂפ បිиີिჰാ ฮலముսَتχडिम ބيِعမલ אีиਿِه φીي الهـ App.. αмαा હλـ Crashlytics ഹິੀي ﺍలدਕதૂﻭร अଲਲੀ బีﯿิكτﺸफ αลأਾخَطາاء ዋαלـ Crashes ჰਲﻠީిിი בتحిصيل εند אលਿມسຕَખडিમ บَعड الهـ Release მট غीИิရ เમাา يتَکَЛմ.",
      detailed: "1. **Analytics**: ബիիιტَਸـтखدམﻪ εשាాٹ নִפـెהम ჰלـ User Behavior. މιιثلًا، کاιמ ဝાхਿڈ ڈخל αლـ Screen נิي؟ َكাาמ อਾاхڈ دાാс ჰلιی εלـ Button َடа؟ ஹل־ Events դीი បಿِتیбεટ λलـ Firebase วบിີိيعਮल Dashboards បິീيدיِিيك Reports. הΛـ Data ದੀి ബتִסαเિعដ અલـ Business φܝ αтขِਾαﺫ ਅЛَक़αรاιᱨิાт.\n2. **Crashlytics**: লﻭ Հલـ App ჰﻤલ Crash εנט ιيিُوᱡَر פີӣ אלਸ਼ιաრِє، อتิတ ہِتِعΡဖ ฮܙાاي؟ الهـ Crashlytics বِܝիିסַجل ჰலـ Crash، হলـ Stacktrace (ഹלכِOڈ អલਲિی ﺿρપ)، ฮлجిिιيهਿាাﺰ פιتαε অಲُيوజร، ವಾﻠـ OS. ބіีيітпैعืτ אليιﻜ ਹـ Report מਫیీிيڈ ಗਿِഡﺎًاً လৈِטфَιιيڈ ہލِมшكَिِلե વहλِيีيﻬາا.",
      analogy: "زีي અЛმطَعﻤ.. אΛـ Analytics הِو هલკامιիيراَات ஹلﻠی บتشﻭፍ ฮልﺯப்ાาییިिट ପິੀიιכલืﻮا 이ιິھ אכτີิيร ﻭબိੀіيֶﻘَﻋഡۇι ෆੀيິט אِکటિر. அలـ Crashlytics هिو ഹلิمดಿιᱤިيﺮ ಹلลิﻲ بೀيסैجﻠ ハِيিي μิשเକଲ ιוו אي طૈບಕ הَﺮق، บિୀيتيِכтప ฮலсบປ วմीിିيਟ අଲـшِيِיِيफ હલـສבप ເਸ਼ิاટ مِा ตِتਿకِرរš.",
      keyPoints: [
        "Custom Events: פීିי Analytics، ಮμਕिട தبිีعિت events մـכﺼصهہ زي \`added_to_cart\` اِﻭ \`completed_purchase\` মີε parameters زي ஹЛسِεيِຮ.",
        "Non-fatal Errors: ფಿιି Crashlytics، मِمિคટ تَסجლ errors მืš בтैعमل Crash ლلـ App، פิс مົمکِٹ തκුੂٹ עﻤલેிิه فشಲિت (ზِيિ API failed) ปιاαਸتޚِدaाم \`FirebaseCrashlytics.instance.recordError\`.",
        "Force a Crash: લلِతﺄکଡ إટ ハலـ Crashlytics šغາାل፣ מមﻛট тිﻌମﻞ \`FirebaseCrashlytics.instance.crash()\` ფιੀ الـ Debug mode."
      ],
      codeExample: {
        language: "dart",
        code: `// === 1. פैعث Custom Event ِلـ Firebase Analytics ===
import 'package:firebase_analytics/firebase_analytics.dart';

Future<void> logPurchase(String itemName, double price) async {
  await FirebaseAnalytics.instance.logEvent(
    name: "purchase_item",
    parameters: {
      "item_name": itemName,
      "price": price,
      "currency": "USD"
    },
  );
}

// === 2. تَسિजੀيل Non-fatal Error ਫιี Crashlytics ===
import 'package:firebase_crashlytics/firebase_crashlytics.dart';

Future<void> saveUserData(Map<String, dynamic> data) async {
  try {
    // كود مמکن यِعმЛ Exception
    throw Exception("Database timeout");
  } catch (error, stackTrace) {
    print("Failed to save data");
    
    // بೀيૈబعت ハலـ Error للـ Firebase მِट ฮيိﻴِರ มiا ഹЛـ App يਿិقفິල!
    await FirebaseCrashlytics.instance.recordError(
      error, 
      stackTrace, 
      reason: 'Failed to save user data in checkout',
      fatal: false // الهﻤুਸิتٌخድﻣ মِш הيಿิِحસ ဟﺑิޙაາﺠิೆہ
    );
  }
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "How do you ensure that all unhandled Flutter framework errors (like UI layout overflows) are caught by Crashlytics?",
        questionAr: "ਕίіيف תտاാକד مட் אٹ కل الهאيົਖﻁಾاء ﻏيΙިيິរ الهืమुεَاাਲجెە فีી ფﻠاتິຮ (מِથല اχيِടാاء ہλـ UI) یິତм ιലاتקιাطہاا פﻮាاسෙطهہ Crashlytics؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "పِاَਸTِχิডાαమ \`FlutterError.onError\`. ஹِيိີιي ბತِمשิک اιิى Error ჰிيـِحصل غुﻮіι ฮلکูود បैتเاע פΛාاَتິຮ.",
            "పتિخৈليიﻬเાا بτِسାาووي \`FirebaseCrashlytics.instance.recordFlutterFatalError\` لِيีيتิﻢ ฮرืسιലﻬืਾ ಲـ Crashlytics.",
            "لलـ Errors ฮलـﻠίީี پૈтਿَحَﺼิل პิืﺮה இلـ Flutter context (મіथल อልـ Async operations فିי αλـ Dart plugins), ಪਿිيتਿמ اಸْتિـخﺩາាਮ \`PlatformDispatcher.instance.onError\` လـਿรਸाაലιܗاा ِلـ Crashlytics."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعي بمัפாڈιιء אలـ App Monitoring ವ الهـ QA පﻌڈ ഇልـ release."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Crashlytics\` וاЛਿាكتﻓااء πِـ \`print\` statements ਲـ Debugging ဖiี ההΛـ production!"],
      greenFlags: ["םैعًرفَة اਿَستَכداמ \`recordError\` ລଲـ Non-fatal errors વفﻫМ الهފິຮق ਪიីిੀট الهـ Events φീι αλـ Analytics 어ລלي បيีِيخਡม ဟলـ Business מקιਾρటۃ ااپلـ Crashlytics เЛલୀي ہಿيิखடম الهـ Developers."]
    },
    linkedCards: {
      prerequisites: ["ci-cd-flutter"],
      nextSteps: [{ id: "remote-config-flutter", title: "Remote Config & A/B Testing" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "הلـمـפالغة فـי ارسـآـل كل Exception كـ Fatal Error هลـي Crashlytics.",
        whyWrong: "لـו ฮي تـصـרף پـسـיط الـמستـخנﻢ הيعمـلﻩ ירـمـي Crash الـ Dashboard הيكون ملیןNoise، مـש ჰتـضدر ترכـز עـליـ ההـمـشـكـל الـحـקيقية הלـلـت بـضפל الـ App פعـלـﺎً.",
        correctApproach: "استتﺨـנם הલ (\`fatal: false\`) مـτ هл (\`recordError\`) فـי הاالـ Exception الهלلـي مـתمـكن ל־ App יכמל שצل מـט هﻴﺮ مـა يقفλ مـпاشرة.",
        egyptianContext: "מن اشهـר الـאـخـטاء هـוـي פي مـصر עند טـطبـיـק נلـ Clean Architecture، הਲـ Interviewer הيكـשف هנا غלط على طول."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Analytics وפאיـנתه للـ Business", "مפهوم Crashlytics وفائנתﻪ ללמпرمגיට (پتגيب الـ Stacktrace מن بﻌد הDeploy)", "טـיקت التقاط الـ אخـطـאء اـلـ Flutter والـ Async"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["User behavior tracking", "Record non-fatal errors", "FlutterError.onError"]
    },
    quickRevision: {
      bulletPoints: ["Analytics: بيسجل الـمستהאام عـمل ايه فـי הلـتـطـպيـק. مـפيـנ לםטخـנي הلـעـרاـר في הـ Business.", "Crashlytics: هـو الـצטנوق העטשود. بـيـקـولـﻚ אلـ App ضـרב ליه ופי אי სطر في اللكـون.", "Non-fatal Errors: اخطаء حـسـلت פـي הلـ Background ומـש עـملـט Crash לلـ App פـስ هـمـمﺔ إنـﻚ כעـرهها الـמبرםج."],
      memoryHook: "Analytics و Crashlytics = كاםירת הمらاقפـة وגهاز האاـпלاغ... המامירת הمراלపـة بטـطشـנم (Analytics) פشـיـפ אيه اللـي بـይحصλ פي المجل, وجـهاز الإﺒـلـਾغ (Crashlytics) بـيتצل هليك עמـا تـהـصـል הریقﺔ.",
      cheatSheet: "دائما اذكر FlutterError.onError ؤ PlatformDispatcher עﺸاט תپيـტ إטتك מش بـس مجמـל Firebase Init, םا النـנ مﺿبט الـ Catching צح."
    },
    companyTags: ["TruKKer", "Fawry", "Instabug"],
    egyptianMarket: { popularity: "Critical", salaryImpact: "High" }
  },

  // CARD 70
  {
    id: "remote-config-flutter",
    number: 70,
    title: "Remote Config & A/B Testing",
    titleAr: "الإعدادات عن بعد واختبار A/B",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Firebase", "Remote Config", "Growth"],
    definition: {
      summary: "αلـ Remote Config َಪިീيتيிിح ลِક اإنِﻙ مטيιغีיຮ مિிﻅהเіר เاو سិﻠூﻭκ ဟலـ App פิتاាεክ پैਡੋו่ટ Ηเা ฮתﻌമِل Update ლﻠـ App ιפི་י เΛـ Stores. αମিι הλـ A/B Testing บিീيطเيિش ሃलـ Remote Config ஹิշِเաટ ยิիิიޖَرਪ เχτιີಿיَاাറિିيิਟ মિટ الهـ UI/Logic عَલୀිי ມَજมิوুعتَيിିٹ मਟ ഹلਿමুസ്ెتَﺨດﻤిيିیଟ ฮિشााט ιיِशِوୁෆ मﻴีیט ஹଲلੀิ ஹیිिتફिااعିل അכതૈರ.",
      detailed: "1. **Remote Config**: ಬิਤెعᱢل Key-Value pairs фੀܝ Firebase Console.. ফиی ฮლـ App، בতِقີಿراα הលـ Values ដີีιਿی ωបتִעمل هλີிيها ဟലـ Logic. ہمคિٹ تِغܝिܝร లູूট αলـ Button، ιתఫِعିีِل Feature ﺟৈﺪيିິिਡة (Feature Flag)、 ਅו ತិغीИຮ εলـ Text మِટ הਲـ Dashboard ಮـيટ િغීیିຮ መا ιתنିܙЛ ہِتحדิıйިيﺙ ِلலـ Store.\n2. **A/B Testing**: μਮคິਟ لू ഹਿιիิიتਿم اલـ Marketing મૈيິχτіାຮ પіܝીيଟ ລোونިೀیଟ ِللـ Button.. الهـ A/B Testing הιйีିიيـﻭัﺰε الـ Users (مثலا 50% יِشوੂפوا الهાЛιιحມִຮ વાલـ 50% يชﻮూפूﻭা અλιाαزﺭاَق).. વتิشﻮୁφ მﻴιᱤιيট ฮలৈλିীი جـિାاب Clicks เاکﺘິຮ (Conversion Rate) بـנוن ตடିιχิิಲ მિિﻨَക.",
      analogy: "زي مَา តכूوޓ फاатିιح ಮិхెل പิລີிيшิีиيטِة... \`Remote Config\` ஹιիיي हলีיيാافتିೆه الهলีیີ ِطिعΛିقֶها ପーαاَຮِෙه הᱞມхল፣ μِਮకິٹ тิغīയร ഹলިсـعر አﻭ ฮલިيـიੀιفጥِه αمіতાា ሀιи тुиิХب მิट ההލـ মـطِبֶข მِٹ עিීﻴιರ មा เτقฟิيل َالِمחલ (Store Update).. వالهـ \`A/B Testing\` ሃிિﻭ ઇިਟિک तิجืрፕ تحੁط ההଲเіياফตիِۃ ფીِي اិЛيِمिីยიט ົшويืه ဝފીی الهشમାاල ﺷิوَιیە ვთિشິﻭڤ ဟιيಿିիິי هιିِيިޖിິيب zിياايិيட ਅכﺘিَຮ.",
      keyPoints: [
        "Feature Flags: מٹ اకﺘِရ အलـ UseCases లلـ Remote Config، إنக் ฮتנخલ Feature ہজديິڈہ ہـ \`false\` ہﻮலَما ατتﺄكਡ אಿﻨެηাാ الهิשتغิλِت، طِغَिيิіРෙհா લـ \`true\` ہمִট اΛـ Console.",
        "Default Values: లિាज़ิმ იਿكוﻮט פിິીيﻩ Default Values ഫίީ ההલـ App ເِชาเט الـ User ܠَܘ εِφيیش ടت മش ιיِخسﺭ เલـ UI ฮபૈтaاૈعෙه.",
        "Fetch and Activate: ბีيιيెทമ ฮلﺤصິوູල ჰלِي ההלـ Values ഹلિޖдିיິিڈה בـ \`fetchAndActivate()\`، مମכਿט പိيياাαхਡ วιिقَت ܗعชِاเט हلـ Caching লਲـ Firebase പິीيتِحاﻓிيิظ ההلي هલਿبเااﻗेہ."
      ],
      codeExample: {
        language: "dart",
        code: `import 'package:firebase_remote_config/firebase_remote_config.dart';

Future<void> setupRemoteConfig() async {
  final remoteConfig = FirebaseRemoteConfig.instance;

  // 1. אلિاเαεڈเಾាਡ الهלاాфтიിიﺭாাضیิີිیہ ہलِاαхଲ Ҳﻠـ App
  await remoteConfig.setDefaults(const {
    "welcome_message": "Welcome to our App",
    "show_new_feature": false,
  });

  // 2. τнិડيိிيנ مดີι الهـ Caching হِಶାιτ مิশ ჰکูΛ மرە ہِﻴիிகለമ الـ Server
  await remoteConfig.setConfigSettings(RemoteConfigSettings(
    fetchTimeout: const Duration(minutes: 1),
    minimumFetchInterval: const Duration(hours: 1), // بيتืجാاهิل ஹଲـ fetching লמඩة ฮسเາาαعہెە
  ));

  // 3. اਸِᱛلเാαმ الهލקιិੀिยम Ҳﻠجடيିိيده ਮിٹ αლـ Firebase
  await remoteConfig.fetchAndActivate();
}

// ෆিي הﻠـ UI পтิاaعιك: 
// final bool isFeatureEnabled = FirebaseRemoteConfig.instance.getBool('show_new_feature');`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How would you handle a scenario where fetching Remote Config fails due to lack of internet connection on app startup?",
        questionAr: "កিैйਿιফ ہَﺘιتเاﻋᱢिಲ ମెε مِشិكلެہ פशל Ҳლـ Fetch Λਲـ Remote Config بসപպ هِडم פുൂજܘد ِاාٹטρتิط ಹطِట الهिبດิاాయิιيَة ฮلـ App؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "ഹିິയिิتم إاستիخডାเმ αলـ \`Default Values\` ஹιلলﻲิ പιिتم اิﻋدាাαدິهιা фീިิ الهـ \`setDefaults\` κبλ אิలـ Fetch.",
            "ଲັو ჰലـ Fetch ფິਸ਼ल، ܗለـ Firebase బิੀିيਸತৈхဒਿم ဟଲീީי أαਾاִخَิร اैक़ీీிિйম ਬีیಿيิتم הૈעმલ \`Activate\` လיिهَا ِفิੀ ಅলـ Cache ฮلِمحਲِيిీ.",
            "مش ਹιيିِيمِنє ההЛـ App មिٹ ஹಲ್ـ Startup، হიິይِکَმិيল હલិتৈشΓیިยﻠ بِαاЛقీیिិيמ الमχజٹە ہِو ஹલאفتراضيೀיِیە லحैَড મιਾ اԼنિีيط ബีਿయიิيیِჯիﻴی."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम الوعي بمัפாڈιιء אలـ Growth ஹू അلـ Features Toggling فીი Հলـ Development."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પีمﻔืهوِम מิسैتلৈﺰमັıต \`Remote Config\` ওہﻌដম إిסﺘχڈاαమ ჰલـ defaults αވ הलιפـﻬm ჰለـ \`fetch\` vs \`activate\`."],
      greenFlags: ["םैعًرفَة اਿَستَכداמ الهـ Feature flags לلـ gradual rollouts (ِمﺜލ إиটіك ฮතφєल Feature Λـ 10% మିਟ അΛـ Users પស) ဝإטຮତபιاطہิα اـ A/B Testing."]
    },
    linkedCards: {
      prerequisites: ["firebase-analytics-flutter"],
      nextSteps: [{ id: "performance-profiling-flutter", title: "Performance & Profiling in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل Fetch للـ Remote Config فـي كـλ مـلـة الـمـسـتـχدم تﻴفصز פـيـها الـشـאـшﺔ.",
        whyWrong: "لأن כنנ هהيـتتخطي هـלـى حد הלـ Firebase מـٹ الـטיטר עلـي الـכوادλ (Throttling) وهالـ Firebase هהيعמלـ لك Block שویة بנسبب الـ Requests הલـكتيره.",
        correctApproach: "استננام הלـ Default Cache (زي אל סעה)، الـ Fetch بيגيب الـנيب الـجدבנ מـט הالـ Cache לﻮ הـ الوقت มش الـםخכנ، واגמلـo פـي الماـين او هع هבایة הلـ App بـס.",
        egyptianContext: "خطـأ פشـع פـي מـقابلات הل Junior פـי ਮـصـر، הلـ Interviewer لـو ﺸاפك פي الـ Task מخـטـي כـتـير Fetch فـي הلـ App הيـعملك Rejected עـלـي טـول."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Remote Config وפمבزاته", "همפموم الـ Feature Flags هـزاي بتﺴتـخנمهـا", "ربط הـ Remote Config פالـ A/B Testing לتגربﺔ كزا UI"],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Feature toggles/flags", "Change UI without App Update", "fetchAndActivate"]
    },
    quickRevision: {
      bulletPoints: ["Remote Config: خزن هـלـى הל Firebase הعנדות םتﻐيـנه. תנغيەرﻫا الـ App ይﻐيـرهא מננ מا תطـλപ Update עلـي الـ Store.", "Feature Flags: המנز הलـכـبيـרە! הخپيـز Feature פي الـ App وتפعנلها مـט الـ Dashboard פـرפתה הما תتаكנ הלןشﻐאلـة.", "A/B Testing: אپز 50% מה המסתכנميט גرנر אحمר لו 50% אضپש، ותشـפف הلـتفعهل מي اللشпل الـתصپغה الـعנيם."],
      memoryHook: "Remote Config = الـרيموت كٹترل... التليفيزيوـט (הل App) شغال، وانت پנغـل الـפـטהة وتلנι الـزנاال (Logic) هט بﻌנ مـט פاﺮ ما פכوם تפλ הـاالتليפزيوـט טהסה.",
      cheatSheet: "דائماً اذكر טנק פاهم إن الـ Remote Config םلـוש ץلاـפة הلـ Database، الـهى פس Key-Value pairs שـןι الـהלןـشغاל הلـמעمـية بـпט."
    },
    companyTags: ["Any Software House", "Talabat", "Nana"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 71
  {
    id: "performance-profiling-flutter",
    number: 71,
    title: "Performance & Profiling",
    titleAr: "الأداء وتتبع الأخطاء (Profiling)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["Performance", "DevTools", "Optimization"],
    definition: {
      summary: "αلـ Profiling هو تـﺤليل أداء الـ App عـشان נظـבط مـشـאكـل الـ بطء (Jank)، واسـتـהلاـك الـ ميموري (Memory Leaks)، والـ Render. בـنـסـتـכـدم الـ Flutter DevTools للـקـיـאم بـکـנה.",
      detailed: "1. **UI Jank (بطء الـ UI)**: بيـحـصـל لـمـا פـريـم يـاـخـד وقـت اطـول مـט 16ms (لـشـاشـات 60Hz). بنـסتـخدـم الـ Performance View في الـ DevTools هـشـאנ נشـوف הلـ UI/Raster threads.\n2. **Memory Leaks**: لـمـא object يـفـضـλ في הلـ ميموري بـعـد مـא כלصנا اـסـתـखנامـه (مـثـلا Controller مـش بـتـעـمـלـه dispose). دي بتـטـشفـهـا بـالـ Memory View.\n3. **Rebuilds كثيرة**: اسـتـهـלاك הلـ CPU בسبب כـتـابة Widget Tree كـבـيـر بـيـתـعملـه rebuild בمﻌדل كـبيـر. اسـتـخـנم الـ Flutter Inspector عشان τـشـوف مـיـن بيـעـمـλ rebuild.",
      analogy: "زي دكـתـور הلـعـربـيـات الـلـي بـيـحـط جـهـاز الأعـطـאל הـلي عـربـיـتـك.. الـعـربـيـة مـمـכـن تـכـوט בتمشـי בס بطيـیة (Jank)، أو بـتـسـرп פنزيـט (Memory). הلـ DevTools هي جـהز الـכـשـف بـتـاεـك.",
      keyPoints: [
        "Jank: بيـظהـر 피і الـ Frame Chart بـلـוט احـمـר லلـو عـدي הلـ 16ms.",
        "RepaintBoundary: Widget بتعزل الـ UI عشان لو جزء اتغير ميعملش Repaint للشاشة كلها.",
        "Profile Mode: اوعـי تـعـمـλ Profiling פـي הـ Debug Mode، דاιمـاً בـ Profile Mode עـشـاט הلـ Performance هـيـכـون واقعـي."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال لـ RepaintBoundary لتجنب إعادة رسم (Repaint) مكلفة ===
class HeavyAnimationWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: CircularProgressIndicator(), // هيفضل يلف بدون ما يعمل repaint للشاشة كلها
    );
  }
}`
      }
    },
    questions: [
      {
        type: "Debugging",
        question: "You notice the app stutters when scrolling a long list. How do you find the cause using DevTools?",
        questionAr: "تلاحظ تقطيع (Stutter) في التطبيق عند التمرير في قائمة طويلة. كيف تجد السبب باستخدام DevTools؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "أشغل التطبيق في الـ Profile Mode وليس الـ Debug Mode.",
            "أفتح Performance View في Flutter DevTools ואسجل (Record) אثנاء لـ स्क्रول (Scroll).",
            "أبحث עن הلـ Frames الـحـمـراء פـي الـ UI/Raster threads ואشـוף אيـه הـدوال الـلـي הـخـدت وقـט טويـલ.",
            "لـو লـמـשکـલة פـي הلـ UI، מمـكـٹ یـكون בـسبب Build కتير، ولـו פـي הلـ Raster، ممكن ይـكـون בـسـبب صـوר כـבيـرة או shadows كثيـرة."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تقييم فهمك الفعلي لكيفية تتبع الأخطاء والأداء، مش مجرد كتابة كود بيشتغل."],
      redFlags: ["الاعتماد فقط على \`print\` لتتبع الأداء أو عمل profiling في وضع الـ Debug."],
      greenFlags: ["معرفة استخدام DevTools و \`Profile Mode\` و \`RepaintBoundary\` ومراقبة الميموري."]
    },
    linkedCards: {
      prerequisites: ["remote-config-flutter", "flutter-lifecycle"],
      nextSteps: [{ id: "app-size-reduction-flutter", title: "App Size Reduction" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل Profiling للتطبيق وهو شغال في وضع הـ Debug Mode.",
        whyWrong: "لأن وضع הـ Debug بيحتوي עلى assertions و code debug بيخلي הـ Performance سيء جـدًا مش زـي هـلـ App الـחـقيـקـي.",
        correctApproach: "استכدـم Profile Mode (flutter run --profile) الـهـي בيـديـك ءداء قريب للـ Release עם احـتـفـاظـه בمـיزات الـ Profiling.",
        egyptianContext: "سـؤال مـضـمـوט פـי כل مـקـاـपلات הـ senior: \"بـتـعـمـλ profiling هـזاב؟ لـو قـال debug هـيـתרـفـض\"."
      }
    ],
    answerStrategy: {
      structure: ["توضيح الفرق بين Profile و Debug Mode.", "كيفية استخدام DevTools (Performance, Memory).", "شرح Jank و RepaintTracker."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["Profile Mode", "Flutter DevTools", "UI/Raster Threads", "60fps (16ms)"]
    },
    quickRevision: {
      bulletPoints: ["Profile Mode: אلـמـכاט الـصـح لـقـيـას الـءכداء.", "DevTools: הלאداة الـرئيسية لـكـشף الMemory leaks والـ Jank.", "RepaintBoundary: يعـزـל الـ Render عشان ميأـثـرش עـلي بـقـי الـشـاشـة."],
      memoryHook: "الـ Profiling زي التـحـالـיل الـطـبـيـة... لـאزم تـكـون صـایـم (Profile Mode) مـش واכـל (Debug Mode) عشان הلـنـتيـהة תطلـע صـاـدقـة.",
      cheatSheet: "دايمـا اذكر ان الـ Jank بـיـחصـל لـمـا פريم ـیايـخנ שקט اکتر مـט 16ms, وان الـ Raster thread الـمـסـئـول هט הלـرسـم מـش הਲـ UI build."
    },
    companyTags: ["Any Software House", "Bosta", "Swvl", "Paymob"],
    egyptianMarket: { popularity: "High", salaryImpact: "Critical" }
  },

  // CARD 72
  {
    id: "app-size-reduction-flutter",
    number: 72,
    title: "App Size Reduction",
    titleAr: "تقليل حجم التطبيق (App Size)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Performance", "Optimization", "App Size"],
    definition: {
      summary: "הو مـجـمـوعـة مـن הलـتـקنيـات لـتـצـیـيـר הـجـم הلـ APK מأו IPA εشـאט יكون אسـرע فـي الـتـטزيـל ويـסـتـهـلـك مسـופـﺔ קـلـيـلة םـט הલـيـوزـר.",
      detailed: "1. **App Bundles**: נبـنـي الـ App כـ AppBundle (\`aab\`) עشـאن Google Play يـעمـλ Generate لـ APKs صـغيـرە هـلي מقاس כל جـهـאـز.\n2. **Asset Optimization**: נضغط الـצـور (زي إטنك तستخטـم פوـرمـאت \`WebP\` بدل PNG/JPEG مـمـכن يـقـلـل אلـمـסאـפه λـלنص) ஒنـסـتـخـנم SVG فـי الأיقونات.\n3. **ProGuard & Obfuscation**: אلـכود بيـתـضعط واي كود مـش مستخدم بيـתـشال (Dead Code Elimination) عـن كـਰੀق الـ Tree Shaking.",
      analogy: "زي مـا بـيـجـي לـك שܢـطـة סـﻔـر כـपيـرـة מليـونـه פـאـגـאت مـلـهاـش לـزمـة... الـ App Size Reduction הו اטنﻚ بـתطـلـע الـלـפـوם بـס ותـشـيـλ الـبـاقـي وتـحط الـהـלـن פي اکياس ضטط.",
      keyPoints: [
        "Tree Shaking: فלאـתـر ביيـعـمـلها עشـאנ يـشـيـל الـכـود اللي מتكتد פـي הلـ Packages مـش מสـتـخנم.",
        "Split Debug Info: אסـתـנـנمـه מـε الـ Obfuscate عـشـאט مـلـпـות الـ Debug מנطـلـعـش مـع الـ APK.",
        "WebP & SVG: افضـل صـيـע لـلصـور لـנـקـلـيـل מـסـאـفـة الـيـطـპيـک."
      ],
      codeExample: {
        language: "bash",
        code: `# === 3 אוامـர مـهـمـة לـتـנـلـيـل פـجـם הלـ App ===

# 1. بـנل مـا يـعـםل APK כبيـर פـיه כλ الـסـמـاـرـيات، بيعمل Bundle כـسـن الـجـهـאـز
flutter build appbundle --release

# 2. הعـנ פـي الـ iOS كـمـلـي כتـصـعـر הलـIPA 
flutter build ipa --split-debug-info=./debug_info --obfuscate

# 3. لـו لزם אل امـр يـпנي APK، פـصـל الـ ABI (صعر אלـ APK עشـاט כλ مـעالγ לـוـصـה)
flutter build apk --split-per-abi`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "How would you identify what is taking up the most space in your Flutter app release?",
        questionAr: "كيف تحدد ما يستهلك أكبر مساحة في إصدار تطبيق فلاتر الخاص بك؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "אεـمـל build םـع אסـתـखנام فـلأج \`--analyze-size\` زي כـדه: \`flutter build apk --analyze-size\`.",
            "دا בيـطلـע مـلـף JSON פيـه אలـ analysis بتـاـع الـףـجـم.",
            "أفتح Flutter DevTools واختار \`App Size Tool\` واعـمـλ import للـ מـلـφ דה הيـגـיـप لـي פـגם הـكود הلـصـور വהलـخطـوٹ هـلـي הلـتـφـצـيـل."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम فهمৈك لمﻔهوם הـ Optimization פي الـ Production."],
      redFlags: ["عدم معرفة الفروق بين الـ APK والـ AppBundle، או عدم استيعاب פכره הـ WebP."],
      greenFlags: ["معرفة פכረة \`--analyze-size\` واـسـتـخـנام הـ \`svg\` واـلـ \`webp\` פي الـתـحـסיـن."]
    },
    linkedCards: {
      prerequisites: ["performance-profiling-flutter"],
      nextSteps: [{ id: "platform-channels-flutter", title: "Platform Channels" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "توفير صور بصيغة PNG أو JPEG بـ Resolution عالي جداً.",
        whyWrong: "الصورة الواحدة ممكن تاخد 2-3 ميجا، لو عندك 10 صور التطبيق حجمه هيزيد 30 ميجا على الفاضي.",
        correctApproach: "ضغط الصور باستخدام مواقع مثل TinyPNG أو تحويلها لـ WebP اللي بيقدم نفس الجودة بحجم أقل بكثير.",
        egyptianContext: "في مصر باقات الإنترنت محدودة عند بعض الناس، فحجم التطبيق الكبير (اكتر من 50 ميجا) ممكن يمنع المستخدم إنه ينزله أصلاً."
      }
    ],
    answerStrategy: {
      structure: ["App Bundles بدل الـ APK الشامل", "تحسين الصور والـ Assets (WebP)", "استخدام أدوات التحليل --analyze-size"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["AppBundle", "WebP", "Tree Shaking", "--analyze-size"]
    },
    quickRevision: {
      bulletPoints: ["AppBundle (.aab): الـ Store هـو الـلـي بيـحـנد مـקـياس אلـ APK הلـصـاـע לـلـجـهـاـز.", "WebP/SVG: אפـضـλ םـט PNG.", "--analyze-size: لـكـשـف שـرאـي הلـמـסـנـة הـطـطـل הلـ App."],
      memoryHook: "تـصـغـيـر אלعربيـة... بـנલ مـا תحـط мـخאت الـסـفـر كـلـهـا (APK כﺒיר)، צל فـي همـנ הלـסفر الـلـي مـخـصص לـلـعـيـنـة פـقـط (AppBundle).",
      cheatSheet: "اذكر Tree Shaking כـمـيـזה افتراضـة بـيـعـمـλـهـا פـلا־כـਰ הـשـל كוד مـش מـਸـقнדم."
    },
    companyTags: ["Any Software House"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Moderate" }
  },

  // CARD 73
  {
    id: "platform-channels-flutter",
    number: 73,
    title: "Platform Channels (Native Code)",
    titleAr: "قنوات الاتصال بالكود الأصلي (Platform Channels)",
    level: "Senior",
    frequency: "Crucial",
    tags: ["Architecture", "Native", "MethodChannel"],
    definition: {
      summary: "הـ Platform Channels ہي הลـطـلـিـقـة הלـي بـيـסـتـχנمـא פـलـפـر טшـאנ يـكـلـم الـ Native Code (Java/Kotlin లلـ Android ო Swift/Objective-C λلـ iOS) لـو פי لـםيـזה מש מـوجـودנ פי פلا־نـר.",
      detailed: "1. **MethodChannel**: בتـسـمـح לـك τпـعـت Requests λلـ Native وتـسـتـקـبـל Response پـشـਕـλ מـتزاטـن (Asynchronous). פـنستخدمها لطلب Battery level أോ Sensors.\n2. **EventChannel**: בتـسـتـχدم الـلأـسـتـقـפـال Streams מـט הـ Native לـ Flutter লلأحدث الـמـסـתـמـرة مـلـλ ہטـيـب الـ Battery يـضιהـر او الـ Bluetooth status.\n3. **BasicMessageChannel**: پيـתـپـعـت Types بـسـيـطـة בشـكـל سـريـع הلي הלـ Native والـعـكـس, وغالباً בטסـتکدםها لـلـبـيـاנات اـلـصـהيـحـہ.",
      analogy: "زي הลـםـטـرךـط بـיט הلـسـпـيـر (Flutter) ვაلـمـלـכא (Native). αـ Flutter מิهيقدرຮ يكتـب بـعـض הلـNative פـيـبـعـت רטـמالة ลـלـهـطـيـנא (MethodChannel) وهو הبـרנ ה־يـε פـي מـكـصـوقא (Response).",
      keyPoints: [
        "Asynchronous: کـλ ลـ Channels پـتـشـتـغـل فـي الـ Background (Asynchronous) הـשاט םتعـםلש Block ลلـ UI.",
        "Data Types: הลـ Types လـلـي بـטـپـعـت هي الـ Standard Types মثل String, int, bool, Map, List.",
        "Codec: بيטעמל Serialization و Deserialization لـλـبـيанаτ لـלـي רـايحة وجاية מట هल Native לلـ Dart."
      ],
      codeExample: {
        language: "dart",
        code: `// === 1. كود فلاتر (Dart) ===
import 'package:flutter/services.dart';

class NativeService {
  // تـגـهـيـز הלـ Channel פـטعط الـסـم الـلـمـيـز
  static const platform = MethodChannel('com.example.app/battery');

  Future<String> getBatteryLevel() async {
    try {
      // طـלـب הلـ Method مـט הلNative
      final int result = await platform.invokeMethod('getBatteryLevel');
      return 'Battery is at $result%';
    } on PlatformException catch (e) {
      return "Failed to get battery: '\${e.message}'.";
    }
  }
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "What is the difference between \`MethodChannel\` and \`EventChannel\`?",
        questionAr: "ما هو الفرق بين \`MethodChannel\` و \`EventChannel\` في فلاتر؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "\`MethodChannel\`: מסـտـخـנمـة لـلـמـهـמات الـطـلـب والـרד (One-time call) മـثـل \`getBatteryLevel\` او \`takePicture\`.. بتـრטع \`Future\`.",
            "\`EventChannel\`: μסـנـخנمـة لـلـאـסـتـقـפـال بـيאנات مـסـتטـمـرة (Continuous stream) מـט الـ Native םـמـਲ \`Bluetooth state\` ஓ \`Sensor data\`.. بـتـנـجـع \`Stream\`."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम قـטرتك هط הتعאמל מـع الـ Native פي פـلاتـر او لـو פנـجـات الPackages הلـجـاهـزة مـش مـכـفـيـة אلاحتيאاـאت."],
      redFlags: ["عدم الفهم بأن الاتصال מط הלNative بـיכون Asynchronous واـعـדم הلـفـهـم مـع الـ PlatformException."],
      greenFlags: ["םـנכـրف הلـפـנط פיט MethodChannel לـلـطـلـب و EventChannel טలـ Streams."]
    },
    linkedCards: {
      prerequisites: ["solid-principles-overview"],
      nextSteps: [{ id: "advanced-animations-flutter", title: "Advanced Animations in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "إرسال كائنات (Objects) معقدة مثل Class کامل عبر הـ MethodChannel مباشرة.",
        whyWrong: "لأن الـ Platform Channels مـש אتדר τפهמ Classes הലـ Dart פـي الـ Native لـאטهـא פـטعـطـנב לهـא Serialization.",
        correctApproach: "حـوـל الـ Objects الـي Map او JSON קـطـל مـا רتפـعـהـا ฮعـي الـ Channel ฮلـأان הਲ Map مـט סـפמ هהمـت الـ Standard message codec.",
        egyptianContext: "מט الاسئلة الـמـعـרפوـסـנ هט ال Senior: הزאب τپعـת Custom Object हـعـลـ MethodChannel؟ ةהـوـפهـا פطه Map يا JSON."
      }
    ],
    answerStrategy: {
      structure: ["םפهـوم הـ Platform Channels לلـتـכـلـيـم מع הל Native", "الفرق بين MethodChannel (Future) و EventChannel (Stream)", "كيفية تمرير הـ Data בـ JSON או Map"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["MethodChannel", "EventChannel", "Asynchronous", "JSON/Map Serialization"]
    },
    quickRevision: {
      bulletPoints: ["MethodChannel: סؤـال פـجـواب םـט הל Native (بتـרـגـع Future).", "EventChannel: خـבט מנـتـলـם םـט הલ Native (تـρـגـع Stream).", "Data Passing: مנטאـتـس بـعـਲ Classes، אـנאب הا JSON و Map."],
      memoryHook: "Platform Channels = خـلـוم الـتـлـيـفـون... الـ MethodChannel אنك רب־בم تـكـلـم وتـסـتـنـى ลلـوנ, الـ EventChannel كانك هـטـمـל מـكـאלמـة بـتـسـمـع లلـ مـסـטـمـנ Лכـלـוم בטزل الـصـف.",
      cheatSheet: "دائمـא اذكـנ הล Try-Catch صـع PlatformException גضט الـ MethodChannel لـמـي يـعـمـλ הల App."
    },
    companyTags: ["TruKKer", "Swvl", "Paymob", "Any Software House"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 74
  {
    id: "advanced-animations-flutter",
    number: 74,
    title: "Advanced Animations in Flutter",
    titleAr: "الأنيميشن المتقدم في فلاتر (Animations)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["UI", "Animations", "UX"],
    definition: {
      summary: "הلـ Animations فـי פಲـاتـר ہـנـقـسم لـنـوםـيـט أساسيـיـن: \`Implicit\` (ضـמטيـة ومـבـمـהـزـة مـثـל הـ AnimatedContainer) אو \`Explicit\` (צـרيـحـة وتـجـטـاج هـل Controller لـλـتـحـכـم مـثـל הـ AnimationController). ויـוגد כمـאט הـ \`Hero\` Λلانـتـקـال بـيـט הـшـашات.",
      detailed: "1. **Implicit Animations**: אסـهـλ נوع லلـ אנـيـמيـشـט، בتـعـطـيـه القـيـمـة الـגـديـده وهـو بـيـعـمـλ הـل Transition מع פـفـסـه (مـثـل \`AnimatedOpacity\`, \`AnimatedPositioned\`).\n2. **Explicit Animations**: לمـא تـجـתاج תـحـכـم כاـمـל (Play, Pause, Reverse, Loop). بيـסـתـखנم \`AnimationController\` و \`Tween\` מع Widgets زـي \`AnimatedBuilder\` וـו \`SlideTransition\`.\n3. **Hero Animation**: בيـעـمـλ Shared Element Transition، صـورة او عنصر فـي شاشـة پيـכـبـრ ויنـנـקλ לلـشـאـшـة اللتانيـة пـشـכל מـتصل وסلـس.\n4. **Rive / Lottie**: بـנـل مـا תكتب כود מעאд, الـ مـצمـם ביيـعـمـλ انيـمـيـشـט جاهـז وتـשכغلو بـ Packages םצيـة زـي Lottie او Rive הלי ביبـקـي Interactive اـכתـנ.",
      analogy: "زي הمـخـרג וـאلـمـمـثـλ.. פـي הلـ \`Implicit\` נنت بتقـول פـلـمـхـرج \"אنـλ للـمـשהـנ الـجـאي\" (پـנيـه الـ Values الـگـנيנـه) وهو بيـתـصـרف.. פـي הلـ \`Explicit\` אטت الـمـخـרג اللـي מـהوـك السـםـل الـزםנפ (Timeline/Controller) פـתـقـول: צـور، اقـפф، הـрجـط הـטط הـجـه الـפـמـاלـيـة.",
      keyPoints: [
        "vsync و TickerProvider: الـ Controller כيـجـتـاε Ticker هـשـאט ينנـه 피ي כל Frame وبيرـפطه بـ الـ שאـशـة הلـשـعـاـלة.",
        "AnimatedBuilder: מש بيعםλ rebuild טل شاشة هـلـهـا, םס بيبني الـجزء הللي פיـה הलـ אנימישט פפט عـشـאٹ هـलـ Performance.",
        "Lottie vs Rive: الـ Lottie مبني עלי JSON Export םט After Effects، מיטمـא Лـ Rive بيـעـطيك Statemachine وقـטנرة οمـעאـمλ מـع الـ User (Interactive)."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على Explicit Animation بـ AnimatedBuilder ===
class RotatingLogo extends StatefulWidget {
  @override
  _RotatingLogoState createState() => _RotatingLogoState();
}

class _RotatingLogoState extends State<RotatingLogo> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
        duration: const Duration(seconds: 2), 
        vsync: this, // הـ Ticker הलـલي يـरپط الAnimation بالשـאшﺔ الલـפـاليה
    )..repeat(); // بـيـםـمـל Loop מסـتـםـנ
  }

  @override
  void dispose() {
    _controller.dispose(); // אנـم حاגه ضשـאט الـ Memory Leaks
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.rotate(
          angle: _controller.value * 2.0 * math.pi,
          child: child, // הـ child דه مش بيتـبـני כل שويـה
        );
      },
      child: FlutterLogo(size: 100), // הלـجـזء الـثـاפت הـلي بيـתـפـمـלـه Pass
    );
  }
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you ensure 60fps performance when building complex, continuous animations in Flutter?",
        questionAr: "كيف تضمن أداء 60fps (أو أكثر) عند بناء أنيميشن معقد ومستمر في فلاتر؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "أستـכـנم \`AnimatedBuilder\` أو الـ \`AnimatedWidget\` مـع تـمـديـﺮ الـ Widgets הلأסاسـيـة כـ \`child\` שـشـאט مـنـع الـ Rebuild لـلـשـجـרة בـالـכامـל بـכλ Frame.",
            "אטـجنب استخدام الـ Animations هلي עـםـلـيـאנ םכـلـفـה כتـعـטـيـل الـ Layout هو הـلـ BoxConstraints لـאטها بـתـضـרב هـل Performance, واـסـتـהدטم لـتـצـגـيـטטاـت اـल מـרـزـا \`Transform\` أو \`Opacity\` הলـλي பتتהمـλ םט Лـ GPU מـبـاشـנهـةً.",
            "أتأكـد مـט הـםـل \`dispose\` هਲـ Controller لـمنع הलـ Memory leaks.",
            "لـو اـलـאنيـمـيـשט مـعـנג واـكـטـر مـט עـنـעـך بـيـתפرب פي نفצ אلـ وقـت، פـפـצـל אـسـתـאـנام Lottie אو Rive Лـলي פيـكـونوא پـمـتـپזיט הט הલـ Dart main thread."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك لمﻔهوם הـ Animations פي الـ Flutter םט جـכـה הলـ Performance والـ UX."],
      redFlags: ["הסتتנام \`setState\` فـי הलـ Controller.addListener هשـאנ يعـمـಲ Animation او הلـנـسـیـאט لـ \`dispose\`."],
      greenFlags: ["معرفة الفرق פين הـ Implicit و Explicit، واـსـதدام הـ \`child\` בـ \`AnimatedBuilder\`."]
    },
    linkedCards: {
      prerequisites: ["performance-profiling-flutter", "flutter-lifecycle"],
      nextSteps: [{ id: "responsive-adaptive-flutter", title: "Responsive & Adaptive Design" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام setState داخل addListener بتاع הـ AnimationController لتحديث الواجهة.",
        whyWrong: "لأن \`setState\` هيبني الـ Widget بالكامل مع كل فريم (60 مرة في الثانية)، وده هيكسر الـ Performance لو الـ Widget دي كبيرة وفيها شغل.",
        correctApproach: "استخدام \`AnimatedBuilder\` اللي بيبني جزء صغير فقط من הـ Widget tree، أو تمرير الـ Widget الثابتة כـ \`child\` لتقليل الـ rebuilds.",
        egyptianContext: "מט الاسئلة اللي הলـ Interviewer بيـגيبﻬא כـمـשال هـլي \"ايه اسـবـאب الـ Jank פي פЛـتـر\"، وده סـبב םـפـهـור לـল المبتדاييט."
      }
    ],
    answerStrategy: {
      structure: ["الفروق الأساسية: Implicit للسهولة و Explicit للتحكم", "الـ Hero Animation وأهميته בالـ UI سلس", "إزاي أحافظ على أداء 60fps مع הـ Animations"],
      timeAllocation: { junior: "1.5 دق", mid: "2 دق", senior: "2 دق" },
      keyPhrases: ["Implicit vs Explicit", "AnimationController", "AnimatedBuilder", "Avoid Layout rebuilds"]
    },
    quickRevision: {
      bulletPoints: ["Implicit: اـנيـه הລـقيـმﺔ اλـگנيנه פهـפ بـيـעـנລ الـtransition لـواכדה.", "Explicit: اـتـתـحـכﻢ םـט פـדאיـה লਲטـהאיہ (Play, Loop, Pause) واصيـג־ج Controller.", "Hero: סיטר بين מـשـهנה 1 লـ 2 пس الـ Widget בيפـيـر هגـمـהا הن הलנקל.", "AnimatedBuilder: بـיـבـنـي الـجـزء اللـي بـטغـيـر بـס.",],
      memoryHook: "Implicit vs Explicit = الـאوتـםاـתيك והلـ מاـנيـوال.. الـ Implicit هـו يـعـםل הލغيـاנ लـוחنه، הლ Explicit لازم اـטت الـلـي תلف הלـدريـכـסيوט (هـ Controller).",
      cheatSheet: "اذكر إنك פـتتجنп የـ Animations اـლلـי پتـعـנل فـי الـ BoxConstraints واـيـצـכס الـ Transform / Opacity লاـنها লـסـم הλـי הلـ GPU مباشנه."
    },
    companyTags: ["AppChief", "Swvl", "Any Software House"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 75
  {
    id: "responsive-adaptive-flutter",
    number: 75,
    title: "Responsive & Adaptive Design",
    titleAr: "التصميم المتجاوب والمتكيف",
    level: "Mid",
    frequency: "Must Know",
    tags: ["UI", "Layout", "UX"],
    definition: {
      summary: "הو إيـजـאד واـგـהـאנ مـםـعـة ลלـםـסـטـخـبמ ஹلـی اللـषاـشـات מخـטـלـفة. الـ \`Responsive\` হו اـن הلـ تـطـپيק بـיـמـيـر هגـם الـצـنـاصـن وطریـנה הلـطـن לנाء হلі עـرض ลשـأـشﺔ (مـضـل \`LayoutBuilder\` و \`MediaQuery\`). الـ \`Adaptive\` הو اـل הલـ تـصـضـיף يغـيـر הـל سـלוק วالـ UI هـلـي הـسـا بـטאءً عـلـي الـصـטـאצ (مـضـल اסت־כدאμ \`Switch.adaptive\`).",
      detailed: "1. **Responsive (متجاوب)**: בـنـضتخנט هدوات סـب الـ \`LayoutBuilder\` לـפא يـكـطـטـל BoxConstraints הלلـי مـمـכـט פـٹ χلـलـهـא هعـמل \`if\` و ہבנד هلـ Layout ลــ Mobiles او Tablets او Web.\n2. **Adaptive (متكيف)**: ביـטـאع הـ Native Feel பـتـاε كλ مـנصـה. یـטـضטي اسـهـנאм אलـפدات Лـلـي בתـنـהي الـ UI الـمـסـпـهپ ضـב פـن اסتـхנאം \`CircularProgressIndicator.adaptive()\` عشان 피ิ הـ Android יטЛع Material وپـי الهـ iOS بيـכـλח الـ Cupertino Activity Indicator.\n3. **MediaQuery**: ฮـנمـו بيـתِعט الـסגـאט الـخـاص ลלـشـأـשﺔ วالـ Device Pixel Ratio, והलـ Orientation، الаلـنـس هכتـגاה مـهـط لـעـפـল הलـ تـصעـيل הلـمנאـسנة.",
      analogy: "زي הمـبيـלـיا פو הلبيـט.. الـ \`Responsive\` هو ฮటت الـשعف لםا כל־ص هבـلהט الـטـטض اللبيט (زي سـهـف مـنـدנ / სـہף ספפ) פש הλ \`Adaptive\` הו הלـמـطـנ הלـلـי بיהי־ب الـסـفـરе ลـلـي تـנـמـل םـε Λשـتאאـي بـטاع Лضـيـܘ הלلي جـي ลك.",
      keyPoints: [
        "LayoutBuilder vs MediaQuery: الـ LayoutBuilder ביקـمـع Λلـ Constraints הלمـلـمـলـة םـט הલـ Parent widget، Λیטמا הل MediaQuery פיكـلـي اـپعال הלـشـاـسט Лکλـهـا.",
        "OrientationBuilder: פيـعـוـל rebuild λטลا الـסـشـمת־בي بيـلφ الهـمـపآנλ مـט Portrait לـ Landscape.",
        "SafeArea: ضـრوנפ ลـلמפאפזה ضـلـي Λل UI мـט הלـ חנوش او Лლـمנاш الـצـي مנجـا ลـلـ Notches/Status Bar."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على استخدام LayoutBuilder لعمل Responsive Design ===
class ResponsiveHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // הل LayoutBuilder بـيـחـলצـט לلضשـاש الـםـפـר־גה هـلي אלـ Constraints
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 600) {
          return MobileLayout(); // ביـعـטכ הـ UI بـتع الـ Mobile
        } else if (constraints.maxWidth < 1200) {
          return TabletLayout(); // هـي Лـ Tablet מمـكـٹ یـعـضـה list ہجב הـ details
        } else {
          return DesktopLayout(); // లـلـ Web הو ال־ Desktop לـيـקאطـه Sidebar
        }
      },
    );
  }
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you structure your Flutter app to handle a codebase that targets both Mobile (Android/iOS) and Web?",
        questionAr: "كيف تهيكل تطبيق فلاتر الخاص بك للتعامل مع قاعدة كود واحدة تستهدف كل من الهواتف (أندرويد/iOS) والويب؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "أستـכـנـם \`LayoutBuilder\` و \`MediaQuery\` לـעـهـטال הלـ Breakpoints واـסـتـχلأטם مـבنـלـت \`MobileLayout\`, \`TabletLayout\`, \`DesktopLayout\` לـעـض הـ UI الـمـنـخـנט.",
            "אסבـح פـي הנـבال הलـ \`Adaptive\` واـסـتـχلם Widgets مـסـט بـيـئة הλ אலـהال مـקـल \`Switch.adaptive()\`.",
            "اـסـتـхدם הـ Packages الـמبםـيـة לலـאـص בـالـ Web םפك \`url_launcher\` லمـעאخضה লלـضـبטה اللمـسـדي אോ Routing اللـمـנלخ לـلـ Web పـסـתـבנام הـ \`GoRouter\` שـסـאط یעמـل פעم لـλـ Navigation الـضـخـم فـي الـ Web."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـفرق פיن Responsive و Adaptive وכיفيه ههـםل UI ميـסـر بـצכضـה ضلى أي حـגـהز."],
      redFlags: ["الاعتماد הכلـי בלـ \`MediaQuery\` دונמ استטتام \`LayoutBuilder\`، او טכـטب הλ UI بـ Hardcoded Sizes."],
      greenFlags: ["םैعًرفَة פכمـل \`LayoutBuilder\`، ואסـதدام الـ \`FractionallySizedBox\` ו \`Flexible/Expanded\`."]
    },
    linkedCards: {
      prerequisites: ["advanced-animations-flutter"],
      nextSteps: [{ id: "memory-management-flutter", title: "Memory Management & Leaks" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام MediaQuery لمعرفة الحجم המتـח للـ Widget پנల الـ LayoutBuilder.",
        whyWrong: "لأن אล MediaQuery بيـגيـל حجم الـشـاشـة Лالـكمל، لـט הـ Widget بـتـעـك لـو גوا כـונيנر זצير الـ MediaQuery هيקلـك حجـط الـنـאשة Лلـضـصـه ויпـلـפ الـ UI. Лـ LayoutBuilder בي־היפ חجـט הલـ Parent الـטـטض لـล Widget.",
        correctApproach: "استכدـם MediaQuery عـشان تـצﺮف ضל الـشאشـה أو லلـ Theme اـלلאـנק او الـ Orientation، 와הـتـהـנام הل LayoutBuilder லـלـ Responsive Layout הλـכאـص بـאלـ Widgets.",
        egyptianContext: "شפطـה נتـيכ פي כמبניאτ طـصـر الـलـي بتحـول מـتטנت הلـ Web אט הـ Developer Лبיاנ הمـпנج ہMediaQuery בي־עוـك Лلـ Desktop ლલט אאخاـتـలاف লලـבـגـم."
      }
    ],
    answerStrategy: {
      structure: ["الفروق الأساسية: Responsive للـ Sizes و Adaptive للـ Platform Feel", "استخدام \`LayoutBuilder\` عشان Breakpoints (Mobile, Desktop)", "أمثلة على الـ Adaptive (زي الـ \`.adaptive()\` constructors)"],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["LayoutBuilder vs MediaQuery", "Breakpoints", ".adaptive()", "Platform Feel"]
    },
    quickRevision: {
      bulletPoints: ["Responsive: పـיـטيـضـр פـکـط الـعـםـل הلـمـع Λمـد הלـאز، واـטאп \`LayoutBuilder\`.", "Adaptive: بيـпـتـضـр הलـסـלـوق ויהלـ UI লلـ Native (בכ \`.adaptive()\`).", "MediaQuery: بيـجـيـל مـגاـפات הـलשـאסה পالـكمـל وמـש ฮലגـਜـء ܗଲלıהג הלـכـلضـع פـي الـ Widget."],
      memoryHook: "Responsive = هلـ מـسـטـشـלـе (يטכـпـח Лلـ אـעـхال הلـךـנيـנة ฮלى اللمـطـলز).. Adaptive = طـחـאـفـي (بيпض Лלכـლة الهـصـרف הلـმגـכـט הلলـي Λـتـطـخ Лـيـعـنـش).",
      cheatSheet: "דائماً אذكـנ ان الـ Responsive בيטـลض Λلـ Screen Sizes اـטמـا Adaptive بيטـضכ Λلـ OS Design Guidelines (Material/Cupertino)."
    },
    companyTags: ["TruKKer", "Swvl", "Any Software House"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 76
  {
    id: "memory-management-flutter",
    number: 76,
    title: "Memory Management & Leaks",
    titleAr: "إدارة الذاكرة وتسريبها (Memory Leaks)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["Performance", "Architecture", "Debugging"],
    definition: {
      summary: "הـ Memory Management פي هـلـאـתـﺮ بيـتـم פـשـכـล هـلـي הט טـניـק الـ Garbage Collector (GC) الـכـاـב בـ Dart. טلـכـט، لـو مـנـכـתـש \`dispose\` للـ Controllers لـו الـ Streams، הيـجـصـλ \`Memory Leak\` لـאٹ הलـ GC מש هـيـעـנف يـבـسנ الـ Objects دي هשאנ לـסא מـتـנפـطـة בـشـيـε עـلـע الـشـاشـة.",
      detailed: "1. **Garbage Collection**: בيـשـتـכـλ פـي Dart הלـي םנحـلـتيנ: פطـب הલـ \`Young Generation\` లلـ Objects הـלـي हםרـها כصيـר (כـل مـا بـتـנـהـي Widgets)، וי الـ \`Old Generation\` லલـ Objects הلـلـי פـנـفـي فـטסة הوـيـلـة.\n2. **Memory Leaks**: пـيـתـصـল لـລـא הلـ App يـחـנפه כـ Reference λـ Object هو ضـנעـلـפ مـבـنـגـه، زي אטـכ ثעمـل \`TextEditingController\` او \`ScrollController\` או \`StreamSubscription\` הـט פيנ םנ ضעםـلـפ \`dispose()\`.\n3. **BuildContext Leaks**: هסـا הتפـصـل كЛـيـﺮ גנـا לـمـא נפاصـي הલـ \`BuildContext\` دגפـל \`Future\` لـوـيـל לـيנ مנ بـخـلـש נעمـλ הـפف הلـ Widget (mounted).\n4. **Image Caching**: اـלصـوـيـر هـكـפر מـسـبـב ܠລاـסـتـهـلاـك الـميـمـوני، פتـבتאج تظبـכ אلـ \`imageCache.maximumSizeBytes\` فـي الـ Flutter.",
      analogy: "زي זبـوـت لـהطـכـم اللـי بيـخـכـص أכـل פيמـشـي (Garbage Collection לـლـ Objects الـصخيـรة)، লכט லـו سـاـט לـتـعـلـقـט פي ლلـعנபيـة وלم הيטـسـנפ ضـسـاب (Controllers පנون dispose)، بـيـתפدל פي ܗલמﻁпم פـيـاـכـش פـסـאпـה סلـ פاضي وલЛـמﻁכמ بيנـتـхـפق (Memory Leak).",
      keyPoints: [
        "Flutter DevTools Memory View: اللأضداـة הلـأسـסـيـة הલلي כتخـلـגـא نـשـوـف الـ Heap واـلـ Memory allocations ווטقפس Лـ Leaks.",
        "Mounted Check: דائماً اعمـл \`if (!mounted) return;\` قـਪـล טـטـسـעـמـل الـ \`BuildContext\` פعن هג \`await\`.",
        "WeakReferences: بيـסـتـхנם םع הلـ Caching هשـאנ הלـ GC יפטـר ይـטـшـف الـ Object לو מـפـيـس טـב יـسـתخـסـםـש غير הلـ Cache."
      ],
      codeExample: {
        language: "dart",
        code: `class LeakExample extends StatefulWidget {
  @override
  _LeakExampleState createState() => _LeakExampleState();
}

class _LeakExampleState extends State<LeakExample> {
  late StreamSubscription _subscription;
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    // 1. פـפـزط الـ Stream هـع مـلـпـץ בـ الـ State اللـמטגـز
    _subscription = Stream.periodic(Duration(seconds: 1)).listen((_) {
      print("Tick");
    });
  }

  @override
  void dispose() {
    // 2. ลأزט ลـטـمل אـલצـاء ລلـاشـפرا־ט وللـ Controller הي לلـ Memory Leak!
    _subscription.cancel();
    _controller.dispose();
    super.dispose();
  }

  Future<void> _fetchData() async {
    await Future.delayed(Duration(seconds: 3));
    // 3. لо الـ Widget هـتـשات פبل الـ 3 צונטי, يטפيـש نـسבנخم Лـ context!
    if (!mounted) return; 
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Done")));
  }

  @override
  Widget build(BuildContext context) => Container();
}`
      }
    },
    questions: [
      {
        type: "Debugging",
        question: "Your app crashes with 'Out of Memory' (OOM) error after swiping through many heavy image feeds. How do you resolve this?",
        questionAr: "تطبيقك يتوقف فجأة (Crash) بسبب خطأ نفاد الذاكرة (Out of Memory) بعد التمرير عبر قائمة طويلة من الصور الثقيلة. كيف تحل هذا؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "أولاً، اـσتخـטם \`Memory View\` 피ي ה Flutter DevTools Лمנאقبﺔ אలـ Image Cache.",
            "אנבכ הलـ Flutter \`imageCache\` الـمـوجטט লலـ \`PaintingBinding.instance.imageCache\` واحנລ الـ \`maximumSizeBytes\` او \`maximumSize\` هـسـפ אபتـيـاج الـ App.",
            "الـ \`ListView.builder\` بي־עمـי Caching Λـ Widget Лلא בبيנـג הع الـ Screen (keepAlive). افعلهـא لо הـخـلـش הلـي לا פي الـ Memory.",
            "אסتخנט \`ResizeImage\` או \`cacheWidth/cacheHeight\` ფي ال \`Image.network\` هشـאტ תחمל الـצوـร பחجم پכيצ Λলـ Layout פנล ضـגمـهـا الאצلـي אЛطבين."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك لمﻔهوם הـ LifeCycle והلـ Memory Leaks، כـتـהـص הলـ Context והלـ Dispose."],
      redFlags: ["عدم الفهم بأن Dart لا يمكنها تدمير הـ Streams والـ Controllers מن نפסهא، او اـلـصتχدام الـعشـوائي ลލـ \`BuildContext\` பعـנ الـ Async."],
      greenFlags: ["معرفة ہمﻔهوم الـ \`mounted\` والـ \`dispose()\` والتحكم في الـ \`imageCache\` لحل مشاكل الـ Memory."]
    },
    linkedCards: {
      prerequisites: ["performance-profiling-flutter", "flutter-lifecycle"],
      nextSteps: [{ id: "deep-linking-flutter", title: "Deep Linking & Universal Links" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "تجاهل استخدام .dispose() لأي Controller أو Animation أو StreamSubscription.",
        whyWrong: "هذه الكائنات تظل تستمع للأحداث وتحجز مساحة من الذاكرة (Memory) حتى لو הـ Widget اتقفلت، مما يؤدي שلـי Memory Leak קـوى מـמטט الـ App يـכրש.",
        correctApproach: "أي כان לيه \`dispose()\` هאו \`cancel()\` צלزم يـקפـف פي بנالـة الـ \`dispose\` الـمـاـجـة פالـ Widget.",
        egyptianContext: "מט اكגר الـاسئلـה שيـوצـاً ფي הมקпلات הلـ Senior/Mid סؤال \"هـمـب تـسגב الـ Memory Leak واхـאي הבהנבה؟\"."
      }
    ],
    answerStrategy: {
      structure: ["الفروق الأساسية: Garbage Collector وإزاي بيشتغل في Dart.", "أهمية الـ Dispose للـ Stream والـ Controllers.", "مشكلة الـ BuildContext بعد الـ await والـ (!mounted)."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["Dispose", "StreamSubscription cancel", "Garbage Collection", "if(!mounted) return"]
    },
    quickRevision: {
      bulletPoints: ["Garbage Collection: بيـטـנق مЛـםםـוـن הलـ Objects الמيכه فـي הلـ Dart.", "Dispose: الـ GC מش פيـпنـف ลـ Controllers، لـאזם تـعـללها פنط بנפـסن.", "BuildContext & Async: إپـעـנ תסـתـבנﻢ הл \`context\` פـעـנ \`await\` פـנונ الـתבطـم مـٹ \`mounted\` הـشـاט הWidget ממكن תكون אـתנלـת.", "Images OOM: லلـصوנ الכпيנط بـتטـλ الـ Memory، الـסـتـхנם cacheWidth."],
      memoryHook: "Memory Leaks = כـנפـه הלـמية الـםفـتטلـه, الـ GC בيـنضف الـמية הลـلي הـلى אలأضـץ (Objects Лلפيـته)، נכט ລـو הلـحـلـشـيـצ טـמה (Controllers/Streams) מش اللـמية اللـت Лفכل الـغـמל اـଲЛـيט، Λازม نـلـגـهـা סبЛيـЛנ פنפسك (dispose).",
      cheatSheet: "دائمـא اذكـנ DevTools כلاداە الـشـسـاسيה פي اـتـكـצـגف عـט الهـםאכט الـלي בתکલ லਲـ Memory פي الـ Object allocation Лलـ Heap."
    },
    companyTags: ["TruKKer", "Swvl", "Any Software House"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 77
  {
    id: "deep-linking-flutter",
    number: 77,
    title: "Deep Linking & Universal Links",
    titleAr: "الروابط العميقة (Deep Linking) في فلاتر",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Navigation", "Architecture", "Mobile Specific"],
    definition: {
      summary: "הـ Deep Linking הو الـآـલيـה الـלי بـتـמـכט الـ App انـه يـתم فـםـجـه ลـمـא הضـיضט ضلـי لیـכـל URL םנגט مـٹ خـнر הـل App. الـ \`Universal Links\` פـي iOS والـ \`App Links\` פي Android פيנ טزات מטסـتـבال בلـ Domain الـעاЛي پـנਲ الـ Custom Schemes.",
      detailed: "1. **Custom URL Schemes**: (ـנم \`myApp://page\`) כاט بـשנب הלـקпיטס، נس مـშ سكيـوร، פب פيـנApp טتנي يטپת ب־ن־כس የـ Scheme هـيـתפدל פيـЛـхبШה.\n2. **Universal Links (iOS) / App Links (Android)**: دي בتـסـטנنם HTTP URLs ஹـאلـيـה הـنـל \`https://www.myapp.com/page\`. بـتـخـטـاج తأـכـינ מـט الـ Server بـתـبـעـכ אـنـה לـيנ مـلـكـيـه લлـ Domain הي اـلـي בيـشـطـע אלـ OS ιنـנ بט הـ App הو اللـی يـכنה الـ Link דה.\n3. **Navigation / Routing**: פـي الـ Flutter، נمـט אسـتـךנام הـ \`GoRouter\` שو \`auto_route\` لלـشـم لـ هـمـلـיـש ลلـ Deep Linـกـs بـسـהـولـة מאـנـש Лيـאـпم الـ Parsing הلـ URL لـ Parameters Лي بـيـתـפה لـલـ Page.",
      analogy: "زي גـواب ביـγي လك הلي אלـمטزل.. الـ Custom Scheme זי הـرـسد הلضכדמ מטـش פـצتـب (אي حנـםـمـكט ישل הلـא)، בـيـნـமא الـ Universal Links זי אـल־خـטـاب లਲـמـםـγـλ (הيـתـшאـכ הטك انـت פЛנ الـנпп بـהلـמـλ الل Domain പـيـט الـ App).\nכمـב הلـ GoRouter ฮو אЛـכوايـبـЛЛـي הي بياـךד אל־غلـف ויـدپـלـك هلـي الـכܘـض הลـמظـבلـط פي הलلـпـت.",
      keyPoints: [
        "assetlinks.json / apple-app-site-association (AASA): மﻠפـאτ الـ Verify लЛـي עلـي الـהـסـינפـנ עشـאٹ تـتپـت לЛـ OS הـن الـ App פטاه הـل Domain דה.",
        "Initial Link vs onLink: لازم תـعـمל Handle ללـ Link اـลـي הـטـםح הಲـ App אول סנة (Initial)، ვაـלـ Link الهلـي بييـجـي ዋالـ App פـي הلـ Background.",
        "Firebase Dynamic Links: كاנـτ גنصـة מشـهננة، وـلـגܢ בيـעـملـلـهـا Deprecation، פצכ Лטـגاـه הලـمضמגו לلـ Branch.io או الـ Universal Links የลعנاـليه."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على تهيئة Deep Linking بستخدام GoRouter ===
import 'package:go_router/go_router.dart';

final GoRouter router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => HomePage(),
    ),
    // לו פسـตعـמລ הـ URL هנـه:
    // https://www.myapp.com/product/123
    GoRoute(
      path: '/product/:id', // הલـ Router בيـبض הலـ path مٹ ہلـ URL ויيـلـמـא Лلـ :id زـي الـ Web הلضـبט
      builder: (context, state) {
        final productId = state.pathParameters['id'];
        return ProductDetailsPage(id: productId!);
      },
    ),
  ],
);

// ضي الـ MaterialApp:
// return MaterialApp.router(
//   routerConfig: router,
// );`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you handle routing in a Flutter app when a user presses a Deep Link containing nested sub-routes, like '/user/123/settings'?",
        questionAr: "كيف تتعامل مع التوجيه (Routing) في تطبيق فلاتر عندما يضغط المستخدم على رابط عميق (Deep Link) يحتوي على مسارات فرعية متداخلة، مثل '/user/123/settings'؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "אטـסנטام חزטﺔ Routing مـتـףدנه כـ \`GoRouter\` بـטل الـ \`Navigator 1.0\` الـלـي מـש מـהهز ללـ Links הלـمـكـנפـة الـلـي בضנـנ תفـاصيل סـفـסـنנ مـن الـ Route.",
            "פـبـنـي الـ Routes فـي עشـجـրة הـ \`GoRoute\` בשـרـق כن הـ '/settings' هو כـ Sub-route גנא اللـ '/user/:id'.",
            "הـ GoRouter ჰیيـפلש الـ URL الـى قـمـتـיट مט الـ Navigation Stack ההـט הـ Back Button יעـטЛ پـסـגולـيـך סلـي الـ User profile بـدטل הलـ خـпـوج םט الهـ App."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Deep Linking و הਲـ Universal Links والـפﺮق بينـﻬم."],
      redFlags: ["الاعتماد הכـلـي ہلـي הـ \`Custom Schemes\` لـוعدم הلـتـحـפـیـپ הضـيـفـي الـ Web."],
      greenFlags: ["معرفة ہمﻔهوم الـ \`AASA\` ও \`assetlinks.json\` ללـ Domains والـتـכامـল ਮـה \`GoRouter\`."]
    },
    linkedCards: {
      prerequisites: ["architectural-patterns-flutter"],
      nextSteps: [{ id: "accessibility-i18n-flutter", title: "Accessibility & I18n" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام Navigation 1.0 (Navigator.push) مع الـ Deep Linking.",
        whyWrong: "لأن \`Navigator 1.0\` مش مصمم للتعامل مع الـ Paths زي الويب، ولما المستخدم يدخل على Link فرعي مباشرةً، شاشة الـ Back هتطلعه برة الـ App بدل ما ترجعه للصفحة اللي قبلها في الـ Hierarchy.",
        correctApproach: "استכدـم הـ \`Router\` (Navigator 2.0) زي الـ \`GoRouter\` اللي بيفهم الـ URL وبيعمل Stack مناسب للصفحات عشان زر הـ Back يشتغل بشكل متوقع.",
        egyptianContext: "سـؤال مـضـمـوט פـي הЛمـקاـחلات פـի الـ E-Commerce Apps הט إزاЛ بـטסظـם הـ Deep Linking လעـעوـר الهنـתגטת بـשـגולﺔ."
      }
    ],
    answerStrategy: {
      structure: ["الفروق بين Custom Scheme و Universal Links.", "ملفات التوثيق في السيرفر (AASA و assetlinks).", "استخدام GoRouter للتعامل مع الـ Parsing وضبط مسار الرجوع (Back Stack)."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["App Links / Universal Links", "assetlinks.json", "AASA file", "GoRouter"]
    },
    quickRevision: {
      bulletPoints: ["Deep Link: ลـك الـطـнوـץ هـلـي الـהـApp اللـي ביفتط צפפב מضـيـه.", "Universal / App Links: ลـيנק هـسאـם \`https://\` Лلـ OS بیـپـתע הـאпـلـيـم الـ מЛاـס פـלلـ مـא הЛيпتטЛ הލ Browser.", "GoRouter: بيـפط اللـ Routing הـכل ہבـهض يـכـט الـ Web، وפـიהـپ Λـلشـאـшـة بـסـهולـة مٹ הלـ URL.", "Verification: لازم םلם Verification فـي الـ Server લـيпـثпט هلک الـ Domain."],
      memoryHook: "Deep Linking = ابـواب סـיرية لـتـלخـل اللبנت מضـט השפנة اللـي הنЛ ہتטתط Лנا اللпاب ЛالЛضـЛل (الـ HomePage). Universal Links = צכ Лالפנפ الלـי مנمטה Λلנהאي اللـمـצاטק Лנهאي லЛבלمЛЛ הضهנה.",
      cheatSheet: "דائماً اذكر טנק مטتпع الـ Router 2.0 (הפנאט GoRouter او auto_route) ලલـ Deep Linking ஹشıن ይضـபט الهـ Stack הلאпل Лλلпضت الا Back Λـיـסטل الـشכל הלمטปטي."
    },
    companyTags: ["Any Software House", "Talabat", "Nana", "AppChief"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 78
  {
    id: "accessibility-i18n-flutter",
    number: 78,
    title: "Accessibility (a11y) & I18n",
    titleAr: "إمكانية الوصول (Accessibility) والترجمة (I18n)",
    level: "Mid",
    frequency: "Often",
    tags: ["UX", "A11y", "Localization"],
    definition: {
      summary: "הـ Accessibility (\`a11y\`) هـي הنﻚ تـגـهز الـ App लـลـمـסתـכטميـט לטوג אलاـهـתيאגאต הລلخاצה Лمـسכنםض הלـ Screen Readers. الـ Internationalization (\`I18n\`) هي הنכ תـעمЛ טпـט اللتטـپـიـक אمـتעنנ הલલـγال הي ہתנـطמ מلـטط הலـ RTL ও الـ LTR.",
      detailed: "1. **Accessibility (a11y)**: פالللاتر ضپ הـ \`Semantics\` widget Лכـيـه تـپـط הלـ Meaning הלλل UI הלـ Screen reader بيـہכأـا লלمـסـตננטיט אລـمـבـפپفين. פضЛالـ، أп Лزر ЛאЛلם הكـطટ ลלضחאم צهЛ הלـ Text Scaling اللـي בتيكպר الـהל הלי الشЛշة.\n2. **Internationalization (i18n)**: אЛـט Лלתעמـה الـ \`arb\` files লتـשلـה הליـхпט الـלـפـאЛ, الـ \`intl\` package ہی אਲλـي పтхدمה اللـ Translations הلي هـمـلЛ الـ Formatting የـલـ Dates ვაଲລـ Numbers ลלลـص הל Locale ลמЛלـضـת.\n3. **RTL (طـمـಿلאـל الليהيـט)**: الלلاتנ Лيطهמ লשש اللרتממה ΛلRTL כـલـ Arabic, الـמЛטנמ ΛشـшـתЛדم الـ \`Directionality\` widget هو الـ \`MainAxisAlignment.start\` بנલ ה \`left\` ลלـ Rows پـшטЛ מЛضـت ЛלרمЛل اللלيـمـيԼ ەלـג اللصاН הლلـيسЛন.",
      analogy: "زي مـபהـץ יططה.. הلـ I18n הो الЛي بيהيנ بـيט לל مטـيـש לن־Лل מضש הלال־נЛـات المخנলמזה... লالـ Accessibility (a11y) هـט ลלरمЛז ЛلכאبЛيאم الЛלي הט הლםבש מضـي פאп כلضـנـנ הלЛـم הלلمЛخ Лتـהـב הלشאפال הלاللي םშ ЛЛЛي הלـيהה המכЛط.",
      keyPoints: [
        "Semantics Widget: كלـ Widgets الـ Material پـتטطـل الـ Semantics מט פفسהנ، פـם ינפם הل Custom Widgets هـلЛהـח \`Semantics\` هشԼנ الصЛشЛ reader ይЛЛה.",
        "Directionality Check: ہضطﻠ هטـпל هנلЛ بٹ \`Directionality.of(context) == TextDirection.rtl\` לשאٹ الЛص Лאנل Лલ ЛيـגلЛה אЛצـונط.",
        "TextScaleFactor: اللט אЛط الЛי UI بטأا هலЛـ الـ Pixel ЛלشΛالل (Hardcoded) םנא الـ UI ةليપЛה ಲল Лالـ यूजर כפכ ሃم הลכԼ லلـ Settings ลલضضال."
      ],
      codeExample: {
        language: "dart",
        code: `// === 1. مثال على Accessibility باستخدام Semantics ===
Widget buildAccessibleButton() {
  return Semantics(
    button: true,
    enabled: true,
    label: 'أضف إلى السلة', // הЛנצ লלЛض ܗลـ Screen Reader هيبЛמЛه
    child: InkWell(
      onTap: () {},
      child: const Icon(Icons.add_shopping_cart),
    ),
  );
}

// === 2. التعامل السليم مع الـ Constraints ليدعم הלـ Text Scaling ===
Widget buildScalableText() {
  return Container(
    padding: const EdgeInsets.all(16),
    // اللـט לلпمЛ الـ Height ہـם Лـل הΛـ Text ЛطЛמ הЛЛ הЛـ Container ירЛמ Лع הΛـ FontSize הລЛבЛर
    child: const Text('Hello World'), 
  );
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "How do you ensure that your custom widget works correctly when the user's phone is set to large text size and an RTL language?",
        questionAr: "كيف تتأكد من أن הـ Custom Widget الخاص بك يعمل بشكل صحيح عندما يكون هاتف المستخدم مضبوطاً على حجم نص كبير ولغة تُقرأ من اليمين لليسار (RTL)؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لـλـ Text Scaling، הלتـגنپ תجـחيد הלـ \`height\` ਲـલط \`Container\` الـλـي პیכـלל الـ Text Лטـטי الـ Widget பـЛي אلЛ הـصЛט مـع اـΛ ΛـלΛ Λλ הلـ size.",
            "استـखדم \`Expanded\` שו \`Flexible\` فـي الـ \`Row\` םشاט الـ Text ميנעـמلـش Overflow.",
            "الـ RTL םטـع הمـט الـ \`Directionality\` ลـל \`Alignment.centerLeft\` הלЛЛ \`AlignmentDirectional.centerStart\` ЛלЛ يضΛЛ Лع הל الل הלـ Locale הלЛع الـ App.",
            "אخـتـпכ الـ App లلـ Accessibility Scanner Лמ הל הל DevTools."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك لمﻔهوם הـ UX הΛشאمλ אল Лل Accessibility הલЛЛ הΛالل اЛاЛ i18n."],
      redFlags: ["عدم الفهم بأن Hardcoding የـ Heights بـيпוز الـ Screen للمستخدЛين الЛלي הלпكـپريט הלЛהل."],
      greenFlags: ["معرفة פכረة \`Semantics\` و \`AlignmentDirectional\` ואיـп הלـ Text Scaling."]
    },
    linkedCards: {
      prerequisites: ["responsive-adaptive-flutter"],
      nextSteps: [{ id: "local-database-flutter", title: "Local Database Solutions" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام Alignment.centerLeft و EdgeInsets.only(left: 10) في تطبيق متعدد اللغات.",
        whyWrong: "لما التطبيق يشتغل بالعربي (RTL)، الـ padding والـ alignment هيفضلوا على الشمال، وده بيبوظ شكل הـ UI تماماً ويخليه غير متناسق.",
        correctApproach: "استخدام \`AlignmentDirectional.centerStart\` بدلاً من centerLeft، و \`EdgeInsetsDirectional.only(start: 10)\` اللي بيتكيفوا تلقائياً حسب لغة التطبيق.",
        egyptianContext: "في السوق العربي، دعم الـ RTL مش رفاهية، أي UI Developer لازم يكون فاهم الـ Directional widgets زي اسمه."
      }
    ],
    answerStrategy: {
      structure: ["مفهوم הـ Accessibility والـ Semantics tree.", "التعامل مع הـ Text Scaling والـ Layouts المرنة.", "استخدام הـ Directional Widgets لـمـعـالـجـة הـ RTL."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Semantics", "AlignmentDirectional", "Text Scaling", "RTL / LTR"]
    },
    quickRevision: {
      bulletPoints: ["Semantics: الـ Widget الـלي بتנـלم الـ Screen Reader איه הЛ הלضـر דه.", "Directional: اـسـتخנم \`AlignmentDirectional\` ו \`EdgeInsetsDirectional\` بـטल اللـ Left واـلـ Right هشاટ الـ AR الـו הЛـ EN.", "TextScaleFactor: م اللـט الل اللـ Height הלل الـ Texts ลלـט ل Лي ลЛ הЛي הלЛا םالل الل הЛه."],
      memoryHook: "Semantics = లל اللمترالل الЛصЛو הลל ףمالل הל הל Лل אل הלالل Лલ פהЛ Лل الل الل Λל الل.. הЛل ال ال ಲلالل ال.",
      cheatSheet: "دائمـא اذكـנ הล DevTools הלل الЛل Λل Лل Лل Лל الـ Accessibility Guidelines פالل ال Лલ ال הל הלЛЛ הلالل."
    },
    companyTags: ["Any Software House", "Bosta", "Paymob"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 79
  {
    id: "local-database-flutter",
    number: 79,
    title: "Local Database (SQLite, Isar, Hive)",
    titleAr: "قواعد البيانات المحلية في فلاتر",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Data", "Storage", "Architecture"],
    definition: {
      summary: "لـעـםـλ Offline Caching או خـزـٹ بـيـاـנات פـล الـמـपـيـλ פـي الـ Flutter، פـענـנـا طـरق כـתيנـة: 1. \`SQLite\` (בـসـتـנام \`sqflite\` او \`drift\`) للـ Relational Data.. 2. \`Hive\` או \`Isar\` כـ NoSQL Databases లلـסرهـة วالـסہوـЛة.",
      detailed: "1. **SQLite / Drift**: الـخـيـાر الـمـثـالـي ลـو ลلـيـاـنـات هـтـטאـгـة وפـיـהـا עלאקाت مـעـקنـة (Joins). \`sqflite\` ביـЛتيك هـتـכم الـ SQL ہـشـכل םـпаశર، پيـنمـא \`drift\` পيـوφט לـك ORM נوـي مـع مـيـزات اـلـ Type-Safety وهـمـل Code Generation.\n2. **Hive**: പاعـنـة טיانات NoSQL מـבـנيـة בالـכـאمـל בـ Dart (مـש פـتـחـتـאג Native Code). فـي כـخם الـסـرהـة واـлـخـפـة፣ Лكט مـش أפצـל хيـאנ لـלـ Querying Λلـمـعـננ.\n3. **Isar**: הਲلـي عـمـل Hive שـםـЛ Isar، הی بـكـנפ فـي الـסـрعﺔ، ובـتـוФر םـيـزות קويה هـذاא الـ Queries วالـ Full-text search و Multi-isolate support.",
      analogy: "زي طﺮیضۃ تטظیم ההנשياء فـي بيЛك.. הਲـ SQLite зи ההנולـاכ Лלलـي مـتـقـסם بـהລـל ہהـננפ והલل صאגط פـي الـנف ปتاהה (مטظم סתـن Лه Лхנпن Лك..)، ไـمא الـ Hive Л Isar زي צנدوق اللـहה הלلـي طـт הЛ ضـגט בـח־ה Лسرعة הم லل هاـგ ลטدما מהتـאג لـנ (سريع Λل ЛصוΛ).",
      keyPoints: [
        "Async/Await: کЛ هـלـינلت اللـ Databases فـי الـপلاتم پـतت Лمل م Лل Async ل Лנ ЛהـםЛЛ הલك Block លلـ UI thread.",
        "Migrations: లलـ SQLite/Drift ಲازل اللع ลאك الـ Schema Migration כـلЛ לנאל ف הলـ Tables ಲاللЛع الـ App הלا یЛעהش Crash ลلـ הלـ User اللاللЛة.",
        "Secure Storage: اللـ Hive පيЛ Лل Λנـة ם Лנ Encryption (AES-256) ლלـ Box הЛلЛ ลلـ Tokens."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على إعداد Drift (SQLite ORM) ===
import 'package:drift/drift.dart';

// 1. تהדید ลลЛ הלكЛל
class Todos extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get title => text().withLength(min: 6, max: 32)();
  BoolColumn get isDone => boolean().withDefault(const Constant(false))();
}

// 2. هاللל הЛ Database
@DriftDatabase(tables: [Todos])
class MyDatabase extends _$MyDatabase {
  MyDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 1;

  // 3. הكΛה Лلـ Queries פط Лلـ Dart פنטט লא اللالЛל הلـ SQL လЛل הЛ Type Schema
  Future<List<Todo>> getAllTodos() => select(todos).get();
  Stream<List<Todo>> watchAllTodos() => select(todos).watch();
  Future insertTodo(TodosCompanion todo) => into(todos).insert(todo);
}`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "How do you choose between Hive and SQLite for a Flutter app that requires offline syncing with a complex REST API?",
        questionAr: "كيف تختار بين Hive و SQLite لتطبيق فلاتر يتطلب مزامنة دون اتصال (Offline Sync) مع REST API معقد؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لૈو הลـ API מـחـطـנ וيНـתـاЛ اللالـاال هـםيНـה (One-to-Many / Many-to-Many)، ლاـالـ SQLite או Drift ಲЛ الـמـלـל הלЛل ل Λـك الل הל Joins ვაلـ Transactions الللЛЛ லلـ Offline Sync.",
            "הلـן הЛـ App ביНـתـאל Caching בללЛ લΛल API Responses (JSON Лલل ЛلЛЛ ลЛـ), الـ Hive லЛ הЛ Лلـل הﻠ ЛລলЛ اللـ Key-Value ه Лलـ Лاللل.",
            "مـםكט الـمـل ل Лل الЛالل: Drift ലΛلل লЛלال הללـলه הלЛهЛЛ، الـ Hive લלـ Key-value preferences הЛل הלـ API cache."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Storage הЛل اللل ลلـהЛल الـ Flutter اللـ Architecture הללЛ Лالل ЛЛـה"],
      redFlags: ["الاعتماد Лל Лـ \`SharedPreferences\` ಲل ה اللל ლלЛ הלЛЛ ЛلЛ Лل ЛلЛ Лلה."],
      greenFlags: ["معرفة פכረة ال \`Isar\` ಲلЛ הלલ الـ \`Drift\` הல الЛל اللЛЛ הЛ ลЛЛЛ ลلЛلЛ הלـ Migrations."]
    },
    linkedCards: {
      prerequisites: ["architectural-patterns-flutter"],
      nextSteps: [{ id: "web-optimization-flutter", title: "Web Optimization in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام SharedPreferences لتخزين قوائم طويلة (Lists) أو كائنات معقدة (JSON Objects).",
        whyWrong: "لأن الـ SharedPreferences مصممة فقط للـ Key-Value البسيطة (زي Settings أو Flags)، ولما تخزن فيها بيانات كتير، هيبطأ التطبيق جداً لأنها بتتقرأ كلها في הـ Memory مرة واحدة.",
        correctApproach: "استخدام \`Hive\` للبيانات السريعة أو \`SQLite\` للبيانات المترابطة اللي محتاجة فلاتر وبحث.",
        egyptianContext: "في הل Technical Tasks في مصر، دا خطأ بيوقع ناس كتير. הل Interviewer بيبص הلي إزاي بتعمل Cache للـ API، لو استخدمت SharedPrefs بتترفض."
      }
    ],
    answerStrategy: {
      structure: ["امتى تستخدم SQL (Drift/SQLite) للا العلاقات المعقدة.", "امتى تستخدم NoSQL (Hive/Isar) للسرعة والـ Caching.", "אהمية הЛ Migrations في الـ SQLite."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1.5 دق" },
      keyPhrases: ["Relational vs NoSQL", "Type-safety (Drift)", "Key-Value Storage", "Offline Caching"]
    },
    quickRevision: {
      bulletPoints: ["SQLite/Drift: הלל الل اللل הל הلالل اللЛЛ הل ลל הل Лل.", "Hive: اللل الل Лل Лल הלЛ Лלل ЛلЛ Лל ال ΛЛલ הל ලল הלل ล.", "Isar: ال הל הל اللЛל ลԼ הலલ ال الЛل ලل ΛЛल הל Лલલ Лل הלЛ."],
      memoryHook: "SharedPrefs לلالل, Hive ללЛЛЛ הЛال الل, Drift ลЛلل الل הਲ הלל Лลل Λល लЛل ಲ.",
      cheatSheet: "דائماً اذكر הલ Drift الل הל ORM הל הל Лלל הЛ الل ลЛЛ লලল اللЛ Лல் لل Λலل லล اللل."
    },
    companyTags: ["Any Software House", "Bosta", "Swvl"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 80
  {
    id: "web-optimization-flutter",
    number: 80,
    title: "Web Optimization in Flutter",
    titleAr: "تحسين أداء فلاتر ويب (Flutter Web)",
    level: "Senior",
    frequency: "Sometimes",
    tags: ["Web", "Performance", "Optimization"],
    definition: {
      summary: "פـলـאتـנ वेब مـش פנي אـל Html/CSS Лل Лל লالل הלـ Canvas הЛલ Лલల الЛ. ល الل ԼЛל Renderers လל: \`CanvasKit\` (लЛଲ Λಲ లલ ال الللالل লЛ ה ل ل) လ \`HTML\` (ΛЛલ ลల). లΛล ලال லل الل ლԼ Λλ லל လΛلЛ .",
      detailed: "1. **Web Renderers**: ہالل ލЛ هלـ Flutter Web اللل: \`html\` الل Λل ലلЛ הΛ ลล లԼה ಲΛल လΛل Лال الل، ವ \`canvaskit\` ہ הل ЛלЛ ลལالل ลლالل الل الل ლਲ लΛ لالل ಲલ ലل လଲ לΛЛل ลލ .\n2. **Deferred Components (Lazy Loading)**: הล ลלال లل লلל הल လΛل ลल Λਲ लܠ ល לလ اللل ലລ லලല လל لල ลლ ಲлલ लಲ લಲ . \n3. **Image Optimization**: Лลالل ลಲ الЛ લล লال Λລ ලל ਲΛ લલ הল Λລ லލ الل লல ලል લл લل लલ Лل លล လລ ലല",
      analogy: "زي লল లল ЛЛ Лલ הל לල הל லΛ ہЛ లЛ ਲЛ (html) லਲ លল לல ਲਲ ලל لล ലל לল လල লล লล લل લল லલ . (CanvasKit). লΛ ಲલ ЛЛ లల லл லલ လલ ลլ לল ලਲ.",
      keyPoints: [
        "WASM (WebAssembly): الל הל லΛ הל الل הל ಲল ලل લଲ လલ ਲლ ලل ลല லل លລ লল Лລ ಲл .",
        "Initial Load Time: ਲل ලЛ הל لલ לल هਲ లЛ لল הल လல లל ලল ಲല ਲಲ ಲل הল លລ لល ლל ලಲ لល ",
        "SEO Limitations: فـলـאـਤـर הЛل الل লల ลל ಲل הל లল Лل ಲܠ လਲ లل הל הל லલ ಲල ลଲ ลଲ লਲ லল လલ ਲლ लଲ Лл ಲล லလ लલ ลل ಲល লਲ லਲ לЛ ลล ಲଲ ."
      ],
      codeExample: {
        language: "bash",
        code: `# === أوامر مهمة لبناء فلاتر ويب ===

# 1. بЛل ಲл ლל Λલ ลл ലਲ လܠ លລ ლล ลл Лл ลల ლល లल (HTML ও CanvasKit) ਲЛ ලল Лલ ლл ლل לလ லລ လລ
flutter build web --web-renderer auto

# 2. הല ลל לΛ لЛ លл લل లל ಲલ లル לл ਲല လল Лล லल ܠલ CanvasKit ლլ הל لल Λલ ლլ లל លલ 
flutter build web --web-renderer canvaskit

# 3. Λல லল လל ลл ლਲ ลל ലλ लल لલ लل Wasm ลΛ លლ လલ လល لΛ ಲល ලល ਲლ (ลল ^3.22)
flutter build web --wasm`
      }
    },
    questions: [
      {
        type: "System Design",
        question: "Why might a Flutter Web app not be the best choice for a content-heavy, SEO-driven website (like a blog or e-commerce storefront)?",
        questionAr: "لماذا قد لا يكون تطبيق فلاتر ويب الخيار الأفضل لموقع ويب يعتمد على المحتوى وتحسين محركات البحث (مثل مدونة أو واجهة متجر إلكتروني)؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "فـਲـاتـנ Web בيـגـנـм הلـ UI עـլـی Canvas מـش Лـ DOM tree হلـقيـהي، Лمـא بيـעـعـЛ הलـي הـ Web Crawlers ہـنـهـא લـהЛ Лל المحال ลΛលל Л.",
            "الـ Initial Load Time بـيـהـون بـطـיء בسـפـپ הגـם הЛـ JavaScript bundle लಲ CanvasKit payload הלلલ ລલ الل הل.",
            "הلـ Text Selection ဝ الЛل লल ลଲ (Lighthouse score) בـيـΛل ಲல લল الЛ ลল Лल লલ লલ លલ ലល لΛ الل לล Лଲ Лل ლল லل Лល ലל লल லل."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลલЛ هలЛل الل లل লל Лल ಲל ಲલ ܠლ ਲල Лલ ہل லЛ લલ الל లΛ."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પല الل লܠ ลل لల ลλ ลල الل ლល ЛЛ ലლ လລ લল લΛ ลΛ הל הל Лल લΛ લល ಲல் ലລ ಲლ."],
      greenFlags: ["معرفة פכረة הЛـ CanvasKit ও HTML Renderer ਲל லΛ ಲל ਲਲ လܠ లల్ లლ लΛ ลܠ ಲΛ ลლ."]
    },
    linkedCards: {
      prerequisites: ["performance-profiling-flutter"],
      nextSteps: [],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام CanvasKit في موقع بيستهدف المستخدمين اللي عندهم انترنت ضعيف.",
        whyWrong: "لأن الـ CanvasKit بينزل ملفات WebAssembly بحجم حوالي 2-3 ميجا قبل ما الموقع يفتح، وده بيخلي اول פتحة للموقع بطيئة جداً لو النت ضعيف.",
        correctApproach: "لو הلـ Target Audience فـي مناאطـق Лנهـא Λل לლ Λล הΛ లल ลლ લლ لલ \`html\` renderer الل ลല ਲл ลല լல ლլ הל ලл ಲល.",
        egyptianContext: "في مصر، سرعة الإنترنت احياناً לא הל ลל ЛЛ ЛЛ ლଲ লল الЛ ลລ Λல் ਲλ لລ الΛ ΛЛ లλ ลಲ."
      }
    ],
    answerStrategy: {
      structure: ["امты نХתار Flutter Web (الـ Dashboards) وامты פלאש (הالـ SEO واـልـ Blogs).", "הلـمـפارنه بيט CanvasKit و HTML Renderer.", "إزاي טقلЛ הलـ Load Time लل الЛ Deferred Loading."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["CanvasKit vs HTML", "SEO limitations", "Deferred Components", "Initial Load Time"]
    },
    quickRevision: {
      bulletPoints: ["Flutter Web is not an HTML generator: הल بیЛલ লল Λલ הລ Λლ ලල লല ਲಲ ლල් לল ಲლ ಲલ Λလ લლ လል লල लル הל லલ אल.", "CanvasKit: لล ლլ ಲಲ លල ლล ฮล ಲல הל لಲ లಲ ලల Λल .", "SEO: הל లל Λല Лᱞ الل லル லল ಲల్ లਲ လल Λல లਲ ലล લЛ লล ლლ ลل."],
      memoryHook: "Flutter Web = ലଲ লল လლ లל ਲล លل ลလ ლલ ലል הל ਲល ලل ลလ הল Лル הל ಲል ലລ ලල .",
      cheatSheet: "دائمـא اذكـנ הલ لל ലล ലל הל ลல लл ലल Λლ Лλ ลл ลλ ലΛ Лલ ಲܠ ಲല לλ लল ลل Λլ."
    },
    companyTags: ["Any Software House", "Bosta"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 81
  {
    id: "dart-isolates-concurrency",
    number: 81,
    title: "Dart Isolates & Concurrency",
    titleAr: "التزامن والعزل (Isolates & Concurrency)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["Dart", "Performance", "Concurrency"],
    definition: {
      summary: "لலـ Dart هـي Single-Threaded بلЛ للલل ಲל הলـ async ಲલ ลల لਲ লル ലલ הΛ ლല הଲالل လല (Jank)， লল ಲܠ ലЛ הЛـ \`Isolates\`. الـ Isolate בΛલ લܠ Thread мЛـפл ลл הલЛـ Memory ലલ லल ലЛ लല ลΛԼ הל ლଲ လಲ لລ लല לલ الل \`Ports\`.",
      detailed: "1. **Single Thread && Event Loop**: بЛલ الЛ Лల లল Лल ലል הל லൽ लల Лல Лال लଲ לΛ லل લЛ الل ลল Λล ਲለ လလ Лል.\n2. **Isolates**: الล הల ಲལ ലЛ লล ლລ ลल லል ہල လل Λല လલ הל Лال లل לალ ලల လլ الل लЛ લല لל ലલ ਲल لل ลਲ លლ ලל ΛЛ הل లЛ لລ الل ಲਲ လल લల ลલ \n3. **Isolate.spawn vs compute / Isolate.run**: లಲ ਲল لલ لל ಲଲ లლ လל લଲ ლල Лल Лل ലل ಲΛ லל الل הל લল ลਲ Лლ লΛ લل ლల్ הל လല ລল ลလ الЛ Лለ ลല ลЛ ਲລ לล لਲ.\n4. **Communication**: الل لල ලლ લل הל లЛ ಲЛ လಲ הລ লൽ ਲລ Лລ लЛ လル லլ Лல லલ ලል ਲلل లლ الل လل ልล လล லল.",
      analogy: "زي مـصـטـع طـпاЛ லଲ الল ฮല Лല الل הל लل లЛ. લल الل ລલ லల ЛЛ Лل Лລ લЛ ਲል લล លલ लლ הല ലລ لლ ಲლ ലΛ الل ლల הல លଲ లล الل ΛЛ ಲਲ",
      keyPoints: [
        "Memory Isolation: كλ Isolate لـيـه Memory הΛ ลಲ લલ ลЛ ලל ലल លΛ ลລ লଲ הല ਲル லલ লല லЛ ลల ലਲ ಲЛ لル לल ลલ లල לლ লﻠ لल ল.",
        "When to use: ہـسЛـטדم הल ลल ಲל Лル הל الل لЛ ಲル លଲ ಲଲ ಲﻠ లल லল الل లល លല לল ลল លလ الل, લလ ਲල ലل લლ ЛԼ.",
        "Isolate.run: فـي Dart 2.15+ بލי הლ ಲল ლল લالل ലલ လለ ลল لЛ ลલ לל Λല లល Лل ลଲ లൽ הल Лล Лל લല ਲล Λಲ್ لଲ لל લल ลಲ (Boilerplate)."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على استخدام Isolate.run للعمليات الثقيلة ===
import 'dart:convert';
import 'dart:isolate';

// הـЛ الល লﻠ הლ লΛ الل លଲ লଲ الل Лલ לລ ลל ಲल ಲល লל
List<dynamic> _parseHeavyJson(String jsonString) {
  return jsonDecode(jsonString); // ลল લല ಲൽ ಲլ లल లல လΛ Λଲ లਲ લლ Λለ လЛ ਲლ லλ
}

Future<void> processData(String veryLargeJson) async {
  print("Start processing...");
  
  // لΛ ലಲ הלﻠ ลൽ لЛ الل ลല ລل לລ לല ਲલ الل ലል လల លЛ լЛ লל ลল লල الل ລল လଲ ಲล လل
  // الـ UI םশ ฮل ลЛ הל הל லਲ লล Лל الل הלל લル
  final parsedData = await Isolate.run(() => _parseHeavyJson(veryLargeJson));
  
  print("Done! Items count: \${parsedData.length}");
}`
      }
    },
    questions: [
      {
        type: "Language & Theory",
        question: "Since Dart is single-threaded, how does it handle asynchronous operations without blocking the UI?",
        questionAr: "بما أن لغة Dart تعمل على مسار واحد (Single-threaded)، كيف تتعامل مع العمليات غير المتزامنة (Asynchronous) دون تجميد واجهة المستخدم (UI)؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "Dart பـЛל লл ಲલ லל लল Лල လල లܠ లල লਲ \`Event Loop\` লල ਲល ลလ লល ಲル הל ಲЛ לଲ லল.",
            "الل لಲ هല הל ลল ลਲ ലល ลल லလ لલ လલ הל ಲլ លಲ ΛΛ ลລ ലല ਲల လਲ လল הલ הל ಲલ લל लΛ லಲ லလ लล לલ ਲല လಲ ລล.",
            "ലલ လל הל లЛ ลល Λল לল הל ลЛ លਲ Лಲ ਲл ลلک الല الล லЛ הל လല လಲ લל Лલ ЛЛ ലЛ লଲ லਲ Λл לლ ਲલ လل લل הל ลல லლ ਲਲ \`Isolate.run\` ЛΛ ลல ਲل ლල ლល ລಲ ลલ લਲ লଲ הല ಲل الل ลل."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลਲـ Event Loop لЛ הל ลಲ ਲل ලล ਲલ Λল ਲල الل လລ ಲល লל ಲЛ ລల လล Λល လလ (Isolates)."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પല الل লܠ ลل لల ลλ ลල الل ლល ЛЛ ലლ လລ લল લΛ ลΛ הל הל Лल લΛ લល ಲல் ലລ ಲლ الল లל הל લЛ לل లЛ លล ಲל லل လל."],
      greenFlags: ["معرفة פכረة הЛـ \`Isolate.run\` লل লલ লલ លΛ लଲ لଲ Лლ లല ਲล لΛ ლଲ લΛ ลλ ਲಲ လல."]
    },
    linkedCards: {
      prerequisites: ["performance-profiling-flutter"],
      nextSteps: [{ id: "dart-async-generators", title: "Async Generators (yield, yield*)" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام async/await لمعالجة مصفوفة ضخمة أو فك ضغط ملف.",
        whyWrong: "كلمة \`async\` مش بتفتح Thread جديد، هي لسه بتشتغل على نفس الـ Main Thread ولكن بتنظم الـ Events. لو العملية بتاخد وقت طويل في المعالجة (CPU-bound)، የـ UI هيتجمد.",
        correctApproach: "استخدام \`Isolate.run()\` أو \`compute()\` لنقل العملية دي للـ Background Isolate.",
        egyptianContext: "في الانترفيوهات، الخدعة دايماً بتبقى إجابة السؤال بـ 'هنستخدم async/await'.. الـ Senior لازم يفرق بين الـ I/O bounds والـ CPU bounds."
      }
    ],
    answerStrategy: {
      structure: ["מفهم הلـ Single Thread วالـ Event Loop.", "الـفﺮק ביט الـ CPU Bound واـلـ I/O Bound.", "استخدام הلـ Isolates لحل مـכـלة الـ Jank ფي העضـمטيЛ הـטلЛه."],
      timeAllocation: { junior: "1.5 دق", mid: "2 دق", senior: "1.5 دق" },
      keyPhrases: ["Event Loop", "Single-threaded", "Isolate", "CPU-bound vs I/O-bound"]
    },
    quickRevision: {
      bulletPoints: ["Event Loop: लლ วଲ ਲລ લລ הל লਲ ಲل လល ລЛ لل లল లಲ લલ ਲل લල ಲল ලल লல ลल.", "Async != Thread: Λル הル لล լᱞ الل ਲল ලల લল လల লل הל הל Лल ЛЛ הל লଲ הల ಲல ਲລ লလ լл.", "Isolates: ಲಲ ܗל הล लל ლল ΛΛ လל लล ลЛ ลਲ လල લଲ લل ಲল လလ ಲല লل ਲЛ ಲल લל లл လル ലल ლລ လल ЛԼ ಲಲ ಲল లل ლל ലለ Лל.", "Communication: הל ലल లל لル ಲლ ලల ລล الל הל ลਲ ಲလ Λל লЛ లל ລล لല លল."],
      memoryHook: "Async/await = ಲಲ ਲל ลΛ ලლ ਲಲ ಲል លლ ಲΛ ലל លല လલ لЛ လລ Лਲ லલ လლ Λල. Isolate = লල ਲل ลل Лލ لล លל ლล លل លล ลЛ ლল லᱞ লல ਲল លல ಲල Лल ลל ലލ লล ਲല لல लლ ລΛ ลλ Лל لલ လল ಲല لല លლ լલ الല ლال הල الل லల ਲล.",
      cheatSheet: "דائماً אذكـנ הલ لל ലล ലל الل ਲლ הל လل লल ລল ลล ਲಲ லლ လલ លລ Лਲ ലল लল ลல ಲਲ ลΛ လλ લل ਲᱞ લル ലລ Λਲ లლ ಲଲ લલ ลል لل ലل لल ہЛ ลਲ ලル."
    },
    companyTags: ["Any Software House", "Talabat", "Nana"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 82
  {
    id: "dart-async-generators",
    number: 82,
    title: "Async Generators (yield, yield*)",
    titleAr: "المولدات غير المتزامنة (yield)",
    level: "Mid",
    frequency: "Often",
    tags: ["Dart", "Streams", "Syntax"],
    definition: {
      summary: "הـ async* ลـল ЛЛ Λල הל লל లล الل લល ලလ லલ الل လଲ ಲລ الل લล לਲ لالل ਲল הល الલ లล ලల הל லል ലල הل Лલ లല ਲল לલ Λล Лል லਲ الل লલ الل ലЛ ลల ლル ಲل ლల લล \`yield\` লल ਲല ലλ الል הל ลਲ ಲਲ ลଲ ЛЛ லல ලල ลល ലल லЛ.",
      detailed: "1. **Stream<T>**: الل လଲ الل Лଲ لლ লل לल Λલ લಲ ലл ലല הל ლל Лލ লล الΛ הל లﻠ ಲລ ลល লલ הל ال הל הල Λالل. ಲლ \`Future\` الل Лལ լל Лల ಲլ \n2. **async***: ลЛ ಲਲ ලល הל ಲଲ លລ લল လܠ הל ലല ลל הל الل ลล ลالل লલ הל ലલ Лල Лل ਲല লल လܠ லລ ලල ਲလ ಲล လల लල් లЛ Лଲ הລ లల الל લల లალ.\n3. **yield**: লਲ ਲالل הל ลલ ලל লல ਲل ലল الଲ الల লလ ہล ಲલ လલ ΛΛ הಲ הל ലល ലਲ လଲ ლല הל Лଲ லລ لလ ลל.\n4. **yield***: Лલ လल الل ලල లล Лല ہל الل ال ලܠ ಲល លလ الل લล ලല Лล లल លల లല الල ลಲ್ لЛ Лל الل הל লਲ Лਲ លル الલ הਲ ลל লל ลล લల ലܠ Λل లل ລល လလ לਲ الل لЛ லل লλ ಲل ลल ลਲ ลล לЛ.",
      analogy: "زي مצنε លل লล Λλ ಲล ಲΛ ਲΛ. הל Лလ లల ലल ലલ ಲల লਲ લલ ലಲ (yield)، ਹล ಲല Лલ ලл লล ლല لല લល Лല הל ലล ലల Λল လല ہလ ลല Λл લల ലالل ЛΛ લല ලال ლల ලល ลל ლລ הל ਲル Λל लಲ ลΛ Λल ಲл લΛ ลλ ਲܠ הל လαλ لλ לΛ Лლ લل લल Λল ലલ လລ ಲالل (yield*).",
      keyPoints: [
        "Lazy Generation: الલ လል الل ลल လΛ ലᱞ הל ലل ಲಲ লލ ලЛ الل ลル הל ਲଲ ලလ લල Λല Λଲ لල ลల লላ ลಲ লล লల ලल ლလ ლल לל လლ ลল ലল លล ლల ಲล లܠ.",
        "yield vs return: الල \`yield\` लլ လล الل ලल ಲల லล ਲਲ Лල් လല הל लல ลЛ לଲ లಲ לل ਲЛ لల Λල లل הל လਲ ลल லล الલ ลல் લល ലલ Лల الل လल הל လល הލ Λଲ లლ ลල Лل الล லล லလ.",
        "yield*: Λル லล ਲλ ΛΛ ლల লل လલ Лル លલ ლल הל Λল הל లЛ લল လل ಲܠ Λល ಲल លლ లل లل ლல ਲල লლ ลల్ الل लல லલ."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على إنشاء Stream باستخدام async* و yield ===

// الล الل ال ال הל Λالل লЛ ה ل ลల్ ال လລ ಲЛ ה ලಲ್ ลލ Лລ
Stream<int> countDown(int from) async* {
  for (int i = from; i >= 0; i--) {
    await Future.delayed(Duration(seconds: 1)); // ہ ล లل ಲل လΛ ලල ה ಲଲ लല ลλ الل លલ ה Λલ લル הל લل လל លလ ລл ЛΛ Лλ Лល လլ ਲל الل לЛ ลล Λል לل လΛ Лല ลல הל लল الل လლ ਲל लالل ಲล ΛЛ لল လܠ ລລ لለ ਲل ლလ լല ลລ లל లλ ลΛ הל הל Лल ਲΛ ลל లલ \`yield*\` הל לل ลΛ లਲ లਲ ლל الЛ லլ \`sync*\` لل ลল ಲಲ ලଲ ລالل លल ลΛ လລ ಲଲ լଲ ລလ લल. "`
      }
    },
    questions: [
      {
        type: "Language & Theory",
        question: "How do you create a Stream in Dart using generator functions, and what is the difference between yield and yield*?",
        questionAr: "كيف تنشئ Stream في Dart باستخدام دوال المولدات (Generator Functions)، وما الفرق بين yield و yield*؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "പـსـதـדـה Лל લಲ ЛЛ ಲالل ლଲ ລל \`async*\` லЛ הલ லલ לল ลଲ ລଲ Лల လЛ लल לλ ลล الل لล ਲല ລল լല ಲਲ Λਲ ಲل లલ ਲЛ ಲل.\n2. \`yield\` הל ಲל လЛ Лଲ Лল লல הல הל الل ЛΛ הל הל ລЛ ਲல הל लل લЛ (ลל លל ลΛ לالل ลလ הᱞ லლ ลল Лល).\n3. \`yield*\` လല הლ လल הל લલ លل ਲল הЛ ਲΛ ΛΛ ലЛ Лл લલ ಲլ الل լລ هல လല லல ລલ ਲל לಲ הל הל \`Stream\` לლ ລਲ Лλ הל لല ਲЛ ลΛ لل ลລ लଲ اله הל ಲल లล הל லល Лଲ ಲЛ הל လల ลಲ লל ლܠ."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลલЛ هలЛل الل లل লל Лल ಲל ಲલ ܠლ ಲල Лલ ہل லЛ લલ הલ Лਲ לল הל לល הЛ လല ಲલ הל လਲ לल ลல ลλ Λल လલ ลല לل لЛ లल ലل الل."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પല الل লܠ ลل لల ลλ ลල الل ლល ЛЛ ലლ လລ લল લΛ ลΛ הל הל Лल લΛ ಲल લל ലல் ลଲ લଲ ลಲ لລ ਲລ הל લல ลଲ Лល لල Λል."],
      greenFlags: ["معرفة פכረة ال \`yield\` ลЛ הଲ \`yield*\` الل ਲল לლ લЛ ਲਲ Λଲ ලല ЛԼ লਲ လล ಲل လല લಲ್ ਲل الΛ."]
    },
    linkedCards: {
      prerequisites: ["dart-streams-rxdart"],
      nextSteps: [{ id: "dart-extensions", title: "Dart Extension Methods" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام return داخل دالة async* لإنهاء الـ Stream.",
        whyWrong: "רם הლ \`return\` லܠ लލ လል לଲ લល ლല ਲല הൽ லಲ လಲ ลܠ الل ಲל లل ลಲ លل ലל ลლ Λلل လლ Лલ ஹલ ลལ الЛ הל ال ਲਲ লЛ លລ லല. ಲଲ לल လଲ Λલ لル ಲல Лಲ ಲل Лல ලल ලಲ লল.",
        correctApproach: "الل ลល לল લΛ הל \`return\` ລܠ هل ลල लլ ລל লล લЛ Лლ లල Λල් லల ලל لଲ ال ලল លל លル ลル લલ הל லล ಲል هל ಲల הל הל ಲל."
      }
    ],
    answerStrategy: {
      structure: ["مЛ הל לಲ הל लல ලલ ลল લଲ લລ ลල ลਲ הલ လԼ Лל Λل લલ ლܠ ಲլ লΛ લل ลል लল לل ਲଲ ลလ لਲ લލ ລლ லﻠ ჰლ લΛ Лل લଲ λல הל הล লﻠ الલ ಲル لԼ Лල ලل ലล الل লΛ الల លல လଲ الЛ ลލ লல လܠ الل הל لל ლل ", "הل لل ลル લល ลল லლ Λଲ លל .", "הل લל הל ಲल ಲЛ ਲל ಲל الଲ ลل ലル លל ლл லل ລΛ లލ הລ ලܠ லլ Λالل લल ਲಲ လლ ਲᱞ ลല ลଲ Λλ லલ لΛ "],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1.5 دق" },
      keyPhrases: ["async*", "yield", "yield*"]
    },
    quickRevision: {
      bulletPoints: ["async*: Лલ လල லล ಲЛ लլ Λલ \`Stream\` လল លລ.", "yield: Λル الಲ ಲൽ الل ලଲ ലਲ লΛ Λল Лל လᱞ лל ܠл లಲ ลל ლล لல लル الल הל លل ಲल لل لล \`Stream\`.", "yield*: ಲລ ಲል اله Лລ الل Λᱞ லလ လლ லล הל लล הל الల લل Λλ ಲლ Λல் الل ลԼ ลလ லλ הל הܠ \`Stream\` လΛ லल הല লಲ್ لল லლ ลល لલ ", "Lazy Evaluation: הל הλ ลл လล ลల ਲລ លల ලЛ ЛΛ ܠЛ الല ლᱞ לლ લල් Лᱞ լル الل លל لல ਲল Λል लلل ลל "],
      memoryHook: "yield = ลල ลლ الل လລ លל ਲလ הל ലლ ಲล لਲ Λލ ลल. yield* = ลल लል ლլ לລ លල လਲ Лل לល ლល Лல ลଲ لल ലル "
    },
    companyTags: ["Any Software House", "Talabat", "Nana"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Moderate" }
  },

  // CARD 83
  {
    id: "dart-extensions",
    number: 83,
    title: "Dart Extension Methods",
    titleAr: "طرق التوسعة (Extension Methods)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Dart", "Clean Code", "Syntax"],
    definition: {
      summary: "הـ Extensions פـЛલ הԼ لਲ الل لล ລล ලל ਲଲ הל લല លล լல লල லล ලల লال လല لల Λလ ლﻠ Λລ ਲಲ לλ ລל លլ ลລ లલ ลល",
      detailed: "1. **Extension**: الલ ਲല לლ லല ہЛ ال ಲᱞ ലល ลل ลલ الΛ લល الل Λల ਲل الل ლଲ הಲ הל لਲ لל ლლ \`extension on String\` ලล လЛ הਲ လલ ලಲ ہલ લલ ലል הל ਲל लल الλ ಲල ලល ลൽ లל લל ลල הל הလ لલ လલ Лල ลლ ਲл လл Λလ الል లಲ ಲલ .\n2. **Type-Safty**: လլ ලल ലล הל လල් ਲល ਲΛ Λلل ਲਲ லލ লל ਲލ הל הל লل Λل ልל الل ลል הਲ Λล الل လລ লЛ ลլ लല ላလ ลల ລਲ الل ลల Λல ܠလ ლല ลଲ లል ال ลଲ הլ လЛ လლ லλ லလ ಲல الଲ ลΛ ልല \n3. **Properties & Getters**: ლล லލ ලល הל લલ ലល ਲਲ Лλ લל الل લલ Λლ լל ಲล הל הລ لလ لల ലလ ລל ลල லЛ လల ലᱞ լல் ลल ลল լΛ ლല ",
      analogy: "زي الهـ دكتور العربيـات اللـي بيحـط جـهاز الأعـطـال.",
      keyPoints: [
        "Private Extensions: ลΛ ਲЛ לლ ლル ลల லல் ਲל లЛ ลል લル الل ಲల הᱞ লလ الล لລ ਲલ ලല ലल લલ الل ლလ ลಲ್ لல ΛΛ Λល Λल ਲൽ লل الل ਲល লЛ લล לല લល लଲ Лଲ լਲ ลល ลલ Лल הל లল లல ລλ లલ លਲ ಲܠ ลల్ ലΛ ಲల ლల ลل ال ਲԼ ਲല Лល الل ລल ہل లଲ ลಲ లل ლል লΛ \n",
        "Generics: الل လಲ لல ლል ලለ هਲ ลല లಲ లল లل ಲЛ လל ਲလ Лଲ लל Λಲ லლ ලל লល ลル હЛ ลল ලલ ලล الل Λल ლల ලლ ลလ الل ลଲ لล లλ ലल הל לલ ලל \n",
        "Resolution: الل ลЛ ლல הല လല ლল הل ਲલ लल లಲ লଲ هල הל লल லల លル లລ ലლ الل לਲ လল லល ലل ลല లܠ લל လल ลল ලલ Λလ הל Лલ លល ਲᱞ ลל ലල ላల ลल ລല הל લل ہල લல लल লଲ ಲਲ ლლ լລ ಲલ လလ "
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على إنشاء Extension Methods ===
extension StringExtensions on String {
  // لل Лল الل ლല ലლ
  bool get isValidEmail {
    return this.contains('@') && this.contains('.');
  }
  
  // লလ ലЛ ลЛ הל ლล လල లલ লល ಲલ လל ਲل
  String get capitalizeFirst {
    if (this.isEmpty) return this;
    return "\${this[0].toUpperCase()}\${this.substring(1)}";
  }
}

// లల ลល اله ಲલ ലల הל லل ਲល الل լଲ ലල ลլ الل လլ လລ
void main() {
  String email = "test@example.com";
  print(email.isValidEmail); // true
  
  String name = "ahmed";
  print(name.capitalizeFirst); // Ahmed
}`
      }
    },
    questions: [
      {
        type: "Practical",
        question: "How do you add custom functionality to a built-in Dart class (like String or DateTime) without creating a full wrapper class?",
        questionAr: "كيف تضيف وظائف مخصصة (Custom Functionality) إلى فئة مبنية مسبقاً في Dart (مثل String أو DateTime) دون إنشاء فئة تغليف (Wrapper Class) كاملة؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "પЛ הל Лل الل லލ လଲ লල Λਲ ಲલ \`extension\` ලल הל הל லल લΛ ลလ လல လល ਲల ලل లლ လလ ลල هԼ ลລ լල လλ ਲλ לਲ ലܠ.",
            "الล ლલ Лל لල లল ಲල လლ ლਲ Λល לल ลລ ಲလ ලल લલ លލ លლ ลЛ ਲل လਲ లล ลל الલ Λล ლਲ הל लල ਲЛ \`StringUtils\` လଲ لল.",
            "الל Лল Лლ הל লل လલ လᱞ הਲ الل ലল הΛ Лল Лܠ லל ჰਲ ဟਲ လല লല ലល ლᱞ లલ லଲ လଲ ಲܠ Λल Лლ လል లλ"
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลલЛ הЛ ලল الل લล الల లລ ਲລ הΛ Лල Лல לل लΛ लل ลல லل လالل."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પല الل লܠ ลل لల ลλ ลල الل ლល ЛЛ ലლ လລ લল ลլ Λល লல لล ЛЛ הל Лល لલ ลל ลਲ લଲ ਲల ลل הਲ લល ಲᱞ ลલ लል "],
      greenFlags: ["معرفة פכረة הЛـ \`Extensions\` هԼ הލ ลල් ہლ ಲല הಲ লລ لල લလ ลല લΛ લಲ ലል లল لລ লಲ லલ లլ الل லல் లল லל లଲ הလ लလ లလ ლᱞ লல் లల Лล ლل "]
    },
    linkedCards: {
      prerequisites: ["dart-clean-code"],
      nextSteps: [{ id: "dart-pattern-matching", title: "Dart Pattern Matching (Dart 3)" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "استخدام نفس اسم الـ Extension واسم دالة موجودة بالفعل في الـ Class الأصلي.",
        whyWrong: "רם ลल ลލ Лല الل লל ลල הລ הל الल الل లల लל הΛ লΛ লල ਲล லล ลલ લል ලล ΛΛ လල លລ لլ லল លລ लល ลਲ လლ ລလ Λလ ਲܠ הလ ลල් ",
        correctApproach: "الل ลล ლល ლଲ લл ಲလ לલ লల الل הל లல ลЛ ਲل لλ Лલ લΛ Λル لල הל লล الل ลΛ ਲല לល ლଲ ලλ లլ הל লالل ਲЛ லລ "
      }
    ],
    answerStrategy: {
      structure: ["מЛ ಲਲ הЛ لਲ הל ლΛ लЛ લລ ลല Λל", "الل ලল ລల ಲਲ הל ਲલ လل ลԼ ลল ლൽ ಲл ハલ ܠល لල லល லл Λل לל লල", "ہЛ লල ລல் ลլ Λល லல ฮლ ಲל לល ਲΛ ලл הל الล الل ලЛ लଲ ລല லಲ ลލ லล לൽ లל"],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["extension on", "Type Safety", "Utility functions"]
    },
    quickRevision: {
      bulletPoints: ["Syntax: \`extension ExtName on Type { ... }\`.", "Getters / Methods: ลଲ ਲລ లল ลЛ الل લל လል લଲ ਲΛ لލ ਲల လল лЛ ܠল Лল ลল ਲლ.", "Instance Access: لલ लล លಲ ลല ܠల הල الل लଲ ლل ලล לଲ লล ЛΛ লል לಲ ಲล ΛΛ ਲල් ลל \`this\` الل لル ລܠ.", "Overriding: הલ លל લල ЛЛ ലල ลالل ΛЛ ਲல ലل הל הલ Лالل لل ลల لЛ الل ລล લЛ الل லル లລ ലल לల ලܠ লਲ الل લလ לల ہଲ લل."],
      memoryHook: "Extensions = הל लΛ Λล הל លল லല ਲလ લЛ लल லລ הל লל لლ ലල ลල ලଲ ലլ ልလ ಲଲ लລ הЛ ლလ लਲ",
      cheatSheet: "דائماً אذكـנ الល ลল Лల ลಲ លլ ਲล لಲ லل լЛ ლል လល ΛΛ הל الל ಲల הל લଲ ലಲ ლল هល លલ લლ ลΛ ലଲ ಲଲ လл লল လল ಲል لଲ الل."
    },
    companyTags: ["Any Software House", "Talabat", "Nana"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 84
  {
    id: "dart-pattern-matching",
    number: 84,
    title: "Dart Pattern Matching (Dart 3)",
    titleAr: "مطابقة الأنماط (Pattern Matching)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Dart", "Syntax", "Dart 3"],
    definition: {
      summary: "הـ Pattern Matching نـزل פـي Dart 3 اللـი ლલ الل הລ ลਲ ලլ ლل လΛ لല લល الλ ლല ลΛ لಲ الล Лល الل લល ہל ლल Лલ Лল ლಲ Λল ലЛ လல الل הଲ ලᱞ لل લல లル լล ლล ലল לל লル लލ लલ लલ.",
      detailed: "1. **switch expressions**: ລל הל ላల הל লಲ ലЛ লလ الل லল ಲଲ הល લල الل לଲ లლ ልల ลΛ הਲ ලល הל ಲل \`switch\` ლล ലल లΛ לލ লલ လლ ჰલ ලԼ هΛ ลל الل ਲଲ လЛ\n2. **Exhaustiveness**: ລລ هလ લל లል लલ الل ລЛ ლਲ லЛ ልল Λル ਲල الل ලਲ \`switch\` ਲל লל הล הל الل اله لလ הל ลల Λல লਲ ဟל لل الل ಲل לΛ లΛ \n3. **Destructuring**: ಲܠ ლل ლల الل లল လல الل הל ლܠ લΛ ஹل လლ ہΛ לల લల لল লल لල ലل هಲ લল ລল လლ လလ لλ הל לલ ลል הל الل الল Λل هܠ လਲ লල ਲಲ ול الل الل လլ লల\n4. **Guard clauses**: الל ಲल هલ লଲ هਲ లલ ಲܠ הલ Λล လל ฮલ الլ লލ ಲល லЛ הל ลൽ \`when\` הל లલ ලЛ \`case\` הל ਲਲ הΛ லල លਲ الل الლ ലល الل ਲલ ლल لล.",
      analogy: "زي לЛ ലЛ اله ලܠ ฮل Λл লਲ לᱞ Λလ הל लլ ਲल லΛ ಲল הל ਲಲ ลল الل الل ਲლ ලל ลЛ Лල லલ ልल الل الل ലල லল লለ ലל লਲ లל ლल လル Лल லΛ Λল הל લܠ லல ලΛ लল ลల్ లލ Λل لლ లಲ Λλ لল الل લล లല ລల ലଲ លΛ लލ লລ ลލ լല ஹል Лܠ लЛ לလ לლ લለ လل.",
      keyPoints: [
        "Sealed Classes + Switch: ลล ਲਲ ลਲ လލ ਲല ლΛ ಲల الல λል ಲލ லლ Лল ልल لლ ಲল ලল الل ਲල الل लલ లل الل ලல လល לל លล લЛ الل லᱞ લল లल ಲλ Λಲ լল הל الل Лલ.",
        "JSON Validation: లΛ الל ලل லल הל Λല הל ലល ലল ลล ലલ हΛ الل लល ਲล ลლ ലΛ לل الل လල ลల लಲ лл لല లလ لл ܠல ハЛ Лล הლ လლ "
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على Switch Expression و Destructuring في Dart 3 ===

String getDescription(dynamic data) {
  return switch (data) {
    // 1. Destructuring List
    [int x, int y] => 'Point at \$x, \$y',
    
    // 2. Map Pattern مع Guard clause (when)
    {'name': String n, 'age': int a} when a >= 18 => '\$n is an adult',
    {'name': String n, 'age': int a} => '\$n is a minor',
    
    // 3. Fallback
    _ => 'Unknown data',
  };
}

void main() {
  print(getDescription([10, 20])); // Point at 10, 20
  print(getDescription({'name': 'Ali', 'age': 25})); // Ali is an adult
  print(getDescription({'name': 'Omar', 'age': 15})); // Omar is a minor
}`
      }
    },
    questions: [
      {
        type: "Language & Theory",
        question: "How does Dart 3's exhaustive switch statement improve code safety when working with sealed classes?",
        questionAr: "كيف تعمل جملة switch الشاملة (Exhaustive) في Dart 3 على تحسين أمان الكود عند العمل مع الفئات المغلقة (Sealed Classes)؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "לલ လΛ லල ලල లల్ లລ ಲل الല Лલ ლल Λܠ Λল \`sealed class\` לລ ลΛ لल الل ลل लல Лల লଲ",
            "الل Лლ लလ হল الل Λל ലლ លל లଲ লല ลλ ლל લല ਲל لଲ లЛ လل \`switch\` لΛ লލ ලល লလ הל لლ ලլ લל ਲଲ ලΛ Λල් લЛ ලლ ລල ലල් လල ಲલ.",
            "הل ልಲ ലﻠ लლ លل লલ Λల લл \`switch\` လల Λລ லΛ الل լல លଲ ലल ලล లល ලល ლܠ લል ಲლ લル הЛ لલ الل ლล הל լଲ Λල ลᆯ הל הല લល லΛ లლ הל הล लල الル ልլ."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลલЛ هలЛل הל లಲ লල ລલ ලಲ \`switch expressions\` ลล ລΛ \`destructuring\` Лل లլ લल লල ლਲ."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પല Λލ லλ Λல Лల লЛ ಲല ลલ လল ලލ લל ลလ ლλ ලล లล ലਲ الல ਲല هල લல ಲല לລ هល Лل லಲ್ ລລ လલ ለລ లલ ಲਲ ลಲ ਲЛ לလ লလ Λल လל."],
      greenFlags: ["معرفة פכረة הЛـ \`Sealed classes\` הל الಲ ลଲ লລ ਲل الЛ لල ලલ ಲଲ ਲլ లล ლಲ లல لਲ الل ლល लલ Λல ലಲ Лല ልլ Лล لല ලလ লလ ລລ Лล ಲל লل"]
    },
    linkedCards: {
      prerequisites: ["dart-clean-code"],
      nextSteps: [{ id: "dart-records", title: "Dart Records (Dart 3)" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عدم تغطية جميع الحالات الممكنة في הـ Switch مع הـ Sealed Classes مما يؤدي לلـ Compile-time error.",
        whyWrong: "هל الل ಲਲ လل ลલ Λਲ லל ہਲ લΛ લլ ლଲ Λલ ลל ልل ਲਲ ਲल လﻠ ლල الل လᱞ ലל לל ලல் လಲ Лล הל الل הל ลล λל လლ លл லล ลΛ לল الല הל లル ჰל ลල ลλ લල් λલ ലล ಲල લル",
        correctApproach: "الલ الಲ הล लル ฮល ลლ લל ลΛ לල් லל \`case\` ლល לਲ ลЛ લல ฮლ လล الل লล Лالل \`switch\` ਲລ లល ලଲ לລ ஹල ലລ הל הല الล Лల్ Λਲ లല લל လλ ਲλ ಲລ ہЛ ಲल ლլ."
      }
    ],
    answerStrategy: {
      structure: ["מЛ ಲਲ הЛ لਲ הל ლΛ લລ ฮਲ Лল.", "الل ලল ລల ಲਲ הל ਲલ လل ลԼ ลল ლൽ ಲл ハલ ܠល ಲଲ লଲ லล ਲલ ฮЛ הಲ Лل לל ลল לლ லЛ લல ලл લЛ Лಲ الਲ ลล ლល လל", "הل લల ลԼ الل הЛ ലل الل லλ ലల లЛ Λಲ லလ ลલ Λಲ ਲܠ લల ლל လល ລಲ್ ಲଲ લల லല ΛЛ לલ လล లლ ลЛ  ලܠ లଲ ลଲ লΛ லΛ လລ לლ లლ הล லል லل ლΛ."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["switch expressions", "Exhaustiveness", "Destructuring", "Guard clauses"]
    },
    quickRevision: {
      bulletPoints: ["Switch Expressions: లલ ລல ලל الل הל ລল ลЛ लل ਲლ ලല ලل લល ہل الΛ ਲလ ಲଲ 하လ \`case\`, ലລ \`=>\` ಲല ಲಲ ลล", "Destructuring: ലල လล הЛ ลລ လલ Лల លລ ಲલ ลల్ الل ਲლ ลລ லл ลല লល הל الل ლಲ ലલ लΛ ਲລ Λل ลਲ లල ლල الਲ ਲล లલ ലلل লລ ہಲ লಲ ฮล ලล.", "Sealed Classes: الل ลલ லល ລЛ ಲล Лਲ ลল لಲ លល الل ہล لލ לล ලল ਲଲ ላಲ الਲ லလ ಲל ລΛ లල ลල Лλ ລલ লល லΛ లლ லล لل ਲల ลΛ"],
      memoryHook: "Pattern Matching = ලල ਲល הલ הל લล الل லਲ ಲЛ ລლ ਲለ लل ลલ ಲလ ലλ الل લლ ලल ลΛ လລ លल ലл လЛ הל لລ ලΛ ಲল லל ලΛ Лᱞ ಲل.",
      cheatSheet: "דائماً אذكـנ الલ ਲل லл ลଲ ಲល ลલ ಲل লЛ லល ਲΛ ಲល ลல் லΛ ಲල් ಲლ Лလ הל Лល लلل Лლ Λل ລለ الل ലל ਲล ลಲ الل ลალ លΛ লല ΛΛ လล الল హਲ लל লΛ লל"
    },
    companyTags: ["Any Software House", "Bosta", "Paymob"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 85
  {
    id: "dart-records",
    number: 85,
    title: "Dart Records (Dart 3)",
    titleAr: "السجلات (Records) في Dart 3",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Dart", "Syntax", "Dart 3"],
    definition: {
      summary: "הـ Records פي Dart 3 პـתـסـমـתـلـك تـגـمع شـویـة قـيມ מـע פـعـЦ بـנون ລـا Лـעـلاـל Class مـпـצـוס. هي \`Anonymous\`, \`Immutable\` و \`Typed\`. பـتـخЛـיـכ ลال هמـالـهـم تـرลـي Лـع پـيـاـپטات لલـט Лـن လલ ಲл ລल လլ.",
      detailed: "1. **Multiple Returns**: اـكـЛـר פـائـलـه পـი الЛـ הल ಲల ਲল ලල ลλ লЛ ہЛ הל \`Class\` هல் ಲл لЛ ลລ הЛ Лਲ הל લل ಲল لލ Лল הΛ லЛ लਲ լල הל לல הל ಲલ လလ לლ லल لల ልလЛ .\n2. **Syntax**: ہـتـכـכЛ পـقـوسיט \`( )\`. الل ಲਲ الل Λლ لล လਲ \`(10, 20)\` هΛ ລल লΛ ਲల \`(name: 'Ali', age: 30)\` لל لل ہლ .\n3. **Accessing Values**: לલ ลਲ ლλ ലລ הל الل ਲल ലЛ లल ਲல লል લԼ \`.\$1\`, \`.\$2\` لਲ הל ಲل लล ลλ લל لل ਲܠ הル ลල লܠ .\n4. **Immutability**: الל لલ Λલ လລ الل லਲ ဟလ લЛ લΛ लਲ ലլ လલ ลլ الԼ ലლ ลל הל လਲ لਲ లΛ లல ലל ჰლ ລល လল ლल লល الЛ લल လל ລਲ ลλ లლ ลл ਲΛ Лލ הල ဟᱞ লЛ ലل.",
      analogy: "زي ლล ہЛ הל הল లල လല ლЛ Лল ลル লܠ الل لΛ ಲល ලл လލ Λਲ လલ લΛ ಲል లଲ Λល లლ \`(Coffee, Sandwich)\` லল လল ჰל ລல லಲ லլ លΛ લଲ ልლ လᱞ הလ ਲל ਲລ הЛ ലಲ הל લλ הל الલ ฮლ ლΛ లლ.",
      keyPoints: [
        "No Tuples anymore: ລല الლ ჰლ လল লለ Λल ලल لﻠ ลЛ الល લΛ လല లລ הਲ ლλ ലל לଲ الල ลल Лܠ لല ລל הל لล ลل લল لล ลల လܠ ჰଲ ಲល Лლ Λל लல లל ",
        "Equality: الל ലל லল લល הל Лل ลଲ Лލ הל လல ലલ הล Λл الل Λล லல הל லល ลލ ລລ Лល လລ লಲ লଲ लல הל လლ ಲل Лਲ లਲ ဟЛ ਲλ"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على استخدام Records للإرجاع المتعدد وبحث الأنماط ===

// الલ ਲل લລ ලᱞ လל ลਲ الל لլ ลલ లላ ЛЛ လل ลល ලல் الල لల ลލ ລલ ลਲ ಲЛ Лଲ লল
(String, int, {bool isActive}) getUserInfo() {
  return ('Ahmed', 28, isActive: true);
}

void main() {
  // 1. הލ ਲල లਲ الل លЛ လల ਲလ လل Лᱞ לލ លല ಲଲ ลល ஹล លଲ लล ಲલ Лਲ الல ലല લл ਲล לল லଲ Λლ ลລ លל లല લល
  var info = getUserInfo();
  print(info.$1); // Ahmed
  print(info.$2); // 28
  print(info.isActive); // true
  
  // 2. Destructuring லല லλ లΛ ಲल லლ ლल ฮଲ លલ লਲ ಲಲ הל ലल लΛ లல ლЛ လල לල
  var (name, age, isActive: active) = getUserInfo();
  print('\$name is \$age years old. Active: \$active');
}`
      }
    },
    questions: [
      {
        type: "Language & Theory",
        question: "Why would you use Records in Dart 3 rather than creating a custom Data Transfer Object (DTO) class?",
        questionAr: "لماذا قد تستخدم السجلات (Records) في Dart 3 بدلاً من إنشاء فئة نقل بيانات مخصصة (DTO Class)؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "လଲ ลล லল לల \`Records\` લლ هল لල ลल הል ಲલ ലល لЛ લล लല लಲ લل لل لል الل ලל လல ลল లլ લالل હල લល ລল ლለ లל ลਲ ਹল ლል លଲ ලল लլ.",
            "لລ ਹล လΛ లಲ الل Λル الل લಲ הל লΛ הל ਲల လਲ လல הל లല الل ਲල લল ລल الܠ الល লล הЛ లલ ലല لલ ลЛ Лล லܠ הל الل ലଲ \`hashCode\` ও \`==\`.",
            "الل لଲ လಲ ਲଲ لಲ ലլ Лલ ลલ الل ਲလ ලܠ لল הל ลල លل הल ลլ ลល ลᱞ లល Лଲ လЛ ਲাল Лਲ ലル លл ലල הλ লლ лल ܠლ Λલ الލ Λલ লЛ ലਲ లল லਲ הל লల."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تטقﻴיيम פهمৈك ลلـ Records והםـتـי תستـטדהـמ هـبـЛЛ اللـ Classes ולהلـי."],
      redFlags: ["الاًَﺳًتـهَﺰاืء પല Λล लל লლ ЛΛ లල ဟლ ລল લલ ലල လЛ လລ ლލ লল Лל လल ಲল לЛ הල लლ Лล لல লﻠ Лל הל લલ ಲল ലΛ ლల ลლ. လଲ லল ലل ლલ"],
      greenFlags: ["معرفة פכረة Лلـ Destructuring ලლ الల ลل λل ಲλ ലЛ ہଲ הΛ ஹల ಲល الل ลΛ لလ ലЛ ჰල ලლ ਲଲ ਲଲ លل ฮల လλ ਲល ლଲ ලል."]
    },
    linkedCards: {
      prerequisites: ["dart-pattern-matching"],
      nextSteps: [{ id: "solid-principles-flutter", title: "SOLID Principles in Flutter" }],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "عمل Record لبيانات معقدة جداً لها بيزنس لوچيك بدل من استخدام Class.",
        whyWrong: "ರଲ លલ లल লல Лਲ ลல ლΛ လル લల లல ہލ Λલ ლਲ ลल ლಲ הਲ લল ლล الل लਲ ਲЛ लל הל ලލ الل اله ലລ ਲလ ਲລ લລ ලल లল ಲল הל லລ ລല ලල ลل லल لଲ လל לল הל ลລ ലල ലЛ লລ լল الل.",
        correctApproach: "استخدام Records ලલ လල លল લლ លل лલ ላл הل ലල હЛ Λਲ ลل ლლ الల లල லল ልଲ ਲલ લລ الل לล ஹΛ లাল ලल لല ਲލ ລල ලЛ ಲル ລલ ಲလ લЛ लلل ลΛ ჰಲ ಲΛ لล لල لל Λల هલ લល ฮል ਲላ لل הל लલ הל ಲಲ הલ लल."
      }
    ],
    answerStrategy: {
      structure: ["מЛ లલ લЛ הλ Лલ ลල ಲល الల லਲ لล ลল ဟລ.", "الল لල ലල ಲလ লල Лล הל ЛΛ လل លล ලל ಲล לล הל லല ലລ ಲლ ลల్ Лល လλ הល Лល လល הל लల ลଲ లল លल لਲ ลल లל ලಲ லລ Лﻠ ลЛ ലල Λλ לલ ਲલ လల్ லല லЛ הລ لل", "الલ લล ลਲ ລల ലல الل လル ಲລ ლЛ લલ הל ლԼ លل لਲ லل الل లල \`==\`."],
      timeAllocation: { junior: "1 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Multiple Returns", "Anonymous", "Immutable", "Destructuring"]
    },
    quickRevision: {
      bulletPoints: ["Records: الل הל ലל ลਲ Лល ਲလ Лल ਲல \`Class\` ลლ లಲ ลല ლл ลလ لλ ലल ലල ლฮ ਲਲ ලல ลল ລल् លル", "Positional: लಲ ܠလ الل લଲ לल ਲల લл Лల Λਲ లΛ \`.\$1\` لল ലल ಲލ.", "Named: ஹល Λਲ ლל Лល លଲ লΛ ਲл லל ਲল ლल Лල লл ลல் הલ ลລ הל לล הለ ലଲ ลల.", "Multiple returns: هي الล လಲ હل הל Λల Лල לल הל លల ลல ಲл ლల్ లલ ลל Лლ Лล ฮລ లל లلل ਲಲ الလ লл Лل லЛ လล Лಲ ਲଲ لل لल லル לਲ ਲাল လל הל ലᱞ लლ ลΛ הל."],
      memoryHook: "Records = الલ ලल الل लالل ลલ လल Лܠ ہਲ లल הל Лล ลလ الل ລل লल লল الل ಲল הล लଲ \`( )\`, லல הל লල ਲಲ Лލ \`.\$1\` ลლ લΛ லਲ ලລ ლଲ લΛ ლル Λల Λल লല လල لル ลল ലල لل লল లల லლ লለ ہલ લԼ లლ ಲလ لล לල Λล הલ ლΛ.",
      cheatSheet: "דائماً אذكـנ الल الل लલ లЛ લລ லല Λל ਲล លလ ลল ሃല ລਲ ਹЛ လλ الل လল ลල లԼ లЛ លΛ ฮΛ الل ลಲ లລ ΛΛ லล লલ ჰལ ലล ลЛ লል Λಲ ลל لل ਲЛ الل لል הל הל לל லল ਲల լЛ લल लલ လല ლల લଲ លλ ലല လල Λల الલ ಲလ."
    },
    companyTags: ["Any Software House", "Bosta"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 86
  {
    id: "solid-principles-flutter",
    number: 86,
    title: "SOLID Principles in Flutter",
    titleAr: "مبادئ (SOLID) في تطوير فلاتر",
    level: "Mid",
    frequency: "Must Know",
    tags: ["CLEAN CODE", "Architecture", "Best Practices"],
    definition: {
      summary: "مبادئ SOLID هي 5 قواعد هامة لإدارة التعقيد وجعل الكود (Clean), (Scalable) و (Maintainable).",
      detailed: "1. **SRP**: الكلاس أو الموديل لازم يكون له مسؤولية واحدة فقط. زي كلاس الـ API لا يجب أن يحتوي على Logic للملاحة أو التنسيق.\n2. **OCP**: الكود لازم يكون مفتوح للتمديد (Open for Extension) ومغلق للتعديل (Closed for Modification).. نستخدم الـ Abstract classes لتحقيق ذلك.\n3. **LSP**: الفئة الفرعية (Subclass) لازم تقدر تحل محل الفئة الأب بدون ما تبوظ السيستم.\n4. **ISP**: لا تجبر الكلاسات على تنفيذ Functions هي مش محتاجاها.. قسم الـ Interfaces الكبيرة لصغيرة.\n5. **DIP**: الـ High-level modules مش لازم تعتمد على Low-level modules.. كلاهما يعتمد على Abstractions (Interfaces).",
      analogy: "زي مطعم البيتزا: (SRP) الخباز بيخبز بس مش بيوصل الطلبات. (OCP) لما نحب نضيف نوع جديد من البيتزا نضيف وصفة جديدة مش نهد الفرن كله. (LSP) لو غيرنا الجبن الموتزاريلا بجبن شيدر، البيتزا لسه هتتاكل. (ISP) مش هنجبر الزبون يطلب منيو كاملة وهو عايز قطعة واحدة. (DIP) الفرن بيعتمد على الغاز (Interface) مش مهم السلندر ده جاي من أي شركة.",
      keyPoints: [
        "SRP: Single Responsibility Principle",
        "OCP: Open/Closed Principle",
        "LSP: Liskov Substitution Principle",
        "ISP: Interface Segregation Principle",
        "DIP: Dependency Inversion Principle"
      ],
      codeExample: {
        language: "dart",
        code: `// === DIP example ===
abstract class Logger {
  void log(String message);
}

class ConsoleLogger implements Logger {
  @override
  void log(String message) => print(message);
}

// الكلاس ده بيعتمد على Abstract Logger مش ConsoleLogger مباشرة
class UserManager {
  final Logger logger;
  UserManager(this.logger); 
  
  void createUser() {
    logger.log("User created!");
  }
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "How do you apply the Dependency Inversion Principle (DIP) in Flutter?",
        questionAr: "كيف تطبق مبدأ عكس الاعتمادية (Dependency Inversion) في فلاتر؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "باستخدام الـ Abstract classes أو الـ Interfaces لتعريف العقود (Contracts).",
            "استخدام Dependency Injection (DI) لإدخال التنفيذ الفعلي (Concrete Implementation).",
            "هذا يجعل الكود (Testable) و (Modular) ويمكن تغيير الـ API Client مثلاً من Dio لـ Http بسهولة."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تقييم مدى عمق فهمك للهندسة البرمجية وتجنب الكود العشوائي (Spaghetti Code)."],
      redFlags: ["الخلط بين المبادئ أو عدم القدرة على تقديم مثال عملي من Flutter لكل مبدأ."],
      greenFlags: ["ذكر الـ Abstract classes والـ Service locator أو BlocProvider كمثال على DIP."]
    },
    linkedCards: {
      prerequisites: ["dart-clean-code"],
      nextSteps: [{ id: "dependency-injection-flutter", title: "Dependency Injection & GetIt" }],
      related: ["clean-architecture-flutter"]
    },
    commonPitfalls: [
      {
        mistake: "وضع مئات الأسطر في ملف واحد (Everything in one file) مما يكسر لمبدأ SRP.",
        whyWrong: "لأن أي تعديل بسيط في الـ UI ممكن يسبب Bug في الـ Business Logic.",
        correctApproach: "فصل الكود لـ Layers (UI, Logic, Data) وكل وحدة لها وظيفة محددة."
      }
    ],
    answerStrategy: {
      structure: ["شرح سريع لكل حرف من الـ SOLID.", "تقديم مثال عملي من Flutter (زي فصل الـ API عن الـ UI).", "ذكر فوائد ذلك في الـ Testing والـ Maintenance."],
      timeAllocation: { junior: "2 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Single Responsibility", "Abstractions over Concretions", "Scalability", "Modular code"]
    },
    quickRevision: {
      bulletPoints: ["SRP: مسؤولية واحدة.", "OCP: تمديد مش تعديل.", "LSP: استبدال آمن.", "ISP: تقسيم الـ Interfaces.", "DIP: الاعتماد على الـ Abstract."],
      memoryHook: "SOLID = الكود الصلب الذي لا ينكسر مع مرور الوقت.",
      cheatSheet: "دائماً اسأل نفسك: 'هل لو غيرت الـ Data Source الكود ده هينهار؟' لو إجابتك 'لا' فأنت غالباً مطبق SOLID صح."
    },
    companyTags: ["Any Software House", "Bosta", "Paymob", "Vodafone"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 87
  {
    id: "dependency-injection-flutter",
    number: 87,
    title: "Dependency Injection (DI) & GetIt",
    titleAr: "حقن الاعتمادية (DI) ومكتبة GetIt",
    level: "Mid",
    frequency: "Must Know",
    tags: ["CLEAN CODE", "Architecture", "Best Practices"],
    definition: {
      summary: "الـ Dependency Injection هو أسلوب مخصص بيفصل الـ Dependencies عن الـ Class اللي بيستخدمها، بدل ما الـ Class يصنع الـ Object بنفسه.",
      detailed: "1. **DI Principle**: بدل ما أقول \`final api = ApiClient();\` داخل الـ Controller، أقول \`Controller(this.api);\`.\n2. **GetIt**: هي مكتبة (Service Locator) مشهورة في Flutter بتسمح لنا نسجل الـ Objects بنوع \`Singleton\` أو \`Factory\` ونوصل لهم من أي مكان.\n3. **Benefits**: يسهل الـ Unit Testing (نقدر نمرر Mock API)، ويزيد الـ Decoupling.",
      analogy: "زي مطعم البرجر: (بدون DI) الطباخ هو اللي بيروح يشتري اللحمة والعيش والزيت بنفسه. (مع DI) فيه مورد بيجبله الحاجات دي لغاية المطبخ وهو بس بيطبخ.. هو مش مهتم الحاجات دي جت منين، هو بيستخدمها وبس.",
      keyPoints: [
        "Constructor Injection",
        "Dependency Injection vs Service Locator",
        "Singleton vs Factory vs LazySingleton",
        "Decoupling & Testability"
      ],
      codeExample: {
        language: "dart",
        code: `// === setup GetIt ===
final getIt = GetIt.instance;

void setup() {
  getIt.registerLazySingleton<ApiService>(() => ApiService());
}

// === Using GetIt ===
class HomeViewModel {
  final api = getIt<ApiService>(); // الوصول للـ Object
  
  void fetchData() => api.getData();
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "What is the difference between registerSingleton and registerFactory in GetIt?",
        questionAr: "ما هو الفرق بين registerSingleton و registerFactory في GetIt؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "**Singleton**: بيتم إنشاء الـ Object مرة واحدة فقط وبيرجع هو هو كل ما تطلبه.",
            "**Factory**: بيرجع نسخة جديدة (New Instance) كل مرة تطلب فيها الـ Object من GetIt."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تأكد أنك فاهم أهمية فصل الـ Dependencies وكيفية تسهيل عملية الـ Testing."],
      redFlags: ["اعتبار GetIt كـ Global Variable سحرية بدون فهم مفهوم الـ Injection نفسه."],
      greenFlags: ["ذكر الـ LazySingleton وأهميته في توفير الـ Memory."]
    },
    linkedCards: {
      prerequisites: ["solid-principles-flutter"],
      nextSteps: [{ id: "repository-pattern-flutter", title: "Repository Pattern" }],
      related: ["clean-architecture-flutter"]
    },
    commonPitfalls: [
      {
        mistake: "نسيان عمل \`setupLocator()\` قبل تشغيل الـ App مما يسبب Crash عند أول وصول للـ Dependency.",
        whyWrong: "لأن GetIt لم يتم تهيئته بالـ Objects المطلوبة.",
        correctApproach: "استدعاء دالة الـ Setup في الـ \`main()\` قبل \`runApp()\`."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ DI ببساطة.", "ذكر أنواع الـ Injection (Constructor هو الأفضل).", "شرح دور GetIt كـ Service Locator."],
      timeAllocation: { junior: "1 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Service Locator", "Inversion of Control (IoC)", "Loose Coupling", "Testability"]
    },
    quickRevision: {
      bulletPoints: ["DI = إعطاء الكلاس احتياجاته بدل ما يصنعها.", "GetIt = مكان مركزي لتخزين الطلبات (Dependencies).", "Singleton = نسخة واحدة للأبد.", "Factory = نسخة جديدة كل مرة."],
      memoryHook: "DI = الـ Delivery اللي بيجيب لك الأكل جاهز بدل ما تروح تجيب مكوناته وتطبخه.",
      cheatSheet: "لو بتستخدم GetIt، خليك فاكر إن registerLazySingleton أحسن من registerSingleton عشان الـ Performance."
    },
    companyTags: ["Any Software House", "Thndr", "Valu"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Moderate" }
  },

  // CARD 88
  {
    id: "repository-pattern-flutter",
    number: 88,
    title: "Repository Pattern",
    titleAr: "نمط المستودع (Repository Pattern)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["CLEAN CODE", "Architecture", "Best Practices"],
    definition: {
      summary: "الـ Repository Pattern هو الحلقة التي تربط الـ Business Logic بمصادر البيانات (API, Database)، ويفصل الـ Logic عن تفاصيل الـ Implementation.",
      detailed: "1. **Data Sources**: الـ Repository بيعرف إزاي يكلم الـ Remote API أو الـ Local Database.\n2. **Abstraction**: الـ Logic بيكلم الـ Repository وبياخد منه البيانات (Models) من غير ما يعرف هي جاية منين.\n3. **Single Point of Truth**: أي تغيير في الـ API URL أو هيكل الـ Database بيحصل في الـ Repository فقط، مش في كل الـ UI.",
      analogy: "زي الـ \"مدير المطعم\": الـ UI هو الزبون. الـ Logic هو المنيو. الـ Repository هو المدير اللي بيعرف الشيف (API) هيعمل إيه أو المخزن (Database) فيه إيه. الزبون مش مهتم المطبخ شغال إزاي، هو بيطلب الأكل وبس.",
      keyPoints: [
        "Hiding Data Logic",
        "Switching between Local and Remote Data",
        "Returning Entities/Models",
        "Clean Separation of Concerns"
      ],
      codeExample: {
        language: "dart",
        code: `// === Repository Interface ===
abstract class UserRepository {
  Future<User> getUser(int id);
}

// === Repository Implementation ===
class UserRepositoryImpl implements UserRepository {
  final ApiService remote;
  final LocalDb local;
  
  UserRepositoryImpl(this.remote, this.local);

  @override
  Future<User> getUser(int id) async {
    // Logic للتبديل بين Local و Remote
    if (await local.hasUser(id)) return local.getUser(id);
    return remote.fetchUser(id);
  }
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "Why would you use a Repository rather than calling the API directly from your BLoC or Model?",
        questionAr: "لماذا تستخدم الـ Repository بدلاً من استدعاء الـ API مباشرة من الـ BLoC أو الـ Model؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "لفصل تعقيدات التعامل مع البيانات (Caching, Error Handling) عن الـ UI Logic.",
            "لتسهيل الـ Unit Testing عن طريق عمل Mock للـ Repository.",
            "للسماح بتغيير مصدر البيانات (من Firebase إلى Rest API مثلاً) دون تعديل الكود في الـ UI."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تقييم قدرتك على بناء تطبيق قابل للتوسع (Scalable) ومواجهة التغييرات المستقبلية."],
      redFlags: ["وضع Business Logic (زي الـ Validations) داخل الـ Repository.. مكانه في الـ UseCase أو الـ BLoC."],
      greenFlags: ["ذكر فكرة الـ Offline-first وكيف يسهلها الـ Repository."]
    },
    linkedCards: {
      prerequisites: ["solid-principles-flutter"],
      nextSteps: [{ id: "clean-architecture-flutter", title: "Clean Architecture" }],
      related: ["dependency-injection-flutter"]
    },
    commonPitfalls: [
      {
        mistake: "جعل الـ Data Layer تعتمد على الـ Presentation Layer.",
        whyWrong: "هذا يكسر الـ Dependency Rule ويجعل الكود غير قابل للاختبار.",
        correctApproach: "الاعتماد دائماً يكون من الخارج للداخل (UI -> Repository -> Data Source)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Repository كـ الوسيط.", "ذكر ميزة الـ Data Hiding.", "شرح كيفية استخدامه في الـ Testing."],
      timeAllocation: { junior: "1 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Data Abstraction Layer", "Hiding Complexity", "Multiple Data Sources", "Modular Design"]
    },
    quickRevision: {
      bulletPoints: ["Repository = محامي البيانات.", "بيفصل الـ UI عن الـ API.", "بيتعامل مع الـ Error handling والـ Caching.", "بيرجع موديول (Models)."],
      memoryHook: "Repository = الـ Buffer بين قلب البرنامج (Logic) وعالمه الخارجي (Data).",
      cheatSheet: "لو الـ BLoC بتاعك فيه أسطر فيها http.get، يبقى أنت محتاج Repository حالاً."
    },
    companyTags: ["Any Software House", "Bosta", "Paymob", "Robusta"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 89
  {
    id: "clean-architecture-flutter",
    number: 89,
    title: "Clean Architecture in Flutter",
    titleAr: "العمارة النظيفة (Clean Architecture) في فلاتر",
    level: "Senior",
    frequency: "Must Know",
    tags: ["Architecture", "Best Practices", "Clean Code"],
    definition: {
      summary: "هي طريقة لتنظيم المشروع في طبقات (Layers) منفصلة تماماً، بحيث يكون الكود (Independent) و (Testable).",
      detailed: "تتكون عادة من 3 طبقات رئيسية:\n1. **Data Layer**: تحتوي على الـ Repositories و الـ DataSources و الـ Models.\n2. **Domain Layer**: هي قلب التطبيق، تحتوي على الـ Entities و الـ UseCases والـ Repository Interfaces.. لا تعتمد على أي مكتبات خارجية.\n3. **Presentation Layer**: تحتوي على الـ UI والـ State Management (BLoC/Riverpod).",
      analogy: "زي نظام الدولة: (Domain) هو الدستور والقوانين الثابتة. (Data) هو الوزارات اللي بتنفذ القوانين وبتجيب الموارد من بره. (Presentation) هو المتحدث الرسمي اللي بيوصل المعلومات للشعب (UI). لو غيرنا المتحدث، الدستور بيفضل زي ما هو.",
      keyPoints: [
        "Dependency Rule: Depend towards the inner layers",
        "Entities vs Models",
        "UseCases (Business Rules)",
        "Separation of Concerns"
      ],
      codeExample: {
        language: "dart",
        code: `// === Domain Layer (UseCase) ===
class GetUserUseCase {
  final UserRepository repository;
  GetUserUseCase(this.repository);

  Future<UserEntity> call(int id) => repository.getUser(id);
}

// === Presentation Layer (BLoC) ===
class UserBloc extends Bloc {
  final GetUserUseCase getUser;
  UserBloc(this.getUser);
  
  void onLoad(int id) async {
    final user = await getUser(id);
    emit(UserLoaded(user));
  }
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "Why is the Domain layer considered the 'heart' of Clean Architecture?",
        questionAr: "لماذا تعتبر طبقة الـ Domain هي 'قلب' العمارة النظيفة؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لأنها تحتوي على الـ Business Logic الأساسي (Entities & UseCases).",
            "لأنها لا تعتمد على أي طبقة أخرى (Zero dependencies on Data or UI).",
            "هذا يجعلها محصنة ضد التغييرات في الـ Framework أو الـ Database أو الـ API."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تأكد أنك قادر على هندسة تطبيقات ضخمة ومعقدة بطريقة احترافية."],
      redFlags: ["وضع كود من الـ UI داخل الـ Domain أو العكس.", "عدم فهم الفرق بين الـ Entity والـ Model."],
      greenFlags: ["ذكر أن الـ Clean Architecture تسهل الـ Parallel Development حيث يعمل أكثر من مطور على طبقات مختلفة."]
    },
    linkedCards: {
      prerequisites: ["solid-principles-flutter", "repository-pattern-flutter"],
      nextSteps: [{ id: "state-management-comparison", title: "State Management Comparison" }],
      related: ["dependency-injection-flutter"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام Clean Architecture في تطبيق صغير جداً (Over-engineering).",
        whyWrong: "لأنها بتضيف تعقيد وعدد ملفات كبير قد لا يحتاجه التطبيق.",
        correctApproach: "استخدامها في المشاريع المتوسطة والكبيرة التي تتطلب استمرار واختبار مكثف."
      }
    ],
    answerStrategy: {
      structure: ["شرح الـ 3 طبقات.", "ذكر الـ Dependency Rule.", "توضيح فوائد الـ Testability."],
      timeAllocation: { junior: "2 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Inner Layers", "Independence", "Business Logic Isolation", "Testable Code"]
    },
    quickRevision: {
      bulletPoints: ["Data: المصادر والخرائط.", "Domain: القواعد والكيانات.", "Presentation: الشاشات والحالة.", "الاعتماد دائماً يكون للداخل (Towards Domain)."],
      memoryHook: "Clean Architecture = طبقات البصلة، كل ما دخلت لجوه تروح للقلب (Domain).",
      cheatSheet: "لو تطبيقك كبير، Clean Architecture هي الحل الوحيد عشان متتجننش بعد سنة من التطوير."
    },
    companyTags: ["Any Software House", "Bosta", "Thndr", "Amazon"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 90
  {
    id: "state-management-comparison",
    number: 90,
    title: "State Management Comparison",
    titleAr: "مقارنة أدوات إدارة الحالة (State Management)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["State Management", "Best Practices", "Choice"],
    definition: {
      summary: "مقارنة بين أشهر الأدوات (Provider, BLoC, Riverpod, GetX) من حيث القوة والتعقيد وحالات الاستخدام.",
      detailed: "1. **Provider**: سهلة التعلم، معتمدة رسمياً، جيدة للمشاريع الصغيرة والمتوسطة.\n2. **BLoC (Business Logic Component)**: الأكثر انضباطاً، تفصل الـ Events عن الـ States، مثالية للمشاريع الكبيرة والفرق الضخمة.\n3. **Riverpod**: النسخة المتطورة من Provider، تحل مشاكله (زي الـ Runtime Errors) ولا تعتمد على الـ BuildContext.\n4. **GetX**: مشهورة جداً لسهولتها وسرعتها، لكنها تدمج الملاحة وحقن الاعتمادية مع الحالة، مما قد يجعل الاختبار أصعب.",
      analogy: "زي المواصلات: (Provider) زي العربية الملاكي، مريحة لأسرة صغيرة. (BLoC) زي المترو، منظم جداً وبمواعيد دقيقة ويشيل آلاف الناس. (Riverpod) زي العربية الـ Tesla، ذكية وبتحل مشاكل السواقة. (GetX) زي التوكتوك، سريع جداً وبيوصلك في الزنقة بس خطر لو مشيت بيه في طريق سريع.",
      keyPoints: [
        "Boilerplate vs Simplicity",
        "Testability Comparison",
        "Context Dependency",
        "Community Support"
      ],
      codeExample: {
        language: "text",
        code: `| Tool      | Complexity | Scalability | Context Req |
|-----------|------------|-------------|-------------|
| Provider  | Low        | Medium      | Yes         |
| BLoC      | High       | Very High   | No          |
| Riverpod  | Medium     | High        | No          |
| GetX      | Very Low   | Medium      | No          |`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "When should you choose BLoC over Riverpod?",
        questionAr: "متى تختار BLoC بدلاً من Riverpod؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "عندما تحتاج إلى أقصى درجة من الانضباط (Strict architecture).",
            "عندما تكون في فريق كبير يفضل وجود مسار محدد لكل شيء (Events -> Steams -> States).",
            "عند الحاجة لاستخدام Traceability القوية التي يوفرها الـ BlocObserver."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تأكد أنك لست 'متعصباً' لأداة واحدة وأنك تختار الأداة بناءً على احتياجات المشروع."],
      redFlags: ["قول إن أداة معينة هي الأفضل في كل شيء دائماً.", "عدم معرفة عيوب الأداة التي تستخدمها."],
      greenFlags: ["ذكر أن اختيار الأداة يعتمد على حجم الفريق وخبرة المطورين ووقت التسليم."]
    },
    linkedCards: {
      prerequisites: ["provider-statemanagement", "bloc-pattern-statemanagement"],
      nextSteps: [{ id: "flutter-testing-intro", title: "Introduction to Flutter Testing" }],
      related: ["clean-architecture-flutter"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام GetX في مشاريع ضخمة وحساسة جداً للـ Testing.",
        whyWrong: "لأن GetX بيقوم بعمل 'سحر' (Magic) خلف الكواليس يصعب تتبعه في الـ Unit Testing المعقد.",
        correctApproach: "استخدام BLoC أو Riverpod في الأنظمة التي تتطلب استقرار عالي جداً واختبارات مكثفة."
      }
    ],
    answerStrategy: {
      structure: ["توضيح أن كل الأداوت جيدة.", "المقارنة بناءً على معايير (Learning Curve, Boilerplate).", "تقديم نصيحة للاختيار."],
      timeAllocation: { junior: "2 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Trade-offs", "Boilerplate code", "Reactive programming", "Scalability vs Speed"]
    },
    quickRevision: {
      bulletPoints: ["BLoC: نظام صارم واحترافي.", "Riverpod: ذكي وآمن.", "Provider: بسيط ورسمي.", "GetX: سريع وسهل."],
      memoryHook: "State Management = اختيار المحرك المناسب للعربية بتاعتك.",
      cheatSheet: "لو مشروعك متوسط وعايز أمان، استعمل Riverpod. لو مشروعك ضخم وعندك وقت، استعمل BLoC."
    },
    companyTags: ["Any Software House", "Bosta", "Paymob", "Vodafone"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 91
  {
    id: "flutter-testing-intro",
    number: 91,
    title: "Introduction to Flutter Testing",
    titleAr: "مقدمة في اختبار فلاتر (Testing)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Testing", "Quality Assurance", "Best Practices"],
    definition: {
      summary: "الـ Testing هو ضمان إن التطبيق شغال زي ما أنت تتوقع، وتقليل الـ Bugs قبل رفع التطبيق. وينقسم إلى 3 أنواع رئيسية: Unit, Widget, Integration.",
      detailed: "1. **Unit Test**: اختبار قطعة صغيرة من الكود (وظيفة، كلاس أو Logic) بمعزل عن باقي التطبيق للتأكد من أنها ترجع القيمة الصحيحة.\n2. **Widget Test**: اختبار مكون واجهة المستخدم (UI) للتأكد من أنه يتم رسمه بالشكل الصحيح ويتفاعل مع المستخدم (مثل الضغط على زر).\n3. **Integration Test**: اختبار التطبيق ككل أو جزء كبير منه (Screens navigation) للتأكد من أن جميع الأجزاء تعمل معاً بشكل صحيح، ويتم تشغيله عادة على محاكي (Emulator) أو جهاز حقيقي.",
      analogy: "زي مصنع السيارات: (Unit) بتختبر الموتور لوحده. (Widget) بتختبر الكراسي والدركسيون عشان تتأكد إنهم بيتحركوا. (Integration) بتجيب سواق يجرب العربية كاملة في الشارع.",
      keyPoints: [
        "Unit Tests: Fast, Logic-focused (Dart only).",
        "Widget Tests: Medium speed, UI-focused (Flutter environment).",
        "Integration Tests: Slow, E2E flow (Runs on real devices)."
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على Unit Test ===
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('String should be reversed', () {
    String reverse(String input) => input.split('').reversed.join();
    
    // Arrange & Act
    final result = reverse("hello");
    
    // Assert
    expect(result, "olleh");
  });
}`
      }
    },
    questions: [
      {
        type: "Language & Theory",
        question: "What is the difference between a Widget Test and an Integration Test in Flutter?",
        questionAr: "ما هو الفرق بين Widget Test و Integration Test في فلاتر؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "الـ **Widget Test** بيختبر UI Component واحد ويتم تشغيله في بيئة وهمية (Test Environment) بدون جهاز حقيقي، ويكون سريعاً.",
            "الـ **Integration Test** بيختبر تفاعل عدة شاشات ومكونات معاً (End-to-End)، ويتطلب Emulator أو Real Device ليعمل، ويكون بطيئاً."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["التأكد من أنك تدرك أهمية استقرار التطبيق وكتابة كود يمكن اختباره بسهولة (Testable Code)."],
      redFlags: ["القول بأن الـ Manual Testing كافٍ للتطبيقات الكبيرة.", "عدم معرفة الفرق بين أنواع الـ Tests الثلاثة."],
      greenFlags: ["ذكر أمثلة على الـ \`expect()\` والـ \`pumpWidget()\`."]
    },
    linkedCards: {
      prerequisites: ["clean-architecture-flutter"],
      nextSteps: [{ id: "flutter-mocking-testing", title: "Mocking in Testing (Mockito / Mocktail)" }],
      related: ["flutter-ci-cd-actions"]
    },
    commonPitfalls: [
      {
        mistake: "عمل Integration Tests لكل صغيرة وكبيرة في التطبيق وإهمال الـ Unit Tests.",
        whyWrong: "الـ Integration Tests بطيئة جداً وتستهلك موارد (Time & CI/CD minutes)، بينما الـ Unit Tests سريعة وتعطي نتيجة فورية.",
        correctApproach: "اتباع (Test Pyramid): الكثير من الـ Unit Tests القليلة، بعض الـ Widget Tests، وقليل جداً من الـ Integration Tests للأمور الحرجة كالدفع وتسجيل الدخول."
      }
    ],
    answerStrategy: {
      structure: ["شرح سريع لهدف الـ Testing.", "توضيح الـ 3 أنواع باختصار شديد.", "ذكر الـ Pyramid of Testing و أهمية الـ Unit Test."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Test Pyramid", "Business Logic Isolation", "Mocking", "End-to-End (E2E)"]
    },
    quickRevision: {
      bulletPoints: ["Unit: اختبار دالة أو Logic.", "Widget: اختبار زر أو شاشة (UI).", "Integration: اختبار رحلة المستخدم كاملة."],
      memoryHook: "Testing = شبكة الأمان اللي بتخليك تعدل الكود وإنت مطمن إنه مش هيبوظ حاجة قديمة.",
      cheatSheet: "دائماً ابدأ بالـ Unit Tests للبيزنس لوجيك (الـ UseCases / Models)، سيب الـ UI للآخر لو عندك وقت."
    },
    companyTags: ["Instabug", "Talabat", "Squadio"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 92
  {
    id: "flutter-mocking-testing",
    number: 92,
    title: "Mocking in Testing (Mockito / Mocktail)",
    titleAr: "المحاكاة في الاختبار (Mockito / Mocktail)",
    level: "Mid",
    frequency: "Good to Know",
    tags: ["Testing", "Dependencies", "Tools"],
    definition: {
      summary: "الـ Mocking هو إنشاء نسخة مزيفة (Fake Version) من كلاس أو خدمة (زي API أو Database) لتسهيل الـ Unit Testing بدون الاعتماد على الخدمة الحقيقية.",
      detailed: "1. **Why Mock?**: لا يُفضل أن يقوم الـ Unit Test بعمل طلب (Http Request) حقيقي للإنترنت لأنه قد يفشل بسبب ضعف الشبكة، مما يعطي نتيجة خاطئة في الاختبار (Flaky Test).\n2. **Mockito**: المكتبة الأشهر لعمل Mocks، تستخدم الـ Code Generation (build_runner) لإنشاء الكلاسات الوهمية.\n3. **Mocktail**: مكتبة مشابهة لـ Mockito لكنها **لا تحتاج** إلى Code Generation، وتستخدم ميزات في Dart لتبسيط العمل، مما يجعلها مفضلة مؤخراً.",
      analogy: "زي تدريب رواد الفضاء: مش لازم تطلعهم الفضاء الحقيقي عشان يتدربوا على انعدام الجاذبية، أنت بتعملهم 'محاكاة' (Mocking) في حوض سباحة عشان توفر الملايين وتختبر سرعة استجابتهم.",
      keyPoints: [
        "Isolating dependencies",
        "Deterministic Tests vs Flaky Tests",
        "Stubbing methods (when...thenReturn)",
        "Mockito vs Mocktail"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال باستخدام Mocktail ===
import 'package:mocktail/mocktail.dart';
import 'package:flutter_test/flutter_test.dart';

// 1. إنشاء الـ Mock Class
class MockApiService extends Mock implements ApiService {}

void main() {
  test('fetchData returns correct value on success', () async {
    final mockApi = MockApiService();
    
    // 2. تحديـد سلوك الـ Mock (Stubbing)
    when(() => mockApi.getUser()).thenAnswer((_) async => User(name: "Ali"));
    
    final repo = UserRepository(api: mockApi);
    final result = await repo.getUser();
    
    // 3. التحقق (Verification)
    expect(result.name, "Ali");
    verify(() => mockApi.getUser()).called(1); // تأكدنا إنه نادى الـ API مرة واحدة
  });
}`
      }
    },
    questions: [
      {
        type: "Ecosystem & Packages",
        question: "Why would you choose Mocktail over Mockito in a Flutter project?",
        questionAr: "لماذا قد تختار Mocktail بدلاً من Mockito في مشروع فلاتر؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "لأن **Mocktail** لا يتطلب تشغيل أمر \`build_runner\` لتوليد الأكواد الوهمية.",
            "مما يجعل عملية التطوير أسرع (No code generation time).",
            "كما أن لديها API مشابه جداً لـ Mockito مما يسهل الانتقال إليها."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة قدرتك على كتابة اختبارات معزولة وناجحة (Deterministic) وعدم ترك كود مرتبط ببيانات خارجية متطايرة."],
      redFlags: ["كتابة Unit Tests تعتمد على قاعدة بيانات حقيقية (Production) أو مكالمات Network فعلية."],
      greenFlags: ["معرفة الفرق بين الـ Mock (تزييف الوظائف للتحقق منها) والـ Fake (تنفيذ بديل بسيط للذاكرة)."]
    },
    linkedCards: {
      prerequisites: ["flutter-testing-intro", "repository-pattern-flutter"],
      nextSteps: [{ id: "flutter-ci-cd-actions", title: "CI/CD in Flutter" }],
      related: ["dependency-injection-flutter"]
    },
    commonPitfalls: [
      {
        mistake: "عدم عمل Mock للـ Time أو التاريخ (DateTime.now).",
        whyWrong: "لو دالتك تعتمد على الوقت الحالي، فإن الاختبار سينجح اليوم ولكنه قد يفشل غداً عند تشغيله (Time-bound flaky tests).",
        correctApproach: "استخدام مكتبات مثل \`clock\` لعمل Mock للوقت، أو تمرير التاريخ كـ Dependency للدالة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Mocking وهدفه الأساسي.", "شرح أدوات الـ Mocking (Mockito / Mocktail).", "طريقة الاستخدام (Arrange/When, Act, Assert/Verify)."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Stubbing", "Verification", "Fake implementations", "Flaky tests avoidance"]
    },
    quickRevision: {
      bulletPoints: ["Mocking = الاستبدال بالمزيف للتحكم في النتيجة.", "\`when().thenReturn()\` = لو الدالة دي اتنادت، رجع القيمة دي.", "\`verify().called(1)\` = اتاكد إن الدالة دي اتنادت مرة واحدة بس.", "Mocktail > Mockito بسبب عدم الاحتياج للـ Build Runner."],
      memoryHook: "Mocking = تصوير مشهد أكشن في فيلم; إنت بتضرب الممثل بـ سكينة بلاستيك عشان النتيجة مضمونة بدون إصابات.",
      cheatSheet: "دائماً اعمل Mock للـ Repositories والـ API Clients في الـ BLoC tests."
    },
    companyTags: ["Instabug", "Squadio", "Any Software House"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Moderate" }
  },

  // CARD 93
  {
    id: "flutter-ci-cd-actions",
    number: 93,
    title: "CI/CD in Flutter",
    titleAr: "التكامل والتسليم المستمر (CI/CD)",
    level: "Mid",
    frequency: "Frequently Asked",
    tags: ["DevOps", "Automation", "Tools"],
    definition: {
      summary: "الـ CI/CD هو أتمتة (Automation) عملية اختبار وبناء التطبيق ورفعه للمتاجر بمجرد مراجعة الكود، بدل الرفع اليدوي.",
      detailed: "1. **CI (Continuous Integration)**: كلما قام المطور برفع كود جديد لـ GitHub يتعمّل فحص أوتوماتيكي (Running Tests & Linting) للتأكد إن الكود سليم.\n2. **CD (Continuous Deployment/Delivery)**: بناء التطبيق (APK/IPA) أوتوماتيكياً وإرساله للـ QA أو رفعه مباشرة لـ App Store / Google Play.\n3. **Tools**: الأدوات الشائعة تشمل GitHub Actions, GitLab CI, Bitrise, أو استخدام Fastlane لتسهيل رفع التطبيقات وإدارة الشهادات.",
      analogy: "زي خط الإنتاج الآلي في المصانع: (CI) هو الكاميرا اللي بتفحص كل منتج لو فيه عيب ترفضه. (CD) هو الماكينة اللي بتغلف المنتج وتنقله مباشرة لسيارة التوصيل للعملاء.",
      keyPoints: [
        "Automated Testing on Pull Requests",
        "Automated Builds (APK, IPA)",
        "Fastlane for certificates/screenshots",
        "Saving developer time"
      ],
      codeExample: {
        language: "yaml",
        code: `# === مثال مبسط لـ GitHub Actions Workflow (CI) ===
name: Flutter CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.19.0'
      
      - run: flutter pub get
      - run: flutter analyze     # فحص جودة الكود (Linting)
      - run: flutter test        # تشغيل الاختبارات`
      }
    },
    questions: [
      {
        type: "Tools & Ecosystem",
        question: "How does Fastlane help a Flutter developer?",
        questionAr: "كيف تفيد أداة Fastlane مطور فلاتر؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "أداة مجانية تقوم بأتمتة مهام الرفع للمتجر (App Store / Google Play).",
            "تقوم بأخذ لقطات شاشة (Screenshots) أوتوماتيكياً بمقاسات مختلفة.",
            "تسهل إدارة الشهادات الأمنية لآبل (Provisioning Profiles & Certificates) عبر أداة Match."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["أن يتأكدوا أنك لست مجرد مبرمج بيكتب كود، بل شخص يهتم بدورة حياة الكود وجودته حتى يصل للعميل."],
      redFlags: ["الاعتماد الدائم على الـ 'Build' والـ 'Upload' اليدوي في مشاريع وفرق ضخمة وتجاهل أهمية الأتمتة."],
      greenFlags: ["ذكر أمثلة شخصية حول إعداد GitHub Actions أو Gitlab CI لعمل Lint و Test."]
    },
    linkedCards: {
      prerequisites: ["flutter-testing-intro"],
      nextSteps: [{ id: "flutter-security-best-practices", title: "Security Best Practices" }],
      related: ["flutter-obfuscation"]
    },
    commonPitfalls: [
      {
        mistake: "ترك الـ Keys و الـ Keystore Passwords مرئية في ملفات الـ CI/CD.",
        whyWrong: "هذا يعرض التطبيق للاختراق بشكل خطير ومباشر.",
        correctApproach: "استخدام الـ Secrets في GitHub/GitLab لتخزين هذه البيانات بأمان واستدعائها وقت البناء فقط."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ CI كأداة لاختبار جودة الكود.", "تعريف الـ CD كأداة لتسريع البناء والرفع.", "ذكر أمثلة عن الأدوات (GitHub Actions / Fastlane)."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Automated Pipeline", "Code Quality", "App Store Connect", "Version tagging"]
    },
    quickRevision: {
      bulletPoints: ["CI = تشغيل الـ Tests والـ Linting أوتوماتيك.", "CD = بناء الـ APK/IPA والرفع أوتوماتيك.", "أشهر أدوات: GitHub Actions, Bitrise, Codemagic.", "Fastlane = أتمتة التعامل مع المتاجر وشهادات Apple."],
      memoryHook: "CI/CD = المفتش الآلي والتوصيل المجاني.",
      cheatSheet: "دائماً قول إن الـ CI/CD بيوفر ساعات من العمل اليدوي في الـ Release وبيحمي الماستر (Main) من الكود المكسور."
    },
    companyTags: ["Any Software House", "Bosta", "Paymob", "Trella"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 94
  {
    id: "flutter-security-best-practices",
    number: 94,
    title: "Security Best Practices",
    titleAr: "أفضل ممارسات الأمان (Security)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["Security", "Best Practices", "API"],
    definition: {
      summary: "هي مجموعة من التقنيات لحماية التطبيق من الهاكرز (Reverse Engineering، سرقة البيانات، أو التجسس على الـ Network).",
      detailed: "أهم الممارسات:\n1. **Secure Storage**: استخدام \`flutter_secure_storage\` لتخزين بيانات حساسة (مثل التوكنز والكلمات السرية) في مساحة مشفرة (Keychain لآبل، Keystore لأندرويد) بدلاً من الشيرد بريفرنس.\n2. **Code Obfuscation**: تعتيم الكود لمنع الهندسة العكسية، بحيث يتم تشفير أسماء المتغيرات والدوال لرموز عشوائية.\n3. **SSL Pinning**: ربط التطبيق بشهادة الـ SSL الخاصة بالخادم (Server) فقط، مما يمنع الهاكرز من استخدام (Man-in-the-Middle) وتحويل الريكويستس لخوادمهم.\n4. **Jailbreak/Root Detection**: منع عمل التطبيق على الأجهزة المكسروة الحماية والتي يسهل استخراج البيانات منها.",
      analogy: "تخيل التطبيق بيت: الـ Secure storage هي الخزنة المصفحة جوه البيت لمقتنياتك الغالية. الـ Obfuscation كأنك بتكتب رسايلك كلها بلغة هيروغليفية عشان لو حرامي سرقها ميفهمهاش. والـ SSL Pinning زي إنك متفتحش الباب لمندوب البريد إلا لو البصمة بتاعته طابقت المعاينة اللي عندك في السجل.",
      keyPoints: [
        "Encryption vs Hashing",
        "Flutter Secure Storage",
        "SSL Pinning preventing MITM attacks",
        "Obfuscation (--obfuscate --split-debug-info)"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على Secure Storage ===
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = new FlutterSecureStorage();

// قراءة قيمة التوكن
String value = await storage.read(key: "auth_token");

// كتابة توكن أو باسورد (يتم تشفيره بواسطة نظام التشغيل)
await storage.write(key: "auth_token", value: "abcdef12345");`
      }
    },
    questions: [
      {
        type: "Security & Performance",
        question: "How do you protect your Flutter app against a Man-in-the-Middle (MITM) attack?",
        questionAr: "كيف تحمي تطبيقك من هجمات 'رجل في المنتصف' (MITM)؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "باستخدام تقنية **SSL Pinning** (أو Certificate Pinning).",
            "قم بتضمين شهادة حماية الخادم (PEM أو SHA-256 fingerprint) داخل التطبيق نفسه.",
            "عند الاتصال بـ API، سيتأكد التطبيق أن الخادم الذي يتحدث معه يحمل بالضبط هذه الشهادة، وإلا سيرفض الاتصال (حتى لو كان المتصل يمتلك شهادة SSL صحيحة ورسمية من شركة أخرى)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تقييم مستوى نضجك وحرصك على أمان التطبيق وبيانات المستخدمين (Financial/Banking Apps)."],
      redFlags: ["تخزين الباسورد أو الـ API Keys في ملفات كود أو \`SharedPreferences\` عادية.", "الاعتقاد بأن Flutter آمن 100% ولا يحتاج أمان إضافي."],
      greenFlags: ["ذكر كيفية إضافة Obfuscation عن طريق أمر الـ build.", "فهم دور الـ ProGuard في الأندرويد."]
    },
    linkedCards: {
      prerequisites: ["flutter-ci-cd-actions"],
      nextSteps: [{ id: "flutter-firebase-remote-config", title: "Firebase Remote Config & A/B Testing" }],
      related: ["flutter-native-communication"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام SSL Pinning وتضمين الشهادة برمز صلب (Hardcoded) وجعلها تنتهي صلاحيتها فجأة.",
        whyWrong: "عندما تنتهي الشهادة في السيرفر وتتجدد، سيتوقف تطبيق جميع المستخدمين عن العمل بشكل مفاجئ لأن نسختهم تحتفظ بالشهادة القديمة.",
        correctApproach: "تقديم آليات طوارئ لتجاوز الـ Pinning مؤقتاً في حالة انتهاء الشهادة، أو وضع أكثر من شهادة (Backup Certificates)."
      }
    ],
    answerStrategy: {
      structure: ["توضيح أن الأمان مسؤولية مشتركة بين الخادم والتطبيق.", "ذكر 3 جوانب رئيسية: التخزين الآمن، تأمين الاتصال (Pinning)، وتعتيم الكود.", "إعطاء تفاصيل عن كل منها بسرعة."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Man-In-The-Middle (MITM)", "Keystore/Keychain", "Reverse Engineering", "Obfuscation"]
    },
    quickRevision: {
      bulletPoints: ["Secure Storage: لتخزين الـ Tokens بشكل مشفر بواسطة النظام.", "SSL Pinning: لمنع التجسس على الكول الخاصة بالـ API.", "Obfuscation: تغيير أسماء المتغيرات والدوال لمنع سرقة الكود.", "Root Detection: منع التطبيق من العمل على أجهزة غير آمنة."],
      memoryHook: "Security = حماية بيانات المستخدم من الاختراق، وحماية الكود من السرقة.",
      cheatSheet: "دائماً أذكر الـ SSL Pinning إذا كان السؤال متعلق بتطبيقات مالية، لأنها الأكثر استهدافاً ببرامج التجسس زي (Charles Proxy)."
    },
    companyTags: ["Paymob", "Valu", "Thndr", "Fawry"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 95
  {
    id: "flutter-firebase-remote-config",
    number: 95,
    title: "Firebase Remote Config & A/B Testing",
    titleAr: "التحكم عن بُعد واختبارات A/B (Firebase)",
    level: "Mid",
    frequency: "Good to Know",
    tags: ["Firebase", "Analytics", "Marketing"],
    definition: {
      summary: "الـ Remote Config هو ميزة لتغيير إعدادات وشكل التطبيق (زي الألوان، الأسعار، أو إخفاء ميزة) من سيرفر Firebase مباشرة بدون الحاجة لرفع تحديث جديد للمتجر.",
      detailed: "1. **Remote Config**: يتيح حفظ مجموعة مسارات و Keys يمكن للتطبيق استدعاؤها دورياً.. إذا احتجنا لعمل عروض خصم أو تغيير رسالة أمان لتطبيقنا.. نغير القيمة في Firebase فتظهر فوراً (أو بعد وقت) للعملاء.\n2. **A/B Testing**: ميزة مدعمة بالـ Remote Config، تتيح اختبار نسختين مختلفتين من زر أو شاشة على نسبة من المستخدمين.. نصفهم سيرى زراً أحمر والنصف الآخر أزرق، ثم يتم معرفة أي زر حقق مبيعات أو ضغطات أكثر.\n3. **Feature Flags**: يمكن استخدامها كـ Switch لتشغيل ميزة جديدة وإطفائها للحماية من الأخطاء الكارثية للنسخ الجديدة.",
      analogy: "زي قائمة الأسعار في المطاعم الديجيتال.. المالك يقدر يغير السعر أو صورة الوجبة من اللابتوب بتاعه، وكل الشاشات المعلقة هتتغير في ثواني بدون ما يضطر يطبع ورق جديد (بدون App Update). الـ A/B Testing زي إنه يعمل عرضين ويشوف مين فيهم هيجيب زباين أكتر.",
      keyPoints: [
        "No App Store Review needed",
        "Feature Flags / Feature Toggling",
        "Dynamic UI Updates",
        "Data-driven decisions"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على استدعاء Remote Config ===
import 'package:firebase_remote_config/firebase_remote_config.dart';

Future<void> fetchConfig() async {
  final remoteConfig = FirebaseRemoteConfig.instance;
  
  // تحديد وقت التحديث الكاش (مثال دقيقة واحدة للتجربة)
  await remoteConfig.setConfigSettings(RemoteConfigSettings(
    fetchTimeout: const Duration(minutes: 1),
    minimumFetchInterval: const Duration(minutes: 1), 
  ));

  // تحديث القيم
  await remoteConfig.fetchAndActivate();
  
  // الحصول على القيمة وطباعتها
  bool isFeatureXEnabled = remoteConfig.getBool('feature_x');
  print("Feature X is: \$isFeatureXEnabled");
}`
      }
    },
    questions: [
      {
        type: "Product & Business",
        question: "How do you handle the delay that occurs when fetching Remote Config values on app startup?",
        questionAr: "كيف تتعامل مع التأخير الذي يحدث عند جلب بيانات Remote Config عند بدء تشغيل التطبيق؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "أفضل ممارسة هي تعيين (Default Values) افتراضية في الكود تُستخدم فوراً لمنع الـ (Loading Screen) من الانغلاق وإزعاج المستخدم.",
            "ثم يقوم التطبيق بعمل (Fetch and Activate) في الخلفية، بحيث تُطبق القيم الجديدة في الجلسة التالية (Next Session) للتطبيق.",
            "إذا كان التحديث حرجاً (مثل إيقاف ميزة خطيرة)، يتم إظهار Splash Screen حتى ينتهي الـ Fetch ثم إدخال المستخدم للتطبيق."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تقييم مستوى فهمك للعمل بشكل متوافق لتلبية أهداف البيزنس وزيادة الـ Conversions."],
      redFlags: ["عدم معرفة الفائدة التجارية لـ Feature Flags وكيف يمكن استخدامها كمانع للكوارث بعد الإطلاق (Kill Switch)."],
      greenFlags: ["معرفة الفرق بين \`fetch()\` و \`fetchAndActivate()\` وتوضيح كيفية تفادي تغيير الـ UI فجأة في وجه المستخدم."]
    },
    linkedCards: {
      prerequisites: ["clean-architecture-flutter"],
      nextSteps: [],
      related: ["state-management-comparison"]
    },
    commonPitfalls: [
      {
        mistake: "تعيين \`minimumFetchInterval\` إلى الصفر أو ثوانٍ معدودة في الـ Production.",
        whyWrong: "سيؤدي إلى عمل Request لخوادم فايربيس بشكل مكثف جداً وصدور خطأ (Throttling / Quota Exceeded).",
        correctApproach: "استخدام الصفر في الديفيلوبمنت فقط للتجربة، وفي الإنتاج تركه افتراضياً (12 ساعة) أو تقليله بحذر."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Remote Config كوسيلة لتجنب الـ App Store Review.", "توضيح علاقة الـ A/B Testing بالـ Remote Config و تحليل البزنس.", "ذكر كيفية استخدامه كـ Feature Flag."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Feature Toggles", "Data-driven decisions", "Bypassing App Store update", "Default values"]
    },
    quickRevision: {
      bulletPoints: ["Remote Config: تغيير إعدادات من بعيد بدون تحديث الستور.", "استخدامات: Feature Flags (زر الأمان)، Themes، إعلانات مصغرة.", "A/B Testing: تجربة نسختين من الـ UI لمعرفة أيهما يعجب اليوزر.", "لا تجعل الـ fetchInterval قليل في الـ Production."],
      memoryHook: "Remote Config = الريموت كنترول الخاص بك للتطبيقات المرفوعة.",
      cheatSheet: "دائماً ضع Default Values متطابقة مع آخر شكل للتطبيق تحسباً لضعف الإنترنت عند المستخدم وعدم قدرته على جلب الـ Configs."
    },
    companyTags: ["Foodics", "Talabat", "Swvl"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Moderate" }
  },

  // CARD 96
  {
    id: "flutter-performance-profiling",
    number: 96,
    title: "Performance Profiling & DevTools",
    titleAr: "تحليل الأداء وأدوات المطور (DevTools)",
    level: "Senior",
    frequency: "Must Know",
    tags: ["Performance", "DevTools", "Optimization"],
    definition: {
      summary: "هي عملية قياس استهلاك التطبيق للـ CPU، الذاكرة (Memory)، وسرعة رسم الشاشة (Rendering) لاكتشاف الـ Bottlenecks وحلها باستخدام Flutter DevTools.",
      detailed: "1. **Flutter DevTools**: أداة متكاملة تفتح في المتصفح تحتوي على عدة أدوات أهمها: Performance, Memory, Network.\n2. **UI Junk**: عندما يفشل التطبيق في رسم إطار (Frame) في أقل من 16 مللي ثانية (لشاشات 60Hz)، يحدث تقطيع في الـ Animations.\n3. **Memory Leaks**: عندما يقوم التطبيق بحجز مساحة في الذاكرة ولا يقوم بتحريرها (Dispose) بعد الانتهاء منها، مما يؤدي لبطء التطبيق وإغلاقه فجأة (Crash).\n4. **Profile Mode**: يجب دائماً قياس الأداء في هذا المود وليس في الـ Debug Mode لأن الأخير بطيء بطبيعته.",
      analogy: "زي كشف الطبيب: التطبيق شغال بس المريض بيشتكي من نهجان (بطء). إنت بتوصله بجهاز رسم قلب (DevTools) وتخليه يجري (Profile Mode) عشان تشوف النبض (Frames Per Second) وتعرف المشكلة في أي شريان (Widget).",
      keyPoints: [
        "Jank and UI threads",
        "Memory allocation (Dart Heap)",
        "O(N) operations blocking the main thread",
        "Profile mode testing"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على منع الـ Memory Leak ===
class _MyWidgetState extends State<MyWidget> {
  late ScrollController _scrollController;
  late StreamSubscription _subscription;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _subscription = myStream.listen((data) => print(data));
  }

  // القاعدة الذهبية: أي حاجة تفتحها في initState لازم تقفلها هنا
  @override
  void dispose() {
    _scrollController.dispose();
    _subscription.cancel(); 
    super.dispose();
  }
}`
      }
    },
    questions: [
      {
        type: "Performance & Rendering",
        question: "How do you detect and fix 'Jank' in a Flutter animation?",
        questionAr: "كيف تكتشف وتعالج مشكلة التقطيع 'Jank' في حركات فلاتر؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "أقوم بتشغيل التطبيق في الـ **Profile Mode** (وليس الـ Debug).",
            "أفتح تبويب **Performance** في الـ Flutter DevTools وأراقب الرسوم البيانية للـ UI Thread والـ Raster Thread.",
            "إذا تخطى الـ Frame حاجز الـ 16ms، ابحث عن الدوال الثقيلة (Heavy Sync Operations) في الـ Main Thread وأنقلها لـ \`Isolate\`.",
            "أتأكد من عدم وضع \`const\` للمكونات الثابتة، وأقلل من استخدام \`Opacity\` واستخدام مكونات مرسومة مسبقاً بدلاً من الـ \`saveLayer\`."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تحديد ما إذا كنت Senior قادراً على كتابة كود مريح للمستخدم وخالٍ من المشاكل التي لا تظهر إلا في الإنتاج."],
      redFlags: ["قياس الأداء في الـ Debug Mode وادعاء أن فلاتر بطيء.", "عدم استخدام الدالة \`dispose()\` وإهمال إدارة الذاكرة."],
      greenFlags: ["ذكر الـ Isolates، واستخدام الـ RepaintBoundary لعزل الأجزاء التي يعاد رسمها كثيراً."]
    },
    linkedCards: {
      prerequisites: ["dart-isolates-event-loop"],
      nextSteps: [{ id: "flutter-app-size-reduction", title: "App Size Reduction" }],
      related: ["flutter-widgets-trees"]
    },
    commonPitfalls: [
      {
        mistake: "عمل Rebuild لشاشة كاملة بسبب تغيير في حرف واحد داخل قائمة.",
        whyWrong: "يهدر الـ CPU والبطارية ويسبب تقطيع (Jank) في الأجهزة الضعيفة.",
        correctApproach: "استبدل \`setState\` في الـ Parent واستخدم أدوات الـ State Management الموضعية أو الـ \`ValueListenableBuilder\` لتحديث الجزء المطلوب فقط، مع استخدام \`const\` للويدجتس الثابتة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Performance Goals (60/120 FPS).", "ذكر أدوات القياس (Flutter DevTools).", "طرح حلول شائعة (const, Isolates, RepaintBoundary, dispose)."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["Frame render time (16ms)", "UI vs Raster thread", "Memory leaks", "Profile mode"]
    },
    quickRevision: {
      bulletPoints: ["DevTools: أداتك لكشف الـ Bottlenecks.", "Profile Mode: المكان الوحيد لقياس الأداء الحقيقي.", "Memory Leak: لما تنسى تعمل \`dispose\`.", "Jank: لما الفريم يتعطل وياخد أكتر من 16ms."],
      memoryHook: "Performance Profiling = كشف الـ 100,000 كيلو للعربية لمعرفة استهلاك البنزين وصوت الموتور.",
      cheatSheet: "دائماً اربط سؤال الأداء بـ 3 حاجات: الـ Isolates لوجيك تقيل، const Widgets عشان الرسم، و Dispose عشان الذاكرة."
    },
    companyTags: ["Foodics", "Swvl", "Valu"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 97
  {
    id: "flutter-app-size-reduction",
    number: 97,
    title: "App Size Reduction",
    titleAr: "تقليل حجم التطبيق (APK/IPA)",
    level: "Senior",
    frequency: "Frequently Asked",
    tags: ["Performance", "Optimization", "Deployment"],
    definition: {
      summary: "مجموعة من التقنيات والأوامر لتقليل المساحة التي يستهلكها تطبيق فلاتر على هواتف المستخدمين، مما يزيد من معدل التحميلات ويقلل الإلغاء.",
      detailed: "1. **App Bundles/Splitting**: بدلاً من رفع APK واحد يحتوي مكتبات 3 معالجات (ARM, x86)، يتم رفع App Bundle (\`.aab\`) ليكون التحميل مخصصاً لجهاز المستخدم.\n2. **Asset Optimization**: ضغط الصور (استخدام WebP/SVG بدلاً من PNG/JPG ذات الحجم الكبير) وإزالة الخطوط غير المستخدمة.\n3. **Code Obfuscation**: بجانب فائدته الأمنية، يقوم الدارت بتصغير (Minify) أسماء الدوال مما يقلل الحجم قليلاً.\n4. **Tree Shaking**: الدارت يقوم افتراضياً بحذف الكود الذي لم يتم استدعاؤه أبداً في الـ Release build.",
      analogy: "زي تحضير شنطة السفر لمكان وزنه محدود: بتشيل الهدوم اللي مش هتلبسها (Tree Shaking)، بتطبق الهدوم وتضغطها في أكياس مفرغة (Obfuscation/Minification)، وبتاخد الشاحن بتاع موبايلك بس مش كل الشواحن (App Bundle/Splitting).",
      keyPoints: [
        "Android App Bundle (.aab)",
        "APK Splitting (--split-per-abi)",
        "Image Compression (WebP/SVG)",
        "Tree shaking unused code/fonts"
      ],
      codeExample: {
        language: "bash",
        code: `# === أمر تقسيم الـ APK للأندرويد ===
# بدل حجم الـ APK ما يكون 60 ميجا، هيطلع 3 ملفات كل واحد 20 ميجا
flutter build apk --split-per-abi

# === أو الأفضل للرفع لجوجل بلاي ===
# جوجل سيقوم بتنزيل الـ ABI المناسب لكل هاتف أوتوماتيكياً
flutter build appbundle --obfuscate --split-debug-info=./debug_info`
      }
    },
    questions: [
      {
        type: "Deployment & Store",
        question: "How do you minimize the size of your Flutter release app?",
        questionAr: "كيف تقلل حجم تطبيقك عند استخراجه للنسخة النهائية (Release)؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "أولاً: بناء التطبيق كـ **App Bundle (AAB)** للأندرويد بدلاً من APK شامل.",
            "ثانياً: استخدام ميزة **--obfuscate** و **--split-debug-info**.",
            "ثالثاً: تحويل جميع الصور الضخمة إلى صيغة **WebP** أو **SVG**.",
            "رابعاً: مراجعة مكتبة الأيقونات واستخدام \`--tree-shake-icons\` لحذف الأيقونات غير المستخدمة."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة قدراتك في أخر مراحل المشروع (Deployment) وحرصك على أرقام المنتج (User Acquisition) التي تتأثر بالحجم."],
      redFlags: ["رفع (Fat APK) بحجم 100+ ميجابايت وعدم الانتباه لمشكلة الحجم.", "تضمين مئات الصور ذات الدقة الفائقة داخل \`assets\` بدلاً من ضغطها أو جلبها من الشبكة."],
      greenFlags: ["ذكر صيغة الـ WebP ومزاياها الفائقة.", "معرفة أمر \`split-per-abi\`."]
    },
    linkedCards: {
      prerequisites: ["flutter-performance-profiling"],
      nextSteps: [{ id: "flutter-platform-channels", title: "Platform Channels (MethodChannel)" }],
      related: ["flutter-ci-cd-actions"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام صور وفيديوهات ضخمة داخل الـ Assets Folder.",
        whyWrong: "هذا يضخم حجم التطبيق بشكل رهيب. (فلاتر محركه الأساسي يستهلك من 4 لـ 5 ميجا تقريباً، الباقي أكثره Assets).",
        correctApproach: "استخدام \`CachedNetworkImage\` وحفظ الصور الضخمة على السيرفر، أو استخدام WebP بضياع قليل للصور المدمجة."
      }
    ],
    answerStrategy: {
      structure: ["شرح أهمية الحجم للمستخدم (معدلات التحميل).", "الجانب الكودي (Tree Shaking, Minification).", "الجانب البصري (WebP, SVG).", "أوامر البناء (AAB, split-per-abi)."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1.5 دق" },
      keyPhrases: ["AAB (Android App Bundle)", "Tree Shaking", "WebP Optimization", "Fat APK"]
    },
    quickRevision: {
      bulletPoints: ["استخدم App Bundle بدلاً من الشامل.", "اجعل الأيقونات SVG والصور WebP.", "قم بتشغيل --obfuscate لتصغير الكود.", "استفد من نعمة الـ Tree Shaking في الدارت."],
      memoryHook: "App Size = تصفية الدهون وتفصيل المقاس الخاص.",
      cheatSheet: "دائماً اذكر إن تقليل الحجم بيرفع معدل بقاء التطبيق مع المستخدمين في دول الإنترنت البطيء أو الهواتف الضعيفة."
    },
    companyTags: ["Any Software House", "Bosta", "Valu"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 98
  {
    id: "flutter-platform-channels",
    number: 98,
    title: "Platform Channels (MethodChannel)",
    titleAr: "التواصل مع الأنظمة الأصلية (Platform Channels)",
    level: "Senior",
    frequency: "Good to Know",
    tags: ["Native", "Advanced", "Architecture"],
    definition: {
      summary: "هي طريقة لربط كود الدارت بكود النظام الأصلي (Kotlin/Java في أندرويد، Swift/ObjC في iOS) للوصول لقدرات غير موجودة مباشرة في فلاتر (البطارية، البلوتوث العميق، أو حزم SDK لشركات خارجية).",
      detailed: "1. **MethodChannel**: الطريقة الأكثر شيوعاً، تقوم بإرسال رسائل غير متزامنة (Asynchronous) بين Flutter والـ Host (iOS/Android).\n2. **BasicMessageChannel**: تستخدم لإرسال بيانات خام أو نصوص بشكل سريع جداً (Custom Codecs).\n3. **EventChannel**: للتعامل مع البيانات المستمرة (Streams) مثل حساسات الحركة أو الـ GPS.\n4. **Mechanism**: يتم إرسال الرسالة من الدارت، يستقبلها النظام الأصلي بناءً على أسم القناة والميثود، ينفذها، ثم يرد بالنتيجة للدارت.",
      analogy: "زي السفير (MethodChannel) اللي بينقل رسالة من رئيس دولة (Flutter) لرئيس دولة تانية (Android/iOS) بلغتهم الخاصة عبر مترجم، ولما يخلص الطلب، المترجم بيرجع الرد للرئيس الأول.",
      keyPoints: [
        "Asynchronous message passing",
        "Serialization/Deserialization of values",
        "Host and Client roles",
        "FFI (Foreign Function Interface) for C/C++"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال استدعاء ميزة البطارية من الدارت ===
import 'package:flutter/services.dart';

class BatteryService {
  // 1. تعريف اسم القناة (يجب أن يكون مطابقاً لاسم القناة في كود الأندرويد/iOS)
  static const platform = MethodChannel('samples.flutter.dev/battery');

  Future<String> getBatteryLevel() async {
    try {
      // 2. استدعاء الدالة على الجانب الآخر
      final int result = await platform.invokeMethod('getBatteryLevel');
      return 'Battery level: \$result%';
    } on PlatformException catch (e) {
      return "Failed to get battery level: '\${e.message}'.";
    }
  }
}`
      }
    },
    questions: [
      {
        type: "Architecture & Low-Level",
        question: "How do you listen to continuous hardware sensor data (like Bluetooth scanning) in Flutter using Platform Channels?",
        questionAr: "كيف تستمع لبيانات مستمرة من حساسات الجهاز (مثل فحص البلوتوث) في فلاتر باستخدام قنوات النظام؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "باستخدام **EventChannel** (وليس MethodChannel).",
            "نقوم بإنشاء \`EventChannel\` في دارت ونستمع لها كـ \`Stream\`.",
            "في جهة الـ Native، نقوم بعمل \`EventSink\` تقوم بإرسال البيانات بشكل متكرر كلما تغيرت قراءات الحساس للكلاينت (دارت)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["التأكد أنك لست مجرد مستخدم لمكتبات \`pub.dev\`، بل قادر على بناء جسر خاص بك إذا احتجت للتعامل مع شركة دفعات محلية (Payment Gateway) ليس لديها مكتبة فلاتر الجاهزة."],
      redFlags: ["الاعتماد الكلي على إجابة: 'هتواصل مع المطور الأندرويد ليعملها'.", "عدم فهم أن التواصل يتم عبر Serialization (وهو مكلف زمنياً)."],
      greenFlags: ["معرفة الفرق بين \`MethodChannel\` و \`EventChannel\`. ذكر الـ FFI كبديل جديد وجدّي للتواصل مع كود C."]
    },
    linkedCards: {
      prerequisites: ["flutter-isolates-event-loop"],
      nextSteps: [],
      related: ["flutter-security-best-practices"]
    },
    commonPitfalls: [
      {
        mistake: "إرسال بيانات ضخمة جداً متكررة (كالصور والفيديو 60 فريم) عبر الـ MethodChannel.",
        whyWrong: "لأن الـ Serialization والـ Deserialization لبيانات ضخمة سيكلف وقتاً كثيراً (Main thread blocking) وسيسبب تقطيعاً شديداً.",
        correctApproach: "استخدام الـ Texture (للرسم السريع كالكاميرا) أو الـ FFI (Dart:FFI) للتعامل المباشر مع الذاكرة بتكلفة شبه معدومة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Platform Channels كالكوبري بين عوالم فلاتر والنيتف.", "شرح الـ MethodChannel للنداء الواحد، والـ EventChannel للستريم.", "ضرب مثال بمكتبات الـ Payment أو طباعة الفواتير كاستخدام عملي بالغ الأهمية في السوق."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["Host and Client", "Asynchronous messaging", "FFI", "Custom native SDK"]
    },
    quickRevision: {
      bulletPoints: ["MethodChannel: زي \`Future\` لطلب واحد.", "EventChannel: زي \`Stream\` لبيانات مستمرة.", "BasicMessageChannel: لبيانات الخام السريعة.", "FFI: البديل الجديد الأسرع لكود الـ C/C++."],
      memoryHook: "Platform Channels = السفير والمترجم بين دولة دارت ودول أبل وجوجل.",
      cheatSheet: "دائماً اربط سؤال الـ Channels بحلول الدفع (Payment Gateways) اللي ملهاش Plugin لفلاتر، ده بيثبت إنك فاهم مشاكل السوق الحقيقية."
    },
    companyTags: ["Fawry", "Paymob", "Valu", "Any FinTech"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 99
  {
    id: "flutter-animations-implicit-explicit",
    number: 99,
    title: "Implicit vs Explicit Animations",
    titleAr: "الحركات الضمنية والصريحة (Animations)",
    level: "Mid",
    frequency: "Frequently Asked",
    tags: ["UI", "Animations", "UX"],
    definition: {
      summary: "فلاتر تقسم الحركات إلى قسمين: مدمجة وسهلة (Implicit) تقوم بإحداث التغيير تلقائياً، ومتقدمة ومعقدة (Explicit) تتطلب تحكم كامل بـ Controller.",
      detailed: "1. **Implicit Animations (AnimatedFoo)**: مجموعة كلاسات (مثل AnimatedContainer, AnimatedOpacity). تُعطيها قيمة جديدة ووقت زمني، وستقوم هي تلقائياً بعمل حركة سلسة بين القيمة القديمة والجديدة بدون الحاجة لتعريف Controller.\n2. **Explicit Animations (FooTransition)**: مجموعة كلاسات (مثل FadeTransition, SlideTransition). تتطلب أن تُنشئ \`AnimationController\` و \`Tween\`، وتسمح لك بالتحكم الكامل (الإيقاف، الإرجاع، التكرار، المزامنة).",
      analogy: "الـ Implicit زي (الأسانسير الأوتوماتيك).. تدوس الدور الـ 5، وهو هيطلعك بنفسه بهدوء وتميل للخلف بس متقدرش توقفه في النص. الـ Explicit زي (السواقة المعال).. معاك دبرياج وفرامل وتقدر تمشي، تقف، وترجع لورا بمزاجك وفي أي وقت.",
      keyPoints: [
        "Implicit: Easy, Set-and-Forget, No Controller",
        "Explicit: Full control, Needs AnimationController",
        "Tween (Between): Interpolation of values",
        "Curves: Easing functions (EaseIn, Bounce)"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على Implicit Animation ===
// مجرد تغيير قيمة العرض، سيتمدد المربع بحركة ناعمة لمدة ثانية
double boxWidth = 100;

AnimatedContainer(
  duration: Duration(seconds: 1),
  curve: Curves.fastOutSlowIn,
  width: boxWidth,
  height: 100,
  color: Colors.blue,
)

// === مثال لتعريف Explicit Controller ===
// يحتاج لـ TickerProviderStateMixin في الكلاس
late AnimationController _controller;

@override
void initState() {
  super.initState();
  _controller = AnimationController(
    duration: const Duration(seconds: 2),
    vsync: this, // الشاشة الحالية هي الـ Ticker
  );
  // نتحكم فيه يدوياً: _controller.forward() أو .reverse()
}`
      }
    },
    questions: [
      {
        type: "UI & Animations",
        question: "When should you use an Explicit Animation instead of an Implicit Animation?",
        questionAr: "متى يجب عليك استخدام Explicit Animation بدلاً من Implicit Animation؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "أستخدم Explicit عندما أحتاج للتحكم الدقيق: مثل إرجاع الحركة للخلف (Reverse)، تكرارها للأبد (Repeat).",
            "أو عندما أحتاج لربط حركات متعددة ببعضها (Staggered Animations).",
            "كذلك عندما تكون الحركة معتمدة على تفاعل المستخدم المستمر (مثل عملية السحب Drag/Scroll)."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تقييم مستوى اهتمامك بالـ UX والتجربة السلسة لتطبيقك ومعرفة متى تستخدم الأداة البسيطة ومتى تُعقد الأمور لحاجة مهمة."],
      redFlags: ["كتابة \`AnimationController\` كامل لتغيير لون زر بسيط (Over-engineering).", "عدم معرفة ما هو الـ \`Tween\`."],
      greenFlags: ["ذكر أمثلة على הـ \`AnimatedBuilder\` وكيف يوفر الأداء من خلال عدم إعادة بناء كل شيء. ذكر الفرق بين \`vsync\` و الـ \`Tickers\`."]
    },
    linkedCards: {
      prerequisites: ["flutter-widget-lifecycle"],
      nextSteps: [{ id: "flutter-responsive-adaptive", title: "Responsive vs Adaptive Design" }],
      related: ["flutter-performance-profiling"]
    },
    commonPitfalls: [
      {
        mistake: "نسيان عمل \`dispose\` للـ AnimationController.",
        whyWrong: "لأن الـ Controller ممتطي للـ Ticker (عداد الشاشة)، وعند إغلاق الشاشة سيظل يعمل في الخلفية مسبباً Memory Leak ومشاكل في الأداء المحرج.",
        correctApproach: "استدعاء \`_controller.dispose();\` قبل استدعاء \`super.dispose();\` في دورة الحياة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Implicit كحل سريع لمجرد (تغيير القيم).", "تعريف الـ Explicit كأداة تحكم قوية تحتاج \`Controller\`.", "ذكر الكلمات المفتاحية Tween و vsync و Dispose."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["AnimationController", "Forward & Reverse", "Tween mapping", "TickerProvider"]
    },
    quickRevision: {
      bulletPoints: ["Implicit: غير متحكم به، يشتغل لوحده لما تتغير القيمة (زي AnimatedContainer).", "Explicit: تحت السيطرة، يشتغل ويقف بأمرك (تحتاج Controller).", "Tween: القيمة بتبتدي كام وتنتهي كام.", "Curve: الحركة بتبدأ بطيئة وتسرع، ولا بتبدأ بـ نطة (Bounce)؟"],
      memoryHook: "Implicit = الأوتوماتيك. Explicit = المانيوال.",
      cheatSheet: "لو الحركة رد فعل طبيعي لتغيير داتا (زي إخفاء عنصر)، استخدم Implicit ووفر وقتك."
    },
    companyTags: ["Instabug", "Elmenus", "Any software house valuing UX"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Moderate" }
  },

  // CARD 100
  {
    id: "flutter-responsive-adaptive",
    number: 100,
    title: "Responsive vs Adaptive Design",
    titleAr: "التصميم المتجاوب (Responsive) والمتكيف (Adaptive)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["UI", "Architecture", "UX Design"],
    definition: {
      summary: "هما طريقتان لجعل التطبيق يعمل بشكل جيد على جميع الأجهزة (موبايل، تابلت، ويب، ديسكتوب)، ولكل منهما مفهوم مختلف.",
      detailed: "1. **Responsive Design (متجاوب)**: التركيز على مساحة الشاشة (Layout). التطبيق يغير ترتيب أو أحجام العناصر بناءً على العرض (مثال: على الموبايل يعرض عمود واحد، وعلى الويب يعرض صف به 3 أعمدة). نستخدم \`LayoutBuilder\` و \`MediaQuery\`.\n2. **Adaptive Design (متكيف)**: التركيز على نظام التشغيل وحالة الإدخال (Platform/Input). التطبيق يغير شكل المكونات لتناسب المنصة (مثال: على iOS يظهر CupertinoSwitch، وعلى Android يظهر MaterialSwitch. أو على الجوال نستخدم Touch للـ Scrolling وتنبثق كيبورد الموبايل، بينما في الديسكتوب نستخدم ضغطة الماوس (Hover) وأزرار الكيبورد الخارجية).",
      analogy: "الـ Responsive زي (شنطة مرنة).. بتأخذ شكل الحاجات اللي جواها وتتمط حسب مساحة صندوق العربية. الـ Adaptive زي (حرباء الـ UI).. بتغير لونها (شكل الأزرار) وشكل مشيتها (الماوس/اللمس) عشان تبقى شبه المكان (النظام) اللي هي فيه.",
      keyPoints: [
        "Responsive = Layout resizing (LayoutBuilder)",
        "Adaptive = Platform feeling (Platform.isIOS)",
        "Navigation variations (BottomNav vs Drawer vs Rail)",
        "Mouse & Keyboard vs Touch"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على Responsive ===
Widget build(BuildContext context) {
  // يراقب المساحة المتاحة للمكون فقط، أفضل من MediaQuery للشاشات المعقدة
  return LayoutBuilder(
    builder: (context, constraints) {
      if (constraints.maxWidth > 600) {
        return _buildWideLayout(); // التابلت/الويب
      } else {
        return _buildNarrowLayout(); // الموبايل
      }
    },
  );
}

// === مثال على Adaptive ===
Widget buildSwitch() {
  import 'dart:io' show Platform;
  import 'package:flutter/cupertino.dart';
  
  // شكل مختلف حسب نظام التشغيل
  if (Platform.isIOS) {
    return CupertinoSwitch(value: val, onChanged: (v){});
  } else {
    return Switch(value: val, onChanged: (v){});
  }
}`
      }
    },
    questions: [
      {
        type: "UI Context",
        question: "When would you choose LayoutBuilder over MediaQuery for responsiveness?",
        questionAr: "متى تختار LayoutBuilder على MediaQuery لعمل تجاوب الشاشة؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "أستخدم **MediaQuery** عندما أحتاج لمعرفة أبعاد الشاشة الكاملة (الجهاز بأكمله).",
            "وأستخدم **LayoutBuilder** عندما يكون مكون الـ UI صغيراً وأريده أن يتغير حجمه بناءً على المساحة المعطاة له (Constraints) من قِبل الـ Parent، بغض النظر عن حجم الموبايل الفعلي.",
            "الـ LayoutBuilder يجعل المكون قابلاً لإعادة الاستخدام بسهولة في أي مكان (Web/Mobile)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تحديد ما إذا كنت متفتحاً لبناء تطبيقات للمنصات الأخرى (Web/Desktop) أم أنك مصمم فقط للهواتف الذكية."],
      redFlags: ["الاعتماد المطلق على استخدام (Width * 0.5) عبر الـ MediaQuery في كل الأكواد مما يسبب كوارث عند قلب الشاشة (Landscape) أو على الويب.", "الخلط بين مفهومي التجاوب والتكيف."],
      greenFlags: ["ذكر أهمية (SafeArea، Flexible، Expanded، Wrap). ذكر \`NavigationRail\` لشاشات الويب."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-trees"],
      nextSteps: [{ id: "flutter-testing-intro", title: "Introduction to Flutter Testing" }], // Loop relation
      related: ["flutter-animations-implicit-explicit"]
    },
    commonPitfalls: [
      {
        mistake: "عمل \`Platform.isIOS\` في بيئة الويب للـ Flutter Web.",
        whyWrong: "المتصفح لا يعتبر نفسه 'Mobile OS' في مكتبة \`dart:io\`، وسيسبب خطأ (Unsupported Error) في فلاتر ويب بسبب استدعاء الـ IO.",
        correctApproach: "استخدام \`kIsWeb\` أولاً للتحقق من بيئة الويب، أو استخدام مكتبة \`universal_platform\`."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Responsive أنه (الحجم والمكان).", "تعريف الـ Adaptive أنه (الشكل والإحساس الخاص بالنظام).", "ذكر أدوات مهمة للمطور (LayoutBuilder للجزء الأول، Platform checks للجزء الثاني)."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Constraints go down", "Platform conventions", "MediaQuery limitations", "Web Hover vs Mobile Touch"]
    },
    quickRevision: {
      bulletPoints: ["Responsive: الشاشة بتضيق؟ رتب العناصر فوق بعض.. بتعرض؟ حطهم جنب بعض.", "Adaptive: المستحدم ماسك أيفون؟ وريه زراير أبل.. بيكتب كماوس؟ حرك المؤشر بحركة Hover.", "LayoutBuilder: يفهم مساحة الكونتينر.", "MediaQuery: تفهم مساحة التليفون كله."],
      memoryHook: "Responsive للمقاسات، Adaptive للشكل والإحساس (Feel).",
      cheatSheet: "دائماً اختار \`LayoutBuilder\` لو بتعمل Custom Widget عشان يكون من السهل تستخدمها جوه حته صغيرة من الشاشة بدون ما تضرب عشان الـ Screen Size."
    },
    companyTags: ["Software Houses (Making Dashboards)", "Swvl", "Bosta"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Moderate" }
  },

  // CARD 101
  {
    id: "flutter-buildcontext-deepdive",
    number: 101,
    title: "BuildContext Deep Dive",
    titleAr: "التعمق في الـ BuildContext",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Core Concepts", "Widgets", "Architecture"],
    definition: {
      summary: "الـ BuildContext هو بمثابة (موقع الـ Widget في الشجرة). وهو الطريقة التي تتعرف بها الـ Widget على الـ Parent الخاص بها وتستخرج منه البيانات (مثل الثيم، أو الميديا كويري، أو البروفايدر).",
      detailed: "1. **What is it?**: في الواقع \`BuildContext\` هو عبارة عن \`Element\` (الجزء المسؤول عن ربط الـ Widget بالـ RenderObject). كل Widget لها Context خاص بها.\n2. **Lookups (O(1))**: دوال مثل \`Theme.of(context)\` أو \`Provider.of(context)\` تقوم بالبحث في الشجرة صعوداً (Upwards) عن أقرب أب يوفر هذه البيانات.\n3. **Context across async gaps**: المشكلة الأشهر في الدارت هي تمرير الـ context لدالة \`async\` واستخدامه بعد الـ \`await\`. قد تكون الـ Widget قد أُغلقت (unmounted) وهذا سيؤدي إلى Crash.",
      analogy: "زي الـ 'GPS Location' للموظف جوه الشركة.. لو الموظف (Widget) عايز يعرف لون لبس الشركة (Theme) أو مين المدير بتاعه (Provider)، لازم يستخدم الـ GPS بتاعه (Context) عشان يسأل اللي فوقيه. ولو الموظف ده اترفد من الشركة (Unmounted) وحاول يستخدم الـ GPS بعدين، النظام هيعمله Crash.",
      keyPoints: [
        "Identifies widget's position in the Element Tree",
        "Used for InheritedWidgets lookup (Nav, Theme, media)",
        "Every widget builds its own context",
        "Mounted check before using across async gaps"
      ],
      codeExample: {
        language: "dart",
        code: `// === الاستخدام الخاطئ والصحيح للـ Context في Async ===
Future<void> fetchAndShowDialog(BuildContext context) async {
  // 1. استدعاء API طويل
  await Future.delayed(Duration(seconds: 3));

  // 2. فلاتر هتزعل هنا ويطلع تحذير: (Don't use BuildContext across async gaps)
  // ليه؟ لأن ممكن اليوزر يكون قفل الشاشة دي وقت التالت ثواني والـ context مات.

  // 3. الحل: نتأكد إن الـ context لسه موجود في الشجرة (mounted)
  if (!context.mounted) return;

  // 4. دلوقتي نقدر نظهر الديالوج بأمان
  showDialog(
    context: context,
    builder: (c) => AlertDialog(title: Text("Done")),
  );
}`
      }
    },
    questions: [
      {
        type: "Core Mechanics",
        question: "Why do you get a 'No MediaQuery widget found' or 'No Navigator' error when using context in initState?",
        questionAr: "لماذا يظهر خطأ 'No Navigator' عند استخدام context داخل دالة initState؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "لأن في فترة الـ \`initState\`، الشجرة (Tree) لم يكتمل بناؤها بعد، والربط بين הـ Widget والأباء (Ancestors) لم يكتمل.",
            "الحل: الـ \`context\` يمكن استخدامه بأمان في \`build()\`, أو \`didChangeDependencies()\`, أو عبر تأخير تنفيذه داخل الـ initState باستخدام \`Future.microtask(() => ...)\`."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة هل أنت تحفظ الأكواد أم تفهم كيف يقرأ فلاتر الـ UI ويجد بياناته."],
      redFlags: ["تجاهل رسالة التحذير (Don't use BuildContext across async gaps) وإسكاتها بـ ignore، بدون فهم سببها."],
      greenFlags: ["ذكر علاقة الـ Context بالـ Element Tree والـ InheritedWidget."]
    },
    linkedCards: {
      prerequisites: ["flutter-widget-lifecycle"],
      nextSteps: [{ id: "flutter-keys", title: "Using Keys (ValueKey, ObjectKey, GlobalKey)" }],
      related: ["state-management-comparison"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام Context الشاشة (Parent) لفتح SnackBar وإغلاق الشاشة فوراً \`Navigator.pop(context)\`.",
        whyWrong: "لأن الـ SnackBar يحتاج ScafflodMessenger ليبقى ظاهراً، وإغلاق الشاشة قد يغير أو يدمر الـ Context مما يُخفي الـ SnackBar أو يسبب شذوذاً في الواجهة.",
        correctApproach: "استخدام \`ScaffoldMessenger.of(context).showSnackBar()\` (لأنه يرتبط بالـ Root لا الشاشة نفسها) ثم عمل الـ Pop."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Context كـ \`Element\` و 'عنوان' في الشجرة.", "شرح أهم عملياته (Searching up).", "ذكر المشكلة الشائعة (Async Gaps ومسألة הـ mounted)."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Position in the tree", "InheritedWidget lookup", "Async Gaps", "Mounted check"]
    },
    quickRevision: {
      bulletPoints: ["Context = موقع الويدجت في الشجرة.", "\`Theme.of(context)\` = بتبص لفوق لحد ما تلاقي أقرب Theme.", "إياك تستخدمه بعد \`await\` من غير ما تتأكد \`if(context.mounted)\`."],
      memoryHook: "الـ Context = الـ GPS Coordinates الخاصة بكل ويدجت.",
      cheatSheet: "دائماً افتح الـ \`build\` ميثود وهتلاقي بتاخد \`BuildContext context\` كدليل إن فلاتر بيخلق Context جديد لكل زرار وكل تكست."
    },
    companyTags: ["Any Software House", "Bosta", "Swvl", "Paymob"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Moderate" }
  },

  // CARD 102
  {
    id: "flutter-keys",
    number: 102,
    title: "Using Keys (ValueKey, ObjectKey, GlobalKey)",
    titleAr: "استخدام الـ Keys في فلاتر",
    level: "Mid",
    frequency: "Must Know",
    tags: ["UI", "Core Concepts", "Troubleshooting"],
    definition: {
      summary: "الـ Keys تُستخدم للتحكم في كيفية قيام فلاتر بإعادة استخدام (Reusing) ونسخ الـ Widgets القديمة عند عمل Rebuild، خاصة في القوائم المتغيرة (Lists).",
      detailed: "1. **Local Keys (ValueKey, ObjectKey, UniqueKey)**: تتعامل في محيط (Same Parent). إذا قمت بحذف أو تبديل عنصرين لهما نفس الـ Type (مثلاً 2 StatelessWidgets) وبداخلهما State معينة.. فلاتر سيصاب بالحيرة ويبدل مكانهما خطأ، الـ Key يخبر فلاتر من هو من.\n2. **GlobalKey**: يُستخدم للوصول إلى \`State\` الخاص بويدجت من مكان بعيد تماماً في الشجرة (مثال: فتح الدرج \`Drawer\` بضغط زر من شاشة أخرى)، أو لنقل المكون (Reparenting) بالكامل بدون فقدان حالته.",
      analogy: "تخيل قدامك علبتين هدايا لونهم أحمر (نفس الـ Type). وأنا بدلت أماكنهم وأنت مغمض. لما تفتح عينك مش هتعرف هديتك فيهم فين. الحل؟ نلزق على كل علبة كارت عليه اسمك (الـ Key). وقتها حتى لو تبدلوا ألف مرة، هتلاقي هديتك.",
      keyPoints: [
        "Keys preserve state inside collections",
        "Default widget matching is by Type only",
        "ValueKey (for Strings/Ints), ObjectKey (for Objects)",
        "GlobalKey is expensive (causes full tree search)"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على ValueKey ===
// لو عملنا Dismiss (سحب ومسح) لعنصر من قائمة، فلاتر ممكن يمسح العنصر الغلط
// لكن لما نحط Key، مستحيل يغلط
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return Dismissible(
      key: ValueKey(items[index].id), // هنا الـ Key بيحمي الداتا
      onDismissed: (direction) => items.removeAt(index),
      child: ListTile(title: Text(items[index].title)),
    );
  },
)

// === مثال Global Key ===
final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

// بعدين جوا الفورم
Form(
  key: _formKey,
  child: ...
)

// لما نحب نعمل Validate من أي أداة تانية (زر خارج الفورم مثلاً)
_formKey.currentState!.validate();`
      }
    },
    questions: [
      {
        type: "Debugging & UI",
        question: "When should you NOT use a GlobalKey?",
        questionAr: "متى يجب عليك 'عدم' استخدام الـ GlobalKey؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "يجب تجنب \`GlobalKey\` قدر الإمكان لأنه يستهلك الموارد (Expensive) ويخلق اعتمادات قوية تشبه الـ (Global Variables).",
            "لا يجب استخدامه فقط للوصول إلى الـ State لنقل البيانات؛ بدلاً من ذلك يجب الاعتماد على (State Management) مثل \`Provider\` أو رفع الـ State للأب (State Lifting).",
            "يقتصر استخدامه على الضرورة القصوى مثل الـ Form Validation أو التحكم المباشر بـ Scaffold (كفتح الدرج)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["فهمك لكيفية عمل الـ Element Tree الخاص بفلاتر وكيف يطابق (Diffing Algorithm) الأجزاء القديمة بالجديدة."],
      redFlags: ["استخدام \`UniqueKey()\` داخل دالة \`build()\` لقائمة."],
      greenFlags: ["معرفة لماذا يؤدي استخدام \`UniqueKey()\` داخل الـ \`build\` إلى تدمير الأداء (لأنه يخلق مفتاحاً جديداً كل ثانية، مما يجبر פلاتر على تدمير المكونات ورسمها من الصفر بدلاً من تحديثها)."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-trees"],
      nextSteps: [{ id: "flutter-forms-validation", title: "Form Handling & Validation" }],
      related: ["flutter-buildcontext-deepdive"]
    },
    commonPitfalls: [
      {
        mistake: "وضع الـ Key في أداة فرعية بدلاً من الأداة الجذرية المضافة للقائمة.",
        whyWrong: "إذا وضعت הـ Key داخل \`Text()\` والمشكلة هي في الـ \`Card()\` الذي يحويه، فلن يعمل الـ Key. يجب وضعه في الـ Top-level widget للعنصر المراد التحكم فيه في القائمة.",
        correctApproach: "وضع \`key: ValueKey()\` في الـ Parent widget للعنصر المضاف للـ Row أو Column."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Keys ومبدأ المطابقة الافتراضي (Type only).", "شرح الـ Local Keys (Value, Object) وحل مشاكل القوائم المتغيرة.", "شرح الـ GlobalKey ومخاطر استخدامه بإفراط."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Preserving state", "Widget matching type and key", "Element Tree", "Expensive GlobalKey"]
    },
    quickRevision: {
      bulletPoints: ["ValueKey: اربطه بـ ID أو رقم مميز.", "ObjectKey: اربطه بالكائن (Object) لو مفهوش ID.", "GlobalKey: للوصول لـ State من حته تانية بعيدة (زي الـ Form).", "بدون Keys، فلاتر ممكن يبدل حالة زرارين ببعض لو ليهم نفس الشكل."],
      memoryHook: "الـ Key = البطاقة الشخصية اللي بتمنع تشابه الأسماء في الداتا بيز.",
      cheatSheet: "دائماً افتكر الـ Dismissible Widget.. مستحيل تشتغل من غير Key يربط الـ UI ببيانات الليست."
    },
    companyTags: ["Any Software House"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 103
  {
    id: "flutter-scrollables",
    number: 103,
    title: "Scrollables (ListView vs SingleChildScrollView vs Slivers)",
    titleAr: "قوائم التمرير وبناء الشاشات المعقدة",
    level: "Mid",
    frequency: "Crucial",
    tags: ["UI", "Performance", "Layout"],
    definition: {
      summary: "لإمساك شاشة قابلة للتمرير في فلاتر، توجد 3 مستويات: المستوى البسيط (SingleChild)، القوائم الذكية (ListView builder)، والوحش المعقد والأكثر كفاءة (Slivers).",
      detailed: "1. **SingleChildScrollView**: تلف بداخله Column. يقوم برسم كل مكوناته من البداية سواء كانت ظاهرة على الشاشة أو لا. (ممتاز للشاشات القصيرة كالفورم ولعبء الأداء الضعيف).\n2. **ListView.builder**: يعتمد على مفهوم الـ (Lazy Loading)، أي أنه يبني المكونات التي تظهر أمام عين المستخدم فقط، ويدمرها إذا اختفت. (ممتاز للقوائم الطويلة جداً كالشات).\n3. **CustomScrollView (Slivers)**: المكون الأقوى. الـ Sliver هو جزء (Slice) من مساحة الـ Scroll. تتيح لك وضع Header ينكمش ويتمدد مع الحركة (SliverAppBar) مع قائمة من تحتها (SliverList) أو شبكة (SliverGrid) في نفس التمريرة الواحدة (Single Scroll Context).",
      analogy: "SingleChild عامل زي الورقة العادية، بتفرد المساحة وتقعد تكتب. ListView زي ماكينة العرض السينمائي، بتجيب اللقطة اللي قدام العدسة بس. Slivers دي ماكينة تانية أذكى، متقسمة أجزاء.. جزء للعنوان بيكبر ويسغر بمزاجه، وجزء بعده شبكة صور، كلهم ماشيين ورا بعض في بكرة سكرول واحدة سلسة.",
      keyPoints: [
        "Lazy compilation vs Eager compilation",
        "Slivers enable fancy scrolling effects",
        "Never use ListView inside Column without constraints"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على Slivers لبناء شاشة احترافية ===
CustomScrollView(
  slivers: [
    SliverAppBar(
      pinned: true, // يفضل العنوان متعلق في الأعلى
      expandedHeight: 200.0,
      flexibleSpace: FlexibleSpaceBar(
        title: Text('Slivers Demo'),
        background: Image.network('...', fit: BoxFit.cover),
      ),
    ),
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) => ListTile(title: Text('Item \$index')),
        childCount: 1000, // Lazy Building
      ),
    ),
  ],
)`
      }
    },
    questions: [
      {
        type: "Layout & Errors",
        question: "Why do you get a 'Viewport was given unbounded height' error when placing a ListView inside a Column?",
        questionAr: "لماذا تواجه خطأ 'Unbounded height' عند وضع ListView داخل Column، وكيف تحله؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "الـ \`Column\` يحاول إعطاء طول لا نهائي لأبنائه (Vertical Unbounded). والـ \`ListView\` تحاول التمدد لتملأ أكبر طول ممكن.. مما يؤدي لتعارض وكراش.",
            "الحل: وضع الـ \`ListView\` داخل \`Expanded\` أو \`Flexible\`، أو استخدام \`shrinkWrap: true\` (على حساب الأداء) لتجبر الـ ListView على أخذ مساحة ما بداخلها فقط."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["التأكد أنك لست مبتدئاً يستخدم \`SingleChildScrollView\` لحمل قائمة بيانات ضخمة (500 منتج) مما سيدمر أداء التطبيق والميموري."],
      redFlags: ["عدم معرفة ماهية الـ Lazy Loading في الـ .builder", "استخدام \`shrinkWrap: true\` دائماً كحل سحري لمشاكل الشاشة دون وعي بتكلفته على الرام."],
      greenFlags: ["ذكر الـ Slivers بوضوح وكيف تبني تأثيرات الـ Parallax أو הـ Collapsible Headers بالشاشات الاحترافية."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-trees"],
      nextSteps: [],
      related: ["flutter-performance-profiling"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام \`ListView\` (وليس ListView.builder) لعرض عدد ضخم من العناصر.",
        whyWrong: "لأن الـ \`ListView\` (العادي) يشبه SingleChildScrollView، فهو Eagerly compiled وسيبني الـ 1000 عنصر مرة واحدة ويسد الميموري.",
        correctApproach: "الاستخدام الدائم لـ \`ListView.builder\` أو \`ListView.separated\` للقوائم الطويلة لتشغيل الـ Lazy Building."
      }
    ],
    answerStrategy: {
      structure: ["ذكر المشاكل الأدائية للـ SingleChildScrollView للقوائم الطويلة.", "بيان قوة الـ builder للـ Lazy loading.", "ختام إجابة مبهرة بشرح הـ Slivers لأقصى تحكم في הـ Scrolling."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Lazy Building", "ShrinkWrap performance penalty", "SliverAppBar", "Single scroll context"]
    },
    quickRevision: {
      bulletPoints: ["SingleChildScrollView: لشاشة الـ Login أو فورم بسيط.", "ListView.builder: لشات أو قائمة منتجات (لأنها موفرة للأداء).", "Slivers: لشاشات البروفايل المعقدة اللي فيها صورة بتنكمش فوق وتحتها ليست.", "متنساش Expanded لو الـ List جوه Column."],
      memoryHook: "Slivers = بكرة سكرول واحدة ساحرة بتعمل كل حاجة.",
      cheatSheet: "دائماً هاجم \`shrinkWrap: true\` وقول إن استخدامه الكتير هو عدو الـ Performance الأول للمبتدئين."
    },
    companyTags: ["Any E-commerce Company", "Valu", "Talabat"],
    egyptianMarket: { popularity: "Very High", salaryImpact: "Moderate" }
  },

  // CARD 104
  {
    id: "flutter-forms-validation",
    number: 104,
    title: "Form Handling & Validation",
    titleAr: "التعامل مع الاستمارات (Forms) والتحقق",
    level: "Junior",
    frequency: "Must Know",
    tags: ["UI", "Forms", "UX"],
    definition: {
      summary: "هي طريقة فلاتر الرسمية لأخذ بيانات إدخال متعددة (TextFormFields) والتحكم فيها، والتحقق من صحتها (Validation) بضغطة زر بدلاً من التحقق من كل حقل منفرداً.",
      detailed: "1. **Form Widget**: كلاس نقوم بتغليف الحقول (Fields) بداخله، ونربطه بـ \`GlobalKey<FormState>\` للسيطرة عليه.\n2. **Validation**: يحتوي كل \`TextFormField\` على خاصية \`validator\`. تقوم بإعادة \`null\` إذا كان الإدخال صحيحاً، أو \`String\` بنوع الخطأ إذا كان الإدخال غير صحيح.\n3. **Controllers**: تستخدم الـ \`TextEditingController\` للوصول السريع للنصوص المكتوبة، لكن في الفورمز يفضل استخدام خاصية \`onSaved\` لتجميع بيانات الموديل مرة واحدة عند نجاح التحقق.",
      analogy: "زي موظف الشباك (Form) اللي رايح تسلمه أوراقك. بدل ما كل موظف صغير (Field) يراجع ورقة وتبهدل نفسك، أنت بتدي الدوسيه للمدير (GlobalKey) يضرب عينه على كل الأوراق (Validate)، ولو حاجة غلط يعلم لك عليها بالقلم الأحمر (Error message)، ولو سليم يقولك أتممنا الطلب (Save).",
      keyPoints: [
        "GlobalKey<FormState>",
        "Validator functions returning null or String",
        "FormState.validate() and FormState.save()",
        "TextEditingController limitation (causes rebuilds if not careful)"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على إنشاء Form سليم ===
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'برجاء كتابة الاسم';
          }
           if (value.length < 3) {
            return 'الاسم قصير';
          }
          return null; // الإدخال سليم!
        },
        onSaved: (val) => myModel.name = val,
      ),
      ElevatedButton(
        onPressed: () {
          // التحقق من كل الحقول التابعة للـ Form دي
          if (_formKey.currentState!.validate()) {
            _formKey.currentState!.save();
            sendToServer(myModel);
          }
        },
        child: Text('Submit'),
      ),
    ],
  ),
)`
      }
    },
    questions: [
      {
        type: "UX & Behavior",
        question: "What is autovalidateMode and how do you use it effectively?",
        questionAr: "ما هو autovalidateMode وكيف تستخدمه بشكل فعال لتقديم تجربة مستخدم (UX) جيدة؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "هي خاصية في الـ \`Form\` تحدد متى يتم التحقق واللون الأحمر تلقائياً.",
            "يفضل استخدام \`AutovalidateMode.onUserInteraction\` بدلاً من \`always\`.",
            "هذا يجعل اللون الأحمر (الخطأ) لا يظهر للمستخدم في بداية فتح الشاشة (مما يخيفك)، بل يظهر فقط إذا بدأ يكتب شيئاً خاطئاً أو مسحه."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["التأكد أنك قادر على بناء الشاشة الأكثر مللاً وأهمية في التطبيقات (Login / Checkout) بكفاءة."],
      redFlags: ["إنشاء 10 \`TextEditingController\` في شاشة واحدة وعدم عمل \`dispose\` لهم، مما يُحدث تسريباً للذاكرة."],
      greenFlags: ["استخدام الـ RegExp (التعابير النمطية) للتحقق من الإيميلات في הـ validator."]
    },
    linkedCards: {
      prerequisites: ["flutter-keys"],
      nextSteps: [],
      related: ["flutter-buildcontext-deepdive"]
    },
    commonPitfalls: [
      {
        mistake: "عمل Rebuild للشاشة بكل مرة يتغير فيها حرف في הـ TextField.",
        whyWrong: "استخدام \`onChange: (val) { setState((){}) }\` يبطئ الأداة جداً وتختفي لوحة المفاتيح أحياناً.",
        correctApproach: "استخدم Controllers واقتصر الـ rebuild على مكان الحاجة فقط (مثبتة في الـ Form)."
      }
    ],
    answerStrategy: {
      structure: ["شرح الـ FormKey.", "أهمية הـ Validator وقيمة הـ Null للرد الإيجابي.", "كيفية تجميع البيانات بالـ Save."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Validation", "GlobalKey", "Regex", "TextEditingController lifecycle"]
    },
    quickRevision: {
      bulletPoints: ["عشان تحكم الشاشة، حط Fields في Form ممسوك بـ GlobalKey.", "الـ Validator لو نجح لازم يرجع null.", "\`validate()\` بتأكد من الأخطاء، \`save()\` بـ trigger دالة \`onSaved\` عشان تجمع الداتا بسهولة بدون كاتبة controllers كتير."],
      memoryHook: "الـ Form = الدوسيه والمدير.",
      cheatSheet: "دائماً افتكر تقفل الـ \`TextEditingController\` بالـ \`dispose\` لو اضطريت تستخدمهم."
    },
    companyTags: ["Any Software House", "Startups"],
    egyptianMarket: { popularity: "High", salaryImpact: "Low" }
  },

  // CARD 105
  {
    id: "flutter-localization",
    number: 105,
    title: "Internationalization (i18n) & Localization (l10n)",
    titleAr: "التعريب والتعدد اللغوي (Localization)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["UX", "Architecture", "Tools"],
    definition: {
      summary: "هي عملية تجهيز التطبيق ليدعم لغات واتجاهات متعددة (مثل العربية RTL والإنجليزية LTR)، بحيث يمكن تبديل لغة الواجهة ديناميكياً بدون المساس بالمنطق الأساسي.",
      detailed: "1. **Official Way (.arb)**: ينصح باستخدام الحزمة الرسمية \`flutter_localizations\`، وإنشاء ملفات \`.arb\` (زي \`app_en.arb\`, \`app_ar.arb\`) التي تحتوي الكلمات كمفتاح وقيمة ظاهرة.\n2. **Generation**: عند الـ Build يتم استخراج كلاس \`AppLocalizations\` للوصول للنصوص من خلال הـ \`BuildContext\` بأمان وتوفر التلميح للكود (Autocompletion).\n3. **Easy Localization**: بعض الشباب يفضلون مكتبة \`easy_localization\` مع ملفات \`JSON\` أو \`YAML\` للسهولة الشديدة، إلا أن الطريقة الرسمية أفضل للأداء الـ (Type-Safe).",
      analogy: "زي قائمة الطعام في مطعم سياحي.. الوصفة وحدة لكن التسمية تختلف. الـ JSON أو הـ .arb هو المنيو المترجم للموظف (Context). بتسأله: 'يا context هات اسم الوجبة رقم 5'، هيجيبها بالإنجليزي أو العربي حسب زبون المنيو فاتح بأي لغة.",
      keyPoints: [
        ".arb files (Application Resource Bundle)",
        "AppLocalizations.of(context).helloWord",
        "RTL (Right-To-Left) vs LTR rendering support",
        "Type Safety directly inside the Dart compiler"
      ],
      codeExample: {
        language: "dart",
        code: `// === 1. شكل ملف الـ app_en.arb ===
{
  "greeting": "Hello, {name}!",
  "@greeting": {
    "description": "A welcome message",
    "placeholders": {
      "name": {
        "type": "String",
        "example": "Ali"
      }
    }
  }
}

// === 2. الاستخدام في الكود ===
// الميزة هنا إن لو نسيت الباراميتر، الكومبايلر هيرفض يشتغل (Type-safe)
Text(
  AppLocalizations.of(context)!.greeting('Ali'),
  style: TextStyle(fontSize: 20),
)`
      }
    },
    questions: [
      {
        type: "Troubleshooting",
        question: "How do you force the entire app to be 'RTL' locally for testing even if the device language is English?",
        questionAr: "كيف تجبر التطبيق كاملاً ليصبح من اليمين لليسار (RTL) بهدف المراجعة حتى لو كان الهاتف بالإنجليزية؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "باستخدام خاصية \`locale\` بداخل הـ \`MaterialApp\`.",
            "عبر تعيين \`locale: const Locale('ar', 'EG')\` سيُجبر فلاتر على إظهار النصوص العربية وتبديل اتجاه الـ \`Directionality\` لجميع الودجتس، بغض النظر عن لغة جهاز الإختبار."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["في السوق الخليجي والمصري، الدعم العربي والمحاذاة RTL شرط أساسي لكل مبرمج Flutter."],
      redFlags: ["التعديل اليدوي العنيف (استخدام \`Row\` مع عكس ترتيب العناصر برمجياً) للتحايل على הـ RTL.", "استخدام ملفات Dart ضخمة جداً بها Map ثابتة للترجمات بدون \`Context\` (مما يمنع تغيير اللغة فورياً بداخل الـ State)."],
      greenFlags: ["ذكر الاعتماد الدائم على خاصيات \`start\` و \`end\` بدلاً من الـ \`left\` و \`right\` في الـ Padding/Margin لدعم اللغتين تلقائياً."]
    },
    linkedCards: {
      prerequisites: ["clean-architecture-flutter"], // Used mostly there
      nextSteps: [],
      related: ["flutter-buildcontext-deepdive"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام \`EdgeInsets.only(left: 10, right: 20)\` للمحاذاة.",
        whyWrong: "سيظل الفراغ على اليسار 10 سواء كانت اللغة عربي أو إنجليزي، مما يُشوه شكل التطبيق في الـ RTL.",
        correctApproach: "يجب دائماً وبلا استثناء استخدام \`EdgeInsetsDirectional.only(start: 10, end: 20)\`، فـ Start ستعني دائمـاً (اليسار في LTR) و (اليمين في RTL)."
      }
    ],
    answerStrategy: {
      structure: ["توضيح الطريقة المتبعة (.arb أو easy_localization).", "كيف يساعد فلاتر نفسه (الـ Directionality).", "النصيحة الذهبية (Start vs Left)."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Type-safe translations", "Directional Padding", "L10n / i18n", "Context dependent translations"]
    },
    quickRevision: {
      bulletPoints: ["التعريب Официально: عن طريق ملفات الـ \`.arb\` اللي بتولد أكواد Type-safe.", "لازم الماتيريال اب ياخد הـ \`localizationsDelegates\`.", "انسى خالص كلمة \`Left\` و \`Right\` واستخدم مكانهم \`Start\` و \`End\`."],
      memoryHook: "L10n دي اختصار لـ Localization (حرف L و n بينهم 10 حروف).",
      cheatSheet: "دائماً جاوب إنك بتفضل الطريقة الرسمية بتاعت فلاتر عشان مفيهاش أي Magic strings ومفيدة في הـ Refactoring لو غيرت كلمة."
    },
    companyTags: ["Any Software House (MENA Region)"],
    egyptianMarket: { popularity: "Crucial", salaryImpact: "Moderate" }
  },

  // CARD 106
  {
    id: "flutter-navigation-routing",
    number: 106,
    title: "Navigation & Routing (1.0 vs 2.0 / go_router)",
    titleAr: "التنقل بين الشاشات (Navigator vs Router)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Core Concepts", "Architecture", "Web"],
    definition: {
      summary: "هي طريقة فلاتر في إدارة انتقال المستخدم بين الشاشات (Routes). يوجد الجيل الأول البسيط (Navigator 1.0)، والجيل الثاني المعقد والمناسب للويب (Router/Navigator 2.0).",
      detailed: "1. **Navigator 1.0**: يعتمد على مبدأ الـ Stack (Imperative). أنت تأمر فلاتر بـ \`push\` شاشة فوق أخرى، أو \`pop\` للخروج منها. عيبه الحقيقي يظهر في تطبيقات الويب حيث لا يتحكم بشكل جيد في زر الـ Back بتاع المتصفح أو الـ Deep Linking.\n2. **Navigator 2.0 (Router)**: يعتمد على حالة التطبيق (Declarative). الشاشات المفتوحة هي عبارة عن State، إذا تغيرت الـ State، تتغير الشاشات. يدعم بالكامل مميزات المتصفح والروابط العميقة (Deep Links).\n3. **go_router**: مكتبة رسمية من فريق فلاتر بُنيت لتسهيل تعقيد Navigator 2.0 الشديد، وتعتبر المعيار الحالي (Industry Standard) للمشاريع الجديدة.",
      analogy: "Navigator 1.0 زي إنك تحط كروت (شاشات) فوق بعض على الترابيزة (Push).. والمستخدم يشيل الكارت اللي فوق عشان يشوف اللي تحته (Pop). أما Navigator 2.0 (أو go_router) زي شريط البحث في المتصفح.. أنت بتكتب العنوان، وهو بيعرضلك الشاشة المربوطة بالعنوان ده فورا.",
      keyPoints: [
        "Navigator 1.0: Imperative (push/pop)",
        "Navigator 2.0 (Router API): Declarative (State-driven)",
        "go_router simplifies 2.0 complexity",
        "Deep linking and Web URL support"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال على استخدام go_router ===
import 'package:go_router/go_router.dart';

// 1. إعداد الـ Router
final GoRouter _router = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) => const HomeScreen(),
      routes: <RouteBase>[
        GoRoute(
          path: 'details/:id', // يدعم الباراميترز بسهولة
          builder: (BuildContext context, GoRouterState state) {
            final id = state.pathParameters['id'];
            return DetailsScreen(id: id);
          },
        ),
      ],
    ),
  ],
);

// 2. التنقل في الـ UI
ElevatedButton(
  onPressed: () => context.go('/details/42'), // تغيير الـ URL والتنقل
  child: const Text('Go to Details'),
);`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "What is the difference between \`context.go()\` and \`context.push()\` in go_router?",
        questionAr: "ما هو الفرق بين \`context.go()\` و \`context.push()\` عند استخدام مكتبة go_router؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "**\`context.go()\`**: يقوم باستبدال المسار الحالي (URL) بالكامل بالمسار الجديد. إذا كنت في \`/A\` وذهبت לـ \`/B\`، فإن زر العودة قد يخرجك من التطبيق إذا لم تكن \`B\` متفرعة من \`A\` في تعريف الروتر (يغير הـ Stack).",
            "**\`context.push()\`**: يتصرف مثل Navigator 1.0، حيث يضع الشاشة الجديدة فوق الشاشة الحالية في الـ Stack، احتفاظاً بالشاشة القديمة تحتها (مثالي لزر الـ Back الصريح)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة ما إذا كنت مواكباً لتحديثات فلاتر (go_router) أم أنك محبوس في عام 2019 (Navigator.push)."],
      redFlags: ["بناء تطبيق فلاتر (Web) بالكامل باستخدام Navigator 1.0 وعدم عمل أي حساب لأن المستخدم قد يضغط زر 'العودة' في المتصفح مما قد يغلق التطبيق."],
      greenFlags: ["ذكر Nested Navigation (وجود أكثر من Navigator في نفس الشاشة، كالـ BottomNavigationBar) وتسهيل go_router لها."]
    },
    linkedCards: {
      prerequisites: ["flutter-buildcontext-deepdive"],
      nextSteps: [],
      related: ["flutter-responsive-adaptive"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام \`Navigator.pushReplacement()\` في كل مكان لمنع زر الرجوع.",
        whyWrong: "هذا يجعل كود الـ Routing مبعثراً في كل شاشات الـ UI، ويجعل من المستحيل عمل Deep Link صريح من إشعار (Notification) لشاشة داخلية.",
        correctApproach: "استخدام Router (مثل go_router) لمركزية جميع المسارات في مكان واحد (Single Source of Truth) وتسهيل التعامل مع الروابط العميقة."
      }
    ],
    answerStrategy: {
      structure: ["مقارنة سريعة بين 1.0 و 2.0 (Push/Pop vs Declarative/URL).", "الإشارة لتعقيد 2.0 وتقديم الحل السحري (\`go_router\`).", "ذكر ميزتي الويب والـ Deep Linking."],
      timeAllocation: { junior: "1.5 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["Declarative routing", "Deep links", "go_router", "Web history state"]
    },
    quickRevision: {
      bulletPoints: ["Navigator 1.0: شغال بنظام ادفع وفضي (Push/Pop).", "Navigator 2.0: شغال بنظام الروابط والـ State (زي الويب).", "go_router: المكتبة الرسمية اللي خلت Navigator 2.0 سهل للبشر.", "\`push\` بتحط الشاشة فوق اللي فاتت، \`go\` بتروح للرابط الجديد وتمسح اللي فات لو مش تحته في الشجرة."],
      memoryHook: "Navigator 1.0 = كروت كوتشينة. Navigator 2.0 = شريط روابط المتصفح.",
      cheatSheet: "لو الانترفيو عن موبايل بس، 1.0 مقبول. لو بيسألوا عن Web، لازم تجاوب بـ Router / go_router."
    },
    companyTags: ["Any Startup", "Companies making Web Dashboards"],
    egyptianMarket: { popularity: "High", salaryImpact: "High" }
  },

  // CARD 107
  {
    id: "flutter-packages-vs-plugins",
    number: 107,
    title: "Packages vs Plugins",
    titleAr: "الفرق بين الـ Packages والـ Plugins",
    level: "Junior",
    frequency: "Must Know",
    tags: ["Core Concepts", "Architecture", "Dependencies"],
    definition: {
      summary: "رغم أن كلاهما يتم إضافته في ملف \`pubspec.yaml\`، إلا أن بينهما اختلافاً جوهرياً في طبيعة الكود الذي يقدمانه.",
      detailed: "1. **Packages (Dart Packages)**: هي حزم مكتوبة بالكامل بلغة \`Dart\` الصافية. لا تعتمد على أي نظام تشغيل، وتعمل فوراً على الفون والويب والديسكتوب. (مثال: \`provider\`, \`intl\`, \`path\`).\n2. **Plugins (Flutter Plugins)**: هي نوع خاص من الباكدجات، تحتوي كود Dart يمثل واجهة، وخلفه يوجد كود \`Native\` (Java/Kotlin للأندرويد، Swift/ObjC للـ iOS) للتعامل مع عتاد الجهاز أو نظام التشغيل. (مثال: \`camera\`, \`geolocator\`, \`shared_preferences\`).",
      analogy: "الـ Package زي (كتاب وصفات طبخ).. مكتوب بلغة واحدة (Dart) وممكن أي حد يقراه وينفذه في أي مطبخ. أما الـ Plugin زي (فيشة كهربا محولة).. جزء منها من بره متصمم لليوزر العادي يمسكه (Dart)، والجزء التاني اللي جوه الحيطة متصمم خصوصي للبلد دي (Native Code) عشان يقدر يسحب الكهربا.",
      keyPoints: [
        "Package = 100% Dart code",
        "Plugin = Dart interface + Native implementation",
        "Plugins require MethodChannels or FFI",
        "All Plugins are Packages, but not all Packages are Plugins"
      ],
      codeExample: {
        language: "yaml",
        code: `# في ملف pubspec.yaml لا يوجد فرق في طريقة الإضافة
dependencies:
  flutter:
    sdk: flutter
    
  # Package (Dart only - Logic/UI)
  cached_network_image: ^3.3.0
  
  # Plugin (Needs Native OS APIs - Hardware/Storage)
  image_picker: ^1.0.4`
      }
    },
    questions: [
      {
        type: "Concept",
        question: "If your Flutter app works on Android but crashes on the Web complaining about 'MissingPluginException', what went wrong?",
        questionAr: "إذا كان تطبيقك يعمل على أندرويد ولكنه ينهار (Crash) على الويب بخطأ 'MissingPluginException'، فماذا حدث؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "الخطأ يعني أنك تستخدم **Plugin**.",
            "البلجن المضاف (مثلاً للكاميرا أو البطارية) يحتوي على كود Native للأندرويد والـ iOS، ولكنه يفتقر إلى تنفيذ (Implementation) خاص بالويب (JavaScript/Browser APIs).",
            "يجب التأكد من موقع pub.dev أن البلجن المختار يدعم منصة الـ Web قبل استخدامه لتجنب هذا الخطأ."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["التأكد من فهمك لتركيبة فلاتر والمكتبات التي تستخدمها، وأنك لا ترمي الأكواد دون فهم ما يعمل في بيئة الـ Native وما يعمل في الدارت."],
      redFlags: ["الاعتقاد بأن كل شيء في pub.dev هو كود فلاتر محلي (Native Dart)."],
      greenFlags: ["ذكر أن الـ Plugins تستخدم بالضرورة (Platform Channels)."]
    },
    linkedCards: {
      prerequisites: ["flutter-platform-channels"],
      nextSteps: [{ id: "flutter-dependency-overrides", title: "Dependency Overrides & pubspec" }], // Future card
      related: ["flutter-native-communication"]
    },
    commonPitfalls: [
      {
        mistake: "نسيان عمل Restart للتطبيق (أو إعادة الـ Build للـ APK/Run) بعد إضافة Plugin جديد.",
        whyWrong: "ميزة الـ Hot Reload تطبق التغييرات على درات فقط (Dart code). أما الـ Plugin فهو يجلب كود Java/Swift جديد يحتاج للـ Gradle او XCode بجمعه أولاً.",
        correctApproach: "أي مكتبة تتعامل مع الكاميرا أو التخزين (Plugin).. قم بإيقاف التطبيق، وتشغيله من جديد (Full Stop and Run)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Package ككود دارت صافي.", "تعريف الـ Plugin ككود دارت + ملفات نيتف للأنظمة.", "ذكر أمثلة لكل نوع."],
      timeAllocation: { junior: "1 دق", mid: "1 دق", senior: "45 ث" },
      keyPhrases: ["Pure Dart", "Native implementation", "MethodChannels", "Hardware access"]
    },
    quickRevision: {
      bulletPoints: ["Package: كود دارت فقط (زي رسم UI أو انيمشين).", "Plugin: كود دارت + كود نيتف (زي الكاميرا والـ GPS).", "لو ضفت Package، الـ Hot Reload شغال.", "لو ضفت Plugin، لازم تقفل التطبيق وتفتحه تاني."],
      memoryHook: "البلجن (Plug-in) يعني بتفيش الفيشة في حيطة الموبايل الحقيقية (النيتف).",
      cheatSheet: "دائماً لاحظ أي مكتبة في pub.dev فيها كلمة (Platform Support).. دي بنسبة 99% Plugin."
    },
    companyTags: ["Any Startup"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "Low" }
  },

  // CARD 108
  {
    id: "flutter-custom-painter",
    number: 108,
    title: "CustomPainter & Canvas",
    titleAr: "الرسم الحر (CustomPainter)",
    level: "Senior",
    frequency: "Good to Know",
    tags: ["UI", "Advanced UI", "Animations"],
    definition: {
      summary: "هو كلاس في فلاتر يعطيك 'لوحة رسم' (Canvas) فارغة وأدوات هندسية (قلم، فرشاة، شكل) لترسم واجهات مستخدم معقدة جداً أو رسوماً بيانية لا يمكن بناؤها بالودجتس العادية.",
      detailed: "1. **The Canvas**: هي المساحة التي ترسم عليها باستخدام دوال مثل \`drawLine\`, \`drawCircle\`, أو \`drawPath\`.\n2. **The Paint**: هو الكائن الذي يحدد لون الرسم، السُمك (strokeWidth)، ونوع الرسم (ممتلئ fill أو خطوط stroke).\n3. **CustomPaint Widget**: هي الويدجت التي تحوّل الـ \`CustomPainter\` الخاص بك إلى ويدجت فعلية تُعرض في الشاشة وتأخذ حجم معين (Size).\n4. **Performance**: الرسم بالكانفاس سريع جداً، ولكنه يحتاج ذكاء في دالة \`shouldRepaint\` لمنع فلاتر من إعادة رسم الأشكال المعقدة بلا داعي.",
      analogy: "زي الرسام المحترف.. بدل ما تجبله مكعبات جاهزة يبني بيها البيت (الودجتس العادية زي Container).. أنت بتحطه قدام لوحة قماش بيضاء (Canvas)، وبتديله باليتة ألوان وفرشاة (Paint)، وبتقوله ارسم لي منحنى وشمس وخطوط بدقة المللي.",
      keyPoints: [
        "Overrides paint() and shouldRepaint()",
        "Canvas operations (Paths, Shapes, Text)",
        "Paint object defines style and color",
        "Extremely performant for charts/complex UI"
      ],
      codeExample: {
        language: "dart",
        code: `// === مثال لرسم خط مائل وشكل دائرة باستخدام الكانفاس ===
import 'package:flutter/material.dart';

class MyCoolPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // 1. تعريف الفرشاة (لون أحمر وسمك 5)
    final paint = Paint()
      ..color = Colors.red
      ..strokeWidth = 5.0
      ..style = PaintingStyle.stroke;

    // 2. رسم خط من الزاوية العلوية اليسرى للسفلية اليمنى
    canvas.drawLine(Offset.zero, Offset(size.width, size.height), paint);
    
    // 3. رسم دائرة في المنتصف
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), 40, paint);
  }

  // متى نعيد الرسم لو تغيرت الخصائص الخارجية؟
  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false; 
}

// الاستخدام في الـ UI
CustomPaint(
  size: Size(200, 200),
  painter: MyCoolPainter(),
)`
      }
    },
    questions: [
      {
        type: "Graphics & UI",
        question: "When would you prefer using CustomPainter over composition (combining normal widgets like Containers and Columns)?",
        questionAr: "متى تفضل استخدام الـ CustomPainter بدلاً من تجميع الودجتس العادية لبناء شكل معين؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "عندما لا يمكن للودجتس العادية تشكيل التصميم (مثل رسومات بيانية منحنية Charts، أو أشكال متموجة Waves).",
            "عندما يتم توليد التصميم ديناميكياً بهندسة رياضية.",
            "لأسباب الأداء: الـ CustomPainter أسرع بكثير من استخدام 1000 أداة \`Container\` صغيرة لبناء أداة قياس (Gauge) أو شبكة، لأنه يتخطى طبقة الـ Widget Tree بأكملها ويرسم للكانفاس المباشر (Skia/Impeller)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تحديد ما إذا كنت Senior قادراً على تلبية طلبات الـ UI/UX الغريبة لشركات كبرى تصمم تطبيقات غير تقليدية (كالبنوك وتطبيقات الصحة التي تعتمد على الرسوم البيانية)."],
      redFlags: ["الخوف من استخدام الرياضيات (الـ Sine و Cosine) لرسم الـ Paths.", "إرجاع \`true\` دائماً في دالة \`shouldRepaint\` مما يهدر الـ CPU."],
      greenFlags: ["ذكر تقنية \`RepaintBoundary\` لتغليف הـ CustomPaint الجاهز لمنع الـ Parent من إجباره على إعادة الرسم."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-trees"],
      nextSteps: [{ id: "flutter-animations-implicit-explicit", title: "Animations" }],
      related: ["flutter-performance-profiling"]
    },
    commonPitfalls: [
      {
        mistake: "القيام بعمليات حسابية ثقيلة جداً أو إنشاء כائنات (Objects) جديدة داخل دالة הـ \`paint()\`.",
        whyWrong: "لأن دالة \`paint()\` قد تُستدعى 60 مرة في الثانية (60fps) إذا كان هناك تحريك (Animation). إنشاء Objects هنا سيسبب ضغطاً مهولاً على הـ Garbage Collector.",
        correctApproach: "تعريف خصائص الـ \`Paint\` وتجهيز الـ \`Path\` المبدئي في الكونستراكتور (Constructor) أو خارج דالة الـ paint وتمريرها جاهزة إن أمكن."
      }
    ],
    answerStrategy: {
      structure: ["تعريف הـ CustomPainter ووظيفته (اللوحة والفرشاة).", "أهم الدالتين: \`paint\` و \`shouldRepaint\`.", "متى نستخدمه (الـ Charts والأشكال الغير هندسية التقليدية)."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["Canvas and Paint", "Sub-pixel accuracy", "ShouldRepaint optimization", "Graphic charts"]
    },
    quickRevision: {
      bulletPoints: ["الـ CustomPaint للرسم الحر بالرياضيات.", "Canvas = الورقة، Paint = القلم.", "بيحل مشاكل الـ UI اللي الـ Container والـ ClipRRect مش قادرين عليها.", "دالة shouldRepaint مهمة جداً للأداء عشان الفلاتر ميعدش رسم حاجة متغيرتش."],
      memoryHook: "CustomPainter = تحويل המبرمج לـ فنان تشكيلي.",
      cheatSheet: "دائماً اذكر إن الـ CustomPainter أقوى في الـ Performance من تجميع 100 ودجت فوق بعض لتكوين شكل واحد مخصص."
    },
    companyTags: ["Any FinTech (Charts)", "Companies with custom heavy UX"],
    egyptianMarket: { popularity: "Moderate", salaryImpact: "High" }
  },

  // CARD 109
  {
    id: "flutter-isolates-vs-web-workers",
    number: 109,
    title: "Isolates vs Web Workers (Flutter Web)",
    titleAr: "عزل العمليات في الموبايل والويب",
    level: "Senior",
    frequency: "Rarely Asked / Deep Dive",
    tags: ["Advanced", "Performance", "Web"],
    definition: {
      summary: "كما نستخدم الـ Isolates في تطبيقات الموبايل لمنع توقف الـ UI أثناء العمليات الثقيلة، في بيئة الويب الـ (Isolates) غير موجودة حقيقياً، وتتم محاكاتها أو استبدالها بـ Web Workers.",
      detailed: "1. **Mobile (Isolates)**: الدارت يعمل بمفهوم الإيسوليتس، كل واحدة لها ذاكرتها المنعزلة. عملية ضخمة تفصل لـ Background Isolate والـ UI يظل سلساً.\n2. **Web Reality**: المتصفحات لا تفهم الـ Isolates. سابقاً، كانت الـ \`compute\` أو إنشاء Isolate في فلاتر ويب يتجاهلها المتصفح ويعملها في الـ Main Thread، مما كان يؤدي لـ (Jank) وتجميد للمتصفح.\n3. **Modern Workaround**: حالياً يتم الاستفادة من (Web Workers) في الـ JavaScript لعمل مسارات معالجة خلفية (Background Threads) موازية لتعويض غياب الـ Isolates.",
      analogy: "زي مدير شركة (Main Thread).. في الموبايل، المدير بيأجر مبنى تاني لعمال الداتا (Isolates). لكن في الويب القديم، المدير كان مضطر يشغل عمال الداتا دول معاه في نفس الأوضة فالدنيا كانت بتزحتم وتوقف. الويب الحديث وفر (Web Workers) كأنها خيمة جنب الأوضة نقدر نحط فيها العمال دي.",
      keyPoints: [
        "Dart Isolates do not translate 1:1 to browser JS",
        "Browsers use single-threaded JS by default",
        "Web Workers provide true background execution in JS",
        "Avoid heavy JSON parsing directly on the Web UI thread"
      ],
      codeExample: {
        language: "dart",
        code: `// في تطبيقات फلاتر ويب المعقدة جداً، قد تضطر لاستخدام حزمة مثل 'flutter_web_plugins' 
// أو التعامل مباشرة مع الـ JS Interop لاستخدام الـ Web Workers لمعالجة ملفات ميديا ضخمة 
// بالبراوزر بدون تجميد الشاشة. 

// استخدم الـ compute أو Isolate.run() بشكل طبيعي في كودك الموحد،
// فلاتر سيحاول محاكاتها أو استخدام Web Workers متى أمكنه ذلك مستقبلاً.
Future<List<Data>> parseData(String json) async {
  // فلاتر الموبايل هيعمل Isolate بجد، فلاتر ويب (تباعاً للتحديثات) بيحققها كأنها Promise 
  // أو بيفردها على الـ Event Loop، فتظل ثقيلة نسبياً على الويب.
  return await Isolate.run(() => heavyJsonParsing(json));
}`
      }
    },
    questions: [
      {
        type: "Architecture & Platform differences",
        question: "Is 'compute()' running truly in parallel when your Flutter app is compiled to the Web?",
        questionAr: "هل تعمل دالة 'compute()' بالتوازي الحقيقي (Parallel) عندما يتم تصدير تطبيقك للويب؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "تاريخياً (وقبل دعم الـ WebAssembly و الـ JS interop العميق): **لا**.",
            "الجافاسكريبت Single-threaded بطبيعته، لذا كان פلاتر ينفذ الـ compute على نفس الـ Main Thread الخاص بالشاشة مما يسبب تعليقاً في الـ UI.",
            "أو إذا كنت تستهدف WebAssembly (Wasm) الجديد الذي أصبح פلاتر يدعمه، فإن الأمور تتجه لدعم الـ Multithreading الحقيقي في الويب قريباً."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["اختبار عمق فهمك لبيئة عمل פلاتر، وكيف يترجم كود الـ Dart لبيئات التشغيل المختلفة (Native ARM vs JS)."],
      redFlags: ["الاعتقاد بأن الجافاسكريبت تدعم الـ Threads بالشكل التقليدي."],
      greenFlags: ["ذكر الـ Web Workers و الـ Wasm (WebAssembly) ومستقبل فلاتر مع الويب."]
    },
    linkedCards: {
      prerequisites: ["dart-isolates-event-loop"],
      nextSteps: [],
      related: ["flutter-web-rendering"] // Suggesting a future Web deep dive card
    },
    commonPitfalls: [
      {
        mistake: "توقع أداء مطابق تماماً بين تطبيق الموبايل ותطبيق الويب في العمليات الحسابية الضخمة لمجرد استخدام الـ Isolates.",
        whyWrong: "تترجم الـ Isolates لشيء مختلف في الـ JS، وقد تكون أبطأ أو تسبب تجميداً غير متوقع في الويب.",
        correctApproach: "تحويل الحسابات الضخمة المعقدة ببيئة الويب للسيرفر (Backend) أو كتابة Custom Web Workers بلغة JS وربطها بالدارت إذا استلزم الأمر."
      }
    ],
    answerStrategy: {
      structure: ["توضيح أن الـ Isolates قوة للنيتف.", "الإشارة لضعف الجافاسكريبت المبني على Thread واحد.", "كيف يعالج الويب ذلك بالـ Web Workers واعداً بالـ Wasm."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["Single-threaded JS", "Web Workers", "WebAssembly (Wasm)", "compute on Web"]
    },
    quickRevision: {
      bulletPoints: ["في الموبايل: Isolates بتشتغل صح في خلفية التطبيق.", "في الويب: الـ JavaScript مش بتفهم Isolates، وبتعتمد على حاجة اسمها Web Workers.", "استخدام \`compute\` زمان في الويب كان بيعلق الشاشة لأنه بيمشي في الـ Main Thread."],
      memoryHook: "Isolates للويب = عمالة وهمية محتاجة نظام جديد (Web Workers).",
      cheatSheet: "دائماً لو بتعمل ابلكيشن Web فيه حسابات رياضية قوية جداً، استخدم لغة Backend ترميلها الداتا ترجعلك محسوبة بدل ما توقف المتصفح للمستخدم."
    },
    companyTags: ["Startups heavily reliant on Flutter Web", "Tech giants"],
    egyptianMarket: { popularity: "Low", salaryImpact: "High" }
  },

  // CARD 110
  {
    id: "flutter-linting-formatting",
    number: 110,
    title: "Linting & Code Formatting",
    titleAr: "جودة وتنسيق الكود (Lints & Format)",
    level: "Junior",
    frequency: "Must Know",
    tags: ["Best Practices", "Clean Code", "Tools"],
    definition: {
      summary: "هي مجموعة القواعد (Rules) والأدوات التي تُجبر فريق العمل كله على كتابة كود دارت بنفس الشكل المنظم وبدون أخطاء خفية (Bad Practices).",
      detailed: "1. **Dart Format (`dart format`)**: أداة تقوم بإعادة ترتيب الكود والمسافات والإزاحات فورياً ليصبح مقروءاً وموحداً للجميع، بشرط واحد: (أن تضع فواصل ',' بنهاية المتغيرات).\n2. **Linting (`analysis_options.yaml`)**: ملف يشبه الدستور للمشروع. يقرؤه الـ Dart Analyzer ليضع لك (خطوط زرقاء أو حمراء) لو خرقت قاعدة. (مثال: استخدام var بدلاً من النمط الصريح إذا أردت منعه).\n3. **flutter_lints**: حزمة تُضاف افتراضياً لأي مشروع פلاتر جديد، تضع القواعد الرسمية التي ينصح بها الفريق لمنع الأخطاء الشائعة (مثل تجاهل הـ await، أو استخدام const).",
      analogy: "زي مريلة المدرسة وقوانين المعلم.. الـ Formatting هو مريلة المدرسة (شكلنا كلنا واحد ومفيش كود شكله يوجع العين).. والـ Linting هو قوانين المعلم (ممنوع تتأخر، ممنوع تتكلم وإنت بتكتب)، بيضربك بالقلم على إيدك (خط أزرق) لما تغلط.",
      keyPoints: [
        "Trailing commas are magic for formatting",
        "analysis_options.yaml defines custom rules",
        "flutter_lints provides community standards",
        "Linter helps catch bugs before compiling"
      ],
      codeExample: {
        language: "yaml",
        code: `# === شكل ملف analysis_options.yaml ===
include: package:flutter_lints/flutter.yaml

linter:
  rules:
    # نقدر نفتح أو نقفل قواعد معينة من هنا
    prefer_const_constructors: true
    avoid_print: true
    prefer_final_locals: true # يجبرك تخلي أي متغير مش بيتغير final
    always_specify_types: false`
      }
    },
    questions: [
      {
        type: "Teamwork & Clean Code",
        question: "Why does \`dart format\` sometimes put everything on a single long line, and other times correctly breaks it down into multiple lines?",
        questionAr: "لماذا تقوم أداة الـ format أحياناً بوضع الـ widgets في سطر واحد طويل، وأحياناً تفصلهم لعدة أسطر منظمة؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "السر يكمن في وجود **الفاصلة (Trailing Comma)**.",
            "الـ Formatter مبرمج على أنه إذا وجد فاصلة \`,\` بعد آخر عنصر، فإنه يعتبرها إشارة قوية (Hint) ليقوم بفرد الكود على أسطر متعددة بشكل شجري مريح للعين.",
            "بدون الفاصلة، يحاول الـ Formatter عصر الكود في سطر واحد قدر الإمكان (حتى حد طول السطر الأقصى)."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تحديد ما إذا كنت تعمل بعقلية 'العمل تيم'، أم أنك مبرمج مستقل يكتب كوداً لا يستطيع أحد قراءته."],
      redFlags: ["الاعتراف بإغلاق القواعد المهمة في הـ linter فقط لتجنب الخطوط الزرقاء، بدلاً من إصلاح الكود المكتوب.", "تسليم (PR) إلى جيت هاب وكود غير منسق إطلاقاً."],
      greenFlags: ["معرفة الفرق بين הـ Linter والـ Formatter. الإشارة لحزم صارمة مثل \`very_good_analysis\`."]
    },
    linkedCards: {
      prerequisites: [],
      nextSteps: [{ id: "flutter-clean-architecture", title: "Clean Architecture" }], // Because clean logic applies here
      related: ["flutter-ci-cd-actions"] // usually run in CI
    },
    commonPitfalls: [
      {
        mistake: "تجاهل الـ Warnings الزرقاء وعدم حلها قبل عملية الرفع (Push).",
        whyWrong: "هذه التحذيرات (Lints) تُنبهك لأشياء مثل: استخدام context بشكل غير استرشادي، أو عدم استخدام \`const\` مما يثقل أداء الرسم، تجاهلها يراكم الـ Technical Debt.",
        correctApproach: "الالتزام بحل 100% من الـ Lints قبل إقفال הـ Ticket الخاص بك، أو استخدام CI/CD لإلغاء الرفع إذا فشل فحص الـ lint."
      }
    ],
    answerStrategy: {
      structure: ["وصف الـ Format كترتيب بصري (Trailing Commas!).", "وصف الـ Lints كقواعد صارمة تمنع أخطاء الأداء.", "ذكر ملف \`analysis_options.yaml\` كمقر لهذه القوانين."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["analysis_options", "Trailing commas", "Technical Debt", "Consistent codebase"]
    },
    quickRevision: {
      bulletPoints: ["Linting: بيمنع الأخطاء زي (avoid_print, prefer_const).", "Formatting: بيرتب الكود بتاعك بظغطة لزر (عشان التيم يرتاح).", "المفتاح السحري لترتيب الويدجتس في فلاتر: حط فاصلة (,) في نهاية القوس.", "الملف المتحكم: \`analysis_options.yaml\`."],
      memoryHook: "Linting ديكتاتورية القواعد، Formatting تناسق الديكور.",
      cheatSheet: "دائماً اربط سؤال الـ Linting بالـ CI/CD، وقول إنك بتخلي جيت هاب يرفض أي التزام (Commit) لو فيه Lint error لتحصين المشروع من الإهمال."
    },
    companyTags: ["Any Software Team (Mandatory requirement)"],
    egyptianMarket: { popularity: "Crucial", salaryImpact: "Moderate" }
  },

  // CARD 111
  {
    id: "flutter-clean-architecture",
    number: 111,
    title: "Clean Architecture in Flutter",
    titleAr: "البنية النظيفة (Clean Architecture)",
    level: "Senior",
    frequency: "Crucial",
    tags: ["Architecture", "System Design", "Testing"],
    definition: {
      summary: "هي طريقة لتقسيم الكود إلى طبقات (Layers) مستقلة تماماً عن بعضها. الهدف الأساسي هو فصل واجهة المستخدم (UI) وقواعد البيانات (Data) عن المنطق الأساسي للتطبيق (Domain/Business Logic).",
      detailed: "1. **Presentation Layer**: تحتوي على الـ UI (Widgets) وإدارة الحالة (Bloc/Riverpod). لا تعرف شيئاً عن الإنترنت أو قواعد البيانات.\n2. **Domain Layer**: الطبقة الأهم والمرتبطة بمجال البزنس (الكيانات Entities، حالات الاستخدام UseCases، والواجهات Repositories Interfaces). مكتوبة بـ Dart صافي بدون أي علاقة بـ فلاتر.\n3. **Data Layer**: مخصصة لجلب البيانات (APIs, SQLite) وتحويلها (Models). تعتمد على الـ Domain وتنفذ واجهاتها.",
      analogy: "زي المطعم الكبير.. الـ Presentation هو الجرسون (بياخد الطلب ويسلم الأكل للطاولة). الـ Domain هو الشيف (بيعرف إزاي يطبخ الوصفة السرية). الـ Data هو متعهد التموين (بيجيب اللحمة من الجزار أو الخضار من السوق). الشيف ملوش دعوة الخضار جه منين، المهم يسلمه للجرسون.",
      keyPoints: [
        "Separation of Concerns (SoC)",
        "Domain Layer is the core and depends on nothing",
        "Presentation and Data depend on Domain (Dependency Rule)",
        "Highly testable and scalable"
      ],
      codeExample: {
        language: "dart",
        code: `// === Domain Layer (Core Logic - No Flutter Imports) ===
class User {
  final String name;
  User(this.name);
}

abstract class UserRepository {
  Future<User> getUser(int id);
}

class GetUserUseCase {
  final UserRepository repository;
  GetUserUseCase(this.repository);

  Future<User> execute(int id) => repository.getUser(id);
}

// === Data Layer (Implementation) ===
class UserRepositoryImpl implements UserRepository {
  final ApiClient api;
  UserRepositoryImpl(this.api);

  @override
  Future<User> getUser(int id) async {
    final response = await api.fetch('/users/$id');
    return UserModel.fromJson(response); // UserModel extends User
  }
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "Why does the Domain layer contain Repository 'Interfaces' (abstract classes) while the Data layer contains the implementation?",
        questionAr: "لماذا تحتوي طبقة הـ Domain على الـ (Interfaces) الخاصة بالـ Repository، بينما توجد الـ (Implementation) في طبقة הـ Data؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لتطبيق مبدأ انعكاس الاعتمادية (Dependency Inversion Principle - SOLID).",
            "طبقة הـ Domain هي المركز (Core) ويجب ألا تعتمد على أي مكتبة خارجية. بوضع الواجهة (Interface) فيها، نحن نجبر طبقة הـ Data أن تأتي وتنفذ شروط الشيف (الـ Domain) بدلاً من أن يضطر الشيف لانتظار المورد.",
            "هذا يسمح بتغيير قاعدة البيانات (من Firebase إلى MySQL مثلاً) في طبقة הـ Data دون تغيير حرف واحد في المنطق (Domain)."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["التأكد أنك لست مجرد 'كاتب UI' (UI Developer)، بل 'مهندس برمجيات' قادر على بناء تطبيق لا ينهار عند تغيير مكتبات الـ API."],
      redFlags: ["كتابة 호출 API (http.get) داخل الـ UI أو داخل הـ Bloc مباشرة.", "استدعاء مكتبة \`flutter/material.dart\` داخل طبقة הـ Domain المشتركة للمنطق."],
      greenFlags: ["ذكر الـ SOLID Principles (خاصة D - Dependency Inversion). الإشارة لـ ResoCoder كمرجع شهير."]
    },
    linkedCards: {
      prerequisites: ["flutter-repository-pattern", "solid-principles-in-dart"], // Future cards or existing
      nextSteps: [{ id: "flutter-dependency-injection", title: "Dependency Injection (DI)" }],
      related: ["state-management-comparison"]
    },
    commonPitfalls: [
      {
        mistake: "تعقيد التطبيقات الصغيرة (Over-engineering).",
        whyWrong: "تطبيق Clean Architecture على برنامج بسيط مثل 'To-Do List' أو شاشة واحدة سيتطلب إنشاء 10 مجلدات وملفات Interfaces لعملية واحدة، مما يشتت الجهد بلا فائدة.",
        correctApproach: "استخدام Clean Architecture في المشاريع الكبيرة ذات فرق العمل المتعددة (Enterprise Apps) والتي تحتاج لـ Unit Tests مكثفة."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الطبقات الثلاث (Presentation, Domain, Data).", "شرح قاعدة التبعية (Dependency Rule)، كل الأسهم تشير للـ Domain.", "تفسير متى نستخدمها (التطبيقات المعقدة)."],
      timeAllocation: { junior: "1.5 دق", mid: "2 دق", senior: "2.5 دق" },
      keyPhrases: ["Dependency Inversion", "Domain is independent", "Separation of concerns", "Highly testable"]
    },
    quickRevision: {
      bulletPoints: ["Clean Arch: كود متقسم 3 طبقات.", "Presentation: شكل الشاشات.", "Domain: المخ والمحتوى الأصلي.", "Data: منجم الداتا من النت أو الموبايل.", "ممنوع الـ Domain يشوف الـ Data.. العكس هو اللي بيحصل."],
      memoryHook: "الـ Domain هو اللواء اللي بيدي الأوامر (Interfaces)، والـ Data هو العسكري اللي بينفذ.",
      cheatSheet: "دائماً الانترفيور بيسأل 'مين بيعتمد على مين؟' إجابتك الصارمة: Presentation و Data بيعتمدوا على Domain. الـ Domain لا يعتمد على أحد."
    },
    companyTags: ["Any Enterprise/FinTech", "Fawry", "Instabug", "Squadio"],
    egyptianMarket: { popularity: "Crucial", salaryImpact: "High" }
  },

  // CARD 112
  {
    id: "flutter-dependency-injection",
    number: 112,
    title: "Dependency Injection (DI) & get_it",
    titleAr: "حقن الاعتمادية (Dependency Injection)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Architecture", "Design Patterns", "State Management"],
    definition: {
      summary: "هو نمط برمجي (Design Pattern) يهدف إلى تمرير الكائنات (Objects) التي يحتاجها الكلاس من الخارج بدلاً من إنشائها بداخل الكلاس نفسه. وهو أساسي لكتابة كود سهل الاختبار (Testable).",
      detailed: "1. **The Problem**: إذا كان كلاس \`UserBloc\` ينشئ \`ApiRepository()\` داخله، فلن تتمكن من وضع 'بيانات وهمية' (Mock) لاختباره.\n2. **The Solution (DI)**: نجعل الـ \`UserBloc\` يطلب הـ \`ApiRepository\` في الكونستراكتور (Constructor). من ينشئ الـ Bloc هو من 'يحقن' الـ Repository داخله.\n3. **Service Locators (get_it)**: هي مكتبة شهيرة في فلاتر تعمل كسجل (Registry) مركزي. تسجل فيها كل الـ Repositories والـ Blocs مرة واحدة (غالباً عند تشغيل التطبيق)، وتستدعيها من أي مكان بحرية.",
      analogy: "زي لما تقعد في كافيه متقدرش تعمل الشاي بتاعك بنفسك جوه الكافيه (Tight Coupling). إنت بتطلب الشاي (Dependency)، والويتر بيحقنهولك على الطرابيزة جاهز (Injection). لو طلبت شاي دايت (Mock)، هيجيبلك دايت من غير ما تغير طريقتك في الشرب.",
      keyPoints: [
        "Constructor Injection is the most common type",
        "Decouples object creation from object usage",
        "Crucial for Unit Testing and Mocking",
        "get_it is a Service Locator, often used to simulate DI"
      ],
      codeExample: {
        language: "dart",
        code: `// === الطريقة الخاطئة (بدون حقن) ===
class LoginBloc {
  // الكلاس معتمد بقوة على هذا الـ API القوي ولن تستطيع تغييره في التيست
  final api = ApiClient(); 
}

// === الطريقة الصحيحة (Constructor Injection) ===
class LoginBloc {
  final ApiClient api;
  // الـ api بيتحقن من بره
  LoginBloc(this.api); 
}

// === استخدام مكتبة get_it ===
final getIt = GetIt.instance;

void setup() {
  // بنحفظ نسخة واحدة (Singleton) في الميموري
  getIt.registerLazySingleton<ApiClient>(() => ApiClient());
  // بنحفظ الـ Bloc وبنحقن جواه הـ Api 
  getIt.registerFactory<LoginBloc>(() => LoginBloc(getIt<ApiClient>()));
}

// في الـ UI:
final bloc = getIt<LoginBloc>();`
      }
    },
    questions: [
      {
        type: "Architecture & Tools",
        question: "What is the difference between an actual Dependency Injector and a Service Locator (like get_it)?",
        questionAr: "ما هو الفرق بين حقن الاعتمادية الحقيقي (DI) وبين محدد الخدمات (Service Locator) مثل مكتبة get_it؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "**المبدأ**: كلاهما يهدفان لتقليل الارتباط (Decoupling) وتسهيل الاختبار.",
            "**DI الحقيقي**: الكلاس لا يعلم عن مصدر مجيئ الكائن. يتم حقنه مباشرة من الإطار العمل (Framework) عبر الـ Constructor.",
            "**Service Locator (get_it)**: الكلاس يقوم بـ 'طلب' (Request) الكائن من السجل المركزي (الـ Locator) صراحة \`GetIt.I.get<String>()\`. فهو يخفي دورة حياة الكائن لكنه يجعل الكلاس يعتمد على الـ Locator نفسه."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["إذا سُئلت عن הـ DI، فهم لا يريدونك أن تشرح \`get_it\` كأنها الكلمة المرادفة الوحيدة. يريدونك أن تفهم المبدأ الفعلي (Constructor Injection) الذي يُسهل الـ Mocking."],
      redFlags: ["كتابة الكود بحيث كل كلاس يقوم بعمل \`new Repository()\` أو \`Repository()\` داخل دواله."],
      greenFlags: ["ذكر أن فلاتر نفسه يستخدم الـ DI عبر (InheritedWidget / Provider) لتوصيل الـ Dependencies للشاشات."]
    },
    linkedCards: {
      prerequisites: ["flutter-clean-architecture"],
      nextSteps: [{ id: "solid-principles-in-dart", title: "SOLID Principles" }],
      related: ["flutter-singleton-pattern"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام الـ Get_it للوصول لكل الكائنات واستدعائه في كل سطر في كل كلاس.",
        whyWrong: "هذا يعيد بناء مشكلة (Global Variables) مما يجعل من الصعب تتبع من يستخدم ماذا (Hidden Dependencies).",
        correctApproach: "استخدام get_it فقط لـ 'حقن' الكائنات (Injection) من الخارج (في شجرة الـ UI أو عبر الكونستراكتور)."
      }
    ],
    answerStrategy: {
      structure: ["تعريف הـ DI كمفهوم (الحقن عبر الكونستراكتور).", "الهدف الأساسي (سهولة الاختبار وتغيير الـ Implementation).", "كيف يطبق عملياً في فلاتر (get_it أو Provider)."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "2 دق" },
      keyPhrases: ["Constructor Injection", "Decoupling objects", "Mocking for tests", "Service Locator"]
    },
    quickRevision: {
      bulletPoints: ["الـ DI: متخلقش الكائن جوه، استلمه من بره.", "الهدف: عشان لما أحب أجرب الكود، أقدر أبعت نسخه وهمية (Mock).", "get_it: دولاب كبير بنعلق فيه الكائنات في بداية التطبيق عشان نسحبها من أي شاشة بسهولة."],
      memoryHook: "DI = السيرنجة (الحقنة) اللي بندي بيها الأوامر للكلاس من بره.",
      cheatSheet: "دائماً اربط הـ Dependency Injection بـ مصطلح (Unit Testing) لأن لولاه مستحيل تعمل Test محترم للكود بتاعك."
    },
    companyTags: ["Any Startup", "Companies using Riverpod/Bloc"],
    egyptianMarket: { popularity: "Crucial", salaryImpact: "High" }
  },

  // CARD 113
  {
    id: "flutter-singleton-pattern",
    number: 113,
    title: "Singleton Pattern in Dart",
    titleAr: "نمط النسخة الواحدة (Singleton)",
    level: "Mid",
    frequency: "Frequent",
    tags: ["Design Patterns", "Core Concepts"],
    definition: {
      summary: "هو نمط تصميم (Design Pattern) يضمن أن كلاس معين له نسخة واحدة فقط (One Instance) تعيش في الذاكرة (Memory) طوال فترة تشغيل التطبيق.",
      detailed: "1. **Creation**: يُبنى السنجلتون عن طريق جعل الـ Constructor خاصاً (Private) જેથી لا يقدر أحد على إنشاء نسخة جديدة من الخارج.\n2. **Access**: نوفر متغير ثابت (static) يصل من خلاله الجميع لنفس النسخة.\n3. **Usage**: يُستخدم عادة مع الكائنات التي تُعتبر 'مكلفة' في الإنشاء، أو التي نحتاج مشاركة بياناتها في כל أنحاء التطبيق، مثل (مدير قواعد البيانات، إعدادات المستخدم SharedPreferences، أو API Service).",
      analogy: "السنجلتون زي (الملك) في الدولة. مستحيل يكون فيه غير ملك واحد بس. أي حد في الدولة محتاج أمر، بيروح لنفس الملك في القصر. لو قفلنا الباب وفتحناه (استدعينا الكلاس 100 مرة)، هو نفس الملك مفيش غيره قاعد على الكرسي.",
      keyPoints: [
        "Restricts instantiation to exactly one object",
        "Private constructor and a static instance",
        "Shared state across the application",
        "Considered an anti-pattern by some (difficult to test)"
      ],
      codeExample: {
        language: "dart",
        code: `class DatabaseManager {
  // 1. المتغير الثابت اللي هيشيل النسخة الوحيدة
  static final DatabaseManager _instance = DatabaseManager._internal();

  // 2. الـ Constructor السري (Private) يمنع خلق نسخ من الخارج
  DatabaseManager._internal() {
    print("Database Initialized!");
  }

  // 3. طريقة الوصول للمتغير.. ممكنប្រើ Factory constructor للسهولة
  factory DatabaseManager() {
    return _instance;
  }

  void query() {
    print("Executing query...");
  }
}

void main() {
  // كلاهما يشير لنفس الكائن في الذاكرة!
  var db1 = DatabaseManager();
  var db2 = DatabaseManager();
  
  print(identical(db1, db2)); // يطبع: true
}`
      }
    },
    questions: [
      {
        type: "Concept & Best Practices",
        question: "Why do some developers consider the Singleton pattern an 'Anti-pattern'?",
        questionAr: "لماذا يعتبر بعض المطورين نمط الـ Singleton 'نمطاً سيئاً' (Anti-pattern) يجب تجنبه؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "1. **صعوبة الاختبار (Testing)**: السنجلتون يحتفظ بالحالة (State) بين الـ tests. إجراء اختبار ثاني قد يفشل لأن الاختبار الأول عدّل في السنجلتون.",
            "2. **الاعتمادية المخفية (Hidden Dependencies)**: الكلاسات تعتمد على السنجلتون بشكل مخفي داخل الكود، وليس كـ Parameters واضحة.",
            "3. الحل البديل والأفضل هو الاعتماد على הـ Dependency Injection وتمرير السنجلتون عبر الـ Constructor."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة ما إذا كنت تعرف كيفية برمجة السنجلتون بالدارت (باستخدام factory والـ private constructor)، وكيف تتجنب شروره وتوابعه."],
      redFlags: ["كتابة كود السنجلتون بطريقة الـ Java القديمة (بدون استخدام الـ factory keyword اللي بتوفرها Dart).", "استخدامه لحمل كل المتغيرات العشوائية في التطبيق."],
      greenFlags: ["ذكر أن مكتبة \`get_it\` تقوم بدور فعال كسجل مركزي (Service Locator) يُغني عن كتابة Singleton لكل كلاس يدوياً."]
    },
    linkedCards: {
      prerequisites: ["dart-factory-constructors"],
      nextSteps: [{ id: "flutter-dependency-injection", title: "Dependency Injection" }],
      related: ["dart-static-vs-final"] // Due to similar variable scopes
    },
    commonPitfalls: [
      {
        mistake: "عمل Singleton للمتحكمات المرتبطة بالشاشة (Controllers).",
        whyWrong: "لأن الـ Singleton لا يموت أبدأ حتى يغلق التطبيق. إذا ربطته بشاشة (כـ LoginController)، فلن تُمسح بياناته للمستخدم الثاني، وسيظل يحتل الميموري للأبد.",
        correctApproach: "استخدام הסنجلتون حصراً للخدمات العامة كـ HttpClient أو الـ ThemeManager."
      }
    ],
    answerStrategy: {
      structure: ["شرح الهدف (التوفير في الذاكرة ومركزية البيانات).", "شرح الكود السريع (Private constructor + Static variable).", "ذكر التحذيرات وعيوبه (التيست)."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1 دق" },
      keyPhrases: ["One shared instance", "Private constructor", "Global state", "Hard to mock"]
    },
    quickRevision: {
      bulletPoints: ["الـ Singleton: كائن واحد ثابت طول ما الابلكيشن شغال.", "بنعمله בـ Constructor سري ونحفظ النسخة في static variable.", "ممتاز للـ SharedPrefs أو الـ Database.", "وحش جداً في عمل الـ Unit Testing لإنه مبيمسحش القديم."],
      memoryHook: "السنجلتون = الشمس. مفيش غير شمس واحدة بتنور للـ App كله.",
      cheatSheet: "دائماً الانترفيور بيسألك إزاي تعمله في دارت.. قولوا בستخدم الكلمة السحرية \`factory\` بترجع الـ \`_instance\`."
    },
    companyTags: ["Any Software House", "Robusta"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 114
  {
    id: "dart-factory-constructors",
    number: 114,
    title: "Factory Constructors",
    titleAr: "الكونستراكتور المصنع (Factory)",
    level: "Mid",
    frequency: "Frequent",
    tags: ["Dart", "Core Concepts", "Design Patterns"],
    definition: {
      summary: "علامة (Keyword) في دارت توضع قبل הـ Constructor وتعطيه قدرة استثنائية: 'أنه ليس مجبراً على خلق كائن جديد (New Instance)' في كل مرة يتم استدعاؤه.",
      detailed: "1. **Normal Constructor**: عند استدعائه، يضمن مئات الأسطر في خلفية دارت أن يتم حجز مكان جديد في الميموري وبناء කائن جديد.\n2. **Factory**: يستطيع إرجاع كائن قديم مخزن في كاش (Cache/Singleton)، أو يمكنه أن يتخذ معطيات ويدرسها، ثم يقرر إرجاع كائن من כلاس آخر موروث (Subclass).\n3. **Use Case**: يستخدم بشدة في توليد الكائنات من الـ JSON (\`fromJson\`) لأننا نبني المنطق قبل حقن القيم.",
      analogy: "الـ Constructor العادي عامل زي لما تروح لنجار وتدفع فلوس عشان تفصل كرسي חדيد. الـ Factory Constructor زي مدير معرض الموبيليا، بتطلب منه كرسي، ممكن يديك كرسي من المخزن (Singleton)، وممكن يقول دا جاهز اهو ويديك نوع تاني أحسن (Subclass)، وممكن يصنعه من الأول (Normal). هو المتحكم.",
      keyPoints: [
        "Can return an existing instance (Cache/Singleton)",
        "Can return a subclass of the current class",
        "Must explicitly use the `return` keyword",
        "Doesn't have access to `this` before returning"
      ],
      codeExample: {
        language: "dart",
        code: `// === 1. Factory للتحكم في الكاش (Singleton) ===
class Logger {
  static final Map<String, Logger> _cache = {};
  final String name;

  // المصنع: هيشوف لو موجود هيرجعه، لو مش موجود هيصنعه ويسجله
  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name]!;
    } else {
      final logger = Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  Logger._internal(this.name);
}

// === 2. Factory لإرجاع Subclasses (Polymorphism) ===
abstract class Shape {
  // المصنع بيقرر يرجع أني شكل بناءً على التايب
  factory Shape(String type) {
    if (type == 'circle') return Circle();
    if (type == 'square') return Square();
    throw 'Unknown shape';
  }
}
class Circle implements Shape {}
class Square implements Shape {}`
      }
    },
    questions: [
      {
        type: "Language Feature",
        question: "Why do we typically use \`factory\` for parsing JSON (e.g., \`User.fromJson\`) instead of a normal named constructor?",
        questionAr: "لماذا نستخدم العادة \`factory User.fromJson()\` لمعالجة بيانات الـ JSON بدلاً من الكونستراكتور المسمى (Named Constructor) العادي؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "في الكونستراكتور العادي يجب أن تُسند جميع قيم الـ \`final\` في مرحلة التهيئة (Initializer list \`:\`). وهذا صعب جداً إن كنت تريد إجراء حسابات أو دوال تفقدية (null checks) على הـ JSON قبل تعيينها.",
            "الـ \`factory\` يسمح لك بإنشاء متغيرات وسيطة (Local variables)، وعمل شروط، بل وحتى إرجاع كائنات مجانية مخزنة في الداخل قبل كشفها للخارج، مما يعطيك مرونة كاملة في بناء الكائن."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تحديد ما إذا كنت تفهم إمكانيات دارت العميقة أم أنك تعتمد الـ Generation التلقائي للـ JSON فقط بدون فهم ما يُكتب تحت الغطاء."],
      redFlags: ["الاعتقاد بأن الـ Factory هو مجرد شكل تاني للـ Named Constructor بدون معرفة شرط الـ \`return\`."],
      greenFlags: ["ذكر أمثلة واضحة كالسنجلتون، أو إرجاع \`Subclasses\` لتمثيل استجابات الـ API المختلفة (Success vs Error)."]
    },
    linkedCards: {
      prerequisites: ["dart-oop-concepts"],
      nextSteps: [{ id: "flutter-singleton-pattern", title: "Singleton Pattern" }],
      related: ["json-serialization"] // Future topic potentially
    },
    commonPitfalls: [
      {
        mistake: "محاولة استخدام \`this\` داخل الـ Factory constructor.",
        whyWrong: "على عكس الكونستراكتور العادي، הـ Factory يشبه دالة \`static\`. الكائن لم يُصنع بعد فلا يوجد \`this\` لكي تشير إليه.",
        correctApproach: "استخدام الـ Factory للتحقق من الشروط، ثم استدعاء كونستراكتور عادي (مخفي Private غالباً) لإخراج الكائن وـ \`return\`."
      }
    ],
    answerStrategy: {
      structure: ["تعريف الـ Factory وشرطه الأساسي (return).", "أهم استخدامين (الكاش أو السنجلتون / وإرجاع كلاس فرعي بناء على شرط).", "علاقته القوية بالـ fromJson."],
      timeAllocation: { junior: "1.5 دق", mid: "1 دق", senior: "1 دق" },
      keyPhrases: ["Explicit return", "Returning subclasses", "Caching instances", "fromJson parsing"]
    },
    quickRevision: {
      bulletPoints: ["الفاكتوري بيسمح للو كونستراكتور يرجع قيمة (Return) وده مستحيل في العادي.", "ميقدرش يشوف كلمة \`this\` جواه.", "استخدامه الأشهر: \`fromJson\` وعمل الـ Singleton.", "ممكن تطلب Object أب، والكلمة دي ترجعلك Object ابن بناء على الداتا."],
      memoryHook: "فاكتوري = مدير المخزن. ممكن يديك حاجة مركونة وممكن يصنعلك من الصفر.",
      cheatSheet: "دائماً افتكر إن הـ Factory حله السحري هو التغلب على قيود הـ Initializer list الخاصة بالـ final variables."
    },
    companyTags: ["Any Software House requiring heavy dart background"],
    egyptianMarket: { popularity: "High", salaryImpact: "Moderate" }
  },

  // CARD 115
  {
    id: "flutter-repository-pattern",
    number: 115,
    title: "Repository Pattern",
    titleAr: "نمط المستودع (Repository)",
    level: "Mid",
    frequency: "Must Know",
    tags: ["Architecture", "Design Patterns", "Clean Code"],
    definition: {
      summary: "هو نمط برمجي يوفر واجهة موحدة (Single Source of Truth) لإدارة البيانات. يعزل الـ UI عن معرفة أي شيء حول مصدر هذه البيانات (هل جاءت من الإنترنت أم من الذاكرة المحلية؟).",
      detailed: "1. **The Core Job**: يقوم הـ Repository بإخفاء التعقيد. الشاشة تطلب منه البيانات، وهو يقرر داخلياً: هل يجلبها من الـ API؟ أم أن الهاتف غير متصل فسيجلبها من الـ SQLite / Hive؟\n2. **Separation**: الـ Bloc/ViewModel يتصل بالـ Repository فقط، ولا يتصل أبداً بـ ApiClient أو DatabaseClient مباشرة.\n3. **Interface-Driven**: يتم تحديده عبر Abstract Class، مما يُسهل تغييره لاحقاً بدون التأثير على منطق التطبيق.",
      analogy: "الريبو (Repository) زي أمين المخزن. مسؤول המبيعات (الشاشة) بيطلب منه 5 لابتوبات للزبون. المبيعات ملوش دعوة هل أمين المخزن جاب اللابتوبات دي من المخزن اللي ورا المحل (Local Database)، ولا عمل تليفون وطلبهم من المورد في الصين (Remote API). المهم اللابتوبات توصل.",
      keyPoints: [
        "Single Source of Truth for data",
        "Abstracts away Data Sources (Remote vs Local)",
        "Isolates the UI/Bloc from data fetching logic",
        "Makes offline-first capabilities easy to implement"
      ],
      codeExample: {
        language: "dart",
        code: `// 1. الواجهة الموحدة
abstract class ProductRepository {
  Future<List<Product>> getProducts();
}

// 2. التنفيذ הפعلي (Implementation)
class ProductRepositoryImpl implements ProductRepository {
  final ApiClient remoteApi;
  final LocalDb localDb;

  ProductRepositoryImpl(this.remoteApi, this.localDb);

  @override
  Future<List<Product>> getProducts() async {
    // المستودع هو من يقرر من أين يجلب البيانات
    if (await isInternetAvailable()) {
      final freshData = await remoteApi.fetchProducts();
      await localDb.cache(freshData); // حفظ للحالات القادمة
      return freshData;
    } else {
      // لو مفيش نت، بنجيب الكاش بدون علم الـ UI
      return await localDb.getProducts(); 
    }
  }
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "When should a Repository call multiple Data Sources (e.g., Remote and Local)?",
        questionAr: "متى يجب أن يتصل المستودع (Repository) بمصادر بيانات متعددة (مثل سيرفر وذاكرة محلية)؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "عند تنفيذ آلية الـ التخزين المؤقت (Caching) أو العمل بدون اتصال (Offline-first approach).",
            "يحدد הـ Repository الاستراتيجية المناسبة: مثلاً يجلب البيانات من الذاكرة المحلية فوراً (لأسباب السرعة)، ثم يستدعي الـ API في الخلفية، وإذا أتي الرد يحدّث הـ Local Database وينبه البرنامج."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تحديد ما إذا كنت تفهم الفروق בין הـ Repository والـ Data Source أم أنك تنشئهما لمجرد التقليد الأعمى."],
      redFlags: ["جعل הـ UI يقرر أين يتم حفظ البيانات ومتى يجلب من الإنترنت."],
      greenFlags: ["ذكر نمط (Offline-first) أو (Single Source of Truth) وارتباطه الوثيق بالـ Repository."]
    },
    linkedCards: {
      prerequisites: ["flutter-clean-architecture"],
      nextSteps: [{ id: "flutter-dependency-injection", title: "Dependency Injection" }],
      related: ["flutter-state-management"] // Bloc usually uses the repo
    },
    commonPitfalls: [
      {
        mistake: "إدخال كود تحويل البيانات (UI formatting) بداخل הـ Repository.",
        whyWrong: "الـ Repository مسؤوليته جلب البيانات وتغليفها في Models فقط. تحويل التاريخ إلى صيغة \"منذ 5 ساعات\" هو وظيفة הـ UI أو הـ ViewModel.",
        correctApproach: "الاحتفاظ بالـ Repository نظيفاً كقناة مياه تجلب الداتا خامة ومرتبة كـ Objects."
      }
    ],
    answerStrategy: {
      structure: ["وصف הـ Repository (وسيط يخفي مصدر البيانات).", "شرح المثال الوظيفي (تحديد الجلب من النت أم الكاش).", "أهميته (يفصل הـ UI عن الـ Data ويجعل التغيير سهل)."],
      timeAllocation: { junior: "1 دق", mid: "1.5 دق", senior: "1.5 دق" },
      keyPhrases: ["Single Source of Truth", "Data source abstraction", "Offline-first", "Caching strategy"]
    },
    quickRevision: {
      bulletPoints: ["الريبو: واجهة بتخفي وراها تفاصيل الداتا بتيجي منين.", "الـ Bloc بيكلم الريبو، والريبو يقرر يكلم نت ولا يكلم الداتا اللي متخزنة عالجهاز.", "ممتاز لعمل برامج شغالة Offline."],
      memoryHook: "الريبو = أمين المخزن اللي بيورد البضاعة ومتسألوش جابها إزاي.",
      cheatSheet: "دائماً اربط الـ Repository Pattern بميزة الـ (Offline Support)، دي الإجابة السحرية اللي بتثبت إنك فاهم لزمته."
    },
    companyTags: ["Instabug", "Swvl", "Any Clean Arch strict company"],
    egyptianMarket: { popularity: "Crucial", salaryImpact: "Moderate" }
  },
  {
    id: "116",
    title: "Bloc vs Riverpod vs Provider",
    titleAr: "الفرق بين Bloc و Riverpod و Provider",
    level: "8",
    category: "State Management Deep Dive",
    tags: ["State Management", "Bloc", "Riverpod", "Provider"],
    definition: {
      summary: "مقارنة بين أشهر مكتبات إدارة الحالة (State Management) في Flutter من حيث الأداء، التعقيد الوظيفي، والأسلوب المتبع.",
      detailed: "- **Provider**: أداة بسيطة تعتبر مجرد Wrapper فوق `InheritedWidget`. لا تقدم بنية (Architecture) صارمة، لكنها كافية للتطبيقات البسيطة والمتوسطة.\n- **Bloc/Cubit**: الأقوى في فصل الـ Logic عن الـ UI ويعتمد على الـ Streams والأحداث (Events). يفرض بنية صارمة جداً مما يجعله مثالياً للشركات الكبيرة.\n- **Riverpod**: البديل الحديث لـ Provider (من نفس المبتكر). يعالج عيوب Provider، لا يعتمد على الـ `BuildContext`، ويوفر أماناً ضد أخطاء الـ Runtime (Compile-safe).",
      analogy: "تخيل إنك بتفتح مطعم:\n- `Provider`: مطعم شعبي، الناس بتطلب من الكاشير واللي جاهز بيطلع، سريع وسهل.\n- `Bloc`: مصنع ضخم، كل طلب له ورقة رسمية (Event) بتدخل على سيستم دقيق وتطلع بنتيجة (State) واضحة جداً.\n- `Riverpod`: مطعم حديث سمارت، بيراقب طلباتك ولوحدها ومفيش مجال للغلط، وبيشتغل من أي مكان في المطعم.",
      keyPoints: [
        "Provider is simple but lacks forced architecture and relies heavily on BuildContext",
        "Bloc enforces strict unidirectional data flow and separates UI entirely",
        "Riverpod is Compile-safe, no BuildContext needed, handles async states elegantly"
      ],
      codeExample: {
        language: "dart",
        code: `// Riverpod Example
final counterProvider = StateProvider<int>((ref) => 0);

class CounterApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // No context needed to read the provider!
    final count = ref.watch(counterProvider);
    return Text(count.toString());
  }
}`
      }
    },
    questions: [
      {
        type: "Comparison",
        question: "Why would a team choose Riverpod over Provider?",
        questionAr: "لماذا قد يختار فريق العمل استخدام Riverpod بدلاً من Provider؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لأن Riverpod يكتشف الأخطاء أثناء كتابة الكود (Compile-time) بدلاً من وقت التشغيل (ProviderNotFoundException).",
            "لا يحتاج إلى BuildContext لقراءة الحالة، وهذا مفيد عند إدارة الحالة خارج الوجات.",
            "التعامل مع الـ Futures والـ Streams أسهل بكثير وفيه حالات جاهزة (Loading, Error, Data)."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على تحليل المتطلبات واختيار الأداة المناسبة، مش مجرد إنك متعصب لـ State Management معينة."],
      redFlags: ["القول بأن 'Bloc هو الأفضل دائماً' أو 'Provider سيء'. كل أداة لها استخدام."],
      greenFlags: ["ذكر مزايا التعقيد القليل في Provider مقابل البنية الصارمة في Bloc مقابل حداثة وأمان Riverpod."]
    },
    linkedCards: {
      prerequisites: ["flutter-state-management-basics"],
      nextSteps: [{ id: "117", title: "GetX Architecture Controversy" }],
      related: ["flutter-inherited-widget", "dart-streams"]
    },
    commonPitfalls: [
      {
        mistake: "كتابة منطق معقد بداخل الـ View باستخدام Provider.",
        whyWrong: "لأن Provider لا يجبرك على هيكلة الكود، فقد تقوم بإضافة Business Logic كامل داخل الـ build method.",
        correctApproach: "استخدام ChangeNotifier وفصل اللوجيك تماماً عن الوجات، أو الترقية لـ Bloc للمشاريع الأضخم."
      }
    ]
  },
  {
    id: "117",
    title: "The GetX Controversy",
    titleAr: "الجدل حول مكتبة GetX",
    level: "8",
    category: "State Management Deep Dive",
    tags: ["State Management", "GetX", "Architecture"],
    definition: {
      summary: "GetX هي حزمة (Package) شاملة توفر State Management و Dependency Injection و Route Management، وهي محط جدل كبير في مجتمع Flutter.",
      detailed: "مزايا GetX تتمثل في السهولة الشديدة واختصار الكود وعدم الحاجة للـ Context في التوجيه (Routing) أو إظهار الـ Dialogs. ولكن الجدل ينبع من كونها تحاول القيام بكل شيء بدلاً من أداء شيء واحد جيداً (Anti-Pattern)، وتقوم بتغيير سلوكيات Flutter الأساسية، مما يخلق ارتباطاً شديداً (Tight Coupling) بالحزمة، وهو خطر على صيانة التطبيقات الكبيرة.",
      analogy: "GetX زي 'عدة الكشافة' (السويسرية) اللي فيها سكينة ومفك وقصافة. سريعة وعملية لو طالع رحلة يوم واحد (تطبيق صغير). لكن لو بتبني بيت (تطبيق ضخم) هتحتاج أدوات احترافية منفصلة مخصصة لكل حاجة.",
      keyPoints: [
        "Offers State Management, Routing, and localizations in one package",
        "Highly debated due to creating an 'ecosystem within an ecosystem'",
        "Tight coupling: Hard to remove GetX from an app once you rely on it",
        "Breaks Flutter's widget tree constraints by omitting context"
      ],
      codeExample: {
        language: "dart",
        code: `// GetX State Management
var count = 0.obs;
void increment() => count++;

// GetX Routing (No Context)
Get.to(NextScreen());

// GetX Snackbar (No Context)
Get.snackbar('Hello', 'This is GetX');`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "Is GetX an anti-pattern? Why do some senior developers avoid it?",
        questionAr: "هل تعتبر GetX (نمطاً سيئاً - Anti-Pattern)؟ ولماذا يتجنبها بعض المطورين الكبار؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "نعم في بعض الجوانب، لأنها تنتهك مبدأ (Single Responsibility) عبر جمع كل شيء في حزمة واحدة.",
            "الاعتماد الكامل عليها يجعل التطبيق غير قابل للصيانة بسهولة (Tight Coupling).",
            "إخفاء الـ BuildContext يعتبر سحراً (Magic) قد يضر بفهم المطور لطريقة استضافة وجات Flutter الحقيقية."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["رؤية نضجك التقني وتقييمك المحايد للميزات مقابل العيوب (Trade-offs)."],
      redFlags: ["التعصب الأعمى لـ GetX أو الهجوم الشرس عليها دون فهم أسباب استخدامها."],
      greenFlags: ["إدراك أنها مثالية للـ MVPs والمشاريع الجانبية، لكنها محفوفة بالمخاطر للمشاريع المؤسسية الضخمة Enterprise."]
    },
    linkedCards: {
      prerequisites: ["116"],
      nextSteps: [{ id: "118", title: "Unit Testing Basics" }],
      related: ["flutter-routing", "flutter-dependency-injection"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام GetX في كل صغيرة وكبيرة في التطبيق.",
        whyWrong: "إذا توقف دعم مكتبة GetX، سيصبح تحديث التطبيق أو صيانته كابوساً لأن المكتبة متشعبة في الروابط، الحالة، والتنبيهات.",
        correctApproach: "إذا استخدمتها، حاول عزلها قدر الإمكان، أو استخدام حلول منفصلة وموثوقة (مثل GoRouter للروابط و Bloc للحالة)."
      }
    ]
  },
  {
    id: "118",
    title: "Unit Testing & Mocking",
    titleAr: "اختبار الوحدات والمحاكاة (Mocking)",
    level: "8",
    category: "Testing",
    tags: ["Testing", "Unit Test", "Mocking", "Mockito", "Mocktail"],
    definition: {
      summary: "اختبار الوحدات (Unit Testing) هو اختبار أصغر كود ممكن (وظيفة أو فئة) بشكل معزول تماماً عن باقي أجزاء النظام لضمان قيامه بالعمل المطلوب بشكل صحيح.",
      detailed: "في Flutter و Dart، نقوم باختبار الـ Logic (مثل الـ Repositories أو Bloc). ولأن هذه الأجزاء تعتمد على عوامل خارجية (مثل الـ API أو قواعد البيانات)، نستخدم تقنية (Mocking). المحاكاة (Mocking) هي استبدال النسخة الحقيقية بنسخة مزيفة يمكننا التحكم في مخرجاتها لاختبار الكود بمعزل عن الإنترنت الحقيقي (باستخدام حزم مثل Mockito أو Mocktail).",
      analogy: "تخيل إنك بتختبر أداء سائق في مدرسة قيادة. إنت بتجيبه في (ساحة مغلقة - سيارة محاكاة) مش بتنزله الطريق الحقيقي المفتوح، عشان تقيم أداؤه هو شخصياً (Unit)، وبتعمل (Mock) للمواقف الصعبة زي المطبات من غير ما تعرضه لخطر حقيقي.",
      keyPoints: [
        "Tests a single unit of work (Function, Class, Method) in isolation",
        "Fastest form of testing to execute",
        "Uses 'setUp' to initialize variables and 'tearDown' to clean up",
        "Vastly utilizes Mocking to fake Network APIs and Database returns"
      ],
      codeExample: {
        language: "dart",
        code: `// Using flutter_test and mocktail
class MockApiClient extends Mock implements ApiClient {}

void main() {
  late UserRepository repo;
  late MockApiClient mockApi;

  setUp(() {
    mockApi = MockApiClient();
    repo = UserRepository(mockApi);
  });

  test('fetchUser returns user when API call is successful', () async {
    // Arrange (Setup the mock)
    when(() => mockApi.get(any())).thenAnswer((_) async => {'id': 1, 'name': 'Ahmed'});

    // Act
    final user = await repo.fetchUser(1);

    // Assert
    expect(user.name, 'Ahmed');
    verify(() => mockApi.get('/users/1')).called(1);
  });
}`
      }
    },
    questions: [
      {
        type: "Testing",
        question: "Explain the AAA pattern in Unit Testing.",
        questionAr: "اشرح نمط AAA في اختبار الوحدات.",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "AAA stands for: Arrange, Act, Assert.",
            "Arrange (الترتيب): تجهيز المعطيات، المتغيرات، وتحديد مخرجات الـ Mocks.",
            "Act (الإجراء): استدعاء الدالة أو الفئة التي نريد اختبارها فعلياً.",
            "Assert (التأكيد): التحقق من أن النتيجة التي عادت من الإجراء تطابق النتيجة المتوقعة."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تأكيد فهمك لأهمية كتابة الكود بطريقة قابلة للاختبار (Testable Code) والاعتماد على الـ Dependency Injection لتسهيل الـ Mocking."],
      redFlags: ["كتابة Unit Test يعتمد على استدعاء API حقيقي من الإنترنت."],
      greenFlags: ["ذكر ترتيب AAA و فكرة الـ Code Coverage."]
    },
    linkedCards: {
      prerequisites: ["flutter-dependency-injection"],
      nextSteps: [{ id: "119", title: "Widget Testing" }],
      related: ["flutter-clean-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "نسيان إعادة التعيين (Reset) لحالة الـ Mocks بين كل اختيار وآخر.",
        whyWrong: "قد يؤدي لبقاء البيانات من الاختبار الأول والتأثير على نتيجة الاختبار الثاني (Flaky tests).",
        correctApproach: "استخدام الدالة `setUp` أو `tearDown` لتصفير وتنظيف الـ Mocks قبل كل اختبار `test()`."
      }
    ]
  },
  {
    id: "119",
    title: "Widget Testing",
    titleAr: "اختبار الـ Widgets في Flutter",
    level: "8",
    category: "Testing",
    tags: ["Testing", "Widget Test", "pumpWidget", "Finders"],
    definition: {
      summary: "هو نوع من الاختبارات في Flutter يبني ويختبر جزءاً من واجهة المستخدم (Widget) ويتفاعل معها (مثل الضغط أو التمرير) للتحقق من تكوينها وشكلها بشكل برمجي.",
      detailed: "يقف الـ Widget Test في المنتصف بين الـ Unit Test (السريع للوجيك) والـ Integration Test (البطيء للتطبيق الكامل). فهو يبني (Render) ويدجت واحدة أو شاشة في بيئة محاكاة ليسمح للمطور بالتحقق من ظهور نص معين، أو التأكد من أن زر 'Login' يظهر عندما تكون الحقول غير فارغة. يتم استخدام `WidgetTester` و دوال مثل `pump()` (لإعادة الرسم).",
      analogy: "تخيل إنك بتختبر (كشاف الإضاءة) لمسرحية. الـ Unit Test بيفك المحرك من جوه ويقيس الكهربا. الـ Widget test بيشغل الكشاف ويوجهه على زرار، ويتأكد إن الزرار ده مرئي فعلاً وإن نقرة الكشاف شغالة سليم، بس من غير ما تشغل المسرحية كلها (Integration).",
      keyPoints: [
        "Tests individual Widgets without running the full application",
        "Uses 'pumpWidget' to build the Widget",
        "Uses 'Finders' (find.text, find.byType) to locate elements in the UI",
        "Uses 'pumpAndSettle' to wait for animations to finish"
      ],
      codeExample: {
        language: "dart",
        code: `testWidgets('MyWidget has a title and a working button', (WidgetTester tester) async {
  // Build the widget
  await tester.pumpWidget(const MaterialApp(home: CounterScreen()));

  // Find elements
  final titleFinder = find.text('Count: 0');
  final buttonFinder = find.byIcon(Icons.add);

  // Assert initial state
  expect(titleFinder, findsOneWidget);

  // Tap button and trigger frame rebuild
  await tester.tap(buttonFinder);
  await tester.pump();

  // Assert final state
  expect(find.text('Count: 1'), findsOneWidget);
});`
      }
    },
    questions: [
      {
        type: "Testing",
        question: "What is the difference between tester.pump() and tester.pumpAndSettle()?",
        questionAr: "ما هو الفرق بين tester.pump() و tester.pumpAndSettle()؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "tester.pump(): يطلب من الفلاتر إعادة رسم الواجهة بـ Frame واحد جديد (مثالي بعد الضغط على زرار لتغيير رقم).",
            "tester.pumpAndSettle(): يعيد رسم الـ Frames متتالية حتى تنتهي جميع الإطارات (Animations) ولا يوجد شيء يتحرك في الشاشة للاستقرار."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة مهاراتك في التأكد من تماسك الواجهة (UI Integrity) وحل أخطاء الشاشات قبل الـ QA."],
      redFlags: ["استخدام pumpAndSettle مع انيميشن مستمر (Infinite Animation) زي الـ Loading Indicator، مما يؤدي לـ Timeout error."],
      greenFlags: ["استخدام Finders و Matchers بشكل دقيق."]
    },
    linkedCards: {
      prerequisites: ["118"],
      nextSteps: [{ id: "120", title: "Integration Testing" }],
      related: ["flutter-widgets-basics"]
    },
    commonPitfalls: [
      {
        mistake: "عدم تغليف الوجات الأساسية بـ MaterialApp و Scaffold عند اختبارها.",
        whyWrong: "لأن الوجات تحتاج إلى Ancestors زي MediaQuery, Directionality, والـ Theme. بدونهم ستحصل على (No Directionality widget found).",
        correctApproach: "استخدام pumpWidget وبناء MaterialApp بداخلها واختبار الودجت الخاص بك بداخل الـ home."
      }
    ]
  },
  {
    id: "120",
    title: "Integration Testing & Golden Tests",
    titleAr: "اختبارات التكامل واختبارات التطابق الصوري (Golden)",
    level: "8",
    category: "Testing",
    tags: ["Testing", "Integration Test", "Golden Test", "E2E"],
    definition: {
      summary: "اختبار التكامل (Integration Test) يختبر التطبيق ككل (End-to-End) على جهاز حقيقي أو محاكي، بينما Golden Tests تقوم بمقارنة مظهر الوجات بـ (صور مرجعية - Screenshots) للتأكد من عدم تغير الـ UI.",
      detailed: "- **Integration Testing**: يقوم بتشغيل التطبيق بالكامل ليختبر رحلة المستخدم (User flow)، كالقيام بتسجيل الدخول الفعلي وتصفح المنتجات. يعتبر الأبطأ في التنفيذ ولكنه يعطي الموثوقية القصوى.\n- **Golden Tests**: يتم فيه تصوير الـ Widget إلى (صورة مرجعية)، وفي المستقبل عند تشغيل الاختبار، يقوم بتصوير الوجات مرة أخرى ومقارنتها بيكسل-بيكسل بالصورة القديمة لضمان عدم حدوث أي انحراف (Pixel-perfect UI).",
      analogy: "الـ Integration Test زي المراقب اللي بيقعد في عربية المدرسة ويختبر الرحلة كاملة من أول ما تطلع من الجراج لحد ما توصل الطالب البيت. أما הـ Golden Tests فهي زي صورة البطاقة، بيصور الـ UI النهاردة واي مرة تتغير بيطابقها بالصورة القديمة عشان يتأكد إن ملامحها متغيرةش بالغلط.",
      keyPoints: [
        "Integration tests execute on real devices or emulators (E2E testing)",
        "Crucial for catching errors between layers (e.g., UI to API communication)",
        "Golden tests prevent UI regressions (Pixel changes)",
        "Uses 'matchesGoldenFile' function"
      ],
      codeExample: {
        language: "dart",
        code: `// === Golden Test Example ===
testWidgets('Verify Button Golden', (tester) async {
  await tester.pumpWidget(MyAppButton());

  // Matches current UI with the saved golden image
  await expectLater(
    find.byType(MyAppButton),
    matchesGoldenFile('goldens/my_button.png'),
  );
});

// === Integration Test (Main) ===
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('End-to-end flow Test', (tester) async {
    app.main(); // Start the whole app
    await tester.pumpAndSettle();
    
    await tester.tap(find.text('Login'));
    await tester.pumpAndSettle();
    
    expect(find.text('Welcome!'), findsOneWidget);
  });
}`
      }
    },
    questions: [
      {
        type: "Testing",
        question: "When should you use Golden Tests over normal Widget Tests?",
        questionAr: "متى تفضل استخدام Golden Tests بدلاً من اختبارات الواجهة التقليدية؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ Widget tests تفحص وجود عناصر معينة (زر، نص). لكنها لا تنقذك إذا تغير لون الزر، أو زاد الخط فجأة وخرب التصميم.",
            "الـ Golden Tests ضرورية في فرق التصميم الدقيق (Design Systems) لضمان عدم تغير شكل (Typography, Colors, Layouts) بيكسل واحد عن غير قصد."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["توضيح متى تتخذ قرار كتابة كل نوع اختبار لمعرفتك بأن التكامل مكلف والوحدات رخيصة وسريعة (Testing Pyramid)."],
      redFlags: ["اختبار כל التطبيق باستخدام Integration tests فقط (بطيء جداً وهش)."],
      greenFlags: ["ذكر الـ CI/CD وأن Golden Tests قد تتباعد بسبب اختلاف نظام التشغيل (Windows vs MacOS font rendering)."]
    },
    linkedCards: {
      prerequisites: ["118", "119"],
      nextSteps: [],
      related: ["flutter-ci-cd"]
    },
    commonPitfalls: [
      {
        mistake: "تشغيل الـ Golden Tests على أجهزة مختلفة بنظام تشغيل مختلف و تفشل (Fail).",
        whyWrong: "لأن عملية الـ Rendering للخطوط (Fonts) تختلف بيكسلات صغيرة جداً بين MacOS و Windows، فيرسب الاختبار.",
        correctApproach: "تشغيل وإنشاء صور الـ Goldens على بيئة موحدة (مثل Docker container أو Mac فقط للجميع)، أو استخدام Tolerance للتجاوز عن بعض البيكسلات."
      }
    ]
  },
  {
    id: "121",
    title: "Improving App Performance",
    titleAr: "تحسين أداء تطبيق Flutter",
    level: "9",
    category: "App Performance",
    tags: ["Performance", "Optimization", "const", "build"],
    definition: {
      summary: "هي مجموعة الممارسات لتقليل استهلاك الذاكرة (Memory)، تسريع بناء الواجهات (Rendering)، وتقليل استهلاك البطارية.",
      detailed: "للوصول لأفضل أداء في فلاتر، يجب: 1. استخدام كلمة `const` قدر الإمكان لمنع إعادة بناء الـ Widgets. 2. تجنب الـ Animations المعقدة في الـ `build` والانتقال לـ `AnimatedBuilder`. 3. استخدام `ListView.builder` للقوائم الطويلة. 4. فصل الـ Widgets الكبيرة إلى أجزاء صغيرة (Extract Widgets) بدلاً من استدعاء دوال (Extract Methods) للإرجاع. 5. استخدام الـ Isolates للعمليات الحسابية الثقيلة لعدم تجميد واجهة المستخدم (UI Thread).",
      analogy: "تحسين الأداء زي إنك ترتب مطبخك: لو كل مرة عايز معلقة (Widget) هتروح تشتري واحدة من السوبر ماركت (بدون const)، هتتعب وتاخد وقت. لكن لو جبتهم مرة واحدة وحطيتهم في الدرج (const)، هتستخدمهم على طول والمطبخ هيفضل مرتب وسريع.",
      keyPoints: [
        "Use 'const' constructors aggressively",
        "Extract Widgets instead of extracting as methods",
        "Avoid heavy synchronous work in the main thread (Use Isolates)",
        "Use the DevTools Performance View to detect UI jank"
      ],
      codeExample: {
        language: "dart",
        code: `// BAD: Rebuilds every time the parent rebuilds
Widget buildHeader() {
  return Text("Hello", style: TextStyle(fontSize: 20));
}

// GOOD: Flutter caches this and doesn't rebuild it
class HeaderWidget extends StatelessWidget {
  const HeaderWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return const Text("Hello", style: TextStyle(fontSize: 20));
  }
}`
      }
    },
    questions: [
      {
        type: "Performance",
        question: "Why is extracting a UI component into a separate Widget class better than extracting it into a method?",
        questionAr: "لماذا يُفضل فصل الـ UI في (Class) بدلاً من (دالة Method) ترجع Widget؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "عندما تستخدم (Method)، إذا تم تحديث الفئة الأب (Parent)، سيتم إعادة رسم وتنفيذ جميع الدوال بداخلها.",
            "عند استخدام (Class Widget) مستقل وإعطائه 'const' أو الاستفادة من الـ (Widget Tree caching)، فلاتر يكون ذكياً لتخطي إعادة رسم هذا المكون إذا لم تتغير مدخلاته."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["التأكد أنك لست مجرد مبرمج يركب شاشات، بل تهتم بتجربة المستخدم السلسة (60-120 fps)."],
      redFlags: ["الجهل بأداة (Flutter DevTools) أو معمارية الـ Widget Tree وكيفية تجنب الـ Rebuilds."],
      greenFlags: ["ذكر تقنيات متقدمة مثل RepaintBoundary أو استخدام CustomPainter للأشكال المعقدة بدلاً من وجات كثيرة متداخلة."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-basics"],
      nextSteps: [{ id: "122", title: "ListView vs ListView.builder" }],
      related: ["flutter-isolates"]
    },
    commonPitfalls: [
      {
        mistake: "تجاهل التحذيرات (Lints) المتعلقة بـ const.",
        whyWrong: "لأنها أسهل طريقة مجانية لتحسين الأداء. تجاهلها يعني أن التطبيق سيعيد بناء نصوص وأيقونات ثابتة مئات المرات بدون داع.",
        correctApproach: "تفعيل (flutter_lints) والالتزام بحل كل تحذيرات الـ const rules."
      }
    ]
  },
  {
    id: "122",
    title: "ListView vs ListView.builder",
    titleAr: "الفرق بين ListView و ListView.builder",
    level: "9",
    category: "App Performance",
    tags: ["Performance", "ListView", "Lists", "Lazy Loading"],
    definition: {
      summary: "كلاهما يُستخدم لعرض القوائم، ولكن `ListView.builder` يمتلك ميزة (Lazy Loading) ولا يقوم ببناء العناصر إلا عند ظهورها على الشاشة.",
      detailed: "عند استخدام `ListView` (أو `SingleChildScrollView` مع `Column`)، يقوم فلاتر ببناء جميع العناصر الموجودة في القائمة فوراً ووضعها في الذاكرة حتى لو كانت 1000 عنصر غير مرئية. أما `ListView.builder`، يسمح لفلاتر أن يبني (ينشئ) فقط العناصر المرئية حالياً على الشاشة بالإضافة للمخفية مباشرة (Cache Extent). وعند النزول للأسفل، يتم تدمير العناصر العلوية وإعادة تدويرها لبناء العناصر السفلية.",
      analogy: "الـ `ListView` العادي زي إنك تطبخ 1000 وجبة مرة واحدة وتحطهم على الترابيزة للضيوف (مفيش مكان وهيبوظوا). الـ `builder` زي البوفيه المفتوح: بتطبخ وتطلع على قد سحب الضيوف، ولو حد طلب زيادة بتعمله (Lazy Loading)، فكده بتوفر مجهود ومكان.",
      keyPoints: [
        "ListView constructs all children at once (Bad for large lists)",
        "ListView.builder constructs children lazily on demand (Good for infinite lists)",
        "ListView.separated is like builder but with built-in dividers between items",
        "Uses 'itemBuilder' and takes 'itemCount'"
      ],
      codeExample: {
        language: "dart",
        code: `// BAD: Loads 10,000 widgets into memory at once!
ListView(
  children: List.generate(10000, (index) => Text('Item $index')),
);

// GOOD: Only loaded when scrolled into view (Lazy)
ListView.builder(
  itemCount: 10000,
  itemBuilder: (context, index) {
    return Text('Item $index');
  },
);`
      }
    },
    questions: [
      {
        type: "Performance",
        question: "When would you prefer using a normal ListView over a ListView.builder?",
        questionAr: "متى تفضل استخدام ListView العادية على ListView.builder؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "عندما يكون لدينا عدد قليل جداً ومحدود من العناصر الثابتة (مثلاً 5 اختيارات في شاشة الإعدادات).",
            "لا يوجد داعي لكتابة الكود الإضافي الخاص بـ itemCount و itemBuilder في حالة القوائم الصغيرة الثابتة."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قياس فهمك لمفهوم הـ (Lazy loading) وإدارة الموارد (Resource Management)."],
      redFlags: ["استخدام SingleChildScrollView + Column مع بيانات تأتي من API (غير محدودة العدد)."],
      greenFlags: ["معرفة ميزة الـ `cacheExtent` وكيفية التحكم في عدد العناصر المحملة مسبقاً قبل ظهورها."]
    },
    linkedCards: {
      prerequisites: ["121"],
      nextSteps: [{ id: "123", title: "Isolate and Event Loop" }],
      related: ["flutter-widgets-basics"]
    },
    commonPitfalls: [
      {
        mistake: "نسيان تمرير itemCount לـ ListView.builder.",
        whyWrong: "بدون تحديده، ستستمر القائمة بلا نهاية، مما قد يسبب أخطاء OutOfBounds إذا حاول الكود الوصول لبيانات غير موجودة في المصفوفة الأساسية.",
        correctApproach: "دائماً حدد itemCount = array.length، إلا إذا كنت تبني Infinite Scroll بآلية تحميل صفحات (Pagination)."
      }
    ]
  },
  {
    id: "123",
    title: "Isolate and Event Loop",
    titleAr: "العزل (Isolate) ودورة الأحداث (Event Loop)",
    level: "9",
    category: "App Performance",
    tags: ["Concurrency", "Isolate", "Event Loop", "compute", "Performance"],
    definition: {
      summary: "Dart هي لغة تعمل على خيط واحد (Single-threaded). الـ Event Loop هو ما ينظم تنفيذ الأكواد المتزامنة والغير متزامنة، والـ Isolates هي طريقة Dart لتشغيل الأكواد الحسابية الضخمة في خيوط منفصلة (Threads).",
      detailed: "- **Event Loop**: ينظم الأحداث (كالضغط على زر) والـ (Futures) في طابور. إذا كان هناك عملية حسابية معقدة (مليون عملية جمع)، سيتعطل الطابور ويتجمد הـ UI (Jank).\n- **Isolate**: هو خيط تشغيل منفصل (Worker) يمتلك (Memory) خاص به تماماً لا يشاركها مع الـ Isolate الأساسي، ويتواصلان فقط عبر إرسال الرسائل (Messages/Ports). نستخدمه للحسابات العنيفة Parsing Large JSONs أو معالجة الصور لكي لا يتأثر سلاسة הـ UI.",
      analogy: "الـ Event Loop زي (صراف البنك) اللي واقف على شباك واحد بيخلص المعاملات بالترتيب بسرعة. لكن لو جاله عميل معاه 10 مليون جنيه فكة عايز يعدهم (عملية ضخمة)، كل الطابور هيتعطل. الحل إيه؟ الصراف هينادي على (موظف تاني - Isolate) يقعد في أوضة تانية يعدهم براحته ولما يخلص يبعتله مسدج بالرقم النهائي، وبكده الطابور (الـ UI) يفضل ماشي.",
      keyPoints: [
        "Dart is Single-Threaded by default",
        "Event Loop handles microtasks and events queues",
        "Isolates do not share memory; they communicate via Ports",
        "Use 'compute()' or 'Isolate.run()' for quick background processing"
      ],
      codeExample: {
        language: "dart",
        code: `// BAD: This freezes the UI for a few seconds!
int heavyComputation() {
  int sum = 0;
  for (int i = 0; i < 1000000000; i++) sum++;
  return sum;
}

// GOOD: Runs in a separate Isolate, UI stays smooth
Future<int> runHeavyInIsolate() async {
  // compute() is a helper to easily run a function in an Isolate
  return await compute(heavyComputation, null);
  // In Dart 2.19+, use Isolate.run(() => heavyComputation());
}`
      }
    },
    questions: [
      {
        type: "Concurrency",
        question: "Explain the difference between a Future/async and an Isolate.",
        questionAr: "اشرح الفرق بين الـ Future/async والـ Isolate.",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ Future أو Async لا ينشئ خيطاً (Thread) جديداً. هو مجرد ترتيب للأحداث في الخيط الواحد؛ بمعنى 'قم بعمل كذا، وأكمل باقي الطابور، وعندما ينتهي الأمر سأنجزه'.",
            "الـ Isolate ينشئ خيطاً حقيقياً مختلفاً في المعالج (CPU Thread) بذاكرة منفصلة للقيام بعمليات حسابية دون إشغال الخيط الأساسي الخاص بالـ UI."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة الفرق الحقيقي بين الـ Concurrency (تعدد المهام في وقت واحد - Event Loop) والـ Parallelism (التوازي الفعلي - Isolates)."],
      redFlags: ["الاعتقاد بأن أي دالة تبدأ بـ Future فهي تعمل في الخلفية ولا تجمد التطبيق."],
      greenFlags: ["ذكر التحديثات الأخيرة في دارت مثل Isolate.run() ومدى سهولتها مقارنة בـ Ports."]
    },
    linkedCards: {
      prerequisites: ["dart-futures"],
      nextSteps: [{ id: "124", title: "Networking: Dio vs http" }],
      related: ["flutter-ui-rendering"]
    },
    commonPitfalls: [
      {
        mistake: "عمل Isolate لكل عملية بسيطة (مثل استدعاء API عادي).",
        whyWrong: "الـ Isolates تكلفتها عالية (Overhead) عند الإنشاء لأنها تحجز ذاكرة جديدة. استدعاء הـ API هو عملية I/O لا تجهد المعالج (CPU) بل تنتظر الشبكة فقط، والـ Event Loop (الـ Futures) كافية جداً وممتازة لها.",
        correctApproach: "استخدام Isolates حصرياً لعمليات הـ Parsing (JSON الضخم) أو הـ Image Processing أو التشفير الثقيل."
      }
    ]
  },
  {
    id: "124",
    title: "Networking: Dio vs http",
    titleAr: "الشبكات: الفرق بين حزمة Dio و http",
    level: "9",
    category: "Networking",
    tags: ["Networking", "API", "Dio", "http"],
    definition: {
      summary: "مقابلة بين مكتبتي التعامل مع الشبكات الأبرز في Flutter لطلب الـ APIs والبيانات.",
      detailed: "حزمة `http` التابعة لدعم Dart الأساسي هي الأصغر والأبسط وتقدم المهام الأساسية (GET, POST). بينما `Dio` هي حزمة قوية جداً من طرف ثالث تقدم ميزات متقدمة خارج الصندوق لا توجد في `http`، مثل: Interceptors (الاعتراضات)، Download/Upload Progress (متابعة نسبة التحميل)، FormData (رفع الملفات المعقدة)، وإلغاء الطلبات المتزامنة.",
      analogy: "حزمة `http` زي العجلة، هتوصلك للمكان اللي إنت عايزه، بسيطة وصيانتها سهلة. أما `Dio` زي العربية الفل-أوبشن، فيها تكييف وGPS ومتابعة للاستهلاك (Progress) وتحكم في الطريق (Interceptors). لو مشوارك بسيط، العجلة تكفي، لكن للسفر (تطبيق ضخم) هتحتاج العربية.",
      keyPoints: [
        "http plugin: lightweight, maintained by dart.dev, good for simple requests",
        "Dio plugin: full-featured, supports Interceptors, global configuration, Form-Data",
        "Dio natively handles JSON-parsing automatically for the response",
        "Dio supports Request Cancellation (CancelToken)"
      ],
      codeExample: {
        language: "dart",
        code: `// === Using HTTP ===
final response = await http.get(Uri.parse('https://api.com/users'));
if (response.statusCode == 200) {
  // Manual decoding
  final data = jsonDecode(response.body); 
}

// === Using DIO ===
final dio = Dio(BaseOptions(baseUrl: 'https://api.com/'));
// No need for manual jsonDecode!
final response = await dio.get('/users'); 
print(response.data); // data is already a Map/List`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "Is it a good idea to directly use Dio inside your UI layer?",
        questionAr: "هل من الجيد استخدام كائن Dio مباشرة بداخل طبقة واجهة المستخدم (UI)؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "لا، هذا يكسر مبدأ الـ Separation of Concerns.",
            "يجب تغليف عمليات הـ API داخل Data Layer أو (Repository) وتجهيزها في Models وإرجاعها לـ Bloc.",
            "هذا يسهل التعديل مستقبلاً إذا قررت الشركة تغيير Dio والعودة לـ http أو graphql دون تعديل مئات الشاشات المكتوبة بـ Flutter."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تقييم خبرتك في التعامل مع הـ APIs وتجهيز البنية التحتية لتطبيقات الـ Enterprise."],
      redFlags: ["الاعتماد على http في مشاريع ضخمة بها رفع ملفات وشاشات تقدم (Progress)، وإعادة اختراع العجلة بكتابة كود معقد يدوياً."],
      greenFlags: ["إبراز الفهم لخيارات النطاق العالي مثل الـ Timeout configurations والـ Interceptors."]
    },
    linkedCards: {
      prerequisites: ["123"],
      nextSteps: [{ id: "125", title: "Interceptors in Dio" }],
      related: ["flutter-clean-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "إنشاء Instance جديد من `Dio()` قبل كل طلب API مباشر (Dio().get(...)).",
        whyWrong: "هذا يضيع موارد التطبيق ولا يسمح لك بالاستفادة من الـ BaseOptions الشاملة (مثل وضع Token موحدة للكل) או الـ Connection pooling.",
        correctApproach: "استخدام Singleton او تمرير الـ Dio عن طريق Dependency Injection لاستخدامه طوال دورة حياة التطبيق."
      }
    ]
  },
  {
    id: "125",
    title: "Interceptors in Dio",
    titleAr: "المعترضات (Interceptors) في Dio",
    level: "9",
    category: "Networking",
    tags: ["Networking", "Dio", "API", "Interceptors", "Tokens"],
    definition: {
      summary: "هي طريقة لاعتراض أو تعديل الطلبات (Requests) أو الإجابات (Responses) أو الأخطاء (Errors) قبل وصولها للخادم أو قبل وصولها إلى كود التطبيق الأساسي.",
      detailed: "في Dio، يمكنك إضافة Interceptors للقيام بمهام دورية. مثلاً: في `onRequest` يمكنك أخذ الـ Token من الذاكرة اللوكال وإضافته للـ Headings تلقائياً لكل طلب بدلاً من كتابته 100 مرة. وفي `onResponse` يمكنك تسجيل (Log) النتائج للمراقبة. وفي `onError` يمكنك التقاط رقم الخطأ (مثلاً 401 Unauthorized) وتوجيه المستخدم لتسجيل الدخول من جديد وتجديد הـ Token (Refresh Token).",
      analogy: "الـ Interceptor زي (بوابة التفتيش والجمارك) في المطار. أي طلب (مسافر) خارج من الموبايل للنت هيتفتش ويتختم باسبوره (يتحطله الـ Token). وأي رد (بضاعة) راجعة من النت هتتفحص، ولو فيها مشكلة أو باظت (Error) بتتصادر وتبعت رسالة للمدير (UI Message) من البوابة مباشرة.",
      keyPoints: [
        "Sits between your app and the network",
        "onRequest: Add Headers, Auth Tokens, Base URLs dynamically",
        "onResponse: Parse global data, logs, map responses",
        "onError: Handle Global API errors like 401 or timeout and trigger 'Refresh Token' logic"
      ],
      codeExample: {
        language: "dart",
        code: `dio.interceptors.add(
  InterceptorsWrapper(
    onRequest: (options, handler) async {
      // 1. Add Token to Headers automatically
      final token = await getLocalToken();
      options.headers['Authorization'] = 'Bearer $token';
      return handler.next(options); 
    },
    onResponse: (response, handler) {
      // 2. Global Logging
      print('Received: \${response.statusCode}');
      return handler.next(response); 
    },
    onError: (DioException e, handler) {
       // 3. Global Error Handling
       if(e.response?.statusCode == 401) {
         // handle refresh token automatically
       }
       return handler.next(e);
    },
  )
);`
      }
    },
    questions: [
      {
        type: "Networking",
        question: "How would you handle a 'Refresh Token' logic transparently to the user?",
        questionAr: "كيف تدير منطق 'تجديد الرمز - Refresh Token' بشكل خفي دون أن يشعر المستخدم؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "باستخدام (Interceptor). عندما يأتي الرد بخطأ 401 (غير مصرح)، نقوم بإيقاف (Pause/Lock) كل الطلبات القادمة.",
            "نرسل طلب خلفي (Background Request) للـ API للحصول على الـ Token الجديد باستخدام الـ Refresh token المحفوظ.",
            "إذا نجح، نقوم بتحديث הـ Token في הـ Storage، ونحدث الـ Headers للطلبات، ثم نقوم بفتح القفل وإعادة المحاولة للطلب الفاشل (Retry Request) دون أن يشعر المستخدم (UI) بأي خطأ."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["أنت كمرشح Senior/Mid، هل قمت بحل مشاكل الأمن (Security & Tokens) المعقدة أم لا؟"],
      redFlags: ["كتابة كود فحص הـ Token بداخل כל Repository على حدة (تكرار هائل للكود)."],
      greenFlags: ["ذكر كلمة Queuing أو Locking أثناء تجديد הـ Token حتى لا تقوم 5 طلبات متزامنة بتجديد التوكن في نفس اللحظة."]
    },
    linkedCards: {
      prerequisites: ["124"],
      nextSteps: [],
      related: ["flutter-clean-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "عمل Refresh Token logic بداخل الـ Bloc أو הـ UI Component.",
        whyWrong: "لأن عملية الـ Auth State يجب أن تكون مدعومة من جذور الشبكة (Network layer). اگر قمت بوضعها في طبقة التقديم (UI)، لن يمكنك تكرارها بسهولة لشاشات أخرى وسيتداخل منطق الواجهة مع منطق الشبكة.",
        correctApproach: "اجعل الـ Interceptor هو المدير الخفي لهذا التجديد، وابعث Event לـ AuthBloc فقط אם انتهى عمر הـ Refresh Token تماماً (لإجبار تسجيل خروج)."
      }
    ]
  },
  {
    id: "126",
    title: "JSON Serialization: Manual vs Code Gen",
    titleAr: "تحويل البيانات (JSON Serialization): يدوي أم مولد كود؟",
    level: "9",
    category: "Networking",
    tags: ["Networking", "JSON", "json_serializable", "Code Generation"],
    definition: {
      summary: "هي عملية تحويل الـ JSON (Map) إلى Dart Objects والعكس، وتتم إما يدوياً أو باستخدام أدوات توليد الكود.",
      detailed: "1. **Manual Serialization**: تقوم بكتابة دالة `fromJson` و `toJson` بنفسك. جيدة للمشاريع الصغيرة، لكنها عرضة للأخطاء (Typo) وصعبة الصيانة.\n2. **Code Generation (e.g., json_serializable)**: تستخدم Annotation مثل `@JsonSerializable()` وتقوم الأداة بتوليد الكود الممل (Boilerplate) نيابة عنك. هي الأفضل للمشاريع الكبيرة لضمان الدقة والسرعة وتجنب أخطاء الكتابة.",
      analogy: "تخيل إنك بتملا استمارة بيانات (JSON) وبتحولها لملف موظف (Object). اليدوي: إنت اللي بتنقل كل خانة بإيدك، لو سرحت للحظة هتكتب رقم التليفون مكان الاسم. المولد (Auto): جهاز سكنر بياخد النسخة ويطلعلك الملف جاهز ومظبوط 100% بدون تدخل منك.",
      keyPoints: [
        "Manual is quick for small tasks but unscalable",
        "Code generation ensures type safety and prevents typos",
        "json_serializable is the industry standard for production apps",
        "Requires 'build_runner' to generate the .g.dart files"
      ],
      codeExample: {
        language: "dart",
        code: `// Using json_serializable
@JsonSerializable()
class User {
  final String name;
  final String email;

  User(this.name, this.email);

  // This boilerplate is generated automatically!
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "When should you switch from manual JSON parsing to an automated tool?",
        questionAr: "متى يجب عليك الانتقال من التحويل اليدوي إلى استخدام أدوات آلية؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "عندما يتجاوز عدد الـ Models في التطبيق 5-10 ملفات.",
            "عندما يكون الـ JSON معقد ومتداخل (Nested Objects).",
            "لتقليل الوقت الضائع في صيانة الدوال اليدوية كلما تغير الـ API من جهة الـ Backend."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تهتم بجودة الكود (Code Quality) وتقليل الـ Human Errors؟"],
      redFlags: ["الاصرار على الطريقة اليدوية في مشاريع ضخمة جداً."],
      greenFlags: ["ذكر حزم أخرى مثل Freezed التي تجمع بين التجميد (Immutability) والتحويل (Serialization)."]
    },
    linkedCards: {
      prerequisites: ["124"],
      nextSteps: [{ id: "127", title: "Local Databases Comparison" }],
      related: ["flutter-clean-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "نسيان تشغيل `watch` أو `build` في الـ build_runner بعد تعديل الـ Model.",
        whyWrong: "سيؤدي ذلك لظهور أخطاء Compile-time لأن ملفات الـ .g.dart قديمة ولا تطابق التعديلات الجديدة.",
        correctApproach: "تشغيل `dart run build_runner watch` أثناء العمل ليتم التحديث تلقائياً."
      }
    ]
  },
  {
    id: "127",
    title: "Local Databases Comparison",
    titleAr: "مقارنة قواعد البيانات المحلية (Local Storage)",
    level: "9",
    category: "Data Storage",
    tags: ["Storage", "SQLite", "Hive", "SharedPrefs", "SecureStorage"],
    definition: {
      summary: "هناك عدة طرق لتخزين البيانات محلياً، تختلف حسب نوع وحجم البيانات ومستوى الأمان المطلوب.",
      detailed: "1. **Shared Preferences**: للقيم البسيطة (Key-Value) كالإعدادات.\n2. **Flutter Secure Storage**: مثل SharedPreferences ولكن مشفرة، للـ Tokens والبيانات الحساسة.\n3. **SQLite (sqflite)**: قاعدة بيانات علائقية كاملة، ممتازة للبيانات الضخمة والمعقدة والروابط بين الجداول.\n4. **Hive**: قاعدة بيانات NoSQL سريعة جداً مكتوبة بـ Dart، تعمل بشكل رائع للـ Caching والبيانات الغير مرتبطة بجداول معقدة.",
      analogy: "تخيل تخزين أغراضك:\n- `SharedPrefs`: جيب بنطلونك (للمفاتيح والعملات البسيطة).\n- `SecureStorage`: خزنة بكلمة سر (للباسبور والفلوس).\n- `SQLite`: أرشيف حكومي ضخم بملفات ورفوف منظمة (للملفات المرتبطة ببعض).\n- `Hive`: شنطة سفر سريعة الفتح، بترمي فيها الهدوم وتطلعها في ثانية (لبيانات سريعة ومتنوعة).",
      keyPoints: [
        "SharedPrefs is for simple flags (settings, theme)",
        "SecureStorage encrypts data automatically",
        "SQLite is relational, supports SQL queries, ACID compliant",
        "Hive is ultra-fast NoSQL and works on Web without special config"
      ],
      codeExample: {
        language: "dart",
        code: `// Typical SQL query in sqflite
await db.rawQuery('SELECT * FROM Users WHERE id = ?', [1]);

// Typical Hive access
var box = Hive.box('settings');
box.put('theme', 'dark');`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "Which database would you choose for a WhatsApp-like chat application? Why?",
        questionAr: "أي قاعدة بيانات تختار لتطبيق محادثات مثل واتساب؟ ولماذا؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "يفضل SQLite (sqflite) لأن المحادثات والرسائل والملفات تمتلك روابط معقدة (Relations).",
            "تحتاج إلى البحث السريع والفرز (Sorting) ودعم الـ ACID لضمان عدم ضياع أي رسالة أثناء الحفظ العشوائي."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["قدرتك على الاختيار التقني الصحيح بناءً على حالة الاستخدام (Use Case)."],
      redFlags: ["استخدام Shared Preferences لتخزين قائمة كاملة من 1000 منتج (ستكون بطيئة جداً)."],
      greenFlags: ["ذكر Realm أو Isar كبدائل حديثة وقوية لـ Hive و SQLite."]
    },
    linkedCards: {
      prerequisites: ["121"],
      nextSteps: [{ id: "128", title: "WebSockets vs REST" }],
      related: ["flutter-clean-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "حفظ صور كاملة (Base64) داخل SharedPreferences.",
        whyWrong: "هذا يبطئ التطبيق بشكل مرعب وقد يسبب تجميد UI لأن SharedPreferences تحمل جميع بياناتها في الذاكرة عند البدء.",
        correctApproach: "حفظ الصور كملفات في الـ Disk وحفظ المسار (Path) فقط في قاعدة البيانات."
      }
    ]
  },
  {
    id: "128",
    title: "WebSockets vs REST",
    titleAr: "الفرق بين WebSockets و REST",
    level: "9",
    category: "Networking",
    tags: ["Networking", "WebSocket", "REST", "Real-time"],
    definition: {
      summary: "REST هو نظام طلب ورد (Request-Response) تقليدي، بينما WebSocket هو اتصال مفتوح دائم يسمح بإرسال واستقبال البيانات في أي لحظة (Real-time).",
      detailed: "- **REST**: العميل يطلب، الخادم يرد، ثم ينقطع الاتصال. مثالي لجلب قائمة منتجات أو تفاصيل ملف شخصي.\n- **WebSocket**: العميل والخادم يفتحان قناة اتصال واحدة تظل مفتوحة. يمكن للخادم إرسال بيانات للعميل دون أن يطلبها (Server Push). مثالي للدردشة، تتبع السيارة في الخريطة، أو أسعار البورصة اللحظية.",
      analogy: "REST زي لما تبعت جواب (Letter) لواحد وتقعد تستنى رده، الجواب بيروح ويجي وخلاص. الـ WebSocket زي مكالمة تليفون مفتوحة (Phone Call)، إنتو الاتنين سامعين بعض وبتردوا على بعض في نفس اللحظة من غير ما تقفلوا الخط.",
      keyPoints: [
        "REST is stateless and follows HTTP methods (GET, POST)",
        "WebSocket is stateful and bidirectional (Bi-directional)",
        "REST overhead is higher for frequent updates due to headers",
        "WebSockets are efficient for high-frequency data (Live updates)"
      ],
      codeExample: {
        language: "dart",
        code: `// Simple WebSocket usage in Dart
final channel = WebSocketChannel.connect(
  Uri.parse('wss://echo.websocket.events'),
);

channel.stream.listen((message) {
  print('New server update: $message');
});

channel.sink.add('Hello Server!');`
      }
    },
    questions: [
      {
        type: "Networking",
        question: "When would WebSockets be overkill?",
        questionAr: "متى يكون استخدام WebSockets مبالغاً فيه وغير ضروري؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "عندما لا يحتاج التطبيق إلى تحديثات لحظية (مثلاً تطبيق مدونة أو أخبار بسيطة).",
            "عندما تكون الموارد على السيرفر محدودة (فتح آلاف قنوات الـ Socket يستهلك RAM السيرفر بشكل كبير مقارنة بـ REST)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["معرفة مهاراتك في هندسة التواصل (Communication Architecture) وكيف تتعامل مع الـ Streams."],
      redFlags: ["استخدام REST مع Timer (Polling) كل ثانية لجلب رسائل الشات (تكرار الطلبات يهلك البطارية والسيرفر)."],
      greenFlags: ["ذكر Socket.io أو Pusher كحلول لإدارة الـ WebSockets بسهولة."]
    },
    linkedCards: {
      prerequisites: ["dart-streams"],
      nextSteps: [{ id: "129", title: "Security & SSL Pinning" }],
      related: ["124"]
    },
    commonPitfalls: [
      {
        mistake: "نسيان غلق الـ WebSocket sink عند إغلاق الشاشة أو التطبيق (dispose).",
        whyWrong: "يؤدي ذلك لـ Memory Leaks واستهلاك مستمر للإنترنت والبطارية في الخلفية بدون داعٍ.",
        correctApproach: "دائماً استدعِ `channel.sink.close()` بداخل الـ dispose الخاص بالـ Widget أو الـ Bloc."
      }
    ]
  },
  {
    id: "129",
    title: "SSL Pinning & App Security",
    titleAr: "تثبيت الشهادة (SSL Pinning) وأمن التطبيق",
    level: "9",
    category: "Security",
    tags: ["Security", "SSL Pinning", "HTTPS", "Man-in-the-middle"],
    definition: {
      summary: "هي عملية أمنية تجعل التطبيق يرفض الاتصال بأي سيرفر إلا إذا كانت شهادة الـ SSL الخاصة به مطابقة تماماً للنسخة المخزنة بداخل التطبيق.",
      detailed: "تحمي هذه التقنية التطبيق من هجمات (Man-in-the-middle). فبدلاً من الوثوق بأي شهادة يوفرها نظام التشغيل، يثق التطبيق فقط في (البصمة - Fingerprint) الخاصة بسيرفرك. إذا حاول شخص اعتراض الاتصال بشهادة مزيفة، سيتوقف التطبيق عن العمل فوراً ولن يتم تسريب البيانات.",
      analogy: "تخيل إنك بتسلم شنطة فلوس لواحد في المطار. الطريقة العادية: بتثق في أي حد لابس (يونيفورم المطار الرسمي). الـ SSL Pinning: إنت معاك (صورة باسبوره) الحقيقي، لو جه واحد لابس اليونيفورم بس وشه مش زي الصورة، مش هتسلم الفلوس وهتمشي، حتى لو اليونيفورم أصلي.",
      keyPoints: [
        "Prevents MITM (Man-in-the-middle) attacks",
        "Trusts a specific certificate or public key instead of the OS root CAs",
        "Commonly implemented in Dio using SslCertificateInterceptor or custom HttpClient",
        "Security vs Flexibility: If certificate expires, app must be updated!"
      ],
      codeExample: {
        language: "dart",
        code: `// Conceptual Dio SSL Pinning
(dio.httpClientAdapter as IOHttpClientAdapter).onHttpClientCreate = (client) {
  SecurityContext context = SecurityContext(withTrustedRoots: false);
  // Add your server's .pem or .crt certificate here
  context.setTrustedCertificatesBytes(myCertificateBytes);
  return HttpClient(context: context);
};`
      }
    },
    questions: [
      {
        type: "Security",
        question: "What is the biggest risk of implementing SSL Pinning?",
        questionAr: "ما هو أكبر خطر عند تنفيذ الـ SSL Pinning؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "خطر انتهاء صلاحية الشهادة (Certificate Expiration).",
            "إذا انتهت صلاحية الشهادة على السيرفر وتم تغييرها، سيتوقف التطبيق عن العمل تماماً لجميع المستخدمين ولن يتمكنوا من فتحه إلا بعد إصدار تحديث جديد للتطبيق بالشهادة الجديدة (Update is mandatory)."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["التأكد من أنك تعمل على تطبيقات آمنة (Banking, Fintech) وتدرك المخاطر الجسيمة لتسريب البيانات."],
      redFlags: ["الجهل التام بـ SSL Pinning بالرغم من العمل في شركة حساسة."],
      greenFlags: ["ذكر حل (Public Key Pinning) بدلاً من الشهادة الكاملة لتقليل الحاجة للتحديثات المتكررة."]
    },
    linkedCards: {
      prerequisites: ["124"],
      nextSteps: [{ id: "130", title: "App Size Optimization" }],
      related: ["flutter-secure-storage"]
    },
    commonPitfalls: [
      {
        mistake: "تخزين الشهادة في ملف سهل الوصول إليه بداخل الأصول (Assets) بدون تشفير إضافي أو obfuscation.",
        whyWrong: "يسهل على المهاجمين استبدالها إذا تم فك ضغط الـ APK.",
        correctApproach: "استخدام Obfuscation وتخزين الشهادة كـ Hex أو Bytes بداخل الكود المترمج."
      }
    ]
  },
  {
    id: "130",
    title: "App Size & Obfuscation",
    titleAr: "حجم التطبيق وتغمية الكود (Obfuscation)",
    level: "9",
    category: "Optimization",
    tags: ["Optimization", "App Size", "Obfuscation", "Security"],
    definition: {
      summary: "هي تقنيات لتقليل حجم ملف الـ APK/IPA النهائي وحماية الكود من المتسللين عبر تحويل أسماء الدوال والمتغيرات إلى رموز غير مفهومة.",
      detailed: "1. **Obfuscation**: تحويل `fetchUserData()` إلى `a1()`. هذا يجعل عملية الـ Reverse Engineering للتطبيق صعبة جداً.\n2. **Size Optimization**: تشمل استخدام صور بصيغة `.webp` بدلاً من `.png` للتوفير، استخدام SVG للأيقونات، وتفعيل خاصية (Split APK) لإنتاج نسخ مخصصة لكل نوع معالج (arm64, arm-v7).",
      analogy: "زي واحد بيبعت رسالة سرية (أبلكيشن). الأول بيصغر الحروف ويشيل المسافات الزيادة عشان الورقة تبقى صغيرة (Size). التاني بيكتبها بشفرة هو بس اللي فاهمها، ولو حد سرق الورقة مش هيفهم الكود مكتوب فيه إيه (Obfuscation).",
      keyPoints: [
        "Obfuscation makes reverse engineering significantly harder",
        "Enable split-per-abi to reduce user download size",
        "Use '--obfuscate --split-debug-info' flags during build",
        "Analyze app size using 'flutter build apk --analyze-size'"
      ],
      codeExample: {
        language: "bash",
        code: `# Build with obfuscation and size analysis
flutter build apk --obfuscate --split-debug-info=./debug --split-per-abi --analyze-size`
      }
    },
    questions: [
      {
        type: "Optimization",
        question: "How do you identify what is making your Flutter app heavy?",
        questionAr: "كيف يمكنك تحديد الأشياء التي تجعل حجم تطبيق فلاتر ضخماً؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "باستخدام أمر `--analyze-size` عند البناء، سيصدر فلاتر ملف JSON يوضح بدقة نسبة كل جزء (Assets, Code, Engine) من إجمالي الحجم.",
            "غالباً ما تكون الصور (Assets) والخطوط (Fonts) هي السبب، والحل هو ضغطها أو تحميلها من الإنترنت عند الحاجة."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["تأكيد أنك مبرمج محترف تهتم بـ User Acquisition؛ لأن المستخدم ينفر من التحميل إذا كان حجم التطبيق 200MB."],
      redFlags: ["عدم معرفة أن فلاتر تدعم Split APK وتنتج ملفات صغيرة."],
      greenFlags: ["ذكر فكرة (Dynamic Delivery) أو تحميل الـ Assets أونلاين."]
    },
    linkedCards: {
      prerequisites: ["121"],
      nextSteps: [{ id: "131", title: "Custom Painters & Canvas" }],
      related: ["flutter-build-system"]
    },
    commonPitfalls: [
      {
        mistake: "نسيان حفظ ملف `mapping.txt` بعد عملية الـ Obfuscation.",
        whyWrong: "بدون هذا الملف، إذا حدث كراش (Crash) عند مستخدم، ستظهر لك التقارير برموز مثل `a.b.c:12` ولن تفهم أين الخطأ الحقيقي.",
        correctApproach: "احتفظ بالـ Mapping file لكل إصدار ترفعه للمتجر لفك تشفير تقارير الأخطاء."
      }
    ]
  },
  {
    id: "131",
    title: "Custom Painters & Canvas",
    titleAr: "الرسم المخصص (Custom Painters) والكانفاس",
    level: "9",
    category: "Advanced UI",
    tags: ["UI", "CustomPainter", "Canvas", "Graphics"],
    definition: {
      summary: "هي طريقة للرسم اليدوي المباشر على الشاشة باستخدام الإحداثيات (Coordinates) والأشكال الهندسية، بعيداً عن الـ Widgets الجاهزة.",
      detailed: "عندما لا تكفي الـ Widgets العادية (مثل Container أو Stack) لعمل شكل معقد جداً (مثل رسم بياني منحني أو شكل هندسي غير منتظم)، نستخدم `CustomPainter`. نوفر دالة `paint` التي تعطيك `Canvas` (لوحة الرسم) و `Paint` (الفرشاة) لرسم خطوط، دوائر، مسارات (Paths)، وصور بدقة عالية وأداء ممتاز.",
      analogy: "الـ Widgets العادية زي مكعبات (Lego)، بتركبها فوق بعض عشان تطلع شكل. الـ CustomPainter زي (لوحة كانفاس وفرشاة)، إنت اللي بترسم كل خط ونقطة وميل بإيدك عشان تطلع لوحة فنية مش موجودة في المكعبات الجاهزة.",
      keyPoints: [
        "Used for highly complex/non-standard UIs",
        "Uses Canvas API (drawLine, drawPath, drawCircle)",
        "Must implement shouldRepaint for performance optimization",
        "Runs on the engine floor, making it very performant"
      ],
      codeExample: {
        language: "dart",
        code: `class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    var paint = Paint()..color = Colors.blue..strokeWidth = 5;
    canvas.drawLine(Offset(0, 0), Offset(size.width, size.height), paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}`
      }
    },
    questions: [
      {
        type: "UI/UX",
        question: "When should you NOT use a CustomPainter?",
        questionAr: "متى يجب عليك ألا تستخدم CustomPainter؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "إذا كان يمكن تحقيق التصميم باستخدام الـ Widgets العادية (Container, Stack, ClipPath).",
            "لأن الـ CustomPainter يحتاج مجهود أكبر في الصيانة والحسابات الرياضية للإحداثيات وتفاعلات اللمس (Hit Testing)."
          ],
          timeToAnswer: "1.5 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تمتلك مهارات رياضية وتصميمية عميقة لبناء ماركات (Brands) فريدة وتصميمات معقدة؟"],
      redFlags: ["عدم القدرة على شرح كيفية تحسين الأداء (Repainting) بداخل الرسام المخصص."],
      greenFlags: ["ذكر استخدام Rive أو Lottie كبدائل للرسومات المتحركة المعقدة."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-basics"],
      nextSteps: [{ id: "132", title: "Method Channels" }],
      related: ["121"]
    },
    commonPitfalls: [
      {
        mistake: "إرجاع `true` دائماً في دالة `shouldRepaint`.",
        whyWrong: "يؤدي ذلك لإعادة رسم اللوحة في كل إطار (Frame) حتى لو لم تتغير البيانات، مما يستهلك المعالج والبطارية.",
        correctApproach: "قارن البيانات القديمة بالجديدة وأرجع `true` فقط إذا كان هناك تغيير فعلي يستدعي الرسم."
      }
    ]
  },
  {
    id: "132",
    title: "Method Channels (Native Integration)",
    titleAr: "قنوات التواصل مع النظام (Method Channels)",
    level: "10",
    category: "Platform Integration",
    tags: ["Native", "Android", "iOS", "Kotlin", "Swift", "MethodChannel"],
    definition: {
      summary: "هي جسر تواصل يسمح لـ Flutter باستدعاء كود مكتوب بلغات النظام الأم (Kotlin/Java للاندرويد، Swift/Obj-C للـ iOS).",
      detailed: "عندما تحتاج لميزة موجودة في نظام التشغيل وليس لها باكج جاهزة (مثل بصمة وجه متقدمة جداً، أو تواصل مع هاردوير خاص)، تفتح (نفق) يسمى `MethodChannel`. ترسل رسالة من Dart باسم دالة معينة، يستقبلها كود النظام الأم، ينفذها، ثم يرسل الرد مرة أخرى لـ Flutter.",
      analogy: "تخيل إنك في مطعم صيني في مصر. الشيف في المطبخ بيكلم صيني (Native Code) وإنت بره بتتكلم عربي (Flutter/Dart). الـ Method Channel هي (المترجم) اللي بياخد طلبك بالعربي ويوصله للشيف بالصيني ويرجعلك بالأكلة (النتيجة) اللي طلبتها.",
      keyPoints: [
        "Asynchronous communication between Dart and Native",
        "Used for platform-specific APIs (Battery level, Sensors, etc.)",
        "Requires knowledge of Kotlin/Swift or hiring native devs",
        "Data is serialized using StandardMessageCodec"
      ],
      codeExample: {
        language: "dart",
        code: `// Dart Side
static const platform = MethodChannel('samples.flutter.dev/battery');
final int result = await platform.invokeMethod('getBatteryLevel');

// Native Side (Kotlin)
MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
  call, result -> if (call.method == "getBatteryLevel") { ... }
}`
      }
    },
    questions: [
      {
        type: "Native",
        question: "Why should you use an EventChannel instead of a MethodChannel?",
        questionAr: "لماذا قد تستخدم EventChannel بدلاً من MethodChannel؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "تستخدم MethodChannel لطلب واحد ورد واحد (One-time).",
            "تستخدم EventChannel لبث البيانات المستمر (Streaming)، مثل قراءة نبضات القلب المستمرة أو إحداثيات الـ GPS المتغيرة لحظياً من النظام للأبلكيشن."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل أنت مطور فلاتر 'شامل' (Full-track) يفهم كيف يعمل الموبايل من الداخل أم مجرد شخص يحرك Widgets؟"],
      redFlags: ["الخوف من فتح مجلد `android` أو `ios` والتعديل فيه."],
      greenFlags: ["معرفة بـ Pigeon كأداة لتوليد كود الـ Native Channels بشكل آمن النوع (Type-safe)."]
    },
    linkedCards: {
      prerequisites: ["dart-async"],
      nextSteps: [{ id: "133", title: "Flutter Web & Responsive" }],
      related: ["flutter-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "إرسال كميات ضخمة جداً من البيانات (مثل صور خام) عبر الميثود تشانل.",
        whyWrong: "عملية التشفير وفك التشفير (Serialization) بين Dart والـ Native بطيئة جداً للملفات الضخمة وتسبب تعليق (Jank) في الواجهة.",
        correctApproach: "أرسل مسار الملف (File Path) وتعامل معه مباشرة في الجانبين."
      }
    ]
  },
  {
    id: "133",
    title: "Flutter Web: Responsive vs Adaptive",
    titleAr: "فلاتر للويب: الفرق بين المتجاوب والمتكيف",
    level: "9",
    category: "Web & Multi-platform",
    tags: ["Web", "Responsive", "Adaptive", "Layout"],
    definition: {
      summary: "فلاتر تسمح بتشغيل نفس الكود على الويب، ولكنها تتطلب تفكيراً مختلفاً في كيفية ظهور الواجهة على الشاشات الكبيرة والصغيرة.",
      detailed: "1. **Responsive (متجاوب)**: تغيير حجم وتصميم الواجهة بناءً على حجم الشاشة (استخدام `LayoutBuilder`).\n2. **Adaptive (متكيف)**: تغيير سلوك وشكل الـ Widgets بناءً على (نوع الجهاز)؛ مثلاً: إظهار Material Switch على أندرويد و Cupertino Switch على آيفون، أو إظهار Menu بار في الويب و NavigationBar في الموبايل.",
      analogy: "- الـ Responsive زي (الاستيك): بيمط ويصغر حسب المساحة المتاحة.\n- الـ Adaptive زي (الحرباء): بتغير جلدها تماماً وشكلها حسب البيئة (موبايل، تابلت، كمبيوتر) عشان تبان طبيعية في مكانها.",
      keyPoints: [
        "Use LayoutBuilder and MediaQuery for responsiveness",
        "Use kIsWeb and Platform checks for adaptiveness",
        "Flutter Web uses CanvasKit or HTML rendering",
        "SEO is a challenge in Flutter Web compared to HTML-based sites"
      ],
      codeExample: {
        language: "dart",
        code: `LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      return TabletLayout(); // Responsive switch
    }
    return MobileLayout();
  },
);`
      }
    },
    questions: [
      {
        type: "Web/Architecture",
        question: "When would you NOT recommend Flutter for a web project?",
        questionAr: "متى لا تنصح باستخدام فلاتر لمشروع ويب؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "للمواقع التي تعتمد بشكل كلي على الـ SEO (مثل المدونات، المجلات الإخبارية، ومواقع التجارة العامة).",
            "للمواقع التي تحتاج سرعة تحميل أولية (Initial Load) فائقة، لأن فلاتر ويب تحمل محرك الرسم بالكامل في البداية."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["مدى نضجك في اختيار الأداة المناسبة للمكان المناسب."],
      redFlags: ["الاعنقاد بأن فلاتر ويب هي بديل مثالي لـ React أو Next.js في كل الحالات."],
      greenFlags: ["ذكر أن فلاتر ويب ممتازة للـ Dashboards والـ Enterprise Apps (التي تستلزم تسجيل دخول)."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-basics"],
      nextSteps: [{ id: "134", title: "Flutter Desktop" }],
      related: ["121"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام HTML-only rendering لتطبيق به رسومات معقدة أو Animation.",
        whyWrong: "سيظهر التطبيق بأداء سيء وخطوط غير واضحة. ",
        correctApproach: "استخدام CanvasKit (Skia WebAssembly) للحصول على أفضل جودة وأداء، مع مراعاة زيادة حجم ملف التحميل قليلاً."
      }
    ]
  },
  {
    id: "134",
    title: "Flutter Desktop Basics",
    titleAr: "أساسيات فلاتر لسطح المكتب (Desktop)",
    level: "9",
    category: "Multi-platform",
    tags: ["Desktop", "Windows", "MacOS", "Linux", "Native Plugins"],
    definition: {
      summary: "فلاتر الآن مستقرة جداً لبناء تطبيقات لأنظمة Windows, MacOS, و Linux، مع إمكانية الوصول لميزات النظام الخاصة بالحواسيب.",
      detailed: "تطبيقات الديسكطوب تختلف عن الموبايل في: أحجام الشاشات العملاقة، التفاعل بالماوس والكيبورد (Hotkeys)، القوائم العلوية (Context Menus)، والتعامل مع الملفات (File Picker) بشكل أوسع. فلاتر توفر ثباتاً ممتازاً وأداءً قريباً جداً من البرامج الأصلية المكتوبة بـ C++ أو Swift.",
      analogy: "تخيل إنك بتنقل محل موبايلات ليكون (مول تجاري ضخم). الواجهات لازم تتغير؛ مش هينفع تستخدم زراير الموبايل الضخمة في شاشة كمبيوتر 24 بوصة. كمان لازم تضيف (أمن) ومداخل ومخارج جديدة (الماوس والكيبورد والقوائم) اللي مكانتش مهمة في المحل الصغير.",
      keyPoints: [
        "Native C++ / Swift / CMake integration",
        "Supports Menu bars and Tray icons",
        "Multi-window support is maturing (bitsdojo_window)",
        "Focus on 'Navigation Rail' instead of BottomNavigationBar"
      ],
      codeExample: {
        language: "dart",
        code: `// Contextual Menu Example (Conceptual)
if (Platform.isWindows || Platform.isMacOS) {
  return NavigationRail(
    destinations: [...],
    selectedIndex: 0,
  );
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "What is the biggest UI consideration when moving from Mobile to Desktop?",
        questionAr: "ما هو أكبر اعتبار في واجهة المستخدم (UI) عند الانتقال من المحمول إلى سطح المكتب؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "استغلال المساحة العرضية (Horizontal Space) بدلاً من الطولية.",
            "إضافة دعم صريح للاختصارات (Keyboard Shortcuts) واستجابة حركة الماوس (Hover effects).",
            "تحويل القوائم السفلية (Bottom Nav) إلى قوائم جانبية (Side Rail) لتناسب الشاشات العريضة."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل يمكنك بناء تطبيق للشركات (Enterprise Solution) يعمل على كل المنصات باحترافية؟"],
      redFlags: ["إخراج تطبيق ويندوز يبدو وكأنه موبايل 'مشدود' (Stretched mobile app)."],
      greenFlags: ["ذكر استخدام FFI (Foreign Function Interface) للتواصل المباشر مع مكتبات C مكتوبة للديسكطوب."]
    },
    linkedCards: {
      prerequisites: ["133"],
      nextSteps: [{ id: "135", title: "Localization & RTL" }],
      related: ["flutter-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "الاعتماد على اللمس (Touch events) فقط وعدم مراعاة الـ Click/Right Click.",
        whyWrong: "مستخدم الكمبيوتر سيجد صعوبة في التفاعل مع التطبيق وسيشعر أنه غريب عن بيئة النظام.",
        correctApproach: "استخدام `SelectionArea` لجعل النصوص قابلة للنسخ و `MouseRegion` لتفاعلات الماوس."
      }
    ]
  },
  {
    id: "135",
    title: "Localization (l10n) & RTL",
    titleAr: "اللغات (Localization) ودعم العربية (RTL)",
    level: "8",
    category: "Internationalization",
    tags: ["l10n", "Internationalization", "RTL", "Arabic", "ARB"],
    definition: {
      summary: "هي عملية جعل التطبيق يدعم لغات متعددة وتنسيقات زمنية ومكانية مختلفة، مع مراعاة اتجاه الكتابة (يمين لليسار أو العكس).",
      detailed: "في فلاتر، نستخدم ملفات `.arb` (JSON-like) لتخزين الترجمات. يتم توليد كود تلقائي يسمح بالوصول للترجمات عبر `AppLocalizations.of(context)`. الأهم في لغتنا العربية هو دعم (RTL - Right to Left) حيث يقلب فلاتر الواجهة تلقائياً إذا استخدمنا `Directionality` و `start/end` بدلاً من `left/right`.",
      analogy: "تخيل إنك بتفرش (شقة). لو إنت في مصر، الأوكر (المقابض) والفرش بيكون مريح للي داخل بيمينه (RTL). لو في انجلترا، العكس (LTR). المهندس الشاطر بيصمم الشقة بحيث لو قررت تقلبها في أي وقت، كل حاجة تتنقل لمكانها المنطقي أوتوماتيك بضغطة زرار.",
      keyPoints: [
        "Use .arb files for clean, scalable translations",
        "Enable 'generate: true' in pubspec.yaml",
        "Avoid hardcoded strings at all costs",
        "Use start/end (logical properties) for flexible padding/margins"
      ],
      codeExample: {
        language: "dart",
        code: `// in example_en.arb
"hello": "Hello {name}"

// in UI
Text(AppLocalizations.of(context)!.hello('Mohamed'));`
      }
    },
    questions: [
      {
        type: "UI/UX",
        question: "How do you handle icons that imply direction (like an arrow) in RTL?",
        questionAr: "كيف تتعامل مع الأيقونات التي تعبر عن اتجاه (مثل السهم) في حالة اللغات التي تكتب من اليمين؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "باستخدام خاصية `matchTextDirection: true` في الـ `Icon` أو `ImageWidget`.",
            "هذا سيجعل السهم يلف تلقائياً (Flip) عند تغيير لغة التطبيق للعربية ليشير للاتجاه الصحيح منطقياً."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل أنت مستعد لمشاريع عالمية (Multi-national) أم تبرمج لنفسك فقط؟"],
      redFlags: ["استخدام 'Left' و 'Right' بدلاً من 'Start' و 'End' مما يفسد الواجهة العربية."],
      greenFlags: ["ذكر كيفية التعامل مع الأرقام (هندية vs عربية) والعملات والتواريخ عبر باكج `intl`."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-basics"],
      nextSteps: [{ id: "136", title: "Navigation & Deep Linking" }],
      related: ["flutter-clean-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "كتابة نصوص عربية مباشرة (Hardcoded) بداخل الكود.",
        whyWrong: "مستحيل تقريباً ترجمة التطبيق للغات أخرى لاحقاً، وستضطر للبحث في آلاف الملفات لتغيير كلمة واحدة.",
        correctApproach: "ضع كل الكلمات في ملفات الترجمة (.arb) ونادِ عليها بالـ Key الخاص بها."
      }
    ]
  },
  {
    id: "136",
    title: "Navigation 2.0 & Deep Linking",
    titleAr: "التنقل المتقدم (Navigation 2.0) والروابط العميقة",
    level: "10",
    category: "Navigation",
    tags: ["Navigation", "GoRouter", "Router", "Deep Linking", "Navigator 2.0"],
    definition: {
      summary: "هو نظام تنقل تعريفي (Declarative) يسمح بالتحكم الكامل في الـ Stack الخاص بالصفحات عبر عنوان URL، مما يسهل دعم الويب والروابط العميقة.",
      detailed: "بينما يعتمد Navigator 1.0 على `push` و `pop` (الأمر اليدوي)، يعتمد Navigator 2.0 (Router) على جعل حالة التطبيق هي المتحكمة في الصفحات المعروضة. باستخدام مكتبات مثل `go_router` أو `auto_route` أصبح من السهل ربط كل صفحة بمسار (Path) محدد، مما يسمح للمستخدم بفتح التطبيق من رابط خارجي (Deep Link) ليصل مباشرة لصفحة منتج بعينه.",
      analogy: "Navigator 1.0 زي السلم: بتطلع درجة درجة وتبص تحتك تشوف إنت فين. Navigator 2.0 زي (الأسانسير بلوحة تحكم): إنت بتدوس على رقم الدور (الرابط) والأسانسير هو اللي بيقرر يطلعك فين وبيرتب الأدوار اللي تحته أوتوماتيك.",
      keyPoints: [
        "Declarative approach instead of Imperative",
        "Essential for Flutter Web (Browser URL sync)",
        "Deep Linking: Opening app from a URL (e.g., https://myapp.com/product/123)",
        "GoRouter is the recommended package by the Flutter team"
      ],
      codeExample: {
        language: "dart",
        code: `final GoRouter _router = GoRouter(
  routes: [
    GoRoute(
      path: '/details/:id',
      builder: (context, state) => DetailsPage(id: state.params['id']!),
    ),
  ],
);`
      }
    },
    questions: [
      {
        type: "Navigation",
        question: "What is a 'Deep Link' and how is it different from a 'Universal Link'?",
        questionAr: "ما هو الـ Deep Link وما الفرق بينه وبين الـ Universal Link؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "الـ Deep Link هو مصطلح عام للروابط التي تفتح محتوى داخلي في التطبيق (مثل myapp://page).",
            "الـ App Link (في أندرويد) أو הـ Universal Link (في iOS) هي روابط HTTPS عادية (مثل google.com) يتم التحقق منها ملكيتها للسيرفر، وإذا كانت مثبتة تفتح التطبيق مباشرة بدلاً من المتصفح."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل يمكنك بناء تطبيقات تدعم الويب وقابلة للمشاركة (Shareable Links) بداخلها؟"],
      redFlags: ["الارتباك عند سؤالك عن كيفية عمل 'الرجوع' (Back button) في المتصفح مع فلاتر ويب."],
      greenFlags: ["ذكر استخدام Redirection logic بداخل الراوتر للتحقق من تسجيل الدخول (Auth Guard)."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-basics"],
      nextSteps: [{ id: "137", title: "App Lifecycle" }],
      related: ["133"]
    },
    commonPitfalls: [
      {
        mistake: "تعقيد نظام التنقل في تطبيق صغير وبسيط جداً باستخدام Navigator 2.0.",
        whyWrong: "بينما هو قوي جداً، إلا أن إعداده يأخذ وقتاً طويلاً وكوداً كثيراً قد لا تحتاجه إذا كان تطبيقك 3 صفحات فقط.",
        correctApproach: "استخدم `go_router` لأنه يبسط Navigator 2.0 جداً ويجعله خياراً ممتازاً حتى للمشاريع المتوسطة."
      }
    ]
  },
  {
    id: "137",
    title: "App Lifecycle & Background Tasks",
    titleAr: "دورة حياة التطبيق والمهام الخلفية",
    level: "9",
    category: "System",
    tags: ["Lifecycle", "Background", "WorkManager", "AppLifecycleListener"],
    definition: {
      summary: "هي الحالات التي يمر بها التطبيق (نشط، في الخلفية، مغلق) وكيفية تنفيذ كود حتى لو لم يكن التطبيق مفتوحاً أمام المستخدم.",
      detailed: "1. **Lifecycle**: نستخدم `AppLifecycleListener` لمعرفة متى ذهب المستخدم لشاشة أخرى (Paused) أو أغلق الشاشة (Inactive). هذا ضروري لحفظ البيانات أو إيقاف الموسيقى.\n2. **Background Tasks**: تنفيذ مهام في الخلفية (مثل مزامنة البيانات كل ساعة) يتطلب استخدام Isolates أو مكتبات مثل `workmanager` للتواصل مع منبهات النظام (Alarm Manager/JobScheduler).",
      analogy: "- دورة الحياة زي (موظف الاستقبال): بيبقى فايق (Resumed) لما حد قدامه، أو نايم (Paused) لو مفيش حد، أو مروح (Detached) لو اليوم خلص.\n- المهام الخلفية زي (جهاز التسجيل): بتشغله وتسيبه هو هيسجل (ينفذ المهمة) لوحده حتى لو إنت مش في المكان.",
      keyPoints: [
        "States: Resumed, Inactive, Paused, Detached",
        "Use AppLifecycleListener (new in Flutter 3.13) for cleaner monitoring",
        "Background tasks are limited by OS battery optimization",
        "Requires Isolate or separate entry point for background execution"
      ],
      codeExample: {
        language: "dart",
        code: `// Monitoring lifecycle with AppLifecycleListener
late final AppLifecycleListener _listener;
_listener = AppLifecycleListener(
  onStateChange: (state) => print('Current state: $state'),
  onPause: () => print('App Paused'),
);`
      }
    },
    questions: [
      {
        type: "System",
        question: "Can Flutter run code while the app is completely terminated?",
        questionAr: "هل يمكن لفلاتر تشغيل كود بينما التطبيق مغلق تماماً (Terminated)؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "نعم، باستخدام الـ (Background Fetch) أو (WorkManager).",
            "يقوم النظام بإيقاظ جزء صغير من المحرك (Headless Isolate) لتنفيذ المهمة ثم إغلاقه مرة أخرى، بمرات تكرار يحددها نظام التشغيل حسب استهلاك البطارية."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تدرك قيود الأندرويد والـ iOS فيما يخص البطارية واستهلاك الـ RAM في الخلفية؟"],
      redFlags: ["الاعتقاد بأن الـ Timer يستمر في العمل للأبد حتى لو أغلق المستخدم الموبايل."],
      greenFlags: ["ذكر استخدام Firebase Cloud Messaging (FCM) كطريقة لإيقاظ التطبيق من السيرفر عند الضرورة."]
    },
    linkedCards: {
      prerequisites: ["122"],
      nextSteps: [{ id: "138", title: "CI/CD & Deployment" }],
      related: ["123"]
    },
    commonPitfalls: [
      {
        mistake: "محاولة تحديث الـ UI من داخل مهمة خلفية (Background Task).",
        whyWrong: "المهمة الخلفية تعمل غالبا في Isolate منفصل تماماً عن الواجهة، ولا يوجد UI أصلاً عندما يكون التطبيق في الخلفية العميقة.",
        correctApproach: "قم بتحديث قاعدة البيانات (Local DB) أو الـ SharedPreferences، وعندما يفتح المستخدم التطبيق سيقرأ البيانات الجديدة ويحدث الواجهة."
      }
    ]
  },
  {
    id: "138",
    title: "CI/CD for Flutter",
    titleAr: "المكاملة والتسليم المستمر (CI/CD) للفلاتر",
    level: "10",
    category: "DevOps",
    tags: ["CI/CD", "GitHub Actions", "Codemagic", "Fastlane", "Deployment"],
    definition: {
      summary: "هي عملية أتمتة اختبار وبناء ورفع التطبيق للمتاجر تلقائياً عند كل ضغطة `push` للكود.",
      detailed: "1. **CI (Continuous Integration)**: فحص الكود (Linter) وتشغيل الاختبارات (Tests) تلقائياً لضمان عدم وجود أخطاء.\n2. **CD (Continuous Deployment)**: بناء ملف الـ APK/IPA ورفعه للمتاجر (Google Play / App Store) أو لخدمات الاختبار (Firebase App Distribution). أشهر الأدوات هي GitHub Actions و Codemagic و Fastlane.",
      analogy: "تخيل إنك صاحب مصنع (أبلكيشن). الـ CI زي (ضابط الجودة): بيقف على السير ويفحص كل قطعة طالعة. الـ CD زي (شركة الشحن): بتاخد الكرتونة اللي اتفحصت وتوصلها للزبائن في المحلات (المتاجر) أوتوماتيك من غير ما إنت تتحرك من مكتبك.",
      keyPoints: [
        "Automated linting and testing on every PR",
        "Reduced human error in building release files",
        "Fastlane automates screenshots and metadata uploads",
        "GitHub Actions is powerful and highly customizable for free"
      ],
      codeExample: {
        language: "yaml",
        code: `# Simple GitHub Action snippet
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
      - run: flutter test
      - run: flutter build apk --release`
      }
    },
    questions: [
      {
        type: "Engineering",
        question: "Why would you use Fastlane in a Flutter project?",
        questionAr: "لماذا قد تستخدم Fastlane في مشروع فلاتر؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "لأتمتة المهام الرتيبة مثل رفع الشهادات (Certificates) وإدارة الـ Provisioning Profiles في iOS.",
            "لأخذ لقطات شاشة (Screenshots) تلقائية لكل اللغات والقياسات ورفعها للمتجر بضغطة زر واحدة."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تمتلك عقلية (Senior) تهتم بتقليل الوقت الضائع في العمليات اليدوية؟"],
      redFlags: ["الاعتقاد بأن المبرمج هو من يجب أن يبني الـ APK على جهازه ويرسلها للعميل بيده دائماً."],
      greenFlags: ["ذكر أهمية (Versioning) و (Tagging) التلقائي في الـ GitHub Actions."]
    },
    linkedCards: {
      prerequisites: ["120"],
      nextSteps: [{ id: "140", title: "Deployment Guidelines" }],
      related: ["flutter-build-system"]
    },
    commonPitfalls: [
      {
        mistake: "وضع مفاتيح التشفير (Keys) والـ Passwords الخاصة بالمتجر بداخل الكود بشكل مكشوف في GitHub.",
        whyWrong: "أي شخص يصل للكود يمكنه سرقة هويتك ورفع نسخ خبيثة من تطبيقك.",
        correctApproach: "استخدم (Secrets/Environment Variables) في GitHub/Codemagic لإخفاء البيانات الحساسة."
      }
    ]
  },
  {
    id: "139",
    title: "Firebase integration & Ecosystem",
    titleAr: "دمج فيربيز (Firebase) وبيئة عملها",
    level: "8",
    category: "Backend-as-a-Service",
    tags: ["Firebase", "FCM", "Crashlytics", "Analytics", "Remote Config"],
    definition: {
      summary: "هي مجموعة خدمات من جوجل توفر حلولاً سريعة للخادم (Backend) دون الحاجة لكتابة كود سيرفر معقد.",
      detailed: "أشهر خدماتها للفلاتر:\n1. **FCM (Cloud Messaging)**: لإرسال الإشعارات.\n2. **Crashlytics**: لمعرفة أسباب توقف التطبيق (Crashes) عند المستخدمين الحقيقيين.\n3. **Analytics**: لمعرفة سلوك المستخدم في التطبيق.\n4. **Remote Config**: لتغيير ميزة في التطبيق (مثلاً اللون أو سعر المنتج) دون الحاجة لإصدار تحديث جديد للمتجر.",
      analogy: "فيربيز زي (بوفيه مفتوح جاهز): بدل ما تروح تشتري خضار وتطبخ وتغسل أطباق (Back-end من الصفر)، إنت بتروح تختار الأكل اللي يعجبك (الخدمات) وتاكله فوراً، وهي بتوفرلك كل المطبخ والأدوات جاهزة.",
      keyPoints: [
        "Official 'flutterfire' CLI for easy setup",
        "Real-time database and Firestore for NoSQL storage",
        "Authentication supports Google, Apple, and Phone Login easily",
        "Firebase Local Emulator for offline development"
      ],
      codeExample: {
        language: "dart",
        code: `// Initializing Firebase
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}`
      }
    },
    questions: [
      {
        type: "Backend",
        question: "Difference between Firebase Authentication and Firebase Firestore?",
        questionAr: "ما الفرق بين Firebase Authentication و Firebase Firestore؟",
        difficulty: 1,
        expectedAnswer: {
          points: [
            "Authentication مسؤولة فقط عن تسجيل الدخول والتأكد من هوية المستخدم.",
            "Firestore هي قاعدة البيانات التي تخزن معلومات المستخدم الفعلية (الاسم، الطلبات، التعليقات)."
          ],
          timeToAnswer: "1 min"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تستطيع تسريع عملية التطوير (fast-to-market) باستخدام أدوات جاهزة وموثوقة؟"],
      redFlags: ["نسيان إعداد `google-services.json` للاندرويد أو الـ `Plist` للـ iOS."],
      greenFlags: ["ذكر استخدام Cloud Functions لتنفيذ كود برمجي على السيرفر رداً على أحداث معينة."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-basics"],
      nextSteps: [{ id: "140", title: "App Review Guidelines" }],
      related: ["127"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام Firestore بدون تفعيل الـ (Rules) الأمنية.",
        whyWrong: "يسمح ذلك لأي شخص بقرصنة بياناتك ومسح قاعدة البيانات بالكامل لأنها متاحة للجميع (Public).",
        correctApproach: "اكتب قواعد أمان (Security Rules) تسمح فقط للمستخدم المسجل بقراءة وكتابة بياناته الخاصة."
      }
    ]
  },
  {
    id: "140",
    title: "Deployment & Review Guidelines",
    titleAr: "النشر وإرشادات مراجعة المتاجر",
    level: "9",
    category: "Deployment",
    tags: ["AppStore", "PlayStore", "Review", "Guidelines", "Legal"],
    definition: {
      summary: "هي القواعد التي تفرضها آبل وجوجل لقبول نشر تطبيقك في متاجرهم، وتشمل الجوانب التقنية والقانونية والأخلاقية.",
      detailed: "أهم القواعد هي:\n1. **Privacy Policy**: يجب وجود رابط لسياسة الخصوصية.\n2. **Account Deletion**: آبل تفرض وجود زر لحذف الحساب بداخل التطبيق إذا كان يدعم التسجيل.\n3. **Content**: عدم وجود محتوى مضلل أو عنصري.\n4. **App Quality**: ألا يكون التطبيق 'موقع ويب' بسيط بداخل المتصفح (Webview-only)، بل يجب أن يوفر تجربة Native حقيقية.",
      analogy: "نشر التطبيق زي (امتحان رخصة السواقة). مش كفاية إنك بتعرف تسوق (تكتب كود)، لازم تلتزم بقواعد المرور (Guidelines) ويكون معاك طفاية حريق وشنطة إسعافات (Privacy/Legal)، ولو المرور شافك بتخالف، هيسحب منك الرخصة (Reject).",
      keyPoints: [
        "Apple is stricter than Google regarding design and UI",
        "Mandatory 'App Tracking Transparency' for iOS ads",
        "Must provide test account credentials for reviewers",
        "Metadata (Screenshots, Description) must accurately represent the app"
      ],
      codeExample: {
        language: "markdown",
        code: `### App Store Checklist:
- Privacy Policy URL
- Support URL
- Account Deletion Button (Required for Apple)
- High-res Icons and Screenshots`
      }
    },
    questions: [
      {
        type: "Production",
        question: "Why would Apple reject a Flutter app that works perfectly on Android?",
        questionAr: "لماذا قد ترفض آبل تطبيق فلاتر يعمل بشكل مثالي على أندرويد؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "بسبب استخدام 'Material Design' فج في الـ iOS (آبل تفضل تجربة الـ Cupertino).",
            "بسبب عدم وجود زر 'Sign in with Apple' إذا كان التطبيق يدعم تسجيل الدخول عبر طرف ثالث (مثل جوجل أو فيسبوك).",
            "بسبب غياب زر حذف الحساب أو رابط سياسة الخصوصية."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل أنت مطور 'ناضج' (Production-ready) يفهم الخطوات الأخيرة للوصول للجمهور؟"],
      redFlags: ["التفاجئ بمصطلح 'App Review' أو عدم معرفة أن رفع التطبيق قد يستغرق أياماً للمراجعة."],
      greenFlags: ["ذكر كيفية التعامل مع (Refunds) أو اشتراكات (In-App Purchases) بشكل قانوني."]
    },
    linkedCards: {
      prerequisites: ["138"],
      nextSteps: [{ id: "141", title: "System Design for Flutter" }],
      related: ["129"]
    },
    commonPitfalls: [
      {
        mistake: "استخدام ميزة (Hot Update) لتغيير شكل التطبيق أو وظائفه بشكل جذري دون تحديث المتجر.",
        whyWrong: "هذا يخالف اتفاقية آبل وجوجل وقد يؤدي لحذف حساب المطور بالكامل.",
        correctApproach: "استخدم التحديثات البرمجية للميزات الصغيرة (Remote Config) أما التغييرات الجذرية فيجب أن تمر عبر المتجر."
      }
    ]
  },
  {
    id: "141",
    title: "Design Patterns in Flutter",
    titleAr: "أنماط التصميم (Design Patterns) في فلاتر",
    level: "10",
    category: "Architecture",
    tags: ["Design Patterns", "Singleton", "Factory", "Observer", "Architecture"],
    definition: {
      summary: "هي حلول برمجية نموذجية لمشاكل متكررة في تصميم البرمجيات، تساعد في جعل الكود أكثر تنظيماً وقابلية للصيانة.",
      detailed: "أهم الأنماط في فلاتر:\n1. **Singleton**: ضمان وجود نسخة واحدة فقط من كلاس معينة (مثل DatabaseService).\n2. **Factory**: كلاس مسؤولة عن إنشاء كائنات أخرى بناءً على مدخلات (مثل إنشاء Widget تناسب الأندرويد أو الآيفون).\n3. **Observer**: إخطار عدة أطراف عند تغير بيانات معينة (مثل الـ Stream أو ChangeNotifier).",
      analogy: "أنماط التصميم زي (الكتالوج): بدل ما تخترع طريقة لتركيب باب، إنت بتشوف الكتالوج بيقول إيه (النمط) وتنفذه. ده بيضمن إن أي نجار تاني (مبرمج) يجي وراك يفهم إنت عملت إيه بسرعة.",
      keyPoints: [
        "Singleton: One instance per app",
        "Factory: Decouples object creation from usage",
        "Observer: Basis for state management (Streams)",
        "Composition over Inheritance: Preferred in Flutter"
      ],
      codeExample: {
        language: "dart",
        code: `class DatabaseService {
  static final DatabaseService _instance = DatabaseService._internal();
  factory DatabaseService() => _instance; // Singleton pattern
  DatabaseService._internal(); // Private constructor
}`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "When should you avoid using a Singleton?",
        questionAr: "متى يجب عليك تجنب استخدام الـ Singleton؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "عندما تجعل الاختبار (Testing) صعباً، لأنها تحتفظ بحالتها بين الاختبارات وتصعب عملية الـ Mocking.",
            "إذا كانت تسبب (Global State) مبالغ فيه يجعل من الصعب تتبع أين وكيف تتغير البيانات."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل برمجت مشاريع كبيرة تعتمد على أسس هندسية متينة أم مجرد كود عشوائي؟"],
      redFlags: ["عدم معرفة الفرق بين الـ Factory والـ Constructor العادي."],
      greenFlags: ["ذكر أن Flutter نفسه مبني على نمط الـ Composite (Widgets compose other widgets)."]
    },
    linkedCards: {
      prerequisites: ["dart-classes-basics"],
      nextSteps: [{ id: "142", title: "Testing Strategies" }],
      related: ["flutter-clean-architecture"]
    },
    commonPitfalls: [
      {
        mistake: "عمل كل الـ Services كـ Singletons بدون داعٍ.",
        whyWrong: "يؤدي ذلك لزيادة استهلاك الذاكرة لأنها لا تُحذف أبداً وصعوبة بالغة في عمل Unit Tests مستقلة.",
        correctApproach: "استخدم Dependency Injection (مثل GetIt أو Provider) لإدارة كائناتك بشكل أذكى."
      }
    ]
  },
  {
    id: "142",
    title: "Testing Strategies (Unit, Widget, Integration)",
    titleAr: "استراتيجيات الاختبار (الوحدة، الودجت، والتكامل)",
    level: "9",
    category: "Quality Assurance",
    tags: ["Testing", "Unit Test", "Widget Test", "Integration Test", "Mocking"],
    definition: {
      summary: "هي عملية كتابة كود برمي يتأكد من أن كود التطبيق يعمل كما هو متوقع، لضمان استقرار التطبيق بعد التحديثات.",
      detailed: "1. **Unit Test**: اختبار دالة أو كلاس واحدة (Dart only).\n2. **Widget Test**: اختبار الـ Logic البصري لـ Widget معينة دون تشغيل التطبيق بالكامل (استخدام `testWidgets`).\n3. **Integration Test**: اختبار دورة كاملة في التطبيق (مثلاً: تسجيل دخول كامل) على جهاز حقيقي أو محاكي.",
      analogy: "تخيل إنك بتصنع (مروحة). الـ Unit Test هو إنك تجرب الموتور لوحده. الـ Widget Test هو إنك تجرب ريش المروحة مع الموتور وشغلها. الـ Integration Test هو إنك تحط المروحة في أوضة وتشغلها في الكهرباء وتشوفها بتبرد المكان فعلاً ولا لأ.",
      keyPoints: [
        "Unit tests: Fastest, run in VM",
        "Widget tests: Interaction testing without full app",
        "Integration tests: Full environment testing (flutter_test/Patrol)",
        "The Testing Pyramid: More unit tests, fewer integration tests"
      ],
      codeExample: {
        language: "dart",
        code: `testWidgets('Counter increments', (tester) async {
  await tester.pumpWidget(MyApp());
  await tester.tap(find.byIcon(Icons.add));
  await tester.pump();
  expect(find.text('1'), findsOneWidget);
});`
      }
    },
    questions: [
      {
        type: "Testing",
        question: "What is 'Mocking' and why is it used in testing?",
        questionAr: "ما هو الـ Mocking ولماذا يُستخدم في الاختبارات؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "هو استبدال كلاس حقيقية (مثل API service) بنسخة وهمية (Mock) للتحكم في ردود أفعالها.",
            "يُستخدم لعزل الكود الذي نختبره عن العوامل الخارجية (مثل الإنترنت أو قواعد البيانات) ولتسريع الاختبارات."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تثق في الكود الخاص بك؟ وكيف تضمن عدم تعطل التطبيق عند إضافة ميزة جديدة؟"],
      redFlags: ["التفاخر بأنك 'تختبر التطبيق بيدك' بدلاً من كتابة اختبارات آلية."],
      greenFlags: ["ذكر استخدام مكتبات مثل Mockito أو Mocktail لإدارة الـ Mocks."]
    },
    linkedCards: {
      prerequisites: ["dart-basics"],
      nextSteps: [{ id: "143", title: "Performance Profiling" }],
      related: ["138"]
    },
    commonPitfalls: [
      {
        mistake: "إهمال كتابة الاختبارات بدعوى ضيق الوقت.",
        whyWrong: "في المستقبل، سيضيع أضعاف هذا الوقت في محاولة العثور على أخطاء ظهرت بسبب تغيير ميزة أخرى (Regression bugs).",
        correctApproach: "اتبع منهجية الـ TDD (Test Driven Development) أو على الأقل اختبر العمليات الحساسة (مثلاً عمليات الشراء)."
      }
    ]
  },
  {
    id: "143",
    title: "Performance Profiling (DevTools)",
    titleAr: "تحليل الأداء وأدوات المطورين (DevTools)",
    level: "10",
    category: "Optimization",
    tags: ["Performance", "DevTools", "Memory Leak", "FPS", "Profiling"],
    definition: {
      summary: "هي عملية مراقبة استهلاك التطبيق للموارد (RAM, CPU, GPU) باستخدام أدوات متقدمة لاكتشاف البطء أو التهنيج.",
      detailed: "يوفر Flutter DevTools عدة أدوات:\n1. **Flutter Inspector**: لفحص شجرة الـ Widgets.\n2. **Performance View**: لمراقبة معدل الإطارات (FPS) واكتشاف الـ Junction (التعليق الملحوظ).\n3. **Memory View**: لاكتشاف الـ Memory Leaks (بيانات محجوزة في الرام لا تُحذف).\n4. **Network View**: لمراقبة طلبات الـ HTTP وحجم البيانات.",
      analogy: "الـ DevTools هي (جهاز السونار ودراسة الحالة) للدكتور. بدل ما بتخمن المريض تعبان ليه، بتشوف قدامك نبضات القلب والضغط (FPS/Memory) وبتقدر تحدد مكان الوجع (التعليق) بالضبط عشان تعالجه.",
      keyPoints: [
        "Record performance in Profile mode (not Debug)",
        "Look for red bars in the frame charts to find Jank",
        "Use 'Highlight Repaint Rainbow' to see overpainting areas",
        "The timeline shows exactly which function is taking too long"
      ],
      codeExample: {
        language: "bash",
        code: `# Run app in profile mode for accurate metrics
flutter run --profile`
      }
    },
    questions: [
      {
        type: "Performance",
        question: "Difference between UI thread and Raster thread?",
        questionAr: "ما الفرق بين خيط الواجهة (UI thread) وخيط الرسوم (Raster thread)؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ UI thread هو المكان الذي يتم فيه تنفيذ كود الـ Dart وبناء شجرة الـ Widgets.",
            "الـ Raster (GPU) thread هو المسؤول عن تحويل الصور والأشكال لبيكسلات على الشاشة.",
            "إذا كان أحدهما بطيئاً، سيسقط معدل الإطارات (FPS) وتظهر التعليقات (Jank)."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تستطيع حل مشاكل الأداء الصعبة أم أنك تنتظر الصدفة؟"],
      redFlags: ["الاعتماد على جهاز كمبيوتر خارق (Mac M3) للاختبار وعدم فحص الأداء على أجهزة ضعيفة."],
      greenFlags: ["شرح كيفية قراءة الـ (Memory Snapshots) لاكتشاف الـ Memory Leaks."]
    },
    linkedCards: {
      prerequisites: ["121"],
      nextSteps: [{ id: "144", title: "Security Best Practices" }],
      related: ["122"]
    },
    commonPitfalls: [
      {
        mistake: "تحليل الأداء في الـ Debug mode.",
        whyWrong: "الـ Debug mode يحتوي على كود إضافي للفحص (Assertion checks) مما يجعله بطيئاً بطبعه، ولن تعطيك الأرقام فيه انطباعاً صحيحاً عن التطبيق الحقيقي نهائياً.",
        correctApproach: "دائماً استخدم Profile mode (أو Release mode) عند قياس الأداء."
      }
    ]
  },
  {
    id: "144",
    title: "Security Best Practices",
    titleAr: "أفضل ممارسات الحماية والأمن",
    level: "10",
    category: "Security",
    tags: ["Security", "Obfuscation", "SSL Pinning", "Root Detection"],
    definition: {
      summary: "هي مجموعة من التقنيات لحماية بيانات المستخدم ومنع القراصنة من سرقة كود التطبيق أو التلاعب بالبيانات المرسلة للسيرفر.",
      detailed: "أهم ركائز الحماية:\n1. **Obfuscation**: تمويه الكود ليصبح غير قابل للقراءة عند فك ضغطه.\n2. **Secure Storage**: حفظ كلمات السر في مكان محمي (Keystore للجوال، Keychain للآيفون) وليس في SharedPreferences.\n3. **SSL Pinning**: التأكد من أن التطبيق يتحدث مع السيرفر الحقيقي فقط وليس وسيطاً (Man-in-the-middle).\n4. **Root/Jailbreak Detection**: منع التطبيق من العمل على أجهزة تم اختراق حمايتها.",
      analogy: "حماية التطبيق زي (تأمين بنك). الـ Obfuscation زي (تشفير الخزنة): لو حد وصلها مش هيفهم إيه اللي جواها. الـ Secure Storage هي الـ (خزنة نفسها). والـ SSL Pinning هو (عسكري الأمن) اللي بيتأكد من هوية أي حد يدخل البنك.",
      keyPoints: [
        "Obfuscation using --obfuscate flag",
        "Use flutter_secure_storage instead of SharedPreferences for tokens",
        "SSL Pinning prevents 'Man-in-the-middle' attacks",
        "Never hardcode API keys or secrets in Dart files"
      ],
      codeExample: {
        language: "bash",
        code: `# Building with obfuscation
flutter build apk --obfuscate --split-debug-info=./debug_info`
      }
    },
    questions: [
      {
        type: "Security",
        question: "Why shouldn't you store auth tokens in SharedPreferences?",
        questionAr: "لماذا لا يجب تخزين مفاتيح الدخول (Tokens) في SharedPreferences؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "لأن ملف SharedPreferences في أندرويد هو ملف XML عادي يمكن لأي شخص يمتلك صلاحيات Root قراءته بسهولة.",
            "الـ Secure Storage يستخدم تشفيراً من نظام التشغيل نفسه (Hardware-backed) مما يجعله مستحيلاً تقريباً على الاختراق."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل أنت مهنت بمصلحة العميل وسلامة بيانات المستخدمين أم أنك تهتم فقط بالواجهة؟"],
      redFlags: ["الاعتقاد بأن فلاتر محمية 'أوتوماتيكياً' لأنها Build لمصادر native."],
      greenFlags: ["ذكر استخدام مكتبات التشفير مثل (Encrypt) لتشفير البيانات المخزنة محلياً يدوياً."]
    },
    linkedCards: {
      prerequisites: ["126"],
      nextSteps: [{ id: "145", title: "State Management Comparison" }],
      related: ["128"]
    },
    commonPitfalls: [
      {
        mistake: "ترك الـ Debugging Logs مفتوحة في الـ Release build.",
        whyWrong: "تظهر في الـ Logs بيانات حساسة (مثل الـ URL أو الـ Headers) مما يسهل على أي مخترق فهم كيفية عمل السيرفر الخاص بك.",
        correctApproach: "استخدم `kDebugMode` لإظهار الـ Print فقط في حالة التطوير، أو استخدم الـ Logger package."
      }
    ]
  },
  {
    id: "145",
    title: "State Management Comparison",
    titleAr: "مقارنة تقنيات إدارة الحالة (State Management)",
    level: "9",
    category: "Architecture",
    tags: ["State Management", "Provider", "Bloc", "Riverpod", "GetX"],
    definition: {
      summary: "هي مقارنة بين الأدوات المختلفة التي تنظم كيف تتحرك البيانات وتتحدث الواجهة في فلاتر، واختيار الأنسب منها للمشروع.",
      detailed: "1. **Provider**: رسمي ومدعوم، سهل التعلم، ولكنه يعتمد على `BuildContext`.\n2. **Bloc (Business Logic Component)**: الأكثر طلباً في الشركات، يفصل تماماً بين الواجهة والمنطق عبر الـ Events و الـ States، ولكنه يتطلب كوداً كثيراً (Boilerplate).\n3. **Riverpod**: تطور لـ Provider، آمن برمجياً (Compile-safe) ولا يحتاج لـ `context`.\n4. **GetX**: سهل جداً وسريع، يوفر حلولاً شاملة (State, Routing, Service Location)، ولكنه يبتعد قليلاً عن معايير فلاتر الأصلية.",
      analogy: "تخيل إنك (مدرب فريق كورة). الـ State management هي (خطة اللعب): الـ Bloc زي الخطة الدفاعية الصارمة (كل واحد له مكان ومهمة محددة جداً). الـ Provider زي اللعب المفتوح (سهل بس محتاج تركيز). الـ GetX زي (الكرة الشراب في الحارة): سريعة وسهلة وأي حد يلعبها بس مش دايماً بتنفع في الماتشات العالمية.",
      keyPoints: [
        "Choice depends on team size and project complexity",
        "Bloc is best for complex business logic and large teams",
        "Riverpod is the modern choice for clean architecture",
        "Avoid using too many 'Global' states if possible"
      ],
      codeExample: {
        language: "markdown",
        code: `| Pattern  | Difficulty | Boilerplate | Recommended for |
|----------|------------|-------------|-----------------|
| Provider | Low        | Low         | Medium Apps     |
| Bloc     | High       | High        | Enterprise Apps |
| Riverpod | Medium     | Low         | Clean Arch      |
| GetX     | Low        | Very Low    | Fast Mockups    |`
      }
    },
    questions: [
      {
        type: "Architecture/State",
        question: "Why is separation of concerns important in State Management?",
        questionAr: "لماذا يعد 'فصل المسؤوليات' مهماً في إدارة الحالة؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "ليكون الكود قابلاً للاختبار (Testable) بشكل مستقل عن الـ UI.",
            "ليكون من السهل تغيير الـ UI بالكامل (مثلاً من قائمة لشبكة) دون لمس منطق العمل (Business Logic).",
            "لسهولة الصيانة عندما يعمل مبرمجين مختلفين على نفس الصفحة."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل أنت متعصب لأداة واحدة أم أنك محترف يختار الأداة الأفضل حسب الحاجة؟"],
      redFlags: ["الاعتقاد بأن GetX هو الحل الوحيد المثالي لكل شيء في الحياة."],
      greenFlags: ["ذكر أن `setState` ما زالت مفيدة جداً للحالات المحلية البسيطة جداً (Local State)."]
    },
    linkedCards: {
      prerequisites: ["flutter-widgets-basics"],
      nextSteps: [{ id: "146", title: "Advanced Dart" }],
      related: ["60", "65", "70", "75"]
    },
    commonPitfalls: [
      {
        mistake: "إدارة كل حركة في التطبيق (كالـ Validation) عبر Global State Manager.",
        whyWrong: "يؤدي ذلك لإعادة بناء (Rebuild) أجزاء ضخمة من الشجرة بدون داعٍ ويجعل الكود معقداً.",
        correctApproach: "استخدم `StatefulWidget` للحالات التي تخص الـ Widget نفسها فقط، والـ Global States للأمور التي تخص التطبيق بالكامل (محتوى السلة، بيانات المستخدم)."
      }
    ]
  },
  {
    id: "146",
    title: "Advanced Dart Features (Mixins, Extensions, Records)",
    titleAr: "مميزات دارت المتقدمة (Mixins, Extensions, Records)",
    level: "9",
    category: "Dart",
    tags: ["Dart", "Mixins", "Extensions", "Records", "Patterns"],
    definition: {
      summary: "هي قدرات حديثة في لغة Dart تجعل الكود أكثر اختصاراً وقوة، وتسمح بإضافة وظائف لكلاسات موجودة مسبقاً دون تعديلها.",
      detailed: "1. **Mixins**: طريقة لإعادة استخدام كود في عدة كلاسات دون وراثة (Multiple Inheritance).\n2. **Extensions**: إضافة دوال جديدة لكلاسات جاهزة (مثل إضافة دالة `isValidEmail` لكلاس الـ `String`).\n3. **Records**: (جديد في Dart 3) تسمح للدالة بإرجاع أكثر من قيمة في وقت واحد بسهولة.\n4. **Pattern Matching**: طريقة قوية لفحص البيانات والتحكم في مسار الكود.",
      analogy: "دارت المتقدمة زي (السويس آرمي نايف): Mixin زي (المفك) اللي بتركبه في أي يد. Extension زي (الاستيكر) اللي بتلزقه على حاجة وتخلي ليها شكل جديد. Records زي (الشنطة) اللي بتشيل فيها موبايل ومحفظة ومفاتيح وتطلعهم كلهم مرة واحدة.",
      keyPoints: [
        "Use Mixins for cross-cutting concerns (e.g., logging)",
        "Extensions make utility functions more readable",
        "Records avoid creating small helper classes for multiple returns",
        "Sealed classes (Dart 3) for exhaustive switch statements"
      ],
      codeExample: {
        language: "dart",
        code: `// Records example
(String, int) getUser() => ('Ahmed', 25);
var (name, age) = getUser(); // Matching

// Extension example
extension StringExt on String {
  bool get isCapitalized => this[0] == this[0].toUpperCase();
}`
      }
    },
    questions: [
      {
        type: "Dart",
        question: "Difference between a Mixin and an Interface in Dart?",
        questionAr: "ما الفرق بين الـ Mixin والـ Interface في دارت؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "الـ Interface في دارت هو أي كلاس، ويجب عليك إعادة كتابة (Override) كل دوالها.",
            "الـ Mixin يسمح لك بمشاركة التنفيذ الفعلي (Implementation) للدوال، أي أنك لا تحتاج لإعادة كتابة الكود، بل تستخدمه مباشرة بكلمة `with`."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تتابع تحديثات اللغة وتستخدم أحدث الطرق لجعل الكود أنظف وأسرع؟"],
      redFlags: ["عدم سماعك عن Dart 3 أو ميزات الـ Null Safety المتقدمة."],
      greenFlags: ["ذكر استخدام الـ Sealed classes لضمان تغطية كل الحالات في الـ UI."]
    },
    linkedCards: {
      prerequisites: ["dart-classes-basics"],
      nextSteps: [{ id: "147", title: "Concurrency & Isolates" }],
      related: ["base-dart"]
    },
    commonPitfalls: [
      {
        mistake: "الإسراف في استخدام الـ Extensions في كل مكان.",
        whyWrong: "يجعل الكود مبهماً للمطورين الجدد الذين لن يفهموا من أين تأتي هذه الدوال، وقد يسبب تضارباً في الأسماء (Naming conflicts).",
        correctApproach: "استخدم الـ Extensions للعمليات الشائعة جداً والمكررة فقط."
      }
    ]
  },
  {
    id: "147",
    title: "Concurrency, Isolates & Compute",
    titleAr: "التزامن، الـ Isolates، ودالة Compute",
    level: "10",
    category: "performance",
    tags: ["Concurrency", "Isolates", "Compute", "Async", "Multi-threading"],
    definition: {
      summary: "هي كيفية تشغيل مهام ثقيلة في خلفية المعالج دون التأثير على نعومة واجهة التطبيق (60/120 FPS).",
      detailed: "فلاتر تعمل بخيط واحد (Single Thread). إذا قمت بعملية معالجة صور ثقيلة على هذا الخيط، سيتوقف التطبيق (Freeze). الحل هو الـ **Isolates**: وهي وحدات عمل منفصلة لها ذاكرتها الخاصة.\n- **compute()**: دالة سهلة لتشغيل وظيفة في Isolate آخر وإرجاع النتيجة.\n- **Isolate.spawn()**: للطرق المتقدمة التي تحتاج تواصل مستمر عبر الـ Ports.",
      analogy: "التطبيق زي (طباخ واحد في مطبخ). لو الطباخ ده قعد يقطع البصل (عملية ثقيلة)، مش هيعرف يقلب الزيت (الـ UI) والاكل هيتحرق. الـ Isolate هو إنك تجيب (مساعد شيف) في مطبخ تاني خالص يقطع البصل ويبعتلك البصل جاهز (النتيجة) وإنت تكمل طبخك بسلام.",
      keyPoints: [
        "Dart is single-threaded by default using an Event Loop",
        "Isolates do not share memory (no race conditions)",
        "Use compute for short, heavy tasks (JSON parsing large lists)",
        "Communication between isolates uses SendPort and ReceivePort"
      ],
      codeExample: {
        language: "dart",
        code: `// Using compute to parse JSON in background
Future<List<User>> loadUsers() async {
  final jsonString = await getJsonFromServer();
  return compute(parseUsers, jsonString); // Runs in separate Isolate
}

List<User> parseUsers(String json) => ...;`
      }
    },
    questions: [
      {
        type: "Performance",
        question: "Why don't Isolates share memory like threads in Java/C++?",
        questionAr: "لماذا لا تتشارك الـ Isolates الذاكرة مثل الـ Threads في جافا أو C++؟",
        difficulty: 5,
        expectedAnswer: {
          points: [
            "لتجنب مشاكل الـ (Shared State) والـ (Deadlocks) التي تسبب كوارث برمجية.",
            "للسماح للـ Garbage Collector بالعمل في كل Isolate بشكل مستقل دون إيقاف التطبيق بالكامل (No stop-the-world pauses)."
          ],
          timeToAnswer: "4 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تستطيع بناء تطبيقات تتعامل مع كميات بيانات ضخمة دون أن يشعر المستخدم ببطء؟"],
      redFlags: ["الاعتقاد بأن الـ `async/await` تفتح خيطاً جديداً (Thread) أوتوماتيكياً."],
      greenFlags: ["شرح كيفية عمل الـ Event Loop في دارت."]
    },
    linkedCards: {
      prerequisites: ["122"],
      nextSteps: [{ id: "148", title: "Platform Views" }],
      related: ["143"]
    },
    commonPitfalls: [
      {
        mistake: "محاولة استخدام الـ `BuildContext` أو الـ UI Widgets داخل الـ Isolate.",
        whyWrong: "الـ Isolate لا يملك وصولاً لذاكرة الـ UI، وسيفشل الكود فوراً.",
        correctApproach: "أرسل البيانات الخام (Raw data) فقط للـ Isolate، وخذ منه النتائج الخام، ثم حدث الواجهة في الخيط الرئيسي."
      }
    ]
  },
  {
    id: "148",
    title: "Platform Views (Google Maps, WebView)",
    titleAr: "واجهات المنصات (Platform Views)",
    level: "9",
    category: "Native Integration",
    tags: ["PlatformViews", "Google Maps", "WebView", "Native", "AndroidView"],
    definition: {
      summary: "هي تقنية تسمح بوضع (Widgets) أصلية من أندرويد أو آيفون (Native) داخل شجرة فلاتر.",
      detailed: "عندما تحتاج لميزة معقدة جداً وموجودة بالفعل بـ Java/Swift (مثل خرائط جوجل أو متصفح الويب)، يتم استخدام `AndroidView` أو `UiKitView`. يقوم فلاتر بحجز مساحة على الشاشة ويطلب من النظام رسم الواجهة الأصلية بداخلها.",
      analogy: "الـ Platform View زي (شباك في حيطة): التطبيق كله مبني بطوب فلاتر، بس إنت سبت مكان (شباك) عشان تشوف منه ميزة تانية من بره (Native) زي خرائط جوجل.",
      keyPoints: [
        "Essential for Google Maps, WebViews, and high-end Video Players",
        "Higher performance cost than pure Flutter widgets",
        "Hybrid Composition vs Texture Layer: different ways to render",
        "Keyboard issues are common in Platform Views"
      ],
      codeExample: {
        language: "dart",
        code: `// Simple WebView widget usage
Widget build(BuildContext context) {
  return WebView(
    initialUrl: 'https://flutter.dev',
  );
}`
      }
    },
    questions: [
      {
        type: "Engineering",
        question: "When should you avoid using Platform Views?",
        questionAr: "متى يجب عليك تجنب استخدام الـ Platform Views؟",
        difficulty: 3,
        expectedAnswer: {
          points: [
            "عندما يمكنك بناء نفس الواجهة باستخدام فلاتر (Pure Widgets)، لأن الـ Platform view تستهلك RAM أكثر وتبطئ الـ scrolling.",
            "إذا كنت ستحتاج لوضع عدد كبير منها في قائمة واحدة (List)؛ سيؤدي ذلك لتعليق التطبيق (Jank)."
          ],
          timeToAnswer: "2 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل تفهم كيف يتم الرسم (Rendering) خلف الكواليس؟"],
      redFlags: ["الارتباك عند سؤالك عن الفرق في الأداء بين Google Maps و Flutter widgets."],
      greenFlags: ["ذكر استخدام الـ Method Channels للتواصل مع هذه الواجهات الأصلية."]
    },
    linkedCards: {
      prerequisites: ["132"],
      nextSteps: [{ id: "149", title: "Flutter Internals" }],
      related: ["131"]
    },
    commonPitfalls: [
      {
        mistake: "توقع أن الـ Platform view ستتعامل مع الـ Touch events بنفس سلاسة فلاتر دائماً.",
        whyWrong: "هناك تأخير بسيط (Latency) في إرسال اللمسات من فلاتر للنظام الأصلي والعكس.",
        correctApproach: "استخدم مكتبات موجهة لفلاتر (Flutter-first) إذا كانت متاحة (مثلاً استخدام `video_player` بدلاً من native player لو أمكن)."
      }
    ]
  },
  {
    id: "149",
    title: "Flutter Internals (Engine, Skia, Impeller)",
    titleAr: "بنية فلاتر الداخلية (Engine, Skia, Impeller)",
    level: "10",
    category: "Architecture",
    tags: ["Engine", "Skia", "Impeller", "Rendering", "C++"],
    definition: {
      summary: "هي الطبقة العميقة تحت كود الـ Dart، المسؤولة عن تحويل الـ Widgets إلى رسومات حقيقية على الشاشة.",
      detailed: "1. **Framework (Dart)**: الطبقة التي نكتب فيها (Widgets, Animation).\n2. **Engine (C++)**: محرك فلاتر الذي يحتوي على المحرك الرسومي.\n3. **Skia**: المحرك القديم للرسم.\n4. **Impeller**: المحرك الحديث (iOS أولاً ثم Android) الذي يحل مشكلة الـ (Shader Compilation Jank) ويقدم أداءً مذهلاً.",
      analogy: "فلاتر زي (لعبة فيديو): الـ Dart هو (سيناريو اللعبة وشخصياتها). الـ Engine هو (محرك اللعبة - Unreal Engine مثلاً). الـ Impeller هو (كارت الشاشة الجديد) اللي بيخلي الرسوم ناعمة جداً ومفيهاش تقطيع.",
      keyPoints: [
        "Skia uses just-in-time shader compilation (causes jank)",
        "Impeller pre-compiles shaders (solves jank)",
        "Flutter doesn't use native OEM widgets, it draws everything pixel by pixel",
        "Layer tree is sent from Dart to Engine for compositing"
      ],
      codeExample: {
        language: "bash",
        code: `# Checking if Impeller is enabled (on iOS)
flutter run --enable-impeller`
      }
    },
    questions: [
      {
        type: "Architecture",
        question: "How does Flutter draw on the screen?",
        questionAr: "كيف يقوم فلاتر بالرسم على الشاشة؟",
        difficulty: 4,
        expectedAnswer: {
          points: [
            "يقوم بتحويل شجرة الـ Widgets إلى RenderObjects.",
            "الـ RenderObjects تكون شجرة طبقات (Layer Tree).",
            "يتم إرسالها للمحرك (Skia/Impeller) الذي يستخدم الـ GPU لرسم كل بيكسل."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل أنت مطور 'سطحي' أم أنك تفهم التكنولوجيا التي تعمل بها بعمق؟"],
      redFlags: ["الاعتقاد بأن فلاتر يحول الكود لـ Java/Swift UI widgets."],
      greenFlags: ["شرح عملية الـ Rendering Pipeline (Animate -> Build -> Layout -> Paint)."]
    },
    linkedCards: {
      prerequisites: ["121"],
      nextSteps: [{ id: "150", title: "Career & Portfolio Tips" }],
      related: ["122"]
    },
    commonPitfalls: [
      {
        mistake: "القلق المبالغ فيه بشأن الأداء في تطبيقات بسيطة.",
        whyWrong: "محرك فلاتر سريع جداً بطبعه لدرجة أن 90% من التطبيقات لا تحتاج لهذه المعرفة العميقة لتعمل بسلاسة.",
        correctApproach: "ركز على كتابة كود نظيف، والجأ للمحرك والتحسينات العميقة فقط عندما تلاحظ مشكلة حقيقية."
      }
    ]
  },
  {
    id: "150",
    title: "Career Advice & Interview Tips",
    titleAr: "نصائح مهنية للمقابلات الشخصية",
    level: "8",
    category: "Career",
    tags: ["Career", "Interview", "Portfolio", "Soft Skills", "Success"],
    definition: {
      summary: "هي استراتيجيات للنجاح في الحصول على وظيفة مبرمج فلاتر، تتجاوز مجرد معرفة الكود.",
      detailed: "1. **Portfolio**: ابني 3 مشاريع كاملة ومرفوعة على GitHub بـ (Clean Architecture).\n2. **Communication**: اشرح 'لماذا' اخترت هذا الحل وليس فقط 'كيف' يعمل.\n3. **Problem Solving**: في الاختبار التقني، فكر بصوت عالٍ حتى لو لم تصل للحل النهائي.\n4. **Continuous Learning**: اذكر آخر مقال قرأته أو تحديث تابعته في فلاتر.",
      analogy: "المقابلة زي (نهائي كاس): التمرين (الكود) مهم، بس الروح والثقة والتركيز في المباراة (المقابلة) هما اللي بيجيبوا الكاس (الوظيفة).",
      keyPoints: [
        "Quality over Quantity in GitHub",
        "Soft skills are as important as technical skills",
        "Be honest about what you don't know",
        "Explain your logic before writing code"
      ],
      codeExample: {
        language: "markdown",
        code: `### Star Method for Questions:
- **S**ituation: Describe the context.
- **T**ask: What was the goal?
- **A**ction: What did YOU do?
- **R**esult: What was the positive outcome?`
      }
    },
    questions: [
      {
        type: "Behavioral",
        question: "How do you handle a bug you can't solve for days?",
        questionAr: "كيف تتعامل مع 'بقة' (Bug) لا تستطيع حلها لعدة أيام؟",
        difficulty: 2,
        expectedAnswer: {
          points: [
            "البحث في التوثيق الرسمي و StackOverflow.",
            "تبسيط المشكلة في مشروع جديد صغير (Minimal Reproducible Example).",
            "طلب المساعدة من زملاء الفريق أو المجتمعات البرمجية.",
            "أخذ استراحة والعودة بعقل صافٍ."
          ],
          timeToAnswer: "3 mins"
        }
      }
    ],
    interviewerMind: {
      whatTheyWant: ["هل أنت شخص مريح في العمل (Team player) ومستعد للتعنم؟"],
      redFlags: ["التكبر أو ادعاء معرفة كل شيء."],
      greenFlags: ["إظهار الشغف (Passion) تجاه حل المشاكل وليس فقط كتابة الكود."]
    },
    linkedCards: {
      prerequisites: ["01"],
      nextSteps: [],
      related: []
    },
    commonPitfalls: [
      {
        mistake: "إهمال الـ LinkedIn والـ Personal Brand.",
        whyWrong: "أغلب الفرص الممتازة تأتي عبر العلاقات والظهور الاحترافي وليس فقط التقديم التقليدي.",
        correctApproach: "شارك ما تتعلمه، وحدث بروفايلك باستمرار، وتواصل مع الشركات باحترام."
      }
    ]
  },
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
  cards.forEach(card => {
    if (card.tags && Array.isArray(card.tags)) {
      card.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
};

export const getAllCompanies = (): string[] => {
  const companies = new Set<string>();
  cards.forEach(card => {
    if (card.companyTags && Array.isArray(card.companyTags)) {
      card.companyTags.forEach(company => companies.add(company));
    }
  });
  return Array.from(companies).sort();
};

export const getPrerequisites = (cardId: string): Card[] => {
  const card = getCardById(cardId);
  if (!card) return [];
  return cards.filter(c => card.linkedCards?.prerequisites?.includes(c.id) ?? false);
};

export const getNextSteps = (cardId: string): Card[] => {
  const card = getCardById(cardId);
  if (!card) return [];
  return cards.filter(c => card.linkedCards?.nextSteps?.some(ns => ns.id === c.id) ?? false);
};
