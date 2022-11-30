<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Content extends Model
{
    use HasFactory;
    use Sluggable;
/*
    public function category ()
    {
        return $this->belongsTo (Category::class);
    }

    public function tags ()
    {
        return $this->belongsToMany (Tag::class);
    }
*/
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

}
