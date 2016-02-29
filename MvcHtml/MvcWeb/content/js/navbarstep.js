(function () {
    var _controller = {

        init: function (option) {
            var that = this;
            $.extend(that.model.setting, option);
        },

    }

    var _model = {

        element: {

        },

        setting: {
            navbar: null,
            navbarcallback: function (e) {
                
                $(this.navbar).css("width", e + "%");
            },
            step: [],
            stepnextcallback: function (e) {
                $(this.step[e.prev].step).removeClass("active");
                $(this.step[e.cur].step).addClass("active");
                $(this.step[e.next].step);
            }
        },

        data: {
            list: null,
            len: null,
            width: null,
            itemwidth: null,
            curindex: null,
        },

    }

    var _view = {

        init: function () {
            var that = this;

        },
    }

    var navbarstep = window.navbarstep = _controller;
    navbarstep.model = _model;
    navbarstep.view = _view;

})();