<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit093ce34211dd2d0320f206559b0cd392
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Packages\\' => 9,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Packages\\' => 
        array (
            0 => '/',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit093ce34211dd2d0320f206559b0cd392::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit093ce34211dd2d0320f206559b0cd392::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
