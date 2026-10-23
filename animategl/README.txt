=== AnimateGL Animations for WordPress - Elementor & Gutenberg Blocks Animations ===
Contributors: creativeinteractivemedia
License: GPLv3
License URI: http://www.gnu.org/licenses/gpl-3.0.html
Tags: animation, scroll animation, animate on scroll, gutenberg animation, elementor animation
Requires at least: 5.0
Tested up to: 7.1
Stable tag: 1.4.25
Requires PHP: 5.4

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
* **Fast.** The script is about 37 KB gzipped. The WebGL renderer loads only on pages that use a WebGL animation.
* **Free, no sign-up.** All 13 animations and 65 presets are in the free plugin.

= How it works =

1. Install and activate AnimateGL.
2. Select a block in the block editor, or an element in Elementor, and choose an entrance animation.
3. Adjust the direction, duration and delay, and publish.

The animation plays on your live site when a visitor scrolls the element into view.

= Animations included =

**CSS entrance animations** (GPU accelerated): Fade, Zoom In, Zoom Out, Wipe, Slide.

**WebGL entrance animations**: Fade (directional), Slide, Stretch, Bend, Flip, Peel, Zoom In, Zoom Out.

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

Add animations for blocks in the Gutenberg block editor, including dynamic blocks like Latest Posts. Select the block, open the AnimateGL panel in the block settings sidebar, and choose the animation type, direction, distance, duration, delay and easing. Your blocks stay visible while you edit.

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

= Mouse and hover effects =

The Animation Editor also has mouse-driven distortion effects for interactive hover animations, such as Pull, with options for strength, size, RGB shift and ease.

= More animations =

Get more entrance animations with add-ons:

* [Entrance Pack](https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-pack/45375689?s=org): Circle, Square and Line CSS animations
* [Fade Pack](https://codecanyon.net/item/animategl-animations-for-wordpress-entrance-fade-pack/46383362): more fade animations

= Help us improve =

If you run into a problem or want a new feature, please [open a support topic](https://wordpress.org/support/plugin/animategl/). If AnimateGL helps your site, a [review](https://wordpress.org/support/plugin/animategl/reviews/#new-post) helps other people find it.

== Frequently Asked Questions ==

= How to add AnimateGL animations to any block in Gutenberg? =

Open Image block options > Advanced > AnimateGL, and select animation. Alternatively you can add animations via CSS class with Advanced > Additional CSS class, add the CSS class of the AnimateGL animation.

= Where is the list of CSS classes for Entrance animations? =

Available Entrance animations are listed on the plugin admin page.

= How to add AnimateGL animations to any element in Elementor? =

Open Image settings > Advanced > Layout > CSS Classes, add the CSS class of the AnimateGL animation. 

= What are the limitations of WebGL animations? =

WebGL animatinos are best to use for simple elements like headings, buttons or images. For more complex elements like sections it is better to use CSS animatinos.

== Changelog ==

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
* Fix: Updated Freemius SDK to 2.5.10 to fix a volnurability in Freemius SDK <= 2.5.9

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
* Improvement: New pugin admin page.

= 1.4.1 =
* Fix: Wrong element position when repeating entrance animation.
* Fix: Element in Elementor editor becomes invisible after it is clicked.
* Fix: Default option missing in entrance animation name dropdown.

= 1.4 
* New: Entrance animation "lock to scrollbar" - animation progress depends on the scroll position.
* New: Entrance animation "repeat" - play entrance enimation each time element enters the viewport.
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
* Fix: Entrance animation now starts when element enters the viewport, insterad of waiting for center of the element to enter the viewport.
* Fix: Hardware accelerated CSS animations.
* New: Default (center) direction for animations.

= 1.3.1 =
* New: Zoom In and Zoom Out CSS animations.

= 1.3 =
* New: Fade In CSS animation.

= 1.0.0 =
* Initial release of the plugin.