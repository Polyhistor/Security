/*
 Project Name :Six Theme
 Author Company : upscale studio
 Project Date: 15 oct, 2016
 Author Website : http://www.upscalestudio.com
 */
/*=============================================
Table Of Contents
================================================
 1.Screen Height
 2.Pre Loader
 3.Bottom To Top
 4.Progress Bar
 5.Masonry Style
 6.MENU Scroll Function
 7.Parallax Effect
 8.count function
 9.Banner Slider
 10.Testimonial Slider
 11.Accordion
 12.Mobile sub menu General
 13.Animation

 Table Of Contents end
 ================================================
 */
$(document).ready(function() {
    "use strict";
    //============================================
    //Screen height
    //=============================================
    $(".screen-height").css({
        'height': window.innerHeight
    });
    //============================================
    //Pre Loader
    //=============================================
    //$("#loading").delay(2000).fadeOut(500);
    $(window).load(function() {
        $("#preloader,#loader").fadeOut(2000);

        animate_elems();
    });
    //============================================
    //Bottom to top
    //==========================================
    $('.toBottom').bind("click", function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });
    //================================================
    //Progress Bar
    //=================================================
    jQuery('.skill').each(function() {
        jQuery(this).appear(function() {
            jQuery(this).find('.skill-box').animate({
                width: jQuery(this).attr('data-percent')
            }, 1000);
        });
    });
    //================================================
    //Masonry Style
    //=================================================
    $('.grid').isotope({
        itemSelector: '.portfolio-block',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer',
            gutter: 30
        }
    });
    //================================================
    // MENU Scroll Function
    //=================================================
    var lastScrollTop = 0;
    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            // downscroll code
            $('.navbar').removeClass('affix');
            $('.navbar').removeClass('active')
        } else if (st == 0) {
            // upscroll code
            $('.navbar').removeClass('affix');
            $('.navbar').addClass('active');
        } else {
            // upscroll code
            $('.navbar').addClass('affix');
            $('.navbar').removeClass('active')
        }
        lastScrollTop = st;
    });
    //============================================
    //Toggle Function
    //=============================================
    $(".header-4 .menu-buttons a").on('click', function() {
        $(".header-4").toggleClass("open");
    });
    /*--------------------------------------------------
     Parallax Effect
     ---------------------------------------------------*/
    $(window).stellar({
        responsive: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        horizontalOffset: 0,
        verticalOffset: 0
    });
    //========================================
    // count function
    //======================================
    $('.count').each(function() {
        jQuery(this).appear(function() {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 1000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });
    });


    //================================================
    //Banner Slider
    //=================================================
    $("#banner-slider").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        navigationText: ['<i class="icofont icofont-thin-left"></i>', '<i class="icofont icofont-thin-right"></i>'],
        pagination: false,
        transitionStyle: "backSlide",
        autoPlay: true,
        responsiveRefreshRate: 200
    });
    //================================================
    //Testimonial Slider
    //=================================================
    $("#testi-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        pagination: false,
        autoPlay: true
    });
    //================================================
    //Call To action
    //=================================================
    $(".action_3-slider").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        pagination: false,
        autoPlay: true,
        transitionStyle: "fade",
        addClassActive: true,
        navigationText: ['<i class="icofont icofont-thin-left"></i>', '<i class="icofont icofont-thin-right"></i>'],
    });
    //================================================
    //Portfolio slider
    //=================================================
    $("#portfolio-slider").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds
        navigation: false,
        items: 2,
        pagination: true,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2]

    });
    /* ---------------------------------------------------------------------- */
    /*  Contact Form
     /* ---------------------------------------------------------------------- */

    var submitContact = $('#submit_contact'),
        message = $('#msg');

    submitContact.on('click', function(e) {
        e.preventDefault();

        var $this = $(this);

        $.ajax({
            type: "POST",
            url: 'contact.php',
            dataType: 'json',
            cache: false,
            data: $('#contact-form').serialize(),
            success: function(data) {

                if (data.info !== 'error') {
                    $this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
                    message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                } else {
                    message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                }
            }
        });
    });
    //================================================
    //Accordion
    //=================================================
    var selectIds = $('#panel1,#panel2,#panel3');
    selectIds.on('show.bs.collapse hidden.bs.collapse', function() {
        $(this).prev().find('.fa').toggleClass('fa-caret-right fa-caret-down');
    });
    //================================================
    //Mobile sub menu General
    //=================================================
    if ($(window).width() <= 767) {
        $("#slide-nav #menu_nav ul > li.dropdown").append('<div class="more"></div>');

        $("#slide-nav #menu_nav").on("click", ".more", function(e) {
            e.stopPropagation();

            $(this).parent().toggleClass("current")
                .children("#slide-nav #menu_nav ul > li.dropdown > ul").toggleClass("open");

        });

    }

    $(window).resize(function() {
        if (window.innerWidth > 767) {
            if ($('#slide-nav #menu_nav ul > li.dropdown .more').length !== 0) {
                $('#slide-nav #menu_nav ul > li.dropdown div').remove('.more');
            }
        } else {
            $("#slide-nav #menu_nav ul > li.dropdown").append('<div class="more"></div>');
        }

        $(".screen-height").css({
            'height': window.innerHeight
        });
    });


    var $body = $('body'),
        $wrapper = $('.body-innerwrapper'),
        $toggler = $(' .navbar-toggle,.header2 #slide-nav .hand-button .button'),
        $close = $('.closs'),
        $offCanvas = $('.navbar-collapse');

    $toggler.on('click', function(event) {
        event.preventDefault();
        stopBubble(event);
        setTimeout(offCanvasShow, 50);
    });

    $close.on('click', function(event) {
        event.preventDefault();
        offCanvasClose();
    });

    var offCanvasShow = function() {
        $body.addClass('offcanvas');
        $wrapper.on('click', offCanvasClose);
        $close.on('click', offCanvasClose);
        $offCanvas.on('click', stopBubble);

    };

    var offCanvasClose = function() {
        $body.removeClass('offcanvas');
        $wrapper.off('click', offCanvasClose);
        $close.off('click', offCanvasClose);
        $offCanvas.off('click', stopBubble);
    };

    var stopBubble = function(e) {
        e.stopPropagation();
        return true;
    };

    //=================================================
    //Animation
    //===============================================
    var $elems = $('.animate-in');
    var winheight = $(window).height();
    var fullheight = $(document).height();

    $(window).scroll(function() {
        animate_elems();
    });


    function animate_elems() {
        var wintop = $(window).scrollTop(); // calculate distance from top of window
        // loop through each item to check when it animates
        $elems.each(function() {
            var $elm = $(this);

            var topcoords = $elm.offset().top; // element's distance from top of page in pixels

            if (wintop > (topcoords - (winheight * .99999))) {
                // animate when top of the window is 3/4 above the element
                $elm.addClass('animated');

            }

        });
    } // end animate_elems()


});