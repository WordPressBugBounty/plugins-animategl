<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

/*plugin class*/
class AnimateGL
{

	public $version;
	public $path;
	public $plugin_dir_path;
	public $plugin_dir_url;
	public $ajaxurl;

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
		$this->ajaxurl = admin_url('admin-ajax.php');



		add_action('init', array($this, 'init'));
		add_action('admin_menu', array($this, "admin_menu"));
		add_filter('plugin_action_links_' . plugin_basename(ANIMATE_GL_FILE), array($this, 'plugin_action_links'));

		if (is_admin()) {
			add_action('wp_ajax_agl_json', array($this,  'ajax_update_settings'));
		}

		add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));

		// Dynamic blocks: register the AnimateGL block attributes server-side and add the classes on render
		add_filter('register_block_type_args', array($this, 'register_block_attributes'), 10, 2);
		add_filter('render_block', array($this, 'render_block'), 10, 2);



		add_action('wp_enqueue_scripts', array($this, 'frontend_assets'));
		add_action('admin_enqueue_scripts', array($this, 'admin_assets'));

	}

	// Who can open the AnimateGL page and save its settings. Filter it to allow other roles.
	public static function capability()
	{
		return apply_filters('animategl_capability', 'manage_options');
	}

	// Scripts that load after the runtime (agl) and before it starts (agl-embed), on the front end, the
	// admin page and in the block editor. Add a handle to extend the runtime, for example with presets.
	public static function runtime_dependencies()
	{
		return array_values(array_unique(array_merge(array('agl'), (array) apply_filters('animategl_runtime_dependencies', array()))));
	}

	public function ajax_update_settings()
	{
		if (!current_user_can(self::capability())) {
			wp_send_json_error('Insufficient permissions', 403);
		}
		check_ajax_referer('agl_nonce', 'security');

		// The Animation Editor sends its settings as a JSON object; store it re-encoded
		$json = isset($_POST['json']) && is_string($_POST['json']) ? wp_unslash($_POST['json']) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- validated by json_decode() below and stored re-encoded
		$settings = json_decode($json, true);
		if (!is_array($settings)) {
			wp_send_json_error('Invalid settings', 400);
		}

		update_option('agl_json', wp_json_encode($settings));
		wp_send_json_success();
	}


	public function init()
	{
		if (did_action('elementor/loaded')) {
			// elementor installed and activated
			include_once(plugin_dir_path(ANIMATE_GL_FILE) . '/includes/el.php');
			AnimateGL_El::get_instance();
		}

		$version      = $this->version;
		$defer        = array('in_footer' => true, 'strategy' => 'defer');

		// register scripts
		wp_register_script('agl', $this->plugin_dir_url . 'js/lib/animategl.min.js', array(), $version, $defer);
		wp_register_script('agl-editor', $this->plugin_dir_url . 'js/lib/animategl.editor.min.js', array('agl'), $version);
		wp_register_script('agl-embed', $this->plugin_dir_url . 'js/embed.js', self::runtime_dependencies(), $version, $defer);
		wp_register_script('agl-admin', $this->plugin_dir_url . 'js/admin.js', array('agl-embed', 'agl-editor', 'jquery', 'wp-i18n'), $version);
		wp_set_script_translations('agl-admin', 'animategl');
		// Adds the agl-js class to <html> before the page renders, so CSS hides only elements that are about to animate
		wp_register_script('agl-head', false, array(), $version, false);
		wp_add_inline_script('agl-head', $this->head_script());
		// register styles
		wp_register_style('agl', $this->plugin_dir_url . 'css/animategl.css', array(), $version);
		wp_register_style('agl-admin', $this->plugin_dir_url . 'css/admin.css', array(), $version);
	}

	public function frontend_assets()
	{
		// Return false to skip loading AnimateGL, for example on pages that don't use it
		if (!apply_filters('animategl_enqueue', true)) {
			return;
		}

		wp_enqueue_style('agl');
		wp_enqueue_script('agl-head');
		wp_enqueue_script('agl-embed');
		wp_add_inline_script('agl-embed', $this->options_script(), 'before');
	}

	// Our admin page shows animated previews too
	public function admin_assets($hook)
	{
		if ('toplevel_page_agl_admin' === $hook) {
			wp_enqueue_script('agl-head');
		}
	}

	// Settings for embed.js: [saved animation settings (JSON), plugin URL, (the admin page's AJAX URL), webgl chunk URL]
	private function options_script()
	{
		return 'var agl_options = ' . wp_json_encode(array(get_option('agl_json'), $this->plugin_dir_url, null, $this->webgl_url())) . ';';
	}

	// The webgl chunk's URL, which the runtime loads only when a page needs WebGL. Passed to it because optimization
	// plugins move, rename or combine the runtime's script, so it can't always find the chunk next to itself.
	public function webgl_url()
	{
		return add_query_arg('ver', $this->version, $this->plugin_dir_url . 'js/lib/animategl.webgl.min.js');
	}

	// Runs in <head>. Visitors who prefer reduced motion get no agl-js class, so nothing is hidden.
	// If the runtime hasn't loaded shortly after DOMContentLoaded (blocked, failed, or delayed by an
	// optimization plugin), the class is removed again so the content shows.
	// It also creates the preset registry (agl.defaults.in), which the runtime keeps when it loads, so a
	// preset pack that an optimization plugin moved before the runtime still finds it (Animate GL/js/compat.js).
	private function head_script()
	{
		return "(function (d, w) {\n"
			. "\tvar agl = w.agl = w.agl || {}, defaults = agl.defaults = agl.defaults || {}, entrance = defaults.in = defaults.in || {};\n"
			. "\tentrance.presets = entrance.presets || {};\n"
			. "\tentrance.names = entrance.names || [];\n"
			. "\tif (w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches) return;\n"
			. "\tvar root = d.documentElement;\n"
			. "\troot.classList.add('agl-js');\n"
			. "\td.addEventListener('DOMContentLoaded', function () {\n"
			. "\t\tsetTimeout(function () { if (!w.AnimateGL) root.classList.remove('agl-js'); }, 1000);\n"
			. "\t});\n"
			. "})(document, window);";
	}

	// The block editor canvas is always an iframe since WP 7.1. The runtime (agl-embed) and
	// animategl.css are never loaded there: the runtime crashed the editor and the CSS hid animated
	// blocks. The settings panel reads the presets from `agl`, so it's a dependency, and Preview
	// plays animations in an overlay of its own (src/preview.js).
	public function enqueue_block_editor_assets()
	{
		$asset = include $this->plugin_dir_path . 'build/index.asset.php';

		wp_enqueue_script(
			'agl-block-options-script',
			$this->plugin_dir_url . 'build/index.js',
			array_merge($asset['dependencies'], self::runtime_dependencies()),
			$asset['version'],
			true // load in footer
		);
		wp_set_script_translations('agl-block-options-script', 'animategl');

		// For Preview: where the runtime lives, the scripts that extend it, and the settings saved on the AnimateGL page
		wp_add_inline_script(
			'agl-block-options-script',
			'var aglEditor = ' . wp_json_encode(array(
				'url'      => $this->plugin_dir_url,
				'version'  => $this->version,
				'scripts'  => self::runtime_extension_urls(),
				'settings' => get_option('agl_json'),
				// Lite's "More with Pro" row in the panel (src/index.js), empty to leave it out
				'proUrl'   => apply_filters('animategl_show_upsell', true) ? self::pro_url() : '',
			)) . ';',
			'before'
		);
	}

	// The scripts added through animategl_runtime_dependencies, so Preview loads them after the runtime too
	private static function runtime_extension_urls()
	{
		$urls = array();
		foreach (self::runtime_dependencies() as $handle) {
			$script = 'agl' === $handle ? null : wp_scripts()->query($handle, 'registered');
			if ($script && $script->src) {
				$urls[] = $script->ver ? add_query_arg('ver', $script->ver, $script->src) : $script->src;
			}
		}
		return $urls;
	}

	// The block attributes that build/index.js adds to every block in the editor
	private static $block_attributes = array(
		'aglInName'          => array('type' => 'string'),
		'aglInDirection'     => array('type' => 'string'),
		'aglInDuration'      => array('type' => 'number'),
		'aglInDelay'         => array('type' => 'number'),
		'aglInDistance'      => array('type' => 'number'),
		'aglInEasing'        => array('type' => 'string'),
		'aglRepeat'          => array('type' => 'boolean', 'default' => false),
		'aglLockToScrollbar' => array('type' => 'boolean', 'default' => false),
	);

	// The block attributes, including ones added through the animategl_block_attributes filter
	public static function block_attributes()
	{
		return (array) apply_filters('animategl_block_attributes', self::$block_attributes);
	}

	// Without these, the block renderer REST endpoint rejects dynamic blocks with
	// "Invalid parameter(s): attributes"
	public function register_block_attributes($args, $block_name = '')
	{
		$attributes = isset($args['attributes']) && is_array($args['attributes']) ? $args['attributes'] : array();
		$args['attributes'] = array_merge(self::block_attributes(), $attributes);
		return $args;
	}

	// Static blocks get the classes from the editor's save filter. Dynamic blocks have no saved
	// markup, so add the same classes to the first tag of their rendered output.
	public function render_block($block_content, $block)
	{
		if (empty($block['blockName']) || !class_exists('WP_HTML_Tag_Processor')) {
			return $block_content;
		}

		$block_type = WP_Block_Type_Registry::get_instance()->get_registered($block['blockName']);
		if (!$block_type || !$block_type->is_dynamic()) {
			return $block_content;
		}

		// Only now, so the animategl_block_classes filter runs for dynamic blocks only
		$classes = $this->get_block_classes(isset($block['attrs']) && is_array($block['attrs']) ? $block['attrs'] : array());
		if (!$classes) {
			return $block_content;
		}

		$tags = new WP_HTML_Tag_Processor($block_content);
		if (!$tags->next_tag()) {
			return $block_content;
		}

		// Dynamic blocks that also save markup (core/image) already have the classes
		$existing = preg_split('/\s+/', (string) $tags->get_attribute('class'), -1, PREG_SPLIT_NO_EMPTY);
		if (in_array('agl', $existing, true)) {
			return $block_content;
		}

		foreach ($classes as $class) {
			$tags->add_class($class);
		}

		return $tags->get_updated_html();
	}

	// Same classes as animationClasses() in src/classes.js. The animategl_block_classes filter
	// is the PHP side of the animategl.classes JS filter.
	private function get_block_classes($attrs)
	{
		$classes = (array) apply_filters('animategl_block_classes', $this->get_animation_classes($attrs), $attrs);
		return array_values(array_unique(array_filter($classes, 'is_string')));
	}

	private function get_animation_classes($attrs)
	{
		if (!isset($attrs['aglInName']) || !self::is_class_token($attrs['aglInName'])) {
			return array();
		}
		if ('custom' === $attrs['aglInName']) {
			return array('agl');
		}

		$preset = 'agl-' . $attrs['aglInName'];
		if (!empty($attrs['aglInDirection']) && self::is_class_token($attrs['aglInDirection'])) {
			$preset .= $attrs['aglInDirection'];
		}
		$classes = array('agl', $preset);

		if (!empty($attrs['aglInEasing']) && self::is_class_token($attrs['aglInEasing'])) {
			$classes[] = 'agl-in-easing-' . $attrs['aglInEasing'];
		}
		foreach (array('aglInDuration' => 'duration', 'aglInDelay' => 'delay', 'aglInDistance' => 'distance') as $key => $suffix) {
			if (!empty($attrs[$key]) && is_numeric($attrs[$key])) {
				$classes[] = 'agl-in-' . $suffix . '-' . ($attrs[$key] + 0);
			}
		}
		if (!empty($attrs['aglRepeat'])) {
			$classes[] = 'agl-in-repeat';
		}
		if (!empty($attrs['aglLockToScrollbar'])) {
			$classes[] = 'agl-in-lockToScrollbar';
		}

		return $classes;
	}

	// Attributes come from post content, so don't trust their type
	public static function is_class_token($value)
	{
		return is_string($value) && 1 === preg_match('/^[A-Za-z0-9_-]+$/', $value);
	}

	public function admin_menu()
	{
		add_menu_page(
			'AnimateGL',
			'AnimateGL',
			self::capability(),
			'agl_admin',
			array($this, "agl_admin"),
			self::menu_icon()
		);
	}

	// The "A" of img/agl-icon.svg in one colour, which WordPress tints to match the admin colour scheme
	public static function menu_icon()
	{
		$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333 281"><path fill="black" d="M256.76,63H227.175L199.987,1.6H122.611L95.509,63H125.1l-76.276,172.8H19.233L0,279.369H80.153L97.64,235.794h29.588l4.327-10.787H249.023l4.33,10.787H223.768l17.487,43.575H323l-19.3-43.575h29.585ZM154.648,167.469l35.644-88.813,35.641,88.813Z"/></svg>';
		return 'data:image/svg+xml;base64,' . base64_encode($svg); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode -- the menu icon format WordPress expects
	}

	// Where lite's "Get Pro" links go. TODO before 1.5 ships: point this at the live Pro page or Freemius Checkout.
	public static function pro_url()
	{
		return apply_filters('animategl_pro_url', 'https://animategl.com/pro/');
	}

	// Links under the plugin's name on the Plugins screen
	public function plugin_action_links($links)
	{
		$own = array(
			'settings' => sprintf('<a href="%s">%s</a>', esc_url(admin_url('admin.php?page=agl_admin')), esc_html__('Settings', 'animategl')),
			'docs' => sprintf('<a href="%s" target="_blank">%s</a>', esc_url('https://creativeinteractivemedia.gitbook.io/animategl-wp/'), esc_html__('Docs', 'animategl')),
		);
		// Return false to hide lite's links and panels that point to AnimateGL Pro (AnimateGL Pro does)
		if (apply_filters('animategl_show_upsell', true)) {
			$own['get-pro'] = sprintf('<a href="%s" target="_blank" style="color:#c2410c;font-weight:600">%s</a>', esc_url(self::pro_url()), esc_html__('Get Pro', 'animategl'));
		}
		return array_merge($own, $links);
	}

	public function agl_admin()
	{
		include_once('agl_admin.php');
	}

	}
