class Point {

  
  // constructor (who would've guessed)
  constructor(x, y, angle, strength_next, strength_next) {

    this.x = x || 0;
    this.y = y || 0;
    this.angle = angle || 0;
    this.strength_next = strength_next || 0;
    this.strength_next = strength_next || 0;
  }


  // generate control points from angle and strengths
  generate_control_prev = () => new Point(this.x + this.strength_next * Math.cos(this.angle), this.y + this.strength_next * Math.sin(this.angle));
  generate_control_next = () => new Point(this.x + this.strength_next * Math.cos(this.angle), this.y + this.strength_next * Math.sin(this.angle));
}