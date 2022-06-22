const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // for formatt our styles into one css file, we do these with css and scss rules
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean dist folder from copies and dublicates
const HtmlWebpackPlugin = require("html-webpack-plugin"); // create index file in dist folder and use css and js files with contenthashes
// Html Webpack Plugin can customise the path of creating index.html file, it's name and name of the file. Very usefull.
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  entry: "./src/simon.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9002/",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 3 * 1024, // 3 kilobytes
        //   },
        // },
      },
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
      filename: "simon.html",
      title: "Simon photo",
      template: "src/page-template.hbs",
      description: "Simon",
    }),
    new ModuleFederationPlugin({
      name: "SimonApp",
      filename: "remoteEntry.js",
      exposes: {
        "./SimonPage": "./src/components/simon-page/simon-page.js",
      },
      remotes: {
        ImageCaptionApp: "ImageCaptionApp@http://localhost:9003/remoteEntry.js",
      },
    }),
  ],
};
