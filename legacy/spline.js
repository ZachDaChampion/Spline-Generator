class Spline {

    constructor(start, end) {
        
        this.start = start;
        this.end = end;
    }

    display() {

        stroke(100);
        line(this.start.endpoint.x, this.start.endpoint.y, this.start.control_point.x + this.start.endpoint.x, this.start.control_point.y + this.start.endpoint.y);
        line(this.end.endpoint.x, this.end.endpoint.y, this.end.control_point.x + this.end.endpoint.x, this.end.control_point.y + this.end.endpoint.y);

        noFill();
        stroke(255);
        beginShape();
        for (let t = 0; t < 1.01; t += .01) {

            vertex(
                Math.pow(1 - t, 3)*this.start.endpoint.x + 3*Math.pow(1 - t, 2)*t*(this.start.control_point.x + this.start.endpoint.x) + 3*(1 - t)*Math.pow(t, 2)*(this.end.control_point.x + this.end.endpoint.x) + Math.pow(t, 3)*this.end.endpoint.x,
                Math.pow(1 - t, 3)*this.start.endpoint.y + 3*Math.pow(1 - t, 2)*t*(this.start.control_point.y + this.start.endpoint.y) + 3*(1 - t)*Math.pow(t, 2)*(this.end.control_point.y + this.end.endpoint.y) + Math.pow(t, 3)*this.end.endpoint.y,
            );
        }
        endShape();

        this.start.display();
        this.end.display();
    }
}