<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;


    public function content ()
    {
        return $this->belongsTo (Content::class);
    }

    public function category ()
    {
        return $this->belongsTo (Category::class);
    }

    public function tags()
    {
        return $this->hasMany(PublicationTag::class);
    }

}
