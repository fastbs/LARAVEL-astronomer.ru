    <div class="siteintro-wrap">
      <div id="siteintro" class="mod-con clearfix">
        <dl class="about-us">
          <dt>О сайте</dt>
          <dd>
            <a href="{{ route('about') }}">О сайте</a>
          </dd>
          <dd>
            <a href="{{ route('people') }}">Персоналии</a>
          </dd>
          <dd>
            <a href="{{ route('contacts') }}">Контакты</a>
          </dd>
          <dd>
            <a href="{{ route('partners') }}">Партнеры</a>
          </dd>
          <dd>
            <a href="/reference.php">Справочники</a>
          </dd>
        </dl>
        <dl class="categories">
          <dt>Содержание</dt>
          <dd>
            <a href="{{ route('index') }}">Главная</a>
          </dd>
          <dd>
            <a href="{{ route('publications') }}">Публикации</a>
          </dd>
          <dd>
            <a href="/project-ison.php">Проект ISON</a>
          </dd>
          <dd>
            <a href="/project-lfvn.php">Проект LFVN</a>
          </dd>
          <dd>
            <a href="/amateurs.php">Любителям</a>
          </dd>
          <dd>
            <a href="/forum/index.php">Форум</a>
          </dd>
        </dl>
        <dl class="gallery">
          <dt>Галерея</dt>
@foreach ($gallery as $gi)
          <dd>
            <a href="{{ route('gallery.view', ['id' => $gi['id']]) }}">
              <img src="/data/~gallery/micro/{{ sprintf ("%06d.jpg", $gi['id']) }}" title="{{ $gi['title'] }}" alt="{{ $gi['id'] }}"/>
            </a>
          </dd>
@endforeach
        </dl>
      </div>
    </div>
    <div class="footer-wrap">
      <div id="footer" class="mod-con">
        <div class="copyright">© 1999-{{ date('Y') }} Copyright "Астрономия и Телескопостроение"</div>
        <div class="links">При использовании материалов сайта наличие <a href="http://astronomer.ru/">активной гиперссылки</a> обязательно!</div>
      </div>
    </div>
