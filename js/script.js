let timer={};

$('#menu_top li').hover(function (){
    let tag = $(this);
    let timeAttr = tag.attr('data-timer');
    clearTimeout(timer[timeAttr]);
    timer[timeAttr] = setTimeout(function (){
        $(' > ul', tag).fadeIn(0);
        tag.addClass('active-menu');
        $(' > .menu2', tag).fadeIn(0);
    }, 500);
}, function (){
    let tag = $(this);
    let timeAttr = tag.attr('data-timer');
    clearTimeout(timer[timeAttr]);
    timer[timeAttr] = setTimeout(function (){
        $(' > ul', tag).fadeOut(0);
        tag.removeClass('active-menu');
        $(' > .menu2', tag).fadeOut(0);
    }, 500);
})

// main slider
let sliderTag = $('#slider');
let sliderItems = sliderTag.find('.item');
let numItems = sliderItems.length;
let nextSlide = 1;
let sliderNavigators = sliderTag.find('#slider_navigation ul li');

let timeOut = 5000;

function slider(){

    if (nextSlide > numItems){
        nextSlide = 1;
    }

    if (nextSlide < 1){
        nextSlide = numItems;
    }

    sliderItems.hide();
    sliderItems.eq(nextSlide-1).fadeIn(100);
    sliderNavigators.removeClass('active');
    sliderNavigators.eq(nextSlide-1).addClass('active');
    nextSlide++;
}
slider();
let sliderInterval = setInterval(slider,timeOut);

sliderTag.mouseleave(function (){
    clearInterval(sliderInterval);
    sliderInterval = setInterval(slider,timeOut);
})

function goToNext(){
    slider();
}

function goToPrev(){
    nextSlide = nextSlide -2;
    slider();
}

function goToSlide(index){
    nextSlide = index;
    slider();
}

$('#slider_navigation li').click(function (){
    clearInterval(sliderInterval);
    let index = $(this).index();
    goToSlide(index+1);
})



$('#slider_arrows_next').click(function (){
    clearInterval(sliderInterval);
    goToNext();
});

$('#slider_arrows_prev').click(function (){
    clearInterval(sliderInterval);
    goToPrev();
});

//second slider

let sliderTag2 = $('#slider2');
let sliderItems2 = sliderTag2.find('.item');
let numItems2 = sliderItems2.length;
let nextSlide2 = 1;
let sliderNavigators2 = sliderTag2.find('#navigation2 ul li');

let timeOut2 = 5000;

function slider2(){

    if (nextSlide2 > numItems2){
        nextSlide2 = 1;
    }

    if (nextSlide2 < 1){
        nextSlide2 = numItems2;
    }

    sliderItems2.hide();
    sliderItems2.eq(nextSlide2-1).fadeIn(100);
    sliderNavigators2.removeClass('active');
    sliderNavigators2.eq(nextSlide2-1).addClass('active');
    nextSlide2++;
}
slider2();
let sliderInterval2 = setInterval(slider2,timeOut2);

sliderTag2.mouseleave(function (){
    clearInterval(sliderInterval2);
    sliderInterval2 = setInterval(slider2,timeOut2);
})

function goToSlide2(index){
    nextSlide2 = index;
    slider2();
}

$('#navigation2 li').click(function (){
    clearInterval(sliderInterval2);
    let index = $(this).index();
    goToSlide2(index+1);
})




$('.flipTimer').flipTimer({
    direction: 'down',
    date: 'September 10,2024 08:23',
    callback:function (){
        $('.slider2_right_right').css('opacity',.4);
        $('.slider2_right_left').css('opacity',.4);
        $('.slider2_finished').fadeIn(200);
    },

})
///////////////////////////////////////////////////////////////////////


function sliderScroll(direction,tag) {

    var span_tag = $(tag)

    var sliderScrollTag = span_tag.parents('.sliderScroll')
    var sliderScroll_ul = sliderScrollTag.find('.sliderScroll_main ul')

    var sliderScrollItems = sliderScroll_ul.find('li')

    var sliderScrollItemsNumbers = sliderScrollItems.length
    var slideScrollNumbers = Math.ceil(sliderScrollItemsNumbers / 4)

    var maxNegetive = -(slideScrollNumbers - 1) * 600

    sliderScroll_ul.css('width',sliderScrollItemsNumbers * 195)

    var marginRightNew
    var marginRightOld = sliderScroll_ul.css('margin-right')
    marginRightOld = parseInt(marginRightOld)
    if (direction == 'left') {
        marginRightNew = marginRightOld - 600
    }
    if (direction == 'right') {
        marginRightNew = marginRightOld + 600
    }

    if(marginRightNew < maxNegetive){
        marginRightNew = 0
    }

    if(marginRightNew > 0){
        marginRightNew = maxNegetive
    }

    sliderScroll_ul.animate({'marginRight': marginRightNew}, 1000)
}

$('.prev').click(function (){
    sliderScroll('left')
})

$('.next').click(function (){
    sliderScroll('right')
})

///////////////////////////////////////////////////////////////////////

$('.check_input').click(function (){
    if($(this).is(':checked')){
        $(this).parents('.check_div').find('.check_label').addClass('check_label_checked')
    }else{
        $(this).parents('.check_div').find('.check_label').removeClass('check_label_checked')
    }
})

$('.check_input').click(function (){
    if($(this).is(':checked')){
        $(this).parents('li').find('.check_label_search').addClass('check_label_checked_search')
    }else{
        $(this).parents('li').find('.check_label_search').removeClass('check_label_checked_search')
    }
})


///////////////////////////////////////////////////////////////////////

var filters = $('.filter_top > li')

filters.hover(function (){

    $('.options',this).slideDown(200)

},function (){
    $('.options',this).slideUp(200)
})

var items = $('.filter_top .options li')

items.hover(function (){
    $('.square',this).addClass('square_hover')
},
    function (){
        $('.square',this).removeClass('square_hover')
    })


items.click(function (){
    var title = $(this).parents('li').find('.title').text()
    var value = $(this).text()

    var filters_selected = $('#filters_selected')

    var id = $(this).attr('data-id')

    var filters_selected_span = filters_selected.find('span[data-id='+id+']')

    var len = filters_selected_span.length

    if(len > 0){

        filters_selected_span.remove()

    }else {
        var span='<span data-id="'+id+'" class="filters_selected_span">'+title+':'+value+'<i class="remove_filter" onclick="removeSelected(this)"></i></span>'
        filters_selected.append(span)
    }

    $('.square',this).toggleClass('square_selected')

})

function removeSelected(tag){
    var span_tag = $(tag).parents('span')

    span_tag.remove()

    var id = span_tag.attr('data-id')

    $('.options li[data-id='+id+']').find('.square').removeClass('square_selected')
}
///////////////////////////////////////////////////////////////////////

$('.type1').click(function (){
    $('#products').addClass('display1')
    $(this).addClass('active')
    $('.type2').removeClass('active')
})

$('.type2').click(function (){
    $('#products').removeClass('display1')
    $(this).addClass('active')
    $('.type1').removeClass('active')
})
///////////////////////////////////////////////////////////////////////

$('.exist').click(function (){
    $(this).toggleClass('active')
    if($(this).hasClass('active')){
        $('.exist_yesno',this).animate({'left':'14px'},300)
    }else{
        $('.exist_yesno',this).animate({'left':'4px'},300)
    }
})

///////////////////////////////////////////////////////////////////////

$('.colors li').click(function (){
    $('.circle').removeClass('active')
    $('.circle',this).addClass('active')
})


$('.select_list').click(function (){
    var ulTag = $('ul',this)
    ulTag.slideToggle(200)
})

$('.select_list ul li').click(function (){
    var txt = $(this).text()
    $('.select_list .garanti').text(txt)
})
///////////////////////////////////////////////////////////////////////

$('#introduction .more').click(function (){
    $('#introduction').toggleClass('active')
})
///////////////////////////////////////////////////////////////////////

$('#tab li').click(function (){

    $('#tab li').removeClass('active')
    $(this).addClass('active')
    $('#tabChildren section').fadeOut(0)
    var index = $(this).index()
    $('#tabChildren section').eq(index).fadeIn(100)
})

///////////////////////////////////////////////////////////////////////


    $('.itemContainer .item h4').click(function (){
        var item = $(this).parents('.item')
        $(this).toggleClass('active')
        $('.description',item).slideToggle(200)
    })

///////////////////////////////////////////////////////////////////////


$('#zoom_product').elevateZoom({
    'zoomWindowOffetx':-300,
    'scrollZoom': true,
    'easing': true,
    'zoomWindowHeight':300,
    'zoomWindowWidth':300,
})
///////////////////////////////////////////////////////////////////////

$("#product_gallery .product_script").mCustomScrollbar({
    setWidth: false,
    setHeight: false,
    setTop: 0,
    setLeft: 0,
    axis: "y",
    scrollbarPosition: "inside",
    scrollInertia: 950,
    autoDraggerLength: true,
    autoHideScrollbar: false,
    autoExpandScrollbar: false,
    alwaysShowScrollbar: 0,
    snapAmount: null,
    snapOffset: 0,
    mouseWheel: {
        enable: true,
        scrollAmount: "auto",
        axis: "y",
        preventDefault: false,
        deltaFactor: "auto",
        normalizeDelta: false,
        invert: false,
        disableOver: ["select", "option", "keygen", "datalist", "textarea"]
    },
    scrollButtons: {
        enable: true,
        scrollType: "stepless",
        scrollAmount: "auto"
    },
    keyboard: {
        enable: true,
        scrollType: "stepless",
        scrollAmount: "auto"
    },
    theme: "3d-dark",
});
///////////////////////////////////////////////////////////////////////

var productGallery = $('#product_gallery')
var productGallertItems_thumb = productGallery.find('.left ul li')

function showGallery(image_url, index){
    productGallertItems_thumb.removeClass('active')
    productGallertItems_thumb.eq(index).addClass('active')
    productGallery.find('.main_image').attr('src',image_url)
}

productGallertItems_thumb.click(function (){
    var index = $(this).index()

    var mainImage_url = $('> img',this).attr('src')
    showGallery(mainImage_url, index)
})

productGallery.find('.close').click(function (){
    $('#dark').fadeOut(100)
    productGallery.fadeOut(100)
})

$('.gallery ul li').click(function (){
    $('#dark').fadeIn(100)
    productGallery.fadeIn(100)
    var index = $(this).index()
    index--
    var mainImage_url = $('> img',this).attr('src')
    showGallery(mainImage_url,index)
})

$('.add_address').click(function (){
    $('#dark').fadeIn(100)
    productGallery.fadeIn(100)
})
///////////////////////////////////////////////////////////////////////

function showDetails(tag){

    var imgTag = $(tag)
    imgTag.toggleClass('open')
    if(imgTag.hasClass('open')){
        imgTag.attr('src','images/orderdetailsclose.png')
    }else {
        imgTag.attr('src','images/orderdetailsopen.png')
    }
    var parent = imgTag.parents('tr')
    parent.next().fadeToggle(100)
}
///////////////////////////////////////////////////////////////////////

$('.favorite ul li a').hover(function (){
    $('.edit',this).fadeIn(100)
},function (){
    $('.edit',this).fadeOut(100)
})






