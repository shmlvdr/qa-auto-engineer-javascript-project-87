import { fileURLToPath } from 'url'
import path from 'path'
import { expect, test } from '@jest/globals'
import gendiff from '../src/index.js'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Функция для получения абсолютного пути к файлу с фикстурой.
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

// Функция для чтения содержимого файла с фикстурой.
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf-8').trim()

// Читаем ожидаемые результаты из файлов.
const stylish = readFixture('result_stylish.txt')
const plain = readFixture('result_plain.txt')
const json = readFixture('result_json.txt')

const formats = ['json', 'yaml']

test.each(formats)('compare %s files', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`)
  const filepath2 = getFixturePath(`file2.${format}`)

  // Проверяем, что функция gendiff возвращает ожидаемый результат
  // для каждого формата вывода.
  expect(gendiff(filepath1, filepath2)).toBe(stylish)
  expect(gendiff(filepath1, filepath2, { format: 'stylish' })).toBe(stylish)
  expect(gendiff(filepath1, filepath2, { format: 'plain' })).toBe(plain)
  expect(gendiff(filepath1, filepath2, { format: 'json' })).toBe(json)
})
