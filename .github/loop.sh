#!/usr/bin/env bash
# Keeps the page running for about 5.5 hours: posts what's due (checked every minute)
# and answers comments and DMs (every 10 minutes), saving the status after each change.
# GitHub often starts scheduled jobs hours late, so one long job keeps posts on time;
# the hourly schedule in run.yml queues the next one to take over when this one ends.
set -u
git config user.name "theecomprashant-bot"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

END=$(( $(date +%s) + ${LOOP_MINUTES:-330} * 60 ))
ENGAGE_EVERY=${ENGAGE_EVERY:-10}

save() {
  git add content/queue content/state
  git diff --cached --quiet && return
  git commit -qm "$1"
  for _ in 1 2 3; do git pull -q --rebase && git push -q && return; sleep 10; done
  echo "could not save the status this round; will try again next round"
}

i=0
while [ "$(date +%s)" -lt "$END" ]; do
  # pick up approved weeks and any edits made since the last round
  git pull -q --rebase || { git rebase --abort 2>/dev/null; git reset -q --hard origin/main; }
  node src/cli.js publish && save "Publish: status update"
  if [ $(( i % ENGAGE_EVERY )) -eq 0 ]; then node src/cli.js engage && save "Engage: state"; fi
  i=$(( i + 1 ))
  sleep 60
done
echo "done after $i rounds"
