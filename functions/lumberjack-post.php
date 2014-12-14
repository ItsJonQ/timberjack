<?php

class LumberjackPost extends LumberjackBase {

  public function get_category_meta() {
    global $post;

    $post_categories = wp_get_post_categories( $post->ID );

    if( !$post_categories ) {
      return null;
    }

    $categories = array();

    foreach( $post_categories as $cat ) {
      $cat = get_category( $cat );

        // Create a new category object
      $category = new stdClass();

        // Set category data
      $category->id = $cat->term_id;
      $category->name = $cat->name;
      $category->slug = $cat->slug;
      $category->link = get_category_link( $cat );

        // Push the category object to the categories array
      $categories[] = $category;
    }

    return $categories;
  }

  public function get_tag_meta() {
    global $post;

    $post_tags = get_the_tags( $post->ID );

    if( !$post_tags ) {
      return null;
    }

    $tags = array();

    foreach( $post_tags as $t ) {

        // Create a new tag object
      $tag = new stdClass();

        // Set tag data
      $tag->id = $t->term_id;
      $tag->name = $t->name;
      $tag->slug = $t->slug;
      $tag->link = get_tag_link( $t->term_id );

        // Push the tag object to the tags array
      $tags[] = $tag;

    }

    return $tags;
  }

  public function set_category() {
    $category = self::get_category_meta();

    $this->category = $category;

    return $category;
  }

  public function set_tags() {
    $tags = self::get_tag_meta();

    $this->tags = $tags;

    return $tags;
  }

    // Initializing the model
  public function __construct() {

    parent::__construct();

    self::set_category();
    self::set_tags();

  }
}