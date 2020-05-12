import PolyBool from 'polybooljs';
import Segment from './segment';
import { State } from './state';

export default class Polygon {

	constructor(points) {
		this.segments = [];
		if (points && points.length > 1) {
			points.forEach((p, i) => {
				if (i < points.length - 2) {
					this.segments.push(new Segment(p[0], p[1], points[i + 1][0], points[i + 1][1]));
				}
			});
		}
	}

	boolean(points) {
		const poly1 = { regions: [this.getPoints().map(p => [p.x, p.y])] };
		// const poly2 = { regions: [polygon.getPoints().map(p => [p.x, p.y])] };
		const poly2 = { regions: [points] };
		const operation = PolyBool.difference(poly1, poly2); // poly1 - poly2
		console.log('segments', this.segments);
		const segments = [];
		operation.regions.forEach(points => {
			points.forEach((p, i) => {
				if (i < points.length - 2) {
					segments.push(new Segment(p[0], p[1], points[i + 1][0], points[i + 1][1]));
				} else {
					segments.push(new Segment(p[0], p[1], points[0][0], points[0][1]));
				}
			});
		});
		this.segments = segments;
		console.log('segments', segments);
	}

	rebuild(points) {
		const segments = [];
		for (let i = 0; i < points.length - 1; i++) {
			const p = points[i];
			segments.push(new Segment(p.x, p.y, points[i + 1].x, points[i + 1].y));
		}
		this.segments = segments;
		console.log('segments', segments);
	}

	hit(actor, tolerance) {
		return this.segments.reduce((p, c) => {
			return p || c.hit(actor, tolerance);
		}, false);
	}

	hitSegments(actor, tolerance) {
		for (let i = 0; i < this.segments.length - 1; i++) {
			const s = this.segments[i].hit(actor, tolerance);
			if (s) {
				return s;
			}
		}
	}

	intersect(actor) {
		return this.segments.reduce((p, c) => {
			return p || c.intersect(actor.segment);
		}, false);
	}

	inside(actor) {
		const points = this.getPoints();
		return this.isPointInside(actor.segment.b, points);
	}

	bounce(segment) {
		for (let i = 0; i < this.segments.length; i++) {
			const bounce = this.segments[i].bounce(segment);
			if (bounce) {
				return bounce;
			}
		}
	}

	update() {
		this.draw();
	}

	draw() {
		const canvas = State.canvas;
		const ctx = canvas.ctx;
		ctx.beginPath();
		ctx.lineWidth = "5";
		ctx.strokeStyle = "green";
		ctx.fillStyle = "black";
		const t = this.segments.length;
		for (let i = 0; i < t; i++) {
			const s = this.segments[i];
			if (i === 0) {
				ctx.moveTo(s.a.x, s.a.y);
			} else {
				ctx.lineTo(s.a.x, s.a.y);
			}
			if (i === t - 1) {
				ctx.lineTo(s.b.x, s.b.y);
			}
		}
		ctx.stroke();
		ctx.fill();
	}

	getPoints(closed) {
		const points = [];
		for (let i = 0; i < this.segments.length; i++) {
			const s = this.segments[i];
			points.push(s.a);
		}
		if (this.segments.length && closed) {
			points.push(this.segments[this.segments.length - 1].b);
		}
		return points;
	}

	isPointInside(p, points) {
		let inside = false;
		let minX = points[0].x,
			maxX = points[0].x;
		let minY = points[0].y,
			maxY = points[0].y;
		for (let n = 1; n < points.length; n++) {
			const q = points[n];
			minX = Math.min(q.x, minX);
			maxX = Math.max(q.x, maxX);
			minY = Math.min(q.y, minY);
			maxY = Math.max(q.y, maxY);
		}
		if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
			return false;
		}
		let i = 0,
			j = points.length - 1;
		for (i, j; i < points.length; j = i++) {
			if ((points[i].y > p.y) != (points[j].y > p.y) && p.x < (points[j].x - points[i].x) * (p.y - points[i].y) / (points[j].y - points[i].y) + points[i].x) {
				inside = !inside;
			}
		}
		return inside;
	}

}
