<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

/**
 * Every animation, setting and effect with the classes and attributes it gives, for AI tools: the
 * animategl/list-animations ability (includes/abilities.php) and animategl.com's /llms.txt. Made from the page builder
 * controls (AnimateGL_Controls, includes/controls.php), with Pro's when it's active, by running
 * AnimateGL_Controls::classes() for each value, so it follows the controls with no list of its own. A control or
 * value is Pro's when a filter callback in a file under includes/pro/ adds it. The site's own saved animations are
 * left out.
 */
class AnimateGL_Reference
{
	// The file a filter callback is defined in, or ''
	private static function callback_file($callback)
	{
		try {
			if (is_array($callback)) {
				$reflection = new ReflectionMethod(is_object($callback[0]) ? get_class($callback[0]) : $callback[0], $callback[1]);
			} elseif (is_string($callback) && false !== strpos($callback, '::')) {
				$reflection = new ReflectionMethod($callback);
			} else {
				$reflection = new ReflectionFunction($callback);
			}
			return wp_normalize_path((string) $reflection->getFileName());
		} catch (ReflectionException $e) {
			return '';
		}
	}

	/**
	 * Runs the callbacks of a filter on $value in their order, only Pro's ($pro true) or only the others, and returns
	 * the result. $skip: file names whose callbacks are left out.
	 */
	private static function run($filter, $value, $pro, $skip = array())
	{
		global $wp_filter;
		if (empty($wp_filter[$filter])) {
			return $value;
		}
		$callbacks = $wp_filter[$filter]->callbacks;
		ksort($callbacks);
		foreach ($callbacks as $priority) {
			foreach ($priority as $callback) {
				$file = self::callback_file($callback['function']);
				if ((false !== strpos($file, '/includes/pro/')) !== $pro || in_array(basename($file), $skip, true)) {
					continue;
				}
				$value = call_user_func($callback['function'], $value);
			}
		}
		return $value;
	}

	// The classes and attributes an element gets with these settings (control name => value, the rest at their defaults)
	private static function apply($settings, $element)
	{
		$values = array();
		foreach (AnimateGL_Controls::all() as $name => $control) {
			$values[$name] = AnimateGL_Controls::value($control, array_key_exists($name, $settings) ? $settings[$name] : null);
		}
		$values = new AnimateGL_Control_Values($values, $element, 'ELEMENTID');
		return array(AnimateGL_Controls::classes($values), $values->attributes);
	}

	// What changes from $base to $settings: the classes added, and the attributes added or changed, as name="value"
	private static function diff($base, $settings, $element)
	{
		list($from_classes, $from_attributes) = self::apply($base, $element);
		list($classes, $attributes) = self::apply($settings, $element);
		$out = array_values(array_diff($classes, $from_classes));
		foreach ($attributes as $name => $value) {
			if (!isset($from_attributes[$name]) || $from_attributes[$name] !== $value) {
				$out[] = $name . '="' . $value . '"';
			}
		}
		return $out;
	}

	// The settings that show a control: its condition's other controls set to a value that meets it
	private static function condition($control, $controls)
	{
		$settings = array();
		if (empty($control['condition'])) {
			return $settings;
		}
		foreach ($control['condition'] as $key => $want) {
			$name = rtrim($key, '!');
			if ('agl_in_name' === $name) {
				// An entrance it's for, or the WebGL fade unless that's one it isn't for
				if ($name === $key) {
					$want = is_array($want) ? reset($want) : $want;
					$settings[$name] = (string) $want;
				}
				continue;
			}
			if (!isset($controls[$name])) {
				continue;
			}
			if ($name !== $key) {
				// "isn't": the first option that isn't one of these
				$options = isset($controls[$name]['options']) ? array_keys($controls[$name]['options']) : array();
				$left = array_values(array_diff(array_map('strval', $options), array_map('strval', (array) $want)));
				if ($left) {
					$settings[$name] = $left[0];
				} elseif ('switch' === $controls[$name]['type']) {
					$settings[$name] = !$want;
				}
			} else {
				$want = is_array($want) ? reset($want) : $want;
				$settings[$name] = $want;
			}
		}
		return $settings;
	}

	// A value of a control other than its default, and what it stands for in the reference
	private static function sample($control)
	{
		$default = isset($control['default']) ? $control['default'] : null;
		switch ($control['type']) {
			case 'text':
				return 'example';
			case 'color':
				return '#123456';
			case 'image':
				return 'https://example.com/image.jpg';
			case 'switch':
				return empty($default);
			case 'range':
			case 'number':
				$max = isset($control['max']) ? $control['max'] : 100;
				return $max != $default ? $max : (isset($control['min']) ? $control['min'] : 0);
			case 'select':
				foreach (array_keys($control['options']) as $value) {
					if ('' !== (string) $value && (string) $value !== (string) $default) {
						return (string) $value;
					}
				}
		}
		return null;
	}

	// The placeholders for the sample values and the element's id
	private static function placeholders($out)
	{
		return array_map(function ($item) {
			return str_replace(array('https://example.com/image.jpg', 'example', '#123456', 'ELEMENTID'), array('<image URL>', '<text>', '<color>', '<id>'), $item);
		}, $out);
	}

	/**
	 * What setting $name to $value adds over $base. When that's nothing on its own, with the first setting it works
	 * with: a control shown for this value (a trigger's target), then one shown under the same condition (an overlay's
	 * colour and strength), taken when the two together give more than that setting alone.
	 */
	private static function out($name, $value, $base, $element, $controls)
	{
		$settings = array($name => $value) + $base;
		$out = self::diff($base, $settings, $element);
		if ($out) {
			return $out;
		}
		$condition = isset($controls[$name]['condition']) ? $controls[$name]['condition'] : null;
		$shown = array();
		$same = array();
		foreach ($controls as $other => $control) {
			if ($other === $name || 'select' === $control['type'] || empty($control['condition'])) {
				continue;
			}
			if (isset($control['condition'][$name]) && in_array((string) $value, array_map('strval', (array) $control['condition'][$name]), true)) {
				$shown[] = $other;
			} elseif ($condition && $control['condition'] == $condition) {
				$same[] = $other;
			}
		}
		foreach (array_merge($shown, $same) as $other) {
			$with = array($other => self::sample($controls[$other]));
			$together = self::diff($base, $with + $settings, $element);
			if ($together && $together != self::diff($base, $with + $base, $element)) {
				return $together;
			}
		}
		return array();
	}

	/**
	 * What a value gives on an element without an entrance, as 'alone', when that differs from 'out' (made with a
	 * WebGL entrance): a WebGL hover effect needs agl agl-in-none there, a WebGL scroll effect needs an entrance
	 * (alone is empty).
	 */
	private static function add_alone(&$item, $name, $value, $alone, $element, $controls)
	{
		if (null === $alone) {
			return;
		}
		$out = self::placeholders(self::out($name, $value, $alone, $element, $controls));
		if ($out != $item['out']) {
			$item['alone'] = $out;
		}
	}

	/**
	 * The reference: array(
	 *   'entrances'  => list of array(value, label, kind CSS or WebGL, class, directions ('' for none), pro)
	 *   'directions' => list of array(value, label, pro)
	 *   'controls'   => list of array(name, label, description, type, pro, values => list of array(value, label, out, pro),
	 *                   or for range and number: range, sample => array(classes and attributes with <n>))
	 * )
	 */
	public static function get()
	{
		static $reference;
		if (null !== $reference || !class_exists('AnimateGL_Controls')) {
			return $reference ?: array('entrances' => array(), 'directions' => array(), 'controls' => array());
		}
		$controls = AnimateGL_Controls::all();

		// Lite's controls and options: the other callbacks only, with lite's free effects on (Pro turns them off)
		add_filter('animategl_core_effects', '__return_true', PHP_INT_MAX);
		$lite = self::run('animategl_controls', array(), false);
		remove_filter('animategl_core_effects', '__return_true', PHP_INT_MAX);
		$saved = array();
		foreach ((array) self::run('animategl_elementor_entrance_options', array(), true) as $option) {
			$saved[] = (string) $option['value'];
		}
		$pro_entrances = array();
		foreach ((array) self::run('animategl_elementor_entrance_options', array(), true, array('animations.php')) as $option) {
			$pro_entrances[] = (string) $option['value'];
		}
		// The site's own saved animations are what the animations.php callback adds beyond Pro's presets
		$saved = array_diff($saved, $pro_entrances);
		$pro_directions = array_map('strval', array_keys((array) self::run('animategl_elementor_direction_options', array(), true)));

		$reference = array('entrances' => array(), 'directions' => array(), 'controls' => array());
		foreach (AnimateGL_Controls::entrance_options() as $option) {
			$value = (string) $option['value'];
			if ('' === $value || in_array($value, $saved, true)) {
				continue;
			}
			$label = (string) $option['label'];
			$kind = '';
			if (preg_match('/^(.*) \((CSS|WebGL)\)$/', $label, $match)) {
				$label = $match[1];
				$kind = $match[2];
			}
			$out = self::diff(array('agl_in_name' => 'custom'), array('agl_in_name' => $value), 'paragraph');
			$directions = 'custom' === $value ? array('') : AnimateGL_Controls::entrance_directions($value);
			$reference['entrances'][] = array(
				'value'      => $value,
				'label'      => $label,
				'kind'       => $kind,
				// With its first direction when it has none without one (Square: agl-squareCSSCenter)
				'class'      => 'custom' === $value ? 'agl' : implode(' ', array_merge(array('agl'), $out)),
				// The directions it has: '' for none
				'directions' => null === $directions ? array('') : $directions,
				'pro'        => in_array($value, $pro_entrances, true),
			);
		}
		if (isset($controls['agl_in_direction']['options'])) {
			foreach ($controls['agl_in_direction']['options'] as $value => $label) {
				if ('' !== (string) $value) {
					$reference['directions'][] = array('value' => (string) $value, 'label' => (string) $label, 'pro' => in_array((string) $value, $pro_directions, true));
				}
			}
		}

		$seen = array();
		foreach ($controls as $name => $control) {
			if (in_array($name, array('agl_in_name', 'agl_in_direction'), true)) {
				continue;
			}
			$element = !empty($control['elements']) ? (string) reset($control['elements']) : 'image';
			// With a WebGL entrance, so the controls that need one give their classes, and without an entrance
			$alone_base = self::condition($control, $controls);
			$base = $alone_base + array('agl_in_name' => 'fade');
			$alone = isset($alone_base['agl_in_name']) ? null : $alone_base;
			$entry = array(
				'name'        => $name,
				'label'       => isset($control['label']) ? (string) $control['label'] : $name,
				'description' => isset($control['description']) ? wp_strip_all_tags((string) $control['description']) : '',
				'type'        => $control['type'],
				'pro'         => 0 !== strpos($name, 'agl_in_') && !isset($lite[$name]),
				'elements'    => !empty($control['elements']) ? array_values((array) $control['elements']) : array(),
			);
			if ('select' === $control['type']) {
				$entry['values'] = array();
				$lite_options = isset($lite[$name]['options']) ? array_map('strval', array_keys($lite[$name]['options'])) : array();
				foreach ($control['options'] as $value => $label) {
					$value = (string) $value;
					if ('' === $value || (isset($control['default']) && (string) $control['default'] === $value)) {
						continue;
					}
					$item = array(
						'value' => $value,
						'label' => (string) $label,
						'out'   => self::placeholders(self::out($name, $value, $base, $element, $controls)),
						'pro'   => $entry['pro'] || (0 !== strpos($name, 'agl_in_') && !in_array($value, $lite_options, true)),
					);
					self::add_alone($item, $name, $value, $alone, $element, $controls);
					$entry['values'][] = $item;
				}
			} elseif ('switch' === $control['type']) {
				$entry['out'] = self::placeholders(self::out($name, empty($control['default']), $base, $element, $controls));
				$entry['on'] = empty($control['default']);
				self::add_alone($entry, $name, empty($control['default']), $alone, $element, $controls);
			} elseif (in_array($control['type'], array('range', 'number'), true)) {
				$min = isset($control['min']) ? $control['min'] : 0;
				$max = isset($control['max']) ? $control['max'] : 100;
				$default = isset($control['default']) ? $control['default'] : null;
				$sample = $max != $default ? $max : $min;
				$entry['range'] = array('min' => $min, 'max' => $max, 'step' => isset($control['step']) ? $control['step'] : 1, 'unit' => isset($control['unit']) ? (string) $control['unit'] : '', 'default' => $default);
				$number = function ($out) use ($sample) {
					return self::placeholders(array_map(function ($item) use ($sample) {
						return preg_replace('/(?<![0-9.])' . preg_quote((string) ($sample + 0), '/') . '(?![0-9])/', '<n>', $item);
					}, $out));
				};
				$entry['out'] = $number(self::out($name, $sample, $base, $element, $controls));
				if (null !== $alone) {
					$without = $number(self::out($name, $sample, $alone, $element, $controls));
					if ($without != $entry['out']) {
						$entry['alone'] = $without;
					}
				}
			} elseif (in_array($control['type'], array('text', 'color', 'image'), true)) {
				$entry['out'] = self::placeholders(self::out($name, self::sample($control), $base, $element, $controls));
			}
			// One entry for controls that are the same setting in different places (the tile size of an entrance, a
			// hover effect and scatter)
			$lines = md5(wp_json_encode(array($entry['label'], $entry['type'], isset($entry['values']) ? $entry['values'] : null, isset($entry['range']) ? $entry['range'] : null, isset($entry['out']) ? $entry['out'] : null)));
			if (isset($seen[$lines])) {
				continue;
			}
			$seen[$lines] = true;
			$reference['controls'][] = $entry;
		}
		return $reference;
	}

	// How the classes work, for list-animations ($pro: whether Pro is active on the site) and llms.txt ($pro null)
	public static function rules($pro = null)
	{
		if (null === $pro) {
			$edition = 'A Pro class without AnimateGL Pro does nothing: the element shows as it is. Visitors who prefer reduced motion see elements without animation.';
		} else {
			$edition = $pro ? 'AnimateGL Pro is active, so the Pro classes work.' : 'AnimateGL Pro isn\'t active: Pro classes do nothing (the element shows as it is), so use free ones.';
		}
		return array(
			'An entrance plays when the element scrolls into view: the class agl plus the animation\'s class, such as agl agl-fadeCSS.',
			'A direction goes at the end of the animation\'s class (agl-slideCSSLeft), and only the directions listed for that animation exist. A direction is the way the element moves: Up rises from below, Left comes in from the right.',
			'Timing classes (agl-in-duration-<n>, agl-in-delay-<n>, ...) change an entrance and do nothing without one. Hover, scroll, loop and text effects work without an entrance unless their "alone" classes say otherwise.',
			'Where a value lists "alone" classes, those are what it gives on an element without an entrance: a WebGL hover effect is agl agl-in-none agl-hover-<effect> there. An empty "alone" means it needs an entrance on the same element (a WebGL one for the WebGL scroll effects): timing, triggers, text split and the device settings change an entrance.',
			'CSS animations work on any element. WebGL entrances work on images and other elements (drawn from a snapshot); the WebGL hover and scroll effects are for images with a WebGL entrance or none.',
			'Settings shown as attributes (data-..., style) can\'t be set as classes: set them in the element\'s AnimateGL panel or controls.',
			$edition,
			'Use few, purposeful animations: one entrance per kind of section, 100-200 ms delays between neighbours, a signature effect or two per page.',
		);
	}

	// What validate() knows: exact classes, patterns, the entrance classes with their kind, and what effect classes need
	private static function known()
	{
		static $known;
		if (null !== $known) {
			return $known;
		}
		$known = array('exact' => array('agl' => true, 'agl-in-none' => true), 'patterns' => array(), 'entrances' => array(), 'bases' => array(), 'needs' => array());
		// Every entrance the site has, saved animations too, with its directions
		foreach (AnimateGL_Controls::entrance_options() as $option) {
			$value = (string) $option['value'];
			if ('' === $value || 'custom' === $value || !AnimateGL::is_class_token($value)) {
				continue;
			}
			// Every entrance's label ends in (CSS) or (WebGL), saved animations' too (pro/animations.php)
			$css = ' (' . __('CSS', 'animategl') . ')';
			$webgl = substr((string) $option['label'], -strlen($css)) !== $css;
			$directions = AnimateGL_Controls::entrance_directions($value);
			$directions = null === $directions ? array('') : $directions;
			$known['bases']['agl-' . $value] = $directions;
			foreach ($directions as $direction) {
				$known['entrances']['agl-' . $value . $direction] = $webgl;
				$known['exact']['agl-' . $value . $direction] = true;
			}
		}
		$add = function ($items, $need = null, $alone = array()) use (&$known) {
			foreach ($items as $item) {
				if (false !== strpos($item, '=') || in_array($item, array('agl', 'agl-in-none'), true)) {
					continue;
				}
				if (false !== strpos($item, '<')) {
					$regex = preg_quote(str_replace(array('<n>', '<text>', '<id>', '<color>'), array('NUMBER', 'TOKEN', 'TOKEN', 'TOKEN'), $item), '/');
					$regex = str_replace(array('NUMBER', 'TOKEN'), array('-?[0-9]+(?:\.[0-9]+)?', '[A-Za-z0-9#_-]+'), $regex);
					$known['patterns'][$item] = '/^' . $regex . '$/';
				} else {
					$known['exact'][$item] = true;
				}
				if ($need) {
					$known['needs'][$item] = array($need, $alone);
				}
			}
		};
		foreach (self::get()['controls'] as $control) {
			// What a value with other classes alone needs: a WebGL hover effect a WebGL entrance or agl-in-none, a
			// WebGL scroll effect a WebGL entrance, the rest (timing, triggers, text split, devices) an entrance
			foreach (isset($control['values']) ? $control['values'] : array($control) as $item) {
				if (!isset($item['out'])) {
					continue;
				}
				$need = null;
				if (isset($item['alone'])) {
					if (in_array('agl-in-none', $item['alone'], true)) {
						$need = 'webgl-or-none';
					} else {
						$need = 'agl_scroll' === $control['name'] ? 'webgl' : 'entrance';
					}
				}
				$add($item['out'], $need, isset($item['alone']) ? $item['alone'] : array());
			}
		}
		return $known;
	}

	private static function matches($class, $known)
	{
		if (isset($known['exact'][$class])) {
			return $class;
		}
		foreach ($known['patterns'] as $item => $regex) {
			if (preg_match($regex, $class)) {
				return $item;
			}
		}
		return null;
	}

	/**
	 * Checks the AnimateGL classes for one element: each one this site's AnimateGL knows, and each effect with what it
	 * needs (an entrance, or for a WebGL effect a WebGL entrance or agl-in-none). Returns true or a WP_Error whose
	 * message says what to use. Presets that exist only in JavaScript (a CodeCanyon pack next to lite,
	 * AnimateGL.registerPresets() on the page) are unknown here.
	 */
	public static function validate($classes)
	{
		$known = self::known();
		$entrance = null;
		$first = null;
		$matched = array();
		foreach ($classes as $class) {
			$item = self::matches($class, $known);
			if (null === $item) {
				/* translators: %s: a class name */
				$message = sprintf(__('"%s" isn\'t a class this site\'s AnimateGL knows.', 'animategl'), $class);
				// An entrance with a direction it doesn't have: the entrance's own
				$base = '';
				foreach (array_keys($known['bases']) as $candidate) {
					if (0 === strpos($class, $candidate) && strlen($candidate) > strlen($base)) {
						$base = $candidate;
					}
				}
				$best = '';
				$distance = PHP_INT_MAX;
				if ($base) {
					$directions = array_map(function ($direction) use ($base) {
						return $base . $direction;
					}, $known['bases'][$base]);
					/* translators: %s: class names */
					$message .= ' ' . sprintf(__('This animation has: %s.', 'animategl'), implode(', ', $directions));
				} else {
					foreach (array_keys($known['exact']) as $candidate) {
						$d = levenshtein($class, $candidate);
						if ($d < $distance) {
							$distance = $d;
							$best = $candidate;
						}
					}
				}
				if ($best && $distance <= max(3, (int) (strlen($class) / 3))) {
					/* translators: %s: a class name */
					$message .= ' ' . sprintf(__('Did you mean "%s"?', 'animategl'), $best);
				}
				$message .= ' ' . __('Get the classes with animategl/list-animations.', 'animategl');
				return new WP_Error('animategl_unknown_class', $message, array('class' => $class));
			}
			$matched[$class] = $item;
			if (isset($known['entrances'][$class])) {
				if (null !== $entrance) {
					/* translators: 1, 2: class names */
					return new WP_Error('animategl_two_entrances', sprintf(__('"%1$s" and "%2$s" are both entrances: an element plays one, so keep one of them.', 'animategl'), $first, $class), array('class' => $class));
				}
				$entrance = $known['entrances'][$class];
				$first = $class;
			}
		}
		$has_agl = in_array('agl', $classes, true);
		$none = in_array('agl-in-none', $classes, true);
		foreach ($matched as $class => $item) {
			if (isset($known['entrances'][$class]) && !$has_agl) {
				/* translators: %s: a class name */
				return new WP_Error('animategl_needs_agl', sprintf(__('"%s" needs the class agl with it: agl %s.', 'animategl'), $class, $class));
			}
			if (!isset($known['needs'][$item])) {
				continue;
			}
			list($need, $alone) = $known['needs'][$item];
			$ok = $has_agl && ('entrance' === $need ? null !== $entrance : (true === $entrance || ('webgl-or-none' === $need && $none)));
			if ($ok) {
				continue;
			}
			if ('webgl-or-none' === $need) {
				/* translators: 1: a class name, 2: classes */
				$message = sprintf(__('"%1$s" needs a WebGL entrance on the same element, or no entrance: %2$s.', 'animategl'), $class, implode(' ', $alone));
			} elseif ('webgl' === $need) {
				/* translators: %s: a class name */
				$message = sprintf(__('"%s" needs a WebGL entrance on the same element, such as agl agl-fade.', 'animategl'), $class);
			} else {
				/* translators: %s: a class name */
				$message = sprintf(__('"%s" changes an entrance and does nothing without one, such as agl agl-fadeCSS.', 'animategl'), $class);
			}
			return new WP_Error('animategl_class_needs', $message, array('class' => $class));
		}
		return true;
	}
}
