$(function () {
    $('#contact-form').on('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        // Clear previous error and success messages
        $('#email-error').text('');
        $('#error-message').hide();
        $('#success-message').hide();

        // Validate email
        var email = $('#demo-email').val();
        if (!email || !validateEmail(email)) {
            $('#email-error').text('Please enter a valid email address.');
            return;
        }

        let name = $('#demo-name').val();
        let phone = $('#phone').val();
        let message = $('#demo-message').val();

        var tableHtml = `
                                                         <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                                                             <tr>
                                                                 <td style="width: 30%; font-family: Arial, sans-serif;">Name</td>
                                                                 <td style="width: 70%; font-family: Arial, sans-serif;">${name}</td>
                                                             </tr>
                                                             <tr>
                                                                 <td style="font-family: Arial, sans-serif;">Email</td>
                                                                 <td style="font-family: Arial, sans-serif;">${email}</td>
                                                             </tr>
                                                             <tr>
                                                                 <td style="font-family: Arial, sans-serif;">Phone</td>
                                                                 <td style="font-family: Arial, sans-serif;">${phone}</td>
                                                             </tr>
                                                             <tr>
                                                                 <td style="font-family: Arial, sans-serif;">Message</td>
                                                                 <td style="font-family: Arial, sans-serif;">${message}</td>
                                                             </tr>
                                                         </table>`;


        // Show the spinner and hide the form
        $('#spinner').show();
        $('#contact-form').hide();


        // If email is valid, proceed with the AJAX request
        $.ajax({
            url: 'https://cincositemail-chbfcxakbtehduep.westeurope-01.azurewebsites.net/EmailService',  // Replace with your API endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                message: tableHtml
            }),
            success: function (response) {
                $('#success-message').text("Thank you for reaching out! We've received your message and will connect with you shortly.").show(); // Show the success message inside the box
            },
            error: function (error) {
                $('#success-message').html(
                    'Oops, it seems we are currently unable to send your message. <br>' +
                    'Please email us at <a href="mailto:info@cincologic.com">info@cincologic.com</a>. ' +
                    'Apologies for the inconvenience.'
                ).show();
            },
            complete: function (xhr, status) {
                // $('#contact-form').hide(); // Hide the formrt
                $('#spinner').hide(); // Hide the spinner
            }
        });
    });

    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});