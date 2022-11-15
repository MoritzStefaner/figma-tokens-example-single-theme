#!/bin/bash

# token-transformer params:
# input
# output
# included sets
# "silently" included sets (available during processing for resolving references, but not part of output)

# process global tokens
token-transformer \
00_input/figma-tokens.json \
01_intermediate/global.json \
global,config,_palettes \
_palettes # _palettes are not part of output

# typography
token-transformer \
--resolveReferences=false \
00_input/figma-tokens.json \
01_intermediate/typography-styles-dynamic.json \
global,config,typography,sizeLarge \
global

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
config,typography,sizeLarge \
config

# small theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/size-small.json \
config,typography,sizeSmall \
config
