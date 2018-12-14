<?php

Route::get('/', 'PagesController@getHome');

Auth::routes();
Route::get('/user', 'PagesController@getUserDashboard');
