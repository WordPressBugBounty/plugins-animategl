<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// The typewriter, which the core runs (js/typewriter.js in the core): the block attribute and its class for dynamic
// blocks, and the page builder control (includes/controls.php). Same class as src/typewriter.js. Lite and Pro both.
class AnimateGL_Typewriter
{
	public function __construct()
	{
		add_filter('animategl_block_attributes', array($this, 'block_attributes'));
		// After the other classes and count-up's, as src/typewriter.js adds it
		add_filter('animategl_block_classes', array($this, 'block_classes'), 41, 2);
		add_filter('animategl_controls', array($this, 'controls'), 41);
		add_filter('animategl_control_classes', array($this, 'control_classes'), 41, 2);
	}

	public function block_attributes($attributes)
	{
		$attributes['aglTypewriter'] = array('type' => 'boolean');
		return $attributes;
	}

	// Also without an animation
	public function block_classes($classes, $attrs)
	{
		if (!empty($attrs['aglTypewriter'])) {
			$classes[] = 'agl-typewriter';
		}
		return $classes;
	}

	public function controls($controls)
	{
		$controls['agl_typewriter'] = array(
			'type' => 'switch',
			'label' => __('Type out the text', 'animategl'),
			'description' => __('The text is typed a character at a time behind a caret when the element comes into view, or with its entrance. Not with count-up numbers on the same element. Visitors who prefer reduced motion see the text as written.', 'animategl'),
			'default' => false,
		);
		return $controls;
	}

	public function control_classes($classes, $values)
	{
		if ($values->get('agl_typewriter')) {
			$classes[] = 'agl-typewriter';
		}
		return $classes;
	}
}
