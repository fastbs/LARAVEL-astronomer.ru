<?php

namespace App\Http\Controllers;

use App\Models\{Content};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommonController extends Controller
{
    //
    public function about() {

        return view('about');
    }

    public function contacts() {

        return view('contacts');
    }

    public function partners() {

        return view('partners');
    }

    public function people() {

        return view('people');
    }

    public function reference() {

        $content = Content::where("id", "=", 128)->first();
        return (view('reference', compact(['content'])));
    }
}
