#!/usr/bin/env node
import { Command } from 'commander'
import genDiff from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    try {
      const diff = genDiff(filepath1, filepath2, options.format)
      console.log(diff)
    }
    catch (error) {
      console.error(error.message)
      process.exit(1)
    }
  })

program.parse()
