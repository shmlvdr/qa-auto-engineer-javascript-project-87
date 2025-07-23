#!/usr/bin/env node

import { Command } from 'commander';
import { parseFile } from './parser.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const data1 = parseFile(filepath1);
      const data2 = parseFile(filepath2);
      const differences = JSON.stringify(data1) === JSON.stringify(data2)
        ? 'Файлы идентичны'
        : 'Файлы различаются';
      console.log(differences);
    } catch (error) {
      console.error('Ошибка при чтении или обработке файлов:', error);
    }
  });

program.parse(process.argv);