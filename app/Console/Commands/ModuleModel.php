<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Console\Input\InputOption;

class ModuleModel extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'module:model {name} {module?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new model for module';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Model';

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return __DIR__ . '/stubs/model.stub';
    }

    /**
     * Build the model class with the given name.
     *
     * @param string $name
     * @return string
     */
    protected function buildClass($name)
    {
        $stub = $this->files->get($this->getStub());
        return $this->replaceNamespace($stub, $name)->replaceClass($stub, $name);
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {


//        /*get passed argument*/
//        $path = '\Admin';
//
//        /*split path*/
//        $path_array = preg_split( "/[\\\\\/]/", $path);
//
//        /*get namespace*/
//        $path_array = array_map(function ($a) { return studly_case($a); }, $path_array);
//        $slash = empty($path_array) ? '' : '\\';
//        $nameSpace = $slash . studly_case(implode('\\', $path_array));
//
////        dd($rootNamespace);
//        $loader = require __DIR__ . '../../../vendor/autoload.php';
//        dd($loader);
        return 'Admin\Models';

    }
}
