<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// Count-up numbers, which the core runs (js/count.js in the core): the block attribute and its class for dynamic
// blocks, and the page builder control (includes/controls.php). Same class as src/count.js. Lite and Pro both.
class AnimateGL_Count
{
	public function __construct()
	{
		add_filter('animategl_block_attributes', array($this, 'block_attributes'));
		// After the other classes, as src/count.js adds it
		add_filter('animategl_block_classes', array($this, 'block_classes'), 40, 2);
		add_filter('animategl_controls', array($this, 'controls'), 40);
		add_filter('animategl_control_classes', array($this, 'control_classes'), 40, 2);
	}

	public function block_attributes($attributes)
	{
		$attributes['aglCount'] = array('type' => 'boolean');
		return $attributes;
	}

	// Also without an animation
	public function block_classes($classes, $attrs)
	{
		if (!empty($attrs['aglCount'])) {
			$classes[] = 'agl-count';
		}
		return $classes;
	}

	public function controls($controls)
	{
		$controls['agl_count'] = array(
			'type' => 'switch',
			'label' => __('Count up the numbers', 'animategl'),
			'description' => __('Each number in the element counts up from 0 when it comes into view, or with its entrance, and ends as written: 1,250 or 98.6%. Visitors who prefer reduced motion see the numbers as written.', 'animategl'),
			'default' => false,
		);
		return $controls;
	}

	public function control_classes($classes, $values)
	{
		if ($values->get('agl_count')) {
			$classes[] = 'agl-count';
		}
		return $classes;
	}
}
