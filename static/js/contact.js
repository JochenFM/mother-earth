$(document).ready(function() {
    $("#form").submit(function(event) {
        event.preventDefault(); // prevents default form submission 
        const serviceID = "speaky";
        const templateID = "template_imyx42d";
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                //Display modal -confirmation message
                $('#myModal').removeClass("hide");
                // alert(' Your message has been sent Successfully.')
                $("#form")[0].reset();
            }, () => {
                //Display modal error
                alert('Sorry, something went wrong, please refresh the page')
                $("#form")[0].reset();
            });
    });
});