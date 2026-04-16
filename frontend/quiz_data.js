// ════════════════════════════════════════════════════════════
// CENTRALIZED QUIZ DATA FOR ALL TOPICS
// ════════════════════════════════════════════════════════════

const QUIZ_DATA = {
  "array-l1": {
    topicName: "Array",
    level: "Level 1",
    subtitle:
      "Master fundamental array properties, contiguous memory allocation, and basic operation complexities.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "array_l2_unlocked",
    nextPage: "array_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "array_L1.html" },
      { text: "Level 1 — Basics", link: "array_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is an array?",
        options: [
          "A collection of elements stored at random memory locations",
          "A collection of elements of the same type stored at contiguous memory locations",
          "A dynamic list that grows automatically with every insertion",
          "A hierarchical data structure with parent and child nodes",
        ],
        correct: 1,
        explanation:
          "An array is a linear data structure that collects elements of the same data type and stores them in contiguous (neighboring) memory addresses.",
      },
      {
        id: 2,
        diff: "easy",
        text: "In most programming languages, what is the starting index of an array?",
        options: ["1", "0", "-1", "Any number defined by the user"],
        correct: 1,
        explanation:
          "Arrays typically use 0-based indexing, meaning the first element is accessed at index 0.",
      },
      {
        id: 3,
        diff: "medium",
        text: 'What does "Contiguous Memory Allocation" mean in the context of arrays?',
        options: [
          "Memory is allocated in different blocks across the RAM",
          "Memory is allocated in a single, continuous block",
          "Memory is shared with other data structures",
          "Memory is only allocated when an element is added",
        ],
        correct: 1,
        explanation:
          "Contiguous memory means all elements are placed right after each other in memory, allowing the computer to calculate the address of any element quickly.",
      },
      {
        id: 4,
        diff: "medium",
        text: "What is the time complexity to access an element at a specific index in an array?",
        options: ["O(1)", "O(N)", "O(log N)", "O(N²)"],
        correct: 0,
        explanation:
          "Accessing an element by its index is O(1) (constant time) because the memory address can be calculated directly using the base address and the index.",
      },
      {
        id: 5,
        diff: "hard",
        text: "Which of the following is a major disadvantage of a standard (static) array?",
        options: [
          "Fast access time",
          "Small memory footprint",
          "Fixed size, which cannot be changed after creation",
          "Difficulty in storing similar data types",
        ],
        correct: 2,
        explanation:
          "Static arrays have a fixed size defined at the time of declaration. If you need more space, you must create a new, larger array and copy the elements.",
      },
      {
        id: 6,
        diff: "medium",
        text: "In an array of size N, what is the index of the last element?",
        options: ["N", "N + 1", "N - 1", "0"],
        correct: 2,
        explanation:
          "Because indexing starts at 0, an array with N elements ends at index N - 1.",
      },
      {
        id: 7,
        diff: "hard",
        text: "What is the time complexity of searching for an element in an unsorted array using Linear Search?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correct: 2,
        explanation:
          "In an unsorted array, you may have to check every element one by one to find the target, resulting in O(N) time complexity.",
      },
      {
        id: 8,
        diff: "medium",
        text: "Why is inserting an element at the beginning of an array considered O(N)?",
        options: [
          "Because the array must be resized",
          "Because all existing elements must be shifted one position to the right",
          "Because it takes time to find the first index",
          "It is actually O(1)",
        ],
        correct: 1,
        explanation:
          "To insert at index 0, every element currently in the array must move to the next index to make room, which takes more time as the array grows.",
      },
      {
        id: 9,
        diff: "easy",
        text: "Which operation is generally the most efficient in an array?",
        options: [
          "Insertion at the middle",
          "Deletion at the beginning",
          "Accessing by index",
          "Searching for a value",
        ],
        correct: 2,
        explanation:
          "Accessing an element by its index is the fastest operation in an array, taking constant time O(1).",
      },
      {
        id: 10,
        diff: "hard",
        text: "Which of the following describes a 2D array?",
        options: [
          "An array of arrays, often visualized as a grid or table",
          "An array that can store two different data types",
          "An array that is twice as fast as a 1D array",
          "A list of elements with two pointers each",
        ],
        correct: 0,
        explanation:
          "A 2D array is an array where each element is itself an array, commonly used to represent matrices or grids with rows and columns.",
      },
    ],
  },

  "array-l2": {
    topicName: "Array",
    level: "Level 2",
    subtitle:
      "Master intermediate array operations, internal shifting logic, and efficiency trade-offs.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "array_l3_unlocked",
    nextPage: "array_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "array_L1.html" },
      { text: "Level 2 — Intermediate", link: "array_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: "When inserting an element at index `i` in an array of size `N`, how many elements must be shifted?",
        options: ["N", "N - i", "i", "1"],
        correct: 1,
        explanation:
          "To make space at index `i`, all elements from that index to the end of the array (N-1) must be moved one position to the right, which is N - i elements.",
      },
      {
        id: 2,
        diff: "hard",
        text: "What is the time complexity of deleting the last element in a static array if you already know the size?",
        options: ["O(N)", "O(1)", "O(log N)", "O(N²)"],
        correct: 1,
        explanation:
          "Deleting the last element is O(1) because no other elements need to be shifted; you simply update the size counter or treat the last index as empty.",
      },
      {
        id: 3,
        diff: "medium",
        text: 'In the visualization for "Insertion," why is index 0 the most "expensive" place to insert?',
        options: [
          "Because the computer has to search for it",
          "Because it requires shifting every single existing element in the array",
          "Because index 0 is protected",
          "It is actually the cheapest operation",
        ],
        correct: 1,
        explanation:
          "Insertion at index 0 is the worst-case scenario for shifting (O(N)), as every element must move to the next higher index to make room.",
      },
      {
        id: 4,
        diff: "hard",
        text: "When deleting an element from the middle of an array, in which direction do the subsequent elements shift?",
        options: [
          "To the right",
          "To the left",
          "They do not shift",
          "To a new memory block",
        ],
        correct: 1,
        explanation:
          "To fill the gap created by deletion, all elements to the right of the deleted index must shift one position to the left (lower index).",
      },
      {
        id: 5,
        diff: "medium",
        text: 'What happens if you try to insert an element into an array that has already reached its "fixed capacity"?',
        options: [
          "The array grows automatically",
          'It leads to an "Overflow" error in static arrays',
          "The first element is deleted to make room",
          "The new element is stored in a separate variable",
        ],
        correct: 1,
        explanation:
          "Static arrays have a fixed size. Trying to add more elements than the allocated capacity causes an overflow error unless a new, larger array is created.",
      },
      {
        id: 6,
        diff: "hard",
        text: 'Which operation is generally faster in an array: "Accessing by Index" or "Searching by Value"?',
        options: [
          "Searching by Value",
          "Accessing by Index",
          "Both take the same time",
          "Searching by Value is faster if the array is large",
        ],
        correct: 1,
        explanation:
          "Accessing by index is O(1) because memory is contiguous. Searching by value requires checking each element (Linear Search), which is O(N).",
      },
      {
        id: 7,
        diff: "medium",
        text: 'Which color in the Level 2 visualizer represents an "Empty/Available" slot in the array?',
        options: ["Green", "Red", "Gray/Dashed Border", "Blue"],
        correct: 2,
        explanation:
          "In intermediate visualizations, used slots are colored while available capacity is often represented by a gray or dashed placeholder.",
      },
      {
        id: 8,
        diff: "hard",
        text: "If an array is located at memory address 1000 and each integer takes 4 bytes, what is the address of the element at index 3?",
        options: ["1003", "1012", "1004", "1000"],
        correct: 1,
        explanation:
          "The formula is: Base Address + (Index * Size). So, 1000 + (3 * 4) = 1012.",
      },
      {
        id: 9,
        diff: "medium",
        text: 'Why does "Updating" an existing element in an array take O(1) time?',
        options: [
          "Because no elements need to be shifted",
          "Because the value is already known",
          "Because it uses a pivot",
          "Updating is actually O(N)",
        ],
        correct: 0,
        explanation:
          "Updating only involves calculating the memory address (O(1)) and replacing the value; there is no reorganization of other elements.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'What is the "Average Case" time complexity for insertion and deletion in an array?',
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        correct: 2,
        explanation:
          "On average, you insert or delete in the middle of the array, requiring N/2 shifts. In Big O notation, this remains O(N).",
      },
    ],
  },

  "matrix-l1": {
    topicName: "Matrix",
    level: "Level 1",
    subtitle:
      "Master 2D array structures, row/column major ordering, and fundamental grid properties.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "matrix_l2_unlocked",
    nextPage: "matrix_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "matrix_L1.html" },
      { text: "Level 1 — Basics", link: "matrix_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is a Matrix in data structures?",
        options: [
          "A linear list where elements are added at the end",
          "A 2D array consisting of rows and columns",
          "A collection of nodes connected by edges",
          "A data structure that follows Last-In-First-Out",
        ],
        correct: 1,
        explanation:
          "A matrix is a two-dimensional data structure where elements are arranged in a grid-like pattern of rows and columns.",
      },
      {
        id: 2,
        diff: "easy",
        text: "In a matrix of size M x N, what do M and N represent?",
        options: [
          "M = Memory, N = Nodes",
          "M = Columns, N = Rows",
          "M = Rows, N = Columns",
          "M = Maximum, N = Minimum",
        ],
        correct: 2,
        explanation:
          "In standard notation, the first dimension (M) represents the number of rows, and the second dimension (N) represents the number of columns.",
      },
      {
        id: 3,
        diff: "medium",
        text: "How is the element in the 3rd row and 2nd column accessed in 0-indexed languages?",
        options: [
          "matrix[3][2]",
          "matrix[2][3]",
          "matrix[2][1]",
          "matrix[1][2]",
        ],
        correct: 2,
        explanation:
          "Since indexing starts at 0, the 3rd row is index 2 and the 2nd column is index 1. Thus, matrix[2][1].",
      },
      {
        id: 4,
        diff: "medium",
        text: 'What is "Row-Major Order" in matrix memory allocation?',
        options: [
          "Elements are stored column by column",
          "Elements are stored row by row in contiguous memory",
          "Elements are stored at random memory addresses",
          "Only the diagonal elements are stored",
        ],
        correct: 1,
        explanation:
          "Row-major order stores all elements of the first row, followed by all elements of the second row, and so on, in a single continuous block of memory.",
      },
      {
        id: 5,
        diff: "hard",
        text: "In a Row-Major matrix of size (Rows x Cols), what is the formula to find the 1D index of element [i][j]?",
        options: [
          "index = i + j",
          "index = (i * Cols) + j",
          "index = (j * Rows) + i",
          "index = i * j",
        ],
        correct: 1,
        explanation:
          'To find the position, you skip "i" full rows (each of size "Cols") and then add the current column offset "j".',
      },
      {
        id: 6,
        diff: "easy",
        text: 'What is a "Square Matrix"?',
        options: [
          "A matrix where all elements are perfect squares",
          "A matrix with only 4 elements",
          "A matrix where the number of rows equals the number of columns",
          "A matrix used only for graphic rendering",
        ],
        correct: 2,
        explanation:
          "A square matrix has an equal number of rows and columns (e.g., 3x3 or 4x4).",
      },
      {
        id: 7,
        diff: "medium",
        text: 'Which elements form the "Main Diagonal" of a square matrix?',
        options: [
          "Elements where row index > column index",
          "Elements where row index < column index",
          "Elements where row index equals column index",
          "The first row and the last column",
        ],
        correct: 2,
        explanation:
          "The main diagonal consists of elements like [0][0], [1][1], [2][2], etc., where the row and column indices are identical.",
      },
      {
        id: 8,
        diff: "hard",
        text: "What is the time complexity to transpose a square matrix of size N x N?",
        options: ["O(1)", "O(N)", "O(N²)", "O(log N)"],
        correct: 2,
        explanation:
          "To transpose a matrix, you must visit every element (or at least half of them to swap), which involves N*N operations, resulting in O(N²) complexity.",
      },
      {
        id: 9,
        diff: "medium",
        text: 'What defines a "Sparse Matrix"?',
        options: [
          "A matrix with many zero elements",
          "A matrix with very few rows",
          "A matrix that cannot be stored in RAM",
          "A matrix that only contains negative numbers",
        ],
        correct: 0,
        explanation:
          "A sparse matrix is one in which most of the elements are zero. Efficient storage methods (like CSR) are often used for these.",
      },
      {
        id: 10,
        diff: "hard",
        text: "Why is accessing matrix[i][j] usually O(1)?",
        options: [
          "Because the computer searches all rows simultaneously",
          "Because the memory address is calculated using a simple arithmetic formula",
          "Because 2D arrays are not stored in linear memory",
          "It is actually O(N)",
        ],
        correct: 1,
        explanation:
          "Like 1D arrays, 2D matrices use contiguous memory. The CPU uses the Row-Major or Column-Major formula to calculate the exact memory offset instantly.",
      },
    ],
  },

  "matrix-l2": {
    topicName: "Matrix",
    level: "Level 2",
    subtitle:
      "Master complex traversals, boundary logic, and spatial transformations.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "matrix_l3_unlocked",
    nextPage: "matrix_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "matrix_L1.html" },
      { text: "Level 2 — Intermediate", link: "matrix_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: 'What is the primary characteristic of a "Snake Pattern" traversal?',
        options: [
          "All rows are traversed from left to right",
          "Even rows are left-to-right, odd rows are right-to-left",
          "Only the diagonal elements are visited",
          "Traversing from the center outwards",
        ],
        correct: 1,
        explanation:
          "In Snake Pattern, the direction of traversal reverses for every consecutive row to mimic a winding path.",
      },
      {
        id: 2,
        diff: "hard",
        text: "In a Spiral Traversal, which variables are typically used to maintain the boundaries?",
        options: [
          "row_index and col_index only",
          "top, bottom, left, and right",
          "The base address and the offset",
          "A single pointer for the current element",
        ],
        correct: 1,
        explanation:
          "Spiral traversal requires four pointers (top, bottom, left, right) that shrink inward as each boundary layer is printed.",
      },

      {
        id: 3,
        diff: "medium",
        text: "To rotate a square matrix by 90 degrees clockwise, what is the standard two-step algorithm?",
        options: [
          "Reverse rows, then reverse columns",
          "Transpose the matrix, then reverse each row",
          "Transpose the matrix, then reverse each column",
          "Reverse the entire 1D memory array",
        ],
        correct: 1,
        explanation:
          "Rotating 90° clockwise is mathematically achieved by transposing (swapping matrix[i][j] with matrix[j][i]) and then reversing the order of elements in each row.",
      },

      {
        id: 4,
        diff: "hard",
        text: 'Which elements are visited during a "Boundary Traversal" of an M x N matrix?',
        options: [
          "Only the main and anti-diagonals",
          "The first row, last column, last row, and first column",
          "Every element except the middle one",
          "Only elements where i + j is even",
        ],
        correct: 1,
        explanation:
          'Boundary traversal visits only the outermost "shell" of the matrix, ignoring all internal elements.',
      },
      {
        id: 5,
        diff: "medium",
        text: "What happens to the elements during a Matrix Transpose operation?",
        options: [
          "Rows become columns and columns become rows",
          "The matrix is flipped horizontally",
          "All elements are multiplied by -1",
          "The matrix size is doubled",
        ],
        correct: 0,
        explanation:
          "Transposing swaps the row and column indices for every element, effectively flipping the matrix over its main diagonal.",
      },
      {
        id: 6,
        diff: "medium",
        text: 'What is the "Anti-Diagonal" (Secondary Diagonal) in a square matrix?',
        options: [
          "The diagonal from top-left to bottom-right",
          "The diagonal from top-right to bottom-left",
          "The outermost boundary",
          "The middle-most column",
        ],
        correct: 1,
        explanation:
          "The anti-diagonal connects the top-right corner to the bottom-left corner. For an N x N matrix, these are elements where row + col = N - 1.",
      },
      {
        id: 7,
        diff: "hard",
        text: "When performing a 90-degree ANTI-clockwise rotation, what is the second step after transposing?",
        options: [
          "Reverse each row",
          "Reverse each column",
          "Reverse the diagonals",
          "Nothing, transpose is enough",
        ],
        correct: 1,
        explanation:
          "For anti-clockwise rotation, you transpose the matrix and then reverse each column (or reverse each row and then transpose).",
      },
      {
        id: 8,
        diff: "medium",
        text: 'In a search algorithm for a "Row-wise and Column-wise Sorted Matrix", where is the most efficient starting point?',
        options: [
          "Top-left corner (0,0)",
          "Bottom-right corner",
          "Top-right or Bottom-left corner",
          "The exact center",
        ],
        correct: 2,
        explanation:
          "Starting at the top-right allows you to eliminate an entire row (if the target is larger) or an entire column (if the target is smaller) in one step, leading to O(M+N) time.",
      },

      {
        id: 9,
        diff: "hard",
        text: "How many distinct layers are there in a spiral traversal of an M x N matrix?",
        options: ["M * N", "ceil(min(M, N) / 2)", "max(M, N)", "M + N"],
        correct: 1,
        explanation:
          "The number of layers is determined by half of the smaller dimension (rows or columns).",
      },
      {
        id: 10,
        diff: "medium",
        text: "If you swap matrix[i][j] with matrix[j][i] for all i and j, what have you performed?",
        options: [
          "A 180-degree rotation",
          "A Matrix Transpose",
          "A horizontal flip",
          "A vertical shift",
        ],
        correct: 1,
        explanation:
          "Swapping indices i and j is the mathematical definition of a matrix transpose.",
      },
    ],
  },

  "string-l1": {
    topicName: "String",
    level: "Level 1",
    subtitle:
      "Master foundational string concepts, memory representation, and basic operation complexities.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "string_l2_unlocked",
    nextPage: "string_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "string_L1.html" },
      { text: "String — Basics", link: "string_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is the most accurate definition of a String in data structures?",
        options: [
          "A collection of numbers stored in a list",
          "A sequence of characters treated as a single data object",
          "A non-linear data structure used for hierarchy",
          "A dynamic array that only stores integers",
        ],
        correct: 1,
        explanation:
          "A string is a linear data structure composed of a sequence of characters, such as letters, numbers, and symbols, which are manipulated as a single entity.",
      },
      {
        id: 2,
        diff: "easy",
        text: "How is a string typically stored in memory?",
        options: [
          "As a series of linked nodes in different RAM blocks",
          "As a contiguous array of characters ending with a null terminator (in some languages)",
          "In a random-access tree structure",
          "Only in the CPU cache, never in RAM",
        ],
        correct: 1,
        explanation:
          "Strings are generally stored in contiguous memory locations, similar to arrays, where each character occupies a specific memory address.",
      },
      {
        id: 3,
        diff: "medium",
        text: 'What does "Immutability" mean in the context of strings?',
        options: [
          "The string cannot be searched",
          "The string can only store uppercase letters",
          "The original string content cannot be changed once created in memory",
          "The string is automatically deleted after one use",
        ],
        correct: 2,
        explanation:
          'In many languages like Java or Python, strings are immutable, meaning any "change" actually creates a new string in memory rather than modifying the original.',
      },
      {
        id: 4,
        diff: "medium",
        text: "What is the time complexity to access a character at a specific index in a string?",
        options: ["O(1)", "O(N)", "O(log N)", "O(N²)"],
        correct: 0,
        explanation:
          "Since strings are stored like arrays in contiguous memory, accessing a character by its index is a constant time operation, O(1).",
      },
      {
        id: 5,
        diff: "hard",
        text: "What is the time complexity for string concatenation (joining two strings)?",
        options: [
          "O(1) because it is a simple operation",
          "O(N + M) where N and M are the lengths of the two strings",
          "O(N²) because of the nested characters",
          "O(log N)",
        ],
        correct: 1,
        explanation:
          "Concatenation requires creating a new memory block and copying every character from both strings, making the time proportional to their combined length.",
      },
      {
        id: 6,
        diff: "easy",
        text: "Which of the following is NOT a common basic string operation?",
        options: [
          "Length calculation",
          "Concatenation",
          "Sub-string extraction",
          "Balancing a tree",
        ],
        correct: 3,
        explanation:
          "Length, concatenation, and sub-string extraction are core string operations, while tree balancing belongs to hierarchical data structures.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'In 0-indexed strings, what is the index of the character "t" in the string "Data"?',
        options: ["1", "2", "3", "0"],
        correct: 1,
        explanation:
          'In 0-indexing: D=0, a=1, t=2, a=3. Thus, "t" is at index 2.',
      },
      {
        id: 8,
        diff: "hard",
        text: "What is the difference between a Character and a String?",
        options: [
          "A character is a single symbol, while a string is a collection of characters",
          "They are exactly the same thing",
          "Characters use O(N) space while strings use O(1)",
          "Strings are always numeric while characters are alphabetic",
        ],
        correct: 0,
        explanation:
          "A character is the smallest unit (like `A` or `5`), whereas a string is a sequence that can contain many such units.",
      },
      {
        id: 9,
        diff: "medium",
        text: "If a string has a length of N, what is the index of its last character?",
        options: ["N", "N + 1", "N - 1", "0"],
        correct: 2,
        explanation:
          "Because indexing starts at 0, the last character of a string with length N is always located at index N - 1.",
      },
      {
        id: 10,
        diff: "hard",
        text: "What is the space complexity required to store a string of length N?",
        options: ["O(1)", "O(N)", "O(N²)", "O(log N)"],
        correct: 1,
        explanation:
          "The space required grows linearly with the number of characters in the string, resulting in O(N) space complexity.",
      },
    ],
  },

  "string-l2": {
    topicName: "String",
    level: "Level 2",
    subtitle:
      "Master intermediate manipulation, efficiency trade-offs, and internal memory logic.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "string_l3_unlocked",
    nextPage: "string_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "string_L1.html" },
      { text: "Level 2 — Intermediate", link: "string_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: "What is the time complexity of reversing a string of length N in-place?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        correct: 2,
        explanation:
          "Reversing a string requires visiting and swapping roughly N/2 characters, which simplifies to O(N) time complexity.",
      },
      {
        id: 2,
        diff: "hard",
        text: "In languages with immutable strings, why is repeatedly adding characters in a loop considered inefficient?",
        options: [
          "Because the loop takes too much CPU power",
          "Because each addition creates a completely new string object in memory (O(N²))",
          "Because strings can only store a limited number of characters",
          "Because the original characters are deleted",
        ],
        correct: 1,
        explanation:
          'Since immutable strings cannot be changed, every "modification" allocates a new string and copies all previous characters, leading to quadratic time complexity overall.',
      },
      {
        id: 3,
        diff: "medium",
        text: 'What is the primary purpose of a "StringBuilder" or "StringBuffer" class?',
        options: [
          "To encrypt strings for security",
          "To provide a mutable sequence of characters for efficient modifications",
          "To convert strings into integers",
          "To sort characters in alphabetical order",
        ],
        correct: 1,
        explanation:
          "These classes provide mutable buffers that allow you to append or modify characters without creating thousands of intermediate string objects.",
      },
      {
        id: 4,
        diff: "hard",
        text: "Which algorithm is commonly used to check if a string is a Palindrome?",
        options: [
          "Binary Search",
          "Two-Pointer Approach (meeting in the middle)",
          "Quick Sort",
          "Breadth-First Search",
        ],
        correct: 1,
        explanation:
          "A palindrome is checked by comparing characters from the start and end simultaneously using two pointers moving toward the center.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'What is the time complexity of the "Substring" operation if it requires copying characters?',
        options: [
          "O(1)",
          "O(K) where K is the length of the substring",
          "O(N²)",
        ],
        correct: 1,
        explanation:
          "Extracting a substring typically involves copying the specified range of characters to a new memory location, taking time proportional to the substring length.",
      },
      {
        id: 6,
        diff: "hard",
        text: 'What does the "String Pool" (in languages like Java) aim to optimize?',
        options: [
          "CPU processing speed",
          "Memory usage by storing only one copy of each unique string literal",
          "The number of variables a program can use",
          "Hard drive storage",
        ],
        correct: 1,
        explanation:
          "The String Pool is a special memory area that stores unique string literals to save RAM by allowing multiple variables to point to the same instance.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'To check if two strings are "Anagrams," what must be true?',
        options: [
          "They must have the same length and exactly the same character frequencies",
          "They must start with the same letter",
          "One string must be a substring of the other",
          "They must be palindromes",
        ],
        correct: 0,
        explanation:
          "Anagrams are words formed by rearranging the letters of another word; therefore, the character counts must match perfectly.",
      },
      {
        id: 8,
        diff: "hard",
        text: 'In a "Two-Pointer" string reversal, when should the pointers stop moving?',
        options: [
          "When the left pointer is greater than the right pointer",
          "When both pointers reach the end of the string",
          "When they find a space character",
          "After exactly 10 iterations",
        ],
        correct: 0,
        explanation:
          "The pointers should stop once they meet or cross in the middle, as every necessary swap has been completed by that point.",
      },
      {
        id: 9,
        diff: "medium",
        text: 'What is the "Space Complexity" of reversing a string using an auxiliary (extra) stack or array?',
        options: ["O(1)", "O(N)", "O(log N)", "O(N²)"],
        correct: 1,
        explanation:
          "If you create a new structure to hold the characters in reverse, you are using extra space proportional to the length of the input string.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'What is the result of the "String Slicing" operation on "Visualizer"[0:4]?',
        options: ['"Visu"', '"Visual"', '"isua"', '"aliz"'],
        correct: 0,
        explanation:
          "Slicing typically includes the start index (0) and excludes the end index (4), resulting in indices 0, 1, 2, and 3: V, i, s, u.",
      },
    ],
  },

  "recursion-l1": {
    topicName: "Recursion",
    level: "Level 1",
    subtitle:
      "Master the core concepts of self-referential functions, base cases, and recursive flow.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "recursion_l2_unlocked",
    nextPage: "recursion_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Algorithms", link: "recursion_L1.html" },
      { text: "Recursion — Basics", link: "recursion_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is the simplest definition of recursion in programming?",
        options: [
          "A loop that runs exactly ten times",
          "A function that calls itself to solve smaller versions of a problem",
          "A method for sorting arrays using external libraries",
          "A way to store data in a circular linked list",
        ],
        correct: 1,
        explanation:
          "Recursion is a technique where a function calls itself directly or indirectly to tackle a problem by breaking it down into smaller sub-problems.",
      },
      {
        id: 2,
        diff: "easy",
        text: 'What is the "Base Case" in recursion?',
        options: [
          "The starting point of the recursive call",
          "The condition that stops the recursion and prevents an infinite loop",
          "The main mathematical formula used in the function",
          "The memory address where the function is stored",
        ],
        correct: 1,
        explanation:
          "The base case is essential as it provides a stopping condition. Without it, the function would keep calling itself forever.",
      },
      {
        id: 3,
        diff: "medium",
        text: "What happens if a recursive function lacks a base case or never reaches it?",
        options: [
          "The program runs faster",
          'It leads to a "Stack Overflow" error',
          "The function automatically converts to a while-loop",
          "The computer ignores the function",
        ],
        correct: 1,
        explanation:
          "Infinite recursion fills up the call stack memory, eventually leading to a Stack Overflow error.",
      },
      {
        id: 4,
        diff: "medium",
        text: 'What is the "Recursive Case"?',
        options: [
          "The part of the function that returns the final answer",
          "The part of the function where it calls itself with a modified (usually smaller) input",
          "The error-handling section of the code",
          "The section where variables are declared",
        ],
        correct: 1,
        explanation:
          'The recursive case is where the "work" happens by calling the function again with a simplified version of the original input.',
      },
      {
        id: 5,
        diff: "hard",
        text: "Which data structure is internally used by the computer to track recursive calls?",
        options: ["Queue", "Stack", "Linked List", "Binary Tree"],
        correct: 1,
        explanation:
          'The computer uses a "Call Stack" to keep track of active function calls, pushing new calls onto the stack and popping them off as they finish.',
      },
      {
        id: 6,
        diff: "medium",
        text: "In the classic Factorial recursion (n!), what is the standard base case?",
        options: [
          "if (n == 0) return 1",
          "if (n == 10) return 1",
          "if (n > 1) return n",
          "if (n == -1) return 0",
        ],
        correct: 0,
        explanation:
          "Factorial of 0 is mathematically defined as 1, which serves as the perfect base case to stop the countdown of multiplications.",
      },
      {
        id: 7,
        diff: "hard",
        text: "How does recursion compare to iteration (loops)?",
        options: [
          "Recursion is always faster than loops",
          "Any problem solved by recursion can also be solved by iteration",
          "Loops use more stack memory than recursion",
          "Recursion is only used for mathematical problems",
        ],
        correct: 1,
        explanation:
          "Recursion and iteration are often interchangeable. Recursion is often cleaner for complex structures, while iteration is usually more memory-efficient.",
      },
      {
        id: 8,
        diff: "medium",
        text: 'What is the "Recursive Step"?',
        options: [
          "The first line of the function",
          "The logic that ensures the input moves closer to the base case with each call",
          "A step used only in binary search",
          "The process of deleting the function from memory",
        ],
        correct: 1,
        explanation:
          "The recursive step must change the input (e.g., n - 1) so that the function eventually hits the base case.",
      },
      {
        id: 9,
        diff: "easy",
        text: "Which of the following is a classic example of a recursive problem?",
        options: [
          "Finding the length of a string",
          "The Fibonacci Sequence",
          "Adding two numbers",
          "Printing a variable",
        ],
        correct: 1,
        explanation:
          "The Fibonacci sequence is a primary example of recursion, where each number is the sum of the two preceding ones.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'What does each "frame" in the call stack store during recursion?',
        options: [
          "The entire source code of the program",
          "Local variables, parameters, and the return address",
          "The history of all previously run programs",
          "Only the name of the function",
        ],
        correct: 1,
        explanation:
          "Each stack frame preserves the state of a specific function call so the computer knows where to resume after a sub-call finishes.",
      },
    ],
  },

  "recursion-l2": {
    topicName: "Recursion",
    level: "Level 2",
    subtitle:
      "Master recursion trees, multiple recursive calls, and stack-frame management.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "recursion_l3_unlocked",
    nextPage: "recursion_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Algorithms", link: "recursion_L1.html" },
      { text: "Level 2 — Intermediate", link: "recursion_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: 'What is a "Recursion Tree"?',
        options: [
          "A data structure used to store strings",
          "A visual representation of all the recursive calls made by a function",
          "A type of binary search tree",
          "A way to delete recursive functions",
        ],
        correct: 1,
        explanation:
          "A recursion tree helps visualize how a problem is broken down into sub-problems, showing each function call as a node and its recursive calls as children.",
      },
      {
        id: 2,
        diff: "hard",
        text: "In the Fibonacci recursion `fib(n-1) + fib(n-2)`, why is the time complexity $O(2^n)$?",
        options: [
          "Because it uses a single loop",
          "Because each call branches into two more calls, causing exponential growth",
          "Because the computer cannot calculate sums quickly",
          "Because it uses constant space",
        ],
        correct: 1,
        explanation:
          "Each level of the recursion tree roughly doubles the number of calls from the previous level, leading to an exponential number of operations ($2^n$).",
      },
      {
        id: 3,
        diff: "medium",
        text: 'What is "Tail Recursion"?',
        options: [
          "Recursion that happens at the beginning of a function",
          "A recursive call that is the very last action performed by a function",
          "Recursion that never reaches a base case",
          "A function that calls itself twice",
        ],
        correct: 1,
        explanation:
          "Tail recursion occurs when the recursive call is the final statement. Some compilers can optimize this to prevent stack overflow (Tail Call Optimization).",
      },
      {
        id: 4,
        diff: "hard",
        text: 'What is the "Depth" of a recursive call?',
        options: [
          "The total number of elements in the array",
          "The maximum number of active frames on the call stack at one time",
          "The length of the code in lines",
          "The number of variables in the base case",
        ],
        correct: 1,
        explanation:
          "Depth refers to how many layers deep the recursion goes. This directly determines the Space Complexity $O(Depth)$ on the call stack.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'What happens to the "Return Address" in a stack frame?',
        options: [
          "It tells the computer where to go after the current recursive call finishes",
          "It is the email address of the programmer",
          "It points to the next element in a linked list",
          "It is deleted after the base case",
        ],
        correct: 0,
        explanation:
          'The return address ensures the CPU knows exactly which line of code to resume in the "parent" function once the "child" recursive call returns a value.',
      },
      {
        id: 6,
        diff: "hard",
        text: "In the visualization of `fib(4)`, why are some values calculated multiple times?",
        options: [
          "The computer is making a mistake",
          "Plain recursion (without memoization) does not remember previous results",
          "To ensure the result is accurate",
          "Because the stack is full",
        ],
        correct: 1,
        explanation:
          "Standard recursion re-calculates the same sub-problems (like `fib(2)`) multiple times because it doesn't store results, which is why it is inefficient for Fibonacci.",
      },
      {
        id: 7,
        diff: "medium",
        text: "How does the space complexity of recursion compare to its time complexity?",
        options: [
          "They are always the same",
          "Space complexity is usually $O(Depth)$ of the tree, while Time is the total number of nodes",
          "Space is always $O(1)$",
          "Time is always $O(N)$",
        ],
        correct: 1,
        explanation:
          "Time complexity tracks the total work (all nodes in the tree), while space complexity tracks the maximum memory used at once (the longest path from root to leaf).",
      },
      {
        id: 8,
        diff: "hard",
        text: 'Which of the following is a "Divide and Conquer" algorithm that heavily uses Level 2 recursion concepts?',
        options: [
          "Bubble Sort",
          "Merge Sort",
          "Linear Search",
          "Insertion Sort",
        ],
        correct: 1,
        explanation:
          "Merge Sort uses recursion to split an array in half repeatedly and then merge them back together, a classic example of complex recursive branching.",
      },
      {
        id: 9,
        diff: "medium",
        text: 'In the visualizer, what does the "Backtracking" phase represent?',
        options: [
          "The computer crashing",
          "The process of returning values up the stack after hitting a base case",
          "Entering a new loop",
          "Changing the input to a larger value",
        ],
        correct: 1,
        explanation:
          'Once a base case is hit, the function "backtracks" by passing its result back to the function that called it, eventually reaching the original caller.',
      },
      {
        id: 10,
        diff: "hard",
        text: "If a recursive function makes 3 calls per level and goes to depth N, what is its time complexity?",
        options: ["$O(N^3)$", "$O(3^N)$", "$O(3N)$", "$O(log_3 N)$"],
        correct: 1,
        explanation:
          "A branching factor of 3 raised to the power of the depth (N) results in an exponential time complexity of $O(3^N)$.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  // STACK QUIZZES
  // ────────────────────────────────────────────────────────
  "stack-l1": {
    topicName: "Stack",
    level: "Level 1",
    subtitle:
      "Test your understanding of Stack fundamentals — LIFO, operations, complexity and implementations.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "stack_l2_unlocked",
    nextPage: "stack_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Stack", link: "stack_basics.html" },
      { text: "Level 1 — Basics", link: "stack_basics.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What does LIFO stand for in the context of a Stack data structure?",
        options: [
          "Last In, First Out",
          "Last In, Final Out",
          "Least In, First Out",
          "Linear Input, First Output",
        ],
        correct: 0,
        explanation:
          'LIFO stands for "Last In, First Out" — the element that is added last to the stack is the first one to be removed. This is the fundamental principle of a stack.',
      },
      {
        id: 2,
        diff: "easy",
        text: "Which operation is used to ADD an element to the top of a Stack?",
        options: ["Pop", "Enqueue", "Push", "Insert"],
        correct: 2,
        explanation:
          "PUSH is the operation used to add (insert) an element at the top of the stack. Its time complexity is O(1) since we always insert at the top.",
      },
      {
        id: 3,
        diff: "easy",
        text: "What is the time complexity of the Push and Pop operations in a Stack?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 3,
        explanation:
          "Both Push and Pop operations have O(1) time complexity because they always operate at the top of the stack — no traversal is needed. This is one of the key advantages of using a stack.",
      },
      {
        id: 4,
        diff: "easy",
        text: "What condition occurs when you try to push an element onto a FULL stack (fixed-size array implementation)?",
        options: [
          "Underflow",
          "Overflow",
          "NullPointerException",
          "Stack Reset",
        ],
        correct: 1,
        explanation:
          "Stack Overflow occurs when we try to push an element onto a full stack. In a fixed-size array implementation, when top == capacity - 1, any further push causes overflow.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'In an array-based stack, what is the initial value of the "top" variable to indicate an empty stack?',
        options: ["0", "1", "-1", "null"],
        correct: 2,
        explanation:
          'In an array-based stack, "top" is initialized to -1 to indicate that the stack is empty. When the first element is pushed, top becomes 0 (pointing to index 0 of the array).',
      },
      {
        id: 6,
        diff: "medium",
        text: "Consider this sequence of operations on an initially empty stack:\nPush(5) → Push(10) → Push(15) → Pop() → Push(20) → Pop()\n\nWhat element is currently at the TOP of the stack after all operations?",
        options: ["5", "10", "15", "20"],
        correct: 1,
        explanation:
          "After Push(5), Push(10), Push(15): stack = [5, 10, 15], top=15. Pop() removes 15: stack = [5, 10]. Push(20): stack = [5, 10, 20]. Pop() removes 20: stack = [5, 10]. Top is now 10.",
      },
      {
        id: 7,
        diff: "medium",
        text: "What does the Peek (or Top) operation do in a Stack?",
        options: [
          "Removes and returns the top element",
          "Returns the top element without removing it",
          "Returns the bottom element",
          "Checks if the stack has exactly one element",
        ],
        correct: 1,
        explanation:
          "Peek (or Top) returns the value of the topmost element WITHOUT removing it. This is different from Pop which removes the element. Its time complexity is also O(1).",
      },
      {
        id: 8,
        diff: "medium",
        text: "Which of the following is an advantage of using a Linked List to implement a Stack over an Array?",
        options: [
          "Faster access to elements by index",
          "Less memory usage per element",
          "Dynamic sizing — it grows/shrinks naturally without overflow",
          "Constant time access to the bottom element",
        ],
        correct: 2,
        explanation:
          'The primary advantage of a Linked List implementation is dynamic sizing. Arrays have a fixed capacity; Linked Lists grow as needed, avoiding "Stack Overflow" (until the system runs out of RAM).',
      },
      {
        id: 9,
        diff: "hard",
        text: "In the context of system architecture, which part of memory uses a Stack data structure to manage local variables and function calls?",
        options: [
          "The Heap",
          "The Static Segment",
          "The Call Stack",
          "The Data Buffer",
        ],
        correct: 2,
        explanation:
          'The Call Stack (or Execution Stack) uses a stack to manage active subroutines. When a function is called, its local variables are "pushed" onto the stack; when it returns, they are "popped".',
      },
      {
        id: 10,
        diff: "medium",
        text: "Which of the following is NOT a standard application of a Stack?",
        options: [
          "Undo/Redo functionality in editors",
          "Evaluating arithmetic expressions",
          "Printer task scheduling (first-come-first-served)",
          "Depth-First Search (DFS) in graphs",
        ],
        correct: 2,
        explanation:
          "Printer scheduling typically uses a Queue (FIFO), not a Stack. Undo, Expression Evaluation, and DFS are classic examples of Stack (LIFO) applications.",
      },
    ],
  },

  "stack-l2": {
    topicName: "Stack",
    level: "Level 2",
    subtitle:
      "Master implementation logic, memory management, and performance trade-offs.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "stack_l3_unlocked",
    nextPage: "stack_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Stack", link: "stack_basics.html" },
      { text: "Level 2 — Intermediate", link: "stack_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: "Which implementation of a stack is preferred when the maximum number of elements is known in advance and memory efficiency is a priority?",
        options: [
          "Linked List implementation",
          "Array-based implementation",
          "Dynamic Resizing implementation",
          "Heap-based implementation",
        ],
        correct: 1,
        explanation:
          'Array-based stacks have less memory overhead per element because they don\'t need to store "next" pointers like Linked Lists do.',
      },
      {
        id: 2,
        diff: "hard",
        text: "In an array-based stack (size N), what is the amortized time complexity of a Push operation if we double the array size every time it becomes full?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        correct: 2,
        explanation:
          'While a single push might take O(n) when resizing, the "Amortized" time (average over many operations) remains O(1).',
      },
      {
        id: 3,
        diff: "medium",
        text: "If you implement a stack using a Linked List, where should the Push and Pop operations ideally occur for O(1) performance?",
        options: [
          "At the tail (end) of the list",
          "At the head (beginning) of the list",
          "In the middle of the list",
          "It does not matter",
        ],
        correct: 1,
        explanation:
          "Operating at the head allows O(1) insertion and deletion. Operating at the tail would require O(n) traversal unless it is a Doubly Linked List.",
      },
      {
        id: 4,
        diff: "hard",
        text: "What is the primary disadvantage of using a Linked List for a stack compared to a fixed-size array?",
        options: [
          "Slower Push operations",
          "Potential for Stack Overflow",
          "Extra memory overhead for pointers",
          "Inability to use Peek",
        ],
        correct: 2,
        explanation:
          "Each node in a Linked List requires extra memory to store the address (pointer) of the next node, whereas arrays only store the data.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'Consider the pseudo-code: `stack[++top] = element`. This implies the "top" variable was initialized to:',
        options: ["0", "1", "-1", "null"],
        correct: 2,
        explanation:
          "Using prefix increment (++top) means the pointer moves from -1 to 0 before the first element is placed at index 0.",
      },
      {
        id: 6,
        diff: "hard",
        text: "When using a Deque (Double-Ended Queue) to implement a Stack, which operations would you use to maintain LIFO behavior?",
        options: [
          "insertFront() and deleteRear()",
          "insertRear() and deleteRear()",
          "insertFront() and deleteMiddle()",
          "insertRear() and deleteFront()",
        ],
        correct: 1,
        explanation:
          "To act as a stack, you must add and remove from the same end. Using both Rear operations (or both Front) ensures LIFO.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'In the "Worst Case" for a fixed-size array stack, what happens when you call Push() on a stack where `top == capacity - 1`?',
        options: [
          "The stack resets",
          "Memory leak",
          "Stack Overflow",
          "The first element is deleted",
        ],
        correct: 2,
        explanation:
          "When the top index reaches the last available index (capacity - 1), the array is full. Attempting to add more results in a Stack Overflow error.",
      },
      {
        id: 8,
        diff: "hard",
        text: 'Which of the following describes the space complexity of a stack containing "n" elements implemented via a Linked List?',
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation:
          "The space complexity is O(n) because the memory used grows linearly with the number of elements stored.",
      },
      {
        id: 9,
        diff: "medium",
        text: 'What is the purpose of the "isEmpty" check before a Pop or Peek operation?',
        options: [
          "To prevent Stack Overflow",
          "To prevent Stack Underflow",
          "To clear the memory",
          "To reset the top pointer",
        ],
        correct: 1,
        explanation:
          'Popping from an empty stack is an invalid operation called "Stack Underflow." Checking isEmpty prevents this crash.',
      },
      {
        id: 10,
        diff: "hard",
        text: "In C++, if you use `std::stack`, which underlying container does it use by default?",
        options: ["std::vector", "std::list", "std::deque", "std::array"],
        correct: 2,
        explanation:
          "The C++ Standard Library `std::stack` is a container adapter that uses `std::deque` by default for its balance of performance and dynamic sizing.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  // QUEUE QUIZZES
  // ────────────────────────────────────────────────────────
  "queue-l1": {
    topicName: "Queue",
    level: "Level 1",
    subtitle:
      "Test your understanding of Queue fundamentals — FIFO, operations, complexity and implementations.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "queue_l2_unlocked",
    nextPage: "queue_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Queue", link: "queue_basics.html" },
      { text: "Level 1 — Basics", link: "queue_basics.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What does FIFO stand for in the context of a Queue data structure?",
        options: [
          "First In, First Out",
          "Fast In, Fast Out",
          "First Index, Final Output",
          "Fixed Input, Forward Output",
        ],
        correct: 0,
        explanation:
          'FIFO stands for "First In, First Out" — the element that is added first to the queue is the first one to be removed. This is the fundamental principle of a queue.',
      },
      {
        id: 2,
        diff: "easy",
        text: "Which operation is used to ADD an element to the rear of a Queue?",
        options: ["Dequeue", "Push", "Enqueue", "Insert"],
        correct: 2,
        explanation:
          "ENQUEUE is the operation used to add an element at the rear (back) of the queue. Its time complexity is O(1).",
      },
      {
        id: 3,
        diff: "easy",
        text: "Which operation removes an element from the FRONT of a Queue?",
        options: ["Enqueue", "Pop", "Dequeue", "Remove"],
        correct: 2,
        explanation:
          "DEQUEUE is the operation that removes and returns the element at the front of the queue. Time complexity is O(1) for proper implementations.",
      },
      {
        id: 4,
        diff: "medium",
        text: "What is the time complexity of Enqueue and Dequeue operations in a queue (using proper implementation)?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        correct: 2,
        explanation:
          "Both Enqueue and Dequeue have O(1) time complexity in properly implemented queues (using circular arrays or linked lists), as they operate on front/rear pointers directly.",
      },
      {
        id: 5,
        diff: "medium",
        text: "In a circular queue with capacity 5, if front = 0 and rear = 4, what happens when you enqueue one more element?",
        options: [
          "Queue Overflow",
          "Rear wraps around to 0",
          "Front moves forward",
          "Array size doubles",
        ],
        correct: 1,
        explanation:
          "In a circular queue, when rear reaches the end, it wraps around to the beginning using modulo arithmetic: rear = (rear + 1) % capacity. This allows efficient space utilization.",
      },
      {
        id: 6,
        diff: "medium",
        text: "Consider these operations on an empty queue:\nEnqueue(10) → Enqueue(20) → Dequeue() → Enqueue(30) → Dequeue()\n\nWhat element is at the FRONT now?",
        options: ["10", "20", "30", "Queue is empty"],
        correct: 2,
        explanation:
          "After Enqueue(10), Enqueue(20): [10, 20]. Dequeue() removes 10: [20]. Enqueue(30): [20, 30]. Dequeue() removes 20: [30]. Front is now 30.",
      },
      {
        id: 7,
        diff: "easy",
        text: "What does the Peek (or Front) operation do in a Queue?",
        options: [
          "Removes the front element",
          "Returns the front element without removing it",
          "Returns the rear element",
          "Checks the queue size",
        ],
        correct: 1,
        explanation:
          "Peek returns the front element WITHOUT removing it from the queue, allowing you to inspect what will be dequeued next without modifying the queue.",
      },
      {
        id: 8,
        diff: "hard",
        text: "Which implementation is better for a queue when the maximum size is unknown?",
        options: [
          "Fixed-size array",
          "Circular array with doubling",
          "Linked list",
          "Stack-based implementation",
        ],
        correct: 2,
        explanation:
          "A linked list is ideal when size is unknown because it grows dynamically without needing to pre-allocate or resize arrays. Each enqueue simply adds a new node.",
      },
      {
        id: 9,
        diff: "medium",
        text: "Which of the following is a common real-world application of Queue?",
        options: [
          "Undo/Redo in text editors",
          "Browser back button",
          "Printer job scheduling",
          "Function call management",
        ],
        correct: 2,
        explanation:
          "Printer job scheduling uses a queue (FIFO) - print jobs are processed in the order they arrive. Undo/Redo and browser history use stacks (LIFO).",
      },
      {
        id: 10,
        diff: "hard",
        text: "In BFS (Breadth-First Search) algorithm, which data structure is used?",
        options: ["Stack", "Queue", "Priority Queue", "Deque"],
        correct: 1,
        explanation:
          "BFS uses a Queue to explore nodes level by level. Nodes are enqueued when discovered and dequeued for processing, ensuring breadth-first traversal order.",
      },
    ],
  },

  "queue-l2": {
    topicName: "Queue",
    level: "Level 2",
    subtitle:
      "Master Circular Queues, pointer logic, and implementation-specific complexities.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "queue_l3_unlocked",
    nextPage: "queue_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Queue", link: "queue_basics.html" },
      { text: "Level 2 — Intermediate", link: "queue_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: "In a fixed-size array implementation of a linear queue, what is the primary disadvantage after several Enqueue and Dequeue operations?",
        options: [
          "Memory leak",
          "False Overflow (cannot reuse empty spaces at the front)",
          "O(n) Enqueue time",
          "Pointer corruption",
        ],
        correct: 1,
        explanation:
          'In a simple linear queue, the "front" pointer moves forward during dequeue. Even if there is space at the beginning of the array, the "rear" pointer might reach the end, causing a "False Overflow".',
      },
      {
        id: 2,
        diff: "hard",
        text: 'Which formula correctly calculates the next position of the "rear" pointer in a Circular Queue of size N?',
        options: [
          "rear = rear + 1",
          "rear = (rear + 1) % N",
          "rear = (rear % N) + 1",
          "rear = (rear + 1) / N",
        ],
        correct: 1,
        explanation:
          "The modulo operator (%) ensures that when the pointer reaches the last index (N-1), the next increment wraps it back to index 0.",
      },
      {
        id: 3,
        diff: "medium",
        text: "In a Linked List implementation of a Queue, which pointers should be maintained to ensure all operations remain O(1)?",
        options: [
          "Only the Head pointer",
          "Only the Tail pointer",
          "Both Head and Tail pointers",
          "A pointer to the middle node",
        ],
        correct: 2,
        explanation:
          "To keep Enqueue (at the back) and Dequeue (at the front) at O(1), you must track both the Head (front) and the Tail (rear) of the list.",
      },
      {
        id: 4,
        diff: "hard",
        text: 'What is the "Full" condition for a Circular Queue implementation using an array of size N, if one space is left empty to distinguish from the Empty condition?',
        options: [
          "(rear + 1) % N == front",
          "rear == front",
          "rear == N - 1",
          "front == (rear - 1) % N",
        ],
        correct: 0,
        explanation:
          "A common way to check if a circular queue is full is to see if the next increment of the rear pointer would equal the front pointer.",
      },
      {
        id: 5,
        diff: "medium",
        text: "Which of the following describes the behavior of a Deque (Double-Ended Queue)?",
        options: [
          "Only LIFO",
          "Only FIFO",
          "Both LIFO and FIFO supported",
          "Neither LIFO nor FIFO",
        ],
        correct: 2,
        explanation:
          "A Deque allows insertion and deletion from both ends, meaning it can be used to implement both a Stack (LIFO) and a Queue (FIFO).",
      },
      {
        id: 6,
        diff: "hard",
        text: 'In an array-based Queue, if the "front" index is 3 and the "rear" index is 2 in a circular array of size 10, how many elements are in the queue?',
        options: ["1", "9", "5", "0"],
        correct: 1,
        explanation:
          "Using the formula (rear - front + N) % N: (2 - 3 + 10) % 10 = 9. There are 9 elements, meaning only one slot is empty.",
      },
      {
        id: 7,
        diff: "medium",
        text: "What happens when a Dequeue operation is performed on an empty queue?",
        options: [
          "Queue Overflow",
          "Queue Underflow",
          "IndexOutOfBounds Exception",
          "The front pointer resets to 0",
        ],
        correct: 1,
        explanation:
          'Attempting to remove an element from an empty data structure is known as "Underflow".',
      },
      {
        id: 8,
        diff: "hard",
        text: "If you implement a Queue using two Stacks, what is the worst-case time complexity for a single Dequeue operation?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation:
          'In a two-stack queue, if the "out-stack" is empty, you must pop all elements from the "in-stack" and push them to the "out-stack", which takes O(n) time.',
      },
      {
        id: 9,
        diff: "medium",
        text: "What is the primary advantage of a Linked List queue over an Array-based circular queue?",
        options: [
          "Cache friendliness",
          "No fixed capacity limit",
          "Faster access to the middle",
          "Lower memory usage per node",
        ],
        correct: 1,
        explanation:
          "Linked Lists can grow dynamically as long as memory is available, whereas array-based queues (even circular ones) have a pre-defined maximum capacity.",
      },
      {
        id: 10,
        diff: "hard",
        text: "In the C++ STL, which container does `std::queue` use by default as its underlying structure?",
        options: ["std::vector", "std::list", "std::deque", "std::array"],
        correct: 2,
        explanation:
          "Similar to the stack, the C++ `std::queue` uses `std::deque` by default because it allows efficient O(1) additions and removals at both ends.",
      },
    ],
  },

  "linearsearch-l1": {
    topicName: "Linear Search",
    level: "Level 1",
    subtitle:
      "Test your understanding of searching fundamentals — sequential traversal, conditions, and return values.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "linearsearch_l2_unlocked",
    nextPage: "linearsearch_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Searching", link: "search_basics.html" },
      { text: "Level 1 — Basics", link: "linear_search_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is another common name for the Linear Search algorithm?",
        options: [
          "Binary Search",
          "Sequential Search",
          "Jump Search",
          "Random Search",
        ],
        correct: 1,
        explanation:
          'Linear Search is often called "Sequential Search" because it checks every element in the data set one by one in a specific sequence.',
      },
      {
        id: 2,
        diff: "easy",
        text: "Which of the following is a requirement for performing a Linear Search on an array?",
        options: [
          "The array must be sorted in ascending order",
          "The array must be sorted in descending order",
          "The array must contain only integers",
          "There is no sorting requirement",
        ],
        correct: 3,
        explanation:
          "One of the primary benefits of Linear Search is that it works on both sorted and unsorted data, unlike Binary Search which requires sorted data.",
      },
      {
        id: 3,
        diff: "easy",
        text: "Where does a standard Linear Search begin its traversal in an array?",
        options: [
          "From the middle element",
          "From the last element",
          "From the first element (index 0)",
          "From a random index",
        ],
        correct: 2,
        explanation:
          "A standard linear search starts at the very first element (index 0) and moves towards the end of the array.",
      },
      {
        id: 4,
        diff: "medium",
        text: "If the target element is found at index 5, what does the Linear Search algorithm typically return?",
        options: [
          "The value of the element",
          "The index number (5)",
          "A boolean value (True)",
          "The total number of elements checked",
        ],
        correct: 1,
        explanation:
          "Linear search usually returns the index where the target element is located so that the calling program knows exactly where to find it.",
      },
      {
        id: 5,
        diff: "easy",
        text: "What value is traditionally returned if the target element is NOT found in the array?",
        options: ["0", "999", "null", "-1"],
        correct: 3,
        explanation:
          '-1 is the standard return value for "not found" because it is an invalid index for an array, clearly indicating the search failed.',
      },
      {
        id: 6,
        diff: "medium",
        text: "In the worst-case scenario, how many elements will Linear Search check in an array of size N?",
        options: ["1 element", "N/2 elements", "N elements", "Log N elements"],
        correct: 2,
        explanation:
          "In the worst case (the element is at the very end or not present at all), the algorithm must check every single one of the N elements.",
      },
      {
        id: 7,
        diff: "medium",
        text: "Which of the following describes the step-by-step logic of Linear Search?",
        options: [
          "Compare, move to next, repeat until found or end of list",
          "Divide the list in half, check the middle, repeat",
          "Sort the list first, then pick the middle element",
          "Jump by a fixed block size until the element is passed",
        ],
        correct: 0,
        explanation:
          "Linear search logic is simple: check the current element, if it matches you are done; if not, move to the very next element.",
      },
      {
        id: 8,
        diff: "easy",
        text: "True or False: Linear Search can only be used on numerical data.",
        options: ["True", "False"],
        correct: 1,
        explanation:
          "Linear search can be used on any data type (strings, objects, characters) as long as you can compare the current element with your target.",
      },
      {
        id: 9,
        diff: "medium",
        text: 'Which "Base Case" represents a failed search in a recursive implementation of Linear Search?',
        options: [
          "If current_element == target",
          "If index >= array_length",
          "If index == 0",
          "If target < 0",
        ],
        correct: 1,
        explanation:
          "If the index reaches or exceeds the length of the array, it means we have exhausted all elements without finding a match, signifying a failure.",
      },
      {
        id: 10,
        diff: "medium",
        text: "Why is Linear Search considered the simplest searching algorithm?",
        options: [
          "Because it is the fastest algorithm available",
          "Because it uses complex mathematical formulas",
          "Because it requires no preprocessing of data and uses basic loop logic",
          "Because it only works on small arrays",
        ],
        correct: 2,
        explanation:
          "Its simplicity comes from the fact that it requires no sorting (preprocessing) and can be implemented with a single `for` or `while` loop.",
      },
    ],
  },

  "linearsearch-l2": {
    topicName: "Linear Search",
    level: "Level 2",
    subtitle:
      "Master efficiency analysis, edge cases, and algorithmic optimization.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "linearsearch_l3_unlocked",
    nextPage: "linearsearch_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Searching", link: "search_basics.html" },
      { text: "Level 2 — Linear Search", link: "linear_search_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: 'What is the "Average Case" time complexity of Linear Search, and what does it represent?',
        options: [
          "O(1); the item is found immediately.",
          "O(n); the item is usually not there.",
          "O(n/2); effectively O(n), representing the item being in the middle.",
          "O(log n); the array is halved.",
        ],
        correct: 2,
        explanation:
          "In the average case, we expect to find the element somewhere in the middle of the list. Mathematically, this is $n/2$ comparisons, which simplifies to O(n) in Big O notation.",
      },
      {
        id: 2,
        diff: "hard",
        text: "If a Linear Search is performed on an unsorted array of size N and the target element is NOT present, exactly how many comparisons are made?",
        options: ["N - 1", "N", "Log N", "0"],
        correct: 1,
        explanation:
          "To confirm an element is missing in an unsorted list, the algorithm must check every single index from $0$ to $N-1$.",
      },
      {
        id: 3,
        diff: "medium",
        text: "Which of the following is a significant advantage of Linear Search over Binary Search?",
        options: [
          "It is faster for very large datasets.",
          "It does not require the data to be sorted.",
          "It has a better worst-case complexity.",
          "It uses more memory but is more reliable.",
        ],
        correct: 1,
        explanation:
          "Linear Search is the go-to for unsorted data. Binary Search requires $O(n \log n)$ time to sort the data first if it isn't already ordered.",
      },
      {
        id: 4,
        diff: "hard",
        text: "In the C++ implementation `for(int i=0; i<n; i++) { if(arr[i] == x) return i; }`, what is the purpose of the `return i` statement?",
        options: [
          "To continue to the next element.",
          "To restart the search.",
          "Early Exit: It terminates the function as soon as the element is found.",
          "To increment the counter.",
        ],
        correct: 2,
        explanation:
          'Efficiency in Linear Search comes from the "Early Exit." As soon as the match is found, we stop the loop to save unnecessary comparisons.',
      },
      {
        id: 5,
        diff: "medium",
        text: "What is the Space Complexity of the standard iterative Linear Search algorithm?",
        options: ["O(n)", "O(n²)", "O(1)", "O(log n)"],
        correct: 2,
        explanation:
          'Linear Search is an "in-place" algorithm. It only requires a constant amount of extra memory for a few variables (like the loop counter), regardless of the input size.',
      },
      {
        id: 6,
        diff: "hard",
        text: "Consider a scenario where the target element is the very first item in the array. What is the time complexity for this specific instance?",
        options: ["O(n)", "O(n/2)", "O(1)", "O(0)"],
        correct: 2,
        explanation:
          'This is the "Best Case" scenario. Since the match is at index 0, the algorithm performs exactly one comparison and terminates immediately.',
      },
      {
        id: 7,
        diff: "medium",
        text: "When searching for a string in a list of strings using Linear Search, what factor can affect the actual performance besides the number of elements?",
        options: [
          "The color of the UI.",
          "The length of the strings being compared.",
          "The order of the alphabet.",
          "The index of the first string.",
        ],
        correct: 1,
        explanation:
          "While the algorithm is $O(n)$, each comparison of two strings can take $O(k)$ time, where $k$ is the length of the string. The total time becomes $O(n \cdot k)$.",
      },
      {
        id: 8,
        diff: "hard",
        text: "Can Linear Search be performed on a Linked List? If so, what is the complexity?",
        options: [
          "No, because you cannot index elements.",
          "Yes, but it is O(n²).",
          "Yes, and it is O(n).",
          "No, only Binary Search works on Linked Lists.",
        ],
        correct: 2,
        explanation:
          "Linear Search is ideal for Linked Lists because it only requires sequential access (moving from one node to the next), which matches the structure of a list.",
      },
      {
        id: 9,
        diff: "medium",
        text: "What value is typically returned by a Linear Search function if the target element is not found?",
        options: ["0", "The size of the array (N)", "-1", "null only"],
        correct: 2,
        explanation:
          "By convention, -1 is returned because it is not a valid array index, clearly signaling that the search failed.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'Which "Search" strategy is best if you need to find an element in a small, frequently changing unsorted list?',
        options: [
          "Sort it and use Binary Search.",
          "Linear Search.",
          "Build a Binary Search Tree.",
          "Jump Search.",
        ],
        correct: 1,
        explanation:
          "If the list is small and changes often, the overhead of sorting (for Binary Search) or building a tree exceeds the cost of a simple $O(n)$ Linear Search.",
      },
    ],
  },

  "binarysearch-l1": {
    topicName: "Binary Search",
    level: "Level 1",
    subtitle:
      "Master the fundamentals of Divide and Conquer, sorted data requirements, and pointer logic.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "binarysearch_l2_unlocked",
    nextPage: "binarySearch_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Searching", link: "search_basics.html" },
      { text: "Level 1 — Basics", link: "binarySearch_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is the most critical prerequisite for an array before Binary Search can be applied?",
        options: [
          "The array must have an even number of elements",
          "The array must be sorted",
          "The array must contain only positive numbers",
          "The array must be empty",
        ],
        correct: 1,
        explanation:
          "Binary Search relies on the order of elements to decide which half of the data to discard. If the data is unsorted, the logic fails.",
      },
      {
        id: 2,
        diff: "medium",
        text: "Which algorithmic strategy does Binary Search follow?",
        options: [
          "Greedy Approach",
          "Dynamic Programming",
          "Divide and Conquer",
          "Backtracking",
        ],
        correct: 2,
        explanation:
          'Binary Search follows "Divide and Conquer" by repeatedly dividing the search interval in half.',
      },
      {
        id: 3,
        diff: "easy",
        text: "In the first step of Binary Search, which element is compared with the target value?",
        options: [
          "The first element",
          "The last element",
          "The middle element",
          "The second element",
        ],
        correct: 2,
        explanation:
          "Binary Search always starts by comparing the target with the middle element of the current range.",
      },
      {
        id: 4,
        diff: "medium",
        text: "If the target value is GREATER than the middle element, what is the next step?",
        options: [
          "Discard the left half by setting low = mid + 1",
          "Discard the right half by setting high = mid - 1",
          "Search the whole array again",
          "Stop the search",
        ],
        correct: 0,
        explanation:
          'Since the array is sorted, if the target is greater than the mid, it must be in the right half. We move the "low" pointer to mid + 1.',
      },
      {
        id: 5,
        diff: "medium",
        text: "What is the formula used to find the middle index (mid) in a basic Binary Search?",
        options: [
          "mid = low + high",
          "mid = (low + high) / 2",
          "mid = high - low",
          "mid = low * high / 2",
        ],
        correct: 1,
        explanation:
          "The middle index is the average of the low and high indices, usually calculated as (low + high) / 2.",
      },
      {
        id: 6,
        diff: "hard",
        text: "If you are searching for a value in a sorted array of 1,000 elements, approximately what is the maximum number of comparisons Binary Search will make?",
        options: ["500", "1,000", "10", "100"],
        correct: 2,
        explanation:
          "Binary Search has a complexity of O(log N). Since 2¹⁰ is 1,024, it takes at most about 10 comparisons for 1,000 elements.",
      },
      {
        id: 7,
        diff: "easy",
        text: "What happens to the search range in every step of a Binary Search?",
        options: [
          "It stays the same",
          "It decreases by 1 element",
          "It is reduced by half",
          "It doubles",
        ],
        correct: 2,
        explanation:
          'The "Divide" part of the algorithm ensures the search space is halved after every unsuccessful comparison.',
      },
      {
        id: 8,
        diff: "medium",
        text: "Which condition in the `while` loop ensures the search continues as long as the range is valid?",
        options: [
          "while (low < high)",
          "while (low <= high)",
          "while (low != mid)",
          "while (high > 0)",
        ],
        correct: 1,
        explanation:
          "The loop must continue as long as `low <= high`. If `low` exceeds `high`, the target is not in the array.",
      },
      {
        id: 9,
        diff: "hard",
        text: "If the target value is SMALLER than the middle element, how do we update our search boundaries?",
        options: [
          "low = mid + 1",
          "high = mid",
          "high = mid - 1",
          "low = mid - 1",
        ],
        correct: 2,
        explanation:
          'If the target is smaller than the mid, we focus on the left half by moving the "high" pointer to mid - 1.',
      },
      {
        id: 10,
        diff: "easy",
        text: "What does Binary Search return if the target element is NOT found after the loop finishes?",
        options: ["0", "The middle index", "-1", "The size of the array"],
        correct: 2,
        explanation:
          "Like most searching algorithms, -1 is returned to indicate that the target is not present in the data set.",
      },
    ],
  },
  "binarysearch-l2": {
    topicName: "Binary Search",
    level: "Level 2",
    subtitle:
      "Master recursive logic, overflow prevention, and efficiency trade-offs.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "binarysearch_l3_unlocked",
    nextPage: "binarysearch_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Searching", link: "search_basics.html" },
      { text: "Level 2 — Intermediate", link: "binary_Search_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: 'In the recursive version of Binary Search, what serves as the "Base Case" for an element that is NOT present in the array?',
        options: [
          "If the middle element is 0",
          'If the "low" pointer becomes greater than the "high" pointer',
          'If the "mid" pointer reaches the end of the array',
          "If the function returns 0",
        ],
        correct: 1,
        explanation:
          "Just like the iterative version, the recursion must stop if the search space becomes invalid (low > high), returning -1 to signal the target was not found.",
      },
      {
        id: 2,
        diff: "hard",
        text: "To prevent integer overflow in languages like C++ or Java when calculating the middle index, which formula is preferred over `(low + high) / 2`?",
        options: [
          "mid = low + (high + low) / 2",
          "mid = low + (high - low) / 2",
          "mid = (high - low) / 2",
          "mid = high - (low / 2)",
        ],
        correct: 1,
        explanation:
          "If `low` and `high` are both very large, adding them can exceed the maximum capacity of an integer. `low + (high - low) / 2` calculates the same value without risk of overflow.",
      },
      {
        id: 3,
        diff: "medium",
        text: "What is the Space Complexity of the ITERATIVE version of Binary Search?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correct: 2,
        explanation:
          "The iterative version only uses a few variables (low, high, mid) regardless of the array size, resulting in Constant Space Complexity, O(1).",
      },
      {
        id: 4,
        diff: "hard",
        text: "What is the Space Complexity of the RECURSIVE version of Binary Search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 1,
        explanation:
          "Each recursive call adds a new frame to the Call Stack. Since there are log(n) divisions, the space used for the stack is O(log n).",
      },
      {
        id: 5,
        diff: "medium",
        text: 'How many comparisons are needed to find an element in the "Best Case" scenario for Binary Search?',
        options: ["0", "1", "Log n", "n/2"],
        correct: 1,
        explanation:
          'In the best case, the target element is exactly at the first "mid" index calculated, requiring only one comparison.',
      },
      {
        id: 6,
        diff: "hard",
        text: "If Binary Search is applied to a sorted array and the target appears multiple times, which index does the standard algorithm return?",
        options: [
          "The first occurrence",
          "The last occurrence",
          "Any index where the target is found (not necessarily the first or last)",
          "The middle occurrence",
        ],
        correct: 2,
        explanation:
          'Standard Binary Search returns as soon as it finds a match. In an array like [1, 2, 2, 2, 3], it might return index 2, but it doesn\'t guarantee finding the very first or very last "2".',
      },
      {
        id: 7,
        diff: "medium",
        text: "In a recursive Binary Search call `binarySearch(arr, low, mid - 1, target)`, which half of the array are we searching?",
        options: [
          "The Right Half",
          "The Left Half",
          "The entire array excluding mid",
          "The middle third",
        ],
        correct: 1,
        explanation:
          'By setting the new "high" to `mid - 1`, we narrow the search space to everything before the current middle element (the left half).',
      },
      {
        id: 8,
        diff: "hard",
        text: "Why is Binary Search significantly more efficient than Linear Search for large datasets?",
        options: [
          "Because it processes multiple elements at once",
          "Because its time complexity is logarithmic (O(log n)) rather than linear (O(n))",
          "Because it uses less CPU power",
          "Because it works on unsorted data",
        ],
        correct: 1,
        explanation:
          "As N grows, log(n) increases much slower than n. For 1 million elements, Linear Search takes up to 1,000,000 steps, while Binary Search takes only ~20.",
      },
      {
        id: 9,
        diff: "medium",
        text: "Which of the following describes the movement of pointers if the `target < arr[mid]` in an iterative loop?",
        options: ["low = mid + 1", "high = mid - 1", "low = mid", "high = low"],
        correct: 1,
        explanation:
          "If the target is smaller than the middle, we discard the right half by moving the `high` boundary to the left of the current `mid`.",
      },
      {
        id: 10,
        diff: "hard",
        text: "What happens to the performance of Binary Search if we use a Linked List instead of an Array?",
        options: [
          "It remains O(log n)",
          "It becomes O(n) because of sequential access",
          "It becomes O(1)",
          "It cannot be performed at all",
        ],
        correct: 1,
        explanation:
          'Binary Search requires "Random Access" to jump to the middle index in O(1) time. In a Linked List, reaching the middle takes O(n), negating the efficiency of the algorithm.',
      },
    ],
  },

  "bubblesort-l1": {
    topicName: "Bubble Sort",
    level: "Level 1",
    subtitle:
      'Learn the fundamentals of comparison-based sorting, adjacent swapping, and the "bubbling" effect.',
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "bubblesort_l2_unlocked",
    nextPage: "bubbleSort_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Algorithms", link: "algorithms.html" },
      { text: "Level 1 — Basics", link: "bubbleSort_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is the core mechanism of the Bubble Sort algorithm?",
        options: [
          "Finding the smallest element and moving it to the front",
          "Dividing the array into two halves repeatedly",
          "Repeatedly swapping adjacent elements if they are in the wrong order",
          "Inserting each element into its correct position in a sorted sub-list",
        ],
        correct: 2,
        explanation:
          "Bubble Sort works by comparing neighboring (adjacent) elements and swapping them if the left one is larger than the right one.",
      },
      {
        id: 2,
        diff: "easy",
        text: 'In Bubble Sort, what happens at the end of each full "pass" through the array?',
        options: [
          "The smallest element moves to the end",
          'The largest unsorted element "bubbles up" to its correct position',
          "The entire array becomes sorted",
          "The middle element is correctly placed",
        ],
        correct: 1,
        explanation:
          "During each pass, the largest remaining unsorted element is moved (bubbles up) to its final position at the end of the array.",
      },
      {
        id: 3,
        diff: "medium",
        text: "What is the Worst-Case Time Complexity of Bubble Sort?",
        options: ["O(N)", "O(log N)", "O(N²)", "O(1)"],
        correct: 2,
        explanation:
          "In the worst case (like a reverse-sorted array), Bubble Sort requires two nested loops to compare and swap, resulting in O(N²) complexity.",
      },
      {
        id: 4,
        diff: "medium",
        text: 'Bubble Sort is known as a "Stable" sort. What does this mean?',
        options: [
          "It uses very little memory",
          "It always takes the same amount of time to run",
          "Equal elements maintain their original relative order after sorting",
          "It never crashes during execution",
        ],
        correct: 2,
        explanation:
          'A "Stable Sort" ensures that if two elements have the same value, their original relative sequence is preserved.',
      },
      {
        id: 5,
        diff: "easy",
        text: "What is the Space Complexity of Bubble Sort?",
        options: ["O(N)", "O(1)", "O(log N)", "O(N²)"],
        correct: 1,
        explanation:
          "Bubble Sort is an in-place algorithm, meaning it only requires a single extra variable for swapping, regardless of the array size.",
      },
      {
        id: 6,
        diff: "medium",
        text: 'If an array is already sorted, what is the "Best-Case" Time Complexity of an optimized Bubble Sort?',
        options: ["O(N²)", "O(1)", "O(N)", "O(N log N)"],
        correct: 2,
        explanation:
          "An optimized version of Bubble Sort can detect if no swaps occurred in a pass, allowing it to finish in linear time, O(N).",
      },
      {
        id: 7,
        diff: "easy",
        text: "Which real-world analogy best describes Bubble Sort?",
        options: [
          "A deck of cards being dealt",
          "People in a queue swapping places until they are ordered by height",
          "Searching for a word in a dictionary",
          "Organizing a bookshelf by category",
        ],
        correct: 1,
        explanation:
          "Walking down a line and swapping neighbors until the tallest person reaches the back is a perfect analogy for how Bubble Sort functions.",
      },
      {
        id: 8,
        diff: "medium",
        text: "When comparing two adjacent elements `arr[j]` and `arr[j+1]`, under what condition should a swap occur for ascending order?",
        options: [
          "arr[j] < arr[j+1]",
          "arr[j] == arr[j+1]",
          "arr[j] > arr[j+1]",
          "Always swap",
        ],
        correct: 2,
        explanation:
          "To sort in ascending order, if the left element (arr[j]) is greater than the right element (arr[j+1]), they are in the wrong order and must be swapped.",
      },
      {
        id: 9,
        diff: "medium",
        text: 'In the visual representation of Bubble Sort, what color usually indicates an element that has successfully "bubbled up"?',
        options: ["Orange", "Purple", "Red", "Blue"],
        correct: 1,
        explanation:
          "In the provided visual diagrams, sorted elements that have finished bubbling up are typically highlighted in purple.",
      },
      {
        id: 10,
        diff: "hard",
        text: "Why is Bubble Sort often used in educational settings despite its inefficiency on large datasets?",
        options: [
          "It is the fastest sorting algorithm",
          "It is the most complex algorithm to implement",
          "It is highly intuitive and ideal for learning basic comparison-based logic",
          "It is the only algorithm that works on arrays",
        ],
        correct: 2,
        explanation:
          "Bubble Sort is one of the simplest algorithms to understand, making it a standard tool for teaching the concept of sorting and algorithmic complexity.",
      },
    ],
  },

  "bubblesort-l2": {
    topicName: "Bubble Sort",
    level: "Level 2",
    subtitle:
      "Master optimization strategies, pass-by-pass logic, and performance boundaries.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "bubblesort_l3_unlocked",
    nextPage: "bubble_sort_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "bubble_basics.html" },
      { text: "Level 2 — Intermediate", link: "bubble_sort_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: 'What is the purpose of the "swapped" boolean flag in an optimized Bubble Sort implementation?',
        options: [
          "To keep track of the number of elements",
          "To detect if the array is already sorted and exit the loop early",
          "To change the sorting order from ascending to descending",
          "To store the temporary value during a swap",
        ],
        correct: 1,
        explanation:
          "If a full pass is completed without a single swap, it means the array is already sorted. The flag allows the algorithm to terminate early, achieving O(n) time in the best case.",
      },
      {
        id: 2,
        diff: "hard",
        text: "In the nested loop structure `for(i=0; i < n-1; i++)` and `for(j=0; j < n-i-1; j++)`, why is the inner loop limit `n-i-1`?",
        options: [
          'To avoid checking the last "i" elements which are already sorted',
          "To make the algorithm run in O(log n) time",
          "To ensure we only check even-indexed elements",
          "Because the first element is always sorted first",
        ],
        correct: 0,
        explanation:
          'After each pass "i", the largest "i" elements have already "bubbled up" to the end. `n-i-1` prevents redundant comparisons of elements that are already in their final positions.',
      },
      {
        id: 3,
        diff: "medium",
        text: "If an optimized Bubble Sort is performed on an array that is already sorted, how many passes of the outer loop will occur?",
        options: ["N passes", "1 pass", "0 passes", "N/2 passes"],
        correct: 1,
        explanation:
          'The algorithm will complete one full pass to check for swaps. When the "swapped" flag remains false, it exits immediately.',
      },
      {
        id: 4,
        diff: "hard",
        text: "What is the total number of comparisons in a standard (non-optimized) Bubble Sort for an array of size N?",
        options: ["N", "N log N", "N(N-1)/2", "N²"],
        correct: 2,
        explanation:
          "The number of comparisons is the sum of the first (N-1) integers: (N-1) + (N-2) + ... + 1, which equals N(N-1)/2.",
      },
      {
        id: 5,
        diff: "medium",
        text: "Which of the following describes the behavior of Bubble Sort on a reverse-sorted array?",
        options: [
          "It performs the minimum number of swaps",
          "It achieves its Best Case time complexity",
          "It performs the maximum number of swaps and comparisons (Worst Case)",
          "It exits after the first pass",
        ],
        correct: 2,
        explanation:
          "In a reverse-sorted array, every single comparison results in a swap, leading to the worst-case O(N²) performance.",
      },
      {
        id: 6,
        diff: "hard",
        text: 'In the provided C++ code, which line of logic represents the actual "bubbling" swap?',
        options: [
          "if (arr[j] > arr[j+1]) { swap(arr[j], arr[j+1]); }",
          "if (arr[j] < arr[i]) { swap(arr[j], arr[i]); }",
          "arr[i] = arr[j];",
          "while(swapped == true)",
        ],
        correct: 0,
        explanation:
          "The swap occurs only when the current element is greater than its immediate neighbor to the right (`j+1`).",
      },
      {
        id: 7,
        diff: "medium",
        text: "Why is Bubble Sort rarely used in real-world production applications with large datasets?",
        options: [
          "It is not a stable sort",
          "It requires too much extra memory (Space Complexity)",
          "Its O(N²) time complexity makes it too slow compared to QuickSort or MergeSort",
          "It cannot handle negative numbers",
        ],
        correct: 2,
        explanation:
          "While simple, O(N²) algorithms scale poorly. For 100,000 items, Bubble Sort might take hours while O(N log N) algorithms take milliseconds.",
      },
      {
        id: 8,
        diff: "hard",
        text: 'What is the "Average Case" time complexity of Bubble Sort?',
        options: ["O(N)", "O(N log N)", "O(N²)", "O(1)"],
        correct: 2,
        explanation:
          "Even in the average case, the number of swaps and comparisons still follows a quadratic pattern, resulting in O(N²).",
      },
      {
        id: 9,
        diff: "medium",
        text: "Does Bubble Sort require extra space proportional to the input size?",
        options: [
          "Yes, it is O(N)",
          "No, it is O(1) because it sorts in-place",
          "Yes, it is O(log N)",
          "No, it uses no memory at all",
        ],
        correct: 1,
        explanation:
          'Bubble Sort is an "in-place" algorithm. It swaps elements within the original array and only uses a constant amount of extra memory for the swap variable and loop counters.',
      },
      {
        id: 10,
        diff: "hard",
        text: "If an array is `[5, 1, 4, 2, 8]`, what will the array look like after the FIRST full pass of Bubble Sort?",
        options: [
          "[1, 2, 4, 5, 8]",
          "[1, 4, 2, 5, 8]",
          "[5, 4, 2, 1, 8]",
          "[8, 5, 4, 2, 1]",
        ],
        correct: 1,
        explanation:
          "Pass 1: (5,1)->(1,5); (5,4)->(4,5); (5,2)->(2,5); (5,8)->no swap. Result: [1, 4, 2, 5, 8]. The largest element (8) is now at the end.",
      },
    ],
  },

  "selectionsort-l1": {
    topicName: "Selection Sort",
    level: "Level 1",
    subtitle:
      "Learn the fundamentals of finding the minimum, swapping elements, and maintaining sorted boundaries.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "selectionsort_l2_unlocked",
    nextPage: "selectionsort_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "selection_basics.html" },
      { text: "Level 1 — Basics", link: "selectionsort_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is the primary goal of each pass in a standard Selection Sort algorithm?",
        options: [
          "To swap every adjacent element",
          "To find the smallest element in the unsorted part and move it to the beginning",
          "To divide the array into two equal halves",
          "To sort the array in reverse order first",
        ],
        correct: 1,
        explanation:
          "Selection Sort works by repeatedly finding the minimum element from the unsorted part and putting it at the beginning of the sorted part.",
      },
      {
        id: 2,
        diff: "easy",
        text: "How does Selection Sort divide the array during the sorting process?",
        options: [
          "Into three parts: small, medium, and large",
          'Into a "sorted" sub-array and an "unsorted" sub-array',
          "It does not divide the array",
          "Into positive and negative numbers",
        ],
        correct: 1,
        explanation:
          "Selection Sort maintains two sub-arrays in a given array: one which is already sorted and the remaining part which is unsorted.",
      },
      {
        id: 3,
        diff: "medium",
        text: "In an array of size N, how many passes through the outer loop are required to fully sort the array?",
        options: ["N", "N - 1", "log N", "1"],
        correct: 1,
        explanation:
          "Selection Sort requires N-1 passes. After N-1 elements are placed in their correct positions, the last element is automatically in its correct spot.",
      },
      {
        id: 4,
        diff: "easy",
        text: 'What is the Time Complexity of Selection Sort in the "Best Case" (e.g., if the array is already sorted)?',
        options: ["O(N)", "O(N log N)", "O(N²)", "O(1)"],
        correct: 2,
        explanation:
          "Selection Sort is not adaptive; it always scans the remaining unsorted part to find the minimum, even if the array is already sorted, resulting in O(N²) every time.",
      },
      {
        id: 5,
        diff: "medium",
        text: "Compared to Bubble Sort, which operation is performed LESS frequently in Selection Sort?",
        options: ["Comparisons", "Swaps", "Loops", "Index increments"],
        correct: 1,
        explanation:
          "Selection Sort is more efficient in terms of memory writes because it performs at most O(N) swaps, whereas Bubble Sort can perform up to O(N²) swaps.",
      },
      {
        id: 6,
        diff: "easy",
        text: "What is the Space Complexity of Selection Sort?",
        options: ["O(N)", "O(1)", "O(log N)", "O(N²)"],
        correct: 1,
        explanation:
          "Selection Sort is an in-place sorting algorithm and only requires a constant amount of extra memory for variables like the minimum index and temporary swap storage.",
      },
      {
        id: 7,
        diff: "medium",
        text: "After the very first pass of Selection Sort is completed, where is the smallest element located?",
        options: [
          "At the end of the array",
          "At the middle of the array",
          "At index 0",
          "It stays in its original position",
        ],
        correct: 2,
        explanation:
          "The first pass finds the global minimum and swaps it with the element at index 0, marking the start of the sorted sub-array.",
      },
      {
        id: 8,
        diff: "hard",
        text: "If the initial array is [64, 25, 12, 22, 11], what is the state of the array after the FIRST swap?",
        options: [
          "[11, 25, 12, 22, 64]",
          "[11, 12, 22, 25, 64]",
          "[64, 25, 12, 11, 22]",
          "[25, 64, 12, 22, 11]",
        ],
        correct: 0,
        explanation:
          "The algorithm finds 11 as the minimum and swaps it with the first element (64). The result is [11, 25, 12, 22, 64].",
      },
      {
        id: 9,
        diff: "medium",
        text: "What logic is used to find the minimum element in the unsorted portion?",
        options: [
          "Binary Search",
          "A simple Linear Scan",
          "Random selection",
          "Comparing the first and last elements only",
        ],
        correct: 1,
        explanation:
          "To find the minimum, the algorithm performs a linear scan through the unsorted sub-array, comparing each element to the current minimum found.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'Is the standard implementation of Selection Sort considered "Stable"?',
        options: [
          "Yes, it always preserves order",
          "No, because long-distance swaps can change the relative order of equal elements",
          "Yes, but only for integers",
          "No, because it uses O(N) space",
        ],
        correct: 1,
        explanation:
          "Selection Sort is generally not stable because swapping the minimum element into its place can move it past an identical element elsewhere in the array.",
      },
    ],
  },
  "selectionsort-l2": {
    topicName: "Selection Sort",
    level: "Level 2",
    subtitle:
      "Master boundary logic, swap efficiency, and index-based searching mechanics.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "selectionsort_l3_unlocked",
    nextPage: "selectionsort_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "selection_basics.html" },
      { text: "Level 2 — Intermediate", link: "selectionsort_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: "What is the primary logical step that occurs in the inner loop of Selection Sort?",
        options: [
          "Swapping every adjacent pair of elements",
          "Finding the index of the minimum element in the remaining unsorted part",
          "Checking if the entire array is already sorted",
          "Moving the largest element to the front",
        ],
        correct: 1,
        explanation:
          'Unlike Bubble Sort, the inner loop of Selection Sort does not swap; it only updates a "min_idx" variable to keep track of the smallest value found so far.',
      },
      {
        id: 2,
        diff: "hard",
        text: 'In Selection Sort, after exactly "k" passes of the outer loop, what can be guaranteed about the array?',
        options: [
          "The last k elements are in their final sorted positions",
          "The first k elements are in their final sorted positions",
          "The entire array is sorted",
          "The array is partially sorted but positions are not final",
        ],
        correct: 1,
        explanation:
          'Selection Sort builds the sorted array from left to right. After k passes, the k smallest elements are "selected" and placed in their permanent spots at the beginning of the array.',
      },
      {
        id: 3,
        diff: "medium",
        text: "How many swaps are performed in the Worst Case for an array of size N?",
        options: ["N²", "N log N", "N - 1", "N(N-1)/2"],
        correct: 2,
        explanation:
          "One of the unique advantages of Selection Sort is that it performs at most $N-1$ swaps. It only swaps once per outer loop pass, even if it does many comparisons.",
      },
      {
        id: 4,
        diff: "hard",
        text: 'What is the "Best Case" time complexity of Selection Sort if the array is already sorted?',
        options: ["O(N)", "O(N log N)", "O(N²)", "O(1)"],
        correct: 2,
        explanation:
          "Selection Sort is NOT adaptive. Even if the array is sorted, it will still scan the remaining unsorted portion to confirm the minimum, resulting in $O(N^2)$ every time.",
      },
      {
        id: 5,
        diff: "medium",
        text: "In the code `if (arr[j] < arr[min_idx]) { min_idx = j; }`, what is the purpose of this condition?",
        options: [
          "To immediately swap the elements",
          "To update the pointer to the smallest element found in the current pass",
          "To exit the loop early",
          "To sort the array in descending order",
        ],
        correct: 1,
        explanation:
          "This line identifies the position of the minimum value. A swap only occurs *after* the inner loop finishes scanning the rest of the unsorted section.",
      },
      {
        id: 6,
        diff: "hard",
        text: 'Selection Sort is generally considered an "Unstable" sorting algorithm. Why?',
        options: [
          "Because its time complexity is O(N²)",
          "Because a swap can jump an element over another equal element, changing their relative order",
          "Because it uses too much extra memory",
          "Because it requires the data to be sorted first",
        ],
        correct: 1,
        explanation:
          "Because Selection Sort swaps the minimum element with the element at the current boundary, it can move an element past an identical one further down the array, losing their original relative sequence.",
      },
      {
        id: 7,
        diff: "medium",
        text: "Compared to Bubble Sort, why might Selection Sort be preferred in systems with slow write speeds (like Flash memory)?",
        options: [
          "It makes fewer comparisons",
          "It makes fewer swaps (writes to memory)",
          "It uses more CPU cache",
          "It can be parallelized easily",
        ],
        correct: 1,
        explanation:
          "Selection Sort performs $O(n)$ swaps while Bubble Sort performs $O(n^2)$ swaps. In systems where writing to memory is expensive, Selection Sort is more efficient.",
      },
      {
        id: 8,
        diff: "hard",
        text: "If the outer loop runs from `i = 0` to `n-2`, why does the inner loop start at `j = i + 1`?",
        options: [
          "To skip the elements already placed in the sorted portion",
          "To compare the element with itself",
          "To ensure the largest element is found first",
          "To avoid an IndexOutOfBounds exception",
        ],
        correct: 0,
        explanation:
          "Everything before index `i` is already sorted. We only need to find the minimum starting from the first unsorted element (`i`) and checking the rest (`i+1` to `n-1`).",
      },
      {
        id: 9,
        diff: "medium",
        text: "What happens if `min_idx` is equal to `i` after the inner loop finishes?",
        options: [
          "An error occurs",
          "The element is already in the correct position; no actual swap is needed",
          "The element is deleted",
          "The algorithm restarts",
        ],
        correct: 1,
        explanation:
          "If `min_idx == i`, the current element is already the smallest in the unsorted part. While a swap of an element with itself can be coded, it is logically unnecessary.",
      },
      {
        id: 10,
        diff: "hard",
        text: "Which of the following is true about the Space Complexity of Selection Sort?",
        options: [
          "It is O(N) because of the temporary array used",
          "It is O(1) as it is an in-place sorting algorithm",
          "It is O(log N) due to recursive calls",
          "It is O(N²) because of the nested loops",
        ],
        correct: 1,
        explanation:
          "Selection Sort only requires a constant amount of extra memory (variables for `i`, `j`, `min_idx`, and a `temp` for swapping), regardless of input size.",
      },
    ],
  },

  "mergesort-l1": {
    topicName: "Merge Sort",
    level: "Level 1",
    subtitle:
      "Master the Divide and Conquer strategy, recursive splitting, and the fundamental merging process.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "mergesort_l2_unlocked",
    nextPage: "mergesort_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "sorting_basics.html" },
      { text: "Level 1 — Basics", link: "mergesort_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "Which algorithmic paradigm does Merge Sort follow?",
        options: [
          "Greedy Approach",
          "Dynamic Programming",
          "Divide and Conquer",
          "Backtracking",
        ],
        correct: 2,
        explanation:
          'Merge Sort works by "Dividing" the array into smaller sub-arrays and "Conquering" them by sorting and merging them back together.',
      },
      {
        id: 2,
        diff: "easy",
        text: 'What is the "Divide" step in Merge Sort?',
        options: [
          "Finding the smallest element in the array",
          "Splitting the array into two halves at the midpoint",
          "Swapping adjacent elements",
          "Removing duplicate elements",
        ],
        correct: 1,
        explanation:
          "The first step of Merge Sort is to find the middle index and split the current array into two halves.",
      },
      {
        id: 3,
        diff: "medium",
        text: 'When does the "Dividing" phase of Merge Sort stop?',
        options: [
          "When the array has 10 elements",
          "When the sub-arrays have only 1 element each (base case)",
          "When the array is already sorted",
          "After exactly 5 splits",
        ],
        correct: 1,
        explanation:
          "The recursion continues until the sub-arrays contain only one element, as a single element is always considered sorted.",
      },
      {
        id: 4,
        diff: "medium",
        text: 'What is the primary purpose of the "Merge" function in this algorithm?',
        options: [
          "To split the array further",
          "To combine two sorted sub-arrays into a single sorted array",
          "To find the middle of the array",
          "To delete the original array",
        ],
        correct: 1,
        explanation:
          "The Merge function is where the actual sorting happens by comparing elements from two sorted halves and placing them into a new result array in order.",
      },
      {
        id: 5,
        diff: "hard",
        text: "What is the Time Complexity of Merge Sort in the Best, Average, and Worst cases?",
        options: ["O(N²)", "O(N log N)", "O(N)", "O(log N)"],
        correct: 1,
        explanation:
          "Merge Sort is highly consistent; because it always divides the array in half and performs a linear merge, it takes O(N log N) time regardless of the initial order of elements.",
      },
      {
        id: 6,
        diff: "medium",
        text: "How does Merge Sort compare to Bubble Sort in terms of Space Complexity?",
        options: [
          "Merge Sort uses less space (O(1))",
          "Merge Sort uses more space (O(N)) because it requires temporary arrays for merging",
          "Both use the same amount of space",
          "Merge Sort uses O(N²) space",
        ],
        correct: 1,
        explanation:
          'Merge Sort is not an "in-place" algorithm. It requires extra memory proportional to the size of the array (O(N)) to store elements during the merge process.',
      },
      {
        id: 7,
        diff: "easy",
        text: 'Is Merge Sort considered a "Stable" sorting algorithm?',
        options: ["Yes", "No"],
        correct: 0,
        explanation:
          "Yes, Merge Sort is stable because it preserves the relative order of equal elements during the merge step.",
      },
      {
        id: 8,
        diff: "hard",
        text: 'If you have an array of 8 elements, how many "levels" of splitting will occur before reaching the base case?',
        options: ["8 levels", "4 levels", "3 levels", "1 level"],
        correct: 2,
        explanation:
          "Since the array is halved at each step, for 8 elements (2³), it takes 3 levels of splitting to reach individual elements.",
      },
      {
        id: 9,
        diff: "medium",
        text: "During the Merge step, what happens if one sub-array is exhausted (empty) while elements still remain in the other?",
        options: [
          "The remaining elements are discarded",
          "The algorithm throws an error",
          "The remaining elements are simply copied to the end of the result array",
          "The algorithm starts over",
        ],
        correct: 2,
        explanation:
          "Since each sub-array is already sorted, if one is finished, the remaining elements in the other sub-array are already larger than everything in the result and can be copied directly.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'Which of the following describes the "Conquer" phase of Merge Sort?',
        options: [
          "The recursive splitting of the array",
          "Sorting the small sub-arrays (usually by reaching the base case of size 1)",
          "Finding the median value",
          "The initial input phase",
        ],
        correct: 1,
        explanation:
          'The "Conquer" phase involves solving the smallest sub-problems (the single elements) and then combining those solutions through merging.',
      },
    ],
  },
  "mergesort-l2": {
    topicName: "Merge Sort",
    level: "Level 2",
    subtitle:
      "Master stability mechanics, auxiliary space management, and pointer-based merging logic.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "mergesort_l3_unlocked",
    nextPage: "mergesort_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "mergesort_L1.html" },
      { text: "Level 2 — Intermediate", link: "mergesort_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: "During the Merge step, if both left[i] and right[j] are equal, which one is typically placed into the merged array first to maintain stability?",
        options: [
          "The element from the right sub-array",
          "The element from the left sub-array",
          "It doesn't matter",
          "A random one is chosen",
        ],
        correct: 1,
        explanation:
          "To maintain stability, we prioritize the element from the left sub-array. This ensures that equal elements retain their original relative order from the input array.",
      },
      {
        id: 2,
        diff: "hard",
        text: "What is the auxiliary space complexity of a standard Merge Sort implementation?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correct: 2,
        explanation:
          "Merge Sort requires O(N) auxiliary space because it needs temporary arrays to store and compare elements during the merging process.",
      },
      {
        id: 3,
        diff: "medium",
        text: "In the recursive function `mergeSort(arr, l, r)`, what is the correct formula to calculate the midpoint `m` to avoid potential integer overflow?",
        options: [
          "m = (l + r) / 2",
          "m = l + (r - l) / 2",
          "m = r - (l / 2)",
          "m = (l * r) / 2",
        ],
        correct: 1,
        explanation:
          "Using `l + (r - l) / 2` prevents integer overflow which can occur if `l + r` exceeds the maximum value allowed for an integer type.",
      },
      {
        id: 4,
        diff: "hard",
        text: 'Which of the following describes the "stable" property of Merge Sort?',
        options: [
          "The algorithm always takes the same amount of time",
          "The algorithm does not change the relative order of elements with equal keys",
          "The algorithm sorts the array in-place",
          "The algorithm has O(N log N) complexity",
        ],
        correct: 1,
        explanation:
          "A sorting algorithm is stable if it preserves the original relative order of duplicate elements. Merge Sort achieves this by correctly handling equal values during the merge step.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'After dividing an array into individual elements, the "Merge" process starts. If we are merging two sub-arrays of size 1, what is the maximum number of comparisons performed?',
        options: ["1", "2", "0", "4"],
        correct: 0,
        explanation:
          "To merge two sub-arrays of size 1, only 1 comparison is needed to determine which of the two elements is smaller.",
      },
      {
        id: 6,
        diff: "hard",
        text: "In a pointer-based merge, what does the condition `while (i < n1 && j < n2)` ensure?",
        options: [
          "That we continue merging until both sub-arrays are empty",
          "That we only compare elements as long as both sub-arrays have remaining items",
          "That the array is split correctly",
          "That we avoid infinite recursion",
        ],
        correct: 1,
        explanation:
          "This condition stops the comparison loop as soon as one of the sub-arrays is exhausted. Any remaining elements in the other sub-array are then copied over directly.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'What is the "depth" of the recursion tree for Merge Sort with N elements?',
        options: ["N", "N/2", "log₂ N", "N²"],
        correct: 2,
        explanation:
          "Since the array is divided in half at every level, it takes log₂ N divisions to reach the base case of single-element arrays.",
      },
      {
        id: 8,
        diff: "hard",
        text: "Why is Merge Sort typically preferred for sorting Linked Lists over Quick Sort?",
        options: [
          "It uses O(1) extra space for linked lists",
          "Quick Sort requires random access, which is slow for linked lists",
          "Merge Sort is faster than O(N log N) for lists",
          "Both A and B",
        ],
        correct: 3,
        explanation:
          "Merge Sort is highly efficient for Linked Lists because it doesn't require random access (like Quick Sort) and can be implemented with O(1) extra space for lists by simply rearranging pointers.",
      },
      {
        id: 9,
        diff: "medium",
        text: "What happens to the time complexity if the input array is already sorted?",
        options: [
          "It becomes O(N)",
          "It becomes O(log N)",
          "It remains O(N log N)",
          "It becomes O(N²)",
        ],
        correct: 2,
        explanation:
          "Merge Sort is non-adaptive; it performs the same number of divisions and merges regardless of the initial order, maintaining its O(N log N) complexity.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'In the implementation, what is the role of the "Temporary (Auxiliary) Arrays"?',
        options: [
          "To store the final sorted array permanently",
          "To hold the divided halves so they can be compared and merged back into the original array",
          "To increase the speed of the algorithm",
          "They are not necessary",
        ],
        correct: 1,
        explanation:
          "Standard Merge Sort is not in-place. It uses these temporary arrays to hold the sub-arrays while the merge logic calculates the correct order to overwrite the original array.",
      },
    ],
  },

  "quicksort-l1": {
    topicName: "Quick Sort",
    level: "Level 1",
    subtitle:
      "Master the Divide and Conquer strategy, pivot selection, and the fundamental partitioning process.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "quicksort_l2_unlocked",
    nextPage: "quicksort_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "sorting_basics.html" },
      { text: "Level 1 — Basics", link: "quicksort_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "Like Merge Sort, Quick Sort follows which algorithmic paradigm?",
        options: [
          "Greedy Approach",
          "Divide and Conquer",
          "Dynamic Programming",
          "Backtracking",
        ],
        correct: 1,
        explanation:
          "Quick Sort is a Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.",
      },
      {
        id: 2,
        diff: "medium",
        text: 'What is the "Pivot" in Quick Sort?',
        options: [
          "The largest element in the array",
          "An element used as a reference point to partition the array",
          "The middle element only",
          "A temporary variable for swapping",
        ],
        correct: 1,
        explanation:
          "A pivot is a key element selected from the array. The algorithm rearranges the array so that elements smaller than the pivot are on the left, and larger elements are on the right.",
      },
      {
        id: 3,
        diff: "easy",
        text: "Which part of Quick Sort is responsible for placing the pivot in its final sorted position?",
        options: ["Selection", "Merging", "Partitioning", "Inversion"],
        correct: 2,
        explanation:
          "The partition process is the core of Quick Sort. After partitioning, the pivot is in its final sorted position.",
      },
      {
        id: 4,
        diff: "medium",
        text: "What are common strategies for picking a pivot in Quick Sort?",
        options: [
          "Pick the first element",
          "Pick the last element",
          "Pick a random element",
          "All of the above",
        ],
        correct: 3,
        explanation:
          "Quick Sort can be implemented using various pivot strategies, including picking the first, last, middle, or a random element.",
      },
      {
        id: 5,
        diff: "hard",
        text: "In a standard partition, elements smaller than the pivot are moved to which side?",
        options: [
          "Right",
          "Left",
          "They stay where they are",
          "They are moved to a new array",
        ],
        correct: 1,
        explanation:
          "The goal of partitioning is to ensure all elements less than the pivot are moved to the left of it.",
      },
      {
        id: 6,
        diff: "medium",
        text: "What is the Best and Average Case time complexity of Quick Sort?",
        options: ["O(N)", "O(N²)", "O(N log N)", "O(log N)"],
        correct: 2,
        explanation:
          "In the best and average cases, the array is divided relatively evenly, leading to O(N log N) performance.",
      },
      {
        id: 7,
        diff: "hard",
        text: "What is the Worst Case time complexity of Quick Sort?",
        options: ["O(N log N)", "O(N)", "O(N²)", "O(1)"],
        correct: 2,
        explanation:
          "The worst case occurs when the pivot consistently results in highly unbalanced partitions (e.g., picking the smallest or largest element in a sorted array), leading to O(N²).",
      },
      {
        id: 8,
        diff: "medium",
        text: 'Quick Sort is generally an "In-place" sorting algorithm. What does this mean?',
        options: [
          "It requires O(N) extra space",
          "It sorts elements within the original array with O(1) or O(log N) extra space",
          "It cannot be used on large datasets",
          "It replaces the original array with a new one",
        ],
        correct: 1,
        explanation:
          "In-place algorithms sort the data structure using a small, constant amount of extra storage space, rather than creating a whole new array.",
      },
      {
        id: 9,
        diff: "easy",
        text: "Is Quick Sort usually stable?",
        options: ["Yes", "No"],
        correct: 1,
        explanation:
          "Standard Quick Sort is not stable because elements with equal values may be swapped across the pivot, changing their relative order.",
      },
      {
        id: 10,
        diff: "hard",
        text: "Which step happens after the partition in the Quick Sort recursion?",
        options: [
          "The array is merged",
          "The left and right sub-arrays are sorted recursively",
          "The pivot is discarded",
          "The algorithm stops",
        ],
        correct: 1,
        explanation:
          "Once the pivot is in the correct place, the algorithm recursively applies the same logic to the sub-array of smaller elements and the sub-array of larger elements.",
      },
    ],
  },
  "quicksort-l2": {
    topicName: "Quick Sort",
    level: "Level 2",
    subtitle:
      "Master partitioning schemes, pivot selection strategies, and advanced complexity analysis.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "quicksort_l3_unlocked",
    nextPage: "quicksort_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "quicksort_L1.html" },
      { text: "Level 2 — Intermediate", link: "quicksort_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: "Which partitioning scheme typically uses the last element as the pivot and uses a single index (i) to keep track of the boundary for elements smaller than the pivot?",
        options: [
          "Hoare Partition Scheme",
          "Lomuto Partition Scheme",
          "Median-of-Three Scheme",
          "Dutch National Flag Scheme",
        ],
        correct: 1,
        explanation:
          'Lomuto partitioning is the most common introductory scheme. It works by maintaining an index `i` that marks the end of the "smaller elements" section and iterates through the array with a second pointer.',
      },
      {
        id: 2,
        diff: "hard",
        text: "In Lomuto partitioning, after the loop finishes, what is the final step to put the pivot in its correct sorted position?",
        options: [
          "Swap the pivot with the first element",
          "Swap the pivot with the element at index i + 1",
          "Discard the pivot",
          "The pivot is already in the correct place",
        ],
        correct: 1,
        explanation:
          "In Lomuto's scheme, the index `i` tracks the last element smaller than the pivot. Therefore, the pivot belongs at index `i + 1`, and a final swap is performed to place it there.",
      },
      {
        id: 3,
        diff: "medium",
        text: 'Why is picking the "Middle" or a "Random" element as a pivot often better than picking the "First" or "Last" element?',
        options: [
          "It makes the code shorter",
          "It avoids the O(N²) worst-case scenario on already sorted or nearly sorted arrays",
          "It uses less memory",
          "It makes the algorithm stable",
        ],
        correct: 1,
        explanation:
          "Picking the first or last element as a pivot leads to O(N²) complexity if the input is already sorted. Randomized or middle-element pivots help ensure more balanced partitions.",
      },
      {
        id: 4,
        diff: "hard",
        text: 'What is the "Hoare Partition Scheme" known for compared to Lomuto?',
        options: [
          "It is much slower",
          "It uses two pointers moving from both ends towards each other and is generally more efficient",
          "It is a stable sorting method",
          "It requires O(N) auxiliary space",
        ],
        correct: 1,
        explanation:
          "Hoare partitioning uses two pointers (`i` and `j`) that start at the ends and move toward each other. It typically performs fewer swaps than Lomuto and is more efficient in practice.",
      },
      {
        id: 5,
        diff: "medium",
        text: "In the Lomuto partition algorithm, what does the index `i` represent during the execution of the loop?",
        options: [
          "The current element being compared",
          "The pivot itself",
          "The boundary of elements known to be less than or equal to the pivot",
          "The end of the array",
        ],
        correct: 2,
        explanation:
          "The index `i` (often initialized to `low - 1`) acts as a wall. Everything at or before `i` has been verified to be smaller than or equal to the pivot.",
      },
      {
        id: 6,
        diff: "hard",
        text: "What is the space complexity of Quick Sort due to recursive calls?",
        options: ["O(1)", "O(log N) on average", "O(N)", "O(N log N)"],
        correct: 1,
        explanation:
          'While Quick Sort is "in-place" regarding the array data, the recursion stack takes space. In the average case (balanced tree), this depth is O(log N).',
      },
      {
        id: 7,
        diff: "medium",
        text: 'In the visualizer, which color is used to represent the "Pivot" element during the partitioning phase?',
        options: ["Cyan", "Green", "Orange", "Pink"],
        correct: 2,
        explanation:
          "The Level 2 visualizer uses an Orange color (`--primary-orange`) to highlight the pivot, identifying it as the reference element.",
      },
      {
        id: 8,
        diff: "hard",
        text: 'Which condition defines the "Base Case" for the recursive Quick Sort function?',
        options: [
          "When the pivot is the largest element",
          "When the low index is greater than or equal to the high index (low >= high)",
          "When the array has 10 elements",
          "When the partition index is 0",
        ],
        correct: 1,
        explanation:
          "Recursion stops when a sub-array has zero or one element, which occurs when the `low` pointer meets or exceeds the `high` pointer.",
      },
      {
        id: 9,
        diff: "medium",
        text: 'Quick Sort is often called "Partition-Exchange Sort". Why?',
        options: [
          "Because it exchanges elements between two different arrays",
          "Because it sorts by partitioning the array and exchanging elements around a pivot",
          "Because it exchanges the pivot for a median value",
          "None of the above",
        ],
        correct: 1,
        explanation:
          "The name refers to the core mechanic: partitioning the data into two sets and exchanging (swapping) elements so they end up on the correct side of the pivot.",
      },
      {
        id: 10,
        diff: "hard",
        text: "If a partitioning step results in one sub-array of size 0 and another of size N-1, what is the resulting time complexity if this happens at every level?",
        options: ["O(N log N)", "O(N²)", "O(N)", "O(log N)"],
        correct: 1,
        explanation:
          "This describes the worst-case scenario. If partitioning is completely unbalanced at every level, the algorithm performs N + (N-1) + ... + 1 operations, resulting in O(N²).",
      },
    ],
  },

  "insertionsort-l1": {
    topicName: "Insertion Sort",
    level: "Level 1",
    subtitle:
      'Master the shifting logic, the "key" element concept, and sorted sub-array expansion.',
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "insertionsort_l2_unlocked",
    nextPage: "insertionsort_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "sorting_basics.html" },
      { text: "Level 1 — Basics", link: "insertion_sort_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "Which real-world analogy is most commonly used to describe Insertion Sort?",
        options: [
          "Organizing a bookshelf by height",
          "Sorting a hand of playing cards",
          "Bubbles rising in a soda",
          "Picking the smallest apple from a basket",
        ],
        correct: 1,
        explanation:
          'Insertion Sort works like sorting cards in your hand; you take one card at a time and "insert" it into its correct position among the already sorted cards.',
      },
      {
        id: 2,
        diff: "easy",
        text: 'In Insertion Sort, what is the "Key" element?',
        options: [
          "The largest element in the array",
          "The element currently being picked to be placed in its correct position",
          "The first element of the array which never moves",
          "A temporary variable used only for swapping",
        ],
        correct: 1,
        explanation:
          'The "Key" is the element chosen from the unsorted part during each iteration to be compared and inserted into the sorted sub-array.',
      },
      {
        id: 3,
        diff: "medium",
        text: 'How does the algorithm handle elements in the sorted portion that are larger than the "Key"?',
        options: [
          "It swaps them immediately",
          "It shifts them one position to the right to make space",
          "It deletes them",
          "It moves them to a new array",
        ],
        correct: 1,
        explanation:
          "To make room for the Key, elements in the sorted sub-array that are greater than the Key are shifted one position to the right.",
      },
      {
        id: 4,
        diff: "medium",
        text: "At any point during the execution, the array is logically divided into which two parts?",
        options: [
          "Positive and Negative sections",
          "A sorted sub-array on the left and an unsorted sub-array on the right",
          "Even and Odd numbers",
          "A prefix and a suffix of equal length",
        ],
        correct: 1,
        explanation:
          "Insertion Sort gradually grows a sorted sub-array at the beginning of the array, while the rest remains unsorted.",
      },
      {
        id: 5,
        diff: "easy",
        text: 'What is the "Best Case" time complexity of Insertion Sort (e.g., the array is already sorted)?',
        options: ["O(N²)", "O(N log N)", "O(N)", "O(1)"],
        correct: 2,
        explanation:
          "Insertion Sort is adaptive. If the array is already sorted, the inner loop never runs, resulting in a linear time complexity of O(N).",
      },
      {
        id: 6,
        diff: "medium",
        text: "What is the Worst Case time complexity of Insertion Sort?",
        options: ["O(N)", "O(N²)", "O(log N)", "O(N log N)"],
        correct: 1,
        explanation:
          "The worst case occurs when the array is sorted in reverse order, requiring the maximum number of shifts for every element, resulting in O(N²).",
      },
      {
        id: 7,
        diff: "easy",
        text: "How much extra memory (Space Complexity) does Insertion Sort require?",
        options: ["O(1) - Constant Space", "O(N)", "O(log N)", "O(N²)"],
        correct: 0,
        explanation:
          "Insertion Sort is an in-place algorithm, meaning it only requires a fixed amount of extra space (for the Key and indices) regardless of the input size.",
      },
      {
        id: 8,
        diff: "hard",
        text: 'If the array is [5, 2, 9, 1], what is the state of the array after the Key "2" is processed?',
        options: [
          "[5, 2, 9, 1]",
          "[2, 5, 9, 1]",
          "[2, 9, 5, 1]",
          "[1, 2, 5, 9]",
        ],
        correct: 1,
        explanation:
          "The Key is 2. Since 5 > 2, 5 shifts right and 2 is inserted at the beginning. The array becomes [2, 5, 9, 1].",
      },
      {
        id: 9,
        diff: "medium",
        text: 'Insertion Sort is considered a "Stable" sorting algorithm. What does this mean?',
        options: [
          "It never crashes",
          "It maintains the relative order of elements with equal values",
          "It always takes the same amount of time",
          "It uses O(N) space",
        ],
        correct: 1,
        explanation:
          "Stability means if two elements have the same value, they appear in the same relative order in the sorted output as they did in the input.",
      },
      {
        id: 10,
        diff: "hard",
        text: "Why does the outer loop of Insertion Sort typically start at index 1 instead of index 0?",
        options: [
          "Index 0 is always empty",
          "A single element (at index 0) is already considered sorted",
          "The algorithm doesn't work on the first element",
          "To avoid an infinite loop",
        ],
        correct: 1,
        explanation:
          "By default, an array with one element is sorted. We start with the second element (index 1) to compare it against the first.",
      },
    ],
  },
  "insertionsort-l2": {
    topicName: "Insertion Sort",
    level: "Level 2",
    subtitle:
      "Master the shifting mechanics, while-loop boundary conditions, and adaptive performance traits.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "insertionsort_l3_unlocked",
    nextPage: "insertionsort_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Sorting", link: "insertionSort_L1.html" },
      { text: "Level 2 — Intermediate", link: "insertion_sort_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "medium",
        text: "In the code `while (j >= 0 && arr[j] > key)`, what is the critical purpose of the `j >= 0` condition?",
        options: [
          "To ensure the key is positive",
          "To prevent an IndexOutOfBounds error when the key is the smallest element",
          "To make the loop run faster",
          "To count the number of shifts",
        ],
        correct: 1,
        explanation:
          "If the key is smaller than all elements in the sorted portion, `j` will eventually become -1. The `j >= 0` check prevents the code from trying to access a negative array index.",
      },
      {
        id: 2,
        diff: "hard",
        text: 'Why is Insertion Sort considered "Adaptive"?',
        options: [
          "It can sort both strings and numbers",
          "Its performance improves significantly when the input array is already partially sorted",
          "It changes its strategy based on the size of the array",
          "It automatically switches to Quick Sort for large data",
        ],
        correct: 1,
        explanation:
          "An algorithm is adaptive if it takes advantage of existing order in the input. In Insertion Sort, the inner loop finishes early if it finds the correct spot, leading to $O(N)$ time for nearly sorted data.",
      },
      {
        id: 3,
        diff: "medium",
        text: "During the shifting phase, what happens to the element at `arr[j+1]` in the statement `arr[j+1] = arr[j]`?",
        options: [
          "It is deleted",
          "It is overwritten by the larger element to its left, effectively shifting that larger element right",
          "It is swapped with the key",
          "It is moved to a temporary array",
        ],
        correct: 1,
        explanation:
          'This line is the "shift" mechanic. It copies the value from index `j` into `j+1`. This creates the "gap" where the key will eventually be placed.',
      },
      {
        id: 4,
        diff: "hard",
        text: "What is the exact final step of one outer-loop iteration after the inner while-loop ends?",
        options: [
          "arr[j] = key",
          "arr[j + 1] = key",
          "arr[key] = j",
          "return arr",
        ],
        correct: 1,
        explanation:
          "Since the while-loop decrements `j` one extra time after the condition fails, the correct insertion spot for the key is actually at `j + 1`.",
      },
      {
        id: 5,
        diff: "medium",
        text: "Which of the following describes the Space Complexity of the Level 2 implementation?",
        options: [
          "O(N) due to the use of a key variable",
          "O(1) because it sorts in-place with a constant amount of extra variables",
          "O(log N) due to recursive calls",
          "O(N²) because of the nested loops",
        ],
        correct: 1,
        explanation:
          "Insertion Sort sorts the original array directly. The extra space used (for the key, i, and j) does not grow with the size of the input array.",
      },
      {
        id: 6,
        diff: "hard",
        text: "In a reverse-sorted array of size N, how many total comparisons/shifts are performed?",
        options: ["N", "log N", "N(N-1)/2", "N²"],
        correct: 2,
        explanation:
          "In the worst case (reverse order), the 1st element is compared 0 times, the 2nd is compared 1 time, the 3rd 2 times, and so on. The sum of $0+1+2...+(N-1)$ equals $N(N-1)/2$.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'In the visualizer, what does the "Pink/Purple" highlight usually represent during the process?',
        options: [
          "The sorted portion boundary",
          'The current "Key" element being moved',
          "The smallest element found so far",
          "An element that is in its final position",
        ],
        correct: 1,
        explanation:
          'The Level 2 visualizer uses a distinct color (like `--primary-purple`) to track the "Key" as it "floats" to its correct position in the sorted sub-array.',
      },
      {
        id: 8,
        diff: "hard",
        text: "Compared to Selection Sort, why is Insertion Sort often faster for small datasets?",
        options: [
          "It uses less memory",
          "It performs fewer comparisons on average because it stops the inner loop as soon as the correct spot is found",
          "It uses a pivot",
          "It doesn't use a loop",
        ],
        correct: 1,
        explanation:
          "Selection Sort always scans the entire unsorted portion ($O(N^2)$ comparisons always), whereas Insertion Sort stops the inner loop early once it finds where the key belongs.",
      },
      {
        id: 9,
        diff: "medium",
        text: "Is the implementation of Insertion Sort provided in the content Stable? Why?",
        options: [
          "No, because it shifts elements",
          "Yes, because the condition `arr[j] > key` prevents equal elements from jumping over each other",
          "No, because it is an O(N²) algorithm",
          "Yes, because it uses a while loop",
        ],
        correct: 1,
        explanation:
          "Because we only shift if `arr[j]` is strictly GREATER than the key, two elements with the same value will maintain their original relative order.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'Which step in the algorithm directly demonstrates the "Conquer" part of this incremental approach?',
        options: [
          "The outer loop incrementing `i`",
          "The final assignment `arr[j + 1] = key`",
          "Picking the first element",
          "Calculating the array length",
        ],
        correct: 1,
        explanation:
          'The assignment of the key into its sorted position "conquers" that specific sub-problem, extending the sorted portion of the array by one element.',
      },
    ],
  },

  "tree-l1": {
    topicName: "Tree",
    level: "Level 1",
    subtitle:
      "Master hierarchical terminologies, tree properties, and binary tree classifications.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "tree_l2_unlocked",
    nextPage: "tree_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "tree_L1.html" },
      { text: "Level 1 — Basics", link: "tree_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What is the primary characteristic of a Tree data structure?",
        options: [
          "Elements are stored in a linear, sequential order",
          "It is a hierarchical structure with parent-child relationships",
          "Elements are stored in a first-in, last-out manner",
          "It uses a grid-based system for 2D data storage",
        ],
        correct: 1,
        explanation:
          "A tree is a non-linear, hierarchical data structure where nodes are organized in levels, representing parent-child relationships.",
      },
      {
        id: 2,
        diff: "easy",
        text: "What is the topmost node in a tree called?",
        options: ["Root Node", "Leaf Node", "Internal Node", "Ancestor"],
        correct: 0,
        explanation:
          "The root node is the very first node of a tree from which all other nodes originate. It has no parent.",
      },
      {
        id: 3,
        diff: "easy",
        text: "If a tree has N nodes, how many edges does it contain?",
        options: ["N + 1", "log(N)", "N - 1", "N / 2"],
        correct: 2,
        explanation:
          "In any tree, the number of edges is always exactly one less than the number of nodes (N-1), as every node except the root has exactly one incoming edge.",
      },
      {
        id: 4,
        diff: "easy",
        text: "A node with no children is referred to as a:",
        options: ["Root Node", "Internal Node", "Parent Node", "Leaf Node"],
        correct: 3,
        explanation:
          "Leaf nodes (also called external nodes) are nodes that reside at the end of the branches and have a degree of 0.",
      },
      {
        id: 5,
        diff: "medium",
        text: "What defines a Binary Tree?",
        options: [
          "A tree where every node must have exactly two children",
          "A tree where each node can have at most two children",
          "A tree with exactly two levels of hierarchy",
          "A tree where only the root has children",
        ],
        correct: 1,
        explanation:
          "A Binary Tree is a specific type of tree where each node can have 0, 1, or 2 children (labeled as left and right).",
      },
      {
        id: 6,
        diff: "medium",
        text: 'Which statement about the "Depth" of a node is true?',
        options: [
          "It is the total number of nodes in the tree",
          "It is the length of the path from the node to the deepest leaf",
          "It is the number of edges from the root to that specific node",
          "It is always equal to the height of the root",
        ],
        correct: 2,
        explanation:
          "Depth refers to how far a node is from the root. The root node itself has a depth of 0.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'In a "Complete Binary Tree", how are the nodes filled?',
        options: [
          "Every node must have exactly two children at every level",
          "All levels are fully filled except possibly the last, which is filled from left to right",
          "Only the leaf nodes are filled with data",
          "Nodes are added randomly to keep the height balanced",
        ],
        correct: 1,
        explanation:
          "A Complete Binary Tree ensures that every level is full before moving to the next, and the last level is filled starting from the leftmost position.",
      },
      {
        id: 8,
        diff: "medium",
        text: 'What is a "Sibling" in tree terminology?',
        options: [
          "Nodes that share the same parent",
          "Nodes that are on the same level but have different parents",
          "The relationship between a root and a leaf",
          "Any node that is a descendant of the root",
        ],
        correct: 0,
        explanation:
          "Siblings are nodes that belong to the same immediate parent node.",
      },
      {
        id: 9,
        diff: "hard",
        text: 'What is the height of a "Skewed Binary Tree" with N nodes?',
        options: ["O(log N)", "O(1)", "O(N / 2)", "O(N - 1)"],
        correct: 3,
        explanation:
          "In a skewed tree (where nodes form a single linear chain), the height is maximized at N-1, making operations as slow as a Linked List: O(N).",
      },
      {
        id: 10,
        diff: "hard",
        text: "What is the average time complexity for Search, Insert, and Delete operations in a balanced Binary Search Tree?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correct: 2,
        explanation:
          "For balanced trees, each comparison eliminates half of the remaining subtrees, leading to logarithmic time complexity: O(log n).",
      },
    ],
  },
  "tree-l2": {
    topicName: "Tree",
    level: "Level 2",
    subtitle:
      "Evaluate your understanding of BST operations, tree traversals, and complexity scenarios.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "tree_l3_unlocked",
    nextPage: "tree_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "tree_L1.html" },
      { text: "Level 2 — Interactive", link: "tree_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "In a Binary Search Tree (BST) search operation, if the target value is smaller than the current node, in which direction does the visualizer move?",
        options: [
          "It moves to the right child",
          "It moves to the left child",
          "It backtracks to the parent",
          "It checks the sibling node",
        ],
        correct: 1,
        explanation:
          "According to BST properties, smaller values are always located in the left subtree, so the search path moves left.",
      },
      {
        id: 2,
        diff: "easy",
        text: "Which traversal method visits the root node first, followed by the left and then the right subtree?",
        options: [
          "Inorder Traversal",
          "Postorder Traversal",
          "Preorder Traversal",
          "Level-order Traversal",
        ],
        correct: 2,
        explanation:
          "Preorder traversal follows the sequence: Root → Left → Right.",
      },
      {
        id: 3,
        diff: "easy",
        text: 'What is the "Best Case" time complexity for searching a value in a BST?',
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correct: 2,
        explanation:
          "The best case occurs when the target value is at the root of the tree, allowing it to be found in a single comparison: O(1).",
      },
      {
        id: 4,
        diff: "medium",
        text: 'When using the "Inorder Traversal" on a valid Binary Search Tree, what is the resulting order of the visited values?',
        options: [
          "The values appear in random order",
          "The values appear in descending order",
          "The values appear in strictly ascending (sorted) order",
          "The values appear in level-by-level order",
        ],
        correct: 2,
        explanation:
          "A key property of BSTs is that an Inorder traversal (Left-Root-Right) always visits nodes in non-decreasing/sorted order.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'In the Level 2 visualizer, how does the "Binary Tree" type (not BST) handle node insertions?',
        options: [
          "It inserts based on value comparison (Greater/Smaller)",
          "It uses level-order insertion to maintain a complete binary tree",
          "It only allows insertion at the leaf positions",
          "It requires a parent node to be manually selected",
        ],
        correct: 1,
        explanation:
          "Standard Binary Trees in this visualizer use level-order insertion, filling the tree from top to bottom and left to right.",
      },
      {
        id: 6,
        diff: "medium",
        text: "How does an N-ary tree differ from a Binary Tree?",
        options: [
          "It must have exactly three children per node",
          "Nodes can have any number of children (not restricted to two)",
          "It cannot have cycles",
          "It is always a balanced structure",
        ],
        correct: 1,
        explanation:
          "An N-ary (or Generic) tree allows each node to have an arbitrary number of children, whereas a Binary Tree is limited to a maximum of two.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'What happens to the time complexity of a BST if it becomes a "Skewed Tree"?',
        options: [
          "It improves to O(1)",
          "It remains O(log n)",
          "It degrades to O(n)",
          "It becomes O(n²)",
        ],
        correct: 2,
        explanation:
          "When a BST is skewed (all nodes have only one child), it effectively becomes a Linked List, forcing search operations to check every node: O(n).",
      },
      {
        id: 8,
        diff: "hard",
        text: "During a BST Deletion, if a node has two children, it is typically replaced by:",
        options: [
          "Its immediate left child",
          "The root of the tree",
          "Its inorder successor (minimum value in the right subtree)",
          "A null pointer",
        ],
        correct: 2,
        explanation:
          "To maintain the BST property after deleting a node with two children, we replace it with its inorder successor (the smallest value in its right subtree).",
      },
      {
        id: 9,
        diff: "hard",
        text: "Why does a balanced BST provide O(log n) search time?",
        options: [
          "Because it uses an array-based indexing system",
          "Because each comparison eliminates half of the remaining search space",
          "Because it uses a hashing function to find node positions",
          "Because the height of a balanced tree is always constant",
        ],
        correct: 1,
        explanation:
          "In a balanced tree, the height is approximately log₂(n). Each comparison moves the search down one level, halving the possible locations left to check.",
      },
      {
        id: 10,
        diff: "hard",
        text: "If you insert the values [10, 20, 30, 40, 50] in that specific order into an empty BST, what will be the height of the resulting tree?",
        options: ["3", "5", "4", "log(5)"],
        correct: 2,
        explanation:
          "Since the values are inserted in strictly increasing order, each new node becomes the right child of the previous one, creating a skewed tree with 4 edges from root to leaf (height = N-1 = 4).",
      },
    ],
  },

  "graphs-l1": {
    topicName: "Graph",
    level: "Level 1",
    subtitle:
      "Master the fundamentals of vertices, edges, adjacency representations, and graph classifications.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "graphs_l2_unlocked",
    nextPage: "graphs_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "graph_level1.html" },
      { text: "Level 1 — Basics", link: "graph_level1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What are the two primary components that define a Graph G(V, E)?",
        options: [
          "Variables and Equations",
          "Vertices (Nodes) and Edges (Links)",
          "Values and Elements",
          "Vectors and Entities",
        ],
        correct: 1,
        explanation:
          "A graph is formally defined as a set of Vertices (V) representing entities and Edges (E) representing the connections between them.",
      },
      {
        id: 2,
        diff: "easy",
        text: 'Which data structure is most space-efficient for representing a "Sparse Graph" (one with few edges)?',
        options: ["Adjacency Matrix", "Adjacency List", "2D Array", "Stack"],
        correct: 1,
        explanation:
          "An Adjacency List only stores existing edges O(V+E), whereas an Adjacency Matrix always uses O(V²) space regardless of the number of edges.",
      },
      {
        id: 3,
        diff: "easy",
        text: "In a Directed Graph (Digraph), what does an edge (u, v) signify?",
        options: [
          "A bidirectional connection between u and v",
          "A connection that exists only if v also points to u",
          "A one-way connection from source u to destination v",
          "That u and v are the same node",
        ],
        correct: 2,
        explanation:
          "In a directed graph, edges have orientation. The edge (u, v) means you can travel from u to v, but not necessarily from v to u.",
      },
      {
        id: 4,
        diff: "medium",
        text: "According to the Handshaking Lemma, the sum of the degrees of all vertices in an undirected graph is equal to:",
        options: [
          "The number of edges (E)",
          "Twice the number of edges (2E)",
          "The number of vertices squared (V²)",
          "The number of vertices minus one (V-1)",
        ],
        correct: 1,
        explanation:
          "Since every edge in an undirected graph contributes exactly 1 to the degree of two different vertices, the total sum of degrees is 2E.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'What is the time complexity to check if an edge exists between vertex "u" and "v" using an Adjacency Matrix?',
        options: ["O(1)", "O(V)", "O(E)", "O(log V)"],
        correct: 0,
        explanation:
          "In an Adjacency Matrix, you can check for an edge by simply accessing mat[u][v], which is a constant time operation: O(1).",
      },
      {
        id: 6,
        diff: "medium",
        text: 'What is a "DAG" in graph theory?',
        options: [
          "A graph with only one vertex",
          "A directed graph that contains at least one cycle",
          "A directed graph with no cycles",
          "A graph where every node is connected to every other node",
        ],
        correct: 2,
        explanation:
          "DAG stands for Directed Acyclic Graph. It is a directed graph that has no cycles, which is a requirement for algorithms like Topological Sort.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'A "Simple Path" is defined as a path where:',
        options: [
          "The start and end vertices are the same",
          "No vertex is repeated",
          "Every edge is visited exactly twice",
          "Only leaf nodes are visited",
        ],
        correct: 1,
        explanation:
          "A path is called simple if all its vertices are distinct (no vertex is visited more than once).",
      },
      {
        id: 8,
        diff: "hard",
        text: "In a directed graph, the number of edges pointing into a vertex is called its:",
        options: ["Out-degree", "Total degree", "In-degree", "Incident-degree"],
        correct: 2,
        explanation:
          "In-degree is the count of edges coming into a node, while out-degree is the count of edges leaving the node.",
      },
      {
        id: 9,
        diff: "hard",
        text: 'If a graph is "Complete" and has V vertices, what is the total number of edges?',
        options: ["V²", "V(V + 1) / 2", "V(V - 1) / 2", "2V - 1"],
        correct: 2,
        explanation:
          "In a complete graph, every node is connected to every other node. For V nodes, this results in V*(V-1)/2 unique edges.",
      },
      {
        id: 10,
        diff: "hard",
        text: "Which of the following properties is TRUE for any Tree (as a special type of graph)?",
        options: [
          "It must contain at least one cycle",
          "It is a disconnected graph",
          "It is a connected acyclic undirected graph",
          "The number of edges is always equal to the number of vertices",
        ],
        correct: 2,
        explanation:
          "A Tree is defined as a connected graph that contains no cycles. If it has V vertices, it must have exactly V-1 edges.",
      },
    ],
  },

  "graphs-l2": {
    topicName: "Graph",
    level: "Level 2",
    subtitle:
      "Deep dive into traversal algorithms, connectivity logic, and shortest path strategies.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "graph_l3_unlocked",
    nextPage: "graph_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "graph_level1.html" },
      { text: "Level 2 — Interactive", link: "graph_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "Which data structure is primarily used to implement Breadth-First Search (BFS)?",
        options: ["Stack", "Queue", "Priority Queue", "Linked List"],
        correct: 1,
        explanation:
          "BFS explores a graph level-by-level, meaning it processes nodes in the order they were discovered (FIFO). A Queue is the natural fit for this logic.",
      },
      {
        id: 2,
        diff: "easy",
        text: "In Depth-First Search (DFS), what happens when a node has no unvisited neighbors?",
        options: [
          "The algorithm terminates",
          "It restarts from the root",
          "It performs backtracking to the previous node",
          "It adds the node to the Queue again",
        ],
        correct: 2,
        explanation:
          'DFS goes as deep as possible. When it hits a "dead end," it backtracks through the recursion stack to find the next available branch.',
      },
      {
        id: 3,
        diff: "easy",
        text: "Which algorithm is most efficient for finding the shortest path in an unweighted graph?",
        options: ["DFS", "Dijkstra's Algorithm", "BFS", "Topological Sort"],
        correct: 2,
        explanation:
          "Since BFS explores all nodes at distance 1, then distance 2, etc., the first time it reaches a target, it is guaranteed to be the shortest path in an unweighted graph.",
      },
      {
        id: 4,
        diff: "medium",
        text: "What is the primary requirement for performing a Topological Sort on a graph?",
        options: [
          "The graph must be undirected",
          "The graph must be a Directed Acyclic Graph (DAG)",
          "The graph must be fully connected",
          "The graph must have weighted edges",
        ],
        correct: 1,
        explanation:
          "Topological sort requires a linear ordering without cycles. If a graph has a cycle (Directed Cyclic Graph), no valid topological order exists.",
      },
      {
        id: 5,
        diff: "medium",
        text: "How do we detect a cycle in a directed graph using DFS?",
        options: [
          "By checking if a node is visited twice",
          "By finding a node that is currently in the recursion stack",
          "By checking if the Queue becomes empty",
          "Directed graphs cannot have cycles",
        ],
        correct: 1,
        explanation:
          'In a directed graph, a cycle is detected if we encounter a node that is already part of the current recursion path (a "back-edge").',
      },
      {
        id: 6,
        diff: "medium",
        text: 'In the "Connected Components" operation, why might we need to call BFS or DFS multiple times?',
        options: [
          "To verify the edge weights",
          "To handle disconnected sub-graphs that aren't reachable from the first node",
          "To improve the time complexity to O(log V)",
          "To clear the visited array",
        ],
        correct: 1,
        explanation:
          "BFS/DFS from a single source only reaches nodes in its own component. We must loop through all vertices to find every isolated group.",
      },
      {
        id: 7,
        diff: "medium",
        text: "Which of the following represents the time complexity of BFS using an Adjacency List?",
        options: ["O(V²)", "O(V + E)", "O(E log V)", "O(V!)"],
        correct: 1,
        explanation:
          "BFS visits each vertex once and checks each edge once, leading to a linear time complexity of O(V + E).",
      },
      {
        id: 8,
        diff: "hard",
        text: "Why does Dijkstra's Algorithm use a Priority Queue instead of a standard Queue?",
        options: [
          "To handle negative weights",
          "To always process the node with the current minimum distance first",
          "To prevent cycles from occurring",
          "To reduce space complexity to O(1)",
        ],
        correct: 1,
        explanation:
          "Dijkstra's is a greedy algorithm. Using a Priority Queue allows us to efficiently extract the node with the smallest cumulative distance.",
      },
      {
        id: 9,
        diff: "hard",
        text: 'In the "Worst Case" DFS scenario (a linear chain), what is the maximum depth of the recursion stack?',
        options: ["O(1)", "O(log V)", "O(V)", "O(V + E)"],
        correct: 2,
        explanation:
          "In a linear chain (0-1-2-3...), DFS will keep calling itself until it hits the end, resulting in a stack depth equal to the number of vertices (V).",
      },
      {
        id: 10,
        diff: "hard",
        text: "Which graph representation is generally better for an algorithm that needs to frequently find all neighbors of a vertex?",
        options: [
          "Adjacency Matrix",
          "Adjacency List",
          "Edge List",
          "Binary Search Tree",
        ],
        correct: 1,
        explanation:
          "An Adjacency List directly stores neighbors. To find neighbors in a Matrix, you must scan an entire row of length V, even if the node has only one neighbor.",
      },
    ],
  },

  "hashing-l1": {
    topicName: "Hashing",
    level: "Level 1",
    subtitle:
      "Master hash functions, table mechanics, and collision resolution strategies like chaining and probing.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "hashing_l2_unlocked",
    nextPage: "hashing_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "hashing_L1.html" },
      { text: "Level 1 — Basics", link: "hashing_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: 'What is the primary purpose of a "Hash Function"?',
        options: [
          "To sort a list of elements in ascending order",
          "To map a large variable-sized key to a small fixed-sized index",
          "To compress data to save disk space",
          "To create a parent-child relationship between nodes",
        ],
        correct: 1,
        explanation:
          "A hash function takes a key as input and mathematically transforms it into an integer index that fits within the bounds of the hash table array.",
      },
      {
        id: 2,
        diff: "easy",
        text: "What is the average time complexity for searching an element in a well-distributed hash table?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correct: 2,
        explanation:
          "In the average case, a hash table provides constant time O(1) access because the index is computed directly from the key.",
      },
      {
        id: 3,
        diff: "easy",
        text: "What happens when two different keys produce the same hash index?",
        options: [
          "The table automatically deletes the older key",
          "The program crashes with a memory error",
          "A collision occurs",
          "The second key is ignored and not stored",
        ],
        correct: 2,
        explanation:
          "A collision happens when a hash function maps multiple keys to the same index. This is a fundamental challenge in hashing handled by resolution techniques.",
      },
      {
        id: 4,
        diff: "medium",
        text: "Which collision resolution technique uses a linked list at each bucket to store multiple keys?",
        options: [
          "Linear Probing",
          "Double Hashing",
          "Separate Chaining",
          "Quadratic Probing",
        ],
        correct: 2,
        explanation:
          "In Separate Chaining, each slot (bucket) of the hash table points to a linked list containing all key-value pairs that hash to that same index.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'How is the "Load Factor" of a hash table calculated?',
        options: [
          "Number of edges / Number of nodes",
          "Table Capacity / Number of stored elements",
          "Number of stored elements (n) / Table Capacity (m)",
          "Number of collisions / Total elements",
        ],
        correct: 2,
        explanation:
          'Load Factor (α = n/m) represents how "full" the table is. A high load factor typically triggers a resize (rehashing) to maintain O(1) performance.',
      },
      {
        id: 6,
        diff: "medium",
        text: 'In "Linear Probing", if index h(k) is already occupied, where is the key stored?',
        options: [
          "In a separate overflow table",
          "In the next available empty slot (index + 1, index + 2...)",
          "At the root of the hash tree",
          "The key is discarded",
        ],
        correct: 1,
        explanation:
          'Linear Probing is an Open Addressing technique where the algorithm "probes" or searches sequentially for the next empty slot in the array.',
      },
      {
        id: 7,
        diff: "medium",
        text: "What is the main difference between a Hash Set and a Hash Map?",
        options: [
          "Hash Set is faster than Hash Map",
          "Hash Set stores only unique keys, while Hash Map stores key-value pairs",
          "Hash Map allows duplicate keys, Hash Set does not",
          "Hash Set uses a matrix, Hash Map uses a list",
        ],
        correct: 1,
        explanation:
          "A Hash Set is a collection of unique keys used for membership testing, whereas a Hash Map maps those unique keys to specific values (like a dictionary).",
      },
      {
        id: 8,
        diff: "hard",
        text: 'What is the "Worst Case" time complexity for a Search operation in a hash table where all keys have collided into a single bucket?',
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation:
          "If every key hashes to the same index (extreme collision), the table becomes a single linked list of length N, forcing a linear scan: O(N).",
      },
      {
        id: 9,
        diff: "hard",
        text: "In which scenario is a Hash Table NOT a suitable choice?",
        options: [
          "Counting the frequency of words in a book",
          "Implementing a phone contact search by name",
          "Finding the smallest element in a range [L, R]",
          "Checking if a username is already taken",
        ],
        correct: 2,
        explanation:
          "Hash tables are unordered. Finding the minimum element or performing range queries is inefficient (O(N)); a Binary Search Tree is better for these tasks.",
      },
      {
        id: 10,
        diff: "hard",
        text: "Why is it generally recommended to use a prime number for the Hash Table size?",
        options: [
          "To make the hashing process faster",
          "To ensure the load factor stays below 1.0",
          "To minimize clustering and distribute keys more uniformly",
          "Because computer memory is structured in prime blocks",
        ],
        correct: 2,
        explanation:
          "Using a prime number as the table size (m) reduces the likelihood that keys sharing common factors will result in collisions, leading to a better distribution.",
      },
    ],
  },

  "hashing-l2": {
    topicName: "Hashing",
    level: "Level 2",
    subtitle:
      "Evaluate your ability to trace collisions, manage chaining, and analyze performance across different scenarios.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "hashing_l3_unlocked",
    nextPage: "hashing_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "hashing_L1.html" },
      { text: "Level 2 — Interactive", link: "hashing_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: 'If you are using the visualizer with a table size of 7, which bucket will the key "15" be placed in?',
        options: ["Bucket 0", "Bucket 1", "Bucket 2", "Bucket 8"],
        correct: 1,
        explanation:
          "The hash index is calculated as key % size. 15 % 7 = 1, so the key is placed in bucket 1.",
      },
      {
        id: 2,
        diff: "easy",
        text: "In the Hash Map visualizer, what happens if you insert a key that already exists in the table?",
        options: [
          "The new value is ignored",
          "The existing value for that key is updated",
          "The key is added as a duplicate in the same chain",
          "The program throws an error",
        ],
        correct: 1,
        explanation:
          "In a Hash Map, keys must be unique. Inserting an existing key typically updates its associated value.",
      },
      {
        id: 3,
        diff: "easy",
        text: 'What does the "Average Case" scenario in the visualizer demonstrate?',
        options: [
          "A table where every bucket is empty",
          "A table with many keys mapped to the same index",
          "A table with a few small chains (1-2 items per bucket)",
          "A table that is completely full with no room for new items",
        ],
        correct: 2,
        explanation:
          "Average case assumes a uniform distribution where collisions are rare and chains remain short, keeping operations at O(1) amortized.",
      },
      {
        id: 4,
        diff: "medium",
        text: 'When performing a "Search" for a key that has collided and is in a chain, what is the internal logic?',
        options: [
          "It checks only the first item in the bucket",
          "It jumps to the next bucket automatically",
          "It calculates the hash and then performs a linear scan of that specific bucket's chain",
          "It sorts the chain first before searching",
        ],
        correct: 2,
        explanation:
          "After finding the correct bucket via the hash function, the algorithm must traverse the linked list (chain) at that index to find the exact key.",
      },
      {
        id: 5,
        diff: "medium",
        text: 'In the "Worst Case" scenario provided in the visualizer, why does the time complexity become O(N)?',
        options: [
          "Because the hash function is too slow to compute",
          "Because all keys hash to the same bucket, creating a single long linked list",
          "Because the table size is too large for the memory",
          "Because the keys are alphanumeric",
        ],
        correct: 1,
        explanation:
          "If all N elements collide into the same bucket, searching for a key requires visiting every single element in that chain, making it O(N).",
      },
      {
        id: 6,
        diff: "medium",
        text: "Which operation in the visualizer visits every single bucket and every item in every chain?",
        options: ["Search", "Insert", "Iterate All", "Delete"],
        correct: 2,
        explanation:
          "Iteration involves traversing the entire underlying array and scanning every linked list to access all stored key-value pairs.",
      },
      {
        id: 7,
        diff: "medium",
        text: "If the visualizer has 5 entries and a capacity of 7, what is the current Load Factor?",
        options: ["1.40", "0.71", "0.50", "2.00"],
        correct: 1,
        explanation:
          "Load Factor is calculated as n / m (items / capacity). 5 / 7 ≈ 0.71.",
      },
      {
        id: 8,
        diff: "hard",
        text: 'When deleting a key from a bucket using "Separate Chaining", which standard data structure operation is performed on that bucket?',
        options: [
          "Popping from a Stack",
          "Removing a node from a Linked List",
          "Deleting a leaf from a Tree",
          "Clearing the entire Array",
        ],
        correct: 1,
        explanation:
          "Since each bucket holds a linked list of collided keys, deleting a specific key involves unlinking that specific node from the chain.",
      },
      {
        id: 9,
        diff: "hard",
        text: 'Which of the following set of keys would cause a "Worst Case" scenario in a hash table of size 7?',
        options: [
          "[1, 2, 3, 4, 5]",
          "[7, 14, 21, 28, 35]",
          "[10, 20, 30, 40, 50]",
          "[2, 9, 16, 23, 30]",
        ],
        correct: 1,
        explanation:
          "In the second option, every number is a multiple of 7. Therefore, n % 7 will always be 0, putting all keys into Bucket 0.",
      },
      {
        id: 10,
        diff: "hard",
        text: 'Why is O(1) search in a Hash Map called "Amortized" or "Average" time?',
        options: [
          "Because it only works for integer keys",
          "Because collisions can occasionally increase the time for specific lookups",
          "Because the hash function changes every time it is called",
          "Because the table is always sorted",
        ],
        correct: 1,
        explanation:
          "While most lookups take constant time, some keys might land in buckets with chains, requiring a few extra steps to find the target. This averages out to O(1) over many operations.",
      },
    ],
  },

  "heap-l1": {
    topicName: "Heap",
    level: "Level 1",
    subtitle:
      "Master heap properties, array-based tree mapping, and priority queue fundamentals.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "heap_l2_unlocked",
    nextPage: "heap_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "heap_basics.html" },
      { text: "Level 1 — Basics", link: "heap_basics.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "A Heap is a specialized version of which data structure?",
        options: [
          "Linked List",
          "Complete Binary Tree",
          "Sorted Array",
          "Stack",
        ],
        correct: 1,
        explanation:
          "A heap is a specialized complete binary tree. Complete means every level is full except possibly the last, which is filled from left to right.",
      },
      {
        id: 2,
        diff: "easy",
        text: "In a Max-Heap, the root node always contains:",
        options: [
          "The smallest element in the tree",
          "The average value of all nodes",
          "The largest element in the tree",
          "A random element from the input",
        ],
        correct: 2,
        explanation:
          "By the Max-Heap property, every parent must be greater than or equal to its children, making the root the maximum element.",
      },
      {
        id: 3,
        diff: "easy",
        text: 'What is the average time complexity to "Peek" (access the root) in a heap?',
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 3,
        explanation:
          "Because the extreme element is always stored at the root (index 0 in an array), we can access it instantly in constant time.",
      },
      {
        id: 4,
        diff: "medium",
        text: 'If a node is stored at index "i" in a 0-indexed array, what is the formula to find its parent?',
        options: ["2 * i + 1", "(i - 1) / 2", "i / 2", "2 * i + 2"],
        correct: 1,
        explanation:
          "In an array-based heap, the parent of node i is always found at floor((i - 1) / 2).",
      },
      {
        id: 5,
        diff: "medium",
        text: "What is the time complexity of building a heap from an arbitrary array of N elements using Floyd’s algorithm?",
        options: ["O(N log N)", "O(log N)", "O(N)", "O(N²)"],
        correct: 2,
        explanation:
          'While N separate insertions would take O(N log N), the optimized "Build Heap" algorithm converges to O(N) time.',
      },
      {
        id: 6,
        diff: "medium",
        text: "Which of the following properties is TRUE regarding the order of elements in a heap?",
        options: [
          "A heap is always fully sorted from left to right",
          "Left children are always smaller than right children",
          "There is no specific ordering requirement between siblings",
          "Every level must be sorted numerically",
        ],
        correct: 2,
        explanation:
          "Heaps only enforce the parent-child relationship. There is no rule stating that a left child must be smaller or larger than its sibling.",
      },
      {
        id: 7,
        diff: "medium",
        text: "A Min-Heap is commonly used to implement which algorithm?",
        options: [
          "Binary Search",
          "Dijkstra’s Shortest Path",
          "Quick Sort",
          "Linear Search",
        ],
        correct: 1,
        explanation:
          "Dijkstra’s algorithm uses a Min-Priority Queue (Min-Heap) to efficiently pick the unvisited node with the smallest cumulative distance.",
      },
      {
        id: 8,
        diff: "hard",
        text: "In a 0-indexed array representation of a heap with N elements, which range of indices represents the leaf nodes?",
        options: ["0 to N/2", "N/2 to N-1", "Only index 0", "Only index N-1"],
        correct: 1,
        explanation:
          "In a complete binary tree stored in an array, nodes from index floor(N/2) to N-1 have no children and are therefore leaves.",
      },
      {
        id: 9,
        diff: "hard",
        text: 'If a node at index "i" has two children, at which index is the "Right Child" located?',
        options: ["2 * i", "2 * i + 1", "2 * i + 2", "i + 2"],
        correct: 2,
        explanation:
          "In the array mapping, the left child is at 2i + 1 and the right child is at 2i + 2.",
      },
      {
        id: 10,
        diff: "hard",
        text: "What is the time complexity of the Heap Sort algorithm?",
        options: ["O(N)", "O(log N)", "O(N log N)", "O(N²)"],
        correct: 2,
        explanation:
          "Heap Sort involves building a heap O(N) and performing N extractions, each taking O(log N), resulting in O(N log N) total time.",
      },
    ],
  },

  "heap-l2": {
    topicName: "Heap",
    level: "Level 2",
    subtitle:
      "Visualize heap transitions, master heapify algorithms, and analyze operational efficiency.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "heap_l3_unlocked",
    nextPage: "heap_L3.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "heap_basics.html" },
      { text: "Level 2 — Interactive", link: "heap_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "When inserting a new value into the visualizer, where is it first placed in the underlying array?",
        options: [
          "At index 0 (the root)",
          "At the first empty slot at the end of the array",
          "In the middle to keep it balanced",
          "It depends on whether it is a Min or Max heap",
        ],
        correct: 1,
        explanation:
          'To maintain the "Complete Binary Tree" property, new elements are always added to the next available position at the end of the array before being moved to their correct location.',
      },
      {
        id: 2,
        diff: "easy",
        text: 'In the "Heapify Up" process for a Max-Heap, when does a node stop moving upward?',
        options: [
          "When it reaches a leaf position",
          "When its value is smaller than or equal to its parent",
          "When it has two children",
          "After exactly log(N) swaps",
        ],
        correct: 1,
        explanation:
          "In a Max-Heap, a parent must be ≥ its children. If a node is no longer larger than its parent (or it hits the root), the heap property is satisfied.",
      },
      {
        id: 3,
        diff: "easy",
        text: 'During the "Extract Root" operation, what is the first step performed by the visualizer?',
        options: [
          "The root is deleted and the array is shifted left",
          "The root is swapped with its largest child",
          "The root is replaced by the last element in the array",
          "The entire tree is re-sorted",
        ],
        correct: 2,
        explanation:
          'To remove the root while keeping the tree "complete," we move the last element to the root position, then perform a "Heapify Down" to restore order.',
      },
      {
        id: 4,
        diff: "medium",
        text: 'In a Min-Heap, if a node is being "Heapified Down" and its children have values 15 and 10, which child should it swap with?',
        options: [
          "The left child (15)",
          "The right child (10)",
          "Neither, it should stay put",
          "The parent node",
        ],
        correct: 1,
        explanation:
          "In a Min-Heap, the parent must be the smallest. To restore this, we swap a violating parent with its SMALLEST child (10).",
      },
      {
        id: 5,
        diff: "medium",
        text: 'If a heap has 10 elements, at which index does the "Build Heap" (Floyd’s Algorithm) start the heapification process?',
        options: ["Index 0", "Index 9", "Index 4", "Index 5"],
        correct: 2,
        explanation:
          "Floyd’s algorithm starts from the last non-leaf node. Formula: floor(N/2) - 1. For N=10, 10/2 - 1 = index 4.",
      },
      {
        id: 6,
        diff: "medium",
        text: 'What is the "Worst Case" for a heap insertion operation?',
        options: [
          "When the new element is smaller than the root",
          "When the new element is the new maximum (or minimum) and must bubble all the way to the root",
          "When the heap is already empty",
          "When the element is added to a full level",
        ],
        correct: 1,
        explanation:
          "The worst case is a path from a leaf to the root, which requires log(N) swaps, occurring when the new element becomes the new extreme.",
      },
      {
        id: 7,
        diff: "medium",
        text: 'Why does the "Peek" operation only take O(1) time?',
        options: [
          "Because heaps are always sorted",
          "Because the extreme value is always guaranteed to be at index 0",
          "Because the visualizer uses a search algorithm",
          "Because heaps are small data structures",
        ],
        correct: 1,
        explanation:
          "The Heap Property ensures that the root (index 0) always contains the max (Max-Heap) or min (Min-Heap), so no traversal is needed.",
      },
      {
        id: 8,
        diff: "hard",
        text: 'In the "Build Heap" scenario, why is the total time complexity O(N) instead of O(N log N)?',
        options: [
          "Because we only visit half of the nodes",
          "Because the work required decreases as we move toward the root",
          'Because most nodes are at the bottom and require fewer steps to "sift down"',
          "Because hashing is used to place nodes",
        ],
        correct: 2,
        explanation:
          "Mathematically, in a complete tree, most nodes are leaves or near-leaves. Building from the bottom-up allows the majority of nodes to perform 0 or 1 swaps, while only the root performs log N swaps.",
      },
      {
        id: 9,
        diff: "hard",
        text: "If you have a Max-Heap and you update a leaf node to a very large value, which heapify direction is required?",
        options: [
          "Heapify Down",
          "Heapify Up",
          "No heapify needed",
          "The entire array must be rebuilt",
        ],
        correct: 1,
        explanation:
          'If a value at the bottom becomes very large in a Max-Heap, it will likely be larger than its parent, requiring it to "Bubble Up" to its correct level.',
      },
      {
        id: 10,
        diff: "hard",
        text: "Which of the following describes the relationship between a node at index 5 and its potential right child?",
        options: [
          "The right child is at index 11",
          "The right child is at index 12",
          "The right child is at index 10",
          "Node 5 is a leaf and has no children",
        ],
        correct: 1,
        explanation:
          "Formula for right child is 2*i + 2. For i=5: 2*5 + 2 = 12.",
      },
    ],
  },

  "linked_list-l1": {
    topicName: "Linked List",
    level: "Level 1",
    subtitle:
      "Understand node structures, pointer manipulation, and the differences between linear data storage methods.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "linkedlist_l2_unlocked",
    nextPage: "linkedlist_L2.html",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "linkedlist_L1.html" },
      { text: "Level 1 — Basics", link: "linkedlist_L1.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "What are the two fundamental components of a Node in a Singly Linked List?",
        options: [
          "Index and Value",
          "Data and a pointer to the next node",
          "Data and a pointer to the previous node",
          "Head and Tail pointers",
        ],
        correct: 1,
        explanation:
          "A basic node in a singly linked list consists of the data element and a 'next' pointer that stores the memory address of the subsequent node.",
      },
      {
        id: 2,
        diff: "easy",
        text: "How is memory allocated for a Linked List?",
        options: [
          "In a single contiguous block",
          "Statically at compile time",
          "Dynamically at random available locations in the heap",
          "It does not use memory",
        ],
        correct: 2,
        explanation:
          "Linked lists use dynamic memory allocation; nodes are created as needed and can be stored anywhere in memory, connected only by pointers.",
      },
      {
        id: 3,
        diff: "medium",
        text: "What is the time complexity of accessing the i-th element in a Linked List of size N?",
        options: ["O(1)", "O(log N)", "O(N)", "O(1) if head is known"],
        correct: 2,
        explanation:
          "Unlike arrays, linked lists do not support random access. To reach the i-th node, you must start at the head and traverse each node one by one, resulting in O(N) time.",
      },
      {
        id: 4,
        diff: "medium",
        text: "What is a key difference between a Doubly Linked List and a Singly Linked List?",
        options: [
          "Doubly Linked Lists are faster to access by index",
          "Doubly Linked Lists use less memory",
          "Each node in a Doubly Linked List has pointers to both the next and previous nodes",
          "Doubly Linked Lists cannot be circular",
        ],
        correct: 2,
        explanation:
          "A Doubly Linked List node contains an extra 'prev' pointer, allowing traversal in both forward and backward directions.",
      },
      {
        id: 5,
        diff: "hard",
        text: "What is the time complexity to insert a new node at the beginning of a Linked List?",
        options: ["O(1)", "O(N)", "O(N²)", "O(log N)"],
        correct: 0,
        explanation:
          "Inserting at the head is O(1) because you only need to point the new node to the current head and update the head pointer, regardless of the list size.",
      },
      {
        id: 6,
        diff: "medium",
        text: "In a Circular Linked List, what does the 'next' pointer of the last node point to?",
        options: ["NULL", "The middle node", "The head node", "Itself"],
        correct: 2,
        explanation:
          "In a circular linked list, the tail node connects back to the head node instead of pointing to NULL, creating a continuous loop.",
      },
      {
        id: 7,
        diff: "hard",
        text: "Which of the following is a disadvantage of Linked Lists compared to Arrays?",
        options: [
          "Arrays have dynamic size",
          "Linked Lists have O(1) random access",
          "Linked Lists require extra memory for pointers",
          "Linked Lists are better for cache locality",
        ],
        correct: 2,
        explanation:
          "Linked lists require more memory than arrays to store the same amount of data because each node must also store the memory address (pointer) of the next node.",
      },
      {
        id: 8,
        diff: "medium",
        text: "What does the 'NULL' pointer at the end of a Singly Linked List signify?",
        options: [
          "The list is empty",
          "The end of the list",
          "An error in the code",
          "The pointer to the head",
        ],
        correct: 1,
        explanation:
          "The NULL value in the 'next' field of a node indicates that there are no more nodes to follow, marking the end (tail) of the list.",
      },
      {
        id: 9,
        diff: "easy",
        text: "Which pointer is essential to keep track of a Linked List?",
        options: ["Tail", "Current", "Head", "Null"],
        correct: 2,
        explanation:
          "The 'head' pointer stores the address of the first node. If you lose the head pointer, you lose access to the entire list.",
      },
      {
        id: 10,
        diff: "hard",
        text: "To delete a node in the middle of a Singly Linked List, what information is primarily required?",
        options: [
          "The value of the tail node",
          "The pointer to the node physically preceding the node to be deleted",
          "The index of the last node",
          "Nothing, deletion is always O(1)",
        ],
        correct: 1,
        explanation:
          "To delete a node, you must update the 'next' pointer of the node before it. Without the preceding node's pointer, you cannot bypass the node intended for deletion.",
      },
    ],
  },

  "linked_list-l2": {
    topicName: "Linked List",
    level: "Level 2",
    subtitle:
      "Master pointer manipulation logic, step-by-step insertion/deletion algorithms, and traversal patterns.",
    totalQuestions: 10,
    passingScore: 70,
    unlocks: "linkedlist_l3_unlocked",
    nextPage: "practice.html?topic=linkedlist",
    breadcrumb: [
      { text: "Topics", link: "topics.html" },
      { text: "Data Structures", link: "linkedlist_L1.html" },
      { text: "Level 2 — Interactive", link: "linkedlist_L2.html" },
    ],
    questions: [
      {
        id: 1,
        diff: "easy",
        text: "During a visual traversal of a linked list, which line of code is responsible for moving the 'current' pointer to the next node?",
        options: [
          "current = head",
          "current = current.next",
          "current.next = current",
          "node = current"
        ],
        correct: 1,
        explanation:
          "To move to the next node, we update the current pointer to hold the address stored in the 'next' field of the current node.",
      },
      {
        id: 2,
        diff: "medium",
        text: "When inserting a node in the middle of a Singly Linked List, which pointer should be updated first to avoid breaking the list?",
        options: [
          "The previous node's 'next' pointer",
          "The new node's 'next' pointer",
          "The head pointer",
          "It doesn't matter"
        ],
        correct: 1,
        explanation:
          "Visually, you must first point the 'new node' to the 'next node'. If you update the 'previous node' first, you lose the reference to the rest of the list.",
      },
      {
        id: 3,
        diff: "hard",
        text: "What happens if you delete a node in a Singly Linked List but forget to link its predecessor to its successor?",
        options: [
          "The list remains intact",
          "The list is cut into two independent parts, losing the second half",
          "The list becomes circular",
          "The computer crashes immediately"
        ],
        correct: 1,
        explanation:
          "By not re-linking, the pointer that connected the first half to the second half is destroyed, making the remaining nodes unreachable in memory.",
      },
      {
        id: 4,
        diff: "medium",
        text: "In the visualization of a Deletion operation at index 'i', how many nodes must we traverse to perform the link update?",
        options: [
          "i nodes",
          "i - 1 nodes",
          "i + 1 nodes",
          "0 nodes"
        ],
        correct: 1,
        explanation:
          "To delete node 'i', we must stop at node 'i-1' so we can change its 'next' pointer to skip over node 'i'.",
      },
      {
        id: 5,
        diff: "hard",
        text: "In a Doubly Linked List visualization, how many total pointer updates are required to insert a node between two existing nodes?",
        options: ["2", "4", "6", "8"],
        correct: 1,
        explanation:
          "You must update: 1. New node's next, 2. New node's prev, 3. Prev node's next, 4. Next node's prev. Total = 4 updates.",
      },
      {
        id: 6,
        diff: "medium",
        text: "Which technique is commonly used to find the middle of a linked list in a single traversal?",
        options: [
          "Binary Search",
          "Two pointers (Fast and Slow)",
          "Recursive backtracking",
          "Random access"
        ],
        correct: 1,
        explanation:
          "The 'Tortoise and Hare' method moves one pointer twice as fast as the other. When the fast pointer reaches the end, the slow pointer is at the middle.",
      },
      {
        id: 7,
        diff: "easy",
        text: "What is the condition used to stop a loop that traverses to the end of a Singly Linked List?",
        options: [
          "while (current.next != head)",
          "while (current != NULL)",
          "while (current.data != 0)",
          "while (current == head)"
        ],
        correct: 1,
        explanation:
          "We continue as long as 'current' points to a valid node. Once it becomes NULL, we have moved past the last node.",
      },
      {
        id: 8,
        diff: "medium",
        text: "If you have a 'Tail' pointer in addition to a 'Head' pointer, which operation becomes O(1)?",
        options: [
          "Deletion of the last node",
          "Insertion at the end of the list",
          "Searching for an element",
          "Insertion in the middle"
        ],
        correct: 1,
        explanation:
          "With a tail pointer, you can jump directly to the end to add a node (O(1)). However, deletion still requires O(N) to find the node before the tail.",
      },
      {
        id: 9,
        diff: "hard",
        text: "When implementing a stack using a Linked List, where should the 'Push' and 'Pop' operations occur for O(1) efficiency?",
        options: [
          "At the tail",
          "At the head",
          "In the middle",
          "It is always O(N)"
        ],
        correct: 1,
        explanation:
          "By pushing and popping at the head, you avoid traversing the whole list, maintaining the constant time complexity required for stack operations.",
      },
      {
        id: 10,
        diff: "hard",
        text: "What is the primary visual indicator that a Linked List contains a cycle (loop)?",
        options: [
          "The last node points to NULL",
          "The traversal pointer never reaches a NULL value and repeats nodes",
          "The list has more than 100 nodes",
          "Nodes are stored in reverse order"
        ],
        correct: 1,
        explanation:
          "In a cycle, the 'next' pointer of the last node points back to a previous node in the list, causing an infinite loop during traversal.",
      },
    ],
  },
};


// Export for use in quiz.html
if (typeof module !== "undefined" && module.exports) {
  module.exports = QUIZ_DATA;
}
