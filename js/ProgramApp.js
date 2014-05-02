/**
 * Created by Kirste on 17/04/14.
 */
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;

    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var lImage = document.getElementById('lImage');

    // Unhide image elements
    //
    lImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    lImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}



$(window).load(function(){
    $('#myModal').modal('show');
});

function showMoreOrLess(thisObj,bonusContent){
    var caption = thisObj.innerHTML;
    if ( caption == "More!" ) {
        document.getElementById(bonusContent).style.display = "inline";
        thisObj.innerHTML = "Close";
    } else {
        document.getElementById(bonusContent).style.display = "none";
        thisObj.innerHTML = "More!";
    }
}

var
    getCurrentPosition = function() {
        var map = document.getElementById('map');
        var success = function(pos) {
            var text = "<div>Latitude: " + pos.coords.latitude +
                "<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" +
                "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
            document.getElementById(
                'cur_position').innerHTML = text;
            console.log(text);
            map.style.display =
                'block';
            var mapwidth = 270; // a mungy compromise between the 2 sizes
            var mapheight = 210; // since we can't get w / h dynamically
            map.src =
                "http://maps.googleapis.com/maps/api/staticmap?center=" +
                    pos.coords.latitude +
                    "," + pos.coords.longitude +
                    "&zoom=14&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
                    pos.coords.latitude +
                    "," + pos.coords.longitude + "&sensor=false";
        };
        var fail = function(error) {
            document.getElementById(
                'cur_position').innerHTML = "Error getting geolocation: " + error.code;
            console.log(
                "Error getting geolocation: code=" + error.code + " message=" + error.message);
        };
        map.style.display =
            'none';
        document.getElementById(
            'cur_position').innerHTML = "Getting geolocation . . .";
        console.log(
            "Getting geolocation . . .");
        navigator.geolocation.getCurrentPosition(success, fail);
    };


var
    watchID = null;
function
    clearWatch() {
    if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID =
            null;
        document.getElementById(
            'cur_position').innerHTML = "";
        document.getElementById(
            'map').style.display = 'none';
    }
}
var
    wsuccess = function(pos) {
        var map = document.getElementById('map');
        document.getElementById(
            'cur_position').innerHTML = "Watching geolocation . . .";
        map.style.display =
            'none';
        var text = "<div>Latitude: " + pos.coords.latitude +
            " (watching)<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" +
            "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
        document.getElementById(
            'cur_position').innerHTML = text;
        console.log(text);
        map.style.display =
            'block';
        var mapwidth = 270; // a mungy compromise between the 2 sizes
        var mapheight = 210; // since we can't get w / h dynamically
        map.src =
            "http://maps.googleapis.com/maps/api/staticmap?center=" +
                pos.coords.latitude +
                "," + pos.coords.longitude +
                "&zoom=13&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
                pos.coords.latitude +
                "," + pos.coords.longitude + "&sensor=false";
    };
var
    wfail = function(error) {
        document.getElementById(
            'cur_position').innerHTML = "Error getting geolocation: " + error.code;
        console.log(
            "Error getting geolocation: code=" + error.code + " message=" + error.message);
    };
var
    toggleWatchPosition = function() {
        if (watchID) {
            console.log(
                "Stopped watching position");
            clearWatch();
// sets watchID = null;
        }
        else {
            document.getElementById(
                'map').style.display = 'none';
            document.getElementById(
                'cur_position').innerHTML = "Watching geolocation . . .";
            console.log(
                "Watching geolocation . . .");
            var options = { frequency: 3000, maximumAge: 5000, timeout: 5000, enableHighAccuracy: true };
            watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
        }
    };