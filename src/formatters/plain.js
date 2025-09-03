import _ from 'lodash'

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const plain = (diffTree) => {
  const iter = (node, path) => {
    const lines = node.flatMap((item) => {
      const currentPath = path ? `${path}.${item.key}` : item.key

      switch (item.type) {
        case 'nested':
          return iter(item.children, currentPath)
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(item.value)}`
        case 'removed':
          return `Property '${currentPath}' was removed`
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`
        case 'unchanged':
          return []
        default:
          return []
      }
    })

    return lines.filter(line => line !== '')
  }

  return iter(diffTree, '').join('\n')
}

export default plain
