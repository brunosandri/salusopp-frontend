#!/usr/bin/env bash
set -euo pipefail

BRANCH="$(git rev-parse --abbrev-ref HEAD)"

printf "\n▶ Running checks...\n"
node ./node_modules/eslint/bin/eslint.js .
node ./node_modules/typescript/bin/tsc -p tsconfig.app.json --noEmit

printf "\n▶ Creating commit (if there are changes)...\n"
git add -A
if git diff --cached --quiet; then
  echo "No staged changes to commit."
else
  git commit -m "chore: apply reviewed updates"
fi

printf "\n▶ Pushing branch %s...\n" "$BRANCH"
git push origin "$BRANCH"

if command -v gh >/dev/null 2>&1; then
  printf "\n▶ Syncing pull request...\n"
  if gh pr view "$BRANCH" >/dev/null 2>&1; then
    gh pr edit "$BRANCH" --fill
  else
    gh pr create --fill --base main --head "$BRANCH"
  fi
else
  printf "\n⚠ GitHub CLI (gh) not found. Push completed, create/update PR manually on GitHub.\n"
fi

printf "\n✅ Done.\n"
