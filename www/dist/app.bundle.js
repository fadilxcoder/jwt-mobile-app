/*! For license information please see app.bundle.js.LICENSE.txt */
(()=>{var e={6808:(e,t,n)=>{var r,o,i;void 0===(o="function"==typeof(r=i=function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function n(r){function o(){}function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},o.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var a=JSON.stringify(n);/^[\{\[]/.test(a)&&(n=a)}catch(e){}n=r.write?r.write(n,t):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var u="";for(var c in i)i[c]&&(u+="; "+c,!0!==i[c]&&(u+="="+i[c].split(";")[0]));return document.cookie=t+"="+n+u}}function a(e,n){if("undefined"!=typeof document){for(var o={},i=document.cookie?document.cookie.split("; "):[],a=0;a<i.length;a++){var u=i[a].split("="),c=u.slice(1).join("=");n||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var f=t(u[0]);if(c=(r.read||r)(c,f)||t(c),n)try{c=JSON.parse(c)}catch(e){}if(o[f]=c,e===f)break}catch(e){}}return e?o[e]:o}}return o.set=i,o.get=function(e){return a(e,!1)},o.getJSON=function(e){return a(e,!0)},o.remove=function(t,n){i(t,"",e(n,{expires:-1}))},o.defaults={},o.withConverter=n,o}((function(){}))})?r.call(t,n,t,e):r)||(e.exports=o),e.exports=i()}},t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}var t=n(6808),r=n.n(t);function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"url","http://localhost/ci-jwt-api/"),i(this,"url","https://gfx-jwt-api.herokuapp.com/"),i(this,"routes",{BASE:"index",GET_TOKEN:"get-token",VERIFY_TOKEN:"verify-token"}),i(this,"target",$("#api")),i(this,"input",$("#data")),this.init(),this.verifyKey(),this.getToken(),this.verifyToken()}var t,n;return t=e,(n=[{key:"init",value:function(){var e=this,t=e._authorizationRequestRoute();$.ajax({url:t,type:"POST",cache:!1,data:{PUBLIC_KEY:localStorage.getItem("PUBLIC_KEY")},dataType:"json",beforeSend:function(){e.target.prepend('<div class="loader"></div>')}}).done((function(t,n,o){e.target.find(".loader").remove(),e.target.find("#api-response").html("<code>"+JSON.stringify(t)+"</code>"),r().set("AUTHORIZATION_GRANT",t.AUTHORIZATION_GRANT)})).fail((function(t,n,r){e.target.find(".loader").remove(),e.target.find("#api-response").html("<code>"+JSON.stringify(r)+"</code>")}))}},{key:"verifyKey",value:function(){var e=this;$(document).on("click","#VERIFY_KEY",(function(t){t.preventDefault(),e.init()}))}},{key:"getToken",value:function(){var e=this;$(document).on("click","#GET_TOKEN",(function(t){t.preventDefault();var n=e._route(this);$.ajax({url:n,type:"POST",cache:!1,data:{var:$("#input-value").val(),AUTHORIZATION_GRANT:r().get("AUTHORIZATION_GRANT")},dataType:"json",beforeSend:function(){e.target.prepend('<div class="loader"></div>')}}).done((function(t,n,o){e.target.find(".loader").remove(),e.target.find("#api-response").html("<code>"+JSON.stringify(t)+"</code>"),r().set("jwt-value",t.Token)})).fail((function(t,n,r){e.target.find(".loader").remove(),e.target.find("#api-response").html("<code>"+JSON.stringify(r)+"</code>")}))}))}},{key:"verifyToken",value:function(){var e=this;$(document).on("click","#VERIFY_TOKEN",(function(t){t.preventDefault();var n=e._route(this);$.ajax({url:n,type:"POST",cache:!1,dataType:"json",data:{AUTHORIZATION_GRANT:r().get("AUTHORIZATION_GRANT")},beforeSend:function(){e.target.prepend('<div class="loader"></div>')},headers:{Authorization:"Bearer "+r().get("jwt-value")}}).done((function(t,n,r){e.target.find(".loader").remove(),e.target.find("#api-response").html("<code>"+JSON.stringify(t)+"</code>")})).fail((function(t,n,r){e.target.find(".loader").remove(),e.target.find("#api-response").html("<code>"+JSON.stringify(r)+"</code>")}))}))}},{key:"_route",value:function(e){var t=this,n=$(e).attr("id");if(n in t.routes)return t.url+t.routes[n];alert("Route does not exist !")}},{key:"_authorizationRequestRoute",value:function(){return this.url+this.routes.BASE}}])&&o(t.prototype,n),e}();$(document).ready((function(){fetch("./assets/keys/public.pem").then((function(e){return e.text()})).then((function(e){localStorage.setItem("PUBLIC_KEY",e),new a}));var t=e;$("#input-value").val(t)}))})()})();