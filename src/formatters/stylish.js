import _ from 'lodash'

const indent = depth => ' '.repeat(depth * 2)

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value)
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 2)}  ${key}: ${stringify(val, depth + 2)}`,
  )

  return `{\n${lines.join('\n')}\n${indent(depth + 1)}}`
}

const formatStylish = (diffTree) => {
  const iter = (node, depth) => {
    const lines = node.map((item) => {
      switch (item.type) {
        case 'nested':
          return `${indent(depth + 1)}  ${item.key}: {\n${iter(item.children, depth + 2)}\n${indent(depth + 1)}}`
        case 'added':
          return `${indent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`
        case 'removed':
          return `${indent(depth)}- ${item.key}: ${stringify(item.value, depth)}`
        case 'changed':
          return `${indent(depth)}- ${item.key}: ${stringify(item.value1, depth)}\n${indent(depth)}+ ${item.key}: ${stringify(item.value2, depth)}`
        case 'unchanged':
          return `${indent(depth)}  ${item.key}: ${stringify(item.value, depth)}`
        default:
          return ''
      }
    })

    return lines.join('\n')
  }

  return `{\n${iter(diffTree, 1)}\n}`
}

export default formatStylish
