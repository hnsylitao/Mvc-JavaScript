var app = {

    data: {
        autoluanch:true,//是否自动执行
        launchCompleted: false,//是否执行成功
    },
    //init
    init: function () {
        var that = this;
        //把 ext 所有对象 继承 mvc 式写法
        that._controller.model = that._model;
        that._controller.view = that._view;
        for (obj in that.ext) {
            $.extend(that.ext[obj], that._controller);
        }
        //2.挂载mvc:init   判断 document 执行状态 是否完成
        if (document.readyState === "complete" || document.readyState === "loaded") {
            $(window).one("mvc:init", function () {
                if (that.data.autoluanch) {
                    that.start();
                }
            });
        } else {
            //未执行完成 挂载ready 自动执行
            $(document).ready(
                function () {
                    //挂载一次执行mvc:init
                    $(window).one("mvc:init", function () {
                        if (that.data.autoluanch) {
                            that.start();
                        }
                    });
                },
            false);
        }
    },

    //执行ready
    ready: function (param) {
        //若未执行完成则 挂载 mvc :ready 等待start 触发ready 执行完成则 执行方法
        if (!this.data.launchCompleted) {
            $(document).one("mvc:ready", function () {
                param();
            });
        } else {
            param();
        }
    },

    //若是autoluanch = false 则可以手动执行改函数达到 启动效果
    start: function () {

        $(document).trigger("mvc:ready");
        //触发 ext 所有对象 start 方法
        for (obj in this.ext) {
            //自动执行 start
            this.ext[obj].start();
        }
        //启动成功
        this.data.launchCompleted = true;
    },

    //插件...
    ext: {
        touchslider: new Object(),
        views: new Object(),
        touchview:new Object(),
    },

    //mvc 原型 model
    _model: {
        data:new Object(),
        start: function () { },
        add: function () { },
        remove: function () { },
        set: function () { },
        get: function () { },
    },

    //mvc 原型 view
    _view: {
        start: function () { },
    },

    //mvc 原型 controller
    _controller: {
        start: function () { },
    }
};
//1.执行init 
app.init();
$(document).ready(function () {
    //3.触发mvc:init 在此之前可以 框架样式的load 及数据的初始化 等等
    $(window).trigger("mvc:init");
});
