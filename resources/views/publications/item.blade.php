@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="blog-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Публикации</h2>
                        </div>
                        <ul class="blog-list">
                            <li>
                                <div class="pic shadow">
                                    <img src="/{{ $publication->content['introImgLink'] }}" alt="">
                                </div>
                                <h3>
                                    <a href="{{ route('publications.view', ['id' => $publication['id']]) }}">{!! $publication->content['title'] !!}</a>
                                </h3>
                                <div class="author">Категория: <a href="{{ route('publications.categoryView', ['categorySlug' => $publication->category['slug']]) }}">{{ $publication->category['title'] }}</a></div>
                                <div class="author">Дата: {{ $publication['pubDate'] }}</div>
                                <div class="author">Источник: {!! $publication->content['sourceLink'] !!}</div>
                                <div class="con">{{  $publication->content['introText'] }}</div>


                                <div class="footer">
                                    <script type="text/javascript" src="//yandex.st/share/share.js" charset="utf-8"></script>
                                    <div class="soc yashare-auto-init" data-yasharel10n="ru" data-yasharetype="icon" data-yasharequickservices="yaru,vkontakte,facebook,twitter,odnoklassniki,moimir,lj,gplus"></div>
                                    <div class="tags">Метки:
                                        @foreach ($publication->tags as $ti)
                                            <a href="{{ route('publications.tagView', ['tagSlug' => $ti->tag['slug']]) }}">{{ $ti->tag['title'] }}</a>@if (!$loop->last), @endif
                                        @endforeach
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="blog-post">
{!! $publication->content['content'] !!}
                        </div>
                    </div>
@include('layouts.sidebar')
                </div>
            </div>
        </div>
    </div>

@endsection
