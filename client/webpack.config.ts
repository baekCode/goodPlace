import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  name     : 'client',
  mode     : isDevelopment ? 'development' : 'production',
  devtool  : isDevelopment ? 'hidden-source-map' : 'inline-source-map',
  resolve  : {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias     : {
      '@hooks'     : path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts'   : path.resolve(__dirname, 'layouts'),
      '@pages'     : path.resolve(__dirname, 'pages'),
      '@utils'     : path.resolve(__dirname, 'utils'),
      '@typings'   : path.resolve(__dirname, 'typings'),
    },
  },
  entry    : {
    app: './index',
  },
  module   : {
    rules: [
      {
        test   : /\.tsx?$/,
        loader : 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {browsers: ['last 2 chrome versions']},
                debug  : isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env    : {
            development: {
              plugins: ['@emotion', require.resolve('react-refresh/babel')],
            },
            production : {
              plugins: ['@emotion'],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use : ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins  : [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new webpack.EnvironmentPlugin({NODE_ENV: isDevelopment ? 'development' : 'production'}),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        'client_id': process.env.REACT_APP_NAVER_MAP_CLIENT_ID
      },
      template          : 'index.html'
    }),
  ],
  output   : {
    path      : path.join(__dirname, 'dist'),
    filename  : '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true,
    port              : 3090,
    publicPath        : '/dist/',
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
}
if (!isDevelopment && config.plugins) {
}

export default config;
