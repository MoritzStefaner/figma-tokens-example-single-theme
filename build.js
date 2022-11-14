const StyleDictionaryPackage = require('style-dictionary');

function getStyleDictionaryConfig() {
  return {
    source: [
      '01_intermediate/style-dict-tokens.json',
      // '01_intermediate/typography-styles-expanded.json', // in case you want to add explicit versions of all typography style tokens
    ],
    platforms: {
      // default css build
      css: {
        transformGroup: 'web',
        buildPath: `02_output/css/`,
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'sizes/px',
          'color/css',
          'time/seconds',
          'shadow/shorthand',
        ],
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
            options: {
              showFileHeader: false,
              outputReferences: true,
            },
          },
        ],
      },

      // default js es6 build
      js: {
        transformGroup: 'js',
        buildPath: `02_output/js/`,
        transforms: ['attribute/cti', 'name/cti/pascal', 'color/hex'],
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6',
            options: {
              showFileHeader: false,
            },
          },
        ],
      },
    },
  };
}

/*

  Custom transforms
 
*/

StyleDictionaryPackage.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher: function (prop) {
    // You can be more specific here if you e.g. only want 'em' units for font sizes
    return [
      'fontSize',
      'fontSizes',
      'spacing',
      'borderRadius',
      'borderWidth',
      'sizing',
      'breakpoint',
      'space',
      'x',
      'y',
      'blur',
      'spread',
    ].includes(prop.original.type);
  },
  transformer: function (prop) {
    return parseFloat(prop.original.value) + 'px';
  },
});

/**
 * Transform shadow shorthands for css variables
 */

/**
 * This currently works fine if every value uses an alias, but if any one of these use a raw value, it will not be transformed.
 */

function transformShadow(shadow) {
  const { x, y, blur, spread, color } = shadow;
  return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
}

StyleDictionaryPackage.registerTransform({
  name: 'shadow/shorthand',
  type: 'value',
  transitive: true,
  matcher: (token) => ['boxShadow'].includes(token.type),
  transformer: (token) => {
    return Array.isArray(token.original.value)
      ? token.original.value.map((single) => transformShadow(single)).join(', ')
      : transformShadow(token.original.value);
  },
});

// transform description attributes into comments,
// see https://github.com/six7/figma-tokens/issues/499
StyleDictionaryPackage.registerParser({
  pattern: /\.json$/,
  parse: ({ filePath, contents }) => {
    return JSON.parse(contents.replaceAll('"description":', '"comment":'));
  },
});

// run build

console.log('Build started...');

const StyleDictionary = StyleDictionaryPackage.extend(
  getStyleDictionaryConfig()
);

StyleDictionary.buildAllPlatforms();
console.log('\nEnd processing');
