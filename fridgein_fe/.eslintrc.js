module.exports = {
    extends: [
        'plugin:vue/recommended'
    ],
    plugins: [
        'vuetify'
    ],
    rules: {
        'vue/singleline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vuetify/no-deprecated-classes': 'error',
        'vuetify/grid-unknown-attributes': 'error',
        'vuetify/no-legacy-grid': 'error',
        'array-element-newline': 'off'
    },
    parser: "vue-eslint-parser",
    parserOptions: {
      "parser": "babel-eslint",
      "sourceType": "module" 
  }
}