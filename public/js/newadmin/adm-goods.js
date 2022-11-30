<!--

function GoodsStock (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Товарные остатки", 200);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.SelectGrid=new GridWithNav (this.Layout.cells ("a"), "Stock", [1000]);
this.SelectGrid.SetCallback ($.proxy (GoodsStockGridCallback, this));

//this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (GoodsManagerClose, this)});};
this.Close=function () {this.Destroy ();};

this.Destroy=function ()
  {
   this.SelectGrid=null;
   this.Layout.unload ();
   this.Layout=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };
}


function GoodsStockGridCallback (id, val)
{
MainMenuClick ("mmGoodsEdit", val);
}



// *** Товары - Менеджер товаров ***

function GoodsManager (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Управление товарами", 200);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("3J");
this.Layout.cells ("c").hideHeader ();
this.Layout.cells ("a").setText   ("Категории товаров");
this.Layout.cells ("b").setText   ("Товары в выбранной категории");
this.Layout.cells ("a").setWidth  (400);
this.Layout.cells ("c").setHeight (200);

//this.Toolbar=this.Layout.cells ("b").attachToolbar ();
//this.Toolbar.setIconSize  (18);
//this.Toolbar.setIconsPath ("images/admin/toolbar/");
//this.Toolbar.loadXML ("xml/AdminToolbars/DocToolbar.xml?e=" + new Date().getTime());
//this.Toolbar.attachEvent ("onClick", $.proxy (DocTransitEditButtonClick,    this));

this.Tree=this.Layout.cells ("a").attachTree ();
this.Tree.setSkin      ("dhx_skyblue");
this.Tree.setImagePath ("dhtmlx/dhtmlxTree/codebase/imgs/");
this.Tree.loadXML      ("adm-req.php?fmForm=GoodsCategoriesTree&e=" + new Date().getTime());
this.Tree.attachEvent  ("onSelect", $.proxy (GoodsManagerOnTreeSelect, this));

this.SelectGrid=new GridWithNav (this.Layout.cells ("b"), "Goods", [1000]);
this.SelectGrid.SetCallback ($.proxy (GoodsManagerGridCallback, this));

//this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (GoodsManagerClose, this)});};
this.Close=function () {this.Destroy ();};

this.Destroy=function ()
  {
   this.Tree.destructor ();
   this.Tree=null;
   this.Layout.unload ();
   this.Layout=null;
   this.SelectGrid=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };
}


function GoodsManagerOnTreeSelect (id)
{
this.SelectGrid.SetDataSource ("Goods", [id]);
}


function GoodsManagerGridCallback (id, val)
{
MainMenuClick ("mmGoodsEdit", val);
}


function GoodsManagerClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function GoodsManagerButtonClick (name)
{
switch (name)
  {
   case "DocSave" :
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
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response)
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
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
           MainMenuClick ("mmGoodsEdit", $("answer", response).attr ("id"));
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
           MainMenuClick ("mmGoodsAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}


// ***** Товары - Добавить товар ******

function GoodsAdd (tn, nkteh_id)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Новый товар", 150);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Action="&action=load";
if (nkteh_id)
  this.Action=this.Action+"&nkteh="+nkteh_id;

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (GoodsAddOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=GoodsAdd"+this.Action+"&e=" + new Date().getTime());
this.Form.attachEvent ("onValidateSuccess", $.proxy (function () {this.Layout.cells ("a").progressOn ()}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (GoodsAddButtonClick, this));
this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (GoodsAddClose, this)});};

this.Destroy=function ()
  {
   this.editor.destroy ();
   this.editor=null;
   this.Tree.destructor ();
   this.Tree=null;
   this.Form.unload ();
   this.Form=null;
   this.Layout.unload ();
   this.Layout=null;
   this.ComboItems=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };
}


function GoodsAddOnXLE ()
{
this.Form.detachEvent (this.Event);

this.Tree=new dhtmlXTreeObject (this.Form.getContainer ("fmCategoryTree"), "100%", "100%", 0);
this.Tree.setSkin      ("dhx_skyblue");
this.Tree.setImagePath ("dhtmlx/dhtmlxTree/codebase/imgs/");
this.Tree.loadXML      ("adm-req.php?fmForm=GoodsCategoriesTree&e=" + new Date().getTime());
this.Tree.attachEvent  ("onXLE",    $.proxy (function (tree, id) {this.Tree.selectItem   (this.Form.getItemValue ("fmCategory"), true); this.Tree.focusItem(this.Form.getItemValue ("fmCategory"));}, this));
this.Tree.attachEvent  ("onSelect", $.proxy (function (id) {this.Form.setItemValue ("fmCategory", id);}, this));


CKEDITOR.config.width      =970;
CKEDITOR.config.height     =200;
CKEDITOR.config.contentsCss="css/default.css";
this.editor=CKEDITOR.replace (this.Form.getContainer ("fmCKE"), {skin : "office2003", removePlugins : "resize", extraPlugins : "tableresize"});
this.editor.setData (this.Form.getItemValue ("fmIntext"));
CKFinder.setupCKEditor  (this.editor, "ckfinder/");

//this.ImgFieldId=$("div[tab_id='"+this.TabId+"']").find("input[name='fmImage']").attr("id");
//<div tab_id="Tab1357819800906">      <input name="fmImage">
$.proxy (ComboImageInit, this) ();
}


function GoodsAddClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function GoodsAddButtonClick (name)
{
switch (name)
  {
   case "fmNKTehChoose":
     var value=this.Form.getItemValue ("fmNKTehId");
     this.Destroy ();
     MainMenuClick ("mmGoodsAdd", value);
   break;

   case "fmImageAdd":
     BIF2("", $.proxy (ComboImageAdd, this));
   break;

   case "fmImageRemove":
     $.proxy (ComboImageRemove, this) ();
   break;

   case "fmClose":
     this.Close ();
   break;

   case "fmSaveClose":
     this.Form.setItemValue ("fmImages", $.proxy (ComboImageGetImages, this) ());
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
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
     this.Form.setItemValue ("fmImages", $.proxy (ComboImageGetImages, this) ());
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmGoodsEdit", $("answer", response).attr ("id"));
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;

   case "fmSaveAdd":
     this.Form.setItemValue ("fmImages", $.proxy (ComboImageGetImages, this) ());
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmGoodsAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}


// ***** Товары - Редактировать товар ******

function GoodsEdit (tn, fmId)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Редактирование товара", 200);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (GoodsEditOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=GoodsEdit&fmId=" + fmId +"&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onValidateSuccess", $.proxy (function () {this.Layout.cells ("a").progressOn ()}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (GoodsEditButtonClick, this));
this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (GoodsEditClose, this)});};

this.Destroy=function ()
  {
   this.editor.destroy ();
   this.editor=null;
   this.Tree.destructor ();
   this.Tree=null;
   this.Form.unload ();
   this.Form=null;
   this.Layout.unload ();
   this.Layout=null;
   this.ComboItems=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };

//this.Select=function () {WinContentChoose.SetCallback ($.proxy (PubsEditCallback, this));};
}


function GoodsEditOnXLE ()
{
this.Form.detachEvent (this.Event);

this.Tree=new dhtmlXTreeObject (this.Form.getContainer ("fmCategoryTree"), "100%", "100%", 0);
this.Tree.setSkin      ("dhx_skyblue");
this.Tree.setImagePath ("dhtmlx/dhtmlxTree/codebase/imgs/");
this.Tree.loadXML      ("adm-req.php?fmForm=GoodsCategoriesTree&e=" + new Date().getTime());
this.Tree.attachEvent  ("onXLE",    $.proxy (function (tree, id) {this.Tree.selectItem   (this.Form.getItemValue ("fmCategory"), true); this.Tree.focusItem(this.Form.getItemValue ("fmCategory"));}, this));
this.Tree.attachEvent  ("onSelect", $.proxy (function (id) {this.Form.setItemValue ("fmCategory", id);}, this));

CKEDITOR.config.width      =970;
CKEDITOR.config.height     =200;
CKEDITOR.config.contentsCss="css/default.css";
this.editor=CKEDITOR.replace (this.Form.getContainer ("fmCKE"), {skin : "office2003", removePlugins : "resize", extraPlugins : "tableresize"});
this.editor.setData (this.Form.getItemValue ("fmIntext"));
CKFinder.setupCKEditor  (this.editor, "ckfinder/");

//this.ImgFieldId=$("div[tab_id='"+this.TabId+"']").find("input[name='fmImage']").attr("id");
//<div tab_id="Tab1357819800906">      <input name="fmImage">
$.proxy (ComboImageInit, this) ();
}


function GoodsEditClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function GoodsEditButtonClick (name)
{
switch (name)
  {
   case "fmImageAdd":
     BIF2("", $.proxy (ComboImageAdd, this));
   break;

   case "fmImageRemove":
     $.proxy (ComboImageRemove, this) ();
   break;

   case "fmClose":
     this.Close ();
   break;

   case "fmSaveClose":
     this.Form.setItemValue ("fmImages", $.proxy (ComboImageGetImages, this) ());
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
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

   case "fmSave":
     this.Form.setItemValue ("fmImages", $.proxy (ComboImageGetImages, this) ());
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;

   case "fmSaveAdd":
     this.Form.setItemValue ("fmImages", $.proxy (ComboImageGetImages, this) ());
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmGoodsAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}


-->
