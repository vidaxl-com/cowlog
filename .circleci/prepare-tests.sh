#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..

export NVM_DIR="$HOME/.nvm"

if [ ! -d "NVM_DIR" ]; then
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
fi

if [ ! -d "node_modules" ]; then
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    nvm install 9.8.0
    nvm use 9.8.0
    npm build
    nvm use system
    npm install
fi

if [ ! -d "packages/cowlog/node_modules" ]; then
    npm run i
fi



