#!/bin/bash

 pushd ../bitcore/packages
npm run compile

 pushd bitcore-wallet-client
npm pack
popd

 pushd crypto-wallet-core 
popd

 popd

npm i ../bitcore/packages/bitcore-wallet-client/bitcore-wallet-client-8.6.0.tgz
npm i
npm start