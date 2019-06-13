import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Server, Plugin } from '@hapi/hapi';
import { NextHandleFunction } from 'connect';

type Config = {
  compiler: webpack.ICompiler;
  assets?: webpackDevMiddleware.Options;
  hot?: webpackHotMiddleware.Options;
};

type Options = {
  config?: Config;
  configPath?: string;
};

type DevMiddleware = webpackDevMiddleware.WebpackDevMiddleware & NextHandleFunction;
type HotMiddleware = webpackHotMiddleware.EventStream & NextHandleFunction;

const createExtension = (server: Server, middleware: DevMiddleware | HotMiddleware) => {
  server.ext({
    type: 'onRequest',
    method: (request, h) =>
      new Promise((resolve, reject) => {
        const { req, res } = request.raw;

        middleware(req, res, err => {
          return err ? reject(err) : resolve(h.continue);
        });
      }),
  });
};

const getConfig = (options: Options): Config => {
  if (options.configPath) {
    const config = require(path.resolve(process.cwd(), options.configPath));

    return {
      compiler: webpack(config),
      assets: config.assets,
      hot: config.hot,
    };
  } else if (options.config) {
    return options.config;
  } else {
    throw new Error('No config or configPath provided.');
  }
};

function register(server: Server, options: Options) {
  const { compiler, assets, hot } = getConfig(options);

  createExtension(server, webpackDevMiddleware(compiler, assets));
  createExtension(server, webpackHotMiddleware(compiler, hot));

  server.expose({ compiler });
}

const HapiWebpackPlugin: Plugin<Options> = {
  name: 'hapi-webpack-plugin-2',
  version: '1.0.0',
  once: true,
  register,
};

export default HapiWebpackPlugin;
