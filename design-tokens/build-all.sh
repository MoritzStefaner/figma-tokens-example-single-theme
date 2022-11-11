#!/bin/bash

./build-prepare-tokens.sh

node ./scripts/build-base.js
node ./scripts/build-docs-typography.js
node ./scripts/build-docs.js
node ./scripts/build-effects.js
node ./scripts/build-fluid-sizing.js
node ./scripts/build-full-dict.js
node ./scripts/build-typography.js
