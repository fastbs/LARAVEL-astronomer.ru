<?php

namespace App\Http\Controllers;

use App\Models\{Publication, Slider, Apod, Video, Calendar, Update};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    //
    public function index() {

        $publications=Publication::orderBy('id', 'desc')->limit(5)->get();

        $sliders = DB::table('sliders')->where('active', 'Y')->orderBy('id', 'desc')->get();

        $apod = DB::table('apods')->orderBy('id', 'desc')->limit(1)->first();

        $rnd   = rand(1, DB::table('videos')->count())-1;
        $video = DB::table('videos')
                 ->join   ('publications', 'videos.pubId', '=', 'publications.id')
                 ->join   ('contents', 'publications.content_id', '=', 'contents.id')
                 ->select ('publications.id', 'contents.title', 'videos.image')
                 ->offset ($rnd)
                 ->limit  (1)
                 ->first  ();

        $calendar = Calendar::select('id', 'beginDate', 'endDate', 'title')
                  ->where  ('beginDate', '>=', date ("Y-m-d H:i:s"))
                  ->orWhere('endDate', '>=', date ("Y-m-d H:i:s"))
                  ->orderBy('beginDate')
                  ->limit  (3)
                  ->get();

        $updates = Update::orderBy('id', 'desc')->limit(3)->get();

        $SMF_RecentTopics = wutf(ssi_recentTopics (5, null, null, "array"));

        return view('index', compact ('publications', 'sliders', 'apod', 'video', 'calendar', 'updates', 'SMF_RecentTopics'));
    }
}
