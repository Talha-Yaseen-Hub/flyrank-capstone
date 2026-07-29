/**
 * Talha Yaseen's Personal Code Quality & Accessibility Audit Agent
 * 
 * Usage:
 *   node audit_agent.js --file <path_to_component_file>
 * 
 * Requirements:
 *   - Node.js 18+ (utilizes native fetch)
 *   - Optional: GEMINI_API_KEY set in .env or environment variable
 */

const fs = require('fs');
const path = require('path');

// 1. Parse CLI Arguments
const args = process.argv.slice(2);
const fileArgIndex = args.indexOf('--file');
const filePath = fileArgIndex !== -1 ? args[fileArgIndex + 1] : null;

if (!filePath) {
  console.log('\n❌ Error: Missing --file argument.');
  console.log('Usage: node audit_agent.js --file <path_to_file>');
  console.log('Example: node audit_agent.js --file playground/src/components/Disclosure.tsx\n');
  process.exit(1);
}

const resolvedPath = path.resolve(filePath);
if (!fs.existsSync(resolvedPath)) {
  console.error(`\n❌ Error: Target file not found at: ${filePath}\n`);
  process.exit(1);
}

// Read target file content
const codeContent = fs.readFileSync(resolvedPath, 'utf8');
const fileExt = path.extname(filePath);

console.log('\n======================================================');
console.log('🛡️  TALHA YASEEN\'S PERSONAL CODE AUDIT AGENT ACTIVATED');
console.log(`📂 Target: ${filePath}`);
console.log(`📏 Length: ${codeContent.length} bytes`);
console.log('======================================================\n');

// 2. Load environment variables
let apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  // Try loading from .env manually to avoid extra dependencies like dotenv
  const envPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of envLines) {
      if (line.trim().startsWith('GEMINI_API_KEY=')) {
        apiKey = line.split('=')[1].trim();
        break;
      }
    }
  }
}

async function runAudit() {
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.log('⚠️  GEMINI_API_KEY not detected. Initializing Static Analysis fallback...');
    performStaticAnalysis();
  } else {
    console.log('✨ Calling Google Gemini API for deep technical audit...');
    await performLiveApiAudit();
  }
}

// 3. Mode A: Static Analysis Fallback (Regex-based checks)
function performStaticAnalysis() {
  const issues = [];
  const suggestions = [];

  // Check for semantic element presence
  if (fileExt.match(/\.(tsx|jsx|js)$/)) {
    // Check missing aria elements
    if (codeContent.includes('input') && !codeContent.includes('aria-describedby')) {
      issues.push('Possible accessibility issue: <input> tags present without `aria-describedby` helper description linkages.');
      suggestions.push('Add `aria-describedby={errorId}` on input components to connect live validation error containers.');
    }
    if (codeContent.includes('button') && !codeContent.includes('type="button"') && !codeContent.includes('type="submit"')) {
      issues.push('Semantic quality warning: <button> tags found without explicit `type` attribute.');
      suggestions.push('Add `type="button"` or `type="submit"` on button tags to satisfy HTML parser constraints.');
    }
    if (codeContent.includes('onClick') && !codeContent.includes('onKeyDown') && codeContent.includes('div')) {
      issues.push('A11y Warning: Interactive click handler attached to raw <div> container without keyboard event listeners.');
      suggestions.push('Replace <div> interactive containers with semantic <button> elements, or add `role="button"` and `onKeyDown`.');
    }

    // Check if test file exists
    const baseName = path.basename(filePath, fileExt);
    const dirName = path.dirname(filePath);
    const testPatterns = [
      path.join(dirName, `${baseName}.test${fileExt}`),
      path.join(dirName, `${baseName}.test.js`),
      path.join(dirName, `${baseName}.test.ts`),
      path.join(dirName, `${baseName}.test.tsx`),
      path.join(dirName, '__tests__', `${baseName}.test${fileExt}`)
    ];
    let testExists = false;
    for (const p of testPatterns) {
      if (fs.existsSync(p)) {
        testExists = true;
        break;
      }
    }

    if (!testExists) {
      issues.push(`Testing Gap: No matching unit test file detected for ${baseName}.`);
      suggestions.push(`Create a companion test file named \`${baseName}.test.jsx\` asserting rendering and accessibility boundaries.`);
    }
  }

  // Print results
  console.log('\n🔍 --- STATIC ANALYSIS REPORT ---');
  if (issues.length === 0) {
    console.log('✅ Pass: No common accessibility or testing gaps detected via static regex checks!');
  } else {
    console.log(`⚠️ Found ${issues.length} audit notifications:\n`);
    issues.forEach((issue, idx) => {
      console.log(`[!] ${issue}`);
      console.log(`    👉 Recommendation: ${suggestions[idx]}\n`);
    });
  }
  console.log('======================================================');
  console.log('🎉 Audit Complete (Static Analysis Fallback).');
  console.log('======================================================\n');
}

// 4. Mode B: Live Gemini AI Analysis (Generative Deep Audit)
async function performLiveApiAudit() {
  const prompt = `You are a strict, senior code-auditing agent specialized in WCAG AA Web Accessibility standards and Vitest React Unit Testing.
  
You are auditing a source code file for Talha Yaseen, a Front-End & AI Engineer Intern.

Below is the source code of the file located at path: "${filePath}":
\`\`\`
${codeContent}
\`\`\`

Analyze the code and output a clean, formatted terminal report structured as:
1. "🎯 COMPONENT ANALYSIS SUMMARY" - 2-3 lines summarizing the component's purpose.
2. "♿ ACCESSIBILITY (WCAG AA) AUDIT" - Point out any missing semantic labels, incorrect button trigger types, focus traps, or missing aria attributes (such as aria-expanded, aria-describedby, aria-invalid).
3. "🧪 TEST-DRIVEN SAFETY AUDIT" - Review the testing coverage. Pinpoint exactly what test assertions are needed to verify the state boundaries and validation logic of this specific component.
4. "🛠️ RECOMMENDED REFACTORING BLOCK" - Provide a snippet of refactored, highly accessible code or a sample companion Vitest test script that directly resolves the highlighted issues.

Keep your response direct, technical, and concise. Avoid greeting introductions.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API returned status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (outputText) {
      console.log(outputText);
    } else {
      console.log('⚠️ Received empty response from Gemini API.');
    }
  } catch (error) {
    console.error('❌ Error executing Live API Audit:', error.message);
    console.log('\nRunning static analysis fallback...');
    performStaticAnalysis();
  }
}

runAudit();
