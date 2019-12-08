const chromatic_scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const major_degrees = [0, 2, 4, 5, 7, 9, 11];
const major_pentatonic_degrees = [0, 2, 4, 7, 9];
const minor_degrees = [0, 2, 3, 5, 7, 8, 10];

function get_scale(root, oc, degrees) {
  return degrees.map(n => get_note(root + n, oc));
}

function get_note(pos, octave) {
  return pos < 12
    ? chromatic_scale[pos] + octave
    : chromatic_scale[pos % 12] + (octave + 1);
}

export const major_scale = (root, oct) =>
  get_scale(tone_to_index(root), oct, major_degrees);

export const major_pentatonic_scale = (root, oct) =>
  get_scale(tone_to_index(root), oct, major_pentatonic_degrees);

export const minor_scale = (root, oct) =>
  get_scale(tone_to_index(root), oct, minor_degrees);

// 1 - 7
export const get_triad = (n, arr) => [
  arr[n - 1],
  arr[(n + 1) % arr.length],
  arr[(n + 3) % arr.length]
];

export const get_seventh = (n, arr) => [
  arr[n - 1],
  arr[(n + 1) % arr.length],
  arr[(n + 3) % arr.length],
  arr[(n + 5) % arr.length]
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
