<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Support\Facades\DB;

class Tag extends Model
{
    use HasFactory;

    public    $timestamps = false;
    protected $fillable   = ['position', 'title', 'slug'];

    public function tagPubs ()
    {
        return $this->hasMany(PublicationTag::class);
    }


    public function pubsCount ()
    {
        return DB::table('publications_tags')
            ->join   ('tags', 'publications_tags.tag_id', '=', 'tags.id')
            ->select ('publications_tags.id')
            ->where  ('publications_tags.tag_id', '=', $this->id)
            ->count  ();
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
