<!--

function DataManager (QueryParams, DMDiv, MesDiv)
{
QueryParams=QueryParams;
DMDiv      =DMDiv;
MesDiv     =MesDiv;
DataSet    =Array ();
XMLData    =Object ();

var DMInstance=this;
var DataSetName;
var TableSize;
var Page;
var PageLenght;
var TotalPages;
var SortFieldId;
var SortOrder;


this.LoadData = function ()
{
$("#"+MesDiv).html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Загрузка данных...");

var s="action=DBQuery&dataset="+QueryParams.DataSet+"&sortfield="+QueryParams.FieldId+"&sortorder="+QueryParams.Order+"&pagenum="+QueryParams.PageNum+"&pagelenght="+QueryParams.PageLenght;

$.ajax ({async:    true,
         cache:    false,
         data:     s,
         dataType: "xml",
         error:    onAjaxError,
         success:  onAjaxSuccess,
         timeout:  30000,
         type:     "POST",
         url:      "areq.php",
         processData: false});

return false;
};
	

function onAjaxSuccess (data, textStatus)
{
var a, b;

if ($("Error", data).text()!="")
  {
   $("#"+MesDiv).html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> "+$("Error", data).text());
   return;
  }


DataSetName=$("DataTable", data).attr("DataSet");
TableSize  =$("DataTable", data).attr("TableSize");
Page       =$("DataTable", data).attr("Page");
PageLenght =$("DataTable", data).attr("PageLenght");
TotalPages =$("DataTable", data).attr("TotalPages");
SortFieldId=$("DataTable", data).attr("SortFieldId");
SortOrder  =$("DataTable", data).attr("SortOrder");

XMLData=data;


$("#"+DMDiv+"Table").html ("");
a="<div class=\"ContentTable\"><table><thead>";
if (QueryParams.HasCheck)
  a=a+"<th><input title=\"Выделить все\" type=\"checkbox\" id=\""+DataSetName+"check\"/></th>";

b=0;

$("DataSet", data).find ("Field").each (function()
{
b=$(this).attr("Id");
DataSet[b]=new Object;
DataSet[b].Id   =$(this).attr("Id");
DataSet[b].Name =$(this).attr("Name");
DataSet[b].Type =$(this).attr("Type");
DataSet[b].Sort =$(this).attr("Sort");
DataSet[b].Width=$(this).attr("Width");

a=a+"<th id=\"Header"+b+"\"><span class=\"CTHeadLink\" style=\"display: block;\" title=\"Сортировать по этой колонке\">"+$(this).attr("Name");

if ($(this).attr("Id")==SortFieldId)
  {
   a=a+"&nbsp;<img src=\"images/buttons/"+((SortOrder=="Forward") ? "sort-quantity.png" : "sort-quantity-descending.png")+"\"/>";
  }

a=a+"</span></th>";
});

a=a+"</thead>"

$("Data", data).find ("Row").each (function()
{
a=a+"<tr class=\"CTRow\" id=\""+$(this).attr("Id")+"\">";

var row=$(this).attr("Id");

if (QueryParams.HasCheck)
  a=a+"<td align=\"center\" width=\"15\"><input type=\"checkbox\" id=\""+row+"check\"/></td>";
$(this).find ("Cell").each (function()
  {
   a=a+"<td id=\""+row+DataSet[$(this).attr("FieldId")].Id+"\"";
   switch (DataSet[$(this).attr("FieldId")].Type)
     {
      case "Integer":
      a=a+" align=\"center\" width=\""+DataSet[$(this).attr("FieldId")].Width+"\">"+$(this).text()+"</td>";
      break;
     
      case "Text":
      a=a+" align=\"left\" class=\"CBSuperSmall\" width=\""+DataSet[$(this).attr("FieldId")].Width+"\">"+$(this).text()+"</td>";
      break;
     
      case "Link":
      a=a+" align=\"left\" class=\"CBSuperSmall\" width=\""+DataSet[$(this).attr("FieldId")].Width+"\"><a href=\""+$(this).text()+"\" target=\"_blank\">"+$(this).text()+"</a></td>";
      break;
     
      case "Date":
      a=a+" align=\"center\" width=\""+DataSet[$(this).attr("FieldId")].Width+"\">"+$(this).text()+"</td>";
      break;
     
      case "Image":
      a=a+" align=\"center\" width=\""+DataSet[$(this).attr("FieldId")].Width+"\"><img src=\""+$(this).text()+"\" title=\""+$(this).text()+"\" style=\"max-width:500px;\"/></td>";
      break;
     
      case "Link":
      a=a+" align=\"center\" width=\""+DataSet[$(this).attr("FieldId")].Width+"\"><a href=\""+$(this).text()+"\" class=\"CBSuperSmall\">"+$(this).text()+"</a></td>";
      break;
     
      case "Switch":
      a=a+" align=\"center\" width=\""+DataSet[$(this).attr("FieldId")].Width+"\">";
      if ($(this).text()=="Y")
        a=a+"Вкл.";
      else
        a=a+"Выкл.";
      a=a+"</td>";
      break;

      default:
      a=a+">"+$(this).text()+"</td>";
     }
  });
a=a+"</tr>"
});

a=a+"</table></div>";

$("#"+DMDiv+"Table").append (a);

SetupNavigation ();

$("#"+MesDiv).html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> Данные загружены ");

if (QueryParams.HasCheck)
  {
   $("#"+$("DataTable", data).attr("DataSet")+"check").unbind("click");
   $("#"+$("DataTable", data).attr("DataSet")+"check").bind("click", TableCheckClick);
   $("input[id*='Row']").unbind("click");
   $("input[id*='Row']").bind("click", RowCheckClick);
  }

$("th[id^='Header']").unbind("click");
$("th[id^='Header']").bind("click", HeaderClick);

$("tr[id^='Row']").unbind("click");
$("tr[id^='Row']").bind("click", RowClick);

$("#"+DMDiv+"SizeSelect").unbind("change");
$("#"+DMDiv+"SizeSelect").bind("change", SizeSelect);
}	 


function SizeSelect ()
{
var NewPageLenght=$("#"+DMDiv+"SizeSelect option:selected").val();

if (NewPageLenght!=QueryParams.PageLenght)
  {
   QueryParams.PageLenght=NewPageLenght;
   QueryParams.PageNum   =1;
   DMInstance.LoadData ();
  }
};

function onAjaxError (XMLHttpRequest, textStatus, errorThrown)
{
$("#"+MesDiv).html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}


function SetupNavigation ()
{
var i, s="";

$("span[id^='"+DMDiv+"Button']").unbind("click");

for (i=1;i<=TotalPages;i++)
  {
   s=s+"<span id=\""+DMDiv+"ButtonPage"+i+"\" class=\"SmallButton";
   if (i==Page)
     s=s+" Passive";
   s=s+"\">"+i+"</span>\n";
  }

$("#"+DMDiv+"NavPages").html (s);


if (Page==1)
  {
   $("#"+DMDiv+"ButtonBegin").addClass("Passive");
   $("#"+DMDiv+"ButtonLeft").addClass("Passive");
  }
else
  {
   $("#"+DMDiv+"ButtonBegin").removeClass("Passive");
   $("#"+DMDiv+"ButtonLeft").removeClass("Passive");
  }

if (Page==TotalPages)
  {
   $("#"+DMDiv+"ButtonEnd").addClass("Passive");
   $("#"+DMDiv+"ButtonRight").addClass("Passive");
  }
else
  {
   $("#"+DMDiv+"ButtonEnd").removeClass("Passive");
   $("#"+DMDiv+"ButtonRight").removeClass("Passive");
  }

$("span[id^='"+DMDiv+"Button']").bind("click", NavButtonClick);

$("#"+DMDiv+"SizeSelect [value='"+PageLenght+"']").attr("selected", "selected");
};


function NavButtonClick ()
{
var NewPage=Number(Page);
var ButtonId=$(this).attr("id");

ButtonId=ButtonId.substr(DMDiv.length);

switch (ButtonId)
  {
   case "ButtonBegin":
     NewPage=1;
     break;
  
   case "ButtonLeft":
     NewPage=(NewPage>1) ? NewPage-1 : NewPage;
     break;

   case "ButtonRight":
     NewPage=(NewPage<TotalPages) ? NewPage+1 : NewPage;
     break;

   case "ButtonEnd":
     NewPage=TotalPages;
     break;

   default:
     NewPage=Number (ButtonId.substr(10));
     break;
  }

if (NewPage!=Page)
  {
   QueryParams.PageNum=NewPage;
   DMInstance.LoadData ();
  }
};

function HeaderClick (event)
{
var RowId=$(this).attr ("id");
RowId=RowId.substr (6);

if (QueryParams.FieldId==RowId)
  QueryParams.Order=((QueryParams.Order=="Forward") ? "Backward" : "Forward");
QueryParams.FieldId=RowId;

DMInstance.LoadData ();
};


function TableCheckClick (event)
{
var check=this.checked;

$("input[id*='Row']").each (function () {this.checked=check;});

//event.preventDefault();
event.stopPropagation();
};


function RowCheckClick (event)
{
//alert ("Check Click!");

//event.preventDefault();
event.stopPropagation();
};


function RowClick (event)
{
var out=Object ();
var row=$(this).attr("id");

$("Data", XMLData).find ("Row").each (function()
{
if ($(this).attr("Id")==row)
  {
   $(this).find ("Cell").each (function ()
     {
      out[$(this).attr("FieldId")]=$(this).text();
     });
  }
});

if (QueryParams.RowClick!="")
  QueryParams.RowClick (out);

//event.preventDefault();
event.stopPropagation();
};

this.GetChecked = function ()
{
//alert ("GetChecked run");
if (QueryParams.HasCheck)
  {
   var cr=Array ();
   var i=0;
   $("input[id*='Row']").each (function ()
     {
      if (this.checked)
        {
         var tr=$(this).parent().parent().attr("id");
         cr[i]=$("#"+tr).find("#"+tr+"Id").text();
         i++;
        }
     });

   return cr;
  }
return false;
};

}

-->
