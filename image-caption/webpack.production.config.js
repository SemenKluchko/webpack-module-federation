const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // for formatt our styles into one css file, we do these with css and scss rules
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean dist folder from copies and dublicates
const HtmlWebpackPlugin = require("html-webpack-plugin"); // create index file in dist folder and use css and js files with contenthashes
// Html Webpack Plugin can customise the path of creating index.html file, it's name and name of the file. Very usefull.
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  entry: "./src/image-caption.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9003/",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "image-caption.html",
      title: "Image Caption",
      template: "src/page-template.hbs",
      description: "Image Caption",
    }),
    new ModuleFederationPlugin({
      name: "ImageCaptionApp",
      filename: "remoteEntry.js",
      exposes: {
        "./ImageCaption": "./src/components/image-caption/image-caption.js",
      },
    }),
  ],
};
