/* Validation form */
validateForm('validation-newsletter');
validateForm('validation-cart');
validateForm('validation-user');
validateForm('validation-contact');

/* Lazys */
NN_FRAMEWORK.Lazys = function () {
    if (isExist($('.lazy'))) {
        var lazyLoadInstance = new LazyLoad({
            elements_selector: '.lazy',
        });
    }
};

/* Load name input file */
NN_FRAMEWORK.loadNameInputFile = function () {
    if (isExist($('.custom-file input[type=file]'))) {
        $('body').on('change', '.custom-file input[type=file]', function () {
            var fileName = $(this).val();
            fileName = fileName.substr(fileName.lastIndexOf('\\') + 1, fileName.length);
            $(this).siblings('label').html(fileName);
        });
    }
};

/* Back to top */
NN_FRAMEWORK.GoTop = function () {
    $(window).scroll(function () {
        if (!$('.scrollToTop').length)
            $('body').append('<div class="scrollToTop"><img src="' + GOTOP + '" alt="Go Top"/></div>');
        if ($(this).scrollTop() > 100) $('.scrollToTop').fadeIn();
        else $('.scrollToTop').fadeOut();
    });

    $('body').on('click', '.scrollToTop', function () {
        $('html, body').animate({
                scrollTop: 0,
            },
            800
        );
        return false;
    });
};

/* Alt images */
NN_FRAMEWORK.AltImg = function () {
    $('img').each(function (index, element) {
        if (!$(this).attr('alt') || $(this).attr('alt') == '') {
            $(this).attr('alt', WEBSITE_NAME);
        }
    });
};

/* Menu */
NN_FRAMEWORK.Menu = function () {
    /* Menu remove empty ul */
    if (isExist($('.menu'))) {
        $('.menu ul li a').each(function () {
            $this = $(this);

            if (!isExist($this.next('ul').find('li'))) {
                $this.next('ul').remove();
                $this.removeClass('has-child');
            }
        });
    }

    /* Menu Has Scroll */
    if (isExist($('.header'))) {
        $(window).scroll(function () {
            var headerHeight = $('.header').outerHeight() + 0.0001;
            if ($(window).scrollTop() >= headerHeight) {
                $('.menu-res').addClass('has-scroll');
            } else {
                $('.menu-res').removeClass('has-scroll');
            }

            if ($(window).scrollTop() >= headerHeight) {
                $('.menu').addClass('has-scroll');
            } else {
                $('.menu').removeClass('has-scroll');
            }
        });
    } else {
        if (isExist($('.menu'))) {
            $('.menu').addClass('has-scroll');
            $(window).scroll(function () {
                if ($(window).scrollTop() >= 60) {
                    $('.menu').addClass('scroll-active');
                } else {
                    $('.menu').removeClass('scroll-active');
                }
            });
        } else {
            $('.menu-res').addClass('has-scroll');
        }
    }

    /* Mmenu */
    if (isExist($('.menu-res nav#nav'))) {
        $('.menu-res nav#nav ul').removeAttr('class');
        $('.menu-res nav#nav').mmenu({
            extensions: ['position-left', 'fx-menu-slide', 'shadow-panels', 'listview-large'],
            iconPanels: false,
            counters: true,
            keyboardNavigation: {
                enable: true,
                enhance: true,
            },
            navbar: {
                title: 'Menu',
            },
            navbars: true,
        }, {
            searchfield: {
                clear: true,
            },
        });
    }
};

/* Top Space */
NN_FRAMEWORK.TopSpace = function () {
    var menuHeight = isExist($('.menu')) ? $('.menu').innerHeight() : $('.menu-res').innerHeight();
    if (isExist($('.header'))) {
        $(window).scroll(function () {
            var headerHeight = $('.header').innerHeight() + 0.0001;
            if ($(window).scrollTop() >= headerHeight) {
                $('.top-space').css({
                    marginTop: menuHeight + 'px',
                });
            } else {
                $('.top-space').css({
                    marginTop: '0px',
                });
            }
        });
    } else {
        $('.top-space').css({
            marginTop: menuHeight + 'px',
        });
    }
};

/* Tools */
NN_FRAMEWORK.Tools = function () {
    if (isExist($('.toolbar'))) {
        $('#footer-primary').css({
            marginBottom: $('.toolbar').outerHeight(),
        });
    }
};

/* Popup */
NN_FRAMEWORK.Popup = function () {
    if (isExist($('#popup'))) {
        $('#popup').modal('show');
    }
};

/* Wow */
NN_FRAMEWORK.Wows = function () {
    new WOW().init();
};

/* Pagings */
NN_FRAMEWORK.Pagings = function () {
    /* Products */
    // if(isExist($(".paging-product")))
    // {
    //     loadPaging("api/product.php?perpage=8",'.paging-product');
    // }
    /* Categories */
    // if(isExist($(".paging-product-category")))
    // {
    //     $(".paging-product-category").each(function(){
    //         var list = $(this).data("list");
    //         loadPaging("api/product.php?perpage=8&idList="+list,'.paging-product-category-'+list);
    //     });
    // }
    /* Product List */
    // if (isExist($(".productList-list"))) {
    //     $(".productList-item").click(function() {
    //         $(this).parents(".productList-list").find(".productList-item.active").removeClass("active");
    //         $(this).addClass("active");
    //         var list = $(this).data("list");
    //         loadPaging("api/product.php?perpage=10&idList=" + list, '.paging-productList');
    //     });
    //     $(".productList-item.active").each(function() {
    //         var list = $(this).parents(".productList-list").find(".productList-item.active").data("list");
    //         loadPaging("api/product.php?perpage=10&idList=" + list, '.paging-productList');
    //     });
    // }
};

/* Photobox */
NN_FRAMEWORK.Photobox = function () {
    if (isExist($('.album-gallery'))) {
        $('.album-gallery').photobox('a', {
            thumbs: true,
            loop: false,
        });
    }
};

/* Comment */
NN_FRAMEWORK.Comment = function () {
    if (isExist($('.comment-page'))) {
        $('.comment-page').comments({
            url: 'api/comment.php',
        });
    }
};

/* DatePicker */
NN_FRAMEWORK.DatePicker = function () {
    if (isExist($('#birthday'))) {
        $('#birthday').datetimepicker({
            timepicker: false,
            format: 'd/m/Y',
            formatDate: 'd/m/Y',
            minDate: '01/01/1950',
            maxDate: TIMENOW,
        });
    }
};

/* Search */
NN_FRAMEWORK.Search = function () {
    if (isExist($('.search__toggle .search__icon'))) {
        $('.search__toggle .search__icon').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.search__grid').stop(true, true).animate({
                        opacity: '0',
                        width: '0px',
                    },
                    200
                );
            } else {
                $(this).addClass('active');
                $('.search__grid').stop(true, true).animate({
                        opacity: '1',
                        width: '230px',
                    },
                    200
                );
            }

            document.getElementById($(this).next().find('input').attr('id')).focus();
            $('.search__toggle .search__icon i').toggleClass('fa fa-search fa fa-times');
        });
    }
};

/* Videos */
NN_FRAMEWORK.Videos = function () {
    /* Fancybox */
    // $('[data-fancybox="something"]').fancybox({
    //     // transitionEffect: "fade",
    //     // transitionEffect: "slide",
    //     // transitionEffect: "circular",
    //     // transitionEffect: "tube",
    //     // transitionEffect: "zoom-in-out",
    //     // transitionEffect: "rotate",
    //     transitionEffect: "fade",
    //     transitionDuration: 800,
    //     animationEffect: "fade",
    //     animationDuration: 800,
    //     slideShow: {
    //         autoStart: true,
    //         speed: 3000
    //     },
    //     arrows: true,
    //     infobar: false,
    //     toolbar: false,
    //     hash: false
    // });

    if (isExist($('[data-fancybox="video"]'))) {
        $('[data-fancybox="video"]').fancybox({
            transitionEffect: 'fade',
            transitionDuration: 800,
            animationEffect: 'fade',
            animationDuration: 800,
            arrows: true,
            infobar: false,
            toolbar: true,
            hash: false,
        });
    }
};

/* Owl Data */
NN_FRAMEWORK.OwlData = function (obj) {
    if (!isExist(obj)) return false;
    var xsm_items = obj.attr('data-xsm-items');
    var sm_items = obj.attr('data-sm-items');
    var md_items = obj.attr('data-md-items');
    var lg_items = obj.attr('data-lg-items');
    var xlg_items = obj.attr('data-xlg-items');
    var rewind = obj.attr('data-rewind');
    var autoplay = obj.attr('data-autoplay');
    var loop = obj.attr('data-loop');
    var lazyLoad = obj.attr('data-lazyload');
    var mouseDrag = obj.attr('data-mousedrag');
    var touchDrag = obj.attr('data-touchdrag');
    var animations = obj.attr('data-animations');
    var smartSpeed = obj.attr('data-smartspeed');
    var autoplaySpeed = obj.attr('data-autoplayspeed');
    var autoplayTimeout = obj.attr('data-autoplaytimeout');
    var center = obj.attr('data-center');
    var dots = obj.attr('data-dots');
    var nav = obj.attr('data-nav');
    var navText = false;
    var navContainer = false;
    var responsive = {};
    var responsiveClass = true;
    var responsiveRefreshRate = 200;

    if (xsm_items != '') {
        xsm_items = xsm_items.split(':');
    }
    if (sm_items != '') {
        sm_items = sm_items.split(':');
    }
    if (md_items != '') {
        md_items = md_items.split(':');
    }
    if (lg_items != '') {
        lg_items = lg_items.split(':');
    }
    if (xlg_items != '') {
        xlg_items = xlg_items.split(':');
    }
    if (rewind == 1) {
        rewind = true;
    } else {
        rewind = false;
    }
    if (autoplay == 1) {
        autoplay = true;
    } else {
        autoplay = false;
    }
    if (loop == 1) {
        loop = true;
    } else {
        loop = false;
    }
    if (lazyLoad == 1) {
        lazyLoad = true;
    } else {
        lazyLoad = false;
    }
    if (mouseDrag == 1) {
        mouseDrag = true;
    } else {
        mouseDrag = false;
    }
    if (animations != '') {
        animations = animations;
    } else {
        animations = false;
    }
    if (smartSpeed > 0) {
        smartSpeed = Number(smartSpeed);
    } else {
        smartSpeed = 800;
    }
    if (autoplaySpeed > 0) {
        autoplaySpeed = Number(autoplaySpeed);
    } else {
        autoplaySpeed = 800;
    }
    if (autoplayTimeout > 0) {
        autoplayTimeout = Number(autoplayTimeout);
    } else {
        autoplayTimeout = 5000;
    }
    if (center == 1) {
        center = true;
    } else {
        center = false;
    }
    if (dots == 1) {
        dots = true;
    } else {
        dots = false;
    }
    if (nav == 1) {
        nav = true;
        navText = obj.attr('data-navtext');
        navContainer = obj.attr('data-navcontainer');

        if (navText != '') {
            navText = navText.indexOf('|') > 0 ? navText.split('|') : navText.split(':');
            navText = [navText[0], navText[1]];
        }

        if (navContainer != '') {
            navContainer = navContainer;
        }
    } else {
        nav = false;
    }

    responsive = {
        0: {
            items: Number(xsm_items[0]),
            margin: Number(xsm_items[1]),
        },
        500: {
            items: Number(sm_items[0]),
            margin: Number(sm_items[1]),
        },
        768: {
            items: Number(md_items[0]),
            margin: Number(md_items[1]),
        },
        1024: {
            items: Number(lg_items[0]),
            margin: Number(lg_items[1]),
        },
        1200: {
            items: Number(xlg_items[0]),
            margin: Number(xlg_items[1]),
        },
    };

    obj.owlCarousel({
        rewind: rewind,
        autoplay: autoplay,
        loop: loop,
        lazyLoad: lazyLoad,
        mouseDrag: mouseDrag,
        touchDrag: touchDrag,
        smartSpeed: smartSpeed,
        autoplaySpeed: autoplaySpeed,
        autoplayTimeout: autoplayTimeout,
        center: center,
        dots: dots,
        nav: nav,
        navText: navText,
        navContainer: navContainer,
        responsiveClass: responsiveClass,
        responsiveRefreshRate: responsiveRefreshRate,
        responsive: responsive,
    });

    if (autoplay) {
        obj.on('translate.owl.carousel', function (event) {
            obj.trigger('stop.owl.autoplay');
        });

        obj.on('translated.owl.carousel', function (event) {
            obj.trigger('play.owl.autoplay', [autoplayTimeout]);
        });
    }

    if (animations && isExist(obj.find('[owl-item-animation]'))) {
        var animation_now = '';
        var animation_count = 0;
        var animations_excuted = [];
        var animations_list = animations.indexOf(',') ? animations.split(',') : animations;

        obj.on('changed.owl.carousel', function (event) {
            $(this).find('.owl-item.active').find('[owl-item-animation]').removeClass(animation_now);
        });

        obj.on('translate.owl.carousel', function (event) {
            var item = event.item.index;

            if (Array.isArray(animations_list)) {
                var animation_trim = animations_list[animation_count].trim();

                if (!animations_excuted.includes(animation_trim)) {
                    animation_now = 'animate__animated ' + animation_trim;
                    animations_excuted.push(animation_trim);
                    animation_count++;
                }

                if (animations_excuted.length == animations_list.length) {
                    animation_count = 0;
                    animations_excuted = [];
                }
            } else {
                animation_now = 'animate__animated ' + animations_list.trim();
            }
            $(this).find('.owl-item').eq(item).find('[owl-item-animation]').addClass(animation_now);
        });
    }
};

/* Owl Page */
NN_FRAMEWORK.OwlPage = function () {
    if (isExist($('.owl-page'))) {
        $('.owl-page').each(function () {
            NN_FRAMEWORK.OwlData($(this));
        });
    }
};

/* Dom Change */
NN_FRAMEWORK.DomChange = function () {
    /* Video Fotorama */
    $('#video-fotorama').one('DOMSubtreeModified', function () {
        $('#fotorama-videos').fotorama();
    });

    /* Video Select */
    $('#video-select').one('DOMSubtreeModified', function () {
        $('.listvideos').change(function () {
            var id = $(this).val();
            $.ajax({
                url: 'api/video.php',
                type: 'POST',
                dataType: 'html',
                data: {
                    id: id,
                },
                beforeSend: function () {
                    holdonOpen();
                },
                success: function (result) {
                    $('.video-main').html(result);
                    holdonClose();
                },
            });
        });
    });

    /* Chat Facebook */
    $('#messages-facebook').one('DOMSubtreeModified', function () {
        $('.js-facebook-messenger-box').on('click', function () {
            $('.js-facebook-messenger-box, .js-facebook-messenger-container').toggleClass('open'),
            $('.js-facebook-messenger-tooltip').length && $('.js-facebook-messenger-tooltip').toggle();
        }),
        $('.js-facebook-messenger-box').hasClass('cfm') &&
        setTimeout(function () {
            $('.js-facebook-messenger-box').addClass('rubberBand animated');
        }, 3500),
        $('.js-facebook-messenger-tooltip').length &&
        ($('.js-facebook-messenger-tooltip').hasClass('fixed') ?
            $('.js-facebook-messenger-tooltip').show() :
            $('.js-facebook-messenger-box').on('hover', function () {
                $('.js-facebook-messenger-tooltip').show();
            }),
            $('.js-facebook-messenger-close-tooltip').on('click', function () {
                $('.js-facebook-messenger-tooltip').addClass('closed');
            }));
        $('.search_open').click(function () {
            $('.search_box_hide').toggleClass('opening');
        });
    });
};

/* Cart */
NN_FRAMEWORK.Cart = function () {
    /* Add */
    $('body').on('click', '.addcart', function () {
        $this = $(this);
        $parents = $this.parents('.right-pro-detail');
        var id = $this.data('id');
        var action = $this.data('action');
        var quantity = $parents.find('.quantity-pro-detail').find('.qty-pro').val();
        quantity = quantity ? quantity : 1;
        var color = $parents.find('.color-block-pro-detail').find('.color-pro-detail input:checked').val();
        color = color ? color : 0;
        var size = $parents.find('.size-block-pro-detail').find('.size-pro-detail input:checked').val();
        size = size ? size : 0;

        if (id) {
            $.ajax({
                url: 'api/cart.php',
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {
                    cmd: 'add-cart',
                    id: id,
                    color: color,
                    size: size,
                    quantity: quantity,
                },
                beforeSend: function () {
                    holdonOpen();
                },
                success: function (result) {
                    if (action == 'addnow') {
                        $('.count-cart').html(result.max);
                        $.ajax({
                            url: 'api/cart.php',
                            type: 'POST',
                            dataType: 'html',
                            async: false,
                            data: {
                                cmd: 'popup-cart',
                            },
                            success: function (result) {
                                $('#popup-cart .modal-body').html(result);
                                $('#popup-cart').modal('show');
                                NN_FRAMEWORK.Lazys();
                                holdonClose();
                            },
                        });
                    } else if (action == 'buynow') {
                        window.location = CONFIG_BASE + 'gio-hang';
                    }
                },
            });
        }
    });

    /* Delete */
    $('body').on('click', '.del-procart', function () {
        confirmDialog('delete-procart', LANG['delete_product_from_cart'], $(this));
    });

    /* Counter */
    $('body').on('click', '.counter-procart', function () {
        var $button = $(this);
        var quantity = 1;
        var input = $button.parent().find('input');
        var id = input.data('pid');
        var code = input.data('code');
        var oldValue = $button.parent().find('input').val();
        if ($button.text() == '+') quantity = parseFloat(oldValue) + 1;
        else if (oldValue > 1) quantity = parseFloat(oldValue) - 1;
        $button.parent().find('input').val(quantity);
        updateCart(id, code, quantity);
    });

    /* Quantity */
    $('body').on('change', 'input.quantity-procart', function () {
        var quantity = $(this).val() < 1 ? 1 : $(this).val();
        $(this).val(quantity);
        var id = $(this).data('pid');
        var code = $(this).data('code');
        updateCart(id, code, quantity);
    });

    /* City */
    if (isExist($('.select-city-cart'))) {
        $('.select-city-cart').change(function () {
            var id = $(this).val();
            loadDistrict(id);
            loadShip();
        });
    }

    /* District */
    if (isExist($('.select-district-cart'))) {
        $('.select-district-cart').change(function () {
            var id = $(this).val();
            loadWard(id);
            loadShip();
        });
    }

    /* Ward */
    if (isExist($('.select-ward-cart'))) {
        $('.select-ward-cart').change(function () {
            var id = $(this).val();
            loadShip(id);
        });
    }

    /* Payments */
    if (isExist($('.payments-label'))) {
        $('.payments-label').click(function () {
            var payments = $(this).data('payments');
            $('.payments-cart .payments-label, .payments-info').removeClass('active');
            $(this).addClass('active');
            $('.payments-info-' + payments).addClass('active');
        });
    }

    /* Colors */
    if (isExist($('.color-pro-detail'))) {
        $('.color-pro-detail input').click(function () {
            $this = $(this).parents('label.color-pro-detail');
            $parents = $this.parents('.attr-pro-detail');
            $parents_detail = $this.parents('.grid-pro-detail');
            $parents.find('.color-block-pro-detail').find('.color-pro-detail').removeClass('active');
            $parents.find('.color-block-pro-detail').find('.color-pro-detail input').prop('checked', false);
            $this.addClass('active');
            $this.find('input').prop('checked', true);
            var id_color = $parents.find('.color-block-pro-detail').find('.color-pro-detail input:checked').val();
            var id_pro = $this.data('idproduct');

            $.ajax({
                url: 'api/color.php',
                type: 'POST',
                dataType: 'html',
                data: {
                    id_color: id_color,
                    id_pro: id_pro,
                },
                beforeSend: function () {
                    holdonOpen();
                },
                success: function (result) {
                    if (result) {
                        $parents_detail.find('.left-pro-detail').html(result);
                        MagicZoom.refresh('Zoom-1');
                        NN_FRAMEWORK.OwlData($('.owl-pro-detail'));
                        NN_FRAMEWORK.Lazys();
                    }
                    holdonClose();
                },
            });
        });
    }

    /* Sizes */
    if (isExist($('.size-pro-detail'))) {
        $('.size-pro-detail input').click(function () {
            $this = $(this).parents('label.size-pro-detail');
            $parents = $this.parents('.attr-pro-detail');
            $parents.find('.size-block-pro-detail').find('.size-pro-detail').removeClass('active');
            $parents.find('.size-block-pro-detail').find('.size-pro-detail input').prop('checked', false);
            $this.addClass('active');
            $this.find('input').prop('checked', true);
        });
    }

    /* Quantity detail page */
    if (isExist($('.quantity-pro-detail span'))) {
        $('.quantity-pro-detail span').click(function () {
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            if ($button.text() == '+') {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                if (oldValue > 1) var newVal = parseFloat(oldValue) - 1;
                else var newVal = 1;
            }
            $button.parent().find('input').val(newVal);
        });
    }
};

/**/
function f_height_fslider() {
    if (isExist($('.slideshow__box'))) {
        var height_fslider = $('.slideshow__box').outerHeight(true);
    } else {
        var height_fslider = 489 + 'px';
    }

    $('.hdanhmucdrops .content').css('height', height_fslider);
    $('.hdanhmucdropsjs .content').css('height', height_fslider);
}

/* danhMucDrops */
NN_FRAMEWORK.danhMucDrops = function () {
    if (isExist($('.hdanhmucdrops'))) {
        $('.hdanhmucdrops .content > li').hover(
            function () {
                var vitri = $(this).position().top;
                $(this)
                    .children('ul')
                    .eq(0)
                    .css({
                        top: vitri + 'px',
                    });
            },
            function () {
            }
        );
        if (!isExist($('.hdanhmucdrops'))) {
            f_height_fslider();
            $(window).resize(function () {
                f_height_fslider();
            });
        }
        if (SOURCEWEB) {
            $('.hdanhmucdrops').hover(
                function () {
                    $('.hdanhmucdrops > .nicescl').stop(true, true).slideDown();
                },
                function () {
                    $('.hdanhmucdrops > .nicescl').hide();
                }
            );
        }
    }
    if (isExist($('.hdanhmucdropsjs'))) {
        $('.hdanhmucdropsjs .content > li').hover(
            function () {
                var vitri = $(this).position().top;
                $(this)
                    .children('ul')
                    .eq(0)
                    .css({
                        top: vitri + 'px',
                    });
            },
            function () {
            }
        );
        if (!isExist($('.hdanhmucdropsjs'))) {
            f_height_fslider();
            $(window).resize(function () {
                f_height_fslider();
            });
        }
    }
};

/* Quick View Product */
NN_FRAMEWORK.QuickViewProduct = function () {
    if (isExist($('.product-btn-quickview'))) {
        $('body').on('click', '.product-btn-quickview', function () {
            var id = $(this).data('id');
            loadPaging('api/quick-view-product.php?id=' + id, '.popup-product');
        });
    }
};

/* Menu Toggle */
NN_FRAMEWORK.MenuToggle = function () {
    if (isExist($('.category-toggle__list'))) {
        $('.category-toggle__list .category-toggle__btn').click(function () {
            $(this).toggleClass('active');
            $(this).parent('li').find('ul').eq(0).slideToggle(300);
            $(this).find('i').toggleClass('active');
        });
    }
};

/* Menu Desk */
NN_FRAMEWORK.MenuDesk = function () {
    if (isExist($('.menu'))) {
        $('.menu-btn').click(function () {
            $('.menu-desk').addClass('show');
        });
        // $('.menu-desk__btn-exit').click(function(event) {
        //     event.stopPropagation();
        //     $(".menu-desk").removeClass("show");
        // });
        $('.menu-desk').click(function (event) {
            event.stopPropagation();
            $('.menu-desk').removeClass('show');
        });
    }
};

/* Map */
NN_FRAMEWORK.Map = function () {
    if (isExist($('.branch-list'))) {
        $('.branch-list .branch-item').click(function () {
            $(this).parents('.branch-list').find('.branch-item.active').removeClass('active');
            $(this).addClass('active');
            var id = $(this).data('id');
            loadPaging('api/map.php?id=' + id, '.branch-detail');
        });
        $('.branch-list .branch-item.active').each(function () {
            var id = $(this).data('id');
            loadPaging('api/map.php?id=' + id, '.branch-detail');
        });
    }
};

/* Scroll Down */
NN_FRAMEWORK.ScrollDown = function () {
    if (isExist($('.slideshow'))) {
        var slideshowHeight = $('.slideshow').height();
        var menuDeskHeight = isExist($('.menu')) ? $('.menu').height() : 0;
        var menuMobileHeight = isExist($('.menu-res')) ? $('.menu-res').height() : 0;
        var scrollHeight = slideshowHeight - menuDeskHeight - menuMobileHeight;
        $('.slide-scroll').click(function (event) {
            event.preventDefault();
            $('html, body').animate({
                    scrollTop: scrollHeight,
                },
                800
            );
        });
    }
};

/* Slick Nav For */
NN_FRAMEWORK.SlickNavFor = function () {
    $('.slider-for').slick({
        asNavFor: '.slider-nav',
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    });
    $('.slider-nav').slick({
        asNavFor: '.slider-for',
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        focusOnSelect: true,
        centerMode: false,
        centerPadding: '0px',
        dots: false,
        arrows: false,
        prevArrow: '<img src="./assets/images/slick/arrow-prev.png" alt="Prev" class="slick-prev">',
        nextArrow: '<img src="./assets/images/slick/arrow-next.png" alt="Next" class="slick-next">',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
            },
        }, {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
            },
        },],
    });
};

/* Slick Normal */
NN_FRAMEWORK.SlickNormal = function () {
    if (isExist($('.slick-intro'))) {
        $('.slick-intro').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            centerMode: true,
            centerPadding: '100px',
            dots: false,
            arrows: true,
            prevArrow: '<img src="./assets/images/slick/arrow-prev.png" alt="Prev" class="slick-prev">',
            nextArrow: '<img src="./assets/images/slick/arrow-next.png" alt="Next" class="slick-next">',
            responsive: [{
                breakpoint: 768,
                settings: {
                    centerPadding: '50px',
                },
            }, {
                breakpoint: 576,
                settings: {
                    centerPadding: '50px',
                },
            },],
        });
    }
};

/**
 * Help you calculate the rest width from element to the end of the client browser
 * @example GetRestWidth('block__element','rest-width','block');
 * @param {string} eleCal The element name (ID or CLASS) to calculate.
 * @param {string} cssVar The CSS variable name to declare and return (not contain '--').
 * @param {string} eleRe The element name (ID or CLASS) to return.
 * @return 'cssVar' and width in pixels at 'eleRe'
 */
function GetRestWidth(eleCal, cssVar, eleRe = eleCal) {
    var bodyWidth = $(window).width();
    var eleWidth = $(eleCal).width();
    var restWidth = bodyWidth - eleWidth;
    var width = '--' + cssVar + ':' + restWidth / 2 + 'px';
    $(eleRe).attr('style', width);
}

/* View Feedback */
NN_FRAMEWORK.ViewFeedback = function () {
    if (isExist($('.feedback__item'))) {
        $('body').on('click', '.feedback__list .feedback__item', function () {
            var id = $(this).data('id');
            console.log(id);
            loadPaging('api/view-feedback.php?id=' + id, '.popup-feedback');
        });
    }
};

/* Others */
NN_FRAMEWORK.Others = function () {
    if (isExist($('.question'))) {
        $('.question__btn').click(function () {
            $('.question__header.active').removeClass('active');
            $(this).parents('.question__header').addClass('active');
            $('.question_item:has(.active)').find('.question__body').slideDown();
            $('.question_item:not(:has(.active))').find('.question__body').slideUp();
        });
    }

    // if (isExist($('#newsletter'))) {
    //     $('.menu__btn').click(function() {
    //         var menuHeight = (isExist($('.menu'))) ? $('.menu').outerHeight() : $('.menu-res').outerHeight();
    //         $('html, body').animate({
    //             scrollTop: $('#newsletter').offset().top - menuHeight,
    //         }, 1000);
    //     });
    // }

    /*
     * Code sửa lỗi link zalo.me/{sđt}
     * Author: levantoan.com
     */
    var zalo_acc = {
        '0989589115': '16r2lq8fu0wqb',
    };

    function devvnCheckLinkAvailability(link, successCallback, errorCallback) {
        var hiddenIframe = document.querySelector('#hiddenIframe');
        if (!hiddenIframe) {
            hiddenIframe = document.createElement('iframe');
            hiddenIframe.id = 'hiddenIframe';
            hiddenIframe.style.display = 'none';
            document.body.appendChild(hiddenIframe);
        }
        var timeout = setTimeout(function () {
            errorCallback('Link is not supported.');
            window.removeEventListener('blur', handleBlur);
        }, 2500); // Đặt timeout (2.5 giây) để kiểm tra liên kết. Thay đổi số này lên 5000 nếu bạn chưa chạy được
        var result = {};

        function handleMouseMove(event) {
            if (!result.x) {
                result = {
                    x: event.clientX,
                    y: event.clientY,
                };
            }
        }

        function handleBlur() {
            clearTimeout(timeout);
            window.addEventListener('mousemove', handleMouseMove);
        }

        window.addEventListener('blur', handleBlur);
        window.addEventListener(
            'focus',
            function onFocus() {
                setTimeout(function () {
                    if (document.hasFocus()) {
                        successCallback(
                            (function (pos) {
                                if (!pos.x) {
                                    return true;
                                }
                                var screenWidth =
                                    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                                var alertWidth = 300;
                                var alertHeight = 100;
                                var isXInRange =
                                    pos.x - 100 < 0.5 * (screenWidth + alertWidth) && pos.x + 100 > 0.5 * (screenWidth + alertWidth);
                                var isYInRange = pos.y - 40 < alertHeight && pos.y + 40 > alertHeight;
                                return isXInRange && isYInRange ? 'Link can be opened.' : 'Link is not supported.';
                            })(result)
                        );
                    } else {
                        successCallback('Link can be opened.');
                    }
                    window.removeEventListener('focus', onFocus);
                    window.removeEventListener('blur', handleBlur);
                    window.removeEventListener('mousemove', handleMouseMove);
                }, 500);
            }, {
                once: true,
            }
        );
        hiddenIframe.contentWindow.location.href = link;
    }

    Object.keys(zalo_acc).map(function (sdt, index) {
        let qrcode = zalo_acc[sdt];
        const zaloLinks = document.querySelectorAll('a[href*="zalo.me/' + sdt + '"]');
        zaloLinks.forEach((zalo) => {
            zalo.addEventListener('click', (event) => {
                event.preventDefault();
                const userAgent = navigator.userAgent.toLowerCase();
                const isIOS = /iphone|ipad|ipod/.test(userAgent);
                const isAndroid = /android/.test(userAgent);
                let redirectURL = null;
                if (isIOS) {
                    redirectURL = 'zalo://qr/p/' + qrcode;
                    window.location.href = redirectURL;
                } else if (isAndroid) {
                    redirectURL = 'zalo://zaloapp.com/qr/p/' + qrcode;
                    window.location.href = redirectURL;
                } else {
                    redirectURL = 'zalo://conversation?phone=' + sdt;
                    zalo.classList.add('zalo_loading');
                    devvnCheckLinkAvailability(
                        redirectURL,
                        function (result) {
                            zalo.classList.remove('zalo_loading');
                        },
                        function (error) {
                            zalo.classList.remove('zalo_loading');
                            redirectURL = 'https://chat.zalo.me/?phone=' + sdt;
                            window.location.href = redirectURL;
                        }
                    );
                }
            });
        });
    });
    //Thêm css vào site để lúc ấn trên pc trong lúc chờ check chuyển hướng sẽ không ấn vào thẻ a đó được nữa
    var styleElement = document.createElement('style');
    var cssCode = '.zalo_loading { pointer-events: none; }';
    styleElement.innerHTML = cssCode;
    document.head.appendChild(styleElement);
};

/* Ready */
$(document).ready(function () {
    NN_FRAMEWORK.Lazys();
    NN_FRAMEWORK.Tools();
    // NN_FRAMEWORK.Popup();
    // NN_FRAMEWORK.Wows();
    NN_FRAMEWORK.AltImg();
    NN_FRAMEWORK.GoTop();
    NN_FRAMEWORK.Menu();
    NN_FRAMEWORK.TopSpace();
    NN_FRAMEWORK.OwlPage();
    // NN_FRAMEWORK.Pagings();
    // NN_FRAMEWORK.Cart();
    NN_FRAMEWORK.Videos();
    NN_FRAMEWORK.Photobox();
    // NN_FRAMEWORK.Comment();
    NN_FRAMEWORK.Search();
    NN_FRAMEWORK.DomChange();
    NN_FRAMEWORK.DatePicker();
    NN_FRAMEWORK.loadNameInputFile();
    // NN_FRAMEWORK.danhMucDrops();
    // NN_FRAMEWORK.QuickViewProduct();
    // NN_FRAMEWORK.MenuToggle();
    // NN_FRAMEWORK.MenuDesk();
    // NN_FRAMEWORK.Map();
    // NN_FRAMEWORK.ScrollDown();
    // NN_FRAMEWORK.SlickNavFor();
    NN_FRAMEWORK.SlickNormal();
    NN_FRAMEWORK.Others();
    NN_FRAMEWORK.ViewFeedback();
});