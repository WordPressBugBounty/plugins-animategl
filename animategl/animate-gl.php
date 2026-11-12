<?php

/*
Plugin Name: AnimateGL – WebGL & CSS Scroll Animations and Hover Effects for Gutenberg and Elementor
Plugin URI: https://animategl.com/
Description: Scroll and entrance animations for Gutenberg blocks, Elementor and any element via CSS classes. CSS animations plus WebGL effects.
Version: 1.8.0
Requires at least: 6.6
Requires PHP: 7.4
Author: creativeinteractivemedia
Author URI: https://codecanyon.net/user/creativeinteractivemedia
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: animategl
*/

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// AnimateGL Pro is a separate plugin built from this plugin's code, with its own Freemius product.
// When it's already loaded, stop here: loading both would define the constants and classes twice.
// Pro switches this plugin off on its next page load (PLAN.md §6.3).
if (defined('ANIMATE_GL_VERSION')) {
	return;
}

define('ANIMATE_GL_VERSION', '1.8.0');
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
					// The opt-in shows only at its own URL (connect_url below), so the AnimateGL page opens on Home
					'override_exact' => true,
				),
			));
			// The opt-in's URL: the AnimateGL page with agl_optin=1, linked from Freemius's notice and the Plugins
			// screen's Opt In link
			$animategl_fs->add_filter('connect_url', function ($url) {
				return add_query_arg('agl_optin', '1', $url);
			});
			// Activating opens AnimateGL's Home (animategl_activation_redirect() below), not the opt-in
			$animategl_fs->add_filter('redirect_on_activation', '__return_false');
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

// After activating, open AnimateGL's Home (not on bulk or network activation, WP-CLI or a request without a page)
register_activation_hook(__FILE__, function () {
	set_transient('animategl_activation_redirect', 1, 60);
});
add_action('admin_init', 'animategl_activation_redirect');
function animategl_activation_redirect()
{
	if (!get_transient('animategl_activation_redirect')) {
		return;
	}
	delete_transient('animategl_activation_redirect');
	if (wp_doing_ajax() || is_network_admin() || isset($_GET['activate-multi']) || !current_user_can(AnimateGL::capability())) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- only read
		return;
	}
	wp_safe_redirect(admin_url('admin.php?page=agl_admin'));
	exit;
}
