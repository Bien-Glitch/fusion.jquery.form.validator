$.fn.extend({
	elements: function () {
		let _target = this[0];
		return ((_target.tagName.toLowerCase() !== 'form') ? console.error(`function 'elements()' expects 'form element' but '${_target.tagName.toLowerCase()} element' was given`) : _target.elements);
	}
});
