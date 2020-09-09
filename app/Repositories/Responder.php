<?php


namespace App\Repositories;


use Illuminate\Support\Facades\Facade;

class Responder extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'responder';
    }
}
