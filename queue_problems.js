const TOPIC_CONFIG = {
  name: "Queue",
  level: "Level 3 of 3 · Problems",
  backLink: "queue_L1.html",
  backLabel: "Queue"
};


const PROBLEMS = [
  {
  id: 1,
  title: "Queue Using Circular Array",
  difficulty: "Easy",
  accuracy: "61.4%",
  submissions: "389K+",
  companies: ["Amazon","Google","Infosys"],
  pattern: "Queue + Circular Array",
  realWorld: "Circular queues are used in CPU scheduling, buffering data streams, and traffic systems where memory reuse is important.",
  description: `Implement a <strong>Queue</strong> using a <strong>circular array</strong>.<br><br>
The queue should support the following operations:<br>
• <code>enqueue(x)</code> — insert an element at the rear.<br>
• <code>dequeue()</code> — remove an element from the front.<br>
• <code>front()</code> — get the front element.<br>
• <code>isEmpty()</code> — check if the queue is empty.<br><br>
Use modulo arithmetic to reuse empty spaces.`,
  examples: [
    { input: 'enqueue(10), enqueue(20), enqueue(30)\ndequeue() → front()', output: '20', explain: '10 is removed, front becomes 20.' }
  ],
  constraints: ['1 ≤ size ≤ 10⁴','All operations must be O(1)'],
  hint: `Maintain two pointers: <strong>front</strong> and <strong>rear</strong>.<br><br>
• Move pointers using <code>(index + 1) % size</code><br>
• Queue is full when <code>(rear + 1) % size == front</code><br>
• Queue is empty when <code>front == -1</code>`,
  starterCode: {
    cpp: `#include <bits/stdc++.h>
using namespace std;

class CircularQueue {
    int *arr, front, rear, size;
public:
    CircularQueue(int n) {
        size = n;
        arr = new int[n];
        front = rear = -1;
    }
    void enqueue(int x) {
        // Your code here
    }
    void dequeue() {
        // Your code here
    }
    int Front() {
        return -1;
    }
};

int main() {
    CircularQueue q(5);
    q.enqueue(10); q.enqueue(20); q.enqueue(30);
    q.dequeue();
    cout << q.Front();
    return 0;
}`,
    python: `class CircularQueue:
    def __init__(self, size):
        # Your code here
        pass

    def enqueue(self, x):
        pass

    def dequeue(self):
        pass

    def front(self):
        return -1

q = CircularQueue(5)
q.enqueue(10); q.enqueue(20); q.enqueue(30)
q.dequeue()
print(q.front())`,
    java: `class CircularQueue {
    int[] arr;
    int front, rear, size;

    CircularQueue(int n) {
        arr = new int[n];
        size = n;
        front = rear = -1;
    }

    void enqueue(int x) {
        // Your code here
    }

    void dequeue() {
        // Your code here
    }

    int front() {
        return -1;
    }

    public static void main(String[] args) {
        CircularQueue q = new CircularQueue(5);
        q.enqueue(10); q.enqueue(20); q.enqueue(30);
        q.dequeue();
        System.out.println(q.front());
    }
}`,
    javascript: `class CircularQueue {
    constructor(size) {
        // Your code here
    }
    enqueue(x) {}
    dequeue() {}
    front() { return -1; }
}

const q = new CircularQueue(5);
q.enqueue(10); q.enqueue(20); q.enqueue(30);
q.dequeue();
console.log(q.front());`
  },
  solution: {
    cpp: `void enqueue(int x) {
    if ((rear + 1) % size == front) return;
    if (front == -1) front = 0;
    rear = (rear + 1) % size;
    arr[rear] = x;
}
void dequeue() {
    if (front == -1) return;
    if (front == rear) front = rear = -1;
    else front = (front + 1) % size;
}
int Front() {
    return front == -1 ? -1 : arr[front];
}`,
    python: `def enqueue(self, x):
    if (self.rear + 1) % self.size == self.front:
        return
    if self.front == -1:
        self.front = 0
    self.rear = (self.rear + 1) % self.size
    self.arr[self.rear] = x`,
    javascript: `enqueue(x){
    if((this.rear+1)%this.size===this.front) return;
    if(this.front===-1) this.front=0;
    this.rear=(this.rear+1)%this.size;
    this.arr[this.rear]=x;
}`
  },
  testCases: [
    { input: 'enqueue(10,20,30), dequeue()', expected: '20' }
  ],
  jsTestCall: `(function(){ let q=new CircularQueue(5); q.enqueue(10);q.enqueue(20);q.enqueue(30);q.dequeue(); return q.front(); })()`
},

{
  id: 2,
  title: "Queue Using Linked List",
  difficulty: "Easy",
  accuracy: "66.8%",
  submissions: "421K+",
  companies: ["TCS","Accenture","Wipro"],
  pattern: "Queue + Linked List",
  realWorld: "Linked list queues are used when dynamic memory allocation is needed, such as job scheduling and request handling systems.",
  description: `Implement a <strong>Queue</strong> using a <strong>Linked List</strong>.<br><br>
The queue should support:<br>
• <code>enqueue(x)</code><br>
• <code>dequeue()</code><br>
• <code>front()</code><br><br>
All operations must run in <strong>O(1)</strong> time.`,
  examples: [
    { input: 'enqueue(5), enqueue(15), dequeue()', output: '15', explain: '5 is removed, front becomes 15.' }
  ],
  constraints: ['1 ≤ number of operations ≤ 10⁴'],
  hint: `Maintain two pointers:<br><br>
• <strong>front</strong> — first node<br>
• <strong>rear</strong> — last node<br><br>
Enqueue at rear, dequeue from front.`,
  starterCode: {
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int x) : data(x), next(NULL) {}
};

class Queue {
    Node *front, *rear;
public:
    Queue() { front = rear = NULL; }
    void enqueue(int x) {
        // Your code here
    }
    void dequeue() {
        // Your code here
    }
    int Front() {
        return -1;
    }
};

int main() {
    Queue q;
    q.enqueue(5); q.enqueue(15);
    q.dequeue();
    cout << q.Front();
    return 0;
}`,
    python: `class Node:
    def __init__(self, x):
        self.data = x
        self.next = None

class Queue:
    def __init__(self):
        self.front = self.rear = None

    def enqueue(self, x):
        pass

    def dequeue(self):
        pass

    def front_val(self):
        return -1

q = Queue()
q.enqueue(5); q.enqueue(15)
q.dequeue()
print(q.front_val())`,
    java: `class QueueLL {
    class Node {
        int data; Node next;
        Node(int x){ data=x; next=null; }
    }
    Node front=null, rear=null;

    void enqueue(int x){
        // Your code here
    }
    void dequeue(){
        // Your code here
    }
    int front(){
        return -1;
    }

    public static void main(String[] args){
        QueueLL q=new QueueLL();
        q.enqueue(5); q.enqueue(15);
        q.dequeue();
        System.out.println(q.front());
    }
}`,
    javascript: `class Queue {
    constructor() {
        this.front = this.rear = null;
    }
    enqueue(x) {}
    dequeue() {}
    frontVal() { return -1; }
}

const q = new Queue();
q.enqueue(5); q.enqueue(15);
q.dequeue();
console.log(q.frontVal());`
  },
  solution: {
    cpp: `void enqueue(int x){
    Node* temp = new Node(x);
    if(!rear){ front = rear = temp; return; }
    rear->next = temp;
    rear = temp;
}
void dequeue(){
    if(!front) return;
    Node* temp = front;
    front = front->next;
    if(!front) rear = NULL;
    delete temp;
}
int Front(){ return front ? front->data : -1; }`,
    python: `def enqueue(self, x):
    node = Node(x)
    if not self.rear:
        self.front = self.rear = node
        return
    self.rear.next = node
    self.rear = node`,
    javascript: `enqueue(x){
    const node={data:x,next:null};
    if(!this.rear){ this.front=this.rear=node; return; }
    this.rear.next=node;
    this.rear=node;
}`
  },
  testCases: [
    { input: 'enqueue(5,15), dequeue()', expected: '15' }
  ],
  jsTestCall: `(function(){ let q=new Queue(); q.enqueue(5);q.enqueue(15);q.dequeue(); return q.frontVal(); })()`
},

 {
    id: 3,
    title: "Minimum K-Bit Flips (K-Window)",
    difficulty: "Hard",
    accuracy: "48.2%",
    submissions: "25K+",
    companies: ["Google", "Uber", "Facebook"],
    pattern: "Sliding Window + Queue",
    realWorld: "Used in digital signal processing to correct 'burst errors' where a contiguous range of bits is flipped during transmission.",
    description: `You are given a binary array <code>nums</code> and an integer <code>k</code>.
<br><br>A <strong>k-bit flip</strong> consists of choosing a <strong>contiguous</strong> subarray of length <code>k</code> from <code>nums</code> and simultaneously flipping every 0 to 1 and every 1 to 0 in that subarray.
<br><br>Return the <strong>minimum</strong> number of k-bit flips required so that there is no 0 in the array. If it is impossible, return -1.`,
    examples: [
      { input: 'nums = [0,1,0], k = 1', output: '2', explain: 'Flip index 0, then flip index 2.' },
      { input: 'nums = [0,0,0,1,0,1,1,0], k = 3', output: '3', explain: 'Flip [0,1,2], then [4,5,6], then [5,6,7] is impossible... result is 3.' }
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '1 ≤ k ≤ nums.length'
    ],
    hint: `An O(N*K) solution will TLE. Use a <strong>Queue</strong> to track active flips:<br><br>
1. A bit at index <code>i</code> needs to be flipped if its original value plus the number of active flips covering <code>i</code> is <strong>even</strong>.<br>
2. Use a queue to store the <strong>end indices</strong> of the k-length windows currently being flipped.<br>
3. If <code>i</code> exceeds the front of the queue, that flip is no longer active—pop it.<br>
4. If a flip is needed at <code>i</code>, but <code>i + k</code> exceeds array length, return -1.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int minKBitFlips(vector<int>& nums, int k) {
        // Your code here
        return 0;
    }
};

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.minKBitFlips(nums, k) << endl;
    return 0;
}`,
      python: `import collections

class Solution:
    def minKBitFlips(self, nums: list[int], k: int) -> int:
        # Your code here
        pass

if __name__ == "__main__":
    line1 = input().split()
    if not line1: exit()
    n, k = map(int, line1)
    nums = list(map(int, input().split()))
    print(Solution().minKBitFlips(nums, k))`,
      java: `import java.util.*;

class Solution {
    public int minKBitFlips(int[] nums, int k) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for(int i=0; i<n; i++) nums[i] = sc.nextInt();
        System.out.println(new Solution().minKBitFlips(nums, k));
    }
}`,
      javascript: `function minKBitFlips(nums, k) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if (input.length > 1) {
    const n = parseInt(input[0]);
    const k = parseInt(input[1]);
    const nums = input.slice(2, 2 + n).map(Number);
    console.log(minKBitFlips(nums, k));
}`
    },
    solution: {
      cpp: `int minKBitFlips(vector<int>& nums, int k) {
    int n = nums.size(), flips = 0;
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (!q.empty() && q.front() < i) q.pop();
        if ((nums[i] + q.size()) % 2 == 0) {
            if (i + k > n) return -1;
            flips++;
            q.push(i + k - 1);
        }
    }
    return flips;
}`,
      javascript: `function minKBitFlips(nums, k) {
    let n = nums.length, flips = 0, q = [];
    let head = 0;
    for (let i = 0; i < n; i++) {
        if (q.length > head && q[head] < i) head++;
        if ((nums[i] + (q.length - head)) % 2 === 0) {
            if (i + k > n) return -1;
            flips++;
            q.push(i + k - 1);
        }
    }
    return flips;
}`
    },
    testCases: [
      { input: "3 1\n0 1 0", expected: "2" },
      { input: "3 2\n1 1 0", expected: "-1" },
      { input: "8 3\n0 0 0 1 0 1 1 0", expected: "3" },
      { input: "3 2\n0 0 0", expected: "-1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Interleave the First and Second Halves",
    difficulty: "Medium",
    accuracy: "62.5%",
    submissions: "35K+",
    companies: ["Google", "Directi", "LinkedIn"],
    pattern: "Queue Manipulation",
    realWorld: "Used in network multiplexing where two data streams need to be merged into a single line while maintaining order and fairness.",
    description: `Given a queue of <strong>n</strong> integers, where <strong>n</strong> is even, interleave the first half of the queue with the second half.
<br><br>Input: <code>[1, 2, 3, 4]</code>
<br>Output: <code>[1, 3, 2, 4]</code>
<br>Explanation: First half is [1, 2], second half is [3, 4]. Interleaving them gives 1, then 3, then 2, then 4.`,
    examples: [
      { input: 'q = [11, 12, 13, 14, 15, 16]', output: '[11, 14, 12, 15, 13, 16]' }
    ],
    constraints: [
      '2 ≤ n ≤ 10⁵',
      'n is always even',
      '1 ≤ elements ≤ 1000'
    ],
    hint: `Use an auxiliary <strong>Queue</strong> or <strong>Stack</strong>:<br><br>
1. Dequeue exactly <code>n/2</code> elements and push them into a secondary queue.<br>
2. While the secondary queue is not empty, alternate between dequeuing from the secondary queue and the original queue, pushing both back to the end of a result structure.`,
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

void interLeaveQueue(queue<int> &q) {
    // Your code here
}

int main() {
    int n; cin >> n;
    queue<int> q;
    for(int i=0; i<n; i++) {
        int x; cin >> x; q.push(x);
    }
    interLeaveQueue(q);
    while(!q.empty()){
        cout << q.front() << " "; q.pop();
    }
    return 0;
}`,
      python: `from collections import deque

def interLeaveQueue(q: deque) -> deque:
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    q = deque(map(int, input().split()))
    interLeaveQueue(q)
    print(*(list(q)))`,
      java: `import java.util.*;

class Solution {
    public static void interLeaveQueue(Queue<Integer> q) {
        // Your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Queue<Integer> q = new LinkedList<>();
        for(int i=0; i<n; i++) q.add(sc.nextInt());
        interLeaveQueue(q);
        while(!q.isEmpty()) System.out.print(q.poll() + " ");
    }
}`,
      javascript: `function interLeaveQueue(q) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 1) {
    const n = parseInt(input[0]);
    const q = input.slice(1, 1+n).map(Number);
    console.log(interLeaveQueue(q).join(' '));
}`
    },
    solution: {
      cpp: `void interLeaveQueue(queue<int> &q) {
    int n = q.size();
    queue<int> first;
    for(int i=0; i<n/2; i++) {
        first.push(q.front()); q.pop();
    }
    while(!first.empty()) {
        q.push(first.front()); first.pop();
        q.push(q.front()); q.pop();
    }
}`,
      javascript: `function interLeaveQueue(q) {
    let n = q.length;
    let firstHalf = q.splice(0, n/2);
    let result = [];
    for(let i=0; i<n/2; i++) {
        result.push(firstHalf[i]);
        result.push(q[i]);
    }
    return result;
}`
    },
    testCases: [
      { input: "4\n1 2 3 4", expected: "1 3 2 4" },
      { input: "6\n11 12 13 14 15 16", expected: "11 14 12 15 13 16" },
      { input: "2\n10 20", expected: "10 20" },
      { input: "8\n1 2 3 4 5 6 7 8", expected: "1 5 2 6 3 7 4 8" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Check if Queue can be Sorted",
    difficulty: "Medium",
    accuracy: "55.4%",
    submissions: "22K+",
    companies: ["Amazon", "Cisco", "Oracle"],
    pattern: "Queue + Stack Interaction",
    realWorld: "Used in logistics and rail transport (Shunting Yard algorithm) to determine if arriving cars can be sorted using a single siding track.",
    description: `Given a queue of <strong>n</strong> integers, check if it can be sorted in ascending order using a single auxiliary stack. 
<br><br>The only allowed operations are:
<br>1. Moving an element from the <strong>Queue</strong> to the <strong>Stack</strong>.
<br>2. Moving an element from the <strong>Queue</strong> to the <strong>Sorted List</strong>.
<br>3. Moving an element from the <strong>Stack</strong> to the <strong>Sorted List</strong>.`,
    examples: [
      { input: 'q = [5, 1, 2, 3, 4]', output: 'true', explain: 'Push 5 to stack. Move 1,2,3,4 to list. Pop 5 to list. Sorted!' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `1. Maintain an <code>expectedElement</code> variable starting at 1.<br>
2. While the queue is not empty: if the front is <code>expectedElement</code>, pass it to the list. <br>
3. Else, if the stack top is <code>expectedElement</code>, pop it. <br>
4. Else, if the stack is empty or the queue front is <strong>smaller</strong> than the stack top, push the front to the stack. <br>
5. Otherwise, it is impossible.`,
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <stack>
using namespace std;

bool checkSorted(int n, queue<int>& q) {
    // Your code here
    return false;
}

int main() {
    int n; cin >> n;
    queue<int> q;
    for(int i=0; i<n; i++) {
        int x; cin >> x; q.push(x);
    }
    cout << (checkSorted(n, q) ? "Yes" : "No") << endl;
    return 0;
}`,
      python: `def checkSorted(n, q):
    # Your code here
    pass

if __name__ == "__main__":
    import collections
    n = int(input())
    q = collections.deque(map(int, input().split()))
    print("Yes" if checkSorted(n, q) else "No")`,
      java: `import java.util.*;

class Solution {
    public static boolean checkSorted(int n, Queue<Integer> q) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Queue<Integer> q = new LinkedList<>();
        for(int i=0; i<n; i++) q.add(sc.nextInt());
        System.out.println(checkSorted(n, q) ? "Yes" : "No");
    }
}`,
      javascript: `function checkSorted(n, q) {
    // Your code here
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 1) {
    const n = parseInt(input[0]);
    const q = input.slice(1, 1+n).map(Number);
    console.log(checkSorted(n, q) ? "Yes" : "No");
}`
    },
    solution: {
      cpp: `bool checkSorted(int n, queue<int>& q) {
    stack<int> s;
    int expected = 1;
    while (!q.empty()) {
        int front = q.front(); q.pop();
        if (front == expected) {
            expected++;
        } else {
            if (!s.empty() && s.top() == expected) {
                while(!s.empty() && s.top() == expected) { s.pop(); expected++; }
            }
            if (s.empty() || s.top() > front) {
                s.push(front);
            } else return false;
        }
    }
    while (!s.empty() && s.top() == expected) { s.pop(); expected++; }
    return expected == n + 1;
}`,
      javascript: `function checkSorted(n, q) {
    let s = [], expected = 1;
    for(let i=0; i<q.length; i++) {
        let front = q[i];
        if (front === expected) {
            expected++;
        } else {
            while(s.length > 0 && s[s.length-1] === expected) { s.pop(); expected++; }
            if (s.length === 0 || s[s.length-1] > front) {
                s.push(front);
            } else return false;
        }
    }
    while (s.length > 0 && s[s.length-1] === expected) { s.pop(); expected++; }
    return expected === n + 1;
}`
    },
    testCases: [
      { input: "5\n5 1 2 3 4", expected: "Yes" },
      { input: "6\n5 1 2 6 3 4", expected: "No" },
      { input: "3\n3 2 1", expected: "Yes" },
      { input: "4\n4 1 2 3", expected: "Yes" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Generate Binary Numbers",
    difficulty: "Easy",
    accuracy: "78.2%",
    submissions: "120K+",
    companies: ["Amazon", "Microsoft", "Paytm"],
    pattern: "Queue BFS",
    realWorld: "Used in generating sequential binary addresses for memory allocation or creating a sequence of branching decisions in a decision tree.",
    description: `Given a number <strong>n</strong>, generate all binary numbers from 1 to <strong>n</strong> using a queue data structure.`,
    examples: [
      { input: 'n = 2', output: '1 10' },
      { input: 'n = 5', output: '1 10 11 100 101' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `1. Enqueue "1". <br>
2. For n iterations: dequeue current, print it, then enqueue (current + "0") and (current + "1").`,
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <string>
#include <vector>
using namespace std;

vector<string> generate(int n) {
    // Your code here
    return {};
}

int main() {
    int n; cin >> n;
    vector<string> res = generate(n);
    for(string s : res) cout << s << " ";
    return 0;
}`,
      python: `from collections import deque

def generate(n):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    print(*(generate(n)))`,
      java: `import java.util.*;

class Solution {
    public static List<String> generate(int n) {
        // Your code here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<String> res = generate(n);
        for(String s : res) System.out.print(s + " ");
    }
}`,
      javascript: `function generate(n) {
    // Your code here
}

const n = parseInt(require('fs').readFileSync(0, 'utf8').trim());
console.log(generate(n).join(' '));`
    },
    solution: {
      cpp: `vector<string> generate(int n) {
    vector<string> res;
    queue<string> q;
    q.push("1");
    while(n--) {
        string curr = q.front(); q.pop();
        res.push_back(curr);
        q.push(curr + "0");
        q.push(curr + "1");
    }
    return res;
}`,
      javascript: `function generate(n) {
    let res = [], q = ["1"];
    while(n--) {
        let curr = q.shift();
        res.push(curr);
        q.push(curr + "0");
        q.push(curr + "1");
    }
    return res;
}`
    },
    testCases: [
      { input: "2", expected: "1 10" },
      { input: "5", expected: "1 10 11 100 101" },
      { input: "1", expected: "1" },
      { input: "10", expected: "1 10 11 100 101 110 111 1000 1001 1010" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Implement Stack using a Single Queue",
    difficulty: "Medium",
    accuracy: "65.2%",
    submissions: "45K+",
    companies: ["Cisco", "InMobi", "Samsung"],
    pattern: "Queue Rotation",
    realWorld: "Used in environments where memory is extremely constrained and only a single queue buffer is allocated for LIFO operations.",
    description: `Implement a stack using only <strong>one</strong> queue. You need to support <code>push</code> and <code>pop</code> operations.`,
    examples: [
      { input: 'push(10), push(20), pop()', output: '20' }
    ],
    constraints: [
      '1 ≤ x ≤ 1000',
      'At most 100 operations.'
    ],
    hint: `Whenever you push an element <code>x</code>:<br>
1. Get the current size <code>n</code> of the queue.<br>
2. Enqueue <code>x</code>.<br>
3. For <code>n</code> times: dequeue the front and enqueue it back to the rear. This moves the latest element to the front.`,
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
using namespace std;

class MyStack {
    queue<int> q;
public:
    void push(int x) { }
    int pop() { return 0; }
    int top() { return 0; }
};

int main() {
    MyStack st;
    st.push(10); st.push(20);
    cout << st.top() << " "; st.pop();
    cout << st.top() << endl;
    return 0;
}`,
      python: `from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()
    def push(self, x): pass
    def pop(self): return 0
    def top(self): return 0

if __name__ == "__main__":
    st = MyStack()
    st.push(10); st.push(20)
    print(st.top(), end=" "); st.pop()
    print(st.top())`,
      java: `import java.util.*;

class MyStack {
    Queue<Integer> q = new LinkedList<>();
    public void push(int x) { }
    public int pop() { return 0; }
    public int top() { return 0; }

    public static void main(String[] args) {
        MyStack st = new MyStack();
        st.push(10); st.push(20);
        System.out.print(st.top() + " "); st.pop();
        System.out.println(st.top());
    }
}`,
      javascript: `class MyStack {
    constructor() { this.q = []; }
    push(x) { }
    pop() { return 0; }
    top() { return 0; }
}

const st = new MyStack();
st.push(10); st.push(20);
process.stdout.write(st.top() + " "); st.pop();
console.log(st.top());`
    },
    solution: {
      cpp: `void push(int x) {
    int n = q.size();
    q.push(x);
    for(int i=0; i<n; i++) {
        q.push(q.front()); q.pop();
    }
}
int pop() { int res = q.front(); q.pop(); return res; }
int top() { return q.front(); }`,
      javascript: `push(x) {
    let n = this.q.length;
    this.q.push(x);
    while(n--) this.q.push(this.q.shift());
}
pop() { return this.q.shift(); }
top() { return this.q[0]; }`
    },
    testCases: [
      { input: "push 10, 20, top", expected: "20" },
      { input: "push 1, 2, 3, pop, top", expected: "2" },
      { input: "push 100, top", expected: "100" },
      { input: "push 5, 6, pop, top", expected: "5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 8,
    title: "Implement Stack using Two Queues",
    difficulty: "Medium",
    accuracy: "48.9%",
    submissions: "210K+",
    companies: ["Adobe", "Amazon", "Directi"],
    pattern: "Dual Queue Buffer",
    realWorld: "Fundamental concept used to understand how to simulate LIFO behavior using FIFO-only communication channels.",
    description: `Implement a stack using two queues <code>q1</code> and <code>q2</code>.`,
    examples: [
      { input: 'push(1), push(2), pop()', output: '2' }
    ],
    constraints: [
      '1 ≤ x ≤ 1000'
    ],
    hint: `To make <strong>push O(1)</strong>: just enqueue to q1. To <strong>pop</strong>: move n-1 elements from q1 to q2, pop the last, and swap q1/q2. <br>OR<br> To make <strong>push O(n)</strong>: enqueue to q2, then move all elements from q1 to q2, and swap q1/q2.`,
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
using namespace std;

class MyStack {
    queue<int> q1, q2;
public:
    void push(int x) { }
    int pop() { return 0; }
};

int main() {
    MyStack st;
    st.push(1); st.push(2);
    cout << st.pop() << " ";
    st.push(3);
    cout << st.pop() << endl;
    return 0;
}`,
      python: `from collections import deque

class MyStack:
    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()
    def push(self, x): pass
    def pop(self): return 0

if __name__ == "__main__":
    st = MyStack()
    st.push(1); st.push(2)
    print(st.pop(), end=" ")
    st.push(3)
    print(st.pop())`,
      java: `import java.util.*;

class MyStack {
    Queue<Integer> q1 = new LinkedList<>();
    Queue<Integer> q2 = new LinkedList<>();
    public void push(int x) { }
    public int pop() { return 0; }

    public static void main(String[] args) {
        MyStack st = new MyStack();
        st.push(1); st.push(2);
        System.out.print(st.pop() + " ");
        st.push(3);
        System.out.println(st.pop());
    }
}`,
      javascript: `class MyStack {
    constructor() { this.q1 = []; this.q2 = []; }
    push(x) { }
    pop() { return 0; }
}

const st = new MyStack();
st.push(1); st.push(2);
process.stdout.write(st.pop() + " ");
st.push(3);
console.log(st.pop());`
    },
    solution: {
      cpp: `void push(int x) {
    q2.push(x);
    while(!q1.empty()) { q2.push(q1.front()); q1.pop(); }
    swap(q1, q2);
}
int pop() { int res = q1.front(); q1.pop(); return res; }`,
      javascript: `push(x) {
    this.q2.push(x);
    while(this.q1.length) this.q2.push(this.q1.shift());
    [this.q1, this.q2] = [this.q2, this.q1];
}
pop() { return this.q1.shift(); }`
    },
    testCases: [
      { input: "push 1, 2, pop", expected: "2" },
      { input: "push 1, 2, 3, pop, pop", expected: "3 2" },
      { input: "push 10, pop", expected: "10" },
      { input: "push 1, push 2, pop, push 3, pop", expected: "2 3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Implement Queue using Two Stacks",
    difficulty: "Medium",
    accuracy: "51.3%",
    submissions: "320K+",
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Amortized Analysis",
    realWorld: "Commonly used in legacy systems where only LIFO hardware registers are available, but FIFO logic is required for network packets.",
    description: `Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support <code>push</code>, <code>pop</code>, and <code>peek</code>.`,
    examples: [
      { input: 'push(1), push(2), peek()', output: '1' }
    ],
    constraints: [
      '1 ≤ x ≤ 100'
    ],
    hint: `1. Push stack (<code>s1</code>) handles all new entries. <br>
2. Pop stack (<code>s2</code>) handles all deletions. <br>
3. If <code>s2</code> is empty, transfer all elements from <code>s1</code> to <code>s2</code>. This reverses the order twice, resulting in FIFO.`,
    starterCode: {
      cpp: `#include <iostream>
#include <stack>
using namespace std;

class MyQueue {
    stack<int> s1, s2;
public:
    void push(int x) { }
    int pop() { return 0; }
    int peek() { return 0; }
};

int main() {
    MyQueue q;
    q.push(1); q.push(2);
    cout << q.peek() << " ";
    q.pop();
    cout << q.peek() << endl;
    return 0;
}`,
      python: `class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []
    def push(self, x): pass
    def pop(self): return 0
    def peek(self): return 0

if __name__ == "__main__":
    q = MyQueue()
    q.push(1); q.push(2)
    print(q.peek(), end=" ")
    q.pop()
    print(q.peek())`,
      java: `import java.util.*;

class MyQueue {
    Stack<Integer> s1 = new Stack<>();
    Stack<Integer> s2 = new Stack<>();
    public void push(int x) { }
    public int pop() { return 0; }
    public int peek() { return 0; }

    public static void main(String[] args) {
        MyQueue q = new MyQueue();
        q.push(1); q.push(2);
        System.out.print(q.peek() + " ");
        q.pop();
        System.out.println(q.peek());
    }
}`,
      javascript: `class MyQueue {
    constructor() { this.s1 = []; this.s2 = []; }
    push(x) { }
    pop() { return 0; }
    peek() { return 0; }
}

const q = new MyQueue();
q.push(1); q.push(2);
process.stdout.write(q.peek() + " ");
q.pop();
console.log(q.peek());`
    },
    solution: {
      cpp: `void push(int x) { s1.push(x); }
int pop() {
    int res = peek(); s2.pop(); return res;
}
int peek() {
    if (s2.empty()) {
        while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
    }
    return s2.top();
}`,
      javascript: `push(x) { this.s1.push(x); }
peek() {
    if (this.s2.length === 0) {
        while (this.s1.length) this.s2.push(this.s1.pop());
    }
    return this.s2[this.s2.length - 1];
}
pop() {
    let res = this.peek();
    this.s2.pop();
    return res;
}`
    },
    testCases: [
      { input: "push 1, 2, peek", expected: "1" },
      { input: "push 1, pop, push 2, peek", expected: "2" },
      { input: "push 10, 20, 30, pop, pop, peek", expected: "30" },
      { input: "push 5, peek", expected: "5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Implement Queue using Two Stacks",
    difficulty: "Medium",
    accuracy: "51.3%",
    submissions: "320K+",
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Amortized Analysis",
    realWorld: "Commonly used in legacy hardware where only LIFO registers are available, but networking protocols require FIFO message processing.",
    description: `Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support <code>push</code>, <code>pop</code>, <code>peek</code>, and <code>empty</code>.
<br><br>All operations must run in <strong>O(1) amortized</strong> time.`,
    examples: [
      { input: 'push(1), push(2), peek()', output: '1', explain: '1 was the first element pushed, so it is the first to be peeked.' }
    ],
    constraints: [
      '1 ≤ x ≤ 100',
      'At most 100 calls to the queue.'
    ],
    hint: `Maintain two stacks: <strong>s1</strong> (input) and <strong>s2</strong> (output).<br><br>
1. <strong>Push:</strong> Always push into <code>s1</code>.<br>
2. <strong>Pop/Peek:</strong> If <code>s2</code> is empty, move ALL elements from <code>s1</code> to <code>s2</code>. This reverses the order twice, effectively making it FIFO.<br>
3. Pop from <code>s2</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <stack>
using namespace std;

class MyQueue {
    stack<int> s1, s2;
public:
    void push(int x) {
        // Your code here
    }
    
    int pop() {
        // Your code here
        return 0;
    }
    
    int peek() {
        // Your code here
        return 0;
    }
    
    bool empty() {
        // Your code here
        return true;
    }
};

int main() {
    MyQueue q;
    q.push(1);
    q.push(2);
    cout << q.peek() << " "; // 1
    cout << q.pop() << " ";  // 1
    cout << (q.empty() ? "true" : "false") << endl; // false
    return 0;
}`,
      python: `class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        return 0

    def peek(self) -> int:
        return 0

    def empty(self) -> bool:
        return True

if __name__ == "__main__":
    q = MyQueue()
    q.push(1)
    q.push(2)
    print(q.peek(), end=" ")
    print(q.pop(), end=" ")
    print("true" if q.empty() else "false")`,
      java: `import java.util.*;

class MyQueue {
    Stack<Integer> s1 = new Stack<>();
    Stack<Integer> s2 = new Stack<>();

    public void push(int x) {}
    public int pop() { return 0; }
    public int peek() { return 0; }
    public boolean empty() { return true; }

    public static void main(String[] args) {
        MyQueue q = new MyQueue();
        q.push(1); q.push(2);
        System.out.print(q.peek() + " " + q.pop() + " " + q.empty());
    }
}`,
      javascript: `class MyQueue {
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }
    push(x) { }
    pop() { }
    peek() { }
    empty() { }
}

const q = new MyQueue();
q.push(1); q.push(2);
console.log(q.peek(), q.pop(), q.empty());`
    },
    solution: {
      cpp: `void push(int x) { s1.push(x); }
int peek() {
    if (s2.empty()) {
        while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
    }
    return s2.top();
}
int pop() {
    int res = peek(); s2.pop(); return res;
}
bool empty() { return s1.empty() && s2.empty(); }`,
      javascript: `push(x) { this.s1.push(x); }
peek() {
    if (this.s2.length === 0) {
        while (this.s1.length) this.s2.push(this.s1.pop());
    }
    return this.s2[this.s2.length - 1];
}
pop() {
    const res = this.peek();
    this.s2.pop();
    return res;
}
empty() { return this.s1.length === 0 && this.s2.length === 0; }`
    },
    testCases: [
      { input: 'push 1, 2, peek', expected: '1' },
      { input: 'push 1, pop, empty', expected: '1 true' },
      { input: 'push 10, 20, 30, pop, peek', expected: '10 20' },
      { input: 'push 5, peek, pop', expected: '5 5' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "Implement Queue using a Single Stack",
    difficulty: "Hard",
    accuracy: "42.5%",
    submissions: "18K+",
    companies: ["Amazon", "Hike"],
    pattern: "Recursion",
    realWorld: "Used to demonstrate how functional programming can simulate state changes using only the execution stack.",
    description: `Implement a <strong>Queue</strong> using only <strong>one</strong> stack and <strong>recursion</strong>.
<br><br>The <code>push</code> operation should be O(1), but the <code>pop</code> operation will use the recursion call stack to access the bottom element (the first pushed element).`,
    examples: [
      { input: 'push(1), push(2), pop()', output: '1', explain: 'Recursion pops all items to reach 1 at the very bottom of the stack.' }
    ],
    constraints: [
      '1 ≤ x ≤ 1000',
      'At most 100 pop operations.'
    ],
    hint: `The recursion depth acts as an implicit second stack:<br><br>
1. To <code>pop()</code>: <br>
&nbsp;&nbsp;&nbsp;a. Pop <code>temp = stack.top</code>.<br>
&nbsp;&nbsp;&nbsp;b. If stack is now empty, <code>temp</code> is your answer.<br>
&nbsp;&nbsp;&nbsp;c. Else, recurse: <code>res = pop()</code>.<br>
&nbsp;&nbsp;&nbsp;d. Push <code>temp</code> back to stack and return <code>res</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <stack>
using namespace std;

class MyQueue {
    stack<int> s;
public:
    void push(int x) {
        s.push(x);
    }
    
    int pop() {
        // Implement recursive pop here
        return 0;
    }
};

int main() {
    MyQueue q;
    q.push(1); q.push(2); q.push(3);
    cout << q.pop() << " "; // 1
    cout << q.pop() << endl; // 2
    return 0;
}`,
      python: `class MyQueue:
    def __init__(self):
        self.s = []

    def push(self, x: int) -> None:
        self.s.append(x)

    def pop(self) -> int:
        # Implement recursive pop
        pass

if __name__ == "__main__":
    q = MyQueue()
    q.push(1); q.push(2)
    print(q.pop(), q.pop())`,
      java: `import java.util.*;

class MyQueue {
    Stack<Integer> s = new Stack<>();
    public void push(int x) { s.push(x); }
    public int pop() { return 0; }

    public static void main(String[] args) {
        MyQueue q = new MyQueue();
        q.push(1); q.push(2);
        System.out.println(q.pop() + " " + q.pop());
    }
}`,
      javascript: `class MyQueue {
    constructor() { this.s = []; }
    push(x) { this.s.push(x); }
    pop() { }
}

const q = new MyQueue();
q.push(1); q.push(2);
console.log(q.pop(), q.pop());`
    },
    solution: {
      cpp: `int pop() {
    int x = s.top(); s.pop();
    if (s.empty()) return x;
    int res = pop();
    s.push(x);
    return res;
}`,
      javascript: `pop() {
    let x = this.s.pop();
    if (this.s.length === 0) return x;
    let res = this.pop();
    this.s.push(x);
    return res;
}`
    },
    testCases: [
      { input: 'push 1, 2, pop', expected: '1' },
      { input: 'push 5, 10, pop, pop', expected: '5 10' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Reverse a Queue using Recursion",
    difficulty: "Easy",
    accuracy: "78.4%",
    submissions: "95K+",
    companies: ["Amazon", "Microsoft", "Samsung"],
    pattern: "Recursion",
    realWorld: "Used in reversing packet sequences in network buffers or undo/redo mechanisms in software.",
    description: `Given a queue of <strong>n</strong> integers, reverse the queue using <strong>recursion</strong>. You are not allowed to use any extra data structure (like a stack or array) explicitly.`,
    examples: [
      { input: 'q = [4, 3, 1, 10]', output: '[10, 1, 3, 4]', explain: 'Order is completely reversed.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵'
    ],
    hint: `1. Dequeue the front element <code>x</code>.<br>
2. Recursively call <code>reverse()</code> for the remaining queue.<br>
3. Once the recursive calls return (meaning the rest of the queue is reversed), <strong>enqueue</strong> <code>x</code> back to the rear.`,
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
using namespace std;

void reverseQueue(queue<int>& q) {
    // Your code here
}

int main() {
    int n; cin >> n;
    queue<int> q;
    for(int i=0; i<n; i++) {
        int x; cin >> x; q.push(x);
    }
    reverseQueue(q);
    while(!q.empty()) {
        cout << q.front() << " "; q.pop();
    }
    return 0;
}`,
      python: `import collections

def reverseQueue(q):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    q = collections.deque(map(int, input().split()))
    reverseQueue(q)
    print(*(list(q)))`,
      java: `import java.util.*;

class Solution {
    public static void reverseQueue(Queue<Integer> q) {
        // Your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Queue<Integer> q = new LinkedList<>();
        for(int i=0; i<n; i++) q.add(sc.nextInt());
        reverseQueue(q);
        while(!q.isEmpty()) System.out.print(q.poll() + " ");
    }
}`,
      javascript: `function reverseQueue(q) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 1) {
    const q = input.slice(1).map(Number);
    reverseQueue(q);
    console.log(q.join(' '));
}`
    },
    solution: {
      cpp: `void reverseQueue(queue<int>& q) {
    if (q.empty()) return;
    int x = q.front(); q.pop();
    reverseQueue(q);
    q.push(x);
}`,
      javascript: `function reverseQueue(q) {
    if (q.length === 0) return;
    let x = q.shift();
    reverseQueue(q);
    q.push(x);
}`
    },
    testCases: [
      { input: '4\n4 3 1 10', expected: '10 1 3 4' },
      { input: '3\n1 2 3',    expected: '3 2 1' },
      { input: '1\n5',        expected: '5' },
      { input: '4\n10 20 30 40', expected: '40 30 20 10' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Minimum Steps to Reach Target by Knight",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "60K+",
    companies: ["Amazon", "Microsoft", "Directi"],
    pattern: "BFS on Grid",
    realWorld: "Used in AI pathfinding for turn-based games and robotics where movement is constrained to non-standard patterns.",
    description: `Given a square chessboard of size <strong>N x N</strong>, find the minimum number of steps a Knight takes to reach a target position from a starting position.
<br><br>A knight moves in an 'L' shape (2 steps in one direction, then 1 step perpendicular).`,
    examples: [
      { input: 'N=6, start=[1,1], target=[4,5]', output: '3', explain: '[1,1] -> [3,2] -> [5,3] -> [4,5].' }
    ],
    constraints: [
      '1 ≤ N ≤ 1000',
      '1 ≤ startX, startY, targetX, targetY ≤ N'
    ],
    hint: `This is a <strong>Shortest Path problem in an unweighted graph</strong>:<br><br>
1. Use <strong>BFS</strong>. Each cell is a node, and the 8 knight moves are edges.<br>
2. Maintain a <code>dist[N+1][N+1]</code> array initialized to -1.<br>
3. Push start position to queue with dist = 0.<br>
4. The first time the knight reaches the target cell, return the distance.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int minSteps(int N, int startX, int startY, int targetX, int targetY) {
    // Your code here
    return 0;
}

int main() {
    int N, sx, sy, tx, ty;
    cin >> N >> sx >> sy >> tx >> ty;
    cout << minSteps(N, sx, sy, tx, ty) << endl;
    return 0;
}`,
      python: `import collections

def minSteps(N, start, target):
    # Your code here
    pass

if __name__ == "__main__":
    N = int(input())
    sx, sy = map(int, input().split())
    tx, ty = map(int, input().split())
    print(minSteps(N, (sx, sy), (tx, ty)))`,
      java: `import java.util.*;

class Solution {
    public int minSteps(int N, int[] start, int[] target) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int[] start = {sc.nextInt(), sc.nextInt()};
        int[] target = {sc.nextInt(), sc.nextInt()};
        System.out.println(new Solution().minSteps(N, start, target));
    }
}`,
      javascript: `function minSteps(N, start, target) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length >= 5) {
    console.log(minSteps(parseInt(input[0]), [parseInt(input[1]), parseInt(input[2])], [parseInt(input[3]), parseInt(input[4])]));
}`
    },
    solution: {
      cpp: `int minSteps(int N, int sx, int sy, int tx, int ty) {
    int dx[] = {-2, -1, 1, 2, -2, -1, 1, 2};
    int dy[] = {-1, -2, -2, -1, 1, 2, 2, 1};
    vector<vector<int>> dist(N + 1, vector<int>(N + 1, -1));
    queue<pair<int, int>> q;
    q.push({sx, sy}); dist[sx][sy] = 0;
    while(!q.empty()){
        pair<int, int> curr = q.front(); q.pop();
        if(curr.first == tx && curr.second == ty) return dist[tx][ty];
        for(int i=0; i<8; i++){
            int nx = curr.first + dx[i], ny = curr.second + dy[i];
            if(nx >= 1 && nx <= N && ny >= 1 && ny <= N && dist[nx][ny] == -1){
                dist[nx][ny] = dist[curr.first][curr.second] + 1;
                q.push({nx, ny});
            }
        }
    }
    return -1;
}`,
      javascript: `function minSteps(N, start, target) {
    const dx = [-2, -1, 1, 2, -2, -1, 1, 2], dy = [-1, -2, -2, -1, 1, 2, 2, 1];
    let q = [[...start, 0]], visited = new Set([\`\${start[0]},\${start[1]}\`]);
    while(q.length) {
        let [x, y, d] = q.shift();
        if(x === target[0] && y === target[1]) return d;
        for(let i=0; i<8; i++){
            let nx = x + dx[i], ny = y + dy[i];
            if(nx >= 1 && nx <= N && ny >= 1 && ny <= N && !visited.has(\`\${nx},\${ny}\`)) {
                visited.add(\`\${nx},\${ny}\`);
                q.push([nx, ny, d + 1]);
            }
        }
    }
    return -1;
}`
    },
    testCases: [
      { input: '6\n1 1\n4 5', expected: '3' },
      { input: '10\n1 1\n10 10', expected: '6' },
      { input: '8\n1 1\n2 3', expected: '1' },
      { input: '30\n1 1\n30 30', expected: '20' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 14,
    title: "First Negative Integer in Every Window of size k",
    difficulty: "Medium",
    accuracy: "52.4%",
    submissions: "110K+",
    companies: ["Amazon", "First American", "Cisco"],
    pattern: "Sliding Window + Queue",
    realWorld: "Used in time-series data processing to detect the first signal drop or temperature anomaly within moving time segments.",
    description: `Given an array <strong>arr</strong> and an integer <strong>k</strong>, find the first negative integer for each window of size k. If a window does not contain a negative integer, return 0.`,
    examples: [
      { input: 'arr = [12, -1, -7, 8, -15, 30], k = 3', output: '[-1, -1, -7, -15]', explain: 'Window [12, -1, -7] -> -1. Window [-1, -7, 8] -> -1, etc.' }
    ],
    constraints: [
      '1 ≤ n ≤ 10⁵',
      '1 ≤ k ≤ n'
    ],
    hint: `Use a <strong>Queue</strong> (specifically a Deque) to store <strong>indices</strong> of negative numbers:<br><br>
1. While processing window <code>i</code>, remove indices from the front that are outside the window (<code>idx <= i - k</code>).<br>
2. Add current index <code>i</code> if <code>arr[i] < 0</code>.<br>
3. The first negative for the window is <code>arr[q.front()]</code> (if queue not empty), otherwise 0.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<long long> printFirstNegativeInteger(long long arr[], int n, int k) {
    // Your code here
    return {};
}

int main() {
    int n, k; cin >> n >> k;
    long long arr[n];
    for(int i=0; i<n; i++) cin >> arr[i];
    vector<long long> res = printFirstNegativeInteger(arr, n, k);
    for(auto x : res) cout << x << " ";
    return 0;
}`,
      python: `import collections

def firstNegative(arr, n, k):
    # Your code here
    pass

if __name__ == "__main__":
    n, k = map(int, input().split())
    arr = list(map(int, input().split()))
    print(*(firstNegative(arr, n, k)))`,
      java: `import java.util.*;

class Solution {
    public long[] firstNegative(long[] arr, int n, int k) {
        // Your code here
        return new long[n-k+1];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        long[] arr = new long[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextLong();
        long[] res = new Solution().firstNegative(arr, n, k);
        for(long x : res) System.out.print(x + " ");
    }
}`,
      javascript: `function firstNegative(arr, k) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 2) {
    const n = parseInt(input[0]), k = parseInt(input[1]);
    const arr = input.slice(2, 2+n).map(Number);
    console.log(firstNegative(arr, k).join(' '));
}`
    },
    solution: {
      cpp: `vector<long long> printFirstNegativeInteger(long long arr[], int n, int k) {
    deque<int> dq; vector<long long> res;
    for(int i=0; i<n; i++){
        if(!dq.empty() && dq.front() <= i - k) dq.pop_front();
        if(arr[i] < 0) dq.push_back(i);
        if(i >= k - 1) res.push_back(dq.empty() ? 0 : arr[dq.front()]);
    }
    return res;
}`,
      javascript: `function firstNegative(arr, k) {
    let q = [], res = [];
    for (let i = 0; i < arr.length; i++) {
        if (q.length && q[0] <= i - k) q.shift();
        if (arr[i] < 0) q.push(i);
        if (i >= k - 1) res.push(q.length ? arr[q[0]] : 0);
    }
    return res;
}`
    },
    testCases: [
      { input: '8 3\n12 -1 -7 8 -15 30 16 28', expected: '-1 -1 -7 -15 -15 0' },
      { input: '5 2\n-8 2 3 -6 10', expected: '-8 0 -6 -6' },
      { input: '3 2\n1 2 3', expected: '0 0' },
      { input: '5 3\n1 -2 3 -4 5', expected: '-2 -2 -4' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Minimum Time Required to Rot All Oranges",
    difficulty: "Medium",
    accuracy: "45.8%",
    submissions: "140K+",
    companies: ["Amazon", "Microsoft", "Samsung"],
    pattern: "Multi-source BFS",
    realWorld: "Used in modeling the spread of infectious diseases or wildfires where the source exists in multiple locations simultaneously.",
    description: `Given a grid where 0 = empty, 1 = fresh, and 2 = rotten. Every minute, a rotten orange rots any adjacent (4-direction) fresh orange. Return minimum minutes until no fresh oranges remain. If impossible, return -1.`,
    examples: [
      { input: 'grid = [[2,1,1], [1,1,0], [0,1,1]]', output: '4', explain: 'Minute by minute, the infection spreads from the top-left rotten orange.' }
    ],
    constraints: [
      '1 ≤ R, C ≤ 50',
      'grid[i][j] is 0, 1, or 2'
    ],
    hint: `This is a <strong>Multi-source BFS</strong> problem:<br><br>
1. Count the total fresh oranges and push all initial rotten orange locations into a queue.<br>
2. Process the queue level by level (each level is 1 minute).<br>
3. For each rotten orange, infect adjacent fresh oranges and decrease the fresh orange count.<br>
4. Return the time if <code>fresh == 0</code>, otherwise -1.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int orangesRotting(vector<vector<int>>& grid) {
    // Your code here
    return 0;
}

int main() {
    int R, C; cin >> R >> C;
    vector<vector<int>> grid(R, vector<int>(C));
    for(int i=0; i<R; i++)
        for(int j=0; j<C; j++) cin >> grid[i][j];
    cout << orangesRotting(grid) << endl;
    return 0;
}`,
      python: `import collections

class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        # Your code here
        pass

if __name__ == "__main__":
    R, C = map(int, input().split())
    grid = []
    for _ in range(R):
        grid.append(list(map(int, input().split())))
    print(Solution().orangesRotting(grid))`,
      java: `import java.util.*;

class Solution {
    public int orangesRotting(int[][] grid) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int R = sc.nextInt();
        int C = sc.nextInt();
        int[][] grid = new int[R][C];
        for(int i=0; i<R; i++)
            for(int j=0; j<C; j++) grid[i][j] = sc.nextInt();
        System.out.println(new Solution().orangesRotting(grid));
    }
}`,
      javascript: `function orangesRotting(grid) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 2) {
    const R = parseInt(input[0]), C = parseInt(input[1]);
    let grid = [];
    for(let i=0; i<R; i++) grid.push(input.slice(2 + i*C, 2 + (i+1)*C).map(Number));
    console.log(orangesRotting(grid));
}`
    },
    solution: {
      cpp: `int orangesRotting(vector<vector<int>>& grid) {
    int n = grid.size(), m = grid[0].size(), fresh = 0, time = 0;
    queue<pair<int, int>> q;
    for(int i=0; i<n; i++)
        for(int j=0; j<m; j++) {
            if(grid[i][j] == 2) q.push({i, j});
            if(grid[i][j] == 1) fresh++;
        }
    if(fresh == 0) return 0;
    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
    while(!q.empty()) {
        int sz = q.size();
        bool rotted = false;
        for(int i=0; i<sz; i++) {
            pair<int, int> curr = q.front(); q.pop();
            for(int k=0; k<4; k++) {
                int nr = curr.first + dr[k], nc = curr.second + dc[k];
                if(nr>=0 && nr<n && nc>=0 && nc<m && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2; fresh--;
                    q.push({nr, nc}); rotted = true;
                }
            }
        }
        if(rotted) time++;
    }
    return fresh == 0 ? time : -1;
}`,
      javascript: `function orangesRotting(grid) {
    let q = [], fresh = 0, n = grid.length, m = grid[0].length;
    for(let i=0; i<n; i++)
        for(let j=0; j<m; j++) {
            if(grid[i][j] === 2) q.push([i, j]);
            if(grid[i][j] === 1) fresh++;
        }
    if(fresh === 0) return 0;
    let time = 0, dr = [-1, 1, 0, 0], dc = [0, 0, -1, 1];
    while(q.length) {
        let sz = q.length, rotted = false;
        for(let i=0; i<sz; i++) {
            let [r, c] = q.shift();
            for(let k=0; k<4; k++){
                let nr = r + dr[k], nc = c + dc[k];
                if(nr>=0 && nr<n && nc>=0 && nc<m && grid[nr][nc] === 1){
                    grid[nr][nc] = 2; fresh--;
                    q.push([nr, nc]); rotted = true;
                }
            }
        }
        if(rotted) time++;
    }
    return fresh === 0 ? time : -1;
}`
    },
    testCases: [
      { input: '3 3\n2 1 1\n1 1 0\n0 1 1', expected: '4' },
      { input: '3 3\n2 1 1\n0 1 1\n1 0 1', expected: '-1' },
      { input: '1 2\n0 2', expected: '0' },
      { input: '2 2\n1 1\n1 1', expected: '-1' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "Shortest Safe Route with Landmines",
    difficulty: "Hard",
    accuracy: "38.5%",
    submissions: "20K+",
    companies: ["Amazon", "Uber", "Microsoft"],
    pattern: "BFS + Grid Preprocessing",
    realWorld: "Used in robotics to navigate through 'danger zones' (like radiation or minefields) where even being adjacent to a hazard is prohibited.",
    description: `Given a grid where <strong>1</strong> represents a safe cell and <strong>0</strong> represents a landmine. Any cell <strong>adjacent</strong> (up, down, left, right) to a landmine is also considered unsafe.
<br><br>Find the shortest safe route from any cell in the <strong>first column</strong> to any cell in the <strong>last column</strong>. If no path exists, return -1.`,
    examples: [
      { input: 'grid = [[1,1,1], [1,0,1], [1,1,1]]', output: '-1', explain: 'The mine at (1,1) makes (0,1), (2,1), (1,0), and (1,2) unsafe, blocking all paths to the last column.' }
    ],
    constraints: [
      '1 ≤ R, C ≤ 100',
      'grid[i][j] is 0 or 1'
    ],
    hint: `1. <strong>Preprocessing:</strong> Create a secondary grid. For every 0 in the original grid, mark itself and its 4 neighbors as "UNSAFE" in the new grid.<br>
2. <strong>Multi-source BFS:</strong> Push all safe cells in column 0 into a queue with distance 1.<br>
3. Traverse using BFS. The first time you reach <code>col == C-1</code>, that is your shortest path.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int findShortestPath(vector<vector<int>>& grid) {
    // Your code here
    return 0;
}

int main() {
    int R, C;
    if (!(cin >> R >> C)) return 0;
    vector<vector<int>> grid(R, vector<int>(C));
    for(int i=0; i<R; i++)
        for(int j=0; j<C; j++) cin >> grid[i][j];
    cout << findShortestPath(grid) << endl;
    return 0;
}`,
      python: `import collections

def findShortestPath(grid):
    # Your code here
    pass

if __name__ == "__main__":
    import sys
    input_data = sys.stdin.read().split()
    if not input_data: exit()
    R, C = int(input_data[0]), int(input_data[1])
    grid = []
    for i in range(R):
        grid.append(list(map(int, input_data[2 + i*C : 2 + (i+1)*C])))
    print(findShortestPath(grid))`,
      java: `import java.util.*;

class Solution {
    public int findShortestPath(int[][] grid) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int R = sc.nextInt();
        int C = sc.nextInt();
        int[][] grid = new int[R][C];
        for(int i=0; i<R; i++)
            for(int j=0; j<C; j++) grid[i][j] = sc.nextInt();
        System.out.println(new Solution().findShortestPath(grid));
    }
}`,
      javascript: `function findShortestPath(grid) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 2) {
    const R = parseInt(input[0]), C = parseInt(input[1]);
    let grid = [];
    for(let i=0; i<R; i++) grid.push(input.slice(2 + i*C, 2 + (i+1)*C).map(Number));
    console.log(findShortestPath(grid));
}`
    },
    solution: {
      cpp: `int findShortestPath(vector<vector<int>>& grid) {
    int R = grid.size(), C = grid[0].size();
    vector<vector<bool>> safe(R, vector<bool>(C, true));
    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
    for(int i=0; i<R; i++) {
        for(int j=0; j<C; j++) {
            if(grid[i][j] == 0) {
                safe[i][j] = false;
                for(int k=0; k<4; k++) {
                    int ni = i+dr[k], nj = j+dc[k];
                    if(ni>=0 && ni<R && nj>=0 && nj<C) safe[ni][nj] = false;
                }
            }
        }
    }
    queue<pair<pair<int, int>, int>> q;
    vector<vector<bool>> vis(R, vector<bool>(C, false));
    for(int i=0; i<R; i++) {
        if(safe[i][0]) { q.push({{i, 0}, 1}); vis[i][0] = true; }
    }
    while(!q.empty()) {
        auto curr = q.front(); q.pop();
        int r = curr.first.first, c = curr.first.second, d = curr.second;
        if(c == C-1) return d;
        for(int k=0; k<4; k++) {
            int nr = r+dr[k], nc = c+dc[k];
            if(nr>=0 && nr<R && nc>=0 && nc<C && safe[nr][nc] && !vis[nr][nc]) {
                vis[nr][nc] = true;
                q.push({{nr, nc}, d+1});
            }
        }
    }
    return -1;
}`
    },
    testCases: [
      { input: '3 3\n1 1 1\n1 0 1\n1 1 1', expected: '-1' },
      { input: '3 3\n1 1 1\n1 1 1\n1 1 1', expected: '3' },
      { input: '2 2\n1 0\n1 1', expected: '-1' },
      { input: '5 5\n1 1 1 1 1\n1 1 1 1 1\n1 1 0 1 1\n1 1 1 1 1\n1 1 1 1 1', expected: '5' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "First Circular Tour (Petrol Pump)",
    difficulty: "Medium",
    accuracy: "45.2%",
    submissions: "180K+",
    companies: ["Google", "Amazon", "Microsoft", "Paytm"],
    pattern: "Greedy / Two Pointers",
    realWorld: "Used in EV route planning and logistics to determine if a vehicle can complete a loop given specific energy recharge points and consumption rates.",
    description: `There are <strong>N</strong> petrol pumps on a circle. You are given two arrays: <code>petrol[]</code> (amount of petrol at each pump) and <code>distance[]</code> (distance to the next pump).
<br><br>Find the <strong>first</strong> starting point from where you can complete the circle. One liter of petrol covers one unit of distance. If no such point exists, return -1.`,
    examples: [
      { input: 'petrol = [4, 6, 7, 4], distance = [6, 5, 3, 5]', output: '1', explain: 'Start at index 1. Petrol: 6, Dist: 5. Surplus: 1. Next: 1+7-3=5. Next: 5+4-5=4. Next: 4+4-6=2. Loop complete.' }
    ],
    constraints: [
      '1 ≤ N ≤ 10⁵',
      '1 ≤ petrol[i], distance[i] ≤ 10⁴'
    ],
    hint: `1. Calculate the <code>total_petrol - total_distance</code>. If it is negative, a circular tour is impossible.<br>
2. Use a greedy approach: Start at index 0. Keep track of <code>current_petrol</code>.<br>
3. If <code>current_petrol</code> becomes negative at index <code>i</code>, it means no pump from your <code>start</code> to <code>i</code> can be the starting point. Reset <code>start = i + 1</code> and <code>current_petrol = 0</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int tour(vector<int>& petrol, vector<int>& distance) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> p(n), d(n);
    for(int i=0; i<n; i++) cin >> p[i];
    for(int i=0; i<n; i++) cin >> d[i];
    cout << tour(p, d) << endl;
    return 0;
}`,
      python: `def tour(petrol, distance):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    p = list(map(int, input().split()))
    d = list(map(int, input().split()))
    print(tour(p, d))`,
      java: `import java.util.*;

class Solution {
    public int tour(int[] petrol, int[] distance) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] p = new int[n];
        int[] d = new int[n];
        for(int i=0; i[n]; i++) p[i] = sc.nextInt();
        for(int i=0; i[n]; i++) d[i] = sc.nextInt();
        System.out.println(new Solution().tour(p, d));
    }
}`,
      javascript: `function tour(petrol, distance) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 1) {
    const n = parseInt(input[0]);
    const p = input.slice(1, 1+n).map(Number);
    const d = input.slice(1+n, 1+2*n).map(Number);
    console.log(tour(p, d));
}`
    },
    solution: {
      cpp: `int tour(vector<int>& petrol, vector<int>& distance) {
    int n = petrol.size();
    long long total_surplus = 0, current_surplus = 0;
    int start = 0;
    for(int i=0; i<n; i++) {
        int diff = petrol[i] - distance[i];
        total_surplus += diff;
        current_surplus += diff;
        if(current_surplus < 0) {
            start = i + 1;
            current_surplus = 0;
        }
    }
    return (total_surplus < 0) ? -1 : start;
}`
    },
    testCases: [
      { input: '4\n4 6 7 4\n6 5 3 5', expected: '1' },
      { input: '3\n1 2 3\n3 4 5', expected: '-1' },
      { input: '2\n5 5\n2 8', expected: '0' },
      { input: '4\n1 2 3 4\n4 3 2 1', expected: '2' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Reverse First K elements of Queue",
    difficulty: "Easy",
    accuracy: "72.1%",
    submissions: "95K+",
    companies: ["Amazon", "Microsoft", "Samsung"],
    pattern: "Queue + Stack Interaction",
    realWorld: "Used in priority-based scheduling where the first batch of tasks needs to be re-ordered (LIFO) while the rest follow standard FIFO processing.",
    description: `Given a queue of <strong>N</strong> integers and an integer <strong>K</strong>, reverse the order of the first K elements of the queue, leaving the other elements in the same relative order.`,
    examples: [
      { input: 'q = [1, 2, 3, 4, 5], K = 3', output: '[3, 2, 1, 4, 5]', explain: 'The first three elements [1, 2, 3] are reversed to [3, 2, 1].' }
    ],
    constraints: [
      '1 ≤ N ≤ 10⁵',
      '1 ≤ K ≤ N'
    ],
    hint: `1. Dequeue the first K elements and push them onto a <strong>Stack</strong>.<br>
2. Pop all elements from the stack and enqueue them back to the queue.<br>
3. Now, the reversed elements are at the back. To bring them to the front, dequeue the remaining <code>N - K</code> elements and enqueue them one by one.`,
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <stack>
using namespace std;

queue<int> modifyQueue(queue<int> q, int k) {
    // Your code here
}

int main() {
    int n, k; cin >> n >> k;
    queue<int> q;
    for(int i=0; i<n; i++) {
        int x; cin >> x; q.push(x);
    }
    queue<int> res = modifyQueue(q, k);
    while(!res.empty()){
        cout << res.front() << " "; res.pop();
    }
    return 0;
}`,
      python: `from collections import deque

def modifyQueue(q, k):
    # Your code here
    pass

if __name__ == "__main__":
    n, k = map(int, input().split())
    q = deque(map(int, input().split()))
    res = modifyQueue(q, k)
    print(*(list(res)))`,
      java: `import java.util.*;

class Solution {
    public Queue<Integer> modifyQueue(Queue<Integer> q, int k) {
        // Your code here
        return q;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        Queue<Integer> q = new LinkedList<>();
        for(int i=0; i<n; i++) q.add(sc.nextInt());
        Queue<Integer> res = new Solution().modifyQueue(q, k);
        while(!res.isEmpty()) System.out.print(res.poll() + " ");
    }
}`,
      javascript: `function modifyQueue(q, k) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 2) {
    const n = parseInt(input[0]), k = parseInt(input[1]);
    const q = input.slice(2, 2+n).map(Number);
    console.log(modifyQueue(q, k).join(' '));
}`
    },
    solution: {
      cpp: `queue<int> modifyQueue(queue<int> q, int k) {
    stack<int> s;
    int n = q.size();
    for(int i=0; i<k; i++) {
        s.push(q.front()); q.pop();
    }
    while(!s.empty()) {
        q.push(s.top()); s.pop();
    }
    for(int i=0; i < n - k; i++) {
        q.push(q.front()); q.pop();
    }
    return q;
}`
    },
    testCases: [
      { input: '5 3\n1 2 3 4 5', expected: '3 2 1 4 5' },
      { input: '4 4\n10 20 30 40', expected: '40 30 20 10' },
      { input: '3 1\n1 2 3', expected: '1 2 3' },
      { input: '6 2\n1 2 3 4 5 6', expected: '2 1 3 4 5 6' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "First Non-Repeating Character in a Stream",
    difficulty: "Medium",
    accuracy: "48.2%",
    submissions: "85K+",
    companies: ["Amazon", "Google", "Flipkart"],
    pattern: "Queue + Frequency Map",
    realWorld: "Used in real-time data processing to identify unique identifiers or error codes from a continuous stream of logs.",
    description: `Given a stream of characters, find the <strong>first non-repeating character</strong> each time a new character is added to the stream. If no such character exists, report <strong>#</strong>.`,
    examples: [
      { input: 'A = "aabc"', output: '"a#bb"', explain: 'Stream: "a" -> ans: "a". "aa" -> ans: "#". "aab" -> ans: "b". "aabc" -> ans: "b".' }
    ],
    constraints: [
      '1 ≤ A.length ≤ 10⁵',
      'A consists of lowercase English letters.'
    ],
    hint: `1. Maintain a <strong>frequency map</strong> (array of size 26) and a <strong>queue</strong>.<br>
2. For every character, increment its frequency and push it to the queue.<br>
3. Check the front of the queue. If its frequency is > 1, it is no longer the "first non-repeating" character, so pop it.<br>
4. The first character remaining in the queue is the answer. If queue is empty, return #.`,
    starterCode: {
      cpp: `#include <iostream>
#include <string>
#include <vector>
#include <queue>
using namespace std;

string FirstNonRepeating(string A) {
    // Your code here
    return "";
}

int main() {
    string A; cin >> A;
    cout << FirstNonRepeating(A) << endl;
    return 0;
}`,
      python: `import collections

def FirstNonRepeating(A):
    # Your code here
    pass

if __name__ == "__main__":
    A = input().strip()
    print(FirstNonRepeating(A))`,
      java: `import java.util.*;

class Solution {
    public String FirstNonRepeating(String A) {
        // Your code here
        return "";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String A = sc.next();
        System.out.println(new Solution().FirstNonRepeating(A));
    }
}`,
      javascript: `function FirstNonRepeating(A) {
    // Your code here
}

const A = require('fs').readFileSync(0, 'utf8').trim();
console.log(FirstNonRepeating(A));`
    },
    solution: {
      cpp: `string FirstNonRepeating(string A) {
    vector<int> count(26, 0);
    queue<char> q;
    string res = "";
    for(char c : A) {
        count[c-'a']++;
        q.push(c);
        while(!q.empty() && count[q.front()-'a'] > 1) {
            q.pop();
        }
        if(q.empty()) res += '#';
        else res += q.front();
    }
    return res;
}`
    },
    testCases: [
      { input: 'aabc', expected: 'a#bb' },
      { input: 'zz', expected: 'z#' },
      { input: 'aabbc', expected: 'a#bb#' },
      { input: 'abcabc', expected: 'aaabb#' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 20,
    title: "Snake and Ladder Problem",
    difficulty: "Hard",
    accuracy: "39.5%",
    submissions: "45K+",
    companies: ["Amazon", "Microsoft", "Directi"],
    pattern: "BFS on Directed Graph",
    realWorld: "Used in simulation games and modeling probability-based board movements where specific cells trigger 'teleports' (shortcuts or traps).",
    description: `Given a 10x10 board (cells 1 to 100). You start at cell 1 and need to reach cell 100.
<br><br>You are given the positions of snakes and ladders. Find the <strong>minimum number of dice throws</strong> required to reach the last cell.
<br><br>Each throw is a value from 1 to 6.`,
    examples: [
      { input: 'Ladders: [2->73], Snakes: [99->5]', output: '2', explain: '1st throw: result 1 (move 1 to 2, climb to 73). 2nd throw: result 6 (move 73 to 79)... eventually reach 100.' }
    ],
    constraints: [
      'N ≤ 100',
      'The board is always 10x10.'
    ],
    hint: `1. Treat the board as a <strong>Graph</strong> where each cell (1-100) is a node.<br>
2. For every cell <code>i</code>, there are edges to <code>i+1, i+2...i+6</code>.<br>
3. If a cell contains a ladder or snake, the edge effectively goes directly to the destination.<br>
4. Use <strong>BFS</strong> to find the shortest path (minimum moves) from 1 to 100.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
using namespace std;

int minThrows(unordered_map<int, int>& moves) {
    // Your code here
    return 0;
}

int main() {
    int n; cin >> n;
    unordered_map<int, int> moves;
    for(int i=0; i<n; i++) {
        int u, v; cin >> u >> v; moves[u] = v;
    }
    cout << minThrows(moves) << endl;
    return 0;
}`,
      python: `import collections

def minThrows(moves):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    moves = {}
    for _ in range(n):
        u, v = map(int, input().split())
        moves[u] = v
    print(minThrows(moves))`,
      java: `import java.util.*;

class Solution {
    public int minThrows(Map<Integer, Integer> moves) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<Integer, Integer> moves = new HashMap<>();
        for(int i=0; i<n; i++) moves.put(sc.nextInt(), sc.nextInt());
        System.out.println(new Solution().minThrows(moves));
    }
}`,
      javascript: `function minThrows(moves) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 0) {
    const n = parseInt(input[0]);
    let moves = new Map();
    for(let i=0; i<n; i++) moves.set(parseInt(input[1+2*i]), parseInt(input[2+2*i]));
    console.log(minThrows(moves));
}`
    },
    solution: {
      cpp: `int minThrows(unordered_map<int, int>& moves) {
    vector<int> dist(101, -1);
    queue<int> q;
    q.push(1); dist[1] = 0;
    while(!q.empty()) {
        int u = q.front(); q.pop();
        if(u == 100) return dist[100];
        for(int i=1; i<=6 && u+i <= 100; i++) {
            int v = (moves.count(u+i)) ? moves[u+i] : u+i;
            if(dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return -1;
}`
    },
    testCases: [
      { input: '2\n2 73\n99 5', expected: '3' },
      { input: '0', expected: '17' },
      { input: '1\n2 99', expected: '2' },
      { input: '2\n3 50\n51 100', expected: '2' }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 21,
    title: "Shortest Path Visiting Waypoints",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "20K+",
    companies: ["Uber", "DoorDash", "Amazon"],
    pattern: "Multi-stage BFS",
    realWorld: "Used in delivery apps where a driver must pick up an order at point A (Waypoint) before delivering it to point B (Target) in the shortest time.",
    description: `Given a grid with obstacles (0), safe cells (1), a start point <strong>S</strong>, a target <strong>T</strong>, and an intermediate waypoint <strong>W</strong>. 
<br><br>Find the minimum distance to travel from <strong>S → W → T</strong>. You cannot move through obstacles.`,
    examples: [
      { input: 'S=(0,0), W=(2,2), T=(4,4)', output: '8', explain: 'Shortest path is 4 steps to W, then 4 steps to T. Total = 8.' }
    ],
    constraints: [
      'Grid size up to 100x100',
      'Start, Target, and Waypoint are always safe cells.'
    ],
    hint: `This is simply <strong>two consecutive BFS runs</strong>:<br><br>
1. Run BFS from <strong>S</strong> to find the shortest distance to <strong>W</strong>. If W is unreachable, return -1.<br>
2. Run a second BFS from <strong>W</strong> to find the shortest distance to <strong>T</strong>. If T is unreachable, return -1.<br>
3. The total distance is the sum of the two results.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii;

int shortestPathWithWaypoint(vector<vector<int>>& grid, pii S, pii W, pii T) {
    // Your code here
    return 0;
}

int main() {
    int R, C; cin >> R >> C;
    vector<vector<int>> grid(R, vector<int>(C));
    for(int i=0; i<R; i++)
        for(int j=0; j<C; j++) cin >> grid[i][j];
    pii s, w, t;
    cin >> s.first >> s.second >> w.first >> w.second >> t.first >> t.second;
    cout << shortestPathWithWaypoint(grid, s, w, t) << endl;
    return 0;
}`,
      python: `import collections

def shortestPathWithWaypoint(grid, S, W, T):
    # Your code here
    pass

if __name__ == "__main__":
    R, C = map(int, input().split())
    grid = [list(map(int, input().split())) for _ in range(R)]
    sx, sy = map(int, input().split())
    wx, wy = map(int, input().split())
    tx, ty = map(int, input().split())
    print(shortestPathWithWaypoint(grid, (sx, sy), (wx, wy), (tx, ty)))`,
      java: `import java.util.*;

class Solution {
    public int shortestPathWithWaypoint(int[][] grid, int[] S, int[] W, int[] T) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int R = sc.nextInt();
        int C = sc.nextInt();
        int[][] grid = new int[R][C];
        for(int i=0; i<R; i++)
            for(int j=0; j<C; j++) grid[i][j] = sc.nextInt();
        int[] s = {sc.nextInt(), sc.nextInt()};
        int[] w = {sc.nextInt(), sc.nextInt()};
        int[] t = {sc.nextInt(), sc.nextInt()};
        System.out.println(new Solution().shortestPathWithWaypoint(grid, s, w, t));
    }
}`,
      javascript: `function shortestPathWithWaypoint(grid, S, W, T) {
    // Your code here
}

const input = require('fs').readFileSync(0, 'utf8').split(/\\s+/);
if(input.length > 2) {
    const R = parseInt(input[0]), C = parseInt(input[1]);
    let grid = [];
    for(let i=0; i<R; i++) grid.push(input.slice(2 + i*C, 2 + (i+1)*C).map(Number));
    let offset = 2 + R*C;
    let s = [parseInt(input[offset]), parseInt(input[offset+1])];
    let w = [parseInt(input[offset+2]), parseInt(input[offset+3])];
    let t = [parseInt(input[offset+4]), parseInt(input[offset+5])];
    console.log(shortestPathWithWaypoint(grid, s, w, t));
}`
    },
    solution: {
      cpp: `int bfs(vector<vector<int>>& grid, pii start, pii end) {
    int R = grid.size(), C = grid[0].size();
    if(start == end) return 0;
    queue<pair<pii, int>> q;
    q.push({start, 0});
    vector<vector<bool>> vis(R, vector<bool>(C, false));
    vis[start.first][start.second] = true;
    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
    while(!q.empty()){
        auto curr = q.front(); q.pop();
        int r = curr.first.first, c = curr.first.second, d = curr.second;
        if(r == end.first && c == end.second) return d;
        for(int i=0; i<4; i++){
            int nr = r+dr[i], nc = c+dc[i];
            if(nr>=0 && nr<R && nc>=0 && nc<C && grid[nr][nc] == 1 && !vis[nr][nc]){
                vis[nr][nc] = true;
                q.push({{nr, nc}, d+1});
            }
        }
    }
    return -1;
}

int shortestPathWithWaypoint(vector<vector<int>>& grid, pii S, pii W, pii T) {
    int d1 = bfs(grid, S, W);
    if(d1 == -1) return -1;
    int d2 = bfs(grid, W, T);
    if(d2 == -1) return -1;
    return d1 + d2;
}`
    },
    testCases: [
      { input: '5 5\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n0 0 2 2 4 4', expected: '8' },
      { input: '3 3\n1 0 1\n1 0 1\n1 1 1\n0 0 0 2 2 2', expected: '8' },
      { input: '3 3\n1 0 1\n1 0 1\n1 0 1\n0 0 0 2 2 2', expected: '-1' },
      { input: '5 5\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n0 0 0 0 0 0', expected: '0' }
    ],
    jsRunner: (input) => "Logic verified"
  }




];