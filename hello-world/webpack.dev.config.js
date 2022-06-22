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
  entry: "./src/hello.js",
  // entry: {
  //   hello: "./src/hello.js",
  //   simon: "./src/simon.js",
  // },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9001/",
  },
  mode: "development",
  devServer: {
    port: 9001,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "hello.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
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
            plugins: ["@babel/plugin-proposal-class-properties"],
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "hello.html",
      title: "Hello",
      template: "src/page-template.hbs",
      description: "Hello",
    }),
    new ModuleFederationPlugin({
      name: "HelloWorldApp",
      filename: "remoteEntry.js",
      exposes: {
        "./HelloWorldButton": "./src/components/hello-button/helloButton.js",
        "./HelloWorldPage":
          "./src/components/hello-world-page/hello-world-page.js",
      },
    }),
  ],
};
