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
// them. Here AnimateGL_Controls' controls (includes/controls.php) become atomic props and controls, as el.php makes
// classic controls of them, and so do the classic controls added on animategl_elementor_controls. On the page, the
// element's settings become AnimateGL_Control_Values for AnimateGL_Controls::classes(), and a stand-in for the
// element for animategl_elementor_classes; the classes and attributes are added to its first tag.
class AnimateGL_El_Atomic
{
	private $legacy;
	private $recorded;
	private $stack = array();

	public function __construct()
	{
		add_filter('elementor/atomic-widgets/props-schema', array($this, 'props_schema'));
		add_filter('elementor/atomic-widgets/controls', array($this, 'controls'), 10, 2);
		add_action('elementor/frontend/before_render', array($this, 'before_render'));
		add_action('elementor/frontend/after_render', array($this, 'after_render'));
	}

	// Kept for add-ons that called it: the list is AnimateGL_Controls' now
	public static function entrance_options()
	{
		return AnimateGL_Controls::entrance_options();
	}

	// name => the classic control's arguments, for the controls added on animategl_elementor_controls
	private function legacy()
	{
		if (null === $this->legacy) {
			$recorder = new AnimateGL_El_Atomic_Recorder();
			do_action('animategl_elementor_controls', $recorder);
			$this->legacy = array_diff_key($recorder->controls, AnimateGL_Controls::all());
		}
		return $this->legacy;
	}

	// name => control, as AnimateGL_Controls has them: its own, then the classic ones added on
	// animategl_elementor_controls
	public function all()
	{
		$controls = AnimateGL_Controls::all();
		foreach ($this->legacy() as $name => $args) {
			$control = self::from_classic($args);
			if ($control) {
				$controls[$name] = $control;
			}
		}
		return $controls;
	}

	// name => the classic control's arguments, for the stand-in: AnimateGL_Controls' as el.php adds them, and the
	// ones added on animategl_elementor_controls
	public function recorded()
	{
		if (null === $this->recorded) {
			$this->recorded = array_map(array('AnimateGL_El', 'control_args'), AnimateGL_Controls::all()) + $this->legacy();
		}
		return $this->recorded;
	}

	// A classic control's arguments as an AnimateGL_Controls control, or null for a type with no atomic control.
	// agl_elements: the elements that get it, by name without the e- prefix.
	private static function from_classic($args)
	{
		$types = array('select' => 'select', 'switcher' => 'switch', 'slider' => 'range', 'number' => 'number', 'text' => 'text', 'color' => 'color', 'media' => 'image');
		$type = isset($args['type']) && isset($types[$args['type']]) ? $types[$args['type']] : '';
		if (!$type) {
			return null;
		}
		$control = array('type' => $type) + array_intersect_key($args, array('label' => 0, 'description' => 0, 'options' => 0, 'condition' => 0, 'min' => 0, 'max' => 0, 'step' => 0));
		if (isset($args['agl_elements'])) {
			$control['elements'] = (array) $args['agl_elements'];
		}
		$default = isset($args['default']) ? $args['default'] : null;
		if ('switch' === $type) {
			$control['default'] = 'yes' === $default;
		} elseif ('range' === $type) {
			$control = array_intersect_key(isset($args['range']) && is_array($args['range']) ? (array) reset($args['range']) : array(), array('min' => 0, 'max' => 0, 'step' => 0)) + $control;
			$control['default'] = is_array($default) && isset($default['size']) ? $default['size'] : 0;
		} elseif (null !== $default) {
			$control['default'] = $default;
		}
		return $control;
	}

	public function props_schema($schema)
	{
		foreach ($this->all() as $name => $control) {
			if (isset($schema[$name])) {
				continue;
			}
			$prop = $this->prop($control);
			$dependencies = $this->dependencies(isset($control['condition']) ? $control['condition'] : array());
			if ($dependencies) {
				$prop->set_dependencies($dependencies);
			}
			$schema[$name] = $prop;
		}
		return $schema;
	}

	private function prop($control)
	{
		$default = AnimateGL_Controls::value($control, null);
		switch ($control['type']) {
			case 'switch':
				return Boolean_Prop_Type::make()->default($default);
			case 'range':
			case 'number':
				return Number_Prop_Type::make()->default($default);
			case 'image':
				return Image_Prop_Type::make();
		}
		return String_Prop_Type::make()->default($default);
	}

	// A condition (array('agl_in_name!' => '', 'agl_hover' => array(…))) as a prop dependency that hides the control
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

	// The element's name without the e- prefix (e-image is image)
	private static function element_name($element)
	{
		return preg_replace('/^e-/', '', (string) $element->get_name());
	}

	// The controls an element gets
	private function for_element($element_name)
	{
		return array_filter($this->all(), function ($control) use ($element_name) {
			return !isset($control['elements']) || in_array($element_name, (array) $control['elements'], true);
		});
	}

	public function controls($controls, $element)
	{
		$items = array();
		$schema = $element::get_props_schema();
		foreach ($this->for_element(self::element_name($element)) as $name => $control) {
			if (!isset($schema[$name])) {
				continue;
			}
			$item = $this->control($name, $control);
			if (!empty($control['label'])) {
				$item->set_label((string) $control['label']);
			}
			if (!empty($control['description'])) {
				$item->set_description(wp_strip_all_tags((string) $control['description']));
			}
			$items[] = $item;
		}
		if ($items) {
			$controls[] = Section::make()
				->set_label('AnimateGL')
				->set_id('animategl')
				->set_items($items);
		}
		return $controls;
	}

	private function control($name, $control)
	{
		switch ($control['type']) {
			case 'select':
				$options = array();
				foreach (isset($control['options']) ? $control['options'] : array() as $value => $label) {
					$options[] = array('value' => (string) $value, 'label' => (string) $label);
				}
				return Select_Control::bind_to($name)->set_options($options);
			case 'range':
				$item = Number_Control::bind_to($name);
				if (isset($control['min'])) {
					$item->set_min((int) $control['min']);
				}
				if (isset($control['max'])) {
					$item->set_max((int) $control['max']);
				}
				if (isset($control['step']) && (int) $control['step'] == $control['step']) {
					$item->set_step((int) $control['step']);
				}
				return $item;
			case 'number':
				return Number_Control::bind_to($name);
			case 'switch':
				return Switch_Control::bind_to($name);
			case 'image':
				return Image_Control::bind_to($name);
		}
		// text, and color: there's no colour control for atomic props, so a CSS colour typed in
		return Text_Control::bind_to($name);
	}

	// The values of AnimateGL_Controls' controls in an atomic element's settings
	private static function element_values($element, $settings)
	{
		$values = array();
		$name = self::element_name($element);
		foreach (AnimateGL_Controls::for_element($name) as $key => $control) {
			$value = isset($settings[$key]) ? $settings[$key] : null;
			if ('image' === $control['type']) {
				$value = is_array($value) && isset($value['src']) ? $value['src'] : '';
			} elseif (is_array($value)) {
				$value = null;
			}
			$values[$key] = AnimateGL_Controls::value($control, $value);
		}
		return new AnimateGL_Control_Values($values, $name, $element->get_id());
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
			$settings = $element->get_atomic_settings();
			$values = self::element_values($element, $settings);
			$classes = implode(' ', AnimateGL_Controls::classes($values));
			// For the controls added on animategl_elementor_classes
			$stand_in = new AnimateGL_El_Atomic_Element($element, $settings, $this->recorded());
			$classes = trim((string) apply_filters('animategl_elementor_classes', $classes, $stand_in));
			$attributes = $values->attributes + $stand_in->attributes;
			if ($classes || $attributes) {
				$item = array('classes' => $classes, 'attributes' => $attributes);
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

// Takes the classic controls added on animategl_elementor_controls, without an element
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

// An atomic element as the animategl_elementor_classes filters expect a classic one: its
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
				continue; // animategl_elementor_classes returns those
			}
			$this->attributes[(string) $name] = is_array($attribute) ? implode(' ', $attribute) : (string) $attribute;
		}
		return $this;
	}
}
