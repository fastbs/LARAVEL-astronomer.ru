<?php

namespace App\Http\Controllers;

use App\Models\{Publication, Category, Tag};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectsController extends Controller
{
    //
    public function index()
    {
        return (view('projects.index'));
    }

    public function projectIson()
    {
        $publications  = Publication::whereIn('category_id', Category::whereIn('slug', ['ArticlesIson', 'NewsIson', 'ReportsIson'])->pluck('id'))->orderBy('id', 'desc')->paginate(10);
        return (view('projects.ison', compact(['publications'])));
    }

    public function projectLfvn()
    {
        $publications = Publication::whereIn('category_id', Category::whereIn('slug', ['ArticlesLfvn', 'NewsLfvn', 'ReportsLfvn'])->pluck('id'))->orderBy('id', 'desc')->paginate(10);
        return (view('projects.lfvn', compact(['publications'])));
    }

}
