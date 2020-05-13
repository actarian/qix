import Canvas from './canvas';
import Cut from './cut';
import Enemy from './enemy';
import Ground from './ground';
import Player from './player';
import Resources from './resources';
import { State } from './state';

export default class Game {

	constructor() {
		const canvas = this.canvas = State.canvas = new Canvas();
		const ground = this.ground = State.ground = new Ground();
		const cut = this.cut = State.cut = new Cut();
		const enemies = State.enemies = new Array(3).fill(0).map(x => new Enemy());
		const player = State.player = new Player();
		const assets = State.assets = {
			designer: '/img/game/designer.jpg',
			packaging: '/img/game/packaging.jpg',
			mouth: '/img/game/mouth.png',
			diamond: '/img/game/diamond.png',
		};
		const resources = State.resources = Resources;
		Resources.onReady(() => {
			this.init();
		});
		Resources.loadAssets(assets);
	}

	init() {
		this.loop = this.loop.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
		this.onKeyup = this.onKeyup.bind(this);
		document.addEventListener("keydown", this.onKeydown);
		document.addEventListener("keyup", this.onKeyup);
		this.loop();
	}

	loop() {
		if (!State.ended) {
			if (!State.paused) {
				State.canvas.update();
				State.ground.update();
				State.cut.update();
				State.enemies.forEach(x => x.update());
				State.player.update();
				/*
				this.grid.paint();
				this.player.update();
				this.player.paint();
				this.grid.enemies.forEach((enemy) => {
				    enemy.update();
				    enemy.paint();
				});
				this.qix.update();
				this.qix.draw();
				this.measureFPS();
				this.grid.displayScore();
				this.grid.displayTimer();
				*/
				requestAnimationFrame(this.loop);
			}
		} else {
			// State.soundtrack.pause();
			if (State.won) {
				/*
				State.gameWon.play();
				this.grid.ctx.font = "150px Georgia";
				this.grid.ctx.strokeStyle = 'white';
				this.grid.ctx.lineWidth = 8;
				this.grid.ctx.strokeText("Victory!", 80, 280);
				this.grid.ctx.fillStyle = 'green';
				this.grid.ctx.fillText("Victory!", 80, 280);
				*/
			} else {
				/*
				State.gameLost.play();
				this.grid.ctx.font = "150px Georgia";
				this.grid.ctx.strokeStyle = 'white';
				this.grid.ctx.lineWidth = 8;
				this.grid.ctx.strokeText("Game", 140, 200);
				this.grid.ctx.strokeText("Over", 175, 350);
				this.grid.ctx.fillStyle = 'red';
				this.grid.ctx.fillText("Game", 140, 200);
				this.grid.ctx.fillText("Over", 175, 350);
				*/
			}
		}
	}

	toggle() {
		if (State.paused) {
			State.paused = false;
			this.loop();
		} else {
			State.paused = true;
		}
	}

	onKeydown(event) {
		const keys = State.keys;
		Object.keys(keys).forEach(key => {
			keys[key] = false;
		});
		keys.shift = event.shiftKey;
		switch (event.keyCode) {
			case 32:
				event.preventDefault();
				keys.space = true;
				break;
			case 37:
				event.preventDefault();
				keys.left = true;
				break;
			case 38:
				event.preventDefault();
				keys.up = true;
				break;
			case 39:
				event.preventDefault();
				keys.right = true;
				break;
			case 40:
				event.preventDefault();
				keys.down = true;
				break;
			case 112:
				this.toggle();
				break;
			case 80:
				this.toggle();
				break;
			default:
		}
	}

	onKeyup(event) {
		const keys = State.keys;
		switch (event.keyCode) {
			case 32:
				event.preventDefault();
				keys.space = false;
				break;
			case 37:
				event.preventDefault();
				keys.left = false;
				break;
			case 38:
				event.preventDefault();
				keys.up = false;
				break;
			case 39:
				event.preventDefault();
				keys.right = false;
				break;
			case 40:
				event.preventDefault();
				keys.down = false;
				break;
			default:
		}
	}

}
