let has_selected = false;
const splines = [];
var field;

function setup() {

	createCanvas(windowWidth, windowHeight);
	splines.push(
		new Spline(
			new EndPoint(50, 50, 0, 50),
			new EndPoint(150, 150, Math.PI, 50, false)
		)
	);

	field = loadImage('field.png');
}

function draw() {
	
	background(0);
	image(field, width/2-height/2, 0, height, height);
	background(0, 200);
	splines.forEach(spline => spline.display());
}

function keyTyped() {

	if (key == ' ') splines.push(
		new Spline(
			createAsLink(splines[splines.length - 1].end, true),
			new EndPoint(mouseX, mouseY, Math.PI, 50, true)
		)
	);

	if (key == 'r') splines.push(
		new Spline(
			createAsLink(splines[splines.length - 1].end, false),
			new EndPoint(mouseX, mouseY, Math.PI, 50, false)
		)
	);

	if (key == 'd') splines.pop();
}
