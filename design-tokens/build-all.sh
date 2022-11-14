#!/bin/bash

./build-prepare-tokens.sh

node ./scripts/build-base.js
node ./scripts/build-typography.js
