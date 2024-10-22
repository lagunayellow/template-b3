'use strict';
const height = (function() {
    function Dimension(elem, window) {
        this.elem = document.querySelector(elem);
        this.window = window;
        this.emission = document.getElementById('emission')
        this.textField = this.emission.querySelector('p');
        this.window.onload = this.resize();
        this.window.addEventListener('resize', (e) => this.resize(e))
    }
    Dimension.prototype = {
        resize: function(e) {
            this.elem.style.height = ((window.innerHeight * 1) - this.textField.offsetHeight) + 'px';
        }
    }
    return {
        initialize: new Dimension('#home .grid', window)
    }
}())
