<div class="wrap agl-admin-wrap">
	<h1><?php esc_html_e('AnimateGL', 'animate-gl'); ?></h1>

	<h2 class="nav-tab-wrapper">
		<a href="#getting-started" class="nav-tab"><?php esc_html_e('Getting Started', 'animate-gl'); ?></a>
		<a href="#presets" class="nav-tab"><?php esc_html_e('Entrance Presets', 'animate-gl'); ?></a>
		<a href="#default-entrance" class="nav-tab"><?php esc_html_e('Animation Editor', 'animate-gl'); ?></a>
		<a href="#addons" class="nav-tab"><?php esc_html_e('Addons', 'animate-gl'); ?></a>
		<a href="#support" class="nav-tab"><?php esc_html_e('Support', 'animate-gl'); ?></a>
	</h2>

	<div id="default-entrance" class="tab-content" style="display:none;">
		<p><?php esc_html_e('Edit the animation with Live editor.', 'animate-gl'); ?></p>
		<h2><?php esc_html_e('Custom Animations', 'animate-gl'); ?></h2>
		<table class="wp-list-table widefat fixed striped">
			<thead>
				<tr>
					<th><?php esc_html_e('Name', 'animate-gl'); ?></th>
					<th><?php esc_html_e('Preview', 'animate-gl'); ?></th>
					<th><?php esc_html_e('CSS Class', 'animate-gl'); ?></th>
				</tr>
			</thead>
			<tbody>
				<tr class="alternate" style="background-color: #f9f9f9;">
					<td>
						<?php esc_html_e('Default', 'animate-gl'); ?>
						<div class="row-actions">
							<?php /* translators: Link text for playing an animation */ ?>
							<a class="play" href="#"><?php esc_html_e('Play', 'animate-gl'); ?></a>
						</div>
					</td>
					<td>
						<img src="<?php echo esc_url($this->plugin_dir_url . 'img/cyber4.jpg'); ?>"
							class="agl agl-editor" style="height:150px;" />
					</td>
					<td>
						<code>agl</code>
						<?php /* translators: Button text for copying CSS class */ ?>
						<button class="button button-small"
							style="margin-left:10px;"><?php esc_html_e('Copy', 'animate-gl'); ?></button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div id="presets" class="tab-content" style="display:none;">
		<h2><?php esc_html_e('Entrance Animation Presets', 'animate-gl'); ?></h2>
		<p><?php esc_html_e('Premade entrance animations. Add animation to any element on the page by adding the CSS class of the animation.', 'animate-gl'); ?>
		</p>

		<div class="agl-presets-container">
			<div class="agl-preset">
				<h3 class="agl-preset-title"></h3>
				<img class="agl-preset-preview preset"
					src="<?php echo esc_url($this->plugin_dir_url . 'img/cyber4.jpg'); ?>" />
				<div class="agl-preset-info">
					<code class="agl-preset-class"></code>
					<button type="button"
						class="button button-small agl-play"><?php esc_html_e('Replay', 'animate-gl'); ?></button>
				</div>
			</div>
		</div>
	</div>

	<div id="getting-started" class="tab-content" style="display:none;">
		<h2><?php esc_html_e('Using the plugin', 'animate-gl'); ?></h2>
		<p><?php esc_html_e('Use the plugin directly in Elementor, Gutenberg Block editor, or by adding CSS classes.', 'animate-gl'); ?>
		</p>

		<?php if (did_action('elementor/loaded')) : ?>
			<h3><?php esc_html_e('Elementor', 'animate-gl'); ?></h3>
			<?php /* translators: %s is the plugin name (AnimateGL) */ ?>
			<p><?php printf(esc_html__('Element > Advanced Tab > %s', 'animate-gl'), 'AnimateGL'); ?></p>
			<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/THDw4gIoWHw?rel=0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		<?php endif; ?>

		<h3><?php esc_html_e('Gutenberg Blocks', 'animate-gl'); ?></h3>
		<?php /* translators: %s is the plugin name (AnimateGL) */ ?>
		<p><?php printf(esc_html__('Block > %s', 'animate-gl'), 'AnimateGL'); ?></p>
		<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/-PUOAmwmV78?rel=0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

		<h3><?php esc_html_e('CSS classes', 'animate-gl'); ?></h3>
		<p><?php esc_html_e('Add AnimateGL CSS class, for example', 'animate-gl'); ?> <code>agl agl-fadeLeft</code>
			<?php esc_html_e('to any element to add AnimateGL animation.', 'animate-gl'); ?></p>
	</div>

	<div id="addons" class="tab-content" style="display:none;">
		<div class="agl-addons">
			<div class="agl-addon">
				<div class="agl-addon-content">
					<h2><?php esc_html_e('Shapes Addon', 'animate-gl'); ?></h2>
					<p><?php esc_html_e('Add more animations to AnimateGL with Shapes Addon.', 'animate-gl'); ?></p>
					<p>
						<?php if (!class_exists('AGL_Entrance_Pack')) : ?>
							<a class="button button-primary button-large addons-button"
								href="<?php echo esc_url('https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-pack/45375689?ref=creativeinteractivemedia&ref2=admin_addons'); ?>"
								target="_blank"><?php esc_html_e('Buy Now', 'animate-gl'); ?></a>
						<?php else : ?>
							<span
								class="button disabled button-primary button-large addons-button"><?php esc_html_e('Installed', 'animate-gl'); ?></span>
						<?php endif; ?>
						<a class="button button-secondary button-large addons-button"
							href="<?php echo esc_url('https://animategl.com/entrance-pack/'); ?>"
							target="_blank"><?php esc_html_e('Live Demo', 'animate-gl'); ?></a>
					</p>
				</div>
			</div>
			<div class="agl-addon">
				<div class="agl-addon-content">
					<h2><?php esc_html_e('Fade Addon', 'animate-gl'); ?></h2>
					<p><?php esc_html_e('Add more animations to AnimateGL with Fade Addon.', 'animate-gl'); ?></p>
					<p>
						<?php if (!class_exists('AGL_Entrance_Fade_Pack')) : ?>
							<a class="button button-primary button-large addons-button"
								href="<?php echo esc_url('https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-fade-pack/46383362'); ?>"
								target="_blank"><?php esc_html_e('Buy Now', 'animate-gl'); ?></a>
						<?php else : ?>
							<span
								class="button disabled button-primary button-large addons-button"><?php esc_html_e('Installed', 'animate-gl'); ?></span>
						<?php endif; ?>
						<a class="button button-secondary button-large addons-button"
							href="<?php echo esc_url('https://animategl.com/fade-addon/'); ?>"
							target="_blank"><?php esc_html_e('Live Demo', 'animate-gl'); ?></a>
					</p>
				</div>
			</div>
		</div>
	</div>

	<div id="support" class="tab-content" style="display:none;">
		<h2 class="wp-heading-inline"><?php esc_html_e('Documentation', 'animate-gl'); ?></h2>
		<p><?php esc_html_e('Read the', 'animate-gl'); ?> <a
				href="https://creativeinteractivemedia.gitbook.io/animategl-wp/" target="_blank"
				class="button button-secondary"><?php esc_html_e('Online documentation', 'animate-gl'); ?></a></p>
		<h2 class="wp-heading-inline"><?php esc_html_e('Found a bug?', 'animate-gl'); ?></h2>
		<p><?php esc_html_e('Open a support ticket on the ', 'animate-gl'); ?> <a
				href="https://wordpress.org/support/plugin/animategl/" target="_blank"
				class="button button-secondary"><?php esc_html_e('Support forum', 'animate-gl'); ?></a></p>
		<h2 class="wp-heading-inline"><?php esc_html_e('Request a feature', 'animate-gl'); ?></h2>
		<p><?php esc_html_e('Tell us what you need on the ', 'animate-gl'); ?> <a
				href="https://wordpress.org/support/plugin/animategl/" target="_blank"
				class="button button-secondary"><?php esc_html_e('Support forum', 'animate-gl'); ?></a></p>
		<h2 class="wp-heading-inline"><?php esc_html_e('Expected something else?', 'animate-gl'); ?></h2>
		<p><?php esc_html_e('Tell us what you need on the ', 'animate-gl'); ?> <a
				href="https://wordpress.org/support/plugin/animategl/" target="_blank"
				class="button button-secondary"><?php esc_html_e('Support forum', 'animate-gl'); ?></a></p>
	</div>
</div>

<?php
wp_enqueue_script('agl-admin');
wp_enqueue_style('agl-admin');
wp_enqueue_style('agl');

$agl_nonce = wp_create_nonce('agl_nonce');
wp_localize_script('agl-admin', 'agl_localize_script', array($agl_nonce, esc_js(get_option('agl_json'))));

$json = get_option('agl_json');
wp_localize_script('agl-embed', 'agl_options', array($json, $this->plugin_dir_url, $this->ajaxurl));

do_action('agl_admin_after_enqueue_scripts');
?>