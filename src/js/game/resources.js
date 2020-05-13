const cache = {};
const callbacks = [];

export default class Resources {

	static loadAssets(assets) {
		this.load(Object.keys(assets).map(k => assets[k]));
	}

	static load(urlOrArr) {
		if (urlOrArr instanceof Array) {
			urlOrArr.forEach((url) => {
				Resources.loadUrl(url);
			});
		} else {
			Resources.loadUrl(urlOrArr);
		}
	}

	static loadUrl(url) {
		if (cache[url]) {
			return cache[url];
		} else {
			var image = new Image();
			image.onload = () => {
				cache[url] = image;
				if (Resources.isReady()) {
					callbacks.forEach((callback) => {
						callback();
					});
				}
			};
			cache[url] = false;
			image.src = url;
		}
	}

	static get(url) {
		return cache[url];
	}

	static isReady() {
		var ready = true;
		for (var k in cache) {
			if (cache.hasOwnProperty(k) && !cache[k]) {
				ready = false;
			}
		}
		return ready;
	}

	static onReady(callback) {
		callbacks.push(callback);
	}
}
