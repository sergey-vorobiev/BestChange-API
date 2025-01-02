const apiKey = '';
const api = new $.BestChangeAPI(apiKey);

// Возможно не пригодиться
// Функция для получения списка стран
function getCountriesPromise(language){
    return new Promise((resolve, reject) => {
        api.getCountries(language, function(data){
            if(data){
                resolve(data);
            }else{
                reject(new Error('Failed to fetch countries'));
            }
        });
    });
}

// Функция для получения списка обменных валют
function getCurrenciesPromise(language){
    return new Promise((resolve, reject) => {
        api.getCurrencies(language, function(data){
            if(data){
                resolve(data.currencies);
            }else{
                reject('Ошибка получения списка валют');
            }
        });
    });
}

// Функция для получения списка обменников
function getChangersPromise(language){
    return new Promise((resolve, reject) => {
        api.getChangers(language, function(data){
            if(data){
                resolve(data.changers); // Возвращаем массив объектов
            }else{
                reject('Ошибка получения списка обменников');
            }
        });
    });
}

// Функция для получения курсов обмена
function getRatesPromise(groupId, directionId){
    return new Promise((resolve, reject) => {
        api.getRates(groupId, directionId, function(data){
            if(data){
                resolve(data);
            }else{
                reject(new Error('Failed to fetch rates'));
            }
        });
    });
}

// Получаем данные из API

async function getCountriesMethod(){
    try{
        const data = await getCountriesPromise("ru");
        return data.countries;
    }catch(error){
        console.error(error);
    }
}

async function getCurrenciesMethod(){
    try{
        const data = await getCurrenciesPromise("ru");
        return data;
    }catch(error){
        console.error(error);
    }
}

async function getChangersMethod(){
    try{
        const data = await getChangersPromise('ru');
        return data;
    }catch(error){
        console.error(error);
    }
}

async function getRatesMethod(currency1, currency2){
    try{
        const data = await getRatesPromise(currency1, currency2);
        return Object.values(data.rates)[0];
    }catch(error){
        console.error(error);
    }
}

let arCountries = [];
let arCurrencies = [];
let arChangers = [];
let arRates = [];
let currency1 = [];
let currency2 = [];

async function getStaticDate() {
    const countries = await getCountriesMethod();
    const currencies = await getCurrenciesMethod();
    const changers = await getChangersMethod();

    for (let i = 0; i < countries.length; i++) {
        arCountries.push(countries[i]);
    }
    for (let i = 0; i < currencies.length; i++) {
        if (currencies[i].id === 93) {
            currency1.push(currencies[i]);
        }
        if (currencies[i].id === 66) {
            currency2.push(currencies[i]);
        }
        arCurrencies.push(currencies[i]);
    }
    for (let i = 0; i < changers.length; i++) {
        arChangers.push(changers[i]);
    }
}

$(document).ready(async function() {
    await getStaticDate();
    getDateAndRender();
    setInterval(getDateAndRender, 10 * 1000);
});

// Функция инициализации
async function getDateAndRender(){
    try{
        arRates = [];
        const rates = await getRatesMethod(93, 66);
        for(let i = 0; i < rates.length; i++){
            arRates.push(rates[i]);
        }

        const objectData = {"changers": arChangers, "rates": arRates, "countries": arCountries};

        await renderData(objectData);

    }catch(error){
        console.error('Ошибка при получении данных', error);
    }
}

// Функция для отрисовки данных в шаблон
async function renderData(objectData){
    try{
        const $tableBody = $(document).find('.items-bestchange');
        let direct_data = {};

        $tableBody.empty();

        objectData.rates.sort((a, b) => a.rate - b.rate);

        objectData.rates.forEach(rate => {
            objectData.changers.forEach(changer => {
                if(rate.changer === changer.id){
                    const $row = $('<tr>').attr('onclick', `ccl(${changer.id}, 93, 66, 0)`);

                    const $infoCell = $('<td>').addClass('ir').append(
                        $('<span>').addClass('io').attr('id', `io${changer.id}`).attr('onmousedown', `shc(${changer.id})`).attr('onclick', 'stopBubbling(event)').attr('onmouseover', `show_info(${changer.id})`).attr('onmouseout', 'shd()')
                    );

                    const $nameCell = $('<td>').addClass('bj').append(
                        $('<div>').addClass('pa').append(
                            $('<a>').attr('rel', 'nofollow').attr('target', '_blank').attr('href', changer.urls.en).attr('onclick', `return fco(${changer.id})`),
                            $('<div>').addClass('pc').append(
                                $('<div>').addClass('ca').text(changer.name),
                                $('<span>').addClass('lbpl').attr('onclick', 'stopBubbling(event)').append(
                                    rate.marks.map(function(value, index) {
                                        const id = `la${changer.id + index}`;
                                        const innerId = `ld${changer.id + index}`;
                                        let innerHtml = '';

                                        if (value === 'floating') {
                                            innerHtml = 'Данный обменный пункт фиксирует курс обмена<br>в заявке не более, чем на <span class="bt">1</span> мин.';
                                        } else if (value === 'otherout') {
                                            innerHtml = 'Данный обменный пункт выплачивает средства<br>через сторонние платежные системы.';
                                        } else if (value === 'manual') {
                                            innerHtml = 'Данный обменный пункт работает в ручном<br>или полуавтоматическом режиме.';
                                        } else if (value === 'verifying') {
                                            innerHtml = 'Данный обменный пункт может запросить верификацию документов клиента<br>или приостановить обмен для проверки других данных.';
                                        } else if (value === 'percent') {
                                            innerHtml = 'Указанный курс обмена включает комиссии:<br>– <span class="bt">49 925 659.860543</span> – основной курс обмена;<br>– <span class="bt">150</span> KZT – комиссия, взимаемая с получаемой валюты.';
                                        } else if (value === 'cardverify') {
                                            innerHtml = 'Данный обменный пункт может запросить<br>верификацию банковской карты клиента.';
                                        } else if (value === 'reg') {
                                            innerHtml = 'На сайте данного обменного пункта необходима<br>регистрация для создания заявки.';
                                        }

                                        return $('<span>').attr('id', id).addClass(value).attr('onmouseover', `sld(${changer.id + index})`).attr('onmouseout', 'hld()').append(
                                            $('<span>').attr('id', innerId).html(innerHtml)
                                        );
                                    })
                                )
                            )
                        )
                    );

                    const $rateCell = $('<td>').addClass('bi').append(
                        $('<div>').addClass('fs').html(`1 <small translate="no">BTC</small>`),
                        $('<div>').addClass('fm').append(
                            $('<div>').addClass('fm1').text(`от ${rate.inmin}`),
                            $('<div>').addClass('fm2').text(`до ${rate.inmax}`)
                        )
                    );


                    let x = 1 / rate.rate;
                    let price = Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

                    const $reserveCell = $('<td>').addClass('bi').html(`${price} <small translate="no">KZT KaspiBank</small>`);

                    let rateReserve = Math.floor(rate.reserve).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    const $maxReserveCell = $('<td>').addClass('ar arp').attr('title', `Максимум валюты Kaspi Bank KZT, сколько может выдать ${changer.name}`).text(rateReserve);

                    const $reviewsCell = $('<td>').addClass('rw').attr('onclick', `crw(${changer.id})`).append(
                        $('<a>').attr('href', changer.pages.en).addClass('rwan').attr('onclick', `return arw(${changer.id})`).attr('title', `Отзывы ${changer.name}`).text(changer.reviews.positive),
                        $('<span>').addClass('end')
                    );

                    changer.country_new = objectData.countries.find(country => country.id === changer.country);

                    $row.append($infoCell, $nameCell, $rateCell, $reserveCell, $maxReserveCell, $reviewsCell);
                    $row.appendTo($tableBody);

                    const randomPercentage = Math.floor(Math.random() * (25 - 5 + 1)) + 5;

                    let years = Math.floor(changer.age / 12);
                    let months = changer.age % 12;

                    let years2 = Math.floor(years * (1 - randomPercentage / 100));
                    let months2 = Math.floor(months * (1 - randomPercentage / 100));

                    let changerReserve = Math.floor(changer.reserve).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

                    let markOfficial = false;
                    rate.marks.forEach(mark => {
                        if (mark === "official") {
                            markOfficial = true;
                            console.log(1)
                        }
                    })
                    direct_data[changer.id] = {
                        a: `id=${changer.id}&from=93&to=66&city=0`,
                        n: changer.name,
                        b: `${years2} лет и ${months2} месяц`,
                        t: "—",
                        r: `$${changerReserve}`,
                        d: `${years} лет и ${months} месяц`,
                        s: changer.rating,
                        u: changer.name.toLowerCase(),
                        v: changer.verify,
                        o: markOfficial,
                        c: changer.country_new.code.toLowerCase(),
                        m: changer.country_new.name
                    };
                }
            });
        });

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = `
            direct_data = ${JSON.stringify(direct_data)};
            update_runner();
        `;
        $tableBody.parent().parent().after(script);
    }catch(error){
        console.error('Ошибка при отрисовки данных', error);
    }
}