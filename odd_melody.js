import {
  tone_from_index,
  index_from_tone,
  major_scale,
  triads,
  triad
} from './new_scales';
import {
  get_partition,
  get_walk,
  get_walker,
  snap_to_highlights,
  random_int,
  mutate_walk
} from 'oddstruct';
import { range } from './util';

const get_configured_walker = (rng, range) => {
  return get_walker(rng, {
    min: 0,
    max: range,
    min_stepsize: 1,
    max_stepsize: 4,
    leap_chance: 0.2
  });
};

export const get_melody_factory = (rng, root, chord_root, number_of_octaves) => {
  const scale = major_scale(index_from_tone(root), number_of_octaves);
  const chord_scale = major_scale(index_from_tone(chord_root), 2);
  const durations = get_partition(rng).map(x => '' + x + 'n');

  const walker = get_configured_walker(rng, scale.length - 1);
  const walk = get_walk(walker, random_int(rng, 0, 7), durations.length);

  return chord => {
    const chord_tones = triads(chord, range(scale.length), number_of_octaves);
    const mutated_walk = mutate_walk(rng, walk, walker, 0.2);
    const snapped_walk = snap_to_highlights(rng, mutated_walk, chord_tones, 0.8, 2);
    const scale_walk = snapped_walk.map(pos => scale[pos]);

    const chrd = triad(chord, chord_scale).map(tone_from_index);
    return {
      chord: chrd,
      tones: durations.map((d, i) => ({
        duration: d,
        tone: tone_from_index(scale_walk[i])
      }))
    };
  };
};
