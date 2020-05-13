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
		const ground = State.ground;
		const canvas = State.canvas;
		const ctx = canvas.ctx;
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
		ctx.stroke();
		ctx.fillStyle = "green";
		ctx.fill();
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
			if (hitted = ground.hit(this, 2)) {
				console.log('hitted');
				if (hitted instanceof Segment && cut.segments.length) {
					const i = hitted.getIntersection(this.segment);
					if (i && (i.intersectA || i.intersectB)) {
						this.position.x = i.x;
						this.position.y = i.y;
					}
					const segment = cut.segments[cut.segments.length - 1];
					segment.b.x = this.position.x;
					segment.b.y = this.position.y;
					this.lastSegment = hitted;
					this.direction.x = 0;
					this.direction.y = 0;
					console.log('cut.segments.length', cut.segments.length);
					ground.remove(cut, this.firstSegment, this.lastSegment);
					cut.segments = [];
				}
			} else if (!ground.inside(this)) {
				console.log('outside');
				this.direction.x = 0;
				this.direction.y = 0;
			} else if (cut.hitSegments(this, 3)) {
				cut.reset(this);
				this.direction.x = 0;
				this.direction.y = 0;
			} else {
				cut.move(this);
			}
		} else {
			hitted = ground.hit(this, 3);
			if (hitted) {
				this.firstSegment = hitted;
			} else {
				this.direction.x = 0;
				this.direction.y = 0;
			}
		}
		this.position.x = this.nx;
		this.position.y = this.ny;
	}

}
