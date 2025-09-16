import fs from 'node:fs'
import path from 'node:path'

import parse from './parser.js'
import buildDiffTree from './buildDiffTree.js'
import format from './formatters/index.js'

const toAbs = p => path.resolve(process.cwd(), p)
const getExt = p => path.extname(p).slice(1).toLowerCase()
const read = p => fs.readFileSync(toAbs(p), 'utf-8')

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = parse(read(filepath1), getExt(filepath1))
  const data2 = parse(read(filepath2), getExt(filepath2))
  const diffTree = buildDiffTree(data1, data2)
  return format(diffTree, formatName)
}
