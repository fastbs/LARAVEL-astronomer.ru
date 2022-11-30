@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="about-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Справочники</h2>
                        </div>
                        <div class="blog-post">
                            {!! $content['content'] !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
