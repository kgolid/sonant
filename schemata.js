import { major_scale, major_pentatonic_scale, get_triad } from './scales';
import { random_partition } from './partition';
import { flip } from './util';

export function generate_from_schemata({ scale, progression, melody }) {
  melody = mutate_melody(melody, 0.3);
  return progression.map((chord, i) => ({
    chord,
    melody: mutate_melody(melody, i === 3 ? 0.5 : 0.1).map(t => ({
      note: get_note(t, scale, chord),
      duration: t.duration
    }))
  }));
}

export function make_schemata(scale_root, octave, prog) {
  const chord_scale = get_scale(scale_root, octave);
  const scale = get_penta_scale(scale_root, octave);
  const progression = make_progression(chord_scale, prog);
  const melody = make_melody();

  return { scale, progression, melody };
}

function mutate_melody(melody, prob) {
  return melody.map(t => (flip(prob) ? make_relative_tone(t.duration, false) : t));
}

function get_note(relative_note, scale, chord) {
  const source = relative_note.source === 'chord' ? chord : scale;
  return source[relative_note.degree];
}

function get_scale(root, octave) {
  return [].concat(major_scale(root, octave), major_scale(root, octave + 1));
}

function get_penta_scale(root, octave) {
  return [].concat(
    major_pentatonic_scale(root, octave),
    major_pentatonic_scale(root, octave + 1)
  );
}

function make_progression(scale, prog) {
  return prog.map(c => get_triad(c, scale));
}

function make_melody() {
  const durations = random_partition(7, 0.2);
  const isLast = x => x === durations.length - 1;
  return durations.map((d, i) => make_relative_tone(d, isLast(i)));
}

function make_relative_tone(duration, isLast) {
  const from_chord = isLast || flip(0.6);
  const source = from_chord ? 'chord' : 'scale';
  const degree = Math.floor(Math.random() * (from_chord ? 3 : 10));

  return { duration, source, degree };
}

export function note_to_string({ duration, source, degree }) {
  return (source === 'chord' ? 'C' : 'S') + '.' + degree + ' - ' + duration;
}
