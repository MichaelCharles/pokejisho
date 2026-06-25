#!/usr/bin/env bash
#
# Deploy the PokéJisho static site to S3 and invalidate CloudFront.
#
#   ./deploy.sh            # sync + invalidate
#   ./deploy.sh --dry-run  # show what would change, make no changes
#
set -euo pipefail

BUCKET="s3://pokejisho.com"
DISTRIBUTION_ID="E3FX5A5UAH9666"

DRYRUN=""
if [[ "${1:-}" == "--dry-run" ]]; then
  DRYRUN="--dryrun"
  echo "DRY RUN — no changes will be made."
fi

# Repo files that must never be published to the public bucket.
EXCLUDES=(
  --exclude '.git/*'
  --exclude '.idea/*'
  --exclude '*.DS_Store'
  --exclude 'dev/*'
  --exclude 'CLAUDE.md'
  --exclude 'README.md'
  --exclude 'LICENSE'
  --exclude 'deploy.sh'
)

# A previous deploy published the repo's .git directory. --delete won't remove it
# (it's excluded from the sync above), so purge it explicitly if present.
if aws s3 ls "${BUCKET}/.git/" >/dev/null 2>&1; then
  echo "Removing published .git/ from bucket ..."
  aws s3 rm "${BUCKET}/.git" --recursive ${DRYRUN:+--dryrun}
fi

echo "Syncing repo -> ${BUCKET} ..."
aws s3 sync . "${BUCKET}" --delete ${DRYRUN} "${EXCLUDES[@]}"

if [[ -n "${DRYRUN}" ]]; then
  echo "Dry run complete. Re-run without --dry-run to apply."
  exit 0
fi

echo "Invalidating CloudFront (${DISTRIBUTION_ID}) ..."
aws cloudfront create-invalidation \
  --distribution-id "${DISTRIBUTION_ID}" \
  --paths '/*' \
  --query 'Invalidation.{Id:Id,Status:Status}' --output table

echo "Done."
