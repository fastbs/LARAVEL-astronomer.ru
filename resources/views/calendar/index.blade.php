@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="blog-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Календарь событий - Все события</h2>
                        </div>
                        <ul class="blog-list">
@foreach($calendar as $ci)
                            <li>
                                <div class="pic shadow">
                                    <a href="{{ route('calendar.view', ['id' => $ci->id]) }}">
                                        <img src="images/calendar.png" alt="">
                                    </a>
                                </div>
                                <h3>
                                    <a href="{{ route('calendar.view', ['id' => $ci->id]) }}">{{ $ci->title }}</a>
                                </h3>
                                <div class="author">{{ $ci->getPeriod() }}</div>
                                <div class="author">Источник: {!! $ci->getLink() !!}</div>
                                <div class="con">{!! $ci->getIntro() !!}</div>
                                <div class="footer" style="height: 1px;">
                                    <a href="{{ route('calendar.view', ['id' => $ci->id]) }}" class="btn">Подробнее</a>
                                </div>
                            </li>
@endforeach
                        </ul>
                        <div class="pages-nav">
{{ $calendar->links('layouts.paginator') }}
<br/><br/>
                        </div>
                    </div>
@include('layouts.sidebar')
                </div>
            </div>
        </div>
    </div>

@endsection
