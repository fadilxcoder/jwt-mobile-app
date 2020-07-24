/**
 * Entry point
 */

import * as MyScript from './Components/Script.js';
import Account from "./Components/Account.js";


$(document).ready( function() {

	MyScript.initConsole();
	var account = new Account();
});