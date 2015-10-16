<?php

class TimjackRouter {

  public function data($data = array()) {
    global $params;

    if($params) {
      $data = array_merge($data, $params);
    }

    return $data;
  }

  public function query($query = array()) {
    global $wp_query;

    if(!is_array($query)) {
      return $wp_query;
    }

    $query = array_merge($wp_query->query_vars, $query);

    return $query;
  }

  public function templates($templates = array()) {
    global $params;

    if($params['template']) {
      $templates = array_unshift($templates, $params['template']);
    }

    return $templates;
  }

  public static function _construct() {

  }
}
?>