require.config({
    baseUrl: 'js',
    paths: {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'resp': 'plugins/responsiveslides.min',

        'login':'modules/login/login',
        'restful': 'common/restful'

    },
    shim: {
        'resp': ['jq'],
        'login':['jq']
    },
    packages: [],
    waitSeconds: 0
});
require(['domReady', 'jq', 'resp', 'login'], function () {

});

