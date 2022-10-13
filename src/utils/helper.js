export function select(selector, container = document) {
  return container.querySelector(selector);
}

export function selectAll(selector, container = document) {
  return container.querySelectorAll(selector);
}

export function compareArrays(arr, arr2) {
  return arr.every((i) => arr2.includes(i));
}

// TODO
export function convertPrice(val) {
  return new Intl.NumberFormat('de', {
    currency: 'EUR',
    style: 'currency',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(val);
}

export function convertPriceUsd(val) {
  return new Intl.NumberFormat('en', {
    currency: 'USD',
    style: 'currency',
  }).format(val);
}