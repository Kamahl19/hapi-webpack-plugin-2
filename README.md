# hapi-webpack-plugin-2

[Webpack](http://webpack.github.io) middleware for [Hapi](https://github.com/hapijs/hapi). Supports HMR.

## Installation

```
npm i -D hapi-webpack-plugin-2
```

## Usage

You can use the plugin in two ways.

### 1) With `options` object

```js
import { Server } from '@hapi/hapi';
import webpack from 'webpack';
import HapiWebpackPlugin from 'hapi-webpack-plugin-2';

const server = new Server({ port: 3000 });

async function start() {
  try {
    await server.register({
      plugin: HapiWebpackPlugin,
      options: {
        compiler: new webpack({
          // webpack options http://webpack.github.io
        }),
        assets: {
          // webpack-dev-middleware options https://github.com/webpack/webpack-dev-middleware
        },
        hot: {
          // webpack-hot-middleware options https://github.com/glenjamin/webpack-hot-middleware
        },
      },
    });
  } catch (error) {
    console.error(error);
  }

  try {
    server.start();
    console.log('Server running at:', server.info.uri);
  } catch (error) {
    console.error(error);
  }
}

start();
```

### 2) With `path` instead of options

```js
import { Server } from '@hapi/hapi';
import HapiWebpackPlugin from 'hapi-webpack-plugin-2';

const server = new Server({ port: 3000 });

async function start() {
  try {
    await server.register({
      plugin: HapiWebpackPlugin,
      options: './webpack.config.js',
    });
  } catch (error) {
    console.error(error);
  }

  try {
    server.start();
    console.log('Server running at:', server.info.uri);
  } catch (error) {
    console.error(error);
  }
}

start();
```

## License

MIT
