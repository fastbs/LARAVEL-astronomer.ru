@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="projects-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Проекты</h2>
                        </div>
                        <ul class="projects-list">
                            <li>
                                <h3>
                                    <a href="{{ route('projects.ison') }}">Проект ISON (НСОИ АФН)</a>
                                </h3>
                                <div class="author">Основан в 2004 г.</div>
                                <div class="pic">
                                    <img src="data/~projects/ison1.jpg" alt="">
                                </div>
                                <div class="con">В 2005-2010 гг. была создана глобальная сеть оптических телескопов НСОИ АФН, перекрывающая все долготы
                                    вокруг земного шара. В состав сети входят 23 обсерватории и наблюдательных пункта.
                                    Основными задачами сети сейчас являются наблюдение космических объектов техногенного происхождения и
                                    астероидов, сближающихся с Землей. Впервые в отечественной истории измерения по объектам космического
                                    мусора получаются вдоль всей геостационарной орбиты...
                                </div>
                                <div class="clearfix">
                                    <span class="tags">Публикации: <a href="{{ route('publications.categoryView', ['categorySlug' => 'ArticlesIson']) }}">Статьи</a>, <a href="{{ route('publications.categoryView', ['categorySlug' => 'NewsIson']) }}">Новости</a>, <a href="{{ route('publications.categoryView', ['categorySlug' => 'ReportsIson']) }}">Доклады</a></span>
                                    <a href="{{ route('projects.ison') }}" class="btn">Страница проекта</a>
                                </div>
                            </li>
                            <li>
                                <h3>
                                    <a href="p{{ route('projects.lfvn') }}">Проект LFVN (Низкочастотная РСДБ-сеть)</a>
                                </h3>
                                <div class="author">Основан в 1996 г.</div>
                                <div class="pic">
                                    <img src="data/~projects/lfvn1.jpg" alt="">
                                </div>
                                <div class="con">Концепция "Низкочастотной РСДБ-сети LFVN" была предложена в 1996 г. в рамках гранта ИНТАС 96-0183.
                                    Основной задачей проекта, координируемого сейчас инициативной группой сотрудников ИПМ им. Келдыша РАН,
                                    НИРФИ, РИ НАНУ, ГАО РАН и КрАО, являлось создание международной РСДБ-кооперации с участием российских
                                    и украинских радиотелескопов для проведения экспериментов по заявкам отечественных ученых...
                                </div>
                                <div class="clearfix">
                                    <span class="tags">Публикации: <a href="p{{ route('publications.categoryView', ['categorySlug' => 'ArticlesLfvn']) }}">Статьи</a>, <a href="{{ route('publications.categoryView', ['categorySlug' => 'NewsLfvn']) }}">Новости</a>, <a href="{{ route('publications.categoryView', ['categorySlug' => 'ReportsLfvn']) }}">Доклады</a></span>
                                    <a href="{{ route('projects.lfvn') }}" class="btn">Страница проекта</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection
