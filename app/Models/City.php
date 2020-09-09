<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class City extends Model
{
    use HasTranslations, SoftDeletes;

    public $translatable = ['name'];

    protected $fillable = ['user_id', 'country_id', 'name', 'is_active'];
}
