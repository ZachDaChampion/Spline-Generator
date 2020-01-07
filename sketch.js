let canvas = null;
let canvas_holder = null;
let card_holder = null;

let cards = [];
let tentative_strength = 250;
let tentative_angle = 0;

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

	let p = generate_path(false);
	noFill();
	for (let seg = 0; seg < p.length; seg++) {
		if ((selected_index === null && mouseX < width) || seg === int(selected_index) || seg === int(selected_index -1)) stroke(255);
		else stroke(64);
		beginShape();
		for (let i = 0; i < p[seg].length; i++) {
			vertex(p[seg][i].x, p[seg][i].y);
		}
		endShape();
	}

	if (path.length > 0 && mouseX < width) {
		beginShape();
		noFill();
		stroke(100);
		let s = generate_seg_from_pts(path[path.length - 1], new Point(mouseX, mouseY, tentative_angle, tentative_strength, tentative_strength));
		for (let i = 0; i < s.length; i++) {
			vertex(s[i].x, s[i].y);
		}
		endShape();
	}

	if (mouseX < width) noCursor();
	else cursor(ARROW);

	stroke(255);
	fill(0);
	push();
	translate(mouseX, mouseY);
	rotate(tentative_angle);
	line(-10, 0, 10, 0);
	ellipse(0, 0, 5);
	pop();
	if (selected_index != null) ellipse(int(path[selected_index].x), int(path[selected_index].y), 10);
}

function windowResized() {
	canvas.resize(windowHeight, windowHeight);
}

function mouseWheel(event) {

	if (mouseX < width) {
		if (keyIsDown(CONTROL)) tentative_strength += event.delta;
		else tentative_angle += event.delta / 250;
	}
}

function mouseClicked() {

	if (mouseX < width) {
		path.push(new Point(mouseX, mouseY, tentative_angle, tentative_strength, tentative_strength));
		let c = document.getElementById('card_template').content.cloneNode(true);

		c.querySelector('#title').innerText = 'Point ' + path.length;
		c.querySelector('#x').value = mouseX;
		c.querySelector('#y').value = mouseY;
		c.querySelector('#card_container').setAttribute('data-index', '' + (path.length - 1));
		
		card_holder.appendChild(c);
		tentative_strength = 250;
		tentative_angle = 0;
	}
}


// window.onerror = function(msg, url, linenumber) {
//     alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
//     return true;
// }
