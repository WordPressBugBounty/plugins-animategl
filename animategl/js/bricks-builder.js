/*
 * AnimateGL in the Bricks builder's canvas (the iframe inside the builder; includes/bricks.php enqueues it there).
 *
 * Bricks draws its elements on the canvas with its own Vue templates, which don't run the
 * bricks/element/set_root_attributes filter that puts AnimateGL's classes on them on the page. So this reads each
 * element's AnimateGL settings from the canvas's state (the Vue app on .brx-body: config.globalProperties.$_state,
 * with $_watch to follow it), asks the server for the classes and attributes they make (the agl_bricks_classes AJAX
 * action, the same code as on the page) and puts them on the element (its brxe-<id> class). The runtime sees the class
 * change and plays the animation, so an entrance replays as its settings are changed. Classes Bricks' re-render takes
 * off are put back.
 */
(function () {
	'use strict';

	const config = window.aglBricks;
	if (!config || window.top === window.self) return;

	const keys = new Set(config.keys || []);
	const applied = new Map(); // element id → { classes: [], attributes: {} } from the server
	const sent = new Map(); // element id → the JSON of its settings last sent
	const latest = new Map(); // element id → the number of the last request that sent it
	let requests = 0;
	let state = null;

	function findState() {
		const root = document.querySelector('.brx-body');
		const app = root && root.__vue_app__;
		const props = app && app.config && app.config.globalProperties;
		return props && props.$_state ? props : null;
	}

	// Every element on the canvas: the page, its header and footer, and the elements of its components
	function elements() {
		const list = [];
		['content', 'header', 'footer'].forEach((area) => Array.isArray(state.$_state[area]) && list.push(...state.$_state[area]));
		const components = state.$_state.components;
		if (Array.isArray(components)) components.forEach((c) => c && Array.isArray(c.elements) && list.push(...c.elements));
		return list;
	}

	// An element's AnimateGL settings, as Bricks saves them
	function ownSettings(element) {
		const settings = (element && element.settings) || {};
		const own = {};
		Object.keys(settings).forEach((key) => {
			if (keys.has(key)) own[key] = settings[key];
		});
		return own;
	}

	function snapshot() {
		const out = {};
		elements().forEach((element) => {
			if (!element || !element.id) return;
			const own = ownSettings(element);
			if (Object.keys(own).length || applied.has(element.id)) out[element.id] = { name: element.name, settings: own };
		});
		return JSON.stringify(out);
	}

	function sync(json) {
		const all = JSON.parse(json);
		const changed = [];
		Object.keys(all).forEach((id) => {
			const settings = JSON.stringify(all[id].settings);
			if (sent.get(id) === settings) return;
			sent.set(id, settings);
			changed.push({ id: id, name: all[id].name, settings: all[id].settings });
		});
		// Removed elements
		Array.from(applied.keys()).forEach((id) => {
			if (!(id in all)) {
				apply(id, { classes: [], attributes: {} });
				applied.delete(id);
				sent.delete(id);
			}
		});
		if (!changed.length) return;
		const request = ++requests;
		changed.forEach((item) => latest.set(item.id, request));
		// Not answered: sent again with the next change to the canvas
		const failed = () => changed.forEach((item) => latest.get(item.id) === request && sent.delete(item.id));
		const body = new FormData();
		body.append('action', 'agl_bricks_classes');
		body.append('nonce', config.nonce);
		body.append('elements', JSON.stringify(changed));
		fetch(config.ajax, { method: 'POST', body: body, credentials: 'same-origin' })
			.then((response) => response.json())
			.then((answer) => {
				if (!answer || !answer.success) return failed();
				// An answer to an older request than the element's last one is out of date
				Object.keys(answer.data || {}).forEach((id) => latest.get(id) === request && apply(id, answer.data[id]));
				// The runtime replays an entrance when its classes change, but looks for the rest (count-up, the typewriter,
				// hover and scroll effects, an element without an entrance) only on agl-init
				window.dispatchEvent(new Event('agl-init'));
			})
			.catch((error) => {
				failed();
				console.warn('AnimateGL: the Bricks canvas could not get its animation classes', error);
			});
	}

	// Style custom properties (Pro's backgrounds) one by one, so Bricks' own inline style stays
	function styleParts(value) {
		const parts = {};
		String(value || '')
			.split(';')
			.forEach((part) => {
				const i = part.indexOf(':');
				if (i > 0) parts[part.slice(0, i).trim()] = part.slice(i + 1).trim();
			});
		return parts;
	}

	function put(node, entry, previous) {
		previous.classes.forEach((c) => entry.classes.indexOf(c) < 0 && node.classList.remove(c));
		const missing = entry.classes.filter((c) => !node.classList.contains(c));
		if (missing.length) node.classList.add(...missing);
		Object.keys(previous.attributes).forEach((name) => {
			if (name in entry.attributes) return;
			if (name === 'style') Object.keys(styleParts(previous.attributes.style)).forEach((p) => node.style.removeProperty(p));
			else node.removeAttribute(name);
		});
		Object.keys(entry.attributes).forEach((name) => {
			const value = entry.attributes[name];
			if (name === 'style') {
				const parts = styleParts(value);
				Object.keys(parts).forEach((p) => node.style.getPropertyValue(p) !== parts[p] && node.style.setProperty(p, parts[p]));
			} else if (/^data-agl[a-z0-9-]*$/.test(name) && node.getAttribute(name) !== String(value)) {
				node.setAttribute(name, value);
			}
		});
	}

	function nodes(id) {
		return /^[a-z0-9]+$/i.test(id) ? document.querySelectorAll('.brxe-' + id) : [];
	}

	function apply(id, entry) {
		const next = { classes: Array.isArray(entry.classes) ? entry.classes : [], attributes: entry.attributes || {} };
		const previous = applied.get(id) || { classes: [], attributes: {} };
		applied.set(id, next);
		nodes(id).forEach((node) => put(node, next, previous));
	}

	// Bricks' re-render of an element (or a new copy of it) can drop the classes: put them back
	let pending = false;
	function restore() {
		pending = false;
		applied.forEach((entry, id) => {
			if (!entry.classes.length && !Object.keys(entry.attributes).length) return;
			nodes(id).forEach((node) => put(node, entry, entry));
		});
	}

	function start() {
		snapshotWatch();
		new MutationObserver(() => {
			if (!pending) {
				pending = true;
				requestAnimationFrame(restore);
			}
		}).observe(document.body, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
	}

	let timer = 0;
	function snapshotWatch() {
		sync(snapshot());
		const schedule = (json) => {
			clearTimeout(timer);
			timer = setTimeout(() => sync(json), 150);
		};
		if (typeof state.$_watch === 'function') state.$_watch(snapshot, schedule);
		else setInterval(() => schedule(snapshot()), 500);
	}

	// The canvas's Vue app is mounted after this script runs
	let tries = 0;
	(function wait() {
		state = findState();
		if (state) return start();
		if (++tries < 150) setTimeout(wait, 200);
	})();
})();
