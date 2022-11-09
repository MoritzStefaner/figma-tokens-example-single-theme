#!/bin/bash

./token-transform.sh

node build.js
node build-typography.js
node build-effects.js
node build-docs.js
node build-docs-typography.js
