<?php

namespace App\Http\Controllers;

use App\Models\Calendar;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CalendarController extends Controller
{
    //
    public function index() {
        $calendar=Calendar::orderBy('id', 'desc')->paginate(10);
        return (view('calendar.index', compact (['calendar'])));
    }

    public function view($id) {
        $calendar=Calendar::where("id", "=", $id)->first();
        return (view('calendar.item', compact (['calendar'])));
    }

}
