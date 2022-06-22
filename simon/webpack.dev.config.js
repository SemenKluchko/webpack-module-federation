const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
// TerserPlugin under the hood in webpack v5 and above in production mode
// we turned it off because we dont need minify our code in development mode

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// MiniCssExtractPlugin is for formatt our styles into one css file, we do these with css and scss rules
// we also turned off it because in dev mode we dont need it

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean dist folder from copies and dublicates
const HtmlWebpackPlugin = require("html-webpack-plugin"); // create index file in dist folder and use css and js files with contenthashes
// Html Webpack Plugin can customise the path of creating index.html file, it's name and name of the file. Very usefull.
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  // entry: {
  //   hello: "./src/hello.js",
  //   simon: "./src/simon.js",
  // },
  entry: "./src/simon.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9002/",
  },
  mode: "development",
  devServer: {
    port: 9002,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "simon.html",
      writeToDisk: true,
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
        use: ["style-loader", "css-loader", "sass-loader"],
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
    // new TerserPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "styles.[contenthash].css",
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "simon.html",
      title: "Simon photo",
      description: "Simon",
      template: "src/page-template.hbs",
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

    // new HtmlWebpackPlugin({
    //   title: "Hey world",
    //   template: "src/index.hbs",
    //   description: "Some description",
    // }),
  ],
};
