<div class="wrap">
	<h1><?php esc_html_e('AnimateGL Add-ons', 'animate-gl'); ?></h1>
	<div class="agl-addons">
		<div class="agl-addon">
			<div class="agl-addon-content">
				<h2><?php esc_html_e('Entrance Pack', 'animate-gl'); ?></h2>
				<p><?php esc_html_e('Add more animations to AnimateGL with Entrance Pack Add-on.', 'animate-gl'); ?>
				</p>
				<p>
					<?php
					if (! class_exists('AGL_Entrance_Pack')) {
						printf(
							'<a class="%s" href="%s" target="_blank">%s</a>',
							esc_attr('button button-primary button-large addons-button'),
							esc_url('https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-pack/45375689?ref=creativeinteractivemedia&ref2=admin_addons'),
							esc_html__('Buy Now $13', 'animate-gl')
						);
					} else {
						printf(
							'<span class="%s">%s</span>',
							esc_attr('button disabled button-primary button-large addons-button'),
							esc_html__('Installed', 'animate-gl')
						);
					}

					printf(
						'<a class="%s" href="%s" target="_blank">%s</a>',
						esc_attr('button button-secondary button-large addons-button'),
						esc_url('https://animategl.com/entrance-pack/'),
						esc_html__('Live Demo', 'animate-gl')
					);
					?>

				</p>
			</div>
		</div>
	</div>
</div>

<?php

wp_enqueue_style('agl-admin');
