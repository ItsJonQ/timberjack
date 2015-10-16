<?php
/**
 * Template :: Search
 */

global $params;

$templates = array('search.twig', 'archive.twig', 'index.twig');

$data = Timber::get_context();

$data['posts'] = Timber::get_posts();
$data['pagination'] = Timber::get_pagination();

$data['title'] = 'Search results for '. get_search_query();

// Extending $data with $params
$templates = TimjackRouter::templates($templates);
$data = TimjackRouter::data($data);

Timber::render($templates, $data);
