export const getFormatFromExtension = (ext) => {
  const extLower = ext.toLowerCase()
  if (extLower === '.json') return 'json'
  if (extLower === '.yml' || extLower === '.yaml') return 'yml'
  throw new Error(`Unsupported extension: ${ext}`)
}
