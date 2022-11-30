<?=
'<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL
?>
<rss version="2.0">
    <channel>
        <title>Астрономия и Телескопостроение - сайт поддержки инициативных проектов</title>
        <link>{{ route('index') }}</link>
        <description>Последние публикации</description>
        <language>ru</language>
        <image>
            <title>Астрономия и Телескопостроение</title>
            <url>{{ url ('/images/AiT.png') }}</url>
            <link>{{ route('index') }}</link>
        </image>

        @foreach ($publications as $pi)
            <item>
                <title>{{ $pi->content['title'] }}</title>
                <link>{{ route('publications.view', ['id' => $pi['id']]) }}</link>
                <category>{{ $pi->category['title'] }}</category>
                <pubDate>{{ date (DATE_RSS, strtotime ($pi['pubDate'])) }}</pubDate>
                <description>{{  $pi->content['introText'] }}</description>
                <enclosure url="{{ url ($pi->content['introImgLink']) }}"/>
            </item>

        @endforeach
    </channel>
</rss>
