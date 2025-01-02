<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Мониторинг обменников BestChange API</title>
    <link rel="stylesheet" href="./index_files/main50.css" type="text/css" media="screen">
    <link rel="icon" type="image/x-icon" sizes="16x16" href="https://www.bestchange.ru/favicon.ico">
    <link rel="icon" type="image/png" sizes="400x400" href="https://www.bestchange.ru/images/logo-bc.png">
    <script type="text/javascript" src="./index_files/ru11.js" charset="windows-1251"></script>
    <script type="text/javascript" src="./index_files/main51.js" charset="windows-1251"></script>
</head>
<body>
<div class="content">
    <div id="content_rates">
        <div id="details" class="hide" onmouseout="shd()">
            <dl>
                <dt id="det_changer"></dt>
                <dd>
                    <span class="hide" id="det_acts"></span>
                    <table>
                        <tbody>
                        <tr>
                            <td class="param">Возраст:</td>
                            <td id="det_date" class="val"></td>
                        </tr>
                        <tr>
                            <td class="param">На BestChange:</td>
                            <td id="det_bcage" class="val"></td>
                        </tr>
                        <tr>
                            <td class="param">Сумма резервов:</td>
                            <td id="det_reserve" class="val"></td>
                        </tr>
                        <tr>
                            <td class="param">Perfect Money TS:</td>
                            <td id="det_ts" class="val"></td>
                        </tr>
                        <tr>
                            <td class="param">Страна:</td>
                            <td id="det_country" class="val"></td>
                        </tr>
                        </tbody>
                    </table>
                </dd>
            </dl>
        </div>
        <h1 class="h1">BestChange API</h1>
        <div id="rates_block">
            <table id="content_table">
                <thead>
                    <tr>
                        <td></td>
                        <td class="bj bp changer">Обменник</td>
                        <td class="bj bp from">Отдаете</td>
                        <td class="bj bp to">Получаете</td>
                        <td class="ar arp reserve">Резерв</td>
                        <td class="bj bp reviews end">Отзывы</td>
                    </tr>
                </thead>
                <tbody class="items-bestchange">

                </tbody>
            </table>
        </div
    </div>
</div>
<script type="text/javascript">
    setSelectStyle(document);
</script>

<script src="/assets/js/jquery.min.js"></script>
<script src="/assets/js/bestchange-api.js"></script>
<script src="/assets/js/script.js"></script>
</body>
</html>