import Color from './color';
import Rect from './rect';

export const PainterColors = {
	/*
	black: new Color('0x111111'),
	white: new Color('0xffffff'),
	red: new Color('0xff0000'),
	blue: new Color('0x0000ff'),
	yellow: new Color('0xffff00'),
	cyan: new Color('0x00ffff'),
	purple: new Color('0xff00ff'),
	*/
	black: '0x14191e',
	white: '0xffffff',
	red: '0xF21500',
	green: '0x00d400',
	blueLight: '0x79ccf2',
	blue: '0x03a9f4',
	yellowLighter: '0xfffacc',
	yellowLight: '0xfff79a',
	greyLighter: '0xf8f8f8',
	greyLight: '0xeeeeee',
	greyMedium: '0xcccccc',
	grey: '0x90939b',
	map: '0x24292e',
};

export class Painter {

	constructor(canvas) {
		canvas = canvas || document.createElement('canvas');
		this.colors = Painter.colors;
		this.rect = new Rect();
		this.drawingRect = new Rect();
		this.setColors();
		this.setCanvas(canvas);
	}
	setColors() {
		var colors = this.colors;
		angular.forEach(PainterColors, function(value, key) {
			colors[key] = new Color(value).makeSet();
		});
	}
	setCanvas(canvas) {
		this.canvas = canvas;
		this.setSize(canvas.offsetWidth, canvas.offsetHeight);
		var ctx = canvas.getContext('2d');
		ctx.lineCap = 'square';
		this.ctx = ctx;
		return this;
	}
	setSize(w, h) {
		this.canvas.width = w;
		this.canvas.height = h;
		this.rect.w = w;
		this.rect.h = h;
		return this;
	}
	copy(canvas) {
		this.ctx.drawImage(canvas, 0, 0);
		return this;
	}
	clear() {
		this.resize();
		// this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		return this;
	}
	resize() {
		this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
		return this;
	}
	setText(font, align, verticalAlign, color) {
		font = font || '11px monospace';
		align = align || 'center';
		verticalAlign = verticalAlign || 'middle';
		color = color || this.colors.black;
		var ctx = this.ctx;
		ctx.font = font;
		ctx.textAlign = align;
		ctx.textBaseline = verticalAlign;
		ctx.fillStyle = color.toRgba();
		return this;
	}
	setFill(color) {
		color = color || this.colors.black;
		var ctx = this.ctx;
		/*
		var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
		my_gradient.addColorStop(0, "black");
		my_gradient.addColorStop(1, "white");
		ctx.fillStyle = my_gradient;
		*/
		ctx.fillStyle = color.toRgba();
		return this;
	}
	setStroke(color, size) {
		color = color || this.colors.black;
		var ctx = this.ctx;
		size = size || 1;
		/*
		var gradient=ctx.createLinearGradient(0,0,170,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		ctx.strokeStyle = gradient;
		*/
		// Fill with gradient
		ctx.strokeStyle = color.toRgba();
		ctx.lineWidth = size;
		return this;
	}
	/*
	drawRoundRect (rect, r) {
	    rect = rect || this.rect;
	    Shape.roundRect(this, rect, r);
	    return this;
	}
	*/
	fillText(text, point, width, post, maxLength) {
		if (width) {
			post = post || '';
			maxLength = maxLength || Math.floor(width / 8);
			if (text.length > maxLength) {
				text = text.substr(0, Math.min(text.length, maxLength)).trim() + post;
			}
		}
		this.ctx.fillText(text, point.x, point.y);
		return this;
	}
	fillRect(rect) {
		rect = rect || this.rect;
		var ctx = this.ctx,
			x = rect.x,
			y = rect.y,
			w = rect.w,
			h = rect.h;
		ctx.fillRect(x, y, w, h);
		return this;
	}
	strokeRect(rect) {
		rect = rect || this.rect;
		var ctx = this.ctx,
			x = rect.x,
			y = rect.y,
			w = rect.w,
			h = rect.h;
		ctx.strokeRect(x, y, w, h);
		return this;
	}
	fill() {
		this.ctx.fill();
		return this;
	}
	stroke() {
		this.ctx.stroke();
		return this;
	}
	begin() {
		this.ctx.beginPath();
		return this;
	}
	close() {
		this.ctx.closePath();
		return this;
	}
	save() {
		this.ctx.save();
		return this;
	}
	restore() {
		this.ctx.restore();
		return this;
	}
	rotate(angle) {
		this.ctx.rotate(angle * Math.PI / 180);
	}
	translate(xy) {
		this.ctx.translate(xy.x, xy.y);
	}
	toDataURL() {
		return this.canvas.toDataURL();
	}
	draw(image, t, pre) {
		if (image) {
			t.w = t.w || image.width;
			t.h = t.h || image.height;
			var ctx = this.ctx,
				rect = this.drawingRect,
				x = rect.x = t.x - t.w / 2,
				y = rect.y = t.y - t.h / 2,
				w = rect.w = t.w,
				h = rect.h = t.h;
			ctx.save();
			ctx.translate(x, y);
			pre ? pre.call(this) : null;
			ctx.drawImage(image, 0, 0);
			ctx.restore();
			// console.log('painter.draw', x, y, w, h);
		}
		return this;
	}
	drawRect(image, s, t, pre) {
		if (image) {
			s.w = s.w || image.width;
			s.h = s.h || image.height;
			t.w = t.w || image.width;
			t.h = t.h || image.height;
			var ctx = this.ctx,
				rect = this.drawingRect,
				x = rect.x = t.x - s.w / 2,
				y = rect.y = t.y - s.h / 2,
				w = rect.w = t.w,
				h = rect.h = t.h;
			ctx.save();
			ctx.translate(x, y);
			pre ? pre.call(this) : null;
			ctx.drawImage(image, s.x, s.y, s.w, s.h, 0, 0, t.w, t.h);
			ctx.restore();
			// console.log('painter.drawRect', x, y, w, h);
		}
		return this;
	}
	flip(scale) {
		scale = scale || { x: 1, y: -1 };
		var ctx = this.ctx,
			rect = this.drawingRect;
		ctx.translate(scale.x === -1 ? rect.w : 0, scale.y === -1 ? rect.h : 0);
		ctx.scale(scale.x, scale.y);
	}
}
Painter.colors = {};
Object.keys(PainterColors).forEach((key) => {
	Painter.colors[key] = new Color(PainterColors[key]).makeSet();
});
