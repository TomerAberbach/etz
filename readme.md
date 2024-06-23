<h1 align="center">
  etz
</h1>

<div align="center">
  <a href="https://npmjs.org/package/etz">
    <img src="https://badgen.net/npm/v/etz" alt="version" />
  </a>
  <a href="https://github.com/TomerAberbach/etz/actions">
    <img src="https://github.com/TomerAberbach/etz/workflows/CI/badge.svg" alt="CI" />
  </a>
  <a href="https://github.com/sponsors/TomerAberbach">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor">
  </a>
</div>

<div align="center">
  A humble logger.
</div>

## Features

- **Humble:** it just prints pretty filterable logs to the console!
- **Filtering:** use `ETZ` and `NO_ETZ` environment variables to filter
- **Cool Name:** just three letters [transliterated from Hebrew](#faq)

## Install

```sh
$ npm i etz
```

## Usage

**index.js**:

```js
import etz from 'etz'

etz.debug(`Hello World!`)
etz.info(`Hello World!`)
etz.warn(`Hello World!`)
etz.error(`Hello World!`)
```

### Log level

_NOTE: The examples below are not colorized, but they will be in your terminal!_

The default log level is `INFO`:

```shell
$ node index.js
ℹ INFO Hello World!
⚠ WARN Hello World!
✖ ERROR Hello World!
```

Set the log level with the `ETZ` environment variable:

```shell
$ node index.js
ℹ INFO Hello World!
⚠ WARN Hello World!
✖ ERROR Hello World!

$ ETZ=0 node index.js
★ DEBUG Hello World!
ℹ INFO Hello World!
⚠ WARN Hello World!
✖ ERROR Hello World!

$ ETZ=debug node index.js
★ DEBUG Hello World!
ℹ INFO Hello World!
⚠ WARN Hello World!
✖ ERROR Hello World!

$ ETZ=3 node index.js
★ DEBUG Hello World!
ℹ INFO Hello World!
⚠ WARN Hello World!
✖ ERROR Hello World!

$ ETZ=error node index.js
✖ ERROR Hello World!
```

Suppress all logs with `NO_ETZ`:

```shell
$ NO_ETZ=1 node index.js
```

The value of `NO_ETZ` doesn't matter. Any value works.

## FAQ

### What's with the name?

The Hebrew word for tree, wood, and most importantly _log_ is "עץ", which is
pronounced like "etz".

## Contributing

Stars are always welcome!

For bugs and feature requests,
[please create an issue](https://github.com/TomerAberbach/etz/issues/new).

For pull requests, please read the
[contributing guidelines](https://github.com/TomerAberbach/etz/blob/main/contributing.md).

## License

[Apache License 2.0](https://github.com/TomerAberbach/etz/blob/main/license)

This is not an official Google product.
