import yml from 'js-yaml';

export default (data, format) => {
    if (format === 'json') {
    return JSON.parse(data);
}

    if (format === 'yml') {
    return yml.load(data);
}

    throw Error('unknow format');
}