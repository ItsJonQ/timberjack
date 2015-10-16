<?php
/**
 * Template :: Single
 */

global $params;

$templates = array('single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig');

$data = Timber::get_context();

// Post
$post = new TimberPost();
$data['post'] = $post;
$data['comment_form'] = TimberHelper::get_comment_form();

// Show 404 if $data is empty
if(empty($data['posts'])) {
  $templates = array('404.twig');
}

// Extending $data with $params
$templates = TimjackRouter::templates($templates);
$data = TimjackRouter::data($data);

Timber::render($templates, $data);Timber::render(array('single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig'), $data);
