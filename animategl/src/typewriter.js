/**
 * The typewriter in the block editor: the aglTypewriter attribute, its class agl-typewriter (includes/typewriter.php
 * adds the same for dynamic blocks) and its toggle at the end of the AnimateGL panel. The core runs it
 * (js/typewriter.js in the core). Lite and Pro both. Changing the class changes saved markup and makes existing blocks
 * invalid.
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import { Section } from './section';

addFilter( 'blocks.registerBlockType', 'agl/typewriter-attributes', ( settings ) =>
	Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			aglTypewriter: { type: 'boolean' },
		} ),
	} )
);

// After the other classes and count-up's, as includes/typewriter.php adds it. Also without an animation.
addFilter(
	'animategl.classes',
	'agl/typewriter-classes',
	( classes, attributes ) => ( attributes.aglTypewriter ? `${ classes } agl-typewriter`.trim() : classes ),
	41
);

addFilter(
	'animategl.panel',
	'agl/typewriter-controls',
	( element, { attributes, setAttributes } ) => (
		<Fragment>
			{ element }
			<Section title={ __( 'Typewriter', 'animategl' ) } active={ attributes.aglTypewriter }>
				<ToggleControl
					label={ __( 'Type out the text', 'animategl' ) }
					help={ __( 'The text is typed a character at a time behind a caret when the block comes into view, or with its entrance. Not with count-up numbers on the same block. Visitors who prefer reduced motion see the text as written.', 'animategl' ) }
					checked={ !! attributes.aglTypewriter }
					onChange={ ( value ) => setAttributes( { aglTypewriter: value || undefined } ) }
				/>
			</Section>
		</Fragment>
	),
	41
);
