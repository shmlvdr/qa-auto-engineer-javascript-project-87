const plain = (diff) => {
  const formatValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return "[complex value]";
    }
    return typeof value === "string" ? `'${value}'` : String(value);
  };

  const lines = [];
  const getPath = (key, parentPath) =>
    parentPath ? `${parentPath}.${key}` : key;

  const buildPlainDiff = (diff, parentPath = "") => {
    diff.forEach((node) => {
      const { type, key, value, value1, value2 } = node;
      const currentPath = getPath(key, parentPath);

      switch (type) {
        case "added":
          lines.push(
            `Property '${currentPath}' was added with value: ${formatValue(value)}`,
          );
          break;
        case "removed":
          lines.push(`Property '${currentPath}' was removed`);
          break;
        case "changed":
          lines.push(
            `Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`,
          );
          break;
      }
    });
  };

  buildPlainDiff(diff);
  return lines.join("\n");
};

export default plain;
