import Polygon from './geometry/polygon';
import Rect from './geometry/rect';
import Segment from './geometry/segment';
import { State } from './state';

export default class Ground extends Polygon {

	constructor() {
		super();
		const canvas = State.canvas;
		this.rect = new Rect(50, 50, canvas.size.x - 100, canvas.size.y - 100);
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
		State.totalArea = this.getArea();
		// console.log('State.totalArea', State.totalArea);
	}

	remove(polygon, firstSegment, lastSegment) {
		if (polygon.segments.length) {
			const cutPoints = polygon.getPoints(true);
			const isClockWise = firstSegment === lastSegment && polygon.IsClockwise(cutPoints.slice());
			const forwardPoints = this.getForwardPoints(cutPoints, firstSegment, lastSegment, isClockWise);
			const backwardPoints = this.getBackwardPoints(cutPoints, firstSegment, lastSegment, isClockWise);
			const a1 = this.getAreaFromPoints(forwardPoints);
			const a2 = this.getAreaFromPoints(backwardPoints);
			if (a1 > a2) {
				this.rebuild(forwardPoints);
			} else {
				this.rebuild(backwardPoints);
			}
		}
	}

	getForwardPoints(cutPoints, firstSegment, lastSegment, isClockWise) {
		let s1, s2;
		if (isClockWise) {
			cutPoints.reverse();
			s1 = lastSegment;
			s2 = firstSegment;
		} else {
			s1 = firstSegment;
			s2 = lastSegment;
		}
		const i1 = this.segments.indexOf(s1);
		const i2 = this.segments.indexOf(s2);
		const points = [s1.a];
		points.push.apply(points, cutPoints);
		const from = i2 + 1;
		const to = i1;
		const t = this.segments.length;
		for (let j = from; j < from + t; j++) {
			const i = j % t;
			points.push(this.segments[i].a);
			if (i === to) {
				break;
			}
		}
		return points;
	}

	getBackwardPoints(cutPoints, firstSegment, lastSegment, isClockWise) {
		let s1, s2;
		if (isClockWise) {
			s1 = lastSegment;
			s2 = firstSegment;
		} else {
			cutPoints.reverse();
			s1 = firstSegment;
			s2 = lastSegment;
		}
		const i1 = this.segments.indexOf(s1);
		const i2 = this.segments.indexOf(s2);
		const points = cutPoints.slice();
		if (i1 !== i2) {
			const from = i1;
			const to = i2;
			const t = this.segments.length;
			for (let j = from; j < from + t; j++) {
				const i = j % t;
				if (i === to) {
					break;
				}
				points.push(this.segments[i].b);
			}
		}
		points.push(points[0]);
		return points;
	}

	draw() {
		const canvas = State.canvas;
		const ctx = canvas.ctx;
		const packaging = State.resources.get(State.assets.packaging);
		ctx.drawImage(packaging, 0, 0, packaging.naturalWidth, packaging.naturalHeight, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		ctx.lineWidth = "3";
		ctx.strokeStyle = "black";
		if (!State.ended) {
			ctx.beginPath();
			const t = this.segments.length;
			for (let i = 0; i < t; i++) {
				const s = this.segments[i];
				if (i === 0) {
					ctx.moveTo(s.a.x, s.a.y);
				} else {
					ctx.lineTo(s.a.x, s.a.y);
				}
				/*
				if (i === t - 1) {
					ctx.lineTo(s.b.x, s.b.y);
				}
				*/
			}
			ctx.closePath();
			ctx.save();
			ctx.clip();
			const designer = State.resources.get(State.assets.designer);
			ctx.drawImage(designer, 0, 0, designer.naturalWidth, designer.naturalHeight, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
			ctx.restore();
			ctx.stroke();
		}
		ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		// ctx.fill();
	}

	x(x) {
		return this.rect.left + x * this.rect.width;
	}

	y(y) {
		return this.rect.top + y * this.rect.height;
	}

	/*
	remove_b(polygon, firstSegment, lastSegment) {
		if (polygon.segments.length) {
			const cutPoints = polygon.getPoints(true);
			let checkPoints = cutPoints.slice();
			if (checkPoints.length === 2) {
				const last = checkPoints[checkPoints.length - 1];
				if (lastSegment.a.distanceTo(last) < lastSegment.b.distanceTo(last)) {
					checkPoints.push(lastSegment.a);
				} else {
					checkPoints.push(lastSegment.b);
				}
			}
			const isClockWise = polygon.IsClockwise(checkPoints);
			let s1, s2;
			if (isClockWise) {
				cutPoints.reverse();
				s1 = lastSegment;
				s2 = firstSegment;
			} else {
				s1 = firstSegment;
				s2 = lastSegment;
			}
			const i1 = this.segments.indexOf(s1);
			const i2 = this.segments.indexOf(s2);
			// console.log(s1, s2);
			// console.log('close!', i1, i2);
			// console.log('cutPoints.length', cutPoints.length, polygon.segments.length);
			const points = [s1.a];
			points.push.apply(points, cutPoints);
			const from = i2 + 1;
			const to = i1; // i1 === i2 ? i1 + 1 : i1;
			const t = this.segments.length;
			console.log(from, to, i1, i2, t, isClockWise);
			for (let j = from; j < from + t; j++) {
				const i = j % t;
				points.push(this.segments[i].a);
				if (i === to) {
					break;
				}
			}
			this.rebuild(points);
		}
	}

	remove_c(polygon, firstSegment, lastSegment) {
		if (polygon.segments.length) {
			// console.log(firstSegment, lastSegment);
			const i1 = this.segments.indexOf(firstSegment);
			const i2 = this.segments.indexOf(lastSegment);
			if (i1 !== -1 && i2 !== -1) {
				// console.log('close!', i1, i2);
				const cutPoints = polygon.getPoints(true);
				// console.log('cutPoints.length', cutPoints.length, polygon.segments.length);
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
	*/
}
