(function() {'use strict';

angular.module('app.controllers', [])
    .controller('AppCtrl', function () {
        var vm = this;
    })

    .controller('HomeCtrl', function() {
        this.map = {
            index: 0,
            mapId: 'home-map',
            center: 'location',
            zoom: 12
        };
    })

    .controller('SamplesCtrl', function() {
        //
        // Maps
        //
        // Basic Map
        this.bMap = {
            index: 1,
            center: {lat: 29.892410, lng: -81.31445},
            zoom: 10
        };
        // Menu Map
        this.mMap = {
            index: 2,
            center: {lat: 29.892410, lng: -81.31445},
            zoom: 10
        };
        // Location Map
        this.lMap = {
            index: 3,
            center: 'location',
            zoom: 15
        };
        // Directions Map
        this.dMap = {
            index: 4,
            center: 'location',
            zoom: 10
        };
        this.dModel = {
            origin: {},
            destination: {},
            travelMode: 'DRIVING'
        };
        //
        // Autocomplete
        //
        this.autoModel = {};
        this.empty = function (model) {
            Object.keys(model).forEach(function(key){delete model[key];});
        };
    })

    .controller('PlacesCtrl', function () {
        var vm = this;

        // Test
        vm.search = {
            location: {lat: 29.892513, lng: -81.313943},
            radius: 2000
        };
        // Single request
        vm.id = 'ChIJR4dOl_hYwokRApSCaQiBidk';

        // Request for multiple locations model
        vm.idModel = [
            'ChIJR4dOl_hYwokRApSCaQiBidk',
            'ChIJv-Ghof5YwokRMtWLEV12hJI',
            'ChIJjyX2GqRZwokRT-gdcGoPuSI',
            'ChIJqSurReFYwokRec7JFACToas',
            'ChIJn8dCo-NYwokRC_4nRUQWbNE',
            'ChIJszmN0-JYwokRk-XCDbO6X_Y',
            'ChIJt4TrE_1YwokRVedrKxaqYoo',
            'ChIJiW0WvwJZwokRIWyzCvo3o5k',
            'ChIJsS1xLQJZwokRGfXJPMwXA1A',
            'ChIJI5xCX6NZwokR3jdSQwsw2DI',
            'ChIJuVE5aLtZwokR-K75OxUEtzI',
            'ChIJ7R4tgLtZwokRM8thlhlzE2o',
            'ChIJxbWTG_pYwokRPgtFVKi-Cuc',
            'ChIJKZVnwFVYwokRgDw_sxw3NCo',
            'ChIJw_JUgvhYwokR91EMxVDhB8M',
            'ChIJZ3oXOVZYwokRNnAXaDRKAzg',
            'ChIJP9idxlZYwokRLH-I1mNfzYQ',
            'ChIJndGJ5FNYwokRricJvhT0t1s',
            'ChIJhZ0Sn1ZYwokRRA1MZJZHrHA',
            'ChIJhTdv51NYwokR7V105uVzf8g',
            'ChIJvfVwDFJYwokRtWobbwOMEVM',
            'ChIJpY9Tg01YwokRCr_aQpDrqgk',
            'ChIJ-fRuLFdYwokR0KKQ6Av_WhQ',
            'ChIJh-DIsE1YwokRhuFrdM1ge5E'
        ];
    })

    .controller('MapCtrl', function (aggLocationServ) {
        var vm = this;
        var getLocation = aggLocationServ.getLoc();

        vm.mapOptions = {
            index: 0,
            mapId: 'map-canvas',
            center: {lat: 29.892410, lng: -81.31445},
            zoom: 10,
            mapTypeId: 'roadmap',
            styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#ed5929"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#ed5929"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ed5929"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#ed5929"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#354E69"},{"lightness":17}]}]
        };

    });
}());