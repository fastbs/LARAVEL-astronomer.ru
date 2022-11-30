<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicationTag extends Model
{
    use HasFactory;

    public    $timestamps = false;
    protected $table      = "publications_tags";

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }

    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }

}
