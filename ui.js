export function get_selected_values() {
  var leap_chance = parseFloat(document.getElementById('leap_chance').value);
  var snap_chance = parseFloat(document.getElementById('snap_chance').value);
  var play_chance = parseFloat(document.getElementById('play_chance').value);
  var mutation_chance = parseFloat(document.getElementById('mutation_chance').value);
  return { leap_chance, snap_chance, play_chance, mutation_chance };
}
