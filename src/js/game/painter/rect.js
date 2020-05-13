export default class Rect {
	constructor(x, y, w, h) {
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 0;
		this.h = h || 0;
	}
	static mult(rect, value) {
		rect.x *= value;
		rect.y *= value;
		rect.w *= value;
		rect.h *= value;
		return rect;
	}
	mult(value) {
		return Rect.mult(this, value);
	}
	offset(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}
	reduce(size) {
		return this.offset(-size);
	}
	reduceRect(rect) {
		return this.offsetRect(Rect.mult(rect, -1));
	}
	expandRect(rect) {
		this.x -= rect.x || 0;
		this.y -= rect.y || 0;
		this.w += rect.w || 0;
		this.h += rect.h || 0;
		return this;
	}
	expand(size) {
		return this.expandRect({ x: size, y: size, w: size * 2, h: size * 2 });
	}
	intersect(rect) {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return !(rect.x > x + w || rect.x + rect.w < x || rect.y > y + h || rect.y + rect.h < y);
	}
	top() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x + w / 2, y: y };
	}
	right() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x + w, y: y + h / 2 };
	}
	bottom() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x + w / 2, y: y + h };
	}
	left() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x, y: y + h / 2 };
	}
	center() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x + w / 2, y: y + h / 2 };
	}
	topLeft() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x, y: y };
	}
	topRight() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x + w, y: y };
	}
	bottomRight() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x + w, y: y + h };
	}
	bottomLeft() {
		var x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;
		return { x: x, y: y + h };
	}
	setX(x) {
		this.x = x;
		return this;
	}
	setY(y) {
		this.y = y;
		return this;
	}
	setW(w) {
		this.w = w;
		return this;
	}
	setH(h) {
		this.h = h;
		return this;
	}
	setPos(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
	setSize(w, h) {
		this.w = w;
		this.h = h;
		return this;
	}
	copy(rect) {
		this.x = rect.x;
		this.y = rect.y;
		this.w = rect.w;
		this.h = rect.h;
		return this;
	}
	clone() {
		return new Rect(this.x, this.y, this.w, this.h);
	}
	toString() {
		return '{' + this.x + ',' + this.y + ',' + this.w + ',' + this.h + '}';
	}
}
