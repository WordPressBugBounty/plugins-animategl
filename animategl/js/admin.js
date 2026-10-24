'use-strict';

(function ($) {

	$(document).ready(function () {

		const { __ } = wp.i18n

		// Tabs. Old links (#getting-started, #presets, #default-entrance, #support, #addons) open the tab that replaced them.
		const oldHashes = {
			'#getting-started': '#home',
			'#presets': '#animations',
			'#default-entrance': '#animation-editor',
			'#support': '#help',
			'#addons': '#get-pro'
		}

		function showTab(hash) {
			hash = oldHashes[hash] || hash
			let target = hash ? $('.nav-tab[href="' + hash + '"]') : $()
			if (!target.length) target = $('.nav-tab:first')

			$('.tab-content').hide()
			$(target.attr('href')).show()

			$('.nav-tab').removeClass('nav-tab-active')
			target.addClass('nav-tab-active')
		}

		showTab(window.location.hash)

		$(document).on('click', '.nav-tab, .agl-tab-link', function () {
			const target = $(this).attr('href')
			showTab(target)
			history.pushState(null, null, target)
			return false
		})

		window.addEventListener('popstate', function () {
			showTab(window.location.hash)
		})

		// Copy buttons copy the text of the nearest .agl-copy-text: the first one in the closest element around
		// the button that has one
		$(document).on('click', '.agl-copy', function () {
			const button = this
			let source = $()
			for (let el = button.parentElement; el && !source.length; el = el.parentElement) {
				source = $(el).find('.agl-copy-text').first()
			}
			if (!source.length) return
			const text = source.is('textarea') ? source.val() : source.text()
			const done = function () {
				const label = button.textContent
				button.textContent = __('Copied', 'animategl')
				setTimeout(function () { button.textContent = label }, 1200)
			}
			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard.writeText(text).then(done, function () { selectText(source[0]) })
			} else {
				selectText(source[0])
				if (document.execCommand('copy')) done()
			}
		})

		function selectText(el) {
			if (!el) return
			if (el.select) return el.select()
			const range = document.createRange()
			range.selectNodeContents(el)
			const selection = window.getSelection()
			selection.removeAllRanges()
			selection.addRange(range)
		}

		// Animations tab: the gallery
		const preview = document.querySelector('.agl-preset')
		const container = document.querySelector('.agl-presets-container')
		// The entrances go before the effect cards the page already has
		const effectsStart = container.querySelector('.agl-preset-group')
		const images = [preview.querySelector('img').src].concat($('[data-agl-sample]').map(function () { return this.src }).get())

		const presets = agl.defaults.in.presets
		const names = agl.defaults.in.names

		// Saved animations (AnimateGL Pro) are presets too, and have a filter of their own
		const custom = names.filter(name => name.custom).map(name => name.name)

		// [preset, title, type] for the class builder
		const builderPresets = []
		let cardIndex = 0

		names.forEach(name => {
			if (!name.custom) addGroup(name)
		})
		if (custom.length) {
			addHeading(__('My animations', 'animategl'), 'mine')
			names.filter(name => name.custom).forEach(name => addCard(name.name, name.title, 'mine'))
			$('.agl-chip[data-filter="mine"]').prop('hidden', false)
		}

		function addHeading(text, type) {
			const heading = document.createElement('h2')
			heading.className = 'agl-preset-group'
			heading.dataset.type = type
			heading.textContent = text
			container.insertBefore(heading, effectsStart)
		}

		function addGroup(name) {
			const isCSS = name.name.includes('CSS')
			addHeading(name.title.replace('CSS', '').trim() + (isCSS ? ' CSS' : ' WebGL'), isCSS ? 'css' : 'webgl')

			for (const presetName in presets) {
				if (presetName.includes(name.name) && isCSS == presetName.includes('CSS') && !custom.includes(presetName)) {
					let title = ''
					for (const obj of names) {
						if (presetName.includes(obj.name)) {
							if (presetName.includes('CSS')) {
								title = obj.title.replace('CSS', '') + ' ' + presetName.replace(obj.name, '').replace('CSS', '')
							} else if (!obj.name.includes('CSS')) {
								title = obj.title + ' ' + presetName.replace(obj.name, '')
							}
						}
					}
					addCard(presetName, title.trim(), isCSS ? 'css' : 'webgl')
				}
			}
		}

		// A card shows its image at rest and plays its animation when the mouse comes over it, or on Replay. Its
		// classes are added on the first play, so the gallery doesn't set up (and play) every animation on load.
		function addCard(presetName, title, type) {
			const card = preview.cloneNode(true)
			const img = card.querySelector('img')
			card.dataset.type = type
			card.dataset.preset = presetName
			card.dataset.search = (title + ' ' + presetName).toLowerCase()
			card.querySelector('.agl-preset-title').textContent = title
			card.querySelector('.agl-preset-class').textContent = 'agl agl-' + presetName
			img.src = images[cardIndex % images.length]
			card.querySelector('.agl-play').onclick = function () { play(img, presetName) }
			card.querySelector('.agl-customize').onclick = function () { customize(presetName) }
			card.addEventListener('mouseenter', function () { play(img, presetName) })
			container.insertBefore(card, effectsStart)
			builderPresets.push([presetName, title, type])
			cardIndex++
		}

		// Any change to a class with agl in it makes the runtime play the animation again
		function play(img, presetName) {
			if (img.dataset.aglPlayed && Date.now() - img.dataset.aglPlayed < 1000) return
			img.dataset.aglPlayed = Date.now()
			if (!img.classList.contains('agl')) {
				img.classList.add('agl', 'agl-' + presetName)
			} else if (img.plane) {
				img.classList.toggle('agl-in-delay-0')
			}
		}

		// Opens the Editor tab with the card's animation, to change it and save it as the default (or, in Pro, in
		// My animations)
		let editor = null
		let pendingPreset = null
		function customize(presetName) {
			showTab('#animation-editor')
			history.pushState(null, null, '#animation-editor')
			window.scrollTo(0, 0)
			if (editor) loadPreset(presetName)
			else pendingPreset = presetName
		}

		function loadPreset(presetName) {
			const preset = presets[presetName]
			if (!preset) return
			const type = preset.type || (presetName.includes('CSS') ? 'css' : 'webgl')
			editor.setEditorOptions(JSON.parse(JSON.stringify(Object.assign({}, preset, { type }))))
			editorOptions.in.preset = presetName
			editorGui.controllersRecursive().forEach(function (controller) { controller.updateDisplay() })
			const title = $('.agl-preset[data-preset="' + presetName + '"] .agl-preset-title').first().text() || presetName
			/* translators: %s: animation name */
			say(wp.i18n.sprintf(__('Loaded "%s" into the editor.', 'animategl'), title))
			dispatchEvent(new Event('agl-animate'))
		}

		preview.remove()

		// Effect cards play their clip while the mouse is over them
		$(container).find('.agl-effect').each(function () {
			const video = this.querySelector('video')
			this.addEventListener('mouseenter', function () {
				const playing = video.play()
				if (playing) playing.catch(function () {})
			})
			this.addEventListener('mouseleave', function () {
				video.pause()
				video.currentTime = 0
			})
		})

		// Filters and search
		let filter = 'all'
		function applyFilters() {
			const query = $('#agl-gallery-search').val().trim().toLowerCase()
			let shown = 0
			$(container).children('.agl-preset').each(function () {
				const show = (filter === 'all' || this.dataset.type === filter) && (!query || this.dataset.search.includes(query))
				this.hidden = !show
				if (show) shown++
			})
			$(container).children('.agl-preset-group').each(function () {
				let next = this.nextElementSibling
				let any = false
				while (next && !next.classList.contains('agl-preset-group')) {
					if (!next.hidden) any = true
					next = next.nextElementSibling
				}
				this.hidden = !any
			})
			$('.agl-gallery-empty').prop('hidden', shown > 0)
		}
		$('.agl-chip').on('click', function () {
			filter = this.dataset.filter
			$('.agl-chip').removeClass('is-active').attr('aria-pressed', 'false')
			$(this).addClass('is-active').attr('aria-pressed', 'true')
			applyFilters()
		})
		$('#agl-gallery-search').on('input', applyFilters)

		// The class builder
		const builderSelect = document.getElementById('agl-cb-preset')
		builderPresets.forEach(function (item) {
			const option = document.createElement('option')
			option.value = item[0]
			option.textContent = item[1] + (item[2] === 'mine' ? '' : ' (' + (item[2] === 'css' ? 'CSS' : 'WebGL') + ')')
			builderSelect.appendChild(option)
		})
		builderSelect.value = presets.fadeCSSLeft ? 'fadeCSSLeft' : builderSelect.value
		const builderPreview = document.querySelector('.agl-class-builder-preview')

		// Without the delay and repeat for the preview, which plays it right away
		function builderClasses(forPreview) {
			const number = function (id) {
				const value = parseInt(document.getElementById(id).value, 10)
				return value >= 0 ? value : null
			}
			let classes = 'agl agl-' + builderSelect.value
			const easing = $('#agl-cb-easing').val()
			const duration = number('agl-cb-duration')
			const delay = number('agl-cb-delay')
			if (easing) classes += ' agl-in-easing-' + easing
			if (duration !== null) classes += ' agl-in-duration-' + duration
			if (forPreview) return classes
			if (delay) classes += ' agl-in-delay-' + delay
			if ($('#agl-cb-repeat').prop('checked')) classes += ' agl-in-repeat'
			return classes
		}

		function updateBuilder() {
			$('#agl-cb-classes').text(builderClasses())
			builderPreview.className = 'agl-class-builder-preview ' + builderClasses(true)
			if (builderPreview.plane) builderPreview.plane.animatedIn = false
		}
		$('.agl-class-builder').on('input change', 'select, input', updateBuilder)
		updateBuilder()

		// Editor tab
		const editorContainer = document.getElementById('aglEditor')
		const editorMessage = document.querySelector('.agl-editor-message')
		let editorOptions = null

		function say(text, isError) {
			editorMessage.textContent = text
			editorMessage.classList.toggle('is-error', !!isError)
		}

		$('.agl-editor-replay').on('click', function () {
			dispatchEvent(new Event('agl-animate'))
		})

		$('.agl-editor-save').on('click', function () {
			if (!editorOptions) return say(__('The editor is still loading. Try again in a moment.', 'animategl'), true)
			saveSettings(defaultSettings(editorOptions), this, function () {
				say(__('Saved. Blocks set to "Default" use this animation now.', 'animategl'))
			})
		})

		$('.agl-editor-reset').on('click', function () {
			if (!confirm(__('Go back to the original default animation? Your saved default is replaced.', 'animategl'))) return
			saveSettings({}, this, function () {
				window.location.reload()
			})
		})

		let editorGui = null
		window.addEventListener('agl-editor-init', function (e) {
			editorOptions = e.detail.options
			editor = e.detail.editor
			editorGui = e.detail.gui
			if (pendingPreset) loadPreset(pendingPreset)
			pendingPreset = null
		})

		window.addEventListener('agl-init', function () {
			if (editorContainer.childElementCount) return
			animateGLInstance.options.container = editorContainer
			animateGLInstance.options.in.name = ''
			new AGL.Editor(animateGLInstance.options)
		})

		function defaultSettings(options) {
			return {
				in: {
					duration: options.in.duration,
					delay: options.in.delay,
					easing: options.in.easing,
					type: options.in.type,
					fade: options.in.fade,
					translate: options.in.translate,
					rotate: options.in.rotate,
					scale: options.in.scale,
					corners: options.in.corners,
					clipPath: options.in.clipPath
				}
			}
		}

		function saveSettings(settings, button, onSaved) {
			button.disabled = true
			$.ajax({
				type: 'POST',
				url: agl_options[2],
				data: {
					json: JSON.stringify(settings),
					security: agl_localize_script[0],
					action: 'agl_json'
				},
				success: function (data) {
					button.disabled = false
					if (data && data.success) onSaved()
					else say(__('The settings weren\'t saved. Reload the page and try again.', 'animategl'), true)
				},
				error: function (xhr, textStatus, errorThrown) {
					button.disabled = false
					say(__('The settings weren\'t saved:', 'animategl') + ' ' + (errorThrown || textStatus), true)
				}
			})
		}
	})


})(jQuery)
