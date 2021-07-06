$(document).ready(function(){

	"use strict";
	
	/* =================================
	LOADER 
	=================================== */
	$(".loader").delay(400).fadeOut();
    $(".animationload").delay(400).fadeOut("fast");

    var bgi = $("[data-background]");
    bgi.length > 0 && bgi.each(function() {
    	var e = $(this),
    	t = e.attr('data-background');
    	e.css({'background-image': 'url(' + t + ')'});
    });

    var progressBar = $('.progress-bar');
    progressBar.length > 0 && progressBar.each(function() {
    	var e = $(this),
    	t = e.attr('aria-valuenow');
    	e.css({'width': t + '%'});
    });
	
	/* =================================
	BANNER ROTATOR IMAGE 
	=================================== */
	var slides = $(".full-screen"),
    b = slides.find('.item');
    b.each(function(){
        var e = $(this),
        ocImg = e.find('img').attr('src');
        e.css({'background-image': 'url(' + ocImg + ')'});
    });

    slides.owlCarousel({
		animateOut: 'fadeOut',
    	animateIn: 'flipInX',
	    loop: true,
	    autoplay: true,
        autoplayTimeout: 5000,
	    nav: true,
	    dots: false,
	    navText: [
	        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
	        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
	    ],
	    navContainer: '.banner .custom-nav',
	    items: 1,
	});	
	

	/* =================================
	BACK TO TOP 
	=================================== */
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
	//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
	offset_opacity = 1200,
	//duration of the top scrolling animation (in ms)
	scroll_top_duration = 700,
	//grab the "back to top" link
	$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
	/* =================================
	SLICK
	=================================== */
	if ($('.works')[0]){
	    $('.works').slick({
	    	speed:1000,
	    	arrows:false,
	    	autoplay: true,
	    	autoplaySpeed: 500,
	  		infinite: true,
	  		slidesToShow: 3,
	  		slidesToScroll: 1,
	  		responsive: [
			    {
			      breakpoint: 600,
			      settings: {
			      	arrows:false,
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			      	arrows:false,
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			]
		});
	}

	/* =================================
	PARALLAX
	=================================== */
	$('.parallax-service1').parallax({imageSrc: './img/slide1.jpg'});
	$('.parallax-service2').parallax({imageSrc: './img/slide2.jpg'});
	$('.parallax-service3').parallax({imageSrc: './img/slide3.jpg'});
	$('.parallax-service4').parallax({imageSrc: './img/slide4.jpg'});
	
	/* =================================
	SEND MAIL
	=================================== */
    $('#form-contact').submit(function (event){
		event.preventDefault();
		$.ajax({
			method: 'post',
			url: 'send-mail.php',
			data: $( this ).serialize()
		})
		.done(function( data ) {
			if(data.result){
				$('#frm-contact').slideUp();
				$('#response').html('<p style="color:green">'+data.msg+'</p>');
			}else{
				$('#response').html('<p style="color:red">'+data.msg+'</p>');
			}
		});
	});
});




  
  