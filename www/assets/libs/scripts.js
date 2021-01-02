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
	// var filename = 'https://fadilxcoder.github.io/jwt-mobile-app/assets/keys/public.pem';
	var filename = 'https://gist.githubusercontent.com/fadilxcoder/d7106c55f60df00bf5a0088777911fd5/raw/a0a94c08fee2b848b2714aa5e8741ec819edfc46/jwt.pem';

    fetch(filename)
    .then((resp) => resp.text())
    .then(function(data) {
		localStorage.setItem('PUBLIC_KEY', data);
		var main = new Main();
    });
}