const chromatic_scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function get_major_scale(root, oc, notes) {
  const t1 = notes[root] + oc;
  const t2 = root + 2 < 12 ? notes[root + 2] + oc : notes[(root + 2) % 11] + (oc + 1);
  const t3 = root + 4 < 12 ? notes[root + 4] + oc : notes[(root + 4) % 11] + (oc + 1);
  const t4 = root + 5 < 12 ? notes[root + 5] + oc : notes[(root + 5) % 11] + (oc + 1);
  const t5 = root + 7 < 12 ? notes[root + 7] + oc : notes[(root + 7) % 11] + (oc + 1);
  const t6 = root + 9 < 12 ? notes[root + 9] + oc : notes[(root + 9) % 11] + (oc + 1);
  const t7 = root + 11 < 12 ? notes[root + 11] + oc : notes[(root + 11) % 11] + (oc + 1);

  return [t1, t2, t3, t4, t5, t6, t7];
}

export const c_major_scale = oct => get_major_scale(0, oct, chromatic_scale);

// 1 - 7
export const get_triad = (n, arr) => [
  arr[n - 1],
  arr[(n + 1) % arr.length],
  arr[(n + 3) % arr.length]
];

export const get_fives = (n, arr) => [
  arr[n - 1],
  arr[n],
  arr[(n + 1) % arr.length],
  arr[(n + 2) % arr.length],
  arr[(n + 3) % arr.length]
];
