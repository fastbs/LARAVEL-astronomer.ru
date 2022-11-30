<?php

namespace App\Http\Controllers;

use App\Models\{Gallery, GalleryCategory};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GalleryController extends Controller
{
    //
    public function index() {
        $gallery=Gallery::orderBy('id', 'desc')->paginate(9);
        return (view('gallery.index', compact (['gallery'])));
    }

    public function view($id) {
        $gallery=Gallery::where("id", "=", $id)->first();
        return (view('gallery.item', compact (['gallery'])));
    }

}
