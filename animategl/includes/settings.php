<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// The Settings tab on the AnimateGL page, saved with a plain form post to admin-post.php. Extensions add rows to its
// table with the animategl_settings_fields action and read their fields on animategl_settings_save (the capability
// and the nonce are checked before it runs).
//
// Its own setting is the WebGL canvas's z-index. The runtime draws every animated element on one canvas that it
// adds to the page at z-index 999, so the elements are drawn above anything lower while they animate or are hovered:
// a fixed or sticky header below 999 is covered for that moment. The canvas has to stay above the elements' own
// ancestors (a card with a background), so no one value fits every theme; this setting (or the filter, or the
// --agl-canvas-z-index custom property on the html element, which the runtime reads first) moves it.
class AnimateGL_Settings
{
	const CANVAS_Z_INDEX = 'animategl_canvas_z_index';
	const CANVAS_Z_INDEX_DEFAULT = 999;

	public function __construct()
	{
		add_action('animategl_admin_tabs', array($this, 'admin_tab'));
		add_action('animategl_admin_tab_content', array($this, 'admin_tab_content'));
		add_action('admin_post_animategl_settings', array($this, 'save'));
	}

	// The saved z-index, 999 until it's changed
	public static function canvas_z_index_saved()
	{
		$value = get_option(self::CANVAS_Z_INDEX, self::CANVAS_Z_INDEX_DEFAULT);
		return is_numeric($value) ? (int) $value : self::CANVAS_Z_INDEX_DEFAULT;
	}

	// That, or what the animategl_canvas_z_index filter makes of it
	public static function canvas_z_index()
	{
		$value = apply_filters('animategl_canvas_z_index', self::canvas_z_index_saved());
		return is_numeric($value) ? (int) $value : self::CANVAS_Z_INDEX_DEFAULT;
	}

	public function admin_tab()
	{
		echo '<a href="#settings" class="nav-tab">' . esc_html__('Settings', 'animategl') . '</a>';
	}

	public function admin_tab_content()
	{
		?>
		<div id="settings" class="tab-content" style="display:none;">
			<h2><?php esc_html_e('Settings', 'animategl'); ?></h2>
			<?php if (isset($_GET['agl-saved'])) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- only shows a notice ?>
				<div class="notice notice-success inline agl-settings-saved"><p><?php esc_html_e('Settings saved.', 'animategl'); ?></p></div>
			<?php endif; ?>
			<form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
				<input type="hidden" name="action" value="animategl_settings">
				<?php wp_nonce_field('animategl_settings'); ?>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row"><label for="agl-canvas-z-index"><?php esc_html_e('WebGL canvas z-index', 'animategl'); ?></label></th>
						<td>
							<input type="number" name="canvas_z_index" id="agl-canvas-z-index" class="small-text" min="0" max="2147483647" step="1" value="<?php echo esc_attr(self::canvas_z_index_saved()); ?>">
							<p class="description"><?php esc_html_e('WebGL animations and effects are drawn on one canvas above the page, at this z-index (999 by default). While a block animates or is hovered it is drawn above anything with a lower z-index, such as a fixed or sticky header. Give the header a higher z-index, or lower this value: it must stay above the animated blocks and their backgrounds.', 'animategl'); ?></p>
							<?php if (has_filter('animategl_canvas_z_index')) : ?>
								<p class="description agl-canvas-z-index-filtered">
									<?php esc_html_e('A filter on this site (animategl_canvas_z_index) can change this setting, so what visitors get may differ from what is saved here.', 'animategl'); ?>
								</p>
							<?php endif; ?>
						</td>
					</tr>
					<?php
					// Extensions' rows: <tr><th scope="row">…</th><td>…</td></tr>
					do_action('animategl_settings_fields');
					?>
				</table>
				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	public function save()
	{
		if (!current_user_can(AnimateGL::capability())) {
			wp_die(esc_html__('You are not allowed to change these settings.', 'animategl'), 403);
		}
		check_admin_referer('animategl_settings');
		$z_index = isset($_POST['canvas_z_index']) && is_numeric($_POST['canvas_z_index']) ? (int) $_POST['canvas_z_index'] : self::CANVAS_Z_INDEX_DEFAULT;
		update_option(self::CANVAS_Z_INDEX, (string) max(0, $z_index), true);
		// Extensions save their fields (the nonce and the capability are checked above)
		do_action('animategl_settings_save');
		wp_safe_redirect(add_query_arg('agl-saved', '1', admin_url('admin.php?page=agl_admin')) . '#settings');
		exit;
	}
}
