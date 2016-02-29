(function($){

    var extend = function () {
        return $.extend.apply(this, arguments);
    }

    var icore = (function ($) {

        /*apply*/
        var apply = function (fun, doc, args) {
            var doc = fun.apply(doc, args)
            var icore = converticore(doc);
            return icore;
        };

        /*jquery 强转icore*/
        var converticore = function (doc) {
            var icore = [];

            for (var i = 0; i < doc.length; i++) {
                icore.push(doc[i]);
            }

            var icorefun = {

                add: function () {
                    return apply(doc.add, doc, arguments);
                },

                addClass: function () {
                    return apply(doc.addClass, doc, arguments);
                },
            };

            extend(icore, icorefun);

            return icore;
        }

        /*icore*/
        return function () {

            /*Jquery 对象*/
            var doc = $.apply(this, arguments);
            /*icore 对象*/
            var icore = converticore(doc);
            /**/
            return icore;
        };

    })(jQuery);

    extend(icore, (function () {
        return {
            extend: extend,

            test: function () {
                alert(1);
            },
        }
    })());

    window.icore = icore;

})(jQuery);