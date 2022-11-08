const StyleDictionaryPackage = require('style-dictionary');

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

// make config
// function so it could also take parameters later (theme, …)

function getStyleDictionaryConfig() {
  return {
    source: ['01_intermediate/**/*.json'],
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
