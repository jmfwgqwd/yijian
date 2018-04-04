$(function () {
	$('.dropdown-menu a').on('click',function(){
		$('.dropdown-toggle').text($(this).text());
		console.log(123)
	});

	$('.go-top').hide();//隐藏go-top按钮
	$(window).scroll(function(){
            // console.log($(this).scrollTop());

            //当window的scrolltop距离大于1时，go top 
            if($(this).scrollTop() > 100){
            	$('.go-top').fadeIn();
            }else{
            	$('.go-top').fadeOut();
            }
        }); 
	$('.go-top').click(function(){
		$('html ,body').animate({scrollTop: 0}, 300);
		return false;
	});
})