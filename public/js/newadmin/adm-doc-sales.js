<!--

// ***** Документы - Продажи в магазине ******

// *** Создать ***

function DocSaleAdd (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Продажа в магазине - Создать", 250);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (DocSaleAddOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=DocSaleAdd&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onAfterValidate", $.proxy (function (status) {if (status){this.Layout.cells ("a").progressOn ();}}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (DocSaleAddButtonClick, this));

this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (DocSaleAddClose, this)});};

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


function DocSaleAddOnXLE ()
{
this.Form.detachEvent (this.Event);
}


function DocSaleAddClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function DocSaleAddButtonClick (name)
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
           MainMenuClick ("mmDocSaleEdit", $("answer", response).attr ("id"));
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
           MainMenuClick ("mmDocSaleAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}


// *** Редактировать ***

function DocSaleEdit (tn, docid)
{
this.OnCellEdit=function (stage, rId, cInd, nValue, oValue)
{
if (stage==2)
  {
   this.DocGrid.cells (rId, 6).setValue (toInt (this.DocGrid.cells (rId, 6).getValue ()));
   this.DocGrid.cells (rId, 7).setValue (toInt (this.DocGrid.cells (rId, 7).getValue ()));
   this.DocGrid.cells (rId, 8).setValue (toInt (this.DocGrid.cells (rId, 8).getValue ()));

   this.DocGrid.cells (rId, 9). setValue (this.DocGrid.cells (rId, 6).getValue ()*this.DocGrid.cells (rId, 7).getValue ());
   this.DocGrid.cells (rId, 10).setValue (this.DocGrid.cells (rId, 6).getValue ()*this.DocGrid.cells (rId, 8).getValue ());
   this.CalcTotal  ();
   return true;
  }
};

this.CalcTotal=function ()
{
var SaleTotal=0, ActualTotal=0;
for (var i=0;i<this.DocGrid.getRowsNum ();i++)
  {
   if (this.fmStatus==1)
     {
      SaleTotal  =SaleTotal+  (this.DocGrid.cells2 (i, 6).getValue ()*this.DocGrid.cells2 (i, 7).getValue ());
      ActualTotal=ActualTotal+(this.DocGrid.cells2 (i, 6).getValue ()*this.DocGrid.cells2 (i, 8).getValue ());
     }
   else
     {
      SaleTotal  =SaleTotal+  (this.DocGrid.cells2 (i, 7).getValue ()*this.DocGrid.cells2 (i, 8).getValue ());
      ActualTotal=ActualTotal+(this.DocGrid.cells2 (i, 7).getValue ()*this.DocGrid.cells2 (i, 9).getValue ());
     }
  }
var str="<img src='images/admin/sum.png' style='vertical-align: middle;'/>&nbsp;&nbsp;<b>";
str=str+"ИТОГО СУММА ПРОДАЖИ: "+SaleTotal+" р.";
str=str+"&nbsp;&nbsp;&nbsp;&nbsp;";
str=str+"ИТОГО СУММА ФАКТИЧЕСКАЯ: "+ActualTotal+" р.";
str=str+"</b>"
this.SB.setText (str);
};

this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (DocSaleEditClose, this)});};

this.Destroy=function ()
  {
   this.Form.unload ();
   this.Form=null;
   this.DocGrid=null;
   if (this.fmStatus==1)
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
Tabbar.setLabel     (tn, "Продажа в магазине - Изменить", 250);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("2E");
this.Layout.cells ("a").hideHeader ();
this.Layout.cells ("b").hideHeader ();
this.Layout.cells ("a").setHeight (310);

this.Form=this.Layout.cells ("a").attachForm ();
this.Form.loadStruct  ("adm-req.php?fmForm=DocSaleEdit&fmId="+this.DocId+"&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onAfterValidate", $.proxy (function (status) {if (status){this.Layout.cells ("a").progressOn ();}}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (DocSaleEditButtonClick, this));

this.OnFormLoad=function ()
{
this.fmStatus=this.Form.getItemValue("fmStatus");

if (this.fmStatus==1)
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
   this.Toolbar.attachEvent ("onClick", $.proxy (DocSaleEditButtonClick,    this));

   this.SB=this.Layout2.cells ("c").attachStatusBar ();

   this.Tree=this.Layout2.cells ("a").attachTree ();
   this.Tree.setSkin      ("dhx_skyblue");
   this.Tree.setImagePath ("dhtmlx/dhtmlxTree/codebase/imgs/");
   this.Tree.loadXML      ("adm-req.php?fmForm=GoodsCategoriesTree&e=" + new Date().getTime());
   this.Tree.attachEvent  ("onSelect", $.proxy (DocSaleEditOnTreeSelect, this));

   this.SelectGrid=new GridWithNav (this.Layout2.cells ("b"), "GoodsOnStock", [1000]);
   this.SelectGrid.SetCallback ($.proxy (DocSaleEditGridCallback, this));

   this.DocCount=0;
   this.DocGrid=this.Layout2.cells ("c").attachGrid ();
   this.DocGrid.setImagePath ("dhtmlx/dhtmlxGrid/codebase/imgs/");
   this.DocGrid.setSkin ("dhx_skyblue");
   this.DocGrid.enableDragAndDrop (true);
   this.DocGrid.loadXML ("adm-db.php?dataset=Sale&param1="+this.DocId+"&pagenum=1&pagelenght=100000&e=" + new Date().getTime());
   this.DocGrid.attachEvent ("onDrag", $.proxy (DocSaleEditGridCallback, this));
   this.DocGrid.attachEvent ("onXLE", $.proxy (DocSaleEditOnXLE, this));
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
   this.DocGrid.loadXML ("adm-db.php?dataset=SalePic&param1="+this.DocId+"&pagenum=1&pagelenght=100000&ro=1&e=" + new Date().getTime());
   this.DocGrid.attachEvent ("onXLE", $.proxy (this.CalcTotal, this));
  }
};

this.Form.attachEvent ("onXLE", $.proxy (this.OnFormLoad, this));

}


function DocSaleEditOnXLE ()
{
this.CalcTotal ();
this.DocCount=this.DocGrid.getRowsNum ();

this.DataProcessor=new dataProcessor  ("adm-dbupd.php?dataset=Sale");
this.DataProcessor.setTransactionMode ("POST", true);
this.DataProcessor.setUpdateMode      ("off");
this.DataProcessor.enableDataNames    (true);
this.DataProcessor.init               (this.DocGrid);
}


function DocSaleEditOnTreeSelect (id)
{
this.SelectGrid.SetDataSource ("GoodsOnStock", [id]);
}


function DocSaleEditGridCallback (id, val)
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
this.DocGrid.addRow (newId, [newId, this.DocId, this.DocCount, this.SelectGrid.GWNSelRow[0], this.SelectGrid.GWNSelRow[1], this.SelectGrid.GWNSelRow[2], 1, this.SelectGrid.GWNSelRow[4], this.SelectGrid.GWNSelRow[4], this.SelectGrid.GWNSelRow[4], this.SelectGrid.GWNSelRow[4]]);
this.DocGrid.selectRow (this.DocGrid.getRowIndex (newId));
this.DataProcessor.setUpdated (newId, "updated");
this.CalcTotal  ();
}


function DocSaleEditClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function DocSaleEditButtonClick (name)
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
     this.Form.send ("adm-req.php?action=save&e=" + new Date().getTime(), "post", $.proxy (function (loader, response)
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
     this.Form.send ("adm-req.php?action=save&e=" + new Date().getTime(), "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmDocSaleEdit", $("answer", response).attr ("id"));
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
     this.Form.send ("adm-req.php?action=save&e=" + new Date().getTime(), "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmDocSaleAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;

   case "fmPrint":
     window.open ("adm-cheque.php?cid="+this.DocId);
   break;
  }
}



// *** Менеджер ***

function DocSaleManager (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Продажи в магазине - Менеджер", 250);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("2E");
this.Layout.cells ("a").hideHeader ();

this.SelectGrid=new GridWithNav (this.Layout.cells ("a"), "Sales", [1000]);
this.SelectGrid.SetCallback       ($.proxy (DocSaleManagerGridCallback,       this));
this.SelectGrid.SetSelectCallback ($.proxy (DocSaleManagerGridSelectCallback, this));

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
this.DocGrid.loadXML ("adm-db.php?dataset=SalePic&param1=0&pagenum=1&pagelenght=100000&ro=1&e=" + new Date().getTime());
//this.DocGrid.attachEvent ("onXLE", $.proxy (this.CalcTotal, this));
}


function DocSaleManagerGridCallback (id, val)
{
MainMenuClick ("mmDocSaleEdit", val);
}


function DocSaleManagerGridSelectCallback (id, val)
{
this.DocGrid.loadXML ("adm-db.php?dataset=SalePic&param1="+id+"&pagenum=1&pagelenght=100000&ro=1&e=" + new Date().getTime());
}



-->
