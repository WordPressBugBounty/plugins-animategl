import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * A folding group of controls inside the AnimateGL panel. It starts open when something in it is set, and its
 * title shows a dot then, so a closed group still says it holds a setting. AnimateGL Pro uses it for its groups.
 */
export function Section( { title, active, children } ) {
	return (
		<PanelBody
			className="agl-section"
			initialOpen={ !! active }
			title={
				<span>
					{ title }
					{ active && (
						<span
							role="img"
							aria-label={ __( '(has settings)', 'animategl' ) }
							style={ {
								display: 'inline-block',
								width: '6px',
								height: '6px',
								borderRadius: '50%',
								background: 'var(--wp-admin-theme-color, #3858e9)',
								marginLeft: '8px',
								verticalAlign: 'middle',
							} }
						/>
					) }
				</span>
			}
			// Flush with the AnimateGL panel's edges, like the panels around it
			style={ { margin: '0 -16px', borderBottom: 'none' } }
		>
			{ children }
		</PanelBody>
	);
}
