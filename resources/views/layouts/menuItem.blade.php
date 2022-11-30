    <ul class="menu">
@foreach ($menuTree as $item)
        <li class="{{count($item['children'])>0 ? 'expanded ' : 'leaf '}}{{$loop->first ? 'first' : ''}}">
            <a href="/{{ $item['link'] }}" title="" class="">{{ $item['shortName'] }}</a>
@if(count($item['children'])>0)
@include('layouts.menuItem', ['menuTree' => $item['children']])
@endif
        </li>
@endforeach
    </ul>
