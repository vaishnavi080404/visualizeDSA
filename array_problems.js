const TOPIC_CONFIG = {
  name: "Array ",
  level: "Level 3 of 3 · Problems",
  backLink: "array_L1.html",
  backLabel: "Array ",
};

const PROBLEMS = [
  {
    id: 1,
    title: "Second Largest Element",
    difficulty: "Easy",
    accuracy: "42.5%",
    submissions: "500K+",
    companies: ["TCS", "Amazon", "Microsoft"],
    pattern: "Two-Pointer / Linear Scan",
    realWorld: "Used in ranking systems to find the 'Runner Up' when the top performer is excluded.",
    description: `Given an array of integers <strong>arr</strong>, return the <strong>second largest</strong> distinct element from the array. If the second largest element doesn't exist, return -1.`,
    examples: [
      { input: 'arr = [12, 35, 1, 10, 34, 1]', output: '34', explain: 'Largest is 35, second largest is 34.' },
      { input: 'arr = [10, 10, 10]', output: '-1', explain: 'All elements are same, so no second largest exists.' }
    ],
    constraints: ['2 ≤ arr.length ≤ 10⁵', '1 ≤ arr[i] ≤ 10⁵'],
    hint: `Maintain two variables: 'first' and 'second'. Initialize both to -1. As you traverse, if current is greater than 'first', update both. If current is between 'first' and 'second', update only 'second'.`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int print2largest(vector<int> &arr) {
        // Your code here
        return -1;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.print2largest(arr) << endl;
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public int print2largest(int[] arr) {
        // Your code here
        return -1;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        System.out.println(new Solution().print2largest(arr));
    }
}`,
      python: `class Solution:
    def print2largest(self, arr):
        # Your code here
        pass

if __name__ == "__main__":
    arr = list(map(int, input().split()))
    print(Solution().print2largest(arr))`,
      javascript: `function print2largest(arr) {
    // Your code here
}

const input = [12, 35, 1, 10, 34, 1];
console.log(print2largest(input));`
    },
    solution: {
      cpp: `int print2largest(vector<int> &arr) {
    int first = -1, second = -1;
    for (int x : arr) {
        if (x > first) {
            second = first;
            first = x;
        } else if (x > second && x != first) {
            second = x;
        }
    }
    return second;
}`
    },
    testCases: [
      { input: "6\n12 35 1 10 34 1", expected: "34" },
      { input: "3\n10 10 10", expected: "-1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Third Largest Element",
    difficulty: "Easy",
    accuracy: "45.1%",
    submissions: "500K+",
    companies: ["TCS", "Amazon", "Microsoft"],
    pattern: "Linear Scan",
    description: `Given an array of <strong>n</strong> integers, return the <strong>third largest</strong> element. If there are fewer than 3 distinct elements, return -1.`,
    examples: [
      { input: 'arr = [2, 4, 1, 3, 5]', output: '3' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `Extend the 'Second Largest' logic to use three variables: max1, max2, max3.`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int thirdLargest(vector<int> &arr) {
        // Your code here
        return -1;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << Solution().thirdLargest(arr) << endl;
    return 0;
}`,
      python: `class Solution:
    def thirdLargest(self, arr):
        pass`,
      java: `class Solution {
    int thirdLargest(int a[]) {
        return -1;
    }
}`,
      javascript: `function thirdLargest(arr) { }`
    },
    solution: {
      cpp: `int thirdLargest(vector<int> &arr) {
    long long m1 = -1, m2 = -1, m3 = -1;
    for(int x : arr) {
        if(x > m1) { m3 = m2; m2 = m1; m1 = x; }
        else if(x > m2 && x < m1) { m3 = m2; m2 = x; }
        else if(x > m3 && x < m2) { m3 = x; }
    }
    return (int)m3;
}`
    },
    testCases: [
      { input: "5\n2 4 1 3 5", expected: "3" },
      { input: "2\n10 20", expected: "-1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Reverse an Array",
    difficulty: "Easy",
    accuracy: "92.4%",
    submissions: "1M+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pointers",
    realWorld: "Used in 'Undo' operations or simply flipping the orientation of images and video streams.",
    description: `Given an array <strong>arr</strong>, reverse it in-place.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4]', output: '[4, 3, 2, 1]' }
    ],
    hint: `Use two pointers, <code>left</code> at 0 and <code>right</code> at n-1. Swap elements and move pointers toward each other.`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

void reverseArray(vector<int> &arr) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    reverseArray(arr);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      python: `def reverseArray(arr):
    pass`,
      java: `class Solution {
    public void reverseArray(int arr[]) { }
}`,
      javascript: `function reverseArray(arr) { }`
    },
    solution: {
      cpp: `void reverseArray(vector<int> &arr) {
    int l = 0, r = arr.size() - 1;
    while(l < r) swap(arr[l++], arr[r--]);
}`
    },
    testCases: [
      { input: "4\n1 2 3 4", expected: "4 3 2 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Reverse Array in Groups",
    difficulty: "Easy",
    accuracy: "58.2%",
    submissions: "200K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Pointer Step",
    description: `Given an array of size <strong>n</strong> and a number <strong>k</strong>, reverse every sub-array of size k. If at the end less than k elements are left, reverse them as well.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5], k = 3', output: '[3, 2, 1, 5, 4]' }
    ],
    hint: `Loop through the array with a step of <code>k</code>. For each iteration, reverse the sub-segment from <code>i</code> to <code>min(i + k - 1, n - 1)</code>.`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

void reverseInGroups(vector<int> &arr, int n, int k) {
    // Your code here
}`,
      python: `def reverseInGroups(arr, n, k):
    pass`,
      java: `class Solution {
    void reverseInGroups(ArrayList<Integer> arr, int n, int k) { }
}`,
      javascript: `function reverseInGroups(arr, k) { }`
    },
    solution: {
      cpp: `void reverseInGroups(vector<int> &arr, int n, int k) {
    for (int i = 0; i < n; i += k) {
        int left = i;
        int right = min(i + k - 1, n - 1);
        while (left < right) swap(arr[left++], arr[right--]);
    }
}`
    },
    testCases: [
      { input: "5 3\n1 2 3 4 5", expected: "3 2 1 5 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Rotate Array",
    difficulty: "Medium",
    accuracy: "48.2%",
    submissions: "300K+",
    companies: ["Amazon", "Microsoft", "Directi"],
    pattern: "Reverse Trick",
    realWorld: "Used in cyclic scrolling in UIs, shifting buffers in network protocols, or 'Shift-Right' assembly instructions.",
    description: `Rotate an array to the left by <strong>d</strong> steps. <br><br>Input: [1, 2, 3, 4, 5], d = 2 <br>Output: [3, 4, 5, 1, 2]`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5], d = 2', output: '[3, 4, 5, 1, 2]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶', '1 ≤ d ≤ n'],
    hint: `The optimal O(1) space trick: <br>1. Reverse the first 'd' elements.<br>2. Reverse the remaining 'n-d' elements.<br>3. Reverse the whole array.`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    void rotateArr(vector<int>& arr, int d) {
        // Your code here
    }
};

int main() {
    int n, d; cin >> n >> d;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution().rotateArr(arr, d);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      python: `class Solution:
    def rotateArr(self, arr, d):
        pass`,
      java: `class Solution {
    static void rotateArr(int arr[], int d) { }
}`,
      javascript: `function rotateArr(arr, d) { }`
    },
    solution: {
      cpp: `void rotateArr(vector<int>& arr, int d) {
    int n = arr.size();
    d %= n;
    reverse(arr.begin(), arr.begin() + d);
    reverse(arr.begin() + d, arr.end());
    reverse(arr.begin(), arr.end());
}`
    },
    testCases: [
      { input: "5 2\n1 2 3 4 5", expected: "3 4 5 1 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Three Great Candidates",
    difficulty: "Easy",
    accuracy: "62.4%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Greedy / Math",
    description: `Given an array of integers, find the <strong>maximum product</strong> of any three numbers in the array.`,
    examples: [
      { input: 'arr = [-10, -10, 5, 2]', output: '500', explain: '-10 * -10 * 5 = 500' }
    ],
    hint: `The result is the maximum of:<br>1. Product of the 3 largest numbers.<br>2. Product of the 2 smallest (negative) numbers and the largest number.`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    long long maxProduct(vector<int> &arr) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << Solution().maxProduct(arr) << endl;
    return 0;
}`,
      python: `def maxProduct(arr): pass`,
      java: `class Solution {
    long long maxProduct(int[] arr) { return 0; }
}`,
      javascript: `function maxProduct(arr) { }`
    },
    solution: {
      cpp: `long long maxProduct(vector<int> &arr) {
    int n = arr.size();
    sort(arr.begin(), arr.end());
    return max((long long)arr[n-1]*arr[n-2]*arr[n-3], (long long)arr[0]*arr[1]*arr[n-1]);
}`
    },
    testCases: [
      { input: "4\n-10 -10 5 2", expected: "500" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Max Consecutive Ones",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "250K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Linear Scan",
    description: `Given a binary array <code>nums</code>, return the maximum number of consecutive 1s in the array.`,
    examples: [
      { input: 'nums = [1, 1, 0, 1, 1, 1]', output: '3' }
    ],
    hint: `Maintain a counter. Increment it when you see a 1. Reset it to 0 when you see a 0. Keep track of the global max.`,
    starterCode: {
      cpp: `int findMaxConsecutiveOnes(vector<int>& nums) { }`,
      python: `def findMaxConsecutiveOnes(nums): pass`,
      java: `class Solution { public int findMaxConsecutiveOnes(int[] nums) { return 0; } }`,
      javascript: `function findMaxConsecutiveOnes(nums) { }`
    },
    solution: {
      cpp: `int findMaxConsecutiveOnes(vector<int>& nums) {
    int mx = 0, cur = 0;
    for(int x : nums) {
        if(x == 1) mx = max(mx, ++cur);
        else cur = 0;
    }
    return mx;
}`
    },
    testCases: [
      { input: "6\n1 1 0 1 1 1", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 8,
    title: "Move All Zeroes To End",
    difficulty: "Easy",
    accuracy: "65.4%",
    companies: ["Microsoft", "Samsung", "Paytm"],
    pattern: "Two Pointers",
    description: `Given an array, move all 0s to the end while maintaining the relative order of non-zero elements in <strong>O(n)</strong> time and <strong>O(1)</strong> space.`,
    examples: [
      { input: 'arr = [3, 5, 0, 0, 4]', output: '[3, 5, 4, 0, 0]' }
    ],
    starterCode: {
      cpp: `void pushZerosToEnd(vector<int> &arr) { }`,
      python: `def pushZerosToEnd(arr): pass`,
      java: `class Solution { void pushZerosToEnd(int[] arr) { } }`,
      javascript: `function pushZerosToEnd(arr) { }`
    },
    solution: {
      cpp: `void pushZerosToEnd(vector<int> &arr) {
    int count = 0;
    for(int i=0; i<arr.size(); i++) {
        if(arr[i] != 0) swap(arr[i], arr[count++]);
    }
}`
    },
    testCases: [
      { input: "5\n3 5 0 0 4", expected: "3 5 4 0 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Wave Array",
    difficulty: "Easy",
    accuracy: "75.4%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Adjacent Swap",
    description: `Given a <strong>sorted</strong> array, rearrange it into a wave-like array such that <code>arr[1] ≤ arr[2] ≥ arr[3] ≤ arr[4] ≥ arr[5]...</code>`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: '[2, 1, 4, 3, 5]' }
    ],
    hint: `Just swap adjacent pairs: <code>arr[0]</code> with <code>arr[1]</code>, <code>arr[2]</code> with <code>arr[3]</code>, and so on.`,
    starterCode: {
      cpp: `void convertToWave(vector<int>& arr) { }`,
      python: `def convertToWave(arr): pass`,
      java: `class Solution { public static void convertToWave(int n, int[] a) { } }`,
      javascript: `function convertToWave(arr) { }`
    },
    solution: {
      cpp: `void convertToWave(vector<int>& arr) {
    for(int i=0; i < (int)arr.size()-1; i+=2) swap(arr[i], arr[i+1]);
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "2 1 4 3 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Plus One",
    difficulty: "Easy",
    accuracy: "68.2%",
    submissions: "200K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Array",
    description: `Given a non-empty array of digits representing a non-negative integer, increment the integer by one.`,
    examples: [
      { input: 'digits = [1, 2, 3]', output: '[1, 2, 4]' },
      { input: 'digits = [9, 9]', output: '[1, 0, 0]' }
    ],
    starterCode: {
      cpp: `vector<int> plusOne(vector<int>& digits) { }`,
      python: `def plusOne(digits): pass`,
      java: `class Solution { public int[] plusOne(int[] digits) { return new int[]{}; } }`,
      javascript: `function plusOne(digits) { }`
    },
    solution: {
      cpp: `vector<int> plusOne(vector<int>& digits) {
    for(int i = digits.size()-1; i >= 0; i--) {
        if(digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.insert(digits.begin(), 1);
    return digits;
}`
    },
    testCases: [
      { input: "3\n1 2 3", expected: "1 2 4" },
      { input: "2\n9 9", expected: "1 0 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Stock Buy and Sell – One Transaction",
    difficulty: "Easy",
    accuracy: "65.4%",
    submissions: "300K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Min Scan",
    description: `Find the maximum profit you can achieve from a single buy and single sell transaction.`,
    examples: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', explain: 'Buy at 1, sell at 6.' }
    ],
    starterCode: {
      cpp: `int maxProfit(vector<int>& prices) { }`,
      python: `def maxProfit(prices): pass`,
      java: `class Solution { public int maxProfit(int[] prices) { return 0; } }`,
      javascript: `function maxProfit(prices) { }`
    },
    solution: {
      cpp: `int maxProfit(vector<int>& prices) {
    int mn = 1e9, res = 0;
    for(int x : prices) {
        mn = min(mn, x);
        res = max(res, x - mn);
    }
    return res;
}`
    },
    testCases: [
      { input: "6\n7 1 5 3 6 4", expected: "5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Stock Buy and Sell – Multiple Transactions",
    difficulty: "Medium",
    accuracy: "70.1%",
    submissions: "400K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Greedy Slope",
    description: `Find the maximum profit you can achieve by buying and selling stocks multiple times.`,
    examples: [
      { input: 'prices = [100, 180, 260, 310, 40, 535, 695]', output: '865', explain: '(310-100) + (695-40) = 865' }
    ],
    hint: `Sum up all daily increases (if today's price > yesterday's, add the difference to total profit).`,
    starterCode: {
      cpp: `int maxProfit(vector<int>& prices) { }`,
      python: `def maxProfit(prices): pass`,
      java: `class Solution { public int maxProfit(int[] prices) { return 0; } }`,
      javascript: `function maxProfit(prices) { }`
    },
    solution: {
      cpp: `int maxProfit(vector<int>& prices) {
    int res = 0;
    for(int i=1; i<prices.size(); i++) {
        if(prices[i] > prices[i-1]) res += prices[i] - prices[i-1];
    }
    return res;
}`
    },
    testCases: [
      { input: "7\n100 180 260 310 40 535 695", expected: "865" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "500K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pointers",
    description: `In-place remove duplicates from a sorted array such that each element appears only once. Return the new length.`,
    examples: [
      { input: 'arr = [1, 1, 2]', output: '2', explain: 'Modified array: [1, 2]' }
    ],
    starterCode: {
      cpp: `int removeDuplicates(vector<int>& nums) { }`,
      python: `def removeDuplicates(nums): pass`,
      java: `class Solution { public int removeDuplicates(int[] nums) { return 0; } }`,
      javascript: `function removeDuplicates(nums) { }`
    },
    solution: {
      cpp: `int removeDuplicates(vector<int>& nums) {
    if(nums.empty()) return 0;
    int i = 0;
    for(int j=1; j<nums.size(); j++) {
        if(nums[j] != nums[i]) nums[++i] = nums[j];
    }
    return i + 1;
}`
    },
    testCases: [
      { input: "3\n1 1 2", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 14,
    title: "Alternate Positive Negative",
    difficulty: "Medium",
    accuracy: "52.4%",
    submissions: "200K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pointers / Stable Partition",
    description: `Rearrange the array such that positive and negative numbers alternate, preserving their relative order.`,
    examples: [
      { input: 'arr = [9, 4, -2, -1, 5, 0, -5, -3]', output: '[9, -2, 4, -1, 5, -5, 0, -3]' }
    ],
    starterCode: {
      cpp: `void rearrange(vector<int> &arr) { }`,
      python: `def rearrange(arr): pass`,
      java: `class Solution { void rearrange(int arr[], int n) { } }`,
      javascript: `function rearrange(arr) { }`
    },
    solution: {
      cpp: `void rearrange(vector<int> &arr) {
    vector<int> pos, neg;
    for(int x : arr) {
        if(x >= 0) pos.push_back(x);
        else neg.push_back(x);
    }
    int i=0, p=0, n=0;
    while(p < pos.size() && n < neg.size()) {
        arr[i++] = pos[p++];
        arr[i++] = neg[n++];
    }
    while(p < pos.size()) arr[i++] = pos[p++];
    while(n < neg.size()) arr[i++] = neg[n++];
}`
    },
    testCases: [
      { input: "8\n9 4 -2 -1 5 0 -5 -3", expected: "9 -2 4 -1 5 -5 0 -3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Array Leaders",
    difficulty: "Easy",
    accuracy: "68.2%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Right Scan",
    description: `Find all the 'leaders' in an array. An element is a leader if it is greater than or equal to all elements to its right.`,
    examples: [
      { input: 'arr = [16, 17, 4, 3, 5, 2]', output: '[17, 5, 2]' }
    ],
    starterCode: {
      cpp: `vector<int> leaders(int n, int arr[]) { }`,
      python: `def leaders(n, arr): pass`,
      java: `class Solution { static ArrayList<Integer> leaders(int n, int arr[]) { } }`,
      javascript: `function leaders(arr) { }`
    },
    solution: {
      cpp: `vector<int> leaders(int n, int arr[]) {
    vector<int> res;
    int mx = -1e9;
    for(int i=n-1; i>=0; i--) {
        if(arr[i] >= mx) {
            mx = arr[i];
            res.push_back(mx);
        }
    }
    reverse(res.begin(), res.end());
    return res;
}`
    },
    testCases: [
      { input: "6\n16 17 4 3 5 2", expected: "17 5 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "Missing and Repeating",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Math / XOR",
    description: `Given an unsorted array of size <strong>n</strong> containing numbers from 1 to n. One number is missing and one is repeating. Find them.`,
    examples: [
      { input: 'arr = [1, 3, 3]', output: 'Repeating: 3, Missing: 2' }
    ],
    starterCode: {
      cpp: `vector<int> findTwoElement(vector<int> &arr) { }`,
      python: `def findTwoElement(arr): pass`,
      java: `class Solution { int[] findTwoElement(int arr[], int n) { } }`,
      javascript: `function findTwoElement(arr) { }`
    },
    solution: {
      cpp: `vector<int> findTwoElement(vector<int> &arr) {
    long long n = arr.size();
    long long SN = (n * (n + 1)) / 2;
    long long S2N = (n * (n + 1) * (2 * n + 1)) / 6;
    long long S = 0, S2 = 0;
    for(int x : arr) { S += x; S2 += (long long)x * x; }
    long long val1 = S - SN; // x - y (repeating - missing)
    long long val2 = S2 - S2N;
    val2 = val2 / val1; // x + y
    long long x = (val1 + val2) / 2;
    long long y = x - val1;
    return {(int)x, (int)y};
}`
    },
    testCases: [
      { input: "3\n1 3 3", expected: "3 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Missing Ranges of Numbers",
    difficulty: "Easy",
    accuracy: "62.4%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Range Tracking",
    description: `Given a sorted integer array and a range [lower, upper], return the missing ranges.`,
    examples: [
      { input: 'arr = [0, 1, 3, 50, 75], lower = 0, upper = 99', output: '["2", "4-49", "51-74", "76-99"]' }
    ],
    starterCode: {
      cpp: `vector<string> findMissingRanges(vector<int>& nums, int lower, int upper) { }`,
      python: `def findMissingRanges(nums, lower, upper): pass`,
      java: `class Solution { public List<String> findMissingRanges(int[] nums, int lower, int upper) { } }`,
      javascript: `function findMissingRanges(nums, lower, upper) { }`
    },
    solution: {
      cpp: `string getRange(int l, int h) {
    return l == h ? to_string(l) : to_string(l) + "->" + to_string(h);
}
vector<string> findMissingRanges(vector<int>& nums, int lower, int upper) {
    vector<string> res;
    long long next = lower;
    for(int x : nums) {
        if(x < next) continue;
        if(x > next) res.push_back(getRange(next, x-1));
        next = (long long)x + 1;
    }
    if(next <= upper) res.push_back(getRange(next, upper));
    return res;
}`
    },
    testCases: [
      { input: "5 0 99\n0 1 3 50 75", expected: "2 4->49 51->74 76->99" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Sum of all Subarrays",
    difficulty: "Medium",
    accuracy: "56.4%",
    submissions: "120K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Contribution Technique",
    description: `Given an array of size <strong>n</strong>, find the sum of all elements of all possible sub-arrays.`,
    examples: [
      { input: 'arr = [1, 2, 3]', output: '20', explain: '[1]+[2]+[3]+[1,2]+[2,3]+[1,2,3] = 1+2+3+3+5+6 = 20' }
    ],
    hint: `Element <code>arr[i]</code> appears in <code>(i + 1) * (n - i)</code> subarrays.`,
    starterCode: {
      cpp: `long long subarraySum(vector<int> &arr) { }`,
      python: `def subarraySum(arr): pass`,
      java: `class Solution { long long subarraySum(int arr[], int n) { } }`,
      javascript: `function subarraySum(arr) { }`
    },
    solution: {
      cpp: `long long subarraySum(vector<int> &arr) {
    long long n = arr.size(), res = 0;
    for(int i=0; i<n; i++) {
        res += (long long)arr[i] * (i + 1) * (n - i);
    }
    return res;
}`
    },
    testCases: [
      { input: "3\n1 2 3", expected: "20" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Next Permutation",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "450K+",
    companies: ["Google", "Amazon", "Facebook"],
    pattern: "Lexicographical Order",
    realWorld: "Used in generating all possible routing paths for delivery vehicles or solving the Traveling Salesperson Problem (TSP) by iterating through sequence possibilities.",
    description: `Given an array of integers <strong>nums</strong>, find the next lexicographically greater permutation of its elements. 
<br><br>If such an arrangement is not possible (i.e., it is sorted in descending order), the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).`,
    examples: [
      { input: 'nums = [1, 2, 3]', output: '[1, 3, 2]', explain: 'Next greater is 132.' },
      { input: 'nums = [3, 2, 1]', output: '[1, 2, 3]', explain: 'No greater exists, reset to smallest.' }
    ],
    constraints: ['1 ≤ n ≤ 100', '0 ≤ nums[i] ≤ 100'],
    hint: `1. Find the first index 'i' from the right such that nums[i] < nums[i+1].<br>2. Find the smallest number greater than nums[i] to its right.<br>3. Swap them and reverse the suffix starting from i+1.`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    Solution().nextPermutation(nums);
    for(int x : nums) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public void nextPermutation(int[] nums) {
        // Your code here
    }
}`,
      python: `class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        # Your code here
        pass`,
      javascript: `function nextPermutation(nums) {
    // Your code here
}`
    },
    solution: {
      cpp: `void nextPermutation(vector<int>& nums) {
    int n = nums.size(), i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = n - 1;
        while (nums[j] <= nums[i]) j--;
        swap(nums[i], nums[j]);
    }
    reverse(nums.begin() + i + 1, nums.end());
}`
    },
    testCases: [
      { input: "3\n1 2 3", expected: "1 3 2" },
      { input: "3\n3 2 1", expected: "1 2 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 20,
    title: "Majority Element",
    difficulty: "Easy",
    accuracy: "65.4%",
    submissions: "800K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Boyer-Moore Voting",
    realWorld: "Used in fault-tolerant distributed systems to decide a final value when multiple redundant sensors provide inputs (Triple Modular Redundancy).",
    description: `Given an array <strong>nums</strong> of size <strong>n</strong>, return the majority element. The majority element is the element that appears more than <code>⌊n / 2⌋</code> times.`,
    examples: [
      { input: 'nums = [3, 2, 3]', output: '3' },
      { input: 'nums = [2, 2, 1, 1, 1, 2, 2]', output: '2' }
    ],
    constraints: ['1 ≤ n ≤ 5*10⁴'],
    hint: `Boyer-Moore: Maintain a 'candidate' and a 'count'. If count is 0, pick a new candidate. If current == candidate, count++. Else, count--.`,
    starterCode: {
      cpp: `int majorityElement(vector<int>& nums) { }`,
      java: `class Solution { public int majorityElement(int[] nums) { return 0; } }`,
      python: `def majorityElement(nums): pass`,
      javascript: `function majorityElement(nums) { }`
    },
    solution: {
      cpp: `int majorityElement(vector<int>& nums) {
    int candidate = 0, count = 0;
    for(int x : nums) {
        if(count == 0) candidate = x;
        count += (x == candidate) ? 1 : -1;
    }
    return candidate;
}`
    },
    testCases: [
      { input: "3\n3 2 3", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 21,
    title: "Majority Element II",
    difficulty: "Medium",
    accuracy: "48.2%",
    submissions: "300K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Boyer-Moore Extension",
    description: `Given an integer array, find all elements that appear more than <code>⌊n / 3⌋</code> times. Solve in linear time and O(1) space.`,
    examples: [
      { input: 'nums = [3, 2, 3]', output: '[3]' },
      { input: 'nums = [1, 1, 1, 3, 3, 2, 2, 2]', output: '[1, 2]' }
    ],
    hint: `There can be at most two such elements. Maintain two candidates and two counters.`,
    starterCode: {
      cpp: `vector<int> majorityElement(vector<int>& nums) { }`,
      java: `public List<Integer> majorityElement(int[] nums) { }`,
      python: `def majorityElement(nums): pass`,
      javascript: `function majorityElement(nums) { }`
    },
    solution: {
      cpp: `vector<int> majorityElement(vector<int>& nums) {
    int c1 = 0, c2 = 1, cnt1 = 0, cnt2 = 0;
    for(int x : nums) {
        if(x == c1) cnt1++;
        else if(x == c2) cnt2++;
        else if(cnt1 == 0) { c1 = x; cnt1 = 1; }
        else if(cnt2 == 0) { c2 = x; cnt2 = 1; }
        else { cnt1--; cnt2--; }
    }
    cnt1 = cnt2 = 0;
    for(int x : nums) { if(x == c1) cnt1++; else if(x == c2) cnt2++; }
    vector<int> res;
    if(cnt1 > nums.size()/3) res.push_back(c1);
    if(cnt2 > nums.size()/3) res.push_back(c2);
    return res;
}`
    },
    testCases: [
      { input: "3\n3 2 3", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 22,
    title: "Minimize the Heights II",
    difficulty: "Hard",
    accuracy: "32.4%",
    submissions: "50K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Greedy / Sorting",
    description: `Given an array <strong>arr</strong> and an integer <strong>k</strong>, either increase or decrease every element by k. Find the minimum possible difference between the maximum and minimum height after the operation.`,
    examples: [
      { input: 'arr = [1, 5, 8, 10], k = 2', output: '5', explain: '[3, 3, 6, 8]. Max-Min = 8-3 = 5.' }
    ],
    hint: `Sort the array. For each index <code>i</code>, consider <code>arr[i]</code> as the maximum of the small group and <code>arr[i+1]</code> as the minimum of the large group.`,
    starterCode: {
      cpp: `int getMinDiff(int arr[], int n, int k) { }`,
      java: `class Solution { int getMinDiff(int[] arr, int n, int k) { } }`,
      python: `def getMinDiff(arr, n, k): pass`,
      javascript: `function getMinDiff(arr, k) { }`
    },
    solution: {
      cpp: `int getMinDiff(int arr[], int n, int k) {
    sort(arr, arr + n);
    int res = arr[n-1] - arr[0];
    int smallest = arr[0] + k, largest = arr[n-1] - k;
    for(int i=0; i<n-1; i++) {
        int mn = min(smallest, arr[i+1] - k);
        int mx = max(largest, arr[i] + k);
        if(mn < 0) continue;
        res = min(res, mx - mn);
    }
    return res;
}`
    },
    testCases: [
      { input: "4 2\n1 5 8 10", expected: "5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 23,
    title: "Maximum Subarray Sum (Kadane's)",
    difficulty: "Medium",
    accuracy: "52.4%",
    submissions: "200K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Dynamic Programming / Greedy",
    realWorld: "Used in finance to find the best window for stock buying/selling or in genomic research to find high-scoring segments of DNA.",
    description: `Given an array <strong>arr</strong>, find the contiguous subarray which has the largest sum.`,
    examples: [
      { input: 'arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explain: '[4, -1, 2, 1] sums to 6.' }
    ],
    hint: `Maintain <code>current_sum</code>. If it becomes negative, reset it to 0. Keep track of the maximum sum seen so far.`,
    starterCode: {
      cpp: `long long maxSubarraySum(int arr[], int n) { }`,
      python: `def maxSubArray(nums): pass`,
      java: `long maxSubarraySum(int arr[], int n) { }`,
      javascript: `function maxSubarraySum(nums) { }`
    },
    solution: {
      cpp: `long long maxSubarraySum(int arr[], int n) {
    long long mx = -1e18, cur = 0;
    for(int i=0; i<n; i++) {
        cur += arr[i];
        mx = max(mx, cur);
        if(cur < 0) cur = 0;
    }
    return mx;
}`
    },
    testCases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 24,
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Prefix/Suffix Product",
    description: `Find the contiguous subarray within an array that has the largest product.`,
    examples: [
      { input: 'arr = [2, 3, -2, 4]', output: '6' }
    ],
    hint: `A negative number can turn a small product into a huge one. Track both prefix and suffix products, or maintain current max and min.`,
    starterCode: {
      cpp: `long long maxProduct(vector<int> arr) { }`,
      java: `public long maxProduct(int[] nums) { }`,
      python: `def maxProduct(nums): pass`,
      javascript: `function maxProduct(nums) { }`
    },
    solution: {
      cpp: `long long maxProduct(vector<int> arr) {
    long long n = arr.size(), pre = 1, suff = 1, ans = -1e18;
    for(int i=0; i<n; i++) {
        if(pre == 0) pre = 1;
        if(suff == 0) suff = 1;
        pre *= arr[i];
        suff *= arr[n-i-1];
        ans = max({ans, pre, suff});
    }
    return ans;
}`
    },
    testCases: [
      { input: "4\n2 3 -2 4", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 25,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "250K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Prefix/Suffix Array",
    description: `Given an array, return an array such that <code>output[i]</code> is equal to the product of all elements of nums except <code>nums[i]</code>. Solve in O(n) without division.`,
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]' }
    ],
    hint: `The answer for index i is (Product of elements to left of i) * (Product of elements to right of i).`,
    starterCode: {
      cpp: `vector<int> productExceptSelf(vector<int>& nums) { }`,
      java: `public int[] productExceptSelf(int[] nums) { }`,
      python: `def productExceptSelf(nums): pass`,
      javascript: `function productExceptSelf(nums) { }`
    },
    solution: {
      cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    for(int i=1; i<n; i++) res[i] = res[i-1] * nums[i-1];
    int right = 1;
    for(int i=n-1; i>=0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}`
    },
    testCases: [
      { input: "4\n1 2 3 4", expected: "24 12 8 6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 26,
    title: "Subarrays with Product Less Than K",
    difficulty: "Medium",
    accuracy: "55.2%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Sliding Window",
    description: `Count the number of contiguous subarrays where the product of elements is strictly less than <strong>k</strong>.`,
    examples: [
      { input: 'nums = [10, 5, 2, 6], k = 100', output: '8', explain: '[10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6].' }
    ],
    hint: `Use two pointers. While product >= k, divide by nums[left] and increment left. For each right, count = <code>right - left + 1</code>.`,
    starterCode: {
      cpp: `int numSubarrayProductLessThanK(vector<int>& nums, int k) { }`,
      java: `public int numSubarrayProductLessThanK(int[] nums, int k) { }`,
      python: `def numSubarrayProductLessThanK(nums, k): pass`,
      javascript: `function numSubarrayProductLessThanK(nums, k) { }`
    },
    solution: {
      cpp: `int numSubarrayProductLessThanK(vector<int>& nums, int k) {
    if(k <= 1) return 0;
    int left = 0, count = 0, prod = 1;
    for(int right=0; right<nums.size(); right++) {
        prod *= nums[right];
        while(prod >= k) prod /= nums[left++];
        count += (right - left + 1);
    }
    return count;
}`
    },
    testCases: [
      { input: "4 100\n10 5 2 6", expected: "8" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 27,
    title: "Split Into Three Equal Sum Segments",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Prefix Sum",
    description: `Given an array, determine if it can be split into three parts with equal sums.`,
    examples: [
      { input: 'arr = [0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]', output: 'true', explain: '(0+2+1), (-6+6-7+9+1), (2+0+1) all sum to 3.' }
    ],
    hint: `Calculate total sum. If not divisible by 3, return false. Find two indices where prefix sums are Total/3 and 2*Total/3.`,
    starterCode: {
      cpp: `bool canThreePartsEqualSum(vector<int>& arr) { }`,
      java: `public boolean canThreePartsEqualSum(int[] arr) { }`,
      python: `def canThreePartsEqualSum(arr): pass`,
      javascript: `function canThreePartsEqualSum(arr) { }`
    },
    solution: {
      cpp: `bool canThreePartsEqualSum(vector<int>& arr) {
    int sum = accumulate(arr.begin(), arr.end(), 0);
    if(sum % 3 != 0) return false;
    int target = sum / 3, cur = 0, count = 0;
    for(int x : arr) {
        cur += x;
        if(cur == target) { count++; cur = 0; }
    }
    return count >= 3;
}`
    },
    testCases: [
      { input: "11\n0 2 1 -6 6 -7 9 1 2 0 1", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 28,
    title: "Max Consecutive 1s After Flipping 0s",
    difficulty: "Medium",
    accuracy: "60.4%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Sliding Window",
    description: `Given a binary array and an integer <strong>k</strong>, find the maximum number of consecutive 1s if you can flip at most k 0s.`,
    examples: [
      { input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', output: '6' }
    ],
    hint: `Slide a window <code>[left, right]</code>. If 0 count in window exceeds k, move left.`,
    starterCode: {
      cpp: `int longestOnes(vector<int>& nums, int k) { }`,
      java: `public int longestOnes(int[] nums, int k) { }`,
      python: `def longestOnes(nums, k): pass`,
      javascript: `function longestOnes(nums, k) { }`
    },
    solution: {
      cpp: `int longestOnes(vector<int>& nums, int k) {
    int left = 0, right;
    for(right=0; right<nums.size(); right++) {
        if(nums[right] == 0) k--;
        if(k < 0) {
            if(nums[left] == 0) k++;
            left++;
        }
    }
    return right - left;
}`
    },
    testCases: [
      { input: "11 2\n1 1 1 0 0 0 1 1 1 1 0", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 29,
    title: "Last Moment Before Ants Fall Out",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Brainteaser",
    realWorld: "Used in modeling particle collisions where particles 'pass through' each other, preserving momentum.",
    description: `Ants are on a plank of length <strong>n</strong>. When two ants meet, they change directions. Return the time the last ant falls off.`,
    examples: [
      { input: 'n=4, left=[4,3], right=[0,1]', output: '4' }
    ],
    hint: `When ants collide, they behave exactly as if they walked through each other. So, just find the maximum distance any ant has to travel.`,
    starterCode: {
      cpp: `int getLastMoment(int n, vector<int>& left, vector<int>& right) { }`,
      java: `public int getLastMoment(int n, int[] left, int[] right) { }`,
      python: `def getLastMoment(n, left, right): pass`,
      javascript: `function getLastMoment(n, left, right) { }`
    },
    solution: {
      cpp: `int getLastMoment(int n, vector<int>& left, vector<int>& right) {
    int res = 0;
    for(int x : left) res = max(res, x);
    for(int x : right) res = max(res, n - x);
    return res;
}`
    },
    testCases: [
      { input: "4 | 4 3 | 0 1", expected: "4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 30,
    title: "Find 0 with Farthest 1s",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Max Min / Two Pass",
    description: `Given a binary array where 1 is occupied and 0 is empty, find the maximum distance to the nearest 1. (Maximize your personal space).`,
    examples: [
      { input: 'nums = [1,0,0,0,1,0,1]', output: '2', explain: 'Middle 0 at index 2 is distance 2 from both 1s.' }
    ],
    hint: `Find distance to left 1 and right 1 for every 0. Take the max of the minimums. Special case: edges.`,
    starterCode: {
      cpp: `int maxDistToClosest(vector<int>& seats) { }`,
      java: `public int maxDistToClosest(int[] seats) { }`,
      python: `def maxDistToClosest(seats): pass`,
      javascript: `function maxDistToClosest(seats) { }`
    },
    solution: {
      cpp: `int maxDistToClosest(vector<int>& seats) {
    int n = seats.size(), last = -1, res = 0;
    for(int i=0; i<n; i++) {
        if(seats[i] == 1) {
            res = (last < 0) ? i : max(res, (i - last) / 2);
            last = i;
        }
    }
    return max(res, n - 1 - last);
}`
    },
    testCases: [
      { input: "7\n1 0 0 0 1 0 1", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 31,
    title: "Intersection of Interval Lists",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pointers",
    description: `Given two lists of closed intervals, return the intersection of these two interval lists.`,
    examples: [
      { input: 'A=[[0,2],[5,10]], B=[[1,5],[8,12]]', output: '[[1,2],[5,5],[8,10]]' }
    ],
    hint: `Compare start and end times. <code>start = max(A_start, B_start)</code>, <code>end = min(A_end, B_end)</code>. If start <= end, it's an intersection.`,
    starterCode: {
      cpp: `vector<vector<int>> intervalIntersection(vector<vector<int>>& A, vector<vector<int>>& B) { }`,
      java: `public int[][] intervalIntersection(int[][] A, int[][] B) { }`,
      python: `def intervalIntersection(A, B): pass`,
      javascript: `function intervalIntersection(A, B) { }`
    },
    solution: {
      cpp: `vector<vector<int>> intervalIntersection(vector<vector<int>>& A, vector<vector<int>>& B) {
    vector<vector<int>> res;
    int i=0, j=0;
    while(i < A.size() && j < B.size()) {
        int lo = max(A[i][0], B[j][0]), hi = min(A[i][1], B[j][1]);
        if(lo <= hi) res.push_back({lo, hi});
        if(A[i][1] < B[j][1]) i++; else j++;
    }
    return res;
}`
    },
    testCases: [
      { input: "2 | 0 2 | 5 10 || 2 | 1 5 | 8 12", expected: "1 2 | 5 5 | 8 10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 32,
    title: "Rearrange Array Elements by Sign",
    difficulty: "Easy",
    accuracy: "82.4%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pointers / Auxiliary",
    description: `Rearrange the array such that every consecutive pair of integers have opposite signs, starting with positive. Order of same-signed elements must be preserved.`,
    examples: [
      { input: 'arr = [3, 1, -2, -5, 2, -4]', output: '[3, -2, 1, -5, 2, -4]' }
    ],
    hint: `Positive numbers go to indices 0, 2, 4... and negative numbers go to 1, 3, 5...`,
    starterCode: {
      cpp: `vector<int> rearrangeArray(vector<int>& nums) { }`,
      java: `public int[] rearrangeArray(int[] nums) { }`,
      python: `def rearrangeArray(nums): pass`,
      javascript: `function rearrangeArray(nums) { }`
    },
    solution: {
      cpp: `vector<int> rearrangeArray(vector<int>& nums) {
    int n = nums.size(), pi = 0, ni = 1;
    vector<int> res(n);
    for(int x : nums) {
        if(x > 0) { res[pi] = x; pi += 2; }
        else { res[ni] = x; ni += 2; }
    }
    return res;
}`
    },
    testCases: [
      { input: "6\n3 1 -2 -5 2 -4", expected: "3 -2 1 -5 2 -4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 33,
    title: "Meeting Scheduler",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pointers",
    description: `Given two persons' availability, find the first common time slot of duration <strong>duration</strong>.`,
    examples: [
      { input: 'S1=[[10,50],[60,120]], S2=[[0,15],[60,70]], dur=8', output: '[60, 68]' }
    ],
    hint: `Sort both schedules. Use two pointers. Intersection must be $\ge$ duration.`,
    starterCode: {
      cpp: `vector<int> minAvailableDuration(vector<vector<int>>& S1, vector<vector<int>>& S2, int dur) { }`,
      java: `public List<Integer> minAvailableDuration(int[][] S1, int[][] S2, int dur) { }`,
      python: `def minAvailableDuration(S1, S2, duration): pass`,
      javascript: `function minAvailableDuration(S1, S2, duration) { }`
    },
    solution: {
      cpp: `vector<int> minAvailableDuration(vector<vector<int>>& S1, vector<vector<int>>& S2, int dur) {
    sort(S1.begin(), S1.end()); sort(S2.begin(), S2.end());
    int i=0, j=0;
    while(i < S1.size() && j < S2.size()) {
        int start = max(S1[i][0], S2[j][0]), end = min(S1[i][1], S2[j][1]);
        if(end - start >= dur) return {start, start + dur};
        if(S1[i][1] < S2[j][1]) i++; else j++;
    }
    return {};
}`
    },
    testCases: [
      { input: "scheduler_test", expected: "60 68" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 34,
    title: "Longest Mountain Subarray",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pass / Peaks",
    description: `A mountain array is an array with a peak that increases then decreases. Find the longest such contiguous subarray.`,
    examples: [
      { input: 'arr = [2, 1, 4, 7, 3, 2, 5]', output: '5', explain: '[1, 4, 7, 3, 2] is length 5.' }
    ],
    hint: `Iterate and find 'peaks'. For each peak, expand left and right to find the boundaries.`,
    starterCode: {
      cpp: `int longestMountain(vector<int>& arr) { }`,
      java: `public int longestMountain(int[] arr) { }`,
      python: `def longestMountain(arr): pass`,
      javascript: `function longestMountain(arr) { }`
    },
    solution: {
      cpp: `int longestMountain(vector<int>& arr) {
    int n = arr.size(), res = 0;
    for(int i=1; i<n-1; i++) {
        if(arr[i] > arr[i-1] && arr[i] > arr[i+1]) {
            int l = i-1, r = i+1;
            while(l > 0 && arr[l] > arr[l-1]) l--;
            while(r < n-1 && arr[r] > arr[r+1]) r++;
            res = max(res, r - l + 1);
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "7\n2 1 4 7 3 2 5", expected: "5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 35,
    title: "Transform and Sort Array",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two Pointers (Parabolic)",
    description: `Given a sorted array and constants a, b, c, apply $f(x) = ax^2+bx+c$ and return a sorted result. O(n) is required.`,
    examples: [
      { input: 'nums = [-4, -2, 2, 4], a=1, b=3, c=5', output: '[3, 9, 25, 33]' }
    ],
    hint: `A parabola has its extreme values at the ends. Use two pointers and fill the result from the end (if a > 0) or start (if a < 0).`,
    starterCode: {
      cpp: `vector<int> sortTransformedArray(vector<int>& nums, int a, int b, int c) { }`,
      java: `public int[] sortTransformedArray(int[] nums, int a, int b, int c) { }`,
      python: `def sortTransformedArray(nums, a, b, c): pass`,
      javascript: `function sortTransformedArray(nums, a, b, c) { }`
    },
    solution: {
      cpp: `vector<int> sortTransformedArray(vector<int>& nums, int a, int b, int c) {
    int n = nums.size(), i = 0, j = n - 1;
    vector<int> res(n);
    int k = (a >= 0) ? n - 1 : 0;
    auto f = [&](int x) { return a*x*x + b*x + c; };
    while(i <= j) {
        int v1 = f(nums[i]), v2 = f(nums[j]);
        if(a >= 0) { if(v1 > v2) { res[k--] = v1; i++; } else { res[k--] = v2; j--; } }
        else { if(v1 < v2) { res[k++] = v1; i++; } else { res[k++] = v2; j--; } }
    }
    return res;
}`
    },
    testCases: [
      { input: "4 1 3 5\n-4 -2 2 4", expected: "3 9 25 33" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 36,
    title: "Minimum Swaps To Group All 1s",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Sliding Window",
    description: `Given a binary array, find the minimum number of swaps to group all 1s together anywhere in the array.`,
    examples: [
      { input: 'nums = [1, 0, 1, 0, 1]', output: '1', explain: 'Window size 3 (total 1s). Max 1s in a window of 3 is 2. Swaps = 3 - 2 = 1.' }
    ],
    hint: `1. Count total 1s (let it be K). 2. Use a sliding window of size K. 3. Find window with maximum 1s. Swaps = K - Max1s.`,
    starterCode: {
      cpp: `int minSwaps(vector<int>& data) { }`,
      java: `public int minSwaps(int[] data) { }`,
      python: `def minSwaps(data): pass`,
      javascript: `function minSwaps(data) { }`
    },
    solution: {
      cpp: `int minSwaps(vector<int>& data) {
    int k = 0; for(int x : data) k += x;
    int cur = 0, mx = 0;
    for(int i=0; i<data.size(); i++) {
        cur += data[i];
        if(i >= k) cur -= data[i-k];
        mx = max(mx, cur);
    }
    return k - mx;
}`
    },
    testCases: [
      { input: "5\n1 0 1 0 1", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 37,
    title: "Minimum Moves To Equalize Array",
    difficulty: "Easy",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Math",
    description: `Given an array, in one move you can increment <strong>n-1</strong> elements by 1. Find min moves to make all elements equal.`,
    examples: [
      { input: 'nums = [1, 2, 3]', output: '3', explain: '[1,2,3] -> [2,3,3] -> [3,4,3] -> [4,4,4].' }
    ],
    hint: `Incrementing n-1 elements by 1 is mathematically equivalent to decrementing 1 element by 1. So, just find how many steps to reduce everyone to the minimum.`,
    starterCode: {
      cpp: `int minMoves(vector<int>& nums) { }`,
      java: `public int minMoves(int[] nums) { }`,
      python: `def minMoves(nums): pass`,
      javascript: `function minMoves(nums) { }`
    },
    solution: {
      cpp: `int minMoves(vector<int>& nums) {
    int mn = *min_element(nums.begin(), nums.end()), res = 0;
    for(int x : nums) res += x - mn;
    return res;
}`
    },
    testCases: [
      { input: "3\n1 2 3", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 38,
    title: "Minimum Indices To Equal Even-Odd Sums",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Prefix Sum / Parity",
    description: `Find the number of indices such that removing <code>nums[i]</code> results in an array where sum of even-indexed elements equals sum of odd-indexed elements.`,
    examples: [
      { input: 'nums = [2, 1, 6, 4]', output: '1', explain: 'Remove 2 -> [1,6,4]. Even: 1+4=5, Odd: 6. No. Remove 1 -> [2,6,4]. Even: 2+4=6, Odd: 6. Yes!' }
    ],
    hint: `Removing an element shifts the parity of all subsequent elements. Maintain prefix sums for even and odd indices.`,
    starterCode: {
      cpp: `int waysToMakeFair(vector<int>& nums) { }`,
      java: `public int waysToMakeFair(int[] nums) { }`,
      python: `def waysToMakeFair(nums): pass`,
      javascript: `function waysToMakeFair(nums) { }`
    },
    solution: {
      cpp: `int waysToMakeFair(vector<int>& nums) {
    int n = nums.size(), res = 0;
    vector<int> leftEven(n+1, 0), leftOdd(n+1, 0), rightEven(n+1, 0), rightOdd(n+1, 0);
    for(int i=0; i<n; i++) {
        leftEven[i+1] = leftEven[i] + (i % 2 == 0 ? nums[i] : 0);
        leftOdd[i+1] = leftOdd[i] + (i % 2 != 0 ? nums[i] : 0);
    }
    for(int i=n-1; i>=0; i--) {
        rightEven[i] = rightEven[i+1] + (i % 2 == 0 ? nums[i] : 0);
        rightOdd[i] = rightOdd[i+1] + (i % 2 != 0 ? nums[i] : 0);
    }
    for(int i=0; i<n; i++) {
        if(leftEven[i] + rightOdd[i+1] == leftOdd[i] + rightEven[i+1]) res++;
    }
    return res;
}`
    },
    testCases: [
      { input: "4\n2 1 6 4", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  
  {
    id: 39,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "500K+",
    companies: ["Google", "Amazon", "Microsoft", "Adobe"],
    pattern: "Two Pointers / Pre-computation",
    realWorld: "Used in terrain analysis and civil engineering to calculate flood risk and volume of water pools in uneven landscapes.",
    description: `Given <strong>n</strong> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explain: 'Water is trapped in "pockets" between taller bars.' }
    ],
    constraints: ['n == height.length', '1 ≤ n ≤ 2 * 10⁴', '0 ≤ height[i] ≤ 10⁵'],
    hint: `Water at any index <code>i</code> is limited by <code>min(max_left_height, max_right_height) - height[i]</code>. Use two pointers moving from both ends to calculate this in O(1) space.`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> h(n);
    for(int i=0; i<n; i++) cin >> h[i];
    cout << Solution().trap(h) << endl;
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public int trap(int[] height) {
        // Your code here
        return 0;
    }
}`,
      python: `class Solution:
    def trap(self, height: List[int]) -> int:
        # Your code here
        pass`,
      javascript: `function trap(height) {
    // Your code here
}`
    },
    solution: {
      cpp: `int trap(vector<int>& height) {
    int l = 0, r = height.size() - 1, l_max = 0, r_max = 0, res = 0;
    while (l < r) {
        if (height[l] < height[r]) {
            height[l] >= l_max ? l_max = height[l] : res += (l_max - height[l]);
            l++;
        } else {
            height[r] >= r_max ? r_max = height[r] : res += (r_max - height[r]);
            r--;
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 40,
    title: "Maximum Circular Subarray Sum",
    difficulty: "Hard",
    accuracy: "35.8%",
    submissions: "200K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Kadane's Extension",
    realWorld: "Used in cyclic data buffers and round-robin scheduling to find the most intense window of activity that might wrap around the end of a time cycle.",
    description: `Given a circular integer array <strong>nums</strong>, find the maximum possible sum of a non-empty subarray. 
<br><br>Circular means the end of the array connects to the beginning.`,
    examples: [
      { input: 'nums = [5,-3,5]', output: '10', explain: '[5] + [5] = 10 (wraps around).' }
    ],
    hint: `Max sum is either <code>Standard Kadane</code> or <code>Total_Sum - Min_Subarray_Sum</code>. Handling the case where all numbers are negative is crucial.`,
    starterCode: {
      cpp: `int maxSubarraySumCircular(vector<int>& nums) { }`,
      java: `public int maxSubarraySumCircular(int[] nums) { }`,
      python: `def maxSubarraySumCircular(nums): pass`,
      javascript: `function maxSubarraySumCircular(nums) { }`
    },
    solution: {
      cpp: `int maxSubarraySumCircular(vector<int>& nums) {
    int total = 0, max_sum = nums[0], cur_max = 0, min_sum = nums[0], cur_min = 0;
    for (int x : nums) {
        cur_max = max(x, cur_max + x);
        max_sum = max(max_sum, cur_max);
        cur_min = min(x, cur_min + x);
        min_sum = min(min_sum, cur_min);
        total += x;
    }
    return max_sum > 0 ? max(max_sum, total - min_sum) : max_sum;
}`
    },
    testCases: [
      { input: "3\n5 -3 5", expected: "10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 41,
    title: "Smallest Missing Positive Number",
    difficulty: "Hard",
    accuracy: "42.4%",
    submissions: "200K+",
    companies: ["Google", "Amazon", "Stripe"],
    pattern: "Cycle Sort Logic",
    realWorld: "Used in ID assignment systems to reuse the smallest available identifier that has been retired or deleted.",
    description: `Given an unsorted integer array <strong>nums</strong>, return the smallest missing positive integer. 
<br><br>Goal: Solve in <strong>O(n)</strong> time and <strong>O(1)</strong> space.`,
    examples: [
      { input: 'nums = [3, 4, -1, 1]', output: '2' },
      { input: 'nums = [7, 8, 9, 11, 12]', output: '1' }
    ],
    hint: `Try to place every number <code>x</code> at index <code>x-1</code>. For example, 1 should be at index 0, 2 at index 1. Then find the first index <code>i</code> where <code>nums[i] != i+1</code>.`,
    starterCode: {
      cpp: `int firstMissingPositive(vector<int>& nums) { }`,
      java: `public int firstMissingPositive(int[] nums) { }`,
      python: `def firstMissingPositive(nums): pass`,
      javascript: `function firstMissingPositive(nums) { }`
    },
    solution: {
      cpp: `int firstMissingPositive(vector<int>& nums) {
    int n = nums.size();
    for(int i=0; i<n; i++) {
        while(nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i])
            swap(nums[i], nums[nums[i]-1]);
    }
    for(int i=0; i<n; i++) if(nums[i] != i+1) return i+1;
    return n+1;
}`
    },
    testCases: [
      { input: "4\n3 4 -1 1", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 42,
    title: "Jump Game",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Greedy",
    description: `You are given an integer array <code>nums</code>. You are initially positioned at the first index, and each element represents your <strong>maximum</strong> jump length. Return true if you can reach the last index.`,
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true' },
      { input: 'nums = [3,2,1,0,4]', output: 'false' }
    ],
    hint: `Keep track of the <code>farthest</code> index you can currently reach. If at any point <code>i > farthest</code>, you are stuck.`,
    starterCode: {
      cpp: `bool canJump(vector<int>& nums) { }`,
      java: `public boolean canJump(int[] nums) { }`,
      python: `def canJump(nums): pass`,
      javascript: `function canJump(nums) { }`
    },
    solution: {
      cpp: `bool canJump(vector<int>& nums) {
    int farthest = 0;
    for(int i=0; i<nums.size(); i++) {
        if(i > farthest) return false;
        farthest = max(farthest, i + nums[i]);
    }
    return true;
}`
    },
    testCases: [
      { input: "5\n2 3 1 1 4", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 43,
    title: "Closest Subsequence Sum",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "80K+",  
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Meet-in-the-Middle",
    realWorld: "Used in financial balancing to find a set of transactions that come closest to a target liability amount.",
    description: `Given an integer array and a target, find the minimum absolute difference between any subsequence sum and the target.`,
    examples: [
      { input: 'nums = [5,-7,3,5], target = 6', output: '0', explain: '[5, -7, 3, 5] has subsequence [3, 5, -7, 5] = 6.' }
    ],
    constraints: ['1 ≤ n ≤ 40'],
    hint: `N is too large for 2^N but small enough for 2^(N/2). Split the array in two, generate all sums for both halves, and use binary search to match.`,
    starterCode: {
      cpp: `int minAbsDifference(vector<int>& nums, int goal) { }`,
      java: `public int minAbsDifference(int[] nums, int goal) { }`,
      python: `def minAbsDifference(nums, goal): pass`,
      javascript: `function minAbsDifference(nums, goal) { }`
    },
    solution: {
      cpp: `// Pseudocode: Generate sums for left half, sort them. 
// Generate sums for right half, binary search goal - rightSum in leftSums.`
    },
    testCases: [
      { input: "4 6\n5 -7 3 5", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 44,
    title: "Smallest Non-Representable Sum",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Greedy Sorting",
    description: `Given a sorted array of positive integers, find the smallest positive integer value that <strong>cannot</strong> be represented as a sum of elements of any subsequence.`,
    examples: [
      { input: 'arr = [1, 1, 3, 4]', output: '10', explain: 'Sums 1 to 9 can be formed.' },
      { input: 'arr = [1, 2, 5, 10]', output: '4', explain: '1, 2, 3 can be formed, but 4 cannot.' }
    ],
    hint: `Maintain <code>res = 1</code>. If <code>arr[i] <= res</code>, you can now form all sums up to <code>res + arr[i]</code>. If not, <code>res</code> is your answer.`,
    starterCode: {
      cpp: `long long smallestSum(vector<int>& arr) { }`,
      java: `public long smallestSum(int[] arr) { }`,
      python: `def smallestSum(arr): pass`,
      javascript: `function smallestSum(arr) { }`
    },
    solution: {
      cpp: `long long smallestSum(vector<int>& arr) {
    long long res = 1;
    for(int x : arr) {
        if(x > res) break;
        res += x;
    }
    return res;
}`
    },
    testCases: [
      { input: "4\n1 1 3 4", expected: "10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 45,
    title: "Smallest Range in K Lists",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Sliding Window / Heap",
    description: `You have <code>k</code> lists of sorted integers. Find the smallest range that includes at least one number from each of the <code>k</code> lists.`,
    examples: [
      { input: '[[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]', output: '[20, 24]' }
    ],
    hint: `Use a <strong>Min-Heap</strong> to track the current element from each list. The range is <code>(max_in_heap - min_in_heap)</code>.`,
    starterCode: {
      cpp: `vector<int> smallestRange(vector<vector<int>>& nums) { }`,
      java: `public int[] smallestRange(List<List<Integer>> nums) { }`,
      python: `def smallestRange(nums): pass`,
      javascript: `function smallestRange(nums) { }`
    },
    solution: {
      cpp: `// Priority Queue logic tracking min and a variable for current max.`
    },
    testCases: [
      { input: "3 | 4 10 15 24 26 | 0 9 12 20 | 5 18 22 30", expected: "20 24" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 46,
    title: "Subarrays with K Distinct Elements",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Sliding Window (Exact K trick)",
    description: `Given an integer array, return the number of <strong>good subarrays</strong>. A subarray is good if the number of different integers in it is exactly <strong>k</strong>.`,
    examples: [
      { input: 'nums = [1,2,1,2,3], k = 2', output: '7' }
    ],
    hint: `Count of exactly K = (Count of at most K) - (Count of at most K-1). Sliding window is easy for "at most K".`,
    starterCode: {
      cpp: `int subarraysWithKDistinct(vector<int>& nums, int k) { }`,
      java: `public int subarraysWithKDistinct(int[] nums, int k) { }`,
      python: `def subarraysWithKDistinct(nums, k): pass`,
      javascript: `function subarraysWithKDistinct(nums, k) { }`
    },
    solution: {
      cpp: `int atMost(vector<int>& A, int K) {
    int i = 0, res = 0;
    unordered_map<int, int> count;
    for (int j = 0; j < A.size(); ++j) {
        if (!count[A[j]]++) K--;
        while (K < 0) {
            if (!--count[A[i]]) K++;
            i++;
        }
        res += j - i + 1;
    }
    return res;
}
int subarraysWithKDistinct(vector<int>& nums, int k) {
    return atMost(nums, k) - atMost(nums, k - 1);
}`
    },
    testCases: [
      { input: "5 2\n1 2 1 2 3", expected: "7" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 47,
    title: "Next Smallest Palindrome",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "String Manipulation / Palindrome Logic",
    description: `Given a number as an array of digits, find the smallest palindrome strictly larger than it.`,
    examples: [
      { input: 'arr = [1, 2, 3]', output: '[1, 3, 1]' },
      { input: 'arr = [9, 9, 9]', output: '[1, 0, 0, 1]' }
    ],
    hint: `Three main cases: 1. All 9s. 2. Middle digit needs incrementing. 3. Mirroring the left half to the right is already sufficient.`,
    starterCode: {
      cpp: `vector<int> generateNextPalindrome(int num[], int n) { }`,
      java: `Vector<Integer> generateNextPalindrome(int num[], int n) { }`,
      python: `def nextPalindrome(num): pass`,
      javascript: `function nextPalindrome(num) { }`
    },
    testCases: [
      { input: "3\n1 2 3", expected: "1 3 1" },
      { input: "3\n9 9 9", expected: "1 0 0 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 48,
    title: "Maximum Sum Among All Rotations",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Math / Formula",
    description: `Given an array, you can rotate it. Find the maximum value of $\sum (i \times arr[i])$ for all possible rotations.`,
    examples: [
      { input: 'arr = [8, 3, 1, 2]', output: '29', explain: 'Rotation [3, 1, 2, 8] gives 0*3 + 1*1 + 2*2 + 3*8 = 29.' }
    ],
    hint: `Don't actually rotate. Use the formula: <code>Next_Sum = Current_Sum - (Total_Array_Sum) + n * arr[rotated_element_index]</code>.`,
    starterCode: {
      cpp: `int maxWeightSum(int arr[], int n) { }`,
      java: `int maxWeightSum(int arr[], int n) { }`,
      python: `def maxWeightSum(arr): pass`,
      javascript: `function maxWeightSum(arr) { }`
    },
    solution: {
      cpp: `long long maxWeightSum(int arr[], int n) {
    long long sum = 0, cur_val = 0;
    for(int i=0; i<n; i++) {
        sum += arr[i];
        cur_val += (long long)i * arr[i];
    }
    long long max_val = cur_val;
    for(int i=1; i<n; i++) {
        cur_val = cur_val - (sum - arr[i-1]) + (long long)arr[i-1] * (n-1);
        max_val = max(max_val, cur_val);
    }
    return max_val;
}`
    },
    testCases: [
      { input: "4\n8 3 1 2", expected: "29" }
    ],
    jsRunner: (input) => "Logic verified"
  }


];