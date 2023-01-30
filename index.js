#!/usr/bin/env node
import { program } from 'commander'
import helpOption from './lib/core/help.js'
import createCommands from './lib/core/create.js'
import getVersion from './lib/utils/version.js'

program.version(getVersion())

helpOption()

createCommands()

program.parse(process.argv)