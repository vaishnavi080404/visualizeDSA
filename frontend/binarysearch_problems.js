const TOPIC_CONFIG = {
  name: "Binary Search",
  level: "Level 3 of 3 · Problems",
  backLink: "binarySearch_L1.html",
  backLabel: "Binary Search"
};

const PROBLEMS = [
  {
    id: 1,
    title: "Lower and Upper Bound",
    difficulty: "Medium",
    accuracy: "62.1%",
    submissions: "350K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Binary Search Boundary",
    realWorld: "Used in database indexing to find the range of records that fall within specific timestamps or price ranges.",
    description: `Given a sorted array <strong>arr</strong> and a target <strong>x</strong>:<br>
1. <strong>Lower Bound:</strong> Find the index of the first element $\ge$ x.<br>
2. <strong>Upper Bound:</strong> Find the index of the first element $>$ x.
<br><br>Return both indices as a pair. If no such index exists, return <strong>n</strong>.`,
    examples: [
      { input: 'arr = [1, 2, 4, 4, 4, 5, 7], x = 4', output: 'Lower: 2, Upper: 5', explain: 'First 4 is at index 2. First element greater than 4 is 5 at index 5.' },
      { input: 'arr = [1, 2, 3, 5], x = 4', output: 'Lower: 3, Upper: 3', explain: 'First element $\ge$ 4 is 5 (index 3). First element $>$ 4 is also 5.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁶',
      '1 ≤ arr[i], x ≤ 10⁹',
      'Array is sorted.'
    ],
    hint: `For Lower Bound: If <code>arr[mid] >= x</code>, this could be our answer, but there might be a smaller index to the left. So, <code>ans = mid, high = mid - 1</code>.<br>
For Upper Bound: Use <code>arr[mid] > x</code> instead.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    pair<int, int> getBounds(vector<int>& arr, int n, int x) {
        // Your code here
        return {0, 0};
    }
};

int main() {
    int n, x;
    if(!(cin >> n >> x)) return 0;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    pair<int, int> res = sol.getBounds(arr, n, x);
    cout << res.first << " " << res.second << endl;
    return 0;
}`,
      python: `class Solution:
    def getBounds(self, arr, n, x):
        # Your code here
        pass

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().split()
    if data:
        n = int(data[0])
        x = int(data[1])
        arr = list(map(int, data[2:]))
        lower, upper = Solution().getBounds(arr, n, x)
        print(f"{lower} {upper}")`,
      java: `import java.util.*;

class Solution {
    public int[] getBounds(int[] arr, int n, int x) {
        // Your code here
        return new int[]{0, 0};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int x = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        int[] res = new Solution().getBounds(arr, n, x);
        System.out.println(res[0] + " " + res[1]);
    }
}`,
      javascript: `function getBounds(arr, n, x) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 2) {
    const n = parseInt(input[0]);
    const x = parseInt(input[1]);
    const arr = input.slice(2, 2 + n).map(Number);
    const [lower, upper] = getBounds(arr, n, x);
    console.log(lower + " " + upper);
}`
    },
    solution: {
      cpp: `pair<int, int> getBounds(vector<int>& arr, int n, int x) {
    int low = 0, high = n - 1, lb = n, ub = n;
    // Lower Bound
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(arr[mid] >= x) { lb = mid; high = mid - 1; }
        else low = mid + 1;
    }
    // Upper Bound
    low = 0, high = n - 1;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(arr[mid] > x) { ub = mid; high = mid - 1; }
        else low = mid + 1;
    }
    return {lb, ub};
}`
    },
    testCases: [
      { input: "7 4\n1 2 4 4 4 5 7", expected: "2 5" },
      { input: "4 4\n1 2 3 5", expected: "3 3" },
      { input: "3 10\n1 2 3", expected: "3 3" },
      { input: "5 0\n1 2 3 4 5", expected: "0 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Search Insert Position",
    difficulty: "Easy",
    accuracy: "88.4%",
    submissions: "600K+",
    companies: ["Apple", "Google", "Facebook"],
    pattern: "Binary Search (Lower Bound)",
    realWorld: "Used in maintaining a sorted leaderboard where a new score needs to be inserted at the correct rank.",
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
<br><br>You must write an algorithm with <strong>O(log n)</strong> runtime complexity.`,
    examples: [
      { input: 'nums = [1, 3, 5, 6], target = 5', output: '2' },
      { input: 'nums = [1, 3, 5, 6], target = 2', output: '1' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁴',
      '-10⁴ ≤ nums[i], target ≤ 10⁴'
    ],
    hint: `This is exactly the <strong>Lower Bound</strong> problem. You are looking for the smallest index <code>i</code> such that <code>nums[i] >= target</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // Your code here
        return 0;
    }
};

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.searchInsert(nums, target) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int searchInsert(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    int ans = nums.size();
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(nums[mid] >= target) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`
    },
    testCases: [
      { input: "4 5\n1 3 5 6", expected: "2" },
      { input: "4 2\n1 3 5 6", expected: "1" },
      { input: "4 7\n1 3 5 6", expected: "4" },
      { input: "4 0\n1 3 5 6", expected: "0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Square Root (Integer)",
    difficulty: "Easy",
    accuracy: "75.8%",
    submissions: "500K+",
    companies: ["Microsoft", "Amazon", "Samsung"],
    pattern: "Binary Search on Answer",
    realWorld: "Used in computer graphics for distance calculations and normalizing vectors where precision is capped at pixels.",
    description: `Given a non-negative integer <strong>x</strong>, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.
<br><br>Do not use any built-in exponent functions like <code>pow(x, 0.5)</code> or <code>sqrt()</code>.`,
    examples: [
      { input: 'x = 4', output: '2' },
      { input: 'x = 8', output: '2', explain: 'Square root of 8 is 2.828..., so return 2.' }
    ],
    constraints: [
      '0 ≤ x ≤ 2³¹ - 1'
    ],
    hint: `Search in the range [0, x]. For a mid value, check if <code>mid * mid <= x</code>. <br>
If it is, <code>mid</code> could be the answer, so search for a larger one in the right half.`,
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

class Solution {
public:
    int mySqrt(int x) {
        // Your code here
        return 0;
    }
};

int main() {
    int x;
    cin >> x;
    Solution sol;
    cout << sol.mySqrt(x) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int mySqrt(int x) {
    if(x == 0) return 0;
    int low = 1, high = x, ans = 1;
    while(low <= high) {
        long long mid = low + (high - low) / 2;
        if(mid * mid <= x) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}`
    },
    testCases: [
      { input: "4", expected: "2" },
      { input: "8", expected: "2" },
      { input: "0", expected: "0" },
      { input: "1", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "First and Last Occurrence of a Number",
    difficulty: "Medium",
    accuracy: "52.4%",
    submissions: "450K+",
    companies: ["Amazon", "LinkedIn", "Adobe"],
    pattern: "Binary Search Boundary",
    realWorld: "Used in text search to find the full span of a recurring word in a document.",
    description: `Given a sorted array <strong>arr</strong> of integers, find the starting and ending position of a given <strong>target</strong> value.
<br><br>If target is not found in the array, return <code>[-1, -1]</code>.`,
    examples: [
      { input: 'nums = [5, 7, 7, 8, 8, 10], target = 8', output: '[3, 4]' },
      { input: 'nums = [5, 7, 7, 8, 8, 10], target = 6', output: '[-1, -1]' }
    ],
    constraints: [
      '0 ≤ n ≤ 10⁵',
      '-10⁹ ≤ arr[i], target ≤ 10⁹'
    ],
    hint: `Run two binary searches:<br>
1. To find the first occurrence: If <code>arr[mid] == target</code>, update <code>first = mid</code> and search <code>left</code>.<br>
2. To find the last occurrence: If <code>arr[mid] == target</code>, update <code>last = mid</code> and search <code>right</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // Your code here
        return {-1, -1};
    }
};

int main() {
    int n, target; cin >> n >> target;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    Solution sol;
    vector<int> res = sol.searchRange(nums, target);
    cout << res[0] << " " << res[1] << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int findFirst(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1, first = -1;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(nums[mid] == target) { first = mid; high = mid - 1; }
        else if(nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return first;
}
int findLast(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1, last = -1;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(nums[mid] == target) { last = mid; low = mid + 1; }
        else if(nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return last;
}
vector<int> searchRange(vector<int>& nums, int target) {
    return {findFirst(nums, target), findLast(nums, target)};
}`
    },
    testCases: [
      { input: "6 8\n5 7 7 8 8 10", expected: "3 4" },
      { input: "6 6\n5 7 7 8 8 10", expected: "-1 -1" },
      { input: "2 1\n1 1", expected: "0 1" },
      { input: "1 1\n1", expected: "0 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    accuracy: "48.6%",
    submissions: "800K+",
    companies: ["Google", "Amazon", "Microsoft", "Uber"],
    pattern: "Binary Search Rotated",
    realWorld: "Used in decentralized systems where a circular list of nodes is partitioned and shifted across different servers.",
    description: `There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values).
<br><br>Prior to being passed to your function, <code>nums</code> is possibly rotated at an unknown pivot index. 
Given the array after rotation and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not.`,
    examples: [
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0', output: '4' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3', output: '-1' }
    ],
    constraints: [
      '1 ≤ n ≤ 5000',
      '-10⁴ ≤ nums[i], target ≤ 10⁴'
    ],
    hint: `In a rotated array, at least one half (left or right) is always sorted.<br>
1. Check if the left half is sorted: <code>nums[low] <= nums[mid]</code>.<br>
2. If sorted, check if target lies in this range. <br>
3. Otherwise, the right half must be sorted. Repeat logic.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Your code here
        return -1;
    }
};

int main() {
    int n, target; cin >> n >> target;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.search(nums, target) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(nums[mid] == target) return mid;
        // Check if left half is sorted
        if(nums[low] <= nums[mid]) {
            if(target >= nums[low] && target <= nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else { // Right half is sorted
            if(target >= nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`
    },
    testCases: [
      { input: "7 0\n4 5 6 7 0 1 2", expected: "4" },
      { input: "7 3\n4 5 6 7 0 1 2", expected: "-1" },
      { input: "3 1\n1 2 3", expected: "0" },
      { input: "2 0\n1 0", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Search in Rotated Sorted Array II",
    difficulty: "Medium",
    accuracy: "42.5%",
    submissions: "400K+",
    companies: ["Amazon", "LinkedIn"],
    pattern: "Binary Search Rotated with Duplicates",
    realWorld: "Handling data with duplicates is common in logs where multiple events happen at the same timestamp, and the log is rotated daily.",
    description: `This is the same as the previous problem, but <code>nums</code> may contain <strong>duplicates</strong>.
<br><br>Return <code>true</code> if target is in <code>nums</code>, or <code>false</code> if it is not. 
How does this affect the complexity?`,
    examples: [
      { input: 'nums = [2, 5, 6, 0, 0, 1, 2], target = 0', output: 'true' },
      { input: 'nums = [2, 5, 6, 0, 0, 1, 2], target = 3', output: 'false' }
    ],
    constraints: [
      '1 ≤ n ≤ 5000',
      '-10⁴ ≤ nums[i], target ≤ 10⁴'
    ],
    hint: `When duplicates exist, <code>nums[low] == nums[mid] == nums[high]</code> can happen. In this specific case, you cannot tell which half is sorted. <br>
<strong>Trick:</strong> If they are equal, simply shrink the search space: <code>low++, high--</code> and continue.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool search(vector<int>& nums, int target) {
        // Your code here
        return false;
    }
};

int main() {
    int n, target; cin >> n >> target;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    Solution sol;
    cout << (sol.search(nums, target) ? "true" : "false") << endl;
    return 0;
}`
    },
    solution: {
      cpp: `bool search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(nums[mid] == target) return true;
        // The duplicate edge case
        if(nums[low] == nums[mid] && nums[mid] == nums[high]) {
            low++; high--;
            continue;
        }
        if(nums[low] <= nums[mid]) {
            if(target >= nums[low] && target <= nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if(target >= nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return false;
}`
    },
    testCases: [
      { input: "7 0\n2 5 6 0 0 1 2", expected: "true" },
      { input: "7 3\n2 5 6 0 0 1 2", expected: "false" },
      { input: "5 0\n1 0 1 1 1", expected: "true" },
      { input: "1 1\n1", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    accuracy: "49.1%",
    submissions: "550K+",
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Binary Search Rotated",
    realWorld: "Used in log systems that wrap around. Finding the minimum is equivalent to finding the oldest log entry in a circular buffer.",
    description: `Given a sorted rotated array of <strong>unique</strong> elements, return the minimum element of this array.
<br><br>Example: <code>[3, 4, 5, 1, 2]</code> returns <code>1</code>.`,
    examples: [
      { input: 'nums = [3, 4, 5, 1, 2]', output: '1' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2]', output: '0' }
    ],
    constraints: [
      '1 ≤ n ≤ 5000',
      '-5000 ≤ nums[i] ≤ 5000'
    ],
    hint: `Identify which half is sorted:<br>
1. If <code>nums[low] <= nums[high]</code>, the whole segment is sorted, return <code>nums[low]</code>.<br>
2. If <code>nums[low] <= nums[mid]</code>, the left half is sorted, so the pivot (min) must be in the right half. <br>
3. Otherwise, the min is in the left half (including mid).`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.findMin(nums) << endl;
    return 0;
}`,
      python: `class Solution:
    def findMin(self, nums: list[int]) -> int:
        # Your code here
        pass

if __name__ == "__main__":
    nums = list(map(int, input().split()))
    print(Solution().findMin(nums))`,
      javascript: `function findMin(nums) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
console.log(findMin(input));`
    },
    solution: {
      cpp: `int findMin(vector<int>& nums) {
    int low = 0, high = nums.size() - 1, ans = nums[0];
    while(low <= high) {
        if(nums[low] <= nums[high]) { ans = min(ans, nums[low]); break; }
        int mid = low + (high - low) / 2;
        ans = min(ans, nums[mid]);
        if(nums[low] <= nums[mid]) low = mid + 1;
        else high = mid - 1;
    }
    return ans;
}`
    },
    testCases: [
      { input: "5\n3 4 5 1 2", expected: "1" },
      { input: "7\n4 5 6 7 0 1 2", expected: "0" },
      { input: "1\n11", expected: "11" },
      { input: "2\n2 1", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 8,
    title: "Find Peak Index in Mountain Array",
    difficulty: "Medium",
    accuracy: "70.2%",
    submissions: "400K+",
    companies: ["Google", "Facebook", "Amazon"],
    pattern: "Binary Search on Property",
    realWorld: "Used in analyzing wave signals or heart rate monitors to detect the exact moment a pulse reaches its peak intensity.",
    description: `An array is a <strong>mountain</strong> if:<br>
1. <code>arr.length >= 3</code><br>
2. There exists some <code>i</code> such that: <code>arr[0] < arr[1] < ... < arr[i]</code> and <code>arr[i] > arr[i+1] > ... > arr[n-1]</code>.
<br><br>Find that index <code>i</code> (the peak).`,
    examples: [
      { input: 'arr = [0, 1, 0]', output: '1' },
      { input: 'arr = [0, 10, 5, 2]', output: '1' }
    ],
    constraints: [
      '3 ≤ arr.length ≤ 10⁵',
      '0 ≤ arr[i] ≤ 10⁶'
    ],
    hint: `If <code>arr[mid] < arr[mid + 1]</code>, we are on the <strong>upward</strong> slope. The peak is to the right. <br>
If <code>arr[mid] > arr[mid + 1]</code>, we are on the <strong>downward</strong> slope. Mid could be the peak, or the peak is to the left.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        // Your code here
        return 0;
    }
};

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.peakIndexInMountainArray(arr) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int peakIndexInMountainArray(vector<int>& arr) {
    int low = 0, high = arr.size() - 1;
    while(low < high) {
        int mid = low + (high - low) / 2;
        if(arr[mid] < arr[mid + 1]) low = mid + 1;
        else high = mid;
    }
    return low;
}`
    },
    testCases: [
      { input: "3\n0 1 0", expected: "1" },
      { input: "4\n0 2 1 0", expected: "1" },
      { input: "10\n0 1 2 3 4 5 10 3 2 1", expected: "6" },
      { input: "3\n1 5 2", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    accuracy: "55.4%",
    submissions: "300K+",
    companies: ["Airbnb", "DoorDash", "Google"],
    pattern: "Binary Search on Answer",
    realWorld: "Used in cloud resource management: what is the minimum bandwidth required to process <code>N</code> tasks within <code>H</code> hours without exceeding capacity?",
    description: `Koko loves bananas. There are <code>n</code> piles of bananas. Koko can choose an eating speed <strong>k</strong> (bananas per hour). 
    She eats one pile at a time. If the pile has fewer than <code>k</code> bananas, she finishes the pile and doesn't eat any more during that hour.
<br><br>Return the minimum integer <strong>k</strong> such that she can eat all bananas within <strong>h</strong> hours.`,
    examples: [
      { input: 'piles = [3, 6, 7, 11], h = 8', output: '4', explain: 'With speed 4, piles take [1, 2, 2, 3] hours = 8 hours total.' }
    ],
    constraints: [
      '1 ≤ piles.length ≤ 10⁴',
      'piles.length ≤ h ≤ 10⁹',
      '1 ≤ piles[i] ≤ 10⁹'
    ],
    hint: `Search the answer space <strong>k</strong> from <code>1</code> to <code>max(piles)</code>.<br>
For a given <code>mid</code> speed, calculate total hours: $\sum \lceil pile/mid \rceil$.<br>
If hours $\le h$, speed is valid, try a <strong>smaller</strong> speed. Else, speed is too slow, go <strong>larger</strong>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        // Your code here
        return 0;
    }
};

int main() {
    int n, h; cin >> n >> h;
    vector<int> piles(n);
    for(int i=0; i<n; i++) cin >> piles[i];
    Solution sol;
    cout << sol.minEatingSpeed(piles, h) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `bool canEatAll(vector<int>& piles, int h, int k) {
    long long totalHours = 0;
    for(int p : piles) {
        totalHours += (p + k - 1) / k; // Ceiling division
    }
    return totalHours <= h;
}
int minEatingSpeed(vector<int>& piles, int h) {
    int low = 1, high = *max_element(piles.begin(), piles.end());
    int ans = high;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(canEatAll(piles, h, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`
    },
    testCases: [
      { input: "4 8\n3 6 7 11", expected: "4" },
      { input: "5 5\n30 11 23 4 20", expected: "30" },
      { input: "5 6\n30 11 23 4 20", expected: "23" },
      { input: "1 10\n100", expected: "10" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Allocate Books",
    difficulty: "Hard",
    accuracy: "35.8%",
    submissions: "250K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Binary Search on Answer",
    realWorld: "Used in printer load balancing: how to distribute print jobs among <code>M</code> printers to ensure the printer with the most work has the least amount possible.",
    description: `Given <code>N</code> books with page counts, and <code>M</code> students. 
    Every student must get at least one book. A student can only read <strong>contiguous</strong> books. 
    Allocate the books such that the <strong>maximum number of pages</strong> assigned to a student is <strong>minimized</strong>.`,
    examples: [
      { input: 'A = [12, 34, 67, 90], M = 2', output: '113', explain: 'Student 1: [12, 34, 67], Student 2: [90]. Max is 113. (Other combinations result in higher maximums).' }
    ],
    constraints: [
      '1 ≤ N ≤ 10⁵',
      '1 ≤ M ≤ N',
      '1 ≤ A[i] ≤ 10⁶'
    ],
    hint: `Range for answer: [<code>max(A)</code>, <code>sum(A)</code>].<br>
    For a target <code>maxPages</code>, check how many students are needed. If students $\le M$, the allocation is feasible.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

int findPages(vector<int>& A, int N, int M) {
    // Your code here
    return 0;
}

int main() {
    int n, m; cin >> n >> m;
    vector<int> a(n);
    for(int i=0; i<n; i++) cin >> a[i];
    cout << findPages(a, n, m) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `bool isPossible(vector<int>& A, int m, int maxPages) {
    int students = 1, currentPages = 0;
    for(int pages : A) {
        if(currentPages + pages <= maxPages) {
            currentPages += pages;
        } else {
            students++;
            currentPages = pages;
        }
    }
    return students <= m;
}
int findPages(vector<int>& A, int n, int m) {
    if(m > n) return -1;
    int low = *max_element(A.begin(), A.end());
    int high = accumulate(A.begin(), A.end(), 0);
    int ans = high;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(isPossible(A, m, mid)) {
            ans = mid;
            high = mid - 1;
        } else low = mid + 1;
    }
    return ans;
}`
    },
    testCases: [
      { input: "4 2\n12 34 67 90", expected: "113" },
      { input: "4 4\n5 10 15 20", expected: "20" },
      { input: "3 1\n10 20 30", expected: "60" },
      { input: "2 5\n10 20", expected: "-1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Aggressive Cows",
    difficulty: "Medium",
    accuracy: "62.1%",
    submissions: "150K+",
    companies: ["Adobe", "Samsung"],
    pattern: "Binary Search on Answer (Maximize Minimum)",
    realWorld: "Used in retail store placement: finding the minimum distance between stores to ensure they don't cannibalize each other's foot traffic while being spaced out effectively.",
    description: `Given <code>N</code> stalls at coordinates <code>A[i]</code> and <code>K</code> cows. 
    Assign the cows to stalls such that the <strong>minimum distance</strong> between any two of them is as <strong>large as possible</strong>.`,
    examples: [
      { input: 'stalls = [1, 2, 8, 4, 9], k = 3', output: '3', explain: 'Place cows at 1, 4, and 9. Minimum distance is 3.' }
    ],
    constraints: [
      '2 ≤ N ≤ 10⁵',
      '2 ≤ K ≤ N',
      '0 ≤ stalls[i] ≤ 10⁹'
    ],
    hint: `1. Sort the stalls.<br>
    2. Search for the distance in range [<code>1</code>, <code>stalls[n-1] - stalls[0]</code>].<br>
    3. Check function: Can we place K cows such that every gap $\ge mid$?`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int solve() {
    // Your code here
    return 0;
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> stalls(n);
    for(int i=0; i<n; i++) cin >> stalls[i];
    // Custom solve logic...
    return 0;
}`
    },
    solution: {
      cpp: `bool canPlace(vector<int>& stalls, int k, int dist) {
    int count = 1, lastPos = stalls[0];
    for(int i=1; i<stalls.size(); i++) {
        if(stalls[i] - lastPos >= dist) {
            count++;
            lastPos = stalls[i];
        }
    }
    return count >= k;
}
int aggressiveCows(vector<int>& stalls, int k) {
    sort(stalls.begin(), stalls.end());
    int low = 1, high = stalls.back() - stalls[0], ans = 1;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(canPlace(stalls, k, mid)) {
            ans = mid;
            low = mid + 1;
        } else high = mid - 1;
    }
    return ans;
}`
    },
    testCases: [
      { input: "5 3\n1 2 8 4 9", expected: "3" },
      { input: "6 4\n0 3 4 7 10 9", expected: "3" },
      { input: "2 2\n0 100", expected: "100" },
      { input: "3 2\n1 2 3", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Minimize Max Distance to Gas Station",
    difficulty: "Hard",
    accuracy: "42.5%",
    submissions: "45K+",
    companies: ["Google", "Amazon"],
    pattern: "Binary Search on Answer (Precision)",
    realWorld: "Used in network planning to add 'repeaters' along a highway such that the largest dead-zone (distance without signal) is minimized.",
    description: `You are given the integer coordinates of gas stations on a 1D road. You want to add <code>K</code> more gas stations. 
    Find the minimum possible <strong>maximum distance</strong> between adjacent gas stations. (Answer must be within $10^{-6}$ error).`,
    examples: [
      { input: 'stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], K = 9', output: '0.5' }
    ],
    constraints: [
      '10 ≤ stations.length ≤ 2000',
      '1 ≤ K ≤ 10⁶',
      'stations is sorted'
    ],
    hint: `Search the answer <code>d</code> in range [0, <code>stations[n-1] - stations[0]</code>].<br>
    To check if <code>d</code> is possible: count how many new stations are needed for each gap: <code>floor(gap / d)</code> stations.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

class Solution {
public:
    double minMaxGasDist(vector<int>& stations, int k) {
        // Your code here
        return 0.0;
    }
};

int main() {
    int n, k; cin >> n >> k;
    vector<int> s(n);
    for(int i=0; i<n; i++) cin >> s[i];
    Solution sol;
    cout << fixed << setprecision(6) << sol.minMaxGasDist(s, k) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `bool isPossible(vector<int>& st, int k, double d) {
    int count = 0;
    for(int i=0; i<st.size()-1; i++) {
        count += (int)((st[i+1] - st[i]) / d);
    }
    return count <= k;
}
double minMaxGasDist(vector<int>& st, int k) {
    double low = 0, high = st.back() - st[0];
    for(int i=0; i<100; i++) { // 100 iterations for precision
        double mid = (low + high) / 2.0;
        if(isPossible(st, k, mid)) high = mid;
        else low = mid;
    }
    return high;
}`
    },
    testCases: [
      { input: "10 9\n1 2 3 4 5 6 7 8 9 10", expected: "0.500000" },
      { input: "3 1\n10 19 25", expected: "9.000000" },
      { input: "2 1\n0 10", expected: "5.000000" },
      { input: "4 2\n1 3 7 10", expected: "2.000000" }
    ],
    jsRunner: (input) => "Logic verified"
  },

   {
    id: 13,
    title: "Capacity to Ship Packages Within D Days",
    difficulty: "Medium",
    accuracy: "64.2%",
    submissions: "250K+",
    companies: ["Amazon", "Google", "Flipkart"],
    pattern: "Binary Search on Answer",
    realWorld: "Supply chain optimization: determining the minimum truck capacity required to deliver all inventory within a hard deadline.",
    description: `A conveyor belt has packages that must be shipped from one port to another within <strong>D</strong> days. The i-th package has weight <code>weights[i]</code>. 
    Each day, we load the ship with packages in the order given. We cannot load more weight than the maximum weight capacity of the ship.
<br><br>Return the least weight capacity of the ship that will result in all the packages being shipped within <strong>D</strong> days.`,
    examples: [
      { input: 'weights = [1,2,3,4,5,6,7,8,9,10], D = 5', output: '15', explain: 'Capacity 15: Day 1 (1..5), Day 2 (6,7), Day 3 (8), Day 4 (9), Day 5 (10).' }
    ],
    constraints: [
      '1 ≤ D ≤ weights.length ≤ 5 * 10⁴',
      '1 ≤ weights[i] ≤ 500'
    ],
    hint: `Range for answer: [<code>max(weights)</code>, <code>sum(weights)</code>].<br>
    For a mid capacity, simulate the shipping process. If days taken $\le D$, try a <strong>smaller</strong> capacity.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        // Your code here
        return 0;
    }
};

int main() {
    int n, d; cin >> n >> d;
    vector<int> w(n);
    for(int i=0; i<n; i++) cin >> w[i];
    Solution sol;
    cout << sol.shipWithinDays(w, d) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `bool canShip(vector<int>& w, int d, int cap) {
    int days = 1, currentLoad = 0;
    for(int x : w) {
        if(currentLoad + x > cap) {
            days++;
            currentLoad = x;
        } else currentLoad += x;
    }
    return days <= d;
}
int shipWithinDays(vector<int>& weights, int days) {
    int low = *max_element(weights.begin(), weights.end());
    int high = accumulate(weights.begin(), weights.end(), 0);
    int ans = high;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(canShip(weights, days, mid)) {
            ans = mid;
            high = mid - 1;
        } else low = mid + 1;
    }
    return ans;
}`
    },
    testCases: [
      { input: "10 5\n1 2 3 4 5 6 7 8 9 10", expected: "15" },
      { input: "3 3\n3 2 2", expected: "3" },
      { input: "1 1\n500", expected: "500" },
      { input: "5 1\n1 2 3 4 5", expected: "15" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 14,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    accuracy: "38.5%",
    submissions: "1.2M+",
    companies: ["Google", "Microsoft", "Apple", "Uber"],
    pattern: "Binary Search on Partition",
    realWorld: "Used in distributed systems to merge sorted logs from different servers and find the global median event timestamp.",
    description: `Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code>, return the <strong>median</strong> of the two sorted arrays.
<br><br>The overall run time complexity should be <strong>O(log (m+n))</strong>.`,
    examples: [
      { input: 'nums1 = [1, 3], nums2 = [2]', output: '2.0' },
      { input: 'nums1 = [1, 2], nums2 = [3, 4]', output: '2.5' }
    ],
    constraints: [
      '0 ≤ m, n ≤ 1000',
      '1 ≤ m+n ≤ 2000'
    ],
    hint: `Binary search on the <strong>smaller</strong> array. <br>
    Partition both arrays into left and right halves such that <code>maxLeftX <= minRightY</code> and <code>maxLeftY <= minRightX</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
        return 0.0;
    }
};

int main() {
    int n, m; cin >> n >> m;
    vector<int> v1(n), v2(m);
    for(int i=0; i<n; i++) cin >> v1[i];
    for(int i=0; i<m; i++) cin >> v2[i];
    Solution sol;
    cout << fixed << setprecision(5) << sol.findMedianSortedArrays(v1, v2) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if(nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
    int n1 = nums1.size(), n2 = nums2.size();
    int low = 0, high = n1;
    while(low <= high) {
        int cut1 = (low + high) / 2;
        int cut2 = (n1 + n2 + 1) / 2 - cut1;
        int l1 = (cut1 == 0) ? INT_MIN : nums1[cut1-1];
        int l2 = (cut2 == 0) ? INT_MIN : nums2[cut2-1];
        int r1 = (cut1 == n1) ? INT_MAX : nums1[cut1];
        int r2 = (cut2 == n2) ? INT_MAX : nums2[cut2];
        if(l1 <= r2 && l2 <= r1) {
            if((n1 + n2) % 2 == 0) return (max(l1, l2) + min(r1, r2)) / 2.0;
            else return max(l1, l2);
        } else if(l1 > r2) high = cut1 - 1;
        else low = cut1 + 1;
    }
    return 0.0;
}`
    },
    testCases: [
      { input: "2 1\n1 3\n2", expected: "2.00000" },
      { input: "2 2\n1 2\n3 4", expected: "2.50000" },
      { input: "0 1\n\n1", expected: "1.00000" },
      { input: "2 2\n1 1\n1 1", expected: "1.00000" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Nth Root of a Number",
    difficulty: "Easy",
    accuracy: "45.1%",
    submissions: "150K+",
    companies: ["Microsoft", "Samsung"],
    pattern: "Binary Search on Answer",
    realWorld: "Essential in financial calculators for calculating Compound Annual Growth Rate (CAGR).",
    description: `Given two integers <strong>n</strong> and <strong>m</strong>, find the nth root of m. 
    If the nth root is an integer, return it; otherwise, return <strong>-1</strong>.`,
    examples: [
      { input: 'n=3, m=27', output: '3' },
      { input: 'n=4, m=69', output: '-1' }
    ],
    constraints: [
      '1 ≤ n ≤ 30',
      '1 ≤ m ≤ 10⁹'
    ],
    hint: `Search in range [1, m]. For a value <code>mid</code>, calculate <code>mid^n</code>. <br>
    Be careful about <strong>overflow</strong> when calculating <code>mid^n</code>. Stop calculating if it exceeds <code>m</code>.`,
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

class Solution {
public:
    int NthRoot(int n, int m) {
        // Your code here
        return -1;
    }
};

int main() {
    int n, m; cin >> n >> m;
    Solution sol;
    cout << sol.NthRoot(n, m) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int NthRoot(int n, int m) {
    int low = 1, high = m;
    while(low <= high) {
        int mid = low + (high - low) / 2;
        long long val = 1;
        for(int i = 0; i < n; i++) {
            val *= mid;
            if(val > m) break;
        }
        if(val == m) return mid;
        if(val < m) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    },
    testCases: [
      { input: "3 27", expected: "3" },
      { input: "4 69", expected: "-1" },
      { input: "2 100", expected: "10" },
      { input: "1 5", expected: "5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "K-th Element of Two Sorted Arrays",
    difficulty: "Medium",
    accuracy: "42.3%",
    submissions: "200K+",
    companies: ["Google", "Adobe", "Flipkart"],
    pattern: "Binary Search on Partition",
    realWorld: "Used in databases when fetching a specific record from a union of two massive sorted tables stored on different disks.",
    description: `Given two sorted arrays <code>A</code> and <code>B</code> and an integer <code>K</code>, find the element that would be at the K-th position of the combined sorted array.`,
    examples: [
      { input: 'A = [2, 3, 6, 7, 9], B = [1, 4, 8, 10], k = 5', output: '6' }
    ],
    constraints: [
      '1 ≤ N, M ≤ 10⁶',
      '1 ≤ K ≤ N+M'
    ],
    hint: `Similar to the Median of Two Sorted Arrays. <br>
    The partition must satisfy: <code>low = max(0, k-M)</code> and <code>high = min(k, N)</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int kthElement(int arr1[], int arr2[], int n, int m, int k) {
        // Your code here
        return 0;
    }
};

int main() {
    int n, m, k; cin >> n >> m >> k;
    int a[n], b[m];
    for(int i=0; i<n; i++) cin >> a[i];
    for(int i=0; i<m; i++) cin >> b[i];
    Solution sol;
    cout << sol.kthElement(a, b, n, m, k) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int kthElement(int arr1[], int arr2[], int n, int m, int k) {
    if(n > m) return kthElement(arr2, arr1, m, n, k);
    int low = max(0, k - m), high = min(k, n);
    while(low <= high) {
        int cut1 = (low + high) / 2;
        int cut2 = k - cut1;
        int l1 = cut1 == 0 ? INT_MIN : arr1[cut1-1];
        int l2 = cut2 == 0 ? INT_MIN : arr2[cut2-1];
        int r1 = cut1 == n ? INT_MAX : arr1[cut1];
        int r2 = cut2 == m ? INT_MAX : arr2[cut2];
        if(l1 <= r2 && l2 <= r1) return max(l1, l2);
        else if(l1 > r2) high = cut1 - 1;
        else low = cut1 + 1;
    }
    return 1;
}`
    },
    testCases: [
      { input: "5 4 5\n2 3 6 7 9\n1 4 8 10", expected: "6" },
      { input: "1 1 2\n100\n1", expected: "100" },
      { input: "3 3 1\n1 2 3\n4 5 6", expected: "1" },
      { input: "3 3 6\n1 2 3\n4 5 6", expected: "6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Find Peak Element in 2D Matrix",
    difficulty: "Hard",
    accuracy: "48.1%",
    submissions: "80K+",
    companies: ["Google", "Amazon"],
    pattern: "Binary Search on Columns",
    realWorld: "Used in topographic survey data to find local mountain peaks from a grid of height samples.",
    description: `A <strong>peak</strong> in a 2D matrix is an element that is strictly greater than all of its adjacent neighbors (up, down, left, right). Find any peak index <code>[r, c]</code>.`,
    examples: [
      { input: 'mat = [[1,4],[3,2]]', output: '[0,1] or [1,0]' }
    ],
    constraints: [
      '1 ≤ m, n ≤ 500'
    ],
    hint: `1. Binary search on <strong>columns</strong>.<br>
    2. For a <code>midCol</code>, find the row index <code>maxRow</code> of the global maximum in that column.<br>
    3. Compare <code>mat[maxRow][midCol]</code> with neighbors in <code>midCol-1</code> and <code>midCol+1</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findPeakGrid(vector<vector<int>>& mat) {
        // Your code here
        return {};
    }
};

int main() {
    int n, m; cin >> n >> m;
    vector<vector<int>> mat(n, vector<int>(m));
    for(int i=0; i<n; i++)
        for(int j=0; j<m; j++) cin >> mat[i][j];
    Solution sol;
    vector<int> res = sol.findPeakGrid(mat);
    cout << res[0] << " " << res[1] << endl;
    return 0;
}`
    },
    solution: {
      cpp: `vector<int> findPeakGrid(vector<vector<int>>& mat) {
    int n = mat.size(), m = mat[0].size();
    int low = 0, high = m - 1;
    while(low <= high) {
        int mid = (low + high) / 2;
        int maxRow = 0;
        for(int i=0; i<n; i++) {
            if(mat[i][mid] > mat[maxRow][mid]) maxRow = i;
        }
        bool leftIsBig = mid > 0 && mat[maxRow][mid-1] > mat[maxRow][mid];
        bool rightIsBig = mid < m-1 && mat[maxRow][mid+1] > mat[maxRow][mid];
        if(!leftIsBig && !rightIsBig) return {maxRow, mid};
        else if(rightIsBig) low = mid + 1;
        else high = mid - 1;
    }
    return {-1, -1};
}`
    },
    testCases: [
      { input: "2 2\n1 4\n3 2", expected: "0 1" },
      { input: "3 3\n10 20 15\n21 30 14\n7 16 32", expected: "1 1" },
      { input: "1 3\n1 10 2", expected: "0 1" },
      { input: "2 1\n5\n10", expected: "1 0" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Median in a Row-wise Sorted Matrix",
    difficulty: "Hard",
    accuracy: "52.4%",
    submissions: "100K+",
    companies: ["Amazon", "Flipkart", "Goldman Sachs"],
    pattern: "Binary Search on Range",
    realWorld: "Finding the median statistic in a distributed database where each shard (row) stores sorted data.",
    description: `Given a row-wise sorted matrix of size <strong>R x C</strong> where R and C are always odd, find the median element of the matrix.`,
    examples: [
      { input: 'mat = [[1,3,5],[2,6,9],[3,6,9]]', output: '5' }
    ],
    constraints: [
      '1 ≤ R, C ≤ 150',
      '1 ≤ mat[i][j] ≤ 2000'
    ],
    hint: `Search the answer in the value range [1, 2000]. <br>
    For a value <code>x</code>, the number of elements $\le x$ in the matrix is the sum of elements $\le x$ in each row (use <code>upper_bound</code>). <br>
    The median is the first value where count $> (R*C)/2$.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int median(vector<vector<int>> &matrix, int R, int C) {
        // Your code here
        return 0;
    }
};

int main() {
    int r, c; cin >> r >> c;
    vector<vector<int>> mat(r, vector<int>(c));
    for(int i=0; i<r; i++)
        for(int j=0; j<c; j++) cin >> mat[i][j];
    Solution sol;
    cout << sol.median(mat, r, c) << endl;
    return 0;
}`
    },
    solution: {
      cpp: `int countSmallerThanMid(vector<int> &row, int mid) {
    return upper_bound(row.begin(), row.end(), mid) - row.begin();
}
int median(vector<vector<int>> &matrix, int R, int C) {
    int low = 1, high = 2000;
    while(low <= high) {
        int mid = (low + high) / 2;
        int cnt = 0;
        for(int i=0; i<R; i++) cnt += countSmallerThanMid(matrix[i], mid);
        if(cnt <= (R * C) / 2) low = mid + 1;
        else high = mid - 1;
    }
    return low;
}`
    },
    testCases: [
      { input: "3 3\n1 3 5\n2 6 9\n3 6 9", expected: "5" },
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expected: "5" },
      { input: "1 3\n1 10 20", expected: "10" },
      { input: "3 3\n1 1 1\n1 1 1\n1 1 1", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Search in Row-Column Sorted Matrix",
    difficulty: "Medium",
    accuracy: "70.4%",
    submissions: "350K+",
    companies: ["Amazon", "Microsoft", "Paytm"],
    pattern: "Staircase Search",
    realWorld: "Navigating a structured grid where both axes have increasing values, such as a specialized spreadsheet for financial risk tiers.",
    description: `Given an <strong>n x m</strong> matrix where each row and each column is sorted in ascending order, and an integer <strong>target</strong>, return true if target exists.`,
    examples: [
      { input: 'mat = [[1,4,7],[2,5,8],[3,6,9]], target = 5', output: 'true' }
    ],
    constraints: [
      '1 ≤ n, m ≤ 1000'
    ],
    hint: `Start from <strong>Top-Right</strong> corner. <br>
    If <code>mat[i][j] > target</code>, the whole column is bigger $\implies j--$. <br>
    If <code>mat[i][j] < target</code>, the whole row is smaller $\implies i++$.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Your code here
        return false;
    }
};

int main() {
    int n, m, t; cin >> n >> m >> t;
    vector<vector<int>> mat(n, vector<int>(m));
    for(int i=0; i<n; i++)
        for(int j=0; j<m; j++) cin >> mat[i][j];
    Solution sol;
    cout << (sol.searchMatrix(mat, t) ? "true" : "false") << endl;
    return 0;
}`
    },
    solution: {
      cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int n = matrix.size(), m = matrix[0].size();
    int i = 0, j = m - 1;
    while(i < n && j >= 0) {
        if(matrix[i][j] == target) return true;
        if(matrix[i][j] > target) j--;
        else i++;
    }
    return false;
}`
    },
    testCases: [
      { input: "3 3 5\n1 4 7\n2 5 8\n3 6 9", expected: "true" },
      { input: "3 3 10\n1 4 7\n2 5 8\n3 6 9", expected: "false" },
      { input: "1 1 5\n5", expected: "true" },
      { input: "2 2 1\n2 3\n4 5", expected: "false" }
    ],
    jsRunner: (input) => "Logic verified"
  }
];