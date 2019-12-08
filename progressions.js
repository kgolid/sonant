export const p1564 = [1, 5, 6, 4];
export const p1465 = [1, 4, 6, 5];
export const p1645 = [1, 6, 4, 5];
export const p1456 = [1, 4, 5, 6];
export const p6415 = [6, 4, 1, 5];
export const p1425 = [1, 4, 2, 5];
export const p1415 = [1, 4, 1, 5];
export const p4536 = [4, 5, 3, 6];

export const prand = [1, random_degree(), random_degree(), random_degree()];

export const tonics = [p1415, p1425, p1456, p1465, p1564, p1645];
export const all = [p1415, p1425, p1456, p1465, p1564, p1645, p6415, p4536];

export function random_path_progression() {
  const c1 = 1;
  const c2 = random_degree();
  const c3 = reduce_chord(c2);
  const c4 = reduce_chord(c3);

  return [c1, c2, c3, c4];
}

function random_degree() {
  return Math.floor(Math.random() * 5) + 2;
}

function reduce_chord(chord) {
  if (chord === 2) return flip(0.5) ? 3 : 5;
  if (chord === 3) return flip(0.5) ? 4 : 6;
  if (chord === 4) return flip(0.5) ? 2 : 5;
  if (chord === 5) return flip(0.5) ? 3 : 6;
  if (chord === 6) return flip(0.5) ? 2 : 4;
}

function flip(prob) {
  return Math.random() < prob;
}
