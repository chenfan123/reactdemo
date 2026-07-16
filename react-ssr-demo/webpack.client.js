const path = require("path")
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.base.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = merge(baseConfig, {
  devtool: "source-map",
  entry: "./src/client",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "js/bundle.[hash:5].js",
    publicPath: "/",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              defaultExport: true
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/bundle.[hash:5].css"
    })
  ]
})
