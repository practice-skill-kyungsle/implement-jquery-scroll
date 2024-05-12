function scrollBanner() {
    $(document).on('scroll', function () {
        console.log($(this).scrollTop())
        var scrollPos = $(this).scrollTop();
        $('.fade-top').css({
            'opacity': 1 - (scrollPos / 100)
        });
    });
}

scrollBanner();

$(document).ready(function () {
    // "use strict";
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength + (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = 308 - progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
});