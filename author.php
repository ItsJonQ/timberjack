<?php
/**
 * Template :: Author
 */

global $wp_query;
global $params;

$templates = array('author.twig', 'archive.twig');

$data = Timber::get_context();

if (isset($wp_query->query_vars['author'])){
  $author = new TimberUser($wp_query->query_vars['author']);
  $data['author'] = $author;
  $data['title'] = 'Author Archives: ' . $author->name();
}

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