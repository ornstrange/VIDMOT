var width  = 1196,
		height = 466
var screenOffset = 50;

var strokeWidth = 10;

var draw = SVG('logo').size(width, height)

var logo = [
	init(draw.path('M228,114V366H0V0H114A114,114,0,0,1,228,114Z')),
	init(draw.path('M502,252V366H274V138H388A114,114,0,0,1,502,252Z')),
	init(draw.path('M822,114V366H594V0H708A114,114,0,0,1,822,114Z')),
	init(draw.path('M1096,0V366H868V114A114,114,0,0,1,982,0Z'))
]

function init(svg) {
	return svg.fill('#fff').translate(screenOffset, screenOffset).scale(0.98).style({
		'stroke-dasharray': svg.length(),
		'stroke-dashoffset': svg.length(),
		'stroke': '#000',
		'stroke-width': strokeWidth,
		'stroke-linecap': 'round',
	})
}

// logo.l1.animate(1500, '<>').style('stroke-dashoffset', 0);

logo.forEach( function(element, index) {
	element.animate(1000, '<>', 250*index).style( {'stroke-dashoffset': 0, 'stroke-width': 10 }).animate(100).fill("#000");
});