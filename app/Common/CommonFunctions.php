<?php


function wutf ($str)
{
if (is_array ($str))
  foreach ($str as $key => $val_copy)
    $str[$key]=wutf ($val_copy);
else
  if (is_string ($str) && !mb_detect_encoding ($str, "UTF-8", true))
    $str=iconv ("windows-1251", "UTF-8//IGNORE", $str);

return $str;
}

function uwin ($str)
{
if (is_array ($str))
  foreach ($str as $key => $val_copy)
    $str[$key]=wutf ($val_copy);
else
  if (is_string ($str) && !mb_detect_encoding ($str, "windows-1251", true))
    $str=iconv ("UTF-8", "windows-1251//IGNORE", $str);

return $str;
}

function RusMonthName ($month, $frm=0)
{
switch ($frm)
  {
   case 0:
   switch ($month)
     {
      case 1:  $s="Январь";   break;
      case 2:  $s="Февраль";  break;
      case 3:  $s="Март";     break;
      case 4:  $s="Апрель";   break;
      case 5:  $s="Май";      break;
      case 6:  $s="Июнь";     break;
      case 7:  $s="Июль";     break;
      case 8:  $s="Август";   break;
      case 9:  $s="Сентябрь"; break;
      case 10: $s="Октябрь";  break;
      case 11: $s="Ноябрь";   break;
      case 12: $s="Декабрь";  break;
      default: $s="[Error!]"; break;
     }
   break;

   case 1:
   switch ($month)
     {
      case 1:  $s="Янв";      break;
      case 2:  $s="Фев";      break;
      case 3:  $s="Мaр";      break;
      case 4:  $s="Апр";      break;
      case 5:  $s="Май";      break;
      case 6:  $s="Июн";      break;
      case 7:  $s="Июл";      break;
      case 8:  $s="Авг";      break;
      case 9:  $s="Сен";      break;
      case 10: $s="Окт";      break;
      case 11: $s="Ноя";      break;
      case 12: $s="Дек";      break;
      default: $s="[Error!]"; break;
     }
   break;

   case 2:
   switch ($month)
     {
      case 1:  $s="января";   break;
      case 2:  $s="февраля";  break;
      case 3:  $s="марта";    break;
      case 4:  $s="апреля";   break;
      case 5:  $s="мая";      break;
      case 6:  $s="июня";     break;
      case 7:  $s="июля";     break;
      case 8:  $s="августа";  break;
      case 9:  $s="сентября"; break;
      case 10: $s="октября";  break;
      case 11: $s="ноября";   break;
      case 12: $s="декабря";  break;
      default: $s="[Error!]"; break;
     }
   break;

   default: $s="[Error!]"; break;
  }

return $s;
}

function GetDateStringN ($ptime, $frm=0)
{
 $array =getdate ($ptime);
 $tday  =$array ["mday"];
 $tmonth=$array ["mon"];
 $tyear =$array ["year"];
 if ($tday<10)
   $tday="0$tday";
 $tmonth=RusMonthName ($tmonth, $frm);

 return "$tday $tmonth $tyear";
}

function GetDateString ($ptime)
{
 $array =getdate ($ptime);
 $tday  =$array ["mday"];
 $tmonth=$array ["mon"];
 $tyear =$array ["year"];
 if ($tday<10)
   $tday="0$tday";
 if ($tmonth<10)
   $tmonth="0$tmonth";

 return "$tday-$tmonth-$tyear";
}

function GetTimeString ($ptime, $s=0)
{
 $array =getdate ($ptime);
 $tsec  =$array ["seconds"];
 $tmin  =$array ["minutes"];
 $thour =$array ["hours"];
 if ($tsec<10)
   $tsec="0$tsec";
 if ($tmin<10)
   $tmin="0$tmin";
 if ($thour<10)
   $thour="0$thour";

 if ($s==0)
   return "$thour:$tmin:$tsec";
 else
   return "$thour:$tmin";
}

