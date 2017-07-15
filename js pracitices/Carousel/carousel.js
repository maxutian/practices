var Settings = {
	imgWidth: '15%',
	imgRatio: '1',
	scrollDelay: 3000,
	imgArr: ['style_001.jpg', 'style_002.jpg', 'style_003.jpg', 'style_004.jpg']
}

function $ (ele) {

  return document.querySelector(ele);

}

function Carousel () {

	var holder = $('#Carousel'),
			list = $('#list'),
			index = 0,
			curWidth;
			list.style.left = '0px';

	// 依次获取图片资源并布局到页面中
	this.initResource = (function () {

		Settings.imgArr.push(Settings.imgArr[0]);

		for (var i in Settings.imgArr) {

			var imgHolder = document.createElement('img');

			imgHolder.setAttribute('class', 'img');
			imgHolder.setAttribute('id', 'img' + ++i)
			imgHolder.src = 'images/' + Settings.imgArr[--i];
			list.appendChild(imgHolder);

		}

		imgRatio();

	})();

	// 监听窗口大小并调整比例
	this.formatImages = (function () {

		window.onresize = function () {

			imgRatio();
			list.style.left = -(index - 1) * curWidth + 'px';

		}

	})();

	// 设置图片比例
	function imgRatio () {

		for (var i in Settings.imgArr) {

				var images = $('#img' + ++i);

				holder.style.width = Settings.imgWidth;
				curWidth = holder.clientWidth;
				holder.style.height = images.style.height = (curWidth / Settings.imgRatio) + 'px';

			}

	}

	// 自动切换图片
	this.autoScroll = (function () {

		var timer = setInterval(function () {

			nextImg();

		}, Settings.scrollDelay);

	})();

	 //切换到上一张图片 
	function prevImg () {

		console.log(5);

	}

	// 切换到下一张图片
	function nextImg () {

		 var timer1 = setInterval(function () {

			if (parseInt(list.style.left) === -index * curWidth) {

				clearInterval(timer1);

			} else {

				list.style.left = parseInt(list.style.left) - 3 + 'px';

			}

		}, 1);

		if (index === Settings.imgArr.length - 1) {

			index = 0;
			list.style.left = '0px';

		} else {

			index++;

		}
		
	}

}

var initCarousel = new Carousel();
