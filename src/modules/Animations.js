(function () {'use strict';

angular.module('aggAnimations', [])

.animation('.aggEnterDown', function($animateCss) {
    return {
        enter: function (element) {
            var endHeight = element[0].offsetHeight;
            return $animateCss(element, {
                event: 'enter',
                structural: true,
                from: {height: 0, overflow: 'hidden'},
                to: {height: endHeight+'px', overflow: 'auto'},
                duration: 1
            });
        },
        leave: function (element) {
            var height = element[0].offsetHeight;
            return $animateCss(element, {
                event: 'leave',
                structural: true,
                from: {height: height, overflow: 'auto'},
                to: {height: 0, overflow: 'hidden'},
                duration: 1
            });
        }
    }
});
}());
