<!--

// ***** Открытие/закрытие торгового дня ******


function DocTradingDays (tn)
{
this.TabId=tn;
Tabbar.setLabel     (tn, "Торговый день - управление", 250);
Tabbar.setTabActive (tn);

this.Layout=Tabbar.cells (tn).attachLayout ("1C");
this.Layout.cells ("a").hideHeader ();

this.Form=this.Layout.cells ("a").attachForm ();
this.Event=this.Form.attachEvent ("onXLE", $.proxy (DocTradingDaysOnXLE, this));
this.Form.loadStruct  ("adm-req.php?fmForm=DocTradingDays&action=load&e=" + new Date().getTime());
this.Form.attachEvent ("onAfterValidate", $.proxy (function (status) {if (status){this.Layout.cells ("a").progressOn ();}}, this));
this.Form.attachEvent ("onButtonClick", $.proxy (DocTradingDaysButtonClick, this));

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


function DocTradingDaysOnXLE ()
{
/*
this.DataView=new dhtmlXDataView ({
        container: cid,
        type:{template:"<span style='font-size: 15px;'><b>#name#:</b><br/> #val# </span>", padding:10, height:60, width:200}
    });

this.DataView.load ("adm-req.php?fmForm=DocTDData&date=" + this.Form.getItemValue ("fmDate") + "&e=" + new Date().getTime());
*/

var cid=this.Form.getContainer ("fmDataView");
cid.setAttribute ("style", cid.getAttribute ("style")+"border: 1px solid #A4BED4;");

this.Tree=new dhtmlXTreeObject (cid, "100%", "100%", 0);
this.Tree.setSkin      ("dhx_skyblue");
this.Tree.setImagePath ("dhtmlx/dhtmlxTree/codebase/imgs/");
this.Tree.loadXML      ("adm-req.php?fmForm=DocTDData&date=" + this.Form.getItemValue ("fmDate") + "&e=" + new Date().getTime());
//this.Tree.attachEvent  ("onXLE",    $.proxy (function (tree, id) {this.Tree.selectItem   (this.Form.getItemValue ("fmCategory"), true); this.Tree.focusItem(this.Form.getItemValue ("fmCategory"));}, this));
//this.Tree.attachEvent  ("onSelect", $.proxy (function (id) {this.Form.setItemValue ("fmCategory", id);}, this));


this.Form.detachEvent (this.Event);


}


function DocTradingDaysClose (act)
{
if (act)
  {
   dhtmlx.message ({text: "Данные не сохранены!", lifetime: 3000, type:"error"});
   this.Destroy ();
  }
}


function DocTradingDaysButtonClick (name)
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




-->
