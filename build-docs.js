const StyleDictionaryPackage = require('style-dictionary');

const transforms = {
  web: [
    'attribute/cti',
    'name/cti/kebab',
    'sizes/px',
    'color/css',
    'time/seconds',
    'shadow/shorthand',
  ],
  js: ['attribute/cti', 'name/cti/pascal', 'color/hex'],
};

function getStyleDictionaryConfig() {
  return {
    source: [
      `01_intermediate/_docs.json`,
      // '01_intermediate/typography-styles-expanded.json', // in case you want to add explicit versions of all typography style tokens
    ],
    platforms: {
      // default css build
      css: {
        transformGroup: 'web',
        buildPath: `02_output/docs/`,
        transforms: transforms.web,
        files: [
          {
            destination: `docs.css`,
            format: 'css/variables',
            filter: (token) => token.attributes.category === 'docs',
            options: {
              selector: ':root',
              showFileHeader: false,
              outputReferences: true,
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

StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildAllPlatforms();

console.log('\nEnd processing');
