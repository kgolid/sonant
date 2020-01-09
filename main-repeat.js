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

var synth = SampleLibrary.load({
  instruments: ['piano', 'guitar-acoustic'],
  baseUrl: "/sonant/samples/"
});

synth['piano'].toMaster();
synth['guitar-acoustic'].toMaster();

let scale = 'E';

let schemata, schemata2;
let current_progression;

export default function create_transport() {
  current_progression = random_path_progression();
  schemata = make_schemata(scale, 2, current_progression);
  schemata2 = make_schemata(scale, 4, current_progression);

  console.log('Progression: ', current_progression);
  console.log('Guitar: ', schemata.melody.map(note_to_string));
  console.log('Piano: ', schemata2.melody.map(note_to_string));

  new Tone.Loop((time, _) => play_song(time), Tone.Time('4m')).start(0);

  Tone.Transport.bpm.value = 75;
  return Tone.Transport;
}

function play_song(time) {
  if (flip(0.3)) {
    current_progression = random_path_progression();
    schemata = make_schemata(scale, 2, current_progression);
    schemata2 = make_schemata(scale, 4, current_progression);
    console.log('----------');
    console.log('Progression: ', current_progression);
    console.log('Guitar: ', schemata.melody.map(note_to_string));
    console.log('Piano: ', schemata2.melody.map(note_to_string));
  } else if (flip(0.6)) {
    schemata2 = make_schemata(scale, 4, current_progression);
    console.log('Piano: ', schemata2.melody.map(note_to_string));
  }

  const song = generate_from_schemata(schemata);
  const song2 = generate_from_schemata(schemata2);

  let elapsed = time;
  song.forEach(beat => {
    synth['guitar-acoustic'].triggerAttackRelease(beat.chord, '2n', elapsed);
    elapsed += Tone.Time('8n');
    beat.melody.forEach(tone => {
      synth['guitar-acoustic'].triggerAttackRelease(tone.note, tone.duration, elapsed);
      elapsed += Tone.Time(tone.duration);
    });
  });

  elapsed = time;
  song2.forEach(beat => {
    elapsed += Tone.Time('8n');
    beat.melody.forEach(tone => {
      synth['piano'].triggerAttackRelease(tone.note, tone.duration, elapsed);
      elapsed += Tone.Time(tone.duration);
    });
  });
}
