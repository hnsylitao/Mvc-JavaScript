(function () {
    var _controller = {

        start: function () {
            var that = this;
        },

        init: function (option) {
            var that = this;
            $.extend(that.model.setting, option);
            that.model.init();
            that.view.init();
        },

        getmodel: function () {
            var that = this;
            return that.model;
        },

        next: function () {
            var that = this;
            that.model.next();
            that.view.itemrefresh(true);
        },

        prev: function () {
            var that = this;
            that.model.prev();
            that.view.itemrefresh(true);
        },

        to: function (index) {
            var that = this;
            that.model.data.curindex = index;
            that.view.itemrefresh(true);
        }
    }

    var _model = {
        element: new Object(),

        setting: {
            time: 5000,
            speed: 500,
            selector: null,
            nextevent: null,
        },

        data: {
            list: null,
            len: null,
            width: null,
            itemwidth: null,
            curindex: null,
        },

        init: function () {
            var that = this;
            var tg = that.element = $(that.setting.selector);
            that.data.list = tg.children();
            that.data.len = that.data.list.length;
            that.data.width = parseInt(tg.css("width"))
            that.data.itemwidth = parseInt(that.data.list.css("width"));
            that.data.curindex = 0;
        },

        next: function () {
            var that = this;
            if (that.data.curindex + 1 < that.data.len) {
                that.data.curindex++;
            } else {
                that.data.curindex = 0;
            }
        },

        prev: function () {
            var that = this;
            if (that.data.curindex - 1 >= 0) {
                that.data.curindex--;
            } else {
                that.data.curindex = that.data.len - 1;
            }
        }
    }

    var _view = {
        timer: null,

        touches: {
            touchestart: null,
            toucheend: null,
        },

        init: function () {
            var that = this;
            var parent = touchslider;
            var model = parent.getmodel();

            var data = model.data;
            var setting = model.setting;
            var tg = model.element;
            
            tg.width(data.width).css({
                "overflow": "visible",
                "position": "relative"
            });
            tg.bind("touchstart", that.touchstart);
            tg.bind("touchmove", that.touchmove);
            tg.bind("touchend", that.touchend);
            that.itemrefresh(false);
            that.start();

        },

        start: function () {
            var that = this;
            var parent = touchslider;
            var setting = parent.model.setting;

            window.clearInterval(that.timer);
            that.timer = window.setInterval(that.timetik, setting.time);
        },

        stop: function () {
            var that = this;

            window.clearInterval(that.timer);
        },

        timetik: function () {
            var parent = touchslider;
            var that = parent.view;
            var model = parent.getmodel();

            parent.next();
        },

        itemrefresh: function (isanimate) {
            var that = this;
            var parent = touchslider;
            var model = parent.getmodel();

            var data = model.data;
            var setting = model.setting;

            //最后一个应该显示 index
            var lindex = 0, rindex = 0;
            switch (data.curindex) {
                case 0:
                    lindex = (data.len - 1);
                    rindex = (data.curindex + 1);
                    break;
                case (data.len - 1):
                    lindex = data.curindex - 1;
                    rindex = 0;
                    break;
                default:
                    lindex = data.curindex - 1;
                    rindex = (data.curindex + 1);
                    break;
            }

            for (var i = 0; i < data.len; i++) {
                var item = $(data.list.get(i));
                item.css({
                    "position": "absolute",
                    "top": 0 + "px",
                    "width": data.itemwidth + "px",
                    "display": "none",
                });
                //# begin 循环位置
                //item.css({
                //    "transform": 'translateX(' + (data.itemwidth * (i - data.curindex)) + 'px)',
                //});
                if (isanimate) {
                    item.css({
                        "transition": "all " + setting.speed + "ms"
                    });
                } else {
                    item.css({
                        "transition": ""
                    });
                }
                //# end
            }
            var litem = $(data.list.get(lindex));
            var item = $(data.list.get(data.curindex));
            var ritem = $(data.list.get(rindex));

            litem.css({
                "display": "block",
                "transform": 'translateX(' + (data.itemwidth * -1) + 'px)',
            });
            item.css({
                "display": "block",
                "transform": 'translateX(' + 0 + 'px)',
            });
            ritem.css({
                "display": "block",
                "transform": 'translateX(' + (data.itemwidth * 1) + 'px)',
            });
            if (model.setting.nextevent) {
                model.setting.nextevent({
                    index: model.data.curindex,
                })
            }
        },

        touchstart: function (event) {
            var touches = event.originalEvent.changedTouches;
            var parent = touchslider;
            var that = parent.view;
            var model = parent.getmodel();

            var tg = model.element;
            that.touches.touchestart = touches[0];
            that.stop();
        },

        touchmove: function (event) {
            var touches = event.originalEvent.changedTouches;
            var parent = touchslider;
            var that = parent.view;
            var model = parent.getmodel();

            var tg = model.element;
            var touchemove = touches[0].clientX - that.touches.touchestart.clientX;
        },

        touchend: function (event) {
            var touches = event.originalEvent.changedTouches;
            var parent = touchslider;
            var that = parent.view;
            var model = parent.getmodel();

            var tg = model.element;
            that.touches.toucheend = touches[0];

            that.start();
            that.touchcomplete();
        },

        touchcomplete: function () {
            var that = this;
            var parent = touchslider; var model = parent.getmodel();

            var tg = model.element;

            var strat = that.touches.touchestart;
            var end = that.touches.toucheend;
            var isleft = (strat.clientX - end.clientX) > 50;
            var isright = (strat.clientX - end.clientX) < -50;

            if (isleft) {
                parent.next();
            }
            if (isright) {
                parent.prev();
            }
        }
    }


    var touchslider = window.touchslider = _controller;
    touchslider.model = _model;
    touchslider.view = _view;

})();