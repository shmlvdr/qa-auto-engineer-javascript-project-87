import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Путь к файлам с result.txt
const getFixturePathForResults = filename => path.join(__dirname, '..', 'test', 'fixtures', filename)
// Путь к файлам json и yaml
const getFixturePathForData = filename => path.join(__dirname, '..', '__fixtures__', filename)

const readFixture = filepath => fs.readFileSync(filepath, 'utf-8').trim()

const stylish = readFixture(getFixturePathForResults('result_stylish.txt'))
const plain = readFixture(getFixturePathForResults('result_plain.txt'))
const jsonResult = readFixture(getFixturePathForResults('result_json.txt'))

test('json format', () => {
  const filepath1 = getFixturePathForData('file1.json')
  const filepath2 = getFixturePathForData('file2.json')
  expect(genDiff(filepath1, filepath2)).toBe(stylish)
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylish)
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(plain)
  expect(genDiff(filepath1, filepath2, 'json')).toBe(jsonResult)
})

test('yaml format', () => {
  const filepath1 = getFixturePathForData('file1.yaml')
  const filepath2 = getFixturePathForData('file2.yaml')
  expect(genDiff(filepath1, filepath2)).toBe(stylish)
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylish)
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(plain)
  expect(genDiff(filepath1, filepath2, 'json')).toBe(jsonResult)
})
