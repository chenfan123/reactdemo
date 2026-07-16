import path from "path"
import { fileURLToPath } from "url"
import nodeExternals from "webpack-node-externals"
import { merge } from "webpack-merge"
import baseConfig from "./webpack.base.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default merge(baseConfig, {
  entry: "./src/server",
  target: "node",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "server.js",
    publicPath: "/",
    clean: true
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                exportOnlyLocals: true,
                namedExport: false
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        generator: { emit: false }
      }
    ]
  }
})
