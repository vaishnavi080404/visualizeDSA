const TOPIC_CONFIG = {
  name: "Heap",
  level: "Level 3 of 3 · Problems",
  backLink: "heap_L1.html",
  backLabel: "Heap",
};

const PROBLEMS = [
  {
    id: 1,
    title: "Heap Sort",
    difficulty: "Medium",
    accuracy: "55.20%",
    submissions: "300K+",
    companies: ["Amazon", "Microsoft", "Oracle"],
    pattern: "Heapify / Build Heap",
    realWorld: [
      "Used in systems with restricted memory where an in-place O(N log N) sort",
      "is required, such as embedded systems and Linux kernel sorting logic.",
    ].join(" "),
    description: [
      "Given an array of size <strong>N</strong>, sort it using the <strong>Heap Sort</strong> algorithm.",
      "The process involves building a Max-Heap and repeatedly extracting the maximum element.",
    ].join(" "),
    examples: [
      { input: "N = 5, arr[] = [4, 1, 3, 9, 7]", output: "[1, 3, 4, 7, 9]" },
    ],
    constraints: ["1 ≤ N ≤ 10⁶", "1 ≤ arr[i] ≤ 10⁶"],
    hint: [
      "Step 1: Build a Max-Heap from the input array in O(N).",
      "Step 2: Swap the root (max) with the last element of the heap.",
      "Step 3: Reduce heap size and heapify the root.",
      "<br>Time: O(N log N) · Space: O(1) in-place.",
    ].join("<br>• "),
    starterCode: {
      cpp: [
        "class Solution {",
        "public:",
        "    void heapSort(int arr[], int n) {",
        "        // Your code here",
        "    }",
        "};",
      ].join("\n"),
      java: [
        "class Solution {",
        "    public void heapSort(int arr[], int n) {",
        "        // Your code here",
        "    }",
        "}",
      ].join("\n"),
      python: [
        "class Solution:",
        "    def HeapSort(self, arr, n):",
        "        # Your code here",
        "        pass",
      ].join("\n"),
      javascript: [
        "function heapSort(arr) {",
        "    // Your code here",
        "}",
      ].join("\n"),
    },
    solution: {
      cpp: [
        "void heapify(int arr[], int n, int i) {",
        "    int largest = i, l = 2*i + 1, r = 2*i + 2;",
        "    if (l < n && arr[l] > arr[largest]) largest = l;",
        "    if (r < n && arr[r] > arr[largest]) largest = r;",
        "    if (largest != i) {",
        "        swap(arr[i], arr[largest]);",
        "        heapify(arr, n, largest);",
        "    }",
        "}",
        "void heapSort(int arr[], int n) {",
        "    for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);",
        "    for (int i = n-1; i > 0; i--) {",
        "        swap(arr[0], arr[i]);",
        "        heapify(arr, i, 0);",
        "    }",
        "}",
      ].join("\n"),
      python: [
        "def heapify(arr, n, i):",
        "    largest = i",
        "    l, r = 2*i + 1, 2*i + 2",
        "    if l < n and arr[l] > arr[largest]: largest = l",
        "    if r < n and arr[r] > arr[largest]: largest = r",
        "    if largest != i:",
        "        arr[i], arr[largest] = arr[largest], arr[i]",
        "        heapify(arr, n, largest)",
        "",
        "def HeapSort(self, arr, n):",
        "    for i in range(n//2 - 1, -1, -1): heapify(arr, n, i)",
        "    for i in range(n-1, 0, -1):",
        "        arr[0], arr[i] = arr[i], arr[0]",
        "        heapify(arr, i, 0)",
      ].join("\n"),
    },
    testCases: [
      { input: "[10, 7, 8, 9, 1, 5]", expected: "[1, 5, 7, 8, 9, 10]" },
    ],
    jsTestCall: `(function(arr){ heapSort(arr); return JSON.stringify(arr); })(__INPUT__)`,
  },

  {
    id: 2,
    title: "Kth Smallest Element",
    difficulty: "Medium",
    accuracy: "42.15%",
    submissions: "800K+",
    companies: ["Amazon", "Microsoft", "Cisco"],
    pattern: "Max-Heap of Size K",
    realWorld: [
      "Used in statistics to find specific order statistics (like percentiles)",
      "and in search engines to rank the most relevant documents in O(N log K).",
    ].join(" "),
    description: [
      "Given an array <strong>arr</strong> and an integer <strong>k</strong>,",
      "find the <strong>kth smallest</strong> element in the array.",
    ].join(" "),
    examples: [
      {
        input: "arr = [7, 10, 4, 3, 20, 15], k = 3",
        output: "7",
        explain:
          "The sorted array is [3, 4, 7, 10, 15, 20]. The 3rd smallest is 7.",
      },
    ],
    constraints: ["1 ≤ arr.length ≤ 10⁵", "1 ≤ k ≤ arr.length"],
    hint: [
      "While you could sort the array, that takes O(N log N).",
      "To optimize, maintain a <strong>Max-Heap</strong> of size K.",
      "Iterate through the array: if the current element is smaller than the root of the Max-Heap, replace the root.",
      "<br>Time: O(N log K) · Space: O(K)",
    ].join("<br>• "),
    starterCode: {
      cpp: "int kthSmallest(int arr[], int n, int k) {\n    // Your code here\n}",
      java: "public static int kthSmallest(int[] arr, int k) {\n    // Your code here\n}",
      python: "def kthSmallest(arr, k):\n    # Your code here\n    pass",
      javascript: "function kthSmallest(arr, k) {\n    // Your code here\n}",
    },
    solution: {
      cpp: [
        "int kthSmallest(int arr[], int n, int k) {",
        "    priority_queue<int> pq; // Max-heap by default",
        "    for(int i=0; i<n; i++) {",
        "        pq.push(arr[i]);",
        "        if(pq.size() > k) pq.pop();",
        "    }",
        "    return pq.top();",
        "}",
      ].join("\n"),
      python: [
        "import heapq",
        "def kthSmallest(arr, k):",
        "    # Use negative values to simulate Max-Heap with heapq",
        "    heap = []",
        "    for x in arr:",
        "        heapq.heappush(heap, -x)",
        "        if len(heap) > k: heapq.heappop(heap)",
        "    return -heap[0]",
      ].join("\n"),
    },
    testCases: [{ input: "[7, 10, 4, 20, 15], 4", expected: "15" }],
    jsTestCall: `(function(arr, k){ return String(kthSmallest(arr, k)); })(__INPUT_1__, __INPUT_2__)`,
  },

  {
    id: 3,
    title: "Minimum Product of K Elements",
    difficulty: "Easy",
    accuracy: "65.40%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Min-Heap Extraction",
    realWorld: [
      "Used in financial simulations to determine the lowest possible total cost",
      "by selecting the K cheapest components from a dynamic price stream.",
    ].join(" "),
    description: [
      "Given an array <strong>arr</strong> and an integer <strong>k</strong>,",
      "calculate the <strong>minimum product</strong> of any k elements from the array.",
    ].join(" "),
    examples: [
      {
        input: "arr = [1, 2, 3, 4, 5], k = 2",
        output: "2",
        explain: "Min product is 1 * 2 = 2.",
      },
    ],
    constraints: ["1 ≤ k ≤ arr.length ≤ 10⁵"],
    hint: [
      "The minimum product is always achieved by multiplying the K smallest numbers.",
      "Build a <strong>Min-Heap</strong> in O(N).",
      "Extract the top (minimum) element K times and multiply them.",
      "<br>Time: O(N + K log N) · Space: O(N)",
    ].join("<br>• "),
    starterCode: {
      cpp: "long long minProduct(int arr[], int n, int k) {\n    // Your code here\n}",
      python: "def minProduct(arr, k):\n    # Your code here\n    pass",
      javascript: "function minProduct(arr, k) {\n    // Your code here\n}",
    },
    solution: {
      python: [
        "import heapq",
        "def minProduct(arr, k):",
        "    heapq.heapify(arr)",
        "    res, mod = 1, 10**9 + 7",
        "    for _ in range(k):",
        "        res = (res * heapq.heappop(arr)) % mod",
        "    return res",
      ].join("\n"),
      javascript: [
        "function minProduct(arr, k) {",
        "    arr.sort((a, b) => a - b); // Simplified for JS demo",
        "    let res = 1;",
        "    for (let i = 0; i < k; i++) res *= arr[i];",
        "    return res;",
        "}",
      ].join("\n"),
    },
    testCases: [{ input: "[198, 76, 544, 123, 154, 67], 2", expected: "4422" }],
    jsTestCall: `(function(arr, k){ return String(minProduct(arr, k)); })(__INPUT_1__, __INPUT_2__)`,
  },

  {
    id: 4,
    title: "Sort an Almost Sorted Array",
    difficulty: "Medium",
    accuracy: "58.20%",
    submissions: "150K+",
    companies: ["Microsoft", "Morgan Stanley"],
    pattern: "Sliding Window Heap",
    realWorld: [
      "Used in data streams where elements arrive slightly out of order due to network latency,",
      "allowing the system to sort them with minimal delay using a buffer of size K.",
    ].join(" "),
    description: [
      "Given an array where each element is at most <strong>k</strong> positions away",
      "from its target position, sort the array in <strong>O(N log K)</strong> time.",
    ].join(" "),
    examples: [
      {
        input: "arr = [6, 5, 3, 2, 8, 10, 9], k = 3",
        output: "[2, 3, 5, 6, 8, 9, 10]",
      },
    ],
    constraints: ["1 ≤ N ≤ 10⁵", "1 ≤ k < N"],
    hint: [
      "Because each element is at most K away, the minimum element must be within the first K+1 indices.",
      "Use a <strong>Min-Heap</strong> to store the first K+1 elements.",
      "Repeatedly extract the minimum and add the next element from the array into the heap.",
      "<br>Time: O(N log K) · Space: O(K)",
    ].join("<br>• "),
    starterCode: {
      cpp: "void nearlySorted(int arr[], int n, int k) {\n    // Your code here\n}",
      java: "public void nearlySorted(int[] arr, int k) {\n    // Your code here\n}",
      javascript: "function nearlySorted(arr, k) {\n    // Your code here\n}",
    },
    solution: {
      cpp: [
        "void nearlySorted(int arr[], int n, int k) {",
        "    priority_queue<int, vector<int>, greater<int>> pq;",
        "    int idx = 0;",
        "    for(int i=0; i <= k && i < n; i++) pq.push(arr[i]);",
        "    for(int i=k+1; i < n; i++) {",
        "        arr[idx++] = pq.top(); pq.pop();",
        "        pq.push(arr[i]);",
        "    }",
        "    while(!pq.empty()) { arr[idx++] = pq.top(); pq.pop(); }",
        "}",
      ].join("\n"),
      javascript: [
        "function nearlySorted(arr, k) {",
        "    // Note: In real scenarios, use a Heap class.",
        "    // This logic simulates the K-window sort.",
        "    return arr.sort((a, b) => a - b);",
        "}",
      ].join("\n"),
    },
    testCases: [
      { input: "[2, 6, 3, 12, 56, 8], 3", expected: "[2, 3, 6, 8, 12, 56]" },
    ],
    jsTestCall: `(function(arr, k){ nearlySorted(arr, k); return JSON.stringify(arr); })(__INPUT_1__, __INPUT_2__)`,
  },
  {
  id: 5,
  title: "Top K Frequent Elements",
  difficulty: "Medium",
  accuracy: "52.10%",
  submissions: "900K+",
  companies: ["Amazon", "Google", "Facebook"],
  pattern: "Frequency Map + Min-Heap",
  realWorld: [
    "Used in social media analytics to identify trending hashtags and in",
    "e-commerce to display the 'most purchased' items in a specific category."
  ].join(" "),
  description: [
    "Given an integer array <strong>nums</strong> and an integer <strong>k</strong>,",
    "return the k most frequent elements. You may return the answer in any order."
  ].join(" "),
  examples: [
    { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
    { input: "nums = [1], k = 1", output: "[1]" }
  ],
  constraints: [
    "1 ≤ nums.length ≤ 10⁵",
    "k is in the range [1, number of unique elements in the array]."
  ],
  hint: [
    "First, count the frequency of each number using a Hash Map.",
    "Maintain a <strong>Min-Heap</strong> of size K based on the frequencies.",
    "If the current element's frequency is higher than the heap's root, replace the root.",
    "<br>Time: O(N log K) · Space: O(N)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    vector<int> topKFrequent(vector<int>& nums, int k) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public int[] topKFrequent(int[] nums, int k) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "import heapq",
      "class Solution:",
      "    def topKFrequent(self, nums: List[int], k: int) -> List[int]:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function topKFrequent(nums, k) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "vector<int> topKFrequent(vector<int>& nums, int k) {",
      "    unordered_map<int, int> count;",
      "    for (int n : nums) count[n]++;",
      "    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;",
      "    for (auto const& [val, freq] : count) {",
      "        pq.push({freq, val});",
      "        if (pq.size() > k) pq.pop();",
      "    }",
      "    vector<int> res;",
      "    while (!pq.empty()) { res.push_back(pq.top().second); pq.pop(); }",
      "    return res;",
      "}"
    ].join("\n"),
    python: [
      "def topKFrequent(self, nums, k):",
      "    count = collections.Counter(nums)",
      "    return heapq.nlargest(k, count.keys(), key=count.get)"
    ].join("\n"),
    javascript: [
      "function topKFrequent(nums, k) {",
      "    const map = new Map();",
      "    nums.forEach(n => map.set(n, (map.get(n) || 0) + 1));",
      "    return [...map.keys()]",
      "        .sort((a, b) => map.get(b) - map.get(a))",
      "        .slice(0, k);",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[1,1,1,2,2,3], 2", expected: "[1,2]" }
  ],
  jsTestCall: `(function(nums, k){ return JSON.stringify(topKFrequent(nums, k).sort()); })(__INPUT_1__, __INPUT_2__)`
},
{
  id: 6,
  title: "Rearrange Characters",
  difficulty: "Hard",
  accuracy: "34.50%",
  submissions: "150K+",
  companies: ["Amazon", "Directi", "Samsung"],
  pattern: "Max-Heap + Greedy",
  realWorld: [
    "Used in task scheduling where the same type of job cannot be executed",
    "back-to-back to prevent hardware overheating or resource deadlocks."
  ].join(" "),
  description: [
    "Given a string <strong>S</strong>, rearrange its characters such that no",
    "two adjacent characters are the same. If not possible, return an empty string."
  ].join(" "),
  examples: [
    { input: "S = 'aaabc'", output: "'abaca'", explain: "Characters are rearranged to avoid same-neighbor overlaps." },
    { input: "S = 'aaabb'", output: "'ababa'" }
  ],
  constraints: ["1 ≤ S.length ≤ 10⁵", "S consists of lowercase English letters."],
  hint: [
    "Store character frequencies in a <strong>Max-Heap</strong>.",
    "Always pick the character with the highest remaining frequency to place next.",
    "Keep track of the 'previous' character used and don't push it back into the heap until you have placed another character.",
    "<br>Time: O(N log A) where A is alphabet size."
  ].join("<br>• "),
  starterCode: {
    cpp: "string reorganizeString(string s) {\n    // Your code here\n}",
    java: "public String reorganizeString(String s) {\n    // Your code here\n}",
    python: "def reorganizeString(self, s: str) -> str:\n    # Your code here",
    javascript: "function reorganizeString(s) {\n    // Your code here\n}"
  },
  solution: {
    cpp: [
      "string reorganizeString(string s) {",
      "    unordered_map<char, int> m;",
      "    for (char c : s) m[c]++;",
      "    priority_queue<pair<int, char>> pq;",
      "    for (auto x : m) pq.push({x.second, x.first});",
      "    string res = \"\"; pair<int, char> prev = {-1, '#'};",
      "    while (!pq.empty()) {",
      "        auto cur = pq.top(); pq.pop();",
      "        res += cur.second;",
      "        if (prev.first > 0) pq.push(prev);",
      "        cur.first--; prev = cur;",
      "    }",
      "    return res.length() == s.length() ? res : \"\";",
      "}"
    ].join("\n"),
    javascript: [
      "function reorganizeString(s) {",
      "    const map = {};",
      "    for (let c of s) map[c] = (map[c] || 0) + 1;",
      "    const pq = Object.keys(map).sort((a, b) => map[b] - map[a]);",
      "    if (map[pq[0]] > (s.length + 1) / 2) return '';",
      "    let res = new Array(s.length), idx = 0;",
      "    for (let c of pq) {",
      "        for (let i = 0; i < map[c]; i++) {",
      "            if (idx >= s.length) idx = 1;",
      "            res[idx] = c; idx += 2;",
      "        }",
      "    }",
      "    return res.join('');",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "'aab'", expected: "'aba'" },
    { input: "'aaab'", expected: "''" }
  ],
  jsTestCall: `(function(s){ return String(reorganizeString(s)); })(__INPUT__)`
},
{
  id: 7,
  title: "Convert Min Heap to Max Heap",
  difficulty: "Medium",
  accuracy: "62.30%",
  submissions: "80K+",
  companies: ["Amazon", "Microsoft"],
  pattern: "Bottom-Up Heapify",
  realWorld: [
    "Used in database systems to switch the priority ordering of an existing",
    "search index without re-allocating entirely new memory buffers."
  ].join(" "),
  description: [
    "You are given an array representation of a <strong>Min-Heap</strong>.",
    "Convert it into a <strong>Max-Heap</strong> in-place."
  ].join(" "),
  examples: [
    { input: "arr = [3, 5, 9, 6, 8, 20, 10, 12, 18, 9]", output: "[20, 18, 10, 12, 9, 9, 3, 5, 6, 8]" }
  ],
  constraints: ["1 ≤ arr.length ≤ 10⁵"],
  hint: [
    "Basically, ignore the fact that it is a Min-Heap. Treat it as a random array.",
    "Use <strong>Floyd's Algorithm</strong>: start from the last non-leaf node and work your way up to the root.",
    "At each step, perform a 'Max-Heapify Down' operation.",
    "<br>Time: O(N) · Space: O(1) in-place."
  ].join("<br>• "),
  starterCode: {
    cpp: "void convertMinToMaxHeap(int arr[], int n) {\n    // Your code here\n}",
    java: "static void convert(int arr[], int n) {\n    // Your code here\n}",
    python: "def convert(arr, n):\n    # Your code here\n    pass",
    javascript: "function convert(arr) {\n    // Your code here\n}"
  },
  solution: {
    cpp: [
      "void maxHeapify(int arr[], int i, int n) {",
      "    int l = 2*i + 1, r = 2*i + 2, largest = i;",
      "    if (l < n && arr[l] > arr[i]) largest = l;",
      "    if (r < n && arr[r] > arr[largest]) largest = r;",
      "    if (largest != i) {",
      "        swap(arr[i], arr[largest]);",
      "        maxHeapify(arr, largest, n);",
      "    }",
      "}",
      "void convertMinToMaxHeap(int arr[], int n) {",
      "    for (int i = (n-2)/2; i >= 0; --i)",
      "        maxHeapify(arr, i, n);",
      "}"
    ].join("\n"),
    javascript: [
      "function convert(arr) {",
      "    const n = arr.length;",
      "    function heapify(i) {",
      "        let l = 2*i+1, r = 2*i+2, max = i;",
      "        if(l < n && arr[l] > arr[max]) max = l;",
      "        if(r < n && arr[r] > arr[max]) max = r;",
      "        if(max !== i) {",
      "            [arr[i], arr[max]] = [arr[max], arr[i]];",
      "            heapify(max);",
      "        }",
      "    }",
      "    for(let i = Math.floor(n/2); i >= 0; i--) heapify(i);",
      "    return arr;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[3, 4, 8, 5, 10]", expected: "[10, 5, 8, 3, 4]" }
  ],
  jsTestCall: `(function(arr){ return JSON.stringify(convert(arr)); })(__INPUT__)`
},
{
  id: 8,
  title: "Merge K Sorted Arrays",
  difficulty: "Medium",
  accuracy: "58.10%",
  submissions: "200K+",
  companies: ["Amazon", "Microsoft", "Oyo"],
  pattern: "Min-Heap of Size K",
  realWorld: [
    "Used in database engines to combine results from multiple sorted shards (distributed systems)",
    "and in external sorting where data is too large to fit in RAM and must be merged from disk chunks."
  ].join(" "),
  description: [
    "Given <strong>K</strong> sorted arrays each of size <strong>N</strong>, merge them into",
    "a single sorted array. The output array should be of size K*N."
  ].join(" "),
  examples: [
    { 
      input: "K = 3, arrays = [[1, 5, 8], [2, 3, 7], [4, 6, 9]]", 
      output: "[1, 2, 3, 4, 5, 6, 7, 8, 9]" 
    }
  ],
  constraints: [
    "1 ≤ K, N ≤ 500",
    "Each array is sorted in ascending order."
  ],
  hint: [
    "Use a <strong>Min-Heap</strong> of size K to store the first element of each array.",
    "The heap node should store: {value, array_index, element_index}.",
    "Pop the minimum element, add it to the result, and push the next element from the same array into the heap.",
    "<br>Time: O(K*N * log K) · Space: O(K)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "struct Node { int val, r, c; };",
      "class Solution {",
      "public:",
      "    vector<int> mergeKArrays(vector<vector<int>> arr, int k) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "class Node { int val, r, c; Node(int v, int row, int col){val=v;r=row;c=col;} }",
      "public class Solution {",
      "    public ArrayList<Integer> mergeKArrays(int[][] arr, int k) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def mergeKArrays(self, arrays, k):",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function mergeKArrays(arrays, k) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "struct Node {",
      "    int val, r, c;",
      "    bool operator>(const Node& other) const { return val > other.val; }",
      "};",
      "vector<int> mergeKArrays(vector<vector<int>> arr, int K) {",
      "    vector<int> res;",
      "    priority_queue<Node, vector<Node>, greater<Node>> pq;",
      "    for(int i=0; i<K; i++) pq.push({arr[i][0], i, 0});",
      "    while(!pq.empty()) {",
      "        Node cur = pq.top(); pq.pop();",
      "        res.push_back(cur.val);",
      "        if(cur.c + 1 < arr[cur.r].size())",
      "            pq.push({arr[cur.r][cur.c+1], cur.r, cur.c+1});",
      "    }",
      "    return res;",
      "}"
    ].join("\n"),
    python: [
      "import heapq",
      "def mergeKArrays(self, arrays, k):",
      "    res = []",
      "    # heap stores (value, array_index, element_index)",
      "    min_heap = [(arr[0], i, 0) for i, arr in enumerate(arrays) if arr]",
      "    heapq.heapify(min_heap)",
      "    while min_heap:",
      "        val, r, c = heapq.heappop(min_heap)",
      "        res.append(val)",
      "        if c + 1 < len(arrays[r]):",
      "            heapq.heappush(min_heap, (arrays[r][c+1], r, c+1))",
      "    return res"
    ].join("\n")
  },
  testCases: [
    { input: "[[1, 3], [2, 4]], 2", expected: "[1, 2, 3, 4]" }
  ],
  jsTestCall: `(function(arrs, k){ return JSON.stringify(mergeKArrays(arrs, k)); })(__INPUT_1__, __INPUT_2__)`
},
{
  id: 9,
  title: "Merge K Sorted Lists",
  difficulty: "Hard",
  accuracy: "42.30%",
  submissions: "1.2M+",
  companies: ["Amazon", "Google", "Facebook", "Airbnb"],
  pattern: "Min-Heap / Linked List",
  realWorld: [
    "Used in messaging apps to merge chat histories from multiple devices into a",
    "single unified chronological view for the user."
  ].join(" "),
  description: [
    "You are given an array of <strong>k</strong> linked lists, each sorted in ascending order.",
    "Merge all the linked lists into one sorted linked list and return it."
  ].join(" "),
  examples: [
    { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }
  ],
  constraints: [
    "k == lists.length",
    "0 ≤ k ≤ 10⁴",
    "0 ≤ lists[i].length ≤ 500"
  ],
  hint: [
    "Similar to merging sorted arrays, use a <strong>Min-Heap</strong> of size K.",
    "Add the head node of every non-empty list into the heap.",
    "Extract the smallest node, link it to your result list, and then add the <strong>next</strong> node of that extracted list into the heap.",
    "<br>Time: O(N log K) · Space: O(K) where N is total nodes."
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    ListNode* mergeKLists(vector<ListNode*>& lists) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function mergeKLists(lists) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "struct compare {",
      "    bool operator()(ListNode* a, ListNode* b) { return a->val > b->val; }",
      "};",
      "ListNode* mergeKLists(vector<ListNode*>& lists) {",
      "    priority_queue<ListNode*, vector<ListNode*>, compare> pq;",
      "    for (auto l : lists) if (l) pq.push(l);",
      "    ListNode dummy(0); ListNode* tail = &dummy;",
      "    while (!pq.empty()) {",
      "        ListNode* cur = pq.top(); pq.pop();",
      "        tail->next = cur; tail = tail->next;",
      "        if (cur->next) pq.push(cur->next);",
      "    }",
      "    return dummy.next;",
      "}"
    ].join("\n"),
    javascript: [
      "function mergeKLists(lists) {",
      "    const pq = [];",
      "    for (let l of lists) if (l) pq.push(l);",
      "    // Final year hack: JS doesn't have built-in heap,",
      "    // so we simulate the extraction with sorting.",
      "    let dummy = new ListNode(0), tail = dummy;",
      "    while (pq.length) {",
      "        pq.sort((a, b) => a.val - b.val);",
      "        let node = pq.shift();",
      "        tail.next = node; tail = tail.next;",
      "        if (node.next) pq.push(node.next);",
      "    }",
      "    return dummy.next;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[[1,4],[2,3]]", expected: "[1,2,3,4]" }
  ],
  jsTestCall: `(function(lists){ return JSON.stringify(mergeKLists(lists)); })(__INPUT__)`
},
{
  id: 10,
  title: "Median from Data Stream",
  difficulty: "Hard",
  accuracy: "52.45%",
  submissions: "750K+",
  companies: ["Google", "Amazon", "Apple", "Goldman Sachs"],
  pattern: "Two Heaps (Max-Heap & Min-Heap)",
  realWorld: [
    "Used in financial systems to calculate the running median of stock prices or",
    "in network monitoring to find the median latency of packets in real-time."
  ].join(" "),
  description: [
    "Implement a data structure that supports adding numbers from a stream and",
    "calculating the <strong>median</strong> of all elements seen so far.",
    "Median is the middle value in a sorted list; if even size, it is the average of the two middle values."
  ].join(" "),
  examples: [
    { input: "add(1), add(2), findMedian(), add(3), findMedian()", output: "1.5, 2.0" }
  ],
  constraints: [
    "-10⁵ ≤ num ≤ 10⁵",
    "At most 5 * 10⁴ calls will be made to add/find."
  ],
  hint: [
    "Sorting the entire stream every time is too slow — O(N²).",
    "The trick: Split data into two halves. 1. Lower half (Max-Heap) 2. Upper half (Min-Heap).",
    "Keep the sizes balanced (difference ≤ 1).",
    "If size is odd, median is the root of the larger heap. If even, it is the average of both roots.",
    "<br>Time: add: O(log N), find: O(1) · Space: O(N)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class MedianFinder {",
      "public:",
      "    void addNum(int num) {}",
      "    double findMedian() {}",
      "};"
    ].join("\n"),
    python: [
      "class MedianFinder:",
      "    def __init__(self):",
      "        pass",
      "    def addNum(self, num: int) -> None:",
      "        pass",
      "    def findMedian(self) -> float:",
      "        pass"
    ].join("\n"),
    javascript: [
      "class MedianFinder {",
      "    constructor() {}",
      "    addNum(num) {}",
      "    findMedian() {}",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "class MedianFinder {",
      "    priority_queue<int> lo; // Max-heap",
      "    priority_queue<int, vector<int>, greater<int>> hi; // Min-heap",
      "public:",
      "    void addNum(int num) {",
      "        lo.push(num);",
      "        hi.push(lo.top()); lo.pop();",
      "        if (hi.size() > lo.size()) {",
      "            lo.push(hi.top()); hi.pop();",
      "        }",
      "    }",
      "    double findMedian() {",
      "        return lo.size() > hi.size() ? lo.top() : (lo.top() + hi.top()) / 2.0;",
      "    }",
      "};"
    ].join("\n"),
    python: [
      "import heapq",
      "class MedianFinder:",
      "    def __init__(self):",
      "        self.small = [] # Max-heap",
      "        self.large = [] # Min-heap",
      "    def addNum(self, num):",
      "        heapq.heappush(self.small, -num)",
      "        heapq.heappush(self.large, -heapq.heappop(self.small))",
      "        if len(self.large) > len(self.small):",
      "            heapq.heappush(self.small, -heapq.heappop(self.large))",
      "    def findMedian(self):",
      "        if len(self.small) > len(self.large): return -self.small[0]",
      "        return (-self.small[0] + self.large[0]) / 2.0"
    ].join("\n")
  },
  testCases: [
    { input: "1, 2, 3", expected: "2.0" }
  ],
  jsTestCall: `(function(nums){ let m = new MedianFinder(); nums.forEach(n => m.addNum(n)); return String(m.findMedian()); })(__INPUT__)`
}
];
