<?php


namespace App\Repositories;


use App\Http\Resources\AddressResource;
use App\Traits\MainResponder;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class BaseRepository
{
    use MainResponder;

    public $model;
    public $resource;
    public $conditions = [];
    public $secondConditions = [];
    public $filters = false;
    public $collect = 'toArray';
    public $pagination = false;
    public $paginate = 8;
    public $sortBy = 'created_at';
    public $related;
    public $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    // this method for fetch all records *conditions, relations,filters and paginate supported*

    public function index()
    {

        $resource = $this->model::when($this->conditions, function ($q) {
            return $q->where($this->conditions);
        })->when($this->related, function ($q) {
            return $q->first()->{$this->related}();
        })->when($this->filters, function ($q) {
            return $q->filter($this->request)->sortBy($this->sortBy);
        })->when($this->pagination, function ($q) {
            return $q->paginate($this->paginate);
        });

        if (!$resource instanceof LengthAwarePaginator)
            return $this->setData($resource->get()->mapInto($this->resource)->map->{$this->collect}($this->request))->responder();

        return $this->setData(['data' => $resource->mapInto($this->resource)->map->{$this->collect}($this->request),
            'paginator' => [
            'current_page' => $resource->currentPage(),
            'per_page' => $resource->perPage(),
            'total' => $resource->total(),
        ]])->responder();
    }

    public function find()
    {
        $resource =  $this->findQuery();
        return $this->setData((new $this->resource($resource))->{$this->collect}())->responder();
    }

    // this method for store new record *resource and any function resource you want supported*

    public function store()
    {
        $resource = $this->endQuery()->create($this->prepareData()->toArray());
        return $this->setData((new $this->resource($resource))->{$this->collect}())->responder();
    }

    // this method for update record *resource and any function resource you want supported*

    public function update()
    {
        $resource = tap($this->findQuery(), function ($model) {
            return $model->update($this->prepareData()->toArray());
        });
        if(strcmp($this->modelRelationship()['type'],'HasMany') == 0)
            return $this->setData($this->resource::collection($resource->get())->map->{$this->collect}())->responder();
        return $this->setData((new $this->resource($resource))->{$this->collect}())->responder();
    }

    // this method for delete record data, you can override it

    public function delete()
    {
        $resource = $this->findQuery()->delete();
        return $this->setData((new $this->resource($resource))->{$this->collect}())->responder();
    }

    // this method for activate record data, you can override it

    public function activate()
    {
        $resource = $this->findQuery()->update(['is_active' => 1]);
        return $this->setData((new $this->resource($resource))->{$this->collect}())->responder();
    }

    // this method for deactivate record data, you can override it

    public function deactivate()
    {
        $resource = $this->findQuery()->update(['is_active' => 0]);
        return $this->setData((new $this->resource($resource))->{$this->collect}())->responder();
    }

    // this method for get request data, you can override it

    public function getAttributes()
    {
        return $this->request->all();
    }

    // this method for prepare data, just take fillable data from request

    public function prepareData()
    {
        return collect($this->getAttributes())->only($this->modelInstance()->getFillable());
    }

    // this method for prepare query *relation supported*

    public function prepareQuery()
    {
        $query = $this->model::query();
        return $query->when($this->related, function ($q) {
            return $q->where($this->conditions)->first()->{$this->related}();
        },
            function ($q) {
                return $q;
            });
    }

    // this method for prepare end query *relation supported*

    public function endQuery()
    {
        return $this->prepareQuery()->when($this->secondConditions, function ($q) {
            return $q->where($this->secondConditions);
        }, function ($q) {
            return $q;
        });
    }

    // this method for prepare find query
    public function findQuery()
    {
        return $this->endQuery()->when($this->conditions && !$this->related, function ($q){
            return $q->where($this->conditions)->first();
        })->when(!$this->conditions && !$this->related, function ($q) {
            return $q->findOrFail($this->request->route('id'));
        });
    }

    // this method for get table name

    public function getModelName()
    {
        $className = $this->related ? $this->related : get_class($this->model::getModel());
        $modelTable = Str::snake(Str::plural(class_basename($className)));
        return $modelTable;
    }

    // this method for create new model instance *relation supported*
    public function modelInstance()
    {
        if ($this->related){
            $model = $this->modelRelationship()['model'];
            return new $model;
        }
        return new $this->model;
    }

    // this method for get type and model of relationship
    public function modelRelationship()
    {
        if (!$this->related)
            return ['type' => '', 'method' => ''];

        $reflection = new \ReflectionClass($this->model);
        $method = $reflection->getMethod($this->related);
        return $relationship[$method->getName()] = [
            'type' => (new \ReflectionClass($method->invoke(new $this->model)))->getShortName(),
            'model' => (new \ReflectionClass($method->invoke(new $this->model)->getRelated()))->getName()
        ];
    }

    public function setPagination($bool, $paginate = 8)
    {
        $this->pagination = $bool;
        $this->paginate = $paginate;
        return $this;
    }

    public function setFilters($bool)
    {
        $this->filters = $bool;
        return $this;
    }

    public function setConditions($conditions)
    {
        $this->conditions = $conditions;
        return $this;
    }

    public function setSecondConditions($secondConditions)
    {
        $this->secondConditions = $secondConditions;
        return $this;
    }

    public function setModel(Builder $builder)
    {
        $this->model = $builder;
        return $this;
    }

    public function setRelatedMany($related)
    {
        $this->related = $related;
        return $this;
    }

    public function setResource($resource)
    {
        $this->resource = $resource;
        return $this;
    }

    public function setCollection($collect)
    {
        $this->collect = $collect;
        return $this;
    }

}
