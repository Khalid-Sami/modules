<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Currency extends Model
{
    use HasTranslations;

    public $translatable = ['name'];

    protected $fillable = ['user_id', 'name', 'icon', 'is_active'];
}
