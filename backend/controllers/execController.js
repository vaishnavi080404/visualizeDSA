const { execFileSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const isWindows = process.platform === "win32";

/* ── Private Helpers (Logic you already had) ── */
function detectPython() {
  const candidates = isWindows ? ["py", "python3", "python"] : ["python3", "python"];
  for (const cmd of candidates) {
    try {
      const out = execFileSync(cmd, ["--version"], { encoding: "utf8", timeout: 4000, windowsHide: true });
      if (/python\s+\d+\.\d+/i.test(out)) return cmd;
    } catch (e) {}
  }
  return null;
}
const PYTHON_CMD = detectPython();

const LANG = {
  c: {
    filename: "solution.c",
    compile: (dir) => ({
      exe: "gcc",
      args: ["-o", path.join(dir, isWindows ? "solution.exe" : "solution"), path.join(dir, "solution.c")],
    }),
    run: (dir) => ({ exe: path.join(dir, isWindows ? "solution.exe" : "solution"), args: [] }),
    compiled: true,
  },
  cpp: {
    filename: "solution.cpp",
    compile: (dir) => ({
      exe: "g++",
      args: ["-o", path.join(dir, isWindows ? "solution.exe" : "solution"), path.join(dir, "solution.cpp"), "-std=c++17"],
    }),
    run: (dir) => ({ exe: path.join(dir, isWindows ? "solution.exe" : "solution"), args: [] }),
    compiled: true,
  },
  python: {
    filename: "solution.py",
    compile: null,
    run: (dir) => ({ exe: PYTHON_CMD, args: [path.join(dir, "solution.py")] }),
    compiled: false,
  },
  java: {
    filename: "Solution.java",
    compile: (dir) => {
      fs.mkdirSync(path.join(dir, "classes"), { recursive: true });
      return { exe: "javac", args: ["-d", path.join(dir, "classes"), path.join(dir, "Solution.java")] };
    },
    run: (dir) => ({ exe: "java", args: ["-cp", path.join(dir, "classes"), "Solution"] }),
    compiled: true,
  },
  javascript: {
    filename: "solution.js",
    compile: null,
    run: (dir) => ({ exe: "node", args: [path.join(dir, "solution.js")] }),
    compiled: false,
  },
};

function cleanup(dir) {
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {}
}

function isInstalled(exe) {
  try {
    execFileSync(exe, ["--version"], { stdio: "ignore", timeout: 3000, windowsHide: true });
    return true;
  } catch (e) { return e.code !== "ENOENT"; }
}

/* ── Public Exported Functions ── */

exports.executeCode = (req, res) => {
    const { code, language, stdin = "" } = req.body;
  
    if (!code || !language) {
      return res.json({
        compile_error: "",
        compile_output: "",
        stdout: "",
        stderr: "Missing code or language",
        exitCode: 1,
      });
    }
  
    const cfg = LANG[language];
    if (!cfg) {
      return res.json({
        compile_error: "",
        compile_output: "",
        stdout: "",
        stderr: `Unsupported language: ${language}`,
        exitCode: 1,
      });
    }
  
    if (language === "python" && !PYTHON_CMD) {
      return res.json({
        compile_error: "",
        compile_output: "",
        stdout: "",
        stderr:
          "Python not found. Install from python.org and restart the server.",
        exitCode: 1,
      });
    }
  
    // Create temp dir + write source
    const tmpDir = path.join(
      os.tmpdir(),
      "dsa_" + crypto.randomBytes(8).toString("hex"),
    );
    try {
      fs.mkdirSync(tmpDir, { recursive: true });
      fs.writeFileSync(path.join(tmpDir, cfg.filename), code, "utf8");
    } catch (e) {
      return res.json({
        compile_error: "",
        compile_output: "",
        stdout: "",
        stderr: "File write error: " + e.message,
        exitCode: 1,
      });
    }
  
    /* ── Compile ── */
    if (cfg.compiled && cfg.compile) {
      const { exe, args } = cfg.compile(tmpDir);
      try {
        execFileSync(exe, args, {
          cwd: tmpDir,
          timeout: 20000,
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"],
        });
      } catch (e) {
        const compileOut = [e.stdout, e.stderr, e.message]
          .filter(Boolean)
          .join("\n");
        cleanup(tmpDir);
        return res.json({
          compile_error: compileOut.trim(),
          compile_output: compileOut.trim(),
          stdout: "",
          stderr: "",
          exitCode: 1,
        });
      }
    }

 const { exe, args } = cfg.run(tmpDir);
  const child = spawn(exe, args, { cwd: tmpDir, windowsHide: true });

  let stdout = "", stderr = "";
  child.stdout.on("data", (d) => stdout += d.toString());
  child.stderr.on("data", (d) => stderr += d.toString());
  
  if (stdin) { 
    try {
        child.stdin.write(stdin.endsWith("\n") ? stdin : stdin + "\n"); 
    } catch (e) { console.error("Stdin Write Error:", e.message); }
  }
  child.stdin.end();

  const timer = setTimeout(() => {
    child.kill();
    cleanup(tmpDir);
    res.json({ stderr: "⏱ Time Limit Exceeded (10s)", exitCode: 124 });
  }, 10000);

  child.on("close", (code) => {
    clearTimeout(timer);
    cleanup(tmpDir);
    res.json({ stdout, stderr: stderr.trim(), exitCode: code ?? 0 });
  });
};


exports.analyzeCode = (req, res) => {
  const { code, language } = req.body;
  const prompts = [];
  
  try {
    if (language === "python") {
        const re = /\binput\s*\(\s*(?:f?["'`]([^"'`]*)["'`])?\s*\)/g;
        let m;
        while ((m = re.exec(code)) !== null) prompts.push(m[1] || "");
    } else if (language === "cpp" || language === "c") {
        const lines = code.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // Match cin or scanf
            if (/cin\s*>>/.test(line) || /scanf\s*\(/.test(line)) {
                let prompt = "";
                // Look-back for the preceding output prompt
                for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
                    const prev = lines[j].trim();
                    // Heuristic: Capture strings in cout or printf immediately before the input
                    const m = prev.match(/<<\s*["']([^"']+)["']/) || prev.match(/printf\s*\(\s*["']([^"'\\]+)/);
                    if (m) {
                        prompt = m[1].replace(/\\n/g, "").trim();
                        break;
                    }
                }
                prompts.push(prompt);
            }
        }
    } else if (language === "java") {
        const re = /\.next(?:Int|Long|Double|Float|Line|Boolean|Short|Byte)?\s*\(\s*\)/g;
        let m;
        while ((m = re.exec(code)) !== null) prompts.push("");
    } else if (language === "javascript") {
        const count = (code.match(/lines\[idx\+\+\]/g) || []).length;
        for (let i = 0; i < count; i++) prompts.push("");
    }
  } catch (err) {
      console.error("Regex Analysis Error:", err.message);
  }

  res.json({ inputCount: prompts.length, prompts });
};

exports.getHealth = (req, res) => {
  res.json({
    status: "ok",
    languages: {
      c: isInstalled("gcc"),
      cpp: isInstalled("g++"),
      python: !!PYTHON_CMD,
      java: isInstalled("javac"),
      javascript: isInstalled("node"),
    },
  });
};