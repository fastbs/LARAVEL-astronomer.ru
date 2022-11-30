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

fd="action=CalendarAdd&ftitle="+encodeURIComponent(ftitle)+"&fbegin="+fbegin+"&fend="+fend+"&fid="+SelContent;

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


function ButtonClickSaveAndContinue ()
{
ftitle=$("#ftitle").attr ("value");
fbegin=$("#fbegin").attr ("value");
fend  =$("#fend").  attr ("value");

fd="action=CalendarAdd&ftitle="+encodeURIComponent(ftitle)+"&fbegin="+fbegin+"&fend="+fend+"&fid="+SelContent;

$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Отправка данных на сервер...");

$.ajax ({async:       true,
         cache:       false,
         data:        fd,
         dataType:    "xml",
         error:       onSaveError,
         success:     onSaveAndContinueSuccess,
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

window.location="admin.php?action=CalendarMain";
}


function onSaveAndContinueSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> "+$("Success", data).text());

$("#ftitle").attr ("value", "");
$("#fbegin").attr ("value", "");
$("#fend").  attr ("value", "");
$("#fid").   attr ("value", "");
SelContent=0;
}


function onSaveError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}


SelContent=0;
-->