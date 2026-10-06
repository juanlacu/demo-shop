#!/usr/bin/env bash
# Recreates every demo/<name> branch as main plus demo/patches/<name>.patch.
# Pass --push to force-push the branches to origin.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

push=false
[[ "${1:-}" == "--push" ]] && push=true

if [[ -n "$(git status --porcelain)" ]]; then
  echo "The working tree has changes. Commit or stash them first." >&2
  exit 1
fi

start=$(git branch --show-current)
trap 'git switch --quiet "$start"' EXIT

for patch in demo/patches/*.patch; do
  branch="demo/$(basename "$patch" .patch)"
  git switch --quiet --force-create "$branch" main
  if ! git am --quiet "$patch"; then
    git am --abort
    echo "Could not apply $patch on main." >&2
    exit 1
  fi
  echo "Created $branch"
  if $push; then
    git push --quiet --force origin "$branch"
    echo "Pushed $branch"
  fi
done
