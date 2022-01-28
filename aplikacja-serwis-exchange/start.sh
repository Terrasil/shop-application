#! /bin/bash
rm -rf node_modules
rm package-lock.json yarn.lock
npm cache clear --force
npm install
npm run build
npm run start