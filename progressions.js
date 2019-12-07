export const p1564 = [1, 5, 6, 4];
export const p1465 = [1, 4, 6, 5];
export const p4536 = [4, 5, 3, 6];
export const prand = [random_degree(), random_degree(), random_degree(), random_degree()];

function random_degree() {
  return Math.floor(Math.random() * 7) + 1;
}
