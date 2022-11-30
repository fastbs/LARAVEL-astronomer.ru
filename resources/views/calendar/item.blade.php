@extends('layouts.layout')

@section('content')
    <div class="main-bg">
        <div id="sub-page" class="main-wrap">
            <div id="main" class="mod-con">
                <div id="blog-page" class="container clearfix">
                    <div class="main-con">
                        <div class="title-nav">
                            <h2>Календарь событий</h2>
                        </div>
                        <ul class="blog-list">
                            <li>
                                <div class="pic shadow">
                                    <img src="/images/calendar.png" alt="">
                                </div>
                                <h3>
                                    <a href="{{ route('calendar.view', ['id' => $calendar->id]) }}">{{ $calendar->title }}</a>
                                </h3>
                                <div class="author">{{ $calendar->getPeriod() }}</div>
                                <div class="author">Источник: {!! $calendar->getLink() !!}</div>
                                <div class="con">{!! $calendar->getIntro() !!}</div>
                                <div class="footer">
                                    <script type="text/javascript" src="//yandex.st/share/share.js" charset="utf-8"></script>
                                    <div class="soc yashare-auto-init" data-yasharel10n="ru" data-yasharetype="icon" data-yasharequickservices="yaru,vkontakte,facebook,twitter,odnoklassniki,moimir,lj,gplus"><span class="b-share"><a class="b-share__handle" id="ya-share-0.560844951042688-1623300574269" data-hdirection="" data-vdirection=""><img alt="" class="b-share-icon" src="//yastatic.net/share/static/b-share.png"></a><a rel="nofollow" target="_blank" title="ВКонтакте" class="b-share__handle b-share__link b-share-btn__vkontakte" href="https://share.yandex.net/go.xml?service=vkontakte&amp;url=http%3A%2F%2Fastronomer.loc%2Fcalendar.php%3Fact%3Dview%26cid%3D37&amp;title=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5%20-%20%D0%90%D1%81%D1%82%D1%80%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%8F%20%D0%B8%20%D0%A2%D0%B5%D0%BB%D0%B5%D1%81%D0%BA%D0%BE%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5" data-service="vkontakte"><span class="b-share-icon b-share-icon_vkontakte"></span></a><a rel="nofollow" target="_blank" title="Facebook" class="b-share__handle b-share__link b-share-btn__facebook" href="https://share.yandex.net/go.xml?service=facebook&amp;url=http%3A%2F%2Fastronomer.loc%2Fcalendar.php%3Fact%3Dview%26cid%3D37&amp;title=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5%20-%20%D0%90%D1%81%D1%82%D1%80%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%8F%20%D0%B8%20%D0%A2%D0%B5%D0%BB%D0%B5%D1%81%D0%BA%D0%BE%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5" data-service="facebook"><span class="b-share-icon b-share-icon_facebook"></span></a><a rel="nofollow" target="_blank" title="Twitter" class="b-share__handle b-share__link b-share-btn__twitter" href="https://share.yandex.net/go.xml?service=twitter&amp;url=http%3A%2F%2Fastronomer.loc%2Fcalendar.php%3Fact%3Dview%26cid%3D37&amp;title=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5%20-%20%D0%90%D1%81%D1%82%D1%80%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%8F%20%D0%B8%20%D0%A2%D0%B5%D0%BB%D0%B5%D1%81%D0%BA%D0%BE%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5" data-service="twitter"><span class="b-share-icon b-share-icon_twitter"></span></a><a rel="nofollow" target="_blank" title="Одноклассники" class="b-share__handle b-share__link b-share-btn__odnoklassniki" href="https://share.yandex.net/go.xml?service=odnoklassniki&amp;url=http%3A%2F%2Fastronomer.loc%2Fcalendar.php%3Fact%3Dview%26cid%3D37&amp;title=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5%20-%20%D0%90%D1%81%D1%82%D1%80%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%8F%20%D0%B8%20%D0%A2%D0%B5%D0%BB%D0%B5%D1%81%D0%BA%D0%BE%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5" data-service="odnoklassniki"><span class="b-share-icon b-share-icon_odnoklassniki"></span></a><a rel="nofollow" target="_blank" title="Мой Мир" class="b-share__handle b-share__link b-share-btn__moimir" href="https://share.yandex.net/go.xml?service=moimir&amp;url=http%3A%2F%2Fastronomer.loc%2Fcalendar.php%3Fact%3Dview%26cid%3D37&amp;title=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5%20-%20%D0%90%D1%81%D1%82%D1%80%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%8F%20%D0%B8%20%D0%A2%D0%B5%D0%BB%D0%B5%D1%81%D0%BA%D0%BE%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5" data-service="moimir"><span class="b-share-icon b-share-icon_moimir"></span></a><a rel="nofollow" target="_blank" title="LiveJournal" class="b-share__handle b-share__link b-share-btn__lj" href="https://share.yandex.net/go.xml?service=lj&amp;url=http%3A%2F%2Fastronomer.loc%2Fcalendar.php%3Fact%3Dview%26cid%3D37&amp;title=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5%20-%20%D0%90%D1%81%D1%82%D1%80%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%8F%20%D0%B8%20%D0%A2%D0%B5%D0%BB%D0%B5%D1%81%D0%BA%D0%BE%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5" data-service="lj"><span class="b-share-icon b-share-icon_lj"></span></a><a rel="nofollow" target="_blank" title="Google Plus" class="b-share__handle b-share__link b-share-btn__gplus" href="https://share.yandex.net/go.xml?service=gplus&amp;url=http%3A%2F%2Fastronomer.loc%2Fcalendar.php%3Fact%3Dview%26cid%3D37&amp;title=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5%20-%20%D0%90%D1%81%D1%82%D1%80%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%8F%20%D0%B8%20%D0%A2%D0%B5%D0%BB%D0%B5%D1%81%D0%BA%D0%BE%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5" data-service="gplus"><span class="b-share-icon b-share-icon_gplus"></span></a></span></div>
                                    <br>
                                </div>
                            </li>
                        </ul>
                        <div class="blog-post">
                            {!! $calendar->getContent() !!}
                        </div>
                    </div>
@include('layouts.sidebar')
                </div>
            </div>
        </div>
    </div>

@endsection
