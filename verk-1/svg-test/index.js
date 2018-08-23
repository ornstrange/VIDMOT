SVG.on(document, 'DOMContentLoaded', function() {

	window.onmousemove = logMouseMove;

	var mousePos;

	function logMouseMove(event) {
		var e = event || window.event;
		mousePos = { x: e.clientX, y: e.clientY };
	}

	var w = window.innerWidth;
	var h = window.innerHeight;

	var ballW = 120;

  var draw = SVG('mouseTrail').size(w, h),
			rect = draw.ellipse(ballW, ballW).attr({ fill: '#fafeff', strokeWidth: '0' });

	function mouseTrack() {
		rect.move(mousePos.x - ballW/2, mousePos.y - ballW/2);
	};

	window.setInterval(mouseTrack, 5);
})