/*console.log(ValidateForm.VERSION);
console.log(window.fusion.default_validator_config);*/

/*$('form').fusionFormValidator(form_group).validateForm();*/
/*document.querySelectorAll('form').forEach((val) => {
	new ValidateForm(form_group, val).validateForm();
});*/

new ValidateForm(form_group, document.getElementById('valid-form')).validateForm();
console.log(window.fusion.default_validator_config)