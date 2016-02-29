/**
 * 
 * The functions referred by the html pages
 */

    /**
     * function to get the list of nearby saftely reach outs
     * @returns {undefined}
     */
    //We intended to use the api : https://quickstartdata.guidestar.org/v1/quickstartsearch?q=zip:23188
    //https://quickstartdata.guidestar.org/v1/quickstartsearch?q=keyword:giving. But due to its pricing 
    // we could not use use it and thus using the static file

    function getNGO(){
        $.getJSON('myData.json', function(data){
        var details="<br>";
        var t = 1;
        for(var i in data.hits){
            details+=t+". "+data.hits[i].organization_name+"<br></br>"+"  "+data.hits[i].
            phone+"<br></br>"+"<u><a href="+"  "+data.hits[i].public_report+">"
            +data.hits[i].public_report+"</a></u><br></br><br></br>";
               t++;
        }
        document.getElementById("text").innerHTML = details;
        });

    httpGetAsync("https://api.clickatell.com/http/sendmsg?user=cp6023&password=wichacks16*&api_id=3589511&to=15859678428&text=Nedd help");
    }
    
    /**
     * function to trigger the sms
     * @param {type} theUrl
     * @param {type} callback
     * @returns {undefined}
     */
    function httpGetAsync(theUrl, callback){ 
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText); 
        } 
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    var zip ="";
    
    /**
     * function to get the users current location - zipcode
     * @returns {undefined}
     */
    function getPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(userLocation);
    }
    else{
        document.getElementById("text").innerHTML = "Couldnt get";
    }
        function userLocation(position){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
                //               document.getElementById("result").innerHTML = "zip";
            var  gp = new google.maps.LatLng(lat, long)
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'latLng' : gp
                },function(results,status){
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var content = results[1].formatted_address.match(/,\s\w{2}\s(\d{5})/);
                    zip = content[1];
                    document.getElementById("zipcode").innerHTML = "Found you: " +zip; 
                    } else {
                alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        }); 
        }
    }
                    
                