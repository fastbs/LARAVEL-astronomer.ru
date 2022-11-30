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
                    <h3 class="card-title">Создание категории</h3>
                </div>
                <div class="card-body">

                        <form role="form" method="post" action="{{ route('admin.categories.store') }}">
                            @csrf

                            <div class="card-body">
                                <div class="form-group">
                                    <label for="title">Название</label>
                                    <input type="text" name="title"
                                           class="form-control @error('title') is-invalid @enderror" id="title"
                                           value="{{ old('title') }}" placeholder="Название">
                                    <label class="mt-4">Родительская категория</label>
                                    <select name="parent" class="custom-select @error('parent') is-invalid @enderror">
                                      <option value="0" selected="">*** Без родительской категории ***</option>
@foreach($categories as $category)
                                      <option value="{{ $category->id }}" @if (old('parent')==$category->id) selected @endif >{{ $category->id }} - {{ $category->title }}</option>
@endforeach
                                      <option value="100">QQQQQQQ</option>
                                    </select>
<!--
                                    <div class="custom-control custom-switch mt-4">
                                        <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                        <label class="custom-control-label" for="customSwitch1">Toggle this custom switch element</label>
                                    </div>
-->
                                </div>
                            </div>
                            <!-- /.card-body -->

                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary">Сохранить</button>
                            </div>
                        </form>

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
