/**
 * Entry point
 */

import * as MyScript from '../Components/Script.js';
import Main from "../Components/Main.js";

$(document).ready( function() {
	init();

	// JS Functions
	MyScript.initConsole();
	var $input = MyScript.randomStringGenerator;
	$('#input-value').val($input);
});


function init()
{
	var filename = 'https://fadilxcoder.github.io/jwt-mobile-app/assets/keys/public.pem';

    fetch(filename)
    .then((resp) => resp.text())
    .then(function(data) {
		console.log(data);
		localStorage.setItem('PUBLIC_KEY', data);

		// JS Class
		var main = new Main();
		main.console();

    });
}