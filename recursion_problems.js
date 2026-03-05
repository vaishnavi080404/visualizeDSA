const TOPIC_CONFIG = {
  name: "Recursion",
  level: "Level 1 of 3 · Fundamentals",
  backLink: "recursion_L1.html",
  backLabel: "Recursion"
};


const PROBLEMS = [
  {
    id: 1,
    title: "Print 1 to n without using loops",
    difficulty: "Easy",
    accuracy: "78.2%",
    submissions: "150K+",
    companies: ["Amazon", "TCS", "Infosys"],
    pattern: "Head Recursion",
    realWorld: "Used in recursive directory traversals and building tree structures where you process the root after its children.",
    description: `Given a number <strong>n</strong>, print numbers from 1 to n without using any loops. Each number should be followed by a space.`,
    examples: [
      { input: 'n = 5', output: '1 2 3 4 5', explain: 'The recursive function reaches the base case at n=0 and prints while returning.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `Use recursion. The function should call itself with <code>n-1</code> before printing the current value of <code>n</code>.`,
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void printNos(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    Solution().printNos(n);\n    cout << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static void printNos(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        printNos(n);\n    }\n}`,
      python: `class Solution:\n    def printNos(self, n: int):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    Solution().printNos(n)`,
      javascript: `function printNos(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `void printNos(int n) {\n    if (n <= 0) return;\n    printNos(n - 1);\n    cout << n << " ";\n}`,
      java: `public static void printNos(int n) {\n    if (n <= 0) return;\n    printNos(n - 1);\n    System.out.print(n + " ");\n}`,
      python: `def printNos(self, n: int):\n    if n <= 0: return\n    self.printNos(n - 1)\n    print(n, end=" ")`,
      javascript: `function printNos(n) {\n    if (n <= 0) return "";\n    return printNos(n - 1) + n + " ";\n}`
    },
    testCases: [
      { input: "5", expected: "1 2 3 4 5" },
      { input: "1", expected: "1" },
      { input: "10", expected: "1 2 3 4 5 6 7 8 9 10" },
      { input: "3", expected: "1 2 3" }
    ],
    jsTestCall: `printNos(Number(__INPUT__))`
  },

  

  {
    id: 2,
    title: "Print n to 1 without loop",
    difficulty: "Easy",
    accuracy: "82.1%",
    submissions: "135K+",
    companies: ["Samsung", "Adobe"],
    pattern: "Tail Recursion",
    realWorld: "Used in countdown timers and stack-unwinding processes where the most recent task is handled first.",
    description: `Given a number <strong>n</strong>, print numbers from n to 1 without using any loops.`,
    examples: [
      { input: 'n = 5', output: '5 4 3 2 1', explain: 'The function prints the current number first and then calls itself with n-1.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `Print the current number <code>n</code> first, then make a recursive call with <code>n-1</code>.`,
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void printNos(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    Solution().printNos(n);\n    cout << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static void printNos(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        printNos(n);\n    }\n}`,
      python: `class Solution:\n    def printNos(self, n: int):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    Solution().printNos(n)`,
      javascript: `function printNos(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `void printNos(int n) {\n    if (n <= 0) return;\n    cout << n << " ";\n    printNos(n - 1);\n}`,
      java: `public static void printNos(int n) {\n    if (n <= 0) return;\n    System.out.print(n + " ");\n    printNos(n - 1);\n}`,
      python: `def printNos(self, n: int):\n    if n <= 0: return\n    print(n, end=" ")\n    self.printNos(n - 1)`,
      javascript: `function printNos(n) {\n    if (n <= 0) return "";\n    return n + " " + printNos(n - 1);\n}`
    },
    testCases: [
      { input: "5", expected: "5 4 3 2 1" },
      { input: "1", expected: "1" },
      { input: "8", expected: "8 7 6 5 4 3 2 1" },
      { input: "4", expected: "4 3 2 1" }
    ],
    jsTestCall: `printNos(Number(__INPUT__))`
  },

  {
    id: 3,
    title: "Mean of Array",
    difficulty: "Easy",
    accuracy: "75.5%",
    submissions: "90K+",
    companies: ["Zoho", "Cognizant"],
    pattern: "Recursive Summation",
    realWorld: "Used in calculating moving averages in financial data or computing the center of gravity in physics simulations.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, calculate the mean (average) of the elements.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5], n = 5', output: '3', explain: '(1+2+3+4+5)/5 = 15/5 = 3.' }
    ],
    constraints: ['1 ≤ n ≤ 100', '1 ≤ arr[i] ≤ 1000'],
    hint: `To find the mean, find the sum of all elements recursively and divide it by <code>n</code>.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMean(vector<int>& arr, int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    vector<int> arr(n); for(int i=0; i<n; i++) cin >> arr[i];\n    cout << Solution().findMean(arr, n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int findMean(int[] arr, int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0; i<n; i++) arr[i] = sc.nextInt();\n        System.out.println(findMean(arr, n));\n    }\n}`,
      python: `class Solution:\n    def findMean(self, arr, n):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    arr = list(map(int, input().split()))\n    print(Solution().findMean(arr, n))`,
      javascript: `function findMean(arr, n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int findSum(vector<int>& arr, int n) {\n    if (n <= 0) return 0;\n    return findSum(arr, n - 1) + arr[n - 1];\n}\nint findMean(vector<int>& arr, int n) {\n    return findSum(arr, n) / n;\n}`,
      java: `public static int findSum(int[] arr, int n) {\n    if (n <= 0) return 0;\n    return findSum(arr, n - 1) + arr[n - 1];\n}\npublic static int findMean(int[] arr, int n) {\n    return findSum(arr, n) / n;\n}`,
      python: `def findSum(self, arr, n):\n    if n <= 0: return 0\n    return self.findSum(arr, n - 1) + arr[n - 1]\ndef findMean(self, arr, n):\n    return self.findSum(arr, n) // n`,
      javascript: `function findSum(arr, n) {\n    if (n <= 0) return 0;\n    return findSum(arr, n - 1) + arr[n - 1];\n}\nfunction findMean(arr, n) {\n    return Math.floor(findSum(arr, n) / n);\n}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "3" },
      { input: "4\n10 20 30 40", expected: "25" },
      { input: "3\n5 5 5", expected: "5" },
      { input: "1\n100", expected: "100" }
    ],
    jsTestCall: `(function(inp){ const lines = inp.split('\\n'); const arr = lines[1].split(' ').map(Number); return findMean(arr, arr.length); })(__INPUT__)`
  },

  {
    id: 4,
    title: "Sum of natural numbers",
    difficulty: "Easy",
    accuracy: "85.4%",
    submissions: "200K+",
    companies: ["Microsoft", "Oracle"],
    pattern: "Functional Recursion",
    realWorld: "Used in algorithmic analysis for computing time complexity of nested loops (O(n²)) and in arithmetic series calculations.",
    description: `Given a number <strong>n</strong>, find the sum of first <strong>n</strong> natural numbers.`,
    examples: [
      { input: 'n = 3', output: '6', explain: '1 + 2 + 3 = 6.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `The sum of n numbers is <code>n + sum(n-1)</code>. Base case is when n=1.`,
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    long long findSum(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    cout << Solution().findSum(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static long findSum(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(findSum(sc.nextInt()));\n    }\n}`,
      python: `class Solution:\n    def findSum(self, n: int) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().findSum(int(input())))`,
      javascript: `function findSum(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `long long findSum(int n) {\n    return (long long)n * (n + 1) / 2;\n}`,
      java: `public static long findSum(int n) {\n    return (long)n * (n + 1) / 2;\n}`,
      python: `def findSum(self, n: int) -> int:\n    return n * (n + 1) // 2`,
      javascript: `function findSum(n) {\n    return (n * (n + 1)) / 2;\n}`
    },
    testCases: [
      { input: "3", expected: "6" },
      { input: "5", expected: "15" },
      { input: "10", expected: "55" },
      { input: "100", expected: "5050" }
    ],
    jsTestCall: `findSum(Number(__INPUT__))`
  },

  {
    id: 5,
    title: "Decimal to binary number",
    difficulty: "Easy",
    accuracy: "68.9%",
    submissions: "110K+",
    companies: ["Amazon", "Wipro", "HCL"],
    pattern: "Recursion (Base Conversion)",
    realWorld: "The fundamental conversion used by computer hardware to process high-level decimal data as low-level voltage states (bits).",
    description: `Given a decimal number <strong>n</strong>, convert it into its binary representation string.`,
    examples: [
      { input: 'n = 10', output: '"1010"', explain: '10 in binary is 1010.' }
    ],
    constraints: ['0 ≤ n ≤ 10⁹'],
    hint: `Continuously divide the number by 2 and collect the remainders in reverse order.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string toBinary(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    cout << Solution().toBinary(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String toBinary(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(toBinary(sc.nextInt()));\n    }\n}`,
      python: `class Solution:\n    def toBinary(self, n: int) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().toBinary(int(input())))`,
      javascript: `function toBinary(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string toBinary(int n) {\n    if (n == 0) return "0";\n    string res = "";\n    while (n > 0) {\n        res += to_string(n % 2);\n        n /= 2;\n    }\n    reverse(res.begin(), res.end());\n    return res;\n}`,
      java: `public static String toBinary(int n) {\n    return Integer.toBinaryString(n);\n}`,
      python: `def toBinary(self, n: int) -> str:\n    return bin(n).replace("0b", "")`,
      javascript: `function toBinary(n) {\n    return n.toString(2);\n}`
    },
    testCases: [
      { input: "10", expected: "1010" },
      { input: "7", expected: "111" },
      { input: "1", expected: "1" },
      { input: "0", expected: "0" }
    ],
    jsTestCall: `toBinary(Number(__INPUT__))`
  },

  {
    id: 6,
    title: "Sum of Array",
    difficulty: "Easy",
    accuracy: "88.2%",
    submissions: "180K+",
    companies: ["Amazon", "TCS", "Adobe"],
    pattern: "Linear Recursion",
    realWorld: "Commonly used in financial software to aggregate transactions or in sensor data processing to calculate total magnitudes.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, find the sum of all elements using recursion.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4], n = 4', output: '10', explain: '1 + 2 + 3 + 4 = 10.' }
    ],
    constraints: ['1 ≤ n ≤ 1000', '1 ≤ arr[i] ≤ 1000'],
    hint: `Sum is <code>arr[n-1] + sum(arr, n-1)</code>. Base case is n=0 returning 0.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findSum(vector<int>& arr, int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    vector<int> arr(n); for(int i=0; i<n; i++) cin >> arr[i];\n    cout << Solution().findSum(arr, n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int findSum(int[] arr, int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0; i<n; i++) arr[i] = sc.nextInt();\n        System.out.println(findSum(arr, n));\n    }\n}`,
      python: `class Solution:\n    def findSum(self, arr, n):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    arr = list(map(int, input().split()))\n    print(Solution().findSum(arr, n))`,
      javascript: `function findSum(arr, n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int findSum(vector<int>& arr, int n) {\n    if (n <= 0) return 0;\n    return arr[n-1] + findSum(arr, n-1);\n}`,
      java: `public static int findSum(int[] arr, int n) {\n    if (n <= 0) return 0;\n    return arr[n-1] + findSum(arr, n-1);\n}`,
      python: `def findSum(self, arr, n):\n    if n <= 0: return 0\n    return arr[n-1] + self.findSum(arr, n-1)`,
      javascript: `function findSum(arr, n) {\n    if (n <= 0) return 0;\n    return arr[n-1] + findSum(arr, n-1);\n}`
    },
    testCases: [
      { input: "4\n1 2 3 4", expected: "10" },
      { input: "3\n5 10 15", expected: "30" },
      { input: "1\n100", expected: "100" },
      { input: "5\n0 0 0 0 1", expected: "1" }
    ],
    jsTestCall: `(function(inp){ const lines = inp.split('\\n'); const arr = lines[1].split(' ').map(Number); return findSum(arr, arr.length); })(__INPUT__)`
  },

  {
    id: 7,
    title: "Reverse of a String",
    difficulty: "Easy",
    accuracy: "76.4%",
    submissions: "140K+",
    companies: ["Microsoft", "Oracle"],
    pattern: "Recursive String Manipulation",
    realWorld: "Used in data encryption algorithms and string-matching logic where checking for palindromes is required.",
    description: `Given a string <strong>s</strong>, return its reverse using recursion.`,
    examples: [
      { input: 's = "hello"', output: '"olleh"', explain: 'Characters are swapped or appended in reverse order.' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000'],
    hint: `Return <code>reverse(s.substring(1)) + s[0]</code>. Base case is empty string.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string reverseString(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().reverseString(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String reverseString(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(reverseString(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def reverseString(self, s: str) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().reverseString(input()))`,
      javascript: `function reverseString(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string reverseString(string s) {\n    if (s.length() == 0) return "";\n    return reverseString(s.substr(1)) + s[0];\n}`,
      java: `public static String reverseString(String s) {\n    if (s.isEmpty()) return s;\n    return reverseString(s.substring(1)) + s.charAt(0);\n}`,
      python: `def reverseString(self, s: str) -> str:\n    if len(s) == 0: return ""\n    return self.reverseString(s[1:]) + s[0]`,
      javascript: `function reverseString(s) {\n    if (s === "") return "";\n    return reverseString(s.substring(1)) + s.charAt(0);\n}`
    },
    testCases: [
      { input: "geeks", expected: "skeeg" },
      { input: "apple", expected: "elppa" },
      { input: "a", expected: "a" },
      { input: "12345", expected: "54321" }
    ],
    jsTestCall: `reverseString(__INPUT__)`
  },

  {
    id: 8,
    title: "Length of a String",
    difficulty: "School",
    accuracy: "92.1%",
    submissions: "50K+",
    companies: ["TCS", "Cognizant"],
    pattern: "Recursive Counting",
    realWorld: "Basic utility function found in low-level programming where built-in length properties aren't available (like C-style strings).",
    description: `Given a string <strong>s</strong>, calculate its length recursively without using built-in length functions if possible.`,
    examples: [
      { input: 's = "abc"', output: '3', explain: 'The function counts characters until the end of the string.' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000'],
    hint: `If the string is empty, return 0. Otherwise return <code>1 + length(remaining_string)</code>.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int stringLength(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().stringLength(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int stringLength(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(stringLength(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def stringLength(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().stringLength(input()))`,
      javascript: `function stringLength(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int stringLength(string s) {\n    if (s == "") return 0;\n    return 1 + stringLength(s.substr(1));\n}`,
      java: `public static int stringLength(String s) {\n    if (s.equals("")) return 0;\n    return 1 + stringLength(s.substring(1));\n}`,
      python: `def stringLength(self, s: str) -> int:\n    if s == "": return 0\n    return 1 + self.stringLength(s[1:])`,
      javascript: `function stringLength(s) {\n    if (s === "") return 0;\n    return 1 + stringLength(s.substring(1));\n}`
    },
    testCases: [
      { input: "hello", expected: "5" },
      { input: "geeksforgeeks", expected: "13" },
      { input: "a", expected: "1" },
      { input: "recursion", expected: "9" }
    ],
    jsTestCall: `stringLength(__INPUT__)`
  },

  {
    id: 9,
    title: "Sum of Digits",
    difficulty: "Easy",
    accuracy: "84.5%",
    submissions: "125K+",
    companies: ["HCL", "Samsung"],
    pattern: "Digit Extraction Recursion",
    realWorld: "Used in checksum algorithms (like the Luhn algorithm for credit cards) and numerology calculations.",
    description: `Given a number <strong>n</strong>, find the sum of its digits using recursion.`,
    examples: [
      { input: 'n = 123', output: '6', explain: '1 + 2 + 3 = 6.' }
    ],
    constraints: ['0 ≤ n ≤ 10⁹'],
    hint: `Sum is <code>(n % 10) + sum(n / 10)</code>.`,
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumDigits(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    cout << Solution().sumDigits(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int sumDigits(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(sumDigits(sc.nextInt()));\n    }\n}`,
      python: `class Solution:\n    def sumDigits(self, n: int) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().sumDigits(int(input())))`,
      javascript: `function sumDigits(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int sumDigits(int n) {\n    if (n == 0) return 0;\n    return (n % 10) + sumDigits(n / 10);\n}`,
      java: `public static int sumDigits(int n) {\n    if (n == 0) return 0;\n    return (n % 10) + sumDigits(n / 10);\n}`,
      python: `def sumDigits(self, n: int) -> int:\n    if n == 0: return 0\n    return (n % 10) + self.sumDigits(n // 10)`,
      javascript: `function sumDigits(n) {\n    if (n === 0) return 0;\n    return (n % 10) + sumDigits(Math.floor(n / 10));\n}`
    },
    testCases: [
      { input: "123", expected: "6" },
      { input: "45", expected: "9" },
      { input: "1001", expected: "2" },
      { input: "0", expected: "0" }
    ],
    jsTestCall: `sumDigits(Number(__INPUT__))`
  },

  {
    id: 10,
    title: "Sum of Array using Tail Recursion",
    difficulty: "Easy",
    accuracy: "72.1%",
    submissions: "40K+",
    companies: ["Amazon"],
    pattern: "Tail Recursion",
    realWorld: "Tail recursion is optimized by compilers to prevent stack overflow, crucial for processing massive datasets in functional languages.",
    description: `Given an array <strong>arr</strong>, find the sum of all elements using <strong>tail recursion</strong>. A tail-recursive function is one where the recursive call is the last action.`,
    examples: [
      { input: 'arr = [1, 2, 3], n = 3', output: '6', explain: 'An accumulator variable stores the intermediate sum.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `Pass an additional <code>accumulator</code> parameter initialized to 0 to store the sum.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int tailSum(vector<int>& arr, int n, int acc = 0) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    vector<int> arr(n); for(int i=0; i<n; i++) cin >> arr[i];\n    cout << Solution().tailSum(arr, n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int tailSum(int[] arr, int n, int acc) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0; i<n; i++) arr[i] = sc.nextInt();\n        System.out.println(tailSum(arr, n, 0));\n    }\n}`,
      python: `class Solution:\n    def tailSum(self, arr, n, acc=0):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    arr = list(map(int, input().split()))\n    print(Solution().tailSum(arr, n))`,
      javascript: `function tailSum(arr, n, acc = 0) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int tailSum(vector<int>& arr, int n, int acc) {\n    if (n <= 0) return acc;\n    return tailSum(arr, n - 1, acc + arr[n - 1]);\n}`,
      java: `public static int tailSum(int[] arr, int n, int acc) {\n    if (n <= 0) return acc;\n    return tailSum(arr, n - 1, acc + arr[n - 1]);\n}`,
      python: `def tailSum(self, arr, n, acc=0):\n    if n <= 0: return acc\n    return self.tailSum(arr, n - 1, acc + arr[n - 1])`,
      javascript: `function tailSum(arr, n, acc = 0) {\n    if (n <= 0) return acc;\n    return tailSum(arr, n - 1, acc + arr[n - 1]);\n}`
    },
    testCases: [
      { input: "3\n1 2 3", expected: "6" },
      { input: "5\n10 10 10 10 10", expected: "50" },
      { input: "2\n100 200", expected: "300" },
      { input: "1\n5", expected: "5" }
    ],
    jsTestCall: `(function(inp){ const lines = inp.split('\\n'); const arr = lines[1].split(' ').map(Number); return tailSum(arr, arr.length); })(__INPUT__)`
  },

  

  {
    id: 11,
    title: "First n Fibonacci Numbers",
    difficulty: "Easy",
    accuracy: "55.4%",
    submissions: "250K+",
    companies: ["Goldman Sachs", "Amazon", "Microsoft"],
    pattern: "Dynamic Programming / Recursion",
    realWorld: "The Fibonacci sequence appears in biological patterns, like the arrangement of leaves on a stem and the fruit sprouts of a pineapple.",
    description: `Given a number <strong>n</strong>, find the first <strong>n</strong> Fibonacci numbers. The first two numbers are 1 and 1.`,
    examples: [
      { input: 'n = 5', output: '1 1 2 3 5', explain: 'Next number is the sum of previous two.' }
    ],
    constraints: ['1 ≤ n ≤ 50'],
    hint: `Use an iterative approach or recursion with memoization to avoid exponential time complexity.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<long long> fib(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    vector<long long> res = Solution().fib(n);\n    for(auto x : res) cout << x << " ";\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static long[] fib(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long[] res = fib(n);\n        for(long x : res) System.out.print(x + " ");\n    }\n}`,
      python: `class Solution:\n    def fib(self, n: int):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    print(*(Solution().fib(n)))`,
      javascript: `function fib(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `vector<long long> fib(int n) {\n    vector<long long> res(n);\n    if (n >= 1) res[0] = 1;\n    if (n >= 2) res[1] = 1;\n    for (int i = 2; i < n; i++) res[i] = res[i-1] + res[i-2];\n    return res;\n}`,
      java: `public static long[] fib(int n) {\n    long[] res = new long[n];\n    if (n >= 1) res[0] = 1;\n    if (n >= 2) res[1] = 1;\n    for (int i = 2; i < n; i++) res[i] = res[i-1] + res[i-2];\n    return res;\n}`,
      python: `def fib(self, n: int):\n    if n == 1: return [1]\n    res = [1, 1]\n    for i in range(2, n): res.append(res[-1] + res[-2])\n    return res`,
      javascript: `function fib(n) {\n    if (n === 1) return [1];\n    let res = [1, 1];\n    for (let i = 2; i < n; i++) res.push(res[i-1] + res[i-2]);\n    return res;\n}`
    },
    testCases: [
      { input: "5", expected: "1 1 2 3 5" },
      { input: "2", expected: "1 1" },
      { input: "8", expected: "1 1 2 3 5 8 13 21" },
      { input: "1", expected: "1" }
    ],
    jsTestCall: `fib(Number(__INPUT__)).join(' ')`
  },

  {
    id: 12,
    title: "Factorial of a number",
    difficulty: "Easy",
    accuracy: "82.5%",
    submissions: "300K+",
    companies: ["Microsoft", "Morgan Stanley", "Samsung"],
    pattern: "Functional Recursion",
    realWorld: "Used in permutations and combinations calculations for probability, statistics, and game theory.",
    description: `Given a number <strong>n</strong>, find the factorial of n. Factorial of n is <code>n * (n-1) * ... * 1</code>.`,
    examples: [
      { input: 'n = 5', output: '120', explain: '5 * 4 * 3 * 2 * 1 = 120.' }
    ],
    constraints: ['0 ≤ n ≤ 20'],
    hint: `Base case: if n is 0 or 1, return 1. Otherwise, return <code>n * factorial(n-1)</code>.`,
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    long long factorial(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    cout << Solution().factorial(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static long factorial(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(factorial(sc.nextInt()));\n    }\n}`,
      python: `class Solution:\n    def factorial(self, n: int) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().factorial(int(input())))`,
      javascript: `function factorial(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `long long factorial(int n) {\n    if (n <= 1) return 1;\n    return (long long)n * factorial(n - 1);\n}`,
      java: `public static long factorial(int n) {\n    if (n <= 1) return 1;\n    return (long)n * factorial(n - 1);\n}`,
      python: `def factorial(self, n: int) -> int:\n    if n <= 1: return 1\n    return n * self.factorial(n - 1)`,
      javascript: `function factorial(n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}`
    },
    testCases: [
      { input: "5", expected: "120" },
      { input: "0", expected: "1" },
      { input: "10", expected: "3628800" },
      { input: "1", expected: "1" }
    ],
    jsTestCall: `factorial(Number(__INPUT__))`
  },

  

  {
    id: 13,
    title: "Minimum and Maximum in array",
    difficulty: "Easy",
    accuracy: "75.8%",
    submissions: "180K+",
    companies: ["Amazon", "Snapdeal"],
    pattern: "Divide and Conquer / Recursion",
    realWorld: "Used in finding the bounds of a dataset for data normalization or setting scales in chart visualizations.",
    description: `Given an array <strong>arr</strong>, find the minimum and maximum elements using a recursive approach.`,
    examples: [
      { input: 'arr = [1, 4, 2, -1, 5]', output: 'Min: -1, Max: 5', explain: 'The function compares elements to find the extreme values.' }
    ],
    constraints: ['1 ≤ n ≤ 1000', '-10⁶ ≤ arr[i] ≤ 10⁶'],
    hint: `Split the array into two halves, find min/max of both, and return the absolute min/max.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Pair { int min; int max; };\n\nclass Solution {\npublic:\n    Pair getMinMax(vector<int>& arr, int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    vector<int> arr(n); for(int i=0; i<n; i++) cin >> arr[i];\n    Pair res = Solution().getMinMax(arr, n);\n    cout << res.min << " " << res.max << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\nclass Pair { int min, max; }\n\npublic class Main {\n    public static Pair getMinMax(int[] arr, int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0; i<n; i++) arr[i] = sc.nextInt();\n        Pair p = getMinMax(arr, n);\n        System.out.println(p.min + " " + p.max);\n    }\n}`,
      python: `class Solution:\n    def getMinMax(self, arr):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    arr = list(map(int, input().split()))\n    res = Solution().getMinMax(arr)\n    print(res[0], res[1])`,
      javascript: `function getMinMax(arr) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `Pair getMinMax(vector<int>& arr, int n) {\n    int mn = arr[0], mx = arr[0];\n    for(int i=1; i<n; i++) {\n        if(arr[i] < mn) mn = arr[i];\n        if(arr[i] > mx) mx = arr[i];\n    }\n    return {mn, mx};\n}`,
      java: `public static Pair getMinMax(int[] arr, int n) {\n    Pair p = new Pair();\n    p.min = arr[0]; p.max = arr[0];\n    for(int i=1; i<n; i++) {\n        if(arr[i] < p.min) p.min = arr[i];\n        if(arr[i] > p.max) p.max = arr[i];\n    }\n    return p;\n}`,
      python: `def getMinMax(self, arr):\n    return [min(arr), max(arr)]`,
      javascript: `function getMinMax(arr) {\n    return { min: Math.min(...arr), max: Math.max(...arr) };\n}`
    },
    testCases: [
      { input: "5\n1 4 2 -1 5", expected: "-1 5" },
      { input: "3\n10 10 10", expected: "10 10" },
      { input: "2\n100 200", expected: "100 200" },
      { input: "4\n-5 -2 -10 -1", expected: "-10 -1" }
    ],
    jsTestCall: `(function(inp){ const lines = inp.split('\\n'); const arr = lines[1].split(' ').map(Number); let r = getMinMax(arr); return r.min + " " + r.max; })(__INPUT__)`
  },

  {
    id: 14,
    title: "Palindrome Check",
    difficulty: "Easy",
    accuracy: "70.2%",
    submissions: "220K+",
    companies: ["Cisco", "Paytm"],
    pattern: "Recursive String Comparison",
    realWorld: "Used in structural bioinformatics to find palindromic sequences in DNA that act as binding sites for proteins.",
    description: `Given a string <strong>s</strong>, check if it is a palindrome using recursion. A palindrome reads the same forwards and backwards.`,
    examples: [
      { input: 's = "racecar"', output: 'true', explain: '"racecar" is equal to its reverse.' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000'],
    hint: `Compare the first and last characters. If they match, recurse for the substring without those two characters.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s, int l, int r) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << (Solution().isPalindrome(s, 0, s.length()-1) ? "true" : "false") << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean isPalindrome(String s, int l, int r) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(isPalindrome(s, 0, s.length()-1));\n    }\n}`,
      python: `class Solution:\n    def isPalindrome(self, s, l, r):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = input()\n    print(Solution().isPalindrome(s, 0, len(s)-1))`,
      javascript: `function isPalindrome(s, l, r) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `bool isPalindrome(string s, int l, int r) {\n    if (l >= r) return true;\n    if (s[l] != s[r]) return false;\n    return isPalindrome(s, l + 1, r - 1);\n}`,
      java: `public static boolean isPalindrome(String s, int l, int r) {\n    if (l >= r) return true;\n    if (s.charAt(l) != s.charAt(r)) return false;\n    return isPalindrome(s, l + 1, r - 1);\n}`,
      python: `def isPalindrome(self, s, l, r):\n    if l >= r: return True\n    if s[l] != s[r]: return False\n    return self.isPalindrome(s, l + 1, r - 1)`,
      javascript: `function isPalindrome(s, l, r) {\n    if (l >= r) return true;\n    if (s[l] !== s[r]) return false;\n    return isPalindrome(s, l + 1, r - 1);\n}`
    },
    testCases: [
      { input: "racecar", expected: "true" },
      { input: "hello", expected: "false" },
      { input: "aba", expected: "true" },
      { input: "ab", expected: "false" }
    ],
    jsTestCall: `isPalindrome(__INPUT__, 0, __INPUT__.length - 1)`
  },

  {
    id: 15,
    title: "Count Set-bits",
    difficulty: "Easy",
    accuracy: "65.5%",
    submissions: "150K+",
    companies: ["Amazon", "Google"],
    pattern: "Recursive Bitwise",
    realWorld: "Used in Hamming weight calculations for error correction in data transmission and population counting in bitsets.",
    description: `Given a positive integer <strong>n</strong>, count the number of 1s in its binary representation.`,
    examples: [
      { input: 'n = 6', output: '2', explain: 'Binary of 6 is 110. Total 1s = 2.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁹'],
    hint: `<code>n & 1</code> gives the last bit. Sum it with recursive call <code>countSetBits(n >> 1)</code>.`,
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSetBits(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    cout << Solution().countSetBits(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int countSetBits(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(countSetBits(sc.nextInt()));\n    }\n}`,
      python: `class Solution:\n    def countSetBits(self, n: int) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().countSetBits(int(input())))`,
      javascript: `function countSetBits(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int countSetBits(int n) {\n    if (n == 0) return 0;\n    return (n & 1) + countSetBits(n >> 1);\n}`,
      java: `public static int countSetBits(int n) {\n    if (n == 0) return 0;\n    return (n & 1) + countSetBits(n >> 1);\n}`,
      python: `def countSetBits(self, n: int) -> int:\n    if n == 0: return 0\n    return (n & 1) + self.countSetBits(n >> 1)`,
      javascript: `function countSetBits(n) {\n    if (n === 0) return 0;\n    return (n & 1) + countSetBits(n >> 1);\n}`
    },
    testCases: [
      { input: "6", expected: "2" },
      { input: "7", expected: "3" },
      { input: "1", expected: "1" },
      { input: "1024", expected: "1" }
    ],
    jsTestCall: `countSetBits(Number(__INPUT__))`
  },

  

  {
    id: 16,
    title: "Fibonacci Series in Reverse",
    difficulty: "Medium",
    accuracy: "48.2%",
    submissions: "45K+",
    companies: ["TCS", "Infosys"],
    pattern: "Recursive Generation",
    realWorld: "Used in reverse-sequence planning and specific algorithmic backtracking scenarios.",
    description: `Given <strong>n</strong>, generate the Fibonacci series up to n elements and print them in reverse order.`,
    examples: [
      { input: 'n = 5', output: '3 2 1 1 0', explain: 'Fibonacci series is 0, 1, 1, 2, 3. Reversed: 3 2 1 1 0.' }
    ],
    constraints: ['1 ≤ n ≤ 50'],
    hint: `First generate the series in an array/list, then print from <code>n-1</code> down to 0.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseFib(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    Solution().reverseFib(n);\n    cout << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static void reverseFib(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        reverseFib(sc.nextInt());\n    }\n}`,
      python: `class Solution:\n    def reverseFib(self, n: int):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    Solution().reverseFib(int(input()))`,
      javascript: `function reverseFib(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `void reverseFib(int n) {\n    vector<long long> f(n);\n    if(n>=1) f[0] = 0; if(n>=2) f[1] = 1;\n    for(int i=2; i<n; i++) f[i] = f[i-1] + f[i-2];\n    for(int i=n-1; i>=0; i--) cout << f[i] << " ";\n}`,
      java: `public static void reverseFib(int n) {\n    long[] f = new long[n];\n    if(n>=1) f[0] = 0; if(n>=2) f[1] = 1;\n    for(int i=2; i<n; i++) f[i] = f[i-1] + f[i-2];\n    for(int i=n-1; i>=0; i--) System.out.print(f[i] + " ");\n}`,
      python: `def reverseFib(self, n: int):\n    f = [0] * n\n    if n >= 1: f[0] = 0\n    if n >= 2: f[1] = 1\n    for i in range(2, n): f[i] = f[i-1] + f[i-2]\n    print(*(f[::-1]))`,
      javascript: `function reverseFib(n) {\n    let f = [0, 1];\n    for(let i=2; i<n; i++) f[i] = f[i-1] + f[i-2];\n    return f.slice(0, n).reverse().join(' ');\n}`
    },
    testCases: [
      { input: "5", expected: "3 2 1 1 0" },
      { input: "2", expected: "1 0" },
      { input: "1", expected: "0" },
      { input: "8", expected: "13 8 5 3 2 1 1 0" }
    ],
    jsTestCall: `reverseFib(Number(__INPUT__))`
  },

  {
    id: 17,
    title: "Remove all adjacent duplicates",
    difficulty: "Easy",
    accuracy: "62.5%",
    submissions: "110K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Stack / Recursion",
    realWorld: "Used in data compression and text editors to automatically fix double-typing errors or simplify repetitive signals.",
    description: `Given a string <strong>s</strong>, recursively remove all adjacent duplicate characters until no more can be removed.`,
    examples: [
      { input: 's = "geeksforgeek"', output: '"gksforgk"', explain: 'ee in geeks and ee in geek are removed.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵'],
    hint: `Use a stack or recursion to keep track of characters. If the current character is the same as the top of the stack, pop it.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string removeDuplicates(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().removeDuplicates(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String removeDuplicates(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(removeDuplicates(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def removeDuplicates(self, s: str) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().removeDuplicates(input()))`,
      javascript: `function removeDuplicates(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string removeDuplicates(string s) {\n    string res = "";\n    for(char c : s) {\n        if(!res.empty() && res.back() == c) res.pop_back();\n        else res.push_back(c);\n    }\n    return res;\n}`,
      java: `public static String removeDuplicates(String s) {\n    StringBuilder sb = new StringBuilder();\n    for(char c : s.toCharArray()) {\n        if(sb.length() > 0 && sb.charAt(sb.length()-1) == c) sb.deleteCharAt(sb.length()-1);\n        else sb.append(c);\n    }\n    return sb.toString();\n}`,
      python: `def removeDuplicates(self, s: str) -> str:\n    stack = []\n    for char in s:\n        if stack and stack[-1] == char: stack.pop()\n        else: stack.append(char)\n    return "".join(stack)`,
      javascript: `function removeDuplicates(s) {\n    let stack = [];\n    for(let char of s) {\n        if(stack.length > 0 && stack[stack.length-1] === char) stack.pop();\n        else stack.push(char);\n    }\n    return stack.join("");\n}`
    },
    testCases: [
      { input: "geeksforgeek", expected: "gksforgk" },
      { input: "abbaca", expected: "ca" },
      { input: "azxxzy", expected: "ay" },
      { input: "aaa", expected: "a" }
    ],
    jsTestCall: `removeDuplicates(__INPUT__)`
  },

  

  {
    id: 18,
    title: "Reversing a Queue",
    difficulty: "Easy",
    accuracy: "78.2%",
    submissions: "95K+",
    companies: ["Amazon", "Samsung"],
    pattern: "Recursion (Stack Unwinding)",
    realWorld: "Used in task scheduling systems where the priority of tasks needs to be inverted temporarily.",
    description: `Given a queue, reverse its elements using recursion or an auxiliary stack.`,
    examples: [
      { input: 'Q = [4, 3, 1, 10, 2]', output: '[2, 10, 1, 3, 4]', explain: 'Order is fully inverted.' }
    ],
    constraints: ['1 ≤ size ≤ 10⁵'],
    hint: `Dequeue an element, recursively call reverse for the rest, and then enqueue the element back.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <queue>\n#include <stack>\nusing namespace std;\n\nvoid reverseQueue(queue<int>& q) {\n    // Your code here\n}\n\nint main() {\n    int n, x; cin >> n;\n    queue<int> q; while(n--) { cin >> x; q.push(x); }\n    reverseQueue(q);\n    while(!q.empty()) { cout << q.front() << " "; q.pop(); }\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static void reverseQueue(Queue<Integer> q) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Queue<Integer> q = new LinkedList<>();\n        for(int i=0; i<n; i++) q.add(sc.nextInt());\n        reverseQueue(q);\n        while(!q.isEmpty()) System.out.print(q.poll() + " ");\n    }\n}`,
      python: `from collections import deque\ndef reverseQueue(q):\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    q = deque(map(int, input().split()))\n    reverseQueue(q)\n    print(*q)`,
      javascript: `function reverseQueue(q) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `void reverseQueue(queue<int>& q) {\n    if(q.empty()) return;\n    int x = q.front(); q.pop();\n    reverseQueue(q);\n    q.push(x);\n}`,
      java: `public static void reverseQueue(Queue<Integer> q) {\n    if(q.isEmpty()) return;\n    int x = q.poll();\n    reverseQueue(q);\n    q.add(x);\n}`,
      python: `def reverseQueue(q):\n    if not q: return\n    x = q.popleft()\n    reverseQueue(q)\n    q.append(x)`,
      javascript: `function reverseQueue(q) {\n    if(q.length === 0) return;\n    let x = q.shift();\n    reverseQueue(q);\n    q.push(x);\n}`
    },
    testCases: [
      { input: "5\n4 3 1 10 2", expected: "2 10 1 3 4" },
      { input: "3\n1 2 3", expected: "3 2 1" },
      { input: "1\n10", expected: "10" },
      { input: "4\n10 20 30 40", expected: "40 30 20 10" }
    ],
    jsTestCall: `(function(inp){ let q = inp.split('\\n')[1].split(' ').map(Number); reverseQueue(q); return q.join(' '); })(__INPUT__)`
  },

  {
    id: 19,
    title: "Binary to Gray Code",
    difficulty: "Easy",
    accuracy: "85.1%",
    submissions: "40K+",
    companies: ["Qualcomm", "Intel"],
    pattern: "Bit Manipulation",
    realWorld: "Gray code is used in digital rotary encoders to prevent errors during state transitions where multiple bits change at once.",
    description: `Given a binary number (as an integer), convert it into its equivalent Gray code. Gray code is a binary numeral system where two successive values differ in only one bit.`,
    examples: [
      { input: 'n = 3 (binary 11)', output: '2 (binary 10)', explain: 'Gray code for binary n is (n XOR (n >> 1)).' }
    ],
    constraints: ['0 ≤ n ≤ 10⁹'],
    hint: `The formula to convert binary <code>B</code> to Gray code <code>G</code> is: <code>G = B ^ (B >> 1)</code>.`,
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint binaryToGray(int n) {\n    // Your code here\n}\n\nint main() {\n    int n; cin >> n;\n    cout << binaryToGray(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int binaryToGray(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(binaryToGray(sc.nextInt()));\n    }\n}`,
      python: `def binaryToGray(n):\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    print(binaryToGray(int(input())))`,
      javascript: `function binaryToGray(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int binaryToGray(int n) { return n ^ (n >> 1); }`,
      java: `public static int binaryToGray(int n) { return n ^ (n >> 1); }`,
      python: `def binaryToGray(n): return n ^ (n >> 1)`,
      javascript: `function binaryToGray(n) { return n ^ (n >> 1); }`
    },
    testCases: [
      { input: "3", expected: "2" },
      { input: "10", expected: "15" },
      { input: "1", expected: "1" },
      { input: "0", expected: "0" }
    ],
    jsTestCall: `binaryToGray(Number(__INPUT__))`
  },

  

  {
    id: 20,
    title: "Product of 2 Numbers",
    difficulty: "Easy",
    accuracy: "91.2%",
    submissions: "60K+",
    companies: ["TCS", "Infosys"],
    pattern: "Recursive Addition",
    realWorld: "Fundamental logic in ALU design where multiplication is performed using hardware circuits that execute repeated additions.",
    description: `Given two integers <strong>x</strong> and <strong>y</strong>, calculate their product <code>x * y</code> without using the <code>*</code> operator, using recursion.`,
    examples: [
      { input: 'x = 5, y = 2', output: '10', explain: '5 added to itself 2 times.' }
    ],
    constraints: ['1 ≤ x, y ≤ 1000'],
    hint: `Product is <code>x + product(x, y - 1)</code>. Base case is <code>y = 0</code> returning 0.`,
    starterCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint product(int x, int y) {\n    // Your code here\n}\n\nint main() {\n    int x, y; cin >> x >> y;\n    cout << product(x, y) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int product(int x, int y) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(product(sc.nextInt(), sc.nextInt()));\n    }\n}`,
      python: `def product(x, y):\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    x, y = map(int, input().split())\n    print(product(x, y))`,
      javascript: `function product(x, y) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int product(int x, int y) {\n    if(y == 0) return 0;\n    if(y < 0) return -product(x, -y);\n    return x + product(x, y - 1);\n}`,
      java: `public static int product(int x, int y) {\n    if(y == 0) return 0;\n    return x + product(x, y - 1);\n}`,
      python: `def product(x, y):\n    if y == 0: return 0\n    return x + product(x, y - 1)`,
      javascript: `function product(x, y) {\n    if (y === 0) return 0;\n    return x + product(x, y - 1);\n}`
    },
    testCases: [
      { input: "5 2", expected: "10" },
      { input: "10 5", expected: "50" },
      { input: "1 100", expected: "100" },
      { input: "0 5", expected: "0" }
    ],
    jsTestCall: `(function(inp){ let [x, y] = inp.split(' ').map(Number); return product(x, y); })(__INPUT__)`
  },

  



];