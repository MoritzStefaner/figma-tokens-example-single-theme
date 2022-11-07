const StyleDictionaryPackage = require('style-dictionary');

// custom formats etc

// StyleDictionaryPackage.registerFormat({
//   name: 'css/variables',
//   formatter: function (dictionary, config) {
//     return `${this.selector} {
//         ${dictionary.allProperties
//           .map((prop) => `  --${prop.name}: ${prop.value};`)
//           .join('\n')}
//       }`;
//   },
// });

// StyleDictionaryPackage.registerTransform({
//   name: 'sizes/px',
//   type: 'value',
//   matcher: function (prop) {
//     // You can be more specific here if you only want 'em' units for font sizes
//     return [
//       'fontSize',
//       'spacing',
//       'borderRadius',
//       'borderWidth',
//       'sizing',
//     ].includes(prop.attributes.category);
//   },
//   transformer: function (prop) {
//     // You can also modify the value here if you want to convert pixels to ems
//     return parseFloat(prop.original.value) + 'px';
//   },
// });

// make config
// function so it could also take parameters later (theme, …)

function getStyleDictionaryConfig() {
  return {
    source: ['01_intermediate/**/*.json'],
    platforms: {
      // default css build
      css: {
        transformGroup: 'css',
        buildPath: `02_output/css/`,
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
            selector: `:root`,
          },
        ],
      },

      // default js es6 build
      js: {
        transformGroup: 'js',
        buildPath: `02_output/js/`,
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6',
          },
        ],
      },

      // custom combination of transformers
      // custom: {
      //   transforms: ['attribute/cti', 'name/cti/kebab', 'sizes/px'],
      //   buildPath: `02_output/css/`,
      //   files: [
      //     {
      //       destination: `tokens-custom.css`,
      //       format: 'css/variables',
      //       // custom wrapper
      //       selector: `.custom`,
      //     },
      //   ],
      // },
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
