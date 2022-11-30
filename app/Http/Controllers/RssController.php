<?php

namespace App\Http\Controllers;

use App\Models\{Publication};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RssController extends Controller
{
    //
    public function index() {

        $publications=Publication::orderBy('id', 'desc')->limit(10)->get();

        return view('rss', compact ('publications'));
    }
}
