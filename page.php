<?php
/**
 * Template :: Page
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;
Timber::render(array('page-' . $post->post_name . '.twig', 'page.twig'), $data);