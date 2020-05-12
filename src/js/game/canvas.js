import Vector2 from './vector2';

export default class Canvas {

	constructor() {
		const canvas = this.canvas = document.querySelector('.game .canvas');
		const size = this.size = new Vector2(canvas.offsetWidth, canvas.offsetHeight);
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
