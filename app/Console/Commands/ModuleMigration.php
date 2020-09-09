<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ModuleMigration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'module:migration {name} {module}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new migration for module';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            $this->call('make:migration', ['name' => $this->argument('name'),
                '--path' => 'modules/'.$this->argument('module').'/database/migrations']);
             $this->info('Migration table created successfully');
        }catch (\Exception $exception){
            $this->info($exception->getMessage());
        }
        return true;
    }
}
