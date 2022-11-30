@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="gallery-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Галерея</h2>
                        </div>
                        <table class="gallery-body clearfix">
                            <tbody>
                            <tr>
                                <td>
                                    <div class="pic">
                                        <a href="/data/~gallery/big/{{ sprintf ("%06d.jpg", $gallery['id']) }}" target="_blank">
                                            <img src="/data/~gallery/medium/{{ sprintf ("%06d.jpg", $gallery['id']) }}" title="Нажмите для просмотра фото в полном размере" alt="">
                                        </a>
                                    </div>
                                    <script type="text/javascript" src="//yandex.st/share/share.js" charset="utf-8"></script>
                                    <div class="soc yashare-auto-init" data-yasharel10n="ru" data-yasharetype="icon" data-yasharequickservices="yaru,vkontakte,facebook,twitter,odnoklassniki,moimir,lj,gplus"></div>
                                    <h3>
                                        <a href="/data/~gallery/big/{{ sprintf ("%06d.jpg", $gallery['id']) }}" target="_blank" title="Нажмите для просмотра фото в полном размере">{{ $gallery['title'] }}</a>
                                    </h3>
                                    <div class="date">Дата: {{ $gallery['DatePub'] }}</div>
                                    <div class="con">{{ $gallery['annotation'] }}</div>
                                    <div class="footer">
                                        <a href="/data/~gallery/big/{{ sprintf ("%06d.jpg", $gallery['id']) }}" target="_blank" class="btn">Увеличить</a>
                                        <div class="tags">Категории: <a href="?act=meta&amp;meta=4">Телескопы</a>&nbsp;
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="gallery-list clearfix" style="margin: 40px 0 30px 120px;">
                            <tbody>
                            <tr>
                                <td>
                                    <div class="pic">
                                        <a href="gallery.php?act=view&amp;id=71">
                                            <img src="/data/~gallery/small/000071.jpg" title="15-см телескоп Кудэ-рефрактор в Уссурийской обсерватории" alt="">
                                        </a>
                                    </div>
                                    <h3>
                                        <a href="gallery.php?act=view&amp;id=71">15-см телескоп Кудэ-рефрактор в Уссурийской обсерватории</a>
                                    </h3>
                                    <div class="date">Дата: 2012-11-05 00:00:00</div>
                                </td>
                                <td class="space"></td>
                                <td>
                                    <div class="pic">
                                        <a href="gallery.php?act=view&amp;id=69">
                                            <img src="/data/~gallery/small/000069.jpg" title="70-cм телескоп АЗТ-8 в Евпатории (НЦУИКС)" alt="">
                                        </a>
                                    </div>
                                    <h3>
                                        <a href="gallery.php?act=view&amp;id=69">70-cм телескоп АЗТ-8 в Евпатории (НЦУИКС)</a>
                                    </h3>
                                    <div class="date">Дата: 2012-11-05 00:00:00</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
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
