# angular-gmap-gplaces
Modules for integrating the Google maps, places, and directions libraries into an angular application.

## About
I started working on these modules as a way to learn javascript, angular, and the google maps api. I am a new programmer and learning everyday, so if you come across a bug or find code that could be improved, please let me know or submit a pull request, it is greatly appreciated.

## Getting Started
Follow these steps to get started using or developing the modules.

### Install
+ With Bower

   `bower install --save angular-gmap-gplaces`
+ Manual
   1. Download

      [angular-gmap-gplaces.js](http://downloads.codebyjordan.com/angular-gmap-gplaces.js)
   
      [angular-gmap-gplaces.min.js](http://downloads.codebyjordan.com/angular-gmap-gplaces.min.js)
   
   2. Dependencies
   
      + angular: ^1.5.8
      + angular-animate: ^1.5.8
      + angular-sanitize: ^1.5.8
       
### Configure
1. Add `angular-gmap-gplaces` as a dependency to your application

   ```javascript
    angular.module('App', ['angular-gmap-gplaces'])
   ```
2. Configure the `$aggLoader`. This provider will load the Google maps API. 
   
   ```javascript
   config(function($aggLoaderProvider) {
    	$aggLoaderProvider.setOptions({
    		lang: 'en-US',
    		key: 'Your API Key',
    		libs: 'places',
    		numMaps: 4,
            loadFontAwesome: true
    	});
    });
   ```
3. Add a `resolve` for any route using the modules. This ensures the Google Map API is loaded prior to loading any directives requiring it.
   
   ```javascript
   state('app.home', {
       url: '/home',
       views: {
           'mainContent': {
               templateUrl: 'views/home.html',
               controller: 'HomeCtrl as home'
           }
       },
       resolve: {
           google: '$aggLoader'
       }
   })
   ```
4. If you are going to use the minified code and would like to use the `agg-menu` or`agg-location` directives, be sure to move the `img` folder from the `dist` folder to the document root of your application. If you already have an `img` folder at the document root, then simply move the 2 png's from `dist/img` folder into your `img` folder.
    
5. You are now ready to start using the modules. Head over to the [Docs](http://agg.codebyjordan.com/#!/docs/agg-map) for details on usage.   

### Required Directives or Libraries
Anytime a directive requires another directive or requires a specific Google Maps Library to be loaded for its functionality, the docs will be marked like this: `Requires the XX Library` or `Requires the XX Directive`

#### Directives
Anytime a directive requires another directive, the child directive should be nested inside the parent directive, like this:

```html
<agg-map options="Object">
        <agg-location></agg-location>
</agg-map>    
```

#### Libraries
Anytime a directive says that it requires a specific Google Maps library, be sure to include that library while configuring the the $aggLoaderProvider. In the below example we include a single library, the Places library. Multiple libraries can be loaded by passing a string of library names separated by a comma.

```javascript
config(function($aggLoaderProvider) {
    $aggLoaderProvider.setOptions({
        lang: 'en-US',
        key: 'Your API Key',
        libs: 'places',
        numMaps: 4,
        loadFontAwesome: true
    });
});
```