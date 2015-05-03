<?php
/**
 * Functions
 */

if (!class_exists('Timber')){
  add_action( 'admin_notices', function(){
    echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . admin_url('plugins.php#timber') . '">' . admin_url('plugins.php') . '</a></p></div>';
  });
  return;
}

// DEVELOPMENT :: Hide Admin Bar
add_filter('show_admin_bar', '__return_false');

// DEVELOPMENT :: Live Reload
if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
  wp_register_script('livereload', 'http://localhost:42526/livereload.js?snipver=1', null, false, true);
  wp_enqueue_script('livereload');
}


// CUSTOM FUNCTIONS
require_once( 'functions/filter.gallery.php' );


class StarterSite extends TimberSite {

  function __construct(){

    // + Theme Support
    add_theme_support('post-formats');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');

    // + Filters
    add_filter('timber_context', array($this, 'add_to_context'));
    add_filter('get_twig', array($this, 'add_to_twig'));
    add_filter( 'post_gallery', 'filter_gallery', 10, 2);

    // +Enqueue
    add_action('wp_enqueue_scripts', array($this, 'deregister_scripts'));

    // + Init
    add_action('init', array($this, 'register_post_types'));
    add_action('init', array($this, 'register_taxonomies'));

    parent::__construct();
  }

  function register_post_types(){
    //this is where you can register custom post types
  }

  function register_taxonomies(){
    //this is where you can register custom taxonomies
  }

  function add_to_context($context){
    $context['menu'] = new TimberMenu();
    $context['site'] = $this;
    return $context;
  }

  function add_to_twig($twig){
    /* this is where you can add your own fuctions to twig */
    $twig->addExtension(new Twig_Extension_StringLoader());
    return $twig;
  }

  function deregister_scripts() {
    // Deregister jQuery if the page is not Admin
    if (!is_admin()) wp_deregister_script('jquery');
  }


}
// Initialize
new StarterSite();