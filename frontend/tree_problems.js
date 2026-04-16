const TOPIC_CONFIG = {
  name: "Tree",
  level: "Level 1 of 3 · Fundamentals",
  backLink: "tree_L1.html",
  backLabel: "Tree"
};

const PROBLEMS = [
{
  id: 1,
  title: "Height of Binary Tree",
  difficulty: "Easy",
  accuracy: "68.20%",
  submissions: "1M+",
  companies: ["Google", "Amazon", "Microsoft"],
  pattern: "Recursion / DFS",
  realWorld: [
    "Used in file systems to determine the nesting depth of folders,",
    "and in rendering engines to manage the layering of UI elements."
  ].join(" "),
  description: [
    "Given the <strong>root</strong> of a binary tree, return its maximum depth.",
    "A binary tree's maximum depth is the number of nodes along the longest path",
    "from the root node down to the farthest leaf node."
  ].join(" "),
  examples: [
    { 
      input: "root = [3,9,20,null,null,15,7]", 
      output: "3", 
      explain: "The longest path is 3 -> 20 -> 7 (or 15), which has 3 nodes." 
    },
    { 
      input: "root = [1,null,2]", 
      output: "2", 
      explain: "The path is 1 -> 2." 
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 10⁴].",
    "-100 ≤ Node.val ≤ 100"
  ],
  hint: [
    "The height of a tree is 1 + the maximum height of its subtrees.",
    "Base Case: If the current node is null, the height is 0.",
    "Recursive Step: Return 1 + max(height(left), height(right)).",
    "<br>Time: O(n) · Space: O(h) where h is tree height."
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "/**",
      " * Definition for a binary tree node.",
      " * struct TreeNode {",
      " *     int val;",
      " *     TreeNode *left;",
      " *     TreeNode *right;",
      " *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}",
      " * };",
      " */",
      "class Solution {",
      "public:",
      "    int maxDepth(TreeNode* root) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "/**",
      " * Definition for a binary tree node.",
      " */",
      "class TreeNode {",
      "    int val;",
      "    TreeNode left, right;",
      "    TreeNode(int x) { val = x; }",
      "}",
      "",
      "public class Solution {",
      "    public int maxDepth(TreeNode root) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class TreeNode:",
      "    def __init__(self, val=0, left=None, right=None):",
      "        self.val = val",
      "        self.left = left",
      "        self.right = right",
      "",
      "class Solution:",
      "    def maxDepth(self, root: TreeNode) -> int:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "/**",
      " * function TreeNode(val, left, right) {",
      " *     this.val = (val===undefined ? 0 : val)",
      " *     this.left = (left===undefined ? null : left)",
      " *     this.right = (right===undefined ? null : right)",
      " * }",
      " */",
      "function maxDepth(root) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "int maxDepth(TreeNode* root) {",
      "    if (!root) return 0;",
      "    int leftHeight = maxDepth(root->left);",
      "    int rightHeight = maxDepth(root->right);",
      "    return 1 + max(leftHeight, rightHeight);",
      "}"
    ].join("\n"),
    java: [
      "public int maxDepth(TreeNode root) {",
      "    if (root == null) return 0;",
      "    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));",
      "}"
    ].join("\n"),
    python: [
      "def maxDepth(self, root: TreeNode) -> int:",
      "    if not root:",
      "        return 0",
      "    return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))"
    ].join("\n"),
    javascript: [
      "function maxDepth(root) {",
      "    if (!root) return 0;",
      "    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[3,9,20,null,null,15,7]", expected: "3" },
    { input: "[1,null,2]", expected: "2" },
    { input: "[]", expected: "0" },
    { input: "[0]", expected: "1" }
  ],
  jsTestCall: `(function(root){ return String(maxDepth(root)); })(__INPUT__)`
},

{
  id: 2,
  title: "Identical Trees",
  difficulty: "Easy",
  accuracy: "75.10%",
  submissions: "800K+",
  companies: ["Amazon", "LinkedIn", "Bloomberg"],
  pattern: "Recursion / DFS",
  realWorld: [
    "Used in version control systems (like Git) to compare file directory structures",
    "and in database syncing to check if local and remote data trees match."
  ].join(" "),
  description: [
    "Given the roots of two binary trees <strong>p</strong> and <strong>q</strong>, write a function to check if they are the same or not.",
    "Two binary trees are considered the same if they are structurally identical,",
    "and the nodes have the same value."
  ].join(" "),
  examples: [
    { 
      input: "p = [1,2,3], q = [1,2,3]", 
      output: "true", 
      explain: "Both trees have the same structure and node values." 
    },
    { 
      input: "p = [1,2], q = [1,null,2]", 
      output: "false", 
      explain: "The structure of the trees is different." 
    }
  ],
  constraints: [
    "The number of nodes in both trees is in the range [0, 100].",
    "-10⁴ ≤ Node.val ≤ 10⁴"
  ],
  hint: [
    "Two trees are identical if: 1. Their roots are both null (Base case).",
    "2. Their root values are the same.",
    "3. The left subtrees are identical AND the right subtrees are identical.",
    "<br>Time: O(min(N, M)) · Space: O(min(H1, H2))"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    bool isSameTree(TreeNode* p, TreeNode* q) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public boolean isSameTree(TreeNode p, TreeNode q) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function isSameTree(p, q) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "bool isSameTree(TreeNode* p, TreeNode* q) {",
      "    if (!p && !q) return true;",
      "    if (!p || !q || p->val != q->val) return false;",
      "    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);",
      "}"
    ].join("\n"),
    java: [
      "public boolean isSameTree(TreeNode p, TreeNode q) {",
      "    if (p == null && q == null) return true;",
      "    if (p == null || q == null || p.val != q.val) return false;",
      "    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);",
      "}"
    ].join("\n"),
    python: [
      "def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:",
      "    if not p and not q: return True",
      "    if not p or not q or p.val != q.val: return False",
      "    return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)"
    ].join("\n"),
    javascript: [
      "function isSameTree(p, q) {",
      "    if (!p && !q) return true;",
      "    if (!p || !q || p.val !== q.val) return false;",
      "    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "p=[1,2,3], q=[1,2,3]", expected: "true" },
    { input: "p=[1,2], q=[1,null,2]", expected: "false" },
    { input: "p=[], q=[]", expected: "true" }
  ],
  jsTestCall: `(function(p, q){ return String(isSameTree(p, q)); })(__INPUT_P__, __INPUT_Q__)`
},

{
  id: 3,
  title: "Mirror Trees",
  difficulty: "Easy",
  accuracy: "72.15%",
  submissions: "1.2M+",
  companies: ["Google", "Twitter", "Facebook"],
  pattern: "Tree Transformation",
  realWorld: [
    "Used in graphical software to 'flip' a structured image or object vertically/horizontally",
    "and in certain data encryption algorithms that rely on bit-tree shuffling."
  ].join(" "),
  description: [
    "Given the <strong>root</strong> of a binary tree, invert the tree,",
    "turning it into its mirror image, and return its root."
  ].join(" "),
  examples: [
    { 
      input: "root = [4,2,7,1,3,6,9]", 
      output: "[4,7,2,9,6,3,1]", 
      explain: "The left and right children of every node are swapped." 
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 100].",
    "-100 ≤ Node.val ≤ 100"
  ],
  hint: [
    "To create a mirror, you need to swap the left and right pointers of every node.",
    "Use a temporary variable to hold one child while performing the swap.",
    "Recursively call the function for the original left and right subtrees.",
    "<br>Time: O(n) · Space: O(h)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    TreeNode* invertTree(TreeNode* root) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public TreeNode invertTree(TreeNode root) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function invertTree(root) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "TreeNode* invertTree(TreeNode* root) {",
      "    if (!root) return NULL;",
      "    TreeNode* temp = root->left;",
      "    root->left = invertTree(root->right);",
      "    root->right = invertTree(temp);",
      "    return root;",
      "}"
    ].join("\n"),
    java: [
      "public TreeNode invertTree(TreeNode root) {",
      "    if (root == null) return null;",
      "    TreeNode temp = root.left;",
      "    root.left = invertTree(root.right);",
      "    root.right = invertTree(temp);",
      "    return root;",
      "}"
    ].join("\n"),
    python: [
      "def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:",
      "    if not root: return None",
      "    root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)",
      "    return root"
    ].join("\n"),
    javascript: [
      "function invertTree(root) {",
      "    if (!root) return null;",
      "    let temp = root.left;",
      "    root.left = invertTree(root.right);",
      "    root.right = invertTree(temp);",
      "    return root;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[4,2,7,1,3,6,9]", expected: "[4,7,2,9,6,3,1]" },
    { input: "[2,1,3]", expected: "[2,3,1]" },
    { input: "[]", expected: "[]" }
  ],
  jsTestCall: `(function(root){ return JSON.stringify(invertTree(root)); })(__INPUT__)`
},

{
  id: 4,
  title: "Symmetric Trees",
  difficulty: "Easy",
  accuracy: "65.40%",
  submissions: "950K+",
  companies: ["Microsoft", "Adobe", "Apple"],
  pattern: "Recursion / Two Pointers",
  realWorld: [
    "Used in bioinformatics to detect palindromic symmetry in DNA secondary structures",
    "and in design software to validate structural balance in architectural layouts."
  ].join(" "),
  description: [
    "Given the <strong>root</strong> of a binary tree, check whether it is a",
    "mirror of itself (i.e., symmetric around its center)."
  ].join(" "),
  examples: [
    { 
      input: "root = [1,2,2,3,4,4,3]", 
      output: "true", 
      explain: "The tree is perfectly balanced and mirrored." 
    },
    { 
      input: "root = [1,2,2,null,3,null,3]", 
      output: "false", 
      explain: "The structure is symmetric but node values are missing in mirrored positions." 
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 1000].",
    "-100 ≤ Node.val ≤ 100"
  ],
  hint: [
    "A tree is symmetric if the left subtree is a mirror of the right subtree.",
    "Create a helper function that takes two nodes (L and R).",
    "Compare: L.val == R.val AND L.left with R.right AND L.right with R.left.",
    "<br>Time: O(n) · Space: O(h)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    bool isSymmetric(TreeNode* root) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public boolean isSymmetric(TreeNode root) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def isSymmetric(self, root: Optional[TreeNode]) -> bool:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function isSymmetric(root) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "bool isMirror(TreeNode* t1, TreeNode* t2) {",
      "    if (!t1 && !t2) return true;",
      "    if (!t1 || !t2) return false;",
      "    return (t1->val == t2->val) && isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);",
      "}",
      "",
      "bool isSymmetric(TreeNode* root) {",
      "    return isMirror(root, root);",
      "}"
    ].join("\n"),
    java: [
      "public boolean isSymmetric(TreeNode root) {",
      "    return isMirror(root, root);",
      "}",
      "",
      "private boolean isMirror(TreeNode t1, TreeNode t2) {",
      "    if (t1 == null && t2 == null) return true;",
      "    if (t1 == null || t2 == null) return false;",
      "    return (t1.val == t2.val) && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);",
      "}"
    ].join("\n"),
    python: [
      "def isSymmetric(self, root: Optional[TreeNode]) -> bool:",
      "    def isMirror(t1, t2):",
      "        if not t1 and not t2: return True",
      "        if not t1 or not t2: return False",
      "        return (t1.val == t2.val) and isMirror(t1.left, t2.right) and isMirror(t1.right, t2.left)",
      "    return isMirror(root, root)"
    ].join("\n"),
    javascript: [
      "function isSymmetric(root) {",
      "    function isMirror(t1, t2) {",
      "        if (!t1 && !t2) return true;",
      "        if (!t1 || !t2) return false;",
      "        return (t1.val === t2.val) && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);",
      "    }",
      "    return isMirror(root, root);",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[1,2,2,3,4,4,3]", expected: "true" },
    { input: "[1,2,2,null,3,null,3]", expected: "false" },
    { input: "[1]", expected: "true" }
  ],
  jsTestCall: `(function(root){ return String(isSymmetric(root)); })(__INPUT__)`
},

{
  id: 5,
  title: "Diameter of Tree",
  difficulty: "Medium",
  accuracy: "48.20%",
  submissions: "600K+",
  companies: ["Amazon", "Google", "Uber"],
  pattern: "Recursion / DFS",
  realWorld: [
    "Used in network design to find the longest communication delay between any two nodes",
    "and in logistics to find the maximum possible distance between delivery points in a hub-spoke model."
  ].join(" "),
  description: [
    "Given the <strong>root</strong> of a binary tree, return the length of the <strong>diameter</strong> of the tree.",
    "The diameter of a binary tree is the length of the longest path between any two nodes in a tree.",
    "This path may or may not pass through the root."
  ].join(" "),
  examples: [
    { 
      input: "root = [1,2,3,4,5]", 
      output: "3", 
      explain: "The longest path is [4,2,1,3] or [5,2,1,3], which consists of 3 edges." 
    },
    { 
      input: "root = [1,2]", 
      output: "1", 
      explain: "The longest path is [1,2], consisting of 1 edge." 
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 10⁴].",
    "-100 ≤ Node.val ≤ 100"
  ],
  hint: [
    "The diameter at any node is height(left) + height(right).",
    "We need to keep track of the maximum diameter seen across all nodes.",
    "Use a recursive helper that returns the height, but updates a global/reference variable for the diameter.",
    "<br>Time: O(n) · Space: O(h)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    int diameterOfBinaryTree(TreeNode* root) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public int diameterOfBinaryTree(TreeNode root) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def diameterOfBinaryTree(self, root: TreeNode) -> int:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function diameterOfBinaryTree(root) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "int height(TreeNode* node, int& res) {",
      "    if (!node) return 0;",
      "    int lh = height(node->left, res);",
      "    int rh = height(node->right, res);",
      "    res = max(res, lh + rh);",
      "    return 1 + max(lh, rh);",
      "}",
      "",
      "int diameterOfBinaryTree(TreeNode* root) {",
      "    int res = 0;",
      "    height(root, res);",
      "    return res;",
      "}"
    ].join("\n"),
    java: [
      "int maxD = 0;",
      "public int diameterOfBinaryTree(TreeNode root) {",
      "    dfs(root);",
      "    return maxD;",
      "}",
      "",
      "private int dfs(TreeNode node) {",
      "    if (node == null) return 0;",
      "    int left = dfs(node.left);",
      "    int right = dfs(node.right);",
      "    maxD = Math.max(maxD, left + right);",
      "    return 1 + Math.max(left, right);",
      "}"
    ].join("\n"),
    python: [
      "def diameterOfBinaryTree(self, root: TreeNode) -> int:",
      "    self.res = 0",
      "    def dfs(node):",
      "        if not node: return 0",
      "        l, r = dfs(node.left), dfs(node.right)",
      "        self.res = max(self.res, l + r)",
      "        return 1 + max(l, r)",
      "    dfs(root)",
      "    return self.res"
    ].join("\n"),
    javascript: [
      "function diameterOfBinaryTree(root) {",
      "    let res = 0;",
      "    function dfs(node) {",
      "        if (!node) return 0;",
      "        let l = dfs(node.left);",
      "        let r = dfs(node.right);",
      "        res = Math.max(res, l + r);",
      "        return 1 + Math.max(l, r);",
      "    }",
      "    dfs(root);",
      "    return res;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[1,2,3,4,5]", expected: "3" },
    { input: "[1,2]", expected: "1" },
    { input: "[1]", expected: "0" }
  ],
  jsTestCall: `(function(root){ return String(diameterOfBinaryTree(root)); })(__INPUT__)`
},

{
  id: 6,
  title: "Check if Subtree",
  difficulty: "Easy",
  accuracy: "46.10%",
  submissions: "720K+",
  companies: ["Facebook", "Amazon", "Apple"],
  pattern: "Tree Traversal / Helper Function",
  realWorld: [
    "Used in code analysis tools to find duplicated code snippets (represented as AST subtrees)",
    "and in pattern matching within hierarchical data formats like XML or JSON."
  ].join(" "),
  description: [
    "Given the roots of two binary trees <strong>root</strong> and <strong>subRoot</strong>,",
    "return <strong>true</strong> if there is a subtree of root with the same structure and node values of subRoot."
  ].join(" "),
  examples: [
    { 
      input: "root = [3,4,5,1,2], subRoot = [4,1,2]", 
      output: "true", 
      explain: "The node with value 4 in 'root' forms a subtree identical to 'subRoot'." 
    }
  ],
  constraints: [
    "The number of nodes in 'root' is in range [1, 2000].",
    "The number of nodes in 'subRoot' is in range [1, 1000]."
  ],
  hint: [
    "You need a helper function 'isSame(t1, t2)' to check if two trees are identical.",
    "For every node in 'root', check if the tree starting there is same as 'subRoot'.",
    "The answer is: isSame(root, subRoot) OR isSubtree(root.left, subRoot) OR isSubtree(root.right, subRoot).",
    "<br>Time: O(N * M) · Space: O(h)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    bool isSubtree(TreeNode* root, TreeNode* subRoot) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public boolean isSubtree(TreeNode root, TreeNode subRoot) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function isSubtree(root, subRoot) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "bool isSame(TreeNode* s, TreeNode* t) {",
      "    if (!s && !t) return true;",
      "    if (!s || !t || s->val != t->val) return false;",
      "    return isSame(s->left, t->left) && isSame(s->right, t->right);",
      "}",
      "",
      "bool isSubtree(TreeNode* root, TreeNode* subRoot) {",
      "    if (!root) return false;",
      "    if (isSame(root, subRoot)) return true;",
      "    return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);",
      "}"
    ].join("\n"),
    java: [
      "public boolean isSubtree(TreeNode root, TreeNode subRoot) {",
      "    if (root == null) return false;",
      "    if (isSame(root, subRoot)) return true;",
      "    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);",
      "}",
      "",
      "private boolean isSame(TreeNode s, TreeNode t) {",
      "    if (s == null && t == null) return true;",
      "    if (s == null || t == null || s.val != t.val) return false;",
      "    return isSame(s.left, t.left) && isSame(s.right, t.right);",
      "}"
    ].join("\n"),
    python: [
      "def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:",
      "    def isSame(s, t):",
      "        if not s and not t: return True",
      "        if not s or not t or s.val != t.val: return False",
      "        return isSame(s.left, t.left) and isSame(s.right, t.right)",
      "",
      "    if not root: return False",
      "    if isSame(root, subRoot): return True",
      "    return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)"
    ].join("\n"),
    javascript: [
      "function isSubtree(root, subRoot) {",
      "    function isSame(s, t) {",
      "        if (!s && !t) return true;",
      "        if (!s || !t || s.val !== t.val) return false;",
      "        return isSame(s.left, t.left) && isSame(s.right, t.right);",
      "    }",
      "    if (!root) return false;",
      "    if (isSame(root, subRoot)) return true;",
      "    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "root=[3,4,5,1,2], sub=[4,1,2]", expected: "true" },
    { input: "root=[3,4,5,1,2,null,null,null,null,0], sub=[4,1,2]", expected: "false" }
  ],
  jsTestCall: `(function(r, s){ return String(isSubtree(r, s)); })(__INPUT_R__, __INPUT_S__)`
},
{
  id: 7,
  title: "Check for BST",
  difficulty: "Medium",
  accuracy: "32.10%",
  submissions: "1.5M+",
  companies: ["Microsoft", "LinkedIn", "Amazon"],
  pattern: "Recursion with Bounds",
  realWorld: [
    "Used in database engines to ensure that search indexes haven't been corrupted,",
    "and in high-performance lookup systems where data integrity is required for O(log n) efficiency."
  ].join(" "),
  description: [
    "Given the <strong>root</strong> of a binary tree, determine if it is a valid <strong>Binary Search Tree (BST)</strong>.",
    "For a tree to be a valid BST: <br>1. The left subtree of a node contains only nodes with keys <strong>less than</strong> the node's key.",
    "<br>2. The right subtree contains only nodes with keys <strong>greater than</strong> the node's key.",
    "<br>3. Both the left and right subtrees must also be binary search trees."
  ].join(" "),
  examples: [
    { 
      input: "root = [2,1,3]", 
      output: "true", 
      explain: "The root is 2, left is 1 (smaller), and right is 3 (greater). Valid." 
    },
    { 
      input: "root = [5,1,4,null,null,3,6]", 
      output: "false", 
      explain: "The root is 5. Its right child is 4, which is not greater than 5." 
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 10⁴].",
    "-2³¹ ≤ Node.val ≤ 2³¹ - 1"
  ],
  hint: [
    "A simple check of node.left < node < node.right is NOT enough.",
    "You must carry a valid range [min, max] down to every node.",
    "When you go Left, the maximum allowed value becomes the parent's value.",
    "When you go Right, the minimum allowed value becomes the parent's value.",
    "<br>Time: O(n) · Space: O(h)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    bool isValidBST(TreeNode* root) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public boolean isValidBST(TreeNode root) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def isValidBST(self, root: Optional[TreeNode]) -> bool:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "/**",
      " * @param {TreeNode} root",
      " * @return {boolean}",
      " */",
      "function isValidBST(root) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "bool validate(TreeNode* node, long minVal, long maxVal) {",
      "    if (!node) return true;",
      "    if (node->val <= minVal || node->val >= maxVal) return false;",
      "    return validate(node->left, minVal, node->val) && ",
      "           validate(node->right, node->val, maxVal);",
      "}",
      "",
      "bool isValidBST(TreeNode* root) {",
      "    return validate(root, LONG_MIN, LONG_MAX);",
      "}"
    ].join("\n"),
    java: [
      "public boolean isValidBST(TreeNode root) {",
      "    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);",
      "}",
      "",
      "private boolean validate(TreeNode node, long min, long max) {",
      "    if (node == null) return true;",
      "    if (node.val <= min || node.val >= max) return false;",
      "    return validate(node.left, min, node.val) && ",
      "           validate(node.right, node.val, max);",
      "}"
    ].join("\n"),
    python: [
      "def isValidBST(self, root: Optional[TreeNode]) -> bool:",
      "    def validate(node, low, high):",
      "        if not node: return True",
      "        if not (low < node.val < high): return False",
      "        return validate(node.left, low, node.val) and \\",
      "               validate(node.right, node.val, high)",
      "    ",
      "    return validate(root, float('-inf'), float('inf'))"
    ].join("\n"),
    javascript: [
      "function isValidBST(root) {",
      "    function validate(node, min, max) {",
      "        if (!node) return true;",
      "        if (node.val <= min || node.val >= max) return false;",
      "        return validate(node.left, min, node.val) && ",
      "               validate(node.right, node.val, max);",
      "    }",
      "    return validate(root, -Infinity, Infinity);",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[2,1,3]", expected: "true" },
    { input: "[5,1,4,null,null,3,6]", expected: "false" },
    { input: "[10,5,15,null,null,6,20]", expected: "false" }
  ],
  jsTestCall: `(function(root){ return String(isValidBST(root)); })(__INPUT__)`
},
{
  id: 8,
  title: "Sorted Linked List to BST",
  difficulty: "Medium",
  accuracy: "60.45%",
  submissions: "400K+",
  companies: ["Google", "Facebook", "Microsoft"],
  pattern: "Divide and Conquer",
  realWorld: [
    "Used in database systems to convert flat, sorted log files into a",
    "balanced B-Tree index for faster data retrieval and search efficiency."
  ].join(" "),
  description: [
    "Given the <strong>head</strong> of a singly linked list where elements are sorted in ascending order,",
    "convert it to a <strong>height-balanced</strong> binary search tree."
  ].join(" "),
  examples: [
    { 
      input: "head = [-10,-3,0,5,9]", 
      output: "[0,-3,9,-10,null,5]", 
      explain: "One possible answer is [0,-3,9,-10,null,5], which represents a balanced BST." 
    }
  ],
  constraints: [
    "The number of nodes in the list is in the range [0, 2 * 10⁴].",
    "-10⁵ ≤ Node.val ≤ 10⁵"
  ],
  hint: [
    "Find the middle element of the linked list using the slow/fast pointer approach.",
    "The middle element becomes the root of the BST.",
    "Recursively repeat the process for the left half and right half of the linked list.",
    "<br>Time: O(n log n) · Space: O(log n)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    TreeNode* sortedListToBST(ListNode* head) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    public TreeNode sortedListToBST(ListNode head) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function sortedListToBST(head) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "TreeNode* sortedListToBST(ListNode* head) {",
      "    if (!head) return nullptr;",
      "    if (!head->next) return new TreeNode(head->val);",
      "    ListNode *slow = head, *fast = head, *prev = nullptr;",
      "    while (fast && fast->next) {",
      "        prev = slow;",
      "        slow = slow->next;",
      "        fast = fast->next->next;",
      "    }",
      "    prev->next = nullptr;",
      "    TreeNode* root = new TreeNode(slow->val);",
      "    root->left = sortedListToBST(head);",
      "    root->right = sortedListToBST(slow->next);",
      "    return root;",
      "}"
    ].join("\n"),
    java: [
      "public TreeNode sortedListToBST(ListNode head) {",
      "    if (head == null) return null;",
      "    if (head.next == null) return new TreeNode(head.val);",
      "    ListNode slow = head, fast = head, prev = null;",
      "    while (fast != null && fast.next != null) {",
      "        prev = slow;",
      "        slow = slow.next;",
      "        fast = fast.next.next;",
      "    }",
      "    prev.next = null;",
      "    TreeNode root = new TreeNode(slow.val);",
      "    root.left = sortedListToBST(head);",
      "    root.right = sortedListToBST(slow.next);",
      "    return root;",
      "}"
    ].join("\n"),
    python: [
      "def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:",
      "    if not head: return None",
      "    if not head.next: return TreeNode(head.val)",
      "    slow, fast, prev = head, head, None",
      "    while fast and fast.next:",
      "        prev, slow, fast = slow, slow.next, fast.next.next",
      "    prev.next = None",
      "    root = TreeNode(slow.val)",
      "    root.left = self.sortedListToBST(head)",
      "    root.right = self.sortedListToBST(slow.next)",
      "    return root"
    ].join("\n"),
    javascript: [
      "function sortedListToBST(head) {",
      "    if (!head) return null;",
      "    if (!head.next) return new TreeNode(head.val);",
      "    let slow = head, fast = head, prev = null;",
      "    while (fast && fast.next) {",
      "        prev = slow;",
      "        slow = slow.next;",
      "        fast = fast.next.next;",
      "    }",
      "    prev.next = null;",
      "    let root = new TreeNode(slow.val);",
      "    root.left = sortedListToBST(head);",
      "    root.right = sortedListToBST(slow.next);",
      "    return root;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[-10,-3,0,5,9]", expected: "[0,-3,9,-10,null,5]" },
    { input: "[]", expected: "[]" }
  ],
  jsTestCall: `(function(head){ return JSON.stringify(sortedListToBST(head)); })(__INPUT__)`
},
{
  id: 9,
  title: "Binary Tree to Doubly Linked List",
  difficulty: "Hard",
  accuracy: "52.30%",
  submissions: "250K+",
  companies: ["Amazon", "Salesforce", "DE Shaw"],
  pattern: "Inorder Traversal",
  realWorld: [
    "Used in system compilers to flatten hierarchical parse trees into a",
    "linear sequence of instructions while maintaining logical execution order."
  ].join(" "),
  description: [
    "Given a Binary Tree, convert it to a <strong>Doubly Linked List (DLL)</strong> in-place.",
    "The order of nodes in the DLL should be the same as the <strong>Inorder Traversal</strong> of the tree."
  ].join(" "),
  examples: [
    { 
      input: "root = [10,12,15,25,30,36]", 
      output: "25 <-> 12 <-> 30 <-> 10 <-> 36 <-> 15", 
      explain: "The inorder traversal results in this specific DLL structure." 
    }
  ],
  constraints: [
    "The number of nodes is in range [1, 10⁵].",
    "0 ≤ Node.val ≤ 1000"
  ],
  hint: [
    "Perform an Inorder traversal (Left, Root, Right).",
    "Keep a 'prev' pointer to track the previously visited node.",
    "For the current node, set its left pointer to 'prev' and the 'prev' node's right pointer to 'current'.",
    "<br>Time: O(n) · Space: O(h)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    Node* bToDLL(Node* root) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    Node bToDLL(Node root) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def bToDLL(self, root):",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function bToDLL(root) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "Node *head = NULL, *prevNode = NULL;",
      "void convert(Node* root) {",
      "    if (!root) return;",
      "    convert(root->left);",
      "    if (!prevNode) head = root;",
      "    else { root->left = prevNode; prevNode->right = root; }",
      "    prevNode = root;",
      "    convert(root->right);",
      "}",
      "Node* bToDLL(Node* root) {",
      "    head = NULL, prevNode = NULL;",
      "    convert(root);",
      "    return head;",
      "}"
    ].join("\n"),
    java: [
      "Node head = null, prev = null;",
      "void convert(Node root) {",
      "    if (root == null) return;",
      "    convert(root.left);",
      "    if (prev == null) head = root;",
      "    else { root.left = prev; prev.right = root; }",
      "    prev = root;",
      "    convert(root.right);",
      "}",
      "Node bToDLL(Node root) {",
      "    convert(root);",
      "    return head;",
      "}"
    ].join("\n"),
    python: [
      "def bToDLL(self, root):",
      "    self.head = None",
      "    self.prev = None",
      "    def convert(node):",
      "        if not node: return",
      "        convert(node.left)",
      "        if not self.prev: self.head = node",
      "        else: node.left = self.prev; self.prev.right = node",
      "        self.prev = node",
      "        convert(node.right)",
      "    convert(root)",
      "    return self.head"
    ].join("\n"),
    javascript: [
      "function bToDLL(root) {",
      "    let head = null, prev = null;",
      "    function convert(node) {",
      "        if (!node) return;",
      "        convert(node.left);",
      "        if (!prev) head = node;",
      "        else { node.left = prev; prev.right = node; }",
      "        prev = node;",
      "        convert(node.right);",
      "    }",
      "    convert(root);",
      "    return head;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[10,20,30]", expected: "20 <-> 10 <-> 30" }
  ],
  jsTestCall: `(function(root){ return String(bToDLL(root)); })(__INPUT__)`
},
{
  id: 10,
  title: "Maximum Sum Path Between Two Leaves",
  difficulty: "Hard",
  accuracy: "28.50%",
  submissions: "180K+",
  companies: ["Facebook", "Directi", "FactSet"],
  pattern: "Post-order Traversal",
  realWorld: [
    "Used in calculating the maximum capacity path in hierarchical networks,",
    "where traffic must flow between two edge nodes through a central switch."
  ].join(" "),
  description: [
    "Given a binary tree, find the maximum path sum between any <strong>two leaf nodes</strong>.",
    "The path must start at one leaf and end at another leaf."
  ].join(" "),
  examples: [
    { 
      input: "root = [3,4,5,-10,4]", 
      output: "16", 
      explain: "The max path between leaves is (-10 -> 4 -> 3 -> 5) = 16 or (4 -> 4 -> 3 -> 5) = 16." 
    }
  ],
  constraints: [
    "The number of nodes is in range [2, 10⁴].",
    "-1000 ≤ Node.val ≤ 1000"
  ],
  hint: [
    "Use recursion to calculate the maximum root-to-leaf path sum for subtrees.",
    "At each node, update the global maximum sum as: root.val + left_max + right_max.",
    "Special Case: Ensure both left and right children exist before updating the global max.",
    "<br>Time: O(n) · Space: O(h)"
  ].join("<br>• "),
  starterCode: {
    cpp: [
      "class Solution {",
      "public:",
      "    int maxLeafPath(Node* root) {",
      "        // Your code here",
      "    }",
      "};"
    ].join("\n"),
    java: [
      "public class Solution {",
      "    int maxLeafPath(Node root) {",
      "        // Your code here",
      "    }",
      "}"
    ].join("\n"),
    python: [
      "class Solution:",
      "    def maxLeafPath(self, root):",
      "        # Your code here",
      "        pass"
    ].join("\n"),
    javascript: [
      "function maxLeafPath(root) {",
      "    // Your code here",
      "}"
    ].join("\n")
  },
  solution: {
    cpp: [
      "int res = INT_MIN;",
      "int solve(Node* root) {",
      "    if (!root) return 0;",
      "    if (!root->left && !root->right) return root->data;",
      "    int ls = solve(root->left);",
      "    int rs = solve(root->right);",
      "    if (root->left && root->right) {",
      "        res = max(res, ls + rs + root->data);",
      "        return max(ls, rs) + root->data;",
      "    }",
      "    return (!root->left) ? rs + root->data : ls + root->data;",
      "}",
      "int maxLeafPath(Node* root) {",
      "    res = INT_MIN; solve(root); return res;",
      "}"
    ].join("\n"),
    java: [
      "int res = Integer.MIN_VALUE;",
      "int solve(Node node) {",
      "    if (node == null) return 0;",
      "    if (node.left == null && node.right == null) return node.data;",
      "    int ls = solve(node.left);",
      "    int rs = solve(node.right);",
      "    if (node.left != null && node.right != null) {",
      "        res = Math.max(res, ls + rs + node.data);",
      "        return Math.max(ls, rs) + node.data;",
      "    }",
      "    return (node.left == null) ? rs + node.data : ls + node.data;",
      "}",
      "int maxLeafPath(Node root) {",
      "    res = Integer.MIN_VALUE; solve(root); return res;",
      "}"
    ].join("\n"),
    python: [
      "def maxLeafPath(self, root):",
      "    self.res = float('-inf')",
      "    def solve(node):",
      "        if not node: return 0",
      "        if not node.left and not node.right: return node.data",
      "        ls = solve(node.left)",
      "        rs = solve(node.right)",
      "        if node.left and node.right:",
      "            self.res = max(self.res, ls + rs + node.data)",
      "            return max(ls, rs) + node.data",
      "        return rs + node.data if not node.left else ls + node.data",
      "    solve(root)",
      "    return self.res"
    ].join("\n"),
    javascript: [
      "function maxLeafPath(root) {",
      "    let res = -Infinity;",
      "    function solve(node) {",
      "        if (!node) return 0;",
      "        if (!node.left && !node.right) return node.data;",
      "        let ls = solve(node.left);",
      "        let rs = solve(node.right);",
      "        if (node.left && node.right) {",
      "            res = Math.max(res, ls + rs + node.data);",
      "            return Math.max(ls, rs) + node.data;",
      "        }",
      "        return !node.left ? rs + node.data : ls + node.data;",
      "    }",
      "    solve(root);",
      "    return res;",
      "}"
    ].join("\n")
  },
  testCases: [
    { input: "[3,4,5,-10,4]", expected: "16" }
  ],
  jsTestCall: `(function(root){ return String(maxLeafPath(root)); })(__INPUT__)`
},


];