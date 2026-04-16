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
        if (top >= MAX - 1) { cout << "Stack Overflow\\n"; return; }
        arr[++top] = x;
        cout << "Pushed: " << x << "\\n";
    }
    int pop() {
        if (top < 0) { cout << "Stack Underflow\\n"; return -1; }
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
    while(!s.isEmpty()) cout << "Popped: " << s.pop() << "\\n";
    return 0;
}`,
    python: `class ArrayStack:
    def __init__(self, capacity=100):
        self.arr = [None] * capacity
        self.top = -1
        self.capacity = capacity
    def push(self, item):
        if self.top >= self.capacity - 1: return "Stack Overflow"
        self.top += 1
        self.arr[self.top] = item
        return f"Pushed: {item}"
    def pop(self):
        if self.top < 0: return "Stack Underflow"
        item = self.arr[self.top]
        self.top -= 1
        return f"Popped: {item}"
    def peek(self): return "Empty" if self.top < 0 else self.arr[self.top]
    def is_empty(self): return self.top < 0
    def size(self): return self.top + 1

s = ArrayStack()
n = int(input("Enter number of elements: "))
for i in range(n):
    value = int(input(f"Enter element {i+1}: "))
    print(s.push(value))
print(f"\\nSize: {s.size()}")
print(f"Top: {s.peek()}\\n")
while not s.is_empty(): print(s.pop())`,
    java: `class ArrayStack {
    private int[] arr;
    private int top;
    private int capacity;
    public ArrayStack(int size) { arr = new int[size]; capacity = size; top = -1; }
    public void push(int x) {
        if (top >= capacity - 1) { System.out.println("Stack Overflow"); return; }
        arr[++top] = x;
        System.out.println("Pushed: " + x);
    }
    public int pop() {
        if (top < 0) { System.out.println("Stack Underflow"); return -1; }
        return arr[top--];
    }
    public int peek() { return (top < 0) ? -1 : arr[top]; }
    public boolean isEmpty() { return top < 0; }
    public int size() { return top + 1; }
}`,
    c: `#include <stdio.h>
#define MAX 100
typedef struct { int arr[MAX]; int top; } Stack;
void push(Stack* s, int x) {
    if (s->top >= MAX - 1) { printf("Stack Overflow\\n"); return; }
    s->arr[++(s->top)] = x;
    printf("Pushed: %d\\n", x);
}
int pop(Stack* s) {
    if (s->top < 0) { printf("Stack Underflow\\n"); return -1; }
    return s->arr[(s->top)--];
}
int main() {
    Stack s; s.top = -1;
    int n, value;
    printf("Enter number of elements: "); scanf("%d", &n);
    for(int i = 0; i < n; i++) {
        printf("Enter element %d: ", i+1); scanf("%d", &value); push(&s, value);
    }
    printf("\\nSize: %d\\nTop: %d\\n\\n", s.top + 1, s.arr[s.top]);
    while(s.top >= 0) printf("Popped: %d\\n", pop(&s));
    return 0;
}`,
    javascript: `class ArrayStack {
    constructor(capacity = 100) { this.arr = new Array(capacity); this.top = -1; this.capacity = capacity; }
    push(item) {
        if (this.top >= this.capacity - 1) return "Stack Overflow";
        this.arr[++this.top] = item;
        console.log("Pushed: " + item);
    }
    pop() { if (this.top < 0) return "Stack Underflow"; return this.arr[this.top--]; }
    peek() { return this.top < 0 ? null : this.arr[this.top]; }
    isEmpty() { return this.top < 0; }
    size() { return this.top + 1; }
}
const s = new ArrayStack();
[10, 20, 30].forEach(x => s.push(x));
console.log("\\nSize: " + s.size());
console.log("Top: " + s.peek() + "\\n");
while(!s.isEmpty()) console.log("Popped: " + s.pop());`,
  },
  linkedlist: {
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; };
class LinkedListStack {
    Node* head;
public:
    LinkedListStack() { head = NULL; }
    void push(int x) {
        Node* n = new Node(); n->data = x; n->next = head; head = n;
        cout << "Pushed: " << x << "\\n";
    }
    int pop() {
        if (!head) { cout << "Stack Underflow\\n"; return -1; }
        Node* t = head; int v = t->data; head = head->next; delete t; return v;
    }
    int peek() { return head ? head->data : -1; }
    bool isEmpty() { return !head; }
};
int main() {
    LinkedListStack s; int n, v;
    cout << "Enter number of elements: "; cin >> n;
    for(int i = 0; i < n; i++) { cout << "Enter element " << i+1 << ": "; cin >> v; s.push(v); }
    cout << "\\nTop: " << s.peek() << "\\n\\n";
    while(!s.isEmpty()) cout << "Popped: " << s.pop() << "\\n";
    return 0;
}`,
    python: `class Node:
    def __init__(self, data): self.data = data; self.next = None
class LinkedListStack:
    def __init__(self): self.head = None
    def push(self, item):
        n = Node(item); n.next = self.head; self.head = n
        return f"Pushed: {item}"
    def pop(self):
        if not self.head: return "Stack Underflow"
        v = self.head.data; self.head = self.head.next; return f"Popped: {v}"
    def peek(self): return "Empty" if not self.head else self.head.data
    def is_empty(self): return self.head is None
s = LinkedListStack()
n = int(input("Enter number of elements: "))
for i in range(n): print(s.push(int(input(f"Enter element {i+1}: "))))
print(f"\\nTop: {s.peek()}\\n")
while not s.is_empty(): print(s.pop())`,
    java: `class Node { int data; Node next; Node(int d) { data = d; } }
class LinkedListStack {
    Node head;
    void push(int x) { Node n = new Node(x); n.next = head; head = n; System.out.println("Pushed: " + x); }
    int pop() { if (head == null) { System.out.println("Stack Underflow"); return -1; } int v = head.data; head = head.next; return v; }
    int peek() { return head == null ? -1 : head.data; }
    boolean isEmpty() { return head == null; }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
typedef struct Node { int data; struct Node* next; } Node;
Node* head = NULL;
void push(int x) { Node* n = malloc(sizeof(Node)); n->data=x; n->next=head; head=n; printf("Pushed: %d\\n",x); }
int pop() { if(!head){printf("Stack Underflow\\n");return -1;} Node* t=head; int v=t->data; head=head->next; free(t); return v; }
int main() {
    int n,v; printf("Enter number of elements: "); scanf("%d",&n);
    for(int i=0;i<n;i++){printf("Enter element %d: ",i+1);scanf("%d",&v);push(v);}
    printf("\\nTop: %d\\n\\n",head->data);
    while(head) printf("Popped: %d\\n",pop());
    return 0;
}`,
    javascript: `class Node { constructor(d){this.data=d;this.next=null;} }
class LinkedListStack {
    constructor(){this.head=null;}
    push(item){const n=new Node(item);n.next=this.head;this.head=n;console.log("Pushed: "+item);}
    pop(){if(!this.head)return "Stack Underflow";const v=this.head.data;this.head=this.head.next;return v;}
    peek(){return this.head?this.head.data:null;}
    isEmpty(){return!this.head;}
}
const s=new LinkedListStack();
[10,20,30].forEach(x=>s.push(x));
console.log("\\nTop: "+s.peek()+"\\n");
while(!s.isEmpty())console.log("Popped: "+s.pop());`,
  },
  deque: {
    cpp: `#include <iostream>
#include <deque>
using namespace std;
class DequeStack {
    deque<int> dq;
public:
    void push(int x){dq.push_back(x);cout<<"Pushed: "<<x<<"\\n";}
    int pop(){if(dq.empty()){cout<<"Stack Underflow\\n";return -1;}int v=dq.back();dq.pop_back();return v;}
    int peek(){return dq.empty()?-1:dq.back();}
    bool isEmpty(){return dq.empty();}
    int size(){return dq.size();}
};
int main(){
    DequeStack s; int n,v;
    cout<<"Enter number of elements: ";cin>>n;
    for(int i=0;i<n;i++){cout<<"Enter element "<<i+1<<": ";cin>>v;s.push(v);}
    cout<<"\\nSize: "<<s.size()<<"\\nTop: "<<s.peek()<<"\\n\\n";
    while(!s.isEmpty())cout<<"Popped: "<<s.pop()<<"\\n";
    return 0;
}`,
    python: `from collections import deque
class DequeStack:
    def __init__(self): self.dq = deque()
    def push(self,item): self.dq.append(item); return f"Pushed: {item}"
    def pop(self): return "Stack Underflow" if not self.dq else f"Popped: {self.dq.pop()}"
    def peek(self): return "Empty" if not self.dq else self.dq[-1]
    def is_empty(self): return len(self.dq)==0
    def size(self): return len(self.dq)
s=DequeStack()
n=int(input("Enter number of elements: "))
for i in range(n): print(s.push(int(input(f"Enter element {i+1}: "))))
print(f"\\nSize: {s.size()}\\nTop: {s.peek()}\\n")
while not s.is_empty(): print(s.pop())`,
    java: `import java.util.*; class DequeStack { Deque<Integer> dq=new ArrayDeque<>(); void push(int x){dq.addLast(x);System.out.println("Pushed: "+x);} int pop(){return dq.isEmpty()?-1:dq.removeLast();} int peek(){return dq.isEmpty()?-1:dq.peekLast();} boolean isEmpty(){return dq.isEmpty();} int size(){return dq.size();} }`,
    c: `#include <stdio.h>
#include <stdlib.h>
#define INIT 10
typedef struct{int*arr;int top;int cap;}DS;
void push(DS*s,int x){if(s->top>=s->cap-1){s->cap*=2;s->arr=realloc(s->arr,s->cap*sizeof(int));}s->arr[++(s->top)]=x;printf("Pushed: %d\\n",x);}
int pop(DS*s){return s->top<0?-1:s->arr[(s->top)--];}
int main(){DS s;s.arr=malloc(INIT*sizeof(int));s.top=-1;s.cap=INIT;int n,v;printf("Enter number of elements: ");scanf("%d",&n);for(int i=0;i<n;i++){printf("Enter element %d: ",i+1);scanf("%d",&v);push(&s,v);}printf("\\nTop: %d\\n\\n",s.arr[s.top]);while(s.top>=0)printf("Popped: %d\\n",pop(&s));free(s.arr);return 0;}`,
    javascript: `class DequeStack{constructor(){this.dq=[];}push(item){this.dq.push(item);console.log("Pushed: "+item);}pop(){return this.dq.length===0?"Stack Underflow":this.dq.pop();}peek(){return this.dq.length===0?null:this.dq[this.dq.length-1];}isEmpty(){return this.dq.length===0;}size(){return this.dq.length;}}
const s=new DequeStack();[10,20,30].forEach(x=>s.push(x));console.log("\\nSize: "+s.size()+"\\nTop: "+s.peek()+"\\n");while(!s.isEmpty())console.log("Popped: "+s.pop());`,
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
  document
    .querySelectorAll(".impl-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-type="${type}"]`).classList.add("active");
  const titles = {
    array: "Stack Visualizer — Array Implementation",
    linkedlist: "Stack Visualizer — Linked List Implementation",
    deque: "Stack Visualizer — Deque Implementation",
  };
  document.getElementById("visualizer-title").textContent = titles[type];
  document.getElementById("pseudo-push-text").innerHTML =
    pseudoTexts[type].push;
  document.getElementById("pseudo-pop-text").innerHTML = pseudoTexts[type].pop;
  document.getElementById("pseudo-peek-text").innerHTML =
    pseudoTexts[type].peek;
  document.getElementById("pseudo-empty-text").innerHTML =
    pseudoTexts[type].empty;
  document.getElementById("pseudo-size-text").innerHTML =
    pseudoTexts[type].size;
  document.getElementById("arrayStack").style.display =
    type === "array" ? "flex" : "none";
  document.getElementById("linkedListStack").style.display =
    type === "linkedlist" ? "flex" : "none";
  document.getElementById("dequeStack").style.display =
    type === "deque" ? "flex" : "none";
  stackData = [];
  renderStack();
  if (codeEditor) codeEditor.setValue(codeTemplates[type][currentLang]);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
  if (currentImpl === "array") renderArrayStack();
  else if (currentImpl === "linkedlist") renderLinkedListStack();
  else renderDequeStack();
}

function renderArrayStack() {
  const c = document.getElementById("arrayStack");
  c.innerHTML = "";
  stackData.forEach((v) => {
    const d = document.createElement("div");
    d.className = "stack-element";
    d.textContent = v;
    c.appendChild(d);
  });
}

function renderLinkedListStack() {
  const c = document.getElementById("linkedListStack");
  c.innerHTML = "";
  stackData
    .slice()
    .reverse()
    .forEach((v, idx) => {
      const nd = document.createElement("div");
      nd.className = "ll-node";
      const nb = document.createElement("div");
      nb.className = "ll-node-box";
      const dd = document.createElement("div");
      dd.className = "ll-node-data";
      dd.textContent = v;
      const nx = document.createElement("div");
      nx.className = "ll-node-next";
      nx.innerHTML = "→";
      nb.appendChild(dd);
      nb.appendChild(nx);
      nd.appendChild(nb);
      if (idx < stackData.length - 1) {
        const ar = document.createElement("span");
        ar.className = "ll-arrow";
        ar.textContent = "↓";
        nd.appendChild(ar);
      } else {
        const nu = document.createElement("span");
        nu.className = "ll-null";
        nu.textContent = "NULL";
        nd.appendChild(nu);
      }
      c.appendChild(nd);
    });
}

function renderDequeStack() {
  const c = document.getElementById("dequeStack");
  c.innerHTML = "";
  stackData.forEach((v) => {
    const d = document.createElement("div");
    d.className = "deque-element";
    d.textContent = v;
    c.appendChild(d);
  });
}

async function push() {
  const input = document.getElementById("stackInput");
  const val = input.value.trim();
  if (!val) return;
  highlightStep("push");
  await sleep(400);
  stackData.push(val);
  renderStack();
  showMsg(`✓ Pushed: ${val}`, "success");
  input.value = "";
}

async function pop() {
  highlightStep("pop");
  if (!stackData.length) {
    showMsg("Stack Underflow!", "danger");
    return;
  }
  const containers = ["arrayStack", "linkedListStack", "dequeStack"].map((id) =>
    document.getElementById(id),
  );
  containers.forEach((c) => {
    const last = c.lastElementChild || c.firstElementChild;
    if (last) last.classList.add("removing");
  });
  await sleep(500);
  const popped = stackData.pop();
  renderStack();
  showMsg(`Popped: ${popped}`, "danger");
}

function peek() {
  highlightStep("peek");
  if (!stackData.length) showMsg("Stack is Empty", "info");
  else showMsg(`Top element is: ${stackData[stackData.length - 1]}`, "info");
}

function isEmpty_check() {
  highlightStep("isEmpty");
  showMsg(
    stackData.length === 0 ? "Stack is Empty" : "Stack is NOT Empty",
    "info",
  );
}

function size() {
  highlightStep("size");
  showMsg(`Stack size: ${stackData.length}`, "info");
}


function getCMTheme(t) {
  return t === "light" ? "eclipse" : t === "blue" ? "nord" : "material-ocean";
}

function initEditor() {
  const t = document.body.getAttribute("data-theme") || "dark";
  codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "text/x-c++src",
    theme: getCMTheme(t),
    lineNumbers: true,
    indentUnit: 4,
    lineWrapping: true,
  });
  codeEditor.setValue(codeTemplates.array.cpp);
}

function switchLang(lang, btn) {
  btn.parentElement
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  const modes = {
    cpp: "text/x-c++src",
    python: "text/x-python",
    java: "text/x-java",
    c: "text/x-csrc",
    javascript: "text/javascript",
  };
  const display = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    c: "C",
    javascript: "JavaScript",
  };
  currentLang = lang;
  const ld = document.querySelector(".lang-display");
  if (ld) ld.textContent = display[lang];
  codeEditor.setOption("mode", modes[lang]);
  codeEditor.setValue(codeTemplates[currentImpl][lang]);
}

document.querySelectorAll(".lang-tab").forEach((b) => {
  b.onclick = () => switchLang(b.dataset.lang, b);
});

function copyCode() {
  navigator.clipboard.writeText(codeEditor.getValue()).then(() => {
    const btn = document.querySelector(".code-copy");
    const orig = btn.textContent;
    btn.textContent = "✓";
    btn.style.background = "var(--primary-green)";
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = "var(--primary-purple)";
    }, 2000);
  });
}

async function getInput(prompt) {
  return new Promise((resolve) => {
    const pd = document.getElementById("inputPrompt");
    document.getElementById("promptText").textContent = prompt;
    pd.style.display = "flex";
    document.getElementById("userInput").value = "";
    document.getElementById("userInput").focus();
    currentInputResolver = resolve;
    waitingForInput = true;
  });
}

function submitInput() {
  const v = document.getElementById("userInput").value.trim();
  if (v && currentInputResolver) {
    document.getElementById("inputPrompt").style.display = "none";
    waitingForInput = false;
    currentInputResolver(v);
    currentInputResolver = null;
  }
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitInput();
});

async function runInteractiveCode() {
  outputDiv = document.getElementById("codeOutput");
  outputDiv.innerHTML =
    '<span style="color:#fbbf24;">🔄 Executing...</span><br><br>';
  try {
    await runSimulation(
      currentLang === "python"
        ? "Python"
        : currentLang === "javascript"
          ? "JavaScript"
          : "C++",
    );
  } catch (e) {
    outputDiv.innerHTML += `<br><span style="color:#ef4444;">Error: ${e.message}</span>`;
  }
}

async function runSimulation(langName) {
  const names = {
    array: "Array-Based Stack",
    linkedlist: "Linked List Stack",
    deque: "Deque Stack",
  };
  outputDiv.innerHTML += `<span style="color:#06b6d4;">${names[currentImpl]} — ${langName}</span><br><br>`;
  const n = await getInput("Enter number of elements: ");
  outputDiv.innerHTML += `<span style="color:#a0a0a0;">Enter number of elements: </span>${n}<br><br>`;
  const stack = [];
  for (let i = 0; i < parseInt(n); i++) {
    const v = await getInput(`Enter element ${i + 1}: `);
    stack.push(parseInt(v));
    outputDiv.innerHTML += `<span style="color:#a0a0a0;">Enter element ${i + 1}: </span>${v}<br>`;
    outputDiv.innerHTML += `<span style="color:#10b981;">Pushed: ${v}</span><br>`;
  }
  outputDiv.innerHTML += `<br><span style="color:#06b6d4;">Size: ${stack.length}</span><br>`;
  outputDiv.innerHTML += `<span style="color:#06b6d4;">Top: ${stack[stack.length - 1]}</span><br><br>`;
  while (stack.length > 0) {
    outputDiv.innerHTML += `<span style="color:#ef4444;">Popped: ${stack.pop()}</span><br>`;
    await sleep(300);
  }
  outputDiv.innerHTML +=
    '<br><span style="color:#10b981;">✓ Stack is now empty!</span>';
}


const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
let navOpen = false;

menuToggle.addEventListener("click", () => {
  navOpen = !navOpen;
  mobileNav.classList.toggle("open", navOpen);
});

document.addEventListener("click", (e) => {
  if (
    navOpen &&
    !mobileNav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    navOpen = false;
    mobileNav.classList.remove("open");
  }
});

mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navOpen = false;
    mobileNav.classList.remove("open");
  }),
);


const themeIcons = {
  dark: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>',
  light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  blue: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
};

document.getElementById("themeToggle").onclick = () => {
  const themes = ["dark", "light", "blue"];
  const cur = document.body.getAttribute("data-theme") || "dark";
  const next = themes[(themes.indexOf(cur) + 1) % 3];
  document.body.setAttribute("data-theme", next);
  document.getElementById("themeIcon").innerHTML = themeIcons[next];
  localStorage.setItem("dsa-theme", next);
  if (codeEditor) codeEditor.setOption("theme", getCMTheme(next));
};


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

function updateLevelButtons() {
  if (localStorage.getItem(L2_KEY) === "true") {
    btnL2.style.cssText =
      "border-color:var(--primary-green);background:rgba(16,185,129,0.12);color:var(--primary-green)";
  }
  if (localStorage.getItem(L3_KEY) === "true") {
    btnL3.style.cssText =
      "border-color:var(--primary-green);background:rgba(16,185,129,0.12);color:var(--primary-green)";
  }
}

btnL2.onclick = () => {
  if (localStorage.getItem(L2_KEY) === "true") {
    window.location.href = `${ALGO_KEY}_L2.html`;
    return;
  }
  modal.style.display = "flex";
  document.getElementById("startQuiz").onclick = () =>
    (window.location.href = `quiz.html?id=${ALGO_KEY}-l1`);
};

btnL3.onclick = () => {
  if (localStorage.getItem(L3_KEY) === "true") {
    window.location.href = `quiz.html?id=${ALGO_KEY}-l2`;
    return;
  }
  const l2 = localStorage.getItem(L2_KEY) === "true";
  modal.querySelector("p").textContent = l2
    ? "Pass the Level 2 Quiz to unlock Level 3 and complete your journey."
    : "Pass the Level 1 Quiz to unlock Level 2 first.";
  modal.style.display = "flex";
  document.getElementById("startQuiz").onclick = () =>
    (window.location.href = `quiz.html?id=${ALGO_KEY}-l${l2 ? 2 : 1}`);
};

document.getElementById("cancelBtn").onclick = () => {
  modal.style.display = "none";
};
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});


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

function makeBlock(val, colorIdx, extraClass = "") {
  const b = document.createElement("div");
  b.className = "s-block push-in " + extraClass;
  b.style.background = COLORS[colorIdx % COLORS.length];
  b.textContent = val;
  return b;
}

function updateTopArrow(towerEl, arrowEl) {
  arrowEl.textContent = towerEl.querySelectorAll(".s-block").length
    ? "← TOP"
    : "";
}

function addLog(logEl, text, cls = "log-info") {
  const e = document.createElement("div");
  e.className = "log-entry " + cls;
  e.textContent = "> " + text;
  logEl.appendChild(e);
  logEl.scrollTop = logEl.scrollHeight;
}


const TAB_ACTIVE = {
  best: "active-best",
  avg: "active-avg",
  worst: "active-worst",
  custom: "active-custom",
};

function switchScenario(name) {
  document
    .querySelectorAll(".scenario-tab")
    .forEach((t) => (t.className = "scenario-tab"));
  document.getElementById("stab-" + name).classList.add(TAB_ACTIVE[name]);
  document
    .querySelectorAll(".scenario-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("spanel-" + name).classList.add("active");
}


let bestStack = [10, 20, 30];
let bestColorIdx = 3;

function initBest() {
  const tower = document.getElementById("tower-best"),
    arrow = document.getElementById("top-arrow-best"),
    log = document.getElementById("log-best");
  tower.innerHTML = "";
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  bestStack.forEach((v, i) => tower.appendChild(makeBlock(v, i)));
  updateTopArrow(tower, arrow);
  addLog(log, "Stack initialized: [10, 20, 30]", "log-info");
  addLog(log, "Push / Pop / Peek are all O(1)", "log-info");
}

function bestPush() {
  const tower = document.getElementById("tower-best"),
    arrow = document.getElementById("top-arrow-best"),
    log = document.getElementById("log-best");
  if (tower.children.length >= 7) {
    addLog(log, "Stack Overflow! (max 7)", "log-warn");
    return;
  }
  const val = Math.floor(Math.random() * 90) + 10;
  bestStack.push(val);
  tower.appendChild(makeBlock(val, bestColorIdx++));
  updateTopArrow(tower, arrow);
  addLog(log, `push(${val})  →  top = ${val}`, "log-push");
  addLog(log, "✓ O(1) — constant time", "log-result");
}

function bestPop() {
  const tower = document.getElementById("tower-best"),
    arrow = document.getElementById("top-arrow-best"),
    log = document.getElementById("log-best");
  if (!tower.children.length) {
    addLog(log, "Stack Underflow!", "log-warn");
    return;
  }
  const top = tower.lastChild,
    val = top.textContent;
  top.classList.remove("push-in");
  top.classList.add("pop-out");
  setTimeout(() => {
    if (tower.lastChild === top) tower.removeChild(top);
    updateTopArrow(tower, arrow);
  }, 350);
  bestStack.pop();
  addLog(log, `pop()  →  removed ${val}`, "log-pop");
  addLog(log, "✓ O(1) — constant time", "log-result");
}

function bestPeek() {
  const tower = document.getElementById("tower-best"),
    log = document.getElementById("log-best");
  if (!tower.children.length) {
    addLog(log, "Stack is empty!", "log-warn");
    return;
  }
  const val = tower.lastChild.textContent;
  tower.lastChild.classList.add("highlight");
  setTimeout(
    () => tower.lastChild && tower.lastChild.classList.remove("highlight"),
    800,
  );
  addLog(log, `peek()  →  top = ${val}  (no removal)`, "log-peek");
  addLog(log, "✓ O(1) — constant time", "log-result");
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


const AVG_DATA = [10, 20, 30, 40, 50];
const AVG_TARGET = 20;
let avgRemaining = [],
  avgPopped = 0,
  avgFound = false,
  avgAutoTimer = null;

function initAvg() {
  const tower = document.getElementById("tower-avg"),
    arrow = document.getElementById("top-arrow-avg"),
    log = document.getElementById("log-avg");
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
  const tower = document.getElementById("tower-avg"),
    arrow = document.getElementById("top-arrow-avg"),
    log = document.getElementById("log-avg");
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
    addLog(log, "✓ Average Case: O(N/2) = O(N)", "log-result");
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


const WORST_DATA = [10, 20, 30, 40, 50, 60];
const WORST_TARGET = 99;
let worstRemaining = [],
  worstPopped = 0,
  worstDone = false,
  worstAutoTimer = null;

function initWorst() {
  const tower = document.getElementById("tower-worst"),
    arrow = document.getElementById("top-arrow-worst"),
    log = document.getElementById("log-worst");
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
  const tower = document.getElementById("tower-worst"),
    arrow = document.getElementById("top-arrow-worst"),
    log = document.getElementById("log-worst");
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


let customColorIdx = 0;
const MAX_CUSTOM = 8;

function initCustom() {
  const tower = document.getElementById("tower-custom"),
    arrow = document.getElementById("top-arrow-custom"),
    log = document.getElementById("log-custom");
  tower.innerHTML = "";
  log.innerHTML = '<div class="log-title">📋 Operation Log</div>';
  customColorIdx = 0;
  updateTopArrow(tower, arrow);
  addLog(log, "Custom stack ready. Push any value!", "log-info");
}

let ccTimer = null;
function highlightCC(type) {
  ["push", "pop", "peek"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    c.classList.remove(
      "cc-active",
      "cc-active-push",
      "cc-active-pop",
      "cc-active-peek",
    );
  });
  clearTimeout(ccTimer);
  const card = document.getElementById("cc-" + type);
  if (card) {
    card.classList.add("cc-active", "cc-active-" + type);
    ccTimer = setTimeout(
      () => card.classList.remove("cc-active", "cc-active-" + type),
      1800,
    );
  }
}

function showToast(type, msg) {
  const toast = document.getElementById("cc-toast");
  document.getElementById("cc-toast-icon").textContent =
    { push: "⬆", pop: "⬇", peek: "👁", warn: "⚠" }[type] || "⚡";
  document.getElementById("cc-toast-text").textContent = msg;
  toast.className = "cc-toast show toast-" + type;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "cc-toast";
  }, 2400);
}

function customPush() {
  const tower = document.getElementById("tower-custom"),
    arrow = document.getElementById("top-arrow-custom"),
    log = document.getElementById("log-custom"),
    input = document.getElementById("custom-val");
  const raw = input.value.trim();
  if (raw === "" || isNaN(raw)) {
    showToast("warn", "Enter a valid number first!");
    addLog(log, "Enter a valid number!", "log-warn");
    return;
  }
  if (tower.children.length >= MAX_CUSTOM) {
    showToast("warn", "Stack Overflow! (max " + MAX_CUSTOM + ")");
    addLog(log, "Stack Overflow!", "log-warn");
    return;
  }
  const val = parseInt(raw);
  tower.appendChild(makeBlock(val, customColorIdx++));
  updateTopArrow(tower, arrow);
  highlightCC("push");
  showToast("push", `push(${val})  →  Time: O(1)  |  Space: O(1)`);
  addLog(log, `push(${val})  →  top = ${val}`, "log-push");
  addLog(log, "✓ Time: O(1)  |  Space: O(1)", "log-result");
  input.value = "";
  input.focus();
}

function customPop() {
  const tower = document.getElementById("tower-custom"),
    arrow = document.getElementById("top-arrow-custom"),
    log = document.getElementById("log-custom");
  if (!tower.children.length) {
    showToast("warn", "Stack Underflow!");
    addLog(log, "Stack Underflow!", "log-warn");
    return;
  }
  const val = tower.lastChild.textContent,
    top = tower.lastChild;
  top.classList.remove("push-in");
  top.classList.add("pop-out");
  setTimeout(() => {
    if (tower.lastChild === top) tower.removeChild(top);
    updateTopArrow(tower, arrow);
  }, 360);
  highlightCC("pop");
  showToast("pop", `pop()  →  Time: O(1)  |  Space: O(1)`);
  addLog(log, `pop()  →  removed ${val}`, "log-pop");
  addLog(log, "✓ Time: O(1)  |  Space: O(1)", "log-result");
}

function customPeek() {
  const tower = document.getElementById("tower-custom"),
    log = document.getElementById("log-custom");
  if (!tower.children.length) {
    showToast("warn", "Stack is empty!");
    addLog(log, "Stack is empty!", "log-warn");
    return;
  }
  const val = tower.lastChild.textContent;
  tower.lastChild.classList.add("highlight");
  setTimeout(
    () => tower.lastChild && tower.lastChild.classList.remove("highlight"),
    800,
  );
  highlightCC("peek");
  showToast("peek", `peek()  →  Time: O(1)  |  Space: O(1)`);
  addLog(log, `peek()  →  top = ${val}  (not removed)`, "log-peek");
  addLog(log, "✓ Time: O(1)  |  Space: O(1)", "log-result");
}

function resetCustom() {
  ["push", "pop", "peek"].forEach((t) => {
    const c = document.getElementById("cc-" + t);
    if (c)
      c.classList.remove(
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

document.getElementById("custom-val").addEventListener("keydown", (e) => {
  if (e.key === "Enter") customPush();
});


window.addEventListener("load", () => {
  const saved = localStorage.getItem("dsa-theme") || "dark";
  document.body.setAttribute("data-theme", saved);
  document.getElementById("themeIcon").innerHTML = themeIcons[saved];
  initEditor();
  updateLevelButtons();
  initBest();
  initAvg();
  initWorst();
  initCustom();
});
