<!--

// *** Окно выбора из БД ***

function WinDBChoose (winid, title, winimg, dataset)
{
this.WinId   =winid;
this.WinTitle=title;
this.WinImg  =winimg;
this.DataSet =dataset;

this.Win=Windows.createWindow (this.WinId, 100, 100, 1200, 700);
this.Win.setText (this.WinTitle);
this.Win.setIcon (this.WinImg, this.WinImg);
this.Win.center  ();

this.SB=this.Win.attachStatusBar ();
this.SB.setText ("<b>"+this.WinTitle+"</b> - окно создано");

this.Layout=this.Win.attachLayout  ("2E");
this.Layout.cells ("a").hideHeader ();
this.Layout.cells ("b").hideHeader ();

this.Toolbar=this.Layout.cells ("a").attachToolbar ();
this.Toolbar.setIconSize  (18);
this.Toolbar.setIconsPath ("images/admin/toolbar/");

this.Layout.cells ("b").setHeight (50);
this.Layout.cells ("b").fixSize   (false, true);

this.ChooseCallback=null;
this.TableSize     ="";
this.Page          =1;
this.PageLenght    =10;
this.TotalPages    ="";
this.SortFieldId   ="";
this.SortOrder     ="";

this.Grid=this.Layout.cells ("a").attachGrid ();
this.Grid.setImagePath ("dhtmlx/dhtmlxGrid/codebase/imgs/");
this.Grid.setSkin      ("dhx_skyblue");
this.Grid.enableMultiline (true);
//myGrid.enableLightMouseNavigation(true);
//dhtmlx\dhtmlxGrid\samples\04_dataprocessor\php>update_all.php

this.Grid.attachEvent ("onXLE", $.proxy (WinDBChooseGridOnXLE, this));
this.Toolbar.loadXML  ("xml/AdminToolbars/DBNavToolbar.xml?" + new Date().getTime(), this.Grid.loadXML ("adm-db.php?dataset="+this.DataSet+"&pagenum="+this.Page+"&pagelenght="+this.PageLenght+"&e=" + new Date().getTime()));


this.WinShow    =function ()   {this.Win.show (); this.Win.setModal (true);};
this.SetCallback=function (fn) {this.ChooseCallback=fn;};

this.Toolbar.attachEvent("onClick",     $.proxy (WinDBChooseToolbarClick,    this));
this.Grid.attachEvent   ("onRowSelect", $.proxy (WinDBChooseGridOnRowSelect, this));
this.Win.button ("close").attachEvent ("onClick", $.proxy (WinDBChooseWinClose, this));

this.Grid.init ();
this.Win.hide  ();
//var state=mygrid.getSortingState();state[0] - index of sorted column;
//state[1] - direction of sorting ("asc" or "des"). 
}


function WinDBChooseGridOnXLE ()
  {
   this.DataSet    = this.Grid.getUserData ("", "dataset");
   this.TableSize  =+this.Grid.getUserData ("", "tablesize");
   this.Page       =+this.Grid.getUserData ("", "page");
   this.PageLenght =+this.Grid.getUserData ("", "pagelenght");
   this.TotalPages =+this.Grid.getUserData ("", "totalpages");
   this.SortFieldId= this.Grid.getUserData ("", "sortfieldid");
   this.SortOrder  = this.Grid.getUserData ("", "sortorder");

   if (this.Page==1) {this.Toolbar.disableItem ("first"); this.Toolbar.disableItem ("previous");}
   else              {this.Toolbar.enableItem  ("first"); this.Toolbar.enableItem  ("previous");}

   if (this.Page==this.TotalPages) {this.Toolbar.disableItem ("next"); this.Toolbar.disableItem ("last");}
   else                            {this.Toolbar.enableItem  ("next"); this.Toolbar.enableItem  ("last");}

   this.Toolbar.setListOptionSelected ("size", "size"+this.PageLenght);

   var arr=this.Toolbar.getAllListOptions ("pages");
   for (var key in arr) {this.Toolbar.removeListOption ("pages", arr[key]);}
   for (var i=1;i<=this.TotalPages;i++)
     this.Toolbar.addListOption ("pages", "page"+i, i, "button", "Стр. "+i, (i<10) ? "blue-document-number-"+i+".png" : "blue-document-number.png");
   this.Toolbar.setListOptionSelected ("pages", "page"+this.Page);
  }


function WinDBChooseGridOnRowSelect (id, ind)
  {
   this.ChooseCallback (id, this.Grid.cells (id, 1).getValue ());
   this.SB.setText ("Выбрана строка: id="+id+" ind="+ind);
   this.Win.hide     ();
   this.Win.setModal (false);
  }


function WinDBChooseToolbarClick (id)
  {   
   var reload=false;

   if (id.indexOf ("page")!=-1 && this.Page!=id.substring (4)) {this.Page=id.substring (4); reload=true;}
   if (id.indexOf ("size")!=-1 && this.PageLenght!=id.substring (4)) {this.PageLenght=id.substring (4); this.Page=1; reload=true;}
   if (id=="first" && this.Page!=1) {this.Page=1; reload=true;}
   if (id=="last" && this.Page!=this.TotalPages) {this.Page=this.TotalPages; reload=true;}
   if (id=="previous" && this.Page>1) {this.Page--; reload=true;}
   if (id=="next" && this.Page<this.TotalPages) {this.Page++; reload=true;}

   if (reload)
     this.Grid.loadXML ("adm-db.php?dataset="+this.DataSet+"&pagenum="+this.Page+"&pagelenght="+this.PageLenght+"&e=" + new Date().getTime());
  }


function WinDBChooseWinClose ()
  {
   this.Win.hide     ();
   this.Win.setModal (false);
  }

-->