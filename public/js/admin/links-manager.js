<!--
function ButtonClickEdit ()
{
var arr=DM.GetChecked ();

var fid=parseInt ($("#fid").attr ("value"));

if (fid)
  window.location="admin.php?action=LinksEdit&lid="+fid;
else
  $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Недопустимое значение Id");
}


function ContentRowClick (row)
{
//alert (row.Id);
window.location="admin.php?action=LinksEdit&lid="+row.Id;
}


-->
