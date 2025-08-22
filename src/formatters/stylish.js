const indentSize = 2
const indentChar = ' '

const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const currentIndent = indentChar.repeat(depth * indentSize)
  const nextIndent = indentChar.repeat((depth + 1) * indentSize)
  const lines = Object.entries(value).map(([key, val]) =>
    `${nextIndent}${key}: ${formatValue(val, depth + 1)}`,
  )

  return `{\n${lines.join('\n')}\n${currentIndent}}`
}

const formatNode = (nodes, depth = 1) => {
  const lines = []

  nodes.forEach((node) => {
    const { type, key, value, value1, value2, children } = node
    const currentIndent = indentChar.repeat((depth - 1) * indentSize)
    const signIndent = currentIndent + indentChar

    switch (type) {
      case 'added':
        lines.push(
          `${signIndent} + ${key}: ${formatValue(value, depth)}`,
        )
        break
      case 'removed':
        lines.push(
          `${signIndent} - ${key}: ${formatValue(value, depth)}`,
        )
        break
      case 'unchanged':
        lines.push(
          `${signIndent}   ${key}: ${formatValue(value, depth)}`,
        )
        break
      case 'changed':
        lines.push(
          `${signIndent} - ${key}: ${formatValue(value1, depth)}`,
        )
        lines.push(
          `${signIndent} + ${key}: ${formatValue(value2, depth)}`,
        )
        break
      case 'nested':
        lines.push(
          `${signIndent}   ${key}: {`,
        )
        lines.push(formatNode(children, depth + 1))
        lines.push(`${currentIndent}  }`)
        break
      default:
        break
    }
  })

  return lines.join('\n')
}

const stylish = (diff) => {
  const result = [
    '{',
    formatNode(diff),
    '}',
  ]
  return result.join('\n')
}

export default stylish
