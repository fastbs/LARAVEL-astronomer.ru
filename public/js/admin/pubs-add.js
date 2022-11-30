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
window.location="admin.php?action=PubsMain";
}


function ButtonClickSave ()
{
var sn=$(SelNode).attr("Id");
sn=(sn==undefined) ? 0 : sn.substr(8);

var fd=$('#aform1').formSerialize ();

fd=fd+"&fid="+SelContent+"&fgroup="+sn;

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
var sn=$(SelNode).attr("Id");
sn=(sn==undefined) ? 0 : sn.substr(8);

var fd=$('#aform1').formSerialize ();

fd=fd+"&fid="+SelContent+"&fgroup="+sn;

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

window.location="admin.php?action=PubsMain";
}


function onSaveAndContinueSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> "+$("Success", data).text());

$("#fid").attr ("value", "");
SelNode.toggleClass("SelectedNode");
SelNode="";
}


function onSaveError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}



$(document).ready (DocumentReady);


function DocumentReady ()
{
$("#mfield").html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Загрузка данных...");

$.ajax ({async: true, cache: false, data: "action=PubsAdd&sub=1", dataType: "xml", error: onLoadError, success: onLoadSuccess, timeout: 30000, type: "POST", url: "areq.php", processData: false});

return false;
}
	

function onLoadSuccess (data, textStatus)
{
if ($("Error", data).text()!="")
  {
   $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }

$("#fpubsgroup").html (ProcessNodes($("PubsGroups", data), 0));

$("#mfield").html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> Данные загружены ");

$("#fmeta").html ("");

$("Meta", data).find ("ListFieldItem").each (function()
{
var s;

s="<option value=\""+$(this).attr("value")+"\"";
if ($(this).attr("selected")=="yes")
  s=s+" selected=\"selected\"";
s=s+">"+$(this).attr("text")+"</option>";

$("#fmeta").append (s);
});


$('#aform1').ajaxForm(); 

SelContent=0;
SelNode="";
$("div[id*='TreeNode']").unbind("click");
$("div[id*='TreeNode']").bind("click", SelectNode);
}	 


function SelectNode (event)
{
if (SelNode)
  SelNode.toggleClass("SelectedNode");

$(this).toggleClass("SelectedNode");
SelNode=$(this);
}


function onLoadError (XMLHttpRequest, textStatus, errorThrown)
{
$("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}


-->