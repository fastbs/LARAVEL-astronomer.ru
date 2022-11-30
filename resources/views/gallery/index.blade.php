@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="gallery-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Галерея - Все фотографии</h2>
                        </div>
                        <dl class="gallery-list clearfix">
@foreach ($gallery as $gi)
                            <dd>
                                <div class="pic">
                                    <a href="/gallery/{{ $gi['id'] }}">
                                        <img src="/data/~gallery/small/{{ sprintf ("%06d.jpg", $gi['id']) }}"
                                             title="{{ $gi['title'] }}" alt="{ $gi['id'] }}">
                                    </a>
                                </div>
                                <h3>
                                    <a href="/gallery/{{ $gi['id'] }}">{{ $gi['title'] }}</a>
                                </h3>
                                <div class="date">Дата: {{ $gi['DatePub'] }}</div>
                            </dd>
@endforeach
                        </dl>
                        <div class="pages-nav">
                            {{ $gallery->links('layouts.paginator') }}
                            <br/><br/>
                        </div>
                    </div>
                    <div class="sidebar">
                        <div id="meta">
                            <div class="title-nav">
                                <h2>Категории</h2>
                            </div>
                            <div class="con">
                                <ul>
                                    <li>
                                        <span>12</span>
                                        <a href="gallery.php?act=meta&amp;meta=1">Обсерватории</a>
                                    </li>
                                    <li>
                                        <span>19</span>
                                        <a href="gallery.php?act=meta&amp;meta=2">Пейзажи</a>
                                    </li>
                                    <li>
                                        <span>23</span>
                                        <a href="gallery.php?act=meta&amp;meta=4">Телескопы</a>
                                    </li>
                                    <li>
                                        <span>17</span>
                                        <a href="gallery.php?act=meta&amp;meta=3">Радиотелескопы</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
