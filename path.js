let path = [];


// generate one segment from points
function generate_seg_from_pts(p1, p2, step_size) {

  // get endpoints and control points
  let step = step_size || .01;
  let control_start = p1.generate_control_next();
  let control_end = p2.generate_control_prev();

  // generate segment
  let segment = [];
  for (let t = 0; t <= 1 + step; t += step) {

    let x = 
      Math.pow(1 - t, 3) * p1.x + 
      3 * Math.pow(1 - t, 2) * t * (control_start.x) + 
      3 * (1 - t) * Math.pow(t, 2) * (control_end.x) + 
      Math.pow(t, 3) * p2.x;

    let y = 
      Math.pow(1 - t, 3) * p1.y + 
      3 * Math.pow(1 - t, 2) * t * (control_start.y) + 
      3 * (1 - t) * Math.pow(t, 2) * (control_end.y) + 
      Math.pow(t, 3) * p2.y;
      
    segment.push({'x': x, 'y': y});
  }

  return segment;
}


// generate one segment of the path
function generate_segment(index, step_size) {
  return generate_seg_from_pts(path[index], path[index + 1]);
}


// generate full path
function generate_path(step_size) {

  let result = [];
  for (let i = 0; i < path.length - 1; i++) result = result.concat(generate_segment(i, step_size));
  return result;
}