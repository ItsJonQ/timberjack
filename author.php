<?php
/**
 * Template :: Author
 */

global $wp_query;

$data = Timber::get_context();
$data['pagination'] = Timber::get_pagination();
$data['posts'] = Timber::get_posts();

if (isset($wp_query->query_vars['author'])){
  $author = new TimberUser($wp_query->query_vars['author']);
  $data['author'] = $author;
  $data['title'] = 'Author Archives: ' . $author->name();
}

Timber::render(array('author.twig', 'archive.twig'), $data);
