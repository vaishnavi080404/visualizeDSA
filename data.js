const style = document.createElement("style");
style.innerHTML = `
.visual-box {
    background: #0f172a;
    padding: 20px;
    border-radius: 12px;
    margin-top: 15px;
    color: #e5e7eb;
    font-family: 'Segoe UI', sans-serif;
}

.visual-box h4 {
    margin-bottom: 15px;
    color: #38bdf8;
    font-size: 18px;
}

.example-flow {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
}

.step {
    background: #1e293b;
    padding: 10px 14px;
    border-radius: 8px;
    font-weight: 500;
    min-width: 120px;
    text-align: center;
    transition: transform 0.2s ease, background 0.2s ease;
}

.step:hover {
    transform: translateY(-2px);
    background: #334155;
}

.arrow {
    font-size: 22px;
    color: #94a3b8;
    animation: pulse 1.5s infinite;
}

.result {
    font-weight: bold;
    color: #22c55e;
    background: #052e16;
}

.result::before {
    content: "✔ ";
}

@keyframes pulse {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
}
`;

document.head.appendChild(style);



const allEnhancedProblems = [
    // ==================== BASIC PROBLEMS (1-8) ====================
    
    // PROBLEM 1: Check Even or Odd
    {
        id: 1,
        title: "Check Even or Odd",
        difficulty: "basic",
        category: "Math",
        
        problemStatement: "Given an integer N, determine whether it is even or odd.",
        
        examples: [
            {
                input: "N = 7",
                output: "Odd",
                explanation: "7 is not divisible by 2, so it's odd"
            },
            {
                input: "N = 10",
                output: "Even",
                explanation: "10 is divisible by 2, so it's even"
            },
            {
                input: "N = 0",
                output: "Even",
                explanation: "0 is divisible by 2, so it's even"
            }
        ],
        
        explanation: {
            concept: "A number is <strong>even</strong> if it is divisible by 2 (remainder is 0). Otherwise, it is <strong>odd</strong>.",
            
            approach: [
                "Use the modulo operator (%) to find the remainder when dividing by 2",
                "If remainder is 0, the number is even",
                "If remainder is 1, the number is odd"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Visual Example:</h4>
                    <div class="example-flow">
                        <div class="step">N = 7</div>
                        <div class="arrow">→</div>
                        <div class="step">7 % 2 = 1</div>
                        <div class="arrow">→</div>
                        <div class="step">Remainder ≠ 0</div>
                        <div class="arrow">→</div>
                        <div class="step result">ODD</div>
                    </div>
                    <div class="example-flow">
                        <div class="step">N = 10</div>
                        <div class="arrow">→</div>
                        <div class="step">10 % 2 = 0</div>
                        <div class="arrow">→</div>
                        <div class="step">Remainder = 0</div>
                        <div class="arrow">→</div>
                        <div class="step result">EVEN</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Take input number N",
                "Step 2: Calculate N % 2 (remainder when divided by 2)",
                "Step 3: If remainder == 0, print 'Even'",
                "Step 4: Else, print 'Odd'"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "We perform only one modulo operation, which takes constant time",
            space: "O(1)",
            spaceExplanation: "We only use a few variables, space doesn't grow with input"
        },
        
        solutions: {
            c: {
                code: `#include <stdio.h>

int main() {
    int num;
    
    printf("Enter a number: ");
    scanf("%d", &num);
    
    if(num % 2 == 0) {
        printf("%d is Even\\n", num);
    } else {
        printf("%d is Odd\\n", num);
    }
    
    return 0;
}`,
                output: "Enter a number: 7\n7 is Odd",
                explanation: "In C, we use scanf for input and % operator for modulo operation"
            },
            
            cpp: {
                code: `#include <iostream>
using namespace std;

int main() {
    int num;
    
    cout << "Enter a number: ";
    cin >> num;
    
    if(num % 2 == 0) {
        cout << num << " is Even" << endl;
    } else {
        cout << num << " is Odd" << endl;
    }
    
    return 0;
}`,
                output: "Enter a number: 7\n7 is Odd",
                explanation: "C++ uses cin/cout for I/O, modulo operator works the same as C"
            },
            
            java: {
                code: `import java.util.Scanner;

public class EvenOdd {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        if(num % 2 == 0) {
            System.out.println(num + " is Even");
        } else {
            System.out.println(num + " is Odd");
        }
        
        sc.close();
    }
}`,
                output: "Enter a number: 7\n7 is Odd",
                explanation: "Java uses Scanner class for input, % operator for modulo"
            },
            
            python: {
                code: `num = int(input("Enter a number: "))

if num % 2 == 0:
    print(f"{num} is Even")
else:
    print(f"{num} is Odd")`,
                output: "Enter a number: 7\n7 is Odd",
                explanation: "Python uses input() for reading, % for modulo, f-strings for formatting"
            },
            
            javascript: {
                code: `const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter a number: ', num => {
    num = parseInt(num);
    
    if(num % 2 === 0) {
        console.log(\`\${num} is Even\`);
    } else {
        console.log(\`\${num} is Odd\`);
    }
    
    readline.close();
});`,
                output: "Enter a number: 7\n7 is Odd",
                explanation: "JavaScript uses readline for input, % for modulo, template literals for formatting"
            }
        },
        
        relatedTopics: ["Modulo operator", "Conditional statements", "Basic arithmetic"],
        
        commonMistakes: [
            {
                mistake: "Using division instead of modulo",
                why: "num / 2 gives quotient, not remainder",
                correct: "Use num % 2 to get remainder"
            },
            {
                mistake: "Not handling negative numbers",
                why: "-7 % 2 might give -1 in some languages",
                correct: "Use abs(num) % 2 if needed"
            }
        ],
        
        practiceQuestions: [
            "Modify to check if number is divisible by 3",
            "Check if a number is divisible by both 2 and 3",
            "Find all even numbers in a given range"
        ]
    },

    // PROBLEM 2: Multiplication Table
    {
        id: 2,
        title: "Multiplication Table",
        difficulty: "basic",
        category: "Math",
        
        problemStatement: "Given an integer N, print its multiplication table up to 10.",
        
        examples: [
            {
                input: "N = 5",
                output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n...\n5 x 10 = 50",
                explanation: "Multiply 5 with numbers from 1 to 10"
            },
            {
                input: "N = 3",
                output: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n...\n3 x 10 = 30",
                explanation: "Multiply 3 with numbers from 1 to 10"
            }
        ],
        
        explanation: {
            concept: "A <strong>multiplication table</strong> shows the result of multiplying a number by a sequence of numbers (typically 1 to 10).",
            
            approach: [
                "Use a loop from 1 to 10",
                "In each iteration, multiply N by the loop variable",
                "Print the result in the format: N x i = result"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example: Table of 5</h4>
                    <table class="multiplication-table">
                        <tr><td>5 × 1</td><td>=</td><td>5</td></tr>
                        <tr><td>5 × 2</td><td>=</td><td>10</td></tr>
                        <tr><td>5 × 3</td><td>=</td><td>15</td></tr>
                        <tr><td>5 × 4</td><td>=</td><td>20</td></tr>
                        <tr><td>5 × 5</td><td>=</td><td>25</td></tr>
                        <tr><td>...</td><td></td><td>...</td></tr>
                        <tr><td>5 × 10</td><td>=</td><td>50</td></tr>
                    </table>
                </div>
            `,
            
            algorithm: [
                "Step 1: Take input number N",
                "Step 2: Initialize loop variable i = 1",
                "Step 3: While i <= 10, do:",
                "  - Calculate result = N × i",
                "  - Print 'N x i = result'",
                "  - Increment i",
                "Step 4: End loop"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Loop runs exactly 10 times, which is constant",
            space: "O(1)",
            spaceExplanation: "Only using loop variable and result storage"
        },
        
        solutions: {
            c: {
                code: `#include <stdio.h>

int main() {
    int num;
    
    printf("Enter a number: ");
    scanf("%d", &num);
    
    printf("\\nMultiplication table of %d:\\n", num);
    for(int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", num, i, num * i);
    }
    
    return 0;
}`,
                output: "Enter a number: 5\n\nMultiplication table of 5:\n5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
                explanation: "Simple for loop iterating from 1 to 10"
            },
            
            cpp: {
                code: `#include <iostream>
using namespace std;

int main() {
    int num;
    
    cout << "Enter a number: ";
    cin >> num;
    
    cout << "\\nMultiplication table of " << num << ":" << endl;
    for(int i = 1; i <= 10; i++) {
        cout << num << " x " << i << " = " << num * i << endl;
    }
    
    return 0;
}`,
                output: "Enter a number: 5\n\nMultiplication table of 5:\n5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
                explanation: "C++ implementation using cout for formatted output"
            },
            
            java: {
                code: `import java.util.Scanner;

public class MultiplicationTable {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        System.out.println("\\nMultiplication table of " + num + ":");
        for(int i = 1; i <= 10; i++) {
            System.out.println(num + " x " + i + " = " + (num * i));
        }
        
        sc.close();
    }
}`,
                output: "Enter a number: 5\n\nMultiplication table of 5:\n5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
                explanation: "Java version with Scanner for input"
            },
            
            python: {
                code: `num = int(input("Enter a number: "))

print(f"\\nMultiplication table of {num}:")
for i in range(1, 11):
    print(f"{num} x {i} = {num * i}")`,
                output: "Enter a number: 5\n\nMultiplication table of 5:\n5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
                explanation: "Python uses range(1, 11) to iterate from 1 to 10"
            },
            
            javascript: {
                code: `const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter a number: ', num => {
    num = parseInt(num);
    
    console.log(\`\\nMultiplication table of \${num}:\`);
    for(let i = 1; i <= 10; i++) {
        console.log(\`\${num} x \${i} = \${num * i}\`);
    }
    
    readline.close();
});`,
                output: "Enter a number: 5\n\nMultiplication table of 5:\n5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
                explanation: "JavaScript implementation with template literals"
            }
        },
        
        relatedTopics: ["Loops", "Basic arithmetic", "Formatted output"],
        
        commonMistakes: [
            {
                mistake: "Loop from 0 to 9 instead of 1 to 10",
                why: "Multiplication table traditionally starts from 1",
                correct: "Use for(i = 1; i <= 10; i++)"
            },
            {
                mistake: "Forgetting to print the multiplication sign",
                why: "Output becomes unclear",
                correct: "Include 'x' or '*' in output format"
            }
        ],
        
        practiceQuestions: [
            "Print multiplication table up to N rows",
            "Print table in reverse order (10 to 1)",
            "Print tables of all numbers from 1 to N"
        ]
    },

    // PROBLEM 3: Sum of Naturals
    {
        id: 3,
        title: "Sum of Natural Numbers",
        difficulty: "basic",
        category: "Math",
        
        problemStatement: "Given an integer N, find the sum of first N natural numbers.",
        
        examples: [
            {
                input: "N = 5",
                output: "15",
                explanation: "1 + 2 + 3 + 4 + 5 = 15"
            },
            {
                input: "N = 10",
                output: "55",
                explanation: "1 + 2 + 3 + ... + 10 = 55"
            },
            {
                input: "N = 100",
                output: "5050",
                explanation: "Sum of first 100 natural numbers"
            }
        ],
        
        explanation: {
            concept: "The sum of first N natural numbers can be calculated using the formula: <strong>Sum = N × (N + 1) / 2</strong>. This formula was discovered by mathematician Carl Friedrich Gauss.",
            
            approach: [
                "Method 1: Use direct formula N × (N + 1) / 2",
                "Method 2: Use a loop to add numbers from 1 to N"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Why the Formula Works:</h4>
                    <p>Pair first and last numbers:</p>
                    <div class="pairing">
                        1 + 5 = 6<br>
                        2 + 4 = 6<br>
                        3 + 3 = 6<br>
                    </div>
                    <p>We have N/2 pairs, each summing to (N+1)</p>
                    <p>Total = N/2 × (N+1) = N × (N+1) / 2</p>
                    
                    <h4>Example: N = 5</h4>
                    <div class="calculation">
                        Sum = 5 × 6 / 2 = 30 / 2 = 15
                    </div>
                </div>
            `,
            
            algorithm: [
                "Method 1 (Formula):",
                "  Step 1: Calculate sum = N × (N + 1) / 2",
                "  Step 2: Return sum",
                "",
                "Method 2 (Loop):",
                "  Step 1: Initialize sum = 0",
                "  Step 2: For i from 1 to N:",
                "    - Add i to sum",
                "  Step 3: Return sum"
            ]
        },
        
        complexity: {
            time: "O(1) for formula, O(N) for loop",
            timeExplanation: "Formula method is constant time, loop method depends on N",
            space: "O(1)",
            spaceExplanation: "Only using one variable to store the sum"
        },
        
     solutions : {
    c: {
        code: `#include <stdio.h>

// Method 1: Using formula
int sumFormula(int n) {
    return n * (n + 1) / 2;
}

// Method 2: Using loop
int sumLoop(int n) {
    int sum = 0;
    for(int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);

    printf("Using Formula: %d\\n", sumFormula(n));
    printf("Using Loop: %d\\n", sumLoop(n));
    return 0;
}`,
        output: "Enter a number: 5\nUsing Formula: 15\nUsing Loop: 15",
        explanation: "C program using user input with formula and loop methods"
    },

    cpp: {
        code: `#include <iostream>
using namespace std;

// Method 1: Using formula
int sumFormula(int n) {
    return n * (n + 1) / 2;
}

// Method 2: Using loop
int sumLoop(int n) {
    int sum = 0;
    for(int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    cout << "Using Formula: " << sumFormula(n) << endl;
    cout << "Using Loop: " << sumLoop(n) << endl;
    return 0;
}`,
        output: "Enter a number: 5\nUsing Formula: 15\nUsing Loop: 15",
        explanation: "C++ version with cin and cout"
    },

    java: {
        code: `import java.util.Scanner;

public class SumOfNaturals {

    public static int sumFormula(int n) {
        return n * (n + 1) / 2;
    }

    public static int sumLoop(int n) {
        int sum = 0;
        for(int i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        System.out.println("Using Formula: " + sumFormula(n));
        System.out.println("Using Loop: " + sumLoop(n));
        sc.close();
    }
}`,
        output: "Enter a number: 5\nUsing Formula: 15\nUsing Loop: 15",
        explanation: "Java program using Scanner for input"
    },

    python: {
        code: `# Method 1: Using formula
def sum_formula(n):
    return n * (n + 1) // 2

# Method 2: Using loop
def sum_loop(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total

# Method 3: Using built-in sum
def sum_builtin(n):
    return sum(range(1, n + 1))

n = int(input("Enter a number: "))

print("Using Formula:", sum_formula(n))
print("Using Loop:", sum_loop(n))
print("Using Built-in:", sum_builtin(n))`,
        output: "Enter a number: 5\nUsing Formula: 15\nUsing Loop: 15\nUsing Built-in: 15",
        explanation: "Python solution with multiple approaches"
    },

    javascript: {
        code: `const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sumFormula(n) {
    return n * (n + 1) / 2;
}

function sumLoop(n) {
    let sum = 0;
    for(let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

rl.question("Enter a number: ", (input) => {
    const n = Number(input);

    console.log("Using Formula:", sumFormula(n));
    console.log("Using Loop:", sumLoop(n));
    rl.close();
});`,
        output: "Enter a number: 5\nUsing Formula: 15\nUsing Loop: 15",
        explanation: "JavaScript Node.js version using readline"
    }
},

        
        relatedTopics: ["Arithmetic progression", "Mathematical formulas", "Loop optimization"],
        
        commonMistakes: [
            {
                mistake: "Integer overflow for large N",
                why: "N × (N + 1) can exceed integer limits",
                correct: "Use long/bigint for large numbers"
            },
            {
                mistake: "Wrong formula like N × N / 2",
                why: "Incorrect mathematical formula",
                correct: "Use N × (N + 1) / 2"
            }
        ],
        
        practiceQuestions: [
            "Find sum of first N even numbers",
            "Find sum of first N odd numbers",
            "Find sum of numbers in a given range [A, B]"
        ]
    },

    // PROBLEM 4: Sum of Squares of Naturals
    {
        id: 4,
        title: "Sum of Squares of Natural Numbers",
        difficulty: "basic",
        category: "Math",
        
        problemStatement: "Given an integer N, find the sum of squares of first N natural numbers (1² + 2² + 3² + ... + N²).",
        
        examples: [
            {
                input: "N = 5",
                output: "55",
                explanation: "1² + 2² + 3² + 4² + 5² = 1 + 4 + 9 + 16 + 25 = 55"
            },
            {
                input: "N = 3",
                output: "14",
                explanation: "1² + 2² + 3² = 1 + 4 + 9 = 14"
            },
            {
                input: "N = 10",
                output: "385",
                explanation: "Sum of squares from 1² to 10²"
            }
        ],
        
        explanation: {
            concept: "The sum of squares of first N natural numbers follows the formula: <strong>Sum = N × (N + 1) × (2N + 1) / 6</strong>",
            
            approach: [
                "Method 1: Use formula N × (N + 1) × (2N + 1) / 6",
                "Method 2: Use a loop to calculate and add each square"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example: N = 5</h4>
                    <div class="squares-visual">
                        <div>1² = 1</div>
                        <div>2² = 4</div>
                        <div>3² = 9</div>
                        <div>4² = 16</div>
                        <div>5² = 25</div>
                        <div class="sum-line">Sum = 55</div>
                    </div>
                    
                    <h4>Using Formula:</h4>
                    <div class="calculation">
                        Sum = 5 × 6 × 11 / 6<br>
                        Sum = 330 / 6<br>
                        Sum = 55
                    </div>
                </div>
            `,
            
            algorithm: [
                "Method 1 (Formula):",
                "  Step 1: Calculate sum = N × (N + 1) × (2N + 1) / 6",
                "  Step 2: Return sum",
                "",
                "Method 2 (Loop):",
                "  Step 1: Initialize sum = 0",
                "  Step 2: For i from 1 to N:",
                "    - Add i² to sum",
                "  Step 3: Return sum"
            ]
        },
        
        complexity: {
            time: "O(1) for formula, O(N) for loop",
            timeExplanation: "Formula is constant time, loop depends on N",
            space: "O(1)",
            spaceExplanation: "Only using one variable for sum"
        },
        
       solutions: {
    c: {
        code: `#include <stdio.h>

int sumFormula(int n) {
    return n * (n + 1) * (2 * n + 1) / 6;
}

int sumLoop(int n) {
    int sum = 0;
    for(int i = 1; i <= n; i++)
        sum += i * i;
    return sum;
}

int main() {
    int n;
    printf("Enter N: ");
    scanf("%d", &n);

    printf("Using Formula: %d\\n", sumFormula(n));
    printf("Using Loop: %d\\n", sumLoop(n));
    return 0;
}`
    },

    cpp: {
        code: `#include <iostream>
using namespace std;

int sumFormula(int n) {
    return n * (n + 1) * (2 * n + 1) / 6;
}

int sumLoop(int n) {
    int sum = 0;
    for(int i = 1; i <= n; i++)
        sum += i * i;
    return sum;
}

int main() {
    int n;
    cout << "Enter N: ";
    cin >> n;

    cout << "Using Formula: " << sumFormula(n) << endl;
    cout << "Using Loop: " << sumLoop(n) << endl;
    return 0;
}`
    },

    java: {
        code: `import java.util.Scanner;

public class SumOfSquares {
    static int sumFormula(int n) {
        return n * (n + 1) * (2 * n + 1) / 6;
    }

    static int sumLoop(int n) {
        int sum = 0;
        for(int i = 1; i <= n; i++)
            sum += i * i;
        return sum;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter N: ");
        int n = sc.nextInt();

        System.out.println("Using Formula: " + sumFormula(n));
        System.out.println("Using Loop: " + sumLoop(n));
    }
}`
    },

    python: {
        code: `n = int(input("Enter N: "))

print("Using Formula:", n*(n+1)*(2*n+1)//6)

total = 0
for i in range(1, n+1):
    total += i*i
print("Using Loop:", total)`
    },

    javascript: {
        code: `const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter N: ", n => {
    n = Number(n);
    console.log("Using Formula:", n*(n+1)*(2*n+1)/6);

    let sum = 0;
    for(let i=1;i<=n;i++) sum += i*i;
    console.log("Using Loop:", sum);
    rl.close();
});`
    }
},

        
        relatedTopics: ["Sum formulas", "Mathematical series", "Power functions"],
        
        commonMistakes: [
            {
                mistake: "Using wrong formula like N² × (N + 1) / 2",
                why: "Confusing with sum of natural numbers formula",
                correct: "Use N × (N + 1) × (2N + 1) / 6"
            },
            {
                mistake: "Integer overflow for large N",
                why: "Product of three numbers can be very large",
                correct: "Use long data type or check for overflow"
            }
        ],
        
        practiceQuestions: [
            "Find sum of cubes of first N natural numbers",
            "Find difference between sum of squares and square of sum",
            "Find sum of squares in a given range [A, B]"
        ]
    },

    // PROBLEM 5: Swap Two Numbers
    {
        id: 5,
        title: "Swap Two Numbers",
        difficulty: "basic",
        category: "Math",
        
        problemStatement: "Given two integers A and B, swap their values without using a temporary variable.",
        
        examples: [
            {
                input: "A = 5, B = 10",
                output: "A = 10, B = 5",
                explanation: "Values are exchanged"
            },
            {
                input: "A = 100, B = 200",
                output: "A = 200, B = 100",
                explanation: "Larger numbers swapped"
            }
        ],
        
        explanation: {
            concept: "Swapping can be done in three ways: <strong>1) Using temporary variable</strong>, <strong>2) Using arithmetic operations</strong>, <strong>3) Using XOR operation</strong>",
            
            approach: [
                "Method 1: Use a temporary variable to hold one value",
                "Method 2: Use addition and subtraction (a = a + b; b = a - b; a = a - b)",
                "Method 3: Use XOR operation (a = a ^ b; b = a ^ b; a = a ^ b)"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Method 1: Using Temp Variable</h4>
                    <div class="swap-steps">
                        <div>Initial: A = 5, B = 10</div>
                        <div>temp = A → temp = 5</div>
                        <div>A = B → A = 10</div>
                        <div>B = temp → B = 5</div>
                        <div class="result">Final: A = 10, B = 5</div>
                    </div>
                    
                    <h4>Method 2: Using Arithmetic</h4>
                    <div class="swap-steps">
                        <div>Initial: A = 5, B = 10</div>
                        <div>A = A + B → A = 15</div>
                        <div>B = A - B → B = 5</div>
                        <div>A = A - B → A = 10</div>
                        <div class="result">Final: A = 10, B = 5</div>
                    </div>
                    
                    <h4>Method 3: Using XOR</h4>
                    <div class="swap-steps">
                        <div>Initial: A = 5, B = 10</div>
                        <div>A = A ^ B → A = 15 (binary XOR)</div>
                        <div>B = A ^ B → B = 5</div>
                        <div>A = A ^ B → A = 10</div>
                        <div class="result">Final: A = 10, B = 5</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Method 1 (Temp Variable):",
                "  Step 1: temp = A",
                "  Step 2: A = B",
                "  Step 3: B = temp",
                "",
                "Method 2 (Arithmetic):",
                "  Step 1: A = A + B",
                "  Step 2: B = A - B",
                "  Step 3: A = A - B",
                "",
                "Method 3 (XOR):",
                "  Step 1: A = A ^ B",
                "  Step 2: B = A ^ B",
                "  Step 3: A = A ^ B"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "All methods take constant time",
            space: "O(1) for arithmetic/XOR, O(1) for temp (but uses extra variable)",
            spaceExplanation: "Arithmetic and XOR don't use extra space"
        },
        
        solutions: {
    c: {
        code: `#include <stdio.h>

int main() {
    int a, b;
    printf("Enter A and B: ");
    scanf("%d %d", &a, &b);

    a = a + b;
    b = a - b;
    a = a - b;

    printf("After Swap: A=%d B=%d\\n", a, b);
    return 0;
}`
    },

    cpp: {
        code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Enter A and B: ";
    cin >> a >> b;

    a = a + b;
    b = a - b;
    a = a - b;

    cout << "After Swap: A=" << a << " B=" << b << endl;
    return 0;
}`
    },

    java: {
        code: `import java.util.Scanner;

public class Swap {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        a = a + b;
        b = a - b;
        a = a - b;

        System.out.println("After Swap: A=" + a + " B=" + b);
    }
}`
    },

    python: {
        code: `a = int(input("Enter A: "))
b = int(input("Enter B: "))

a, b = b, a
print("After Swap:", a, b)`
    },

    javascript: {
        code: `const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter A: ", a => {
    rl.question("Enter B: ", b => {
        a = Number(a); b = Number(b);
        [a, b] = [b, a];
        console.log("After Swap:", a, b);
        rl.close();
    });
});`
    }
},

        
        relatedTopics: ["Bitwise operations", "Variable manipulation", "Pass by reference"],
        
        commonMistakes: [
            {
                mistake: "Integer overflow in arithmetic method",
                why: "a + b might exceed integer limits",
                correct: "Use XOR method or check for overflow"
            },
            {
                mistake: "Trying to swap without understanding pass-by-value",
                why: "In Java, primitives are pass-by-value",
                correct: "Return new values or use wrapper objects"
            }
        ],
        
        practiceQuestions: [
            "Swap three variables without temporary variable",
            "Swap alternate elements in an array",
            "Swap first and last elements of array"
        ]
    },

    // PROBLEM 6: Closest Number
    {
        id: 6,
        title: "Closest Number",
        difficulty: "basic",
        category: "Math",
        
        problemStatement: "Given two integers N and M, find the number closest to N that is divisible by M. If there are two such numbers equidistant from N, return the larger one.",
        
        examples: [
            {
                input: "N = 13, M = 4",
                output: "12",
                explanation: "12 and 16 are both divisible by 4. 12 is closer to 13."
            },
            {
                input: "N = 15, M = 6",
                output: "18",
                explanation: "12 and 18 are equidistant from 15. Return larger (18)."
            },
            {
                input: "N = 20, M = 5",
                output: "20",
                explanation: "20 itself is divisible by 5"
            }
        ],
        
        explanation: {
            concept: "To find closest number divisible by M: find quotient q = N/M, then check q×M and (q+1)×M to see which is closer to N.",
            
            approach: [
                "Calculate quotient q = N / M",
                "Calculate two candidates: lower = q × M and upper = (q + 1) × M",
                "Find which candidate is closer to N",
                "If both are equidistant, return the larger one"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example: N = 13, M = 4</h4>
                    <div class="number-line">
                        <div>Multiples of 4: ..., 8, 12, 16, 20, ...</div>
                        <div>Position of 13: between 12 and 16</div>
                        <div>Distance from 12: |13 - 12| = 1</div>
                        <div>Distance from 16: |13 - 16| = 3</div>
                        <div class="result">Closest: 12 (smaller distance)</div>
                    </div>
                    
                    <h4>Example: N = 15, M = 6</h4>
                    <div class="number-line">
                        <div>Multiples of 6: ..., 6, 12, 18, 24, ...</div>
                        <div>Position of 15: between 12 and 18</div>
                        <div>Distance from 12: |15 - 12| = 3</div>
                        <div>Distance from 18: |15 - 18| = 3</div>
                        <div class="result">Equal distance: return 18 (larger)</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Calculate q = N / M (integer division)",
                "Step 2: Calculate lower = q × M",
                "Step 3: Calculate upper = (q + 1) × M",
                "Step 4: If N - lower < upper - N, return lower",
                "Step 5: Else if N - lower > upper - N, return upper",
                "Step 6: Else (equal distance), return upper"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Only arithmetic operations, no loops",
            space: "O(1)",
            spaceExplanation: "Using constant extra space"
        },
        
        solutions: {
    c: {
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, m;
    printf("Enter N and M: ");
    scanf("%d %d", &n, &m);

    int q = n / m;
    int a = q * m;
    int b = (q + 1) * m;

    if(abs(n-a) < abs(n-b)) printf("%d", a);
    else printf("%d", b);
}`
    },

    cpp: {
        code: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    int q = n / m;
    int a = q * m;
    int b = (q + 1) * m;

    cout << ((abs(n-a) <= abs(n-b)) ? b : a);
}`
    },

    java: {
        code: `import java.util.*;

public class Closest {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt();

        int q = n / m;
        int a = q * m;
        int b = (q + 1) * m;

        System.out.println(Math.abs(n-a) <= Math.abs(n-b) ? b : a);
    }
}`
    },

    python: {
        code: `n, m = map(int, input().split())

q = n // m
a = q * m
b = (q + 1) * m

print(b if abs(n-a) <= abs(n-b) else a)`
    },

    javascript: {
        code: `const rl = require("readline").createInterface({input:process.stdin,output:process.stdout});
rl.question("Enter N M: ", i => {
    let [n,m]=i.split(" ").map(Number);
    let q=Math.floor(n/m);
    let a=q*m, b=(q+1)*m;
    console.log(Math.abs(n-a)<=Math.abs(n-b)?b:a);
    rl.close();
});`
    }
}
,
        
        relatedTopics: ["Integer division", "Absolute value", "Number theory"],
        
        commonMistakes: [
            {
                mistake: "Not handling negative numbers correctly",
                why: "Integer division behaves differently with negatives",
                correct: "Test with negative inputs and adjust logic"
            },
            {
                mistake: "Forgetting to return larger when equidistant",
                why: "Problem specifies to return larger in tie",
                correct: "Always return upper when distances are equal"
            }
        ],
        
        practiceQuestions: [
            "Find k closest multiples of M to N",
            "Find closest number divisible by both A and B",
            "Round number to nearest multiple of M"
        ]
    },

    // PROBLEM 7: Dice Problem
    {
        id: 7,
        title: "Dice Problem",
        difficulty: "basic",
        category: "Math",
        
        problemStatement: "You are given a cubic dice with 6 faces. All the individual faces have a number printed on them. The numbers are in the range of 1 to 6, like any ordinary dice. You will be provided with a face of this cube, your task is to guess the number on the opposite face of the dice.",
        
        examples: [
            {
                input: "N = 1",
                output: "6",
                explanation: "Opposite of 1 is 6"
            },
            {
                input: "N = 2",
                output: "5",
                explanation: "Opposite of 2 is 5"
            },
            {
                input: "N = 3",
                output: "4",
                explanation: "Opposite of 3 is 4"
            }
        ],
        
        explanation: {
            concept: "In a standard dice, opposite faces always sum to <strong>7</strong>. So opposite of N is (7 - N).",
            
            approach: [
                "The pattern is: 1↔6, 2↔5, 3↔4",
                "Formula: Opposite = 7 - N",
                "This works for all faces of a standard dice"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Dice Face Pairs:</h4>
                    <div class="dice-pairs">
                        <div class="pair">1 + 6 = 7</div>
                        <div class="pair">2 + 5 = 7</div>
                        <div class="pair">3 + 4 = 7</div>
                    </div>
                    
                    <h4>Visual Representation:</h4>
                    <div class="dice-visual">
                        <div class="dice-face">
                            <div>Top: 1 → Bottom: 6</div>
                            <div>Front: 2 → Back: 5</div>
                            <div>Left: 3 → Right: 4</div>
                        </div>
                    </div>
                    
                    <h4>Formula:</h4>
                    <div class="formula">
                        Opposite = 7 - N
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Read the face value N",
                "Step 2: Calculate opposite = 7 - N",
                "Step 3: Return opposite"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Single arithmetic operation",
            space: "O(1)",
            spaceExplanation: "No extra space needed"
        },
        
      solutions: {
    c: {
        code: `#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);
    printf("%d", 7-n);
}`
    },

    cpp: {
        code: `#include <iostream>
using namespace std;
int main() {
    int n; cin >> n;
    cout << 7-n;
}`
    },

    java: {
        code: `import java.util.*;
public class Dice {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        System.out.println(7-n);
    }
}`
    },

    python: {
        code: `n = int(input())
print(7-n)`
    },

    javascript: {
        code: `const rl=require("readline").createInterface({input:process.stdin,output:process.stdout});
rl.question("",n=>{console.log(7-Number(n)); rl.close();});`
    }
},

        
        relatedTopics: ["Mathematical patterns", "Combinatorics", "Game theory"],
        
        commonMistakes: [
            {
                mistake: "Using complex conditional statements",
                why: "Unnecessary when simple formula exists",
                correct: "Use formula: 7 - N"
            },
            {
                mistake: "Not validating input range",
                why: "Dice only has faces 1-6",
                correct: "Check if 1 <= N <= 6"
            }
        ],
        
        practiceQuestions: [
            "Find sum of all opposite face pairs",
            "Given two adjacent faces, find possible third faces",
            "Calculate probability of getting opposite faces in two rolls"
        ]
    },

    // PROBLEM 8: Nth Term of AP
    {
        id: 8,
        title: "Nth Term of Arithmetic Progression",
        difficulty: "basic",
        category: "Math",
        
        problemStatement: "Given the first term (a), common difference (d), and N, find the Nth term of an arithmetic progression.",
        
        examples: [
            {
                input: "a = 2, d = 3, N = 5",
                output: "14",
                explanation: "AP: 2, 5, 8, 11, 14. The 5th term is 14"
            },
            {
                input: "a = 10, d = -2, N = 4",
                output: "4",
                explanation: "AP: 10, 8, 6, 4. The 4th term is 4"
            },
            {
                input: "a = 1, d = 0, N = 100",
                output: "1",
                explanation: "All terms are 1 when d = 0"
            }
        ],
        
        explanation: {
            concept: "An <strong>Arithmetic Progression (AP)</strong> is a sequence where the difference between consecutive terms is constant. Formula for Nth term: <strong>T<sub>n</sub> = a + (n-1)×d</strong>",
            
            approach: [
                "Identify: a (first term), d (common difference), n (term number)",
                "Apply formula: T_n = a + (n-1) × d",
                "Calculate and return the result"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example: a = 2, d = 3, N = 5</h4>
                    <div class="ap-sequence">
                        <div class="term">T₁ = 2</div>
                        <div class="arrow">+3 →</div>
                        <div class="term">T₂ = 5</div>
                        <div class="arrow">+3 →</div>
                        <div class="term">T₃ = 8</div>
                        <div class="arrow">+3 →</div>
                        <div class="term">T₄ = 11</div>
                        <div class="arrow">+3 →</div>
                        <div class="term highlight">T₅ = 14</div>
                    </div>
                    
                    <h4>Using Formula:</h4>
                    <div class="calculation">
                        T₅ = a + (n-1) × d<br>
                        T₅ = 2 + (5-1) × 3<br>
                        T₅ = 2 + 4 × 3<br>
                        T₅ = 2 + 12<br>
                        T₅ = 14
                    </div>
                    
                    <h4>Formula Breakdown:</h4>
                    <div class="formula-explain">
                        <div>a = first term</div>
                        <div>d = common difference</div>
                        <div>(n-1) = number of steps from first term</div>
                        <div>(n-1)×d = total progression from first term</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input a (first term), d (common difference), n (term number)",
                "Step 2: Calculate T_n = a + (n - 1) × d",
                "Step 3: Return T_n"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Direct formula application, constant time",
            space: "O(1)",
            spaceExplanation: "Only storing the result"
        },
        
       solutions: {
    c: {
        code: `#include <stdio.h>
int main() {
    int a,d,n;
    scanf("%d %d %d",&a,&d,&n);
    printf("%d", a+(n-1)*d);
}`
    },

    cpp: {
        code: `#include <iostream>
using namespace std;
int main() {
    int a,d,n;
    cin>>a>>d>>n;
    cout<<a+(n-1)*d;
}`
    },

    java: {
        code: `import java.util.*;
public class AP {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int a=sc.nextInt(), d=sc.nextInt(), n=sc.nextInt();
        System.out.println(a+(n-1)*d);
    }
}`
    },

    python: {
        code: `a,d,n=map(int,input().split())
print(a+(n-1)*d)`
    },

    javascript: {
        code: `const rl=require("readline").createInterface({input:process.stdin,output:process.stdout});
rl.question("Enter a d n: ",i=>{
    let [a,d,n]=i.split(" ").map(Number);
    console.log(a+(n-1)*d);
    rl.close();
});`
    }
},

        
        relatedTopics: ["Arithmetic progression", "Sequences and series", "Linear functions"],
        
        commonMistakes: [
            {
                mistake: "Using n instead of (n-1) in formula",
                why: "We need (n-1) steps to reach nth term from first term",
                correct: "Use a + (n-1) × d, not a + n × d"
            },
            {
                mistake: "Confusing AP with GP (Geometric Progression)",
                why: "GP uses multiplication, AP uses addition",
                correct: "AP: constant difference, GP: constant ratio"
            }
        ],
        
        practiceQuestions: [
            "Find sum of first N terms of AP",
            "Check if a number is part of given AP",
            "Find number of terms in AP given first, last, and common difference"
        ]
    },

    // ==================== EASY PROBLEMS (9-31) ====================
    
    // PROBLEM 9: Sum of Digits
    {
        id: 9,
        title: "Sum of Digits",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given an integer N, find the sum of its digits.",
        
        examples: [
            {
                input: "N = 12345",
                output: "15",
                explanation: "1 + 2 + 3 + 4 + 5 = 15"
            },
            {
                input: "N = 9876",
                output: "30",
                explanation: "9 + 8 + 7 + 6 = 30"
            },
            {
                input: "N = 100",
                output: "1",
                explanation: "1 + 0 + 0 = 1"
            }
        ],
        
        explanation: {
            concept: "Extract each digit using modulo 10 operation, add to sum, then remove the digit using integer division by 10. Repeat until number becomes 0.",
            
            approach: [
                "Initialize sum = 0",
                "While N > 0:",
                "  - Extract last digit using N % 10",
                "  - Add digit to sum",
                "  - Remove last digit using N = N / 10",
                "Return sum"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example: N = 12345</h4>
                    <div class="digit-extraction">
                        <div class="step">
                            <div>N = 12345, digit = 12345 % 10 = 5</div>
                            <div>sum = 0 + 5 = 5, N = 12345 / 10 = 1234</div>
                        </div>
                        <div class="step">
                            <div>N = 1234, digit = 1234 % 10 = 4</div>
                            <div>sum = 5 + 4 = 9, N = 1234 / 10 = 123</div>
                        </div>
                        <div class="step">
                            <div>N = 123, digit = 123 % 10 = 3</div>
                            <div>sum = 9 + 3 = 12, N = 123 / 10 = 12</div>
                        </div>
                        <div class="step">
                            <div>N = 12, digit = 12 % 10 = 2</div>
                            <div>sum = 12 + 2 = 14, N = 12 / 10 = 1</div>
                        </div>
                        <div class="step">
                            <div>N = 1, digit = 1 % 10 = 1</div>
                            <div>sum = 14 + 1 = 15, N = 1 / 10 = 0</div>
                        </div>
                        <div class="result">Final sum = 15</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Initialize sum = 0",
                "Step 2: While N != 0:",
                "  a. digit = N % 10",
                "  b. sum = sum + digit",
                "  c. N = N / 10",
                "Step 3: Return sum"
            ]
        },
        
        complexity: {
            time: "O(d) where d is number of digits",
            timeExplanation: "We process each digit exactly once. d = log₁₀(N)",
            space: "O(1)",
            spaceExplanation: "Only using a few variables"
        },
        
       solutions: {
  c: {
    code: `#include <stdio.h>
int main() {
    int n, sum = 0;
    scanf("%d", &n);
    n = n < 0 ? -n : n;
    while(n) {
        sum += n % 10;
        n /= 10;
    }
    printf("%d", sum);
    return 0;
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main() {
    int n, sum = 0;
    cin >> n;
    n = abs(n);
    while(n) {
        sum += n % 10;
        n /= 10;
    }
    cout << sum;
}`
  },
  java: {
    code: `import java.util.*;
class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Math.abs(sc.nextInt());
        int sum = 0;
        while(n > 0) {
            sum += n % 10;
            n /= 10;
        }
        System.out.println(sum);
    }
}`
  },
  python: {
    code: `n = abs(int(input()))
s = 0
while n:
    s += n % 10
    n //= 10
print(s)`
  },
  javascript: {
    code: `const n = Math.abs(Number(prompt()));
let sum = 0, x = n;
while(x){
  sum += x % 10;
  x = Math.floor(x/10);
}
console.log(sum);`
  }
},

        
        relatedTopics: ["Digit manipulation", "Modulo operator", "Integer division"],
        
        commonMistakes: [
            {
                mistake: "Not handling negative numbers",
                why: "Modulo of negative numbers can cause issues",
                correct: "Take absolute value: n = abs(n)"
            },
            {
                mistake: "Using floating point division",
                why: "Can introduce precision errors",
                correct: "Use integer division: n //= 10 or n = n / 10 (int)"
            }
        ],
        
        practiceQuestions: [
            "Find product of digits instead of sum",
            "Count number of digits in a number",
            "Find difference between sum of digits at even and odd positions"
        ]
    },

    // PROBLEM 10: Reverse Digits
    {
        id: 10,
        title: "Reverse Digits",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given an integer N, reverse its digits.",
        
        examples: [
            {
                input: "N = 12345",
                output: "54321",
                explanation: "Reverse of 12345 is 54321"
            },
            {
                input: "N = 1200",
                output: "21",
                explanation: "Reverse of 1200 is 0021 which is 21"
            },
            {
                input: "N = 7",
                output: "7",
                explanation: "Single digit remains same"
            }
        ],
        
        explanation: {
            concept: "Extract digits from right to left and build the reversed number by multiplying by 10 and adding each digit.",
            
            approach: [
                "Initialize reverse = 0",
                "While N > 0:",
                "  - Extract last digit: digit = N % 10",
                "  - Add to reverse: reverse = reverse × 10 + digit",
                "  - Remove last digit: N = N / 10",
                "Return reverse"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example: N = 12345</h4>
                    <div class="reverse-steps">
                        <div class="step">
                            <div>N = 12345, digit = 5</div>
                            <div>reverse = 0 × 10 + 5 = 5</div>
                            <div>N = 1234</div>
                        </div>
                        <div class="step">
                            <div>N = 1234, digit = 4</div>
                            <div>reverse = 5 × 10 + 4 = 54</div>
                            <div>N = 123</div>
                        </div>
                        <div class="step">
                            <div>N = 123, digit = 3</div>
                            <div>reverse = 54 × 10 + 3 = 543</div>
                            <div>N = 12</div>
                        </div>
                        <div class="step">
                            <div>N = 12, digit = 2</div>
                            <div>reverse = 543 × 10 + 2 = 5432</div>
                            <div>N = 1</div>
                        </div>
                        <div class="step">
                            <div>N = 1, digit = 1</div>
                            <div>reverse = 5432 × 10 + 1 = 54321</div>
                            <div>N = 0</div>
                        </div>
                        <div class="result">Final reverse = 54321</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Initialize reverse = 0",
                "Step 2: While N != 0:",
                "  a. Extract digit = N % 10",
                "  b. reverse = reverse × 10 + digit",
                "  c. N = N / 10",
                "Step 3: Return reverse"
            ]
        },
        
        complexity: {
            time: "O(d) where d is number of digits",
            timeExplanation: "Process each digit once",
            space: "O(1)",
            spaceExplanation: "Only using constant extra space"
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int main() {
    int n, rev = 0;
    scanf("%d", &n);
    while(n) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    printf("%d", rev);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main() {
    int n, rev = 0;
    cin >> n;
    while(n) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    cout << rev;
}`
  },
  java: {
    code: `import java.util.*;
class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), rev = 0;
        while(n != 0) {
            rev = rev * 10 + n % 10;
            n /= 10;
        }
        System.out.println(rev);
    }
}`
  },
  python: {
    code: `n = int(input())
rev = 0
while n:
    rev = rev*10 + n%10
    n//=10
print(rev)`
  },
  javascript: {
    code: `let n = Number(prompt());
let rev = 0;
while(n){
  rev = rev*10 + n%10;
  n = Math.floor(n/10);
}
console.log(rev);`
  }
},

        
        relatedTopics: ["Digit manipulation", "Palindrome checking", "Number theory"],
        
        commonMistakes: [
            {
                mistake: "Integer overflow when reversing large numbers",
                why: "Reversed number might exceed integer limits",
                correct: "Check for overflow before multiplying by 10"
            },
            {
                mistake: "Not handling trailing zeros correctly",
                why: "1200 reversed becomes 21, not 0021",
                correct: "This is correct behavior - leading zeros are dropped"
            }
        ],
        
        practiceQuestions: [
            "Check if a number is palindrome",
            "Add a number and its reverse",
            "Find smallest number whose reverse is divisible by N"
        ]
    },

    // PROBLEM 11: Prime Testing (Already provided in original)
    {
        id: 11,
        title: "Prime Testing",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given an integer N, determine whether it is a prime number or not. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
        
        examples: [
            {
                input: "N = 17",
                output: "Prime",
                explanation: "17 is only divisible by 1 and 17"
            },
            {
                input: "N = 15",
                output: "Not Prime",
                explanation: "15 is divisible by 1, 3, 5, and 15"
            },
            {
                input: "N = 2",
                output: "Prime",
                explanation: "2 is the smallest and only even prime number"
            },
            {
                input: "N = 1",
                output: "Not Prime",
                explanation: "1 is not considered a prime number by definition"
            }
        ],
        
        explanation: {
            concept: "A <strong>prime number</strong> is a number greater than 1 that cannot be formed by multiplying two smaller natural numbers. It has exactly two divisors: 1 and itself.",
            
            approach: [
                "Numbers ≤ 1 are not prime",
                "2 and 3 are prime numbers",
                "Numbers divisible by 2 or 3 are not prime (except 2 and 3)",
                "Check divisibility by numbers of form 6k±1 up to √N",
                "If no divisor found, number is prime"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Why Check Only Up to √N?</h4>
                    <p>If N = a × b, then either a ≤ √N or b ≤ √N</p>
                    <div class="example">
                        <strong>Example: N = 36</strong><br>
                        36 = 6 × 6 → √36 = 6<br>
                        36 = 4 × 9 → 4 < 6 (found divisor before √36)<br>
                        36 = 2 × 18 → 2 < 6 (found divisor before √36)
                    </div>
                    
                    <h4>Checking 17 (Prime):</h4>
                    <div class="check-steps">
                        <div>17 % 2 = 1 ✗ (not divisible)</div>
                        <div>17 % 3 = 2 ✗ (not divisible)</div>
                        <div>17 % 5 = 2 ✗ (not divisible)</div>
                        <div>Stop at 5 because 5 > √17 ≈ 4.1</div>
                        <div class="result">✓ 17 is PRIME</div>
                    </div>
                    
                    <h4>Checking 15 (Not Prime):</h4>
                    <div class="check-steps">
                        <div>15 % 2 = 1 ✗ (not divisible)</div>
                        <div>15 % 3 = 0 ✓ (divisible!)</div>
                        <div class="result">✗ 15 is NOT PRIME</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: If N ≤ 1, return 'Not Prime'",
                "Step 2: If N == 2 or N == 3, return 'Prime'",
                "Step 3: If N is divisible by 2 or 3, return 'Not Prime'",
                "Step 4: Check divisibility by numbers of form 6k±1 from 5 to √N",
                "Step 5: If N is divisible by any number in step 4, return 'Not Prime'",
                "Step 6: If no divisor found, return 'Prime'"
            ],
            
            whyOptimized: "We use the 6k±1 optimization because all primes > 3 are of the form 6k±1. This is because numbers of form 6k, 6k+2, 6k+3, 6k+4 are all composite."
        },
        
        complexity: {
            time: "O(√N)",
            timeExplanation: "We check divisibility up to square root of N",
            space: "O(1)",
            spaceExplanation: "Only using a few variables regardless of input size"
        },
        
       solutions: {
  c: {
    code: `#include <stdio.h>
int main() {
    int n, i;
    scanf("%d", &n);
    if(n <= 1) { printf("Not Prime"); return 0; }
    for(i = 2; i*i <= n; i++)
        if(n % i == 0) { printf("Not Prime"); return 0; }
    printf("Prime");
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main() {
    int n; cin >> n;
    if(n <= 1) { cout << "Not Prime"; return 0; }
    for(int i=2;i*i<=n;i++)
        if(n%i==0){ cout<<"Not Prime"; return 0; }
    cout<<"Prime";
}`
  },
  java: {
    code: `import java.util.*;
class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if(n<=1){ System.out.println("Not Prime"); return; }
        for(int i=2;i*i<=n;i++)
            if(n%i==0){ System.out.println("Not Prime"); return; }
        System.out.println("Prime");
    }
}`
  },
  python: {
    code: `n=int(input())
if n<=1:
    print("Not Prime")
else:
    for i in range(2,int(n**0.5)+1):
        if n%i==0:
            print("Not Prime")
            break
    else:
        print("Prime")`
  },
  javascript: {
    code: `let n=Number(prompt());
if(n<=1){ console.log("Not Prime"); }
else{
  let prime=true;
  for(let i=2;i*i<=n;i++)
    if(n%i===0){ prime=false; break; }
  console.log(prime?"Prime":"Not Prime");
}`
  }
},

        
        relatedTopics: ["Number theory", "Divisibility", "Mathematical algorithms"],
        
        commonMistakes: [
            {
                mistake: "Checking divisibility up to N instead of √N",
                why: "Inefficient - wastes many checks",
                correct: "Check only up to √N"
            },
            {
                mistake: "Not handling special cases like 2 and 3",
                why: "They don't follow the 6k±1 pattern optimization",
                correct: "Return true immediately for 2 and 3"
            }
        ],
        
        practiceQuestions: [
            "Find all prime numbers up to N (Sieve of Eratosthenes)",
            "Find next prime number after N",
            "Find twin primes in range [A, B]"
        ]
    },
// PROBLEM 12: Check power

  {
        id: 12,
        title: "Check Power",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given two positive integers X and Y, determine whether X is a power of Y. A number X is a power of Y if there exists an integer 'n' such that Y raised to the power of n equals X (Y^n = X).",
        
        examples: [
            {
                input: "X = 8, Y = 2",
                output: "True",
                explanation: "2 raised to the power of 3 is 8 (2 * 2 * 2 = 8)"
            },
            {
                input: "X = 27, Y = 3",
                output: "True",
                explanation: "3 raised to the power of 3 is 27 (3 * 3 * 3 = 27)"
            },
            {
                input: "X = 10, Y = 2",
                output: "False",
                explanation: "There is no integer n such that 2^n = 10"
            },
            {
                input: "X = 1, Y = 5",
                output: "True",
                explanation: "Any number raised to the power of 0 is 1 (5^0 = 1)"
            }
        ],
        
        explanation: {
            concept: "To check if <strong>X is a power of Y</strong>, we need to verify if X can be reduced to 1 by repeatedly dividing it by Y without leaving a remainder at any step.",
            
            approach: [
                "If X is 1, return true (since Y^0 = 1 for any Y > 0)",
                "If Y is 1, X must be 1 to be a power",
                "While X is greater than 1, check if X is divisible by Y",
                "If not divisible at any point, it's not a power",
                "Repeatedly divide X by Y",
                "If X eventually becomes 1, return true"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Step-by-Step Division Example:</h4>
                    <p>Checking if <strong>X = 16</strong> is a power of <strong>Y = 2</strong></p>
                    <div class="check-steps">
                        <div class="flow-step">16 % 2 = 0 ✓ (Divide: 16/2 = 8)</div>
                        <div class="flow-step">8 % 2 = 0 ✓ (Divide: 8/2 = 4)</div>
                        <div class="flow-step">4 % 2 = 0 ✓ (Divide: 4/2 = 2)</div>
                        <div class="flow-step">2 % 2 = 0 ✓ (Divide: 2/2 = 1)</div>
                        <div class="step result">Reached 1 → TRUE (16 is 2⁴)</div>
                    </div>
                    
                    <h4>Checking if X = 12 is a power of Y = 3:</h4>
                    <div class="check-steps">
                        <div class="flow-step">12 % 3 = 0 ✓ (Divide: 12/3 = 4)</div>
                        <div class="flow-step">4 % 3 = 1 ✗ (Remainder found!)</div>
                        <div class="step result error">Stop → FALSE</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: If X == 1, return True",
                "Step 2: If Y == 1, return False (unless X was 1)",
                "Step 3: While X > 1:",
                "   a. If X % Y != 0, return False",
                "   b. Update X = X / Y",
                "Step 4: If loop finishes and X == 1, return True"
            ],
            
            whyLogarithm: "Mathematically, we could use logarithms: if log_Y(X) is an integer, then X is a power of Y. However, in programming, using a loop is often preferred for integers to avoid floating-point precision errors."
        },
        
        complexity: {
            time: "O(log_Y X)",
            timeExplanation: "The number of divisions is proportional to the logarithm of X with base Y",
            space: "O(1)",
            spaceExplanation: "Only uses a constant amount of extra space"
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int x,y;
    scanf("%d %d",&x,&y);
    if(x==1){ printf("True"); return 0; }
    if(y==1){ printf("False"); return 0; }
    while(x>1){
        if(x%y!=0){ printf("False"); return 0; }
        x/=y;
    }
    printf("True");
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int x,y; cin>>x>>y;
    if(x==1){ cout<<"True"; return 0; }
    if(y==1){ cout<<"False"; return 0; }
    while(x>1){
        if(x%y!=0){ cout<<"False"; return 0; }
        x/=y;
    }
    cout<<"True";
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int x=sc.nextInt(), y=sc.nextInt();
        if(x==1){ System.out.println("True"); return; }
        if(y==1){ System.out.println("False"); return; }
        while(x>1){
            if(x%y!=0){ System.out.println("False"); return; }
            x/=y;
        }
        System.out.println("True");
    }
}`
  },
  python: {
    code: `x,y=map(int,input().split())
if x==1: print(True)
elif y==1: print(False)
else:
    while x>1:
        if x%y!=0:
            print(False); break
        x//=y
    else:
        print(True)`
  },
  javascript: {
    code: `let [x,y]=prompt().split(" ").map(Number);
if(x===1) console.log(true);
else if(y===1) console.log(false);
else{
  while(x>1){
    if(x%y!==0){ console.log(false); return; }
    x/=y;
  }
  console.log(true);
}`
  }
},

        
        relatedTopics: ["Logarithms", "Iterative algorithms", "Base conversion logic"],
        
        commonMistakes: [
            {
                mistake: "Not handling X = 1",
                why: "Any number Y^0 is 1, so 1 is always a power of Y",
                correct: "Add a base case to return true if X is 1"
            },
            {
                mistake: "Infinite loop when Y = 1",
                why: "If Y is 1, X / Y never decreases",
                correct: "Handle Y = 1 as a separate condition"
            }
        ],
        
        practiceQuestions: [
            "Check if a number is a power of 2 using bit manipulation",
            "Find the smallest power of Y greater than or equal to X",
            "Calculate log base Y of X without built-in functions"
        ]
    },
    // ========================================
    // PROBLEM 13: Distance between Two Points
    // ========================================
    {
        id: 13,
        title: "Distance between Two Points",
        difficulty: "easy",
        category: "Geometry",
        
        problemStatement: "Given the coordinates of two points (x1, y1) and (x2, y2) in a 2D plane, calculate the Euclidean distance between them.",
        
        examples: [
            {
                input: "x1 = 0, y1 = 0, x2 = 3, y2 = 4",
                output: "5.00",
                explanation: "Distance = √((3-0)² + (4-0)²) = √(9 + 16) = √25 = 5"
            },
            {
                input: "x1 = 1, y1 = 1, x2 = 4, y2 = 5",
                output: "5.00",
                explanation: "Distance = √((4-1)² + (5-1)²) = √(3² + 4²) = 5"
            }
        ],
        
        explanation: {
            concept: "The <strong>Euclidean distance</strong> between two points is the length of the line segment connecting them. It is derived from the Pythagorean theorem.",
            
            approach: [
                "Calculate the difference between the x-coordinates: Δx = (x2 - x1)",
                "Calculate the difference between the y-coordinates: Δy = (y2 - y1)",
                "Square both differences: (Δx)² and (Δy)²",
                "Sum the squares and find the square root: √(Δx² + Δy²)"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Pythagorean Visualization:</h4>
                    <div class="geometry-viz">
                        <p>Point A: (0,0), Point B: (3,4)</p>
                        <div class="triangle-diag">
                            <span>Base (Δx) = 3</span><br>
                            <span>Height (Δy) = 4</span><br>
                            <span class="result">Hypotenuse (Dist) = √(3² + 4²) = 5</span>
                        </div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input coordinates (x1, y1) and (x2, y2)",
                "Step 2: Compute dx = x2 - x1",
                "Step 3: Compute dy = y2 - y1",
                "Step 4: Distance = sqrt(dx*dx + dy*dy)",
                "Step 5: Return distance"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "The calculation involves a fixed number of arithmetic operations.",
            space: "O(1)",
            spaceExplanation: "No extra space is needed regardless of the input values."
        },
        
       solutions: {
  c: {
    code: `#include <stdio.h>
#include <math.h>
int main(){
    double x1,y1,x2,y2;
    scanf("%lf %lf %lf %lf",&x1,&y1,&x2,&y2);
    printf("%.2f",sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));
}`
  },
  cpp: {
    code: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;
int main(){
    double x1,y1,x2,y2;
    cin>>x1>>y1>>x2>>y2;
    cout<<fixed<<setprecision(2)<<hypot(x2-x1,y2-y1);
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        double x1=sc.nextDouble(), y1=sc.nextDouble();
        double x2=sc.nextDouble(), y2=sc.nextDouble();
        System.out.printf("%.2f",Math.hypot(x2-x1,y2-y1));
    }
}`
  },
  python: {
    code: `import math
x1,y1,x2,y2=map(float,input().split())
print(f"{math.hypot(x2-x1,y2-y1):.2f}")`
  },
  javascript: {
    code: `let [x1,y1,x2,y2]=prompt().split(" ").map(Number);
console.log(Math.hypot(x2-x1,y2-y1).toFixed(2));`
  }
},

        
        relatedTopics: ["Coordinate Geometry", "Pythagorean Theorem", "Floating point precision"],
        
        commonMistakes: [
            {
                mistake: "Squaring without parentheses",
                why: "-3^2 in some calculators might result in -9 instead of 9",
                correct: "Always ensure differences are squared as (x2-x1) * (x2-x1)"
            },
            {
                mistake: "Integer division",
                why: "If coordinates are integers, distance might lose decimals",
                correct: "Store and compute results in float/double types"
            }
        ],
        
        practiceQuestions: [
            "Find the distance between two points in 3D space",
            "Calculate Manhattan distance (|x1-x2| + |y1-y2|)",
            "Find the nearest point to a target from a given list"
        ]
    },

    // ========================================
    // PROBLEM 14: Valid Triangle
    // ========================================
    {
        id: 14,
        title: "Valid Triangle",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given three sides A, B, and C, determine if they can form a valid triangle.",
        
        examples: [
            {
                input: "A = 3, B = 4, C = 5",
                output: "Valid",
                explanation: "3+4 > 5, 4+5 > 3, and 3+5 > 4. All conditions met."
            },
            {
                input: "A = 1, B = 10, C = 12",
                output: "Invalid",
                explanation: "1+10 is only 11, which is not greater than 12."
            }
        ],
        
        explanation: {
            concept: "According to the <strong>Triangle Inequality Theorem</strong>, the sum of any two sides of a triangle must be strictly greater than the third side.",
            
            approach: [
                "Check if (A + B > C)",
                "Check if (B + C > A)",
                "Check if (A + C > B)",
                "If all three conditions are true, the triangle is valid."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Visualization:</h4>
                    <div class="case">
                        <strong>Case 1: (3, 4, 10)</strong><br>
                        Sides 3 and 4 cannot reach each other to close the gap of 10.<br>
                        <span class="error">3 + 4 < 10 → IMPOSSIBLE</span>
                    </div>
                    <div class="case">
                        <strong>Case 2: (3, 4, 5)</strong><br>
                        Sides 3 and 4 are long enough to meet at a point above 5.<br>
                        <span class="success">3 + 4 > 5 → VALID</span>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input three side lengths A, B, C",
                "Step 2: If (A+B > C) AND (B+C > A) AND (A+C > B)",
                "Step 3: Return 'Valid'",
                "Step 4: Else return 'Invalid'"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "A constant number of comparisons (3) are performed.",
            space: "O(1)",
            spaceExplanation: "No additional data structures are used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int a,b,c;
    scanf("%d %d %d",&a,&b,&c);
    printf((a+b>c && a+c>b && b+c>a)?"Valid":"Invalid");
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int a,b,c; cin>>a>>b>>c;
    cout<<(a+b>c && a+c>b && b+c>a?"Valid":"Invalid");
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int a=sc.nextInt(), b=sc.nextInt(), c=sc.nextInt();
        System.out.println(a+b>c && a+c>b && b+c>a?"Valid":"Invalid");
    }
}`
  },
  python: {
    code: `a,b,c=map(int,input().split())
print("Valid" if a+b>c and a+c>b and b+c>a else "Invalid")`
  },
  javascript: {
    code: `let [a,b,c]=prompt().split(" ").map(Number);
console.log(a+b>c && a+c>b && b+c>a?"Valid":"Invalid");`
  }
},

        
        relatedTopics: ["Geometry", "Logical operators"],
        
        commonMistakes: [
            {
                mistake: "Using >= instead of >",
                why: "If a+b = c, the triangle is 'degenerate' (a flat line), not a real triangle",
                correct: "The sum must be strictly greater"
            }
        ],
        
        practiceQuestions: [
            "Classify triangle as Equilateral, Isosceles, or Scalene",
            "Check validity using angles (Sum must be 180°)",
            "Find the area using Heron's formula if valid"
        ]
    },

    // ========================================
    // PROBLEM 15: Overlapping Rectangles
    // ========================================
    {
        id: 15,
        title: "Overlapping Rectangles",
        difficulty: "easy",
        category: "Geometry",
        
        problemStatement: "Given two axis-aligned rectangles defined by their top-left and bottom-right coordinates, determine if they overlap.",
        
        examples: [
            {
                input: "Rect1: (0,10) to (10,0), Rect2: (5,5) to (15,-5)",
                output: "Overlap",
                explanation: "Rect2 starts inside Rect1."
            }
        ],
        
        explanation: {
            concept: "Two rectangles <strong>do not overlap</strong> if one is strictly to the left, right, above, or below the other.",
            
            approach: [
                "Identify non-overlap conditions:",
                "1. Rect1 is to the left of Rect2",
                "2. Rect1 is to the right of Rect2",
                "3. Rect1 is above Rect2",
                "4. Rect1 is below Rect2",
                "If none of these are true, they MUST overlap."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Logic Diagram:</h4>
                    <p>Rect overlap is usually checked by 'Axis-Aligned Bounding Box' (AABB) logic.</p>
                    <div class="code-logic">
                        IF (L1.x > R2.x OR L2.x > R1.x) -> No overlap (Horizontal gap)<br>
                        IF (R1.y > L2.y OR R2.y > L1.y) -> No overlap (Vertical gap)
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input L1, R1 (Rect1) and L2, R2 (Rect2)",
                "Step 2: If L1.x >= R2.x or L2.x >= R1.x, return False",
                "Step 3: If R1.y >= L2.y or R2.y >= L1.y, return False",
                "Step 4: Otherwise, return True"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Comparison of 4 coordinates.",
            space: "O(1)",
            spaceExplanation: "Constant storage."
        },
        
solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int l1x,l1y,r1x,r1y,l2x,l2y,r2x,r2y;
    scanf("%d %d %d %d %d %d %d %d",&l1x,&l1y,&r1x,&r1y,&l2x,&l2y,&r2x,&r2y);
    if(l1x>=r2x||l2x>=r1x||r1y>=l2y||r2y>=l1y)
        printf("No Overlap");
    else printf("Overlap");
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int l1x,l1y,r1x,r1y,l2x,l2y,r2x,r2y;
    cin>>l1x>>l1y>>r1x>>r1y>>l2x>>l2y>>r2x>>r2y;
    cout<<(l1x>=r2x||l2x>=r1x||r1y>=l2y||r2y>=l1y?"No Overlap":"Overlap");
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int l1x=sc.nextInt(),l1y=sc.nextInt(),r1x=sc.nextInt(),r1y=sc.nextInt();
        int l2x=sc.nextInt(),l2y=sc.nextInt(),r2x=sc.nextInt(),r2y=sc.nextInt();
        System.out.println(l1x>=r2x||l2x>=r1x||r1y>=l2y||r2y>=l1y?"No Overlap":"Overlap");
    }
}`
  },
  python: {
    code: `l1x,l1y,r1x,r1y,l2x,l2y,r2x,r2y=map(int,input().split())
print("No Overlap" if l1x>=r2x or l2x>=r1x or r1y>=l2y or r2y>=l1y else "Overlap")`
  },
  javascript: {
    code: `let a=prompt().split(" ").map(Number);
let [l1x,l1y,r1x,r1y,l2x,l2y,r2x,r2y]=a;
console.log(l1x>=r2x||l2x>=r1x||r1y>=l2y||r2y>=l1y?"No Overlap":"Overlap");`
  }
},
    
        
        relatedTopics: ["Collision detection", "Bounding boxes"],
        
        commonMistakes: [
            {
                mistake: "Assuming top-left is (0,0) and Y increases upwards",
                why: "In computer graphics, Y usually increases downwards",
                correct: "Check coordinate system before implementing logic"
            }
        ],
        
        practiceQuestions: [
            "Find the area of intersection between two rectangles",
            "Check if one rectangle is entirely inside another",
            "Calculate the Union area of two rectangles"
        ]
    },

    // ========================================
    // PROBLEM 16: Factorial of a Number
    // ========================================
    {
        id: 16,
        title: "Factorial of a Number",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given a non-negative integer N, calculate its factorial (N!). Factorial of N is the product of all positive integers less than or equal to N.",
        
        examples: [
            {
                input: "N = 5",
                output: "120",
                explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120"
            },
            {
                input: "N = 0",
                output: "1",
                explanation: "By convention, 0! is defined as 1"
            }
        ],
        
        explanation: {
            concept: "Factorial is a cumulative product. <strong>N! = N × (N-1)!</strong>",
            
            approach: [
                "Initialize a result variable to 1",
                "Loop from 1 to N (or N down to 1)",
                "Multiply the result by the current loop number",
                "Return the final result"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Trace of 4!:</h4>
                    <div class="step-trace">
                        1. Start with 1<br>
                        2. 1 × 2 = 2<br>
                        3. 2 × 3 = 6<br>
                        4. 6 × 4 = 24<br>
                        <span class="result">Final: 24</span>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Set fact = 1",
                "Step 2: For i = 1 to N:",
                "   fact = fact * i",
                "Step 3: Return fact"
            ]
        },
        
        complexity: {
            time: "O(N)",
            timeExplanation: "We perform N multiplications in a single loop.",
            space: "O(1)",
            spaceExplanation: "Only one variable is used to store the product (Iterative)."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int main() {
    int n;
    long long fact = 1;
    scanf("%d", &n);
    for(int i = 1; i <= n; i++) fact *= i;
    printf("%lld", fact);
    return 0;
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    long long fact = 1;
    cin >> n;
    for(int i = 1; i <= n; i++) fact *= i;
    cout << fact;
}`
  },
  java: {
    code: `import java.util.*;
class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long fact = 1;
        for(int i = 1; i <= n; i++) fact *= i;
        System.out.println(fact);
    }
}`
  },
  python: {
    code: `n = int(input())
fact = 1
for i in range(1, n+1):
    fact *= i
print(fact)`
  },
  javascript: {
    code: `let n = Number(prompt());
let fact = 1;
for(let i=1;i<=n;i++) fact*=i;
console.log(fact);`
  }
},

        
        relatedTopics: ["Recursion", "Combinations (nCr)", "Permutations (nPr)"],
        
        commonMistakes: [
            {
                mistake: "Integer Overflow",
                why: "Factorials grow extremely fast (13! exceeds 32-bit integer)",
                correct: "Use 64-bit integers (long long/long) or BigInt"
            },
            {
                mistake: "Incorrect 0! handling",
                why: "Thinking 0! is 0",
                correct: "Return 1 for N = 0"
            }
        ],
        
        practiceQuestions: [
            "Count trailing zeros in N!",
            "Find the first non-zero digit from the right in N!",
            "Implement Big Factorial for N > 50"
        ]
    },

    // ========================================
    // PROBLEM 17: Pair Cube Count
    // ========================================
    {
        id: 17,
        title: "Pair Cube Count",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given a positive integer N, count the number of pairs (a, b) such that a³ + b³ = N, where a and b are positive integers.",
        
        examples: [
            {
                input: "N = 9",
                output: "2",
                explanation: "Pairs are (1, 2) and (2, 1) because 1³ + 2³ = 1 + 8 = 9 and 2³ + 1³ = 8 + 1 = 9"
            },
            {
                input: "N = 28",
                output: "2",
                explanation: "Pairs are (1, 3) and (3, 1) because 1³ + 3³ = 1 + 27 = 28"
            },
            {
                input: "N = 2",
                output: "1",
                explanation: "Only (1, 1) satisfies 1³ + 1³ = 2"
            }
        ],
        
        explanation: {
            concept: "We need to find two integers whose cubes sum up to exactly N. Since a and b are positive, the maximum value either can take is the <strong>cube root of N</strong>.",
            
            approach: [
                "Iterate through all possible values of 'a' starting from 1.",
                "The loop should continue as long as a³ < N.",
                "For each 'a', calculate the remaining value needed: b_cubed = N - a³.",
                "Check if b_cubed is a perfect cube and if its cube root 'b' is a positive integer.",
                "If it is, increment the count."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Step-by-Step for N = 9:</h4>
                    <div class="check-steps">
                        <div>1. Try a = 1: 1³ = 1. Needed: 9 - 1 = 8. Is 8 a cube? <strong>Yes (2³)</strong>. <span class="success">Pair: (1, 2)</span></div>
                        <div>2. Try a = 2: 2³ = 8. Needed: 9 - 8 = 1. Is 1 a cube? <strong>Yes (1³)</strong>. <span class="success">Pair: (2, 1)</span></div>
                        <div>3. Try a = 3: 3³ = 27. Since 27 > 9, stop.</div>
                        <div class="result">Total Count: 2</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Initialize count = 0",
                "Step 2: For i = 1 to cbrt(N):",
                "   a. Calculate i_cubed = i * i * i",
                "   b. diff = N - i_cubed",
                "   c. If diff > 0 and cbrt(diff) is an integer:",
                "      count = count + 1",
                "Step 3: Return count"
            ]
        },
        
        complexity: {
            time: "O(N^(1/3))",
            timeExplanation: "The loop runs up to the cube root of N.",
            space: "O(1)",
            spaceExplanation: "Only constant extra space is used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <math.h>
int main() {
    int n,count=0;
    scanf("%d",&n);
    for(int i=1;i*i*i<n;i++){
        int diff = n - i*i*i;
        int r = round(cbrt(diff));
        if(r*r*r == diff) count++;
    }
    printf("%d",count);
}`
  },
  cpp: {
    code: `#include <iostream>
#include <cmath>
using namespace std;
int main(){
    int n,count=0;
    cin>>n;
    for(int i=1;i*i*i<n;i++){
        int diff=n-i*i*i;
        int r=round(cbrt(diff));
        if(r*r*r==diff) count++;
    }
    cout<<count;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(),count=0;
        for(int i=1;i*i*i<n;i++){
            int diff=n-i*i*i;
            int r=(int)Math.round(Math.cbrt(diff));
            if(r*r*r==diff) count++;
        }
        System.out.println(count);
    }
}`
  },
  python: {
    code: `n=int(input())
count=0
for i in range(1,int(n**(1/3))+2):
    diff=n-i**3
    if diff>0:
        r=round(diff**(1/3))
        if r**3==diff:
            count+=1
print(count)`
  },
  javascript: {
    code: `let n=Number(prompt());
let count=0;
for(let i=1;i*i*i<n;i++){
  let diff=n-i*i*i;
  let r=Math.round(Math.cbrt(diff));
  if(r*r*r===diff) count++;
}
console.log(count);`
  }

        },
        
        relatedTopics: ["Mathematical logic", "Iterative searching", "Perfect cubes"],
        
        commonMistakes: [
            {
                mistake: "Checking up to N instead of cbrt(N)",
                why: "Highly inefficient; if N=10^9, N steps is too slow while cbrt(N) is only 1000",
                correct: "Stop the loop when i*i*i exceeds N"
            },
            {
                mistake: "Floating point precision errors",
                why: "diff**(1/3) might return 1.999999 instead of 2.0",
                correct: "Use round() or add a small epsilon before floor"
            }
        ],
        
        practiceQuestions: [
            "Find if N can be expressed as sum of two squares",
            "Find all numbers less than N that are 'Taxicab numbers' (sum of two cubes in two different ways)",
            "Count pairs (a, b) where a² + b = N"
        ]
    },

    // ========================================
    // PROBLEM 18: GCD or HCF
    // ========================================
    {
        id: 18,
        title: "GCD or HCF",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given two integers A and B, find their Greatest Common Divisor (GCD), also known as the Highest Common Factor (HCF).",
        
        examples: [
            {
                input: "A = 12, B = 18",
                output: "6",
                explanation: "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. Common: 1, 2, 3, 6. Largest is 6."
            },
            {
                input: "A = 7, B = 5",
                output: "1",
                explanation: "7 and 5 are co-prime; they have no common factors other than 1."
            }
        ],
        
        explanation: {
            concept: "The <strong>GCD</strong> of two numbers is the largest positive integer that divides both numbers without leaving a remainder. The most efficient way to find it is the <strong>Euclidean Algorithm</strong>.",
            
            approach: [
                "Method 1: Euclidean Algorithm (Subtraction). Keep subtracting the smaller number from the larger one until they are equal.",
                "Method 2: Euclidean Algorithm (Modulo). GCD(A, B) is the same as GCD(B, A % B). Continue until the remainder is 0."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Euclidean Algorithm (Modulo) or 48 and 18:</h4>
                    <div class="example-flow">
                        <div class="step">GCD(48, 18)</div>
                        <div class="arrow">→</div>
                        <div class="step">48 % 18 = 12 → GCD(18, 12)</div>
                        <div class="arrow">→</div>
                        <div class="step">18 % 12 = 6 → GCD(12, 6)</div>
                        <div class="arrow">→</div>
                        <div class="step">12 % 6 = 0 → GCD(6, 0)</div>
                        <div class="arrow">→</div>
                        <div class="step result">Result = 6</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: While B is not zero:",
                "   a. temp = B",
                "   b. B = A % B",
                "   c. A = temp",
                "Step 2: Return A"
            ]
        },
        
        complexity: {
            time: "O(log(min(A, B)))",
            timeExplanation: "The values decrease exponentially in the Euclidean algorithm.",
            space: "O(1) for iterative, O(log N) for recursive",
            spaceExplanation: "Iterative uses constant space; recursive uses stack space."
        },
        
       solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int a,b;
    scanf("%d %d",&a,&b);
    while(b!=0){
        int t=b;
        b=a%b;
        a=t;
    }
    printf("%d",a);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int a,b; cin>>a>>b;
    while(b){ int t=b; b=a%b; a=t; }
    cout<<a;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int a=sc.nextInt(),b=sc.nextInt();
        while(b!=0){
            int t=b;
            b=a%b;
            a=t;
        }
        System.out.println(a);
    }
}`
  },
  python: {
    code: `import math
a,b=map(int,input().split())
print(math.gcd(a,b))`
  },
  javascript: {
    code: `let [a,b]=prompt().split(" ").map(Number);
while(b){ [a,b]=[b,a%b]; }
console.log(a);`
  }
},

        
        relatedTopics: ["Euclidean algorithm", "Prime factorization", "LCM"],
        
        commonMistakes: [
            {
                mistake: "Using the subtraction method for very large numbers",
                why: "If A is 10^9 and B is 1, it will take 10^9 subtractions",
                correct: "Use the modulo (%) version for logarithmic time"
            }
        ],
        
        practiceQuestions: [
            "Find GCD of an entire array of numbers",
            "Check if two numbers are co-prime",
            "Solve linear Diophantine equations"
        ]
    },

    // ========================================
    // PROBLEM 19: LCM of Two Numbers
    // ========================================
    {
        id: 19,
        title: "LCM of Two Numbers",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given two integers A and B, find their Least Common Multiple (LCM).",
        
        examples: [
            {
                input: "A = 12, B = 18",
                output: "36",
                explanation: "Multiples of 12: 12, 24, 36, 48... Multiples of 18: 18, 36, 54... Smallest common is 36."
            }
        ],
        
        explanation: {
            concept: "The <strong>LCM</strong> is the smallest positive integer that is divisible by both A and B. It is closely related to the GCD.",
            
            approach: [
                "Calculate the GCD of A and B using the Euclidean algorithm.",
                "Use the mathematical relationship: <strong>(A × B) = GCD(A, B) × LCM(A, B)</strong>",
                "Therefore, <strong>LCM(A, B) = (A × B) / GCD(A, B)</strong>"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Math Relationship:</h4>
                    <p>A = 12, B = 18</p>
                    <p>GCD(12, 18) = 6</p>
                    <div class="formula">
                        LCM = (12 × 18) / 6 <br>
                        LCM = 216 / 6 = 36
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Compute g = GCD(A, B)",
                "Step 2: LCM = (A * B) / g",
                "Step 3: Return LCM"
            ]
        },
        
        complexity: {
            time: "O(log(min(A, B)))",
            timeExplanation: "Dominated by the GCD calculation.",
            space: "O(1)",
            spaceExplanation: "No extra memory used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int gcd(int a,int b){
    while(b){ int t=b; b=a%b; a=t; }
    return a;
}
int main(){
    int a,b;
    scanf("%d %d",&a,&b);
    printf("%d",(a/gcd(a,b))*b);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int gcd(int a,int b){ return b?gcd(b,a%b):a; }
int main(){
    int a,b; cin>>a>>b;
    cout<<(a/gcd(a,b))*b;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    static int gcd(int a,int b){ return b==0?a:gcd(b,a%b); }
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int a=sc.nextInt(),b=sc.nextInt();
        System.out.println((a/gcd(a,b))*b);
    }
}`
  },
  python: {
    code: `import math
a,b=map(int,input().split())
print(abs(a*b)//math.gcd(a,b))`
  },
  javascript: {
    code: `let [a,b]=prompt().split(" ").map(Number);
const gcd=(x,y)=>y?gcd(y,x%y):x;
console.log((a/gcd(a,b))*b);`
  }
},

        
        relatedTopics: ["GCD", "Number theory", "Prime factors"],
        
        commonMistakes: [
            {
                mistake: "Multiplying A and B first",
                why: "A * B can cause integer overflow before the division by GCD",
                correct: "Divide one number by GCD first: (A / GCD) * B"
            }
        ],
        
        practiceQuestions: [
            "Find LCM of an array of integers",
            "Check if LCM(a, b) is equal to a*b",
            "Find the smallest number divisible by all numbers from 1 to 20"
        ]
    },

    // ========================================
    // PROBLEM 20: Perfect Number
    // ========================================
    {
        id: 20,
        title: "Perfect Number",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given a number N, determine if it is a Perfect Number. A perfect number is a positive integer that is equal to the sum of its proper divisors (excluding the number itself).",
        
        examples: [
            {
                input: "N = 6",
                output: "True",
                explanation: "Divisors of 6 are 1, 2, and 3. 1 + 2 + 3 = 6."
            },
            {
                input: "N = 28",
                output: "True",
                explanation: "Divisors of 28 are 1, 2, 4, 7, and 14. 1 + 2 + 4 + 7 + 14 = 28."
            },
            {
                input: "N = 10",
                output: "False",
                explanation: "Divisors are 1, 2, 5. 1 + 2 + 5 = 8 ≠ 10."
            }
        ],
        
        explanation: {
            concept: "A <strong>Perfect Number</strong> is essentially a number that is half the sum of all its positive divisors (including itself).",
            
            approach: [
                "Find all divisors of N except N.",
                "To optimize, find divisors in pairs up to √N.",
                "Sum these divisors.",
                "If the sum equals N, it is a perfect number."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Perfect Number Check (28):</h4>
                    <ul class="check-steps">
                        <li>1 is a divisor. Sum = 1</li>
                        <li>2 is a divisor, so 28/2 = 14 is also a divisor. Sum = 1+2+14 = 17</li>
                        <li>4 is a divisor, so 28/4 = 7 is also a divisor. Sum = 17+4+7 = 28</li>
                        <li>5, 6 are not divisors. Stop at √28 ≈ 5.2</li>
                        <li class="result">Final Sum = 28 → TRUE</li>
                    </ul>
                </div>
            `,
            
            algorithm: [
                "Step 1: If N <= 1, return False",
                "Step 2: Initialize sum = 1 (1 is always a proper divisor)",
                "Step 3: For i from 2 to sqrt(N):",
                "   a. If N % i == 0:",
                "      i. sum = sum + i",
                "      ii. if (i*i != N) sum = sum + (N / i)",
                "Step 4: Return sum == N"
            ]
        },
        
        complexity: {
            time: "O(√N)",
            timeExplanation: "We only iterate up to the square root of N to find all divisors.",
            space: "O(1)",
            spaceExplanation: "Only uses one sum variable."
        },
        
     solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int n,sum=1;
    scanf("%d",&n);
    if(n<=1){ printf("False"); return 0; }
    for(int i=2;i*i<=n;i++){
        if(n%i==0){
            sum+=i;
            if(i*i!=n) sum+=n/i;
        }
    }
    printf(sum==n?"True":"False");
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int n; cin>>n;
    if(n<=1){ cout<<"False"; return 0; }
    int sum=1;
    for(int i=2;i*i<=n;i++){
        if(n%i==0){
            sum+=i;
            if(i*i!=n) sum+=n/i;
        }
    }
    cout<<(sum==n?"True":"False");
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if(n<=1){ System.out.println("False"); return; }
        int sum=1;
        for(int i=2;i*i<=n;i++){
            if(n%i==0){
                sum+=i;
                if(i*i!=n) sum+=n/i;
            }
        }
        System.out.println(sum==n);
    }
}`
  },
  python: {
    code: `n=int(input())
if n<=1:
    print(False)
else:
    s=1
    for i in range(2,int(n**0.5)+1):
        if n%i==0:
            s+=i
            if i*i!=n:
                s+=n//i
    print(s==n)`
  },
  javascript: {
    code: `let n=Number(prompt());
if(n<=1){ console.log(false); }
else{
  let sum=1;
  for(let i=2;i*i<=n;i++){
    if(n%i===0){
      sum+=i;
      if(i*i!==n) sum+=n/i;
    }
  }
  console.log(sum===n);
}`
  }
},

        relatedTopics: ["Divisor theory", "Square root optimization", "Number theory"],
        
        commonMistakes: [
            {
                mistake: "Starting sum at 0 and including N in the loop",
                why: "Proper divisors exclude the number itself",
                correct: "Either exclude N from the sum or check if sum/2 == N"
            },
            {
                mistake: "Checking divisors up to N",
                why: "O(N) is too slow for large values like 33,550,336 (the 5th perfect number)",
                correct: "Always use the O(√N) optimization"
            }
        ],
        
        practiceQuestions: [
            "Find all perfect numbers in the range [1, 10000]",
            "Check if a number is 'Abundant' (sum of divisors > N)",
            "Check if a number is 'Deficient' (sum of divisors < N)"
        ]
    },

    // ========================================
    // PROBLEM 21: Add Two Fractions
    // ========================================
    {
        id: 21,
        title: "Add Two Fraction",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given two fractions represented by numerator and denominator, add them and display the result in its simplest form.",
        
        examples: [
            {
                input: "n1=1, d1=2, n2=3, d2=2",
                output: "2/1",
                explanation: "1/2 + 3/2 = 4/2, which simplifies to 2/1"
            },
            {
                input: "n1=1, d1=3, n2=3, d1=9",
                output: "2/3",
                explanation: "1/3 + 3/9 = 1/3 + 1/3 = 2/3"
            }
        ],
        
        explanation: {
            concept: "To add two fractions $\\frac{a}{b} + \\frac{c}{d}$, we find a common denominator: $\\frac{ad + bc}{bd}$. Finally, we simplify by dividing both the numerator and denominator by their **Greatest Common Divisor (GCD)**.",
            
            approach: [
                "Find the numerator of the result: `resNum = (n1 * d2) + (n2 * d1)`",
                "Find the denominator of the result: `resDen = (d1 * d2)`",
                "Find the GCD of `resNum` and `resDen`",
                "Simplify the fraction: `resNum /= gcd` and `resDen /= gcd`"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Step-by-Step (1/3 + 1/6):</h4>
                    <div class="check-steps">
                        <div>1. Cross multiply: (1×6) + (1×3) = 9</div>
                        <div>2. Common denominator: 3×6 = 18</div>
                        <div>3. Current Fraction: 9/18</div>
                        <div>4. GCD(9, 18) = 9</div>
                        <div>5. Simplify: (9÷9) / (18÷9) = 1/2</div>
                        <div class="result">✓ Result: 1/2</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input n1, d1, n2, d2",
                "Step 2: num = (n1 * d2) + (n2 * d1)",
                "Step 3: den = d1 * d2",
                "Step 4: common_divisor = gcd(num, den)",
                "Step 5: Return (num / common_divisor) + '/' + (den / common_divisor)"
            ]
        },
        
        complexity: {
            time: "O(log(min(num, den)))",
            timeExplanation: "The complexity is dominated by the Euclidean algorithm for GCD.",
            space: "O(1)",
            spaceExplanation: "No additional data structures are used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int gcd(int a,int b){ return b?gcd(b,a%b):a; }
int main(){
    int n1,d1,n2,d2;
    scanf("%d %d %d %d",&n1,&d1,&n2,&d2);
    int num=n1*d2+n2*d1;
    int den=d1*d2;
    int g=gcd(num,den);
    printf("%d/%d",num/g,den/g);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int gcd(int a,int b){ return b?gcd(b,a%b):a; }
int main(){
    int n1,d1,n2,d2;
    cin>>n1>>d1>>n2>>d2;
    int num=n1*d2+n2*d1;
    int den=d1*d2;
    int g=gcd(num,den);
    cout<<num/g<<"/"<<den/g;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    static int gcd(int a,int b){ return b==0?a:gcd(b,a%b); }
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n1=sc.nextInt(),d1=sc.nextInt();
        int n2=sc.nextInt(),d2=sc.nextInt();
        int num=n1*d2+n2*d1;
        int den=d1*d2;
        int g=gcd(num,den);
        System.out.println(num/g+"/"+den/g);
    }
}`
  },
  python: {
    code: `import math
n1,d1,n2,d2=map(int,input().split())
num=n1*d2+n2*d1
den=d1*d2
g=math.gcd(num,den)
print(f"{num//g}/{den//g}")`
  },
  javascript: {
    code: `let [n1,d1,n2,d2]=prompt().split(" ").map(Number);
const gcd=(a,b)=>b?gcd(b,a%b):a;
let num=n1*d2+n2*d1;
let den=d1*d2;
let g=gcd(num,den);
console.log(num/g+"/"+den/g);`
  }
},

        
        relatedTopics: ["GCD", "Euclidean Algorithm", "Arithmetic"],
        
        commonMistakes: [
            {
                mistake: "Not simplifying the final answer",
                why: "Problem specifically asks for the simplest form",
                correct: "Always divide by GCD"
            }
        ],
        
        practiceQuestions: ["Subtract two fractions", "Add three fractions", "Multiply two fractions"]
    },

    // ========================================
    // PROBLEM 22: Day of the Week
    // ========================================
    {
        id: 22,
        title: "Day of the Week",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given a date (day, month, year), return the day of the week that corresponds to that date (e.g., Monday, Tuesday, etc.).",
        
        examples: [
            {
                input: "d=28, m=12, y=2025",
                output: "Sunday",
                explanation: "December 28, 2025 falls on a Sunday."
            }
        ],
        
        explanation: {
            concept: "Calculating the day of the week can be done using <strong>Sakamoto's Algorithm</strong> or <strong>Zeller's Congruence</strong>. These formulas handle leap years and month offsets mathematically.",
            
            approach: [
                "Use Sakamoto's algorithm constants for months: {0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4}",
                "If month < 3, decrement year by 1",
                "Apply the formula: `(y + y/4 - y/100 + y/400 + t[m-1] + d) % 7`",
                "Map result 0-6 to Sunday-Saturday"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Formula Breakdown:</h4>
                    <p>Input: 15/08/1947 (India's Independence)</p>
                    <div class="check-steps">
                        <div>1. Formula result: 5</div>
                        <div>2. Mapping: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri</div>
                        <div class="result">✓ Day: Friday</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Create offset table `t = {0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4}`",
                "Step 2: If month < 3: year = year - 1",
                "Step 3: res = (year + year/4 - year/100 + year/400 + t[month-1] + day) % 7",
                "Step 4: Return WeekDays[res]"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Constant time mathematical calculation.",
            space: "O(1)",
            spaceExplanation: "Storing a small table of 12 integers."
        },
        
       solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int d,m,y;
    int t[]={0,3,2,5,0,3,5,1,4,6,2,4};
    scanf("%d %d %d",&d,&m,&y);
    if(m<3) y--;
    int res=(y+y/4-y/100+y/400+t[m-1]+d)%7;
    char* days[]={"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
    printf("%s",days[res]);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int d,m,y;
    int t[]={0,3,2,5,0,3,5,1,4,6,2,4};
    cin>>d>>m>>y;
    if(m<3) y--;
    int res=(y+y/4-y/100+y/400+t[m-1]+d)%7;
    string days[]={"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
    cout<<days[res];
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int d=sc.nextInt(),m=sc.nextInt(),y=sc.nextInt();
        int[] t={0,3,2,5,0,3,5,1,4,6,2,4};
        if(m<3) y--;
        int res=(y+y/4-y/100+y/400+t[m-1]+d)%7;
        String[] days={"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
        System.out.println(days[res]);
    }
}`
  },
  python: {
    code: `import datetime
d,m,y=map(int,input().split())
print(datetime.date(y,m,d).strftime("%A"))`
  },
  javascript: {
    code: `let [d,m,y]=prompt().split(" ").map(Number);
const t=[0,3,2,5,0,3,5,1,4,6,2,4];
if(m<3) y--;
let res=(y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)+t[m-1]+d)%7;
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
console.log(days[res]);`
  }
},        
        relatedTopics: ["Calendrical calculations", "Modulo arithmetic", "Leap year logic"],
        
        commonMistakes: [
            {
                mistake: "Forgetting leap year logic",
                why: "February 29th occurs only every 4 years (with 100/400 exceptions)",
                correct: "Use a proven formula like Sakamoto's"
            }
        ],
        
        practiceQuestions: ["Is it a leap year?", "Number of days between two dates", "Day of the week for Jan 1st of any year"]
    },

    // ========================================
    // PROBLEM 23: Nth Fibonacci Number
    // ========================================
    {
        id: 23,
        title: "Nth Fibonacci Number",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given a number N, find the Nth Fibonacci number in the sequence. The sequence starts 0, 1, 1, 2, 3, 5, 8, 13...",
        
        examples: [
            {
                input: "N = 5",
                output: "5",
                explanation: "F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5"
            },
            {
                input: "N = 10",
                output: "55",
                explanation: "The 10th term in the series is 55"
            }
        ],
        
        explanation: {
            concept: "The <strong>Fibonacci sequence</strong> is defined by the recurrence relation: $F(n) = F(n-1) + F(n-2)$, with base cases $F(0)=0$ and $F(1)=1$.",
            
            approach: [
                "Method 1: Recursive (Very slow for large N: $O(2^n)$)",
                "Method 2: Iterative (Efficient: $O(n)$ time, $O(1)$ space)",
                "Method 3: Matrix Exponentiation ($O(log n)$ - advanced)"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Sequence Growth:</h4>
                    <div class="example-flow">
                        <div class="step">0</div>
                        <div class="step">1</div>
                        <div class="step">0+1=1</div>
                        <div class="step">1+1=2</div>
                        <div class="step">1+2=3</div>
                        <div class="step result">2+3=5</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: If N is 0 or 1, return N",
                "Step 2: prev2 = 0, prev1 = 1",
                "Step 3: Loop from 2 to N:",
                "   a. curr = prev1 + prev2",
                "   b. prev2 = prev1",
                "   c. prev1 = curr",
                "Step 4: Return prev1"
            ]
        },
        
        complexity: {
            time: "O(N)",
            timeExplanation: "We iterate from 2 to N once.",
            space: "O(1)",
            spaceExplanation: "We only store the previous two terms in variables."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int n;
    scanf("%d",&n);
    if(n<=1){ printf("%d",n); return 0; }
    int a=0,b=1,c;
    for(int i=2;i<=n;i++){
        c=a+b;
        a=b;
        b=c;
    }
    printf("%d",b);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int n; cin>>n;
    if(n<=1){ cout<<n; return 0; }
    int a=0,b=1,c;
    for(int i=2;i<=n;i++){
        c=a+b;
        a=b;
        b=c;
    }
    cout<<b;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if(n<=1){ System.out.println(n); return; }
        int a=0,b=1,c=0;
        for(int i=2;i<=n;i++){
            c=a+b;
            a=b;
            b=c;
        }
        System.out.println(b);
    }
}`
  },
  python: {
    code: `n=int(input())
if n<=1:
    print(n)
else:
    a,b=0,1
    for _ in range(2,n+1):
        a,b=b,a+b
    print(b)`
  },
  javascript: {
    code: `let n=Number(prompt());
if(n<=1){ console.log(n); }
else{
  let a=0,b=1;
  for(let i=2;i<=n;i++){
    [a,b]=[b,a+b];
  }
  console.log(b);
}`
  }
},

        
        relatedTopics: ["Recursion", "Dynamic Programming", "Golden Ratio"],
        
        commonMistakes: [
            {
                mistake: "Using simple recursion for N > 40",
                why: "Simple recursion calculates the same values multiple times, causing time complexity to explode",
                correct: "Use iterative or memoization"
            }
        ],
        
        practiceQuestions: ["Sum of first N Fibonacci numbers", "Check if a number is a Fibonacci number", "Climbing stairs problem"]
    },

    // ========================================
    // PROBLEM 24: Decimal to Binary
    // ========================================
    {
        id: 24,
        title: "Decimal to Binary",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given a decimal number N, convert it into its binary representation string.",
        
        examples: [
            {
                input: "N = 10",
                output: "1010",
                explanation: "10 = 8 + 2, which is 1010 in binary"
            },
            {
                input: "N = 7",
                output: "111",
                explanation: "7 = 4 + 2 + 1, which is 111 in binary"
            }
        ],
        
        explanation: {
            concept: "To convert <strong>Decimal to Binary</strong>, we repeatedly divide the number by 2 and collect the remainders in reverse order.",
            
            approach: [
                "Divide the number by 2",
                "Store the remainder (either 0 or 1)",
                "Update the number to be the quotient",
                "Repeat until the number becomes 0",
                "The binary string is the remainders in reverse order"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Conversion (N=10):</h4>
                    <div class="step-trace">
                        10 ÷ 2 = 5, Rem = 0<br>
                        5 ÷ 2 = 2, Rem = 1<br>
                        2 ÷ 2 = 1, Rem = 0<br>
                        1 ÷ 2 = 0, Rem = 1<br>
                        <span class="result">Read bottom-up: 1010</span>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: If N=0 return '0'",
                "Step 2: binary = ''",
                "Step 3: While N > 0:",
                "   a. rem = N % 2",
                "   b. binary = rem + binary",
                "   c. N = N / 2",
                "Step 4: Return binary"
            ]
        },
        
        complexity: {
            time: "O(log N)",
            timeExplanation: "The number of bits is proportional to the log base 2 of N.",
            space: "O(log N)",
            spaceExplanation: "To store the binary representation string."
        },
        
     solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int n;
    scanf("%d",&n);
    if(n==0){ printf("0"); return 0; }
    int bin[32],i=0;
    while(n>0){
        bin[i++]=n%2;
        n/=2;
    }
    for(int j=i-1;j>=0;j--) printf("%d",bin[j]);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int n; cin>>n;
    if(n==0){ cout<<0; return 0; }
    string res="";
    while(n>0){
        res=char('0'+n%2)+res;
        n/=2;
    }
    cout<<res;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        System.out.println(Integer.toBinaryString(n));
    }
}`
  },
  python: {
    code: `n=int(input())
print(bin(n)[2:])`
  },
  javascript: {
    code: `let n=Number(prompt());
console.log(n.toString(2));`
  }
},

        
        relatedTopics: ["Number systems", "Bit manipulation", "Base conversion"],
        
        commonMistakes: [
            {
                mistake: "Printing remainders in the wrong order",
                why: "The first remainder found is actually the Last (Least Significant) bit",
                correct: "Reverse the collection of remainders"
            }
        ],
        
        practiceQuestions: ["Binary to Decimal", "Decimal to Hexadecimal", "Counting set bits in binary"]
    },
    // ========================================
    // PROBLEM 25: N-th term of 1, 3, 6, 10, 15, 21…
    // ========================================
    {
        id: 25,
        title: "N-th term of 1, 3, 6, 10, 15, 21…",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given an integer N, find the N-th term of the series 1, 3, 6, 10, 15, 21... These are known as Triangular Numbers.",
        
        examples: [
            {
                input: "N = 3",
                output: "6",
                explanation: "The first 3 terms are 1, 3, 6. The 3rd term is 6."
            },
            {
                input: "N = 4",
                output: "10",
                explanation: "The first 4 terms are 1, 3, 6, 10. The 4th term is 10."
            }
        ],
        
        explanation: {
            concept: "The series represents <strong>Triangular Numbers</strong>. The N-th term is simply the <strong>sum of the first N natural numbers</strong>. Visually, it represents the number of dots required to form an equilateral triangle with N dots on a side.",
            
            approach: [
                "Method 1: Use a loop to add numbers from 1 to N.",
                "Method 2: Use the mathematical formula for the sum of first N natural numbers: $\\frac{N(N+1)}{2}$."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Visualizing N=4:</h4>
                    <pre style="line-height: 1.2; color: #10b981;">
      ●         (1)
     ● ●        (1+2=3)
    ● ● ●       (1+2+3=6)
   ● ● ● ●      (1+2+3+4=10)
                    </pre>
                    <div class="formula">
                        Term 4 = (4 × (4 + 1)) / 2 = 10
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input number N",
                "Step 2: Calculate result = (N * (N + 1)) / 2",
                "Step 3: Return result"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Using the formula requires only constant time arithmetic.",
            space: "O(1)",
            spaceExplanation: "No extra space is needed."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    long long n;
    scanf("%lld",&n);
    printf("%lld",n*(n+1)/2);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    long long n; cin>>n;
    cout<<n*(n+1)/2;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        long n=sc.nextLong();
        System.out.println(n*(n+1)/2);
    }
}`
  },
  python: {
    code: `n=int(input())
print(n*(n+1)//2)`
  },
  javascript: {
    code: `let n=BigInt(prompt());
console.log((n*(n+1n))/2n+"");`
  }
}
,
        
        relatedTopics: ["Arithmetic series", "Sum of natural numbers", "Pattern recognition"],
        
        commonMistakes: [
            {
                mistake: "Integer overflow for large N",
                why: "n*(n+1) might exceed the limits of a 32-bit integer",
                correct: "Use 64-bit integers (long long in C++)"
            }
        ],
        
        practiceQuestions: ["Find the N-th square number", "Find the sum of the first N triangular numbers"]
    },

    // ========================================
    // PROBLEM 26: Armstrong Number
    // ========================================
    {
        id: 26,
        title: "Armstrong Number",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given a number N, check if it is an Armstrong number. An Armstrong number is a number that is equal to the sum of its own digits each raised to the power of the number of digits.",
        
        examples: [
            {
                input: "N = 153",
                output: "True",
                explanation: "153 has 3 digits. 1³ + 5³ + 3³ = 1 + 125 + 27 = 153."
            },
            {
                input: "N = 1634",
                output: "True",
                explanation: "1634 has 4 digits. 1⁴ + 6⁴ + 3⁴ + 4⁴ = 1 + 1296 + 81 + 256 = 1634."
            },
            {
                input: "N = 12",
                output: "False",
                explanation: "1² + 2² = 5 ≠ 12."
            }
        ],
        
        explanation: {
            concept: "An <strong>Armstrong number</strong> (also known as a Narcissistic number) is defined by the property that the sum of its $d$ digits each raised to the power $d$ equals the original number.",
            
            approach: [
                "1. Count the number of digits in N (let's call it $k$).",
                "2. Extract each digit of N.",
                "3. Raise each digit to the power of $k$.",
                "4. Add these powers together.",
                "5. Check if the final sum equals the original number N."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example N = 153:</h4>
                    <div class="check-steps">
                        <div>1. Digits count = 3</div>
                        <div>2. 1³ = 1</div>
                        <div>3. 5³ = 125</div>
                        <div>4. 3³ = 27</div>
                        <div>5. Sum = 1 + 125 + 27 = 153</div>
                        <div class="result">✓ 153 == 153 (TRUE)</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input N, store original value in 'temp'",
                "Step 2: Find number of digits 'k'",
                "Step 3: sum = 0",
                "Step 4: While temp > 0:",
                "   a. digit = temp % 10",
                "   b. sum = sum + pow(digit, k)",
                "   c. temp = temp / 10",
                "Step 5: Return sum == N"
            ]
        },
        
        complexity: {
            time: "O(log₁₀ N)",
            timeExplanation: "We iterate through each digit of the number.",
            space: "O(1)",
            spaceExplanation: "We use a few variables to store the sum and temporary values."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <math.h>
int main(){
    int n,temp,sum=0,k=0;
    scanf("%d",&n);
    temp=n;
    while(temp){ k++; temp/=10; }
    temp=n;
    while(temp){
        int d=temp%10;
        sum+=pow(d,k);
        temp/=10;
    }
    printf(sum==n?"True":"False");
}`
  },
  cpp: {
    code: `#include <iostream>
#include <cmath>
using namespace std;
int main(){
    int n,temp,sum=0,k=0;
    cin>>n;
    temp=n;
    while(temp){ k++; temp/=10; }
    temp=n;
    while(temp){
        int d=temp%10;
        sum+=pow(d,k);
        temp/=10;
    }
    cout<<(sum==n);
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int temp=n,sum=0,k=String.valueOf(n).length();
        while(temp>0){
            int d=temp%10;
            sum+=Math.pow(d,k);
            temp/=10;
        }
        System.out.println(sum==n);
    }
}`
  },
  python: {
    code: `n=int(input())
k=len(str(n))
print(sum(int(d)**k for d in str(n))==n)`
  },
  javascript: {
    code: `let n=Number(prompt());
let k=n.toString().length;
let sum=0,temp=n;
while(temp>0){
  let d=temp%10;
  sum+=d**k;
  temp=Math.floor(temp/10);
}
console.log(sum===n);`
  }
}
,
        
        relatedTopics: ["Digit extraction", "Power functions", "Narcissistic numbers"],
        
        commonMistakes: [
            {
                mistake: "Hardcoding the power to 3",
                why: "Some definitions specify 3, but the general rule is power = number of digits",
                correct: "Calculate the digit count first"
            }
        ],
        
        practiceQuestions: ["Find all Armstrong numbers between 1 and 1000", "Check if a number is a 'Strong Number'"]
    },

    // ========================================
    // PROBLEM 27: Palindrome Number
    // ========================================
    {
        id: 27,
        title: "Palindrome Number",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given an integer N, check if it is a palindrome. A number is a palindrome if it reads the same backward as forward.",
        
        examples: [
            {
                input: "N = 121",
                output: "True",
                explanation: "121 reversed is 121."
            },
            {
                input: "N = -121",
                output: "False",
                explanation: "From left to right: -121. From right to left: 121-."
            }
        ],
        
        explanation: {
            concept: "A <strong>Palindrome number</strong> remains unchanged when its digits are reversed. Note that negative numbers are typically not palindromes due to the minus sign.",
            
            approach: [
                "1. If N < 0, it is not a palindrome.",
                "2. Reverse the digits of the number N.",
                "3. Compare the reversed number with the original N.",
                "4. If they are equal, it's a palindrome."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Reversing 123:</h4>
                    <div class="step-trace">
                        1. Digits: 1, 2, 3<br>
                        2. Reverse: 3, 2, 1<br>
                        3. Build: 321<br>
                        <span class="result">123 ≠ 321 → FALSE</span>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: If N < 0 return False",
                "Step 2: temp = N, rev = 0",
                "Step 3: While temp > 0:",
                "   a. rev = (rev * 10) + (temp % 10)",
                "   b. temp = temp / 10",
                "Step 4: Return rev == N"
            ]
        },
        
        complexity: {
            time: "O(log₁₀ N)",
            timeExplanation: "We process each digit of the number once.",
            space: "O(1)",
            spaceExplanation: "Only constant variables are used for the reversal."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int n,rev=0,temp;
    scanf("%d",&n);
    if(n<0){ printf("False"); return 0; }
    temp=n;
    while(temp){
        rev=rev*10+temp%10;
        temp/=10;
    }
    printf(rev==n?"True":"False");
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int n,rev=0,temp;
    cin>>n;
    if(n<0){ cout<<"False"; return 0; }
    temp=n;
    while(temp){
        rev=rev*10+temp%10;
        temp/=10;
    }
    cout<<(rev==n);
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if(n<0){ System.out.println(false); return; }
        int rev=0,temp=n;
        while(temp>0){
            rev=rev*10+temp%10;
            temp/=10;
        }
        System.out.println(rev==n);
    }
}`
  },
  python: {
    code: `n=int(input())
print(n>=0 and str(n)==str(n)[::-1])`
  },
  javascript: {
    code: `let n=Number(prompt());
if(n<0) console.log(false);
else console.log(n.toString()===n.toString().split('').reverse().join(''));`
  }
}
,
        
        relatedTopics: ["String manipulation", "Digit reversal", "Two-pointer approach"],
        
        commonMistakes: [
            {
                mistake: "Ignoring negative numbers",
                why: "The '-' sign makes the reverse different",
                correct: "Add a check for n < 0"
            }
        ],
        
        practiceQuestions: ["Is a string a palindrome?", "Find the largest palindrome product of two 3-digit numbers"]
    },

    // ========================================
    // PROBLEM 28: Digit Root
    // ========================================
    {
        id: 28,
        title: "Digit Root",
        difficulty: "easy",
        category: "Math",
        
        problemStatement: "Given a non-negative integer N, find its digital root. The digital root is the single-digit value obtained by an iterative process of summing digits, until only one digit remains.",
        
        examples: [
            {
                input: "N = 38",
                output: "2",
                explanation: "3 + 8 = 11. 1 + 1 = 2. Since 2 is a single digit, it is the root."
            },
            {
                input: "N = 942",
                output: "6",
                explanation: "9 + 4 + 2 = 15. 1 + 5 = 6."
            }
        ],
        
        explanation: {
            concept: "The <strong>Digit Root</strong> is the value obtained by summing digits repeatedly. It is also equivalent to the remainder of the number when divided by 9 (with some specific rules for 0 and 9).",
            
            approach: [
                "Method 1: Iterative. Use a nested loop to sum digits until the number is < 10.",
                "Method 2: Mathematical (O(1)). Using the property of divisibility by 9: Root = $1 + (N - 1) \pmod 9$."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Iteration for N = 98:</h4>
                    <div class="example-flow">
                        <div class="step">9 + 8 = 17</div>
                        <div class="arrow">→</div>
                        <div class="step">1 + 7 = 8</div>
                        <div class="arrow">→</div>
                        <div class="step result">Result = 8</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: If N == 0, return 0",
                "Step 2: If N % 9 == 0, return 9",
                "Step 3: Else return N % 9"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "The mathematical formula calculates the result in constant time.",
            space: "O(1)",
            spaceExplanation: "No additional space used."
        },
        
       solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int n;
    scanf("%d",&n);
    if(n==0) printf("0");
    else if(n%9==0) printf("9");
    else printf("%d",n%9);
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    int n; cin>>n;
    if(n==0) cout<<0;
    else cout<<(n%9==0?9:n%9);
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if(n==0) System.out.println(0);
        else System.out.println(n%9==0?9:n%9);
    }
}`
  },
  python: {
    code: `n=int(input())
print(0 if n==0 else 9 if n%9==0 else n%9)`
  },
  javascript: {
    code: `let n=Number(prompt());
if(n===0) console.log(0);
else console.log(n%9===0?9:n%9);`
  }
}
,
        
        relatedTopics: ["Number theory", "Modular arithmetic", "Casting out nines"],
        
        commonMistakes: [
            {
                mistake: "Using recursion for large numbers without the formula",
                why: "While it works, the formula is much faster and more elegant",
                correct: "Use the (n-1)%9 + 1 trick"
            }
        ],
        
        practiceQuestions: ["Find the digit root of N!", "Check if a number is divisible by 9 using digit root"]
    },
    // ========================================
    // PROBLEM 29: Square Root (Integer part)
    // ========================================
    {
        id: 29,
        title: "Square Root",
        difficulty: "medium",
        category: "Math/Searching",
        
        problemStatement: "Given a non-negative integer N, compute and return the square root of N. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned (Floor value). Do not use built-in sqrt() functions.",
        
        examples: [
            {
                input: "N = 11",
                output: "3",
                explanation: "The square root of 11 is 3.3166..., and since we need the floor, 3 is returned."
            },
            {
                input: "N = 16",
                output: "4",
                explanation: "The square root of 16 is exactly 4."
            }
        ],
        
        explanation: {
            concept: "We need to find the largest integer $x$ such that $x^2 \le N$. Since the numbers are sorted (0, 1, 2...N), we can use <strong>Binary Search</strong> to find this value efficiently.",
            
            approach: [
                "Set the search range from 0 to N.",
                "Calculate the middle element `mid`.",
                "If `mid * mid == N`, then `mid` is the exact root.",
                "If `mid * mid < N`, then `mid` could be the answer, so store it and search in the right half.",
                "If `mid * mid > N`, search in the left half."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Binary Search for sqrt(11):</h4>
                    <div class="check-steps">
                        <div>1. Range [0, 11], Mid = 5. 5²=25 (>11) → Range [0, 4]</div>
                        <div>2. Range [0, 4], Mid = 2. 2²=4 (<11) → Store 2, Range [3, 4]</div>
                        <div>3. Range [3, 4], Mid = 3. 3²=9 (<11) → Store 3, Range [4, 4]</div>
                        <div>4. Range [4, 4], Mid = 4. 4²=16 (>11) → Range [4, 3]</div>
                        <div class="result">✓ Loop Ends. Last stored answer: 3</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: If N < 2, return N",
                "Step 2: low = 1, high = N, ans = 0",
                "Step 3: While low <= high:",
                "   a. mid = low + (high - low) / 2",
                "   b. If mid <= N / mid: ans = mid, low = mid + 1",
                "   c. Else: high = mid - 1",
                "Step 4: Return ans"
            ]
        },
        
        complexity: {
            time: "O(log N)",
            timeExplanation: "Binary search halves the search space in every iteration.",
            space: "O(1)",
            spaceExplanation: "Only constant variables are used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
int main(){
    int n; scanf("%d",&n);
    int low=0, high=n, ans=0;
    while(low<=high){
        int mid = low + (high-low)/2;
        if(mid<=n/mid){ ans=mid; low=mid+1; }
        else high=mid-1;
    }
    printf("%d",ans);
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin>>n;
    int low=0, high=n, ans=0;
    while(low<=high){
        int mid=low+(high-low)/2;
        if(mid<=n/mid){ ans=mid; low=mid+1; }
        else high=mid-1;
    }
    cout<<ans;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int low=0, high=n, ans=0;
        while(low<=high){
            int mid=low+(high-low)/2;
            if(mid<=n/mid){ ans=mid; low=mid+1; }
            else high=mid-1;
        }
        System.out.println(ans);
    }
}`
  },
  python: {
    code: `n=int(input())
low,high,ans=0,n,0
while low<=high:
    mid=(low+high)//2
    if mid*mid<=n:
        ans=mid
        low=mid+1
    else:
        high=mid-1
print(ans)`
  },
  javascript: {
    code: `let n=Number(prompt());
let low=0, high=n, ans=0;
while(low<=high){
  let mid=Math.floor((low+high)/2);
  if(mid*mid<=n){ ans=mid; low=mid+1; }
  else high=mid-1;
}
console.log(ans);`
  }

        },
        
        relatedTopics: ["Binary Search", "Newton-Raphson Method", "Optimization"],
        
        commonMistakes: [
            {
                mistake: "Using mid * mid <= n",
                why: "If n is large, mid*mid can exceed the maximum capacity of an integer (Overflow)",
                correct: "Use mid <= n / mid"
            }
        ],
        
        practiceQuestions: ["Find N-th root of a number", "Check if N is a perfect square"]
    },

    // ========================================
    // PROBLEM 30: 3 Divisors
    // ========================================
    {
        id: 30,
        title: "3 Divisors",
        difficulty: "medium",
        category: "Math/Number Theory",
        
        problemStatement: "Given a number N, count how many numbers less than or equal to N have exactly 3 divisors.",
        
        examples: [
            {
                input: "N = 10",
                output: "2",
                explanation: "The numbers are 4 (divisors: 1, 2, 4) and 9 (divisors: 1, 3, 9)."
            },
            {
                input: "N = 30",
                output: "3",
                explanation: "The numbers are 4, 9, and 25 (divisors: 1, 5, 25)."
            }
        ],
        
        explanation: {
            concept: "A number has exactly 3 divisors if and only if it is the <strong>square of a prime number</strong>.",
            
            approach: [
                "Observe that for a number $X$, if $X = p^2$ where $p$ is prime, its divisors are only $\{1, p, p^2\}$.",
                "The problem reduces to finding all primes $p$ such that $p^2 \le N$.",
                "This means we need to find all primes in the range $[2, \sqrt{N}]$.",
                "Use the <strong>Sieve of Eratosthenes</strong> to find primes up to $\sqrt{N}$ efficiently."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Logic Check:</h4>
                    <p>Why prime squares? Let's check 16 ($4^2$):</p>
                    <div class="example">Divisors: 1, 2, 4, 8, 16 (Total 5). ✗ Not 3!</div>
                    <p>Check 9 ($3^2$, where 3 is prime):</p>
                    <div class="example">Divisors: 1, 3, 9 (Total 3). ✓ Correct!</div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Calculate limit = sqrt(N)",
                "Step 2: Use Sieve of Eratosthenes to generate all primes up to 'limit'",
                "Step 3: Count how many primes were found",
                "Step 4: Return the count"
            ]
        },
        
        complexity: {
            time: "O(√N log log √N)",
            timeExplanation: "Standard complexity of Sieve up to √N.",
            space: "O(√N)",
            spaceExplanation: "Storing a boolean array of size √N for the sieve."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <math.h>
int main(){
    int n; scanf("%d",&n);
    int lim=sqrt(n),count=0;
    for(int i=2;i<=lim;i++){
        int prime=1;
        for(int j=2;j*j<=i;j++)
            if(i%j==0){ prime=0; break; }
        if(prime && i*i<=n) count++;
    }
    printf("%d",count);
}`
  },
  cpp: {
    code: `#include <iostream>
#include <cmath>
using namespace std;
int main(){
    int n; cin>>n;
    int lim=sqrt(n),count=0;
    for(int i=2;i<=lim;i++){
        bool prime=true;
        for(int j=2;j*j<=i;j++)
            if(i%j==0){ prime=false; break; }
        if(prime && 1LL*i*i<=n) count++;
    }
    cout<<count;
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        long n=sc.nextLong();
        int lim=(int)Math.sqrt(n),count=0;
        boolean[] prime=new boolean[lim+1];
        Arrays.fill(prime,true);
        if(lim>=0) prime[0]=false;
        if(lim>=1) prime[1]=false;
        for(int i=2;i*i<=lim;i++)
            if(prime[i])
                for(int j=i*i;j<=lim;j+=i)
                    prime[j]=false;
        for(int i=2;i<=lim;i++)
            if(prime[i] && 1L*i*i<=n) count++;
        System.out.println(count);
    }
}`
  },
  python: {
    code: `import math
n=int(input())
lim=int(math.sqrt(n))
isprime=[True]*(lim+1)
if lim>=0: isprime[0]=False
if lim>=1: isprime[1]=False
for i in range(2,int(math.sqrt(lim))+1):
    if isprime[i]:
        for j in range(i*i,lim+1,i):
            isprime[j]=False
print(sum(1 for i in range(2,lim+1) if isprime[i] and i*i<=n))`
  },
  javascript: {
    code: `let n=Number(prompt());
let lim=Math.floor(Math.sqrt(n)),count=0;
for(let i=2;i<=lim;i++){
  let prime=true;
  for(let j=2;j*j<=i;j++)
    if(i%j===0){ prime=false; break; }
  if(prime && i*i<=n) count++;
}
console.log(count);`
  }
}
,
        
        relatedTopics: ["Sieve of Eratosthenes", "Prime Factorization", "Divisor Properties"],
        
        commonMistakes: [
            {
                mistake: "Counting all perfect squares",
                why: "Non-prime squares (like 16, 36) have more than 3 divisors",
                correct: "Filter only squares where the base is a prime number"
            }
        ],
        
        practiceQuestions: ["Numbers with exactly 4 divisors", "Sum of divisors of a number"]
    },

    // ========================================
    // PROBLEM 31: Divisible by 4
    // ========================================
    {
        id: 31,
        title: "Divisible by 4",
        difficulty: "medium",
        category: "Math/Strings",
        
        problemStatement: "Given a very large number represented as a string N, check if it is divisible by 4.",
        
        examples: [
            {
                input: "N = '1124'",
                output: "True",
                explanation: "Last two digits are 24, which is divisible by 4."
            },
            {
                input: "N = '7'",
                output: "False",
                explanation: "7 is not divisible by 4."
            }
        ],
        
        explanation: {
            concept: "A number is divisible by 4 if and only if the number formed by its <strong>last two digits</strong> is divisible by 4. This is because 100 is divisible by 4.",
            
            approach: [
                "If the string length is 1, convert the single character to integer and check divisibility.",
                "Otherwise, extract the last two characters of the string.",
                "Convert them into an integer.",
                "Check if `integer % 4 == 0`."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Why only last 2?</h4>
                    <p>1124 = (11 * 100) + 24</p>
                    <p>Since 100 is divisible by 4, 11*100 is always divisible by 4.</p>
                    <p>We only need to check the remaining <strong>24</strong>.</p>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input string S",
                "Step 2: n = S.length()",
                "Step 3: If n == 1: val = S[0] - '0'",
                "Step 4: Else: val = (S[n-2]-'0')*10 + (S[n-1]-'0')",
                "Step 5: Return val % 4 == 0"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "We only look at the last two characters regardless of string length.",
            space: "O(1)",
            spaceExplanation: "No extra memory used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <string.h>
int main(){
    char s[100005];
    scanf("%s",s);
    int n=strlen(s);
    int val=n==1 ? s[0]-'0' : (s[n-2]-'0')*10+(s[n-1]-'0');
    printf(val%4==0?"True":"False");
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    string s; cin>>s;
    int n=s.size();
    int val=n==1 ? s[0]-'0' : (s[n-2]-'0')*10+(s[n-1]-'0');
    cout<<(val%4==0);
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        String s=sc.next();
        int n=s.length();
        int val=n==1 ? s.charAt(0)-'0' :
            (s.charAt(n-2)-'0')*10+(s.charAt(n-1)-'0');
        System.out.println(val%4==0);
    }
}`
  },
  python: {
    code: `s=input().strip()
val=int(s) if len(s)==1 else int(s[-2:])
print(val%4==0)`
  },
  javascript: {
    code: `let s=prompt().trim();
let val=s.length===1?Number(s):Number(s.slice(-2));
console.log(val%4===0);`
  }
}
,
        
        relatedTopics: ["Divisibility rules", "String to integer conversion"],
        
        commonMistakes: [
            {
                mistake: "Converting the entire large string to a number",
                why: "Large numbers (e.g., 100 digits) will overflow standard integer types",
                correct: "Only convert the relevant last two characters"
            }
        ],
        
        practiceQuestions: ["Check divisibility by 8 (last 3 digits)", "Check divisibility by 25"]
    },

    // ========================================
    // PROBLEM 32: Divisibility by 11
    // ========================================
    {
        id: 32,
        title: "Divisibility by 11",
        difficulty: "medium",
        category: "Math/Strings",
        
        problemStatement: "Given a very large number represented as a string N, check if it is divisible by 11.",
        
        examples: [
            {
                input: "N = '121'",
                output: "True",
                explanation: "(1+1) - (2) = 0. Zero is divisible by 11."
            },
            {
                input: "N = '1331'",
                output: "True",
                explanation: "(1+3) - (3+1) = 0."
            }
        ],
        
        explanation: {
            concept: "A number is divisible by 11 if the <strong>absolute difference</strong> between the sum of digits at odd positions and the sum of digits at even positions is either 0 or a multiple of 11.",
            
            approach: [
                "Initialize `oddSum = 0` and `evenSum = 0`.",
                "Traverse the string character by character.",
                "If index is even, add to `evenSum`. If odd, add to `oddSum`.",
                "Calculate `diff = abs(oddSum - evenSum)`.",
                "Check if `diff % 11 == 0`."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example: 10813</h4>
                    <p>Digits at odd pos: 1, 8, 3. Sum = 12</p>
                    <p>Digits at even pos: 0, 1. Sum = 1</p>
                    <div class="check-steps">
                        Difference = 12 - 1 = 11.
                        <br>Since 11 is divisible by 11 → TRUE.
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: odd_sum = 0, even_sum = 0",
                "Step 2: For i from 0 to S.length - 1:",
                "   a. digit = S[i] - '0'",
                "   b. If i is even: even_sum += digit",
                "   c. Else: odd_sum += digit",
                "Step 3: Return abs(odd_sum - even_sum) % 11 == 0"
            ]
        },
        
        complexity: {
            time: "O(L)",
            timeExplanation: "We must visit every character in the string once.",
            space: "O(1)",
            spaceExplanation: "Only two sum variables used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int main(){
    char s[100005];
    scanf("%s",s);
    int odd=0,even=0;
    for(int i=0;s[i];i++)
        (i%2?odd:even)+=s[i]-'0';
    printf(abs(odd-even)%11==0?"True":"False");
}`
  },
  cpp: {
    code: `#include <iostream>
using namespace std;
int main(){
    string s; cin>>s;
    int odd=0,even=0;
    for(int i=0;i<s.size();i++)
        (i%2?odd:even)+=s[i]-'0';
    cout<<(abs(odd-even)%11==0);
}`
  },
  java: {
    code: `import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        String s=sc.next();
        int odd=0,even=0;
        for(int i=0;i<s.length();i++)
            if(i%2==0) even+=s.charAt(i)-'0';
            else odd+=s.charAt(i)-'0';
        System.out.println(Math.abs(odd-even)%11==0);
    }
}`
  },
  python: {
    code: `s=input().strip()
odd=even=0
for i,ch in enumerate(s):
    (even if i%2==0 else odd).__iadd__(int(ch))
print(abs(odd-even)%11==0)`
  },
  javascript: {
    code: `let s=prompt();
let odd=0,even=0;
[...s].forEach((c,i)=> i%2?odd+=+c:even+=+c);
console.log(Math.abs(odd-even)%11===0);`
  }
}
,
        
        relatedTopics: ["Divisibility rules", "Modular arithmetic"],
        
        commonMistakes: [
            {
                mistake: "Assuming string positions match mathematical positions",
                why: "Math often numbers positions from right-to-left, while strings are left-to-right",
                correct: "As long as you are consistent with alternating positions, the result is the same"
            }
        ],
        
        practiceQuestions: ["Find the smallest number to add to N to make it divisible by 11"]
    },

    // ========================================
    // PROBLEM 33: Divisibility by 13
    // ========================================
    {
        id: 33,
        title: "Divisibility by 13",
        difficulty: "medium",
        category: "Math/Strings",
        
        problemStatement: "Given a very large number represented as a string N, check if it is divisible by 13.",
        
        examples: [
            {
                input: "N = '169'",
                output: "True",
                explanation: "169 / 13 = 13."
            },
            {
                input: "N = '637'",
                output: "True",
                explanation: "637 / 13 = 49."
            }
        ],
        
        explanation: {
            concept: "Since 13 is a prime number, there isn't a rule as simple as 'last digits'. For very large strings, we simulate <strong>Division</strong> using the <strong>Remainder Theorem</strong>.",
            
            approach: [
                "Process the string digit by digit from left to right.",
                "Maintain a 'current remainder'.",
                "For each digit: `remainder = (remainder * 10 + digit) % 13`.",
                "This essentially simulates how humans do long division.",
                "If final remainder is 0, return True."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Simulating '169' % 13:</h4>
                    <div class="check-steps">
                        <div>1. Start: rem = 0</div>
                        <div>2. Digit '1': (0*10 + 1) % 13 = 1</div>
                        <div>3. Digit '6': (1*10 + 6) % 13 = 3</div>
                        <div>4. Digit '9': (3*10 + 9) % 13 = 0</div>
                        <div class="result">Final Rem = 0 → TRUE</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: remainder = 0",
                "Step 2: For each character 'c' in string S:",
                "   a. digit = c - '0'",
                "   b. remainder = (remainder * 10 + digit) % 13",
                "Step 3: Return remainder == 0"
            ]
        },
        
        complexity: {
            time: "O(L)",
            timeExplanation: "We process each digit of the string once.",
            space: "O(1)",
            spaceExplanation: "We only store one integer for the remainder."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <string.h>

int main(){
    char s[100005];
    scanf("%s", s);
    int rem = 0;
    for(int i = 0; s[i]; i++){
        rem = (rem * 10 + (s[i] - '0')) % 13;
    }
    printf(rem == 0 ? "True" : "False");
    return 0;
}`
  },

  cpp: {
    code: `#include <iostream>
using namespace std;

int main(){
    string s;
    cin >> s;
    int rem = 0;
    for(char c : s){
        rem = (rem * 10 + (c - '0')) % 13;
    }
    cout << (rem == 0 ? "True" : "False");
    return 0;
}`
  },

  java: {
    code: `import java.util.*;

class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int rem = 0;
        for(int i = 0; i < s.length(); i++){
            rem = (rem * 10 + (s.charAt(i) - '0')) % 13;
        }
        System.out.println(rem == 0 ? "True" : "False");
    }
}`
  },

  python: {
    code: `s = input().strip()
rem = 0
for ch in s:
    rem = (rem * 10 + int(ch)) % 13
print(rem == 0)`
  },

  javascript: {
    code: `let s = prompt().trim();
let rem = 0;
for (let c of s) {
    rem = (rem * 10 + Number(c)) % 13;
}
console.log(rem === 0);`
  }
}
,
        
        relatedTopics: ["Modular Arithmetic", "Long Division Simulation"],
        
        commonMistakes: [
            {
                mistake: "Using BigInt or float for extremely long strings",
                why: "Precision loss or performance issues",
                correct: "Use the iterative digit-by-digit remainder approach"
            }
        ],
        
        practiceQuestions: ["Check divisibility by 7 using the same method", "Find remainder when N is divided by K"]
    },
    // ========================================
    // PROBLEM 34: K-th Digit in a^b
    // ========================================
    {
        id: 34,
        title: "K-th Digit in a^b",
        difficulty: "medium",
        category: "Math",
        
        problemStatement: "Given three integers a, b, and k, find the k-th digit from the right side of the value $a^b$. For example, if $3^3 = 27$ and $k=1$, the first digit from the right is 7.",
        
        examples: [
            {
                input: "a = 3, b = 3, k = 1",
                output: "7",
                explanation: "3³ = 27. The 1st digit from the right is 7."
            },
            {
                input: "a = 5, b = 2, k = 2",
                output: "2",
                explanation: "5² = 25. The 2nd digit from the right is 2."
            }
        ],
        
        explanation: {
            concept: "The task is to compute the power $a^b$ and then extract the digit at the $k$-th position from the right (units place is $k=1$, tens place is $k=2$, etc.).",
            
            approach: [
                "Calculate $P = a^b$.",
                "To get the $k$-th digit from the right, we can mathematically remove $k-1$ digits from the right by dividing by $10^{k-1}$.",
                "Then, the last digit of this new number is the answer, which we get using `% 10`.",
                "Formula: `(pow(a, b) / pow(10, k-1)) % 10`."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example: a=2, b=10, k=3</h4>
                    <p>2¹⁰ = 1024</p>
                    <div class="check-steps">
                        <div>1. We want 3rd digit from right (0).</div>
                        <div>2. Remove 3-1=2 digits: 1024 / 100 = 10.</div>
                        <div>3. Get last digit: 10 % 10 = 0.</div>
                        <div class="result">✓ Result: 0</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Calculate p = a raised to power b",
                "Step 2: For i = 1 to k-1:",
                "   a. p = p / 10",
                "Step 3: Return p % 10"
            ]
        },
        
        complexity: {
            time: "O(log b)",
            timeExplanation: "Using efficient modular exponentiation (though for full value it depends on power function implementation).",
            space: "O(1)",
            spaceExplanation: "Only constant extra space used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <math.h>

int main() {
    long long a, b;
    int k;
    scanf("%lld %lld %d", &a, &b, &k);

    long long p = 1;
    for (int i = 0; i < b; i++) p *= a;

    for (int i = 1; i < k; i++) p /= 10;
    printf("%lld", p % 10);
    return 0;
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b;
    int k;
    cin >> a >> b >> k;

    long long p = 1;
    for (int i = 0; i < b; i++) p *= a;

    for (int i = 1; i < k; i++) p /= 10;
    cout << p % 10;
}`
  },
  java: {
    code: `import java.util.*;
import java.math.BigInteger;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BigInteger a = sc.nextBigInteger();
        int b = sc.nextInt();
        int k = sc.nextInt();

        BigInteger p = a.pow(b);
        String s = p.toString();
        System.out.println(s.charAt(s.length() - k));
    }
}`
  },
  python: {
    code: `a, b, k = map(int, input().split())
p = pow(a, b)
print(str(p)[-k])`
  },
  javascript: {
    code: `const fs = require("fs");
let [a, b, k] = fs.readFileSync(0, "utf8").trim().split(" ").map(BigInt);

let p = a ** b;
let s = p.toString();
console.log(s[s.length - Number(k)]);`
  }
}
,
        
        relatedTopics: ["Exponentiation", "Digit extraction", "Large numbers"],
        
        commonMistakes: [
            {
                mistake: "Integer Overflow",
                why: "In C++/Java, a^b can quickly exceed the capacity of long long",
                correct: "Use BigInt libraries or modular logic if only the last few digits are needed"
            }
        ],
        
        practiceQuestions: ["Find the first digit of a^b", "Count total digits in a^b"]
    },

    // ========================================
    // PROBLEM 35: Fraction to Recurring Decimal
    // ========================================
    {
        id: 35,
        title: "Fraction to Recurring Decimal",
        difficulty: "medium",
        category: "Math/Hashing",
        
        problemStatement: "Given a numerator and a denominator, find the decimal representation of the fraction. If the decimal part is repeating, enclose the repeating part in parentheses.",
        
        examples: [
            {
                input: "num = 1, den = 2",
                output: "0.5",
                explanation: "1/2 is exactly 0.5"
            },
            {
                input: "num = 1, den = 6",
                output: "0.1(6)",
                explanation: "1/6 = 0.16666... where 6 repeats."
            }
        ],
        
        explanation: {
            concept: "A fraction results in a <strong>repeating decimal</strong> if, during the long division process, we encounter a <strong>remainder</strong> that has appeared before.",
            
            approach: [
                "1. Perform standard integer division for the part before the decimal.",
                "2. If there is a remainder, add a '.' and start tracking remainders.",
                "3. Use a <strong>Hash Map</strong> to store `remainder -> position_in_result_string`.",
                "4. While remainder is not zero:",
                "   a. If remainder is in map, insert '(' at the stored position and ')' at the end, then break.",
                "   b. Else, store current position, multiply remainder by 10, append `rem / den` to result, and update `rem = rem % den`."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Long Division Logic (1/6):</h4>
                    <div class="check-steps">
                        <div>1. 1/6: Quotient 0, Remainder 1. (Res: "0.")</div>
                        <div>2. Rem 1*10 = 10. 10/6 = 1, Rem 4. (Res: "0.1", Map: {1:0})</div>
                        <div>3. Rem 4*10 = 40. 40/6 = 6, Rem 4. (Res: "0.16", Map: {1:0, 4:1})</div>
                        <div>4. Rem 4 found in map! Start '(' at index of digit 6.</div>
                        <div class="result">✓ Result: 0.1(6)</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Calculate integral part = num / den",
                "Step 2: Initialize map to track remainders",
                "Step 3: rem = num % den",
                "Step 4: While rem != 0 and rem not in map:",
                "   a. Store position in map",
                "   b. rem = rem * 10",
                "   c. append rem / den to fractional part",
                "   d. rem = rem % den",
                "Step 5: If rem in map, add parentheses"
            ]
        },
        
        complexity: {
            time: "O(denominator)",
            timeExplanation: "By Pigeonhole Principle, the remainder must repeat within 'denominator' steps.",
            space: "O(denominator)",
            spaceExplanation: "To store seen remainders in the hash map."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int num, den;
    scanf("%d %d", &num, &den);

    int remPos[1000];
    for (int i = 0; i < 1000; i++) remPos[i] = -1;

    int rem = num % den;
    printf("%d.", num / den);

    int idx = 0;
    int frac[1000];

    while (rem && remPos[rem] == -1) {
        remPos[rem] = idx;
        rem *= 10;
        frac[idx++] = rem / den;
        rem %= den;
    }

    if (rem == 0) {
        for (int i = 0; i < idx; i++) printf("%d", frac[i]);
    } else {
        for (int i = 0; i < remPos[rem]; i++) printf("%d", frac[i]);
        printf("(");
        for (int i = remPos[rem]; i < idx; i++) printf("%d", frac[i]);
        printf(")");
    }
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int num, den;
    cin >> num >> den;

    unordered_map<int,int> mp;
    string res = to_string(num / den) + ".";
    int rem = num % den;

    while (rem && !mp.count(rem)) {
        mp[rem] = res.size();
        rem *= 10;
        res += char('0' + rem / den);
        rem %= den;
    }

    if (rem) {
        res.insert(mp[rem], "(");
        res += ")";
    }

    cout << res;
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt(), den = sc.nextInt();

        Map<Integer,Integer> map = new HashMap<>();
        StringBuilder res = new StringBuilder();
        res.append(num / den).append(".");

        int rem = num % den;
        while (rem != 0 && !map.containsKey(rem)) {
            map.put(rem, res.length());
            rem *= 10;
            res.append(rem / den);
            rem %= den;
        }

        if (rem != 0) {
            int pos = map.get(rem);
            res.insert(pos, "(");
            res.append(")");
        }

        System.out.println(res);
    }
}`
  },
  python: {
    code: `num, den = map(int, input().split())
res = []
res.append(str(num // den) + ".")
rem = num % den
mp = {}

while rem and rem not in mp:
    mp[rem] = len(res)
    rem *= 10
    res.append(str(rem // den))
    rem %= den

if rem:
    res.insert(mp[rem], "(")
    res.append(")")

print("".join(res))`
  },
  javascript: {
    code: `const fs = require("fs");
let [num, den] = fs.readFileSync(0,"utf8").trim().split(" ").map(Number);

let map = new Map();
let res = Math.floor(num/den) + ".";
let rem = num % den;

while (rem && !map.has(rem)) {
    map.set(rem, res.length);
    rem *= 10;
    res += Math.floor(rem/den);
    rem %= den;
}

if (rem) {
    let pos = map.get(rem);
    res = res.slice(0,pos) + "(" + res.slice(pos) + ")";
}

console.log(res);`
  }
}
,
        
        relatedTopics: ["Hashing", "Long Division", "Pigeonhole Principle"],
        
        commonMistakes: [
            {
                mistake: "Floating point precision",
                why: "Doing 1.0 / 6.0 in code won't give you the cycle, just a truncated double",
                correct: "Simulate division manually using integers and remainders"
            }
        ],
        
        practiceQuestions: ["Length of the recurring cycle", "Check if fraction is terminating without dividing"]
    },

    // ========================================
    // PROBLEM 36: Recurring Sequence in a Fraction
    // ========================================
    {
        id: 36,
        title: "Recurring Sequence in a Fraction",
        difficulty: "medium",
        category: "Math/Strings",
        
        problemStatement: "Given a fraction num/den, find the actual sequence of digits that repeats in the decimal representation. For example, for 1/7, the sequence is '142857'. If it is a terminating decimal, return an empty string.",
        
        examples: [
            {
                input: "num = 1, den = 7",
                output: "142857",
                explanation: "1/7 = 0.142857142857... the repeating sequence is 142857."
            }
        ],
        
        explanation: {
            concept: "Similar to finding the full decimal, but we only need the digits generated between the first occurrence of a remainder and its second occurrence.",
            
            approach: [
                "Track the remainder and the digit it produced.",
                "When a remainder repeats, everything from its first occurrence to the end is the recurring sequence."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>1/7 Trace:</h4>
                    <p>Rem 1 -> 0.<strong>1</strong>42857... (Rem became 1 again)</p>
                    <div class="check-steps">
                        Sequence between Rem 1 and Rem 1 is 142857
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Use same map logic as #35",
                "Step 2: Capture digits starting from the index stored in the map",
                "Step 3: Return that substring"
            ]
        },
        
        complexity: {
            time: "O(denominator)",
            timeExplanation: "Limited by the size of the denominator.",
            space: "O(denominator)",
            spaceExplanation: "Storage for remainders and digits."
        },
        
       solutions: {
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int num, den;
    cin >> num >> den;

    unordered_map<int,int> mp;
    string res = "";
    int rem = num % den;

    while (rem && !mp.count(rem)) {
        mp[rem] = res.size();
        rem *= 10;
        res += to_string(rem / den);
        rem %= den;
    }

    if (rem == 0) cout << "";
    else cout << res.substr(mp[rem]);
}`
  },
  python: {
    code: `num, den = map(int, input().split())
mp = {}
res = ""
rem = num % den

while rem and rem not in mp:
    mp[rem] = len(res)
    rem *= 10
    res += str(rem // den)
    rem %= den

print("" if rem == 0 else res[mp[rem]:])`
  }
}
,
        
        relatedTopics: ["Cycle detection", "String manipulation"],
        
        commonMistakes: [
            {
                mistake: "Returning the leading non-repeating digits",
                why: "In 1/6 (0.166...), 1 does not repeat, only 6 does",
                correct: "Only return the part starting from the repeat point"
            }
        ],
        
        practiceQuestions: ["Find the N-th digit after decimal in 1/7"]
    },

    // ========================================
    // PROBLEM 37: Compute nPr
    // ========================================
    {
        id: 37,
        title: "Compute nPr",
        difficulty: "medium",
        category: "Math",
        
        problemStatement: "Calculate the value of P(n, r), which represents the number of ways to arrange r elements out of a set of n elements. Formula: $nPr = \\frac{n!}{(n-r)!}$.",
        
        examples: [
            {
                input: "n = 5, r = 2",
                output: "20",
                explanation: "5! / (5-2)! = 120 / 6 = 20."
            }
        ],
        
        explanation: {
            concept: "Permutations represent <strong>ordered</strong> arrangements. Since we are dividing $n!$ by $(n-r)!$, the result is simply multiplying the first $r$ terms of $n!$.",
            
            approach: [
                "Instead of calculating full factorials (which leads to overflow), observe that:",
                "$nPr = n \\times (n-1) \\times (n-2) \\dots$ for $r$ terms.",
                "Example: 5P2 = 5 × 4."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example 10P3:</h4>
                    <p>Start at 10, multiply 3 terms down.</p>
                    <div class="formula">
                        10 × 9 × 8 = 720
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Initialize result = 1",
                "Step 2: For i from 0 to r - 1:",
                "   a. result = result * (n - i)",
                "Step 3: Return result"
            ]
        },
        
        complexity: {
            time: "O(r)",
            timeExplanation: "We perform exactly r multiplications.",
            space: "O(1)",
            spaceExplanation: "No extra space needed."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

int main() {
    int n, r;
    scanf("%d %d", &n, &r);

    long long res = 1;
    for (int i = 0; i < r; i++)
        res *= (n - i);

    printf("%lld", res);
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, r;
    cin >> n >> r;

    long long res = 1;
    for (int i = 0; i < r; i++)
        res *= (n - i);

    cout << res;
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), r = sc.nextInt();

        long res = 1;
        for (int i = 0; i < r; i++)
            res *= (n - i);

        System.out.println(res);
    }
}`
  },
  python: {
    code: `n, r = map(int, input().split())
res = 1
for i in range(r):
    res *= (n - i)
print(res)`
  },
  javascript: {
    code: `const fs = require("fs");
let [n, r] = fs.readFileSync(0,"utf8").trim().split(" ").map(Number);

let res = 1;
for (let i = 0; i < r; i++) res *= (n - i);
console.log(res);`
  }
}
,
        
        relatedTopics: ["Factorial", "Combinatorics", "Probability"],
        
        commonMistakes: [
            {
                mistake: "Using factorial(n) / factorial(n-r)",
                why: "factorial(20) is too large for standard memory, even if 20P2 is small",
                correct: "Multiply iteratively downwards"
            }
        ],
        
        practiceQuestions: ["Count permutations of a string", "nPr with duplicate elements"]
    },

    // ========================================
    // PROBLEM 38: Compute nCr
    // ========================================
    {
        id: 38,
        title: "Compute nCr",
        difficulty: "medium",
        category: "Math",
        
        problemStatement: "Calculate the value of C(n, r), the number of ways to choose r elements from a set of n elements where order does not matter. Formula: $nCr = \\frac{n!}{r! \\times (n-r)!}$.",
        
        examples: [
            {
                input: "n = 5, r = 2",
                output: "10",
                explanation: "Ways: {1,2}, {1,3}, {1,4}, {1,5}, {2,3}, {2,4}, {2,5}, {3,4}, {3,5}, {4,5}"
            }
        ],
        
        explanation: {
            concept: "Combinations are <strong>unordered</strong> selections. A key property is $nCr = nC(n-r)$.",
            
            approach: [
                "1. Use the property $nCr = nC(n-r)$ to reduce $r$ if it's more than $n/2$.",
                "2. Use the multiplicative formula:",
                "$nCr = \\frac{n \\times (n-1) \\dots (n-r+1)}{r \\times (r-1) \\dots 1}$"
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example 5C2:</h4>
                    <div class="formula">
                        (5 × 4) / (2 × 1) = 10
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: If r > n return 0",
                "Step 2: If r > n/2 set r = n - r",
                "Step 3: res = 1",
                "Step 4: For i from 1 to r:",
                "   a. res = res * (n - i + 1) / i",
                "Step 5: Return res"
            ]
        },
        
        complexity: {
            time: "O(r)",
            timeExplanation: "r iterations of multiplication and division.",
            space: "O(1)",
            spaceExplanation: "Constant storage."
        },
        
        solutions: {
            c: {
    code: `#include <stdio.h>

int main() {
    int n, r;
    scanf("%d %d", &n, &r);

    if (r > n) {
        printf("0");
        return 0;
    }

    if (r > n - r) r = n - r;

    long long res = 1;
    for (int i = 1; i <= r; i++) {
        res = res * (n - i + 1) / i;
    }

    printf("%lld", res);
    return 0;
}`
  },
  javascript: {
    code: `const fs = require("fs");
let [n, r] = fs.readFileSync(0,"utf8").trim().split(" ").map(Number);

if (r > n) {
    console.log(0);
    return;
}

r = Math.min(r, n - r);
let res = 1;

for (let i = 1; i <= r; i++) {
    res = res * (n - i + 1) / i;
}

console.log(res);`
  },

  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, r;
    cin >> n >> r;

    if (r > n) { cout << 0; return 0; }
    r = min(r, n - r);

    long long res = 1;
    for (int i = 1; i <= r; i++)
        res = res * (n - i + 1) / i;

    cout << res;
}`
  },
  python: {
    code: `n, r = map(int, input().split())
r = min(r, n-r)
res = 1
for i in range(1, r+1):
    res = res * (n - i + 1) // i
print(res)`
  }
}
,
        
        relatedTopics: ["Pascal's Triangle", "Binomial Theorem", "Combinatorics"],
        
        commonMistakes: [
            {
                mistake: "Dividing before multiplying",
                why: "Integer division might lose remainders ($5/2 = 2$), leading to wrong results",
                correct: "Multiply the numerator first, then divide by the denominator"
            }
        ],
        
        practiceQuestions: ["Generate Pascal's Triangle up to N rows", "Find nCr modulo m"]
    },
    // ========================================
    // PROBLEM 39: Pascal’s Triangle
    // ========================================
    {
        id: 39,
        title: "Pascal’s Triangle",
        difficulty: "medium",
        category: "Math/Dynamic Programming",
        
        problemStatement: "Given an integer N, generate the first N rows of Pascal's triangle. In Pascal's triangle, each number is the sum of the two numbers directly above it.",
        
        examples: [
            {
                input: "N = 5",
                output: "[[1], [1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1]]",
                explanation: "Row 3 is [1, 2, 1]. Row 4 is [1, (1+2), (2+1), 1] = [1, 3, 3, 1]."
            }
        ],
        
        explanation: {
            concept: "Pascal's Triangle is a geometric arrangement of <strong>Binomial Coefficients</strong>. The element at row $i$ and column $j$ corresponds to the value of $iCj$.",
            
            approach: [
                "1. The first row is always [1].",
                "2. For every subsequent row, the first and last elements are always 1.",
                "3. Any middle element `row[i][j]` is calculated as `row[i-1][j-1] + row[i-1][j]`.",
                "4. Use a nested loop structure: the outer loop for rows and inner loop for columns."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Pascal Structure (N=4):</h4>
                    <div style="text-align: center; font-family: 'JetBrains Mono'; line-height: 1.5;">
                        &nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;<br>
                        &nbsp;&nbsp;1&nbsp;1&nbsp;&nbsp;<br>
                        &nbsp;1&nbsp;2&nbsp;1&nbsp;<br>
                        1&nbsp;3&nbsp;3&nbsp;1
                    </div>
                    <p style="margin-top: 10px; font-size: 0.8rem;">Note: 3 = 1 + 2 (from previous row)</p>
                </div>
            `,
            
            algorithm: [
                "Step 1: Create a list 'triangle'",
                "Step 2: For i from 0 to N-1:",
                "   a. Create a current row with 'i+1' elements",
                "   b. Set first and last element of row to 1",
                "   c. For j from 1 to i-1:",
                "      row[j] = triangle[i-1][j-1] + triangle[i-1][j]",
                "   d. Add row to triangle",
                "Step 3: Return triangle"
            ]
        },
        
        complexity: {
            time: "O(N²)",
            timeExplanation: "We need to calculate $1 + 2 + 3 \dots + N$ elements.",
            space: "O(N²)",
            spaceExplanation: "To store the 2D list of N rows."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int arr[100][100];

    for (int i = 0; i < n; i++) {
        arr[i][0] = arr[i][i] = 1;
        for (int j = 1; j < i; j++)
            arr[i][j] = arr[i-1][j-1] + arr[i-1][j];

        for (int j = 0; j <= i; j++)
            printf("%d ", arr[i][j]);
        printf("\n");
    }
    return 0;
}`
  },
   cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> t;

    for (int i = 0; i < n; i++) {
        vector<int> row(i+1,1);
        for (int j = 1; j < i; j++)
            row[j] = t[i-1][j-1] + t[i-1][j];
        t.push_back(row);
    }

    for (auto &r : t) {
        for (int x : r) cout << x << " ";
        cout << endl;
    }
}`
  },
  python: {
    code: `n = int(input())
triangle = []

for i in range(n):
    row = [1]*(i+1)
    for j in range(1,i):
        row[j] = triangle[i-1][j-1] + triangle[i-1][j]
    triangle.append(row)

for r in triangle:
    print(*r)`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int[][] arr = new int[n][n];

        for (int i = 0; i < n; i++) {
            arr[i][0] = arr[i][i] = 1;
            for (int j = 1; j < i; j++)
                arr[i][j] = arr[i-1][j-1] + arr[i-1][j];

            for (int j = 0; j <= i; j++)
                System.out.print(arr[i][j] + " ");
            System.out.println();
        }
    }
}`
  },
  javascript: {
    code: `const fs = require("fs");
let n = Number(fs.readFileSync(0,"utf8").trim());

let triangle = [];

for (let i = 0; i < n; i++) {
    let row = Array(i + 1).fill(1);
    for (let j = 1; j < i; j++)
        row[j] = triangle[i-1][j-1] + triangle[i-1][j];
    triangle.push(row);
}

triangle.forEach(r => console.log(r.join(" ")));`
  }
}
,
        
        relatedTopics: ["Combinatorics", "Binomial Expansion", "Array manipulation"],
        
        commonMistakes: [
            {
                mistake: "Incorrect loop boundaries",
                why: "Inner loop must not overwrite the first and last '1'",
                correct: "Start inner loop from 1 and end at i-1"
            }
        ],
        
        practiceQuestions: ["Find the Kth row of Pascal's Triangle in O(K) space", "Find the sum of elements in the Nth row"]
    },

    // ========================================
    // PROBLEM 40: All Factors (Or Divisors)
    // ========================================
    {
        id: 40,
        title: "All Factor (Or Divisors)",
        difficulty: "medium",
        category: "Math",
        
        problemStatement: "Given a positive integer N, find all its divisors and return them in a sorted list. A divisor is a number that divides N without leaving a remainder.",
        
        examples: [
            {
                input: "N = 12",
                output: "[1, 2, 3, 4, 6, 12]",
                explanation: "12 is divisible by 1, 2, 3, 4, 6, and 12."
            },
            {
                input: "N = 100",
                output: "[1, 2, 4, 5, 10, 20, 25, 50, 100]",
                explanation: "Note that 10 is only listed once despite 10*10=100."
            }
        ],
        
        explanation: {
            concept: "Divisors always occur in pairs. If $d$ is a divisor of $N$, then $N/d$ is also a divisor. One of these must be $\le \sqrt{N}$.",
            
            approach: [
                "1. Iterate from 1 up to $\sqrt{N}$.",
                "2. If $N$ is divisible by $i$:",
                "   a. Add $i$ to the list.",
                "   b. If $i$ is not equal to $N/i$, add $N/i$ to the list.",
                "3. Sort the resulting list of factors."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Divisor Pair Mapping (N=12):</h4>
                    <div class="check-steps">
                        <div>1 × 12 = 12</div>
                        <div>2 × 6 = 12</div>
                        <div>3 × 4 = 12</div>
                        <div class="result">√12 ≈ 3.46 (Stop after 3)</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Create an empty list 'divisors'",
                "Step 2: For i from 1 to sqrt(N):",
                "   a. If N % i == 0:",
                "      i. Add i to divisors",
                "      ii. If (i != N/i) Add N/i to divisors",
                "Step 3: Sort divisors",
                "Step 4: Return divisors"
            ]
        },
        
        complexity: {
            time: "O(√N + K log K)",
            timeExplanation: "Iterate up to √N, then sort K factors found.",
            space: "O(K)",
            spaceExplanation: "Storing K divisors in a list."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <math.h>

int main() {
    int n;
    scanf("%d", &n);

    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            printf("%d ", i);
            if (i != n / i)
                printf("%d ", n / i);
        }
    }
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> d;

    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            d.push_back(i);
            if (i != n/i) d.push_back(n/i);
        }
    }

    sort(d.begin(), d.end());
    for (int x : d) cout << x << " ";
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        List<Integer> divs = new ArrayList<>();

        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                divs.add(i);
                if (i != n / i)
                    divs.add(n / i);
            }
        }

        Collections.sort(divs);
        for (int d : divs)
            System.out.print(d + " ");
    }
}`
  },
  python: {
    code: `n = int(input())
divs = []

for i in range(1, int(n**0.5)+1):
    if n % i == 0:
        divs.append(i)
        if i != n//i:
            divs.append(n//i)

print(*sorted(divs))`
  },
  javascript: {
    code: `const fs = require("fs");
let n = Number(fs.readFileSync(0,"utf8").trim());

let d = [];
for (let i = 1; i*i <= n; i++) {
    if (n % i === 0) {
        d.push(i);
        if (i !== n/i) d.push(n/i);
    }
}
d.sort((a,b)=>a-b);
console.log(d.join(" "));`
  }
}
,
        
        relatedTopics: ["Prime Factorization", "Perfect Numbers", "Number Theory"],
        
        commonMistakes: [
            {
                mistake: "Looping from 1 to N",
                why: "Highly inefficient for large N (e.g., 10^12)",
                correct: "Loop only up to √N"
            },
            {
                mistake: "Adding the square root twice",
                why: "If N=25, 5*5=25; if you don't check i != N/i, 5 is added twice",
                correct: "Include an IF check before adding the second pair"
            }
        ],
        
        practiceQuestions: ["Count the number of divisors", "Find the sum of all divisors", "Check if a number is highly composite"]
    },

    // ========================================
    // PROBLEM 41: Prime Factorization
    // ========================================
    {
        id: 41,
        title: "Prime Factorization",
        difficulty: "medium",
        category: "Math/Number Theory",
        
        problemStatement: "Given a number N, find all its prime factors. Return the factors in a list. If a prime factor divides N multiple times, include it multiple times.",
        
        examples: [
            {
                input: "N = 12",
                output: "[2, 2, 3]",
                explanation: "12 = 2 × 2 × 3."
            },
            {
                input: "N = 315",
                output: "[3, 3, 5, 7]",
                explanation: "315 = 3 × 3 × 5 × 7."
            }
        ],
        
        explanation: {
            concept: "According to the <strong>Fundamental Theorem of Arithmetic</strong>, every integer greater than 1 is either a prime number or can be represented as a product of prime numbers.",
            
            approach: [
                "1. While N is divisible by 2, add 2 to the result and divide N by 2.",
                "2. Now N must be odd. Iterate through odd numbers starting from 3 up to $\sqrt{N}$.",
                "3. While the current odd number `i` divides N, add `i` to the result and divide N by `i`.",
                "4. If after the loops N is still greater than 2, the remaining N is a prime factor itself."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Factor Tree for 12:</h4>
                    <div style="font-family: monospace;">
                        12 / 2 = 6 [Factor: 2]<br>
                        &nbsp;6 / 2 = 3 [Factor: 2]<br>
                        &nbsp;3 / 3 = 1 [Factor: 3]<br>
                        Result: 2, 2, 3
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: While N % 2 == 0: print 2, N = N / 2",
                "Step 2: For i from 3 to sqrt(N) step 2:",
                "   a. While N % i == 0: print i, N = N / i",
                "Step 3: If N > 2: print N"
            ]
        },
        
        complexity: {
            time: "O(√N)",
            timeExplanation: "In the worst case (N is prime), we iterate up to √N.",
            space: "O(log N)",
            spaceExplanation: "Maximum number of prime factors is log base 2 of N."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

int main() {
    long long n;
    scanf("%lld", &n);

    while (n % 2 == 0) {
        printf("2 ");
        n /= 2;
    }

    for (long long i = 3; i * i <= n; i += 2) {
        while (n % i == 0) {
            printf("%lld ", i);
            n /= i;
        }
    }

    if (n > 1) printf("%lld", n);
    return 0;
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;

    while (n % 2 == 0) {
        cout << 2 << " ";
        n /= 2;
    }

    for (long long i = 3; i * i <= n; i += 2) {
        while (n % i == 0) {
            cout << i << " ";
            n /= i;
        }
    }

    if (n > 1) cout << n;
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();

        while (n % 2 == 0) {
            System.out.print("2 ");
            n /= 2;
        }

        for (long i = 3; i * i <= n; i += 2) {
            while (n % i == 0) {
                System.out.print(i + " ");
                n /= i;
            }
        }

        if (n > 1) System.out.print(n);
    }
}`
  },
  python: {
    code: `n = int(input())

while n % 2 == 0:
    print(2, end=" ")
    n //= 2

i = 3
while i * i <= n:
    while n % i == 0:
        print(i, end=" ")
        n //= i
    i += 2

if n > 1:
    print(n, end="")`
  },
  javascript: {
    code: `const fs = require("fs");
let n = BigInt(fs.readFileSync(0,"utf8").trim());

while (n % 2n === 0n) {
    process.stdout.write("2 ");
    n /= 2n;
}

for (let i = 3n; i * i <= n; i += 2n) {
    while (n % i === 0n) {
        process.stdout.write(i + " ");
        n /= i;
    }
}

if (n > 1n) process.stdout.write(n.toString());`
  }
}
,
        
        relatedTopics: ["Sieve of Eratosthenes", "GCD", "Coprimality"],
        
        commonMistakes: [
            {
                mistake: "Not handling the remaining N after the loop",
                why: "If N was 14, the loop up to √14 (3.7) only finds factor 2. 7 remains and is missed.",
                correct: "Check if N > 1 or N > 2 after the loop"
            }
        ],
        
        practiceQuestions: ["Count distinct prime factors", "Prime factorization using a precomputed Sieve"]
    },

    // ========================================
    // PROBLEM 42: Largest Prime Factor
    // ========================================
    {
        id: 42,
        title: "Largest Prime factor",
        difficulty: "medium",
        category: "Math",
        
        problemStatement: "Given a number N, find the largest prime factor of N.",
        
        examples: [
            {
                input: "N = 15",
                output: "5",
                explanation: "Prime factors of 15 are 3 and 5. Largest is 5."
            },
            {
                input: "N = 6",
                output: "3",
                explanation: "Prime factors are 2 and 3. Largest is 3."
            }
        ],
        
        explanation: {
            concept: "The largest prime factor is the highest prime number found during the prime factorization process.",
            
            approach: [
                "1. Initialize `maxPrime = -1`.",
                "2. Divide N by 2 until it's odd, setting `maxPrime = 2`.",
                "3. Iterate through odd numbers starting at 3 up to $\sqrt{N}$.",
                "4. While `i` divides N, set `maxPrime = i` and update `N = N / i`.",
                "5. If finally $N > 2$, then $N$ itself is the largest prime factor."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example N = 21:</h4>
                    <p>1. Not divisible by 2.</p>
                    <p>2. Divisible by 3? Yes. 21/3=7. <b>maxPrime=3</b>.</p>
                    <p>3. Loop stops (√7 < 3).</p>
                    <p>4. N is now 7 (> 2). <b>maxPrime=7</b>.</p>
                    <div class="result">Result: 7</div>
                </div>
            `,
            
            algorithm: [
                "Step 1: max_p = -1",
                "Step 2: while n % 2 == 0: max_p = 2, n /= 2",
                "Step 3: for i from 3 to sqrt(n) step 2: while n % i == 0: max_p = i, n /= i",
                "Step 4: if n > 2: max_p = n",
                "Step 5: return max_p"
            ]
        },
        
        complexity: {
            time: "O(√N)",
            timeExplanation: "Worst case we check up to square root of N.",
            space: "O(1)",
            spaceExplanation: "Only tracking the maximum prime factor variable."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

int main() {
    long long n;
    scanf("%lld", &n);

    long long maxPrime = -1;

    while (n % 2 == 0) {
        maxPrime = 2;
        n /= 2;
    }

    for (long long i = 3; i * i <= n; i += 2) {
        while (n % i == 0) {
            maxPrime = i;
            n /= i;
        }
    }

    if (n > 2) maxPrime = n;
    printf("%lld", maxPrime);
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;

    long long maxPrime = -1;

    while (n % 2 == 0) {
        maxPrime = 2;
        n /= 2;
    }

    for (long long i = 3; i * i <= n; i += 2) {
        while (n % i == 0) {
            maxPrime = i;
            n /= i;
        }
    }

    if (n > 2) maxPrime = n;
    cout << maxPrime;
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        long maxPrime = -1;

        while (n % 2 == 0) {
            maxPrime = 2;
            n /= 2;
        }

        for (long i = 3; i * i <= n; i += 2) {
            while (n % i == 0) {
                maxPrime = i;
                n /= i;
            }
        }

        if (n > 2) maxPrime = n;
        System.out.println(maxPrime);
    }
}`
  },
  python: {
    code: `n = int(input())
max_p = -1

while n % 2 == 0:
    max_p = 2
    n //= 2

i = 3
while i * i <= n:
    while n % i == 0:
        max_p = i
        n //= i
    i += 2

if n > 2:
    max_p = n

print(max_p)`
  },
  javascript: {
    code: `const fs = require("fs");
let n = BigInt(fs.readFileSync(0,"utf8").trim());

let maxPrime = -1n;

while (n % 2n === 0n) {
    maxPrime = 2n;
    n /= 2n;
}

for (let i = 3n; i * i <= n; i += 2n) {
    while (n % i === 0n) {
        maxPrime = i;
        n /= i;
    }
}

if (n > 2n) maxPrime = n;
console.log(maxPrime.toString());`
  }
}
,
        
        relatedTopics: ["Prime Factorization", "Trial Division"],
        
        commonMistakes: [
            {
                mistake: "Checking all numbers up to N",
                why: "Extremely slow for large N",
                correct: "Stop the loop at √N"
            }
        ],
        
        practiceQuestions: ["Find the smallest prime factor", "Sum of all prime factors"]
    },
    // ========================================
    // PROBLEM 43: Modular Exponentiation
    // ========================================
    {
        id: 43,
        title: "Modular Exponentiation",
        difficulty: "medium",
        category: "Math",
        
        problemStatement: "Given three numbers a, b, and c, calculate (a^b) % c. This is used when the result of a^b is too large to fit into standard data types.",
        
        examples: [
            {
                input: "a = 2, b = 3, c = 5",
                output: "3",
                explanation: "(2^3) % 5 = 8 % 5 = 3."
            },
            {
                input: "a = 5, b = 2, c = 7",
                output: "4",
                explanation: "(5^2) % 7 = 25 % 7 = 4."
            }
        ],
        
        explanation: {
            concept: "Modular Exponentiation uses the <strong>Binary Exponentiation</strong> (Square and Multiply) technique. Instead of multiplying 'a' by itself 'b' times, we use the property $(x \cdot y) \pmod c = [(x \pmod c) \cdot (y \pmod c)] \pmod c$.",
            
            approach: [
                "1. Initialize result = 1.",
                "2. While b > 0:",
                "   a. If b is odd: result = (result * a) % c",
                "   b. Update a = (a * a) % c",
                "   c. Update b = b / 2 (right shift bits)",
                "3. Return result."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Binary Exponentiation (2¹⁰ % 7):</h4>
                    <p>Instead of 10 multiplications, we only need ~4 steps:</p>
                    <div class="check-steps">
                        <div>1. 2¹⁰ = (2²)⁵ = 4⁵</div>
                        <div>2. 4⁵ = 4 · (4²)² = 4 · 16²</div>
                        <div>3. Apply Modulo: 16 % 7 = 2</div>
                        <div>4. 4 · 2² = 4 · 4 = 16</div>
                        <div class="result">16 % 7 = 2 → Result: 2</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: res = 1, base = a % c",
                "Step 2: While exp > 0:",
                "   a. If exp % 2 == 1: res = (res * base) % c",
                "   b. base = (base * base) % c",
                "   c. exp = exp / 2",
                "Step 3: Return res"
            ]
        },
        
        complexity: {
            time: "O(log B)",
            timeExplanation: "The exponent is halved in every step, making it logarithmic.",
            space: "O(1)",
            spaceExplanation: "Only constant variables are used for calculation."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

long long modPow(long long a, long long b, long long m) {
    long long res = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) res = (res * a) % m;
        a = (a * a) % m;
        b >>= 1;
    }
    return res;
}

int main() {
    long long a, b, c;
    scanf("%lld %lld %lld", &a, &b, &c);
    printf("%lld", modPow(a, b, c));
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b, c;
    cin >> a >> b >> c;

    long long res = 1;
    a %= c;

    while (b > 0) {
        if (b & 1) res = (res * a) % c;
        a = (a * a) % c;
        b >>= 1;
    }

    cout << res;
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();

        long res = 1;
        a %= c;

        while (b > 0) {
            if ((b & 1) == 1) res = (res * a) % c;
            a = (a * a) % c;
            b >>= 1;
        }

        System.out.println(res);
    }
}`
  },
  python: {
    code: `a, b, c = map(int, input().split())
print(pow(a, b, c))`
  },
  javascript: {
    code: `const fs = require("fs");
let [a,b,c] = fs.readFileSync(0,"utf8").trim().split(" ").map(BigInt);

let res = 1n;
a %= c;

while (b > 0n) {
    if (b & 1n) res = (res * a) % c;
    a = (a * a) % c;
    b >>= 1n;
}

console.log(res.toString());`
  }
}
,
        
        relatedTopics: ["Binary Exponentiation", "RSA Algorithm", "Cryptography"],
        
        commonMistakes: [
            {
                mistake: "Calculating a^b first then applying modulo",
                why: "a^b will cause overflow for values like 2^1000 long before the modulo is applied",
                correct: "Apply modulo inside the loop at every multiplication step"
            }
        ],
        
        practiceQuestions: ["Matrix Exponentiation", "Find (A^B) % C where A and B are strings"]
    },

    // ========================================
    // PROBLEM 44: nth Catalan Number
    // ========================================
    {
        id: 44,
        title: "nth Catalan Number",
        difficulty: "medium",
        category: "Math/Combinatorics",
        
        problemStatement: "Find the N-th Catalan number. Catalan numbers are a sequence of natural numbers that occur in various counting problems, such as counting the number of possible binary search trees with N nodes.",
        
        examples: [
            {
                input: "N = 3",
                output: "5",
                explanation: "Catalan sequence: 1, 1, 2, 5, 14... The 3rd (index 3) is 5."
            }
        ],
        
        explanation: {
            concept: "Catalan numbers follow the formula: $C_n = \\frac{1}{n+1} \\binom{2n}{n}$. They are also defined by the recurrence: $C_{n+1} = \\sum_{i=0}^{n} C_i C_{n-i}$.",
            
            approach: [
                "1. Calculate the binomial coefficient $\\binom{2n}{n}$ (Combination).",
                "2. Divide the result by $(n + 1)$.",
                "Alternatively, use Dynamic Programming to store previous Catalan values."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Applications (N=3):</h4>
                    <p>Valid Parentheses pairs: 5</p>
                    <div style="font-family: monospace;">
                        ((())), (()()), (())(), ()(()), ()()()
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Compute Combination C = (2n)! / (n! * n!)",
                "Step 2: Return C / (n + 1)"
            ]
        },
        
        complexity: {
            time: "O(N)",
            timeExplanation: "Calculating the Binomial Coefficient takes linear time.",
            space: "O(1)",
            spaceExplanation: "Only constant variables are used if using the multiplicative formula."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

long long catalan(int n) {
    long long res = 1;
    for (int i = 1; i <= n; i++)
        res = res * (2 * n - i + 1) / i;
    return res / (n + 1);
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%lld", catalan(n));
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    long long res = 1;
    for (int i = 1; i <= n; i++)
        res = res * (2 * n - i + 1) / i;

    cout << res / (n + 1);
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        long res = 1;
        for (int i = 1; i <= n; i++)
            res = res * (2 * n - i + 1) / i;

        System.out.println(res / (n + 1));
    }
}`
  },
  python: {
    code: `n = int(input())
res = 1
for i in range(1, n+1):
    res = res * (2*n - i + 1) // i
print(res // (n+1))`
  },
  javascript: {
    code: `const fs = require("fs");
let n = Number(fs.readFileSync(0,"utf8").trim());

let res = 1n;
for (let i = 1n; i <= BigInt(n); i++)
    res = res * BigInt(2*n - Number(i) + 1) / i;

console.log((res / BigInt(n+1)).toString());`
  }
}
,
        
        relatedTopics: ["Binary Search Trees", "Balanced Parentheses", "Dyck Paths"],
        
        commonMistakes: [
            {
                mistake: "Using recursion without memoization",
                why: "Recurrence $C_i C_{n-i}$ leads to $O(3^n)$ complexity",
                correct: "Use the direct formula or DP"
            }
        ],
        
        practiceQuestions: ["Count the number of ways to triangulate a polygon with N+2 sides"]
    },

    // ========================================
    // PROBLEM 45: Binomial Coefficient
    // ========================================
    {
        id: 45,
        title: "Binomial Coefficient",
        difficulty: "medium",
        category: "Math/DP",
        
        problemStatement: "Given n and k, compute the Binomial Coefficient $C(n, k)$, which is the coefficient of the $x^k$ term in the expansion of $(1 + x)^n$. This is equivalent to 'n choose k'.",
        
        examples: [
            {
                input: "n = 5, k = 2",
                output: "10",
                explanation: "1, 5, 10, 10, 5, 1 are coefficients for n=5. k=2 gives 10."
            }
        ],
        
        explanation: {
            concept: "While the formula is $n! / (k!(n-k)!)$, for large values we use <strong>Pascal's Triangle</strong> properties: $C(n, k) = C(n-1, k-1) + C(n-1, k)$.",
            
            approach: [
                "Use an array to store values of the current row of Pascal's triangle.",
                "To optimize space, we can use a 1D array and update it from right to left to avoid using values from the same iteration."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Pascal's Row Update (n=4):</h4>
                    <p>[1, 0, 0, 0, 0]</p>
                    <p>[1, 1, 0, 0, 0]</p>
                    <p>[1, 2, 1, 0, 0]</p>
                    <p>[1, 3, 3, 1, 0]</p>
                    <div class="formula">Next Val = Prev[j] + Prev[j-1]</div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Create array C of size k+1, initialized to 0",
                "Step 2: C[0] = 1",
                "Step 3: For i from 1 to n:",
                "   a. For j from min(i, k) down to 1:",
                "      C[j] = C[j] + C[j-1]",
                "Step 4: Return C[k]"
            ]
        },
        
        complexity: {
            time: "O(n * k)",
            timeExplanation: "Nested loops up to n and k.",
            space: "O(k)",
            spaceExplanation: "Space-optimized DP array of size k."
        },
        
       solutions: {
  c: {
    code: `#include <stdio.h>

int main() {
    int n, k;
    scanf("%d %d", &n, &k);

    if (k > n) {
        printf("0");
        return 0;
    }

    if (k > n - k) k = n - k;

    long long res = 1;
    for (int i = 1; i <= k; i++)
        res = res * (n - i + 1) / i;

    printf("%lld", res);
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    if (k > n) {
        cout << 0;
        return 0;
    }

    k = min(k, n - k);
    long long res = 1;

    for (int i = 1; i <= k; i++)
        res = res * (n - i + 1) / i;

    cout << res;
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();

        if (k > n) {
            System.out.println(0);
            return;
        }

        k = Math.min(k, n - k);
        long res = 1;

        for (int i = 1; i <= k; i++)
            res = res * (n - i + 1) / i;

        System.out.println(res);
    }
}`
  },
  python: {
    code: `n, k = map(int, input().split())
k = min(k, n-k)
res = 1
for i in range(1, k+1):
    res = res * (n - i + 1) // i
print(res)`
  },
  javascript: {
    code: `const fs = require("fs");
let [n,k] = fs.readFileSync(0,"utf8").trim().split(" ").map(Number);

k = Math.min(k, n-k);
let res = 1;

for (let i = 1; i <= k; i++)
    res = res * (n - i + 1) / i;

console.log(res);`
  }
}
,
        
        relatedTopics: ["Pascal's Triangle", "Dynamic Programming"],
        
        commonMistakes: [
            {
                mistake: "Updating the 1D array from left to right",
                why: "Updating left-to-right overwrites values needed for the same row's next calculation",
                correct: "Update the row from right to left"
            }
        ],
        
        practiceQuestions: ["Compute nCr modulo p", "Find all binomial coefficients for a given n"]
    },

    // ========================================
    // PROBLEM 46: Power Set
    // ========================================
    {
        id: 46,
        title: "Power Set",
        difficulty: "medium",
        category: "Logic/Bitwise",
        
        problemStatement: "Given a set of elements (as an array or string), generate all possible subsets (the Power Set). For a set of size N, the power set contains $2^N$ elements.",
        
        examples: [
            {
                input: "set = ['a', 'b']",
                output: "[[], ['a'], ['b'], ['a', 'b']]",
                explanation: "Total $2^2 = 4$ subsets."
            }
        ],
        
        explanation: {
            concept: "We can use <strong>Bitmasking</strong>. Every number from $0$ to $2^N - 1$ can be represented as a unique binary string of length $N$. If the $i$-th bit is 1, include the $i$-th element in the subset.",
            
            approach: [
                "1. Total subsets = $2^N$.",
                "2. Loop from $i = 0$ to $2^N - 1$.",
                "3. For each $i$, check which bits are set (equal to 1).",
                "4. Construct a subset based on the set bits."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Bitmask Mapping (abc):</h4>
                    <div style="font-family: monospace;">
                        0 (000) -> {} <br>
                        1 (001) -> {c} <br>
                        2 (010) -> {b} <br>
                        3 (011) -> {bc} <br>
                        ... <br>
                        7 (111) -> {abc}
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: n = size of set",
                "Step 2: For counter from 0 to 2^n - 1:",
                "   a. For j from 0 to n - 1:",
                "      i. If (counter & (1 << j)) is non-zero:",
                "         add set[j] to current subset",
                "   b. Add current subset to result"
            ]
        },
        
        complexity: {
            time: "O(n · 2ⁿ)",
            timeExplanation: "There are 2^n subsets, and we spend O(n) to build each.",
            space: "O(n · 2ⁿ)",
            spaceExplanation: "To store all generated subsets."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <string.h>

int main() {
    char s[50];
    scanf("%s", s);

    int n = strlen(s);
    int total = 1 << n;

    for (int i = 0; i < total; i++) {
        printf("{");
        for (int j = 0; j < n; j++)
            if (i & (1 << j)) printf("%c", s[j]);
        printf("}\n");
    }
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;

    int n = s.size();
    for (int i = 0; i < (1 << n); i++) {
        for (int j = 0; j < n; j++)
            if (i & (1 << j)) cout << s[j];
        cout << endl;
    }
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int n = s.length();

        for (int i = 0; i < (1 << n); i++) {
            for (int j = 0; j < n; j++)
                if ((i & (1 << j)) != 0)
                    System.out.print(s.charAt(j));
            System.out.println();
        }
    }
}`
  },
  python: {
    code: `s = input()
n = len(s)

for i in range(1 << n):
    subset = ""
    for j in range(n):
        if i & (1 << j):
            subset += s[j]
    print(subset)`
  },
  javascript: {
    code: `const fs = require("fs");
let s = fs.readFileSync(0,"utf8").trim();
let n = s.length;

for (let i = 0; i < (1 << n); i++) {
    let sub = "";
    for (let j = 0; j < n; j++)
        if (i & (1 << j)) sub += s[j];
    console.log(sub);
}`
  }
}
,
        
        relatedTopics: ["Backtracking", "Subsequences", "Binary Representation"],
        
        commonMistakes: [
            {
                mistake: "Using this method for N > 25",
                why: "2^25 is over 33 million; the time and memory required will crash standard programs",
                correct: "Only use for small sets or use generators/iterators"
            }
        ],
        
        practiceQuestions: ["Generate all permutations", "Subsets with a specific sum"]
    },

    // ========================================
    // PROBLEM 47: Next Permutation
    // ========================================
    {
        id: 47,
        title: "Next Permutation",
        difficulty: "medium",
        category: "Logic/Arrays",
        
        problemStatement: "Given an array of integers, rearrange the numbers into the lexicographically next greater permutation. If no such arrangement exists (array is sorted descending), rearrange it as the lowest possible order (sorted ascending).",
        
        examples: [
            {
                input: "[1, 2, 3]",
                output: "[1, 3, 2]",
                explanation: "132 is the next largest number after 123 using these digits."
            },
            {
                input: "[3, 2, 1]",
                output: "[1, 2, 3]",
                explanation: "321 is the maximum, so we wrap around to minimum."
            }
        ],
        
        explanation: {
            concept: "We want the <strong>smallest possible increase</strong> to the current number. This involves finding a 'pivot' digit where the descending sequence from the right is broken.",
            
            approach: [
                "1. Find the first index `i` from the right such that `arr[i] < arr[i+1]` (The pivot).",
                "2. If no such index exists, the array is in reverse sorted order; reverse the whole array and return.",
                "3. Find the smallest element to the right of the pivot that is larger than the pivot.",
                "4. Swap these two elements.",
                "5. Reverse the sequence to the right of the pivot to make it the smallest possible suffix."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example [1, 5, 8, 4, 7, 6, 5, 3, 1]:</h4>
                    <div class="check-steps">
                        <div>1. Find dip from right: 4 < 7. Pivot is <strong>4</strong>.</div>
                        <div>2. Smallest val > 4 in suffix is <strong>5</strong>.</div>
                        <div>3. Swap 4 and 5: [...5, 7, 6, 4, 3, 1]</div>
                        <div>4. Reverse suffix [7, 6, 4, 3, 1] → [1, 3, 4, 6, 7]</div>
                        <div class="result">✓ Result: [1, 5, 8, 5, 1, 3, 4, 6, 7]</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: i = n - 2",
                "Step 2: While i >= 0 and arr[i] >= arr[i+1]: i--",
                "Step 3: If i >= 0:",
                "   a. j = n - 1",
                "   b. While arr[j] <= arr[i]: j--",
                "   c. Swap(arr[i], arr[j])",
                "Step 4: Reverse(arr, i + 1, n - 1)"
            ]
        },
        
        complexity: {
            time: "O(N)",
            timeExplanation: "In the worst case, we scan the array twice and reverse once.",
            space: "O(1)",
            spaceExplanation: "Operations are done in-place."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

void reverse(int a[], int l, int r) {
    while (l < r) {
        int t = a[l];
        a[l++] = a[r];
        a[r--] = t;
    }
}

int main() {
    int n;
    scanf("%d", &n);
    int a[n];

    for (int i = 0; i < n; i++)
        scanf("%d", &a[i]);

    int i = n - 2;
    while (i >= 0 && a[i] >= a[i+1]) i--;

    if (i >= 0) {
        int j = n - 1;
        while (a[j] <= a[i]) j--;
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    reverse(a, i + 1, n - 1);

    for (int k = 0; k < n; k++)
        printf("%d ", a[k]);
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    next_permutation(a.begin(), a.end());

    for (int x : a) cout << x << " ";
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];

        for (int i = 0; i < n; i++)
            a[i] = sc.nextInt();

        int i = n - 2;
        while (i >= 0 && a[i] >= a[i+1]) i--;

        if (i >= 0) {
            int j = n - 1;
            while (a[j] <= a[i]) j--;
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }

        for (int l = i+1, r = n-1; l < r; l++, r--) {
            int t = a[l]; a[l] = a[r]; a[r] = t;
        }

        for (int x : a)
            System.out.print(x + " ");
    }
}`
  },
  python: {
    code: `n = int(input())
a = list(map(int, input().split()))

i = n - 2
while i >= 0 and a[i] >= a[i+1]:
    i -= 1

if i >= 0:
    j = n - 1
    while a[j] <= a[i]:
        j -= 1
    a[i], a[j] = a[j], a[i]

a[i+1:] = reversed(a[i+1:])
print(*a)`
  },
  javascript: {
    code: `const fs = require("fs");
let data = fs.readFileSync(0,"utf8").trim().split("\\n");
let n = Number(data[0]);
let a = data[1].split(" ").map(Number);

let i = n - 2;
while (i >= 0 && a[i] >= a[i+1]) i--;

if (i >= 0) {
    let j = n - 1;
    while (a[j] <= a[i]) j--;
    [a[i], a[j]] = [a[j], a[i]];
}

let l = i + 1, r = n - 1;
while (l < r) {
    [a[l], a[r]] = [a[r], a[l]];
    l++; r--;
}

console.log(a.join(" "));`
  }
}
,
        
        relatedTopics: ["Lexicographical Order", "Array manipulation", "Permutation algorithms"],
        
        commonMistakes: [
            {
                mistake: "Forgetting to reverse the suffix",
                why: "Just swapping isn't enough; the suffix must be sorted ascending to get the *next* smallest permutation",
                correct: "Always reverse the suffix after the swap"
            }
        ],
        
        practiceQuestions: ["Find the k-th permutation of a sequence", "Previous permutation"]
    },
    // ========================================
    // PROBLEM 48: Sieve of Eratosthenes
    // ========================================
    {
        id: 48,
        title: "Sieve of Eratosthenes",
        difficulty: "hard",
        category: "Math/Number Theory",
        
        problemStatement: "Given a number N, find all prime numbers smaller than or equal to N. For example, if N is 10, the output should be 2, 3, 5, 7.",
        
        examples: [
            {
                input: "N = 10",
                output: "[2, 3, 5, 7]",
                explanation: "Primes less than or equal to 10."
            },
            {
                input: "N = 20",
                output: "[2, 3, 5, 7, 11, 13, 17, 19]",
                explanation: "Numbers divisible only by 1 and themselves."
            }
        ],
        
        explanation: {
            concept: "The <strong>Sieve of Eratosthenes</strong> is one of the most efficient ways to find all primes up to $N$. Instead of checking each number for primality, we iteratively mark the multiples of each prime number as composite (not prime), starting from 2.",
            
            approach: [
                "1. Create a boolean array 'prime[0..N]' and initialize all entries as true.",
                "2. Start from the first prime number, $p = 2$.",
                "3. If prime[p] is true, it is a prime. Mark all multiples of $p$ starting from $p^2$ as false.",
                "4. Repeat for the next number that is still marked true.",
                "5. All remaining true indices are prime numbers."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Sieve Process (N=10):</h4>
                    <div class="check-steps">
                        <div>1. Array: [2, 3, 4, 5, 6, 7, 8, 9, 10]</div>
                        <div>2. p = 2: Mark 4, 6, 8, 10 as <span class="error">False</span></div>
                        <div>3. p = 3: Mark 6, 9 as <span class="error">False</span></div>
                        <div>4. p = 5: 5² > 10, Stop.</div>
                        <div class="result">✓ Primes: 2, 3, 5, 7</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Create boolean array isPrime[N+1], fill with True",
                "Step 2: Set isPrime[0] = isPrime[1] = False",
                "Step 3: For p = 2 to sqrt(N):",
                "   a. If isPrime[p] is True:",
                "      i. For i = p*p to N increment by p: isPrime[i] = False",
                "Step 4: Return all indices where isPrime[index] is True"
            ]
        },
        
        complexity: {
            time: "O(N log log N)",
            timeExplanation: "This is due to the harmonic series of primes, which is extremely close to linear.",
            space: "O(N)",
            spaceExplanation: "To store the boolean array of size N."
        },
        
        solutions: {
        cpp: {
            code: `void sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i <= n; i += p)
                isPrime[i] = false;
        }
    }

    for (int i = 2; i <= n; i++)
        if (isPrime[i]) cout << i << " ";
}`,
            output: "2 3 5 7",
            explanation: "Classic C++ implementation using vector<bool>."
        },
        
        python: {
            code: `def sieve(n):
    isPrime = [True] * (n + 1)
    isPrime[0] = isPrime[1] = False

    for p in range(2, int(n ** 0.5) + 1):
        if isPrime[p]:
            for i in range(p * p, n + 1, p):
                isPrime[i] = False

    return [i for i in range(2, n + 1) if isPrime[i]]`,
            output: "[2, 3, 5, 7]",
            explanation: "Efficient Python implementation using list comprehension."
        },

        javascript: {
            code: `function sieve(n) {
    let isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= n; i += p)
                isPrime[i] = false;
        }
    }

    return isPrime
        .map((val, idx) => val ? idx : null)
        .filter(val => val !== null);
}`,
            output: "[2, 3, 5, 7]",
            explanation: "JavaScript implementation using array filtering."
        },

        java: {
            code: `public static void sieve(int n) {
    boolean[] isPrime = new boolean[n + 1];
    Arrays.fill(isPrime, true);
    isPrime[0] = isPrime[1] = false;

    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i <= n; i += p)
                isPrime[i] = false;
        }
    }

    for (int i = 2; i <= n; i++)
        if (isPrime[i])
            System.out.print(i + " ");
}`,
            output: "2 3 5 7",
            explanation: "Java implementation using boolean array."
        }
    },
        
        relatedTopics: ["Prime Factorization", "Segmented Sieve", "Euler's Totient"],
        
        commonMistakes: [
            {
                mistake: "Starting the inner loop at 2*p instead of p*p",
                why: "Any multiple lower than p*p (like 2p, 3p) would have already been marked by smaller primes (2, 3...)",
                correct: "Start the marking from p*p to save time"
            }
        ],
        
        practiceQuestions: ["Count primes in range [L, R]", "Find the K-th prime number"]
    },

    // ========================================
    // PROBLEM 49: Super Prime
    // ========================================
    {
        id: 49,
        title: "Super Prime",
        difficulty: "hard",
        category: "Math/Number Theory",
        
        problemStatement: "A prime number is called a Super Prime if its position in the sequence of prime numbers is also a prime number. For example, 3 is the 2nd prime number, and 2 is prime, so 3 is a super prime. Find all super primes up to N.",
        
        examples: [
            {
                input: "N = 10",
                output: "[3, 5]",
                explanation: "Primes: 2(1st), 3(2nd), 5(3rd), 7(4th). Indices 2 and 3 are prime, so 3 and 5 are super primes."
            }
        ],
        
        explanation: {
            concept: "<strong>Super Primes</strong> (also known as higher-order primes) are primes that occupy a prime-numbered index (1-based) in the sorted list of all prime numbers.",
            
            approach: [
                "1. Generate all prime numbers up to N using a Sieve.",
                "2. Store these primes in a 1-based list or array.",
                "3. Check the index of each prime in that list.",
                "4. If the index itself is a prime number, the prime at that index is a Super Prime."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Mapping Table:</h4>
                    <table style="width:100%; border-collapse: collapse; text-align:center;">
                        <tr style="border-bottom: 1px solid #333;"><th>Index (i)</th><th>Prime[i]</th><th>Is 'i' Prime?</th></tr>
                        <tr><td>1</td><td>2</td><td>No</td></tr>
                        <tr style="color: #10b981;"><td>2</td><td>3</td><td>Yes (Super!)</td></tr>
                        <tr style="color: #10b981;"><td>3</td><td>5</td><td>Yes (Super!)</td></tr>
                        <tr><td>4</td><td>7</td><td>No</td></tr>
                        <tr style="color: #10b981;"><td>5</td><td>11</td><td>Yes (Super!)</td></tr>
                    </table>
                </div>
            `,
            
            algorithm: [
                "Step 1: isPrime = SieveOfEratosthenes(N)",
                "Step 2: Create list 'primes' containing all p where isPrime[p] is True",
                "Step 3: For k from 1 to length(primes):",
                "   a. If isPrime[k] is True:",
                "      print primes[k-1]"
            ]
        },
        
        complexity: {
            time: "O(N log log N)",
            timeExplanation: "The Sieve operation dominates the complexity.",
            space: "O(N)",
            spaceExplanation: "To store the prime markers and the list of primes found."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int n;
    scanf("%d", &n);

    bool isPrime[n+1];
    for(int i=0;i<=n;i++) isPrime[i]=true;
    isPrime[0]=isPrime[1]=false;

    for(int i=2;i*i<=n;i++)
        if(isPrime[i])
            for(int j=i*i;j<=n;j+=i)
                isPrime[j]=false;

    int primes[n], cnt=0;
    for(int i=2;i<=n;i++)
        if(isPrime[i]) primes[cnt++]=i;

    for(int i=0;i<cnt;i++)
        if(isPrime[i+1])
            printf("%d ", primes[i]);

    return 0;
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin>>n;
    vector<bool> isPrime(n+1,true);
    isPrime[0]=isPrime[1]=false;

    for(int i=2;i*i<=n;i++)
        if(isPrime[i])
            for(int j=i*i;j<=n;j+=i)
                isPrime[j]=false;

    vector<int> primes;
    for(int i=2;i<=n;i++)
        if(isPrime[i]) primes.push_back(i);

    for(int i=0;i<primes.size();i++)
        if(isPrime[i+1])
            cout<<primes[i]<<" ";
}`
  },
  java: {
    code: `import java.util.*;

class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();

        boolean[] isPrime=new boolean[n+1];
        Arrays.fill(isPrime,true);
        isPrime[0]=isPrime[1]=false;

        for(int i=2;i*i<=n;i++)
            if(isPrime[i])
                for(int j=i*i;j<=n;j+=i)
                    isPrime[j]=false;

        ArrayList<Integer> primes=new ArrayList<>();
        for(int i=2;i<=n;i++)
            if(isPrime[i]) primes.add(i);

        for(int i=0;i<primes.size();i++)
            if(isPrime[i+1])
                System.out.print(primes.get(i)+" ");
    }
}`
  },
  python: {
    code: `n=int(input())
isPrime=[True]*(n+1)
isPrime[0]=isPrime[1]=False

for i in range(2,int(n**0.5)+1):
    if isPrime[i]:
        for j in range(i*i,n+1,i):
            isPrime[j]=False

primes=[i for i in range(2,n+1) if isPrime[i]]

for i,p in enumerate(primes):
    if isPrime[i+1]:
        print(p,end=" ")`
  },
  javascript: {
    code: `const fs=require("fs");
let n=Number(fs.readFileSync(0,"utf8").trim());

let isPrime=Array(n+1).fill(true);
isPrime[0]=isPrime[1]=false;

for(let i=2;i*i<=n;i++)
    if(isPrime[i])
        for(let j=i*i;j<=n;j+=i)
            isPrime[j]=false;

let primes=[];
for(let i=2;i<=n;i++)
    if(isPrime[i]) primes.push(i);

primes.forEach((p,i)=>{
    if(isPrime[i+1]) process.stdout.write(p+" ");
});`
  }
}
,
        
        relatedTopics: ["Sieve of Eratosthenes", "Sequence manipulation"],
        
        commonMistakes: [
            {
                mistake: "Using 0-based indexing for the prime sequence",
                why: "Conventionally, '2' is the 1st prime, not the 0th",
                correct: "Check index + 1"
            }
        ],
        
        practiceQuestions: ["Find the N-th Super Prime", "Sum of Super Primes up to N"]
    },

    // ========================================
    // PROBLEM 50: Clock Angle Problem
    // ========================================
    {
        id: 50,
        title: "Clock Angle Problem",
        difficulty: "hard",
        category: "Math/Geometry",
        
        problemStatement: "Given time in HH:MM format, find the smaller angle (in degrees) between the hour hand and the minute hand of an analog clock.",
        
        examples: [
            {
                input: "H = 12, M = 30",
                output: "165°",
                explanation: "At 12:30, the minute hand is at 180°, and the hour hand has moved half-way toward 1:00 (15° from 12). Angle = |15 - 180| = 165."
            },
            {
                input: "H = 3, M = 30",
                output: "75°",
                explanation: "Hour hand at 3:30 is at 105°, minute hand is at 180°. Difference is 75."
            }
        ],
        
        explanation: {
            concept: "We calculate the position of both hands in degrees relative to the 12:00 (0°) mark.",
            
            approach: [
                "1. <strong>Minute Hand:</strong> Each minute, the hand moves $360/60 = 6^\\circ$. Angle = $M \\times 6$.",
                "2. <strong>Hour Hand:</strong> Each hour, it moves $360/12 = 30^\\circ$. Additionally, it moves $0.5^\\circ$ per minute ($30^\\circ/60$). Angle = $(H \\times 30) + (M \\times 0.5)$.",
                "3. Find the absolute difference: $|HourAngle - MinuteAngle|$.",
                "4. Return the smaller angle: $min(diff, 360 - diff)$."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Angle Rates:</h4>
                    <ul>
                        <li>Minute hand: <strong>6° per min</strong></li>
                        <li>Hour hand: <strong>30° per hour</strong></li>
                        <li>Hour hand drift: <strong>0.5° per min</strong></li>
                    </ul>
                    <p>At 9:00, Hour = 270°, Min = 0°. Diff = 270°. Smaller angle = 360 - 270 = 90°.</p>
                </div>
            `,
            
            algorithm: [
                "Step 1: If h == 12 set h = 0",
                "Step 2: hour_angle = 0.5 * (h * 60 + m)",
                "Step 3: minute_angle = 6 * m",
                "Step 4: angle = abs(hour_angle - minute_angle)",
                "Step 5: Return min(angle, 360 - angle)"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Constant time math formula.",
            space: "O(1)",
            spaceExplanation: "No storage required."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <math.h>

int main(){
    int h,m;
    scanf("%d %d",&h,&m);
    if(h==12) h=0;

    double ha=0.5*(h*60+m);
    double ma=6*m;

    double angle=fabs(ha-ma);
    if(angle>180) angle=360-angle;

    printf("%.1f",angle);
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main(){
    int h,m; cin>>h>>m;
    if(h==12) h=0;

    double ha=0.5*(h*60+m);
    double ma=6*m;

    double angle=abs(ha-ma);
    cout<<min(angle,360-angle);
}`
  },
  java: {
    code: `import java.util.*;

class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int h=sc.nextInt(), m=sc.nextInt();
        if(h==12) h=0;

        double ha=0.5*(h*60+m);
        double ma=6*m;

        double angle=Math.abs(ha-ma);
        System.out.println(Math.min(angle,360-angle));
    }
}`
  },
  python: {
    code: `h,m=map(int,input().split())
if h==12: h=0

ha=0.5*(h*60+m)
ma=6*m

angle=abs(ha-ma)
print(min(angle,360-angle))`
  },
  javascript: {
    code: `const fs=require("fs");
let [h,m]=fs.readFileSync(0,"utf8").trim().split(" ").map(Number);
if(h===12) h=0;

let ha=0.5*(h*60+m);
let ma=6*m;
let angle=Math.abs(ha-ma);

console.log(Math.min(angle,360-angle));`
  }
}
,
        
        relatedTopics: ["Geometry", "Relative Speed"],
        
        commonMistakes: [
            {
                mistake: "Ignoring the hour hand drift",
                why: "People often place the hour hand exactly on '3' at 3:30, but it has moved halfway to 4",
                correct: "Add (M * 0.5) to the hour hand angle"
            }
        ],
        
        practiceQuestions: ["At what time between 3 and 4 are hands overlapping?", "Hands at 90 degrees count in a day"]
    },

    // ========================================
    // PROBLEM 51: Tower of Hanoi
    // ========================================
    {
        id: 51,
        title: "Tower of Hanoi",
        difficulty: "hard",
        category: "Recursion",
        
        problemStatement: "You have 3 rods and N disks of different sizes. Initially, all disks are stacked on the first rod in decreasing order. Move the entire stack to the third rod following these rules: 1. Only one disk can move at a time. 2. A larger disk cannot be placed on a smaller disk.",
        
        examples: [
            {
                input: "N = 2",
                output: "Move 1 from A to B, Move 2 from A to C, Move 1 from B to C",
                explanation: "Minimum 3 moves ($2^2 - 1$)."
            },
            {
                input: "N = 3",
                output: "7 moves",
                explanation: "Minimum 7 moves ($2^3 - 1$)."
            }
        ],
        
        explanation: {
            concept: "Tower of Hanoi is a classic <strong>Recursive</strong> problem. To move $N$ disks from Source to Destination, you must first move the top $N-1$ disks to the Auxiliary rod, move the bottom-most disk to Destination, and then move the $N-1$ disks from Auxiliary to Destination.",
            
            approach: [
                "Base Case: If N = 1, move disk directly from Source to Destination.",
                "Recursive Step 1: Move $N-1$ disks from Source to Auxiliary.",
                "Recursive Step 2: Move the $N$-th (largest) disk from Source to Destination.",
                "Recursive Step 3: Move the $N-1$ disks from Auxiliary to Destination."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Recursion Tree (N=3):</h4>
                    <pre style="font-size: 0.8rem; color: #8b5cf6;">
        H(3, S, D, A)
       /      |      \\
   H(2,S,A,D) Move(3) H(2,A,D,S)
    </pre>
                    <p>Total moves always equals $2^N - 1$.</p>
                </div>
            `,
            
            algorithm: [
                "Function solve(N, src, dest, aux):",
                "   If N == 0: Return",
                "   solve(N-1, src, aux, dest)",
                "   Print 'Move N from src to dest'",
                "   solve(N-1, aux, dest, src)"
            ]
        },
        
        complexity: {
            time: "O(2ᴺ)",
            timeExplanation: "Each call branches into two more calls, leading to exponential growth.",
            space: "O(N)",
            spaceExplanation: "Due to the recursive call stack depth."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

void hanoi(int n,char s,char d,char a){
    if(n==0) return;
    hanoi(n-1,s,a,d);
    printf("Move %d from %c to %c\n",n,s,d);
    hanoi(n-1,a,d,s);
}

int main(){
    int n;
    scanf("%d",&n);
    hanoi(n,'A','C','B');
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

void hanoi(int n,char s,char d,char a){
    if(n==0) return;
    hanoi(n-1,s,a,d);
    cout<<"Move "<<n<<" from "<<s<<" to "<<d<<endl;
    hanoi(n-1,a,d,s);
}

int main(){
    int n; cin>>n;
    hanoi(n,'A','C','B');
}`
  },
  java: {
    code: `import java.util.*;

class Main{
    static void hanoi(int n,String s,String d,String a){
        if(n==0) return;
        hanoi(n-1,s,a,d);
        System.out.println("Move "+n+" from "+s+" to "+d);
        hanoi(n-1,a,d,s);
    }

    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        hanoi(n,"A","C","B");
    }
}`
  },
  python: {
    code: `def hanoi(n,s,d,a):
    if n==0: return
    hanoi(n-1,s,a,d)
    print(f"Move {n} from {s} to {d}")
    hanoi(n-1,a,d,s)

n=int(input())
hanoi(n,"A","C","B")`
  },
  javascript: {
    code: `const fs=require("fs");
let n=Number(fs.readFileSync(0,"utf8").trim());

function hanoi(n,s,d,a){
    if(n===0) return;
    hanoi(n-1,s,a,d);
    console.log(\`Move \${n} from \${s} to \${d}\`);
    hanoi(n-1,a,d,s);
}

hanoi(n,"A","C","B");`
  }
}
,
        
        relatedTopics: ["Recursion", "Binary Trees", "Mathematical Induction"],
        
        commonMistakes: [
            {
                mistake: "Incorrectly swapping the rod parameters in recursive calls",
                why: "This will move disks to the wrong rods and violate the rules",
                correct: "In step 1, destination is the auxiliary. In step 3, source is the auxiliary."
            }
        ],
        
        practiceQuestions: ["Iterative Tower of Hanoi", "Find the state after K moves", "Tower of Hanoi with 4 rods (Reve's puzzle)"]
    },
    // ========================================
    // PROBLEM 52: Rat and Poisoned
    // ========================================
    {
        id: 52,
        title: "Rat and Poisoned",
        difficulty: "hard",
        category: "Logic/Binary",
        
        problemStatement: "There are N bottles of wine, and exactly one of them is poisoned. You have some rats to test the wine. If a rat drinks even a drop of the poisoned wine, it will die in 24 hours. What is the minimum number of rats needed to identify the poisoned bottle within 24 hours?",
        
        examples: [
            {
                input: "N = 8",
                output: "3",
                explanation: "With 3 rats, we can represent $2^3 = 8$ different scenarios (binary encoding)."
            },
            {
                input: "N = 1000",
                output: "10",
                explanation: "$2^{10} = 1024$, which is enough to cover 1000 bottles."
            }
        ],
        
        explanation: {
            concept: "This is a <strong>Binary Encoding</strong> problem. Each rat can be in two states: dead or alive. If we have $R$ rats, there are $2^R$ possible combinations of dead/alive rats.",
            
            approach: [
                "1. Assign each bottle a unique binary ID from $0$ to $N-1$.",
                "2. If the $i$-th bit of a bottle's ID is 1, give a drop of that bottle to Rat $i$.",
                "3. After 24 hours, look at which rats died.",
                "4. If Rat 0 and Rat 2 died, but Rat 1 lived, the poisoned bottle ID is $101$ in binary (Bottle 5).",
                "5. Therefore, we need $R$ such that $2^R \ge N$."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Binary Mapping (8 Bottles):</h4>
                    <p>Bottle 5 ID: <strong>101</strong></p>
                    <div class="check-steps">
                        <div>Rat 2 (Bit 2): Drinks? <strong>Yes</strong> (1)</div>
                        <div>Rat 1 (Bit 1): Drinks? <strong>No</strong> (0)</div>
                        <div>Rat 0 (Bit 0): Drinks? <strong>Yes</strong> (1)</div>
                        <div class="result">If Rats 2 and 0 die → Bottle 5 is Poisoned!</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Input number of bottles N",
                "Step 2: If N is 1, return 0 (no testing needed)",
                "Step 3: Calculate R = ceil(log2(N))",
                "Step 4: Return R"
            ]
        },
        
        complexity: {
            time: "O(1)",
            timeExplanation: "Direct calculation using the logarithm formula.",
            space: "O(1)",
            spaceExplanation: "No additional storage needed."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>
#include <math.h>

int main(){
    int n;
    scanf("%d",&n);
    if(n<=1) printf("0");
    else printf("%d",(int)ceil(log2(n)));
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin>>n;
    if(n<=1) cout<<0;
    else cout<<ceil(log2(n));
}`
  },
  java: {
    code: `import java.util.*;

class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if(n<=1) System.out.println(0);
        else System.out.println((int)Math.ceil(Math.log(n)/Math.log(2)));
    }
}`
  },
  python: {
    code: `import math
n=int(input())
print(0 if n<=1 else math.ceil(math.log2(n)))`
  },
  javascript: {
    code: `const fs=require("fs");
let n=Number(fs.readFileSync(0,"utf8").trim());
console.log(n<=1?0:Math.ceil(Math.log2(n)));`
  }
}
,
        
        relatedTopics: ["Information Theory", "Binary Search", "Bitmasking"],
        
        commonMistakes: [
            {
                mistake: "Suggesting N/2 or N rats",
                why: "This assumes we test bottles one by one or in simple groups",
                correct: "Use binary combinations to maximize information per rat"
            }
        ],
        
        practiceQuestions: ["How many rats if you have 48 hours (2 rounds of testing)?", "Identify 2 poisoned bottles out of N"]
    },

    // ========================================
    // PROBLEM 53: 8 Puzzle Problem
    // ========================================
    {
        id: 53,
        title: "8 puzzle Problem",
        difficulty: "hard",
        category: "Algorithms/State Space",
        
        problemStatement: "Given a 3x3 board with 8 numbered tiles and one empty space, find the minimum number of moves required to reach a target 'Goal State' by sliding tiles into the empty space.",
        
        examples: [
            {
                input: "Start: [[1,2,3],[4,0,5],[7,8,6]]",
                output: "1 Move",
                explanation: "Slide 6 into the center (0) to reach goal [[1,2,3],[4,5,6],[7,8,0]]."
            }
        ],
        
        explanation: {
            concept: "The 8-puzzle is a <strong>State Space Search</strong> problem. We treat each configuration of the board as a 'Node' in a graph and search for the shortest path to the goal node.",
            
            approach: [
                "1. Use <strong>Breadth-First Search (BFS)</strong> to find the shortest path in an unweighted state space.",
                "2. For large distances, use <strong>A* Search</strong> with a heuristic like 'Manhattan Distance' or 'Hamming Distance'.",
                "3. Track visited states in a Hash Set to avoid infinite loops.",
                "4. The empty space (0) can move in 4 directions: Up, Down, Left, Right."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>State Transition:</h4>
                    <div style="display:flex; justify-content:space-around; align-items:center; font-family:monospace;">
                        <div style="border:1px solid #333; padding:5px;">1 2 3<br>4 0 5<br>7 8 6</div>
                        <div class="arrow">→</div>
                        <div style="border:1px solid #10b981; padding:5px;">1 2 3<br>4 5 0<br>7 8 6</div>
                    </div>
                    <p style="font-size:0.8rem; margin-top:10px;">Move: Right (0 swaps with 5)</p>
                </div>
            `,
            
            algorithm: [
                "Step 1: Push starting state into Queue",
                "Step 2: Add state to 'Visited' Set",
                "Step 3: While Queue not empty:",
                "   a. Pop current state",
                "   b. If current == goal, return moves",
                "   c. Generate all 4 possible neighbor states by moving '0'",
                "   d. If neighbor not visited: Push to Queue and Mark visited"
            ]
        },
        
        complexity: {
            time: "O(9!)",
            timeExplanation: "There are 9! (362,880) total permutations of the tiles.",
            space: "O(9!)",
            spaceExplanation: "To store the visited states in the hash set."
        },
        
        solutions: {
  python: {
    code: `from collections import deque

start=list(map(int,input().split()))
goal=[1,2,3,4,5,6,7,8,0]

def neighbors(s):
    res=[]
    i=s.index(0)
    r,c=i//3,i%3
    for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:
        nr,nc=r+dr,c+dc
        if 0<=nr<3 and 0<=nc<3:
            ni=nr*3+nc
            t=s[:]
            t[i],t[ni]=t[ni],t[i]
            res.append(t)
    return res

q=deque([(start,0)])
vis={tuple(start)}

while q:
    cur,d=q.popleft()
    if cur==goal:
        print(d)
        break
    for nxt in neighbors(cur):
        t=tuple(nxt)
        if t not in vis:
            vis.add(t)
            q.append((nxt,d+1))`
  }
}
,
        
        relatedTopics: ["BFS", "A* Algorithm", "Heuristics"],
        
        commonMistakes: [
            {
                mistake: "Not checking for solvability",
                why: "Half of all random 8-puzzle configurations are impossible to solve",
                correct: "Check the 'Inversion Count' of the board before searching"
            }
        ],
        
        practiceQuestions: ["Implement A* using Manhattan distance", "Solve the 15-puzzle (4x4)"]
    },

    // ========================================
    // PROBLEM 54: Euler's Totient Function
    // ========================================
    {
        id: 54,
        title: "Euler's Totient Function",
        difficulty: "hard",
        category: "Math/Number Theory",
        
        problemStatement: "Given a positive integer N, calculate Euler's Totient Function $\phi(N)$. $\phi(N)$ is the count of numbers from $1$ to $N$ that are relatively prime (coprime) to $N$ ($gcd(i, N) = 1$).",
        
        examples: [
            {
                input: "N = 9",
                output: "6",
                explanation: "Numbers coprime to 9 are {1, 2, 4, 5, 7, 8}."
            },
            {
                input: "N = 10",
                output: "4",
                explanation: "Numbers coprime to 10 are {1, 3, 7, 9}."
            }
        ],
        
        explanation: {
            concept: "<strong>Euler's Totient Theorem</strong> states that $\phi(n) = n \times \prod_{p|n} (1 - \frac{1}{p})$, where $p$ are distinct prime factors of $n$.",
            
            approach: [
                "1. Start with `result = N`.",
                "2. Find all prime factors of N.",
                "3. For each unique prime factor $p$, update: `result = result - (result / p)`.",
                "4. This efficiently subtracts the counts of multiples of each prime factor."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Example N = 10:</h4>
                    <p>Prime factors: 2, 5</p>
                    <div class="check-steps">
                        <div>1. Start: res = 10</div>
                        <div>2. p = 2: res = 10 - (10/2) = 5</div>
                        <div>3. p = 5: res = 5 - (5/5) = 4</div>
                        <div class="result">✓ Result = 4</div>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: result = n",
                "Step 2: For p = 2 to sqrt(n):",
                "   a. If p divides n:",
                "      i. While p divides n: n = n / p",
                "      ii. result = result * (1 - 1/p)",
                "Step 3: If n > 1: result = result * (1 - 1/n)",
                "Step 4: Return result"
            ]
        },
        
        complexity: {
            time: "O(√N)",
            timeExplanation: "We only iterate up to the square root of N to find prime factors.",
            space: "O(1)",
            spaceExplanation: "Only constant extra space used."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

int main(){
    int n;
    scanf("%d",&n);
    int res=n;

    for(int i=2;i*i<=n;i++){
        if(n%i==0){
            while(n%i==0) n/=i;
            res-=res/i;
        }
    }
    if(n>1) res-=res/n;
    printf("%d",res);
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin>>n;
    int res=n;
    for(int i=2;i*i<=n;i++){
        if(n%i==0){
            while(n%i==0) n/=i;
            res-=res/i;
        }
    }
    if(n>1) res-=res/n;
    cout<<res;
}`
  },
  java: {
    code: `import java.util.*;

class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int res=n;

        for(int i=2;i*i<=n;i++){
            if(n%i==0){
                while(n%i==0) n/=i;
                res-=res/i;
            }
        }
        if(n>1) res-=res/n;
        System.out.println(res);
    }
}`
  },
  python: {
    code: `n=int(input())
res=n
i=2
while i*i<=n:
    if n%i==0:
        while n%i==0:
            n//=i
        res-=res//i
    i+=1
if n>1:
    res-=res//n
print(res)`
  },
  javascript: {
    code: `const fs=require("fs");
let n=Number(fs.readFileSync(0,"utf8").trim());
let res=n;

for(let i=2;i*i<=n;i++){
    if(n%i===0){
        while(n%i===0) n/=i;
        res-=res/i;
    }
}
if(n>1) res-=res/n;
console.log(res);`
  }
}
,
        
        relatedTopics: ["GCD", "Prime Factorization", "Euler's Theorem"],
        
        commonMistakes: [
            {
                mistake: "Checking GCD for every number from 1 to N",
                why: "Time complexity O(N log N) is too slow for large N (10^9)",
                correct: "Use the prime product formula in O(√N)"
            }
        ],
        
        practiceQuestions: ["Find sum of all numbers coprime to N", "Implement Sieve for multiple Totient queries"]
    },

    // ========================================
    // PROBLEM 55: Josephus Problem
    // ========================================
    {
        id: 55,
        title: "Josephus Problem",
        difficulty: "hard",
        category: "Recursion/Math",
        
        problemStatement: "There are N people standing in a circle waiting to be executed. The counting out begins at some point in the circle and proceeds around the circle in a fixed direction. In each step, a certain number of people are skipped and the next person is executed. This process is repeated until only one person remains. Find the position of the survivor.",
        
        examples: [
            {
                input: "n = 5, k = 2",
                output: "3",
                explanation: "Kill 2, 4, 1, 5. Survivor is 3."
            },
            {
                input: "n = 7, k = 3",
                output: "4",
                explanation: "Kill 3, 6, 2, 7, 5, 1. Survivor is 4."
            }
        ],
        
        explanation: {
            concept: "The survivor's position for $(n, k)$ can be found using the sub-problem $(n-1, k)$. This is the <strong>Recursive Substructure</strong> of the problem.",
            
            approach: [
                "1. If there is only 1 person, they are the survivor (Position 1).",
                "2. For $N$ people, after the first person is killed, we are left with $N-1$ people.",
                "3. The survivor of $N$ people is the survivor of $(N-1)$ people shifted by $K$.",
                "4. Formula (0-indexed): $J(n, k) = (J(n-1, k) + k) \pmod n$."
            ],
            
            visualization: `
                <div class="visual-box">
                    <h4>Circle Elimination (5, 2):</h4>
                    <div style="font-family: monospace;">
                        [1, 2, 3, 4, 5] -> 2 killed<br>
                        [1, 3, 4, 5] -> 4 killed<br>
                        [1, 3, 5] -> 1 killed<br>
                        [3, 5] -> 5 killed<br>
                        <strong>Survivor: 3</strong>
                    </div>
                </div>
            `,
            
            algorithm: [
                "Step 1: Function J(n, k):",
                "   a. If n == 1: return 0",
                "   b. Else: return (J(n-1, k) + k) % n",
                "Step 2: Return J(n, k) + 1 (to convert to 1-based position)"
            ]
        },
        
        complexity: {
            time: "O(N)",
            timeExplanation: "Requires N recursive calls or one loop up to N.",
            space: "O(N) or O(1)",
            spaceExplanation: "Recursive uses O(N) stack; Iterative uses O(1) space."
        },
        
        solutions: {
  c: {
    code: `#include <stdio.h>

int main(){
    int n,k;
    scanf("%d %d",&n,&k);
    int res=0;
    for(int i=1;i<=n;i++)
        res=(res+k)%i;
    printf("%d",res+1);
}`
  },
  cpp: {
    code: `#include <bits/stdc++.h>
using namespace std;

int main(){
    int n,k; cin>>n>>k;
    int res=0;
    for(int i=1;i<=n;i++)
        res=(res+k)%i;
    cout<<res+1;
}`
  },
  java: {
    code: `import java.util.*;

class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(), k=sc.nextInt();
        int res=0;
        for(int i=1;i<=n;i++)
            res=(res+k)%i;
        System.out.println(res+1);
    }
}`
  },
  python: {
    code: `n,k=map(int,input().split())
res=0
for i in range(1,n+1):
    res=(res+k)%i
print(res+1)`
  },
  javascript: {
    code: `const fs=require("fs");
let [n,k]=fs.readFileSync(0,"utf8").trim().split(" ").map(Number);
let res=0;
for(let i=1;i<=n;i++)
    res=(res+k)%i;
console.log(res+1);`
  }
}
,
        
        relatedTopics: ["Recursion", "Queues", "Circular Linked Lists"],
        
        commonMistakes: [
            {
                mistake: "Confusing 0-based and 1-based indexing",
                why: "The modulo operator works on 0 to N-1; results must be shifted for human-readable positions",
                correct: "Calculate in 0-based and add 1 at the end"
            }
        ],
        
        practiceQuestions: ["Josephus problem for k=2 (Power of 2 trick)", "Find the M-th person to be executed"]
    }
];


    
    