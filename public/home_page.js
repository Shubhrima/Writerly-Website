//opening

// Master DOManipulator v2 ------------------------------------------------------------
const items = document.querySelectorAll('.item'),
  controls = document.querySelectorAll('.control'),
  headerItems = document.querySelectorAll('.item-header'),
  descriptionItems = document.querySelectorAll('.item-description'),
  activeDelay = .76,
  interval = 5000;

let current = 0;

const slider = {
  init: () => {
    controls.forEach(control => control.addEventListener('click', (e) => { slider.clickedControl(e) }));
    controls[current].classList.add('active');
    items[current].classList.add('active');
  },
  nextSlide: () => { // Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: (e) => { // Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    const control = e.target,
      dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach((item, index) => { 
      if (index === dataIndex) { // Add active class to corresponding slide
        item.classList.add('active');
      }
    })
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => { // Remove active classes
    items.forEach(item => item.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
  },
  transitionDelay: (items) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;
    
    items.forEach(item => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1,
        delay;
      
      item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

      children.forEach(child => { // iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      })
    })
  },
}

let intervalF = setInterval(slider.nextSlide, interval);
slider.init



//dropdowns
$('.dropdown-toggle_1').click(function () {
$('.dropdown-menu_1').slideToggle();
});

$('.dropdown-toggle_2').click(function () {
$('.dropdown-menu_2').slideToggle();
});

//why writerly

//screen


//timeline
$(document).on('scroll',function(){
  $('div#instructions_container').fadeOut('fast');
  $('div#info_container').fadeIn('fast');
});
$(document).on('click','div#info_container',function(){
  $('div#instructions_container').fadeIn('fast');
  $('div#info_container').fadeOut('fast');
});


$(document).on('click','li.icon-up-open',function(){
  scrollToPrev();
});


$('div#timeline_container').on('click','li', function(){
  showNext($(this));
});

function showNext(li){
  var $itms=$('div#timeline_container li');
  $itms.removeClass('active');
  $(li).addClass('active');
  $('html,body').stop().animate({ scrollTop: $(li).offset().top-$(li).height()}, 500,function(){
    $('html,body').stop();
  });
}

function scrollToNext() {
  var $itms=$('div#timeline_container > ul > li');
  var $current=$itms.index($('div#timeline_container li.active'));
  
  if ($($itms[$current+1]).length>0 && !$($itms[$current+1]).hasClass('hidden')) {
    $itms.removeClass('active');
    $($itms[$current+1]).addClass('active');
    $('html,body').stop().animate({ scrollTop: $($itms[$current+1]).offset().top-$($itms[$current+1]).height()}, 500);
  } else {
    $('html,body').stop().animate({ scrollTop: $(document).height()}, 500);
  }
}
function scrollToPrev() {
  var $itms=$('div#timeline_container > ul > li');
  var $current=$itms.index($('div#timeline_container li.active'));
  
  if ($($itms[$current-1]).length>0 && !$($itms[$current-1]).hasClass('hidden')) {
    $itms.removeClass('active');
    $($itms[$current-1]).addClass('active');
    $('html,body').stop().animate({ scrollTop: $($itms[$current-1]).offset().top-$($itms[$current-1]).height()}, 500);
  } else {
    $('html,body').stop().animate({ scrollTop: 0}, 500);
  }
}