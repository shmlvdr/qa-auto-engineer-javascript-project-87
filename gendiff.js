#!/usr/bin/env node

import { Command } from 'commander';
import { parseFile } from './parser.js';
import _ from 'lodash';

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
      const allKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
      const differences = allKeys.map((key) => {
        if (!_.has(data1, key)) {
          return `+ ${key}: ${data2[key]}`;
        }
        if (!_.has(data2, key)) {
          return `- ${key}: ${data1[key]}`;
        }
        if (!_.isEqual(data1[key], data2[key])) {
          return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
        }
        return `  ${key}: ${data1[key]}`;
      });
      console.log(differences.join('\n'));
    } catch (error) {
      console.error('Ошибка при чтении или обработке файлов:', error);
    }
  });

program.parse(process.argv);