/**
 * Count-up numbers in the block editor: the aglCount attribute, its class agl-count (includes/count.php adds the same
 * for dynamic blocks) and its toggle at the end of the AnimateGL panel. The core runs it (js/count.js in the core).
 * Lite and Pro both. Changing the class changes saved markup and makes existing blocks invalid.
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import { Section } from './section';

addFilter( 'blocks.registerBlockType', 'agl/count-attributes', ( settings ) =>
	Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			aglCount: { type: 'boolean' },
		} ),
	} )
);

// After the other classes, as includes/count.php adds it. Also without an animation.
addFilter(
	'animategl.classes',
	'agl/count-classes',
	( classes, attributes ) => ( attributes.aglCount ? `${ classes } agl-count`.trim() : classes ),
	40
);

addFilter(
	'animategl.panel',
	'agl/count-controls',
	( element, { attributes, setAttributes } ) => (
		<Fragment>
			{ element }
			<Section title={ __( 'Count-up numbers', 'animategl' ) } active={ attributes.aglCount }>
				<ToggleControl
					label={ __( 'Count up the numbers', 'animategl' ) }
					help={ __( 'Each number in the block counts up from 0 when it comes into view, or with its entrance, and ends as written: 1,250 or 98.6%. Visitors who prefer reduced motion see the numbers as written.', 'animategl' ) }
					checked={ !! attributes.aglCount }
					onChange={ ( value ) => setAttributes( { aglCount: value || undefined } ) }
				/>
			</Section>
		</Fragment>
	),
	40
);
