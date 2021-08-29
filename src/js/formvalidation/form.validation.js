let valid_right,
	padding_right,
	
	form_group = '.form-group',
	
	alert_d = 'alert-danger',
	alert_i = 'alert-info',
	alert_s = 'alert-success',
	
	fa_exc = 'fa-exclamation',
	fa_exc_c = 'fa-exclamation-circle',
	fa_check = 'fa-check',
	fa_check_c = 'fa-check-circle',
	fa_check_d = 'fa-check-double',
	fa_info = 'fa-info',
	fa_info_c = 'fa-info-circle',
	
	valid_icon = '<small class="position-absolute text-success valid validation-icon"><i class="fa far fa-1x fa-check"></i></small>',
	invalid_icon = '<small class="position-absolute text-danger invalid validation-icon"><i class="fa far fa-1x fa-exclamation-circle"></i></small>';

function eValidRemovePad(e) {
	$(e).css('padding-right', $(e).css('padding-left'));
}

function eValidAddPad(e) {
	if ($(e).attr('type') !== 'date') {
		$(e).css('padding-right', padding_right);
	}
}

jQuery.fn.clearValidation = function () {
	let form = this;
	$.each($(form).elements(), function () {
		let _tagName = $(this)[0].tagName.toLowerCase(),
			target_id = '#' + $(this).attr('id'),
			_form_group = $(this).parents('.form-group'),
			targetIsHidden = (($(this).prop('hidden')) || ($(this).attr('type') === 'hidden'));
		
		if ((_tagName === 'input' || _tagName === 'select' || _tagName === 'textarea') && !targetIsHidden)
			removeValidationText(target_id, _form_group);
	});
	/*$(form).message_tag().fadeOut();*/
	$('.alert', form).alert('close');
	return this;
}

function onAlertClose(target) {
	$('.alert').on('close.bs.alert', function () {
		let id = $(this).data('alert-id');
		removeValidationText(id, target);
	});
}

function removeValidationText(e, target, close = false) {
	if (close !== false)
		$(e + 'Valid > .alert', target).alert('close');
	
	$(e, target).removeClass('border-danger').removeClass('border-success');
	$('.form-group' + e + '_group .input-group > .validation-icon').fadeOut();
	eValidRemovePad(e);
}

function addValidText(e, target, icon = false, message = null) {
	if (icon !== false) {
		$('.form-group' + e + '_group .input-group > .invalid').fadeOut(0);
		$('.form-group' + e + '_group .input-group > .valid').css({right: valid_right, zIndex: 100}).fadeIn();
		eValidAddPad(e);
	} else
		eValidRemovePad(e)
	
	if (message === null)
		$(e + 'Valid').html(null);
	else
		displayMessage(alert_s, fa_check, message, e + 'Valid', e, target, true);
	$(e).removeClass('border-danger').addClass('border-success');
}

function addInvalidText(e, target, icon = false, message = null) {
	let _message = (message === null) ? 'This field is required' : message;
	if (icon !== false) {
		$('.form-group' + e + '_group .input-group > .valid').fadeOut(0);
		$('.form-group' + e + '_group .input-group > .invalid').css({right: valid_right, zIndex: 100}).fadeIn();
		eValidAddPad(e);
	} else
		eValidRemovePad(e);
	
	if (message === false)
		$(e + 'Valid').html(null)
	else
		displayMessage(alert_d, fa_exc_c, _message, e + 'Valid', e, target, true);
	$(e).removeClass('border-success').addClass('border-danger');
}

function displayErrors(form, elements, errors, message, message_tag) {
	Object.keys(elements).forEach((val) => {
		if (val in errors && errors[val] !== '')
			toggleValidation('#' + val, $('.form-group', form), errors[val], false, true);
	});
	if (typeof message === 'string' && message !== '')
		displayMessage(alert_d, fa_exc_c, message, message_tag, null, form, true);
}

function displayMessage(bs_alert, fa_icon, message, message_tag, id = null, context = null, dismiss = false, loading = false) {
	let _message_tag = (context !== null) ? $(message_tag, context) : $(message_tag),
		_bs_alert = (dismiss !== false) ? bs_alert + ' alert-dismissible' : bs_alert,
		_dismiss = (dismiss !== false) ? '<a type="button" class="text-danger" data-bs-dismiss="alert"><i class="fa fa-times-circle"></i></a>' : '',
		_loading = (loading !== false) ? '<br><i class="fa fa-1x fa-spin fa-spinner-third"></i> Please Wait...' : '';
	
	_message_tag.html('\
		<div class="alert ' + _bs_alert + ' d-flex justify-content-between align-items-center pr-0 p-1 mt-1 fade show" data-alert-id="' + id + '" role="alert">\n\
			<div class="px-1">\n\
				<i class="fa far fa-1x ' + fa_icon + '"></i>\n\
				<span>' + message + '</span>\n\
				' + _loading + '\n\
			</div>\n\
			' + _dismiss + '\n\
		</div>\
	');
}

function toggleValidation(e, target, message = null, pword = false, errors = false) {
	let _target = $(e),
		_type = (_target.attr('type') ?? '').toLowerCase(),
		_left_padding = $(e).css('padding-left'),
		_message = _target[0].tagName.toLowerCase() !== 'select' ? ($(e).val().length < $(e).attr('minlength') && message === null ? 'This field requires a minimum of ' + $(e).attr('minlength') + ' characters' : message) : message;
	
	if ((_type === 'date' || _type === 'datetime' || _type === 'datetime-local')) {
		if (_target.hasClass('form-control-sm'))
			valid_right = 'calc(' + _left_padding + ' * 3.8)';
		else
			valid_right = 'calc(' + _left_padding + ' * 3)';
	} else {
		if (_target[0].tagName.toLowerCase() === 'select') {
			if (_target.hasClass('form-control-sm') || _target.hasClass('form-select-sm')) {
				valid_right = 'calc(' + _left_padding + ' * 3.8)';
				padding_right = 'calc(' + _left_padding + ' * 5.8)';
			} else {
				valid_right = 'calc(' + _left_padding + ' * 3)';
				padding_right = 'calc(' + _left_padding + ' * 4)';
			}
		} else {
			if (_target.hasClass('form-control-sm')) {
				valid_right = 'calc(' + _left_padding + ' * 3 / 2)';
				padding_right = 'calc(' + _left_padding + ' * 3.5)';
			} else {
				valid_right = 'calc(' + _left_padding + ' * 0.9)';
				padding_right = 'calc(' + _left_padding + ' * 2.5)';
			}
		}
	}
	
	if (($(_target[0].tagName.toLowerCase() !== 'select' ? e : e + ' > option:selected').val().length < 1) || ($(e).val().length < $(e).attr('minlength')) || pword === true || errors === true)
		addInvalidText(e, target, true, _message);
	else
		addValidText(e, target, true);
	onAlertClose(target);
}

function validateForm() {
	$(form_group).each(function () {
		let currentTarget = this,
			form = $(currentTarget).parents('form'),
			target_id = '#' + $('input, textarea, select', this).attr('id'),
			target = $(target_id),
			target_validate = $(target_id).data('is-validated'),
			pword_validate = $(form).hasClass('validate-password');
		
		$('.input-group', currentTarget).append(valid_icon);
		$('.input-group', currentTarget).append(invalid_icon);
		$(currentTarget).attr('id', $(target).attr('id') + '_group');
		
		$('input, textarea', currentTarget).on({
			input: function () {
				let pword_id = '#password',
					pword = $(pword_id),
					pword_confirm_id = '#password_confirmation',
					pword_confirm = $(pword_confirm_id);
				
				if (target.attr('type') !== 'date')
					if (((target_id !== pword_id && target_id !== pword_confirm_id) && target_validate !== 'no') || (target_id === pword_id && !pword_validate))
						toggleValidation(target_id, currentTarget);
					else if (pword_validate) {
						if (target_id === pword_id) {
							if (target.val().length < target.attr('minlength') || target.val().length > target.attr('maxlength')) {
								toggleValidation(pword_confirm_id, pword_confirm.parents('.form-group'), false, true)
								toggleValidation(target_id, currentTarget, 'password must be between ' + target.attr('minlength') + ' to ' + target.attr('maxlength') + ' characters');
							} else {
								if (((target.val().length > 0) && (pword_confirm.val().length > 0)) && (target.val() !== pword_confirm.val())) {
									toggleValidation(target_id, currentTarget, 'Passwords do not match', true);
									toggleValidation(pword_confirm_id, pword_confirm.parents('.form-group'), false, true);
								} else if (target.val() === pword_confirm.val() && pword_confirm.val()) {
									toggleValidation(target_id, currentTarget);
									toggleValidation(pword_confirm_id, pword_confirm.parents('.form-group'));
								} else
									toggleValidation(target_id, currentTarget);
							}
						} else if (target_id === pword_confirm_id) {
							if (pword.val().length < 1)
								toggleValidation(target_id, currentTarget, 'Password field is empty!', true);
							else if (pword.val().length < pword.attr('minlength') || pword.val().length > pword.attr('maxlength')) {
								toggleValidation(target_id, currentTarget, false, true);
								toggleValidation(pword_id, pword.parents('.form-group'), 'password must be between ' + pword.attr('minlength') + ' to ' + pword.attr('maxlength') + ' characters');
							} else {
								if (target.val().length < 1)
									toggleValidation(target_id, currentTarget);
								else if (target.val() !== pword.val()) {
									toggleValidation(target_id, currentTarget, false, true);
									toggleValidation(pword_id, pword.parents('.form-group'), 'Passwords do not match', true);
								} else {
									toggleValidation(target_id, currentTarget);
									toggleValidation(pword_id, pword.parents('.form-group'));
								}
							}
						}
					} else {
						if (target_validate !== 'no')
							toggleValidation(target_id, currentTarget);
					}
			},
			keyup: function () {
				let type = $(this).attr('type');
				
				if ((type === 'date' || type === 'datetime' || type === 'datetime-local') && (target_validate !== 'no'))
					toggleValidation(target_id, currentTarget);
			}
		});
		
		$('select', currentTarget).on('change', function () {
			toggleValidation(target_id, currentTarget);
		});
	});
}
