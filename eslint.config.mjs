import eslint from "@eslint/js";
import eslintPluginComments from "eslint-plugin-eslint-comments";
import * as eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSimpleSortImports from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import path from "node:path";
import {fileURLToPath} from "node:url";
import eslintPluginImportX from "eslint-plugin-import-x";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config({
  ignores: [
    "**/resolvers.generated.ts",
    "**/typeDefs.generated.ts",
    "**/types.generated.ts",
    "**/node_modules",
    "**/scripts",
    "**/*.graphql",
    "**/*.json",
    "**/ios/",
    "**/android/",
    "**/docs/",
    "**/__mockData__/",
    "**/__mocks__/",
    "**/*.png",
    "**/*.svg",
    "**/*.otf",
    "**/*.ttf",
    "**/*.test.ts",
  ],
  files: ["**/*.ts"],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
  ],
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  languageOptions: {
    globals: {
      ...globals.node,
      __dirname: true,
    },
    ecmaVersion: 5,
    sourceType: "commonjs",
    parserOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      tsconfigRootDir: __dirname,
      project: ["./tspconfig.yaml"],
    },
  },
  plugins: {
    "eslint-comments": eslintPluginComments,
    "simple-import-sort": eslintPluginSimpleSortImports,
    prettier: eslintPluginPrettier, //must be after all others, except for the only-warn plugin
  },
  settings: {
    "import-x/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import-x/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "require-await": 0,
    "import-x/no-cycle": 0,
    "class-methods-use-this": 0,
    "import/prefer-default-export": 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "import-x/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.*", "**/*.spec.*"],
      },
    ],
    "import-x/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowAny: true,
      },
    ],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ],
    //ESLint Plugins
    "eslint-comments/no-unused-disable": "warn",
    ...eslintPluginPrettier.rules, //must be last!
  },
});
