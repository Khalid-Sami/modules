<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit8fa24455d9bab13bd0eb3e2dfc4cc516
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'Admin\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Admin\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit8fa24455d9bab13bd0eb3e2dfc4cc516::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit8fa24455d9bab13bd0eb3e2dfc4cc516::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
