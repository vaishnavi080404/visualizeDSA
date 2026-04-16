const TOPIC_CONFIG = {
  name: "Graphs",
  level: "Level 3 of 3 · Problems",
  backLink: "topics.html",
  backLabel: "Topics"
};

const PROBLEMS = [
  {
    id: 1,
    title: "BFS Traversal (Adjacency List)",
    difficulty: "Easy",
    accuracy: "70.4%",
    submissions: "400K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "BFS",
    realWorld: "Used in shortest path discovery in unweighted networks like social graphs (degrees of connection).",
    description: `Given an undirected graph with <strong>V</strong> vertices (0..V-1) represented as an adjacency list, perform BFS traversal starting from vertex 0 and return the visitation order.`,
    examples: [{ input: "V=5, adj=[[1,2],[0,3],[0,4],[1],[2]]", output: "[0,1,2,3,4]", explain: "Starting from 0, visit 1 and 2, then neighbors of 1 (3) and neighbors of 2 (4)." }],
    constraints: ["1 ≤ V ≤ 10⁴", "0 ≤ E ≤ 2*10⁴"],
    hint: `Use a queue and a visited array. Start from 0, mark as visited, and enqueue.`,
    starterCode: {
      cpp: "vector<int> bfsOfGraph(int V, vector<int> adj[]) {\n    // Your code here\n}",
      python: "def bfsOfGraph(V, adj):\n    # Your code here\n    pass",
      java: "public ArrayList<Integer> bfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {\n    // Your code here\n}",
      javascript: "function bfsOfGraph(V, adj) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "vector<int> bfsOfGraph(int V, vector<int> adj[]) {\n    vector<int> bfs; vector<int> vis(V, 0);\n    queue<int> q; q.push(0); vis[0] = 1;\n    while(!q.empty()) {\n        int node = q.front(); q.pop(); bfs.push_back(node);\n        for(auto it : adj[node]) if(!vis[it]) { vis[it] = 1; q.push(it); }\n    }\n    return bfs;\n}",
      python: "def bfsOfGraph(V, adj):\n    vis = [0] * V\n    q = [0]\n    vis[0] = 1\n    bfs = []\n    while q:\n        node = q.pop(0)\n        bfs.append(node)\n        for neighbor in adj[node]:\n            if not vis[neighbor]:\n                vis[neighbor] = 1\n                q.append(neighbor)\n    return bfs",
      java: "public ArrayList<Integer> bfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {\n    ArrayList<Integer> bfs = new ArrayList<>();\n    boolean vis[] = new boolean[V];\n    Queue<Integer> q = new LinkedList<>();\n    q.add(0); vis[0] = true;\n    while(!q.isEmpty()) {\n        Integer node = q.poll(); bfs.add(node);\n        for(Integer it : adj.get(node)) if(!vis[it]) { vis[it] = true; q.add(it); }\n    }\n    return bfs;\n}",
      javascript: "function bfsOfGraph(V, adj) {\n    let vis = new Array(V).fill(false);\n    let q = [0]; vis[0] = true; let res = [];\n    while(q.length > 0) {\n        let node = q.shift(); res.push(node);\n        for(let neighbor of adj[node]) if(!vis[neighbor]) { vis[neighbor] = true; q.push(neighbor); }\n    }\n    return res;\n}"
    },
    testCases: [
      { input: "5, [[1,2],[0,3],[0,4],[1],[2]]", expected: "[0,1,2,3,4]" }
    ],
    jsTestCall: `String(bfsOfGraph(__INPUT__))`
  },
  {
    id: 2,
    title: "DFS Traversal (Adjacency List)",
    difficulty: "Easy",
    accuracy: "68.2%",
    submissions: "350K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "DFS",
    realWorld: "Used in topological sorting, solving puzzles (mazes), and finding connected components.",
    description: `Given an undirected graph represented as an adjacency list, perform DFS traversal starting from vertex 0 and return the visitation order.`,
    examples: [{ input: "V=5, adj=[[1,2],[0,3],[0,4],[1],[2]]", output: "[0,1,3,2,4]" }],
    constraints: ["1 ≤ V ≤ 10⁴", "0 ≤ E ≤ 2*10⁴"],
    hint: `Use recursion. Mark visited before exploring neighbors.`,
    starterCode: {
      cpp: "vector<int> dfsOfGraph(int V, vector<int> adj[]) {\n    // Your code here\n}",
      python: "def dfsOfGraph(V, adj):\n    # Your code here\n    pass",
      java: "public ArrayList<Integer> dfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {\n    // Your code here\n}",
      javascript: "function dfsOfGraph(V, adj) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "void dfs(int node, vector<int> adj[], vector<int> &vis, vector<int> &res) {\n    vis[node] = 1; res.push_back(node);\n    for(auto it : adj[node]) if(!vis[it]) dfs(it, adj, vis, res);\n}\nvector<int> dfsOfGraph(int V, vector<int> adj[]) {\n    vector<int> res; vector<int> vis(V, 0);\n    dfs(0, adj, vis, res); return res;\n}",
      python: "def dfsOfGraph(V, adj):\n    vis = [0] * V\n    res = []\n    def dfs(node):\n        vis[node] = 1\n        res.append(node)\n        for neighbor in adj[node]:\n            if not vis[neighbor]: dfs(neighbor)\n    dfs(0)\n    return res",
      java: "public ArrayList<Integer> dfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {\n    ArrayList<Integer> res = new ArrayList<>();\n    boolean vis[] = new boolean[V];\n    dfs(0, vis, adj, res);\n    return res;\n}\nprivate void dfs(int node, boolean vis[], ArrayList<ArrayList<Integer>> adj, ArrayList<Integer> res) {\n    vis[node] = true; res.add(node);\n    for(Integer it : adj.get(node)) if(!vis[it]) dfs(it, vis, adj, res);\n}",
      javascript: "function dfsOfGraph(V, adj) {\n    let vis = new Array(V).fill(false); let res = [];\n    function dfs(node) {\n        vis[node] = true; res.push(node);\n        for(let n of adj[node]) if(!vis[n]) dfs(n);\n    }\n    dfs(0); return res;\n}"
    },
    testCases: [
      { input: "5, [[1,2],[0,3],[0,4],[1],[2]]", expected: "[0,1,3,2,4]" }
    ],
    jsTestCall: `String(dfsOfGraph(__INPUT__))`
  },
  {
    id: 3,
    title: "Detect Cycle in Undirected Graph",
    difficulty: "Medium",
    accuracy: "55.4%",
    submissions: "250K+",
    companies: ["Amazon", "Google"],
    pattern: "DFS/BFS with Parent",
    realWorld: "Used in resource allocation to detect deadlocks in operating systems.",
    description: `Given an undirected graph, determine if it contains a cycle.`,
    examples: [{ input: "V=3, adj=[[1],[0,2],[1,0]]", output: "true" }],
    constraints: ["1 ≤ V ≤ 10⁴", "0 ≤ E ≤ 2*10⁴"],
    hint: "Use DFS. Keep track of the node you came from (parent). If you hit a visited node that isn't the parent, a cycle exists.",
    starterCode: {
      cpp: "bool isCycle(int V, vector<int> adj[]) {\n    // Your code here\n}",
      python: "def isCycle(V, adj):\n    # Your code here\n    pass",
      java: "public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {\n    // Your code here\n}",
      javascript: "function isCycle(V, adj) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "bool dfs(int node, int parent, vector<int> &vis, vector<int> adj[]) {\n    vis[node] = 1;\n    for(auto it : adj[node]) {\n        if(!vis[it]) { if(dfs(it, node, vis, adj)) return true; }\n        else if(it != parent) return true;\n    }\n    return false;\n}\nbool isCycle(int V, vector<int> adj[]) {\n    vector<int> vis(V, 0);\n    for(int i=0; i<V; i++) if(!vis[i]) if(dfs(i, -1, vis, adj)) return true;\n    return false;\n}",
      python: "def isCycle(V, adj):\n    vis = [0] * V\n    def dfs(node, parent):\n        vis[node] = 1\n        for neighbor in adj[node]:\n            if not vis[neighbor]:\n                if dfs(neighbor, node): return True\n            elif neighbor != parent: return True\n        return False\n    for i in range(V):\n        if not vis[i]:\n            if dfs(i, -1): return True\n    return False",
      java: "public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {\n    boolean vis[] = new boolean[V];\n    for(int i=0; i<V; i++) if(!vis[i]) if(dfs(i, -1, vis, adj)) return true;\n    return false;\n}\nprivate boolean dfs(int node, int parent, boolean vis[], ArrayList<ArrayList<Integer>> adj) {\n    vis[node] = true;\n    for(int it : adj.get(node)) {\n        if(!vis[it]) { if(dfs(it, node, vis, adj)) return true; }\n        else if(it != parent) return true;\n    }\n    return false;\n}",
      javascript: "function isCycle(V, adj) {\n    let vis = new Array(V).fill(false);\n    function dfs(node, parent) {\n        vis[node] = true;\n        for(let n of adj[node]) {\n            if(!vis[n]) { if(dfs(n, node)) return true; }\n            else if(n !== parent) return true;\n        }\n        return false;\n    }\n    for(let i=0; i<V; i++) if(!vis[i]) if(dfs(i, -1)) return true;\n    return false;\n}"
    },
    testCases: [{ input: "3, [[1,2],[0,2],[0,1]]", expected: "true" }],
    jsTestCall: `String(isCycle(__INPUT__))`
  },
  {
    id: 4,
    title: "Shortest Path in Unweighted Graph",
    difficulty: "Medium",
    accuracy: "62.1%",
    submissions: "220K+",
    companies: ["Amazon", "Microsoft", "Uber"],
    pattern: "BFS Distance",
    realWorld: "Used in GPS navigation to find the route with the fewest number of turns or stops.",
    description: `Given an unweighted undirected graph, compute the shortest distance from source <strong>src</strong> to all vertices. If unreachable, distance is -1.`,
    examples: [{ input: "V=4, edges=[[0,1],[0,2],[1,2],[2,3]], src=0", output: "[0,1,1,2]" }],
    constraints: ["1 ≤ V ≤ 10⁴", "0 ≤ E ≤ 2*10⁴"],
    hint: `Perform a standard BFS. Initialize distance array with infinity.`,
    starterCode: {
      cpp: "vector<int> shortestPath(int V, vector<vector<int>>& edges, int src) {\n    // Your code here\n}",
      python: "def shortestPath(V, edges, src):\n    # Your code here\n    pass",
      java: "public int[] shortestPath(int V, int[][] edges, int src) {\n    // Your code here\n}",
      javascript: "function shortestPath(V, edges, src) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "vector<int> shortestPath(int V, vector<vector<int>>& edges, int src) {\n    vector<int> adj[V];\n    for(auto it : edges) { adj[it[0]].push_back(it[1]); adj[it[1]].push_back(it[0]); }\n    vector<int> dist(V, -1); dist[src] = 0;\n    queue<int> q; q.push(src);\n    while(!q.empty()) {\n        int node = q.front(); q.pop();\n        for(auto it : adj[node]) if(dist[it] == -1) { dist[it] = dist[node] + 1; q.push(it); }\n    }\n    return dist;\n}",
      python: "def shortestPath(V, edges, src):\n    adj = [[] for _ in range(V)]\n    for u, v in edges: adj[u].append(v); adj[v].append(u)\n    dist = [-1] * V\n    dist[src] = 0\n    q = [src]\n    while q:\n        u = q.pop(0)\n        for v in adj[u]:\n            if dist[v] == -1:\n                dist[v] = dist[u] + 1\n                q.append(v)\n    return dist",
      java: "public int[] shortestPath(int V, int[][] edges, int src) {\n    ArrayList<ArrayList<Integer>> adj = new ArrayList<>();\n    for(int i=0; i<V; i++) adj.add(new ArrayList<>());\n    for(int[] edge : edges) { adj.get(edge[0]).add(edge[1]); adj.get(edge[1]).add(edge[0]); }\n    int dist[] = new int[V]; Arrays.fill(dist, -1);\n    dist[src] = 0; Queue<Integer> q = new LinkedList<>(); q.add(src);\n    while(!q.isEmpty()) {\n        int node = q.poll();\n        for(int it : adj.get(node)) if(dist[it] == -1) { dist[it] = dist[node] + 1; q.add(it); }\n    }\n    return dist;\n}",
      javascript: "function shortestPath(V, edges, src) {\n    let adj = Array.from({length: V}, () => []);\n    for(let [u, v] of edges) { adj[u].push(v); adj[v].push(u); }\n    let dist = new Array(V).fill(-1); dist[src] = 0; let q = [src];\n    while(q.length > 0) {\n        let u = q.shift();\n        for(let v of adj[u]) if(dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }\n    }\n    return dist;\n}"
    },
    testCases: [{ input: "4, [[0,1],[0,2],[1,2],[2,3]], 0", expected: "[0,1,1,2]" }],
    jsTestCall: `String(shortestPath(__INPUT__))`
  },
  {
    id: 5,
    title: "Topological Sort (DAG)",
    difficulty: "Medium",
    accuracy: "58.2%",
    submissions: "200K+",
    companies: ["Amazon", "Microsoft", "Google"],
    pattern: "Kahn's Algorithm",
    realWorld: "Used in build systems (like Make or Gradle) to determine the order of task execution based on dependencies.",
    description: `Given a Directed Acyclic Graph (DAG), return a topological ordering of its vertices.`,
    examples: [{ input: "V=6, adj=[[],[],[3],[1],[0,1],[0,2]]", output: "[5,4,2,3,1,0]" }],
    constraints: ["1 ≤ V ≤ 10⁴", "0 ≤ E ≤ 2*10⁴"],
    hint: `Compute indegree of all nodes. Push nodes with 0 indegree to a queue and process neighbors.`,
    starterCode: {
      cpp: "vector<int> topoSort(int V, vector<int> adj[]) {\n    // Your code here\n}",
      python: "def topoSort(V, adj):\n    # Your code here\n    pass",
      java: "public int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {\n    // Your code here\n}",
      javascript: "function topoSort(V, adj) {\n    // Your code here\n}"
    },
    solution: {
      cpp: "vector<int> topoSort(int V, vector<int> adj[]) {\n    int indegree[V] = {0};\n    for(int i=0; i<V; i++) for(auto it : adj[i]) indegree[it]++;\n    queue<int> q; for(int i=0; i<V; i++) if(indegree[i] == 0) q.push(i);\n    vector<int> topo;\n    while(!q.empty()) {\n        int node = q.front(); q.pop(); topo.push_back(node);\n        for(auto it : adj[node]) { indegree[it]--; if(indegree[it] == 0) q.push(it); }\n    }\n    return topo;\n}",
      python: "def topoSort(V, adj):\n    indegree = [0] * V\n    for i in range(V): \n        for neighbor in adj[i]: indegree[neighbor] += 1\n    q = [i for i in range(V) if indegree[i] == 0]\n    topo = []\n    while q:\n        u = q.pop(0); topo.append(u)\n        for v in adj[u]:\n            indegree[v] -= 1\n            if indegree[v] == 0: q.append(v)\n    return topo",
      java: "public int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {\n    int indegree[] = new int[V];\n    for(int i=0; i<V; i++) for(int it : adj.get(i)) indegree[it]++;\n    Queue<Integer> q = new LinkedList<>();\n    for(int i=0; i<V; i++) if(indegree[i] == 0) q.add(i);\n    int topo[] = new int[V]; int idx = 0;\n    while(!q.isEmpty()) {\n        int node = q.poll(); topo[idx++] = node;\n        for(int it : adj.get(node)) { indegree[it]--; if(indegree[it] == 0) q.add(it); }\n    }\n    return topo;\n}",
      javascript: "function topoSort(V, adj) {\n    let indegree = new Array(V).fill(0);\n    for(let i=0; i<V; i++) for(let neighbor of adj[i]) indegree[neighbor]++;\n    let q = []; for(let i=0; i<V; i++) if(indegree[i] === 0) q.push(i);\n    let res = [];\n    while(q.length > 0) {\n        let u = q.shift(); res.push(u);\n        for(let v of adj[u]) { indegree[v]--; if(indegree[v] === 0) q.push(v); }\n    }\n    return res;\n}"
    },
    testCases: [{ input: "6, [[],[],[3],[1],[0,1],[0,2]]", expected: "[5,4,2,3,1,0]" }],
    jsTestCall: `String(topoSort(__INPUT__))`
  }
];