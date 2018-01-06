function  weiboImg (userConfig) {

    // 默认配置
    var defaultConfig = {
        container: '#img_container',
        imgArr: ['./images/bg1.jpg', './images/7号.JPG', './images/小建.JPG', 
                './images/倩倩.JPG']
    }
    var config = userConfig || defaultConfig

    var imgContainer = $(config.container),
        fullScreen = false

    // 创建图片
    function createImg (imgUrl) {
        var imgDom = $('<div class="ratio"><img src = "" alt = "" /></div >')
        imgDom.find('img').prop('src', imgUrl)
        imgContainer.append(imgDom)
    }

    // 切换全屏状态
    function fullScreenToggle (target, hoverDom) {
        if (!fullScreen) {
            hoverDom.find('img').prop('src', target.find('img')[0].src)
            hoverDom.css('display', 'flex')
            fullScreen = true
        } else {
            hoverDom.css('display', 'none')
            fullScreen = false
        }
    }

    // 显示图片当前index
    var indexFuncs = {
        curIndexNum: 0,
        curIndex: $('#current'),
        allIndex: $('#all'),
        showIndex: function (curIndexNum, allIndexNum) {
            this.curIndexNum = curIndexNum
            this.curIndex.text(curIndexNum)
            this.allIndex.text(allIndexNum)
        },
        lastImg: function (hoverDom) {
            if (this.curIndexNum === 1) {
                return
            } else {
                this.curIndex.text(--this.curIndexNum)
                hoverDom.find('img').prop('src', config.imgArr[this.curIndexNum - 1])
            }
        },
        nextImg: function (hoverDom) {
            if (this.curIndexNum === config.imgArr.length) {
                return
            } else {
                this.curIndex.text(++this.curIndexNum)
                hoverDom.find('img').prop('src', config.imgArr[this.curIndexNum - 1])
            }
        }
    };

    (function () {
        
        // 初始化图片
        for (var i = 0; i < config.imgArr.length; i++) {
            createImg(config.imgArr[i])
        }
        
        // 全屏图片切换
        var black = $('.black'),
            ratio = $('.ratio'),
            startX,
            endX,
            _this


        ratio.on('click', function () {
            _this = $(this)
            fullScreenToggle(_this, black)
            indexFuncs.showIndex(_this.index(), config.imgArr.length)
        })

        black.on({
            click: function () {
                fullScreenToggle(_this, black)
            },
            touchstart: function (e) {
                startX = e.touches[0].pageX
            },
            touchend: function (e) {
                endX = e.originalEvent.changedTouches[0].pageX
                if (endX - startX < 0 && -(endX - startX) > (screen.width / 2)) {
                    indexFuncs.nextImg(black)
                } else if (endX - startX > 0 && endX - startX > (screen.width / 2)) {
                    indexFuncs.lastImg(black)
                }
            }
        })

    })()
}