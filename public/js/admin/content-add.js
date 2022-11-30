<!--

function ButtonClickClose ()
{
window.location="admin.php?action=ContentMain";
}


function ButtonClickSave ()
{
$("#intext").html (editor.getData ());

var fd=$('#aform1').formSerialize ();

$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Отправка данных на сервер...");

$.ajax ({async: true, cache: false, data: fd, dataType: "xml", error: onSaveError, success: onSaveSuccess, timeout: 30000, type: "POST", url: "areq.php", processData: false});
}


function ButtonClickSaveAndContinue ()
{
$("#intext").html (editor.getData ());

var fd=$('#aform1').formSerialize ();

$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Отправка данных на сервер...");

$.ajax ({async: true, cache: false, data: fd, dataType: "xml", error: onSaveError, success: onSaveAndContinueSuccess, timeout: 30000, type: "POST", url: "areq.php", processData: false});

}


function onSaveAndContinueSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> "+$("Success", data).text());

window.location="admin.php?action=ContentEdit&fid="+$("NewId", data).text();
}


function onSaveSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> "+$("Success", data).text());

window.location="admin.php?action=ContentMain";
}


function onSaveError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}



//$(document).ready (DocumentReady);
CKEDITOR.on ('instanceReady', DocumentReady);


function DocumentReady ()
{
$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Загрузка данных...");

$.ajax ({async: true, cache: false, data: "action=ContentAdd&sub=1", dataType: "xml", error: onLoadError, success: onLoadSuccess, timeout: 30000, type: "POST", url: "areq.php", processData: false});

return false;
}
	

function onLoadSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#fgroup").html ("");

$("Access", data).find ("ListFieldItem").each (function()
{
var s;

s="<option value=\""+$(this).attr("value")+"\"";
if ($(this).attr("selected")=="yes")
  s=s+" selected=\"selected\"";
s=s+">"+$(this).attr("text")+"</option>";

$("#fgroup").append (s);
});


$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> Данные загружены ");

$('#aform1').ajaxForm(); 
}	 


function onLoadError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}


-->