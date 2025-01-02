![image](https://github.com/user-attachments/assets/2f2bc363-aede-4ce2-bbab-5a4f626ecf18)

## BestChange API
Данный скрипт получает данные с API BestChange и формирует идентичный обменник как на официальном сайте [bestchange.ru]([url](https://www.bestchange.ru/)).

## Установка
1. Скачать zip архив и расспаковать на хостинг или виртуальный сервер;
2. В файл assets/js/script.js, добавить apiKey полученный со страницы [профиля]([url](https://www.bestchange.ru/partner/profile.html));
3. Переходим на сайт и наслаждаемся результатом.

## Получить другую пару валют
Изначально для примера взята пара **BTC / KaspiBank**, и для того что бы получить обменники по другой паре необходимо:
1. Получить id валют, для этого заходим на [оф. сайт]([url](https://www.bestchange.ru/)), и через консоль разработички наводимся на валюту, и там находим id;
![image](https://github.com/user-attachments/assets/8a5ab775-ba42-4263-a112-688943a60444)
**В файле script.js**:
2. В функции getStaticDate() в строках _111_ и _114_ заменяем id;
3. В фукнции getDateAndRender() так же необходмо на строке 134 заменить id.
