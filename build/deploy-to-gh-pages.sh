#!/bin/sh
BRANCH='gh-pages'
DIR='dist'

if [ "$(git status --porcelain)" ];
then
  git status
  echo "Some pending changes require your attention"
  exit 1;
fi

git subtree split -P ${DIR} -b ${BRANCH}
git push -f origin ${BRANCH}:${BRANCH}
git branch -D ${BRANCH}
