var width  = window.innerWidth,
		height = window.innerHeight

var draw = SVG('main').size(width, height)

var door = {
	frameOuter: draw.rect(300, 500).translate(width/2 - 150, height - 500),
	frameInner: draw.rect(260, 480).fill('#fff').translate(width/2 - 130, height - 480),
	door: draw.polygon('0,0 252,0 252,476 0,476').translate(width/2 - 126, height - 476)
}
