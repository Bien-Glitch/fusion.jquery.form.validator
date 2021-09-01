// Assign initialised validators to variables
let form = '#valid-form',
	form_validator = $(form).fusionFormValidator(form_group),
	form_v = $('#valid-form2').fusionFormValidator(form_group);

// Change padding for validation Icon in the second form
form_v.padding_config = {validInput$sm: 6};
form_validator.validation_config = {validateEmail: true};

// Call the 'validateForm()' method
form_v.validateForm();
form_validator.validateForm();

$(form).on('submit', function (e) {
	e.preventDefault();
	
	if (!$(this).hasErrors())
		$(this).off('submit').submit();
	else
		alert('Cannot submit form while there are errors!!!');
});

/*
console.log(ValidateForm.VERSION);
console.log(form.padding_multipliers);
console.log(form_v.padding_multipliers);*/
