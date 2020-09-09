<?php


namespace App\Traits;


trait MainResponder
{
    private $message;
    private $resourceData = [];
    private $error = [];
    private $status = 200;

    public function setData($resourceData)
    {
        $this->resourceData = $resourceData;
        return $this;
    }

    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }

    public function setError($error)
    {
        $this->error = $error;
        return $this;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function responder()
    {
        return response(['resource' => $this->resourceData, 'message' => $this->message, 'error' => $this->error], $this->status);
    }
}
