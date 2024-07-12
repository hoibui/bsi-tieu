!function (c, u, g, b) {
    "use strict";
    if (c.console = c.console || {
        info: function (t) {
        }
    }, g)
        if (g.fn.fancybox) console.info("fancyBox already initialized");
        else {
            var t, e, n, o, a = {
                    closeExisting: !1,
                    loop: !1,
                    gutter: 50,
                    keyboard: !0,
                    preventCaptionOverlap: !0,
                    arrows: !0,
                    infobar: !0,
                    smallBtn: "auto",
                    toolbar: "auto",
                    buttons: ["zoom", "slideShow", "thumbs", "close"],
                    idleTime: 3,
                    protect: !1,
                    modal: !1,
                    image: {preload: !1},
                    ajax: {settings: {data: {fancybox: !0}}},
                    iframe: {
                        tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                        preload: !0,
                        css: {},
                        attr: {scrolling: "auto"}
                    },
                    video: {
                        tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                        format: "",
                        autoStart: !0
                    },
                    defaultType: "image",
                    animationEffect: "zoom",
                    animationDuration: 366,
                    zoomOpacity: "auto",
                    transitionEffect: "fade",
                    transitionDuration: 366,
                    slideClass: "",
                    baseClass: "",
                    baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                    spinnerTpl: '<div class="fancybox-loading"></div>',
                    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                    btnTpl: {
                        download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                        zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                        close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                        arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                        arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                        smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                    },
                    parentEl: "body",
                    hideScrollbar: !0,
                    autoFocus: !0,
                    backFocus: !0,
                    trapFocus: !0,
                    fullScreen: {autoStart: !1},
                    touch: {vertical: !0, momentum: !0},
                    hash: null,
                    media: {},
                    slideShow: {autoStart: !1, speed: 3e3},
                    thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y"},
                    wheel: "auto",
                    onInit: g.noop,
                    beforeLoad: g.noop,
                    afterLoad: g.noop,
                    beforeShow: g.noop,
                    afterShow: g.noop,
                    beforeClose: g.noop,
                    afterClose: g.noop,
                    onActivate: g.noop,
                    onDeactivate: g.noop,
                    clickContent: function (t, e) {
                        return "image" === t.type && "zoom"
                    },
                    clickSlide: "close",
                    clickOutside: "close",
                    dblclickContent: !1,
                    dblclickSlide: !1,
                    dblclickOutside: !1,
                    mobile: {
                        preventCaptionOverlap: !1, idleTime: !1, clickContent: function (t, e) {
                            return "image" === t.type && "toggleControls"
                        }, clickSlide: function (t, e) {
                            return "image" === t.type ? "toggleControls" : "close"
                        }, dblclickContent: function (t, e) {
                            return "image" === t.type && "zoom"
                        }, dblclickSlide: function (t, e) {
                            return "image" === t.type && "zoom"
                        }
                    },
                    lang: "en",
                    i18n: {
                        en: {
                            CLOSE: "Close",
                            NEXT: "Next",
                            PREV: "Previous",
                            ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                            PLAY_START: "Start slideshow",
                            PLAY_STOP: "Pause slideshow",
                            FULL_SCREEN: "Full screen",
                            THUMBS: "Thumbnails",
                            DOWNLOAD: "Download",
                            SHARE: "Share",
                            ZOOM: "Zoom"
                        },
                        de: {
                            CLOSE: "Schlie&szlig;en",
                            NEXT: "Weiter",
                            PREV: "Zur&uuml;ck",
                            ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                            PLAY_START: "Diaschau starten",
                            PLAY_STOP: "Diaschau beenden",
                            FULL_SCREEN: "Vollbild",
                            THUMBS: "Vorschaubilder",
                            DOWNLOAD: "Herunterladen",
                            SHARE: "Teilen",
                            ZOOM: "Vergr&ouml;&szlig;ern"
                        }
                    }
                },
                i = g(c),
                s = g(u),
                r = 0,
                f = c.requestAnimationFrame || c.webkitRequestAnimationFrame || c.mozRequestAnimationFrame || c.oRequestAnimationFrame || function (t) {
                    return c.setTimeout(t, 1e3 / 60)
                },
                l = c.cancelAnimationFrame || c.webkitCancelAnimationFrame || c.mozCancelAnimationFrame || c.oCancelAnimationFrame || function (t) {
                    c.clearTimeout(t)
                },
                d = function () {
                    var t, e = u.createElement("fakeelement"),
                        n = {
                            transition: "transitionend",
                            OTransition: "oTransitionEnd",
                            MozTransition: "transitionend",
                            WebkitTransition: "webkitTransitionEnd"
                        };
                    for (t in n)
                        if (e.style[t] !== b) return n[t];
                    return "transitionend"
                }(),
                p = function (t) {
                    return t && t.length && t[0].offsetHeight
                },
                h = function (t, e) {
                    var n = g.extend(!0, {}, t, e);
                    return g.each(e, function (t, e) {
                        g.isArray(e) && (n[t] = e)
                    }), n
                },
                m = function (t, e, n) {
                    var o = this;
                    o.opts = h({index: n}, g.fancybox.defaults), g.isPlainObject(e) && (o.opts = h(o.opts, e)), g.fancybox.isMobile && (o.opts = h(o.opts, o.opts.mobile)), o.id = o.opts.id || ++r, o.currIndex = parseInt(o.opts.index, 10) || 0, o.prevIndex = null, o.prevPos = null, o.currPos = 0, o.firstRun = !0, o.group = [], o.slides = {}, o.addContent(t), o.group.length && o.init()
                };
            g.extend(m.prototype, {
                init: function () {
                    var e, n, o = this,
                        a = o.group[o.currIndex].opts;
                    a.closeExisting && g.fancybox.close(!0), g("body").addClass("fancybox-active"), !g.fancybox.getInstance() && !1 !== a.hideScrollbar && !g.fancybox.isMobile && u.body.scrollHeight > c.innerHeight && (g("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (c.innerWidth - u.documentElement.clientWidth) + "px;}</style>"), g("body").addClass("compensate-for-scrollbar")), n = "", g.each(a.buttons, function (t, e) {
                        n += a.btnTpl[e] || ""
                    }), e = g(o.translate(o, a.baseTpl.replace("{{buttons}}", n).replace("{{arrows}}", a.btnTpl.arrowLeft + a.btnTpl.arrowRight))).attr("id", "fancybox-container-" + o.id).addClass(a.baseClass).data("FancyBox", o).appendTo(a.parentEl), o.$refs = {container: e}, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (t) {
                        o.$refs[t] = e.find(".fancybox-" + t)
                    }), o.trigger("onInit"), o.activate(), o.jumpTo(o.currIndex)
                }, translate: function (t, e) {
                    var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
                    return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
                        return n[e] === b ? t : n[e]
                    })
                }, addContent: function (t) {
                    var e, l = this,
                        n = g.makeArray(t);
                    g.each(n, function (t, e) {
                        var n, o, a, i, s, r = {},
                            c = {};
                        g.isPlainObject(e) ? c = (r = e).opts || e : "object" === g.type(e) && g(e).length ? (c = (n = g(e)).data() || {}, (c = g.extend(!0, {}, c, c.options)).$orig = n, r.src = l.opts.src || c.src || n.attr("href"), r.type || r.src || (r.type = "inline", r.src = e)) : r = {
                            type: "html",
                            src: e + ""
                        }, r.opts = g.extend(!0, {}, l.opts, c), g.isArray(c.buttons) && (r.opts.buttons = c.buttons), g.fancybox.isMobile && r.opts.mobile && (r.opts = h(r.opts, r.opts.mobile)), o = r.type || r.opts.type, i = r.src || "", !o && i && ((a = i.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (o = "video", r.opts.video.format || (r.opts.video.format = "video/" + ("ogv" === a[1] ? "ogg" : a[1]))) : i.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? o = "image" : i.match(/\.(pdf)((\?|#).*)?$/i) ? (o = "iframe", r = g.extend(!0, r, {
                            contentType: "pdf",
                            opts: {iframe: {preload: !1}}
                        })) : "#" === i.charAt(0) && (o = "inline")), o ? r.type = o : l.trigger("objectNeedsType", r), r.contentType || (r.contentType = -1 < g.inArray(r.type, ["html", "inline", "ajax"]) ? "html" : r.type), r.index = l.group.length, "auto" == r.opts.smallBtn && (r.opts.smallBtn = -1 < g.inArray(r.type, ["html", "inline", "ajax"])), "auto" === r.opts.toolbar && (r.opts.toolbar = !r.opts.smallBtn), r.$thumb = r.opts.$thumb || null, r.opts.$trigger && r.index === l.opts.index && (r.$thumb = r.opts.$trigger.find("img:first"), r.$thumb.length && (r.opts.$orig = r.opts.$trigger)), r.$thumb && r.$thumb.length || !r.opts.$orig || (r.$thumb = r.opts.$orig.find("img:first")), r.$thumb && !r.$thumb.length && (r.$thumb = null), r.thumb = r.opts.thumb || (r.$thumb ? r.$thumb[0].src : null), "function" === g.type(r.opts.caption) && (r.opts.caption = r.opts.caption.apply(e, [l, r])), "function" === g.type(l.opts.caption) && (r.opts.caption = l.opts.caption.apply(e, [l, r])), r.opts.caption instanceof g || (r.opts.caption = r.opts.caption === b ? "" : r.opts.caption + ""), "ajax" === r.type && 1 < (s = i.split(/\s+/, 2)).length && (r.src = s.shift(), r.opts.filter = s.shift()), r.opts.modal && (r.opts = g.extend(!0, r.opts, {
                            trapFocus: !0,
                            infobar: 0,
                            toolbar: 0,
                            smallBtn: 0,
                            keyboard: 0,
                            slideShow: 0,
                            fullScreen: 0,
                            thumbs: 0,
                            touch: 0,
                            clickContent: !1,
                            clickSlide: !1,
                            clickOutside: !1,
                            dblclickContent: !1,
                            dblclickSlide: !1,
                            dblclickOutside: !1
                        })), l.group.push(r)
                    }), Object.keys(l.slides).length && (l.updateControls(), (e = l.Thumbs) && e.isActive && (e.create(), e.focus()))
                }, addEvents: function () {
                    var o = this;
                    o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
                        t.stopPropagation(), t.preventDefault(), o.close(t)
                    }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (t) {
                        t.stopPropagation(), t.preventDefault(), o.previous()
                    }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (t) {
                        t.stopPropagation(), t.preventDefault(), o.next()
                    }).on("click.fb", "[data-fancybox-zoom]", function (t) {
                        o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                    }), i.on("orientationchange.fb resize.fb", function (t) {
                        t && t.originalEvent && "resize" === t.originalEvent.type ? (o.requestId && l(o.requestId), o.requestId = f(function () {
                            o.update(t)
                        })) : (o.current && "iframe" === o.current.type && o.$refs.stage.hide(), setTimeout(function () {
                            o.$refs.stage.show(), o.update(t)
                        }, g.fancybox.isMobile ? 600 : 250))
                    }), s.on("keydown.fb", function (t) {
                        var e = (g.fancybox ? g.fancybox.getInstance() : null).current,
                            n = t.keyCode || t.which;
                        if (9 != n) {
                            if (!(!e.opts.keyboard || t.ctrlKey || t.altKey || t.shiftKey || g(t.target).is("input,textarea,video,audio,select"))) return 8 === n || 27 === n ? (t.preventDefault(), void o.close(t)) : 37 === n || 38 === n ? (t.preventDefault(), void o.previous()) : 39 === n || 40 === n ? (t.preventDefault(), void o.next()) : void o.trigger("afterKeydown", t, n)
                        } else e.opts.trapFocus && o.focus(t)
                    }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, s.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (t) {
                        o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1
                    }), o.idleInterval = c.setInterval(function () {
                        o.idleSecondsCounter++, o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && !o.isDragging && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls())
                    }, 1e3))
                }, removeEvents: function () {
                    i.off("orientationchange.fb resize.fb"), s.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), this.idleInterval && (c.clearInterval(this.idleInterval), this.idleInterval = null)
                }, previous: function (t) {
                    return this.jumpTo(this.currPos - 1, t)
                }, next: function (t) {
                    return this.jumpTo(this.currPos + 1, t)
                }, jumpTo: function (t, o) {
                    var e, n, a, i, s, r, c, l, d, u = this,
                        f = u.group.length;
                    if (!(u.isDragging || u.isClosing || u.isAnimating && u.firstRun)) {
                        if (t = parseInt(t, 10), !(a = u.current ? u.current.opts.loop : u.opts.loop) && (t < 0 || f <= t)) return !1;
                        if (e = u.firstRun = !Object.keys(u.slides).length, s = u.current, u.prevIndex = u.currIndex, u.prevPos = u.currPos, i = u.createSlide(t), 1 < f && ((a || i.index < f - 1) && u.createSlide(t + 1), (a || 0 < i.index) && u.createSlide(t - 1)), u.current = i, u.currIndex = i.index, u.currPos = i.pos, u.trigger("beforeShow", e), u.updateControls(), i.forcedDuration = b, g.isNumeric(o) ? i.forcedDuration = o : o = i.opts[e ? "animationDuration" : "transitionDuration"], o = parseInt(o, 10), n = u.isMoved(i), i.$slide.addClass("fancybox-slide--current"), e) return i.opts.animationEffect && o && u.$refs.container.css("transition-duration", o + "ms"), u.$refs.container.addClass("fancybox-is-open").trigger("focus"), u.loadSlide(i), void u.preload("image");
                        r = g.fancybox.getTranslate(s.$slide), c = g.fancybox.getTranslate(u.$refs.stage), g.each(u.slides, function (t, e) {
                            g.fancybox.stop(e.$slide, !0)
                        }), s.pos !== i.pos && (s.isComplete = !1), s.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), n ? (d = r.left - (s.pos * r.width + s.pos * s.opts.gutter), g.each(u.slides, function (t, e) {
                            e.$slide.removeClass("fancybox-animated").removeClass(function (t, e) {
                                return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                            });
                            var n = e.pos * r.width + e.pos * e.opts.gutter;
                            g.fancybox.setTranslate(e.$slide, {
                                top: 0,
                                left: n - c.left + d
                            }), e.pos !== i.pos && e.$slide.addClass("fancybox-slide--" + (e.pos > i.pos ? "next" : "previous")), p(e.$slide), g.fancybox.animate(e.$slide, {
                                top: 0,
                                left: (e.pos - i.pos) * r.width + (e.pos - i.pos) * e.opts.gutter
                            }, o, function () {
                                e.$slide.css({
                                    transform: "",
                                    opacity: ""
                                }).removeClass("fancybox-slide--next fancybox-slide--previous"), e.pos === u.currPos && u.complete()
                            })
                        })) : o && i.opts.transitionEffect && (l = "fancybox-animated fancybox-fx-" + i.opts.transitionEffect, s.$slide.addClass("fancybox-slide--" + (s.pos > i.pos ? "next" : "previous")), g.fancybox.animate(s.$slide, l, o, function () {
                            s.$slide.removeClass(l).removeClass("fancybox-slide--next fancybox-slide--previous")
                        }, !1)), i.isLoaded ? u.revealContent(i) : u.loadSlide(i), u.preload("image")
                    }
                }, createSlide: function (t) {
                    var e, n, o = this;
                    return n = (n = t % o.group.length) < 0 ? o.group.length + n : n, !o.slides[t] && o.group[n] && (e = g('<div class="fancybox-slide"></div>').appendTo(o.$refs.stage), o.slides[t] = g.extend(!0, {}, o.group[n], {
                        pos: t,
                        $slide: e,
                        isLoaded: !1
                    }), o.updateSlide(o.slides[t])), o.slides[t]
                }, scaleToActual: function (t, e, n) {
                    var o, a, i, s, r, c = this,
                        l = c.current,
                        d = l.$content,
                        u = g.fancybox.getTranslate(l.$slide).width,
                        f = g.fancybox.getTranslate(l.$slide).height,
                        p = l.width,
                        h = l.height;
                    c.isAnimating || c.isMoved() || !d || "image" != l.type || !l.isLoaded || l.hasError || (c.isAnimating = !0, g.fancybox.stop(d), t = t === b ? .5 * u : t, e = e === b ? .5 * f : e, (o = g.fancybox.getTranslate(d)).top -= g.fancybox.getTranslate(l.$slide).top, o.left -= g.fancybox.getTranslate(l.$slide).left, s = p / o.width, r = h / o.height, a = .5 * u - .5 * p, i = .5 * f - .5 * h, u < p && (0 < (a = o.left * s - (t * s - t)) && (a = 0), a < u - p && (a = u - p)), f < h && (0 < (i = o.top * r - (e * r - e)) && (i = 0), i < f - h && (i = f - h)), c.updateCursor(p, h), g.fancybox.animate(d, {
                        top: i,
                        left: a,
                        scaleX: s,
                        scaleY: r
                    }, n || 366, function () {
                        c.isAnimating = !1
                    }), c.SlideShow && c.SlideShow.isActive && c.SlideShow.stop())
                }, scaleToFit: function (t) {
                    var e, n = this,
                        o = n.current,
                        a = o.$content;
                    n.isAnimating || n.isMoved() || !a || "image" != o.type || !o.isLoaded || o.hasError || (n.isAnimating = !0, g.fancybox.stop(a), e = n.getFitPos(o), n.updateCursor(e.width, e.height), g.fancybox.animate(a, {
                        top: e.top,
                        left: e.left,
                        scaleX: e.width / a.width(),
                        scaleY: e.height / a.height()
                    }, t || 366, function () {
                        n.isAnimating = !1
                    }))
                }, getFitPos: function (t) {
                    var e, n, o, a, i = t.$content,
                        s = t.$slide,
                        r = t.width || t.opts.width,
                        c = t.height || t.opts.height,
                        l = {};
                    return !!(t.isLoaded && i && i.length) && (e = g.fancybox.getTranslate(this.$refs.stage).width, n = g.fancybox.getTranslate(this.$refs.stage).height, e -= parseFloat(s.css("paddingLeft")) + parseFloat(s.css("paddingRight")) + parseFloat(i.css("marginLeft")) + parseFloat(i.css("marginRight")), n -= parseFloat(s.css("paddingTop")) + parseFloat(s.css("paddingBottom")) + parseFloat(i.css("marginTop")) + parseFloat(i.css("marginBottom")), r && c || (r = e, c = n), e - .5 < (r *= o = Math.min(1, e / r, n / c)) && (r = e), n - .5 < (c *= o) && (c = n), "image" === t.type ? (l.top = Math.floor(.5 * (n - c)) + parseFloat(s.css("paddingTop")), l.left = Math.floor(.5 * (e - r)) + parseFloat(s.css("paddingLeft"))) : "video" === t.contentType && (r / (a = t.opts.width && t.opts.height ? r / c : t.opts.ratio || 16 / 9) < c ? c = r / a : c * a < r && (r = c * a)), l.width = r, l.height = c, l)
                }, update: function (n) {
                    var o = this;
                    g.each(o.slides, function (t, e) {
                        o.updateSlide(e, n)
                    })
                }, updateSlide: function (t, e) {
                    var n = this,
                        o = t && t.$content,
                        a = t.width || t.opts.width,
                        i = t.height || t.opts.height,
                        s = t.$slide;
                    n.adjustCaption(t), o && (a || i || "video" === t.contentType) && !t.hasError && (g.fancybox.stop(o), g.fancybox.setTranslate(o, n.getFitPos(t)), t.pos === n.currPos && (n.isAnimating = !1, n.updateCursor())), n.adjustLayout(t), s.length && (s.trigger("refresh"), t.pos === n.currPos && n.$refs.toolbar.add(n.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", s.get(0).scrollHeight > s.get(0).clientHeight)), n.trigger("onUpdate", t, e)
                }, centerSlide: function (t) {
                    var e = this,
                        n = e.current,
                        o = n.$slide;
                    !e.isClosing && n && (o.siblings().css({
                        transform: "",
                        opacity: ""
                    }), o.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), g.fancybox.animate(o, {
                        top: 0,
                        left: 0,
                        opacity: 1
                    }, t === b ? 0 : t, function () {
                        o.css({transform: "", opacity: ""}), n.isComplete || e.complete()
                    }, !1))
                }, isMoved: function (t) {
                    var e, n, o = t || this.current;
                    return !!o && (n = g.fancybox.getTranslate(this.$refs.stage), e = g.fancybox.getTranslate(o.$slide), !o.$slide.hasClass("fancybox-animated") && (.5 < Math.abs(e.top - n.top) || .5 < Math.abs(e.left - n.left)))
                }, updateCursor: function (t, e) {
                    var n, o, a = this,
                        i = a.current,
                        s = a.$refs.container;
                    i && !a.isClosing && a.Guestures && (s.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), o = !!(n = a.canPan(t, e)) || a.isZoomable(), s.toggleClass("fancybox-is-zoomable", o), g("[data-fancybox-zoom]").prop("disabled", !o), n ? s.addClass("fancybox-can-pan") : o && ("zoom" === i.opts.clickContent || g.isFunction(i.opts.clickContent) && "zoom" == i.opts.clickContent(i)) ? s.addClass("fancybox-can-zoomIn") : i.opts.touch && (i.opts.touch.vertical || 1 < a.group.length) && "video" !== i.contentType && s.addClass("fancybox-can-swipe"))
                }, isZoomable: function () {
                    var t, e = this.current;
                    if (e && !this.isClosing && "image" === e.type && !e.hasError) {
                        if (!e.isLoaded) return !0;
                        if ((t = this.getFitPos(e)) && (e.width > t.width || e.height > t.height)) return !0
                    }
                    return !1
                }, isScaledDown: function (t, e) {
                    var n = !1,
                        o = this.current,
                        a = o.$content;
                    return t !== b && e !== b ? n = t < o.width && e < o.height : a && (n = (n = g.fancybox.getTranslate(a)).width < o.width && n.height < o.height), n
                }, canPan: function (t, e) {
                    var n = this.current,
                        o = null,
                        a = !1;
                    return "image" === n.type && (n.isComplete || t && e) && !n.hasError && (a = this.getFitPos(n), t !== b && e !== b ? o = {
                        width: t,
                        height: e
                    } : n.isComplete && (o = g.fancybox.getTranslate(n.$content)), o && a && (a = 1.5 < Math.abs(o.width - a.width) || 1.5 < Math.abs(o.height - a.height))), a
                }, loadSlide: function (n) {
                    var t, e, o, a = this;
                    if (!n.isLoading && !n.isLoaded) {
                        if (!(n.isLoading = !0) === a.trigger("beforeLoad", n)) return n.isLoading = !1;
                        switch (t = n.type, (e = n.$slide).off("refresh").trigger("onReset").addClass(n.opts.slideClass), t) {
                            case "image":
                                a.setImage(n);
                                break;
                            case "iframe":
                                a.setIframe(n);
                                break;
                            case "html":
                                a.setContent(n, n.src || n.content);
                                break;
                            case "video":
                                a.setContent(n, n.opts.video.tpl.replace(/\{\{src\}\}/gi, n.src).replace("{{format}}", n.opts.videoFormat || n.opts.video.format || "").replace("{{poster}}", n.thumb || ""));
                                break;
                            case "inline":
                                g(n.src).length ? a.setContent(n, g(n.src)) : a.setError(n);
                                break;
                            case "ajax":
                                a.showLoading(n), o = g.ajax(g.extend({}, n.opts.ajax.settings, {
                                    url: n.src,
                                    success: function (t, e) {
                                        "success" === e && a.setContent(n, t)
                                    },
                                    error: function (t, e) {
                                        t && "abort" !== e && a.setError(n)
                                    }
                                })), e.one("onReset", function () {
                                    o.abort()
                                });
                                break;
                            default:
                                a.setError(n)
                        }
                        return !0
                    }
                }, setImage: function (e) {
                    var t, n = this;
                    setTimeout(function () {
                        var t = e.$image;
                        n.isClosing || !e.isLoading || t && t.length && t[0].complete || e.hasError || n.showLoading(e)
                    }, 50), n.checkSrcset(e), e.$content = g('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")), !1 !== e.opts.preload && e.opts.width && e.opts.height && e.thumb && (e.width = e.opts.width, e.height = e.opts.height, (t = u.createElement("img")).onerror = function () {
                        g(this).remove(), e.$ghost = null
                    }, t.onload = function () {
                        n.afterLoad(e)
                    }, e.$ghost = g(t).addClass("fancybox-image").appendTo(e.$content).attr("src", e.thumb)), n.setBigImage(e)
                }, checkSrcset: function (t) {
                    var e, n, o, a, i = t.opts.srcset || t.opts.image.srcset;
                    if (i) {
                        o = c.devicePixelRatio || 1, a = c.innerWidth * o, (n = i.split(",").map(function (t) {
                            var o = {};
                            return t.trim().split(/\s+/).forEach(function (t, e) {
                                var n = parseInt(t.substring(0, t.length - 1), 10);
                                if (0 === e) return o.url = t;
                                n && (o.value = n, o.postfix = t[t.length - 1])
                            }), o
                        })).sort(function (t, e) {
                            return t.value - e.value
                        });
                        for (var s = 0; s < n.length; s++) {
                            var r = n[s];
                            if ("w" === r.postfix && r.value >= a || "x" === r.postfix && r.value >= o) {
                                e = r;
                                break
                            }
                        }
                        !e && n.length && (e = n[n.length - 1]), e && (t.src = e.url, t.width && t.height && "w" == e.postfix && (t.height = t.width / t.height * e.value, t.width = e.value), t.opts.srcset = i)
                    }
                }, setBigImage: function (e) {
                    var n = this,
                        t = u.createElement("img"),
                        o = g(t);
                    e.$image = o.one("error", function () {
                        n.setError(e)
                    }).one("load", function () {
                        var t;
                        e.$ghost || (n.resolveImageSlideSize(e, this.naturalWidth, this.naturalHeight), n.afterLoad(e)), n.isClosing || (e.opts.srcset && ((t = e.opts.sizes) && "auto" !== t || (t = (1 < e.width / e.height && 1 < i.width() / i.height() ? "100" : Math.round(e.width / e.height * 100)) + "vw"), o.attr("sizes", t).attr("srcset", e.opts.srcset)), e.$ghost && setTimeout(function () {
                            e.$ghost && !n.isClosing && e.$ghost.hide()
                        }, Math.min(300, Math.max(1e3, e.height / 1600))), n.hideLoading(e))
                    }).addClass("fancybox-image").attr("src", e.src).appendTo(e.$content), (t.complete || "complete" == t.readyState) && o.naturalWidth && o.naturalHeight ? o.trigger("load") : t.error && o.trigger("error")
                }, resolveImageSlideSize: function (t, e, n) {
                    var o = parseInt(t.opts.width, 10),
                        a = parseInt(t.opts.height, 10);
                    t.width = e, t.height = n, 0 < o && (t.width = o, t.height = Math.floor(o * n / e)), 0 < a && (t.width = Math.floor(a * e / n), t.height = a)
                }, setIframe: function (a) {
                    var i, e = this,
                        s = a.opts.iframe,
                        r = a.$slide;
                    a.$content = g('<div class="fancybox-content' + (s.preload ? " fancybox-is-hidden" : "") + '"></div>').css(s.css).appendTo(r), r.addClass("fancybox-slide--" + a.contentType), a.$iframe = i = g(s.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(s.attr).appendTo(a.$content), s.preload ? (e.showLoading(a), i.on("load.fb error.fb", function (t) {
                        this.isReady = 1, a.$slide.trigger("refresh"), e.afterLoad(a)
                    }), r.on("refresh.fb", function () {
                        var t, e = a.$content,
                            n = s.css.width,
                            o = s.css.height;
                        if (1 === i[0].isReady) {
                            try {
                                t = i.contents().find("body")
                            } catch (t) {
                            }
                            t && t.length && t.children().length && (r.css("overflow", "visible"), e.css({
                                width: "100%",
                                "max-width": "100%",
                                height: "9999px"
                            }), n === b && (n = Math.ceil(Math.max(t[0].clientWidth, t.outerWidth(!0)))), e.css("width", n || "").css("max-width", ""), o === b && (o = Math.ceil(Math.max(t[0].clientHeight, t.outerHeight(!0)))), e.css("height", o || ""), r.css("overflow", "auto")), e.removeClass("fancybox-is-hidden")
                        }
                    })) : e.afterLoad(a), i.attr("src", a.src), r.one("onReset", function () {
                        try {
                            g(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                        } catch (t) {
                        }
                        g(this).off("refresh.fb").empty(), a.isLoaded = !1, a.isRevealed = !1
                    })
                }, setContent: function (t, e) {
                    var n;
                    this.isClosing || (this.hideLoading(t), t.$content && g.fancybox.stop(t.$content), t.$slide.empty(), (n = e) && n.hasOwnProperty && n instanceof g && e.parent().length ? ((e.hasClass("fancybox-content") || e.parent().hasClass("fancybox-content")) && e.parents(".fancybox-slide").trigger("onReset"), t.$placeholder = g("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === g.type(e) && (e = g("<div>").append(g.trim(e)).contents()), t.opts.filter && (e = g("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () {
                        g(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (g(this).empty(), t.isLoaded = !1, t.isRevealed = !1)
                    }), g(e).appendTo(t.$slide), g(e).is("video,audio") && (g(e).addClass("fancybox-video"), g(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || g(e).attr("width"), t.opts.height = t.opts.height || g(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), t.$content.siblings().hide(), t.$content.length || (t.$content = t.$slide.wrapInner("<div></div>").children().first()), t.$content.addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), this.afterLoad(t))
                }, setError: function (t) {
                    t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
                }, showLoading: function (t) {
                    (t = t || this.current) && !t.$spinner && (t.$spinner = g(this.translate(this, this.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))
                }, hideLoading: function (t) {
                    (t = t || this.current) && t.$spinner && (t.$spinner.stop().remove(), delete t.$spinner)
                }, afterLoad: function (t) {
                    var e = this;
                    e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = g(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) {
                        return 2 == t.button && t.preventDefault(), !0
                    }), "image" === t.type && g('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.adjustCaption(t), e.adjustLayout(t), t.pos === e.currPos && e.updateCursor(), e.revealContent(t))
                }, adjustCaption: function (t) {
                    var e, n = this,
                        o = t || n.current,
                        a = o.opts.caption,
                        i = o.opts.preventCaptionOverlap,
                        s = n.$refs.caption,
                        r = !1;
                    s.toggleClass("fancybox-caption--separate", i), i && a && a.length && (o.pos !== n.currPos ? ((e = s.clone().appendTo(s.parent())).children().eq(0).empty().html(a), r = e.outerHeight(!0), e.empty().remove()) : n.$caption && (r = n.$caption.outerHeight(!0)), o.$slide.css("padding-bottom", r || ""))
                }, adjustLayout: function (t) {
                    var e, n, o, a, i = t || this.current;
                    i.isLoaded && !0 !== i.opts.disableLayoutFix && (i.$content.css("margin-bottom", ""), i.$content.outerHeight() > i.$slide.height() + .5 && (o = i.$slide[0].style["padding-bottom"], a = i.$slide.css("padding-bottom"), 0 < parseFloat(a) && (e = i.$slide[0].scrollHeight, i.$slide.css("padding-bottom", 0), Math.abs(e - i.$slide[0].scrollHeight) < 1 && (n = a), i.$slide.css("padding-bottom", o))), i.$content.css("margin-bottom", n))
                }, revealContent: function (t) {
                    var e, n, o, a, i = this,
                        s = t.$slide,
                        r = !1,
                        c = !1,
                        l = i.isMoved(t),
                        d = t.isRevealed;
                    return t.isRevealed = !0, e = t.opts[i.firstRun ? "animationEffect" : "transitionEffect"], o = t.opts[i.firstRun ? "animationDuration" : "transitionDuration"], o = parseInt(t.forcedDuration === b ? o : t.forcedDuration, 10), !l && t.pos === i.currPos && o || (e = !1), "zoom" === e && (t.pos === i.currPos && o && "image" === t.type && !t.hasError && (c = i.getThumbPos(t)) ? r = i.getFitPos(t) : e = "fade"), "zoom" === e ? (i.isAnimating = !0, r.scaleX = r.width / c.width, r.scaleY = r.height / c.height, "auto" == (a = t.opts.zoomOpacity) && (a = .1 < Math.abs(t.width / t.height - c.width / c.height)), a && (c.opacity = .1, r.opacity = 1), g.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), c), p(t.$content), void g.fancybox.animate(t.$content, r, o, function () {
                        i.isAnimating = !1, i.complete()
                    })) : (i.updateSlide(t), e ? (g.fancybox.stop(s), n = "fancybox-slide--" + (t.pos >= i.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + e, s.addClass(n).removeClass("fancybox-slide--current"), t.$content.removeClass("fancybox-is-hidden"), p(s), "image" !== t.type && t.$content.hide().show(0), void g.fancybox.animate(s, "fancybox-slide--current", o, function () {
                        s.removeClass(n).css({transform: "", opacity: ""}), t.pos === i.currPos && i.complete()
                    }, !0)) : (t.$content.removeClass("fancybox-is-hidden"), d || !l || "image" !== t.type || t.hasError || t.$content.hide().fadeIn("fast"), void (t.pos === i.currPos && i.complete())))
                }, getThumbPos: function (t) {
                    var e, n, o, a, i, s, r, c, l, d = t.$thumb;
                    return !!(d && (r = d[0]) && r.ownerDocument === u && (g(".fancybox-container").css("pointer-events", "none"), c = {
                        x: r.getBoundingClientRect().left + r.offsetWidth / 2,
                        y: r.getBoundingClientRect().top + r.offsetHeight / 2
                    }, l = u.elementFromPoint(c.x, c.y) === r, g(".fancybox-container").css("pointer-events", ""), l)) && (n = g.fancybox.getTranslate(d), o = parseFloat(d.css("border-top-width") || 0), a = parseFloat(d.css("border-right-width") || 0), i = parseFloat(d.css("border-bottom-width") || 0), s = parseFloat(d.css("border-left-width") || 0), e = {
                        top: n.top + o,
                        left: n.left + s,
                        width: n.width - a - s,
                        height: n.height - o - i,
                        scaleX: 1,
                        scaleY: 1
                    }, 0 < n.width && 0 < n.height && e)
                }, complete: function () {
                    var t, n = this,
                        e = n.current,
                        o = {};
                    !n.isMoved() && e.isLoaded && (e.isComplete || (e.isComplete = !0, e.$slide.siblings().trigger("onReset"), n.preload("inline"), p(e.$slide), e.$slide.addClass("fancybox-slide--complete"), g.each(n.slides, function (t, e) {
                        e.pos >= n.currPos - 1 && e.pos <= n.currPos + 1 ? o[e.pos] = e : e && (g.fancybox.stop(e.$slide), e.$slide.off().remove())
                    }), n.slides = o), n.isAnimating = !1, n.updateCursor(), n.trigger("afterShow"), e.opts.video.autoStart && e.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function () {
                        Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(), n.next()
                    }), e.opts.autoFocus && "html" === e.contentType && ((t = e.$content.find("input[autofocus]:enabled:visible:first")).length ? t.trigger("focus") : n.focus(null, !0)), e.$slide.scrollTop(0).scrollLeft(0))
                }, preload: function (t) {
                    var e, n, o = this;
                    o.group.length < 2 || (n = o.slides[o.currPos + 1], (e = o.slides[o.currPos - 1]) && e.type === t && o.loadSlide(e), n && n.type === t && o.loadSlide(n))
                }, focus: function (t, e) {
                    var n, o, a = this,
                        i = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                    a.isClosing || ((n = (n = !t && a.current && a.current.isComplete ? a.current.$slide.find("*:visible" + (e ? ":not(.fancybox-close-small)" : "")) : a.$refs.container.find("*:visible")).filter(i).filter(function () {
                        return "hidden" !== g(this).css("visibility") && !g(this).hasClass("disabled")
                    })).length ? (o = n.index(u.activeElement), t && t.shiftKey ? (o < 0 || 0 == o) && (t.preventDefault(), n.eq(n.length - 1).trigger("focus")) : (o < 0 || o == n.length - 1) && (t && t.preventDefault(), n.eq(0).trigger("focus"))) : a.$refs.container.trigger("focus"))
                }, activate: function () {
                    var e = this;
                    g(".fancybox-container").each(function () {
                        var t = g(this).data("FancyBox");
                        t && t.id !== e.id && !t.isClosing && (t.trigger("onDeactivate"), t.removeEvents(), t.isVisible = !1)
                    }), e.isVisible = !0, (e.current || e.isIdle) && (e.update(), e.updateControls()), e.trigger("onActivate"), e.addEvents()
                }, close: function (t, e) {
                    var n, o, a, i, s, r, c, l = this,
                        d = l.current,
                        u = function () {
                            l.cleanUp(t)
                        };
                    return !l.isClosing && (!(l.isClosing = !0) === l.trigger("beforeClose", t) ? (l.isClosing = !1, f(function () {
                        l.update()
                    }), !1) : (l.removeEvents(), a = d.$content, n = d.opts.animationEffect, o = g.isNumeric(e) ? e : n ? d.opts.animationDuration : 0, d.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== t ? g.fancybox.stop(d.$slide) : n = !1, d.$slide.siblings().trigger("onReset").remove(), o && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", o + "ms"), l.hideLoading(d), l.hideControls(!0), l.updateCursor(), "zoom" !== n || a && o && "image" === d.type && !l.isMoved() && !d.hasError && (c = l.getThumbPos(d)) || (n = "fade"), "zoom" === n ? (g.fancybox.stop(a), r = {
                        top: (i = g.fancybox.getTranslate(a)).top,
                        left: i.left,
                        scaleX: i.width / c.width,
                        scaleY: i.height / c.height,
                        width: c.width,
                        height: c.height
                    }, "auto" == (s = d.opts.zoomOpacity) && (s = .1 < Math.abs(d.width / d.height - c.width / c.height)), s && (c.opacity = 0), g.fancybox.setTranslate(a, r), p(a), g.fancybox.animate(a, c, o, u)) : n && o ? g.fancybox.animate(d.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + n, o, u) : !0 === t ? setTimeout(u, o) : u(), !0))
                }, cleanUp: function (t) {
                    var e, n, o, a = this,
                        i = a.current.opts.$orig;
                    a.current.$slide.trigger("onReset"), a.$refs.container.empty().remove(), a.trigger("afterClose", t), a.current.opts.backFocus && (i && i.length && i.is(":visible") || (i = a.$trigger), i && i.length && (n = c.scrollX, o = c.scrollY, i.trigger("focus"), g("html, body").scrollTop(o).scrollLeft(n))), a.current = null, (e = g.fancybox.getInstance()) ? e.activate() : (g("body").removeClass("fancybox-active compensate-for-scrollbar"), g("#fancybox-style-noscroll").remove())
                }, trigger: function (t, e) {
                    var n, o = Array.prototype.slice.call(arguments, 1),
                        a = this,
                        i = e && e.opts ? e : a.current;
                    if (i ? o.unshift(i) : i = a, o.unshift(a), g.isFunction(i.opts[t]) && (n = i.opts[t].apply(i, o)), !1 === n) return n;
                    "afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", o) : s.trigger(t + ".fb", o)
                }, updateControls: function () {
                    var t = this,
                        e = t.current,
                        n = e.index,
                        o = t.$refs.container,
                        a = t.$refs.caption,
                        i = e.opts.caption;
                    e.$slide.trigger("refresh"), i && i.length ? (t.$caption = a).children().eq(0).html(i) : t.$caption = null, t.hasHiddenControls || t.isIdle || t.showControls(), o.find("[data-fancybox-count]").html(t.group.length), o.find("[data-fancybox-index]").html(n + 1), o.find("[data-fancybox-prev]").prop("disabled", !e.opts.loop && n <= 0), o.find("[data-fancybox-next]").prop("disabled", !e.opts.loop && n >= t.group.length - 1), "image" === e.type ? o.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", e.opts.image.src || e.src).show() : e.opts.toolbar && o.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), g(u.activeElement).is(":hidden,[disabled]") && t.$refs.container.trigger("focus")
                }, hideControls: function (t) {
                    var e = ["infobar", "toolbar", "nav"];
                    !t && this.current.opts.preventCaptionOverlap || e.push("caption"), this.$refs.container.removeClass(e.map(function (t) {
                        return "fancybox-show-" + t
                    }).join(" ")), this.hasHiddenControls = !0
                }, showControls: function () {
                    var t = this,
                        e = t.current ? t.current.opts : t.opts,
                        n = t.$refs.container;
                    t.hasHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && 1 < t.group.length)).toggleClass("fancybox-show-caption", !!t.$caption).toggleClass("fancybox-show-nav", !!(e.arrows && 1 < t.group.length)).toggleClass("fancybox-is-modal", !!e.modal)
                }, toggleControls: function () {
                    this.hasHiddenControls ? this.showControls() : this.hideControls()
                }
            }), g.fancybox = {
                version: "3.5.7",
                defaults: a,
                getInstance: function (t) {
                    var e = g('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                        n = Array.prototype.slice.call(arguments, 1);
                    return e instanceof m && ("string" === g.type(t) ? e[t].apply(e, n) : "function" === g.type(t) && t.apply(e, n), e)
                },
                open: function (t, e, n) {
                    return new m(t, e, n)
                },
                close: function (t) {
                    var e = this.getInstance();
                    e && (e.close(), !0 === t && this.close(t))
                },
                destroy: function () {
                    this.close(!0), s.add("body").off("click.fb-start", "**")
                },
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                use3d: (t = u.createElement("div"), c.getComputedStyle && c.getComputedStyle(t) && c.getComputedStyle(t).getPropertyValue("transform") && !(u.documentMode && u.documentMode < 11)),
                getTranslate: function (t) {
                    var e;
                    return !(!t || !t.length) && {
                        top: (e = t[0].getBoundingClientRect()).top || 0,
                        left: e.left || 0,
                        width: e.width,
                        height: e.height,
                        opacity: parseFloat(t.css("opacity"))
                    }
                },
                setTranslate: function (t, e) {
                    var n = "",
                        o = {};
                    if (t && e) return e.left === b && e.top === b || (n = (e.left === b ? t.position().left : e.left) + "px, " + (e.top === b ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== b && e.scaleY !== b ? n += " scale(" + e.scaleX + ", " + e.scaleY + ")" : e.scaleX !== b && (n += " scaleX(" + e.scaleX + ")"), n.length && (o.transform = n), e.opacity !== b && (o.opacity = e.opacity), e.width !== b && (o.width = e.width), e.height !== b && (o.height = e.height), t.css(o)
                },
                animate: function (e, n, o, a, i) {
                    var s, r = this;
                    g.isFunction(o) && (a = o, o = null), r.stop(e), s = r.getTranslate(e), e.on(d, function (t) {
                        (!t || !t.originalEvent || e.is(t.originalEvent.target) && "z-index" != t.originalEvent.propertyName) && (r.stop(e), g.isNumeric(o) && e.css("transition-duration", ""), g.isPlainObject(n) ? n.scaleX !== b && n.scaleY !== b && r.setTranslate(e, {
                            top: n.top,
                            left: n.left,
                            width: s.width * n.scaleX,
                            height: s.height * n.scaleY,
                            scaleX: 1,
                            scaleY: 1
                        }) : !0 !== i && e.removeClass(n), g.isFunction(a) && a(t))
                    }), g.isNumeric(o) && e.css("transition-duration", o + "ms"), g.isPlainObject(n) ? (n.scaleX !== b && n.scaleY !== b && (delete n.width, delete n.height, e.parent().hasClass("fancybox-slide--image") && e.parent().addClass("fancybox-is-scaling")), g.fancybox.setTranslate(e, n)) : e.addClass(n), e.data("timer", setTimeout(function () {
                        e.trigger(d)
                    }, o + 33))
                },
                stop: function (t, e) {
                    t && t.length && (clearTimeout(t.data("timer")), e && t.trigger(d), t.off(d).css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
                }
            }, g.fn.fancybox = function (t) {
                var e;
                return (e = (t = t || {}).selector || !1) ? g("body").off("click.fb-start", e).on("click.fb-start", e, {options: t}, y) : this.off("click.fb-start").on("click.fb-start", {
                    items: this,
                    options: t
                }, y), this
            }, s.on("click.fb-start", "[data-fancybox]", y), s.on("click.fb-start", "[data-fancybox-trigger]", function (t) {
                g('[data-fancybox="' + g(this).attr("data-fancybox-trigger") + '"]').eq(g(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {$trigger: g(this)})
            }), e = ".fancybox-button", n = "fancybox-focus", o = null, s.on("mousedown mouseup focus blur", e, function (t) {
                switch (t.type) {
                    case "mousedown":
                        o = g(this);
                        break;
                    case "mouseup":
                        o = null;
                        break;
                    case "focusin":
                        g(e).removeClass(n), g(this).is(o) || g(this).is("[disabled]") || g(this).addClass(n);
                        break;
                    case "focusout":
                        g(e).removeClass(n)
                }
            })
        }

    function y(t, e) {
        var n, o, a, i = [],
            s = 0;
        t && t.isDefaultPrevented() || (t.preventDefault(), e = e || {}, t && t.data && (e = h(t.data.options, e)), n = e.$target || g(t.currentTarget).trigger("blur"), (a = g.fancybox.getInstance()) && a.$trigger && a.$trigger.is(n) || (i = e.selector ? g(e.selector) : (o = n.attr("data-fancybox") || "") ? (i = t.data ? t.data.items : []).length ? i.filter('[data-fancybox="' + o + '"]') : g('[data-fancybox="' + o + '"]') : [n], (s = g(i).index(n)) < 0 && (s = 0), (a = g.fancybox.open(i, e, s)).$trigger = n))
    }
}(window, document, jQuery),
    function (p) {
        "use strict";
        var o = {
                youtube: {
                    matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                    params: {
                        autoplay: 1,
                        autohide: 1,
                        fs: 1,
                        rel: 0,
                        hd: 1,
                        wmode: "transparent",
                        enablejsapi: 1,
                        html5: 1
                    },
                    paramPlace: 8,
                    type: "iframe",
                    url: "https://www.youtube-nocookie.com/embed/$4",
                    thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
                },
                vimeo: {
                    matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                    params: {autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1},
                    paramPlace: 3,
                    type: "iframe",
                    url: "//player.vimeo.com/video/$2"
                },
                instagram: {
                    matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                    type: "image",
                    url: "//$1/p/$2/media/?size=l"
                },
                gmap_place: {
                    matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                    type: "iframe",
                    url: function (t) {
                        return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && 0 < t[12].indexOf("layer=c") ? "svembed" : "embed")
                    }
                },
                gmap_search: {
                    matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                    type: "iframe",
                    url: function (t) {
                        return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                    }
                }
            },
            h = function (n, t, e) {
                if (n) return e = e || "", "object" === p.type(e) && (e = p.param(e, !0)), p.each(t, function (t, e) {
                    n = n.replace("$" + t, e || "")
                }), e.length && (n += (0 < n.indexOf("?") ? "&" : "?") + e), n
            };
        p(document).on("objectNeedsType.fb", function (t, e, a) {
            var n, i, s, r, c, l, d, u = a.src || "",
                f = !1;
            n = p.extend(!0, {}, o, a.opts.media), p.each(n, function (t, e) {
                if (s = u.match(e.matcher)) {
                    if (f = e.type, d = t, l = {}, e.paramPlace && s[e.paramPlace]) {
                        "?" == (c = s[e.paramPlace])[0] && (c = c.substring(1)), c = c.split("&");
                        for (var n = 0; n < c.length; ++n) {
                            var o = c[n].split("=", 2);
                            2 == o.length && (l[o[0]] = decodeURIComponent(o[1].replace(/\+/g, " ")))
                        }
                    }
                    return r = p.extend(!0, {}, e.params, a.opts[t], l), u = "function" === p.type(e.url) ? e.url.call(this, s, r, a) : h(e.url, s, r), i = "function" === p.type(e.thumb) ? e.thumb.call(this, s, r, a) : h(e.thumb, s), "youtube" === t ? u = u.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, n, o) {
                        return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                    }) : "vimeo" === t && (u = u.replace("&%23", "#")), !1
                }
            }), f ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = i), "iframe" === f && (a.opts = p.extend(!0, a.opts, {
                iframe: {
                    preload: !1,
                    attr: {scrolling: "no"}
                }
            })), p.extend(a, {
                type: f,
                src: u,
                origSrc: a.src,
                contentSource: d,
                contentType: "image" === f ? "image" : "gmap_place" == d || "gmap_search" == d ? "map" : "video"
            })) : u && (a.type = a.opts.defaultType)
        });
        var a = {
            youtube: {src: "https://www.youtube.com/iframe_api", class: "YT", loading: !1, loaded: !1},
            vimeo: {src: "https://player.vimeo.com/api/player.js", class: "Vimeo", loading: !1, loaded: !1},
            load: function (t) {
                var e, n = this;
                this[t].loaded ? setTimeout(function () {
                    n.done(t)
                }) : this[t].loading || (this[t].loading = !0, (e = document.createElement("script")).type = "text/javascript", e.src = this[t].src, "youtube" === t ? window.onYouTubeIframeAPIReady = function () {
                    n[t].loaded = !0, n.done(t)
                } : e.onload = function () {
                    n[t].loaded = !0, n.done(t)
                }, document.body.appendChild(e))
            },
            done: function (t) {
                var e, n;
                "youtube" === t && delete window.onYouTubeIframeAPIReady, (e = p.fancybox.getInstance()) && (n = e.current.$content.find("iframe"), "youtube" === t && void 0 !== YT && YT ? new YT.Player(n.attr("id"), {
                    events: {
                        onStateChange: function (t) {
                            0 == t.data && e.next()
                        }
                    }
                }) : "vimeo" === t && void 0 !== Vimeo && Vimeo && new Vimeo.Player(n).on("ended", function () {
                    e.next()
                }))
            }
        };
        p(document).on({
            "afterShow.fb": function (t, e, n) {
                1 < e.group.length && ("youtube" === n.contentSource || "vimeo" === n.contentSource) && a.load(n.contentSource)
            }
        })
    }(jQuery),
    function (g, c, b) {
        "use strict";
        var m = g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || g.oRequestAnimationFrame || function (t) {
                return g.setTimeout(t, 1e3 / 60)
            },
            y = g.cancelAnimationFrame || g.webkitCancelAnimationFrame || g.mozCancelAnimationFrame || g.oCancelAnimationFrame || function (t) {
                g.clearTimeout(t)
            },
            d = function (t) {
                var e = [];
                for (var n in t = (t = t.originalEvent || t || g.e).touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t]) t[n].pageX ? e.push({
                    x: t[n].pageX,
                    y: t[n].pageY
                }) : t[n].clientX && e.push({x: t[n].clientX, y: t[n].clientY});
                return e
            },
            v = function (t, e, n) {
                return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
            },
            l = function (t) {
                if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || b.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
                for (var e = 0, n = t[0].attributes, o = n.length; e < o; e++)
                    if ("data-fancybox-" === n[e].nodeName.substr(0, 14)) return !0;
                return !1
            },
            u = function (t) {
                for (var e, n, o, a, i, s = !1; e = t.get(0), void 0, n = g.getComputedStyle(e)["overflow-y"], o = g.getComputedStyle(e)["overflow-x"], a = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight, i = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth, !(s = a || i) && (t = t.parent()).length && !t.hasClass("fancybox-stage") && !t.is("body");) ;
                return s
            },
            n = function (t) {
                var e = this;
                e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", b.proxy(e, "ontouchstart"))
            };
        n.prototype.destroy = function () {
            var t = this;
            t.$container.off(".fb.touch"), b(c).off(".fb.touch"), t.requestId && (y(t.requestId), t.requestId = null), t.tapped && (clearTimeout(t.tapped), t.tapped = null)
        }, n.prototype.ontouchstart = function (t) {
            var e = this,
                n = b(t.target),
                o = e.instance,
                a = o.current,
                i = a.$slide,
                s = a.$content,
                r = "touchstart" == t.type;
            if (r && e.$container.off("mousedown.fb.touch"), (!t.originalEvent || 2 != t.originalEvent.button) && i.length && n.length && !l(n) && !l(n.parent()) && (n.is("img") || !(t.originalEvent.clientX > n[0].clientWidth + n.offset().left))) {
                if (!a || o.isAnimating || a.$slide.hasClass("fancybox-animated")) return t.stopPropagation(), void t.preventDefault();
                e.realPoints = e.startPoints = d(t), e.startPoints.length && (a.touch && t.stopPropagation(), e.startEvent = t, e.canTap = !0, e.$target = n, e.$content = s, e.opts = a.opts.touch, e.isPanning = !1, e.isSwiping = !1, e.isZooming = !1, e.isScrolling = !1, e.canPan = o.canPan(), e.startTime = (new Date).getTime(), e.distanceX = e.distanceY = e.distance = 0, e.canvasWidth = Math.round(i[0].clientWidth), e.canvasHeight = Math.round(i[0].clientHeight), e.contentLastPos = null, e.contentStartPos = b.fancybox.getTranslate(e.$content) || {
                    top: 0,
                    left: 0
                }, e.sliderStartPos = b.fancybox.getTranslate(i), e.stagePos = b.fancybox.getTranslate(o.$refs.stage), e.sliderStartPos.top -= e.stagePos.top, e.sliderStartPos.left -= e.stagePos.left, e.contentStartPos.top -= e.stagePos.top, e.contentStartPos.left -= e.stagePos.left, b(c).off(".fb.touch").on(r ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", b.proxy(e, "ontouchend")).on(r ? "touchmove.fb.touch" : "mousemove.fb.touch", b.proxy(e, "ontouchmove")), b.fancybox.isMobile && c.addEventListener("scroll", e.onscroll, !0), ((e.opts || e.canPan) && (n.is(e.$stage) || e.$stage.find(n).length) || (n.is(".fancybox-image") && t.preventDefault(), b.fancybox.isMobile && n.parents(".fancybox-caption").length)) && (e.isScrollable = u(n) || u(n.parent()), b.fancybox.isMobile && e.isScrollable || t.preventDefault(), (1 === e.startPoints.length || a.hasError) && (e.canPan ? (b.fancybox.stop(e.$content), e.isPanning = !0) : e.isSwiping = !0, e.$container.addClass("fancybox-is-grabbing")), 2 === e.startPoints.length && "image" === a.type && (a.isLoaded || a.$ghost) && (e.canTap = !1, e.isSwiping = !1, e.isPanning = !1, e.isZooming = !0, b.fancybox.stop(e.$content), e.centerPointStartX = .5 * (e.startPoints[0].x + e.startPoints[1].x) - b(g).scrollLeft(), e.centerPointStartY = .5 * (e.startPoints[0].y + e.startPoints[1].y) - b(g).scrollTop(), e.percentageOfImageAtPinchPointX = (e.centerPointStartX - e.contentStartPos.left) / e.contentStartPos.width, e.percentageOfImageAtPinchPointY = (e.centerPointStartY - e.contentStartPos.top) / e.contentStartPos.height, e.startDistanceBetweenFingers = v(e.startPoints[0], e.startPoints[1]))))
            }
        }, n.prototype.onscroll = function (t) {
            this.isScrolling = !0, c.removeEventListener("scroll", this.onscroll, !0)
        }, n.prototype.ontouchmove = function (t) {
            var e = this;
            void 0 === t.originalEvent.buttons || 0 !== t.originalEvent.buttons ? e.isScrolling ? e.canTap = !1 : (e.newPoints = d(t), (e.opts || e.canPan) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(), e.distanceX = v(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = v(e.newPoints[0], e.startPoints[0], "y"), e.distance = v(e.newPoints[0], e.startPoints[0]), 0 < e.distance && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))) : e.ontouchend(t)
        }, n.prototype.onSwipe = function (t) {
            var e, a = this,
                i = a.instance,
                n = a.isSwiping,
                o = a.sliderStartPos.left || 0;
            if (!0 !== n) "x" == n && (0 < a.distanceX && (a.instance.group.length < 2 || 0 === a.instance.current.index && !a.instance.current.opts.loop) ? o += Math.pow(a.distanceX, .8) : a.distanceX < 0 && (a.instance.group.length < 2 || a.instance.current.index === a.instance.group.length - 1 && !a.instance.current.opts.loop) ? o -= Math.pow(-a.distanceX, .8) : o += a.distanceX), a.sliderLastPos = {
                top: "x" == n ? 0 : a.sliderStartPos.top + a.distanceY,
                left: o
            }, a.requestId && (y(a.requestId), a.requestId = null), a.requestId = m(function () {
                a.sliderLastPos && (b.each(a.instance.slides, function (t, e) {
                    var n = e.pos - a.instance.currPos;
                    b.fancybox.setTranslate(e.$slide, {
                        top: a.sliderLastPos.top,
                        left: a.sliderLastPos.left + n * a.canvasWidth + n * e.opts.gutter
                    })
                }), a.$container.addClass("fancybox-is-sliding"))
            });
            else if (10 < Math.abs(a.distance)) {
                if (a.canTap = !1, i.group.length < 2 && a.opts.vertical ? a.isSwiping = "y" : i.isDragging || !1 === a.opts.vertical || "auto" === a.opts.vertical && 800 < b(g).width() ? a.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(a.distanceY, a.distanceX) / Math.PI), a.isSwiping = 45 < e && e < 135 ? "y" : "x"), "y" === a.isSwiping && b.fancybox.isMobile && a.isScrollable) return void (a.isScrolling = !0);
                i.isDragging = a.isSwiping, a.startPoints = a.newPoints, b.each(i.slides, function (t, e) {
                    var n, o;
                    b.fancybox.stop(e.$slide), n = b.fancybox.getTranslate(e.$slide), o = b.fancybox.getTranslate(i.$refs.stage), e.$slide.css({
                        transform: "",
                        opacity: "",
                        "transition-duration": ""
                    }).removeClass("fancybox-animated").removeClass(function (t, e) {
                        return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                    }), e.pos === i.current.pos && (a.sliderStartPos.top = n.top - o.top, a.sliderStartPos.left = n.left - o.left), b.fancybox.setTranslate(e.$slide, {
                        top: n.top - o.top,
                        left: n.left - o.left
                    })
                }), i.SlideShow && i.SlideShow.isActive && i.SlideShow.stop()
            }
        }, n.prototype.onPan = function () {
            var t = this;
            v(t.newPoints[0], t.realPoints[0]) < (b.fancybox.isMobile ? 10 : 5) ? t.startPoints = t.newPoints : (t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && y(t.requestId), t.requestId = m(function () {
                b.fancybox.setTranslate(t.$content, t.contentLastPos)
            }))
        }, n.prototype.limitMovement = function () {
            var t, e, n, o, a, i, s = this,
                r = s.canvasWidth,
                c = s.canvasHeight,
                l = s.distanceX,
                d = s.distanceY,
                u = s.contentStartPos,
                f = u.left,
                p = u.top,
                h = u.width,
                g = u.height;
            return a = r < h ? f + l : f, i = p + d, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), 0 < l && t < a && (a = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && a < n && (a = n + 1 - Math.pow(n - f - l, .8) || 0), 0 < d && e < i && (i = e - 1 + Math.pow(-e + p + d, .8) || 0), d < 0 && i < o && (i = o + 1 - Math.pow(o - p - d, .8) || 0), {
                top: i,
                left: a
            }
        }, n.prototype.limitPosition = function (t, e, n, o) {
            var a = this.canvasWidth,
                i = this.canvasHeight;
            return t = a < n ? (t = 0 < t ? 0 : t) < a - n ? a - n : t : Math.max(0, a / 2 - n / 2), {
                top: e = i < o ? (e = 0 < e ? 0 : e) < i - o ? i - o : e : Math.max(0, i / 2 - o / 2),
                left: t
            }
        }, n.prototype.onZoom = function () {
            var t = this,
                e = t.contentStartPos,
                n = e.width,
                o = e.height,
                a = e.left,
                i = e.top,
                s = v(t.newPoints[0], t.newPoints[1]) / t.startDistanceBetweenFingers,
                r = Math.floor(n * s),
                c = Math.floor(o * s),
                l = (n - r) * t.percentageOfImageAtPinchPointX,
                d = (o - c) * t.percentageOfImageAtPinchPointY,
                u = (t.newPoints[0].x + t.newPoints[1].x) / 2 - b(g).scrollLeft(),
                f = (t.newPoints[0].y + t.newPoints[1].y) / 2 - b(g).scrollTop(),
                p = u - t.centerPointStartX,
                h = {top: i + (d + (f - t.centerPointStartY)), left: a + (l + p), scaleX: s, scaleY: s};
            t.canTap = !1, t.newWidth = r, t.newHeight = c, t.contentLastPos = h, t.requestId && y(t.requestId), t.requestId = m(function () {
                b.fancybox.setTranslate(t.$content, t.contentLastPos)
            })
        }, n.prototype.ontouchend = function (t) {
            var e = this,
                n = e.isSwiping,
                o = e.isPanning,
                a = e.isZooming,
                i = e.isScrolling;
            if (e.endPoints = d(t), e.dMs = Math.max((new Date).getTime() - e.startTime, 1), e.$container.removeClass("fancybox-is-grabbing"), b(c).off(".fb.touch"), c.removeEventListener("scroll", e.onscroll, !0), e.requestId && (y(e.requestId), e.requestId = null), e.isSwiping = !1, e.isPanning = !1, e.isZooming = !1, e.isScrolling = !1, e.instance.isDragging = !1, e.canTap) return e.onTap(t);
            e.speed = 100, e.velocityX = e.distanceX / e.dMs * .5, e.velocityY = e.distanceY / e.dMs * .5, o ? e.endPanning() : a ? e.endZooming() : e.endSwiping(n, i)
        }, n.prototype.endSwiping = function (t, e) {
            var n = this,
                o = !1,
                a = n.instance.group.length,
                i = Math.abs(n.distanceX),
                s = "x" == t && 1 < a && (130 < n.dMs && 10 < i || 50 < i);
            n.sliderLastPos = null, "y" == t && !e && 50 < Math.abs(n.distanceY) ? (b.fancybox.animate(n.instance.current.$slide, {
                top: n.sliderStartPos.top + n.distanceY + 150 * n.velocityY,
                opacity: 0
            }, 200), o = n.instance.close(!0, 250)) : s && 0 < n.distanceX ? o = n.instance.previous(300) : s && n.distanceX < 0 && (o = n.instance.next(300)), !1 !== o || "x" != t && "y" != t || n.instance.centerSlide(200), n.$container.removeClass("fancybox-is-sliding")
        }, n.prototype.endPanning = function () {
            var t, e, n, o = this;
            o.contentLastPos && (e = !1 === o.opts.momentum || 350 < o.dMs ? (t = o.contentLastPos.left, o.contentLastPos.top) : (t = o.contentLastPos.left + 500 * o.velocityX, o.contentLastPos.top + 500 * o.velocityY), (n = o.limitPosition(t, e, o.contentStartPos.width, o.contentStartPos.height)).width = o.contentStartPos.width, n.height = o.contentStartPos.height, b.fancybox.animate(o.$content, n, 366))
        }, n.prototype.endZooming = function () {
            var t, e, n, o, a = this,
                i = a.instance.current,
                s = a.newWidth,
                r = a.newHeight;
            a.contentLastPos && (t = a.contentLastPos.left, o = {
                top: e = a.contentLastPos.top,
                left: t,
                width: s,
                height: r,
                scaleX: 1,
                scaleY: 1
            }, b.fancybox.setTranslate(a.$content, o), s < a.canvasWidth && r < a.canvasHeight ? a.instance.scaleToFit(150) : s > i.width || r > i.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (n = a.limitPosition(t, e, s, r), b.fancybox.animate(a.$content, n, 150)))
        }, n.prototype.onTap = function (n) {
            var t, o = this,
                e = b(n.target),
                a = o.instance,
                i = a.current,
                s = n && d(n) || o.startPoints,
                r = s[0] ? s[0].x - b(g).scrollLeft() - o.stagePos.left : 0,
                c = s[0] ? s[0].y - b(g).scrollTop() - o.stagePos.top : 0,
                l = function (t) {
                    var e = i.opts[t];
                    if (b.isFunction(e) && (e = e.apply(a, [i, n])), e) switch (e) {
                        case "close":
                            a.close(o.startEvent);
                            break;
                        case "toggleControls":
                            a.toggleControls();
                            break;
                        case "next":
                            a.next();
                            break;
                        case "nextOrClose":
                            1 < a.group.length ? a.next() : a.close(o.startEvent);
                            break;
                        case "zoom":
                            "image" == i.type && (i.isLoaded || i.$ghost) && (a.canPan() ? a.scaleToFit() : a.isScaledDown() ? a.scaleToActual(r, c) : a.group.length < 2 && a.close(o.startEvent))
                    }
                };
            if ((!n.originalEvent || 2 != n.originalEvent.button) && (e.is("img") || !(r > e[0].clientWidth + e.offset().left))) {
                if (e.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) t = "Outside";
                else if (e.is(".fancybox-slide")) t = "Slide";
                else {
                    if (!a.current.$content || !a.current.$content.find(e).addBack().filter(e).length) return;
                    t = "Content"
                }
                if (o.tapped) {
                    if (clearTimeout(o.tapped), o.tapped = null, 50 < Math.abs(r - o.tapX) || 50 < Math.abs(c - o.tapY)) return this;
                    l("dblclick" + t)
                } else o.tapX = r, o.tapY = c, i.opts["dblclick" + t] && i.opts["dblclick" + t] !== i.opts["click" + t] ? o.tapped = setTimeout(function () {
                    o.tapped = null, a.isAnimating || l("click" + t)
                }, 500) : l("click" + t);
                return this
            }
        }, b(c).on("onActivate.fb", function (t, e) {
            e && !e.Guestures && (e.Guestures = new n(e))
        }).on("beforeClose.fb", function (t, e) {
            e && e.Guestures && e.Guestures.destroy()
        })
    }(window, document, jQuery),
    function (s, r) {
        "use strict";
        r.extend(!0, r.fancybox.defaults, {
            btnTpl: {slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'},
            slideShow: {autoStart: !1, speed: 3e3, progress: !0}
        });
        var n = function (t) {
            this.instance = t, this.init()
        };
        r.extend(n.prototype, {
            timer: null, isActive: !1, $button: null, init: function () {
                var t = this,
                    e = t.instance,
                    n = e.group[e.currIndex].opts.slideShow;
                t.$button = e.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
                    t.toggle()
                }), e.group.length < 2 || !n ? t.$button.hide() : n.progress && (t.$progress = r('<div class="fancybox-progress"></div>').appendTo(e.$refs.inner))
            }, set: function (t) {
                var e = this,
                    n = e.instance,
                    o = n.current;
                o && (!0 === t || o.opts.loop || n.currIndex < n.group.length - 1) ? e.isActive && "video" !== o.contentType && (e.$progress && r.fancybox.animate(e.$progress.show(), {scaleX: 1}, o.opts.slideShow.speed), e.timer = setTimeout(function () {
                    n.current.opts.loop || n.current.index != n.group.length - 1 ? n.next() : n.jumpTo(0)
                }, o.opts.slideShow.speed)) : (e.stop(), n.idleSecondsCounter = 0, n.showControls())
            }, clear: function () {
                clearTimeout(this.timer), this.timer = null, this.$progress && this.$progress.removeAttr("style").hide()
            }, start: function () {
                var t = this,
                    e = t.instance.current;
                e && (t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.isActive = !0, e.isComplete && t.set(!0), t.instance.trigger("onSlideShowChange", !0))
            }, stop: function () {
                var t = this,
                    e = t.instance.current;
                t.clear(), t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1, t.instance.trigger("onSlideShowChange", !1), t.$progress && t.$progress.removeAttr("style").hide()
            }, toggle: function () {
                this.isActive ? this.stop() : this.start()
            }
        }), r(s).on({
            "onInit.fb": function (t, e) {
                e && !e.SlideShow && (e.SlideShow = new n(e))
            }, "beforeShow.fb": function (t, e, n, o) {
                var a = e && e.SlideShow;
                o ? a && n.opts.slideShow.autoStart && a.start() : a && a.isActive && a.clear()
            }, "afterShow.fb": function (t, e, n) {
                var o = e && e.SlideShow;
                o && o.isActive && o.set()
            }, "afterKeydown.fb": function (t, e, n, o, a) {
                var i = e && e.SlideShow;
                !i || !n.opts.slideShow || 80 !== a && 32 !== a || r(s.activeElement).is("button,a,input") || (o.preventDefault(), i.toggle())
            }, "beforeClose.fb onDeactivate.fb": function (t, e) {
                var n = e && e.SlideShow;
                n && n.stop()
            }
        }), r(s).on("visibilitychange", function () {
            var t = r.fancybox.getInstance(),
                e = t && t.SlideShow;
            e && e.isActive && (s.hidden ? e.clear() : e.set())
        })
    }(document, jQuery),
    function (i, n) {
        "use strict";
        var o = function () {
            for (var t = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], e = {}, n = 0; n < t.length; n++) {
                var o = t[n];
                if (o && o[1] in i) {
                    for (var a = 0; a < o.length; a++) e[t[0][a]] = o[a];
                    return e
                }
            }
            return !1
        }();
        if (o) {
            var a = {
                request: function (t) {
                    (t = t || i.documentElement)[o.requestFullscreen](t.ALLOW_KEYBOARD_INPUT)
                }, exit: function () {
                    i[o.exitFullscreen]()
                }, toggle: function (t) {
                    t = t || i.documentElement, this.isFullscreen() ? this.exit() : this.request(t)
                }, isFullscreen: function () {
                    return Boolean(i[o.fullscreenElement])
                }, enabled: function () {
                    return Boolean(i[o.fullscreenEnabled])
                }
            };
            n.extend(!0, n.fancybox.defaults, {
                btnTpl: {fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'},
                fullScreen: {autoStart: !1}
            }), n(i).on(o.fullscreenchange, function () {
                var t = a.isFullscreen(),
                    e = n.fancybox.getInstance();
                e && (e.current && "image" === e.current.type && e.isAnimating && (e.isAnimating = !1, e.update(!0, !0, 0), e.isComplete || e.complete()), e.trigger("onFullscreenChange", t), e.$refs.container.toggleClass("fancybox-is-fullscreen", t), e.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !t).toggleClass("fancybox-button--fsexit", t))
            })
        }
        n(i).on({
            "onInit.fb": function (t, e) {
                o ? e && e.group[e.currIndex].opts.fullScreen ? (e.$refs.container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
                    t.stopPropagation(), t.preventDefault(), a.toggle()
                }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && a.request(), e.FullScreen = a) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide() : e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove()
            }, "afterKeydown.fb": function (t, e, n, o, a) {
                e && e.FullScreen && 70 === a && (o.preventDefault(), e.FullScreen.toggle())
            }, "beforeClose.fb": function (t, e) {
                e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && a.exit()
            }
        })
    }(document, jQuery),
    function (t, i) {
        "use strict";
        var s = "fancybox-thumbs",
            r = s + "-active";
        i.fancybox.defaults = i.extend(!0, {
            btnTpl: {thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'},
            thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y"}
        }, i.fancybox.defaults);
        var o = function (t) {
            this.init(t)
        };
        i.extend(o.prototype, {
            $button: null, $grid: null, $list: null, isVisible: !1, isActive: !1, init: function (t) {
                var e = this,
                    n = t.group,
                    o = 0;
                e.instance = t, e.opts = n[t.currIndex].opts.thumbs, (t.Thumbs = e).$button = t.$refs.toolbar.find("[data-fancybox-thumbs]");
                for (var a = 0, i = n.length; a < i && (n[a].thumb && o++, !(1 < o)); a++) ;
                1 < o && e.opts ? (e.$button.removeAttr("style").on("click", function () {
                    e.toggle()
                }), e.isActive = !0) : e.$button.hide()
            }, create: function () {
                var n, t = this,
                    e = t.instance,
                    o = t.opts.parentEl,
                    a = [];
                t.$grid || (t.$grid = i('<div class="' + s + " " + s + "-" + t.opts.axis + '"></div>').appendTo(e.$refs.container.find(o).addBack().filter(o)), t.$grid.on("click", "a", function () {
                    e.jumpTo(i(this).attr("data-index"))
                })), t.$list || (t.$list = i('<div class="' + s + '__list">').appendTo(t.$grid)), i.each(e.group, function (t, e) {
                    (n = e.thumb) || "image" !== e.type || (n = e.src), a.push('<a href="javascript:;" tabindex="0" data-index="' + t + '"' + (n && n.length ? ' style="background-image:url(' + n + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
                }), t.$list[0].innerHTML = a.join(""), "x" === t.opts.axis && t.$list.width(parseInt(t.$grid.css("padding-right"), 10) + e.group.length * t.$list.children().eq(0).outerWidth(!0))
            }, focus: function (t) {
                var e, n, o = this,
                    a = o.$list,
                    i = o.$grid;
                o.instance.current && (n = (e = a.children().removeClass(r).filter('[data-index="' + o.instance.current.index + '"]').addClass(r)).position(), "y" === o.opts.axis && (n.top < 0 || n.top > a.height() - e.outerHeight()) ? a.stop().animate({scrollTop: a.scrollTop() + n.top}, t) : "x" === o.opts.axis && (n.left < i.scrollLeft() || n.left > i.scrollLeft() + (i.width() - e.outerWidth())) && a.parent().stop().animate({scrollLeft: n.left}, t))
            }, update: function () {
                var t = this;
                t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"), t.instance.update()
            }, hide: function () {
                this.isVisible = !1, this.update()
            }, show: function () {
                this.isVisible = !0, this.update()
            }, toggle: function () {
                this.isVisible = !this.isVisible, this.update()
            }
        }), i(t).on({
            "onInit.fb": function (t, e) {
                var n;
                e && !e.Thumbs && (n = new o(e)).isActive && !0 === n.opts.autoStart && n.show()
            }, "beforeShow.fb": function (t, e, n, o) {
                var a = e && e.Thumbs;
                a && a.isVisible && a.focus(o ? 0 : 250)
            }, "afterKeydown.fb": function (t, e, n, o, a) {
                var i = e && e.Thumbs;
                i && i.isActive && 71 === a && (o.preventDefault(), i.toggle())
            }, "beforeClose.fb": function (t, e) {
                var n = e && e.Thumbs;
                n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
            }
        })
    }(document, jQuery),
    function (t, s) {
        "use strict";
        s.extend(!0, s.fancybox.defaults, {
            btnTpl: {share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'},
            share: {
                url: function (t, e) {
                    return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
                },
                tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
            }
        }), s(t).on("click", "[data-fancybox-share]", function () {
            var t, e, n, o, a = s.fancybox.getInstance(),
                i = a.current || null;
            i && ("function" === s.type(i.opts.share.url) && (t = i.opts.share.url.apply(i, [a, i])), e = i.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === i.type ? encodeURIComponent(i.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, (n = t, o = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;"
            }, String(n).replace(/[&<>"'`=\/]/g, function (t) {
                return o[t]
            }))).replace(/\{\{descr\}\}/g, a.$caption ? encodeURIComponent(a.$caption.text()) : ""), s.fancybox.open({
                src: a.translate(a, e),
                type: "html",
                opts: {
                    touch: !1, animationEffect: !1, afterLoad: function (t, e) {
                        a.$refs.container.one("beforeClose.fb", function () {
                            t.close(null, 0)
                        }), e.$content.find(".fancybox-share__button").click(function () {
                            return window.open(this.href, "Share", "width=550, height=450"), !1
                        })
                    }, mobile: {autoFocus: !1}
                }
            }))
        })
    }(document, jQuery),
    function (i, s, a) {
        "use strict";

        function r() {
            var t = i.location.hash.substr(1),
                e = t.split("-"),
                n = 1 < e.length && /^\+?\d+$/.test(e[e.length - 1]) && parseInt(e.pop(-1), 10) || 1;
            return {hash: t, index: n < 1 ? 1 : n, gallery: e.join("-")}
        }

        function e(t) {
            "" !== t.gallery && a("[data-fancybox='" + a.escapeSelector(t.gallery) + "']").eq(t.index - 1).focus().trigger("click.fb-start")
        }

        function c(t) {
            var e, n;
            return !!t && ("" !== (n = (e = t.current ? t.current.opts : t.opts).hash || (e.$orig ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger") : "")) && n)
        }

        a.escapeSelector || (a.escapeSelector = function (t) {
            return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (t, e) {
                return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
            })
        }), a(function () {
            !1 !== a.fancybox.defaults.hash && (a(s).on({
                "onInit.fb": function (t, e) {
                    var n, o;
                    !1 !== e.group[e.currIndex].opts.hash && (n = r(), (o = c(e)) && n.gallery && o == n.gallery && (e.currIndex = n.index - 1))
                }, "beforeShow.fb": function (t, e, n, o) {
                    var a;
                    n && !1 !== n.opts.hash && (a = c(e)) && (e.currentHash = a + (1 < e.group.length ? "-" + (n.index + 1) : ""), i.location.hash !== "#" + e.currentHash && (o && !e.origHash && (e.origHash = i.location.hash), e.hashTimer && clearTimeout(e.hashTimer), e.hashTimer = setTimeout(function () {
                        "replaceState" in i.history ? (i.history[o ? "pushState" : "replaceState"]({}, s.title, i.location.pathname + i.location.search + "#" + e.currentHash), o && (e.hasCreatedHistory = !0)) : i.location.hash = e.currentHash, e.hashTimer = null
                    }, 300)))
                }, "beforeClose.fb": function (t, e, n) {
                    n && !1 !== n.opts.hash && (clearTimeout(e.hashTimer), e.currentHash && e.hasCreatedHistory ? i.history.back() : e.currentHash && ("replaceState" in i.history ? i.history.replaceState({}, s.title, i.location.pathname + i.location.search + (e.origHash || "")) : i.location.hash = e.origHash), e.currentHash = null)
                }
            }), a(i).on("hashchange.fb", function () {
                var t = r(),
                    o = null;
                a.each(a(".fancybox-container").get().reverse(), function (t, e) {
                    var n = a(e).data("FancyBox");
                    if (n && n.currentHash) return o = n, !1
                }), o ? o.currentHash === t.gallery + "-" + t.index || 1 === t.index && o.currentHash == t.gallery || (o.currentHash = null, o.close()) : "" !== t.gallery && e(t)
            }), setTimeout(function () {
                a.fancybox.getInstance() || e(r())
            }, 50))
        })
    }(window, document, jQuery),
    function (t, e) {
        "use strict";
        var a = (new Date).getTime();
        e(t).on({
            "onInit.fb": function (t, o, e) {
                o.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (t) {
                    var e = o.current,
                        n = (new Date).getTime();
                    o.group.length < 2 || !1 === e.opts.wheel || "auto" === e.opts.wheel && "image" !== e.type || (t.preventDefault(), t.stopPropagation(), e.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, n - a < 250 || (a = n, o[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
                })
            }
        })
    }(document, jQuery);