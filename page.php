<?php
/**
 * Template :: Page
 */

global $params;

$templates = array('page-' . $post->post_name . '.twig', 'page.twig');

$data = Timber::get_context();

// Posts
$post = new TimberPost();
$data['post'] = $post;

// Show 404 if $data is empty
if(empty($data['posts'])) {
  $templates = array('404.twig');
}

// Extending $data with $params
$templates = TimjackRouter::templates($templates);
$data = TimjackRouter::data($data);

Timber::render($templates, $data);