var Settings = {
	imgWidth: '20%',
	imgRatio: '1',
	imgArr: ['style_001.jpg', 'style_002.jpg', 'style_003.jpg', 'style_004.jpg']
}

function Carousel () {

	var holder = document.getElementById('Carousel'),
			showWindow = document.getElementById('show');

	this.initResource = (function () {

		// 依次获取图片资源并布局到页面中
		for (var i in Settings.imgArr) {

			var imgHolder = document.createElement('img');

			imgHolder.setAttribute('class', 'img');
			imgHolder.setAttribute('id', 'img' + ++i)
			imgHolder.src = 'images/' + Settings.imgArr[--i];
			holder.appendChild(imgHolder);

		}

		// 调整图片比例
		imgRatio();

	})();

	this.formatImages = (function () {

		// 监听窗口大小并调整比例
		window.onresize = function () {

			imgRatio();

		}

	})();

	function imgRatio () {

		for (var i in Settings.imgArr) {

				var images = document.getElementById('img' + ++i);

				showWindow.style.width = images.style.width = Settings.imgWidth;
				showWindow.style.height = images.style.height = (images.clientWidth / Settings.imgRatio) + 'px';

			}

	}

	this.autoScroll = function () {

		console.log(4);

	}

	this.preImg = function () {

		console.log(5);

	}

	this.nextImg = function () {

		console.log(6);

	}

}

var initCarousel = new Carousel();
