import path from 'path';
import fs from 'fs';
import parser from "./parser.js"

export default (filepath1, filepath2) => {
    const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

    const parsedData1 = parser(content1);
    const parsedData2 = parser(content2);

const gendiff = (obj1, obj2) => {
    const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

    const diff = keys.map((key) => {
        if (!Object.hasOwn(obj2, key)) {
            return `    - ${key}: ${obj1[key]}`;
        }
        if (!Object.hasOwn(obj1, key)) {
            return `    + ${key}: ${obj2[key]}`;
        }
        if (obj1[key] !== obj2[key]) {
            return `    - ${key}: ${obj1[key]}\n    + ${key}: ${obj2[key]}`;
        }
        return `    ${key}: ${obj1[key]}`;
    });

    return `{\n${diff.join('\n')}\n}`;
}

    return gendiff(parsedData1, parsedData2)
}