// @flow

export const keyMirror = (
  object: Object,
  transformKey: Function = key => key
): Object =>
  Reflect.ownKeys(object).reduce((result, key) => {
    result[key] = transformKey(key);
    return result;
  }, {});

export function promisify(original: Function, ctx: any): Function {
  return function decoated(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, ...values) => {
        if (err) {
          reject(err);
        } else {
          resolve(values[0]);
        }
      });
      original.call(ctx || this, ...args);
    });
  };
}

export const canUseDom = typeof window !== 'undefined';

export const delay = (ms: number): Promise<any> =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));
