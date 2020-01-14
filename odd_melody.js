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
import { range, flip } from './util';

export const get_melody_factory = (rng, root, chord_root, opts) => {
  const scale = major_scale(index_from_tone(root), opts.octave_range);
  const chord_scale = major_scale(index_from_tone(chord_root), 2);
  const durations = get_partition(rng).map(x => '' + x + 'n');

  const walker = get_walker(rng, {
    min: 0,
    max: scale.length - 1,
    min_stepsize: opts.min_step_dist,
    max_stepsize: opts.max_step_dist,
    leap_chance: opts.leap_chance
  });
  const walk = get_walk(walker, random_int(rng, 0, 7), durations.length);

  return chord => {
    const chord_tones = triads(chord, range(scale.length), opts.octave_range);
    const mutated_walk = mutate_walk(rng, walk, walker, opts.mutation_chance);
    const snapped_walk = snap_to_highlights(
      rng,
      mutated_walk,
      chord_tones,
      opts.snap_chance,
      opts.snap_dist
    );
    const scale_walk = snapped_walk.map(pos => scale[pos]);

    const chrd = triad(chord, chord_scale).map(tone_from_index);
    return {
      chord: chrd,
      tones: durations.map((d, i) => ({
        duration: d,
        tone: tone_from_index(scale_walk[i]),
        play: flip(opts.play_chance)
      }))
    };
  };
};
