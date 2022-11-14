#!/bin/bash
token-transformer \
00_input/figma-tokens.json \
01_intermediate/style-dict-tokens.json \
global,_palettes \
_palettes

token-transformer \
--resolveReferences=false \
00_input/figma-tokens.json \
01_intermediate/typography-styles.json \
global,typographyStyles,_palettes

token-transformer \
--expand-typography \
00_input/figma-tokens.json \
01_intermediate/typography-styles-expanded.json \
global,typographyStyles,_palettes \
global,_palettes

