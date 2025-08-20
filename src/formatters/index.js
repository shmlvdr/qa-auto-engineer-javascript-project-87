import plain from './plain.js';

const formatters = {
  plain,
  // Вы можете добавить другие форматы, например, json, stylish и т.д.
};

export default (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};