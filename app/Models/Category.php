<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Cviebrock\EloquentSluggable\Sluggable;

class Category extends Model
{
    use HasFactory;
    use Sluggable;

    public    $timestamps = false;
    protected $table      = "categories";
    protected $fillable   = ['title', 'parent'];

    public function publications ()
    {
        return $this->hasMany(Publication::class, 'category_id');
    }

    public function pubsCount ()
    {
        return DB::table('publications')
            ->join    ('categories', 'publications.category_id', '=', 'categories.id')
            ->select  ('publications.id')
            ->where   ('categories.id', '=', $this->id)
            ->orWhere ('categories.parent', '=', $this->id)
            ->count   ();
    }

    public function parentTitle()
    {
        if ($this->parent!=0)
          return Category::where('id', '=', $this->parent)->value('title');
        else
          return false;
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
