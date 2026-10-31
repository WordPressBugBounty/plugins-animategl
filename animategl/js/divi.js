'use strict';

// Divi 5's Visual Builder: the AnimateGL group in every module's Advanced tab and its fields, as includes/divi.php
// describes them (window.aglDivi, printed before this file). A field with an aglCondition is shown while the
// condition holds, as in Elementor's panel.
(function () {
	const data = window.aglDivi;
	const hooks = window.vendor && window.vendor.wp && window.vendor.wp.hooks;
	if (!data || !hooks) return;

	const ATTRIBUTE = 'animategl';

	// The module's name without its namespace (divi/text is text)
	const elementName = (moduleName) => String(moduleName || '').split('/').pop();

	const attributeFor = (moduleName) => data.attributes[elementName(moduleName)] || data.attributes[''];

	// The saved values, with the defaults for the ones not saved
	const values = (attrs, attribute) => {
		const saved = (attrs && attrs[ATTRIBUTE] && attrs[ATTRIBUTE].innerContent && attrs[ATTRIBUTE].innerContent.desktop && attrs[ATTRIBUTE].innerContent.desktop.value) || {};
		return Object.assign({}, attribute.default.innerContent.desktop.value, saved);
	};

	// array('agl_in_name!' => '', 'agl_trigger' => array(...)): every setting is (or with ! isn't) the value, or one of them
	const holds = (condition, settings) =>
		Object.keys(condition).every((key) => {
			const not = key.slice(-1) === '!';
			const value = settings[not ? key.slice(0, -1) : key];
			const wanted = [].concat(condition[key]).map(String);
			const is = wanted.includes(value === undefined || value === null ? '' : String(value));
			return not ? !is : is;
		});

	const withVisibility = (attribute) => {
		const copy = JSON.parse(JSON.stringify(attribute));
		const items = copy.settings.innerContent.items;
		Object.keys(items).forEach((name) => {
			const condition = items[name].aglCondition;
			delete items[name].aglCondition;
			if (condition) {
				items[name].visible = (args) => holds(condition, values(args && args.attrs, attribute));
			}
		});
		return copy;
	};

	// Divi's own modules: the server declares the attribute only for them (block_type_metadata_settings), so a
	// setting on another module would be dropped on the page
	const isDivi = (metadata) => /^divi\//.test(String((metadata && metadata.name) || ''));

	hooks.addFilter('divi.moduleLibrary.moduleSettings.groups', 'animategl', (groups, metadata) => {
		if (groups && !groups[ATTRIBUTE] && isDivi(metadata)) groups[ATTRIBUTE] = Object.assign({}, data.group);
		return groups;
	});

	hooks.addFilter('divi.moduleLibrary.moduleAttributes', 'animategl', (attributes, metadata) => {
		if (attributes && !attributes[ATTRIBUTE] && isDivi(metadata)) attributes[ATTRIBUTE] = withVisibility(attributeFor(metadata.name));
		return attributes;
	});
})();
