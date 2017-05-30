var navBarTop;

$(window).scroll(function(){
	navBarTop = $(window).scrollTop();
});

if (navBarTop > 200) {
	$('#nav-bar').css({'position': 'fixed', 'top': 0, 'backgroundColor': 'rgba(255,255,255,.2)'});
}
