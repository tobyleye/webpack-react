const path = require("path");
const loaderUtils = require("loader-utils");
const Html5WebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getLocalIdent = (context, localIdentName, localName, options) => {
  // create hash based on the file path and className
  // will be unique across a project and close to globally unique
  const hash = loaderUtils.getHashDigest(
    path.relative(context.rootContext, context.resourcePath) + localName,
    "md4",
    "base64",
    5
  );
  return hash;
};

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                getLocalIdent,
              },
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new Html5WebpackPlugin({
      title: "My awesome react app!",
      template: "public/index.html",
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].production.css",
    }),
  ],
};
