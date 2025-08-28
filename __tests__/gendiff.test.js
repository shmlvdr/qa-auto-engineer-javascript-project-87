import { fileURLToPath } from 'url'
import path from 'path'
import { expect, test } from '@jest/globals'
import gendiff from '../src/index.js'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename =>
  readFileSync(getFixturePath(filename), 'utf-8').trim()

const stylish = readFixture('result_stylish.txt')
const plain = readFixture('result_plain.txt')
const jsonResult = readFixture('result_json.txt')

const formats = ['json', 'yaml']

test.each(formats)('compare %s files', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`)
  const filepath2 = getFixturePath(`file2.${format}`)
  expect(gendiff(filepath1, filepath2)).toBe(stylish)
  expect(gendiff(filepath1, filepath2, 'stylish')).toBe(stylish)
  expect(gendiff(filepath1, filepath2, 'plain')).toBe(plain)
  expect(gendiff(filepath1, filepath2, 'json')).toBe(jsonResult)
})
