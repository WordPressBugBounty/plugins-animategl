<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

/**
 * AnimateGL's abilities (the WordPress Abilities API, WordPress 6.9 and later), so AI tools can animate a site: list
 * the animations, find a page, read a post's blocks with their animations, and set animation classes on blocks. The
 * MCP Adapter plugin offers them to MCP clients such as Claude Code, Claude Desktop and Cursor (meta.public). An AI
 * tool adds classes to a block's Additional CSS class(es), which the editor keeps valid; settings made in a block's
 * AnimateGL panel are left as they are, and a block with them is refused, so a block never gets two entrances. Each
 * block's classes are checked with AnimateGL_Reference::validate(), so a class that would do nothing isn't saved.
 * Errors say what to do instead, and that nothing was saved: an MCP client gets only their message.
 */
class AnimateGL_Abilities
{
	const CATEGORY = 'animategl';

	public function __construct()
	{
		add_action('wp_abilities_api_categories_init', array($this, 'register_category'));
		add_action('wp_abilities_api_init', array($this, 'register_abilities'));
	}

	public function register_category()
	{
		wp_register_ability_category(self::CATEGORY, array(
			'label'       => __('AnimateGL', 'animategl'),
			'description' => __('WebGL and CSS animations for blocks: entrances, hover and scroll effects, text effects.', 'animategl'),
		));
	}

	public function register_abilities()
	{
		$post_id = array('type' => 'integer', 'description' => __('The ID of the post or page.', 'animategl'), 'minimum' => 1);
		$path = array(
			'type'        => 'array',
			'items'       => array('type' => 'integer', 'minimum' => 0),
			'minItems'    => 1,
			'description' => __('Where the block is, as animategl/get-page-animations gives it: its index among the top-level blocks, then among its parent\'s inner blocks.', 'animategl'),
		);

		wp_register_ability('animategl/find-pages', array(
			'label'               => __('Find pages to animate', 'animategl'),
			'description'         => __('Finds posts and pages the user can edit by title, with each one\'s ID, title, type, status, address, whether it\'s the site\'s home page and whether it\'s made with the block editor. Without a search: the home page and the latest ones. Use the ID with animategl/get-page-animations.', 'animategl'),
			'category'            => self::CATEGORY,
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array(
					'search' => array('type' => 'string', 'description' => __('Words from the title.', 'animategl')),
				),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'       => 'object',
				'properties' => array('pages' => array('type' => 'array')),
			),
			'execute_callback'    => array($this, 'find_pages'),
			'permission_callback' => array($this, 'can_edit_posts'),
			'meta'                => array(
				'public'       => true,
				'show_in_rest' => true,
				'annotations'  => array('readonly' => true, 'destructive' => false, 'idempotent' => true),
			),
		));

		wp_register_ability('animategl/list-animations', array(
			'label'               => __('List AnimateGL animations', 'animategl'),
			'description'         => __('Every AnimateGL entrance animation, direction, setting and effect (hover, scroll, loop, text, Pro\'s too when it\'s active), each with the CSS classes it gives and whether it needs AnimateGL Pro. An entrance is the class agl plus the animation\'s class, with one of its own directions at its end (agl agl-slideCSSUp). Where a value has "alone" classes, use those on a block without an entrance. Read the rules first. Pass the classes to animategl/set-block-animations.', 'animategl'),
			'category'            => self::CATEGORY,
			'output_schema'       => array(
				'type'       => 'object',
				'properties' => array(
					'pro'        => array('type' => 'boolean'),
					'rules'      => array('type' => 'array', 'items' => array('type' => 'string')),
					'entrances'  => array('type' => 'array'),
					'directions' => array('type' => 'array'),
					'controls'   => array('type' => 'array'),
				),
			),
			'execute_callback'    => array($this, 'list_animations'),
			'permission_callback' => array($this, 'can_edit_posts'),
			'meta'                => array(
				'public'       => true,
				'show_in_rest' => true,
				'annotations'  => array('readonly' => true, 'destructive' => false, 'idempotent' => true),
			),
		));

		wp_register_ability('animategl/get-page-animations', array(
			'label'               => __('Get a page\'s AnimateGL animations', 'animategl'),
			'description'         => __('A post or page (its type, status, address and whether it\'s the home page) and its blocks, with each block\'s path, name, the start of its text, its AnimateGL classes and whether it can be set. Find the ID with animategl/find-pages. Pass the paths and names to animategl/set-block-animations.', 'animategl'),
			'category'            => self::CATEGORY,
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array('post_id' => $post_id),
				'required'             => array('post_id'),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'       => 'object',
				'properties' => array(
					'post_id'    => array('type' => 'integer'),
					'title'      => array('type' => 'string'),
					'type'       => array('type' => 'string'),
					'status'     => array('type' => 'string'),
					'url'        => array('type' => 'string'),
					'front_page' => array('type' => 'boolean'),
					'blocks'     => array('type' => 'array'),
				),
			),
			'execute_callback'    => array($this, 'get_page_animations'),
			'permission_callback' => array($this, 'can_edit_posts'),
			'meta'                => array(
				'public'       => true,
				'show_in_rest' => true,
				'annotations'  => array('readonly' => true, 'destructive' => false, 'idempotent' => true),
			),
		));

		wp_register_ability('animategl/set-block-animations', array(
			'label'               => __('Set AnimateGL animations on blocks', 'animategl'),
			'description'         => __('Sets the AnimateGL classes of blocks in a post or page, in one save with a revision to undo it. Each block\'s AnimateGL classes in its Additional CSS class(es) are replaced with the ones given (an empty list removes them); its other classes stay. Each block is named by its path and its name, both from animategl/get-page-animations, and its classes must be ones animategl/list-animations gives, with what they need (an effect\'s "alone" classes on a block without an entrance). Blocks that can\'t be set (can_set false) are refused. If anything is refused, nothing is saved. If the page is open in the editor, the result says so: tell the user to reload it before saving there.', 'animategl'),
			'category'            => self::CATEGORY,
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array(
					'post_id' => $post_id,
					'blocks'  => array(
						'type'     => 'array',
						'minItems' => 1,
						'maxItems' => 200,
						'items'    => array(
							'type'                 => 'object',
							'properties'           => array(
								'path'    => $path,
								'name'    => array('type' => 'string', 'description' => __('The block\'s name at that path, as animategl/get-page-animations gives it, such as core/heading. A block that has another name is refused, as the page has changed.', 'animategl')),
								'classes' => array('type' => 'array', 'items' => array('type' => 'string'), 'description' => __('AnimateGL classes, such as agl, agl-fadeCSSUp and agl-in-delay-200.', 'animategl')),
							),
							'required'             => array('path', 'name', 'classes'),
							'additionalProperties' => false,
						),
					),
				),
				'required'             => array('post_id', 'blocks'),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'       => 'object',
				'properties' => array(
					'post_id'  => array('type' => 'integer'),
					'revision' => array('type' => 'integer'),
					'blocks'   => array('type' => 'array'),
					'edit_url' => array('type' => 'string'),
					'note'     => array('type' => 'string'),
				),
			),
			'execute_callback'    => array($this, 'set_block_animations'),
			'permission_callback' => array($this, 'can_edit_posts'),
			'meta'                => array(
				'public'       => true,
				'show_in_rest' => true,
				'annotations'  => array('readonly' => false, 'destructive' => false, 'idempotent' => true),
			),
		));
	}

	// Who may use the abilities. Each post is checked again in the ability, so a missing or locked one gets its own
	// message, not the Abilities API's "permission denied".
	public function can_edit_posts()
	{
		return current_user_can('edit_posts');
	}

	public function list_animations()
	{
		$reference = AnimateGL_Reference::get();
		// Pro is active when its controls are there
		$pro = (bool) array_filter($reference['controls'], function ($control) {
			return $control['pro'];
		});
		return array(
			'pro'        => $pro,
			'rules'      => AnimateGL_Reference::rules($pro),
			'entrances'  => $reference['entrances'],
			'directions' => $reference['directions'],
			'controls'   => $reference['controls'],
		);
	}

	// The post types a page to animate can be: public ones the block editor edits
	private static function post_types()
	{
		$types = array();
		foreach (get_post_types(array('public' => true), 'objects') as $name => $type) {
			if ('attachment' !== $name && !empty($type->show_in_rest)) {
				$types[] = $name;
			}
		}
		return $types;
	}

	private static function page_info($post)
	{
		$front = 'page' === get_option('show_on_front') ? (int) get_option('page_on_front') : 0;
		return array(
			'post_id'    => (int) $post->ID,
			'title'      => get_the_title($post),
			'type'       => $post->post_type,
			'status'     => $post->post_status,
			'url'        => (string) get_permalink($post),
			'front_page' => $front === (int) $post->ID,
		);
	}

	public function find_pages($input = null)
	{
		$search = is_array($input) && isset($input['search']) ? trim((string) $input['search']) : '';
		$args = array(
			'post_type'        => self::post_types(),
			'post_status'      => array('publish', 'draft', 'pending', 'private', 'future'),
			// More than are listed: the ones this user can't edit are left out below
			'posts_per_page'   => 100,
			'orderby'          => 'modified',
			'order'            => 'DESC',
			'suppress_filters' => false,
		);
		if ('' !== $search) {
			$args['s'] = $search;
			$args['search_columns'] = array('post_title');
		}
		$posts = get_posts($args);
		// The home page first when it's a page and nothing was searched for
		$front = 'page' === get_option('show_on_front') ? get_post((int) get_option('page_on_front')) : null;
		if ('' === $search && $front) {
			$posts = array_merge(array($front), array_filter($posts, function ($post) use ($front) {
				return (int) $post->ID !== (int) $front->ID;
			}));
		}
		$pages = array();
		foreach ($posts as $post) {
			// Only the ones this user can edit, so their titles aren't shown to someone who can't
			if (!current_user_can('edit_post', $post->ID)) {
				continue;
			}
			$pages[] = self::page_info($post) + array('blocks' => has_blocks($post->post_content));
			if (count($pages) >= 20) {
				break;
			}
		}
		return array('pages' => $pages);
	}

	/**
	 * The post's blocks, or a WP_Error for a missing post, one the user can't edit, a revision or an autosave (whose
	 * ID a client may come across: writing there wouldn't change the post) and a post the block editor didn't make
	 */
	private static function blocks($post_id)
	{
		$post = get_post($post_id);
		if (!$post || 'trash' === $post->post_status || !in_array($post->post_type, array_merge(self::post_types(), array('revision', 'wp_block', 'wp_template', 'wp_template_part')), true)) {
			/* translators: %d: a post ID */
			return new WP_Error('animategl_no_post', sprintf(__('There\'s no post or page with the ID %d. Find it by its title with animategl/find-pages.', 'animategl'), $post_id));
		}
		if ('revision' === $post->post_type) {
			/* translators: 1: a post ID, 2: a post ID */
			return new WP_Error('animategl_revision', sprintf(__('%1$d is a revision (an older copy) of the post %2$d, not a post. Use the ID %2$d.', 'animategl'), $post->ID, $post->post_parent));
		}
		if (!current_user_can('edit_post', $post->ID)) {
			/* translators: %d: a post ID */
			return new WP_Error('animategl_cant_edit', sprintf(__('This user can\'t edit the post %d.', 'animategl'), $post->ID));
		}
		if (!has_blocks($post->post_content)) {
			return new WP_Error('animategl_not_blocks', __('This post isn\'t made with the block editor. In Elementor, Bricks or Divi, add the classes in the element\'s CSS Classes field or use its AnimateGL controls.', 'animategl'));
		}
		return parse_blocks($post->post_content);
	}

	// A class AnimateGL reads: agl or agl-..., class-safe
	private static function is_agl_class($class)
	{
		return is_string($class) && 1 === preg_match('/^agl(-[A-Za-z0-9_-]+)?$/', $class);
	}

	private static function class_list($classes)
	{
		return preg_split('/\s+/', trim((string) $classes), -1, PREG_SPLIT_NO_EMPTY);
	}

	// The classes the block's AnimateGL panel gives it
	private static function panel_classes($block)
	{
		return AnimateGL::block_classes_for(isset($block['attrs']) && is_array($block['attrs']) ? $block['attrs'] : array());
	}

	private static function walk($blocks, $path, &$out)
	{
		foreach ($blocks as $index => $block) {
			if (empty($block['blockName'])) {
				continue;
			}
			$here = array_merge($path, array($index));
			$text = trim(preg_replace('/\s+/', ' ', wp_strip_all_tags(implode(' ', array_filter($block['innerContent'], 'is_string')))));
			$classes = isset($block['attrs']['className']) ? self::class_list($block['attrs']['className']) : array();
			$panel = self::panel_classes($block);
			$out[] = array(
				'path'    => $here,
				'name'    => $block['blockName'],
				'text'    => function_exists('mb_substr') ? mb_substr($text, 0, 80) : substr($text, 0, 80),
				'classes' => array_values(array_filter($classes, array(__CLASS__, 'is_agl_class'))),
				'panel'   => $panel,
				'can_set' => !$panel && self::supports_class($block['blockName']),
			);
			if (!empty($block['innerBlocks'])) {
				self::walk($block['innerBlocks'], $here, $out);
			}
		}
	}

	private static function supports_class($name)
	{
		$type = WP_Block_Type_Registry::get_instance()->get_registered($name);
		return !$type || block_has_support($type, 'customClassName', true);
	}

	public function get_page_animations($input)
	{
		$post_id = (int) $input['post_id'];
		$blocks = self::blocks($post_id);
		if (is_wp_error($blocks)) {
			return $blocks;
		}
		$out = array();
		self::walk($blocks, array(), $out);
		return self::page_info(get_post($post_id)) + array('blocks' => $out);
	}

	// Replaces a block's AnimateGL classes in its className and on the first tag of its saved markup
	private static function set_classes(&$block, $classes)
	{
		$old = isset($block['attrs']['className']) ? self::class_list($block['attrs']['className']) : array();
		$remove = array_values(array_filter($old, array(__CLASS__, 'is_agl_class')));
		$kept = array_values(array_diff($old, $remove));
		$all = array_values(array_unique(array_merge($kept, $classes)));
		if ($all) {
			$block['attrs']['className'] = implode(' ', $all);
		} else {
			unset($block['attrs']['className']);
		}
		// The saved markup's first tag carries className (dynamic blocks have none and add it when rendered)
		foreach ($block['innerContent'] as $i => $chunk) {
			if (!is_string($chunk) || '' === trim($chunk)) {
				continue;
			}
			$tags = new WP_HTML_Tag_Processor($chunk);
			if ($tags->next_tag()) {
				foreach ($remove as $class) {
					$tags->remove_class($class);
				}
				foreach ($classes as $class) {
					$tags->add_class($class);
				}
				$block['innerContent'][$i] = $tags->get_updated_html();
			}
			break;
		}
		$block['innerHTML'] = implode('', array_filter($block['innerContent'], 'is_string'));
	}

	// The block at $path in $blocks, by reference, or null
	private static function &at(&$blocks, $path)
	{
		$none = null;
		$index = array_shift($path);
		if (!isset($blocks[$index]) || empty($blocks[$index]['blockName'])) {
			return $none;
		}
		if ($path) {
			return self::at($blocks[$index]['innerBlocks'], $path);
		}
		return $blocks[$index];
	}

	// "[0, 2] (core/heading)", for messages
	private static function where($path, $name)
	{
		return '[' . implode(', ', $path) . ']' . ($name ? ' (' . $name . ')' : '');
	}

	public function set_block_animations($input)
	{
		$post_id = (int) $input['post_id'];
		$blocks = self::blocks($post_id);
		if (is_wp_error($blocks)) {
			return $blocks;
		}
		$nothing = ' ' . __('Nothing was saved.', 'animategl');
		$done = array();
		foreach ($input['blocks'] as $change) {
			$path = array_map('intval', (array) $change['path']);
			$name = isset($change['name']) ? (string) $change['name'] : '';
			$classes = array_values(array_unique(array_map('strval', (array) $change['classes'])));
			$block = &self::at($blocks, $path);
			if (null === $block) {
				/* translators: %s: a block's path */
				return new WP_Error('animategl_no_block', sprintf(__('There\'s no block at %s. Get the paths with animategl/get-page-animations: top-level blocks can be 0, 2, 4, as the gaps between them count too.', 'animategl'), self::where($path, '')) . $nothing, array('path' => $path));
			}
			if ($block['blockName'] !== $name) {
				/* translators: 1: a block's path, 2: a block name, 3: a block name */
				$error = new WP_Error('animategl_wrong_block', sprintf(__('The block at %1$s is a %2$s, not a %3$s: the page has changed. Get the blocks again with animategl/get-page-animations.', 'animategl'), self::where($path, ''), $block['blockName'], $name ?: '?') . $nothing, array('path' => $path));
				unset($block);
				return $error;
			}
			if (self::panel_classes($block) || !self::supports_class($block['blockName'])) {
				/* translators: %s: a block's path and name */
				$error = new WP_Error('animategl_panel', sprintf(__('The block %s has its animation set in its AnimateGL panel, or takes no classes: change it in the editor.', 'animategl'), self::where($path, $name)) . $nothing, array('path' => $path));
				unset($block);
				return $error;
			}
			foreach ($classes as $class) {
				if (!self::is_agl_class($class)) {
					/* translators: 1: a class name, 2: a block's path and name */
					$error = new WP_Error('animategl_bad_class', sprintf(__('"%1$s" (block %2$s) isn\'t an AnimateGL class: AnimateGL classes start with agl. Set other classes in the editor.', 'animategl'), $class, self::where($path, $name)) . $nothing, array('path' => $path));
					unset($block);
					return $error;
				}
			}
			$valid = $classes ? AnimateGL_Reference::validate($classes) : true;
			if (is_wp_error($valid)) {
				/* translators: 1: a block's path and name, 2: why */
				$error = new WP_Error($valid->get_error_code(), sprintf(__('Block %1$s: %2$s', 'animategl'), self::where($path, $name), $valid->get_error_message()) . $nothing, array('path' => $path));
				unset($block);
				return $error;
			}
			self::set_classes($block, $classes);
			unset($block);
			$done[] = array('path' => $path, 'name' => $name, 'classes' => $classes);
		}
		// The post as it was, in its revisions (WordPress keeps only the new version when the old one has none yet)
		$revision = wp_save_post_revision($post_id);
		if (!$revision || is_wp_error($revision)) {
			// Already in the revisions: the newest one is the post as it is now
			$revisions = wp_get_post_revisions($post_id, array('posts_per_page' => 1, 'fields' => 'ids'));
			$revision = $revisions ? reset($revisions) : 0;
		}
		$open = self::open_in_editor($post_id);
		$saved = wp_update_post(array('ID' => $post_id, 'post_content' => wp_slash(serialize_blocks($blocks))), true);
		if (is_wp_error($saved)) {
			return $saved;
		}
		$result = array(
			'post_id'  => $post_id,
			// The revision to restore to undo this
			'revision' => (int) $revision,
			'blocks'   => $done,
			'edit_url' => (string) get_edit_post_link($post_id, 'raw'),
		);
		if ($open) {
			/* translators: %s: a user's name */
			$result['note'] = sprintf(__('This page is open in the block editor (%s). Tell the user to reload the editor before changing anything there: saving the page there without reloading undoes these animations.', 'animategl'), $open);
		}
		return $result;
	}

	// Who has the post open in the block editor now (its edit lock, as wp_check_post_lock() reads it, but also for the
	// user the ability runs as), or ''
	private static function open_in_editor($post_id)
	{
		$lock = explode(':', (string) get_post_meta($post_id, '_edit_lock', true));
		if (count($lock) < 2 || time() - (int) $lock[0] > apply_filters('wp_check_post_lock_window', 150)) {
			return '';
		}
		$user = get_userdata((int) $lock[1]);
		return $user ? $user->display_name : __('someone', 'animategl');
	}
}
