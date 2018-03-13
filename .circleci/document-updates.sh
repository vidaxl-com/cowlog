#!/usr/bin/env bash

./packages/cowlog/src/bin/doc-crawler ../../

git status

 if [ -f "/tmp/test" ];then
    git config --global user.email "i.toth@vidaxl.com"
    git config --global user.name "Imre Toth"
    git checkout packages/cowlog/tests/directory-fixtures/
    git add *.md
    git status
    CHANGED=$(git diff-index --name-only HEAD --)
    if [ ! -z "$CHANGED" ];then
        git commit --author="CircleCi <i.toth@vidaxl.com>" -a -m "`git log -1` [ci skip][release]" &&
        test=`git branch | grep "*"` &&
        currentBranch=${test:2}
        git pull origin $currentBranch
        git push origin $currentBranch && echo "Released" || exit 0
    else
        echo "Clean git repository."
    fi
fi

git status
