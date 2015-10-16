<?php

class TimjackRouter {

  public function data($data = array()) {
    global $params;

    if($params) {
      $data = array_merge($data, $params);
    }

    // Default title to the site's name
    if(!$data['wp_title']) {
      if($data['site']->name) {
        $data['wp_title'] = $data['site']->name;
      }
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