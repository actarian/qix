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
		const enemies = State.enemies = new Array(State.minEnemies).fill(0).map(x => new Enemy());
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
		this.restart = this.restart.bind(this);
		State.addEnemy = this.addEnemy.bind(this);
		State.removeEnemy = this.removeEnemy.bind(this);
		State.addScore = this.addScore.bind(this);
		State.addEnemyScore = this.addEnemyScore.bind(this);
		State.onPlayerCut = this.onPlayerCut.bind(this);
		State.onPlayerReset = this.onPlayerReset.bind(this);
		document.addEventListener("keydown", this.onKeydown);
		document.addEventListener("keyup", this.onKeyup);
		const restart = document.querySelector('.btn--restart');
		restart.addEventListener("click", this.restart);
	}

	start() {
		State.area = 0;
		State.addEnemy();
		this.loop();
	}

	restart() {
		const container = document.querySelector('.game-container');
		container.classList.remove('game-container--ended');
		State.ground = new Ground();
		State.cut = new Cut();
		State.enemies = new Array(State.minEnemies).fill(0).map(x => new Enemy());
		State.player = new Player();
		State.area = 0;
		State.percent = 0;
		State.score = 0;
		State.paused = false;
		State.ended = false;
		State.won = false;
		State.lost = false;
		this.setPercent();
	}

	onPlayerCut() {
		const ground = State.ground;
		const cut = State.cut;
		// update score and enemies
		const deads = State.enemies.filter(enemy => !ground.isInside(enemy));
		deads.forEach(enemy => {
			State.removeEnemy(enemy);
			State.addEnemyScore(enemy);
		});
		if (State.enemies.length === 0) {
			State.enemies = new Array(State.minEnemies).fill(0).map(x => new Enemy());
		}
		State.area = ground.getArea();
		State.percent = Math.round((State.totalArea - State.area) / State.totalArea * 100);
		if (State.percent >= 75) {
			State.percent = 100;
			State.ended = true;
			State.won = true;
			const container = document.querySelector('.game-container');
			container.classList.add('game-container--ended');
		}
		this.setPercent();
		const area = cut.getArea();
		const score = Math.round(Math.sqrt(area));
		State.addScore(score);
	}

	setPercent() {
		const percent = `${State.percent}%`;
		// console.log('State', State.area, State.percent);
		const bar = document.querySelector('.progress__bar');
		gsap.set(bar, { width: percent });
		const progress = document.querySelector('.group--progress .percent');
		progress.innerText = percent;
	}

	onPlayerReset() {
		State.keys.space = State.keys.shift = false;
	}

	addEnemy() {
		if (this.to) {
			clearTimeout(this.to);
		}
		const add = () => {
			console.log('addEnemy');
			if (!State.ended && !State.paused) {
				if (State.enemies.length < State.maxEnemies) {
					State.enemies.push(new Enemy());
				}
				this.addEnemy();
			}
		};
		this.to = setTimeout(add, 10000);
	}

	removeEnemy(enemy) {
		console.log('removeEnemy', enemy);
		const index = State.enemies.indexOf(enemy);
		if (index !== -1) {
			State.enemies.splice(index, 1);
		}
	}

	addEnemyScore(enemy) {
		State.score += 500;
		console.log('addEnemyScore', enemy, State.score);
	}

	addScore(score) {
		State.score += score;
		// console.log('addScore', score);
	}

	loop() {
		if (!State.paused) {
			if (!State.ended) {
				State.canvas.update();
				State.ground.update();
				State.cut.update();
				State.enemies.forEach(x => x.update());
				State.player.update();
			} else {
				State.canvas.update();
				State.ground.draw();
				if (State.won) {

				} else {

				}
			}
			requestAnimationFrame(this.loop);
		}
	}

	toggle() {
		if (State.paused) {
			State.paused = false;
			this.loop();
			this.addEnemy();
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
