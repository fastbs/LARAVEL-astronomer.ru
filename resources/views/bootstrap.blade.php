@extends('bootstrap.layout')

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
global $user_info;
dump ($user_info);
echo "\n\n";
dump ($SMF_RecentTopics);
echo "\n\n";
@endphp

          <ul id="home-con" class="clearfix">
            <li class="lastpub short">
              <div class="title-nav">
                <h2>Последние публикации</h2>
              </div>
              <div class="pub-box con">
                <ul class="pub-player">
                  <li class="pub-item selected">
                    <div class="pub-img">
                      <img src="images/AiT.png" alt=""/>
                    </div>
                    <div>
                      <h4>
                        <a href="publications.php?act=view&amp;id=205">Доклад на втором заседании Совета РАН по космосу</a>
                      </h4>
                      <p class="pub-text">Категория: <a href="publications.php?act=group&amp;group=ReportsIson">Доклады проекта ISON</a></p>
                      <p class="pub-text">Date: 2018-07-19 00:00:00</p>
                      <p class="pub-text">Source: <a href="http://astronomer.ru/">«АиТ»</a></p>
                      <p class="pub-text">Tags: <a href="?act=meta&amp;meta=1">Космический мусор</a>
</p>
                    </div>
                    <p class="pub-ext">Доклад на втором заседании Совета РАН по космосу, посвященном проблеме космического мусора - Москва, 27 июня 2018 г.</p>
                    <div class="btns">
                      <a href="publications.php?act=view&amp;id=205">Подробнее</a>
                    </div>
                  </li>
                  <li class="pub-item">
                    <div class="pub-img">
                      <img src="data/0244/thumb.jpg" alt=""/>
                    </div>
                    <div>
                      <h4>
                        <a href="publications.php?act=view&amp;id=204">Маленькая легенда - школьные менисковые телескопы Д.Д. Максутова</a>
                      </h4>
                      <p class="pub-text">Категория: <a href="publications.php?act=group&amp;group=ArticlesAmateurs">Статьи любителям астрономии</a></p>
                      <p class="pub-text">Date: 2018-04-28 00:00:00</p>
                      <p class="pub-text">Source: <a href="http://astronomer.ru/">«АиТ»</a></p>
                      <p class="pub-text">Tags: <a href="?act=meta&amp;meta=6">Любителям астрономии</a>
</p>
                    </div>
                    <p class="pub-ext">Описание выпускавшихся в 40-х - 60-х годах прошлого века Школьных менисковых телескопов Максутова, иллюстрированное подробными фотографиями как телескопов из коллекции автора, так и присланных ему другими любителями астрономии, а также обнаруженных на просторах Интернета.</p>
                    <div class="btns">
                      <a href="publications.php?act=view&amp;id=204">Подробнее</a>
                    </div>
                  </li>
                  <li class="pub-item">
                    <div class="pub-img">
                      <img src="images/AiT.png" alt=""/>
                    </div>
                    <div>
                      <h4>
                        <a href="publications.php?act=view&amp;id=203">Комплексы электронно-оптических средств для мониторинга околоземного космического пространства</a>
                      </h4>
                      <p class="pub-text">Категория: <a href="publications.php?act=group&amp;group=ArticlesIson">Статьи проекта ISON</a></p>
                      <p class="pub-text">Date: 2018-02-22 00:00:00</p>
                      <p class="pub-text">Source: <a href="http://astronomer.ru/">«АиТ»</a></p>
                      <p class="pub-text">Tags: <a href="?act=meta&amp;meta=1">Космический мусор</a>
</p>
                    </div>
                    <p class="pub-ext">В рамках развития сети НСОИ АФН ИПМ им. М.В. Келдыша РАН заказал разработку десяти типов оптических телескопов апертурой от 19,2 см до 65 см, а также нескольких типов опорно-поворотных устройств, павильонов и куполов.</p>
                    <div class="btns">
                      <a href="publications.php?act=view&amp;id=203">Подробнее</a>
                    </div>
                  </li>
                  <li class="pub-item">
                    <div class="pub-img">
                      <img src="images/AiT.png" alt=""/>
                    </div>
                    <div>
                      <h4>
                        <a href="publications.php?act=view&amp;id=202">Роботизированный астероидный обзор сети ISON, поиск АСЗ и комет из обоих полушарий Земли</a>
                      </h4>
                      <p class="pub-text">Категория: <a href="publications.php?act=group&amp;group=ArticlesIson">Статьи проекта ISON</a></p>
                      <p class="pub-text">Date: 2018-02-20 00:00:00</p>
                      <p class="pub-text">Source: <a href="http://astronomer.ru/">«АиТ»</a></p>
                      <p class="pub-text">Tags: <a href="?act=meta&amp;meta=2">Астероиды</a>,
<a href="?act=meta&amp;meta=7">Кометы</a>
</p>
                    </div>
                    <p class="pub-ext">НСОИ АФН развивает аппаратуру и методику астероидных обзоров с малыми телескопами, проводит кампании фотометрических наблюдений АСЗ и отрабатывает сопровождение недавно найденных объектов.</p>
                    <div class="btns">
                      <a href="publications.php?act=view&amp;id=202">Подробнее</a>
                    </div>
                  </li>
                  <li class="pub-item">
                    <div class="pub-img">
                      <img src="images/AiT.png" alt=""/>
                    </div>
                    <div>
                      <h4>
                        <a href="publications.php?act=view&amp;id=199">Доклады на 5 международной конференции по роботизированным обсерваториям "AstroRob 2017"</a>
                      </h4>
                      <p class="pub-text">Категория: <a href="publications.php?act=group&amp;group=ReportsIson">Доклады проекта ISON</a></p>
                      <p class="pub-text">Date: 2017-11-10 00:00:00</p>
                      <p class="pub-text">Source: <a href="http://astronomer.ru/">«АиТ»</a></p>
                      <p class="pub-text">Tags: <a href="?act=meta&amp;meta=1">Космический мусор</a>,
<a href="?act=meta&amp;meta=2">Астероиды</a>,
<a href="?act=meta&amp;meta=3">Гамма-всплески</a>
</p>
                    </div>
                    <p class="pub-ext">Доклады на 5 международной конференции по роботизированным обсерваториям "AstroRob 2017" - Уэльва, Испания, 16-20 октября 2017 г.</p>
                    <div class="btns">
                      <a href="publications.php?act=view&amp;id=199">Подробнее</a>
                    </div>
                  </li>
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
                    <img src="data/~apod/{{ sprintf ("%06d.jpg", $apod->id) }}" alt="{{ $apod->title }}"/>
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
                  <a href="publications.php?act=view&amp;id={{ $video->id }}">
                      <img src="{{ $video->image }}" alt="{{ $video->title }}"/>
                  </a>
                </div>
                <h4>
                  <a href="publications.php?act=view&amp;id={{ $video->id }}">{{ $video->title }}</a>
                </h4>
              </div>
              <div class="btns">
                <a href="publications.php?act=view&amp;id={{ $video->id }}">Смотреть</a>
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
                  <p style="padding-bottom:10px;"><img src="images/nw/fill.png" alt="" style="padding-right:5px; vertical-align: bottom;"/><a href="{{ $topic['board']['href'] }}">{{ $topic['board']['name'] }}</a> - <a href="{{ $topic['href'] }}">{{ $topic['subject'] }}</a> от
<a href="{{ $topic['poster']['href'] }}">{{ $topic['poster']['name'] }}</a> - {{ date ("d.m.Y H:i:s", $topic['timestamp']) }}</p>
@endforeach
              </div>
              <div class="btns">
                <a href="forum/index.php">Перейти на форум</a>
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
                <a href="updates.php">Подробнее</a>
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
                    <a href="calendar.php?act=view&amp;cid={{ $ci->id}}">{{ $ci->title }}</a>
                  </h4>
                  <p style="padding-top:5px;">{{ $ci->getPeriod() }}</p>
                </div>
@endforeach
                <div class="btns">
                  <a href="calendar.php">Подробнее</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
--}}
      </div>
    </div>
@endsection
