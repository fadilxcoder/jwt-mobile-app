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
	var filename = 'assets/keys/public.pub';

    fetch(filename)
    .then((resp) => resp.text())
    .then(function(data) {
		localStorage.setItem('PUBLIC_KEY', data);

		// JS Class
		var main = new Main();
		main.console();

    });
}