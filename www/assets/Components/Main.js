
import Cookies from 'js-cookie';

class Main
{
    url = 'http://localhost/ci-jwt-api/';
    url = 'https://gfx-jwt-api.herokuapp.com/';
    
    // Routes
    routes = {
        'BASE' : 'index',
        'GET_TOKEN' : 'get-token',
        'VERIFY_TOKEN' : 'verify-token',
    };

    // vars
    target = $('#api');
    input = $('#data');

    constructor(){
        this.init();
        this.verifyKey();
        this.getToken();
        this.verifyToken();
        this.debugging();
    }

    init() {
        var thisObj = this;
        var $url = thisObj._authorizationRequestRoute();

        $.ajax({
            url			: $url,
            type		: 'POST',
            cache       : false,
            data		: {
                'PUBLIC_KEY' : localStorage.getItem('PUBLIC_KEY'),
            },
            dataType	: 'json',
            beforeSend	: function(){
                thisObj.target.prepend('<div class="loader"></div>');
            }
        })
        .done( function (data, textStatus, jqXHR) { 
            thisObj.target.find('.loader').remove();
            thisObj.target.find('#api-response').html('<code>' + JSON.stringify(data) + '</code>');
            Cookies.set('AUTHORIZATION_GRANT', data.AUTHORIZATION_GRANT);
        })
        .fail( function (jqXHR, textStatus, errorThrown) { 
            thisObj.target.find('.loader').remove();
            thisObj.target.find('#api-response').html('<code>' + JSON.stringify(errorThrown) + '</code>');
        })
        ;
    }

    debugging() {
        // Cookies.set('foo', 'bar');
    }

    verifyKey() {
        var thisObj = this;

        $(document).on('click', '#VERIFY_KEY', function(e){
            e.preventDefault();
            thisObj.init();
        });
    }

    // Getting Token from API
    getToken() {
        var thisObj = this;

        $(document).on('click', '#GET_TOKEN', function(e){
            e.preventDefault();
            var $url = thisObj._route(this);

            $.ajax({
                url			: $url,
                type		: 'POST',
                cache       : false,
                data		: {
                    var : $('#input-value').val(),
                    AUTHORIZATION_GRANT : Cookies.get('AUTHORIZATION_GRANT'),
                },
                dataType	: 'json',
                beforeSend	: function(){
                    thisObj.target.prepend('<div class="loader"></div>');
                }
            })
            .done( function (data, textStatus, jqXHR) { 
                thisObj.target.find('.loader').remove();
                thisObj.target.find('#api-response').html('<code>' + JSON.stringify(data) + '</code>');
                Cookies.set('jwt-value', data.Token);
            })
            .fail( function (jqXHR, textStatus, errorThrown) { 
                thisObj.target.find('.loader').remove();
                thisObj.target.find('#api-response').html('<code>' + JSON.stringify(errorThrown) + '</code>');
            })
            ;
        });
    }

    // Verify Token from API
    verifyToken() {
        var thisObj = this;

        $(document).on('click', '#VERIFY_TOKEN', function(e){
            e.preventDefault();
            var $url = thisObj._route(this);

            $.ajax({
                url			: $url,
                type		: 'POST',
                cache       : false,
                dataType	: 'json',
                data		: {
                    AUTHORIZATION_GRANT : Cookies.get('AUTHORIZATION_GRANT'),
                },
                beforeSend	: function(){
                    thisObj.target.prepend('<div class="loader"></div>');
                },
                headers     : {
                    'Authorization':'Bearer ' + Cookies.get('jwt-value'),
                },
                
            })
            .done( function (data, textStatus, jqXHR) { 
                thisObj.target.find('.loader').remove();
                thisObj.target.find('#api-response').html('<code>' + JSON.stringify(data) + '</code>');
            })
            .fail( function (jqXHR, textStatus, errorThrown) { 
                thisObj.target.find('.loader').remove();
                thisObj.target.find('#api-response').html('<code>' + JSON.stringify(errorThrown) + '</code>');
            })
            ;
        });
    }

    /* ROUTE MATCHER */
    _route(Obj) {
        var thisObj = this;
        var $key = $(Obj).attr('id');

        if ( !($key in thisObj.routes) ) {
            alert('Route does not exist !');
            return;
        }

        var $route = thisObj.url + thisObj.routes[$key];
        return $route; 
    }

    _authorizationRequestRoute() {
        var thisObj = this;
        var $route = thisObj.url + thisObj.routes['BASE'];
        return $route;
    }

}

export default Main;