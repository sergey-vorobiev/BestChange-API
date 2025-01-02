function BestChangeAPI(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.bestchange.app/v2/';
}

BestChangeAPI.prototype = {
    getCountries: function(lang, callback) {
        var url = this.baseUrl + this.apiKey + '/countries/' + lang;
        $.getJSON(url, callback);
    },

    getCurrencies: function(lang, callback) {
        var url = this.baseUrl + this.apiKey + '/currencies/' + lang;
        $.getJSON(url, callback);
    },

    getChangers: function(lang, callback) {
        var url = this.baseUrl + this.apiKey + '/changers/' + lang;
        $.getJSON(url, callback);
    },

    getRates: function(fromCurrencyId, toCurrencyId, callback) {
        var url = this.baseUrl + this.apiKey + '/rates/' + fromCurrencyId + '-' + toCurrencyId;
        $.getJSON(url, callback);
    },
};

$.BestChangeAPI = BestChangeAPI;