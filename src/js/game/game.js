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
			this.loop();
		});
		Resources.loadAssets(assets);
		this.intro();
	}

	init() {
		this.loop = this.loop.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
		this.onKeyup = this.onKeyup.bind(this);
		this.start = this.start.bind(this);
		this.restart = this.restart.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		State.addEnemy = this.addEnemy.bind(this);
		State.removeEnemy = this.removeEnemy.bind(this);
		State.addScore = this.addScore.bind(this);
		State.addEnemyScore = this.addEnemyScore.bind(this);
		State.onPlayerCut = this.onPlayerCut.bind(this);
		State.onPlayerReset = this.onPlayerReset.bind(this);
		document.addEventListener("keydown", this.onKeydown);
		document.addEventListener("keyup", this.onKeyup);
		const start = document.querySelector('.btn--start');
		start.addEventListener("click", this.start);
		const restart = document.querySelector('.btn--restart');
		restart.addEventListener("click", this.restart);
		const arrows = this.arrows = document.querySelector('.game-container .arrows');
		arrows.addEventListener('touchstart', this.onTouchStart);
	}

	intro() {
		State.intro = true;
		State.rules = false;
		State.paused = true;
		State.game = false;
		State.ended = false;
		const title = document.querySelector('.group--intro__title');
		const mouth = document.querySelector('.group--intro__mouth');
		gsap.set(title, {
			opacity: 0,
			rotate: '10deg',
		});
		gsap.set(mouth, {
			opacity: 0,
		});
		gsap.to(title, 2.5, {
			delay: 0.2,
			ease: Elastic.easeOut.config(1, 0.3),
			opacity: 1,
			rotate: '0deg',
		});
		gsap.to(mouth, 0.6, {
			delay: 1,
			ease: Power1.easeInOut,
			opacity: 1,
			x: '-100%',
			y: '30%',
			onComplete: () => {
				gsap.to(mouth, 0.6, {
					delay: 0.1,
					ease: Power1.easeInOut,
					opacity: 1,
					x: '100%',
					y: '-30%',
					onComplete: () => {
						gsap.to(mouth, 0.6, {
							delay: 0.1,
							ease: Power1.easeInOut,
							opacity: 1,
							x: '0%',
							y: '30%',
							onComplete: () => {
								setTimeout(() => {
									this.rules();
								}, 1000);
							}
						});
					}
				});
			}
		});
		this.updateStateClasses();
	}

	rules() {
		State.intro = false;
		State.rules = true;
		State.paused = true;
		State.game = false;
		State.ended = false;
		gsap.set('.group--rule', { opacity: 0, y: 20 });
		gsap.to('.group--rule', {
			duration: 0.3,
			opacity: 1,
			y: 0,
			ease: Power1.easeInOut,
			stagger: 0.1
		});
		this.updateStateClasses();
	}

	start() {
		console.log('start');
		State.area = 0;
		State.intro = false;
		State.rules = false;
		State.ended = false;
		State.paused = false;
		State.game = true;
		State.addEnemy();
		this.updateStateClasses();
	}

	end() {
		State.intro = false;
		State.rules = false;
		State.paused = false;
		State.game = true;
		State.ended = true;
		// State.percent = 100;
		State.ended = true;
		State.won = true;
		this.updateStateClasses();
	}

	restart() {
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
		State.addEnemy();
		this.setPercent();
		this.updateStateClasses();
	}

	addTouchListeners() {
		document.addEventListener("touchmove", this.onTouchMove);
		document.addEventListener("touchend", this.onTouchEnd);
	}

	removeTouchListeners() {
		document.removeEventListener("touchmove", this.onTouchMove);
		document.removeEventListener("touchend", this.onTouchEnd);
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
		if (State.percent >= State.minNeededScore) {
			this.end();
		}
		this.setPercent();
		const area = cut.getArea();
		const score = Math.round(Math.sqrt(area));
		State.addScore(score);
	}

	setPercent() {
		const percent = `${State.percent}%`;
		// console.log('State', State.area, State.percent);
		const bar = document.querySelector('.group--progress__bar');
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
		}
		requestAnimationFrame(this.loop);
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
		if (keys.space) {
			if (State.intro) {
				this.rules();
			} else if (State.debug) {
				if (State.rules) {
					this.start();
				} else if (!State.ended) {
					this.end();
				} else {
					this.intro();
				}
			}
		}
	}

	updateStateClasses() {
		const container = document.querySelector('.game-container');
		container.classList.remove('game-container--intro', 'game-container--rules', 'game-container--game', 'game-container--ended');
		if (State.intro) {
			container.classList.add('game-container--intro');
		} else if (State.rules) {
			container.classList.add('game-container--rules');
		} else if (State.ended) {
			container.classList.add('game-container--ended');
		} else if (State.game) {
			container.classList.add('game-container--game');
		}
	}

	onKeyup(event) {
		const keys = State.keys;
		event = event || window.event; // to deal with IE
		keys.shift = event.shiftKey;
		keys[this.handleKeyCode(event)] = event.type == 'keydown';
	}

	onHandleTouches(event) {
		const touches = event.touches;
		const touch = touches[0];
		const arrows = this.arrows;
		const ww = window.innerWidth;
		const wh = window.innerHeight;
		const aw = arrows.offsetWidth;
		const ah = arrows.offsetHeight;
		// console.log(touch.pageX, aw, ww, ww / 2 - aw / 6);
		State.keys.left = (touch.pageX < (ww / 2 - aw / 6));
		State.keys.right = (touch.pageX > (ww / 2 + aw / 6));
		State.keys.up = (touch.pageY < arrows.offsetTop + ah / 2);
		State.keys.down = (touch.pageY > arrows.offsetTop + ah / 2);
		State.keys.space = true;
		// console.log(State.keys);
	}

	onTouchStart(event) {
		// console.log('onTouchStart', event);
		this.addTouchListeners();
		this.onHandleTouches(event);
	}

	onTouchMove(event) {
		// console.log('onTouchMove', event);
		this.onHandleTouches(event);
	}

	onTouchEnd(event) {
		// console.log('onTouchEnd', event);
		this.removeTouchListeners();
		State.keys.space = false;
		State.keys.left = false;
		State.keys.up = false;
		State.keys.right = false;
		State.keys.down = false;
	}
}
