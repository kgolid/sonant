import Tone from 'tone';

export function get_synth() {
  const synth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.03,
      decay: 0.1,
      sustain: 0.3,
      release: 0.2
    }
  });

  return synth;
}

export function get_polySynth() {
  const polySynth = new Tone.PolySynth(3, Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.3,
      release: 0.1
    },
    volume: -5
  });

  return polySynth;
}

export function get_membraneSynth() {
  const synth = new Tone.MembraneSynth();
  synth.volume.value = -10;
  return synth;
}
