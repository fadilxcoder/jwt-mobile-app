import Cookie from '../plugins/cookie.js';

class Main
{
    url = 'http://localhost/ci-jwt-api/';
    // url = 'https://gfx-jwt-api.herokuapp.com/';
    
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
        // this._sendTextToServer();
        this.verifyKey();
        this.getToken();
        this.verifyToken();
    }

    console() {
        console.log('Main.js');
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
            thisObj.target.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
            Cookie.set('AUTHORIZATION_GRANT', data.AUTHORIZATION_GRANT);
        })
        .fail( function (jqXHR, textStatus, errorThrown) { 
            thisObj.target.find('.loader').remove();
            thisObj.target.find('#api-response').html('<p>' + JSON.stringify(errorThrown) + '</p>');
        })
        ;
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
                    AUTHORIZATION_GRANT : Cookie.get('AUTHORIZATION_GRANT'),
                },
                dataType	: 'json',
                beforeSend	: function(){
                    thisObj.target.prepend('<div class="loader"></div>');
                }
            })
            .done( function (data, textStatus, jqXHR) { 
                thisObj.target.find('.loader').remove();
                thisObj.target.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
                Cookie.set('jwt-value', data.Token);
            })
            .fail( function (jqXHR, textStatus, errorThrown) { 
                thisObj.target.find('.loader').remove();
                thisObj.target.find('#api-response').html('<p>' + JSON.stringify(errorThrown) + '</p>');
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
                    AUTHORIZATION_GRANT : Cookie.get('AUTHORIZATION_GRANT'),
                },
                beforeSend	: function(){
                    thisObj.target.prepend('<div class="loader"></div>');
                },
                headers     : {
                    'Authorization':'Bearer ' + Cookie.get('jwt-value'),
                },
                
            })
            .done( function (data, textStatus, jqXHR) { 
                thisObj.target.find('.loader').remove();
                thisObj.target.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
            })
            .fail( function (jqXHR, textStatus, errorThrown) { 
                thisObj.target.find('.loader').remove();
                thisObj.target.find('#api-response').html('<p>' + JSON.stringify(errorThrown) + '</p>');
            })
            ;
        });
    }

    successFunction(data, textStatus, jqXHR) {
        // this.target.find('.loader').remove();
        // $('#submit-btn').attr('disabled', false);
        // this.target.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
        // Cookie.set('jwt-value', data.Token);
        // console.log(Cookie.get('jwt-value'));
    }

    failedFunction(jqXHR, textStatus, errorThrown) {
        // // console.log(errorThrown);
        // console.log(textStatus);
        // console.log(jqXHR);
    }

    // PRIVATE Methods

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