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
const __dirname = dirname(__filename)

const getFileContent = (filepath) => {
  try {
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
    const ext1 = path.extname(filepath1).slice(1)
    const ext2 = path.extname(filepath2).slice(1)
    const data1 = parse(getFileContent(filepath1), ext1)
    const data2 = parse(getFileContent(filepath2), ext2)
    const diffTree = buildDiffTree(data1, data2)

    if (format !== 'stylish' && format !== 'plain' && format !== 'json') {
      throw new Error(`Unknown format: ${format}`)
    }

    switch (format) {
      case 'stylish':
        return stylish(diffTree)
      case 'plain':
        return plain(diffTree)
      case 'json':
        return json(diffTree)
      default:
        return stylish(diffTree)
    }
  }
  catch (error) {
    console.error('Произошла ошибка при обработке файлов:', error)
    throw error
  }
}

export default genDiff
