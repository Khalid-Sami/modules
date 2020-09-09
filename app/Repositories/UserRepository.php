<?php


namespace App\Repositories;


use App\Http\Resources\AddressResource;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;

class UserRepository extends BaseRepository
{
    public $model = User::class;
    public $resource = UserResource::class;
    public $collect = 'serializeForDetails';
    public $pagination = true;

//    public function index()
//    {
//        $this->setPagination(false)->setConditions(['id' => 2])
//            ->setRelatedMany('addresses')->setResource(AddressResource::class)
//            ->setCollection('serializeForDetails');
//        return parent::index(); // TODO: Change the autogenerated stub
//    }

//    public function getAttributes()
//    {
//        $data = parent::getAttributes(); // TODO: Change the autogenerated stub
//        $data['password'] = bcrypt(\request()->get('password'));
//        return $data;
//    }

//    public function store()
//    {
////        $this->setConditions(['id' => 44])->setRelatedMany('addresses')->setResource(AddressResource::class)
////            ->setCollection('serializeForDetails');
////        return parent::store(); // TODO: Change the autogenerated stub
//    }

//    public function update()
//    {
//        $this->setConditions(['id' => \request()->route('id')])
//            ->setRelatedMany('addresses')->setSecondConditions(['id' => 9])
//            ->setResource(AddressResource::class);
//        return parent::update(); // TODO: Change the autogenerated stub
//    }
}