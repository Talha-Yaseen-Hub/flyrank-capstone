const { execSync } = require('child_process');
const fs = require('fs');

try {
  const gitLog = execSync('git log -n 20 --oneline', { encoding: 'utf8' });
  const gitStatus = execSync('git status', { encoding: 'utf8' });
  const gitBranches = execSync('git branch -a', { encoding: 'utf8' });
  
  fs.writeFileSync('git_info.txt', 
    `=== GIT STATUS ===\n${gitStatus}\n\n=== GIT BRANCHES ===\n${gitBranches}\n\n=== GIT LOG ===\n${gitLog}`
  );
  console.log('Successfully wrote git info to git_info.txt');
} catch (error) {
  fs.writeFileSync('git_info.txt', error.toString() + '\n' + error.stack);
  console.error('Error running git commands:', error);
}
