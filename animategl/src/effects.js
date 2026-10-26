/**
 * The free hover and scroll effects in the block editor: Lift, Grow, Tilt and Skew, which the core runs (js/motion.js
 * in the core). Their attributes, their classes (includes/effects.php builds the same for dynamic blocks) and their
 * controls at the end of the AnimateGL panel. Off when the animategl.coreEffects filter says so: AnimateGL Pro adds
 * the same attributes, classes and controls with its other effects. Changing the classes changes saved markup and
 * makes existing blocks invalid.
 */
import { __ } from '@wordpress/i18n';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { ExternalLink, SelectControl } from '@wordpress/components';

import { Section } from './section';

export const hoverEffects = [ 'lift', 'grow', 'tilt' ];

// The pages of animategl.com that show every effect live
const hoverUrl = 'https://animategl.com/hover-effects/';
const scrollUrl = 'https://animategl.com/scroll-effects/';

const on = () => applyFilters( 'animategl.coreEffects', true );

// The scroll class first, then the hover class. Also without an animation.
export function effectsClasses( { aglScroll, aglHover } ) {
	const classes = [];
	if ( aglScroll === 'skew' ) classes.push( 'agl-scroll-skew' );
	if ( hoverEffects.includes( aglHover ) ) classes.push( `agl-hover-${ aglHover }` );
	return classes.join( ' ' );
}

addFilter( 'blocks.registerBlockType', 'agl/effects-attributes', ( settings ) =>
	Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			aglScroll: { type: 'string' },
			aglHover: { type: 'string' },
		} ),
	} )
);

// After the classes of other plugins, as includes/effects.php adds them
addFilter(
	'animategl.classes',
	'agl/effects-classes',
	( classes, attributes ) => {
		const added = on() ? effectsClasses( attributes ) : '';
		return added ? `${ classes } ${ added }`.trim() : classes;
	},
	35
);

// An effect saved with AnimateGL Pro stays in the list, so the block keeps it until another one is picked
const keep = ( value, options ) =>
	value && ! options.some( ( option ) => option.value === value )
		? [ ...options, { label: `${ value } (AnimateGL Pro)`, value } ]
		: options;

function EffectsControls( { attributes, setAttributes } ) {
	const { aglScroll, aglHover } = attributes;
	const upsell = !! ( window.aglEditor && window.aglEditor.proUrl );
	const scrollOptions = keep( aglScroll, [
		{ label: __( 'None', 'animategl' ), value: '' },
		{ label: __( 'Skew', 'animategl' ), value: 'skew' },
	] );
	const hoverOptions = keep( aglHover, [
		{ label: __( 'None', 'animategl' ), value: '' },
		{ label: __( 'Lift', 'animategl' ), value: 'lift' },
		{ label: __( 'Grow', 'animategl' ), value: 'grow' },
		{ label: __( 'Tilt', 'animategl' ), value: 'tilt' },
	] );
	return (
		<Fragment>
			<SelectControl
				__next40pxDefaultSize
				label={ __( 'While scrolling', 'animategl' ) }
				help={ __( 'Leans with the scroll speed after the entrance. Works on any block. Off for visitors who prefer reduced motion.', 'animategl' ) }
				value={ aglScroll || '' }
				options={ scrollOptions }
				onChange={ ( value ) => setAttributes( { aglScroll: value || undefined } ) }
			/>
			<SelectControl
				__next40pxDefaultSize
				label={ __( 'Hover effect', 'animategl' ) }
				help={ __( 'While the mouse is over the block, after the entrance. Works on any block. Mouse only. Off for visitors who prefer reduced motion.', 'animategl' ) }
				value={ aglHover || '' }
				options={ hoverOptions }
				onChange={ ( value ) => setAttributes( { aglHover: value || undefined } ) }
			/>
			{ upsell && (
				<p className="agl-effects-more" style={ { margin: 0 } }>
					{ __( 'More effects with AnimateGL Pro:', 'animategl' ) }{ ' ' }
					<ExternalLink href={ hoverUrl }>{ __( 'hover', 'animategl' ) }</ExternalLink>
					{ ', ' }
					<ExternalLink href={ scrollUrl }>{ __( 'scroll', 'animategl' ) }</ExternalLink>
				</p>
			) }
		</Fragment>
	);
}

addFilter( 'animategl.panel', 'agl/effects-controls', ( element, props ) => {
	if ( ! on() ) return element;
	const a = props.attributes;
	return (
		<Fragment>
			{ element }
			<Section title={ __( 'Scroll and hover effects', 'animategl' ) } active={ a.aglScroll || a.aglHover }>
				<EffectsControls { ...props } />
			</Section>
		</Fragment>
	);
} );
