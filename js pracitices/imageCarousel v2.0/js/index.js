var wbImg = {
    defaultConfig: {
        container: '#img_container',
        hoverDom: '#hover_dom'
    },
    fullScreen: false,
    curIndexNum: 0,
    curIndex: $('#current'),
    allIndex: $('#all'),
    imgArr: [],
    clientWidth: document.documentElement.clientWidth,
    init: function(userConfig) {
        var config = userConfig || this.defaultConfig
        this.initImgArr()
        this.initHoverImgs()
        this.handleEvents()
    },
    initIndex: function (curIndexNum, allIndexNum) {
        this.curIndexNum = curIndexNum
        this.curIndex.text(curIndexNum)
        this.allIndex.text(allIndexNum)
    },
    initImgArr: function() {
        var allImgs = $('.ratio')
        for(var i = 0; i < allImgs.length; i++) {
            this.imgArr.push(allImgs.eq(i).attr('src'))
        }
    },
    initHoverImgs: function() {
        var allHoverImgs = ''
        for(var i in this.imgArr) {
            allHoverImgs += ('<img src = "' + 
                         this.imgArr[i] + 
                         '" alt = "" class="fullScreenImg" style="left: ' + 
                         i * 100 + 
                         '%"/>')
        }
        $('.hover_imgs').css('width', this.clientWidth * this.imgArr.length)
        $('.hover_imgs').append($(allHoverImgs))
    },
    throttle: function (fn, delay, mustRunDelay) {
        var timer = null;
        var t_start;
        return function () {
            var context = this, args = arguments, t_curr = +new Date();
            clearTimeout(timer);
            if (!t_start) {
                t_start = t_curr;
            }
            if (t_curr - t_start >= mustRunDelay) {
                fn.apply(context, args);
                t_start = t_curr;
            }
            else {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        }
    },
    fullScreenToggle: function(index, hoverDom) {
        if (!this.fullScreen) {
            hoverDom.css('display', 'flex')
            hoverDom.find('.hover_imgs').css('left', index * -100 + '%')
            this.fullScreen = true
        } else {
            hoverDom.css('display', 'none')
            this.fullScreen = false
        }
    },
    lastImg: function (hoverDom) {
        if (this.curIndexNum === 1) {
            $('.hover_imgs').css('left', 0)
            return
        } else {
            this.curIndex.text(--this.curIndexNum)
            hoverDom.find('.hover_imgs').css('left', (this.curIndexNum - 1) * -100 + '%')
        }
    },
    nextImg: function (hoverDom) {
        if (this.curIndexNum === this.imgArr.length) {
            $('.hover_imgs').css('left', (this.curIndexNum - 1) * -100 + '%')
            return
        } else {
            this.curIndex.text(++this.curIndexNum)
            hoverDom.find('.hover_imgs').css('left', (this.curIndexNum - 1) * -100 + '%')
        }
    },
    handleEvents: function() {
        var startX,
            endX,
            _this,
            obj = wbImg,
            hoverImgs = $('.hover_imgs'),
            black = $('.black'),
            ratios = $('.ratios')

        ratios.on('click', function (e) {
            _this = $(e.target)
            
            obj.fullScreenToggle(_this.index(), black)
            obj.initIndex(_this.index() + 1, obj.imgArr.length)
        })

        black.on({
            click: function () {
                obj.fullScreenToggle(_this, black)
            },
            touchstart: function (e) {
                startX = e.touches[0].pageX
            },
            touchmove: function(e) {
                var curPageX = e.touches[0].pageX
                if(curPageX < startX) {
                    var goLeft = startX - curPageX
                    hoverImgs.css('left', -((wbImg.curIndexNum - 1) * wbImg.clientWidth) - goLeft)
                } else if(curPageX > startX) {
                    var goRight = curPageX - startX
                    hoverImgs.css('left', -((wbImg.curIndexNum - 1) * wbImg.clientWidth) + goRight)
                }
            },
            touchend: function (e) {
                endX = e.originalEvent.changedTouches[0].pageX
                if (endX - startX < 0 && -(endX - startX) > (screen.width / 2)) {
                    obj.nextImg(black)
                } else if (endX - startX > 0 && endX - startX > (screen.width / 2)) {
                    obj.lastImg(black)
                } else {
                    $('.hover_imgs').css('left', (wbImg.curIndexNum - 1) * 100 + '%')
                }
            }
        })
    }
    
}

$(function() {
    wbImg.init()
})