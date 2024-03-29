class Point {


  // constructor (who would've guessed)
  constructor(x, y, angle, strength_prev, strength_next) {

    this.x = x || 0;
    this.y = y || 0;
    this.angle = angle || 0;
    this.strength_prev = strength_prev || 0;
    this.strength_next = strength_next || 0;
  }


  // generate control points from angle and strengths
  generate_control_prev = () => new Point(this.x + this.strength_next * Math.cos(PI + this.angle), this.y + this.strength_prev * Math.sin(PI + this.angle));
  generate_control_next = () => new Point(this.x + this.strength_next * Math.cos(this.angle), this.y + this.strength_prev * Math.sin(this.angle));


  // update x coordinate
  update_x(x) {
    this.x = int(x);
  }


  // update y coordinate
  update_y(y) {
    this.y = int(y);
  }
}