const TOPIC_CONFIG = {
  name: "Strings",
  level: "Level 1 of 3 · Fundamentals",
  backLink: "string_L1.html",
  backLabel: "Strings"
};


 
  const PROBLEMS = [
  {
    id: 1,
    title: "Palindrome Check",
    difficulty: "Easy",
    accuracy: "72.45%",
    submissions: "450K+",
    companies: ["Amazon", "Cisco", "Facebook"],
    pattern: "Two Pointers",
    realWorld: "Used in DNA sequence analysis to find palindromic repeats which are critical for enzyme binding sites.",
    description: `Given a string <strong>s</strong>, determine if it is a <strong>palindrome</strong>. A string is a palindrome if it reads the same backward as forward after removing non-alphanumeric characters and ignoring case.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explain: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explain: '"raceacar" is not a palindrome.' }
    ],
    constraints: ['1 ≤ s.length ≤ 2 * 10⁵', 's consists only of printable ASCII characters.'],
    hint: `Use two pointers starting at the <strong>beginning</strong> and <strong>end</strong> of the string.<br><br>• Move pointers inward while skipping non-alphanumeric characters.<br>• Compare characters at each step (case-insensitive).<br><br>Time: O(n) · Space: O(1)`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    Solution sol;\n    string s;\n    getline(cin, s);\n    cout << (sol.isPalindrome(s) ? "true" : "false") << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean isPalindrome(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNextLine()) {\n            String s = sc.nextLine();\n            System.out.println(isPalindrome(s));\n        }\n    }\n}`,
      python: `import re\n\nclass Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    print(str(Solution().isPalindrome(s)).lower())`,
      javascript: `function isPalindrome(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `bool isPalindrome(string s) {\n    int l = 0, r = s.length() - 1;\n    while (l < r) {\n        if (!isalnum(s[l])) l++;\n        else if (!isalnum(s[r])) r--;\n        else if (tolower(s[l++]) != tolower(s[r--])) return false;\n    }\n    return true;\n}`,
      java: `public static boolean isPalindrome(String s) {\n    int l = 0, r = s.length() - 1;\n    while (l < r) {\n        char left = s.charAt(l), right = s.charAt(r);\n        if (!Character.isLetterOrDigit(left)) l++;\n        else if (!Character.isLetterOrDigit(right)) r--;\n        else {\n            if (Character.toLowerCase(left) != Character.toLowerCase(right)) return false;\n            l++; r--;\n        }\n    }\n    return true;\n}`,
      python: `def isPalindrome(self, s: str) -> bool:\n    s = "".join(filter(str.isalnum, s)).lower()\n    return s == s[::-1]`,
      javascript: `function isPalindrome(s) {\n    const str = s.replace(/[^a-z0-9]/gi, "").toLowerCase();\n    let left = 0, right = str.length - 1;\n    while (left < right) {\n        if (str[left] !== str[right]) return false;\n        left++; right--;\n    }\n    return true;\n}`
    },
    testCases: [
      { input: "A man, a plan, a canal: Panama", expected: "true" },
      { input: "race a car", expected: "false" },
      { input: " ", expected: "true" },
      { input: "No 'x' in Nixon", expected: "true" }
    ],
    jsTestCall: `(function(s){ return String(isPalindrome(s)); })(__INPUT__)`
  },
  {
    id: 2,
    title: "Reverse a String",
    difficulty: "Easy",
    accuracy: "85.12%",
    submissions: "900K+",
    companies: ["Google", "Adobe", "Apple"],
    pattern: "In-place / Two Pointers",
    realWorld: "Used in data encryption and simple obfuscation techniques where bit-level or character-level reversal is needed.",
    description: `Write a function that reverses a string. The input string is given as an array of characters <code>s</code>. You must do this by modifying the input array <strong>in-place</strong> with O(1) extra memory.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explain: 'The array is reversed in-place.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's[i] is a printable ASCII character.'],
    hint: `Maintain two pointers: one at index 0 and one at index n-1.<br><br>• Swap the characters at these pointers.<br>• Move pointers toward each other until they meet.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    vector<char> s(n); \n    for(int i=0; i<n; i++) cin >> s[i];\n    Solution().reverseString(s);\n    for(char c : s) cout << c;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static void reverseString(char[] s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.next();\n        char[] s = input.toCharArray();\n        reverseString(s);\n        System.out.println(String.valueOf(s));\n    }\n}`,
      python: `from typing import List\n\nclass Solution:\n    def reverseString(self, s: List[str]) -> None:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = list(input())\n    Solution().reverseString(s)\n    print("".join(s))`,
      javascript: `function reverseString(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `void reverseString(vector<char>& s) {\n    int l = 0, r = s.size() - 1;\n    while(l < r) swap(s[l++], s[r--]);\n}`,
      java: `public static void reverseString(char[] s) {\n    int l = 0, r = s.length - 1;\n    while(l < r) {\n        char temp = s[l];\n        s[l] = s[r];\n        s[r] = temp;\n        l++; r--;\n    }\n}`,
      python: `def reverseString(self, s: List[str]) -> None:\n    s.reverse()`,
      javascript: `function reverseString(s) {\n    let left = 0, right = s.length - 1;\n    while (left < right) {\n        [s[left], s[right]] = [s[right], s[left]];\n        left++; right--;\n    }\n    return s;\n}`
    },
    testCases: [
      { input: 'hello', expected: 'olleh' },
      { input: 'Hannah', expected: 'hannaH' },
      { input: 'a', expected: 'a' },
      { input: '1234', expected: '4321' }
    ],
    jsTestCall: `(function(s){ let arr = s.split(""); reverseString(arr); return arr.join(""); })(__INPUT__)`
  },
  {
    id: 3,
    title: "Reverse Words",
    difficulty: "Medium",
    accuracy: "42.3%",
    submissions: "320K+",
    companies: ["Amazon", "Microsoft", "Paytm"],
    pattern: "String Processing",
    realWorld: "Used in search engines to process queries where word order might be reversed (e.g., 'Doe John' to 'John Doe').",
    description: `Given an input string <strong>s</strong>, reverse the order of the <strong>words</strong>. A word is defined as a sequence of non-space characters. The words in <strong>s</strong> will be separated by at least one space.`,
    examples: [
      { input: 's = "the sky is blue"', output: '"blue is sky the"', explain: 'Words are reversed, but characters within words remain same.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁴', 's contains English letters, digits, and spaces.'],
    hint: `1. Trim leading/trailing spaces.<br>2. Split the string by one or more spaces.<br>3. Reverse the resulting array of words.<br>4. Join them back with a single space.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string reverseWords(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << Solution().reverseWords(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String reverseWords(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNextLine()) {\n            String s = sc.nextLine();\n            System.out.println(reverseWords(s));\n        }\n    }\n}`,
      python: `class Solution:\n    def reverseWords(self, s: str) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    print(Solution().reverseWords(s))`,
      javascript: `function reverseWords(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string reverseWords(string s) {\n    stringstream ss(s);\n    string word, res = "";\n    while (ss >> word) res = word + " " + res;\n    if (!res.empty()) res.pop_back();\n    return res;\n}`,
      java: `public static String reverseWords(String s) {\n    String[] words = s.trim().split("\\\\s+");\n    Collections.reverse(Arrays.asList(words));\n    return String.join(" ", words);\n}`,
      python: `def reverseWords(self, s: str) -> str:\n    return " ".join(s.split()[::-1])`,
      javascript: `function reverseWords(s) {\n    return s.trim().split(/\\s+/).reverse().join(" ");\n}`
    },
    testCases: [
      { input: "the sky is blue", expected: "blue is sky the" },
      { input: "  hello world  ", expected: "world hello" },
      { input: "a good   example", expected: "example good a" },
      { input: "single", expected: "single" }
    ],
    jsTestCall: `(function(s){ return reverseWords(s); })(__INPUT__)`
  },
{
    id: 4,
    title: "Check for Rotation",
    difficulty: "Easy",
    accuracy: "55.8%",
    submissions: "180K+",
    companies: ["Oracle", "TCS", "Morgan Stanley"],
    pattern: "String Concatenation",
    realWorld: "Used in cyclic redundancy checks and identifying cyclic shifts in circular buffers.",
    description: `Given two strings <strong>s</strong> and <strong>goal</strong>, return <code>true</code> if and only if <strong>s</strong> can become <strong>goal</strong> after some number of <strong>shifts</strong> on <strong>s</strong>.`,
    examples: [
      { input: 's = "abcde", goal = "cdeab"', output: 'true', explain: 'Shifting "abcde" twice results in "cdeab".' }
    ],
    constraints: ['1 ≤ s.length, goal.length ≤ 100'],
    hint: `If you concatenate <code>s</code> with itself (<code>s + s</code>), it contains all possible rotations of <code>s</code> as substrings.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool rotateString(string s, string goal) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s, g;\n    cin >> s >> g;\n    cout << (Solution().rotateString(s, g) ? "true" : "false") << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean rotateString(String s, String goal) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String g = sc.next();\n        System.out.println(rotateString(s, g));\n    }\n}`,
      python: `class Solution:\n    def rotateString(self, s: str, goal: str) -> bool:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = input()\n    g = input()\n    print(str(Solution().rotateString(s, g)).lower())`,
      javascript: `function rotateString(s, goal) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `bool rotateString(string s, string goal) {\n    return s.length() == goal.length() && (s + s).find(goal) != string::npos;\n}`,
      java: `public static boolean rotateString(String s, String goal) {\n    return s.length() == goal.length() && (s + s).contains(goal);\n}`,
      python: `def rotateString(self, s: str, goal: str) -> bool:\n    return len(s) == len(goal) and goal in (s + s)`,
      javascript: `function rotateString(s, goal) {\n    return s.length === goal.length && (s + s).includes(goal);\n}`
    },
    testCases: [
      { input: "abcde|cdeab", expected: "true" },
      { input: "abcde|abced", expected: "false" },
      { input: "a|a", expected: "true" },
      { input: "aa|ab", expected: "false" }
    ],
    jsTestCall: `(function(inp){ const [s, g] = inp.split('|'); return String(rotateString(s, g)); })(__INPUT__)`
  },
  
  {
    id: 5,
    title: "First Non Repeating",
    difficulty: "Easy",
    accuracy: "48.9%",
    submissions: "550K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Frequency Hash Map",
    realWorld: "Used in data streaming to find the first unique signal or user ID in a log of events.",
    description: `Given a string <strong>s</strong>, find the first non-repeating character in it and return its <strong>index</strong>. If it does not exist, return <code>-1</code>.`,
    examples: [
      { input: 's = "leetcode"', output: '0', explain: '"l" is the first character that does not repeat.' },
      { input: 's = "loveleetcode"', output: '2', explain: '"v" is the first non-repeating character.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of lowercase English letters.'],
    hint: `1. Use a hash map or an array of size 26 to store frequencies.<br>2. Iterate through the string a second time to find the first character with a frequency of 1.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstUniqChar(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().firstUniqChar(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int firstUniqChar(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(firstUniqChar(sc.next()));\n    }\n}`,
      python: `import collections\n\nclass Solution:\n    def firstUniqChar(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = input()\n    print(Solution().firstUniqChar(s))`,
      javascript: `function firstUniqChar(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int firstUniqChar(string s) {\n    int count[26] = {0};\n    for (char c : s) count[c - 'a']++;\n    for (int i = 0; i < s.length(); i++) {\n        if (count[s[i] - 'a'] == 1) return i;\n    }\n    return -1;\n}`,
      java: `public static int firstUniqChar(String s) {\n    int[] freq = new int[26];\n    for(char c : s.toCharArray()) freq[c - 'a']++;\n    for(int i = 0; i < s.length(); i++) {\n        if(freq[s.charAt(i) - 'a'] == 1) return i;\n    }\n    return -1;\n}`,
      python: `def firstUniqChar(self, s: str) -> int:\n    count = collections.Counter(s)\n    for i, ch in enumerate(s):\n        if count[ch] == 1: return i\n    return -1`,
      javascript: `function firstUniqChar(s) {\n    const count = {};\n    for (let char of s) count[char] = (count[char] || 0) + 1;\n    for (let i = 0; i < s.length; i++) {\n        if (count[s[i]] === 1) return i;\n    }\n    return -1;\n}`
    },
    testCases: [
      { input: "leetcode", expected: "0" },
      { input: "loveleetcode", expected: "2" },
      { input: "aabb", expected: "-1" },
      { input: "z", expected: "0" }
    ],
    jsTestCall: `(function(s){ return String(firstUniqChar(s)); })(__INPUT__)`
  },
  
  {
    id: 7,
    title: "Validate IP Address",
    difficulty: "Medium",
    accuracy: "35.1%",
    submissions: "98K+",
    companies: ["Cisco", "Amazon", "Google"],
    pattern: "String Splitting / Validation",
    realWorld: "Core logic for networking protocols, firewall rules, and web server request filtering.",
    description: `Given a string <strong>queryIP</strong>, return <code>"IPv4"</code> if IP is a valid IPv4 address, <code>"IPv6"</code> if IP is a valid IPv6 address or <code>"Neither"</code> if it is not valid.`,
    examples: [
      { input: 'queryIP = "172.16.254.1"', output: '"IPv4"', explain: 'Four decimal parts (0-255) separated by dots.' }
    ],
    constraints: ['queryIP consists of English letters, digits and ".", ":"'],
    hint: `For IPv4: 4 parts, 0-255, no leading zeros. For IPv6: 8 parts, 1-4 hex digits each.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nstring validIPAddress(string queryIP) {\n    // Your code here\n}\n\nint main() {\n    string ip;\n    cin >> ip;\n    cout << validIPAddress(ip) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String validIPAddress(String queryIP) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(validIPAddress(sc.next()));\n    }\n}`,
      python: `import re\ndef validIPAddress(queryIP: str) -> str:\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    print(validIPAddress(input()))`,
      javascript: `function validIPAddress(queryIP) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string validIPAddress(string queryIP) {\n    if (queryIP.find('.') != string::npos) {\n        stringstream ss(queryIP);\n        string block;\n        int count = 0;\n        while (getline(ss, block, '.')) {\n            count++;\n            if (count > 4 || block.empty() || block.size() > 3 || (block.size() > 1 && block[0] == '0')) return "Neither";\n            for (char c : block) if (!isdigit(c)) return "Neither";\n            if (stoi(block) > 255) return "Neither";\n        }\n        return (count == 4 && queryIP.back() != '.') ? "IPv4" : "Neither";\n    } else {\n        stringstream ss(queryIP);\n        string block;\n        int count = 0;\n        while (getline(ss, block, ':')) {\n            count++;\n            if (count > 8 || block.empty() || block.size() > 4) return "Neither";\n            for (char c : block) if (!isxdigit(c)) return "Neither";\n        }\n        return (count == 8 && queryIP.back() != ':') ? "IPv6" : "Neither";\n    }\n}`,
      java: `public static String validIPAddress(String queryIP) {\n    if (queryIP.chars().filter(ch -> ch == '.').count() == 3) {\n        String[] parts = queryIP.split("\\\\.", -1);\n        if (parts.length != 4) return "Neither";\n        for (String p : parts) {\n            if (p.isEmpty() || p.length() > 3 || (p.length() > 1 && p.startsWith("0"))) return "Neither";\n            try { int val = Integer.parseInt(p); if (val < 0 || val > 255) return "Neither"; } \n            catch (NumberFormatException e) { return "Neither"; }\n        }\n        return "IPv4";\n    } else if (queryIP.chars().filter(ch -> ch == ':').count() == 7) {\n        String[] parts = queryIP.split(":", -1);\n        if (parts.length != 8) return "Neither";\n        for (String p : parts) {\n            if (p.isEmpty() || p.length() > 4) return "Neither";\n            for (char c : p.toCharArray()) if (Character.digit(c, 16) == -1) return "Neither";\n        }\n        return "IPv6";\n    }\n    return "Neither";\n}`,
      python: `def validIPAddress(queryIP: str) -> str:\n    def isIPv4(s):\n        parts = s.split('.')\n        if len(parts) != 4: return False\n        for p in parts:\n            if not p.isdigit() or not 0 <= int(p) <= 255 or (p[0] == '0' and len(p) > 1): return False\n        return True\n    def isIPv6(s):\n        parts = s.split(':')\n        if len(parts) != 8: return False\n        for p in parts:\n            if not 1 <= len(p) <= 4 or not all(c in '0123456789abcdefABCDEF' for c in p): return False\n        return True\n    if isIPv4(queryIP): return "IPv4"\n    if isIPv6(queryIP): return "IPv6"\n    return "Neither"`,
      javascript: `function validIPAddress(queryIP) {\n    const isIPv4 = (ip) => {\n        const parts = ip.split('.');\n        if (parts.length !== 4) return false;\n        for (let p of parts) {\n            if (!p || (p.length > 1 && p[0] === '0') || !/^\\d+$/.test(p) || +p > 255) return false;\n        }\n        return true;\n    };\n    const isIPv6 = (ip) => {\n        const parts = ip.split(':');\n        if (parts.length !== 8) return false;\n        for (let p of parts) {\n            if (!p || p.length > 4 || !/^[0-9a-fA-F]+$/.test(p)) return false;\n        }\n        return true;\n    };\n    if (queryIP.includes('.') && isIPv4(queryIP)) return "IPv4";\n    if (queryIP.includes(':') && isIPv6(queryIP)) return "IPv6";\n    return "Neither";\n}`
    },
    testCases: [
      { input: "172.16.254.1", expected: "IPv4" },
      { input: "2001:0db8:85a3:0:0:8A2E:0370:7334", expected: "IPv6" },
      { input: "256.256.256.256", expected: "Neither" },
      { input: "192.168.01.1", expected: "Neither" }
    ],
    jsTestCall: `(function(s){ return validIPAddress(s); })(__INPUT__)`
  },
  
  {
    id: 8,
    title: "Add Binary Strings",
    difficulty: "Medium",
    accuracy: "45.2%",
    submissions: "215K+",
    companies: ["Facebook", "Amazon", "Apple"],
    pattern: "Two Pointers / Carry Logic",
    realWorld: "Used in ALU simulations where binary numbers of arbitrary length need to be summed.",
    description: `Given two binary strings <strong>a</strong> and <strong>b</strong>, return their sum as a binary string.`,
    examples: [
      { input: 'a = "11", b = "1"', output: '"100"', explain: 'Binary: 3 + 1 = 4 (100 in binary).' }
    ],
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nstring addBinary(string a, string b) {\n    // Your code here\n}\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    cout << addBinary(a, b) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String addBinary(String a, String b) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(addBinary(sc.next(), sc.next()));\n    }\n}`,
      python: `def addBinary(a: str, b: str) -> str:\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    print(addBinary(data[0], data[1]))`,
      javascript: `function addBinary(a, b) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string addBinary(string a, string b) {\n    string res = "";\n    int i = a.size()-1, j = b.size()-1, carry = 0;\n    while(i >= 0 || j >= 0 || carry) {\n        int sum = carry + (i >= 0 ? a[i--]-'0' : 0) + (j >= 0 ? b[j--]-'0' : 0);\n        res += to_string(sum % 2);\n        carry = sum / 2;\n    }\n    reverse(res.begin(), res.end());\n    return res;\n}`,
      java: `public static String addBinary(String a, String b) {\n    StringBuilder sb = new StringBuilder();\n    int i = a.length()-1, j = b.length()-1, carry = 0;\n    while(i >= 0 || j >= 0 || carry == 1) {\n        int sum = carry + (i >= 0 ? a.charAt(i--)-'0' : 0) + (j >= 0 ? b.charAt(j--)-'0' : 0);\n        sb.append(sum % 2);\n        carry = sum / 2;\n    }\n    return sb.reverse().toString();\n}`,
      python: `def addBinary(self, a: str, b: str) -> str:\n    res = []\n    i, j, carry = len(a)-1, len(b)-1, 0\n    while i >= 0 or j >= 0 or carry:\n        n1 = int(a[i]) if i >= 0 else 0\n        n2 = int(b[j]) if j >= 0 else 0\n        total = n1 + n2 + carry\n        res.append(str(total % 2))\n        carry = total // 2\n        i, j = i-1, j-1\n    return "".join(res[::-1])`,
      javascript: `function addBinary(a, b) {\n    let result = "";\n    let i = a.length - 1, j = b.length - 1, carry = 0;\n    while (i >= 0 || j >= 0 || carry) {\n        let sum = carry;\n        if (i >= 0) sum += parseInt(a[i--]);\n        if (j >= 0) sum += parseInt(b[j--]);\n        result = (sum % 2) + result;\n        carry = Math.floor(sum / 2);\n    }\n    return result;\n}`
    },
    testCases: [
      { input: "11|1", expected: "100" },
      { input: "1010|1011", expected: "10101" },
      { input: "0|0", expected: "0" },
      { input: "111|111", expected: "1110" }
    ],
    jsTestCall: `(function(inp){ const [a, b] = inp.split('|'); return addBinary(a, b); })(__INPUT__)`
  },


  {
    id: 9,
    title: "Integer to Words",
    difficulty: "Medium",
    accuracy: "31.2%",
    submissions: "180K+",
    companies: ["Amazon", "Microsoft", "Facebook", "Google"],
    pattern: "Recursive String Construction",
    realWorld: "Used in banking systems to automatically print the 'Amount in Words' on checks and financial statements to prevent tampering.",
    description: `Convert a non-negative integer <strong>num</strong> to its English words representation.`,
    examples: [
      { input: 'num = 123', output: '"One Hundred Twenty Three"', explain: 'Standard English conversion.' },
      { input: 'num = 12345', output: '"Twelve Thousand Three Hundred Forty Five"', explain: 'Grouped by thousands.' }
    ],
    constraints: ['0 ≤ num ≤ 2³¹ - 1'],
    hint: `Divide the number into chunks of three digits (thousands, millions, billions). Create a helper function to convert numbers less than 1000 to words.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    string numberToWords(int num) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    Solution sol;\n    cout << sol.numberToWords(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String numberToWords(int num) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(numberToWords(n));\n    }\n}`,
      python: `class Solution:\n    def numberToWords(self, num: int) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    print(Solution().numberToWords(n))`,
      javascript: `function numberToWords(num) {\n    // Your code here\n}`
    },
    solution: {
        cpp: `string numberToWords(int num) {\n    if (num == 0) return "Zero";\n    vector<string> belowTwenty = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};\n    vector<string> tens = {"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};\n    vector<string> thousands = {"", "Thousand", "Million", "Billion"};\n\n    function helper(int n) {\n        if (n == 0) return "";\n        else if (n < 20) return belowTwenty[n] + " ";\n        else if (n < 100) return tens[n / 10] + " " + helper(n % 10);\n        else return belowTwenty[n / 100] + " Hundred " + helper(n % 100);\n    }\n\n    string res = "";\n    for (int i = 0; i < thousands.size(); i++) {\n        if (num % 1000 != 0) res = helper(num % 1000) + thousands[i] + " " + res;\n        num /= 1000;\n    }\n    return res.substr(0, res.size() - 1); // Remove trailing space\n}`,
        java: `public static String numberToWords(int num) {\n    if (num == 0) return "Zero";\n    String[] belowTwenty = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};\n    String[] tens = {"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};\n    String[] thousands = {"", "Thousand", "Million", "Billion"};\n\n    String helper(int n) {\n        if (n == 0) return "";\n        else if (n < 20) return belowTwenty[n] + " ";\n        else if (n < 100) return tens[n / 10] + " " + helper(n % 10);\n        else return belowTwenty[n / 100] + " Hundred " + helper(n % 100);\n    }\n\n    String res = "";\n    for (int i = 0; i < thousands.length; i++) {\n        if (num % 1000 != 0) res = helper(num % 1000) + thousands[i] + " " + res;\n        num /= 1000;\n    }\n    return res.trim();\n}`,
        python: `class Solution:\n    def numberToWords(self, num: int) -> str:\n        if num == 0: return "Zero"\n        belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]\n        tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]\n        thousands = ["", "Thousand", "Million", "Billion"]\n\n        def helper(n):\n            if n == 0: return ""\n            elif n < 20: return belowTwenty[n] + " "\n            elif n < 100: return tens[n // 10] + " " + helper(n % 10)\n            else: return belowTwenty[n // 100] + " Hundred " + helper(n % 100)\n\n        res = ""\n        for i in range(len(thousands)):\n            if num % 1000 != 0: res = helper(num % 1000) + thousands[i] + " " + res\n            num //= 1000\n        return res.strip()`,
        javascript: `function numberToWords(num) {\n    if (num === 0) return "Zero";\n    const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];\n    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];\n    const thousands = ["", "Thousand", "Million", "Billion"];\n\n    function helper(n) {\n        if (n === 0) return "";\n        else if (n < 20) return belowTwenty[n] + " ";\n        else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);\n        else return belowTwenty[Math.floor(n / 100)] + " Hundred " + helper(n % 100);\n    }\n\n    let res = "";\n    for (let i = 0; i < thousands.length; i++) {\n        if (num % 1000 !== 0) res = helper(num % 1000) + thousands[i] + " " + res;\n        num = Math.floor(num / 1000);\n    }\n    return res.trim();\n}`
    },
    testCases: [
      { input: "123", expected: "One Hundred Twenty Three" },
      { input: "1234567", expected: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven" },
      { input: "1000", expected: "One Thousand" },
      { input: "0", expected: "Zero" }
    ],
    jsTestCall: `(function(n){ return numberToWords(Number(n)); })(__INPUT__)`
  },
  {
    id: 10,
    title: "Fizz Buzz",
    difficulty: "Medium",
    accuracy: "70.5%",
    submissions: "1M+",
    companies: ["Capital One", "JPMorgan", "Amazon"],
    pattern: "Conditional Logic",
    realWorld: "Often used as a basic screening tool in interviews to test a developer's ability to implement simple modular logic clearly.",
    description: `Given an integer <strong>n</strong>, return a string array <code>answer</code> where <code>answer[i] == "FizzBuzz"</code> if divisible by 3 and 5, <code>"Fizz"</code> if by 3, <code>"Buzz"</code> if by 5.`,
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁴'],
    hint: `Instead of checking 15, then 5, then 3, you can concatenate "Fizz" and "Buzz" to a string based on the conditions.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    Solution sol;\n    vector<string> res = sol.fizzBuzz(n);\n    for(auto s : res) cout << s << " ";\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static List<String> fizzBuzz(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(fizzBuzz(n));\n    }\n}`,
      python: `class Solution:\n    def fizzBuzz(self, n: int) -> list[str]:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    print(Solution().fizzBuzz(n))`,
      javascript: `function fizzBuzz(n) {\n    // Your code here\n}`
    },
    solution: {
        cpp: `vector<string> fizzBuzz(int n) {\n    vector<string> res;\n    for (int i = 1; i <= n; i++) {\n        string s = "";\n        if (i % 3 == 0) s += "Fizz";\n        if (i % 5 == 0) s += "Buzz";\n        res.push_back(s.empty() ? to_string(i) : s);\n    }\n    return res;\n}`,
        java: `public static List<String> fizzBuzz(int n) {\n    List<String> res = new ArrayList<>();\n    for (int i = 1; i <= n; i++) {\n        String s = "";\n        if (i % 3 == 0) s += "Fizz";\n        if (i % 5 == 0) s += "Buzz";\n        res.add(s.isEmpty() ? Integer.toString(i) : s);\n    }\n    return res;\n}`,
        python: `def fizzBuzz(self, n: int) -> list[str]:\n    res = []\n    for i in range(1, n + 1):\n        s = ""\n        if i % 3 == 0: s += "Fizz"\n        if i % 5 == 0: s += "Buzz"\n        res.append(s or str(i))\n    return res`,
      javascript: `function fizzBuzz(n) {\n    let res = [];\n    for (let i = 1; i <= n; i++) {\n        let s = "";\n        if (i % 3 === 0) s += "Fizz";\n        if (i % 5 === 0) s += "Buzz";\n        res.push(s || i.toString());\n    }\n    return res;\n}`
    },
    testCases: [
      { input: "3", expected: '["1","2","Fizz"]' },
      { input: "5", expected: '["1","2","Fizz","4","Buzz"]' },
      { input: "15", expected: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' },
      { input: "1", expected: '["1"]' }
    ],
    jsTestCall: `(function(n){ return JSON.stringify(fizzBuzz(Number(n))); })(__INPUT__)`
  },
  {
    id: 11,
    title: "Palindromic Sentence Check",
    difficulty: "Medium",
    accuracy: "45.8%",
    submissions: "60K+",
    companies: ["Oracle", "Goldman Sachs"],
    pattern: "Two Pointers",
    realWorld: "Used in natural language processing (NLP) to identify symmetrical patterns in sentences for stylistic or structural analysis.",
    description: `Given a sentence <strong>s</strong>, check if it forms a palindrome by considering only letters and numbers and ignoring the case.`,
    examples: [
      { input: 's = "Too hot to hoot."', output: 'true' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁶'],
    hint: `Similar to simple palindrome check, but you must strictly ignore spaces and punctuation during the pointer movement.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nbool sentencePalindrome(string s) {\n    // Your code here\n}\n\nint main() {\n    string s; getline(cin, s);\n    cout << (sentencePalindrome(s) ? "true" : "false") << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean sentencePalindrome(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(sentencePalindrome(sc.nextLine()));\n    }\n}`,
      python: `def sentencePalindrome(s: str) -> bool:\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    print(str(sentencePalindrome(input())).lower())`,
      javascript: `function sentencePalindrome(s) {\n    // Your code here\n}`
    },
    solution: {
        cpp: `bool sentencePalindrome(string s) {\n    int left = 0, right = s.size() - 1;\n    while (left < right) {\n        while (left < right && !isalnum(s[left])) left++;\n        while (left < right && !isalnum(s[right])) right--;\n        if (tolower(s[left]) != tolower(s[right])) return false;\n        left++; right--;\n    }\n    return true;\n}`,
        java: `public static boolean sentencePalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n        left++; right--;\n    }\n    return true;\n}`,
        python: `def sentencePalindrome(s: str) -> bool:\n    left, right = 0, len(s) - 1\n    while left < right:\n        while left < right and not s[left].isalnum():\n            left += 1\n        while left < right and not s[right].isalnum():\n            right -= 1\n        if s[left].lower() != s[right].lower():\n            return False\n        left += 1\n        right -= 1\n    return True`,
      javascript: `function sentencePalindrome(s) {\n    let clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    return clean === clean.split('').reverse().join('');\n}`
    },
    testCases: [
      { input: "Too hot to hoot.", expected: "true" },
      { input: "Abba", expected: "true" },
      { input: "No 'x' in Nixon", expected: "true" },
      { input: "Not a palindrome", expected: "false" }
    ],
    jsTestCall: `(function(s){ return String(sentencePalindrome(s)); })(__INPUT__)`
  },
  {
    id: 12,
    title: "Isomorphic Strings",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "250K+",
    companies: ["LinkedIn", "Google", "Amazon"],
    pattern: "Double Hash Mapping",
    realWorld: "Used in data anonymization where original strings are mapped to substitute characters consistently to protect sensitive info.",
    description: `Given two strings <strong>s</strong> and <strong>t</strong>, determine if they are isomorphic. Two strings are isomorphic if the characters in <strong>s</strong> can be replaced to get <strong>t</strong>.`,
    examples: [
      { input: 's = "egg", t = "add"', output: 'true' },
      { input: 's = "foo", t = "bar"', output: 'false' }
    ],
    constraints: ['1 ≤ s.length ≤ 5 * 10⁴'],
    hint: `Each character in 's' must map to exactly one character in 't', and vice versa. Use two maps or one map and one set.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isIsomorphic(string s, string t) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s, t; cin >> s >> t;\n    cout << (Solution().isIsomorphic(s, t) ? "true" : "false") << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean isIsomorphic(String s, String t) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(isIsomorphic(sc.next(), sc.next()));\n    }\n}`,
      python: `class Solution:\n    def isIsomorphic(self, s: str, t: str) -> bool:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s, t = input().split()\n    print(str(Solution().isIsomorphic(s, t)).lower())`,
      javascript: `function isIsomorphic(s, t) {\n    // Your code here\n}`
    },
    solution: {
        cpp: `bool isIsomorphic(string s, string t) {\n    if (s.length() != t.length()) return false;\n    unordered_map<char, char> m1, m2;\n    for (int i = 0; i < s.length(); i++) {\n        if (m1.count(s[i]) && m1[s[i]] != t[i]) return false;\n        if (m2.count(t[i]) && m2[t[i]] != s[i]) return false;\n        m1[s[i]] = t[i];\n        m2[t[i]] = s[i];\n    }\n    return true;\n}`,
        java: `public static boolean isIsomorphic(String s, String t) {\n    if (s.length() != t.length()) return false;\n    Map<Character, Character> m1 = new HashMap<>();\n    Map<Character, Character> m2 = new HashMap<>();\n    for (int i = 0; i < s.length(); i++) {\n        char c1 = s.charAt(i), c2 = t.charAt(i);\n        if (m1.containsKey(c1) && m1.get(c1) != c2) return false;\n        if (m2.containsKey(c2) && m2.get(c2) != c1) return false;\n        m1.put(c1, c2);\n        m2.put(c2, c1);\n    }\n    return true;\n}`,
        python: `def isIsomorphic(s: str, t: str) -> bool:\n    if len(s) != len(t): return False\n    m1, m2 = {}, {}\n    for c1, c2 in zip(s, t):\n        if (c1 in m1 and m1[c1] != c2) or (c2 in m2 and m2[c2] != c1):\n            return False\n        m1[c1] = c2\n        m2[c2] = c1\n    return True`,
      javascript: `function isIsomorphic(s, t) {\n    if (s.length !== t.length) return false;\n    let m1 = {}, m2 = {};\n    for (let i = 0; i < s.length; i++) {\n        if (m1[s[i]] !== m2[t[i]]) return false;\n        m1[s[i]] = i + 1;\n        m2[t[i]] = i + 1;\n    }\n    return true;\n}`
    },
    testCases: [
      { input: "egg|add", expected: "true" },
      { input: "foo|bar", expected: "false" },
      { input: "paper|title", expected: "true" },
      { input: "ab|aa", expected: "false" }
    ],
    jsTestCall: `(function(inp){ const [s, t] = inp.split('|'); return String(isIsomorphic(s, t)); })(__INPUT__)`
  },
  {
    id: 13,
    title: "Check for k-anagram",
    difficulty: "Medium",
    accuracy: "48.3%",
    submissions: "45K+",
    companies: ["Walmart", "Snapdeal"],
    pattern: "Frequency Counter",
    realWorld: "Used in approximate string matching where small errors or deliberate changes (like typos) are allowed within a threshold 'k'.",
    description: `Given two strings of the same length, find if they can be made anagrams by changing at most <strong>k</strong> characters in the first string.`,
    examples: [
      { input: 's1 = "anagram", s2 = "grammar", k = 3', output: 'true' }
    ],
    constraints: ['1 ≤ |s1| ≤ 10⁵', '0 ≤ k ≤ |s1|'],
    hint: `Count the frequency of characters in both strings. The number of characters to change is the sum of differences in frequencies for characters present more in the second string.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nbool areKAnagrams(string s1, string s2, int k) {\n    // Your code here\n}\n\nint main() {\n    string s1, s2; int k;\n    cin >> s1 >> s2 >> k;\n    cout << (areKAnagrams(s1, s2, k) ? "true" : "false") << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean areKAnagrams(String s1, String s2, int k) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(areKAnagrams(sc.next(), sc.next(), sc.nextInt()));\n    }\n}`,
      python: `def areKAnagrams(s1: str, s2: str, k: int) -> bool:\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    s1, s2, k = input().split()\n    print(str(areKAnagrams(s1, s2, int(k))).lower())`,
      javascript: `function areKAnagrams(s1, s2, k) {\n    // Your code here\n}`
    },
    solution: {
        cpp: `bool areKAnagrams(string s1, string s2, int k) {\n    if (s1.length() != s2.length()) return false;\n    vector<int> freq(26, 0);\n    for (char c : s1) freq[c - 'a']++;\n    int diff = 0;\n    for (char c : s2) {\n        if (freq[c - 'a'] > 0) freq[c - 'a']--;\n        else diff++;\n    }\n    return diff <= k;\n}`,
        java: `public static boolean areKAnagrams(String s1, String s2, int k) {\n    if (s1.length() != s2.length()) return false;\n    int[] freq = new int[26];\n    for (char c : s1.toCharArray()) freq[c - 'a']++;\n    int diff = 0;\n    for (char c : s2.toCharArray()) {\n        if (freq[c - 'a'] > 0) freq[c - 'a']--;\n        else diff++;\n    }\n    return diff <= k;\n}`,
        python: `def areKAnagrams(s1: str, s2: str, k: int) -> bool:\n    if len(s1) != len(s2): return False\n    freq = [0] * 26\n    for c in s1: freq[ord(c) - ord('a')] += 1\n    diff = 0\n    for c in s2:\n        if freq[ord(c) - ord('a')] > 0:\n            freq[ord(c) - ord('a')] -= 1\n        else:\n            diff += 1\n    return diff <= k\n`,
      javascript: `function areKAnagrams(s1, s2, k) {\n    if (s1.length !== s2.length) return false;\n    let map = {};\n    for (let char of s1) map[char] = (map[char] || 0) + 1;\n    let diff = 0;\n    for (let char of s2) {\n        if (map[char] > 0) map[char]--;\n        else diff++;\n    }\n    return diff <= k;\n}`
    },
    testCases: [
      { input: "anagram|grammar|3", expected: "true" },
      { input: "geeks|eggks|0", expected: "false" },
      { input: "abc|def|3", expected: "true" },
      { input: "abc|def|2", expected: "false" }
    ],
    jsTestCall: `(function(inp){ const [s1, s2, k] = inp.split('|'); return String(areKAnagrams(s1, s2, Number(k))); })(__INPUT__)`
  },
  {
    id: 14,
    title: "Equal 0,1, and 2",
    difficulty: "Medium",
    accuracy: "38.5%",
    submissions: "25K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Prefix Sum + Hash Map",
    realWorld: "Used in balancing multi-resource allocation where three different types of tasks must be distributed equally across time slots.",
    description: `Given a string <strong>str</strong> of 0s, 1s, and 2s, find the total number of substrings that contain an equal number of 0s, 1s, and 2s.`,
    examples: [
      { input: 'str = "010212"', output: '2', explain: 'Substrings are "012" and "102".' }
    ],
    constraints: ['1 ≤ |str| ≤ 10⁵'],
    hint: `Maintain a running count of 0s, 1s, and 2s. Store the difference (c0-c1) and (c0-c2) as a key in a hash map.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <map>\nusing namespace std;\n\nlong long getSubstringWithEqual012(string s) {\n    // Your code here\n}\n\nint main() {\n    string s; cin >> s;\n    cout << getSubstringWithEqual012(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static long getSubstringWithEqual012(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(getSubstringWithEqual012(sc.next()));\n    }\n}`,
      python: `def getSubstringWithEqual012(s: str) -> int:\n    # Your code here\n    pass\n\nif __name__ == "__main__":\n    print(getSubstringWithEqual012(input()))`,
      javascript: `function getSubstringWithEqual012(s) {\n    // Your code here\n}`
    },
    solution: {
        cpp: `long long getSubstringWithEqual012(string s) {\n    long long count = 0;\n    int c0 = 0, c1 = 0, c2 = 0;\n    map<pair<int, int>, int> freq;\n    freq[{0, 0}] = 1;\n    for (char ch : s) {\n        if (ch == '0') c0++;\n        else if (ch == '1') c1++;\n        else c2++;\n        pair<int, int> key = {c0 - c1, c0 - c2};\n        count += freq[key];\n        freq[key]++;\n    }\n    return count;\n}`,
        java: `public static long getSubstringWithEqual012(String s) {\n    long count = 0;\n    int c0 = 0, c1 = 0, c2 = 0;\n    Map<String, Integer> freq = new HashMap<>();\n    freq.put("0,0", 1);\n    for (char ch : s.toCharArray()) {\n        if (ch == '0') c0++;\n        else if (ch == '1') c1++;\n        else c2++;\n        String key = (c0 - c1) + "," + (c0 - c2);\n        count += freq.getOrDefault(key, 0);\n        freq.put(key, freq.getOrDefault(key, 0) + 1);\n    }\n    return count;\n}`,
        python: `def getSubstringWithEqual012(s: str) -> int:\n    count = 0\n    c0 = c1 = c2 = 0\n    freq = {"0,0": 1}\n    for ch in s:\n        if ch == '0': c0 += 1\n        elif ch == '1': c1 += 1\n        else: c2 += 1\n        key = f"{c0 - c1},{c0 - c2}"\n        count += freq.get(key, 0)\n        freq[key] = freq.get(key, 0) + 1\n    return count\n`,
      javascript: `function getSubstringWithEqual012(s) {\n    let count = 0, c0 = 0, c1 = 0, c2 = 0;\n    let map = new Map();\n    map.set("0,0", 1);\n    for (let char of s) {\n        if (char === '0') c0++;\n        else if (char === '1') c1++;\n        else c2++;\n        let key = (c0 - c1) + "," + (c0 - c2);\n        if (map.has(key)) {\n            count += map.get(key);\n            map.set(key, map.get(key) + 1);\n        } else {\n            map.set(key, 1);\n        }\n    }\n    return count;\n}`
    },
    testCases: [
      { input: "010212", expected: "2" },
      { input: "012", expected: "1" },
      { input: "001122", expected: "1" },
      { input: "120120", expected: "3" }
    ],
    jsTestCall: `(function(s){ return String(getSubstringWithEqual012(s)); })(__INPUT__)`
  },
  {
    id: 15,
    title: "Find and Replace in String",
    difficulty: "Medium",
    accuracy: "52.4%",
    submissions: "90K+",
    companies: ["Google", "Facebook"],
    pattern: "String Transformation / Index Mapping",
    realWorld: "Core logic for 'Refactor' tools in IDEs where multiple variable names are changed simultaneously throughout a file.",
    description: `Perform multiple string replacements simultaneously. A replacement only happens if the source substring matches the original string at the given index.`,
    examples: [
      { input: 's = "abcd", indices = [0,2], sources = ["a","cd"], targets = ["eee","ffff"]', output: '"eeebffff"' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000'],
    hint: `Store all valid replacements in a map keyed by index. Traverse the string once, checking if an index has a replacement. If yes, add target; otherwise, add current char.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\nusing namespace std;\n\nclass Solution {\npublic:\n    string findReplaceString(string s, vector<int>& indices, vector<string>& sources, vector<string>& targets) {\n        // Your code here\n    }\n};\n\nint main() {\n    // Input boilerplate\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String findReplaceString(String s, int[] indices, String[] sources, String[] targets) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        // Scanner boilerplate\n    }\n}`,
      python: `class Solution:\n    def findReplaceString(self, s: str, indices: list[int], sources: list[str], targets: list[str]) -> str:\n        # Your code here\n        pass`,
      javascript: `function findReplaceString(s, indices, sources, targets) {\n    // Your code here\n}`
    },
    solution: {
    cpp: `string findReplaceString(string s, vector<int>& indices, vector<string>& sources, vector<string>& targets) {\n    map<int, pair<int, string>> replace;\n    for (int i = 0; i < indices.size(); i++) {\n        if (s.substr(indices[i], sources[i].size()) == sources[i]) {\n            replace[indices[i]] = {sources[i].size(), targets[i]};\n        }\n    }\n    string res;\n    for (int i = 0; i < s.size();) {\n        if (replace.count(i)) {\n            res += replace[i].second;\n            i += replace[i].first;\n        } else {\n            res += s[i++];\n        }\n    }\n    return res;\n}`,
    java: `public static String findReplaceString(String s, int[] indices, String[] sources, String[] targets) {\n    Map<Integer, Pair<Integer, String>> replace = new HashMap<>();\n    for (int i = 0; i < indices.length; i++) {\n        if (s.startsWith(sources[i], indices[i])) {\n            replace.put(indices[i], new Pair<>(sources[i].length(), targets[i]));\n        }\n    }\n    StringBuilder res = new StringBuilder();\n    for (int i = 0; i < s.length();) {\n        if (replace.containsKey(i)) {\n            res.append(replace.get(i).getValue());\n            i += replace.get(i).getKey();\n        } else {\n            res.append(s.charAt(i++));\n        }\n    }\n    return res.toString();\n}`,
    python: `def findReplaceString(s, indices, sources, targets):\n    replace = {}\n    for i in range(len(indices)):\n        if s.startswith(sources[i], indices[i]):\n            replace[indices[i]] = (len(sources[i]), targets[i])\n    res = ""\n    i = 0\n    while i < len(s):\n        if i in replace:\n            res += replace[i][1]\n            i += replace[i][0]\n        else:\n            res += s[i]\n            i += 1\n    return res`,
      javascript: `function findReplaceString(s, indices, sources, targets) {\n    let replace = new Map();\n    for (let i = 0; i < indices.length; i++) {\n        if (s.startsWith(sources[i], indices[i])) {\n            replace.set(indices[i], [sources[i].length, targets[i]]);\n        }\n    }\n    let res = "", i = 0;\n    while (i < s.length) {\n        if (replace.has(i)) {\n            let [len, target] = replace.get(i);\n            res += target;\n            i += len;\n        } else {\n            res += s[i++];\n        }\n    }\n    return res;\n}`
    },
    testCases: [
      { input: "abcd|[0,2]|['a','cd']|['eee','ffff']", expected: "eeebffff" },
      { input: "abcd|[0,2]|['ab','ec']|['eee','ffff']", expected: "eeecd" }
    ],
    jsTestCall: `(function(inp){ \n    const parts = inp.split('|');\n    const s = parts[0];\n    const indices = JSON.parse(parts[1]);\n    const sources = JSON.parse(parts[2].replace(/'/g, '"'));\n    const targets = JSON.parse(parts[3].replace(/'/g, '"'));\n    return findReplaceString(s, indices, sources, targets);\n })(__INPUT__)`
  },
  {
    id: 16,
    title: "Look and Say Pattern",
    difficulty: "Medium",
    accuracy: "46.2%",
    submissions: "80K+",
    companies: ["Amazon", "Facebook"],
    pattern: "Iterative Generation",
    realWorld: "Used in data compression research and educational math to describe sequence growth patterns.",
    description: `The look-and-say sequence is: 1, 11, 21, 1211, 111221... Given <strong>n</strong>, generate the <strong>n<sup>th</sup></strong> term.`,
    examples: [
      { input: 'n = 4', output: '"1211"', explain: 'Read "21" as "one 2, one 1".' }
    ],
    constraints: ['1 ≤ n ≤ 30'],
    hint: `To generate term n+1 from term n: scan term n from left to right, count consecutive identical digits, and append "count + digit" to the result.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nstring countAndSay(int n) {\n    // Your code here\n}\n\nint main() {\n    int n; cin >> n;\n    cout << countAndSay(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String countAndSay(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(countAndSay(sc.nextInt()));\n    }\n}`,
      python: `class Solution:\n    def countAndSay(self, n: int) -> str:\n        # Your code here\n        pass`,
      javascript: `function countAndSay(n) {\n    // Your code here\n}`
    },
    solution: {
        cpp: `string countAndSay(int n) {\n    if (n == 1) return "1";\n    string curr = "1";\n    for (int i = 2; i <= n; i++) {\n        string next = "";\n        int count = 1;\n        for (int j = 0; j < curr.size(); j++) {\n            if (j + 1 < curr.size() && curr[j] == curr[j + 1]) count++;\n            else {\n                next += to_string(count) + curr[j];\n                count = 1;\n            }\n        }\n        curr = next;\n    }\n    return curr;\n}`,
        java: `public static String countAndSay(int n) {\n    if (n == 1) return "1";\n    String curr = "1";\n    for (int i = 2; i <= n; i++) {\n        StringBuilder next = new StringBuilder();\n        int count = 1;\n        for (int j = 0; j < curr.length(); j++) {\n            if (j + 1 < curr.length() && curr.charAt(j) == curr.charAt(j + 1)) count++;\n            else {\n                next.append(count).append(curr.charAt(j));\n                count = 1;\n            }\n        }\n        curr = next.toString();\n    }\n    return curr;\n}`,
      python: `def countAndSay(n):\n    if n == 1: return "1"\n    curr = "1"\n    for i in range(2, n + 1):\n        next_str = ""\n        count = 1\n        for j in range(len(curr)):\n            if j + 1 < len(curr) and curr[j] == curr[j + 1]:\n                count += 1\n            else:\n                next_str += str(count) + curr[j]\n                count = 1\n        curr = next_str\n    return curr`,
      javascript: `function countAndSay(n) {\n    if (n === 1) return "1";\n    let curr = "1";\n    for (let i = 2; i <= n; i++) {\n        let next = "", count = 1;\n        for (let j = 0; j < curr.length; j++) {\n            if (curr[j] === curr[j+1]) count++;\n            else {\n                next += count + curr[j];\n                count = 1;\n            }\n        }\n        curr = next;\n    }\n    return curr;\n}`
    },
    testCases: [
      { input: "1", expected: "1" },
      { input: "4", expected: "1211" },
      { input: "5", expected: "111221" },
      { input: "6", expected: "312211" }
    ],
    jsTestCall: `(function(n){ return countAndSay(Number(n)); })(__INPUT__)`
  },

  {
    id: 17,
    title: "Minimum repetitions to make Substring",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "85K+",
    companies: ["Google", "Amazon"],
    pattern: "String Growth / Search",
    realWorld: "Used in pattern matching for periodic data streams and DNA sequence alignment.",
    description: `Given two strings <strong>s1</strong> and <strong>s2</strong>, return the minimum number of times <strong>s1</strong> has to be repeated such that <strong>s2</strong> is a substring of it. If no such repetition exists, return <code>-1</code>.`,
    examples: [
      { input: 's1 = "abcd", s2 = "cdabcdab"', output: '3', explain: '"abcd" repeated 3 times is "abcdabcdabcd", which contains "cdabcdab".' }
    ],
    constraints: ['1 ≤ s1.length, s2.length ≤ 10³'],
    hint: `Repeat s1 until its length is at least s2. If not found, try repeating one more time.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minRepeats(string s1, string s2) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s1, s2;\n    cin >> s1 >> s2;\n    cout << Solution().minRepeats(s1, s2) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int minRepeats(String s1, String s2) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s1 = sc.next();\n        String s2 = sc.next();\n        System.out.println(minRepeats(s1, s2));\n    }\n}`,
      python: `class Solution:\n    def minRepeats(self, s1: str, s2: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s1 = input()\n    s2 = input()\n    print(Solution().minRepeats(s1, s2))`,
      javascript: `function minRepeats(s1, s2) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int minRepeats(string s1, string s2) {\n    string temp = s1;\n    int count = 1;\n    while(temp.length() < s2.length()) {\n        temp += s1;\n        count++;\n    }\n    if(temp.find(s2) != string::npos) return count;\n    temp += s1;\n    if(temp.find(s2) != string::npos) return count + 1;\n    return -1;\n}`,
      java: `public static int minRepeats(String s1, String s2) {\n    StringBuilder sb = new StringBuilder(s1);\n    int count = 1;\n    while(sb.length() < s2.length()) {\n        sb.append(s1);\n        count++;\n    }\n    if(sb.indexOf(s2) != -1) return count;\n    if(sb.append(s1).indexOf(s2) != -1) return count + 1;\n    return -1;\n}`,
      python: `def minRepeats(self, s1: str, s2: str) -> int:\n    count = 1\n    temp = s1\n    while len(temp) < len(s2):\n        temp += s1\n        count += 1\n    if s2 in temp: return count\n    if s2 in temp + s1: return count + 1\n    return -1`,
      javascript: `function minRepeats(s1, s2) {\n    let temp = s1;\n    let count = 1;\n    while(temp.length < s2.length) {\n        temp += s1;\n        count++;\n    }\n    if(temp.includes(s2)) return count;\n    if((temp + s1).includes(s2)) return count + 1;\n    return -1;\n}`
    },
    testCases: [
      { input: "abcd|cdabcdab", expected: "3" },
      { input: "ab|abcaba", expected: "-1" },
      { input: "a|aaaa", expected: "4" },
      { input: "abc|cabcabca", expected: "4" }
    ],
    jsTestCall: `(function(inp){ const [s1, s2] = inp.split('|'); return minRepeats(s1, s2); })(__INPUT__)`
  },
  
  {
    id: 18,
    title: "Excel Sheet – I",
    difficulty: "Medium",
    accuracy: "48.2%",
    submissions: "110K+",
    companies: ["Microsoft", "Amazon", "Oracle"],
    pattern: "Base-26 Conversion",
    realWorld: "Used in spreadsheet applications (Excel, Google Sheets) to map numerical column indices to letter headings.",
    description: `Given a positive integer <strong>n</strong>, return its corresponding column title as it appears in an Excel sheet. (e.g., 1 -> A, 27 -> AA).`,
    examples: [
      { input: 'n = 28', output: '"AB"', explain: '26 is Z, 27 is AA, 28 is AB.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁷'],
    hint: `This is similar to converting to base-26, but 1-indexed. Subtract 1 from n at each step.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string excelColumn(int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    cout << Solution().excelColumn(n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String excelColumn(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(excelColumn(sc.nextInt()));\n    }\n}`,
      python: `class Solution:\n    def excelColumn(self, n: int) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    n = int(input())\n    print(Solution().excelColumn(n))`,
      javascript: `function excelColumn(n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string excelColumn(int n) {\n    string res = "";\n    while(n > 0) {\n        n--;\n        res += (char)('A' + (n % 26));\n        n /= 26;\n    }\n    reverse(res.begin(), res.end());\n    return res;\n}`,
      java: `public static String excelColumn(int n) {\n    StringBuilder sb = new StringBuilder();\n    while(n > 0) {\n        n--;\n        sb.append((char)('A' + (n % 26)));\n        n /= 26;\n    }\n    return sb.reverse().toString();\n}`,
      python: `def excelColumn(self, n: int) -> str:\n    res = []\n    while n > 0:\n        n -= 1\n        res.append(chr(ord('A') + (n % 26)))\n        n //= 26\n    return "".join(reversed(res))`,
      javascript: `function excelColumn(n) {\n    let res = "";\n    while(n > 0) {\n        n--;\n        res = String.fromCharCode(65 + (n % 26)) + res;\n        n = Math.floor(n / 26);\n    }\n    return res;\n}`
    },
    testCases: [
      { input: "1", expected: "A" },
      { input: "28", expected: "AB" },
      { input: "701", expected: "ZY" },
      { input: "52", expected: "AZ" }
    ],
    jsTestCall: `(function(n){ return excelColumn(Number(n)); })(__INPUT__)`
  },
  
  {
    id: 19,
    title: "Find the N-th character",
    difficulty: "Easy",
    accuracy: "52.4%",
    submissions: "45K+",
    companies: ["TCS", "Zoho"],
    pattern: "Simulation / String Manipulation",
    realWorld: "Used in generating L-systems (fractal strings) for computer graphics or procedural generation.",
    description: `Given a binary string <strong>s</strong>, perform <strong>r</strong> iterations where '0' becomes '01' and '1' becomes '10'. Find the character at index <strong>n</strong> after <strong>r</strong> iterations.`,
    examples: [
      { input: 's = "1100", r = 2, n = 3', output: '"1"', explain: '1100 -> 10100101 -> 1001100101100110. Index 3 is 1.' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000', '1 ≤ r ≤ 20', '0 ≤ n < s.length'],
    hint: `Notice you don't need to transform the whole string. Only the part that affects index n matters.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    char nthCharacter(string s, int r, int n) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; int r, n;\n    cin >> s >> r >> n;\n    cout << Solution().nthCharacter(s, r, n) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static char nthCharacter(String s, int r, int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int r = sc.nextInt();\n        int n = sc.nextInt();\n        System.out.println(nthCharacter(s, r, n));\n    }\n}`,
      python: `class Solution:\n    def nthCharacter(self, s: str, r: int, n: int) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = input()\n    r = int(input())\n    n = int(input())\n    print(Solution().nthCharacter(s, r, n))`,
      javascript: `function nthCharacter(s, r, n) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `char nthCharacter(string s, int r, int n) {\n    for(int i=0; i<r; i++) {\n        string next = "";\n        for(char c : s) {\n            if(c == '1') next += "10";\n            else next += "01";\n            if(next.length() > n) break;\n        }\n        s = next;\n    }\n    return s[n];\n}`,
      java: `public static char nthCharacter(String s, int r, int n) {\n    for(int i=0; i<r; i++) {\n        StringBuilder sb = new StringBuilder();\n        for(char c : s.toCharArray()) {\n            if(c == '1') sb.append("10");\n            else sb.append("01");\n            if(sb.length() > n) break;\n        }\n        s = sb.toString();\n    }\n    return s.charAt(n);\n}`,
      python: `def nthCharacter(self, s: str, r: int, n: int) -> str:\n    for _ in range(r):\n        next_s = ""\n        for char in s:\n            next_s += "10" if char == '1' else "01"\n            if len(next_s) > n: break\n        s = next_s\n    return s[n]`,
      javascript: `function nthCharacter(s, r, n) {\n    for(let i=0; i<r; i++) {\n        let next = "";\n        for(let char of s) {\n            next += (char === '1' ? "10" : "01");\n            if(next.length > n) break;\n        }\n        s = next;\n    }\n    return s[n];\n}`
    },
    testCases: [
      { input: "1100|2|3", expected: "1" },
      { input: "101|1|2", expected: "1" },
      { input: "01|2|1", expected: "1" },
      { input: "1|3|0", expected: "1" }
    ],
    jsTestCall: `(function(inp){ const [s, r, n] = inp.split('|'); return nthCharacter(s, Number(r), Number(n)); })(__INPUT__)`
  },
  {
    id: 20,
    title: "Length of longest prefix suffix",
    difficulty: "Medium",
    accuracy: "35.5%",
    submissions: "150K+",
    companies: ["Microsoft", "Google", "Amazon"],
    pattern: "KMP Algorithm (LPS Array)",
    realWorld: "The core of efficient pattern matching algorithms used in search engines and text editors.",
    description: `Given a string <strong>s</strong>, find the length of the longest proper prefix of s that is also a suffix of s. Proper prefix/suffix excludes the whole string.`,
    examples: [
      { input: 's = "ababab"', output: '4', explain: 'Prefix "abab" (index 0-3) is same as suffix "abab" (index 2-5).' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁶'],
    hint: `Use the preprocessing logic of the Knuth-Morris-Pratt (KMP) algorithm to build the LPS array.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lps(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().lps(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int lps(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(lps(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def lps(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().lps(input()))`,
      javascript: `function lps(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int lps(string s) {\n    int n = s.length();\n    vector<int> pi(n, 0);\n    for (int i = 1; i < n; i++) {\n        int j = pi[i-1];\n        while (j > 0 && s[i] != s[j]) j = pi[j-1];\n        if (s[i] == s[j]) j++;\n        pi[i] = j;\n    }\n    return pi[n-1];\n}`,
      java: `public static int lps(String s) {\n    int n = s.length();\n    int[] pi = new int[n];\n    for (int i = 1; i < n; i++) {\n        int j = pi[i-1];\n        while (j > 0 && s.charAt(i) != s.charAt(j)) j = pi[j-1];\n        if (s.charAt(i) == s.charAt(j)) j++;\n        pi[i] = j;\n    }\n    return pi[n-1];\n}`,
      python: `def lps(self, s: str) -> int:\n    n = len(s)\n    pi = [0] * n\n    for i in range(1, n):\n        j = pi[i-1]\n        while j > 0 and s[i] != s[j]:\n            j = pi[j-1]\n        if s[i] == s[j]:\n            j += 1\n        pi[i] = j\n    return pi[-1]`,
      javascript: `function lps(s) {\n    const n = s.length;\n    const pi = new Array(n).fill(0);\n    for (let i = 1; i < n; i++) {\n        let j = pi[i-1];\n        while (j > 0 && s[i] !== s[j]) j = pi[j-1];\n        if (s[i] === s[j]) j++;\n        pi[i] = j;\n    }\n    return pi[n-1];\n}`
    },
    testCases: [
      { input: "ababab", expected: "4" },
      { input: "aaaa", expected: "3" },
      { input: "abc", expected: "0" },
      { input: "aabaa", expected: "2" }
    ],
    jsTestCall: `(function(s){ return lps(s); })(__INPUT__)`
  },
  {
    id: 21,
    title: "Longest K unique characters substring",
    difficulty: "Medium",
    accuracy: "38.2%",
    submissions: "150K+",
    companies: ["Amazon", "Google", "Microsoft"],
    pattern: "Sliding Window + Hash Map",
    realWorld: "Used in data compression algorithms and analysis of DNA sequences to find regions with specific diverse characteristics.",
    description: `Given a string <strong>s</strong> and an integer <strong>k</strong>, find the length of the longest substring that contains exactly <strong>k</strong> unique characters. If no such substring exists, return <code>-1</code>.`,
    examples: [
      { input: 's = "aabacbebebe", k = 3', output: '7', explain: 'The substring "cbebebe" has length 7 and 3 unique characters.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', '1 ≤ k ≤ 26'],
    hint: `Maintain a sliding window and a frequency map. Expand the right pointer until unique characters > k, then shrink from the left.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestKSubstr(string s, int k) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; int k;\n    cin >> s >> k;\n    cout << Solution().longestKSubstr(s, k) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int longestKSubstr(String s, int k) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int k = sc.nextInt();\n        System.out.println(longestKSubstr(s, k));\n    }\n}`,
      python: `class Solution:\n    def longestKSubstr(self, s: str, k: int) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = input()\n    k = int(input())\n    print(Solution().longestKSubstr(s, k))`,
      javascript: `function longestKSubstr(s, k) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int longestKSubstr(string s, int k) {\n    int n = s.length(), left = 0, maxLen = -1;\n    unordered_map<char, int> mp;\n    for (int right = 0; right < n; right++) {\n        mp[s[right]]++;\n        while (mp.size() > k) {\n            mp[s[left]]--;\n            if (mp[s[left]] == 0) mp.erase(s[left]);\n            left++;\n        }\n        if (mp.size() == k) maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      java: `public static int longestKSubstr(String s, int k) {\n    int n = s.length(), left = 0, maxLen = -1;\n    Map<Character, Integer> map = new HashMap<>();\n    for (int right = 0; right < n; right++) {\n        char c = s.charAt(right);\n        map.put(c, map.getOrDefault(c, 0) + 1);\n        while (map.size() > k) {\n            char leftChar = s.charAt(left);\n            map.put(leftChar, map.get(leftChar) - 1);\n            if (map.get(leftChar) == 0) map.remove(leftChar);\n            left++;\n        }\n        if (map.size() == k) maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      python: `def longestKSubstr(self, s: str, k: int) -> int:\n    n, left, max_len = len(s), 0, -1\n    d = {}\n    for right in range(n):\n        d[s[right]] = d.get(s[right], 0) + 1\n        while len(d) > k:\n            d[s[left]] -= 1\n            if d[s[left]] == 0: del d[s[left]]\n            left += 1\n        if len(d) == k: max_len = max(max_len, right - left + 1)\n    return max_len`,
      javascript: `function longestKSubstr(s, k) {\n    let left = 0, maxLen = -1, map = new Map();\n    for (let right = 0; right < s.length; right++) {\n        map.set(s[right], (map.get(s[right]) || 0) + 1);\n        while (map.size > k) {\n            map.set(s[left], map.get(s[left]) - 1);\n            if (map.get(s[left]) === 0) map.delete(s[left]);\n            left++;\n        }\n        if (map.size === k) maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`
    },
    testCases: [
      { input: "aabacbebebe|3", expected: "7" },
      { input: "aaaa|2", expected: "-1" },
      { input: "abc|3", expected: "3" },
      { input: "abbbcccc|2", expected: "7" }
    ],
    jsTestCall: `(function(inp){ const [s, k] = inp.split('|'); return longestKSubstr(s, Number(k)); })(__INPUT__)`
  },
  

  {
    id: 22,
    title: "Longest substring without repeating characters",
    difficulty: "Medium",
    accuracy: "34.1%",
    submissions: "2M+",
    companies: ["Amazon", "Adobe", "Meta", "Google"],
    pattern: "Sliding Window (Optimized)",
    realWorld: "Used in network packet analysis and string matching where unique sequences represent distinct states or IDs.",
    description: `Given a string <strong>s</strong>, find the length of the <strong>longest substring</strong> without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explain: 'The answer is "abc", with the length of 3.' }
    ],
    constraints: ['0 ≤ s.length ≤ 5 * 10⁴'],
    hint: `Use a map to store the last seen index of each character. If you see a character again, jump the left pointer to <code>max(left, lastSeenIndex + 1)</code>.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().lengthOfLongestSubstring(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int lengthOfLongestSubstring(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNext() ? sc.next() : "";\n        System.out.println(lengthOfLongestSubstring(s));\n    }\n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    print(Solution().lengthOfLongestSubstring(s))`,
      javascript: `function lengthOfLongestSubstring(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int lengthOfLongestSubstring(string s) {\n    vector<int> m(256, -1);\n    int left = 0, res = 0;\n    for (int right = 0; right < s.length(); right++) {\n        if (m[s[right]] != -1) left = max(left, m[s[right]] + 1);\n        m[s[right]] = right;\n        res = max(res, right - left + 1);\n    }\n    return res;\n}`,
      java: `public static int lengthOfLongestSubstring(String s) {\n    int[] m = new int[256];\n    Arrays.fill(m, -1);\n    int left = 0, res = 0;\n    for (int right = 0; right < s.length(); right++) {\n        if (m[s.charAt(right)] != -1) left = Math.max(left, m[s.charAt(right)] + 1);\n        m[s.charAt(right)] = right;\n        res = Math.max(res, right - left + 1);\n    }\n    return res;\n}`,
      python: `def lengthOfLongestSubstring(self, s: str) -> int:\n    char_map = {}\n    left = res = 0\n    for right, char in enumerate(s):\n        if char in char_map: left = max(left, char_map[char] + 1)\n        char_map[char] = right\n        res = max(res, right - left + 1)\n    return res`,
      javascript: `function lengthOfLongestSubstring(s) {\n    let m = new Map(), left = 0, res = 0;\n    for (let right = 0; right < s.length; right++) {\n        if (m.has(s[right])) left = Math.max(left, m.get(s[right]) + 1);\n        m.set(s[right], right);\n        res = Math.max(res, right - left + 1);\n    }\n    return res;\n}`
    },
    testCases: [
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" },
      { input: "pwwkew", expected: "3" },
      { input: " ", expected: "1" }
    ],
    jsTestCall: `(function(s){ return lengthOfLongestSubstring(s); })(__INPUT__)`
  },

  {
    id: 23,
    title: "Smallest window containing all",
    difficulty: "Hard",
    accuracy: "30.5%",
    submissions: "120K+",
    companies: ["Google", "Amazon", "Snapdeal"],
    pattern: "Two Pointers / Sliding Window",
    realWorld: "Used in data recovery to find the shortest segment of a corrupted stream that contains all required metadata headers.",
    description: `Given a string <strong>s</strong>, find the smallest window length that contains all the <strong>distinct characters</strong> of the given string itself.`,
    examples: [
      { input: 's = "AABCBCDA"', output: '4', explain: 'The smallest window is "BCDA" (or "ABCD") which contains all characters {A, B, C, D}.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵'],
    hint: `First find the number of unique characters in the whole string. Then use sliding window to find the smallest range that covers that count.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findSubString(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().findSubString(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int findSubString(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(findSubString(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def findSubString(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().findSubString(input()))`,
      javascript: `function findSubString(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int findSubString(string s) {\n    unordered_set<char> st(s.begin(), s.end());\n    int distinct = st.size();\n    unordered_map<char, int> mp;\n    int left = 0, minLen = s.length(), count = 0;\n    for (int right = 0; right < s.length(); right++) {\n        mp[s[right]]++;\n        if (mp[s[right]] == 1) count++;\n        while (count == distinct) {\n            minLen = min(minLen, right - left + 1);\n            mp[s[left]]--;\n            if (mp[s[left]] == 0) count--;\n            left++;\n        }\n    }\n    return minLen;\n}`,
      java: `public static int findSubString(String s) {\n    Set<Character> set = new HashSet<>();\n    for(char c : s.toCharArray()) set.add(c);\n    int distinct = set.size();\n    Map<Character, Integer> map = new HashMap<>();\n    int left = 0, minLen = s.length(), count = 0;\n    for(int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        map.put(c, map.getOrDefault(c, 0) + 1);\n        if(map.get(c) == 1) count++;\n        while(count == distinct) {\n            minLen = Math.min(minLen, right - left + 1);\n            char lc = s.charAt(left);\n            map.put(lc, map.get(lc) - 1);\n            if(map.get(lc) == 0) count--;\n            left++;\n        }\n    }\n    return minLen;\n}`,
      python: `def findSubString(self, s: str) -> int:\n    distinct = len(set(s))\n    d = {}\n    left = count = 0\n    min_len = len(s)\n    for right, char in enumerate(s):\n        d[char] = d.get(char, 0) + 1\n        if d[char] == 1: count += 1\n        while count == distinct:\n            min_len = min(min_len, right - left + 1)\n            d[s[left]] -= 1\n            if d[s[left]] == 0: count -= 1\n            left += 1\n    return min_len`,
      javascript: `function findSubString(s) {\n    const distinct = new Set(s).size;\n    let map = new Map(), left = 0, count = 0, minLen = s.length;\n    for (let right = 0; right < s.length; right++) {\n        map.set(s[right], (map.get(s[right]) || 0) + 1);\n        if (map.get(s[right]) === 1) count++;\n        while (count === distinct) {\n            minLen = Math.min(minLen, right - left + 1);\n            map.set(s[left], map.get(s[left]) - 1);\n            if (map.get(s[left]) === 0) count--;\n            left++;\n        }\n    }\n    return minLen;\n}`
    },
    testCases: [
      { input: "AABCBCDA", expected: "4" },
      { input: "aaab", expected: "2" },
      { input: "geeksforgeeks", expected: "7" },
      { input: "a", expected: "1" }
    ],
    jsTestCall: `(function(s){ return findSubString(s); })(__INPUT__)`
  },

  {
    id: 24,
    title: "Sum of two large numbers",
    difficulty: "Medium",
    accuracy: "32.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Flipkart"],
    pattern: "String Simulation / Carry Logic",
    realWorld: "Used in RSA encryption and arbitrary-precision arithmetic libraries where numbers exceed 64-bit integer limits.",
    description: `Given two non-negative integers <strong>s1</strong> and <strong>s2</strong> represented as strings, return their sum as a string. Eliminate leading zeros unless the result is "0".`,
    examples: [
      { input: 's1 = "0025", s2 = "12"', output: '"37"', explain: '25 + 12 = 37. Leading zeros in input are ignored.' }
    ],
    constraints: ['1 ≤ s1.length, s2.length ≤ 10⁵'],
    hint: `Iterate from right to left using a carry variable. After calculation, remove leading zeros from the final result.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string findSum(string s1, string s2) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s1, s2;\n    cin >> s1 >> s2;\n    cout << Solution().findSum(s1, s2) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String findSum(String s1, String s2) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(findSum(sc.next(), sc.next()));\n    }\n}`,
      python: `class Solution:\n    def findSum(self, s1: str, s2: str) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s1 = input()\n    s2 = input()\n    print(Solution().findSum(s1, s2))`,
      javascript: `function findSum(s1, s2) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string findSum(string s1, string s2) {\n    string res = "";\n    int i = s1.size() - 1, j = s2.size() - 1, carry = 0;\n    while (i >= 0 || j >= 0 || carry) {\n        int val1 = (i >= 0) ? s1[i--] - '0' : 0;\n        int val2 = (j >= 0) ? s2[j--] - '0' : 0;\n        int sum = val1 + val2 + carry;\n        res += to_string(sum % 10);\n        carry = sum / 10;\n    }\n    reverse(res.begin(), res.end());\n    size_t first = res.find_first_not_of('0');\n    if (string::npos == first) return "0";\n    return res.substr(first);\n}`,
      java: `public static String findSum(String s1, String s2) {\n    StringBuilder sb = new StringBuilder();\n    int i = s1.length() - 1, j = s2.length() - 1, carry = 0;\n    while (i >= 0 || j >= 0 || carry > 0) {\n        int n1 = (i >= 0) ? s1.charAt(i--) - '0' : 0;\n        int n2 = (j >= 0) ? s2.charAt(j--) - '0' : 0;\n        int sum = n1 + n2 + carry;\n        sb.append(sum % 10);\n        carry = sum / 10;\n    }\n    String res = sb.reverse().toString().replaceFirst("^0+(?!$)", "");\n    return res.isEmpty() ? "0" : res;\n}`,
      python: `def findSum(self, s1: str, s2: str) -> str:\n    res = []\n    i, j, carry = len(s1)-1, len(s2)-1, 0\n    while i >= 0 or j >= 0 or carry:\n        n1 = int(s1[i]) if i >= 0 else 0\n        n2 = int(s2[j]) if j >= 0 else 0\n        total = n1 + n2 + carry\n        res.append(str(total % 10))\n        carry = total // 10\n        i -= 1; j -= 1\n    ans = "".join(res[::-1]).lstrip('0')\n    return ans if ans else "0"`,
      javascript: `function findSum(s1, s2) {\n    let res = "", carry = 0, i = s1.length - 1, j = s2.length - 1;\n    while (i >= 0 || j >= 0 || carry) {\n        let n1 = i >= 0 ? Number(s1[i--]) : 0;\n        let n2 = j >= 0 ? Number(s2[j--]) : 0;\n        let sum = n1 + n2 + carry;\n        res = (sum % 10) + res;\n        carry = Math.floor(sum / 10);\n    }\n    let finalRes = res.replace(/^0+/, "");\n    return finalRes === "" ? "0" : finalRes;\n}`
    },
    testCases: [
      { input: "0025|12", expected: "37" },
      { input: "999|1", expected: "1000" },
      { input: "0|0", expected: "0" },
      { input: "123|456", expected: "579" }
    ],
    jsTestCall: `(function(inp){ const [s1, s2] = inp.split('|'); return findSum(s1, s2); })(__INPUT__)`
  },
  {
    id: 25,
    title: "Substrings of length k with k-1 distinct elements",
    difficulty: "Medium",
    accuracy: "52.1%",
    submissions: "40K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Sliding Window + Hash Map",
    realWorld: "Used in bioinformatics to detect specific genetic mutations where a sequence is almost perfect but contains one repeating nucleotide.",
    description: `Given a string <strong>s</strong> and an integer <strong>k</strong>, find the count of all substrings of length <strong>k</strong> that contain exactly <strong>k-1</strong> distinct characters.`,
    examples: [
      { input: 's = "abccad", k = 4', output: '2', explain: 'Substrings of length 4: "abcc" (3 distinct: a,b,c) and "bccad" (no, len 5). Actually: "abcc" and "bcca" both have 3 distinct chars.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', '1 ≤ k ≤ s.length'],
    hint: `Use a fixed-size sliding window of length k. Use a frequency map to track the number of distinct elements within that window.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countOfSubstrings(string s, int k) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; int k;\n    cin >> s >> k;\n    cout << Solution().countOfSubstrings(s, k) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int countOfSubstrings(String s, int k) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int k = sc.nextInt();\n        System.out.println(countOfSubstrings(s, k));\n    }\n}`,
      python: `class Solution:\n    def countOfSubstrings(self, s: str, k: int) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = input()\n    k = int(input())\n    print(Solution().countOfSubstrings(s, k))`,
      javascript: `function countOfSubstrings(s, k) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int countOfSubstrings(string s, int k) {\n    if (s.length() < k) return 0;\n    unordered_map<char, int> mp;\n    int count = 0;\n    for (int i = 0; i < k; i++) mp[s[i]]++;\n    if (mp.size() == k - 1) count++;\n    for (int i = k; i < s.length(); i++) {\n        mp[s[i]]++;\n        mp[s[i-k]]--;\n        if (mp[s[i-k]] == 0) mp.erase(s[i-k]);\n        if (mp.size() == k - 1) count++;\n    }\n    return count;\n}`,
      java: `public static int countOfSubstrings(String s, int k) {\n    if (s.length() < k) return 0;\n    Map<Character, Integer> map = new HashMap<>();\n    int count = 0;\n    for(int i=0; i<k; i++) map.put(s.charAt(i), map.getOrDefault(s.charAt(i), 0) + 1);\n    if(map.size() == k-1) count++;\n    for(int i=k; i<s.length(); i++) {\n        map.put(s.charAt(i), map.getOrDefault(s.charAt(i), 0) + 1);\n        map.put(s.charAt(i-k), map.get(s.charAt(i-k)) - 1);\n        if(map.get(s.charAt(i-k)) == 0) map.remove(s.charAt(i-k));\n        if(map.size() == k-1) count++;\n    }\n    return count;\n}`,
      python: `def countOfSubstrings(self, s: str, k: int) -> int:\n    if len(s) < k: return 0\n    d = {}\n    count = 0\n    for i in range(k): d[s[i]] = d.get(s[i], 0) + 1\n    if len(d) == k - 1: count += 1\n    for i in range(k, len(s)):\n        d[s[i]] = d.get(s[i], 0) + 1\n        d[s[i-k]] -= 1\n        if d[s[i-k]] == 0: del d[s[i-k]]\n        if len(d) == k - 1: count += 1\n    return count`,
      javascript: `function countOfSubstrings(s, k) {\n    if (s.length < k) return 0;\n    let map = new Map(), count = 0;\n    for(let i=0; i<k; i++) map.set(s[i], (map.get(s[i]) || 0) + 1);\n    if(map.size === k-1) count++;\n    for(let i=k; i<s.length; i++) {\n        map.set(s[i], (map.get(s[i]) || 0) + 1);\n        map.set(s[i-k], map.get(s[i-k]) - 1);\n        if(map.get(s[i-k]) === 0) map.delete(s[i-k]);\n        if(map.size === k-1) count++;\n    }\n    return count;\n}`
    },
    testCases: [
      { input: "abccad|4", expected: "2" },
      { input: "aaaaa|3", expected: "0" },
      { input: "abcde|3", expected: "0" },
      { input: "aabbc|3", expected: "3" }
    ],
    jsTestCall: `(function(inp){ const [s, k] = inp.split('|'); return countOfSubstrings(s, Number(k)); })(__INPUT__)`
  },

  {
    id: 26,
    title: "Interleaved Strings",
    difficulty: "Hard",
    accuracy: "28.3%",
    submissions: "95K+",
    companies: ["Google", "Amazon", "Yahoo"],
    pattern: "Dynamic Programming / 2D Matrix",
    realWorld: "Used in version control systems (like Git) to determine if a merged file accurately interleaves changes from two different branches.",
    description: `Given three strings <strong>A</strong>, <strong>B</strong>, and <strong>C</strong>, find whether <strong>C</strong> is an interleaving of <strong>A</strong> and <strong>B</strong>. C is said to be interleaving if it contains all characters of A and B and the relative order of characters of individual strings is preserved.`,
    examples: [
      { input: 'A="XY", B="WZ", C="XWYZ"', output: 'true', explain: 'X and Y from A, W and Z from B are merged while keeping order.' }
    ],
    constraints: ['1 ≤ A.length, B.length ≤ 100', 'C.length = A.length + B.length'],
    hint: `Use DP where <code>dp[i][j]</code> represents if <code>C[0...i+j-1]</code> is an interleaving of <code>A[0...i-1]</code> and <code>B[0...j-1]</code>.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isInterleave(string A, string B, string C) {\n        // Your code here\n    }\n};\n\nint main() {\n    string a, b, c;\n    cin >> a >> b >> c;\n    if(Solution().isInterleave(a, b, c)) cout << "true" << endl;\n    else cout << "false" << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static boolean isInterleave(String A, String B, String C) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(isInterleave(sc.next(), sc.next(), sc.next()));\n    }\n}`,
      python: `class Solution:\n    def isInterleave(self, A: str, B: str, C: str) -> bool:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    a = input(); b = input(); c = input()\n    print(str(Solution().isInterleave(a, b, c)).lower())`,
      javascript: `function isInterleave(A, B, C) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `bool isInterleave(string A, string B, string C) {\n    int n = A.length(), m = B.length();\n    if (n + m != C.length()) return false;\n    vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));\n    for (int i = 0; i <= n; i++) {\n        for (int j = 0; j <= m; j++) {\n            if (i == 0 && j == 0) dp[i][j] = true;\n            else if (i == 0) dp[i][j] = dp[i][j-1] && B[j-1] == C[i+j-1];\n            else if (j == 0) dp[i][j] = dp[i-1][j] && A[i-1] == C[i+j-1];\n            else dp[i][j] = (dp[i-1][j] && A[i-1] == C[i+j-1]) || (dp[i][j-1] && B[j-1] == C[i+j-1]);\n        }\n    }\n    return dp[n][m];\n}`,
      java: `public static boolean isInterleave(String A, String B, String C) {\n    int n = A.length(), m = B.length();\n    if(n + m != C.length()) return false;\n    boolean[][] dp = new boolean[n+1][m+1];\n    for(int i=0; i<=n; i++) {\n        for(int j=0; j<=m; j++) {\n            if(i==0 && j==0) dp[i][j] = true;\n            else if(i==0) dp[i][j] = dp[i][j-1] && B.charAt(j-1) == C.charAt(i+j-1);\n            else if(j==0) dp[i][j] = dp[i-1][j] && A.charAt(i-1) == C.charAt(i+j-1);\n            else dp[i][j] = (dp[i-1][j] && A.charAt(i-1) == C.charAt(i+j-1)) || (dp[i][j-1] && B.charAt(j-1) == C.charAt(i+j-1));\n        }\n    }\n    return dp[n][m];\n}`,
      python: `def isInterleave(self, A, B, C):\n    n, m = len(A), len(B)\n    if n + m != len(C): return False\n    dp = [[False] * (m + 1) for _ in range(n + 1)]\n    for i in range(n + 1):\n        for j in range(m + 1):\n            if i == 0 and j == 0: dp[i][j] = True\n            elif i == 0: dp[i][j] = dp[i][j-1] and B[j-1] == C[i+j-1]\n            elif j == 0: dp[i][j] = dp[i-1][j] and A[i-1] == C[i+j-1]\n            else: dp[i][j] = (dp[i-1][j] and A[i-1] == C[i+j-1]) or (dp[i][j-1] and B[j-1] == C[i+j-1])\n    return dp[n][m]`,
      javascript: `function isInterleave(A, B, C) {\n    const n = A.length, m = B.length;\n    if (n + m !== C.length) return false;\n    const dp = Array.from({length: n + 1}, () => Array(m + 1).fill(false));\n    for (let i = 0; i <= n; i++) {\n        for (let j = 0; j <= m; j++) {\n            if (i === 0 && j === 0) dp[i][j] = true;\n            else if (i === 0) dp[i][j] = dp[i][j-1] && B[j-1] === C[i+j-1];\n            else if (j === 0) dp[i][j] = dp[i-1][j] && A[i-1] === C[i+j-1];\n            else dp[i][j] = (dp[i-1][j] && A[i-1] === C[i+j-1]) || (dp[i][j-1] && B[j-1] === C[i+j-1]);\n        }\n    }\n    return dp[n][m];\n}`
    },
    testCases: [
      { input: "aabcc|dbbca|aadbbcbcac", expected: "true" },
      { input: "aabcc|dbbca|aadbbbaccc", expected: "false" },
      { input: "XY|WZ|XWYZ", expected: "true" },
      { input: "YX|WZ|XWYZ", expected: "false" }
    ],
    jsTestCall: `(function(inp){ const [a, b, c] = inp.split('|'); return String(isInterleave(a, b, c)); })(__INPUT__)`
  },

  

  {
    id: 27,
    title: "Rank the permutation",
    difficulty: "Hard",
    accuracy: "35.2%",
    submissions: "45K+",
    companies: ["Microsoft", "Google"],
    pattern: "Factorial Number System",
    realWorld: "Used in cryptography and generating unique IDs for sequence permutations in database indexing.",
    description: `Given a string <strong>s</strong> with <strong>no repeating characters</strong>, find its rank among all its permutations when sorted lexicographically. Return the rank modulo 1000003.`,
    examples: [
      { input: 's = "abc"', output: '1', explain: 'Permutations: abc, acb, bac, bca, cab, cba. "abc" is rank 1.' },
      { input: 's = "acb"', output: '2', explain: '"acb" is the 2nd lexicographical permutation.' }
    ],
    constraints: ['1 ≤ s.length ≤ 15'],
    hint: `For each character, count how many characters smaller than it are to its right. Multiply this count by <code>(remaining_length)!</code> and sum these up.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findRank(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().findRank(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int findRank(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(findRank(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def findRank(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().findRank(input()))`,
      javascript: `function findRank(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int findRank(string s) {\n    int n = s.length();\n    long long MOD = 1000003, rank = 1;\n    vector<long long> fact(n + 1, 1);\n    for (int i = 1; i <= n; i++) fact[i] = (fact[i-1] * i) % MOD;\n    for (int i = 0; i < n; i++) {\n        int count = 0;\n        for (int j = i + 1; j < n; j++) if (s[j] < s[i]) count++;\n        rank = (rank + count * fact[n - i - 1]) % MOD;\n    }\n    return rank;\n}`,
      java: `public static int findRank(String s) {\n    int n = s.length();\n    long MOD = 1000003, rank = 1;\n    long[] fact = new long[n + 1];\n    fact[0] = 1;\n    for (int i = 1; i <= n; i++) fact[i] = (fact[i-1] * i) % MOD;\n    for (int i = 0; i < n; i++) {\n        int count = 0;\n        for (int j = i + 1; j < n; j++) if (s.charAt(j) < s.charAt(i)) count++;\n        rank = (rank + count * fact[n - i - 1]) % MOD;\n    }\n    return (int)rank;\n}`,
      python: `def findRank(self, s):\n    n, MOD, rank = len(s), 1000003, 1\n    fact = [1] * (n + 1)\n    for i in range(2, n + 1): fact[i] = (fact[i-1] * i) % MOD\n    for i in range(n):\n        smaller = 0\n        for j in range(i + 1, n):\n            if s[j] < s[i]: smaller += 1\n        rank = (rank + smaller * fact[n - 1 - i]) % MOD\n    return rank`,
      javascript: `function findRank(s) {\n    const n = s.length, MOD = 1000003;\n    let rank = 1;\n    const fact = Array(n + 1).fill(1);\n    for (let i = 2; i <= n; i++) fact[i] = (fact[i-1] * i) % MOD;\n    for (let i = 0; i < n; i++) {\n        let count = 0;\n        for (let j = i + 1; j < n; j++) if (s[j] < s[i]) count++;\n        rank = (rank + count * fact[n - 1 - i]) % MOD;\n    }\n    return rank;\n}`
    },
    testCases: [
      { input: "abc", expected: "1" },
      { input: "acb", expected: "2" },
      { input: "view", expected: "15" },
      { input: "string", expected: "598" }
    ],
    jsTestCall: `(function(s){ return String(findRank(s)); })(__INPUT__)`
  },

  {
    id: 28,
    title: "A Special Keyboard",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "30K+",
    companies: ["Amazon"],
    pattern: "Hash Map / Array Indexing",
    realWorld: "Used in accessibility software and eye-tracking interfaces to calculate the 'travel time' of focus between virtual keys.",
    description: `Given a string <strong>keyboard</strong> of length 26 and a target string <strong>s</strong>, find the total time taken to type <strong>s</strong>. The time taken to move from character <code>a</code> to <code>b</code> is <code>|index(a) - index(b)|</code>. Initial position is index 0.`,
    examples: [
      { input: 'keyboard = "abcdefghijklmnopqrstuvwxyz", s = "cba"', output: '4', explain: 'Start at 0. Move to "c" (idx 2): 2 units. Move to "b" (idx 1): |2-1|=1. Move to "a" (idx 0): |1-0|=1. Total = 2+1+1 = 4.' }
    ],
    constraints: ['keyboard.length = 26', '1 ≤ s.length ≤ 10⁵'],
    hint: `Pre-store the index of each character in an array of size 26. Iterate through the target string and keep track of the current position.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <cmath>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findTime(string keyboard, string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string k, s;\n    cin >> k >> s;\n    cout << Solution().findTime(k, s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int findTime(String keyboard, String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(findTime(sc.next(), sc.next()));\n    }\n}`,
      python: `class Solution:\n    def findTime(self, keyboard: str, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    k = input(); s = input()\n    print(Solution().findTime(k, s))`,
      javascript: `function findTime(keyboard, s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int findTime(string keyboard, string s) {\n    vector<int> pos(26);\n    for (int i = 0; i < 26; i++) pos[keyboard[i] - 'a'] = i;\n    int time = 0, curr = 0;\n    for (char c : s) {\n        time += abs(pos[c - 'a'] - curr);\n        curr = pos[c - 'a'];\n    }\n    return time;\n}`,
      java: `public static int findTime(String keyboard, String s) {\n    int[] pos = new int[26];\n    for(int i=0; i<26; i++) pos[keyboard.charAt(i) - 'a'] = i;\n    int time = 0, curr = 0;\n    for(char c : s.toCharArray()) {\n        time += Math.abs(pos[c - 'a'] - curr);\n        curr = pos[c - 'a'];\n    }\n    return time;\n}`,
      python: `def findTime(self, keyboard, s):\n    pos = {char: i for i, char in enumerate(keyboard)}\n    time, curr = 0, 0\n    for char in s:\n        time += abs(pos[char] - curr)\n        curr = pos[char]\n    return time`,
      javascript: `function findTime(keyboard, s) {\n    const pos = {};\n    for (let i = 0; i < 26; i++) pos[keyboard[i]] = i;\n    let time = 0, curr = 0;\n    for (let char of s) {\n        time += Math.abs(pos[char] - curr);\n        curr = pos[char];\n    }\n    return time;\n}`
    },
    testCases: [
      { input: "abcdefghijklmnopqrstuvwxyz|cba", expected: "4" },
      { input: "zyxwvutsrqponmlkjihgfedcba|abc", expected: "50" },
      { input: "abcdefghijklmnopqrstuvwxyz|a", expected: "0" },
      { input: "abcdefghijklmnopqrstuvwxyz|zzz", expected: "25" }
    ],
    jsTestCall: `(function(inp){ const [k, s] = inp.split('|'); return findTime(k, s); })(__INPUT__)`
  },

{
    id: 29,
    title: "Repeatedly Remove Duplicates",
    difficulty: "Medium",
    accuracy: "45.2%",
    submissions: "90K+",
    companies: ["Microsoft", "Google", "Amazon"],
    pattern: "Stack / Recursion",
    realWorld: "Used in text processing and compiler design to simplify expressions or remove redundant command sequences.",
    description: `Given a string <strong>s</strong>, recursively remove adjacent duplicate characters until no more adjacent duplicates are left.`,
    examples: [
      { input: 's = "geeksforgeek"', output: '"gksforgk"', explain: 'First "ee" is removed, then the resulting adjacent characters are checked.' },
      { input: 's = "acaaabbbacdddd"', output: '"acac"', explain: 'Consecutive "aaa", "bbb", and "dddd" are removed.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵'],
    hint: `Use a stack to keep track of characters. If the current character is the same as the top of the stack and is part of a duplicate group, don't add it and remove the top.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string removeDuplicates(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s;\n    cin >> s;\n    cout << Solution().removeDuplicates(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String removeDuplicates(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(removeDuplicates(s));\n    }\n}`,
      python: `class Solution:\n    def removeDuplicates(self, s: str) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = input()\n    print(Solution().removeDuplicates(s))`,
      javascript: `function removeDuplicates(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string removeDuplicates(string s) {\n    string res = "";\n    for (char c : s) {\n        if (!res.empty() && res.back() == c) res.pop_back();\n        else res.push_back(c);\n    }\n    return res;\n}`,
      java: `public static String removeDuplicates(String s) {\n    StringBuilder sb = new StringBuilder();\n    for (char c : s.toCharArray()) {\n        if (sb.length() > 0 && sb.charAt(sb.length() - 1) == c) {\n            sb.deleteCharAt(sb.length() - 1);\n        } else {\n            sb.append(c);\n        }\n    }\n    return sb.toString();\n}`,
      python: `def removeDuplicates(self, s: str) -> str:\n    stack = []\n    for char in s:\n        if stack and stack[-1] == char:\n            stack.pop()\n        else:\n            stack.append(char)\n    return "".join(stack)`,
      javascript: `function removeDuplicates(s) {\n    let stack = [];\n    for (let char of s) {\n        if (stack.length > 0 && stack[stack.length - 1] === char) {\n            stack.pop();\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.join("");\n}`
    },
    testCases: [
      { input: "abbaca", expected: "ca" },
      { input: "azxxzy", expected: "ay" },
      { input: "geeksforgeeks", expected: "gksforgks" },
      { input: "aaaaaaaa", expected: "" }
    ],
    jsTestCall: `(function(s){ return removeDuplicates(s); })(__INPUT__)`
  },

  {
    id: 30,
    title: "Multiply Two Strings",
    difficulty: "Medium",
    accuracy: "32.8%",
    submissions: "120K+",
    companies: ["Amazon", "Microsoft", "Google", "Adobe"],
    pattern: "Math / Simulation",
    realWorld: "Used in BigInt libraries and high-precision scientific computing where numbers exceed standard 64-bit limits.",
    description: `Given two numbers as strings <strong>s1</strong> and <strong>s2</strong>, return their product as a string. Handling negative signs is required.`,
    examples: [
      { input: 's1 = "11", s2 = "10"', output: '"110"', explain: '11 * 10 = 110.' },
      { input: 's1 = "-5", s2 = "10"', output: '"-50"', explain: 'Product of negative and positive is negative.' }
    ],
    constraints: ['1 ≤ s1.length, s2.length ≤ 10³'],
    hint: `Simulate long multiplication. Use an array to store intermediate products at each position <code>i + j</code>.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string multiplyStrings(string s1, string s2) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s1, s2;\n    cin >> s1 >> s2;\n    cout << Solution().multiplyStrings(s1, s2) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static String multiplyStrings(String s1, String s2) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(multiplyStrings(sc.next(), sc.next()));\n    }\n}`,
      python: `class Solution:\n    def multiplyStrings(self, s1: str, s2: str) -> str:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s1 = input(); s2 = input()\n    print(Solution().multiplyStrings(s1, s2))`,
      javascript: `function multiplyStrings(s1, s2) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `string multiplyStrings(string s1, string s2) {\n    bool neg = (s1[0] == '-') ^ (s2[0] == '-');\n    if (s1[0] == '-') s1 = s1.substr(1);\n    if (s2[0] == '-') s2 = s2.substr(1);\n    int n = s1.size(), m = s2.size();\n    vector<int> res(n + m, 0);\n    for (int i = n - 1; i >= 0; i--) {\n        for (int j = m - 1; j >= 0; j--) {\n            res[i + j + 1] += (s1[i] - '0') * (s2[j] - '0');\n            res[i + j] += res[i + j + 1] / 10;\n            res[i + j + 1] %= 10;\n        }\n    }\n    string s = "";\n    int i = 0;\n    while (i < res.size() && res[i] == 0) i++;\n    while (i < res.size()) s += to_string(res[i++]);\n    if (s == "") return "0";\n    if (neg) s = "-" + s;\n    return s;\n}`,
      java: `public static String multiplyStrings(String s1, String s2) {\n    boolean neg = (s1.charAt(0) == '-') ^ (s2.charAt(0) == '-');\n    if (s1.charAt(0) == '-') s1 = s1.substring(1);\n    if (s2.charAt(0) == '-') s2 = s2.substring(1);\n    int n = s1.length(), m = s2.length();\n    int[] res = new int[n + m];\n    for (int i = n - 1; i >= 0; i--) {\n        for (int j = m - 1; j >= 0; j--) {\n            int mul = (s1.charAt(i) - '0') * (s2.charAt(j) - '0');\n            int p1 = i + j, p2 = i + j + 1;\n            int sum = mul + res[p2];\n            res[p2] = sum % 10;\n            res[p1] += sum / 10;\n        }\n    }\n    StringBuilder sb = new StringBuilder();\n    for (int p : res) if (!(sb.length() == 0 && p == 0)) sb.append(p);\n    if (sb.length() == 0) return "0";\n    if (neg) sb.insert(0, "-");\n    return sb.toString();\n}`,
      python: `def multiplyStrings(self, s1: str, s2: str) -> str:\n    neg = (s1[0] == '-') ^ (s2[0] == '-')\n    s1, s2 = s1.lstrip('-'), s2.lstrip('-')\n    res = [0] * (len(s1) + len(s2))\n    for i in range(len(s1)-1, -1, -1):\n        for j in range(len(s2)-1, -1, -1):\n            res[i+j+1] += int(s1[i]) * int(s2[j])\n            res[i+j] += res[i+j+1] // 10\n            res[i+j+1] %= 10\n    ans = "".join(map(str, res)).lstrip('0')\n    if not ans: return "0"\n    return "-" + ans if neg else ans`,
      javascript: `function multiplyStrings(s1, s2) {\n    let neg = (s1[0] === '-') ^ (s2[0] === '-');\n    s1 = s1.replace('-', ''); s2 = s2.replace('-', '');\n    let res = Array(s1.length + s2.length).fill(0);\n    for (let i = s1.length - 1; i >= 0; i--) {\n        for (let j = s2.length - 1; j >= 0; j--) {\n            let mul = Number(s1[i]) * Number(s2[j]);\n            let sum = mul + res[i + j + 1];\n            res[i + j + 1] = sum % 10;\n            res[i + j] += Math.floor(sum / 10);\n        }\n    }\n    let ans = res.join('').replace(/^0+/, '');\n    if (!ans) return "0";\n    return neg ? "-" + ans : ans;\n}`
    },
    testCases: [
      { input: "123|456", expected: "56088" },
      { input: "-10|10", expected: "-100" },
      { input: "0|999", expected: "0" },
      { input: "12|12", expected: "144" }
    ],
    jsTestCall: `(function(inp){ const [s1, s2] = inp.split('|'); return multiplyStrings(s1, s2); })(__INPUT__)`
  },

  

  {
    id: 31,
    title: "Search Pattern (KMP-Algorithm)",
    difficulty: "Medium",
    accuracy: "48.5%",
    submissions: "100K+",
    companies: ["Microsoft", "Google", "Amazon"],
    pattern: "Knuth-Morris-Pratt (LPS Array)",
    realWorld: "Used in the 'find' feature of text editors and within DNA sequence matching where backtracking is inefficient.",
    description: `Given a text <strong>txt</strong> and a pattern <strong>pat</strong>, find all occurrences of <strong>pat</strong> in <strong>txt</strong>. Return the 1-based indices of each occurrence.`,
    examples: [
      { input: 'txt = "abcab", pat = "ab"', output: '[1, 4]', explain: '"ab" occurs starting at index 1 and index 4.' }
    ],
    constraints: ['1 ≤ txt.length, pat.length ≤ 10⁶'],
    hint: `Construct the Longest Prefix Suffix (LPS) array to avoid re-scanning characters when a mismatch occurs.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> search(string pat, string txt) {\n        // Your code here\n    }\n};\n\nint main() {\n    string txt, pat;\n    cin >> txt >> pat;\n    vector<int> res = Solution().search(pat, txt);\n    for (int x : res) cout << x << " ";\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static List<Integer> search(String pat, String txt) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String txt = sc.next();\n        String pat = sc.next();\n        List<Integer> res = search(pat, txt);\n        for (int x : res) System.out.print(x + " ");\n    }\n}`,
      python: `class Solution:\n    def search(self, pat: str, txt: str) -> list:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    txt = input(); pat = input()\n    print(*(Solution().search(pat, txt)))`,
      javascript: `function search(pat, txt) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `vector<int> search(string pat, string txt) {\n    int n = txt.length(), m = pat.length();\n    vector<int> lps(m, 0), res;\n    for (int i = 1, j = 0; i < m; ) {\n        if (pat[i] == pat[j]) lps[i++] = ++j;\n        else if (j > 0) j = lps[j - 1];\n        else lps[i++] = 0;\n    }\n    for (int i = 0, j = 0; i < n; ) {\n        if (txt[i] == pat[j]) { i++; j++; }\n        if (j == m) { res.push_back(i - m + 1); j = lps[j - 1]; }\n        else if (i < n && txt[i] != pat[j]) {\n            if (j > 0) j = lps[j - 1];\n            else i++;\n        }\n    }\n    return res;\n}`,
      java: `public static List<Integer> search(String pat, String txt) {\n    int n = txt.length(), m = pat.length();\n    int[] lps = new int[m];\n    List<Integer> res = new ArrayList<>();\n    for (int i = 1, j = 0; i < m; ) {\n        if (pat.charAt(i) == pat.charAt(j)) lps[i++] = ++j;\n        else if (j > 0) j = lps[j - 1];\n        else lps[i++] = 0;\n    }\n    for (int i = 0, j = 0; i < n; ) {\n        if (txt.charAt(i) == pat.charAt(j)) { i++; j++; }\n        if (j == m) { res.add(i - m + 1); j = lps[j - 1]; }\n        else if (i < n && txt.charAt(i) != pat.charAt(j)) {\n            if (j > 0) j = lps[j - 1];\n            else i++;\n        }\n    }\n    return res;\n}`,
      python: `def search(self, pat: str, txt: str) -> list:\n    n, m = len(txt), len(pat)\n    lps = [0] * m\n    j = 0\n    for i in range(1, m):\n        while j > 0 and pat[i] != pat[j]: j = lps[j-1]\n        if pat[i] == pat[j]: j += 1\n        lps[i] = j\n    res, j = [], 0\n    for i in range(n):\n        while j > 0 and txt[i] != pat[j]: j = lps[j-1]\n        if txt[i] == pat[j]: j += 1\n        if j == m:\n            res.append(i - m + 2)\n            j = lps[j-1]\n    return res`,
      javascript: `function search(pat, txt) {\n    let n = txt.length, m = pat.length, lps = Array(m).fill(0), res = [];\n    for (let i = 1, j = 0; i < m; ) {\n        if (pat[i] === pat[j]) lps[i++] = ++j;\n        else if (j > 0) j = lps[j - 1];\n        else lps[i++] = 0;\n    }\n    for (let i = 0, j = 0; i < n; ) {\n        if (txt[i] === pat[j]) { i++; j++; }\n        if (j === m) { res.push(j === m ? i - m + 1 : null); j = lps[j - 1]; }\n        else if (i < n && txt[i] !== pat[j]) {\n            if (j > 0) j = lps[j - 1];\n            else i++;\n        }\n    }\n    return res.filter(x => x !== null);\n}`
    },
    testCases: [
      { input: "ababa|aba", expected: "1 3" },
      { input: "aaaaa|aa", expected: "1 2 3 4" },
      { input: "abcde|fgh", expected: "" },
      { input: "geek|e", expected: "2 3" }
    ],
    jsTestCall: `(function(inp){ const [txt, pat] = inp.split('|'); return search(pat, txt).join(' '); })(__INPUT__)`
  },

  

  {
    id: 32,
    title: "Search Pattern (Rabin-Karp Algorithm)",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "75K+",
    companies: ["Cisco", "Amazon"],
    pattern: "Rolling Hash",
    realWorld: "Used in plagiarism detection and screen mirroring protocols to detect similar blocks of data efficiently.",
    description: `Implement the <strong>Rabin-Karp</strong> algorithm to find all occurrences of pattern <strong>pat</strong> in text <strong>txt</strong>. Return the 1-based indices.`,
    examples: [
      { input: 'txt = "abcabc", pat = "abc"', output: '[1, 4]', explain: '"abc" found starting at index 1 and index 4.' }
    ],
    constraints: ['1 ≤ txt.length, pat.length ≤ 10⁵'],
    hint: `Calculate a hash value for the pattern and for each window of text. Use a rolling hash to update the window hash in O(1).`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> search(string pat, string txt) {\n        // Your code here\n    }\n};\n\nint main() {\n    string txt, pat;\n    cin >> txt >> pat;\n    vector<int> res = Solution().search(pat, txt);\n    for (int x : res) cout << x << " ";\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static List<Integer> search(String pat, String txt) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String txt = sc.next();\n        String pat = sc.next();\n        List<Integer> res = search(pat, txt);\n        for (int x : res) System.out.print(x + " ");\n    }\n}`,
      python: `class Solution:\n    def search(self, pat: str, txt: str) -> list:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    txt = input(); pat = input()\n    print(*(Solution().search(pat, txt)))`,
      javascript: `function search(pat, txt) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `vector<int> search(string pat, string txt) {\n    int n = txt.size(), m = pat.size(), q = 101, d = 256, h = 1, p = 0, t = 0;\n    vector<int> res;\n    for (int i = 0; i < m - 1; i++) h = (h * d) % q;\n    for (int i = 0; i < m; i++) {\n        p = (d * p + pat[i]) % q;\n        t = (d * t + txt[i]) % q;\n    }\n    for (int i = 0; i <= n - m; i++) {\n        if (p == t) {\n            bool flag = true;\n            for (int j = 0; j < m; j++) if (txt[i + j] != pat[j]) flag = false;\n            if (flag) res.push_back(i + 1);\n        }\n        if (i < n - m) {\n            t = (d * (t - txt[i] * h) + txt[i + m]) % q;\n            if (t < 0) t = (t + q);\n        }\n    }\n    return res;\n}`,
      java: `public static List<Integer> search(String pat, String txt) {\n    int n = txt.length(), m = pat.length(), q = 101, d = 256, h = 1, p = 0, t = 0;\n    List<Integer> res = new ArrayList<>();\n    for (int i = 0; i < m - 1; i++) h = (h * d) % q;\n    for (int i = 0; i < m; i++) {\n        p = (d * p + pat.charAt(i)) % q;\n        t = (d * t + txt.charAt(i)) % q;\n    }\n    for (int i = 0; i <= n - m; i++) {\n        if (p == t) {\n            if (txt.substring(i, i + m).equals(pat)) res.add(i + 1);\n        }\n        if (i < n - m) {\n            t = (d * (t - txt.charAt(i) * h) + txt.charAt(i + m)) % q;\n            if (t < 0) t = (t + q);\n        }\n    }\n    return res;\n}`,
      python: `def search(self, pat: str, txt: str) -> list:\n    n, m, q, d, h, p, t = len(txt), len(pat), 101, 256, 1, 0, 0\n    res = []\n    for i in range(m - 1): h = (h * d) % q\n    for i in range(m):\n        p = (d * p + ord(pat[i])) % q\n        t = (d * t + ord(txt[i])) % q\n    for i in range(n - m + 1):\n        if p == t:\n            if txt[i:i+m] == pat: res.append(i + 1)\n        if i < n - m:\n            t = (d * (t - ord(txt[i]) * h) + ord(txt[i+m])) % q\n            if t < 0: t += q\n    return res`,
      javascript: `function search(pat, txt) {\n    let n = txt.length, m = pat.length, q = 101, d = 256, h = 1, p = 0, t = 0, res = [];\n    for (let i = 0; i < m - 1; i++) h = (h * d) % q;\n    for (let i = 0; i < m; i++) {\n        p = (d * p + pat.charCodeAt(i)) % q;\n        t = (d * t + txt.charCodeAt(i)) % q;\n    }\n    for (let i = 0; i <= n - m; i++) {\n        if (p === t) {\n            if (txt.substring(i, i + m) === pat) res.push(i + 1);\n        }\n        if (i < n - m) {\n            t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + m)) % q;\n            if (t < 0) t += q;\n        }\n    }\n    return res;\n}`
    },
    testCases: [
      { input: "batman|bat", expected: "1" },
      { input: "aaaaa|aa", expected: "1 2 3 4" },
      { input: "hello|world", expected: "" },
      { input: "abracadabra|abr", expected: "1 8" }
    ],
    jsTestCall: `(function(inp){ const [txt, pat] = inp.split('|'); return search(pat, txt).join(' '); })(__INPUT__)`
  },

  {
    id: 33,
    title: "Shortest Common Supersequence",
    difficulty: "Medium",
    accuracy: "54.2%",
    submissions: "65K+",
    companies: ["Microsoft", "Google"],
    pattern: "Dynamic Programming / LCS",
    realWorld: "Used in genome assembly where multiple DNA fragments are joined into a single representative sequence.",
    description: `Given two strings <strong>s1</strong> and <strong>s2</strong>, find the length of the <strong>Shortest Common Supersequence</strong>. This is a string that has both s1 and s2 as subsequences.`,
    examples: [
      { input: 's1 = "abcd", s2 = "xycd"', output: '6', explain: '"abxycd" is the shortest supersequence.' }
    ],
    constraints: ['1 ≤ s1.length, s2.length ≤ 500'],
    hint: `The length is <code>(len1 + len2) - LCS(s1, s2)</code>. Characters in the Longest Common Subsequence only need to be included once.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestCommonSupersequence(string s1, string s2) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s1, s2;\n    cin >> s1 >> s2;\n    cout << Solution().shortestCommonSupersequence(s1, s2) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int shortestCommonSupersequence(String s1, String s2) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(shortestCommonSupersequence(sc.next(), sc.next()));\n    }\n}`,
      python: `class Solution:\n    def shortestCommonSupersequence(self, s1: str, s2: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s1 = input(); s2 = input()\n    print(Solution().shortestCommonSupersequence(s1, s2))`,
      javascript: `function shortestCommonSupersequence(s1, s2) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int shortestCommonSupersequence(string s1, string s2) {\n    int n = s1.size(), m = s2.size();\n    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            if (s1[i-1] == s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return n + m - dp[n][m];\n}`,
      java: `public static int shortestCommonSupersequence(String s1, String s2) {\n    int n = s1.length(), m = s2.length();\n    int[][] dp = new int[n + 1][m + 1];\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            if (s1.charAt(i - 1) == s2.charAt(j - 1)) dp[i][j] = 1 + dp[i - 1][j - 1];\n            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n        }\n    }\n    return n + m - dp[n][m];\n}`,
      python: `def shortestCommonSupersequence(self, s1: str, s2: str) -> int:\n    n, m = len(s1), len(s2)\n    dp = [[0] * (m + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for j in range(1, m + 1):\n            if s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]\n            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return n + m - dp[n][m]`,
      javascript: `function shortestCommonSupersequence(s1, s2) {\n    let n = s1.length, m = s2.length;\n    let dp = Array.from({length: n + 1}, () => Array(m + 1).fill(0));\n    for (let i = 1; i <= n; i++) {\n        for (let j = 1; j <= m; j++) {\n            if (s1[i-1] === s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return n + m - dp[n][m];\n}`
    },
    testCases: [
      { input: "abcd|xycd", expected: "6" },
      { input: "efgh|jghi", expected: "6" },
      { input: "abc|abc", expected: "3" },
      { input: "a|b", expected: "2" }
    ],
    jsTestCall: `(function(inp){ const [s1, s2] = inp.split('|'); return shortestCommonSupersequence(s1, s2); })(__INPUT__)`
  },

  {
    id: 34,
    title: "Longest Valid Parenthesis",
    difficulty: "Hard",
    accuracy: "30.5%",
    submissions: "210K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Stack / Dynamic Programming",
    realWorld: "Used in code linters and IDEs to calculate the largest span of code that has syntactically correct nesting.",
    description: `Given a string <strong>s</strong> containing just the characters <code>'('</code> and <code>')'</code>, find the length of the longest valid (well-formed) parentheses substring.`,
    examples: [
      { input: 's = ")()())"', output: '4', explain: 'The longest valid substring is "()()".' }
    ],
    constraints: ['0 ≤ s.length ≤ 10⁵'],
    hint: `Push -1 onto a stack initially. For every '(', push its index. For every ')', pop and calculate length using the current index and the new top of the stack.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestValidParentheses(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().longestValidParentheses(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int longestValidParentheses(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNext() ? sc.next() : "";\n        System.out.println(longestValidParentheses(s));\n    }\n}`,
      python: `class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    s = input()\n    print(Solution().longestValidParentheses(s))`,
      javascript: `function longestValidParentheses(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int longestValidParentheses(string s) {\n    stack<int> st;\n    st.push(-1);\n    int maxL = 0;\n    for(int i=0; i<s.length(); i++) {\n        if(s[i] == '(') st.push(i);\n        else {\n            st.pop();\n            if(st.empty()) st.push(i);\n            else maxL = max(maxL, i - st.top());\n        }\n    }\n    return maxL;\n}`,
      java: `public static int longestValidParentheses(String s) {\n    Stack<Integer> st = new Stack<>();\n    st.push(-1);\n    int maxL = 0;\n    for(int i=0; i<s.length(); i++) {\n        if(s.charAt(i) == '(') st.push(i);\n        else {\n            st.pop();\n            if(st.isEmpty()) st.push(i);\n            else maxL = Math.max(maxL, i - st.peek());\n        }\n    }\n    return maxL;\n}`,
      python: `def longestValidParentheses(self, s: str) -> int:\n    stack = [-1]\n    max_l = 0\n    for i, char in enumerate(s):\n        if char == '(':\n            stack.append(i)\n        else:\n            stack.pop()\n            if not stack:\n                stack.append(i)\n            else:\n                max_l = max(max_l, i - stack[-1])\n    return max_l`,
      javascript: `function longestValidParentheses(s) {\n    let stack = [-1], maxL = 0;\n    for(let i=0; i<s.length; i++) {\n        if(s[i] === '(') stack.push(i);\n        else {\n            stack.pop();\n            if(stack.length === 0) stack.push(i);\n            else maxL = Math.max(maxL, i - stack[stack.length-1]);\n        }\n    }\n    return maxL;\n}`
    },
    testCases: [
      { input: "(()", expected: "2" },
      { input: ")()())", expected: "4" },
      { input: "()(()))))", expected: "6" },
      { input: "", expected: "0" }
    ],
    jsTestCall: `(function(s){ return longestValidParentheses(s); })(__INPUT__)`
  },

  

  {
    id: 35,
    title: "Longest Palindromic Subsequence",
    difficulty: "Medium",
    accuracy: "58.2%",
    submissions: "140K+",
    companies: ["Amazon", "LinkedIn", "Google"],
    pattern: "Dynamic Programming (Interval)",
    realWorld: "Used in bioinformatics to find the most stable folding structure of an RNA sequence by identifying matching base pairs.",
    description: `Given a string <strong>s</strong>, find the length of the longest palindromic subsequence in s.`,
    examples: [
      { input: 's = "bbbab"', output: '4', explain: 'One possible longest palindromic subsequence is "bbbb".' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000'],
    hint: `This is equivalent to finding the Longest Common Subsequence (LCS) between the string and its reverse.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestPalindromeSubseq(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().longestPalindromeSubseq(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int longestPalindromeSubseq(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(longestPalindromeSubseq(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def longestPalindromeSubseq(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().longestPalindromeSubseq(input()))`,
      javascript: `function longestPalindromeSubseq(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int longestPalindromeSubseq(string s) {\n    int n = s.size();\n    vector<vector<int>> dp(n, vector<int>(n));\n    for (int i = n - 1; i >= 0; i--) {\n        dp[i][i] = 1;\n        for (int j = i + 1; j < n; j++) {\n            if (s[i] == s[j]) dp[i][j] = dp[i+1][j-1] + 2;\n            else dp[i][j] = max(dp[i+1][j], dp[i][j-1]);\n        }\n    }\n    return dp[0][n-1];\n}`,
      java: `public static int longestPalindromeSubseq(String s) {\n    int n = s.length();\n    int[][] dp = new int[n][n];\n    for (int i = n - 1; i >= 0; i--) {\n        dp[i][i] = 1;\n        for (int j = i + 1; j < n; j++) {\n            if (s.charAt(i) == s.charAt(j)) dp[i][j] = dp[i+1][j-1] + 2;\n            else dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);\n        }\n    }\n    return dp[0][n-1];\n}`,
      python: `def longestPalindromeSubseq(self, s: str) -> int:\n    n = len(s)\n    dp = [[0]*n for _ in range(n)]\n    for i in range(n-1, -1, -1):\n        dp[i][i] = 1\n        for j in range(i+1, n):\n            if s[i] == s[j]: dp[i][j] = dp[i+1][j-1] + 2\n            else: dp[i][j] = max(dp[i+1][j], dp[i][j-1])\n    return dp[0][n-1]`,
      javascript: `function longestPalindromeSubseq(s) {\n    let n = s.length;\n    let dp = Array.from({length: n}, () => Array(n).fill(0));\n    for (let i = n - 1; i >= 0; i--) {\n        dp[i][i] = 1;\n        for (let j = i + 1; j < n; j++) {\n            if (s[i] === s[j]) dp[i][j] = dp[i+1][j-1] + 2;\n            else dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);\n        }\n    }\n    return dp[0][n-1];\n}`
    },
    testCases: [
      { input: "bbbab", expected: "4" },
      { input: "cbbd", expected: "2" },
      { input: "aaaaa", expected: "5" },
      { input: "abcde", expected: "1" }
    ],
    jsTestCall: `(function(s){ return longestPalindromeSubseq(s); })(__INPUT__)`
  },

  {
    id: 36,
    title: "Distinct Palindromic Substrings",
    difficulty: "Hard",
    accuracy: "45.1%",
    submissions: "35K+",
    companies: ["Google", "Facebook"],
    pattern: "Manacher's / Set + Expansion",
    realWorld: "Used in data deduplication and compressing palindromic patterns in genomic data.",
    description: `Given a string <strong>s</strong>, find the number of <strong>distinct</strong> palindromic substrings of s.`,
    examples: [
      { input: 's = "abaaa"', output: '5', explain: 'Distinct palindromes: "a", "b", "aa", "aaa", "aba".' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000'],
    hint: `Expand around each center (i and i, i+1) and store every palindrome found in a Set to handle duplicates.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <unordered_set>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countPalindromes(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().countPalindromes(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int countPalindromes(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(countPalindromes(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def countPalindromes(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().countPalindromes(input()))`,
      javascript: `function countPalindromes(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int countPalindromes(string s) {\n    unordered_set<string> res;\n    int n = s.length();\n    auto expand = [&](int l, int r) {\n        while(l >= 0 && r < n && s[l] == s[r]) {\n            res.insert(s.substr(l, r - l + 1));\n            l--; r++;\n        }\n    };\n    for(int i=0; i<n; i++) {\n        expand(i, i);\n        expand(i, i+1);\n    }\n    return res.size();\n}`,
      java: `public static int countPalindromes(String s) {\n    Set<String> set = new HashSet<>();\n    int n = s.length();\n    for(int i=0; i<n; i++) {\n        expand(s, i, i, set);\n        expand(s, i, i+1, set);\n    }\n    return set.size();\n}\nprivate static void expand(String s, int l, int r, Set<String> set) {\n    while(l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {\n        set.add(s.substring(l, r + 1));\n        l--; r++;\n    }\n}`,
      python: `def countPalindromes(self, s: str) -> int:\n    res = set()\n    n = len(s)\n    def expand(l, r):\n        while l >= 0 and r < n and s[l] == s[r]:\n            res.add(s[l:r+1])\n            l -= 1; r += 1\n    for i in range(n):\n        expand(i, i)\n        expand(i, i+1)\n    return len(res)`,
      javascript: `function countPalindromes(s) {\n    let res = new Set();\n    const n = s.length;\n    function expand(l, r) {\n        while(l >= 0 && r < n && s[l] === s[r]) {\n            res.add(s.substring(l, r + 1));\n            l--; r++;\n        }\n    }\n    for(let i=0; i<n; i++) {\n        expand(i, i);\n        expand(i, i+1);\n    }\n    return res.size;\n}`
    },
    testCases: [
      { input: "abaaa", expected: "5" },
      { input: "abc", expected: "3" },
      { input: "aaaa", expected: "4" },
      { input: "racecar", expected: "7" }
    ],
    jsTestCall: `(function(s){ return countPalindromes(s); })(__INPUT__)`
  },

  

  {
    id: 37,
    title: "Number of Distinct Subsequences",
    difficulty: "Hard",
    accuracy: "34.8%",
    submissions: "60K+",
    companies: ["Amazon", "Google"],
    pattern: "Dynamic Programming",
    realWorld: "Used in calculating possibilities in combinatorics and genetic variation analysis where duplicate subsequences represent redundant information.",
    description: `Given a string <strong>s</strong>, find the number of <strong>distinct subsequences</strong> of the string. Return the answer modulo 10⁹ + 7.`,
    examples: [
      { input: 's = "abc"', output: '8', explain: '"", "a", "b", "c", "ab", "ac", "bc", "abc".' },
      { input: 's = "aba"', output: '7', explain: '"", "a", "b", "ab", "aa", "ba", "aba" (one "a" is duplicate).' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵'],
    hint: `<code>dp[i] = 2 * dp[i-1]</code>. If the character was seen before at index <code>j</code>, subtract <code>dp[j-1]</code> to remove duplicates.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int distinctSubsequences(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().distinctSubsequences(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int distinctSubsequences(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(distinctSubsequences(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def distinctSubsequences(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().distinctSubsequences(input()))`,
      javascript: `function distinctSubsequences(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int distinctSubsequences(string s) {\n    int n = s.length(), mod = 1e9 + 7;\n    vector<long long> dp(n + 1);\n    dp[0] = 1;\n    vector<int> last(256, -1);\n    for(int i=1; i<=n; i++) {\n        dp[i] = (2 * dp[i-1]) % mod;\n        if(last[s[i-1]] != -1) {\n            dp[i] = (dp[i] - dp[last[s[i-1]]] + mod) % mod;\n        }\n        last[s[i-1]] = i - 1;\n    }\n    return dp[n];\n}`,
      java: `public static int distinctSubsequences(String s) {\n    int n = s.length(), mod = 1000000007;\n    long[] dp = new long[n + 1];\n    dp[0] = 1;\n    int[] last = new int[256];\n    Arrays.fill(last, -1);\n    for(int i=1; i<=n; i++) {\n        dp[i] = (2 * dp[i-1]) % mod;\n        char c = s.charAt(i-1);\n        if(last[c] != -1) {\n            dp[i] = (dp[i] - dp[last[c]] + mod) % mod;\n        }\n        last[c] = i - 1;\n    }\n    return (int)dp[n];\n}`,
      python: `def distinctSubsequences(self, s: str) -> int:\n    mod = 10**9 + 7\n    n = len(s)\n    dp = [0] * (n + 1)\n    dp[0] = 1\n    last = {}\n    for i in range(1, n + 1):\n        char = s[i-1]\n        dp[i] = (2 * dp[i-1]) % mod\n        if char in last:\n            dp[i] = (dp[i] - dp[last[char]]) % mod\n        last[char] = i - 1\n    return dp[n] % mod`,
      javascript: `function distinctSubsequences(s) {\n    const mod = 1e9 + 7;\n    const n = s.length;\n    let dp = Array(n + 1).fill(0n);\n    dp[0] = 1n;\n    let last = new Map();\n    for(let i=1; i<=n; i++) {\n        let char = s[i-1];\n        dp[i] = (2n * dp[i-1]) % BigInt(mod);\n        if(last.has(char)) {\n            dp[i] = (dp[i] - dp[last.get(char)] + BigInt(mod)) % BigInt(mod);\n        }\n        last.set(char, i - 1);\n    }\n    return Number(dp[n]);\n}`
    },
    testCases: [
      { input: "abc", expected: "8" },
      { input: "aba", expected: "7" },
      { input: "aaa", expected: "4" },
      { input: "gfg", expected: "7" }
    ],
    jsTestCall: `(function(s){ return distinctSubsequences(s); })(__INPUT__)`
  },

  {
    id: 38,
    title: "Print Anagrams Together",
    difficulty: "Medium",
    accuracy: "65.4%",
    submissions: "120K+",
    companies: ["Amazon", "Google", "Flipkart", "Goldman Sachs"],
    pattern: "Hash Map + Sorting/Frequency Array",
    realWorld: "Used in search engines for 'Did you mean?' suggestions and in library management systems to group similar titles.",
    description: `Given an array of strings, group the anagrams together. Two words are anagrams if they contain the same characters with the same frequencies.`,
    examples: [
      { input: 'words = ["act","dog","cat","god","tac"]', output: '[["act","cat","tac"], ["dog","god"]]', explain: 'Words with same character sets are grouped together.' }
    ],
    constraints: ['1 ≤ N ≤ 10⁴', '1 ≤ length of word ≤ 100'],
    hint: `Sort each string alphabetically to use as a key in a Hash Map. The values in the map will be lists of the original strings.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> Anagrams(vector<string>& string_list) {\n        // Your code here\n    }\n};\n\nint main() {\n    int n; cin >> n;\n    vector<string> s(n); for(int i=0; i<n; i++) cin >> s[i];\n    vector<vector<string>> result = Solution().Anagrams(s);\n    for(auto group : result) {\n        for(auto word : group) cout << word << " ";\n        cout << endl;\n    }\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static List<List<String>> Anagrams(String[] string_list) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        String[] s = new String[n];\n        for(int i=0; i<n; i++) s[i] = sc.next();\n        System.out.println(Anagrams(s));\n    }\n}`,
      python: `class Solution:\n    def Anagrams(self, string_list):\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    words = input().split()\n    print(Solution().Anagrams(words))`,
      javascript: `function Anagrams(string_list) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `vector<vector<string>> Anagrams(vector<string>& string_list) {\n    unordered_map<string, vector<string>> mp;\n    for(string s : string_list) {\n        string temp = s;\n        sort(temp.begin(), temp.end());\n        mp[temp].push_back(s);\n    }\n    vector<vector<string>> result;\n    for(auto it : mp) result.push_back(it.second);\n    return result;\n}`,
      java: `public static List<List<String>> Anagrams(String[] string_list) {\n    Map<String, List<String>> map = new HashMap<>();\n    for(String s : string_list) {\n        char[] chars = s.toCharArray();\n        Arrays.sort(chars);\n        String key = new String(chars);\n        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n    }\n    return new ArrayList<>(map.values());\n}`,
      python: `def Anagrams(self, string_list):\n    d = {}\n    for s in string_list:\n        key = "".join(sorted(s))\n        if key in d: d[key].append(s)\n        else: d[key] = [s]\n    return list(d.values())`,
      javascript: `function Anagrams(string_list) {\n    let map = new Map();\n    for (let s of string_list) {\n        let key = s.split('').sort().join('');\n        if (!map.has(key)) map.set(key, []);\n        map.get(key).push(s);\n    }\n    return Array.from(map.values());\n}`
    },
    testCases: [
      { input: "act dog cat god tac", expected: "[['act', 'cat', 'tac'], ['dog', 'god']]" },
      { input: "no on is si", expected: "[['no', 'on'], ['is', 'si']]" },
      { input: "listen silent enlist", expected: "[['listen', 'silent', 'enlist']]" },
      { input: "abc def", expected: "[['abc'], ['def']]" }
    ],
    jsTestCall: `Anagrams(__INPUT__.split(' '))`
  },

  

  {
    id: 39,
    title: "Palindrome Substring Queries",
    difficulty: "Medium",
    accuracy: "42.3%",
    submissions: "25K+",
    companies: ["Google", "Directi"],
    pattern: "Pre-processing (DP Matrix)",
    realWorld: "Used in text analysis tools where users frequently check if specific segments of a massive text (like DNA or logs) are symmetric.",
    description: `Given a string <strong>s</strong> and <strong>Q</strong> queries, each query consists of a range <code>[L, R]</code>. For each query, determine if the substring <code>s[L...R]</code> is a palindrome.`,
    examples: [
      { input: 's = "abaaaba", queries = [[0, 2], [1, 3]]', output: '[true, false]', explain: '"aba" is a palindrome, "baaa" is not.' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000', '1 ≤ Q ≤ 10⁵'],
    hint: `Pre-compute a 2D boolean DP table where <code>dp[i][j]</code> is true if <code>s[i...j]</code> is a palindrome. This allows O(1) query response.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    string s; int q; cin >> s >> q;\n    // Precompute and handle queries\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int q = sc.nextInt();\n        // Precompute and handle queries\n    }\n}`,
      python: `if __name__ == "__main__":\n    s = input()\n    q = int(input())\n    # Precompute and handle queries`,
      javascript: `function solveQueries(s, queries) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `// Inside main after precomputation\nvector<vector<bool>> dp(n, vector<bool>(n, false));\nfor(int i=n-1; i>=0; i--) {\n    for(int j=i; j<n; j++) {\n        if(i == j) dp[i][j] = true;\n        else if(s[i] == s[j]) dp[i][j] = (j-i == 1) ? true : dp[i+1][j-1];\n    }\n}`,
      java: `boolean[][] dp = new boolean[n][n];\nfor(int i=n-1; i>=0; i--) {\n    for(int j=i; j<n; j++) {\n        if(i == j) dp[i][j] = true;\n        else if(s.charAt(i) == s.charAt(j)) dp[i][j] = (j-i == 1) || dp[i+1][j-1];\n    }\n}`,
      python: `dp = [[False]*n for _ in range(n)]\nfor i in range(n-1, -1, -1):\n    for j in range(i, n):\n        if i == j: dp[i][j] = True\n        elif s[i] == s[j]: dp[i][j] = True if j-i==1 else dp[i+1][j-1]`,
      javascript: `let dp = Array.from({length: n}, () => Array(n).fill(false));\nfor(let i=n-1; i>=0; i--) {\n    for(let j=i; j<n; j++) {\n        if(i === j) dp[i][j] = true;\n        else if(s[i] === s[j]) dp[i][j] = (j-i === 1) || dp[i+1][j-1];\n    }\n}`
    },
    testCases: [
      { input: "abaaaba|[0,2],[1,3]", expected: "true false" },
      { input: "aaa|[0,1],[0,2]", expected: "true true" },
      { input: "abc|[0,2]", expected: "false" },
      { input: "racecar|[0,6]", expected: "true" }
    ],
    jsTestCall: `(function(inp){ const [s, qStr] = inp.split('|'); const q = JSON.parse("[" + qStr + "]"); return solveQueries(s, q); })(__INPUT__)`
  },

  {
    id: 40,
    title: "Count number of substrings",
    difficulty: "Medium",
    accuracy: "38.5%",
    submissions: "45K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Sliding Window (K-at-most)",
    realWorld: "Used in stream processing to count occurrences of windowed events with specific variety of attributes.",
    description: `Given a string <strong>s</strong> and an integer <strong>k</strong>, count the number of substrings which have exactly <strong>k</strong> distinct characters.`,
    examples: [
      { input: 's = "aba", k = 2', output: '3', explain: 'Substrings: "ab", "ba", "aba" all have 2 distinct characters.' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', '1 ≤ k ≤ 26'],
    hint: `Calculate (count of substrings with at most k distinct characters) - (count of substrings with at most k-1 distinct characters).`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    long long countAtMost(string s, int k) {\n        // Helper\n    }\n    long long countExact(string s, int k) {\n        return countAtMost(s, k) - countAtMost(s, k-1);\n    }\n};\n\nint main() {\n    string s; int k;\n    cin >> s >> k;\n    cout << Solution().countExact(s, k) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static long countAtMost(String s, int k) {\n        // Helper\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int k = sc.nextInt();\n        System.out.println(countAtMost(s, k) - countAtMost(s, k-1));\n    }\n}`,
      python: `class Solution:\n    def countAtMost(self, s, k):\n        # Helper\n        pass\n\nif __name__ == "__main__":\n    s = input(); k = int(input())\n    sol = Solution()\n    print(sol.countAtMost(s, k) - sol.countAtMost(s, k-1))`,
      javascript: `function countAtMost(s, k) {\n    // Helper\n}`
    },
    solution: {
      cpp: `long long countAtMost(string s, int k) {\n    if(k < 0) return 0;\n    int n = s.size(), left = 0, distinct = 0;\n    vector<int> freq(26, 0);\n    long long count = 0;\n    for(int right = 0; right < n; right++) {\n        if(freq[s[right]-'a'] == 0) distinct++;\n        freq[s[right]-'a']++;\n        while(distinct > k) {\n            freq[s[left]-'a']--;\n            if(freq[s[left]-'a'] == 0) distinct--;\n            left++;\n        }\n        count += (right - left + 1);\n    }\n    return count;\n}`,
      java: `public static long countAtMost(String s, int k) {\n    if(k < 0) return 0;\n    int n = s.length(), left = 0, distinct = 0;\n    int[] freq = new int[26];\n    long count = 0;\n    for(int right = 0; right < n; right++) {\n        if(freq[s.charAt(right)-'a'] == 0) distinct++;\n        freq[s.charAt(right)-'a']++;\n        while(distinct > k) {\n            freq[s.charAt(left)-'a']--;\n            if(freq[s.charAt(left)-'a'] == 0) distinct--;\n            left++;\n        }\n        count += (right - left + 1);\n    }\n    return count;\n}`,
      python: `def countAtMost(self, s, k):\n    if k < 0: return 0\n    left, distinct, count = 0, 0, 0\n    freq = [0]*26\n    for right in range(len(s)):\n        idx = ord(s[right]) - ord('a')\n        if freq[idx] == 0: distinct += 1\n        freq[idx] += 1\n        while distinct > k:\n            l_idx = ord(s[left]) - ord('a')\n            freq[l_idx] -= 1\n            if freq[l_idx] == 0: distinct -= 1\n            left += 1\n        count += (right - left + 1)\n    return count`,
      javascript: `function countAtMost(s, k) {\n    if (k < 0) return 0;\n    let left = 0, distinct = 0, count = 0, freq = Array(26).fill(0);\n    for (let right = 0; right < s.length; right++) {\n        let rIdx = s.charCodeAt(right) - 97;\n        if (freq[rIdx] === 0) distinct++;\n        freq[rIdx]++;\n        while (distinct > k) {\n            let lIdx = s.charCodeAt(left) - 97;\n            freq[lIdx]--;\n            if (freq[lIdx] === 0) distinct--;\n            left++;\n        }\n        count += (right - left + 1);\n    }\n    return count;\n}`
    },
    testCases: [
      { input: "aba|2", expected: "3" },
      { input: "abaaca|1", expected: "7" },
      { input: "abc|3", expected: "1" },
      { input: "abc|2", expected: "2" }
    ],
    jsTestCall: `(function(inp){ const [s, k] = inp.split('|'); return countAtMost(s, Number(k)) - countAtMost(s, Number(k)-1); })(__INPUT__)`
  },

  {
    id: 41,
    title: "Minimum Deletions for Palindrome",
    difficulty: "Easy",
    accuracy: "62.1%",
    submissions: "50K+",
    companies: ["Amazon", "Google"],
    pattern: "Dynamic Programming (LCS Variation)",
    realWorld: "Used in data cleanup to find the smallest number of 'noisy' character errors to remove to restore a symmetric sequence.",
    description: `Given a string <strong>s</strong>, find the minimum number of characters to be deleted to make it a palindrome.`,
    examples: [
      { input: 's = "aebcbda"', output: '2', explain: 'Remove "e" and "d" to get "abcba".' }
    ],
    constraints: ['1 ≤ s.length ≤ 1000'],
    hint: `The result is <code>s.length - LongestPalindromicSubsequence(s)</code>.`,
    starterCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDeletions(string s) {\n        // Your code here\n    }\n};\n\nint main() {\n    string s; cin >> s;\n    cout << Solution().minDeletions(s) << endl;\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static int minDeletions(String s) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(minDeletions(sc.next()));\n    }\n}`,
      python: `class Solution:\n    def minDeletions(self, s: str) -> int:\n        # Your code here\n        pass\n\nif __name__ == "__main__":\n    print(Solution().minDeletions(input()))`,
      javascript: `function minDeletions(s) {\n    // Your code here\n}`
    },
    solution: {
      cpp: `int minDeletions(string s) {\n    int n = s.size();\n    string t = s; reverse(t.begin(), t.end());\n    vector<vector<int>> dp(n+1, vector<int>(n+1, 0));\n    for(int i=1; i<=n; i++) {\n        for(int j=1; j<=n; j++) {\n            if(s[i-1] == t[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return n - dp[n][n];\n}`,
      java: `public static int minDeletions(String s) {\n    int n = s.length();\n    String t = new StringBuilder(s).reverse().toString();\n    int[][] dp = new int[n+1][n+1];\n    for(int i=1; i<=n; i++) {\n        for(int j=1; j<=n; j++) {\n            if(s.charAt(i-1) == t.charAt(j-1)) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return n - dp[n][n];\n}`,
      python: `def minDeletions(self, s):\n    n = len(s)\n    t = s[::-1]\n    dp = [[0]*(n+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for j in range(1, n+1):\n            if s[i-1] == t[j-1]: dp[i][j] = 1 + dp[i-1][j-1]\n            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return n - dp[n][n]`,
      javascript: `function minDeletions(s) {\n    let n = s.length, t = s.split('').reverse().join('');\n    let dp = Array.from({length: n+1}, () => Array(n+1).fill(0));\n    for(let i=1; i<=n; i++) {\n        for(let j=1; j<=n; j++) {\n            if(s[i-1] === t[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return n - dp[n][n];\n}`
    },
    testCases: [
      { input: "aebcbda", expected: "2" },
      { input: "geeksforgeeks", expected: "8" },
      { input: "abc", expected: "2" },
      { input: "aaaaa", expected: "0" }
    ],
    jsTestCall: `minDeletions(__INPUT__)`
  }

];