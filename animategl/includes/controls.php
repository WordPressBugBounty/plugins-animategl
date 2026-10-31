<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// AnimateGL's controls for page builders, described once: el.php builds Elementor's classic panel from them,
// el-atomic.php the panel of its atomic elements, bricks.php the Bricks builder's and divi.php Divi 5's. Each control is
// name => array(
//   'type'        => select, switch, range, number, text, color or image
//   'label', 'description'
//   'options'     => array(value => label), for select
//   'default'     => a string, true or false, or a number
//   'min', 'max', 'step', and 'unit' for range ('' shows none)
//   'condition'   => array('agl_in_name!' => '', 'agl_trigger' => array('click', 'hover')): shown when every
//                    setting is (or with ! isn't) the value, or one of the values
//   'elements'    => array('container', 'section'): only on these elements, by the builder's name for them
//   'elementor'   => arguments for Elementor's classic control, over the ones made from the rest
//   'bricks'      => arguments for the Bricks control, over the ones made from the rest
//   'divi'        => arguments for the Divi 5 field, over the ones made from the rest
// ). Add-ons add theirs with the animategl_controls filter, in the order they're shown, and turn an element's
// settings into classes with animategl_control_classes. A builder reads the settings into AnimateGL_Control_Values,
// whose values have one shape whatever the builder saves (a range is a number, a switch true or false, an image
// its URL), and adds the classes and attributes from AnimateGL_Controls::classes() to the element.
class AnimateGL_Controls
{
	private static $controls;

	// The entrance animations: None, Default and the core's presets. Add-ons add theirs with
	// animategl_elementor_entrance_options. Elementor's classic panel lists the runtime's presets instead
	// (js/el-editor.js).
	public static function entrance_options()
	{
		$css = __('CSS', 'animategl');
		$webgl = __('WebGL', 'animategl');
		$options = array(
			array('value' => '', 'label' => __('None', 'animategl')),
			array('value' => 'custom', 'label' => __('Default', 'animategl')),
			array('value' => 'fadeCSS', 'label' => __('Fade', 'animategl') . ' (' . $css . ')'),
			array('value' => 'zoomInCSS', 'label' => __('Zoom In', 'animategl') . ' (' . $css . ')'),
			array('value' => 'zoomOutCSS', 'label' => __('Zoom Out', 'animategl') . ' (' . $css . ')'),
			array('value' => 'wipeCSS', 'label' => __('Wipe', 'animategl') . ' (' . $css . ')'),
			array('value' => 'slideCSS', 'label' => __('Slide', 'animategl') . ' (' . $css . ')'),
			array('value' => 'blurCSS', 'label' => __('Blur', 'animategl') . ' (' . $css . ')'),
			array('value' => 'focusCSS', 'label' => __('Focus', 'animategl') . ' (' . $css . ')'),
			array('value' => 'flipCSS', 'label' => __('Flip', 'animategl') . ' (' . $css . ')'),
			array('value' => 'foldCSS', 'label' => __('Fold', 'animategl') . ' (' . $css . ')'),
			array('value' => 'rotateCSS', 'label' => __('Rotate', 'animategl') . ' (' . $css . ')'),
			array('value' => 'rollCSS', 'label' => __('Roll', 'animategl') . ' (' . $css . ')'),
			array('value' => 'skewCSS', 'label' => __('Skew', 'animategl') . ' (' . $css . ')'),
			array('value' => 'popCSS', 'label' => __('Pop', 'animategl') . ' (' . $css . ')'),
			array('value' => 'fade', 'label' => __('Fade', 'animategl') . ' (' . $webgl . ')'),
			array('value' => 'flip', 'label' => __('Flip', 'animategl') . ' (' . $webgl . ')'),
			array('value' => 'slide', 'label' => __('Slide', 'animategl') . ' (' . $webgl . ')'),
			array('value' => 'stretch', 'label' => __('Stretch', 'animategl') . ' (' . $webgl . ')'),
			array('value' => 'bend', 'label' => __('Bend', 'animategl') . ' (' . $webgl . ')'),
			array('value' => 'peel', 'label' => __('Peel', 'animategl') . ' (' . $webgl . ')'),
			array('value' => 'zoomIn', 'label' => __('Zoom In', 'animategl') . ' (' . $webgl . ')'),
			array('value' => 'zoomOut', 'label' => __('Zoom Out', 'animategl') . ' (' . $webgl . ')'),
			array('value' => 'glitch', 'label' => __('Glitch', 'animategl') . ' (' . $webgl . ')'),
		);
		return apply_filters('animategl_elementor_entrance_options', $options);
	}

	// The entrance and its timing, lite's own controls
	private static function entrance()
	{
		$entrance = array();
		foreach (self::entrance_options() as $option) {
			$entrance[(string) $option['value']] = (string) $option['label'];
		}
		$animated = array('agl_in_name!' => '');
		// The classic panel's script reads these settings in the preview (js/el.js)
		$classic = array('frontend_available' => true);
		return array(
			'agl_in_name' => array(
				'type' => 'select',
				'label' => __('Entrance Animation', 'animategl'),
				'options' => $entrance,
				'default' => '',
				// js/el-editor.js fills it from the runtime's presets
				'elementor' => array('options' => array(), 'separator' => 'before') + $classic,
			),
			'agl_in_direction' => array(
				'type' => 'select',
				'label' => __('Direction', 'animategl'),
				// The classic panel fills it from the runtime's presets for the picked animation (el-editor.js); the
				// atomic panel (el-atomic.php) shows this list. Add-ons add their variants with this filter.
				'options' => apply_filters('animategl_elementor_direction_options', array(
					'' => __('Default', 'animategl'),
					'Left' => __('Left', 'animategl'),
					'Right' => __('Right', 'animategl'),
					'Up' => __('Up', 'animategl'),
					'Down' => __('Down', 'animategl'),
				)),
				'default' => '',
				'condition' => $animated,
				'elementor' => array('separator' => 'before') + $classic,
			),
			'agl_in_duration' => array(
				'type' => 'range',
				'label' => __('Duration', 'animategl'),
				'min' => 0,
				'max' => 3000,
				'step' => 100,
				'unit' => 'ms',
				'default' => 1000,
				'condition' => $animated,
				'elementor' => $classic,
			),
			'agl_in_delay' => array(
				'type' => 'range',
				'label' => __('Delay', 'animategl'),
				'min' => 0,
				'max' => 5000,
				'step' => 100,
				'unit' => 'ms',
				'default' => 0,
				'condition' => $animated,
				'elementor' => $classic,
			),
			'agl_in_distance' => array(
				'type' => 'range',
				'label' => __('Distance', 'animategl'),
				'min' => 0,
				'max' => 5,
				'step' => 0.01,
				'unit' => '',
				'default' => 1,
				'condition' => $animated,
				'elementor' => $classic,
			),
			'agl_in_repeat' => array(
				'type' => 'switch',
				'label' => __('Repeat', 'animategl'),
				'default' => false,
				'condition' => $animated,
				'elementor' => $classic,
			),
			'agl_in_lockToScrollbar' => array(
				'type' => 'switch',
				'label' => __('Lock to Scrollbar', 'animategl'),
				'default' => false,
				'condition' => $animated,
				'elementor' => $classic,
			),
			'agl_in_easing' => array(
				'type' => 'select',
				'label' => __('Easing', 'animategl'),
				'description' => __('A spring easing sets its own duration.', 'animategl'),
				'options' => array(
					'' => __('Default', 'animategl'),
					'linear' => __('Linear', 'animategl'),
					'easeOutSine' => __('easeOutSine', 'animategl'),
					'easeInSine' => __('easeInSine', 'animategl'),
					'easeInOutSine' => __('easeInOutSine', 'animategl'),
					'easeOutQuad' => __('easeOutQuad', 'animategl'),
					'easeInQuad' => __('easeInQuad', 'animategl'),
					'easeInOutQuad' => __('easeInOutQuad', 'animategl'),
					'easeOutCubic' => __('easeOutCubic', 'animategl'),
					'easeInCubic' => __('easeInCubic', 'animategl'),
					'easeInOutCubic' => __('easeInOutCubic', 'animategl'),
					'easeOutExpo' => __('easeOutExpo', 'animategl'),
					'easeInExpo' => __('easeInExpo', 'animategl'),
					'easeInOutExpo' => __('easeInOutExpo', 'animategl'),
					'easeOutBack' => __('easeOutBack', 'animategl'),
					'easeInOutBack' => __('easeInOutBack', 'animategl'),
					'easeInBack' => __('easeInBack', 'animategl'),
					'easeOutElastic' => __('easeOutElastic', 'animategl'),
					'easeOutBounce' => __('easeOutBounce', 'animategl'),
					'spring-soft' => __('Spring, soft', 'animategl'),
					'spring-bouncy' => __('Spring, bouncy', 'animategl'),
					'spring-stiff' => __('Spring, stiff', 'animategl'),
					'steps-5' => __('Steps, 5', 'animategl'),
					'steps-10' => __('Steps, 10', 'animategl'),
				),
				'default' => '',
				'condition' => $animated,
				'elementor' => array('separator' => 'before') + $classic,
			),
		);
	}

	// Every control, read once per request: lite's entrance, then the ones added on animategl_controls
	public static function all()
	{
		if (null === self::$controls) {
			$controls = (array) apply_filters('animategl_controls', self::entrance());
			self::$controls = array();
			foreach ($controls as $name => $control) {
				// Only the types every builder's code knows
				if (is_string($name) && is_array($control) && isset($control['type']) && in_array($control['type'], array('select', 'switch', 'range', 'number', 'text', 'color', 'image'), true)) {
					self::$controls[$name] = $control;
				}
			}
		}
		return self::$controls;
	}

	// The controls an element gets, by the builder's name for it
	public static function for_element($element)
	{
		return array_filter(self::all(), function ($control) use ($element) {
			return !isset($control['elements']) || in_array($element, (array) $control['elements'], true);
		});
	}

	// A setting as the control's values have it: a string, true or false, a number, or for an image its URL.
	// $value is the builder's, already unwrapped; null or a value of another kind gives the default.
	public static function value($control, $value)
	{
		$default = isset($control['default']) ? $control['default'] : null;
		switch ($control['type']) {
			case 'switch':
				return null === $value ? (bool) $default : (bool) $value;
			case 'range':
			case 'number':
				if (is_numeric($value)) {
					return $value + 0;
				}
				return is_numeric($default) ? $default + 0 : 0;
			case 'image':
				return is_string($value) ? $value : '';
		}
		if (is_string($value) || is_numeric($value)) {
			return (string) $value;
		}
		return is_string($default) ? $default : '';
	}

	// The entrance's classes, as js/el.js and src/classes.js make them
	private static function entrance_classes($values)
	{
		$name = $values->get('agl_in_name');
		// Settings end up in the class attribute, so accept only class-safe names and numbers
		if (!$name || !AnimateGL::is_class_token($name)) {
			return array();
		}
		$direction = $values->get('agl_in_direction');
		$classes = 'custom' == $name ? array('agl') : array('agl', 'agl-' . $name . (AnimateGL::is_class_token($direction) ? $direction : ''));
		$classes[] = 'agl-in-duration-' . $values->get('agl_in_duration');
		$classes[] = 'agl-in-delay-' . $values->get('agl_in_delay');
		$classes[] = 'agl-in-distance-' . $values->get('agl_in_distance');
		$easing = $values->get('agl_in_easing');
		if ($easing && AnimateGL::is_class_token($easing)) {
			$classes[] = 'agl-in-easing-' . $easing;
		}
		if ($values->get('agl_in_repeat')) {
			$classes[] = 'agl-in-repeat';
		}
		if ($values->get('agl_in_lockToScrollbar')) {
			$classes[] = 'agl-in-lockToScrollbar';
		}
		return $classes;
	}

	// An element's classes, from its values: the entrance's, then the ones added on animategl_control_classes.
	// Those can also give it attributes, with $values->add_attribute().
	public static function classes($values)
	{
		$classes = (array) apply_filters('animategl_control_classes', self::entrance_classes($values), $values);
		return array_values(array_filter(array_map('strval', $classes), 'strlen'));
	}
}

// An element's settings for the controls it has, as AnimateGL_Controls::value() gives them, its name and id in the
// builder, and the attributes animategl_control_classes filters give it
class AnimateGL_Control_Values
{
	private $values;
	private $element;
	private $id;
	public $attributes = array();

	// $values: name => value, as AnimateGL_Controls::value() gives it
	public function __construct($values, $element, $id)
	{
		$this->values = $values;
		$this->element = (string) $element;
		$this->id = (string) $id;
	}

	// The control's value, or null for a control the element doesn't have
	public function get($name)
	{
		return array_key_exists($name, $this->values) ? $this->values[$name] : null;
	}

	// The builder's name for the element, such as image or container
	public function element()
	{
		return $this->element;
	}

	// The builder's id for the element, stable while it's on the page
	public function id()
	{
		return $this->id;
	}

	// A style is added to the element's own
	public function add_attribute($name, $value)
	{
		$this->attributes[(string) $name] = (string) $value;
	}
}
