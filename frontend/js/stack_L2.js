let stackData = [];
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

class Stack {
    int arr[MAX];
    int top;
public:
    Stack() { top = -1; }
    
    void push(int x) {
        if (top >= MAX - 1) {
            cout << "Stack Overflow\\n";
            return;
        }
        arr[++top] = x;
        cout << "Pushed: " << x << "\\n";
    }
    
    int pop() {
        if (top < 0) {
            cout << "Stack Underflow\\n";
            return -1;
        }
        return arr[top--];
    }
    
    int peek() { return (top < 0) ? -1 : arr[top]; }
    bool isEmpty() { return top < 0; }
    int size() { return top + 1; }
};

int main() {
    Stack s;
    int n, value;
    
    cout << "Enter number of elements: ";
    cin >> n;
    
    for(int i = 0; i < n; i++) {
        cout << "Enter element " << (i+1) << ": ";
        cin >> value;
        s.push(value);
    }
    
    cout << "\\nSize: " << s.size() << "\\n";
    cout << "Top: " << s.peek() << "\\n\\n";
    
    while(!s.isEmpty()) {
        cout << "Popped: " << s.pop() << "\\n";
    }
    return 0;
}`,
    python: `class ArrayStack:
    def __init__(self, capacity=100):
        self.arr = [None] * capacity
        self.top = -1
        self.capacity = capacity
    
    def push(self, item):
        if self.top >= self.capacity - 1:
            return "Stack Overflow"
        self.top += 1
        self.arr[self.top] = item
        return f"Pushed: {item}"
    
    def pop(self):
        if self.top < 0:
            return "Stack Underflow"
        item = self.arr[self.top]
        self.top -= 1
        return f"Popped: {item}"
    
    def peek(self):
        return "Empty" if self.top < 0 else self.arr[self.top]
    
    def is_empty(self):
        return self.top < 0
    
    def size(self):
        return self.top + 1

s = ArrayStack()
n = int(input("Enter number of elements: "))

for i in range(n):
    value = int(input(f"Enter element {i+1}: "))
    print(s.push(value))

print(f"\\nSize: {s.size()}")
print(f"Top: {s.peek()}\\n")

while not s.is_empty():
    print(s.pop())`,
    java: `class ArrayStack {
    private int[] arr;
    private int top;
    private int capacity;
    
    public ArrayStack(int size) {
        arr = new int[size];
        capacity = size;
        top = -1;
    }
    
    public void push(int x) {
        if (top >= capacity - 1) {
            System.out.println("Stack Overflow");
            return;
        }
        arr[++top] = x;
        System.out.println("Pushed: " + x);
    }
    
    public int pop() {
        if (top < 0) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return arr[top--];
    }
    
    public int peek() { return (top < 0) ? -1 : arr[top]; }
    public boolean isEmpty() { return top < 0; }
    public int size() { return top + 1; }
}`,
    c: `#include <stdio.h>
#define MAX 100

typedef struct {
    int arr[MAX];
    int top;
} Stack;

void push(Stack* s, int x) {
    if (s->top >= MAX - 1) {
        printf("Stack Overflow\\n");
        return;
    }
    s->arr[++(s->top)] = x;
    printf("Pushed: %d\\n", x);
}

int pop(Stack* s) {
    if (s->top < 0) {
        printf("Stack Underflow\\n");
        return -1;
    }
    return s->arr[(s->top)--];
}

int main() {
    Stack s;
    s.top = -1;
    int n, value;
    
    printf("Enter number of elements: ");
    scanf("%d", &n);
    
    for(int i = 0; i < n; i++) {
        printf("Enter element %d: ", i+1);
        scanf("%d", &value);
        push(&s, value);
    }
    
    printf("\\nSize: %d\\n", s.top + 1);
    printf("Top: %d\\n\\n", s.arr[s.top]);
    
    while(s.top >= 0) {
        printf("Popped: %d\\n", pop(&s));
    }
    return 0;
}`,
    javascript: `class ArrayStack {
    constructor(capacity = 100) {
        this.arr = new Array(capacity);
        this.top = -1;
        this.capacity = capacity;
    }
    
    push(item) {
        if (this.top >= this.capacity - 1) {
            return "Stack Overflow";
        }
        this.arr[++this.top] = item;
        console.log("Pushed: " + item);
    }
    
    pop() {
        if (this.top < 0) {
            return "Stack Underflow";
        }
        return this.arr[this.top--];
    }
    
    peek() { return this.top < 0 ? null : this.arr[this.top]; }
    isEmpty() { return this.top < 0; }
    size() { return this.top + 1; }
}

const s = new ArrayStack();
[10, 20, 30].forEach(x => s.push(x));
console.log("\\nSize: " + s.size());
console.log("Top: " + s.peek() + "\\n");
while(!s.isEmpty()) {
    console.log("Popped: " + s.pop());
}`,
  },
  linkedlist: {
    cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

class LinkedListStack {
    Node* head;
public:
    LinkedListStack() { head = NULL; }
    
    void push(int x) {
        Node* newNode = new Node();
        newNode->data = x;
        newNode->next = head;
        head = newNode;
        cout << "Pushed: " << x << "\\n";
    }
    
    int pop() {
        if (head == NULL) {
            cout << "Stack Underflow\\n";
            return -1;
        }
        Node* temp = head;
        int popped = temp->data;
        head = head->next;
        delete temp;
        return popped;
    }
    
    int peek() { return (head == NULL) ? -1 : head->data; }
    bool isEmpty() { return head == NULL; }
};

int main() {
    LinkedListStack s;
    int n, value;
    
    cout << "Enter number of elements: ";
    cin >> n;
    
    for(int i = 0; i < n; i++) {
        cout << "Enter element " << (i+1) << ": ";
        cin >> value;
        s.push(value);
    }
    
    cout << "\\nTop: " << s.peek() << "\\n\\n";
    
    while(!s.isEmpty()) {
        cout << "Popped: " << s.pop() << "\\n";
    }
    return 0;
}`,
    python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedListStack:
    def __init__(self):
        self.head = None
    
    def push(self, item):
        new_node = Node(item)
        new_node.next = self.head
        self.head = new_node
        return f"Pushed: {item}"
    
    def pop(self):
        if self.head is None:
            return "Stack Underflow"
        popped = self.head.data
        self.head = self.head.next
        return f"Popped: {popped}"
    
    def peek(self):
        return "Empty" if self.head is None else self.head.data
    
    def is_empty(self):
        return self.head is None

s = LinkedListStack()
n = int(input("Enter number of elements: "))

for i in range(n):
    value = int(input(f"Enter element {i+1}: "))
    print(s.push(value))

print(f"\\nTop: {s.peek()}\\n")

while not s.is_empty():
    print(s.pop())`,
    java: `class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

class LinkedListStack {
    Node head;
    
    void push(int x) {
        Node newNode = new Node(x);
        newNode.next = head;
        head = newNode;
        System.out.println("Pushed: " + x);
    }
    
    int pop() {
        if (head == null) {
            System.out.println("Stack Underflow");
            return -1;
        }
        int popped = head.data;
        head = head.next;
        return popped;
    }
    
    int peek() { return (head == null) ? -1 : head.data; }
    boolean isEmpty() { return head == null; }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* head = NULL;

void push(int x) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = x;
    newNode->next = head;
    head = newNode;
    printf("Pushed: %d\\n", x);
}

int pop() {
    if (head == NULL) {
        printf("Stack Underflow\\n");
        return -1;
    }
    Node* temp = head;
    int popped = temp->data;
    head = head->next;
    free(temp);
    return popped;
}

int main() {
    int n, value;
    printf("Enter number of elements: ");
    scanf("%d", &n);
    
    for(int i = 0; i < n; i++) {
        printf("Enter element %d: ", i+1);
        scanf("%d", &value);
        push(value);
    }
    
    printf("\\nTop: %d\\n\\n", head->data);
    
    while(head != NULL) {
        printf("Popped: %d\\n", pop());
    }
    return 0;
}`,
    javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListStack {
    constructor() {
        this.head = null;
    }
    
    push(item) {
        const newNode = new Node(item);
        newNode.next = this.head;
        this.head = newNode;
        console.log("Pushed: " + item);
    }
    
    pop() {
        if (this.head === null) {
            return "Stack Underflow";
        }
        const popped = this.head.data;
        this.head = this.head.next;
        return popped;
    }
    
    peek() { return this.head === null ? null : this.head.data; }
    isEmpty() { return this.head === null; }
}

const s = new LinkedListStack();
[10, 20, 30].forEach(x => s.push(x));
console.log("\\nTop: " + s.peek() + "\\n");
while(!s.isEmpty()) {
    console.log("Popped: " + s.pop());
}`,
  },
  deque: {
    cpp: `#include <iostream>
#include <deque>
using namespace std;

class DequeStack {
    deque<int> dq;
public:
    void push(int x) {
        dq.push_back(x);
        cout << "Pushed: " << x << "\\n";
    }
    
    int pop() {
        if (dq.empty()) {
            cout << "Stack Underflow\\n";
            return -1;
        }
        int popped = dq.back();
        dq.pop_back();
        return popped;
    }
    
    int peek() { return dq.empty() ? -1 : dq.back(); }
    bool isEmpty() { return dq.empty(); }
    int size() { return dq.size(); }
};

int main() {
    DequeStack s;
    int n, value;
    
    cout << "Enter number of elements: ";
    cin >> n;
    
    for(int i = 0; i < n; i++) {
        cout << "Enter element " << (i+1) << ": ";
        cin >> value;
        s.push(value);
    }
    
    cout << "\\nSize: " << s.size() << "\\n";
    cout << "Top: " << s.peek() << "\\n\\n";
    
    while(!s.isEmpty()) {
        cout << "Popped: " << s.pop() << "\\n";
    }
    return 0;
}`,
    python: `from collections import deque

class DequeStack:
    def __init__(self):
        self.dq = deque()
    
    def push(self, item):
        self.dq.append(item)
        return f"Pushed: {item}"
    
    def pop(self):
        if not self.dq:
            return "Stack Underflow"
        return f"Popped: {self.dq.pop()}"
    
    def peek(self):
        return "Empty" if not self.dq else self.dq[-1]
    
    def is_empty(self):
        return len(self.dq) == 0
    
    def size(self):
        return len(self.dq)

s = DequeStack()
n = int(input("Enter number of elements: "))

for i in range(n):
    value = int(input(f"Enter element {i+1}: "))
    print(s.push(value))

print(f"\\nSize: {s.size()}")
print(f"Top: {s.peek()}\\n")

while not s.is_empty():
    print(s.pop())`,
    java: `import java.util.Deque;
import java.util.ArrayDeque;

class DequeStack {
    Deque<Integer> dq = new ArrayDeque<>();
    
    void push(int x) {
        dq.addLast(x);
        System.out.println("Pushed: " + x);
    }
    
    int pop() {
        if (dq.isEmpty()) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return dq.removeLast();
    }
    
    int peek() { return dq.isEmpty() ? -1 : dq.peekLast(); }
    boolean isEmpty() { return dq.isEmpty(); }
    int size() { return dq.size(); }
}`,
    c: `// Deque implementation in C requires complex code
// This is a simplified version using dynamic array
#include <stdio.h>
#include <stdlib.h>

#define INITIAL_SIZE 10

typedef struct {
    int* arr;
    int top;
    int capacity;
} DequeStack;

void push(DequeStack* s, int x) {
    if (s->top >= s->capacity - 1) {
        s->capacity *= 2;
        s->arr = realloc(s->arr, s->capacity * sizeof(int));
    }
    s->arr[++(s->top)] = x;
    printf("Pushed: %d\\n", x);
}

int pop(DequeStack* s) {
    if (s->top < 0) {
        printf("Stack Underflow\\n");
        return -1;
    }
    return s->arr[(s->top)--];
}

int main() {
    DequeStack s;
    s.arr = malloc(INITIAL_SIZE * sizeof(int));
    s.top = -1;
    s.capacity = INITIAL_SIZE;
    
    int n, value;
    printf("Enter number of elements: ");
    scanf("%d", &n);
    
    for(int i = 0; i < n; i++) {
        printf("Enter element %d: ", i+1);
        scanf("%d", &value);
        push(&s, value);
    }
    
    printf("\\nTop: %d\\n\\n", s.arr[s.top]);
    
    while(s.top >= 0) {
        printf("Popped: %d\\n", pop(&s));
    }
    
    free(s.arr);
    return 0;
}`,
    javascript: `class DequeStack {
    constructor() {
        this.dq = [];
    }
    
    push(item) {
        this.dq.push(item);
        console.log("Pushed: " + item);
    }
    
    pop() {
        if (this.dq.length === 0) {
            return "Stack Underflow";
        }
        return this.dq.pop();
    }
    
    peek() { return this.dq.length === 0 ? null : this.dq[this.dq.length - 1]; }
    isEmpty() { return this.dq.length === 0; }
    size() { return this.dq.length; }
}

const s = new DequeStack();
[10, 20, 30].forEach(x => s.push(x));
console.log("\\nSize: " + s.size());
console.log("Top: " + s.peek() + "\\n");
while(!s.isEmpty()) {
    console.log("Popped: " + s.pop());
}`,
  },
};

const pseudoTexts = {
  array: {
    push: "stack[++top] = element",
    pop: "return stack[top--]",
    peek: "return stack[top]",
    empty: "return top == -1",
    size: "return top + 1",
  },
  linkedlist: {
    push: "newNode->next = head<br>head = newNode",
    pop: "temp = head<br>head = head->next",
    peek: "return head->data",
    empty: "return head == NULL",
    size: "count nodes from head",
  },
  deque: {
    push: "deque.push_back(element)",
    pop: "return deque.pop_back()",
    peek: "return deque.back()",
    empty: "return deque.empty()",
    size: "return deque.size()",
  },
};

function switchImplementation(type) {
  currentImpl = type;

  // Update UI
  document.querySelectorAll(".impl-option").forEach((opt) => {
    opt.classList.remove("active");
  });
  document.querySelector(`[data-type="${type}"]`).classList.add("active");

  // Update visualizer title
  const titles = {
    array: "Stack Visualizer - Array Implementation",
    linkedlist: "Stack Visualizer - Linked List Implementation",
    deque: "Stack Visualizer - Deque Implementation",
  };
  document.getElementById("visualizer-title").textContent = titles[type];

  // Update pseudo code
  document.getElementById("pseudo-push-text").innerHTML =
    pseudoTexts[type].push;
  document.getElementById("pseudo-pop-text").innerHTML = pseudoTexts[type].pop;
  document.getElementById("pseudo-peek-text").innerHTML =
    pseudoTexts[type].peek;
  document.getElementById("pseudo-empty-text").innerHTML =
    pseudoTexts[type].empty;
  document.getElementById("pseudo-size-text").innerHTML =
    pseudoTexts[type].size;

  // Show/hide appropriate visualizer
  document.getElementById("arrayStack").style.display =
    type === "array" ? "flex" : "none";
  document.getElementById("linkedListStack").style.display =
    type === "linkedlist" ? "flex" : "none";
  document.getElementById("dequeStack").style.display =
    type === "deque" ? "flex" : "none";

  // Clear and update code editor
  stackData = [];
  renderStack();
  codeEditor.setValue(codeTemplates[type][currentLang]);
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function highlightStep(step) {
  document
    .querySelectorAll(".pseudo-step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`.pseudo-step[data-step="${step}"]`);
  if (el) el.classList.add("active");
}

function showMsg(text, type) {
  const el = document.getElementById("msg_show");
  el.style.display = "block";
  el.className = `alert alert-${type}`;
  el.innerHTML = text;
}

function renderStack() {
  if (currentImpl === "array") {
    renderArrayStack();
  } else if (currentImpl === "linkedlist") {
    renderLinkedListStack();
  } else {
    renderDequeStack();
  }
}

function renderArrayStack() {
  const container = document.getElementById("arrayStack");
  container.innerHTML = "";
  stackData.forEach((val) => {
    const div = document.createElement("div");
    div.className = "stack-element";
    div.textContent = val;
    container.appendChild(div);
  });
}

function renderLinkedListStack() {
  const container = document.getElementById("linkedListStack");
  container.innerHTML = "";

  stackData
    .slice()
    .reverse()
    .forEach((val, idx) => {
      const nodeDiv = document.createElement("div");
      nodeDiv.className = "ll-node";

      const nodeBox = document.createElement("div");
      nodeBox.className = "ll-node-box";

      const dataDiv = document.createElement("div");
      dataDiv.className = "ll-node-data";
      dataDiv.textContent = val;

      const nextDiv = document.createElement("div");
      nextDiv.className = "ll-node-next";
      nextDiv.innerHTML = "→";

      nodeBox.appendChild(dataDiv);
      nodeBox.appendChild(nextDiv);
      nodeDiv.appendChild(nodeBox);

      if (idx < stackData.length - 1) {
        const arrow = document.createElement("span");
        arrow.className = "ll-arrow";
        arrow.textContent = "↓";
        nodeDiv.appendChild(arrow);
      } else {
        const nullSpan = document.createElement("span");
        nullSpan.className = "ll-null";
        nullSpan.textContent = "NULL";
        nodeDiv.appendChild(nullSpan);
      }

      container.appendChild(nodeDiv);
    });
}

function renderDequeStack() {
  const container = document.getElementById("dequeStack");
  container.innerHTML = "";
  stackData.forEach((val) => {
    const div = document.createElement("div");
    div.className = "deque-element";
    div.textContent = val;
    container.appendChild(div);
  });
}

// Stack Operations
async function push() {
  const input = document.getElementById("stackInput");
  const val = input.value.trim();
  if (!val) return;
  highlightStep("push");
  await sleep(400);
  stackData.push(val);
  renderStack();
  showMsg(`<i class="fas fa-check"></i> Pushed: ${val}`, "success");
  input.value = "";
}

async function pop() {
  highlightStep("pop");
  if (stackData.length === 0) {
    showMsg('<i class="fas fa-times"></i> Stack Underflow!', "danger");
    return;
  }

  // Mark element for removal
  const containers = [
    document.getElementById("arrayStack"),
    document.getElementById("linkedListStack"),
    document.getElementById("dequeStack"),
  ];

  containers.forEach((container) => {
    const lastEl = container.lastElementChild || container.firstElementChild;
    if (lastEl) lastEl.classList.add("removing");
  });

  await sleep(500);
  const popped = stackData.pop();
  renderStack();
  showMsg(`<i class="fas fa-trash"></i> Popped: ${popped}`, "danger");
}

function peek() {
  highlightStep("peek");
  if (stackData.length === 0) showMsg("Stack is Empty", "info");
  else showMsg(`Top element is: ${stackData[stackData.length - 1]}`, "info");
}

function isEmpty_check() {
  highlightStep("isEmpty");
  const empty = stackData.length === 0;
  showMsg(empty ? "Stack is Empty" : "Stack is NOT Empty", "info");
}

function size() {
  highlightStep("size");
  showMsg(`Stack size: ${stackData.length}`, "info");
}

function getCMTheme(webTheme) {
  if (webTheme === "light") return "eclipse";
  if (webTheme === "blue") return "nord";
  return "material-ocean";
}

function initEditor() {
  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  const cmTheme = getCMTheme(currentTheme);

  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-c++src",
    theme: cmTheme,
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });

  codeEditor.setValue(codeTemplates.array.cpp);
}

function switchLang(lang, tabBtn) {
  const parent = tabBtn.parentElement;
  parent
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  tabBtn.classList.add("active");

  const modeMap = {
    cpp: "text/x-c++src",
    python: "text/x-python",
    java: "text/x-java",
    c: "text/x-csrc",
    javascript: "text/javascript",
  };

  const langNames = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    c: "C",
    javascript: "JavaScript",
  };

  currentLang = lang;
  const headerSpan = document.querySelector(".lang-display");
  if (headerSpan) headerSpan.textContent = langNames[lang];

  codeEditor.setOption("mode", modeMap[lang]);
  codeEditor.setValue(codeTemplates[currentImpl][lang]);
}

document.querySelectorAll(".lang-tab").forEach((btn) => {
  btn.onclick = () => switchLang(btn.dataset.lang, btn);
});

function copyCode() {
  const code = codeEditor.getValue();
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector(".code-copy");
    const originalText = btn.textContent;
    btn.textContent = "✓";
    btn.style.background = "var(--primary-green)";
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "var(--primary-purple)";
    }, 2000);
  });
}

async function getInput(prompt) {
  return new Promise((resolve) => {
    const promptDiv = document.getElementById("inputPrompt");
    const promptText = document.getElementById("promptText");
    const inputField = document.getElementById("userInput");

    promptText.textContent = prompt;
    promptDiv.style.display = "block";
    inputField.value = "";
    inputField.focus();

    currentInputResolver = resolve;
    waitingForInput = true;
  });
}

function submitInput() {
  const inputField = document.getElementById("userInput");
  const value = inputField.value.trim();

  if (value && currentInputResolver) {
    const promptDiv = document.getElementById("inputPrompt");
    promptDiv.style.display = "none";
    waitingForInput = false;
    currentInputResolver(value);
    currentInputResolver = null;
  }
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitInput();
  }
});

async function runInteractiveCode() {
  outputDiv = document.getElementById("codeOutput");
  outputDiv.innerHTML =
    '<span style="color: #fbbf24;">🔄 Executing code...</span><br><br>';

  try {
    if (currentLang === "python") {
      await runSimulation("Python");
    } else if (currentLang === "javascript") {
      await runSimulation("JavaScript");
    } else {
      await runSimulation("C++");
    }
  } catch (error) {
    outputDiv.innerHTML += `<br><span style="color: #ef4444;">Error: ${error.message}</span>`;
  }
}

async function runSimulation(langName) {
  const implNames = {
    array: "Array-Based Stack",
    linkedlist: "Linked List Stack",
    deque: "Deque Stack",
  };

  outputDiv.innerHTML += `<span style="color: #06b6d4;">${implNames[currentImpl]} - ${langName}</span><br><br>`;

  const n = await getInput("Enter number of elements: ");
  outputDiv.innerHTML += `<span style="color: #a0a0a0;">Enter number of elements: </span>${n}<br><br>`;

  const stack = [];

  for (let i = 0; i < parseInt(n); i++) {
    const value = await getInput(`Enter element ${i + 1}: `);
    stack.push(parseInt(value));
    outputDiv.innerHTML += `<span style="color: #a0a0a0;">Enter element ${i + 1}: </span>${value}<br>`;
    outputDiv.innerHTML += `<span style="color: #10b981;">Pushed: ${value}</span><br>`;
  }

  outputDiv.innerHTML += `<br><span style="color: #06b6d4;">Size: ${stack.length}</span><br>`;
  outputDiv.innerHTML += `<span style="color: #06b6d4;">Top: ${stack[stack.length - 1]}</span><br><br>`;

  while (stack.length > 0) {
    const popped = stack.pop();
    outputDiv.innerHTML += `<span style="color: #ef4444;">Popped: ${popped}</span><br>`;
    await sleep(300);
  }

  outputDiv.innerHTML +=
    '<br><span style="color: #10b981;">✓ Stack is now empty!</span>';
}

// Theme Toggle
document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const current = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(current) + 1) % 3];
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("dsa-theme", next);
  if (window.syncThemeToServer) window.syncThemeToServer(next);

  const newCMTheme = getCMTheme(next);
  codeEditor.setOption("theme", newCMTheme);
};

//   Level Slider & Modal Logic (FIXED)
// Get the algorithm name from the page to use as a unique key
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
  const l2Unlocked = isLevelUnlocked(ALGO_KEY, 1);
  const l3Unlocked = isLevelUnlocked(ALGO_KEY, 2);

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
  const l2Unlocked = isLevelUnlocked(ALGO_KEY, 1);
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
  const l2Unlocked = isLevelUnlocked(ALGO_KEY, 1);
  const l3Unlocked = isLevelUnlocked(ALGO_KEY, 2);
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
    // L2 unlocked but L3 not — prompt L2 quiz
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

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

window.onload = () => {
  const savedTheme = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  initEditor();
  updateLevelButtons();
};

/*   COLOURS FOR BLOCKS   */
const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
];

/*  ─ HELPERS  ─ */
function makeBlock(val, colorIdx, extraClass = "") {
  const b = document.createElement("div");
  b.className = "s-block push-in " + extraClass;
  b.style.background = COLORS[colorIdx % COLORS.length];
  b.textContent = val;
  return b;
}

function updateTopArrow(towerEl, arrowEl) {
  const blocks = towerEl.querySelectorAll(".s-block");
  if (!blocks.length) {
    arrowEl.textContent = "";
    return;
  }
  arrowEl.textContent = "← TOP";
}

function addLog(logEl, text, cls = "log-info") {
  const e = document.createElement("div");
  e.className = "log-entry " + cls;
  e.textContent = "> " + text;
  logEl.appendChild(e);
  logEl.scrollTop = logEl.scrollHeight;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/*                             
   TAB SWITCHING
                             */
const TAB_ACTIVE = {
  best: "active-best",
  avg: "active-avg",
  worst: "active-worst",
  custom: "active-custom",
};

function switchScenario(name) {
  // tabs
  document.querySelectorAll(".scenario-tab").forEach((t) => {
    t.className = "scenario-tab"; // reset
  });
  document.getElementById("stab-" + name).classList.add(TAB_ACTIVE[name]);
  // panels
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}

/*                             
   BEST CASE
                             */
let bestStack = [10, 20, 30];
let bestColorIdx = 3;

function initBest() {
  const tower = document.getElementById("tower-best");
  const arrow = document.getElementById("top-arrow-best");
  const log = document.getElementById("log-best");
  tower.innerHTML = "";
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  bestStack.forEach((v, i) => tower.appendChild(makeBlock(v, i)));
  updateTopArrow(tower, arrow);
  addLog(log, "Stack initialized: [10, 20, 30]", "log-info");
  addLog(log, "Push / Pop / Peek are all O(1)", "log-info");
}

function bestPush() {
  const tower = document.getElementById("tower-best");
  const arrow = document.getElementById("top-arrow-best");
  const log = document.getElementById("log-best");
  if (tower.children.length >= 7) {
    addLog(log, "Stack Overflow! (max 7)", "log-warn");
    return;
  }
  const val = Math.floor(Math.random() * 90) + 10;
  bestStack.push(val);
  tower.appendChild(makeBlock(val, bestColorIdx++));
  updateTopArrow(tower, arrow);
  addLog(log, `push(${val})  →  top = ${val}`, "log-push");
  addLog(log, `✓ O(1) — constant time`, "log-result");
}

function bestPop() {
  const tower = document.getElementById("tower-best");
  const arrow = document.getElementById("top-arrow-best");
  const log = document.getElementById("log-best");
  if (!tower.children.length) {
    addLog(log, "Stack Underflow! Stack is empty.", "log-warn");
    return;
  }
  const top = tower.lastChild;
  const val = top.textContent;
  top.classList.remove("push-in");
  top.classList.add("pop-out");
  setTimeout(() => {
    tower.removeChild(top);
    updateTopArrow(tower, arrow);
  }, 350);
  bestStack.pop();
  addLog(log, `pop()  →  removed ${val}`, "log-pop");
  addLog(log, `✓ O(1) — constant time`, "log-result");
}

function bestPeek() {
  const tower = document.getElementById("tower-best");
  const log = document.getElementById("log-best");
  if (!tower.children.length) {
    addLog(log, "Stack is empty — nothing to peek!", "log-warn");
    return;
  }
  const val = tower.lastChild.textContent;
  tower.lastChild.classList.add("highlight");
  setTimeout(
    () => tower.lastChild && tower.lastChild.classList.remove("highlight"),
    800,
  );
  addLog(log, `peek()  →  top = ${val}  (no removal)`, "log-peek");
  addLog(log, `✓ O(1) — constant time`, "log-result");
}

function resetBest() {
  bestStack = [10, 20, 30];
  bestColorIdx = 3;
  initBest();
  addLog(
    document.getElementById("log-best"),
    "↺ Reset to [10, 20, 30]",
    "log-info",
  );
}

/*                             
   AVERAGE CASE — search for element ~N/2 pops
                             */
const AVG_DATA = [10, 20, 30, 40, 50]; // 20 is at position 4 from bottom = 2nd from top
const AVG_TARGET = 20;
let avgRemaining = [];
let avgPopped = 0;
let avgFound = false;
let avgAutoTimer = null;

function initAvg() {
  const tower = document.getElementById("tower-avg");
  const arrow = document.getElementById("top-arrow-avg");
  const log = document.getElementById("log-avg");
  tower.innerHTML = "";
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  avgRemaining = [...AVG_DATA];
  avgPopped = 0;
  avgFound = false;
  clearTimeout(avgAutoTimer);
  AVG_DATA.forEach((v, i) => tower.appendChild(makeBlock(v, i)));
  updateTopArrow(tower, arrow);
  document.getElementById("avg-step-btn").disabled = false;
  document.getElementById("avg-auto-btn").disabled = false;
  addLog(log, `Stack: [${AVG_DATA.join(", ")}]  (top = 50)`, "log-info");
  addLog(log, `Searching for: ${AVG_TARGET}`, "log-info");
  addLog(
    log,
    `Expected: ~${Math.ceil(AVG_DATA.length / 2)} pops (average case)`,
    "log-info",
  );
}

function avgStep() {
  if (avgFound || !avgRemaining.length) return;
  const tower = document.getElementById("tower-avg");
  const arrow = document.getElementById("top-arrow-avg");
  const log = document.getElementById("log-avg");
  const top = tower.lastChild;
  if (!top) return;
  const val = parseInt(top.textContent);
  avgPopped++;
  top.classList.remove("push-in");
  top.classList.add("pop-out");
  setTimeout(() => {
    if (tower.lastChild === top) tower.removeChild(top);
    updateTopArrow(tower, arrow);
  }, 360);
  avgRemaining.pop();

  if (val === AVG_TARGET) {
    avgFound = true;
    addLog(log, `pop()  →  ${val}  ← FOUND! 🎉`, "log-push");
    addLog(
      log,
      `Pops needed: ${avgPopped}  (N=${AVG_DATA.length}, N/2≈${Math.ceil(AVG_DATA.length / 2)})`,
      "log-result",
    );
    addLog(log, `✓ Average Case: O(N/2) = O(N)`, "log-result");
    document.getElementById("avg-step-btn").disabled = true;
    document.getElementById("avg-auto-btn").disabled = true;
    clearTimeout(avgAutoTimer);
  } else {
    addLog(log, `pop()  →  ${val}  ≠ ${AVG_TARGET}`, "log-pop");
    if (!avgRemaining.length) {
      addLog(log, `Not found after ${avgPopped} pops.`, "log-warn");
      document.getElementById("avg-step-btn").disabled = true;
      document.getElementById("avg-auto-btn").disabled = true;
    }
  }
}

function avgAuto() {
  if (avgFound || !avgRemaining.length) return;
  document.getElementById("avg-auto-btn").disabled = true;
  function doStep() {
    if (avgFound || !avgRemaining.length) return;
    avgStep();
    avgAutoTimer = setTimeout(doStep, 900);
  }
  doStep();
}

function resetAvg() {
  clearTimeout(avgAutoTimer);
  initAvg();
}

/*                             
   WORST CASE — search for 99 (not present)
                             */
const WORST_DATA = [10, 20, 30, 40, 50, 60];
const WORST_TARGET = 99;
let worstRemaining = [];
let worstPopped = 0;
let worstDone = false;
let worstAutoTimer = null;

function initWorst() {
  const tower = document.getElementById("tower-worst");
  const arrow = document.getElementById("top-arrow-worst");
  const log = document.getElementById("log-worst");
  tower.innerHTML = "";
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  worstRemaining = [...WORST_DATA];
  worstPopped = 0;
  worstDone = false;
  clearTimeout(worstAutoTimer);
  WORST_DATA.forEach((v, i) => tower.appendChild(makeBlock(v, i)));
  updateTopArrow(tower, arrow);
  document.getElementById("worst-step-btn").disabled = false;
  document.getElementById("worst-auto-btn").disabled = false;
  addLog(log, `Stack: [${WORST_DATA.join(", ")}]  (top = 60)`, "log-info");
  addLog(log, `Searching for: ${WORST_TARGET}  (NOT IN STACK)`, "log-warn");
  addLog(
    log,
    `Must pop ALL ${WORST_DATA.length} elements → O(N) worst case`,
    "log-warn",
  );
}

function worstStep() {
  if (worstDone || !worstRemaining.length) return;
  const tower = document.getElementById("tower-worst");
  const arrow = document.getElementById("top-arrow-worst");
  const log = document.getElementById("log-worst");
  const top = tower.lastChild;
  if (!top) return;
  const val = parseInt(top.textContent);
  worstPopped++;
  top.classList.remove("push-in");
  top.classList.add("pop-out");
  setTimeout(() => {
    if (tower.lastChild === top) tower.removeChild(top);
    updateTopArrow(tower, arrow);
  }, 360);
  worstRemaining.pop();
  addLog(log, `pop()  →  ${val}  ≠ ${WORST_TARGET}`, "log-pop");

  if (!worstRemaining.length) {
    worstDone = true;
    setTimeout(() => {
      addLog(log, `Stack EMPTY — ${WORST_TARGET} not found ❌`, "log-warn");
      addLog(
        log,
        `Pops done: ${worstPopped} = N  ← O(N) worst case`,
        "log-result",
      );
      addLog(log, `⚠ All elements processed — element absent`, "log-result");
    }, 400);
    document.getElementById("worst-step-btn").disabled = true;
    document.getElementById("worst-auto-btn").disabled = true;
    clearTimeout(worstAutoTimer);
  }
}

function worstAuto() {
  if (worstDone || !worstRemaining.length) return;
  document.getElementById("worst-auto-btn").disabled = true;
  function doStep() {
    if (worstDone || !worstRemaining.length) return;
    worstStep();
    worstAutoTimer = setTimeout(doStep, 700);
  }
  doStep();
}

function resetWorst() {
  clearTimeout(worstAutoTimer);
  initWorst();
}

/*CUSTOM INPUT */
let customColorIdx = 0;
const MAX_CUSTOM = 8;

function initCustom() {
  const tower = document.getElementById("tower-custom");
  const arrow = document.getElementById("top-arrow-custom");
  const log = document.getElementById("log-custom");
  tower.innerHTML = "";
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  customColorIdx = 0;
  updateTopArrow(tower, arrow);
  addLog(log, "Custom stack ready. Push any value!", "log-info");
}

/*   COMPLEXITY CARD HIGHLIGHT HELPERS   */
let ccTimer = null;

function highlightCC(type) {
  // clear all active states
  ["push", "pop", "peek"].forEach((t) => {
    const card = document.getElementById("cc-" + t);
    card.classList.remove(
      "cc-active",
      "cc-active-push",
      "cc-active-pop",
      "cc-active-peek",
    );
  });
  clearTimeout(ccTimer);

  // activate the right card
  const card = document.getElementById("cc-" + type);
  if (card) {
    card.classList.add("cc-active", "cc-active-" + type);
    ccTimer = setTimeout(() => {
      card.classList.remove("cc-active", "cc-active-" + type);
    }, 1800);
  }
}

function showToast(type, msg) {
  const toast = document.getElementById("cc-toast");
  const icon = document.getElementById("cc-toast-icon");
  const text = document.getElementById("cc-toast-text");

  const icons = { push: "⬆", pop: "⬇", peek: "👁", warn: "⚠" };
  icon.textContent = icons[type] || "⚡";
  text.textContent = msg;
  toast.className = "cc-toast show toast-" + type;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "cc-toast";
  }, 2400);
}

/* CUSTOM PUSH */
function customPush() {
  const tower = document.getElementById("tower-custom");
  const arrow = document.getElementById("top-arrow-custom");
  const log = document.getElementById("log-custom");
  const input = document.getElementById("custom-val");
  const rawVal = input.value.trim();

  if (rawVal === "" || isNaN(rawVal)) {
    showToast("warn", "Enter a valid number first!");
    addLog(log, "Enter a valid number first!", "log-warn");
    return;
  }
  if (tower.children.length >= MAX_CUSTOM) {
    showToast("warn", "Stack Overflow! (max " + MAX_CUSTOM + ")");
    addLog(log, "Stack Overflow! (max " + MAX_CUSTOM + ")", "log-warn");
    return;
  }

  const val = parseInt(rawVal);
  tower.appendChild(makeBlock(val, customColorIdx++));
  updateTopArrow(tower, arrow);

  highlightCC("push");
  showToast("push", "push(" + val + ")  →  Time: O(1)  |  Space: O(1)");
  addLog(log, "push(" + val + ")  →  top = " + val, "log-push");
  addLog(
    log,
    "✓ Time: O(1)  |  Space: O(1)  — direct insert at top",
    "log-result",
  );

  input.value = "";
  input.focus();
}

/* CUSTOM POP */
function customPop() {
  const tower = document.getElementById("tower-custom");
  const arrow = document.getElementById("top-arrow-custom");
  const log = document.getElementById("log-custom");

  if (!tower.children.length) {
    showToast("warn", "Stack Underflow! Nothing to pop.");
    addLog(log, "Stack Underflow! Nothing to pop.", "log-warn");
    return;
  }

  const val = tower.lastChild.textContent;
  const top = tower.lastChild;
  top.classList.remove("push-in");
  top.classList.add("pop-out");
  setTimeout(() => {
    if (tower.lastChild === top) tower.removeChild(top);
    updateTopArrow(tower, arrow);
  }, 360);

  highlightCC("pop");
  showToast("pop", "pop()  →  Time: O(1)  |  Space: O(1)");
  addLog(log, "pop()  →  removed " + val, "log-pop");
  addLog(
    log,
    "✓ Time: O(1)  |  Space: O(1)  — removes top directly",
    "log-result",
  );
}

/* CUSTOM PEEK */
function customPeek() {
  const tower = document.getElementById("tower-custom");
  const log = document.getElementById("log-custom");

  if (!tower.children.length) {
    showToast("warn", "Stack is empty — nothing to peek!");
    addLog(log, "Stack is empty — nothing to peek!", "log-warn");
    return;
  }

  const val = tower.lastChild.textContent;
  tower.lastChild.classList.add("highlight");
  setTimeout(
    () => tower.lastChild && tower.lastChild.classList.remove("highlight"),
    800,
  );

  highlightCC("peek");
  showToast("peek", "peek()  →  Time: O(1)  |  Space: O(1)");
  addLog(log, "peek()  →  top = " + val + "  (not removed)", "log-peek");
  addLog(
    log,
    "✓ Time: O(1)  |  Space: O(1)  — reads top pointer only",
    "log-result",
  );
}

/* CUSTOM RESET */
function resetCustom() {
  // clear card highlights and toast
  ["push", "pop", "peek"].forEach((t) => {
    const card = document.getElementById("cc-" + t);
    if (card)
      card.classList.remove(
        "cc-active",
        "cc-active-push",
        "cc-active-pop",
        "cc-active-peek",
      );
  });
  const toast = document.getElementById("cc-toast");
  if (toast) toast.className = "cc-toast";

  initCustom();
  addLog(document.getElementById("log-custom"), "↺ Stack cleared.", "log-info");
}
// allow Enter key in custom input
document.getElementById("custom-val").addEventListener("keydown", (e) => {
  if (e.key === "Enter") customPush();
});

/*   INIT ALL   */
initBest();
initAvg();
initWorst();
initCustom();

window.addEventListener("progressReady", () => {
  if (typeof updateLevelButtons === "function") updateLevelButtons();
  else if (typeof updateLevels === "function") updateLevels();
});
