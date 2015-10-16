<?php
/**
 * Template :: Archive
 */

global $params;

$templates = array('archive.twig', 'index.twig');

$data = Timber::get_context();

$data['title'] = 'Archive';
if (is_day()){
  $data['title'] = 'Archive: '.get_the_date( 'D M Y' );
} else if (is_month()){
  $data['title'] = 'Archive: '.get_the_date( 'M Y' );
} else if (is_year()){
  $data['title'] = 'Archive: '.get_the_date( 'Y' );
} else if (is_tag()){
  $data['title'] = single_tag_title('', false);
} else if (is_category()){
  $data['title'] = single_cat_title('', false);
  array_unshift($templates, 'archive-'.get_query_var('cat').'.twig');
} else if (is_post_type_archive()){
  $data['title'] = post_type_archive_title('', false);
  array_unshift($templates, 'archive-'.get_post_type().'.twig');
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