import Tone from 'tone';
import seedrandom from 'seed-random';

import { random_path_progression } from './progressions';
import { flip } from './util';

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

const o1 = '3';
const o2 = '4';

let root;

let melody_factory_1;
let melody_factory_2;

let progression;

function get_selected_scale_root() {
  var e = document.getElementById('scales');
  var scale = e.options[e.selectedIndex].value;
  console.log(scale);
  return scale;
}

export default function create_transport() {
  root = get_selected_scale_root();
  melody_factory_1 = get_melody_factory(rng, root + o1, root + o1, 2);
  melody_factory_2 = get_melody_factory(rng, root + o2, root + o1, 2);
  progression = random_path_progression();

  new Tone.Loop((time, _) => play_song(time), Tone.Time('4m')).start(0);
  Tone.Transport.bpm.value = 80;
  Tone.Transport.swing = 0.5;
  return Tone.Transport;
}

function play_song(time) {
  if (flip(0.5) || get_selected_scale_root() != root) {
    root = get_selected_scale_root();
    melody_factory_1 = get_melody_factory(rng, root + o1, root + o1, 2);
    melody_factory_2 = get_melody_factory(rng, root + o2, root + o1, 2);
    progression = random_path_progression();
  }

  let melodies_1 = progression.map(c => melody_factory_1(c));
  melodies_1.forEach(m => console.log(m.tones.map(t => t.tone + '/' + t.duration)));

  let melodies_2 = progression.map(c => melody_factory_2(c));
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
}
