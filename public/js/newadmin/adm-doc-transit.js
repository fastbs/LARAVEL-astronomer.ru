<!--

// ***** Документы - Товары в пути ******

// *** Создать ***

function DocTransitAdd (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Товары в пути - Создать", 200);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (DocTransitAddOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=DocTransitAdd&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onAfterValidate", $.proxy (function (status) {if (status){this.Layout.cells ("a").progressOn ();}}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (DocTransitAddButtonClick, this));

this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (DocTransitAddClose, this)});};

this.Destroy=function ()
  {
   this.Form.unload ();
   this.Form=null;
   this.Layout.unload ();
   this.Layout=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };
}


function DocTransitAddOnXLE ()
{
this.Form.detachEvent (this.Event);
}


function DocTransitAddClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function DocTransitAddButtonClick (name)
{
switch (name)
  {
   case "fmClose":
     this.Close ();
   break;

   case "fmSaveClose":
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response)
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
     
   break;

   case "fmSaveContinue":
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmDocTransitEdit", $("answer", response).attr ("id"));
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;

   case "fmSaveAdd":
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmDocTransitAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}


// *** Редактировать ***

function DocTransitEdit (tn, docid)
{
this.OnCellEdit=function (stage, rId, cInd, nValue, oValue)
{
if (stage==2)
  {
   this.DocGrid.cells (rId, 6).setValue (toInt (this.DocGrid.cells (rId, 6).getValue ()));
   this.DocGrid.cells (rId, 7).setValue (toInt (this.DocGrid.cells (rId, 7).getValue ()));
   this.DocGrid.cells (rId, 8).setValue (toInt (this.DocGrid.cells (rId, 8).getValue ()));
   this.DocGrid.cells (rId, 9).setValue (toInt (this.DocGrid.cells (rId, 9).getValue ()));

   if (this.DocGrid.cells (rId, 8).getValue ()>0 && this.DocGrid.cells (rId, 9).getValue ()==0 && this.DocGrid.cells (rId, 12).getValue ()>0)
     {
      var qq, qqq;
      qq=toInt (this.DocGrid.cells (rId, 8).getValue ()*(1+this.DocGrid.cells (rId, 12).getValue ()/100));
      qqq=qq;
      if (qq<1000)        qqq=Math.ceil(qq/10) *10;
      else if (qq<10000)  qqq=Math.ceil(qq/10) *10;
      else if (qq<100000) qqq=Math.ceil(qq/100)*100;
      this.DocGrid.cells (rId, 9).setValue (qqq);
      this.DataProcessor.setUpdated (rId, false, "updated");
      this.DataProcessor.setUpdated (rId, "updated");
     }
   this.DocGrid.cells (rId, 10).setValue (this.DocGrid.cells (rId, 6).getValue ()*this.DocGrid.cells (rId, 8).getValue ());
   this.DocGrid.cells (rId, 11).setValue (this.DocGrid.cells (rId, 6).getValue ()*this.DocGrid.cells (rId, 9).getValue ());
   this.CalcTotal  ();
   return true;
  }
};

this.CalcTotal=function ()
{
var PurchaseTotal=0, SaleTotal=0;
for (var i=0;i<this.DocGrid.getRowsNum ();i++)
  {
   if (this.fmStatus<3)
     {
      PurchaseTotal=PurchaseTotal+(this.DocGrid.cells2 (i, 6).getValue ()*this.DocGrid.cells2 (i, 8).getValue ());
      SaleTotal    =SaleTotal    +(this.DocGrid.cells2 (i, 6).getValue ()*this.DocGrid.cells2 (i, 9).getValue ());
     }
   else
     {
      PurchaseTotal=PurchaseTotal+(this.DocGrid.cells2 (i, 7).getValue ()*this.DocGrid.cells2 (i, 9).getValue ());
      SaleTotal    =SaleTotal    +(this.DocGrid.cells2 (i, 7).getValue ()*this.DocGrid.cells2 (i, 10).getValue ());
     }
  }
var str="<img src='images/admin/sum.png' style='vertical-align: middle;'/>&nbsp;&nbsp;<b>";
str=str+"ИТОГО ЗАКУПКА: "+PurchaseTotal+" р.";
str=str+"&nbsp;&nbsp;&nbsp;&nbsp;";
str=str+"ИТОГО РЕАЛИЗАЦИЯ: "+SaleTotal+" р.";
str=str+"</b>"
this.SB.setText (str);
};

this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (DocTransitEditClose, this)});};

this.Destroy=function ()
  {
   this.Form.unload ();
   this.Form=null;
   this.DocGrid=null;
   if (this.fmStatus<3)
     {
      this.Tree.destructor ();
      this.Tree=null;
      this.SelectGrid=null;
     }
   this.Layout2.unload ();
   this.Layout2=null;
   this.Layout.unload ();
   this.Layout=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };



this.fmStatus=0;
this.DPEvent=0;
this.TabId=tn;
this.DocId=docid;
Tabbar.setLabel     (tn, "Товары в пути - Изменить", 200);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("2E");
this.Layout.cells ("a").hideHeader ();
this.Layout.cells ("b").hideHeader ();
this.Layout.cells ("a").setHeight (310);

this.Form=this.Layout.cells ("a").attachForm ();
this.Form.loadStruct  ("adm-req.php?fmForm=DocTransitEdit&fmId="+this.DocId+"&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onAfterValidate", $.proxy (function (status) {if (status){this.Layout.cells ("a").progressOn ();}}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (DocTransitEditButtonClick, this));

this.OnFormLoad=function ()
{
this.fmStatus=this.Form.getItemValue("fmStatus");

if (this.fmStatus<3)
  {
   this.Layout2=this.Layout.cells ("b").attachLayout ("3W");
   this.Layout2.cells ("a").setText   ("Категории товаров");
   this.Layout2.cells ("b").setText   ("Товары в выбранной категории");
   this.Layout2.cells ("c").setText   ("Документ");
   this.Layout2.cells ("a").setWidth  (300);
   this.Layout2.cells ("b").setWidth  (700);

   this.Toolbar=this.Layout2.cells ("c").attachToolbar ();
   this.Toolbar.setIconSize  (18);
   this.Toolbar.setIconsPath ("images/admin/toolbar/");
   this.Toolbar.loadXML ("xml/AdminToolbars/DocToolbar.xml?e=" + new Date().getTime());
   this.Toolbar.attachEvent ("onClick", $.proxy (DocTransitEditButtonClick,    this));

   this.SB=this.Layout2.cells ("c").attachStatusBar ();

   this.Tree=this.Layout2.cells ("a").attachTree ();
   this.Tree.setSkin      ("dhx_skyblue");
   this.Tree.setImagePath ("dhtmlx/dhtmlxTree/codebase/imgs/");
   this.Tree.loadXML      ("adm-req.php?fmForm=GoodsCategoriesTree&e=" + new Date().getTime());
   this.Tree.attachEvent  ("onSelect", $.proxy (DocTransitEditOnTreeSelect, this));

   this.SelectGrid=new GridWithNav (this.Layout2.cells ("b"), "Goods", [1000]);
   this.SelectGrid.SetCallback ($.proxy (DocTransitEditGridCallback, this));

   this.DocCount=0;
   this.DocGrid=this.Layout2.cells ("c").attachGrid ();
   this.DocGrid.setImagePath ("dhtmlx/dhtmlxGrid/codebase/imgs/");
   this.DocGrid.setSkin ("dhx_skyblue");
   this.DocGrid.enableDragAndDrop (true);
   this.DocGrid.loadXML ("adm-db.php?dataset=Transit&param1="+this.DocId+"&pagenum=1&pagelenght=100000&e=" + new Date().getTime());
   this.DocGrid.attachEvent ("onDrag", $.proxy (DocTransitEditGridCallback, this));
   this.DocGrid.attachEvent ("onXLE", $.proxy (DocTransitEditOnXLE, this));
   this.DocGrid.attachEvent ("onRowSelect", $.proxy (function () {this.Toolbar.enableItem ("DocRowDelete"); this.Toolbar.enableItem ("DocQuantityPlus"); this.Toolbar.enableItem ("DocQuantityMinus");}, this));
   this.DocGrid.attachEvent ("onEditCell", $.proxy (this.OnCellEdit, this));
  }
else
  {
   this.Layout2=this.Layout.cells ("b").attachLayout ("1C");
   this.Layout2.cells ("a").setText   ("Документ");

   this.SB=this.Layout2.cells ("a").attachStatusBar ();

   this.DocCount=0;
   this.DocGrid=this.Layout2.cells ("a").attachGrid ();
   this.DocGrid.enableMultiline (true);
   this.DocGrid.setImagePath ("dhtmlx/dhtmlxGrid/codebase/imgs/");
   this.DocGrid.setSkin ("dhx_skyblue");
   this.DocGrid.loadXML ("adm-db.php?dataset=TransitPic&param1="+this.DocId+"&pagenum=1&pagelenght=100000&ro=1&e=" + new Date().getTime());
   this.DocGrid.attachEvent ("onXLE", $.proxy (this.CalcTotal, this));
  }
};

this.Form.attachEvent ("onXLE", $.proxy (this.OnFormLoad, this));

}


function DocTransitEditOnXLE ()
{
this.CalcTotal ();
this.DocCount=this.DocGrid.getRowsNum ();

this.DataProcessor=new dataProcessor  ("adm-dbupd.php?dataset=Transit");
this.DataProcessor.setTransactionMode ("POST", true);
this.DataProcessor.setUpdateMode      ("off");
this.DataProcessor.enableDataNames    (true);
this.DataProcessor.init               (this.DocGrid);
}


function DocTransitEditOnTreeSelect (id)
{
this.SelectGrid.SetDataSource ("Goods", [id]);
}


function DocTransitEditGridCallback (id, val)
{
for (var i=0;i<this.DocGrid.getRowsNum ();i++)
  if (this.DocGrid.cells2 (i, 3).getValue ()==this.SelectGrid.GWNSelRow[0])
    {
     this.DocGrid.cells2 (i, 6).setValue (+this.DocGrid.cells2 (i, 6).getValue ()+1);
     this.DocGrid.selectRow (i);
     this.OnCellEdit (2, this.DocGrid.getSelectedRowId ());
     this.DataProcessor.setUpdated (this.DocGrid.getRowId (i), false, "updated");
     this.DataProcessor.setUpdated (this.DocGrid.getRowId (i), "updated");
     return;
    }

var newId="id"+this.DocGrid.uid();
this.DocCount+=1;
this.DocGrid.addRow (newId, [newId, this.DocId, this.DocCount, this.SelectGrid.GWNSelRow[0], this.SelectGrid.GWNSelRow[1], this.SelectGrid.GWNSelRow[2], 1, 0, 0, 0, 0, 0, this.SelectGrid.GWNSelRow[4]]);
this.DocGrid.selectRow (this.DocGrid.getRowIndex (newId));
this.DataProcessor.setUpdated (newId, "updated");
}


function DocTransitEditClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function DocTransitEditButtonClick (name)
{
//alert ("qqq"+name+this.fmStatus);
switch (name)
  {
   case "DocSave" :
//     this.DataProcessor.detachEvent (this.DPEvent);
     this.DataProcessor.sendData ();
   break;

   case "DocRowDelete" :
     var sr=this.DocGrid.getSelectedRowId ();
     if (sr)
       {
        this.DocGrid.cells (sr, 6).setValue (0);
        this.OnCellEdit (2, sr);
        this.DocGrid.deleteSelectedItem ();
       }
   break;

   case "DocQuantityPlus" :
     var sr=this.DocGrid.getSelectedRowId ();
     if (sr)
       {
        this.DocGrid.cells (sr, 6).setValue (+this.DocGrid.cells (sr, 6).getValue ()+1);
        this.OnCellEdit (2, sr);//, this) ();
        this.DataProcessor.setUpdated (sr, false, "updated");
        this.DataProcessor.setUpdated (sr, "updated");
       }
   break;

   case "DocQuantityMinus" :
     var sr=this.DocGrid.getSelectedRowId ();
     if (sr)
       if (+this.DocGrid.cells (sr, 6).getValue ()>0)
         {
          this.DocGrid.cells (sr, 6).setValue (+this.DocGrid.cells (sr, 6).getValue ()-1);
          this.OnCellEdit (2, sr);//, this) ();
          this.DataProcessor.setUpdated (sr, false, "updated");
          this.DataProcessor.setUpdated (sr, "updated");
         }
   break;

   case "fmClose":
     this.Close ();
   break;

   case "fmSaveClose":
     if (this.fmStatus==1)
       this.DataProcessor.sendData ();
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response)
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;

   case "fmSaveContinue":
     if (this.fmStatus==1)
//        this.DataProcessor.detachEvent (this.DPEvent);
//        this.DPEvent=this.DataProcessor.attachEvent ("onAfterUpdateFinish", func);
       this.DataProcessor.sendData ();
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmDocTransitEdit", $("answer", response).attr ("id"));
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;

   case "fmSaveAdd":
     if (this.fmStatus==1)
//        this.DataProcessor.detachEvent (this.DPEvent);
//        this.DPEvent=this.DataProcessor.attachEvent ("onAfterUpdateFinish", func);
       this.DataProcessor.sendData ();
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmDocTransitAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}




// *** Менеджер ***

function DocTransitManager (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Товары в пути - Менеджер", 250);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("2E");
this.Layout.cells ("a").hideHeader ();

this.SelectGrid=new GridWithNav (this.Layout.cells ("a"), "Transits", [1000]);
this.SelectGrid.SetCallback       ($.proxy (DocTransitManagerGridCallback,       this));
this.SelectGrid.SetSelectCallback ($.proxy (DocTransitManagerGridSelectCallback, this));

this.Close=function () {this.Destroy ();};

this.Destroy=function ()
  {
   this.Layout.unload ();
   this.Layout=null;
   this.SelectGrid=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };


this.Layout.cells ("b").setText   ("Документ");
//this.SB=this.Layout2.cells ("a").attachStatusBar ();

this.DocCount=0;

this.DocGrid=this.Layout.cells ("b").attachGrid ();
this.DocGrid.enableMultiline (true);
this.DocGrid.setImagePath ("dhtmlx/dhtmlxGrid/codebase/imgs/");
this.DocGrid.setSkin ("dhx_skyblue");
this.DocGrid.loadXML ("adm-db.php?dataset=TransitPic&param1=0&pagenum=1&pagelenght=100000&ro=1&e=" + new Date().getTime());
//this.DocGrid.attachEvent ("onXLE", $.proxy (this.CalcTotal, this));
}


function DocTransitManagerGridCallback (id, val)
{
MainMenuClick ("mmDocTransitEdit", val);
}


function DocTransitManagerGridSelectCallback (id, val)
{
this.DocGrid.loadXML ("adm-db.php?dataset=TransitPic&param1="+id+"&pagenum=1&pagelenght=100000&ro=1&e=" + new Date().getTime());
}



-->
