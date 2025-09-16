import formatStylish from './stylish.js'
import formatPlain from './plain.js'
import formatJson from './json.js'

export default function format(diffTree, formatName) {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diffTree)
    case 'plain':
      return formatPlain(diffTree)
    case 'json':
      return formatJson(diffTree)
    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}
