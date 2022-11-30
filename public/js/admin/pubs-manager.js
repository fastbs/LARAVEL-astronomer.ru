<!--
function ButtonClickEdit ()
{
var arr=DM.GetChecked ();

var pid=parseInt ($("#pid").attr ("value"));

if (pid)
  window.location="admin.php?action=PubsEdit&pid="+pid;
else
  $("#mfield").html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Недопустимое значение Id");
}


function ContentRowClick (row)
{
//alert (row.Id);
window.location="admin.php?action=PubsEdit&pid="+row.Id;
}


-->
