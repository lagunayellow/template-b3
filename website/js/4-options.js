'use strict';
const Operator = (function() {
    class Options {
        constructor(elem, window, body) {
            this.options = document.getElementById(elem);
            this.window = window;
            this.body = document.querySelector(body);
            this.header = document.querySelector('header');
            this.cog = this.header.querySelector('.menu .options li[data="settings"]');
            this.setting = this.options.querySelector('.cell[value="setting"]');
            this.close = this.setting.querySelector('.close');
            this.window.addEventListener('resize', (e) => this.resize(e));
            this.close.addEventListener('click', (e) => this.remove(e));
            this.cog.addEventListener('click', (e) => this.open(e, this.trans));
        }
        resize(e) {
            if (this.window.innerWidth < 900) {
                this.body.classList.remove('preventScroll');
                this.setting.classList.remove('shown');
                this.options.classList.remove('open');
            }
        }
        open(e, callback) {
            let bind = callback.bind(this);
            this.body.classList.add('preventScroll');
            this.options.classList.add('open');
            setTimeout(bind, 400);
        }
        remove() {
            this.body.classList.remove('preventScroll');
            this.setting.classList.remove('shown');
            this.options.classList.remove('open');
        }
        trans() {
            this.setting.classList.add('shown');
            // window.devicePixelRatio = 25 + '%';
        }
    }
    class Contrast extends Options {
        constructor(elem, window, body) {
            super(elem, window, body);

        }
    }
    return {
        initialize: new Options('options', window, 'body')
    }

}());
