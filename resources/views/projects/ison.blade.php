@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="blog-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Проект ISON (НСОИ АФН)</h2>
                        </div>
                        <ul class="blog-list">
                            <li><p>
                                    В 2005-2010 гг. была создана глобальная сеть оптических телескопов НСОИ АФН, перекрывающая все долготы вокруг земного шара.
                                    В состав сети входят 23 обсерватории и наблюдательных пункта. С целью их переоснащения изготовлено 20 оптических инструментов апертурой от 19,2 до 60 см
                                    и приобретено 40 современных ПЗС-камер. Основными задачами сети сейчас являются наблюдение космических объектов техногенного происхождения и астероидов,
                                    сближающихся с Землей. Впервые в отечественной истории измерения по объектам космического мусора получаются вдоль всей геостационарной орбиты. Полученные
                                    результаты накапливаются и обобщаются в Баллистическом центре ИПМ им. М.В. Келдыша РАН и открыты для научного анализа - уже собрано порядка 7 миллионов
                                    измерений по 3300 высокоорбитальным объектам, включая около 750 новых объектам, открытых средствами НСОИ АФН. Собрана уникальная информация по объектам с
                                    большим отношением площади к массе. Количество обнаруженных объектов так велико, что требуется пересмотр существующих моделей динамического распределения
                                    космического мусора в околоземном пространстве. Регулярно проводятся фотометрические наблюдения астероидов. Работают два астероидных обзора - в Андрушёвке
                                    и Нью-Мексико, что позволило открыть две кометы, два астероида, сближающихся с Землей, и 600 астероидов главного пояса.</p>
                                <br/>
                                <p style="text-align: center;">
                                    <img alt="" src="/data/0074/1b_600x363.jpg" style="width: 600px; height: 363px;" /></p>
                            </li>
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
