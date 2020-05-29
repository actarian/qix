import Polygon from './geometry/polygon';
import Segment from './geometry/segment';
import Vector2 from './geometry/vector2';
import { State } from './state';

export default class Cut extends Polygon {

	constructor() {
		super();
		this.direction = new Vector2();
		this.start = new Vector2();
		this.end = new Vector2();
	}

	move(actor) {
		let segment;
		if (!this.segments.length) {
			this.start.copy(actor.position);
			segment = new Segment(actor.position.x, actor.position.y, actor.nx, actor.ny);
			this.segments.push(segment);
		} else if (Math.abs(this.direction.x) !== Math.abs(actor.direction.x)) { // direction changed
			const s = this.segments[this.segments.length - 1];
			segment = new Segment(s.b.x, s.b.y, actor.nx, actor.ny);
			this.segments.push(segment);
		} else {
			segment = this.segments[this.segments.length - 1];
			segment.b.x = actor.nx;
			segment.b.y = actor.ny;
		}
		this.end.x = segment.b.x;
		this.end.y = segment.b.y;
		this.direction.x = actor.direction.x;
		this.direction.y = actor.direction.y;
	}

	close() {
		this.segments = [];
	}

	reset() {
		this.direction.x = 0;
		this.direction.y = 0;
		this.segments = [];
	}

	draw() {
		const canvas = State.canvas;
		const ctx = canvas.ctx;
		ctx.beginPath();
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
		ctx.lineWidth = "7";
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.lineWidth = "3";
		ctx.strokeStyle = "white";
		ctx.stroke();
	}

}
