export function flip(prob) {
  return Math.random() < prob;
}

export function range(max) {
  return [...Array(max)].map((_, i) => i);
}
