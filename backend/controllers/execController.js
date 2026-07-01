// Using Judge0 CE — free community instance, no API key needed
// Docs: https://ce.judge0.com/
const JUDGE0_URL = "https://ce.judge0.com";

// Language IDs from Judge0 CE
const LANG_ID = {
  c:          50,   // C (GCC 9.2.0)
  cpp:        54,   // C++ (GCC 9.2.0)
  java:       62,   // Java (OpenJDK 13.0.1)
  python:     71,   // Python (3.8.1)
  javascript: 63,   // Node.js (12.14.0)
};

// Judge0 is async — submit first, then poll until status > 2
// Status: 1=In Queue, 2=Processing, 3=Accepted, 4+=error
async function runOnJudge0(code, language, stdin = "") {
  const langId = LANG_ID[language];
  if (!langId) throw new Error(`Unsupported: ${language}`);

  // Step 1 — submit
  const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source_code: code, language_id: langId, stdin }),
  });

  if (!submitRes.ok) throw new Error(`Submit failed: ${submitRes.status}`);
  const { token } = await submitRes.json();

  // Step 2 — poll every 1.5s, up to 10 tries (~15s max)
  for (let i = 0; i < 10; i++) {
    await new Promise(r => setTimeout(r, 1500));

    const pollRes = await fetch(
      `${JUDGE0_URL}/submissions/${token}?base64_encoded=false&fields=status,stdout,stderr,compile_output`,
      { headers: { "Content-Type": "application/json" } }
    );

    if (!pollRes.ok) continue;
    const result = await pollRes.json();
    if (result.status?.id > 2) return result; // done
  }

  throw new Error("Timed out waiting for Judge0");
}

exports.executeCode = async (req, res) => {
  const { code, language, stdin = "" } = req.body;

  if (!code || !language)
    return res.json({ stdout: "", stderr: "Missing code or language", exitCode: 1 });

  if (!LANG_ID[language])
    return res.json({ stdout: "", stderr: `Unsupported language: ${language}`, exitCode: 1 });

  try {
    const result = await runOnJudge0(code, language, stdin);
    const sid = result.status?.id;

    // status 6 = Compile Error — message is in compile_output
    if (sid === 6) {
      return res.json({
        stdout: "", stderr: "",
        compile_output: result.compile_output || "Compilation failed",
        exitCode: 1,
      });
    }

    if (sid === 5)
      return res.json({ stdout: "", stderr: "⏱ Time Limit Exceeded", exitCode: 124 });

    return res.json({
      stdout:         result.stdout         || "",
      stderr:         result.stderr         || "",
      compile_output: result.compile_output || "",
      exitCode: sid === 3 ? 0 : 1,
    });

  } catch (err) {
    console.error("Judge0 error:", err.message);
    return res.json({ stdout: "", stderr: `Execution error: ${err.message}`, exitCode: 1 });
  }
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
        if (/cin\s*>>/.test(line) || /scanf\s*\(/.test(line)) {
          let prompt = "";
          for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
            const prev = lines[j].trim();
            const m = prev.match(/<<\s*["']([^"']+)["']/) || prev.match(/printf\s*\(\s*["']([^"'\\]+)/);
            if (m) { prompt = m[1].replace(/\\n/g, "").trim(); break; }
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
    console.error("analyzeCode error:", err.message);
  }

  res.json({ inputCount: prompts.length, prompts });
};

exports.getHealth = (req, res) => {
  res.json({
    status: "ok",
    executor: "judge0-ce",
    languages: { c: true, cpp: true, python: true, java: true, javascript: true },
  });
};
