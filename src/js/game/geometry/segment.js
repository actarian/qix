import Vector2 from "./vector2";

export default class Segment {

	get ax() {
		return this.a.x;
	}
	set ax(x) {
		this.a.x = x;
	}
	get ay() {
		return this.a.y;
	}
	set ay(y) {
		this.a.y = y;
	}
	get bx() {
		return this.b.x;
	}
	set bx(x) {
		this.b.x = x;
	}
	get by() {
		return this.b.y;
	}
	set by(y) {
		this.b.y = y;
	}

	constructor(ax = 0, ay = 0, bx = 0, by = 0) {
		this.a = new Vector2(ax, ay);
		this.b = new Vector2(bx, by);
	}

	draw() {
		drawSegment(this);
	}

	update() {
		this.draw();
	}

	bounce(s) {
		const i = this.intersect(s);
		if (i) {
			const r = this.reflect(i, s.b);
			const d = new Vector2(r.x - i.x, r.y - i.y).normalize();
			return { r, d };
		}
	}

	intersect(s) {
		const i = this.getIntersection(s);
		if (i && i.intersectA && i.intersectB) {
			return i;
		}
	}

	reflect(intersection, rayTip) {
		const n = this.normal();
		const v = new Vector2(
			rayTip.x - intersection.x,
			rayTip.y - intersection.y
		);
		const d = n.dot(v);
		const dotNormal = new Vector2(d * n.x, d * n.y);
		const reflection = new Vector2(
			rayTip.x - dotNormal.x * 2,
			rayTip.y - dotNormal.y * 2
		);
		// console.log(dotNormal, intersection, rayTip);
		return reflection;
		// console.log(direction);
	}

	normal(p) {
		const dx = this.b.x - this.a.x;
		const dy = this.b.y - this.a.y;
		// const n = new Vector2(-dy, dx); // then the normals are (-dy, dx) and (dy, -dx).
		const n = new Vector2(dy, -dx);
		return n.normalize();
	}

	vector(iX, iY, rayTipX, rayTipY) {
		const rayX = rayTipX - iX;
		const rayY = rayTipY - iY;
		return new Vector2(rayX, rayY);
	}

	getIntersection(s) {
		// if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
		let denominator,
			a,
			b,
			numerator1,
			numerator2,
			result = new Vector2();
		/*
		{
			x: null,
			y: null,
			intersectA: false,
			intersectB: false
		};
		*/
		denominator =
			(this.b.y - this.a.y) * (s.b.x - s.a.x) -
			(this.b.x - this.a.x) * (s.b.y - s.a.y);
		if (denominator === 0) {
			return result;
		}
		a = s.a.y - this.a.y;
		b = s.a.x - this.a.x;
		numerator1 = (this.b.x - this.a.x) * a - (this.b.y - this.a.y) * b;
		numerator2 = (s.b.x - s.a.x) * a - (s.b.y - s.a.y) * b;
		a = numerator1 / denominator;
		b = numerator2 / denominator;
		// if we cast these lines infinitely in both directions, they intersect here:
		result.x = s.a.x + a * (s.b.x - s.a.x);
		result.y = s.a.y + a * (s.b.y - s.a.y);
		/*
		// it is worth noting that this should be the same as:
		x = this.a.x + (b * (this.b.x - this.a.x));
		y = this.a.x + (b * (this.b.y - this.a.y));
		*/
		// if line1 is a segment and line2 is infinite, they intersect if:
		if (a > 0 && a < 1) {
			result.intersectA = true;
		}
		// if line2 is a segment and line1 is infinite, they intersect if:
		if (b > 0 && b < 1) {
			result.intersectB = true;
		}
		// if line1 and line2 are segments, they intersect if both of the above are true
		return result;
	}

	hit(actor, tolerance) {
		const hit = Segment.calcIsInsideThickLineSegment(actor.segment.b.x, actor.segment.b.y, this.ax, this.ay, this.bx, this.by, tolerance);
		if (hit) {
			return this;
		}
	}

	// The most useful function. Returns bool true, if the mouse point is actually inside the (finite) line, given a line thickness from the theoretical line away. It also assumes that the line end points are circular, not square.
	static calcIsInsideThickLineSegment(px, py, ax, ay, bx, by, tolerance = 0.1) {
		const L2 = ((bx - ax) * (bx - ax) + (by - ay) * (by - ay));
		if (L2 == 0) return false;
		const r = ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / L2;
		// Assume line thickness is circular
		if (r < 0) {
			// Outside a
			return (Math.sqrt((ax - px) * (ax - px) + (ay - py) * (ay - py)) <= tolerance);
		} else if ((0 <= r) && (r <= 1)) {
			// On the line segment
			var s = ((ay - py) * (bx - ax) - (ax - px) * (by - ay)) / L2;
			return (Math.abs(s) * Math.sqrt(L2) <= tolerance);
		} else {
			// Outside b
			return (Math.sqrt((bx - px) * (bx - px) + (by - py) * (by - py)) <= tolerance);
		}
	}

}
