class Point {

    constructor(x, y, control) {

        this.x = x;
        this.y = y;
        this.is_control = control;
        this.size = 10;
        this.actual_size = this.size;
        this.selected = false;
    }

    display(group, link) {

        this.size = ((dist(mouseX, mouseY, this.x + (this.is_control ? group.endpoint.x : 0), this.y + (this.is_control ? group.endpoint.y : 0)) <= this.size / 2 + 5 && !has_selected) || this.selected) ? 20 : 10;
        if (mouseIsPressed) {
            if (this.size == 20 && !has_selected) {
                this.selected = true;
                has_selected = true;
            }
        }
        else {
            if (this.selected) has_selected = false;
            this.selected = false;
        }
        if (this.selected) {

            this.x = mouseX - (this.is_control ? group.endpoint.x : 0);
            this.y = mouseY - (this.is_control ? group.endpoint.y : 0);
            if (link) {

                if (this.is_control) {
                    link.control_point.x = 2*link.endpoint.x - (this.x + 2*group.endpoint.x);
                    link.control_point.y = 2*link.endpoint.y - (this.y + 2*group.endpoint.y);
                }
                else {
                    link.endpoint.x = this.x;
                    link.endpoint.y = this.y;
                }
            }
        }
        this.actual_size += (this.size - this.actual_size) * .5;
        ellipse(this.x + (this.is_control ? group.endpoint.x : 0), this.y + (this.is_control ? group.endpoint.y : 0), this.actual_size, this.actual_size);
    }
}


class EndPoint {

    constructor(x, y, angle, strength) {

        this.x = x;
        this.y = y;
        this.angle = angle;
        this.strength = strength;
        this.generatePoints();
        this.link = null;
    }

    generatePoints() {

        this.endpoint = new Point(this.x, this.y, false);
        this.control_point = new Point(this.strength * Math.cos(this.angle), this.strength * Math.sin(this.angle), true);
    }

    display() {

        fill('#6524ff');
        noStroke();
        this.endpoint.display(this, this.link ? this.link : null);
        stroke('#6524ff');
        fill(0);
        this.control_point.display(this, this.link ? this.link : null);
    }
}


function createAsLink(link) {

    let endpoint = new EndPoint(0, 0, 0, 0);
    linkEndpoints(link, endpoint);
    return endpoint;
}


function linkEndpoints(a, b) {

    a.link = b;
    b.link = a;

    b.endpoint.x = a.endpoint.x;
    b.endpoint.y = a.endpoint.y;

    b.control_point.x = 2*b.endpoint.x - (a.control_point.x + 2*b.endpoint.x);
    b.control_point.y = 2*b.endpoint.y - (a.control_point.y + 2*b.endpoint.y);
}