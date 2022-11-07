export function select(selector, container = document) {
  return container.querySelector(selector);
}

export function selectAll(selector, container = document) {
  return container.querySelectorAll(selector);
}

export function compareArrays(arr, arr2) {
  return arr.every((i) => arr2.includes(i));
}