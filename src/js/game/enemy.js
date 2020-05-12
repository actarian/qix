import Segment from './segment';
import { State } from './state';
import Vector2 from './vector2';

export default class Enemy {

	get nx() {
		return this.position.x + this.direction.x * this.speed;
	}

	get ny() {
		return this.position.y + this.direction.y * this.speed;
	}

	constructor() {
		const ground = State.ground;
		this.position = new Vector2(ground.x(0.5), ground.y(0.5));
		this.direction = new Vector2(0.5 + Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1), 0.5 + Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1)).normalize();
		this.speed = 3 + Math.random() * 2;
		this.segment = new Segment();
	}

	update() {
		if (!this.checkCollision()) {
			this.move();
		}
		this.draw();
	}

	draw() {
		const canvas = State.canvas;
		const ctx = canvas.ctx;
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
		ctx.stroke();
		ctx.fillStyle = "red";
		ctx.fill();
	}

	checkCollision() {
		const ground = State.ground;
		const cut = State.cut;
		const nx = this.nx;
		const ny = this.ny;
		const segment = this.segment;
		segment.a.set(this.position.x, this.position.y);
		segment.b.set(nx, ny);
		if (cut.hit(this, 5)) {
			const player = State.player;
			cut.reset(player);
		} else {
			const bounce = ground.bounce(segment);
			if (bounce) {
				// this.position.copy(bounce.r);
				// this.direction.x *= -1;
				// this.direction.y *= -1;
				this.direction.copy(bounce.d);
			}
			return bounce;
		}
	}

	move() {
		this.position.x = this.nx;
		this.position.y = this.ny;
	}

}
