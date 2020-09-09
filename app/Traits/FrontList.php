<?php

namespace App\Traits;

trait FrontList
{
    private $columns = [];
    private $filters = [];
    private $excel = [];
    private $model;
    private $resource;
    private $serialize;
    private $pagination;
    private $items;
    private $operations = [];
    private $conditions = null;
    private $filterKeys = null;

    public function model($model, $conditions = null)
    {
        $this->model = $model;
        $this->conditions = $conditions;
        return $this;
    }

    public function resource($resource, $serialize)
    {
        $this->resource = $resource;
        $this->serialize = $serialize;
        return $this;
    }

    public function setColumns($columns)
    {
        $this->columns = $columns;
        return $this;
    }

    public function setFilters($filters)
    {
        $this->filters = $filters;
        return $this;
    }

    public function setFilterKeys($filterKeys)
    {
        $this->filterKeys = $filterKeys;
        return $this;
    }

    public function setExcel($excel)
    {
        $this->excel = $excel;
        return $this;
    }

    public function setOperations($operations)
    {
        $this->operations = $operations;
        return $this;
    }

    public function paginator()
    {
        $this->pagination = $this->model::when($this->conditions != null, function ($q) {
            return $q->where($this->conditions);
        })->filter($this->filterKeys)->orderBy('created_at', 'desc')->paginate(8);
        return $this;
    }

    public function serialize()
    {
        $this->items = $this->resource::collection($this->pagination->getCollection())->map->{$this->serialize}();
    }

    public function prepareData()
    {
        $this->paginator()->serialize();
        return $this;
    }

    public function responder()
    {
        return response([
            'data' => $this->items,
            'paginator' => [
                'current_page' => $this->pagination->currentPage(),
                'per_page' => $this->pagination->perPage(),
                'total' => $this->pagination->total(),
            ],
            'columns' => $this->columns,
            'filters' => $this->filters,
            'operations' => $this->operations,
            'excel' => $this->excel
        ]);
    }
}
