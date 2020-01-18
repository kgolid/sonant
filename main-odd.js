import Tone from 'tone';
import seedrandom from 'seed-random';

import { random_path_progression } from './progressions';
import { flip } from './util';
import visualize from './visualize';
import { values_has_changed, update_values } from './ui';

import { get_melody_factory, get_chords } from './odd_melody';
import { SampleLibrary } from './Tonejs-Instruments';

const chord_instrument = 'cello';
const melody_instrument = 'xylophone';

var synth = SampleLibrary.load({
  instruments: [chord_instrument, melody_instrument],
  baseUrl: 'https://cdn.jsdelivr.net/gh/kgolid/sonant@304b7d0/samples/' // Remove this line if working locally.
});

synth[chord_instrument].volume.value = -20;

synth[chord_instrument].toMaster();
synth[melody_instrument].toMaster();

const rng = seedrandom();

const opts = {
  scale: 'E',
  octave_range: 2,
  min_step_dist: 1,
  max_step_dist: 3,
  leap_chance: 0.2,
  mutation_chance: 0.2,
  snap_chance: 0.8,
  snap_dist: 2,
  play_chance: 0.5
};

const oct1 = '3';
const oct2 = '4';
const chord_oct = '3';

let melody_factory_1, melody_factory_2, progression;

export default function create_transport() {
  update_values(opts);
  melody_factory_1 = get_melody_factory(rng, oct1, opts);
  melody_factory_2 = get_melody_factory(rng, oct2, opts);
  progression = random_path_progression();

  new Tone.Loop(time => create_song(time), Tone.Time('4m')).start(0);

  Tone.Transport.bpm.value = 60;
  Tone.Transport.swing = 0.5;
  return Tone.Transport;
}

function create_song(time) {
  update_factories();

  const melody_1 = get_melody(melody_factory_1, progression);
  const melody_2 = get_melody(melody_factory_2, progression);
  const chords = get_chord_progression(progression);

  create_part(melody_1, time, melody_instrument, '4n');
  create_part(melody_2, time, melody_instrument, '4n');
  create_part(chords, time, chord_instrument, '1n');

  visualize(melody_1, melody_2);
}

function get_melody(factory, progression) {
  const melody = progression.map(factory);

  const time_note_pairs = [];
  let elapsed = 0;
  for (let i = 0; i < melody.length; i++) {
    for (let j = 0; j < melody[i].tones.length; j++) {
      const beat = melody[i].tones[j];
      if (beat.play) time_note_pairs.push([elapsed, beat.tone]);
      elapsed += Tone.Time(beat.duration);
    }
  }

  return time_note_pairs;
}

function get_chord_progression(progression) {
  const chords = get_chords(progression, chord_oct, opts.scale);
  return chords.map((chord, i) => [i * 4, chord]);
}

function create_part(melody, part_time, instrument, duration) {
  melody.forEach(([time, note]) => {
    synth[instrument].triggerAttackRelease(note, duration, time + part_time);
  });
}

function update_factories() {
  if (values_has_changed(opts)) {
    update_values(opts);
    melody_factory_1 = get_melody_factory(rng, oct1, opts);
    melody_factory_2 = get_melody_factory(rng, oct2, opts);
  }

  if (flip(0.3)) {
    melody_factory_1 = get_melody_factory(rng, oct1, opts);
    progression = random_path_progression();
  }

  if (flip(0.3)) {
    melody_factory_2 = get_melody_factory(rng, oct2, opts);
  }
}
