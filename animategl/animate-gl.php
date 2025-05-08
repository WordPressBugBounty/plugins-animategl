<?php

/*
Plugin Name: AnimateGL 
Plugin URI: http://codecanyon.net/user/creativeinteractivemedia
Description: Advanced Animations and WebGL Effects Plugin
Version: 1.4.24
Author: creativeinteractivemedia
Author URI: http://codecanyon.net/user/creativeinteractivemedia
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: animate-gl
Domain Path: /languages
*/

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

define('ANIMATE_GL_VERSION', '1.4.24');
define('ANIMATE_GL_FILE', __FILE__);

if (! function_exists('animategl_fs')) {
	// Create a helper function for easy SDK access.
	function animategl_fs()
	{
		global $animategl_fs;

		if (! isset($animategl_fs)) {
			// Include Freemius SDK.
			require_once dirname(__FILE__) . '/vendor/freemius/start.php';
			$animategl_fs = fs_dynamic_init(array(
				'id'                  => '12162',
				'slug'                => 'animategl',
				'type'                => 'plugin',
				'public_key'          => 'pk_7dfb267d0e58a489655b90b56494e',
				'is_premium'          => false,
				'has_addons'          => false,
				'has_paid_plans'      => false,
				'menu'                => array(
					'slug'           => 'agl_admin',
					'account'        => false,
					'contact'        => false,
				),
			));
		}

		return $animategl_fs;
	}

	// Init Freemius.
	animategl_fs();
	// Signal that SDK was initiated.
	do_action('animategl_fs_loaded');
}

include_once(plugin_dir_path(ANIMATE_GL_FILE) . '/includes/main.php');

$animate_gl = AnimateGL::get_instance();
