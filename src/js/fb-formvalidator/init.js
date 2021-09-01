// Assign initialised validators to variables
let form = $('#valid-form').fusionFormValidator(form_group),
	form_v = $('#valid-form2').fusionFormValidator(form_group);

// Change padding for validation Icon in the second form
form_v.padding_config = {validInput$sm: 6};

// Call the 'validateForm()' method
form.validateForm();
form_v.validateForm();


console.log(ValidateForm.VERSION);
console.log(form.padding_multipliers);
console.log(form_v.padding_multipliers);