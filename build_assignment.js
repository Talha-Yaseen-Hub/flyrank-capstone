const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workspaceDir = __dirname;
const assignmentDir = path.join(workspaceDir, '.assignment');

function run(cmd, options = {}) {
  console.log(`\n> Executing: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd: workspaceDir, ...options });
  } catch (err) {
    console.error(`Error executing command: ${cmd}`);
    process.exit(1);
  }
}

// Recursively copy directory contents
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// Clean up generated folders
function cleanWorkspace() {
  const keep = ['.git', '.gitignore', 'LICENSE', 'README.md', '.assignment', 'CLAUDE.md', 'build_assignment.js', 'node_modules'];
  const items = fs.readdirSync(workspaceDir);
  for (const item of items) {
    if (!keep.includes(item)) {
      const fullPath = path.join(workspaceDir, item);
      fs.rmSync(fullPath, { recursive: true, force: true });
    }
  }
}

console.log('--- starting build assignment script ---');

// 1. Ensure Git remote is tracked (add placeholder if missing, though user already set it up)
try {
  execSync('git remote get-url origin', { cwd: workspaceDir });
} catch (e) {
  console.log('Origin remote not set. Please set it using git remote add origin <url> if you want to push.');
}

// 2. Prepare Round One (feat/settings-v1)
console.log('\n--- setting up feat/settings-v1 ---');
run('git checkout -B feat/settings-v1');
cleanWorkspace();
copyRecursiveSync(path.join(assignmentDir, 'v1'), workspaceDir);
run('git add .');
run('git commit -m "feat: implement settings form v1 (vague prompt)"');
run('git push -u origin feat/settings-v1 --force');

// 3. Prepare Round Two (feat/settings-v2)
console.log('\n--- setting up feat/settings-v2 ---');
run('git checkout -B feat/settings-v2');
cleanWorkspace();
copyRecursiveSync(path.join(assignmentDir, 'v2'), workspaceDir);

// 4. Install & Test
console.log('\n--- installing dependencies & running tests ---');
run('npm install');
run('npm run test');

// 5. Commit V2 & Push
run('git add .');
run('git commit -m "feat: implement settings form v2 (precise prompt with validation & tests)"');
run('git push -u origin feat/settings-v2 --force');

// 6. Copy WORKFLOW.md to the current directory for main/other checks
if (fs.existsSync(path.join(workspaceDir, 'WORKFLOW.md'))) {
  fs.copyFileSync(path.join(workspaceDir, 'WORKFLOW.md'), path.join(workspaceDir, 'WORKFLOW.md'));
}

console.log('\n--- final workspace status ---');
run('git status');

console.log('\n======================================================');
console.log('Success! Both branches created, committed, and pushed!');
console.log('Branch 1: feat/settings-v1 (vague form)');
console.log('Branch 2: feat/settings-v2 (premium form, tests, WORKFLOW.md)');
console.log('Vitest tests successfully passed on feat/settings-v2!');
console.log('======================================================');
