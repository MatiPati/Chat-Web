const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .combine(['resources/js/chat/api.js', 'resources/js/chat/drawing.js', 'resources/js/chat/init.js'], 'public/js/backend.js')
    .sass('resources/sass/app.scss', 'public/css');
