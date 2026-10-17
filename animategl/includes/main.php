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

		if (is_admin()) {
			add_action('wp_ajax_agl_json', array($this,  'ajax_update_settings'));
		}

		add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));

		// Dynamic blocks: register the AnimateGL block attributes server-side and add the classes on render
		add_filter('register_block_type_args', array($this, 'register_block_attributes'), 10, 2);
		add_filter('render_block', array($this, 'render_block'), 10, 2);



		add_action('wp_enqueue_scripts', array($this, 'frontend_assets'));

		register_activation_hook($this->path, array($this, "plugin_activated"));
	}

	public function plugin_activated()
	{
		if (defined('WP_DEBUG') && WP_DEBUG) {

			error_log("Animate GL activated");
		}
	}

	public function ajax_update_settings()
	{
		if (! current_user_can('manage_options')) {
			wp_send_json_error('Insufficient permissions', 403);
		}
		check_ajax_referer('agl_nonce', 'security');

		$json = sanitize_text_field(stripslashes($_POST['json']));

		update_option("agl_json", $json);

		die();
	}


	public function init()
	{
		load_plugin_textdomain('animate-gl', false, plugin_basename(dirname(ANIMATE_GL_FILE)) . '/languages');

		if (did_action('elementor/loaded')) {
			// elementor installed and activated
			include_once(plugin_dir_path(ANIMATE_GL_FILE) . '/includes/el.php');
			AnimateGL_El::get_instance();
		}

		$version      = $this->version;

		// register scripts
		wp_register_script('agl', $this->plugin_dir_url . 'js/lib/animategl.min.js', array(), $version);
		wp_register_script('agl-editor', $this->plugin_dir_url . 'js/lib/animategl.editor.min.js', array('agl'), $version);
		wp_register_script('agl-embed', $this->plugin_dir_url . 'js/embed.js', array('agl'), $version);
		wp_register_script('agl-admin', $this->plugin_dir_url . 'js/admin.js', array('agl-embed', 'agl-editor', 'jquery'), $version);
		// register styles
		wp_register_style('agl', $this->plugin_dir_url . 'css/animategl.css', array(), $version);
		wp_register_style('agl-admin', $this->plugin_dir_url . 'css/admin.css', array(), $version);
	}

	public function frontend_assets()
	{

		// if (!wp_script_is('agl', 'enqueued')) wp_enqueue_script("agl");
		// if (!wp_style_is('agl', 'enqueued')) 
		wp_enqueue_style("agl");

		// if (!wp_script_is('agl-embed', 'enqueued')) 
		wp_enqueue_script("agl-embed");

		if (is_admin_bar_showing() && !is_admin()) {
			// if (!wp_script_is('agl-admin', 'enqueued')) 
			// 	wp_enqueue_script("agl-admin");
			// if (!wp_script_is('agl-editor', 'enqueued')) 
			// 	wp_enqueue_script( "agl-editor"); 
			// if (!wp_style_is('agl-admin', 'enqueued')) 
			// 	wp_enqueue_style("agl-admin");
		}


		$agl_nonce = wp_create_nonce("agl_nonce");
		wp_localize_script('agl', 'agl_nonce', array($agl_nonce));

		$json = get_option('agl_json');
		wp_localize_script('agl-embed', 'agl_options', array($json, $this->plugin_dir_url, $this->ajaxurl));
	}

	// The block editor canvas is always an iframe since WP 7.1. The runtime (agl-embed) and
	// animategl.css are no longer loaded there: the runtime crashed the editor and the CSS hid
	// animated blocks. The settings panel only reads the presets from `agl`, so it's a dependency.
	public function enqueue_block_editor_assets()
	{
		wp_enqueue_script(
			'agl-block-options-script',
			$this->plugin_dir_url . 'build/index.js',
			array('agl', 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-hooks', 'wp-compose', 'wp-block-editor', 'wp-components'),
			$this->version,
			true // load in footer
		);
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

	// Without these, the block renderer REST endpoint rejects dynamic blocks with
	// "Invalid parameter(s): attributes"
	public function register_block_attributes($args, $block_name = '')
	{
		$attributes = isset($args['attributes']) && is_array($args['attributes']) ? $args['attributes'] : array();
		$args['attributes'] = array_merge(self::$block_attributes, $attributes);
		return $args;
	}

	// Static blocks get the classes from the editor's save filter. Dynamic blocks have no saved
	// markup, so add the same classes to the first tag of their rendered output.
	public function render_block($block_content, $block)
	{
		if (empty($block['attrs']['aglInName']) || empty($block['blockName']) || !class_exists('WP_HTML_Tag_Processor')) {
			return $block_content;
		}

		$block_type = WP_Block_Type_Registry::get_instance()->get_registered($block['blockName']);
		if (!$block_type || !$block_type->is_dynamic()) {
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

		foreach ($this->get_block_classes($block['attrs']) as $class) {
			$tags->add_class($class);
		}

		return $tags->get_updated_html();
	}

	// Same classes as saveSidebarSelectAttribute() in src/index.js
	private function get_block_classes($attrs)
	{
		if (!$this->is_class_token($attrs['aglInName'])) {
			return array();
		}
		if ('custom' === $attrs['aglInName']) {
			return array('agl');
		}

		$preset = 'agl-' . $attrs['aglInName'];
		if (!empty($attrs['aglInDirection']) && $this->is_class_token($attrs['aglInDirection'])) {
			$preset .= $attrs['aglInDirection'];
		}
		$classes = array('agl', $preset);

		if (!empty($attrs['aglInEasing']) && $this->is_class_token($attrs['aglInEasing'])) {
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
	private function is_class_token($value)
	{
		return is_string($value) && 1 === preg_match('/^[A-Za-z0-9_-]+$/', $value);
	}

	public function admin_menu()
	{
		add_menu_page(
			'AnimateGL',
			'AnimateGL',
			"publish_posts",
			'agl_admin',
			array($this, "agl_admin"),
			'dashicons-book'
		);
	}

	public function agl_admin()
	{
		include_once('agl_admin.php');
	}

	}
