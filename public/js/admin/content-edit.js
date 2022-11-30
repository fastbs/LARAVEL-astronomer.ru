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


function onSaveSuccess (data, textStatus)
{
$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> Данные сохранены");
}


function onSaveError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}



//$(document).ready (DocumentReady);
CKEDITOR.on ('instanceReady', DocumentReady);


function DocumentReady ()
{
fid=$("input[name='fid']").attr("value");

$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Загрузка данных...");

$.ajax ({async: true, cache: false, data: "action=ContentEdit&sub=1&fid="+fid, dataType: "xml", error: onLoadError, success: onLoadSuccess, timeout: 30000, type: "POST", url: "areq.php", processData: false});

return false;
}
	

function onLoadSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#info").  html ($("Info",    data).text());
$("#fintro").html ($("Intro",   data).text());
$("#intext").html ($("Content", data).text());
$("#fgroup").html ("");

$("#flink").    attr ("value", $("SourceLink",   data).text());
$("#ftitle").   attr ("value", $("Title",        data).text());
$("#fimg").     attr ("value", $("IntroImgLink", data).text());
$("#fimgthumb").attr ("src",   $("IntroImgLink", data).text());

editor.setData ($("Content", data).text());
SetupImgField  ("fimg");

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