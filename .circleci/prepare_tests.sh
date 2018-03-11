#!/usr/bin/env bash

apt-get update
apt-get install tree

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR/..

tree ./
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 9.8.0
nvm use 9.8.0
#ls -lah
npm build
npm install
npm run i
nvm use system
npm test

SUCCESS=$?

if [ "$SUCCESS" -eq "0" ]
then
#    if [ "$CIRCLE_JOB" == "node7" ]
#    then
        git config --global user.email "i.toth@vidaxl.com"
        git config --global user.name "Imre Toth"
        packages/cowlog/src/bin/doc-crawler
#        git checkout  packages/cowlog/tests/directory-fixtures/
#        git checkout  packages/cowlog/cowlog
        git checkout packages/cowlog/tests/directory-fixtures/
        git add *.md
        git status
        CHANGED=$(git diff-index --name-only HEAD --)
        if [ ! -z "$CHANGED" ];then
            git commit --author="CircleCi <i.toth@vidaxl.com>" -a -m "`git log -1` [ci skip][release]" &&
            test=`git branch | grep "*"` &&
            currentBranch=${test:2}

            echo "$currentBranch Zizi   "

            git pull origin $current
            Branch
            git push origin $currentBranch && echo "Released" || exit 0
        else
            echo "Clean git repository."
        fi
#    fi
else
    echo "No Release"
    exit 1
fi
