# Fusion Form Validator JS (*fusion.form.validator.js*)
> Front-end form validation (Based on jQuery 3.x, Bootstrap 5.x and Font Awesome 6.x)

---

## Installation
[jQuery](https://github.com/jquery/jquery/releases/latest) 3.x, [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/download/) 5.x, and [Fontawesome]() 6.x are required.

No worries, the above requirements are shipped along with the Fusion Form Validator package.\
To get the latest version of Fusion Form Validator, simply head over to [Github](https://github.com/Bien-Glitch/jquery.form.validation/releases/latest) and download the assets.

Once Fusion Form Validator has been downloaded, copy the files/folders in the src folder to wherever you like in the root of your Web-Project.

E.g. Assuming it was copied and split into the assets, css, and js folders; the structure should be something like this:

```
.\Project-root
+-- \assets
|   +-- \bfh
|   |   +-- \css
|   |   +-- \img
|   |   +-- \js
|   +-- \fontawesome*
|   |   +-- \css
|   |   +-- \js
|   |   +-- \webfonts
|   |...
+-- \css
|   +-- \bootstrap*
|   +-- \fb-formvalidator
|   |   +-- fusion.form.validator.css*
|   |...
+-- \js
|   +-- \fb-formvalidator
|   |   +-- fusion.form.validator.js*
|   |   +-- init.js*
|   +-- \popper*
|   +-- \jquery*
|   |...
+-- index.html
|...
```

\
Now all you have to do is link the necessary files to your html document like this:

```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Fusion Form Validator Example</title>
	
	<!-- [Stylesheets] -->
	<!-- Bootstrap -->
	<link rel="stylesheet" href="./src/css/bootstrap/bootstrap.css">
	
	<!-- BFH -->
	<!--<link rel="stylesheet" href="./src/assets/bfh/css/bootstrap-formhelpers.min.css">-->
	
	<!-- Fontawesome -->
	<link rel="stylesheet" href="./src/assets/fontawesome/css/all.css">
	
	<!-- FB-Formvalidator -->
	<link rel="stylesheet" href="./src/css/fb-formvalidator/fusion.form.validator.css">
</head>
<body>
	<!-- Your content goes here -->
</body>

<!-- jQuery (core) -->
<script src="./src/js/jquery/jquery.js"></script>

<!-- Popper -->
<script src="./src/js/popper/popper.js"></script>

<!-- Bootstrap -->
<script src="./src/js/bootstrap/bootstrap.js"></script>

<!-- BFH -->
<!--<script src="./src/assets/bfh/js/bootstrap-formhelpers.min.js"></script>-->

<!-- FB-Formvalidator -->
<script src="./src/js/fb-formvalidator/fusion.form.validator.js"></script>
<script src="./src/js/fb-formvalidator/init.js"></script>
</html>
```

> **Note: To avoid errors;**
> - The `fusion.form.validator.css` must come after *bootstrap*, *bootstrap-formhelpers (optional)*, and *fontawesome*.
> - The same goes for the `fusion.for.validator.js`, it must come after *jQuery*, *bootstrap*, and *bootstrap-formhelpers (optional)*.

## Usage
*Firstly, ensure the stylesheets and scripts are linked in the correct hierarchy as the example above. If you have problems getting it correctly, just copy the code in the example above and edit.*

Out of the box, Fusion Form Validator ships with `init.js` file, so you can initialize, configure, and use the fusion form validator without messing up your other JS files codes.\

The Validator has already been initialized in `init.js` for all forms; with default configuration out of the box

```javascript
console.log(ValidateForm.VERSION);
console.log(window.fusion.default_validator_config);

$('form').fusionFormValidator(form_group).validateForm();
```

Explanation of above code:
> The first line of code - `console.log(ValidateForm.VERSION);` logs the version of the Fusion Form Validator in the browser console.
>
> The second line of code - `console.log(window.fusion.default_validator_config);` logs the default configuration of the Fusion Form Validator in the browser console as an object.
>
> The last line of code - `$('form').fusionFormValidator(form_group).validateForm();` initializes the validator for every form element in the current document. The `validateForm()` is the method that calls the validation on the initialized validator.

For coding in pure VanillaJS, the last line of the above code can be put the following way:

```javascript
document.querySelectorAll('form').forEach((form) => {
	new ValidateForm(form_group, form).validateForm();
});
```

Note that the arrow function `=>` used above only works in [ES6+](https://www.w3schools.com/js/js_es6.asp#mark_arrow)\
You'll have to use the function keyword for older versions:

```javascript
document.querySelectorAll('form').forEach(function (form) {
	new ValidateForm(form_group, form).validateForm();
});
```

If you want to initialize it for a single form, initialize it with the forms `id`. Assuming we have a form:

```html

<form action="" id="form-validate">
	...
</form>
```

You'd initialize it like this:

```javascript
// Using jQuery
$('#form-validate').fusionFormValidator(form_group).validateForm();

// or...

// Using Pure VanillaJS
new ValidateForm(form_group, document.getElementById('form-validate')).validateForm();
```

## Configuration
By default, some configuration options are turned off; like `email validation`, `phone number validation` e.t.c. These options can be set.

> **Note:** When the configuration options is customized, it is set per instance and not generally (globally).

Default configuration options object:

```javascript
// To log the default config into your browser use:
console.log(window.fusion.default_validator_config);
```

**The configuration options include:**

- Padding Multipliers - `validation_config`.
- RegExp (Regular Expression) - `regExp_congig` - for formatting
	- E-Mail Address - `email`
	- Phone number - `phone`
- Validation options for - `Validation config`:
	- Native HTML Validation - `nativeValidation`
	- E-Mail Address - `validateEmail`
	- Phone Number - `validatePhone`
	- Password - `validatePassword`
	- Password field id - `passwordId`
	- Confirm password field id - `passwordConfirmId`
- Changing the default fontawesome icons used in the validation:
	- exclamation - `invalid`
	- check - `valid`

Some helper methods are available for easier configuration options setting. They are:
`padding_config`, `regExp_config`, `validation_config`, `validation_icons`

In order to set the configuration options, initialize the validator without the `validateForm()` method and assign it to a variable. E.g.

```javascript
let valid_form = $('#valid-form').fusionFormValidator(form_group);
```

---
## About
Fusion form validator is an easy-to-use JS plugin for front-end form validation which requires little or no knowledge of JavaScript. Read through this documentation on how to set it up, and you're ready. It's fun to use and hassle-free.\
Created by Bien Nwinate a.k.a. Bien-Glitch. - Founder, Fusion Bolt Inc.

## Security Vulnerabilities
If you discover a security vulnerability within Fusion Form Validator, please send an e-mail to Bien Nwinate via [fusionboltinc@gmail.com](mailto:fusionboltinc@gmail.com). All security vulnerabilities will be promptly addressed.
