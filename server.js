// /*
//   DSA Visualizer — Code Execution Server
//   FIXED VERSION: Windows + all languages + empty stdin + all problems
//   Run: node server.js
//   Requires: npm install express cors
// */

// const express = require('express');
// const cors    = require('cors');
// const { execSync, exec } = require('child_process');
// const fs      = require('fs');
// const path    = require('path');
// const os      = require('os');
// const crypto  = require('crypto');

// const app  = express();
// const PORT = 3001;

// // Detect Windows
// const isWindows = process.platform === 'win32';

// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.static(path.join(__dirname)));

// // Language configs — Windows aware
// const LANG_CONFIG = {
//     c: {
//     filename: 'solution.c',
//     compile:  (dir) => isWindows
//       ? `gcc -o "${path.join(dir,'solution.exe')}" "${path.join(dir,'solution.c')}" 2>&1`
//       : `gcc -o "${path.join(dir,'solution')}" "${path.join(dir,'solution.c')}" 2>&1`,
//     run: (dir) => isWindows
//       ? `"${path.join(dir,'solution.exe')}"`
//       : `"${path.join(dir,'solution')}"`,
//     compiled: true
//   },
//   cpp: {
//     filename: 'solution.cpp',
//     compile:  (dir) => isWindows
//       ? `g++ -o "${path.join(dir,'solution.exe')}" "${path.join(dir,'solution.cpp')}" -std=c++17 2>&1`
//       : `g++ -o "${path.join(dir,'solution')}" "${path.join(dir,'solution.cpp')}" -std=c++17 2>&1`,
//     run: (dir) => isWindows
//       ? `"${path.join(dir,'solution.exe')}"`
//       : `"${path.join(dir,'solution')}"`,
//     compiled: true
//   },
//   python: {
//     filename: 'solution.py',
//     compile:  null,
//     run:      (dir) => `python "${path.join(dir,'solution.py')}"`,
//     compiled: false
//   },
//   java: {
//     filename: 'Solution.java',
//     compile:  (dir) => `javac "${path.join(dir,'Solution.java')}" -d "${dir}" 2>&1`,
//     run:      (dir) => `java -cp "${dir}" Solution`,
//     compiled: true
//   },
//   javascript: {
//     filename: 'solution.js',
//     compile:  null,
//     run:      (dir) => `node "${path.join(dir,'solution.js')}"`,
//     compiled: false
//   }
// };

// // Check if command exists
// function checkInstalled(cmd) {
//   try {
//     execSync(isWindows ? `where ${cmd}` : `which ${cmd}`, { stdio: 'ignore' });
//     return true;
//   } catch(e) { return false; }
// }

// // Prepare stdin — fix empty input issues for all languages
// function prepareStdin(stdin, language) {
//   if (stdin === null || stdin === undefined || stdin.trim() === '') {
//     // Java Scanner needs actual whitespace to not throw NoSuchElementException
//     if (language === 'java') return ' \n';
//     return '\n';
//   }
//   return stdin.endsWith('\n') ? stdin : stdin + '\n';
// }

// // Main execute endpoint
// app.post('/execute', (req, res) => {
//   const { code, language, stdin = '' } = req.body;

//   if (!code || !language) {
//     return res.json({ stdout: '', stderr: 'Missing code or language', exitCode: 1 });
//   }

//   const cfg = LANG_CONFIG[language];
//   if (!cfg) {
//     return res.json({ stdout: '', stderr: `Unsupported language: ${language}`, exitCode: 1 });
//   }

//   // Create unique temp directory
//   const tmpDir    = path.join(os.tmpdir(), 'dsa_' + crypto.randomBytes(8).toString('hex'));
//   const stdinPath = path.join(tmpDir, 'stdin.txt');
//   const filePath  = path.join(tmpDir, cfg.filename);

//   fs.mkdirSync(tmpDir, { recursive: true });
//   fs.writeFileSync(filePath,  code);
// fs.writeFileSync(stdinPath, prepareStdin(stdin, language));

//   try {
//     // Step 1: Compile if needed
//     if (cfg.compiled && cfg.compile) {
//       let compileOutput = '';
//       try {
//         compileOutput = execSync(cfg.compile(tmpDir), {
//           timeout:     20000,
//           encoding:    'utf8',
//           windowsHide: true
//         }) || '';
//       } catch (compileErr) {
//         compileOutput = compileErr.stdout || compileErr.stderr || compileErr.message || 'Compilation failed';
//         cleanup(tmpDir);
//         return res.json({
//           stdout: '', stderr: '',
//           compile_output: compileOutput.trim(),
//           exitCode: 1
//         });
//       }

//       // Check for actual errors (not just warnings)
//       if (compileOutput && (
//         compileOutput.includes(': error:') ||
//         compileOutput.includes('error:') ||
//         compileOutput.includes('cannot find symbol') ||
//         compileOutput.includes('undefined reference') ||
//         compileOutput.includes('fatal error')
//       )) {
//         cleanup(tmpDir);
//         return res.json({
//           stdout: '', stderr: '',
//           compile_output: compileOutput.trim(),
//           exitCode: 1
//         });
//       }
//     }

//     // Step 2: Run
//     const runCmd  = cfg.run(tmpDir);
//     const fullCmd = `${runCmd} < "${stdinPath}"`;

//     exec(fullCmd, {
//       timeout:     10000,
//       encoding:    'utf8',
//       windowsHide: true,
//       shell:       isWindows ? 'cmd.exe' : '/bin/sh'
//     }, (err, stdout, stderr) => {
//       cleanup(tmpDir);

//       // Time limit exceeded
//       if (err && (err.killed || err.signal === 'SIGTERM')) {
//         return res.json({ stdout: '', stderr: '⏱ Time Limit Exceeded (10s)', compile_output: '', exitCode: 124 });
//       }

//       // Windows ETIMEDOUT = compiler not found or PATH issue
//       if (err && err.code === 'ETIMEDOUT') {
//         return res.json({
//           stdout: '',
//           stderr: `Command timed out. Make sure ${language} compiler is installed and added to PATH.`,
//           compile_output: '',
//           exitCode: 1
//         });
//       }

//       return res.json({
//         stdout:         (stdout || '').trim(),
//         stderr:         (stderr || '').trim(),
//         compile_output: '',
//         exitCode:       err ? (err.code ?? 1) : 0
//       });
//     });

//   } catch (e) {
//     cleanup(tmpDir);
//     return res.json({ stdout: '', stderr: e.message, compile_output: '', exitCode: 1 });
//   }
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'ok',
//     platform: process.platform,
//     languages: {
//        c:          checkInstalled('gcc'),
//       cpp:        checkInstalled('g++'),
//       python:     checkInstalled('python'),
//       java:       checkInstalled('javac'),
//       javascript: checkInstalled('node')
//     }
//   });
// });

// function cleanup(dir) {
//   try { fs.rmSync(dir, { recursive: true, force: true }); } catch(e) {}
// }

// app.listen(PORT, () => {
//   const gpp  = checkInstalled('g++');
//   const py   = checkInstalled('python');
//   const java = checkInstalled('javac');
//   const node = checkInstalled('node');
//   console.log(`\n✅ DSA Code Execution Server → http://localhost:${PORT}`);
//   console.log(`🖥  Platform: ${process.platform}\n`);
//   console.log(`📋 Languages:`);
//   console.log(`   C:          ${checkInstalled('gcc') ? '✅' : '❌  Install GCC'}`);
//   console.log(`   C++:        ${gpp  ? '✅' : '❌  Add C:\\MinGW\\bin to PATH'}`);
//   console.log(`   Python:     ${py   ? '✅' : '❌  Install from python.org'}`);
//   console.log(`   Java:       ${java ? '✅' : '❌  Install JDK from oracle.com'}`);
//   console.log(`   JavaScript: ${node ? '✅' : '❌  Install from nodejs.org'}`);
//   console.log(`\n🌐 Open: http://localhost:${PORT}/practice.html\n`);

// });



/*
  DSA Visualizer — Code Execution Server
  FIXED: All paths use spawn() args arrays — no shell quoting issues on Windows
  Run: node server.js
  Requires: npm install express cors
*/

const express = require('express');
const cors    = require('cors');
const { execFileSync, spawn } = require('child_process');
const fs      = require('fs');
const path    = require('path');
const os      = require('os');
const crypto  = require('crypto');

const app  = express();
const PORT = 3001;
const isWindows = process.platform === 'win32';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

/* ─────────────────────────────────────────────────────────
   Detect Python — try 'py', 'python3', 'python' in order.
   Verify by running --version (avoids Windows Store stub).
───────────────────────────────────────────────────────── */
function detectPython() {
  const candidates = isWindows ? ['py', 'python3', 'python'] : ['python3', 'python'];
  for (const cmd of candidates) {
    try {
      const out = execFileSync(cmd, ['--version'], { encoding: 'utf8', timeout: 4000, windowsHide: true });
      if (/python\s+\d+\.\d+/i.test(out)) {
        console.log(`[python] Using: ${cmd} (${out.trim()})`);
        return cmd;
      }
    } catch(e) {}
  }
  console.warn('[python] No working Python found!');
  return null;
}
const PYTHON_CMD = detectPython();

/* ─────────────────────────────────────────────────────────
   Language configs
   compile(dir) → { exe, args }  (for execFileSync)
   run(dir)     → { exe, args }  (for spawn with NO shell)
───────────────────────────────────────────────────────── */
const LANG = {
  c: {
    filename: 'solution.c',
    compile: (dir) => ({
      exe:  'gcc',
      args: ['-o', path.join(dir, isWindows ? 'solution.exe' : 'solution'),
             path.join(dir, 'solution.c')]
    }),
    run: (dir) => ({
      exe:  path.join(dir, isWindows ? 'solution.exe' : 'solution'),
      args: []
    }),
    compiled: true
  },

  cpp: {
    filename: 'solution.cpp',
    compile: (dir) => ({
      exe:  'g++',
      args: ['-o', path.join(dir, isWindows ? 'solution.exe' : 'solution'),
             path.join(dir, 'solution.cpp'), '-std=c++17']
    }),
    run: (dir) => ({
      exe:  path.join(dir, isWindows ? 'solution.exe' : 'solution'),
      args: []
    }),
    compiled: true
  },

  python: {
    filename: 'solution.py',
    compile: null,
    run: (dir) => ({
      exe:  PYTHON_CMD,
      args: [path.join(dir, 'solution.py')]
    }),
    compiled: false
  },

  java: {
    filename: 'Solution.java',
    compile: (dir) => {
      fs.mkdirSync(path.join(dir, 'classes'), { recursive: true });
      return {
        exe:  'javac',
        args: ['-d', path.join(dir, 'classes'), path.join(dir, 'Solution.java')]
      };
    },
    run: (dir) => ({
      exe:  'java',
      args: ['-cp', path.join(dir, 'classes'), 'Solution']
    }),
    compiled: true
  },

  javascript: {
    filename: 'solution.js',
    compile: null,
    run: (dir) => ({
      exe:  'node',
      args: [path.join(dir, 'solution.js')]
    }),
    compiled: false
  }
};

/* ─────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────── */
function isInstalled(exe) {
  try {
    execFileSync(exe, ['--version'], { stdio: 'ignore', timeout: 3000, windowsHide: true });
    return true;
  } catch(e) {
    if (e.code === 'ENOENT') return false;
    // Returned non-zero but exists (e.g. gcc --version exits 0 but javac --version exits 1)
    return true;
  }
}

function cleanup(dir) {
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch(e) {}
}

/* ─────────────────────────────────────────────────────────
   POST /execute
───────────────────────────────────────────────────────── */
app.post('/execute', (req, res) => {
  const { code, language, stdin = '' } = req.body;

  if (!code || !language) {
    return res.json({ compile_error: '', compile_output: '', stdout: '', stderr: 'Missing code or language', exitCode: 1 });
  }

  const cfg = LANG[language];
  if (!cfg) {
    return res.json({ compile_error: '', compile_output: '', stdout: '', stderr: `Unsupported language: ${language}`, exitCode: 1 });
  }

  if (language === 'python' && !PYTHON_CMD) {
    return res.json({ compile_error: '', compile_output: '',
      stdout: '',
      stderr: 'Python not found. Install from python.org and restart the server.', exitCode: 1 });
  }

  // Create temp dir + write source
  const tmpDir = path.join(os.tmpdir(), 'dsa_' + crypto.randomBytes(8).toString('hex'));
  try {
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, cfg.filename), code, 'utf8');
  } catch(e) {
    return res.json({ compile_error: '', compile_output: '', stdout: '', stderr: 'File write error: ' + e.message, exitCode: 1 });
  }

  /* ── Compile ── */
  if (cfg.compiled && cfg.compile) {
    const { exe, args } = cfg.compile(tmpDir);
    try {
      execFileSync(exe, args, {
        cwd: tmpDir,
        timeout: 20000,
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe']
      });
    } catch(e) {
      const compileOut = [e.stdout, e.stderr, e.message].filter(Boolean).join('\n');
      cleanup(tmpDir);
      return res.json({ compile_error: compileOut.trim(), compile_output: compileOut.trim(), stdout: "", stderr: "", exitCode: 1 });
    }
  }

  /* ── Run — spawn with args array, NO shell ── */
  const { exe, args } = cfg.run(tmpDir);

  let child;
  try {
    child = spawn(exe, args, {
      cwd: tmpDir,
      windowsHide: true
      // shell: false is the DEFAULT — explicitly not setting shell:true
    });
  } catch(e) {
    cleanup(tmpDir);
    return res.json({ compile_error: '', compile_output: '', stdout: '', stderr: 'Spawn error: ' + e.message, exitCode: 1 });
  }

  let stdout = '', stderr = '';
  child.stdout.on('data', d => { stdout += d.toString(); });
  child.stderr.on('data', d => { stderr += d.toString(); });

  // Feed stdin and close
  const stdinData = stdin ? (stdin.endsWith('\n') ? stdin : stdin + '\n') : '';
  try {
    if (stdinData) child.stdin.write(stdinData);
    child.stdin.end();
  } catch(e) {
    console.error('[stdin] write error:', e.message);
  }

  const timer = setTimeout(() => {
    try { child.kill(); } catch(e) {}
    cleanup(tmpDir);
    res.json({ compile_error: '', compile_output: '', stdout: stdout.trim(), stderr: '⏱ Time Limit Exceeded (10s)', exitCode: 124 });
  }, 10000);

  child.on('close', (code) => {
    clearTimeout(timer);
    cleanup(tmpDir);
    res.json({ compile_error: '', compile_output: '', stdout, stderr: stderr.trim(), exitCode: code ?? 0 });
  });

  child.on('error', (err) => {
    clearTimeout(timer);
    cleanup(tmpDir);
    res.json({ compile_error: '', compile_output: '', stdout: '', stderr: `Could not run ${exe}: ${err.message}`, exitCode: 1 });
  });
});

/* ─────────────────────────────────────────────────────────
   POST /analyze — count inputs the program needs
───────────────────────────────────────────────────────── */
app.post('/analyze', (req, res) => {
  const { code, language } = req.body;
  if (!code || !language) return res.json({ inputCount: 0, prompts: [] });

  const prompts = [];

  if (language === 'python') {
    const re = /\binput\s*\(\s*(?:f?["'`]([^"'`]*)["'`])?\s*\)/g;
    let m;
    while ((m = re.exec(code)) !== null) prompts.push(m[1] || '');

  } else if (language === 'cpp' || language === 'c') {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (/cin\s*>>/.test(line) || /scanf\s*\(/.test(line)) {
        let prompt = '';
        for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
          const prev = lines[j].trim();
          if (/cout\s*<</.test(prev) || /printf\s*\(/.test(prev)) {
            const m = prev.match(/<<\s*["']([^"']+)["']/) || prev.match(/printf\s*\(\s*["']([^"'\\]+)/);
            if (m) prompt = m[1].replace(/\\n/g, '').trim();
            break;
          }
        }
        prompts.push(prompt);
      }
    }

  } else if (language === 'java') {
    const re = /\.next(?:Int|Long|Double|Float|Line|Boolean|Short|Byte)?\s*\(\s*\)/g;
    let m;
    while ((m = re.exec(code)) !== null) prompts.push('');

  } else if (language === 'javascript') {
    const count = (code.match(/lines\[idx\+\+\]/g) || []).length;
    for (let i = 0; i < count; i++) prompts.push('');
  }

  res.json({ inputCount: prompts.length, prompts });
});

/* ─────────────────────────────────────────────────────────
   GET /health
───────────────────────────────────────────────────────── */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: process.platform,
    pythonCmd: PYTHON_CMD,
    languages: {
      c:          isInstalled('gcc'),
      cpp:        isInstalled('g++'),
      python:     !!PYTHON_CMD,
      java:       isInstalled('javac'),
      javascript: isInstalled('node')
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ DSA Code Execution Server → http://localhost:${PORT}`);
  console.log(`🖥  Platform: ${process.platform}\n`);
  console.log(`📋 Languages:`);
  console.log(`   C:          ${isInstalled('gcc')   ? '✅' : '❌  gcc not found'}`);
  console.log(`   C++:        ${isInstalled('g++')   ? '✅' : '❌  g++ not found'}`);
  console.log(`   Python:     ${PYTHON_CMD           ? `✅  (${PYTHON_CMD})` : '❌  not found'}`);
  console.log(`   Java:       ${isInstalled('javac') ? '✅' : '❌  javac not found'}`);
  console.log(`   JavaScript: ${isInstalled('node')  ? '✅' : '❌  node not found'}`);
  console.log(`\n🌐 Open: http://localhost:${PORT}/codeeditor.html\n`);
  if (isWindows) {
    console.log(`💡 Windows tips:`);
    console.log(`   Python → install from python.org (check "Add to PATH")`);
    console.log(`   C/C++  → install MinGW-w64, add its bin\\ to PATH`);
    console.log(`   Java   → install JDK, let installer set JAVA_HOME\n`);
  }
});