import _ from 'lodash'

const buildDiffTree = (data1, data2) => {
  const allKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  return allKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 }
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 }
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: buildDiffTree(value1, value2) }
    }
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 }
    }
    return { key, type: 'changed', value1, value2 }
  })
}

export default buildDiffTree
