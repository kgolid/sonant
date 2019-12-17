import Tone from 'tone';
import { major_scale, major_pentatonic_scale, get_triad, get_seventh } from './scales';
import { tonics, all, random_path_progression } from './progressions';
import { get_synth, get_polySynth, get_membraneSynth } from './synths';
import { random_partition, random_subset } from './partition';

const synth = get_synth();
synth.toMaster();
const polySynth = get_polySynth();
polySynth.toMaster();
const membraneSynth = get_membraneSynth();
membraneSynth.toMaster();

const octave = 3;

let tick;

function get_selected_scale_root() {
  var e = document.getElementById('scales');
  var scale = e.options[e.selectedIndex].value;
  console.log(scale);
  return scale;
}

function get_chord_scale(root, octave) {
  return [].concat(
    major_scale(root, octave),
    major_scale(root, octave + 1),
    major_scale(root, octave + 2)
  );
}

function get_off_chord(root, octave) {
  return [].concat(
    major_pentatonic_scale(root, octave),
    major_pentatonic_scale(root, octave + 1),
    major_pentatonic_scale(root, octave + 2)
  );
}

export default function create_transport() {
  tick = 0;

  new Tone.Loop((time, _) => play_progression(time), Tone.Time('1n') * 4).start(0);

  return Tone.Transport;
}

// -------

function play_progression(time) {
  const scale_root = get_selected_scale_root();
  const scale = get_chord_scale(scale_root, octave);
  const off_chord = get_off_chord(scale_root, octave);
  const progression = random_path_progression(); //random_from(progressions);
  const beat = random_subset(4, 0.5);
  const beat2 = random_subset(8, 0.5);

  console.log('Chord progression: ', progression);
  console.log('Beat: ', beat);
  console.log('Beat2: ', beat2);

  for (let i = 0; i < 4; i++) {
    play_chord_and_melody(
      progression[i],
      scale,
      off_chord,
      beat,
      beat2,
      time + Tone.Time('1n') * i,
      tick
    );
  }
  tick++;
}

function play_chord_and_melody(root, scale, off_chord, beat, beat2, time, tick) {
  const durations = random_partition(7, 0.2);
  const chord = get_triad(root, scale);
  const tones = get_triad(root + 7, scale);
  const melody = [].concat(tones, tones, tones, tones, off_chord);

  if (tick > 0) play_chord(chord, '4n', time);

  let elapsed = time;
  for (let i = 0; i < durations.length; i++) {
    const tones = i == durations.length - 1 ? chord : melody;
    play_note(random_from(tones), durations[i], elapsed);
    elapsed += Tone.Time(durations[i]);
  }

  if (tick > 1) {
    elapsed = time;
    for (let i = 0; i < beat.length; i++) {
      if (beat[i]) play_beat('C2', '4n', elapsed);
      elapsed += Tone.Time('4n');
    }
  }

  if (tick > 2) {
    elapsed = time;
    for (let i = 0; i < beat2.length; i++) {
      if (beat2[i]) play_beat('G2', '8n', elapsed);
      elapsed += Tone.Time('8n');
    }
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

function play_beat(note, duration, time) {
  membraneSynth.triggerAttackRelease(note, duration, time);
}

function random_from(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
