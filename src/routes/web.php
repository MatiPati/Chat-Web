<?php

Route::get('/', 'PagesController@getHome');

Auth::routes();
Route::get('/app', 'PagesController@getAppDashboard')->middleware('auth');
