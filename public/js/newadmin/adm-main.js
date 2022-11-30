<!--

/* *** Выбор картинок *** */

function ComboImageInit ()
{
this.ImagesCount=0;
this.Combo=this.Form.getCombo ("fmImagesCombo");
this.Combo.readonly (true, true);
this.Combo.setOptionHeight (150);
this.ComboItems={};
this.Combo.attachEvent("onSelectionChange", $.proxy (function() {if (this.ImagesCount>0) this.Form.enableItem ("fmImageRemove");}, this));  
this.MaxImages=+this.Form.getItemValue ("fmMaxImages");
this.Form.disableItem ("fmImageRemove");

for (i=1;i<=this.MaxImages;i++)
  {
   val=this.Combo.getOption ("img" + i);
   if (val!=null)
     {
      $.proxy (ComboImageAdd, this) (val["text"]);
      this.Combo.deleteOption ("img" + i);
     }
  }
}


function ComboImageAdd (fileUrl)
{
var ni="ComboItem"+new Date().getTime();
this.ComboItems[ni]={};
this.ComboItems[ni]["Value"]  =ni;
this.ComboItems[ni]["FileUrl"]=fileUrl;
this.Combo.addOption (ni, "<img src='"+fileUrl+"' style='max-width: 100px; max-height: 100px;'/>&nbsp;&nbsp;"+fileUrl);
this.Combo.setComboText (fileUrl);
this.Combo.selectOption (this.Combo.getIndexByValue(ni), true, true);
this.ImagesCount++;
this.Form.enableItem ("fmImageRemove");
if (this.ImagesCount==this.MaxImages)
  this.Form.disableItem ("fmImageAdd");
return true;
}


function ComboImageRemove ()
{
var sv=this.Combo.getSelectedValue ();
if (sv!=null)
  {
   this.Combo.setComboText ("");
   this.Combo.deleteOption (sv);
   delete this.ComboItems[sv]; //=null;
   this.ImagesCount--;
   this.Form.enableItem ("fmImageAdd");
//   if (this.ImagesCount==0)
   this.Form.disableItem ("fmImageRemove");
  }
}


function ComboImageGetImages ()
{
var str="";
for (var val in this.ComboItems) str=str+this.ComboItems[val]["FileUrl"]+",";
str=str.slice (0, -1);
return str;
}



function BIF2 (startupPath, AF)
{
var finder=new CKFinder();

finder.basePath             ="/newastro/ckfinder/";
finder.startupPath          =startupPath;
finder.selectActionFunction =AF;
finder.popup();
}



function BrowseImgField (startupPath, functionData)
{
var finder=new CKFinder();

finder.basePath             ="/newastro/ckfinder/";
finder.startupPath          =startupPath;
finder.selectActionFunction =SetImgField;
finder.selectActionData     =functionData;
//finder.selectThumbnailActionFunction=ShowThumbnail;
finder.popup();
}


function EmptyImgField (functionData)
{
document.getElementById (functionData).value="";
//document.getElementById (functionData+'thumb').src="";
//document.getElementById (functionData+'thumb').style.display="none";
//document.getElementById (functionData+'thumb').style.src="";
}


function SetImgField (fileUrl, data)
{
document.getElementById (data["selectActionData"]).value = fileUrl;
//document.getElementById (data["selectActionData"]+'thumb').style.display="inline";
//document.getElementById (data["selectActionData"]+'thumb').src=fileUrl;
}


function SetupImgField (imf)
{
fileUrl=document.getElementById (imf).value;
//if (fileUrl=="")
//  document.getElementById (imf+'thumb').style.display="none";
//else
//  document.getElementById (imf+'thumb').style.display="inline";
}


function ShowThumbnail (fileUrl, data)
{
var sFileName=this.getSelectedFile ().name;

document.getElementById (data["selectActionData"]+'thumb').innerHTML='<img src=\"'+fileUrl+'" />';
//'<div class="caption">'+'<a href="'+data["fileUrl"]+'" target="_blank">'+sFileName+'</a> ('+data["fileSize"]+'KB)'+'</div>'+'</div>';

//document.getElementById( 'preview' ).style.display = "";

// It is not required to return any value.
// When false is returned, CKFinder will not close automatically.

return false;
}


var Try = {
  these: function() {
    var returnValue;
    for (var i = 0; i < arguments.length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }
    return returnValue;
  }
}

function createXmlDocument () {
   // нормальные браузеры
   if (document.implementation && document.implementation.createDocument) {
      var doc = document.implementation.createDocument("", "", null);
      return doc;
   }
   // IE
   if (window.ActiveXObject)
       return Try.these(
         function() { return new ActiveXObject('MSXML2.DomDocument')   },
         function() { return new ActiveXObject('Microsoft.DomDocument')},
         function() { return new ActiveXObject('MSXML.DomDocument')    },
         function() { return new ActiveXObject('MSXML3.DomDocument')   }
       ) || false;
   return null;
}


-->
