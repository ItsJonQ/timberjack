<?php
/**
 * Template :: Search
 */

$templates = array('search.twig', 'archive.twig', 'index.twig');
$data = Timber::get_context();
$data['pagination'] = Lumberjack::get_pagination();

$data['title'] = 'Search results for '. get_search_query();
$data['posts'] = Timber::get_posts();

Timber::render($templates, $data);
