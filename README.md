# figma-tokens-example

This example illustrates how you can transform your tokens stored on Figma Tokens (with GitHub sync enabled) to be automatically transformed with token-transformer and Style Dictionary.

Change your tokens in `00_input/tokens.json` (either directly or with the Figma Tokens plugin in Figma). The GitHub action will automatically generate tokens to the `01_intermediate/` directory that can then be read by Style Dictionary, which will output tokens into `02_output/` to the formats you defined in `config.json`
