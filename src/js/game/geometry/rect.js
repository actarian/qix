export default class Rect {

	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.set();
	}

	set() {
		this.top = this.y;
		this.left = this.x;
		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
		this.setCenter();
	}

	static contains(rect, left, top) {
		return rect.top <= top && top <= rect.bottom && rect.left <= left && left <= rect.right;
	}

	static intersectRect(r1, r2) {
		return !(r2.left > r1.right ||
			r2.right < r1.left ||
			r2.top > r1.bottom ||
			r2.bottom < r1.top);
	}

	static fromNode(node) {
		if (!node) {
			return;
		}
		const rect = node.rect_ || (node.rect_ = new Rect());
		const rects = node.getClientRects();
		if (!rects.length) {
			// console.log(rects, node);
			return rect;
		}
		const boundingRect = node.getBoundingClientRect();
		// rect.top: boundingRect.top + defaultView.pageYOffset,
		// rect.left: boundingRect.left + defaultView.pageXOffset,
		rect.x = boundingRect.left;
		rect.y = boundingRect.top;
		rect.top = boundingRect.top;
		rect.left = boundingRect.left;
		rect.width = boundingRect.width;
		rect.height = boundingRect.height;
		rect.right = rect.left + rect.width;
		rect.bottom = rect.top + rect.height;
		rect.setCenter();
		return rect;
	}

	setSize(w, h) {
		this.width = w;
		this.height = h;
		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
		this.setCenter();
		// console.log(w, h);
	}

	setCenter() {
		const center = this.center || (this.center = {});
		center.top = this.top + this.height / 2;
		center.left = this.left + this.width / 2;
		center.x = center.left;
		center.y = center.top;
	}

	contains(left, top) {
		return Rect.contains(this, left, top);
	}

	intersect(rect) {
		return Rect.intersectRect(this, rect);
	}

	intersection(rect) {
		const intersection = this.intersection_ || (this.intersection_ = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			x: 0,
			y: 0,
			pow: {
				x: -1,
				y: -1
			},
			offset: function(offset) {
				offset = offset || 0;
				const pow = (this.top - this.rect.height / 2 + offset) / -this.height;
				return pow;
			},
			scroll: function(offset) {
				offset = offset || 0;
				const pow = (this.top - this.rect.height / 2 + offset) / -this.height;
				return pow;
			}
		});
		intersection.left = this.left;
		intersection.top = this.top;
		intersection.width = this.width;
		intersection.height = this.height;
		intersection.x = this.left + this.width / 2;
		intersection.y = this.top + this.height / 2;
		intersection.rect = rect;
		const pow = intersection.offset(0);
		intersection.pow.y = pow;
		return intersection;
	}

}
