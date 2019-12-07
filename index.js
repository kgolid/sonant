import Tone from 'tone';
import { c_major_scale, get_triad, get_fives } from './scales';
import { random_partition } from './partition';

var synth = new Tone.Synth().toMaster();
var polySynth = new Tone.PolySynth(3, Tone.Synth).toMaster();
var transport = Tone.Transport;

const scale = [].concat(c_major_scale(3), c_major_scale(4));

const progression = [1, 5, 6, 4];
//const progression = [1, 4, 6, 5];
//const progression = [4, 5, 3, 6];
//const progression = [random_degree(), random_degree(), random_degree(), random_degree()];
console.log(progression);

play_chord_and_melody(transport, progression[0], scale, 0);
play_chord_and_melody(transport, progression[1], scale, Tone.Time('1n'));
play_chord_and_melody(transport, progression[2], scale, Tone.Time('1n') * 2);
play_chord_and_melody(transport, progression[3], scale, Tone.Time('1n') * 3);

transport.loop = true;
transport.loopEnd = Tone.Time('1n') * 4;

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

document.querySelector('button').addEventListener('click', _ => transport.toggle());

function random_from(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function random_triad_from(arr) {
  const root = Math.floor(Math.random() * arr.length);
  return get_triad(root + 1, arr);
}

function random_degree() {
  return Math.floor(Math.random() * 7) + 1;
}
