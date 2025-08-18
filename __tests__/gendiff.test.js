import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import genDiff from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, "__fixtures__", filename);
const getRootPath = (filename) => path.resolve(__dirname, "..", filename);
const readFile = (filepath) => fs.readFileSync(filepath, "utf-8").trim();

describe("gendiff", () => {
  const file1Json = getRootPath("file1.json");
  const file2Json = getRootPath("file2.json");
  const file1Yaml = getRootPath("file1.yml");
  const file2Yaml = getRootPath("file2.yml");

  test("stylish format", () => {
    const expected = readFile(getFixturePath("result_stylish.txt"));
    const actual = genDiff(file1Json, file2Json, "stylish");
    expect(actual).toBe(expected);
    expect(genDiff(file1Yaml, file2Yaml, "stylish")).toBe(
      readFile(getFixturePath("result_stylish.txt")),
    );
  });

  test("plain format", () => {
    const expected = readFile(getFixturePath("result_plain.txt"));
    const actual = genDiff(file1Json, file2Json, "plain");
    expect(actual).toBe(expected);
    expect(genDiff(file1Yaml, file2Yaml, "plain")).toBe(
      readFile(getFixturePath("result_plain.txt")),
    );
  });

  test("json format", () => {
    const expected = readFile(getFixturePath("result_json.txt"));
    const actual = genDiff(file1Json, file2Json, "json");
    expect(actual).toBe(expected);
    expect(genDiff(file1Yaml, file2Yaml, "json")).toBe(
      readFile(getFixturePath("result_json.txt")),
    );
  });

  test("unsupported format", () => {
    expect(() => genDiff(file1Json, file2Json, "unknown")).toThrow();
  });
});
