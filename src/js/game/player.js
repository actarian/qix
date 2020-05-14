import Segment from './geometry/segment';
import Vector2 from './geometry/vector2';
import { State } from './state';

export default class Player {

	get nx() {
		return this.position.x + this.direction.x * this.speed;
	}

	get ny() {
		return this.position.y + this.direction.y * this.speed;
	}

	constructor() {
		const ground = State.ground;
		this.position = new Vector2(ground.x(0.5), ground.y(1));
		this.direction = new Vector2(0, 0);
		this.speed = 5;
		this.segment = new Segment();
		this.active = false;
	}

	update() {
		this.checkDirection();
		this.move();
		this.draw();
	}

	draw() {
		// const ground = State.ground;
		const canvas = State.canvas;
		const diamond = State.resources.get(State.assets.diamond);
		/*
		const ctx = canvas.ctx;
		ctx.save();
		ctx.translate(this.position.x, this.position.y);
		if (this.getOrientation() === 1) {
			ctx.rotate(Math.PI / 2);
		}
		ctx.drawImage(diamond, -diamond.naturalWidth / 2 + 100, -diamond.naturalHeight / 2);
		ctx.restore();
		*/
		canvas.drawImage(diamond, this.position.x, this.position.y, 1, this.getOrientation() === 0 ? Math.PI / 2 : 0);
		/*
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
		ctx.stroke();
		ctx.fillStyle = "green";
		ctx.fill();
		*/
	}

	getOrientation() {
		let o = 0;
		if (this.currentSegment && (Math.abs(this.currentSegment.a.x - this.currentSegment.b.x) < 1)) {
			o = 1;
		}
		return o;
	}

	checkDirection() {
		this.active = State.keys.shift || State.keys.space;
		const direction = this.direction;
		if (State.keys.left) {
			direction.x = -1;
			direction.y = 0;
		} else if (State.keys.right) {
			direction.x = 1;
			direction.y = 0;
		} else if (State.keys.up) {
			direction.x = 0;
			direction.y = -1;
		} else if (State.keys.down) {
			direction.x = 0;
			direction.y = 1;
		} else {
			direction.x = 0;
			direction.y = 0;
		}
	}

	move() {
		const ground = State.ground;
		const cut = State.cut;
		let nx = this.nx;
		let ny = this.ny;
		const segment = this.segment;
		segment.a.set(this.position.x, this.position.y);
		segment.b.set(nx, ny);
		let hitted;
		if (this.active && (this.direction.x || this.direction.y)) {
			if (hitted = ground.hit(this, 3)) {
				if (hitted instanceof Segment && cut.segments.length) {
					// console.log('close');
					const i = hitted.getIntersection(this.segment);
					if (i && (i.intersectA || i.intersectB)) {
						this.position.x = i.x;
						this.position.y = i.y;
					}
					const segment = cut.segments[cut.segments.length - 1];
					segment.b.x = this.position.x;
					segment.b.y = this.position.y;
					this.lastSegment = hitted;
					this.currentSegment = hitted;
					this.direction.x = 0;
					this.direction.y = 0;
					// console.log('cut.segments.length', cut.segments.length);
					ground.remove(cut, this.firstSegment, this.lastSegment);
					State.onPlayerCut();
					cut.segments = [];
				} else {
					this.firstSegment = hitted;
					this.currentSegment = hitted;
				}
			} else if (cut.hitSegments(this, 3)) {
				cut.reset(this);
				this.direction.x = 0;
				this.direction.y = 0;
				State.onPlayerReset();
			} else if (!ground.willBeInside(this)) {
				// console.log('outside');
				this.direction.x = 0;
				this.direction.y = 0;
			} else {
				// console.log('segment');
				cut.move(this);
				this.currentSegment = cut.segments[cut.segments.length - 1];
			}
		} else {
			hitted = ground.hit(this, 3);
			if (hitted) {
				this.firstSegment = hitted;
				this.currentSegment = hitted;
			} else {
				this.direction.x = 0;
				this.direction.y = 0;
			}
		}
		this.position.x = this.nx;
		this.position.y = this.ny;
	}

}
