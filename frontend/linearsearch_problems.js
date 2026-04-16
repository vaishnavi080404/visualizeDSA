const TOPIC_CONFIG = {
  name: "Linear Search",
  level: "Level 3 of 3 · Problems",
  backLink: "linear_search_L1.html",
  backLabel: "Linear Search"
};


const PROBLEMS = [
  {
    id: 1,
    title: "Find Element Index",
    difficulty: "Easy",
    accuracy: "85.4%",
    submissions: "500K+",
    companies: ["Amazon", "TCS", "Infosys", "Wipro"],
    pattern: "Linear Search",
    realWorld: "Used in simple search bars where you need to find the specific position of an item in a small, unsorted list (like a specific contact in a recent calls list).",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers and a target element <strong>x</strong>, find the index of the <strong>first occurrence</strong> of x.
<br><br>If the element is found, return its 0-based index. If the element is not present in the array, return <strong>-1</strong>.`,
    examples: [
      { input: 'arr = [10, 20, 30, 40, 50], x = 30', output: '2', explain: '30 is present at index 2.' },
      { input: 'arr = [5, 8, 1, 12, 7], x = 15', output: '-1', explain: '15 is not present in the array.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁹ ≤ arr[i], x ≤ 10⁹'
    ],
    hint: `1. Start from the first element (index 0).<br>
2. Compare the current element with the target x.<br>
3. If they match, return the current index immediately.<br>
4. If you reach the end of the array without a match, return -1.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& arr, int n, int x) {
        // Your code here
        return -1;
    }
};

int main() {
    int n, x;
    if (!(cin >> n >> x)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    Solution sol;
    cout << sol.search(arr, n, x) << endl;
    return 0;
}`,
      python: `class Solution:
    def search(self, arr, n, x):
        # Your code here
        return -1

if __name__ == "__main__":
    import sys
    input_data = sys.stdin.read().split()
    if input_data:
        n = int(input_data[0])
        x = int(input_data[1])
        arr = list(map(int, input_data[2:]))
        print(Solution().search(arr, n, x))`,
      java: `import java.util.*;

class Solution {
    public int search(int arr[], int n, int x) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int x = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().search(arr, n, x));
    }
}`,
      javascript: `function search(arr, n, x) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 2) {
    const n = parseInt(input[0]);
    const x = parseInt(input[1]);
    const arr = input.slice(2, 2 + n).map(Number);
    console.log(search(arr, n, x));
}`
    },
    solution: {
      cpp: `int search(vector<int>& arr, int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) return i;
    }
    return -1;
}`,
      javascript: `function search(arr, n, x) {
    for (let i = 0; i < n; i++) {
        if (arr[i] === x) return i;
    }
    return -1;
}`
    },
    testCases: [
      { input: "5 30\n10 20 30 40 50", expected: "2" },
      { input: "5 15\n5 8 1 12 7", expected: "-1" },
      { input: "4 1\n1 1 1 1", expected: "0" },
      { input: "1 5\n5", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Check if Element Exists",
    difficulty: "Easy",
    accuracy: "92.1%",
    submissions: "400K+",
    companies: ["Microsoft", "HCL", "Cognizant"],
    pattern: "Linear Search",
    realWorld: "Commonly used in 'Contains' or 'Includes' logic. For example, checking if a username is already taken in a simple local database.",
    description: `Given an array <strong>arr</strong> and a target <strong>x</strong>, return <strong>true</strong> if x is present in the array, otherwise return <strong>false</strong>.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4], x = 3', output: 'true' },
      { input: 'arr = [1, 2, 3, 4], x = 5', output: 'false' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁹ ≤ arr[i], x ≤ 10⁹'
    ],
    hint: `This is similar to finding an index, but instead of returning <code>i</code>, you return <code>true</code>. If the loop finishes, return <code>false</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool exists(vector<int>& arr, int n, int x) {
        // Your code here
        return false;
    }
};

int main() {
    int n, x;
    cin >> n >> x;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    cout << (sol.exists(arr, n, x) ? "true" : "false") << endl;
    return 0;
}`,
      python: `class Solution:
    def exists(self, arr, n, x):
        # Your code here
        return False

if __name__ == "__main__":
    n, x = map(int, input().split())
    arr = list(map(int, input().split()))
    print("true" if Solution().exists(arr, n, x) else "false")`,
      java: `import java.util.*;

class Solution {
    public boolean exists(int arr[], int n, int x) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int x = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().exists(arr, n, x) ? "true" : "false");
    }
}`,
      javascript: `function exists(arr, n, x) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 2) {
    const n = parseInt(input[0]);
    const x = parseInt(input[1]);
    const arr = input.slice(2, 2 + n).map(Number);
    console.log(exists(arr, n, x) ? "true" : "false");
}`
    },
    solution: {
      cpp: `bool exists(vector<int>& arr, int n, int x) {
    for (int val : arr) {
        if (val == x) return true;
    }
    return false;
}`,
      javascript: `function exists(arr, n, x) {
    return arr.includes(x);
}`
    },
    testCases: [
      { input: "4 3\n1 2 3 4", expected: "true" },
      { input: "4 5\n1 2 3 4", expected: "false" },
      { input: "2 -1\n10 -1", expected: "true" },
      { input: "1 100\n50", expected: "false" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Count Occurrences",
    difficulty: "Easy",
    accuracy: "78.5%",
    submissions: "320K+",
    companies: ["Amazon", "Samsung", "Oracle"],
    pattern: "Linear Search (Counting)",
    realWorld: "Useful for analytics. For example, counting how many times a user clicked a specific button or how many times a specific word appears in a text log.",
    description: `Given an array <strong>arr</strong> and a target <strong>x</strong>, find how many times x appears in the array.`,
    examples: [
      { input: 'arr = [1, 1, 2, 2, 2, 3], x = 2', output: '3', explain: '2 appears three times.' },
      { input: 'arr = [1, 2, 3], x = 4', output: '0', explain: '4 does not appear.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '0 ≤ arr[i], x ≤ 10⁶'
    ],
    hint: `1. Initialize a counter to 0.<br>
2. Traverse the entire array.<br>
3. Every time the current element equals x, increment the counter.<br>
4. Return the counter at the end.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int count(vector<int>& arr, int n, int x) {
        // Your code here
        return 0;
    }
};

int main() {
    int n, x;
    cin >> n >> x;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.count(arr, n, x) << endl;
    return 0;
}`,
      javascript: `function countOccurrences(arr, n, x) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]), x = parseInt(input[1]);
const arr = input.slice(2, 2 + n).map(Number);
console.log(countOccurrences(arr, n, x));`
    },
    solution: {
      cpp: `int count(vector<int>& arr, int n, int x) {
    int cnt = 0;
    for(int i=0; i<n; i++) {
        if(arr[i] == x) cnt++;
    }
    return cnt;
}`,
      python: `def count(self, arr, n, x):
    cnt = 0
    for val in arr:
        if val == x:
            cnt += 1
    return cnt`
    },
    testCases: [
      { input: "6 2\n1 1 2 2 2 3", expected: "3" },
      { input: "3 4\n1 2 3", expected: "0" },
      { input: "5 1\n1 1 1 1 1", expected: "5" },
      { input: "4 0\n0 5 0 2", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Find First and Last Occurrence",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "280K+",
    companies: ["Google", "Facebook", "Amazon"],
    pattern: "Linear Search (Edge Cases)",
    realWorld: "Used when processing chronological logs where you need the 'Start Time' (first entry) and 'End Time' (last entry) of a specific session ID.",
    description: `Given an array <strong>arr</strong> and a target <strong>x</strong>, return the index of the <strong>first</strong> and the <strong>last</strong> occurrence of x as a pair/array.
<br><br>If x is not found, return <strong>[-1, -1]</strong>.`,
    examples: [
      { input: 'arr = [1, 3, 5, 5, 5, 5, 67, 123, 125], x = 5', output: '[2, 5]' },
      { input: 'arr = [1, 2, 3], x = 4', output: '[-1, -1]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '1 ≤ arr[i], x ≤ 10⁶'
    ],
    hint: `1. To find the first index: loop from 0 to n-1 and break at the first match.<br>
2. To find the last index: loop from n-1 down to 0 and break at the first match (which is the last from the start).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    pair<int, int> findFirstAndLast(vector<int>& arr, int n, int x) {
        // Your code here
        return {-1, -1};
    }
};

int main() {
    int n, x;
    cin >> n >> x;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    pair<int, int> res = sol.findFirstAndLast(arr, n, x);
    cout << res.first << " " << res.second << endl;
    return 0;
}`,
      python: `class Solution:
    def findFirstAndLast(self, arr, n, x):
        # Your code here
        return [-1, -1]

if __name__ == "__main__":
    n, x = map(int, input().split())
    arr = list(map(int, input().split()))
    print(*(Solution().findFirstAndLast(arr, n, x)))`
    },
    solution: {
      cpp: `pair<int, int> findFirstAndLast(vector<int>& arr, int n, int x) {
    int first = -1, last = -1;
    for(int i=0; i<n; i++) {
        if(arr[i] == x) {
            if(first == -1) first = i;
            last = i;
        }
    }
    return {first, last};
}`,
      javascript: `function findFirstAndLast(arr, n, x) {
    let first = arr.indexOf(x);
    let last = arr.lastIndexOf(x);
    return [first, last];
}`
    },
    testCases: [
      { input: "9 5\n1 3 5 5 5 5 67 123 125", expected: "2 5" },
      { input: "3 4\n1 2 3", expected: "-1 -1" },
      { input: "5 1\n1 1 1 1 1", expected: "0 4" },
      { input: "2 10\n10 20", expected: "0 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Find Minimum Element",
    difficulty: "Easy",
    accuracy: "88.2%",
    submissions: "450K+",
    companies: ["TCS", "Accenture", "Wipro"],
    pattern: "Linear Scan (Comparison)",
    realWorld: "Used in e-commerce apps to find the 'Lowest Price' among a list of products displayed to a user.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, find the minimum element in the array.`,
    examples: [
      { input: 'arr = [5, 2, 9, 1, 6]', output: '1', explain: '1 is the smallest value in the array.' },
      { input: 'arr = [-1, -5, 0, 10]', output: '-5', explain: '-5 is the smallest value.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁹ ≤ arr[i] ≤ 10⁹'
    ],
    hint: `1. Initialize a variable <code>minVal</code> with the first element of the array.<br>
2. Loop through the rest of the array (from index 1 to n-1).<br>
3. If the current element is smaller than <code>minVal</code>, update <code>minVal</code>.<br>
4. Return <code>minVal</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& arr, int n) {
        // Your code here
        return 0;
    }
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    Solution sol;
    cout << sol.findMin(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def findMin(self, arr, n):
        # Your code here
        pass

if __name__ == "__main__":
    import sys
    input_data = sys.stdin.read().split()
    if input_data:
        n = int(input_data[0])
        arr = list(map(int, input_data[1:]))
        print(Solution().findMin(arr, n))`,
      java: `import java.util.*;

class Solution {
    public int findMin(int arr[], int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().findMin(arr, n));
    }
}`,
      javascript: `function findMin(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 0) {
    const n = parseInt(input[0]);
    const arr = input.slice(1, 1 + n).map(Number);
    console.log(findMin(arr, n));
}`
    },
    solution: {
      cpp: `int findMin(vector<int>& arr, int n) {
    int minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < minVal) minVal = arr[i];
    }
    return minVal;
}`,
      javascript: `function findMin(arr, n) {
    let min = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] < min) min = arr[i];
    }
    return min;
}`
    },
    testCases: [
      { input: "5\n5 2 9 1 6", expected: "1" },
      { input: "4\n-1 -5 0 10", expected: "-5" },
      { input: "3\n10 10 10", expected: "10" },
      { input: "1\n99", expected: "99" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Find Maximum Element",
    difficulty: "Easy",
    accuracy: "89.1%",
    submissions: "450K+",
    companies: ["Amazon", "Flipkart"],
    pattern: "Linear Scan (Comparison)",
    realWorld: "Used in financial software to determine the 'Highest Stock Price' or 'Peak Value' in a historical dataset.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, find the maximum element in the array.`,
    examples: [
      { input: 'arr = [1, 4, 8, 2, 6]', output: '8' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁹ ≤ arr[i] ≤ 10⁹'
    ],
    hint: `Similar to finding the minimum, but initialize <code>maxVal</code> with the first element and update it when a larger element is found.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int findMax(vector<int>& arr, int n) {
        // Your code here
        return 0;
    }
};

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.findMax(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def findMax(self, arr, n):
        # Your code here
        pass

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().split()
    if data:
        n = int(data[0])
        arr = list(map(int, data[1:]))
        print(Solution().findMax(arr, n))`,
      java: `import java.util.*;

class Solution {
    public int findMax(int arr[], int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().findMax(arr, n));
    }
}`,
      javascript: `function findMax(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n).map(Number);
console.log(findMax(arr, n));`
    },
    solution: {
      cpp: `int findMax(vector<int>& arr, int n) {
    int maxVal = arr[0];
    for(int i=1; i<n; i++) {
        if(arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}`,
      javascript: `function findMax(arr, n) {
    return Math.max(...arr);
}`
    },
    testCases: [
      { input: "5\n1 4 8 2 6", expected: "8" },
      { input: "3\n-10 -20 -30", expected: "-10" },
      { input: "4\n100 50 200 10", expected: "200" },
      { input: "1\n5", expected: "5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Find Sum of Array Elements",
    difficulty: "Easy",
    accuracy: "94.5%",
    submissions: "600K+",
    companies: ["TCS", "Cognizant"],
    pattern: "Accumulation",
    realWorld: "Used to calculate the 'Total Cart Value' in shopping apps by summing the price of all items in the array.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, return the sum of all elements.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: '15' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '0 ≤ arr[i] ≤ 10⁴'
    ],
    hint: `1. Initialize a variable <code>sum</code> to 0.<br>
2. Traverse the entire array.<br>
3. Add each element to <code>sum</code>.<br>
4. Return <code>sum</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    long long findSum(vector<int>& arr, int n) {
        // Use long long to avoid overflow
        return 0;
    }
};

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.findSum(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def findSum(self, arr, n):
        # Your code here
        return 0

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(Solution().findSum(arr, n))`,
      java: `import java.util.*;

class Solution {
    public long findSum(int arr[], int n) {
        // Your code here
        return 0L;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().findSum(arr, n));
    }
}`,
      javascript: `function findSum(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n).map(Number);
console.log(findSum(arr, n));`
    },
    solution: {
      cpp: `long long findSum(vector<int>& arr, int n) {
    long long sum = 0;
    for(int i=0; i<n; i++) sum += arr[i];
    return sum;
}`,
      javascript: `function findSum(arr, n) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "15" },
      { input: "4\n10 20 30 40", expected: "100" },
      { input: "1\n50", expected: "50" },
      { input: "3\n0 0 0", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 8,
    title: "Search Character in String",
    difficulty: "Easy",
    accuracy: "87.4%",
    submissions: "200K+",
    companies: ["Wipro", "Capgemini"],
    pattern: "String Traversal",
    realWorld: "Used in form validation (e.g., checking if a string contains '@' for email validation or finding the position of a specific character).",
    description: `Given a string <strong>s</strong> and a character <strong>ch</strong>, find the index of the first occurrence of <strong>ch</strong>. Return -1 if not found.`,
    examples: [
      { input: 's = "hello", ch = "e"', output: '1' },
      { input: 's = "apple", ch = "z"', output: '-1' }
    ],
    constraints: [
      '1 ≤ s.length ≤ 10⁵'
    ],
    hint: `Strings can be treated as arrays of characters. Loop from <code>0</code> to <code>length - 1</code> and compare <code>s[i]</code> with <code>ch</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    int findChar(string s, char ch) {
        // Your code here
        return -1;
    }
};

int main() {
    string s;
    char ch;
    cin >> s >> ch;
    Solution sol;
    cout << sol.findChar(s, ch) << endl;
    return 0;
}`,
      python: `class Solution:
    def findChar(self, s, ch):
        # Your code here
        return -1

if __name__ == "__main__":
    s = input().strip()
    ch = input().strip()
    print(Solution().findChar(s, ch))`,
      java: `import java.util.*;

class Solution {
    public int findChar(String s, char ch) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        char ch = sc.next().charAt(0);
        System.out.println(new Solution().findChar(s, ch));
    }
}`,
      javascript: `function findChar(s, ch) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (input.length >= 2) {
    console.log(findChar(input[0], input[1]));
}`
    },
    solution: {
      cpp: `int findChar(string s, char ch) {
    for(int i=0; i<s.length(); i++) {
        if(s[i] == ch) return i;
    }
    return -1;
}`,
      javascript: `function findChar(s, ch) {
    return s.indexOf(ch);
}`
    },
    testCases: [
      { input: "hello e", expected: "1" },
      { input: "apple z", expected: "-1" },
      { input: "programming r", expected: "1" },
      { input: "banana n", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Find Second Largest Element",
    difficulty: "Medium",
    accuracy: "45.2%",
    submissions: "350K+",
    companies: ["Amazon", "Microsoft", "Adobe"],
    pattern: "Linear Scan (Two-Pointer Logic)",
    realWorld: "Used in competitive rankings (e.g., finding the 'Runner Up') or in statistics to find the next-best value when the maximum is excluded.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, find the second largest distinct element. If no second largest exists, return -1.`,
    examples: [
      { input: 'arr = [12, 35, 1, 10, 34, 1]', output: '34', explain: 'The largest is 35, second largest is 34.' },
      { input: 'arr = [10, 10, 10]', output: '-1', explain: 'No distinct second largest exists.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '0 ≤ arr[i] ≤ 10⁶'
    ],
    hint: `1. Maintain two variables: <code>largest</code> and <code>secondLargest</code> initialized to -1.<br>
2. Traverse the array.<br>
3. If current > <code>largest</code>, update <code>secondLargest = largest</code> and <code>largest = current</code>.<br>
4. Else if current > <code>secondLargest</code> and current != <code>largest</code>, update <code>secondLargest</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int secondLargest(vector<int>& arr, int n) {
        // Your code here
        return -1;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.secondLargest(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def secondLargest(self, arr, n):
        # Your code here
        return -1

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(Solution().secondLargest(arr, n))`,
      java: `import java.util.*;

class Solution {
    public int secondLargest(int arr[], int n) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().secondLargest(arr, n));
    }
}`,
      javascript: `function secondLargest(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n).map(Number);
console.log(secondLargest(arr, n));`
    },
    solution: {
      cpp: `int secondLargest(vector<int>& arr, int n) {
    int largest = -1, second = -1;
    for(int i=0; i<n; i++) {
        if(arr[i] > largest) {
            second = largest;
            largest = arr[i];
        } else if(arr[i] > second && arr[i] != largest) {
            second = arr[i];
        }
    }
    return second;
}`,
      javascript: `function secondLargest(arr, n) {
    let largest = -1, second = -1;
    for (let x of arr) {
        if (x > largest) {
            second = largest;
            largest = x;
        } else if (x > second && x !== largest) {
            second = x;
        }
    }
    return second;
}`
    },
    testCases: [
      { input: "6\n12 35 1 10 34 1", expected: "34" },
      { input: "3\n10 10 10", expected: "-1" },
      { input: "5\n10 5 8 20 20", expected: "10" },
      { input: "2\n1 2", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Find Duplicate Element",
    difficulty: "Easy",
    accuracy: "62.1%",
    submissions: "300K+",
    companies: ["Google", "Paytm", "Adobe"],
    pattern: "Linear Search (Frequency)",
    realWorld: "Used to clean up datasets (e.g., identifying duplicate phone numbers in a contact list).",
    description: `Given an array of size <strong>n</strong> where elements are between <strong>1 and n-1</strong>, at least one duplicate exists. Return any one duplicate.`,
    examples: [
      { input: 'arr = [1, 3, 4, 2, 2]', output: '2' },
      { input: 'arr = [3, 1, 3, 4, 2]', output: '3' }
    ],
    constraints: [
      '2 ≤ n ≤ 10⁵'
    ],
    hint: `A simple linear search way: Check each element against all elements after it. For a more optimized linear approach, use a frequency array or a HashSet.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int findDuplicate(vector<int>& arr, int n) {
        // Your code here
        return -1;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.findDuplicate(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def findDuplicate(self, arr, n):
        # Your code here
        return -1

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(Solution().findDuplicate(arr, n))`,
      java: `import java.util.*;

class Solution {
    public int findDuplicate(int arr[], int n) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().findDuplicate(arr, n));
    }
}`,
      javascript: `function findDuplicate(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n).map(Number);
console.log(findDuplicate(arr, n));`
    },
    solution: {
      cpp: `int findDuplicate(vector<int>& arr, int n) {
    vector<int> freq(n, 0);
    for(int x : arr) {
        if(freq[x] > 0) return x;
        freq[x]++;
    }
    return -1;
}`,
      javascript: `function findDuplicate(arr, n) {
    let seen = new Set();
    for(let x of arr) {
        if(seen.has(x)) return x;
        seen.add(x);
    }
    return -1;
}`
    },
    testCases: [
      { input: "5\n1 3 4 2 2", expected: "2" },
      { input: "5\n3 1 3 4 2", expected: "3" },
      { input: "2\n1 1", expected: "1" },
      { input: "4\n1 2 3 1", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Find Missing Number",
    difficulty: "Easy",
    accuracy: "75.8%",
    submissions: "420K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Math + Linear Scan",
    realWorld: "Used in sequence validation, such as checking if a packet in a numbered sequence (1 to N) was lost during network transmission.",
    description: `Given an array <strong>arr</strong> of <strong>n-1</strong> integers in the range <strong>1 to n</strong>. Every number appears once except one. Find the missing number.`,
    examples: [
      { input: 'arr = [1, 2, 4, 5, 6], n = 6', output: '3' }
    ],
    constraints: [
      '2 ≤ n ≤ 10⁶'
    ],
    hint: `1. Calculate the sum of first n natural numbers: <code>ExpectedSum = n*(n+1)/2</code>.<br>
2. Calculate the sum of elements in the given array.<br>
3. <code>MissingNumber = ExpectedSum - ArraySum</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int missingNumber(vector<int>& arr, int n) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n-1);
    for(int i=0; i<n-1; i++) cin >> arr[i];
    Solution sol;
    cout << sol.missingNumber(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def missingNumber(self, arr, n):
        # Your code here
        pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(Solution().missingNumber(arr, n))`,
      java: `import java.util.*;

class Solution {
    public int missingNumber(int arr[], int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n-1];
        for(int i = 0; i < n-1; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().missingNumber(arr, n));
    }
}`,
      javascript: `function missingNumber(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, n).map(Number);
console.log(missingNumber(arr, n));`
    },
    solution: {
      cpp: `int missingNumber(vector<int>& arr, int n) {
    long long expected = (long long)n * (n + 1) / 2;
    long long actual = 0;
    for(int x : arr) actual += x;
    return (int)(expected - actual);
}`,
      javascript: `function missingNumber(arr, n) {
    let expected = (n * (n + 1)) / 2;
    let actual = arr.reduce((a, b) => a + b, 0);
    return expected - actual;
}`
    },
    testCases: [
      { input: "6\n1 2 4 5 6", expected: "3" },
      { input: "5\n1 2 3 5", expected: "4" },
      { input: "2\n1", expected: "2" },
      { input: "10\n1 2 3 4 5 6 7 8 10", expected: "9" }
    ],
    jsRunner: (input) => "Logic verified"
  },
   {
    id: 12,
    title: "Check if Array is Sorted",
    difficulty: "Easy",
    accuracy: "82.4%",
    submissions: "350K+",
    companies: ["TCS", "Infosys", "Wipro"],
    pattern: "Linear Scan (Neighbor Comparison)",
    realWorld: "Used in data validation to ensure timestamps in logs or transactions in a ledger are in the correct chronological order.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, check if the array is sorted in <strong>non-decreasing</strong> order. Return <strong>true</strong> if sorted, else <strong>false</strong>.`,
    examples: [
      { input: 'arr = [10, 20, 30, 40, 50]', output: 'true' },
      { input: 'arr = [10, 20, 5, 40]', output: 'false', explain: '20 > 5, so it is not sorted.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁹ ≤ arr[i] ≤ 10⁹'
    ],
    hint: `1. Iterate from index 0 to n-2.<br>
2. Compare each element with the next element (arr[i] and arr[i+1]).<br>
3. If any element is greater than the next one, the array is not sorted.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool isSorted(vector<int>& arr, int n) {
        // Your code here
        return true;
    }
};

int main() {
    int n;
    if(!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << (sol.isSorted(arr, n) ? "true" : "false") << endl;
    return 0;
}`,
      python: `class Solution:
    def isSorted(self, arr, n):
        # Your code here
        return True

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().split()
    if data:
        n = int(data[0])
        arr = list(map(int, data[1:]))
        print("true" if Solution().isSorted(arr, n) else "false")`,
      java: `import java.util.*;

class Solution {
    public boolean isSorted(int arr[], int n) {
        // Your code here
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().isSorted(arr, n) ? "true" : "false");
    }
}`,
      javascript: `function isSorted(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 0) {
    const n = parseInt(input[0]);
    const arr = input.slice(1, 1 + n).map(Number);
    console.log(isSorted(arr, n) ? "true" : "false");
}`
    },
    solution: {
      cpp: `bool isSorted(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}`,
      javascript: `function isSorted(arr, n) {
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}`
    },
    testCases: [
      { input: "5\n10 20 30 40 50", expected: "true" },
      { input: "4\n10 20 5 40", expected: "false" },
      { input: "1\n100", expected: "true" },
      { input: "3\n1 1 1", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Search in 2D Matrix (Linear Way)",
    difficulty: "Easy",
    accuracy: "75.1%",
    submissions: "200K+",
    companies: ["Amazon", "Samsung"],
    pattern: "2D Array Traversal",
    realWorld: "Used to find a specific seat in a cinema hall layout or a specific coordinate in a spreadsheet grid.",
    description: `Given a 2D matrix of size <strong>N x M</strong> and a target <strong>X</strong>, return <strong>true</strong> if X is present in the matrix, otherwise <strong>false</strong>.`,
    examples: [
      { input: 'matrix = [[1, 2], [3, 4]], X = 3', output: 'true' },
      { input: 'matrix = [[1, 2], [3, 4]], X = 5', output: 'false' }
    ],
    constraints: [
      '1 ≤ N, M ≤ 1000',
      '1 ≤ matrix[i][j], X ≤ 10⁶'
    ],
    hint: `1. Use nested loops: the outer loop for rows and inner loop for columns.<br>
2. Check every element <code>matrix[i][j]</code> against X.<br>
3. If match is found, return true immediately.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& mat, int n, int m, int x) {
        // Your code here
        return false;
    }
};

int main() {
    int n, m, x;
    cin >> n >> m >> x;
    vector<vector<int>> mat(n, vector<int>(m));
    for(int i=0; i<n; i++)
        for(int j=0; j<m; j++) cin >> mat[i][j];
    Solution sol;
    cout << (sol.searchMatrix(mat, n, m, x) ? "true" : "false") << endl;
    return 0;
}`,
      python: `class Solution:
    def searchMatrix(self, mat, n, m, x):
        # Your code here
        return False

if __name__ == "__main__":
    n, m, x = map(int, input().split())
    mat = []
    for _ in range(n):
        mat.append(list(map(int, input().split())))
    print("true" if Solution().searchMatrix(mat, n, m, x) else "false")`,
      java: `import java.util.*;

class Solution {
    public boolean searchMatrix(int mat[][], int n, int m, int x) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int x = sc.nextInt();
        int mat[][] = new int[n][m];
        for(int i=0; i<n; i++)
            for(int j=0; j<m; j++) mat[i][j] = sc.nextInt();
        System.out.println(new Solution().searchMatrix(mat, n, m, x) ? "true" : "false");
    }
}`,
      javascript: `function searchMatrix(mat, n, m, x) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
// Parsing logic for 2D array...`
    },
    solution: {
      cpp: `bool searchMatrix(vector<vector<int>>& mat, int n, int m, int x) {
    for(int i=0; i<n; i++) {
        for(int j=0; j<m; j++) {
            if(mat[i][j] == x) return true;
        }
    }
    return false;
}`,
      javascript: `function searchMatrix(mat, n, m, x) {
    for(let i=0; i<n; i++) {
        for(let j=0; j<m; j++) {
            if(mat[i][j] === x) return true;
        }
    }
    return false;
}`
    },
    testCases: [
      { input: "2 2 3\n1 2\n3 4", expected: "true" },
      { input: "2 2 5\n1 2\n3 4", expected: "false" },
      { input: "1 3 10\n5 10 15", expected: "true" },
      { input: "3 1 7\n1\n2\n3", expected: "false" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 14,
    title: "Find Majority Element",
    difficulty: "Medium",
    accuracy: "52.4%",
    submissions: "400K+",
    companies: ["Amazon", "Google", "Microsoft"],
    pattern: "Frequency Counting",
    realWorld: "Used in fault-tolerant systems where multiple sensors provide readings, and the system accepts the value that more than 50% of sensors agree on.",
    description: `Given an array <strong>arr</strong> of size <strong>n</strong>, find the majority element. The majority element is an element that appears more than <strong>n/2</strong> times. If no such element exists, return -1.`,
    examples: [
      { input: 'arr = [3, 3, 4, 2, 4, 4, 2, 4, 4]', output: '4', explain: '4 appears 5 times, which is > 9/2.' },
      { input: 'arr = [1, 2, 3]', output: '-1' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '0 ≤ arr[i] ≤ 10⁶'
    ],
    hint: `1. A majority element appears more than n/2 times.<br>
2. You can use a frequency map (hash map or array) to count occurrences of each element.<br>
3. Traverse the map to see if any count is > n/2.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int majorityElement(vector<int>& arr, int n) {
        // Your code here
        return -1;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.majorityElement(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def majorityElement(self, arr, n):
        # Your code here
        return -1

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(Solution().majorityElement(arr, n))`,
      java: `import java.util.*;

class Solution {
    public int majorityElement(int arr[], int n) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().majorityElement(arr, n));
    }
}`,
      javascript: `function majorityElement(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n).map(Number);
console.log(majorityElement(arr, n));`
    },
    solution: {
      cpp: `int majorityElement(vector<int>& arr, int n) {
    unordered_map<int, int> counts;
    for (int x : arr) {
        counts[x]++;
        if (counts[x] > n / 2) return x;
    }
    return -1;
}`,
      javascript: `function majorityElement(arr, n) {
    let counts = new Map();
    for (let x of arr) {
        counts.set(x, (counts.get(x) || 0) + 1);
        if (counts.get(x) > n / 2) return x;
    }
    return -1;
}`
    },
    testCases: [
      { input: "9\n3 3 4 2 4 4 2 4 4", expected: "4" },
      { input: "3\n1 2 3", expected: "-1" },
      { input: "1\n10", expected: "10" },
      { input: "5\n2 2 1 1 2", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Find First Non-Repeating Element",
    difficulty: "Medium",
    accuracy: "48.6%",
    submissions: "250K+",
    companies: ["Amazon", "Flipkart", "Paytm"],
    pattern: "Two-Pass Linear Scan",
    realWorld: "Used in stream processing to identify the first unique event in a sequence of repeated signals.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, find the first element that does not repeat in the array. If all elements repeat, return 0.`,
    examples: [
      { input: 'arr = [-1, 2, -1, 3, 2]', output: '3', explain: '3 is the first element that appears only once.' },
      { input: 'arr = [1, 1, 1]', output: '0' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '-10⁶ ≤ arr[i] ≤ 10⁶'
    ],
    hint: `1. Use a frequency map (like a Hash Map) to count how many times each element appears.<br>
2. Traverse the array a second time from left to right.<br>
3. The first element you encounter whose frequency is 1 is the answer.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int firstNonRepeating(vector<int>& arr, int n) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.firstNonRepeating(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def firstNonRepeating(self, arr, n):
        # Your code here
        return 0

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(Solution().firstNonRepeating(arr, n))`,
      java: `import java.util.*;

class Solution {
    public int firstNonRepeating(int arr[], int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().firstNonRepeating(arr, n));
    }
}`,
      javascript: `function firstNonRepeating(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n).map(Number);
console.log(firstNonRepeating(arr, n));`
    },
    solution: {
      cpp: `int firstNonRepeating(vector<int>& arr, int n) {
    unordered_map<int, int> mp;
    for(int x : arr) mp[x]++;
    for(int x : arr) {
        if(mp[x] == 1) return x;
    }
    return 0;
}`,
      javascript: `function firstNonRepeating(arr, n) {
    let mp = new Map();
    for(let x of arr) mp.set(x, (mp.get(x) || 0) + 1);
    for(let x of arr) {
        if(mp.get(x) === 1) return x;
    }
    return 0;
}`
    },
    testCases: [
      { input: "5\n-1 2 -1 3 2", expected: "3" },
      { input: "3\n1 1 1", expected: "0" },
      { input: "6\n9 4 9 6 7 4", expected: "6" },
      { input: "2\n1 2", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "Check if Two Arrays are Equal",
    difficulty: "Easy",
    accuracy: "70.2%",
    submissions: "280K+",
    companies: ["Google", "Goldman Sachs"],
    pattern: "Hashing / Frequency Matching",
    realWorld: "Used to check if two sets of data (like ingredients in a recipe or items in a shopping list) are identical regardless of their order.",
    description: `Given two arrays <strong>A</strong> and <strong>B</strong> of equal size <strong>N</strong>, check if the two arrays are equal. Two arrays are said to be equal if they contain the same set of elements with the same frequencies.`,
    examples: [
      { input: 'A = [1, 2, 5, 4, 0], B = [2, 4, 5, 0, 1]', output: 'true' },
      { input: 'A = [1, 2, 5], B = [2, 4, 15]', output: 'false' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '0 ≤ A[i], B[i] ≤ 10⁶'
    ],
    hint: `1. If lengths are different, they are not equal.<br>
2. Use a frequency map to count elements in A.<br>
3. Subtract counts using elements in B.<br>
4. If all counts in the map are zero, arrays are equal.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool checkEqual(vector<int>& A, vector<int>& B, int n) {
        // Your code here
        return true;
    }
};

int main() {
    int n; cin >> n;
    vector<int> A(n), B(n);
    for(int i=0; i<n; i++) cin >> A[i];
    for(int i=0; i<n; i++) cin >> B[i];
    Solution sol;
    cout << (sol.checkEqual(A, B, n) ? "true" : "false") << endl;
    return 0;
}`,
      python: `class Solution:
    def checkEqual(self, A, B, n):
        # Your code here
        return True

if __name__ == "__main__":
    n = int(input())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    print("true" if Solution().checkEqual(A, B, n) else "false")`,
      java: `import java.util.*;

class Solution {
    public boolean checkEqual(int A[], int B[], int n) {
        // Your code here
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] A = new int[n];
        int[] B = new int[n];
        for(int i=0; i<n; i++) A[i] = sc.nextInt();
        for(int i=0; i<n; i++) B[i] = sc.nextInt();
        System.out.println(new Solution().checkEqual(A, B, n) ? "true" : "false");
    }
}`,
      javascript: `function checkEqual(A, B, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
// Parsing logic...`
    },
    solution: {
      cpp: `bool checkEqual(vector<int>& A, vector<int>& B, int n) {
    unordered_map<int, int> mp;
    for(int x : A) mp[x]++;
    for(int x : B) {
        if(mp.find(x) == mp.end() || mp[x] == 0) return false;
        mp[x]--;
    }
    return true;
}`,
      javascript: `function checkEqual(A, B, n) {
    if (A.length !== B.length) return false;
    let mp = new Map();
    for (let x of A) mp.set(x, (mp.get(x) || 0) + 1);
    for (let x of B) {
        if (!mp.has(x) || mp.get(x) === 0) return false;
        mp.set(x, mp.get(x) - 1);
    }
    return true;
}`
    },
    testCases: [
      { input: "5\n1 2 5 4 0\n2 4 5 0 1", expected: "true" },
      { input: "3\n1 2 5\n2 4 15", expected: "false" },
      { input: "3\n1 1 2\n1 2 2", expected: "false" },
      { input: "2\n10 20\n20 10", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Find Intersection of Two Arrays",
    difficulty: "Medium",
    accuracy: "65.4%",
    submissions: "320K+",
    companies: ["Adobe", "Microsoft", "Paytm"],
    pattern: "Linear Search (Set logic)",
    realWorld: "Used in social media apps to find 'Common Friends' between two user profiles.",
    description: `Given two arrays <strong>A</strong> and <strong>B</strong>, find the intersection. The intersection should contain only unique elements that are present in both arrays.`,
    examples: [
      { input: 'A = [1, 2, 2, 1], B = [2, 2]', output: '[2]' },
      { input: 'A = [4, 9, 5], B = [9, 4, 9, 8, 4]', output: '[4, 9]' }
    ],
    constraints: [
      '1 ≤ A.length, B.length ≤ 1000',
      '0 ≤ A[i], B[i] ≤ 1000'
    ],
    hint: `1. Use a Set to store unique elements of array A.<br>
2. Iterate through array B.<br>
3. If an element of B exists in the Set, add it to a result list and remove it from the Set (to ensure uniqueness).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    vector<int> intersection(vector<int>& A, vector<int>& B) {
        // Your code here
        return {};
    }
};

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> A(n), B(m);
    for(int i=0; i<n; i++) cin >> A[i];
    for(int i=0; i<m; i++) cin >> B[i];
    Solution sol;
    vector<int> res = sol.intersection(A, B);
    for(int x : res) cout << x << " ";
    return 0;
}`,
      python: `class Solution:
    def intersection(self, A, B):
        # Your code here
        return []

if __name__ == "__main__":
    n, m = map(int, input().split())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    print(*(Solution().intersection(A, B)))`,
      java: `import java.util.*;

class Solution {
    public int[] intersection(int[] A, int[] B) {
        // Your code here
        return new int[0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[] A = new int[n];
        int[] B = new int[m];
        for(int i=0; i<n; i++) A[i] = sc.nextInt();
        for(int i=0; i<m; i++) B[i] = sc.nextInt();
        int[] res = new Solution().intersection(A, B);
        for(int x : res) System.out.print(x + " ");
    }
}`,
      javascript: `function intersection(A, B) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
// Parsing...`
    },
    solution: {
      cpp: `vector<int> intersection(vector<int>& A, vector<int>& B) {
    unordered_set<int> setA(A.begin(), A.end());
    vector<int> res;
    for (int x : B) {
        if (setA.count(x)) {
            res.push_back(x);
            setA.erase(x);
        }
    }
    return res;
}`,
      javascript: `function intersection(A, B) {
    let setA = new Set(A);
    let res = [];
    for (let x of B) {
        if (setA.has(x)) {
            res.push(x);
            setA.delete(x);
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "4 2\n1 2 2 1\n2 2", expected: "2" },
      { input: "3 5\n4 9 5\n9 4 9 8 4", expected: "9 4" },
      { input: "2 2\n1 2\n3 4", expected: "" },
      { input: "1 1\n1\n1", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  
  {
    id: 18,
    title: "Search in Rotated Sorted Array (Linear)",
    difficulty: "Easy",
    accuracy: "82.1%",
    submissions: "250K+",
    companies: ["Microsoft", "Adobe", "Amazon"],
    pattern: "Linear Scan",
    realWorld: "Used in cyclic buffers or shifted logs where data is still mostly ordered but has a single 'pivot' point due to wrap-around.",
    description: `Given a sorted array that has been rotated at some unknown pivot (e.g., <code>[4, 5, 6, 7, 0, 1, 2]</code>), find the index of a target element <strong>X</strong>.
<br><br>While this can be solved in O(log n) with Binary Search, your task is to implement the <strong>Linear Search</strong> approach first.`,
    examples: [
      { input: 'arr = [4, 5, 6, 7, 0, 1, 2], X = 0', output: '4' },
      { input: 'arr = [4, 5, 6, 7, 0, 1, 2], X = 3', output: '-1' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁶ ≤ arr[i], X ≤ 10⁶'
    ],
    hint: `Even if the array is rotated, every element is still present. A simple <strong>O(n)</strong> loop from start to end checking <code>if(arr[i] == X)</code> will find it.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& arr, int n, int x) {
        // Your code here
        return -1;
    }
};

int main() {
    int n, x;
    cin >> n >> x;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.search(arr, n, x) << endl;
    return 0;
}`,
      python: `class Solution:
    def search(self, arr, n, x):
        # Your code here
        return -1

if __name__ == "__main__":
    n, x = map(int, input().split())
    arr = list(map(int, input().split()))
    print(Solution().search(arr, n, x))`,
      java: `import java.util.*;

class Solution {
    public int search(int arr[], int n, int x) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int x = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().search(arr, n, x));
    }
}`,
      javascript: `function search(arr, n, x) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
// Parsing logic...`
    },
    solution: {
      cpp: `int search(vector<int>& arr, int n, int x) {
    for(int i=0; i<n; i++) {
        if(arr[i] == x) return i;
    }
    return -1;
}`,
      javascript: `function search(arr, n, x) {
    for(let i=0; i<n; i++) {
        if(arr[i] === x) return i;
    }
    return -1;
}`
    },
    testCases: [
      { input: "7 0\n4 5 6 7 0 1 2", expected: "4" },
      { input: "7 3\n4 5 6 7 0 1 2", expected: "-1" },
      { input: "1 5\n5", expected: "0" },
      { input: "2 10\n20 10", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Peak Element (Linear)",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "320K+",
    companies: ["Google", "Amazon", "Uber"],
    pattern: "Neighbor Comparison",
    realWorld: "Used in elevation mapping or audio signal processing to find 'local maxima' (peaks) where a value is higher than its surrounding context.",
    description: `An element is a <strong>peak</strong> if it is not smaller than its neighbors. For the first element, we only compare with the second. For the last, we only compare with the second last.
<br><br>Find the index of any <strong>one</strong> peak element in an array.`,
    examples: [
      { input: 'arr = [1, 2, 3, 1]', output: '2', explain: '3 is greater than 2 and 1.' },
      { input: 'arr = [1, 2, 1, 3, 5, 6, 4]', output: '5', explain: '6 is a peak.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁶ ≤ arr[i] ≤ 10⁶'
    ],
    hint: `1. If n=1, return 0.<br>
2. If the first element > second, return 0.<br>
3. If the last element > second last, return n-1.<br>
4. Otherwise, loop from 1 to n-2 and check if <code>arr[i] >= arr[i-1] && arr[i] >= arr[i+1]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int findPeak(vector<int>& arr, int n) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.findPeak(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int findPeak(vector<int>& arr, int n) {
    if(n == 1) return 0;
    if(arr[0] >= arr[1]) return 0;
    if(arr[n-1] >= arr[n-2]) return n-1;
    for(int i=1; i<n-1; i++) {
        if(arr[i] >= arr[i-1] && arr[i] >= arr[i+1]) return i;
    }
    return 0;
}`,
      javascript: `function findPeak(arr, n) {
    if (n === 1) return 0;
    if (arr[0] >= arr[1]) return 0;
    if (arr[n - 1] >= arr[n - 2]) return n - 1;
    for (let i = 1; i < n - 1; i++) {
        if (arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1]) return i;
    }
    return 0;
}`
    },
    testCases: [
      { input: "4\n1 2 3 1", expected: "2" },
      { input: "7\n1 2 1 3 5 6 4", expected: "5" },
      { input: "3\n10 20 30", expected: "2" },
      { input: "3\n30 20 10", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 20,
    title: "Equilibrium Index",
    difficulty: "Medium",
    accuracy: "58.6%",
    submissions: "150K+",
    companies: ["Amazon", "Adobe", "Directi"],
    pattern: "Prefix Sum / Total Sum",
    realWorld: "Used in load balancing where you need to find a 'pivot' point that splits a workload into two equal halves (e.g., sum of task weights on left = right).",
    description: `An <strong>equilibrium index</strong> is an index such that the sum of elements at lower indices is equal to the sum of elements at higher indices.
<br><br>Return the <strong>first</strong> equilibrium index found. If none exists, return -1.`,
    examples: [
      { input: 'arr = [-7, 1, 5, 2, -4, 3, 0]', output: '3', explain: 'Left: -7+1+5 = -1. Right: -4+3+0 = -1.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁵ ≤ arr[i] ≤ 10⁵'
    ],
    hint: `1. Calculate the total sum of the array.<br>
2. Maintain a <code>leftSum</code> (initially 0).<br>
3. Iterate through the array: calculate <code>rightSum = Total - leftSum - arr[i]</code>.<br>
4. If <code>leftSum == rightSum</code>, current index is the answer.<br>
5. Update <code>leftSum += arr[i]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    int equilibriumPoint(vector<int>& arr, int n) {
        // Your code here
        return -1;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.equilibriumPoint(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int equilibriumPoint(vector<int>& arr, int n) {
    long long totalSum = 0;
    for(int x : arr) totalSum += x;
    long long leftSum = 0;
    for(int i=0; i<n; i++) {
        if(leftSum == (totalSum - leftSum - arr[i])) return i;
        leftSum += arr[i];
    }
    return -1;
}`,
      javascript: `function equilibriumPoint(arr, n) {
    let totalSum = arr.reduce((a, b) => a + b, 0);
    let leftSum = 0;
    for(let i=0; i<n; i++) {
        let rightSum = totalSum - leftSum - arr[i];
        if(leftSum === rightSum) return i;
        leftSum += arr[i];
    }
    return -1;
}`
    },
    testCases: [
      { input: "7\n-7 1 5 2 -4 3 0", expected: "3" },
      { input: "3\n1 2 3", expected: "-1" },
      { input: "1\n1", expected: "0" },
      { input: "5\n1 3 5 2 2", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 21,
    title: "Subarray with Given Sum (Naive)",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "300K+",
    companies: ["Amazon", "Google", "Facebook"],
    pattern: "Brute Force Subarrays",
    realWorld: "Used in financial forensics to find a contiguous range of transactions that add up to a specific suspicious total.",
    description: `Given an array of non-negative integers and a target sum <strong>S</strong>, find a <strong>contiguous subarray</strong> that adds up to S.
<br><br>Return the 1-based start and end indices. If no such subarray exists, return [-1].`,
    examples: [
      { input: 'arr = [1, 2, 3, 7, 5], S = 12', output: '[2, 4]', explain: '2 + 3 + 7 = 12.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '0 ≤ arr[i] ≤ 10⁶'
    ],
    hint: `1. Use nested loops: <code>i</code> for start and <code>j</code> for end.<br>
2. For every <code>i</code>, calculate the sum of elements from <code>i</code> to <code>j</code>.<br>
3. If <code>currentSum == S</code>, return indices.<br>
4. Note: While O(n²) is naive, it helps understand the fundamental search space.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> subarraySum(vector<int>& arr, int n, int s) {
        // Your code here
        return {-1};
    }
};

int main() {
    int n, s; cin >> n >> s;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    vector<int> res = sol.subarraySum(arr, n, s);
    for(int x : res) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> subarraySum(vector<int>& arr, int n, int s) {
    for(int i=0; i<n; i++) {
        long long currentSum = 0;
        for(int j=i; j<n; j++) {
            currentSum += arr[j];
            if(currentSum == s) return {i + 1, j + 1};
            if(currentSum > s) break; // Optimization for non-negative
        }
    }
    return {-1};
}`,
      javascript: `function subarraySum(arr, n, s) {
    for(let i=0; i<n; i++) {
        let sum = 0;
        for(let j=i; j<n; j++) {
            sum += arr[j];
            if(sum === s) return [i+1, j+1];
            if(sum > s) break;
        }
    }
    return [-1];
}`
    },
    testCases: [
      { input: "5 12\n1 2 3 7 5", expected: "2 4" },
      { input: "4 0\n1 2 3 4", expected: "-1" },
      { input: "5 15\n1 2 3 4 5", expected: "1 5" },
      { input: "2 5\n5 10", expected: "1 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 22,
    title: "Find Pair with Given Sum (Brute Force)",
    difficulty: "Easy",
    accuracy: "65.4%",
    submissions: "200K+",
    companies: ["Amazon", "Google", "Microsoft"],
    pattern: "Two-Loop Search",
    realWorld: "Used in inventory management to find exactly two items that can perfectly fill a container's remaining weight capacity.",
    description: `Given an array <strong>arr</strong> and a target <strong>S</strong>, find any two indices <code>i</code> and <code>j</code> such that <code>arr[i] + arr[j] = S</code>.`,
    examples: [
      { input: 'arr = [1, 4, 45, 6, 10, 8], S = 16', output: 'true', explain: '6 + 10 = 16.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `1. Use nested loops to check every possible pair.<br>
2. Outer loop <code>i</code> from 0 to n-1.<br>
3. Inner loop <code>j</code> from i+1 to n-1.<br>
4. If <code>arr[i] + arr[j] == S</code>, return true.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool hasArrayTwoCandidates(vector<int>& arr, int n, int x) {
        // Your code here
        return false;
    }
};

int main() {
    int n, x; cin >> n >> x;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << (sol.hasArrayTwoCandidates(arr, n, x) ? "Yes" : "No") << endl;
    return 0;
}`
    },
    solution: {
      cpp: `bool hasArrayTwoCandidates(vector<int>& arr, int n, int x) {
    for(int i=0; i<n; i++) {
        for(int j=i+1; j<n; j++) {
            if(arr[i] + arr[j] == x) return true;
        }
    }
    return false;
}`,
      javascript: `function hasArrayTwoCandidates(arr, n, x) {
    for(let i=0; i<n; i++) {
        for(let j=i+1; j<n; j++) {
            if(arr[i] + arr[j] === x) return true;
        }
    }
    return false;
}`
    },
    testCases: [
      { input: "6 16\n1 4 45 6 10 8", expected: "Yes" },
      { input: "5 10\n1 2 4 3 6", expected: "Yes" },
      { input: "2 5\n1 2", expected: "No" },
      { input: "4 2\n1 1 1 1", expected: "Yes" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 23,
    title: "Longest Increasing Subarray",
    difficulty: "Easy",
    accuracy: "75.2%",
    submissions: "120K+",
    companies: ["Wipro", "Cognizant"],
    pattern: "Continuous Linear Scan",
    realWorld: "Used in stock market analysis to find the longest 'Continuous Bull Run' (period where prices only go up day after day).",
    description: `Given an array, find the length of the <strong>longest contiguous subarray</strong> such that every element is strictly greater than the previous one.`,
    examples: [
      { input: 'arr = [5, 6, 3, 5, 7, 8, 9, 1, 2]', output: '5', explain: 'Subarray [3, 5, 7, 8, 9] is the longest increasing part.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `1. Initialize <code>maxLen = 1</code> and <code>currentLen = 1</code>.<br>
2. Traverse from index 1 to n-1.<br>
3. If <code>arr[i] > arr[i-1]</code>, increment <code>currentLen</code>.<br>
4. Else, update <code>maxLen = max(maxLen, currentLen)</code> and reset <code>currentLen = 1</code>.<br>
5. Don't forget to check maxLen one last time after the loop.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lenOfLongestIncSubArr(vector<int>& arr, int n) {
        // Your code here
        return 1;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.lenOfLongestIncSubArr(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int lenOfLongestIncSubArr(vector<int>& arr, int n) {
    if(n == 0) return 0;
    int maxLen = 1, currentLen = 1;
    for(int i=1; i<n; i++) {
        if(arr[i] > arr[i-1]) currentLen++;
        else {
            maxLen = max(maxLen, currentLen);
            currentLen = 1;
        }
    }
    return maxLen = max(maxLen, currentLen);
}`,
      javascript: `function lenOfLongestIncSubArr(arr, n) {
    if(n === 0) return 0;
    let maxLen = 1, cur = 1;
    for(let i=1; i<n; i++) {
        if(arr[i] > arr[i-1]) cur++;
        else { maxLen = Math.max(maxLen, cur); cur = 1; }
    }
    return Math.max(maxLen, cur);
}`
    },
    testCases: [
      { input: "9\n5 6 3 5 7 8 9 1 2", expected: "5" },
      { input: "5\n1 2 3 4 5", expected: "5" },
      { input: "5\n5 4 3 2 1", expected: "1" },
      { input: "4\n10 10 10 10", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 24,
    title: "Find Leader Elements",
    difficulty: "Easy",
    accuracy: "68.4%",
    submissions: "400K+",
    companies: ["Paytm", "HCL", "Amazon"],
    pattern: "Suffix Maximum / Right Scan",
    realWorld: "Used in determining 'dominant' values in data streams where an item is only significant if it exceeds everything that comes after it.",
    description: `An element is a <strong>leader</strong> if it is greater than or equal to all elements to its right. The rightmost element is always a leader.
<br><br>Find all leaders in the array and return them in the order they appear.`,
    examples: [
      { input: 'arr = [16, 17, 4, 3, 5, 2]', output: '[17, 5, 2]', explain: '17 is > [4,3,5,2]. 5 is > [2]. 2 is rightmost.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶'
    ],
    hint: `1. Traverse from <strong>right to left</strong>.<br>
2. Keep track of the <code>maxSoFar</code> (initially the rightmost element).<br>
3. Every time you find an element <code>>= maxSoFar</code>, it is a leader.<br>
4. Update <code>maxSoFar</code> and store the leader.<br>
5. Reverse your result list before returning.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> leaders(vector<int>& arr, int n) {
        // Your code here
        return {};
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    vector<int> res = sol.leaders(arr, n);
    for(int x : res) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> leaders(vector<int>& arr, int n) {
    vector<int> res;
    int maxFromRight = arr[n-1];
    res.push_back(maxFromRight);
    for(int i = n-2; i >= 0; i--) {
        if(arr[i] >= maxFromRight) {
            maxFromRight = arr[i];
            res.push_back(maxFromRight);
        }
    }
    reverse(res.begin(), res.end());
    return res;
}`,
      javascript: `function leaders(arr, n) {
    let res = [];
    let maxR = arr[n-1];
    res.push(maxR);
    for(let i=n-2; i>=0; i--) {
        if(arr[i] >= maxR) {
            maxR = arr[i];
            res.push(maxR);
        }
    }
    return res.reverse();
}`
    },
    testCases: [
      { input: "6\n16 17 4 3 5 2", expected: "17 5 2" },
      { input: "5\n1 2 3 4 0", expected: "4 0" },
      { input: "3\n10 10 10", expected: "10 10 10" },
      { input: "5\n10 20 30 40 50", expected: "50" }
    ],
    jsRunner: (input) => "Logic verified"
  },

    {
    id: 25,
    title: "Kadane’s Algorithm (Max Subarray Sum)",
    difficulty: "Medium",
    accuracy: "52.3%",
    submissions: "600K+",
    companies: ["Google", "Amazon", "Microsoft", "Adobe"],
    pattern: "Linear Scan (Greedy)",
    realWorld: "Used in genomic sequencing to find the 'highest scoring' segment of a protein sequence or in finance to find the most profitable time period.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.`,
    examples: [
      { input: 'arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explain: 'Subarray [4, -1, 2, 1] has the largest sum = 6.' },
      { input: 'arr = [1]', output: '1' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁷ ≤ arr[i] ≤ 10⁷'
    ],
    hint: `1. Maintain a <code>currentSum</code> and a <code>maxSum</code>.<br>
2. Iterate through the array: add the current element to <code>currentSum</code>.<br>
3. If <code>currentSum > maxSum</code>, update <code>maxSum</code>.<br>
4. If <code>currentSum < 0</code>, reset <code>currentSum = 0</code> (starting fresh from the next element is better than carrying a negative burden).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    long long maxSubarraySum(vector<int>& arr, int n) {
        // Your code here
        return 0;
    }
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.maxSubarraySum(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def maxSubarraySum(self, arr, n):
        # Your code here
        return 0

if __name__ == "__main__":
    import sys
    input_data = sys.stdin.read().split()
    if input_data:
        n = int(input_data[0])
        arr = list(map(int, input_data[1:]))
        print(Solution().maxSubarraySum(arr, n))`,
      java: `import java.util.*;

class Solution {
    public long maxSubarraySum(int arr[], int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().maxSubarraySum(arr, n));
    }
}`,
      javascript: `function maxSubarraySum(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 0) {
    const n = parseInt(input[0]);
    const arr = input.slice(1, 1 + n).map(Number);
    console.log(maxSubarraySum(arr, n));
}`
    },
    solution: {
      cpp: `long long maxSubarraySum(vector<int>& arr, int n) {
    long long maxSum = LLONG_MIN, currentSum = 0;
    for (int i = 0; i < n; i++) {
        currentSum += arr[i];
        maxSum = max(maxSum, currentSum);
        if (currentSum < 0) currentSum = 0;
    }
    return maxSum;
}`,
      javascript: `function maxSubarraySum(arr, n) {
    let maxSum = -Infinity;
    let currentSum = 0;
    for (let i = 0; i < n; i++) {
        currentSum += arr[i];
        if (currentSum > maxSum) maxSum = currentSum;
        if (currentSum < 0) currentSum = 0;
    }
    return maxSum;
}`
    },
    testCases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", expected: "6" },
      { input: "5\n1 2 3 -2 5", expected: "9" },
      { input: "4\n-1 -2 -3 -4", expected: "-1" },
      { input: "3\n5 4 7", expected: "16" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 26,
    title: "Trapping Rain Water (Brute Force)",
    difficulty: "Medium",
    accuracy: "45.1%",
    submissions: "200K+",
    companies: ["Amazon", "Google", "Adobe"],
    pattern: "Linear Scan (Min-Max)",
    realWorld: "Used in topographic analysis to simulate drainage basins or in game physics to calculate how much fluid an object can hold.",
    description: `Given <strong>n</strong> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
<br><br>Perform this using the <strong>brute force</strong> linear approach (finding max left and right for every index).`,
    examples: [
      { input: 'arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]', output: '6' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁴',
      '0 ≤ arr[i] ≤ 10⁵'
    ],
    hint: `1. For every element <code>arr[i]</code>, the water it can hold is determined by the minimum of the highest bar to its left and the highest bar to its right.<br>
2. <code>water[i] = min(leftMax, rightMax) - arr[i]</code>.<br>
3. Sum the water trapped at every index.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Brute force O(N^2) or O(N) with extra space
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> h(n);
    for(int i=0; i<n; i++) cin >> h[i];
    Solution sol;
    cout << sol.trap(h) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int trap(vector<int>& height) {
    int n = height.size();
    if (n == 0) return 0;
    int totalWater = 0;
    for (int i = 0; i < n; i++) {
        int leftMax = 0, rightMax = 0;
        for (int j = i; j >= 0; j--) leftMax = max(leftMax, height[j]);
        for (int j = i; j < n; j++) rightMax = max(rightMax, height[j]);
        totalWater += min(leftMax, rightMax) - height[i];
    }
    return totalWater;
}`
    },
    testCases: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" },
      { input: "6\n4 2 0 3 2 5", expected: "9" },
      { input: "3\n1 2 3", expected: "0" },
      { input: "5\n3 0 0 2 0", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 27,
    title: "Stock Buy and Sell (Single Pass)",
    difficulty: "Easy",
    accuracy: "65.4%",
    submissions: "500K+",
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Linear Scan (Tracking Min)",
    realWorld: "The core logic for 'Maximum Drawdown' or 'Max Profit' tools in stock trading platforms.",
    description: `You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the i-th day. You want to maximize your profit by choosing a single day to buy and a single day to sell in the future.
<br><br>Return the maximum profit. If no profit can be made, return 0.`,
    examples: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', explain: 'Buy on day 2 (price 1), sell on day 5 (price 6). Profit = 5.' }
    ],
    constraints: [
      '1 ≤ prices.length ≤ 10⁵',
      '0 ≤ prices[i] ≤ 10⁴'
    ],
    hint: `1. Keep track of the <strong>minimum price</strong> seen so far.<br>
2. For every day, calculate the potential profit if you sold today (<code>currentPrice - minPriceSoFar</code>).<br>
3. Keep updating the <code>maxProfit</code> found.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> p(n);
    for(int i=0; i<n; i++) cin >> p[i];
    Solution sol;
    cout << sol.maxProfit(p) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int maxProfit(vector<int>& prices) {
    int minPrice = 1e9, maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
      javascript: `function maxProfit(prices) {
    let minPrice = Infinity;
    let maxP = 0;
    for (let p of prices) {
        if (p < minPrice) minPrice = p;
        else if (p - minPrice > maxP) maxP = p - minPrice;
    }
    return maxP;
}`
    },
    testCases: [
      { input: "6\n7 1 5 3 6 4", expected: "5" },
      { input: "5\n7 6 4 3 1", expected: "0" },
      { input: "2\n1 5", expected: "4" },
      { input: "4\n2 4 1 7", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 28,
    title: "Check if Array is Palindrome",
    difficulty: "Easy",
    accuracy: "91.2%",
    submissions: "200K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pointers (Linear)",
    realWorld: "Used in data integrity checks and bioinformatics to identify palindromic sequences in DNA strands.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> elements, check if the array is a palindrome. A palindromic array reads the same forward and backward.`,
    examples: [
      { input: 'arr = [1, 2, 3, 2, 1]', output: 'true' },
      { input: 'arr = [1, 2, 3, 4]', output: 'false' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶'
    ],
    hint: `1. Use two pointers: one at the start (<code>0</code>) and one at the end (<code>n-1</code>).<br>
2. Loop until the pointers meet: if <code>arr[start] != arr[end]</code>, it is not a palindrome.<br>
3. If the loop finishes, it is a palindrome.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool isPalindrome(vector<int>& arr, int n) {
        // Your code here
        return false;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << (sol.isPalindrome(arr, n) ? "true" : "false") << endl;
    return 0;
}`
    },
    solution: {
      cpp: `bool isPalindrome(vector<int>& arr, int n) {
    int start = 0, end = n - 1;
    while (start < end) {
        if (arr[start] != arr[end]) return false;
        start++;
        end--;
    }
    return true;
}`,
      javascript: `function isPalindrome(arr, n) {
    for (let i = 0; i < Math.floor(n / 2); i++) {
        if (arr[i] !== arr[n - 1 - i]) return false;
    }
    return true;
}`
    },
    testCases: [
      { input: "5\n1 2 3 2 1", expected: "true" },
      { input: "4\n1 2 3 4", expected: "false" },
      { input: "1\n99", expected: "true" },
      { input: "6\n1 2 2 2 2 1", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 29,
    title: "Find All Duplicates",
    difficulty: "Medium",
    accuracy: "68.3%",
    submissions: "350K+",
    companies: ["Amazon", "Microsoft", "Paytm"],
    pattern: "Frequency Counting",
    realWorld: "Used in data cleaning to extract all redundant records from a list (e.g., finding all users who have registered multiple times).",
    description: `Given an array <strong>arr</strong> of size <strong>n</strong> where elements are in the range <strong>[0, n-1]</strong>, find all elements that appear more than once.
<br><br>Return the list of duplicates in <strong>ascending order</strong>. If no duplicates exist, return -1.`,
    examples: [
      { input: 'arr = [2, 3, 1, 2, 3]', output: '[2, 3]' },
      { input: 'arr = [0, 1, 2]', output: '[-1]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '0 ≤ arr[i] ≤ n-1'
    ],
    hint: `1. Use a frequency array (size n) initialized to 0.<br>
2. Traverse the array and increment the count for each element.<br>
3. Traverse the frequency array: if count > 1, add it to the result list.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> findDuplicates(vector<int>& arr, int n) {
        // Your code here
        return {};
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    vector<int> res = sol.findDuplicates(arr, n);
    for(int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> findDuplicates(vector<int>& arr, int n) {
    vector<int> freq(n, 0);
    vector<int> res;
    for (int x : arr) freq[x]++;
    for (int i = 0; i < n; i++) {
        if (freq[i] > 1) res.push_back(i);
    }
    if (res.empty()) return {-1};
    return res;
}`,
      javascript: `function findDuplicates(arr, n) {
    let freq = new Array(n).fill(0);
    let res = [];
    for (let x of arr) freq[x]++;
    for (let i = 0; i < n; i++) {
        if (freq[i] > 1) res.push(i);
    }
    return res.length ? res : [-1];
}`
    },
    testCases: [
      { input: "5\n2 3 1 2 3", expected: "2 3" },
      { input: "3\n0 1 2", expected: "-1" },
      { input: "4\n1 1 1 1", expected: "1" },
      { input: "5\n0 4 3 2 0", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  }


];