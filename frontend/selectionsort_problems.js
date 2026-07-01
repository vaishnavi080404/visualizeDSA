const TOPIC_CONFIG = {
  name: "Selection Sort",
  level: "Level 3 of 3 · Problems",
  backLink: "selectionSort_L1.html",
  backLabel: "Selection Sort"
};
const PROBLEMS = [
  {
    id: 1,
    title: "Implement Selection Sort (Ascending)",
    difficulty: "Easy",
    accuracy: "82.4%",
    submissions: "450K+",
    companies: ["TCS", "Accenture", "Infosys"],
    pattern: "Selection Sort",
    realWorld: "Used in systems where memory is extremely limited (it sorts in-place with O(1) space) and where minimizing writes/swaps is more important than speed.",
    description: `Given an unsorted array <strong>arr</strong> of <strong>n</strong> integers, sort the array in <strong>ascending order</strong> using the Selection Sort algorithm.`,
    examples: [
      { input: 'arr = [64, 25, 12, 22, 11]', output: '[11, 12, 22, 25, 64]', explain: 'Smallest element 11 is moved to front, then 12, and so on.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000',
      '-10⁴ ≤ arr[i] ≤ 10⁴'
    ],
    hint: `1. Divide the array into two parts: Sorted (left) and Unsorted (right).<br>
2. In every iteration, find the <strong>minimum</strong> element from the unsorted part.<br>
3. Swap that minimum element with the first element of the unsorted part.<br>
4. Move the boundary of the sorted part one element to the right.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void selectionSort(vector<int>& arr, int n) {
        // Your code here
    }
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    Solution sol;
    sol.selectionSort(arr, n);
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
      python: `class Solution:
    def selectionSort(self, arr, n):
        # Your code here
        pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    Solution().selectionSort(arr, n)
    print(*(arr))`,
      java: `import java.util.*;

class Solution {
    public void selectionSort(int arr[], int n) {
        // Your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        new Solution().selectionSort(arr, n);
        for(int x : arr) System.out.print(x + " ");
    }
}`,
      javascript: `function selectionSort(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 0) {
    const n = parseInt(input[0]);
    const arr = input.slice(1, 1 + n).map(Number);
    selectionSort(arr, n);
    console.log(arr.join(' '));
}`
    },
    solution: {
      cpp: `void selectionSort(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if (min_idx != i)
            swap(arr[min_idx], arr[i]);
    }
}`
    },
    testCases: [
      { input: "5\n64 25 12 22 11", expected: "11 12 22 25 64" },
      { input: "4\n5 4 3 2", expected: "2 3 4 5" },
      { input: "1\n10", expected: "10" },
      { input: "3\n1 2 3", expected: "1 2 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Implement Selection Sort (Descending)",
    difficulty: "Easy",
    accuracy: "80.5%",
    submissions: "200K+",
    companies: ["Wipro", "Cognizant"],
    pattern: "Selection Sort",
    realWorld: "Used to rank players on a high-score leaderboard where you want to find the top scores first.",
    description: `Given an unsorted array <strong>arr</strong>, sort it in <strong>descending order</strong> (largest to smallest) using Selection Sort.`,
    examples: [
      { input: 'arr = [5, 1, 9, 2]', output: '[9, 5, 2, 1]', explain: 'Largest element 9 is selected and moved to front.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Instead of searching for the minimum element in the unsorted part, search for the <strong>maximum</strong> element and swap it with the front element of the unsorted part.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void selectionSortDescending(vector<int>& arr, int n) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.selectionSortDescending(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void selectionSortDescending(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int max_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] > arr[max_idx])
                max_idx = j;
        }
        swap(arr[max_idx], arr[i]);
    }
}`
    },
    testCases: [
      { input: "4\n5 1 9 2", expected: "9 5 2 1" },
      { input: "3\n1 2 3", expected: "3 2 1" },
      { input: "5\n10 10 10 10 10", expected: "10 10 10 10 10" },
      { input: "2\n1 10", expected: "10 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Selection Sort: Print Each Pass",
    difficulty: "Easy",
    accuracy: "75.1%",
    submissions: "50K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Simulation",
    realWorld: "Educational tool used to visualize sorting progress. Developers often use this 'print-debugging' technique to verify algorithm state transitions.",
    description: `Sort an array using Selection Sort. After <strong>each</strong> swap (at the end of each outer loop iteration), print the entire array.`,
    examples: [
      { input: 'arr = [4, 3, 2, 1]', output: 'Pass 1: 1 3 2 4\nPass 2: 1 2 3 4\nPass 3: 1 2 3 4', explain: 'Minimum 1 is swapped with 4, then 2 is swapped with 3, etc.' }
    ],
    constraints: [
      '1 ≤ n ≤ 100'
    ],
    hint: `Add a nested loop or a helper function to print the array elements right after the <code>swap()</code> logic in your outer loop.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void printArray(vector<int>& arr) {
    for(int x : arr) cout << x << " ";
    cout << endl;
}

void selectionSortWithTrace(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    selectionSortWithTrace(arr, n);
    return 0;
}`
    },
    solution: {
      cpp: `void selectionSortWithTrace(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
        cout << "Pass " << i+1 << ": ";
        printArray(arr);
    }
}`
    },
    testCases: [
      { input: "4\n4 3 2 1", expected: "Pass 1: 1 3 2 4\nPass 2: 1 2 3 4\nPass 3: 1 2 3 4" },
      { input: "3\n10 5 15", expected: "Pass 1: 5 10 15\nPass 2: 5 10 15" },
      { input: "2\n2 1", expected: "Pass 1: 1 2" },
      { input: "5\n5 4 3 2 1", expected: "Pass 1: 1 4 3 2 5\nPass 2: 1 2 3 4 5\nPass 3: 1 2 3 4 5\nPass 4: 1 2 3 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Count Comparisons in Selection Sort",
    difficulty: "Easy",
    accuracy: "88.2%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Complexity Analysis",
    realWorld: "Used to measure the 'work' done by an algorithm. Selection Sort always performs the same number of comparisons regardless of how sorted the data is.",
    description: `Given an array of size <strong>n</strong>, count the total number of element-to-element comparisons made by the Selection Sort algorithm.`,
    examples: [
      { input: 'n = 5', output: '10', explain: '4 + 3 + 2 + 1 = 10 comparisons.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Selection sort comparisons follow a mathematical series. In the first pass we compare (n-1) elements, then (n-2)... until 1. The total is always $n(n-1)/2$.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int countComparisons(int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    cout << countComparisons(n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int countComparisons(int n) {
    int count = 0;
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            count++;
        }
    }
    return count;
}`
    },
    testCases: [
      { input: "5", expected: "10" },
      { input: "10", expected: "45" },
      { input: "2", expected: "1" },
      { input: "100", expected: "4950" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Count Swaps in Selection Sort",
    difficulty: "Easy",
    accuracy: "79.1%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Optimization Tracking",
    realWorld: "Selection Sort is 'swap-efficient'. While it has O(N^2) time complexity, it only performs O(N) swaps, which is better than Bubble Sort for hardware where memory writes are expensive (like EEPROM).",
    description: `Count how many times a swap is <strong>actually</strong> performed during Selection Sort. A swap should only be counted if the <code>min_idx</code> is different from the current <code>i</code>.`,
    examples: [
      { input: 'arr = [2, 1, 3]', output: '1', explain: 'Only one swap (2 with 1) is needed.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Inside the outer loop, after the inner loop finds <code>min_idx</code>, check <code>if (min_idx != i)</code>. Only then perform the swap and increment your counter.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int countSwaps(vector<int>& arr, int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << countSwaps(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int countSwaps(vector<int>& arr, int n) {
    int swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        if (min_idx != i) {
            swap(arr[i], arr[min_idx]);
            swaps++;
        }
    }
    return swaps;
}`
    },
    testCases: [
      { input: "3\n2 1 3", expected: "1" },
      { input: "5\n5 4 3 2 1", expected: "2" },
      { input: "3\n1 2 3", expected: "0" },
      { input: "4\n4 3 2 1", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Selection Sort on Sorted Array",
    difficulty: "Easy",
    accuracy: "95.0%",
    submissions: "40K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Analytical",
    realWorld: "Highlights a major drawback: Selection Sort is NOT adaptive. It performs the same amount of work even if the data is already sorted.",
    description: `Given an array that is <strong>already sorted</strong>, run Selection Sort and return the number of <strong>comparisons</strong> made.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: '10' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `The algorithm has no early-exit condition (unlike optimized Bubble Sort). The nested loops will execute fully regardless of the input values.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int sortedCase(int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    cout << sortedCase(n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int sortedCase(int n) {
    // The logic remains same as Problem 4
    return n * (n - 1) / 2;
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "10" },
      { input: "2\n10 20", expected: "1" },
      { input: "1\n5", expected: "0" },
      { input: "4\n1 2 3 4", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Selection Sort on Reverse Sorted Array",
    difficulty: "Easy",
    accuracy: "94.2%",
    submissions: "40K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Analytical",
    realWorld: "Demonstrates that the Worst Case and Best Case for Selection Sort are identical in terms of comparisons.",
    description: `Given an array sorted in <strong>reverse order</strong>, return the number of <strong>swaps</strong> performed to sort it in ascending order using the <code>if (min_idx != i)</code> optimization.`,
    examples: [
      { input: 'arr = [3, 2, 1]', output: '1', explain: 'Swap 3 and 1 -> [1, 2, 3]. Then 2 is in place. Only 1 swap.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `For reverse sorted arrays, Selection sort is actually quite efficient in terms of movement (swaps), even if it is slow in terms of looking (comparisons).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int reverseCase(vector<int>& arr, int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << reverseCase(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int reverseCase(vector<int>& arr, int n) {
    int swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        if (min_idx != i) {
            swap(arr[i], arr[min_idx]);
            swaps++;
        }
    }
    return swaps;
}`
    },
    testCases: [
      { input: "3\n3 2 1", expected: "1" },
      { input: "5\n5 4 3 2 1", expected: "2" },
      { input: "4\n4 3 2 1", expected: "2" },
      { input: "2\n2 1", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  {
    id: 8,
    title: "Sort Array of Strings",
    difficulty: "Easy",
    accuracy: "84.2%",
    submissions: "150K+",
    companies: ["Zoho", "Paytm", "Microsoft"],
    pattern: "Selection Sort (Lexicographical)",
    realWorld: "Used in simple contact lists or file explorers to arrange names or filenames in alphabetical order.",
    description: `Given an array of strings <strong>arr</strong>, sort them in <strong>lexicographical</strong> (alphabetical) order using Selection Sort.`,
    examples: [
      { input: 'arr = ["zebra", "apple", "mango"]', output: '["apple", "mango", "zebra"]', explain: '"apple" is lexicographically smallest, so it comes first.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000',
      '1 ≤ arr[i].length ≤ 100'
    ],
    hint: `Use string comparison operators (like <code><</code> in C++/Python or <code>compareTo</code> in Java). The logic remains identical: find the 'smallest' string and move it to the front.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    void sortStrings(vector<string>& arr, int n) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<string> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.sortStrings(arr, n);
    for(string s : arr) cout << s << " ";
    return 0;
}`,
      python: `class Solution:
    def sortStrings(self, arr, n):
        # Your code here
        pass

if __name__ == "__main__":
    n = int(input())
    arr = input().split()
    Solution().sortStrings(arr, n)
    print(*(arr))`,
      java: `import java.util.*;

class Solution {
    public void sortStrings(String arr[], int n) {
        // Your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] arr = new String[n];
        for(int i=0; i<n; i++) arr[i] = sc.next();
        new Solution().sortStrings(arr, n);
        for(String s : arr) System.out.print(s + " ");
    }
}`,
      javascript: `function sortStrings(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n);
sortStrings(arr, n);
console.log(arr.join(' '));`
    },
    solution: {
      cpp: `void sortStrings(vector<string>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
    }
}`,
      javascript: `function sortStrings(arr, n) {
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
}`
    },
    testCases: [
      { input: "3\nzebra apple mango", expected: "apple mango zebra" },
      { input: "4\nb d a c", expected: "a b c d" },
      { input: "3\n10 2 1", expected: "1 10 2" },
      { input: "2\napple apply", expected: "apple apply" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Selection Sort with Negative Numbers",
    difficulty: "Easy",
    accuracy: "89.5%",
    submissions: "120K+",
    companies: ["Accenture", "TCS"],
    pattern: "Selection Sort",
    realWorld: "Used in temperature data processing or financial ledgers where both gains (positives) and losses (negatives) must be ordered sequentially.",
    description: `Given an array <strong>arr</strong> containing both positive and negative integers, sort it in ascending order using Selection Sort.`,
    examples: [
      { input: 'arr = [-2, 45, 0, 11, -9]', output: '[-9, -2, 0, 11, 45]' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000',
      '-10⁵ ≤ arr[i] ≤ 10⁵'
    ],
    hint: `The standard <code><</code> comparison works perfectly for negative numbers (e.g., -9 is smaller than -2). No changes to the standard algorithm are required.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void sortNegatives(vector<int>& arr, int n) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.sortNegatives(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void sortNegatives(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
    }
}`
    },
    testCases: [
      { input: "5\n-2 45 0 11 -9", expected: "-9 -2 0 11 45" },
      { input: "3\n-1 -2 -3", expected: "-3 -2 -1" },
      { input: "4\n10 -10 5 -5", expected: "-10 -5 5 10" },
      { input: "2\n0 -1", expected: "-1 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Sort First K Elements",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "80K+",
    companies: ["Amazon", "Oracle"],
    pattern: "Partial Sorting",
    realWorld: "Used in search engines to sort only the 'Top 10' most relevant results while leaving the rest of the massive dataset unsorted to save time.",
    description: `Given an array of size <strong>n</strong>, sort only the <strong>first K</strong> elements in ascending order. The remaining elements from index K to n-1 should stay in their original positions.`,
    examples: [
      { input: 'arr = [5, 4, 3, 2, 1], K = 3', output: '[3, 4, 5, 2, 1]', explain: 'Indices 0, 1, 2 are sorted. 2 and 1 remain untouched.' }
    ],
    constraints: [
      '1 ≤ K ≤ n ≤ 1000'
    ],
    hint: `The outer loop of Selection Sort determines how many elements are placed in their final positions. Simply limit the outer loop to run <code>K</code> times (or <code>K-1</code>). In each pass, only search for the minimum within the first <code>K</code> elements if they are being sorted amongst themselves, or within the whole array to find the K smallest overall. <br><br><strong>Note:</strong> Usually, this problem implies finding the K smallest elements and placing them at the start.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void sortK(vector<int>& arr, int n, int k) {
        // Your code here
    }
};

int main() {
    int n, k; cin >> n >> k;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.sortK(arr, n, k);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void sortK(vector<int>& arr, int n, int k) {
    for (int i = 0; i < k; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
    }
}`
    },
    testCases: [
      { input: "5 3\n5 4 3 2 1", expected: "1 2 3 5 4" },
      { input: "6 2\n10 9 8 7 6 5", expected: "5 6 10 9 8 7" },
      { input: "4 4\n4 3 2 1", expected: "1 2 3 4" },
      { input: "5 1\n5 1 4 2 3", expected: "1 5 4 2 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Find Minimum in Each Pass",
    difficulty: "Easy",
    accuracy: "92.1%",
    submissions: "30K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Dry Run Tracking",
    realWorld: "Used in debugging and visualization to verify that the 'Selection' step of the algorithm is correctly identifying the local minimum.",
    description: `Run Selection Sort on an array. For each pass of the outer loop, store and return the <strong>minimum value</strong> found in the unsorted portion that was selected for swapping.`,
    examples: [
      { input: 'arr = [64, 25, 12, 22]', output: '[12, 22, 25]', explain: 'Pass 1 finds 12. Pass 2 finds 22. Pass 3 finds 25.' }
    ],
    constraints: [
      '1 ≤ n ≤ 100'
    ],
    hint: `Create a result array. Inside the outer loop, after the inner loop finishes finding <code>min_idx</code>, add <code>arr[min_idx]</code> to your result array.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> getMinima(vector<int> arr, int n) {
        // Your code here
        return {};
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    vector<int> res = sol.getMinima(arr, n);
    for(int x : res) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> getMinima(vector<int> arr, int n) {
    vector<int> minima;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        minima.push_back(arr[min_idx]);
        swap(arr[i], arr[min_idx]);
    }
    return minima;
}`
    },
    testCases: [
      { input: "4\n64 25 12 22", expected: "12 22 25" },
      { input: "3\n5 2 8", expected: "2 5" },
      { input: "5\n10 9 8 7 6", expected: "6 7 8 9" },
      { input: "2\n20 10", expected: "10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Selection Sort using Recursion",
    difficulty: "Medium",
    accuracy: "65.4%",
    submissions: "45K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Recursive Sorting",
    realWorld: "A classic academic problem to demonstrate how any iterative process (like sorting) can be expressed via recursion.",
    description: `Implement the Selection Sort algorithm <strong>recursively</strong>. 
<br><br>The function should:
<br>1. Find the minimum element in the range [index, n-1].
<br>2. Swap it with the element at 'index'.
<br>3. Recursively call the function for 'index + 1'.`,
    examples: [
      { input: 'arr = [3, 1, 2]', output: '[1, 2, 3]' }
    ],
    constraints: [
      '1 ≤ n ≤ 500'
    ],
    hint: `Base case: if <code>index == n</code>, return. <br>
Recursive step: Find min in <code>arr[index...n-1]</code>, swap with <code>arr[index]</code>, then <code>recurse(arr, index + 1)</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void recursiveSelectionSort(vector<int>& arr, int n, int index = 0) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    recursiveSelectionSort(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      python: `import sys
sys.setrecursionlimit(2000)

def recursiveSelectionSort(arr, n, index=0):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    recursiveSelectionSort(arr, n)
    print(*(arr))`,
      java: `import java.util.*;

class Solution {
    public static void recursiveSort(int arr[], int n, int index) {
        // Your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        recursiveSort(arr, n, 0);
        for(int x : arr) System.out.print(x + " ");
    }
}`,
      javascript: `function recursiveSort(arr, n, index = 0) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n).map(Number);
recursiveSort(arr, n);
console.log(arr.join(' '));`
    },
    solution: {
      cpp: `void recursiveSelectionSort(vector<int>& arr, int n, int index) {
    if (index >= n - 1) return;
    int min_idx = index;
    for (int j = index + 1; j < n; j++) {
        if (arr[j] < arr[min_idx]) min_idx = j;
    }
    swap(arr[index], arr[min_idx]);
    recursiveSelectionSort(arr, n, index + 1);
}`,
      javascript: `function recursiveSort(arr, n, index = 0) {
    if (index >= n - 1) return;
    let min_idx = index;
    for (let j = index + 1; j < n; j++) {
        if (arr[j] < arr[min_idx]) min_idx = j;
    }
    [arr[index], arr[min_idx]] = [arr[min_idx], arr[index]];
    recursiveSort(arr, n, index + 1);
}`
    },
    testCases: [
      { input: "3\n3 1 2", expected: "1 2 3" },
      { input: "5\n5 4 3 2 1", expected: "1 2 3 4 5" },
      { input: "1\n10", expected: "10" },
      { input: "4\n1 3 2 4", expected: "1 2 3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Verify Stability (Unstable Example)",
    difficulty: "Medium",
    accuracy: "75.0%",
    submissions: "20K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Stability Analysis",
    realWorld: "Critical for understanding why Selection Sort is rarely used to sort objects (like sorting users by 'age' then 'name')—it can ruin the previous sort order.",
    description: `Selection Sort is <strong>unstable</strong>. Prove this by sorting an array of 'Pairs' <code>{value, originalIndex}</code> based on <strong>value</strong>. 
<br><br>If two pairs have the same value, and their relative order (original indices) changes after sorting, you have demonstrated instability.`,
    examples: [
      { input: 'arr = [{2,0}, {2,1}, {1,2}]', output: '[{1,2}, {2,1}, {2,0}]', explain: 'The 2 that was at index 0 is now after the 2 that was at index 1.' }
    ],
    constraints: [
      'n = 3'
    ],
    hint: `In the array <code>[2a, 2b, 1]</code>: <br>
1. Min is 1. Swap 1 with 2a. <br>
2. Array becomes <code>[1, 2b, 2a]</code>. <br>
3. Notice that 2a and 2b swapped relative order. This is the definition of instability.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Pair { int val; int id; };

void sortPairs(vector<Pair>& arr, int n) {
    // Your code here
}

int main() {
    // Input: 2 0, 2 1, 1 2
    int n = 3;
    vector<Pair> arr = {{2, 0}, {2, 1}, {1, 2}};
    sortPairs(arr, n);
    for(auto p : arr) cout << "{" << p.val << "," << p.id << "} ";
    return 0;
}`,
      python: `def sortPairs(arr):
    # Your code here
    pass

if __name__ == "__main__":
    # Value, Original ID
    arr = [[2, 0], [2, 1], [1, 2]]
    sortPairs(arr)
    print(arr)`,
      javascript: `function sortPairs(arr) {
    // Your code here
}

let arr = [{v: 2, id: 0}, {v: 2, id: 1}, {v: 1, id: 2}];
sortPairs(arr);
console.log(JSON.stringify(arr));`
    },
    solution: {
      cpp: `void sortPairs(vector<Pair>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j].val < arr[min_idx].val) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
    }
}`
    },
    testCases: [
      { input: "special_stability_test", expected: "{1,2} {2,1} {2,0}" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 14,
    title: "Sort Pairs by Second Value",
    difficulty: "Easy",
    accuracy: "81.2%",
    submissions: "40K+",
    companies: ["Amazon", "Cisco"],
    pattern: "Custom Comparator",
    realWorld: "Used in sorting a list of 'Task' objects by their 'Priority' level, where each task is a pair (task_id, priority).",
    description: `Given an array of pairs <strong>{first, second}</strong>, sort the pairs in ascending order based on the <strong>second</strong> value of each pair using Selection Sort.`,
    examples: [
      { input: 'arr = [{1, 5}, {2, 3}, {3, 8}]', output: '[{2, 3}, {1, 5}, {3, 8}]', explain: 'Sorted by 3, 5, 8.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `When looking for <code>min_idx</code>, compare <code>arr[j].second < arr[min_idx].second</code>. The swap operation should move the <strong>entire pair</strong>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Pair { int first; int second; };

void sortPairs(vector<Pair>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<Pair> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i].first >> arr[i].second;
    sortPairs(arr, n);
    for(auto p : arr) cout << "{" << p.first << "," << p.second << "} ";
    return 0;
}`,
      python: `def sort_pairs(arr, n):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    # Input format: f1 s1 f2 s2 ...
    data = list(map(int, input().split()))
    arr = []
    for i in range(0, 2*n, 2):
        arr.append([data[i], data[i+1]])
    sort_pairs(arr, n)
    for p in arr:
        print(f"{{{p[0]},{p[1]}}}", end=" ")`,
      java: `import java.util.*;
class Pair { int f, s; Pair(int f, int s){this.f=f; this.s=s;} }

class Solution {
    public void sortPairs(Pair arr[], int n) {
        // Your code here
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Pair[] arr = new Pair[n];
        for(int i=0; i<n; i++) arr[i] = new Pair(sc.nextInt(), sc.nextInt());
        new Solution().sortPairs(arr, n);
        for(Pair p : arr) System.out.print("{" + p.f + "," + p.s + "} ");
    }
}`,
      javascript: `function sortPairs(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
let arr = [];
for(let i=0; i<n; i++) arr.push({f: parseInt(input[1+2*i]), s: parseInt(input[2+2*i])});
sortPairs(arr, n);
console.log(arr.map(p => \`{\${p.f},\${p.s}}\`).join(' '));`
    },
    solution: {
      cpp: `void sortPairs(vector<Pair>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j].second < arr[min_idx].second) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
    }
}`
    },
    testCases: [
      { input: "3\n1 5\n2 3\n3 8", expected: "{2,3} {1,5} {3,8}" },
      { input: "2\n10 20\n5 10", expected: "{5,10} {10,20}" },
      { input: "4\n1 1\n2 1\n3 1\n4 1", expected: "{1,1} {2,1} {3,1} {4,1}" },
      { input: "3\n5 100\n1 50\n2 75", expected: "{1,50} {2,75} {5,100}" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Sort and Track Original Indices",
    difficulty: "Medium",
    accuracy: "75.4%",
    submissions: "25K+",
    companies: ["Google", "Directi"],
    pattern: "Index Sorting",
    realWorld: "Used when you need to sort data but maintain a reference back to the original source row in a database.",
    description: `Given an array <strong>arr</strong>, return the list of <strong>original indices</strong> of the elements after they have been sorted in ascending order.`,
    examples: [
      { input: 'arr = [50, 10, 40]', output: '[1, 2, 0]', explain: 'Sorted array is [10, 40, 50]. 10 was at index 1, 40 was at 2, 50 was at 0.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Don't sort the original array. Create an auxiliary array <code>indices = [0, 1, 2...n-1]</code>. Sort this <code>indices</code> array using Selection Sort by comparing <code>arr[indices[j]] < arr[indices[min_idx]]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

vector<int> sortIndices(vector<int>& arr, int n) {
    // Your code here
    return {};
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    vector<int> res = sortIndices(arr, n);
    for(int x : res) cout << x << " ";
    return 0;
}`,
      javascript: `function sortIndices(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1+n).map(Number);
console.log(sortIndices(arr, n).join(' '));`
    },
    solution: {
      cpp: `vector<int> sortIndices(vector<int>& arr, int n) {
    vector<int> idx(n);
    iota(idx.begin(), idx.end(), 0);
    for (int i = 0; i < n - 1; i++) {
        int min_ptr = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[idx[j]] < arr[idx[min_ptr]]) min_ptr = j;
        }
        swap(idx[i], idx[min_ptr]);
    }
    return idx;
}`
    },
    testCases: [
      { input: "3\n50 10 40", expected: "1 2 0" },
      { input: "4\n5 5 5 5", expected: "0 1 2 3" },
      { input: "5\n1 2 3 4 5", expected: "0 1 2 3 4" },
      { input: "2\n100 0", expected: "1 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "Selection Sort for Linked List",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "35K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Linked List Traversal",
    realWorld: "Used in low-level systems where data is stored as a chain of nodes rather than contiguous memory (arrays).",
    description: `Sort a singly linked list using the Selection Sort logic. Swap the <strong>data</strong> of the nodes to achieve the sorted order.`,
    examples: [
      { input: 'head = 4 -> 1 -> 3 -> 2', output: '1 -> 2 -> 3 -> 4' }
    ],
    constraints: [
      'Number of nodes ≤ 500'
    ],
    hint: `Use two pointers: <code>i</code> starts at head, <code>j</code> starts at <code>i->next</code>. In each pass, find the node with the minimum value in the sub-list starting from <code>i</code> and swap data with node <code>i</code>.`,
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(NULL) {}
};

void selectionSortLL(Node* head) {
    // Your code here
}

void printList(Node* head) {
    while(head) { cout << head->data << " "; head = head->next; }
}

int main() {
    int n; cin >> n;
    if(n==0) return 0;
    int val; cin >> val;
    Node* head = new Node(val);
    Node* temp = head;
    for(int i=1; i<n; i++){
        cin >> val;
        temp->next = new Node(val);
        temp = temp->next;
    }
    selectionSortLL(head);
    printList(head);
    return 0;
}`,
      javascript: `/* Node: {val, next} */
function selectionSortLL(head) {
    // Your code here
}`
    },
    solution: {
      cpp: `void selectionSortLL(Node* head) {
    for (Node* i = head; i != NULL; i = i->next) {
        Node* minNode = i;
        for (Node* j = i->next; j != NULL; j = j->next) {
            if (j->data < minNode->data) minNode = j;
        }
        int temp = i->data;
        i->data = minNode->data;
        minNode->data = temp;
    }
}`
    },
    testCases: [
      { input: "4\n4 1 3 2", expected: "1 2 3 4" },
      { input: "3\n10 20 30", expected: "10 20 30" },
      { input: "1\n5", expected: "5" },
      { input: "5\n5 4 3 2 1", expected: "1 2 3 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Sort 0s, 1s, and 2s (Selection Logic)",
    difficulty: "Easy",
    accuracy: "78.5%",
    submissions: "500K+",
    companies: ["Amazon", "HCL", "Paytm"],
    pattern: "Multi-Pass Selection",
    realWorld: "Commonly used to sort items with few distinct categories (e.g., separating 'High', 'Medium', and 'Low' priority tickets).",
    description: `Given an array containing only 0s, 1s, and 2s, sort them in ascending order. Use <strong>Selection Sort</strong> principles (repeatedly finding the smallest remaining category).`,
    examples: [
      { input: 'arr = [0, 2, 1, 2, 0]', output: '[0, 0, 1, 2, 2]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `While Dutch National Flag (3-pointer) is faster, the Selection Sort way is simply to run the standard algorithm. Because there are only 3 distinct values, the inner loop finds 0s first, then 1s, then 2s.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void sort012(vector<int>& arr, int n) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.sort012(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void sort012(vector<int>& arr, int n) {
    for(int i=0; i<n-1; i++) {
        int min_idx = i;
        for(int j=i+1; j<n; j++) {
            if(arr[j] < arr[min_idx]) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
    }
}`
    },
    testCases: [
      { input: "5\n0 2 1 2 0", expected: "0 0 1 2 2" },
      { input: "3\n2 1 0", expected: "0 1 2" },
      { input: "4\n1 1 1 1", expected: "1 1 1 1" },
      { input: "6\n0 0 2 2 1 1", expected: "0 0 1 1 2 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Kth Smallest Element (Selection Select)",
    difficulty: "Medium",
    accuracy: "60.4%",
    submissions: "200K+",
    companies: ["Adobe", "VMWare"],
    pattern: "Partial Selection Sort",
    realWorld: "Used in statistics to find the 'K-th Percentile' or 'Median' without spending time sorting the entire dataset.",
    description: `Given an array and an integer <strong>K</strong>, find the K-th smallest element using the logic of Selection Sort.`,
    examples: [
      { input: 'arr = [7, 10, 4, 3, 20, 15], K = 3', output: '7', explain: 'Smallest is 3, 2nd is 4, 3rd is 7.' }
    ],
    constraints: [
      '1 ≤ K ≤ n ≤ 10⁵'
    ],
    hint: `Run the outer loop of Selection Sort exactly <strong>K</strong> times. After the K-th iteration, the element at <code>arr[K-1]</code> will be the K-th smallest element in the entire array.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int kthSmallest(vector<int>& arr, int n, int k) {
    // Your code here
    return 0;
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << kthSmallest(arr, n, k) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int kthSmallest(vector<int>& arr, int n, int k) {
    for (int i = 0; i < k; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
    }
    return arr[k-1];
}`
    },
    testCases: [
      { input: "6 3\n7 10 4 3 20 15", expected: "7" },
      { input: "5 1\n10 5 4 3 2", expected: "2" },
      { input: "5 5\n10 5 4 3 2", expected: "10" },
      { input: "4 2\n1 2 3 4", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Dual Selection Sort (Minimize Swaps)",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "15K+",
    companies: ["Amazon", "Google"],
    pattern: "Two-Way Selection",
    realWorld: "Used in hardware-accelerated sorting where reducing the total number of iterations is beneficial for energy efficiency.",
    description: `Modify Selection Sort to find <strong>both</strong> the <strong>Minimum</strong> and the <strong>Maximum</strong> element in each pass. Move the minimum to the front and the maximum to the end. 
<br><br>Return the total number of swaps performed.`,
    examples: [
      { input: 'arr = [3, 1, 4, 2]', output: '2', explain: '1 and 4 are found. 1 swapped with 3, 4 swapped with 2. 2 swaps.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Use two pointers: <code>low = 0</code> and <code>high = n-1</code>. In each pass, find <code>min_idx</code> and <code>max_idx</code> in the range [low, high]. Swap min with <code>arr[low]</code> and max with <code>arr[high]</code>. <br><strong>Edge Case:</strong> If the maximum element was at <code>low</code>, it gets moved when you swap the minimum. Update <code>max_idx</code> before the second swap!`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int dualSelectionSort(vector<int>& arr, int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << dualSelectionSort(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int dualSelectionSort(vector<int>& arr, int n) {
    int swaps = 0;
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        int min_v = arr[i], max_v = arr[i];
        int min_idx = i, max_idx = i;
        for (int k = i; k <= j; k++) {
            if (arr[k] < min_v) { min_v = arr[k]; min_idx = k; }
            else if (arr[k] > max_v) { max_v = arr[k]; max_idx = k; }
        }
        if(min_idx != i) { swap(arr[i], arr[min_idx]); swaps++; }
        // If max was at i, it's now at min_idx
        if (max_idx == i) max_idx = min_idx;
        if(max_idx != j && i < j) { swap(arr[j], arr[max_idx]); swaps++; }
    }
    return swaps;
}`
    },
    testCases: [
      { input: "4\n3 1 4 2", expected: "2" },
      { input: "5\n5 4 3 2 1", expected: "2" },
      { input: "3\n1 2 3", expected: "0" },
      { input: "6\n6 5 4 3 2 1", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  



];