<?php

use Elementor\Modules\AtomicWidgets\Controls\Section;
use Elementor\Modules\AtomicWidgets\Controls\Types\Image_Control;
use Elementor\Modules\AtomicWidgets\Controls\Types\Number_Control;
use Elementor\Modules\AtomicWidgets\Controls\Types\Select_Control;
use Elementor\Modules\AtomicWidgets\Controls\Types\Switch_Control;
use Elementor\Modules\AtomicWidgets\Controls\Types\Text_Control;
use Elementor\Modules\AtomicWidgets\PropDependencies\Manager as Dependency_Manager;
use Elementor\Modules\AtomicWidgets\PropTypes\Image_Prop_Type;
use Elementor\Modules\AtomicWidgets\PropTypes\Primitives\Boolean_Prop_Type;
use Elementor\Modules\AtomicWidgets\PropTypes\Primitives\Number_Prop_Type;
use Elementor\Modules\AtomicWidgets\PropTypes\Primitives\String_Prop_Type;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// Elementor 4's atomic elements (Div block, Flexbox, Heading, Paragraph, Image, …), on by default for sites
// installed with Elementor 4.0 or later. They have no Motion Effects section, so el.php's controls never reach
// them. Here the same controls, the ones el.php adds and the ones added on animategl_elementor_controls, are
// read once and turned into atomic props and controls, and on the page the same element_classes() (with
// animategl_elementor_classes) runs on a stand-in for the element, whose classes and attributes are added
// to its first tag.
class AnimateGL_El_Atomic
{
	private $el;
	private $controls;
	private $stack = array();

	public function __construct($el)
	{
		$this->el = $el;
		add_filter('elementor/atomic-widgets/props-schema', array($this, 'props_schema'));
		add_filter('elementor/atomic-widgets/controls', array($this, 'controls'), 10, 2);
		add_action('elementor/frontend/before_render', array($this, 'before_render'));
		add_action('elementor/frontend/after_render', array($this, 'after_render'));
	}

	// The entrance presets for the atomic panel's select, which can't be filled in the browser as el-editor.js
	// does for the classic panel. Add-ons add theirs with animategl_elementor_entrance_options.
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

	// name => the classic control's arguments, as el.php's add_section() adds them
	public function recorded()
	{
		if (null === $this->controls) {
			$recorder = new AnimateGL_El_Atomic_Recorder();
			$this->el->add_section($recorder);
			$this->controls = $recorder->controls;
			$this->controls['agl_in_name']['options'] = array();
			foreach (self::entrance_options() as $option) {
				$this->controls['agl_in_name']['options'][$option['value']] = $option['label'];
			}
		}
		return $this->controls;
	}

	public function props_schema($schema)
	{
		foreach ($this->recorded() as $name => $args) {
			if (isset($schema[$name])) {
				continue;
			}
			$prop = $this->prop($args);
			if (!$prop) {
				continue;
			}
			$dependencies = $this->dependencies(isset($args['condition']) ? $args['condition'] : array());
			if ($dependencies) {
				$prop->set_dependencies($dependencies);
			}
			$schema[$name] = $prop;
		}
		return $schema;
	}

	private function prop($args)
	{
		$default = isset($args['default']) ? $args['default'] : null;
		switch (isset($args['type']) ? $args['type'] : '') {
			case 'select':
			case 'text':
			case 'color':
				return String_Prop_Type::make()->default((string) $default);
			case 'slider':
				return Number_Prop_Type::make()->default(is_array($default) && isset($default['size']) ? $default['size'] + 0 : 0);
			case 'number':
				return Number_Prop_Type::make()->default(is_numeric($default) ? $default + 0 : 0);
			case 'switcher':
				return Boolean_Prop_Type::make()->default('yes' === $default);
			case 'media':
				return Image_Prop_Type::make();
		}
		return null;
	}

	// A classic condition (array('agl_in_name!' => '', 'agl_hover' => array(…))) as a prop dependency that
	// hides the control
	private function dependencies($condition)
	{
		if (!$condition) {
			return null;
		}
		$manager = Dependency_Manager::make(Dependency_Manager::RELATION_AND);
		foreach ($condition as $key => $value) {
			$not = '!' === substr($key, -1);
			$name = rtrim($key, '!');
			if (is_array($value)) {
				$operator = $not ? 'nin' : 'in';
			} else {
				$operator = $not ? 'ne' : 'eq';
			}
			// Not set at all counts as empty: "not empty" needs a value
			if ($not && '' === $value) {
				$manager->where(array('operator' => 'exists', 'path' => array($name), 'effect' => 'hide'));
			}
			$manager->where(array('operator' => $operator, 'path' => array($name), 'value' => $value, 'effect' => 'hide'));
		}
		return $manager->get();
	}

	public function controls($controls, $element)
	{
		$items = array();
		$schema = $element::get_props_schema();
		$element_name = preg_replace('/^e-/', '', (string) $element->get_name());
		foreach ($this->recorded() as $name => $args) {
			if (!isset($schema[$name])) {
				continue;
			}
			// Controls for some elements only, by name without the e- prefix (agl_elements)
			if (isset($args['agl_elements']) && !in_array($element_name, (array) $args['agl_elements'], true)) {
				continue;
			}
			$control = $this->control($name, $args);
			if (!$control) {
				continue;
			}
			if (!empty($args['label'])) {
				$control->set_label((string) $args['label']);
			}
			if (!empty($args['description'])) {
				$control->set_description(wp_strip_all_tags((string) $args['description']));
			}
			$items[] = $control;
		}
		if ($items) {
			$controls[] = Section::make()
				->set_label('AnimateGL')
				->set_id('animategl')
				->set_items($items);
		}
		return $controls;
	}

	private function control($name, $args)
	{
		switch (isset($args['type']) ? $args['type'] : '') {
			case 'select':
				$options = array();
				foreach (isset($args['options']) ? $args['options'] : array() as $value => $label) {
					$options[] = array('value' => (string) $value, 'label' => (string) $label);
				}
				return Select_Control::bind_to($name)->set_options($options);
			case 'text':
			// No colour control for atomic props: a CSS colour typed in
			case 'color':
				return Text_Control::bind_to($name);
			case 'slider':
				$control = Number_Control::bind_to($name);
				$range = isset($args['range']) && is_array($args['range']) ? reset($args['range']) : array();
				if (isset($range['min'])) {
					$control->set_min((int) $range['min']);
				}
				if (isset($range['max'])) {
					$control->set_max((int) $range['max']);
				}
				if (isset($range['step']) && (int) $range['step'] == $range['step']) {
					$control->set_step((int) $range['step']);
				}
				return $control;
			case 'number':
				return Number_Control::bind_to($name);
			case 'switcher':
				return Switch_Control::bind_to($name);
			case 'media':
				return Image_Control::bind_to($name);
		}
		return null;
	}

	private static function is_atomic($element)
	{
		return is_object($element) && method_exists($element, 'get_atomic_settings');
	}

	// Elements nest (a Flexbox prints its children inside its own output), so each one's output is caught on a
	// stack and given its classes when it ends
	public function before_render($element)
	{
		if (!self::is_atomic($element)) {
			return;
		}
		$item = null;
		try {
			$stand_in = new AnimateGL_El_Atomic_Element($element, $element->get_atomic_settings(), $this->recorded());
			$classes = $this->el->element_classes($stand_in);
			if ($classes || $stand_in->attributes) {
				$item = array('classes' => $classes, 'attributes' => $stand_in->attributes);
				ob_start();
			}
		} catch (\Throwable $e) {
			$item = null;
		}
		$this->stack[] = $item;
	}

	public function after_render($element)
	{
		if (!self::is_atomic($element) || !$this->stack) {
			return;
		}
		$item = array_pop($this->stack);
		if (!$item) {
			return;
		}
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's own escaped output, with escaped attributes added
		echo self::add_to_first_tag((string) ob_get_clean(), $item['classes'], $item['attributes']);
	}

	public static function add_to_first_tag($html, $classes, $attributes)
	{
		if (!preg_match('/<([a-zA-Z][a-zA-Z0-9-]*)(\s[^>]*)?>/', $html, $match, PREG_OFFSET_CAPTURE)) {
			return $html;
		}
		$tag = $match[0][0];
		$new = $tag;
		if ($classes) {
			if (preg_match('/\sclass="([^"]*)"/', $new)) {
				$new = preg_replace_callback('/(\sclass=")([^"]*)(")/', function ($m) use ($classes) {
					return $m[1] . trim($m[2] . ' ' . esc_attr($classes)) . $m[3];
				}, $new, 1);
			} else {
				$attributes = array('class' => $classes) + $attributes;
			}
		}
		// Custom properties go after the element's own style
		if (isset($attributes['style']) && preg_match('/\sstyle="([^"]*)"/', $new)) {
			$style = $attributes['style'];
			$new = preg_replace_callback('/(\sstyle=")([^"]*)(")/', function ($m) use ($style) {
				return $m[1] . rtrim(trim($m[2]), ';') . ';' . esc_attr($style) . $m[3];
			}, $new, 1);
			unset($attributes['style']);
		}
		$extra = '';
		foreach ($attributes as $name => $value) {
			if (preg_match('/^[a-z][a-z0-9_-]*$/', $name) && !preg_match('/\s' . preg_quote($name, '/') . '=/', $new)) {
				$extra .= ' ' . $name . '="' . esc_attr($value) . '"';
			}
		}
		$new = preg_replace('/(\/?>)$/', $extra . '$1', $new, 1);
		return substr_replace($html, $new, $match[0][1], strlen($tag));
	}
}

// Takes the controls el.php's add_section() adds, without an element
class AnimateGL_El_Atomic_Recorder
{
	public $controls = array();

	public function add_control($name, $args)
	{
		$this->controls[$name] = $args;
	}

	public function get_name()
	{
		return '';
	}

	public function __call($method, $args)
	{
		return null;
	}
}

// An atomic element as element_classes() and the animategl_elementor_classes filters expect a classic one: its
// settings in the classic shapes (a slider is array('size' => …), a switcher 'yes', a media control
// array('url' => …)), its name without the e- prefix (e-image is image), and its render attributes for '_wrapper'.
class AnimateGL_El_Atomic_Element
{
	private $element;
	private $settings;
	private $controls;
	public $attributes = array();

	public function __construct($element, $settings, $controls)
	{
		$this->element = $element;
		$this->settings = is_array($settings) ? $settings : array();
		$this->controls = $controls;
	}

	public function get_settings($key = null)
	{
		if (null === $key || !isset($this->controls[$key])) {
			return null;
		}
		$args = $this->controls[$key];
		$type = isset($args['type']) ? $args['type'] : '';
		$value = isset($this->settings[$key]) ? $this->settings[$key] : null;
		switch ($type) {
			case 'slider':
				$default = isset($args['default']) && is_array($args['default']) ? $args['default'] : array();
				if (!is_numeric($value)) {
					return $default ?: null;
				}
				return array('unit' => isset($default['unit']) ? $default['unit'] : '', 'size' => $value + 0);
			case 'switcher':
				if (null === $value) {
					return isset($args['default']) ? $args['default'] : '';
				}
				return $value ? 'yes' : '';
			case 'media':
				$url = is_array($value) && isset($value['src']) && is_string($value['src']) ? $value['src'] : '';
				return array('url' => $url);
		}
		if (null === $value || is_array($value)) {
			return isset($args['default']) && !is_array($args['default']) ? $args['default'] : null;
		}
		return $value;
	}

	public function get_name()
	{
		return preg_replace('/^e-/', '', (string) $this->element->get_name());
	}

	public function get_id()
	{
		return $this->element->get_id();
	}

	public function add_render_attribute($element, $key = null, $value = null)
	{
		if ('_wrapper' !== $element) {
			return $this;
		}
		$attributes = is_array($key) ? $key : array($key => $value);
		foreach ($attributes as $name => $attribute) {
			if ('class' === $name) {
				continue; // element_classes() returns those
			}
			$this->attributes[(string) $name] = is_array($attribute) ? implode(' ', $attribute) : (string) $attribute;
		}
		return $this;
	}
}
