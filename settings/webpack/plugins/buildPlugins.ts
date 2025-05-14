import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { Configuration, container } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from 'settings/webpack/types';

import { dependencies } from '../../../package.json';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const { ModuleFederationPlugin } = container;

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const { mode, paths, hot, analyzer } = options;
  const isProd = mode === 'production';
  const isDev = mode === 'development';
  const env = dotenv.config().parsed || {};
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {} as Record<string, string>);
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      favicon: paths.favicon,
      template: paths.html,
    }),
    new ModuleFederationPlugin({
      name: 'ShopFrontend',
      filename: `remoteEntry.js`,
      exposes: {
        './ShopFrontend': './src/navigation/index.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: dependencies['react-router-dom'],
        },
      },
    }),
  ];

  new webpack.DefinePlugin(envKeys),
    isProd &&
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: 'css/[id].[contenthash].css',
          ignoreOrder: true,
        })
      );

  if (isDev) {
    hot && plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
