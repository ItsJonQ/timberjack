<?php
/**
 * Template :: Single
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;
$data['comment_form'] = TimberHelper::get_comment_form();

if (post_password_required($post->ID)){
  Timber::render('single-password.twig', $data);
} else {
  Timber::render(array('single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig'), $data);
}
