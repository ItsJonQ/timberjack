<?php
// Functions :: Filter -- Gallery

function filter_gallery( $string, $attr ) {
  // Defining images
  $output = [];
  // Getting the posts
  $posts = get_posts( array(
    'include' => $attr['ids'],
    'post_type' => 'attachment')
  );

  // Looping through the posts
  foreach( $posts as $post ) {
    // Getting the image
    $image = new TimberImage($post->ID);

    array_push( $output, $image );
  }

  return $output;
}