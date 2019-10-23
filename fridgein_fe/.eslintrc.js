module.exports = {
    extends: [
        'plugin:vue/recommended'
    ],
    plugins: [
        'vuetify'
    ],
    rules: {
        'vuetify/no-deprecated-classes': 'error',
        'vuetify/grid-unknown-attributes': 'error',
        'vuetify/no-legacy-grid': 'error'
    },
    "parser": "vue-eslint-parser",
    "parserOptions": {
      "parser": "babel-eslint",
      "sourceType": "module"
  }
}