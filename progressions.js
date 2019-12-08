export const p1564 = [1, 5, 6, 4];
export const p1465 = [1, 4, 6, 5];
export const p1645 = [1, 6, 4, 5];
export const p1456 = [1, 4, 5, 6];
export const p6415 = [6, 4, 1, 5];
export const p1425 = [1, 4, 2, 5];
export const p1415 = [1, 4, 1, 5];
export const p4536 = [4, 5, 3, 6];

export const prand = [random_degree(), random_degree(), random_degree(), random_degree()];

export const tonics = [p1415, p1425, p1456, p1465, p1564, p1645];
export const all = [p1415, p1425, p1456, p1465, p1564, p1645, p6415, p4536];

function random_degree() {
  return Math.floor(Math.random() * 7) + 1;
}
