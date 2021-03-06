
$(document).ready(function() {

    // on click of the link element found inside an element in the body
    // with the section-transition class (.sec-trans)
    $('body').on('click', '.sec-trans a', function(event) {
        // holds the link element that was clicked on that was nested
        // in the element with the .sec-trans class
        var startElem = $(this);

        // stop all animations, then animate from the current scroll position,
        // to the id attribute found in the href attribute of the link element.
        // (This id is the section that the link element referenced)
        $('html, body').stop().animate({
            // set the scroll bar vertical position to the appropriate position.
            // pos: the top of the offset coordinateds of the tag with the id
            // that was found in the href attribute of the link element that was clicked on
            scrollTop: $(startElem.attr('href')).offset().top // scroll to that offset

        }, 550, 'swing');

        return false; // prevent default action of clicking on link

    });

    // CLOSE MENU WHEN SMALL SCREEN AFTER CLICK
    // Closes the Responsive Menu on Menu Item Click
    // on click of the links in the collapses navbar, change visibility
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('nav').addClass('shrink');
        }
        else {
            $('nav').removeClass('shrink');
        }

    });



// mixitup instantiate with custom configuration
// animation disabled on page load, then enable for subsequent operations

    $('#portfoliolist').mixItUp({

        animation: {
            enable: false
        },
        load: {
            filter: '.mobile, .data, .web' // on initial load show the load tab
        },


        callbacks: {
            onMixLoad: function(){


                $(this).mixItUp('setOptions', {
                    animation: {

                        enable: true,
                        effects: 'stagger(1ms) fade scale(0.3) translateZ(-960px)' ,
                        duration: 460,
                        easing: 'ease',
                        animateResizeTargets: true , // for flex box
                    },
                     load: {
                        filter: '.mobile, .data, .web' // on initial load show the load tab
                    },

                });

            } // onmixload: function close

        } //callbacks close

    });

    // Home video
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });


}); // on ready close
// =================================================


// START Home function definitions
function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
// END Home function definitions
