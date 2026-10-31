'use-strict';

(function () {

	function init() {
		if (window.animateGLInstance) return;

		// Visitors who prefer reduced motion see the content without animation. The admin page
		// still needs the runtime for its previews and the Animation Editor.
		const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion && !document.body.classList.contains('wp-admin')) return;

		try {
			const settings = window.agl_options || []
			const options = JSON.parse(settings[0] || '{}')
			options.rootFolder = settings[1]
			// The webgl chunk's URL from PHP, which still holds when an optimization plugin moved this runtime
			if (settings[3]) options.webglSrc = settings[3]
			// The WebGL canvas's z-index from the Settings tab (999 unless changed)
			if (settings[4] !== null && settings[4] !== undefined) options.zIndex = settings[4]

			if (options.in) {
				// Reset presets to global presets
				if (options.in.presets)
					options.in.presets = agl.defaults.in.presets
				if (options.in.fade) {
					if (options.in.fade.alphaMapSrc)
						delete options.in.fade.alphaMapSrc
					if (options.in.fade.image)
						delete options.in.fade.image
				}
			}

			window.animateGLInstance = new AnimateGL(options)
		} catch (error) {
			// Don't leave animated elements hidden
			document.documentElement.classList.remove('agl-js')
			console.warn('AnimateGL:', error)
			return
		}

		window.dispatchEvent(new Event('agl-init'))
	}

	// Start once the page has loaded, or right away if this script runs later (e.g. delayed by an optimization plugin)
	// and once the runtime's extensions have the code they start with (AnimateGL.hold())
	function start() {
		if (window.AnimateGL && window.AnimateGL.ready) window.AnimateGL.ready().then(init)
		else init()
	}
	if (document.readyState === 'complete') start()
	else window.addEventListener('load', start)

})();
