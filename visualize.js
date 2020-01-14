import { index_from_tone } from './new_scales';

export default (mel1, mel2) => {
  empty_node(document.getElementById('board'));
  let sketch = function(p) {
    let tick;
    p.setup = function() {
      const canvas = p.createCanvas(640, 298);
      canvas.parent('board');
      p.noStroke();
      p.frameRate(20);
      tick = 0;
    };

    p.draw = function() {
      p.background('#fff');

      display_lines();
      display_melody(mel1, p.color(230, 50, 80, 120));
      display_melody(mel2, p.color(255, 180, 18, 120));

      p.stroke('#000');
      p.line(tick * 2, 0, tick * 2, p.height);
      tick++;
    };

    function display_melody(melody, col) {
      p.fill(col);
      p.noStroke();
      let elapsed = 0;
      for (const bar of melody) {
        for (const tone of bar.tones) {
          const index = index_from_tone(tone.tone);
          const dur = duration(tone.duration);

          if (tone.play) display_tone(index, elapsed);
          elapsed += dur;
        }
      }
    }

    function display_lines() {
      p.stroke(0, 50);
      for (let i = p.height; i > 0; i -= 10) {
        p.line(0, i, p.width, i);
      }
    }

    function display_tone(tone, time) {
      p.ellipse(time * 10, 120 + p.height - tone * 5, 15, 15);
    }
  };
  new p5(sketch);
};

const empty_node = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

const duration = s => {
  if (s === '4n') return 4;
  if (s === '8n') return 2;
  if (s === '16n') return 1;
};
