SVG.on(document, 'DOMContentLoaded', function() {

	window.onmousemove = logMouseMove;

    var colors = [
        ["#fafeff", "#111315"],
        ["#111315", "#fafeff"],
        ["#f12300", "#111315"],
        ["#111315", "#f12300"]
    ];

	var mousePos;
	var mouseHist = [];
    var ballLen = 50
    var ballW = 50;
    var balls = new Array(ballLen);
    var fps = 60;

	function logMouseMove(event) {
		var e = event || window.event;
		mousePos = { x: e.clientX, y: e.clientY };
        addToHist(mousePos);
	}

    function addToHist(o) {
        if (mouseHist.length < ballLen) {
            mouseHist.unshift(o);
        } else {
            mouseHist.pop();
            mouseHist.unshift(o)
        }
    }

	var w = window.innerWidth;
	var h = window.innerHeight;

    var rgbToHex = function (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    var draw = SVG('mouseTrail').size(w, h);
	//    rect = draw.ellipse(ballW, ballW).attr({ fill: '#fafeff', strokeWidth: '0' });
    for (let i = balls.length - 1; i >= 0 ; i--) {
        let op = 1 - (i / (ballLen - 1));
        //let op = 1;
        /*
        let col = '#fa';
        col += rgbToHex(Math.floor(Math.random()*110) + 50);
        col += '2a';
        */
        let col = '#fafeff';
        balls[i] = draw.ellipse(
            ballW * (1 - (i/(ballLen - 1))) + 40,
            ballW * (1 - (i/(ballLen - 1))) + 40).attr({ strokeWidth: '0' });
        balls[i].fill({ color: col, opacity: op });
        // balls[i].filter(function(add) {
        //       add.gaussianBlur(4)
        // });
    }

	function mouseTrack() {
		if (mousePos !== undefined) {
            // rect.move(mousePos.x - ballW/2, mousePos.y - ballW/2);
            for (let i = 0; i < balls.length; i++) {
                let _mouseHist = mouseHist[i];
                if (_mouseHist !== undefined) {
                    let newX = mouseHist[i].x - balls[i].node.attributes.rx.nodeValue,
                        newY = mouseHist[i].y - balls[i].node.attributes.ry.nodeValue;
                    balls[i].move(newX, newY);
                }
            }
        }
	};

    balls[0].animate(5000, '<>', 1000).move(1000, 1000);

    window.setInterval(function() {
        mouseHist.pop();
        mouseHist.unshift(mouseHist[0]);
    }, 15);
    window.setInterval(mouseTrack, 5);
})
