class Account
{
    constructor(){
        console.log('Account');
    }


    _sendTextToServer() {
        var thisObj = this;

        $('#submit-btn').on( 'click', function(f) {
            f.preventDefault();
    
    
            $.ajax({
                url			: '',
                type		: 'POST',
                data		: $fd,
                contentType : false,
                processData : false,
                cache       : false,
                dataType	: 'json',
    
                beforeSend	: function(){
                    // $('#submit-btn').attr('disabled', true).css('background-color', 'cyan');
                },
                
            })
            .done( function (data, textStatus, jqXHR) { 
                // successFunction(data, textStatus, jqXHR);
            })
            .fail( function (jqXHR, textStatus, errorThrown) { 
                // errorFunction(jqXHR, textStatus, errorThrown);
            })
            .always( function(reponse, textStatus, jqXHR) {
                // console.log('always!');
                // console.log(data); // Response .done() from function.php OR error fron .fail()
            })
            .then( function(reponse, textStatus, jqXHR){
                /* N.B : Called only if succeed */
                // triggerMe(reponse, textStatus, jqXHR);
            })
            ;
        });


    }
}

export default Account;