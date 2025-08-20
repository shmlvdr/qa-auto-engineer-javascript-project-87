import path from "path";
import fs from "fs";
import parser from "./parser.js";
import formatters from "./formatters/index.js";

export default (filepath1, filepath2, format = "stylish") => {
  const absolutePath1 = path.resolve(filepath1);
  const absolutePath2 = path.resolve(filepath2);
  const ext1 = path.extname(absolutePath1).toLowerCase();
  const ext2 = path.extname(absolutePath2).toLowerCase();
  const format1 =
    ext1 === ".json" ? "json" : [".yml", ".yaml"].includes(ext1) ? "yml" : null;
  const format2 =
    ext2 === ".json" ? "json" : [".yml", ".yaml"].includes(ext2) ? "yml" : null;

  if (!format1 || !format2) {
    throw new Error(
      "Unsupported file format. Supported formats: .json, .yml, .yaml",
    );
  }

  const content1 = fs.readFileSync(absolutePath1, "utf-8");
  const content2 = fs.readFileSync(absolutePath2, "utf-8");
  const parsedData1 = parser(content1, format1);
  const parsedData2 = parser(content2, format2);
  const diff = genDiff(parsedData1, parsedData2);

  return formatters[format](diff);
};

const genDiff = (obj1, obj2) => {
  const keys = [
    ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ].sort();

  return keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return { type: "removed", key, value: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { type: "added", key, value: obj2[key] };
    }
    if (obj1[key] !== obj2[key]) {
      if (
        typeof obj1[key] === "object" &&
        obj1[key] !== null &&
        typeof obj2[key] === "object" &&
        obj2[key] !== null
      ) {
        return { type: "nested", key, children: genDiff(obj1[key], obj2[key]) };
      }
      return { type: "changed", key, value1: obj1[key], value2: obj2[key] };
    }
    return { type: "unchanged", key, value: obj1[key] };
  });
};

