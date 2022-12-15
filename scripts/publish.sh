#!/bin/bash

set -xe

export NPM_REGISTRY=${1}
export NPM_USER=${2}
export NPM_PASS=${3}
export NPM_EMAIL=infradigital@xfriend.net

npm install npm-login-noninteractive
export PATH=${PATH}:${PWD}/node_modules/.bin
npm-login-noninteractive 

npm publish ./build --registry=${NPM_REGISTRY}