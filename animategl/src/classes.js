import { applyFilters } from '@wordpress/hooks';

/**
 * The CSS classes the AnimateGL runtime reads, built from the block attributes.
 * Static blocks save them in their markup, dynamic blocks get them from render_block
 * (get_block_classes() in includes/main.php builds the same string), and Preview uses them too.
 * Changing the output changes saved markup and makes existing blocks invalid.
 *
 * The animategl.classes filter adds classes for attributes added by other plugins. Its PHP side,
 * for dynamic blocks, is the animategl_block_classes filter.
 */
export function animationClasses( attributes ) {
	const classes = applyFilters( 'animategl.classes', baseClasses( attributes ), attributes );
	return typeof classes === 'string' ? classes.trim() : '';
}

function baseClasses( attributes ) {
	const {
		aglInName,
		aglInDirection,
		aglInDuration,
		aglInDelay,
		aglInDistance,
		aglInEasing,
		aglRepeat,
		aglLockToScrollbar,
	} = attributes;

	if ( ! aglInName ) {
		return '';
	}

	let classes = 'agl';
	if ( aglInName !== 'custom' ) {
		classes += ` agl-${ aglInName }`;
		if ( aglInDirection ) classes += `${ aglInDirection }`;
		if ( aglInEasing ) classes += ` agl-in-easing-${ aglInEasing }`;
		if ( aglInDuration ) classes += ` agl-in-duration-${ aglInDuration }`;
		if ( aglInDelay ) classes += ` agl-in-delay-${ aglInDelay }`;
		if ( aglInDistance ) classes += ` agl-in-distance-${ aglInDistance }`;
		if ( aglRepeat ) classes += ` agl-in-repeat`;
		if ( aglLockToScrollbar ) classes += ` agl-in-lockToScrollbar`;
	}

	return classes;
}
