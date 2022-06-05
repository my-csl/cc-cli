#!/usr/bin/env node
import { program } from 'commander'
import helpOption from './lib/core/help.js'
import createCommands from './lib/core/create.js'
// import pk from './package.json' assert {type: 'json'}

program.version('1.0.0')

helpOption()

createCommands()

program.parse(process.argv)