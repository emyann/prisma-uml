import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

delete process.env.TS_NODE_PROJECT;
const webpackconfiguration: webpack.Configuration = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'prisma-uml.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    sourceMapFilename: 'prisma-uml.map',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.prod.json') })],
  },
  module: {
    rules: [{ test: /\.(ts|js)x?$/, use: ['babel-loader', 'source-map-loader'], exclude: /node_modules/ }],
  },
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
};

export default webpackconfiguration;
