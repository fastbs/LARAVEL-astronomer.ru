<!--

// *** Окно выбора из БД ***

function GridWithNav (AttachArea, dataset, params)
{
this.GWNDataSet =dataset;

this.GWNToolbar=AttachArea.attachToolbar ();
this.GWNToolbar.setIconSize  (18);
this.GWNToolbar.setIconsPath ("images/admin/toolbar/");

this.GWNChooseCallback      =null;
this.GWNChooseSelectCallback=null;
this.GWNTableSize           ="";
this.GWNPage                =1;
this.GWNPageLenght          =10;
this.GWNTotalPages          ="";
this.GWNSortFieldId         ="";
this.GWNSortOrder           ="";
this.GWNParams              ="";
this.GWNSelRow              =[];

for (var i=0;i<params.length;i++)
  this.GWNParams=this.GWNParams+"&param"+(i+1)+"="+params[i];

this.GWNGrid=AttachArea.attachGrid ();
this.GWNGrid.setImagePath ("dhtmlx/dhtmlxGrid/codebase/imgs/");
this.GWNGrid.setSkin      ("dhx_skyblue");
this.GWNGrid.enableMultiline (true);

this.GWNGrid.attachEvent ("onXLE", $.proxy (GridWithNavOnXLE, this));
this.GWNToolbar.loadXML  ("xml/AdminToolbars/DBNavToolbar.xml?" + new Date().getTime(), 
this.GWNGrid.loadXML     ("adm-db.php?dataset="+this.GWNDataSet+this.GWNParams+"&pagenum="+this.GWNPage+"&pagelenght="+this.GWNPageLenght+"&e=" + new Date().getTime()));

this.SetCallback      =function (fn) {this.GWNChooseCallback      =fn;};
this.SetSelectCallback=function (fn) {this.GWNChooseSelectCallback=fn;};

this.GWNToolbar.attachEvent ("onClick",     $.proxy (GridWithNavToolbarClick,    this));
this.GWNGrid.attachEvent    ("onRowSelect", $.proxy (GridWithNavOnRowSelect, this));

this.GWNGrid.enableDragAndDrop (true);
this.GWNGrid.attachEvent ("onDrag", function(){return false;});
//$.proxy (GridWithNavOnDrag, this));

this.GWNGrid.rowToDragElement=$.proxy (function (id) {var text="&nbsp;<img src='images/admin/toolbar/table-export.png' style='vertical-align: middle;'/><b> - "+this.GWNGrid.cells(id,2).getValue()+"&nbsp;</b>"; return text;}, this);
this.GWNGrid.init ();


this.SetDataSource=function (dataset, params)
  {
   this.GWNDataSet=dataset;
   this.GWNPage   =1;
   this.GWNParams ="";

   for (var i=0;i<params.length;i++)
     this.GWNParams=this.GWNParams+"&param"+(i+1)+"="+params[i];

   this.GWNGrid.loadXML ("adm-db.php?dataset="+this.GWNDataSet+this.GWNParams+"&pagenum="+this.GWNPage+"&pagelenght="+this.GWNPageLenght+"&e=" + new Date().getTime());
  };

}


function GridWithNavOnXLE ()
  {
   this.GWNDataSet    = this.GWNGrid.getUserData ("", "dataset");
   this.GWNTableSize  =+this.GWNGrid.getUserData ("", "tablesize");
   this.GWNPage       =+this.GWNGrid.getUserData ("", "page");
   this.GWNPageLenght =+this.GWNGrid.getUserData ("", "pagelenght");
   this.GWNTotalPages =+this.GWNGrid.getUserData ("", "totalpages");
   this.GWNSortFieldId= this.GWNGrid.getUserData ("", "sortfieldid");
   this.GWNSortOrder  = this.GWNGrid.getUserData ("", "sortorder");

   this.GWNToolbar.disableItem ("export");
   if (this.GWNPage==1) {this.GWNToolbar.disableItem ("first"); this.GWNToolbar.disableItem ("previous");}
   else                 {this.GWNToolbar.enableItem  ("first"); this.GWNToolbar.enableItem  ("previous");}

   if (this.GWNPage==this.GWNTotalPages || this.GWNTotalPages==0) {this.GWNToolbar.disableItem ("next"); this.GWNToolbar.disableItem ("last");}
   else                                                           {this.GWNToolbar.enableItem  ("next"); this.GWNToolbar.enableItem  ("last");}

   this.GWNToolbar.setListOptionSelected ("size", "size"+this.GWNPageLenght);

   var arr=this.GWNToolbar.getAllListOptions ("pages");
   for (var key in arr) {this.GWNToolbar.removeListOption ("pages", arr[key]);}
   for (var i=1;i<=this.GWNTotalPages;i++)
     this.GWNToolbar.addListOption ("pages", "page"+i, i, "button", "Стр. "+i, (i<10) ? "blue-document-number-"+i+".png" : "blue-document-number.png");
   this.GWNToolbar.setListOptionSelected ("pages", "page"+this.GWNPage);
  }


function GridWithNavOnRowSelect (id, ind)
  {
   this.GWNToolbar.enableItem ("export");
   this.GWNSelRow=[];
   for (var i=0;i<this.GWNGrid.getColumnsNum();i++)
     this.GWNSelRow[i]=this.GWNGrid.cells(id,i).getValue ();
   if (this.GWNChooseSelectCallback!=null)
     this.GWNChooseSelectCallback (id, this.GWNGrid.getSelectedRowId ());
  }


function GridWithNavToolbarClick (id)
  {   
   var reload=false;

   if (id.indexOf ("page")!=-1 && this.GWNPage      !=id.substring (4)) {this.GWNPage      =id.substring (4); reload=true;}
   if (id.indexOf ("size")!=-1 && this.GWNPageLenght!=id.substring (4)) {this.GWNPageLenght=id.substring (4); this.GWNPage=1; reload=true;}
   if (id=="first" && this.GWNPage!=1) {this.GWNPage=1; reload=true;}
   if (id=="last" && this.GWNPage!=this.GWNTotalPages) {this.GWNPage=this.GWNTotalPages; reload=true;}
   if (id=="previous" && this.GWNPage>1) {this.GWNPage--; reload=true;}
   if (id=="next" && this.GWNPage<this.GWNTotalPages) {this.GWNPage++; reload=true;}
   if (id=="export" && this.GWNChooseCallback!=null)
     this.GWNChooseCallback (id, this.GWNGrid.getSelectedRowId ());

   if (reload)
     this.GWNGrid.loadXML ("adm-db.php?dataset="+this.GWNDataSet+this.GWNParams+"&pagenum="+this.GWNPage+"&pagelenght="+this.GWNPageLenght+"&e=" + new Date().getTime());
  }

-->