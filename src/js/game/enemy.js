import Segment from './geometry/segment';
import Vector2 from './geometry/vector2';
import { State } from './state';

export default class Enemy {

	get nx() {
		return this.position.x + this.direction.x * this.speed;
	}

	get ny() {
		return this.position.y + this.direction.y * this.speed;
	}

	constructor() {
		this.position = new Vector2();
		this.getRandomPosition();
		/*
		if (State.enemies && State.enemies.length) {
			this.getRandomPosition();
		} else {
			this.getCenterPosition();
		}
		*/
		this.getRandomDirection();
		this.speed = 3; // 2 + Math.random() * 2;
		this.segment = new Segment();
	}

	getCenterPosition() {
		const ground = State.ground;
		this.position.x = ground.x(0.5);
		this.position.y = ground.y(0.5);
	}

	getRandomPosition() {
		const ground = State.ground;
		this.position.x = ground.x(Math.random());
		this.position.y = ground.y(Math.random());
		if (!ground.isInside(this)) {
			this.getRandomPosition();
		}
	}

	getRandomDirection() {
		this.direction = new Vector2(0.5 + Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1), 0.5 + Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1)).normalize();
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
		const mouth = State.resources.get(State.assets.mouth);
		ctx.drawImage(mouth, this.position.x - mouth.naturalWidth / 2, this.position.y - mouth.naturalHeight / 2);
		/*
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
		ctx.stroke();
		ctx.fillStyle = "red";
		ctx.fill();
		*/
	}

	checkCollision() {
		const ground = State.ground;
		const cut = State.cut;
		const nx = this.nx;
		const ny = this.ny;
		const mouth = State.resources.get(State.assets.mouth);
		const segment = this.segment;
		segment.a.set(this.position.x, this.position.y);
		segment.b.set(
			this.position.x + this.direction.x * (mouth.naturalHeight / 2 + this.speed),
			this.position.y + this.direction.y * (mouth.naturalHeight / 2 + this.speed),
		);
		if (cut.hit(this, mouth.naturalHeight / 2)) {
			State.onPlayerReset(this);
		}
		const bounce = ground.bounce(segment);
		if (bounce) {
			// this.position.copy(bounce.r);
			// this.direction.x *= -1;
			// this.direction.y *= -1;
			this.direction.copy(bounce.d);
		}
		/*
		else if (Math.random() * 100 < 1) {
			this.getRandomDirection();
		}
		*/
		return bounce;
	}

	move() {
		this.position.x = this.nx;
		this.position.y = this.ny;
	}

}
