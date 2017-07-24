/**
 * Created by on 2017/2/7.
 */
var scroll = function (event, scroller) {
    var k = event.wheelDelta ? event.wheelDelta : -event.detail * 10;
    scroller.scrollTop = scroller.scrollTop - k;
    return false;
};

$.fn.stickyfloat = function(options, lockBottom) {
    var $obj 				= this;
    var parentPaddingTop 	= parseInt($obj.parent().css('padding-top'));
    var startOffset 		= $obj.parent().offset().top;
    var opts 				= $.extend({ startOffset: startOffset, offsetY: parentPaddingTop, duration: 200, lockBottom:false }, options);

    $obj.css({ position: 'absolute'});

    if(opts.lockBottom){
        var bottomPos = $obj.parent().height() - $obj.height() + parentPaddingTop;
        if( bottomPos < 0 )
            bottomPos = 0;
    }

    $(window).scroll(function () {
        $obj.stop();

        var pastStartOffset			= $(document).scrollTop() > opts.startOffset;
        var objFartherThanTopPos	= $obj.offset().top > startOffset;
        var objBiggerThanWindow 	= $obj.outerHeight() < $(window).height();

        if( (pastStartOffset || objFartherThanTopPos) && objBiggerThanWindow ){
            var newpos = ($(document).scrollTop() -startOffset + opts.offsetY );
            if ( newpos > bottomPos )
                newpos = bottomPos;
            if ( $(document).scrollTop() < opts.startOffset )
                newpos = parentPaddingTop;

            $obj.animate({ top: newpos+180 }, opts.duration );
        }
    });
};

$(function(){
    $.fn.extend({
        selectDropdown: function () {
            this.each(function(){
                var $this=$(this);
                var $li=$this.find('.dropdown-menu>li');
                var $select=$this.find('.select');
                $li.each(function(){
                    var $self=$(this);
                    $self.click(function(){
                        $select.html($self.html())
                    })
                })
            })
        },
        gotoTop:function(){
           var timeout = 200;
            this.click(function () {
                $('html,body').animate({scrollTop: 0}, timeout);
            });
        }
    })
    $('.dropdown-select').selectDropdown();
    $('.back-top').gotoTop();
    $('input, textarea').placeholder();
    $('input.form-control').each(function () {
        var value = $(this).attr('placeholder');
        $(this).focus(function () {
            $(this).attr('placeholder', '');
            $(this).blur(function () {
                $(this).attr('placeholder', value)
            })
        })
    })

    function scrollfixed(obj,position){
        $(obj).on('click',function(){
            $('html,body').animate({scrollTop: $(position).offset().top},500);
            return false;
        });
    }
    scrollfixed('header .nav> li:nth-child(1)', 'body')
    scrollfixed('header .nav> li:nth-child(2)', '.theme')
    scrollfixed('header .nav> li:nth-child(3)','.product')
    scrollfixed('header .nav> li:nth-child(4)','.company-case')
    scrollfixed('header .nav> li:nth-child(5)','.cooperative-partner')
    scrollfixed('header .nav> li:nth-child(6)','.join-us')


    $('header .nav > li').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 300) {
            $('header').addClass('animate')
        } else {
            $('header').removeClass('animate')
        }
    });
    $(window).scroll(function(ele){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
       // var $coverlay=$(ele);
        if(scrollTop + windowHeight == scrollHeight){
            //code
        }else{
            //code
        }
    });
})


/*
 * jQuery Backstretch
 * Version 1.2.7
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2012 Scott Robbin (srobbin.com)
 * Licensed under the MIT license
 * https://raw.github.com/srobbin/jquery-backstretch/master/LICENSE.txt
 * 
*/

; (function ($) {

    $.backstretch = function (src, options, callback) {
        var defaultSettings = {
            centeredX: true         // Should we center the image on the X axis?
          , centeredY: true         // Should we center the image on the Y axis?
          , speed: 0                // fadeIn speed for background after image loads (e.g. "fast" or 500)
        }
      , $container = $("#backstretch")
      , settings = $container.data("settings") || defaultSettings // If this has been called once before, use the old settings as the default
      , existingSettings = $container.data('settings')
      , rootElement, supportsFixedPosition, useWindowInnerHeight
      , imgRatio, bgImg, bgWidth, bgHeight, bgOffset, bgCSS;

        // Extend the settings with those the user has provided
        if (options && typeof options == "object") $.extend(settings, options);

        // Just in case the user passed in a function without options
        if (options && typeof options == "function") callback = options;

        $(document).ready(function () {
            /*
             *  Taken from jQuery Mobile 1.1.0
             *  http://jquerymobile.com/
             *
             *  In a nutshell, we need to figure out if fixed positioning is supported.
             *  Unfortunately, this is very difficult to do on iOS, and usually involves
             *  injecting content, scrolling the page, etc.. It's ugly.
             *  jQuery Mobile uses this workaround. It's not ideal, but works.
             *
             *  Modified to detect IE6
             */
            var w = window
              , ua = navigator.userAgent
              , platform = navigator.platform
                // Rendering engine is Webkit, and capture major version
              , wkmatch = ua.match(/AppleWebKit\/([0-9]+)/)
              , wkversion = !!wkmatch && wkmatch[1]
              , ffmatch = ua.match(/Fennec\/([0-9]+)/)
              , ffversion = !!ffmatch && ffmatch[1]
              , operammobilematch = ua.match(/Opera Mobi\/([0-9]+)/)
              , omversion = !!operammobilematch && operammobilematch[1]
              , iematch = ua.match(/MSIE ([0-9]+)/)
              , ieversion = !!iematch && iematch[1];

            supportsFixedPosition = !(
              // iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
              ((platform.indexOf("iPhone") > -1 || platform.indexOf("iPad") > -1 || platform.indexOf("iPod") > -1) && wkversion && wkversion < 534)
              ||
              // Opera Mini
              (w.operamini && ({}).toString.call(w.operamini) === "[object OperaMini]")
              ||
              (operammobilematch && omversion < 7458)
              ||
              //Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
              (ua.indexOf("Android") > -1 && wkversion && wkversion < 533)
              ||
              // Firefox Mobile before 6.0 -
              (ffversion && ffversion < 6)
              ||
              // WebOS less than 3
              ("palmGetResource" in window && wkversion && wkversion < 534)
              ||
              // MeeGo
              (ua.indexOf("MeeGo") > -1 && ua.indexOf("NokiaBrowser/8.5.0") > -1)
              ||
              // IE6
              (ieversion && ieversion <= 6)
            );

            // Set the root element
            rootElement = supportsFixedPosition ? $(window) : $(document);

            // Should we use the window's innerHeight?
            useWindowInnerHeight = supportsFixedPosition && window.innerHeight;

            // Initialize the plugin
            _init();
        });

        // For chaining
        return this;

        function _init() {
            // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
            if (src) {
                var img;

                // If this is the first time that backstretch is being called
                if ($container.length == 0) {
                    $container = $("<div />").attr("id", "backstretch")
                                             .css({ left: 0, top: 0, position: supportsFixedPosition ? "fixed" : "absolute", overflow: "hidden", zIndex: -999999, margin: 0, padding: 0, height: "100%", width: "100%" });
                } else {
                    // Prepare to delete any old images
                    $container.find("img").addClass("deleteable");
                }

                img = $("<img />").css({ position: "absolute", display: "none", margin: 0, padding: 0, border: "none", zIndex: -999999 })
                                  .bind("load", function (e) {
                                      var $self = $(this),
                                          imgWidth, imgHeight;

                                      $self.css({ width: "auto", height: "auto" });
                                      imgWidth = this.width || $(e.target).width();
                                      imgHeight = this.height || $(e.target).height();
                                      imgRatio = imgWidth / imgHeight;

                                      _adjustBG();
                                      $self.fadeIn(settings.speed, function () {
                                          // Remove the old images, if necessary.
                                          $container.find('.deleteable').remove();
                                          // Callback
                                          if (typeof callback == "function") callback();
                                      });
                                  })
                                  .appendTo($container);

                // Append the container to the body, if it's not already there
                if ($("body #backstretch").length == 0) {
                    /*
                     * Scroll the page one pixel to get the right window height on iOS
                     * Pretty harmless for everyone else
                    */
                    if ($(window).scrollTop() === 0) window.scrollTo(0, 0);
                    $("body").append($container);
                }

                // Attach the settings
                $container.data("settings", settings);

                img.attr("src", src); // Hack for IE img onload event

                // Adjust the background size when the window is resized or orientation has changed (iOS)
                $(window).unbind("resize.backstretch").bind("resize.backstretch", function () {
                    // Need to do this in order to get the right window height
                    if ("onorientationchange" in window) {
                        if (window.pageYOffset === 0) window.scrollTo(0, 1);
                    }
                    _adjustBG()
                });
            }
        }

        function _adjustBG() {
            try {
                bgCSS = { left: 0, top: 0 }
              , rootWidth = bgWidth = rootElement.width()
              , rootHeight = useWindowInnerHeight ? window.innerHeight : rootElement.height()
              , bgHeight = bgWidth / imgRatio;

                // Make adjustments based on image ratio
                // Note: Offset code provided by Peter Baker (http://ptrbkr.com/). Thanks, Peter!
                if (bgHeight >= rootHeight) {
                    bgOffset = (bgHeight - rootHeight) / 2;
                    if (settings.centeredY) bgCSS.top = "-" + bgOffset + "px";
                } else {
                    bgHeight = rootHeight;
                    bgWidth = bgHeight * imgRatio;
                    bgOffset = (bgWidth - rootWidth) / 2;
                    if (settings.centeredX) bgCSS.left = "-" + bgOffset + "px";
                }

                $container.css({ width: rootWidth, height: rootHeight })
                          .find("img:not(.deleteable)").css({ width: bgWidth, height: bgHeight }).css(bgCSS);
            } catch (err) {
                // IE7 seems to trigger _adjustBG before the image is loaded.
                // This try/catch block is a hack to let it fail gracefully.
            }
        }
    };

})(jQuery);

;
(function (f, h, $) {
    var a = 'placeholder' in h.createElement('input'), d = 'placeholder' in h.createElement('textarea'), i = $.fn, c = $.valHooks, k, j;
    if (a && d) {
        j = i.placeholder = function () {
            return this
        };
        j.input = j.textarea = true
    } else {
        j = i.placeholder = function () {
            var l = this;
            l.filter((a ? 'textarea' : ':input') + '[placeholder]').not('.placeholder').bind({
                'focus.placeholder': b,
                'blur.placeholder': e
            }).data('placeholder-enabled', true).trigger('blur.placeholder');
            return l
        };
        j.input = a;
        j.textarea = d;
        k = {
            get: function (m) {
                var l = $(m);
                return l.data('placeholder-enabled') && l.hasClass('placeholder') ? '' : m.value
            }, set: function (m, n) {
                var l = $(m);
                if (!l.data('placeholder-enabled')) {
                    return m.value = n
                }
                if (n == '') {
                    m.value = n;
                    if (m != h.activeElement) {
                        e.call(m)
                    }
                } else {
                    if (l.hasClass('placeholder')) {
                        b.call(m, true, n) || (m.value = n)
                    } else {
                        m.value = n
                    }
                }
                return l
            }
        };
        a || (c.input = k);
        d || (c.textarea = k);
        $(function () {
            $(h).delegate('form', 'submit.placeholder', function () {
                var l = $('.placeholder', this).each(b);
                setTimeout(function () {
                    l.each(e)
                }, 10)
            })
        });
        $(f).bind('beforeunload.placeholder', function () {
            $('.placeholder').each(function () {
                this.value = ''
            })
        })
    }
    function g(m) {
        var l = {}, n = /^jQuery\d+$/;
        $.each(m.attributes, function (p, o) {
            if (o.specified && !n.test(o.name)) {
                l[o.name] = o.value
            }
        });
        return l
    }

    function b(m, n) {
        var l = this, o = $(l);
        if (l.value == o.attr('placeholder') && o.hasClass('placeholder')) {
            if (o.data('placeholder-password')) {
                o = o.hide().next().show().attr('id', o.removeAttr('id').data('placeholder-id'));
                if (m === true) {
                    return o[0].value = n
                }
                o.focus()
            } else {
                l.value = '';
                o.removeClass('placeholder');
                l == h.activeElement && l.select()
            }
        }
    }

    function e() {
        var q, l = this, p = $(l), m = p, o = this.id;
        if (l.value == '') {
            if (l.type == 'password') {
                if (!p.data('placeholder-textinput')) {
                    try {
                        q = p.clone().attr({ type: 'text' })
                    } catch (n) {
                        q = $('<input>').attr($.extend(g(this), { type: 'text' }))
                    }
                    q.removeAttr('name').data({
                        'placeholder-password': true,
                        'placeholder-id': o
                    }).bind('focus.placeholder', b);
                    p.data({ 'placeholder-textinput': q, 'placeholder-id': o }).before(q)
                }
                p = p.removeAttr('id').hide().prev().attr('id', o).show()
            }
            p.addClass('placeholder');
            p[0].value = p.attr('placeholder')
        } else {
            p.removeClass('placeholder')
        }
    }
}(this, document, jQuery));