@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="blog-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Публикации - Все публикации</h2>
                        </div>
                        <ul class="blog-list">
                            @foreach ($publications as $pi)
                                <li>
                                    <div class="pic shadow">
                                        <a href="{{ route('publications.view', ['id' => $pi['id']]) }}">
                                            <img src="/{{ $pi->content['introImgLink'] }}" alt="">
                                        </a>
                                    </div>
                                    <h3>
                                        <a href="{{ route('publications.view', ['id' => $pi['id']]) }}">{{ $pi->content['title'] }}</a>
                                    </h3>
                                    <div class="author">Категория: <a href="{{ route('publications.categoryView', ['categorySlug' => $pi->category['slug']]) }}">{{ $pi->category['title'] }}</a></div>
                                    <div class="author">Дата: {{ $pi['pubDate'] }}</div>
                                    <div class="author">Источник: {!! $pi->content['sourceLink'] !!}</div>
                                    <div class="con">{{  $pi->content['introText'] }}</div>
                                    <div class="footer">
                                        <a href="{{ route('publications.view', ['id' => $pi['id']]) }}" class="btn">Подробнее</a>
                                        <div class="tags">Метки:
@foreach ($pi->tags as $ti)
<a href="{{ route('publications.tagView', ['tagSlug' => $ti->tag['slug']]) }}">{{ $ti->tag['title'] }}</a>@if (!$loop->last), @endif
@endforeach
                                        </div>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                        <div class="pages-nav">
                            {{ $publications->links('layouts.paginator') }}
                            <br/><br/>
                        </div>
                    </div>
@include('layouts.sidebar')
                </div>
            </div>
        </div>
    </div>

@endsection
