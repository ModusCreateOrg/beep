#!/bin/sh
BRANCH='gh-pages'
DIR='dist'

cd ${DIR}
git add -A
git commit -m "Deploy to ${DIR}"
git push origin ${BRANCH}
