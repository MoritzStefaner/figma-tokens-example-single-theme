#!/bin/bash

# process all tokens
# token-transformer \
# 00_input/figma-tokens.json \
# 01_intermediate/tokens-complete.json

# process all tokens, expand typography and effects
# token-transformer \
# --expandTypography=true --expandShadow=true \
# 00_input/figma-tokens.json \
# 01_intermediate/tokens-complete-expanded.json

# todo create one nested complete-complete json with all variations?


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
global,typographyStyles,dynamicSize,sizeLarge

# typography
token-transformer \
00_input/figma-tokens.json \
01_intermediate/typography-styles-large.json \
global,typographyStyles,dynamicSize,sizeLarge

# typography
token-transformer \
00_input/figma-tokens.json \
01_intermediate/typography-styles-small.json \
global,typographyStyles,dynamicSize,sizeSmall

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
sizeLarge,dynamicSize

# small theme
token-transformer \
00_input/figma-tokens.json \
01_intermediate/size-small.json \
sizeSmall,dynamicSize

# process _docs
token-transformer \
--resolveReferences=false \
00_input/figma-tokens.json \
01_intermediate/_docs.json \
global,_palettes,_docs,themeLight,sizeLarge,dynamicSize \

# wrap large theme in theme name
cat ./01_intermediate/size-large.json \
| jq '{"size-large": .size}' \
> ./01_intermediate/size-large-namespaced.json

# wrap small theme in theme name
cat ./01_intermediate/size-small.json \
| jq '{"size-small": .size}' \
> ./01_intermediate/size-small-namespaced.json

