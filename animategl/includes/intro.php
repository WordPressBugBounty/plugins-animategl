<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

// Site intro: a CSS reveal of the whole page as it loads (Settings tab, off by default). A cover in one colour, drawn
// by html::before and ::after, opens or fades away in under a second. It needs no JavaScript beyond the class
// that the inline head script adds to <html>, so it also runs on pages without the runtime. The page is rendered
// under it from the start: nothing is hidden and its HTML is unchanged, so crawlers and the largest contentful paint
// see the page as it is. Not under reduced motion, not in page builders' editors, and by default only on a visitor's
// first page of a visit. The runtime starts entrances when the reveal is half done (js/embed.js, window.aglIntro).
//
// The styles come from the animategl_intro_styles filter: [ key => [ 'label' => …, 'css' => … ] ], whose CSS draws
// html.agl-intro-<key>::before and ::after; extensions add theirs there. The base rules (fixed, full screen, the colour
// in --agl-intro-color, the timing) apply to both pseudo-elements. animategl_intro returns the style for this page
// ('' for none).
class AnimateGL_Intro
{
	const STYLE = 'animategl_intro';
	const COLOR = 'animategl_intro_color';
	// '1': only on a visitor's first page of a visit (sessionStorage), '0': on every page
	const ONCE = 'animategl_intro_once';
	const COLOR_DEFAULT = '#111111';
	// The reveal's delay and duration, in ms (the animategl_intro_timing filter changes them)
	const DELAY = 100;
	const DURATION = 800;

	// True once this page has the intro's script
	public static $printed = false;

	public function __construct()
	{
		// Before the extensions' rows
		add_action('animategl_settings_fields', array($this, 'fields'), 5);
		add_action('animategl_settings_save', array($this, 'save'), 5);
		add_action('wp_enqueue_scripts', array($this, 'enqueue'), 20);
	}

	public static function styles()
	{
		$styles = apply_filters('animategl_intro_styles', array(
			'curtain' => array(
				'label' => __('Curtain', 'animategl'),
				// Two halves open to the sides
				'css'   => 'html.agl-intro-curtain::before{right:auto;width:50.5%;animation-name:agl-intro-left}'
					. 'html.agl-intro-curtain::after{left:auto;width:50.5%;animation-name:agl-intro-right}'
					. '@keyframes agl-intro-left{to{transform:translateX(-100%)}}'
					. '@keyframes agl-intro-right{to{transform:translateX(100%)}}',
			),
			'fade'    => array(
				'label' => __('Fade', 'animategl'),
				'css'   => 'html.agl-intro-fade::before{animation-name:agl-intro-fade;animation-timing-function:ease}'
					. 'html.agl-intro-fade::after{display:none}'
					. '@keyframes agl-intro-fade{to{opacity:0}}',
			),
		));
		return is_array($styles) ? $styles : array();
	}

	public static function style_saved()
	{
		return (string) get_option(self::STYLE, '');
	}

	public static function color_saved()
	{
		$color = sanitize_hex_color((string) get_option(self::COLOR, self::COLOR_DEFAULT));
		return $color ? $color : self::COLOR_DEFAULT;
	}

	public static function once_saved()
	{
		return '0' !== (string) get_option(self::ONCE, '1');
	}

	// The style for this page, or '' for none
	public static function style()
	{
		$style = (string) apply_filters('animategl_intro', self::style_saved());
		$styles = self::styles();
		return '' !== $style && isset($styles[$style]) && !empty($styles[$style]['css']) ? $style : '';
	}

	// Page builders' editors and previews load the front end: no intro there
	private static function in_builder()
	{
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- only reads which editor is open
		return is_customize_preview()
			|| isset($_GET['elementor-preview'])
			|| isset($_GET['et_fb'])
			|| isset($_GET['bricks'])
			|| isset($_GET['fl_builder'])
			|| isset($_GET['ct_builder'])
			|| (function_exists('bricks_is_builder') && bricks_is_builder());
		// phpcs:enable
	}

	public function enqueue()
	{
		$style = self::style();
		if ('' === $style || is_admin() || self::in_builder() || !wp_script_is('agl-head', 'enqueued')) {
			return;
		}
		$styles = self::styles();
		// Extensions add their own rules for this style (a logo on the cover, the cover closing on a link)
		$css = apply_filters('animategl_intro_css', self::base_css() . $styles[$style]['css'], $style);
		wp_add_inline_style('agl', $css);
		wp_add_inline_script('agl-head', self::script($style));
		self::$printed = true;
	}

	// [delay, duration] of the reveal in ms
	public static function timing()
	{
		$timing = apply_filters('animategl_intro_timing', array(self::DELAY, self::DURATION));
		$delay = isset($timing[0]) ? max(0, (int) $timing[0]) : self::DELAY;
		$duration = isset($timing[1]) ? max(100, (int) $timing[1]) : self::DURATION;
		return array($delay, $duration);
	}

	private static function base_css()
	{
		$color = self::color_saved();
		list($delay, $duration) = self::timing();
		// One below the top, which is left for what extensions draw on the cover
		return 'html.agl-intro::before,html.agl-intro::after{content:"";position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483646;pointer-events:none;'
			// Longhands: in the animation shorthand, "none" would be read as the fill mode, and the cover would come
			// back for a moment when its animation ended
			. 'background:var(--agl-intro-color);animation-name:none;animation-duration:' . $duration . 'ms;animation-timing-function:cubic-bezier(.76,0,.24,1);'
			. 'animation-delay:' . $delay . 'ms;animation-fill-mode:both;will-change:transform,opacity}'
			// --agl-intro-line: a colour that stands out on the cover, lighter on a dark one and darker on a light one
			. 'html.agl-intro{--agl-intro-color:' . $color . ';--agl-intro-line:' . self::line_color($color) . '}'
			// Reached through a link that closed the cover: open it at once
			. 'html.agl-intro-next::before,html.agl-intro-next::after{animation-delay:' . self::DELAY . 'ms}';
	}

	// The cover's colour mixed 65% toward white, or toward black when the colour is light
	public static function line_color($hex)
	{
		$hex = ltrim($hex, '#');
		if (3 === strlen($hex)) {
			$hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
		}
		$rgb = array_map('hexdec', str_split(substr(str_pad($hex, 6, '0'), 0, 6), 2));
		$light = (0.2126 * $rgb[0] + 0.7152 * $rgb[1] + 0.0722 * $rgb[2]) / 255 > 0.6;
		$target = $light ? 0 : 255;
		$out = '#';
		foreach ($rgb as $c) {
			$out .= str_pad(dechex((int) round($c + ($target - $c) * 0.65)), 2, '0', STR_PAD_LEFT);
		}
		return $out;
	}

	// Adds the classes in <head>, before the page is drawn. The reveal's timer starts with its CSS animation, or when
	// the page has loaded if that never starts (animations turned off), and the classes go once it's over. Half way,
	// window.aglIntro resolves and the runtime starts.
	// A page reached through a link that closed the cover (agl-intro-next in sessionStorage, set by an extension)
	// opens it even when the intro is only for the first page, at once (agl-intro-next on <html>). While the cover
	// closes again (agl-intro-out, added by the extension), the classes stay.
	private static function script($style)
	{
		list($delay, $duration) = self::timing();
		return "(function (d, w) {\n"
			. "\tif (w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches) return;\n"
			. "\tvar next = false;\n"
			. "\ttry { next = !!w.sessionStorage.getItem('agl-intro-next'); w.sessionStorage.removeItem('agl-intro-next'); } catch (e) {}\n"
			. (self::once_saved()
				? "\ttry { if (w.sessionStorage.getItem('agl-intro') && !next) return; w.sessionStorage.setItem('agl-intro', '1'); } catch (e) {}\n"
				: '')
			. "\tvar root = d.documentElement, names = ['agl-intro', " . wp_json_encode('agl-intro-' . $style) . "], started = false, half, done;\n"
			. "\tvar delay = next ? " . self::DELAY . " : " . $delay . ", duration = " . $duration . ";\n"
			. "\tif (next) names.push('agl-intro-next');\n"
			. "\troot.classList.add.apply(root.classList, names);\n"
			. "\tw.aglIntro = new Promise(function (resolve) { half = resolve; });\n"
			. "\tfunction end() {\n"
			. "\t\tif (done) return;\n"
			. "\t\tdone = true;\n"
			. "\t\thalf();\n"
			. "\t\tif (root.classList.contains('agl-intro-out')) return;\n"
			. "\t\troot.classList.remove.apply(root.classList, names);\n"
			. "\t\tw.dispatchEvent(new Event('agl-intro-end'));\n"
			. "\t}\n"
			// wait: the time left before the reveal moves. The cover's own animation starts once its delay is over (0);
			// one without a delay (an extension's logo) or the page's load start it before (the whole delay).
			. "\tfunction start(wait) {\n"
			. "\t\tif (started) return;\n"
			. "\t\tstarted = true;\n"
			. "\t\tsetTimeout(half, wait + duration / 2);\n"
			. "\t\tsetTimeout(end, wait + duration + 50);\n"
			. "\t}\n"
			. "\troot.addEventListener('animationstart', function (e) { if (/^agl-intro/.test(e.animationName) && !root.classList.contains('agl-intro-out')) start(e.pseudoElement ? 0 : delay); });\n"
			. "\tw.addEventListener('load', function () { setTimeout(function () { start(delay); }, 100); });\n"
			// However the page loads, the cover is gone 4 s after this script (and after a longer reveal)
			. "\tsetTimeout(end, Math.max(4000, delay + duration + 2000));\n"
			. "})(document, window);";
	}

	public function fields()
	{
		$saved = self::style_saved();
		?>
		<tr>
			<th scope="row"><label for="agl-intro"><?php esc_html_e('Site intro', 'animategl'); ?></label></th>
			<td>
				<select name="agl_intro" id="agl-intro">
					<option value=""><?php esc_html_e('None', 'animategl'); ?></option>
					<?php foreach (self::styles() as $key => $style) : ?>
						<option value="<?php echo esc_attr($key); ?>" <?php selected($saved, $key); ?>><?php echo esc_html(isset($style['label']) ? $style['label'] : $key); ?></option>
					<?php endforeach; ?>
				</select>
				<label for="agl-intro-color" style="margin-left:12px;"><?php esc_html_e('Colour', 'animategl'); ?></label>
				<input type="color" name="agl_intro_color" id="agl-intro-color" value="<?php echo esc_attr(self::color_saved()); ?>">
				<p>
					<label><input type="checkbox" name="agl_intro_once" id="agl-intro-once" value="1" <?php checked(self::once_saved()); ?>> <?php esc_html_e('Only on the first page of a visit', 'animategl'); ?></label>
				</p>
				<p class="description"><?php esc_html_e('Reveals the whole page as it loads: a cover in this colour opens or fades away in under a second, and the page\'s own animations start as it goes. The page is drawn under it from the start, so search engines and page speed see it as usual. Not shown to visitors who prefer reduced motion or in page builders\' editors.', 'animategl'); ?></p>
				<?php if (apply_filters('animategl_show_upsell', true)) : ?>
					<p class="description"><?php esc_html_e('AnimateGL Pro adds Line wipe, Shutters, Circle and Diagonal wipe, your logo on the cover, and the cover closing and opening again between pages.', 'animategl'); ?></p>
				<?php endif; ?>
			</td>
		</tr>
		<?php
	}

	public function save()
	{
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- checked by AnimateGL_Settings::save()
		$style = isset($_POST['agl_intro']) ? sanitize_key(wp_unslash($_POST['agl_intro'])) : '';
		$color = isset($_POST['agl_intro_color']) ? sanitize_hex_color(wp_unslash($_POST['agl_intro_color'])) : '';
		$once  = !empty($_POST['agl_intro_once']);
		// phpcs:enable
		$styles = self::styles();
		update_option(self::STYLE, isset($styles[$style]) ? $style : '', true);
		update_option(self::COLOR, $color ? $color : self::COLOR_DEFAULT, true);
		update_option(self::ONCE, $once ? '1' : '0', true);
	}
}
