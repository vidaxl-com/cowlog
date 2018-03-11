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
