import Tone from 'tone';
import seedrandom from 'seed-random';

import { random_path_progression } from './progressions';
import { flip } from './util';
import visualize from './visualize';
import { get_selected_values, values_has_changed } from './ui';

import { get_melody_factory } from './odd_melody';
import { SampleLibrary } from './Tonejs-Instruments';

const chord_instrument = 'cello';
const melody_instrument = 'xylophone';

var synth = SampleLibrary.load({
  instruments: [chord_instrument, melody_instrument],
  baseUrl: '/sonant/samples/' // Remove this line if working locally.
});

synth[chord_instrument].volume.value = -20;

synth[chord_instrument].toMaster();
synth[melody_instrument].toMaster();

const rng = seedrandom();

const opts = {
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

let root;

let melody_factory_1, melody_factory_2;
let melodies_1, melodies_2;

let progression;

function get_selected_scale_root() {
  var e = document.getElementById('scales');
  var scale = e.options[e.selectedIndex].value;
  return scale;
}

function update_opts() {
  root = get_selected_scale_root();
  let vals = get_selected_values();
  opts.leap_chance = vals.leap_chance;
  opts.snap_chance = vals.snap_chance;
  opts.play_chance = vals.play_chance;
  opts.mutation_chance = vals.mutation_chance;
}

export default function create_transport() {
  update_opts();
  melody_factory_1 = get_melody_factory(rng, root + oct1, root + chord_oct, opts);
  melody_factory_2 = get_melody_factory(rng, root + oct2, root + chord_oct, opts);
  progression = random_path_progression();

  new Tone.Loop((time, _) => play_song(time), Tone.Time('4m')).start(0);
  Tone.Transport.bpm.value = 60;
  Tone.Transport.swing = 0.5;
  return Tone.Transport;
}

function play_song(time) {
  if (get_selected_scale_root() != root || values_has_changed(opts)) {
    console.log('update next');
    update_opts();
    melody_factory_1 = get_melody_factory(rng, root + oct1, root + chord_oct, opts);
    melody_factory_2 = get_melody_factory(rng, root + oct2, root + chord_oct, opts);
  }

  if (flip(0.3)) {
    melody_factory_1 = get_melody_factory(rng, root + oct1, root + chord_oct, opts);
    progression = random_path_progression();
  }

  if (flip(0.3)) {
    melody_factory_2 = get_melody_factory(rng, root + oct2, root + chord_oct, opts);
  }

  melodies_1 = progression.map(c => melody_factory_1(c));
  melodies_1.forEach(m => console.log(m.tones.map(t => t.tone + '/' + t.duration)));

  melodies_2 = progression.map(c => melody_factory_2(c));
  melodies_2.forEach(m => console.log(m.tones.map(t => t.tone + '/' + t.duration)));

  let elapsed = time;
  melodies_1.forEach(melody => {
    synth[chord_instrument].triggerAttackRelease(melody.chord, '1n', elapsed);
    melody.tones.forEach(beat => {
      if (beat.play)
        synth[melody_instrument].triggerAttackRelease(beat.tone, '4n', elapsed);
      elapsed += Tone.Time(beat.duration);
    });
  });

  elapsed = time;
  melodies_2.forEach(melody => {
    melody.tones.forEach(beat => {
      if (beat.play)
        synth[melody_instrument].triggerAttackRelease(beat.tone, '4n', elapsed);
      elapsed += Tone.Time(beat.duration);
    });
  });

  visualize(melodies_1, melodies_2);
}
