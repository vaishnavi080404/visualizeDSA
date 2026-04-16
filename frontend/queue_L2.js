let queueData = [];
let codeEditor;
let currentLang = "cpp";
let currentImpl = "array";
let outputDiv;
let waitingForInput = false;
let currentInputResolver = null;

const codeTemplates = {
  array: {
    cpp: `#include <iostream>
#define MAX 100
using namespace std;

class Queue {
    int arr[MAX];
    int front, rear, size;
public:
    Queue() { front = 0; rear = 0; size = 0; }
    
    void enqueue(int x) {
        if (size == MAX) {
            cout << "Queue Overflow\\n";
            return;
        }
        arr[rear++] = x;
        size++;
        cout << "Enqueued: " << x << "\\n";
    }
    
    int dequeue() {
        if (size == 0) {
            cout << "Queue Underflow\\n";
            return -1;
        }
        int val = arr[front++];
        size--;
        return val;
    }
    
    int peek() { return (size == 0) ? -1 : arr[front]; }
    bool isEmpty() { return size == 0; }
    int getSize() { return size; }
};

int main() {
    Queue q;
    int n, value;
    
    cout << "Enter number of elements: ";
    cin >> n;
    
    for(int i = 0; i < n; i++) {
        cout << "Enter element " << (i+1) << ": ";
        cin >> value;
        q.enqueue(value);
    }
    
    cout << "\\nSize: " << q.getSize() << "\\n";
    cout << "Front: " << q.peek() << "\\n\\n";
    
    while(!q.isEmpty()) {
        cout << "Dequeued: " << q.dequeue() << "\\n";
    }
    return 0;
}`,
    python: `class ArrayQueue:
    def __init__(self, capacity=100):
        self.arr = [None] * capacity
        self.front = 0
        self.rear = 0
        self.size = 0
        self.capacity = capacity
    
    def enqueue(self, item):
        if self.size == self.capacity:
            return "Queue Overflow"
        self.arr[self.rear] = item
        self.rear += 1
        self.size += 1
        return f"Enqueued: {item}"
    
    def dequeue(self):
        if self.size == 0:
            return "Queue Underflow"
        val = self.arr[self.front]
        self.front += 1
        self.size -= 1
        return f"Dequeued: {val}"
    
    def peek(self):
        return "Empty" if self.size == 0 else self.arr[self.front]
    
    def is_empty(self):
        return self.size == 0
    
    def get_size(self):
        return self.size

q = ArrayQueue()
n = int(input("Enter number of elements: "))

for i in range(n):
    value = int(input(f"Enter element {i+1}: "))
    print(q.enqueue(value))

print(f"\\nSize: {q.get_size()}")
print(f"Front: {q.peek()}\\n")

while not q.is_empty():
    print(q.dequeue())`,
    java: `class ArrayQueue {
    private int[] arr;
    private int front, rear, size, capacity;
    
    public ArrayQueue(int cap) {
        arr = new int[cap];
        capacity = cap;
        front = 0;
        rear = 0;
        size = 0;
    }
    
    public void enqueue(int x) {
        if (size == capacity) {
            System.out.println("Queue Overflow");
            return;
        }
        arr[rear++] = x;
        size++;
        System.out.println("Enqueued: " + x);
    }
    
    public int dequeue() {
        if (size == 0) {
            System.out.println("Queue Underflow");
            return -1;
        }
        int val = arr[front++];
        size--;
        return val;
    }
    
    public int peek() { return (size == 0) ? -1 : arr[front]; }
    public boolean isEmpty() { return size == 0; }
    public int getSize() { return size; }
}`,
    c: `#include <stdio.h>
#define MAX 100

typedef struct {
    int arr[MAX];
    int front, rear, size;
} Queue;

void enqueue(Queue* q, int x) {
    if (q->size == MAX) {
        printf("Queue Overflow\\n");
        return;
    }
    q->arr[q->rear++] = x;
    q->size++;
    printf("Enqueued: %d\\n", x);
}

int dequeue(Queue* q) {
    if (q->size == 0) {
        printf("Queue Underflow\\n");
        return -1;
    }
    int val = q->arr[q->front++];
    q->size--;
    return val;
}

int main() {
    Queue q = {.front = 0, .rear = 0, .size = 0};
    int n, value;
    
    printf("Enter number of elements: ");
    scanf("%d", &n);
    
    for(int i = 0; i < n; i++) {
        printf("Enter element %d: ", i+1);
        scanf("%d", &value);
        enqueue(&q, value);
    }
    
    printf("\\nSize: %d\\n", q.size);
    printf("Front: %d\\n\\n", q.arr[q.front]);
    
    while(q.size > 0) {
        printf("Dequeued: %d\\n", dequeue(&q));
    }
    return 0;
}`,
    javascript: `class ArrayQueue {
    constructor(capacity = 100) {
        this.arr = new Array(capacity);
        this.front = 0;
        this.rear = 0;
        this.size = 0;
        this.capacity = capacity;
    }
    
    enqueue(item) {
        if (this.size === this.capacity) {
            return "Queue Overflow";
        }
        this.arr[this.rear++] = item;
        this.size++;
        console.log("Enqueued: " + item);
    }
    
    dequeue() {
        if (this.size === 0) {
            return "Queue Underflow";
        }
        const val = this.arr[this.front++];
        this.size--;
        return val;
    }
    
    peek() { return this.size === 0 ? null : this.arr[this.front]; }
    isEmpty() { return this.size === 0; }
    getSize() { return this.size; }
}

const q = new ArrayQueue();
[10, 20, 30].forEach(x => q.enqueue(x));
console.log("\\nSize: " + q.getSize());
console.log("Front: " + q.peek() + "\\n");
while(!q.isEmpty()) {
    console.log("Dequeued: " + q.dequeue());
}`,
  },
  linkedlist: {
    cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedListQueue {
    Node *front, *rear;
public:
    LinkedListQueue() : front(nullptr), rear(nullptr) {}
    
    void enqueue(int x) {
        Node* temp = new Node(x);
        if (rear == nullptr) {
            front = rear = temp;
        } else {
            rear->next = temp;
            rear = temp;
        }
        cout << "Enqueued: " << x << "\\n";
    }
    
    int dequeue() {
        if (front == nullptr) {
            cout << "Queue Underflow\\n";
            return -1;
        }
        Node* temp = front;
        int val = temp->data;
        front = front->next;
        if (front == nullptr) rear = nullptr;
        delete temp;
        return val;
    }
    
    int peek() { return (front == nullptr) ? -1 : front->data; }
    bool isEmpty() { return front == nullptr; }
};

int main() {
    LinkedListQueue q;
    int n, value;
    
    cout << "Enter number of elements: ";
    cin >> n;
    
    for(int i = 0; i < n; i++) {
        cout << "Enter element " << (i+1) << ": ";
        cin >> value;
        q.enqueue(value);
    }
   cout << "\\nFront: " << q.peek() << "\\n\\n";
    
    while(!q.isEmpty()) {
        cout << "Dequeued: " << q.dequeue() << "\\n";
    }
    return 0;
}`,
    python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedListQueue:
    def __init__(self):
        self.front = None
        self.rear = None
        self.size = 0

    def enqueue(self, item):
        new_node = Node(item)
        if self.rear is None:
            self.front = self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
        self.size += 1
        return f"Enqueued: {item}"

    def dequeue(self):
        if self.front is None:
            return "Queue Underflow"
        temp = self.front
        self.front = temp.next
        if self.front is None:
            self.rear = None
        self.size -= 1
        return f"Dequeued: {temp.data}"

    def peek(self):
        return self.front.data if self.front else "Empty"

q = LinkedListQueue()
n = int(input("Enter count: "))
for i in range(n):
    val = int(input(f"Val {i+1}: "))
    print(q.enqueue(val))

print(f"\\nFront: {q.peek()}")`,
    java: `class Node {
    int data; Node next;
    Node(int d) { data = d; next = null; }
}

class LLQueue {
    Node front, rear;
    void enqueue(int x) {
        Node temp = new Node(x);
        if (rear == null) { front = rear = temp; return; }
        rear.next = temp;
        rear = temp;
    }
    int dequeue() {
        if (front == null) return -1;
        int val = front.data;
        front = front.next;
        if (front == null) rear = null;
        return val;
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Queue {
    struct Node *front, *rear;
};

void enqueue(struct Queue* q, int x) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->data = x;
    temp->next = NULL;
    if (q->rear == NULL) {
        q->front = q->rear = temp;
        return;
    }
    q->rear->next = temp;
    q->rear = temp;
}

int main() {
    printf("Linked List Queue Implementation\\n");
    return 0;
}`,
    javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListQueue {
    constructor() {
        this.front = null;
        this.rear = null;
    }

    enqueue(data) {
        const newNode = new Node(data);
        if (!this.rear) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        console.log("Enqueued:", data);
    }

    dequeue() {
        if (!this.front) return null;
        const data = this.front.data;
        this.front = this.front.next;
        if (!this.front) this.rear = null;
        return data;
    }
}

const q = new LinkedListQueue();
q.enqueue(10);
q.enqueue(20);
console.log("Dequeued:", q.dequeue());`,
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("code-editor");
  codeEditor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true,
    theme: "material-ocean",
    mode: "text/x-c++src",
    indentUnit: 4,
    autoCloseBrackets: true,
  });
  updateEditorContent();
  outputDiv = document.getElementById("codeOutput");
});

const themeToggle = document.getElementById("themeToggle");
const themes = ["dark", "light", "blue"];
let currentThemeIndex = 0;

themeToggle.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const newTheme = themes[currentThemeIndex];
  document.body.setAttribute("data-theme", newTheme);
  const cmTheme =
    newTheme === "light"
      ? "eclipse"
      : newTheme === "blue"
        ? "nord"
        : "material-ocean";
  codeEditor.setOption("theme", cmTheme);
});

function switchImplementation(type) {
  currentImpl = type;
  document
    .querySelectorAll(".impl-option")
    .forEach((opt) => opt.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");

  const arrayView = document.getElementById("arrayQueue");
  const llView = document.getElementById("linkedListQueue");
  const title = document.getElementById("visualizer-title");

  if (type === "array") {
    arrayView.style.display = "flex";
    llView.style.display = "none";
    title.innerText = "Queue Visualizer - Array Implementation";
    document.getElementById("pseudo-enqueue-text").innerText =
      "queue[rear++] = element";
    document.getElementById("pseudo-dequeue-text").innerText =
      "return queue[front++]";
  } else {
    arrayView.style.display = "none";
    llView.style.display = "flex";
    title.innerText = "Queue Visualizer - Linked List Implementation";
    document.getElementById("pseudo-enqueue-text").innerText =
      "newNode.next = null; rear.next = newNode;";
    document.getElementById("pseudo-dequeue-text").innerText =
      "temp = front; front = front.next; free(temp);";
  }

  queueData = [];
  renderQueue();
  updateEditorContent();
}

function highlightStep(stepId) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  document.querySelector(`[data-step="${stepId}"]`).classList.add("active");
}

function showMsg(text, type) {
  const msg = document.getElementById("msg_show");
  msg.innerText = text;
  msg.className = `alert-${type}`;
  msg.style.display = "block";
  setTimeout(() => (msg.style.display = "none"), 3000);
}

function renderQueue() {
  const arrayContainer = document.getElementById("arrayQueue");
  const llContainer = document.getElementById("linkedListQueue");

  arrayContainer.innerHTML = "";
  llContainer.innerHTML = "";

  queueData.forEach((val, index) => {
    // Array View
    const el = document.createElement("div");
    el.className = "queue-element";
    el.innerText = val;
    arrayContainer.appendChild(el);

    const node = document.createElement("div");
    node.className = "ll-node";
    node.innerHTML = `
            <div class="ll-node-box">
                <div class="ll-node-data">${val}</div>
                <div class="ll-node-next">ptr</div>
            </div>
            ${index === queueData.length - 1 ? '<div class="ll-arrow">→</div><div class="ll-null">NULL</div>' : '<div class="ll-arrow">→</div>'}
        `;
    llContainer.appendChild(node);
  });
}

function enqueue() {
  const input = document.getElementById("queueInput");
  const val = input.value.trim();
  if (!val) return;

  if (queueData.length >= 8) {
    showMsg("Queue Overflow!", "danger");
    return;
  }

  highlightStep("enqueue");
  queueData.push(val);
  renderQueue();
  input.value = "";
  showMsg(`Enqueued ${val} successfully`, "success");
}

function dequeue() {
  if (queueData.length === 0) {
    showMsg("Queue Underflow!", "danger");
    highlightStep("dequeue");
    return;
  }

  highlightStep("dequeue");
  const container =
    currentImpl === "array"
      ? document.getElementById("arrayQueue")
      : document.getElementById("linkedListQueue");
  const firstEl = container.firstChild;

  if (firstEl) {
    firstEl.classList.add("removing");
    setTimeout(() => {
      queueData.shift();
      renderQueue();
      showMsg("Element dequeued from front", "info");
    }, 500);
  }
}

function peek() {
  highlightStep("peek");
  if (queueData.length === 0) showMsg("Queue is empty", "danger");
  else showMsg(`Front Element: ${queueData[0]}`, "warning");
}

function isEmptyCheck() {
  highlightStep("isEmpty");
  showMsg(
    queueData.length === 0 ? "Yes, Queue is empty" : "No, Queue has elements",
    "primary",
  );
}

function getSize() {
  highlightStep("size");
  showMsg(`Current Size: ${queueData.length}`, "info");
}

function updateEditorContent() {
  const modeMap = {
    cpp: "text/x-c++src",
    python: "text/x-python",
    java: "text/x-java",
    c: "text/x-csrc",
    javascript: "text/javascript",
  };
  codeEditor.setOption("mode", modeMap[currentLang]);
  codeEditor.setValue(codeTemplates[currentImpl][currentLang]);
  document.querySelector(".lang-display").innerText = currentLang.toUpperCase();
}

document.querySelectorAll(".lang-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".lang-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentLang = tab.getAttribute("data-lang");
    updateEditorContent();
  });
});

function copyCode() {
  navigator.clipboard.writeText(codeEditor.getValue());
  const btn = document.querySelector(".code-copy");
  btn.innerText = "Saved!";
  setTimeout(() => (btn.innerText = "Copy"), 2000);
}

function runInteractiveCode() {
  outputDiv.innerHTML = "Compiling and running...<br>";
  setTimeout(() => {
    outputDiv.innerHTML += `<span style="color: var(--primary-cyan)">[Process Started]</span><br>`;
    if (currentLang === "javascript") {
      try {
        const logs = [];
        const oldLog = console.log;
        console.log = (...args) => logs.push(args.join(" "));
        eval(codeEditor.getValue());
        console.log = oldLog;
        outputDiv.innerHTML +=
          logs.join("<br>") || "Program finished with no output.";
      } catch (e) {
        outputDiv.innerHTML += `<span style="color: var(--primary-red)">Error: ${e.message}</span>`;
      }
    } else {
      // Simulated for others
      outputDiv.innerHTML += `Output of ${currentLang.toUpperCase()} program:<br>Enqueued: 10<br>Enqueued: 20<br>Size: 2<br>Front: 10<br>Dequeued: 10`;
    }
  }, 1000);
}

const ALGO_KEY = document.title
  .split(" - ")[0]
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "_");
const L2_KEY = `${ALGO_KEY}_l2_unlocked`;
const L3_KEY = `${ALGO_KEY}_l3_unlocked`;

const btnL2 = document.getElementById("l2");
const btnL3 = document.getElementById("l3");
const modal = document.getElementById("quizModal");
const cancelBtn = document.getElementById("cancelBtn");
const startQuizBtn = document.getElementById("startQuiz");

function updateLevelButtons() {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  const l3Unlocked = localStorage.getItem(L3_KEY) === "true";

  if (l2Unlocked) {
    btnL2.style.borderColor = "var(--primary-green)";
    btnL2.style.background = "rgba(16, 185, 129, 0.15)";
    btnL2.style.color = "var(--primary-green)";
    btnL2.title = "Unlocked";
  }
  if (l3Unlocked) {
    btnL3.style.borderColor = "var(--primary-green)";
    btnL3.style.background = "rgba(16, 185, 129, 0.15)";
    btnL3.style.color = "var(--primary-green)";
    btnL3.title = "Unlocked";
  }
}

btnL2.onclick = () => {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  if (l2Unlocked) {
    // Already unlocked — go directly, no modal
    window.location.href = `${ALGO_KEY}_L2.html`;
  } else {
    // Not yet unlocked — show quiz modal
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
  }
};

btnL3.onclick = () => {
  const l2Unlocked = localStorage.getItem(L2_KEY) === "true";
  const l3Unlocked = localStorage.getItem(L3_KEY) === "true";
  if (l3Unlocked) {
    window.location.href = `${ALGO_KEY}_L3.html`;
  } else if (!l2Unlocked) {
    // L2 not even unlocked yet — prompt L1 quiz first
    modal.querySelector("p").textContent =
      "Pass the Level 1 Quiz to unlock Level 2 first before accessing Level 3.";
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
  } else {
    modal.querySelector("p").textContent =
      "Pass the Level 2 Quiz to unlock Level 3 and complete your journey.";
    modal.style.display = "flex";
    startQuizBtn.onclick = () =>
      (window.location.href = `quiz.html?id=${ALGO_KEY}-l2`);
  }
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
  // Reset modal text in case it was changed
  modal.querySelector("p").textContent =
    `Pass the Level 1 Quiz to unlock Level 2 and continue your journey.`;
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("p").textContent =
      `Pass the Level 1 Quiz to unlock Level 2 and continue your journey.`;
  }
};

const Q_COLORS = [
  "#06b6d4",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
];

function qMakeBlock(val, colorIdx) {
  const b = document.createElement("div");
  b.className = "q-block enq-in";
  b.style.background = Q_COLORS[colorIdx % Q_COLORS.length];
  b.textContent = val;
  return b;
}

function qUpdateSize(trackEl, sizeEl) {
  const n = trackEl.querySelectorAll(".q-block").length;
  sizeEl.textContent = "Size: " + n;
  const empty = trackEl.querySelector(".q-track-empty");
  if (empty) empty.style.display = n === 0 ? "" : "none";
}

function qAddLog(logEl, text, cls) {
  const e = document.createElement("div");
  e.className = "q-log-entry " + (cls || "q-log-info");
  e.textContent = "> " + text;
  logEl.appendChild(e);
  logEl.scrollTop = logEl.scrollHeight;
}

const Q_TAB_CLASS = {
  best: "qtab-best",
  avg: "qtab-avg",
  worst: "qtab-worst",
  custom: "qtab-custom",
};

function qSwitchScenario(name) {
  document.querySelectorAll(".q-scenario-tab").forEach((t) => {
    t.className = "q-scenario-tab";
  });
  document.getElementById("qstab-" + name).classList.add(Q_TAB_CLASS[name]);
  document
    .querySelectorAll(".q-scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("qspanel-" + name).classList.add("active");
}

let qBestData = [10, 20, 30];
let qBestColorIdx = 3;

function qInitBest() {
  const track = document.getElementById("qtrack-best");
  const sizeEl = document.getElementById("qsize-best");
  const log = document.getElementById("qlog-best");

  [...track.querySelectorAll(".q-block")].forEach((b) => b.remove());
  log.innerHTML = '<div class="q-log-title">📋 Operation Log</div>';
  qBestData.forEach((v, i) => track.appendChild(qMakeBlock(v, i)));
  qUpdateSize(track, sizeEl);
  qAddLog(log, "Queue initialized: [10 → 20 → 30]", "q-log-info");
  qAddLog(log, "FRONT=10, REAR=30", "q-log-info");
  qAddLog(log, "Enqueue / Dequeue / Peek: all O(1)", "q-log-info");
}

function qBestEnqueue() {
  const track = document.getElementById("qtrack-best");
  const sizeEl = document.getElementById("qsize-best");
  const log = document.getElementById("qlog-best");
  if (track.querySelectorAll(".q-block").length >= 8) {
    qAddLog(log, "Queue Overflow! (max 8)", "q-log-warn");
    return;
  }
  const val = Math.floor(Math.random() * 90) + 10;
  qBestData.push(val);
  track.appendChild(qMakeBlock(val, qBestColorIdx++));
  qUpdateSize(track, sizeEl);
  qAddLog(log, "enqueue(" + val + ")  →  rear = " + val, "q-log-enq");
  qAddLog(log, "✓ Time: O(1) | Space: O(1)", "q-log-result");
}

function qBestDequeue() {
  const track = document.getElementById("qtrack-best");
  const sizeEl = document.getElementById("qsize-best");
  const log = document.getElementById("qlog-best");
  const first = track.querySelector(".q-block");
  if (!first) {
    qAddLog(log, "Queue Underflow! Empty.", "q-log-warn");
    return;
  }
  const val = first.textContent;
  first.classList.remove("enq-in");
  first.classList.add("deq-out");
  setTimeout(() => {
    first.remove();
    qUpdateSize(track, sizeEl);
  }, 380);
  qBestData.shift();
  qAddLog(log, "dequeue()  →  removed FRONT=" + val, "q-log-deq");
  qAddLog(log, "✓ Time: O(1) | Space: O(1)", "q-log-result");
}

function qBestPeek() {
  const track = document.getElementById("qtrack-best");
  const log = document.getElementById("qlog-best");
  const first = track.querySelector(".q-block");
  if (!first) {
    qAddLog(log, "Queue is empty!", "q-log-warn");
    return;
  }
  const val = first.textContent;
  first.classList.add("q-highlight");
  setTimeout(() => first.classList.remove("q-highlight"), 900);
  qAddLog(log, "peek()  →  FRONT=" + val + " (no removal)", "q-log-peek");
  qAddLog(log, "✓ Time: O(1) | Space: O(1)", "q-log-result");
}

function qResetBest() {
  qBestData = [10, 20, 30];
  qBestColorIdx = 3;
  qInitBest();
}

const Q_AVG_DATA = [10, 20, 30, 40, 50];
const Q_AVG_TARGET = 30;
let qAvgRemaining = [];
let qAvgDequeued = 0;
let qAvgFound = false;
let qAvgAutoTimer = null;

function qInitAvg() {
  const track = document.getElementById("qtrack-avg");
  const sizeEl = document.getElementById("qsize-avg");
  const log = document.getElementById("qlog-avg");
  [...track.querySelectorAll(".q-block")].forEach((b) => b.remove());
  log.innerHTML = '<div class="q-log-title">📋 Operation Log</div>';
  qAvgRemaining = [...Q_AVG_DATA];
  qAvgDequeued = 0;
  qAvgFound = false;
  clearTimeout(qAvgAutoTimer);
  Q_AVG_DATA.forEach((v, i) => track.appendChild(qMakeBlock(v, i)));
  qUpdateSize(track, sizeEl);
  document.getElementById("qavg-step-btn").disabled = false;
  document.getElementById("qavg-auto-btn").disabled = false;
  qAddLog(log, "Queue: [" + Q_AVG_DATA.join(" → ") + "]", "q-log-info");
  qAddLog(log, "Searching for: " + Q_AVG_TARGET, "q-log-info");
  qAddLog(
    log,
    "Expected: ~" + Math.ceil(Q_AVG_DATA.length / 2) + " dequeues (average)",
    "q-log-info",
  );
}

function qAvgStep() {
  if (qAvgFound || !qAvgRemaining.length) return;
  const track = document.getElementById("qtrack-avg");
  const sizeEl = document.getElementById("qsize-avg");
  const log = document.getElementById("qlog-avg");
  const first = track.querySelector(".q-block");
  if (!first) return;
  const val = parseInt(first.textContent);
  qAvgDequeued++;

  first.classList.add("q-checking");
  setTimeout(() => {
    first.classList.remove("q-checking");
    first.classList.add("deq-out");
    setTimeout(() => {
      first.remove();
      qAvgRemaining.shift();
      qUpdateSize(track, sizeEl);
    }, 380);
  }, 320);

  if (val === Q_AVG_TARGET) {
    qAvgFound = true;
    qAddLog(log, "dequeue() → " + val + "  ← FOUND! 🎉", "q-log-enq");
    qAddLog(
      log,
      "Dequeues: " +
        qAvgDequeued +
        "  (N=" +
        Q_AVG_DATA.length +
        ", N/2≈" +
        Math.ceil(Q_AVG_DATA.length / 2) +
        ")",
      "q-log-result",
    );
    qAddLog(log, "✓ Average Case: O(N/2) = O(N)", "q-log-result");
    document.getElementById("qavg-step-btn").disabled = true;
    document.getElementById("qavg-auto-btn").disabled = true;
    clearTimeout(qAvgAutoTimer);
  } else {
    qAddLog(log, "dequeue() → " + val + "  ≠ " + Q_AVG_TARGET, "q-log-deq");
    if (!qAvgRemaining.length) {
      qAddLog(
        log,
        "Queue empty — not found after " + qAvgDequeued + " dequeues.",
        "q-log-warn",
      );
      document.getElementById("qavg-step-btn").disabled = true;
      document.getElementById("qavg-auto-btn").disabled = true;
    }
  }
}

function qAvgAuto() {
  if (qAvgFound || !qAvgRemaining.length) return;
  document.getElementById("qavg-auto-btn").disabled = true;
  (function doStep() {
    if (qAvgFound || !qAvgRemaining.length) return;
    qAvgStep();
    qAvgAutoTimer = setTimeout(doStep, 1000);
  })();
}

function qResetAvg() {
  clearTimeout(qAvgAutoTimer);
  qInitAvg();
}

const Q_WORST_DATA = [10, 20, 30, 40, 50, 60];
const Q_WORST_TARGET = 99;
let qWorstRemaining = [];
let qWorstDequeued = 0;
let qWorstDone = false;
let qWorstAutoTimer = null;

function qInitWorst() {
  const track = document.getElementById("qtrack-worst");
  const sizeEl = document.getElementById("qsize-worst");
  const log = document.getElementById("qlog-worst");
  [...track.querySelectorAll(".q-block")].forEach((b) => b.remove());
  log.innerHTML = '<div class="q-log-title">📋 Operation Log</div>';
  qWorstRemaining = [...Q_WORST_DATA];
  qWorstDequeued = 0;
  qWorstDone = false;
  clearTimeout(qWorstAutoTimer);
  Q_WORST_DATA.forEach((v, i) => track.appendChild(qMakeBlock(v, i)));
  qUpdateSize(track, sizeEl);
  document.getElementById("qworst-step-btn").disabled = false;
  document.getElementById("qworst-auto-btn").disabled = false;
  qAddLog(log, "Queue: [" + Q_WORST_DATA.join(" → ") + "]", "q-log-info");
  qAddLog(
    log,
    "Searching for: " + Q_WORST_TARGET + " (NOT IN QUEUE)",
    "q-log-warn",
  );
  qAddLog(
    log,
    "Must dequeue ALL " + Q_WORST_DATA.length + " elements → O(N)",
    "q-log-warn",
  );
}

function qWorstStep() {
  if (qWorstDone || !qWorstRemaining.length) return;
  const track = document.getElementById("qtrack-worst");
  const sizeEl = document.getElementById("qsize-worst");
  const log = document.getElementById("qlog-worst");
  const first = track.querySelector(".q-block");
  if (!first) return;
  const val = parseInt(first.textContent);
  qWorstDequeued++;

  first.classList.add("q-checking");
  setTimeout(() => {
    first.classList.remove("q-checking");
    first.classList.add("deq-out");
    setTimeout(() => {
      first.remove();
      qWorstRemaining.shift();
      qUpdateSize(track, sizeEl);
    }, 380);
  }, 300);

  qAddLog(log, "dequeue() → " + val + "  ≠ " + Q_WORST_TARGET, "q-log-deq");

  if (!qWorstRemaining.length) {
    qWorstDone = true;
    setTimeout(() => {
      qAddLog(
        log,
        "Queue EMPTY — " + Q_WORST_TARGET + " not found ❌",
        "q-log-warn",
      );
      qAddLog(
        log,
        "Dequeues: " + qWorstDequeued + " = N  ← O(N) worst case",
        "q-log-result",
      );
      qAddLog(log, "⚠ All elements checked — element absent", "q-log-result");
    }, 450);
    document.getElementById("qworst-step-btn").disabled = true;
    document.getElementById("qworst-auto-btn").disabled = true;
    clearTimeout(qWorstAutoTimer);
  }
}

function qWorstAuto() {
  if (qWorstDone || !qWorstRemaining.length) return;
  document.getElementById("qworst-auto-btn").disabled = true;
  (function doStep() {
    if (qWorstDone || !qWorstRemaining.length) return;
    qWorstStep();
    qWorstAutoTimer = setTimeout(doStep, 750);
  })();
}

function qResetWorst() {
  clearTimeout(qWorstAutoTimer);
  qInitWorst();
}

let qCustomColorIdx = 0;
const Q_MAX_CUSTOM = 8;
let qCcTimer = null;

/* Highlight complexity card */
function qHighlightCC(type) {
  ["enqueue", "dequeue", "peek"].forEach((t) => {
    const c = document.getElementById("qcc-" + t);
    if (c) c.className = "q-cc-card";
  });
  clearTimeout(qCcTimer);
  const card = document.getElementById("qcc-" + type);
  if (card) {
    card.classList.add("qcc-active-" + type);
    qCcTimer = setTimeout(() => (card.className = "q-cc-card"), 1900);
  }
}

function qShowToast(type, msg) {
  const toast = document.getElementById("q-cc-toast");
  document.getElementById("q-cc-toast-icon").textContent =
    type === "enqueue"
      ? "➕"
      : type === "dequeue"
        ? "➖"
        : type === "peek"
          ? "👁"
          : "⚠";
  document.getElementById("q-cc-toast-text").textContent = msg;
  toast.className = "q-cc-toast show-toast qtoast-" + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.className = "q-cc-toast";
  }, 2500);
}

function qInitCustom() {
  const track = document.getElementById("qtrack-custom");
  const sizeEl = document.getElementById("qsize-custom");
  const log = document.getElementById("qlog-custom");
  [...track.querySelectorAll(".q-block")].forEach((b) => b.remove());
  log.innerHTML = '<div class="q-log-title">📋 Operation Log</div>';
  qCustomColorIdx = 0;
  qUpdateSize(track, sizeEl);
  qAddLog(log, "Custom queue ready. Enqueue a value!", "q-log-info");
}

function qCustomEnqueue() {
  const track = document.getElementById("qtrack-custom");
  const sizeEl = document.getElementById("qsize-custom");
  const log = document.getElementById("qlog-custom");
  const input = document.getElementById("q-custom-val");
  const raw = input.value.trim();

  if (raw === "" || isNaN(raw)) {
    qShowToast("warn", "Enter a valid number first!");
    qAddLog(log, "Enter a valid number first!", "q-log-warn");
    return;
  }
  if (track.querySelectorAll(".q-block").length >= Q_MAX_CUSTOM) {
    qShowToast("warn", "Queue Overflow! (max " + Q_MAX_CUSTOM + ")");
    qAddLog(log, "Queue Overflow! (max " + Q_MAX_CUSTOM + ")", "q-log-warn");
    return;
  }

  const val = parseInt(raw);
  track.appendChild(qMakeBlock(val, qCustomColorIdx++));
  qUpdateSize(track, sizeEl);
  qHighlightCC("enqueue");
  qShowToast("enqueue", "enqueue(" + val + ")  →  Time: O(1) | Space: O(1)");
  qAddLog(log, "enqueue(" + val + ")  →  added at REAR", "q-log-enq");
  qAddLog(
    log,
    "✓ Time: O(1) | Space: O(1) — rear pointer updated",
    "q-log-result",
  );
  input.value = "";
  input.focus();
}

function qCustomDequeue() {
  const track = document.getElementById("qtrack-custom");
  const sizeEl = document.getElementById("qsize-custom");
  const log = document.getElementById("qlog-custom");
  const first = track.querySelector(".q-block");

  if (!first) {
    qShowToast("warn", "Queue Underflow! Nothing to dequeue.");
    qAddLog(log, "Queue Underflow! Nothing to dequeue.", "q-log-warn");
    return;
  }

  const val = first.textContent;
  first.classList.remove("enq-in");
  first.classList.add("deq-out");
  setTimeout(() => {
    first.remove();
    qUpdateSize(track, sizeEl);
  }, 380);
  qHighlightCC("dequeue");
  qShowToast("dequeue", "dequeue()  →  Time: O(1) | Space: O(1)");
  qAddLog(log, "dequeue()  →  removed FRONT=" + val, "q-log-deq");
  qAddLog(
    log,
    "✓ Time: O(1) | Space: O(1) — front pointer updated",
    "q-log-result",
  );
}

function qCustomPeek() {
  const track = document.getElementById("qtrack-custom");
  const log = document.getElementById("qlog-custom");
  const first = track.querySelector(".q-block");

  if (!first) {
    qShowToast("warn", "Queue is empty — nothing to peek!");
    qAddLog(log, "Queue is empty — nothing to peek!", "q-log-warn");
    return;
  }

  const val = first.textContent;
  first.classList.add("q-highlight");
  setTimeout(() => first.classList.remove("q-highlight"), 900);
  qHighlightCC("peek");
  qShowToast("peek", "peek()  →  Time: O(1) | Space: O(1)");
  qAddLog(log, "peek()  →  FRONT=" + val + " (no removal)", "q-log-peek");
  qAddLog(
    log,
    "✓ Time: O(1) | Space: O(1) — reads front pointer only",
    "q-log-result",
  );
}

function qResetCustom() {
  ["enqueue", "dequeue", "peek"].forEach((t) => {
    const c = document.getElementById("qcc-" + t);
    if (c) c.className = "q-cc-card";
  });
  const toast = document.getElementById("q-cc-toast");
  if (toast) toast.className = "q-cc-toast";
  qInitCustom();
}

/* Enter key in custom input */
document.getElementById("q-custom-val").addEventListener("keydown", (e) => {
  if (e.key === "Enter") qCustomEnqueue();
});

qInitBest();
qInitAvg();
qInitWorst();
qInitCustom();
