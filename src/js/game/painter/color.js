export default class Color {
	constructor(r, g, b, a) {
		var color = this;
		if (arguments.length > 1) {
			color.r = (r || r === 0) ? r : 0;
			color.g = (g || g === 0) ? g : 0;
			color.b = (b || b === 0) ? b : 0;
			color.a = (a || a === 0) ? a : 255;
		} else {
			var uint = r || '0xffffff';
			uint = parseInt(uint);
			if (r.length > 8) {
				color.r = uint >> 24 & 0xff;
				color.g = uint >> 16 & 0xff;
				color.b = uint >> 8 & 0xff;
				color.a = uint >> 0 & 0xff;
			} else {
				color.r = uint >> 16 & 0xff;
				color.g = uint >> 8 & 0xff;
				color.b = uint >> 0 & 0xff;
				color.a = 255;
			}
		}
	}
	// statics
	static ColorAlpha(color, pow, min, max) {
		min = min || 0;
		max = max || 1;
		var r = color.r;
		var g = color.g;
		var b = color.b;
		var a = Math.floor((min + (pow * (max - min))) * 255);
		return new Color(r, g, b, a);
	}
	static ColorMix(colorA, colorB, pow) {
		var r = Math.floor(colorA.r + (colorB.r - colorA.r) * pow);
		var g = Math.floor(colorA.g + (colorB.g - colorA.g) * pow);
		var b = Math.floor(colorA.b + (colorB.b - colorA.b) * pow);
		var a = Math.floor(colorA.a + (colorB.a - colorA.a) * pow);
		return new Color(r, g, b, a);
	}
	static ColorComponentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}
	static ColorContrast(color) {
		var luma = ColorLuma(color);
		if (luma > .6) {
			return new Color('0x000000');
		} else {
			return new Color('0xffffff');
		}
	}
	static ColorDarker(color, pow, min) {
		min = min || 0;
		var r = Math.max(Math.floor(color.r * min), Math.floor(color.r - 255 * pow));
		var g = Math.max(Math.floor(color.g * min), Math.floor(color.g - 255 * pow));
		var b = Math.max(Math.floor(color.b * min), Math.floor(color.b - 255 * pow));
		return new Color(r, g, b, color.a);
	}
	static ColorLighter(color, pow, max) {
		max = max || 1;
		var r = Math.min(color.r + Math.floor((255 - color.r) * max), Math.floor(color.r + 255 * pow));
		var g = Math.min(color.g + Math.floor((255 - color.g) * max), Math.floor(color.g + 255 * pow));
		var b = Math.min(color.b + Math.floor((255 - color.b) * max), Math.floor(color.b + 255 * pow));
		return new Color(r, g, b, color.a);
	}
	static ColorLuma(color) {
		// var luma = color.dot({ r: 54.213, g: 182.376, b: 18.411 });
		var luma = color.dot({ r: 95, g: 100, b: 60 });
		return luma;
	}
	// publics
	alpha(pow, min, max) {
		return ColorAlpha(this, pow, min, max);
	}
	mix(colorB, pow) {
		return ColorMix(this, colorB, pow);
	}
	dot(color) {
		return ((this.r / 255) * (color.r / 255) + (this.g / 255) * (color.g / 255) + (this.b / 255) * (color.b / 255));
	}
	makeSet() {
		this.foreground = ColorContrast(this);
		this.border = ColorDarker(this, 0.3);
		this.light = ColorLighter(this, 0.3);
		this.overbooked = ColorMix(this, Color.RED, 0.3);
		return this;
	}
	toHex() {
		return '#' + ColorComponentToHex(this.r) + ColorComponentToHex(this.g) + ColorComponentToHex(this.b) + ColorComponentToHex(this.a);
	}
	toRgba() {
		return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.a / 255).toFixed(3) + ')';
	}
	toUint() {
		return (this.r << 24) + (this.g << 16) + (this.b << 8) + (this.a);
	}
}
Color.RED = new Color(255, 0, 0);
