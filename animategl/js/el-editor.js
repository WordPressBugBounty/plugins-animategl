'use-strict';

window.addEventListener('load', function () {

	const panel = document.getElementById('elementor-panel')
	if (!panel || typeof elementor === 'undefined') return

	// The presets come from the runtime in the preview iframe, which may still be loading
	function getEntrancePresets() {
		const previewIframe = document.getElementById("elementor-preview-iframe");
		const agl = (previewIframe && previewIframe.contentWindow && previewIframe.contentWindow.agl) || window.agl
		return agl && agl.defaults && agl.defaults.in ? agl.defaults.in : null
	}

	const settings = {}
	let currentModel
	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if (mutation.addedNodes.length) {
				const aglNameDowpdown = panel.querySelector('select[data-setting="agl_in_name"]')
				const aglDirectionDowpdown = panel.querySelector('select[data-setting="agl_in_direction"]')
				const entrance = getEntrancePresets()
				if (aglNameDowpdown && !aglNameDowpdown.dataset.init && entrance) {
					const presets = entrance.presets
					const entranceNames = entrance.names
					aglNameDowpdown.dataset.init = 'true'
					aglNameDowpdown.innerHTML = ''

					const optionNone = document.createElement("option");
					optionNone.value = '';
					optionNone.text = 'None';
					aglNameDowpdown.appendChild(optionNone);

					const optionCustom = document.createElement("option");
					optionCustom.value = 'custom';
					optionCustom.text = 'Default';
					aglNameDowpdown.appendChild(optionCustom);
					
					const groupCSS = document.createElement("optgroup");
					aglNameDowpdown.appendChild(groupCSS);
					groupCSS.label = 'CSS'

					const groupWebGL = document.createElement("optgroup");
					aglNameDowpdown.appendChild(groupWebGL);
					groupWebGL.label = 'WebGL'

					// Entries added by others (the custom animations of AnimateGL Pro) say their type and that
					// they're custom; the built-in ones have CSS in their name
					let groupCustom
					entranceNames.forEach(function (obj) {
						const newOption = document.createElement("option");
						const isCSS = obj.type ? obj.type === 'css' : obj.name.includes('CSS')
						newOption.value = obj.name;
						newOption.text = obj.title;
						if (obj.custom) {
							if (!groupCustom) {
								groupCustom = document.createElement("optgroup");
								groupCustom.label = 'My animations'
								aglNameDowpdown.appendChild(groupCustom);
							}
							newOption.text = obj.title + (isCSS ? ' (CSS)' : ' (WebGL)');
							groupCustom.appendChild(newOption)
						} else if (isCSS)
							groupCSS.appendChild(newOption)
						else
							groupWebGL.appendChild(newOption)
					})

					aglNameDowpdown.addEventListener('change', function () {
						// reset direction when agl_name changes
						currentModel.setSetting("agl_in_direction", '')
						settings["agl_in_direction"] = ''

						// reset distance
						settings["agl_in_distance"] = Object.assign({ unit: 'ms' }, settings["agl_in_distance"], { size: 1 })
						currentModel.setSetting("agl_in_distance", settings["agl_in_distance"])

						initDirections(this.value)
					})

					aglNameDowpdown.value = settings['agl_in_name']
					initDirections(aglNameDowpdown.value)

					function initDirections(name) {
						aglDirectionDowpdown.innerHTML = ''
						const directions = []
						// A custom animation is one preset, with no directions
						const custom = entranceNames.some(function (obj) { return obj.name === name && obj.custom })
						for (let presetName in presets) {
							const isCustom = entranceNames.some(function (obj) { return obj.name === presetName && obj.custom })
							if (custom ? presetName === name : presetName.includes(name) && !isCustom) {
								const direction = presetName.replace(name, '')
								if(!direction.includes('CSS')){
									directions.push(direction)
									const newOption = document.createElement("option");
									newOption.value = direction;
									newOption.text = direction || 'Default';
									aglDirectionDowpdown.appendChild(newOption);
								}
							}
						}
						if(directions.length){
							let currentDirection = settings['agl_in_direction'] || ''
							if (!presets.hasOwnProperty(name + currentDirection)){
								currentDirection = directions[0]
								currentModel.setSetting("agl_in_direction", currentDirection)
								settings["agl_in_direction"] = currentDirection
							}
							aglDirectionDowpdown.value = currentDirection
						}
					}

				}
			}
		});
	});
	observer.observe(panel, { childList: true, subtree: true });

	elementor.hooks.addAction('panel/open_editor/widget', onEditoPanelOpen);
	elementor.hooks.addAction('panel/open_editor/section', onEditoPanelOpen);
	elementor.hooks.addAction('panel/open_editor/column', onEditoPanelOpen);
	elementor.hooks.addAction('panel/open_editor/container', onEditoPanelOpen);

	function onEditoPanelOpen(panel, model, view) {
		currentModel = model
		settings["agl_in_name"] = model.getSetting("agl_in_name")
		settings["agl_in_direction"] = model.getSetting("agl_in_direction")
		settings["agl_in_distance"] = model.getSetting("agl_in_distance")
	}
})