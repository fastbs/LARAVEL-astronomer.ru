<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/about.php', '/about');
Route::redirect('/amateurs', '/');
Route::redirect('/amateurs.php', '/');
Route::redirect('/calendar.php', '/calendar');
Route::redirect('/contacts.php', '/contacts');
Route::redirect('/map', '/');
Route::redirect('/map.php', '/');
Route::redirect('/partners.php', '/partners');
Route::redirect('/people.php', '/people');
Route::redirect('/gallery.php', '/gallery');
Route::redirect('/publications.php', '/publications');
Route::redirect('/updates.php', '/updates');
Route::redirect('/projects.php', '/projects');
Route::redirect('/project-ison.php', '/projects/ison');
Route::redirect('/project-lfvn.php', '/projects/lfvn');
Route::redirect('/reference.php', '/reference');
Route::redirect('/rss.php', '/rss');


Route::group(['namespace' => 'App\Http\Controllers'], function () {
Route::get('/',                            'IndexController@index')              ->name('index');
Route::get('/about',                       'CommonController@about')             ->name('about');
Route::get('/contacts',                    'CommonController@contacts')          ->name('contacts');
Route::get('/partners',                    'CommonController@partners')          ->name('partners');
Route::get('/people',                      'CommonController@people')            ->name('people');
Route::get('/reference',                   'CommonController@reference')         ->name('reference');
Route::get('/calendar',                    'CalendarController@index')           ->name('calendar');
Route::get('/calendar/{id}',               'CalendarController@view')            ->name('calendar.view');
Route::get('/gallery',                     'GalleryController@index')            ->name('gallery');
Route::get('/gallery/{id}',                'GalleryController@view')             ->name('gallery.view');
Route::get('/publications',                'PublicationsController@index')       ->name('publications');
Route::get('/publications/{id}',           'PublicationsController@view')        ->name('publications.view')->whereNumber('id');
Route::get('/publications/tag/{tagSlug}',  'PublicationsController@tagView')     ->name('publications.tagView');//->whereAlpha('tagSlug');
Route::get('/publications/{categorySlug}', 'PublicationsController@categoryView')->name('publications.categoryView')->whereAlpha('categorySlug');
Route::get('/updates',                     'UpdatesController@index')            ->name('updates');
Route::get('/projects',                    'ProjectsController@index')           ->name('projects');
Route::get('/projects/ison',               'ProjectsController@projectIson')     ->name('projects.ison');
Route::get('/projects/lfvn',               'ProjectsController@projectLfvn')     ->name('projects.lfvn');
Route::get('/rss',                         'RssController@index')                ->name('rss');
});


Route::get('/bootstrap', 'App\Http\Controllers\BootstrapController@show')->name('bootstrap');

Route::name('admin.')->prefix('admin')->namespace('App\Http\Controllers\Admin')->group(function () {   //group(['prefix' => 'admin', 'name' => 'admin.', 'namespace' => 'App\Http\Controllers\Admin'], function () {
    Route::get('/',          'MainController@index')     ->name('index');
    Route::get('/statistics','MainController@statistics')->name('statistics');
    Route::get('/db',        'MainController@db')        ->name('db');
    Route::get('/others',    'OthersController@index')   ->name('others');


    Route::resource('/categories',  'CategoriesController'); //->name('admin.publications.categories');
    Route::resource('/tags',        'TagsController');
    Route::resource('/contents',    'ContentsController');

    Route::resource('/publications','PublicationsController');
    Route::resource('/gallery',     'GalleryController');
    Route::resource('/updates',     'UpdatesController');
    Route::resource('/links',       'LinksController');
    Route::resource('/slider',      'SliderController');
    Route::resource('/calendar',    'CalendarController');

});



/*

*** Сделано ***
index.php
about.php
amateurs.php
calendar.php
contacts.php
map.php
partners.php
people.php
publications.php
updates.php
project-ison.php
project-lfvn.php
projects.php
reference.php
rss.php

*** Сделано частично, необходима доработка ***
gallery.php


*** Не сделано ***
search.php - чинить поиск


*** Админская часть ***
admin.php
areq.php
newadmin.php
req.php
view.php


*** Технические страницы ***
menu.php
moon.php
obser.php
outsave.php
qq.php
test.php
twit.php
twit2.php


*/
