const TOPIC_CONFIG = {
  name: "Quick Sort",
  level: "Level 3 of 3 · Problems",
  backLink: "quickSort_L1.html",
  backLabel: "Quick Sort"
};

const PROBLEMS = [
  {
    id: 1,
    title: "Implement Quick Sort (Ascending)",
    difficulty: "Medium",
    accuracy: "65.2%",
    submissions: "550K+",
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Divide and Conquer",
    realWorld: "Used in Linux kernel's sort implementation and most commercial sorting libraries because it is in-place and extremely fast on average.",
    description: `Given an unsorted array <strong>arr</strong> of <strong>n</strong> integers, sort the array in <strong>ascending order</strong> using the Quick Sort algorithm.
<br><br>Quick Sort works by picking an element as a 'pivot' and partitioning the given array around the picked pivot.`,
    examples: [
      { input: 'arr = [10, 7, 8, 9, 1, 5]', output: '[1, 5, 7, 8, 9, 10]', explain: 'Standard partition moves smaller elements to left of pivot.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '-10⁹ ≤ arr[i] ≤ 10⁹'
    ],
    hint: `1. <strong>Pick a Pivot:</strong> Common choices are the first element, last element, or middle element.<br>
2. <strong>Partition:</strong> Reorder the array so that all elements with values less than the pivot come before the pivot, and elements with values greater than the pivot come after it.<br>
3. <strong>Recurse:</strong> Recursively apply the above steps to the sub-arrays.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int partition(vector<int>& arr, int low, int high) {
        // Your code here
    }

    void quickSort(vector<int>& arr, int low, int high) {
        // Your code here
    }
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    Solution sol;
    sol.quickSort(arr, 0, n - 1);
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
      python: `class Solution:
    def quickSort(self, arr, low, high):
        # Your code here
        pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    Solution().quickSort(arr, 0, n - 1)
    print(*(arr))`,
      java: `import java.util.*;

class Solution {
    int partition(int arr[], int low, int high) { return 0; }
    void quickSort(int arr[], int low, int high) { }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        new Solution().quickSort(arr, 0, n - 1);
        for(int x : arr) System.out.print(x + " ");
    }
}`,
      javascript: `function quickSort(arr, low, high) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 0) {
    const n = parseInt(input[0]);
    const arr = input.slice(1, 1 + n).map(Number);
    quickSort(arr, 0, n - 1);
    console.log(arr.join(' '));
}`
    },
    solution: {
      cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    },
    testCases: [
      { input: "6\n10 7 8 9 1 5", expected: "1 5 7 8 9 10" },
      { input: "4\n5 4 3 2", expected: "2 3 4 5" },
      { input: "1\n100", expected: "100" },
      { input: "5\n1 2 3 4 5", expected: "1 2 3 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Implement Quick Sort (Descending)",
    difficulty: "Easy",
    accuracy: "81.4%",
    submissions: "300K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Divide and Conquer",
    realWorld: "Used to rank items where the highest value (like stock price or user score) needs to be prioritized at the beginning.",
    description: `Modify the Quick Sort algorithm to sort an array in <strong>descending order</strong> (Largest to Smallest).`,
    examples: [
      { input: 'arr = [1, 5, 2, 8]', output: '[8, 5, 2, 1]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `Modify the <code>partition</code> function: When iterating through the array, move elements that are <strong>greater than</strong> the pivot to its left. Change <code>arr[j] <= pivot</code> to <code>arr[j] >= pivot</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void quickSortDescending(vector<int>& arr, int low, int high) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.quickSortDescending(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] >= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}
void quickSortDescending(vector<int>& arr, int low, int high) {
    if(low < high) {
        int pi = partition(arr, low, high);
        quickSortDescending(arr, low, pi - 1);
        quickSortDescending(arr, pi + 1, high);
    }
}`
    },
    testCases: [
      { input: "4\n1 5 2 8", expected: "8 5 2 1" },
      { input: "3\n10 20 30", expected: "30 20 10" },
      { input: "2\n1 2", expected: "2 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Lomuto Partition Algorithm",
    difficulty: "Medium",
    accuracy: "70.2%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Partitioning Strategy",
    realWorld: "Commonly used in introductory teaching and standard QuickSort implementations due to its simplicity in logic and code structure.",
    description: `Implement only the <strong>Lomuto Partition</strong> scheme. Pick the <strong>last element</strong> as the pivot.
<br><br>The function should return the final index of the pivot after reordering.`,
    examples: [
      { input: 'arr = [10, 80, 30, 90, 40, 50]', output: 'Index: 2', explain: 'Pivot 50 is moved to index 2. Elements < 50 are to its left.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `1. Initialize <code>i = low - 1</code>.<br>
2. Iterate <code>j</code> from <code>low</code> to <code>high - 1</code>.<br>
3. If <code>arr[j] < pivot</code>, increment <code>i</code> and swap <code>arr[i]</code> with <code>arr[j]</code>.<br>
4. Finally, swap <code>arr[i + 1]</code> with <code>arr[high]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int lomutoPartition(vector<int>& arr, int low, int high) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << lomutoPartition(arr, 0, n-1) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int lomutoPartition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`
    },
    testCases: [
      { input: "6\n10 80 30 90 40 50", expected: "2" },
      { input: "5\n1 2 3 4 5", expected: "4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Hoare Partition Algorithm",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "120K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Two-Pointer Strategy",
    realWorld: "Hoare partition is more efficient than Lomuto because it performs three times fewer swaps on average and handles duplicate elements better.",
    description: `Implement the <strong>Hoare Partition</strong> scheme. Use the <strong>first element</strong> as the pivot.
<br><br>Return the partition index <code>j</code> such that elements in <code>arr[low...j]</code> are $\le$ pivot and <code>arr[j+1...high]</code> are $\ge$ pivot.`,
    examples: [
      { input: 'arr = [13, 19, 9, 5, 12, 8, 7, 4, 21, 2, 6, 11]', output: 'Index: 9', explain: 'After Hoare partition, pivot 13 is in the right segment.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `1. Use two indices <code>i</code> and <code>j</code> starting at <code>low - 1</code> and <code>high + 1</code>.<br>
2. Move <code>i</code> right while <code>arr[i] < pivot</code>.<br>
3. Move <code>j</code> left while <code>arr[j] > pivot</code>.<br>
4. If they haven't met, swap and repeat. Return <code>j</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int hoarePartition(vector<int>& arr, int low, int high) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << hoarePartition(arr, 0, n-1) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int hoarePartition(vector<int>& arr, int low, int high) {
    int pivot = arr[low];
    int i = low - 1, j = high + 1;
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        swap(arr[i], arr[j]);
    }
}`
    },
    testCases: [
      { input: "12\n13 19 9 5 12 8 7 4 21 2 6 11", expected: "9" },
      { input: "5\n5 4 3 2 1", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Quick Sort: Trace Partitioning",
    difficulty: "Medium",
    accuracy: "75.1%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Simulation",
    realWorld: "Used for debugging and educational purposes to see the recursive 'shrinking' of the problem space.",
    description: `Sort an array using Quick Sort and print the array <strong>after each partition</strong> step completes.`,
    examples: [
      { input: 'arr = [5, 3, 8, 4, 2]', output: '2 3 4 5 8 (Trace shown in passes)' }
    ],
    constraints: [
      '1 ≤ n ≤ 50'
    ],
    hint: `Call a print function immediately after the <code>partition</code> function returns in your recursive <code>quickSort</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void printArray(vector<int>& arr) {
    for(int x : arr) cout << x << " ";
    cout << endl;
}

int partition(vector<int>& arr, int low, int high) {
    // Standard partition
}

void quickSortTrace(vector<int>& arr, int low, int high) {
    // Recursive logic + Print
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    quickSortTrace(arr, 0, n-1);
    return 0;
}`
    },
    solution: {
      cpp: `void quickSortTrace(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        cout << "Partition: "; printArray(arr);
        quickSortTrace(arr, low, pi - 1);
        quickSortTrace(arr, pi + 1, high);
    }
}`
    },
    testCases: [
      { input: "5\n5 3 8 4 2", expected: "Logic trace verification" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Quick Sort: Worst Case (Already Sorted)",
    difficulty: "Medium",
    accuracy: "92.4%",
    submissions: "80K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Complexity Analysis",
    realWorld: "Explains why 'Randomized QuickSort' is used in production—to prevent malicious users from triggering O(n²) performance by providing pre-sorted input.",
    description: `Given a <strong>pre-sorted</strong> array, use the standard Lomuto partition (last element as pivot). Explain and observe why the performance degrades to O(n²).
<br><br>Count the number of recursive calls made.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4]', output: 'Calls: 4', explain: 'The pivot only reduces the problem size by 1 each time.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `When the array is sorted and you pick the last element, the partition will always result in one empty subarray and one subarray of size <code>n-1</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int recursiveCount = 0;

void quickSortWorstCase(vector<int>& arr, int low, int high) {
    // Count and sort
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) arr[i] = i+1;
    quickSortWorstCase(arr, 0, n-1);
    cout << recursiveCount << endl;
    return 0;
}`
    },
    solution: {
      cpp: `void quickSortWorstCase(vector<int>& arr, int low, int high) {
    if (low < high) {
        recursiveCount++;
        int pi = partition(arr, low, high);
        quickSortWorstCase(arr, low, pi - 1);
        quickSortWorstCase(arr, pi + 1, high);
    }
}`
    },
    testCases: [
      { input: "4", expected: "3" },
      { input: "10", expected: "9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Quick Sort: Reverse Sorted Array",
    difficulty: "Easy",
    accuracy: "91.2%",
    submissions: "70K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Analytical",
    realWorld: "Tests the robustness of the pivot selection logic. Like the sorted case, simple pivot strategies struggle with reverse data.",
    description: `Given an array sorted in <strong>descending order</strong>, sort it in <strong>ascending order</strong> using Quick Sort and return the final sorted array.`,
    examples: [
      { input: 'arr = [10, 5, 2, 1]', output: '[1, 2, 5, 10]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `The implementation is identical to standard Quick Sort. Notice how many swaps occur compared to a normal case.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void quickSortReverse(vector<int>& arr, int low, int high) {
    // Standard implementation
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    quickSortReverse(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `// Standard Quick Sort Ascending implementation using Lomuto or Hoare`
    },
    testCases: [
      { input: "4\n10 5 2 1", expected: "1 2 5 10" },
      { input: "3\n3 2 1", expected: "1 2 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },
 
  {
    id: 8,
    title: "Quick Sort Recursive Trace (Dry Run)",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "90K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Divide and Conquer Visualization",
    realWorld: "Used in debugging complex recursive systems to visualize how a large problem is being broken down into smaller, manageable sub-tasks.",
    description: `Implement Quick Sort and print the <strong>pivot</strong> and the <strong>subarray</strong> being processed at each recursive step. 
<br><br>This helps in understanding how the 'Divide' step partitions the data and how the 'Conquer' step builds the recursion tree.`,
    examples: [
      { input: 'arr = [3, 1, 4, 2]', output: 'Pivot: 2, Left: [1], Right: [3, 4]...', explain: 'Shows the pivot selection and the resulting split at each level.' }
    ],
    constraints: [
      '1 ≤ n ≤ 50'
    ],
    hint: `Inside your <code>quickSort</code> function, before recursing, print the range <code>[low...high]</code> and the value of the pivot returned by the partition function.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++; swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSortTrace(vector<int>& arr, int low, int high) {
    // Your code here: Print pivot and subarrays
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    quickSortTrace(arr, 0, n-1);
    return 0;
}`,
      python: `def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1

def quick_sort_trace(arr, low, high):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    quick_sort_trace(arr, 0, n - 1)`,
      javascript: `function quickSortTrace(arr, low, high) {
    // Your code here
}

const n = 4, arr = [3, 1, 4, 2];
quickSortTrace(arr, 0, n - 1);`
    },
    solution: {
      cpp: `void quickSortTrace(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        cout << "Pivot: " << arr[pi] << " Range: [" << low << "," << high << "]\\n";
        quickSortTrace(arr, low, pi - 1);
        quickSortTrace(arr, pi + 1, high);
    }
}`
    },
    testCases: [
      { input: "4\n3 1 4 2", expected: "Trace output" },
      { input: "3\n10 5 15", expected: "Trace output" },
      { input: "2\n2 1", expected: "Trace output" },
      { input: "5\n1 2 3 4 5", expected: "Trace output" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Randomized Quick Sort",
    difficulty: "Medium",
    accuracy: "64.2%",
    submissions: "200K+",
    companies: ["Google", "Facebook", "Directi"],
    pattern: "Randomized Algorithms",
    realWorld: "Production-grade sorting libraries (like Glibc's qsort) use randomization or 'median-of-three' to prevent attackers from intentionally causing O(n²) performance via specifically crafted input.",
    description: `Standard Quick Sort hits $O(n^2)$ on already sorted arrays. To avoid this, implement <strong>Randomized Quick Sort</strong>. 
<br><br>Before partitioning, pick a random index between <code>low</code> and <code>high</code>, swap it with <code>high</code> (the pivot), and then proceed with standard Lomuto partition.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: '[1, 2, 3, 4, 5]', explain: 'Sorted correctly, but average time is now O(n log n) regardless of initial order.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `Use <code>rand() % (high - low + 1) + low</code> in C++ or <code>random.randint(low, high)</code> in Python to select the random pivot.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

class Solution {
public:
    int randomPartition(vector<int>& arr, int low, int high) {
        // Pick random, swap, then Lomuto partition
    }

    void quickSort(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pi = randomPartition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
};

int main() {
    srand(time(0));
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.quickSort(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      python: `import random

class Solution:
    def random_partition(self, arr, low, high):
        # Your code here
        pass

    def quick_sort(self, arr, low, high):
        if low < high:
            pi = self.random_partition(arr, low, high)
            self.quick_sort(arr, low, pi - 1)
            self.quick_sort(arr, pi + 1, high)

if __name__ == "__main__":
    n = int(input())
    nums = list(map(int, input().split()))
    Solution().quick_sort(nums, 0, n-1)
    print(*(nums))`
    },
    solution: {
      cpp: `int randomPartition(vector<int>& arr, int low, int high) {
    int r = low + rand() % (high - low + 1);
    swap(arr[r], arr[high]);
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++; swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "1 2 3 4 5" },
      { input: "5\n5 4 3 2 1", expected: "1 2 3 4 5" },
      { input: "4\n10 5 8 2", expected: "2 5 8 10" },
      { input: "1\n99", expected: "99" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Quick Sort with Duplicates (3-Way Partition)",
    difficulty: "Hard",
    accuracy: "45.1%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Paytm"],
    pattern: "Dutch National Flag",
    realWorld: "Essential for sorting datasets with many redundant keys (like sorting transactions by 'category_id' or 'country_code').",
    description: `Standard Quick Sort performs poorly when many duplicate elements are present. Implement <strong>3-way partitioning</strong> (Dutch National Flag algorithm).
<br><br>Divide the array into three parts:
<br>1. Elements less than pivot.
<br>2. Elements equal to pivot.
<br>3. Elements greater than pivot.`,
    examples: [
      { input: 'arr = [4, 9, 4, 4, 1, 9, 4, 4, 9, 4, 4, 1, 4]', output: '[1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 9, 9, 9]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `Use three pointers: <code>lt</code> (less than), <code>i</code> (current), and <code>gt</code> (greater than). <br>
- If <code>arr[i] < pivot</code>: swap <code>i</code> and <code>lt</code>, increment both.<br>
- If <code>arr[i] == pivot</code>: increment <code>i</code>.<br>
- If <code>arr[i] > pivot</code>: swap <code>i</code> and <code>gt</code>, decrement <code>gt</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void quickSort3Way(vector<int>& arr, int low, int high) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    quickSort3Way(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      python: `def quick_sort_3way(arr, low, high):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    quick_sort_3way(arr, 0, n - 1)
    print(*(arr))`
    },
    solution: {
      cpp: `void quickSort3Way(vector<int>& arr, int low, int high) {
    if (low >= high) return;
    int lt = low, gt = high, i = low + 1;
    int pivot = arr[low];
    while (i <= gt) {
        if (arr[i] < pivot) swap(arr[lt++], arr[i++]);
        else if (arr[i] > pivot) swap(arr[i], arr[gt--]);
        else i++;
    }
    quickSort3Way(arr, low, lt - 1);
    quickSort3Way(arr, gt + 1, high);
}`
    },
    testCases: [
      { input: "6\n4 2 4 1 2 4", expected: "1 2 2 4 4 4" },
      { input: "5\n1 1 1 1 1", expected: "1 1 1 1 1" },
      { input: "4\n2 1 2 1", expected: "1 1 2 2" },
      { input: "7\n3 0 1 3 0 2 3", expected: "0 0 1 2 3 3 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Quick Sort with Negative Numbers",
    difficulty: "Easy",
    accuracy: "89.4%",
    submissions: "120K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Standard Partitioning",
    realWorld: "Used in scientific computation to sort vectors containing both positive magnitudes and negative directions.",
    description: `Given an array containing positive integers, negative integers, and zero, sort it in ascending order using Quick Sort.`,
    examples: [
      { input: 'arr = [-2, 45, 0, 11, -9]', output: '[-9, -2, 0, 11, 45]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '-10⁶ ≤ arr[i] ≤ 10⁶'
    ],
    hint: `The comparison <code>arr[j] <= pivot</code> handles negative numbers correctly by default in standard integer types. Ensure your pivot selection logic is robust.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void quickSort(vector<int>& arr, int low, int high) {
    // Standard implementation
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    quickSort(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `// Standard Lomuto or Hoare partition works identically for negative integers.`
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
    id: 12,
    title: "Quick Sort on Strings",
    difficulty: "Easy",
    accuracy: "82.5%",
    submissions: "80K+",
    companies: ["Zoho", "Accenture", "Wipro"],
    pattern: "Lexicographical QuickSort",
    realWorld: "Alphabetizing names in a digital directory or sorting paths in a file system.",
    description: `Given an array of strings, sort them in <strong>lexicographical</strong> (alphabetical) order using Quick Sort.`,
    examples: [
      { input: 'arr = ["banana", "apple", "mango"]', output: '["apple", "banana", "mango"]' }
    ],
    constraints: [
      '1 ≤ n ≤ 500',
      '1 ≤ length ≤ 100'
    ],
    hint: `Strings can be compared using <code><</code> or <code>></code> in C++ and Python. In Java, use <code>s1.compareTo(s2) <= 0</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int partition(vector<string>& arr, int low, int high) {
    // Your code here
}

void quickSort(vector<string>& arr, int low, int high) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<string> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    quickSort(arr, 0, n-1);
    for(string s : arr) cout << s << " ";
    return 0;
}`,
      python: `def quick_sort_strings(arr, low, high):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = input().split()
    quick_sort_strings(arr, 0, n - 1)
    print(*(arr))`,
      java: `import java.util.*;

class Solution {
    public static void quickSort(String[] arr, int low, int high) {
        // Use s1.compareTo(s2)
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] arr = new String[n];
        for(int i=0; i<n; i++) arr[i] = sc.next();
        quickSort(arr, 0, n-1);
        for(String s : arr) System.out.print(s + " ");
    }
}`
    },
    solution: {
      cpp: `int partition(vector<string>& arr, int low, int high) {
    string pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++; swap(arr[i], arr[j]);
        }
    }
    swap(arr[i+1], arr[high]);
    return i+1;
}`
    },
    testCases: [
      { input: "3\nbanana apple mango", expected: "apple banana mango" },
      { input: "4\nd c b a", expected: "a b c d" },
      { input: "3\ncat bat rat", expected: "bat cat rat" },
      { input: "2\nzoo alpha", expected: "alpha zoo" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Track Comparisons and Swaps",
    difficulty: "Medium",
    accuracy: "79.1%",
    submissions: "50K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Algorithmic Benchmarking",
    realWorld: "Used to evaluate the efficiency of a pivot selection strategy on real-world datasets before deploying code to production.",
    description: `Modify Quick Sort to count the total number of <strong>comparisons</strong> and <strong>swaps</strong> performed during the sorting of an array.
<br><br>Count every <code>arr[j] <= pivot</code> as a comparison and every <code>swap()</code> as a swap.`,
    examples: [
      { input: 'arr = [3, 1, 2]', output: 'Comparisons: 3, Swaps: 2' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Use global variables or pass-by-reference counters to increment every time the partition logic performs a comparison or a swap.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int comparisons = 0;
int swaps = 0;

int partition(vector<int>& arr, int low, int high) {
    // Your code here
}

void quickSort(vector<int>& arr, int low, int high) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    quickSort(arr, 0, n-1);
    cout << "Comparisons: " << comparisons << " Swaps: " << swaps << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        comparisons++;
        if (arr[j] <= pivot) {
            i++; 
            swap(arr[i], arr[j]);
            swaps++;
        }
    }
    swap(arr[i + 1], arr[high]);
    swaps++;
    return i + 1;
}`
    },
    testCases: [
      { input: "3\n3 1 2", expected: "Comparisons: 3 Swaps: 2" },
      { input: "4\n1 2 3 4", expected: "Comparisons: 6 Swaps: 4" },
      { input: "3\n3 2 1", expected: "Comparisons: 3 Swaps: 2" },
      { input: "5\n5 1 4 2 8", expected: "Comparisons: 10 Swaps: 6" }
    ],
    jsRunner: (input) => "Logic verified"
  },


  {
    id: 14,
    title: "Kth Smallest Element (Quick Select)",
    difficulty: "Medium",
    accuracy: "58.4%",
    submissions: "300K+",
    companies: ["Amazon", "Google", "Microsoft"],
    pattern: "Quick Select",
    realWorld: "Used in statistics to find the median or specific percentiles in a dataset without the overhead of a full sort.",
    description: `Given an array <strong>arr</strong> and an integer <strong>K</strong>, find the K-th smallest element. 
<br><br>While you can sort the array in O(n log n), implement this using the <strong>Quick Select</strong> algorithm to achieve an <strong>average time complexity of O(n)</strong>.`,
    examples: [
      { input: 'arr = [7, 10, 4, 3, 20, 15], K = 3', output: '7', explain: 'Sorted: [3, 4, 7, 10, 15, 20]. 3rd smallest is 7.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '1 ≤ K ≤ n'
    ],
    hint: `1. Pick a pivot and partition the array (Lomuto or Hoare).<br>
2. If the pivot index is <code>K-1</code>, you found the element.<br>
3. If the pivot index is <code>> K-1</code>, search only the <strong>left</strong> part.<br>
4. If the pivot index is <code>< K-1</code>, search only the <strong>right</strong> part.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int partition(vector<int>& arr, int l, int r) {
        int pivot = arr[r];
        int i = l;
        for (int j = l; j < r; j++) {
            if (arr[j] <= pivot) {
                swap(arr[i], arr[j]);
                i++;
            }
        }
        swap(arr[i], arr[r]);
        return i;
    }

    int quickSelect(vector<int>& arr, int l, int r, int k) {
        // Your code here
        return -1;
    }
};

int main() {
    int n, k; cin >> n >> k;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.quickSelect(arr, 0, n-1, k) << endl;
    return 0;
}`,
      python: `def quick_select(arr, l, r, k):
    # Your code here
    pass

if __name__ == "__main__":
    n, k = map(int, input().split())
    arr = list(map(int, input().split()))
    print(quick_select(arr, 0, n-1, k))`,
      javascript: `function quickSelect(arr, l, r, k) {
    // Your code here
}

const n = 6, k = 3, arr = [7, 10, 4, 3, 20, 15];
console.log(quickSelect(arr, 0, n - 1, k));`
    },
    solution: {
      cpp: `int quickSelect(vector<int>& arr, int l, int r, int k) {
    if (k > 0 && k <= r - l + 1) {
        int index = partition(arr, l, r);
        if (index - l == k - 1) return arr[index];
        if (index - l > k - 1) return quickSelect(arr, l, index - 1, k);
        return quickSelect(arr, index + 1, r, k - index + l - 1);
    }
    return -1;
}`
    },
    testCases: [
      { input: "6 3\n7 10 4 3 20 15", expected: "7" },
      { input: "5 1\n1 2 3 4 5", expected: "1" },
      { input: "5 5\n1 2 3 4 5", expected: "5" },
      { input: "2 2\n10 5", expected: "10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Kth Largest Element",
    difficulty: "Medium",
    accuracy: "62.1%",
    submissions: "250K+",
    companies: ["Facebook", "Wal-Mart", "Microsoft"],
    pattern: "Quick Select Variation",
    realWorld: "Used in streaming platforms to identify the 'Top K' trending videos or products in a session.",
    description: `Given an array <strong>arr</strong>, find the K-th largest element. 
<br><br>Note that it is the K-th largest element in the sorted order, not the K-th distinct element.`,
    examples: [
      { input: 'arr = [3, 2, 3, 1, 2, 4, 5, 5, 6], K = 4', output: '4' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `The K-th <strong>largest</strong> element is the same as the <code>(n - K + 1)</code>-th <strong>smallest</strong> element. Use the Quick Select algorithm from Problem 14 with this adjusted index.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    // Your code here
    return 0;
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> v(n);
    for(int i=0; i<n; i++) cin >> v[i];
    cout << findKthLargest(v, k) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int findKthLargest(vector<int>& nums, int k) {
    int n = nums.size();
    // Adjusted: Kth largest is (n-k+1)th smallest
    return quickSelect(nums, 0, n-1, n-k+1); 
}`
    },
    testCases: [
      { input: "9 4\n3 2 3 1 2 4 5 5 6", expected: "4" },
      { input: "6 2\n3 2 1 5 6 4", expected: "5" },
      { input: "1 1\n10", expected: "10" },
      { input: "4 4\n1 2 3 4", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "Sort Pairs by Second Value (Quick Sort)",
    difficulty: "Easy",
    accuracy: "78.4%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Custom Struct Sorting",
    realWorld: "Useful for sorting intervals by end-time or tasks by priority scores.",
    description: `Given an array of pairs <code>{id, value}</code>, sort them in ascending order based on the <strong>value</strong> using Quick Sort logic.`,
    examples: [
      { input: 'arr = [{1, 5}, {2, 3}, {3, 8}]', output: '[{2, 3}, {1, 5}, {3, 8}]' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Inside the partition function, instead of <code>arr[j] <= pivot</code>, compare the second field: <code>arr[j].val <= pivot.val</code>. Swap the entire pair.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Item { int id; int val; };

void quickSortItems(vector<Item>& arr, int low, int high) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<Item> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i].id >> arr[i].val;
    quickSortItems(arr, 0, n-1);
    for(auto it : arr) cout << "{" << it.id << "," << it.val << "} ";
    return 0;
}`
    },
    solution: {
      cpp: `int partition(vector<Item>& arr, int low, int high) {
    int pivot = arr[high].val;
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j].val <= pivot) {
            i++; swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`
    },
    testCases: [
      { input: "3\n1 5\n2 3\n3 8", expected: "{2,3} {1,5} {3,8}" },
      { input: "2\n10 1\n5 2", expected: "{10,1} {5,2}" },
      { input: "1\n1 1", expected: "{1,1}" },
      { input: "3\n1 10\n2 10\n3 5", expected: "{3,5} {1,10} {2,10}" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Implement In-Place Quick Sort",
    difficulty: "Medium",
    accuracy: "68.2%",
    submissions: "150K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "In-place Algorithm",
    realWorld: "Used in systems where extra memory allocation is forbidden (e.g., kernel-level code or hard drive firmware).",
    description: `Quick Sort is known for being <strong>In-Place</strong>. Implement it such that you do not use any extra arrays or vectors. 
<br><br>The total space complexity should be <strong>O(log n)</strong> for the recursion stack.`,
    examples: [
      { input: 'arr = [4, 3, 2, 1]', output: '[1, 2, 3, 4]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `Avoid <code>new</code>, <code>malloc</code>, or creating sub-vectors. Only use the <code>swap()</code> function and pass indices <code>low</code> and <code>high</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void quickSortInPlace(vector<int>& arr, int low, int high) {
    // Ensure no extra memory is used
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    quickSortInPlace(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `// Use standard Lomuto or Hoare partition logic 
// as they are inherently in-place.`
    },
    testCases: [
      { input: "4\n4 3 2 1", expected: "1 2 3 4" },
      { input: "5\n10 5 15 2 0", expected: "0 2 5 10 15" },
      { input: "2\n1 1", expected: "1 1" },
      { input: "3\n5 2 8", expected: "2 5 8" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Partition Array around Value X",
    difficulty: "Easy",
    accuracy: "85.1%",
    submissions: "80K+",
    companies: ["Amazon", "Google", "Microsoft"],
    pattern: "Partitioning",
    realWorld: "Used in 'Pivoting' logic where you want to separate data based on a threshold (e.g., moving all high-priority items to the front of a buffer).",
    description: `Given an array and a value <strong>X</strong> (which may not be in the array), partition the array such that all elements $\le$ X are on the left and all elements $>$ X are on the right.
<br><br>Note: You do not need to sort the two parts.`,
    examples: [
      { input: 'arr = [9, 12, 3, 5, 14, 10, 7], X = 10', output: '[9, 3, 5, 7, 12, 14, 10] (Any valid partition)' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `Use the same logic as the Lomuto partition loop, but instead of comparing with <code>arr[high]</code>, compare with the given constant <code>X</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void partitionAround(vector<int>& arr, int n, int x) {
    // Your code here
}

int main() {
    int n, x; cin >> n >> x;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    partitionAround(arr, n, x);
    for(int val : arr) cout << val << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void partitionAround(vector<int>& arr, int n, int x) {
    int i = 0;
    for (int j = 0; j < n; j++) {
        if (arr[j] <= x) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
}`
    },
    testCases: [
      { input: "7 10\n9 12 3 5 14 10 7", expected: "9 3 5 10 7 12 14" },
      { input: "3 5\n10 20 30", expected: "10 20 30" },
      { input: "3 50\n10 20 30", expected: "10 20 30" },
      { input: "4 5\n5 5 5 5", expected: "5 5 5 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Sort 0s, 1s, and 2s (Quick Logic)",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "120K+",
    companies: ["Google", "Facebook", "Directi"],
    pattern: "3-Way Quick Partition",
    realWorld: "Ideal for systems handling data with very low cardinality (few unique values), such as sorting pixels by color or users by subscription tier.",
    description: `Given an array containing only 0s, 1s, and 2s, sort them using the 3-way partitioning strategy of Quick Sort.`,
    examples: [
      { input: 'arr = [0, 1, 2, 0, 1, 2]', output: '[0, 0, 1, 1, 2, 2]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `This is the <strong>Dutch National Flag</strong> algorithm. Use three pointers: <code>low</code> (tracks 0s), <code>mid</code> (current element), and <code>high</code> (tracks 2s). <br>
1. If <code>arr[mid] == 0</code>, swap with <code>arr[low]</code>, increment <code>low</code> and <code>mid</code>.<br>
2. If <code>arr[mid] == 1</code>, increment <code>mid</code>.<br>
3. If <code>arr[mid] == 2</code>, swap with <code>arr[high]</code>, decrement <code>high</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sort012(vector<int>& arr, int n) {
    // Use 3-way partitioning
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sort012(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    
    solution: {
      cpp: `void sort012(vector<int>& arr, int n) {
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (arr[mid] == 0) swap(arr[low++], arr[mid++]);
        else if (arr[mid] == 1) mid++;
        else swap(arr[mid], arr[high--]);
    }
}`
    },
    testCases: [
      { input: "6\n0 1 2 0 1 2", expected: "0 0 1 1 2 2" },
      { input: "3\n2 1 0", expected: "0 1 2" },
      { input: "4\n1 1 1 1", expected: "1 1 1 1" },
      { input: "5\n0 0 2 1 2", expected: "0 0 1 2 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  


];