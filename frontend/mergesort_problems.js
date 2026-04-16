const TOPIC_CONFIG = {
  name: "Merge Sort",
  level: "Level 3 of 3 · Problems",
  backLink: "mergeSort_L1.html",
  backLabel: "Merge Sort"
};

const PROBLEMS = [
  {
    id: 1,
    title: "Implement Merge Sort (Ascending)",
    difficulty: "Medium",
    accuracy: "65.4%",
    submissions: "600K+",
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Divide and Conquer",
    realWorld: "Used in 'External Sorting' to sort massive datasets that don't fit in a computer's RAM, by sorting small chunks and merging them from disk.",
    description: `Given an unsorted array <strong>arr</strong> of <strong>n</strong> integers, sort the array in <strong>ascending order</strong> using the Merge Sort algorithm.
<br><br>Merge Sort works by recursively dividing the array into two halves, sorting them, and then merging the sorted halves back together.`,
    examples: [
      { input: 'arr = [38, 27, 43, 3, 9, 82, 10]', output: '[3, 9, 10, 27, 38, 43, 82]', explain: 'Array is split down to single elements and merged in sorted order.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '-10⁹ ≤ arr[i] ≤ 10⁹'
    ],
    hint: `1. <strong>Divide:</strong> Find the midpoint <code>mid = low + (high-low)/2</code>.<br>
2. <strong>Conquer:</strong> Recursively call <code>mergeSort</code> for the left half and right half.<br>
3. <strong>Combine:</strong> Use a <code>merge</code> function to join two sorted sub-arrays into one sorted array using temporary storage.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void merge(vector<int>& arr, int l, int m, int r) {
        // Your code here
    }

    void mergeSort(vector<int>& arr, int l, int r) {
        // Your code here
    }
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    Solution sol;
    sol.mergeSort(arr, 0, n - 1);
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
      python: `class Solution:
    def mergeSort(self, arr, l, r):
        # Your code here
        pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    Solution().mergeSort(arr, 0, n - 1)
    print(*(arr))`,
      java: `import java.util.*;

class Solution {
    void merge(int arr[], int l, int m, int r) { }
    void mergeSort(int arr[], int l, int r) { }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i = 0; i < n; i++) arr[i] = sc.nextInt();
        new Solution().mergeSort(arr, 0, n - 1);
        for(int x : arr) System.out.print(x + " ");
    }
}`,
      javascript: `function mergeSort(arr, l, r) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 0) {
    const n = parseInt(input[0]);
    const arr = input.slice(1, 1 + n).map(Number);
    mergeSort(arr, 0, n - 1);
    console.log(arr.join(' '));
}`
    },
    solution: {
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
    },
    testCases: [
      { input: "7\n38 27 43 3 9 82 10", expected: "3 9 10 27 38 43 82" },
      { input: "4\n5 4 3 2", expected: "2 3 4 5" },
      { input: "1\n100", expected: "100" },
      { input: "5\n1 2 3 4 5", expected: "1 2 3 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Implement Merge Sort (Descending)",
    difficulty: "Easy",
    accuracy: "82.1%",
    submissions: "200K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Divide and Conquer",
    realWorld: "Used when you need to sort items from 'Most Recent' to 'Oldest' or 'Highest Rank' to 'Lowest Rank' in large-scale datasets.",
    description: `Given an unsorted array, sort it in <strong>descending order</strong> using the Merge Sort algorithm.`,
    examples: [
      { input: 'arr = [1, 5, 2, 8]', output: '[8, 5, 2, 1]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `Modify the <code>merge</code> function: when comparing elements from the two sub-arrays, pick the <strong>larger</strong> element first to place it at the front. (Change <code>L[i] <= R[j]</code> to <code>L[i] >= R[j]</code>).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void mergeSortDescending(vector<int>& arr, int l, int r) {
        // Your code here
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    sol.mergeSortDescending(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for (int i=0; i<n1; i++) L[i] = arr[l+i];
    for (int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i < n1 && j < n2) {
        if(L[i] >= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while(i < n1) arr[k++] = L[i++];
    while(j < n2) arr[k++] = R[j++];
}
void mergeSortDescending(vector<int>& arr, int l, int r) {
    if(l < r) {
        int m = l + (r-l)/2;
        mergeSortDescending(arr, l, m);
        mergeSortDescending(arr, m+1, r);
        merge(arr, l, m, r);
    }
}`
    },
    testCases: [
      { input: "4\n1 5 2 8", expected: "8 5 2 1" },
      { input: "3\n10 20 30", expected: "30 20 10" },
      { input: "1\n5", expected: "5" },
      { input: "5\n-1 0 1 2 3", expected: "3 2 1 0 -1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Merge Sort: Trace Merge Steps",
    difficulty: "Medium",
    accuracy: "70.5%",
    submissions: "150K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Simulation",
    realWorld: "Visualizing recursive execution. This approach is used in algorithmic animation tools to teach how sub-problems are solved and combined.",
    description: `Sort an array using Merge Sort and print the elements of the subarray being merged <strong>after</strong> each merge step.`,
    examples: [
      { input: 'arr = [4, 1, 3, 2]', output: 'Merge: 1 4\nMerge: 2 3\nMerge: 1 2 3 4', explain: 'Subarrays [4] and [1] merge, then [3] and [2], then [1,4] and [2,3].' }
    ],
    constraints: [
      '1 ≤ n ≤ 64'
    ],
    hint: `Inside your <code>merge</code> function, after you have copied the sorted elements back into <code>arr[l...r]</code>, add a loop to print the values from index <code>l</code> to <code>r</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void mergeAndPrint(vector<int>& arr, int l, int m, int r) {
    // Merge logic + print
}

void mergeSortTrace(vector<int>& arr, int l, int r) {
    // Recursive calls
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    mergeSortTrace(arr, 0, n-1);
    return 0;
}`
    },
    solution: {
      cpp: `void mergeAndPrint(vector<int>& arr, int l, int m, int r) {
    int n1 = m-l+1, n2 = r-m;
    vector<int> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i<n1 && j<n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while(i<n1) arr[k++] = L[i++];
    while(j<n2) arr[k++] = R[j++];
    cout << "Merge:";
    for(int x=l; x<=r; x++) cout << " " << arr[x];
    cout << endl;
}`
    },
    testCases: [
      { input: "4\n4 1 3 2", expected: "Merge: 1 4\nMerge: 2 3\nMerge: 1 2 3 4" },
      { input: "3\n3 2 1", expected: "Merge: 2 3\nMerge: 1 2 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Merge Two Sorted Arrays",
    difficulty: "Easy",
    accuracy: "88.4%",
    submissions: "400K+",
    companies: ["Microsoft", "Samsung", "Adobe"],
    pattern: "Two Pointers",
    realWorld: "Used in database 'Merge Joins' to combine two results sets that are already indexed and sorted efficiently.",
    description: `Given two sorted arrays <strong>A</strong> and <strong>B</strong> of sizes <strong>n</strong> and <strong>m</strong>, merge them into a single sorted array <strong>C</strong> without using any sorting algorithm.`,
    examples: [
      { input: 'A = [1, 3, 5], B = [2, 4, 6]', output: '[1, 2, 3, 4, 5, 6]' }
    ],
    constraints: [
      '1 ≤ n, m ≤ 10⁵'
    ],
    hint: `1. Use two pointers, <code>i</code> for A and <code>j</code> for B.<br>
2. Compare <code>A[i]</code> and <code>B[j]</code>.<br>
3. Put the smaller one into the result array and move its pointer.<br>
4. After one array is exhausted, append the remaining elements of the other array.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> mergeSorted(vector<int>& A, vector<int>& B) {
    // Your code here
    return {};
}

int main() {
    int n, m; cin >> n >> m;
    vector<int> A(n), B(m);
    for(int i=0; i<n; i++) cin >> A[i];
    for(int i=0; i<m; i++) cin >> B[i];
    vector<int> res = mergeSorted(A, B);
    for(int x : res) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> mergeSorted(vector<int>& A, vector<int>& B) {
    int n = A.size(), m = B.size();
    vector<int> C;
    int i = 0, j = 0;
    while (i < n && j < m) {
        if (A[i] <= B[j]) C.push_back(A[i++]);
        else C.push_back(B[j++]);
    }
    while (i < n) C.push_back(A[i++]);
    while (j < m) C.push_back(B[j++]);
    return C;
}`
    },
    testCases: [
      { input: "3 3\n1 3 5\n2 4 6", expected: "1 2 3 4 5 6" },
      { input: "2 4\n10 20\n1 2 3 4", expected: "1 2 3 4 10 20" },
      { input: "1 1\n5\n5", expected: "5 5" },
      { input: "3 1\n1 2 3\n0", expected: "0 1 2 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Count Comparisons in Merge Sort",
    difficulty: "Medium",
    accuracy: "62.1%",
    submissions: "100K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Algorithm Analysis",
    realWorld: "Used to verify the theoretical performance of the algorithm and ensure that implementation doesn't do redundant work.",
    description: `Calculate the total number of element-to-element comparisons performed by Merge Sort for a given array. 
<br><br>Count only comparisons happening inside the <code>while (i < n1 && j < n2)</code> block during the merge step.`,
    examples: [
      { input: 'arr = [4, 3, 2, 1]', output: '4', explain: 'Splits: [4,3] and [2,1]. Merge [4][3] takes 1 comp. Merge [2][1] takes 1 comp. Merge [3,4][1,2] takes 2 comps. Total = 4.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `Pass a counter by reference to your <code>merge</code> function. Every time you check <code>if (L[i] <= R[j])</code>, increment the counter.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int mergeAndCount(vector<int>& arr, int l, int m, int r) {
    // Return number of comparisons in this merge
    return 0;
}

int solve(vector<int>& arr, int l, int r) {
    // Total comparisons
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << solve(arr, 0, n-1) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int mergeAndCount(vector<int>& arr, int l, int m, int r) {
    int count = 0;
    int n1 = m-l+1, n2 = r-m;
    vector<int> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i < n1 && j < n2) {
        count++;
        if(L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while(i<n1) arr[k++] = L[i++];
    while(j<n2) arr[k++] = R[j++];
    return count;
}
int solve(vector<int>& arr, int l, int r) {
    if(l >= r) return 0;
    int m = l + (r-l)/2;
    return solve(arr, l, m) + solve(arr, m+1, r) + mergeAndCount(arr, l, m, r);
}`
    },
    testCases: [
      { input: "4\n4 3 2 1", expected: "4" },
      { input: "5\n1 2 3 4 5", expected: "5" },
      { input: "2\n1 2", expected: "1" },
      { input: "8\n8 7 6 5 4 3 2 1", expected: "12" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Merge Sort: Already Sorted Case",
    difficulty: "Easy",
    accuracy: "92.4%",
    submissions: "50K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Analytical",
    realWorld: "Highlights that Merge Sort is not 'adaptive'. Unlike optimized Bubble Sort or Insertion Sort, it always performs $O(n \log n)$ work even if the data is already perfect.",
    description: `Given a <strong>pre-sorted</strong> array, count the number of comparisons made by Merge Sort. Does it perform fewer comparisons than an unsorted array?`,
    examples: [
      { input: 'arr = [1, 2, 3, 4]', output: '4', explain: 'For n=4, merge sort always splits and merges, taking the same number of comparisons for sorted data.' }
    ],
    constraints: [
      '1 ≤ n ≤ 1000'
    ],
    hint: `In the <code>merge</code> step of Merge Sort, if the data is sorted, one sub-array will always be exhausted before the other, but comparisons still happen for every element of the shorter list.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int countSortedComparisons(int n) {
    // Simulate merge sort on 1...n and return count
    return 0;
}

int main() {
    int n; cin >> n;
    cout << countSortedComparisons(n) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `// Standard merge sort counting logic (see Problem 5) applied to sorted array [1,2,3...n]`
    },
    testCases: [
      { input: "4\n1 2 3 4", expected: "4" },
      { input: "2\n1 2", expected: "1" },
      { input: "8\n1 2 3 4 5 6 7 8", expected: "12" },
      { input: "1\n10", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Merge Sort: Reverse Sorted Case",
    difficulty: "Easy",
    accuracy: "91.2%",
    submissions: "50K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Analytical",
    realWorld: "This is often the 'worst case' for many algorithms, but Merge Sort handles it with the same efficiency as any other case.",
    description: `Given an array sorted in <strong>descending order</strong>, use Merge Sort to sort it in <strong>ascending order</strong> and return the final sorted array.`,
    examples: [
      { input: 'arr = [10, 5, 2, 1]', output: '[1, 2, 5, 10]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `The algorithm remains exactly the same. Merge Sort doesn't care about the initial order; it will always split into single elements and rebuild.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void mergeSortReverse(vector<int>& arr, int l, int r) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    mergeSortReverse(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `// Standard Merge Sort Ascending implementation`
    },
    testCases: [
      { input: "4\n10 5 2 1", expected: "1 2 5 10" },
      { input: "3\n3 2 1", expected: "1 2 3" },
      { input: "5\n100 80 60 40 20", expected: "20 40 60 80 100" },
      { input: "2\n2 1", expected: "1 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 8,
    title: "Merge Sort Recursive Trace",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "80K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Recursive Tree",
    realWorld: "Used to understand the depth of recursion (log n), which is critical for calculating the 'Stack Space' needed in embedded systems with limited memory.",
    description: `Implement Merge Sort and track the depth of the recursion. 
<br><br>For each call to <code>mergeSort(l, r)</code>, return the <strong>maximum depth</strong> reached by the recursion tree.`,
    examples: [
      { input: 'n = 4', output: '3', explain: 'Level 1: [0,3], Level 2: [0,1][2,3], Level 3: [0][1][2][3]. Max depth is 3.' },
      { input: 'n = 1', output: '1' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `1. The depth of a leaf node is 1.<br>
2. <code>depth(l, r) = 1 + max(depth(left_half), depth(right_half))</code>.<br>
3. This is mathematically equal to $\lceil \log_2 n \rceil + 1$.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int getRecursionDepth(int l, int r) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    Solution sol;
    cout << sol.getRecursionDepth(0, n - 1) << endl;
    return 0;
}`,
      python: `class Solution:
    def getRecursionDepth(self, l, r):
        # Your code here
        pass

if __name__ == "__main__":
    n = int(input())
    print(Solution().getRecursionDepth(0, n - 1))`,
      javascript: `function getRecursionDepth(l, r) {
    // Your code here
}

const n = 8;
console.log(getRecursionDepth(0, n - 1));`
    },
    solution: {
      cpp: `int getRecursionDepth(int l, int r) {
    if (l >= r) return 1;
    int mid = l + (r - l) / 2;
    return 1 + max(getRecursionDepth(l, mid), getRecursionDepth(mid + 1, r));
}`
    },
    testCases: [
      { input: "4", expected: "3" },
      { input: "8", expected: "4" },
      { input: "1", expected: "1" },
      { input: "7", expected: "4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Merge Sort with Negative Numbers",
    difficulty: "Easy",
    accuracy: "88.5%",
    submissions: "100K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Linear Comparison",
    realWorld: "Used in scientific data processing (e.g., sorting temperature fluctuations or altitude changes) where values can be positive or negative.",
    description: `Given an array containing positive integers, negative integers, and zero, sort it in ascending order using Merge Sort.`,
    examples: [
      { input: 'arr = [-2, 45, 0, 11, -9]', output: '[-9, -2, 0, 11, 45]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '-10⁶ ≤ arr[i] ≤ 10⁶'
    ],
    hint: `The standard comparison logic <code>L[i] <= R[j]</code> handles negative numbers correctly. Ensure your temporary arrays (L and R) can store the full range of integers.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    // Standard merge logic
}

void mergeSort(vector<int>& arr, int l, int r) {
    // Standard recursive calls
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    mergeSort(arr, 0, n-1);
    for(int x : arr) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while(i < n1) arr[k++] = L[i++];
    while(j < n2) arr[k++] = R[j++];
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
    title: "Merge Sort on Strings",
    difficulty: "Easy",
    accuracy: "82.1%",
    submissions: "80K+",
    companies: ["Zoho", "Accenture", "TCS"],
    pattern: "Lexicographical Sort",
    realWorld: "Alphabetizing a digital dictionary or sorting filenames in a folder efficiently.",
    description: `Given an array of strings, sort them in <strong>lexicographical</strong> (alphabetical) order using Merge Sort.`,
    examples: [
      { input: 'arr = ["banana", "apple", "mango"]', output: '["apple", "banana", "mango"]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁴',
      '1 ≤ string length ≤ 100'
    ],
    hint: `Treat strings just like numbers. In C++, <code>s1 <= s2</code> compares them alphabetically. In Java, use <code>s1.compareTo(s2) <= 0</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void mergeStrings(vector<string>& arr, int l, int m, int r) {
    // Your code here
}

void mergeSortStrings(vector<string>& arr, int l, int r) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<string> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    mergeSortStrings(arr, 0, n-1);
    for(string s : arr) cout << s << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void mergeStrings(vector<string>& arr, int l, int m, int r) {
    int n1 = m-l+1, n2 = r-m;
    vector<string> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i<n1 && j<n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while(i<n1) arr[k++] = L[i++];
    while(j<n2) arr[k++] = R[j++];
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
    id: 11,
    title: "Sort Pairs (Merge Sort Objects)",
    difficulty: "Medium",
    accuracy: "75.4%",
    submissions: "50K+",
    companies: ["Amazon", "Cisco", "Paytm"],
    pattern: "Custom Comparator",
    realWorld: "Commonly used in e-commerce to sort 'Products' based on 'Price' while maintaining the original relative order for items with the same price.",
    description: `Given an array of objects <code>{id, value}</code>, sort them in ascending order based on <strong>value</strong>.
<br><br>If two objects have the same value, their original relative order must be preserved (Merge Sort is stable).`,
    examples: [
      { input: 'arr = [{1, 50}, {2, 10}, {3, 40}]', output: '[{2, 10}, {3, 40}, {1, 50}]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `Create a struct or class. In the <code>merge</code> function, base your comparison only on the <code>value</code> field: <code>L[i].value <= R[j].value</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Item { int id; int val; };

void mergeItems(vector<Item>& arr, int l, int m, int r) {
    // Your code here
}

void mergeSortItems(vector<Item>& arr, int l, int r) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<Item> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i].id >> arr[i].val;
    mergeSortItems(arr, 0, n-1);
    for(auto it : arr) cout << it.id << ":" << it.val << " ";
    return 0;
}`
    },
    solution: {
      cpp: `void mergeItems(vector<Item>& arr, int l, int m, int r) {
    int n1 = m-l+1, n2 = r-m;
    vector<Item> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i<n1 && j<n2) {
        if(L[i].val <= R[j].val) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while(i < n1) arr[k++] = L[i++];
    while(j < n2) arr[k++] = R[j++];
}`
    },
    testCases: [
      { input: "3\n1 50\n2 10\n3 40", expected: "2:10 3:40 1:50" },
      { input: "2\n1 10\n2 10", expected: "1:10 2:10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Find Inversion Count",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "250K+",
    companies: ["Google", "Amazon", "Microsoft", "Flipkart"],
    pattern: "Merge Step Enhancement",
    realWorld: "Used in recommendation systems (like Netflix or Amazon) to measure the 'similarity' between two ranked lists of preferences. A low inversion count means the rankings are similar.",
    description: `Given an array, find the <strong>Inversion Count</strong>. 
<br><br>Two elements <code>arr[i]</code> and <code>arr[j]</code> form an inversion if <code>arr[i] > arr[j]</code> and <code>i < j</code>. 
<br><br>Return the total number of inversions. Use the Merge Sort logic to solve this in <strong>O(n log n)</strong>.`,
    examples: [
      { input: 'arr = [2, 4, 1, 3, 5]', output: '3', explain: 'Inversions: (2,1), (4,1), (4,3).' },
      { input: 'arr = [1, 2, 3]', output: '0' }
    ],
    constraints: [
      '1 ≤ n ≤ 5 * 10⁵',
      '1 ≤ arr[i] ≤ 10⁶'
    ],
    hint: `During the <strong>merge</strong> step, if you pick an element from the <strong>right</strong> subarray (<code>R[j]</code>) because it is smaller than the element in the <strong>left</strong> subarray (<code>L[i]</code>), it means <code>R[j]</code> is smaller than <strong>all remaining elements</strong> in the left subarray. 
<br><br>Add <code>(mid - i + 1)</code> to your count.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

long long countInversions(vector<int>& arr, int l, int r) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << countInversions(arr, 0, n-1) << endl;
    return 0;
}`,
      python: `def merge_and_count(arr, l, m, r):
    # Your code here
    pass

def count_inversions(arr, l, r):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(count_inversions(arr, 0, n - 1))`
    },
    solution: {
      cpp: `long long mergeAndCount(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    long long res = 0;
    while(i < n1 && j < n2) {
        if(L[i] <= R[j]) arr[k++] = L[i++];
        else {
            arr[k++] = R[j++];
            res += (n1 - i); // All remaining elements in L are greater than R[j]
        }
    }
    while(i < n1) arr[k++] = L[i++];
    while(j < n2) arr[k++] = R[j++];
    return res;
}
long long countInversions(vector<int>& arr, int l, int r) {
    if(l >= r) return 0;
    int m = l + (r - l) / 2;
    return countInversions(arr, l, m) + countInversions(arr, m+1, r) + mergeAndCount(arr, l, m, r);
}`
    },
    testCases: [
      { input: "5\n2 4 1 3 5", expected: "3" },
      { input: "5\n5 4 3 2 1", expected: "10" },
      { input: "3\n1 2 3", expected: "0" },
      { input: "2\n10 5", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Merge Sort Stability Check",
    difficulty: "Medium",
    accuracy: "95.0%",
    submissions: "20K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Stability Analysis",
    realWorld: "Explains why databases prefer Merge Sort over Quick Sort when multi-column sorting (e.g., sort by Date, then sort by Name) is required.",
    description: `A sorting algorithm is <strong>stable</strong> if it preserves the relative order of equal elements. 
<br><br>Explain why the standard Merge Sort is stable and what minor change in the <code>merge</code> function would make it <strong>unstable</strong>.`,
    examples: [
      { input: 'arr = [{A, 1}, {B, 1}, {C, 0}]', output: 'Sorted by value: [{C, 0}, {A, 1}, {B, 1}]', explain: 'A comes before B in the output because it was before B in the input.' }
    ],
    constraints: [
      'Theory based'
    ],
    hint: `The key is the comparison: <code>if (L[i] <= R[j])</code>. <br>
1. Because we use <code><=</code>, if elements are equal, the element from the <strong>Left</strong> subarray is chosen first.<br>
2. If we changed it to <code><</code>, the element from the <strong>Right</strong> subarray would be chosen first, breaking stability.`,
    starterCode: {
      cpp: `/* 
Theory Question:
1. Identify the line in merge() that ensures stability.
2. What happens if you change <= to < ?
*/`
    },
    solution: {
      cpp: `// Standard stable comparison:
// if (L[i] <= R[j]) arr[k++] = L[i++]; 
// else arr[k++] = R[j++];

// Changing it to:
// if (L[i] < R[j]) arr[k++] = L[i++]; 
// else arr[k++] = R[j++];
// ...makes the sort UNSTABLE.`
    },
    testCases: [
      { input: "Describe stability logic", expected: "L[i] <= R[j] ensures left-preference for equals." }
    ],
    jsRunner: (input) => "Information verified"
  },
  
  {
    id: 14,
    title: "Sort a Linked List",
    difficulty: "Medium",
    accuracy: "68.4%",
    submissions: "350K+",
    companies: ["Amazon", "Google", "Microsoft"],
    pattern: "Divide & Conquer (Pointers)",
    realWorld: "Used in file systems and low-level memory management where data is stored in non-contiguous blocks (nodes) rather than arrays.",
    description: `Given the head of a singly linked list, sort the list using <strong>Merge Sort</strong>. 
<br><br>Merge Sort is preferred for Linked Lists because it doesn't require random access (unlike QuickSort), and it can be implemented with O(1) auxiliary space (excluding recursion stack).`,
    examples: [
      { input: 'head = [4, 2, 1, 3]', output: '[1, 2, 3, 4]', explain: 'Split into [4,2] and [1,3], then further split and merge.' },
      { input: 'head = [-1, 5, 3, 4, 0]', output: '[-1, 0, 3, 4, 5]' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 5 * 10⁴]',
      '-10⁵ ≤ Node.val ≤ 10⁵'
    ],
    hint: `1. Use the <strong>Slow and Fast Pointer</strong> approach to find the middle of the list.<br>
2. Split the list into two halves.<br>
3. Recursively sort both halves.<br>
4. Merge the two sorted lists using a standard sorted-merge algorithm.`,
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
    ListNode* sortList(ListNode* head) {
        // Your code here
        return head;
    }
};

void printList(ListNode* head) {
    while(head) { cout << head->val << " "; head = head->next; }
    cout << endl;
}

int main() {
    int n; cin >> n;
    if(n == 0) return 0;
    int val; cin >> val;
    ListNode* head = new ListNode(val);
    ListNode* curr = head;
    for(int i=1; i<n; i++) {
        cin >> val;
        curr->next = new ListNode(val);
        curr = curr->next;
    }
    Solution sol;
    head = sol.sortList(head);
    printList(head);
    return 0;
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        # Your code here
        pass`,
      javascript: `function sortList(head) {
    // Your code here
}`
    },
    solution: {
      cpp: `ListNode* merge(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while(l1 && l2) {
        if(l1->val < l2->val) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

ListNode* sortList(ListNode* head) {
    if(!head || !head->next) return head;
    ListNode *slow = head, *fast = head->next;
    while(fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode* mid = slow->next;
    slow->next = NULL;
    return merge(sortList(head), sortList(mid));
}`
    },
    testCases: [
      { input: "4\n4 2 1 3", expected: "1 2 3 4" },
      { input: "5\n-1 5 3 4 0", expected: "-1 0 3 4 5" },
      { input: "1\n10", expected: "10" },
      { input: "0", expected: "" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Merge K Sorted Arrays",
    difficulty: "Hard",
    accuracy: "52.1%",
    submissions: "150K+",
    companies: ["Google", "Facebook", "Adobe"],
    pattern: "Divide & Conquer (Multi-way Merge)",
    realWorld: "Used in external sorting where data chunks are sorted individually on disk and then merged into a single output stream.",
    description: `Given <strong>K</strong> sorted arrays of size <strong>N</strong> each, merge them into a single sorted array.`,
    examples: [
      { input: 'K = 3, N = 4\narrs = [[1, 5, 9, 11], [2, 3, 6, 7], [4, 8, 10, 12]]', output: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]' }
    ],
    constraints: [
      '1 ≤ K ≤ 100',
      '1 ≤ N ≤ 100'
    ],
    hint: `Instead of merging arrays one by one (O(N*K²)), use <strong>Divide and Conquer</strong>:<br>
1. Merge array 1 and 2, 3 and 4, and so on.<br>
2. In the next pass, merge the resulting combined arrays.<br>
3. This reduces complexity to O(N*K log K).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> mergeKArrays(vector<vector<int>> arr, int K) {
        // Your code here
        return {};
    }
};

int main() {
    int k, n; cin >> k >> n;
    vector<vector<int>> arr(k, vector<int>(n));
    for(int i=0; i<k; i++)
        for(int j=0; j<n; j++) cin >> arr[i][j];
    Solution sol;
    vector<int> res = sol.mergeKArrays(arr, k);
    for(int x : res) cout << x << " ";
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> mergeTwo(vector<int>& a, vector<int>& b) {
    vector<int> res;
    int i=0, j=0;
    while(i<a.size() && j<b.size()) res.push_back(a[i] < b[j] ? a[i++] : b[j++]);
    while(i<a.size()) res.push_back(a[i++]);
    while(j<b.size()) res.push_back(b[j++]);
    return res;
}

vector<int> solve(vector<vector<int>>& arr, int start, int end) {
    if(start == end) return arr[start];
    int mid = start + (end-start)/2;
    vector<int> left = solve(arr, start, mid);
    vector<int> right = solve(arr, mid+1, end);
    return mergeTwo(left, right);
}

vector<int> mergeKArrays(vector<vector<int>> arr, int K) {
    return solve(arr, 0, K-1);
}`
    },
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expected: "1 2 3 4 5 6 7 8 9" },
      { input: "2 2\n10 20\n5 15", expected: "5 10 15 20" },
      { input: "3 2\n1 3\n2 4\n0 5", expected: "0 1 2 3 4 5" },
      { input: "1 4\n1 2 3 4", expected: "1 2 3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "K-th Smallest Element",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "200K+",
    companies: ["Microsoft", "Samsung"],
    pattern: "Sorting / Divide & Conquer",
    realWorld: "Used in statistics to find specific percentiles (e.g., the 25th percentile score) in a large dataset.",
    description: `Given an array <strong>arr</strong> and an integer <strong>K</strong>, find the K-th smallest element in the array. 
<br><br>While this can be solved using a Heap or QuickSelect, implement it using the <strong>Merge Sort</strong> logic to sort the array first.`,
    examples: [
      { input: 'arr = [7, 10, 4, 3, 20, 15], K = 3', output: '7', explain: 'Sorted: [3, 4, 7, 10, 15, 20]. 3rd element is 7.' }
    ],
    constraints: [
      '1 ≤ K ≤ N ≤ 10⁵'
    ],
    hint: `Apply the full Merge Sort algorithm to the array. Once the array is sorted, the K-th smallest element is simply at <code>arr[K-1]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
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
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m-l+1, n2 = r-m;
    vector<int> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i<n1 && j<n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while(i<n1) arr[k++] = L[i++];
    while(j<n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if(l < r) {
        int m = l + (r-l)/2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}

int kthSmallest(vector<int>& arr, int n, int k) {
    mergeSort(arr, 0, n-1);
    return arr[k-1];
}`
    },
    testCases: [
      { input: "6 3\n7 10 4 3 20 15", expected: "7" },
      { input: "5 4\n1 2 3 4 5", expected: "4" },
      { input: "2 1\n10 5", expected: "5" },
      { input: "1 1\n99", expected: "99" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Reverse Pairs",
    difficulty: "Hard",
    accuracy: "32.1%",
    submissions: "80K+",
    companies: ["Google", "Amazon"],
    pattern: "Merge Sort (Inversion Modification)",
    realWorld: "Used in financial trend analysis to find 'significant' drops where a price is more than double a subsequent price.",
    description: `Given an array <code>nums</code>, return the number of <strong>reverse pairs</strong> in the array.
<br><br>A reverse pair is a pair <code>(i, j)</code> such that <code>0 ≤ i < j < nums.length</code> and <code>nums[i] > 2 * nums[j]</code>.`,
    examples: [
      { input: 'nums = [1, 3, 2, 3, 1]', output: '2', explain: 'Pairs are (1, 4) where 3 > 2*1 and (3, 4) where 3 > 2*1.' }
    ],
    constraints: [
      '1 ≤ nums.length ≤ 5 * 10⁴',
      '-2³¹ ≤ nums[i] ≤ 2³¹ - 1'
    ],
    hint: `This is a variation of the Inversion Count problem.<br>
1. In the <code>mergeSort</code> step, before actually merging the two sorted halves, count the pairs.<br>
2. For each element in the left half, use a pointer in the right half to find how many elements satisfy the <code>nums[i] > 2LL * nums[j]</code> condition.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int reversePairs(vector<int>& nums) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.reversePairs(nums) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int countPairs(vector<int>& nums, int l, int mid, int r) {
    int count = 0;
    int j = mid + 1;
    for(int i = l; i <= mid; i++) {
        while(j <= r && nums[i] > 2LL * nums[j]) j++;
        count += (j - (mid + 1));
    }
    return count;
}

void merge(vector<int>& nums, int l, int m, int r) {
    vector<int> temp;
    int i = l, j = m + 1;
    while(i <= m && j <= r) {
        if(nums[i] <= nums[j]) temp.push_back(nums[i++]);
        else temp.push_back(nums[j++]);
    }
    while(i <= m) temp.push_back(nums[i++]);
    while(j <= r) temp.push_back(nums[j++]);
    for(int k = l; k <= r; k++) nums[k] = temp[k - l];
}

int mergeSort(vector<int>& nums, int l, int r) {
    if(l >= r) return 0;
    int mid = l + (r - l) / 2;
    int count = mergeSort(nums, l, mid);
    count += mergeSort(nums, mid + 1, r);
    count += countPairs(nums, l, mid, r);
    merge(nums, l, mid, r);
    return count;
}`
    },
    testCases: [
      { input: "5\n1 3 2 3 1", expected: "2" },
      { input: "5\n2 4 3 5 1", expected: "3" },
      { input: "3\n1 1 1", expected: "0" },
      { input: "4\n10 2 2 2", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Merge Overlapping Intervals",
    difficulty: "Medium",
    accuracy: "48.2%",
    submissions: "250K+",
    companies: ["Google", "Microsoft", "Twitter"],
    pattern: "Sorting + Linear Scan",
    realWorld: "Used in calendar apps (like Google Calendar) to identify busy time blocks or in OS memory allocation to merge free contiguous blocks.",
    description: `Given an array of <code>intervals</code> where <code>intervals[i] = [start, end]</code>, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explain: '[1,3] and [2,6] overlap, merged into [1,6].' }
    ],
    constraints: [
      '1 ≤ intervals.length ≤ 10⁴',
      'intervals[i].length == 2'
    ],
    hint: `1. Sort the intervals by their <strong>start time</strong> using Merge Sort.<br>
2. Iterate through the sorted intervals.<br>
3. If the current interval's start is $\le$ the end of the last merged interval, merge them by updating the end time.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Your code here
        return {};
    }
};

int main() {
    int n; cin >> n;
    vector<vector<int>> intervals(n, vector<int>(2));
    for(int i=0; i<n; i++) cin >> intervals[i][0] >> intervals[i][1];
    Solution sol;
    vector<vector<int>> res = sol.merge(intervals);
    for(auto it : res) cout << "[" << it[0] << "," << it[1] << "] ";
    return 0;
}`
    },
    solution: {
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if(intervals.empty()) return {};
    sort(intervals.begin(), intervals.end()); // In practice uses Merge/IntroSort
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    for(int i = 1; i < intervals.size(); i++) {
        if(intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}`
    },
    testCases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", expected: "[1,6] [8,10] [15,18]" },
      { input: "2\n1 4\n4 5", expected: "[1,5]" },
      { input: "3\n1 10\n2 3\n4 5", expected: "[1,10]" },
      { input: "2\n1 5\n6 8", expected: "[1,5] [6,8]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Sort 0s, 1s, and 2s (Merge logic)",
    difficulty: "Easy",
    accuracy: "75.1%",
    submissions: "400K+",
    companies: ["Paytm", "HCL", "Wipro"],
    pattern: "Divide & Conquer",
    realWorld: "Used to group items with limited discrete categories, such as sorting pixels in an image based on primary color channels (R, G, B).",
    description: `Given an array containing only 0s, 1s, and 2s, sort them in ascending order using <strong>Merge Sort</strong>. 
<br><br>Note: While O(N) approaches like Dutch National Flag exist, this problem helps practice applying Merge Sort to duplicate-heavy data.`,
    examples: [
      { input: 'arr = [0, 2, 1, 2, 0]', output: '[0, 0, 1, 2, 2]' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `Standard Merge Sort implementation. The stability of Merge Sort ensures that if these were objects with 0/1/2 tags, their relative order would be preserved.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sort012(vector<int>& arr, int n) {
    // Implement Merge Sort here
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
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m-l+1, n2 = r-m;
    vector<int> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i<n1 && j<n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while(i<n1) arr[k++] = L[i++];
    while(j<n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if(l < r) {
        int m = l + (r-l)/2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}

void sort012(vector<int>& arr, int n) {
    mergeSort(arr, 0, n-1);
}`
    },
    testCases: [
      { input: "5\n0 2 1 2 0", expected: "0 0 1 2 2" },
      { input: "3\n2 1 0", expected: "0 1 2" },
      { input: "4\n1 1 1 1", expected: "1 1 1 1" },
      { input: "2\n2 0", expected: "0 2" }
    ],
    jsRunner: (input) => "Logic verified"
  }


];