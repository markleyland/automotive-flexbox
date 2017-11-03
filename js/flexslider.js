jQuery(window).load(function() {
var Projeto = {};

var vimeoPlayers = jQuery('.flexslider').find('iframe'), player;

for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
        player = vimeoPlayers[i];
        $f(player).addEvent('ready', ready);
}

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false)
    } else {
        element.attachEvent(eventName, callback, false);
    }
}

function ready(player_id) {
    var froogaloop = $f(player_id);
    froogaloop.addEvent('play', function(data) {
     jQuery('.flexslider').flexslider("pause");
    });

    froogaloop.addEvent('pause', function(data) {
        jQuery('.flexslider').flexslider("play");
    });
}

jQuery(".flexslider")

.flexslider({
    animation: "fade",
    easing: "swing",
    keyboard: true,
    slideshow: true,
    controlNav: false,
    directionNav: true,
    animationLoop: true,
    touch: false,
    video: true,
    initDelay: 500,
    pauseOnHover: true, 
    animationSpeed: 765,
    smoothHeight: false,
    before: function(slider){
        if (slider.slides.eq(slider.currentSlide).find('iframe').length !== 0)
           $f( slider.slides.eq(slider.currentSlide).find('iframe').attr('id')  ).api('pause');
           /* ------------------  YOUTUBE FOR AUTOSLIDER ------------------ */
           playVideoAndPauseOthers($('.ctv-directors-frame iframe')[1]);
    }


});

function playVideoAndPauseOthers(frame) {
    $('iframe').each(function(i) {
        var func = this === frame ? 'playVideo' : 'stopVideo';
        this.contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
    });
}

/* ------------------ PREV & NEXT BUTTON FOR FLEXSLIDER (YOUTUBE) ------------------ */
$('.flex-next, .flex-prev').click(function() {
    playVideoAndPauseOthers($('.ctv-directors-frame iframe')[0]);
});
});