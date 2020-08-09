import Cookie from '../plugins/cookie.js';

class Main
{
    url = 'https://gfx-jwt-api.herokuapp.com/';
    // Routes
    routes = {
        'GET_TOKEN' : 'get-token',
        'VERIFY_TOKEN' : 'verify-token',
    };

    // vars
    target = $('#api');
    input = $('#data');

    constructor(){
        // this._sendTextToServer();
        this.getToken();
        this.verifyToken();
    }

    console() {
        console.log('Main.js');
    }

    // Getting Token from API
    getToken() {
        var thisObj = this;

        $(document).on('click', '#GET_TOKEN', function(e){
            e.preventDefault();
            var $url = thisObj._route(this);

            $.ajax({
                url			: $url,
                type		: 'GET',
                cache       : false,
                data		: {
                    var : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), // Generate a random string in JavaScript In a short and fast way!
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
                type		: 'GET',
                cache       : false,
                dataType	: 'json',
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

    _sendTextToServer() {
        var thisObj = this;

        $('#submit-btn').on( 'click', function(f) {
            f.preventDefault();

            var $input = thisObj.input.val();

            if ($input == '') {
                alert('Empty field !');
                return;
            }

            $.ajax({
                // url			: 'http://localhost/ci-jwt-api/get-token',
                // url			: 'http://localhost/ci-jwt-api/verify-token',
                type		: 'GET',
                cache       : false,
                data		: {
                    var : $input,
                },
                dataType	: 'json',
                beforeSend	: function(){
                    $('#submit-btn').attr('disabled', true);
                    thisObj.target.prepend('<div class="loader"></div>');
                    console.log(Cookie.get('jwt-value'));
                },
                headers     : {
                    'Authorization':'Bearer ' + Cookie.get('jwt-value'),
                    // 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZXYiOiJmYWRpbEB4Y29kZXIuZHZscHIiLCJ0aW1lU3RhbXAiOiIyMDIwLTA4LTA4IDA4OjM3OjIyIn0.QPbn6jqiXghRdmwtBtxyX_f5nx71dtGS42xMCjz68b8',
                },
                
            })
            .done( function (data, textStatus, jqXHR) { 
                thisObj.successFunction(data, textStatus, jqXHR);
            })
            .fail( function (jqXHR, textStatus, errorThrown) { 
                thisObj.failedFunction(jqXHR, textStatus, errorThrown);
            })
            .always( function(reponse, textStatus, jqXHR) {
                console.log('always!');
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
}

export default Main;