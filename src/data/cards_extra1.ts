// @ts-nocheck
import type { Card } from '@/types/card';

// ==================== LEVEL 4: DATA STRUCTURES (46-55) ====================
export const cardsExtra1: Card[] = [
  {
    id: "list-advanced",
    number: 46,
    title: "List Advanced Operations",
    titleAr: "عمليات القائمة المتقدمة",
    level: "Junior",
    frequency: "Very Common",
    tags: ["Dart", "Data Structures"],
    definition: {
      summary: "Advanced List operations: sort, where, map, reduce, fold, expand",
      detailed: "Dart Lists support functional operations. sort() mutates in place, while map/where/reduce return iterables. Use toList() to materialize.",
      analogy: "List operations are like assembly line steps — each step transforms the data without affecting the original conveyor belt.",
      keyPoints: ["sort() mutates original", "map/where/reduce return Iterable", "Use toList() to materialize", "expand() flattens nested lists", "fold() accumulates values", "every/any/contains for boolean checks"],
      codeExample: {
        language: "dart",
        code: `final nums = [3,1,4,1,5,9];
nums.sort(); // [1,1,3,4,5,9]

final evens = nums.where((n) => n % 2 == 0).toList();
final doubled = nums.map((n) => n * 2).toList();
final sum = nums.fold(0, (a, b) => a + b);
final flat = [[1,2],[3,4]].expand((e) => e).toList();

// Remove duplicates
final unique = nums.toSet().toList();`
      }
    },
    questions: [
      { type: "Practical", question: "Write a function to remove duplicates from a List while preserving order", questionAr: "اكتب دالة لإزالة المكررات مع الحفاظ على الترتيب", difficulty: 2, expectedAnswer: { points: ["Use LinkedHashSet", "toSet().toList() loses order"], timeToAnswer: "2-3 minutes" } },
      { type: "Theoretical", question: "What is the difference between sort() and sorted in Dart?", questionAr: "ما الفرق بين sort() والـ sorted في Dart؟", difficulty: 2, expectedAnswer: { points: ["sort() mutates in place", "No built-in sorted() — use [...list]..sort()"], timeToAnswer: "1-2 minutes" } },
      { type: "Practical", question: "Implement groupBy for a list of objects", questionAr: "نفذ groupBy لقائمة من الكائنات", difficulty: 3, expectedAnswer: { points: ["Use fold with Map", "Check if key exists before adding"], timeToAnswer: "3-4 minutes" } },
      { type: "Deep Dive", question: "What is the time complexity of List.sort() in Dart?", questionAr: "ما تعقيد وقت List.sort() في Dart؟", difficulty: 4, expectedAnswer: { points: ["O(n log n)", "Uses TimSort algorithm", "Stable sort"], timeToAnswer: "2-3 minutes" } },
      { type: "Critical Thinking", question: "When would you use List vs Set vs Map for storing user data?", questionAr: "متى تستخدم List مقابل Set مقابل Map لتخزين بيانات المستخدم؟", difficulty: 3, expectedAnswer: { points: ["List for ordered/duplicates", "Set for unique IDs", "Map for key-value lookups"], timeToAnswer: "2-3 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يعرف الفرق بين mutating و non-mutating operations", "يستخدم functional style"], redFlags: ["يستخدم for loops بدل map/where", "ينسى toList()"], greenFlags: ["يذكر time complexity", "يستخدم spread + set للـ deduplication"] },
    linkedCards: { prerequisites: ["collections-generics"], nextSteps: [{ id: "map-set-advanced", title: "Map & Set Advanced" }], related: [{ id: "algorithm-basics", title: "Algorithm Basics" }] },
    commonPitfalls: [{ mistake: "تعديل List أثناء الـ iteration", whyWrong: "يسبب ConcurrentModificationError", correctApproach: "اعمل copy أو استخدم removeWhere" }],
    answerStrategy: { structure: ["اذكر العملية", "اشرح التعقيد", "اديه مثال كود", "اذكر البديل"], timeAllocation: { junior: "2-3 دق", mid: "3-4 دق", senior: "5 دق" }, keyPhrases: ["O(n log n)", "immutable operations", "functional style"] },
    quickRevision: { bulletPoints: ["sort() = mutates", "map/where = returns Iterable", "fold = accumulate", "expand = flatten"], memoryHook: "map/where/reduce = functional trinity", cheatSheet: "sort() | map() | where() | fold() | expand() | toSet().toList()" }
  },

  {
    id: "map-set-advanced",
    number: 47,
    title: "Map & Set Advanced",
    titleAr: "Map و Set المتقدم",
    level: "Junior",
    frequency: "Common",
    tags: ["Dart", "Data Structures"],
    definition: {
      summary: "HashMap, LinkedHashMap, SplayTreeMap and Set variants with complexity",
      detailed: "Dart's Map is LinkedHashMap by default (insertion-ordered). HashMap is unordered but O(1). SplayTreeMap is sorted O(log n). Sets mirror this.",
      analogy: "HashMap = unsorted drawer, LinkedHashMap = drawer with labels in order, SplayTreeMap = sorted filing cabinet",
      keyPoints: ["Map default = LinkedHashMap", "HashMap = O(1) lookup unordered", "SplayTreeMap = sorted O(log n)", "Set default = LinkedHashSet", "putIfAbsent for safe inserts", "update() for value transformation"],
      codeExample: {
        language: "dart",
        code: `import 'dart:collection';
final map = <String, int>{}; // LinkedHashMap
final hash = HashMap<String, int>(); // unordered
final tree = SplayTreeMap<String, int>(); // sorted

map.putIfAbsent('key', () => 42);
map.update('key', (v) => v + 1, ifAbsent: () => 1);
map.entries.map((e) => '\${e.key}: \${e.value}').join(', ');

// Frequency counter
final freq = <String, int>{};
for (var w in words) freq.update(w, (v) => v+1, ifAbsent: () => 1);`
      }
    },
    questions: [
      { type: "Theoretical", question: "What Map implementation is the default in Dart and why?", questionAr: "ما هو الـ Map الافتراضي في Dart ولماذا؟", difficulty: 2, expectedAnswer: { points: ["LinkedHashMap", "Preserves insertion order", "Good general-purpose choice"], timeToAnswer: "1-2 minutes" } },
      { type: "Practical", question: "Count word frequency in a list using Map", questionAr: "احسب تكرار الكلمات في قائمة باستخدام Map", difficulty: 2, expectedAnswer: { points: ["Use update() or putIfAbsent()", "Convert to entries for sorting"], timeToAnswer: "2-3 minutes" } },
      { type: "Deep Dive", question: "Explain the time complexity of HashMap vs SplayTreeMap", questionAr: "اشرح تعقيد الوقت في HashMap مقارنة بـ SplayTreeMap", difficulty: 4, expectedAnswer: { points: ["HashMap: O(1) avg", "SplayTreeMap: O(log n)", "SplayTree self-adjusts for recent access"], timeToAnswer: "3-4 minutes" } },
      { type: "Practical", question: "Implement an LRU cache using Map", questionAr: "نفذ LRU cache باستخدام Map", difficulty: 4, expectedAnswer: { points: ["LinkedHashMap with accessOrder", "Remove oldest when full", "O(1) get and put"], timeToAnswer: "5 minutes" } },
      { type: "Critical Thinking", question: "When would you choose SplayTreeMap over HashMap?", questionAr: "متى تختار SplayTreeMap على HashMap؟", difficulty: 4, expectedAnswer: { points: ["When sorted order matters", "Range queries", "Frequent access to recent keys"], timeToAnswer: "2-3 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يفهم الـ underlying data structures", "يعرف متى يستخدم أي implementation"], redFlags: ["يستخدم Map دايمًا بدون تفكير", "لا يعرف LinkedHashMap"], greenFlags: ["يذكر HashMap للـ performance", "يفكر في الـ use case قبل الاختيار"] },
    linkedCards: { prerequisites: ["list-advanced"], nextSteps: [{ id: "time-complexity", title: "Time Complexity" }], related: [{ id: "collections-generics", title: "Collections & Generics" }] },
    commonPitfalls: [{ mistake: "استخدام == لمقارنة Maps", whyWrong: "بيقارن reference مش content", correctApproach: "استخدم mapEquals من flutter/foundation" }],
    answerStrategy: { structure: ["اذكر الـ implementation", "اشرح الـ complexity", "امتى تستخدم كل واحد"], timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "4 دق" }, keyPhrases: ["O(1) lookup", "insertion-ordered", "frequency counter"] },
    quickRevision: { bulletPoints: ["LinkedHashMap = default", "HashMap = fast unordered", "SplayTreeMap = sorted", "putIfAbsent = safe insert"], memoryHook: "Hash=fast, Tree=sorted, Linked=ordered", cheatSheet: "HashMap O(1) | SplayTreeMap O(log n) | LinkedHashMap = default" }
  },

  {
    id: "time-complexity",
    number: 48,
    title: "Time Complexity",
    titleAr: "تعقيد الوقت (Big O)",
    level: "Mid",
    frequency: "Critical",
    tags: ["Algorithms", "Data Structures", "Performance"],
    definition: {
      summary: "Big O notation: O(1), O(log n), O(n), O(n log n), O(n²)",
      detailed: "Time complexity describes how an algorithm's runtime grows with input size. Used to compare algorithm efficiency and qualify for senior positions.",
      analogy: "O(1) = elevator (same time regardless of floor count). O(n) = stairs (more floors = more time). O(n²) = checking every room on every floor.",
      keyPoints: ["O(1): constant — array index, HashMap lookup", "O(log n): binary search, balanced tree", "O(n): linear scan, list iteration", "O(n log n): merge sort, heap sort", "O(n²): nested loops, bubble sort", "Space complexity matters too"],
      codeExample: {
        language: "dart",
        code: `// O(1) - Constant
int getFirst(List<int> list) => list[0];

// O(n) - Linear
int findMax(List<int> list) {
  int max = list[0];
  for (var n in list) if (n > max) max = n;
  return max;
}

// O(n log n) - Merge Sort
List<int> mergeSort(List<int> list) {
  if (list.length <= 1) return list;
  final mid = list.length ~/ 2;
  return merge(mergeSort(list.sublist(0, mid)),
               mergeSort(list.sublist(mid)));
}

// O(n²) - Nested loop (avoid!)
bool hasDuplicates(List<int> list) {
  for (var i = 0; i < list.length; i++)
    for (var j = i+1; j < list.length; j++)
      if (list[i] == list[j]) return true;
  return false;
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "What is the time complexity of List.contains() in Dart?", questionAr: "ما تعقيد وقت List.contains() في Dart؟", difficulty: 2, expectedAnswer: { points: ["O(n) — linear search", "Use Set.contains() for O(1)"], timeToAnswer: "1-2 minutes" } },
      { type: "Practical", question: "Optimize this O(n²) duplicate-check to O(n)", questionAr: "حسّن هذا الكود من O(n²) لـ O(n)", difficulty: 3, expectedAnswer: { points: ["Use a Set to track seen elements", "One pass through the list"], timeToAnswer: "3-4 minutes" } },
      { type: "Deep Dive", question: "What is amortized complexity and when does it apply?", questionAr: "ما هو الـ amortized complexity ومتى يُطبَّق؟", difficulty: 5, expectedAnswer: { points: ["Average over sequence of operations", "List.add() is amortized O(1)", "Dynamic array doubling"], timeToAnswer: "3-5 minutes" } },
      { type: "System Design", question: "You have 1M users — design a birthday notification system with O(1) lookup", questionAr: "عندك مليون مستخدم — صمم نظام إشعارات أعياد الميلاد بـ O(1) lookup", difficulty: 4, expectedAnswer: { points: ["HashMap<date, List<users>>", "Pre-group by date", "Check today's key directly"], timeToAnswer: "5 minutes" } },
      { type: "Critical Thinking", question: "When is O(n²) acceptable in production code?", questionAr: "متى يكون O(n²) مقبولاً في الـ production؟", difficulty: 3, expectedAnswer: { points: ["Small n (< 100 items)", "Simpler code with no perf issue", "Initial version before optimization"], timeToAnswer: "2-3 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يعرف يحسب التعقيد", "يعرف يحسّن الكود"], redFlags: ["لا يعرف Big O أصلاً", "يقول O(n) لكل حاجة"], greenFlags: ["يفكر في space complexity", "يذكر amortized complexity", "يقترح Set عوضًا عن nested loop"] },
    linkedCards: { prerequisites: ["map-set-advanced"], nextSteps: [{ id: "sorting-algorithms", title: "Sorting Algorithms" }], related: [{ id: "list-advanced", title: "List Advanced" }] },
    commonPitfalls: [{
      mistake: "استخدام List.contains() في loop", whyWrong: "يعمل O(n²) بدون ما تحس", correctApproach: "حوّل اللست لـ Set قبل الـ lookup"
    }],
    answerStrategy: { structure: ["عرّف Big O", "ادي أمثلة لكل نوع", "وضح كيف تُحسّن الكود"], timeAllocation: { junior: "2-3 دق", mid: "3-4 دق", senior: "5-7 دق" }, keyPhrases: ["time complexity", "space complexity", "amortized O(1)", "trade-off"] },
    quickRevision: { bulletPoints: ["O(1)=constant", "O(log n)=binary search", "O(n)=linear", "O(n log n)=sort", "O(n²)=nested loops"], memoryHook: "1 < log n < n < n log n < n²", cheatSheet: "HashMap=O(1) | List.contains=O(n) | sort=O(n log n)" }
  },

  {
    id: "sorting-algorithms",
    number: 49,
    title: "Sorting Algorithms",
    titleAr: "خوارزميات الترتيب",
    level: "Mid",
    frequency: "Common",
    tags: ["Algorithms", "Data Structures"],
    definition: {
      summary: "Bubble, Selection, Insertion, Merge, Quick Sort — when to use each",
      detailed: "Dart's built-in sort uses TimSort (O(n log n), stable). Understanding sorting algorithms helps in interviews and optimizing custom comparisons.",
      analogy: "Sorting cards in your hand: Insertion sort = pick up one by one and insert in order. Merge sort = split deck, sort halves, merge.",
      keyPoints: ["Bubble Sort: O(n²) — avoid", "Insertion Sort: O(n²) best O(n) for nearly sorted", "Merge Sort: O(n log n) stable", "Quick Sort: O(n log n) avg O(n²) worst", "TimSort: hybrid Merge+Insertion used by Dart", "Stable sort: preserves equal element order"],
      codeExample: {
        language: "dart",
        code: `// Insertion Sort — good for small/nearly sorted
void insertionSort(List<int> list) {
  for (var i = 1; i < list.length; i++) {
    final key = list[i];
    var j = i - 1;
    while (j >= 0 && list[j] > key) {
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = key;
  }
}

// Custom comparator in Dart
final users = [User(name: 'B', age: 30), User(name: 'A', age: 25)];
users.sort((a, b) => a.name.compareTo(b.name)); // alphabetical
users.sort((a, b) => b.age.compareTo(a.age)); // age descending`
      }
    },
    questions: [
      { type: "Theoretical", question: "What sorting algorithm does Dart use internally?", questionAr: "ما خوارزمية الترتيب التي تستخدمها Dart داخلياً؟", difficulty: 2, expectedAnswer: { points: ["TimSort", "Hybrid of Merge + Insertion Sort", "Stable, O(n log n)"], timeToAnswer: "1-2 minutes" } },
      { type: "Practical", question: "Sort a list of users by multiple criteria (age then name)", questionAr: "رتّب قائمة مستخدمين بمعيارين (العمر ثم الاسم)", difficulty: 3, expectedAnswer: { points: ["Chain comparisons in comparator", "Return a.age.compareTo(b.age) || a.name.compareTo(b.name)"], timeToAnswer: "2-3 minutes" } },
      { type: "Deep Dive", question: "Why is Merge Sort preferred over Quick Sort in practice?", questionAr: "لماذا يُفضَّل Merge Sort على Quick Sort عملياً؟", difficulty: 4, expectedAnswer: { points: ["Merge Sort is stable", "Predictable O(n log n)", "Quick Sort has O(n²) worst case"], timeToAnswer: "3-4 minutes" } },
      { type: "Practical", question: "Implement a comparator that sorts cards by frequency then level", questionAr: "نفذ comparator يرتب الكروت حسب التكرار ثم المستوى", difficulty: 3, expectedAnswer: { points: ["Define ordering maps", "Chain comparisons"], timeToAnswer: "3-4 minutes" } },
      { type: "Critical Thinking", question: "When would you implement a custom sort instead of using List.sort()?", questionAr: "متى تنفذ sort مخصص بدلاً من List.sort()؟", difficulty: 3, expectedAnswer: { points: ["Complex multi-key comparison", "Performance-critical custom data structure", "External sort for huge data"], timeToAnswer: "2-3 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يفهم متى يستخدم أي algorithm", "يعرف يكتب custom comparator"], redFlags: ["يقول bubble sort للـ production", "لا يعرف stable sort"], greenFlags: ["يذكر TimSort", "يكتب clean comparator"] },
    linkedCards: { prerequisites: ["time-complexity"], nextSteps: [{ id: "search-algorithms", title: "Search Algorithms" }], related: [] },
    commonPitfalls: [{ mistake: "نسيان stable sort في الـ UI", whyWrong: "يغير ترتيب عناصر متساوية ويؤثر على UX", correctApproach: "استخدم Dart's built-in sort (stable)" }],
    answerStrategy: { structure: ["اذكر الـ algorithm", "اشرح الـ complexity", "متى تستخدمه", "Dart specifics"], timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "4 دق" }, keyPhrases: ["TimSort", "stable sort", "O(n log n)", "custom comparator"] },
    quickRevision: { bulletPoints: ["Dart uses TimSort", "Stable = preserves equal order", "Custom comparator with sort()", "Merge > Quick (stable)"], memoryHook: "Tim = Time (efficient) Sort", cheatSheet: "list.sort((a,b) => a.x.compareTo(b.x))" }
  },

  {
    id: "search-algorithms",
    number: 50,
    title: "Search Algorithms",
    titleAr: "خوارزميات البحث",
    level: "Mid",
    frequency: "Common",
    tags: ["Algorithms", "Data Structures"],
    definition: {
      summary: "Linear Search O(n) vs Binary Search O(log n) and when to use each",
      detailed: "Linear search scans sequentially. Binary search requires sorted data but is O(log n). In Flutter, used for filtering large data sets.",
      analogy: "Linear search = checking every page in a book. Binary search = opening the middle, deciding left or right, repeating.",
      keyPoints: ["Linear: O(n), works on unsorted", "Binary: O(log n), requires sorted", "Dart has binarySearch in collection package", "Interpolation search for uniformly distributed data", "Hash-based: O(1) with Set/Map"],
      codeExample: {
        language: "dart",
        code: `import 'package:collection/collection.dart';

final sorted = [1, 3, 5, 7, 9, 11];

// Binary search — returns index or -1
final idx = binarySearch(sorted, 7); // 3

// Manual binary search
int bSearch(List<int> list, int target) {
  int lo = 0, hi = list.length - 1;
  while (lo <= hi) {
    final mid = (lo + hi) ~/ 2;
    if (list[mid] == target) return mid;
    if (list[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "When can you NOT use binary search?", questionAr: "متى لا تستطيع استخدام البحث الثنائي؟", difficulty: 2, expectedAnswer: { points: ["Unsorted data", "Linked lists (no O(1) index access)", "Dynamic data that changes frequently"], timeToAnswer: "1-2 minutes" } },
      { type: "Practical", question: "Implement binary search for a sorted list of cards by number", questionAr: "نفذ Binary Search على قائمة كروت مرتبة برقمها", difficulty: 3, expectedAnswer: { points: ["Sort by card.number first", "Compare mid.number with target"], timeToAnswer: "3-4 minutes" } },
      { type: "System Design", question: "Design a search for 1M products with fuzzy matching", questionAr: "صمم بحثاً لمليون منتج مع fuzzy matching", difficulty: 5, expectedAnswer: { points: ["Trie or inverted index", "Fuse.js / Algolia for fuzzy", "Cache frequent queries"], timeToAnswer: "5-7 minutes" } },
      { type: "Deep Dive", question: "How does Fuse.js work and what is its time complexity?", questionAr: "كيف يعمل Fuse.js وما تعقيد وقته؟", difficulty: 4, expectedAnswer: { points: ["Bitap algorithm O(m*n)", "Score-based fuzzy matching", "Pre-index for performance"], timeToAnswer: "3-4 minutes" } },
      { type: "Critical Thinking", question: "Your Flutter app search is slow with 10,000 items. How do you fix it?", questionAr: "بحث تطبيقك بطيء مع 10,000 عنصر. كيف تصلحه؟", difficulty: 4, expectedAnswer: { points: ["Debounce input 300ms", "Use isolate for search", "Pre-index with Fuse/Trie", "Paginate results"], timeToAnswer: "3-5 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يفهم متى يستخدم binary search", "يعرف alternatives"], redFlags: ["لا يعرف شرط الـ sorted data"], greenFlags: ["يذكر Fuse.js للـ fuzzy search", "يفكر في debounce"] },
    linkedCards: { prerequisites: ["sorting-algorithms"], nextSteps: [{ id: "linked-list-tree", title: "Linked List & Tree" }], related: [] },
    commonPitfalls: [{ mistake: "تطبيق binary search على unsorted list", whyWrong: "نتائج خاطئة وبدون error", correctApproach: "تأكد من الـ sort أولاً أو استخدم linear search" }],
    answerStrategy: { structure: ["اشرح الـ algorithm", "اشرح الـ precondition", "اكتب الكود", "اذكر البدائل"], timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "4 دق" }, keyPhrases: ["O(log n)", "sorted prerequisite", "Fuse.js for fuzzy"] },
    quickRevision: { bulletPoints: ["Binary = O(log n) sorted", "Linear = O(n) any", "Set.contains = O(1)", "Fuse.js = fuzzy"], memoryHook: "Binary = split in half each time", cheatSheet: "binarySearch(sorted, target) from collection pkg" }
  },

  {
    id: "linked-list-tree",
    number: 51,
    title: "Linked List & Tree",
    titleAr: "القائمة المرتبطة والشجرة",
    level: "Senior",
    frequency: "Rare",
    tags: ["Data Structures", "Algorithms"],
    definition: {
      summary: "Singly/Doubly linked lists, Binary Trees, BST, DFS, BFS in Dart",
      detailed: "Linked lists for O(1) insert/delete at head. Trees for hierarchical data. BST for sorted O(log n) lookup. Used in navigation trees, comment threads.",
      analogy: "Linked list = chain of elephants, each holding the next elephant's tail. Tree = folder structure on your computer.",
      keyPoints: ["LinkedList in dart:collection", "BST: left < root < right", "DFS: stack-based or recursive", "BFS: queue-based", "Flutter widget tree is a tree", "Comment threads use trees"],
      codeExample: {
        language: "dart",
        code: `import 'dart:collection';

// Using Dart's built-in LinkedList
class Entry extends LinkedListEntry<Entry> {
  final int value;
  Entry(this.value);
}

// Binary Tree
class TreeNode {
  int val;
  TreeNode? left, right;
  TreeNode(this.val);
}

// BFS traversal
void bfs(TreeNode root) {
  final queue = Queue<TreeNode>()..add(root);
  while (queue.isNotEmpty) {
    final node = queue.removeFirst();
    print(node.val);
    if (node.left != null) queue.add(node.left!);
    if (node.right != null) queue.add(node.right!);
  }
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "What is the advantage of a linked list over a List in Dart?", questionAr: "ما ميزة Linked List على List في Dart؟", difficulty: 3, expectedAnswer: { points: ["O(1) insert/delete anywhere", "No memory reallocation", "List: O(n) insert in middle"], timeToAnswer: "2-3 minutes" } },
      { type: "Practical", question: "Implement DFS for a comment thread tree", questionAr: "نفذ DFS لشجرة تعليقات", difficulty: 4, expectedAnswer: { points: ["Recursive or stack-based", "Visit node then children"], timeToAnswer: "4-5 minutes" } },
      { type: "Practical", question: "Find the height of a binary tree", questionAr: "أوجد ارتفاع الشجرة الثنائية", difficulty: 3, expectedAnswer: { points: ["Recursively: 1 + max(left, right)", "Base case: null = -1"], timeToAnswer: "3-4 minutes" } },
      { type: "System Design", question: "Design a folder navigation system using a tree", questionAr: "صمم نظام تنقل بين المجلدات باستخدام شجرة", difficulty: 4, expectedAnswer: { points: ["TreeNode with children list", "BFS for level display", "DFS for full path"], timeToAnswer: "5 minutes" } },
      { type: "Deep Dive", question: "How does Flutter's widget tree relate to data structure trees?", questionAr: "كيف تتعلق شجرة الـ widget في Flutter بهياكل بيانات الشجرة؟", difficulty: 4, expectedAnswer: { points: ["Widget tree is a tree", "build() does DFS traversal", "Element/RenderObject trees"], timeToAnswer: "3-4 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يفهم هياكل البيانات الهرمية", "يربطها بـ Flutter"], redFlags: ["لا يعرف DFS/BFS", "لا يعرف Dart's LinkedList"], greenFlags: ["يربط بـ Flutter widget tree", "يستخدم Queue للـ BFS"] },
    linkedCards: { prerequisites: ["search-algorithms"], nextSteps: [{ id: "stack-queue-heap", title: "Stack Queue & Heap" }], related: [] },
    commonPitfalls: [{ mistake: "استخدام List بدل Queue للـ BFS", whyWrong: "removeAt(0) في List هو O(n)", correctApproach: "استخدم Queue من dart:collection" }],
    answerStrategy: { structure: ["اشرح الـ structure", "اكتب الكود", "اربطه بـ Flutter"], timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "5-7 دق" }, keyPhrases: ["O(1) insert", "DFS recursive", "BFS queue-based"] },
    quickRevision: { bulletPoints: ["BFS = Queue", "DFS = Stack/Recursive", "BST = sorted tree", "Flutter widget tree = tree structure"], memoryHook: "BFS = Breadth (wide), DFS = Depth (deep)", cheatSheet: "BFS: queue.add(); DFS: recurse(node.children)" }
  },

  {
    id: "stack-queue-heap",
    number: 52,
    title: "Stack, Queue & Heap",
    titleAr: "Stack و Queue و Heap",
    level: "Mid",
    frequency: "Common",
    tags: ["Data Structures", "Algorithms"],
    definition: {
      summary: "Stack (LIFO), Queue (FIFO), PriorityQueue (min/max heap) in Dart",
      detailed: "Stack: undo/redo, navigation history. Queue: task scheduling, BFS. PriorityQueue: notification priority, Dijkstra's algorithm.",
      analogy: "Stack = plates on a table (last in, first out). Queue = people in a line. Heap = VIP queue (highest priority first).",
      keyPoints: ["Stack: push/pop O(1)", "Queue from dart:collection, O(1) add/remove", "PriorityQueue for priority scheduling", "Dart List can simulate stack with add/removeLast", "Navigator uses a stack internally", "Microtask queue in Dart event loop"],
      codeExample: {
        language: "dart",
        code: `import 'dart:collection';

// Stack (List as stack)
final stack = <int>[];
stack.add(1); stack.add(2); stack.add(3);
print(stack.removeLast()); // 3 — LIFO

// Queue — FIFO
final queue = Queue<int>();
queue.add(1); queue.add(2);
print(queue.removeFirst()); // 1 — FIFO

// PriorityQueue (min-heap)
final pq = PriorityQueue<int>((a, b) => a.compareTo(b));
pq.addAll([5, 1, 3]);
print(pq.removeFirst()); // 1 — smallest first`
      }
    },
    questions: [
      { type: "Theoretical", question: "How does Flutter's Navigator use a stack internally?", questionAr: "كيف يستخدم Flutter Navigator الـ Stack داخلياً؟", difficulty: 2, expectedAnswer: { points: ["push() adds route to stack", "pop() removes top route", "Routes LIFO order"], timeToAnswer: "2-3 minutes" } },
      { type: "Practical", question: "Implement an undo/redo system using two stacks", questionAr: "نفذ نظام undo/redo باستخدام stack مزدوج", difficulty: 3, expectedAnswer: { points: ["undoStack + redoStack", "Each action pushes to undo", "Undo pops to redo", "New action clears redo"], timeToAnswer: "4-5 minutes" } },
      { type: "Practical", question: "Use a PriorityQueue to schedule notifications", questionAr: "استخدم PriorityQueue لجدولة الإشعارات", difficulty: 3, expectedAnswer: { points: ["Priority = urgency level", "removeFirst() for next notification", "Handle equals priority by timestamp"], timeToAnswer: "3-4 minutes" } },
      { type: "Deep Dive", question: "What is the difference between Dart's event queue and microtask queue?", questionAr: "ما الفرق بين event queue و microtask queue في Dart؟", difficulty: 5, expectedAnswer: { points: ["Microtask: higher priority, Future.microtask()", "Event queue: I/O, timers, user events", "Microtasks drain before next event"], timeToAnswer: "3-4 minutes" } },
      { type: "System Design", question: "Design a task scheduler for background jobs with priorities", questionAr: "صمم task scheduler للمهام الخلفية بأولويات", difficulty: 5, expectedAnswer: { points: ["PriorityQueue with Job class", "Worker isolate consuming from queue", "Pause/resume support"], timeToAnswer: "5-7 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يفهم LIFO vs FIFO", "يربط بـ Flutter examples"], redFlags: ["يخلط Queue مع List", "لا يعرف PriorityQueue"], greenFlags: ["يربط Navigator بـ Stack", "يذكر microtask queue"] },
    linkedCards: { prerequisites: ["linked-list-tree"], nextSteps: [{ id: "recursion-dp", title: "Recursion & DP" }], related: [{ id: "async-future", title: "Async Future" }] },
    commonPitfalls: [{ mistake: "استخدام List.removeAt(0) كـ Queue", whyWrong: "O(n) لأن بيشيف كل العناصر", correctApproach: "استخدم Queue من dart:collection" }],
    answerStrategy: { structure: ["عرّف كل structure", "اذكر use case", "اكتب كود مختصر"], timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "4 دق" }, keyPhrases: ["LIFO", "FIFO", "priority scheduling"] },
    quickRevision: { bulletPoints: ["Stack = LIFO = Navigator", "Queue = FIFO = BFS", "PriorityQueue = heap", "Microtask = highest priority"], memoryHook: "Stack plates, Queue cinema line, Heap VIP", cheatSheet: "stack: add/removeLast | queue: add/removeFirst | pq: addAll/removeFirst" }
  },

  {
    id: "recursion-dp",
    number: 53,
    title: "Recursion & Dynamic Programming",
    titleAr: "الـ Recursion والبرمجة الديناميكية",
    level: "Senior",
    frequency: "Common",
    tags: ["Algorithms", "Data Structures"],
    definition: {
      summary: "Recursion fundamentals, memoization, tabulation, common DP problems",
      detailed: "Recursion solves problems by calling itself on smaller inputs. DP avoids recomputation by caching subproblems. Key for senior Flutter positions.",
      analogy: "Recursion = Russian dolls — each doll contains a smaller version. DP = build a cheat sheet as you go so you never solve the same problem twice.",
      keyPoints: ["Base case is critical", "Call stack depth — stack overflow risk", "Memoization = top-down DP", "Tabulation = bottom-up DP", "tail-call optimization (Dart doesn't optimize)", "Common: Fibonacci, coin change, knapsack"],
      codeExample: {
        language: "dart",
        code: `// Naive Fibonacci — O(2^n) ❌
int fib(int n) => n <= 1 ? n : fib(n-1) + fib(n-2);

// Memoized — O(n) ✅
final memo = <int, int>{};
int fibMemo(int n) {
  if (n <= 1) return n;
  return memo.putIfAbsent(n, () => fibMemo(n-1) + fibMemo(n-2));
}

// Tabulation — O(n) ✅
int fibDP(int n) {
  if (n <= 1) return n;
  var a = 0, b = 1;
  for (var i = 2; i <= n; i++) {
    final c = a + b; a = b; b = c;
  }
  return b;
}`
      }
    },
    questions: [
      { type: "Practical", question: "Implement Fibonacci with memoization in Dart", questionAr: "نفذ Fibonacci مع memoization في Dart", difficulty: 3, expectedAnswer: { points: ["Map as cache", "Check cache before recursing", "O(n) time O(n) space"], timeToAnswer: "3-4 minutes" } },
      { type: "Theoretical", question: "What is the difference between memoization and tabulation?", questionAr: "ما الفرق بين Memoization و Tabulation؟", difficulty: 3, expectedAnswer: { points: ["Memo = top-down + cache", "Tabulation = bottom-up + array", "Memo: lazy, Tabulation: eager"], timeToAnswer: "2-3 minutes" } },
      { type: "Practical", question: "Find the minimum number of coins to make a sum", questionAr: "أوجد أقل عدد من العملات لتكوين مبلغ معين", difficulty: 4, expectedAnswer: { points: ["DP table indexed by amount", "For each coin, update table", "Return table[amount]"], timeToAnswer: "5-7 minutes" } },
      { type: "Deep Dive", question: "Does Dart optimize tail recursion?", questionAr: "هل Dart تُحسّن الـ tail recursion؟", difficulty: 5, expectedAnswer: { points: ["No — Dart VM does not optimize tail calls", "Risk of stack overflow for large n", "Use iterative or explicit stack instead"], timeToAnswer: "2-3 minutes" } },
      { type: "System Design", question: "How would you implement caching of API responses using DP principles?", questionAr: "كيف تُطبّق caching لـ API responses باستخدام مبادئ DP؟", difficulty: 4, expectedAnswer: { points: ["Map<String, Response> as cache", "Key = URL + params", "TTL for cache invalidation"], timeToAnswer: "3-5 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يفهم التكرارية والـ DP", "يكتب كود صحيح"], redFlags: ["لا يعرف base case", "ينسى الـ memoization"], greenFlags: ["يذكر أن Dart لا تعمل tail recursion", "يفكر في space vs time trade-off"] },
    linkedCards: { prerequisites: ["stack-queue-heap"], nextSteps: [{ id: "graph-algorithms", title: "Graph Algorithms" }], related: [] },
    commonPitfalls: [{ mistake: "استخدام recursion بدون base case", whyWrong: "Stack Overflow error", correctApproach: "دايماً عرّف base case أولاً" }],
    answerStrategy: { structure: ["عرّف المشكلة", "حدد الـ base case", "اكتب الـ recursive solution", "حسّنه بـ DP"], timeAllocation: { junior: "3 دق", mid: "4 دق", senior: "7 دق" }, keyPhrases: ["memoization", "base case", "overlapping subproblems"] },
    quickRevision: { bulletPoints: ["Base case = stop condition", "Memo = HashMap cache", "DP = avoid recomputation", "Dart: no tail-call optimization"], memoryHook: "DP = smart recursion with a notepad", cheatSheet: "memo.putIfAbsent(n, () => f(n-1) + f(n-2))" }
  },

  {
    id: "graph-algorithms",
    number: 54,
    title: "Graph Algorithms",
    titleAr: "خوارزميات الرسم البياني",
    level: "Senior",
    frequency: "Rare",
    tags: ["Algorithms", "Data Structures"],
    definition: {
      summary: "Directed/Undirected graphs, DFS, BFS, shortest path, topological sort",
      detailed: "Graphs model relationships. Used in social networks, dependency resolution, route planning. Represented as adjacency list (Map) or matrix.",
      analogy: "Graph = Cairo metro map. Stations are nodes, connections are edges. BFS finds shortest hops, Dijkstra finds shortest time.",
      keyPoints: ["Adjacency list: Map<Node, List<Node>>", "DFS: stack or recursion", "BFS: queue — shortest path unweighted", "Dijkstra: weighted shortest path with PriorityQueue", "Topological sort for dependency ordering", "Cycle detection"],
      codeExample: {
        language: "dart",
        code: `// Graph as adjacency list
final graph = <String, List<String>>{
  'A': ['B', 'C'],
  'B': ['D'],
  'C': ['D'],
  'D': []
};

// BFS — shortest path
List<String> bfs(String start, String end) {
  final queue = Queue<List<String>>()..add([start]);
  final visited = <String>{};
  while (queue.isNotEmpty) {
    final path = queue.removeFirst();
    final node = path.last;
    if (node == end) return path;
    if (visited.add(node)) {
      for (var n in (graph[node] ?? [])) {
        queue.add([...path, n]);
      }
    }
  }
  return [];
}`
      }
    },
    questions: [
      { type: "Theoretical", question: "What is the difference between BFS and DFS for graph traversal?", questionAr: "ما الفرق بين BFS و DFS في الرسم البياني؟", difficulty: 3, expectedAnswer: { points: ["BFS = level-by-level, finds shortest path", "DFS = goes deep first, uses less memory", "BFS needs Queue, DFS uses Stack/Recursion"], timeToAnswer: "2-3 minutes" } },
      { type: "Practical", question: "Detect a cycle in a directed graph", questionAr: "اكتشف دورة في رسم بياني موجّه", difficulty: 4, expectedAnswer: { points: ["DFS with visited + recursion stack", "If node in recursion stack → cycle"], timeToAnswer: "5-7 minutes" } },
      { type: "System Design", question: "Design a package dependency resolver like pub.dev", questionAr: "صمم محلّل تبعيات مثل pub.dev", difficulty: 5, expectedAnswer: { points: ["Build dependency graph", "Topological sort", "Detect circular dependencies"], timeToAnswer: "7-10 minutes" } },
      { type: "Deep Dive", question: "Explain Dijkstra's algorithm and its time complexity", questionAr: "اشرح خوارزمية Dijkstra وتعقيد وقتها", difficulty: 5, expectedAnswer: { points: ["PriorityQueue for min distance", "O((V+E) log V) with binary heap", "Fails with negative weights"], timeToAnswer: "4-5 minutes" } },
      { type: "Critical Thinking", question: "Would you use a graph to model Flutter widget dependencies? Why?", questionAr: "هل ستستخدم graph لنمذجة تبعيات Flutter widgets؟ لماذا؟", difficulty: 4, expectedAnswer: { points: ["Yes — InheritedWidget forms a dependency graph", "Widget tree is a DAG", "Rebuild propagation follows edges"], timeToAnswer: "3-4 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يعرف model graphs", "يطبق BFS/DFS"], redFlags: ["لا يعرف adjacency list", "يخلط BFS مع DFS"], greenFlags: ["يطبقه على Flutter dependency system", "يذكر Dijkstra"] },
    linkedCards: { prerequisites: ["recursion-dp"], nextSteps: [{ id: "widget-lifecycle", title: "Widget Lifecycle" }], related: [] },
    commonPitfalls: [{ mistake: "نسيان الـ visited set في الـ graph traversal", whyWrong: "infinite loop في cyclic graphs", correctApproach: "دايماً track الـ visited nodes" }],
    answerStrategy: { structure: ["ارسم الـ graph", "اختار الـ traversal المناسب", "اكتب الكود", "اذكر الـ complexity"], timeAllocation: { junior: "3 دق", mid: "5 دق", senior: "10 دق" }, keyPhrases: ["adjacency list", "visited set", "BFS/DFS", "DAG"] },
    quickRevision: { bulletPoints: ["Graph = Map<Node, List<Node>>", "BFS = Queue + shortest path", "DFS = Stack/Recursion", "Visited set = avoid cycles"], memoryHook: "BFS = explore wide, DFS = explore deep", cheatSheet: "Map<String,List<String>> | Queue for BFS | Set for visited" }
  },

  {
    id: "dart-patterns",
    number: 55,
    title: "Dart 3 Patterns & Records",
    titleAr: "Patterns و Records في Dart 3",
    level: "Mid",
    frequency: "Common",
    tags: ["Dart", "Flutter"],
    definition: {
      summary: "Dart 3 patterns, records, destructuring, sealed classes exhaustive switch",
      detailed: "Dart 3 introduced records (anonymous immutable aggregates), patterns for destructuring, and sealed classes for exhaustive pattern matching.",
      analogy: "Records = sticky note with multiple items (x, y). Patterns = unpacking a box matching its shape. Sealed = only known subtypes.",
      keyPoints: ["Records: (int, String) positional or (x: 1, y: 2) named", "Pattern matching in switch", "Destructuring in assignments", "Sealed classes: exhaustive switch — compiler checks all cases", "Guard clauses: when", "List/Map/Object patterns"],
      codeExample: {
        language: "dart",
        code: `// Records
(int, String) getUser() => (1, 'Ali');
final (id, name) = getUser(); // destructure

// Named record
({int x, int y}) getPoint() => (x: 10, y: 20);
final (:x, :y) = getPoint();

// Pattern matching with sealed classes
sealed class Shape {}
class Circle extends Shape { final double r; Circle(this.r); }
class Rect extends Shape { final double w, h; Rect(this.w, this.h); }

double area(Shape s) => switch (s) {
  Circle(:var r) => 3.14 * r * r,
  Rect(:var w, :var h) => w * h
  }; // compiler error if case missing!`
      }
    },
    questions: [
      { type: "Theoretical", question: "What are Dart 3 records and how do they differ from classes?", questionAr: "ما هي Records في Dart 3 وكيف تختلف عن الـ classes؟", difficulty: 3, expectedAnswer: { points: ["Anonymous immutable", "No methods, no identity", "Value equality by default", "Great for return multiple values"], timeToAnswer: "2-3 minutes" } },
      { type: "Practical", question: "Use records to return multiple values from a function", questionAr: "استخدم Records لإرجاع قيم متعددة من دالة", difficulty: 2, expectedAnswer: { points: ["Return (value1, value2)", "Destructure at call site", "Named vs positional"], timeToAnswer: "2-3 minutes" } },
      { type: "Practical", question: "Implement exhaustive switch with sealed classes for API state", questionAr: "نفذ exhaustive switch مع sealed classes لحالة API", difficulty: 3, expectedAnswer: { points: ["sealed class ApiState", "Loading|Success|Error subclasses", "switch(state) — compiler checks all"], timeToAnswer: "3-4 minutes" } },
      { type: "Deep Dive", question: "How do guard clauses work in pattern matching?", questionAr: "كيف تعمل guard clauses في pattern matching؟", difficulty: 4, expectedAnswer: { points: ["'when' keyword adds boolean condition", "Case only matches if pattern AND guard match", "Placement matters — order of cases"], timeToAnswer: "2-3 minutes" } },
      { type: "Critical Thinking", question: "How would Dart 3 patterns improve your BLoC state handling?", questionAr: "كيف تحسّن Dart 3 patterns التعامل مع BLoC states؟", difficulty: 4, expectedAnswer: { points: ["Replace if/else chain with switch", "Sealed state = exhaustive matching", "Pattern destructuring for data extraction"], timeToAnswer: "3-4 minutes" } }
    ],
    interviewerMind: { whatTheyWant: ["يعرف Dart 3 features", "يطبقها على real code"], redFlags: ["لا يعرف records أصلاً", "لا يعرف sealed classes Dart 3"], greenFlags: ["يربطها بـ BLoC states", "يذكر exhaustive checking"] },
    linkedCards: { prerequisites: ["graph-algorithms"], nextSteps: [{ id: "widget-lifecycle", title: "Widget Lifecycle" }], related: [{ id: "abstract-interfaces", title: "Abstract & Interfaces" }] },
    commonPitfalls: [{
      mistake: "استخدام Map بدل Records لإرجاع قيم", whyWrong: "Map غير type-safe وغير destructured", correctApproach: "استخدم Records (T1, T2)"
    }],
    answerStrategy: { structure: ["اشرح الـ feature", "اديه مثال practical", "وضح الميزة على الـ alternatives"], timeAllocation: { junior: "2 دق", mid: "3 دق", senior: "4 دق" }, keyPhrases: ["records", "sealed classes", "exhaustive switch", "pattern matching"] },
    quickRevision: { bulletPoints: ["Record = (T1, T2) or (name: T)", "sealed = exhaustive switch", "Patterns = destructuring", "when = guard clause"], memoryHook: "Records = lightweight tuple, Sealed = all cases known", cheatSheet: "(int id, String name) | sealed class | switch exhaustive" }
  }
];


