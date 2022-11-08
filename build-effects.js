const StyleDictionaryPackage = require('style-dictionary');

const config = {
  source: ['./01_intermediate/style-dict-tokens.json'],
  platforms: {
    css: {
      buildPath: './02_output/css/',
      files: [
        {
          destination: 'effect-classes.css',
          format: 'css/shadowClasses',
          selector: ':root',
          filter: (token) =>
            token.type === 'boxShadow' || console.log(token.type),
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
  },
};

const kebabize = (str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
  );

function convertToVariableIfNeeded(value) {
  if (value.toString().startsWith('{') && value.toString().endsWith('}')) {
    return `var(--${kebabize(value.slice(1, -1).split('.').join('-'))})`;
  }
  return value;
}

function transformShadow(shadow) {
  const { x, y, blur, spread, color } = shadow;
  return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
}

function processEffect(token) {
  return Array.isArray(token.original.value)
    ? token.original.value.map((single) => transformShadow(single)).join(', ')
    : transformShadow(token.original.value);
}

StyleDictionaryPackage.registerTransform({
  name: 'shadow/shorthand',
  type: 'value',
  transitive: true,
  matcher: (token) => ['boxShadow'].includes(token.type),
  transformer: (token) => {
    return;
  },
});

/**
 * Format for css typography classes
 * This generates theme-independent css classes so we're fine with just using css variables here
 */

StyleDictionaryPackage.registerFormat({
  name: 'css/shadowClasses',
  formatter: (dictionary, config) =>
    dictionary.allProperties
      .map(
        (prop) => `/*
  ${prop.name}
  ${prop.original.comment}
*/

.${kebabize(prop.path.join('-'))} {
  box-shadow: ${processEffect(prop)};
}
`
      )
      .join('\n'),
});

// transform description attributes into comments,
// see https://github.com/six7/figma-tokens/issues/499
StyleDictionaryPackage.registerParser({
  pattern: /\.json$/,
  parse: ({ contents }) => {
    return JSON.parse(contents.replaceAll('"description"', '"comment"'));
  },
});

StyleDictionaryPackage.extend(config).buildAllPlatforms();
