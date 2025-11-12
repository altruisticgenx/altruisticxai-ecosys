#!/usr/bin/env bash
set -euo pipefail

BRANCH="chore/lib-ui-ci-migration"
COMMIT_MSG="chore: add @repo/lib, @repo/ui packages, CI workflows, and prepare import migration"

echo "============================================"
echo "Workspace Migration Helper Script"
echo "============================================"
echo ""
echo "This script will:"
echo "  1. Create a new branch: $BRANCH"
echo "  2. Install dependencies"
echo "  3. Build packages"
echo "  4. Show a dry-run of import replacements"
echo "  5. Optionally apply import replacements"
echo "  6. Build the project"
echo "  7. Commit and push changes"
echo ""
echo "⚠️  Make sure you have committed or stashed local changes before running this script."
echo ""
read -p "Proceed? (y/N) " confirm
if [[ "${confirm:-n}" != "y" ]]; then
  echo "Aborting."
  exit 1
fi

echo ""
echo "Creating branch: $BRANCH"
git checkout -b "$BRANCH" || git checkout "$BRANCH"

echo ""
echo "Installing dependencies..."
npm ci

echo ""
echo "Building packages..."
npm run build:packages

echo ""
echo "=== DRY RUN: Import Replacement Preview ==="
node scripts/replace-imports.js --dry-run

echo ""
echo "============================================"
echo "Review the changes above."
echo ""
read -p "Apply import replacements? (y/N) " apply
if [[ "${apply:-n}" == "y" ]]; then
  echo ""
  echo "Applying import replacements..."
  node scripts/replace-imports.js
  
  echo ""
  echo "Building project to verify changes..."
  npm run build
  
  echo ""
  echo "Build successful! Changes applied."
else
  echo ""
  echo "Skipping import replacement. You can apply it later with:"
  echo "  node scripts/replace-imports.js"
fi

echo ""
echo "Staging changes..."
git add .

echo ""
echo "Committing changes..."
git commit -m "$COMMIT_MSG" || echo "Nothing new to commit"

echo ""
echo "Pushing to origin..."
git push --set-upstream origin "$BRANCH" || echo "Already pushed or push failed"

echo ""
echo "============================================"
echo "✅ Done!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Review the changes in your repository"
echo "  2. Open a pull request on GitHub"
echo ""
echo "To open a PR using GitHub CLI:"
echo "  gh pr create --fill --title \"$COMMIT_MSG\" --base main"
echo ""
