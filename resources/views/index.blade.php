@extends('layouts.layout')

@section('content')
    <div class="main-bg">
      <div id="home-page" class="main-wrap">
        <div class="slide-box mod-con">
          <ul class="slide-player">
@foreach ($sliders as $slider)
   @if ($loop->iteration==1)
      <li class="blog-list selected">
   @else
      <li class="blog-list">
   @endif
              <div class="slide-img">
                <a href="{{$slider->link}}">
                  <img src="{{$slider->imgLink}}" alt="">
                </a>
              </div>
              <div class="slide-text">
                <h3>{{$slider->title}}</h3>
                <p>{{$slider->introText}}</p>
                <div class="btns">
                  <a href="{{$slider->link}}">Подробнее</a>
                </div>
              </div>
            </li>
@endforeach
          </ul>
          <div class="slide-menu">
@foreach ($sliders as $slider)
   @if ($loop->iteration==1)
            <a href="{{$slider->link}}" class="selected">&nbsp;</a>
   @else
            <a href="{{$slider->link}}" class="">&nbsp;</a>
   @endif
@endforeach
          </div>
        </div>

          <div id="main" class="mod-con">
@php
/*
global $user_info;
dump ($user_info);
echo "\n\n";
dump ($SMF_RecentTopics);
echo "\n\n";
*/
@endphp
          <ul id="home-con" class="clearfix">
            <li class="lastpub short">
              <div class="title-nav">
                <h2>Последние публикации</h2>
              </div>
              <div class="pub-box con">
                <ul class="pub-player">
@foreach($publications as $pi)
                  <li class="pub-item @if ($loop->first)selected @endif">
                    <div class="pub-img">
                      <img src="/{{ $pi->content['introImgLink'] }}" alt=""/>
                    </div>
                    <div>
                      <h4>
                        <a href="{{ route('publications.view', ['id' => $pi['id']]) }}">{!! $pi->content['title'] !!}</a>
                      </h4>
                      <p class="pub-text">Категория: <a href="{{ route('publications.categoryView', ['categorySlug' => $pi->category['slug']]) }}">{{ $pi->category['title'] }}</a></p>
                      <p class="pub-text">Дата: {{ $pi['pubDate'] }}</p>
                      <p class="pub-text">Источник: {!! $pi->content['sourceLink'] !!}</a></p>
                      <p class="pub-text">Метки:
                          @foreach ($pi->tags as $ti)
                              <a href="{{ route('publications.tagView', ['tagSlug' => $ti->tag['slug']]) }}">{{ $ti->tag['title'] }}</a>@if (!$loop->last), @endif
                          @endforeach
                      </p>
                    </div>
                    <p class="pub-ext">{{  $pi->content['introText'] }}</p>
                    <div class="btns">
                      <a href="{{ route('publications.view', ['id' => $pi['id']]) }}">Подробнее</a>
                    </div>
                  </li>
@endforeach
                </ul>
                <div class="pub-menu">
                  <a href="#" class="selected"></a>
                  <a href="#" class=""></a>
                  <a href="#" class=""></a>
                  <a href="#" class=""></a>
                  <a href="#" class=""></a>
                </div>
              </div>
            </li>
            <li class="apod short">
              <div class="title-nav">
                <h2>Астрокартинка дня</h2>
              </div>
              <div class="con">
                <div id="apod-video">
                  <a href="{{ $apod->url }}">
                    <img src="/data/~apod/{{ sprintf ("%06d.jpg", $apod->id) }}" alt="{{ $apod->title }}"/>
                  </a>
                </div>
                <h4>
                  <a href="{{ $apod->url }}">{{ $apod->title }}</a>
                </h4>
              </div>
              <div class="btns">
                <a href="{{ $apod->url }}">Подробнее</a>
              </div>
            </li>
            <li class="video short">
              <div class="title-nav">
                <h2>Видео</h2>
              </div>
              <div class="con">
                <div id="apod-video">
                  <a href="/publications/{{ $video->id }}">
                      <img src="{{ $video->image }}" alt="{{ $video->title }}"/>
                  </a>
                </div>
                <h4>
                  <a href="/publications/{{ $video->id }}">{{ $video->title }}</a>
                </h4>
              </div>
              <div class="btns">
                <a href="/publications/{{ $video->id }}">Смотреть</a>
              </div>
            </li>
          </ul>
          <ul id="home-con" class="clearfix">
            <li class="forum">
              <div class="title-nav">
                <h2>Новое на форуме</h2>
              </div>
              <div class="con">
@foreach($SMF_RecentTopics as $topic)
                  <p style="padding-bottom:10px;"><img src="/images/nw/fill.png" alt="" style="padding-right:5px; vertical-align: bottom;"/><a href="{{ $topic['board']['href'] }}">{{ $topic['board']['name'] }}</a> - <a href="{{ $topic['href'] }}">{{ $topic['subject'] }}</a> от
<a href="{{ $topic['poster']['href'] }}">{{ $topic['poster']['name'] }}</a> - {{ date ("d.m.Y H:i:s", $topic['timestamp']) }}</p>
@endforeach
              </div>
              <div class="btns">
                <a href="/forum/index.php">Перейти на форум</a>
              </div>
            </li>
            <li class="updates">
              <div class="title-nav">
                <h2>Обновления</h2>
              </div>
              <div class="con">
@foreach($updates as $update)
                <div style="padding-bottom:10px;">
                  <h4>
                    <a href="{{ $update->link }}">{{ $update->title }}</a>
                  </h4>
                  <p>{{ $update->introText}}</p>
                  <p style="padding-top:5px;">{{ $update->getDate() }}</p>
                </div>
@endforeach
              </div>
              <div class="btns">
                <a href="{{ route('updates') }}">Подробнее</a>
              </div>
            </li>
            <li class="calendar">
              <div class="title-nav">
                <h2>Календарь</h2>
              </div>
              <div class="con">
@foreach($calendar as $ci)
                <div style="padding-bottom:10px;">
                  <h4>
                    <a href="{{ route('calendar.view', ['id' => $ci->id]) }}">{{ $ci->title }}</a>
                  </h4>
                  <p style="padding-top:5px;">{{ $ci->getPeriod() }}</p>
                </div>
@endforeach
                <div class="btns">
                  <a href="{{ route('calendar') }}">Подробнее</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
@endsection
