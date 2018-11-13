perigee
=======

A scaffolding cli for Apigee.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/perigee.svg)](https://npmjs.org/package/perigee)
[![CircleCI](https://circleci.com/gh/jzweifel/perigee/tree/master.svg?style=shield)](https://circleci.com/gh/jzweifel/perigee/tree/master)
[![Codecov](https://codecov.io/gh/jzweifel/perigee/branch/master/graph/badge.svg)](https://codecov.io/gh/jzweifel/perigee)
[![Downloads/week](https://img.shields.io/npm/dw/perigee.svg)](https://npmjs.org/package/perigee)
[![License](https://img.shields.io/npm/l/perigee.svg)](https://github.com/jzweifel/perigee/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g perigee
$ perigee COMMAND
running command...
$ perigee (-v|--version|version)
perigee/1.0.0 darwin-x64 node-v10.3.0
$ perigee --help [COMMAND]
USAGE
  $ perigee COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`perigee hello [FILE]`](#perigee-hello-file)
* [`perigee help [COMMAND]`](#perigee-help-command)

## `perigee hello [FILE]`

describe the command here

```
USAGE
  $ perigee hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ perigee hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/jzweifel/perigee/blob/v1.0.0/src/commands/hello.ts)_

## `perigee help [COMMAND]`

display help for perigee

```
USAGE
  $ perigee help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->
