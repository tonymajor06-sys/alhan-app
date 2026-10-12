// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // The ads package only exposes its entry point through a conditional "exports" map, which the import
    // plugin's resolver can't follow, although Metro and TypeScript both resolve it
    rules: {
      "import/no-unresolved": ["error", { ignore: ["^react-native-google-mobile-ads$"] }],
    },
  }
]);
