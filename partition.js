export function random_partition(n, prob) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    if (i !== n - 1 && flip(prob)) {
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

export function random_subset(n, prob) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(flip(prob));
  }
  return arr;
}

function flip(prob) {
  return Math.random() < prob;
}
