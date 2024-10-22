'use strict';
const chat = (function() {
    function Chat(root, elem) {
        this.root = document.getElementById(root);
        this.elem = this.root.querySelector(elem);
        this.skew = this.root.querySelector('.chat.skew');
        this.body = this.elem.querySelector('.body');
        this.screen = this.root.querySelector('.screen');
        this.trigger = false;
        this.switch = false;
        this.elem.addEventListener('click', (e) => this.open(e, this.expand))
    }
    Chat.prototype = {
        open: function(e, callback) {
            if (!this.trigger) {
                let expand = callback.bind(this);
                this.trigger = true;
                if (this.screen.classList.contains('active-height')) {
                    this.switch = true;
                    this.screen.classList.toggle('active-height');
                } else {
                    this.skew.classList.toggle('active');
                    this.body.classList.toggle('active');
                    this.screen.classList.toggle('active-width');
                }
                setTimeout(expand, 600, this.flag);
            }
        },
        expand: function(callback) {
            let flag = callback.bind(this);
            if (this.switch) {
                this.skew.classList.toggle('active');
                this.body.classList.toggle('active');
                this.screen.classList.toggle('active-width');
            } else {
                this.screen.classList.toggle('active-height');
            }
            setTimeout(flag, 600)
        // 1. expand the screen
        // 2. change the icon
        },
        flag: function() {
            this.trigger = false;
            this.switch = false;
        }
    }
    return {
        initialize: new Chat('home', '.chat')
    }
}());
