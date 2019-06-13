# Hapi Webpack Plugin 2

<a href="https://www.npmjs.com/package/hapi-webpack-plugin-2"><img src="https://badgen.net/npm/v/hapi-webpack-plugin-2" /></a>

[Webpack](http://webpack.github.io) middleware for [Hapi](https://github.com/hapijs/hapi). Supports HMR.

## Prerequisites

These packages are a peer dependency for this plugin.

- Hapi (tested on >= 17.0)
- webpack (tested on >= 4.0)

## Installation

```
npm i -D hapi-webpack-plugin-2
```

## Usage

You can use this plugin in two ways.

### 1) With `config` object

```js
const webpack = require('webpack');
const HapiWebpackPlugin = require('hapi-webpack-plugin-2');

server.register({
  plugin: HapiWebpackPlugin,
  options: {
    config: {
      compiler: webpack({
        // webpack options http://webpack.github.io
      }),
      assets: {
        // webpack-dev-middleware options https://github.com/webpack/webpack-dev-middleware
      },
      hot: {
        // webpack-hot-middleware options https://github.com/glenjamin/webpack-hot-middleware
      },
    },
  },
});
```

### 2) With `configPath`

```js
const HapiWebpackPlugin = require('hapi-webpack-plugin-2');

server.register({
  plugin: HapiWebpackPlugin,
  options: {
    configPath: './webpack.config.js',
  },
});
```

## Acknowledgement

This plugin is originally based on [hapi-webpack-plugin](https://github.com/SimonDegraeve/hapi-webpack-plugin)
which was in need of upgrading but seems to be abandoned. Among other issues, it is not compatible with Babel 7 and Webpack 4.

## License

MIT
