export default class Shape {
	static shapeCircle(p, cx, cy, r, sa, ea) {
		sa = sa || 0;
		ea = ea || 2 * Math.PI;
		p.ctx.arc(cx, cy, r, sa, ea, false);
	}
	static shapeStar(p, cx, cy, or, ir, steps) {
		var x, y;
		var angle = Math.PI / 2 * 3;
		var step = Math.PI / steps;
		var ctx = p.ctx;
		ctx.moveTo(cx, cy - or);
		for (var i = 0; i < steps; i++) {
			x = cx + Math.cos(angle) * or;
			y = cy + Math.sin(angle) * or;
			ctx.lineTo(x, y);
			angle += step;
			x = cx + Math.cos(angle) * ir;
			y = cy + Math.sin(angle) * ir;
			ctx.lineTo(x, y);
			angle += step;
		}
		ctx.lineTo(cx, cy - or);
	}
	static shapeRoundRect(p, rect, r) {
		var ctx = p.ctx,
			x = rect.x,
			y = rect.y,
			w = rect.w,
			h = rect.h;
		if (typeof r === undefined) {
			r = 4;
		}
		if (typeof r === 'number') {
			r = { tl: r, tr: r, br: r, bl: r };
		} else {
			var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
			for (var p in defaultRadius) {
				r[p] = r[p] || defaultRadius[p];
			}
		}
		ctx.moveTo(x + r.tl, y);
		ctx.lineTo(x + w - r.tr, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
		ctx.lineTo(x + w, y + h - r.br);
		ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
		ctx.lineTo(x + r.bl, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
		ctx.lineTo(x, y + r.tl);
		ctx.quadraticCurveTo(x, y, x + r.tl, y);
	}
	static circle() {
		var params = Array.prototype.slice.call(arguments);
		var ctx = params[0].ctx;
		ctx.beginPath();
		Shape.shapeCircle.apply(this, params);
		ctx.closePath();
	}
	static star() {
		var params = Array.prototype.slice.call(arguments);
		var ctx = params[0].ctx;
		ctx.beginPath();
		Shape.shapeStar.apply(this, params);
		ctx.closePath();
	}
	static roundRect() {
		var params = Array.prototype.slice.call(arguments);
		var ctx = params[0].ctx;
		ctx.beginPath();
		Shape.shapeRoundRect.apply(this, params);
		ctx.closePath();
	}
}
