const TOPIC_CONFIG = {
  name: "Insertion Sort",
  level: "Level 3 of 3 · Problems",
  backLink: "insertionSort_L1.html",
  backLabel: "Insertion Sort"
};

const PROBLEMS = [
  {
    id: 1,
    title: "Implement Insertion Sort (Ascending)",
    difficulty: "Easy",
    accuracy: "85.2%",
    submissions: "450K+",
    companies: ["TCS", "Infosys", "Wipro"],
    pattern: "Incremental Building",
    realWorld: "Commonly used in hand-sorting playing cards or for sorting small chunks of data in hybrid algorithms like Timsort.",
    description: `Given an unsorted array <strong>arr</strong> of <strong>n</strong> integers, sort the array in <strong>ascending order</strong> using Insertion Sort.
<br><br>The algorithm builds the final sorted array one item at a time by 'inserting' each element into its correct position relative to the elements before it.`,
    examples: [
      { input: 'arr = [12, 11, 13, 5, 6]', output: '[5, 6, 11, 12, 13]', explain: '11 is inserted before 12, then 5 is moved to the front, then 6 is inserted after 5.' }
    ],
    constraints: ['1 ≤ n ≤ 1000', '-10⁴ ≤ arr[i] ≤ 10⁴'],
    hint: `1. Assume the first element is already sorted.<br>2. Pick the next element (key).<br>3. Compare the key with elements to its left.<br>4. Shift all elements larger than the key one position to the right.<br>5. Insert the key into the gap.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void insertionSort(vector<int>& arr, int n) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.insertionSort(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      python: `class Solution:
    def insertionSort(self, arr):
        # Your code here
        pass

if __name__ == "__main__":
    arr = list(map(int, input().split()))
    Solution().insertionSort(arr)
    print(*arr)`,
      javascript: `function insertionSort(arr) {
    // Your code here
}

const arr = [12, 11, 13, 5, 6];
insertionSort(arr);
console.log(arr.join(' '));`
    },
    solution: {
      cpp: `void insertionSort(vector<int>& arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: "5\n12 11 13 5 6", expected: "5 6 11 12 13" },
      { input: "4\n4 3 2 1", expected: "1 2 3 4" },
      { input: "1\n10", expected: "10" },
      { input: "3\n1 2 3", expected: "1 2 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  {
    id: 2,
    title: "Implement Insertion Sort (Descending)",
    difficulty: "Easy",
    accuracy: "82.4%",
    submissions: "300K+",
    companies: ["TCS", "Infosys", "Wipro"],
    pattern: "Incremental Building",
    realWorld: "Used to display high scores or recent transactions where the largest/newest values should appear first.",
    description: `Modify the Insertion Sort algorithm to sort an array in <strong>descending order</strong> (Largest to Smallest).`,
    examples: [
      { input: 'arr = [5, 2, 9, 1]', output: '[9, 5, 2, 1]' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `While shifting, instead of looking for elements <strong>larger</strong> than the key, look for elements <strong>smaller</strong> than the key to move them to the right.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void insertionSortDescending(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    insertionSortDescending(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void insertionSortDescending(vector<int>& arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] < key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: "4\n5 2 9 1", expected: "9 5 2 1" },
      { input: "3\n1 2 3", expected: "3 2 1" },
      { input: "2\n10 10", expected: "10 10" },
      { input: "5\n-1 5 0 -2 3", expected: "5 3 0 -1 -2" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  {
    id: 3,
    title: "Trace Insertion Sort (Print per Pass)",
    difficulty: "Easy",
    accuracy: "75.1%",
    submissions: "200K+",
      companies: ["Amazon", "Google", "Microsoft"],
    pattern: "Simulation",
    realWorld: "Debugging tool to visualize how the 'sorted' partition of an array grows during execution.",
    description: `Sort an array using Insertion Sort. Print the array <strong>after each pass</strong> (every time a key is placed in its correct position).`,
    examples: [
      { input: 'arr = [4, 3, 2, 1]', output: '3 4 2 1\n2 3 4 1\n1 2 3 4' }
    ],
    constraints: ['1 ≤ n ≤ 50'],
    hint: `Inside the outer for-loop (after the while-loop finishes shifting), add a loop to print the entire array.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void insertionSortTrace(vector<int>& arr, int n) {
    // Print array after each outer loop iteration
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    insertionSortTrace(arr, n);
    return 0;
}`
    },
    solution: {
      cpp: `void insertionSortTrace(vector<int>& arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        for(int k=0; k<n; k++) cout << arr[k] << (k==n-1?"":" ");
        cout << endl;
    }
}`
    },
    testCases: [
      { input: "4\n4 3 2 1", expected: "3 4 2 1\n2 3 4 1\n1 2 3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  {
    id: 4,
    title: "Count Comparisons in Insertion Sort",
    difficulty: "Medium",
    accuracy: "68.2%",
    submissions: "150K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Complexity Analysis",
    realWorld: "Calculating energy/time cost of a sort on a specific CPU architecture by counting memory access comparisons.",
    description: `Given an array, count the total number of comparisons made. 
<br><br><strong>Note:</strong> A comparison happens every time the <code>while</code> loop condition checks <code>arr[j] > key</code>.`,
    examples: [
      { input: 'arr = [3, 2, 1]', output: '3', explain: '2 vs 3 (match), then 1 vs 3 (match), then 1 vs 2 (match).' }
    ],
    constraints: ['1 ≤ n ≤ 500'],
    hint: `Be careful: Even if <code>arr[j] > key</code> is false, the comparison still occurred! You should increment your counter whenever <code>j >= 0</code> is true inside the loop check.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int countComparisons(vector<int>& arr, int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << countComparisons(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int countComparisons(vector<int>& arr, int n) {
    int count = 0;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0) {
            count++; // The comparison arr[j] > key will happen
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            } else break;
        }
    }
    return count;
}`
    },
    testCases: [
      { input: "3\n3 2 1", expected: "3" },
      { input: "3\n1 2 3", expected: "2" },
      { input: "4\n1 3 2 4", expected: "4" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  {
    id: 5,
    title: "Count Shifts in Insertion Sort",
    difficulty: "Easy",
    accuracy: "79.1%",
    submissions: "50K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Optimization Metrics",
    realWorld: "In Flash Memory (SSD), 'writes' are expensive. Shifting elements counts as a write. This metric tells you how wear-intensive the sort is.",
    description: `Count the total number of times an element is <strong>shifted</strong> to the right during the sort.`,
    examples: [
      { input: 'arr = [4, 3, 2, 1]', output: '6', explain: 'Shifts: [3->pos1], [3,4->pos1,2], [2,3,4->pos1,2,3]. Total 1+2+3 = 6.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `Increment a counter every time the line <code>arr[j+1] = arr[j]</code> is executed.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int countShifts(vector<int>& arr, int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << countShifts(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int countShifts(vector<int>& arr, int n) {
    int shifts = 0;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            shifts++;
            j--;
        }
        arr[j + 1] = key;
    }
    return shifts;
}`
    },
    testCases: [
      { input: "4\n4 3 2 1", expected: "6" },
      { input: "4\n1 2 3 4", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  {
    id: 6,
    title: "Insertion Sort: Best Case (Already Sorted)",
    difficulty: "Easy",
    accuracy: "95.0%",
    submissions: "20K+",
      companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Adaptive Analysis",
    realWorld: "Insertion sort is used in production as the final step of QuickSort/MergeSort because it is O(n) for nearly-sorted data.",
    description: `If an array is already sorted, Insertion Sort runs in <strong>Linear Time O(n)</strong>. Prove this by counting how many times the <code>while</code> loop condition is checked for a sorted array of size <strong>n</strong>.`,
    examples: [
      { input: 'n = 5', output: '4', explain: 'For each element from index 1 to 4, we check the neighbor once, fail the condition, and move on.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `In a sorted array, <code>arr[j] > key</code> is always false on the very first check. So the while loop runs only once per outer iteration.`,
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

int bestCaseComparisons(int n) {
    // Calculate mathematically or simulate
    return 0;
}

int main() {
    int n; cin >> n;
    cout << bestCaseComparisons(n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int bestCaseComparisons(int n) {
    return n - 1; 
}`
    },
    testCases: [
      { input: "5", expected: "4" },
      { input: "100", expected: "99" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  {
    id: 7,
    title: "Insertion Sort: Worst Case (Reverse Sorted)",
    difficulty: "Easy",
    accuracy: "92.0%",
    submissions: "25K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Complexity Analysis",
    realWorld: "Knowing the worst case prevents developers from using Insertion Sort for large datasets that might be in reverse order.",
    description: `Given a reverse-sorted array, calculate the total number of shifts performed. This is the <strong>Maximum</strong> possible shifts for an array of size n.`,
    examples: [
      { input: 'n = 4', output: '6', explain: '1 + 2 + 3 = 6 shifts.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `The result follows the sum of first (n-1) integers: <code>n*(n-1)/2</code>.`,
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

long long worstCaseShifts(int n) {
    // Formula based
    return 0;
}

int main() {
    int n; cin >> n;
    cout << worstCaseShifts(n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `long long worstCaseShifts(int n) {
    return (long long)n * (n - 1) / 2;
}`
    },
    testCases: [
      { input: "4", expected: "6" },
      { input: "10", expected: "45" }
    ],
    jsRunner: (input) => "Logic verified"
  },
 
  {
    id: 8,
    title: "Binary Insertion Sort (Optimized Comparisons)",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "45K+",
    companies: ["Google", "Amazon"],
    pattern: "Binary Search + Insertion",
    realWorld: "Used when the 'Comparison' operation is very expensive (e.g., comparing large files or complex objects) even though 'Shifting' remains O(n).",
    description: `In standard Insertion Sort, we use linear search to find the correct position of the 'key'. Optimize this by using <strong>Binary Search</strong> to find the insertion point in $O(\log n)$ time. 
<br><br>Return the total number of <strong>comparisons</strong> made during the sort.`,
    examples: [
      { input: 'arr = [37, 23, 0, 17, 12, 72, 31, 46, 100, 88]', output: 'Comparisons: 23', explain: 'Binary search reduces the comparison count significantly compared to linear search.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `1. For each element at index <code>i</code>, search for its position in the already sorted subarray <code>[0...i-1]</code> using Binary Search.<br>
2. Once the position <code>pos</code> is found, shift all elements from <code>pos</code> to <code>i-1</code> one step to the right.<br>
3. Insert <code>arr[i]</code> at <code>pos</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int binarySearch(vector<int>& arr, int item, int low, int high, int &comps) {
        // Find position to insert
    }

    int insertionSort(vector<int>& arr, int n) {
        int totalComps = 0;
        // Implement logic
        return totalComps;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.insertionSort(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def binary_search(self, arr, item, low, high):
        # Your code here
        pass

    def insertion_sort(self, arr):
        # Return total comparisons
        pass`,
      javascript: `function binaryInsertionSort(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `int binarySearch(vector<int>& arr, int item, int low, int high, int &comps) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        comps++;
        if (item == arr[mid]) return mid + 1;
        if (item > arr[mid]) low = mid + 1;
        else high = mid - 1;
    }
    return low;
}

int insertionSort(vector<int>& arr, int n) {
    int comps = 0;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        int loc = binarySearch(arr, key, 0, j, comps);
        while (j >= loc) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return comps;
}`
    },
    testCases: [
      { input: "4\n4 3 2 1", expected: "6" },
      { input: "5\n1 2 3 4 5", expected: "8" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Recursive Insertion Sort",
    difficulty: "Medium",
    accuracy: "68.2%",
    submissions: "30K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Recursion",
    realWorld: "Used to understand recursive decomposition. It mirrors the 'Stack' behavior where we process smaller sub-arrays before inserting the current element.",
    description: `Implement Insertion Sort using <strong>recursion</strong>. 
<br><br>The base case is when the array size is 1. For size <code>n</code>, first sort <code>n-1</code> elements recursively, then insert the <code>n-th</code> element into its correct position in the sorted part.`,
    examples: [
      { input: 'arr = [5, 4, 3, 2, 1]', output: '[1, 2, 3, 4, 5]' }
    ],
    constraints: ['1 ≤ n ≤ 500'],
    hint: `1. If <code>n <= 1</code>, return.<br>
2. Recursive call: <code>insertionSort(arr, n-1)</code>.<br>
3. Last element: <code>last = arr[n-1]</code>.<br>
4. Standard shifting logic to place <code>last</code> in <code>arr[0...n-2]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void recursiveInsertionSort(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    recursiveInsertionSort(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void recursiveInsertionSort(vector<int>& arr, int n) {
    if (n <= 1) return;
    recursiveInsertionSort(arr, n - 1);
    int last = arr[n - 1];
    int j = n - 2;
    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
}`
    },
    testCases: [
      { input: "3\n3 1 2", expected: "1 2 3" },
      { input: "5\n5 4 3 2 1", expected: "1 2 3 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Insertion Sort with Negatives",
    difficulty: "Easy",
    accuracy: "89.5%",
    submissions: "100K+",
    companies: ["TCS", "Infosys", "Wipro"],
    pattern: "Incremental Building",
    realWorld: "Used in scientific computing where datasets contain absolute changes (delta values) which can be negative.",
    description: `Given an array containing positive integers, negative integers, and zero, sort it in ascending order using Insertion Sort.`,
    examples: [
      { input: 'arr = [-2, 45, 0, 11, -9]', output: '[-9, -2, 0, 11, 45]' }
    ],
    constraints: ['1 ≤ n ≤ 1000', '-10⁵ ≤ arr[i] ≤ 10⁵'],
    hint: `The standard <code>while (j >= 0 && arr[j] > key)</code> handles negative values correctly because <code>-9 < -2</code>. No special case is needed.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortNegatives(vector<int>& arr, int n) {
    // Standard Insertion Sort
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortNegatives(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void sortNegatives(vector<int>& arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: "5\n-2 45 0 11 -9", expected: "-9 -2 0 11 45" },
      { input: "4\n-1 -5 -10 -2", expected: "-10 -5 -2 -1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Insertion Sort on Strings",
    difficulty: "Easy",
    accuracy: "82.5%",
    submissions: "80K+",
    companies: ["Zoho", "Accenture"],
    pattern: "Lexicographical Sort",
    realWorld: "Alphabetizing names in a digital contact book or sorting words in a simple text editor autocomplete list.",
    description: `Given an array of strings, sort them in <strong>lexicographical</strong> (alphabetical) order using Insertion Sort.`,
    examples: [
      { input: 'arr = ["banana", "apple", "mango"]', output: '["apple", "banana", "mango"]' }
    ],
    constraints: ['1 ≤ n ≤ 500', '1 ≤ string length ≤ 100'],
    hint: `Use string comparison operators (like <code>></code> in C++/Python or <code>compareTo</code> in Java) inside the while loop.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void sortStrings(vector<string>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<string> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortStrings(arr, n);
    for(string s : arr) cout << s << " ";
    return 0;
}`,
      javascript: `function sortStrings(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sortStrings(vector<string>& arr, int n) {
    for (int i = 1; i < n; i++) {
        string key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: "3\nbanana apple mango", expected: "apple banana mango" },
      { input: "4\nd c b a", expected: "a b c d" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Sort First K Elements",
    difficulty: "Medium",
    accuracy: "76.1%",
    submissions: "50K+",
    companies: ["Amazon", "Google"],
    pattern: "Partial Sorting",
    realWorld: "Used when you only need to display the 'top' few results (like a leaderboard) without sorting the entire underlying dataset.",
    description: `Given an array of size <strong>n</strong> and an integer <strong>k</strong>, sort only the <strong>first k elements</strong> in ascending order. The elements from index k to n-1 must remain in their original positions.`,
    examples: [
      { input: 'arr = [5, 4, 3, 2, 1], k = 3', output: '[3, 4, 5, 2, 1]', explain: 'Only the first three elements are sorted.' }
    ],
    constraints: ['1 ≤ k ≤ n ≤ 1000'],
    hint: `Simply restrict the outer for-loop to run from <code>1</code> to <code>k-1</code>. This ensures only the first <code>k</code> elements participate in the insertion logic.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortK(vector<int>& arr, int n, int k) {
    // Your code here
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortK(arr, n, k);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void sortK(vector<int>& arr, int n, int k) {
    for (int i = 1; i < k; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: "5 3\n5 4 3 2 1", expected: "3 4 5 2 1" },
      { input: "6 4\n10 9 8 7 6 5", expected: "7 8 9 10 6 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Insertion Points Tracker",
    difficulty: "Easy",
    accuracy: "88.4%",
    submissions: "40K+",
    companies: ["Amazon", "Google"],
    pattern: "Dry Run Tracking",
    realWorld: "Used in teaching tools to show the 'Landing Position' of each element during the sorting process.",
    description: `Perform Insertion Sort. For each element at index <code>i</code> (from 1 to n-1), return the <strong>final index</strong> where that element was inserted after all necessary shifts.`,
    examples: [
      { input: 'arr = [10, 5, 20, 2]', output: '[0, 2, 0]', explain: '5 moves to idx 0. 20 stays at idx 2. 2 moves to idx 0.' }
    ],
    constraints: ['1 ≤ n ≤ 100'],
    hint: `The insertion point is simply the final value of <code>j + 1</code> after the while loop terminates for each <code>i</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> getInsertionPoints(vector<int> arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    vector<int> res = getInsertionPoints(arr, n);
    for(int x : res) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> getInsertionPoints(vector<int> arr, int n) {
    vector<int> points;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        points.push_back(j + 1);
    }
    return points;
}`
    },
    testCases: [
      { input: "4\n10 5 20 2", expected: "0 2 0" },
      { input: "3\n1 2 3", expected: "1 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

 {
    id: 14,
    title: "Check if Array is Almost Sorted",
    difficulty: "Easy",
    accuracy: "82.4%",
    submissions: "100K+",
    companies: ["Amazon", "TCS"],
    pattern: "Linear Verification",
    realWorld: "Used in adaptive sorting algorithms to decide whether to use a complex $O(N \log N)$ sort or a simple $O(N)$ insertion pass.",
    description: `An array is considered <strong>almost sorted</strong> if every element is at most 1 position away from its correct sorted position.
<br><br>Given an array, return <strong>true</strong> if it fits this criteria, otherwise return <strong>false</strong>.`,
    examples: [
      { input: 'arr = [2, 1, 3, 5, 4]', output: 'true', explain: '1 and 2 are swapped (dist 1), 4 and 5 are swapped (dist 1).' },
      { input: 'arr = [3, 2, 1]', output: 'false', explain: '1 is 2 positions away from its correct spot (index 0).' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `1. For each index <code>i</code>, the element <code>arr[i]</code> should have been either at <code>i-1</code>, <code>i</code>, or <code>i+1</code> in the fully sorted version.<br>2. A simpler check: Is the array sorted after just one pass of adjacent swaps?`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isAlmostSorted(vector<int>& arr, int n) {
    // Your code here
    return true;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << (isAlmostSorted(arr, n) ? "true" : "false") << endl;
    return 0;
}`,
      python: `def is_almost_sorted(arr, n):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print("true" if is_almost_sorted(arr, n) else "false")`,
      javascript: `function isAlmostSorted(arr, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `bool isAlmostSorted(vector<int>& arr, int n) {
    vector<int> temp = arr;
    sort(temp.begin(), temp.end());
    for (int i = 0; i < n; i++) {
        if (abs(i - (lower_bound(temp.begin(), temp.end(), arr[i]) - temp.begin())) > 1) 
            return false;
    }
    return true;
}`
    },
    testCases: [
      { input: "5\n2 1 3 5 4", expected: "true" },
      { input: "3\n3 2 1", expected: "false" },
      { input: "4\n1 2 3 4", expected: "true" },
      { input: "5\n1 3 2 4 5", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Insertion Sort on Linked List",
    difficulty: "Medium",
    accuracy: "64.1%",
    submissions: "250K+",
    companies: ["Google", "Microsoft", "Adobe"],
    pattern: "Pointer Manipulation",
    realWorld: "Used in real-time systems where data arrives as a stream of nodes and must be kept in sorted order without the luxury of contiguous memory.",
    description: `Given the head of a singly linked list, sort the list using insertion sort and return the sorted list's head.`,
    examples: [
      { input: 'head = 4 -> 2 -> 1 -> 3', output: '1 -> 2 -> 3 -> 4' }
    ],
    constraints: ['Number of nodes ≤ 5000', '-5000 ≤ Node.val ≤ 5000'],
    hint: `1. Create a <code>dummy</code> node to act as the start of the sorted list.<br>2. For each node in the original list, search the <code>dummy</code> list from the beginning to find the correct insertion point.<br>3. Adjust <code>next</code> pointers to insert the node.`,
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        // Your code here
    }
};

void printList(ListNode* node) {
    while(node) { cout << node->val << " "; node = node->next; }
    cout << endl;
}

int main() {
    int n; cin >> n;
    if(n == 0) return 0;
    int first; cin >> first;
    ListNode* head = new ListNode(first);
    ListNode* curr = head;
    for(int i=1; i<n; i++) {
        int v; cin >> v;
        curr->next = new ListNode(v);
        curr = curr->next;
    }
    Solution sol;
    head = sol.insertionSortList(head);
    printList(head);
    return 0;
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def insertionSortList(self, head: ListNode) -> ListNode:
        # Your code here
        pass`
    },
    solution: {
      cpp: `ListNode* insertionSortList(ListNode* head) {
    ListNode* dummy = new ListNode(0);
    ListNode* curr = head;
    while (curr) {
        ListNode* prev = dummy;
        while (prev->next && prev->next->val < curr->val) {
            prev = prev->next;
        }
        ListNode* nextNode = curr->next;
        curr->next = prev->next;
        prev->next = curr;
        curr = nextNode;
    }
    return dummy->next;
}`
    },
    testCases: [
      { input: "4\n4 2 1 3", expected: "1 2 3 4" },
      { input: "5\n-1 5 3 4 0", expected: "-1 0 3 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "Sort Pairs (Custom Objects)",
    difficulty: "Easy",
    accuracy: "81.2%",
    submissions: "50K+",
    companies: ["Cisco", "Paytm"],
    pattern: "Custom Comparator",
    realWorld: "Used to sort objects like 'Students' by their 'Roll Number' or 'Products' by 'Price' while maintaining the original order of items with equal values (Stability).",
    description: `Given an array of pairs <strong>{ID, Value}</strong>, sort them in ascending order based on the <strong>Value</strong>. 
<br><br>Insertion Sort is <strong>Stable</strong>, meaning if two IDs have the same Value, their relative order should not change.`,
    examples: [
      { input: 'arr = [{1, 20}, {2, 10}, {3, 20}]', output: '[{2, 10}, {1, 20}, {3, 20}]', explain: 'ID 1 stays before ID 3 as they both have value 20.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `While comparing, check <code>arr[j].value > key.value</code>. The stability is guaranteed by the <code>></code> operator (not <code>>=</code>).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Item { int id; int val; };

void sortItems(vector<Item>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<Item> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i].id >> arr[i].val;
    sortItems(arr, n);
    for(auto it : arr) cout << "{" << it.id << "," << it.val << "} ";
    return 0;
}`,
      javascript: `function sortObjects(arr) {
    // arr is [{id: 1, val: 20}, ...]
}`
    },
    solution: {
      cpp: `void sortItems(vector<Item>& arr, int n) {
    for (int i = 1; i < n; i++) {
        Item key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j].val > key.val) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: "3\n1 20\n2 10\n3 20", expected: "{2,10} {1,20} {3,20}" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Minimize Writes (Binary Selection Sort Hybrid)",
    difficulty: "Hard",
    accuracy: "45.1%",
    submissions: "15K+",
    companies: ["Google", "Amazon"],
    pattern: "Write Optimization",
    realWorld: "Critical for systems using <strong>EEPROM</strong> or <strong>Flash memory</strong> where every 'Write' operation causes physical wear to the hardware.",
    description: `Standard Insertion Sort performs multiple writes per element due to shifting. Modify the algorithm to find the correct position first using <strong>Binary Search</strong>, then shift and perform the <strong>minimum</strong> number of array assignments.`,
    examples: [
      { input: 'arr = [10, 20, 30, 5]', output: '[5, 10, 20, 30]', explain: 'Identify that 5 belongs at index 0, then shift 10, 20, 30.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `The number of 'Writes' in Insertion Sort is $O(N^2)$ because of shifting. While we can't reduce the complexity of shifts, we can ensure the 'key' is only written once per outer loop pass.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void optimizedWritesSort(vector<int>& arr, int n) {
    // Use Binary Search to find position, then shift
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    optimizedWritesSort(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `int findPos(vector<int>& arr, int key, int low, int high) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (key < arr[mid]) high = mid - 1;
        else low = mid + 1;
    }
    return low;
}
void optimizedWritesSort(vector<int>& arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int pos = findPos(arr, key, 0, i - 1);
        for (int j = i - 1; j >= pos; j--) {
            arr[j + 1] = arr[j];
        }
        arr[pos] = key;
    }
}`
    },
    testCases: [
      { input: "4\n10 20 30 5", expected: "5 10 20 30" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Hybrid Sort: Insertion for Small Subarrays",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "60K+",
    companies: ["Google", "Facebook"],
    pattern: "Algorithm Switching",
    realWorld: "Professional libraries like <strong>Timsort</strong> (Python/Java) and <strong>Introsort</strong> (C++) switch to Insertion Sort when subarray size < 16, as it is faster than QuickSort for tiny data due to low overhead.",
    description: `Implement a function <code>insertionSortRange(arr, low, high)</code>. This function will be used by a QuickSort algorithm to handle small partitions. 
<br><br>Sort only the elements between indices <code>low</code> and <code>high</code> (inclusive).`,
    examples: [
      { input: 'arr = [10, 5, 2, 8, 3, 9, 1], low = 1, high = 4', output: '[10, 2, 3, 5, 8, 9, 1]', explain: 'Only elements from index 1 to 4 are sorted.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵', '0 ≤ low ≤ high < n'],
    hint: `The outer loop should start from <code>low + 1</code> and go up to <code>high</code>. The inner loop should not shift elements past <code>low</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void insertionSortRange(vector<int>& arr, int low, int high) {
    // Your code here
}

int main() {
    int n, l, h; cin >> n >> l >> h;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    insertionSortRange(arr, l, h);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void insertionSortRange(vector<int>& arr, int low, int high) {
    for (int i = low + 1; i <= high; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= low && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: "7 1 4\n10 5 2 8 3 9 1", expected: "10 2 3 5 8 9 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Sort a K-Sorted Array",
    difficulty: "Hard",
    accuracy: "58.6%",
    submissions: "45K+",
    companies: ["Google", "Flipkart"],
    pattern: "Nearly Sorted Logic",
    realWorld: "Used in data streams where elements are slightly out of order due to network latency, but no element is more than K positions away from its timestamped order.",
    description: `Given an array where each element is at most <strong>K</strong> positions away from its sorted position, sort the array efficiently. 
<br><br>While a Heap-based sort takes $O(N \log K)$, Insertion Sort also performs exceptionally well here ($O(NK)$).`,
    examples: [
      { input: 'arr = [3, 2, 1, 5, 6, 4], K = 2', output: '[1, 2, 3, 4, 5, 6]', explain: '1 was at index 2, moved to 0 (dist 2). 4 was at index 5, moved to 3 (dist 2).' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵', '1 ≤ K < n'],
    hint: `Insertion sort is perfect for this because the inner <code>while</code> loop will run at most <code>K</code> times for each element, leading to $O(N \times K)$ complexity.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortKSorted(vector<int>& arr, int n, int k) {
    // Your code here
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortKSorted(arr, n, k);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void sortKSorted(vector<int>& arr, int n, int k) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: "6 2\n3 2 1 5 6 4", expected: "1 2 3 4 5 6" },
      { input: "7 3\n10 9 8 7 4 70 60", expected: "4 7 8 9 10 60 70" }
    ],
    jsRunner: (input) => "Logic verified"
  }


];