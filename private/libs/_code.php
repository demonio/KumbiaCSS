<?php
/**
 */
class _code
{
    #
    static function start()
    {
        ob_start();
	}

    #
    static function end($class, $lang='html')
    {
        $content['result'] = trim(ob_get_contents());
        ob_end_clean();
        $content['code'] = "<pre><code class=\"$class language-$lang\">" .
            htmlspecialchars($content['result'], ENT_QUOTES, 'utf-8') .
        '</code></pre>';
        return $content;
	}

    #
    static function endWithResult($class, $lang='html')
    {
        $array = self::end($class, $lang);
        return $array['code'] . $array['result'];
	}

    #
    static function inc($file, $lang='html')
    {
        self::start();
            include $file;
        self::end(pathinfo($file, PATHINFO_FILENAME), $lang);
	}

    #
    static function incWithResult($file, $lang='html')
    {
        self::start();
            include $file;
        self::endWithResult(pathinfo($file, PATHINFO_FILENAME), $lang);
	}
}
