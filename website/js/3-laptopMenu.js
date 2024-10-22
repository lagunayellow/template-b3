'use strict';
const laptop = (function () {
    class Menu {
        constructor(elem, window) {
            this.elem = document.getElementById(elem);
            this.window = window;
            this.header = this.elem.querySelector('header');
            this.slate = this.header.querySelector('.slate');
            this.items = this.header.querySelectorAll('.menu .list li a');

            // First Panel
            this.panelFirst = this.slate.querySelector('.panel[data="first"]');
            this.listsFirst = this.panelFirst.querySelectorAll('.list');
            this.dataExtra = this.panelFirst.querySelectorAll('li[data="hasExtra"]');
            this.contentsFirst = this.panelFirst.querySelectorAll('li');

            // Second Panel
            this.panelSecond = this.slate.querySelector('.panel[data="second"]');
            this.listsSecond = this.panelSecond.querySelectorAll('.list');
            this.contentsSecond = this.panelSecond.querySelectorAll('li');

            // Events
            this.items.forEach((cur, index) => {
                cur.addEventListener('mouseenter', (e) => this.expand(e, index));
            });
            this.contentsFirst.forEach((cur, index) => {
                cur.addEventListener('mouseenter', (e) => {
                    this.extra(e, cur, index);
                    this.borderMain(e, index);
                });
            });
            this.dataExtra.forEach((cur, index) => {
                cur.addEventListener('mouseenter', (e) => {
                    this.extra(e, cur, index);
                });
            });
            this.contentsSecond.forEach((cur, index) => {
                cur.addEventListener('mouseenter', (e) => this.borderSub(e, index));
            });
            this.header.addEventListener('mouseleave', (e) => this.fold(e));
            this.window.addEventListener('resize', (e) => this.resize(e));
        }
        removeItems(element, className) {
            element.forEach(cur => {
                cur.classList.remove(className)
            })
        }
        toggle(element, className, index) {
            element.forEach((cur, idx) => {
                let isIndex = (index == idx),
                    ternary = isIndex ? cur.classList.add(className) :
                                        cur.classList.remove(className);
            })
        }
        expand(e, index) {
            this.slate.style.transition = "transform 500ms";
            let isIndex = (index < 4),
                ternary = {
                    folding: isIndex ? this.slate.classList.add('shown') :
                                       this.slate.classList.remove('shown'),
                };
            this.toggle(this.items, 'active', index);
            this.toggle(this.listsFirst, 'shown', index);
            this.removeItems(this.contentsFirst, 'active');
            this.removeItems(this.listsSecond, 'shown');
        }
        extra(e, element, index) {
            if (!element.hasAttribute('data')) {
                this.removeItems(this.listsSecond, 'shown')
            } else {
                this.toggle(this.listsSecond, 'shown', index);
            }
            this.removeItems(this.contentsSecond, 'active');
        }
        borderMain(e, index) {
            this.toggle(this.contentsFirst, 'active', index);
        }
        borderSub(e, index) {
            this.toggle(this.contentsSecond, 'active', index);
        }
        fold(e) {
            this.removeItems(this.items, 'active');
            this.removeItems(this.listsFirst, 'shown');
            this.removeItems(this.listsSecond, 'shown');
            this.removeItems(this.contentsFirst, 'active');
            this.removeItems(this.contentsSecond, 'active');
            this.slate.classList.remove('shown');
        }
        resize(e) {
            let isWidth = (this.window.innerWidth < 900),
                ternary = isWidth ? this.slate.classList.remove('shown') : null;
        }
    }
    return {
        initialize: new Menu('home', window)
    }
}());
