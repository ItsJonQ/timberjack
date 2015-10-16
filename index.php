<?php
/**
 * Template :: Index
 */

if (!class_exists('Timber')){
  echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
  return;
}

global $params;

$templates = array('index.twig');

if (is_home()){
  array_unshift($templates, 'home.twig');
}

$data = Timber::get_context();

// Posts
$data['posts'] = Timber::get_posts();
$data['pagination'] = Timber::get_pagination();

// Show 404 if $data is empty
if(empty($data['posts'])) {
  $templates = array('404.twig');
}

// Extending $data with $params
$templates = TimjackRouter::templates($templates);
$data = TimjackRouter::data($data);

Timber::render($templates, $data);