<?php
/**
 * Functions
 */

// Composer dependencies
require_once('vendor/autoload.php');
$timber = new \Timber\Timber();

if (!class_exists('Timber')){
  add_action( 'admin_notices', function(){
    echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . admin_url('plugins.php#timber') . '">' . admin_url('plugins.php') . '</a></p></div>';
  });
  return;
}

// DEVELOPMENT :: Hide Admin Bar
add_filter('show_admin_bar', '__return_false');

// DEVELOPMENT :: Live Reload
function register_livereload() {
  if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
    wp_register_script('livereload', 'http://localhost:42526/livereload.js?snipver=1', null, false, true);
  }
}

// API
// Add ACF info to the WP JSON API response
// Source: https://gist.github.com/rileypaulsen/9b4505cdd0ac88d5ef51
function wp_api_encode_acf($data,$post,$context){
  $data['meta'] = array_merge($data['meta'],get_fields($post['ID']));
  return $data;
}
if( function_exists('get_fields') ){
  add_filter('json_prepare_post', 'wp_api_encode_acf', 10, 3);
}


// ROUTER
require_once( 'functions/router.php' );

// BASE
require_once( 'classes/class.TimjackRouter.php' );

// CUSTOM FUNCTIONS
require_once( 'functions/filter.gallery.php' );

class StarterSite extends TimberSite {

  function __construct(){

    // + Theme Support
    add_theme_support('post-formats');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
    // add_theme_support( 'post-formats', array( 'link', 'gallery', 'video' ) );

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
    $context['environment'] = "production";

    // Defining the theme's public folder
    $context['site']->theme->public = $context['site']->theme->uri . "/public";
    $context['site']->theme->images = $context['site']->theme->public . "/images";

    $context['site']->ENV = "production";
    if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
      $context['site']->ENV = "development";
      $context['environment'] = "development";
    }

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
