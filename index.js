#!/usr/bin/env node
import { program } from 'commander'
import helpOption from './lib/core/help.js'
import createCommands from './lib/core/create.js'
import { readFileSync } from 'fs'

const packageData = readFileSync('./package.json', {encoding: 'utf-8'})

program.version(JSON.parse(packageData).version)

helpOption()

createCommands()

program.parse(process.argv)