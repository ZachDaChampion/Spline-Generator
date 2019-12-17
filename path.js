let path = [];


// generate one segment of the path
function generate_segment(index, step_size) {

  // get endpoints and control points
  let step = step_size || .01;
  let p1 = path[index];
  let p2 = path[index + 1];
  let control_start = p1.generate_control_next();
  let control_end = p2.generate_control_prev();

  // generate segment
  let segment = [];
  for (let t = 0; t < 1; t += step_size) {

    let x = Math.pow(1 - t, 3)*p1.x + 3*Math.pow(1 - t, 2)*t*(control_start.x + p1.x) + 3*(1 - t)*Math.pow(t, 2)*(control_end.x + p2.x) + Math.pow(t, 3)*p2.x;
    let y = Math.pow(1 - t, 3)*p1.y + 3*Math.pow(1 - t, 2)*t*(control_start.y + p1.y) + 3*(1 - t)*Math.pow(t, 2)*(control_end.y + p2.y) + Math.pow(t, 3)*p2.y;
    segment.push({'x': x, 'y': y});
  }

  return segment;
}


// generate full path
function generate_path(step_size) {

  let result = [];
  for (let i = 0; i < path.length - 1; i++) result = result.concat(generate_segment(i, step_size));
  return result;
}