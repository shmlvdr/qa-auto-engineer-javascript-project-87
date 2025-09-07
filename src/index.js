import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import parse from './parser.js'
import buildDiffTree from './buildDiffTree.js'
import { formatStylish, formatPlain, formatJson } from './formatters/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class FileNotFoundError extends Error {
  constructor(filepath) {
    super(`File not found: ${filepath}`)
    this.name = 'FileNotFoundError'
  }
}

class UnsupportedFormatError extends Error {
  constructor(format) {
    super(`Unsupported format: ${format}`)
    this.name = 'UnsupportedFormatError'
  }
}

class FileReadError extends Error {
  constructor(filepath, message) {
    super(`Error reading file ${filepath}: ${message}`)
    this.name = 'FileReadError'
  }
}

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(__dirname, '..', filepath)
  if (!fs.existsSync(absolutePath)) {
    throw new FileNotFoundError(filepath)
  }
  try {
    const content = fs.readFileSync(absolutePath, 'utf-8')
    const ext = path.extname(filepath).slice(1).toLowerCase()
    return parse(content, ext)
  }
  catch (error) {
    throw new FileReadError(filepath, error.message)
  }
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  try {
    const data1 = getFileContent(filepath1)
    const data2 = getFileContent(filepath2)
    const diffTree = buildDiffTree(data1, data2)

    const formatter = getFormatter(formatName)
    return formatter(diffTree)
  }
  catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return formatStylish
    case 'plain':
      return formatPlain
    case 'json':
      return formatJson
    default:
      throw new UnsupportedFormatError(format)
  }
}

export default genDiff
