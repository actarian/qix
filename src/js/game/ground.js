import Polygon from './polygon';
import Rect from './rect';
import Segment from './segment';
import { State } from './state';

export default class Ground extends Polygon {

	constructor() {
		super();
		const canvas = State.canvas;
		this.rect = new Rect(20, 20, canvas.size.x - 40, canvas.size.y - 40);
		this.init();
	}

	init() {
		const rect = this.rect;
		this.segments = [
			new Segment(rect.left, rect.top, rect.right, rect.top), // top
			new Segment(rect.right, rect.top, rect.right, rect.bottom), // right
			new Segment(rect.right, rect.bottom, rect.left, rect.bottom), // bottom
			new Segment(rect.left, rect.bottom, rect.left, rect.top), // left
		];
	}

	remove(polygon) {
		if (polygon.segments.length) {
			const i1 = this.segments.reduce((p, c, i) => {
				const s = polygon.segments[0];
				const m = c.getIntersection(s);
				if (m && (m.intersectA)) {
					console.log('i1', i);
					s.a.x = m.x;
					s.a.y = m.y;
					return i;
				} else {
					return p;
				}
			}, -1);
			const i2 = this.segments.reduce((p, c, i) => {
				const s = polygon.segments[polygon.segments.length - 1];
				const m = c.getIntersection(s);
				if (m && (m.intersectA)) {
					console.log('i2', i);
					s.b.x = m.x;
					s.b.y = m.y;
					return i;
				} else {
					return p;
				}
			}, -1);
			if (i1 !== -1 && i2 !== -1) {
				console.log('close!', i1, i2);
				const cutPoints = polygon.getPoints(true);
				console.log('cutPoints.length', cutPoints.length, polygon.segments.length);
				const min = Math.min(i1, i2);
				const max = Math.max(i1, i2);
				const points = [];
				for (let i = 0; i <= min; i++) {
					const s = this.segments[i];
					points.push(s.a);
				}
				const first = cutPoints[0];
				const last = cutPoints[cutPoints.length - 1];
				if (last.distanceTo(points[points.length - 1]) < first.distanceTo(points[points.length - 1])) {
					cutPoints.reverse();
				}
				points.push.apply(points, cutPoints);
				for (let i = max + 1; i < this.segments.length; i++) {
					const s = this.segments[i];
					points.push(s.a);
				}
				points.push(points[0]);
				this.rebuild(points);
			}
		}
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

	x(x) {
		return this.rect.left + x * this.rect.width;
	}

	y(y) {
		return this.rect.top + y * this.rect.height;
	}

}
