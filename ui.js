function get_selected_values() {
  const el = document.getElementById('scales');
  const scale = el.options[el.selectedIndex].value;

  const leap_chance = parseFloat(document.getElementById('leap_chance').value);
  const snap_chance = parseFloat(document.getElementById('snap_chance').value);
  const play_chance = parseFloat(document.getElementById('play_chance').value);
  const mutation_chance = parseFloat(document.getElementById('mutation_chance').value);

  const min_step_dist = parseFloat(document.getElementById('min_step').value);
  const max_step_dist = parseFloat(document.getElementById('max_step').value);
  const snap_dist = parseFloat(document.getElementById('snap_dist').value);
  const octave_range = parseFloat(document.getElementById('octave_range').value);

  return {
    scale,
    leap_chance,
    snap_chance,
    play_chance,
    mutation_chance,
    min_step_dist,
    max_step_dist,
    snap_dist,
    octave_range
  };
}

export function values_has_changed(current) {
  const selected_values = Object.entries(get_selected_values());
  return selected_values.some(value => value[1] !== current[value[0]]);
}

export function update_values(current) {
  const selected_values = Object.entries(get_selected_values());
  return selected_values.forEach(value => (current[value[0]] = value[1]));
}
