
function sendEmail() {
    var datepicker = $("#datepicker");
    var name = $("#subscription_name");
    var surname = $("#subscription_surname");
    var email = $("#subscription_email");
    var phone = $("#subscription_phone");
    

    if (isNotEmpty(datepicker) && isNotEmpty(name) && isNotEmpty(surname) && isNotEmpty(email) && isNotEmpty(phone)) {
        if(document.getElementById('subscription_check').checked) {
        $.ajax({
            url: 'sendEmail.php',
            method: 'POST',
            dataType: 'json',
            data: {
                datepicker: datepicker.val(),
                name: name.val(),
                surname: surname.val(),
                email: email.val(),
                phone: phone.val(),
            }, success: function (response) {
                $('#myForm')[0].reset();
                $('#message2').text("E-pasts ir nosūtīts!");
            }
        });
    }
    else {
        document.getElementById('message').textContent = "Lūdzu apstipriniet noteiktumus!"
    }
    }
    }

        function isNotEmpty(caller) {
            if (caller.val() == "") {
                caller.css('border', '1px solid red');
                return false;
            } else
                caller.css('border', '');

            return true;
        }

