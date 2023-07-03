#! /usr/bin/env node
/* eslint-disable no-unused-expressions */

require('yargs/yargs')(process.argv.slice(2))
  .commandDir('commands')
  .demandCommand()
  .help().argv
