<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TagsController extends Controller
{
    private $rules;
    private $messages;

    function __construct()
    {
        $this->rules = [
            'position' => ['required', 'integer', 'min:1'],
            'title'    => ['required', 'string',  'min:5', 'max:100'],
            'slug'     => ['required', 'string',  'min:5', 'max:100'],
        ];

        $this->messages =[
            'position.required' => 'Укажите позицию метки',
            'position.min'      => 'Позиция метки должна быть >0 ',
            'title.required' => 'Укажите наименование метки',
            'title.min' => 'Минимум 5 символов в наименовании',
            'title.max' => 'Максимум 100 символов в наименовании',
            'slug.required' => 'Укажите слаг метки',
            'slug.min' => 'Минимум 5 символов в слаге метки',
            'slug.max' => 'Максимум 100 символов в слаге метки',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags=Tag::orderBy('id')->paginate(10);
        return (view('admin.tags.index', compact (['tags'])));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //$tags=Tag::select('id', 'title')->orderBy('id')->get();

        return (view('admin.tags.create')); //, compact (['tags'])));
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

        Tag::create($request->all());

        return redirect()->route('admin.tags.index')->with('success', 'Метка добавлена');
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
        $tag=Tag::find($id);

        return (view('admin.tags.edit', compact (['tag'])));
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

        $tag = Tag::find($id);

        $tag->update($request->all());
        return redirect()->route('admin.tags.index')->with('success', 'Изменения сохранены');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Tag::destroy($id);

        return redirect()->route('admin.tags.index')->with('success', 'Метка удалена id='.$id);
    }
}
