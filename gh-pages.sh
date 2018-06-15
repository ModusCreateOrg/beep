#!/bin/sh
set -o

BRANCH='gh-pages'
DIR='dist'

if [ "$(git status --porcelain)" ];
then
  git status
  echo "Deployment failed!"
  exit 1;
fi

git subtree split --prefix ${DIR} -b ${BRANCH}
git push -f origin ${BRANCH}:${BRANCH}
git branch -D ${BRANCH}
