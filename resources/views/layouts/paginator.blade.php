@if ($paginator->hasPages())
    <nav>
        <ul class="pagination">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <span class="previous passive">Назад</span>
            @else
                <a class="previous" href="{{ $paginator->previousPageUrl() }}" rel="prev">Назад</a>
            @endif

        <div class="pages">
            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <span class="passive">{{ $element }}</span>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <span class="passive">{{ $page }}</span>
                        @else
                            <a href="{{ $url }}">{{ $page }}</a>
                        @endif
                    @endforeach
                @endif
            @endforeach
        </div>

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                    <a class="next" href="{{ $paginator->nextPageUrl() }}" rel="next">Вперед</a>
            @else
                    <span class="next passive">Вперед</span>
            @endif
        </ul>
    </nav>
@endif
