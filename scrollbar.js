;(function ( $, window, document, undefined ) {
    /**
     * @param carousel
     * @constructor
     */
    var Scroller = function(carousel){
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;

        /**
         * Indicates whether the plugin is initialized or not.
         * @protected
         * @type {Boolean}
         */
        this._initialized = false;

        /**
         * The carousel element.
         * @type {jQuery}
         */
        this.$element = this._core.$element;

        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */
        this._handlers = {
            'initialized.owl.carousel': $.proxy(function(e) {
                if(e.namespace && !this._initialized) {
                    this.initialize();
                    this._initialized = true;
                }
            }, this),
            'drag.owl.carousel' : $.proxy(function(e) {
                if(e.namespace && this._initialized) {
                    this.dragHandler(e);
                }
            }, this),
            'translated.owl.carousel' : $.proxy(function(e) {
                if(e.namespace && this._initialized) {
                    this.translatedHandler(e);
                }
            }, this)
        };

        // Merge Options
        this._core.options = $.extend({}, Scroller.Defaults, this._core.options);
        this.$element.on(this._handlers);
    };

    /**
     * Default options.
     * @public
     */
    Scroller.Defaults = {
        scrollBar    : false,
        scrollWrapId : "owl-carousel-scrollWrap",
        scrollBarClass : "owl-carousel-scrollBar"
    };


    /**
     * Experimenting.
     * @protected
     */
    Scroller.prototype.initialize = function() {
        // @todo check if using nav.
        console.log(this);
        var settings = this._core.settings,
            element  = this.$element,
            dragBar  = $("<div />"),
            dragWrap = $("<div />", {
                class: settings.scrollWrapId
            });

        // @todo remove style.
        if(settings.scrollBar) {
            dragBar
                //.css({position: "absolute", width : "100px", height: "10px", "background-color": "red"}) 
                .addClass(settings.scrollBarClass)
                .appendTo(dragWrap)
                .on('mousedown', $.proxy(function(e) {
                    this.barScroll(e);
                }, this));

            dragWrap.appendTo($(element));
        }
    };

    /**
     * Scroll bar drag handler.
     * @param e
     * @protected
     */
    Scroller.prototype.barScroll = function(e) {
        var $dragging = null;
        var canDrag   = true;
        var mousedown = false;
        var el_w      = $(e.currentTarget).outerWidth();
        var el_l      = $(e.currentTarget).offset().left;

        // Experiments
        $(e.currentTarget).on('mousedown', $.proxy(function(e) {
            mousedown = true;
        }, this)).on("mousemove", $.proxy(function(e) {
            if(canDrag && mousedown) {
                // if ($dragging) {
                //     $dragging.offset({
                //         left: e.pageX - el_w
                //     });
                //     console.log('working')
                // }
                // $dragging = $(e.target);
            }
        }, this))
        .on('mouseup', $.proxy(function(e) {
            canDrag = false;
            mousedown = false;
        }, this));
    };

    Scroller.prototype.dragDirection = function() {

    };

    Scroller.prototype.dragSpeed = function() {

    };

    Scroller.prototype.dragHandler = function(e) {
        // console.log(e.currentTarget);
        // console.log(this._core.maximum(false));
        // console.log(this._core.current())
    };

    Scroller.prototype.translatedHandler = function(e) {
        console.log(e);
        console.log('this: ', $(e.currentTarget).find('.owl-carousel-scrollBar'));
        let index = e.item.index;
        let count = e.item.count;
        let width_scrollBar = (1 / count) * 100;
        if (index > count) {
            index -= count;
        }
        console.log('count: ', count);
        console.log('index: ', index);
        $(e.currentTarget).find('.owl-carousel-scrollBar').css('width', width_scrollBar + '%');
        $(e.currentTarget).find('.owl-carousel-scrollBar').css('left', (index * width_scrollBar) * 2 + '%');
    }

    Scroller.prototype.destroy = function(){
        // @todo
    };

    $.fn.owlCarousel.Constructor.Plugins.Scroller = Scroller;

})( window.Zepto || window.jQuery, window,  document );