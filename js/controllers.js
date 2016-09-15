(function() {'use strict';

    angular.module('app.controllers', [])
        .controller('AppCtrl', function () {
            var vm = this;
        })

        .controller('PlacesCtrl', function () {
            var vm = this;

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

        .controller('MapCtrl', function (locService) {
            var vm = this;
            var getLocation = locService.getLoc();

            vm.mapOptions = {
                mapId: 'map-canvas',
                center: {lat: 29.892410, lng: -81.31445},
                zoom: 10,
                mapTypeId: 'roadmap'
            };

            getLocation.then(function(results) {
                vm.marker = {
                    position: {lat: results.lat, lng: results.lng},
                    animation: google.maps.Animation.DROP
                };

                vm.click = function (marker, map) {
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                        console.log('clicked true');
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                        console.log('clicked false');
                    }
                };

                vm.directions = {
                    origin: '625 8th Avenue, New York, NY, 10018',
                    destination: '260 Broadway New York NY 10007',
                    travelMode: 'WALKING'
                };
            });

        });

}());