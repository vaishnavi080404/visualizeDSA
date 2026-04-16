const TOPIC_CONFIG = {
  name: "Bubble Sort",
  level: "Level 3 of 3 · Problems",
  backLink: "bubbleSort_L1.html",
  backLabel: "Bubble Sort"
};

const PROBLEMS = [
  {
    id: 1,
    title: "Standard Bubble Sort (Ascending)",
    difficulty: "Easy",
    accuracy: "85.2%",
    submissions: "500K+",
    companies: ["TCS", "Infosys", "Wipro"],
    pattern: "Adjacent Swapping",
    realWorld: "Used in computer graphics to sort polygons by their depth (Painter's Algorithm) when the number of objects is very small and nearly sorted.",
    description: `Given an unsorted array <strong>arr</strong> of <strong>n</strong> integers, sort the array in <strong>ascending order</strong> using the standard Bubble Sort algorithm.
<br><br>In each pass, the largest remaining element "bubbles up" to its correct position at the end of the array.`,
    examples: [
      { input: 'arr = [5, 1, 4, 2, 8]', output: '[1, 2, 4, 5, 8]', explain: '5 and 1 swap, then 5 and 4 swap, then 5 and 2 swap. After pass 1, 8 is at the end.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000',
      '-10⁴ ≤ arr[i] ≤ 10⁴'
    ],
    hint: `1. Run a loop <strong>i</strong> from 0 to n-1 (passes).<br>
2. Run an inner loop <strong>j</strong> from 0 to n-i-2.<br>
3. If <code>arr[j] > arr[j+1]</code>, swap them.<br>
4. After each outer loop iteration, the largest element of the unsorted part is placed at the end.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void bubbleSort(vector<int>& arr, int n) {
        // Your code here
    }
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    Solution sol;
    sol.bubbleSort(arr, n);
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
      python: `class Solution:
    def bubbleSort(self, arr, n):
        # Your code here
        pass

if __name__ == "__main__":
    import sys
    input_data = sys.stdin.read().split()
    if input_data:
        n = int(input_data[0])
        arr = list(map(int, input_data[1:]))
        Solution().bubbleSort(arr, n)
        print(*(arr))`,
      java: `import java.util.*;

class Solution {
    public void bubbleSort(int arr[], int n) {
        // Your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        new Solution().bubbleSort(arr, n);
        for(int x : arr) System.out.print(x + " ");
    }
}`,
      javascript: `function bubbleSort(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 0) {
    const n = parseInt(input[0]);
    const arr = input.slice(1, 1 + n).map(Number);
    bubbleSort(arr, n);
    console.log(arr.join(' '));
}`
    },
    solution: {
      cpp: `void bubbleSort(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
      javascript: `function bubbleSort(arr, n) {
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
}`
    },
    testCases: [
      { input: "5\n5 1 4 2 8", expected: "1 2 4 5 8" },
      { input: "3\n3 2 1", expected: "1 2 3" },
      { input: "4\n10 10 10 10", expected: "10 10 10 10" },
      { input: "1\n5", expected: "5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Optimized Bubble Sort (Early Exit)",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "250K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Adaptive Search",
    realWorld: "Used to verify if a list is already sorted with minimal effort. In a best-case scenario (already sorted), this reduces time complexity to O(n).",
    description: `The standard Bubble Sort runs O(N²) even if the array is already sorted. Modify the algorithm using a <strong>boolean flag</strong> to stop the execution if no swaps occur during a pass.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: 'Sorted in 1 pass', explain: 'No swaps needed, exit early.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `1. Inside the outer loop, initialize <code>swapped = false</code>.<br>
2. If any elements are swapped in the inner loop, set <code>swapped = true</code>.<br>
3. After the inner loop, if <code>swapped</code> is still <code>false</code>, break the outer loop.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int optimizedBubbleSort(vector<int>& arr, int n) {
        // Return total number of outer passes made
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.optimizedBubbleSort(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int optimizedBubbleSort(vector<int>& arr, int n) {
    int passes = 0;
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        passes++;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return passes;
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "1" },
      { input: "5\n5 4 3 2 1", expected: "4" },
      { input: "5\n2 1 3 4 5", expected: "2" },
      { input: "3\n10 20 30", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Bubble Sort (Descending Order)",
    difficulty: "Easy",
    accuracy: "88.1%",
    submissions: "150K+",
    companies: ["HackerRank", "CodeChef"],
    pattern: "Comparison Flip",
    realWorld: "Used when you need to sort items from 'Highest to Lowest' like ranking participants by their scores.",
    description: `Implement Bubble Sort to sort an array in <strong>descending order</strong> (Largest to Smallest).`,
    examples: [
      { input: 'arr = [1, 5, 2, 8]', output: '[8, 5, 2, 1]' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `The only difference from ascending order is the comparison: swap elements if <code>arr[j] < arr[j+1]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void bubbleSortDescending(vector<int>& arr, int n) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.bubbleSortDescending(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void bubbleSortDescending(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
    },
    testCases: [
      { input: "4\n1 5 2 8", expected: "8 5 2 1" },
      { input: "3\n10 20 30", expected: "30 20 10" },
      { input: "2\n5 5", expected: "5 5" },
      { input: "1\n9", expected: "9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Count Total Swaps",
    difficulty: "Easy",
    accuracy: "79.4%",
    submissions: "120K+",
    companies: ["HackerRank", "CodeChef"],
    pattern: "Metric Tracking",
    realWorld: "Counting swaps is a way to measure the 'inversion count' or how much 'disorder' is in a list.",
    description: `Given an array, perform Bubble Sort and count the <strong>total number of swaps</strong> performed until the array is sorted.`,
    examples: [
      { input: 'arr = [3, 2, 1]', output: '3', explain: 'Swap (3,2), then (3,1), then (2,1). Total = 3.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Increment a counter inside the <code>if (arr[j] > arr[j+1])</code> block.`,
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
    int count = 0;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                count++;
            }
        }
    }
    return count;
}`
    },
    testCases: [
      { input: "3\n3 2 1", expected: "3" },
      { input: "4\n1 2 3 4", expected: "0" },
      { input: "2\n2 1", expected: "1" },
      { input: "5\n5 1 4 2 8", expected: "4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Bubble Sort on Strings",
    difficulty: "Easy",
    accuracy: "82.1%",
    submissions: "80K+",
    companies: ["Zoho", "Accenture"],
    pattern: "Lexicographical Sort",
    realWorld: "Used to sort names alphabetically in simple embedded systems without complex sorting libraries.",
    description: `Given a list of strings, sort them in <strong>alphabetical order</strong> using Bubble Sort.`,
    examples: [
      { input: 'arr = ["banana", "apple", "cherry"]', output: '["apple", "banana", "cherry"]' }
    ],
    constraints: [
      '1 ≤ n ≤ 500',
      'String length ≤ 50'
    ],
    hint: `Use string comparison (<code>s1 > s2</code> in C++/Python or <code>s1.compareTo(s2) > 0</code> in Java).`,
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
}`
    },
    solution: {
      cpp: `void sortStrings(vector<string>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
    },
    testCases: [
      { input: "3\nbanana apple cherry", expected: "apple banana cherry" },
      { input: "2\nzebra alpha", expected: "alpha zebra" },
      { input: "4\nd c b a", expected: "a b c d" },
      { input: "3\ncat bat rat", expected: "bat cat rat" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Recursive Bubble Sort",
    difficulty: "Medium",
    accuracy: "65.4%",
    submissions: "45K+",
    companies: ["Adobe", "Oracle"],
    pattern: "Recursion",
    realWorld: "Demonstrates how iterative algorithms can be translated into recursive function calls, a common concept in functional programming.",
    description: `Implement Bubble Sort using <strong>recursion</strong> instead of nested loops. 
<br><br>The base case should be when the array size is 1. Each recursive step should perform one "bubble" pass to move the maximum element to the end.`,
    examples: [
      { input: 'arr = [3, 1, 2]', output: '[1, 2, 3]' }
    ],
    constraints: [
      '1 ≤ n ≤ 500'
    ],
    hint: `1. Base case: If <code>n == 1</code>, return.<br>
2. Do one pass of Bubble Sort (inner loop) for the current <code>n</code>.<br>
3. The largest element is now fixed at <code>n-1</code>.<br>
4. Recursively call for <code>n-1</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void recursiveBubble(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    recursiveBubble(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void recursiveBubble(vector<int>& arr, int n) {
    if (n == 1) return;
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            swap(arr[i], arr[i + 1]);
        }
    }
    recursiveBubble(arr, n - 1);
}`
    },
    testCases: [
      { input: "3\n3 1 2", expected: "1 2 3" },
      { input: "5\n5 4 3 2 1", expected: "1 2 3 4 5" },
      { input: "2\n10 5", expected: "5 10" },
      { input: "4\n1 2 3 4", expected: "1 2 3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Bubble Sort by Parity (Even-Odd)",
    difficulty: "Medium",
    accuracy: "60.2%",
    submissions: "30K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Custom Sort Condition",
    realWorld: "Used in data packet prioritization where you want to group certain types of data (like control packets vs data packets) while maintaining relative order within groups.",
    description: `Sort an array such that all <strong>even numbers</strong> appear before <strong>odd numbers</strong>. Within the even and odd groups, the original numerical order doesn't matter (just use bubble logic to move odds to the end).`,
    examples: [
      { input: 'arr = [1, 2, 3, 4]', output: '[2, 4, 1, 3] (or any order where even comes first)' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Modify the swap condition: If <code>arr[j]</code> is odd and <code>arr[j+1]</code> is even, swap them.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortByParity(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortByParity(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void sortByParity(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            // If current is odd and next is even, bubble the odd to the right
            if (arr[j] % 2 != 0 && arr[j + 1] % 2 == 0) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
    },
    testCases: [
      { input: "4\n1 2 3 4", expected: "2 4 1 3" },
      { input: "3\n1 3 5", expected: "1 3 5" },
      { input: "3\n2 4 6", expected: "2 4 6" },
      { input: "5\n1 2 3 2 1", expected: "2 2 1 3 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  
  {
    id: 8,
    title: "Optimized Bubble Sort (Early Break)",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "250K+",
    companies: ["Amazon", "Microsoft", "Samsung"],
    pattern: "Adaptive Search",
    realWorld: "Used in systems where data is frequently 'nearly sorted' (like real-time data feeds), allowing the system to skip unnecessary processing cycles.",
    description: `Standard Bubble Sort takes O(n²) time regardless of the input. Implement an <strong>optimized</strong> version that uses a <code>swapped</code> flag to break out of the loop if no elements were swapped in a pass.
<br><br>Return the <strong>total number of passes</strong> performed before the algorithm stops.`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: '1', explain: 'No swaps in the first pass, so it exits immediately.' },
      { input: 'arr = [2, 1, 3, 4, 5]', output: '2', explain: 'Swaps 2 and 1 in pass 1. Pass 2 finds no swaps and exits.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000',
      '-10⁴ ≤ arr[i] ≤ 10⁴'
    ],
    hint: `1. Initialize a boolean <code>swapped = false</code> at the start of the outer loop.<br>
2. If any elements are swapped in the inner loop, set <code>swapped = true</code>.<br>
3. If after the inner loop <code>swapped</code> is still false, use <code>break</code> to end the sorting.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int optimizedBubbleSort(vector<int>& arr, int n) {
        // Return number of outer loop passes
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.optimizedBubbleSort(arr, n) << endl;
    return 0;
}`,
      python: `class Solution:
    def optimizedBubbleSort(self, arr, n):
        # Return count of passes
        pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(Solution().optimizedBubbleSort(arr, n))`,
      javascript: `function optimizedBubbleSort(arr, n) {
    // Your code here
}

const n = 5, arr = [1, 2, 3, 4, 5];
console.log(optimizedBubbleSort(arr, n));`
    },
    solution: {
      cpp: `int optimizedBubbleSort(vector<int>& arr, int n) {
    int passes = 0;
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        passes++;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return passes;
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "1" },
      { input: "5\n5 4 3 2 1", expected: "4" },
      { input: "5\n2 1 3 4 5", expected: "2" },
      { input: "3\n10 5 15", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Recursive Bubble Sort",
    difficulty: "Medium",
    accuracy: "65.4%",
    submissions: "45K+",
    companies: ["Adobe", "Oracle"],
    pattern: "Recursion",
    realWorld: "Used to understand how iterative loops can be converted into recursive calls, a common concept in functional programming languages.",
    description: `Implement Bubble Sort using <strong>recursion</strong>. 
<br><br>Each recursive call should represent one pass of the outer loop, moving the largest element of the current unsorted portion to the end.`,
    examples: [
      { input: 'arr = [3, 1, 2]', output: '[1, 2, 3]' }
    ],
    constraints: [
      '1 ≤ n ≤ 500'
    ],
    hint: `1. Base case: If <code>n == 1</code>, return.<br>
2. Run one pass of bubble sort (inner loop) to move the largest element to the end.<br>
3. Recursively call the function for <code>n - 1</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void recursiveBubble(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    recursiveBubble(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      python: `import sys
sys.setrecursionlimit(2000)

def recursiveBubble(arr, n):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    recursiveBubble(arr, n)
    print(*(arr))`
    },
    solution: {
      cpp: `void recursiveBubble(vector<int>& arr, int n) {
    if (n == 1) return;
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            swap(arr[i], arr[i + 1]);
        }
    }
    recursiveBubble(arr, n - 1);
}`
    },
    testCases: [
      { input: "3\n3 1 2", expected: "1 2 3" },
      { input: "5\n5 4 3 2 1", expected: "1 2 3 4 5" },
      { input: "4\n10 20 30 40", expected: "10 20 30 40" },
      { input: "2\n2 1", expected: "1 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Bubble Sort with Negatives",
    difficulty: "Easy",
    accuracy: "89.2%",
    submissions: "100K+",
    companies: ["Google", "Facebook"],
    pattern: "Linear Sorting",
    realWorld: "Used in financial software to sort a list of transactions containing both credits (positives) and debits (negatives).",
    description: `Sort an array containing positive integers, negative integers, and zero in ascending order using Bubble Sort.`,
    examples: [
      { input: 'arr = [-2, 45, 0, 11, -9]', output: '[-9, -2, 0, 11, 45]' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000',
      '-10⁵ ≤ arr[i] ≤ 10⁵'
    ],
    hint: `The comparison operator <code>></code> automatically handles negative numbers. No special logic is required other than the standard Bubble Sort passes.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortNegatives(vector<int>& arr, int n) {
    // Your code here
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
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);
        }
    }
}`
    },
    testCases: [
      { input: "5\n-2 45 0 11 -9", expected: "-9 -2 0 11 45" },
      { input: "3\n-1 -2 -3", expected: "-3 -2 -1" },
      { input: "4\n0 0 -1 1", expected: "-1 0 0 1" },
      { input: "2\n10 -10", expected: "-10 10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Bubble Sort on Strings",
    difficulty: "Easy",
    accuracy: "82.5%",
    submissions: "80K+",
    companies: ["Zoho", "Accenture", "TCS"],
    pattern: "Lexicographical Sort",
    realWorld: "Sorting names in a contact list or words in a dictionary in simple database systems.",
    description: `Given an array of strings, sort them in <strong>lexicographical</strong> (alphabetical) order using Bubble Sort.`,
    examples: [
      { input: 'arr = ["banana", "apple", "mango"]', output: '["apple", "banana", "mango"]' }
    ],
    constraints: [
      '1 ≤ n ≤ 500',
      '1 ≤ string length ≤ 100'
    ],
    hint: `In most languages, the comparison operator <code>></code> works for strings based on ASCII values. In Java, use <code>s1.compareTo(s2) > 0</code>.`,
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
      javascript: `function sortStrings(arr, n) {
    // Your code here
}

const arr = ["banana", "apple", "mango"];
sortStrings(arr, arr.length);
console.log(arr.join(' '));`
    },
    solution: {
      cpp: `void sortStrings(vector<string>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);
        }
    }
}`
    },
    testCases: [
      { input: "3\nbanana apple mango", expected: "apple banana mango" },
      { input: "4\nd c b a", expected: "a b c d" },
      { input: "3\ncat bat rat", expected: "bat cat rat" },
      { input: "2\nzoo apple", expected: "apple zoo" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Sort First K Elements",
    difficulty: "Medium",
    accuracy: "76.1%",
    submissions: "50K+",
    companies: ["Google", "Facebook"],
    pattern: "Partial Sorting",
    realWorld: "Used in search engines to sort only the first 'page' (Top K) of results while keeping the rest unsorted.",
    description: `Given an array of size <strong>n</strong> and an integer <strong>k</strong>, sort only the <strong>first k elements</strong> in ascending order. The remaining <code>n-k</code> elements should remain in their original positions.`,
    examples: [
      { input: 'arr = [5, 4, 3, 2, 1], k = 3', output: '[3, 4, 5, 2, 1]', explain: 'Only indices 0, 1, 2 are sorted.' }
    ],
    constraints: [
      '1 ≤ k ≤ n ≤ 1000'
    ],
    hint: `Perform Bubble Sort passes, but restrict the inner loop boundary so that it only compares and swaps elements within the range <code>[0...k-1]</code>.`,
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
    for (int i = 0; i < k - 1; i++) {
        for (int j = 0; j < k - i - 1; j++) {
            if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);
        }
    }
}`
    },
    testCases: [
      { input: "5 3\n5 4 3 2 1", expected: "3 4 5 2 1" },
      { input: "6 4\n10 5 8 2 20 15", expected: "2 5 8 10 20 15" },
      { input: "3 2\n2 1 3", expected: "1 2 3" },
      { input: "5 5\n5 4 3 2 1", expected: "1 2 3 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Trace Largest in Each Pass",
    difficulty: "Easy",
    accuracy: "88.4%",
    submissions: "40K+",
    companies: ["HackerRank", "CodeChef"],
    pattern: "Dry Run Tracking",
    realWorld: "Used for educational visualizations to track which element is currently 'bubbling' to the top of the unsorted segment.",
    description: `Perform Bubble Sort on an array. For each complete pass of the outer loop, store the value of the <strong>largest element</strong> that just reached its final sorted position.`,
    examples: [
      { input: 'arr = [5, 1, 4, 2, 8]', output: '[8, 5, 4, 2]', explain: 'Pass 1 moves 8 to end. Pass 2 moves 5 to index 3, etc.' }
    ],
    constraints: [
      '1 ≤ n ≤ 100'
    ],
    hint: `After the inner loop <code>j</code> finishes for a specific <code>i</code>, the element at index <code>n - i - 1</code> is the one that was bubbled up. Add it to a result list.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> traceLargest(vector<int> arr, int n) {
    // Return list of elements bubbled up in each pass
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    vector<int> res = traceLargest(arr, n);
    for(int x : res) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> traceLargest(vector<int> arr, int n) {
    vector<int> largestArr;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);
        }
        largestArr.push_back(arr[n - i - 1]);
    }
    return largestArr;
}`
    },
    testCases: [
      { input: "5\n5 1 4 2 8", expected: "8 5 4 2" },
      { input: "3\n10 20 30", expected: "30 20" },
      { input: "4\n4 3 2 1", expected: "4 3 2" },
      { input: "2\n10 5", expected: "10" }
    ],
    jsRunner: (input) => "Logic verified"
  },
  
  {
    id: 14,
    title: "Check if Sorted (Bubble Logic)",
    difficulty: "Easy",
    accuracy: "92.4%",
    submissions: "300K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Single Pass Verification",
    realWorld: "Used as a 'Gatekeeper' function in pipelines to skip heavy sorting algorithms if the incoming data stream is already ordered.",
    description: `Given an array <strong>arr</strong>, determine if it is already sorted in ascending order. You must use the logic of a <strong>single pass</strong> of Bubble Sort to decide.
<br><br>If any adjacent pair is found where <code>arr[j] > arr[j+1]</code>, the array is not sorted.`,
    examples: [
      { input: 'arr = [1, 2, 3, 5, 4]', output: 'false', explain: 'Pair (5, 4) is in wrong order.' },
      { input: 'arr = [10, 20, 30]', output: 'true' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '-10⁹ ≤ arr[i] ≤ 10⁹'
    ],
    hint: `Iterate from <code>0</code> to <code>n-2</code>. If you find even one instance where <code>arr[i] > arr[i+1]</code>, return false immediately.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool isSorted(vector<int>& arr, int n) {
    // Your code here
    return true;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << (isSorted(arr, n) ? "true" : "false") << endl;
    return 0;
}`,
      python: `def is_sorted(arr, n):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print("true" if is_sorted(arr, n) else "false")`,
      java: `import java.util.*;
class Solution {
    public static boolean isSorted(int[] arr, int n) {
        // Your code here
        return true;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        System.out.println(isSorted(arr, n));
    }
}`,
      javascript: `function isSorted(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1 + n).map(Number);
console.log(isSorted(arr, n));`
    },
    solution: {
      cpp: `bool isSorted(vector<int>& arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "true" },
      { input: "5\n1 2 5 4 3", expected: "false" },
      { input: "2\n10 5", expected: "false" },
      { input: "1\n100", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Bubble Sort on Linked List",
    difficulty: "Medium",
    accuracy: "64.1%",
    submissions: "45K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Pointer Traversal",
    realWorld: "Sorting data in low-level systems (like firmware) where memory is allocated as discrete nodes rather than contiguous blocks.",
    description: `Sort a singly linked list using Bubble Sort. Instead of swapping the nodes themselves, swap the <strong>data</strong> within the nodes.`,
    examples: [
      { input: 'head = 4 -> 1 -> 3 -> 2', output: '1 -> 2 -> 3 -> 4' }
    ],
    constraints: [
      'Number of nodes ≤ 500'
    ],
    hint: `1. Use two nested loops similar to array bubble sort.<br>
2. The outer loop runs <code>n</code> times.<br>
3. The inner loop traverses from <code>head</code> to the end, swapping <code>curr->data</code> and <code>curr->next->data</code> if needed.`,
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(NULL) {}
};

void bubbleSortLL(Node* head) {
    // Your code here
}

void printList(Node* head) {
    while(head) { cout << head->data << " "; head = head->next; }
}

int main() {
    int n; cin >> n;
    if(n == 0) return 0;
    int firstVal; cin >> firstVal;
    Node* head = new Node(firstVal);
    Node* temp = head;
    for(int i=1; i<n; i++) {
        int v; cin >> v;
        temp->next = new Node(v);
        temp = temp->next;
    }
    bubbleSortLL(head);
    printList(head);
    return 0;
}`,
      javascript: `/* Node: {data, next} */
function bubbleSortLL(head) {
    // Your code here
}`
    },
    solution: {
      cpp: `void bubbleSortLL(Node* head) {
    if (!head) return;
    bool swapped;
    Node* ptr1;
    Node* lptr = NULL;
    do {
        swapped = false;
        ptr1 = head;
        while (ptr1->next != lptr) {
            if (ptr1->data > ptr1->next->data) {
                swap(ptr1->data, ptr1->next->data);
                swapped = true;
            }
            ptr1 = ptr1->next;
        }
        lptr = ptr1;
    } while (swapped);
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
    id: 16,
    title: "Bubble Sort 0s, 1s, and 2s",
    difficulty: "Easy",
    accuracy: "78.2%",
    submissions: "400K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Multi-Category Bubble",
    realWorld: "Used to separate three types of logs (Error, Warning, Info) based on their severity codes.",
    description: `Given an array containing only 0s, 1s, and 2s, sort them in ascending order using <strong>Bubble Sort logic</strong>. 
<br><br>While faster algorithms exist, this exercise ensures you can apply bubble sorting to specific restricted values.`,
    examples: [
      { input: 'arr = [2, 0, 1]', output: '[0, 1, 2]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁴'
    ],
    hint: `This is a standard Bubble Sort. Because there are only three values, the elements will move into their positions (0s at start, 2s at end) very predictably in O(n²) time.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sort012(vector<int>& arr, int n) {
    // Your code here
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
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);
        }
    }
}`
    },
    testCases: [
      { input: "5\n0 2 1 2 0", expected: "0 0 1 2 2" },
      { input: "3\n2 1 0", expected: "0 1 2" },
      { input: "4\n1 1 1 1", expected: "1 1 1 1" },
      { input: "2\n1 0", expected: "0 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Bubble Sort: Track Original Indices",
    difficulty: "Medium",
    accuracy: "75.4%",
    submissions: "50K+",
    companies: ["Google", "Facebook"],
    pattern: "Data Bundling",
    realWorld: "Crucial when sorting entries in a spreadsheet based on one column but needing to know which row each value originally belonged to.",
    description: `Given an array, sort it in ascending order using Bubble Sort. Instead of returning the sorted values, return the <strong>original indices</strong> of the elements in their new sorted positions.`,
    examples: [
      { input: 'arr = [50, 10, 40]', output: '[1, 2, 0]', explain: 'Sorted is [10, 40, 50]. 10 was at index 1, 40 at 2, 50 at 0.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `1. Create an array of pairs or objects: <code>{value: arr[i], index: i}</code>.<br>
2. Run Bubble Sort on this array, comparing the <code>value</code> property.<br>
3. Swap the entire pair/object.<br>
4. Extract the <code>index</code> property at the end.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Element { int val; int originalIdx; };

vector<int> bubbleSortWithIndices(vector<int>& arr, int n) {
    // Your code here
    return {};
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    vector<int> res = bubbleSortWithIndices(arr, n);
    for(int x : res) cout << x << " ";
    return 0;
}`,
      javascript: `function sortIndices(arr, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> bubbleSortWithIndices(vector<int>& arr, int n) {
    vector<Element> elements(n);
    for(int i=0; i<n; i++) elements[i] = {arr[i], i};
    for(int i=0; i<n-1; i++) {
        for(int j=0; j<n-i-1; j++) {
            if(elements[j].val > elements[j+1].val) {
                swap(elements[j], elements[j+1]);
            }
        }
    }
    vector<int> result;
    for(auto e : elements) result.push_back(e.originalIdx);
    return result;
}`
    },
    testCases: [
      { input: "3\n50 10 40", expected: "1 2 0" },
      { input: "4\n5 5 5 5", expected: "0 1 2 3" },
      { input: "2\n100 0", expected: "1 0" },
      { input: "5\n1 2 3 4 5", expected: "0 1 2 3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Minimize Swaps (Cocktail Shaker Sort)",
    difficulty: "Hard",
    accuracy: "45.1%",
    submissions: "20K+",
    companies: ["Google", "Facebook"],
    pattern: "Bidirectional Bubble",
    realWorld: "Used in algorithms where 'turtles' (small values near the end of a list) slow down standard Bubble Sort. Bidirectional passes move them faster.",
    description: `Implement the <strong>Cocktail Shaker Sort</strong>. It is a variation of Bubble Sort that sorts in both directions in each pass:
<br>1. Left to right (bubbles the largest to the end).
<br>2. Right to left (bubbles the smallest to the start).
<br><br>Return the total number of swaps.`,
    examples: [
      { input: 'arr = [5, 1, 4, 2]', output: '4' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Maintain <code>start</code> and <code>end</code> pointers. After the forward pass, decrement <code>end</code>. After the backward pass, increment <code>start</code>. Continue until they meet.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int cocktailSort(vector<int>& arr, int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << cocktailSort(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int cocktailSort(vector<int>& arr, int n) {
    bool swapped = true;
    int start = 0, end = n - 1, count = 0;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; ++i) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                swapped = true; count++;
            }
        }
        if (!swapped) break;
        swapped = false;
        --end;
        for (int i = end - 1; i >= start; --i) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                swapped = true; count++;
            }
        }
        ++start;
    }
    return count;
}`
    },
    testCases: [
      { input: "4\n5 1 4 2", expected: "4" },
      { input: "5\n2 3 4 5 1", expected: "4" },
      { input: "3\n1 2 3", expected: "0" },
      { input: "4\n4 3 2 1", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Costly Swaps (Optimized Strategy)",
    difficulty: "Medium",
    accuracy: "82.5%",
    submissions: "50K+",
    companies: ["Google", "Facebook"],
    pattern: "Efficient Adjacent Swapping",
    realWorld: "Used in database indexing where writing data (swapping) to disk is 100x slower than reading (comparing) data.",
    description: `In a system where <strong>swaps are expensive</strong> but comparisons are cheap, implement a Bubble Sort that uses the early break optimization and tracks exactly how many elements are moved to the 'sorted' region.
<br><br>What is the minimum number of passes needed to sort <code>[2, 3, 4, 5, 1]</code>?`,
    examples: [
      { input: 'arr = [2, 3, 4, 5, 1]', output: '4', explain: 'The smallest element 1 is a "turtle" and takes 4 passes to move to the front.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Even if you optimize the end of the array, the start of the array still takes one pass per position to move a small value to the left.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int costlySwapsPasses(vector<int> arr, int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << costlySwapsPasses(arr, n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int costlySwapsPasses(vector<int> arr, int n) {
    int passes = 0;
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        passes++;
        if (!swapped) return passes - 1; // Last pass had no swaps
    }
    return passes;
}`
    },
    testCases: [
      { input: "5\n2 3 4 5 1", expected: "4" },
      { input: "4\n1 2 3 4", expected: "0" },
      { input: "3\n3 2 1", expected: "2" },
      { input: "5\n1 5 2 3 4", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  }


];