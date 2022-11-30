@foreach ($menuTree as $item)
        <li class="nav-item {{count($item['children'])>0 ? 'expanded ' : 'leaf '}}{{$loop->first ? 'first' : ''}}">
            <a href="{{ $item['route']!='' ? route('admin.'.$item['route']) : '/admin' }}" title="" class="nav-link">
                <i class="nav-icon {{ $item['awesome'] }}"></i>
                <p>{{ $item['pageName'] }}</p>
            </a>
@if(count($item['children'])>0)
                <ul class="nav nav-treeview" style="display: none;">
@include('admin.layouts.menuItem', ['menuTree' => $item['children']])
                </ul>
@endif
        </li>
@endforeach
