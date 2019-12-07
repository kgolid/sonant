export function random_partition(n, prob) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    if (flip(prob)) {
      arr.push('4n');
      i++;
    } else if (flip(prob)) {
      arr.push('16n');
      arr.push('16n');
    } else {
      arr.push('8n');
    }
  }
  return arr;
}

function flip(prob) {
  return Math.random() < prob;
}
