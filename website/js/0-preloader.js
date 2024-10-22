'use strict';
const Preload = (function() {
    class Loader {
        constructor(elem, options) {
            this.elem = document.getElementById(elem);
            this.delay(this.fadeOut);
        }
        complete(e) {
            this.elem.style.display = 'none';
        }
        fadeOut() {
            this.elem.style.opacity = 0;
            this.elem.addEventListener('transitionend', (e) => this.complete(e))

        }
        delay(callback) {
            let bind = callback.bind(this);
            setTimeout(bind, 2000);
        }
    }
    return {
        init: (elem) => {
            let proLoader = new Loader(elem);
        }
    }
}());
