    <div class="top-bar-wrap">
      <div id="top-bar" class="mod-con">
        <a href="/" class="logo-link"></a>
        <div class="links">
@if($SMF_UserInfo["id"])
Здравствуйте, <a href="/forum/index.php?action=profile;u={{ $SMF_UserInfo["id"] }}">{{ $SMF_UserInfo["name"] }}!</a><br>
Ваш последний визит:<br>{{ date ("d.m.Y H:i:s", $SMF_UserInfo["last_login"]) }}
@else
<a href="/forum/index.php?action=login">Вход</a> | <a href="/forum/index.php?action=register">Регистрация</a>
@endif
        </div>
        <div class="search" style="clear:both">
          <form id="cref_iframe" action="/search.php">
            <input type="hidden" name="cref" value="http://lfvn.astronomer.ru/cse.xml">
            <input type="hidden" name="cof" value="FORID:9">
            <input type="text" name="q" size="40" style="margin-left: 5px; border: medium none; padding: 2px;">
            <button type="submit" class="btn" name="sa">OK</button>
          <input name="siteurl" type="hidden" value="astronomer.loc/index.php"><input name="ref" type="hidden" value="astronomer.loc/"><input name="ss" type="hidden"></form>
          <script type="text/javascript" src="/js/cse.js"></script>
        </div>
        <div class="rft">
          <a href="/rss" class="rss"></a>
          <a href="https://twitter.com/Astronomer_RU" class="twitter"></a>
        </div>
        <div id="navigation">
@include('layouts.menuItem', ['menuTree' => $menuTree])
        </div>
      </div>
    </div>
