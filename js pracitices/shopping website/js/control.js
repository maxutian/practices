var count = 0;
var totalPrice = 0;

// 添加商品
$('#content button').bind('click', function () {
	$('#count').text(++count);
	var title = $(this).parent().parent().children('.info').children().text();
	var price = $(this).prev().text();
	var num = parseInt(price.substring(2), 10);
	totalPrice += num;
	$('#totalPrice').text(totalPrice);
	var newLi = $('<li><h3>' + title + '</h3><span class="fillEmpty"></span><span>' + price + '</span><button class="cart-delete"><i class="fa fa-times"></i></button></li>');
	$('#cart-detail ul').append(newLi);
});

// 删除商品
$('#cart-detail ul').on('click', '.cart-delete', function (e) {
	var price = $(this).prev().text();
	var num = parseInt(price.substring(2), 10);
	totalPrice -= num;
	$('#totalPrice').text(totalPrice);
	$(this).parent().remove();
	e.stopPropagation();
	$('#count').text(--count);
});

// 清空购物车
$('#clean').bind('click', function (e) {
	$('#cart-detail ul li').remove();
	e.stopPropagation();
	count = 0;
	totalPrice = 0;
	$('#count').text(count);
	$('#totalPrice').text(totalPrice);
});

// 打开购物车
$('#cart-button').bind('click', function (e) {
	$('#masklayer,#cart-detail').fadeIn(300);
	e.stopPropagation();
});

// 关闭购物车
$('#cart-close').bind('click', function (e) {
	$('#masklayer,#cart-detail').fadeOut(300);
});
$(document).bind('click', function (e) {
	var tar = $('#cart-detail');
	var Li = $('#cart-detail ul li');
	var header = $('#cart-header,#cart-header p,#clean');
	var footer = $('#cart-footer,#cart-footer span,#cart-footer p,#pay');
	if (tar.is(e.target) || Li.is(e.target) || header.is(e.target) || footer.is(e.target)) {
		e.stopPropagation();
		return;
	} else {
		$('#masklayer,#cart-detail').fadeOut(300);
	}
});

$(window).scroll(function () {
	if($(this).scrollTop() > 200){
		$('#nav-bar').addClass('nav-fixed');
		$('#nav-bar ul li a').css({'color': '#6a3525'});
	} else {
		$('#nav-bar').removeClass('nav-fixed');
		$('#nav-bar').addClass('nav-default');
		$('#nav-bar ul li a').css({'color': '#d0bbaa'});
	}
});
