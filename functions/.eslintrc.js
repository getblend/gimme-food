module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports" },
        ],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/member-ordering": [
          "error",
          {
            default: {
              memberTypes: [
                // Index signature
                "signature",

                // Fields
                "public-static-field",
                "protected-static-field",
                "private-static-field",

                "public-decorated-field",
                "protected-decorated-field",
                "private-decorated-field",

                "public-instance-field",
                "protected-instance-field",
                "private-instance-field",

                "public-abstract-field",
                "protected-abstract-field",
                "private-abstract-field",

                "public-field",
                "protected-field",
                "private-field",

                "static-field",
                "instance-field",
                "abstract-field",

                "decorated-field",

                "field",

                // Constructors
                "public-constructor",
                "protected-constructor",
                "private-constructor",

                "constructor",

                // Getters
                "public-static-get",
                "protected-static-get",
                "private-static-get",

                "public-decorated-get",
                "protected-decorated-get",
                "private-decorated-get",

                "public-instance-get",
                "protected-instance-get",
                "private-instance-get",

                "public-abstract-get",
                "protected-abstract-get",
                "private-abstract-get",

                "public-get",
                "protected-get",
                "private-get",

                "static-get",
                "instance-get",
                "abstract-get",

                "decorated-get",

                "get",

                // Setters
                "public-static-set",
                "protected-static-set",
                "private-static-set",

                "public-decorated-set",
                "protected-decorated-set",
                "private-decorated-set",

                "public-instance-set",
                "protected-instance-set",
                "private-instance-set",

                "public-abstract-set",
                "protected-abstract-set",
                "private-abstract-set",

                "public-set",
                "protected-set",
                "private-set",

                "static-set",
                "instance-set",
                "abstract-set",

                "decorated-set",

                "set",

                // Methods
                "public-static-method",
                "protected-static-method",
                "private-static-method",

                "public-decorated-method",
                "protected-decorated-method",
                "private-decorated-method",

                "public-instance-method",
                "protected-instance-method",
                "private-instance-method",

                "public-abstract-method",
                "protected-abstract-method",
                "private-abstract-method",

                "public-method",
                "protected-method",
                "private-method",

                "static-method",
                "instance-method",
                "abstract-method",

                "decorated-method",

                "method",
              ],
              order: "alphabetically-case-insensitive",
            },
          },
        ],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            format: ["camelCase", "UPPER_CASE", "PascalCase"],
            modifiers: ["const"],
            selector: "variable",
          },
          {
            format: ["PascalCase"],
            prefix: ["T"],
            selector: "typeParameter",
          },
          {
            format: ["PascalCase"],
            selector: ["enumMember"],
          },
        ],

        "import/no-unresolved": 0,
        "import/order": [
          "error",
          {
            groups: [
              ["builtin", "external"],
              ["internal"],
              ["parent", "sibling"],
              "index",
              "type",
              "object",
            ],
            "newlines-between": "always-and-inside-groups",
          },
        ],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "prettier", "typescript-sort-keys"],
  root: true,
  rules: {
    "new-cap": "off",
    "prettier/prettier": "error",
    quotes: ["error", "double"],
    "require-jsdoc": "off",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
    "valid-jsdoc": "off",
  },
};
