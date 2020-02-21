// @flow
export const range = (count: number): Array<number> => [...Array(count).keys()];

export const removeAtIndex = (array: Array<any>, index: number) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

export const replaceAtIndex = (
  array: Array<any>,
  index: number,
  item: ?any
) => [...array.slice(0, index), item, ...array.slice(index + 1)];

export const insertAtIndex = (array: Array<any>, index: number, item: ?any) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];
