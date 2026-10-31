<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// Divi 5: an AnimateGL group in the Advanced tab of every module, made from AnimateGL_Controls' controls
// (includes/controls.php) as el.php makes Elementor's, and their classes and attributes on the module's first tag on
// the page. The settings are one attribute, animategl, whose innerContent holds each control's value by its name
// (animategl.innerContent.desktop.value.agl_in_name). The Visual Builder gets the group and fields from js/divi.js,
// served with the controls by ajax_script(); the server has the same attribute through block_type_metadata_settings.
// The builder doesn't run divi_module_wrapper_render, so modules don't animate (or hide) while they're edited.
class AnimateGL_Divi
{
	const ATTRIBUTE = 'animategl';

	public function __construct()
	{
		add_action('divi_visual_builder_assets_before_enqueue_scripts', array($this, 'builder_script'));
		add_action('wp_ajax_agl_divi_controls', array($this, 'ajax_script'));
		add_filter('block_type_metadata_settings', array($this, 'metadata_settings'));
		add_filter('divi_module_wrapper_render', array($this, 'wrapper_render'), 10, 2);
	}

	// The module's name without its namespace (divi/text is text), as controls' elements name it
	private static function element_name($module_name)
	{
		$parts = explode('/', (string) $module_name);
		return end($parts);
	}

	// The fields of the group, as Divi 5 describes them: the control's name is the field's subName
	public static function field($name, $control, $priority)
	{
		$field = array(
			'groupSlug' => self::ATTRIBUTE,
			'attrName' => self::ATTRIBUTE . '.innerContent',
			'subName' => $name,
			'priority' => $priority,
			'render' => true,
			'label' => isset($control['label']) ? (string) $control['label'] : '',
			'features' => array('hover' => false, 'sticky' => false, 'responsive' => false, 'dynamicContent' => false),
		);
		if (!empty($control['description'])) {
			$field['description'] = wp_strip_all_tags((string) $control['description']);
		}
		$props = array();
		switch ($control['type']) {
			case 'select':
				$component = 'divi/select';
				$props['options'] = array();
				foreach ((isset($control['options']) ? (array) $control['options'] : array()) as $value => $label) {
					$props['options'][(string) $value] = array('label' => (string) $label);
				}
				break;
			case 'switch':
				$component = 'divi/toggle';
				break;
			case 'range':
			case 'number':
				$component = 'divi/range';
				$props = array_intersect_key($control, array('min' => 0, 'max' => 0, 'step' => 0));
				// A number without a unit
				$props['allowedUnits'] = array();
				if (!empty($control['unit']) && false === strpos($field['label'], '(')) {
					$field['label'] .= ' (' . $control['unit'] . ')';
				}
				break;
			case 'color':
				$component = 'divi/color-picker';
				break;
			case 'image':
				$component = 'divi/upload';
				break;
			default:
				$component = 'divi/text';
		}
		$field['component'] = array('type' => 'field', 'name' => $component);
		if ($props) {
			$field['component']['props'] = $props;
		}
		if (!empty($control['condition'])) {
			// js/divi.js makes it the field's visible callback
			$field['aglCondition'] = $control['condition'];
		}
		if (isset($control['divi']) && is_array($control['divi'])) {
			$field = $control['divi'] + $field;
		}
		return $field;
	}

	// A control's default as Divi saves it: a toggle is on or off, a number a string
	private static function default_value($control)
	{
		$value = AnimateGL_Controls::value($control, null);
		if ('switch' === $control['type']) {
			return $value ? 'on' : 'off';
		}
		return is_string($value) ? $value : (string) $value;
	}

	// The animategl attribute of a module with these controls
	public static function attribute($controls)
	{
		$items = array();
		$defaults = array();
		$priority = 10;
		foreach ($controls as $name => $control) {
			$items[$name] = self::field($name, $control, $priority);
			$priority += 10;
			if ('color' !== $control['type'] && 'image' !== $control['type']) {
				$defaults[$name] = self::default_value($control);
			}
		}
		return array(
			'type' => 'object',
			'default' => array('innerContent' => array('desktop' => array('value' => $defaults))),
			'settings' => array(
				'innerContent' => array(
					'groupType' => 'group-items',
					'items' => $items,
				),
			),
		);
	}

	// The group, in the Advanced tab
	public static function group()
	{
		return array(
			'groupName' => self::ATTRIBUTE,
			'panel' => 'advanced',
			'priority' => 95,
			'multiElements' => true,
			'component' => array(
				'name' => 'divi/composite',
				'props' => array('groupLabel' => 'AnimateGL'),
			),
		);
	}

	// The server's copy of a Divi module's attributes gets animategl too
	public function metadata_settings($settings)
	{
		$name = isset($settings['name']) ? (string) $settings['name'] : '';
		if (0 !== strpos($name, 'divi/') || !isset($settings['attributes']) || !is_array($settings['attributes']) || isset($settings['attributes'][self::ATTRIBUTE])) {
			return $settings;
		}
		$controls = AnimateGL_Controls::for_element(self::element_name($name));
		if ($controls) {
			$settings['attributes'][self::ATTRIBUTE] = self::attribute($controls);
		}
		return $settings;
	}

	// js/divi.js in the Visual Builder's window, after Divi's hooks
	public function builder_script()
	{
		if (!function_exists('et_core_is_fb_enabled') || !et_core_is_fb_enabled() || !class_exists('\ET\Builder\VisualBuilder\Assets\PackageBuildManager')) {
			return;
		}
		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(array(
			'name' => 'animategl-divi',
			'version' => ANIMATE_GL_VERSION,
			'script' => array(
				'src' => add_query_arg(array('action' => 'agl_divi_controls', 'locale' => get_user_locale()), admin_url('admin-ajax.php')),
				'deps' => array('lodash', 'divi-vendor-wp-hooks'),
				'enqueue_top_window' => false,
				'enqueue_app_window' => true,
				'args' => array('in_footer' => false),
			),
		));
	}

	// The controls, by element, then js/divi.js: one script, so the builder has them when it registers its modules
	public function ajax_script()
	{
		$all = AnimateGL_Controls::all();
		$elements = array();
		foreach ($all as $control) {
			if (isset($control['elements'])) {
				$elements = array_merge($elements, (array) $control['elements']);
			}
		}
		$data = array(
			'group' => self::group(),
			// Modules named in an elements list get their own; every other module gets the default
			'attributes' => array('' => self::attribute(AnimateGL_Controls::for_element(''))),
		);
		foreach (array_unique($elements) as $element) {
			$data['attributes'][$element] = self::attribute(AnimateGL_Controls::for_element($element));
		}
		header('Content-Type: application/javascript; charset=utf-8');
		echo 'window.aglDivi = ' . wp_json_encode($data) . ";\n";
		echo file_get_contents(plugin_dir_path(ANIMATE_GL_FILE) . 'js/divi.js'); // phpcs:ignore WordPress.Security.EscapeOutput
		exit;
	}

	// A Divi setting, unwrapped, as AnimateGL_Controls::value() takes it
	private static function setting($control, $value)
	{
		switch ($control['type']) {
			case 'switch':
				if ('on' === $value || 'off' === $value) {
					return 'on' === $value;
				}
				return is_bool($value) ? $value : null;
			case 'range':
			case 'number':
				// A range can be saved with a unit
				if (is_string($value) && preg_match('/^-?[0-9.]+/', $value, $match) && is_numeric($match[0])) {
					return $match[0];
				}
				return $value;
			case 'color':
				// A global colour: $variable({"type":"color","value":{"name":"gcid-…"}})$, which Divi prints as a variable
				if (is_string($value) && preg_match('/^\$variable\((.*)\)\$$/s', $value, $match)) {
					$variable = json_decode($match[1], true);
					$name = isset($variable['value']['name']) ? (string) $variable['value']['name'] : '';
					return preg_match('/^[A-Za-z][A-Za-z0-9_-]*$/', $name) ? 'var(--' . $name . ')' : '';
				}
				return $value;
			case 'image':
				if (is_array($value)) {
					foreach (array('src', 'url') as $key) {
						if (!empty($value[$key]) && is_string($value[$key])) {
							return $value[$key];
						}
					}
					if (!empty($value['id']) && is_numeric($value['id'])) {
						return (string) wp_get_attachment_image_url((int) $value['id'], 'full');
					}
					return '';
				}
				return $value;
		}
		return '' === $value ? null : $value;
	}

	// The values of AnimateGL_Controls' controls in a Divi module's attributes
	public static function module_values($module_name, $attrs, $id)
	{
		$saved = isset($attrs[self::ATTRIBUTE]['innerContent']['desktop']['value']) ? $attrs[self::ATTRIBUTE]['innerContent']['desktop']['value'] : array();
		$saved = is_array($saved) ? $saved : array();
		$element = self::element_name($module_name);
		$values = array();
		foreach (AnimateGL_Controls::for_element($element) as $name => $control) {
			$values[$name] = AnimateGL_Controls::value($control, self::setting($control, array_key_exists($name, $saved) ? $saved[$name] : null));
		}
		// The play-once key: letters and digits only
		return new AnimateGL_Control_Values($values, $element, preg_replace('/[^A-Za-z0-9]/', '', (string) $id));
	}

	// The classes and attributes on the module's first tag
	public function wrapper_render($html, $args)
	{
		$attrs = is_array($args) && isset($args['attrs']) && is_array($args['attrs']) ? $args['attrs'] : array();
		if (!is_string($html) || !isset($attrs[self::ATTRIBUTE]) || !class_exists('WP_HTML_Tag_Processor')) {
			return $html;
		}
		$values = self::module_values(isset($args['name']) ? $args['name'] : '', $attrs, isset($args['id']) ? $args['id'] : '');
		$classes = AnimateGL_Controls::classes($values);
		if (!$classes && !$values->attributes) {
			return $html;
		}
		$tags = new WP_HTML_Tag_Processor($html);
		while ($tags->next_tag()) {
			if (in_array($tags->get_tag(), array('STYLE', 'SCRIPT', 'LINK', 'META', 'NOSCRIPT'), true)) {
				continue;
			}
			foreach ($classes as $class) {
				$tags->add_class($class);
			}
			foreach ($values->attributes as $name => $value) {
				$own = $tags->get_attribute($name);
				if ('style' === $name && is_string($own) && '' !== trim($own)) {
					$value = rtrim(trim($own), ';') . '; ' . $value;
				}
				$tags->set_attribute($name, $value);
			}
			return $tags->get_updated_html();
		}
		return $html;
	}
}
