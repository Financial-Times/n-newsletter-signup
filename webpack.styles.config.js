const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfigStyles = () => {
  return {
    entry: {
      main: ['./demos/src/main.scss']
    },
    resolve: {
      alias: {
        'mathsass/dist/math': path.resolve(__dirname, 'node_modules/mathsass/dist/_math'),
        'sass-mq/mq': path.resolve(__dirname, 'node_modules/sass-mq/_mq')
      },
      modules: ['node_modules'],
      extensions: ['.jsx', '.css', '.scss']
    },
    output: {
      path: path.resolve(__dirname, 'public')
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  };
};

module.exports = webpackConfigStyles;
