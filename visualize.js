import { index_from_tone } from './new_scales';

export default (mel1, mel2) => {
  empty_node(document.getElementById('board'));
  let sketch = function(p) {
    let tick;

    p.setup = function() {
      const canvas = p.createCanvas(640, 297);
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
      for (const tone of melody) {
        const index = index_from_tone(tone[1]);
        display_tone(index, tone[0]);
      }
    }

    function display_lines() {
      p.stroke(0, 40);
      for (let i = p.height; i > 0; i -= 10) {
        p.line(0, i, p.width, i);
      }
      p.line((1 * p.width) / 4, 0, (1 * p.width) / 4, p.height);
      p.line((2 * p.width) / 4, 0, (2 * p.width) / 4, p.height);
      p.line((3 * p.width) / 4, 0, (3 * p.width) / 4, p.height);
    }

    function display_tone(tone, time) {
      p.ellipse(5 + time * 40, 120 + p.height - tone * 5, 15, 15);
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
