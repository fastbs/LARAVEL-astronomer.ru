<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Update extends Model
{
    use HasFactory;
    
//    public $timestamps = false;

    
    public function getDate () {
        return GetDateStringN (strtotime ($this->uDate), 2).' г.';
    }
    
}
