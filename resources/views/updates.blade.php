@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="blog-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Обновления - Все события</h2>
                        </div>
                        <ul class="blog-list">
@foreach($updates as $ui)
                            <li>
                                <div class="pic shadow">
                                    <a href="{{ $ui->link }}">
                                        <img src="{{ $ui->introImgLink }}" alt="">
                                    </a>
                                </div>
                                <h3>
                                    <a href="{{ $ui->link }}">{{ $ui->title }}</a>
                                </h3>
                                <div class="author">{{ $ui->uDate }}</div>
                                <div class="con">{!! $ui->introText !!}</div>
                                <div class="footer" style="height: 1px;">
                                    <a href="{{ $ui->link }}" class="btn">Подробнее</a>
                                </div>
                            </li>
@endforeach
                        </ul>
                        <div class="pages-nav">
{{ $updates->links('layouts.paginator') }}
<br/><br/>
                        </div>
                    </div>
@include('layouts.sidebar')
                </div>
            </div>
        </div>
    </div>

@endsection
