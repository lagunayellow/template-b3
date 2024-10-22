'use strict';
import {Event} from './terminal/0-terminal.js';
const button = (function() {
    class Button {
        constructor(button) {
            this.button = document.querySelectorAll(button);
            this.event = new Event(this.button);
            this.event.insert('mouseenter', this.animation);
            this.event.insert('mouseleave', this.animation);
        }
        animation(e) {
            let arrow = e.target.querySelector('.arrow');
            arrow.classList.toggle('shown')
        }
    }
    return {
        initialize: new Button('span > a.button')
    }
}());
