var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlTemplates = {
  index: {
    filename: 'index.html',
    template: './app/index.html'
  }
}

module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            query: { 
              presets: [
                ["es2015", {"modules": false}], "stage-2"
              ] 
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(htmlTemplates.index)
  ]
};