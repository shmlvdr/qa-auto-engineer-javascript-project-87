import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import parse from './parser.js'
import stylish from './formatters/stylish.js'
import plain from './formatters/plain.js'
import json from './formatters/json.js'
import buildDiffTree from './buildDiffTree.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename) // Директория, где находится index.js

const getFileContent = (filepath) => {
  try {
    // Строим абсолютный путь: от директории `index.js` к `__fixtures__` и далее к файлу
    const absolutePath = path.resolve(__dirname, '..', filepath)
    return fs.readFileSync(absolutePath, 'utf-8')
  }
  catch (error) {
    console.error(`Error reading file: ${filepath}`)
    throw error
  }
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  try {
    const data1 = parse(getFileContent(filepath1), path.extname(filepath1).slice(1))
    const data2 = parse(getFileContent(filepath2), path.extname(filepath2).slice(1))

    const diffTree = buildDiffTree(data1, data2)

    switch (format) {
      case 'stylish':
        return stylish(diffTree)
      case 'plain':
        return plain(diffTree)
      case 'json':
        return json(diffTree)
      default:
        throw new Error(`Unknown format: ${format}`)
    }
  }
  catch (error) {
    console.error('Произошла ошибка при обработке файлов:', error)
    throw error
  }
}

export default genDiff
