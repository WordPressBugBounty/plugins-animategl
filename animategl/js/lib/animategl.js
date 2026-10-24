/*!
 * AnimateGL animategl.js includes:
 * anime.js v3.2.1 | (c) 2019 Julian Garnier | MIT License | https://animejs.com
 * See NOTICES.md for the licence texts.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 116:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ AnimatedPlane)
});

// EXTERNAL MODULE: ./node_modules/animejs/lib/anime.es.js
var anime_es = __webpack_require__(30);
// EXTERNAL MODULE: ./js/utils/functions.js
var functions = __webpack_require__(442);
;// CONCATENATED MODULE: ./js/webglLoader.js
// Loads the webgl chunk (webgl.js, built as animategl.webgl.min.js next to animategl.min.js) once, and sets it up on
// a layer. Where it's loaded from, in this order:
// 1. options.webglSrc, the chunk's full URL. The WordPress plugin passes it (embed.js), so the chunk is found when an
//    optimization plugin moved, renamed, combined or deferred the core.
// 2. The folder of the script this bundle runs from, with its query (WordPress adds ?ver=), when that script is
//    animategl.js or animategl.min.js. Pages outside WordPress (the Pro JS download, the demo) rely on this.
// 3. rootFolder + 'js/lib/', for a bundle that was renamed or combined with other scripts.
// If the chunk can't be loaded, every call rejects with the same error (no retries) and the callers show the element
// as itself (AnimatedPlane.whenWebGL()).

// While this bundle runs: document.currentScript is only set during that first run
const script = typeof document !== 'undefined' && document.currentScript;
const own = script && script.src && script.src.match(/^([^?#]*\/)animategl(?:\.min)?\.js([?][^#]*)?(?:#.*)?$/);

let chunk;

// Sets where webpack loads the chunk from
function locate(options) {
    const src = options.webglSrc;
    if (src && typeof src === 'string') {
        __webpack_require__.p = '';
        // Every chunk's filename is this URL: right while the webgl chunk is the core's only import() chunk. A second
        // one would load the webgl chunk in its place, so it needs its own URL (a webglSrc per chunk, by chunk id).
        __webpack_require__.u = () => src;
        return;
    }
    __webpack_require__.p = own ? own[1] : (options.rootFolder || '') + 'js/lib/';
    // The core's query, so the chunk is refreshed with it after an update
    const query = own && own[2];
    if (query) {
        const filename = __webpack_require__.u;
        __webpack_require__.u = (id) => filename(id) + query;
    }
}

// Resolves once the layer can draw with WebGL (layer.webglReady). Rejects if the chunk can't be loaded.
function loadWebGL(layer) {
    if (!layer.webglPromise) {
        if (!chunk) {
            locate(layer.options);
            // The core's CSP nonce, so a strict script-src policy allows the chunk's script tag too
            if (script && script.nonce) __webpack_require__.nc = script.nonce;
            chunk = __webpack_require__.e(/* import() | webgl */ 88).then(__webpack_require__.bind(__webpack_require__, 329));
        }
        layer.webglPromise = chunk.then((webgl) => webgl.attach(layer));
    }
    return layer.webglPromise;
}

;// CONCATENATED MODULE: ./js/AnimatedPlane.js




// The viewport observers, one of each kind for all elements: { options, callbacks (element → its callback) }.
// Each element gets the first of its entries in a batch, as with an observer of its own.
const viewportObserver = { options: { threshold: [0, 0.7] } };
const entranceObserver = { options: { rootMargin: '-200px 0px -200px 0px' } };

function observeViewport(shared, element, callback) {
    if (!shared.observer) {
        shared.callbacks = new WeakMap();
        shared.observer = new IntersectionObserver((entries) => {
            const seen = new Set();
            for (const entry of entries) {
                if (seen.has(entry.target)) continue;
                seen.add(entry.target);
                const fn = shared.callbacks.get(entry.target);
                if (fn) fn(entry);
            }
        }, shared.options);
    }
    shared.callbacks.set(element, callback);
    // Observed again (a new plane for the element): unobserved first, so it gets its first entry again
    shared.observer.unobserve(element);
    shared.observer.observe(element);
}

function unobserveViewport(shared, element) {
    if (!shared.observer) return;
    shared.observer.unobserve(element);
    shared.callbacks.delete(element);
}

// One animated element (.agl). This core class runs CSS entrances and everything that isn't drawing: options from
// the classes, the viewport observers, play()/reset(), events and the effects' lifecycle. Drawing with WebGL (OGL,
// the shaders, html2canvas) is in WebGLPlane.js, in the webgl chunk (animategl.webgl.min.js): the core loads it
// when an element needs it (needsWebGL()), and its methods then replace the stubs at the end of this class.
// Elements that need it start (observe()) once it has loaded, so their WebGL code always has it.
class AnimatedPlane {
    constructor(layer, { domElement, index, options, width, height } = {}) {
        this.layer = layer;
        this.animations = {};
        this.index = index;
        this.viewportWidth = width;
        this.viewportHeight = height;
        this.originalOptions = JSON.parse(JSON.stringify(options));
        this.useOffscreenCanvas = true;
        this.dataURL = false;
        this.initialState = true;

        this.initDomElement(domElement);
        this.initOptions();

        this.enabled = true;

        if (this.needsWebGL()) this.whenWebGL(() => this.start());
        else this.start();
    }

    // The WebGL renderer and scene, once the webgl chunk has set them up on the layer
    get gl() {
        return this.layer.gl;
    }

    get scene() {
        return this.layer.scene;
    }

    // Whether this element is drawn with WebGL: a WebGL entrance, or an image without one (agl-in-none) whose
    // scroll or hover effect draws it (effects registered with registerEffect() and registerHoverEffect() are WebGL)
    needsWebGL() {
        if (this.noEntrance) return !!(this.isImage && (this.scrollEffect || this.hoverEffect));
        return !this.isCSSAnimation;
    }

    // Runs fn now if the webgl chunk has loaded, or once it has. If it can't load, the element is shown as itself.
    whenWebGL(fn) {
        if (this.layer.webglReady) return fn();
        // catch, not then's second argument, so an error in fn also shows the element
        loadWebGL(this.layer).then(fn).catch((error) => {
            console.warn('AnimateGL:', error);
            this.failed = true;
            this.showDomElement();
        });
    }

    // Starts watching the element: the viewport, its children and the events it listens for
    start() {
        if (this.started) return;
        // Left the page while waiting for the webgl chunk: starts if it comes back
        if (this.detached) return (this.startWhenBack = true);
        this.started = true;
        this.observe();
        this.addListeners();
    }

    // The element left the page (main.js, or the agl-remove event): stops watching it, lets go of its WebGL objects
    // and leaves the layer's planes. Shown as itself if its entrance was playing. reattach() if it comes back.
    detach() {
        if (this.detached) return;
        this.detached = true;
        this.layer.removePlane(this);
        if (!this.started) return;
        const element = this.originalDomElement;
        unobserveViewport(viewportObserver, element);
        unobserveViewport(entranceObserver, element);
        this.unobserve();
        // As the observers reported a removed element before: out of view
        if (this.inViewport) {
            this.inViewport = false;
            this.onViewportExit();
        }
        // A WebGL entrance still running stops here: its anime.js instance would run on, and put back before it ended,
        // the element would wait hidden beside its objects created again. One playing ends now (shown as itself, its
        // agl-animation-end); one still in its delay plays when the element comes back.
        const entrance = this.animations && this.animations.in;
        if (entrance && entrance.animejs && !entrance.animejs.paused) {
            entrance.animejs.pause();
            if (this.entranceAnimamtionPlaying) this.onEntranceAnimationEnd();
            else this.animatedIn = false;
        }
        clearTimeout(this.touchHoverTimer);
        this.touchHoverTimer = null;
        this.hoverTarget = false;
        this.hoverPlayback = null;
        this.releaseGL(this.layer.contextLost);
    }

    // Back on the page after detach(): watched again, as before it left
    reattach() {
        if (!this.detached) return;
        this.detached = false;
        this.layer.addPlane(this);
        if (this.started) this.observe();
        else if (this.startWhenBack) {
            this.startWhenBack = false;
            this.start();
        }
    }

    initDomElement(domElement) {
        this.cssClasses = Array.from(domElement.classList);

        domElement.dataset.agl = true;
        this.originalDomElementOpacity = getComputedStyle(domElement).opacity;
        if (Number(this.originalDomElementOpacity) == 0) this.originalDomElementOpacity = '1';
        domElement.style.opacity = '0';
        domElement.style.visibility = 'visible'; // reset the dom element visibility that is initially "hidden" in CSS

        this.originalDomElement = domElement;
        // Manual elements don't start on entering the viewport, only after AnimateGL.play(element). An add-on can
        // set data-agl-manual on the page, so the element animates normally without it (PLAN.md §6.4 item 4).
        this.manual = domElement.classList.contains('agl-manual') || domElement.dataset.aglManual !== undefined;

        // const resizeObserver = new ResizeObserver((entries) => {
        // 	const entry = entries.find((entry) => entry.target === domElement);
        // 	const width = entry.devicePixelContentBoxSize[0].inlineSize;
        // 	const height = entry.devicePixelContentBoxSize[0].blockSize;
        // });
        // resizeObserver.observe(domElement/*, { box: ['device-pixel-content-box'] }*/);

        this.textureImg = new Image();
        this.textureImg.crossOrigin = 'anonymous';

        this.alphaMapImg = new Image();
        this.alphaMapImg.crossOrigin = 'anonymous';

        // log("originalDomElement")
        // log(domElement)

        this.findDomElement();
    }

    observe() {
        const domElement = this.originalDomElement;
        const self = this;
        this.addWindowListeners();
        this.observeSource();

        observeViewport(viewportObserver, domElement, (entry) => {
            // If part of the element is in the viewport, updates only when entry.isIntersecting changes
            self.inViewport = entry.isIntersecting;
            // play() starts as soon as any part of the element is in view
            if (self.inViewport && (entry.intersectionRatio > 0.7 || self.options.in.lockToScrollbar || self.playRequested())) {
                self.onViewportEnter();
            } else if (!self.inViewport) {
                self.onViewportExit();
            }
        });

        // observer only for enterance
        observeViewport(entranceObserver, domElement, (entry) => {
            // If part of the element is in the viewport, updates only when entry.isIntersecting changes
            if (entry.isIntersecting && !self.options.in.lockToScrollbar) {
                self.inViewport = true;
                self.onViewportEnter();
            }
        });

        this.childObserver = new MutationObserver(function (mutations) {
            // console.log(mutations)
            let added = 0;
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length) added = 1;
            });
            if (added) self.findDomElement();
        });
        this.childObserver.observe(domElement, {
            // attributes: true,
            // attributeFilter: ["class"],
            childList: true,
            subtree: true,
        });
    }

    // What observe() started that a viewport observer doesn't hold: the element's own observers, and the window's
    // listeners, which would keep a removed element's plane in memory
    unobserve() {
        if (this.childObserver) this.childObserver.disconnect();
        if (this.srcObserver) this.srcObserver.disconnect();
        this.childObserver = this.srcObserver = null;
        (this.windowListeners || []).forEach(([type, listener]) => window.removeEventListener(type, listener));
        this.windowListeners = null;
    }

    // An image whose src changes (a lazy loader, a slider): its texture follows
    observeSource() {
        const domElement = this.domElement;
        if (domElement.tagName !== 'IMG') return;
        const self = this;
        this.srcObserver = new MutationObserver((changes) => {
            changes.forEach((change) => {
                if (change.attributeName.includes('src')) {
                    // console.dir(domElement.src);
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.src = domElement.src;
                    img.onload = function () {
                        // Drawn by WebGL only
                        if (!self.texture) return;
                        self.texture.image = self.imageTexture(img);
                        self.program.uniforms.tScale.value = self.getTextureScale();
                        self.layer.wake();
                        // debugger
                    };
                }
            });
        });
        this.srcObserver.observe(domElement, {
            attributes: true,
            attributeFilter: ['src'],
        });
    }

    findDomElement() {
        let domElement = this.originalDomElement;
        // a figure without an image (table, pullquote) is drawn as HTML below
        if (domElement.nodeName == 'FIGURE') domElement = domElement.querySelector('img') || domElement;
        // animate only child img - only if inlcludes class agl-image
        if (domElement.nodeName != 'IMG') {
            //find child image
            const images = domElement.querySelectorAll('img');

            function hasText(element) {
                if (element.nodeType === 3) {
                    // The element itself is a text node
                    // remove new lines and tabs from string
                    return element.textContent.replace(/[\t\n\r]/g, '').trim() !== '';
                }
                for (let i = 0; i < element.childNodes.length; i++) {
                    if (element.childNodes[i].nodeName !== 'FIGCAPTION' && hasText(element.childNodes[i])) {
                        // A child element has text nodes
                        return true;
                    }
                }
                return false;
            }

            if (images.length == 1 && !hasText(domElement)) {
                // show original element
                // domElement.style.opacity = 'visible'
                domElement = images[0];
                // hide image element
                // domElement.style.visibility = 'hidden'
            }
        }

        if (domElement.nodeName == 'IMG') {
            // The file the browser picked from srcset, so the texture is the image on the page
            this.textureImg.src = domElement.currentSrc || domElement.src;
            this.isImage = true;
            // this.textureImg = domElement
        } else {
            this.htmlToCanvas = true;
        }

        // attrChangeObserver causes choppy CSS animations because it triggers functions on each transform change

        // const attrChangeObserver = new MutationObserver((mutations) => {
        // 	if (self.inViewport) {
        // 		self.updatePositions()
        // 		self.updateOffset(self.offsetX, self.offsetY)
        // 	}
        // });

        // attrChangeObserver.observe(domElement, { attributes: true, attributeFilter: ['style'] });

        this.domElement = domElement;
    }


    initOptions() {
        //make deep copy of passed options object
        this.options = JSON.parse(JSON.stringify(this.originalOptions));

        this.stopEffects();
        this.scrollEffect = this.findEffect('effects', 'scroll');
        this.scrollEffectStarted = false;
        this.hoverEffect = this.findEffect('hoverEffects', 'hover');
        this.hoverEffectStarted = false;
        // AnimateGL.playHover() before this plane existed
        if (this.originalDomElement.aglPlayHover) {
            this.playHover(this.originalDomElement.aglPlayHover);
            this.originalDomElement.aglPlayHover = null;
        }
        // A class change can pick effects with other shaders
        if (this.program) this.updateProgram();

        const className = this.originalDomElement.className;

        const presets = this.options.in.presets;

        // if animation is defined with classes, don't use options for translate, rotate, fade
        // if (className.includes("agl-in-fade") || className.includes("agl-in-translate") || className.includes("agl-in-rotate")) {
        // 	this.options.in.translate = { x: 0, y: 0, z: 0 }
        // 	this.options.in.rotate = { x: 0, y: 0, z: 0 }
        // 	this.options.in.fade.type = 'right'
        // }

        if (this.options.in.name) {
            this.options.in = (0,functions/* extend */.l7)({}, this.options.in, presets[this.options.in.name]);
        }

        this.isCSSAnimation = this.options.in.type == 'css';

        this.originalDomElement.classList.forEach((name) => {
            for (const key in presets) {
                if (name == `agl-${key}`) {
                    // take defaults and extend with presets
                    this.options.in = JSON.parse(JSON.stringify(agl.defaults.in));
                    this.options.in = (0,functions/* extend */.l7)({}, this.options.in, presets[key]);
                    this.options.in.name = key;
                    this.options.in.nameFromCSSClass = key;

                    // Built-in CSS presets have CSS in their name; presets added by others can say their type
                    this.isCSSAnimation = presets[key].type ? presets[key].type === 'css' : name.includes('CSS');
                }
            }

            this.getOptionsFromClassName(name, this.options.in);
        });

        // agl-in-none, without a preset: no entrance. The element is shown as itself, and drawn by WebGL only while
        // its scroll or hover effect runs. Images only; other elements are just shown.
        this.noEntrance = this.originalDomElement.classList.contains('agl-in-none') && !this.options.in.nameFromCSSClass;
        if (this.noEntrance) {
            this.isCSSAnimation = false;
            this.showDomElement();
        }

        this.chooseCssFade();
        if (this.isCSSAnimation) this.originalDomElement.classList.remove('agl-html2canvas');

        this.getOptionFromClassName(this.options.in, 'lockToScrollbar');
        this.getOptionFromClassName(this.options.in, 'repeat');
    }

    /** for example agl- */
    getOptionFromClassName(options, optionName) {
        const className = this.originalDomElement.className;
        options[optionName] = className.includes(optionName) && className.includes('agl');
    }

    // AnimateGL.play(), also before this plane existed
    playRequested() {
        return !!this.originalDomElement.aglPlayRequested;
    }

    // Plays a manual element now if it's in view, or when it enters the viewport
    play() {
        this.originalDomElement.aglPlayRequested = true;
        this.animatedIn = false;
        if (this.inViewport) {
            this.viewportEntered = false;
            this.onViewportEnter();
        }
    }

    // Back to the state before the entrance animation, hidden, so play() can run it again
    reset() {
        this.originalDomElement.aglPlayRequested = false;
        this.effectsReady = false;
        this.dropEffects();
        // Stops an animeIn() still waiting for html2canvas or textures from playing afterwards
        this.resets = (this.resets || 0) + 1;
        if (this.entranceAnimamtionPlaying) {
            // Interrupted, not finished: agl-animation-end means an entrance completed
            this.entranceAnimamtionPlaying = false;
            this.originalDomElement.dispatchEvent(new CustomEvent('agl-animation-cancel', { bubbles: true }));
        }
        this.animatedIn = false;
        this.viewportEntered = false;
        if (this.animejs) {
            this.animejs.pause();
            this.animejs.seek(0);
            this.syncCssFade();
        }
        if (this.releasePerspective) this.releasePerspective();
        // A WebGL entrance still running would otherwise finish and show the element again
        const webgl = this.animations && this.animations.in;
        if (webgl) {
            if (webgl.animejs) webgl.animejs.pause();
            webgl.reset();
        }
        this.hideMesh();
        if (this.noEntrance) this.showDomElement();
        else this.hideDomElement();
    }

    // Without an entrance (agl-in-none): an image with a WebGL effect is loaded to be drawn in its place
    // (prepareEffectsWebGL(), in the webgl chunk)
    prepareEffects() {
        // Nothing to prepare without an effect: lite, reduced motion, or hover effects on a touch screen without touchHover
        if (this.animatedIn || !this.isImage || !(this.hoverEffect || this.scrollEffect)) return;
        this.whenWebGL(() => this.prepareEffectsWebGL());
    }

    onViewportEnter() {
        // viewport entered
        if (this.viewportEntered) return;
        if (this.manual && !this.playRequested()) {
            this.hideDomElement();
            return;
        }
        if (this.noEntrance) {
            this.showDomElement();
            this.prepareEffects();
            this.viewportEntered = true;
            return;
        }
        if (this.options.in.repeat) this.animatedIn = false;
        if (!this.isCSSAnimation) {
            if (this.options.in.lockToScrollbar || !this.animatedIn) {
                this.showMesh();
                this.updatePositions();
                this.updateOffset();
            } else if (this.options.repeat) this.hideDomElement();
        } else {
            this.showDomElement();
        }

        if (!this.options.in.lockToScrollbar) {
            this.animeIn();
        } else {
            this.animatedIn = false;
            this.onScroll();
        }
        this.viewportEntered = true;
    }

    onViewportExit() {
        // First, so what follows hides the element as usual (repeat)
        this.stopEffects();
        // exit viewport
        if (this.options.in.repeat) {
            if (this.isCSSAnimation) {
                // reset animation
            } else {
                if (!this.entranceAnimamtionPlaying) {
                    // this.hideMesh()
                }
            }
            this.hideDomElement();
        }
        this.hideMesh();

        this.viewportEntered = false;
    }

    // The effect picked with agl-scroll-<name> or agl-hover-<name>, from AnimateGL.registerEffect() or
    // registerHoverEffect() (main.js)
    findEffect(registry, prefix) {
        const effects = (window.AnimateGL && window.AnimateGL[registry]) || {};
        const pattern = new RegExp(`^agl-${prefix}-([A-Za-z]+)$`);
        for (const name of this.originalDomElement.classList) {
            const match = name.match(pattern);
            if (match && effects[match[1]]) return effects[match[1]];
        }
        return null;
    }


    // After the entrance, while an effect runs, the element is drawn by WebGL so the effect can deform it, and
    // shown as itself again when no effect runs. Only for WebGL entrances, which leave the mesh at its end state.
    effectsShowing() {
        return this.scrollEffectActive || this.hoverEffectActive;
    }

    showEffects() {
        if (this.effectsShowing()) return;
        this.showMesh();
        // Draw the texture through the passes at the entrance's end state. An entrance ends between frames, so the
        // last frame it drew stops short of its end (a fade not quite done, more so on a slow or high-DPI screen),
        // and without an entrance nothing has drawn it yet.
        this.updateUniformValues();
        this.needsUpdate = true;
        this.updatePositions();
        this.updateOffset();
        this.hideDomElement();
    }

    hideEffects() {
        if (this.effectsShowing()) return;
        this.hideMesh();
        this.showDomElement();
    }

    // Each effect's render() with nothing to do resets what it changed
    resetScrollEffect() {
        this.scrollEffectActive = false;
        this.scrollEffect.render(this, 0);
    }

    resetHoverEffect() {
        this.hoverEffectActive = false;
        this.hoverIdle = false;
        this.hoverAmount = 0;
        this.hoverVX = this.hoverVY = 0;
        this.hoverEffect.render(this, { amount: 0, x: this.hoverX, y: this.hoverY, vx: 0, vy: 0, speed: 0, time: 0 });
    }

    // Stops the effects and shows the element itself
    stopEffects() {
        if (!this.effectsShowing()) return;
        this.dropEffects();
        this.hideEffects();
    }

    // Stops the effects and leaves showing the element to the caller (an entrance starting, reset())
    dropEffects() {
        if (this.scrollEffectActive) this.resetScrollEffect();
        if (this.hoverEffectActive) this.resetHoverEffect();
    }


    // Plays the hover effect once without a pointer, as if one swept across the element: amount eases up to 1, holds
    // and eases back to 0 over duration ms, while the pointer moves from `from` to `to` ([x, y], 0 to 1 from the
    // bottom left). Starts once the effect could run (after the entrance, in view), ends early when the element leaves
    // the view or a real pointer takes over, and then shows the element as itself again. AnimateGL.playHover()
    playHover({ duration = 1500, from = [0.15, 0.5], to = [0.85, 0.5] } = {}) {
        if (!this.hoverEffect) return false;
        this.hoverPlayback = { duration: Math.max(duration, 1), from, to, start: 0, moved: false };
        this.layer.wake();
        return true;
    }

    onPointer(event) {
        const mouse = event.pointerType === 'mouse';
        if (!mouse && !(window.AnimateGL && window.AnimateGL.touchHover)) return;
        // The first finger on the screen drives it: a second one tapping the element changes nothing
        if (!event.isPrimary) return;
        // A mouse ends by leaving; a finger or pen also by lifting, or when the browser takes the touch for scrolling
        if (event.type === 'pointerleave' || event.type === 'pointercancel' || (event.type === 'pointerup' && !mouse)) {
            clearTimeout(this.touchHoverTimer);
            this.touchHoverTimer = null;
            this.hoverTarget = false;
            if (this.hoverEffect) this.layer.wake();
            return;
        }
        // No layout read on every mouse move for elements without a hover effect
        if (!this.hoverEffect) return;
        // The render loop may have stopped (webgl.js)
        this.layer.wake();
        const rect = this.originalDomElement.getBoundingClientRect();
        // Within the element: a finger keeps sending moves after it slides off
        const clamp = (value) => Math.min(1, Math.max(0, value));
        const x = rect.width ? clamp((event.clientX - rect.left) / rect.width) : 0.5;
        const y = rect.height ? clamp(1 - (event.clientY - rect.top) / rect.height) : 0.5;
        // The moves for the velocity, from the second position on
        if (this.hoverTarget && this.hoverEffectActive) {
            this.hoverMoveX += x - this.hoverX;
            this.hoverMoveY += y - this.hoverY;
        }
        this.hoverX = x;
        this.hoverY = y;
        if (mouse) {
            this.hoverTarget = true;
        } else if (!this.hoverTarget && !this.touchHoverTimer) {
            // A touch the browser takes for scrolling is cancelled within a few frames: start only once it has
            // lasted 100 ms, so the image isn't swapped for the mesh and back at the start of every scroll
            this.touchHoverTimer = setTimeout(() => {
                this.touchHoverTimer = null;
                this.hoverTarget = true;
                this.layer.wake();
            }, 100);
        }
    }

    onEntranceAnimationStart() {
        this.effectsReady = false;
        this.dropEffects();
        this.entranceAnimamtionPlaying = true;
        this.originalDomElement.dispatchEvent(new CustomEvent('agl-animation-start', { bubbles: true }));
        if (this.isCSSAnimation) {
            this.showDomElement();
            this.hideMesh();
        } else {
            this.hideDomElement();
            this.showMesh();
            this.updatePositions();
            this.updateOffset();
        }
    }

    onEntranceAnimationEnd() {
        this.entranceAnimamtionPlaying = false;
        this.originalDomElement.dispatchEvent(new CustomEvent('agl-animation-end', { bubbles: true }));

        if (this.isCSSAnimation) {
            if (this.animejs && this.options.in.repeat && !this.inViewport) {
                this.animejs.seek(0);
                this.syncCssFade();
            }
        } else {
            this.hideMesh();
            if (this.inViewport || !this.options.in.repeat) this.showDomElement();
            this.effectsReady = !this.options.in.lockToScrollbar;
            // A hover effect under the mouse, or a playHover() waiting, can start now
            this.layer.wake();
        }
    }

    cssClassUpdated() {
        // console.log(this.domElement.className)
        const currentClasses = Array.from(this.originalDomElement.classList);
        const previousClasses = this.cssClasses;

        // Check for added classes
        const addedClasses = currentClasses.filter((className) => !previousClasses.includes(className));

        // Check for removed classes
        const removedClasses = previousClasses.filter((className) => !currentClasses.includes(className));

        // Check if addedClasses contain a class that contains "agl". Not the runtime's own agl-html2canvas, set while
        // it snapshots the element: that would stop the entrance it's for (stopEntrance())
        const isOption = (className) => className.includes('agl') && className !== 'agl-html2canvas';
        const hasAddedClassWithAgl = addedClasses.some(isOption);

        // Check if removedClasses contain a class that contains "agl"
        const hasRemovedClassWithAgl = removedClasses.some(isOption);

        this.cssClasses = currentClasses;

        // if CSS class that was changed contains 'agl' then animate
        if (hasAddedClassWithAgl || hasRemovedClassWithAgl) this.optionsChanged();
    }

    // Reads the options again (after a class change, or a preset added later) and plays the entrance they pick
    optionsChanged() {
        this.stopEntrance();
        this.initOptions();
        this.animatedIn = false;

        // Still waiting for the webgl chunk, and no longer needs it
        if (!this.started && !this.needsWebGL()) this.start();
        // Picked a WebGL entrance or effect: plays once the webgl chunk has loaded
        if (this.needsWebGL()) this.whenWebGL(() => this.classesChanged());
        else this.classesChanged();
    }

    // Before optionsChanged() plays the entrance new classes pick: the one playing or waiting stops, or it went on
    // and the new one didn't play (animeIn() waits for the one playing), and a CSS entrance leaves nothing behind
    // that would show on the element after a WebGL one (a transform, clip path, mask or perspective). One that was
    // playing ends shown, with agl-animation-cancel, as reset() stops it.
    stopEntrance() {
        // An animeIn() waiting for html2canvas or textures doesn't play afterwards
        this.resets = (this.resets || 0) + 1;
        const playing = this.entranceAnimamtionPlaying;
        if (playing) {
            this.entranceAnimamtionPlaying = false;
            this.originalDomElement.dispatchEvent(new CustomEvent('agl-animation-cancel', { bubbles: true }));
        }
        const webgl = this.animations && this.animations.in;
        if (webgl && webgl.animejs && !webgl.animejs.paused) {
            webgl.animejs.pause();
            webgl.reset();
            this.hideMesh();
        }
        const css = this.animejs;
        if (!css) return;
        const running = playing || (!css.paused && !css.completed);
        css.pause();
        this.animejs = null;
        if (this.endCSSEntrance) this.endCSSEntrance();
        this.endCSSEntrance = null;
        const params = this.animationParams;
        if (['translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ', 'scale'].some((name) => name in params)) {
            this.originalDomElement.style.transform = '';
        }
        if (running) this.showDomElement();
    }

    // Presets added to the registry after this element was set up (compat.js): if its class names one, it was set
    // up without it, so it's set up again with it. Presets it already uses (a pack loaded twice) change nothing.
    presetsAdded(names) {
        const name = names.find((added) => this.originalDomElement.classList.contains(`agl-${added}`));
        if (!name || this.options.in.nameFromCSSClass === name) return;
        this.originalOptions = JSON.parse(JSON.stringify(this.layer.options));
        this.optionsChanged();
    }

    // After cssClassUpdated() has read new classes: plays the entrance they pick, if the element is in view
    classesChanged() {
        if (this.inViewport && this.noEntrance) {
            this.hideMesh();
            this.prepareEffects();
        } else if (this.inViewport) {
            if (!this.isCSSAnimation) {
                this.hideDomElement();
                this.showMesh();
                this.updatePositions();
                this.updateOffset();
            } else {
                this.showDomElement();
            }

            if (!this.options.in.lockToScrollbar) {
                this.animeIn();
            } else {
                this.animatedIn = false;
                this.onScroll();
            }
        }
    }


    // The window's events for the editor, removed again by unobserve() when the element leaves the page
    addWindowListeners() {
        if (this.windowListeners) return;
        const originalDomElement = this.originalDomElement;
        const self = this;
        this.windowListeners = [
            [
                'agl-animate',
                function () {
                    if (originalDomElement.classList.contains('agl-editor')) {
                        self.animatedIn = false;
                        if (self.inViewport && !self.lockToScrollbar) {
                            self.options.in.live = false;

                            self.animeIn();
                        }
                    }
                },
            ],
            ['agl-option-change', (e) => this.onOptionChange(e)],
        ];
        this.windowListeners.forEach(([type, listener]) => window.addEventListener(type, listener));
    }

    onOptionChange(e) {
        const self = this;
        const originalDomElement = this.originalDomElement;
        if (originalDomElement.classList.contains('agl-editor')) {
            const editorOptions = JSON.parse(JSON.stringify(e.detail));

            if (editorOptions.in.name) {
                const presets = agl.defaults.in.presets;
                if (!self.options.in.nameFromCSSClass) {
                    self.options.in = (0,functions/* extend */.l7)({}, agl.defaults.in, presets[editorOptions.in.name]);
                }
            } else {
                if (!self.options.in.nameFromCSSClass) self.options = editorOptions;
            }

            const className = self.originalDomElement.className;

            // if animation is defined with classes, don't use options for translate, rotate, fade
            if (
                className.includes('agl-in-fade') ||
                className.includes('agl-in-translate') ||
                className.includes('agl-in-rotate')
            ) {
                self.options.in.translate = { x: 0, y: 0, z: 0 };
                self.options.in.rotate = { x: 0, y: 0, z: 0 };
                self.options.in.fade.type = 'right';
            }

            self.originalDomElement.classList.forEach(function (className) {
                self.getOptionsFromClassName(className, self.options.in);
            });

            self.options.in.live = editorOptions.in.live;
            self.isCSSAnimation = self.options.in.type == 'css';
            self.chooseCssFade();

            if (self.options.in.live) {
                self.options.in.progress = editorOptions.in.progress;

                if (!self.isCSSAnimation) {
                    self.whenWebGL(function () {
                        self.showMesh();
                        self.hideDomElement();
                        self.updatePositions();
                        self.updateOffset();
                    });
                } else {
                    self.hideMesh();
                    self.showDomElement();
                    // A fade gets a new instance (it seeks and sets the mask), in case the options changed
                    if (self.animejs && !self.cssFade) self.animejs.seek(self.options.in.progress * self.animejs.duration);
                    else self.animeInCSS();
                    self.syncCssFade();
                }
            } else {
                self.animatedIn = false;
                self.animeIn(self.options);
            }
        }
    }

    addListeners() {
        const originalDomElement = this.originalDomElement;
        const self = this;

        originalDomElement.addEventListener('agl-disable', function (e) {
            // disable effects on this element
            self.disable();
        });

        originalDomElement.addEventListener('agl-enable', function (e) {
            // enable effects on this element
            self.enable();
        });

        originalDomElement.addEventListener('agl-remove', function (e) {
            // remove element from rendering
            // console.log("agl-remove event in AnimatedPlane class")
        });

        originalDomElement.addEventListener('agl-animate', function (e) {
            self.onAnimate(e);
        });

        originalDomElement.addEventListener('agl-update-setting', function (e) {
            // console.log(e)
        });

        originalDomElement.addEventListener('click', function (e) {
            // e.preventDefault()
            // self.animatedIn = false
            // self.animeIn(true)
        });

        originalDomElement.addEventListener('mouseover', this.mouseOver.bind(this));
        // Hover effects (AnimateGL.registerHoverEffect)
        const pointer = this.onPointer.bind(this);
        ['pointerenter', 'pointermove', 'pointerleave', 'pointerup', 'pointercancel'].forEach((type) => originalDomElement.addEventListener(type, pointer, { passive: true }));
        originalDomElement.addEventListener('mousemove', function (e) {
            // self.mouseX = (e.pageX - self.rect.x) / self.rect.width
            // self.mouseY = (e.pageY - self.rect.y) / self.rect.height
        });
        originalDomElement.addEventListener('mouseout', this.mouseOut.bind(this));
    }

    onAnimate(e) {
        this.animatedIn = false;

        const defaults = JSON.parse(JSON.stringify(agl.options));

        let options = defaults.in;
        options.scroll = defaults.scroll;
        options.mouse = defaults.mouse;

        this.getOptionsFromClassName(e.options.entranceName);

        options = (0,functions/* extend */.l7)({}, options, e.options);

        const self = this;

        if (options.transitionImageSrc) {
            const img = new Image();
            img.src = options.transitionImageSrc;
            img.crossOrigin = 'anonymous';
            img.onload = function () {
                self.alphaMapImg = img;
                // options.fade.image = img
                self.animeIn(options);
            };
        } else {
            // self.alphaMap.image = self.texture.image
            // options.fade.image = self.texture.image
            this.animeIn(options);
        }
    }

    getOptionsFromClassName(className) {
        const options = this.options;

        const alphaMapAngles = {
            right: 0,
            left: 180,
            up: 90,
            down: 270,
            topRight: 45,
            topLeft: 135,
            bottomLeft: 225,
            bottomRight: 315,
            light: -1,
            dark: -2,
            basic: -3,
            circle: -4,
            circleBottomLeft: -5,
            circleBottomRight: -6,
            circleTopLeft: -7,
            circleTopRight: -8,
        };

        if (className.includes('CSS') && className.includes('agl')) {
            this.isCSSAnimation = true;
        }

        if (className.includes('in-fade')) {
            if (className.includes('fade-')) options.in.fade.type = className.split('fade-')[1];
        }

        if (options.in.fade.type == 'none') {
            options.in.fade.enabled = false;
        } else {
            options.in.fade.enabled = true;
        }
        if (options.in.fade.type == 'basic') options.in.fade.threshold = 3;

        options.in.fade.alphaMapAngle = alphaMapAngles[options.in.fade.type] || alphaMapAngles['right'];

        if (className.includes('in-translate')) {
            options.in.translate.enabled = true;
            this.getOptionFromClass(className, options.in.translate, 'x');
            this.getOptionFromClass(className, options.in.translate, 'y');
            this.getOptionFromClass(className, options.in.translate, 'z');
        }

        if (className.includes('in-rotate')) {
            options.in.rotate.enabled = true;
            this.getOptionFromClass(className, options.in.rotate, 'x');
            this.getOptionFromClass(className, options.in.rotate, 'y');
            this.getOptionFromClass(className, options.in.rotate, 'z');
        }

        if (className.includes('in-corners-start')) {
            options.in.corners.enabled = true;
            const values = className.split('in-corners-start-')[1].split('-');
            options.in.corners.start1 = Number(values[0]);
            options.in.corners.start2 = Number(values[1]);
            options.in.corners.start3 = Number(values[2]);
            options.in.corners.start4 = Number(values[3]);
        }

        if (className.includes('in-corners-end')) {
            options.in.corners.enabled = true;
            const values = className.split('in-corners-end-')[1].split('-');
            options.in.corners.end1 = Number(values[0]);
            options.in.corners.end2 = Number(values[1]);
            options.in.corners.end3 = Number(values[2]);
            options.in.corners.end4 = Number(values[3]);
        }

        this.getOptionFromClass(className, options.in, 'delay');
        this.getOptionFromClass(className, options.in, 'duration');
        this.getOptionFromClass(className, options.in.fade, 'threshold');
        this.getOptionFromClass(className, options.in, 'easing');
        this.getOptionFromClass(className, options.in, 'distance');

        if (options.in.distance != 1) {
            for (let key in options.in.translate) {
                const val = options.in.translate[key];
                if (isNaN(val)) {
                    if (val.includes('px'))
                        options.in.translate[key] = options.in.distance * Number(val.replace('px', '')) + 'px';
                    else if (val.includes('%'))
                        options.in.translate[key] = options.in.distance * Number(val.replace('%', '')) + '%';
                } else options.in.translate[key] *= options.in.distance;
            }
        }

        // this.getOptionFromClassName(class, options.scroll , "scroll-bend")
        // this.getOptionFromClassName(class, options.scroll , "scroll-fisheye")
        // this.getOptionFromClassName(class, options.scroll , "scroll-fisheye-type")
        // this.getOptionFromClassName(class, options.scroll , "scroll-displacement")

        // if (className.includes('agl-bend-')) options.bend.strength = Number(className.split('agl-bend-')[1]) || 1 // if bend is enabled with class name agl-bend, default strength is 1

        if (className.includes('agl-scroll-bend-')) options.scroll.bend.strength = className.split('agl-scroll-bend-')[1];
        if (className.includes('agl-scroll-fisheye-'))
            options.scroll.fisheye.strength = className.split('agl-scroll-fisheye-')[1];
        if (className.includes('agl-scroll-fisheye-type'))
            options.scroll.fisheye.type = className.split('agl-scroll-fisheye-type')[1];
        if (className.includes('agl-scroll-stretch-'))
            options.scroll.stretch.strength = className.split('agl-scroll-stretch-')[1];
        if (className.includes('agl-scroll-displacement-'))
            options.scroll.fade.displacement = className.split('agl-scroll-displacement-')[1];
        if (className.includes('agl-scroll-translateX-'))
            options.scroll.translateX = className.split('agl-scroll-translateX-')[1];
        if (className.includes('agl-scroll-translateY-'))
            options.scroll.translateY = className.split('agl-scroll-translateY-')[1];
        if (className.includes('agl-scroll-translateY-'))
            options.scroll.translateZ = className.split('agl-scroll-translateZ-')[1];
    }

    getOptionFromClass(className, options, option) {
        if (className.includes(`-${option}-`)) {
            options[option] = className.split(`-${option}-`)[1];
            if (!isNaN(Number(options[option]))) options[option] = Number(options[option]);
        } else if (className.includes(`-${option}`)) {
            options[option] = true;
        }
    }

    mouseOver(e) {
        if (this.animations.hover) this.animations.hover.mouseOver();

        // this.mesh.position.z = .2

        this.hover = true;

        // this.mouseX = (e.pageX - this.rect.x) / this.rect.width
        // this.mouseY = (e.pageY - this.rect.y) / this.rect.height
    }

    mouseOut(event) {
        this.oldMouse = null;
        if (this.animations.hover) this.animations.hover.mouseOut();

        // this.mesh.position.z = 0

        this.hover = false;
    }


    // Directional fades (fade, fadeLeft, -Right, -Up, -Down, and the plugin's Default) look the same drawn with a
    // CSS mask as with WebGL, without rasterizing the element (PLAN.md §9). They stay WebGL with anything else
    // that needs WebGL: a translate, rotate, displacement, curl or bend, a WebGL scroll or hover effect, mouse
    // effects, or the class agl-webgl. So do other presets, such as saved custom animations, which say they are WebGL.
    chooseCssFade() {
        this.cssFade = null;
        if (this.isCSSAnimation || this.noEntrance || this.originalDomElement.classList.contains('agl-webgl')) return;
        const o = this.options.in;
        if (o.name && !['fade', 'fadeLeft', 'fadeRight', 'fadeUp', 'fadeDown'].includes(o.name)) return;
        const fade = o.fade || {};
        const moves = (v) => v && (v.x || v.y || v.z);
        const strength = (v) => v && v.strength;
        const mouse = this.options.mouse || {};
        if (
            fade.enabled === false ||
            !['right', 'left', 'up', 'down'].includes(fade.type) ||
            moves(o.translate) ||
            moves(o.rotate) ||
            strength(o.displacement) ||
            strength(o.curl) ||
            strength(o.bend) ||
            this.scrollEffect ||
            this.hoverEffect ||
            Object.keys(mouse).some((key) => mouse[key] && mouse[key].enabled)
        )
            return;
        const threshold = fade.threshold > 0 && fade.threshold < 3 ? Number(fade.threshold) : 0.4;
        this.cssFade = { type: fade.type, threshold };
        this.isCSSAnimation = true;
    }

    // The WebGL fade gives each pixel alpha = smoothstep(0, 1, (progress * (1 + t) - d) / t), with d its distance
    // (0 to 1) from the side the fade starts on: a soft edge t wide sweeping across. The mask is a gradient
    // (2 + t) times the element's size, opaque, then that edge, then transparent, and progress moves it with
    // mask-position from 100% to 0% (or 0% to 100% for left and up), which puts the edge where the shader has it.
    setCssFade(progress, fade) {
        const style = this.originalDomElement.style;
        const props = ['maskImage', 'maskSize', 'maskRepeat', 'maskPosition'];
        const set = (name, value) => {
            style[name] = value;
            style['webkit' + name[0].toUpperCase() + name.slice(1)] = value;
        };
        if (progress === null || !fade) {
            if (this.cssFadeSaved) props.forEach((name) => set(name, this.cssFadeSaved[name]));
            this.cssFadeSaved = null;
            return;
        }
        // Easings that overshoot (easeOutBack) go past 0 or 1; complete() takes the mask off
        progress = Math.min(Math.max(progress, 0), 1);
        const { type, threshold: t } = fade;
        const length = 2 + t;
        const vertical = type === 'up' || type === 'down';
        if (!this.cssFadeSaved) {
            this.cssFadeSaved = {};
            props.forEach((name) => (this.cssFadeSaved[name] = style[name]));
            const at = (x) => `${((x / length) * 100).toFixed(4)}%`;
            const stops = ['#000 0%', `#000 ${at(1)}`];
            for (let i = 1; i < 8; i++) {
                const f = i / 8;
                stops.push(`rgba(0,0,0,${(1 - f * f * (3 - 2 * f)).toFixed(4)}) ${at(1 + f * t)}`);
            }
            stops.push(`transparent ${at(1 + t)}`, 'transparent 100%');
            const line = { right: 'to right', left: 'to left', up: 'to top', down: 'to bottom' }[type];
            set('maskImage', `linear-gradient(${line}, ${stops.join(', ')})`);
            set('maskSize', vertical ? `100% ${length * 100}%` : `${length * 100}% 100%`);
            set('maskRepeat', 'no-repeat');
        }
        const offset = `${((type === 'right' || type === 'down' ? 1 - progress : progress) * 100).toFixed(4)}%`;
        set('maskPosition', vertical ? `0% ${offset}` : `${offset} 0%`);
    }

    // anime.js only calls update once an instance has begun playing, so after creating one and after each
    // seek() the mask is set from here. Seeking to the end (Lock to scrollbar, the editor) takes it off.
    syncCssFade() {
        const state = this.cssFadeState;
        if (!state) return;
        this.setCssFade(this.cssFade && state.progress < 1 ? state.progress : null, this.cssFade);
    }

    animeInCSS = function () {
        if (this.animejs) this.animejs.remove(this.animationParams);
        if (this.releasePerspective) this.releasePerspective();
        const tr = getComputedStyle(this.originalDomElement).transitionDuration;
        const el = this.originalDomElement;
        el.style.transitionDuration = '0s';
        el.style.transformOrigin = '50% 50%';
        // el.style.willChange = 'transform'
        const params = {
            targets: this.originalDomElement,
            opacity: [0, 1],
            easing: this.options.in.easing,
            duration: this.options.in.duration,
            delay: this.options.in.delay,
        };
        const translate = this.options.in.translate;
        if (translate.x) params.translateX = [isNaN(translate.x) ? translate.x : translate.x * 100 + '%', 0];
        if (translate.y) params.translateY = [isNaN(translate.y) ? translate.y : translate.y * 100 + '%', 0];
        if (translate.z) {
            params.translateZ = [translate.z * 500 + 'px', 0];
        }
        // else
        // params.translateZ = '0' // for hardware accelerated animation

        const rotate = this.options.in.rotate;
        if (rotate.x) params.rotateX = [rotate.x, 0];
        if (rotate.y) params.rotateY = [rotate.y, 0];
        if (rotate.z) params.rotateZ = [rotate.z, 0];

        // A 3D entrance gets a perspective on its parent while it plays, unless the page gave it one. Counted, so
        // siblings whose entrances overlap give back the parent's own value once the last one ends: restoring each
        // one's snapshot left the parent (often the whole post) with a perspective that distorted later transforms.
        const parent = el.parentNode;
        let perspective = false;
        const addPerspective = () => {
            if (perspective || !(translate.z || rotate.x || rotate.y) || !parent || !parent.style) return;
            if (!parent.aglPerspective) {
                if (getComputedStyle(parent).perspective !== 'none') return;
                parent.aglPerspective = { count: 0, inline: parent.style.perspective };
                parent.style.perspective = '1000px';
            }
            parent.aglPerspective.count++;
            perspective = true;
        };
        const removePerspective = () => {
            if (!perspective) return;
            perspective = false;
            if (--parent.aglPerspective.count) return;
            parent.style.perspective = parent.aglPerspective.inline;
            parent.aglPerspective = null;
        };
        // Also when reset() stops it, or the next entrance replaces it
        this.releasePerspective = removePerspective;

        if (this.options.in.scale != 1) params.scale = [this.options.in.scale, 1];
        if (this.cssFade) {
            // The mask's progress, on its own target; nothing else animates
            const state = (this.cssFadeState = { progress: 0 });
            const fade = this.cssFade;
            delete params.opacity;
            params.targets = state;
            params.progress = [0, 1];
            params.update = () => this.setCssFade(state.progress, fade);
        }
        if (this.options.in.clipPath) {
            if (Array.isArray(this.options.in.clipPath)) params.clipPath = this.options.in.clipPath;
            else params.clipPath = [this.options.in.clipPath.from, this.options.in.clipPath.to];

            if (!params.clipPath[0] && !params.clipPath[1]) delete params.clipPath;
            else delete params.opacity; // do not animate opacity if animating clip path
        }
        params.autoplay = false;
        if (this.options.in.lockToScrollbar) params.easing = 'linear';
        const self = this;
        let begun = false;
        params.begin = function (anim) {
            begun = true;
            addPerspective();
            self.onEntranceAnimationStart();
        };
        // What the entrance changed only while it plays, put back when it ends or stopEntrance() stops it
        this.endCSSEntrance = function () {
            if (params.clipPath) el.style.clipPath = 'none';
            self.setCssFade(null);
            removePerspective();
            el.style.transitionDuration = tr;
        };
        params.complete = function (anim) {
            // anime.js skips begin when its first frame is already past the end (a slow first frame, a short
            // duration): the entrance still starts before it ends
            if (!begun) params.begin(anim);
            begun = false;
            self.endCSSEntrance();
            self.onEntranceAnimationEnd();
        };
        this.animationParams = params;
        if (!this.cssFade) this.cssFadeState = null;
        this.animejs = (0,anime_es/* default */.Z)(this.animationParams);

        if (this.options.in.live || this.options.in.lockToScrollbar) {
            this.animejs.seek(this.options.in.progress * this.animejs.duration);
        } else if (!this.animejs.began || this.animejs.completed) {
            this.animejs.play();
        }
        this.syncCssFade();
    };

    async animeIn(options) {
        if (this.animatedIn) return;
        if (this.entranceAnimamtionPlaying) return;

        options = options || this.options;

        this.animatedIn = true;
        const resets = this.resets;

        if (this.options.in.fade.alphaMapSrc) this.alphaMapImg.src = this.options.in.fade.alphaMapSrc;

        if (this.isCSSAnimation) {
            this.animeInCSS();
            return;
        }
        if (!this.layer.webglReady) {
            try {
                await loadWebGL(this.layer);
            } catch (error) {
                // The webgl chunk failed to load: show the element without the WebGL effect
                console.warn('AnimateGL:', error);
                this.failed = true;
                this.showDomElement();
                return;
            }
            // reset() while waiting: this entrance was called off
            if (this.resets !== resets) return;
        }
        return this.animeInWebGL(options, resets);
    }

    hideDomElement() {
        // While the WebGL context is lost, an element drawn by WebGL is shown as itself (WebGLPlane.onContextLost())
        if (this.failed || (this.layer.contextLost && this.needsWebGL())) return;
        this.domElementVisible = false;
        this.originalDomElement.style.opacity = '0';
    }

    showDomElement() {
        this.domElementVisible = true;
        this.originalDomElement.style.opacity = this.originalDomElementOpacity;
    }

    setViewportSize(width, height) {
        this.viewportWidth = width;
        this.viewportHeight = height;
    }

    updateOffset(offsetX, offsetY) {
        const visibleHeight = this.viewportHeight;

        offsetX = offsetX || this.scrollX / window.innerWidth;
        offsetY = offsetY || this.scrollY / visibleHeight;

        this.offsetX = offsetX;
        this.offsetY = offsetY;

        if (this.options.in.lockToScrollbar) {
            const rect = this.domElement.getBoundingClientRect();

            const viewportArea = {
                top: visibleHeight * this.options.in.viewportTopMargin,
                bottom: visibleHeight * (1 - this.options.in.viewportBottomMargin),
            };

            // page total height
            const totalHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            const maxScrollY = totalHeight - visibleHeight;

            const elementBottomMin = Math.max(
                rect.bottom + scrollY - maxScrollY,
                viewportArea.bottom - (viewportArea.bottom - viewportArea.top) / 2 + rect.height / 2
            ); // how far up in viewport can bottom edge of element go
            // const elementTopMax = Math.min(rect.top + scrollY, viewportArea.bottom) // how far up in viewport can bottom edge of element go
            const elementTopMax = viewportArea.bottom; // how far up in viewport can bottom edge of element go

            let scrollProgress;

            if (rect.bottom <= elementBottomMin) {
                scrollProgress = 1;
            } else if (rect.top >= elementTopMax) {
                scrollProgress = 0;
            } else {
                const scrollHeight = elementTopMax - elementBottomMin + rect.height;
                const distanceFromBottom = elementTopMax - rect.top;
                scrollProgress = distanceFromBottom / scrollHeight; // if between 0 and 1, part of element is inside viewport
                this.needsUpdate = true;
            }

            // console.log(scrollProgress)

            this.options.in.progress = scrollProgress;

            if (!this.isCSSAnimation) {
                //handle WebGL lockToScrollbar
                if (scrollProgress >= 0 /*&& scrollProgress <= 1*/) {
                    this.options.in.live = true;
                    this.enable();
                } else {
                    // this.options.in.live = false
                    this.disable();
                }
                this.animatedIn = false;
                this.animeIn();
            } else {
                this.animatedIn = false;
                this.animeInCSS();
            }
        }

        if (!this.isCSSAnimation) this.updateMeshOffset(offsetX, offsetY);
    }

    onScroll(scrollx, scrolly) {
        this.scrollX = scrollx;
        this.scrollY = scrolly;
        if (this.inViewport) {
            this.updatePositions();
            this.updateOffset();
        }
    }

    onResize() {
        this.updatePositions();
    }


    enable() {
        if (!this.enabled) {
            this.enabled = true;
            this.updatePositions();
            this.updateOffset(this.offsetX, this.offsetY);
            // this.originalDomElement.classList.remove('agl-disabled');
            // this.originalDomElement.style.visibility = "hidden"

            this.hideDomElement();
        }
    }

    disable() {
        if (this.enabled) {
            const self = this;
            this.setCssFade(null);
            this.showDomElement();
            // Not drawn by WebGL from now: its render targets go back to the pool
            this.hideMesh();
            const images = this.originalDomElement.querySelectorAll('img');
            if (images.length) {
                const img = images[0];
                const imageClone = new Image();
                imageClone.src = img.src;
                imageClone.onload = function () {
                    requestAnimationFrame(function () {
                        self.enabled = false;
                    });
                };
            } else {
                requestAnimationFrame(function () {
                    self.enabled = false;
                });
            }
        }
    }

    // Drawing with WebGL: nothing to draw until the webgl chunk replaces these (WebGLPlane.js). The core calls them
    // for any element; an element that needs WebGL only starts once the chunk has loaded.
    hideMesh() {}

    showMesh() {}

    updatePositions() {}

    updateMeshOffset() {}

    releaseGL() {}
}


/***/ }),

/***/ 442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l7": () => (/* binding */ extend),
/* harmony export */   "t7": () => (/* binding */ lerp)
/* harmony export */ });
/* unused harmony exports imageLoaded, log */
function extend(out) {
	out = out || {};

	for (var i = 1; i < arguments.length; i++) {
		var obj = arguments[i];

		if (!obj) continue;

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (typeof obj[key] === "object" && obj[key] !== null) {
					if (obj[key] instanceof Array)
						out[key] = obj[key].slice(0);
					else
						out[key] = extend(out[key], obj[key]);
				} else {
					out[key] = obj[key];
				}
			}
		}
	}

	return out;
};

function lerp(start, end, t) {
	return start * (1 - t) + end * t;
}

function imageLoaded(imgElement) {
	return imgElement.complete && imgElement.naturalHeight !== 0;
}

function log(msg){
	let div = document.getElementById('agl-log')
	if(!div) {
		div = document.createElement('div')
		div.id = 'agl-log'
		document.body.appendChild(div)
	}
		
	div.innerHTML += `${msg.outerHTML || msg}<br />`
}

/***/ }),

/***/ 30:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * anime.js v3.2.1
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

// Defaults

var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
};

var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
};

var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective', 'matrix', 'matrix3d'];

// Caching

var cache = {
  CSS: {},
  springs: {}
};

// Utils

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

function applyArguments(func, args) {
  return func.apply(null, args);
}

var is = {
  arr: function (a) { return Array.isArray(a); },
  obj: function (a) { return stringContains(Object.prototype.toString.call(a), 'Object'); },
  pth: function (a) { return is.obj(a) && a.hasOwnProperty('totalLength'); },
  svg: function (a) { return a instanceof SVGElement; },
  inp: function (a) { return a instanceof HTMLInputElement; },
  dom: function (a) { return a.nodeType || is.svg(a); },
  str: function (a) { return typeof a === 'string'; },
  fnc: function (a) { return typeof a === 'function'; },
  und: function (a) { return typeof a === 'undefined'; },
  nil: function (a) { return is.und(a) || a === null; },
  hex: function (a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a); },
  rgb: function (a) { return /^rgb/.test(a); },
  hsl: function (a) { return /^hsl/.test(a); },
  col: function (a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)); },
  key: function (a) { return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes'; },
};

// Easings

function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(function (p) { return parseFloat(p); }) : [];
}

// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string, duration) {

  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
  var velocity =  minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    var progress = duration ? (duration * t) / 1000 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) { return t; }
    return 1 - progress;
  }

  function getDuration() {
    var cached = cache.springs[string];
    if (cached) { return cached; }
    var frame = 1/6;
    var elapsed = 0;
    var rest = 0;
    while(true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) { break; }
      } else {
        rest = 0;
      }
    }
    var duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }

  return duration ? solver : getDuration;

}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(steps) {
  if ( steps === void 0 ) steps = 10;

  return function (t) { return Math.ceil((minMax(t, 0.000001, 1)) * steps) * (1 / steps); };
}

// BezierEasing https://github.com/gre/bezier-easing

var bezier = (function () {

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 }
  function C(aA1)      { return 3.0 * aA1 }

  function calcBezier(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT }
  function getSlope(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) { aB = currentT; } else { aA = currentT; }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) { return aGuessT; }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function bezier(mX1, mY1, mX2, mY2) {

    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) { return; }
    var sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {

      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;

      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }

    }

    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) { return x; }
      if (x === 0 || x === 1) { return x; }
      return calcBezier(getTForX(x), mY1, mY2);
    }

  }

  return bezier;

})();

var penner = (function () {

  // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)

  var eases = { linear: function () { return function (t) { return t; }; } };

  var functionEasings = {
    Sine: function () { return function (t) { return 1 - Math.cos(t * Math.PI / 2); }; },
    Circ: function () { return function (t) { return 1 - Math.sqrt(1 - t * t); }; },
    Back: function () { return function (t) { return t * t * (3 * t - 2); }; },
    Bounce: function () { return function (t) {
      var pow2, b = 4;
      while (t < (( pow2 = Math.pow(2, --b)) - 1) / 11) {}
      return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow(( pow2 * 3 - 2 ) / 22 - t, 2)
    }; },
    Elastic: function (amplitude, period) {
      if ( amplitude === void 0 ) amplitude = 1;
      if ( period === void 0 ) period = .5;

      var a = minMax(amplitude, 1, 10);
      var p = minMax(period, .1, 2);
      return function (t) {
        return (t === 0 || t === 1) ? t : 
          -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
      }
    }
  };

  var baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];

  baseEasings.forEach(function (name, i) {
    functionEasings[name] = function () { return function (t) { return Math.pow(t, i + 2); }; };
  });

  Object.keys(functionEasings).forEach(function (name) {
    var easeIn = functionEasings[name];
    eases['easeIn' + name] = easeIn;
    eases['easeOut' + name] = function (a, b) { return function (t) { return 1 - easeIn(a, b)(1 - t); }; };
    eases['easeInOut' + name] = function (a, b) { return function (t) { return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 
      1 - easeIn(a, b)(t * -2 + 2) / 2; }; };
    eases['easeOutIn' + name] = function (a, b) { return function (t) { return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : 
      (easeIn(a, b)(t * 2 - 1) + 1) / 2; }; };
  });

  return eases;

})();

function parseEasings(easing, duration) {
  if (is.fnc(easing)) { return easing; }
  var name = easing.split('(')[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case 'spring' : return spring(easing, duration);
    case 'cubicBezier' : return applyArguments(bezier, args);
    case 'steps' : return applyArguments(steps, args);
    default : return applyArguments(ease, args);
  }
}

// Strings

function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch(e) {
    return;
  }
}

// Arrays

function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}

function flattenArray(arr) {
  return arr.reduce(function (a, b) { return a.concat(is.arr(b) ? flattenArray(b) : b); }, []);
}

function toArray(o) {
  if (is.arr(o)) { return o; }
  if (is.str(o)) { o = selectString(o) || o; }
  if (o instanceof NodeList || o instanceof HTMLCollection) { return [].slice.call(o); }
  return [o];
}

function arrayContains(arr, val) {
  return arr.some(function (a) { return a === val; });
}

// Objects

function cloneObject(o) {
  var clone = {};
  for (var p in o) { clone[p] = o[p]; }
  return clone;
}

function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o1) { o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p]; }
  return o;
}

function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o2) { o[p] = is.und(o1[p]) ? o2[p] : o1[p]; }
  return o;
}

// Colors

function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? ("rgba(" + (rgb[1]) + ",1)") : rgbValue;
}

function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) { return r + r + g + g + b + b; } );
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return ("rgba(" + r + "," + g + "," + b + ",1)");
}

function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p, q, t) {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1/6) { return p + (q - p) * 6 * t; }
    if (t < 1/2) { return q; }
    if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
    return p;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return ("rgba(" + (r * 255) + "," + (g * 255) + "," + (b * 255) + "," + a + ")");
}

function colorToRgb(val) {
  if (is.rgb(val)) { return rgbToRgba(val); }
  if (is.hex(val)) { return hexToRgba(val); }
  if (is.hsl(val)) { return hslToRgba(val); }
}

// Units

function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) { return split[1]; }
}

function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') { return 'px'; }
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) { return 'deg'; }
}

// Values

function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) { return val; }
  return val(animatable.target, animatable.id, animatable.total);
}

function getAttribute(el, prop) {
  return el.getAttribute(prop);
}

function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) { return value; }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) { return cached; }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = (el.parentNode && (el.parentNode !== document)) ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = 'absolute';
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}

function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}

function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || (is.svg(el) && el[prop]))) { return 'attribute'; }
  if (is.dom(el) && arrayContains(validTransforms, prop)) { return 'transform'; }
  if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) { return 'css'; }
  if (el[prop] != null) { return 'object'; }
}

function getElementTransforms(el) {
  if (!is.dom(el)) { return; }
  var str = el.style.transform || '';
  var reg  = /(\w+)\(([^)]*)\)/g;
  var transforms = new Map();
  var m; while (m = reg.exec(str)) { transforms.set(m[1], m[2]); }
  return transforms;
}

function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}

function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform': return getTransformValue(target, propName, animatable, unit);
    case 'css': return getCSSValue(target, propName, unit);
    case 'attribute': return getAttribute(target, propName);
    default: return target[propName] || 0;
  }
}

function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) { return to; }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+': return x + y + u;
    case '-': return x - y + u;
    case '*': return x * y + u;
  }
}

function validateValue(val, unit) {
  if (is.col(val)) { return colorToRgb(val); }
  if (/\s/g.test(val)) { return val; }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) { return unitLess + unit; }
  return unitLess;
}

// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}

function getRectLength(el) {
  return (getAttribute(el, 'width') * 2) + (getAttribute(el, 'height') * 2);
}

function getLineLength(el) {
  return getDistance(
    {x: getAttribute(el, 'x1'), y: getAttribute(el, 'y1')}, 
    {x: getAttribute(el, 'x2'), y: getAttribute(el, 'y2')}
  );
}

function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0 ; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) { totalLength += getDistance(previousPos, currentPos); }
    previousPos = currentPos;
  }
  return totalLength;
}

function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

// Path animation

function getTotalLength(el) {
  if (el.getTotalLength) { return el.getTotalLength(); }
  switch(el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el);
    case 'rect': return getRectLength(el);
    case 'line': return getLineLength(el);
    case 'polyline': return getPolylineLength(el);
    case 'polygon': return getPolygonLength(el);
  }
}

function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
}

// Motion path

function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) { break; }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}

function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  }
}

function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function(property) {
    return {
      property: property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    }
  }
}

function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    if ( offset === void 0 ) offset = 0;

    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(+1);
  var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
  var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
  switch (path.property) {
    case 'x': return (p.x - svg.x) * scaleX;
    case 'y': return (p.y - svg.y) * scaleY;
    case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}

// Decompose value

function decomposeValue(val, unit) {
  // const rgx = /-?\d*\.?\d+/g; // handles basic numbers
  // const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var value = validateValue((is.pth(val) ? val.totalLength : val), unit) + '';
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: (is.str(val) || unit) ? value.split(rgx) : []
  }
}

// Animatables

function parseTargets(targets) {
  var targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
  return filterArray(targetsArray, function (item, pos, self) { return self.indexOf(item) === pos; });
}

function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function (t, i) {
    return {target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}

// Properties

function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  // Override duration if easing is a spring
  if (/^spring/.test(settings.easing)) { settings.duration = spring(settings.easing); }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = (l === 2 && !is.obj(prop[0]));
    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) { settings.duration = tweenSettings.duration / l; }
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {value: prop};
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function (v, i) {
    var obj = (is.obj(v) && !is.pth(v)) ? v : {value: v};
    // Default delay value should only be applied to the first tween
    if (is.und(obj.delay)) { obj.delay = !i ? tweenSettings.delay : 0; }
    // Default endDelay value should only be applied to the last tween
    if (is.und(obj.endDelay)) { obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0; }
    return obj;
  }).map(function (k) { return mergeObjects(k, settings); });
}


function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function (key) { return Object.keys(key); })), function (p) { return is.key(p); })
  .reduce(function (a,b) { if (a.indexOf(b) < 0) { a.push(b); } return a; }, []);
  var properties = {};
  var loop = function ( i ) {
    var propName = propertyNames[i];
    properties[propName] = keyframes.map(function (key) {
      var newKey = {};
      for (var p in key) {
        if (is.key(p)) {
          if (p == propName) { newKey.value = key[p]; }
        } else {
          newKey[p] = key[p];
        }
      }
      return newKey;
    });
  };

  for (var i = 0; i < propertyNames.length; i++) loop( i );
  return properties;
}

function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) { params = mergeObjects(flattenKeyframes(keyframes), params); }
  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}

// Tweens

function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(function (v) { return getFunctionValue(v, animatable); });
      if (value.length === 1) { value = value[0]; }
    }
    t[p] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}

function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function (t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) { to = previousValue; }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) { tween.round = 1; }
    previousTween = tween;
    return tween;
  });
}

// Tween progress

var setProgressValue = {
  css: function (t, p, v) { return t.style[p] = v; },
  attribute: function (t, p, v) { return t.setAttribute(p, v); },
  object: function (t, p, v) { return t[p] = v; },
  transform: function (t, p, v, transforms, manual) {
    transforms.list.set(p, v);
    if (p === transforms.last || manual) {
      var str = '';
      transforms.list.forEach(function (value, prop) { str += prop + "(" + value + ") "; });
      t.style.transform = str;
    }
  }
};

// Set Value helper

function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function (animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}

// Animations

function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    }
  }
}

function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function (animatable) {
    return properties.map(function (prop) {
      return createAnimation(animatable, prop);
    });
  })), function (a) { return !is.und(a); });
}

// Create Instance

function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function (anim) { return anim.timelineOffset ? anim.timelineOffset : 0; };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration; })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.delay; })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration - anim.endDelay; })) : tweenSettings.endDelay;
  return timings;
}

var instanceID = 0;

function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}

// Core

var activeInstances = [];

var engine = (function () {
  var raf;

  function play() {
    if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
      raf = requestAnimationFrame(step);
    }
  }
  function step(t) {
    // memo on algorithm issue:
    // dangerous iteration over mutable `activeInstances`
    // (that collection may be updated from within callbacks of `tick`-ed animation instances)
    var activeInstancesLength = activeInstances.length;
    var i = 0;
    while (i < activeInstancesLength) {
      var activeInstance = activeInstances[i];
      if (!activeInstance.paused) {
        activeInstance.tick(t);
        i++;
      } else {
        activeInstances.splice(i, 1);
        activeInstancesLength--;
      }
    }
    raf = i > 0 ? requestAnimationFrame(step) : undefined;
  }

  function handleVisibilityChange() {
    if (!anime.suspendWhenDocumentHidden) { return; }

    if (isDocumentHidden()) {
      // suspend ticks
      raf = cancelAnimationFrame(raf);
    } else { // is back to active tab
      // first adjust animations to consider the time that ticks were suspended
      activeInstances.forEach(
        function (instance) { return instance ._onDocumentVisibility(); }
      );
      engine();
    }
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  return play;
})();

function isDocumentHidden() {
  return !!document && document.hidden;
}

// Public Instance

function anime(params) {
  if ( params === void 0 ) params = {};


  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;

  function makePromise(instance) {
    var promise = window.Promise && new Promise(function (_resolve) { return resolve = _resolve; });
    instance.finished = promise;
    return promise;
  }

  var instance = createNewInstance(params);
  var promise = makePromise(instance);

  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== 'alternate') {
      instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
    }
    instance.reversed = !instance.reversed;
    children.forEach(function (child) { return child.reversed = instance.reversed; });
  }

  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }

  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }

  function seekChild(time, child) {
    if (child) { child.seek(time - child.timelineOffset); }
  }

  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) { seekChild(time, children[i]); }
    } else {
      for (var i$1 = childrenLength; i$1--;) { seekChild(time, children[i$1]); }
    }
  }

  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      // Only check for keyframes if there is more than one tween
      if (tweenLength) { tween = filterArray(tweens, function (t) { return (insTime < t.end); })[0] || tween; }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = (void 0);
      for (var n = 0; n < toNumbersLength; n++) {
        var value = (void 0);
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;
        if (!tween.isPath) {
          value = fromNumber + (eased * (toNumber - fromNumber));
        } else {
          value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
        }
        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      // Manual Array.reduce for better performances
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          var a = strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + ' ';
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }

  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) { instance[cb](instance); }
  }

  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }

  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax((insTime / insDuration) * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) { syncInstanceChildren(insTime); }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback('begin');
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback('loopBegin');
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if ((insTime >= insEndDelay && instance.currentTime !== insDuration) || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback('changeBegin');
      }
      setCallback('change');
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback('changeComplete');
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) { setCallback('update'); }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback('loopComplete');
          setCallback('complete');
          if (!instance.passThrough && 'Promise' in window) {
            resolve();
            promise = makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback('loopComplete');
        instance.loopBegan = false;
        if (instance.direction === 'alternate') {
          toggleInstanceDirection();
        }
      }
    }
  }

  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === 'reverse';
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--;) { instance.children[i].reset(); }
    if (instance.reversed && instance.loop !== true || (direction === 'alternate' && instance.loop === 1)) { instance.remaining++; }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };

  // internal method (for engine) to adjust animation timings before restoring engine ticks (rAF)
  instance._onDocumentVisibility = resetTime;

  // Set Value helper

  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };

  instance.tick = function(t) {
    now = t;
    if (!startTime) { startTime = now; }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };

  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };

  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };

  instance.play = function() {
    if (!instance.paused) { return; }
    if (instance.completed) { instance.reset(); }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    engine();
  };

  instance.reverse = function() {
    toggleInstanceDirection();
    instance.completed = instance.reversed ? false : true;
    resetTime();
  };

  instance.restart = function() {
    instance.reset();
    instance.play();
  };

  instance.remove = function(targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  };

  instance.reset();

  if (instance.autoplay) { instance.play(); }

  return instance;

}

// Remove targets from animation

function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--;) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}

function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations;
  var children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);
  for (var c = children.length; c--;) {
    var child = children[c];
    var childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations);
    if (!childAnimations.length && !child.children.length) { children.splice(c, 1); }
  }
  if (!animations.length && !children.length) { instance.pause(); }
}

function removeTargetsFromActiveInstances(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--;) {
    var instance = activeInstances[i];
    removeTargetsFromInstance(targetsArray, instance);
  }
}

// Stagger helpers

function stagger(val, params) {
  if ( params === void 0 ) params = {};

  var direction = params.direction || 'normal';
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === 'first';
  var fromCenter = fromIndex === 'center';
  var fromLast = fromIndex === 'last';
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    if (fromFirst) { fromIndex = 0; }
    if (fromCenter) { fromIndex = (t - 1) / 2; }
    if (fromLast) { fromIndex = t - 1; }
    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex%grid[0] : (grid[0]-1)/2;
          var fromY = !fromCenter ? Math.floor(fromIndex/grid[0]) : (grid[1]-1)/2;
          var toX = index%grid[0];
          var toY = Math.floor(index/grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') { value = -distanceX; }
          if (axis === 'y') { value = -distanceY; }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) { values = values.map(function (val) { return easing(val / maxValue) * maxValue; }); }
      if (direction === 'reverse') { values = values.map(function (val) { return axis ? (val < 0) ? val * -1 : -val : Math.abs(maxValue - val); }); }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + (spacing * (Math.round(values[i] * 100) / 100)) + unit;
  }
}

// Timeline

function timeline(params) {
  if ( params === void 0 ) params = {};

  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) { activeInstances.splice(tlIndex, 1); }
    function passThrough(ins) { ins.passThrough = true; }
    for (var i = 0; i < children.length; i++) { passThrough(children[i]); }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) { tl.play(); }
    return tl;
  };
  return tl;
}

anime.version = '3.2.1';
anime.speed = 1;
// TODO:#review: naming, documentation
anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (anime);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "animategl." + "webgl" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "animateGL:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["animateglChunks"] = self["animateglChunks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./js/AnimatedPlane.js + 1 modules
var AnimatedPlane = __webpack_require__(116);
;// CONCATENATED MODULE: ./js/Layer.js


// The animated elements of one AnimateGL instance (.agl), kept up to date with the page's scroll position and
// viewport size. The WebGL canvas, renderer, scene and render loop are added by the webgl chunk (webgl.js) when the
// first element needs them: until then gl, scene and canvas are unset and webglReady is false.
class Layer {
    constructor(options, selector, zIndex, width, height) {
        this.selector = selector;
        this.options = options;
        this.zIndex = zIndex;
        this.width = width;
        this.height = height;
        this.planes = [];

        this.createPlanes();

        window.addEventListener('agl-init', this.createPlanes.bind(this));
    }

    createPlanes() {
        const layer = this,
            options = this.options,
            planes = this.planes,
            width = this.width,
            height = this.height;

        this.elements = document.querySelectorAll(this.selector);

        this.elements.forEach(function (element, index) {
            if (!element.plane) {
                const plane = new AnimatedPlane/* AnimatedPlane */.Z(layer, {
                    domElement: element,
                    index,
                    options: options,
                    width: width,
                    height: height,
                });
                planes.push(plane);
                element.plane = plane;
                element.addEventListener('agl-remove', function (e) {
                    // Not animated any more: its observers and WebGL objects are released, and a later agl-init
                    // sets it up as new
                    const removed = this.plane;
                    if (removed) {
                        removed.detach();
                        this.plane = null;
                    }
                });
            }
        });

        this.onScroll(window.scrollX, window.scrollY);
    }

    // Presets added to the registry after the core loaded (compat.js): elements set up before that name one
    presetsAdded(names) {
        this.planes.forEach((plane) => plane.presetsAdded(names));
    }

    removePlane(plane) {
        const index = this.planes.indexOf(plane);
        if (index !== -1) this.planes.splice(index, 1);
    }

    addPlane(plane) {
        if (!this.planes.includes(plane)) this.planes.push(plane);
    }

    // Starts the render loop if it has stopped, once the webgl chunk has added it (webgl.js); nothing to draw before
    wake() {}

    // Draws now if it's drawing (webgl.js)
    drawNow() {}

    resize(width, height) {
        if (this.width == width && this.height == height && this.initialized) return;

        this.initialized = true;

        this.planes.forEach(function (plane) {
            plane.setViewportSize(width, height);
        });

        this.width = width;
        this.height = height;
        // The canvas, once the webgl chunk has added it
        if (this.resizeGL) this.resizeGL();

        // The page's scroll after it has reflowed: the browser moves it (to keep what's on screen in place, or as the
        // page gets shorter) in the layout, before the scroll event, and canvas and planes placed with the old one
        // jumped by the difference
        void document.documentElement.offsetHeight;
        this.onScroll(window.scrollX, window.scrollY);
        this.drawNow();
    }

    onScroll(scrollx, scrollY) {
        this.scrollX = scrollx;
        this.scrollY = scrollY;
        if (this.planes.length == 0) return;

        // Move canvas based on scroll position.
        if (this.canvas) {
            const offset = {
                x: Math.min(scrollx, document.body.scrollWidth),
                y: Math.min(scrollY, document.body.scrollHeight),
            };
            this.canvas.style.transform = ' translate3d(' + offset.x + 'px,' + offset.y + 'px, 0px)';
        }

        this.planes.forEach(function (plane) {
            plane.onScroll(scrollx, scrollY);
        });
    }
}

// EXTERNAL MODULE: ./js/utils/functions.js
var functions = __webpack_require__(442);
;// CONCATENATED MODULE: ./js/compat.js
// The preset registry: the one contract between the runtime and the code that adds entrance presets to it, the
// CodeCanyon packs (AGL Entrance Pack, AGL Entrance Fade Pack), Pro, the WordPress plugin's editors and anyone else.
// No side effects on import, so the packs bundle it too (js/entrancePack.js, js/entranceFadePack.js).
//
// The contract, stable until the packs are retired (presets from PHP replace the globals in lite 1.8.0):
//
//   window.agl.defaults.in.presets   { name: options }. An element with the class agl-<name> plays that entrance.
//                                    A preset is CSS when it has type: 'css', or no type and "CSS" in its name;
//                                    any other is WebGL, and an element using one loads the webgl chunk.
//   window.agl.defaults.in.names     [{ name, title, type?, custom? }]: the groups the editors list (a group is
//                                    every preset whose name starts with its name). One entry per name.
//   AnimateGL.registerPresets(presets, names)
//                                    Adds both. The same as addPresets() below, which the packs bundle.
//
// What keeps working, whatever loads first:
// - Presets added before the core loads (window.agl.defaults.in set up by hand, or addPresets() without a
//   runtime) are kept when it loads: its own presets are added to them, and their names after its own.
// - The packs as shipped since 2023 run after the core and replace the presets object
//   (agl.defaults.in.presets = extend({}, agl.defaults.in.presets, new)) and push their names. presets and
//   names are accessors on the core's agl.defaults.in: assigning presets adds them to the one registry object,
//   assigning names adds the new entries, and pushing an entry that's already listed doesn't list it twice.
//   So a pack loaded twice, or once as a plugin and once inside Pro, lists its presets once.
// - In WordPress, the head script creates window.agl.defaults.in before any script, so an old pack moved before
//   the core by an optimization plugin still finds it.
// - A running AnimateGL instance reads the registry itself, not a copy: elements set up later use presets added
//   since, and an element already set up whose class names a preset added after it was set up (a pack that loads
//   late) is set up again with it, loading the webgl chunk if that preset is WebGL.
//
// Replacing window.agl.defaults or window.agl.defaults.in after the core has loaded isn't supported: the running
// instance keeps the registry it has.

// A state that two copies of the core on one page share, so they keep one registry
const STATE = '_aglPresetRegistry';

function root() {
    const agl = (window.agl = window.agl || {});
    agl.defaults = agl.defaults || {};
    agl.defaults.in = agl.defaults.in || {};
    return agl.defaults.in;
}

function state() {
    return root()[STATE];
}

// The registry's entrance options (window.agl.defaults.in), with presets and names, created if nothing has yet
function entranceDefaults() {
    const entrance = root();
    if (!entrance.presets) entrance.presets = {};
    if (!entrance.names) entrance.names = [];
    return entrance;
}

// The preset names in list that aren't in the registry yet, added to it in place
function mergePresets(presets, list) {
    const added = [];
    Object.keys(list || {}).forEach((name) => {
        if (!Object.prototype.hasOwnProperty.call(presets, name)) added.push(name);
        if (presets[name] !== list[name]) presets[name] = list[name];
    });
    return added;
}

// Adds entries to names in place: one per name, a later one replacing an earlier one with the same name
function mergeNames(names, list) {
    (list || []).forEach((entry) => {
        if (!entry || !entry.name) return;
        const index = names.findIndex((known) => known.name === entry.name);
        if (index === -1) Array.prototype.push.call(names, entry);
        else names[index] = entry;
    });
}

// A names array whose push() skips entries already listed, as the old packs push theirs
function namesArray(list) {
    const names = [];
    Object.defineProperty(names, 'push', {
        value(...entries) {
            mergeNames(this, entries);
            return this.length;
        },
        configurable: true,
        writable: true,
    });
    mergeNames(names, list);
    return names;
}

function notify(added) {
    const registry = state();
    if (!registry || !added.length) return;
    registry.pending.push(...added);
    if (registry.scheduled) return;
    registry.scheduled = true;
    // Once per batch: a pack sets its presets, then its names
    Promise.resolve().then(() => {
        const names = registry.pending.splice(0);
        registry.scheduled = false;
        registry.listeners.forEach((listener) => listener(names));
    });
}

// Adds presets and their names to the registry, before the core loads or after. Safe to call twice with the same
// presets: they're listed once, and elements already using them aren't set up again.
function addPresets(presets, names) {
    const entrance = entranceDefaults();
    const registry = state();
    const added = mergePresets(registry ? registry.presets : entrance.presets, presets);
    mergeNames(registry ? registry.names : entrance.names, names);
    notify(added);
    return added;
}

// The core's defaults (main.js) merged with whatever was set on window.agl.defaults before it loaded, the way the
// core always did (its values win), except that names registered earlier are kept after its own. presets and
// names become the accessors described above. Returns window.agl.defaults.
function installDefaults(core) {
    const agl = (window.agl = window.agl || {});
    const before = agl.defaults || {};
    const beforeIn = before.in || {};
    const existing = beforeIn[STATE];

    const defaults = extendOptions({}, before, core);
    const entrance = defaults.in;

    // A second copy of the core keeps the first one's registry, and the presets added to it since
    const registry = existing || { presets: {}, names: namesArray(), listeners: [], pending: [], scheduled: false };
    mergePresets(registry.presets, beforeIn.presets);
    mergePresets(registry.presets, core.in.presets);
    // The core's names first, in its order, then those added before it loaded
    const earlierNames = (beforeIn.names || []).slice(0);
    mergeNames(registry.names, core.in.names);
    mergeNames(registry.names, earlierNames);

    Object.defineProperty(entrance, STATE, { value: registry, configurable: true });
    Object.defineProperty(entrance, 'presets', {
        get: () => registry.presets,
        // agl.defaults.in.presets = extend({}, agl.defaults.in.presets, newPresets): the packs as shipped
        set: (presets) => notify(mergePresets(registry.presets, presets)),
        enumerable: true,
        configurable: true,
    });
    Object.defineProperty(entrance, 'names', {
        get: () => registry.names,
        set: (names) => mergeNames(registry.names, names),
        enumerable: true,
        configurable: true,
    });

    agl.defaults = defaults;
    return defaults;
}

// Calls listener(names) with the names of presets added to the registry after the core has loaded
function watchPresets(listener) {
    const registry = state();
    if (registry) registry.listeners.push(listener);
}

// extend() from utils/functions.js, but leaving the registry's own state out of the copy
function extendOptions(out, ...sources) {
    sources.forEach((source) => {
        if (!source) return;
        Object.keys(source).forEach((key) => {
            if (key === STATE) return;
            const value = source[key];
            if (Array.isArray(value)) out[key] = value.slice(0);
            else if (typeof value === 'object' && value !== null) out[key] = extendOptions(out[key] && typeof out[key] === 'object' ? out[key] : {}, value);
            else out[key] = value;
        });
    });
    return out;
}

;// CONCATENATED MODULE: ./js/main.js




// The core runtime (animategl.min.js): CSS entrances, the class parser, the viewport observers, play()/reset(),
// events and the register APIs. WebGL (OGL, the shaders, the render loop, html2canvas) is in the webgl chunk,
// animategl.webgl.min.js, which the core loads next to itself only when an element on the page needs it
// (webglLoader.js, AnimatedPlane.needsWebGL()).
class Animations {
    constructor() {
        const own = arguments[0];
        const options = (0,functions/* extend */.l7)({}, agl.defaults, own);
        // The registry itself, not a copy, unless the page passed presets of its own: elements set up later use
        // presets added since (compat.js). embed.js passes the registry.
        const presets = entranceDefaults().presets;
        if (!own || !own.in || !own.in.presets || own.in.presets === presets) options.in.presets = presets;
        this.options = options;

        // An extension is still loading code the runtime has to start with (AnimateGL.hold()): start after it
        if (pending) {
            // Then the agl-init listeners the extension added look through the page, once it's set up
            Animations.ready().then(() => this.start(() => window.dispatchEvent(new Event('agl-init'))));
            return;
        }

        this.start();
    }

    // then: called after init()
    start(then) {
        const init = () => {
            this.init();
            if (then) then();
        };
        // Constructed before <body> exists (a script in <head>, or the block editor canvas): finish once the DOM is ready
        if (!document.body) {
            document.addEventListener('DOMContentLoaded', init, { once: true });
            return;
        }

        init();
    }

    init() {
        // animategl.css hides .agl elements only under .agl-js; pages without the WordPress plugin's head script get it here
        document.documentElement.classList.add('agl-js');

        const layers = [];

        const viewportSizeDiv = document.createElement('div');

        // viewportSizeDiv.className = 'agl-viewport-height'
        viewportSizeDiv.style.position = 'fixed';
        viewportSizeDiv.style.top = '0';
        viewportSizeDiv.style.left = '0';
        viewportSizeDiv.style.height = '100vh';
        viewportSizeDiv.style.pointerEvents = 'none';
        document.body.appendChild(viewportSizeDiv);

        let width = document.documentElement.clientWidth;
        let height = viewportSizeDiv.clientHeight;

        const imageLayer = new Layer(this.options, '.agl', 999, width, height);
        layers.push(imageLayer);
        // A preset added after elements that name it were set up (a pack that loads late): set them up again
        if (this.options.in.presets === entranceDefaults().presets) watchPresets((names) => imageLayer.presetsAdded(names));

        // The animated elements in a node (itself and inside it) that have been set up
        const planesIn = function (node, list) {
            if (!node.classList) return;
            if (node.plane) list.add(node.plane);
            node.querySelectorAll('.agl').forEach((element) => element.plane && list.add(element.plane));
        };

        new MutationObserver(function (mutations) {
            let init = false;
            // Elements removed from the page, or moved (removed and added again)
            const moved = new Set();
            mutations.forEach(function (mutation) {
                mutation.removedNodes.forEach((node) => planesIn(node, moved));
                mutation.addedNodes.forEach((node) => node.classList && node.isConnected && planesIn(node, moved));
                if (mutation.attributeName === 'class') {
                    var target = mutation.target;
                    if (target.classList.contains('agl')) {
                        if (!target.plane) init = true;
                        else {
                            target.plane.cssClassUpdated();
                        }
                    } else {
                        if (target.plane) target.plane.disable();
                    }
                } else if (mutation.addedNodes.length) {
                    const addedNodes = mutation.addedNodes;
                    for (let i = 0; i < addedNodes.length; i++) {
                        const addedNode = addedNodes[i];
                        if (!addedNode.classList) continue;
                        if (addedNode.classList.contains('agl')) {
                            if (!addedNode.plane) init = true;
                            else {
                                addedNode.plane.cssClassUpdated();
                            }
                        }
                        // A wrapper (slider, AJAX content, infinite scroll) with .agl elements inside it
                        if (!init && addedNode.querySelector('.agl')) init = true;
                    }
                }
            });
            // Removed for good: no longer observed or drawn. Back on the page: observed again
            moved.forEach((plane) => (plane.originalDomElement.isConnected ? plane.reattach() : plane.detach()));
            // Once per batch: the agl-init listeners look through the whole page
            if (init) window.dispatchEvent(new Event('agl-init'));
        }).observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
            childList: true,
            subtree: true,
        });

        let resizeTimeout;

        function resize() {
            // window size without scrollbars
            height = viewportSizeDiv.clientHeight;
            width = document.documentElement.clientWidth;

            layers.forEach(function (layer) {
                layer.resize(width, height);
            });

            if (resizeEvent) {
                resizeEvent = false;
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(resize, 1000);
            }
        }

        // On every resize, which the browser sends at most once a frame: WebGL elements follow the page as it reflows
        // instead of staying where they were until the resize is over. And once more a second after it. While it goes
        // on (layer.resizing) they're only moved and scaled; their images and render targets are redrawn at the new
        // size once it has stopped for settleDelay ms (WebGLPlane.updatePositions()).
        let resizeEvent = false;
        const settleDelay = 150;
        let settleTimeout;

        function settle() {
            layers.forEach(function (layer) {
                layer.resizing = false;
                layer.onScroll(window.scrollX, window.scrollY);
                layer.wake();
            });
        }

        function scheduleResize() {
            resizeEvent = true;
            layers.forEach((layer) => (layer.resizing = true));
            resize();
            clearTimeout(settleTimeout);
            settleTimeout = setTimeout(settle, settleDelay);
        }

        window.addEventListener('resize', scheduleResize, false);

        const observer = new ResizeObserver(scheduleResize);
        observer.observe(document.querySelector('body'));

        function onScroll() {
            layers.forEach(function (layer) {
                layer.onScroll(window.scrollX, window.scrollY);
            });
        }

        window.addEventListener('scroll', onScroll);
    }

    update() {
        console.log('update');
    }
}

// Plays an element's entrance animation now if it's in view, or when it enters the viewport. For elements with
// the class agl-manual (or data-agl-manual), which otherwise wait; others play on their own anyway.
// Works before the runtime has set the element up. Listen for agl-animation-start and agl-animation-end on it.
Animations.play = function (element) {
    element.aglPlayRequested = true;
    if (element.plane) element.plane.play();
};

// Hides the element again, so play() can run its entrance animation again
Animations.reset = function (element) {
    element.aglPlayRequested = false;
    if (element.plane) element.plane.reset();
};

// Effects that deform an element while the page scrolls, picked with the class agl-scroll-<name> (PLAN.md §6.4
// item 6). After a WebGL entrance, the element is drawn by WebGL while the page scrolls and shown as itself again
// when it stops. effect.init(plane), if given, runs before the first frame; effect.render(plane, velocity) runs on
// each frame while scrolling, and once more with velocity 0 when scrolling stops, to reset what it changed.
// velocity is the eased scroll lag in thousands of pixels, positive when scrolling down, eased in from 0 each time
// the effect starts. init() runs again after a class change picks another effect.
// Effects are WebGL: registering one loads nothing, an element that uses one loads the webgl chunk (webglLoader.js),
// so Pro can register its effects before the chunk is there and they're used once it is.
Animations.effects = {};
Animations.registerEffect = function (name, effect) {
    Animations.effects[name] = effect;
};

// The same while the mouse is over the element, picked with agl-hover-<name>. effect.render(plane, { amount, x, y,
// vx, vy, speed, time }) runs on each frame: amount eases from 0 to 1 while the mouse is over the element and back
// to 0 after it leaves (a last call with 0 resets what it changed); x and y are the mouse position in the element,
// 0 to 1 from the bottom left; vx and vy the mouse's eased velocity in element sizes per second, speed its length,
// all 0 while the mouse rests; time the seconds since the effect started. Mice only, unless touchHover is set: then
// a finger or pen on the element counts as the mouse, until it lifts (for previewing the effects on a phone).
// Both kinds of effect also run on an image with agl-in-none instead of an entrance: it's shown as itself and only
// drawn by WebGL while its effect runs. A hover effect with resting: true runs whenever it could, also without the
// mouse (amount 0), so it can change how the element looks at rest (a reveal hides the image until the mouse comes).
Animations.hoverEffects = {};
Animations.touchHover = false;
Animations.registerHoverEffect = function (name, effect) {
    Animations.hoverEffects[name] = effect;
};

// Plays an element's hover effect once without a pointer, as if one swept across it (for screens without a mouse):
// options { duration (ms, 1500), from, to ([x, y] of the pointer's path, 0 to 1 from the bottom left) }. It starts
// once the effect could run, after the entrance and in view, and a real pointer over the element ends it. Works
// before the runtime has set the element up.
Animations.playHover = function (element, options = {}) {
    if (element.plane) return element.plane.playHover(options);
    element.aglPlayHover = options;
    return true;
};

// Adds entrance presets: { name: options } and names [{ name, title, type? }] for the editors' lists. Works
// with elements already on the page. The contract for presets, packs and agl.defaults is in compat.js.
Animations.registerPresets = addPresets;

// Extensions that have to finish something before the runtime starts (AnimateGL Pro's license check) pass
// AnimateGL.hold() a promise, and the runtime starts once it has settled, whether it resolved or not.
// AnimateGL.ready() resolves when every promise held so far has settled; a hold() after new AnimateGL() isn't
// waited for, so extensions call it as their script runs.
const holds = [];
let pending = 0;
Animations.hold = function (promise) {
    pending++;
    holds.push(Promise.resolve(promise).then(() => {}, () => {}).then(() => pending--));
    return promise;
};
Animations.ready = function () {
    return Promise.all(holds).then(() => {});
};

window.AnimateGL = Animations;

const defaults = {
    rootFolder: '../',
    // The webgl chunk's full URL, when it isn't next to this bundle (js/webglLoader.js). The WordPress plugin sets it.
    webglSrc: '',
    html2canvasSrc: 'js/lib/html2canvas.min.js',

    in: {
        name: '',
        easing: 'easeInOutSine',
        ease: 0.1,
        opacity: 0,
        duration: 1000,
        delay: 0,
        distance: 1,
        scale: 1,
        type: 'webgl',
        angle: 0,
        lockToScrollbar: false, // animation progress depends on the element position in viewport, if element is inside scrollable area
        repeat: false, // animation repeats each time element enters the viewport
        viewportTopMargin: 0, // viewport top border for lockToScrollbar animation
        viewportBottomMargin: 0, // viewport bottom border for lockToScrollbar animation
        cameraFov: 30,
        // offset: 0,
        displacement: {
            strength: 0,
        },
        curl: {
            radius: 0.2,
            strength: 0,
        },
        bend: {
            strength: 0,
        },
        // liquid: {
        // 	radius: [0, 1]
        // },
        fade: {
            enabled: true,
            threshold: 0.4,
            type: 'right',
            alphaMapSrc: null,
            // brightness: 0,
            // displacement: 0
        },
        liquid: {
            enabled: false,
        },
        translate: {
            enabled: false,
            x: 0,
            y: 0,
            z: 0,
        },
        rotate: {
            enabled: false,
            x: 0,
            y: 0,
            z: 0,
        },
        corners: {
            enabled: true,
            start1: 0,
            start2: 0,
            start3: 0,
            start4: 0,
            end1: 1,
            end2: 1,
            end3: 1,
            end4: 1,
            easeX: 1,
            easeY: 1,
        },
        presets: {
            bend: { fade: { type: 'basic' }, translate: { x: 1 }, corners: { end1: 0.7, end2: 0.7, easeY: 3 } },
            bendLeft: { fade: { type: 'basic' }, translate: { x: 1 }, corners: { end1: 0.7, end2: 0.7, easeY: 3 } },
            bendRight: { fade: { type: 'basic' }, translate: { x: -1 }, corners: { end1: 0.7, end2: 0.7, easeY: 3 } },
            bendUp: { fade: { type: 'basic' }, translate: { y: -1 }, corners: { end1: 0.7, end3: 0.7, easeX: 3 } },
            bendDown: { fade: { type: 'basic' }, translate: { y: 1 }, corners: { end1: 0.7, end3: 0.7, easeX: 3 } },

            fade: { fade: { type: 'right' } },
            fadeLeft: { fade: { type: 'left' } },
            fadeRight: { fade: { type: 'right' } },
            fadeUp: { fade: { type: 'up' } },
            fadeDown: { fade: { type: 'down' } },

            peel: {
                fade: { type: 'basic' },
                translate: { x: 1, z: 0.7 },
                rotate: { y: 180 },
                corners: { end2: 0.5, end4: 0.6, end1: 0.9, easeX: 2 },
            },
            peelLeft: {
                fade: { type: 'basic' },
                translate: { x: 1, z: 0.7 },
                rotate: { y: 180 },
                corners: { end2: 0.5, end4: 0.6, end1: 0.9, easeX: 2 },
            },
            peelRight: {
                fade: { type: 'basic' },
                translate: { x: -1, z: 0.7 },
                rotate: { y: -180 },
                corners: { end1: 0.5, end3: 0.6, end2: 0.9, easeX: 1 },
            },
            peelUp: {
                fade: { type: 'basic' },
                translate: { y: -1, z: 0.7 },
                rotate: { x: -180 },
                corners: { end1: 0.5, end2: 0.6, end3: 0.9, easeY: 1 },
            },
            peelDown: {
                fade: { type: 'basic' },
                translate: { y: 1, z: 0.7 },
                rotate: { x: -180 },
                corners: { end1: 0.9, end3: 0.5, end4: 0.6, easeY: 2 },
            },

            flip: {
                fade: { type: 'basic' },
                rotate: { y: 180 },
                translate: { z: -1 },
                corners: { end1: 0.8, end2: 1, end3: 0.4, end4: 0.6, easeX: 2, easeY: 2 },
            },
            flipLeft: {
                fade: { type: 'basic' },
                rotate: { y: 180 },
                translate: { z: -1 },
                corners: { end1: 0.8, end2: 1, end3: 0.4, end4: 0.6, easeX: 2, easeY: 2 },
            },
            flipRight: {
                fade: { type: 'basic' },
                rotate: { y: 180 },
                translate: { z: -1 },
                corners: { end1: 1, end2: 0.8, end3: 0.6, end4: 0.4, easeX: 2, easeY: 2 },
            },
            flipUp: {
                fade: { type: 'basic' },
                rotate: { x: 180 },
                translate: { z: -1 },
                corners: { end1: 0.8, end2: 0.4, end3: 1, end4: 0.6, easeX: 2, easeY: 2 },
            },
            flipDown: {
                fade: { type: 'basic' },
                rotate: { x: 180 },
                translate: { z: -1 },
                corners: { end1: 1, end2: 0.6, end3: 0.8, end4: 0.4, easeX: 2, easeY: 2 },
            },

            slide: { fade: { type: 'right' }, translate: { x: 0.4 } },
            slideLeft: { fade: { type: 'right' }, translate: { x: 0.4 } },
            slideRight: { fade: { type: 'left' }, translate: { x: -0.4 } },
            slideUp: { fade: { type: 'down' }, translate: { y: -0.4 } },
            slideDown: { fade: { type: 'up' }, translate: { y: 0.4 } },

            stretch: {
                fade: { type: 'basic' },
                translate: { x: 0.4 },
                corners: { start2: 0.3, start4: 0.3, end1: 0.6, end3: 0.6, easeX: 1 },
            },
            stretchLeft: {
                fade: { type: 'basic' },
                translate: { x: 0.4 },
                corners: { start2: 0.3, start4: 0.3, end1: 0.6, end3: 0.6, easeX: 1 },
            },
            stretchRight: {
                fade: { type: 'basic' },
                translate: { x: -0.4 },
                corners: { start1: 0.3, start3: 0.3, end2: 0.6, end4: 0.6, easeX: 2 },
            },
            stretchDown: {
                fade: { type: 'basic' },
                translate: { y: 0.4 },
                corners: { start3: 0.3, start4: 0.3, end1: 0.6, end2: 0.6, easeY: 1 },
            },
            stretchUp: {
                fade: { type: 'basic' },
                translate: { y: -0.4 },
                corners: { start1: 0.3, start2: 0.3, end3: 0.6, end4: 0.6, easeY: 2 },
            },

            zoomIn: { fade: { type: 'basic' }, translate: { z: -10 }, corners: { end2: 0.8, end1: 0.6, end3: 0.8 } },
            zoomInLeft: { fade: { type: 'basic' }, translate: { z: -10, x: 3 }, corners: { end2: 0.8, end1: 0.6, end3: 0.8 } },
            zoomInRight: { fade: { type: 'basic' }, translate: { z: -10, x: -3 }, corners: { end2: 0.6, end1: 0.8, end4: 0.8 } },
            zoomInUp: { fade: { type: 'basic' }, translate: { z: -10, y: -3 }, corners: { end4: 0.8, end1: 0.8, end3: 0.6 } },
            zoomInDown: { fade: { type: 'basic' }, translate: { z: -10, y: 3 }, corners: { end2: 0.8, end1: 0.6, end3: 0.8 } },

            zoomOut: { fade: { type: 'basic' }, translate: { z: 5 }, corners: { end2: 0.8, end1: 0.6, end3: 0.8 } },
            zoomOutLeft: { fade: { type: 'basic' }, translate: { z: 5, x: 3 }, corners: { end2: 0.8, end1: 0.6, end3: 0.8 } },
            zoomOutRight: { fade: { type: 'basic' }, translate: { z: 5, x: -3 }, corners: { end2: 0.6, end1: 0.8, end4: 0.8 } },
            zoomOutUp: { fade: { type: 'basic' }, translate: { z: 5, y: -3 }, corners: { end4: 0.8, end1: 0.8, end3: 0.6 } },
            zoomOutDown: { fade: { type: 'basic' }, translate: { z: 5, y: 3 }, corners: { end2: 0.8, end1: 0.6, end3: 0.8 } },

            fadeCSS: {},
            fadeCSSLeft: { translate: { x: '50px' } },
            fadeCSSRight: { translate: { x: '-50px' } },
            fadeCSSUp: { translate: { y: '50px' } },
            fadeCSSDown: { translate: { y: '-50px' } },

            zoomInCSS: { scale: 0.75 },
            zoomInCSSLeft: { translate: { x: '25%' }, scale: 0.75 },
            zoomInCSSRight: { translate: { x: '-25%' }, scale: 0.75 },
            zoomInCSSUp: { translate: { y: '25%' }, scale: 0.75 },
            zoomInCSSDown: { translate: { y: '-25%' }, scale: 0.75 },

            zoomOutCSS: { scale: 1.25 },
            zoomOutCSSLeft: { translate: { x: '25%' }, scale: 1.25 },
            zoomOutCSSRight: { translate: { x: '-25%' }, scale: 1.25 },
            zoomOutCSSUp: { translate: { y: '25%' }, scale: 1.25 },
            zoomOutCSSDown: { translate: { y: '-25%' }, scale: 1.25 },

            wipeCSS: { clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'] },
            wipeCSSLeft: { clipPath: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'] },
            wipeCSSRight: { clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'] },
            wipeCSSUp: { clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] },
            wipeCSSDown: { clipPath: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'] },

            slideCSS: { clipPath: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'], translate: { x: '-100%' } },
            slideCSSLeft: { clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'], translate: { x: '100%' } },
            slideCSSRight: { clipPath: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'], translate: { x: '-100%' } },
            slideCSSUp: { clipPath: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'], translate: { y: '100%' } },
            slideCSSDown: { clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'], translate: { y: '-100%' } },
        },

        names: [
            { name: 'fadeCSS', title: 'Fade' },
            { name: 'zoomInCSS', title: 'Zoom In' },
            { name: 'zoomOutCSS', title: 'Zoom Out' },
            { name: 'wipeCSS', title: 'Wipe' },
            { name: 'slideCSS', title: 'Slide' },
            { name: 'fade', title: 'Fade' },
            { name: 'flip', title: 'Flip' },
            { name: 'slide', title: 'Slide' },
            { name: 'stretch', title: 'Stretch' },
            { name: 'bend', title: 'Bend' },
            { name: 'peel', title: 'Peel' },
            { name: 'zoomIn', title: 'Zoom In' },
            { name: 'zoomOut', title: 'Zoom Out' },
        ],
    },

    mouse: {
        water: {
            enabled: false,
            speed: 0.5,
            strength: 1,
            size: 0.5,
        },

        rotate: {
            enabled: false,
            ease: 0.25,
            inertia: 0.85,
        },

        hover: {
            enabled: false,
            rotate: 0.5,
            zoom: 0,
            scale: 1.2,
            ease: 0.1,
        },
    },

    scroll: {
        bend: {
            enabled: false,
            radius: 0.2,
            strength: 0,
        },
        fisheye: {
            enabled: false,
            strength: 0, // < 0 -> edge, > 0 -> center
        },
        stretch: {
            strength: 0,
        },
        displacement: {
            strength: 0,
        },
        rgbShift: {
            strength: 0,
        },
        ease: 0.1,
    },
};
// agl.defaults can be defined before the core loads, by another plugin, which can add more options and presets to
// it; they're kept (compat.js)
installDefaults(defaults);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});