const path = require("path");
const webpack = require("webpack");
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
module.exports = {
  entry: "./src/index.js",
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "lib/"),
    publicPath: "/lib",
    filename: "index.js",
    library: "google-search-for-react",
    libraryTarget: "umd"
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  }
};
