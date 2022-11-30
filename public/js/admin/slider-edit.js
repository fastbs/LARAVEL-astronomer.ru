<!--

function ButtonClickClose ()
{
window.location="admin.php?action=SliderMain";
}


function ButtonClickSave ()
{
var fd=$('#aform1').formSerialize ();

$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Отправка данных на сервер...");

$.ajax ({async:       true,
         cache:       false,
         data:        fd,
         dataType:    "xml",
         error:       onSaveError,
         success:     onSaveSuccess,
         timeout:     30000,
         type:        "POST",
         url:         "areq.php",
         processData: false});
}


function onSaveSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> "+$("Success", data).text());

//window.location="admin.php?action=UpdatesMain";
}


function onSaveError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}



$(document).ready (DocumentReady);


function DocumentReady ()
{
sid=$("input[name='sid']").attr("value");

$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Загрузка данных...");

$.ajax ({async: true, cache: false, data: "action=SliderEdit&sub=1&sid="+sid, dataType: "xml", error: onLoadError, success: onLoadSuccess, timeout: 30000, type: "POST", url: "areq.php", processData: false});

return false;
}
	

function onLoadSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> Данные загружены ");


$("#info").  html ($("Info",    data).text());

$("#ftitle").   attr ("value", $("Title",     data).text());
$("#fintro").   attr ("value", $("IntroText", data).text());
$("#fimg").     attr ("value", $("ImgLink",   data).text());
$("#fimgthumb").attr ("src",   $("ImgLink",   data).text());
$("#furl").     attr ("value", $("Url",       data).text());
//$("#factive").  attr ("value", $("Active",    data).text());
$(":radio[name=factive][value='"+$("Active",    data).text()+"']").attr("checked","true");
SetupImgField  ("fimg");


$('#aform1').ajaxForm(); 
}	 


function onLoadError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}


-->