=== AnimateGL – WebGL & CSS Scroll and Hover Animations for Gutenberg and Elementor ===
Contributors: creativeinteractivemedia
Tags: animation, scroll animation, animate on scroll, gutenberg animation, elementor animation
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.6.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Animate on scroll for Gutenberg blocks and Elementor. CSS fade, slide, zoom and wipe, plus WebGL bend, flip and peel effects. No code needed.

== Description ==

[Live demo](https://animategl.com/ "Live AnimateGL demo") | [Documentation](https://creativeinteractivemedia.gitbook.io/animategl-wp/ "Documentation") | [Support](https://wordpress.org/support/plugin/animategl/ "Support")

**Bring your pages to life with scroll animations.** AnimateGL animates headings, text, images, buttons, cards and whole sections as they scroll into view. Select a Gutenberg block or an Elementor widget, pick an entrance animation, and publish. No code, and no new page builder to learn.

Most animation plugins stop at fade and slide. AnimateGL has those as fast CSS animations, and it adds **WebGL animations that bend, flip, peel and stretch an element in 3D**. CSS can't do these effects. They make a hero heading, a product image or a call-to-action button stand out.

[youtube https://youtu.be/0K6XG-ZrCjg]

= Why AnimateGL =

* **Works where you already build.** Animate any block in the Gutenberg block editor, including dynamic blocks and blocks from other plugins. In Elementor, animate any section, column, container or widget. In any other theme or page builder, add a CSS class.
* **Effects you won't find in other plugins.** 8 WebGL animations with 3D distortion, page peel and directional fade, next to 5 GPU-accelerated CSS animations.
* **65 ready-made presets.** Each of the 13 animations plays centered or from the left, right, top or bottom. Every preset has a live preview in the admin.
* **Full control.** Set the direction, distance, duration, delay and easing. Play an animation once or every time it enters the viewport, or tie its progress to the scrollbar.
* **Preview in the editor.** Click Preview animation in the block editor to see the animation before you publish.
* **Fast.** The core script is about 19 KB gzipped, has no dependencies and loads deferred. The WebGL renderer loads only on pages that use a WebGL animation.
* **SEO friendly and accessible.** Content stays visible to search engines and to visitors without JavaScript. Visitors who prefer reduced motion see your content without animation.
* **Free, no sign-up.** All 13 animations and 65 presets are in the free plugin.

= How it works =

1. Install and activate AnimateGL.
2. Select a block in the block editor, or an element in Elementor, and choose an entrance animation.
3. Adjust the direction, duration and delay, preview it, and publish.

The animation plays on your live site when a visitor scrolls the element into view.

= Animations included =

**CSS entrance animations** (GPU accelerated): Fade, Zoom In, Zoom Out, Wipe, Slide.

**WebGL entrance animations**: Fade (directional), Slide, Stretch, Bend, Flip, Peel, Zoom In, Zoom Out.

**Hover and scroll effects** (CSS, any element): Lift, Grow and Tilt while the mouse is over it, and Skew, which leans it with the scroll speed. [AnimateGL Pro](https://animategl.com/pro/) adds WebGL hover effects ([see them live](https://animategl.com/hover-effects/)) and WebGL scroll effects ([see them live](https://animategl.com/scroll-effects/)).

Ideas for using them:

* Fade in a hero heading, then slide in its button with a short delay
* Stagger a row of cards or blog posts by giving each one a longer delay
* Reveal images in a portfolio or gallery with a wipe or zoom
* Peel or flip in a call-to-action banner
* Bend or stretch a product image as it scrolls into view

= Scroll animations (animate on scroll) =

Entrance animations are scroll triggered. Each one plays when its element enters the viewport, by default once 70% of the element (or 200px of it) is visible.

Turn on **Repeat** to play the animation every time the element scrolls back into view. Turn on **Lock to scrollbar** to make the animation follow the scroll position instead of a fixed duration: as you scroll down, the element animates in until it reaches the middle of the viewport.

= CSS animations =

CSS entrance animations are GPU accelerated and animate opacity, transform and clip-path. Combine fade, zoom, slide or wipe with direction, distance, easing and delay to create elegant reveal animation effects for headings, text, buttons, images and whole sections. They work on any element, however complex.

= WebGL animations =

WebGL animations go beyond CSS. AnimateGL renders the element to an image with html2canvas, then animates it with custom GLSL shaders for 3D distortions, page peel and gradient (directional) fade effects. Use these motion effects, image effects and visual effects on simple elements like headings, buttons and images.

= Gutenberg block animations =

[youtube https://youtu.be/oPivzJHFIek]

Add animations for blocks in the Gutenberg block editor, including dynamic blocks like Latest Posts. Select the block, open the AnimateGL panel in the block settings sidebar, and choose the animation type, direction, distance, duration, delay and easing. Click **Preview animation** to play it right in the block editor. Your blocks stay visible while you edit.

= Elementor animations =

[youtube https://youtu.be/LKEA4IO1yHM]

Add an entrance animation to any Elementor section, column, container or widget. Open the element's Advanced tab and choose the animation type, direction, distance, duration, delay and easing in the AnimateGL section.

= CSS class animations for any page builder =

Not using Gutenberg or Elementor? Add an animation's CSS class to any element in Visual Composer, another page builder or your theme, for example `agl agl-fadeCSSUp` or `agl agl-bendLeft`. The AnimateGL > Entrance Presets admin page lists every preset animation with a live preview and a CSS class you can copy.

= Animation Editor =

Design your own entrance animation in the visual Animation Editor on the AnimateGL admin page, then apply it to any element with the `agl` class. You can set:

* Fade, with directional fade and threshold
* Translate along the x, y and z axes
* Rotation around the x, y and z axes
* Corners distortion
* Duration, delay and easing

You can set the same properties with CSS classes.

= More animations =

Get more entrance animations with add-ons:

* [Entrance Pack](https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-pack/45375689?s=org): Circle, Square and Line CSS animations
* [Fade Pack](https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-fade-pack/46383362): more fade animations

= Source code =

Every minified script ships with its readable source in the plugin: `js/lib/animategl.js` (animation runtime), `js/lib/animategl.webgl.js` (its WebGL part, loaded only for WebGL animations), `js/lib/animategl.editor.js` (Animation Editor), `js/lib/html2canvas-pro.js` ([html2canvas-pro](https://github.com/yorickshan/html2canvas-pro) with two small fixes, marked in the file), and `src/index.js` (block editor controls, built with @wordpress/scripts).

= Help us improve =

If you run into a problem or want a new feature, please [open a support topic](https://wordpress.org/support/plugin/animategl/). If AnimateGL helps your site, a [review](https://wordpress.org/support/plugin/animategl/reviews/#new-post) helps other people find it.

== Installation ==

1. In your WordPress admin, go to Plugins > Add New Plugin, search for "AnimateGL", then install and activate it.
2. In the block editor, select a block, open the AnimateGL panel in the block settings sidebar and choose an entrance animation.
3. In Elementor, select an element, open the Advanced tab and choose an animation in the AnimateGL section.
4. With any other page builder, add a preset CSS class such as `agl agl-fadeCSSUp` to the element. AnimateGL > Entrance Presets lists them all.

== Frequently Asked Questions ==

= How do I add scroll animations to a Gutenberg block? =

Select the block and open the AnimateGL panel in the block settings sidebar, then choose an entrance animation. You can also add a preset CSS class in Advanced > Additional CSS class(es).

= How do I add animations in Elementor? =

Select the section, column, container or widget, open the Advanced tab and choose the animation in the AnimateGL section. You can also add a preset CSS class in Advanced > Layout > CSS Classes.

= Is AnimateGL free? =

Yes. All 13 animations, the 65 presets, the Animation Editor and the Gutenberg and Elementor controls are free. The Entrance Pack and Fade Pack add-ons are optional and add more animations.

= Does it work with blocks from other plugins? =

Yes. The AnimateGL panel appears for every block, including blocks from block libraries and dynamic blocks like Latest Posts.

= Where is the list of CSS classes for entrance animations? =

Go to AnimateGL > Entrance Presets in your WordPress admin. Every preset has a live preview and a CSS class you can copy.

= Can I preview an animation in the block editor? =

Yes. Click Preview animation in the AnimateGL panel to play the selected block's animation. Blocks are never hidden while you edit.

= How do I stagger animations, one element after another? =

Give each element the same animation and a longer delay than the one before it, for example 0, 150 and 300 ms.

= Can the animation play every time the element scrolls into view? =

Yes. Turn on Repeat. By default an animation plays once, the first time the element enters the viewport.

= What is Lock to scrollbar? =

With Lock to scrollbar on, the animation follows the scroll position instead of playing for a fixed duration. The element finishes animating in when it reaches the middle of the viewport.

= Does AnimateGL work with other page builders and themes? =

Yes. You can add animations to any element with a CSS class, so they work with any theme or page builder.

= How is AnimateGL different from Animate On Scroll (AOS) or Animate.css? =

They are JavaScript and CSS libraries you add to a theme by hand. AnimateGL is a WordPress plugin: you choose animations in the block editor or Elementor, without code. It also has WebGL animations, such as bend, flip and peel, that CSS-only libraries can't do.

= Will animations slow down my website? =

CSS animations are GPU accelerated, and the core animation script is about 19 KB gzipped, has no dependencies and loads deferred. The WebGL renderer loads only on pages that use a WebGL animation.

= Is my content visible to search engines and without JavaScript? =

Yes. AnimateGL hides an element only while its animation is waiting to play. Without JavaScript, or if the animation script can't load, the content is shown.

= What about visitors who prefer reduced motion? =

When reduced motion is turned on in the visitor's system settings, AnimateGL shows the content without animating it.

= What are the limitations of WebGL animations? =

WebGL animations work best on simple elements like headings, buttons and images. For complex elements like whole sections, use the CSS animations.

== Screenshots ==

1. Elementor: choose an entrance animation in the AnimateGL section of the Advanced tab.
2. Block editor: set the animation, direction, duration and delay in the block's AnimateGL panel.
3. Cards animating in on the front end as the page scrolls.
4. Block editor: add a Fade Left animation to an image block.

== Upgrade Notice ==

= 1.6.0 =
More easings, free Lift, Grow, Tilt and Skew effects, AnimateGL settings for Elementor 4's atomic elements, and WebGL animations on text that start sooner and end exactly in place (html2canvas-pro). Requires WordPress 6.6 and PHP 7.4.

= 1.5.0 =
* New: Settings and Docs links on the Plugins screen, and an AnimateGL menu icon
* Improvement: The block sidebar's AnimateGL panel keeps the main settings in view and folds the rest into groups; easings have readable names
* New: Redesigned AnimateGL page: a Home tab with status and quick start, a searchable animation gallery with copy buttons, a class builder for page builders, the editor next to its preview, and a Help tab with system info for support
* Improvement: The animation gallery plays an animation when the mouse is over it, opens any animation in the editor with Customize, and shows AnimateGL Pro's hover, scroll and text effects as short clips; the editor's controls match the WordPress admin
Requires WordPress 6.6 and PHP 7.4. Adds an animation preview to the block editor, respects reduced motion, and keeps content visible without JavaScript.

== Changelog ==

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