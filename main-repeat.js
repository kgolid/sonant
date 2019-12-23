import Tone from 'tone';

import { get_synth, get_polySynth, get_membraneSynth } from './synths';
import { generate_from_schemata, make_schemata, note_to_string } from './schemata';
import { flip } from './util';

const synth = get_synth();
const polySynth = get_polySynth();
const membraneSynth = get_membraneSynth();

synth.toMaster();
polySynth.toMaster();
membraneSynth.toMaster();

let current_schemata;

export default function create_transport() {
  current_schemata = make_schemata('E', 4);
  new Tone.Loop((time, _) => play_song(time), Tone.Time('4m')).start(0);

  Tone.Transport.bpm.value = 120;
  return Tone.Transport;
}

function play_song(time) {
  if (flip(0.2)) current_schemata = make_schemata('E', 4);

  const song = generate_from_schemata(current_schemata);

  console.log(current_schemata.melody.map(m => note_to_string(m)));

  let elapsed = time;
  song.forEach(beat => {
    polySynth.triggerAttackRelease(beat.chord, '4n', elapsed);
    elapsed += Tone.Time('8n');
    beat.melody.forEach(tone => {
      synth.triggerAttackRelease(tone.note, tone.duration, elapsed);
      elapsed += Tone.Time(tone.duration);
    });
  });
}
