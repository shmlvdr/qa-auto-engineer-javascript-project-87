import fs from 'node:fs'
import path from 'node:path'

import parse from './parser.js'
import buildDiffTree from './buildDiffTree.js'
import format from './formatters/index.js'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)
const extractFormat = filepath => path.extname(filepath).slice(1).toLowerCase()
const readData = filepath => {
  const content = fs.readFileSync(getAbsolutePath(filepath), 'utf-8')
  return parse(content, extractFormat(filepath))
}

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = readData(filepath1)
  const data2 = readData(filepath2)
  const diffTree = buildDiffTree(data1, data2)
  return format(diffTree, formatName)
}