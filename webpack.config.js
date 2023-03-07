/* eslint-env node */
const path = require('path')
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'inline-cheap-module-source-map',
  entry: {
    config: path.resolve(__dirname, 'src', 'config', 'config'),
    desktop: path.resolve(__dirname, 'src', 'desktop', 'desktop'),
    mobile: path.resolve(__dirname, 'src', 'mobile', 'mobile'),
  },
  output: {
    path: path.resolve(__dirname, 'plugin', 'js'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      path: false,
    },
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
      '@/common': path.resolve(__dirname, 'src', 'common'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[t|j]sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false,
              },
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
    ],
  },
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './plugin/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: './dist/plugin.zip',
    }),
  ],
}
