<?php

namespace App\Models;

use App\Models\Content;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Calendar extends Model
{
    use HasFactory;

    protected $table = 'calendar';

//    public $timestamps = false;

    public function getPeriod () {
        $BDate=strtotime ($this->beginDate);
        $EDate=($this->endDate=="") ? 0 : strtotime ($this->endDate);

        $ret="";

        if (!$EDate || $BDate==$EDate)
          $ret=GetDateStringN ($BDate, 2)." г.";
        else
          {
           $BArray=getdate ($BDate);
           $EArray=getdate ($EDate);

           if ($BArray["year"]!=$EArray["year"])
             $ret=GetDateStringN ($BDate, 2)." г. - ".GetDateStringN ($EDate, 2)." г.";
           else
             {
              $ret=$BArray["year"]." г.";

              if ($BArray["mon"]!=$EArray["mon"])
                $ret=$BArray["mday"]." ".RusMonthName ($BArray["mon"], 2)." - ".$EArray["mday"]." ".RusMonthName ($EArray["mon"], 2)." ".$ret;
              else
                {
                 $ret=RusMonthName ($BArray["mon"], 2)." ".$ret;
                 $ret=$BArray["mday"]." - ".$EArray["mday"]." ".$ret;
                }
             }
          }

        return $ret;
    }

    public function getIntro () {
        return  stripcslashes (Content::where  ('id', '=', $this->contentId)->value('title'));
    }

    public function getLink () {
        return  stripcslashes (Content::where  ('id', '=', $this->contentId)->value('sourceLink'));
    }
    public function getContent () {
        return  stripcslashes (Content::where  ('id', '=', $this->contentId)->value('content'));
    }
}
