<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// The free hover and scroll effects: Lift, Grow, Tilt and Skew, which the core runs (js/motion.js in the core). Here:
// the block attributes and their classes for dynamic blocks, and the Elementor controls. Same classes as
// src/effects.js. Off when the animategl_core_effects filter says so: AnimateGL Pro adds the same attributes, classes
// and controls with its other effects.
class AnimateGL_Effects
{
	public static $hover = array('lift', 'grow', 'tilt');

	// The pages of animategl.com that show every effect live
	const HOVER_URL = 'https://animategl.com/hover-effects/';
	const SCROLL_URL = 'https://animategl.com/scroll-effects/';

	public function __construct()
	{
		add_filter('animategl_block_attributes', array($this, 'block_attributes'));
		// After the classes of other plugins, as src/effects.js adds them
		add_filter('animategl_block_classes', array($this, 'block_classes'), 35, 2);
		add_action('animategl_elementor_controls', array($this, 'elementor_controls'), 35);
		add_filter('animategl_elementor_classes', array($this, 'elementor_classes'), 35, 2);
	}

	private static function on()
	{
		return (bool) apply_filters('animategl_core_effects', true);
	}

	public function block_attributes($attributes)
	{
		$attributes['aglScroll'] = array('type' => 'string');
		$attributes['aglHover'] = array('type' => 'string');
		return $attributes;
	}

	// The scroll class first, then the hover class. Also without an animation.
	public static function classes($scroll, $hover)
	{
		$classes = array();
		if ('skew' === $scroll) {
			$classes[] = 'agl-scroll-skew';
		}
		if (in_array($hover, self::$hover, true)) {
			$classes[] = 'agl-hover-' . $hover;
		}
		return $classes;
	}

	public function block_classes($classes, $attrs)
	{
		if (!self::on()) {
			return $classes;
		}
		$scroll = isset($attrs['aglScroll']) ? $attrs['aglScroll'] : '';
		$hover = isset($attrs['aglHover']) ? $attrs['aglHover'] : '';
		return array_merge($classes, self::classes($scroll, $hover));
	}

	public function elementor_controls($element)
	{
		if (!self::on()) {
			return;
		}
		$element->add_control(
			'agl_scroll',
			array(
				'label' => __('While scrolling', 'animategl'),
				'description' => __('Leans with the scroll speed after the entrance. Works on any element. Off for visitors who prefer reduced motion.', 'animategl'),
				'type' => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => __('None', 'animategl'),
					'skew' => __('Skew', 'animategl'),
				),
				'default' => '',
				'render_type' => 'none',
			)
		);
		$element->add_control(
			'agl_hover',
			array(
				'label' => __('Hover effect', 'animategl'),
				'description' => __('While the mouse is over the element, after the entrance. Works on any element. Mouse only. Off for visitors who prefer reduced motion.', 'animategl'),
				'type' => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => __('None', 'animategl'),
					'lift' => __('Lift', 'animategl'),
					'grow' => __('Grow', 'animategl'),
					'tilt' => __('Tilt', 'animategl'),
				),
				'default' => '',
				'render_type' => 'none',
			)
		);
	}

	public function elementor_classes($classes, $element)
	{
		if (!self::on()) {
			return $classes;
		}
		$added = self::classes((string) $element->get_settings('agl_scroll'), (string) $element->get_settings('agl_hover'));
		return $added ? trim($classes . ' ' . implode(' ', $added)) : $classes;
	}
}
