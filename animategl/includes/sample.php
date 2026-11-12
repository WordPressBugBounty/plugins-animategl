<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// The sample page: a draft page with one block of each kind, each saying what it does and where its settings are.
// The Home tab's "Create a sample page" button posts to admin-post.php; the page opens in the block editor. Its
// block markup must match what the editor saves (src/classes.js and the filters on animategl.classes), or the
// editor shows the blocks as invalid: the WordPress test checks that.
class AnimateGL_Sample
{
	const OPTION = 'animategl_sample_page';

	public function __construct()
	{
		add_action('admin_post_animategl_sample_page', array($this, 'create'));
	}

	// The sample page made earlier, while it's still there and not in the trash
	public static function page_id()
	{
		$id = (int) get_option(self::OPTION);
		if (!$id) {
			return 0;
		}
		$status = get_post_status($id);
		return $status && 'trash' !== $status && 'page' === get_post_type($id) ? $id : 0;
	}

	public static function can_create()
	{
		return current_user_can('edit_pages');
	}

	public function create()
	{
		if (!self::can_create()) {
			wp_die(esc_html__('You are not allowed to create pages.', 'animategl'), 403);
		}
		check_admin_referer('animategl_sample_page');

		$id = self::page_id();
		if (!$id) {
			$id = wp_insert_post(array(
				'post_type' => 'page',
				'post_status' => 'draft',
				'post_title' => __('AnimateGL sample', 'animategl'),
				'post_content' => self::content(),
			), true);
			if (is_wp_error($id)) {
				wp_die(esc_html($id->get_error_message()));
			}
			update_option(self::OPTION, $id, false);
		}

		wp_safe_redirect(admin_url('post.php?post=' . $id . '&action=edit'));
		exit;
	}

	private static function content()
	{
		$t = array(
			'title' => esc_html__('Every block on this page is animated', 'animategl'),
			'intro' => esc_html__('Click a block, then look at the AnimateGL panel in the settings sidebar on the right (or the AnimateGL button in the block toolbar). Change the animation and click Preview animation to see it here. To see the animations as visitors do, preview the page and scroll down: each block plays when it scrolls into view.', 'animategl'),
			'css' => esc_html__('A CSS animation: Slide, from the left', 'animategl'),
			'css_text' => esc_html__('CSS animations are light and work on any block: text, buttons, columns and whole sections. This heading slides in, and this paragraph fades in 300 ms later.', 'animategl'),
			'delay' => esc_html__('Delay: blocks one after another', 'animategl'),
			'first' => esc_html__('First', 'animategl'),
			'second' => esc_html__('200 ms later', 'animategl'),
			'third' => esc_html__('400 ms later', 'animategl'),
			'delay_text' => esc_html__('Give the blocks in a row a longer delay each, and they come in one after another.', 'animategl'),
			'webgl' => esc_html__('A WebGL animation: Flip', 'animategl'),
			'webgl_text' => esc_html__('WebGL animations bend, flip and peel a block in 3D, which CSS can’t do. They work on any block and look best on images. This box flips up as it scrolls into view.', 'animategl'),
			'text' => esc_html__('Text effects', 'animategl'),
			'typewriter' => esc_html__('The typewriter types this sentence out a letter at a time.', 'animategl'),
			'count' => esc_html__('Count-up numbers: 1,250 customers in 48 countries.', 'animategl'),
			'hover' => esc_html__('Hover effects', 'animategl'),
			'hover_text' => esc_html__('Move the mouse over this box: it lifts. Lift, Grow and Tilt are under Scroll and hover effects in the AnimateGL panel.', 'animategl'),
			'end' => esc_html__('Your turn', 'animategl'),
			'end_text' => esc_html__('Select a block on any of your pages, open AnimateGL and pick an entrance animation. This page is a draft, so visitors don’t see it: delete it when you’re done.', 'animategl'),
		);

		$box = '"style":{"color":{"background":"#4b32c3","text":"#ffffff"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"32px","right":"32px"}}}';
		$box_attrs = 'has-text-color has-background';
		$box_style = 'color:#ffffff;background-color:#4b32c3;padding-top:40px;padding-right:32px;padding-bottom:40px;padding-left:32px';

		return <<<HTML
<!-- wp:heading {"level":1,"aglInName":"fadeCSS","aglInDirection":"Up"} -->
<h1 class="wp-block-heading agl agl-fadeCSSUp">{$t['title']}</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"aglInName":"fadeCSS","aglInDelay":300} -->
<p class="agl agl-fadeCSS agl-in-delay-300">{$t['intro']}</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"30vh"} -->
<div style="height:30vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"aglInName":"slideCSS","aglInDirection":"Left"} -->
<h2 class="wp-block-heading agl agl-slideCSSLeft">{$t['css']}</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"aglInName":"fadeCSS","aglInDelay":300} -->
<p class="agl agl-fadeCSS agl-in-delay-300">{$t['css_text']}</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"20vh"} -->
<div style="height:20vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"aglInName":"fadeCSS","aglInDirection":"Up"} -->
<h2 class="wp-block-heading agl agl-fadeCSSUp">{$t['delay']}</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>{$t['delay_text']}</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3,"aglInName":"zoomInCSS"} -->
<h3 class="wp-block-heading agl agl-zoomInCSS">{$t['first']}</h3>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3,"aglInName":"zoomInCSS","aglInDelay":200} -->
<h3 class="wp-block-heading agl agl-zoomInCSS agl-in-delay-200">{$t['second']}</h3>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3,"aglInName":"zoomInCSS","aglInDelay":400} -->
<h3 class="wp-block-heading agl agl-zoomInCSS agl-in-delay-400">{$t['third']}</h3>
<!-- /wp:heading --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"20vh"} -->
<div style="height:20vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {{$box},"layout":{"type":"constrained"},"aglInName":"flip","aglInDirection":"Up","aglInDuration":1500} -->
<div class="wp-block-group {$box_attrs} agl agl-flipUp agl-in-duration-1500" style="{$box_style}"><!-- wp:heading -->
<h2 class="wp-block-heading">{$t['webgl']}</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>{$t['webgl_text']}</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"20vh"} -->
<div style="height:20vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"aglInName":"fadeCSS","aglInDirection":"Up"} -->
<h2 class="wp-block-heading agl agl-fadeCSSUp">{$t['text']}</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"aglTypewriter":true} -->
<p class="agl-typewriter">{$t['typewriter']}</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"aglCount":true} -->
<p class="agl-count">{$t['count']}</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"20vh"} -->
<div style="height:20vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"aglInName":"fadeCSS","aglInDirection":"Up"} -->
<h2 class="wp-block-heading agl agl-fadeCSSUp">{$t['hover']}</h2>
<!-- /wp:heading -->

<!-- wp:group {{$box},"layout":{"type":"constrained"},"aglHover":"lift"} -->
<div class="wp-block-group {$box_attrs} agl-hover-lift" style="{$box_style}"><!-- wp:paragraph -->
<p>{$t['hover_text']}</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"20vh"} -->
<div style="height:20vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"aglInName":"fadeCSS","aglInDirection":"Up"} -->
<h2 class="wp-block-heading agl agl-fadeCSSUp">{$t['end']}</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"aglInName":"fadeCSS","aglInDelay":200} -->
<p class="agl agl-fadeCSS agl-in-delay-200">{$t['end_text']}</p>
<!-- /wp:paragraph -->
HTML;
	}
}
