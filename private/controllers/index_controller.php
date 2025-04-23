<?php
/**
 */
class IndexController extends AppController
{
    # 1
    public function __call($name, $params)
    {
        $this->index($name, ...$params);
    }

    #
    public function index()
    {
        return Redirect::to('/contents/introduction');
    }

    #
    public function joanhey()
    {
        phpinfo();
        die;
    }
}
