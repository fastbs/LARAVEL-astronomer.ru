<?php

namespace App\Http\Controllers;

use App\Models\{Publication, Category, Tag};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PublicationsController extends Controller
{
    //
    public function index()
    {
        $publications = Publication::orderBy('id', 'desc')->paginate(10);
        return (view('publications.index', compact(['publications'])));
    }

    public function view($id)
    {
        $publication = Publication::where("id", "=", $id)->first();
        return (view('publications.item', compact(['publication'])));
    }

    public function categoryView($categorySlug)
    {
        $categoryTitle = Category::where('slug', '=', $categorySlug)->first()->title;
        $publications  = Category::where('slug', '=', $categorySlug)->first()->publications()->orderBy('id', 'desc')->paginate(10);
        return (view('publications.category', compact(['publications', 'categoryTitle'])));
    }

    public function tagView($tagSlug)
    {
        $tagTitle    =Tag::where('slug', '=', $tagSlug)->first()->title;
        $publications=Tag::where('slug', '=', $tagSlug)->first()->tagPubs()->orderBy('id', 'desc')->paginate(10);
        return (view('publications.tag', compact(['publications', 'tagTitle'])));
    }

}
