<!--

/* Функии для работы с деревьями */


function ProcessNodes (node, level)
{
var nodes, str, val, text, v, t, i;

nodes=$(node).find ("> TreeNode");

str="";

if (nodes.length>0)
  {
   str="<ul class=\"TreeContainer\">\n";
   for (i=0;i<nodes.length;i++)
     {
      val =$(nodes).eq(i).attr("value");
      text=$(nodes).eq(i).attr("text");
      str=str+"<li class=\"TreeNode "+(level==0 ? "IsRoot " : "")+"ExpandLeaf "+(i==(nodes.length-1) ? "IsLast " : "")+"\">\n";
      str=str+"<div class=\"Expand\"></div>\n";
      if (level==0)
        str=str+"<div class=\"TreeContent\" id=\"TreeNode"+val+"\" style=\"padding-left: 10px;\"><b>"+text+"</b></div>\n";
      else
        str=str+"<div class=\"TreeContent\" id=\"TreeNode"+val+"\" style=\"padding-left: 10px;\">"+text+"</div>\n";
      str=str+ProcessNodes ($(nodes).eq(i), level+1);
      str=str+"</li>\n";
     }
     
   str=str+"</ul>\n";
  }

return str;
}


-->