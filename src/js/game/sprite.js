import Resources from "./resources";

export default class Sprite {
    constructor(url, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this.index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
    }

    update(dt) {
        this.index += this.speed * dt;
    }

    getPosition() {
        let frame;
        if (this.speed > 0) {
            const max = this.frames.length;
            const idx = Math.floor(this.index);
            frame = this.frames[idx % max];
            if (this.once && idx >= max) {
                this.done = true;
                return;
            }
        } else {
            frame = 0;
        }
        let x = this.pos[0];
        let y = this.pos[1];
        if (this.dir == 'vertical') {
            y += frame * this.size[1];
        } else {
            x += frame * this.size[0];
        }
        return {
            x: x,
            y: y
        };
    }

    render(ctx) {
        const pos = this.getPosition();
        ctx.drawImage(Resources.get(this.url), pos.x, pos.y, this.size[0], this.size[1], 0, 0, this.size[0], this.size[1]);
    }

    image() {
        const pos = this.getPosition();
        const pattern_canvas = document.createElement('canvas');
        pattern_canvas.width = this.size[0];
        pattern_canvas.height = this.size[1];
        const pattern_context = pattern_canvas.getContext('2d');
        pattern_context.drawImage(Resources.get(this.url), pos.x, pos.y, this.size[0], this.size[1], 0, 0, this.size[0], this.size[1]);
        return pattern_canvas;
    }

}