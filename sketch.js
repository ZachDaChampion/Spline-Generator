let canvas = null;
let canvas_holder = null;
let card_holder = null;

let cards = [];
let tentative_strength = 250;

function setup() {

	canvas = createCanvas(windowHeight, windowHeight);
	
	canvas_holder = document.getElementById('canvas_holder');
	canvas_holder.style.width = windowHeight.toString() + "px";
	canvas_holder.style.height = windowHeight.toString() + "px";

	card_holder = document.getElementById('cards_holder');
	card_holder.style.width = (windowWidth - windowHeight - 4).toString() + "px";
	card_holder.style.height = windowHeight.toString() + "px";

	canvas.parent(canvas_holder);

	windowResized();
}

function draw() {
	
	background(0);

	beginShape();
	let p = generate_path();
	noFill();
	stroke(255);
	for (let i = 0; i < p.length; i++) {
		vertex(p[i].x, p[i].y);
	}
	endShape();

	if (path.length > 0 && mouseX < width) {
		beginShape();
		noFill();
		stroke(100);
		let s = generate_seg_from_pts(path[path.length - 1], new Point(mouseX, mouseY, 0, tentative_strength, tentative_strength));
		for (let i = 0; i < s.length; i++) {
			vertex(s[i].x, s[i].y);
		}
		endShape();
	}
}

function windowResized() {
	canvas.resize(windowHeight, windowHeight);
}

function mouseWheel(event) {

	if (mouseX < width) tentative_strength += event.delta;
}

function mouseClicked() {

	if (mouseX < width) {
		path.push(new Point(mouseX, mouseY, 0, tentative_strength, tentative_strength));
		let c = document.getElementById('card_template').content.cloneNode(true);
		c.querySelector('#title').innerText = 'Point ' + path.length;
		card_holder.appendChild(c);
		tentative_strength = 250;
	}
}
