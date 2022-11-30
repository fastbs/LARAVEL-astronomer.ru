<!--
function ShowParentMenu (pm)
{
mi=getObj ("mmenu"+pm);
npm=mi.getAttribute("ParentMenu");

mi.style.backgroundColor="#A7B9D1";

if (npm)
  {
   mm=getObj ("menu"+npm);
   mm.style.visibility ="visible";

   ShowParentMenu (npm);
  }
}

function HideParentMenu (pm)
{
mi=getObj ("mmenu"+pm);
npm=mi.getAttribute("ParentMenu");

mi.style.backgroundColor="#E3E3E3";

if (npm)
  {
   mm=getObj ("menu"+npm);
   mm.style.visibility ="hidden";

   HideParentMenu (npm);
  }
}

function menuOn (obj)
{
if (!obj.hasAttribute ("Separator"))
  obj.style.backgroundColor="#A7B9D1";

pm=obj.getAttribute("ParentMenu");
cm=obj.getAttribute("ChildMenu");

if (pm)
  ShowParentMenu (pm);

if (cm)
  getObj ("menu"+cm).style.visibility ="visible";

return true;
}

function menuOff (obj)
{
if (!obj.hasAttribute ("Separator"))
  obj.style.backgroundColor="#E3E3E3";

pm=obj.getAttribute("ParentMenu");
cm=obj.getAttribute("ChildMenu");

if (pm)
  HideParentMenu (pm);

if (cm)
  getObj ("menu"+cm).style.visibility ="hidden";

return true;
}

function menuOn1 (obj)
{
obj.style.visibility ="visible";

return true;
}

function menuOff1 (obj)
{
obj.style.visibility ="hidden";

return true;
}


function ProcessMenuItems (mid)
{
var f=0;
for (var i=0; i<mmenu.length; i++)
  {
   if (mmenu[i]["parent"]==mid)
     {
      if (f==0)
        {
         document.write ("<div id=\"menu"+mid+"\" class=\"submenu\" onmouseover=\"menuOn1(this)\" onmouseout=\"menuOff1(this)\"></div>\n");  // <tr><td class=\"subline\">Меню "+mid+"</td></tr>
         f=1;
        }
      if (mmenu[i]["itype"]=="Separator")
        {
         getObj ("menu"+mid).innerHTML+="<div id=\"mmenu"+mmenu[i]["id"]+"\" onmouseover=\"menuOn(this)\" onmouseout=\"menuOff(this)\"/></div>\n";
         getObj ("mmenu"+mmenu[i]["id"]).style.backgroundImage="url(images/separator.gif)";
         getObj ("mmenu"+mmenu[i]["id"]).style.backgroundRepeat="repeat-x";
         getObj ("mmenu"+mmenu[i]["id"]).style.height="5px";
         getObj ("mmenu"+mmenu[i]["id"]).setAttribute ("Separator", "");
        }
      else if (mmenu[i]["link"]!="")
        getObj ("menu"+mid).innerHTML+="<div id=\"mmenu"+mmenu[i]["id"]+"\" class=\"subline\" onmouseover=\"menuOn(this)\" onmouseout=\"menuOff(this)\"><a href=\""+mmenu[i]["link"]+"\">"+mmenu[i]["iname"]+"</a></div>\n";
      else
        getObj ("menu"+mid).innerHTML+="<div id=\"mmenu"+mmenu[i]["id"]+"\" class=\"subline\" onmouseover=\"menuOn(this)\" onmouseout=\"menuOff(this)\">"+mmenu[i]["iname"]+"</div>\n";

      getObj ("mmenu"+mmenu[i]["id"]).setAttribute ("ParentMenu", mid);
      if (ProcessMenuItems (mmenu[i]["id"])!=0)
        {
         getObj ("mmenu"+mmenu[i]["id"]).style.backgroundImage="url(images/marrow1.png)";
         getObj ("mmenu"+mmenu[i]["id"]).style.backgroundPosition="right";
         getObj ("mmenu"+mmenu[i]["id"]).style.backgroundRepeat="no-repeat";
         getObj ("mmenu"+mmenu[i]["id"]).setAttribute ("ChildMenu", mmenu[i]["id"]);
        }
      else
        getObj ("mmenu"+mmenu[i]["id"]).setAttribute ("ChildMenu", "");
     }
  }
return f;
}

function CalcSubMenuCoordinates (mid, cor)
{
var f=0;
for (var i=0; i<mmenu.length; i++)
  {
   if (mmenu[i]["parent"]==mid)
     {
      if (f==0)
        {
         obj=getObj ("menu"+mid);
         obj.style.position="absolute";
         obj.style.left=cor.left+"px";
         obj.style.top=cor.top+"px";
         obj.style.visibility="hidden";
         f=1;
        }

      cor=getCoords (getObj ("mmenu"+mmenu[i]["id"]));
      cor.left=getCoords (getObj ("menu"+mid)).left+getObj ("menu"+mid).offsetWidth; //+1;
//      cor.top =cor.top+1;

      CalcSubMenuCoordinates (mmenu[i]["id"], cor);
     }
  }
return f;
}


document.write ("<div id=\"mrow\" class=\"mrow\"><div style=\"float: left; width: 10px;\">&nbsp;</div></div>\n");

for (var i=0; i<mmenu.length; i++)
  {
   if (mmenu[i]["parent"]==0)
     {
      if (mmenu[i]["link"]!="")
        getObj ("mrow").innerHTML+="<div id=\"mmenu"+mmenu[i]["id"]+"\" class=\"menuline\" onmouseover=\"menuOn(this)\" onmouseout=\"menuOff(this)\"><a href=\""+mmenu[i]["link"]+"\">"+mmenu[i]["iname"]+"</a></div>";
      else
        getObj ("mrow").innerHTML+="<div id=\"mmenu"+mmenu[i]["id"]+"\" class=\"menuline\" onmouseover=\"menuOn(this)\" onmouseout=\"menuOff(this)\">"+mmenu[i]["iname"]+"</div>";

      getObj ("mmenu"+mmenu[i]["id"]).setAttribute ("ParentMenu", "");
      if (ProcessMenuItems (mmenu[i]["id"])!=0)
        getObj ("mmenu"+mmenu[i]["id"]).setAttribute ("ChildMenu", mmenu[i]["id"]);
      else
        getObj ("mmenu"+mmenu[i]["id"]).setAttribute ("ChildMenu", "");
     }
  }

// Вычисление координат
for (var i=0; i<mmenu.length; i++)
  {
   if (mmenu[i]["parent"]==0)
     {
      obj=getObj ("mmenu"+mmenu[i]["id"]);
      cor=getCoords (obj);
      cor.left=cor.left+1      ;
      cor.top=cor.top+obj.offsetHeight; //+1;

      CalcSubMenuCoordinates (mmenu[i]["id"], cor);
     }
  }


//-->
