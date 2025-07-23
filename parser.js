import fs from 'fs';
import path from 'path';

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, 'utf8');
  const fileExtension = path.extname(absolutePath).toLowerCase();
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${fileExtension}`);
  }
};