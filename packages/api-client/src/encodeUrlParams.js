// @flow

export default function encodeUrlParams(query: Object) {
  if (query === null || query === undefined) {
    return '';
  }
  return Reflect.ownKeys(query)
    .filter(key => query[key] !== undefined && query[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
}
