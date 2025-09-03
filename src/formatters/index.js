import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = (format) => {
  switch (format) {
    case 'stylish':
      return stylish
    case 'plain':
      return plain
    case 'json':
      return json
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

export default formatters
