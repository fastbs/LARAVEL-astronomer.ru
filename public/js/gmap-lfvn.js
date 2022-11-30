<!--

function MapInitialize()
{


google.maps.event.addListener (map, 'center_changed', function() {
    window.setTimeout (function() {
    map.panTo (marker.getPosition());
    }, 5000);
  });

google.maps.event.addListener (marker, 'click', function() {
    if (map.getZoom()!=8)
      map.setZoom(8);
    else
      map.setZoom(4);
    map.setCenter(marker.getPosition());
  });



}

//google.maps.event.addDomListener(window, 'load', initialize);      
      
      

var iw=Array ();


function MapManager (MapDiv, LegDiv, MesDiv)
{
MapDiv     =MapDiv;
LegDiv     =LegDiv;
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

var MapOptions;
var Map;

this.LoadData = function ()
{
$("#"+MesDiv).html ("<img src=\"images/admin/loading2.gif\" style=\"vertical-align: top;\"/> Загрузка данных...");

var s="action=DBQuery&dataset=Observatories&sortfield=Id&sortorder=Forward&pagenum=1&pagelenght=1000";

$.ajax ({async:    true,
         cache:    false,
         data:     s,
         dataType: "xml",
         error:    onAjaxError,
         success:  onAjaxSuccess,
         timeout:  30000,
         type:     "POST",
         url:      "req.php",
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



MapOptions=
   {
    zoom:               2,
    center:             new google.maps.LatLng (53.567, 142.933),
    mapTypeId:          google.maps.MapTypeId.ROADMAP,
    panControl:         false,
    zoomControl:        true,
    mapTypeControl:     false,
    scaleControl:       false,
    streetViewControl:  false,
    overviewMapControl: true
   };

Map=new google.maps.Map (document.getElementById (MapDiv), MapOptions);




DataSetName=$("DataTable", data).attr("DataSet");
TableSize  =$("DataTable", data).attr("TableSize");
Page       =$("DataTable", data).attr("Page");
PageLenght =$("DataTable", data).attr("PageLenght");
TotalPages =$("DataTable", data).attr("TotalPages");
SortFieldId=$("DataTable", data).attr("SortFieldId");
SortOrder  =$("DataTable", data).attr("SortOrder");

XMLData=data;

var lt="<b>Легенда:</b><br/>";

$("Data", data).find ("Row").each (function()
{
if ($("Cell[FieldId='ProjectId']",   this).eq(0).text()==2) // LFVN
  {
var row=$(this).attr("Id");


var lng  =$("Cell[FieldId='Longitude']",   this).eq(0).text();
var lat  =$("Cell[FieldId='Latitude']",    this).eq(0).text();
var title=$("Cell[FieldId='Title']",       this).eq(0).text();
var cat  =$("Cell[FieldId='CategoryId']",  this).eq(0).text();
var descr=$("Cell[FieldId='Description']", this).eq(0).text();
var lnk  =$("Cell[FieldId='Link']",        this).eq(0).text();

lt=lt+title+"<br/>";

var location=new google.maps.LatLng (lat, lng);

var image=new google.maps.MarkerImage ("images/map/"+cat+".png",
          new google.maps.Size(20, 26),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 25));

var shadow=new google.maps.MarkerImage ("images/map/shadow.png",
           new google.maps.Size(30, 27),
           new google.maps.Point(0,0),
           new google.maps.Point(11, 23));

var marker=new google.maps.Marker ({
    position: location,
    map:      Map,
    title:    title,
    icon:     image,
    shadow:   shadow
  });

	
var cnt="<b>"+title+"</b><br/>";

if (descr!="")
  cnt=cnt+"<br/>"+descr;

if (lnk!="")
  cnt=cnt+"<br/><br/><a href=\""+lnk+"\">Перейти на страницу обсерватории</a>"; 

var infowindow=new google.maps.InfoWindow({
    content: cnt,
    size: new google.maps.Size (150,50)
   });

iw.push (infowindow);

google.maps.event.addListener (marker, 'click', function() {
for (i=0;i<iw.length;i++)
  iw[i].close ();

infowindow.open (Map, marker);
  
});

  }
});

$("#"+LegDiv).html (lt);
$("#"+MesDiv).html ("<img src=\"images/admin/ready.gif\" style=\"vertical-align: top;\"/> Данные загружены ");

google.maps.event.addListener (Map, 'click', function() {
for (i=0;i<iw.length;i++)
  iw[i].close ();
});

}	 



function onAjaxError (XMLHttpRequest, textStatus, errorThrown)
{
$("#"+MesDiv).html ("<img src=\"images/admin/stop2.gif\" style=\"vertical-align: top;\"/> <b>Ошибка!</b> Ответ AJAX - "+errorThrown);
}



}




MM=new MapManager  ("MapBox", "MapLegend", "MesBox");

$(document).ready (MM.LoadData);


-->
