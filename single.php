<?php
/**
 * Template :: Single
 */

$context = Timber::get_context();
$post = new LumberPost();
$context['post'] = $post;
$context['wp_title'] .= ' - ' . $post->title();
$context['comment_form'] = TimberHelper::get_comment_form();

if (post_password_required($post->ID)){
  Timber::render('single-password.twig', $context);
} else {
  Timber::render(array('single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig'), $context);
}
