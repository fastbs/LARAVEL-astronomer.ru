<?php

namespace App\Http\Controllers;

use App\Models\Update;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdatesController extends Controller
{
    //
    public function index() {
        $updates=Update::orderBy('id', 'desc')->paginate(10);
        return (view('updates', compact (['updates'])));
    }

}
