const TOPIC_CONFIG = {
  name: "Hashing",
  level: "Level 3 of 3 · Problems",
  backLink: "hashing_L1.html",
  backLabel: "Hashing"
};

const PROBLEMS = [
{
  id: 1,
  title: "Array Subset of another array",
  difficulty: "Easy",
  accuracy: "78.40%",
  submissions: "350K+",
  companies: ["Amazon", "Microsoft", "Cisco"],
  pattern: "Hashing / Set",

  realWorld: [
    "Used in e-commerce to verify if all items in a shared wishlist are currently available",
    "in the inventory list, and in database systems to validate sub-queries."
  ].join(" "),

  description: [
    "Given two arrays <strong>a1</strong> and <strong>a2</strong>, determine if",
    "<strong>a2</strong> is a subset of <strong>a1</strong>. a2 is a subset",
    "if every element of a2 exists in a1."
  ].join(" "),

  examples: [
    { 
      input: "a1 = [11, 1, 13, 21, 3, 7], a2 = [11, 3, 7, 1]", 
      output: "true", 
      explain: "All elements of a2 (11, 3, 7, 1) are present in a1." 
    },
    { 
      input: "a1 = [1, 2, 3], a2 = [4]", 
      output: "false", 
      explain: "4 is not present in a1." 
    }
  ],

  constraints: [
    "1 ≤ a1.length, a2.length ≤ 10⁵",
    "0 ≤ val ≤ 10⁶"
  ],

  hint: [
    "Store all elements of the first array (a1) into a Hash Set.",
    "Iterate through the second array (a2) and check if each element exists in the set.",
    "If all elements match, return true.",
    "<br>Time: O(N + M) · Space: O(N)"
  ].join("<br>• "),

  starterCode: {
    cpp: `class Solution {
public:
    bool isSubset(int a1[], int a2[], int n, int m) {
        // Your code here
    }
};`,

    java: `class Solution {
    public boolean isSubset(long a1[], long a2[], long n, long m) {
        // Your code here
    }
}`,

    python: `class Solution:
    def isSubset(self, a1, a2, n, m):
        # Your code here
        pass`,

    javascript: `function isSubset(a1, a2) {
    // Your code here
}`
  },

  solution: {
    cpp: `bool isSubset(int a1[], int a2[], int n, int m) {
    unordered_set<int> s;
    for(int i=0; i<n; i++) s.insert(a1[i]);
    for(int i=0; i<m; i++) {
        if(s.find(a2[i]) == s.end()) return false;
    }
    return true;
}`,

    java: `public boolean isSubset(long a1[], long a2[], long n, long m) {
    HashSet<Long> set = new HashSet<>();
    for(long x : a1) set.add(x);
    for(long x : a2) if(!set.contains(x)) return false;
    return true;
}`,

    python: `def isSubset(self, a1, a2, n, m):
    s1 = set(a1)
    for x in a2:
        if x not in s1:
            return False
    return True`,

    javascript: `function isSubset(a1, a2) {
    if (!Array.isArray(a1) || !Array.isArray(a2)) return false;

    const set = new Set(a1);

    for (let val of a2) {
        if (!set.has(val)) return false;
    }

    return true;
}`
  },

  testCases: [
    { input: "[1,2,3,4,5], [2,3]", expected: "true" },
    { input: "[10,5,2], [5,20]", expected: "false" }
  ],

  jsTestCall: `(function(a1, a2){
    try {
        return String(isSubset(a1, a2));
    } catch(e) {
        return "error";
    }
})(__INPUT_1__, __INPUT_2__)`
},
{
  id: 2,
  title: "Character Frequency",
  difficulty: "Easy",
  accuracy: "82.15%",
  submissions: "200K+",
  companies: ["Google", "MakeMyTrip", "Paytm"],
  pattern: "Frequency Map",
  realWorld: [
    "Used in data compression algorithms like Huffman Coding to determine",
    "the most frequent characters and assign them shorter binary codes."
  ].join(" "),
  description: [
    "Given a string <strong>s</strong>, count the occurrences (frequency) of",
    "each character and return the result as a map or print it."
  ].join(" "),
  examples: [
    { input: "s = 'hello'", output: "{h: 1, e: 1, l: 2, o: 1}" }
  ],
  constraints: ["1 ≤ s.length ≤ 10⁵", "s contains lowercase English letters."],
  hint: [
    "Use a Hash Map where the key is the character and the value is the count.",
    "Traverse the string once; for each character, increment its value in the map.",
    "<br>Time: O(n) · Space: O(k) where k is alphabet size (26)."
  ].join("<br>• "),
  starterCode: {
    cpp: "void getFreq(string s) {\n    // Your code here\n}",
    java: "public void getFreq(String s) {\n    // Your code here\n}",
    python: "def getFreq(s):\n    # Return a dictionary\n    pass",
    javascript: "function getFreq(s) {\n    // Your code here\n}"
  },
  solution: {
    cpp: [
      "void getFreq(string s) {",
      "    unordered_map<char, int> m;",
      "    for(char c : s) m[c]++;",
      "    for(auto x : m) cout << x.first << ':' << x.second << ' ';",
      "}"
    ].join("\n"),
    python: [
      "def getFreq(s):",
      "    freq = {}",
      "    for char in s:",
      "        freq[char] = freq.get(char, 0) + 1",
      "    return freq"
    ].join("\n"),
    javascript: [
      "function getFreq(s) {",
      "    const map = {};",
      "    for (let char of s) {",
      "        map[char] = (map[char] || 0) + 1;",
      "    }",
      "    return map;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "'geeks'", expected: '{"g":1,"e":2,"k":1,"s":1}' }
  ],
  jsTestCall: `(function(s){ return JSON.stringify(getFreq(s)); })(__INPUT__)`
},
{
  id: 3,
  title: "First Non-Repeating Character",
  difficulty: "Easy",
  accuracy: "45.10%",
  submissions: "500K+",
  companies: ["Amazon", "Google", "Facebook"],
  pattern: "Two-Pass Hashing",
  realWorld: [
    "Used in stream processing to find the first unique event in a sequence,",
    "or in network packet analysis to identify the first unique sender address."
  ].join(" "),
  description: [
    "Given a string <strong>s</strong>, find the first non-repeating character in it",
    "and return its index. If it does not exist, return -1."
  ].join(" "),
  examples: [
    { input: "s = 'leetcode'", output: "0", explain: "'l' is the first unique char." },
    { input: "s = 'loveleetcode'", output: "2", explain: "'v' is the first unique char." }
  ],
  constraints: ["1 ≤ s.length ≤ 10⁵"],
  hint: [
    "Perform two passes over the input.",
    "First pass: Build a frequency map of all characters in the string.",
    "Second pass: Iterate through the string again and check the map for the first character with a count of 1.",
    "<br>Time: O(n) · Space: O(1) (only 26 letters)."
  ].join("<br>• "),
  starterCode: {
    cpp: "int firstUniqChar(string s) {\n    // Your code here\n}",
    java: "public int firstUniqChar(String s) {\n    // Your code here\n}",
    python: "class Solution:\n    def firstUniqChar(self, s: str) -> int:\n        # Your code here\n        pass",
    javascript: "function firstUniqChar(s) {\n    // Your code here\n}"
  },
  solution: {
    cpp: [
      "int firstUniqChar(string s) {",
      "    unordered_map<char, int> count;",
      "    for (char c : s) count[c]++;",
      "    for (int i = 0; i < s.length(); i++) {",
      "        if (count[s[i]] == 1) return i;",
      "    }",
      "    return -1;",
      "}"
    ].join("\n"),
    python: [
      "def firstUniqChar(self, s: str) -> int:",
      "    count = collections.Counter(s)",
      "    for i, ch in enumerate(s):",
      "        if count[ch] == 1: return i",
      "    return -1"
    ].join("\n"),
    javascript: [
      "function firstUniqChar(s) {",
      "    const map = {};",
      "    for (let char of s) map[char] = (map[char] || 0) + 1;",
      "    for (let i = 0; i < s.length; i++) {",
      "        if (map[s[i]] === 1) return i;",
      "    }",
      "    return -1;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "'aabb'", expected: "-1" },
    { input: "'leetcode'", expected: "0" }
  ],
  jsTestCall: `(function(s){ return String(firstUniqChar(s)); })(__INPUT__)`
},
{
  id: 4,
  title: "Intersection of Two Arrays",
  difficulty: "Easy",
  accuracy: "70.20%",
  submissions: "600K+",
  companies: ["Google", "Facebook", "LinkedIn"],
  pattern: "Set Intersection",
  realWorld: [
    "Used in social media algorithms to find 'Mutual Friends' between two users,",
    "and in search engines to find overlapping keywords in documents."
  ].join(" "),
  description: [
    "Given two integer arrays <strong>nums1</strong> and <strong>nums2</strong>,",
    "return an array of their <strong>intersection</strong>. Each element in",
    "the result must be <strong>unique</strong>."
  ].join(" "),
  examples: [
    { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2]" },
    { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", output: "[9,4]" }
  ],
  constraints: ["1 ≤ nums1.length, nums2.length ≤ 1000"],
  hint: [
    "Store the elements of the first array in a Set (to handle duplicates).",
    "Iterate through the second array and check if the current element exists in the Set.",
    "If it exists, add it to the result set and remove it from the original set to keep results unique.",
    "<br>Time: O(N + M) · Space: O(min(N, M))"
  ].join("<br>• "),
  starterCode: {
    cpp: "vector<int> intersection(vector<int>& n1, vector<int>& n2) {\n    // Your code here\n}",
    java: "public int[] intersection(int[] n1, int[] n2) {\n    // Your code here\n}",
    python: "def intersection(self, n1, n2):\n    # Your code here\n    pass",
    javascript: "function intersection(n1, n2) {\n    // Your code here\n}"
  },
  solution: {
    python: [
      "def intersection(self, n1, n2):",
      "    set1 = set(n1)",
      "    set2 = set(n2)",
      "    return list(set1 & set2)"
    ].join("\n"),
    javascript: [
      "function intersection(n1, n2) {",
      "    const s1 = new Set(n1);",
      "    const res = new Set();",
      "    for (let x of n2) {",
      "        if (s1.has(x)) res.add(x);",
      "    }",
      "    return Array.from(res);",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[1,2,2,1], [2,2]", expected: "[2]" },
    { input: "[4,9,5], [9,4,8]", expected: "[9,4]" }
  ],
  jsTestCall: `(function(n1, n2){ return JSON.stringify(intersection(n1, n2)); })(__INPUT_1__, __INPUT_2__)`
},
{
  id: 5,
  title: "Longest Consecutive Sequence",
  difficulty: "Medium",
  accuracy: "48.60%",
  submissions: "380K+",
  companies: ["Google", "Amazon", "Microsoft"],
  pattern: "Hashing / Intelligent Sequence Building",
  realWorld: [
    "Used in identifying consecutive streaks of user activity (like login streaks) in",
    "large-scale log databases, and in finding continuous ranges in IP address management."
  ].join(" "),
  description: [
    "Given an unsorted array of integers <strong>nums</strong>, return the length of the",
    "longest consecutive elements sequence. The algorithm must run in",
    "<strong>O(n)</strong> time."
  ].join(" "),
  examples: [
    { 
      input: "nums = [100, 4, 200, 1, 3, 2]", 
      output: "4", 
      explain: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4." 
    },
    {
      input: "nums = [0,3,7,2,5,8,4,6,0,1]",
      output: "9"
    }
  ],
  constraints: [
    "0 ≤ nums.length ≤ 10⁵",
    "-10⁹ ≤ nums[i] ≤ 10⁹"
  ],
  hint: [
    "Insert all elements into a Hash Set for O(1) lookups.",
    "Iterate through the array. Only start building a sequence if 'num - 1' is not in the Set.",
    "If 'num - 1' is missing, it means 'num' is the potential start of a new sequence.",
    "<br>Time: O(n) · Space: O(n)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    int longestConsecutive(vector<int>& nums) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "class Solution {",
      "    public int longestConsecutive(int[] nums) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def longestConsecutive(self, nums: List[int]) -> int:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function longestConsecutive(nums) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "int longestConsecutive(vector<int>& nums) {",
      "    unordered_set<int> s(nums.begin(), nums.end());",
      "    int longest = 0;",
      "    for (int n : s) {",
      "        if (s.find(n - 1) == s.end()) {",
      "            int curNum = n;",
      "            int curStreak = 1;",
      "            while (s.find(curNum + 1) != s.end()) {",
      "                curNum++; curStreak++;",
      "            }",
      "            longest = max(longest, curStreak);",
      "        }",
      "    }",
      "    return longest;",
      "}"
    ].join("\n"),
    python: [
      "def longestConsecutive(self, nums):",
      "    num_set = set(nums)",
      "    longest = 0",
      "    for n in num_set:",
      "        if (n - 1) not in num_set:",
      "            cur_n = n",
      "            streak = 1",
      "            while (cur_n + 1) in num_set:",
      "                cur_n += 1",
      "                streak += 1",
      "            longest = max(longest, streak)",
      "    return longest"
    ].join("\n"),
    javascript: [
      "function longestConsecutive(nums) {",
      "    const set = new Set(nums);",
      "    let maxLen = 0;",
      "    for (let num of set) {",
      "        if (!set.has(num - 1)) {",
      "            let curNum = num;",
      "            let curLen = 1;",
      "            while (set.has(curNum + 1)) {",
      "                curNum++; curLen++;",
      "            }",
      "            maxLen = Math.max(maxLen, curLen);",
      "        }",
      "    }",
      "    return maxLen;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[100, 4, 200, 1, 3, 2]", expected: "4" },
    { input: "[1, 2, 0, 1]", expected: "3" }
  ],
  jsTestCall: `(function(nums){ return String(longestConsecutive(nums)); })(__INPUT__)`
},
{
  id: 6,
  title: "Count Pairs with Given Sum",
  difficulty: "Easy",
  accuracy: "38.50%",
  submissions: "450K+",
  companies: ["Amazon", "Accolite", "FactSet"],
  pattern: "Frequency Hashing",
  realWorld: [
    "Used in financial systems to reconcile transactions that balance each other out,",
    "and in matching algorithms where two entities must meet a combined score requirement."
  ].join(" "),
  description: [
    "Given an array of integers <strong>arr</strong> and an integer <strong>k</strong>,",
    "find the total number of pairs of elements in the array whose sum is equal to k."
  ].join(" "),
  examples: [
    { input: "arr = [1, 5, 7, 1], k = 6", output: "2", explain: "Pairs are (1, 5) and (5, 1)." },
    { input: "arr = [1, 1, 1, 1], k = 2", output: "6", explain: "There are 6 possible pairs." }
  ],
  constraints: [
    "1 ≤ arr.length ≤ 10⁵",
    "-10⁹ ≤ val, k ≤ 10⁹"
  ],
  hint: [
    "Use a Hash Map to store the frequency of each number seen so far.",
    "For every element 'x', calculate the required complement: 'target = k - x'.",
    "Add the frequency of 'target' from the map to your total count.",
    "<br>Time: O(n) · Space: O(n)"
  ].join("<br>• "),
  starterCode: {
    cpp: "int getPairsCount(int arr[], int n, int k) {\n    // Your code here\n}",
    java: "int getPairsCount(int[] arr, int n, int k) {\n    // Your code here\n}",
    python: "def getPairsCount(self, arr, n, k):\n    # Your code here\n    pass",
    javascript: "function getPairsCount(arr, k) {\n    // Your code here\n}"
  },
  solution: {
    cpp: [
      "int getPairsCount(int arr[], int n, int k) {",
      "    unordered_map<int, int> m;",
      "    int count = 0;",
      "    for (int i = 0; i < n; i++) {",
      "        if (m.find(k - arr[i]) != m.end())",
      "            count += m[k - arr[i]];",
      "        m[arr[i]]++;",
      "    }",
      "    return count;",
      "}"
    ].join("\n"),
    python: [
      "def getPairsCount(self, arr, n, k):",
      "    m = {}",
      "    count = 0",
      "    for x in arr:",
      "        if (k - x) in m:",
      "            count += m[k - x]",
      "        m[x] = m.get(x, 0) + 1",
      "    return count"
    ].join("\n"),
    javascript: [
      "function getPairsCount(arr, k) {",
      "    const map = new Map();",
      "    let count = 0;",
      "    for (let x of arr) {",
      "        if (map.has(k - x)) count += map.get(k - x);",
      "        map.set(x, (map.get(x) || 0) + 1);",
      "    }",
      "    return count;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[1, 5, 7, 1], 6", expected: "2" },
    { input: "[1, 1, 1, 1], 2", expected: "6" }
  ],
  jsTestCall: `(function(arr, k){ return String(getPairsCount(arr, k)); })(__INPUT_1__, __INPUT_2__)`
},
{
  id: 7,
  title: "Largest Subarray with Sum 0",
  difficulty: "Medium",
  accuracy: "42.10%",
  submissions: "220K+",
  companies: ["Amazon", "Microsoft", "Oyo"],
  pattern: "Prefix Sum + Hashing",
  realWorld: [
    "Used in balance sheets and accounting to find the longest period where",
    "total net profit/loss was exactly zero, helping identify break-even cycles."
  ].join(" "),
  description: [
    "Given an array <strong>arr</strong>, find the length of the largest subarray",
    "with a sum equal to 0."
  ].join(" "),
  examples: [
    { input: "arr = [15, -2, 2, -8, 1, 7, 10, 23]", output: "5", explain: "The subarray is [-2, 2, -8, 1, 7]." }
  ],
  constraints: [
    "1 ≤ arr.length ≤ 10⁵",
    "-1000 ≤ val ≤ 1000"
  ],
  hint: [
    "Maintain a running 'Prefix Sum'.",
    "If the prefix sum is 0 at index 'i', the subarray from 0 to 'i' has sum 0.",
    "If the prefix sum repeats (seen before at index 'j'), the subarray from 'j+1' to 'i' has sum 0.",
    "<br>Time: O(n) · Space: O(n)"
  ].join("<br>• "),
  starterCode: {
    cpp: "int maxLen(vector<int>& A, int n) {\n    // Your code here\n}",
    java: "int maxLen(int arr[], int n) {\n    // Your code here\n}",
    python: "def maxLen(self, n, arr):\n    # Your code here\n    pass",
    javascript: "function maxLen(arr) {\n    // Your code here\n}"
  },
  solution: {
    cpp: [
      "int maxLen(vector<int>& A, int n) {",
      "    unordered_map<int, int> m;",
      "    int sum = 0, res = 0;",
      "    for (int i = 0; i < n; i++) {",
      "        sum += A[i];",
      "        if (sum == 0) res = i + 1;",
      "        else if (m.find(sum) != m.end()) res = max(res, i - m[sum]);",
      "        else m[sum] = i;",
      "    }",
      "    return res;",
      "}"
    ].join("\n"),
    python: [
      "def maxLen(self, n, arr):",
      "    m = {}",
      "    curr_sum, max_l = 0, 0",
      "    for i in range(n):",
      "        curr_sum += arr[i]",
      "        if curr_sum == 0: max_l = i + 1",
      "        elif curr_sum in m: max_l = max(max_l, i - m[curr_sum])",
      "        else: m[curr_sum] = i",
      "    return max_l"
    ].join("\n"),
    javascript: [
      "function maxLen(arr) {",
      "    const map = new Map();",
      "    let sum = 0, maxL = 0;",
      "    for (let i = 0; i < arr.length; i++) {",
      "        sum += arr[i];",
      "        if (sum === 0) maxL = i + 1;",
      "        else if (map.has(sum)) maxL = Math.max(maxL, i - map.get(sum));",
      "        else map.set(sum, i);",
      "    }",
      "    return maxL;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[15, -2, 2, -8, 1, 7, 10, 23]", expected: "5" },
    { input: "[1, 2, 3]", expected: "0" }
  ],
  jsTestCall: `(function(arr){ return String(maxLen(arr)); })(__INPUT__)`
},
{
  id: 8,
  title: "Top K Numbers in a Stream",
  difficulty: "Hard",
  accuracy: "45.20%",
  submissions: "120K+",
  companies: ["Amazon", "Microsoft", "Accolite"],
  pattern: "Frequency Map + Sorting/Heap",
  realWorld: [
    "Used in real-time leaderboards for gaming apps and trending hashtags on social media",
    "to identify the most active items as data flows into the system."
  ].join(" "),
  description: [
    "Given a stream of numbers, for each element that enters the stream,",
    "find the <strong>top K</strong> most frequent numbers seen so far.",
    "If two numbers have the same frequency, the smaller number should be prioritized."
  ].join(" "),
  examples: [
    { 
      input: "arr = [5, 2, 1, 3, 2], k = 4", 
      output: "[5] [2, 5] [1, 2, 5] [1, 2, 3, 5] [2, 1, 3, 5]", 
      explain: "At each step, we update frequencies and return the top K elements." 
    }
  ],
  constraints: [
    "1 ≤ N ≤ 10⁴",
    "1 ≤ K ≤ 100"
  ],
  hint: [
    "Use a Hash Map to keep track of the frequency of each number.",
    "Use a list/vector to maintain the top K elements.",
    "After every insertion, update the frequency and re-sort the top K list based on frequency (desc) and value (asc).",
    "<br>Time: O(N * K) · Space: O(N)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    vector<vector<int>> getTopK(int arr[], int n, int k) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public void topK(int[] arr, int n, int k) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "def topK(arr, n, k):",
      "    # Your code here",
      "    pass"
    ].join("\n"),
    javascript: [
      "function topK(arr, k) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "vector<vector<int>> getTopK(int arr[], int n, int k) {",
      "    vector<vector<int>> res;",
      "    vector<int> top(k + 1, 0);",
      "    unordered_map<int, int> freq;",
      "    for (int i = 0; i < n; i++) {",
      "        freq[arr[i]]++;",
      "        top[k] = arr[i];",
      "        auto it = find(top.begin(), top.begin() + k, arr[i]);",
      "        for (int j = distance(top.begin(), it) - 1; j >= 0; j--) {",
      "            if (freq[top[j]] < freq[top[j + 1]]) swap(top[j], top[j + 1]);",
      "            else if (freq[top[j]] == freq[top[j+1]] && top[j] > top[j+1]) swap(top[j], top[j+1]);",
      "            else break;",
      "        }",
      "        vector<int> cur;",
      "        for(int m=0; m<k && top[m]!=0; m++) cur.push_back(top[m]);",
      "        res.push_back(cur);",
      "    }",
      "    return res;",
      "}"
    ].join("\n"),
    javascript: [
      "function topK(arr, k) {",
      "    let freq = new Map();",
      "    let top = [];",
      "    return arr.map(x => {",
      "        freq.set(x, (freq.get(x) || 0) + 1);",
      "        if (!top.includes(x)) top.push(x);",
      "        top.sort((a, b) => freq.get(b) - freq.get(a) || a - b);",
      "        return top.slice(0, k);",
      "    });",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[5, 2, 1], 2", expected: "[[5], [2, 5], [1, 2]]" }
  ],
  jsTestCall: `(function(arr, k){ return JSON.stringify(topK(arr, k)); })(__INPUT_1__, __INPUT_2__)`
},
{
  id: 9,
  title: "String Transformation Possible",
  difficulty: "Medium",
  accuracy: "56.10%",
  submissions: "100K+",
  companies: ["Snapdeal", "FactSet"],
  pattern: "Anagram Hashing",
  realWorld: [
    "Used in genomic editing to determine if one DNA sequence can be converted",
    "to another given a set of allowed mutation operations."
  ].join(" "),
  description: [
    "Given two strings <strong>A</strong> and <strong>B</strong>, find the minimum number of",
    "operations required to transform A into B. The only allowed operation is to",
    "pick a character in A and move it to the front."
  ].join(" "),
  examples: [
    { input: "A = 'ABD', B = 'BAD'", output: "1", explain: "Pick 'B' and move it to the front." },
    { input: "A = 'EACBD', B = 'EABCD'", output: "3" }
  ],
  constraints: ["1 ≤ A.length, B.length ≤ 10⁵"],
  hint: [
    "First, check if transformation is even possible using a Hash Map for character frequency.",
    "If frequencies don't match, return -1 (they are not anagrams).",
    "If they match, start comparing from the end of both strings.",
    "If characters match, move both pointers. If not, only move the pointer for string A and increment result.",
    "<br>Time: O(N) · Space: O(1) (assuming 256 ASCII)"
  ].join("<br>• "),
  starterCode: {
    cpp: "int transform(string A, string B) {\n    // Your code here\n}",
    java: "public int transform(String A, String B) {\n    // Your code here\n}",
    python: "def transform(A, B):\n    # Your code here\n    pass",
    javascript: "function transform(A, B) {\n    // Your code here\n}"
  },
  solution: {
    cpp: [
      "int transform(string A, string B) {",
      "    if (A.length() != B.length()) return -1;",
      "    unordered_map<char, int> m;",
      "    for(char c : A) m[c]++;",
      "    for(char c : B) m[c]--;",
      "    for(auto x : m) if(x.second != 0) return -1;",
      "    int res = 0, i = A.length()-1, j = B.length()-1;",
      "    while (i >= 0) {",
      "        if (A[i] == B[j]) j--;",
      "        else res++;",
      "        i--;",
      "    }",
      "    return res;",
      "}"
    ].join("\n"),
    javascript: [
      "function transform(A, B) {",
      "    if (A.length !== B.length) return -1;",
      "    let count = {};",
      "    for(let c of A) count[c] = (count[c] || 0) + 1;",
      "    for(let c of B) count[c] = (count[c] || 0) - 1;",
      "    if (Object.values(count).some(v => v !== 0)) return -1;",
      "    let res = 0, i = A.length - 1, j = B.length - 1;",
      "    while (i >= 0) {",
      "        if (A[i] === B[j]) j--;",
      "        else res++;",
      "        i--;",
      "    }",
      "    return res;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "'ABC', 'CBA'", expected: "2" },
    { input: "'GEEKS', 'SGEEK'", expected: "1" }
  ],
  jsTestCall: `(function(a, b){ return String(transform(a, b)); })(__INPUT_1__, __INPUT_2__)`
},
{
  id: 10,
  title: "Longest Substring with K Unique Characters",
  difficulty: "Medium",
  accuracy: "35.45%",
  submissions: "180K+",
  companies: ["Amazon", "Google", "Facebook"],
  pattern: "Sliding Window + Hashing",
  realWorld: [
    "Used in server logs to find the longest time interval containing exactly K",
    "distinct user actions for session analysis."
  ].join(" "),
  description: [
    "Given a string <strong>s</strong> and an integer <strong>k</strong>, return the length of the",
    "longest substring that contains exactly <strong>k</strong> distinct characters.",
    "If no such substring exists, return -1."
  ].join(" "),
  examples: [
    { input: "s = 'aabacbebebe', k = 3", output: "7", explain: "'cbebebe' is the longest substring." }
  ],
  constraints: ["1 ≤ s.length ≤ 10⁵", "1 ≤ k ≤ 26"],
  hint: [
    "Use the Sliding Window technique with a Hash Map to track character frequencies.",
    "Expand the 'right' boundary until you have more than K unique characters.",
    "When unique characters > K, shrink the 'left' boundary until unique count is K again.",
    "Keep track of the maximum window size where unique count is exactly K.",
    "<br>Time: O(N) · Space: O(K)"
  ].join("<br>• "),
  starterCode: {
    cpp: "int longestKSubstr(string s, int k) {\n    // Your code here\n}",
    java: "public int longestKSubstr(String s, int k) {\n    // Your code here\n}",
    python: "def longestKSubstr(s, k):\n    # Your code here\n    pass",
    javascript: "function longestKSubstr(s, k) {\n    // Your code here\n}"
  },
  solution: {
    python: [
      "def longestKSubstr(s, k):",
      "    n = len(s)",
      "    freq = {}",
      "    left = 0",
      "    max_len = -1",
      "    for right in range(n):",
      "        freq[s[right]] = freq.get(s[right], 0) + 1",
      "        while len(freq) > k:",
      "            freq[s[left]] -= 1",
      "            if freq[s[left]] == 0: del freq[s[left]]",
      "            left += 1",
      "        if len(freq) == k:",
      "            max_len = max(max_len, right - left + 1)",
      "    return max_len"
    ].join("\n"),
    javascript: [
      "function longestKSubstr(s, k) {",
      "    let freq = new Map(), left = 0, maxLen = -1;",
      "    for (let right = 0; right < s.length; right++) {",
      "        freq.set(s[right], (freq.get(s[right]) || 0) + 1);",
      "        while (freq.size > k) {",
      "            freq.set(s[left], freq.get(s[left]) - 1);",
      "            if (freq.get(s[left]) === 0) freq.delete(s[left]);",
      "            left++;",
      "        }",
      "        if (freq.size === k) maxLen = Math.max(maxLen, right - left + 1);",
      "    }",
      "    return maxLen;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "'aabacbebebe', 3", expected: "7" },
    { input: "'aaaa', 2", expected: "-1" }
  ],
  jsTestCall: `(function(s, k){ return String(longestKSubstr(s, k)); })(__INPUT_1__, __INPUT_2__)`
}
];