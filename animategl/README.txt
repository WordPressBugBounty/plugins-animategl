=== AnimateGL – WebGL & CSS Scroll Animations and Hover Effects for Gutenberg and Elementor ===
Contributors: creativeinteractivemedia
Tags: animation, scroll animation, hover effects, animate on scroll, gutenberg blocks
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Scroll animations, hover effects, typewriter text and count-up numbers for Gutenberg, Elementor and Bricks. CSS and 3D WebGL effects. No code.

== Description ==

[Live demo](https://animategl.com/ "Live AnimateGL demo") | [Documentation](https://creativeinteractivemedia.gitbook.io/animategl-wp/ "Documentation") | [Support](https://wordpress.org/support/plugin/animategl/ "Support") | [AnimateGL Pro](https://animategl.com/pro/ "AnimateGL Pro")

**Bring your pages to life with scroll animations and hover effects.** AnimateGL animates headings, text, images, buttons, cards and whole sections as they scroll into view, and moves them when the mouse is over them. Select a Gutenberg block, an Elementor widget, a Bricks element or a Divi module, pick an entrance animation or a hover effect, and publish. No code, and no new page builder to learn.

Most animation plugins stop at fade and slide. AnimateGL has those as fast CSS animations, and it adds **WebGL animations that bend, flip, peel, stretch and glitch an element in 3D**. CSS can't do these effects. They make a hero heading, a product image or a call-to-action button stand out.

[youtube https://youtu.be/CJeWoFO3bkY]

= Why AnimateGL =

* **Works where you already build.** Animate any block in the Gutenberg block editor, including dynamic blocks and blocks from other plugins. In Elementor, animate any section, column, container or widget, also Elementor 4's atomic elements, and in Bricks and Divi 5 any element or module. In any other theme or page builder, add a CSS class.
* **Effects you won't find in other plugins.** 9 WebGL animations with 3D distortion, page peel, glitch and directional fade, next to 13 GPU-accelerated CSS animations.
* **106 ready-made presets.** Each animation but Glitch plays centered or from the left, right, top or bottom. Every preset has a live preview in the admin.
* **Text effects.** Type a heading out with the typewriter effect, or count numbers up from 0 for stats and counters.
* **Hover and scroll effects.** Lift, Grow and Tilt an element while the mouse is over it, or Skew it with the scroll speed. Free, on any block or page builder element.
* **Full control.** Set the direction, distance, duration, delay and easing (23 easings, including elastic, bounce, springs and steps). Play an animation once or every time it enters the viewport, or lock it to the scrollbar.
* **Preview in the editor.** Click Preview animation in the block editor to see the animation before you publish.
* **Fast.** The core script is about 19 KB gzipped, has no dependencies and loads deferred. The WebGL renderer loads only on pages that use a WebGL animation.
* **SEO friendly and accessible.** Content stays visible to search engines and to visitors without JavaScript. Visitors who prefer reduced motion see your content without animation.
* **Free, no sign-up.** All 22 animations, 106 presets, the typewriter, count-up numbers and the free hover and scroll effects are in the free plugin. [AnimateGL Pro](https://animategl.com/pro/) adds more when you need it.

= How it works =

1. Install and activate AnimateGL.
2. Select a block in the block editor, or an element in Elementor, Bricks or Divi, and choose an entrance animation and, if you like, a hover effect.
3. Adjust the direction, duration and delay, preview it, and publish.

The animation plays on your live site when a visitor scrolls the element into view, and the hover effect when the mouse is over it.

= Animations included =

**CSS entrance animations** (GPU accelerated): Fade, Zoom In, Zoom Out, Wipe, Slide, Blur, Focus, Flip, Fold, Rotate, Roll, Skew, Pop.

**WebGL entrance animations**: Fade (directional), Slide, Stretch, Bend, Flip, Peel, Zoom In, Zoom Out, Glitch.

**Text effects** (any block): typewriter text and count-up numbers.

**Hover effects** (CSS, any element): Lift, Grow and Tilt.

**Scroll effects** (CSS, any element): Skew, which leans the element with the scroll speed.

Ideas for using them:

* Fade in a hero heading, then slide in its button with a short delay
* Stagger a row of cards or blog posts by giving each one a longer delay
* Reveal images in a portfolio or gallery with a wipe or zoom, and lift them on hover
* Count up the numbers in a stats row: customers, downloads, years in business
* Type out a tagline under the hero heading
* Peel or flip in a call-to-action banner
* Bend or stretch a product image as it scrolls into view
* Glitch in a bold headline on a tech or gaming site

= Scroll animations (animate on scroll) =

Entrance animations are scroll triggered: fade in, slide in, zoom or reveal an element as it scrolls into view. Each one plays when its element enters the viewport, by default once 70% of the element (or 200px of it) is visible.

Turn on **Repeat** to play the animation every time the element scrolls back into view.

= Lock to scrollbar (scroll-linked animations) =

Turn on **Lock to scrollbar** to tie an animation to the scroll position instead of a fixed duration. The animation's progress follows the scrollbar: as you scroll down, the element animates in, and it is fully in place when it reaches the middle of the viewport. It works with every CSS and WebGL animation, for scroll-driven reveals without writing code.

= Typewriter text effect =

Turn on **Type out the text** for a heading, paragraph or button, and its text is typed a character at a time behind a caret when it scrolls into view, or together with its entrance animation. Links and bold or italic text are kept, nothing on the page moves while it types, and screen readers read the whole text. With another page builder, add the class `agl-typewriter`.

= Count-up numbers (animated counter) =

Turn on **Count up the numbers** for any block or element, and every number in its text counts up from 0 when it scrolls into view, or together with its entrance. It ends exactly as written: 1,250, 98.6% or 1.200,50 keep their separators and decimals. Use it for stats, counters, prices and milestones. With another page builder, add the class `agl-count`.

= Easings =

Pick from 23 easings for every animation: linear, sine, quad, cubic, expo, back (overshoot), elastic, bounce, three springs (soft, bouncy and stiff, which set their own duration) and steps for a stop-motion look. WebGL animations follow an overshoot too.

= Hover effects =

Add a hover animation to any block or page builder element: **Lift** raises it, **Grow** scales it up and **Tilt** turns it in 3D toward the mouse. Use them on cards, buttons, images and call-to-action boxes. Pick one under **Hover effect** in the AnimateGL panel, or add a class such as `agl-hover-tilt`. They play after the entrance, with the mouse only, and not for visitors who prefer reduced motion.

[AnimateGL Pro](https://animategl.com/pro/) adds WebGL image hover effects such as zoom, liquid, ripple, glitch and colour reveal, and CSS reveals for any block. [See them live](https://animategl.com/hover-effects/).

= CSS animations =

CSS entrance animations are GPU accelerated and animate opacity, transform, clip-path and blur. Combine fade, zoom, slide, wipe, blur, flip, fold, rotate, roll, skew or pop with direction, distance, easing and delay to create elegant reveal animation effects for headings, text, buttons, images and whole sections. They work on any element, however complex.

= WebGL animations =

WebGL animations go beyond CSS. AnimateGL renders the element to an image with html2canvas, then animates it with custom GLSL shaders for 3D distortions, page peel, glitch and gradient (directional) fade effects. Use these motion effects, image effects and visual effects on simple elements like headings, buttons and images.

= Gutenberg block animations =

[youtube https://youtu.be/oPivzJHFIek]

Add animations for blocks in the Gutenberg block editor, including dynamic blocks like Latest Posts and blocks from other plugins. Select the block, open the AnimateGL panel in the block settings sidebar, and choose the animation type, direction, distance, duration, delay and easing, a hover or scroll effect, the typewriter or count-up. Click **Preview animation** to play it right in the block editor. Your blocks stay visible while you edit. Image blocks and blocks in locked patterns and block theme templates have the same controls in their toolbar.

= Elementor animations =

[youtube https://youtu.be/LKEA4IO1yHM]

Add an entrance animation or a hover effect to any Elementor section, column, container or widget. Open the element's Advanced tab and choose the animation type, direction, distance, duration, delay and easing in the AnimateGL section. Elementor 4's atomic elements have the same settings in their panel.

= Bricks animations =

Add an entrance animation or a hover effect to any Bricks section, container, block, div or element. Open the element's Style tab and choose the animation type, direction, distance, duration, delay and easing in the AnimateGL group. The builder's canvas shows the element as it is, without its animation: preview the page to see it play.

= Divi animations =

Add an entrance animation or a hover effect to any Divi 5 section, row or module. Open the module's Advanced tab and choose the animation type, direction, distance, duration, delay and easing in the AnimateGL group. The Visual Builder shows the module as it is, without its animation: preview the page to see it play. On Divi 4, add an animation's CSS class in the module's CSS Class field.

= CSS class animations for any page builder =

Not using Gutenberg, Elementor, Bricks or Divi 5? Add an animation's CSS class to any element in Visual Composer, another page builder or your theme, for example `agl agl-fadeCSSUp` or `agl agl-bendLeft`. The Animations tab of the AnimateGL admin page lists every preset animation with a live preview and a CSS class you can copy, and its class builder writes the classes for the settings you pick.

= Animation Editor =

Design your own entrance animation in the visual Animation Editor on the AnimateGL admin page, then apply it to any element with the `agl` class. You can set:

* Fade, with directional fade and threshold
* Translate along the x, y and z axes
* Rotation around the x, y and z axes
* Corners distortion
* Duration, delay and easing

You can set the same properties with CSS classes.

= AnimateGL Pro =

[AnimateGL Pro](https://animategl.com/pro/) is a separate plugin that includes everything in the free plugin, which it replaces, plus:

* **Tile entrances**: Assemble, Tile flip, Materialize, Vortex and Murmuration break an image or block into tiles that fly, flip or grow into place, with tile hover effects (push, lift, scatter) and a Scatter scroll effect
* **WebGL image hover effects**: zoom, bulge, light, liquid, ripple, drag, pixel smear, glitch, RGB shift, an image swap, and colour reveal with spotlight, focus, mosaic, trail and before-and-after variations. [See them live](https://animategl.com/hover-effects/)
* **CSS hover reveals** for any block, and hover effects on touch screens
* **Scroll effects**: bend, wave, RGB shift, glitch and tile scatter while the page scrolls, and scroll motion: parallax scrolling and fade on scroll. [See them live](https://animategl.com/scroll-effects/)
* **Animated WebGL section backgrounds** (Flow, Blobs, Waves, Aurora, Grain, Mesh) for Group and Cover blocks and Elementor containers
* **Loop animations**: pulse, float, wobble, shake, heartbeat and swing
* **Text animations**: split a heading into words or letters, and stagger a group's blocks one after another
* **Triggers and sequences**: play an animation on page load, a click, a hover or a class, or after another block's animation ends
* **Per-device animations and play once** per visit
* **My animations**: save your own animations and use them like presets
* **Site-wide rules** that animate every block of a type, or every element matching a CSS selector
* The Entrance Pack and Fade Pack presets

Pro is a yearly or lifetime license from [animategl.com](https://animategl.com/pricing/). The free plugin stays complete on its own: nothing in it is locked or time-limited.

= More animations =

Get more entrance animations with add-ons (included in AnimateGL Pro):

* [Entrance Pack](https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-pack/45375689?s=org): Circle, Square and Line CSS animations
* [Fade Pack](https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-fade-pack/46383362): more fade animations

= Source code =

Every minified script ships with its readable source in the plugin: `js/lib/animategl.js` (animation runtime), `js/lib/animategl.webgl.js` (its WebGL part, loaded only for WebGL animations), `js/lib/animategl.editor.js` (Animation Editor), `js/lib/html2canvas-pro.js` ([html2canvas-pro](https://github.com/yorickshan/html2canvas-pro) with three small fixes, marked in the file), and `src/index.js` (block editor controls, built with @wordpress/scripts).

= Help us improve =

If you run into a problem or want a new feature, please [open a support topic](https://wordpress.org/support/plugin/animategl/). If AnimateGL helps your site, a [review](https://wordpress.org/support/plugin/animategl/reviews/#new-post) helps other people find it.

== Installation ==

1. In your WordPress admin, go to Plugins > Add New Plugin, search for "AnimateGL", then install and activate it.
2. In the block editor, select a block, open the AnimateGL panel in the block settings sidebar and choose an entrance animation or a hover effect.
3. In Elementor, select an element, open the Advanced tab and choose an animation in the AnimateGL section.
4. In Bricks, open the element's Style tab, and in Divi 5 the module's Advanced tab, and choose an animation in the AnimateGL group.
5. With any other page builder, add a preset CSS class such as `agl agl-fadeCSSUp` to the element. The Animations tab of the AnimateGL admin page lists them all.

== Frequently Asked Questions ==

= How do I add scroll animations to a Gutenberg block? =

Select the block and open the AnimateGL panel in the block settings sidebar, then choose an entrance animation. You can also add a preset CSS class in Advanced > Additional CSS class(es).

= How do I add animations in Elementor? =

Select the section, column, container or widget, open the Advanced tab and choose the animation in the AnimateGL section. You can also add a preset CSS class in Advanced > Layout > CSS Classes.

= How do I add animations in Bricks or Divi? =

In Bricks, select the element and open the AnimateGL group in its Style tab. In Divi 5, open the module's Advanced tab and the AnimateGL group. Preview the page to see the animation play. On Divi 4, add the animation's CSS class to the module's CSS Class field.

= How do I add a hover effect? =

Select the block or element, open the AnimateGL settings and pick Lift, Grow or Tilt under Hover effect. With another page builder, add the class `agl-hover-lift`, `agl-hover-grow` or `agl-hover-tilt`. AnimateGL Pro adds WebGL image hover effects and CSS reveals.

= How do I make an animation follow the scroll position? =

Turn on Lock to scrollbar. The animation's progress then follows the scrollbar instead of a fixed duration, and the element is fully in place when it reaches the middle of the viewport. For parallax scrolling and fade on scroll, see AnimateGL Pro's scroll motion.

= Can the animation play every time the element scrolls into view? =

Yes. Turn on Repeat. By default an animation plays once, the first time the element enters the viewport.

= How do I add a typewriter effect to a heading? =

Select the heading and turn on Type out the text in the AnimateGL settings, or add the class `agl-typewriter`. The text is typed out when it scrolls into view.

= How do I make numbers count up? =

Turn on Count up the numbers in the AnimateGL settings, or add the class `agl-count`. Every number in the element's text counts up from 0 when it scrolls into view and ends as written, with its separators and decimals.

= Which easings can I use? =

Linear, sine, quad, cubic, expo, back, elastic, bounce, three springs and steps, 23 in all, in the block sidebar, the page builders and the class builder. A spring sets its own duration.

= Is AnimateGL free? =

Yes. All 22 animations, the 106 presets, the typewriter, count-up numbers, the Lift, Grow, Tilt and Skew effects, the Animation Editor and the Gutenberg, Elementor, Bricks and Divi controls are free, with no sign-up and no time limit. AnimateGL Pro is optional.

= What does AnimateGL Pro add? =

WebGL image hover effects, scroll effects with parallax, animated section backgrounds, loop animations, split text and stagger, triggers and sequences, per-device animations, saved animations, site-wide rules and the add-on presets. See the AnimateGL Pro section above, or [animategl.com/pro](https://animategl.com/pro/).

= Does it work with blocks from other plugins? =

Yes. The AnimateGL panel appears for every block, including blocks from block libraries and dynamic blocks like Latest Posts.

= Where is the list of CSS classes for entrance animations? =

On the Animations tab of the AnimateGL admin page. Every preset has a live preview and a CSS class you can copy.

= Can I preview an animation in the block editor? =

Yes. Click Preview animation in the AnimateGL panel to play the selected block's animation. Blocks are never hidden while you edit.

= How do I stagger animations, one element after another? =

Give each element the same animation and a longer delay than the one before it, for example 0, 150 and 300 ms. AnimateGL Pro staggers a group's blocks, or a heading's words, for you.

= Does AnimateGL work with other page builders and themes? =

Yes. You can add animations to any element with a CSS class, so they work with any theme or page builder.

= How is AnimateGL different from Animate On Scroll (AOS) or Animate.css? =

They are JavaScript and CSS libraries you add to a theme by hand. AnimateGL is a WordPress plugin: you choose animations in the block editor or your page builder, without code. It also has WebGL animations, such as bend, flip, peel and glitch, that CSS-only libraries can't do.

= Will animations slow down my website? =

CSS animations are GPU accelerated, and the core animation script is about 19 KB gzipped, has no dependencies and loads deferred. The WebGL renderer loads only on pages that use a WebGL animation.

= Is my content visible to search engines and without JavaScript? =

Yes. AnimateGL hides an element only while its animation is waiting to play. Without JavaScript, or if the animation script can't load, the content is shown.

= What about visitors who prefer reduced motion? =

When reduced motion is turned on in the visitor's system settings, AnimateGL shows the content without animating it, and hover and scroll effects stay off.

= What are the limitations of WebGL animations? =

WebGL animations work best on simple elements like headings, buttons and images. For complex elements like whole sections, use the CSS animations.

= A WebGL animation is drawn above my fixed header =

WebGL animations and effects are drawn on one canvas above the page, at z-index 999, so while a block animates or is hovered it covers anything with a lower z-index, such as a sticky header or a cookie banner. Give the header a higher z-index (1000 or more), or lower the canvas's in the Settings tab of the AnimateGL page: it must stay above the animated blocks and their backgrounds. Developers can also set the `--agl-canvas-z-index` custom property on the `html` element in CSS, or use the `animategl_canvas_z_index` filter.

== Screenshots ==

1. Elementor: choose an entrance animation in the AnimateGL section of the Advanced tab.
2. Block editor: set the animation, direction, duration and delay in the block's AnimateGL panel.
3. Cards animating in on the front end as the page scrolls.
4. Block editor: add a Fade Left animation to an image block.

== Upgrade Notice ==

= 1.7.0 =
Eight more free CSS animations, count-up numbers, typewriter text, and Bricks and Divi 5 support. Requires WordPress 6.6 and PHP 7.4.

= 1.6.0 =
More easings, free Lift, Grow, Tilt and Skew effects, AnimateGL settings for Elementor 4's atomic elements, and WebGL animations on text that start sooner and end exactly in place (html2canvas-pro). Requires WordPress 6.6 and PHP 7.4.

= 1.5.0 =
* New: Settings and Docs links on the Plugins screen, and an AnimateGL menu icon
* Improvement: The block sidebar's AnimateGL panel keeps the main settings in view and folds the rest into groups; easings have readable names
* New: Redesigned AnimateGL page: a Home tab with status and quick start, a searchable animation gallery with copy buttons, a class builder for page builders, the editor next to its preview, and a Help tab with system info for support
* Improvement: The animation gallery plays an animation when the mouse is over it, opens any animation in the editor with Customize, and shows AnimateGL Pro's hover, scroll and text effects as short clips; the editor's controls match the WordPress admin
Requires WordPress 6.6 and PHP 7.4. Adds an animation preview to the block editor, respects reduced motion, and keeps content visible without JavaScript.

== Changelog ==

= 1.7.0 =
* New: Eight more free CSS animations, each with four directions: Blur (sharpens as it fades in), Focus (sharpens as it settles from a little larger), Flip (turns in from edge on), Fold (swings out on a hinge at one edge), Rotate (spirals in, or turns or swings on a corner), Roll (rolls in from the side), Skew (slides in leaning and straightens) and Pop (grows past its size and settles). In the block sidebar, Elementor, Bricks, the class builder and the Animation Editor, and as classes such as agl-blurCSSUp or agl-popCSS
* New: Count-up numbers, free. Turn on "Count up the numbers" for any block or Elementor element and each number in it counts up from 0 when it scrolls into view, or with its entrance, and ends as written: 1,250, 98.6% or 1.200,50 keep their separators and decimals. As the class agl-count. Visitors who prefer reduced motion see the numbers as written
* New: Typewriter text, free. Turn on "Type out the text" for any block or Elementor or Bricks element and its text is typed a character at a time behind a caret when it scrolls into view, or with its entrance. Links and formatting are kept, nothing moves while it types and screen readers read the whole text. As the class agl-typewriter. Visitors who prefer reduced motion see the text as written
* New: Bricks builder support. Every Bricks element has an AnimateGL group in its Style tab with the entrance animation, its direction, duration, delay, distance and easing, and the hover and scroll effects. Preview the page to see them play
* New: Divi 5 support. Every Divi section, row and module has an AnimateGL group in its Advanced tab with the entrance animation, its direction, duration, delay, distance and easing, and the hover and scroll effects. Preview the page to see them play
* Fix: On phones, WebGL animations and effects could trail a little behind the page while it scrolled, most visibly in a page shown inside another (an iframe). The WebGL drawing is now moved, placed and drawn in the same frame as the page
* Fix: A WebGL animation locked to the scrollbar whose block came on screen in one jump (a link to an anchor, a fast fling) stayed blank until the page scrolled again
* New: A Settings tab on the AnimateGL page with the WebGL canvas's z-index (999 by default), for sites where an animating block covered a fixed header or banner. Also as the --agl-canvas-z-index custom property on the html element and the animategl_canvas_z_index filter

= 1.6.0 =
* New: Glitch, a WebGL entrance: the block arrives in bursts, bands jumping sideways and its colours splitting, and settles. As the class agl-glitch. A plain fade under reduced motion
* Improvement: New plugin name, AnimateGL – WebGL & CSS Scroll and Hover Animations for Gutenberg and Elementor
* New: More easings for every animation, in the block sidebar, Elementor and the class builder: Elastic, Bounce, three springs (soft, bouncy and stiff, which set their own duration), Steps, and Overshoot in and in-and-out. WebGL animations follow an overshoot too (agl-in-easing-easeOutElastic, agl-in-easing-spring-bouncy, agl-in-easing-steps-5 and the rest as classes)
* New: Free hover effects Lift, Grow and Tilt, and the Skew scroll effect, for any block or Elementor element. Try them live in the Animations tab, which now links to animategl.com for the Pro effects instead of bundling their clips
* Improvement: WebGL animations on text and other elements that aren't images take their snapshot with html2canvas-pro, the maintained successor of html2canvas, in place of our patched html2canvas 1.4.1. Modern CSS colors such as oklch() and color-mix() are drawn as the page shows them, images with object-fit are cropped as on the page, and text stays exactly in place when the animation ends
* New: Elementor 4's atomic elements (Div block, Flexbox, Heading, Paragraph, Image and the rest, the default on sites that installed Elementor 4.0 or later) have the AnimateGL settings in their panel
* Improvement: WebGL animations on text and other elements that aren't images take their snapshot a screen before they scroll into view, in idle time, so the animation starts without a pause, and don't take it again on every frame while the page scrolls
* Fix: A WebGL animation on text or a card could end a device pixel away from where the element is drawn, so the element shifted when it came back, and its text looked a little bolder or thinner while it animated; the fade animations also left light areas too bright until they ended
* Fix: On a Mac, WebGL animations on text looked bolder than the page's text on sites whose theme uses -webkit-font-smoothing: antialiased (many do). The snapshot's text is now drawn with the same smoothing in Chrome and Firefox, and thinned to match in Safari (the snapshot is now taken on a canvas of the page, not an off-screen one, which ignored the page's smoothing)
* Fix: html2canvas, which takes the snapshot for WebGL animations on text, is loaded with the plugin's version, so browsers and CDNs take the new copy after an update instead of keeping the old one for a month
* Fix: A WebGL animation on an image or a block with an image could blink out for a moment as it ended, before the image came back (in Chrome, mostly with WordPress's decoding="async" images). The WebGL frame now stays until the image is decoded and painted, drawn exactly at the animation's end and placed on the same device pixels as the element in Chrome too, so the element doesn't move a fraction of a pixel when it comes back or when a hover effect starts (also at browser zoom levels other than 100%, such as 90%)

= 1.5.0 =
* Improvement: The Fade animation (all directions, and the Default animation) is drawn with CSS instead of WebGL. It looks the same, starts sooner, keeps text exactly as the page shows it, and works with modern CSS colors. Add the class agl-webgl to an element to keep WebGL
* Fix: WebGL animations of an element in a grid or flex layout jumped to another size when they ended
* Improvement: Faster pages with only CSS animations: the WebGL part of the runtime (js/lib/animategl.webgl.min.js) now loads only on pages with a WebGL animation
* Improvement: WebGL animations use far less graphics memory (shared render targets, drawn at most at 2x pixel density), stop drawing when nothing moves, recover from a lost WebGL context, and let go of animated elements removed from the page
* Improvement: WebGL animations start sooner on pages with several of them: elements with the same effects share one compiled shader program
* Fix: An element removed from the page in the middle of its WebGL entrance, and put back before it ended, stayed hidden until then
* Fix: Picking another animation for a block while its entrance played (in the block editor, or with a class change) didn't play the new one, could leave the block hidden or scaled, or leave the WebGL copy drawn over it
* Improvement: WebGL animations keep working when an optimization plugin (WP Rocket, LiteSpeed Cache, Autoptimize and others) moves, renames or combines the AnimateGL script, and an element whose WebGL part can't load is shown without the effect
* Improvement: Add-on presets (Entrance Pack, Fade Pack) work whichever order the scripts load in, also when an optimization plugin moves them, and are listed once
* Fix: The agl-animation-start event was missing for an entrance whose first frame came after its end (short durations on slow devices)
* New: Preview animation button in the block editor plays the selected block's animation
* New: Picking an animation or a direction in the block editor plays it right away
* New: AnimateGL controls in the block toolbar of image blocks, whose sidebar opens on the Content tab, and of blocks inside locked patterns and block theme templates, where the sidebar hides the AnimateGL panel
* Improvement: Block editor panel: the animation list is grouped into CSS and WebGL (and My animations), "Default" is now "Site default" and shows only the controls that apply to it, the fade variants have readable names, the direction list is left out when there is one, and the controls use the current WordPress size
* New: Respects the reduced motion accessibility setting
* New: Content stays visible without JavaScript, and when the animation script can't load
* New: Readable source of every script is included in the plugin
* New: NOTICES.md lists the third-party libraries and their licences, and each script names the ones it includes
* Improvement: Scripts load deferred, in the footer
* Improvement: Block editor controls rebuilt with current WordPress tooling, and fully translatable
* Improvement: Animation classes no longer replace a block's other classes in the editor
* Improvement: The text domain is now animategl, so translations from translate.wordpress.org apply
* Improvement: Updated the Freemius SDK to 2.13.4
* Developers: New hooks for add-ons: animategl_block_attributes, animategl_block_classes, animategl_runtime_dependencies, animategl_elementor_controls, animategl_elementor_classes, animategl_admin_tabs and animategl_admin_tab_content in PHP; animategl.classes and animategl.panel in the block editor. Presets added by add-ons can set their type (CSS or WebGL) and, in agl.defaults.in.names, mark themselves custom (no directions). In the runtime: AnimateGL.play(element) and AnimateGL.reset(element), the agl-manual class for elements that wait for play(), the agl-animation-start and agl-animation-end events, AnimateGL.registerEffect(name, { init, render }) for effects that run while the page scrolls, picked with the class agl-scroll-<name>, and AnimateGL.registerHoverEffect(name, { init, render }) for effects that run while the mouse is over an element, picked with agl-hover-<name>; its render gets the mouse position, eased velocity (vx, vy, speed) and time (AnimateGL.touchHover = true makes a finger on a touch screen count as the mouse). Both can pass a shader (GLSL chunks and uniforms), which is added only to the elements that use the effect. The class agl-in-none makes an image an AnimateGL element with no entrance, so it can have scroll and hover effects without an animation. The animategl_show_addons_tab filter hides the Addons tab. Preview in the block editor also loads scripts added through animategl_runtime_dependencies
* Fix: Animated elements inside content added after the page loads (sliders, AJAX loaders, infinite scroll) now animate, not only ones added on their own
* Fix: An image cropped to its block (for example with an aspect ratio set, or object-fit: cover) was drawn stretched during a WebGL animation, then jumped to its real crop when the animation ended
* Fix: Elements with rounded corners (border-radius) were drawn with square corners during a WebGL animation
* Fix: Hover and scroll effects from add-ons showed an image with a WebGL fade entrance slightly faded
* Fix: Text with a WebGL animation could be drawn too low and cut off at the bottom while it animated, on themes that style images as blocks
* Fix: Blocks with modern CSS colours (color-mix(), oklch(), lab()), such as separators and post dates in Twenty Twenty-Five or tables in Ollie, showed without their WebGL animation
* Fix: A pullquote or table block with a WebGL animation stayed hidden, and could stop later blocks on the page from animating
* Fix: Images and translation files of the Freemius SDK were damaged in the plugin package
* Security: The AnimateGL page and its settings require the manage_options capability, and saved settings are validated
* Security: Elementor animation settings are validated before they're added to the page
* Change: Requires WordPress 6.6 and PHP 7.4

= 1.4.25 =
* Fix: Block editor didn't load on WordPress 7.1 ("Cannot read properties of null (reading 'appendChild')" in animategl.min.js)
* Fix: Animated blocks were invisible in the block editor
* Fix: Dynamic blocks failed with "Invalid parameter(s): attributes", and didn't animate on the front end
* Fix: PHP warnings and editor errors with Elementor 3.26 and later
* Fix: An element with a WebGL animation could stay hidden if the WebGL renderer failed to load
* Change: Animations no longer play inside the block editor, only on the front end. Running them in the editor made it crash on WordPress 7.1.
* Tested with WordPress 7.1

= 1.4.24 =
* Security: Only administrators can save AnimateGL settings. The settings AJAX action no longer accepts requests from logged-out users and checks the manage_options capability.

= 1.4.23 =
* Fix: CSS animation repeat

= 1.4.22 =
* Fix: WebGL animation not working before scroll

= 1.4.21 =
* Improvement: Performance improvements 

= 1.4.20 =
* Improvement: Performance improvements 

= 1.4.19 =
* Improvement: Better performance for Lock to scrollbar animations 

= 1.4.18 =
* Fix: Updated Freemius SDK to 2.5.10 to fix a vulnerability in Freemius SDK <= 2.5.9

= 1.4.17 =
* Fix: Increasing viewport height in Safari 

= 1.4.16 =
* Improvement: Faster WebGL animation loading time 

= 1.4.15 =
* Improvement: Admin page Animation editor
* Improvement: Element entrance animation trigger changed to 70% or 200px of element is in viewport

= 1.4.14 =
* Fix: Cache busting for scripts

= 1.4.13 =
* Fix: Animations not working on front end

= 1.4.12 =
* Improvement: Play entrance animation when 70% of element enters the viewport
* Improvement: WebGL Zoom In animation
* New: WebGL Zoom Out animation

= 1.4.11 =
* Fix: Animations of elements with background-attachment: fixed

= 1.4.10 =
* Improvement: WebGL flip animations.

= 1.4.9 =
* New: Presets in Animation Editor.
* Fix: Animation editor bugs.
* Improvement: WebGL stretch, bend, fade animations.

= 1.4.8 =
* New: Animation Distance option.
* Improvement: WebGL Fade animations.
* Improvement: Reset animation direction when animation name changes.

= 1.4.7 =
* Fix: WebGL Fade shader.
* New: Support for Entrance Fade pack.

= 1.4.6 =
* Improvement: Admin page Entrance Presets sorted by type.
* Fix: CSS animations Fade and Slide.

= 1.4.5 =
* Fix: Progress in Animation editor not working.
* New: CSS animation type in Animation editor.

= 1.4.4 =
* Improvement: Added tabs Support and Addons to Admin page.

= 1.4.3 =
* Improvement: Playing only selected animation in plugin admin page, Entrance Presets.
* Fix: Animations on plugin admin page, Entrance Presets broken after using animation editor.

= 1.4.2 =
* Fix: Animation cannot be added to inner section in Elementor.
* Improvement: Better animation performance.
* Improvement: New plugin admin page.

= 1.4.1 =
* Fix: Wrong element position when repeating entrance animation.
* Fix: Element in Elementor editor becomes invisible after it is clicked.
* Fix: Default option missing in entrance animation name dropdown.

= 1.4 =
* New: Entrance animation "lock to scrollbar" - animation progress depends on the scroll position.
* New: Entrance animation "repeat" - play entrance animation each time element enters the viewport.
* Improvement: Better animation performance.

= 1.3.9 =
* Fix: Wipe animation.
* New: Getting Started admin page.
* New: Add-ons admin page.

= 1.3.8 =
* New: Added support for more entrance animations via addons.

= 1.3.7 =
* Improvement: Added more easing options for animations.
* Fix: Image flashing at the end of WebGL animation.

= 1.3.6 =
* Fix: Image scaling inside WebGL animated element.

= 1.3.5 =
* Fix: Animating parent and child elements at the same time.

= 1.3.4 =
* Improvement: Faster loading, better animation performance.
* Improvement: Faster admin page with animation preview.

= 1.3.3 =
* New: Wipe CSS animation.
* New: Slide CSS animation.

= 1.3.2 =
* Fix: Entrance animation now starts when element enters the viewport, instead of waiting for center of the element to enter the viewport.
* Fix: Hardware accelerated CSS animations.
* New: Default (center) direction for animations.

= 1.3.1 =
* New: Zoom In and Zoom Out CSS animations.

= 1.3 =
* New: Fade In CSS animation.

= 1.0.0 =
* Initial release of the plugin.