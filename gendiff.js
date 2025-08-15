#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import gendiff from './src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((a, b, options) => {
        console.log(gendiff(a, b, options));
    });

program.parse()