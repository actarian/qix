import Vector2 from './geometry/vector2';

export default class Canvas {

	constructor(width, height) {
		const canvas = this.canvas = document.querySelector('.game .canvas');
		width = width || canvas.offsetWidth;
		height = height || canvas.offsetHeight;
		const size = this.size = new Vector2(width, height);
		canvas.width = size.x;
		canvas.height = size.y;
		this.ctx = canvas.getContext('2d');
	}

	update() {
		const size = this.size;
		const ctx = this.ctx;
		ctx.clearRect(0, 0, size.x, size.y);
	}

	drawPoint(p) {
		const ctx = this.ctx;
		ctx.beginPath();
		ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "red";
		ctx.stroke();
	}

	drawSegment(s) {
		const ctx = this.ctx;
		ctx.beginPath();
		ctx.moveTo(s.a.x, s.a.y);
		ctx.lineTo(s.b.x, s.b.y);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "white";
		ctx.stroke();
	}

	drawImage(image, x, y, scale, rotation) {
		const ctx = this.ctx;
		ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
		ctx.rotate(rotation);
		ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalWidth / 2);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}

	drawImageCenter(image, x, y, cx, cy, scale, rotation) {
		const ctx = this.ctx;
		ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
		ctx.rotate(rotation);
		ctx.drawImage(image, -cx, -cy);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}

	/*
	resize() {
		const canvas = this.canvas;
		const rect = this.rect;
		rect.width = canvas.offsetWidth;
		rect.height = canvas.offsetHeight;
		canvas.width = rect.width;
		canvas.height = rect.height;
	}
	*/

}
