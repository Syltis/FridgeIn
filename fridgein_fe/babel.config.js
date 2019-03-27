module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "api": "./api"
      }
    }]
  ]
};
