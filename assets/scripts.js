/**
 * Entry point
 */

import * as MyScript from './Components/Script.js';
import Main from "./Components/Main.js";


$(document).ready( function() {

	MyScript.initConsole();

	var main = new Main();
	main.console();
});