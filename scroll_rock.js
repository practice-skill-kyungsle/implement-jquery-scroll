function mainImageScroll(animationInterval) {
    const $mainContainer = $('.main-container')
    const $mainIntro = $('.main-content-intro')
    const $mainVideoContainer = $('.main-text_video-container')
    const $mainPreview = $('.main-preview')
    const $mainContent = $('.main-preview-contents')
    const $sideBarLeft = $('.main-preview-sidebar-left')
    const $sideBarTop = $('.main-preview-sidebar-top')
    const $popupLeft = $('.main-preview-popup-left')
    const $popupRight = $('.main-preview-popup-right')
    const $target = $('.main-preview-target')

    function setElemSize(animationInterval) {
        let leftSidebarWidth;
        const mainImageWidth = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().width;
        const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;
        const windowWidth = $(window).width()
        const windowHeight = $(window).height()
        const MOBILE_WIDTH = 768;

        if (windowWidth <= MOBILE_WIDTH) {
            $mainContainer.css({ 'height': 3 * animationInterval + windowHeight })
            $mainIntro.css({ 'height': windowHeight })
            $mainVideoContainer.css({ 'height': windowHeight / 2 })
            $mainPreview.css({ 'height': windowHeight / 2 })
        } else {
            $mainContainer.css({ 'height': 'unset' })
            $mainIntro.css({ 'height': 'unset' })
            $mainVideoContainer.css({ 'height': 'unset' })
            $mainPreview.css({ 'height': 3 * animationInterval + windowHeight })
        }

        $mainContent.css({ 'height': mainImageHeight });
        $sideBarLeft.css({ 'height': mainImageHeight });
        leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
        $sideBarTop.css({ 'width': mainImageWidth + leftSidebarWidth });
        $popupLeft.css({ 'width': mainImageWidth * (200 / 1000) })
        $popupRight.css({ 'width': mainImageWidth * (200 / 1000) })
        $target.css({ 'width': mainImageWidth * (380 / 1000) })
    }

    function setElemPosition() {
        const mainImageWidth = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().width;
        const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;
        const topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;
        const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
        const windowWidth = $(window).width()

        if (windowWidth > 768)
            $mainContent.css({ 'top': (window.innerHeight - (mainImageHeight + topSidebarHeight)) / 2 })
        else
            $mainContent.css({ 'top': 'unset' })
        $sideBarLeft.css({ 'left': -leftSidebarWidth });
        $sideBarTop.css({ 'top': -topSidebarHeight });
        $popupLeft.css({ 'left': -(mainImageWidth * (175 / 1000)) })
        $popupRight.css({ 'right': -(mainImageWidth * (140 / 1000)) })
        $target.css({ 'top': mainImageWidth * (172 / 1000), 'right': mainImageWidth * (100 / 1000) })
    }

    function getAppearingOpacityForScroll(startScroll, scrollWidth) {
        if (scrollY > startScroll) return (scrollY - startScroll) / scrollWidth
        else return 0;
    }

    function setOpacityForElem(animationStartScrollY, animationInterval) {
        const sidebarShowScrollY = animationStartScrollY + animationInterval;
        const imageShowScrollY = animationStartScrollY + (2 * animationInterval);
        $sideBarLeft.css({ 'opacity': getAppearingOpacityForScroll(sidebarShowScrollY, animationInterval) });
        $sideBarTop.css({ 'opacity': getAppearingOpacityForScroll(sidebarShowScrollY, animationInterval) });
        $popupLeft.css({ 'opacity': getAppearingOpacityForScroll(imageShowScrollY, animationInterval) });
        $popupRight.css({ 'opacity': getAppearingOpacityForScroll(imageShowScrollY, animationInterval) });
        $target.css({ 'opacity': getAppearingOpacityForScroll(imageShowScrollY, animationInterval) });
    }

    function getPositionForScroll(mode, startScroll, endScroll, scrollSize, startPosition) {
        const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
        const slideWidth = leftSidebarWidth;
        const processRatio = slideWidth / scrollSize, leaveMode = 1, comeMode = 2;
        const processLength = scrollY - startScroll;

        if (scrollY > endScroll) {
            switch (mode) {
                case leaveMode:
                    return startPosition + slideWidth;
                case comeMode:
                    return startPosition - slideWidth;;
            }
        }
        else if (scrollY > startScroll) {
            switch (mode) {
                case leaveMode:
                    return startPosition + ((processLength) * processRatio);
                case comeMode:
                    return startPosition - ((processLength) * processRatio);
            }
        } else return startPosition;
    }

    function setSlideWhileScroll(animationStartScrollY, animationInterval) {
        const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
        const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;
        const topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;
        const sidebarShowScrollY = animationStartScrollY + animationInterval;
        const imageShowScrollY = animationStartScrollY + (2 * animationInterval);
        const animationEndScrollY = animationStartScrollY + (3 * animationInterval);
        const slideWidth = leftSidebarWidth;

        $sideBarTop.css({ 'left': getPositionForScroll(2, sidebarShowScrollY, imageShowScrollY, animationInterval, 0) });
        $sideBarLeft.css({ 'top': getPositionForScroll(2, sidebarShowScrollY, imageShowScrollY, animationInterval, slideWidth) });
        $popupLeft.css({ 'top': getPositionForScroll(1, imageShowScrollY, animationEndScrollY, animationInterval, (mainImageHeight + topSidebarHeight) * (28 / 55)) });
        $popupRight.css({ 'top': getPositionForScroll(2, imageShowScrollY, animationEndScrollY, animationInterval, (mainImageHeight + topSidebarHeight) * (9 / 55)) });
    }

    function getAnimationStartScrollY() {
        let animationStartScrollY;
        if ($(window).width() > 768)
            animationStartScrollY = $mainPreview.offset().top;
        else
            animationStartScrollY = $mainContainer.offset().top;
        return animationStartScrollY
    }

    function mainImageScrollShow(animationInterval) {
        let animationStartScrollY = getAnimationStartScrollY();

        $(function () { setElemSize(animationInterval) });
        $(setElemPosition);
        $(window).resize(function () {
            animationStartScrollY = getAnimationStartScrollY();
            setElemSize(animationInterval);
            setElemPosition();
        });
        $(document).on('scroll touchmove mousewheel', function () {
            setOpacityForElem(animationStartScrollY, animationInterval);
            setSlideWhileScroll(animationStartScrollY, animationInterval);
        });
    }
    mainImageScrollShow(animationInterval)
}

mainImageScroll(600)
