export function get_selected_values() {
  const leap_chance = parseFloat(document.getElementById('leap_chance').value);
  const snap_chance = parseFloat(document.getElementById('snap_chance').value);
  const play_chance = parseFloat(document.getElementById('play_chance').value);
  const mutation_chance = parseFloat(document.getElementById('mutation_chance').value);
  return { leap_chance, snap_chance, play_chance, mutation_chance };
}

export function values_has_changed(current) {
  const selected_values = Object.entries(get_selected_values());
  console.log(current, selected_values);
  return selected_values.some(value => value[1] !== current[value[0]]);
}
