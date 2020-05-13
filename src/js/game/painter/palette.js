import Painter from './painter';
import Rect from './rect';

export default class Palette {
	constructor() {
		this.painter = new Painter().setSize(0, 0);
		this.buffer = new Painter().setSize(0, 0);
		this.size = { w: 0, h: 0 };
		this.pool = {};
		this.rows = {};
	}
	getRect(w, h) {
		var p = this.painter,
			size = this.size,
			rows = this.rows,
			r = new Rect(0, 0, w, h),
			row = rows[h] || { x: 0, y: size.h };
		size.w = Math.max(size.w, row.x + w);
		size.h = Math.max(size.h, row.y + h);
		if (!p.canvas.width && !p.canvas.height) {
			p.setSize(size.w, size.h);
		} else if (size.w > p.canvas.width || size.h > p.canvas.height) {
			// var img = new Image();
			// img.src = p.toDataURL();
			// document.body.appendChild(canvas);
			// console.log(p.canvas.width, p.canvas.height);
			// var data = p.ctx.getImageData(0, 0, p.canvas.width, p.canvas.height);
			var canvas = p.canvas;
			p.setCanvas(document.createElement('canvas'));
			p.setSize(size.w, size.h);
			p.ctx.drawImage(canvas, 0, 0);
			// p.ctx.putImageData(data, 0, 0);
			// p.ctx.drawImage(img, 0, 0);
			// document.body.removeChild(canvas);
		}
		r.x = row.x;
		r.y = row.y;
		row.x += w;
		rows[h] = row;
		return r;
	}
	add(key, path) {
		var palette = this;
		if (angular.isString(path)) {
			var deferred = $q.defer();
			var img = new Image();
			img.onload = function() {
				palette.addShape(key, img.width, img.height, function(p, rect) {
					p.ctx.drawImage(img, 0, 0);
				});
				deferred.resolve(img);
			};
			img.onerror = function() {
				deferred.reject('connot load ' + path);
			};
			img.src = path;
			return deferred.promise;
		} else {
			var params = Array.prototype.slice.call(arguments);
			return palette.addShape.apply(palette, params);
		}
	}
	addShape(key, w, h, callback) {
		var p = this.painter,
			r = this.getRect(w, h);
		p.ctx.save();
		p.ctx.rect(r.x, r.y, r.w, r.h);
		// p.ctx.stroke();
		p.ctx.clip();
		p.ctx.translate(r.x, r.y);
		callback.call(p, p, r.clone().setPos(0, 0));
		p.ctx.restore();
		this.pool[key] = r;
		// console.log('Painter.add', r);
	}
	draw(target, key, x, y, pre) {
		var r = this.pool[key];
		if (r) {
			// var ctx = target.ctx;
			// ctx.save();
			target.drawRect(this.painter.canvas, r, { x: x, y: y, w: r.w, h: r.h }, pre);
			// target.ctx.drawImage(this.painter.canvas, r.x, r.y, r.w, r.h, x - r.w / 2, y - r.h / 2, r.w, r.h);
			// ctx.restore();
		}
	}
	tint(target, key, x, y, color, pre) {
		var r = this.pool[key];
		if (r) {
			var p = this.painter,
				b = this.buffer.setSize(r.w, r.h);
			b.save();
			b.setFill(color);
			b.fillRect();
			b.ctx.globalCompositeOperation = "destination-atop";
			b.ctx.drawImage(p.canvas, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
			b.restore();
			// console.log(x, y, b.canvas, target.canvas);
			target.draw(b.canvas, { x: x, y: y }, pre);
		}
	}
	pattern(target, key, x, y, w, h, color) {
		function drawPattern(pattern) {
			var ctx = target.ctx;
			ctx.save();
			ctx.translate(x, y);
			// draw
			// ctx.beginPath();
			// ctx.rect(-x, -y, w, h);
			ctx.fillStyle = pattern;
			ctx.fillRect(-x, -y, w, h);
			ctx.translate(-x, -y);
			// ctx.fill();
			ctx.restore();
		}
		var r = this.pool[key];
		if (r) {
			var img = r.img,
				pattern;
			if (!img || r.color != color) {
				var b = this.buffer.setSize(r.w, r.h);
				if (color) {
					r.color = color;
					b.save();
					b.setFill(color);
					b.fillRect();
					b.ctx.globalCompositeOperation = "destination-atop";
					b.ctx.drawImage(this.painter.canvas, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
					b.restore();
				} else {
					b.ctx.drawImage(this.painter.canvas, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
				}
				var img = new Image();
				img.onload = function() {
					r.img = img;
					pattern = target.ctx.createPattern(img, "repeat");
					drawPattern(pattern);
				};
				img.src = b.toDataURL();
			} else {
				pattern = target.ctx.createPattern(img, "repeat");
				drawPattern(pattern);
			}
		}
	}
}
/**
 * Example
 */

/*
  var palette = new Palette();
	palette.add('arrow', 8, 4, function(p, rect) {
		p.setFill(p.colors.black);
		p.begin();
		p.ctx.moveTo(0, 0);
		p.ctx.lineTo(rect.w, 0);
		p.ctx.lineTo(rect.w / 2, rect.h);
		p.close();
		p.fill();
	});

var rect = p.drawingRect.copy(item.rect);
palette.draw(p, 'arrow', rect.center().x, rect.center().y);


	palette.add('patternGrid', W, H, function (p, rect) {
		// p.save();
		p.setFill(p.colors.greyLight);
		p.ctx.fillRect(rect.w - 1, 0, 1, rect.h);
		p.ctx.fillRect(0, rect.h - 1, rect.w, 1);
		// p.restore();
	});
	palette.add('patternExpired', W, H, function (p, rect) {
		p.rotate(-45);
		p.setFill(p.colors.black.alpha(.15));
		var i = 0, t = H;
		while (i < t) {
			p.fillRect({ x: -W, y: -H + i * 4, w: W * 2, h: 1 });
			i++;
		}
		p.colors.black;
	});
	palette.add('eye', W, H, function (p, rect) {
		p.setText('16px Project');
		p.setFill(p.colors.black);
		p.fillText('`', rect.center(), rect.w);
	});
	palette.add('eyeDisabled', W, H, function (p, rect) {
		p.setText('16px Project');
		p.setFill(p.colors.black);
		p.fillText('{', rect.center(), rect.w);
	});
	palette.add('away', W, H, function (p, rect) {
		p.setFill(p.colors.yellowLight);
		p.ctx.beginPath();
		p.ctx.arc(W / 2, H / 2, W / 2 - 4, 0, 2 * Math.PI);
		p.ctx.fill();
		p.ctx.closePath();
		p.setText('16px Project');
		p.setFill(p.colors.black);
		p.fillText('}', rect.center(), rect.w);
	});
	palette.add('assets', W, H, function (p, rect) {
		p.setFill(p.colors.yellowLight);
		p.ctx.beginPath();
		p.ctx.arc(W / 2, H / 2, W / 2 - 4, 0, 2 * Math.PI);
		p.ctx.fill();
		p.ctx.closePath();
		p.setText('16px Project');
		p.setFill(p.colors.black);
		p.fillText('~', rect.center(), rect.w);
	});
	palette.add('delivery', W, H, function (p, rect) {
		p.setFill(p.colors.blue);
		p.ctx.beginPath();
		p.ctx.arc(W / 2, H / 2, W / 2 - 4, 0, 2 * Math.PI);
		p.ctx.fill();
		p.ctx.closePath();
		p.setText('16px Project');
		p.setFill(p.colors.white);
		p.fillText('|', rect.center(), rect.w);
                });
                palette.add('seo', W, H, function (p, rect) {
                    p.setFill(p.colors.green);
                    p.ctx.beginPath();
                    p.ctx.arc(W / 2, H / 2, W / 2 - 4, 0, 2 * Math.PI);
                    p.ctx.fill();
                    p.ctx.closePath();
                    p.setText('16px Project');
                    p.setFill(p.colors.white);
                    p.fillText('', rect.center(), rect.w);
                });
                palette.add('document', W, H, function (p, rect) {
                    p.setFill(p.colors.blueLight);
                    p.ctx.beginPath();
                    p.ctx.arc(W / 2, H / 2, W / 2 - 4, 0, 2 * Math.PI);
                    p.ctx.fill();
                    p.ctx.closePath();
                    p.setText('16px Project');
                    p.setFill(p.colors.white);
                    p.fillText('X', rect.center(), rect.w);
                });
                palette.add('absence', W, H, function (p, rect) {
                    p.setFill(p.colors.yellowLight);
                    p.ctx.beginPath();
                    p.ctx.arc(W / 2, H / 2, W / 2 - 4, 0, 2 * Math.PI);
                    p.ctx.fill();
                    p.ctx.closePath();
                    p.setText('16px Project');
                    p.setFill(p.colors.black);
                    p.fillText('', rect.center(), rect.w);
                });

                // PALETTE SM
                palette.add('away-sm', W, H, function (p, rect) {
                    var d = 7, w = W / 4, h = H / 4, x = W / 2 + d, y = H / 2 + d, center = rect.center();
                    center.x += d;
                    center.y += d;
                    p.setFill(p.colors.white);
                    p.ctx.beginPath();
                    p.ctx.arc(x, y, w, 0, 2 * Math.PI);
                    p.ctx.fill();
                    p.ctx.closePath();
                    p.setText('12px Project');
                    p.setFill(p.colors.black);
                    p.fillText('}', center, W);
                });
                palette.add('absence-sm', W, H, function (p, rect) {
                    var d = 7, w = W / 4, h = H / 4, x = W / 2 + d, y = H / 2 + d, center = rect.center();
                    center.x += d;
                    center.y += d;
                    p.setFill(p.colors.white);
                    p.ctx.beginPath();
                    p.ctx.arc(x, y, w, 0, 2 * Math.PI);
                    p.ctx.fill();
                    p.ctx.closePath();
                    p.setText('12px Project');
                    p.setFill(p.colors.black);
                    p.fillText('', center, W);
                });
                palette.add('task-sm', W, H, function (p, rect) {
                    var d = 7, w = W / 4, h = H / 4, x = W / 2 + d, y = H / 2 + d, center = rect.center();
                    center.x += d;
                    center.y += d;
                    p.setFill(p.colors.white);
                    p.ctx.beginPath();
                    p.ctx.arc(x, y, w, 0, 2 * Math.PI);
                    p.ctx.fill();
                    p.ctx.closePath();
                    p.setText('12px Project');
                    p.setFill(p.colors.black);
                    p.fillText('%', center, W);
				});
				*/
