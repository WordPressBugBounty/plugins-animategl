'use-strict';

(function ($) {

	// Slider settings can be null (Elementor 3.26+): fall back to the control's default
	function sliderSize(setting, fallback) {
		return setting && setting.size !== undefined && setting.size !== '' ? setting.size : fallback
	}

	$(window).on('elementor/frontend/init', function () {

		const ModuleHandler = elementorModules.frontend.handlers.Base

		const AGLHandler = ModuleHandler.extend({

			onInit: function () {

				ModuleHandler.prototype.onInit.apply(this, arguments);

				const agl_in_name = this.getElementSettings('agl_in_name')

				if (elementorFrontend.isEditMode() && agl_in_name) {
					const direction = this.getElementSettings('agl_in_direction')
					const duration = sliderSize(this.getElementSettings('agl_in_duration'), 1000)
					const delay = sliderSize(this.getElementSettings('agl_in_delay'), 0)
					const distance = sliderSize(this.getElementSettings('agl_in_distance'), 1)
					const classes = agl_in_name == 'custom' ? 'agl' : `agl agl-${agl_in_name}${direction}`
					this.$element.addClass(classes)
					this.$element.addClass(`agl-in-duration-${duration}`)
					this.$element.addClass(`agl-in-delay-${delay}`)
					this.$element.addClass(`agl-in-distance-${distance}`)
					const easing = this.getElementSettings('agl_in_easing')
					if (easing)
						this.$element.addClass(`agl-in-easing-${easing}`)
					const repeat = this.getElementSettings('agl_in_repeat')
					if (repeat == 'yes')
						this.$element.addClass(`agl-in-repeat`)
					const lockToScrollbar = this.getElementSettings('agl_in_lockToScrollbar')
					if (lockToScrollbar == 'yes')
						this.$element.addClass(`agl-in-lockToScrollbar`)
				}

			},

			onElementChange: function (changedProp) {

				if (!changedProp.startsWith('agl')) return

				// agl property changed

				// remove all agl classes

				const element = this.$element[0]
				const classes = element.classList;
				let className = element.className
				for (let i = 0; i < classes.length; i++) {
					if (classes[i].startsWith('agl')) {
						className = className.replace(classes[i], '')
					}
				}

				const settings = this.getElementSettings()
				const agl_in_name = settings['agl_in_name']


				// add agl classes if entrance animation is selected
				if (agl_in_name) {
					const direction = settings['agl_in_direction']
					const duration = sliderSize(settings['agl_in_duration'], 1000)
					const delay = sliderSize(settings['agl_in_delay'], 0)
					const distance = sliderSize(settings['agl_in_distance'], 1)
					const easing = settings['agl_in_easing']
					const repeat = settings['agl_in_repeat'] == 'yes'
					const lockToScrollbar = settings['agl_in_lockToScrollbar'] == 'yes'
					const classes = agl_in_name == 'custom' ? ' agl' : ` agl agl-${agl_in_name}${direction}`
					let newClasses = `${classes} agl-in-duration-${duration} agl-in-delay-${delay} agl-in-distance-${distance}`
					if (easing)
						newClasses += ` agl-in-easing-${easing}`
					if (repeat)
						newClasses += ` agl-in-repeat`;
					if (lockToScrollbar)
						newClasses += ` agl-in-lockToScrollbar`;

					element.className = className + newClasses;
				}

			},

		});

		elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope) {
			elementorFrontend.elementsHandler.addHandler(AGLHandler, { $element: $scope });
		});

	});

})(jQuery)