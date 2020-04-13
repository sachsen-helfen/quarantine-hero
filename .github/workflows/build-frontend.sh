#!/usr/bin/env bash

rm -rf build && \
rm -rf node_modules && \
yarn install && \
NODE_ENV=prod yarn build
