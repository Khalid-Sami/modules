<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class Country extends Model
{
    use HasTranslations, SoftDeletes;

    protected $translatable = ['name','nationality'];

    protected $fillable = ['user_id', 'currency_id', 'language_id', 'nationality', 'name', 'postal_code', 'mobile_prefix', 'is_active'];
}
