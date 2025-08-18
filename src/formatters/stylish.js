const stylish = (diff) => {
  const indentSize = 2;
  const indent = " ";

  const formatValue = (value, depth) => {
    if (typeof value !== "object" || value === null) {
      return String(value);
    }

    const indentCurrent = indent.repeat(depth * indentSize + indentSize);
    const indentClosing = indent.repeat(depth * indentSize);
    const lines = Object.entries(value).map(
      ([key, val]) =>
        `${indentCurrent}  ${key}: ${formatValue(val, depth + 1)}`,
    );

    return `{\n${lines.join("\n")}\n${indentClosing}}`;
  };

  const lines = diff.map((node) => {
    const { type, key, value, value1, value2 } = node;
    const indentCurrent = indent.repeat(indentSize);

    switch (type) {
      case "added":
        return `${indentCurrent}+ ${key}: ${formatValue(value, 1)}`;
      case "removed":
        return `${indentCurrent}- ${key}: ${formatValue(value, 1)}`;
      case "changed":
        return `${indentCurrent}- ${key}: ${formatValue(value1, 1)}\n${indentCurrent}+ ${key}: ${formatValue(value2, 1)}`;
      case "unchanged":
        return `${indentCurrent}  ${key}: ${formatValue(value, 1)}`;
      default:
        return "";
    }
  });

  return `{\n${lines.join("\n")}\n}`;
};

export default stylish;
