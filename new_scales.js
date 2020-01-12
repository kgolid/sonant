const chromatic_scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const major_degrees = [0, 2, 4, 5, 7, 9, 11];
const major_pentatonic_degrees = [0, 2, 4, 7, 9];
const minor_degrees = [0, 2, 3, 5, 7, 8, 10];

export const tone_from_index = index => {
  const note = chromatic_scale[index % 12];
  const octave = Math.floor(index / 12);
  if (!note) console.log('index, note, octave: ', index, note, octave);
  return note.concat(octave);
};

export const index_from_tone = tone => {
  const note = [...tone].filter(isNaN).join('');
  const octave = parseInt([...tone].filter(isFinite).join(''));
  return chromatic_scale.indexOf(note) + octave * 12;
};

const get_scale = (root_index, octaves, degrees) =>
  [...Array(octaves)].flatMap((_, i) => degrees.map(d => i * 12 + d + root_index));

export const major_scale = (root, octaves) => get_scale(root, octaves, major_degrees);
export const minor_scale = (root, octaves) => get_scale(root, octaves, minor_degrees);
export const major_pentatonic_scale = (root, octaves) =>
  get_scale(root, octaves, major_pentatonic_degrees);

// 1 - 7
export const triad = (n, arr) => [
  arr[n - 1],
  arr[(n + 1) % arr.length],
  arr[(n + 3) % arr.length]
];

export const seventh = (n, arr) => [
  arr[n - 1],
  arr[(n + 1) % arr.length],
  arr[(n + 3) % arr.length],
  arr[(n + 5) % arr.length]
];

export const triads = (n, arr, octaves) =>
  [...Array(octaves)].flatMap((_, i) => triad(n, arr).map(x => x + 7 * i));
