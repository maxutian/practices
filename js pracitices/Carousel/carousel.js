var imgArr = ['style_001.jpg', 'style_002.jpg', 'style_003.jpg', 'style_004.jpg'];

function Carousel (imgArr, width) {

	this.imgWidth = width;

	this.initResource = (function () {

		var holder = document.querySelector('#Carousel');

		for (var i in imgArr) {

			var imgHolder = document.createElement('img');
			imgHolder.setAttribute('class', 'img' + ++i);
			imgHolder.src = 'images/' + imgArr[--i];
			imgHolder.width = this.imgWidth * holder.width;
			holder.appendChild(imgHolder);

		}
		
	})();

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

var initCarousel = new Carousel(imgArr);
