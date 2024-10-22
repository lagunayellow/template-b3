'use strict';
const mobile = (function(body, window) {
    let _body = document.querySelector(body),
        _window = window;
    class Icon {
        constructor(root) {
            this.root = document.getElementById(root);
            this.menu = this.root.querySelector('.menu');
            this.board = this.root.querySelector('.board');
            this.icon = this.root.querySelector('.mobile');
            this.top = this.root.querySelector('li[position="top"]');
            this.mid = this.root.querySelector('li[position="mid"]');
            this.bot = this.root.querySelector('li[position="bot"]');
            this.transition = this.board.style.transition = "transform 600ms cubic-bezier(.8,.01,.55,.99)";
            this.sticks = [this.top, this.mid, this.bot];
            this.active = false;
            this.switch = false;
            this.icon.addEventListener('click', (e) => this.clicked(e, this.rotate));
            _window.addEventListener('resize', (e) => this.resize(e, this.rotate));
        }
        static control(sticks, mainClass, subClass, boolean) {
            if (subClass == undefined) {
                subClass = "default value";
                sticks.forEach(cur => {
                    cur.classList.toggle(mainClass);
                })
            } else if (mainClass == 'rotateOdd') {
                sticks.forEach((cur, num) => {
                    console.log(cur, num);
                    let isNum = num < 2,
                        isNumOdd = (num == 0),
                        isBool = boolean == undefined || false,
                        ternary = isBool ?
                            isNum ?
                                isNumOdd ?
                                    cur.classList.toggle(mainClass) :
                                    cur.classList.add('invisible') :
                                cur.classList.toggle(subClass) :
                            isNum ?
                                cur.classList.remove(mainClass) :
                                cur.classList.remove(subClass);
                });
            }
        }
        rotate() {
            let isSwitch = this.switch,
                ternary = isSwitch ?
                    Icon.control(this.sticks, 'rotateOdd', 'rotateEven') :
                    [Icon.control(this.sticks, 'fold'), this.mid.classList.remove('invisible')];
            this.switch = false;
            this.active = false;
            console.log(this.active);
        }
        clicked(e, callback) {
            if (!this.active) {
                this.active = true;
                _body.classList.toggle('preventScroll');
                let rotate = callback.bind(this),
                    hasClass = this.top.classList.contains('fold'),
                    ternary = {
                        folding: !hasClass ?
                            Icon.control(this.sticks, 'fold') :
                            Icon.control(this.sticks, 'rotateOdd', 'rotateEven'),
                        switching : !hasClass ?
                            this.switch = true :
                            this.switch = false,
                        resetColor: hasClass ?
                            [Panel.removeClass(this.categoryFirst, 'color'),
                            Panel.removeClass(this.categorySecond, 'color')] : null,
                        resetRotation: hasClass ?
                            [Panel.removeClass(this.arrowFirst, 'rotate'),
                            Panel.removeClass(this.arrowSecond, 'rotate')] : null,
                        resetClass: hasClass ?
                            [Panel.removeClass(this.listSecond, 'unfold'),
                            Panel.removeClass(this.listThird, 'unfold')] : null,
                    };
                    this.board.classList.toggle('open'),
                    setTimeout(rotate, 300)
            }
        }
    }
    class Panel extends Icon {
        constructor(root) {
            super(root);
            this.categoryFirst = this.board.querySelectorAll('a[seq="first"]');
            this.categorySecond = this.board.querySelectorAll('a[seq="second"]');
            this.listSecond = this.board.querySelectorAll('.list[seq="second"]');
            this.listThird = this.board.querySelectorAll('.list[seq="third"]');
            this.arrayFirst = [];
            this.arraySecond = [];
            this.arrowFirst = this.arrow([...this.categoryFirst], this.arrayFirst);
            this.arrowSecond = this.arrow([...this.categorySecond], this.arraySecond);
            this.manager(this.categoryFirst, this.listSecond, this.deploy);
            this.manager(this.categorySecond, this.listThird, this.deploy);
        }
        manager(target, list, callback) {
            let bind = callback.bind(this);
            target.forEach(cur => {
                cur.addEventListener('click', (e) => bind(e, target, list));
            })
        }
        arrow(node, array) {
            node.forEach(cur => {
                var arrows = cur.querySelector('.arrow');
                array.push(arrows);
            })
            return array;
        }
        static removeClass(node, className) {
            node.forEach(cur => {
                cur.classList.remove(className);
            })
        }
        deploy(e, parentList, childList) {
            let list = e.target.nextElementSibling,
                children = e.target.querySelector('.arrow'),
                matchedFirst = e.target.matches('[seq="first"]'),
                matchedSecond = e.target.matches('[seq="second"]'),
                isMatch = e.target.matches('[seq="second"]'),
                hasUnfold = list.classList.contains('unfold'),
                hasOpen = e.target.classList.contains('open');
            if (matchedFirst) {
                Panel.removeClass(this.arrowFirst, 'rotate');
                Panel.removeClass(this.arrowSecond, 'rotate');
                Panel.removeClass(this.categoryFirst, 'color');
                Panel.removeClass(this.categorySecond, 'color');
                if (hasUnfold) {
                    list.classList.remove('unfold');
                    Panel.removeClass(this.listSecond, 'unfold');
                    Panel.removeClass(this.listThird, 'unfold');
                } else {
                    Panel.removeClass(this.listSecond, 'unfold');
                    Panel.removeClass(this.listThird, 'unfold');
                    list.classList.add('unfold');
                    e.target.classList.add('color');
                    children.classList.add('rotate');
                }
            } else {
                if (hasUnfold) {
                    list.classList.remove('unfold');
                    e.target.classList.remove('color');
                    children.classList.remove('rotate');
                } else {
                    Panel.removeClass(this.arrowSecond, 'rotate');
                    Panel.removeClass(this.categorySecond, 'color');
                    Panel.removeClass(this.listThird, 'unfold');
                    list.classList.add('unfold');
                    e.target.classList.add('color');
                    children.classList.add('rotate');
                }
            }
        }
        resize(e, callback) {
            let rotate = callback.bind(this),
            isWidth = _window.innerWidth > 901,
            hasRotate = this.top.classList.contains('rotateOdd'),
            isOn = this.top.classList.contains('fold');
            if (isWidth && isOn && hasRotate) {
                this.board.classList.remove('open');
                Panel.removeClass(this.categoryFirst, 'color');
                Panel.removeClass(this.categorySecond, 'color');
                Panel.removeClass(this.arrowFirst, 'rotate');
                Panel.removeClass(this.arrowSecond, 'rotate');
                Panel.removeClass(this.listSecond, 'unfold');
                Panel.removeClass(this.listThird, 'unfold');
                Icon.control(this.sticks, 'rotateOdd', 'rotateEven', true);
                setTimeout(rotate, 300);
            }

        }
    }
    return {
        init: new Panel('home')
    }
}('body', window));
