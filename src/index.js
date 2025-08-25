import path from 'path'
import fs from 'fs'

const readFile = (filepath) => {
  const absolutePath = path.resolve(__dirname, '..', filepath)
  const data = fs.readFileSync(absolutePath, 'utf-8')
  return data
}

const getFileExtension = filepath => path.extname(filepath).slice(1)

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)
  const format1 = getFileExtension(filepath1)
  const format2 = getFileExtension(filepath2)
  const parsedData1 = parse(data1, format1)
  const parsedData2 = parse(data2, format2)
  const diffTree = buildDiffTree(parsedData1, parsedData2)
  const formatter = formatters(formatName)

  return formatter(diffTree)
}

export default genDiff
