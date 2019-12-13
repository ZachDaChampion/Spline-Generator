let has_selected = false;
const splines = [];

function setup() {

	createCanvas(windowWidth, windowHeight);
	splines.push(
		new Spline(
			new EndPoint(50, 50, 0, 50),
			new EndPoint(150, 150, Math.PI, 50)
		)
	);
}

function draw() {
	
	background(0);
	splines.forEach(spline => spline.display());
}

function keyTyped() {

	if (key == ' ') splines.push(
		new Spline(
			createAsLink(splines[splines.length - 1].end),
			new EndPoint(mouseX, mouseY, Math.PI, 50)
		)
	);
}
