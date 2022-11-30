<!--

function DialogWindow (wdiv, button)
{
WindowDiv=wdiv;
ActionButton=button;

this.CloseWindow = function ()
{
$("#"+WindowDiv).fadeOut(); //hide();
$("#fader").fadeOut();
}

this.BindWindow = function ()
{
$("#"+ActionButton).bind('click', function()
{
if ($("#"+WindowDiv).css('display')=='none')
  {
   $("#fader").fadeIn();
   $("#"+WindowDiv).fadeIn(); //show();
  }

this.blur();
//return false;
});


$("#"+WindowDiv).find('.windowClose').bind('click', function()
{
$("#"+WindowDiv).fadeOut(); //hide();
$("#fader").fadeOut();
});


$("#"+WindowDiv).find('.windowMin').bind('click', function()
{
      $("#"+WindowDiv).find('.windowContent').SlideToggleUp(300);
      $("#"+WindowDiv).find('.windowBottom, .windowBottomContent').animate({height: 10}, 300);
      $("#"+WindowDiv).animate({height:30},300).get(0).isMinimized = true;
      $(this).hide();
      $("#"+WindowDiv).find('.windowResize').hide();
      $("#"+WindowDiv).find('.windowMax').show();
});


$("#"+WindowDiv).find('.windowMax').bind('click', function()
{
      var windowSize = $.iUtil.getSize(document.getElementById(WindowDiv+'Content'));
      $("#"+WindowDiv).find('.windowContent').SlideToggleUp(300);
      $("#"+WindowDiv).find('.windowBottom, .windowBottomContent').animate({height: windowSize.hb + 13}, 300);
      $("#"+WindowDiv).animate({height:windowSize.hb+43}, 300).get(0).isMinimized = false;
      $(this).hide();
      $("#"+WindowDiv).find('.windowMin, .windowResize').show();
});

$("#"+WindowDiv).Resizable(
{
      minWidth:  200,
      minHeight: 100,
      maxWidth: 1100,
      maxHeight: 800,
      dragHandle: '.windowTop',
      handlers: { se: '.windowResize' },
      onResize : function(size, position)
        {
         $("#"+WindowDiv).find('.windowBottom, .windowBottomContent').css('height', size.height-33 + 'px');
         var windowContentEl = $("#"+WindowDiv).find('.windowContent').css('width', size.width - 25 + 'px');
         if (!document.getElementById(WindowDiv).isMinimized)
           {
            windowContentEl.css('height', size.height - 48 + 'px');
           }
        }
});

};

}


-->