import Cookie from '../plugins/cookie.js';

class Main
{
    target = $('#api');
    input = $('#data');

    constructor(){
        this._sendTextToServer();
    }

    console() {
        console.log('Main.js');
    }

    successFunction(data, textStatus, jqXHR) {
        this.target.find('.loader').remove();
        $('#submit-btn').attr('disabled', false);
        this.target.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
        // Cookie.set('jwt-value', data.Token);
        // console.log(Cookie.get('jwt-value'));
    }

    failedFunction(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);
    }

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
                url			: 'http://localhost/ci-jwt-api/verify-token',
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
}

export default Main;