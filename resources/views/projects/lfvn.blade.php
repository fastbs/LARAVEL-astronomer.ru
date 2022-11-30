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
                            <li>
                                <p>Концепция "Низкочастотной РСДБ-сети LFVN" была предложена в 1996 г. в рамках гранта ИНТАС 96-0183. Основной задачей проекта, координируемого сейчас
                                   инициативной группой сотрудников ИПМ им. Келдыша РАН, НИРФИ, РИ НАНУ, ГАО РАН и КрАО, являлось создание международной РСДБ-кооперации с участием российских
                                   и украинских радиотелескопов для проведения экспериментов по заявкам отечественных ученых. В проекте, базировавшемся на РСДБ-опыте НИРФИ и АКЦ ФИАН, была
                                   предпринята попытка объединить усилия всех РСДБ-групп России и Украины, и, до известной степени, это удалось.</p>
                                <p>За время выполнения проекта 14 антенн - <a href="http://lfvn.astronomer.ru/radio/bearlakes/index.htm">РТ-64 в Медвежьих Озерах</a>, РТ-22 в Пущино, РТ-64
                                   в Калязине, РТ-15 в Зименках, РТ-14 в Старой Пустыни (Россия), <a href="http://lfvn.astronomer.ru/optic/evpatoria/rt70/index.htm">РТ-70 в Евпатории</a> и
                                   РТ-22 в Симеизе (Украина), РТ-32 в Вентспилсе (Латвия), РТ-32 в Ното (Италия), РТ-14 в Торуни (Польша), 500х30 (параболический цилиндр) в Ути и РТ-45 в Пуне
                                   (Индия), РТ-25 в Урумчи и РТ-25 в Шанхае (Китай) были дооснащены приемно-регистрирующей радиоастрономической аппаратурой. Организовано 24 РСДБ-эксперимента
                                   на длинах волн 92 см, 18 см, 13 см, 6 см и 3,6 см с использованием в разных комбинациях радиотелескопов Австралии, Англии, Индии, Италии, Канады, Китая,
                                   Латвии, Польши, России, США, Украины, Южной Африки и Японии, а также центров корреляционной обработки в Австралии, Канаде, России и США.</p>
                                <p>Первые РСДБ-лепестки были получены от РТ-14 в Старой Пустыни и РТ-45 в Пуне на длине волны 92 см; от РТ-22 в Пущино и РТ-32 в Светлом на длине волны 18 см
                                   с терминалом регистрации S2; от <a href="http://lfvn.astronomer.ru/optic/evpatoria/rt70/index.htm">РТ-70 в Евпатории</a> на длинах волн 6 см, 13 см, 3,6 см;
                                   от <a href="http://lfvn.astronomer.ru/radio/bearlakes/index.htm">РТ-64 в Медвежьих Озерах</a> на длинах волн 6 см и 13 см. Основными задачами являлись
                                   построение РСДБ-изображений квазаров и отработка РСДБ-метолов исследований солнечного ветра (см.
                                   <a href="http://lfvn.astronomer.ru/result/0000002/r000002.htm">"Результаты теоретических и экспериментальных исследований солнечного ветра и активных ядер
                                   галактик на РСДБ-сети LFVN с использованием системы регистрации S2"</a> и <a href="http://lfvn.astronomer.ru/result/0000003/r000003.htm">"РСДБ эксперимент
                                   ИНТАС99.4"</a>).</p>
                                <p>В период с 2001 по 2005 гг. основные усилия LFVN, поддержанные грантом ИНТАС 2001-0669, были сосредоточены на освоении метода РСДБ-локации тел Солнечной
                                   системы с использованием передатчика <a href="http://lfvn.astronomer.ru/optic/evpatoria/rt70/index.htm">РТ-70 в Евпатории</a>, а также на отработке технике
                                   РСДБ в квази-реальном времени через Интернет. Значительное место уделяется развитию радиолокационных методов исследования космического мусора на высоких
                                   орбитах (см. <a href="http://lfvn.astronomer.ru/result/0000001/r000001.htm">отчет по гранту</a>).</p>
                                <p style="text-align: center;">
                                    <img src="/data/0073/VLBRf_1.gif" style="width: 500px; height: 318px;"></p>
                                <p>
                                    &nbsp;</p>
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
