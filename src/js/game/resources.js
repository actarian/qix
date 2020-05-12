const cache = {};
const loading = [];
const callbacks = [];

export default class Resources {

    // Load an image url or an array of image urls
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
            var img = new Image();
            img.onload = () => {
                cache[url] = img;
                if (Resources.isReady()) {
                    callbacks.forEach((callback) => {
                        callback();
                    });
                }
            };
            cache[url] = false;
            img.src = url;
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