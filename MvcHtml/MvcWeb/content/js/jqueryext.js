(function () {
    var isWin8 = (typeof (MSApp) === "object");

    function _shimNodes(nodes, obj) {
        if (!nodes)
            return;
        if (nodes.nodeType) {
            obj[obj.length++] = nodes;
            return;
        }
        for (var i = 0, iz = nodes.length; i < iz; i++)
            obj[obj.length++] = nodes[i];
    }

    /**
         * $.create - a faster alertnative to $("<div id='main'>this is some text</div>");
          ```
          $.create("div",{id:'main',innerHTML:'this is some text'});
          $.create("<div id='main'>this is some text</div>");
          ```
          * @param {String} DOM Element type or html
          * @param [{Object}] properties to apply to the element
          * @return {Object} Returns an appframework object
          * @title $.create(type,[params])
          */
    $.create = function (type, props) {
        var elem;
        var f = new $();
        if (props || type[0] !== "<") {
            if (props) {
                if (props.html) {
                    props.innerHTML = props.html;
                    delete props.html;
                }
            }

            elem = document.createElement(type);
            for (var j in props) {
                elem[j] = props[j];
            }
            f[f.length++] = elem;
        } else {
            elem = document.createElement("div");
            if (isWin8) {
                MSApp.execUnsafeLocalFunction(function () {
                    elem.innerHTML = type.trim();
                });
            } else
                elem.innerHTML = type;
            _shimNodes(elem.childNodes, f);
        }
        return f;
    };
})();//$.create
(function () {

    var _controller = {

        start: function () {
            this.view.start();
            this.view.hide();
        },

        alertinit: function (msg) {
            var that = message;

            that.view.fresh();

            that.view.settitle("提示");
            that.view.setmessage(msg);
            that.view.setbtn([
                that.model.btn.jq_messagebtn_ok,
            ]);
            that.view.settools([
                that.model.tools.jq_message_tool_x
            ]);

            that.model.btn.jq_messagebtn_ok.click(function (e) {
                that.view.hide();
            })

            that.model.tools.jq_message_tool_x.click(function (e) {
                that.view.hide();
            });

            that.model.elm.jq_back.children().not(that.model.elm.jq_message).click(function (e) {
                that.view.hide();
                that.model.elm.jq_back.children().not(that.model.elm.jq_message).unbind(e);
            });

            that.view.show();
        },

        confriminit: function (msg, callback) {
            var that = message;

            that.view.fresh();

            that.view.settitle("提示");
            that.view.setmessage(msg);
            that.view.setbtn([
                that.model.btn.jq_messagebtn_yes,
                that.model.btn.jq_messagebtn_no,
            ]);
            //that.view.settools([
            //    that.model.tools.jq_message_tool_x
            //]);

            that.model.btn.jq_messagebtn_yes.click(function (e) {
                that.view.hide();
                callback(true);
            })

            that.model.btn.jq_messagebtn_no.click(function (e) {
                that.view.hide();
                callback(false);
            })

            //that.model.tools.jq_message_tool_x.click(function (e) {
            //    that.view.hide();
            //});

            //that.model.elm.jq_back.children().not(that.model.elm.jq_message).click(function (e) {
            //    that.view.hide();
            //    that.model.elm.jq_back.children().not(that.model.elm.jq_message).unbind(e);
            //});

            that.view.show();
        },

        promptinit: function (msg, callback) {
            var that = message;

            that.view.fresh();

            that.view.settitle("提示");
            that.view.setmessage(msg);
            that.view.setbtn([
                that.model.btn.jq_messagebtn_ok,
            ]);
            //that.view.settools([
            //    that.model.tools.jq_message_tool_x
            //]);
            that.view.setinput([
                that.model.input.jq_messageinput
            ]);

            that.model.btn.jq_messagebtn_ok.click(function (e) {
                that.view.hide();
                callback(that.model.input.jq_messageinput.val());
            })

            //that.model.tools.jq_message_tool_x.click(function (e) {
            //    that.view.hide();
            //});

            //that.model.elm.jq_back.children().not(that.model.elm.jq_message).click(function (e) {
            //    that.view.hide();
            //    that.model.elm.jq_back.children().not(that.model.elm.jq_message).unbind(e);
            //});

            that.view.show();
        }

    };

    var _model = {
        elm: {
            jq_back: null,
            jq_message: null,
            jq_shadow: null,
            jq_messagehead: null,
            jq_messagetitle: null,
            jq_messagetools: null,
            jq_messagebody: null,
            jq_messagefooter: null,
            jq_messagecontent: null,
            jq_messageinputs: null,
        },
        tools: {
            jq_message_tool_x: null,
        },
        btn: {
            jq_messagebtn_ok: null,
            jq_messagebtn_cancel: null,
            jq_messagebtn_yes: null,
            jq_messagebtn_no: null,
        },
        input: {
            jq_messageinput: null,
        }
    };

    var _view = {

        start: function () {
            var model = message.model;

            model.elm.jq_back = jq_back = $.create("div", {
                className: "jq_back"
            });

            model.elm.jq_message = jq_message = $.create("div", {
                className: "jq_message"
            });
            model.elm.jq_shadow = jq_shadow = $.create("div", {
                className: "jq_shadow"
            });

            model.elm.jq_messagehead = jq_messagehead = $.create("div", {
                className: "jq_messagehead"
            });
            model.elm.jq_messagebody = jq_messagebody = $.create("div", {
                className: "jq_messagebody"
            });
            model.elm.jq_messagefooter = jq_messagefooter = $.create("div", {
                className: "jq_messagefooter"
            });

            model.elm.jq_messagecontent = jq_messagecontent = $.create("div", {
                className: "jq_messagecontent"
            });
            model.elm.jq_messageinputs = jq_messageinputs = $.create("div", {
                className: "jq_messageinputs"
            });


            model.elm.jq_messagetitle = jq_messagetitle = $.create("span", {
                className: "jq_messagetitle"
            });
            model.elm.jq_messagetools = jq_messagetools = $.create("div", {
                className: "jq_messagetools"
            });

            model.input.jq_messageinput = jq_messageinput = $.create("input", {
                className: "jq_messageinput",
                type: "text"
            });


            jq_messagehead.append(jq_messagetitle).append(jq_messagetools);
            jq_messagebody.append(jq_messagecontent).append(jq_messageinputs);
            jq_message.append(jq_messagehead).append(jq_messagebody).append(jq_messagefooter);
            jq_back.append(jq_message).append(jq_shadow);

            model.tools.jq_message_tool_x = $.create("span", {
                html: "X"
            });
            model.btn.jq_messagebtn_ok = $.create("span", {
                className: "jq_messagebtn",
                html: "确定"
            });
            model.btn.jq_messagebtn_cancel = $.create("span", {
                className: "jq_messagebtn",
                html: "取消"
            });
            model.btn.jq_messagebtn_yes = $.create("span", {
                className: "jq_messagebtn",
                html: "是"
            });
            model.btn.jq_messagebtn_no = $.create("span", {
                className: "jq_messagebtn",
                html: "否"
            });

            $(document.body).append(jq_back);

        },

        show: function () {
            var model = message.model;
            model.elm.jq_back.fadeIn(300);
            model.elm.jq_message.fadeIn(300);
        },

        hide: function () {
            var model = message.model;
            model.elm.jq_back.hide();
            model.elm.jq_message.hide();
        },

        settitle: function (title) {
            var model = message.model;
            model.elm.jq_messagetitle.text(title);
        },

        setmessage: function (msg) {
            var model = message.model;
            model.elm.jq_messagecontent.text(msg);
        },

        setbtn: function (options) {
            var model = message.model;
            model.elm.jq_messagefooter.children().remove();
            for (var i = 0; i < options.length; i++) {
                model.elm.jq_messagefooter.append(options[i]);
            }
        },

        setinput: function (options) {
            var model = message.model;
            model.elm.jq_messageinputs.children().remove();
            for (var i = 0; i < options.length; i++) {
                model.elm.jq_messageinputs.append(options[i]);
            }
        },

        settools: function (options) {
            var model = message.model;
            model.elm.jq_messagetools.children().remove();
            for (var i = 0; i < options.length; i++) {
                model.elm.jq_messagetools.append(options[i]);
            }
        },

        fresh: function () {
            var that = this;
            var model = message.model;

            model.input.jq_messageinput.val("");

            that.settitle("");
            that.setmessage("");
            that.setbtn([]);
            that.setinput([]);
            that.settools([]);
            that.hide();
        }
    };

    var message = _controller;
    message.model = _model;
    message.view = _view;
    message.start();


    $.alert = message.alertinit;
    $.confrim = message.confriminit;
    $.prompt = message.promptinit;
})();//$.alert $.confrim $.prompt