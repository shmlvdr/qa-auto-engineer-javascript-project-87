import yaml from 'js-yaml'
import ini from 'ini'

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yaml':
    case 'yml':
      return yaml.load(data)
    case 'ini':
      return ini.parse(data)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

export default parse
