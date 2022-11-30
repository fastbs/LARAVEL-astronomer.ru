(function($) {
var slide;
var index=0;
var count=0;
var time=5000; //3000
var done=true;

$.fn.SlidePlayer=function()
{
count=$('.slide-player li', this[0]).length;
startSlide ($('.slide-player li', this[0])[0]);
$('.slide-menu a').bind ('click',function() {
if (done && !$(this).is('.selected'))
  {
   Slide ($(this).parent ().find ('a').index (this), this);
  }
return false;
});
};

function Slide (ix, obj)
{
if (ix>=0)
  index=ix; 
else
  index++;

if (index>count-1)
  index=0;

stopSlide ();

done=false;

var father =$(obj).parents ('.slide-box:eq(0)');
var list   =$('.slide-player', father);
var trigger=$('.slide-menu',   father);
var old    =$('>.selected',    list);

if (old.length>0)
  {
   old.css('z-index',10);
   $('>:eq('+index+')', list).addClass ('selected').show ();
   old.fadeOut (500, function()
     {	//fadeOut,hide,slideUp,slideDown;
      $(this).css ('z-index',1).removeClass ('selected');
      done=true;
      startSlide (obj);
     });
   trigger.find ('a.selected').removeClass ('selected');
   $('a:eq('+index+')', trigger).addClass  ('selected');
  }
}

//stop
function stopSlide ()
{
clearTimeout (slide);
}

//start
function startSlide (obj)
{
slide=setTimeout (function() {Slide (-1,obj)}, time);
}

})(jQuery);



$(document).ready(function()
{
$('.slide-box').SlidePlayer ();
});



(function($) {
var slide2;
var index2=0;
var count2=0;
var time2=3000; //3000
var done2=true;

$.fn.SlidePlayer2=function()
{
count2=$('.pub-player li', this[0]).length;
$('.pub-menu a').bind ('click',function(event) {
if (done2 && !$(this).is('.selected'))
  {
   Slide2 ($(this).parent ().find ('a').index (this), this);
  }
return false;
});
};

function Slide2 (ix, obj)
{
if (ix>=0)
  index2=ix; 
else
  index2++;

if (index2>count2-1)
  index2=0;

done2=false;

var father2 =$(obj).parents ('.pub-box:eq(0)');
var list2   =$('.pub-player', father2);
var trigger2=$('.pub-menu',   father2);
var old2    =$('>.selected',    list2);

if (old2.length>0)
  {
   old2.css('z-index',10);
   $('>:eq('+index2+')', list2).addClass ('selected').show ();
   old2.fadeOut (500, function()
     {	//fadeOut,hide,slideUp,slideDown;
      $(this).css ('z-index',1).removeClass ('selected');
      done2=true;
     });
   trigger2.find ('a.selected').removeClass ('selected');
   $('a:eq('+index2+')', trigger2).addClass  ('selected');
  }
}

})(jQuery);



$(document).ready(function()
{
$('.pub-box').SlidePlayer2 ();
});

