$(document).ready(function(){
    MAIN_DEBUG = true;


apiUrl = `/places`;
// Call the /places API endpoint to obtain a list of places where trees will be planted
$.when(
    $.getJSON(apiUrl),
).then(
    function(firstResponse) {
        // display status of the API call
        if (MAIN_DEBUG)
            console.log(firstResponse);
        // if firstResponse array (the response from API) is empty
        if (firstResponse.length == 0) {
            return;
        }
        for (var i = 0; i < firstResponse.length; i++) {
            // put pins on the map for all planted trees
            new google.maps.Marker({
                position: {
                    lat: firstResponse[i]["lat"],
                    lng: firstResponse[i]["lng"]
                },
            label: firstResponse[i]["name"],
            map: map,
            });
        }

    },
    function(errorResponse) {
        //Response.status === 400 (that's a not found error)
        if (errorResponse.status === 400) {
        } else { 
            // Catch other errors
            if (MAIN_DEBUG)
                console.log(errorResponse);
        }
});

})

latitude = 0;
longitude = 0;

function sendDataToServer(){
    let name = $("#tree_name").val();
    var cookies = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key,value]) => ({...accumulator, [key.trim()]:decodeURIComponent(value)}), {});
    let drinks = cookies.drinks
    let answers = cookies.answers
    
    if(typeof drinks == 'undefined'){
        drinks = 0
        
    }
    if (typeof answers == 'undefined'){
        answers = 0
    }

    let score = answers;
    dataToBeSent = '{"name": "' + name + '", "lat": ' + latitude + ', "lng": ' + longitude + ', "score": ' + score + '}'
    // Call the /places API endpoint with POST to create a record in database.
    $.post({
        url: apiUrl,
        data: dataToBeSent,
        contentType: 'application/json; charset=utf-8'
    })
        .done(function (response) {
            //Do something on success response...
        });
    // redirect page to /plant_tree
    window.location.assign("/plant_tree");

}
