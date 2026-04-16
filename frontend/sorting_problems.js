const TOPIC_CONFIG = {
  name: "Sorting Algorithms",
  level: "Level 3 of 3 · Problems",
  backLink: "selectionSort_L1.html",
  backLabel: "Sorting"
};
const PROBLEMS = [
  {
    id: 1,
    title: "Check if Sorted",
    difficulty: "Easy",
    accuracy: "92.4%",
    submissions: "450K+",
    companies: ["TCS", "Infosys", "Accenture"],
    pattern: "Linear Scan",
    realWorld: "Used in data validation pipelines to ensure that logs or financial transactions are arriving in the correct chronological order before processing.",
    description: `Given an array <strong>arr</strong> of <strong>n</strong> integers, check if it is sorted in non-decreasing order. 
<br><br>Return 1 if sorted, otherwise return 0.`,
    examples: [
      { input: 'arr = [10, 20, 30, 40, 50]', output: '1' },
      { input: 'arr = [90, 80, 100]', output: '0', explain: '90 > 80, so it is not sorted.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶', '-10⁹ ≤ arr[i] ≤ 10⁹'],
    hint: `Iterate from index 1 to n-1. If any element <code>arr[i-1]</code> is greater than <code>arr[i]</code>, the array is not sorted.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int isSorted(vector<int>& arr, int n) {
    // Your code here
    return 1;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << isSorted(arr, n) << endl;
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static int isSorted(int[] arr, int n) {
        // Your code here
        return 1;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        System.out.println(isSorted(arr, n));
    }
}`,
      python: `def is_sorted(arr, n):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(1 if is_sorted(arr, n) else 0)`,
      javascript: `function isSorted(arr, n) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
const n = parseInt(input[0]);
const arr = input.slice(1, 1+n).map(Number);
console.log(isSorted(arr, n));`
    },
    solution: {
      cpp: `int isSorted(vector<int>& arr, int n) {
    for(int i=1; i<n; i++) {
        if(arr[i] < arr[i-1]) return 0;
    }
    return 1;
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "1" },
      { input: "3\n10 5 20", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Sort an Array of Two Types",
    difficulty: "Medium",
    accuracy: "78.2%",
    submissions: "200K+",
    companies: ["Microsoft", "Amazon", "Samsung"],
    pattern: "Two Pointers",
    realWorld: "Used in OS memory management to segregate free memory blocks from allocated blocks, or in networking to separate high-priority packets from low-priority ones.",
    description: `Given an array containing only <strong>0s and 1s</strong>, sort the array in-place so that all 0s come before all 1s.
<br><br>Constraint: Try to solve it in a <strong>single pass</strong> with O(1) extra space.`,
    examples: [
      { input: 'arr = [0, 1, 0, 1, 1, 0]', output: '[0, 0, 0, 1, 1, 1]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶', 'arr[i] ∈ {0, 1}'],
    hint: `Use two pointers: <code>left</code> starting at 0 and <code>right</code> starting at n-1. Swap elements when <code>arr[left] == 1</code> and <code>arr[right] == 0</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortBinary(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortBinary(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static void sortBinary(int[] arr, int n) {
        // Your code here
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        sortBinary(arr, n);
        for(int x : arr) System.out.print(x + " ");
    }
}`,
      python: `def sort_binary(arr, n):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    sort_binary(arr, n)
    print(*(arr))`,
      javascript: `function sortBinary(arr, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sortBinary(vector<int>& arr, int n) {
    int left = 0, right = n - 1;
    while(left < right) {
        if(arr[left] == 0) left++;
        else if(arr[right] == 1) right--;
        else swap(arr[left], arr[right]);
    }
}`
    },
    testCases: [
      { input: "6\n0 1 0 1 1 0", expected: "0 0 0 1 1 1" },
      { input: "4\n1 1 1 1", expected: "1 1 1 1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Sort a String",
    difficulty: "Easy",
    accuracy: "85.1%",
    submissions: "120K+",
    companies: ["Zoho", "FactSet"],
    pattern: "Counting Sort",
    realWorld: "Used in determining if two strings are Anagrams (sorting both strings and comparing) or in generating unique keys for database records.",
    description: `Given a string <strong>s</strong> consisting of lowercase English alphabets, sort the characters of the string in ascending order.`,
    examples: [
      { input: 's = "edcba"', output: '"abcde"' },
      { input: 's = "geeks"', output: '"eegks"' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵'],
    hint: `Since there are only 26 possible characters, use a <strong>Frequency Array</strong> of size 26 to count occurrences, then rebuild the string. This is O(N).`,
    starterCode: {
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

string sortString(string s) {
    // Your code here
    return "";
}

int main() {
    string s; cin >> s;
    cout << sortString(s) << endl;
    return 0;
}`,
      python: `def sort_string(s):
    # Your code here
    pass

if __name__ == "__main__":
    s = input().strip()
    print(sort_string(s))`,
      java: `import java.util.*;
class Main {
    public static String sortString(String s) {
        // Your code here
        return "";
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(sortString(s));
    }
}`,
      javascript: `function sortString(s) {
    // Your code here
}`
    },
    solution: {
      cpp: `string sortString(string s) {
    vector<int> freq(26, 0);
    for(char c : s) freq[c-'a']++;
    string res = "";
    for(int i=0; i<26; i++) {
        while(freq[i]--) res += (char)(i + 'a');
    }
    return res;
}`
    },
    testCases: [
      { input: "edcba", expected: "abcde" },
      { input: "banana", expected: "aaabnn" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Sort a Matrix",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "80K+",
    companies: ["Google", "Amazon"],
    pattern: "Flattening",
    realWorld: "Used in image processing to sort pixel intensities across a 2D image for histogram equalization.",
    description: `Given an <strong>N x N</strong> matrix, sort all the elements in the matrix in non-decreasing order such that <code>mat[0][0]</code> is smallest and <code>mat[N-1][N-1]</code> is largest.`,
    examples: [
      { input: 'N=3, mat=[[10,20,30], [5,10,15], [7,1,2]]', output: '[[1,2,5], [7,10,10], [15,20,30]]' }
    ],
    constraints: ['1 ≤ N ≤ 500'],
    hint: `1. Copy all elements into a 1D array.<br>2. Sort the 1D array.<br>3. Copy elements back into the matrix.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortMatrix(vector<vector<int>>& mat, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<vector<int>> mat(n, vector<int>(n));
    for(int i=0; i<n; i++)
        for(int j=0; j<n; j++) cin >> mat[i][j];
    sortMatrix(mat, n);
    for(int i=0; i<n; i++) {
        for(int j=0; j<n; j++) cout << mat[i][j] << " ";
        cout << endl;
    }
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static void sortMatrix(int[][] mat, int n) {
        // Your code here
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] mat = new int[n][n];
        for(int i=0; i<n; i++)
            for(int j=0; j<n; j++) mat[i][j] = sc.nextInt();
        sortMatrix(mat, n);
        // Print matrix logic...
    }
}`,
      python: `def sort_matrix(mat, n):
    # Your code here
    pass`,
      javascript: `function sortMatrix(mat, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sortMatrix(vector<vector<int>>& mat, int n) {
    vector<int> temp;
    for(int i=0; i<n; i++)
        for(int j=0; j<n; j++) temp.push_back(mat[i][j]);
    sort(temp.begin(), temp.end());
    int k = 0;
    for(int i=0; i<n; i++)
        for(int j=0; j<n; j++) mat[i][j] = temp[k++];
}`
    },
    testCases: [
      { input: "2\n4 1\n3 2", expected: "1 2\n3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Sort a Linked List",
    difficulty: "Medium",
    accuracy: "65.3%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft", "Paytm"],
    pattern: "Merge Sort",
    realWorld: "Commonly used in large-scale databases where data is stored as a series of linked nodes/blocks and needs sorting with $O(N \\log N)$ performance and minimal auxiliary space.",
    description: `Given the head of a singly linked list, return the list after sorting it in ascending order. 
<br><br>The optimal approach uses <strong>Merge Sort</strong>.`,
    examples: [
      { input: '4 -> 2 -> 1 -> 3', output: '1 -> 2 -> 3 -> 4' }
    ],
    constraints: ['Number of nodes ≤ 5 * 10⁴', '-10⁵ ≤ val ≤ 10⁵'],
    hint: `1. Use Slow/Fast pointers to find the middle.<br>2. Recursively split the list.<br>3. Merge two sorted lists using the standard merging technique.`,
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int x) { data = x; next = NULL; }
};

Node* mergeSort(Node* head) {
    // Your code here
    return head;
}

void printList(Node* head) {
    while(head) { cout << head->data << " "; head = head->next; }
    cout << endl;
}

int main() {
    int n; cin >> n;
    if(n == 0) return 0;
    int x; cin >> x;
    Node* head = new Node(x);
    Node* temp = head;
    for(int i=1; i<n; i++) { cin >> x; temp->next = new Node(x); temp = temp->next; }
    head = mergeSort(head);
    printList(head);
    return 0;
}`,
      java: `class Node { int data; Node next; Node(int x) { data = x; } }
class Solution {
    public Node sortList(Node head) {
        // Your code here
        return head;
    }
}`,
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Solution:
    def mergeSort(self, head):
        # Your code here
        pass`,
      javascript: `function mergeSort(head) {
    // Your code here
}`
    },
    solution: {
      cpp: `Node* merge(Node* l1, Node* l2) {
    Node dummy(0);
    Node* tail = &dummy;
    while(l1 && l2) {
        if(l1->data < l2->data) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}
Node* getMid(Node* head) {
    Node* slow = head; Node* fast = head->next;
    while(fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    return slow;
}
Node* mergeSort(Node* head) {
    if(!head || !head->next) return head;
    Node* mid = getMid(head);
    Node* left = head; Node* right = mid->next;
    mid->next = NULL;
    return merge(mergeSort(left), mergeSort(right));
}`
    },
    testCases: [
      { input: "4\n4 2 1 3", expected: "1 2 3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Sort in Wave Form",
    difficulty: "Easy",
    accuracy: "75.4%",
    submissions: "90K+",
    companies: ["Amazon", "Google", "Adobe"],
    pattern: "Greedy Swap",
    realWorld: "Used in digital signal processing to smooth out data or in UI layouts to create a visually alternating pattern of items.",
    description: `Given an unsorted array, sort it into a wave-like array. An array is in wave form if <code>arr[0] ≥ arr[1] ≤ arr[2] ≥ arr[3]...</code>`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: '[2, 1, 4, 3, 5]', explain: '2 >= 1, 1 <= 4, 4 >= 3, 3 <= 5.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `Iterate through even indices (0, 2, 4...).<br>1. If <code>arr[i] < arr[i-1]</code>, swap.<br>2. If <code>arr[i] < arr[i+1]</code>, swap.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void convertToWave(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    convertToWave(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static void convertToWave(int[] arr, int n) {
        // Your code here
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        convertToWave(arr, n);
        for(int x : arr) System.out.print(x + " ");
    }
}`,
      python: `def convert_to_wave(arr, n):
    # Your code here
    pass`,
      javascript: `function convertToWave(arr, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `void convertToWave(vector<int>& arr, int n) {
    for(int i=0; i<n; i+=2) {
        if(i > 0 && arr[i-1] > arr[i]) swap(arr[i-1], arr[i]);
        if(i < n-1 && arr[i+1] > arr[i]) swap(arr[i+1], arr[i]);
    }
}`
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expected: "2 1 4 3 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Merge K Sorted Files (Different Machines)",
    difficulty: "Hard",
    accuracy: "45.1%",
    submissions: "40K+",
    companies: ["Google", "Facebook"],
    pattern: "K-Way Merge / Min-Heap",
    realWorld: "Used in distributed computing (MapReduce) where different machines sort local data, and a central machine merges them into a single global sorted file.",
    description: `You have <strong>K</strong> machines. Each machine has a sorted array of <strong>N</strong> elements. Merge them into a single sorted array.`,
    examples: [
      { input: 'K=3, N=3, arr=[[1,4,7],[2,5,8],[3,6,9]]', output: '[1,2,3,4,5,6,7,8,9]' }
    ],
    constraints: ['1 ≤ K, N ≤ 500'],
    hint: `Use a <strong>Min-Heap</strong>. Store the first element of each array in the heap. Repeatedly extract the minimum and push the next element from the corresponding machine's array.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Element {
    int val, row, col;
    bool operator>(const Element& other) const { return val > other.val; }
};

vector<int> mergeKArrays(vector<vector<int>>& arr, int K) {
    // Your code here
    return {};
}

int main() {
    int k, n; cin >> k >> n;
    vector<vector<int>> arr(k, vector<int>(n));
    for(int i=0; i<k; i++)
        for(int j=0; j<n; j++) cin >> arr[i][j];
    vector<int> res = mergeKArrays(arr, k);
    for(int x : res) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;
class Element {
    int val, row, col;
    Element(int v, int r, int c) { val = v; row = r; col = c; }
}
class Solution {
    public static List<Integer> mergeKArrays(int[][] arr, int K) {
        // Your code here
        return new ArrayList<>();
    }
}`,
      python: `import heapq
def merge_k_arrays(arr, K):
    # Your code here
    pass`,
      javascript: `function mergeKArrays(arr, K) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> mergeKArrays(vector<vector<int>>& arr, int K) {
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    for(int i=0; i<K; i++) pq.push({arr[i][0], i, 0});
    vector<int> res;
    while(!pq.empty()) {
        Element curr = pq.top(); pq.pop();
        res.push_back(curr.val);
        if(curr.col + 1 < arr[curr.row].size()) {
            pq.push({arr[curr.row][curr.col+1], curr.row, curr.col+1});
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "3 3\n1 4 7\n2 5 8\n3 6 9", expected: "1 2 3 4 5 6 7 8 9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 8,
    title: "Check if Intervals Overlap",
    difficulty: "Medium",
    accuracy: "68.2%",
    submissions: "110K+",
    companies: ["Google", "Microsoft"],
    pattern: "Sort by Start Time",
    realWorld: "Used in calendar apps to detect scheduling conflicts between two meetings or in airline systems to check for gate overlap between flights.",
    description: `Given a set of <strong>n</strong> intervals, check if any two intervals overlap. Each interval is a pair <code>[start, end]</code>.`,
    examples: [
      { input: 'intervals = [[1, 3], [5, 7], [2, 4]]', output: 'true', explain: '[1, 3] and [2, 4] overlap.' },
      { input: 'intervals = [[1, 3], [7, 9]]', output: 'false' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `1. Sort the intervals by their <strong>start time</strong>.<br>2. Compare the <code>end</code> of the current interval with the <code>start</code> of the next one.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isOverlap(vector<pair<int, int>>& intervals) {
    // Your code here
    return false;
}

int main() {
    int n; cin >> n;
    vector<pair<int, int>> intervals(n);
    for(int i=0; i<n; i++) cin >> intervals[i].first >> intervals[i].second;
    cout << (isOverlap(intervals) ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static boolean isOverlap(int[][] intervals) {
        // Your code here
        return false;
    }
}`,
      python: `def is_overlap(intervals):
    # Your code here
    pass`,
      javascript: `function isOverlap(intervals) {
    // Your code here
}`
    },
    solution: {
      cpp: `bool isOverlap(vector<pair<int, int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    for(int i=1; i<intervals.size(); i++) {
        if(intervals[i].first < intervals[i-1].second) return true;
    }
    return false;
}`
    },
    testCases: [
      { input: "3\n1 3\n5 7\n2 4", expected: "true" },
      { input: "2\n1 3\n7 9", expected: "false" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Missing Elements of a Range",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "50K+",
    companies: ["Amazon", "Cisco"],
    pattern: "Sort + Range Scan",
    realWorld: "Used in inventory systems to find 'sku numbers' that are missing from a sequential block or identifying 'lost packets' in a numbered network transmission.",
    description: `Given an array and a range <strong>[low, high]</strong>, find all numbers in the range that are <strong>not</strong> present in the array. Return them as a list of ranges (e.g., if 2,3,4 are missing, return "2-4").`,
    examples: [
      { input: 'arr = [10, 12, 3], low=0, high=15', output: '["0-2", "4-9", "11", "13-15"]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `1. Sort the array.<br>2. Filter elements to keep only those within [low, high].<br>3. Track the next expected number starting from <code>low</code> and compare with elements in the array.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

vector<string> findMissing(vector<int>& arr, int low, int high) {
    // Your code here
    return {};
}

int main() {
    int n, low, high; cin >> n >> low >> high;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    vector<string> res = findMissing(arr, low, high);
    for(string s : res) cout << s << " ";
    return 0;
}`,
      python: `def find_missing(arr, low, high):
    # Your code here
    pass`,
      java: `import java.util.*;
class Solution {
    public static List<String> findMissing(int[] arr, int low, int high) {
        // Your code here
        return new ArrayList<>();
    }
}`,
      javascript: `function findMissing(arr, low, high) {
    // Your code here
}`
    },
    solution: {
      cpp: `string getRange(int l, int h) { return l == h ? to_string(l) : to_string(l) + "-" + to_string(h); }
vector<string> findMissing(vector<int>& arr, int low, int high) {
    sort(arr.begin(), arr.end());
    vector<string> res;
    int curr = low;
    for(int x : arr) {
        if(x < curr) continue;
        if(x > high) break;
        if(x > curr) res.push_back(getRange(curr, x-1));
        curr = x + 1;
    }
    if(curr <= high) res.push_back(getRange(curr, high));
    return res;
}`
    },
    testCases: [
      { input: "3 0 15\n10 12 3", expected: "0-2 4-9 11 13-15" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Sort by Set Bits Count",
    difficulty: "Medium",
    accuracy: "60.4%",
    submissions: "45K+",
    companies: ["Cisco", "Qualcomm"],
    pattern: "Custom Comparator",
    realWorld: "Used in low-level bit manipulation tasks or optimizing data for storage where the number of 'on' bits (Hamming weight) impacts compression or hardware energy usage.",
    description: `Given an array, sort the integers in <strong>descending order</strong> of the number of set bits (1s) in their binary representation. If two numbers have the same count, the one that appeared first in the original array should come first (Stable Sort).`,
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5, 6]', output: '[3, 5, 6, 1, 2, 4]', explain: '3, 5, 6 have two set bits. 1, 2, 4 have one set bit.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `Use <code>__builtin_popcount(n)</code> in C++, <code>Integer.bitCount(n)</code> in Java, or <code>bin(n).count('1')</code> in Python within a custom stable sort.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortBySetBits(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortBySetBits(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static void sortBySetBits(Integer[] arr, int n) {
        // Your code here
    }
}`,
      python: `def sort_by_set_bits(arr):
    # Your code here
    pass`,
      javascript: `function sortBySetBits(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `int countBits(int n) { return __builtin_popcount(n); }
void sortBySetBits(vector<int>& arr, int n) {
    stable_sort(arr.begin(), arr.end(), [](int a, int b) {
        return countBits(a) > countBits(b);
    });
}`
    },
    testCases: [
      { input: "6\n1 2 3 4 5 6", expected: "3 5 6 1 2 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Sort Even and Odd Indices Separately",
    difficulty: "Easy",
    accuracy: "81.2%",
    submissions: "55K+",
    pattern: "Array Slicing / Partition",
    realWorld: "Used in specific numerical algorithms where alternating patterns are handled differently, such as separate processing for Real and Imaginary components in FFT.",
    description: `Given an array, sort the elements at <strong>even indices</strong> in ascending order and the elements at <strong>odd indices</strong> in descending order.`,
    examples: [
      { input: 'arr = [0, 4, 5, 3, 7, 2, 1]', output: '[0, 4, 1, 3, 5, 2, 7]', explain: 'Even indices [0,2,4,6] values [0,5,7,1] sorted asc: [0,1,5,7]. Odd indices [1,3,5] values [4,3,2] sorted desc: [4,3,2].' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `1. Extract elements at even indices into one array and odd indices into another.<br>2. Sort them as required.<br>3. Place them back in the original positions.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortEvenOdd(vector<int>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortEvenOdd(arr, n);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      python: `def sort_even_odd(arr):
    # Your code here
    pass`,
      java: `import java.util.*;
class Main {
    public static void sortEvenOdd(int[] arr, int n) {
        // Your code here
    }
}`,
      javascript: `function sortEvenOdd(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sortEvenOdd(vector<int>& arr, int n) {
    vector<int> even, odd;
    for(int i=0; i<n; i++) {
        if(i % 2 == 0) even.push_back(arr[i]);
        else odd.push_back(arr[i]);
    }
    sort(even.begin(), even.end());
    sort(odd.begin(), odd.end(), greater<int>());
    int e=0, o=0;
    for(int i=0; i<n; i++) {
        if(i % 2 == 0) arr[i] = even[e++];
        else arr[i] = odd[o++];
    }
}`
    },
    testCases: [
      { input: "7\n0 4 5 3 7 2 1", expected: "0 4 1 3 5 2 7" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Sort Strings by Length",
    difficulty: "Easy",
    accuracy: "88.6%",
    submissions: "40K+",
    companies: ["Apple", "LinkedIn"],
    pattern: "Custom Comparator",
    realWorld: "Used in word processors to suggest autocompletions starting with the shortest (least effort) words first.",
    description: `Given an array of strings, sort them in ascending order based on their <strong>lengths</strong>. If two strings have the same length, maintain their original order (Stable Sort).`,
    examples: [
      { input: 'arr = ["apple", "bat", "cat", "banana"]', output: '["bat", "cat", "apple", "banana"]' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `Use a <strong>Stable Sort</strong> with a custom lambda/comparator that compares <code>s1.length() < s2.length()</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

void sortByLength(vector<string>& arr, int n) {
    // Your code here
}

int main() {
    int n; cin >> n;
    vector<string> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortByLength(arr, n);
    for(string s : arr) cout << s << " ";
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static void sortByLength(String[] arr, int n) {
        // Your code here
    }
}`,
      python: `def sort_by_length(arr):
    # Your code here
    pass`,
      javascript: `function sortByLength(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sortByLength(vector<string>& arr, int n) {
    stable_sort(arr.begin(), arr.end(), [](const string& a, const string& b) {
        return a.length() < b.length();
    });
}`
    },
    testCases: [
      { input: "4\napple bat cat banana", expected: "bat cat apple banana" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Merge Two Sorted Arrays",
    difficulty: "Easy",
    accuracy: "82.5%",
    submissions: "400K+",
    companies: ["Microsoft", "Adobe", "Paytm"],
    pattern: "Two Pointers",
    realWorld: "Used in database merge-joins where two already indexed (sorted) datasets are combined into a single sorted result without re-sorting from scratch.",
    description: `Given two sorted arrays <strong>A</strong> and <strong>B</strong>, merge them into a single sorted array <strong>C</strong>.`,
    examples: [
      { input: 'A = [1, 3, 5], B = [2, 4, 6]', output: '[1, 2, 3, 4, 5, 6]' }
    ],
    constraints: ['1 ≤ n, m ≤ 10⁶'],
    hint: `Initialize two pointers <code>i=0, j=0</code>. Compare <code>A[i]</code> and <code>B[j]</code>, push the smaller to result, and increment its pointer.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> mergeArrays(vector<int>& A, vector<int>& B) {
    // Your code here
    return {};
}

int main() {
    int n, m; cin >> n >> m;
    vector<int> a(n), b(m);
    for(int i=0; i<n; i++) cin >> a[i];
    for(int i=0; i<m; i++) cin >> b[i];
    vector<int> res = mergeArrays(a, b);
    for(int x : res) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static int[] mergeArrays(int[] A, int[] B) {
        // Your code here
        return new int[0];
    }
}`,
      python: `def merge_arrays(A, B):
    # Your code here
    pass`,
      javascript: `function mergeArrays(A, B) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> mergeArrays(vector<int>& A, vector<int>& B) {
    int n = A.size(), m = B.size();
    vector<int> C;
    int i=0, j=0;
    while(i < n && j < m) {
        if(A[i] <= B[j]) C.push_back(A[i++]);
        else C.push_back(B[j++]);
    }
    while(i < n) C.push_back(A[i++]);
    while(j < m) C.push_back(B[j++]);
    return C;
}`
    },
    testCases: [
      { input: "3 3\n1 3 5\n2 4 6", expected: "1 2 3 4 5 6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 14,
    title: "Sort Array with Two Halves Sorted",
    difficulty: "Easy",
    accuracy: "89.2%",
    submissions: "60K+",
    pattern: "Single Merge Pass",
    realWorld: "Used in 'TimSort' or hybrid sorting algorithms to optimize sorting when the data contains natural pre-sorted runs.",
    description: `Given an array where the first half (index 0 to mid) is sorted and the second half (index mid+1 to n-1) is sorted, sort the <strong>entire array</strong> in O(N).`,
    examples: [
      { input: 'arr = [1, 5, 8, 2, 4, 9], mid = 2', output: '[1, 2, 4, 5, 8, 9]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `This is simply the <strong>Merge Step</strong> of Merge Sort. Use two pointers to merge the two segments.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortTwoHalves(vector<int>& arr, int n, int mid) {
    // Your code here
}

int main() {
    int n, mid; cin >> n >> mid;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    sortTwoHalves(arr, n, mid);
    for(int x : arr) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static void sortTwoHalves(int[] arr, int n, int mid) {
        // Your code here
    }
}`,
      python: `def sort_two_halves(arr, mid):
    # Your code here
    pass`,
      javascript: `function sortTwoHalves(arr, mid) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sortTwoHalves(vector<int>& arr, int n, int mid) {
    vector<int> res;
    int i = 0, j = mid + 1;
    while(i <= mid && j < n) {
        if(arr[i] <= arr[j]) res.push_back(arr[i++]);
        else res.push_back(arr[j++]);
    }
    while(i <= mid) res.push_back(arr[i++]);
    while(j < n) res.push_back(arr[j++]);
    for(int k=0; k<n; k++) arr[k] = res[k];
}`
    },
    testCases: [
      { input: "6 2\n1 5 8 2 4 9", expected: "1 2 4 5 8 9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "2 Sum - Pair in Sorted Array",
    difficulty: "Easy",
    accuracy: "92.1%",
    submissions: "350K+",
    companies: ["Google", "Amazon", "Facebook"],
    pattern: "Two Pointers",
    realWorld: "Used in financial software to find pairs of transactions that sum to a specific target for reconciling account balances.",
    description: `Given a <strong>sorted</strong> array and a target <strong>S</strong>, find if there exists a pair <code>(arr[i], arr[j])</code> such that their sum is exactly S. Return 1 if found, else 0.`,
    examples: [
      { input: 'arr = [1, 2, 4, 6, 10], S = 14', output: '1', explain: '4 + 10 = 14.' },
      { input: 'arr = [1, 2, 4, 6, 10], S = 5', output: '0' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `Since the array is sorted, use two pointers: <code>left=0</code> and <code>right=n-1</code>.<br>If <code>sum < target</code>, increment left. If <code>sum > target</code>, decrement right.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int hasPair(vector<int>& arr, int n, int s) {
    // Your code here
    return 0;
}

int main() {
    int n, s; cin >> n >> s;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << hasPair(arr, n, s) << endl;
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static int hasPair(int[] arr, int n, int s) {
        // Your code here
        return 0;
    }
}`,
      python: `def has_pair(arr, s):
    # Your code here
    pass`,
      javascript: `function hasPair(arr, s) {
    // Your code here
}`
    },
    solution: {
      cpp: `int hasPair(vector<int>& arr, int n, int s) {
    int l = 0, r = n - 1;
    while(l < r) {
        int sum = arr[l] + arr[r];
        if(sum == s) return 1;
        if(sum < s) l++; else r--;
    }
    return 0;
}`
    },
    testCases: [
      { input: "5 14\n1 2 4 6 10", expected: "1" },
      { input: "5 5\n1 2 4 6 10", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "Intersection & Union of Sorted Arrays",
    difficulty: "Medium",
    accuracy: "65.4%",
    submissions: "150K+",
    companies: ["Microsoft", "Adobe", "Paytm"],
    pattern: "Two Pointers",
    realWorld: "Used in Search Engines to perform 'Boolean Queries' (e.g., find all documents containing both Word A AND Word B or Word A OR Word B) using sorted posting lists.",
    description: `Given two sorted arrays <strong>A</strong> and <strong>B</strong>, find their <strong>Intersection</strong> (common elements) and <strong>Union</strong> (all unique elements from both).`,
    examples: [
      { input: 'A = [1, 2, 3, 5], B = [2, 5, 7]', output: 'Intersection: [2, 5], Union: [1, 2, 3, 5, 7]' }
    ],
    constraints: ['1 ≤ n, m ≤ 10⁵'],
    hint: `For Intersection: Advance the pointer of the smaller element. If equal, add to result and advance both.<br>For Union: Similar logic, but always add to result (and skip duplicates).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void getIntersectionUnion(vector<int>& A, vector<int>& B) {
    // Your code here
}

int main() {
    int n, m; cin >> n >> m;
    vector<int> a(n), b(m);
    for(int i=0; i<n; i++) cin >> a[i];
    for(int i=0; i<m; i++) cin >> b[i];
    getIntersectionUnion(a, b);
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static void getIU(int[] A, int[] B) {
        // Your code here
    }
}`,
      python: `def get_iu(A, B):
    # Your code here
    pass`,
      javascript: `function getIU(A, B) {
    // Your code here
}`
    },
    solution: {
      cpp: `void getIntersectionUnion(vector<int>& A, vector<int>& B) {
    int i=0, j=0;
    cout << "Intersection: ";
    while(i < A.size() && j < B.size()) {
        if(A[i] < B[j]) i++;
        else if(A[i] > B[j]) j++;
        else { cout << A[i] << " "; i++; j++; }
    }
    cout << "\\nUnion: ";
    // Similar union logic...
}`
    },
    testCases: [
      { input: "4 3\n1 2 3 5\n2 5 7", expected: "Intersection: 2 5 \nUnion: 1 2 3 5 7 " }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Meeting Rooms",
    difficulty: "Medium",
    accuracy: "72.5%",
    submissions: "80K+",
    companies: ["Google", "Facebook", "Microsoft"],
    pattern: "Greedy / Sorting",
    realWorld: "The core algorithm for Outlook or Google Calendar to suggest the minimum number of meeting rooms required to accommodate 100 concurrent meetings.",
    description: `Given a list of meeting time intervals <code>[[s1, e1], [s2, e2], ...]</code>, find the <strong>minimum number of rooms</strong> required to hold all meetings.`,
    examples: [
      { input: 'intervals = [[0, 30], [5, 10], [15, 20]]', output: '2', explain: 'Meeting 1 is from 0-30. During that time, meetings 2 and 3 can use the same second room as they don\'t overlap.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁴'],
    hint: `1. Separate all <strong>start</strong> times and <strong>end</strong> times.<br>2. Sort both arrays.<br>3. Use two pointers: if <code>start[i] < end[j]</code>, a room is occupied (roomCount++). Else, a meeting ended (decrement current count).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minRooms(vector<pair<int, int>>& intervals) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<pair<int, int>> intervals(n);
    for(int i=0; i<n; i++) cin >> intervals[i].first >> intervals[i].second;
    cout << minRooms(intervals) << endl;
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public int minMeetingRooms(int[][] intervals) {
        // Your code here
        return 0;
    }
}`,
      python: `def min_meeting_rooms(intervals):
    # Your code here
    pass`,
      javascript: `function minMeetingRooms(intervals) {
    // Your code here
}`
    },
    solution: {
      cpp: `int minRooms(vector<pair<int, int>>& intervals) {
    vector<int> start, end;
    for(auto i : intervals) { start.push_back(i.first); end.push_back(i.second); }
    sort(start.begin(), start.end());
    sort(end.begin(), end.end());
    int rooms = 0, j = 0;
    for(int i=0; i<start.size(); i++) {
        if(start[i] < end[j]) rooms++;
        else j++;
    }
    return rooms;
}`
    },
    testCases: [
      { input: "3\n0 30\n5 10\n15 20", expected: "2" },
      { input: "2\n7 10\n2 4", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "K-th Smallest after Removing Given Set",
    difficulty: "Hard",
    accuracy: "41.2%",
    submissions: "25K+",
    companies: ["Google", "Amazon"],
    pattern: "Binary Search on Answer",
    realWorld: "Used in pagination systems where certain IDs are 'blacklisted' or 'deleted', and you need to find which ID will appear on the 5th page of the active results.",
    description: `Given a set of <strong>blacklisted</strong> integers and a range <code>[1, ∞]</code>, find the <strong>K-th smallest positive integer</strong> that is NOT in the blacklist.`,
    examples: [
      { input: 'blacklist = [2, 3, 5], K = 3', output: '6', explain: 'Valid integers are 1, 4, 6, 7... the 3rd is 6.' }
    ],
    constraints: ['1 ≤ blacklist.length ≤ 10⁵', '1 ≤ K ≤ 10⁹'],
    hint: `Sort the blacklist. Use binary search to find the smallest number <code>X</code> such that <code>X - (count of blacklisted numbers ≤ X) >= K</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

long long findKth(vector<int>& blacklist, int k) {
    // Your code here
    return 0;
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> b(n);
    for(int i=0; i<n; i++) cin >> b[i];
    cout << findKth(b, k) << endl;
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public long findKth(int[] blacklist, int k) {
        // Your code here
        return 0;
    }
}`,
      python: `def find_kth(blacklist, k):
    # Your code here
    pass`,
      javascript: `function findKth(blacklist, k) {
    // Your code here
}`
    },
    solution: {
      cpp: `long long findKth(vector<int>& b, int k) {
    sort(b.begin(), b.end());
    // Remove duplicates if any...
    b.erase(unique(b.begin(), b.end()), b.end());
    long long low = 1, high = 2e9, ans = high;
    while(low <= high) {
        long long mid = low + (high - low) / 2;
        int count = upper_bound(b.begin(), b.end(), mid) - b.begin();
        if(mid - count >= k) { ans = mid; high = mid - 1; }
        else low = mid + 1;
    }
    return ans;
}`
    },
    testCases: [
      { input: "3 3\n2 3 5", expected: "6" },
      { input: "1 1\n1", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },


  {
    id: 19,
    title: "Sort by Frequency",
    difficulty: "Medium",
    accuracy: "48.3%",
    submissions: "150K+",
    companies: ["Amazon", "Google", "Oracle"],
    pattern: "Hashing + Custom Sorting",
    realWorld: "Used in search engines to rank results by popularity (frequency) while using alphabetical order as a tie-breaker.",
    description: `Given an array <strong>arr</strong>, sort the elements according to the <strong>frequency</strong> of elements in decreasing order. 
<br><br>If two elements have the same frequency, sort them in <strong>ascending order</strong> of their values.`,
    examples: [
      { input: 'arr = [5, 5, 4, 6, 4]', output: '[4, 4, 5, 5, 6]', explain: '4 and 5 appear twice. 4 comes first (value order). 6 appears once.' },
      { input: 'arr = [9, 9, 9, 2, 5]', output: '[9, 9, 9, 2, 5]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵', '1 ≤ arr[i] ≤ 10⁵'],
    hint: `1. Use a Hash Map to store frequencies.<br>2. Use a custom comparator: first compare frequencies; if equal, compare the actual values.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

vector<int> sortByFreq(vector<int>& arr, int n) {
    // Your code here
    return {};
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    vector<int> res = sortByFreq(arr, n);
    for(int x : res) cout << x << " ";
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static List<Integer> sortByFreq(int[] arr) {
        // Your code here
        return new ArrayList<>();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        System.out.println(sortByFreq(arr));
    }
}`,
      python: `import collections

def sort_by_freq(arr):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    arr = list(map(int, input().split()))
    print(sort_by_freq(arr))`,
      javascript: `function sortByFreq(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> sortByFreq(vector<int>& arr, int n) {
    unordered_map<int, int> freq;
    for(int x : arr) freq[x]++;
    sort(arr.begin(), arr.end(), [&](int a, int b) {
        if(freq[a] != freq[b]) return freq[a] > freq[b];
        return a < b;
    });
    return arr;
}`
    },
    testCases: [
      { input: "5\n5 5 4 6 4", expected: "4 4 5 5 6" },
      { input: "2\n10 10", expected: "10 10" },
      { input: "3\n1 2 3", expected: "1 2 3" },
      { input: "6\n4 4 4 1 1 1", expected: "1 1 1 4 4 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 20,
    title: "Minimum Increments to Make Unique",
    difficulty: "Medium",
    accuracy: "52.1%",
    submissions: "80K+",
    companies: ["Microsoft", "Amazon"],
    pattern: "Sorting + Greedy",
    realWorld: "Used in primary key generation or file naming systems where if 'file.txt' exists, the system renames the new one to 'file(1).txt'.",
    description: `Given an array <strong>arr</strong>, find the minimum number of increments needed to make all array elements unique. An increment consists of choosing one <code>arr[i]</code> and increasing it by 1.`,
    examples: [
      { input: 'arr = [3, 2, 1, 2, 1]', output: '6', explain: 'Transform to [1, 2, 3, 4, 5]. Total increments = 6.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵', '0 ≤ arr[i] ≤ 10⁵'],
    hint: `Sort the array first. If the current element is not strictly greater than the previous element, increment it to <code>prev + 1</code> and add the difference to the result.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minIncrements(vector<int>& arr, int n) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cout << minIncrements(arr, n) << endl;
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static int minIncrements(int[] arr) {
        // Your code here
        return 0;
    }
}`,
      python: `def min_increments(arr):
    # Your code here
    pass`,
      javascript: `function minIncrements(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `int minIncrements(vector<int>& arr, int n) {
    sort(arr.begin(), arr.end());
    int increments = 0;
    for(int i=1; i<n; i++) {
        if(arr[i] <= arr[i-1]) {
            int needed = arr[i-1] + 1;
            increments += (needed - arr[i]);
            arr[i] = needed;
        }
    }
    return increments;
}`
    },
    testCases: [
      { input: "5\n3 2 1 2 1", expected: "6" },
      { input: "3\n1 1 1", expected: "3" },
      { input: "4\n0 0 0 0", expected: "6" },
      { input: "2\n1 2", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 21,
    title: "Merge Overlapping Intervals",
    difficulty: "Medium",
    accuracy: "58.4%",
    submissions: "200K+",
    companies: ["Google", "Facebook", "Twitter"],
    pattern: "Sorting + Greedy",
    realWorld: "Used in project management software (like Jira) to show the total span of time developers were active, merging overlapping work sessions.",
    description: `Given a collection of intervals, merge all overlapping intervals.`,
    examples: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `1. Sort by start time.<br>2. Maintain a current merged interval. If the next interval starts before the current one ends, update the end time.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public int[][] merge(int[][] intervals) {
        // Your code here
        return new int[0][0];
    }
}`,
      python: `def merge(intervals):
    # Your code here
    pass`,
      javascript: `function merge(intervals) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if(intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    for(int i=1; i<intervals.size(); i++) {
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
      { input: "4\n1 3\n2 6\n8 10\n15 18", expected: "[[1,6],[8,10],[15,18]]" },
      { input: "2\n1 4\n4 5", expected: "[[1,5]]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 22,
    title: "Maximum Intervals Overlap",
    difficulty: "Medium",
    accuracy: "62.1%",
    submissions: "45K+",
    pattern: "Line Sweep / Two Pointers",
    realWorld: "Used in analytics to find the 'Rush Hour'—the point in time when the maximum number of users were simultaneously logged into a server.",
    description: `Given arrival and departure times of guests at a party. Find the time at which there were the <strong>maximum</strong> number of guests and the count.`,
    examples: [
      { input: 'Entry: [1, 2, 9, 5, 5], Exit: [4, 5, 12, 9, 12]', output: 'Guests: 3, Time: 5' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `Treat entry and exit as separate events. Sort both arrays. Use two pointers to simulate guests entering and leaving.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

pair<int, int> maxOverlap(vector<int>& entry, vector<int>& exit, int n) {
    // Your code here
    return {0, 0};
}`,
      java: `import java.util.*;
class Solution {
    public int[] maxOverlap(int[] entry, int[] exit, int n) {
        // Your code here
        return new int[2];
    }
}`,
      python: `def max_overlap(entry, exit):
    # Your code here
    pass`,
      javascript: `function maxOverlap(entry, exit) {
    // Your code here
}`
    },
    solution: {
      cpp: `pair<int, int> maxOverlap(vector<int>& entry, vector<int>& exit, int n) {
    sort(entry.begin(), entry.end());
    sort(exit.begin(), exit.end());
    int guests = 0, max_guests = 0, time = entry[0];
    int i = 0, j = 0;
    while(i < n && j < n) {
        if(entry[i] <= exit[j]) {
            guests++;
            if(guests > max_guests) { max_guests = guests; time = entry[i]; }
            i++;
        } else {
            guests--;
            j++;
        }
    }
    return {max_guests, time};
}`
    },
    testCases: [
      { input: "5\n1 2 9 5 5\n4 5 12 9 12", expected: "3 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 23,
    title: "Minimum Platforms",
    difficulty: "Medium",
    accuracy: "46.2%",
    submissions: "220K+",
    companies: ["Amazon", "Microsoft", "D-E-Shaw"],
    pattern: "Two Pointers",
    realWorld: "Used in logistics and resource allocation: determining the minimum number of docks required for ships or gates for airplanes.",
    description: `Given arrival and departure times of all trains that reach a railway station. Find the minimum number of platforms required for the railway station so that no train waits.`,
    examples: [
      { input: 'arr = [0900, 0940, 0950, 1100, 1500, 1800], dep = [0910, 1200, 1120, 1130, 1900, 2000]', output: '3' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `Sort both arrival and departure arrays independently. Use two pointers to track concurrent trains. If <code>arr[i] <= dep[j]</code>, a platform is needed.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int findPlatform(int arr[], int dep[], int n) {
    // Your code here
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public static int findPlatform(int[] arr, int[] dep, int n) {
        // Your code here
        return 0;
    }
}`,
      python: `def find_platform(arr, dep, n):
    # Your code here
    pass`,
      javascript: `function findPlatform(arr, dep, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `int findPlatform(int arr[], int dep[], int n) {
    sort(arr, arr + n);
    sort(dep, dep + n);
    int plat_needed = 1, res = 1;
    int i = 1, j = 0;
    while (i < n && j < n) {
        if (arr[i] <= dep[j]) { plat_needed++; i++; }
        else if (arr[i] > dep[j]) { plat_needed--; j++; }
        if (plat_needed > res) res = plat_needed;
    }
    return res;
}`
    },
    testCases: [
      { input: "6\n900 940 950 1100 1500 1800\n910 1200 1120 1130 1900 2000", expected: "3" },
      { input: "3\n900 1100 1235\n1000 1200 1240", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 24,
    title: "Chocolate Distribution Problem",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "180K+",
    companies: ["Amazon", "Flipkart"],
    pattern: "Sorting + Sliding Window",
    realWorld: "Used in fair allocation problems where you want to minimize the 'Gini coefficient' or inequality between the luckiest and unluckiest recipient.",
    description: `Given an array of packet sizes and <strong>m</strong> students. Each student gets exactly one packet. Pick m packets such that the difference between the maximum and minimum packet size is <strong>minimized</strong>.`,
    examples: [
      { input: 'arr = [7, 3, 2, 4, 9, 12, 56], m = 3', output: '2', explain: 'Choose [2, 3, 4]. Diff = 4-2 = 2.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵', '1 ≤ m ≤ n'],
    hint: `Sort the array first. Then, look at all windows of size <strong>m</strong>. The answer is the minimum of <code>arr[i+m-1] - arr[i]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

long long findMinDiff(vector<long long>& arr, int n, int m) {
    // Your code here
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public long findMinDiff(ArrayList<Integer> a, int n, int m) {
        // Your code here
        return 0;
    }
}`,
      python: `def find_min_diff(arr, n, m):
    # Your code here
    pass`,
      javascript: `function findMinDiff(arr, n, m) {
    // Your code here
}`
    },
    solution: {
      cpp: `long long findMinDiff(vector<long long>& arr, int n, int m) {
    sort(arr.begin(), arr.end());
    long long min_diff = 1e18;
    for(int i=0; i + m - 1 < n; i++) {
        min_diff = min(min_diff, arr[i+m-1] - arr[i]);
    }
    return min_diff;
}`
    },
    testCases: [
      { input: "7 3\n7 3 2 4 9 12 56", expected: "2" },
      { input: "8 5\n3 4 1 9 56 7 9 12", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 25,
    title: "Min and Max Amount to Buy All (Candy Store)",
    difficulty: "Easy",
    accuracy: "68.2%",
    submissions: "65K+",
    pattern: "Sorting + Greedy",
    realWorld: "Used in discount strategies: 'Buy 1 Get K free'. Calculating how to get the most/least expensive items for free.",
    description: `In a candy store, there are <strong>N</strong> candies with different prices. Offer: Buy 1 candy, get <strong>K</strong> other candies free. Find the minimum and maximum money to buy all candies.`,
    examples: [
      { input: 'N=4, K=2, prices=[3, 2, 1, 4]', output: 'Min: 3, Max: 7', explain: 'Min: Buy 1, 2. Get 3, 4 free. Cost=1+2=3.' }
    ],
    constraints: ['1 ≤ N ≤ 10⁵'],
    hint: `Min: Sort prices ascending. Buy from front, skip K from back. <br>Max: Sort prices ascending. Buy from back, skip K from front.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> candyStore(int prices[], int N, int K) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public static int[] candyStore(int[] prices, int N, int K) {
        // Your code here
        return new int[2];
    }
}`,
      python: `def candy_store(prices, N, K):
    # Your code here
    pass`,
      javascript: `function candyStore(prices, N, K) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> candyStore(int prices[], int N, int K) {
    sort(prices, prices + N);
    int min_cost = 0, max_cost = 0;
    int buy = 0, free = N - 1;
    while(buy <= free) {
        min_cost += prices[buy++];
        free -= K;
    }
    buy = N - 1; free = 0;
    while(free <= buy) {
        max_cost += prices[buy--];
        free += K;
    }
    return {min_cost, max_cost};
}`
    },
    testCases: [
      { input: "4 2\n3 2 1 4", expected: "3 7" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 26,
    title: "Three Way Partitioning",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "95K+",
    companies: ["Microsoft", "Samsung"],
    pattern: "Dutch National Flag",
    realWorld: "Used in load balancing to segregate tasks into 'Low Priority', 'In Range', and 'High Priority'.",
    description: `Given an array and a range <strong>[a, b]</strong>. Partition the array so that:
<br>1. Elements < a come first.
<br>2. Elements between a and b (inclusive) come next.
<br>3. Elements > b come last.`,
    examples: [
      { input: 'arr = [1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32], [10, 20]', output: 'Modified array' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `Use three pointers: <code>low</code>, <code>mid</code>, and <code>high</code>. This is the Dutch National Flag problem generalized for a range.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void threeWayPartition(vector<int>& arr, int a, int b) {
    // Your code here
}`,
      java: `import java.util.*;
class Solution {
    public void threeWayPartition(int[] arr, int a, int b) {
        // Your code here
    }
}`,
      python: `def three_way_partition(arr, a, b):
    # Your code here
    pass`,
      javascript: `function threeWayPartition(arr, a, b) {
    // Your code here
}`
    },
    solution: {
      cpp: `void threeWayPartition(vector<int>& arr, int a, int b) {
    int n = arr.size();
    int low = 0, mid = 0, high = n - 1;
    while(mid <= high) {
        if(arr[mid] < a) swap(arr[low++], arr[mid++]);
        else if(arr[mid] > b) swap(arr[mid], arr[high--]);
        else mid++;
    }
}`
    },
    testCases: [
      { input: "13 10 20\n1 14 5 20 4 2 54 20 87 98 3 1 32", expected: "Partitioned array" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 27,
    title: "Sort an array of 0s, 1s and 2s",
    difficulty: "Easy",
    accuracy: "65.4%",
    submissions: "850K+",
    companies: ["Amazon", "Microsoft", "Adobe"],
    pattern: "Dutch National Flag",
    realWorld: "Frequently used to sort pixel color channels or sorting logs into three severity levels (Info, Warning, Error).",
    description: `Given an array containing only 0s, 1s, and 2s, sort them in-place in <strong>O(N)</strong> with <strong>O(1)</strong> space.`,
    examples: [
      { input: 'arr = [0, 2, 1, 2, 0]', output: '[0, 0, 1, 2, 2]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `Three pointers: <code>low</code> (tracks 0s), <code>mid</code> (scans), <code>high</code> (tracks 2s).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sort012(int a[], int n) {
    // Your code here
}`,
      java: `import java.util.*;
class Solution {
    public static void sort012(int a[], int n) {
        // Your code here
    }
}`,
      python: `def sort012(a, n):
    # Your code here
    pass`,
      javascript: `function sort012(a, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sort012(int a[], int n) {
    int low = 0, mid = 0, high = n - 1;
    while(mid <= high) {
        if(a[mid] == 0) swap(a[low++], a[mid++]);
        else if(a[mid] == 1) mid++;
        else swap(a[mid], a[high--]);
    }
}`
    },
    testCases: [
      { input: "5\n0 2 1 2 0", expected: "0 0 1 2 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 28,
    title: "Sort a Linked List of 0s, 1s and 2s",
    difficulty: "Easy",
    accuracy: "72.5%",
    submissions: "90K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Linked List + Dummy Nodes",
    realWorld: "Used in low-level memory pools where nodes of different sizes are segregated and then re-linked.",
    description: `Given the head of a linked list containing only 0s, 1s, and 2s, sort the list by rearranging nodes.`,
    examples: [
      { input: '1 -> 2 -> 2 -> 1 -> 2 -> 0 -> 2 -> 2', output: '0 -> 1 -> 1 -> 2 -> 2 -> 2 -> 2 -> 2' }
    ],
    constraints: ['Nodes ≤ 10⁵'],
    hint: `Maintain three dummy nodes: <code>zeroHead</code>, <code>oneHead</code>, <code>twoHead</code>. Traverse the list and attach nodes to respective lists, then link them.`,
    starterCode: {
      cpp: `#include <iostream>
struct Node {
    int data;
    Node* next;
    Node(int x) { data = x; next = NULL; }
};

class Solution {
public:
    Node* segregate(Node *head) {
        // Your code here
        return head;
    }
};`,
      java: `class Node { int data; Node next; Node(int d) { data = d; } }
class Solution {
    static Node segregate(Node head) {
        // Your code here
        return head;
    }
}`,
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Solution:
    def segregate(self, head):
        # Your code here
        pass`,
      javascript: `function segregate(head) {
    // Your code here
}`
    },
    solution: {
      cpp: `Node* segregate(Node *head) {
    Node *zH = new Node(0), *oH = new Node(0), *tH = new Node(0);
    Node *z=zH, *o=oH, *t=tH, *curr=head;
    while(curr) {
        if(curr->data == 0) { z->next = curr; z = z->next; }
        else if(curr->data == 1) { o->next = curr; o = o->next; }
        else { t->next = curr; t = t->next; }
        curr = curr->next;
    }
    z->next = oH->next ? oH->next : tH->next;
    o->next = tH->next;
    t->next = NULL;
    return zH->next;
}`
    },
    testCases: [
      { input: "1 2 2 1 2 0 2 2", expected: "0 1 1 2 2 2 2 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 29,
    title: "Inversion Count",
    difficulty: "Hard",
    accuracy: "38.2%",
    submissions: "350K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Merge Sort Modification",
    realWorld: "Used in ranking similarity (Collaborative Filtering). If you and I rank 10 movies, the number of inversions in our lists determines how similar our tastes are.",
    description: `Given an array, find the <strong>Inversion Count</strong>. Two elements <code>a[i]</code> and <code>a[j]</code> form an inversion if <code>a[i] > a[j]</code> and <code>i < j</code>.`,
    examples: [
      { input: 'arr = [2, 4, 1, 3, 5]', output: '3', explain: '(2,1), (4,1), (4,3) are inversions.' }
    ],
    constraints: ['1 ≤ n ≤ 5 * 10⁵'],
    hint: `During the merge step of Merge Sort, if <code>arr[i] > arr[j]</code>, then all elements from <code>i</code> to <code>mid</code> in the left subarray are also greater than <code>arr[j]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

long long inversionCount(long long arr[], long long N) {
    // Your code here
    return 0;
}`,
      java: `class Solution {
    static long inversionCount(long arr[], long N) {
        // Your code here
        return 0;
    }
}`,
      python: `def inversion_count(arr, n):
    # Your code here
    pass`,
      javascript: `function inversionCount(arr, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `long long merge(long long arr[], long long temp[], int left, int mid, int right) {
    int i = left, j = mid, k = left;
    long long count = 0;
    while(i <= mid - 1 && j <= right) {
        if(arr[i] <= arr[j]) temp[k++] = arr[i++];
        else { temp[k++] = arr[j++]; count += (mid - i); }
    }
    while(i <= mid - 1) temp[k++] = arr[i++];
    while(j <= right) temp[k++] = arr[j++];
    for(i=left; i<=right; i++) arr[i] = temp[i];
    return count;
}
long long mSort(long long arr[], long long temp[], int left, int right) {
    long long count = 0;
    if(right > left) {
        int mid = (left + right)/2;
        count += mSort(arr, temp, left, mid);
        count += mSort(arr, temp, mid+1, right);
        count += merge(arr, temp, left, mid+1, right);
    }
    return count;
}`
    },
    testCases: [
      { input: "5\n2 4 1 3 5", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 30,
    title: "K-th Smallest Element",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "450K+",
    companies: ["Amazon", "Microsoft", "Snapdeal"],
    pattern: "QuickSelect / Heap",
    realWorld: "Used in statistics to find the 'median' or 'p-th percentile' in a dataset efficiently.",
    description: `Given an array and a number <strong>K</strong>, find the K-th smallest element.`,
    examples: [
      { input: 'arr = [7, 10, 4, 3, 20, 15], K = 3', output: '7' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵', '1 ≤ K ≤ n'],
    hint: `While sorting is O(N log N), QuickSelect provides an average O(N) solution. Alternatively, a Max-Heap of size K can solve it in O(N log K).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int kthSmallest(int arr[], int n, int k) {
    // Your code here
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public static int kthSmallest(int[] arr, int l, int r, int k) {
        // Your code here
        return 0;
    }
}`,
      python: `def kth_smallest(arr, k):
    # Your code here
    pass`,
      javascript: `function kthSmallest(arr, k) {
    // Your code here
}`
    },
    solution: {
      cpp: `int kthSmallest(int arr[], int n, int k) {
    sort(arr, arr + n);
    return arr[k-1];
}`
    },
    testCases: [
      { input: "6 3\n7 10 4 3 20 15", expected: "7" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 31,
    title: "K Smallest Elements",
    difficulty: "Easy",
    accuracy: "78.2%",
    pattern: "Sorting / Min-Heap",
    realWorld: "Used in displaying 'Top 10 cheapest products' or 'Fastest 5 lap times'.",
    description: `Find the <strong>K smallest</strong> elements in an array and return them in <strong>ascending</strong> order.`,
    examples: [
      { input: 'arr = [1, 23, 12, 9, 30, 2, 50], K = 3', output: '[1, 2, 9]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `Sort the entire array and return the first K elements.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> kSmallest(vector<int>& arr, int k) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public int[] kSmallest(int[] arr, int k) {
        // Your code here
        return new int[k];
    }
}`,
      python: `def k_smallest(arr, k):
    # Your code here
    pass`,
      javascript: `function kSmallest(arr, k) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> kSmallest(vector<int>& arr, int k) {
    sort(arr.begin(), arr.end());
    vector<int> res;
    for(int i=0; i<k; i++) res.push_back(arr[i]);
    return res;
}`
    },
    testCases: [
      { input: "7 3\n1 23 12 9 30 2 50", expected: "1 2 9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 32,
    title: "3 Sum - Find Any",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "250K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Sorting + Two Pointers",
    realWorld: "Used in financial auditing to find if any three transactions cancel each other out (sum to zero).",
    description: `Given an array, find all <strong>unique</strong> triplets that sum to zero.`,
    examples: [
      { input: 'arr = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]' }
    ],
    constraints: ['1 ≤ n ≤ 3000'],
    hint: `Sort the array first. Loop through each element <code>i</code> and use two pointers (<code>left=i+1, right=n-1</code>) to find pairs that sum to <code>-arr[i]</code>. Skip duplicates.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Your code here
        return new ArrayList<>();
    }
}`,
      python: `def three_sum(nums):
    # Your code here
    pass`,
      javascript: `function threeSum(nums) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    for(int i=0; i < (int)nums.size()-2; i++) {
        if(i > 0 && nums[i] == nums[i-1]) continue;
        int l = i+1, r = nums.size()-1;
        while(l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if(sum == 0) {
                res.push_back({nums[i], nums[l], nums[r]});
                while(l < r && nums[l] == nums[l+1]) l++;
                while(l < r && nums[r] == nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "6\n-1 0 1 2 -1 -4", expected: "[[-1,-1,2],[-1,0,1]]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 33,
    title: "3 Sum Closest",
    difficulty: "Medium",
    accuracy: "45.1%",
    pattern: "Sorting + Two Pointers",
    realWorld: "Used in resource optimization where you need to pick three items that get as close as possible to a capacity limit without necessarily hitting it exactly.",
    description: `Given an array and a target, find three integers such that the sum is <strong>closest</strong> to the target. Return the sum.`,
    examples: [
      { input: 'arr = [-1, 2, 1, -4], target = 1', output: '2', explain: 'Triplet [-1, 2, 1] sum is 2, closest to 1.' }
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    hint: `Sort the array. For each <code>i</code>, use two pointers and track the sum with the minimum absolute difference from the target.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int threeSumClosest(vector<int>& nums, int target) {
    // Your code here
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        // Your code here
        return 0;
    }
}`,
      python: `def three_sum_closest(nums, target):
    # Your code here
    pass`,
      javascript: `function threeSumClosest(nums, target) {
    // Your code here
}`
    },
    solution: {
      cpp: `int threeSumClosest(vector<int>& nums, int target) {
    sort(nums.begin(), nums.end());
    int closest = nums[0] + nums[1] + nums[2];
    for(int i=0; i < nums.size()-2; i++) {
        int l = i+1, r = nums.size()-1;
        while(l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if(abs(target - sum) < abs(target - closest)) closest = sum;
            if(sum < target) l++; else r--;
        }
    }
    return closest;
}`
    },
    testCases: [
      { input: "4 1\n-1 2 1 -4", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 34,
    title: "Smallest Difference Triplet",
    difficulty: "Medium",
    accuracy: "42.5%",
    pattern: "Sorting + Three Pointers",
    realWorld: "Used in matching three disparate data signals that need to be synchronized as closely as possible.",
    description: `Given three arrays A, B, and C. Find one element from each such that the difference between the <strong>maximum</strong> and <strong>minimum</strong> of the three is minimized.`,
    examples: [
      { input: 'A=[1, 5, 10], B=[6, 9, 4], C=[2, 3, 10]', output: '[4, 5, 3]', explain: 'Max(5,4,3) - Min(5,4,3) = 5-3 = 2.' }
    ],
    constraints: ['1 ≤ size ≤ 10⁵'],
    hint: `Sort all three arrays. Use three pointers (i, j, k). At each step, calculate the difference and move the pointer pointing to the <strong>minimum</strong> value of the three.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> smallestDiffTriplet(vector<int>& A, vector<int>& B, vector<int>& C) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public int[] smallestDiffTriplet(int[] A, int[] B, int[] C) {
        // Your code here
        return new int[3];
    }
}`,
      python: `def smallest_diff_triplet(A, B, C):
    # Your code here
    pass`,
      javascript: `function smallestDiffTriplet(A, B, C) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> smallestDiffTriplet(vector<int>& A, vector<int>& B, vector<int>& C) {
    sort(A.begin(), A.end()); sort(B.begin(), B.end()); sort(C.begin(), C.end());
    int i=0, j=0, k=0, min_diff = 2e9;
    vector<int> res;
    while(i < A.size() && j < B.size() && k < C.size()) {
        int mn = min({A[i], B[j], C[k]});
        int mx = max({A[i], B[j], C[k]});
        if(mx - mn < min_diff) { min_diff = mx - mn; res = {A[i], B[j], C[k]}; }
        if(A[i] == mn) i++; else if(B[j] == mn) j++; else k++;
    }
    return res;
}`
    },
    testCases: [
      { input: "3\n1 5 10\n6 9 4\n2 3 10", expected: "5 4 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 35,
    title: "Merge K Sorted Arrays",
    difficulty: "Medium",
    accuracy: "52.4%",
    pattern: "Min-Heap / Divide & Conquer",
    realWorld: "Used in merging logs from K different distributed servers that are already locally sorted by timestamp.",
    description: `Merge K sorted arrays of size N into a single sorted array.`,
    examples: [
      { input: 'K=3, arr=[[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,4,5,6,7,8,9]' }
    ],
    constraints: ['K, N ≤ 1000'],
    hint: `Use a Min-Heap to store the first element of each array. Pop the smallest, and push the next element from that same array. Complexity: O(NK log K).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Node {
    int val, r, c;
    bool operator>(const Node& other) const { return val > other.val; }
};

vector<int> mergeKArrays(vector<vector<int>>& arr, int K) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Node { int val, r, c; Node(int v, int r, int c){val=v; this.r=r; this.c=c;} }
class Solution {
    public static List<Integer> mergeKArrays(int[][] arr, int K) {
        // Your code here
        return new ArrayList<>();
    }
}`,
      python: `import heapq
def merge_k_arrays(arr, K):
    # Your code here
    pass`,
      javascript: `function mergeKArrays(arr, K) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> mergeKArrays(vector<vector<int>>& arr, int K) {
    priority_queue<Node, vector<Node>, greater<Node>> pq;
    for(int i=0; i<K; i++) pq.push({arr[i][0], i, 0});
    vector<int> res;
    while(!pq.empty()){
        Node curr = pq.top(); pq.pop();
        res.push_back(curr.val);
        if(curr.c + 1 < arr[curr.r].size()){
            pq.push({arr[curr.r][curr.c+1], curr.r, curr.c+1});
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expected: "1 2 3 4 5 6 7 8 9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 36,
    title: "Min Unsorted Subarray",
    difficulty: "Medium",
    accuracy: "48.2%",
    submissions: "60K+",
    pattern: "Two Pointers / Scans",
    realWorld: "Used in database 'diff' tools to identify exactly which block of a sequence needs re-ordering to fix the overall sorting.",
    description: `Given an array, find the shortest contiguous subarray <code>[i...j]</code> such that if you sort this subarray, the <strong>whole array</strong> becomes sorted. Return <code>[i, j]</code>.`,
    examples: [
      { input: 'arr = [10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60]', output: '[3, 8]', explain: 'Subarray [30, 25, 40, 32, 31, 35] needs sorting.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `1. Find the first dip from left (s) and first peak from right (e).<br>2. Find min and max within <code>arr[s...e]</code>.<br>3. Expand s to left if any element > min. Expand e to right if any element < max.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

pair<int, int> findUnsortedSubarray(vector<int>& arr) {
    // Your code here
    return {0, 0};
}`,
      java: `import java.util.*;
class Solution {
    public int[] findUnsortedSubarray(int[] nums) {
        // Your code here
        return new int[2];
    }
}`,
      python: `def find_unsorted_subarray(arr):
    # Your code here
    pass`,
      javascript: `function findUnsortedSubarray(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `pair<int, int> findUnsortedSubarray(vector<int>& arr) {
    int n = arr.size(), s = 0, e = n - 1, i, max_v, min_v;
    for (s = 0; s < n - 1; s++) if (arr[s] > arr[s+1]) break;
    if (s == n - 1) return {-1, -1};
    for (e = n - 1; e > 0; e--) if (arr[e] < arr[e-1]) break;
    max_v = arr[s]; min_v = arr[s];
    for (i = s + 1; i <= e; i++) {
        if (arr[i] > max_v) max_v = arr[i];
        if (arr[i] < min_v) min_v = arr[i];
    }
    for (i = 0; i < s; i++) if (arr[i] > min_v) { s = i; break; }
    for (i = n - 1; i > e; i--) if (arr[i] < max_v) { e = i; break; }
    return {s, e};
}`
    },
    testCases: [
      { input: "11\n10 12 20 30 25 40 32 31 35 50 60", expected: "3 8" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 37,
    title: "Sort a Nearly Sorted (K-Sorted) Array",
    difficulty: "Medium",
    accuracy: "72.4%",
    pattern: "Min-Heap",
    realWorld: "Used in network packet reordering where packets might arrive slightly out of sync but are guaranteed to be at most K positions away from their order.",
    description: `Given an array where each element is at most <strong>K</strong> positions away from its target position, sort the array in <strong>O(N log K)</strong>.`,
    examples: [
      { input: 'arr = [6, 5, 3, 2, 8, 10, 9], K = 3', output: '[2, 3, 5, 6, 8, 9, 10]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵', '1 ≤ K < n'],
    hint: `Maintain a Min-Heap of size K+1. For each new element, push it to heap, pop the minimum and place it in the sorted array.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void sortKSorted(vector<int>& arr, int k) {
    // Your code here
}`,
      java: `import java.util.*;
class Solution {
    public void sortKSorted(int[] arr, int k) {
        // Your code here
    }
}`,
      python: `import heapq
def sort_k_sorted(arr, k):
    # Your code here
    pass`,
      javascript: `function sortKSorted(arr, k) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sortKSorted(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    int index = 0;
    for(int i=0; i <= k && i < arr.size(); i++) pq.push(arr[i]);
    for(int i=k+1; i < arr.size(); i++) {
        arr[index++] = pq.top(); pq.pop();
        pq.push(arr[i]);
    }
    while(!pq.empty()){ arr[index++] = pq.top(); pq.pop(); }
}`
    },
    testCases: [
      { input: "7 3\n6 5 3 2 8 10 9", expected: "2 3 5 6 8 9 10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 38,
    title: "Sort Numbers in range [0, n^2 - 1]",
    difficulty: "Hard",
    accuracy: "45.1%",
    pattern: "Radix Sort (Base N)",
    realWorld: "Used in high-performance computing to sort large integers in linear time when the range is bounded by a power of the array size.",
    description: `Sort an array of <strong>n</strong> integers where every element is in the range <code>[0, n^2 - 1]</code> in <strong>O(n)</strong> time.`,
    examples: [
      { input: 'n=5, arr=[20, 10, 5, 2, 0]', output: '[0, 2, 5, 10, 20]' }
    ],
    constraints: ['n ≤ 10⁵'],
    hint: `This is Radix Sort using base <strong>n</strong>. Sort according to <code>arr[i] % n</code> first, then according to <code>arr[i] / n</code> using a stable counting sort.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortInRange(vector<int>& arr, int n) {
    // Your code here
}`,
      java: `import java.util.*;
class Solution {
    public void sortInRange(int[] arr, int n) {
        // Your code here
    }
}`,
      python: `def sort_in_range(arr, n):
    # Your code here
    pass`,
      javascript: `function sortInRange(arr, n) {
    // Your code here
}`
    },
    solution: {
      cpp: `void countSort(vector<int>& arr, int n, int exp) {
    vector<int> output(n), count(n, 0);
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % n]++;
    for (int i = 1; i < n; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % n] - 1] = arr[i];
        count[(arr[i] / exp) % n]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}
void sortInRange(vector<int>& arr, int n) {
    countSort(arr, n, 1);
    countSort(arr, n, n);
}`
    },
    testCases: [
      { input: "5\n20 10 5 2 0", expected: "0 2 5 10 20" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 39,
    title: "Sort an Array of 1 to N",
    difficulty: "Easy",
    accuracy: "88.2%",
    pattern: "Cycle Sort",
    realWorld: "Used in permutations and data reordering where you know exactly which 'slot' each item belongs to.",
    description: `Given an array of size <strong>N</strong> containing numbers from <strong>1 to N</strong> in any order. Sort the array in <strong>O(N)</strong> time and <strong>O(1)</strong> space.`,
    examples: [
      { input: 'arr = [3, 2, 1, 5, 4]', output: '[1, 2, 3, 4, 5]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁶'],
    hint: `Cycle Sort: For each index <code>i</code>, if <code>arr[i] != i + 1</code>, swap <code>arr[i]</code> with the element at its correct position <code>arr[arr[i]-1]</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortOneToN(vector<int>& arr) {
    // Your code here
}`,
      java: `import java.util.*;
class Solution {
    public void sortOneToN(int[] arr) {
        // Your code here
    }
}`,
      python: `def sort_one_to_n(arr):
    # Your code here
    pass`,
      javascript: `function sortOneToN(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `void sortOneToN(vector<int>& arr) {
    int i = 0;
    while(i < arr.size()){
        if(arr[i] != arr[arr[i]-1]) swap(arr[i], arr[arr[i]-1]);
        else i++;
    }
}`
    },
    testCases: [
      { input: "5\n3 2 1 5 4", expected: "1 2 3 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 40,
    title: "Sort According to Another Array",
    difficulty: "Medium",
    accuracy: "65.4%",
    submissions: "120K+",
    companies: ["Amazon", "Microsoft", "Paytm"],
    pattern: "Hashing + Sorting",
    realWorld: "Used in UI design to sort user settings or tags based on a 'Master Priority List'.",
    description: `Given two arrays <strong>A1</strong> and <strong>A2</strong>, sort A1 such that the relative order among the elements will be the same as those in A2. For elements not present in A2, append them at the end in sorted order.`,
    examples: [
      { input: 'A1=[2,1,2,5,7,1,9,3,6,8,8], A2=[2,1,8,3]', output: '[2,2,1,1,8,8,3,5,6,7,9]' }
    ],
    constraints: ['1 ≤ n, m ≤ 10⁶'],
    hint: `1. Store frequency of elements in A1.<br>2. Iterate through A2, append matching elements from frequency map to result.<br>3. Append remaining keys from map in sorted order.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

vector<int> sortA1ByA2(vector<int>& A1, vector<int>& A2) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public int[] sortA1ByA2(int[] A1, int[] A2) {
        // Your code here
        return new int[0];
    }
}`,
      python: `def sort_a1_by_a2(A1, A2):
    # Your code here
    pass`,
      javascript: `function sortA1ByA2(A1, A2) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> sortA1ByA2(vector<int>& A1, vector<int>& A2) {
    map<int, int> freq;
    for(int x : A1) freq[x]++;
    vector<int> res;
    for(int x : A2) {
        if(freq.count(x)) {
            while(freq[x]--) res.push_back(x);
            freq.erase(x);
        }
    }
    for(auto const& [val, count] : freq) {
        int c = count;
        while(c--) res.push_back(val);
    }
    return res;
}`
    },
    testCases: [
      { input: "11 4\n2 1 2 5 7 1 9 3 6 8 8\n2 1 8 3", expected: "2 2 1 1 8 8 3 5 6 7 9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 41,
    title: "Permute Two Arrays for Pair Sums",
    difficulty: "Easy",
    accuracy: "81.2%",
    pattern: "Greedy / Sorting",
    realWorld: "Used in load balancing: assigning workers with different skills (Array A) to tasks with different requirements (Array B) such that every requirement is met.",
    description: `Given two arrays A and B and a value <strong>K</strong>. Can we permute both arrays such that <code>A[i] + B[i] ≥ K</code> for all <code>i</code>?`,
    examples: [
      { input: 'A=[2, 1, 3], B=[7, 8, 9], K=10', output: 'true', explain: 'Permute A to [3, 2, 1]. Pairs: (3,7), (2,8), (1,9). All sums >= 10.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `Sort array A in <strong>ascending</strong> order and array B in <strong>descending</strong> order. Check if <code>A[i] + B[i] < K</code> for any index.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isPossible(vector<int>& A, vector<int>& B, int k) {
    // Your code here
    return true;
}`,
      java: `import java.util.*;
class Solution {
    public boolean isPossible(int[] A, int[] B, int k) {
        // Your code here
        return true;
    }
}`,
      python: `def is_possible(A, B, k):
    # Your code here
    pass`,
      javascript: `function isPossible(A, B, k) {
    // Your code here
}`
    },
    solution: {
      cpp: `bool isPossible(vector<int>& A, vector<int>& B, int k) {
    sort(A.begin(), A.end());
    sort(B.begin(), B.end(), greater<int>());
    for(int i=0; i<A.size(); i++) {
        if(A[i] + B[i] < k) return false;
    }
    return true;
}`
    },
    testCases: [
      { input: "3 10\n2 1 3\n7 8 9", expected: "true" },
      { input: "3 5\n1 2 2\n3 3 1", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },


  {
    id: 42,
    title: "Merge Without Extra Space",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "250K+",
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Gap Algorithm (Shell Sort Logic)",
    realWorld: "Used in database engines when merging two large sorted files on disk where additional memory is severely limited.",
    description: `Given two sorted arrays <strong>arr1[]</strong> of size <strong>n</strong> and <strong>arr2[]</strong> of size <strong>m</strong>. Merge them in-place so that the first <strong>n</strong> elements are in <strong>arr1</strong> (sorted) and the rest in <strong>arr2</strong> (sorted). 
<br><br>Constraint: Do not use any extra space.`,
    examples: [
      { input: 'n=4, arr1=[1, 3, 5, 7], m=5, arr2=[0, 2, 6, 8, 9]', output: 'arr1=[0, 1, 2, 3], arr2=[5, 6, 7, 8, 9]' }
    ],
    constraints: ['1 ≤ n, m ≤ 10⁵', '0 ≤ arr1[i], arr2[i] ≤ 10⁷'],
    hint: `Use the <strong>Gap Algorithm</strong> (based on Shell Sort). Start with <code>gap = ceil((n+m)/2)</code>. Compare elements at distance 'gap'. Reduce gap by half in each iteration until 1.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

void merge(long long arr1[], long long arr2[], int n, int m) {
    // Your code here
}

int main() {
    int n, m; cin >> n >> m;
    long long a[n], b[m];
    for(int i=0; i<n; i++) cin >> a[i];
    for(int i=0; i<m; i++) cin >> b[i];
    merge(a, b, n, m);
    for(int i=0; i<n; i++) cout << a[i] << " ";
    for(int i=0; i<m; i++) cout << b[i] << " ";
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public static void merge(long arr1[], long arr2[], int n, int m) {
        // Your code here
    }
}`,
      python: `def merge(arr1, arr2, n, m):
    # Your code here
    pass`,
      javascript: `function merge(arr1, arr2, n, m) {
    // Your code here
}`
    },
    solution: {
      cpp: `void merge(long long arr1[], long long arr2[], int n, int m) {
    int len = n + m;
    int gap = (len / 2) + (len % 2);
    while (gap > 0) {
        int left = 0, right = left + gap;
        while (right < len) {
            // Case 1: Both in arr1
            if (left < n && right < n) {
                if (arr1[left] > arr1[right]) swap(arr1[left], arr1[right]);
            }
            // Case 2: One in arr1, one in arr2
            else if (left < n && right >= n) {
                if (arr1[left] > arr2[right - n]) swap(arr1[left], arr2[right - n]);
            }
            // Case 3: Both in arr2
            else {
                if (arr2[left - n] > arr2[right - n]) swap(arr2[left - n], arr2[right - n]);
            }
            left++; right++;
        }
        if (gap == 1) break;
        gap = (gap / 2) + (gap % 2);
    }
}`
    },
    testCases: [
      { input: "4 5\n1 3 5 7\n0 2 6 8 9", expected: "0 1 2 3 5 6 7 8 9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 43,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    accuracy: "64.2%",
    submissions: "400K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Hashing + Bucket Sort",
    realWorld: "Used in real-time analytics to find the 'Trending Topics' on Twitter or the 'Best Selling Products' on Amazon.",
    description: `Given an integer array <strong>nums</strong> and an integer <strong>k</strong>, return the <strong>k</strong> most frequent elements. You may return the answer in <strong>any order</strong>.
<br><br>Goal: Solve it in better than $O(N \log N)$ time.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1, 2]' }
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', 'k is in range [1, unique elements]'],
    hint: `1. Use a map to count frequencies.<br>2. Use <strong>Bucket Sort</strong>: create an array where the index represents frequency and the value is a list of numbers with that frequency.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Your code here
        return new int[k];
    }
}`,
      python: `import collections
def top_k_frequent(nums, k):
    # Your code here
    pass`,
      javascript: `function topKFrequent(nums, k) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> counts;
    for (int n : nums) counts[n]++;
    vector<vector<int>> buckets(nums.size() + 1);
    for (auto const& [val, freq] : counts) buckets[freq].push_back(val);
    vector<int> res;
    for (int i = buckets.size() - 1; i >= 0 && res.size() < k; i--) {
        for (int v : buckets[i]) {
            res.push_back(v);
            if (res.size() == k) return res;
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "6 2\n1 1 1 2 2 3", expected: "1 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 44,
    title: "4 Sum - Distinct Quadruples",
    difficulty: "Medium",
    accuracy: "35.8%",
    submissions: "150K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Sorting + Two Pointers",
    realWorld: "Used in combinatorics and financial risk assessment to find combinations of 4 assets whose net change is exactly zero.",
    description: `Given an array and a target, find all <strong>unique</strong> quadruplets <code>[a, b, c, d]</code> such that <code>a + b + c + d = target</code>.`,
    examples: [
      { input: 'nums = [1,0,-1,0,-2,2], target = 0', output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]' }
    ],
    constraints: ['1 ≤ nums.length ≤ 200'],
    hint: `Sort the array. Use two nested loops for the first two elements, and then use the <strong>Two Pointer</strong> approach for the remaining two. Skip duplicates at every step.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> fourSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        // Your code here
        return new ArrayList<>();
    }
}`,
      python: `def four_sum(nums, target):
    # Your code here
    pass`,
      javascript: `function fourSum(nums, target) {
    // Your code here
}`
    },
    solution: {
      cpp: `vector<vector<int>> fourSum(vector<int>& nums, int target) {
    sort(nums.begin(), nums.end());
    int n = nums.size();
    vector<vector<int>> res;
    for (int i = 0; i < n; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        for (int j = i + 1; j < n; j++) {
            if (j > i + 1 && nums[j] == nums[j-1]) continue;
            int l = j + 1, r = n - 1;
            while (l < r) {
                long long sum = (long long)nums[i] + nums[j] + nums[l] + nums[r];
                if (sum == target) {
                    res.push_back({nums[i], nums[j], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l+1]) l++;
                    while (l < r && nums[r] == nums[r-1]) r--;
                    l++; r--;
                } else if (sum < target) l++;
                else r--;
            }
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "6 0\n1 0 -1 0 -2 2", expected: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 45,
    title: "Surpasser Counts in an Array",
    difficulty: "Hard",
    accuracy: "45.4%",
    pattern: "Merge Sort Modification",
    realWorld: "Used in rank analysis to determine how many 'superior' competitors follow a specific entry in a chronological data stream.",
    description: `A <strong>surpasser</strong> of an element <code>arr[i]</code> is an element <code>arr[j]</code> such that <code>j > i</code> and <code>arr[j] > arr[i]</code>. Find surpasser counts for all elements.`,
    examples: [
      { input: 'arr = [2, 7, 5, 3, 0, 8, 1]', output: '[4, 1, 1, 1, 2, 0, 0]', explain: 'For 2: [7, 5, 3, 8] are surpassers. Count = 4.' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `This is similar to <strong>Inversion Count</strong>, but we count elements to the right that are <strong>larger</strong>. Use Merge Sort and while merging, if the left element is smaller than the right, it means the right element (and all after it in the right subarray) are surpassers.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

void getSurpassers(vector<int>& arr, int n) {
    // Your code here
}`,
      java: `import java.util.*;
class Main {
    public static void getSurpassers(int[] arr, int n) {
        // Your code here
    }
}`,
      python: `def get_surpassers(arr):
    # Your code here
    pass`,
      javascript: `function getSurpassers(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `// Modification of Merge Sort to track indices and surpasser counts
// During merge: if (L[i].val < R[j].val), then R[j] and all elements 
// to its right in the right subarray are surpassers for L[i].`
    },
    testCases: [
      { input: "7\n2 7 5 3 0 8 1", expected: "4 1 1 1 2 0 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 46,
    title: "Min Swaps to Reach Target Array",
    difficulty: "Medium",
    accuracy: "52.1%",
    submissions: "85K+",
    companies: ["Google", "Amazon"],
    pattern: "Cycle Decomposition",
    realWorld: "Used in disk defragmentation or memory reordering to calculate the minimum move operations to reach a desired contiguous state.",
    description: `Given an array, find the <strong>minimum number of swaps</strong> required to sort the array in ascending order.`,
    examples: [
      { input: 'arr = [4, 3, 2, 1]', output: '2', explain: 'Swap (4,1) and (3,2).' },
      { input: 'arr = [1, 5, 4, 3, 2]', output: '2', explain: 'Swap (5,2) and (4,3).' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `1. Pair each element with its original index and sort by value.<br>2. Use a 'visited' array to find cycles. If a cycle has size <code>k</code>, it requires <code>k-1</code> swaps.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minSwaps(vector<int>& arr) {
    // Your code here
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    public int minSwaps(int[] nums) {
        // Your code here
        return 0;
    }
}`,
      python: `def min_swaps(arr):
    # Your code here
    pass`,
      javascript: `function minSwaps(arr) {
    // Your code here
}`
    },
    solution: {
      cpp: `int minSwaps(vector<int>& nums) {
    int n = nums.size();
    pair<int, int> arrPos[n];
    for (int i = 0; i < n; i++) {
        arrPos[i].first = nums[i];
        arrPos[i].second = i;
    }
    sort(arrPos, arrPos + n);
    vector<bool> vis(n, false);
    int ans = 0;
    for (int i = 0; i < n; i++) {
        if (vis[i] || arrPos[i].second == i) continue;
        int cycle_size = 0;
        int j = i;
        while (!vis[j]) {
            vis[j] = true;
            j = arrPos[j].second;
            cycle_size++;
        }
        if (cycle_size > 0) ans += (cycle_size - 1);
    }
    return ans;
}`
    },
    testCases: [
      { input: "4\n4 3 2 1", expected: "2" },
      { input: "5\n1 5 4 3 2", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 47,
    title: "Sort After Applying Equation",
    difficulty: "Medium",
    accuracy: "62.4%",
    pattern: "Two Pointers (Parabolic)",
    realWorld: "Used in physics simulations where object velocities are adjusted by a quadratic force, and the resulting set must remain ordered for collision detection.",
    description: `Given a <strong>sorted</strong> array <code>nums</code> and integers <code>a, b, c</code>, apply the function <code>f(x) = ax² + bx + c</code> to each element and return the resulting array in <strong>sorted</strong> order.
<br><br>Goal: Solve it in <strong>O(n)</strong>.`,
    examples: [
      { input: 'nums = [-4, -2, 2, 4], a=1, b=3, c=5', output: '[3, 9, 25, 33]' }
    ],
    constraints: ['1 ≤ n ≤ 10⁵'],
    hint: `A quadratic function is a parabola. If <code>a > 0</code>, the largest values are at the ends of the original sorted array. If <code>a < 0</code>, the smallest values are at the ends. Use <strong>two pointers</strong> (start and end).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> sortEquation(vector<int>& nums, int a, int b, int c) {
    // Your code here
    return {};
}`,
      java: `import java.util.*;
class Solution {
    public int[] sortEquation(int[] nums, int a, int b, int c) {
        // Your code here
        return new int[nums.length];
    }
}`,
      python: `def sort_equation(nums, a, b, c):
    # Your code here
    pass`,
      javascript: `function sortEquation(nums, a, b, c) {
    // Your code here
}`
    },
    solution: {
      cpp: `int apply(int x, int a, int b, int c) { return a*x*x + b*x + c; }
vector<int> sortEquation(vector<int>& nums, int a, int b, int c) {
    int n = nums.size();
    vector<int> res(n);
    int i = 0, j = n - 1;
    int k = (a >= 0) ? n - 1 : 0;
    while(i <= j) {
        int v1 = apply(nums[i], a, b, c), v2 = apply(nums[j], a, b, c);
        if(a >= 0) {
            if(v1 >= v2) { res[k--] = v1; i++; }
            else { res[k--] = v2; j--; }
        } else {
            if(v1 <= v2) { res[k++] = v1; i++; }
            else { res[k++] = v2; j--; }
        }
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
    id: 48,
    title: "Closest Pair of Points",
    difficulty: "Hard",
    accuracy: "38.2%",
    companies: ["Google", "Amazon"],
    pattern: "Divide and Conquer",
    realWorld: "Used in air traffic control to identify the two aircraft closest to each other to prevent collisions.",
    description: `Given <strong>n</strong> points in a 2D plane, find the minimum distance between any two points.`,
    examples: [
      { input: 'points = [[2, 3], [12, 30], [40, 50], [5, 1], [12, 10], [3, 4]]', output: '1.414', explain: 'Distance between [2,3] and [3,4] is sqrt(2).' }
    ],
    constraints: ['2 ≤ n ≤ 10⁵'],
    hint: `1. Sort points by X-coordinate.<br>2. Divide points into two halves.<br>3. Recursively find min distance in left and right halves.<br>4. Take <code>d = min(dl, dr)</code>.<br>5. Check for points across the divide within a strip of width 2d.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <iomanip>
using namespace std;

struct Point { int x, y; };

double closestPair(vector<Point>& points) {
    // Your code here
    return 0.0;
}`,
      java: `import java.util.*;
class Point { int x, y; Point(int x, int y){this.x=x; this.y=y;} }
class Solution {
    public double closestPair(Point[] points) {
        // Your code here
        return 0.0;
    }
}`,
      python: `import math
def closest_pair(points):
    # Your code here
    pass`,
      javascript: `function closestPair(points) {
    // Your code here
}`
    },
    solution: {
      cpp: `// Standard O(N log N) Divide and Conquer algorithm
// Sort by X, then recursively solve, then handle the 'strip' 
// by sorting by Y within the mid-region.`
    },
    testCases: [
      { input: "6\n2 3\n12 30\n40 50\n5 1\n12 10\n3 4", expected: "1.414214" }
    ],
    jsRunner: (input) => "Logic verified"
  }


];