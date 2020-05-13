import Canvas from './canvas';
import Cut from './cut';
import Enemy from './enemy';
import Ground from './ground';
import Player from './player';
import Resources from './resources';
import { State } from './state';

export default class Game {

	constructor() {
		const canvas = this.canvas = State.canvas = new Canvas(750, 750);
		const ground = this.ground = State.ground = new Ground();
		const cut = this.cut = State.cut = new Cut();
		const enemies = State.enemies = new Array(1).fill(0).map(x => new Enemy());
		const player = State.player = new Player();
		const assets = State.assets = {
			designer: './img/game/designer.jpg',
			packaging: './img/game/packaging.jpg',
			mouth: './img/game/mouth.png',
			diamond: './img/game/diamond.png',
		};
		const resources = State.resources = Resources;
		Resources.onReady(() => {
			this.init();
			this.start();
		});
		Resources.loadAssets(assets);
	}

	init() {
		this.loop = this.loop.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
		this.onKeyup = this.onKeyup.bind(this);
		document.addEventListener("keydown", this.onKeydown);
		document.addEventListener("keyup", this.onKeyup);
	}

	start() {
		State.area = 0;
		this.loop();
		this.addMoreEnemy();
	}

	addMoreEnemy() {
		if (this.to) {
			clearTimeout(this.to);
		}
		const add = () => {
			if (!State.ended && !State.paused) {
				State.enemies.push(new Enemy());
				this.addMoreEnemy();
			}
		};
		this.to = setTimeout(add, 10000);
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
			this.addMoreEnemy();
		} else {
			State.paused = true;
		}
	}

	handleKeyCode(event) {
		let keyCode = 'unknown';
		switch (event.keyCode) {
			case 32: // space
				event.preventDefault();
				keyCode = 'space';
				break;
			case 37: // left
				event.preventDefault();
				keyCode = 'left';
				break;
			case 38: // up
				event.preventDefault();
				keyCode = 'up';
				break;
			case 39: // right
				event.preventDefault();
				keyCode = 'right';
				break;
			case 40: // down
				event.preventDefault();
				keyCode = 'down';
				break;
		}
		return keyCode;
	}

	onKeydown(event) {
		const keys = State.keys;
		event = event || window.event; // to deal with IE
		keys.shift = event.shiftKey;
		switch (event.keyCode) {
			case 112: // f1
			case 80: // p
				this.toggle();
				break;
			default:
				keys[this.handleKeyCode(event)] = event.type == 'keydown';
		}
	}

	onKeyup(event) {
		const keys = State.keys;
		event = event || window.event; // to deal with IE
		keys.shift = event.shiftKey;
		keys[this.handleKeyCode(event)] = event.type == 'keydown';
	}

}
