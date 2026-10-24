import { __, sprintf } from '@wordpress/i18n';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useState } from '@wordpress/element';
import { select, useDispatch, useSelect } from '@wordpress/data';
import { store as preferencesStore } from '@wordpress/preferences';
import { BlockControls, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import {
	Button,
	Dropdown,
	ExternalLink,
	Notice,
	PanelBody,
	Path,
	RangeControl,
	SelectControl,
	SVG,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import classnames from 'classnames';

import { animationClasses } from './classes';
import { Section } from './section';
import { previewAnimation, stopPreview } from './preview';

/**
 * Plays the block's animation shortly after an animation or direction is picked, so picks in quick
 * succession (or arrow keys in the list) play once, the last one. Reads the attributes when it runs,
 * since setAttributes has updated them by then. One timer for all blocks: only one is being edited.
 */
let autoPreviewTimer = null;
function autoPreview( clientId, onResult ) {
	clearTimeout( autoPreviewTimer );
	autoPreviewTimer = setTimeout( () => {
		const attributes = select( blockEditorStore ).getBlockAttributes( clientId );
		if ( ! attributes || ! attributes.aglInName ) return;
		onResult( previewAnimation( clientId, attributes ) );
	}, 300 );
}

function cancelAutoPreview() {
	clearTimeout( autoPreviewTimer );
	stopPreview();
}

/**
 * Declare our custom attributes on every block.
 * includes/main.php registers the same attributes server-side, for dynamic blocks.
 */
const setSidebarSelectAttribute = ( settings ) => {
	return Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			aglInName: { type: 'string' },
			aglInDirection: { type: 'string' },
			aglInDuration: { type: 'number' },
			aglInDelay: { type: 'number' },
			aglInDistance: { type: 'number' },
			aglInEasing: { type: 'string' },
			aglRepeat: { type: 'boolean', default: false },
			aglLockToScrollbar: { type: 'boolean', default: false },
		} ),
	} );
};
addFilter( 'blocks.registerBlockType', 'agl/set-sidebar-select-attribute', setSidebarSelectAttribute );

// Animation names and presets come from the runtime (`agl`), including presets added by add-on packs
function entranceAnimations() {
	const entrance = ( window.agl && window.agl.defaults && window.agl.defaults.in ) || {};
	return { names: entrance.names || [], presets: entrance.presets || {} };
}

// The direction or variant part of a preset name (fadeCircleTopLeft -> CircleTopLeft), readable and translatable
const directionLabel = ( direction ) => {
	const labels = {
		'': __( 'Default', 'animategl' ),
		Left: __( 'Left', 'animategl' ),
		Right: __( 'Right', 'animategl' ),
		Up: __( 'Up', 'animategl' ),
		Down: __( 'Down', 'animategl' ),
		Center: __( 'Center', 'animategl' ),
		Light: __( 'Light', 'animategl' ),
		Dark: __( 'Dark', 'animategl' ),
		TopLeft: __( 'Top left', 'animategl' ),
		TopRight: __( 'Top right', 'animategl' ),
		BottomLeft: __( 'Bottom left', 'animategl' ),
		BottomRight: __( 'Bottom right', 'animategl' ),
		Circle: __( 'Circle', 'animategl' ),
		CircleTopLeft: __( 'Circle from top left', 'animategl' ),
		CircleTopRight: __( 'Circle from top right', 'animategl' ),
		CircleBottomLeft: __( 'Circle from bottom left', 'animategl' ),
		CircleBottomRight: __( 'Circle from bottom right', 'animategl' ),
	};
	if ( labels[ direction ] !== undefined ) return labels[ direction ];
	// A key from an add-on pack: its camel case as words, e.g. SlideFar -> Slide far
	return direction.replace( /([a-z])([A-Z])/g, '$1 $2' ).replace( / [A-Z]/g, ( word ) => word.toLowerCase() );
};

// Whether a preset list holds only directions, so its control is called Direction rather than Variant
const directionValues = [ '', 'Left', 'Right', 'Up', 'Down' ];
const onlyDirections = ( options ) => options.every( ( option ) => directionValues.includes( option.value ) );

// Readable names, with the easing's own name for those who know it
const easing = ( label, value ) => ( {
	/* translators: 1: a description of an easing, e.g. Smooth out, 2: its technical name, e.g. easeOutQuad */
	label: sprintf( __( '%1$s (%2$s)', 'animategl' ), label, value ),
	value,
} );

const easingOptions = () => [
	{ label: __( 'Default', 'animategl' ), value: '' },
	{ label: __( 'Linear', 'animategl' ), value: 'linear' },
	easing( __( 'Soft out', 'animategl' ), 'easeOutSine' ),
	easing( __( 'Soft in and out', 'animategl' ), 'easeInOutSine' ),
	easing( __( 'Soft in', 'animategl' ), 'easeInSine' ),
	easing( __( 'Smooth out', 'animategl' ), 'easeOutQuad' ),
	easing( __( 'Smooth in and out', 'animategl' ), 'easeInOutQuad' ),
	easing( __( 'Smooth in', 'animategl' ), 'easeInQuad' ),
	easing( __( 'Strong out', 'animategl' ), 'easeOutCubic' ),
	easing( __( 'Strong in and out', 'animategl' ), 'easeInOutCubic' ),
	easing( __( 'Strong in', 'animategl' ), 'easeInCubic' ),
	easing( __( 'Sharp out', 'animategl' ), 'easeOutExpo' ),
	easing( __( 'Sharp in and out', 'animategl' ), 'easeInOutExpo' ),
	easing( __( 'Sharp in', 'animategl' ), 'easeInExpo' ),
	easing( __( 'Overshoot', 'animategl' ), 'easeOutBack' ),
];

/**
 * Lite's one pointer to AnimateGL Pro in the editor: a folded row at the end of the panel. Hiding it is saved
 * in the user's editor preferences. Off when the animategl_show_upsell filter says so (AnimateGL Pro does).
 */
function ProRow() {
	const hidden = useSelect( ( select ) => !! select( preferencesStore ).get( 'animategl', 'hideProRow' ), [] );
	const { set } = useDispatch( preferencesStore );
	if ( ! window.aglEditor || ! window.aglEditor.proUrl || hidden ) return null;
	return (
		<Section title={ __( 'More with Pro', 'animategl' ) }>
			<p style={ { margin: '0 0 8px' } }>
				{ __(
					'Hover and scroll effects, starting on a click or after another block, staggered groups, split text, and site-wide rules.',
					'animategl'
				) }
			</p>
			<p style={ { margin: 0 } }>
				<ExternalLink href={ window.aglEditor.proUrl }>{ __( 'See AnimateGL Pro', 'animategl' ) }</ExternalLink>{ ' ' }
				<Button variant="link" onClick={ () => set( 'animategl', 'hideProRow', true ) } style={ { marginLeft: '12px' } }>
					{ __( 'Hide this', 'animategl' ) }
				</Button>
			</p>
		</Section>
	);
}

/**
 * The AnimateGL controls: in the block settings sidebar, or in the toolbar dropdown for blocks in a locked pattern
 */
function AnimationControls( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { aglInName, aglInDirection, aglInDuration, aglInDelay, aglInDistance, aglInEasing, aglRepeat, aglLockToScrollbar } =
		attributes;
	const [ previewFailed, setPreviewFailed ] = useState( false );

	const { names, presets } = entranceAnimations();
	const custom = names.filter( ( obj ) => obj.custom ).map( ( obj ) => obj.name );
	const directionOptions = {};
	// The list in three groups: the CSS animations, the WebGL ones, and the ones the user saved (AnimateGL Pro)
	const groups = { css: [], webgl: [], custom: [] };
	names.forEach( function ( obj ) {
		// Entries added by others (the custom animations of AnimateGL Pro) say their type and that they
		// have no directions; the built-in ones have CSS in their name and a preset per direction
		const isCSS = obj.type ? obj.type === 'css' : obj.name.includes( 'CSS' );
		const label = isCSS
			? /* translators: %s: animation name, e.g. Fade */ sprintf( __( '%s CSS', 'animategl' ), obj.title )
			: /* translators: %s: animation name, e.g. Fade */ sprintf( __( '%s WebGL', 'animategl' ), obj.title );
		groups[ obj.custom ? 'custom' : isCSS ? 'css' : 'webgl' ].push( { label, value: obj.name } );
		directionOptions[ obj.name ] = [];
		if ( obj.custom ) {
			directionOptions[ obj.name ].push( { label: directionLabel( '' ), value: '' } );
			return;
		}
		for ( const preset in presets ) {
			if ( preset.includes( obj.name ) && ! custom.includes( preset ) ) {
				const direction = preset.replace( obj.name, '' );
				if ( ! direction.includes( 'CSS' ) ) {
			directionOptions[ obj.name ].push( { label: directionLabel( direction ), value: direction } );
				}
			}
		}
	} );

	// "Site default" (the value custom, for the classes it has always saved) is the animation set on the AnimateGL
	// page: the block gets the agl class alone, so the timing controls don't apply to it
	const isSiteDefault = aglInName === 'custom';
	const directionList = directionOptions[ aglInName ] || [];
	const option = ( item ) => (
		<option key={ item.value } value={ item.value }>
			{ item.label }
		</option>
	);

	return (
		<Fragment>
			<SelectControl
				__next40pxDefaultSize
				label={ __( 'Entrance Animation', 'animategl' ) }
				help={
					isSiteDefault
						? __( 'The animation set on the AnimateGL page. To change its timing, pick an animation here.', 'animategl' )
						: __( 'CSS animations are light and work on any block. WebGL ones draw the block on a canvas and look best on images.', 'animategl' )
				}
				value={ aglInName }
				onChange={ ( value ) => {
					setAttributes( {
						aglInName: value,
						aglInDirection: '', // reset direction when entrance name changes
						aglInDistance: 1, // reset distance when entrance name changes
					} );
					if ( value ) {
						autoPreview( clientId, ( ok ) => setPreviewFailed( ! ok ) );
					} else {
						cancelAutoPreview();
						setPreviewFailed( false );
					}
				} }
			>
				<option value="">{ __( 'None', 'animategl' ) }</option>
				<option value="custom">{ __( 'Site default', 'animategl' ) }</option>
				<optgroup label={ __( 'CSS', 'animategl' ) }>{ groups.css.map( option ) }</optgroup>
				<optgroup label={ __( 'WebGL', 'animategl' ) }>{ groups.webgl.map( option ) }</optgroup>
				{ groups.custom.length > 0 && <optgroup label={ __( 'My animations', 'animategl' ) }>{ groups.custom.map( option ) }</optgroup> }
			</SelectControl>

			{ aglInName && aglInName !== '' && (
				<Fragment>
					<div style={ { marginBottom: '16px' } }>
						<Button
							variant="secondary"
							onClick={ () => setPreviewFailed( ! previewAnimation( clientId, attributes ) ) }
						>
							{ __( 'Preview animation', 'animategl' ) }
						</Button>
					</div>
					{ previewFailed && (
						<Notice status="warning" isDismissible={ false }>
							{ __( "This block isn't visible in the editor, so it can't be previewed.", 'animategl' ) }
						</Notice>
					) }
				</Fragment>
			) }

			{ aglInName && ! isSiteDefault && (
				<Fragment>
					{ directionList.length > 1 && (
						<SelectControl
							__next40pxDefaultSize
							label={ onlyDirections( directionList ) ? __( 'Direction', 'animategl' ) : __( 'Variant', 'animategl' ) }
							value={ aglInDirection }
							options={ directionList }
							onChange={ ( value ) => {
								setAttributes( {
									aglInDirection: value,
								} );
								autoPreview( clientId, ( ok ) => setPreviewFailed( ! ok ) );
							} }
						/>
					) }

					<RangeControl
						__next40pxDefaultSize
						label={ __( 'Animation duration (ms)', 'animategl' ) }
						value={ aglInDuration || 1000 }
						onChange={ ( value ) => {
							setAttributes( {
								aglInDuration: value,
							} );
						} }
						min={ 0 }
						step={ 50 }
						max={ 3000 }
					/>

					<RangeControl
						__next40pxDefaultSize
						label={ __( 'Animation delay (ms)', 'animategl' ) }
						value={ aglInDelay || 0 }
						onChange={ ( value ) => {
							setAttributes( {
								aglInDelay: value,
							} );
						} }
						min={ 0 }
						step={ 50 }
						max={ 3000 }
					/>

					<SelectControl
						__next40pxDefaultSize
						label={ __( 'Easing', 'animategl' ) }
						value={ aglInEasing }
						options={ easingOptions() }
						onChange={ ( value ) => {
							setAttributes( {
								aglInEasing: value,
							} );
						} }
					/>

					<Section
						title={ __( 'Distance and replay', 'animategl' ) }
						active={ ( aglInDistance && aglInDistance !== 1 ) || aglRepeat || aglLockToScrollbar }
					>
						<RangeControl
							__next40pxDefaultSize
							label={ __( 'Animation distance', 'animategl' ) }
							value={ aglInDistance || 1 }
							onChange={ ( value ) => {
								setAttributes( {
									aglInDistance: value,
								} );
							} }
							min={ 0 }
							step={ 0.01 }
							max={ 5 }
						/>

						<ToggleControl
							label={ __( 'Repeat', 'animategl' ) }
							help={ __( 'Plays again each time the block scrolls into view.', 'animategl' ) }
							checked={ aglRepeat }
							onChange={ ( value ) => setAttributes( { aglRepeat: value } ) }
						/>

						<ToggleControl
							label={ __( 'Lock to Scrollbar', 'animategl' ) }
							help={ __( 'The animation follows the scrollbar instead of playing on its own.', 'animategl' ) }
							checked={ aglLockToScrollbar }
							onChange={ ( value ) => setAttributes( { aglLockToScrollbar: value } ) }
						/>
					</Section>
				</Fragment>
			) }

			{ /* More controls at the end of the panel, from other plugins. They get the block's edit props. Use
			     the Section component (src/section.js) to group them. */ }
			{ applyFilters( 'animategl.panel', null, props ) }

			<ProRow />
		</Fragment>
	);
}

/**
 * Whether the block's sidebar panel is hidden because the block is in a locked pattern, and if so how:
 * 'block' or 'root'. In WP 6.9+ the blocks inside an unsynced pattern (most of a block theme's templates), a
 * template part or a contentOnly template lock are in "contentOnly" editing mode until the user clicks Edit
 * pattern, and the sidebar then shows only the "content" and "list" InspectorControls groups. The pattern's
 * root block is in "default" mode, but its sidebar is limited the same way while its inner blocks are locked.
 * The toolbar's "other" group still shows for both (WP 7.1 block-editor: BlockToolbar, useBlockControlsFill).
 *
 * Not inside a synced pattern (core/block): its inner blocks belong to the pattern, not to this post or template.
 */
function useLockedInPattern( clientId, isSelected ) {
	return useSelect(
		( select ) => {
			if ( ! isSelected ) return false;
			const editor = select( blockEditorStore );
			if ( editor.getBlockParentsByBlockName( clientId, 'core/block' ).length ) return false;
			const mode = editor.getBlockEditingMode( clientId );
			if ( mode === 'contentOnly' ) return 'block';
			if ( mode !== 'default' || editor.getBlockName( clientId ) === 'core/template-part' ) return false;
			const { metadata } = editor.getBlockAttributes( clientId ) || {};
			const isRoot = !! ( metadata && metadata.patternName ) || editor.getTemplateLock( clientId ) === 'contentOnly';
			const innerLocked = editor.getBlockOrder( clientId ).some( ( id ) => editor.getBlockEditingMode( id ) !== 'default' );
			return isRoot && innerLocked ? 'root' : false;
		},
		[ clientId, isSelected ]
	);
}

const animateIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="M4 17.5h7V19H4zM4 13h4v1.5H4zM13.5 5 12 9.5 7.5 11l4.5 1.5 1.5 4.5 1.5-4.5L19.5 11 15 9.5z" />
	</SVG>
);

/**
 * A toolbar button with the AnimateGL controls in a dropdown, for blocks whose sidebar panel is hidden
 */
function ToolbarControls( { locked, ...props } ) {
	return (
		<BlockControls group="other">
			<ToolbarGroup>
				<Dropdown
					className="agl-toolbar-dropdown"
					contentClassName="agl-toolbar-dropdown__content"
					popoverProps={ { placement: 'bottom-start' } }
					renderToggle={ ( { isOpen, onToggle } ) => (
						<ToolbarButton
							icon={ animateIcon }
							label={ __( 'AnimateGL animation', 'animategl' ) }
							onClick={ onToggle }
							aria-expanded={ isOpen }
							isPressed={ !! props.attributes.aglInName }
						/>
					) }
					renderContent={ () => (
						<div style={ { width: '280px', maxHeight: '70vh', overflowY: 'auto', padding: '16px' } }>
							<h2 style={ { margin: '0 0 16px', fontSize: '13px', fontWeight: 500 } }>AnimateGL</h2>
							<AnimationControls { ...props } />
							{ locked === 'root' && (
								<p style={ { margin: '8px 0 0', fontSize: '12px', color: '#757575' } }>
									{ __(
										'This animates the whole pattern. To animate a block inside it, select that block and use its AnimateGL button. Blocks without one, such as groups and columns, need Edit pattern first.',
										'animategl'
									) }
								</p>
							) }
						</div>
					) }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

// Blocks whose sidebar opens on a Content tab (WP 7+), with the AnimateGL panel a tab away: they get the toolbar
// button as well as the panel. They're also the blocks the WebGL entrances and effects are for.
const toolbarBlocks = [ 'core/image', 'core/post-featured-image' ];

/**
 * The AnimateGL panel in the block settings sidebar, or the toolbar button where the sidebar can't show it
 */
const withSidebarSelect = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const locked = useLockedInPattern( props.clientId, props.isSelected );
		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ ( locked || toolbarBlocks.includes( props.name ) ) && <ToolbarControls { ...props } locked={ locked } /> }
				{ ! locked && (
					<InspectorControls>
						<PanelBody title="AnimateGL">
							<AnimationControls { ...props } />
						</PanelBody>
					</InspectorControls>
				) }
			</Fragment>
		);
	};
}, 'withSidebarSelect' );

addFilter( 'editor.BlockEdit', 'agl/with-sidebar-select', withSidebarSelect );

/**
 * Add the animation classes to the block in the editor, next to its own classes
 */
const withSidebarSelectProp = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const classes = animationClasses( props.attributes );
		if ( ! classes ) {
			return <BlockListBlock { ...props } />;
		}
		return <BlockListBlock { ...props } className={ classnames( props.className, classes ) } />;
	};
}, 'withSidebarSelectProp' );

addFilter( 'editor.BlockListBlock', 'agl/with-sidebar-select-prop', withSidebarSelectProp );

/**
 * Save the animation classes in the block markup
 */
const saveSidebarSelectAttribute = ( extraProps, blockType, attributes ) => {
	const classes = animationClasses( attributes );
	if ( classes ) {
		extraProps.className = classnames( extraProps.className, classes );
	}
	return extraProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'agl/save-sidebar-select-attribute', saveSidebarSelectAttribute );
