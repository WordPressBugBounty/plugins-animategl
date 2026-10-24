/**
 * Preview: plays a block's animation in a transparent iframe laid over the editor canvas.
 *
 * AnimateGL's runtime and CSS never load into the canvas itself (they crashed the WP 7.1 editor and
 * hid blocks), so blocks there are never hidden. The overlay gets the canvas styles and a copy of the
 * block at the same position, runs the runtime on it, and is removed when the animation has finished.
 */
import { animationClasses } from './classes';

let active = null;

// For a JSON value inside an inline <script>
const json = ( value ) => JSON.stringify( value ).replace( /</g, '\\u003c' );
const attr = ( value ) => String( value ).replace( /&/g, '&amp;' ).replace( /"/g, '&quot;' );

// The settings saved on the AnimateGL admin page, as the front end gets them (see js/embed.js)
function savedSettings() {
	try {
		return JSON.parse( ( window.aglEditor && window.aglEditor.settings ) || '{}' ) || {};
	} catch ( error ) {
		return {};
	}
}

export function stopPreview() {
	if ( ! active ) return;
	active.cleanup.forEach( ( fn ) => fn() );
	active = null;
}

/**
 * Returns false if there's nothing to preview (no animation, or the block isn't in the canvas).
 */
export function previewAnimation( clientId, attributes ) {
	stopPreview();

	const classes = animationClasses( attributes );
	const canvasFrame = document.querySelector( 'iframe[name="editor-canvas"]' );
	// Older WordPress versions can render the editor without an iframe
	const canvasDoc = canvasFrame ? canvasFrame.contentDocument : document;
	const canvasWin = canvasFrame ? canvasFrame.contentWindow : window;
	const block = canvasDoc && canvasDoc.querySelector( `[data-block="${ clientId }"]` );
	if ( ! classes || ! block || ! window.aglEditor ) return false;

	// The animation starts when the element is in view
	block.scrollIntoView( { block: 'nearest' } );

	// The overlay covers the canvas viewport, so the copy keeps the block's coordinates
	const frame = canvasFrame
		? canvasFrame.getBoundingClientRect()
		: { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
	const rect = block.getBoundingClientRect();

	const copy = block.cloneNode( true );
	[ copy, ...copy.querySelectorAll( '*' ) ].forEach( ( node ) => {
		node.removeAttribute( 'contenteditable' );
		node.removeAttribute( 'id' );
	} );
	copy.removeAttribute( 'data-block' );
	copy.classList.remove( 'is-selected', 'is-highlighted', 'is-hovered', 'has-child-selected', 'is-multi-selected' );
	copy.classList.add( ...classes.split( ' ' ) );
	copy.setAttribute( 'data-agl-preview', '' );
	Object.assign( copy.style, {
		position: 'absolute',
		left: `${ rect.left }px`,
		top: `${ rect.top }px`,
		width: `${ rect.width }px`,
		height: `${ rect.height }px`,
		margin: '0',
		boxSizing: 'border-box',
	} );

	const { url, version } = window.aglEditor;
	// Scripts that extend the runtime (AnimateGL Pro), loaded after it as on the front end
	const scripts = ( window.aglEditor.scripts || [] )
		.map( ( src ) => `<script src="${ attr( src ) }"></script>` )
		.join( '\n' );
	const editorIn = ( window.agl && window.agl.defaults && window.agl.defaults.in ) || {};
	// Presets added by add-on packs in the editor page, so their animations preview too
	const presets = { presets: editorIn.presets || {}, names: editorIn.names || [] };
	const styles = [ ...canvasDoc.querySelectorAll( 'link[rel="stylesheet"], style' ) ]
		.map( ( node ) => node.outerHTML )
		.join( '\n' );

	const overlay = document.createElement( 'iframe' );
	overlay.setAttribute( 'aria-hidden', 'true' );
	overlay.tabIndex = -1;
	Object.assign( overlay.style, {
		position: 'fixed',
		left: `${ frame.left }px`,
		top: `${ frame.top }px`,
		width: `${ frame.width }px`,
		height: `${ frame.height }px`,
		border: '0',
		background: 'transparent',
		pointerEvents: 'none',
		zIndex: '100000',
	} );
	overlay.srcdoc = `<!doctype html>
<html class="agl-js agl-preview ${ attr( canvasDoc.documentElement.className ) }">
<head>
<meta charset="utf-8">
<base href="${ attr( canvasDoc.baseURI ) }">
${ styles }
<link rel="stylesheet" href="${ attr( url ) }css/animategl.css?ver=${ attr( version ) }">
<style>html, body { background: transparent !important; } body { margin: 0 !important; overflow: hidden !important; }</style>
</head>
<body class="${ attr( canvasDoc.body.className ) }">
${ copy.outerHTML }
<script src="${ attr( url ) }js/lib/animategl.min.js?ver=${ attr( version ) }"></script>
<script>
(function () {
	// Before the runtime extensions, which read the presets as they load (Pro's text split checks the type)
	var editor = ${ json( presets ) };
	Object.assign(agl.defaults.in.presets, editor.presets);
	editor.names.forEach(function (name) {
		if (!agl.defaults.in.names.some(function (known) { return known.name === name.name; })) agl.defaults.in.names.push(name);
	});
})();
</script>
${ scripts }
<script>
(function () {
	// Counted by the editor to tell when the preview has finished
	window.aglPreviewEnded = 0;
	document.addEventListener('agl-animation-end', function () { window.aglPreviewEnded++; });
	var options = ${ json( savedSettings() ) };
	options.rootFolder = ${ json( url ) };
	if (options.in) {
		if (options.in.presets) options.in.presets = agl.defaults.in.presets;
		if (options.in.fade) { delete options.in.fade.alphaMapSrc; delete options.in.fade.image; }
	}
	new AnimateGL(options);
})();
</script>
</body>
</html>`;

	// Hide the real block while its copy animates
	const hide = canvasDoc.createElement( 'style' );
	hide.textContent = `[data-block="${ clientId }"] { visibility: hidden !important; }`;
	canvasDoc.head.appendChild( hide );
	document.body.appendChild( overlay );

	// Done when every animated element in the overlay has fired agl-animation-end, or after a time limit.
	// That's the copy, or, when a runtime extension handed its animation to parts of it (Pro's stagger and
	// text split), each part. Lock to scrollbar animations never finish here.
	const started = Date.now();
	const minimum = ( Number( attributes.aglInDelay ) || 0 ) + ( Number( attributes.aglInDuration ) || 0 );
	const limit = attributes.aglLockToScrollbar ? 3000 : minimum + 10000;
	const poll = setInterval( () => {
		const win = overlay.contentWindow;
		const el = overlay.contentDocument && overlay.contentDocument.querySelector( '[data-agl-preview]' );
		const animated = ! el ? 1 : el.classList.contains( 'agl' ) ? 1 : el.querySelectorAll( '.agl' ).length || 1;
		const ended = ( win && win.aglPreviewEnded ) || 0;
		const elapsed = Date.now() - started;
		if ( ( ended >= animated && elapsed >= minimum ) || elapsed > limit ) {
			clearInterval( poll );
			setTimeout( stopPreview, 400 );
		}
	}, 100 );

	// Scrolling or resizing would leave the copy in the wrong place
	const stop = () => stopPreview();
	setTimeout( () => {
		if ( active && active.overlay === overlay ) {
			canvasWin.addEventListener( 'scroll', stop, { passive: true } );
			window.addEventListener( 'resize', stop );
		}
	}, 100 );

	active = {
		overlay,
		cleanup: [
			() => clearInterval( poll ),
			() => canvasWin.removeEventListener( 'scroll', stop ),
			() => window.removeEventListener( 'resize', stop ),
			() => overlay.remove(),
			() => hide.remove(),
		],
	};

	return true;
}
