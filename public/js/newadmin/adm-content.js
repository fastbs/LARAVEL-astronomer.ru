<!--

// ***** Материалы - Добавить материал ******

function ContentAdd (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Новый материал", 150);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (ContentAddOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=ContentAdd&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onValidateSuccess", $.proxy (function () {this.Layout.cells ("a").progressOn ()}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (ContentAddButtonClick, this));

//fmImageView=myForm.getContainer ("myGrid");
this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (ContentAddClose, this)});};

this.Destroy=function ()
  {
   this.editor.destroy ();
   this.editor=null;
   this.Form.unload ();
   this.Form=null;
   this.Layout.unload ();
   this.Layout=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };
}


function ContentAddOnXLE ()
{
this.Form.detachEvent (this.Event);
CKEDITOR.config.width      =970;
CKEDITOR.config.height     =250;
CKEDITOR.config.contentsCss="css/default.css";
this.editor=CKEDITOR.replace (this.Form.getContainer ("fmCKE"), {skin : "office2003", removePlugins : "resize", extraPlugins : "tableresize"});
CKFinder.setupCKEditor  (this.editor, "ckfinder/");

this.ImgFieldId=$("div[tab_id='"+this.TabId+"']").find("input[name='fmImage']").attr("id");
//<div tab_id="Tab1357819800906">      <input name="fmImage">
}


function ContentAddClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function ContentAddButtonClick (name)
{
switch (name)
  {
   case "fmImageSelect":
     BrowseImgField("", this.ImgFieldId);
   break;

   case "fmImageClear":
     this.Form.setItemValue ("fmImage", "");
   break;

   case "fmClose":
     this.Close ();
   break;

   case "fmSaveClose":
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
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmContentEdit", $("answer", response).attr ("id"));
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;

   case "fmSaveAdd":
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmContentAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}


// *** Материалы - Менеджер материалов ***

function ContentManager (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Менеджер материалов", 200);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.SelectGrid=new GridWithNav (this.Layout.cells ("a"), "Content", [1000]);
this.SelectGrid.SetCallback ($.proxy (ContentManagerGridCallback, this));

//this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (GoodsManagerClose, this)});};
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
}


function ContentManagerGridCallback (id, val)
{
MainMenuClick ("mmContentEdit", val);
}


function ContentManagerClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}




// ***** Материалы - Редактировать материал ******

function ContentEdit (tn, fmId)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Редактирование материала", 200);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (ContentEditOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=ContentEdit&fmId=" + fmId +"&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onValidateSuccess", $.proxy (function () {this.Layout.cells ("a").progressOn ()}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (ContentEditButtonClick, this));

//fmImageView=myForm.getContainer ("myGrid");
this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (ContentEditClose, this)});};

this.Destroy=function ()
  {
   this.editor.destroy ();
   this.editor=null;
   this.Form.unload ();
   this.Form=null;
   this.Layout.unload ();
   this.Layout=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };
}


function ContentEditOnXLE ()
{
this.Form.detachEvent (this.Event);
CKEDITOR.config.width      =970;
CKEDITOR.config.height     =200;
CKEDITOR.config.contentsCss="css/default.css";
this.editor=CKEDITOR.replace (this.Form.getContainer ("fmCKE"), {skin : "office2003", removePlugins : "resize", extraPlugins : "tableresize"});
this.editor.setData (this.Form.getItemValue ("fmIntext"));
CKFinder.setupCKEditor  (this.editor, "ckfinder/");

this.ImgFieldId=$("div[tab_id='"+this.TabId+"']").find("input[name='fmImage']").attr("id");
//<div tab_id="Tab1357819800906">      <input name="fmImage">
}


function ContentEditClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function ContentEditButtonClick (name)
{
switch (name)
  {
   case "fmImageSelect":
     BrowseImgField("", this.ImgFieldId);
   break;

   case "fmImageClear":
     this.Form.setItemValue ("fmImage", "");
   break;

   case "fmClose":
     this.Close ();
   break;

   case "fmSaveClose":
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
     this.Form.setItemValue ("fmIntext", this.editor.getData ());
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmContentAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}


// ***** Публикации - Добавить публикацию ******

function PubsAdd (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Новая промо-публикация", 200);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (PubsAddOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=PubsAdd&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onValidateSuccess", $.proxy (function () {this.Layout.cells ("a").progressOn ()}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (PubsAddButtonClick, this));

WinContentChoose.SetCallback ($.proxy (PubsAddCallback, this));

//fmImageView=myForm.getContainer ("myGrid");
this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (PubsAddClose, this)});};

this.Destroy=function ()
  {
   this.Tree.destructor ();
   this.Tree=null;
   this.Form.unload ();
   this.Form=null;
   this.Layout.unload ();
   this.Layout=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };

this.Select=function () {WinContentChoose.SetCallback ($.proxy (PubsAddCallback, this));};
}


function PubsAddOnXLE ()
{
this.Form.detachEvent (this.Event);
this.Tree=new dhtmlXTreeObject (this.Form.getContainer ("fmGroupsTree"), "100%", "100%", 0);
this.Tree.setSkin      ("dhx_skyblue");
this.Tree.setImagePath ("dhtmlx/dhtmlxTree/codebase/imgs/");
this.Tree.loadXML      ("adm-req.php?fmForm=GroupsTree&e=" + new Date().getTime());
this.Tree.attachEvent  ("onSelect", $.proxy (function (id) {this.Form.setItemValue ("fmGroup", id);}, this));
//this.Tree.attachEvent  ("onXLE",    $.proxy (function (tree, id) {this.Tree.selectItem   (this.Form.getItemValue ("fmCategory"), true); this.Tree.focusItem(this.Form.getItemValue ("fmCategory"));}, this));
}


function PubsAddClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function PubsAddCallback (id, val)
{
this.Form.setItemValue ("fmContentId", id);
this.Form.setItemValue ("fmContentIdLabel", "Id="+id+" Заголовок: "+val);
}


function PubsAddButtonClick (name)
{
switch (name)
  {
   case "fmContentSelect":
     WinContentChoose.WinShow ();
   break;

   case "fmContentClear":
     this.Form.setItemValue ("fmContentId", "");
     this.Form.setItemValue ("fmContentIdLabel", "");
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
           MainMenuClick ("mmPubsEdit", $("answer", response).attr ("id"));
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
           MainMenuClick ("mmPubsAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}


// *** Промо-публикации - Менеджер промо-публикаций ***

function PubsManager (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Менеджер публикаций", 250);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.SelectGrid=new GridWithNav (this.Layout.cells ("a"), "Pubs", [1000]);
this.SelectGrid.SetCallback ($.proxy (PubsManagerGridCallback, this));

//this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (GoodsManagerClose, this)});};
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
}


function PubsManagerGridCallback (id, val)
{
MainMenuClick ("mmPubsEdit", val);
}


function PubsManagerClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}







// *** Публикации - Редактировать публикацию ***

function PubsEdit (tn, fmId)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Редактирование публикации", 250);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (PubsEditOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=PubsEdit&fmId=" + fmId +"&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onValidateSuccess", $.proxy (function () {this.Layout.cells ("a").progressOn ()}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (PubsEditButtonClick, this));

WinContentChoose.SetCallback ($.proxy (PubsEditCallback, this));

//fmImageView=myForm.getContainer ("myGrid");
this.Close=function () {dhtmlx.confirm ({title: "Предупреждение", type: "confirm-warning", text: "Выйти без сохранения?", callback: $.proxy (PubsEditClose, this)});};

this.Destroy=function ()
  {
   this.Tree.destructor ();
   this.Tree=null;
   this.Form.unload ();
   this.Form=null;
   this.Layout.unload ();
   this.Layout=null;
   Tabbar.removeTab (this.TabId, true);
   Tabbar.setTabActive ("Start");
   Tabs [this.TabId]=null;
  };

this.Select=function () {WinContentChoose.SetCallback ($.proxy (PubsEditCallback, this));};
}


function PubsEditOnXLE ()
{
this.Form.detachEvent (this.Event);
this.Tree=new dhtmlXTreeObject (this.Form.getContainer ("fmGategoryTree"), "100%", "100%", 0);
this.Tree.setSkin      ("dhx_skyblue");
this.Tree.setImagePath ("dhtmlx/dhtmlxTree/codebase/imgs/");
this.Tree.loadXML      ("adm-req.php?fmForm=GoodsCategoriesTree&e=" + new Date().getTime());
this.Tree.attachEvent  ("onSelect", $.proxy (function (id) {this.Form.setItemValue ("fmGategory", id);}, this));
this.Tree.attachEvent  ("onXLE",    $.proxy (function (tree, id) {this.Tree.selectItem   (this.Form.getItemValue ("fmGategory"), true); this.Tree.focusItem(this.Form.getItemValue ("fmGategory"));}, this));
}


function PubsEditClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function PubsEditCallback (id, val)
{
this.Form.setItemValue ("fmContentId", id);
this.Form.setItemValue ("fmContentIdLabel", "Id="+id+" Заголовок: "+val);
}


function PubsEditButtonClick (name)
{
switch (name)
  {
   case "fmContentSelect":
     WinContentChoose.WinShow ();
   break;

   case "fmContentClear":
     this.Form.setItemValue ("fmContentId", "");
     this.Form.setItemValue ("fmContentIdLabel", "");
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
           this.Destroy ();
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;

   case "fmSave":
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
     this.Form.send ("adm-req.php?action=save", "post", $.proxy (function (loader, response) 
       {
        this.Layout.cells ("a").progressOff ();
        if ($("answer", response).attr ("result")=="success")
          {
           dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000});
           this.Destroy ();
           MainMenuClick ("mmPubsAdd");
          }
        else
          dhtmlx.message ({text: $("answer", response).text (), lifetime: 3000, type:"error"});
       }, this));
   break;
  }
}



-->
