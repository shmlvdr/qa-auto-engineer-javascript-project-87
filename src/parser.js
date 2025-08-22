import yaml from 'js-yaml'

export default (data, format) => {
  try {
    if (format === 'json') {
      return JSON.parse(data)
    }
    if (format === 'yml') {
      return yaml.load(data)
    }
    throw new Error(`Unknown format: ${format}`)
  }
  catch (e) {
    throw new Error(`Error parsing data as ${format}: ${e.message}`)
  }
}
