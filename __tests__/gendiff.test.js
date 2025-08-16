import gendiff from './src/index.js'
import path from 'path';
import fs from 'fs';

const getFixturesPath = (filename) => path.resolve(process.cwd(), filename)
const result = fs.readFileSync(getFixturesPath('result.txt'), 'utf-8')
 
test('gendiff', () => {
    expect(gendiff(
        getFixturesPath('file1.json'),
        getFixturesPath('file2.json')
    )).toBe(result);
})