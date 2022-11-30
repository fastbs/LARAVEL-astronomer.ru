@extends('admin.layouts.layout')

@section('content')
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Категории</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Blank Page</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">

            <!-- Default box -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Список категорий</h3>
                </div>
                <div class="card-body">
                    <a href="{{ route('admin.categories.create') }}" class="btn btn-primary mb-3">Добавить категорию</a>
@if(count($categories))
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th style="width: 30px">№</th>
                          <th style="width: 30%">Наименование</th>
                          <th style="width: 30%">Родительская категория</th>
                          <th>Слаг</th>
                          <th>Действия</th>
                        </tr>
                      </thead>
                      <tbody>
@foreach($categories as $category)
                        <tr>
                            <td>{{ $category->id }}</td>
                            <td>{{ $category->title }}</td>
                            <td>
@if($category->parent!=0)
{{ $category->parentTitle() }}
@endif
                            </td>
                            <td>{{ $category->slug }}</td>
                            <td>
                                <a href="{{ route('admin.categories.edit', ['category' => $category->id]) }}" class="btn btn-info btn-sm float-left mr-1">
                                    <i class="fas fa-pencil-alt"></i>
                                </a>

                                <form action="{{ route('admin.categories.destroy', ['category' => $category->id]) }}" method="post" class="float-left">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm"
                                            onclick="return confirm('Подтвердите удаление')">
                                        <i
                                            class="fas fa-trash-alt"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
@endforeach
                      </tbody>
                </table>
<div class="mt-2">
{{ $categories->links() }}
</div>
@else
                <p>Категорий пока нет...</p>
@endif
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                    Footer
                </div>
                <!-- /.card-footer-->
            </div>
            <!-- /.card -->

        </section>
        <!-- /.content -->
@endsection
