<!--

function ButtonClickClose ()
{
window.location="admin.php?action=LinksMain";
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

//window.location="admin.php?action=LinksMain";
}


function onSaveError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}



$(document).ready (DocumentReady);


function DocumentReady ()
{
lid=$("input[name='lid']").attr("value");

$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Загрузка данных...");

$.ajax ({async: true, cache: false, data: "action=LinksEdit&sub=1&lid="+lid, dataType: "xml", error: onLoadError, success: onLoadSuccess, timeout: 30000, type: "POST", url: "areq.php", processData: false});

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

$("#ftitle").attr ("value", $("Title",     data).text());
$("#furl").  attr ("value", $("Url",       data).text());


$("#fgroup").html ("");

$("#fgroup").append ("<option value=\"0\">*** Выберите пункт ***</option>");

$("LinksGroups", data).find ("ListFieldItem").each (function()
{
var s;
s="<option value=\""+$(this).attr("value")+"\"";
if ($(this).attr("selected")=="yes")
  s=s+" selected=\"selected\"";
s=s+">"+$(this).attr("text")+"</option>";

$("#fgroup").append (s);
});


$('#aform1').ajaxForm(); 
}	 


function onLoadError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}


-->