<?php

namespace App\Providers;

use App\Models\{Category, Tag};

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrap();

        DB::listen(function($query)
        {
            Log::info('SQL query: '.$query->sql);
//            Log::info($query->bindings);
        });

        view()->composer(['layouts.header', 'bootstrap.header'], function ($view)
        {
            global $user_info;

            loadUserSettings();
            $SMF_UserInfo = wutf($user_info);

            $menu_items = DB::table('menu')
                          ->join       ('pages', 'menu.pageId', '=', 'pages.id')
                          ->select     ('menu.id', 'menu.parentId', 'menu.pageId', 'pages.shortName', 'pages.link')
                          ->orderBy    ('menu.parentId')
                          ->orderBy    ('menu.position')
                          ->get();

            $menu = array();
            foreach ($menu_items as $item)
              $menu[$item->parentId][$item->id] = get_object_vars($item);

            $menuTree = $menu[0];

            function generateMenuTree (&$menuTree, $menu)
              {
               foreach ($menuTree as $key=>$item)
                 {
                  if (!isset ($item ['children']))
                    {
                     $menuTree [$key]['children'] = array ();
                    }
                  if (array_key_exists ($key, $menu))
                    {
                     $menuTree [$key]['children'] = $menu [$key];
                     generateMenuTree ($menuTree [$key]['children'], $menu);
                    }
                 }
              }

            generateMenuTree($menuTree, $menu);

            $view->with('SMF_UserInfo', $SMF_UserInfo)
                 ->with('menuTree', $menuTree);

        });

        view()->composer(['layouts.footer', 'bootstrap.footer'], function($view){

            $cid = DB::table('gallery')->count();

            $gal = array ();

            for ($i=1;$i<=10;)
            {
               $rnd = rand (1, $cid)-1;

               if (!array_key_exists  ($rnd, $gal))
               {
                  $gi = DB::table('gallery')->select ('id', 'title')->offset($rnd)->limit(1)->first();
                  $gal[$rnd] = get_object_vars($gi);
                  $i++;
               }
            }

            $view->with('gallery', $gal);
        });

        view()->composer(['layouts.sidebar', 'bootstrap.sidebar'], function($view){

            $pubsCatList = Category::orderBy('id')->get();
            $tagList = Tag::orderBy('position')->get();

            $view->with('pubsCatList', $pubsCatList);
            $view->with('tagList', $tagList);
        });

        view()->composer(['admin.layouts.layout'], function ($view)
        {
            $menu_items = DB::table('admin_menu')
                ->join       ('admin_pages', 'admin_menu.pageId', '=', 'admin_pages.id')
                ->select     ('admin_menu.id', 'admin_menu.parentId', 'admin_menu.pageId', 'admin_pages.pageName', 'admin_pages.alias', 'admin_pages.awesome', 'admin_pages.route')
                ->orderBy    ('admin_menu.parentId')
                ->orderBy    ('admin_menu.position')
                ->get();

            $menu = array();
            foreach ($menu_items as $item)
                $menu[$item->parentId][$item->id] = get_object_vars($item);

            $menuTree = $menu[0];

            function generateMenuTree (&$menuTree, $menu)
            {
                foreach ($menuTree as $key=>$item)
                {
                    if (!isset ($item ['children']))
                    {
                        $menuTree [$key]['children'] = array ();
                    }
                    if (array_key_exists ($key, $menu))
                    {
                        $menuTree [$key]['children'] = $menu [$key];
                        generateMenuTree ($menuTree [$key]['children'], $menu);
                    }
                }
            }

            generateMenuTree($menuTree, $menu);

            $view->with('menuTree', $menuTree);
        });


    }
}
