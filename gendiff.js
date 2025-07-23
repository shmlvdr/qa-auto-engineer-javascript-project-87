#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --vers', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .argument('<string>');
program.parse(process.argv);