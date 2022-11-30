<!--

function ProcessLinksItems (lid, level)
{
for (var i=0; i<glinks.length; i++)
  {
   if (glinks[i]["parent"]==lid)
     {
      if (level>0)
        str=str+"<div class=\"CBSmall\" style=\"margin-left:"+(level*10)+"px;\">";
      else
        str=str+"<div class=\"CBSmall\" style=\"padding: 10px 0 0 0;\">";

      if (glinks[i]["id"]==gid)
        str=str+"<b>"+glinks[i]["name"]+"</b>";
      else
        str=str+"<a href=\"publications.php?act=group&group="+glinks[i]["alias"]+"\">"+glinks[i]["name"]+"</a>";
      
      str=str+"</div>\n";

      ProcessLinksItems (glinks[i]["id"], level+1);
     }
  }
}


document.write ("Ссылки из скрипта:<br/><div id=\"glinks\">&nbsp;</div>\n");

gid=0;
mid=0;
str="";

$(document).ready (function (){
ProcessLinksItems (0, 0);
$("#glinks").html (str);
});


//-->