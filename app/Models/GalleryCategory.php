<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class GalleryCategory extends Model
{
    use HasFactory;
    use Sluggable;

    public    $timestamps = false;
    protected $table      = "gallery_categories";
    protected $fillable   = ['title'];

    public function contents ()
    {
        return $this->hasMany(Gallery::class);
    }

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

}
