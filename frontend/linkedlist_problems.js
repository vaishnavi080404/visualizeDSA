const TOPIC_CONFIG = {
  name: "Linked List",
  level: "Level 3 of 3 · Problem Solving",
  backLink: "linkedlist_L1.html",
  backLabel: "Linked List"
};

const PROBLEMS = [
  {
    id: 1,
    title: "Middle of a Linked List",
    difficulty: "Easy",
    accuracy: "72.40%",
    submissions: "800k+",
    companies: ["Amazon", "Adobe", "Samsung"],
    pattern: "Fast & Slow Pointers",
    realWorld: "Used in music player shuffle algorithms to find the midpoint of a playlist for splitting or merging.",
    description: [
      "Given the <strong>head</strong> of a singly linked list, return the middle node of the linked list.",
      "If there are two middle nodes, return the <strong>second middle</strong> node."
    ].join(" "),
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[3,4,5]", explain: "The middle node is 3." },
      { input: "head = [1,2,3,4,5,6]", output: "[4,5,6]", explain: "Since the list has two middle nodes with values 3 and 4, we return the second one." }
    ],
    constraints: ["The number of nodes in the list is in the range [1, 100].", "1 <= Node.val <= 100"],
    hint: "Use two pointers. Move one pointer twice as fast as the other. When the fast pointer reaches the end, the slow pointer will be at the middle.",
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        // Your code here\n    }\n};",
      java: "class Solution {\n    public ListNode middleNode(ListNode head) {\n        // Your code here\n    }\n}",
      python: "class Solution:\n    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Your code here\n        pass",
      javascript: "function middleNode(head) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "ListNode* middleNode(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}",
      java: "public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    return slow;\n}",
      python: "def middleNode(self, head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow",
      javascript: "function middleNode(head) {\n    let slow = head, fast = head;\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    return slow;\n}"
    },
    testCases: [
    
      { input: "[1,2,3,4,5,6]", expected: "4" }
    ],
    jsTestCall: `(function(head){ let res = middleNode(head); return res ? String(res.val) : "null"; })(__INPUT__)`
  },
  {
    id: 2,
    title: "Reverse a Linked List",
    difficulty: "Easy",
    accuracy: "75.10%",
    submissions: "2M+",
    companies: ["Microsoft", "Facebook", "Apple"],
    pattern: "Iterative / Pointer Manipulation",
    realWorld: "Used in 'Undo' functionality in text editors where a sequence of operations needs to be processed in reverse.",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explain: "The list is reversed entirely." }
    ],
    constraints: ["The number of nodes in the list is in the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    hint: "Keep track of the previous, current, and next nodes. Change the current node's next pointer to point to the previous node.",
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Your code here\n    }\n};",
      java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your code here\n    }\n}",
      python: "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Your code here\n        pass",
      javascript: "function reverseList(head) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "ListNode* reverseList(ListNode* head) {\n    ListNode *prev = NULL, *curr = head;\n    while (curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}",
      java: "public ListNode reverseList(ListNode head) {\n    ListNode prev = null, curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}",
      python: "def reverseList(self, head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev",
      javascript: "function reverseList(head) {\n    let prev = null, curr = head;\n    while (curr) {\n        let next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}"
    },
    testCases: [
      { input: "[1,2,3]", expected: "[3,2,1]" },
      { input: "[]", expected: "[]" }
    ],
    jsTestCall: `(function(head){ let res = reverseList(head); let out = []; while(res){ out.push(res.val); res=res.next; } return JSON.stringify(out); })(__INPUT__)`
  },
  {
    id: 3,
    title: "Reverse a Doubly Linked List",
    difficulty: "Medium",
    accuracy: "62.30%",
    submissions: "400k+",
    companies: ["Goldman Sachs", "VMWare"],
    pattern: "Two-way Pointer Swap",
    realWorld: "Used in browser history management where you need to reverse the order of back/forward navigation paths.",
    description: "Given a doubly linked list, reverse it and return the head of the reversed list.",
    examples: [
      { input: "1 <-> 2 <-> 3", output: "3 <-> 2 <-> 1", explain: "Both next and prev pointers are swapped for every node." }
    ],
    constraints: ["The number of nodes is in range [0, 1000].", "-10^4 <= val <= 10^4"],
    hint: "For every node, swap the next and prev pointers. Don't forget to update the head at the end.",
    starterCode: {
      cpp: "Node* reverseDLL(Node* head) {\n    // Your code here\n}",
      java: "public static Node reverseDLL(Node head) {\n    // Your code here\n}",
      python: "def reverseDLL(head):\n    # Your code here\n    pass",
      javascript: "function reverseDLL(head) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "Node* reverseDLL(Node* head) {\n    Node *temp = NULL, *curr = head;\n    while (curr) {\n        temp = curr->prev;\n        curr->prev = curr->next;\n        curr->next = temp;\n        head = curr;\n        curr = curr->prev;\n    }\n    return head;\n}",
      java: "public static Node reverseDLL(Node head) {\n    Node temp = null, curr = head;\n    while (curr != null) {\n        temp = curr.prev;\n        curr.prev = curr.next;\n        curr.next = temp;\n        head = curr;\n        curr = curr.prev;\n    }\n    return head;\n}",
      python: "def reverseDLL(head):\n    curr = head\n    while curr:\n        curr.prev, curr.next = curr.next, curr.prev\n        head = curr\n        curr = curr.prev\n    return head",
      javascript: "function reverseDLL(head) {\n    let temp = null, curr = head;\n    while (curr) {\n        temp = curr.prev;\n        curr.prev = curr.next;\n        curr.next = temp;\n        head = curr;\n        curr = curr.prev;\n    }\n    return head;\n}"
    },
    testCases: [
      { input: "[1,2,3]", expected: "[3,2,1]" }
    ],
    jsTestCall: `(function(head){ let res = reverseDLL(head); let out = []; while(res){ out.push(res.val); res=res.next; } return JSON.stringify(out); })(__INPUT__)`
  },
  {
    id: 4,
    title: "Rotate a Linked List",
    difficulty: "Medium",
    accuracy: "55.00%",
    submissions: "600k+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Circular Connection",
    realWorld: "Used in cyclic scheduling in operating systems where tasks are rotated in a queue.",
    description: "Given the head of a linked list, rotate the list to the right by k places.",
    examples: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[4,5,1,2,3]", explain: "The list is shifted 2 units to the right." }
    ],
    constraints: ["Nodes [0, 500]", "-100 <= val <= 100", "0 <= k <= 2*10^9"],
    hint: "Find the length. Connect tail to head. Move length - (k % length) steps and break the loop.",
    starterCode: {
      cpp: "ListNode* rotateRight(ListNode* head, int k) {\n    // Your code here\n}",
      java: "public ListNode rotateRight(ListNode head, int k) {\n    // Your code here\n}",
      python: "def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        # Your code here\n        pass",
      javascript: "function rotateRight(head, k) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "ListNode* rotateRight(ListNode* head, int k) {\n    if (!head || !head->next || k == 0) return head;\n    ListNode *curr = head; int len = 1;\n    while (curr->next) { curr = curr->next; len++; }\n    curr->next = head;\n    k = k % len;\n    for (int i = 0; i < len - k; i++) curr = curr->next;\n    head = curr->next;\n    curr->next = NULL;\n    return head;\n}",
      java: "public ListNode rotateRight(ListNode head, int k) {\n    if (head == null || head.next == null || k == 0) return head;\n    ListNode curr = head; int len = 1;\n    while (curr.next != null) { curr = curr.next; len++; }\n    curr.next = head;\n    k = k % len;\n    for (int i = 0; i < len - k; i++) curr = curr.next;\n    head = curr.next;\n    curr.next = null;\n    return head;\n}",
      python: "def rotateRight(self, head, k):\n    if not head: return head\n    curr, length = head, 1\n    while curr.next: curr, length = curr.next, length + 1\n    curr.next = head\n    k = k % length\n    for _ in range(length - k): curr = curr.next\n    head = curr.next\n    curr.next = None\n    return head",
      javascript: "function rotateRight(head, k) {\n    if (!head || k === 0) return head;\n    let curr = head, len = 1;\n    while (curr.next) { curr = curr.next; len++; }\n    curr.next = head;\n    k = k % len;\n    for (let i = 0; i < len - k; i++) curr = curr.next;\n    head = curr.next;\n    curr.next = null;\n    return head;\n}"
    },
    testCases: [
      { input: "[1,2,3,4,5], 2", expected: "[4,5,1,2,3]" }
    ],
    jsTestCall: `(function(args){ let res = rotateRight(args[0], args[1]); let out = []; while(res){ out.push(res.val); res=res.next; } return JSON.stringify(out); })(__INPUT__)`
  },
  {
    id: 5,
    title: "Detect Loop in Linked List",
    difficulty: "Easy",
    accuracy: "65.50%",
    submissions: "1.5M+",
    companies: ["Amazon", "Microsoft", "Paytm"],
    pattern: "Floyd's Cycle Finding",
    realWorld: "Used in network routing to detect if a packet is caught in an infinite loop between nodes.",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true", explain: "There is a cycle where the tail connects to the 1st node." }
    ],
    constraints: ["Nodes [0, 10^4]", "-10^5 <= val <= 10^5"],
    hint: "Use two pointers. Move slow by one and fast by two steps. If they meet, there is a cycle.",
    starterCode: {
      cpp: "bool hasCycle(ListNode *head) {\n    // Your code here\n}",
      java: "public boolean hasCycle(ListNode head) {\n    // Your code here\n}",
      python: "def hasCycle(self, head: Optional[ListNode]) -> bool:\n        # Your code here\n        pass",
      javascript: "function hasCycle(head) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "bool hasCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}",
      java: "public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}",
      python: "def hasCycle(self, head):\n    slow = fast = head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow == fast: return True\n    return False",
      javascript: "function hasCycle(head) {\n    let slow = head, fast = head;\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow === fast) return true;\n    }\n    return false;\n}"
    },
    testCases: [
      { input: "[3,2,0,-4] with cycle at index 1", expected: "true" }
    ],
    jsTestCall: `(function(head){ return String(hasCycle(head)); })(__INPUT__)`
  },
  {
    id: 6,
    title: "Length of the Loop",
    difficulty: "Medium",
    accuracy: "58.20%",
    submissions: "300k+",
    companies: ["MakeMyTrip", "Adobe"],
    pattern: "Cycle counting",
    realWorld: "Determining the size of a deadlock cycle in database transactions.",
    description: "If a loop is present in the linked list, return the count of nodes in the loop, else return 0.",
    examples: [
      { input: "[1,2,3,4,5] tail connects to 2", output: "4", explain: "The loop is 2-3-4-5 which has 4 nodes." }
    ],
    constraints: ["Nodes [0, 500]", "1 <= val <= 1000"],
    hint: "Once slow and fast meet, keep slow fixed and move fast one step at a time until it reaches slow again, counting the steps.",
    starterCode: {
      cpp: "int countNodesInLoop(struct Node *head) {\n    // Your code here\n}",
      java: "static int countNodesInLoop(Node head) {\n    // Your code here\n}",
      python: "def countNodesInLoop(head):\n    # Your code here\n    pass",
      javascript: "function countNodesInLoop(head) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "int countNodesInLoop(struct Node *head) {\n    Node *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next; fast = fast->next->next;\n        if (slow == fast) {\n            int count = 1; Node* temp = slow;\n            while (temp->next != slow) { temp = temp->next; count++; }\n            return count;\n        }\n    }\n    return 0;\n}",
      java: "static int countNodesInLoop(Node head) {\n    Node slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next; fast = fast.next.next;\n        if (slow == fast) {\n            int count = 1; Node temp = slow;\n            while (temp.next != slow) { temp = temp.next; count++; }\n            return count;\n        }\n    }\n    return 0;\n}",
      python: "def countNodesInLoop(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow == fast:\n            count, temp = 1, slow\n            while temp.next != slow:\n                temp = temp.next; count += 1\n            return count\n    return 0",
      javascript: "function countNodesInLoop(head) {\n    let slow = head, fast = head;\n    while (fast && fast.next) {\n        slow = slow.next; fast = fast.next.next;\n        if (slow === fast) {\n            let count = 1, temp = slow;\n            while (temp.next !== slow) { temp = temp.next; count++; }\n            return count;\n        }\n    }\n    return 0;\n}"
    },
    testCases: [
      { input: "[1,2,3,4] cycle at 2", expected: "3" }
    ],
    jsTestCall: `(function(head){ return String(countNodesInLoop(head)); })(__INPUT__)`
  },
  {
    id: 7,
    title: "Reverse in groups",
    difficulty: "Hard",
    accuracy: "48.90%",
    submissions: "500k+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Recursive sub-reversal",
    realWorld: "Used in data packet processing where packets are received in fixed-size bursts and need to be reordered.",
    description: "Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.",
    examples: [
      { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]", explain: "The first 3 nodes are reversed." }
    ],
    constraints: ["Nodes [1, 5000]", "0 <= val <= 1000", "1 <= k <= n"],
    hint: "Reverse k nodes using iterative method, then recursively call the function for the rest of the list.",
    starterCode: {
      cpp: "ListNode* reverseKGroup(ListNode* head, int k) {\n    // Your code here\n}",
      java: "public ListNode reverseKGroup(ListNode head, int k) {\n    // Your code here\n}",
      python: "def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        # Your code here\n        pass",
      javascript: "function reverseKGroup(head, k) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "ListNode* reverseKGroup(ListNode* head, int k) {\n    ListNode* curr = head; int count = 0;\n    while (curr && count < k) { curr = curr->next; count++; }\n    if (count < k) return head;\n    ListNode *prev = NULL, *next = NULL, *c2 = head;\n    for(int i=0; i<k; i++) {\n        next = c2->next; c2->next = prev; prev = c2; c2 = next;\n    }\n    head->next = reverseKGroup(c2, k);\n    return prev;\n}",
      java: "public ListNode reverseKGroup(ListNode head, int k) {\n    ListNode curr = head; int count = 0;\n    while (curr != null && count < k) { curr = curr.next; count++; }\n    if (count < k) return head;\n    ListNode prev = null, next = null, c2 = head;\n    for (int i = 0; i < k; i++) {\n        next = c2.next; c2.next = prev; prev = c2; c2 = next;\n    }\n    head.next = reverseKGroup(c2, k);\n    return prev;\n}",
      python: "def reverseKGroup(self, head, k):\n    curr, count = head, 0\n    while curr and count < k: curr, count = curr.next, count + 1\n    if count < k: return head\n    prev, c2 = None, head\n    for _ in range(k):\n        nxt = c2.next; c2.next = prev; prev = c2; c2 = nxt\n    head.next = self.reverseKGroup(c2, k)\n    return prev",
      javascript: "function reverseKGroup(head, k) {\n    let curr = head, count = 0;\n    while (curr && count < k) { curr = curr.next; count++; }\n    if (count < k) return head;\n    let prev = null, next = null, c2 = head;\n    for (let i = 0; i < k; i++) {\n        next = c2.next; c2.next = prev; prev = c2; c2 = next;\n    }\n    head.next = reverseKGroup(c2, k);\n    return prev;\n}"
    },
    testCases: [
      { input: "[1,2,3,4,5], 2", expected: "[2,1,4,3,5]" }
    ],
    jsTestCall: `(function(args){ let res = reverseKGroup(args[0], args[1]); let out = []; while(res){ out.push(res.val); res=res.next; } return JSON.stringify(out); })(__INPUT__)`
  },
  {
    id: 8,
    title: "Remove loop in Linked List",
    difficulty: "Medium",
    accuracy: "51.20%",
    submissions: "400k+",
    companies: ["Amazon", "Microsoft", "Oracle"],
    pattern: "Floyd's + Junction finding",
    realWorld: "Garbage collection in languages like Java to break reference cycles so memory can be freed.",
    description: "Given a linked list, if there is a loop, remove it from the list.",
    examples: [
      { input: "[1,3,4] loop at 3", output: "[1,3,4]", explain: "The connection from 4 to 3 is broken." }
    ],
    constraints: ["Nodes [1, 10^4]", "1 <= val <= 10^3"],
    hint: "Detect meeting point. Move slow to head. Move both slow and fast one step at a time; where they meet next is the loop start.",
    starterCode: {
      cpp: "void removeLoop(Node* head) {\n    // Your code here\n}",
      java: "public static void removeLoop(Node head) {\n    // Your code here\n}",
      python: "def removeLoop(head):\n    # Your code here\n    pass",
      javascript: "function removeLoop(head) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "void removeLoop(Node* head) {\n    Node *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next; fast = fast->next->next;\n        if (slow == fast) {\n            slow = head;\n            if (slow == fast) {\n                while (fast->next != slow) fast = fast->next;\n            } else {\n                while (slow->next != fast->next) { slow = slow->next; fast = fast->next; }\n            }\n            fast->next = NULL;\n            return;\n        }\n    }\n}",
      java: "public static void removeLoop(Node head) {\n    Node slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next; fast = fast.next.next;\n        if (slow == fast) {\n            slow = head;\n            if (slow == fast) {\n                while (fast.next != slow) fast = fast.next;\n            } else {\n                while (slow.next != fast.next) { slow = slow.next; fast = fast.next; }\n            }\n            fast.next = null; return;\n        }\n    }\n}",
      python: "def removeLoop(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow == fast:\n            slow = head\n            if slow == fast:\n                while fast.next != slow: fast = fast.next\n            else:\n                while slow.next != fast.next: slow, fast = slow.next, fast.next\n            fast.next = None; return",
      javascript: "function removeLoop(head) {\n    let slow = head, fast = head;\n    while (fast && fast.next) {\n        slow = slow.next; fast = fast.next.next;\n        if (slow === fast) {\n            slow = head;\n            if (slow === fast) {\n                while (fast.next !== slow) fast = fast.next;\n            } else {\n                while (slow.next !== fast.next) { slow = slow.next; fast = fast.next; }\n            }\n            fast.next = null; return;\n        }\n    }\n}"
    },
    testCases: [
      { input: "[1,2,3] cycle at 1", expected: "[1,2,3]" }
    ],
    jsTestCall: `(function(head){ removeLoop(head); let out = []; while(head){ out.push(head.val); head=head.next; } return JSON.stringify(out); })(__INPUT__)`
  },
  {
    id: 9,
    title: "LRU Cache",
    difficulty: "Hard",
    accuracy: "42.30%",
    submissions: "700k+",
    companies: ["Google", "Facebook", "Amazon"],
    pattern: "Hash Map + Doubly Linked List",
    realWorld: "Used in CPU cache and database buffer pools to keep recently accessed data ready.",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    examples: [
      { input: "LRUCache(2), put(1,1), put(2,2), get(1)", output: "1", explain: "Returns 1 and moves 1 to most recently used." }
    ],
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5"],
    hint: "Use a Doubly Linked List to store items by usage and a Hash Map for O(1) access to list nodes.",
    starterCode: {
      cpp: "class LRUCache {\npublic:\n    LRUCache(int capacity) {\n    }\n    int get(int key) {\n    }\n    void put(int key, int value) {\n    }\n};",
      java: "class LRUCache {\n    public LRUCache(int capacity) {\n    }\n    public int get(int key) {\n    }\n    public void put(int key, int value) {\n    }\n}",
      python: "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass",
      javascript: "class LRUCache {\n    constructor(capacity) {\n    }\n    get(key) {\n    }\n    put(key, value) {\n    }\n}"
    },
    solution: {
      cpp: "// Use STL list and unordered_map\nclass LRUCache {\n    int cap; list<pair<int, int>> l; unordered_map<int, list<pair<int, int>>::iterator> m;\npublic:\n    LRUCache(int capacity) : cap(capacity) {}\n    int get(int key) {\n        if (m.find(key) == m.end()) return -1;\n        l.splice(l.begin(), l, m[key]); return m[key]->second;\n    }\n    void put(int key, int value) {\n        if (m.find(key) != m.end()) {\n            l.splice(l.begin(), l, m[key]); m[key]->second = value; return;\n        }\n        if (l.size() == cap) { int d = l.back().first; l.pop_back(); m.erase(d); }\n        l.push_front({key, value}); m[key] = l.begin();\n    }\n};",
      java: "class LRUCache extends LinkedHashMap<Integer, Integer> {\n    private int capacity;\n    public LRUCache(int capacity) {\n        super(capacity, 0.75F, true);\n        this.capacity = capacity;\n    }\n    public int get(int key) { return super.getOrDefault(key, -1); }\n    public void put(int key, int value) { super.put(key, value); }\n    protected boolean removeEldestEntry(Map.Entry eldest) { return size() > capacity; }\n}",
      python: "from collections import OrderedDict\nclass LRUCache(OrderedDict):\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n    def get(self, key: int) -> int:\n        if key not in self: return -1\n        self.move_to_end(key); return self[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self: self.move_to_end(key)\n        self[key] = value\n        if len(self) > self.capacity: self.popitem(last=False)",
      javascript: "class LRUCache {\n    constructor(capacity) { this.cap = capacity; this.map = new Map(); }\n    get(key) {\n        if (!this.map.has(key)) return -1;\n        let val = this.map.get(key); this.map.delete(key); this.map.set(key, val); return val;\n    }\n    put(key, value) {\n        if (this.map.has(key)) this.map.delete(key);\n        this.map.set(key, value);\n        if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value);\n    }\n}"
    },
    testCases: [
      { input: "LRUCache(2), put(1,1), put(2,2), get(1)", expected: "1" }
    ],
    jsTestCall: `(function(){ let c = new LRUCache(2); c.put(1,1); c.put(2,2); return String(c.get(1)); })()`
  },
  {
    id: 10,
    title: "LFU Cache",
    difficulty: "Hard",
    accuracy: "34.10%",
    submissions: "200k+",
    companies: ["Google", "Amazon"],
    pattern: "Frequency Maps + DLLs",
    realWorld: "Content Delivery Networks (CDNs) use LFU to keep the most popular static assets cached.",
    description: "Design and implement a data structure for Least Frequently Used (LFU) cache.",
    examples: [
      { input: "LFUCache(2), put(1,1), put(2,2), get(1), put(3,3)", output: "get(2) -> -1", explain: "2 is evicted because its frequency is 1 and it was least recently used." }
    ],
    constraints: ["capacity <= 10^4", "0 <= key, value <= 10^7", "At most 2*10^5 calls"],
    hint: "Maintain a map of frequencies to Doubly Linked Lists. Track the minimum frequency currently in the cache.",
    starterCode: {
      cpp: "class LFUCache {\npublic:\n    LFUCache(int capacity) {}\n    int get(int key) {}\n    void put(int key, int value) {}\n};",
      java: "class LFUCache {\n    public LFUCache(int capacity) {}\n    public int get(int key) {}\n    public void put(int key, int value) {}\n}",
      python: "class LFUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass",
      javascript: "class LFUCache {\n    constructor(capacity) {}\n    get(key) {}\n    put(key, value) {}\n}"
    },
    solution: {
      cpp: "// Logic: Map of key to {val, freq}, Map of freq to DLL of keys, minFreq tracker\nclass LFUCache {\n    int cap, minFreq; unordered_map<int, pair<int, int>> keyVal; unordered_map<int, list<int>> freqList; unordered_map<int, list<int>::iterator> keyIter;\npublic:\n    LFUCache(int capacity) : cap(capacity), minFreq(0) {}\n    int get(int key) {\n        if (keyVal.find(key) == keyVal.end()) return -1;\n        int f = keyVal[key].second; freqList[f].erase(keyIter[key]);\n        if (freqList[f].empty() && f == minFreq) minFreq++;\n        keyVal[key].second++; freqList[f+1].push_front(key); keyIter[key] = freqList[f+1].begin();\n        return keyVal[key].first;\n    }\n    void put(int key, int value) {\n        if (cap <= 0) return;\n        if (get(key) != -1) { keyVal[key].first = value; return; }\n        if (keyVal.size() >= cap) {\n            int d = freqList[minFreq].back(); freqList[minFreq].pop_back();\n            keyVal.erase(d); keyIter.erase(d);\n        }\n        keyVal[key] = {value, 1}; minFreq = 1; freqList[1].push_front(key); keyIter[key] = freqList[1].begin();\n    }\n};",
      java: "// Logic: Similar to C++ but using LinkedHashSet for O(1) DLL-like behavior\nclass LFUCache {\n    Map<Integer, Integer> vals = new HashMap<>(), counts = new HashMap<>();\n    Map<Integer, LinkedHashSet<Integer>> lists = new HashMap<>();\n    int cap, min = -1;\n    public LFUCache(int capacity) { cap = capacity; lists.put(1, new LinkedHashSet<>()); }\n    public int get(int key) {\n        if (!vals.containsKey(key)) return -1;\n        int count = counts.get(key); counts.put(key, count + 1);\n        lists.get(count).remove(key);\n        if (count == min && lists.get(count).size() == 0) min++;\n        if (!lists.containsKey(count + 1)) lists.put(count + 1, new LinkedHashSet<>());\n        lists.get(count + 1).add(key); return vals.get(key);\n    }\n    public void put(int key, int value) {\n        if (cap <= 0) return;\n        if (vals.containsKey(key)) { vals.put(key, value); get(key); return; }\n        if (vals.size() >= cap) {\n            int evit = lists.get(min).iterator().next();\n            lists.get(min).remove(evit); vals.remove(evit); counts.remove(evit);\n        }\n        vals.put(key, value); counts.put(key, 1); min = 1; lists.get(1).add(key);\n    }\n}",
      python: "import collections\nclass LFUCache:\n    def __init__(self, capacity: int):\n        self.cap, self.minf = capacity, 0\n        self.val, self.freq, self.freq_dict = {}, {}, collections.defaultdict(collections.OrderedDict)\n    def get(self, key: int) -> int:\n        if key not in self.val: return -1\n        f = self.freq[key]\n        self.freq[key] = f + 1\n        del self.freq_dict[f][key]\n        if not self.freq_dict[f] and f == self.minf: self.minf += 1\n        self.freq_dict[f+1][key] = None\n        return self.val[key]\n    def put(self, key: int, value: int) -> None:\n        if self.cap <= 0: return\n        if key in self.val: self.val[key] = value; self.get(key); return\n        if len(self.val) >= self.cap:\n            k, _ = self.freq_dict[self.minf].popitem(last=False)\n            del self.val[k]; del self.freq[k]\n        self.val[key], self.freq[key], self.minf = value, 1, 1\n        self.freq_dict[1][key] = None",
      javascript: "class LFUCache {\n    constructor(capacity) {\n        this.cap = capacity; this.minf = 0; this.vals = new Map();\n        this.freqs = new Map(); this.lists = new Map();\n    }\n    get(key) {\n        if (!this.vals.has(key)) return -1;\n        let f = this.freqs.get(key); this.freqs.set(key, f + 1);\n        this.lists.get(f).delete(key);\n        if (this.lists.get(f).size === 0 && f === this.minf) this.minf++;\n        if (!this.lists.has(f + 1)) this.lists.set(f + 1, new Set());\n        this.lists.get(f + 1).add(key); return this.vals.get(key);\n    }\n    put(key, value) {\n        if (this.cap <= 0) return;\n        if (this.vals.has(key)) { this.vals.set(key, value); this.get(key); return; }\n        if (this.vals.size >= this.cap) {\n            let evit = this.lists.get(this.minf).values().next().value;\n            this.lists.get(this.minf).delete(evit);\n            this.vals.delete(evit); this.freqs.delete(evit);\n        }\n        this.vals.set(key, value); this.freqs.set(key, 1); this.minf = 1;\n        if (!this.lists.has(1)) this.lists.set(1, new Set());\n        this.lists.get(1).add(key);\n    }\n}"
    },
    testCases: [
      { input: "LFUCache(2), put(1,1), put(2,2), get(1), put(3,3)", expected: "-1" }
    ],
    jsTestCall: `(function(){ let c = new LFUCache(2); c.put(1,1); c.put(2,2); c.get(1); c.put(3,3); return String(c.get(2)); })()`
  }
];