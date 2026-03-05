#!/bin/bash
# Setup Claude Code plugins and skills on a new machine
# Run: bash scripts/setup-claude.sh

echo "Setting up Claude Code plugins..."

# GSD (Get Shit Done) - spec-driven development workflow
echo "Installing get-shit-done-cc..."
npx get-shit-done-cc@latest --claude --global

# Marketplace plugins - install via Claude Code CLI
echo ""
echo "Marketplace plugins need to be installed via Claude Code:"
echo "  claude install superpowers@superpowers-marketplace"
echo "  claude install frontend-design@claude-code-plugins"
echo ""
echo "Done! Restart Claude Code to pick up changes."
