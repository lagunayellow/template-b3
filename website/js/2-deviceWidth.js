'use strict';
const videoHeight = (function() {
    class Resolution {
        constructor(elem, window) {
            this.elem = document.getElementById(elem);
            this.window = window;
            this.window.onload = this.resize();
            this.window.addEventListener('resize', (e) => this.resize(e))
            this.elem.addEventListener('click', (e) => this.toggle(e))
        }
        width() {
            return Math.max(
                window.innerWidth,
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
            )
        }
        toggle(e) {
            this.elem.classList.toggle('toggle')
        }
        resize(e) {
            this.elem.innerHTML = `Current Width is: ${this.width()}`
            var zoom = Math.round(window.devicePixelRatio * 100);
            console.log(zoom+"%")
        }
    }
    return {
        initialize: new Resolution('resolution', window)
    }
}());
