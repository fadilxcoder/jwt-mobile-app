/**
 * Entry point
 */

import * as MyScript from '../Components/Script.js';
import Main from "../Components/Main.js";

$(document).ready( function() {
	init();
	var $input = MyScript.randomStringGenerator;
	$('#input-value').val($input);
});


function init()
{
	var filename = '../keys/public.pem';

    fetch(filename)
    .then((resp) => resp.text())
    .then(function(data) {
		localStorage.setItem('PUBLIC_KEY', data);
		var main = new Main();
    });
}