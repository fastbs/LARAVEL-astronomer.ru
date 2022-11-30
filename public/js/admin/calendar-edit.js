<!--

function ContentRowClick (row)
{
var str="Id="+row.Id+"  Заголовок: "+row.Title;
$("#fid").attr ("value", str);

SelContent=row.Id;

DW.CloseWindow ();
}


function ButtonClickClose ()
{
window.location="admin.php?action=CalendarMain";
}


function ButtonClickSave ()
{
ftitle=$("#ftitle").attr ("value");
fbegin=$("#fbegin").attr ("value");
fend  =$("#fend").  attr ("value");

var fd="action=CalendarEdit&sub=2&cid="+cid+"&ftitle="+encodeURIComponent(ftitle)+"&fbegin="+fbegin+"&fend="+fend+"&fid="+SelContent;

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

//window.location="admin.php?action=CalendarMain";
}


function onSaveError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}



$(document).ready (DocumentReady);


function DocumentReady ()
{
cid=$("input[name='cid']").attr("value");

$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Загрузка данных...");

$.ajax ({async: true, cache: false, data: "action=CalendarEdit&sub=1&cid="+cid, dataType: "xml", error: onLoadError, success: onLoadSuccess, timeout: 30000, type: "POST", url: "areq.php", processData: false});

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
$("#fbegin").attr ("value", $("BeginDate", data).text());
$("#fend").  attr ("value", $("EndDate",   data).text());

SelContent=$("ContentId", data).text();
$("#fid").attr ("value", $("ContentText", data).text());
$("#fidClearButton").bind("click", ClearButtonClick);


$('#aform1').ajaxForm(); 
}	 


function ClearButtonClick (event)
{
SelContent="";
$("#fid").attr ("value", "");
}



function onLoadError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}


-->