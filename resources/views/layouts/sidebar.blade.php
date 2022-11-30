<div class="sidebar">
    <div id="categories">
        <div class="title-nav">
            <h2>Категории</h2>
        </div>
        <div class="con">
            <ul>
                @foreach ($pubsCatList as $pci)
                    <li style="@if($pci['parent']!=0)margin-left:20px;@endif">
                        <span>{{ $pci->pubsCount() }}</span>
                        <a href="{{ route('publications.categoryView', ['categorySlug' => $pci['slug']]) }}">{{ $pci['title'] }}</a>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
    <div id="meta">
        <div class="title-nav">
            <h2>Метки</h2>
        </div>
        <div class="con">
            <ul>
                @foreach ($tagList as $ti)
                    <li>
                        <span>{{ $ti->pubsCount() }}</span>
                        <a href="{{ route('publications.tagView', ['tagSlug' => $ti['slug']]) }}">{{ $ti['title'] }}</a>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
</div>
