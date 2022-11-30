<!--

function toInt (val)
{
val=parseInt (val);
val=isNaN(val) ? 0 : val
return val;
}

function InitStartPage ()
{
Tabbar.addTab       ("Start", "Старт", "70px");
Tabbar.setTabActive ("Start");
Tabbar.enableTabCloseButton (true);

StartLayout=Tabbar.cells ("Start").attachLayout ("2U");
StartLayout.cells ("a").hideHeader ();
StartLayout.cells ("b").hideHeader ();
StartLayout.cells ("b").setWidth (1200);

SLLeft =StartLayout.cells ("a").attachLayout ("3E");
SLRight=StartLayout.cells ("b").attachLayout ("2E");


SLLeft.cells ("a").hideHeader ();
SLLeft.cells ("b").setText ("Общая статистика");
SLLeft.cells ("c").setText ("Продажи по способам оплаты");
SLLeft.cells ("a").setHeight (42);
SLLeft.cells ("a").fixSize (false, true);

SLRight.cells ("a").setText ("Динамика продаж за последние 30 дней");
SLRight.cells ("b").setText ("Динамика товарных остатков за последние 30 дней");
//SLRight.cells ("a").setHeight (42);

SLLeft.setCollapsedText  ("b", "Общая статистика");
SLLeft.setCollapsedText  ("c", "Продажи по способам оплаты");
SLRight.setCollapsedText ("a", "Динамика продаж за последние 30 дней");
SLRight.setCollapsedText ("b", "Динамика товарных остатков за последние 30 дней");


StartToolbar=SLLeft.cells ("a").attachToolbar ();
StartToolbar.setIconSize  (32);
StartToolbar.setIconsPath ("images/admin/toolbar/");
StartToolbar.loadXML ("xml/AdminToolbars/MainToolbar.xml?e=" + new Date().getTime());
StartToolbar.attachEvent ("onClick", $.proxy (StartToolbarClick, this));

SLLeft.cells ("c").setHeight (SLRight.cells("b").getHeight ());


//BarChart=StartLayout.cells ("a").attachChart ({view: "line", value: "#sales2#", label: "#sales2#", gradient: "falling", color: "#58dccd", radius: 0, alpha: 0.5, border: true, width: 70,
//                                               xAxis: {template: "#day#"}, yAxis: {start: 0, end: 60000, step: 5000, template: function(obj) {return (obj % 10000 ? "": obj);}}});
//BarChart.load ("adm-chart1.php");  //xml/AdminCharts/Chart.xml");

BarChart=SLRight.cells ("a").attachChart ({
    view: "stackedBar",
    value: "#sales2#",
    label: "#sales2#",
    color: "#color#",
    gradient: "falling",
    tooltip: {template: "#sales2#"},
    alpha: 0.7,
    border: true,
    width: 50,
    padding: {top: 15, bottom: 25},
    xAxis:   {template: "#day#", lines: false},
    yAxis:   {start: 0, end: 70000, step: 5000, template: function(obj) {return (obj % 10000 ? "": obj);}},
    legend: {
        values: [{
            text: "Дневные продажи&nbsp;&nbsp;&nbsp;&nbsp;",
            color: "#53b10c"
        }, {
            text: "Оплата по договорам поставки&nbsp;&nbsp;&nbsp;&nbsp;",
            color: "#367fee"
        }, {
            text: "Сумма процентов по картам, кредитам",
            color: "#ee3639"
        }],
        valign: "top",
        align: "center",
        width: 800,
        height: 20,
        layout: "x"
    }
});

BarChart.addSeries({
    value: "#sales4#",
    color: "#367fee", //9b36ee", //367fee",
    label: "#sales4#",
    tooltip: {template: "#sales4#"}
});
BarChart.addSeries({
    value: "#sales3#",
    color: "#a7ee70",
    label: "<font color='#ee3639'><b>#sales3#</b></font>",
    tooltip: {template: "#sales3#"}
});
BarChart.load ("adm-chart1.php");  //xml/AdminCharts/Chart.xml");


LineChart=SLRight.cells ("b").attachChart ({
    view:    "line",
    value:   "#remains#",
    item:    {borderColor: "#53b10c", color: "#ffffff"},
    line:    {color: "#53b10c", width: 3},
    tooltip: {template: "#remains#"},
    offset:  0,
    xAxis:   {template: "#day#"},
    yAxis:   {start: 0, end: 700000, step: 50000, template: function(obj) {return (obj % 100000 ? "": obj);}},
    padding: {top: 15, bottom: 25},
    origin: 0,
    legend:  {
      layout: "x",
      width: 800,
      align: "center",
      valign: "top",
      marker: {type: "round", width: 15},
      values: [{text: "Товарные остатки&nbsp;&nbsp;&nbsp;&nbsp;", color: "#53b10c"},
               {text: "Товары в пути&nbsp;&nbsp;&nbsp;&nbsp;",    color: "#367fee"},
               {text: "Общий товарный потенциал", color: "#ee3639"}]
     }
});

LineChart.addSeries({
    value:   "#transit#",
    item:    {borderColor: "#367fee", color: "#ffffff"},
    line:    {color: "#367fee", width: 3},
    tooltip: {template: "#transit#"}
});

LineChart.addSeries({
    value:   "#total#",
    item:    {borderColor: "#ee3639", color: "#ffffff"},
    line:    {color: "#ee3639", width: 3},
    tooltip: {template: "#total#"}
});

LineChart.load ("adm-chart3.php");


PieChart=SLLeft.cells ("c").attachChart ({
  view: "pie",
  value: "#total#",
  labelOffset: -5,
  label: function (obj) {
    var sum =PieChart.sum ("#total#");
    var text=Math.round (parseFloat (obj.total)/sum*1000)/10+"%";
    return "<div class='label' style='border:1px solid "+obj.color+"; font-size: 11px; width: 40px; text-align: center;'><b>"+text+"</b></div>";
	},
  color: "#color#",
  legend: {
    width:    180,
    align:    "right",
    valign:   "middle",
    template: "#payment#"
  }
});

PieChart.load ("adm-chart2.php"); //xml/AdminCharts/month.xml");


var DVConfig={type:{template:"<span style='font-size: 15px;'><b>#name#:</b><br/> #val# </span>", padding:10, height:60, width:200}};
DataView=SLLeft.cells ("b").attachDataView (DVConfig);
DataView.load ("adm-dataview.php");


$StartPage=$.proxy (StartPage, this);
//StartPageInCont=$.proxy (StartPage, this);
//StartPageInCont ();
}

function StartPage ()
{
Tabbar.setTabActive ("Start");
}


function StartToolbarClick (id)
{
MainMenuClick (id);
}


function RefreshStartPage ()
{
dhtmlxAjax.get ("adm-calc-sales.php", function(loader) {
BarChart.clearAll  ();
LineChart.clearAll ();
PieChart.clearAll  ();
DataView.clearAll  ();

BarChart.load  ("adm-chart1.php");  //xml/AdminCharts/Chart.xml");
LineChart.load ("adm-chart3.php");
PieChart.load  ("adm-chart2.php"); //xml/AdminCharts/month.xml");
DataView.load  ("adm-dataview.php");

Tabbar.setTabActive ("Start");
});
}


function InitFileManager ()
{
Tabbar.addTab     ("FileManager", "Менеджер файлов", "150px");
Tabbar.setContent ("FileManager", "ckf");
Tabbar.hideTab    ("FileManager", true);

Tabs["FileManager"]={};
Tabs["FileManager"]["TabId"]="FileManager";
Tabs["FileManager"]["Obj"]={};
Tabs["FileManager"]["Obj"].Close=function (){Tabbar.disableTab ("FileManager"); Tabbar.hideTab ("FileManager"); Tabbar.setTabActive ("Start");};
}


function FileManager ()
{
Tabbar.enableTab    ("FileManager");
Tabbar.showTab      ("FileManager");
Tabbar.setTabActive ("FileManager");
}



-->