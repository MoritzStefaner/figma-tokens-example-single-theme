#!/bin/bash

# process global tokens
token-transformer \
00_input/figma-tokens.json \
01_intermediate/global.json \
global,_palettes \
_palettes

# typography
token-transformer \
--resolveReferences=false \
00_input/figma-tokens.json \
01_intermediate/typography-styles-dynamic.json \
global,typography,sizeLarge

# dark theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/theme-dark.json \
_palettes,themeDark \
_palettes

# light theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/theme-light.json \
_palettes,themeLight \
_palettes

# large theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/size-large.json \
typography,sizeLarge

# small theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/size-small.json \
typography,sizeSmall

