#!/usr/bin/env bash
# Applies OpenDish branch protection to main. Run once as a repo admin:
#   gh auth login && ./scripts/protect-main.sh aaronwshaw/dishupMVP
set -euo pipefail
REPO="${1:?usage: protect-main.sh owner/repo}"
gh api -X PUT "repos/$REPO/branches/main/protection" \
  -H "Accept: application/vnd.github+json" --input - <<JSON
{
  "required_status_checks": { "strict": true, "contexts": ["verify", "secret-scan", "commit-messages", "analyze"] },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "require_code_owner_reviews": true,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_conversation_resolution": true
}
JSON
gh api -X PATCH "repos/$REPO" -f allow_squash_merge=true -f allow_merge_commit=false \
  -f allow_rebase_merge=false -f delete_branch_on_merge=true >/dev/null
echo "main is protected on $REPO"
