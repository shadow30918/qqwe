var yt = [
    'p5pnAoNQs3E',
    'gczfSHkQdME',
    '7f4Vq_SS13o',
    '8Spt-ox16kc',
    'MluQlXiEwe4'
];

var gotop = true,
    init = true,
    winH = $(window).height(),
    bodyH,
    win_scroll,
    storyTop,
    characterTop;

create_cube(8,"top");
create_cube(4,"bottom");

$(document).ready(function(){

    

    $(".works .list").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: true,
        centerPadding: '0px',
        //asNavFor: '.photo_btn',
        prevArrow: $('.photo_prev'),
        nextArrow: $('.photo_next'),
        dots: true,
        //fade: true
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
    })

    $(".go_top").click(function(){
        
        to_scrollTo(".kv")
    })

    

    $(window).scroll(function(){
        winH = $(window).height();
        win_scroll = $(window).scrollTop();
        //console.log(winH);

        KV_bg_op()
        about_bg();

        

        if( win_scroll > $(".works").offset().top - $(window).height()/2 && win_scroll < $(".essence").offset().top - $(window).height()/2){
            $(".service, .works, .essence").addClass("BG_black");
        }else{
            $(".service, .works, .essence").removeClass("BG_black");
        }

        page_H = $("body").height();
        //console.log(page_H);
        if(win_scroll>winH/2){
            $(".go_top").addClass("show");
            $("nav").addClass("scroll");
            //$(".fixed_bg").addClass("in_about");
        }else{
            $(".go_top").removeClass("show");
            $("nav").removeClass("scroll");
        }
        if(win_scroll+winH > page_H-500){
            //console.log((win_scroll+$(window).height()-(page_H-500))/500*100)
            
            $(".go_top").css("bottom",100-((win_scroll+$(window).height()-(page_H-500))/500*100)+50+"px");
            $(".go_top").css("border-radius",100-((win_scroll+$(window).height()-(page_H-500))/5)+"%");
        }else{
            $(".go_top").css("bottom","150px");
            $(".go_top").css("border-radius","100%");
        }

        //parallax
        parallax_Q();
    })

})

$(window).load(function(){
    win_scroll = $(window).scrollTop();

    AOS.init({
        duration: "1200",
        easing: "ease-out-back"
    });

    // $(".parallax_Q").each(function(){
    //     this_parant = $(this).attr("para-parant");
        
    //     $(this).attr("para-baseline",$(this_parant).offset().top).attr("para-parantH",$(this_parant).height())
    // })

    KV_bg_op()
    about_bg();
    parallax_Q();

    setTimeout(function(){
        $("html,body").scrollTop(0);
        $(".kv .container").addClass("action");
    },0)

    setTimeout(function(){
        kv_cube_animation();
        $(".slogan .item").addClass("animate__flipInY");
        $(".pixel .mask").addClass("animate__bounceInDown").show();
        $(".siang_liang .mask .item").addClass("animate__backInLeft").show();
        $(".kv_btn").addClass("show");
    },1700)

    init = false;
})

function KV_bg_op (){
    if( win_scroll > 2*winH ){
        $(".fixed_bg").css("opacity","0")
    }else if( win_scroll > winH ){
        this_p = 1 - (win_scroll - winH) / winH;
        $(".fixed_bg").css("opacity",this_p*0.6)
    }else{
        $(".fixed_bg").css("opacity","1")
    }
}

function parallax_Q () {
    $(".parallax_Q").each(function(){
            
        this_parant = $(this).attr("para-parant");
        this_parant_H = $(this_parant).height();
        this_parant_offsetTop = parseInt($(this_parant).offset().top);
        
        this_min_range = (this_parant_offsetTop - winH/2 > 0)?this_parant_offsetTop - winH/2 : 0;
        this_max_range = this_parant_offsetTop+ this_parant_H + winH/2;
        //console.log(this_min_range,this_max_range)
        
        if( (win_scroll+winH/2>this_min_range && win_scroll<this_max_range) || init ){
            this_ratio = (win_scroll - (this_parant_offsetTop)) / (this_max_range - this_min_range);
            this_speed = $(this).attr("para-speed");
            $(this).css("transform","translateY("+ this_ratio * this_speed * -1 * winH/2 +"px)")
            if( $(this).attr("para-opacity")=="true" ){
                
                $(this).css("opacity",(1-Math.abs(this_ratio)));
            }
            $(this).attr("para-init",true);
        }
        
        if( win_scroll>=this_max_range ){

            $(this).addClass("para_out");

        }else if( win_scroll<=this_min_range ){

            $(this).addClass("para_before");
            $(this).removeClass("para_out");
            $(this).removeClass("para_active");

        }else{

            $(this).addClass("para_active");
            $(this).removeClass("para_out");
        }

    })
}

function about_bg () {

    about_middle_offset_top = $(".about").offset().top+($(".about").height()/2);

    if(win_scroll>(about_middle_offset_top-winH)){
        
        percent = ( win_scroll-(about_middle_offset_top-$(window).height()) ) / ($(window).height()/4);
        //console.log(percent)

        percent = (percent>3)?4-percent:percent;

        $(".about .bg").css("opacity",percent);
    }else if(win_scroll<winH/3){
        $(".about .bg").css("opacity",0);
    }
    //translateX = win_scroll - (about_middle_offset_top - $(window).height()/2);
    //$(".about .cube_block").css("transform","translateY("+translateX*0.8+"px)");
}

function kv_cube_animation() {
    $(".kv_cube_top .item").each(function(){
        ran = (Math.random()*(0.3-0) + 0).toFixed(2);
        console.log(ran);
        $(this).css("animation-delay",1+3*ran+"s").removeClass("pause");
    })
    $(".kv_cube_bottom .item").each(function(){
        ran = (Math.random()*(0.3-0) + 0).toFixed(2);
        console.log(ran);
        $(this).css("animation-delay",1+5*ran+"s").removeClass("pause");
    })
}

function create_cube (num,position){
    R_num = num;
    for (let cube_index = 1; cube_index <= R_num; cube_index++) {
        //生成一個介於r_min~r_max之間的有2位小數的數值
        r_min = 3
        r_max = 10;
        R_w = (Math.random()*(r_max-r_min) + r_min).toFixed(1);
    
        limit = (position=="top")? 0: 40;
        translateY = (position=="top")? -80: 80;
        R_l = Math.floor(Math.random()*(cube_index*10)+(cube_index+1)*5)+limit;
        R_t = (position=="top")? Math.floor(Math.random()*40): Math.floor(Math.random()*10);
        R_r = Math.floor(Math.random()*360);
        R_o = Math.floor(Math.random()*40+5)/100;
        R_b = Math.floor(Math.random()*3);
        R_c = (R_o<0.1)? Math.floor(Math.random()*40+50)/100 : 0;

        R_a_num = Math.floor(Math.random()*10);
        R_a_sec = Math.floor(Math.random()*10+3);
        R_a_del = (Math.random()*1).toFixed(2);
    
        cube = `
        <div class="cube_wrap" style="width:${R_w}em; height:${R_w}em; ${position}:${R_t}%; left:${R_l}%; transform:translate(-50%,${translateY}%) rotate(${R_r}deg); opacity:${R_o};">
        <div class="cube" style="background-color: rgba(255,255,255,${R_c}); filter:blur(${R_b}px);animation: cube_${R_a_num} ${R_a_sec}s infinite alternate linear -${R_a_del}s;"></div>
        </div>`
    
        $(".about .cube_block").append(cube);    
    }
}

function to_scrollTo (id_name){
    
    this_offsetTop = $(id_name).offset().top;

    $("html,body").animate({
        scrollTop: this_offsetTop
    },500)

    console.log(this_offsetTop)
}


// $(window).on('load',function(){
//     storyTop = $('.story').offset().top;
//     characterTop = $('.character').offset().top;
//     bodyH = $('body').height();

//     //console.log(winH+','+storyTop+','+characterTop+','+bodyH); 

//     loading();     
       

//     $('.photo_pic').slick({
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         //asNavFor: '.photo_btn',
//         prevArrow: $('.photo_prev'),
// 		    nextArrow: $('.photo_next'),
//         dots: true,
//         fade: true
//     });    
//     /*
//     $('.photo_btn').slick({
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         focusOnSelect: true,
//         centerMode: true,
//         prevArrow: $('.photo_prev'),
// 		nextArrow: $('.photo_next'),
//         //dots:true,
//         infinite:true,
//         centerPadding: '0px',
//         //padding: '20px',
//         asNavFor: '.photo_pic'
//     });
//     */

//     $('.pv_btn').slick({
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         focusOnSelect: true,
//         centerMode: true,
//         prevArrow: $('.pv_prev'),
// 		nextArrow: $('.pv_next'),
//         //dots:true,
//         infinite:true,
//         centerPadding: '0',
//         //asNavFor: '.photo_pic'
//     });
            
// });

// $(window).scroll(function(){
//     winScroll = $(document).scrollTop();
//     //console.log(winScroll);
//     if(winScroll>storyTop-winH/3){
//         $('.story .von,.story .main,.story .ralph').addClass('active');
//     }else{
//         //$('.story .von').removeClass('active');
//     };

//     if(winScroll>characterTop-winH/2){
//         $('.character .inner').addClass('active');
//     }else{        
//         $('.character .inner').removeClass('active');
//     }

//     if(winScroll>bodyH-winH-1){
//         $('.social').addClass('active');
//     }
// })

// $(document).ready(function(){
//     for(i=1;i<=7;i++){
//         $('.story .bg').append('<div class="m'+i+'"><img src="img/story_bg_m'+i+'.png"></div>');
//     }

//     var cha_index = 1;

//     $('.top .main').on('webkitTransitionEnd otransitionend msTransitionEnd transitionend',function(){
//         $('.logo').addClass('active');
//     });

//     //character change
//     $('.character .list li').hover(function(){
//         if(cha_index!=$(this).index()+1){
//             cha_index = $(this).index()+1;
//             console.log(cha_index);
//             $('.character .list li').removeClass('active');
//             $(this).addClass('active');
//             $('.character .dtl img').attr('src','img/character_dtl_'+cha_index+'.png');
//         }        
//     },function(){
//         //console.log('out');
//     });

//     // $('.character .pic').on('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(){
//     //     $('.character .pic').removeClass('active');
//     // });


//     //pv yt change
//     var yt_index,
//         yt_length = yt.length;

//     for(i=0;i<yt_length;i++){
//         $('.pv_btn').append('<div><img src="img/pv_list_'+(i+1)+'.jpg"><img src="img/shadow.png"></div>');
//     }
    
//     $('.pv_video').empty().append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+yt[0]+'?rel=0&amp;showinfo=0&autoplay=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
//     $('.pv_btn>div').click(function(){
//         if(yt_length>3){
//             yt_index = ($(this).index()+1)%yt_length;
//             console.log(yt_index);
//         }else{
//             yt_index = $(this).index();
//         }
//         $('.pv_video').empty().append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+yt[yt_index]+'?rel=0&amp;showinfo=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
//     });


//     //social
//     $('.social .fb').click(function(){
//         window.open('https://www.facebook.com/disneymoviesTaiwan/','_blank');
//     });
//     $('.social .yt').click(function(){
//         window.open('https://www.youtube.com/user/disneymoviestw','_blank');
//     });

// });



function loading() {
        console.log(gotop);
        $('html,body').animate({
            'scrollTop':0
        },1,function(){
            $('.loading').fadeOut(300,function(){
                $('.loading').remove();
            });
            $('.kv .mask').addClass('play'); 
    
            setTimeout(function(){
                $('.kv .logo').fadeIn(0).children().addClass('bounceIn');
            },1800);
        });
}

function character() {
    if(!$('.character .bg').hasClass('active')){
        $('.character .bg').addClass('active');
        setTimeout(function(){
            $('.character .btn,.character .dtl,.character .pic').fadeIn(500);
        },500);
    }
    
}