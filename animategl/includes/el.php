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

			$agl_in_name = $element->get_settings('agl_in_name');
			$classes = '';

			// Settings end up in the class attribute, so accept only class-safe names and numbers
			if ($agl_in_name && AnimateGL::is_class_token($agl_in_name)) {
				$direction = $element->get_settings('agl_in_direction');
				$classes = $agl_in_name == 'custom' ? 'agl' : 'agl agl-' . $agl_in_name . (AnimateGL::is_class_token($direction) ? $direction : '');
				$duration = $this->get_slider_size($element, 'agl_in_duration', 1000);
				$delay = $this->get_slider_size($element, 'agl_in_delay', 0);
				$distance = $this->get_slider_size($element, 'agl_in_distance', 1);
				$classes .= ' agl-in-duration-' . $duration;
				$classes .= ' agl-in-delay-' . $delay;
				$classes .= ' agl-in-distance-' . $distance;
				$easing = $element->get_settings('agl_in_easing');
				if ($easing && AnimateGL::is_class_token($easing))
					$classes .= ' agl-in-easing-' . $easing;
				$repeat = $element->get_settings('agl_in_repeat');
				if ($repeat == 'yes')
					$classes .= ' agl-in-repeat';
				$loctToScrollbar = $element->get_settings('agl_in_lockToScrollbar');
					if ($loctToScrollbar == 'yes')
						$classes .= ' agl-in-lockToScrollbar';
			}

			// The Elementor side of animategl_block_classes, for the controls added on animategl_elementor_controls
			$classes = trim((string) apply_filters('animategl_elementor_classes', $classes, $element));
			if ($classes) {
				$element->add_render_attribute(
					'_wrapper',
					array('class' => $classes)
				);
			}
		});

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

	// Slider settings can be null (Elementor 3.26+): fall back to the control's default
	private function get_slider_size($element, $key, $default)
	{
		$value = $element->get_settings($key);
		return is_array($value) && isset($value['size']) && is_numeric($value['size']) ? $value['size'] + 0 : $default;
	}

	public function add_section($element)
	{

		$name = $element->get_name();


		$element->start_controls_section(
			'agl_section',
			[
				'label' => 'A n i m a t e  G L',
				'tab' => Controls_Manager::TAB_ADVANCED,
			]
		);

		$element->add_control(
			'agl_in_name',
			[
				'label' => __('Entrance Animation', 'animategl'),
				'type' => Controls_Manager::SELECT,
				'separator' => 'before',
				'options' => [
					// '' => __('None', 'animategl'),
					// 'fadeCSS' => __('Fade', 'animategl'),
					// 'zoomInCSS' => __('Zoom In', 'animategl'),
					// 'zoomOutCSS' => __('Zoom Out', 'animategl'),
					// 'wipeCSS' => __('Wipe', 'animategl'),
					// 'slideCSS' => __('Slide', 'animategl'),
					// 'fade' => __('Fade WebGL', 'animategl'),
					// 'flip' => __('Flip WebGL', 'animategl'),
					// 'slide' => __('Slide WebGL', 'animategl'),
					// 'stretch' => __('Stretch WebGL', 'animategl'),
					// 'bend' => __('Bend WebGL', 'animategl'),
					// 'peel' => __('Peel WebGL', 'animategl'),
					// 'wipe' => __('Wipe WebGL', 'animategl'),
					// 'zoomIn' => __('Zoom In WebGL', 'animategl'),
					// 'custom' => __('Custom', 'animategl'),

				],
				'default' => '',
				'render_type'        => 'none',
				'frontend_available' => true,
			]
		);

		$element->add_control(
			'agl_in_direction',
			[
				'label' => __('Direction', 'animategl'),
				'type' => Controls_Manager::SELECT,
				'separator' => 'before',
				'options' => [
					'' => __('Default', 'animategl'),
					'Left' => __('Left', 'animategl'),
					'Right' => __('Right', 'animategl'),
					'Up' => __('Up', 'animategl'),
					'Down' => __('Down', 'animategl'),

				],
				'default' => '',
				'render_type'        => 'none',
				'frontend_available' => true,
				'condition' => [
					'agl_in_name!' => '',
				],
			]
		);

		$element->add_control(
			'agl_in_duration',
			[
				'label' => esc_html__('Duration', 'animategl'),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'ms' => [
						'max' => 3000,
						'min' => 0,
						'step' => 100,
					],
				],
				'size_units' => ['ms'],
				'default' => [
					'unit' => 'ms',
					'size' => 1000,
				],
				'frontend_available' => true,
				'render_type'        => 'none',
				'condition' => [
					'agl_in_name!' => '',
				],
			]
		);

		$element->add_control(
			'agl_in_delay',
			[
				'label' => esc_html__('Delay', 'animategl'),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'ms' => [
						'max' => 5000,
						'min' => 0,
						'step' => 100,
					],
				],
				'size_units' => ['ms'],
				'default' => [
					'unit' => 'ms',
					'size' => 0,
				],
				'frontend_available' => true,
				'render_type'        => 'none',
				'condition' => [
					'agl_in_name!' => '',
				],

			]
		);

		$element->add_control(
			'agl_in_distance',
			[
				'label' => esc_html__('Distance', 'animategl'),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'ms' => [
						'max' => 5,
						'min' => 0,
						'step' => 0.01,
					],
				],
				'size_units' => [],
				'default' => [
					'unit' => 'ms',
					'size' => 1,
				],
				'frontend_available' => true,
				'render_type'        => 'none',
				'condition' => [
					'agl_in_name!' => '',
				],

			]
		);

		$element->add_control(
			'agl_in_repeat',
			[
				'label' => esc_html__('Repeat', 'animategl'),
				'type' => Controls_Manager::SWITCHER,
				'default' => 'no',
				'render_type'        => 'none',
				'frontend_available' => true,
				'condition' => [
					'agl_in_name!' => '',
				],
			]
		);

		$element->add_control(
			'agl_in_lockToScrollbar',
			[
				'label' => esc_html__('Lock to Scrollbar', 'animategl'),
				'type' => Controls_Manager::SWITCHER,
				'default' => 'no',
				'render_type'        => 'none',
				'frontend_available' => true,
				'condition' => [
					'agl_in_name!' => '',
				],
			]
		);

		$element->add_control(
			'agl_in_easing',
			[
				'label' => __('Easing', 'animategl'),
				'type' => Controls_Manager::SELECT,
				'separator' => 'before',
				'options' => [
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

				],
				'default' => '',
				'render_type'        => 'none',
				'frontend_available' => true,
				'condition' => [
					'agl_in_name!' => '',
				],
			]
		);

		// Add controls to the AnimateGL section. Turn their settings into classes with animategl_elementor_classes.
		do_action('animategl_elementor_controls', $element);

		$element->end_controls_section(); // END ENTRANCE SECTION / PANEL

	}
}
