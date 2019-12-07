const chromatic_scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function get_major_scale(root, oc, notes) {
  const t0 = get_note(root, oc, notes);
  const t1 = get_note(root + 2, oc, notes);
  const t2 = get_note(root + 4, oc, notes);
  const t3 = get_note(root + 5, oc, notes);
  const t4 = get_note(root + 7, oc, notes);
  const t5 = get_note(root + 9, oc, notes);
  const t6 = get_note(root + 11, oc, notes);

  return [t0, t1, t2, t3, t4, t5, t6];
}

function get_note(pos, octave, notes) {
  return pos < 12 ? notes[pos] + octave : notes[pos % 12] + (octave + 1);
}

export const major_scale = (root, oct) =>
  get_major_scale(tone_to_index(root), oct, chromatic_scale);

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

export function random_triad_from(arr) {
  const root = Math.floor(Math.random() * arr.length);
  return get_triad(root + 1, arr);
}

function tone_to_index(tone) {
  return chromatic_scale.indexOf(tone);
}
