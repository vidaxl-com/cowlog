#!/usr/bin/env bash

#SUCCESS=0
#
#if [ "$SUCCESS" -eq "0" ]
#then
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
#else
#    echo "No Release"
#    exit 1
#fi
