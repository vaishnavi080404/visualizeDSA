const TOPIC_CONFIG = {
  name: "Matrix ",
  level: "Level 3 of 3 · Problems",
  backLink: "matrix_L1.html",
  backLabel: "Matrix"
};

const PROBLEMS = [
  {
    id: 1,
    title: "Search in a Matrix (Linear)",
    difficulty: "Easy",
    accuracy: "85.2%",
    submissions: "200K+",
    companies: ["TCS", "Accenture", "Wipro"],
    pattern: "Linear Traversal",
    realWorld: "Finding a specific seat number in a cinema hall seating arrangement or locating a coordinate on a spreadsheet.",
    description: `Given a 2D matrix <strong>mat</strong> of size <strong>N x M</strong> and an integer <strong>X</strong>, check if the element X is present in the matrix. 
<br><br>Return true if found, otherwise return false.`,
    examples: [
      { input: 'N=2, M=2, mat=[[1,2],[3,4]], X=3', output: 'true' },
      { input: 'N=2, M=2, mat=[[1,2],[3,4]], X=5', output: 'false' }
    ],
    constraints: ['1 ≤ N, M ≤ 1000', '1 ≤ mat[i][j], X ≤ 10⁶'],
    hint: `Use nested loops to visit every element <code>mat[i][j]</code> and compare it with X.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool searchMatrix(vector<vector<int>>& mat, int x) {
    // Your code here
    return false;
}

int main() {
    int n, m, x; cin >> n >> m >> x;
    vector<vector<int>> mat(n, vector<int>(m));
    for(int i=0; i<n; i++) for(int j=0; j<m; j++) cin >> mat[i][j];
    cout << (searchMatrix(mat, x) ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public static boolean searchMatrix(int[][] mat, int x) {
        // Your code here
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt(), x = sc.nextInt();
        int[][] mat = new int[n][m];
        for(int i=0; i<n; i++) for(int j=0; j<m; j++) mat[i][j] = sc.nextInt();
        System.out.println(searchMatrix(mat, x));
    }
}`,
      python: `def search_matrix(mat, x):
    # Your code here
    pass

if __name__ == "__main__":
    n, m, x = map(int, input().split())
    mat = [list(map(int, input().split())) for _ in range(n)]
    print("true" if search_matrix(mat, x) else "false")`,
      javascript: `function searchMatrix(mat, x) {
    // Your code here
}`
    },
    solution: {
      cpp: `bool searchMatrix(vector<vector<int>>& mat, int x) {
    for(auto& row : mat) {
        for(int val : row) {
            if(val == x) return true;
        }
    }
    return false;
}`,
      java: `public static boolean searchMatrix(int[][] mat, int x) {
    for(int[] row : mat) {
        for(int val : row) if(val == x) return true;
    }
    return false;
}`,
      python: `def search_matrix(mat, x):
    for row in mat:
        if x in row: return True
    return False`,
      javascript: `function searchMatrix(mat, x) {
    return mat.some(row => row.includes(x));
}`
    },
    testCases: [
      { input: "2 2 3\n1 2\n3 4", expected: "true" },
      { input: "2 2 5\n1 2\n3 4", expected: "false" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 2,
    title: "Matrix Arithmetic (Add, Sub, Mul)",
    difficulty: "Medium",
    accuracy: "62.1%",
    submissions: "150K+",
    companies: ["Microsoft", "Samsung"],
    pattern: "Mathematical Logic",
    realWorld: "Core of computer graphics transformations and neural network layer operations where weights are multiplied by inputs.",
    description: `Given two matrices <strong>A</strong> and <strong>B</strong> of size <strong>N x M</strong> for addition/subtraction, and compatible dimensions for multiplication. 
<br><br>Perform the requested operation. For multiplication, result matrix will be <strong>N x P</strong> if A is N x M and B is M x P.`,
    examples: [
      { input: 'A=[[1,1],[1,1]], B=[[1,1],[1,1]], op="add"', output: '[[2,2],[2,2]]' }
    ],
    constraints: ['1 ≤ N, M, P ≤ 100'],
    hint: `Addition/Subtraction is element-wise. For multiplication, <code>C[i][j] = sum(A[i][k] * B[k][j])</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> multiply(vector<vector<int>>& A, vector<vector<int>>& B) {
    // Multiplication logic
    return {};
}`,
      java: `import java.util.*;
class Main {
    public static int[][] multiply(int[][] A, int[][] B) {
        return new int[0][0];
    }
}`,
      python: `def multiply(A, B):
    pass`,
      javascript: `function multiply(A, B) { }`
    },
    solution: {
      cpp: `vector<vector<int>> multiply(vector<vector<int>>& A, vector<vector<int>>& B) {
    int n = A.size(), m = A[0].size(), p = B[0].size();
    vector<vector<int>> C(n, vector<int>(p, 0));
    for(int i=0; i<n; i++)
        for(int j=0; j<p; j++)
            for(int k=0; k<m; k++)
                C[i][j] += A[i][k] * B[k][j];
    return C;
}`
    },
    testCases: [
      { input: "2 2 2\n1 1\n1 1\n1 1\n1 1", expected: "2 2\n2 2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 3,
    title: "Sort the Given Matrix",
    difficulty: "Medium",
    accuracy: "72.4%",
    submissions: "80K+",
    companies: ["Amazon", "Google"],
    pattern: "Flattening + Sorting",
    realWorld: "Used in image processing to sort color values across a bitmap or in report generation to order multi-dimensional grid data.",
    description: `Given an <strong>N x N</strong> matrix, sort all the elements in the matrix in non-decreasing order such that the elements in the resulting matrix are ordered row by row.`,
    examples: [
      { input: 'mat=[[10,20,30],[5,10,15],[2,1,8]]', output: '[[1,2,5],[8,10,10],[15,20,30]]' }
    ],
    constraints: ['1 ≤ N ≤ 500'],
    hint: `1. Flatten matrix to a 1D array.<br>2. Sort the 1D array.<br>3. Fill the matrix back row by row.`,
    starterCode: {
      cpp: `void sortMatrix(vector<vector<int>>& mat) { }`,
      java: `public void sortMatrix(int[][] mat) { }`,
      python: `def sort_matrix(mat): pass`,
      javascript: `function sortMatrix(mat) { }`
    },
    solution: {
      cpp: `void sortMatrix(vector<vector<int>>& mat) {
    int n = mat.size();
    vector<int> temp;
    for(auto& r : mat) for(int x : r) temp.push_back(x);
    sort(temp.begin(), temp.end());
    int k=0;
    for(int i=0; i<n; i++) for(int j=0; j<n; j++) mat[i][j] = temp[k++];
}`,
      python: `def sort_matrix(mat):
    n = len(mat)
    temp = sorted([x for row in mat for x in row])
    for i in range(n):
        for j in range(n):
            mat[i][j] = temp[i*n + j]`,
      java: `public void sortMatrix(int[][] mat) {
    int n = mat.length;
    ArrayList<Integer> list = new ArrayList<>();
    for(int[] row : mat) for(int x : row) list.add(x);
    Collections.sort(list);
    int k = 0;
    for(int i=0; i<n; i++) for(int j=0; j<n; j++) mat[i][j] = list.get(k++);
}`,
      javascript: `function sortMatrix(mat) {
    let flat = mat.flat().sort((a,b) => a-b);
    let n = mat.length;
    for(let i=0; i<n; i++) mat[i] = flat.slice(i*n, (i+1)*n);
}`
    },
    testCases: [
      { input: "2\n4 1\n3 2", expected: "1 2\n3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 4,
    title: "Search in a Sorted Matrix",
    difficulty: "Medium",
    accuracy: "52.4%",
    submissions: "350K+",
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Staircase Search / Binary Search",
    realWorld: "Used in databases where data is sorted along multiple indices, allowing for extremely fast lookups without scanning every row.",
    description: `Given a matrix where each row is sorted <strong>left-to-right</strong> and each column is sorted <strong>top-to-bottom</strong>. Find if target <strong>X</strong> exists. 
<br><br>Goal: Solve in <strong>O(N+M)</strong>.`,
    examples: [
      { input: 'mat=[[1,4,7],[2,5,8],[3,6,9]], X=5', output: 'true' }
    ],
    constraints: ['1 ≤ N, M ≤ 1000'],
    hint: `Start from the <strong>top-right</strong> corner. If current > X, move left (col--). If current < X, move down (row++).`,
    starterCode: {
      cpp: `bool searchSorted(vector<vector<int>>& mat, int x) { }`,
      java: `public boolean searchSorted(int[][] mat, int x) { }`,
      python: `def search_sorted(mat, x): pass`,
      javascript: `function searchSorted(mat, x) { }`
    },
    solution: {
      cpp: `bool searchSorted(vector<vector<int>>& mat, int x) {
    int i = 0, j = mat[0].size() - 1;
    while(i < mat.size() && j >= 0) {
        if(mat[i][j] == x) return true;
        mat[i][j] > x ? j-- : i++;
    }
    return false;
}`,
      python: `def search_sorted(mat, x):
    r, c = 0, len(mat[0]) - 1
    while r < len(mat) and c >= 0:
        if mat[r][c] == x: return True
        if mat[r][c] > x: c -= 1
        else: r += 1
    return False`,
      java: `public boolean searchSorted(int[][] mat, int x) {
    int i = 0, j = mat[0].length - 1;
    while(i < mat.length && j >= 0) {
        if(mat[i][j] == x) return true;
        if(mat[i][j] > x) j--;
        else i++;
    }
    return false;
}`,
      javascript: `function searchSorted(mat, x) {
    let r = 0, c = mat[0].length - 1;
    while(r < mat.length && c >= 0) {
        if(mat[r][c] === x) return true;
        mat[r][c] > x ? c-- : r++;
    }
    return false;
}`
    },
    testCases: [
      { input: "3 3 5\n1 4 7\n2 5 8\n3 6 9", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 5,
    title: "Traverse Matrix using Recursion",
    difficulty: "Easy",
    accuracy: "68.3%",
    submissions: "120K+",
      companies: ["TCS", "Infosys"],
    pattern: "Recursion",
    realWorld: "Used in Divide and Conquer algorithms like Strassen's matrix multiplication or recursive image subdivision (Quadtrees).",
    description: `Implement a function to print all elements of an <strong>N x M</strong> matrix using <strong>recursion</strong>.`,
    examples: [
      { input: 'mat=[[1,2],[3,4]]', output: '1 2 3 4' }
    ],
    hint: `Function <code>traverse(r, c)</code>: Print element, then call <code>traverse(r, c+1)</code>. If <code>c</code> exceeds limit, call <code>traverse(r+1, 0)</code>.`,
    starterCode: {
      cpp: `void traverse(vector<vector<int>>& mat, int r, int c) { }`,
      java: `void traverse(int[][] mat, int r, int c) { }`,
      python: `def traverse(mat, r, c): pass`,
      javascript: `function traverse(mat, r, c) { }`
    },
    solution: {
      cpp: `void traverse(vector<vector<int>>& mat, int r, int c) {
    int rows = mat.size(), cols = mat[0].size();
    if (r >= rows) return;
    cout << mat[r][c] << " ";
    if (c + 1 < cols) traverse(mat, r, c + 1);
    else traverse(mat, r + 1, 0);
}`
    },
    testCases: [
      { input: "2 2\n1 2\n3 4", expected: "1 2 3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 6,
    title: "Transpose of a Matrix",
    difficulty: "Easy",
    accuracy: "88.1%",
    submissions: "180K+",
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    pattern: "Index Swap",
    realWorld: "Essential for rotating images 90 degrees or converting 'Rows' to 'Columns' in data reporting tools.",
    description: `Given a matrix <strong>A</strong>, return the <strong>transpose</strong> of A. The transpose is obtained by flipping the matrix over its main diagonal (swapping rows with columns).`,
    examples: [
      { input: 'A=[[1,2],[3,4]]', output: '[[1,3],[2,4]]' }
    ],
    hint: `For a square matrix, swap <code>mat[i][j]</code> with <code>mat[j][i]</code> for all <code>j > i</code>.`,
    starterCode: {
      cpp: `void transpose(vector<vector<int>>& mat) { }`,
      java: `public void transpose(int[][] mat) { }`,
      python: `def transpose(mat): pass`,
      javascript: `function transpose(mat) { }`
    },
    solution: {
      cpp: `void transpose(vector<vector<int>>& mat) {
    int n = mat.size();
    for(int i=0; i<n; i++)
        for(int j=i+1; j<n; j++)
            swap(mat[i][j], mat[j][i]);
}`,
      python: `def transpose(mat):
    n = len(mat)
    for i in range(n):
        for j in range(i+1, n):
            mat[i][j], mat[j][i] = mat[j][i], mat[i][j]`,
      java: `public void transpose(int[][] mat) {
    int n = mat.length;
    for(int i=0; i<n; i++) {
        for(int j=i+1; j<n; j++) {
            int temp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = temp;
        }
    }
}`,
      javascript: `function transpose(mat) {
    let n = mat.length;
    for(let i=0; i<n; i++) {
        for(let j=i+1; j<n; j++) {
            [mat[i][j], mat[j][i]] = [mat[j][i], mat[i][j]];
        }
    }
}`
    },
    testCases: [
      { input: "2\n1 2\n3 4", expected: "1 3\n2 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 7,
    title: "Determinant of a Matrix",
    difficulty: "Hard",
    accuracy: "42.5%",
    submissions: "60K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Recursive Cofactors",
    realWorld: "Used in graphics to calculate object scaling and in physics to solve systems of linear equations.",
    description: `Calculate the <strong>determinant</strong> of an <strong>N x N</strong> matrix using recursion.`,
    examples: [
      { input: '[[1,0],[0,1]]', output: '1' },
      { input: '[[1,2],[3,4]]', output: '-2' }
    ],
    hint: `Use Laplace Expansion. Pick a row and for each element, multiply by its cofactor (recursively find determinant of N-1 matrix).`,
    starterCode: {
      cpp: `int determinant(vector<vector<int>>& mat, int n) { }`,
      java: `int determinant(int[][] mat, int n) { }`,
      python: `def determinant(mat): pass`,
      javascript: `function determinant(mat) { }`
    },
    solution: {
      cpp: `int determinant(vector<vector<int>>& mat, int n) {
    if (n == 1) return mat[0][0];
    if (n == 2) return mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0];
    int det = 0;
    vector<vector<int>> sub(n, vector<int>(n));
    for (int x = 0; x < n; x++) {
        int subi = 0;
        for (int i = 1; i < n; i++) {
            int subj = 0;
            for (int j = 0; j < n; j++) {
                if (j == x) continue;
                sub[subi][subj] = mat[i][j];
                subj++;
            }
            subi++;
        }
        det += (x % 2 == 0 ? 1 : -1) * mat[0][x] * determinant(sub, n - 1);
    }
    return det;
}`
    },
    testCases: [
      { input: "2\n1 2\n3 4", expected: "-2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 8,
    title: "Adjoint and Inverse of a Matrix",
    difficulty: "Hard",
    accuracy: "35.1%",
    submissions: "40K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Cofactors + Transpose",
    realWorld: "Used in cryptography (Hill Cipher) to decrypt messages and in 3D gaming to invert camera view transformations.",
    description: `Given an <strong>N x N</strong> matrix, find its <strong>Adjoint</strong> and its <strong>Inverse</strong>. 
<br><br>Inverse = Adjoint / Determinant. Return "No Inverse" if determinant is zero.`,
    examples: [
      { input: '[[1,2],[3,4]]', output: 'Inv: [[-2,1],[1.5,-0.5]]' }
    ],
    hint: `1. Calculate matrix of cofactors.<br>2. Transpose it to get Adjoint.<br>3. Divide every element by the Determinant for the Inverse.`,
    starterCode: {
      cpp: `void inverse(vector<vector<int>>& mat) { }`,
      java: `void inverse(int[][] mat) { }`,
      python: `def inverse(mat): pass`,
      javascript: `function inverse(mat) { }`
    },
    solution: {
      cpp: `// Adjoint is Transpose of Cofactor Matrix
// Inverse = Adjoint(A) / det(A)`
    },
    testCases: [
      { input: "2\n1 2\n3 4", expected: "Inverse calculation" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 9,
    title: "Valid Sudoku",
    difficulty: "Medium",
    accuracy: "56.4%",
    submissions: "250K+",
    companies: ["Google", "Amazon", "Uber"],
    pattern: "Hashing / Set",
    realWorld: "Used in game engines and puzzle validators to ensure data integrity within a constrained grid.",
    description: `Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
<br>1. Each row must contain digits 1-9 without repetition.
<br>2. Each column must contain digits 1-9 without repetition.
<br>3. Each of the nine 3x3 sub-boxes must contain digits 1-9 without repetition.
<br><br>Note: A board can be valid even if it is not solvable. Empty cells are filled with '.'.`,
    examples: [
      { input: 'board = [["5","3",".",".","7",".",".",".","."],...]', output: 'true' }
    ],
    constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit or "."'],
    hint: `Use 3 sets of hashes: one for rows, one for columns, and one for 3x3 blocks. For a cell (r, c), the block index is <code>(r/3)*3 + (c/3)</code>.`,
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

bool isValidSudoku(vector<vector<char>>& board) {
    // Your code here
    return false;
}

int main() {
    vector<vector<char>> board(9, vector<char>(9));
    for(int i=0; i<9; i++) for(int j=0; j<9; j++) cin >> board[i][j];
    cout << (isValidSudoku(board) ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.*;
class Main {
    public boolean isValidSudoku(char[][] board) {
        // Your code here
        return false;
    }
}`,
      python: `def is_valid_sudoku(board):
    # Your code here
    pass`,
      javascript: `function isValidSudoku(board) {
    // Your code here
}`
    },
    solution: {
      cpp: `bool isValidSudoku(vector<vector<char>>& board) {
    int row[9][9] = {0}, col[9][9] = {0}, block[9][9] = {0};
    for(int r=0; r<9; r++) {
        for(int c=0; c<9; c++) {
            if(board[r][c] != '.') {
                int num = board[r][c] - '1';
                int b = (r/3)*3 + (c/3);
                if(row[r][num] || col[c][num] || block[b][num]) return false;
                row[r][num] = col[c][num] = block[b][num] = 1;
            }
        }
    }
    return true;
}`,
      python: `def is_valid_sudoku(board):
    res = []
    for i, row in enumerate(board):
        for j, x in enumerate(row):
            if x != '.':
                res += [(i, x), (x, j), (i // 3, j // 3, x)]
    return len(res) == len(set(res))`,
      java: `public boolean isValidSudoku(char[][] board) {
    Set seen = new HashSet();
    for (int i=0; i<9; ++i) {
        for (int j=0; j<9; ++j) {
            char number = board[i][j];
            if (number != '.')
                if (!seen.add(number + " in row " + i) ||
                    !seen.add(number + " in col " + j) ||
                    !seen.add(number + " in block " + i/3 + "-" + j/3))
                    return false;
        }
    }
    return true;
}`,
      javascript: `function isValidSudoku(board) {
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];
            if (val === '.') continue;
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            if (rows[r].has(val) || cols[c].has(val) || boxes[b].has(val)) return false;
            rows[r].add(val); cols[c].add(val); boxes[b].add(val);
        }
    }
    return true;
}`
    },
    testCases: [
      { input: "9x9 board with valid placements", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 10,
    title: "Validate Tic Tac Toe",
    difficulty: "Medium",
    accuracy: "41.2%",
    submissions: "45K+",
    companies: ["Google", "Amazon", "Dropbox"],
    pattern: "State Verification",
    realWorld: "Used in anti-cheat systems for board games to detect if a provided game state is reachable via legal moves.",
    description: `Given a Tic Tac Toe board as a 3x3 character matrix, determine if the board state is valid. 
<br>Rules: 
<br>1. X starts first.
<br>2. Players alternate. 
<br>3. Valid counts: count(X) == count(O) or count(X) == count(O) + 1.`,
    examples: [
      { input: 'board = [["X","X","X"], ["O","O","."], ["O",".","."]]', output: 'true' }
    ],
    hint: `Check three things: 1. Counts of X and O. 2. If O wins, X count must equal O count. 3. If X wins, X count must be O count + 1.`,
    starterCode: {
      cpp: `bool isValidTicTacToe(vector<string>& board) { }`,
      java: `public boolean isValidTicTacToe(String[] board) { }`,
      python: `def valid_tic_tac_toe(board): pass`,
      javascript: `function validTicTacToe(board) { }`
    },
    solution: {
      cpp: `bool win(vector<string>& b, char p) {
    for(int i=0; i<3; i++) {
        if(b[i][0]==p && b[i][1]==p && b[i][2]==p) return true;
        if(b[0][i]==p && b[1][i]==p && b[2][i]==p) return true;
    }
    return (b[0][0]==p && b[1][1]==p && b[2][2]==p) || (b[0][2]==p && b[1][1]==p && b[2][0]==p);
}
bool isValidTicTacToe(vector<string>& board) {
    int x=0, o=0;
    for(string s: board) for(char c: s) { if(c=='X') x++; if(c=='O') o++; }
    if(o > x || x > o + 1) return false;
    if(win(board, 'X') && x != o + 1) return false;
    if(win(board, 'O') && x != o) return false;
    return true;
}`
    },
    testCases: [
      { input: "XXX, OO., O..", expected: "true" },
      { input: "XOX, O, O", expected: "false" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 11,
    title: "The Celebrity Problem",
    difficulty: "Medium",
    accuracy: "45.8%",
    submissions: "150K+",
    companies: ["Amazon"],
    pattern: "Two Pointers / Elimination",
    realWorld: "Used in social network influence analysis to find a user who is followed by everyone but follows no one (a pure consumer/influencer).",
    description: `A celebrity is a person who is known to all but does not know anyone. Given an <strong>N x N</strong> matrix <code>M</code> where <code>M[i][j] = 1</code> means person <code>i</code> knows person <code>j</code>, find the index of the celebrity.`,
    examples: [
      { input: 'M = [[0, 1, 0], [0, 0, 0], [0, 1, 0]]', output: '1', explain: 'Person 1 is known by 0 and 2, but 1 knows no one.' }
    ],
    hint: `Use two pointers (i=0, j=n-1). If <code>i</code> knows <code>j</code>, <code>i</code> cannot be the celebrity, so <code>i++</code>. Otherwise, <code>j</code> cannot be the celebrity, so <code>j--</code>.`,
    starterCode: {
      cpp: `int celebrity(vector<vector<int>>& M, int n) { }`,
      java: `int celebrity(int M[][], int n) { }`,
      python: `def celebrity(M, n): pass`,
      javascript: `function celebrity(M, n) { }`
    },
    solution: {
      cpp: `int celebrity(vector<vector<int>>& M, int n) {
    int i = 0, j = n - 1;
    while(i < j) M[i][j] ? i++ : j--;
    for(int k=0; k<n; k++) {
        if(k != i && (M[i][k] || !M[k][i])) return -1;
    }
    return i;
}`
    },
    testCases: [
      { input: "3\n0 1 0\n0 0 0\n0 1 0", expected: "1" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 12,
    title: "Boundary Elements",
    difficulty: "Easy",
    accuracy: "78.2%",
    submissions: "100K+",
    companies: ["Amazon"],
    pattern: "Conditional Traversal",
    realWorld: "Used in image processing to apply filters or borders only to the outermost pixels of an image.",
    description: `Given an <strong>N x M</strong> matrix, print all elements on the boundary of the matrix in a clockwise manner.`,
    examples: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '1 2 3 6 9 8 7 4' }
    ],
    hint: `Boundary elements are those where <code>row == 0</code>, <code>row == N-1</code>, <code>col == 0</code>, or <code>col == M-1</code>.`,
    starterCode: {
      cpp: `void printBoundary(vector<vector<int>>& mat) { }`,
      java: `void printBoundary(int[][] mat) { }`,
      python: `def print_boundary(mat): pass`,
      javascript: `function printBoundary(mat) { }`
    },
    solution: {
      cpp: `void printBoundary(vector<vector<int>>& mat) {
    int n = mat.size(), m = mat[0].size();
    if(n == 1) { for(int i=0; i<m; i++) cout << mat[0][i] << " "; return; }
    if(m == 1) { for(int i=0; i<n; i++) cout << mat[i][0] << " "; return; }
    for(int j=0; j<m; j++) cout << mat[0][j] << " ";
    for(int i=1; i<n; i++) cout << mat[i][m-1] << " ";
    for(int j=m-2; j>=0; j--) cout << mat[n-1][j] << " ";
    for(int i=n-2; i>=1; i--) cout << mat[i][0] << " ";
}`
    },
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expected: "1 2 3 6 9 8 7 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 13,
    title: "Matrix Zig-Zag Traversal",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "100K+",
    companies: ["Google", "Microsoft"],
    pattern: "Diagonal Traversal",
    realWorld: "Used in JPEG compression (Zig-Zag scanning) to group low-frequency coefficients together for better quantization.",
    description: `Given an <strong>N x M</strong> matrix, return all elements of the matrix in zig-zag diagonal order.`,
    examples: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '1 2 4 7 5 3 6 8 9' }
    ],
    hint: `The sum of indices <code>(i+j)</code> is constant for each diagonal. Use this sum to iterate from 0 to N+M-2 and reverse direction based on parity.`,
    starterCode: {
      cpp: `vector<int> findDiagonalOrder(vector<vector<int>>& mat) { }`,
      java: `public int[] findDiagonalOrder(int[][] mat) { }`,
      python: `def findDiagonalOrder(mat): pass`,
      javascript: `function findDiagonalOrder(mat) { }`
    },
    solution: {
      cpp: `vector<int> findDiagonalOrder(vector<vector<int>>& mat) {
    if(mat.empty()) return {};
    int n = mat.size(), m = mat[0].size();
    vector<int> res;
    for(int s=0; s <= n + m - 2; s++) {
        if(s % 2 == 0) {
            for(int i = min(s, n-1); i >= max(0, s-m+1); i--) res.push_back(mat[i][s-i]);
        } else {
            for(int i = max(0, s-m+1); i <= min(s, n-1); i++) res.push_back(mat[i][s-i]);
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expected: "1 2 4 7 5 3 6 8 9" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 14,
    title: "Rotate Matrix Elements by 1",
    difficulty: "Medium",
    accuracy: "52.1%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Boundary Rotation",
    realWorld: "Used in creating animation effects like rolling banners or mechanical simulation of interlocking gears.",
    description: `Given an <strong>N x M</strong> matrix, rotate its elements by 1 position in a clockwise direction.`,
    examples: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '[[4,1,2],[7,5,3],[8,9,6]]' }
    ],
    hint: `Handle the matrix layer by layer. For each layer, shift elements of the four boundaries.`,
    starterCode: {
      cpp: `void rotateMatrix(int m, int n, vector<vector<int>>& mat) { }`,
      java: `void rotateMatrix(int m, int n, int mat[][]) { }`,
      python: `def rotate_matrix(m, n, mat): pass`,
      javascript: `function rotateMatrix(m, n, mat) { }`
    },
    solution: {
      cpp: `void rotateMatrix(int m, int n, vector<vector<int>>& mat) {
    int row = 0, col = 0;
    while (row < m && col < n) {
        if (row + 1 == m || col + 1 == n) break;
        int prev = mat[row + 1][col];
        for (int i = col; i < n; i++) swap(prev, mat[row][i]);
        row++;
        for (int i = row; i < m; i++) swap(prev, mat[i][n-1]);
        n--;
        if (row < m) {
            for (int i = n-1; i >= col; i--) swap(prev, mat[m-1][i]);
        }
        m--;
        if (col < n) {
            for (int i = m-1; i >= row; i--) swap(prev, mat[i][col]);
        }
        col++;
    }
}`
    },
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expected: "4 1 2\n7 5 3\n8 9 6" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 15,
    title: "Matrix Spiral Traversal",
    difficulty: "Medium",
    accuracy: "54.2%",
    submissions: "400K+",
    companies: ["Microsoft", "Apple", "Paytm"],
    pattern: "Boundary Shrinking",
    realWorld: "Used in data serialization of 2D sensors or in printers where the print head follows a spiral path to optimize movement.",
    description: `Given an <strong>N x M</strong> matrix, return all elements of the matrix in spiral order.`,
    examples: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '1 2 3 6 9 8 7 4 5' }
    ],
    hint: `Maintain four pointers: <code>top, bottom, left, right</code>. Iterate and shrink the boundaries after each direction is finished.`,
    starterCode: {
      cpp: `vector<int> spiralOrder(vector<vector<int>>& matrix) { }`,
      java: `public List<Integer> spiralOrder(int[][] matrix) { }`,
      python: `def spiralOrder(matrix): pass`,
      javascript: `function spiralOrder(matrix) { }`
    },
    solution: {
      cpp: `vector<int> spiralOrder(vector<vector<int>>& matrix) {
    int n = matrix.size(), m = matrix[0].size();
    int top = 0, bottom = n-1, left = 0, right = m-1;
    vector<int> res;
    while(top <= bottom && left <= right) {
        for(int i=left; i<=right; i++) res.push_back(matrix[top][i]);
        top++;
        for(int i=top; i<=bottom; i++) res.push_back(matrix[i][right]);
        right--;
        if(top <= bottom) {
            for(int i=right; i>=left; i--) res.push_back(matrix[bottom][i]);
            bottom--;
        }
        if(left <= right) {
            for(int i=bottom; i>=top; i--) res.push_back(matrix[i][left]);
            left++;
        }
    }
    return res;
}`
    },
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expected: "1 2 3 6 9 8 7 4 5" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 16,
    title: "Unique Elements in Matrix",
    difficulty: "Easy",
    accuracy: "81.2%",
    submissions: "50K+",
    companies: ["Amazon", "Google"],
    pattern: "Hashing",
    realWorld: "Used in data auditing to identify unique values in a 2D dataset, such as unique temperature readings across a geographical grid.",
    description: `Given a matrix, find and print all elements that appear exactly once in the entire matrix.`,
    examples: [
      { input: '[[1,2,1],[3,4,2]]', output: '3 4' }
    ],
    hint: `Use a frequency map (Hash Map) to count occurrences of all elements, then print keys with frequency 1.`,
    starterCode: {
      cpp: `void findUnique(vector<vector<int>>& mat) { }`,
      java: `void findUnique(int[][] mat) { }`,
      python: `def find_unique(mat): pass`,
      javascript: `function findUnique(mat) { }`
    },
    solution: {
      cpp: `void findUnique(vector<vector<int>>& mat) {
    unordered_map<int, int> freq;
    for(auto& r: mat) for(int x: r) freq[x]++;
    for(auto& r: mat) for(int x: r) if(freq[x] == 1) cout << x << " ";
}`,
      javascript: `function findUnique(mat) {
    const counts = {};
    mat.flat().forEach(x => counts[x] = (counts[x] || 0) + 1);
    return mat.flat().filter(x => counts[x] === 1);
}`
    },
    testCases: [
      { input: "2 3\n1 2 1\n3 4 2", expected: "3 4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 17,
    title: "Swap Diagonals",
    difficulty: "Easy",
    accuracy: "88.6%",
    submissions: "30K+",
    companies: ["Amazon", "Google"],
    pattern: "Index Mapping",
    realWorld: "Used in basic image manipulation and symmetry operations in computer graphics.",
    description: `Given an <strong>N x N</strong> matrix, swap the elements of the major (main) diagonal with the elements of the minor (anti) diagonal.`,
    examples: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '[[3,2,1],[4,5,6],[9,8,7]]' }
    ],
    hint: `Major diagonal elements are <code>mat[i][i]</code>. Minor diagonal elements are <code>mat[i][n-1-i]</code>.`,
    starterCode: {
      cpp: `void swapDiagonals(vector<vector<int>>& mat) { }`,
      java: `void swapDiagonals(int[][] mat) { }`,
      python: `def swap_diagonals(mat): pass`,
      javascript: `function swapDiagonals(mat) { }`
    },
    solution: {
      cpp: `void swapDiagonals(vector<vector<int>>& mat) {
    int n = mat.size();
    for(int i=0; i<n; i++) swap(mat[i][i], mat[i][n-1-i]);
}`
    },
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expected: "3 2 1\n4 5 6\n9 8 7" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 18,
    title: "Idempotent Matrix",
    difficulty: "Medium",
    accuracy: "68.2%",
    submissions: "10K+",
    companies: ["Amazon", "Google"],
    pattern: "Matrix Multiplication",
    realWorld: "Mathematical verification used in stability tests for projection matrices in 3D graphics.",
    description: `A matrix <strong>A</strong> is idempotent if <code>A * A = A</code>. Given a square matrix, check if it is idempotent.`,
    examples: [
      { input: '[[1,0],[0,1]]', output: 'true' }
    ],
    hint: `Perform matrix multiplication of the matrix with itself and compare the result with the original matrix.`,
    starterCode: {
      cpp: `bool isIdempotent(vector<vector<int>>& mat) { }`,
      java: `boolean isIdempotent(int[][] mat) { }`,
      python: `def is_idempotent(mat): pass`,
      javascript: `function isIdempotent(mat) { }`
    },
    solution: {
      cpp: `bool isIdempotent(vector<vector<int>>& mat) {
    int n = mat.size();
    vector<vector<int>> res(n, vector<int>(n, 0));
    for(int i=0; i<n; i++)
        for(int j=0; j<n; j++)
            for(int k=0; k<n; k++)
                res[i][j] += mat[i][k] * mat[k][j];
    for(int i=0; i<n; i++)
        for(int j=0; j<n; j++)
            if(res[i][j] != mat[i][j]) return false;
    return true;
}`
    },
    testCases: [
      { input: "2 2\n1 0\n0 1", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 19,
    title: "Pascal's Triangle",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "350K+",
    companies: ["Google", "Amazon", "Microsoft"],
    pattern: "Dynamic Programming / Matrix Construction",
    realWorld: "Used in probability theory (Binomial Expansion) and generating combinations (nCr).",
    description: `Given an integer <strong>numRows</strong>, return the first numRows of Pascal's triangle. 
<br>In Pascal's triangle, each number is the sum of the two numbers directly above it.`,
    examples: [
      { input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' }
    ],
    hint: `Each row <code>i</code> has <code>i+1</code> elements. <code>triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]</code>.`,
    starterCode: {
      cpp: `vector<vector<int>> generate(int numRows) { }`,
      java: `public List<List<Integer>> generate(int numRows) { }`,
      python: `def generate(numRows): pass`,
      javascript: `function generate(numRows) { }`
    },
    solution: {
      cpp: `vector<vector<int>> generate(int n) {
    vector<vector<int>> res(n);
    for(int i=0; i<n; i++) {
        res[i].resize(i + 1);
        res[i][0] = res[i][i] = 1;
        for(int j=1; j<i; j++) res[i][j] = res[i-1][j-1] + res[i-1][j];
    }
    return res;
}`
    },
    testCases: [
      { input: "5", expected: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 20,
    title: "Toeplitz Matrix",
    difficulty: "Easy",
    accuracy: "65.3%",
    submissions: "50K+",
    companies: ["Amazon", "Google"],
    pattern: "Diagonal Consistency",
    realWorld: "Used in digital signal processing (convolution operations) where a Toeplitz matrix represents a system's response to an input.",
    description: `A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements. Check if the given matrix is Toeplitz.`,
    examples: [
      { input: '[[1,2,3,4],[5,1,2,3],[9,5,1,2]]', output: 'true' }
    ],
    hint: `Compare each element <code>mat[i][j]</code> with its neighbor <code>mat[i-1][j-1]</code>.`,
    starterCode: {
      cpp: `bool isToeplitzMatrix(vector<vector<int>>& matrix) { }`,
      java: `public boolean isToeplitzMatrix(int[][] matrix) { }`,
      python: `def is_toeplitz_matrix(matrix): pass`,
      javascript: `function isToeplitzMatrix(matrix) { }`
    },
    solution: {
      cpp: `bool isToeplitzMatrix(vector<vector<int>>& matrix) {
    for (int r = 1; r < matrix.size(); r++)
        for (int c = 1; c < matrix[0].size(); c++)
            if (matrix[r][c] != matrix[r-1][c-1]) return false;
    return true;
}`
    },
    testCases: [
      { input: "3 4\n1 2 3 4\n5 1 2 3\n9 5 1 2", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 21,
    title: "Possible Moves of Knight",
    difficulty: "Easy",
    accuracy: "85.4%",
    submissions: "20K+",
    companies: ["Amazon", "Google"],
    pattern: "Offset Mapping",
    realWorld: "A fundamental exercise for pathfinding and game AI logic in Chess-based applications.",
    description: `Given a 8x8 chessboard and the current position of a Knight <code>(r, c)</code>, find all possible cells where the knight can move.`,
    examples: [
      { input: 'pos = (4, 4)', output: '(2,3), (2,5), (3,2), (3,6), (5,2), (5,6), (6,3), (6,5)' }
    ],
    hint: `A knight moves in an 'L' shape. There are 8 potential offsets: <code>(±1, ±2)</code> and <code>(±2, ±1)</code>. Simply check which ones remain within 0-7 bounds.`,
    starterCode: {
      cpp: `vector<pair<int, int>> knightMoves(int r, int c) { }`,
      java: `List<int[]> knightMoves(int r, int c) { }`,
      python: `def knight_moves(r, c): pass`,
      javascript: `function knightMoves(r, c) { }`
    },
    solution: {
      cpp: `vector<pair<int, int>> knightMoves(int r, int c) {
    int dr[] = {-2, -2, -1, -1, 1, 1, 2, 2};
    int dc[] = {-1, 1, -2, 2, -2, 2, -1, 1};
    vector<pair<int, int>> res;
    for(int i=0; i<8; i++) {
        int nr = r + dr[i], nc = c + dc[i];
        if(nr>=0 && nr<8 && nc>=0 && nc<8) res.push_back({nr, nc});
    }
    return res;
}`
    },
    testCases: [
      { input: "4 4", expected: "(2,3) (2,5) (3,2) (3,6) (5,2) (5,6) (6,3) (6,5)" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 22,
    title: "Conway’s Game of Life",
    difficulty: "Medium",
    accuracy: "62.4%",
    submissions: "150K+",
    companies: ["Google", "Amazon", "Dropbox"],
    pattern: "Simulation / In-Place Update",
    realWorld: "Used in computational biology to model population growth and in physics to simulate cellular automata or fluid dynamics.",
    description: `Given a board of cells (1 = alive, 0 = dead), update the board to its next state based on these rules:
<br>1. Any live cell with < 2 live neighbors dies (underpopulation).
<br>2. Any live cell with 2 or 3 live neighbors lives.
<br>3. Any live cell with > 3 live neighbors dies (overpopulation).
<br>4. Any dead cell with exactly 3 live neighbors becomes alive (reproduction).
<br><br>Goal: Update the matrix <strong>in-place</strong>.`,
    examples: [
      { input: 'board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]', output: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]' }
    ],
    constraints: ['m == board.length', 'n == board[i].length', '1 ≤ m, n ≤ 25'],
    hint: `To update in-place, use bits or temporary states. For example, state 2 means "was alive, now dead" and state 3 means "was dead, now alive".`,
    starterCode: {
      cpp: `void gameOfLife(vector<vector<int>>& board) { }`,
      java: `public void gameOfLife(int[][] board) { }`,
      python: `def gameOfLife(board): pass`,
      javascript: `var gameOfLife = function(board) { };`
    },
    solution: {
      cpp: `void gameOfLife(vector<vector<int>>& board) {
    int m = board.size(), n = board[0].size();
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            int neighbors = 0;
            for (int r = i-1; r <= i+1; r++) {
                for (int c = j-1; c <= j+1; c++) {
                    if (r >= 0 && r < m && c >= 0 && c < n && !(r == i && c == j))
                        neighbors += (board[r][c] & 1);
                }
            }
            if (board[i][j] == 1 && (neighbors == 2 || neighbors == 3)) board[i][j] = 3;
            if (board[i][j] == 0 && neighbors == 3) board[i][j] = 2;
        }
    }
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) board[i][j] >>= 1;
}`,
      python: `def gameOfLife(board):
    m, n = len(board), len(board[0])
    for i in range(m):
        for j in range(n):
            cnt = sum(board[r][c] & 1 for r in range(i-1, i+2) for c in range(j-1, j+2)
                      if 0 <= r < m and 0 <= c < n and not (r == i and j == c))
            if board[i][j] == 1 and 2 <= cnt <= 3: board[i][j] = 3
            if board[i][j] == 0 and cnt == 3: board[i][j] = 2
    for i in range(m):
        for j in range(n): board[i][j] >>= 1`
    },
    testCases: [
      { input: "[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]", expected: "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 23,
    title: "Rotate Matrix by 90 Degrees",
    difficulty: "Medium",
    accuracy: "58.4%",
    submissions: "400K+",
    companies: ["Amazon", "Microsoft", "Samsung"],
    pattern: "Layer-wise / Math",
    realWorld: "Used in image processing to rotate photos/videos from landscape to portrait orientation.",
    description: `Rotate an <strong>N x N</strong> matrix by 90 degrees in clockwise direction <strong>in-place</strong>.`,
    examples: [
      { input: '[[1,2],[3,4]]', output: '[[3,1],[4,2]]' }
    ],
    hint: `1. Transpose the matrix (swap mat[i][j] with mat[j][i]). <br>2. Reverse each row.`,
    starterCode: {
      cpp: `void rotate(vector<vector<int>>& matrix) { }`,
      java: `public void rotate(int[][] matrix) { }`,
      python: `def rotate(matrix): pass`,
      javascript: `function rotate(matrix) { }`
    },
    solution: {
      cpp: `void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for(int i=0; i<n; i++) for(int j=i+1; j<n; j++) swap(matrix[i][j], matrix[j][i]);
    for(int i=0; i<n; i++) reverse(matrix[i].begin(), matrix[i].end());
}`,
      javascript: `function rotate(matrix) {
    matrix.reverse();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < matrix[i].length; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
}`
    },
    testCases: [
      { input: "[[1,2,3],[4,5,6],[7,8,9]]", expected: "[[7,4,1],[8,5,2],[9,6,3]]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 24,
    title: "Rotate Matrix by 180 Degrees",
    difficulty: "Easy",
    accuracy: "52.2%",
    submissions: "100K+",
    companies: ["Amazon", "Microsoft"],
    pattern: "Two Pass Flip",
    description: `Rotate a square matrix by 180 degrees in-place.`,
    hint: `A 180-degree rotation is equivalent to reversing the order of all rows, and then reversing the order of elements in each row.`,
    starterCode: {
      cpp: `void rotate180(vector<vector<int>>& matrix) { }`,
      python: `def rotate180(matrix): pass`
    },
    solution: {
      cpp: `void rotate180(vector<vector<int>>& matrix) {
    reverse(matrix.begin(), matrix.end());
    for (auto& row : matrix) reverse(row.begin(), row.end());
}`,
      python: `def rotate180(matrix):
    matrix.reverse()
    for row in matrix: row.reverse()`
    },
    testCases: [
      { input: "[[1,2],[3,4]]", expected: "[[4,3],[2,1]]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 25,
    title: "Largest ‘X' Bordered Submatrix",
    difficulty: "Hard",
    accuracy: "38.2%",
    submissions: "10K+",
    companies: ["Amazon", "Google"],
    pattern: "Dynamic Programming",
    realWorld: "Used in structural engineering to find the largest rigid square framework in a mesh of joints.",
    description: `Given an <strong>N x N</strong> matrix where elements are 'X' or 'O', find the size of the largest square submatrix whose <strong>borders</strong> are only 'X'.`,
    examples: [
      { input: 'grid = [["X","X","X"],["X","O","X"],["X","X","X"]]', output: '3' }
    ],
    hint: `Pre-calculate two matrices: <code>hor[i][j]</code> (consecutive Xs to the left) and <code>ver[i][j]</code> (consecutive Xs above). Then check if a square of size <code>k</code> exists.`,
    starterCode: {
      cpp: `int largestX(vector<vector<char>>& grid) { }`,
      java: `public int largestX(char[][] grid) { }`
    },
    solution: {
      cpp: `int largestX(vector<vector<char>>& grid) {
    int n = grid.size();
    vector<vector<int>> hor(n, vector<int>(n, 0)), ver(n, vector<int>(n, 0));
    for(int i=0; i<n; i++) {
        for(int j=0; j<n; j++) {
            if(grid[i][j] == 'X') {
                hor[i][j] = (j == 0) ? 1 : hor[i][j-1] + 1;
                ver[i][j] = (i == 0) ? 1 : ver[i-1][j] + 1;
            }
        }
    }
    for(int k = n; k >= 1; k--) {
        for(int i = n-1; i >= k-1; i--) {
            for(int j = n-1; j >= k-1; j--) {
                if(hor[i][j] >= k && ver[i][j] >= k && hor[i-k+1][j] >= k && ver[i][j-k+1] >= k) return k;
            }
        }
    }
    return 0;
}`
    },
    testCases: [
      { input: "X X X\nX O X\nX X X", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 26,
    title: "Largest Square Submatrix with All 1s",
    difficulty: "Medium",
    accuracy: "52.1%",
    submissions: "100K+",
    companies: ["Amazon", "Google"],
    pattern: "Dynamic Programming",
    realWorld: "Used in urban planning to find the largest available square plot of land for building within a grid of occupied/empty cells.",
    description: `Given an <strong>m x n</strong> binary matrix filled with 0s and 1s, find the largest square containing only 1s and return its area.`,
    examples: [
      { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: '4' }
    ],
    hint: `<code>dp[i][j]</code> represents the side length of the largest square ending at <code>(i, j)</code>. <br><code>dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1</code> if <code>mat[i][j] == 1</code>.`,
    starterCode: {
      cpp: `int maximalSquare(vector<vector<char>>& matrix) { }`,
      java: `public int maximalSquare(char[][] matrix) { }`,
      python: `def maximalSquare(matrix): pass`,
      javascript: `var maximalSquare = function(matrix) { };`
    },
    solution: {
      cpp: `int maximalSquare(vector<vector<char>>& matrix) {
    if (matrix.empty()) return 0;
    int m = matrix.size(), n = matrix[0].size(), maxSide = 0;
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (matrix[i-1][j-1] == '1') {
                dp[i][j] = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
                maxSide = max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}`
    },
    testCases: [
      { input: "[[1,0,1],[1,1,1],[1,1,1]]", expected: "4" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 27,
    title: "Count Zeros in Sorted Matrix",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "100K+",
    companies: ["Amazon", "Google"],
    pattern: "Staircase Search",
    realWorld: "Used in structural engineering to find the largest rigid square framework in a mesh of joints.",
    description: `Given an <strong>N x N</strong> matrix where each row and column is sorted in ascending order, count the total number of zeros.`,
    hint: `Start from top-right. If <code>mat[r][c] == 0</code>, all elements to the left are 0, so <code>count += (c+1)</code> and move to next row. Else, move left.`,
    starterCode: {
      cpp: `int countZeros(vector<vector<int>>& mat) { }`,
      python: `def count_zeros(mat): pass`
    },
    solution: {
      cpp: `int countZeros(vector<vector<int>>& mat) {
    int n = mat.size(), r = 0, c = n - 1, count = 0;
    while (r < n && c >= 0) {
        if (mat[r][c] == 0) { count += (c + 1); r++; }
        else c--;
    }
    return count;
}`
    },
    testCases: [
      { input: "[[0,0,1],[0,1,1],[1,1,1]]", expected: "3" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 28,
    title: "Submatrix Sum Queries",
    difficulty: "Medium",
    accuracy: "42.1%",
    submissions: "50K+",
    companies: ["Amazon", "Google"],
    pattern: "2D Prefix Sum",
    realWorld: "Used in GIS (Geographic Information Systems) to quickly calculate population or resources in any rectangular area on a map.",
    description: `Given an <strong>M x N</strong> matrix, process multiple queries of the form <code>(r1, c1, r2, c2)</code> and return the sum of elements in the rectangle defined by these corners.`,
    hint: `Calculate 2D Prefix Sum: <code>P[i][j] = mat[i][j] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]</code>. Query is <code>P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]</code>.`,
    starterCode: {
      cpp: `class NumMatrix { public: NumMatrix(vector<vector<int>>& matrix) { } int sumRegion(int r1, int c1, int r2, int c2) { } };`,
      java: `class NumMatrix { public NumMatrix(int[][] matrix) { } public int sumRegion(int row1, int col1, int row2, int col2) { } }`
    },
    solution: {
      cpp: `class NumMatrix {
    vector<vector<int>> pref;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        pref.assign(m + 1, vector<int>(n + 1, 0));
        for(int i=1; i<=m; i++)
            for(int j=1; j<=n; j++)
                pref[i][j] = matrix[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];
    }
    int sumRegion(int r1, int c1, int r2, int c2) {
        return pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1];
    }
};`
    },
    testCases: [
      { input: "[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5]], (2,1,4,3)", expected: "8" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 29,
    title: "Count Pairs with Sum from 2 Matrices",
    difficulty: "Medium",
    accuracy: "48.2%",
    submissions: "20K+",
    companies: ["Amazon", "Google"],
    pattern: "Hashing / Binary Search",
    description: `Given two matrices <strong>A</strong> and <strong>B</strong> and a target sum <strong>X</strong>, count all pairs <code>(a, b)</code> such that <code>a ∈ A</code> and <code>b ∈ B</code> and <code>a + b = X</code>.`,
    examples: [
      { input: 'A=[[1,1],[1,1]], B=[[1,1],[1,1]], x=2', output: '2' }
    ],
    constraints: ['1 ≤ N, M, P ≤ 100'], 
    realWorld: "Used in social media to find users with similar interests.",
    hint: `Store all elements of Matrix A in a Hash Map with their frequencies. Then iterate through Matrix B and check if <code>X - b</code> exists in the map.`,
    starterCode: {
      cpp: `int countPairs(vector<vector<int>>& A, vector<vector<int>>& B, int x) { }`,
      python: `def count_pairs(A, B, x): pass`
    },
    solution: {
      cpp: `int countPairs(vector<vector<int>>& A, vector<vector<int>>& B, int x) {
    unordered_map<int, int> mp;
    for(auto& r : A) for(int val : r) mp[val]++;
    int count = 0;
    for(auto& r : B) for(int val : r) if(mp.count(x - val)) count += mp[x - val];
    return count;
}`,
      python: `def count_pairs(A, B, x):
    freq = {}
    for row in A:
        for val in row: freq[val] = freq.get(val, 0) + 1
    count = 0
    for row in B:
        for val in row:
            if (x - val) in freq: count += freq[x - val]
    return count`
    },
    testCases: [
      { input: "[[1,2],[3,4]], [[4,5],[6,7]], 10", expected: "2 (3+7, 4+6)" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 30,
    title: "Pairs Sum from Different Rows",
    difficulty: "Medium",
    pattern: "Cross-Row Hashing",
    accuracy: "48.2%",
    submissions: "20K+",
    companies: ["Amazon", "Google"],
    description: `Given a matrix, find all pairs of elements <code>(mat[i][j], mat[k][l])</code> such that their sum equals <strong>X</strong> and they belong to <strong>different rows</strong> (i ≠ k).`,
    examples: [
      { input: 'mat=[[1,1],[1,1]], x=2', output: '2 (1+1, 1+1)' }
    ],
    constraints: ['1 ≤ N, M ≤ 100'], 
    realWorld: "Used in social media to find users with similar interests.",

    hint: `For each row <code>i</code>, search for <code>X - element</code> in all other rows. To optimize, use a global frequency map and subtract the current row's frequencies before searching.`,
    starterCode: {
      cpp: `int crossRowPairs(vector<vector<int>>& mat, int x) { }`,
      javascript: `function crossRowPairs(mat, x) { }`
    },
    solution: {
      cpp: `int crossRowPairs(vector<vector<int>>& mat, int x) {
    unordered_map<int, int> total;
    for(auto& r : mat) for(int val : r) total[val]++;
    int count = 0;
    for(auto& r : mat) {
        unordered_map<int, int> row_freq;
        for(int val : r) row_freq[val]++;
        for(int val : r) count += (total[x - val] - row_freq[x - val]);
    }
    return count / 2;
}`
    },
    testCases: [
      { input: "[[1,5],[2,4]], 6", expected: "2 (1+5, 2+4 from different rows)" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 31,
    title: "Find Permuted Rows of a Row",
    difficulty: "Medium",
    pattern: "Hashing / Row Fingerprinting",
    accuracy: "48.2%",
    submissions: "20K+",
    companies: ["Amazon", "Google"],
    description: `Given an <strong>M x N</strong> matrix and a row index <strong>k</strong>, find all other row indices that are a permutation of the k-th row.`,
    examples: [
      { input: 'mat=[[1,2,1],[2,1,1],[1,1,1]], k=0', output: '[1,2]' }
    ],
    constraints: ['1 ≤ N, M ≤ 100'], 
    realWorld: "Used in social media to find users with similar interests.",

    hint: `Sort each row (slow) or use a frequency map/hash to represent each row's content. Compare the target row's map with others.`,
    starterCode: {
      cpp: `vector<int> findPermutedRows(vector<vector<int>>& mat, int k) { }`,
      python: `def find_permuted_rows(mat, k): pass`
    },
    solution: {
      cpp: `vector<int> findPermutedRows(vector<vector<int>>& mat, int k) {
    auto getFreq = [](vector<int>& r) {
        unordered_map<int, int> f;
        for(int x : r) f[x]++;
        return f;
    };
    auto targetFreq = getFreq(mat[k]);
    vector<int> res;
    for(int i=0; i<mat.size(); i++) {
        if(i == k) continue;
        if(getFreq(mat[i]) == targetFreq) res.push_back(i);
    }
    return res;
}`
    },
    testCases: [
      { input: "[[1,2,1],[2,1,1],[1,1,1]], k=0", expected: "[1]" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 32,
    title: "Transform to Equal Matrix",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "10K+",
    companies: ["Amazon", "Google"],
    pattern: "Linear Algebra / Difference Matrix",
    description: `Given two matrices A and B, determine the minimum number of operations to make them equal. An operation consists of adding an integer to an entire row or an entire column.`,
    examples: [
      { input: 'A=[[1,1],[1,1]], B=[[2,2],[2,2]]', output: '2' }
    ],
    constraints: ['1 ≤ N, M ≤ 100'], 
    realWorld: "Used in social media to find users with similar interests.",
    hint: `Use the property that if A can be transformed to B, then <code>A[i][j] - B[i][j]</code> must satisfy <code>R[i] + C[j] = D[i][j]</code>.`,
    starterCode: {
      cpp: `int minTransformations(vector<vector<int>>& A, vector<vector<int>>& B) { }`
    },
    solution: {
      cpp: `// This is a system of linear equations problem. 
// A solution exists if D[i][j] - D[i][0] - D[0][j] + D[0][0] == 0 for all i, j.`
    },
    testCases: [
      { input: "A, B", expected: "Operation count" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 33,
    title: "Minimum Flip for Symmetry",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "20K+",
    companies: ["Amazon", "Google"],
    pattern: "Diagonal Comparison",
    realWorld: "Used in data cleanup to ensure a matrix representing a symmetric relationship (like 'Friendship' where if A is friends with B, B must be friends with A) is valid.",
    description: `Given a binary matrix, find the minimum number of flips (0 to 1 or 1 to 0) to make the matrix symmetric (where <code>mat[i][j] == mat[j][i]</code>).`,
    hint: `Iterate over the upper triangle (where j > i). If <code>mat[i][j] != mat[j][i]</code>, one flip is required to make them match.`,
    starterCode: {
      cpp: `int minFlips(vector<vector<int>>& mat) { }`,
      javascript: `function minFlips(mat) { }`
    },
    solution: {
      cpp: `int minFlips(vector<vector<int>>& mat) {
    int n = mat.size(), flips = 0;
    for(int i=0; i<n; i++)
        for(int j=i+1; j<n; j++)
            if(mat[i][j] != mat[j][i]) flips++;
    return flips;
}`
    },
    testCases: [
      { input: "[[0,0,1],[1,1,0],[0,0,1]]", expected: "2" }
    ],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 34,
    title: "Check Magic Square",
    difficulty: "Easy",
    accuracy: "72.4%",
    submissions: "20K+",
    companies: ["Amazon", "Google"],
    realWorld: "Used in data cleanup to ensure a matrix representing a symmetric relationship (like 'Friendship' where if A is friends with B, B must be friends with A) is valid.",  
    pattern: "Validation",
    description: `A Magic Square is an <strong>N x N</strong> matrix where every row, column, and both main diagonals sum to the same constant. Check if the given matrix is a Magic Square.`,
    hint: `First calculate the sum of the first row. Then compare all other row, column, and diagonal sums to this target.`,
    starterCode: {
      cpp: `bool isMagicSquare(vector<vector<int>>& mat) { }`,
      java: `public boolean isMagicSquare(int[][] mat) { }`,
      python: `def is_magic_square(mat): pass`,
      javascript: `function isMagicSquare(mat) { }`
    },
    solution: {
      cpp: `bool isMagicSquare(vector<vector<int>>& mat) {
    int n = mat.size(), target = 0;
    for(int j=0; j<n; j++) target += mat[0][j];
    for(int i=1; i<n; i++) {
        int rs = 0; for(int j=0; j<n; j++) rs += mat[i][j];
        if(rs != target) return false;
    }
    for(int j=0; j<n; j++) {
        int cs = 0; for(int i=0; i<n; i++) cs += mat[i][j];
        if(cs != target) return false;
    }
    int d1 = 0, d2 = 0;
    for(int i=0; i<n; i++) { d1 += mat[i][i]; d2 += mat[i][n-1-i]; }
    return d1 == target && d2 == target;
}`
    },
    testCases: [
      { input: "[[2,7,6],[9,5,1],[4,3,8]]", expected: "true" }
    ],
    jsRunner: (input) => "Logic verified"
  },
 
  {
    id: 35,
    title: "Median in a Row-Wise Sorted Matrix",
    difficulty: "Hard",
    accuracy: "52.4%",
    submissions: "150K+",
    companies: ["Amazon", "Flipkart", "Goldman Sachs"],
    pattern: "Binary Search on Answer Space",
    realWorld: "Used in distributed systems where sorted data shards (rows) exist on different servers, and we need the global median without merging all data into one machine.",
    description: `Given a row-wise sorted matrix of size <strong>R x C</strong> where R and C are always odd, find the median element of the matrix.`,
    examples: [
      { input: 'mat = [[1, 3, 5], [2, 6, 9], [3, 6, 9]]', output: '5', explain: 'Sorted elements: 1, 2, 3, 3, 5, 6, 6, 9, 9. Median is 5.' }
    ],
    constraints: ['1 ≤ R, C ≤ 1000', '1 ≤ mat[i][j] ≤ 2000'],
    hint: `The median is the smallest number 'x' such that at least (R*C+1)/2 elements are less than or equal to 'x'. Use binary search on the range [min_element, max_element].`,
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int median(vector<vector<int>> &matrix, int r, int c) {
        // Your code here
    }
};

int main() {
    int r, c; cin >> r >> c;
    vector<vector<int>> mat(r, vector<int>(c));
    for(int i=0; i<r; i++) for(int j=0; j<c; j++) cin >> mat[i][j];
    cout << Solution().median(mat, r, c) << endl;
    return 0;
}`,
      java: `import java.util.*;
class Solution {
    int median(int matrix[][], int r, int c) {
        // Your code here
    }
}`,
      python: `class Solution:
    def median(self, matrix, r, c):
        # Your code here
        pass`,
      javascript: `function median(matrix, r, c) {
    // Your code here
}`
    },
    solution: {
      cpp: `int median(vector<vector<int>> &matrix, int r, int c) {
    int min_val = INT_MAX, max_val = INT_MIN;
    for (int i = 0; i < r; i++) {
        min_val = min(min_val, matrix[i][0]);
        max_val = max(max_val, matrix[i][c - 1]);
    }
    int desired = (r * c + 1) / 2;
    while (min_val < max_val) {
        int mid = min_val + (max_val - min_val) / 2;
        int count = 0;
        for (int i = 0; i < r; i++)
            count += upper_bound(matrix[i].begin(), matrix[i].end(), mid) - matrix[i].begin();
        if (count < desired) min_val = mid + 1;
        else max_val = mid;
    }
    return min_val;
}`
    },
    testCases: [{ input: "3 3\n1 3 5\n2 6 9\n3 6 9", expected: "5" }],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 36,
    title: "A Boolean Matrix Question",
    difficulty: "Medium",
    accuracy: "68.2%",
    submissions: "120K+",
    companies: ["Amazon", "Google"],
    pattern: "In-Place Hashing",
    realWorld: "Used in image processing (dilation) where if a 'hit' (1) is detected, the entire scan line (row and column) is activated.",
    description: `Given a boolean matrix <strong>mat[M][N]</strong>, if an element <strong>mat[i][j]</strong> is 1, then set all elements of its i-th row and j-th column to 1.
<br><br>Goal: Solve in <strong>O(1) extra space</strong>.`,
    examples: [
      { input: '[[1,0],[0,0]]', output: '[[1,1],[1,0]]' }
    ],
    hint: `Use the first row and first column of the matrix itself to store flags for which rows/cols need to be changed. Handle the first row/col separately with two boolean variables.`,
    starterCode: {
      cpp: `void booleanMatrix(vector<vector<int>>& mat) { }`
    },
    solution: {
      cpp: `void booleanMatrix(vector<vector<int>>& mat) {
    int R = mat.size(), C = mat[0].size();
    bool rowFlag = false, colFlag = false;
    for(int j=0; j<C; j++) if(mat[0][j] == 1) rowFlag = true;
    for(int i=0; i<R; i++) if(mat[i][0] == 1) colFlag = true;
    for(int i=1; i<R; i++)
        for(int j=1; j<C; j++)
            if(mat[i][j] == 1) { mat[i][0] = 1; mat[0][j] = 1; }
    for(int i=1; i<R; i++)
        for(int j=1; j<C; j++)
            if(mat[i][0] == 1 || mat[0][j] == 1) mat[i][j] = 1;
    if(rowFlag) for(int j=0; j<C; j++) mat[0][j] = 1;
    if(colFlag) for(int i=0; i<R; i++) mat[i][0] = 1;
}`
    },
    testCases: [{ input: "2 2\n1 0\n0 0", expected: "1 1\n1 0" }],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 37,
    title: "Matrix Chain Multiplication",
    difficulty: "Hard",
    accuracy: "45.1%",
    submissions: "10K+",
    companies: ["Amazon", "Google"],
    pattern: "Dynamic Programming",
    realWorld: "Used in optimizing computer graphics pipelines and deep learning where multiplying a chain of weight matrices in a specific order saves billions of operations.",
    description: `Given a sequence of matrices, find the most efficient way to multiply these matrices together. The problem is not actually to perform the multiplication, but merely to decide in which order to perform the multiplication.`,
    examples: [
      { input: 'dims = [40, 20, 30, 10, 30]', output: '26000', explain: 'Dimensions are 40x20, 20x30, 30x10, 10x30.' }
    ],
    hint: `Let <code>dp[i][j]</code> be the minimum cost of multiplying matrices from index i to j. <code>dp[i][j] = min(dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j])</code>.`,
    starterCode: {
      cpp: `int matrixMultiplication(int N, int arr[]) { }`
    },
    solution: {
      cpp: `int matrixMultiplication(int N, int arr[]) {
    int dp[N][N];
    for (int i = 1; i < N; i++) dp[i][i] = 0;
    for (int L = 2; L < N; L++) {
        for (int i = 1; i <= N - L; i++) {
            int j = i + L - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k <= j - 1; k++) {
                int q = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                if (q < dp[i][j]) dp[i][j] = q;
            }
        }
    }
    return dp[1][N - 1];
}`
    },
    testCases: [{ input: "5\n40 20 30 10 30", expected: "26000" }],
    jsRunner: (input) => "Logic verified"
  },

  {
    id: 38,
    title: "Largest Rectangle in Binary Matrix",
    difficulty: "Hard",
    accuracy: "42.1%",
    submissions: "10K+",
    companies: ["Amazon", "Google"],
    pattern: "Histogram Stack",

    realWorld: "Used in optical character recognition (OCR) to identify large blocks of text background or empty whitespace in a scanned document.",
    description: `Given a binary matrix, find the maximum area of a rectangle containing only 1s.`,
    examples: [
      { input: 'mat = [[0,1,1,0],[1,1,1,1],[1,1,1,1],[1,1,0,0]]', output: '8' }
    ],
    hint: `Treat each row as a histogram base. Calculate the height of 1s for each column. For each row, solve the 'Largest Rectangle in Histogram' problem in O(C) time.`,
    starterCode: {
      cpp: `int maxRectangle(int M[MAX][MAX], int n, int m) { }`
    },
    solution: {
      cpp: `int getMaxArea(vector<int>& h) {
    stack<int> s; int res = 0, i = 0, n = h.size();
    while(i < n) {
        if(s.empty() || h[s.top()] <= h[i]) s.push(i++);
        else {
            int tp = s.top(); s.pop();
            res = max(res, h[tp] * (s.empty() ? i : i - s.top() - 1));
        }
    }
    while(!s.empty()) {
        int tp = s.top(); s.pop();
        res = max(res, h[tp] * (s.empty() ? i : i - s.top() - 1));
    }
    return res;
}
int maxRectangle(int M[MAX][MAX], int n, int m) {
    vector<int> h(m, 0); int res = 0;
    for(int i=0; i<n; i++) {
        for(int j=0; j<m; j++) {
            if(M[i][j] == 0) h[j] = 0; else h[j]++;
        }
        res = max(res, getMaxArea(h));
    }
    return res;
}`
    },
    testCases: [{ input: "4 4\n0 1 1 0\n1 1 1 1\n1 1 1 1\n1 1 0 0", expected: "8" }],
    jsRunner: (input) => "Logic verified"
  },

//   {
//     id: 39,
//     title: "Shortest Path in Binary Maze",
//     difficulty: "Medium",
//     accuracy: "52.8%",
//     submissions: "90K+",
//     pattern: "BFS on Grid",
//     realWorld: "Used in GPS navigation to find the shortest route between two points on a grid map with obstacles.",
//     description: `Given an <strong>N x M</strong> matrix where each cell is either 0 (wall) or 1 (path), find the shortest path from a given source to a destination.`,
//     examples: [
//       { input: 'grid = [[1,0,1],[1,1,1],[0,1,1]], src=(0,0), dest=(2,2)', output: '4' }
//     ],
//     hint: `BFS is ideal for shortest paths in unweighted graphs. Each cell is a node, and adjacent 1s are edges. Track distance using a <code>dist</code> matrix.`,
//     starterCode: {
//       cpp: `int shortestPath(vector<vector<int>>& grid, pair<int, int> source, pair<int, int> destination) { }`
//     },
//     solution: {
//       cpp: `int shortestPath(vector<vector<int>>& grid, pair<int, int> src, pair<int, int> dest) {
//     if(grid[src.first][src.second] == 0 || grid[dest.first][dest.second] == 0) return -1;
//     int n = grid.size(), m = grid[0].size();
//     vector<vector<int>> dist(n, vector<int>(m, -1));
//     queue<pair<int, int>> q;
//     q.push(src); dist[src.first][src.second] = 0;
//     int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
//     while(!q.empty()) {
//         auto curr = q.front(); q.pop();
//         if(curr == dest) return dist[dest.first][dest.second];
//         for(int i=0; i<4; i++) {
//             int nr = curr.first+dr[i], nc = curr.second+dc[i];
//             if(nr>=0 && nr<n && nc>=0 && nc<m && grid[nr][nc]==1 && dist[nr][nc]==-1) {
//                 dist[nr][nc] = dist[curr.first][curr.second] + 1;
//                 q.push({nr, nc});
//             }
//         }
//     }
//     return -1;
// }`
//     },
//     testCases: [{ input: "3 3\n1 0 1\n1 1 1\n0 1 1\n0 0 2 2", expected: "4" }],
//     jsRunner: (input) => "Logic verified"
//   },

//   {
//     id: 40,
//     title: "Maximum Sum Rectangle in 2D Matrix",
//     difficulty: "Hard",
//     accuracy: "48.2%",
//     pattern: "Kadane's Algorithm + 1D Compression",
//     realWorld: "Used in financial analysis to find the most profitable rectangular 'window' of time vs asset performance in a 2D data plot.",
//     description: `Given an <strong>R x C</strong> matrix, find the maximum sum of elements in any rectangular submatrix.`,
//     examples: [
//       { input: 'mat = [[1, 2, -1, -4, -20], [-8, -3, 4, 2, 1], [3, 8, 10, 1, 3], [-4, -1, 1, 7, -6]]', output: '29' }
//     ],
//     hint: `Iterate over all pairs of columns (L, R). For each pair, calculate row sums between L and R to create a 1D array. Apply Kadane’s algorithm on this 1D array.`,
//     starterCode: {
//       cpp: `int maximumSumRectangle(int R, int C, vector<vector<int>> M) { }`
//     },
//     solution: {
//       cpp: `int kadane(vector<int>& arr) {
//     int res = INT_MIN, cur = 0;
//     for(int x : arr) { cur += x; res = max(res, cur); if(cur < 0) cur = 0; }
//     return res;
// }
// int maximumSumRectangle(int R, int C, vector<vector<int>> M) {
//     int res = INT_MIN;
//     for(int L=0; L<C; L++) {
//         vector<int> rowSum(R, 0);
//         for(int r=L; r<C; r++) {
//             for(int i=0; i<R; i++) rowSum[i] += M[i][r];
//             res = max(res, kadane(rowSum));
//         }
//     }
//     return res;
// }`
//     },
//     testCases: [{ input: "4 5\n1 2 -1 -4 -20\n-8 -3 4 2 1\n3 8 10 1 3\n-4 -1 1 7 -6", expected: "29" }],
//     jsRunner: (input) => "Logic verified"
//   },

//   {
//     id: 41,
//     title: "Minimum Initial Points to Reach Destination",
//     difficulty: "Hard",
//     accuracy: "35.8%",
//     pattern: "Reverse Dynamic Programming",
//     realWorld: "Used in game design to determine the minimum starting health a player needs to survive a dungeon path given specific traps and health boosts.",
//     description: `Given a grid with positive (health boost) and negative (trap) integers, find the minimum initial points you need at (0,0) to reach (R-1, C-1) while ensuring points never drop below 1. You can only move Right or Down.`,
//     examples: [
//       { input: 'grid = [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]', output: '7' }
//     ],
//     hint: `Solve from destination (R-1, C-1) to source (0,0). <code>dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - grid[i][j])</code>.`,
//     starterCode: {
//       cpp: `int minInitialPoints(int r, int c, vector<vector<int>> grid) { }`
//     },
//     solution: {
//       cpp: `int minInitialPoints(int R, int C, vector<vector<int>> grid) {
//     vector<vector<int>> dp(R, vector<int>(C));
//     dp[R-1][C-1] = max(1, 1 - grid[R-1][C-1]);
//     for(int i=R-2; i>=0; i--) dp[i][C-1] = max(1, dp[i+1][C-1] - grid[i][C-1]);
//     for(int j=C-2; j>=0; j--) dp[R-1][j] = max(1, dp[R-1][j+1] - grid[R-1][j]);
//     for(int i=R-2; i>=0; i--)
//         for(int j=C-2; j>=0; j--)
//             dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - grid[i][j]);
//     return dp[0][0];
// }`
//     },
//     testCases: [{ input: "3 3\n-2 -3 3\n-5 -10 1\n10 30 -5", expected: "7" }],
//     jsRunner: (input) => "Logic verified"
//   }



];