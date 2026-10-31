<?php

use Elementor\Controls_Manager;
use Elementor\PageSettings\Page;
use Elementor\Utils;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

/*plugin class*/
class AnimateGL_El
{

	public $version;
	public $path;
	public $plugin_dir_path;
	public $plugin_dir_url;

	// Singleton
	private static $instance = null;

	public static function get_instance()
	{

		if (null == self::$instance) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	protected function __construct()
	{
		$this->version = ANIMATE_GL_VERSION;
		$this->path = ANIMATE_GL_FILE;
		$this->plugin_dir_path = plugin_dir_path($this->path);
		$this->plugin_dir_url = plugin_dir_url($this->path);

		$this->init();
	}

	public function init()
	{
		add_action('elementor/element/common/section_effects/after_section_end',  [$this, 'add_section']);
		add_action('elementor/element/section/section_effects/after_section_end',  [$this, 'add_section']);
		add_action('elementor/element/column/section_effects/after_section_end',  [$this, 'add_section']);
		add_action('elementor/element/container/section_effects/after_section_end',  [$this, 'add_section']);

		add_action('elementor/element/after_add_attributes', function ($element) {
			// Atomic elements fire this too, with typed settings: el-atomic.php handles them
			if (method_exists($element, 'get_atomic_settings')) {
				return;
			}
			$classes = $this->element_classes($element);
			if ($classes) {
				$element->add_render_attribute(
					'_wrapper',
					array('class' => $classes)
				);
			}
		});

		// Elementor 4's atomic elements have no Motion Effects section: the same controls and classes through their own hooks
		if (class_exists('Elementor\Modules\AtomicWidgets\Controls\Section')) {
			include_once($this->plugin_dir_path . 'includes/el-atomic.php');
			new AnimateGL_El_Atomic();
		}

		// Front end only (this also covers the Elementor preview), not every admin and REST request
		add_action('wp_enqueue_scripts', function () {
			wp_enqueue_script('agl-el', $this->plugin_dir_url . 'js/el.js', array('jquery'), $this->version);
		});

		add_action('elementor/editor/after_enqueue_styles', function () {
			wp_register_style('agl-el', $this->plugin_dir_url . 'css/el.css', array(), $this->version);
			wp_enqueue_style("agl-el");
		});

		add_action('elementor/editor/after_enqueue_scripts', function () {
			wp_enqueue_script('agl-el-editor', $this->plugin_dir_url . 'js/el-editor.js', array('jquery'), $this->version);
		});
	}

	// A classic control's arguments for one of AnimateGL_Controls'
	public static function control_args($control)
	{
		$types = array(
			'select' => Controls_Manager::SELECT,
			'switch' => Controls_Manager::SWITCHER,
			'range' => Controls_Manager::SLIDER,
			'number' => Controls_Manager::NUMBER,
			'text' => Controls_Manager::TEXT,
			'color' => Controls_Manager::COLOR,
			'image' => Controls_Manager::MEDIA,
		);
		$args = array(
			'label' => isset($control['label']) ? $control['label'] : '',
			'type' => $types[$control['type']],
			'render_type' => 'none',
		);
		foreach (array('description', 'options', 'condition') as $key) {
			if (!empty($control[$key])) {
				$args[$key] = $control[$key];
			}
		}
		$default = isset($control['default']) ? $control['default'] : null;
		switch ($control['type']) {
			case 'switch':
				$args['default'] = $default ? 'yes' : 'no';
				break;
			case 'range':
				// Without a unit, Elementor still needs one to find the range: ms, as distances were saved with it
				$unit = empty($control['unit']) ? 'ms' : $control['unit'];
				$args['range'] = array($unit => array_intersect_key($control, array('min' => 0, 'max' => 0, 'step' => 0)));
				$args['size_units'] = empty($control['unit']) ? array() : array($unit);
				$args['default'] = array('unit' => $unit, 'size' => is_numeric($default) ? $default + 0 : 0);
				break;
			case 'number':
				$args += array_intersect_key($control, array('min' => 0, 'max' => 0, 'step' => 0));
				$args['default'] = is_numeric($default) ? $default + 0 : 0;
				break;
			case 'select':
			case 'text':
				$args['default'] = is_string($default) ? $default : '';
				break;
		}
		if (isset($control['elementor']) && is_array($control['elementor'])) {
			$args = $control['elementor'] + $args;
		}
		return $args;
	}

	// The values of AnimateGL_Controls' controls in a classic element's settings
	public static function element_values($element)
	{
		$values = array();
		foreach (AnimateGL_Controls::for_element($element->get_name()) as $name => $control) {
			// A global colour picked in a colour control is in the settings for display, as var(--e-global-color-…)
			$value = 'color' === $control['type'] && method_exists($element, 'get_settings_for_display') ? $element->get_settings_for_display($name) : $element->get_settings($name);
			switch ($control['type']) {
				case 'switch':
					$value = null === $value ? null : 'yes' === $value;
					break;
				// Slider settings can be null (Elementor 3.26+): the default
				case 'range':
					$value = is_array($value) && isset($value['size']) ? $value['size'] : null;
					break;
				case 'image':
					$value = is_array($value) && isset($value['url']) ? $value['url'] : '';
					break;
			}
			$values[$name] = AnimateGL_Controls::value($control, $value);
		}
		return new AnimateGL_Control_Values($values, $element->get_name(), $element->get_id());
	}

	// The classes for a classic element's AnimateGL settings; its attributes are added to it
	public function element_classes($element)
	{
		$values = self::element_values($element);
		$classes = implode(' ', AnimateGL_Controls::classes($values));
		foreach ($values->attributes as $name => $value) {
			$element->add_render_attribute('_wrapper', $name, $value);
		}
		// For the controls added on animategl_elementor_controls
		return trim((string) apply_filters('animategl_elementor_classes', $classes, $element));
	}

	public function add_section($element)
	{
		$element->start_controls_section(
			'agl_section',
			[
				'label' => 'A n i m a t e  G L',
				'tab' => Controls_Manager::TAB_ADVANCED,
			]
		);

		foreach (AnimateGL_Controls::for_element($element->get_name()) as $name => $control) {
			$element->add_control($name, self::control_args($control));
		}

		// Elementor controls of add-ons that don't use animategl_controls. Turn their settings into classes with
		// animategl_elementor_classes.
		do_action('animategl_elementor_controls', $element);

		$element->end_controls_section(); // END ENTRANCE SECTION / PANEL
	}
}
