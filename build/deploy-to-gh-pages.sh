#!/bin/sh
BRANCH='gh-pages'
DIR='dist'

cd ${DIR}
git add -A
git commit --allow-empty -m "Deploy to ${DIR}"
git push origin ${BRANCH}
