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
        this.target.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>')
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
            
            var jsonData = JSON.stringify({
                var : $input,
            })

            $.ajax({
                // url			: 'https://e79525ad0831.ngrok.io/get-token',
                url			: 'https://e79525ad0831.ngrok.io/verify-token',
                type		: 'GET',
                cache       : false,
                data		: {
                    var : $input,
                },
                dataType	: 'json',
                beforeSend	: function(){
                    $('#submit-btn').attr('disabled', true);
                    thisObj.target.prepend('<div class="loader"></div>');
                },
                headers     : {
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZXYiOiJmYWRpbEB4Y29kZXIuZHZscHIiLCJ0aW1lU3RhbXAiOiIyMDIwLTA3LTI2IDA3OjQ2OjU3In0.tsM-9CUohkELEvq3fpH3eiEu683du3uVW6cQ9-iH6a8',
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