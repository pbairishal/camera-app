// Set constraints for the video stream
// var constraints = { video: { facingMode: "user" }, audio: false };
var constraints = { 
    video: { 
        facingMode: "environment",
        width: { ideal: 4096 },
        height: { ideal: 2160 } 
    },
    audio: false
};

var track = null;
var docId = null;
var docSrc = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraTrigger0 = document.querySelector("#camera--trigger-0"),
    cameraTrigger1 = document.querySelector("#camera--trigger-1");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;


            // -----------  custom functions

            cameraView.classList.remove("displayNone");
            cameraView.classList.add("fullScreen");

            cameraTrigger.classList.remove("displayNone");
            //cameraSensor.classList.remove("displayNone");

            //------------
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

function cameraReStart() {
    cameraView.classList.remove("displayNone");
    cameraView.classList.add("fullScreen");

    cameraTrigger.classList.remove("displayNone");
    //cameraSensor.classList.remove("displayNone");
};


// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    //console.log(cameraView);
    //console.log(cameraSensor);
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    // cameraSensor.width = cameraView.videoHeight;
    // cameraSensor.height = cameraView.videoWidth;

    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    //cameraOutput.classList.add("taken");
    // track.stop();

    

    // -----------  custom functions
    cameraView.classList.remove("fullScreen");
    cameraView.classList.add("displayNone");

    cameraTrigger.classList.add("displayNone");
    //cameraSensor.classList.add("displayNone");

    cameraOutput.classList.remove("displayNone");
    cameraOutput.classList.add("fullScreen");
    
    cameraTrigger0.classList.remove("displayNone");
    cameraTrigger1.classList.remove("displayNone");

    //------------


};

// Start the video stream when the window loads
// window.addEventListener("load", cameraStart, false);



//------------------------------------------

cameraTrigger1.onclick = function() {
   
    cameraOutput.classList.remove("fullScreen");
    cameraOutput.classList.add("displayNone");
    

    cameraTrigger0.classList.add("displayNone");
    cameraTrigger1.classList.add("displayNone");

    //cameraSensor.classList.add("displayNone");

    cameraReStart(); 
};

cameraTrigger0.onclick = function() {

    var x = document.createElement("IMG");
    x.setAttribute("src", cameraOutput.src);
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    x.setAttribute("alt", "xyz");

    if (docId !== null) {
        var cameraOutputDoc = document.querySelector("#camera--output"+ docId);
        cameraOutputDoc.appendChild(x);
        document.querySelector("#camera--input"+ docId).classList.add("displayNone");
    }

    loadCamApp(); 
};

function loadCamApp() {
    cameraTrigger.classList.add("displayNone");
    cameraTrigger0.classList.add("displayNone");
    cameraTrigger1.classList.add("displayNone");
    cameraView.classList.add("displayNone");
    cameraSensor.classList.add("displayNone");
    cameraOutput.classList.add("displayNone")
}

window.addEventListener("load", loadCamApp, false);
//window.addEventListener("load", cameraStart, false);



function takePhoto(id) {
    // console.log(cameraView.srcObject);
    docId = id;
    if (cameraView.srcObject === null){
        cameraStart(); 
    }
    else {
        cameraReStart();
    } 
}