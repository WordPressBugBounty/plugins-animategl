<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// The Bricks builder: an AnimateGL group in every element's Style tab, made from AnimateGL_Controls' controls
// (includes/controls.php) as el.php makes Elementor's, and their classes and attributes on the element's root tag
// on the page. Bricks doesn't run bricks/element/set_root_attributes in the builder, so elements don't animate (or
// hide) on its canvas: Preview shows them.
class AnimateGL_Bricks
{
	// Bricks' own elements, for a Bricks that hasn't listed its elements yet when the filters are added
	private static $element_names = array(
		'section', 'container', 'block', 'div', 'heading', 'text-basic', 'text', 'text-link', 'button', 'icon', 'image', 'video',
		'icon-box', 'list', 'logo', 'nav-menu', 'nav-nested', 'accordion', 'accordion-nested', 'tabs', 'tabs-nested',
		'slider', 'slider-nested', 'carousel', 'counter', 'countdown', 'progress-bar', 'pie-chart', 'pricing-tables',
		'testimonials', 'team-members', 'social-icons', 'map', 'form', 'code', 'shortcode', 'image-gallery', 'posts',
		'post-title', 'post-content', 'post-excerpt', 'divider', 'alert', 'animated-typing', 'dropdown', 'offcanvas',
	);

	public function __construct()
	{
		// Bricks lists its elements on init
		add_action('init', array($this, 'add_filters'), 99);
		add_filter('bricks/element/set_root_attributes', array($this, 'root_attributes'), 10, 2);
	}

	public function add_filters()
	{
		$names = self::$element_names;
		if (class_exists('\Bricks\Elements') && !empty(\Bricks\Elements::$elements) && is_array(\Bricks\Elements::$elements)) {
			$names = array_unique(array_merge($names, array_map('strval', array_keys(\Bricks\Elements::$elements))));
		}
		foreach ($names as $name) {
			add_filter('bricks/elements/' . $name . '/control_groups', array($this, 'control_groups'));
			add_filter('bricks/elements/' . $name . '/controls', function ($controls) use ($name) {
				return $this->controls($controls, $name);
			});
		}
	}

	public function control_groups($groups)
	{
		$groups['animategl'] = array(
			'tab' => 'style',
			'title' => 'AnimateGL',
		);
		return $groups;
	}

	public function controls($controls, $element)
	{
		foreach (AnimateGL_Controls::for_element($element) as $name => $control) {
			if (!isset($controls[$name])) {
				$controls[$name] = self::control_args($control);
			}
		}
		return $controls;
	}

	// A switch that's on by default is a select: Bricks drops an unticked checkbox from the settings, which can't be
	// told from a setting the element never had
	private static function select_switch($control)
	{
		return 'switch' === $control['type'] && !empty($control['default']);
	}

	// A Bricks control's arguments for one of AnimateGL_Controls'
	public static function control_args($control)
	{
		$args = array(
			'tab' => 'style',
			'group' => 'animategl',
			'label' => isset($control['label']) ? (string) $control['label'] : '',
		);
		if (!empty($control['description'])) {
			$args['description'] = wp_strip_all_tags((string) $control['description']);
		}
		$default = AnimateGL_Controls::value($control, null);
		switch ($control['type']) {
			case 'select':
				$args['type'] = 'select';
				$args['options'] = isset($control['options']) ? (array) $control['options'] : array();
				// An element added before AnimateGL has no setting: the default applies, so it's what the select shows
				if (isset($args['options'][$default]) && '' !== $args['options'][$default]) {
					$args['placeholder'] = $args['options'][$default];
				}
				if ('' !== $default) {
					$args['default'] = $default;
				}
				break;
			case 'switch':
				if (self::select_switch($control)) {
					$args['type'] = 'select';
					$args['options'] = array('on' => __('Yes', 'animategl'), 'off' => __('No', 'animategl'));
					$args['placeholder'] = __('Yes', 'animategl');
				} else {
					$args['type'] = 'checkbox';
				}
				break;
			case 'range':
			case 'number':
				$args['type'] = 'number';
				foreach (array('min', 'max', 'step') as $key) {
					if (isset($control[$key])) {
						$args[$key] = $control[$key];
					}
				}
				if (!empty($control['unit']) && false === strpos($args['label'], '(')) {
					$args['label'] .= ' (' . $control['unit'] . ')';
				}
				$args['placeholder'] = (string) $default;
				$args['default'] = $default;
				break;
			case 'text':
				$args['type'] = 'text';
				if ('' !== $default) {
					$args['default'] = $default;
				}
				break;
			case 'color':
				$args['type'] = 'color';
				break;
			case 'image':
				$args['type'] = 'image';
				break;
		}
		$condition = self::required(isset($control['condition']) ? $control['condition'] : array());
		if ($condition) {
			$args['required'] = $condition;
		}
		if (isset($control['bricks']) && is_array($control['bricks'])) {
			$args = $control['bricks'] + $args;
		}
		return $args;
	}

	// A condition (array('agl_in_name!' => '', 'agl_hover' => array(…))) as Bricks' required: every one must hold
	private static function required($condition)
	{
		$required = array();
		foreach ((array) $condition as $key => $value) {
			$not = '!' === substr($key, -1);
			$required[] = array(rtrim($key, '!'), $not ? '!=' : '=', $value);
		}
		return $required;
	}

	// A Bricks setting, unwrapped, as AnimateGL_Controls::value() takes it
	private static function setting($control, $settings, $name)
	{
		$value = array_key_exists($name, $settings) ? $settings[$name] : null;
		switch ($control['type']) {
			case 'switch':
				if (self::select_switch($control)) {
					return 'off' === $value ? false : true;
				}
				// An unticked checkbox isn't in the settings
				return !empty($value) && 'false' !== $value;
			case 'color':
				// Picked as hex, rgb or hsl, or a palette colour's CSS variable (raw)
				if (is_array($value)) {
					foreach (array('raw', 'rgb', 'hex', 'hsl') as $key) {
						if (!empty($value[$key]) && is_string($value[$key])) {
							return $value[$key];
						}
					}
					return '';
				}
				return $value;
			case 'image':
				if (is_array($value)) {
					if (!empty($value['url']) && is_string($value['url'])) {
						return $value['url'];
					}
					if (!empty($value['id']) && is_numeric($value['id'])) {
						return (string) wp_get_attachment_image_url((int) $value['id'], 'full');
					}
				}
				return '';
		}
		return '' === $value ? null : $value;
	}

	// The values of AnimateGL_Controls' controls in a Bricks element's settings
	public static function element_values($element)
	{
		$settings = isset($element->settings) && is_array($element->settings) ? $element->settings : array();
		$name = isset($element->name) ? (string) $element->name : '';
		$values = array();
		foreach (AnimateGL_Controls::for_element($name) as $key => $control) {
			$values[$key] = AnimateGL_Controls::value($control, self::setting($control, $settings, $key));
		}
		return new AnimateGL_Control_Values($values, $name, isset($element->id) ? $element->id : '');
	}

	public function root_attributes($attributes, $element)
	{
		if (!is_object($element) || !is_array($attributes)) {
			return $attributes;
		}
		$values = self::element_values($element);
		$classes = AnimateGL_Controls::classes($values);
		if ($classes) {
			$own = isset($attributes['class']) ? (array) $attributes['class'] : array();
			$attributes['class'] = array_values(array_unique(array_merge($own, $classes)));
		}
		foreach ($values->attributes as $name => $value) {
			if ('style' === $name && !empty($attributes['style'])) {
				$own = implode(' ', (array) $attributes['style']);
				$value = rtrim(trim($own), ';') . '; ' . $value;
			}
			$attributes[$name] = $value;
		}
		return $attributes;
	}
}
