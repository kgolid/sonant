import Tone from 'tone';

import { get_synth, get_polySynth, get_membraneSynth } from './synths';
import { generate_from_schemata, make_schemata, note_to_string } from './schemata';
import { random_path_progression } from './progressions';
import { flip } from './util';

import { SampleLibrary } from './Tonejs-Instruments';

//const synth = get_synth();
const polySynth = get_polySynth();
const membraneSynth = get_membraneSynth();

//synth.toMaster();
polySynth.toMaster();
membraneSynth.toMaster();

let current_schemata;
var synth = SampleLibrary.load({
  instruments: ['piano', 'guitar-acoustic']
});

synth['piano'].toMaster();
synth['guitar-acoustic'].toMaster();

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
    synth['guitar-acoustic'].triggerAttackRelease(beat.chord, '2n', elapsed);
    elapsed += Tone.Time('8n');
    beat.melody.forEach(tone => {
      synth['piano'].triggerAttackRelease(tone.note, tone.duration, elapsed);
      elapsed += Tone.Time(tone.duration);
    });
  });
}
