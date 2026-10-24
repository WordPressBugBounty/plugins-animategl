<?php defined('ABSPATH') || exit;

// Return false to hide lite's links and panels that point to AnimateGL Pro (AnimateGL Pro does)
$animategl_upsell = apply_filters('animategl_show_upsell', true);
$animategl_title = apply_filters('animategl_admin_title', 'AnimateGL');
$animategl_img = $this->plugin_dir_url . 'img/';

// Page builders without an AnimateGL panel of their own, where an animation is added with its CSS classes
$animategl_builders = array(
	'ET_BUILDER_VERSION' => array('Divi', __('Module settings > Advanced > CSS ID & Classes > CSS Class', 'animategl')),
	'FL_BUILDER_VERSION' => array('Beaver Builder', __('Module settings > Advanced > HTML Element > Class', 'animategl')),
	'BRICKS_VERSION' => array('Bricks', __('Element > Style > CSS > CSS classes', 'animategl')),
	'__BREAKDANCE_VERSION' => array('Breakdance', __('Element > Settings > Advanced > Classes', 'animategl')),
	'CT_VERSION' => array('Oxygen', __('Element > Selector field: add each class', 'animategl')),
	'WPB_VC_VERSION' => array('WPBakery', __('Element settings > Extra class name', 'animategl')),
);
$animategl_active_builders = array();
foreach ($animategl_builders as $animategl_constant => $animategl_builder) {
	if (defined($animategl_constant)) {
		$animategl_active_builders[] = $animategl_builder[0];
	}
}

// The Home tab's status card: each line is array('state' => 'ok'|'warn', 'text' => ...). AnimateGL Pro adds
// its license, rules and saved animations.
$animategl_status = array(
	array(
		'state' => 'ok',
		/* translators: %s: the plugin's version */
		'text' => sprintf(__('Version %s is active.', 'animategl'), ANIMATE_GL_VERSION),
	),
);
if ($animategl_active_builders) {
	$animategl_status[] = array(
		'state' => 'ok',
		/* translators: %s: page builder names */
		'text' => sprintf(__('Found %s. Add animations there with CSS classes: the class builder on the Animations tab writes them.', 'animategl'), implode(', ', $animategl_active_builders)),
	);
}
$animategl_status = (array) apply_filters('animategl_admin_status', $animategl_status);

// The Animations tab's effect cards: clips recorded from AnimateGL Pro (img/effects/), so lite shows them without
// Pro's code. [clip, filter, title, classes]
$animategl_effects = array(
	array('hover-zoom', 'hover', __('Zoom in', 'animategl'), 'agl agl-in-none agl-hover-zoom'),
	array('hover-liquid', 'hover', __('Liquid', 'animategl'), 'agl agl-in-none agl-hover-liquid'),
	array('hover-ripple', 'hover', __('Ripple', 'animategl'), 'agl agl-in-none agl-hover-ripple'),
	array('hover-pixels', 'hover', __('Pixel smear', 'animategl'), 'agl agl-in-none agl-hover-pixels'),
	array('hover-reveal', 'hover', __('Colour under the mouse', 'animategl'), 'agl agl-in-none agl-hover-reveal'),
	array('hover-spotlight', 'hover', __('Spotlight', 'animategl'), 'agl agl-in-none agl-hover-spotlight'),
	array('hover-swap', 'hover', __('Image swap', 'animategl'), 'agl agl-in-none agl-hover-swap'),
	array('hover-tilt', 'hover', __('Tilt', 'animategl'), 'agl agl-in-none agl-hover-tilt'),
	array('scroll-bend', 'scroll', __('Bend', 'animategl'), 'agl agl-fadeUp agl-scroll-bend'),
	array('scroll-skew', 'scroll', __('Skew', 'animategl'), 'agl agl-fadeCSSUp agl-scroll-skew'),
	array('text-split', 'text', __('Split text into words', 'animategl'), 'agl agl-slideCSSUp agl-split-words'),
	array('text-stagger', 'text', __('Stagger inner elements', 'animategl'), 'agl agl-zoomInCSSUp agl-stagger-120'),
);
$animategl_effect_groups = array(
	'hover' => __('Hover effects', 'animategl'),
	'scroll' => __('Scroll effects', 'animategl'),
	'text' => __('Stagger and text split', 'animategl'),
);

$animategl_tab_link = function ($id, $label) {
	printf('<a href="#%s" class="nav-tab">%s</a>', esc_attr($id), esc_html($label));
};
?>
<div class="wrap agl-admin-wrap">
	<h1 class="agl-admin-title"><?php echo esc_html($animategl_title); ?> <span class="agl-admin-version"><?php echo esc_html(ANIMATE_GL_VERSION); ?></span></h1>

	<h2 class="nav-tab-wrapper">
		<?php
		$animategl_tab_link('home', __('Home', 'animategl'));
		$animategl_tab_link('animations', __('Animations', 'animategl'));
		$animategl_tab_link('animation-editor', __('Editor', 'animategl'));
		// Add tabs: <a href="#my-tab" class="nav-tab">, with a matching <div id="my-tab" class="tab-content"> from animategl_admin_tab_content
		do_action('animategl_admin_tabs');
		$animategl_tab_link('help', __('Help', 'animategl'));
		if ($animategl_upsell) {
			$animategl_tab_link('get-pro', __('Get Pro', 'animategl'));
		}
		?>
	</h2>

	<div id="home" class="tab-content" style="display:none;">
		<div class="agl-home-grid">
			<div class="agl-box">
				<h2><?php esc_html_e('Three ways to animate', 'animategl'); ?></h2>
				<div class="agl-way">
					<strong><?php esc_html_e('Block editor', 'animategl'); ?></strong>
					<span><?php esc_html_e('Select a block and open AnimateGL in the sidebar, or click the AnimateGL button in the block toolbar.', 'animategl'); ?></span>
				</div>
				<?php if (did_action('elementor/loaded')) : ?>
					<div class="agl-way">
						<strong><?php esc_html_e('Elementor', 'animategl'); ?></strong>
						<?php /* translators: %s is the plugin name (AnimateGL) */ ?>
						<span><?php printf(esc_html__('Element > Advanced > %s', 'animategl'), 'AnimateGL'); ?></span>
					</div>
				<?php endif; ?>
				<div class="agl-way">
					<strong><?php esc_html_e('Any HTML or page builder', 'animategl'); ?></strong>
					<span><?php esc_html_e('Add the classes of an animation to the element:', 'animategl'); ?>
						<code class="agl-copy-text">agl agl-fadeCSSLeft</code>
						<button type="button" class="button button-small agl-copy"><?php esc_html_e('Copy', 'animategl'); ?></button></span>
				</div>
				<p class="agl-home-actions">
					<a href="#animations" class="button button-primary agl-tab-link"><?php esc_html_e('Browse animations', 'animategl'); ?></a>
					<a href="#animation-editor" class="button agl-tab-link"><?php esc_html_e('Open the editor', 'animategl'); ?></a>
				</p>
			</div>
			<div class="agl-box agl-status">
				<h2><?php esc_html_e('Status', 'animategl'); ?></h2>
				<ul>
					<?php foreach ($animategl_status as $animategl_line) : ?>
						<?php if (is_array($animategl_line) && isset($animategl_line['text'])) : ?>
							<li class="agl-status-<?php echo 'warn' === ($animategl_line['state'] ?? '') ? 'warn' : 'ok'; ?>"><?php echo esc_html($animategl_line['text']); ?></li>
						<?php endif; ?>
					<?php endforeach; ?>
				</ul>
				<?php if ($animategl_upsell) : ?>
					<p><a href="#get-pro" class="agl-tab-link"><?php esc_html_e('Hover and scroll effects, triggers and more with AnimateGL Pro', 'animategl'); ?></a></p>
				<?php endif; ?>
			</div>
		</div>
		<div class="agl-box agl-whats-new">
			<h2><?php esc_html_e('New in 1.5', 'animategl'); ?></h2>
			<ul>
				<li><?php esc_html_e('Pages with only CSS animations load less: the WebGL part loads only where it is used.', 'animategl'); ?></li>
				<li><?php esc_html_e('Preview button in the block editor, and animations play as you pick them.', 'animategl'); ?></li>
				<li><?php esc_html_e('AnimateGL controls in the block toolbar, also for blocks in locked patterns and templates.', 'animategl'); ?></li>
				<li><?php esc_html_e('Respects the reduced motion setting, and content stays visible without JavaScript.', 'animategl'); ?></li>
			</ul>
			<p><a href="<?php echo esc_url('https://wordpress.org/plugins/animategl/#developers'); ?>" target="_blank"><?php esc_html_e('Full changelog', 'animategl'); ?></a></p>
		</div>
	</div>

	<div id="animations" class="tab-content" style="display:none;">
		<p class="description"><?php esc_html_e('Ready-made entrance animations and effects. Move the mouse over one to play it. Pick one in the block editor or Elementor, add its CSS classes to any element, or customize an entrance in the editor.', 'animategl'); ?></p>

		<details class="agl-box agl-class-builder" <?php echo $animategl_active_builders ? 'open' : ''; ?>>
			<summary><?php esc_html_e('Class builder: write the classes for a page builder or your own HTML', 'animategl'); ?></summary>
			<div class="agl-class-builder-body">
				<div class="agl-class-builder-fields">
					<p><label for="agl-cb-preset"><?php esc_html_e('Animation', 'animategl'); ?></label><select id="agl-cb-preset"></select></p>
					<p><label for="agl-cb-duration"><?php esc_html_e('Duration (ms)', 'animategl'); ?></label><input type="number" id="agl-cb-duration" min="0" step="100" placeholder="<?php esc_attr_e('Default', 'animategl'); ?>"></p>
					<p><label for="agl-cb-delay"><?php esc_html_e('Delay (ms)', 'animategl'); ?></label><input type="number" id="agl-cb-delay" min="0" step="100" placeholder="0"></p>
					<p><label for="agl-cb-easing"><?php esc_html_e('Easing', 'animategl'); ?></label><select id="agl-cb-easing">
						<option value=""><?php esc_html_e('Default', 'animategl'); ?></option>
						<?php foreach (array('linear', 'easeOutSine', 'easeOutQuad', 'easeOutCubic', 'easeOutExpo', 'easeInOutSine', 'easeInOutCubic', 'easeOutBack') as $animategl_easing) : ?>
							<option value="<?php echo esc_attr($animategl_easing); ?>"><?php echo esc_html($animategl_easing); ?></option>
						<?php endforeach; ?>
					</select></p>
					<p><label><input type="checkbox" id="agl-cb-repeat"> <?php esc_html_e('Play again each time it scrolls into view', 'animategl'); ?></label></p>
				</div>
				<div class="agl-class-builder-result">
					<img class="agl-class-builder-preview" src="<?php echo esc_url($animategl_img . 'cyber2.jpg'); ?>" alt="">
					<p><code class="agl-copy-text" id="agl-cb-classes">agl</code> <button type="button" class="button button-primary agl-copy"><?php esc_html_e('Copy classes', 'animategl'); ?></button></p>
				</div>
			</div>
			<div class="agl-class-builder-where">
				<strong><?php esc_html_e('Where to paste them', 'animategl'); ?></strong>
				<ul>
					<?php foreach ($animategl_builders as $animategl_builder) : ?>
						<li><b><?php echo esc_html($animategl_builder[0]); ?>:</b> <?php echo esc_html($animategl_builder[1]); ?></li>
					<?php endforeach; ?>
					<li><b><?php esc_html_e('HTML', 'animategl'); ?>:</b> <code>&lt;div class="agl agl-fadeCSSLeft"&gt;</code></li>
				</ul>
			</div>
		</details>

		<div class="agl-gallery-filters">
			<div class="agl-chips" role="group" aria-label="<?php esc_attr_e('Show', 'animategl'); ?>">
				<button type="button" class="agl-chip is-active" data-filter="all" aria-pressed="true"><?php esc_html_e('All', 'animategl'); ?></button>
				<button type="button" class="agl-chip" data-filter="css" aria-pressed="false"><?php esc_html_e('CSS', 'animategl'); ?></button>
				<button type="button" class="agl-chip" data-filter="webgl" aria-pressed="false"><?php esc_html_e('WebGL', 'animategl'); ?></button>
				<?php foreach ($animategl_effect_groups as $animategl_group => $animategl_group_title) : ?>
					<button type="button" class="agl-chip" data-filter="<?php echo esc_attr($animategl_group); ?>" aria-pressed="false"><?php echo esc_html($animategl_group_title); ?></button>
				<?php endforeach; ?>
				<button type="button" class="agl-chip" data-filter="mine" aria-pressed="false" hidden><?php esc_html_e('My animations', 'animategl'); ?></button>
			</div>
			<label class="screen-reader-text" for="agl-gallery-search"><?php esc_html_e('Search animations', 'animategl'); ?></label>
			<input type="search" id="agl-gallery-search" placeholder="<?php esc_attr_e('Search animations', 'animategl'); ?>">
		</div>

		<div class="agl-presets-container">
			<div class="agl-preset">
				<img class="agl-preset-preview preset" src="<?php echo esc_url($animategl_img . 'cyber4.jpg'); ?>" alt="" />
				<div class="agl-preset-info">
					<span class="agl-preset-title"></span>
					<code class="agl-preset-class agl-copy-text"></code>
					<span class="agl-preset-buttons">
						<button type="button" class="button button-small agl-copy"><?php esc_html_e('Copy', 'animategl'); ?></button>
						<button type="button" class="button button-small agl-play"><?php esc_html_e('Replay', 'animategl'); ?></button>
						<button type="button" class="button button-small agl-customize"><?php esc_html_e('Customize', 'animategl'); ?></button>
					</span>
				</div>
			</div>
			<?php foreach ($animategl_effect_groups as $animategl_group => $animategl_group_title) : ?>
				<h2 class="agl-preset-group" data-type="<?php echo esc_attr($animategl_group); ?>"><?php echo esc_html($animategl_group_title); ?><?php if ($animategl_upsell) : ?> <span class="agl-pro-badge">Pro</span><?php endif; ?></h2>
				<?php foreach ($animategl_effects as $animategl_effect) : ?>
					<?php if ($animategl_effect[1] !== $animategl_group) continue; ?>
					<div class="agl-preset agl-effect" data-type="<?php echo esc_attr($animategl_group); ?>" data-search="<?php echo esc_attr(strtolower($animategl_effect[2] . ' ' . $animategl_group_title . ' ' . $animategl_effect[3])); ?>">
						<video class="agl-preset-preview" src="<?php echo esc_url($animategl_img . 'effects/' . $animategl_effect[0] . '.mp4'); ?>" poster="<?php echo esc_url($animategl_img . 'effects/' . $animategl_effect[0] . '.jpg'); ?>" muted loop playsinline preload="none"></video>
						<div class="agl-preset-info">
							<span class="agl-preset-title"><?php echo esc_html($animategl_effect[2]); ?></span>
							<?php if ($animategl_upsell) : ?>
								<span class="agl-preset-buttons"><a href="#get-pro" class="button button-small agl-tab-link"><?php esc_html_e('Get Pro', 'animategl'); ?></a></span>
							<?php else : ?>
								<code class="agl-preset-class agl-copy-text"><?php echo esc_html($animategl_effect[3]); ?></code>
								<span class="agl-preset-buttons"><button type="button" class="button button-small agl-copy"><?php esc_html_e('Copy', 'animategl'); ?></button></span>
							<?php endif; ?>
						</div>
					</div>
				<?php endforeach; ?>
			<?php endforeach; ?>
		</div>
		<p class="agl-gallery-empty" hidden><?php esc_html_e('No animations match.', 'animategl'); ?></p>
		<img hidden data-agl-sample="1" src="<?php echo esc_url($animategl_img . 'cyber1.jpg'); ?>" alt="">
		<img hidden data-agl-sample="2" src="<?php echo esc_url($animategl_img . 'cyber3.jpg'); ?>" alt="">
	</div>

	<div id="animation-editor" class="tab-content" style="display:none;">
		<p class="description"><?php esc_html_e('Design the default animation: the one blocks set to "Default" use, and elements with only the agl class.', 'animategl'); ?></p>
		<div class="agl-editor-layout">
			<div class="agl-editor-stage">
				<img src="<?php echo esc_url($animategl_img . 'cyber4.jpg'); ?>" class="agl agl-editor" alt="" />
			</div>
			<div id="aglEditor"></div>
		</div>
		<p class="agl-editor-actions">
			<button type="button" class="button agl-editor-replay"><?php esc_html_e('Replay', 'animategl'); ?></button>
			<button type="button" class="button button-primary agl-editor-save"><?php esc_html_e('Save as default', 'animategl'); ?></button>
			<button type="button" class="button-link agl-editor-reset"><?php esc_html_e('Restore the original default', 'animategl'); ?></button>
			<span class="agl-editor-message" role="status"></span>
		</p>
	</div>

	<div id="help" class="tab-content" style="display:none;">
		<div class="agl-help-grid">
			<div class="agl-box">
				<h2><?php esc_html_e('Documentation', 'animategl'); ?></h2>
				<p><?php esc_html_e('Guides for the block editor, Elementor, CSS classes and every setting.', 'animategl'); ?></p>
				<p><a href="<?php echo esc_url('https://creativeinteractivemedia.gitbook.io/animategl-wp/'); ?>" target="_blank" class="button"><?php esc_html_e('Read the documentation', 'animategl'); ?></a></p>
			</div>
			<div class="agl-box">
				<h2><?php esc_html_e('Get help or ask for a feature', 'animategl'); ?></h2>
				<?php
				// Where the Help tab sends support requests. AnimateGL Pro sends them to its own support.
				$animategl_support = apply_filters('animategl_support_url', 'https://wordpress.org/support/plugin/animategl/');
				?>
				<p><?php esc_html_e('Found a bug, or missing something? Tell us, and paste the system info below into your message.', 'animategl'); ?></p>
				<p><a href="<?php echo esc_url($animategl_support); ?>" target="_blank" class="button"><?php esc_html_e('Contact support', 'animategl'); ?></a></p>
			</div>
		</div>
		<div class="agl-box">
			<h2><?php esc_html_e('System info', 'animategl'); ?></h2>
			<?php
			$animategl_theme = wp_get_theme();
			$animategl_info = array(
				'Plugin' => $animategl_title . ' ' . ANIMATE_GL_VERSION,
				'WordPress' => get_bloginfo('version') . (is_multisite() ? ' (multisite)' : ''),
				'PHP' => PHP_VERSION,
				'Theme' => $animategl_theme->get('Name') . ' ' . $animategl_theme->get('Version'),
				'Elementor' => defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : '-',
				'Page builders' => $animategl_active_builders ? implode(', ', $animategl_active_builders) : '-',
			);
			$animategl_info_text = '';
			foreach ($animategl_info as $animategl_key => $animategl_value) {
				$animategl_info_text .= $animategl_key . ': ' . $animategl_value . "\n";
			}
			foreach ($animategl_status as $animategl_line) {
				if (is_array($animategl_line) && isset($animategl_line['text'])) {
					$animategl_info_text .= '- ' . $animategl_line['text'] . "\n";
				}
			}
			?>
			<textarea readonly rows="9" class="large-text code agl-copy-text agl-system-info"><?php echo esc_textarea(trim($animategl_info_text)); ?></textarea>
			<p><button type="button" class="button agl-copy"><?php esc_html_e('Copy system info', 'animategl'); ?></button></p>
		</div>
		<div class="agl-box">
			<h2><?php esc_html_e('Videos', 'animategl'); ?></h2>
			<div class="agl-videos">
				<?php if (did_action('elementor/loaded')) : ?>
					<iframe loading="lazy" title="<?php esc_attr_e('AnimateGL in Elementor', 'animategl'); ?>" src="https://www.youtube-nocookie.com/embed/THDw4gIoWHw?rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<?php endif; ?>
				<iframe loading="lazy" title="<?php esc_attr_e('AnimateGL in the block editor', 'animategl'); ?>" src="https://www.youtube-nocookie.com/embed/-PUOAmwmV78?rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
		</div>
	</div>

	<?php if ($animategl_upsell) : ?>
	<div id="get-pro" class="tab-content" style="display:none;">
		<div class="agl-box agl-get-pro">
			<h2><?php esc_html_e('AnimateGL Pro', 'animategl'); ?></h2>
			<p><?php esc_html_e('Everything in AnimateGL, plus effects that react to the mouse and the scrollbar, animations that start on a click or after each other, and rules that animate a whole site at once.', 'animategl'); ?></p>
			<table class="widefat striped agl-compare">
				<thead><tr><th></th><th><?php esc_html_e('AnimateGL', 'animategl'); ?></th><th><?php esc_html_e('Pro', 'animategl'); ?></th></tr></thead>
				<tbody>
					<?php
					$animategl_features = array(
						array(__('CSS and WebGL entrance animations', 'animategl'), true),
						array(__('Block editor, Elementor and CSS classes', 'animategl'), true),
						array(__('Animation editor for the default animation', 'animategl'), true),
						array(__('Entrance Pack and Fade Pack presets', 'animategl'), false),
						array(__('Saved animations library, with import and export', 'animategl'), false),
						array(__('WebGL hover effects: liquid, ripple, reveal, image swap and more', 'animategl'), false),
						array(__('Scroll effects: bend, skew and more', 'animategl'), false),
						array(__('Start on a click, on a class, or after another block', 'animategl'), false),
						array(__('Stagger groups and split text into words', 'animategl'), false),
						array(__('Turn off per device, play once per visit', 'animategl'), false),
						array(__('Site-wide rules for block types and CSS selectors', 'animategl'), false),
					);
					foreach ($animategl_features as $animategl_feature) :
						?>
						<tr>
							<td><?php echo esc_html($animategl_feature[0]); ?></td>
							<td><?php echo $animategl_feature[1] ? '<span class="dashicons dashicons-yes" aria-label="' . esc_attr__('Yes', 'animategl') . '"></span>' : '<span aria-label="' . esc_attr__('No', 'animategl') . '">&ndash;</span>'; ?></td>
							<td><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'animategl'); ?>"></span></td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
			<?php if (class_exists('AGL_Entrance_Pack') || class_exists('AGL_Entrance_Fade_Pack')) : ?>
				<p class="description"><?php esc_html_e('You have a pack installed. Pro includes both packs, so you can deactivate it once Pro is active.', 'animategl'); ?></p>
			<?php endif; ?>
			<p class="agl-get-pro-actions">
				<a href="<?php echo esc_url(AnimateGL::pro_url()); ?>" target="_blank" class="button button-primary button-hero"><?php esc_html_e('Get AnimateGL Pro', 'animategl'); ?></a>
				<a href="<?php echo esc_url('https://animategl.com/'); ?>" target="_blank" class="button button-hero"><?php esc_html_e('See it live', 'animategl'); ?></a>
			</p>
		</div>
	</div>
	<?php endif; ?>

	<?php do_action('animategl_admin_tab_content'); ?>
</div>

<?php
wp_enqueue_script('agl-admin');
wp_enqueue_style('agl-admin');
wp_enqueue_style('agl');

$animategl_nonce = wp_create_nonce('agl_nonce');
wp_localize_script('agl-admin', 'agl_localize_script', array($animategl_nonce, esc_js(get_option('agl_json'))));

$animategl_json = get_option('agl_json');
wp_localize_script('agl-embed', 'agl_options', array($animategl_json, $this->plugin_dir_url, $this->ajaxurl, $this->webgl_url()));

do_action('agl_admin_after_enqueue_scripts'); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- AnimateGL Pro enqueues its admin scripts here, after this page's
?>
