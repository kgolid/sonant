import Tone from 'tone';
import { major_scale, get_triad } from './scales';
import { p1564, p4536 } from './progressions';
import { random_partition } from './partition';

const synth = new Tone.Synth().toMaster();
const polySynth = new Tone.PolySynth(6, Tone.Synth).toMaster();

export default function create_transport() {
  const transport = Tone.Transport;

  const scale = [].concat(major_scale('F#', 3), major_scale('F#', 4));
  const dur1 = play_progression(transport, p1564, scale, 0);
  const dur2 = play_progression(transport, p4536, scale, dur1);

  transport.loop = true;
  transport.loopEnd = dur2;

  return transport;
}

// -------

function play_progression(transport, progression, scale, time) {
  for (let i = 0; i < 4; i++) {
    play_chord_and_melody(transport, progression[i], scale, time + Tone.Time('1n') * i);
  }
  return time + Tone.Time('1n') * 4;
}

function play_chord_and_melody(transport, root, scale, time) {
  const durations = random_partition(6, 0.2);
  const triad = get_triad(root, scale);
  const chord = triad;
  const melody = triad;

  transport.schedule(t => play_chord(chord, '4n', t), time);

  let elapsed = time + Tone.Time('4n');
  for (const duration of durations) {
    transport.schedule(t => play_note(random_from(melody), duration, t), elapsed);
    elapsed += Tone.Time(duration);
  }
}

function play_chord(note, duration, time) {
  console.log(note, duration);
  polySynth.triggerAttackRelease(note, duration, time);
}

function play_note(note, duration, time) {
  console.log(note, duration);
  synth.triggerAttackRelease(note, duration, time);
}

function random_from(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
