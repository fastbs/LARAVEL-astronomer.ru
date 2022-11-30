<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoriesController extends Controller
{
    private $rules;
    private $messages;

    function __construct()
    {
        $this->rules = [
            'title' => ['required', 'string', 'min:5', 'max:60'],
            'parent' => ['required', 'integer', function ($attribute, $value, $fail) {
                if ($value!=0 && !Category::where('id', '=', $value)->count())
                    $fail('Родительская категория указана неверно');
                }
            ],
        ];

        $this->messages =[
            'title.required' => 'Укажите наименование',
            'title.min' => 'Минимум 5 символов в наименовании',
            'title.max' => 'Максимум 60 символов в наименовании',
            'parent.required' => 'Выберите родительскую категорию',
            'parent.integer' => 'Выберите родительскую категорию',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories=Category::orderBy('id')->paginate(10);
        return (view('admin.categories.index', compact (['categories'])));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories=Category::select('id', 'title')->orderBy('id')->get();

        return (view('admin.categories.create', compact (['categories'])));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
/*       $rules = [
            'title' => ['required', 'string', 'min:5', 'max:60'],
            'parent' => ['required', 'integer', function ($attribute, $value, $fail) {
                if ($value!=0 && !Category::where('id', '=', $value)->count())
                   $fail('Родительская категория указана неверно');
            }],
        ];
        $messages = [
            'title.required' => 'Укажите наименование',
            'title.min' => 'Минимум 5 символов в наименовании',
            'title.max' => 'Максимум 60 символов в наименовании',
            'parent.required' => 'Выберите родительскую категорию',
            'parent.integer' => 'Выберите родительскую категорию',
        ];
*/
        Validator::make($request->all(), $this->rules, $this->messages)->validate();

        Category::create($request->all());

        return redirect()->route('admin.categories.index')->with('success', 'Категория добавлена');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $category  =Category::find($id);
        $categories=Category::select('id', 'title')->orderBy('id')->get();

        return (view('admin.categories.edit', compact (['category', 'categories'])));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Validator::make($request->all(), $this->rules, $this->messages)->validate();

        $category = Category::find($id);
        $category->slug = null;

        $category->update($request->all());
        return redirect()->route('admin.categories.index')->with('success', 'Изменения сохранены');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Category::destroy($id);

        return redirect()->route('admin.categories.index')->with('success', 'Категория удалена id='.$id);
    }
}
